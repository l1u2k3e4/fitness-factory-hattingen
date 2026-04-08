# PROMPT 5.3 — Website-Integration: Dynamische Inhalte aus Dashboard laden

## Ziel
Die React-Website soll beim Laden prüfen, ob eine `content-overrides.json` existiert, und diese Daten über die statischen Defaults aus `content.ts` legen. So werden Änderungen aus dem Dashboard automatisch auf der Website sichtbar.

## Konzept

```
Website startet
   ↓
Fetch /data/content-overrides.json
   ↓
Vorhanden?  → JA:  Merge mit Defaults aus content.ts
             → NEIN: Nutze nur content.ts (Fallback, kein Fehler)
   ↓
React rendert mit gemergten Daten
```

---

## Datei 1: `src/lib/contentLoader.ts` (NEU erstellen)

```typescript
/**
 * Dynamischer Content-Loader.
 * Liest content-overrides.json und merged mit statischen Defaults.
 * Falls die Datei nicht existiert (404) → Fallback auf content.ts.
 */

import {
  GALERIE as DEFAULT_GALERIE,
  KURSPLAN as DEFAULT_KURSPLAN,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  TEAM as DEFAULT_TEAM,
  HERO as DEFAULT_HERO,
  SITE as DEFAULT_SITE,
} from '@/data/content'

export interface ContentOverrides {
  _meta?: {
    lastModified: string
    version: number
  }
  galerie?: typeof DEFAULT_GALERIE | null
  kursplan?: typeof DEFAULT_KURSPLAN | null
  bewertungen?: {
    overallRating: number
    totalReviews: number
    items: Array<{
      name: string
      sterne: number
      text: string
      datum: string
      sichtbar?: boolean
    }>
  } | null
  team?: {
    mitglieder: Array<{
      name: string
      rolle: string
      qualifikationen: string[]
      beschreibung: string
      foto: string
    }>
  } | null
  hero?: Record<string, unknown> | null
  oeffnungszeiten?: {
    regulaer: Array<{ tag: string; von: string; bis: string }>
    sonder?: Array<{ datum: string; anlass: string; geschlossen: boolean; von?: string; bis?: string }>
    banner?: { aktiv: boolean; text: string }
  } | null
  aktionen?: Array<Record<string, unknown>> | null
  banner?: {
    aktiv: boolean
    text: string
    typ: string
    link?: { text: string; href: string }
    startDatum?: string
    endDatum?: string
    position?: string
    dismissable?: boolean
  } | null
}

let cachedOverrides: ContentOverrides | null = null

/**
 * Lädt content-overrides.json einmalig (cached).
 * Gibt null zurück bei 404 oder Fehler — kein crash.
 */
export async function loadOverrides(): Promise<ContentOverrides | null> {
  if (cachedOverrides !== undefined && cachedOverrides !== null) return cachedOverrides

  try {
    const response = await fetch('/data/content-overrides.json', {
      cache: 'no-store', // Immer frische Daten
    })
    if (!response.ok) {
      cachedOverrides = null
      return null
    }
    cachedOverrides = await response.json()
    return cachedOverrides
  } catch {
    cachedOverrides = null
    return null
  }
}

/**
 * Gibt die Galerie-Daten zurück (Override oder Default).
 */
export function getGalerie(overrides: ContentOverrides | null) {
  if (overrides?.galerie) return overrides.galerie
  return DEFAULT_GALERIE
}

/**
 * Gibt die Kursplan-Daten zurück (Override oder Default).
 */
export function getKursplan(overrides: ContentOverrides | null) {
  if (overrides?.kursplan) return overrides.kursplan
  return DEFAULT_KURSPLAN
}

/**
 * Gibt die Testimonials-Daten zurück (Override oder Default).
 */
export function getTestimonials(overrides: ContentOverrides | null) {
  if (overrides?.bewertungen) {
    return {
      ...DEFAULT_TESTIMONIALS,
      overallRating: overrides.bewertungen.overallRating,
      totalReviews: overrides.bewertungen.totalReviews,
      items: overrides.bewertungen.items
        .filter(b => b.sichtbar !== false)
        .map(b => ({
          name: b.name,
          text: b.text,
          sterne: b.sterne,
          datum: b.datum,
          plattform: 'Google' as const,
        })),
    }
  }
  return DEFAULT_TESTIMONIALS
}

/**
 * Gibt die Team-Daten zurück (Override oder Default).
 */
export function getTeam(overrides: ContentOverrides | null) {
  if (overrides?.team) {
    return {
      ...DEFAULT_TEAM,
      mitglieder: overrides.team.mitglieder,
    }
  }
  return DEFAULT_TEAM
}

/**
 * Gibt die Hero-Daten zurück (Override oder Default).
 */
export function getHero(overrides: ContentOverrides | null) {
  if (overrides?.hero) {
    return { ...DEFAULT_HERO, ...overrides.hero }
  }
  return DEFAULT_HERO
}

/**
 * Gibt die Öffnungszeiten zurück (Override oder Default).
 */
export function getOeffnungszeiten(overrides: ContentOverrides | null) {
  if (overrides?.oeffnungszeiten) {
    return {
      ...DEFAULT_SITE.oeffnungszeiten,
      items: overrides.oeffnungszeiten.regulaer.map(r => ({
        tag: r.tag,
        zeit: `${r.von} – ${r.bis} Uhr`,
      })),
    }
  }
  return DEFAULT_SITE.oeffnungszeiten
}

/**
 * Gibt das Banner zurück (oder null wenn inaktiv/nicht vorhanden).
 */
export function getBanner(overrides: ContentOverrides | null) {
  if (!overrides?.banner || !overrides.banner.aktiv) return null

  // Datum prüfen
  const now = new Date()
  if (overrides.banner.startDatum && new Date(overrides.banner.startDatum) > now) return null
  if (overrides.banner.endDatum && new Date(overrides.banner.endDatum) < now) return null

  return overrides.banner
}
```

---

## Datei 2: `src/hooks/useContentOverrides.ts` (NEU erstellen)

```typescript
import { useState, useEffect } from 'react'
import { loadOverrides, type ContentOverrides } from '@/lib/contentLoader'

/**
 * React Hook: Lädt content-overrides.json einmalig beim Mount.
 * Gibt { overrides, loading } zurück.
 */
export function useContentOverrides() {
  const [overrides, setOverrides] = useState<ContentOverrides | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadOverrides()
      .then(setOverrides)
      .finally(() => setLoading(false))
  }, [])

  return { overrides, loading }
}
```

---

## Datei 3: `src/contexts/ContentContext.tsx` (NEU erstellen)

```typescript
import { createContext, useContext, type ReactNode } from 'react'
import { useContentOverrides } from '@/hooks/useContentOverrides'
import {
  type ContentOverrides,
  getGalerie,
  getKursplan,
  getTestimonials,
  getTeam,
  getHero,
  getBanner,
} from '@/lib/contentLoader'

interface ContentContextValue {
  overrides: ContentOverrides | null
  loading: boolean
}

const ContentContext = createContext<ContentContextValue>({
  overrides: null,
  loading: true,
})

export function ContentProvider({ children }: { children: ReactNode }) {
  const { overrides, loading } = useContentOverrides()

  return (
    <ContentContext.Provider value={{ overrides, loading }}>
      {children}
    </ContentContext.Provider>
  )
}

/**
 * Hook: Zugriff auf den Content-Context.
 */
export function useContent() {
  return useContext(ContentContext)
}

/**
 * Convenience-Hooks für einzelne Module.
 */
export function useDynamicGalerie() {
  const { overrides } = useContent()
  return getGalerie(overrides)
}

export function useDynamicKursplan() {
  const { overrides } = useContent()
  return getKursplan(overrides)
}

export function useDynamicTestimonials() {
  const { overrides } = useContent()
  return getTestimonials(overrides)
}

export function useDynamicTeam() {
  const { overrides } = useContent()
  return getTeam(overrides)
}

export function useDynamicHero() {
  const { overrides } = useContent()
  return getHero(overrides)
}

export function useDynamicBanner() {
  const { overrides } = useContent()
  return getBanner(overrides)
}
```

---

## Datei 4: `src/App.tsx` anpassen

Wrappere die App in den `ContentProvider`:

```tsx
import { ContentProvider } from '@/contexts/ContentContext'

function App() {
  return (
    <ContentProvider>
      {/* ... bestehender Router/Layout Code ... */}
    </ContentProvider>
  )
}
```

---

## Datei 5: Sections anpassen (Beispiele)

### GalerieSection.tsx
```tsx
// Vorher:
import { GALERIE } from '@/data/content'

// Nachher:
import { useDynamicGalerie } from '@/contexts/ContentContext'

export default function GalerieSection() {
  const GALERIE = useDynamicGalerie()
  // ... Rest bleibt gleich
}
```

### TeamSection.tsx
```tsx
import { useDynamicTeam } from '@/contexts/ContentContext'

export default function TeamSection() {
  const TEAM = useDynamicTeam()
  // ... Rest bleibt gleich
}
```

### TestimonialsSection.tsx
```tsx
import { useDynamicTestimonials } from '@/contexts/ContentContext'

export default function TestimonialsSection() {
  const TESTIMONIALS = useDynamicTestimonials()
  // ... Rest bleibt gleich
}
```

### HeroSection.tsx
```tsx
import { useDynamicHero } from '@/contexts/ContentContext'

export default function HeroSection() {
  const HERO = useDynamicHero()
  // ... Rest bleibt gleich
}
```

### KursplanPreview.tsx + KursplanPage.tsx
```tsx
import { useDynamicKursplan } from '@/contexts/ContentContext'

export default function KursplanPreview() {
  const KURSPLAN = useDynamicKursplan()
  // ... Rest bleibt gleich
}
```

---

## Datei 6: Banner-Komponente (NEU erstellen)

### `src/components/layout/AnnouncementBanner.tsx`

```tsx
import { useState } from 'react'
import { X, Info, AlertTriangle, CheckCircle, Megaphone } from 'lucide-react'
import { useDynamicBanner } from '@/contexts/ContentContext'

const typeConfig = {
  info: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', icon: Info },
  aktion: { bg: 'bg-red-50 border-brand-primary/20', text: 'text-brand-primary', icon: Megaphone },
  hinweis: { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-800', icon: AlertTriangle },
  erfolg: { bg: 'bg-green-50 border-green-200', text: 'text-green-800', icon: CheckCircle },
}

export default function AnnouncementBanner() {
  const banner = useDynamicBanner()
  const [dismissed, setDismissed] = useState(false)

  if (!banner || dismissed) return null

  const config = typeConfig[banner.typ as keyof typeof typeConfig] || typeConfig.info
  const Icon = config.icon

  return (
    <div className={`${config.bg} border-b px-4 py-2.5`}>
      <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-3 text-center">
        <Icon className={`w-4 h-4 ${config.text} flex-shrink-0`} />
        <p className={`font-body text-body-sm ${config.text}`}>
          {banner.text}
          {banner.link && (
            <a
              href={banner.link.href}
              className={`${config.text} font-bold underline underline-offset-2 ml-2`}
            >
              {banner.link.text} →
            </a>
          )}
        </p>
        {banner.dismissable && (
          <button
            onClick={() => setDismissed(true)}
            className={`${config.text} hover:opacity-70 flex-shrink-0 ml-2`}
            aria-label="Banner schließen"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
```

Füge `<AnnouncementBanner />` in `Layout.tsx` ein — direkt über oder unter der Navigation (je nach `banner.position`).

---

## Wichtige Regeln

1. **Kein Breaking Change:** Wenn `content-overrides.json` nicht existiert oder leer ist, funktioniert die Website exakt wie vorher mit den Defaults aus `content.ts`.
2. **Keine TypeScript-Fehler:** Alle Typen müssen kompatibel sein. Nutze Type-Assertions oder Adapter-Funktionen.
3. **Performance:** Die JSON-Datei ist klein (<50KB) und wird einmalig geladen (kein Polling, kein Re-fetch).
4. **Cache-Busting:** `fetch` mit `cache: 'no-store'` damit Änderungen sofort sichtbar sind.
5. **Sections die NICHT von Overrides betroffen sind** (Preise, FAQ, Kontakt, etc.) bleiben unverändert und lesen weiterhin direkt aus `content.ts`.

## Verifikation
1. `npm run build` fehlerfrei — auch ohne `content-overrides.json`
2. Website zeigt Default-Inhalte wenn keine Overrides existieren
3. Nach Speichern im Dashboard: Website-Reload zeigt die neuen Inhalte
4. Galerie, Kursplan, Team, Bewertungen, Hero reagieren auf Overrides
5. Banner erscheint wenn aktiv, verschwindet nach Dismiss oder Ablauf
6. Keine Console-Errors (auch nicht bei 404 der JSON-Datei)
7. TypeScript: `tsc --noEmit` fehlerfrei
