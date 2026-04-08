/**
 * useThemeAnimations — Hook fuer theme-parametrisierte Framer-Motion-Varianten.
 * Liefert fadeInUp, cardHover etc. angepasst an das aktive Theme.
 */

import { useMemo } from 'react'
import { useTheme } from './useTheme'
import { getThemeAnimations } from '@/lib/animations'

export function useThemeAnimations() {
  const { themeConfig } = useTheme()

  return useMemo(
    () => getThemeAnimations(themeConfig.animations),
    [themeConfig.animations]
  )
}
