/**
 * Theme "Energetisch V2" — Helle Variante
 * Barlow Condensed + Plus Jakarta Sans, weißer Hintergrund, schwarze Schrift, Rot-Akzente.
 */

import type { ThemeConfig } from './types'

export const energeticV2Theme: ThemeConfig = {
  id: 'energetic-v2',
  label: 'Energetisch V2',
  description: 'Barlow + Jakarta — Hell, Clean, Rot-Akzente',

  cssVars: {
    // Hintergründe — hell/weiß
    'bg': '255 255 255',
    'surface': '248 248 248',
    'surface-hover': '240 240 240',
    'border': '225 225 225',
    'border-hover': '200 200 200',

    // Dunkle Flächen (Hero + Footer — bleiben dunkel)
    'dark': '5 5 5',
    'dark-soft': '15 15 15',
    'dark-border': '35 35 35',

    // Primärfarbe: Neon-Rot (identisch mit Energetisch)
    'primary': '255 26 26',
    'primary-hover': '255 60 60',
    'primary-light': '255 240 240',

    // Text — dunkel auf hell
    'text': '15 15 15',
    'text-secondary': '60 60 60',
    'muted': '120 120 120',
    'muted-subtle': '170 170 170',

    // Text auf dunklen Flächen (Hero/Footer)
    'light': '244 243 240',
    'light-secondary': '200 199 196',
    'dark-muted': '138 138 150',

    // Funktionsfarben
    'success': '34 197 94',
    'whatsapp': '37 211 102',
    'error': '239 68 68',

    // Overlay
    'overlay': '0 0 0',

    // Radii — identisch mit Energetisch
    'radius-button': '8px',
    'radius-card': '12px',
    'radius-card-lg': '16px',
    'radius-input': '8px',
    'radius-badge': '4px',

    // Shadows — klassisch statt Glow (passend für hellen Hintergrund)
    'shadow-card': '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    'shadow-card-hover': '0 10px 30px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
    'shadow-soft': '0 1px 2px rgba(0,0,0,0.04)',
    'shadow-nav': '0 1px 3px rgba(0,0,0,0.06)',
    'shadow-bar': '0 -1px 3px rgba(0,0,0,0.06)',
    'shadow-dark-card': '0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
    'shadow-dark-card-hover': '0 0 0 1px rgba(255,26,26,0.30), 0 0 24px rgba(255,26,26,0.15), 0 8px 32px rgba(0,0,0,0.30)',
    'shadow-whatsapp': '0 4px 16px rgba(37,211,102,0.25), 0 2px 8px rgba(0,0,0,0.10)',
    'shadow-glow': '0 4px 20px rgba(255,26,26,0.15)',
  },

  fonts: {
    display: "'Barlow Condensed', system-ui, -apple-system, sans-serif",
    body: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
    preloadFiles: [
      '/fonts/barlow-condensed/barlow-condensed-700.woff2',
      '/fonts/plus-jakarta-sans/plus-jakarta-sans-400.woff2',
    ],
  },

  animations: {
    fadeOffset: 40,
    duration: 1.2,
    staggerDelay: 0.08,
    cardHoverY: 6,
    enableGlow: false,
    enableScale: true,
    hoverScale: 1.02,
    springStiffness: 400,
    springDamping: 28,
  },

  isDarkTheme: false,

  preview: {
    bg: '#FFFFFF',
    primary: '#FF1A1A',
    accent: '#0A0A0A',
  },
}
