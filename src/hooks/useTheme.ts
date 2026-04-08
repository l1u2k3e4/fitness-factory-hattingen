/**
 * useTheme — Consumer-Hook für den ThemeContext.
 * Liefert themeId, themeConfig und setTheme.
 */

import { useContext } from 'react'
import { ThemeContext } from '@/contexts/ThemeContext'

export function useTheme() {
  return useContext(ThemeContext)
}
