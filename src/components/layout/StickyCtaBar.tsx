import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MessageCircle, Dumbbell } from 'lucide-react'
import { cn } from '@/lib/cn'
import { SITE } from '@/data/content'

/**
 * StickyCtaBar — Mobile-only, erscheint sobald die Hero-Section verlassen wird.
 * Nutzt IntersectionObserver (kein Scroll-Listener) → keine Re-Renders pro Scroll-Pixel.
 * 3 Aktionen: Anrufen | WhatsApp | Probetraining buchen.
 * Solide Hintergrundfarbe (kein backdrop-blur) → keine GPU-Repaints beim Scrollen.
 */
interface StickyCtaBarProps {
  hidden?: boolean
}

export default function StickyCtaBar({ hidden = false }: StickyCtaBarProps) {
  const [heroExited, setHeroExited] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('hero')
    // Fallback: Wenn kein Hero vorhanden (z.B. Unterseite), direkt sichtbar
    if (!hero) {
      setHeroExited(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroExited(!entry.isIntersecting)
      },
      { threshold: 0 },
    )

    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  const isVisible = heroExited && !hidden

  return (
    <div
      className={cn(
        'sticky-cta md:hidden fixed bottom-0 left-0 right-0 z-50 h-16 bg-brand-dark border-t border-white/[0.08] shadow-bar',
        'transform-gpu transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
        'pb-[env(safe-area-inset-bottom)]',
        isVisible ? 'translate-y-0' : 'translate-y-full',
      )}
      role="complementary"
      aria-label="Schnellkontakt"
      aria-hidden={!isVisible}
    >
      <div className="h-full grid grid-cols-3">
        {/* Anrufen */}
        <a
          href={SITE.kontakt.telefonLink}
          className="flex flex-col items-center justify-center gap-0.5 text-brand-muted hover:text-brand-light hover:bg-white/[0.04] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset"
          aria-label={`Anrufen: ${SITE.kontakt.telefon}`}
          tabIndex={isVisible ? 0 : -1}
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
          tabIndex={isVisible ? 0 : -1}
        >
          <MessageCircle className="w-5 h-5" aria-hidden="true" />
          <span className="font-body font-medium text-caption">WhatsApp</span>
        </a>

        {/* Probetraining */}
        <Link
          to="/probetraining"
          className="flex flex-col items-center justify-center gap-0.5 text-brand-primary hover:text-brand-primary-hover hover:bg-brand-primary/10 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-inset"
          aria-label="Kostenloses Probetraining buchen"
          tabIndex={isVisible ? 0 : -1}
        >
          <Dumbbell className="w-5 h-5" aria-hidden="true" />
          <span className="font-body font-medium text-caption">Probetraining</span>
        </Link>
      </div>
    </div>
  )
}
