/**
 * ThemeContext — Fitness Factory Hattingen
 * Verwaltet das aktive Design-Theme.
 *
 * Versteckte Tastenkürzel (kein UI-Element):
 *   Cmd/Ctrl + 5 → Klassisch
 *   Cmd/Ctrl + 6 → Energetisch
 *   Cmd/Ctrl + 7 → Energetisch V2
 *
 * Verhalten:
 * - Default = 'classic'
 * - URL-Parameter `?theme=` wird respektiert (für teilbare Demo-Links)
 * - KEIN localStorage — beim Neuladen ist wieder Klassisch aktiv
 */

import { createContext, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { themes, DEFAULT_THEME } from '@/themes'
import type { ThemeId, ThemeConfig } from '@/themes'

interface ThemeContextValue {
  themeId: ThemeId
  themeConfig: ThemeConfig
  setTheme: (id: ThemeId) => void
  showSwitcher: boolean
}

export const ThemeContext = createContext<ThemeContextValue>({
  themeId: DEFAULT_THEME,
  themeConfig: themes[DEFAULT_THEME],
  setTheme: () => {},
  showSwitcher: false,
})

const SHORTCUT_TO_THEME: Record<string, ThemeId> = {
  '5': 'classic',
  '6': 'energetic',
  '7': 'energetic-v2',
}

function getInitialTheme(): ThemeId {
  // URL-Parameter hat Prioritaet (fuer teilbare Demo-Links)
  const params = new URLSearchParams(window.location.search)
  const urlTheme = params.get('theme')
  if (urlTheme && urlTheme in themes) {
    return urlTheme as ThemeId
  }
  return DEFAULT_THEME
}

function applyTheme(config: ThemeConfig) {
  const root = document.documentElement

  root.setAttribute('data-theme', config.id)

  for (const [key, value] of Object.entries(config.cssVars)) {
    root.style.setProperty(`--ff-${key}`, value)
  }

  root.style.setProperty('--ff-font-display', config.fonts.display)
  root.style.setProperty('--ff-font-body', config.fonts.body)
}

function preloadFonts(files: string[]) {
  document.querySelectorAll('link[data-theme-font]').forEach(el => el.remove())

  for (const file of files) {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    link.href = file
    link.setAttribute('data-theme-font', 'true')
    document.head.appendChild(link)
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>(getInitialTheme)
  const [toastKey, setToastKey] = useState(0)

  const themeConfig = themes[themeId]

  // Synchron vor erstem Paint anwenden (kein Flash)
  useLayoutEffect(() => {
    applyTheme(themeConfig)
  }, [themeConfig])

  useEffect(() => {
    preloadFonts(themeConfig.fonts.preloadFiles)
  }, [themeConfig])

  const setTheme = useCallback((id: ThemeId) => {
    if (id in themes) {
      setThemeId(id)
    }
  }, [])

  // Geheime Tastenkürzel: Cmd/Ctrl + 5/6/7
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!(e.metaKey || e.ctrlKey)) return
      const next = SHORTCUT_TO_THEME[e.key]
      if (!next) return
      e.preventDefault()
      setThemeId(next)
      setToastKey((k) => k + 1)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <ThemeContext.Provider value={{ themeId, themeConfig, setTheme, showSwitcher: false }}>
      {children}
      <AnimatePresence>
        {toastKey > 0 && (
          <VariantToast key={toastKey} label={themeConfig.label} />
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
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
      className="fixed bottom-6 right-6 z-[100] bg-black/90 text-white text-sm font-medium px-4 py-2.5 rounded-md shadow-lg pointer-events-none backdrop-blur-sm border border-white/10"
      role="status"
      aria-live="polite"
    >
      Design: {label} <span className="text-[#E70711]">✓</span>
    </motion.div>
  )
}
