import { useState, useEffect } from 'react'

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

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > threshold)
        ticking = false
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialwert setzen

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isScrolled
}
