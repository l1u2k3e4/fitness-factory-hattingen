import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import SeoHead from '@/lib/seo'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import ProbetrainingCta from '@/components/sections/ProbetrainingCtaV2'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/cn'
import { useInView } from '@/hooks/useInView'
import { META, PAGE_FAQ } from '@/data/content'
import { BREADCRUMBS } from '@/lib/jsonld'

/**
 * FaqPage — Vollständige FAQ-Seite mit Kategorien.
 * 15+ Fragen in 5 Kategorien aus PAGE_FAQ.kategorien.
 * Kategorie-Sprung-Navigation.
 * FAQPage JSON-LD via SeoHead.
 */
export default function FaqPage() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 })
  const [openKeys, setOpenKeys] = useState<Set<string>>(new Set())

  const toggle = (key: string) => {
    setOpenKeys((prev) => {
      const next = new Set(prev)
      if (next.has(key)) {
        next.delete(key)
      } else {
        next.add(key)
      }
      return next
    })
  }

  // JSON-LD FAQPage Schema aus allen FAQ-Einträgen
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: PAGE_FAQ.kategorien.flatMap((kat) =>
      kat.items.map((item) => ({
        '@type': 'Question',
        name: item.frage,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.antwort,
        },
      }))
    ),
  }

  return (
    <>
      <SeoHead
        title={META.faq.title}
        description={META.faq.description}
        keywords={META.faq.keywords}
        pagePath="/faq/"
        jsonLd={[BREADCRUMBS.faq, faqJsonLd]}
      />

      {/* Hero */}
      <section
        className="py-16 md:py-20 bg-brand-surface"
        aria-labelledby="faq-page-headline"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge className="mb-4">{PAGE_FAQ.hero.badge}</Badge>
            <h1
              id="faq-page-headline"
              className="font-display font-black text-h1 text-brand-text leading-tight tracking-tight mb-4"
            >
              {PAGE_FAQ.hero.headline}
            </h1>
            <p className="font-body text-body-lg text-brand-muted leading-relaxed max-w-[50ch] mx-auto">
              {PAGE_FAQ.hero.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* Kategorie-Navigation */}
      <nav
        className="sticky top-[64px] md:top-[72px] z-20 bg-brand-bg border-b border-brand-border py-3"
        aria-label="FAQ-Kategorien"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
            {PAGE_FAQ.kategorien.map((kat, idx) => (
              <a
                key={kat.kategorie}
                href={`#kategorie-${idx}`}
                className="flex-shrink-0 font-body text-body-sm text-brand-muted hover:text-brand-text border border-brand-border hover:border-brand-text rounded-full px-3 py-1.5 transition-[color,border-color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {kat.kategorie}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* FAQ-Akkordeon nach Kategorien */}
      <section
        className="py-12 md:py-20 bg-brand-bg"
        aria-label="Häufige Fragen"
      >
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className="max-w-3xl mx-auto flex flex-col gap-10 md:gap-14"
          >
            {PAGE_FAQ.kategorien.map((kategorie, katIdx) => (
              <motion.section
                key={kategorie.kategorie}
                variants={fadeInUp}
                id={`kategorie-${katIdx}`}
                aria-labelledby={`kat-headline-${katIdx}`}
              >
                {/* Kategorie-Headline */}
                <h2
                  id={`kat-headline-${katIdx}`}
                  className="font-display font-black text-h3 text-brand-text leading-tight tracking-tight mb-6 pb-3 border-b border-brand-border"
                >
                  {kategorie.kategorie}
                </h2>

                {/* Accordion-Items */}
                <div
                  className="divide-y divide-brand-border"
                  role="list"
                  aria-label={`Fragen zu: ${kategorie.kategorie}`}
                >
                  {kategorie.items.map((item, itemIdx) => {
                    const key = `${katIdx}-${itemIdx}`
                    const isOpen = openKeys.has(key)
                    const panelId = `faq-full-panel-${key}`
                    const buttonId = `faq-full-button-${key}`

                    return (
                      <div key={item.frage} role="listitem">
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => toggle(key)}
                          className={cn(
                            'w-full flex items-center justify-between gap-4 py-5 text-left',
                            'font-body font-medium text-body text-brand-text',
                            'hover:text-brand-primary transition-colors duration-150',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm',
                            isOpen && 'text-brand-primary'
                          )}
                        >
                          <span>{item.frage}</span>
                          <span
                            className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-brand-muted"
                            aria-hidden="true"
                          >
                            {isOpen ? (
                              <Minus className="w-4 h-4" />
                            ) : (
                              <Plus className="w-4 h-4" />
                            )}
                          </span>
                        </button>

                        {/* Panel — CSS grid-rows Transition (kein Framer-Motion Height-Thrashing) */}
                        <div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          className={cn(
                            'grid transition-[grid-template-rows] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]',
                            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                          )}
                        >
                          <div className="overflow-hidden">
                            <p className="font-body text-body text-brand-muted leading-relaxed pb-5 pr-9">
                              {item.antwort}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.section>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <div className="max-w-3xl mx-auto text-center mt-12 md:mt-16 pt-8 border-t border-brand-border">
            <p className="font-body text-body-lg text-brand-muted mb-4">
              Deine Frage war nicht dabei?
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                to="/probetraining"
                variant="primary"
                aria-label="Probetraining buchen und alle Fragen persönlich klären"
              >
                Probetraining buchen
              </Button>
              <Button
                href="https://wa.me/4915737580001?text=Hallo%2C%20ich%20habe%20eine%20Frage."
                variant="whatsapp"
                aria-label="Frage per WhatsApp stellen"
              >
                Per WhatsApp fragen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Probetraining CTA */}
      <ProbetrainingCta />
    </>
  )
}
