-- ============================================================================
-- Migration 004: Seed-Daten aus bestehendem Kursplan
-- ============================================================================
-- Uhrzeiten sind Platzhalter (TBD vom Kunden) — hier sinnvolle Defaults.
-- Trainer werden später zugewiesen.

-- Montag (weekday=0)
INSERT INTO course_templates (name, weekday, start_time, duration_min, level, max_participants) VALUES
  ('Vinyasa-Yoga',            0, '09:00', 60, 'Alle Level', 15),
  ('Spinning',                0, '18:00', 45, 'Alle Level', 20),
  ('Wirbelsäulen-Gymnastik',  0, '10:30', 45, 'Alle Level', 15);

-- Dienstag (weekday=1)
INSERT INTO course_templates (name, weekday, start_time, duration_min, level, max_participants) VALUES
  ('Bauch-Express',           1, '17:30', 30, 'Alle Level', 20),
  ('Spinning',                1, '19:00', 45, 'Alle Level', 20);

-- Mittwoch (weekday=2)
INSERT INTO course_templates (name, weekday, start_time, duration_min, level, max_participants) VALUES
  ('Tabata',                  2, '18:00', 45, 'Alle Level', 20),
  ('Yoga',                    2, '19:30', 60, 'Alle Level', 15);

-- Donnerstag (weekday=3)
INSERT INTO course_templates (name, weekday, start_time, duration_min, level, max_participants) VALUES
  ('Tae-Bo',                  3, '18:00', 45, 'Alle Level', 20),
  ('Spinning',                3, '19:30', 45, 'Alle Level', 20);

-- Freitag (weekday=4)
INSERT INTO course_templates (name, weekday, start_time, duration_min, level, max_participants) VALUES
  ('Rücken-Fit',              4, '10:00', 45, 'Alle Level', 15),
  ('Zumba',                   4, '17:00', 60, 'Alle Level', 20);

-- Samstag (weekday=5) — keine Kurse

-- Sonntag (weekday=6)
INSERT INTO course_templates (name, weekday, start_time, duration_min, level, max_participants) VALUES
  ('Spinning',                6, '10:00', 45, 'Alle Level', 20),
  ('Full Body Intervall',     6, '11:30', 45, 'Alle Level', 20),
  ('Pilates',                 6, '13:00', 60, 'Alle Level', 15);
