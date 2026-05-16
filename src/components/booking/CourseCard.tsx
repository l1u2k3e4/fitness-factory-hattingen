import { Clock, Users, User } from 'lucide-react'
import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import CourseStatusBadge from './CourseStatusBadge'
import type { CourseOverview } from '@/types/booking'
import { formatTime, formatDate } from '@/types/booking'

interface CourseCardProps {
  course: CourseOverview
  onBook: (course: CourseOverview) => void
  onGuestBook: (course: CourseOverview) => void
  isLoggedIn: boolean
  hasBooking?: boolean
}

export default function CourseCard({
  course,
  onBook,
  onGuestBook,
  isLoggedIn,
  hasBooking = false,
}: CourseCardProps) {
  const total = course.booked_count + course.guest_count
  const isFull = total >= course.max_participants
  const isCancelled = course.status === 'cancelled'
  const isDisabled = isCancelled || hasBooking

  return (
    <article
      className={cn(
        'bg-brand-bg border rounded-card p-4 md:p-5 shadow-card',
        'transition-[border-color,box-shadow] duration-200',
        isCancelled
          ? 'border-brand-border opacity-60'
          : 'border-brand-border hover:shadow-card-hover hover:border-brand-border-hover'
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-display font-bold text-body-lg text-brand-text leading-tight">
            {course.name}
          </h3>
          <p className="font-body text-body-sm text-brand-muted mt-0.5">
            {formatDate(course.date)}
          </p>
        </div>
        <CourseStatusBadge
          status={course.status}
          bookedCount={course.booked_count}
          maxParticipants={course.max_participants}
          guestCount={course.guest_count}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-4">
        <span className="inline-flex items-center gap-1.5 font-body text-body-sm text-brand-muted">
          <Clock className="w-4 h-4" aria-hidden="true" />
          {formatTime(course.start_time)} · {course.duration_min} Min
        </span>
        <span className="inline-flex items-center gap-1.5 font-body text-body-sm text-brand-muted">
          <Users className="w-4 h-4" aria-hidden="true" />
          {total}/{course.max_participants} Plätze
        </span>
        {course.trainer_name && (
          <span className="inline-flex items-center gap-1.5 font-body text-body-sm text-brand-muted">
            <User className="w-4 h-4" aria-hidden="true" />
            {course.trainer_name}
          </span>
        )}
      </div>

      {course.level !== 'Alle Level' && (
        <p className="font-body text-caption text-brand-muted mb-3">
          Level: {course.level}
        </p>
      )}

      {isCancelled && course.cancel_reason && (
        <p className="font-body text-body-sm text-red-600 mb-3">
          {course.cancel_reason}
        </p>
      )}

      <div className="flex gap-2">
        {isLoggedIn ? (
          <Button
            size="sm"
            variant={hasBooking ? 'outline' : isFull ? 'ghost' : 'primary'}
            onClick={() => onBook(course)}
            disabled={isDisabled}
            fullWidth
          >
            {hasBooking
              ? 'Bereits gebucht'
              : isFull
                ? 'Auf Warteliste setzen'
                : 'Jetzt buchen'}
          </Button>
        ) : (
          <div className="flex gap-2 w-full">
            <Button
              size="sm"
              variant="primary"
              onClick={() => onBook(course)}
              disabled={isCancelled}
              className="flex-1"
            >
              Einloggen & Buchen
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onGuestBook(course)}
              disabled={isCancelled || isFull}
              className="flex-1"
            >
              Schnupperkurs
            </Button>
          </div>
        )}
      </div>
    </article>
  )
}
