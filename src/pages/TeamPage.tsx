import { motion } from 'framer-motion'
import { Heart, UserCheck, Shield } from 'lucide-react'
import SeoHead from '@/lib/seo'
import Badge from '@/components/ui/Badge'
import TeamSection from '@/components/sections/TeamSection'
import ProbetrainingCta from '@/components/sections/ProbetrainingCtaV2'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { META, PAGE_TEAM } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'

// Icon-Map für Werte-Section
const werteIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Heart,
  UserCheck,
  Shield,
}

/**
 * TeamPage — Vollständige Team-Seite.
 * Sections:
 * 1. Hero — "Wir kennen dich beim Namen"
 * 2. Team-Grid (wiederverwendet TeamSection)
 * 3. Werte-Section — was uns wichtig ist
 * 4. ProbetrainingCta
 */
export default function TeamPage() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <>
      <SeoHead
        title={META.team.title}
        description={META.team.description}
        keywords={META.team.keywords}
        pagePath="/team/"
        jsonLd={BREADCRUMBS.team}
      />

      {/* Hero */}
      <section
        className="py-16 md:py-20 bg-brand-surface"
        aria-labelledby="team-page-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <Badge className="mb-4">{PAGE_TEAM.hero.badge}</Badge>
            <h1
              id="team-page-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-4"
            >
              {PAGE_TEAM.hero.headline}
            </h1>
            <p className="font-body text-body-lg text-brand-muted leading-relaxed max-w-[50ch] mx-auto">
              {PAGE_TEAM.hero.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Team-Grid (Wiederverwendung der TeamSection) */}
      <TeamSection showHeader={false} />

      {/* Werte-Section */}
      <section
        className="py-16 md:py-20 bg-brand-bg"
        aria-labelledby="werte-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <h2
              id="werte-headline"
              className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
            >
              {PAGE_TEAM.werte.headline}
            </h2>
          </div>

          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
          >
            {PAGE_TEAM.werte.items.map((wert) => {
              const Icon = werteIcons[wert.icon] ?? Heart
              return (
                <motion.div
                  key={wert.titel}
                  variants={fadeInUp}
                  className="flex flex-col items-center text-center gap-4 bg-brand-surface border border-brand-border rounded-card-lg p-6 md:p-8 shadow-card"
                >
                  <div
                    className="w-14 h-14 flex items-center justify-center rounded-card-lg bg-brand-primary-light border border-brand-primary/20"
                    aria-hidden="true"
                  >
                    <Icon className="w-7 h-7 text-brand-primary" />
                  </div>
                  <h3 className="font-display font-black text-h4 text-brand-text leading-tight">
                    {wert.titel}
                  </h3>
                  <p className="font-body text-body text-brand-muted leading-relaxed">
                    {wert.text}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Probetraining CTA */}
      <ProbetrainingCta />
    </>
  )
}
