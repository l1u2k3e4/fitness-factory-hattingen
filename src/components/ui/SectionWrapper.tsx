import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/cn'
import { reducedMotionVariants } from '@/lib/animations'
import { useThemeAnimations } from '@/hooks/useThemeAnimations'

interface SectionWrapperProps {
  /** Anker-ID für Navigation (z.B. id="preise") */
  id?: string
  children: React.ReactNode
  className?: string
  /** Wrapper-Hintergrund — standardmäßig transparent */
  bg?: 'default' | 'soft' | 'dark'
  /**
   * Scroll-triggered Fade-In.
   * Bei false: statisch (für Hero oder andere Abschnitte mit eigenen Animationen).
   */
  animate?: boolean
  /** Wie viel % des Elements sichtbar sein muss bevor Animation startet (0.0–1.0) */
  threshold?: number
  as?: 'section' | 'div' | 'article'
}

const bgClasses: Record<NonNullable<SectionWrapperProps['bg']>, string> = {
  default: 'bg-brand-bg',
  soft: 'bg-brand-surface',
  dark: 'bg-brand-dark',
}

/**
 * SectionWrapper — Konsistenter Section-Container für alle Seiten-Abschnitte.
 *
 * - Einheitlicher max-w + padding
 * - Optionaler Scroll-Triggered Fade-In (Framer Motion useInView)
 * - prefers-reduced-motion wird automatisch respektiert
 * - id-Prop für Anker-Navigation
 */
export default function SectionWrapper({
  id,
  children,
  className,
  bg = 'default',
  animate = true,
  threshold = 0.12,
  as: Tag = 'section',
}: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: threshold })
  const themeAnims = useThemeAnimations()

  // prefers-reduced-motion: System-Einstellung wird über den variant-Switch abgedeckt.
  // Framer Motion respektiert dies intern, aber wir bieten einen expliziten Fallback.
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const variants = prefersReduced ? reducedMotionVariants : themeAnims.fadeInUp

  const sectionClasses = cn(bgClasses[bg], className)

  const innerClasses = 'max-w-[1280px] mx-auto px-4 md:px-8 py-16 md:py-24'

  if (!animate) {
    return (
      <Tag id={id} className={sectionClasses}>
        <div className={innerClasses}>{children}</div>
      </Tag>
    )
  }

  return (
    <Tag id={id} className={sectionClasses}>
      <motion.div
        ref={ref}
        className={innerClasses}
        variants={variants}
        initial="initial"
        animate={isInView ? 'animate' : 'initial'}
      >
        {children}
      </motion.div>
    </Tag>
  )
}
