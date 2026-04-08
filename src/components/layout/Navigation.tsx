import { useState, useEffect, useRef, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Phone, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'
import { slideOverRight, backdropFade, hamburgerTop, hamburgerMiddle, hamburgerBottom } from '@/lib/animations'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { useTheme } from '@/hooks/useTheme'
import { SITE } from '@/data/content'

// ---------------------------------------------------------------------------
// Nav-Struktur — Option A: Fitness-fokussiert
// ---------------------------------------------------------------------------

interface NavChild {
  label: string
  href: string
  description: string
}

interface NavItem {
  label: string
  href: string
  children?: NavChild[]
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Studio',
    href: '/ueber-uns',
    children: [
      { label: 'Über uns', href: '/ueber-uns', description: 'Was die Fitness Factory ausmacht' },
      { label: 'Team', href: '/team', description: 'Lerne unsere Trainer kennen' },
      { label: 'Galerie', href: '/galerie', description: 'Rundgang durch unser Studio' },
    ],
  },
  {
    label: 'Training',
    href: '/kursplan',
    children: [
      { label: 'Kursplan', href: '/kursplan', description: 'Alle 16 Kurse pro Woche' },
      { label: 'Trainingsberatung', href: '/ueber-uns#leistungen', description: 'Individuelle Betreuung inklusive' },
    ],
  },
  {
    label: 'Mitglied werden',
    href: '/mitgliedschaft',
    children: [
      { label: 'Preise & Mitgliedschaften', href: '/mitgliedschaft', description: 'Unsere Tarife' },
      { label: 'Probetraining', href: '/probetraining', description: 'Kostenlos testen' },
      { label: 'Fremdgeh-Aktion', href: '/fremdgeh-aktion', description: '3 Monate gratis' },
      { label: 'FAQ', href: '/faq', description: 'Häufige Fragen' },
    ],
  },
  {
    label: 'Kontakt',
    href: '/kontakt',
  },
]

// ---------------------------------------------------------------------------
// Dropdown animation
// ---------------------------------------------------------------------------

const dropdownVariants = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.15, ease: 'easeOut' as const } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.1, ease: 'easeIn' as const } },
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface NavigationProps {
  menuOpen: boolean
  onMenuOpenChange: (open: boolean) => void
}

export default function Navigation({ menuOpen, onMenuOpenChange }: NavigationProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null)
  const { scrollY } = useScrollPosition()
  const location = useLocation()
  const { showSwitcher } = useTheme()
  const isScrolled = scrollY > 8
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const closeMenu = () => {
    onMenuOpenChange(false)
    setMobileAccordion(null)
  }

  // Close mobile menu on route change
  useEffect(() => {
    closeMenu()
  }, [location.pathname])

  // Escape key closes menu
  useEffect(() => {
    if (!menuOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null)
  }, [location.pathname])

  // Dropdown hover handlers with delay
  const handleMouseEnter = useCallback((label: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setOpenDropdown(label)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
    }, 150)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky z-40 bg-black transition-[box-shadow,border-color] duration-200',
          showSwitcher ? 'top-12' : 'top-0',
          isScrolled
            ? 'border-b border-brand-dark-border'
            : 'border-b border-transparent'
        )}
        role="banner"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
            aria-label="Fitness Factory Hattingen — Startseite"
            onClick={closeMenu}
          >
            <img
              src="/images/logo-fitness-factory.png"
              alt="Fitness Factory Hattingen"
              className="h-10 md:h-12 w-auto"
              width={160}
              height={48}
            />
          </Link>

          {/* Desktop Navigation — Mega-Menu */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hauptnavigation">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={item.href}
                  className={cn(
                    'inline-flex items-center gap-1 font-body font-medium text-body-sm px-3 py-2 rounded-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                    openDropdown === item.label
                      ? 'text-brand-primary'
                      : 'text-brand-light-secondary hover:text-brand-light'
                  )}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-150',
                        openDropdown === item.label ? 'rotate-180' : ''
                      )}
                      aria-hidden="true"
                    />
                  )}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {item.children && openDropdown === item.label && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute top-full left-0 mt-1 w-[280px] bg-brand-bg border border-brand-border rounded-[6px] shadow-lg py-2"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-3 hover:bg-brand-surface transition-colors duration-150"
                          onClick={() => setOpenDropdown(null)}
                        >
                          <span className="font-display font-bold text-body text-brand-text block">
                            {child.label}
                          </span>
                          <span className="font-body text-body-sm text-brand-muted mt-0.5 block">
                            {child.description}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={SITE.kontakt.telefonLink}
              className="inline-flex items-center gap-2 px-4 py-2 border-2 border-brand-primary text-brand-primary rounded-[4px] font-display font-bold text-body-sm hover:bg-brand-primary hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label={`Jetzt anrufen: ${SITE.kontakt.telefon}`}
            >
              <Phone className="w-4 h-4" />
              Jetzt anrufen
            </a>
            <Link
              to="/probetraining"
              className="font-display font-bold text-body-sm text-white bg-brand-primary px-5 py-2.5 rounded-button hover:bg-brand-primary-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Probetraining buchen
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            className="lg:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
            onClick={() => onMenuOpenChange(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
          >
            <motion.span
              variants={hamburgerTop}
              animate={menuOpen ? 'open' : 'closed'}
              className="block w-5 h-0.5 bg-white origin-center"
            />
            <motion.span
              variants={hamburgerMiddle}
              animate={menuOpen ? 'open' : 'closed'}
              className="block w-5 h-0.5 bg-white origin-center"
            />
            <motion.span
              variants={hamburgerBottom}
              animate={menuOpen ? 'open' : 'closed'}
              className="block w-5 h-0.5 bg-white origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropFade}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed inset-0 z-50 bg-brand-overlay"
              onClick={closeMenu}
              aria-hidden="true"
            />

            {/* Slide-Over Panel */}
            <motion.div
              key="menu"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Navigationsmenü"
              variants={slideOverRight}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-50 w-[min(320px,85vw)] bg-brand-bg border-l border-brand-border flex flex-col"
            >
              {/* Panel Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
                <span className="font-display font-black text-h4 text-brand-text uppercase tracking-tight">
                  Menü
                </span>
                <button
                  type="button"
                  onClick={closeMenu}
                  className="w-9 h-9 flex items-center justify-center text-brand-muted hover:text-brand-text transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                  aria-label="Menü schließen"
                >
                  <X className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>

              {/* Nav Links with Accordions */}
              <nav className="flex-1 px-6 py-6 flex flex-col gap-1 overflow-y-auto" aria-label="Mobile Navigation">
                {NAV_ITEMS.map((item) => (
                  <div key={item.label}>
                    {/* Accordion Toggle */}
                    <button
                      type="button"
                      onClick={() =>
                        setMobileAccordion((prev) =>
                          prev === item.label ? null : item.label
                        )
                      }
                      className={cn(
                        'w-full flex items-center justify-between font-body font-medium text-body-lg py-3 px-3 rounded-card transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary',
                        mobileAccordion === item.label
                          ? 'text-brand-primary bg-brand-primary/5'
                          : 'text-brand-text hover:text-brand-primary hover:bg-brand-surface'
                      )}
                      aria-expanded={mobileAccordion === item.label}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown
                          className={cn(
                            'w-4 h-4 transition-transform duration-200',
                            mobileAccordion === item.label ? 'rotate-180' : ''
                          )}
                          aria-hidden="true"
                        />
                      )}
                    </button>

                    {/* Accordion Children */}
                    <AnimatePresence>
                      {item.children && mobileAccordion === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 pb-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                to={child.href}
                                onClick={closeMenu}
                                className="block py-2.5 px-3 font-body text-body text-brand-muted hover:text-brand-primary transition-colors duration-150 rounded-card"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>

              {/* CTA-Bereich */}
              <div className="px-6 py-6 border-t border-brand-border flex flex-col gap-3">
                <Link
                  to="/probetraining"
                  onClick={closeMenu}
                  className="block w-full text-center font-display font-bold text-body-lg text-white bg-brand-primary py-4 rounded-button hover:bg-brand-primary-hover transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                >
                  Probetraining buchen
                </Link>
                <a
                  href={SITE.kontakt.telefonLink}
                  className="flex items-center justify-center gap-2 w-full text-center font-display font-bold text-body text-brand-primary border-2 border-brand-primary py-3.5 rounded-button hover:bg-brand-primary hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
                >
                  <Phone className="w-4 h-4" />
                  Jetzt anrufen
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
