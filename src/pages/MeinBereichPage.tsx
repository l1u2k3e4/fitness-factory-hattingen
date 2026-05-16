import { useState } from 'react'
import { Calendar, Clock, LogOut, X, Check } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useMyBookings, useBookingActions } from '@/hooks/useBookingApi'
import SectionWrapper from '@/components/ui/SectionWrapper'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import WaitlistBadge from '@/components/booking/WaitlistBadge'
import LoginModal from '@/components/booking/LoginModal'
import { formatTime, formatDate } from '@/types/booking'

export default function MeinBereichPage() {
  const { user, profile, signOut, loading: authLoading } = useAuth()
  const { bookings, loading, refetch } = useMyBookings()
  const { cancelBooking, loading: actionLoading } = useBookingActions()
  const [showLogin, setShowLogin] = useState(false)
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [cancelSuccess, setCancelSuccess] = useState<string | null>(null)

  if (!user && !authLoading) {
    return (
      <>
        <SectionWrapper className="pt-28 md:pt-32 pb-16">
          <div className="max-w-md mx-auto text-center">
            <h1 className="font-display font-black text-h1 text-brand-text tracking-tight mb-4">
              Mein Bereich
            </h1>
            <p className="font-body text-body text-brand-muted mb-8">
              Melde dich an, um deine Buchungen zu sehen und zu verwalten.
            </p>
            <Button onClick={() => setShowLogin(true)} fullWidth>
              Anmelden
            </Button>
          </div>
        </SectionWrapper>
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onSuccess={() => setShowLogin(false)}
          />
        )}
      </>
    )
  }

  async function handleCancel(bookingId: string) {
    setCancellingId(bookingId)
    const result = await cancelBooking(bookingId)
    setCancellingId(null)
    if (!result.error) {
      setCancelSuccess(bookingId)
      setTimeout(() => setCancelSuccess(null), 2000)
      refetch()
    }
  }

  const upcomingBookings = bookings.filter((b) => {
    const courseDate = new Date(b.course_instances.date + 'T23:59:59')
    return courseDate >= new Date()
  })

  const pastBookings = bookings.filter((b) => {
    const courseDate = new Date(b.course_instances.date + 'T23:59:59')
    return courseDate < new Date()
  })

  return (
    <SectionWrapper className="pt-28 md:pt-32 pb-16 md:pb-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <Badge variant="primary" className="mb-3">Mein Bereich</Badge>
            <h1 className="font-display font-black text-h2 text-brand-text tracking-tight">
              Hallo, {profile?.name ?? 'Mitglied'}.
            </h1>
          </div>
          <Button
            variant="outline"
            size="sm"
            icon={LogOut}
            onClick={signOut}
          >
            Abmelden
          </Button>
        </div>

        {/* Aktive Buchungen */}
        <section className="mb-10">
          <h2 className="font-display font-bold text-h4 text-brand-text mb-4 pb-2 border-b border-brand-border">
            Anstehende Kurse
          </h2>

          {loading ? (
            <p className="font-body text-body-sm text-brand-muted py-8 text-center">Laden...</p>
          ) : upcomingBookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="font-body text-body text-brand-muted mb-4">
                Keine anstehenden Buchungen.
              </p>
              <Button to="/kursplan" variant="primary">
                Kursplan ansehen
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {upcomingBookings.map((booking) => {
                const ct = booking.course_instances.course_templates
                return (
                  <article
                    key={booking.id}
                    className="bg-brand-bg border border-brand-border rounded-card p-4 shadow-card flex items-center justify-between gap-4"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-bold text-body text-brand-text truncate">
                          {ct.name}
                        </h3>
                        {booking.status === 'waitlist' && booking.waitlist_pos && (
                          <WaitlistBadge position={booking.waitlist_pos} />
                        )}
                        {booking.status === 'confirmed' && (
                          <Badge variant="success">Bestätigt</Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                        <span className="inline-flex items-center gap-1 font-body text-body-sm text-brand-muted">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatDate(booking.course_instances.date)}
                        </span>
                        <span className="inline-flex items-center gap-1 font-body text-body-sm text-brand-muted">
                          <Clock className="w-3.5 h-3.5" />
                          {formatTime(ct.start_time)}
                        </span>
                      </div>
                    </div>

                    {cancelSuccess === booking.id ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <Check className="w-4 h-4" />
                        <span className="font-body text-body-sm">Storniert</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleCancel(booking.id)}
                        disabled={actionLoading && cancellingId === booking.id}
                        className="p-2 rounded-button border border-brand-border hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors text-brand-muted"
                        aria-label="Buchung stornieren"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </article>
                )
              })}
            </div>
          )}
        </section>

        {/* Vergangene Buchungen */}
        {pastBookings.length > 0 && (
          <section>
            <h2 className="font-display font-bold text-h4 text-brand-text mb-4 pb-2 border-b border-brand-border">
              Vergangene Kurse
            </h2>
            <div className="flex flex-col gap-2">
              {pastBookings.slice(0, 10).map((booking) => {
                const ct = booking.course_instances.course_templates
                return (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between gap-4 py-2 px-3 rounded-card text-brand-muted"
                  >
                    <span className="font-body text-body-sm">{ct.name}</span>
                    <span className="font-body text-caption">{formatDate(booking.course_instances.date)}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </SectionWrapper>
  )
}
