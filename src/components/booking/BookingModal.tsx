import { useState } from 'react'
import { X, Check, AlertCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useBookingActions } from '@/hooks/useBookingApi'
import type { CourseOverview } from '@/types/booking'
import { formatTime, formatDate } from '@/types/booking'

interface BookingModalProps {
  course: CourseOverview
  onClose: () => void
  onSuccess: () => void
}

export default function BookingModal({ course, onClose, onSuccess }: BookingModalProps) {
  const { bookCourse, loading } = useBookingActions()
  const [result, setResult] = useState<{ status: string; position?: number } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const total = course.booked_count + course.guest_count
  const isFull = total >= course.max_participants

  async function handleBook() {
    setError(null)
    const res = await bookCourse(course.instance_id)
    if (res.error) {
      setError(res.error)
    } else if (res.data) {
      setResult({ status: res.data.status!, position: res.data.position })
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
            Kurs buchen
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
            {formatDate(course.date)} · {formatTime(course.start_time)} · {course.duration_min} Min
          </p>
          {course.trainer_name && (
            <p className="font-body text-body-sm text-brand-muted">
              Trainer: {course.trainer_name}
            </p>
          )}
          <p className="font-body text-body-sm text-brand-muted mt-1">
            {total}/{course.max_participants} Plätze belegt
          </p>
        </div>

        {result ? (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              result.status === 'confirmed' ? 'bg-green-50' : 'bg-orange-50'
            }`}>
              {result.status === 'confirmed' ? (
                <Check className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-orange-600" />
              )}
            </div>
            <p className="font-display font-bold text-body-lg text-brand-text">
              {result.status === 'confirmed' ? 'Gebucht!' : `Warteliste — Platz ${result.position}`}
            </p>
            <p className="font-body text-body-sm text-brand-muted text-center">
              {result.status === 'confirmed'
                ? 'Dein Platz ist reserviert. Bis bald im Studio!'
                : 'Du wirst automatisch benachrichtigt, wenn ein Platz frei wird.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {isFull && (
              <div className="bg-orange-50 border border-orange-200 rounded-card p-3">
                <p className="font-body text-body-sm text-orange-700">
                  Der Kurs ist voll. Du wirst auf die Warteliste gesetzt und automatisch benachrichtigt, wenn ein Platz frei wird.
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-card p-3">
                <p className="font-body text-body-sm text-red-700">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Abbrechen
              </Button>
              <Button onClick={handleBook} loading={loading} className="flex-1">
                {isFull ? 'Auf Warteliste' : 'Buchen'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
