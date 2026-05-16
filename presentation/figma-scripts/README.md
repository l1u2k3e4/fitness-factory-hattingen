# Fitness Factory Relaunch Deck — Figma-Slides Paket

**Status:** Blockiert durch Figma MCP Rate-Limit (Starter Plan)
**Erstellt:** 2026-04-10

---

## Was in diesem Ordner liegt

- **`slides-content.json`** — Content-Definition aller 25 neuen Slides (Kapitel, Titel, Bullets, Footer, Screenshot-Referenzen)
- **`create-slides.js`** — Ausführbares Figma Plugin API Skript (14k Zeichen, passt in einen einzigen `use_figma`-Call)
- **`README.md`** — Diese Datei

## Screenshots (bereit zum Einziehen)

- **Alte Website:** `../figma-screenshots/old/`
  - `01-startseite.png` — Homepage Hero mit dunkler Nav
  - `02-mitgliedschaft.png` — 3 Tarif-Karten (55€/45€/35€)
  - `03-404-error.png` — **Beleg:** 4 Hauptseiten (`/kursplan/`, `/kontakt/`, `/faq/`, `/leistungen/`) liefern identische 404-Seite

- **Neue Website:** `../figma-screenshots/new/`
  - `01-hero.png` — Clean Hero "Dein Gym in Hattingen"
  - `02-probetraining.png` — 4-Block-Flow
  - `03-kursplan.png`
  - `04-mitgliedschaft.png` — 3 saubere Pricing-Karten
  - `05-kontakt.png`
  - `06-ueber-uns.png`

---

## Die 25 Slides (Übersicht)

### Kapitel 1 — Die aktuelle Website
1. **D1** Divider "Die aktuelle Website"
2. **P1** 4 Hauptseiten liefern 404 (Nav) + 📷 404-Screenshot
3. **P2** Bankdaten offen im Netz (DSGVO) + 📷 Mitgliedschaft alt
4. **P3** Kein CTA auf dem Handy (Mobile)
5. **P4** Die Trainer sind unsichtbar (Vertrauen)
6. **P5** Conversion-Score: 3,7/10
7. **P6** Telefon nur im Footer
8. **P7** Detailfehler überall (Content) + 📷 Startseite alt
9. **P8** Technologie-Ballast

### Kapitel 2 — Die neue Website
10. **D2** Divider "Die neue Website"
11. **V1** Sticky-CTA. Immer sichtbar. + 📷 Neue Hero
12. **V2** WhatsApp auf jeder Seite
13. **V3** Das Team wird sichtbar + 📷 Über Uns
14. **V4** DSGVO-sicher by design
15. **V5** Probetraining, neu gedacht + 📷 Probetraining
16. **V6** Trust im Hero
17. **V7** Vite · React · TypeScript
18. **V8** Core Web Vitals: grün + 📷 Mitgliedschaft neu

### Kapitel 3 — Weitere Verbesserungen
19. **D3** Divider "Mehr als Relaunch"
20. **W1** All-inclusive, nicht Aufpreis
21. **W2** Fremdgehen lohnt sich
22. **W3** Du vs. die Ketten
23. **W4** Familiär statt Massenstudio
24. **W5** FAQ beantwortet Kaufeinwände
25. **W6** Kursplan, der wirklich hilft + 📷 Kursplan neu
26. **W7** Phase 3: KI-Chatbot

---

## Design-System (aus bestehenden Figma-Slides extrahiert)

- **Canvas:** 3840×2160 (4K, 16:9)
- **Background:** Schwarz
- **Text:** Inter Bold (Headlines) / Inter Regular (Body) / Inter Semi Bold (Footer)
- **Headline:** 260pt (Content), 380pt (Divider)
- **Kicker:** 48pt farbig (Rot für Probleme, Grün für Vorteile, Amber für Divider), Letter-Spacing 8%
- **Bullet-Body:** 80pt weiß, Line-Height 140%
- **Footer-Quote:** 60pt Semi Bold, farbig
- **Logo:** AkquiseFlow (bleibt aus Template-Clone erhalten)
- **Page Number:** Zweistellig, unten rechts (bleibt aus Template-Clone)
- **Separator-Line:** Weiß, aus Template-Clone

---

## Wie das Skript ausgeführt wird

**Voraussetzung:** Figma MCP Tool-Call-Limit muss verfügbar sein.

### Option A: Durch mich (nach Limit-Reset/Upgrade)
Sag mir einfach "Figma ist wieder frei, bitte ausführen" — ich rufe den Plugin API Call auf und erstelle alle 25 Slides in einem einzigen Batch.

### Option B: Manuell via Figma Plugin Console
1. Öffne das Figma-Projekt
2. Plugins → Development → Open Console (oder ähnlich je nach Plugin)
3. Kopiere den Inhalt von `create-slides.js` (ohne das erste `await figma.loadFontAsync` Setup, das passiert automatisch)
4. Pass den Code ggf. an den konkreten Plugin-Context an
5. Ausführen

### Option C: Andere KI-Tools
Der Inhalt von `slides-content.json` ist eigenständig und kann auch von anderen Tools (z.B. anderen Claude-Sessions, Cursor, Figma Copilot) zur Slide-Generation verwendet werden.

---

## Nach der Slide-Erstellung: Screenshots einziehen

Das Skript erstellt dashed-border Platzhalter-Frames mit Labels wie `[SCREENSHOT] old/03-404-error.png`.

**Drag & Drop Workflow in Figma:**
1. Finder öffnen, Ordner `presentation/figma-screenshots/old/` (oder `new/`) navigieren
2. PNG aus Finder auf den passenden Platzhalter-Frame in Figma ziehen
3. Figma füllt das Rechteck automatisch mit dem Bild
4. Wiederholen für die 9 Screenshot-Slides (siehe Liste oben, 📷-Markierung)

---

## Grid-Layout in Figma

Die neuen Slides werden **rechts vom bestehenden "Aktuelle Probleme"-Block** platziert:
- Start X: `88000`
- Start Y: `1400`
- Layout: **6 Spalten × 5 Reihen** (25 Slides)
- Gap: 400px horizontal, 400px vertikal

Der existierende Content wird nicht berührt.

---

## Quellen für alle Inhalte

Alle Texte basieren auf den Audit-MDs:
- `audit/01-bestandsaufnahme.md` (Bugs, 404, DSGVO, Technik)
- `audit/03-ux-conversion-analyse.md` (Conversion-Score, Mobile, Trust)
- `audit/04-wettbewerbsanalyse.md` (FitX/McFit/VIVA-Vergleich)
- `audit/05-anforderungskatalog.md` (Lösungen + erwartete Uplifts)
- `CLAUDE.md` (USPs, Positionierung, Roadmap)
- `src/data/content.ts` (Website-Copy)

**Keine Zahlen erfunden** — jede Metrik hat eine Quelle.
