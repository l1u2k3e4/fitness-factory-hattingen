import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useTheme } from '@/hooks/useTheme'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'whatsapp' | 'dark-outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
  className?: string
  'aria-label'?: string
}

interface ButtonProps extends BaseProps {
  href?: undefined
  to?: undefined
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

interface InternalLinkProps extends BaseProps {
  to: string
  href?: undefined
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  disabled?: undefined
  type?: undefined
}

interface ExternalLinkProps extends BaseProps {
  href: string
  to?: undefined
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  disabled?: undefined
  type?: undefined
}

type ButtonComponentProps = ButtonProps | InternalLinkProps | ExternalLinkProps

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-2 px-4 text-body-sm',
  md: 'py-3 px-6 text-body',
  lg: 'py-4 px-8 text-body-lg',
}

const variantClasses: Record<ButtonVariant, string> = {
  // Roter Primär-Button — CI-Hauptfarbe
  primary:
    'bg-brand-primary text-white border border-transparent hover:bg-brand-primary-hover active:bg-brand-primary-hover',
  // Sekundär auf hellem Hintergrund
  secondary:
    'bg-brand-surface text-brand-text border border-brand-border hover:bg-brand-surface-hover active:bg-brand-surface-hover',
  // Ghost auf hellem Hintergrund — roter Rand
  ghost:
    'bg-transparent text-brand-primary border border-brand-primary hover:bg-brand-primary-light active:bg-brand-primary-light',
  // Outline auf hellem Hintergrund — neutraler Rand
  outline:
    'bg-transparent text-brand-text border border-brand-border hover:border-brand-border-hover hover:bg-brand-surface active:bg-brand-surface',
  // WhatsApp-Grün
  whatsapp:
    'bg-brand-whatsapp text-white border border-transparent hover:bg-[#20c05a] active:bg-[#1aad4e]',
  // Für dunkle Hintergründe (Hero, Footer) — weißer Rand
  'dark-outline':
    'bg-transparent text-brand-light border border-brand-light/40 hover:bg-white/10 hover:border-brand-light/70 active:bg-white/15',
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 font-display font-bold tracking-wide rounded-button transition-[background-color,border-color,color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2'

const disabledClasses = 'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'

function ButtonContent({
  children,
  icon: Icon,
  iconPosition = 'left',
  loading,
  size = 'md',
}: {
  children: React.ReactNode
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  loading?: boolean
  size?: ButtonSize
}) {
  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'

  if (loading) {
    return (
      <>
        <Loader2 className={cn(iconSize, 'animate-spin')} aria-hidden="true" />
        {children}
      </>
    )
  }

  if (Icon && iconPosition === 'left') {
    return (
      <>
        <Icon className={iconSize} aria-hidden="true" />
        {children}
      </>
    )
  }

  if (Icon && iconPosition === 'right') {
    return (
      <>
        {children}
        <Icon className={iconSize} aria-hidden="true" />
      </>
    )
  }

  return <>{children}</>
}

/**
 * Button — Einziger CTA-Button der gesamten Website.
 * CI: Rot + Schwarz + Weiß. Scharfe Ecken (4px). Kein Glow.
 * Varianten: primary | secondary | ghost | outline | whatsapp | dark-outline
 */
const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonComponentProps
>((props, _ref) => {
  const {
    variant = 'primary',
    size = 'md',
    icon,
    iconPosition = 'left',
    fullWidth = false,
    loading = false,
    children,
    className,
    'aria-label': ariaLabel,
  } = props

  const { themeConfig } = useTheme()
  const { enableGlow, enableScale } = themeConfig.animations

  const classes = cn(
    baseClasses,
    disabledClasses,
    sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    loading && 'cursor-wait',
    // Theme-spezifische Erweiterungen
    enableGlow && variant === 'primary' && 'shadow-glow hover:shadow-[0_0_30px_rgb(var(--ff-primary)/0.40)]',
    enableScale && 'hover:scale-[1.02] active:scale-[0.97] transition-transform',
    className
  )

  const content = (
    <ButtonContent
      icon={icon}
      iconPosition={iconPosition}
      loading={loading}
      size={size}
    >
      {children}
    </ButtonContent>
  )

  // Internal Link (React Router)
  if ('to' in props && props.to !== undefined) {
    return (
      <Link
        to={props.to}
        onClick={props.onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </Link>
    )
  }

  // External Link
  if ('href' in props && props.href !== undefined) {
    return (
      <a
        href={props.href}
        target={props.href.startsWith('http') ? '_blank' : undefined}
        rel={props.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        onClick={props.onClick as React.MouseEventHandler<HTMLAnchorElement>}
        aria-label={ariaLabel}
        className={classes}
      >
        {content}
      </a>
    )
  }

  // Button
  const buttonProps = props as ButtonProps
  return (
    <button
      ref={_ref as React.Ref<HTMLButtonElement>}
      type={buttonProps.type ?? 'button'}
      disabled={buttonProps.disabled || loading}
      onClick={buttonProps.onClick as React.MouseEventHandler<HTMLButtonElement>}
      aria-label={ariaLabel}
      aria-busy={loading}
      className={cn(classes, fullWidth && 'w-full')}
    >
      {content}
    </button>
  )
})

Button.displayName = 'Button'

export default Button
