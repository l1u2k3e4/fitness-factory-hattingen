import { useState, useEffect } from 'react'

/**
 * Gibt die aktuelle Scroll-Position zurück.
 * Wird für Sticky Nav (scrolled state) und StickyCtaBar (nach 30% Scroll) verwendet.
 */
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollPercent, setScrollPercent] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight > 0) {
        setScrollPercent(Math.round((currentScrollY / docHeight) * 100))
      }
    }

    // Passive listener für Performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialwert setzen

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return { scrollY, scrollPercent }
}
