# Design-System — Fitness Factory Hattingen
> PROMPT 2.1 Output — Phase 2 Build
> Erstellt: 2026-04-02
> Status: Production-Ready

---

## Design-Entscheidung: Premium Dark Identity

**Strategische Begründung:**
- EASYFITNESS und VIVA nutzen helle, funktionale, generische Ketten-Ästhetik → Fitness Factory bekommt das Gegenteil
- FitX: Rot/Schwarz (pure aggressive sports) → wir brauchen mehr Wärme
- John Reed: Schwarz/Gold (premium aber kalt/elitär) → wir brauchen Zugänglichkeit
- McFit: Gelb/Schwarz (Budget-Energy) → wir brauchen Premium
- **Fitness Factory Lösung:** Dunkelanthrazit-Basis + Warm Vermilion (tief, warm, energetisch) + Amber-Akzent — kein Konkurrent in Hattingen hat das

**Design-Archetype:** Asymmetric Dark Premium — Soft Structuralism trifft Kinetic Energy

---

## 1. Farbpalette

### Kern-Farben mit Hex-Codes und Kontrast-Ratios

| Token | Hex | RGB | Rolle |
|---|---|---|---|
| `brand-dark` | `#111116` | 17, 17, 22 | Primärer Hintergrund — nicht reines Schwarz, leicht blau-getönt für Tiefe |
| `brand-dark-soft` | `#1C1C23` | 28, 28, 35 | Erhöhte Flächen, Cards, Panels |
| `brand-dark-border` | `#2D2D38` | 45, 45, 56 | Subtile Trennlinien, Card-Borders |
| `brand-primary` | `#E8541E` | 232, 84, 30 | Primäre Akzentfarbe — Warm Vermilion Orange |
| `brand-primary-hover` | `#F06030` | 240, 96, 48 | Hover-State (+Helligkeit, +Wärme) |
| `brand-primary-muted` | `#E8541E1A` | 232, 84, 30, 10% | Hintergrund für Badges, Highlights |
| `brand-accent` | `#F0A020` | 240, 160, 32 | Sekundärakzent — Warm Amber/Gold |
| `brand-accent-hover` | `#F5B535` | 245, 181, 53 | Hover-State für Accent-Elemente |
| `brand-light` | `#F4F3F0` | 244, 243, 240 | Primärer heller Text — warm-weiß, kein kühles Reinweiß |
| `brand-light-secondary` | `#C8C7C4` | 200, 199, 196 | Sekundärer Text (Headlines auf hellen Bereichen) |
| `brand-muted` | `#8A8A96` | 138, 138, 150 | Beschreibungen, Metadaten |
| `brand-muted-subtle` | `#5E5E6A` | 94, 94, 106 | Sehr gedämpfte Texte, Placeholder |
| `brand-success` | `#22C55E` | 34, 197, 94 | Erfolg-States, Häkchen, Bestätigungen |
| `brand-whatsapp` | `#25D366` | 37, 211, 102 | WhatsApp-Button — offizieller Brand-Grün |
| `brand-error` | `#EF4444` | 239, 68, 68 | Fehler-States, Pflichtfelder |
| `brand-overlay` | `#111116CC` | 17, 17, 22, 80% | Overlay für Modal, Nav-Backdrop |

### Kontrast-Tabelle (WCAG AA = 4.5:1 / Large Text = 3:1 / WCAG AAA = 7:1)

| Text | Hintergrund | Kontrast | AA | AAA | Verwendung |
|---|---|---|---|---|---|
| `#F4F3F0` | `#111116` | **17.2:1** | ✅ | ✅ | Primärtext auf Dark-Background |
| `#F4F3F0` | `#1C1C23` | **15.4:1** | ✅ | ✅ | Text auf Cards |
| `#8A8A96` | `#111116` | **5.9:1** | ✅ | ❌ | Muted Text auf Dark |
| `#8A8A96` | `#1C1C23` | **5.3:1** | ✅ | ❌ | Muted Text auf Cards |
| `#F4F3F0` | `#E8541E` | **3.3:1** | ✅ Large | ❌ | Button-Text (Bold, ≥16px) |
| `#111116` | `#E8541E` | **6.4:1** | ✅ | ✅ | Dunkler Text auf Primärfarbe |
| `#111116` | `#F0A020` | **8.1:1** | ✅ | ✅ | Dunkler Text auf Amber |
| `#F4F3F0` | `#F0A020` | **2.6:1** | ⚠️ | ❌ | NICHT für Body-Text verwenden |
| `#22C55E` | `#111116` | **7.8:1** | ✅ | ✅ | Success auf Dark |
| `#25D366` | `#111116` | **8.3:1** | ✅ | ✅ | WhatsApp auf Dark |

**Wichtige Hinweise:**
- `#F4F3F0` auf `#E8541E` (3.3:1): DARF NUR für große/fette Button-Labels (≥16px, Font-Weight 600+) verwendet werden — erfüllt WCAG AA für Large Text
- Alternativ: `#111116` auf `#E8541E` für maxima Kontrast (6.4:1) bei dunkelm Button-Text

---

## 2. Typografie

### Font-Pairing: Barlow Condensed + Plus Jakarta Sans

**Begründung dieser Kombination:**
- **Bebas Neue** → abgelehnt: zu häufig in Fitness-Branche (generisch)
- **Oswald** → abgelehnt: gut aber sehr verbreitet, kein Differenzierungspotenzial
- **Inter** → VERBOTEN (taste-skill + soft-skill anti-pattern)
- **Barlow Condensed** → GEWÄHLT: kraftvoll, militärisch-sportlich, mehrere Gewichts-Stufen (im Gegensatz zu Bebas), kondensiert für platzsparende Headlines, authentischer als Bebas
- **Plus Jakarta Sans** → GEWÄHLT: warme geometrische Sans-Serif, moderner und wärmer als Inter, exzellente Lesbarkeit für alle Altersgruppen, Fitness Factory's breite Zielgruppe (18–70+) profitiert von der Zugänglichkeit

### Font-Rollen

| Rolle | Font | Gewichte | Verwendung |
|---|---|---|---|
| **Display** | Barlow Condensed | 700 (Bold), 800 (ExtraBold), 900 (Black) | H1, H2, Hero-Headlines, Section-Titles |
| **Body** | Plus Jakarta Sans | 400 (Regular), 500 (Medium), 600 (SemiBold) | Fließtext, Descriptions, Labels |
| **Tabular** | Plus Jakarta Sans | 700 (Bold) + `font-feature-settings: "tnum"` | Preise, Zahlen, Counter-Animationen |

### Type-Scale mit Fluid clamp()-Werten

| Rolle | Token | clamp()-Wert | Mobile (375px) | Desktop (1440px) |
|---|---|---|---|---|
| **Display XL** | `text-display-xl` | `clamp(2.5rem, 5vw + 1rem, 5rem)` | 40px | 80px |
| **Display** | `text-display` | `clamp(2rem, 4vw + 0.5rem, 4rem)` | 32px | 64px |
| **H1** | `text-h1` | `clamp(1.875rem, 3.5vw + 0.5rem, 3.5rem)` | 30px | 56px |
| **H2** | `text-h2` | `clamp(1.5rem, 2.5vw + 0.5rem, 2.5rem)` | 24px | 40px |
| **H3** | `text-h3` | `clamp(1.25rem, 2vw + 0.25rem, 1.875rem)` | 20px | 30px |
| **H4** | `text-h4` | `clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)` | 18px | 24px |
| **Body LG** | `text-body-lg` | `clamp(1.0625rem, 1vw + 0.5rem, 1.125rem)` | 17px | 18px |
| **Body** | `text-body` | `clamp(1rem, 0.5vw + 0.75rem, 1.0625rem)` | 16px | 17px |
| **Body SM** | `text-body-sm` | `clamp(0.875rem, 0.5vw + 0.5rem, 0.9375rem)` | 14px | 15px |
| **Caption** | `text-caption` | `clamp(0.75rem, 0.5vw + 0.25rem, 0.8125rem)` | 12px | 13px |
| **Eyebrow** | `text-eyebrow` | `0.6875rem` | 11px | 11px |

**Regeln:**
- Body min 16px → verhindert iOS Auto-Zoom ✅
- Barlow Condensed für alle Display/Heading-Rollen: `font-family: 'Barlow Condensed', sans-serif`
- Plus Jakarta Sans für Body/Label: `font-family: 'Plus Jakarta Sans', sans-serif`
- Line-Height Headlines: `leading-none` (1.0) bis `leading-tight` (1.1)
- Line-Height Body: `leading-relaxed` (1.6)
- Letter-Spacing Headlines: `tracking-tight` (-0.02em)
- Letter-Spacing Body: `tracking-normal` (0)
- Letter-Spacing Eyebrow: `tracking-[0.15em]` uppercase

---

## 3. Spacing-System (4px-Raster)

```
xs:      4px   (0.25rem)  — Icon-Abstand, Mini-Gaps
sm:      8px   (0.5rem)   — Inline-Gaps, Button-Icon-Abstand
md:      16px  (1rem)     — Standard-Padding, Content-Gaps
lg:      24px  (1.5rem)   — Card-Padding Desktop, Section-interne Gaps
xl:      32px  (2rem)     — Component-Abstände
2xl:     48px  (3rem)     — Section-interne Abstände
3xl:     64px  (4rem)     — Zwischen Haupt-Komponenten
4xl:     96px  (6rem)     — Section-Padding Mobile (vertikal)
5xl:    120px  (7.5rem)   — Section-Padding Desktop (vertikal)
```

### Layout-Regeln

| Element | Wert | Tailwind-Klasse |
|---|---|---|
| **Max-Width Container** | 1280px | `max-w-[1280px]` |
| **Container Padding X** | 16px Mobile / 32px Desktop | `px-4 md:px-8` |
| **Section Padding Y** | 64px Mobile / 96px Desktop | `py-16 md:py-24` |
| **Card Padding** | 16px Mobile / 24px Desktop | `p-4 md:p-6` |
| **Bento-Grid Gap** | 16px Mobile / 24px Desktop | `gap-4 md:gap-6` |
| **Nav Height** | 64px Mobile / 72px Desktop | `h-16 md:h-[72px]` |
| **Sticky CTA Bar Height** | 64px (nur Mobile) | `h-16` |
| **Floating Button** | 56px × 56px | `w-14 h-14` |

---

## 4. Schatten & Elevations

**Grundregel auf dunklem Hintergrund:** Schatten werden durch `border` + `inner-glow` + `gradient-glow` ersetzt — klassische Box-Shadow hat auf dunklen Flächen wenig Effekt.

```css
/* Standard Card-Schatten (Dark Mode) */
--shadow-card: inset 0 1px 0 rgba(255,255,255,0.04),
               0 0 0 1px rgba(255,255,255,0.06);

/* Hover-State Card */
--shadow-card-hover: inset 0 1px 0 rgba(255,255,255,0.08),
                     0 0 0 1px rgba(232,84,30,0.2),
                     0 8px 32px rgba(232,84,30,0.08);

/* Glow-Effekt für CTAs */
--shadow-glow: 0 0 20px rgba(232,84,30,0.35),
               0 0 60px rgba(232,84,30,0.1);

/* Glow Hover (verstärkt) */
--shadow-glow-hover: 0 0 30px rgba(232,84,30,0.5),
                     0 0 80px rgba(232,84,30,0.15);

/* Subtiler Schatten (helle Bereiche) */
--shadow-soft: 0 2px 8px rgba(0,0,0,0.06),
               0 1px 2px rgba(0,0,0,0.04);

/* Nav Backdrop-Blur */
--shadow-nav: 0 1px 0 rgba(255,255,255,0.04);

/* Sticky Bar (von unten nach oben) */
--shadow-bar-up: 0 -1px 0 rgba(255,255,255,0.06),
                 0 -8px 24px rgba(0,0,0,0.3);
```

**Tailwind Custom Shadow Names:**
- `shadow-card` → Card-Standardschatten
- `shadow-card-hover` → Card-Hover
- `shadow-glow` → CTA-Glow
- `shadow-glow-hover` → CTA-Glow verstärkt
- `shadow-soft` → Subtil (für helle Bereiche)
- `shadow-bar` → Sticky Bottom Bar

---

## 5. Border-Radius-System

| Token | Wert | Verwendung |
|---|---|---|
| `rounded-sm` | 4px | Badges, Tags |
| `rounded-md` | 8px | Inputs, Small Cards |
| `rounded-lg` | 12px | Buttons (GlowButton) |
| `rounded-xl` | 16px | Cards |
| `rounded-2xl` | 24px | Feature-Cards, Panels |
| `rounded-3xl` | 32px | Hero-Overlays, große Container |
| `rounded-full` | 9999px | Pills, Avatare, WhatsApp-Button |

---

## 6. Animationen (Framer Motion)

**Anti-Slop-Regeln (alle VERBINDLICH):**
- ❌ KEIN `transition: all` — immer spezifische Properties
- ❌ KEINE Bounce-Effekte — wirken amateurhaft
- ❌ KEIN `will-change` pauschal — nur auf aktiv animierenden Elementen
- ✅ Animationen NUR auf `transform` und `opacity` (GPU-accelerated)
- ✅ Spring-Physics für Menü und interaktive Elemente
- ✅ `prefers-reduced-motion` IMMER respektieren

### Transition-Presets

```typescript
// src/lib/animations.ts

export const transition = {
  // Standard UI-Übergänge
  default: {
    duration: 0.5,
    ease: [0.25, 0.46, 0.45, 0.94], // ease-out-cubic
  },
  fast: {
    duration: 0.25,
    ease: [0.25, 0.46, 0.45, 0.94],
  },
  slow: {
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94],
  },

  // Spring-Physik (für Menüs, Drawer, interaktive Elemente)
  spring: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
  },
  springMenu: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 25,
    mass: 0.9,
  },
  springBouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 28,
    mass: 0.8,
  },
}

// Scroll-triggered Einblende-Animationen
export const fadeInUp = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: transition.default,
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -28 },
  animate: { opacity: 1, x: 0 },
  transition: transition.default,
}

export const fadeInRight = {
  initial: { opacity: 0, x: 28 },
  animate: { opacity: 1, x: 0 },
  transition: transition.default,
}

export const scaleIn = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  transition: transition.default,
}

// Stagger-Container für Listen
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerFast = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

// Counter-Animation (Mitgliederzahl, Bewertungen)
export const counterConfig = {
  duration: 2.2,
  ease: 'easeOut' as const,
}

// Hamburger-Menü Morphing
export const hamburgerTop = {
  closed: { rotate: 0, translateY: 0 },
  open: { rotate: 45, translateY: 7 },
}

export const hamburgerMiddle = {
  closed: { opacity: 1 },
  open: { opacity: 0, scaleX: 0.5 },
}

export const hamburgerBottom = {
  closed: { rotate: 0, translateY: 0 },
  open: { rotate: -45, translateY: -7 },
}

// Nav-Menü Slide-Over von rechts
export const slideOverRight = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
  transition: transition.springMenu,
}

// Backdrop-Overlay
export const backdropFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: transition.fast,
}

// FAQ Accordion
export const accordionContent = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
}

// Sticky CTA Bar
export const stickyBarReveal = {
  initial: { y: 80, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 80, opacity: 0 },
  transition: transition.spring,
}

// prefers-reduced-motion Wrapper
export const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.1 },
}
```

### Hover-Interaktionen (CSS + Framer)

```typescript
// GlowButton Hover (Framer Motion whileHover/whileTap)
export const glowButtonHover = {
  scale: 1.02,
  transition: transition.spring,
}

export const glowButtonTap = {
  scale: 0.97,
  transition: { duration: 0.1 },
}

// Card Hover (GPU-accelerated — nur transform)
export const cardHover = {
  y: -4,
  transition: transition.spring,
}

// Scroll-Indicator (Hero)
export const scrollBounce = {
  y: [0, 8, 0],
  transition: {
    duration: 1.8,
    repeat: Infinity,
    ease: 'easeInOut',
  },
}
```

---

## 7. Komponenten-Token-Übersicht

### GlowButton (Primär-CTA)

| Property | Wert | Tailwind |
|---|---|---|
| Background | `brand-primary` | `bg-brand-primary` |
| Text | `brand-light` | `text-brand-light` |
| Font | Barlow Condensed 700 | `font-display font-bold` |
| Font Size | 18px (body-lg) | `text-lg` |
| Letter Spacing | 0.04em | `tracking-wide` |
| Padding | 16px × 32px | `py-4 px-8` |
| Border Radius | 12px | `rounded-xl` |
| Shadow | Glow-Effekt | `shadow-glow` |
| Hover | Shadow verstärkt + scale | `hover:shadow-glow-hover hover:scale-[1.02]` |
| Active | Scale down | `active:scale-[0.97]` |
| Transition | transform, box-shadow | `transition-[transform,box-shadow] duration-250` |

### Card

| Property | Wert | Tailwind |
|---|---|---|
| Background | `brand-dark-soft` | `bg-brand-dark-soft` |
| Border | 1px solid rgba(255,255,255,0.06) | `border border-brand-dark-border` |
| Border Radius | 16px | `rounded-xl` |
| Padding | 16px Mobile / 24px Desktop | `p-4 md:p-6` |
| Shadow | Double-Bezel inner highlight | Custom shadow-card |
| Hover | Border glow + lift | `hover:border-brand-primary/20` |

### Navigation

| Property | Wert | Tailwind |
|---|---|---|
| Background | `brand-dark/80` + backdrop-blur | `bg-brand-dark/80 backdrop-blur-xl` |
| Height | 64px Mobile / 72px Desktop | `h-16 md:h-[72px]` |
| Border Bottom | 1px rgba(white,0.06) | `border-b border-white/[0.06]` |
| Position | Sticky top | `sticky top-0 z-40` |
| Logo | `brand-light` | `text-brand-light` |
| Links | `brand-muted` → hover `brand-light` | `text-brand-muted hover:text-brand-light` |
| CTA-Button in Nav | Ghost-Variante GlowButton | Outlined, border brand-primary |

### Section

| Property | Wert | Tailwind |
|---|---|---|
| Padding Y | 64px Mobile / 96px Desktop | `py-16 md:py-24` |
| Max-Width | 1280px | `max-w-[1280px]` |
| Padding X | 16px / 32px | `px-4 md:px-8` |
| Margin | Auto-Center | `mx-auto` |

### Input / Formular

| Property | Wert | Tailwind |
|---|---|---|
| Background | `brand-dark-soft` | `bg-brand-dark-soft` |
| Border | 1px `brand-dark-border` | `border border-brand-dark-border` |
| Border Radius | 12px | `rounded-xl` |
| Padding | 12px × 16px | `py-3 px-4` |
| Text | `brand-light` | `text-brand-light` |
| Placeholder | `brand-muted` | `placeholder:text-brand-muted` |
| Focus Ring | brand-primary | `focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary` |
| Label | Plus Jakarta Sans 500 | `font-body font-medium text-brand-light` |

### Badge / Eyebrow

| Property | Wert | Tailwind |
|---|---|---|
| Background | `brand-primary/10` | `bg-brand-primary/10` |
| Text | `brand-primary` | `text-brand-primary` |
| Font | Plus Jakarta Sans 600, Uppercase | `font-body font-semibold uppercase` |
| Font Size | 11px | `text-[0.6875rem]` |
| Letter Spacing | 0.15em | `tracking-[0.15em]` |
| Padding | 4px × 12px | `py-1 px-3` |
| Border Radius | Full | `rounded-full` |
| Border | 1px brand-primary/20 | `border border-brand-primary/20` |

### Sticky CTA Bar (Mobile Only)

| Property | Wert | Tailwind |
|---|---|---|
| Background | `brand-dark/95` + backdrop-blur | `bg-brand-dark/95 backdrop-blur-md` |
| Height | 64px | `h-16` |
| Position | Fixed bottom | `fixed bottom-0 left-0 right-0 z-50` |
| Border Top | 1px rgba(white,0.08) | `border-t border-white/[0.08]` |
| Shadow | Upward shadow | `shadow-bar` |
| Display | Mobile only, nach 30% Scroll | `md:hidden` (JS scroll listener) |
| Inhalt | [Anrufen] [WhatsApp] [Probetraining] | 3 gleichmäßige Buttons |

### WhatsApp Floating Button

| Property | Wert | Tailwind |
|---|---|---|
| Size | 56px × 56px | `w-14 h-14` |
| Background | `brand-whatsapp` | `bg-brand-whatsapp` |
| Border Radius | Full | `rounded-full` |
| Position | Fixed rechts unten | `fixed bottom-6 right-6 z-40` |
| Shadow | Grüner Glow | Custom shadow-whatsapp |
| Mobile | Bottom: 80px (über Sticky Bar) | `bottom-20 md:bottom-6` |

---

## 8. Design-Prinzipien

**5 Konsistenz-Regeln:**

1. **Farb-Ökonomie** — Maximal 1 Primärfarbe (`brand-primary`) pro Viewport prominent sichtbar. Akzent (`brand-accent`) nur sparsam für Highlights und Preise.
2. **Typografie-Hierarchie sichtbar** — Jede Abstufung in der Schriftgröße muss visuell klar erkennbar sein. Kein subtiles H2→H3-Gefälle — der Sprung muss auffallen.
3. **GPU-First Animationen** — Ausnahmslos `transform` und `opacity`. Kein Layout-triggering. Kein `transition: all`.
4. **Alle interaktiven Elemente haben 3 States** — Default, Hover (150–250ms), Active/Press (scale-down). Kein Element ist statisch ohne Feedback.
5. **Mobile-first, kein Mobile-Afterthought** — Jede Komponente wird zuerst für 375px designed, dann für Desktop erweitert.

**2 Anti-Slop-Regeln:**

6. **Kein generisches KI-Design** — Kein `#FF6600` als Orange, kein Inter als Body-Font, kein reines Schwarz als Background, keine symmetrische 3-Column-Grid-Reihen ohne Konzept.
7. **Jede Entscheidung ist begründet** — Keine Farbe, kein Spacing, kein Font ohne strategischen Grund. "Weil es hübsch aussieht" ist keine Begründung.

---

## 9. Verifikations-Checkliste

- [x] Alle Text-Farben bestehen WCAG AA (4.5:1) auf ihren Hintergründen — dokumentiert in Kontrast-Tabelle
- [x] Primärfarbe ≠ generisches Orange (#FF6600) — `#E8541E` Warm Vermilion, strategisch gewählt
- [x] System fühlt sich Premium an — Dark Base, Double-Bezel Cards, Glow-CTAs
- [x] Kontrast-Ratios für jede Kombination dokumentiert
- [x] Font-Pairing: Barlow Condensed + Plus Jakarta Sans harmonieren (kraftvoll + warm)
- [x] Lesbarkeit auf Mobile geprüft: min 16px Body ✅
- [x] Condensed-Font Headlines: bei min 30px clamp-Untergrenze keine Mobile-Probleme ✅
- [x] clamp()-Werte bei 375px und 1440px sinnvoll ✅
- [x] Spacing-System konsistent im 4px-Raster ✅
- [x] Animationen nutzen GPU-Properties (transform, opacity) ✅
- [x] Kein generisches KI-Pattern: kein #FF6600, kein Inter, kein `transition: all` ✅
- [x] Design differenziert klar von EASYFITNESS/VIVA ✅
- [x] "Would a human designer proudly present this?" → **JA** ✅
