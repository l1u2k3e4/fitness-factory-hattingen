# PROMPT 2.1 — Design-System (Farben, Fonts, Spacing, Komponenten)

> **Phase:** 2 (Build)
> **Sub-Agent:** `.claude/agents/design-system-creator.md`
> **Input:** `audit/05-anforderungskatalog.md` (Abschnitt 5: Design-Anforderungen), `audit/04-wettbewerbsanalyse.md`, Logo in `public/images/logo-fitness-factory.png`
> **Output:** `design/design-system.md` + `design/tailwind-tokens.ts` + `design/typography.md`
> **Geschätzte Dauer:** 20–30 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** im Projektstamm — vollständiger Projektkontext, Tech-Stack, Konventionen
2. **Lies den Sub-Agent** `.claude/agents/design-system-creator.md` — enthält Pflicht-Skills und Anti-Slop-Regeln
3. **Schau dir das Logo an** `public/images/logo-fitness-factory.png` — die Corporate Identity leitet sich vom Logo ab: **Rot + Schwarz + Weiß**
4. **Lies die Audit-Ergebnisse:**
   - `audit/05-anforderungskatalog.md` → Abschnitt 5 (Design-Anforderungen) + Abschnitt 4 (Technische Anforderungen)
   - `audit/04-wettbewerbsanalyse.md` → Design-Analyse der Wettbewerber
   - `audit/03-ux-conversion-analyse.md` → Aktuelle Design-Schwächen
5. **Lies diese Pflicht-Skills (VERBINDLICH — vor jeder Zeile Code):**
   - `taste-skill` → GPU-Animationen, metrische Architektur, Anti-Generic-Patterns
   - `soft-skill` → Premium-Agentur-Standards für Fonts, Shadows, Animationen
   - `ui-ux-pro-max` → 161 Paletten, 57 Font-Pairings, 99 UX-Guidelines
   - `redesign-skill` → Erkennung generischer AI-Design-Patterns
   - `frontend-design` → Production-Grade-Ästhetik
   - `web-design-guidelines` → Accessibility, Interface-Quality
   - `website-ux-ui-design` → Farbpaletten, Typografie, Spacing-Systeme
6. **Erstelle Ordner** `design/` falls noch nicht vorhanden

---

## Auftrag

Du bist ein Senior Design System Architect. Du erstellst ein vollständiges, production-ready Design-System für Fitness Factory Hattingen — **clean, professionell, wie von einem erfahrenen Webdesigner** — kein generischer KI-Output.

### DESIGN-RICHTUNG: Clean White + Rot/Schwarz CI

> **KRITISCH:** Das Design basiert auf der Corporate Identity des Logos (Fitness Factory = Rot + Schwarz + Weiß). Die Website bekommt einen **weißen, cleanen Hintergrund** — KEIN dunkles/graues Theme. Rote Buttons, schwarze Akzente, professionell und schlicht. Weniger Rundungen, mehr Kanten. Weniger Glow-Effekte, mehr Klarheit.

### Strategische Positionierung

- **CI-Basis:** Logo-Farben = Rot (kräftig, energetisch) + Schwarz (Stärke, Professionalität) + Weiß (Klarheit, Sauberkeit)
- **Stil:** Clean, professionell, wie von einem echten Webdesigner — NICHT wie KI-generiert
- **Differenzierung:** Kein generischer Fitness-Dark-Mode, kein überladener Glow — stattdessen klare Hierarchien, scharfe Kanten, viel Weißraum
- **Referenzen:** Apple-artige Klarheit + Fitness-Energie durch Rot + professionelle Webagenturen (KEINE Bootstrap-Templates)

---

### Task 1: Farbsystem

Erstelle ein vollständiges Farbsystem das die Logo-CI verkörpert:

| Token | Rolle | Wert |
|---|---|---|
| `brand-white` | Haupt-Hintergrund | #FFFFFF |
| `brand-bg` | Leicht getönter Hintergrund (Sections abwechselnd) | #F7F7F8 oder #F9FAFB — fast weiß, minimal warm/kühl |
| `brand-primary` | Primärfarbe = Logo-Rot | Exaktes Rot aus dem Logo extrahieren (ca. #C8102E oder #D91E2A) — NICHT zu orange, NICHT zu pink |
| `brand-primary-hover` | Hover-State | 8–10% dunkler als brand-primary |
| `brand-primary-light` | Heller Rot-Ton für Badges, Hintergründe | brand-primary bei 8% Opacity auf Weiß |
| `brand-dark` | Schwarze Akzente, Headlines, Navigation | #1A1A1A — NICHT reines #000000 |
| `brand-dark-soft` | Fließtext, Beschreibungen | #374151 oder #4B5563 (Grau mit Wärme) |
| `brand-muted` | Gedämpfter Text, Platzhalter, Linien | #9CA3AF |
| `brand-border` | Trennlinien, Card-Borders | #E5E7EB — subtle, nicht zu dunkel |
| `brand-success` | Bestätigungen, Häkchen | #16A34A |
| `brand-whatsapp` | WhatsApp-Button | #25D366 |

**Qualitäts-Check:**
- [ ] brand-primary (Rot) besteht WCAG AA (4.5:1) auf Weiß → wenn nicht, als Button-Farbe mit weißem Text nutzen (Rot auf Weiß = gut für große Texte/Buttons)
- [ ] brand-dark besteht WCAG AAA auf brand-white (Headlines)
- [ ] brand-dark-soft besteht WCAG AA auf brand-white (Body-Text)
- [ ] Farbsystem wirkt professionell und clean — NICHT wie ein Theme-Template
- [ ] Logo-Rot exakt abgeglichen (Farbpipette auf Logo anwenden)

### Task 2: Typografie

Wähle ein Font-Pairing das Stärke und Klarheit verbindet:

| Rolle | Anforderung |
|---|---|
| **Display / Headlines** | Kraftvoller Sans-Serif — nicht condensed, sondern bold/black weight. Optionen: **Inter Black**, **Manrope ExtraBold**, **Outfit Bold**, **DM Sans Bold** — clean und professionell, keine Spielschriften |
| **Body / Fließtext** | Gleiche Font-Familie wie Headlines in Regular/Medium weight — ein einheitliches System. Inter, Manrope oder Outfit als Systemfont |
| **Mono / Preise** | Gleiche Font mit Tabular Lining Figures für Zahlenkolonnen |

**Regeln:**
- LOKAL GEHOSTET — kein Google Fonts CDN (Datenschutz, Audit 01)
- Fluid Typography mit `clamp()`: H1 min 2rem → max 3.5rem, Body min 1rem → max 1.125rem
- Font-Dateien unter `public/fonts/` in WOFF2-Format
- `@font-face` Deklarationen in einer zentralen CSS-Datei
- Fallback-Stack definieren (system fonts)
- **EIN Font-Family reicht** — Professionalität kommt durch Weight-Kontraste (Black vs. Regular), nicht durch Font-Mixing

**Qualitäts-Check:**
- [ ] Font wirkt sauber und professionell — keine Display-Spielerei
- [ ] Lesbarkeit auf Mobile geprüft (min 16px Body)
- [ ] Gewichte: Regular (400), Medium (500), SemiBold (600), Bold (700), Black (900)
- [ ] clamp()-Werte ergeben bei 375px und 1440px sinnvolle Größen

### Task 3: Spacing & Layout

Erstelle ein konsistentes Spacing-System:

```
4px-Raster:
xs: 4px   (0.25rem)
sm: 8px   (0.5rem)
md: 16px  (1rem)
lg: 24px  (1.5rem)
xl: 32px  (2rem)
2xl: 48px (3rem)
3xl: 64px (4rem)
4xl: 96px (6rem)
section: 80px–120px (Section-Abstand, responsive)
```

**Layout-Regeln:**
- Max-Width Container: 1280px (xl Breakpoint)
- Section Padding: Responsive (Mobile: 48px vertical, Desktop: 96px vertical)
- Card Padding: 24px (lg) auf Desktop, 16px (md) auf Mobile
- **Viel Weißraum** — Sections atmen lassen, nicht vollstopfen
- Grid-Gaps: 24px (Cards), 16px (compact)

### Task 4: Schatten & Borders

> **WICHTIG:** Weniger ist mehr. Schatten sind subtil und dienen der Hierarchie, nicht der Dekoration.

```
shadow-sm: 0 1px 2px rgba(0,0,0,0.05)           — Subtle Elevation
shadow-card: 0 1px 3px rgba(0,0,0,0.08),
             0 1px 2px rgba(0,0,0,0.04)           — Standard Card
shadow-card-hover: 0 4px 12px rgba(0,0,0,0.1)    — Hover-State
shadow-lg: 0 10px 25px rgba(0,0,0,0.08)          — Modale, Dropdowns
```

**Border-Strategie (statt Schatten):**
- Cards: `border: 1px solid brand-border` — clean, sichtbare Trennung
- Hover: Border-Farbe zu `brand-primary` wechseln (rot) ODER leichter Schatten hinzu
- **KEINE Glow-Schatten** — kein `box-shadow: 0 0 20px rgba(...)` nirgendwo
- **KEINE farbigen Shadows** — nur neutrale Grau-Schatten

### Task 5: Border-Radius (SCHÄRFER)

> **KRITISCH:** Weniger Rundungen, mehr Kanten. Das unterscheidet professionelles Design von KI-generiertem.

```
radius-none: 0px        — Für Hero-Sections, Full-Width-Elemente
radius-sm: 4px          — Buttons, Badges, kleine Elemente
radius-md: 6px          — Cards, Input-Felder
radius-lg: 8px          — Große Cards, Modale
radius-full: 9999px     — NUR für runde Icons, Avatare, Pill-Badges
```

**Anti-Rundungs-Regeln:**
- [ ] Buttons: `radius-sm` (4px) — NICHT 12px oder 16px
- [ ] Cards: `radius-md` (6px) — NICHT 16px oder 24px
- [ ] Inputs: `radius-sm` (4px) — konsistent mit Buttons
- [ ] Sections: `radius-none` — Sections haben KEINE Rundungen
- [ ] KEIN `rounded-full` auf Buttons (das ist ein KI-Pattern)
- [ ] KEIN `rounded-2xl` oder `rounded-3xl` — das wirkt sofort KI-generiert

### Task 6: Animationen (Framer Motion)

> **Subtiler als vorher.** Professionelle Websites animieren dezent, nicht showmäßig.

```typescript
// Basis-Transitions
const transition = {
  default: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  fast: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  spring: { type: "spring", stiffness: 400, damping: 35 },   // straffer als vorher
  springMenu: { type: "spring", stiffness: 300, damping: 28 },
}

// Scroll-Animations — DEZENT
const fadeInUp = { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }  // nur 20px, nicht 30
const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1 } }  // einfaches Fade ohne Bewegung
const staggerContainer = { animate: { transition: { staggerChildren: 0.06 } } }  // schnelleres Stagger

// Counter-Animation
const counterAnimation = { from: 0, duration: 1.5, ease: "easeOut" }
```

**Anti-Slop-Regeln:**
- [ ] KEIN `transition: all` — immer spezifische Properties
- [ ] Animationen auf `transform` und `opacity` beschränkt (GPU-accelerated)
- [ ] Spring-Physics für Menü und interaktive Elemente — aber STRAFF, nicht bouncy
- [ ] **KEINE Bounce-Effekte** — wirken amateurhaft
- [ ] **KEINE Glow-Animationen** — kein pulsierender Glow auf Buttons
- [ ] **KEIN Scale auf Hover für Cards** — stattdessen: Border-Color-Change oder Shadow-Increase
- [ ] `will-change` nur wo nötig, nicht pauschal
- [ ] `prefers-reduced-motion` respektieren

### Task 7: Komponenten-Tokens

Definiere Design-Tokens für die Kern-Komponenten (noch KEINE Implementierung — nur Token):

| Komponente | Token |
|---|---|
| **Button (Primary)** | bg: brand-primary (Rot), text: white, hover: brand-primary-hover, border-radius: 4px, padding: 12px 28px, font-weight: 600, **KEIN Glow/Shadow** |
| **Button (Secondary)** | bg: transparent, border: 1.5px solid brand-dark, text: brand-dark, hover: bg brand-dark + text white, radius: 4px |
| **Button (Ghost)** | bg: transparent, text: brand-dark, hover: bg brand-bg, radius: 4px |
| **Card** | bg: brand-white, border: 1px solid brand-border, radius: 6px, padding: lg, hover: shadow-card-hover ODER border-brand-primary |
| **Nav** | bg: white/95 + backdrop-blur-md, border-bottom: 1px solid brand-border, height: 72px desktop / 64px mobile |
| **Section** | padding-y: section, max-width: 1280px, mx: auto, bg: abwechselnd brand-white / brand-bg |
| **Input** | bg: brand-white, border: 1px solid brand-border, focus: border-brand-primary + ring-1 ring-brand-primary/20, radius: 4px |
| **Badge** | bg: brand-primary-light, text: brand-primary, padding: xs sm, radius: 4px, font-weight: 500 |
| **Sticky CTA Bar** | bg: white/95 + backdrop-blur-md, border-top: 1px solid brand-border, height: 64px, z-50 |
| **Hero** | bg: brand-dark (Schwarz/Dunkel für Kontrast mit weißem Text) ODER Bild mit dunklem Overlay |

---

## Output-Dateien

### 1. `design/design-system.md`
Vollständige Design-System-Dokumentation mit:
- Farbpalette (alle Token + Hex-Werte + Kontrast-Ratios)
- CI-Bezug zum Logo dokumentiert
- Typografie (Font + Weights + Scale + clamp()-Werte)
- Spacing-System
- Schatten & Borders (KEINE Glows)
- Border-Radius System (scharf, 4–8px)
- Animation-Presets (dezent)
- Komponenten-Token-Übersicht

### 2. `design/tailwind-tokens.ts`
Exportierbares Objekt für `tailwind.config.ts`:
```typescript
export const designTokens = {
  colors: {
    brand: {
      white: '#FFFFFF',
      bg: '#F7F7F8',
      primary: '#C8102E',     // Logo-Rot (exakt abgleichen!)
      'primary-hover': '#A80D24',
      'primary-light': '#FEF2F2',
      dark: '#1A1A1A',
      'dark-soft': '#374151',
      muted: '#9CA3AF',
      border: '#E5E7EB',
      success: '#16A34A',
      whatsapp: '#25D366',
    }
  },
  fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },  // EIN Font-System
  fontSize: { /* clamp()-Werte */ },
  spacing: { /* 4px-Raster */ },
  boxShadow: { /* Subtle Shadows, KEIN Glow */ },
  borderRadius: {
    none: '0px',
    sm: '4px',    // Buttons, Badges, Inputs
    md: '6px',    // Cards
    lg: '8px',    // Große Cards, Modale
    full: '9999px', // NUR runde Icons
  },
}
```

### 3. `design/typography.md`
Font-Dokumentation mit:
- Gewählter Font + Begründung
- Download-Links für WOFF2-Dateien
- @font-face Deklarationen (alle benötigten Weights)
- Font-Scale (alle clamp()-Werte)
- Fallback-Stack

---

## Verifikation (vor Abschluss)

- [ ] Farbsystem basiert auf Logo-CI: Rot + Schwarz + Weiß
- [ ] Hintergrund ist WEISS (#FFFFFF) — KEIN Dunkelgrau, KEIN Schwarz
- [ ] Buttons sind ROT (brand-primary) mit weißem Text
- [ ] Headlines und Akzente sind SCHWARZ (brand-dark)
- [ ] Alle Farb-Kombinationen bestehen WCAG AA
- [ ] Border-Radius: Buttons 4px, Cards 6px — KEINE 12px+ Rundungen
- [ ] KEIN Glow-Effekt nirgendwo — keine farbigen Shadows
- [ ] Schatten sind subtil und neutral (Grau-basiert)
- [ ] Animationen dezent: kurze Dauer, kleiner y-Offset, kein Bounce
- [ ] Font: Professioneller Sans-Serif, EIN Family — nicht 3 verschiedene Fonts
- [ ] "Sieht das aus wie von einem Webdesigner oder wie von ChatGPT?" → Webdesigner
- [ ] "Would a human designer proudly present this?" → JA
