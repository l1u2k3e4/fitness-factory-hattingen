import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
}

/**
 * Textarea — Mehrzeiliges Formularfeld.
 * Identisches Styling zum Input — konsistentes Formular-Design.
 * Vollständig accessible: label, aria-invalid, aria-describedby.
 */
const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 9)}`
    const errorId = error ? `${textareaId}-error` : undefined
    const hintId = hint ? `${textareaId}-hint` : undefined

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={textareaId}
            className="font-body font-medium text-body-sm text-brand-text"
          >
            {label}
            {props.required && (
              <span className="text-brand-primary ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        )}

        <textarea
          ref={ref}
          id={textareaId}
          aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
          aria-invalid={error ? 'true' : undefined}
          rows={props.rows ?? 4}
          className={cn(
            'w-full font-body text-body text-brand-text',
            'bg-brand-bg border border-brand-border rounded-input',
            'py-3 px-4 placeholder:text-brand-muted',
            'focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary',
            'transition-[border-color,box-shadow] duration-150',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            'resize-y min-h-[100px]',
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

Textarea.displayName = 'Textarea'

export default Textarea
