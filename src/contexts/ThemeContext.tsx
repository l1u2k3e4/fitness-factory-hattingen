/**
 * ThemeContext — Fitness Factory Hattingen
 * Wendet das aktive Design-Theme an.
 *
 * Verhalten:
 * - Theme ist FIX auf DEFAULT_THEME ('energetic') gesetzt.
 * - Kein Switcher, keine Tastenkürzel, kein URL-Parameter, kein localStorage.
 * - setTheme im Context ist no-op (Backward-Compat für Konsumenten).
 */

import { createContext, useLayoutEffect, useEffect } from 'react'
import type { ReactNode } from 'react'
import { themes, DEFAULT_THEME } from '@/themes'
import type { ThemeId, ThemeConfig } from '@/themes'

interface ThemeContextValue {
  themeId: ThemeId
  themeConfig: ThemeConfig
  setTheme: (id: ThemeId) => void
  showSwitcher: boolean
}

const themeConfig = themes[DEFAULT_THEME]

export const ThemeContext = createContext<ThemeContextValue>({
  themeId: DEFAULT_THEME,
  themeConfig,
  setTheme: () => {},
  showSwitcher: false,
})

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
  document.querySelectorAll('link[data-theme-font]').forEach((el) => el.remove())

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
  // Synchron vor erstem Paint anwenden (kein Flash)
  useLayoutEffect(() => {
    applyTheme(themeConfig)
  }, [])

  useEffect(() => {
    preloadFonts(themeConfig.fonts.preloadFiles)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        themeId: DEFAULT_THEME,
        themeConfig,
        setTheme: () => {},
        showSwitcher: false,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
