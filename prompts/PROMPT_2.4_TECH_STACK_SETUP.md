# PROMPT 2.4 — Tech-Stack Setup (Vite + React 19 + TypeScript + Tailwind)

> **Phase:** 2 (Build)
> **Sub-Agent:** `.claude/agents/frontend-builder.md`
> **Input:** `CLAUDE.md` (Tech-Stack, Konventionen), `design/tailwind-tokens.ts`, `src/data/content.ts`, `seo/`
> **Output:** Vollständiges Projekt-Scaffold in `src/` + Konfigurationsdateien im Root
> **Geschätzte Dauer:** 15–25 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** — Tech-Stack (Abschnitt 3), Code-Konventionen (Abschnitt 4), Verboten-Liste
2. **Lies den Sub-Agent** `.claude/agents/frontend-builder.md` — enthält Anti-Slop-Code-Regeln
3. **Lies die vorherigen Outputs:**
   - `design/tailwind-tokens.ts` (PROMPT 2.1) → Für Tailwind-Config
   - `design/design-system.md` (PROMPT 2.1) → Für Font-Setup
   - `src/data/content.ts` (PROMPT 2.2) → Muss korrekt importierbar sein
   - `seo/tracking-config.ts` (PROMPT 2.3) → Für Analytics-Setup
4. **Lies diese Pflicht-Skills (VERBINDLICH):**
   - `output-skill` → Verhindert Code-Truncation — JEDE Datei vollständig ausschreiben
   - `taste-skill` → GPU-Animationen, metrische Architektur
   - `frontend-design` → Production-Grade Code-Qualität
   - `web-design-guidelines` → Accessibility von Anfang an

---

## Auftrag

Du bist ein Senior Frontend Engineer. Du setzt das komplette Projekt-Scaffold auf — von `npm create vite` bis zur fertigen, lauffähigen Boilerplate mit allen Konfigurationen. Nach diesem Prompt muss `npm run dev` einen funktionierenden Dev-Server starten.

---

### Task 1: Projekt initialisieren

```bash
npm create vite@latest . -- --template react-ts
npm install
```

### Task 2: Dependencies installieren

```bash
# Core
npm install react-router-dom framer-motion lucide-react clsx tailwind-merge

# Tailwind
npm install -D tailwindcss @tailwindcss/forms @tailwindcss/typography postcss autoprefixer
npx tailwindcss init -p
```

### Task 3: Tailwind-Config

Erstelle `tailwind.config.ts` mit den Design-Tokens aus PROMPT 2.1:

```typescript
import type { Config } from 'tailwindcss'
import { designTokens } from './design/tailwind-tokens'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: designTokens.colors,
      fontFamily: designTokens.fontFamily,
      fontSize: designTokens.fontSize,
      spacing: designTokens.spacing,
      boxShadow: designTokens.boxShadow,
      borderRadius: designTokens.borderRadius,
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} satisfies Config
```

### Task 4: Globale CSS-Datei

`src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* @font-face Deklarationen aus design/typography.md */
@font-face {
  font-family: 'DisplayFont';
  src: url('/fonts/display-font.woff2') format('woff2');
  font-display: swap;
  /* ... alle Weights */
}

@font-face {
  font-family: 'BodyFont';
  src: url('/fonts/body-font.woff2') format('woff2');
  font-display: swap;
  /* ... alle Weights */
}

/* Smooth Scroll */
html {
  scroll-behavior: smooth;
}

/* Selection Color */
::selection {
  background: theme('colors.brand.primary / 0.3');
  color: theme('colors.brand.light');
}

/* Focus-Visible für Accessibility */
:focus-visible {
  outline: 2px solid theme('colors.brand.primary');
  outline-offset: 2px;
}
```

### Task 5: Ordnerstruktur

```
src/
├── main.tsx                    ← Entry Point
├── App.tsx                     ← Router-Setup
├── index.css                   ← Tailwind + Fonts
├── vite-env.d.ts
├── components/
│   ├── ui/                     ← Basis-UI-Komponenten (PROMPT 2.5)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Input.tsx
│   │   └── index.ts            ← Re-exports
│   ├── layout/                 ← Layout-Komponenten
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── TopBar.tsx
│   │   ├── StickyCtaBar.tsx
│   │   ├── WhatsAppButton.tsx
│   │   └── Layout.tsx          ← Wrapper mit Nav + Footer + Floating
│   └── sections/               ← Homepage-Sections (PROMPT 2.6)
│       ├── HeroSection.tsx
│       ├── TrustBar.tsx
│       ├── LeistungenSection.tsx
│       ├── PreiseSection.tsx
│       ├── ProbetrainingCta.tsx
│       ├── TeamSection.tsx
│       ├── KursplanPreview.tsx
│       ├── GalerieSection.tsx
│       ├── TestimonialsSection.tsx
│       ├── FaqSection.tsx
│       ├── KontaktSection.tsx
│       └── index.ts
├── pages/                      ← Seiten (React Router)
│   ├── HomePage.tsx
│   ├── ProbetrainingPage.tsx
│   ├── MitgliedschaftPage.tsx
│   ├── KursplanPage.tsx
│   ├── TeamPage.tsx
│   ├── FremdgehAktionPage.tsx
│   ├── FaqPage.tsx
│   ├── ImpressumPage.tsx
│   ├── DatenschutzPage.tsx
│   ├── AgbPage.tsx
│   └── KuendigungPage.tsx
├── data/
│   └── content.ts              ← Alle Texte (PROMPT 2.2)
├── hooks/
│   ├── useScrollPosition.ts
│   ├── useMediaQuery.ts
│   └── useInView.ts
├── lib/
│   ├── cn.ts                   ← clsx + tailwind-merge Utility
│   ├── animations.ts           ← Framer Motion Presets (PROMPT 2.1)
│   └── seo.tsx                 ← SEO Head Component
└── types/
    └── index.ts                ← Globale TypeScript-Types
```

### Task 6: Basis-Dateien erstellen

**`src/lib/cn.ts`:**
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**`src/App.tsx`:**
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from '@/components/layout/Layout'
import HomePage from '@/pages/HomePage'
// ... alle Pages importieren

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/probetraining" element={<ProbetrainingPage />} />
          <Route path="/mitgliedschaft" element={<MitgliedschaftPage />} />
          <Route path="/kursplan" element={<KursplanPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/fremdgeh-aktion" element={<FremdgehAktionPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<DatenschutzPage />} />
          <Route path="/agb" element={<AgbPage />} />
          <Route path="/kuendigung" element={<KuendigungPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

**`src/components/layout/Layout.tsx`:**
```typescript
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import TopBar from './TopBar'
import WhatsAppButton from './WhatsAppButton'
import StickyCtaBar from './StickyCtaBar'

export default function Layout() {
  return (
    <>
      <TopBar />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <StickyCtaBar />
    </>
  )
}
```

**`tsconfig.json` Path-Alias:**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

**`vite.config.ts` Path-Alias:**
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Task 7: SEO Head Component

**`src/lib/seo.tsx`:**
Erstelle eine wiederverwendbare SEO-Komponente die:
- `<title>` setzt
- `<meta name="description">` setzt
- `<link rel="canonical">` setzt
- `<meta name="robots">` setzt
- OG-Tags als `<meta property="og:*">` setzt
- Twitter Cards als `<meta name="twitter:*">` setzt
- JSON-LD als `<script type="application/ld+json">` injiziert

Daten kommen aus `seo/meta-tags.ts`, `seo/og-tags.ts`, `seo/json-ld-schemas.ts`.

### Task 8: Accessibility Basics

- `<html lang="de">` in `index.html`
- Skip-to-Content Link
- Semantic HTML Grundstruktur (`<header>`, `<main>`, `<footer>`, `<nav>`)
- `prefers-reduced-motion` Media Query in Animation-Presets
- `prefers-color-scheme` vorbereiten (falls Light-Mode gewünscht)

---

## Verifikation (vor Abschluss)

- [ ] `npm run dev` startet ohne Fehler
- [ ] `npm run build` kompiliert ohne TypeScript-Fehler
- [ ] Alle Imports auflösbar (`@/` Alias funktioniert)
- [ ] Tailwind-Klassen werden korrekt kompiliert (brand-* Farben verfügbar)
- [ ] Fonts laden lokal (kein Google Fonts CDN-Request)
- [ ] Router navigiert zu allen definierten Routes
- [ ] `<html lang="de">` gesetzt
- [ ] Keine `any` Types, kein `@ts-ignore`
- [ ] Keine Next.js-Importe (`use client`, `Image`, `next/link`)
- [ ] Ordnerstruktur entspricht dem Plan
- [ ] content.ts importierbar und korrekt getypt
