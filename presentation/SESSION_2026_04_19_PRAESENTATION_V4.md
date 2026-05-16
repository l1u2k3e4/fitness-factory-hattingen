# Session 2026-04-19 — Präsentation v4 (21 Slides)

## Ziel
Upgrade von v3 (20 Slides) auf **v4 (21 Slides)** — faktisch wasserdicht,
entpersonalisiert, mit physischem Studio-Auftreten und schärferem
Überzeugungs-Framing.

**Warum nötig:** Inhaber Alex hat in den letzten 4 Jahren **3 Websites**
gekauft, die alle keinen ROI gebracht haben. Diese Präsentation muss
jede ungenaue Behauptung vermeiden und zeigen, dass diesmal eine
Verkaufsanlage entsteht — keine weitere digitale Visitenkarte.

---

## Änderungen gegenüber v3

### Entfernt
- AkquiseFlow-Branding (Footer, Slide 1, Slide 21) — Platzhalter für neues Logo
- Instagram-Slide (v3 Slide 16)
- v1-Text-Bilder (`FitnessFactory.003/.004.jpeg` auf Slide 5,
  `.009/.010.jpeg` auf Slide 13)
- Falsche SEO-Behauptung "Google sieht euch nicht" (stimmt nicht — Rich Snippet läuft)
- Falsche "3 Seiten → 404" (stimmt nicht — Anker-Nav, nicht 404)
- Tippfehler-Punkt "MitglieDschaft" (in CAPS unsichtbar auf Live-Site)

### Neu / geändert
| Slide | Änderung |
|---|---|
| 1 | AkquiseFlow-Zeile raus |
| 2 | Fazit-Zeile rot: *"Die Website ist kein Design-Projekt. Sie ist eine Verkaufsanlage."* |
| 3 | 3 ehrliche Badges (Mobile/Cookie-Wall, One-Pager, Trust-Signale versteckt) + je Conversion-Impact-Pfeil |
| 5 | Echte Desktop-Crops (`desktop-old-top.png`, `desktop-new-top.png`) statt v1-Bilder |
| 7 | 7 Schwachpunkte: Mobile Logo · Kursplan veraltet · Anker-Nav · Route-Funktion · SEPA · GMX · Team |
| 13 | Echte Mobile-Screenshots (`mobile-old-top.png`, `mobile-new-top.png`) inkl. Cookie-Wall |
| **16 NEU** | Studio-Auftreten vorher: Brustpresse / Sauna / Spinde mit Klebeband-Zetteln |
| **17 NEU** | Schilder-System (CI-Design): 3 Nachher-Fotos mit Rahmen/Metallschild |
| 18 | Preis des Nichtstuns mit **4. Karte rot**: *"3 × / 4 Jahre · Websites gekauft · Ohne Verkaufs-Wirkung. Das Muster muss enden."* |
| 20 | Bereit-Card mit Zusatz: *"Diesmal gebaut, um zu bleiben."* |
| 21 | AkquiseFlow-Zeile raus, Luke-Signatur bleibt |

---

## Technische Umsetzung

### Assets neu erzeugt
- `presentation/figma-screenshots/v4/desktop-old-top.png` (1440×900, via Playwright `_screenshot_v4.py`)
- `presentation/figma-screenshots/v4/desktop-new-top.png` (1440×900)
- `presentation/figma-screenshots/v4/mobile-old-top.png` (1170×1992, iPhone 13)
- `presentation/figma-screenshots/v4/mobile-new-top.png` (1170×1992)
- `presentation/figma-screenshots/v4/{brustpresse,sauna,spinde}_voher.jpg` (HEIC→JPG via sips, rotiert)
- `_web.jpg`-Varianten (1800px max) — nur für Claude-Read, nicht im PPTX

### Schilder-Nachher (direkt aus Quelle)
- `/FitnessFactory/Schilder/Brustpresse/Brustpresse_nachher.jpeg` (1792×2400)
- `/FitnessFactory/Schilder/Sauna/Sauna_nachher.jpeg` (1792×2400)
- `/FitnessFactory/Schilder/Spinde/Spinde_nacher.jpeg` (1792×2400)

### Script
- `presentation/generate_pptx.py` — idempotent, OUTPUT auf `FitnessFactory_Relaunch_v4.pptx`
- Ausführen: `/Library/Developer/CommandLineTools/usr/bin/python3 presentation/generate_pptx.py`

### Verifizierte Fakten (vor Finalisierung)
- `curl https://fitness-factory-hattingen.de/` bestätigt:
  - `<title>Home -</title>` ✓
  - `#Kursplan`, `#faq`, `#nachricht` = Anker-Sprungmarken
  - `/probetraining/`, `/mitgliedschaft/` = echte Seiten

---

## Status
- ✅ v4 erstellt: `presentation/FitnessFactory_Relaunch_v4.pptx` (22 MB, 21 Slides, 15 Bilder)
- ✅ v4 als Keynote: `/FitnessFactory/Keynote/Presentation/FitnessFactory_Relaunch_v4.key` (24 MB, via AppleScript-Konvertierung)
- ✅ v3 bleibt als Referenz (`FitnessFactory_Relaunch_v3.pptx` + `.key`)
- ⏳ Review durch Alex steht aus

## Keynote-Export-Workflow
PPTX → `.key` via AppleScript (Keynote muss installiert sein):
```bash
osascript <<'APPLESCRIPT'
tell application "Keynote"
    activate
    set theDoc to open POSIX file "/path/to/v4.pptx"
    delay 3
    save theDoc in POSIX file "/path/to/FitnessFactory/Keynote/Presentation/v4.key"
    delay 2
    close theDoc saving no
end tell
APPLESCRIPT
```

## Offene Punkte nach Review
- Optional: LibreOffice installieren für automatisches PDF/Preview-Rendering
- Optional: Barlow Condensed + Plus Jakarta Sans als Custom-Fonts einbinden
- Logo-Platzhalter im Footer mit echtem neuen Logo ersetzen (sobald geliefert)
- Bei Bedarf: Abschluss-Slide 21 streichen (wenn Vortrag < 10 Min bleiben muss)

---

## Referenz-Dateien

| Datei | Zweck |
|---|---|
| `presentation/generate_pptx.py` | Generator (idempotent) |
| `presentation/FitnessFactory_Relaunch_v4.pptx` | Output (21 Slides) |
| `presentation/figma-screenshots/v4/` | Alle v4-Assets |
| `presentation/_screenshot_v4.py` | Playwright-Screenshot-Script |
| `presentation/SESSION_2026_04_13_PRAESENTATION_V3.md` | Vorgänger-Session |
