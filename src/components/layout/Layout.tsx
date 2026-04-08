import { Outlet, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import AnnouncementBanner from './AnnouncementBanner'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import StickyCtaBar from './StickyCtaBar'
import CookieConsent from './CookieConsent'
import ThemeSwitcher from '@/components/ui/ThemeSwitcher'
import { useTheme } from '@/hooks/useTheme'
import { trackPageView } from '@/lib/analytics'

/**
 * Layout — Wrapper für alle Seiten.
 * Enthält: Navigation, <main>, Footer, WhatsApp-Button, StickyCtaBar.
 * Scroll-to-top bei Routenwechsel.
 */
export default function Layout() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const { showSwitcher } = useTheme()

  // Scroll to top + track page view on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    trackPageView(pathname)
  }, [pathname])

  return (
    <div className={`min-h-screen bg-brand-bg text-brand-text flex flex-col ${showSwitcher ? 'pt-12' : ''}`}>
      {/* Theme-Switcher — nur sichtbar im Dev-Modus oder mit ?showThemes */}
      <ThemeSwitcher />

      {/* Skip to content — Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-white focus:font-body focus:font-semibold focus:text-body focus:rounded-button"
      >
        Zum Hauptinhalt springen
      </a>

      <AnnouncementBanner />
      <Navigation menuOpen={menuOpen} onMenuOpenChange={setMenuOpen} />

      <main
        id="main-content"
        className="flex-1"
        tabIndex={-1}
      >
        <Outlet />
      </main>

      <Footer />
      <WhatsAppButton />
      <StickyCtaBar hidden={menuOpen} />
      <CookieConsent />
    </div>
  )
}
