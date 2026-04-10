/**
 * animations.ts — Framer Motion Presets
 * CI: Dezente Animationen — kurz (0.4s), subtil (20px), professionell.
 * Kein Bounce, kein Glow-Pulse, kein übertriebenes Scaling.
 *
 * Mobile: Scroll-Animationen deaktiviert (isMobile < 1024px).
 * User-initiated Animationen (Hover, Tap, Hamburger) bleiben aktiv.
 */

// Mobile-Erkennung — einmalig bei Import evaluiert (kein Re-Render)
const isMobile =
  typeof window !== 'undefined' && window.innerWidth < 1024

// No-Animation Preset — Element sofort sichtbar
const noAnim = {
  initial: {},
  animate: {},
  transition: { duration: 0 },
}

const noStagger = {
  initial: {},
  animate: {},
}

export const transition = {
  default: {
    duration: 0.4,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  },
  fast: {
    duration: 0.2,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  },
  slow: {
    duration: 0.6,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  },
  spring: {
    type: 'spring' as const,
    stiffness: 320,
    damping: 32,
    mass: 1,
  },
  springMenu: {
    type: 'spring' as const,
    stiffness: 280,
    damping: 28,
    mass: 0.9,
  },
  springBouncy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 28,
    mass: 0.8,
  },
}

// Scroll-triggered Einblende-Animationen (20px Offset — dezent, professionell)
// Auf Mobile deaktiviert — Inhalte sofort sichtbar, kein Ruckeln.
export const fadeInUp = isMobile
  ? noAnim
  : {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: transition.default,
    }

export const fadeInLeft = isMobile
  ? noAnim
  : {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      transition: transition.default,
    }

export const fadeInRight = isMobile
  ? noAnim
  : {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      transition: transition.default,
    }

export const fadeIn = isMobile
  ? noAnim
  : {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: transition.default,
    }

export const scaleIn = isMobile
  ? noAnim
  : {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      transition: transition.default,
    }

// Stagger-Container für Listen
export const staggerContainer = isMobile
  ? noStagger
  : {
      initial: {},
      animate: {
        transition: {
          staggerChildren: 0.07,
          delayChildren: 0.05,
        },
      },
    }

export const staggerContainerFast = isMobile
  ? noStagger
  : {
      initial: {},
      animate: {
        transition: {
          staggerChildren: 0.04,
          delayChildren: 0.02,
        },
      },
    }

// Counter-Animation
export const counterConfig = {
  duration: 2.0,
  ease: 'easeOut' as const,
}

// Hamburger-Menü Morphing
export const hamburgerTop = {
  closed: { rotate: 0, translateY: 0 },
  open: { rotate: 45, translateY: 7 },
}

export const hamburgerMiddle = {
  closed: { opacity: 1 },
  open: { opacity: 0, scaleX: 0.5 },
}

export const hamburgerBottom = {
  closed: { rotate: 0, translateY: 0 },
  open: { rotate: -45, translateY: -7 },
}

// Nav-Menü Slide-Over von rechts
export const slideOverRight = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '100%', opacity: 0 },
  transition: transition.springMenu,
}

// Backdrop-Overlay
export const backdropFade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: transition.fast,
}

// FAQ Accordion
export const accordionContent = {
  initial: { height: 0, opacity: 0 },
  animate: { height: 'auto', opacity: 1 },
  exit: { height: 0, opacity: 0 },
  transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
}

// Sticky CTA Bar
export const stickyBarReveal = {
  initial: { y: 80, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 80, opacity: 0 },
  transition: transition.spring,
}

// Button Hover/Tap (kein Scale-up — CI verlangt professionelle Zurückhaltung)
export const glowButtonHover = {
  scale: 1.0,
  transition: transition.fast,
}

export const glowButtonTap = {
  scale: 0.98,
  transition: { duration: 0.1 },
}

// Card Hover — subtiles Anheben (3px)
export const cardHover = {
  y: -3,
  transition: transition.spring,
}

// Scroll-Indicator (Hero) — auf Mobile deaktiviert
export const scrollBounce = isMobile
  ? {}
  : {
      y: [0, 6, 0],
      transition: {
        duration: 2.0,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    }

// prefers-reduced-motion Fallback
export const reducedMotionVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.1 },
}

// ---------------------------------------------------------------------------
// Theme-parametrisierte Animationen
// ---------------------------------------------------------------------------

import type { ThemeAnimationConfig } from '@/themes/types'

const easeOut = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]

/**
 * Erzeugt theme-spezifische Framer-Motion-Varianten.
 * Classic-Werte sind identisch mit den obigen Exports.
 */
export function getThemeAnimations(config: ThemeAnimationConfig) {
  const baseDuration = 0.4 * config.duration

  // Interaction-Varianten bleiben auf Mobile aktiv (user-initiated)
  const interactionVariants = {
    cardHover: {
      y: -config.cardHoverY,
      scale: config.enableScale ? config.hoverScale : 1.0,
      transition: {
        type: 'spring' as const,
        stiffness: config.springStiffness,
        damping: config.springDamping,
      },
    },
    buttonHover: {
      scale: config.enableScale ? config.hoverScale : 1.0,
      transition: { duration: 0.2, ease: easeOut },
    },
    buttonTap: {
      scale: 0.97,
      transition: { duration: 0.1 },
    },
  }

  if (isMobile) {
    return {
      fadeInUp: noAnim,
      fadeInLeft: noAnim,
      fadeInRight: noAnim,
      staggerContainer: noStagger,
      ...interactionVariants,
    }
  }

  return {
    fadeInUp: {
      initial: { opacity: 0, y: config.fadeOffset },
      animate: { opacity: 1, y: 0 },
      transition: { duration: baseDuration, ease: easeOut },
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -config.fadeOffset },
      animate: { opacity: 1, x: 0 },
      transition: { duration: baseDuration, ease: easeOut },
    },
    fadeInRight: {
      initial: { opacity: 0, x: config.fadeOffset },
      animate: { opacity: 1, x: 0 },
      transition: { duration: baseDuration, ease: easeOut },
    },
    staggerContainer: {
      initial: {},
      animate: {
        transition: {
          staggerChildren: config.staggerDelay,
          delayChildren: config.staggerDelay * 0.7,
        },
      },
    },
    ...interactionVariants,
  }
}
