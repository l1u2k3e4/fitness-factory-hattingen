# Session 2026-04-20 — Präsentation v5 (25 Slides)

## Kontext

- v4 liegt als 21-Slide-PPTX + KEY vor (2026-04-19)
- Vater hat parallel eigene Keynote erstellt: `FitnessFactory_Neuauftritt_v2.1.key` (20 Slides, in `/FitnessFactory/Keynote/Presentation/`)
- Vater-Stil liefert stärkeren **argumentativen Rahmen**: jede Verbesserung mit "Aufgabe"-Slide begründet
- Ziel v5: stärkste Vater-Slides integrieren, Slide-Count ≤ 25, Design dezent erweitern, v4 bleibt als Fallback

## Entscheidungen

- **Vater-Slides übernommen:** Navigation-Aufgabe (V15), Kursplan-Aufgabe (V5), Logo-Aufgabe (V10), Logo-Tiefenanalyse (V11), Logo Option A/B (V12)
- **Design:** dezent (rote vertikale Linie links, rote Caps-Sektions-Labels, Fact-Cards mit rotem Seitenstreifen, rote Icon-Circles)
- **Slide-Count:** 25 (unter 30-Budget)
- **Gestrichen vs v4:** v4-Slide 19 "Farbwelt & Marke" (Logo-Empfehlung jetzt auf Slide 13); v4-Slide 20+21 fusioniert zu v5-Slide 25

## Final-Struktur v5 (25 Slides)

| # | Slide | Quelle |
|---|---|---|
| 1 | Titel | v4 |
| 2 | Die eine Frage | v4 |
| 3 | Website heute (Status Quo) | v4 |
| 4 | Kapitel 01 — Schwachstellen | v4 |
| **5** | **Navigation-Aufgabe** | **Vater 15 (NEU)** |
| 6 | Navigation & Header V/N | v4 |
| **7** | **Kursplan-Aufgabe** | **Vater 5 (NEU)** |
| 8 | Kursplan & Bewertungen V/N | v4 |
| 9 | Details, die Vertrauen kosten | v4 |
| **10** | **Kapitel 02 — Das Logo** | **NEU** |
| **11** | **Logo-Aufgabe** | **Vater 10 (NEU)** |
| **12** | **Logo-Tiefenanalyse** | **Vater 11 (NEU)** |
| **13** | **Logo Option A vs B** | **Vater 12 (NEU)** |
| 14 | Kapitel 03 — Der Neuauftritt | v4 |
| 15 | Header & Hero | v4 |
| 16 | Leistungen & Preise | v4 |
| 17 | Kursplan & FAQ | v4 |
| 18 | Kontakt & Footer | v4 |
| 19 | Mobile-First V/N | v4 |
| 20 | Kapitel 04 — Mehr als eine Website | v4 |
| 21 | Dashboard | v4 |
| 22 | Schilder vorher | v4 |
| 23 | Schilder CI-Design | v4 |
| 24 | Der Preis des Nichtstuns | v4 (Card 4 textlich angepasst) |
| 25 | Nächste Schritte + Abschluss (fusioniert) | v4 (S.20+21) |

## Design-Akzente

Implementiert als Helper in `generate_pptx_v5.py`:

- `add_left_accent(slide)` — rote vertikale Linie links (Pt 6, volle Höhe)
- `add_section_label(slide, text)` — Caps-Label oben (11pt bold, rot)
- `add_fact_card(slide, x, y, w, h, title, body, accent_color)` — flaches Rechteck mit Pt(4) rotem Seitenstreifen
- `add_icon_circle(slide, left, top, size, icon_char, fill_color)` — `MSO_SHAPE.OVAL` mit zentriertem Unicode-Glyph
- `add_arrow_list(slide, items, ...)` — Bullet-Liste mit → Icon

## Layout-Bugs während Build gefixt

| Slide | Problem | Fix |
|---|---|---|
| 6 | 4. Bullet kollidierte mit Quote-Text | Quote entfernt (Vorher/Nachher-Screenshots tragen Aussage) |
| 12 | 2x2 Fact-Card-Grid überschritt Footer-Linie | Grid-Position: obere y=2.75, untere y=4.8, card_h=1.95 |
| 13 | Empfehlungs-Text durchschnitten von Footer-Linie | y=6.55 statt y=6.75 + bold |
| 20 | Chapter-Titel "Mehr als\neine Website" mit Riesen-Zeilenabstand | `\n` entfernt — passt in eine Zeile bei 48pt |
| 22/23 | Quote-Text durchschnitten, überlappte mit Hints | img_h=3.7 (von 4.0), Labels y=5.75, Hints y=6.1, Quote y=6.5 |
| 24 | "~2.430 €" + "3 × / 4 Jahre" wrappten ungünstig | Kompaktere Strings, n_size für len>6 auf 34pt |

## Kritische Dateien

| Pfad | Rolle |
|---|---|
| `presentation/generate_pptx_v5.py` | v5-Build-Einstieg (Fork von v4-Generator, ~1160 Zeilen) |
| `presentation/generate_pptx.py` | v4-Build, UNBERÜHRT (Fallback) |
| `presentation/FitnessFactory_Relaunch_v5.pptx` | **Output v5** |
| `presentation/FitnessFactory_Relaunch_v4.pptx` | Fallback |
| `/FitnessFactory/Keynote/Presentation/FitnessFactory_Relaunch_v5.key` | Keynote-Export (25.5 MB) |
| `public/images/logo-ff-jpg-cropped.jpg` | Logo für Slide 11 |
| `presentation/figma-screenshots/v4/` | Alle Screenshots wiederverwendet (keine Neu-Erstellung) |

## Build-Kommandos

```bash
# 1. PPTX bauen
/Library/Developer/CommandLineTools/usr/bin/python3 presentation/generate_pptx_v5.py

# 2. Keynote-Export via AppleScript
osascript -e 'tell application "Keynote"
  activate
  set d to open POSIX file "/.../presentation/FitnessFactory_Relaunch_v5.pptx"
  delay 5
  save d in POSIX file "/.../FitnessFactory/Keynote/Presentation/FitnessFactory_Relaunch_v5.key"
  delay 3
  close d saving no
end tell'

# 3. PDF-Preview via Keynote-PDF-Export + pdftoppm
osascript -e 'tell application "Keynote"
  activate
  set d to open POSIX file "/.../FitnessFactory_Relaunch_v5.pptx"
  delay 5
  export d to POSIX file "/tmp/ff_v5_render.pdf" as PDF
  delay 2
  close d saving no
end tell'
pdftoppm -r 80 -jpeg /tmp/ff_v5_render.pdf /tmp/ff_v5_pages/slide
```

## Lessons Learned

- **Keynote-PDF-Export ignoriert NBSP `\u00a0`** — Text wrappt trotzdem. Lösung: kompaktere Strings oder kleinere Font.
- **LibreOffice ist nicht installiert** — `soffice --convert-to pdf` schlägt fehl. Keynote ist alternative Engine für PDF-Export.
- **v4 unberührt lassen** als Fallback — v5 ist als Fork implementiert, nicht als Replacement.
- **Vater-Stil als Argumentations-Rahmen** — "Aufgabe → Aktuelle Fassung → Ideale Umsetzung" gibt jede Schwachstelle objektive Legitimation vor der Korrektur. Stärker als nur Vorher/Nachher.
