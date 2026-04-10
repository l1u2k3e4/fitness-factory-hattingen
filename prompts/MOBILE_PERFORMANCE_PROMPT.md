# Mobile-First Performance Guide — Vite + React + TypeScript + Tailwind

> **Kopiere diesen Prompt in dein Projekt als CLAUDE.md oder gib ihn Claude Code als Kontext.**
> Alle Patterns sind battle-tested aus einem Produktionsprojekt mit GitHub Pages Deployment.
> Ziel: Website läuft auf Mobile genauso flüssig wie auf Desktop — keine weiße Seite, kein Stottern, keine kaputten Bilder.

---

## 1. Vite Build-Config — Breite Browser-Kompatibilität

**Problem:** `target: 'esnext'` erzeugt JavaScript, das ältere mobile Browser (Safari < 16, Android WebView) nicht parsen können. Ergebnis: weiße Seite auf dem Handy, funktioniert aber auf Desktop.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  // Bei Subdirectory-Hosting (z.B. GitHub Pages) anpassen:
  base: '/mein-projekt/',

  plugins: [react()],

  // Falls dein public-Ordner anders heißt:
  // publicDir: 'Public',

  resolve: {
    alias: { '@': resolve(__dirname, './src') },
  },

  build: {
    // KRITISCH: Niemals 'esnext' verwenden!
    // Diese Targets decken ~98% aller aktiven Browser ab (inkl. iOS Safari 14+)
    target: ['es2020', 'safari14', 'chrome87', 'firefox78'],

    sourcemap: false,
    cssMinify: true,

    // Code-Splitting: Große Libraries isolieren für besseres Caching
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['motion'],           // oder 'framer-motion'
          'lucide-react': ['lucide-react'], // oder deine Icon-Library
        },
      },
    },
  },
})
```

**Regel:** Nach JEDEM `npm run build` auf dem Handy testen. Nicht nur Desktop-Chrome.

---

## 2. Asset-Pfad-System — Keine kaputten Bilder

**Problem:** Bei Subdirectory-Hosting (GitHub Pages unter `/mein-projekt/`) zeigen absolute Pfade wie `/bilder/foto.webp` ins Leere. Der Browser sucht unter `domain.com/bilder/foto.webp` statt `domain.com/mein-projekt/bilder/foto.webp`.

### Asset Helper

```typescript
// src/data/content.ts (oder eigene Datei src/lib/assets.ts)

// Liest den Base-Pfad aus der Vite-Config (z.B. '/mein-projekt/')
const base = import.meta.env.BASE_URL

// Prefixed jeden Pfad automatisch mit dem Base-Pfad
export const asset = (path: string) =>
  `${base}${path.startsWith('/') ? path.slice(1) : path}`
```

### Verwendung

```typescript
// RICHTIG — immer asset() verwenden
<img src={asset('/bilder/hero.webp')} alt="Hero" />

// RICHTIG — in Content-Objekten
export const COPY = {
  hero: {
    image: asset('/bilder/hero.webp'),
  },
  team: [
    { name: 'Max', bild: asset('/mitarbeiter/max.webp') },
  ],
}

// FALSCH — hardcodierter Pfad bricht auf GitHub Pages
<img src="/bilder/hero.webp" alt="Hero" />
```

**Regeln:**
- NIEMALS hardcodierte absolute Pfade (`/ordner/bild.webp`) in JSX oder Daten-Dateien
- Alle Bilder über `asset()` Helper oder zentrale Content-Datei referenzieren
- Bei `import.meta.env.BASE_URL` direkt im JSX: Template-Literal verwenden
  ```tsx
  src={`${import.meta.env.BASE_URL}bilder/hero.webp`}
  ```

---

## 3. Animation-Strategie — Desktop animiert, Mobile sofort sichtbar

**Problem:** Scroll-Animationen (Framer Motion / Motion) verursachen auf mobilen Geräten Ruckler, Jank und spürbare Verzögerungen. Besonders auf 4G/LTE und älteren Geräten.

### animations.ts — Zentrale Animation-Config

```typescript
// src/lib/animations.ts
import type { Variants } from 'motion/react'  // oder 'framer-motion'

// Mobile-Erkennung — einmalig bei Import evaluiert
// Breakpoint 1024px = Tailwind 'lg' — alles darunter = Mobile
export const isMobile =
  typeof window !== 'undefined' && window.innerWidth < 1024

// Custom Easing (smooth deceleration)
const EASE = [0.22, 1, 0.36, 1] as const

// No-Animation Variant — Element sofort sichtbar, kein Übergang
export const noAnim: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1 },
}

// --- Animationen (nur Desktop) ---

export const fadeInUp: Variants = isMobile
  ? noAnim
  : {
      hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
      visible: {
        opacity: 1, y: 0, filter: 'blur(0px)',
        transition: { duration: 0.25, ease: EASE },
      },
    }

export const fadeIn: Variants = isMobile
  ? noAnim
  : {
      hidden: { opacity: 0, filter: 'blur(4px)' },
      visible: {
        opacity: 1, filter: 'blur(0px)',
        transition: { duration: 0.25, ease: EASE },
      },
    }

export const scaleIn: Variants = isMobile
  ? noAnim
  : {
      hidden: { opacity: 0, scale: 0.95, filter: 'blur(4px)' },
      visible: {
        opacity: 1, scale: 1, filter: 'blur(0px)',
        transition: { duration: 0.25, ease: EASE },
      },
    }

export const staggerContainer: Variants = isMobile
  ? noAnim
  : {
      hidden: {},
      visible: { transition: { staggerChildren: 0.06, delayChildren: 0.03 } },
    }

// Slide-Varianten (für alternierend links/rechts)
export const slideInLeft: Variants = isMobile
  ? noAnim
  : {
      hidden: { opacity: 0, x: -20, filter: 'blur(4px)' },
      visible: {
        opacity: 1, x: 0, filter: 'blur(0px)',
        transition: { duration: 0.3, ease: EASE },
      },
    }

export const slideInRight: Variants = isMobile
  ? noAnim
  : {
      hidden: { opacity: 0, x: 20, filter: 'blur(4px)' },
      visible: {
        opacity: 1, x: 0, filter: 'blur(0px)',
        transition: { duration: 0.3, ease: EASE },
      },
    }
```

### Verwendung in Komponenten

```tsx
import { motion } from 'motion/react'
import { fadeInUp, staggerContainer } from '@/lib/animations'

export default function ServiceCards() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-48px' }}
      variants={staggerContainer}
      className="grid gap-6 md:grid-cols-3"
    >
      {items.map((item) => (
        <motion.div key={item.id} variants={fadeInUp} className="card">
          {/* ... */}
        </motion.div>
      ))}
    </motion.div>
  )
}
```

**Regeln:**
- Jede neue Animation MUSS den `isMobile ? noAnim : { ... }` Check haben
- Animationsdauer: max 250–300ms (länger fühlt sich träge an)
- `viewport={{ once: true }}` — Animation nur einmal auslösen
- `filter: 'blur(4px)'` als Eingangs-Blur ist subtil und hochwertig

---

## 4. Mobile Menü — CSS Transitions, NICHT Motion/Framer Motion

**Problem:** Framer Motion `AnimatePresence` + mount/unmount verursacht auf mobilen Geräten sichtbares Stottern beim Öffnen/Schließen des Menüs.

**Lösung:** Panel IMMER im DOM lassen, Sichtbarkeit über CSS `translate-x` steuern.

```tsx
// src/components/layout/MobileMenu.tsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { pathname } = useLocation()

  // Menü bei Route-Wechsel schließen
  useEffect(() => { onClose() }, [pathname, onClose])

  // Body-Scroll sperren wenn Menü offen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.body.classList.add('menu-open')
    } else {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
    return () => {
      document.body.style.overflow = ''
      document.body.classList.remove('menu-open')
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay / Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[50] bg-black/60 transition-opacity duration-200',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-Over Panel */}
      <div
        role="dialog"
        aria-modal={isOpen}
        aria-label="Navigation"
        inert={!isOpen ? true : undefined}
        className={cn(
          'fixed top-0 right-0 h-full z-[60] bg-white shadow-2xl',
          'flex flex-col transform-gpu transition-transform duration-200',
          // Easing: schneller Eingang, sanfter Ausgang
          'ease-[cubic-bezier(0.22,1,0.36,1)]',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        style={{ width: 'min(320px, 80vw)' }}
      >
        {/* Header mit Close-Button */}
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-lg">Menu</span>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100"
            aria-label="Menu schließen"
          >
            {/* X-Icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4">
          {/* Hier deine Links einfügen */}
        </nav>
      </div>
    </>
  )
}
```

### z-index Hierarchie (konsistent im gesamten Projekt)

| Layer     | z-index | Verwendung                          |
|-----------|---------|-------------------------------------|
| `z-nav`   | 40      | Header, FABs (WhatsApp, Chat)       |
| `z-overlay` | 50    | Backdrop / Scrim                    |
| `z-modal` | 60      | Slide-Over Panel, Modals, Drawers   |
| `z-toast` | 100     | Toasts, Alerts, Notifications       |

```typescript
// tailwind.config.ts — unter theme.extend.zIndex
zIndex: {
  nav: '40',
  overlay: '50',
  modal: '60',
  toast: '100',
},
```

### CSS: Konkurrierende Elemente verstecken wenn Menü offen

```css
/* src/index.css */
body.menu-open .sticky-cta,
body.menu-open .whatsapp-fab {
  transform: translateY(100%) !important;
  transition: none !important;
}
```

---

## 5. CSS-Regeln für Mobile Performance

```css
/* src/index.css */

@layer base {
  /* Smooth Scroll NUR auf Desktop — auf Mobile verursacht es Jank */
  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  @media (min-width: 1024px) {
    html {
      scroll-behavior: smooth;
    }
  }

  /* Body Defaults */
  body {
    @apply font-body antialiased;
    font-size: 1rem;
    line-height: 1.625;
  }

  /* Focus-Ring für Accessibility */
  :focus-visible {
    @apply outline-none ring-2 ring-offset-2;
  }

  /* prefers-reduced-motion — respektiert OS-Einstellung */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer components {
  /* 44px Minimum Touch-Target für alle Buttons (iOS/Android Standard) */
  .btn-primary,
  .btn-secondary {
    min-height: 44px;
  }

  /* Container mit responsive Padding */
  .container-content {
    @apply mx-auto px-4 sm:px-6 lg:px-8;
    max-width: 1200px;
  }

  /* Section-Spacing: weniger auf Mobile */
  .section {
    @apply py-16 md:py-24;
  }

  /* Sticky CTA Bar — iPhone Safe Area */
  .sticky-cta {
    @apply fixed bottom-0 left-0 right-0 z-nav
           flex items-center justify-between
           px-4 pt-3 gap-3;
    padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
  }
}

@layer utilities {
  /* Touch-Delay entfernen */
  .no-tap-delay {
    touch-action: manipulation;
  }
}
```

**GPU-Acceleration in Tailwind nutzen:**
- `transform-gpu` — Hardware-beschleunigte Transforms
- `will-change-transform` — Browser-Hint für Animation
- `backface-hidden` — verhindert Flickering bei 3D-Transforms

---

## 6. Sticky CTA Bar — IntersectionObserver Pattern

```tsx
// src/components/layout/StickyCTABar.tsx
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function StickyCTABar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        // CTA sichtbar wenn Hero NICHT mehr im Viewport
        setIsVisible(!entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      className={cn(
        'sticky-cta lg:hidden transition-transform duration-200',
        isVisible ? 'translate-y-0' : 'translate-y-full',
      )}
      role="complementary"
      aria-label="Schnellkontakt"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      {/* Telefon-Button */}
      <a
        href="tel:+49XXXXXXXXX"
        className="btn-primary flex-1 text-center"
      >
        Jetzt anrufen
      </a>

      {/* WhatsApp-Button */}
      <a
        href="https://wa.me/49XXXXXXXXX"
        className="btn-secondary flex-1 text-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </div>
  )
}
```

---

## 7. Bild-Optimierung

### Loading-Strategie

| Position          | `loading`  | `fetchPriority` | `decoding` |
|-------------------|-----------|-----------------|------------|
| Hero / LCP-Bild  | `eager`   | `high`          | `async`    |
| Above-the-fold   | `eager`   | —               | `async`    |
| Below-the-fold   | `lazy`    | —               | `async`    |

### Beispiel

```tsx
{/* Hero-Bild (LCP) — sofort laden */}
<img
  src={asset('/bilder/hero.webp')}
  alt="Werkstatt"
  className="w-full h-full object-cover"
  loading="eager"
  fetchPriority="high"
  decoding="async"
  width="1920"
  height="1080"
/>

{/* Team-Foto — lazy laden */}
<img
  src={asset('/team/max.webp')}
  alt="Max Mustermann"
  className="w-full h-full object-cover"
  loading="lazy"
  decoding="async"
  width="400"
  height="533"
/>
```

### index.html — Hero-Bild preloaden

```html
<link
  rel="preload"
  as="image"
  href="/mein-projekt/bilder/hero.webp"
  fetchpriority="high"
  type="image/webp"
/>
```

**Regeln:**
- Alle Bilder in **WebP** konvertieren (80-90% kleiner als JPEG/PNG)
- IMMER `width` + `height` Attribute setzen (verhindert Layout-Shift / CLS)
- Hero-Bild zusätzlich im `<head>` preloaden
- Nur 1-2 Bilder `eager` laden, alles andere `lazy`

---

## 8. Infinite Scroll / Marquee — requestAnimationFrame statt CSS

**Problem:** Die globale `prefers-reduced-motion` CSS-Regel killt ALLE CSS-Animationen mit `animation-duration: 0.01ms !important`. Infinite Scrolls (Testimonials, Partner-Logos) stoppen dadurch.

**Lösung:** `requestAnimationFrame` ist immun gegen CSS-Overrides.

```tsx
// src/components/ui/InfiniteScroll.tsx
import { useCallback, useEffect, useRef } from 'react'

interface InfiniteScrollProps {
  children: React.ReactNode
  duration?: number // Sekunden für einen Durchlauf
  direction?: 'up' | 'down'
}

export default function InfiniteScroll({
  children,
  duration = 20,
  direction = 'up',
}: InfiniteScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const animRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const isVisibleRef = useRef(false)

  const animate = useCallback((timestamp: number) => {
    const el = scrollRef.current
    if (!el || !isVisibleRef.current) return

    if (!startRef.current) startRef.current = timestamp
    const elapsed = timestamp - startRef.current
    const totalHeight = el.scrollHeight / 2 // Content ist verdoppelt
    const progress = (elapsed / (duration * 1000)) % 1
    const offset = direction === 'up' ? -progress * totalHeight : progress * totalHeight

    // translateZ(0) erzwingt GPU-Acceleration
    el.style.transform = `translateY(${offset}px) translateZ(0)`
    animRef.current = requestAnimationFrame(animate)
  }, [duration, direction])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    // Nur animieren wenn im Viewport (Batterie/Performance)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          startRef.current = 0
          animRef.current = requestAnimationFrame(animate)
        } else {
          cancelAnimationFrame(animRef.current)
        }
      },
      { threshold: 0 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(animRef.current)
    }
  }, [animate])

  return (
    <div className="overflow-hidden">
      <div ref={scrollRef} className="will-change-transform">
        {/* Content MUSS verdoppelt werden für nahtlosen Loop */}
        {children}
        {children}
      </div>
    </div>
  )
}
```

**Regeln:**
- Content immer verdoppeln (2x im DOM) für nahtlosen Loop
- IntersectionObserver: Animation pausieren wenn nicht sichtbar
- `will-change: transform` auf dem animierten Container
- `translateZ(0)` in der Transform-String für GPU-Acceleration
- `cancelAnimationFrame` im Cleanup

---

## 9. Performance-Patterns

### Scroll-Events — rAF Debounce

```tsx
// In Header oder jeder Scroll-abhängigen Komponente
useEffect(() => {
  let ticking = false

  const handleScroll = () => {
    if (ticking) return
    ticking = true
    requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 8)
      ticking = false
    })
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

**Wichtig:** `{ passive: true }` bei scroll/touch Events — signalisiert dem Browser, dass `preventDefault()` nicht aufgerufen wird. Ohne das blockiert der Browser das Scrolling.

### Code-Splitting — Alle Seiten lazy laden

```tsx
// src/App.tsx
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/About'))
const Contact = lazy(() => import('@/pages/Contact'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    // 'instant' statt 'smooth' — verhindert Animation beim Seitenwechsel
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter basename="/mein-projekt">
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

### PageLoader — Leichtgewichtiger Fallback

```tsx
export default function PageLoader() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      role="status"
      aria-label="Seite wird geladen"
    >
      <div className="w-10 h-10 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin" />
    </div>
  )
}
```

---

## 10. SPA-Routing auf GitHub Pages

**Problem:** GitHub Pages kann kein serverseitiges Routing. Direkter Aufruf von `/mein-projekt/about` liefert 404.

### 404.html — Redirect-Script (in public/ Ordner)

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Redirect</title>
    <script>
      // GitHub Pages SPA Redirect
      // Konvertiert den Pfad in eine Query-String, die index.html auslesen kann
      var pathSegmentsToKeep = 1; // Anzahl Pfad-Segmente des Repo-Namens
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

### index.html — Restore-Script (im `<head>` vor allen anderen Scripts)

```html
<script>
  (function(l) {
    if (l.search[1] === '/') {
      var decoded = l.search.slice(1).split('&').map(function(s) {
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
        l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

**Wie es funktioniert:**
1. User öffnet `/mein-projekt/about` → GitHub Pages liefert `404.html`
2. `404.html` redirected zu `/mein-projekt/?/about`
3. `index.html` Restore-Script liest `?/about` und stellt `/mein-projekt/about` in der History wieder her
4. React Router übernimmt das Routing

**Wichtig:** `BrowserRouter basename` MUSS zum Vite `base` passen:
```
vite.config.ts:  base: '/mein-projekt/'
App.tsx:         <BrowserRouter basename="/mein-projekt">
404.html:        pathSegmentsToKeep = 1  (= 'mein-projekt')
```

---

## 11. GitHub Actions Deploy Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 12. index.html — Vollständiges Template

```html
<!doctype html>
<html lang="de">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- SEO -->
    <title>Seitentitel</title>
    <meta name="description" content="Beschreibung" />

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/mein-projekt/favicon.png" />
    <link rel="apple-touch-icon" href="/mein-projekt/favicon.png" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Seitentitel" />
    <meta property="og:description" content="Beschreibung" />
    <meta property="og:image" content="/mein-projekt/og-image.webp" />

    <!-- Google Fonts Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

    <!-- Hero-Bild Preload (LCP) -->
    <link rel="preload" as="image" href="/mein-projekt/bilder/hero.webp"
          fetchpriority="high" type="image/webp" />

    <!-- Theme Color (Mobile Browser-UI) -->
    <meta name="theme-color" content="#1a1a2e" />

    <!-- GitHub Pages SPA Redirect Handler -->
    <script>
      (function(l) {
        if (l.search[1] === '/') {
          var decoded = l.search.slice(1).split('&').map(function(s) {
            return s.replace(/~and~/g, '&')
          }).join('?');
          window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location))
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 13. Checkliste vor Deployment

### Build & Kompatibilität
- [ ] `build.target` ist NICHT `esnext` (muss `es2020` o.ä. sein)
- [ ] `npm run build` läuft fehlerfrei durch
- [ ] Alle Bildpfade verwenden `asset()` oder `import.meta.env.BASE_URL`
- [ ] `BrowserRouter basename` passt zur Vite `base` Config
- [ ] `404.html` liegt im public-Ordner

### Mobile testen
- [ ] iOS Safari (iPhone) — Seite lädt, keine weiße Seite
- [ ] Chrome Android — Seite lädt, keine weiße Seite
- [ ] Mobile Menü öffnet/schließt flüssig (kein Stottern)
- [ ] Sticky CTA Bar erscheint nach Hero-Scroll
- [ ] Alle Bilder laden auf allen Seiten
- [ ] Touch-Targets sind mindestens 44px groß
- [ ] Kein horizontales Scrollen

### Performance
- [ ] Lighthouse Mobile Score > 90
- [ ] LCP < 2.5s auf 4G
- [ ] CLS < 0.1 (keine Layout-Shifts)
- [ ] Scroll-Animationen ruckeln nicht auf Mobile
- [ ] Infinite Scrolls pausieren wenn nicht sichtbar

### Accessibility
- [ ] `prefers-reduced-motion` respektiert (Animationen aus)
- [ ] Menü hat `role="dialog"` + `aria-modal`
- [ ] Menü Panel hat `inert` wenn geschlossen
- [ ] Alle Bilder haben `alt`-Attribute
- [ ] Focus-Ring sichtbar bei Tastatur-Navigation

---

## Zusammenfassung der kritischsten Regeln

| # | Regel | Warum |
|---|-------|-------|
| 1 | Build-Target `es2020`, NICHT `esnext` | Weiße Seite auf älteren Mobile-Browsern |
| 2 | Alle Asset-Pfade über `asset()` Helper | Kaputte Bilder bei Subdirectory-Hosting |
| 3 | Motion-Animationen auf Mobile deaktivieren | Ruckler und Jank auf 4G/LTE |
| 4 | Mobile Menü: CSS Transitions, kein Motion | AnimatePresence mount/unmount stottert |
| 5 | Infinite Scrolls: `requestAnimationFrame` | Immun gegen `prefers-reduced-motion` CSS-Kill |
| 6 | `scroll-behavior: smooth` nur Desktop | Jank bei Scroll auf Mobile |
| 7 | Touch-Targets min. 44px | iOS/Android Accessibility-Standard |
| 8 | `env(safe-area-inset-bottom)` auf Sticky-Elemente | iPhone Notch/Home-Indicator |
| 9 | Scroll-Events: `passive: true` + rAF | Blockiert sonst das Scrolling |
| 10 | `404.html` für GitHub Pages SPA | Unterseiten geben sonst 404 |
