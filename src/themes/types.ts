/**
 * Theme-System Types — Fitness Factory Hattingen
 * Definiert die Struktur für alle Design-Varianten.
 */

export type ThemeId = 'classic' | 'energetic' | 'energetic-v2'

export interface ThemeAnimationConfig {
  /** px-Offset für fadeInUp (20 = dezent, 40 = dramatisch) */
  fadeOffset: number
  /** Basis-Dauer-Multiplikator (1.0 = normal) */
  duration: number
  /** Stagger-Delay zwischen Kindern in Sekunden */
  staggerDelay: number
  /** Card-Hover-Lift in px */
  cardHoverY: number
  /** Glow-Effekte auf Buttons/Cards */
  enableGlow: boolean
  /** Scale-Animation auf Hover */
  enableScale: boolean
  /** Scale-Wert auf Hover (z.B. 1.02) */
  hoverScale: number
  /** Spring-Stiffness für Interaktionen */
  springStiffness: number
  /** Spring-Damping für Interaktionen */
  springDamping: number
}

export interface ThemeConfig {
  id: ThemeId
  /** Anzeigename: "Klassisch", "Energetisch", etc. */
  label: string
  /** Kurzbeschreibung für Theme-Picker */
  description: string

  /**
   * CSS Custom Property Werte (als RGB-Triplets für Opacity-Modifier-Kompatibilität).
   * Werden als `data-theme` Attribut auf `<html>` gesetzt.
   * Keys sind CSS-Variable-Namen OHNE `--ff-` Prefix.
   */
  cssVars: Record<string, string>

  /** Font-Konfiguration */
  fonts: {
    /** font-family Stack für Display/Headlines */
    display: string
    /** font-family Stack für Body/UI */
    body: string
    /** Pfade zu WOFF2-Dateien für Preloading */
    preloadFiles: string[]
  }

  /** Framer Motion Animation-Overrides */
  animations: ThemeAnimationConfig

  /** Dunkles Grund-Theme (ganzseitiger dunkler Hintergrund) */
  isDarkTheme: boolean

  /** Vorschau-Farben für Theme-Picker (als Hex) */
  preview: {
    bg: string
    primary: string
    accent: string
  }
}
