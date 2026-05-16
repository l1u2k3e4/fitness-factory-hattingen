import { useState, useEffect, useRef, type FormEvent, type ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { cn } from '@/lib/cn'

const STORAGE_KEY = 'ff-site-access-v1'
const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000 // 30 Tage
// SHA-256("385627079416")
const PASSWORD_HASH = '3f5039d91f3bb549965469a33d91ccb9aff5d92b9ef6b38155905c6237eb2aef'

async function sha256(text: string): Promise<string> {
  const encoded = new TextEncoder().encode(text)
  const buffer = await crypto.subtle.digest('SHA-256', encoded)
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function hasValidSession(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return false
    const { ts } = JSON.parse(raw) as { ts: number }
    return typeof ts === 'number' && Date.now() - ts < SESSION_MAX_AGE_MS
  } catch {
    return false
  }
}

function persistSession() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ts: Date.now() }))
  } catch {
    // localStorage nicht verfügbar (z.B. Private-Modus älterer Browser) — Session nur für dieses Tab
  }
}

interface Props {
  children: ReactNode
}

export default function SitePasswordGate({ children }: Props) {
  const [unlocked, setUnlocked] = useState<boolean>(() => hasValidSession())
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [checking, setChecking] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!unlocked) inputRef.current?.focus()
  }, [unlocked])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (checking) return
    setChecking(true)
    setError(null)
    const hash = await sha256(value)
    if (hash === PASSWORD_HASH) {
      persistSession()
      setUnlocked(true)
    } else {
      setError('Falsches Passwort')
      setValue('')
      inputRef.current?.focus()
    }
    setChecking(false)
  }

  if (unlocked) return <>{children}</>

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark px-4">
      <div className="w-full max-w-sm rounded-card-lg border border-brand-dark-border bg-black/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-primary/15 ring-1 ring-brand-primary/30">
            <Lock className="h-5 w-5 text-brand-primary" aria-hidden="true" />
          </div>
          <h1 className="font-display text-h3 font-black uppercase tracking-tight text-brand-light">
            Fitness Factory
          </h1>
          <p className="mt-2 font-body text-body-sm text-brand-light-secondary">
            Diese Seite ist passwortgeschützt.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="site-pw" className="sr-only">
            Passwort
          </label>
          <input
            ref={inputRef}
            id="site-pw"
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            maxLength={32}
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError(null)
            }}
            placeholder="Passwort eingeben"
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? 'site-pw-error' : undefined}
            className={cn(
              'w-full rounded-input border bg-black/30 px-4 py-3',
              'font-body text-body text-brand-light placeholder:text-brand-dark-muted',
              'transition-colors duration-150',
              'focus:outline-none focus:ring-2 focus:ring-brand-primary/60',
              error ? 'border-red-500/60' : 'border-brand-dark-border focus:border-brand-primary/60'
            )}
          />

          {error && (
            <p
              id="site-pw-error"
              role="alert"
              className="mt-2 font-body text-caption text-red-400"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={checking || value.length === 0}
            className={cn(
              'mt-5 w-full rounded-button px-4 py-3',
              'font-display text-body-sm font-bold uppercase tracking-wide text-white',
              'bg-brand-primary transition-colors duration-200',
              'hover:bg-brand-primary-hover',
              'disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark'
            )}
          >
            {checking ? 'Prüfe…' : 'Zugang'}
          </button>
        </form>
      </div>
    </div>
  )
}
