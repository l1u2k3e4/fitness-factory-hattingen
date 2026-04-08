import { motion } from 'framer-motion'
import { Car, Bus } from 'lucide-react'
import SeoHead from '@/lib/seo'
import Badge from '@/components/ui/Badge'
import KontaktSection from '@/components/sections/KontaktSection'
import { fadeInUp } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { META, KONTAKT_PAGE } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'

/**
 * KontaktPage — Vollständige Kontaktseite.
 * Sections:
 * 1. Hero — Badge + Headline
 * 2. KontaktSection (wiederverwendet — enthält Infos, Maps, Formular)
 * 3. Anfahrts-Details (PKW + ÖPNV)
 */
export default function KontaktPage() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <>
      <SeoHead
        title={META.kontakt.title}
        description={META.kontakt.description}
        keywords={META.kontakt.keywords}
        pagePath="/kontakt/"
        jsonLd={BREADCRUMBS.kontakt}
      />

      {/* Hero */}
      <section
        className="py-16 md:py-20 bg-brand-surface"
        aria-labelledby="kontakt-page-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-4">{KONTAKT_PAGE.sectionBadge}</Badge>
            <h1
              id="kontakt-page-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-4"
            >
              {KONTAKT_PAGE.headline}
            </h1>
            <p className="font-body text-body-lg text-brand-muted leading-relaxed max-w-[50ch] mx-auto">
              {KONTAKT_PAGE.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* KontaktSection (wiederverwendet) */}
      <KontaktSection showHeader={false} />

      {/* Anfahrt Details */}
      <section
        className="py-16 md:py-20 bg-brand-bg"
        aria-labelledby="anfahrt-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div
            ref={ref}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className="max-w-3xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              id="anfahrt-headline"
              className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight mb-8 text-center"
            >
              {KONTAKT_PAGE.anfahrt.headline}
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              {/* PKW */}
              <motion.div
                variants={fadeInUp}
                className="bg-brand-surface border border-brand-border rounded-card-lg p-5 md:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/20"
                    aria-hidden="true"
                  >
                    <Car className="w-5 h-5 text-brand-primary" />
                  </div>
                  <h3 className="font-display font-bold text-h4 text-brand-text">
                    Mit dem Auto
                  </h3>
                </div>
                <p className="font-body text-body-sm text-brand-muted leading-relaxed">
                  {KONTAKT_PAGE.anfahrt.pkw}
                </p>
              </motion.div>

              {/* ÖPNV */}
              <motion.div
                variants={fadeInUp}
                className="bg-brand-surface border border-brand-border rounded-card-lg p-5 md:p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 flex items-center justify-center rounded-card bg-brand-primary-light border border-brand-primary/20"
                    aria-hidden="true"
                  >
                    <Bus className="w-5 h-5 text-brand-primary" />
                  </div>
                  <h3 className="font-display font-bold text-h4 text-brand-text">
                    Mit Bus & Bahn
                  </h3>
                </div>
                <p className="font-body text-body-sm text-brand-muted leading-relaxed">
                  {KONTAKT_PAGE.anfahrt.oepnv}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
