import { useState, useEffect, useCallback } from 'react'
import { Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/contexts/AuthContext'
import WeekSelector from '@/components/booking/WeekSelector'
import CourseStatusBadge from '@/components/booking/CourseStatusBadge'
import type { CourseOverview } from '@/types/booking'
import { WEEKDAY_NAMES, formatTime, getWeekStart } from '@/types/booking'

export default function TrainerWochePage() {
  const { trainer, isAdmin } = useAuth()
  const [weekOffset, setWeekOffset] = useState(0)
  const [courses, setCourses] = useState<CourseOverview[]>([])
  const [loading, setLoading] = useState(true)

  const weekStart = (() => {
    const d = new Date()
    d.setDate(d.getDate() + weekOffset * 7)
    return getWeekStart(d)
  })()

  const weekEnd = (() => {
    const d = new Date(weekStart + 'T00:00:00')
    d.setDate(d.getDate() + 6)
    return d.toISOString().split('T')[0]
  })()

  const fetchCourses = useCallback(async () => {
    setLoading(true)
    await supabase.rpc('generate_weekly_instances', { p_week_start: weekStart })

    let query = supabase
      .from('course_overview')
      .select('*')
      .gte('date', weekStart)
      .lte('date', weekEnd)
      .order('date')
      .order('start_time')

    if (!isAdmin && trainer) {
      query = query.eq('trainer_id', trainer.id)
    }

    const { data } = await query
    setCourses((data as CourseOverview[]) ?? [])
    setLoading(false)
  }, [weekStart, weekEnd, isAdmin, trainer])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  const coursesByDay = courses.reduce<Record<number, CourseOverview[]>>((acc, c) => {
    if (!acc[c.weekday]) acc[c.weekday] = []
    acc[c.weekday].push(c)
    return acc
  }, {})

  return (
    <div>
      <h1 className="font-display font-bold text-h3 text-brand-text mb-4">Wochenübersicht</h1>

      <div className="mb-6">
        <WeekSelector
          weekOffset={weekOffset}
          onPrev={() => setWeekOffset((w) => w - 1)}
          onNext={() => setWeekOffset((w) => w + 1)}
          onToday={() => setWeekOffset(0)}
          weekStart={weekStart}
          weekEnd={weekEnd}
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
        </div>
      ) : courses.length === 0 ? (
        <p className="font-body text-body text-brand-muted text-center py-12">
          Keine Kurse in dieser Woche.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dayCourses = coursesByDay[day]
            if (!dayCourses || dayCourses.length === 0) return null

            return (
              <div key={day}>
                <h2 className="font-display font-bold text-body-lg text-brand-text mb-2 pb-1 border-b border-brand-border">
                  {WEEKDAY_NAMES[day]}
                </h2>
                <div className="flex flex-col gap-2">
                  {dayCourses.map((course) => {
                    const total = course.booked_count + course.guest_count
                    return (
                      <div
                        key={course.instance_id}
                        className="flex items-center justify-between gap-3 py-2 px-3 rounded-card bg-brand-bg border border-brand-border hover:border-brand-border-hover transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <span className="font-body font-medium text-body-sm text-brand-text">
                            {course.name}
                          </span>
                          <span className="font-body text-caption text-brand-muted ml-2">
                            {formatTime(course.start_time)} · {course.duration_min} Min
                          </span>
                          {course.trainer_name && isAdmin && (
                            <span className="font-body text-caption text-brand-muted ml-2">
                              · {course.trainer_name}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-body text-body-sm text-brand-muted">
                            {total}/{course.max_participants}
                          </span>
                          <CourseStatusBadge
                            status={course.status}
                            bookedCount={course.booked_count}
                            maxParticipants={course.max_participants}
                            guestCount={course.guest_count}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
