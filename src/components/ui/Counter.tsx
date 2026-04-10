import { useRef, useEffect } from 'react'
import { cn } from '@/lib/cn'
import { useInView } from '@/hooks/useInView'
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
 * Schreibt direkt in `textContent` via Ref → 0 React-Renders pro Sekunde.
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
  const wrapperRef = useRef<HTMLSpanElement>(null)
  const numberRef = useRef<HTMLSpanElement>(null)
  const { ref: inViewRef, inView } = useInView<HTMLSpanElement>({ threshold: 0.5 })
  const hasAnimatedRef = useRef(false)

  // Wrapper-Ref mit useInView-Ref kombinieren
  const setRefs = (el: HTMLSpanElement | null) => {
    wrapperRef.current = el
    ;(inViewRef as React.MutableRefObject<HTMLSpanElement | null>).current = el
  }

  useEffect(() => {
    if (!inView || hasAnimatedRef.current || !value) return
    hasAnimatedRef.current = true

    const target = numberRef.current
    if (!target) return

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      target.textContent = formatValue(value, decimals)
      return
    }

    // RAF-Loop: schreibt direkt in DOM, umgeht React-Render komplett
    let rafId = 0
    let startTs: number | null = null
    const durationMs = duration * 1000

    const tick = (ts: number) => {
      if (startTs === null) startTs = ts
      const elapsed = ts - startTs
      const progress = Math.min(elapsed / durationMs, 1)
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * value
      target.textContent = formatValue(current, decimals)
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        target.textContent = formatValue(value, decimals)
      }
    }

    rafId = requestAnimationFrame(tick)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [inView, value, duration, decimals])

  return (
    <span ref={setRefs} className={cn('tabular-nums', wrapperClassName)}>
      {prefix && (
        <span className={cn('font-display', className)} aria-hidden="true">
          {prefix}
        </span>
      )}
      <span
        ref={numberRef}
        className={cn(
          'font-display font-black',
          'font-feature-settings-tnum',
          className
        )}
        aria-label={`${prefix}${value}${suffix}`}
      >
        0
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
