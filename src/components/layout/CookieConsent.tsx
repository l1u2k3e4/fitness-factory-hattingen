import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, ChevronDown, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/cn'

// ---------------------------------------------------------------------------
// Typen & Consent-State
// ---------------------------------------------------------------------------

export interface ConsentState {
  necessary: true        // immer aktiv, kann nicht deaktiviert werden
  statistics: boolean    // Google Analytics GA4
  marketing: boolean     // Meta Pixel, Google Ads
}

const COOKIE_NAME = 'ff_consent_v1'
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60 // 1 Jahr in Sekunden

function readCookieConsent(): ConsentState | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]*)`))
  if (!match) return null
  try {
    return JSON.parse(decodeURIComponent(match[1])) as ConsentState
  } catch {
    return null
  }
}

function writeCookieConsent(consent: ConsentState): void {
  const encoded = encodeURIComponent(JSON.stringify(consent))
  document.cookie = `${COOKIE_NAME}=${encoded}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`
  // Event dispatchen damit KontaktSection (Google Maps) reagieren kann
  window.dispatchEvent(new Event('cookie-consent-update'))
}

/**
 * Gibt den aktuell gespeicherten Consent zurück.
 * Kann von GA4-Initialisierung etc. verwendet werden.
 */
export function getConsent(): ConsentState | null {
  return readCookieConsent()
}

// ---------------------------------------------------------------------------
// Google Consent Mode v2 Integration
// ---------------------------------------------------------------------------

function updateGoogleConsentMode(consent: ConsentState) {
  if (typeof window === 'undefined') return
  // @ts-expect-error gtag ist global
  if (typeof window.gtag !== 'function') return

  // @ts-expect-error gtag ist global
  window.gtag('consent', 'update', {
    analytics_storage: consent.statistics ? 'granted' : 'denied',
    ad_storage: consent.marketing ? 'granted' : 'denied',
    ad_user_data: consent.marketing ? 'granted' : 'denied',
    ad_personalization: consent.marketing ? 'granted' : 'denied',
  })
}

// ---------------------------------------------------------------------------
// Sub-Komponente: Toggle-Zeile für eine Kategorie
// ---------------------------------------------------------------------------

interface CategoryToggleProps {
  id: string
  label: string
  description: string
  checked: boolean
  disabled?: boolean
  onChange: (value: boolean) => void
}

function CategoryToggle({
  id,
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: CategoryToggleProps) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5">
      <div className="flex-1">
        <label
          htmlFor={id}
          className={cn(
            'font-body font-semibold text-body-sm block mb-0.5',
            disabled ? 'text-brand-dark-muted cursor-not-allowed' : 'text-brand-light cursor-pointer'
          )}
        >
          {label}
          {disabled && (
            <span className="ml-2 font-body font-normal text-caption text-brand-dark-muted">
              (immer aktiv)
            </span>
          )}
        </label>
        <p className="font-body text-caption text-brand-light-secondary leading-relaxed">{description}</p>
      </div>

      {/* Toggle-Switch */}
      <button
        type="button"
        role="switch"
        id={id}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          'flex-shrink-0 relative w-10 h-6 rounded-full transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark',
          disabled
            ? 'bg-brand-dark-border cursor-not-allowed opacity-60'
            : checked
            ? 'bg-brand-primary cursor-pointer'
            : 'bg-brand-dark-border cursor-pointer hover:bg-white/10'
        )}
      >
        <span
          className={cn(
            'absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200',
            checked ? 'translate-x-5' : 'translate-x-1'
          )}
          aria-hidden="true"
        />
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Haupt-Komponente: CookieConsent
// ---------------------------------------------------------------------------

/**
 * CookieConsent — DSGVO-konformes Cookie-Banner.
 *
 * Kategorien:
 * - Notwendig: immer aktiv, nicht deaktivierbar
 * - Statistik: GA4 Analytics (Google Consent Mode v2)
 * - Marketing: Meta Pixel, Google Ads
 *
 * Entscheidung wird in Cookie gespeichert.
 * Google Consent Mode v2 wird bei Änderung aktualisiert.
 * Erscheint NICHT wenn bereits eine Entscheidung getroffen wurde.
 *
 * Barrierefreiheit:
 * - role="dialog" + aria-modal
 * - aria-labelledby
 * - Keyboard: Tab-Navigation, Escape schließt (nur "Nur Notwendige")
 */
interface CookieConsentProps {
  onVisibilityChange?: (visible: boolean) => void
}

export default function CookieConsent({ onVisibilityChange }: CookieConsentProps = {}) {
  const [visible, setVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [consent, setConsent] = useState<ConsentState>({
    necessary: true,
    statistics: false,
    marketing: false,
  })

  useEffect(() => {
    const saved = readCookieConsent()
    if (!saved) {
      setVisible(true)
      return
    }
    // Consent vorhanden → Google Consent Mode aktualisieren
    updateGoogleConsentMode(saved)
  }, [])

  useEffect(() => {
    onVisibilityChange?.(visible)
  }, [visible, onVisibilityChange])

  // Escape-Taste schließt Banner mit "Nur Notwendige" (Accessibility)
  useEffect(() => {
    if (!visible) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') acceptNecessary()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [visible])

  const acceptAll = () => {
    const full: ConsentState = { necessary: true, statistics: true, marketing: true }
    writeCookieConsent(full)
    updateGoogleConsentMode(full)
    setVisible(false)
  }

  const acceptNecessary = () => {
    const minimal: ConsentState = { necessary: true, statistics: false, marketing: false }
    writeCookieConsent(minimal)
    updateGoogleConsentMode(minimal)
    setVisible(false)
  }

  const saveSelection = () => {
    writeCookieConsent(consent)
    updateGoogleConsentMode(consent)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 28, mass: 0.9 }}
          className={cn(
            // Position: ganz unten links — Mobile am Viewport-Boden, Desktop ebenfalls bottom-left
            'fixed z-[60]',
            'left-3 right-3 sm:right-auto sm:left-4',
            'bottom-[calc(0.4rem+env(safe-area-inset-bottom))] sm:bottom-4',
            // Kompakte Card
            'w-auto max-w-[360px] sm:max-w-[400px]',
            // Dark-Theme konsistent (unabhängig vom Energetisch-Theme)
            'bg-brand-dark border border-brand-dark-border',
            'shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
            'rounded-card-lg',
            'py-3 px-4 sm:p-5'
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2.5">
              <Cookie
                className="w-5 h-5 text-brand-primary flex-shrink-0"
                aria-hidden="true"
              />
              <h2
                id="cookie-consent-title"
                className="font-display font-bold text-body text-brand-light leading-tight"
              >
                Cookies &amp; Datenschutz
              </h2>
            </div>

            {/* Nur Notwendige via X (schnelle Ablehnung) */}
            <button
              type="button"
              onClick={acceptNecessary}
              aria-label="Nur notwendige Cookies akzeptieren und schließen"
              className="w-7 h-7 flex items-center justify-center rounded-lg text-brand-dark-muted hover:text-brand-light hover:bg-white/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary flex-shrink-0"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>

          {/* Beschreibung */}
          <p className="font-body text-caption text-brand-light-secondary leading-relaxed mb-3">
            Wir nutzen Cookies, um die Website zu verbessern.{' '}
            <Link
              to="/datenschutz"
              className="text-brand-primary hover:text-brand-primary-hover underline underline-offset-2 transition-colors duration-150"
            >
              Datenschutz
            </Link>
          </p>

          {/* Detailansicht: Kategorien */}
          <AnimatePresence initial={false}>
            {showDetails && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ overflow: 'hidden' }}
              >
                <div className="border-t border-brand-dark-border mb-4 divide-y divide-brand-dark-border">
                  <CategoryToggle
                    id="consent-necessary"
                    label="Notwendig"
                    description="Session-Cookies, CSRF-Schutz, Cookie-Consent-Speicherung. Ohne diese Cookies funktioniert die Website nicht."
                    checked={true}
                    disabled={true}
                    onChange={() => {}}
                  />
                  <CategoryToggle
                    id="consent-statistics"
                    label="Statistik"
                    description="Google Analytics 4 — anonymisierte Nutzungsstatistiken helfen uns, die Website zu verbessern."
                    checked={consent.statistics}
                    onChange={(v) => setConsent((prev) => ({ ...prev, statistics: v }))}
                  />
                  <CategoryToggle
                    id="consent-marketing"
                    label="Marketing"
                    description="Meta Pixel, Google Ads — ermöglicht relevante Werbung auf externen Plattformen."
                    checked={consent.marketing}
                    onChange={(v) => setConsent((prev) => ({ ...prev, marketing: v }))}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Aktions-Buttons */}
          <div className="flex flex-col gap-2">
            {/* Alle akzeptieren — Primär-CTA */}
            <button
              type="button"
              onClick={acceptAll}
              className={cn(
                'w-full py-2.5 px-4 rounded-button',
                'font-display font-bold text-body-sm text-white',
                'bg-brand-primary hover:bg-brand-primary-hover',
                'transition-colors duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark'
              )}
            >
              Alle akzeptieren
            </button>

            {/* Untere Zeile: Details + Nur Notwendige */}
            <div className="flex items-center gap-2">
              {/* Einstellungen / Auswahl speichern */}
              {showDetails ? (
                <button
                  type="button"
                  onClick={saveSelection}
                  className={cn(
                    'flex-1 py-2 px-3 rounded-button text-center',
                    'font-body font-medium text-caption text-brand-light',
                    'border border-brand-primary/40 hover:border-brand-primary hover:bg-brand-primary/10',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
                  )}
                >
                  Auswahl speichern
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowDetails(true)}
                  aria-expanded={showDetails}
                  aria-controls="cookie-details"
                  className={cn(
                    'flex-1 py-2 px-3 rounded-button flex items-center justify-center gap-1.5',
                    'font-body font-medium text-caption text-brand-light-secondary hover:text-brand-light',
                    'border border-brand-dark-border hover:border-white/30 hover:bg-white/5',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
                  )}
                >
                  Einstellungen
                  {showDetails ? (
                    <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                  )}
                </button>
              )}

              {/* Nur Notwendige */}
              <button
                type="button"
                onClick={acceptNecessary}
                className={cn(
                  'flex-1 py-2 px-3 rounded-button text-center',
                  'font-body font-medium text-caption text-brand-light-secondary hover:text-brand-light',
                  'border border-brand-dark-border hover:border-white/30 hover:bg-white/5',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary'
                )}
              >
                Nur Notwendige
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
