import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useThemeAnimations } from '@/hooks/useThemeAnimations'
import Badge from './Badge'
import Button from './Button'

// ---------------------------------------------------------------------------
// Base Card — Light Theme, scharfe Ecken, cleane Schatten
// ---------------------------------------------------------------------------

interface CardProps {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  highlighted?: boolean
  as?: 'div' | 'article' | 'li'
}

/**
 * Card — Standard-Card-Komponente.
 * Weißer/Surface-Hintergrund, cleane Border, 6px Radius.
 * highlighted=true: Roter linker Rand für hervorgehobene Cards.
 */
export default function Card({
  children,
  className,
  hoverable = false,
  highlighted = false,
  as = 'div',
}: CardProps) {
  const themeAnims = useThemeAnimations()

  const baseClasses = cn(
    'bg-brand-bg border rounded-card p-4 md:p-6 shadow-card',
    highlighted
      ? 'border-brand-primary border-l-4 border-l-brand-primary'
      : 'border-brand-border',
    className
  )

  if (hoverable) {
    return (
      <motion.div
        whileHover={themeAnims.cardHover}
        className={cn(
          baseClasses,
          'hover:shadow-card-hover hover:border-brand-border-hover',
          'transition-[border-color,box-shadow] duration-200',
          'cursor-pointer'
        )}
      >
        {children}
      </motion.div>
    )
  }

  const StaticComponent = as
  return (
    <StaticComponent className={baseClasses}>
      {children}
    </StaticComponent>
  )
}

// ---------------------------------------------------------------------------
// PricingCard — Spezialisierte Karte für Tarife (Light Theme)
// ---------------------------------------------------------------------------

interface PricingCardProps {
  name: string
  laufzeit: string
  monatspreis: number
  anmeldegebuehr: number
  badge?: string | null
  highlight?: boolean
  beschreibung: string
  features: readonly string[]
  ctaLabel: string
  ctaHref: string
}

/**
 * PricingCard — Tarif-Card für Mitgliedschafts-Seite.
 * highlight=true: Roter oberer Rand + stärkerer Shadow.
 */
export function PricingCard({
  name,
  laufzeit,
  monatspreis,
  anmeldegebuehr,
  badge,
  highlight = false,
  beschreibung,
  features,
  ctaLabel,
  ctaHref,
}: PricingCardProps) {
  return (
    <article
      className={cn(
        'relative flex flex-col rounded-card-lg p-6 md:p-8',
        'transition-[border-color,box-shadow] duration-200',
        highlight
          ? [
              'bg-brand-bg border-2 border-brand-primary',
              'shadow-card-hover',
            ]
          : [
              'bg-brand-bg border border-brand-border',
              'shadow-card hover:shadow-card-hover hover:border-brand-border-hover',
            ]
      )}
    >
      {/* Hervorhebungs-Balken oben */}
      {highlight && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-primary rounded-t-card-lg" />
      )}

      {/* Badge */}
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <Badge variant={highlight ? 'primary' : 'muted'}>{badge}</Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 mt-2">
        <p className="font-body font-medium text-body-sm text-brand-muted mb-1">{laufzeit}</p>
        <h3 className="font-display font-bold text-h3 text-brand-text tracking-tight">{name}</h3>
        <p className="font-body text-body-sm text-brand-muted mt-1.5">{beschreibung}</p>
      </div>

      {/* Preis */}
      <div className="mb-6 pb-6 border-b border-brand-border">
        <div className="flex items-baseline gap-1">
          <span
            className={cn(
              'font-display font-black text-display leading-none tracking-tight',
              highlight ? 'text-brand-primary' : 'text-brand-text'
            )}
          >
            {monatspreis === 0 ? '0' : monatspreis}
          </span>
          <span className="font-body font-medium text-body text-brand-muted">€/Monat</span>
        </div>
        <p className="font-body text-caption text-brand-muted mt-1.5">
          + {anmeldegebuehr}€ Anmeldegebühr (einmalig)
        </p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-3 mb-8 flex-1" aria-label={`Leistungen ${name}`}>
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <span
              className="flex-shrink-0 w-5 h-5 flex items-center justify-center mt-0.5 text-brand-primary"
              aria-hidden="true"
            >
              <Check className="w-4 h-4" strokeWidth={2.5} />
            </span>
            <span className="font-body text-body-sm text-brand-text leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        to={ctaHref}
        variant={highlight ? 'primary' : 'ghost'}
        fullWidth
      >
        {ctaLabel}
      </Button>
    </article>
  )
}
