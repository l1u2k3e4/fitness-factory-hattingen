import { useState } from 'react'
import { X, Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useBookingActions } from '@/hooks/useBookingApi'
import type { CourseOverview } from '@/types/booking'
import { formatTime, formatDate } from '@/types/booking'

interface GuestBookingFormProps {
  course: CourseOverview
  onClose: () => void
  onSuccess: () => void
}

export default function GuestBookingForm({ course, onClose, onSuccess }: GuestBookingFormProps) {
  const { guestBook, loading } = useBookingActions()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    const result = await guestBook(course.instance_id, name, phone)
    if (result.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      setTimeout(onSuccess, 2000)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="bg-brand-bg border border-brand-border rounded-card-lg shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-bold text-h4 text-brand-text">
            Schnupperkurs buchen
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-button hover:bg-brand-surface transition-colors"
            aria-label="Schließen"
          >
            <X className="w-5 h-5 text-brand-muted" />
          </button>
        </div>

        <div className="bg-brand-surface rounded-card p-3 mb-4 border border-brand-border">
          <p className="font-display font-bold text-body text-brand-text">{course.name}</p>
          <p className="font-body text-body-sm text-brand-muted">
            {formatDate(course.date)} · {formatTime(course.start_time)}
          </p>
        </div>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <p className="font-display font-bold text-body-lg text-brand-text">Gebucht!</p>
            <p className="font-body text-body-sm text-brand-muted text-center">
              Dein Schnupperkurs ist reserviert. Komm einfach pünktlich vorbei.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <p className="font-body text-body-sm text-brand-muted">
              Kein Account nötig — gib einfach deinen Namen und deine Telefonnummer an.
              Du kannst maximal 1 Schnupperkurs pro Woche buchen.
            </p>

            <Input
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Max Mustermann"
              required
              autoFocus
            />

            <Input
              label="Telefon"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+49 1234 567890"
              required
              error={error ?? undefined}
            />

            <Button type="submit" loading={loading} fullWidth>
              Schnupperkurs reservieren
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
