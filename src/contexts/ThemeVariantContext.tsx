/**
 * ThemeVariantContext — Versteckte Design-Varianten per Tastenkürzel.
 *
 * Geheime Shortcuts (nicht in der UI sichtbar, nur für Kunden-Demos):
 *   Cmd/Ctrl + 5 → Klassisch (Default)
 *   Cmd/Ctrl + 6 → Energetisch (höherer Kontrast, kräftigeres Rot)
 *   Cmd/Ctrl + 7 → Energetisch V2 (Gradient-Akzente, dezenter Glow)
 *
 * Wirkung: setzt `data-variant` auf <html>; CSS in index.css überschreibt die
 * relevanten --ff-* Tokens für diesen Scope. Wird NICHT persistiert.
 */

import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export type DesignVariant = 'klassisch' | 'energetisch' | 'energetisch-v2'

interface ThemeVariantContextValue {
  variant: DesignVariant
  setVariant: (v: DesignVariant) => void
}

const ThemeVariantContext = createContext<ThemeVariantContextValue>({
  variant: 'klassisch',
  setVariant: () => {},
})

export const useThemeVariant = () => useContext(ThemeVariantContext)

const VARIANT_LABELS: Record<DesignVariant, string> = {
  klassisch: 'Klassisch',
  energetisch: 'Energetisch',
  'energetisch-v2': 'Energetisch V2',
}

export function ThemeVariantProvider({ children }: { children: ReactNode }) {
  const [variant, setVariant] = useState<DesignVariant>('klassisch')
  const [toastKey, setToastKey] = useState(0)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMeta = e.metaKey || e.ctrlKey
      if (!isMeta) return

      let next: DesignVariant | null = null
      if (e.key === '5') next = 'klassisch'
      else if (e.key === '6') next = 'energetisch'
      else if (e.key === '7') next = 'energetisch-v2'

      if (next) {
        e.preventDefault()
        setVariant(next)
        setToastKey((k) => k + 1)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-variant', variant)
  }, [variant])

  return (
    <ThemeVariantContext.Provider value={{ variant, setVariant }}>
      {children}
      <AnimatePresence>
        {toastKey > 0 && (
          <VariantToast key={toastKey} label={VARIANT_LABELS[variant]} />
        )}
      </AnimatePresence>
    </ThemeVariantContext.Provider>
  )
}

function VariantToast({ label }: { label: string }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000)
    return () => clearTimeout(t)
  }, [])

  if (!visible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="fixed bottom-6 right-6 z-[100] bg-black/90 text-white font-body text-sm font-medium px-4 py-2.5 rounded-[6px] shadow-lg pointer-events-none backdrop-blur-sm border border-white/10"
      role="status"
      aria-live="polite"
    >
      Design: {label} <span className="text-brand-primary">✓</span>
    </motion.div>
  )
}
