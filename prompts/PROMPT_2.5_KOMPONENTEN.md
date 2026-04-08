# PROMPT 2.5 — Komponenten (Buttons, Cards, Navigation, Formulare)

> **Phase:** 2 (Build)
> **Sub-Agent:** `.claude/agents/frontend-builder.md`
> **Input:** `design/design-system.md`, `design/tailwind-tokens.ts`, `src/data/content.ts`, `CLAUDE.md` (Konventionen)
> **Output:** Alle UI-Komponenten in `src/components/ui/` + Layout-Komponenten in `src/components/layout/`
> **Geschätzte Dauer:** 30–45 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** — Code-Konventionen (Abschnitt 4), Verboten-Liste, Component-Pattern
2. **Lies den Sub-Agent** `.claude/agents/frontend-builder.md` — Anti-Slop-Regeln, Pflicht-Skills
3. **Lies die vorherigen Outputs:**
   - `design/design-system.md` (PROMPT 2.1) → Alle Design-Tokens, Komponenten-Specs
   - `design/tailwind-tokens.ts` (PROMPT 2.1) → Farben (Rot/Schwarz/Weiß CI), Fonts, Spacing, scharfe Radii
   - `src/data/content.ts` (PROMPT 2.2) → Texte für Nav, Footer, etc.
   - `src/lib/animations.ts` (PROMPT 2.4) → Framer Motion Presets (dezent!)
4. **Lies diese Pflicht-Skills (VERBINDLICH):**
   - `output-skill` → JEDE Komponente VOLLSTÄNDIG ausschreiben — kein Truncation, kein "// ... rest"
   - `taste-skill` → GPU-Animationen, keine generischen Hover-Effekte
   - `frontend-design` → Production-Grade-Ästhetik
   - `web-design-guidelines` → Accessibility (ARIA, Focus, Keyboard-Navigation)
   - `soft-skill` → Premium-Agentur-Standards für Interaktionen
   - `ui-ux-pro-max` → UX-Guidelines für Komponenten

---

## DESIGN-RICHTUNG

> **Clean White Theme + Rot/Schwarz CI.** Die Website sieht aus wie von einem professionellen Webdesigner — NICHT KI-generiert. Das bedeutet:
> - **Weißer Hintergrund** — Cards auf Weiß mit subtilen Borders
> - **Rote Buttons** (brand-primary) — schlicht, ohne Glow
> - **Schwarze Akzente** — Headlines, Nav, Icons
> - **Scharfe Ecken** — Buttons 4px, Cards 6px, KEIN rounded-2xl
> - **KEINE Glow-Effekte** — keine farbigen Shadows, kein Pulsieren
> - **Dezente Animationen** — kurz, subtil, professionell

---

## Auftrag

Du bist ein Senior Component Engineer. Du baust ALLE wiederverwendbaren UI- und Layout-Komponenten — pixel-perfect, accessible, professionell clean, und production-ready. JEDE Komponente wird VOLLSTÄNDIG ausgeschrieben.

### Globale Regeln (aus CLAUDE.md)

- Functional Components only — KEINE Class Components
- TypeScript strict — alle Props getypt, KEIN `any`
- Alle Farben über `brand-*` Tokens — NIE Hex-Codes im JSX
- Alle Texte aus `content.ts` importieren — NIE Texte im JSX hardcoden
- `cn()` Utility für conditional Classes
- Framer Motion für Animationen — KEIN CSS `transition: all`
- KEIN Next.js (`use client`, `<Image>`, `next/link`)

---

### Task 1: UI-Basis-Komponenten (`src/components/ui/`)

#### 1a: Button (NICHT "GlowButton" — einfach "Button")

**DER zentrale CTA-Button der gesamten Website.** Clean, schlicht, professionell.

```
Props:
- variant: 'primary' | 'secondary' | 'ghost' | 'whatsapp'
- size: 'sm' | 'md' | 'lg'
- href?: string (für Link-Buttons)
- onClick?: () => void
- children: ReactNode
- icon?: LucideIcon (optional, links vom Text)
- fullWidth?: boolean
- loading?: boolean

Styling:
- Primary: bg-brand-primary (ROT), text-white, font-semibold
  Hover: bg-brand-primary-hover (dunkleres Rot) — KEIN Glow, KEIN Scale
- Secondary: border-1.5 border-brand-dark, text-brand-dark, bg-transparent
  Hover: bg-brand-dark, text-white — einfacher Color-Swap
- Ghost: text-brand-dark, bg-transparent
  Hover: bg-brand-bg (leichtes Grau)
- WhatsApp: bg-brand-whatsapp, text-white

Border-Radius: 4px (radius-sm) — SCHARF, nicht rund
Padding: sm=8px 20px, md=12px 28px, lg=16px 36px
Font-Weight: 600 (semibold)
Text-Transform: none (KEIN uppercase — das wirkt generisch)

Animation:
- Hover: NUR Farbwechsel (bg-color transition 0.2s ease)
- KEIN scale() auf hover — das ist ein KI-Pattern
- KEIN box-shadow/glow auf hover
- Active: opacity 0.9 (kurzer Tap-Feedback)

Accessibility:
- Focus-Ring: 2px brand-primary, offset 2px
- role="button" oder <a> je nach href
- aria-label wenn nur Icon
- disabled-State: opacity-50, pointer-events-none
```

#### 1b: Card

```
Props:
- variant: 'default' | 'highlighted' | 'pricing'
- children: ReactNode
- className?: string
- hover?: boolean

Styling:
- Default: bg-brand-white, border 1px solid brand-border, rounded-md (6px), padding lg
- Highlighted: + border-brand-primary (roter Rand) + Badge oben
- Pricing: Struktur für Tarif-Cards

Hover (wenn hover=true):
- border-color zu brand-primary wechseln (Rot) — dezenter Effekt
- ODER shadow-card-hover hinzufügen
- KEIN translateY, KEIN scale — das ist KI-typisch
```

#### 1c: Badge

```
Props:
- variant: 'primary' | 'success' | 'neutral'
- children: ReactNode

Styling:
- Primary: bg-brand-primary-light (helles Rosa/Rot), text-brand-primary, rounded-sm (4px), px-3 py-1, text-sm font-medium
- Success: bg-green-50, text-green-700
- Neutral: bg-brand-bg, text-brand-dark-soft
- KEIN rounded-full — das ist ein KI-Pattern für Badges
```

#### 1d: Input + Textarea

```
Props:
- label: string
- name: string
- type: 'text' | 'email' | 'tel' | 'textarea'
- required?: boolean
- placeholder?: string
- error?: string

Styling:
- bg-white, border 1px solid brand-border, rounded-sm (4px)
- Focus: border-brand-primary + ring-1 ring-brand-primary/20
- Label: text-brand-dark, font-medium, mb-1.5
- Error: border-red-500, error-message in text-red-600 darunter
- Placeholder: text-brand-muted

Accessibility:
- <label htmlFor={name}>
- aria-invalid bei Error
- aria-describedby für Error-Message
```

#### 1e: SectionWrapper

```
Props:
- id?: string
- children: ReactNode
- className?: string
- animate?: boolean
- bg?: 'white' | 'light' (alternierend: weiß / fast-weiß)

Styling:
- max-w-7xl mx-auto, px-4 sm:px-6 lg:px-8, responsive Section-Padding
- bg: 'white' = bg-brand-white, 'light' = bg-brand-bg
- Optionaler Scroll-Trigger via Framer Motion useInView (DEZENT: nur fadeIn, 0.4s)
```

#### 1f: Counter (animierte Zahlen)

```
Props:
- value: number
- suffix?: string
- prefix?: string
- duration?: number (default: 1.5s — schneller als vorher)

Animation:
- Zählt von 0 bis value wenn in Viewport
- Keine extra Effekte — nur die Zahl zählt hoch
```

#### 1g: Accordion (für FAQ)

```
Props:
- items: { question: string, answer: string }[]

Styling:
- Framer Motion AnimatePresence für open/close
- Chevron-Icon rotiert (Lucide: ChevronDown)
- Border-bottom: 1px solid brand-border zwischen Items
- Padding: py-4 pro Item
- Question: font-semibold text-brand-dark
- Answer: text-brand-dark-soft
- KEIN Background-Wechsel bei Open — nur Content einblenden
- Radius: KEINE abgerundeten Container — flache Borders reichen

Accessibility:
- button mit aria-expanded
- aria-controls auf Panel
- Keyboard: Enter/Space toggle
```

#### 1h: Divider

```
Props:
- className?: string

Styling:
- <hr /> mit border-brand-border
- Optional: mit Text in der Mitte ("oder")
- Clean, einfach, professionell
```

### Task 2: Layout-Komponenten (`src/components/layout/`)

#### 2a: TopBar

```
- Schmale Leiste ganz oben: bg-brand-dark (SCHWARZ), text-white
- Öffnungszeiten | Click-to-Call | WhatsApp-Link
- Text: text-sm, font-normal
- Auf Mobile: nur Telefon + WhatsApp (Öffnungszeiten ausblenden)
- KEINE Animation — statisch, sofort sichtbar
```

#### 2b: Navigation

```
Struktur:
- bg-white/95 + backdrop-blur-md, border-bottom 1px brand-border
- Logo links (aus public/images/logo-fitness-factory.png)
- Nav-Links Mitte: Kurse, Preise, Kursplan, Team — text-brand-dark, font-medium
- CTA rechts: Button variant="primary" "Probetraining" (ROT)
- Mobile: Hamburger → Slide-Over von rechts

Hover auf Links:
- text-brand-primary (Rot) — einfacher Color-Change
- KEIN underline-Animation, KEIN fancy border-bottom — schlicht

Sticky Verhalten:
- Sticky on scroll
- bg-white/95 + backdrop-blur-md
- border-bottom bleibt sichtbar

Mobile-Menü:
- Slide-Over von rechts, bg-white, border-left brand-border
- Links vertikal, text-lg, py-3 pro Link
- Close-Button oben rechts (X Icon)
- Spring-Physics aber STRAFF (kein Wackeln)
- Focus-Trap im offenen Menü

Accessibility:
- <nav aria-label="Hauptnavigation">
- Mobile: aria-expanded, focus-trap, Escape schließt
```

#### 2c: Footer

```
bg-brand-dark (SCHWARZ), text-white
4-Column Layout (Desktop) → Stack (Mobile):
1. Logo (weiße Version oder invertiert) + Kurzbeschreibung
2. Seiten (Home, Kurse, Preise, Kursplan, Team, Probetraining)
3. Rechtliches (Impressum, Datenschutz, AGB, Kündigung)
4. Kontakt (Adresse, Telefon, WhatsApp, E-Mail, Social-Icons)

Links: text-brand-muted (grau), hover: text-white
Trennlinie oben: KEINE — Footer ist eigener dunkler Block
Copyright: text-brand-muted, text-sm, mt-12, border-top 1px rgba(255,255,255,0.1)
```

#### 2d: WhatsAppButton (Floating)

```
- Fest rechts unten, z-50
- bg-brand-whatsapp, text-white, rounded-lg (8px — darf hier etwas runder sein)
- Size: 56x56px
- href="https://wa.me/4915737580001?text=[URL-encoded Nachricht]"
- Shadow: shadow-lg (neutrale Shadow, KEIN grüner Glow)
- KEINE Puls-Animation — statisch, clean
- Auf Mobile: 16px vom Rand, oberhalb Sticky CTA Bar
- aria-label="WhatsApp Chat starten"
```

#### 2e: StickyCtaBar (Mobile only)

```
- NUR auf Mobile sichtbar (lg:hidden)
- Erscheint nach 30% Scroll
- bg-white/95 + backdrop-blur-md, border-top 1px brand-border
- 3 Buttons gleichmäßig verteilt:
  [📞 Anrufen] — variant ghost, text-brand-dark
  [💬 WhatsApp] — variant ghost, text-brand-whatsapp
  [Probetraining] — variant primary (ROT)
- Höhe: 64px, z-50
- Framer Motion: slide-up, 0.3s, ease-out — einmal rein, fertig

KEIN Glow, KEIN pulsierender Effekt — clean, funktional
```

#### 2f: CookieConsent

```
- Banner am unteren Bildschirmrand
- bg-white, border-top 1px brand-border, shadow-lg
- Text links, Buttons rechts
- "Akzeptieren" — Button variant primary (ROT)
- "Nur Notwendige" — Button variant secondary
- "Einstellungen" — Link/Ghost
- Kategorien: Notwendig (immer an), Statistik, Marketing
- Google Consent Mode Integration
- Clean, rechteckig, professionell — KEIN floatender Cookie-Bubble
```

---

## ANTI-PATTERNS CHECKLIST (vor Abschluss prüfen)

> **Diese Dinge machen eine Website sofort als KI-generiert erkennbar. KEINES davon darf vorkommen:**

- [ ] ❌ KEIN `GlowButton` — Component heißt `Button`, hat KEINEN Glow
- [ ] ❌ KEIN `rounded-2xl` oder `rounded-3xl` auf Buttons/Cards
- [ ] ❌ KEIN `rounded-full` auf Buttons (Pill-Buttons = KI)
- [ ] ❌ KEIN `scale(1.05)` auf Card-Hover
- [ ] ❌ KEIN `translateY(-8px)` auf Card-Hover (Karten fliegen = KI)
- [ ] ❌ KEIN farbiger box-shadow (Glow-Effekt)
- [ ] ❌ KEIN Gradient-Background auf Buttons
- [ ] ❌ KEIN `text-transparent bg-clip-text bg-gradient` (Gradient-Text = KI)
- [ ] ❌ KEIN pulsierender Effekt auf irgendwas
- [ ] ❌ KEIN `uppercase tracking-wider` auf Buttons (generisch)
- [ ] ❌ KEIN dunkler/grauer Hintergrund — Website ist WEISS

---

## Verifikation (vor Abschluss)

- [ ] JEDE Komponente ist VOLLSTÄNDIG implementiert (kein "// ..." oder "rest similar")
- [ ] ALLE Texte kommen aus content.ts — KEINE hardcoded Strings
- [ ] ALLE Farben nutzen brand-* Tokens — KEIN Hex im JSX
- [ ] TypeScript strict: alle Props getypt, KEIN `any`
- [ ] Accessibility: ARIA-Attributes, Focus-Management, Keyboard-Navigation
- [ ] Buttons: 4px radius, KEIN Glow, KEIN Scale-Hover — nur Farbwechsel
- [ ] Cards: 6px radius, Border statt Shadow, hover = border-color-change
- [ ] Navigation: Weiß + Border-Bottom, KEIN dunkler Header
- [ ] Animationen: dezent, max 0.4s, nur opacity/transform
- [ ] Component heißt `Button` (NICHT `GlowButton`)
- [ ] "Sieht das aus wie von einem Webdesigner?" → JA
- [ ] `npm run build` kompiliert ohne Fehler
