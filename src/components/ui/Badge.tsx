import { cn } from '@/lib/cn'

type BadgeVariant = 'primary' | 'accent' | 'success' | 'muted' | 'dark-muted'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  className?: string
}

const variantClasses: Record<BadgeVariant, string> = {
  // Auf hellem Hintergrund
  primary:
    'bg-brand-primary-light text-brand-primary border-brand-primary/25',
  accent:
    'bg-orange-50 text-orange-700 border-orange-200',
  success:
    'bg-green-50 text-green-700 border-green-200',
  muted:
    'bg-brand-surface text-brand-muted border-brand-border',
  // Auf dunklem Hintergrund (Hero, Footer)
  'dark-muted':
    'bg-white/[0.08] text-brand-light border-white/[0.12]',
}

/**
 * Badge — Eyebrow-Labels und Status-Chips.
 * CI: Eckig (3px Radius), sauber, kein Pill-Style.
 */
export default function Badge({ children, variant = 'primary', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center',
        'font-body font-semibold text-eyebrow uppercase tracking-[0.15em]',
        'py-1 px-3 rounded-badge border',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
