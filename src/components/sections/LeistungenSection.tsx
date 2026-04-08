import { motion } from 'framer-motion'
import {
  Flame, Coffee, Dumbbell, ClipboardList, Apple, ShowerHead, Car, Heart,
} from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { LEISTUNGEN } from '@/data/content'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Flame,
  Coffee,
  Dumbbell,
  ClipboardList,
  Apple,
  ShowerHead,
  Car,
  Heart,
}

/**
 * LeistungenSection — All-Inclusive Leistungsübersicht.
 * Hellgrauer Hintergrund für visuellen Kontrast zur weißen Umgebung.
 * 8 Leistungs-Cards im Grid, staggered scroll-triggered fade-in.
 */
export default function LeistungenSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section
      id="leistungen"
      className="py-16 md:py-24 bg-brand-surface"
      aria-labelledby="leistungen-headline"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <Badge className="mb-4">{LEISTUNGEN.sectionBadge}</Badge>
          <h2
            id="leistungen-headline"
            className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
          >
            {LEISTUNGEN.headline}
          </h2>
          <p className="font-body text-body-lg text-brand-muted mt-3 max-w-[55ch] mx-auto leading-relaxed">
            {LEISTUNGEN.subheadline}
          </p>
        </div>

        {/* Cards Grid: 4×2 Desktop, 2×4 Tablet, 1×8 Mobile */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5"
        >
          {LEISTUNGEN.items.map((item) => {
            const Icon = iconMap[item.icon] ?? Heart
            return (
              <motion.div key={item.headline} variants={fadeInUp} className="flex">
                <Card hoverable className="flex flex-col w-full">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/20 mb-4 flex-shrink-0"
                    aria-hidden="true"
                  >
                    <Icon className="w-5 h-5 text-brand-primary" />
                  </div>
                  <h3 className="font-display font-bold text-h4 text-brand-text mb-2 leading-tight">
                    {item.headline}
                  </h3>
                  <p className="font-body text-body-sm text-brand-muted leading-relaxed flex-1">
                    {item.beschreibung}
                  </p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom Note */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center font-body text-body-sm text-brand-muted mt-8 md:mt-10"
        >
          Alles ab{' '}
          <span className="text-brand-primary font-semibold">35&nbsp;€/Monat</span>
          {' '}— kein Aufpreis, kein Kleingedrucktes.
        </motion.p>
      </div>
    </section>
  )
}
