import { motion } from 'framer-motion'
import { Star, ExternalLink } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { useInView } from '@/hooks/useInView'
import { useDynamicTestimonials } from '@/contexts/ContentContext'

/**
 * TestimonialsSection — Echte Google-Bewertungen.
 * Weißer Hintergrund, Gesamtbewertung prominent, saubere Cards.
 */
export default function TestimonialsSection() {
  const TESTIMONIALS = useDynamicTestimonials()
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })
  const items = TESTIMONIALS.items

  return (
    <section
      id="bewertungen"
      className="py-16 md:py-24 bg-brand-bg"
      aria-labelledby="testimonials-headline"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <Badge className="mb-4">{TESTIMONIALS.sectionBadge}</Badge>

          {/* Gesamtbewertung */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="flex items-center gap-0.5" aria-label={`${TESTIMONIALS.overallRating} von 5 Sternen`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  aria-hidden="true"
                />
              ))}
            </div>
            <span className="font-body text-body font-semibold text-brand-text">
              {TESTIMONIALS.overallRating}
            </span>
            <span className="font-body text-body-sm text-brand-muted">
              ({TESTIMONIALS.totalReviews} Bewertungen)
            </span>
          </div>

          <h2
            id="testimonials-headline"
            className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
          >
            {TESTIMONIALS.headline}
          </h2>
          <p className="font-body text-body-lg text-brand-muted mt-3 max-w-[55ch] mx-auto leading-relaxed">
            {TESTIMONIALS.subheadline}
          </p>
        </div>

        {/* Testimonial-Grid */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-8"
          role="list"
          aria-label="Bewertungen unserer Mitglieder"
        >
          {items.map((item, index) => (
            <motion.div key={index} variants={fadeInUp} role="listitem">
              <Card className="h-full flex flex-col">
                {/* Sterne + Plattform */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="flex items-center gap-0.5"
                    aria-label={`${item.sterne} von 5 Sternen`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < item.sterne
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'fill-brand-border text-brand-border'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="flex items-center gap-1 font-body text-caption text-brand-muted bg-brand-surface border border-brand-border rounded-card px-2 py-0.5">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Google
                  </span>
                </div>

                {/* Bewertungstext */}
                <blockquote className="font-body text-body text-brand-text leading-relaxed mb-4 flex-1">
                  &ldquo;{item.text}&rdquo;
                </blockquote>

                {/* Name & Datum */}
                <footer className="flex items-end justify-between gap-2 pt-4 border-t border-brand-border">
                  <div>
                    <p className="font-body font-semibold text-body-sm text-brand-text">
                      {item.name}
                    </p>
                    <p className="font-body text-caption text-brand-muted mt-0.5">
                      {item.datum}
                    </p>
                  </div>
                  <div
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-green-50 border border-green-200"
                    aria-label="Verifizierte Bewertung"
                  >
                    <svg className="w-3 h-3 text-brand-success" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </footer>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Google-Badge CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-center"
        >
          <Button
            href={TESTIMONIALS.googleMapsLink}
            variant="ghost"
            icon={ExternalLink}
            iconPosition="right"
            aria-label="Alle Bewertungen auf Google Maps ansehen"
          >
            {TESTIMONIALS.ctaLabel}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
