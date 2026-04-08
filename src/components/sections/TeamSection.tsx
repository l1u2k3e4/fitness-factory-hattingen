import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { useDynamicTeam } from '@/contexts/ContentContext'

/**
 * TeamSection — Trainer-Profil-Grid.
 * Hellgrauer Hintergrund, weiße Cards, scharfe Ecken, CI-konform.
 */
export default function TeamSection({ showHeader = true }: { showHeader?: boolean } = {}) {
  const TEAM = useDynamicTeam()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  return (
    <section
      id="team"
      className="py-16 md:py-24 bg-brand-surface"
      aria-labelledby="team-headline"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        {showHeader && (
        <div className="text-center mb-10 md:mb-14">
          <Badge className="mb-4">{TEAM.sectionBadge}</Badge>
          <h2
            id="team-headline"
            className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
          >
            {TEAM.headline}
          </h2>
          <p className="font-body text-body-lg text-brand-muted mt-3 max-w-[55ch] mx-auto leading-relaxed">
            {TEAM.subheadline}
          </p>
        </div>
        )}

        {/* Trainer-Cards Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-10 max-w-[800px] mx-auto"
          role="list"
          aria-label="Unser Trainer-Team"
        >
          {TEAM.mitglieder.map((trainer, index) => (
            <motion.article
              key={index}
              variants={fadeInUp}
              role="listitem"
              className="flex flex-col bg-brand-bg border border-brand-border rounded-card-lg overflow-hidden shadow-card hover:shadow-card-hover hover:border-brand-border-hover transition-[border-color,box-shadow] duration-200"
            >
              {/* Foto-Bereich */}
              <div
                className="relative w-full aspect-[4/3] bg-brand-surface flex items-center justify-center"
                aria-label={`Foto: ${trainer.name}`}
              >
                {trainer.foto && !trainer.foto.startsWith('[TBD') ? (
                  <img
                    src={trainer.foto}
                    alt={`${trainer.name} — ${trainer.rolle}`}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-3" aria-hidden="true">
                    <div className="w-20 h-20 rounded-full bg-brand-primary-light border-2 border-brand-primary/20 flex items-center justify-center">
                      <User className="w-10 h-10 text-brand-primary/40" />
                    </div>
                    <span className="font-body text-caption text-brand-muted">
                      Foto folgt
                    </span>
                  </div>
                )}

                {/* Nummer-Badge */}
                <div
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-card bg-brand-bg border border-brand-border shadow-soft"
                  aria-hidden="true"
                >
                  <span className="font-display font-black text-caption text-brand-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
              </div>

              {/* Infos */}
              <div className="flex flex-col gap-3 p-5 flex-1">
                <div>
                  <h3 className="font-display font-black text-h4 text-brand-text leading-tight">
                    {trainer.name.startsWith('[TBD') ? (
                      <span className="text-brand-muted">Name folgt</span>
                    ) : (
                      trainer.name
                    )}
                  </h3>
                  <p className="font-body text-body-sm text-brand-primary mt-0.5 font-medium">
                    {trainer.rolle.startsWith('[TBD') ? (
                      <span className="text-brand-muted">Rolle folgt</span>
                    ) : (
                      trainer.rolle
                    )}
                  </p>
                </div>

                {/* Qualifikationen */}
                {trainer.qualifikationen.length > 0 && (
                  <ul className="flex flex-wrap gap-1.5" aria-label="Qualifikationen">
                    {trainer.qualifikationen.map((qual, qi) => (
                      <li
                        key={qi}
                        className="font-body text-caption text-brand-muted bg-brand-surface border border-brand-border rounded-card px-2 py-0.5"
                      >
                        {qual.startsWith('[TBD') ? 'Qualifikation folgt' : qual}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Bio */}
                <p className="font-body text-body-sm text-brand-muted leading-relaxed flex-1">
                  {trainer.beschreibung.startsWith('[TBD') ? (
                    <span className="text-brand-muted italic">
                      Kurzbeschreibung folgt — Informationen vom Kunden
                    </span>
                  ) : (
                    trainer.beschreibung
                  )}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-center"
        >
          <Button
            to={TEAM.ctaHref}
            variant="ghost"
            aria-label="Team beim Probetraining kennenlernen"
          >
            {TEAM.ctaLabel}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
