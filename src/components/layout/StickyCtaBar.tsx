import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, MessageCircle, Dumbbell } from 'lucide-react'
import { stickyBarReveal } from '@/lib/animations'
import { useScrollPosition } from '@/hooks/useScrollPosition'
import { SITE } from '@/data/content'

/**
 * StickyCtaBar — Mobile-only, erscheint nach 30% Scroll.
 * 3 Aktionen: Anrufen | WhatsApp | Probetraining buchen.
 * Auf Desktop ausgeblendet (md:hidden).
 */
interface StickyCtaBarProps {
  hidden?: boolean
}

export default function StickyCtaBar({ hidden = false }: StickyCtaBarProps) {
  const { scrollPercent } = useScrollPosition()
  const isVisible = scrollPercent >= 30 && !hidden

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="sticky-cta-bar"
          variants={stickyBarReveal}
          initial="initial"
          animate="animate"
          exit="exit"
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-brand-dark/95 backdrop-blur-md border-t border-white/[0.08] shadow-bar"
          role="complementary"
          aria-label="Schnellkontakt"
        >
          <div className="h-full grid grid-cols-3">
            {/* Anrufen */}
            <a
              href={SITE.kontakt.telefonLink}
              className="flex flex-col items-center justify-center gap-0.5 text-brand-muted hover:text-brand-light hover:bg-white/[0.04] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset"
              aria-label={`Anrufen: ${SITE.kontakt.telefon}`}
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              <span className="font-body font-medium text-caption">Anrufen</span>
            </a>

            {/* WhatsApp */}
            <a
              href={SITE.kontakt.whatsappLinkAllgemein}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center gap-0.5 text-brand-muted hover:text-brand-whatsapp hover:bg-white/[0.04] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset"
              aria-label="Nachricht via WhatsApp senden"
            >
              <MessageCircle className="w-5 h-5" aria-hidden="true" />
              <span className="font-body font-medium text-caption">WhatsApp</span>
            </a>

            {/* Probetraining */}
            <Link
              to="/probetraining"
              className="flex flex-col items-center justify-center gap-0.5 text-brand-primary hover:text-brand-primary-hover hover:bg-brand-primary/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset"
              aria-label="Kostenloses Probetraining buchen"
            >
              <Dumbbell className="w-5 h-5" aria-hidden="true" />
              <span className="font-body font-medium text-caption">Probetraining</span>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
