# PROMPT 2.8 — Performance-Optimierung (Lazy Loading, Bilder, Bundle)

> **Phase:** 2 (Build)
> **Sub-Agent:** `.claude/agents/frontend-builder.md`
> **Input:** `src/` (gesamter Code), `public/` (Bilder), `audit/05-anforderungskatalog.md` (Performance-Ziele)
> **Output:** Optimierter Code + `docs/performance-report.md`
> **Geschätzte Dauer:** 20–30 Minuten

---

## WICHTIG: Vor dem Start

1. **Lies `CLAUDE.md`** — Performance-Ziele: LCP < 2.5s, INP < 200ms, CLS < 0.1
2. **Lies den Sub-Agent** `.claude/agents/frontend-builder.md`
3. **Lies die Technischen Anforderungen** aus `audit/05-anforderungskatalog.md` Abschnitt 4
4. **Lies diese Pflicht-Skills (VERBINDLICH):**
   - `output-skill` → Vollständige Code-Änderungen
   - `taste-skill` → Performance ist Teil der Design-Qualität
   - `frontend-design` → Production-Grade-Standards
   - `website-seo` → Core Web Vitals Impact auf Rankings

---

## Auftrag

Du bist ein Performance Engineer. Du optimierst die gesamte Fitness Factory Website für maximale Ladegeschwindigkeit — Ziel: Sub-2-Sekunden auf 4G-Mobilfunk und "Gut" bei allen Core Web Vitals.

### Performance-Ziele (aus Anforderungskatalog)

| Metrik | Ziel | Bedeutung |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | Hero-Bild/Video schnell sichtbar |
| **INP** (Interaction to Next Paint) | < 200ms | Buttons reagieren sofort |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Kein Springen beim Laden |
| **Gesamtladezeit** | < 2s auf 4G | Schnell genug für Mobilnutzer (76%+) |

---

### Task 1: Bilder optimieren

#### 1a: WebP-Konvertierung
```bash
# Alle JPG/PNG in public/images/ zu WebP konvertieren
# Originalbilder behalten als Fallback
# Ziel: 60–80% Größenreduktion
```

- Konvertiere ALLE Bilder in `public/images/` zu WebP
- Behalte Originale als Fallback für ältere Browser
- Beschreibende Dateinamen beibehalten (nur Extension ändern)
- Erstelle `<picture>` Element Helper-Komponente:

```tsx
function OptimizedImage({ src, alt, ...props }) {
  const webpSrc = src.replace(/\.(jpg|png)$/, '.webp')
  return (
    <picture>
      <source srcSet={webpSrc} type="image/webp" />
      <img src={src} alt={alt} {...props} />
    </picture>
  )
}
```

#### 1b: Responsive Images
- `srcset` und `sizes` für verschiedene Viewports
- Hero-Bild: Desktop (1920w), Tablet (1024w), Mobile (640w)
- Gallery-Bilder: Desktop (600w), Mobile (375w)
- Thumbnails: 300w

#### 1c: Lazy Loading
- Hero-Bild: `loading="eager"` + `fetchpriority="high"` (above-the-fold!)
- ALLE anderen Bilder: `loading="lazy"`
- Intersection Observer für below-the-fold Sections

### Task 2: Code-Splitting & Lazy Loading

```typescript
// React.lazy für Unterseiten (nicht Homepage!)
const ProbetrainingPage = React.lazy(() => import('@/pages/ProbetrainingPage'))
const MitgliedschaftPage = React.lazy(() => import('@/pages/MitgliedschaftPage'))
const KursplanPage = React.lazy(() => import('@/pages/KursplanPage'))
const TeamPage = React.lazy(() => import('@/pages/TeamPage'))
const FremdgehAktionPage = React.lazy(() => import('@/pages/FremdgehAktionPage'))
const FaqPage = React.lazy(() => import('@/pages/FaqPage'))
// Legal-Seiten lazy (selten besucht)
const ImpressumPage = React.lazy(() => import('@/pages/ImpressumPage'))
const DatenschutzPage = React.lazy(() => import('@/pages/DatenschutzPage'))
const AgbPage = React.lazy(() => import('@/pages/AgbPage'))
const KuendigungPage = React.lazy(() => import('@/pages/KuendigungPage'))

// Suspense Wrapper
<Suspense fallback={<PageLoader />}>
  <Routes>...</Routes>
</Suspense>
```

- **HomePage NICHT lazy** — ist die Hauptseite, muss sofort laden
- Alle anderen Seiten per `React.lazy()` Code-Split
- `<Suspense>` mit minimalem Skeleton-Loader

### Task 3: Font-Optimierung

```html
<!-- In index.html <head>: -->
<link rel="preload" as="font" type="font/woff2" href="/fonts/display-font.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/fonts/body-font.woff2" crossorigin>
```

- **font-display: swap** in @font-face (bereits in PROMPT 2.4)
- Nur WOFF2-Format (bestes Kompressionsverhältnis)
- Nur benötigte Weights laden (keine 9 Varianten)
- Fallback-Stack mit ähnlichen System-Fonts für minimalen CLS

### Task 4: Bundle-Optimierung (Vite)

```typescript
// vite.config.ts — Build-Optimierungen
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          icons: ['lucide-react'],
        },
      },
    },
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
  },
})
```

- Vendor-Chunk für React + Router (cachefreundlich)
- Framer Motion separat (großes Bundle, nur bei Bedarf)
- Lucide Icons: nur genutzte Icons importieren (Tree-Shaking)
- CSS Code-Split pro Route
- Console-Logs im Production-Build entfernen

### Task 5: Critical CSS & Above-the-Fold

- Inline kritisches CSS für Hero-Section im `<head>` (optional mit Vite Plugin)
- `<link rel="preconnect">` für externe Domains:
  - `https://www.googletagmanager.com`
  - `https://maps.googleapis.com` (für Maps Embed)
- `<link rel="dns-prefetch">` als Fallback

### Task 6: Google Maps Lazy Load

```typescript
// Maps ERST laden wenn:
// 1. Cookie-Consent für Marketing/Funktional erteilt
// 2. Kontakt-Section in Viewport (Intersection Observer)
// Vorher: Statisches Bild als Platzhalter mit "Karte laden" Button
```

### Task 7: Video-Optimierung (Hero)

```html
<!-- Hero Video (wenn vorhanden): -->
<video autoplay muted loop playsinline preload="metadata" poster="/images/hero-fallback.webp">
  <source src="/videos/hero.webm" type="video/webm">
  <source src="/videos/hero.mp4" type="video/mp4">
</video>
```

- `preload="metadata"` statt `auto` (spart Bandbreite)
- `poster` als Fallback-Bild (sofort sichtbar)
- WebM als primäres Format (kleiner als MP4)
- Auf Mobile: statisches Bild statt Video (Bandbreite sparen)

### Task 8: Service Worker (optional, KANN)

- Nur wenn sinnvoll: offline Caching für statische Assets
- Nicht für dynamische Inhalte
- Markiere als optional/Phase 3

---

## Output-Dateien

1. **Optimierter Code in `src/`** — Lazy Loading, Code-Splitting, Suspense
2. **Optimierte Bilder in `public/images/`** — WebP-Versionen
3. **Aktualisierte `vite.config.ts`** — Build-Optimierungen
4. **`docs/performance-report.md`** — Dokumentation aller Maßnahmen + erwartete Metriken

---

## Verifikation (vor Abschluss)

- [ ] `npm run build` — Bundle-Größen analysieren (keine > 200KB Chunks)
- [ ] Hero-Bild: eager + fetchpriority="high" + width/height gesetzt
- [ ] Alle anderen Bilder: lazy loading
- [ ] WebP-Versionen für alle Bilder vorhanden
- [ ] React.lazy() für alle Unterseiten (nicht Homepage)
- [ ] Fonts: preload + font-display:swap + nur WOFF2
- [ ] Vite manualChunks: vendor, animations, icons getrennt
- [ ] Console.log im Production-Build entfernt
- [ ] Google Maps: lädt erst nach Consent + Viewport-Eintritt
- [ ] Video: poster-Attribut, preload="metadata", Mobile-Fallback
- [ ] Keine `import * from 'lucide-react'` (Tree-Shaking!)
- [ ] CLS: width/height auf allen Bildern, font-display:swap
- [ ] Lighthouse-Simulation: Performance Score > 90 erwartet
