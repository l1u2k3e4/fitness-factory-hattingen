# PROMPT 5.2 — Dashboard Frontend: Professionelle Single-File HTML App

## Ziel
Erstelle `Dashboard/index.html` — eine vollständige, professionelle Content-Management-Oberfläche als Single-File HTML-App. Alle CSS und JS sind inline. Kein Build-Step nötig. Der Kunde öffnet die Datei im Browser über `http://localhost:3001/dashboard`.

## Design-System

### Farben (Fitness Factory CI)
```css
:root {
  /* Brand */
  --brand-red: #C8102E;
  --brand-red-hover: #A50D24;
  --brand-red-light: #FEF2F2;
  --brand-dark: #1A1A1A;
  --brand-white: #FFFFFF;

  /* Dashboard-spezifisch */
  --bg-primary: #F8FAFC;
  --bg-sidebar: #0F172A;
  --bg-card: #FFFFFF;
  --border: #E2E8F0;
  --border-hover: #CBD5E1;
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --text-muted: #94A3B8;
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;

  /* Dark Mode */
  --dm-bg: #0F172A;
  --dm-card: #1E293B;
  --dm-border: #334155;
  --dm-text: #F1F5F9;
  --dm-text-secondary: #94A3B8;
}
```

### Typografie
- Headings: `Inter, system-ui, -apple-system, sans-serif` (font-weight: 700/800)
- Body: `Inter, system-ui, sans-serif` (font-weight: 400/500)
- Monospace (Daten): `'JetBrains Mono', monospace`
- Import via Google Fonts CDN

### Radius & Spacing
- Cards: `border-radius: 12px`
- Buttons: `border-radius: 8px`
- Inputs: `border-radius: 8px`
- Sidebar-Items: `border-radius: 8px`

---

## Layout-Struktur

```
┌──────────────────────────────────────────────────────────────────┐
│ ┌──────────┐ ┌─────────────────────────────────────────────────┐ │
│ │          │ │  Header: Modulname + Status + Speichern-Button  │ │
│ │  SIDEBAR │ │─────────────────────────────────────────────────│ │
│ │          │ │                                                 │ │
│ │  Logo    │ │            CONTENT-BEREICH                      │ │
│ │  ──────  │ │                                                 │ │
│ │  Module  │ │   (wechselt je nach aktivem Modul)              │ │
│ │  1-8     │ │                                                 │ │
│ │          │ │                                                 │ │
│ │  ──────  │ │                                                 │ │
│ │  Status  │ │                                                 │ │
│ │  Dark    │ │                                                 │ │
│ │  Mode    │ │                                                 │ │
│ └──────────┘ └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────────┘
```

- Sidebar: Fixed links, 260px breit, dunkler Hintergrund (`--bg-sidebar`)
- Content: Scrollbar, `max-width: 1200px`, zentriert
- Header pro Modul: Sticky, weiß, mit Breadcrumb + Save-Button + Undo

---

## Globale Features (in jedem Modul verfügbar)

### 1. PIN-Schutz
Beim ersten Öffnen: Overlay mit PIN-Eingabe (Standard-PIN: `1234`, änderbar im Dashboard unter Einstellungen). PIN wird in `localStorage` gespeichert (30 Tage gültig).

### 2. Auto-Save Indikator
- Grüner Punkt: "Alle Änderungen gespeichert"
- Gelber Punkt: "Ungespeicherte Änderungen"
- Roter Punkt: "Fehler beim Speichern"
- Anzeige im Header rechts

### 3. Toast-Benachrichtigungen
Slide-in von rechts oben bei: Speichern, Upload, Fehler, Restore. Auto-dismiss nach 3s.

### 4. Keyboard Shortcuts
- `Ctrl+S` / `Cmd+S`: Aktuelles Modul speichern
- `Ctrl+Z` / `Cmd+Z`: Letzte Änderung rückgängig
- `1-8`: Modul wechseln (wenn kein Input fokussiert)

### 5. Dark Mode
Toggle-Button in der Sidebar unten. Speichert Präferenz in `localStorage`.

---

## Modul 1: Galerie-Manager

### UI-Elemente
- **Grid-Ansicht:** 3-4 Spalten mit Bild-Thumbnails (16:9 Crop), darunter Dateiname + Kategorie
- **Upload-Zone:** Drag & Drop Bereich oben ("Bilder hierher ziehen oder klicken"), akzeptiert JPG/PNG/WebP
- **Reihenfolge:** Drag & Drop zum Sortieren (HTML5 Drag API oder Sortable-Algorithmus)
- **Pro Bild:**
  - Vorschau (Klick → Lightbox/Vollbild)
  - Alt-Text (Input)
  - Kategorie (Dropdown: Studio, Kurse, Training, Ausstattung, Sauna, Lounge)
  - Löschen-Button (mit Bestätigung)
- **Speichern-Button:** Speichert Reihenfolge, Alt-Texte, Kategorien nach `/api/content/galerie`

### Datenstruktur (JSON)
```json
{
  "galerie": {
    "bilder": [
      { "src": "/images/studio-dsc-01.jpg", "alt": "Fitnessgeräte im Studio", "kategorie": "Studio" },
      { "src": "/images/studio-dsc-02.jpg", "alt": "Kursraum", "kategorie": "Kurse" }
    ]
  }
}
```

### Initialisierung
Beim Laden: Hole aktuelle Galerie-Daten von `/api/content` → Falls `galerie` null ist, lade die Standardwerte aus der Website (fetch `/api/images` und zeige alle verfügbaren Bilder).

---

## Modul 2: Kursplan-Editor

### UI-Elemente
- **Wochenansicht:** Horizontal scrollbare Tabs (Mo–So) oder Akkordeon
- **Pro Tag:** Liste der Kurse als editierbare Karten
  - Kursname (Input, mit Autocomplete-Vorschlägen: Yoga, Spinning, Tabata, Zumba, Tae-Bo, Pilates, Rücken-Fit, Bauch-Express, Full Body Intervall, Wirbelsäulen-Gymnastik)
  - Uhrzeit (Time-Input, `HH:MM`)
  - Dauer (Dropdown: 30 Min, 45 Min, 60 Min, 90 Min)
  - Level (Dropdown: Alle Level, Anfänger, Fortgeschritten)
  - Trainer (Dropdown, befüllt aus Team-Daten)
- **"+ Kurs hinzufügen"** Button pro Tag
- **Kurse löschen:** X-Button an jeder Kurs-Karte
- **Drag & Drop:** Kurse zwischen Tagen verschieben
- **Vorschau:** Zeigt wie der Kursplan auf der Website aussieht (kleine Miniatur)

### Datenstruktur (JSON)
```json
{
  "kursplan": {
    "kurse": [
      {
        "tag": "Montag",
        "tagKurz": "Mo",
        "items": [
          { "name": "Vinyasa-Yoga", "uhrzeit": "09:00", "dauer": "60 Min", "level": "Alle Level" },
          { "name": "Spinning", "uhrzeit": "17:30", "dauer": "45 Min", "level": "Alle Level" }
        ]
      }
    ],
    "hinweis": "Kurszeiten können sich gelegentlich ändern."
  }
}
```

---

## Modul 3: Öffnungszeiten-Editor

### UI-Elemente
- **Tabelle:** Zeile pro Zeitraum (Montag–Freitag, Samstag–Sonntag)
  - Von-Zeit (Time-Input)
  - Bis-Zeit (Time-Input)
- **Sonder-Öffnungszeiten:** Liste mit:
  - Datum (Date-Input)
  - Anlass (Input, z.B. "Heiligabend")
  - Geöffnet von/bis ODER "Geschlossen" Toggle
- **Banner-Hinweis:** Textarea für temporäre Meldung (z.B. "Zwischen Weihnachten und Neujahr gelten veränderte Öffnungszeiten")
  - Toggle: aktiv/inaktiv

### Datenstruktur (JSON)
```json
{
  "oeffnungszeiten": {
    "regulaer": [
      { "tag": "Montag – Freitag", "von": "08:00", "bis": "23:00" },
      { "tag": "Samstag – Sonntag", "von": "10:00", "bis": "17:30" }
    ],
    "sonder": [
      { "datum": "2026-12-24", "anlass": "Heiligabend", "geschlossen": true },
      { "datum": "2026-12-31", "anlass": "Silvester", "von": "10:00", "bis": "15:00", "geschlossen": false }
    ],
    "banner": { "aktiv": false, "text": "" }
  }
}
```

---

## Modul 4: Aktionen & Angebote Manager

### UI-Elemente
- **Aktions-Karten:** Jede Aktion als Card mit:
  - Titel (Input)
  - Beschreibung (Textarea, max 200 Zeichen, Zeichenzähler)
  - Startdatum + Enddatum (Date-Inputs)
  - Aktiv-Toggle (Boolean)
  - Bild hochladen (optional)
  - CTA-Text + CTA-Link
- **"+ Neue Aktion"** Button
- **Status-Badges:** "Aktiv" (grün), "Geplant" (blau), "Abgelaufen" (grau)
- **Bestehende Aktion:** Fremdgeh-Aktion vorausgefüllt anzeigen

### Datenstruktur (JSON)
```json
{
  "aktionen": [
    {
      "id": "fremdgeh-aktion",
      "titel": "Fremdgeh-Aktion",
      "beschreibung": "3 Monate gratis trainieren bei Wechsel von einem anderen Studio.",
      "startDatum": "2026-01-01",
      "endDatum": "2026-12-31",
      "aktiv": true,
      "bild": "/images/aktion-fremdgeh.jpg",
      "ctaText": "Jetzt wechseln",
      "ctaLink": "/fremdgeh-aktion"
    }
  ]
}
```

---

## Modul 5: Bewertungen-Manager

### UI-Elemente
- **Gesamt-Statistik oben:** Durchschnitt (editierbar), Gesamtanzahl (editierbar), Google-Link
- **Bewertungen-Liste:** Karten pro Review mit:
  - Name (Input)
  - Sterne (Klickbare Sterne 1-5)
  - Text (Textarea)
  - Datum/Zeitraum (Input, z.B. "vor 2 Monaten")
  - Sichtbar-Toggle (ausblenden ohne löschen)
- **"+ Bewertung hinzufügen"** Button
- **Drag & Drop** Reihenfolge

### Datenstruktur (JSON)
```json
{
  "bewertungen": {
    "overallRating": 4.9,
    "totalReviews": 167,
    "items": [
      { "name": "Florian Kurth", "sterne": 5, "text": "Das Studio macht...", "datum": "vor 2 Monaten", "sichtbar": true },
      { "name": "Dominik Sociera", "sterne": 5, "text": "Ich war zum...", "datum": "vor 3 Monaten", "sichtbar": true }
    ]
  }
}
```

---

## Modul 6: Team-Manager

### UI-Elemente
- **Trainer-Karten:** Pro Trainer eine große Card mit:
  - Foto-Vorschau (klickbar zum Hochladen eines neuen Fotos)
  - Name (Input)
  - Rolle (Input, z.B. "Inhaber & Cheftrainer")
  - Qualifikationen (Tag-Input: Tippen + Enter → neuer Tag, Klick zum Entfernen)
  - Beschreibung (Textarea, Zeichenzähler)
- **"+ Trainer hinzufügen"** Button
- **Reihenfolge:** Drag & Drop
- **Löschen:** Mit Bestätigungsdialog

### Initialisierung
Vorausgefüllt mit Alex und Carla aus den aktuellen Daten.

### Datenstruktur (JSON)
```json
{
  "team": {
    "mitglieder": [
      {
        "name": "Alex",
        "rolle": "Inhaber & Cheftrainer",
        "qualifikationen": ["Personal Trainer", "Ernährungsberater"],
        "beschreibung": "Alex hat die Fitness Factory...",
        "foto": "/Trainer/Alex_02.jpeg"
      }
    ]
  }
}
```

---

## Modul 7: Hero-Banner Editor

### UI-Elemente
- **Live-Vorschau:** Oben eine Mini-Vorschau des Hero-Bereichs (verkleinert, ~300px hoch)
- **Felder:**
  - Badge-Text (Input, z.B. "Fitnessstudio Hattingen-Holthausen")
  - Headline (Input, groß)
  - Subheadline (Textarea)
  - Primärer CTA: Text + Link
  - Sekundärer CTA: Text + Link
  - Kennzahlen: 3 Stück, jeweils Wert + Label (Inputs)
  - Vertrauenssignal (Input)
- **Hintergrundbild:** Upload + Vorschau

### Datenstruktur (JSON)
```json
{
  "hero": {
    "badge": "Fitnessstudio Hattingen-Holthausen",
    "headline": "Hier kennt man dich.",
    "subheadline": "Dein Studio mit...",
    "ctaPrimary": { "text": "Probetraining Buchen", "href": "/probetraining" },
    "ctaSecondary": { "text": "Kursplan ansehen →", "href": "/kursplan" },
    "kennzahlen": [
      { "wert": "35€", "label": "ab Monat" },
      { "wert": "16", "label": "Live-Kurse" },
      { "wert": "∞", "label": "Sauna inkl." }
    ],
    "vertrauenssignal": "Über 500 zufriedene Mitglieder",
    "hintergrundBild": "/images/banner-hero-01.jpg"
  }
}
```

---

## Modul 8: Benachrichtigungs-Banner

### UI-Elemente
- **Banner-Vorschau:** Zeigt wie der Banner auf der Website aussehen wird
- **Felder:**
  - Text (Textarea, max 120 Zeichen)
  - Typ (Dropdown: Info/Blau, Aktion/Rot, Hinweis/Gelb, Erfolg/Grün)
  - Link (optional, Input + "Link-Text" Input)
  - Startdatum + Enddatum (Date-Inputs)
  - Aktiv-Toggle
  - Position (Dropdown: Über Header, Unter Header)
  - Dismissable (Toggle: Kann der Nutzer den Banner wegklicken?)

### Datenstruktur (JSON)
```json
{
  "banner": {
    "aktiv": false,
    "text": "Neues Kursangebot ab Mai — jetzt entdecken!",
    "typ": "info",
    "link": { "text": "Zum Kursplan", "href": "/kursplan" },
    "startDatum": "2026-05-01",
    "endDatum": "2026-05-31",
    "position": "above-header",
    "dismissable": true
  }
}
```

---

## Sidebar-Extras

### Status-Panel (unten in der Sidebar)
- Grüner/Roter Indikator: "Server erreichbar" / "Server offline"
- Letzte Speicherung: Zeitstempel
- Version: Nummer aus `_meta.version`

### History-Panel (eigene Sidebar-Seite)
- Liste der letzten 20 Backups mit Zeitstempel
- "Wiederherstellen" Button pro Backup (mit Bestätigungsdialog)
- "Aktueller Stand" Vergleich

### Einstellungen (eigene Sidebar-Seite)
- PIN ändern
- Dashboard-URL der Live-Website setzen (für späteres Hosting)
- Dark Mode Toggle
- Export: Gesamte Daten als JSON herunterladen
- Import: JSON-Datei hochladen

---

## Technische Anforderungen

1. **Alles in EINER HTML-Datei** — CSS und JS inline (kein separates Build-System)
2. **Vanilla JavaScript** — kein React, kein Framework (aber ES6+ Klassen/Module-Pattern erlaubt)
3. **Fetch API** für alle Server-Kommunikation (zu `http://localhost:3001/api/...`)
4. **Google Fonts** für Inter + JetBrains Mono (CDN-Import)
5. **Lucide Icons** via CDN (`https://unpkg.com/lucide@latest`) oder inline SVGs
6. **Smooth Transitions:** Alle Modulwechsel mit CSS-Transitions (opacity + transform)
7. **Responsive:** Mindestbreite 1024px (Dashboard ist für Desktop/Laptop gedacht), aber ab 768px nutzbar
8. **Keine externe Bibliothek für Drag & Drop** — nutze HTML5 Drag and Drop API
9. **Bilder-Upload via FormData + fetch** an `/api/upload`
10. **Error Handling:** Alle API-Calls mit try/catch, Fehler als Toast anzeigen

## Verifikation
1. `http://localhost:3001/dashboard` zeigt das Dashboard
2. Alle 8 Module laden korrekt und zeigen die aktuellen Daten
3. Änderungen in jedem Modul werden nach `/api/content/{modul}` gespeichert
4. Bild-Upload funktioniert (Drag & Drop + File-Picker)
5. PIN-Schutz verhindert Zugang ohne korrekten PIN
6. Dark Mode toggle funktioniert
7. History zeigt Backups und Restore funktioniert
8. Ctrl+S speichert, Toast-Notifications erscheinen
9. Das Dashboard sieht professionell aus — kein "Hobby-Projekt"-Look
