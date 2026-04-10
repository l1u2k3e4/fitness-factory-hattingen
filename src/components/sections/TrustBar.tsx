import { useRef, useEffect, useState } from 'react'
import { Star, Calendar, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import Counter from '@/components/ui/Counter'
import { SITE } from '@/data/content'
import { useDynamicTrustBar } from '@/contexts/ContentContext'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Star,
  Calendar,
  MapPin,
}

/**
 * TrustBar — Vertrauenssignale direkt unter dem Hero.
 * Weißer Hintergrund mit roter Trennlinie oben.
 * Auf kleinen Screens: Auto-Scroll Marquee von rechts nach links.
 * Auf größeren Screens: statische 3-Spalten-Zeile.
 */
export default function TrustBar() {
  const TRUST_BAR = useDynamicTrustBar()
  // Für Items-Stagger-Animation (einmalig)
  const { ref: itemsRef, inView: itemsInView } = useInView<HTMLDivElement>({ threshold: 0.2 })
  // Für Marquee-Pause (toggle) — pausiert Endlosschleife wenn TrustBar off-screen
  const { ref: marqueeRef, inView: marqueeVisible } = useInView<HTMLElement>({
    threshold: 0,
    once: false,
  })
  const trackRef = useRef<HTMLDivElement>(null)
  const [needsMarquee, setNeedsMarquee] = useState(false)

  useEffect(() => {
    function check() {
      const el = trackRef.current
      if (!el) return
      setNeedsMarquee(el.scrollWidth > el.clientWidth + 4)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const items = TRUST_BAR.items

  const renderItem = (item: typeof items[number], suffix: string) => {
    const Icon = iconMap[item.icon] ?? Star
    const isNumeric = item.numericValue !== null

    return (
      <div
        key={`${item.label}-${suffix}`}
        className="flex items-center gap-3 flex-shrink-0"
      >
        <div
          className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/20"
          aria-hidden="true"
        >
          <Icon className="w-5 h-5 text-brand-primary" />
        </div>
        <div>
          <p
            className="font-display font-black text-h4 text-brand-text leading-none whitespace-nowrap"
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {isNumeric ? (
              <Counter
                value={item.numericValue}
                suffix={item.suffix}
                decimals={item.decimals}
                className="text-h4"
              />
            ) : (
              item.displayWert
            )}
          </p>
          <p className="font-body text-caption text-brand-muted mt-0.5 whitespace-nowrap">
            {item.label}
          </p>
        </div>
      </div>
    )
  }

  return (
    <section
      ref={marqueeRef}
      id="trust"
      className="bg-brand-bg border-y border-brand-border py-5 md:py-7"
      aria-label="Fitness Factory Hattingen — auf einen Blick"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Measurement container (hidden when marquee active) */}
        <motion.div
          ref={(el) => {
            // Combine refs: useInView + trackRef
            ;(itemsRef as React.MutableRefObject<HTMLDivElement | null>).current = el
            ;(trackRef as React.MutableRefObject<HTMLDivElement | null>).current = el
          }}
          variants={staggerContainer}
          initial="initial"
          animate={itemsInView ? 'animate' : 'initial'}
          className={`flex gap-6 sm:gap-8 justify-center ${needsMarquee ? 'hidden' : ''}`}
        >
          {items.map((item) => (
            <motion.div key={item.label} variants={fadeInUp} className="flex-shrink-0">
              {renderItem(item, 'static')}
            </motion.div>
          ))}
        </motion.div>

        {/* Marquee — nur sichtbar wenn Items nicht passen */}
        {needsMarquee && (
          <div
            className="overflow-hidden"
            aria-hidden="true"
          >
            {/* Marquee pausiert automatisch wenn TrustBar off-screen → kein GPU-Drain */}
            <div
              className={`flex gap-10 animate-marquee ${!marqueeVisible ? '[animation-play-state:paused]' : ''}`}
            >
              {/* Duplizierte Items für nahtlose Endlosschleife */}
              {items.map((item) => renderItem(item, 'a'))}
              <div className="flex-shrink-0 w-8" aria-hidden="true" />
              {items.map((item) => renderItem(item, 'b'))}
              <div className="flex-shrink-0 w-8" aria-hidden="true" />
            </div>
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={itemsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center font-body text-caption text-brand-muted mt-4 md:mt-5"
        >
          {SITE.oeffnungszeiten.wochentage} &nbsp;·&nbsp; {SITE.oeffnungszeiten.wochenende}
        </motion.p>
      </div>
    </section>
  )
}
