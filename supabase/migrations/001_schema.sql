-- ============================================================================
-- Fitness Factory Hattingen — Kursbuchungssystem
-- Migration 001: Schema
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Trainer
CREATE TABLE trainers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id  UUID UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  email         TEXT UNIQUE,
  phone         TEXT,
  role          TEXT NOT NULL DEFAULT 'trainer' CHECK (role IN ('trainer', 'admin')),
  active        BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Kurs-Vorlagen (wöchentlicher Kursplan)
CREATE TABLE course_templates (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name              TEXT NOT NULL,
  weekday           SMALLINT NOT NULL CHECK (weekday BETWEEN 0 AND 6), -- 0=Montag, 6=Sonntag
  start_time        TIME NOT NULL,
  duration_min      SMALLINT NOT NULL DEFAULT 45,
  level             TEXT NOT NULL DEFAULT 'Alle Level',
  trainer_id        UUID REFERENCES trainers(id) ON DELETE SET NULL,
  max_participants  SMALLINT NOT NULL DEFAULT 15,
  active            BOOLEAN NOT NULL DEFAULT true,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Konkrete Kurs-Instanzen (ein Eintrag pro Termin)
CREATE TABLE course_instances (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id     UUID NOT NULL REFERENCES course_templates(id) ON DELETE CASCADE,
  date            DATE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'cancelled')),
  cancel_reason   TEXT,
  override_max    SMALLINT,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (template_id, date)
);

-- Mitglieder-Profile (erweitert Supabase Auth)
CREATE TABLE member_profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  phone       TEXT,
  is_member   BOOLEAN NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Buchungen
CREATE TABLE bookings (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id   UUID NOT NULL REFERENCES course_instances(id) ON DELETE CASCADE,
  member_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status        TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'waitlist', 'cancelled')),
  waitlist_pos  SMALLINT,
  booked_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  cancelled_at  TIMESTAMPTZ,
  UNIQUE (instance_id, member_id)
);

-- Gast-Buchungen (ohne Account)
CREATE TABLE guest_bookings (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone         TEXT NOT NULL,
  name          TEXT NOT NULL,
  instance_id   UUID NOT NULL REFERENCES course_instances(id) ON DELETE CASCADE,
  booked_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Push-Subscriptions
CREATE TABLE push_subscriptions (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id   UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  endpoint    TEXT NOT NULL UNIQUE,
  p256dh      TEXT NOT NULL,
  auth_key    TEXT NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indizes
CREATE INDEX idx_instances_date ON course_instances(date);
CREATE INDEX idx_instances_template ON course_instances(template_id);
CREATE INDEX idx_bookings_instance ON bookings(instance_id);
CREATE INDEX idx_bookings_member ON bookings(member_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_guest_phone_week ON guest_bookings(phone, booked_at);
CREATE INDEX idx_templates_weekday ON course_templates(weekday);
CREATE INDEX idx_templates_trainer ON course_templates(trainer_id);

-- View: Kurs-Übersicht mit Buchungszahlen
CREATE OR REPLACE VIEW course_overview AS
SELECT
  ci.id AS instance_id,
  ct.id AS template_id,
  ct.name,
  ct.weekday,
  ci.date,
  ct.start_time,
  ct.duration_min,
  ct.level,
  t.name AS trainer_name,
  t.id AS trainer_id,
  COALESCE(ci.override_max, ct.max_participants) AS max_participants,
  ci.status,
  ci.cancel_reason,
  (SELECT COUNT(*) FROM bookings b WHERE b.instance_id = ci.id AND b.status = 'confirmed') AS booked_count,
  (SELECT COUNT(*) FROM bookings b WHERE b.instance_id = ci.id AND b.status = 'waitlist') AS waitlist_count,
  (SELECT COUNT(*) FROM guest_bookings gb WHERE gb.instance_id = ci.id) AS guest_count
FROM course_instances ci
JOIN course_templates ct ON ci.template_id = ct.id
LEFT JOIN trainers t ON ct.trainer_id = t.id
WHERE ct.active = true;
