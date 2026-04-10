import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { staggerContainer, fadeInUp } from '@/lib/animations'
import { cn } from '@/lib/cn'
import { useInView } from '@/hooks/useInView'
import { FAQ } from '@/data/content'

/**
 * FaqSection — Homepage-Kurzversion mit Top-8 FAQ.
 * Hellgrauer Hintergrund, sauberes Accordion, roter Akzent bei aktiver Frage.
 */
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.1 })

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section
      id="faq"
      className="py-16 md:py-24 bg-brand-surface"
      aria-labelledby="faq-headline"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="text-center mb-10 md:mb-14"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4">{FAQ.sectionBadge}</Badge>
          </motion.div>
          <motion.h2
            variants={fadeInUp}
            id="faq-headline"
            className="font-display font-black text-h2 text-brand-text leading-tight tracking-tight"
          >
            {FAQ.headline}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="font-body text-body-lg text-brand-muted mt-3 max-w-[55ch] mx-auto leading-relaxed"
          >
            {FAQ.subheadline}
          </motion.p>
        </motion.div>

        {/* Accordion */}
        <div
          className="max-w-2xl mx-auto bg-brand-bg border border-brand-border rounded-card-lg divide-y divide-brand-border mb-10 shadow-card"
          role="list"
          aria-label="Häufig gestellte Fragen"
        >
          {FAQ.items.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div key={item.frage} role="listitem">
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className={cn(
                    'w-full flex items-center justify-between gap-4 px-5 py-4 text-left',
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
                      <Minus className="w-4 h-4 text-brand-primary" />
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
                    <p className="font-body text-body text-brand-muted leading-relaxed px-5 pb-4 pr-14">
                      {item.antwort}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Link zur vollständigen FAQ-Seite */}
        <div className="text-center">
          <p className="font-body text-body-sm text-brand-muted mb-4">
            Weitere Fragen zu Öffnungszeiten, Kündigung, Kursen und mehr?
          </p>
          <Button
            to={FAQ.ctaHref}
            variant="ghost"
            aria-label="Alle häufigen Fragen ansehen"
          >
            {FAQ.ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
