import { motion } from 'framer-motion'
import { MessageCircle, Phone, CalendarCheck } from 'lucide-react'
import Button from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { PROBETRAINING_CTA } from '@/data/content'

/**
 * ProbetrainingCta — Mid-Page Conversion-Section.
 * Roter Hintergrund (brand-primary) — stärkstes visuelles Signal der Seite.
 * 4-Schritte-Ablauf + CTA-Stack.
 */
export default function ProbetrainingCta() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section
      id="probetraining"
      className="py-16 md:py-24 bg-brand-primary"
      aria-labelledby="probetraining-cta-headline"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge (weiß auf Rot) */}
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="inline-flex items-center font-body font-semibold text-eyebrow uppercase tracking-[0.15em] py-1 px-3 rounded-badge border bg-white/20 text-white border-white/30">
              {PROBETRAINING_CTA.sectionBadge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={fadeInUp}
            id="probetraining-cta-headline"
            className="font-display font-black text-h2 text-white leading-tight tracking-tight mb-4"
          >
            {PROBETRAINING_CTA.headline}
          </motion.h2>

          {/* Subheadline */}
          <motion.p
            variants={fadeInUp}
            className="font-body text-body-lg text-white/80 leading-relaxed mb-10 max-w-[55ch] mx-auto"
          >
            {PROBETRAINING_CTA.subheadline}
          </motion.p>

          {/* 4-Schritte Ablauf */}
          <motion.div
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-10"
            role="list"
            aria-label="So läuft dein Probetraining ab"
          >
            {PROBETRAINING_CTA.ablauf.map((schritt, index) => (
              <div
                key={schritt.schritt}
                role="listitem"
                className="relative flex flex-col items-center text-center gap-2"
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 border border-white/30 flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-display font-black text-body-sm text-white">
                    {schritt.schritt}
                  </span>
                </div>

                {/* Connector Line */}
                {index < PROBETRAINING_CTA.ablauf.length - 1 && (
                  <div
                    className="hidden md:block absolute top-5 left-[calc(50%+20px)] right-[calc(-50%+20px)] h-px bg-white/25"
                    aria-hidden="true"
                  />
                )}

                <p className="font-body text-body-sm text-white/75 leading-snug">
                  {schritt.text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA-Stack — auf rotem Hintergrund: weiße Buttons */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <Button
              href={PROBETRAINING_CTA.ctaPrimary.href}
              variant="whatsapp"
              size="lg"
              icon={MessageCircle}
              aria-label="Probetraining per WhatsApp buchen"
            >
              {PROBETRAINING_CTA.ctaPrimary.label}
            </Button>

            <Button
              href={PROBETRAINING_CTA.ctaSecondary.href}
              variant="dark-outline"
              size="lg"
              icon={Phone}
              aria-label="Anrufen und Probetraining vereinbaren"
            >
              {PROBETRAINING_CTA.ctaSecondary.label}
            </Button>

            <Button
              to="/probetraining"
              variant="dark-outline"
              size="lg"
              icon={CalendarCheck}
              aria-label="Online Probetraining buchen"
            >
              Online anmelden
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
