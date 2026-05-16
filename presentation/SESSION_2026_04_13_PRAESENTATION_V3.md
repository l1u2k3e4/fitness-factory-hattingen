# Session 2026-04-13 — Präsentation v3 (20 Slides)

## Ziel
Reduzierung der **55-Slide-Präsentation** auf **20 Slides im Karteikarten-Stil** —
Vorbild: Präsentation des Vaters (`FitnessFactory_Neuauftritt_v2.1/`, 20 Slides, prägnanter Stil).

**Kunde:** Alex (Fitness Factory Hattingen)
**Zweck:** Freigabe-Präsentation für den Website-Relaunch (~10 Min Vortrag).

---

## Analyse der 55 Slides (deine Version)

### Redundanzen entfernt
- Vorher/Nachher-Doppel-Slides → 1 Split-Layout pro Thema
- Doppelte Kapitel-Trenner (deine + "Neuauftritt"-Slide) → einer reicht
- Kursplan hatte 3 Slides → 1 Slide
- Farbwelt hatte 4 Slides → 1 Slide

### Herausgenommen (nicht entscheidungsrelevant)
- Bildbearbeitung-Workflow (7 Slides über Lightroom-Prozess) → 1 Vorher/Nachher
- Hex-Codes/RGB-Werte im Detail
- Instagram-Highlights einzeln (Training, Gym, Sauna, Feedback) → 1 Zusammenfassung

### Von Vater übernommen
- Emotionaler Hook ("Die eine Frage")
- Impact-Slide ("Der Preis des Nichtstuns" mit 3 großen Zahlen)
- Rote Kapitel-Trenner mit großer Nummer

---

## Finale 20-Slide-Struktur

| # | Titel | Typ |
|---|---|---|
| 1 | Fitness Factory Hattingen — Website-Neuauftritt | Titel |
| 2 | Die eine Frage | Hook |
| 3 | Website heute (3 rote Badges) | Problem-Intro |
| 4 | **01 — Schwachstellen** | Kapitel-Trenner (rot) |
| 5 | Navigation & Header (Vorher/Nachher) | Split |
| 6 | Kursplan & Bewertungen (2x2 Grid) | Cards |
| 7 | Details die Vertrauen kosten | Icon-Liste |
| 8 | **02 — Der Neuauftritt** | Kapitel-Trenner (rot) |
| 9 | Header & Hero (neuer Screenshot) | Screenshot + Checks |
| 10 | Leistungen & Preise | 2 Cards |
| 11 | Kursplan & FAQ | Screenshot + Checks |
| 12 | Kontakt & Footer | Screenshot + Checks |
| 13 | Mobile-First (Vorher/Nachher Mockups) | Split |
| 14 | **03 — Mehr als eine Website** | Kapitel-Trenner (rot) |
| 15 | Dashboard | Screenshot + 1 Satz |
| 16 | Instagram & Bildbearbeitung | 3 Cards |
| 17 | Der Preis des Nichtstuns (68% / 3 Sek / 2.430€) | Große Zahlen |
| 18 | Farbwelt & Marke | Farb-Swatches |
| 19 | Nächste Schritte (5-Schritte-Timeline + "Bereit?") | Timeline |
| 20 | Die Website ist fertig. | Abschluss |

---

## Design-Prinzipien (abgeleitet von Vaters Präsentation)
1. Max. 30 Wörter pro Slide (ohne Headlines)
2. 1 Aussage pro Slide
3. Kapitel-Trenner in Rot mit großer Nummer + Titel + Einzeiler
4. Keine Bullet-Walls — stattdessen Cards, Icons, Split-Layouts, große Zahlen
5. Screenshots sprechen lassen
6. Fazit-Zeile am Ende jeder Slide (kursiv, grau)

## Brand-Farben
- `BLACK` #111111 — Hintergrund
- `DARK` #1A1A1A — Cards
- `RED` #E70711 — CTA, Akzent
- `RED_DARK` #8B1A1A — Kapitel-Trenner
- `WHITE` #FFFFFF — Headlines
- `GRAY` #999999 — Metainfos
- `LIGHT_GRAY` #CCCCCC — Body-Text

---

## Technische Umsetzung

**Script:** `presentation/generate_pptx.py`
**Output:** `presentation/FitnessFactory_Relaunch_v3.pptx`
**Library:** `python-pptx`

### Python-Runtime
- System-Python: `/Library/Developer/CommandLineTools/usr/bin/python3` ← HAT python-pptx
- Venv `/Users/lukekozik/.browser-use-env/bin/python3` ← hat KEIN python-pptx (kein pip)
- **Befehl zum Generieren:**
  ```bash
  /Library/Developer/CommandLineTools/usr/bin/python3 presentation/generate_pptx.py
  ```

### Verwendete Screenshots
- `presentation/figma-screenshots/old/01-startseite.png` → Slide 3
- `presentation/FitnessFactory/FitnessFactory.003.jpeg` + `004.jpeg` → Slide 5 (Nav)
- `presentation/FitnessFactory/FitnessFactory.009.jpeg` + `010.jpeg` → Slide 13 (Mobile)
- `presentation/figma-screenshots/new/01-hero.png` → Slide 9
- `presentation/figma-screenshots/new/03-kursplan.png` → Slide 11
- `presentation/figma-screenshots/new/05-kontakt.png` → Slide 12
- `presentation/FitnessFactory/FitnessFactory.030.jpeg` → Slide 15 (Dashboard)

---

## Status
- ✅ v3 erstellt (20 Slides, `.pptx`)
- ✅ Script idempotent — kann beliebig oft neu generiert werden
- ⏳ Review mit Alex steht aus
- ⏳ Mögliche Anpassungen nach Feedback

## Offene Punkte / Mögliche Verbesserungen
- Slide 3: Bessere Platzierung der Badges über dem Screenshot prüfen
- Slide 18: Farbwelt-Slide visuell weiter aufwerten (ggf. Logo-Vergleich alt/neu)
- Slide 19: Timeline-Stil evtl. horizontal statt vertikal
- Evtl. Platzhalter-Slide für echte Kundenfotos (Trainer-Team) hinzufügen
- Typografie: Noch keine Custom-Fonts (Barlow Condensed + Plus Jakarta Sans) eingebunden —
  aktuell nur Arial / Arial Black. Bei Bedarf Fonts installieren und einbinden.
- Möglicherweise animierte Übergänge / Master-Slide-Layouts ergänzen

---

## Referenz-Dateien

| Datei | Zweck |
|---|---|
| `presentation/generate_pptx.py` | Generator-Script (Python) |
| `presentation/FitnessFactory_Relaunch_v3.pptx` | Output (20 Slides) |
| `presentation/FitnessFactory/*.jpeg` | Quelle 55 Slides (alte Version) |
| `presentation/FitnessFactory_Neuauftritt_v2.1/*.jpeg` | Referenz (Vaters Version, 20 Slides) |
| `presentation/relaunch-praesentation.html` | Alte HTML-Präsentation (22 Slides) |
| `~/.claude/plans/jiggly-coalescing-sutton.md` | Genehmigter Plan |
