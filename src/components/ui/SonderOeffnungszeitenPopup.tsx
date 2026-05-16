import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock } from 'lucide-react'
import {
  useDynamicSonderOeffnungszeiten,
} from '@/contexts/ContentContext'
import type { SonderEintrag } from '@/lib/contentLoader'

const TICK_INTERVAL_MS = 60_000

const TAGES_FORMATTER = new Intl.DateTimeFormat('de-DE', {
  day: '2-digit',
  month: '2-digit',
})

function startOfDay(d: Date): Date {
  const copy = new Date(d)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function parseDatum(datumStr: string): Date | null {
  if (!datumStr) return null
  const d = new Date(`${datumStr}T00:00:00`)
  return isNaN(d.getTime()) ? null : d
}

function istAktiv(eintrag: SonderEintrag, jetzt: Date): boolean {
  if (!eintrag.bannerAktiv) return false
  const eventDatum = parseDatum(eintrag.datum)
  if (!eventDatum) return false

  const zweiTageVorher = new Date(eventDatum)
  zweiTageVorher.setDate(zweiTageVorher.getDate() - 2)

  const endeDesTages = new Date(eventDatum)
  endeDesTages.setDate(endeDesTages.getDate() + 1)

  return jetzt >= zweiTageVorher && jetzt < endeDesTages
}

function getTagLabel(datumStr: string, jetzt: Date): string {
  const eventTag = parseDatum(datumStr)
  if (!eventTag) return ''

  const heute = startOfDay(jetzt)
  const eventStart = startOfDay(eventTag)
  const diffTage = Math.round(
    (eventStart.getTime() - heute.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffTage <= 0) return 'Heute'
  if (diffTage === 1) return 'Morgen'
  if (diffTage === 2) return 'In 2 Tagen'
  return `Am ${TAGES_FORMATTER.format(eventTag)}`
}

function getZeitenLabel(eintrag: SonderEintrag): string {
  if (eintrag.geschlossen) return 'Geschlossen'
  if (!eintrag.oeffnung || !eintrag.schliessung) return 'Geänderte Öffnungszeiten'
  return `${eintrag.oeffnung} – ${eintrag.schliessung} Uhr`
}

const DEMO_EINTRAG: SonderEintrag = {
  id: 'demo',
  datum: new Date().toISOString().split('T')[0],
  anlass: 'Karfreitag (Demo)',
  oeffnung: '10:00',
  schliessung: '14:00',
  geschlossen: false,
  bannerAktiv: true,
}

export default function SonderOeffnungszeitenPopup() {
  const eintraege = useDynamicSonderOeffnungszeiten()
  const [demoModus, setDemoModus] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [jetzt, setJetzt] = useState(() => new Date())
  const popupRef = useRef<HTMLDivElement | null>(null)

  // Minütliches Re-Check, damit das Pop-Up zur richtigen Tageszeit verschwindet
  useEffect(() => {
    const id = setInterval(() => setJetzt(new Date()), TICK_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  // Tastenkürzel: Cmd+0 / Ctrl+0 — Demo-Modus toggeln
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey
      if (isMeta && e.key === '0') {
        e.preventDefault()
        setDemoModus((prev) => !prev)
        setDismissed(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const aktive = useMemo<SonderEintrag[]>(() => {
    if (demoModus) return [DEMO_EINTRAG]
    return eintraege.filter((e) => istAktiv(e, jetzt))
  }, [eintraege, jetzt, demoModus])

  const istSichtbar = !dismissed && aktive.length > 0

  // CSS-Variable für Header-Offset setzen — Höhe dynamisch via ResizeObserver,
  // damit der Sticky-Header pixelgenau unter dem Banner sitzt (keine Lücke).
  useEffect(() => {
    const root = document.documentElement
    if (!istSichtbar || !popupRef.current) {
      root.style.setProperty('--popup-height', '0px')
      delete root.dataset.sonderPopup
      return
    }

    root.dataset.sonderPopup = 'visible'
    const el = popupRef.current
    const updateHeight = () => {
      root.style.setProperty('--popup-height', `${el.offsetHeight}px`)
    }
    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(el)

    return () => {
      observer.disconnect()
      root.style.setProperty('--popup-height', '0px')
      delete root.dataset.sonderPopup
    }
  }, [istSichtbar, aktive.length])

  const handleDismiss = useCallback(() => {
    setDismissed(true)
    setDemoModus(false)
  }, [])

  return (
    <AnimatePresence>
      {istSichtbar && (
        <motion.div
          ref={popupRef}
          key="sonder-popup"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 right-0 z-[9999] bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white shadow-2xl"
          role="status"
          aria-live="polite"
        >
          <div className="max-w-5xl mx-auto px-4 py-1.5 flex items-center justify-between gap-4">
            <div className="flex-shrink-0">
              <Clock className="w-6 h-6" aria-hidden="true" />
            </div>

            <div className="flex-1 text-center">
              {aktive.map((eintrag, i) => (
                <div
                  key={eintrag.id}
                  className={i > 0 ? 'mt-1 pt-1 border-t border-white/20' : ''}
                >
                  <p className="font-bold text-sm md:text-base leading-tight">
                    <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs mr-2 align-middle">
                      {getTagLabel(eintrag.datum, jetzt)}
                    </span>
                    <span className="align-middle">{eintrag.anlass}</span>
                  </p>
                  <p className="text-white/90 text-xs md:text-sm leading-tight">
                    Geänderte Öffnungszeiten: {getZeitenLabel(eintrag)}
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Hinweis schließen"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
