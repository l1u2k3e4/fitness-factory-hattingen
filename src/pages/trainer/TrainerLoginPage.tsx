import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function TrainerLoginPage() {
  const { signInWithPassword, isTrainer, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authLoading && isTrainer) {
      navigate('/trainer/heute', { replace: true })
    }
  }, [isTrainer, authLoading, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error: err } = await signInWithPassword(email, password)
    setLoading(false)

    if (err) {
      setError(err)
    } else {
      // Kurz warten bis AuthContext den Trainer-Status geladen hat, dann weiterleiten
      setTimeout(() => navigate('/trainer/heute', { replace: true }), 500)
    }
  }

  return (
    <div className="min-h-screen bg-brand-surface flex items-center justify-center p-4">
      <div className="bg-brand-bg border border-brand-border rounded-card-lg shadow-card w-full max-w-sm p-6">
        <div className="text-center mb-6">
          <span className="font-display font-black text-h2 text-brand-primary tracking-tight">
            FF
          </span>
          <h1 className="font-display font-bold text-h4 text-brand-text mt-2">
            Trainer-Login
          </h1>
          <p className="font-body text-body-sm text-brand-muted mt-1">
            Melde dich an, um deine Kurse zu verwalten.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="E-Mail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="trainer@fitness-factory.de"
            required
            autoFocus
          />

          <Input
            label="Passwort"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            error={error ?? undefined}
          />

          <Button type="submit" loading={loading} fullWidth>
            Anmelden
          </Button>
        </form>
      </div>
    </div>
  )
}
