/**
 * ThemeContext — Fitness Factory Hattingen
 * Verwaltet das aktive Design-Theme.
 * - Liest ?theme= URL-Parameter (für Kunden-Demos)
 * - Persistiert in localStorage
 * - Setzt data-theme Attribut auf <html>
 * - Verwaltet dynamisches Font-Preloading
 */

import { createContext, useCallback, useEffect, useLayoutEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { themes, DEFAULT_THEME } from '@/themes'
import type { ThemeId, ThemeConfig } from '@/themes'

const STORAGE_KEY = 'ff-theme-v2'

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

function getInitialTheme(): ThemeId {
  // 1. URL-Parameter hat Prioritaet
  const params = new URLSearchParams(window.location.search)
  const urlTheme = params.get('theme')
  if (urlTheme && urlTheme in themes) {
    return urlTheme as ThemeId
  }

  // 2. localStorage
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && stored in themes) {
      return stored as ThemeId
    }
  } catch {
    // localStorage nicht verfuegbar
  }

  // 3. Default
  return DEFAULT_THEME
}

function shouldShowSwitcher(): boolean {
  const params = new URLSearchParams(window.location.search)
  if (params.has('showThemes')) return true
  // Im Dev-Modus immer anzeigen
  if (import.meta.env.DEV) return true
  return false
}

function applyTheme(config: ThemeConfig) {
  const root = document.documentElement

  // data-theme Attribut setzen
  root.setAttribute('data-theme', config.id)

  // CSS Custom Properties setzen
  for (const [key, value] of Object.entries(config.cssVars)) {
    root.style.setProperty(`--ff-${key}`, value)
  }

  // Font-Family direkt setzen (fuer sofortige Wirkung)
  root.style.setProperty('--ff-font-display', config.fonts.display)
  root.style.setProperty('--ff-font-body', config.fonts.body)
}

function preloadFonts(files: string[]) {
  // Bestehende dynamische Preloads entfernen
  document.querySelectorAll('link[data-theme-font]').forEach(el => el.remove())

  // Neue Preloads injizieren
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
  const [showSwitcher] = useState(shouldShowSwitcher)

  const themeConfig = themes[themeId]

  // Synchron vor erstem Paint anwenden (kein Flash)
  useLayoutEffect(() => {
    applyTheme(themeConfig)
  }, [themeConfig])

  // Font-Preloading + localStorage
  useEffect(() => {
    preloadFonts(themeConfig.fonts.preloadFiles)

    try {
      localStorage.setItem(STORAGE_KEY, themeId)
    } catch {
      // Ignore
    }
  }, [themeId, themeConfig])

  const setTheme = useCallback((id: ThemeId) => {
    if (id in themes) {
      setThemeId(id)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ themeId, themeConfig, setTheme, showSwitcher }}>
      {children}
    </ThemeContext.Provider>
  )
}
