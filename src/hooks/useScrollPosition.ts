import { useState, useEffect, useRef } from 'react'

/**
 * useIsScrolled — Boolean-Hook für Scroll-Threshold.
 * Feuert setState NUR beim Überschreiten der Schwelle (nicht bei jedem Scroll-Pixel).
 *
 * Pattern: rAF-ticking, passive listener.
 * Ergebnis: 1 Re-Render pro Scroll-Session statt 60/Sek.
 *
 * Verwendung:
 *   const isScrolled = useIsScrolled(8)  // true wenn scrollY > 8
 */
export function useIsScrolled(threshold = 8): boolean {
  const [isScrolled, setIsScrolled] = useState(false)
  const isScrolledRef = useRef(false)

  useEffect(() => {
    let ticking = false
    let rafId = 0

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      rafId = requestAnimationFrame(() => {
        const next = window.scrollY > threshold
        if (isScrolledRef.current !== next) {
          isScrolledRef.current = next
          setIsScrolled(next)
        }
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialwert setzen

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isScrolled
}
