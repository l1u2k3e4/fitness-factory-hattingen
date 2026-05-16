/**
 * Theme-Registry — Fitness Factory Hattingen
 * Zentrale Exportdatei für alle Design-Varianten.
 */

import type { ThemeId, ThemeConfig } from './types'
import { classicTheme } from './classic'
import { energeticTheme } from './energetic'
import { energeticV2Theme } from './energetic-v2'

export const themes: Record<ThemeId, ThemeConfig> = {
  classic: classicTheme,
  energetic: energeticTheme,
  'energetic-v2': energeticV2Theme,
}

export const DEFAULT_THEME: ThemeId = 'classic'

export const themeIds = Object.keys(themes) as ThemeId[]

export type { ThemeId, ThemeConfig, ThemeAnimationConfig } from './types'
