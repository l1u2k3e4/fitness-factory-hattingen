import { useState, useEffect, useRef, type FormEvent, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Lock, ArrowRight } from 'lucide-react'
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
    // localStorage nicht verfügbar — Session nur für dieses Tab
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
  const [shake, setShake] = useState(0)
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
      setShake((s) => s + 1)
      inputRef.current?.focus()
    }
    setChecking(false)
  }

  if (unlocked) return <>{children}</>

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-4 py-10"
      style={{ backgroundColor: 'rgb(var(--ff-dark))' }}
    >
      <motion.div
        key={shake}
        initial={{ opacity: 0, y: 24 }}
        animate={
          shake > 0
            ? { opacity: 1, y: 0, x: [0, -10, 10, -8, 8, -4, 0] }
            : { opacity: 1, y: 0 }
        }
        transition={
          shake > 0
            ? { x: { duration: 0.45, ease: 'easeInOut' }, opacity: { duration: 0.3 }, y: { duration: 0.3 } }
            : { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
        }
        className={cn(
          'relative z-10 w-full max-w-md overflow-hidden p-8 sm:p-10',
          'rounded-card-lg border'
        )}
        style={{
          backgroundColor: 'rgb(var(--ff-surface) / 0.6)',
          borderColor: 'rgb(var(--ff-primary) / 0.35)',
          boxShadow:
            'var(--ff-shadow-glow), 0 0 0 1px rgb(var(--ff-primary) / 0.15), 0 24px 80px rgba(0,0,0,0.55)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgb(var(--ff-primary)) 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />

        <div className="mb-8 flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.12, type: 'spring', stiffness: 280, damping: 20 }}
            className="relative mb-5"
          >
            {/* Glow halo */}
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{ backgroundColor: 'rgb(var(--ff-primary) / 0.5)' }}
              aria-hidden="true"
            />
            <div
              className="relative flex h-16 w-16 items-center justify-center rounded-full"
              style={{
                backgroundColor: 'rgb(var(--ff-primary) / 0.12)',
                border: '1px solid rgb(var(--ff-primary) / 0.45)',
                boxShadow: '0 0 24px rgb(var(--ff-primary) / 0.45), inset 0 0 12px rgb(var(--ff-primary) / 0.15)',
              }}
            >
              <Lock
                className="h-7 w-7"
                style={{ color: 'rgb(var(--ff-primary))' }}
                aria-hidden="true"
              />
            </div>
          </motion.div>

          <h1
            className="font-display font-black uppercase leading-none tracking-tight"
            style={{
              color: 'rgb(var(--ff-light))',
              fontSize: 'clamp(2rem, 4vw + 1rem, 3.25rem)',
              letterSpacing: '-0.01em',
            }}
          >
            Fitness <span style={{ color: 'rgb(var(--ff-primary))' }}>Factory</span>
          </h1>

          <div
            className="mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 font-body text-caption font-medium uppercase tracking-[0.18em]"
            style={{
              color: 'rgb(var(--ff-primary))',
              backgroundColor: 'rgb(var(--ff-primary) / 0.10)',
              border: '1px solid rgb(var(--ff-primary) / 0.30)',
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
              style={{ backgroundColor: 'rgb(var(--ff-primary))' }}
              aria-hidden="true"
            />
            Zugang gesperrt
          </div>

          <p
            className="mt-4 font-body text-body-sm leading-relaxed"
            style={{ color: 'rgb(var(--ff-light-secondary))' }}
          >
            Diese Seite ist passwortgeschützt.<br />
            Bitte gib dein Passwort ein, um fortzufahren.
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
              'w-full rounded-input px-4 py-3.5 font-body text-body',
              'placeholder:font-body placeholder:text-body-sm placeholder:tracking-normal',
              'transition-all duration-200',
              'focus:outline-none'
            )}
            style={{
              backgroundColor: 'rgb(var(--ff-bg) / 0.7)',
              color: 'rgb(var(--ff-light))',
              border: error
                ? '1px solid rgb(var(--ff-error))'
                : '1px solid rgb(var(--ff-border))',
              boxShadow: error
                ? '0 0 0 3px rgb(var(--ff-error) / 0.15)'
                : 'inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
            onFocus={(e) => {
              if (!error) {
                e.currentTarget.style.borderColor = 'rgb(var(--ff-primary) / 0.6)'
                e.currentTarget.style.boxShadow =
                  '0 0 0 3px rgb(var(--ff-primary) / 0.15), 0 0 20px rgb(var(--ff-primary) / 0.20)'
              }
            }}
            onBlur={(e) => {
              if (!error) {
                e.currentTarget.style.borderColor = 'rgb(var(--ff-border))'
                e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.04)'
              }
            }}
          />

          {error && (
            <motion.p
              id="site-pw-error"
              role="alert"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 font-body text-caption font-medium uppercase tracking-wider"
              style={{ color: 'rgb(var(--ff-error))' }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={checking || value.length === 0}
            className={cn(
              'group mt-6 flex w-full items-center justify-center gap-2 rounded-button px-4 py-3.5',
              'font-display text-body font-bold uppercase tracking-wider text-white',
              'transition-all duration-200',
              'disabled:cursor-not-allowed disabled:opacity-40',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
            )}
            style={{
              backgroundColor: 'rgb(var(--ff-primary))',
              boxShadow:
                value.length > 0 && !checking
                  ? '0 0 24px rgb(var(--ff-primary) / 0.45), 0 8px 20px rgba(0,0,0,0.30)'
                  : 'none',
            }}
            onMouseEnter={(e) => {
              if (!checking && value.length > 0) {
                e.currentTarget.style.backgroundColor = 'rgb(var(--ff-primary-hover))'
                e.currentTarget.style.boxShadow =
                  '0 0 32px rgb(var(--ff-primary) / 0.60), 0 12px 24px rgba(0,0,0,0.40)'
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgb(var(--ff-primary))'
              e.currentTarget.style.boxShadow =
                value.length > 0 && !checking
                  ? '0 0 24px rgb(var(--ff-primary) / 0.45), 0 8px 20px rgba(0,0,0,0.30)'
                  : 'none'
            }}
          >
            {checking ? 'Prüfe…' : 'Zugang freischalten'}
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </form>

        {/* Bottom accent line */}
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              'linear-gradient(90deg, transparent 0%, rgb(var(--ff-primary) / 0.6) 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </motion.div>
    </div>
  )
}
