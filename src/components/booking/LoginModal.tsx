import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface LoginModalProps {
  onClose: () => void
  onSuccess: () => void
}

export default function LoginModal({ onClose, onSuccess }: LoginModalProps) {
  const { signInWithOtp, verifyOtp, updateProfile } = useAuth()
  const [step, setStep] = useState<'email' | 'code' | 'profile'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleRequestCode(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: err } = await signInWithOtp(email)
    setLoading(false)

    if (err) {
      setError(err)
    } else {
      setStep('code')
    }
  }

  async function handleVerifyCode(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: err } = await verifyOtp(email, code)
    setLoading(false)

    if (err) {
      setError(err)
    } else {
      // Prüfen ob Profil existiert
      setStep('profile')
    }
  }

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: err } = await updateProfile({ name, phone: phone || undefined })
    setLoading(false)

    if (err) {
      setError(err)
    } else {
      onSuccess()
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-brand-bg border border-brand-border rounded-card-lg shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-h4 text-brand-text">
            {step === 'email' && 'Anmelden'}
            {step === 'code' && 'Code eingeben'}
            {step === 'profile' && 'Dein Profil'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-button hover:bg-brand-surface transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5 text-brand-muted" />
          </button>
        </div>

        {step === 'email' && (
          <form onSubmit={handleRequestCode} className="flex flex-col gap-4">
            <p className="font-body text-body-sm text-brand-muted">
              Gib deine E-Mail-Adresse ein. Du erhältst einen 6-stelligen Code zur Anmeldung.
            </p>
            <Input
              label="E-Mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              required
              autoFocus
              error={error ?? undefined}
            />
            <Button type="submit" loading={loading} fullWidth>
              Code senden
            </Button>
          </form>
        )}

        {step === 'code' && (
          <form onSubmit={handleVerifyCode} className="flex flex-col gap-4">
            <p className="font-body text-body-sm text-brand-muted">
              Wir haben einen Code an <strong className="text-brand-text">{email}</strong> gesendet.
            </p>
            <Input
              label="6-stelliger Code"
              type="text"
              inputMode="numeric"
              pattern="[0-9]{6}"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              placeholder="123456"
              required
              autoFocus
              error={error ?? undefined}
            />
            <Button type="submit" loading={loading} fullWidth>
              Bestätigen
            </Button>
            <button
              type="button"
              onClick={() => { setStep('email'); setError(null) }}
              className="font-body text-body-sm text-brand-primary hover:underline"
            >
              Andere E-Mail verwenden
            </button>
          </form>
        )}

        {step === 'profile' && (
          <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
            <p className="font-body text-body-sm text-brand-muted">
              Fast geschafft! Wie heißt du?
            </p>
            <Input
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Max Mustermann"
              required
              autoFocus
              error={error ?? undefined}
            />
            <Input
              label="Telefon (optional)"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+49 1234 567890"
            />
            <Button type="submit" loading={loading} fullWidth>
              Speichern & weiter
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
