import { Users, Phone, UserCheck, Clock } from 'lucide-react'
import Badge from '@/components/ui/Badge'

interface Participant {
  id: string
  name: string
  phone: string | null
  status: 'confirmed' | 'waitlist'
  waitlist_pos: number | null
  booked_at: string
}

interface GuestParticipant {
  id: string
  name: string
  phone: string
  booked_at: string
}

interface ParticipantListProps {
  participants: Participant[]
  guests: GuestParticipant[]
  maxParticipants: number
}

export default function ParticipantList({ participants, guests, maxParticipants }: ParticipantListProps) {
  const confirmed = participants.filter((p) => p.status === 'confirmed')
  const waitlist = participants.filter((p) => p.status === 'waitlist').sort((a, b) => (a.waitlist_pos ?? 0) - (b.waitlist_pos ?? 0))
  const totalBooked = confirmed.length + guests.length

  return (
    <div className="flex flex-col gap-4">
      {/* Summary */}
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 font-display font-bold text-body text-brand-text">
          <Users className="w-5 h-5" />
          {totalBooked}/{maxParticipants} Teilnehmer
        </span>
        {waitlist.length > 0 && (
          <Badge variant="accent">{waitlist.length} auf Warteliste</Badge>
        )}
      </div>

      {/* Confirmed Members */}
      {confirmed.length > 0 && (
        <div>
          <h4 className="font-body font-semibold text-body-sm text-brand-muted uppercase tracking-wider mb-2">
            Bestätigt ({confirmed.length})
          </h4>
          <div className="flex flex-col gap-1">
            {confirmed.map((p, i) => (
              <div key={p.id} className="flex items-center justify-between py-2 px-3 rounded-card hover:bg-brand-surface transition-colors">
                <div className="flex items-center gap-2">
                  <span className="font-body text-caption text-brand-muted w-5">{i + 1}.</span>
                  <UserCheck className="w-4 h-4 text-green-600" />
                  <span className="font-body text-body-sm text-brand-text">{p.name}</span>
                </div>
                {p.phone && (
                  <a href={`tel:${p.phone}`} className="text-brand-muted hover:text-brand-primary transition-colors">
                    <Phone className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Guests */}
      {guests.length > 0 && (
        <div>
          <h4 className="font-body font-semibold text-body-sm text-brand-muted uppercase tracking-wider mb-2">
            Gäste ({guests.length})
          </h4>
          <div className="flex flex-col gap-1">
            {guests.map((g) => (
              <div key={g.id} className="flex items-center justify-between py-2 px-3 rounded-card hover:bg-brand-surface transition-colors">
                <div className="flex items-center gap-2">
                  <Badge variant="muted" className="text-[10px] py-0.5 px-1.5">Gast</Badge>
                  <span className="font-body text-body-sm text-brand-text">{g.name}</span>
                </div>
                <a href={`tel:${g.phone}`} className="text-brand-muted hover:text-brand-primary transition-colors">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Waitlist */}
      {waitlist.length > 0 && (
        <div>
          <h4 className="font-body font-semibold text-body-sm text-brand-muted uppercase tracking-wider mb-2">
            Warteliste ({waitlist.length})
          </h4>
          <div className="flex flex-col gap-1">
            {waitlist.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2 px-3 rounded-card hover:bg-brand-surface transition-colors">
                <div className="flex items-center gap-2">
                  <span className="font-body text-caption text-brand-muted w-5">{p.waitlist_pos}.</span>
                  <Clock className="w-4 h-4 text-orange-500" />
                  <span className="font-body text-body-sm text-brand-text">{p.name}</span>
                </div>
                {p.phone && (
                  <a href={`tel:${p.phone}`} className="text-brand-muted hover:text-brand-primary transition-colors">
                    <Phone className="w-4 h-4" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalBooked === 0 && waitlist.length === 0 && (
        <p className="font-body text-body-sm text-brand-muted text-center py-6">
          Noch keine Teilnehmer.
        </p>
      )}
    </div>
  )
}
