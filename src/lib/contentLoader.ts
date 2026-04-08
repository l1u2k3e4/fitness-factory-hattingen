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
  TRUST_BAR as DEFAULT_TRUST_BAR,
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
  trustbar?: {
    rating?: number
    totalReviews?: number
    liveKurse?: number
  } | null
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
      cache: 'no-store',
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
 * Gibt die Galerie-Daten zurück (Override merged mit Default).
 * Override-Felder überschreiben Defaults, fehlende Felder fallen auf Defaults zurück.
 */
export function getGalerie(overrides: ContentOverrides | null) {
  if (overrides?.galerie) {
    return { ...DEFAULT_GALERIE, ...overrides.galerie }
  }
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
 * Gibt die Hero-Daten zurück (Override merged mit Default).
 * CTA-Objekte werden deep-gemerged, damit Dashboard-Overrides
 * keine Default-Felder (label, ariaLabel) verlieren.
 */
export function getHero(overrides: ContentOverrides | null) {
  if (overrides?.hero) {
    const heroOverride = overrides.hero as Record<string, unknown>
    const merged = { ...DEFAULT_HERO, ...heroOverride }

    // Deep-merge CTAs: Dashboard schreibt ggf. nur text/href
    if (heroOverride.ctaPrimary && typeof heroOverride.ctaPrimary === 'object') {
      const ctaOver = heroOverride.ctaPrimary as Record<string, unknown>
      merged.ctaPrimary = {
        ...DEFAULT_HERO.ctaPrimary,
        ...ctaOver,
        // Dashboard sendet "text", Component erwartet "label"
        label: (ctaOver.label ?? ctaOver.text ?? DEFAULT_HERO.ctaPrimary.label) as typeof DEFAULT_HERO.ctaPrimary.label,
      }
    }
    if (heroOverride.ctaSecondary && typeof heroOverride.ctaSecondary === 'object') {
      const ctaOver = heroOverride.ctaSecondary as Record<string, unknown>
      merged.ctaSecondary = {
        ...DEFAULT_HERO.ctaSecondary,
        ...ctaOver,
        label: (ctaOver.label ?? ctaOver.text ?? DEFAULT_HERO.ctaSecondary.label) as typeof DEFAULT_HERO.ctaSecondary.label,
      }
    }

    return merged
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

  const now = new Date()
  if (overrides.banner.startDatum && new Date(overrides.banner.startDatum) > now) return null
  if (overrides.banner.endDatum && new Date(overrides.banner.endDatum) < now) return null

  return overrides.banner
}

/**
 * Gibt die Trust Bar Daten zurück (Override merged mit Default).
 * Überschreibt Rating, Bewertungsanzahl und Kursanzahl dynamisch.
 */
export function getTrustBar(overrides: ContentOverrides | null) {
  if (!overrides?.trustbar) return DEFAULT_TRUST_BAR

  const tb = overrides.trustbar
  const items = DEFAULT_TRUST_BAR.items.map((item) => {
    if (item.icon === 'Star' && tb.rating != null) {
      const ratingStr = tb.rating.toFixed(1).replace('.', ',')
      return {
        ...item,
        numericValue: tb.rating,
        displayWert: `${ratingStr}/5`,
        label: `basierend auf ${tb.totalReviews ?? 167} Bewertungen`,
      }
    }
    if (item.icon === 'Calendar' && tb.liveKurse != null) {
      return {
        ...item,
        numericValue: tb.liveKurse,
        displayWert: `${tb.liveKurse}+`,
      }
    }
    return item
  })

  return { ...DEFAULT_TRUST_BAR, items }
}
