# Kursbuchungssystem — Fitness Factory Hattingen

## Ausgangslage

Aktuell läuft die Kursanmeldung über eine WhatsApp-Gruppe:
- Trainer schreibt rein, ob ein Kurs stattfindet oder ausfällt
- Mitglieder melden sich per Nachricht an
- Die ersten 10/15/20 (je nach Kurs) dürfen teilnehmen
- Kein Überblick für Trainer, wer wirklich kommt
- Kein System für Warteliste, Absagen, Nachrücker
- Nicht-Mitglieder (Probetraining) haben keinen Zugang zur Gruppe

## Anforderungen

- Nur Mitglieder können Kurse buchen
- Gäste (Nicht-Mitglieder) sollen einzelne Kurse zum Testen buchen können
- Trainer brauchen einen Überblick: Wer kommt? Wie viele Plätze frei? Wer ist auf der Warteliste?
- Kurs-Ausfall muss kommuniziert werden (Push/Nachricht)
- Teilnehmerlimit pro Kurs (variabel: 10, 15, 20)
- Professioneller als WhatsApp

---

## OPTION A — Komplett Custom (eigener Code)

### Beschreibung
Eigene Web-App im bestehenden Tech-Stack (React + Node/Express), die sowohl in die Website integriert als auch standalone nutzbar ist. Mitglieder loggen sich ein, sehen den Kursplan und buchen per Klick.

### Architektur
```
Frontend:  React (im bestehenden Vite-Projekt oder als eigene PWA)
Backend:   Express.js (Port 3002, neben Dashboard auf 3001)
Datenbank: SQLite oder Supabase (PostgreSQL)
Auth:      PIN-Code pro Mitglied oder einfacher Login (E-Mail + Code)
Push:      Web Push Notifications oder WhatsApp Business API
```

### Features
- Kursplan mit Live-Verfügbarkeit ("8/15 Plätze belegt")
- Buchen mit einem Klick, automatische Warteliste
- Trainer-Dashboard: Teilnehmerliste, Anwesenheit abhaken, Kurs absagen
- Push-Benachrichtigung bei Ausfall oder freigewordenen Plätzen
- Gast-Buchung: Name + Telefonnummer, ohne Account, max. 1 Kurs/Woche
- Automatische Erinnerung 2h vor Kursstart
- Statistiken: Welche Kurse sind am beliebtesten? Wer kommt regelmäßig?

### Vorteile
- Volle Kontrolle über Design, Funktionen, Daten
- Passt 1:1 zum bestehenden Tech-Stack und CI
- Keine monatlichen Lizenzkosten
- Kann ins Dashboard integriert werden (Trainer pflegt Kurse dort)
- Offline-fähig als PWA (Progressive Web App)

### Nachteile
- Höchster Entwicklungsaufwand (ca. 3–5 Prompts für Claude Code)
- Wartung liegt bei euch / bei AkquiseFlow
- Kein fertiges Zahlungssystem (falls Gäste zahlen sollen)

### Aufwand
- Backend + API: 1 Prompt
- Frontend (Mitglieder-Ansicht): 1 Prompt
- Trainer-Dashboard-Erweiterung: 1 Prompt
- PWA-Setup + Push: 1 Prompt
- **Gesamt: 4 Prompts, ca. 2–3 Tage Entwicklung**

### Kosten
- Einmalig: Entwicklungszeit
- Laufend: Hosting (bereits vorhanden) + ggf. Push-Service (~5 €/Monat)

---

## OPTION B — Supabase + React (Hybrid)

### Beschreibung
React-Frontend (custom), aber Supabase als Backend (Datenbank, Auth, Realtime). Supabase ist ein Open-Source-Firebase-Ersatz mit PostgreSQL, Echtzeit-Updates und eingebautem Auth-System.

### Architektur
```
Frontend:  React (PWA, eigenes Design)
Backend:   Supabase (gehostet, kostenlos bis 50.000 Rows)
Auth:      Supabase Auth (Magic Link per E-Mail oder PIN)
Realtime:  Supabase Realtime (Live-Updates der Verfügbarkeit)
Push:      E-Mail-Benachrichtigung über Supabase Edge Functions
```

### Features
- Alles aus Option A
- Plus: Echtzeit-Updates (Platz wird gebucht → alle sehen es sofort)
- Plus: Eingebautes Auth-System (kein eigener Login-Code nötig)
- Plus: Admin-Dashboard direkt in Supabase (für schnelle Checks)

### Vorteile
- Schneller als komplett custom (Auth + DB sind fertig)
- Kostenlos für kleine Studios (bis 50.000 Datenbankzeilen)
- Echtzeit-fähig out of the box
- PostgreSQL = professionelle Datenbank, skalierbar
- Frontend bleibt custom → passt zur CI

### Nachteile
- Abhängigkeit von Supabase (SaaS)
- Etwas Einarbeitungszeit in Supabase
- Bei >50.000 Rows: 25 $/Monat

### Aufwand
- Supabase-Setup + Schema: 1 Prompt
- Frontend (Mitglieder + Trainer): 2 Prompts
- **Gesamt: 3 Prompts, ca. 1–2 Tage**

### Kosten
- Einmalig: Entwicklungszeit
- Laufend: 0 € (Free Tier) bis 25 $/Monat (Pro)

---

## OPTION C — Google Sheets + Web-Frontend (Low-Tech)

### Beschreibung
Google Sheets als "Datenbank", ein schlankes Web-Frontend für Mitglieder zum Buchen, und Google Apps Script für die Logik. Der Trainer sieht alles direkt in Google Sheets.

### Architektur
```
Frontend:  Einfache React-Seite oder Standalone-HTML
Backend:   Google Sheets + Google Apps Script
Auth:      Mitgliedsnummer oder Name + Geburtsdatum
Push:      WhatsApp Business API oder E-Mail über Apps Script
```

### Features
- Kursplan aus Google Sheet lesen
- Mitglied bucht → Zeile wird in Sheet geschrieben
- Trainer sieht Teilnehmerliste direkt im Sheet
- Automatische E-Mail bei Kursausfall
- Limit pro Kurs (Sheet-Formel zählt Buchungen)

### Vorteile
- Extrem schnell aufgesetzt
- Trainer kennt Google Sheets bereits
- Kein Server nötig, kein Hosting nötig
- Kostenlos
- Änderungen am Kursplan: Trainer ändert direkt im Sheet

### Nachteile
- Nicht professionell genug für ein Premium-Studio
- Langsam bei vielen gleichzeitigen Buchungen
- Kein Echtzeit-Update im Frontend
- Begrenzte Skalierbarkeit
- Google-Sheets-API hat Rate Limits

### Aufwand
- Sheet-Vorlage + Apps Script: 1 Prompt
- Frontend: 1 Prompt
- **Gesamt: 2 Prompts, ca. 1 Tag**

### Kosten
- 0 €

---

## OPTION D — Fertiges SaaS-Tool

### Beschreibung
Ein fertiges Kursbuchungssystem wie Virtuagym, Eversports, Fitogram oder Gymhopper. Sofort einsatzbereit, keine Entwicklung nötig.

### Kandidaten

| Tool | Preis/Monat | Stärken | Schwächen |
|---|---|---|---|
| **Fitogram** | ab 39 € | Speziell für Kurse, deutschsprachig, einfach | Wenig Anpassung, eigenes Design |
| **Eversports** | ab 49 € | Bekannt in DE/AT, Marktplatz-Effekt | Provision pro Buchung, Fremd-Branding |
| **Virtuagym** | ab 59 € | Komplettlösung (App, Kurse, Mitglieder) | Teuer, Overengineered für kleines Studio |
| **Gymhopper** | ab 29 € | Günstig, schlank | Wenig Features, kleiner Markt |

### Features (typisch)
- Kursbuchung mit Warteliste
- Trainer-App (iOS/Android)
- Push-Benachrichtigungen
- Mitgliederverwaltung
- Zahlungsabwicklung (für Gäste/Drop-ins)
- Automatische Erinnerungen

### Vorteile
- Sofort einsatzbereit, kein Code nötig
- Professionelle App für Mitglieder
- Support und Updates inklusive
- Zahlungssystem eingebaut

### Nachteile
- Monatliche Kosten (39–99 €)
- Fremdes Branding (nicht 100 % Fitness Factory Look)
- Kein Zugriff auf den Code, keine Anpassung
- Daten liegen beim Anbieter
- Passt nicht ins bestehende Dashboard-Konzept

### Aufwand
- Account anlegen, Kurse eintragen: ca. 2–4 Stunden
- **Kein Claude-Code-Prompt nötig**

### Kosten
- 39–99 €/Monat, ggf. + Provision pro Buchung

---

## OPTION E — WhatsApp Business API + Bot (Upgrade des Ist-Zustands)

### Beschreibung
Die WhatsApp-Gruppe bleibt, wird aber professionalisiert: Ein WhatsApp-Bot übernimmt Buchungen, Absagen und Warteliste. Mitglieder schreiben "BUCHEN Spinning Montag" und der Bot bestätigt oder setzt auf die Warteliste.

### Architektur
```
Bot:       n8n Workflow oder Make.com
Backend:   Google Sheets oder Supabase
WhatsApp:  WhatsApp Business API (über Twilio oder 360dialog)
```

### Features
- Mitglieder buchen per WhatsApp-Nachricht ("BUCHEN [Kurs] [Tag]")
- Bot antwortet: "Gebucht! Platz 7/15" oder "Warteliste Platz 3"
- Automatische Ausfall-Nachricht an alle Gebuchten
- Trainer schreibt "ABSAGE Spinning Montag" → Bot benachrichtigt alle
- Erinnerung 2h vor Kursstart

### Vorteile
- Mitglieder bleiben in WhatsApp (kennen sie schon)
- Kein neues Tool, keine App-Installation
- Professioneller als die aktuelle Gruppe
- Automatische Warteliste und Benachrichtigungen

### Nachteile
- WhatsApp Business API kostet (ab ~50 €/Monat über Twilio)
- Bot-Programmierung nötig (n8n/Make.com)
- Kein visueller Kursplan (nur Text)
- Schwierig für Gäste (müssen erst WhatsApp-Nummer haben)
- Meta kann Regeln ändern

### Aufwand
- n8n Workflow: 1–2 Prompts
- WhatsApp Business API Setup: manuell, ca. 2–3 Stunden
- **Gesamt: 2 Prompts + manuelles Setup**

### Kosten
- WhatsApp Business API: ~50 €/Monat
- n8n: 0 € (self-hosted) oder 20 €/Monat (Cloud)

---

## EMPFEHLUNG

### Für Fitness Factory Hattingen empfehle ich: **Option A oder B**

| Kriterium | A (Custom) | B (Supabase) | C (Sheets) | D (SaaS) | E (WhatsApp) |
|---|---|---|---|---|---|
| Passt zur CI | ★★★★★ | ★★★★★ | ★★★ | ★★ | ★★ |
| Kosten/Monat | 0–5 € | 0–25 € | 0 € | 39–99 € | 50–70 € |
| Aufwand Setup | Mittel | Niedrig-Mittel | Niedrig | Sehr niedrig | Mittel |
| Profi-Eindruck | ★★★★★ | ★★★★★ | ★★★ | ★★★★ | ★★★ |
| Trainer-Überblick | ★★★★★ | ★★★★★ | ★★★★ | ★★★★ | ★★★ |
| Gast-Buchung | ★★★★ | ★★★★★ | ★★ | ★★★★★ | ★★ |
| Dashboard-Integration | ★★★★★ | ★★★★ | ★★ | ★ | ★ |
| Skalierbarkeit | ★★★★★ | ★★★★★ | ★★ | ★★★★ | ★★★ |

### Warum A oder B?
- Passt 1:1 zum bestehenden Tech-Stack (React + Node)
- Kann direkt ins Dashboard integriert werden (Trainer pflegt alles an einem Ort)
- Kein Fremd-Branding, kein monatliches Abo
- Gast-Buchung ohne Account möglich (Name + Telefon)
- PWA-fähig: Mitglieder können es wie eine App auf dem Handy nutzen
- Option B spart Entwicklungszeit durch Supabase Auth + Realtime

### Nächster Schritt
Sobald du dich für eine Option entscheidest, schreibe ich die passenden Claude-Code-Prompts als MD-Dateien in den `prompts/`-Ordner — genau wie bei den bisherigen Website-Prompts.

---

## FLOW-DIAGRAMM (für die Keynote)

```
MITGLIED                          TRAINER
   │                                 │
   ├── Öffnet Kursplan (PWA/Web) ──► Sieht Live-Belegung
   │                                 │
   ├── Klickt "Buchen" ───────────► Teilnehmerliste aktualisiert
   │                                 │
   ├── Erhält Bestätigung ◄──────── (automatisch)
   │                                 │
   ├── 2h vorher: Erinnerung ◄───── (automatisch)
   │                                 │
   │   [Kurs voll?]                  │
   │   └── Warteliste ──────────────► Sieht Warteliste
   │       └── Platz frei? ◄────────── Mitglied sagt ab
   │           └── Nachrücker ◄───── (automatisch)
   │                                 │
   │   [Kurs fällt aus?]            │
   │   └── Push-Nachricht ◄─────── Trainer klickt "Absagen"
   │                                 │
GAST                                │
   ├── Öffnet Gast-Buchung ────────► Sieht Gast-Anfrage
   ├── Name + Telefon eingeben       │
   └── Max. 1 Kurs/Woche ──────────► Bestätigt oder lehnt ab
```
