import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Package, Heart, MapPin, ArrowRight } from 'lucide-react'
import SeoHead from '@/lib/seo'
import Badge from '@/components/ui/Badge'
import ProbetrainingCta from '@/components/sections/ProbetrainingCtaV2'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { META, UEBER_UNS } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'

const uspIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Users,
  Package,
  Heart,
  MapPin,
}

/**
 * UeberUnsPage — Studio-Vorstellung.
 * Sections:
 * 1. Hero — Badge + Headline + Subheadline
 * 2. Geschichte — Philosophie & Beschreibung
 * 3. USPs — 4 Alleinstellungsmerkmale
 * 4. Team-Teaser → /team
 * 5. Galerie-Teaser → /galerie
 * 6. ProbetrainingCta
 */
export default function UeberUnsPage() {
  const { ref: geschichteRef, inView: geschichteInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { ref: uspsRef, inView: uspsInView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const { ref: teaserRef, inView: teaserInView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <>
      <SeoHead
        title={META.ueberUns.title}
        description={META.ueberUns.description}
        keywords={META.ueberUns.keywords}
        pagePath="/ueber-uns/"
        jsonLd={BREADCRUMBS.ueberUns}
      />

      {/* Hero */}
      <section
        className="py-16 md:py-20 bg-brand-surface"
        aria-labelledby="ueber-uns-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-4">{UEBER_UNS.sectionBadge}</Badge>
            <h1
              id="ueber-uns-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-4"
            >
              {UEBER_UNS.headline}
            </h1>
            <p className="font-body text-body-lg text-brand-muted leading-relaxed max-w-[50ch] mx-auto">
              {UEBER_UNS.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Geschichte / Philosophie */}
      <section
        id="leistungen"
        className="py-16 md:py-20 bg-brand-bg"
        aria-labelledby="geschichte-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div
            ref={geschichteRef}
            variants={staggerContainer}
            initial="initial"
            animate={geschichteInView ? 'animate' : 'initial'}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="text-center mb-10">
              <h2
                id="geschichte-headline"
                className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight mb-4"
              >
                {UEBER_UNS.geschichte.headline}
              </h2>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="font-body text-body text-brand-muted leading-relaxed mb-6"
            >
              {UEBER_UNS.geschichte.text}
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="font-body text-body text-brand-muted leading-relaxed"
            >
              {UEBER_UNS.geschichte.text2}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* USPs */}
      <section
        className="py-16 md:py-20 bg-brand-surface"
        aria-labelledby="usps-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2
              id="usps-headline"
              className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
            >
              Was uns ausmacht.
            </h2>
          </div>

          <motion.div
            ref={uspsRef}
            variants={staggerContainer}
            initial="initial"
            animate={uspsInView ? 'animate' : 'initial'}
            className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6"
          >
            {UEBER_UNS.usps.map((usp) => {
              const Icon = uspIcons[usp.icon] ?? Heart
              return (
                <motion.div
                  key={usp.headline}
                  variants={fadeInUp}
                  className="flex items-start gap-4 bg-brand-bg border border-brand-border rounded-card-lg p-5 md:p-6 shadow-card"
                >
                  <div
                    className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-card-lg bg-brand-primary-light border border-brand-primary/20"
                    aria-hidden="true"
                  >
                    <Icon className="w-6 h-6 text-brand-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-h4 text-brand-text leading-tight mb-1.5">
                      {usp.headline}
                    </h3>
                    <p className="font-body text-body-sm text-brand-muted leading-relaxed">
                      {usp.text}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Team + Galerie Teaser */}
      <section className="py-16 md:py-20 bg-brand-bg">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div
            ref={teaserRef}
            variants={staggerContainer}
            initial="initial"
            animate={teaserInView ? 'animate' : 'initial'}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Team-Teaser */}
            <motion.div
              variants={fadeInLeft}
              className="bg-brand-surface border border-brand-border rounded-card-lg p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display font-black text-h3 text-brand-text leading-tight mb-3">
                  Unser Team
                </h3>
                <p className="font-body text-body text-brand-muted leading-relaxed mb-6">
                  Qualifizierte Trainer, die sich Zeit für dich nehmen. Lerne sie kennen.
                </p>
              </div>
              <Link
                to="/team"
                className="inline-flex items-center gap-2 font-display font-bold text-body text-brand-primary hover:text-brand-primary-hover transition-colors duration-150"
              >
                Team kennenlernen
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Galerie-Teaser */}
            <motion.div
              variants={fadeInRight}
              className="bg-brand-surface border border-brand-border rounded-card-lg p-6 md:p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="font-display font-black text-h3 text-brand-text leading-tight mb-3">
                  Galerie
                </h3>
                <p className="font-body text-body text-brand-muted leading-relaxed mb-6">
                  Mach dir ein Bild von unserem Studio — Gerätepark, Kursraum, Sauna und mehr.
                </p>
              </div>
              <Link
                to="/galerie"
                className="inline-flex items-center gap-2 font-display font-bold text-body text-brand-primary hover:text-brand-primary-hover transition-colors duration-150"
              >
                Studio ansehen
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <ProbetrainingCta />
    </>
  )
}
