import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { fadeInUp, staggerContainer } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { PROBETRAINING_CTA } from '@/data/content'

/**
 * ProbetrainingCtaV2 — Redesigned CTA Section.
 * Dunkler Hintergrund mit Studio-Bild, 2 CTAs, kein 4-Schritt-Prozess.
 */
export default function ProbetrainingCtaV2() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 })

  return (
    <section
      id="probetraining"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-labelledby="probetraining-cta-headline"
    >
      {/* Hintergrundbild */}
      <img
        src="/images/cta-bg.jpg"
        alt=""
        width={1920}
        height={1279}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
        decoding="async"
        aria-hidden="true"
      />

      {/* Dunkles Overlay */}
      <div
        className="absolute inset-0 bg-black/75"
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-4 md:px-8">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="mb-4">
            <span className="inline-flex items-center font-body font-semibold text-eyebrow uppercase tracking-[0.15em] py-1 px-3 rounded-badge border bg-white/10 text-white/90 border-white/20">
              Kostenloses Probetraining
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
            className="font-body text-body-lg text-white/70 leading-relaxed mb-10 max-w-[45ch] mx-auto"
          >
            Unverbindlich reinschauen, alles testen — Sauna, Geräte, Kurse. Ohne Vertrag, ohne Druck.
          </motion.p>

          {/* 2 CTAs */}
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
              Probetraining per WhatsApp
            </Button>

            <Button
              to="/probetraining"
              variant="dark-outline"
              size="lg"
              icon={ArrowRight}
              aria-label="Mehr über das Probetraining erfahren"
            >
              Mehr erfahren
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
