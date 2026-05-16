// Supabase Database Types — generiert aus Schema
// Bei Änderungen am Schema: `npx supabase gen types typescript` neu ausführen

// -- Row Types (flach, ohne Self-Reference) --

interface TrainerRow {
  id: string
  auth_user_id: string | null
  name: string
  email: string | null
  phone: string | null
  role: 'trainer' | 'admin'
  active: boolean
  created_at: string
}

interface CourseTemplateRow {
  id: string
  name: string
  weekday: number
  start_time: string
  duration_min: number
  level: string
  trainer_id: string | null
  max_participants: number
  active: boolean
  created_at: string
  updated_at: string
}

interface CourseInstanceRow {
  id: string
  template_id: string
  date: string
  status: 'scheduled' | 'cancelled'
  cancel_reason: string | null
  override_max: number | null
  created_at: string
}

interface MemberProfileRow {
  id: string
  name: string
  phone: string | null
  is_member: boolean
  created_at: string
}

interface BookingRow {
  id: string
  instance_id: string
  member_id: string
  status: 'confirmed' | 'waitlist' | 'cancelled'
  waitlist_pos: number | null
  booked_at: string
  cancelled_at: string | null
}

interface GuestBookingRow {
  id: string
  phone: string
  name: string
  instance_id: string
  booked_at: string
}

interface PushSubscriptionRow {
  id: string
  member_id: string
  endpoint: string
  p256dh: string
  auth_key: string
  created_at: string
}

interface CourseOverviewRow {
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

export interface Database {
  public: {
    Tables: {
      trainers: {
        Row: TrainerRow
        Insert: Partial<TrainerRow> & Pick<TrainerRow, 'name'>
        Update: Partial<TrainerRow>
        Relationships: []
      }
      course_templates: {
        Row: CourseTemplateRow
        Insert: Partial<CourseTemplateRow> & Pick<CourseTemplateRow, 'name' | 'weekday' | 'start_time'>
        Update: Partial<CourseTemplateRow>
        Relationships: []
      }
      course_instances: {
        Row: CourseInstanceRow
        Insert: Partial<CourseInstanceRow> & Pick<CourseInstanceRow, 'template_id' | 'date'>
        Update: Partial<CourseInstanceRow>
        Relationships: []
      }
      member_profiles: {
        Row: MemberProfileRow
        Insert: Partial<MemberProfileRow> & Pick<MemberProfileRow, 'id' | 'name'>
        Update: Partial<MemberProfileRow>
        Relationships: []
      }
      bookings: {
        Row: BookingRow
        Insert: Partial<BookingRow> & Pick<BookingRow, 'instance_id' | 'member_id'>
        Update: Partial<BookingRow>
        Relationships: []
      }
      guest_bookings: {
        Row: GuestBookingRow
        Insert: Partial<GuestBookingRow> & Pick<GuestBookingRow, 'phone' | 'name' | 'instance_id'>
        Update: Partial<GuestBookingRow>
        Relationships: []
      }
      push_subscriptions: {
        Row: PushSubscriptionRow
        Insert: Partial<PushSubscriptionRow> & Pick<PushSubscriptionRow, 'member_id' | 'endpoint' | 'p256dh' | 'auth_key'>
        Update: Partial<PushSubscriptionRow>
        Relationships: []
      }
    }
    Views: {
      course_overview: {
        Row: CourseOverviewRow
        Relationships: []
      }
    }
    Functions: {
      book_course: {
        Args: { p_instance_id: string }
        Returns: Record<string, unknown>
      }
      cancel_booking: {
        Args: { p_booking_id: string }
        Returns: Record<string, unknown>
      }
      guest_book: {
        Args: { p_instance_id: string; p_name: string; p_phone: string }
        Returns: Record<string, unknown>
      }
      cancel_course: {
        Args: { p_instance_id: string; p_reason: string }
        Returns: Record<string, unknown>
      }
      generate_weekly_instances: {
        Args: { p_week_start: string }
        Returns: Record<string, unknown>
      }
      get_trainer_stats: {
        Args: { p_from: string; p_to: string }
        Returns: Record<string, unknown>
      }
    }
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
