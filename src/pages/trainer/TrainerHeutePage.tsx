import { useState, useEffect, useCallback } from 'react'
import { AlertTriangle, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/contexts/AuthContext'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import ParticipantList from '@/components/booking/ParticipantList'
import CourseStatusBadge from '@/components/booking/CourseStatusBadge'
import type { CourseOverview } from '@/types/booking'
import { formatTime } from '@/types/booking'

interface ParticipantData {
  id: string
  name: string
  phone: string | null
  status: 'confirmed' | 'waitlist'
  waitlist_pos: number | null
  booked_at: string
}

interface GuestData {
  id: string
  name: string
  phone: string
  booked_at: string
}

export default function TrainerHeutePage() {
  const { trainer, isAdmin } = useAuth()
  const [courses, setCourses] = useState<CourseOverview[]>([])
  const [loading, setLoading] = useState(true)
  const [participants, setParticipants] = useState<Record<string, ParticipantData[]>>({})
  const [guests, setGuests] = useState<Record<string, GuestData[]>>({})
  const [cancellingId, setCancellingId] = useState<string | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const today = new Date().toISOString().split('T')[0]

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    await supabase.rpc('generate_weekly_instances', {
      p_week_start: (() => {
        const d = new Date()
        const day = d.getDay()
        d.setDate(d.getDate() - day + (day === 0 ? -6 : 1))
        return d.toISOString().split('T')[0]
      })()
    })

    let query = supabase
      .from('course_overview')
      .select('*')
      .eq('date', today)
      .order('start_time')

    if (!isAdmin && trainer) {
      query = query.eq('trainer_id', trainer.id)
    }

    const { data } = await query
    setCourses((data as CourseOverview[]) ?? [])
    setLoading(false)
  }, [today, isAdmin, trainer])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  async function loadParticipants(instanceId: string) {
    if (expandedId === instanceId) {
      setExpandedId(null)
      return
    }

    const [bookingsRes, guestsRes] = await Promise.all([
      supabase
        .from('bookings')
        .select('id, status, waitlist_pos, booked_at, member_profiles(name, phone)')
        .eq('instance_id', instanceId)
        .neq('status', 'cancelled'),
      supabase
        .from('guest_bookings')
        .select('id, name, phone, booked_at')
        .eq('instance_id', instanceId),
    ])

    const mapped: ParticipantData[] = (bookingsRes.data ?? []).map((b: Record<string, unknown>) => {
      const profile = b.member_profiles as { name: string; phone: string | null } | null
      return {
        id: b.id as string,
        name: profile?.name ?? 'Unbekannt',
        phone: profile?.phone ?? null,
        status: b.status as 'confirmed' | 'waitlist',
        waitlist_pos: b.waitlist_pos as number | null,
        booked_at: b.booked_at as string,
      }
    })

    setParticipants((prev) => ({ ...prev, [instanceId]: mapped }))
    setGuests((prev) => ({ ...prev, [instanceId]: (guestsRes.data as GuestData[]) ?? [] }))
    setExpandedId(instanceId)
  }

  async function handleCancelCourse(instanceId: string) {
    setCancellingId(instanceId)
    await supabase.rpc('cancel_course', { p_instance_id: instanceId, p_reason: 'Kurs fällt aus' })
    setCancellingId(null)
    fetchCourses()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display font-bold text-h3 text-brand-text mb-1">
        Heute — {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
      </h1>
      <p className="font-body text-body-sm text-brand-muted mb-6">
        {courses.length === 0 ? 'Keine Kurse heute.' : `${courses.length} Kurs${courses.length > 1 ? 'e' : ''} geplant.`}
      </p>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <article
            key={course.instance_id}
            className="bg-brand-bg border border-brand-border rounded-card shadow-card overflow-hidden"
          >
            {/* Header */}
            <div
              className="p-4 cursor-pointer hover:bg-brand-surface/50 transition-colors"
              onClick={() => loadParticipants(course.instance_id)}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-display font-bold text-body-lg text-brand-text">
                    {course.name}
                  </h3>
                  <p className="font-body text-body-sm text-brand-muted mt-0.5">
                    {formatTime(course.start_time)} · {course.duration_min} Min
                    {course.trainer_name && isAdmin && ` · ${course.trainer_name}`}
                  </p>
                </div>
                <CourseStatusBadge
                  status={course.status}
                  bookedCount={course.booked_count}
                  maxParticipants={course.max_participants}
                  guestCount={course.guest_count}
                />
              </div>
            </div>

            {/* Expanded: Teilnehmerliste */}
            {expandedId === course.instance_id && (
              <div className="border-t border-brand-border p-4">
                <ParticipantList
                  participants={participants[course.instance_id] ?? []}
                  guests={guests[course.instance_id] ?? []}
                  maxParticipants={course.max_participants}
                />

                {course.status === 'scheduled' && (
                  <div className="mt-4 pt-4 border-t border-brand-border">
                    <Button
                      variant="outline"
                      size="sm"
                      icon={AlertTriangle}
                      onClick={() => handleCancelCourse(course.instance_id)}
                      loading={cancellingId === course.instance_id}
                      className="text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Kurs absagen
                    </Button>
                  </div>
                )}

                {course.status === 'cancelled' && (
                  <div className="mt-4">
                    <Badge variant="primary" className="bg-red-50 text-red-700 border-red-200">
                      Abgesagt{course.cancel_reason ? `: ${course.cancel_reason}` : ''}
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  )
}
