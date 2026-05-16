# PROMPT 6.4 — Mobile Galerie als Auto-Karussell mit Kategorien

## Kontext
Fitness Factory Hattingen Website — Vite + React 19 + TypeScript + Tailwind CSS 3.4 + Framer Motion 12.

## Problem
Auf **Mobile** (< 768px) werden die Galerie-Bilder aktuell einzeln untereinander angezeigt. Das erzeugt eine extrem lange Scroll-Strecke und wirkt unübersichtlich.

Auf **Desktop** soll alles bleiben wie es ist (Grid-Ansicht).

## Gewünschtes Verhalten (nur Mobile)

### Auto-Karussell pro Kategorie:
- Die Galerie-Bilder sind nach Kategorien gruppiert (z. B. „Krafthalle", „Cardio", „Sauna", „Kurse", „Team")
- Pro Kategorie wird **ein horizontales Karussell** angezeigt
- Die Bilder wechseln **automatisch alle 5 Sekunden** (Auto-Slide)
- Der Nutzer kann auch **manuell swipen** (links/rechts) oder auf **Punkte/Dots** klicken
- Wenn der Nutzer ein Bild antippt, öffnet sich eine **Lightbox** mit allen Bildern der Kategorie zum Durchklicken

### Layout auf Mobile:
```
[Kategorie-Titel: Krafthalle]
┌──────────────────────────────┐
│   Bild 1/4      ● ○ ○ ○     │  ← Auto-wechselt alle 5s
│                              │  ← Swipe-fähig
└──────────────────────────────┘

[Kategorie-Titel: Sauna]
┌──────────────────────────────┐
│   Bild 1/3      ● ○ ○       │
│                              │
└──────────────────────────────┘

... usw. pro Kategorie
```

## Implementierung

### 1. Galerie-Komponente für Mobile erstellen

Erstelle `src/components/sections/GalerieMobileCarousel.tsx`:

```tsx
import { useState, useEffect, useRef, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalerieImage {
  src: string;
  alt: string;
  kategorie: string;
}

interface CategoryCarouselProps {
  kategorie: string;
  images: GalerieImage[];
  onImageClick: (index: number) => void;
}

function CategoryCarousel({ kategorie, images, onImageClick }: CategoryCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto-Slide alle 5 Sekunden
  useEffect(() => {
    if (isPaused || images.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, images.length]);

  // Nach manuellem Swipe 10s pausieren, dann wieder Auto-Slide
  const pauseAutoSlide = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 10000);
  };

  // Touch-Handling für Swipe
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      pauseAutoSlide();
      if (diff > 0) {
        // Swipe links → nächstes Bild
        setCurrent((prev) => (prev + 1) % images.length);
      } else {
        // Swipe rechts → vorheriges Bild
        setCurrent((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  return (
    <div className="mb-8">
      {/* Kategorie-Titel */}
      <h3 className="text-lg font-bold text-white mb-3 px-4">
        {kategorie}
      </h3>

      {/* Karussell */}
      <div
        className="relative w-full aspect-[4/3] overflow-hidden rounded-lg mx-auto"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={current}
            src={images[current].src}
            alt={images[current].alt}
            className="w-full h-full object-cover cursor-pointer"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            onClick={() => onImageClick(current)}
          />
        </AnimatePresence>

        {/* Bild-Counter */}
        <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
          {current + 1}/{images.length}
        </div>
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5 mt-3">
          {images.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? 'bg-red-600 w-4'
                  : 'bg-white/30'
              }`}
              onClick={() => {
                setCurrent(i);
                pauseAutoSlide();
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

### 2. In die Galerie-Sektion einbinden

Öffne die Galerie-Sektion (z. B. `src/components/sections/GalerieSection.tsx`) und baue die mobile/desktop-Unterscheidung ein:

```tsx
import { useMediaQuery } from '../../hooks/useMediaQuery'; // oder eigener Hook

// Im Komponenten-Body:
const isMobile = useMediaQuery('(max-width: 767px)');

// Im JSX:
{isMobile ? (
  <GalerieMobileView images={GALERIE.bilder} />
) : (
  // Bestehendes Desktop-Grid UNVERÄNDERT lassen
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {/* ... bestehender Desktop-Code ... */}
  </div>
)}
```

### 3. useMediaQuery Hook (falls nicht vorhanden)

Erstelle `src/hooks/useMediaQuery.ts`:

```typescript
import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
```

### 4. Lightbox-Integration

Wenn der Nutzer auf ein Bild tippt, öffnet sich eine Lightbox mit allen Bildern der jeweiligen Kategorie:

- Falls bereits eine Lightbox-Komponente existiert → diese wiederverwenden
- Falls nicht → erstelle eine einfache Fullscreen-Lightbox:
  - Schwarzer Overlay (bg-black/95)
  - Bild zentriert, maximale Größe
  - Schließen-Button oben rechts (X)
  - Links/Rechts-Pfeile zum Navigieren
  - Swipe-fähig
  - ESC zum Schließen
  - Body-Scroll deaktivieren wenn Lightbox offen

### 5. Bilder nach Kategorien gruppieren

Falls die Galerie-Daten in `content.ts` keine Kategorien haben, füge ein `kategorie`-Feld zu jedem Bild hinzu. Gruppiere dann:

```typescript
const groupedByCategory = GALERIE.bilder.reduce((acc, bild) => {
  const kat = bild.kategorie || 'Sonstige';
  if (!acc[kat]) acc[kat] = [];
  acc[kat].push(bild);
  return acc;
}, {} as Record<string, typeof GALERIE.bilder>);
```

## Wichtig:
- **Desktop (≥ 768px):** KEINE ÄNDERUNG — das bestehende Grid bleibt exakt wie es ist
- **Mobile (< 768px):** Karussell pro Kategorie mit Auto-Slide (5s), Swipe, Dots, Lightbox
- Auto-Slide pausiert automatisch nach manuellem Swipe (10s Pause, dann weiter)
- Die Bilder-Reihenfolge innerhalb einer Kategorie bleibt wie im `content.ts` definiert
- Performance: Lazy-Loading für Bilder die nicht im Viewport sind (`loading="lazy"`)

## Verifikation:
```bash
npm run build
npm run dev
# Desktop testen: Galerie-Grid ist unverändert
# Mobile testen (Chrome DevTools → iPhone 14 Pro):
#   - Bilder erscheinen als Karussell pro Kategorie
#   - Auto-Slide wechselt alle 5 Sekunden
#   - Swipen funktioniert (links/rechts)
#   - Dots zeigen aktives Bild
#   - Bild antippen → Lightbox öffnet sich
#   - In Lightbox durch alle Bilder der Kategorie navigieren
#   - X oder ESC schließt Lightbox
```
