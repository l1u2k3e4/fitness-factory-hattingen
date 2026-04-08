import { Phone, Clock } from 'lucide-react'
import { SITE } from '@/data/content'

/**
 * TopBar — Schmale Kontaktleiste über der Navigation.
 * Zeigt Telefon + Öffnungszeiten auf Desktop. Auf Mobile ausgeblendet.
 */
export default function TopBar() {
  return (
    <div className="hidden md:block bg-brand-surface border-b border-brand-border">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 h-9 flex items-center justify-between">
        {/* Öffnungszeiten */}
        <div className="flex items-center gap-4 text-brand-muted text-body-sm font-body">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
            {SITE.oeffnungszeiten.wochentage}
          </span>
          <span className="text-brand-border" aria-hidden="true">|</span>
          <span>{SITE.oeffnungszeiten.wochenende}</span>
        </div>

        {/* Telefon CTA */}
        <a
          href={SITE.kontakt.telefonLink}
          className="flex items-center gap-1.5 text-brand-muted hover:text-brand-text text-body-sm font-body font-medium transition-colors duration-150"
          aria-label={`Anrufen: ${SITE.kontakt.telefon}`}
        >
          <Phone className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
          {SITE.kontakt.telefon}
        </a>
      </div>
    </div>
  )
}
