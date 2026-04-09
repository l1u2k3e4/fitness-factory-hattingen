import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Check, Zap } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { PREISE, LEISTUNGEN_INKLUSIVE } from '@/data/content'

/**
 * PreiseSection — Alle Tarife + Fremdgeh-Aktion Card.
 * Weißer Hintergrund, scharfe Ecken, CI-konform.
 * Standard visuell highlighted (roter Rand oben).
 */
export default function PreiseSection() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section
      id="preise"
      className="py-16 md:py-24 bg-brand-bg"
      aria-labelledby="preise-headline"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <Badge className="mb-4">{PREISE.sectionBadge}</Badge>
          <h2
            id="preise-headline"
            className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
          >
            {PREISE.headline}
          </h2>
          <p className="font-body text-body-lg text-brand-muted mt-3 max-w-[55ch] mx-auto leading-relaxed">
            {PREISE.subheadline}
          </p>
          <p className="font-body text-body-sm text-brand-muted mt-2">
            <span className="text-brand-text font-semibold">Einmalig 49&nbsp;€ Anmeldegebühr</span>
            {' '}— gilt für alle Tarife.
          </p>
        </div>

        {/* Tarif-Cards */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-6"
        >
          {PREISE.tarife.map((tarif) => (
            <motion.div
              key={tarif.name}
              variants={fadeInUp}
              className={cn(
                'relative flex flex-col rounded-card-lg p-6 md:p-8 border shadow-card',
                tarif.highlight
                  ? 'bg-brand-bg border-brand-primary border-2'
                  : 'bg-brand-bg border-brand-border'
              )}
            >
              {/* Hervorhebungs-Balken oben */}
              {tarif.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary rounded-t-card-lg" />
              )}

              {/* Highlight Badge */}
              {tarif.badge && (
                <div className="absolute -top-3.5 left-6">
                  <Badge variant={tarif.highlight ? 'primary' : 'muted'}>
                    {tarif.badge}
                  </Badge>
                </div>
              )}

              {/* Laufzeit & Name */}
              <div className="mb-5 mt-2">
                <h3 className="font-display font-black text-h3 text-brand-text mb-1 leading-tight">
                  {tarif.laufzeit}
                </h3>
                <p className="font-body text-body-sm text-brand-muted">{tarif.name}-Tarif</p>
              </div>

              {/* Preis */}
              <div className="mb-5 pb-5 border-b border-brand-border">
                <div className="flex items-baseline gap-0.5">
                  <span
                    className={cn(
                      'font-display font-black text-display leading-none',
                      tarif.highlight ? 'text-brand-primary' : 'text-brand-text'
                    )}
                    style={{ fontFeatureSettings: '"tnum"' }}
                  >
                    {tarif.monatspreis}&nbsp;€
                  </span>
                  <span className="font-body text-body-sm text-brand-muted">/Monat</span>
                </div>
                <p className="font-body text-body-sm text-brand-muted mt-1.5">{tarif.beschreibung}</p>
              </div>

              {/* Leistungen */}
              <ul className="flex flex-col gap-2 mb-8 flex-1" aria-label="Inklusive Leistungen">
                {LEISTUNGEN_INKLUSIVE.map((leistung) => (
                  <li key={leistung} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 flex-shrink-0 text-brand-primary" aria-hidden="true" />
                    <span className="font-body text-body-sm text-brand-muted">{leistung}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                to="/probetraining"
                variant={tarif.highlight ? 'primary' : 'ghost'}
                fullWidth
                aria-label={`${tarif.laufzeit} Mitgliedschaft — Probetraining buchen`}
              >
                Probetraining buchen
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Fremdgeh-Aktion Card */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          transition={{ delay: 0.25 }}
          className="relative overflow-hidden rounded-card-lg border border-brand-border bg-brand-surface p-6 md:p-8 shadow-card"
        >
          {/* Roter linker Akzent-Streifen */}
          <div
            className="absolute top-0 left-0 bottom-0 w-1 bg-brand-primary rounded-l-card-lg"
            aria-hidden="true"
          />

          <div className="relative pl-4 md:pl-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/20 mt-0.5"
                aria-hidden="true"
              >
                <Zap className="w-6 h-6 text-brand-primary" />
              </div>

              <div>
                <div className="mb-1">
                  <Badge variant="primary">{PREISE.fremdgehAktion.badge}</Badge>
                </div>
                <h3 className="font-display font-black text-h3 text-brand-text leading-tight mt-2">
                  {PREISE.fremdgehAktion.headline}
                </h3>
                <p className="font-body text-body text-brand-muted mt-2 max-w-[55ch] leading-relaxed">
                  {PREISE.fremdgehAktion.beschreibung}
                </p>
                <p className="font-body text-body-sm text-brand-muted-subtle mt-2 italic">
                  {PREISE.fremdgehAktion.bedingung}
                </p>
              </div>
            </div>

            {/* Preis + CTA */}
            <div className="flex flex-col items-start md:items-end gap-3 flex-shrink-0">
              <div className="flex items-end gap-1.5">
                <span
                  className="font-display font-black text-display text-brand-primary leading-none"
                  style={{ fontFeatureSettings: '"tnum"' }}
                >
                  0&nbsp;€
                </span>
                <span className="font-body text-body-sm text-brand-muted pb-1">/3 Monate</span>
              </div>
              <Button
                to={PREISE.fremdgehAktion.ctaHref}
                variant="primary"
                aria-label="Fremdgeh-Aktion — jetzt wechseln"
              >
                {PREISE.fremdgehAktion.ctaLabel}
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Note */}
        <p className="text-center font-body text-body-sm text-brand-muted mt-6">
          {PREISE.probetrainingHinweis}{' '}
          <Link
            to={PREISE.probetrainingLinkHref}
            className="text-brand-primary hover:text-brand-primary-hover underline underline-offset-2 transition-colors duration-150"
          >
            {PREISE.probetrainingLinkLabel}
          </Link>
          {' '}— kostenlos & unverbindlich.
        </p>
      </div>
    </section>
  )
}
