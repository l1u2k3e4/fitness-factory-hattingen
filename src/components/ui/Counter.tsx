import { useRef, useEffect, useState } from 'react'
import { useInView, animate } from 'framer-motion'
import { cn } from '@/lib/cn'
import { counterConfig } from '@/lib/animations'

interface CounterProps {
  /** Zielwert */
  value: number
  /** Suffix hinter der Zahl, z.B. '+', '€', '★', '/5' */
  suffix?: string
  /** Prefix vor der Zahl, z.B. '~', '>' */
  prefix?: string
  /** Animationsdauer in Sekunden (Default aus counterConfig) */
  duration?: number
  /** CSS-Klassen für das Zahlen-Element */
  className?: string
  /** Klassen für den Wrapper */
  wrapperClassName?: string
  /** Dezimalstellen (0 = nur ganzzahlig) */
  decimals?: number
}

/**
 * Counter — Animierte Zahl die von 0 auf `value` hochzählt wenn in Viewport.
 * Nutzt Framer Motion animate() mit onUpdate-Callback.
 * prefers-reduced-motion: Zeigt sofort den Endwert.
 */
export default function Counter({
  value,
  suffix = '',
  prefix = '',
  duration = counterConfig.duration,
  className,
  wrapperClassName,
  decimals = 0,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const [displayValue, setDisplayValue] = useState('0')
  const hasAnimatedRef = useRef(false)

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!isInView || hasAnimatedRef.current || !value) return
    hasAnimatedRef.current = true

    if (prefersReduced) {
      setDisplayValue(formatValue(value, decimals))
      return
    }

    const controls = animate(0, value, {
      duration,
      ease: counterConfig.ease,
      onUpdate: (latest) => {
        setDisplayValue(formatValue(latest, decimals))
      },
      onComplete: () => {
        setDisplayValue(formatValue(value, decimals))
      },
    })

    return () => {
      controls.stop()
    }
  }, [isInView, value, duration, decimals, prefersReduced])

  return (
    <span ref={ref} className={cn('tabular-nums', wrapperClassName)}>
      {prefix && (
        <span className={cn('font-display', className)} aria-hidden="true">
          {prefix}
        </span>
      )}
      <span
        className={cn(
          'font-display font-black',
          'font-feature-settings-tnum',
          className
        )}
        aria-label={`${prefix}${value}${suffix}`}
      >
        {displayValue}
      </span>
      {suffix && (
        <span className={cn('font-display', className)} aria-hidden="true">
          {suffix}
        </span>
      )}
    </span>
  )
}

function formatValue(value: number, decimals: number): string {
  if (decimals === 0) {
    return Math.round(value).toLocaleString('de-DE')
  }
  return value.toFixed(decimals).replace('.', ',')
}
