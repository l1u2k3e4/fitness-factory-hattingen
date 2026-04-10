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
 * Auf Mobile (< md): Endlos-Marquee von rechts nach links (pure CSS).
 * Auf Desktop (md+): statische 3-Spalten-Zeile mit Fade-in Stagger.
 *
 * Das Layout wird per Tailwind-Breakpoint gesteuert (nicht via JS-Messung),
 * damit es keinen Render-Race gibt. Die Marquee läuft endlos — moderne
 * Browser pausieren off-screen CSS-Animationen automatisch (GPU-Compositing),
 * daher ist eine JS-Pause-Logik unnötig und nur eine Fehlerquelle.
 */
export default function TrustBar() {
  const TRUST_BAR = useDynamicTrustBar()
  // Für Items-Stagger-Animation auf Desktop (einmalig)
  const { ref: itemsRef, inView: itemsInView } = useInView<HTMLDivElement>({ threshold: 0.2 })

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
      id="trust"
      className="bg-brand-bg border-y border-brand-border py-5 md:py-7 overflow-hidden"
      aria-label="Fitness Factory Hattingen — auf einen Blick"
    >
      {/* Mobile: Endlos-Marquee (pure CSS, keine JS-Messung, keine Pause-Logik) */}
      <div className="md:hidden overflow-hidden" aria-hidden="true">
        <div className="flex gap-10 animate-marquee w-max">
          {/* Duplizierte Items für nahtlose Endlosschleife (translateX -50%) */}
          {items.map((item) => renderItem(item, 'a'))}
          <div className="flex-shrink-0 w-8" aria-hidden="true" />
          {items.map((item) => renderItem(item, 'b'))}
          <div className="flex-shrink-0 w-8" aria-hidden="true" />
        </div>
      </div>

      {/* Desktop: statische 3-Spalten-Zeile mit Stagger-Fade-in */}
      <div className="hidden md:block max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          ref={itemsRef}
          variants={staggerContainer}
          initial="initial"
          animate={itemsInView ? 'animate' : 'initial'}
          className="flex gap-6 sm:gap-8 justify-center"
        >
          {items.map((item) => (
            <motion.div key={item.label} variants={fadeInUp} className="flex-shrink-0">
              {renderItem(item, 'static')}
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={itemsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center font-body text-caption text-brand-muted mt-4 md:mt-5"
        >
          {SITE.oeffnungszeiten.wochentage} &nbsp;·&nbsp; {SITE.oeffnungszeiten.wochenende}
        </motion.p>
      </div>

      {/* Öffnungszeiten auch auf Mobile unter dem Marquee */}
      <p className="md:hidden text-center font-body text-caption text-brand-muted mt-4 px-4">
        {SITE.oeffnungszeiten.wochentage} &nbsp;·&nbsp; {SITE.oeffnungszeiten.wochenende}
      </p>
    </section>
  )
}
