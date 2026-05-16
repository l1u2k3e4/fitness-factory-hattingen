export interface CourseOverview {
  instance_id: string
  template_id: string
  name: string
  weekday: number
  date: string
  start_time: string
  duration_min: number
  level: string
  trainer_name: string | null
  trainer_id: string | null
  max_participants: number
  status: 'scheduled' | 'cancelled'
  cancel_reason: string | null
  booked_count: number
  waitlist_count: number
  guest_count: number
}

export interface Booking {
  id: string
  instance_id: string
  member_id: string
  status: 'confirmed' | 'waitlist' | 'cancelled'
  waitlist_pos: number | null
  booked_at: string
  cancelled_at: string | null
}

export interface BookingWithCourse extends Booking {
  course_instances: {
    date: string
    status: string
    course_templates: {
      name: string
      start_time: string
      duration_min: number
      level: string
    }
  }
}

export interface MemberProfile {
  id: string
  name: string
  phone: string | null
  is_member: boolean
}

export interface Trainer {
  id: string
  auth_user_id: string | null
  name: string
  email: string | null
  role: 'trainer' | 'admin'
  active: boolean
}

export interface TrainerStats {
  popular_courses: Array<{
    name: string
    total_bookings: number
    avg_occupancy_pct: number
  }> | null
  total_courses: number
  total_bookings: number
  cancellation_rate: number
}

export const WEEKDAY_NAMES = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'] as const
export const WEEKDAY_SHORT = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'] as const

export function getWeekStart(date: Date = new Date()): string {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  return d.toISOString().split('T')[0]
}

export function formatTime(time: string): string {
  return time.substring(0, 5) + ' Uhr'
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })
}
