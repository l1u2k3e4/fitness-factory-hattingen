-- ============================================================================
-- Migration 002: Row Level Security Policies
-- ============================================================================

-- RLS aktivieren
ALTER TABLE trainers ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE member_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guest_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_subscriptions ENABLE ROW LEVEL SECURITY;

-- ---- Trainer ----
CREATE POLICY "Trainer öffentlich lesbar"
  ON trainers FOR SELECT USING (active = true);

CREATE POLICY "Trainer verwaltet von Admin"
  ON trainers FOR ALL
  USING (EXISTS (
    SELECT 1 FROM trainers t WHERE t.auth_user_id = auth.uid() AND t.role = 'admin'
  ));

-- ---- Kurs-Templates ----
CREATE POLICY "Templates öffentlich lesbar"
  ON course_templates FOR SELECT USING (true);

CREATE POLICY "Admin verwaltet Templates"
  ON course_templates FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM trainers t WHERE t.auth_user_id = auth.uid() AND t.role = 'admin'
  ));

CREATE POLICY "Admin updated Templates"
  ON course_templates FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM trainers t WHERE t.auth_user_id = auth.uid() AND t.role = 'admin'
  ));

CREATE POLICY "Admin löscht Templates"
  ON course_templates FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM trainers t WHERE t.auth_user_id = auth.uid() AND t.role = 'admin'
  ));

-- ---- Kurs-Instanzen ----
CREATE POLICY "Instanzen öffentlich lesbar"
  ON course_instances FOR SELECT USING (true);

CREATE POLICY "Trainer erstellt Instanzen"
  ON course_instances FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM trainers t WHERE t.auth_user_id = auth.uid()
  ));

CREATE POLICY "Trainer eigene Kurse ändern"
  ON course_instances FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM trainers t
    JOIN course_templates ct ON ct.trainer_id = t.id
    WHERE t.auth_user_id = auth.uid()
    AND ct.id = course_instances.template_id
  ) OR EXISTS (
    SELECT 1 FROM trainers t WHERE t.auth_user_id = auth.uid() AND t.role = 'admin'
  ));

-- ---- Member Profiles ----
CREATE POLICY "Eigenes Profil lesen"
  ON member_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Eigenes Profil erstellen"
  ON member_profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Eigenes Profil updaten"
  ON member_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Trainer sieht Teilnehmer-Profile"
  ON member_profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM trainers t WHERE t.auth_user_id = auth.uid()
  ));

-- ---- Buchungen ----
CREATE POLICY "Eigene Buchungen lesen"
  ON bookings FOR SELECT
  USING (auth.uid() = member_id);

CREATE POLICY "Buchung erstellen"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = member_id);

CREATE POLICY "Eigene Buchung stornieren"
  ON bookings FOR UPDATE
  USING (auth.uid() = member_id);

CREATE POLICY "Trainer sieht Buchungen eigener Kurse"
  ON bookings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM trainers t
    JOIN course_templates ct ON ct.trainer_id = t.id
    JOIN course_instances ci ON ci.template_id = ct.id
    WHERE t.auth_user_id = auth.uid()
    AND ci.id = bookings.instance_id
  ));

CREATE POLICY "Admin sieht alle Buchungen"
  ON bookings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM trainers t WHERE t.auth_user_id = auth.uid() AND t.role = 'admin'
  ));

-- ---- Gast-Buchungen ----
CREATE POLICY "Anon kann Gast-Buchung erstellen"
  ON guest_bookings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Trainer sieht Gäste eigener Kurse"
  ON guest_bookings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM trainers t
    JOIN course_templates ct ON ct.trainer_id = t.id
    JOIN course_instances ci ON ci.template_id = ct.id
    WHERE t.auth_user_id = auth.uid()
    AND ci.id = guest_bookings.instance_id
  ));

CREATE POLICY "Admin sieht alle Gäste"
  ON guest_bookings FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM trainers t WHERE t.auth_user_id = auth.uid() AND t.role = 'admin'
  ));

-- ---- Push Subscriptions ----
CREATE POLICY "Eigene Push-Subs verwalten"
  ON push_subscriptions FOR ALL
  USING (auth.uid() = member_id);
