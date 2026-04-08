/**
 * ThemeSwitcher — UI zum Wechseln zwischen Design-Varianten.
 * Wird als feste Leiste oben auf der Seite angezeigt.
 * Sichtbar via ?showThemes=true URL-Param oder im Dev-Modus.
 */

import { motion } from 'framer-motion'
import { Palette } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useTheme } from '@/hooks/useTheme'
import { themeIds, themes } from '@/themes'

export default function ThemeSwitcher() {
  const { themeId, setTheme, showSwitcher } = useTheme()

  if (!showSwitcher) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-[#1a1a2e] border-b border-[#2a2a4a] shadow-lg">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-12 flex items-center gap-4">
        {/* Label */}
        <div className="flex items-center gap-2 text-[#8888aa] flex-shrink-0">
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline text-xs font-medium uppercase tracking-wider">
            Design-Variante
          </span>
        </div>

        {/* Theme Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {themeIds.map((id) => {
            const theme = themes[id]
            const isActive = themeId === id

            return (
              <motion.button
                key={id}
                type="button"
                onClick={() => setTheme(id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  'relative flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-150 whitespace-nowrap',
                  isActive
                    ? 'bg-[#2a2a4a] text-white'
                    : 'text-[#8888aa] hover:text-white hover:bg-[#222244]'
                )}
                aria-pressed={isActive}
                aria-label={`Theme: ${theme.label}`}
              >
                {/* Farb-Vorschau Dots */}
                <div className="flex items-center gap-0.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.preview.bg }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.preview.primary }}
                  />
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.preview.accent }}
                  />
                </div>

                {/* Label */}
                <span>{theme.label}</span>

                {/* Active Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="theme-indicator"
                    className="absolute inset-0 rounded-md border border-[#4444aa]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>

        {/* Beschreibung */}
        <span className="hidden md:block text-[10px] text-[#6666aa] ml-auto flex-shrink-0">
          {themes[themeId].description}
        </span>
      </div>
    </div>
  )
}
