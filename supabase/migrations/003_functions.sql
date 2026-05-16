-- ============================================================================
-- Migration 003: PostgreSQL Functions (RPC)
-- ============================================================================

-- Kurs buchen (mit Wartelisten-Logik)
CREATE OR REPLACE FUNCTION book_course(p_instance_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_max SMALLINT;
  v_booked INT;
  v_status TEXT;
  v_booking_id UUID;
  v_waitlist_pos INT;
  v_existing UUID;
BEGIN
  -- Bereits gebucht?
  SELECT id INTO v_existing
  FROM bookings
  WHERE instance_id = p_instance_id
    AND member_id = auth.uid()
    AND status != 'cancelled';

  IF v_existing IS NOT NULL THEN
    RETURN json_build_object('error', 'Du hast diesen Kurs bereits gebucht.');
  END IF;

  -- Kurs-Status und Limit prüfen
  SELECT COALESCE(ci.override_max, ct.max_participants), ci.status
  INTO v_max, v_status
  FROM course_instances ci
  JOIN course_templates ct ON ci.template_id = ct.id
  WHERE ci.id = p_instance_id;

  IF v_status IS NULL THEN
    RETURN json_build_object('error', 'Kurs nicht gefunden.');
  END IF;

  IF v_status = 'cancelled' THEN
    RETURN json_build_object('error', 'Dieser Kurs wurde abgesagt.');
  END IF;

  -- Aktuelle Buchungen zählen (confirmed + Gäste)
  SELECT COUNT(*) INTO v_booked
  FROM bookings
  WHERE instance_id = p_instance_id AND status = 'confirmed';

  v_booked := v_booked + (
    SELECT COUNT(*) FROM guest_bookings WHERE instance_id = p_instance_id
  );

  IF v_booked < v_max THEN
    INSERT INTO bookings (instance_id, member_id, status)
    VALUES (p_instance_id, auth.uid(), 'confirmed')
    RETURNING id INTO v_booking_id;

    RETURN json_build_object('id', v_booking_id, 'status', 'confirmed');
  ELSE
    SELECT COALESCE(MAX(waitlist_pos), 0) + 1 INTO v_waitlist_pos
    FROM bookings
    WHERE instance_id = p_instance_id AND status = 'waitlist';

    INSERT INTO bookings (instance_id, member_id, status, waitlist_pos)
    VALUES (p_instance_id, auth.uid(), 'waitlist', v_waitlist_pos)
    RETURNING id INTO v_booking_id;

    RETURN json_build_object('id', v_booking_id, 'status', 'waitlist', 'position', v_waitlist_pos);
  END IF;
END;
$$;

-- Buchung stornieren (mit Auto-Promotion)
CREATE OR REPLACE FUNCTION cancel_booking(p_booking_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_instance_id UUID;
  v_promoted_id UUID;
  v_promoted_member UUID;
BEGIN
  UPDATE bookings
  SET status = 'cancelled', cancelled_at = now()
  WHERE id = p_booking_id AND member_id = auth.uid() AND status != 'cancelled'
  RETURNING instance_id INTO v_instance_id;

  IF v_instance_id IS NULL THEN
    RETURN json_build_object('error', 'Buchung nicht gefunden oder bereits storniert.');
  END IF;

  -- Nächsten von Warteliste promoten
  UPDATE bookings
  SET status = 'confirmed', waitlist_pos = NULL
  WHERE id = (
    SELECT id FROM bookings
    WHERE instance_id = v_instance_id AND status = 'waitlist'
    ORDER BY waitlist_pos ASC
    LIMIT 1
  )
  RETURNING id, member_id INTO v_promoted_id, v_promoted_member;

  -- Wartelisten-Positionen neu nummerieren
  WITH ranked AS (
    SELECT id, ROW_NUMBER() OVER (ORDER BY waitlist_pos) AS new_pos
    FROM bookings
    WHERE instance_id = v_instance_id AND status = 'waitlist'
  )
  UPDATE bookings b SET waitlist_pos = r.new_pos
  FROM ranked r WHERE b.id = r.id;

  RETURN json_build_object(
    'success', true,
    'promoted', v_promoted_id IS NOT NULL,
    'promoted_member_id', v_promoted_member
  );
END;
$$;

-- Gast-Buchung (mit Rate-Limit)
CREATE OR REPLACE FUNCTION guest_book(p_instance_id UUID, p_name TEXT, p_phone TEXT)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_recent INT;
  v_max SMALLINT;
  v_booked INT;
  v_status TEXT;
BEGIN
  -- Rate-Limit: max 1 Gast-Buchung pro Woche pro Telefonnummer
  SELECT COUNT(*) INTO v_recent
  FROM guest_bookings
  WHERE phone = p_phone AND booked_at > now() - interval '7 days';

  IF v_recent >= 1 THEN
    RETURN json_build_object('error', 'Maximal 1 Schnupperkurs pro Woche. Bitte nächste Woche erneut versuchen.');
  END IF;

  -- Kurs-Status und Plätze prüfen
  SELECT COALESCE(ci.override_max, ct.max_participants), ci.status
  INTO v_max, v_status
  FROM course_instances ci
  JOIN course_templates ct ON ci.template_id = ct.id
  WHERE ci.id = p_instance_id;

  IF v_status IS NULL THEN
    RETURN json_build_object('error', 'Kurs nicht gefunden.');
  END IF;

  IF v_status = 'cancelled' THEN
    RETURN json_build_object('error', 'Dieser Kurs wurde abgesagt.');
  END IF;

  SELECT COUNT(*) INTO v_booked FROM bookings
  WHERE instance_id = p_instance_id AND status = 'confirmed';
  v_booked := v_booked + (SELECT COUNT(*) FROM guest_bookings WHERE instance_id = p_instance_id);

  IF v_booked >= v_max THEN
    RETURN json_build_object('error', 'Dieser Kurs ist leider ausgebucht.');
  END IF;

  INSERT INTO guest_bookings (instance_id, name, phone)
  VALUES (p_instance_id, p_name, p_phone);

  RETURN json_build_object('success', true);
END;
$$;

-- Kurs absagen (nur Trainer des Kurses oder Admin)
CREATE OR REPLACE FUNCTION cancel_course(p_instance_id UUID, p_reason TEXT DEFAULT 'Kurs fällt aus')
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_is_authorized BOOLEAN;
  v_affected INT;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM trainers t
    JOIN course_templates ct ON ct.trainer_id = t.id
    JOIN course_instances ci ON ci.template_id = ct.id
    WHERE t.auth_user_id = auth.uid() AND ci.id = p_instance_id
    UNION
    SELECT 1 FROM trainers t WHERE t.auth_user_id = auth.uid() AND t.role = 'admin'
  ) INTO v_is_authorized;

  IF NOT v_is_authorized THEN
    RETURN json_build_object('error', 'Nicht berechtigt.');
  END IF;

  UPDATE course_instances
  SET status = 'cancelled', cancel_reason = p_reason
  WHERE id = p_instance_id AND status = 'scheduled';

  GET DIAGNOSTICS v_affected = ROW_COUNT;

  IF v_affected = 0 THEN
    RETURN json_build_object('error', 'Kurs nicht gefunden oder bereits abgesagt.');
  END IF;

  RETURN json_build_object('success', true, 'instance_id', p_instance_id);
END;
$$;

-- Kurs-Instanzen für eine Woche generieren (falls nicht vorhanden)
CREATE OR REPLACE FUNCTION generate_weekly_instances(p_week_start DATE)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_template RECORD;
  v_date DATE;
  v_count INT := 0;
BEGIN
  FOR v_template IN
    SELECT id, weekday FROM course_templates WHERE active = true
  LOOP
    -- Datum berechnen: p_week_start ist Montag (weekday=0)
    v_date := p_week_start + v_template.weekday;

    INSERT INTO course_instances (template_id, date)
    VALUES (v_template.id, v_date)
    ON CONFLICT (template_id, date) DO NOTHING;

    GET DIAGNOSTICS v_count = v_count + ROW_COUNT;
  END LOOP;

  RETURN json_build_object('created', v_count);
END;
$$;

-- Trainer-Statistiken
CREATE OR REPLACE FUNCTION get_trainer_stats(p_from DATE, p_to DATE)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_trainer_id UUID;
  v_is_admin BOOLEAN;
  v_result JSON;
BEGIN
  SELECT t.id, (t.role = 'admin') INTO v_trainer_id, v_is_admin
  FROM trainers t WHERE t.auth_user_id = auth.uid();

  IF v_trainer_id IS NULL THEN
    RETURN json_build_object('error', 'Nicht berechtigt.');
  END IF;

  SELECT json_build_object(
    'popular_courses', (
      SELECT json_agg(row_to_json(r)) FROM (
        SELECT ct.name, COUNT(b.id) AS total_bookings,
               ROUND(AVG(
                 (SELECT COUNT(*) FROM bookings b2
                  WHERE b2.instance_id = ci.id AND b2.status = 'confirmed')::NUMERIC
                 / COALESCE(ci.override_max, ct.max_participants) * 100
               ), 1) AS avg_occupancy_pct
        FROM course_templates ct
        JOIN course_instances ci ON ci.template_id = ct.id
        LEFT JOIN bookings b ON b.instance_id = ci.id AND b.status = 'confirmed'
        WHERE ci.date BETWEEN p_from AND p_to
          AND (v_is_admin OR ct.trainer_id = v_trainer_id)
        GROUP BY ct.id, ct.name
        ORDER BY total_bookings DESC
        LIMIT 10
      ) r
    ),
    'total_courses', (
      SELECT COUNT(*) FROM course_instances ci
      JOIN course_templates ct ON ci.template_id = ct.id
      WHERE ci.date BETWEEN p_from AND p_to
        AND (v_is_admin OR ct.trainer_id = v_trainer_id)
    ),
    'total_bookings', (
      SELECT COUNT(*) FROM bookings b
      JOIN course_instances ci ON ci.id = b.instance_id
      JOIN course_templates ct ON ct.id = ci.template_id
      WHERE ci.date BETWEEN p_from AND p_to
        AND b.status = 'confirmed'
        AND (v_is_admin OR ct.trainer_id = v_trainer_id)
    ),
    'cancellation_rate', (
      SELECT ROUND(
        COUNT(*) FILTER (WHERE ci.status = 'cancelled')::NUMERIC
        / GREATEST(COUNT(*), 1) * 100, 1
      )
      FROM course_instances ci
      JOIN course_templates ct ON ct.id = ci.template_id
      WHERE ci.date BETWEEN p_from AND p_to
        AND (v_is_admin OR ct.trainer_id = v_trainer_id)
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;
