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
 * Counter-Animation für numerische Werte, staggered fade-in.
 */
export default function TrustBar() {
  const TRUST_BAR = useDynamicTrustBar()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section
      id="trust"
      className="bg-brand-bg border-y border-brand-border py-5 md:py-7"
      aria-label="Fitness Factory Hattingen — auf einen Blick"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 md:gap-8 justify-items-center"
        >
          {TRUST_BAR.items.map((item) => {
            const Icon = iconMap[item.icon] ?? Star
            const isNumeric = item.numericValue !== null

            return (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                className="flex items-center gap-3 md:gap-4"
              >
                <div
                  className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/20"
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <p
                    className="font-display font-black text-h4 text-brand-text leading-none"
                    style={{ fontFeatureSettings: '"tnum"' }}
                    aria-label={`${item.displayWert} ${item.label}`}
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
                  <p className="font-body text-caption text-brand-muted mt-0.5">{item.label}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center font-body text-caption text-brand-muted mt-4 md:mt-5"
        >
          {SITE.oeffnungszeiten.wochentage} &nbsp;·&nbsp; {SITE.oeffnungszeiten.wochenende}
        </motion.p>
      </div>
    </section>
  )
}
