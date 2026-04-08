/**
 * Theme "Energetisch" — McFit/FitX-inspiriert
 * Barlow Condensed + Plus Jakarta Sans, dunkler Hintergrund, Neon-Rot, Glow.
 */

import type { ThemeConfig } from './types'

export const energeticTheme: ThemeConfig = {
  id: 'energetic',
  label: 'Energetisch',
  description: 'McFit/FitX-Style — Dunkel, Neon, Glow-Effekte',

  cssVars: {
    // Hintergründe — tiefes Schwarz
    'bg': '10 10 10',
    'surface': '20 20 20',
    'surface-hover': '30 30 30',
    'border': '45 45 45',
    'border-hover': '65 65 65',

    // Dunkle Flächen (Hero + Footer — noch dunkler)
    'dark': '5 5 5',
    'dark-soft': '15 15 15',
    'dark-border': '35 35 35',

    // Primärfarbe: Neon-Rot
    'primary': '255 26 26',
    'primary-hover': '255 60 60',
    'primary-light': '40 10 10',

    // Text — hell auf dunkel
    'text': '244 243 240',
    'text-secondary': '180 180 185',
    'muted': '120 120 130',
    'muted-subtle': '80 80 90',

    // Text dunkel (Hero/Footer — gleich wie Haupttext bei Dark Theme)
    'light': '244 243 240',
    'light-secondary': '200 199 196',
    'dark-muted': '138 138 150',

    // Funktionsfarben
    'success': '34 197 94',
    'whatsapp': '37 211 102',
    'error': '239 68 68',

    // Overlay
    'overlay': '0 0 0',

    // Radii — etwas runder
    'radius-button': '8px',
    'radius-card': '12px',
    'radius-card-lg': '16px',
    'radius-input': '8px',
    'radius-badge': '4px',

    // Shadows — Glow-basiert
    'shadow-card': '0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
    'shadow-card-hover': '0 0 0 1px rgba(255,26,26,0.25), 0 0 20px rgba(255,26,26,0.10), 0 8px 32px rgba(0,0,0,0.30)',
    'shadow-soft': '0 0 0 1px rgba(255,255,255,0.04)',
    'shadow-nav': '0 1px 0 rgba(255,255,255,0.06)',
    'shadow-bar': '0 -1px 0 rgba(255,255,255,0.06)',
    'shadow-dark-card': '0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.04)',
    'shadow-dark-card-hover': '0 0 0 1px rgba(255,26,26,0.30), 0 0 24px rgba(255,26,26,0.15), 0 8px 32px rgba(0,0,0,0.30)',
    'shadow-whatsapp': '0 0 16px rgba(37,211,102,0.40), 0 2px 8px rgba(0,0,0,0.30)',
    'shadow-glow': '0 0 20px rgba(255,26,26,0.30)',
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
    enableGlow: true,
    enableScale: true,
    hoverScale: 1.02,
    springStiffness: 400,
    springDamping: 28,
  },

  isDarkTheme: true,

  preview: {
    bg: '#0A0A0A',
    primary: '#FF1A1A',
    accent: '#00E5FF',
  },
}
