import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { CourseOverview, BookingWithCourse } from '@/types/booking'
import { getWeekStart } from '@/types/booking'

export function useCourses(weekOffset: number = 0) {
  const [courses, setCourses] = useState<CourseOverview[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
    setError(null)

    // Instanzen für die Woche generieren
    await supabase.rpc('generate_weekly_instances', { p_week_start: weekStart })

    const { data, error: fetchError } = await supabase
      .from('course_overview')
      .select('*')
      .gte('date', weekStart)
      .lte('date', weekEnd)
      .order('date')
      .order('start_time')

    if (fetchError) {
      setError(fetchError.message)
    } else {
      setCourses((data as CourseOverview[]) ?? [])
    }
    setLoading(false)
  }, [weekStart, weekEnd])

  useEffect(() => {
    fetchCourses()
  }, [fetchCourses])

  // Realtime: Buchungsänderungen live abonnieren
  useEffect(() => {
    const channel = supabase
      .channel('booking-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => {
        fetchCourses()
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'guest_bookings' }, () => {
        fetchCourses()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [fetchCourses])

  return { courses, loading, error, refetch: fetchCourses, weekStart, weekEnd }
}

export function useMyBookings() {
  const [bookings, setBookings] = useState<BookingWithCourse[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookings = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('bookings')
      .select(`
        *,
        course_instances (
          date,
          status,
          course_templates (
            name,
            start_time,
            duration_min,
            level
          )
        )
      `)
      .neq('status', 'cancelled')
      .order('booked_at', { ascending: false })

    setBookings((data as BookingWithCourse[]) ?? [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchBookings()
  }, [fetchBookings])

  return { bookings, loading, refetch: fetchBookings }
}

export function useBookingActions() {
  const [loading, setLoading] = useState(false)

  const bookCourse = useCallback(async (instanceId: string) => {
    setLoading(true)
    const { data, error } = await supabase.rpc('book_course', { p_instance_id: instanceId })
    setLoading(false)

    if (error) return { error: error.message }
    const result = data as { id?: string; status?: string; position?: number; error?: string }
    if (result.error) return { error: result.error }
    return { data: result }
  }, [])

  const cancelBooking = useCallback(async (bookingId: string) => {
    setLoading(true)
    const { data, error } = await supabase.rpc('cancel_booking', { p_booking_id: bookingId })
    setLoading(false)

    if (error) return { error: error.message }
    const result = data as { success?: boolean; error?: string }
    if (result.error) return { error: result.error }
    return { data: result }
  }, [])

  const guestBook = useCallback(async (instanceId: string, name: string, phone: string) => {
    setLoading(true)
    const { data, error } = await supabase.rpc('guest_book', {
      p_instance_id: instanceId,
      p_name: name,
      p_phone: phone,
    })
    setLoading(false)

    if (error) return { error: error.message }
    const result = data as { success?: boolean; error?: string }
    if (result.error) return { error: result.error }
    return { data: result }
  }, [])

  return { bookCourse, cancelBooking, guestBook, loading }
}
