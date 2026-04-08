# Typografie-Dokumentation — Fitness Factory Hattingen
> PROMPT 2.1 Output — Phase 2 Build
> Erstellt: 2026-04-02

---

## Font-Pairing Entscheidung

### Gewählte Kombination: Barlow Condensed + Plus Jakarta Sans

---

## 1. Display-Font: Barlow Condensed

**Familie:** Barlow Condensed
**Gewichte für diese Website:** 700 (Bold), 800 (ExtraBold), 900 (Black)
**Lizenz:** Open Font License (OFL) — kostenlos, lokal hostbar
**Entwickler:** Jeremy Tribby / Google Fonts

### Warum Barlow Condensed?

| Kriterium | Bewertung | Begründung |
|---|---|---|
| Energiegehalt | ★★★★★ | Kondensierte, aufrechte Letterform vermittelt Kraft ohne Aggressivität |
| Mehrere Gewichte | ★★★★★ | 700/800/900 ermöglichen echte Typografie-Hierarchie (Bebas Neue hat nur 400) |
| Lesbarkeit Display | ★★★★☆ | Sehr gut ab 20px — für Headlines ideal |
| Differenzierung | ★★★★★ | Weniger verbreitet als Oswald und Bebas Neue in Fitness-Branding |
| Mobile Performance | ★★★★☆ | Kondensiert spart horizontalen Platz auf schmalen Viewports |
| Zielgruppen-Fit | ★★★★★ | Zugänglich für alle Altersgruppen (18–70+), nicht zu "Hardcore" |

**Warum NICHT Bebas Neue:** Überall in der Fitness-Branche verwendet → kein Differenzierungspotenzial
**Warum NICHT Oswald:** Häufig in deutschen Fitness-Brands → gleiche Problematik
**Warum NICHT Clash Display:** Zu verspielt/editorial für ein Familienstudio

---

## 2. Body-Font: Plus Jakarta Sans

**Familie:** Plus Jakarta Sans
**Gewichte für diese Website:** 400 (Regular), 500 (Medium), 600 (SemiBold)
**Lizenz:** Open Font License (OFL) — kostenlos, lokal hostbar
**Entwickler:** Tokotype / Google Fonts

### Warum Plus Jakarta Sans?

| Kriterium | Bewertung | Begründung |
|---|---|---|
| Lesbarkeit Body | ★★★★★ | Exzellente x-Höhe, optimale Leeräume für lange Lesetexte |
| Wärme | ★★★★★ | Leicht "humanistisch" — wärmer als geometrisches Inter |
| Differenzierung | ★★★★☆ | Weniger ubiquitär als Inter (verboten per taste-skill) |
| Altersgruppen | ★★★★★ | Gut lesbar für alle Altersgruppen, auch Senioren |
| Pairing mit Barlow | ★★★★★ | Perfekte Ergänzung: Barlow Condensed = Kraft/Energie, Jakarta = Wärme/Lesbarkeit |
| DSGVO-Konformität | Lokal gehostet → kein Google Fonts CDN | ✅ |

**Warum NICHT Inter:** Verboten durch taste-skill und soft-skill (generischste KI-Ausgabe)
**Warum NICHT DM Sans:** Etwas zu kalt/neutral für Fitness Factory's familiäre Positionierung
**Warum NICHT Outfit:** Zu trendy/tech, passt nicht zu breiter Zielgruppe

---

## 3. Zusammenspiel des Pairings

```
BARLOW CONDENSED 900 — HERO HEADLINE
+ PLUS JAKARTA SANS 400 — Fließtext unter der Headline

→ Kontrast: Kraftvoll / Zugänglich
→ Energie / Wärme  
→ Performance / Persönlichkeit
```

**Visueller Rhythmus:**
- Barlow Condensed zieht die Aufmerksamkeit → stoppt den Scroll
- Plus Jakarta Sans führt durch den Content → Conversion
- Kombination kommuniziert: "Wir sind stark UND herzlich"

---

## 4. Download-Links für WOFF2-Dateien

### Barlow Condensed

Direkter Download via Google Fonts API (WOFF2-Format):

```
Barlow Condensed 700 (Bold):
https://fonts.gstatic.com/s/barlowcondensed/v12/HTxwL3I-JCGChYJ8VI-L6OO_au7B6xTT3w.woff2

Barlow Condensed 800 (ExtraBold):
https://fonts.gstatic.com/s/barlowcondensed/v12/HTxxL3I-JCGChYJ8VI-L6OO_au7B497y_oQ.woff2

Barlow Condensed 900 (Black):
https://fonts.gstatic.com/s/barlowcondensed/v12/HTxxL3I-JCGChYJ8VI-L6OO_au7B4-by_oQ.woff2
```

### Plus Jakarta Sans

```
Plus Jakarta Sans 400 (Regular):
https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQeaX-WQBnj-j8Cz0OWJlkQ10ZwaFEFuOJQA.woff2

Plus Jakarta Sans 500 (Medium):
https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQeaX-WQBnj-j8Cz0OWJlkQ10ZwaFOFuOJQA.woff2

Plus Jakarta Sans 600 (SemiBold):
https://fonts.gstatic.com/s/plusjakartasans/v8/LDIbaomQeaX-WQBnj-j8Cz0OWJlkQ10ZwaFFluOJQA.woff2
```

**Alternativ: Google Fonts Download-Tool**
- https://google-webfonts-helper.io/fonts/barlow-condensed
- https://google-webfonts-helper.io/fonts/plus-jakarta-sans

Wähle dort: "Modern Browsers" → WOFF2
Dann manuell in `public/fonts/` ablegen.

---

## 5. Lokale Dateistruktur

```
public/
└── fonts/
    ├── barlow-condensed/
    │   ├── barlow-condensed-700.woff2
    │   ├── barlow-condensed-800.woff2
    │   └── barlow-condensed-900.woff2
    └── plus-jakarta-sans/
        ├── plus-jakarta-sans-400.woff2
        ├── plus-jakarta-sans-500.woff2
        └── plus-jakarta-sans-600.woff2
```

---

## 6. @font-face Deklarationen

Datei: `src/styles/fonts.css`

```css
/* ============================================
   Barlow Condensed — Display / Headlines
   ============================================ */

@font-face {
  font-family: 'Barlow Condensed';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/barlow-condensed/barlow-condensed-700.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                 U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
                 U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
                 U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Barlow Condensed';
  font-style: normal;
  font-weight: 800;
  font-display: swap;
  src: url('/fonts/barlow-condensed/barlow-condensed-800.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                 U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
                 U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
                 U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Barlow Condensed';
  font-style: normal;
  font-weight: 900;
  font-display: swap;
  src: url('/fonts/barlow-condensed/barlow-condensed-900.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                 U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
                 U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
                 U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

/* ============================================
   Plus Jakarta Sans — Body / UI
   ============================================ */

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans/plus-jakarta-sans-400.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                 U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
                 U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
                 U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans/plus-jakarta-sans-500.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                 U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
                 U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
                 U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/plus-jakarta-sans/plus-jakarta-sans-600.woff2') format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC,
                 U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329,
                 U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
                 U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
```

---

## 7. Fallback-Stacks

```css
/* Display Font (falls Barlow Condensed nicht geladen) */
font-family: 'Barlow Condensed',
             'Arial Narrow',
             'Impact',
             ui-sans-serif,
             system-ui,
             -apple-system,
             sans-serif;

/* Body Font (falls Plus Jakarta Sans nicht geladen) */
font-family: 'Plus Jakarta Sans',
             'Segoe UI',
             ui-sans-serif,
             system-ui,
             -apple-system,
             BlinkMacSystemFont,
             sans-serif;
```

**Strategie:** `font-display: swap` sorgt dafür, dass die Seite sofort mit Fallback-Fonts gerendert wird, der Wechsel auf die Custom Fonts ist kaum wahrnehmbar (minimales CLS).

---

## 8. Font-Scale Referenz

| Klasse | clamp()-Wert | Mobile 375px | Desktop 1440px | Verwendung |
|---|---|---|---|---|
| `text-display-xl` | `clamp(2.5rem, 5vw + 1rem, 5rem)` | 40px | 80px | Hero-Hauptheadline |
| `text-display` | `clamp(2rem, 4vw + 0.5rem, 4rem)` | 32px | 64px | Hero-Subheadline, Preis-Hero |
| `text-h1` | `clamp(1.875rem, 3.5vw + 0.5rem, 3.5rem)` | 30px | 56px | Seiten-H1 |
| `text-h2` | `clamp(1.5rem, 2.5vw + 0.5rem, 2.5rem)` | 24px | 40px | Section-Titel |
| `text-h3` | `clamp(1.25rem, 2vw + 0.25rem, 1.875rem)` | 20px | 30px | Card-Titel |
| `text-h4` | `clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)` | 18px | 24px | Preise, Labels |
| `text-body-lg` | `clamp(1.0625rem, 1vw + 0.5rem, 1.125rem)` | 17px | 18px | Intro-Text, wichtige Beschreibungen |
| `text-body` | `clamp(1rem, 0.5vw + 0.75rem, 1.0625rem)` | 16px | 17px | Standard Fließtext |
| `text-body-sm` | `clamp(0.875rem, 0.5vw + 0.5rem, 0.9375rem)` | 14px | 15px | Metadaten, Hinweise |
| `text-caption` | `clamp(0.75rem, 0.5vw + 0.25rem, 0.8125rem)` | 12px | 13px | Bildunterschriften |
| `text-eyebrow` | `0.6875rem` | 11px | 11px | Kategorie-Labels, Eyebrow-Tags |

### clamp()-Formel erklärt

```
clamp(minimum, preferred, maximum)

Beispiel: clamp(1.875rem, 3.5vw + 0.5rem, 3.5rem)

Bei 375px Viewport:
  3.5vw = 3.5 * 375/100 = 13.125px
  13.125px + 8px = 21.125px ≈ 1.32rem
  → Minimum 1.875rem (30px) greift ✅

Bei 1440px Viewport:
  3.5vw = 3.5 * 1440/100 = 50.4px
  50.4px + 8px = 58.4px ≈ 3.65rem
  → Maximum 3.5rem (56px) greift ✅

Bei 768px Viewport (Tablet):
  3.5vw = 3.5 * 768/100 = 26.88px
  26.88px + 8px = 34.88px ≈ 2.18rem ✅
```

---

## 9. Typografie-Regeln in Komponenten

### Headlines (Barlow Condensed)

```tsx
// H1 — Section-Titel
<h1 className="font-display font-black text-h1 text-brand-light leading-tight tracking-tight">
  Dein Fitnessstudio in Hattingen
</h1>

// H2 — Section-Subtitel
<h2 className="font-display font-bold text-h2 text-brand-light leading-tight tracking-tight">
  Alles Inklusive — kein Kleingedrucktes
</h2>

// H3 — Card-Titel
<h3 className="font-display font-bold text-h3 text-brand-light leading-snug">
  Sauna inklusive
</h3>
```

### Body Text (Plus Jakarta Sans)

```tsx
// Beschreibung
<p className="font-body text-body text-brand-muted leading-relaxed max-w-[65ch]">
  Beschreibungstext max 65 Zeichen Breite für optimale Lesbarkeit
</p>

// Wichtiger Body-Text
<p className="font-body font-medium text-body-lg text-brand-light leading-relaxed">
  Wichtige Information oder Einleitung
</p>

// Label / Meta
<span className="font-body font-medium text-body-sm text-brand-muted">
  Mo–Fr 08–23 Uhr
</span>
```

### Eyebrow Tags

```tsx
// Vor Section-Titeln
<span className="font-body font-semibold text-eyebrow text-brand-primary uppercase tracking-[0.15em]
                 bg-brand-primary/10 border border-brand-primary/20 py-1 px-3 rounded-full">
  Mitgliedschaft
</span>
```

### Preise (Tabular Lining)

```tsx
// Preis-Anzeige mit Tabular Figures
<span className="font-display font-black text-display text-brand-light"
      style={{ fontFeatureSettings: '"tnum"' }}>
  35€
</span>
<span className="font-body text-body-sm text-brand-muted">/Monat</span>
```

---

## 10. Preload-Strategie (Performance)

In `index.html` — Critical Fonts preloaden:

```html
<!-- Barlow Condensed 900 — kritisch für Hero-Headline -->
<link rel="preload"
      href="/fonts/barlow-condensed/barlow-condensed-900.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous">

<!-- Plus Jakarta Sans 400 — kritisch für Body-Text -->
<link rel="preload"
      href="/fonts/plus-jakarta-sans/plus-jakarta-sans-400.woff2"
      as="font"
      type="font/woff2"
      crossorigin="anonymous">
```

**Strategie:** Nur die 2 kritischen Font-Dateien (Hero-Display + Standard-Body) werden preloaded. Alle anderen Gewichte werden über `@font-face` + `font-display: swap` on-demand geladen.

**Warum nicht alle Gewichte preloaden?** Zu viele Preloads blockieren andere kritische Ressourcen und erhöhen TTI. Selektiv preloaden hält LCP unter 2.5s.

---

## 11. Accessibility-Hinweise

- **Mindestgröße:** Kein Text unter 12px (`text-caption`) für nicht-dekorative Inhalte
- **Kontrast:** Alle Font-Farben auf ihren Hintergründen WCAG AA geprüft (siehe design-system.md)
- **Dynamic Type:** `font-size: clamp()` skaliert responsiv — kein Fixed-px für Body-Text
- **line-height:** Body ≥ 1.5 (`leading-relaxed: 1.625`) für gute Lesbarkeit aller Altersgruppen
- **max-width Text:** `max-w-[65ch]` für Fließtext — 65 Zeichen pro Zeile für optimale Lesbarkeit
- **Uppercase:** Nur für Eyebrow-Labels (11px mit letter-spacing 0.15em) — niemals für Body-Text
