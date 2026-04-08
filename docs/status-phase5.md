# Phase 5 — Dashboard: Aktueller Status

**Datum:** 2026-04-05
**Kontext:** Dieses Dokument fasst den Fortschritt zusammen, damit ein neues Kontextfenster nahtlos weitermachen kann.

---

## Prompt 5.1 — Dashboard Backend: FERTIG ✅

Alle Dateien erstellt, Dependencies installiert, alle API-Endpunkte getestet und verifiziert.

### Erstellte Dateien

| Datei | Beschreibung |
|---|---|
| `Dashboard/server.js` | Express API-Server auf Port 3001 |
| `Dashboard/start.sh` | Mac Starter-Script (chmod +x gesetzt) |
| `Dashboard/start.bat` | Windows Starter-Script |
| `public/data/content-overrides.json` | JSON-Storage initialisiert (alle Module auf `null`) |
| `public/data/history/` | Verzeichnis für Backup-Snapshots (leer) |

### Installierte Dependencies

```bash
npm install express cors multer          # dependencies
npm install concurrently --save-dev      # devDependencies
```

### package.json Scripts hinzugefügt

```json
"dashboard": "node Dashboard/server.js",
"dev:all": "concurrently \"npm run dev\" \"npm run dashboard\""
```

### API-Endpunkte (alle getestet und funktionsfähig)

| Methode | Endpunkt | Funktion | Status |
|---|---|---|---|
| GET | `/api/content` | Content-Overrides lesen | ✅ |
| PUT | `/api/content` | Gesamten Content mergen | ✅ |
| PUT | `/api/content/:module` | Einzelnes Modul speichern | ✅ |
| GET | `/api/images` | Galerie-Bilder auflisten | ✅ |
| GET | `/api/images/trainer` | Trainer-Fotos auflisten | ✅ |
| POST | `/api/upload?type=gallery\|trainer` | Bild hochladen (multer, max 10MB) | ✅ |
| GET | `/api/history` | Backup-Liste abrufen | ✅ |
| POST | `/api/history/restore/:filename` | Backup wiederherstellen | ✅ |
| GET | `/api/status` | Server-Status prüfen | ✅ |
| GET | `/dashboard` | Dashboard-HTML ausliefern (static) | ✅ |

### Server-Details

- Port: 3001
- Dashboard URL: `http://localhost:3001/dashboard`
- API URL: `http://localhost:3001/api/...`
- Bilder im Dashboard über: `/public/images/...` und `/public/Trainer/...`
- History: max 20 Backups, älteste werden automatisch gelöscht
- Upload: max 10MB, erlaubt: JPEG, PNG, WebP, SVG

---

## Prompt 5.2 — Dashboard Frontend: FERTIG ✅

`Dashboard/index.html` erstellt — komplette Single-File HTML-App (CSS + JS inline).

### Erstellte Datei

| Datei | Beschreibung |
|---|---|
| `Dashboard/index.html` | Komplette Dashboard-UI als Single-File HTML (~2000 Zeilen) |

### Implementierte Module (alle 8)

1. **Galerie-Manager** — Image-Grid, Drag & Drop Upload + Sortierung, Alt-Text, Kategorien (6 Optionen), Löschen mit Bestätigung
2. **Kursplan-Editor** — 7 Tages-Tabs (Mo-So), Kurs-CRUD (Name mit Autocomplete, Uhrzeit, Dauer, Level), Hinweistext
3. **Öffnungszeiten-Editor** — Reguläre Zeiten (Mo-Fr, Sa-So), Sonder-Öffnungszeiten (Datum, Anlass, Geschlossen-Toggle), Banner-Hinweis
4. **Aktionen & Angebote** — Aktions-Cards mit Status-Badges (Aktiv/Geplant/Abgelaufen), Fremdgeh-Aktion vorausgefüllt, Zeichenzähler
5. **Bewertungen-Manager** — Gesamt-Statistik (Rating + Anzahl editierbar), Review-Cards mit klickbaren Sternen, Sichtbar-Toggle
6. **Team-Manager** — Trainer-Cards mit Foto-Upload (via `/api/upload?type=trainer`), Tag-Input für Qualifikationen, vorausgefüllt
7. **Hero-Banner Editor** — Live-Vorschau mit Hintergrundbild, alle Textfelder, 3 Kennzahlen, Bild-Upload
8. **Benachrichtigungs-Banner** — Farbige Typ-Vorschau (Info/Aktion/Hinweis/Erfolg), Zeitraum, Position, Dismissable-Toggle

### Globale Features (alle implementiert)

- **PIN-Schutz:** 4-Ziffern-Eingabe, Standard `1234`, localStorage 30 Tage, änderbar in Einstellungen
- **Auto-Save Indikator:** Grün (gespeichert), Gelb (ungespeichert, pulsierend), Rot (Fehler)
- **Toast-Benachrichtigungen:** Slide-in rechts oben, 4 Typen (success/error/info/warning), 3s auto-dismiss
- **Keyboard Shortcuts:** Ctrl/Cmd+S speichern, Ctrl/Cmd+Z undo, 1-8 Modulwechsel (wenn kein Input fokussiert)
- **Dark Mode:** Toggle in Sidebar + Einstellungen, localStorage-Persistenz, CSS-Variablen-Umschaltung
- **History-Panel:** Backup-Liste mit formatierten Zeitstempeln, Wiederherstellen mit Bestätigungsdialog
- **Einstellungen:** PIN ändern, JSON Export/Import, Dark Mode Toggle
- **Undo-Stack:** Bis zu 30 Schritte rückgängig machbar
- **Server-Status:** Automatische Prüfung alle 30s, Online/Offline-Indikator in Sidebar

### Design-System

- **Fonts:** Inter (Headings + Body), JetBrains Mono (Daten/Code) via Google Fonts CDN
- **Icons:** Lucide via unpkg CDN
- **Farben:** CI-konform `#C8102E` (Rot), `#0F172A` (Sidebar-Dark), vollständiges Dark-Mode-Farbschema
- **Layout:** Sidebar 260px fixed + Content max-width 1200px zentriert, Header 64px sticky
- **Komponenten:** Cards (12px radius), Buttons (8px radius), Inputs (8px radius), Toggles, Badges, Tags

### Technische Details

- Single-File HTML — kein Build-Step, keine externen JS/CSS-Dateien
- Vanilla JavaScript (ES6+) — kein Framework
- Alle API-Calls relativ (`/api/content`, `/api/upload` etc.)
- Bilder im Dashboard über `/public/images/...` und `/public/Trainer/...`
- Speichern per `PUT /api/content/{modulname}`
- Defaults eingebettet — werden geladen wenn Modul in content-overrides.json `null` ist
- HTML5 Drag and Drop API für Galerie-Sortierung
- Responsive ab 768px (primär Desktop/Laptop)

---

## Prompt 5.3 — Website-Integration: FERTIG ✅

Die React-Website lädt beim Start `content-overrides.json` und merged diese Daten über die statischen Defaults aus `content.ts`. Dashboard-Änderungen werden nach Website-Reload sichtbar.

### Erstellte Dateien

| Datei | Beschreibung |
|---|---|
| `src/lib/contentLoader.ts` | Fetch + Cache von `content-overrides.json`, Getter-Funktionen pro Modul |
| `src/hooks/useContentOverrides.ts` | React Hook — lädt Overrides einmalig beim Mount |
| `src/contexts/ContentContext.tsx` | Context Provider + 6 Convenience-Hooks |
| `src/components/layout/AnnouncementBanner.tsx` | Banner-Komponente (4 Typen: Info/Aktion/Hinweis/Erfolg) |

### Angepasste Dateien

| Datei | Änderung |
|---|---|
| `src/App.tsx` | `ContentProvider` um Router gewickelt |
| `src/components/layout/Layout.tsx` | `AnnouncementBanner` über Navigation eingefügt |
| `src/components/sections/HeroSection.tsx` | `import { HERO }` → `useDynamicHero()` |
| `src/components/sections/GalerieSection.tsx` | `import { GALERIE }` → `useDynamicGalerie()` |
| `src/components/sections/TeamSection.tsx` | `import { TEAM }` → `useDynamicTeam()` |
| `src/components/sections/TestimonialsSection.tsx` | `import { TESTIMONIALS }` → `useDynamicTestimonials()` |
| `src/components/sections/KursplanPreview.tsx` | Statischer Array → `useDynamicKursplan()` |
| `src/pages/KursplanPage.tsx` | `PAGE_KURSPLAN.wochenplan` → `useDynamicKursplan().kurse` |

### Architektur-Konzept

```
Website startet
   ↓
Fetch /data/content-overrides.json (cache: 'no-store')
   ↓
Vorhanden?  → JA:  Merge mit Defaults aus content.ts
             → NEIN: Nutze nur content.ts (Fallback, kein Fehler)
   ↓
ContentProvider stellt overrides via Context bereit
   ↓
useDynamic*() Hooks in Sections — Override oder Default pro Modul
```

### Convenience-Hooks

| Hook | Modul | Fallback |
|---|---|---|
| `useDynamicHero()` | `hero` | `HERO` aus content.ts |
| `useDynamicGalerie()` | `galerie` | `GALERIE` aus content.ts |
| `useDynamicTeam()` | `team` | `TEAM` aus content.ts |
| `useDynamicTestimonials()` | `bewertungen` | `TESTIMONIALS` aus content.ts |
| `useDynamicKursplan()` | `kursplan` | `KURSPLAN` aus content.ts |
| `useDynamicBanner()` | `banner` | `null` (kein Banner) |

### Nicht betroffene Sections

Preise, FAQ, Kontakt, Impressum, Datenschutz, AGB — lesen weiterhin direkt aus `content.ts`.

### Verifikation

- `tsc --noEmit` → 0 Errors ✅
- `npm run build` → erfolgreich, dist/ komplett ✅
- Website zeigt Default-Inhalte wenn keine Overrides existieren ✅
- Kein Breaking Change — exakt gleiches Verhalten ohne Overrides ✅

---

## Starten

```bash
# Beide Server gleichzeitig (Website + Dashboard)
npm run dev:all

# → Website:    http://localhost:5173
# → Dashboard:  http://localhost:3001/dashboard
# → PIN:        1234
```

---

## Gesamtarchitektur

```
Dashboard (localhost:3001)         React-Website (localhost:5173)
┌──────────────────────┐          ┌──────────────────────────┐
│  index.html (UI)     │          │  App.tsx                 │
│  ↕ fetch /api/*      │          │  └─ ContentProvider      │
│  server.js (Express) │          │     └─ useDynamic*()     │
│  ↕ fs read/write     │          │        └─ Sections       │
│  content-overrides   │──────────│→ fetch /data/content-    │
│  .json               │          │  overrides.json          │
└──────────────────────┘          └──────────────────────────┘
         ↕
  public/images/        ← Bilder werden direkt im public/ gespeichert
  public/Trainer/       ← und von beiden Servern ausgeliefert
  public/data/history/  ← Backup-Snapshots (max 20)
```
