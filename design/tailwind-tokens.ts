/**
 * Design Tokens — Fitness Factory Hattingen
 * Theme-System: Alle Farben referenzieren CSS Custom Properties (--ff-*).
 * Die konkreten Werte werden via ThemeContext/data-theme gesetzt.
 * Classic-Theme-Defaults liegen als Fallback in index.css :root.
 */

import type { Config } from 'tailwindcss'

export const designTokens: Partial<Config['theme']> = {
  colors: {
    brand: {
      // --- Seiten-Hintergruende ---
      bg: 'rgb(var(--ff-bg) / <alpha-value>)',
      surface: 'rgb(var(--ff-surface) / <alpha-value>)',
      'surface-hover': 'rgb(var(--ff-surface-hover) / <alpha-value>)',
      border: 'rgb(var(--ff-border) / <alpha-value>)',
      'border-hover': 'rgb(var(--ff-border-hover) / <alpha-value>)',

      // --- Dunkle Flaechen (Hero + Footer + Navigation) ---
      dark: 'rgb(var(--ff-dark) / <alpha-value>)',
      'dark-soft': 'rgb(var(--ff-dark-soft) / <alpha-value>)',
      'dark-border': 'rgb(var(--ff-dark-border) / <alpha-value>)',

      // --- Primaerfarbe: Fitness Factory Rot ---
      primary: 'rgb(var(--ff-primary) / <alpha-value>)',
      'primary-hover': 'rgb(var(--ff-primary-hover) / <alpha-value>)',
      'primary-light': 'rgb(var(--ff-primary-light) / <alpha-value>)',

      // --- Text ---
      text: 'rgb(var(--ff-text) / <alpha-value>)',
      'text-secondary': 'rgb(var(--ff-text-secondary) / <alpha-value>)',
      muted: 'rgb(var(--ff-muted) / <alpha-value>)',
      'muted-subtle': 'rgb(var(--ff-muted-subtle) / <alpha-value>)',

      // --- Text dunkel (fuer Hero/Footer) ---
      light: 'rgb(var(--ff-light) / <alpha-value>)',
      'light-secondary': 'rgb(var(--ff-light-secondary) / <alpha-value>)',
      'dark-muted': 'rgb(var(--ff-dark-muted) / <alpha-value>)',

      // --- Funktionsfarben ---
      success: 'rgb(var(--ff-success) / <alpha-value>)',
      whatsapp: 'rgb(var(--ff-whatsapp) / <alpha-value>)',
      error: 'rgb(var(--ff-error) / <alpha-value>)',
      overlay: 'rgb(var(--ff-overlay) / 0.75)',
    },
  },

  fontFamily: {
    display: ['var(--ff-font-display)'],
    body: ['var(--ff-font-body)'],
  },

  fontSize: {
    'display-xl': [
      'clamp(2.5rem, 5vw + 1rem, 5rem)',
      { lineHeight: '1.0', letterSpacing: '-0.02em' },
    ],
    'display': [
      'clamp(2rem, 4vw + 0.5rem, 4rem)',
      { lineHeight: '1.0', letterSpacing: '-0.02em' },
    ],
    'h1': [
      'clamp(1.875rem, 3.5vw + 0.5rem, 3.5rem)',
      { lineHeight: '1.05', letterSpacing: '-0.02em' },
    ],
    'h2': [
      'clamp(1.5rem, 2.5vw + 0.5rem, 2.5rem)',
      { lineHeight: '1.1', letterSpacing: '-0.01em' },
    ],
    'h3': [
      'clamp(1.25rem, 2vw + 0.25rem, 1.875rem)',
      { lineHeight: '1.15', letterSpacing: '-0.01em' },
    ],
    'h4': [
      'clamp(1.125rem, 1.5vw + 0.25rem, 1.5rem)',
      { lineHeight: '1.2', letterSpacing: '0' },
    ],
    'body-lg': [
      'clamp(1.0625rem, 1vw + 0.5rem, 1.125rem)',
      { lineHeight: '1.65', letterSpacing: '0' },
    ],
    'body': [
      'clamp(1rem, 0.5vw + 0.75rem, 1.0625rem)',
      { lineHeight: '1.6', letterSpacing: '0' },
    ],
    'body-sm': [
      'clamp(0.875rem, 0.5vw + 0.5rem, 0.9375rem)',
      { lineHeight: '1.5', letterSpacing: '0' },
    ],
    'caption': [
      'clamp(0.75rem, 0.5vw + 0.25rem, 0.8125rem)',
      { lineHeight: '1.4', letterSpacing: '0.01em' },
    ],
    'eyebrow': [
      '0.6875rem',
      { lineHeight: '1.4', letterSpacing: '0.15em' },
    ],
  },

  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
    '4xl': '6rem',
    '5xl': '7.5rem',
    section: 'clamp(4rem, 8vw, 7.5rem)',
  },

  maxWidth: {
    container: '1280px',
  },

  borderRadius: {
    button: 'var(--ff-radius-button)',
    card: 'var(--ff-radius-card)',
    'card-lg': 'var(--ff-radius-card-lg)',
    input: 'var(--ff-radius-input)',
    badge: 'var(--ff-radius-badge)',
  },

  boxShadow: {
    'card': 'var(--ff-shadow-card)',
    'card-hover': 'var(--ff-shadow-card-hover)',
    'soft': 'var(--ff-shadow-soft)',
    'nav': 'var(--ff-shadow-nav)',
    'bar': 'var(--ff-shadow-bar)',
    'dark-card': 'var(--ff-shadow-dark-card)',
    'dark-card-hover': 'var(--ff-shadow-dark-card-hover)',
    'whatsapp': 'var(--ff-shadow-whatsapp)',
    'glow': 'var(--ff-shadow-glow)',
  },

  keyframes: {
    'float': {
      '0%, 100%': { transform: 'translateY(0px)' },
      '50%': { transform: 'translateY(-6px)' },
    },
    'bounce-subtle': {
      '0%, 100%': { transform: 'translateY(0)' },
      '50%': { transform: 'translateY(6px)' },
    },
    'shimmer': {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
    'ping-green': {
      '75%, 100%': { transform: 'scale(2)', opacity: '0' },
    },
    'count-up': {
      from: { opacity: '0', transform: 'translateY(6px)' },
      to: { opacity: '1', transform: 'translateY(0)' },
    },
    'fade-in': {
      from: { opacity: '0' },
      to: { opacity: '1' },
    },
    'marquee': {
      '0%': { transform: 'translate3d(0, 0, 0)' },
      '100%': { transform: 'translate3d(-50%, 0, 0)' },
    },
  },

  animation: {
    'float': 'float 6s ease-in-out infinite',
    'bounce-subtle': 'bounce-subtle 1.8s ease-in-out infinite',
    'shimmer': 'shimmer 2s linear infinite',
    'ping-green': 'ping-green 1.5s cubic-bezier(0,0,0.2,1) infinite',
    'count-up': 'count-up 0.4s ease-out forwards',
    'fade-in': 'fade-in 0.4s ease-out forwards',
    'marquee': 'marquee 15s linear infinite',
  },

  backdropBlur: {
    nav: '16px',
    modal: '20px',
  },
}
