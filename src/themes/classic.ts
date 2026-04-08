/**
 * Theme "Klassisch" — Aktuelle Design-Variante
 * Bebas Neue + Inter, Rot + Schwarz + Weiß, dezente Animationen.
 * Alle Werte 1:1 aus dem aktuellen tailwind-tokens.ts / index.css.
 */

import type { ThemeConfig } from './types'

export const classicTheme: ThemeConfig = {
  id: 'classic',
  label: 'Klassisch',
  description: 'Clean & professionell — Rot, Schwarz, Weiß',

  cssVars: {
    // Hintergründe
    'bg': '255 255 255',
    'surface': '247 247 247',
    'surface-hover': '240 240 240',
    'border': '229 229 229',
    'border-hover': '204 204 204',

    // Dunkle Flächen (Hero + Footer)
    'dark': '0 0 0',
    'dark-soft': '10 10 10',
    'dark-border': '26 26 26',

    // Primärfarbe: Fitness Factory Rot
    'primary': '199 31 32',
    'primary-hover': '165 25 26',
    'primary-light': '254 240 240',

    // Text
    'text': '0 0 0',
    'text-secondary': '85 85 85',
    'muted': '136 136 136',
    'muted-subtle': '170 170 170',

    // Text dunkel (Hero/Footer)
    'light': '244 243 240',
    'light-secondary': '200 199 196',
    'dark-muted': '138 138 150',

    // Funktionsfarben
    'success': '34 197 94',
    'whatsapp': '37 211 102',
    'error': '239 68 68',

    // Overlay
    'overlay': '0 0 0',

    // Radii
    'radius-button': '4px',
    'radius-card': '6px',
    'radius-card-lg': '8px',
    'radius-input': '4px',
    'radius-badge': '3px',

    // Shadows
    'shadow-card': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)',
    'shadow-card-hover': '0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06)',
    'shadow-soft': '0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    'shadow-nav': '0 1px 0 rgba(0,0,0,0.08)',
    'shadow-bar': '0 -1px 0 rgba(0,0,0,0.08), 0 -4px 16px rgba(0,0,0,0.06)',
    'shadow-dark-card': 'inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 1px rgba(255,255,255,0.06)',
    'shadow-dark-card-hover': 'inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(199,31,32,0.20), 0 8px 32px rgba(0,0,0,0.20)',
    'shadow-whatsapp': '0 2px 12px rgba(37,211,102,0.30), 0 1px 4px rgba(0,0,0,0.15)',
    'shadow-glow': 'none',
  },

  fonts: {
    display: "'Bebas Neue', system-ui, -apple-system, sans-serif",
    body: "'Inter', system-ui, -apple-system, sans-serif",
    preloadFiles: [
      '/fonts/bebas-neue/bebas-neue-400.woff2',
      '/fonts/inter/inter-400.woff2',
    ],
  },

  animations: {
    fadeOffset: 20,
    duration: 1.0,
    staggerDelay: 0.07,
    cardHoverY: 3,
    enableGlow: false,
    enableScale: false,
    hoverScale: 1.0,
    springStiffness: 320,
    springDamping: 32,
  },

  isDarkTheme: false,

  preview: {
    bg: '#FFFFFF',
    primary: '#C71F20',
    accent: '#000000',
  },
}
