# Typografie- & Stilvorschläge — Fitness Factory Hattingen

> 3 konkrete Font-Pairing-Vorschläge, inspiriert von FitX, John Reed, Gold's Gym und McFit.
> Alle unter Beibehaltung der Corporate Identity: **Rot (#C71F20) + Schwarz + Weiß**.

---

## Vorschlag A — "Power Athletic" (Empfehlung)

**Inspiration:** FitX + McFit — bold, direkt, energetisch
**Stimmung:** Kraftvoll, sportlich, selbstbewusst — wie ein Studio das Ergebnisse liefert

### Font-Pairing

| Rolle | Font | Gewichte | Warum |
|---|---|---|---|
| **Display** | **Barlow Condensed** | 700, 800, 900 | Kompakt, athletisch, spart Platz. Kondensierte Proportionen = "Power". Liest sich wie Sportbranding. |
| **Body** | **Plus Jakarta Sans** | 400, 500, 600 | Warm, modern, humanistisch. Hohe x-Höhe = gute Lesbarkeit auch für ältere Zielgruppe. |

### Visueller Eindruck

```
┌──────────────────────────────────────────────┐
│                                              │
│  DEIN NEUES                                  │  ← Barlow Condensed 900, ~80px
│  FITNESSSTUDIO.                              │     Uppercase, tight tracking
│                                              │
│  Trainiere in familiärer Atmosphäre —        │  ← Plus Jakarta Sans 400, ~18px
│  alles inklusive, zum fairen Preis.          │     Normal case, relaxed
│                                              │
│  [████ PROBETRAINING ████]                   │  ← Barlow Condensed 700, 16px
│                                              │     Uppercase, 4px radius
└──────────────────────────────────────────────┘
```

### Button-Stil
- Barlow Condensed Bold, uppercase, letter-spacing: 0.05em
- Scharfe Ecken (4px), kein Glow, kein Gradient
- Hover: `bg-brand-primary-hover` (dunkleres Rot)

### Vorteile
- Bereits im Design-System spezifiziert (nur nie implementiert)
- Barlow Condensed ist kostenlos (Google Fonts)
- Perfekt für Sport/Fitness — der Font "schreit" Energie
- Plus Jakarta Sans hat exzellente Lesbarkeit (WCAG-konform)

### Nachteile
- Kondensierte Fonts können auf kleinen Screens eng wirken
- Weniger "elegant" als John-Reed-Stil

---

## Vorschlag B — "Clean Premium"

**Inspiration:** John Reed + Equinox — minimalistisch, hochwertig, self-assured
**Stimmung:** Boutique-Studio-Feeling, reduziert, luxuriös — wie ein Premium-Erlebnis

### Font-Pairing

| Rolle | Font | Gewichte | Warum |
|---|---|---|---|
| **Display** | **Outfit** | 600, 700, 800 | Geometrisch-grotesk, clean. Erinnert an Luxus-Marken. Vielseitig zwischen bold und elegant. |
| **Body** | **DM Sans** | 400, 500, 600 | Low-contrast, warm, modern. Sehr gute Lesbarkeit bei allen Größen. Google-Font-Klassiker. |

### Visueller Eindruck

```
┌──────────────────────────────────────────────┐
│                                              │
│  Dein neues                                  │  ← Outfit 800, ~72px
│  Fitnessstudio.                              │     Mixed case, loose tracking
│                                              │
│  Trainiere in familiärer Atmosphäre —        │  ← DM Sans 400, ~18px
│  alles inklusive, zum fairen Preis.          │     Weicher, runder
│                                              │
│  [ Probetraining buchen ]                    │  ← Outfit 600, 16px
│                                              │     Mixed case, 6px radius
└──────────────────────────────────────────────┘
```

### Button-Stil
- Outfit Semibold, mixed case (kein Uppercase)
- Leicht rundere Ecken (6px), minimaler Shadow
- Hover: Subtile Scale-Animation (1.02)

### Vorteile
- Wirkt hochwertig und differenziert von typischen Fitness-Websites
- Hebt sich stark von FitX/McFit ab (die eher "schreien")
- Passt zur "familiären Premium"-Positionierung
- Sehr gute Lesbarkeit in allen Altersgruppen

### Nachteile
- Könnte für ein Fitnessstudio zu "ruhig" wirken
- Weniger sofortiger "Fitness-Wiedererkennungswert"

---

## Vorschlag C — "Bold Industrial"

**Inspiration:** Gold's Gym + McFit Rebranding — roh, direkt, mutig
**Stimmung:** Hardcore-Gym-Ästhetik, industriell, selbstbewusst — "Hier wird gearbeitet"

### Font-Pairing

| Rolle | Font | Gewichte | Warum |
|---|---|---|---|
| **Display** | **Bebas Neue** (aktuell) | 400 | Keine Gewichtsvariation nötig — Bebas ist IMMER bold. Maximale Impact-Wirkung. Ikonisch im Fitness-Bereich. |
| **Body** | **Inter** (aktuell) | 400, 500, 600 | System-nah, neutral, professionell. Bewährt in tausenden Projekten. |

### Visueller Eindruck

```
┌──────────────────────────────────────────────┐
│                                              │
│  DEIN NEUES                                  │  ← Bebas Neue 400, ~90px
│  FITNESSSTUDIO                               │     Uppercase only (Bebas kann nichts anderes)
│                                              │
│  Trainiere in familiärer Atmosphäre —        │  ← Inter 400, ~17px
│  alles inklusive, zum fairen Preis.          │     Clean, neutral
│                                              │
│  [████ PROBETRAINING BUCHEN ████]            │  ← Bebas Neue 400, 18px
│                                              │     Uppercase, 4px radius
└──────────────────────────────────────────────┘
```

### Button-Stil
- Bebas Neue, uppercase (einzige Option), letter-spacing: 0.1em
- Sehr scharfe Ecken (4px), bold Borders
- Hover: Background-Shift + Border-Color-Change

### Vorteile
- **Bereits implementiert** — kein Font-Wechsel nötig!
- Bebas Neue ist der Fitness-Font schlechthin
- Maximaler visueller Impact
- Inter ist der sicherste Body-Font (beste Lesbarkeit)

### Nachteile
- Bebas Neue hat nur ein Gewicht → weniger typografische Hierarchie
- Kann "generisch" wirken weil viele Fitness-Seiten Bebas nutzen
- Bebas kann kein Lowercase → eingeschränkt für längere Texte

---

## Empfehlung

### Vorschlag A — "Power Athletic" (Barlow Condensed + Plus Jakarta Sans)

**Warum:**
1. **Beste Balance** aus Sportlichkeit und Lesbarkeit
2. **Barlow Condensed** hat multiple Gewichte (700, 800, 900) → bessere typografische Hierarchie als Bebas
3. **Plus Jakarta Sans** ist wärmer als Inter → passt besser zur "familiären" Positionierung
4. **Differenzierung:** Weniger verbreitet als Bebas Neue → eigenständiger Look
5. **Bereits im Design-System dokumentiert** — war von Anfang an so geplant

### Migration von Bebas/Inter zu Barlow/Jakarta

Falls gewünscht, wäre die Umstellung:
1. WOFF2-Dateien für Barlow Condensed + Plus Jakarta Sans herunterladen
2. `@font-face` Deklarationen in `src/index.css` anpassen
3. `fontFamily` in `design/tailwind-tokens.ts` ändern
4. Fertig — alle Components nutzen `font-display` und `font-body` Klassen

**Geschätzter Aufwand:** Minimal — da alle Komponenten bereits die Design-Tokens `font-display` und `font-body` nutzen. Nur die Font-Dateien und 2 Config-Dateien müssen geändert werden.

---

## Nächster Schritt

Wähle einen Vorschlag aus. Bei Vorschlag A oder B implementiere ich den Font-Wechsel. Bei Vorschlag C bleibt alles wie es ist.
