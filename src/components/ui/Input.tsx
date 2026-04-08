import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

/**
 * Input — Standard-Formular-Input.
 * Dark-Soft-Hintergrund, Brand-Primary Focus-Ring.
 * Vollständig accessible mit Label und Error-State.
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`
    const errorId = error ? `${inputId}-error` : undefined
    const hintId = hint ? `${inputId}-hint` : undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="font-body font-medium text-body-sm text-brand-text"
          >
            {label}
            {props.required && (
              <span className="text-brand-primary ml-1" aria-hidden="true">*</span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
          aria-invalid={error ? 'true' : undefined}
          className={cn(
            'w-full font-body text-body text-brand-text',
            'bg-brand-bg border border-brand-border rounded-input',
            'py-3 px-4 placeholder:text-brand-muted',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary',
            'transition-[border-color,box-shadow] duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-brand-error focus:ring-brand-error/50 focus:border-brand-error',
            className
          )}
          {...props}
        />

        {hint && !error && (
          <p id={hintId} className="font-body text-caption text-brand-muted">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="font-body text-caption text-brand-error">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input
