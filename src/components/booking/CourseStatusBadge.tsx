import Badge from '@/components/ui/Badge'

interface CourseStatusBadgeProps {
  status: 'scheduled' | 'cancelled'
  bookedCount: number
  maxParticipants: number
  guestCount: number
}

export default function CourseStatusBadge({
  status,
  bookedCount,
  maxParticipants,
  guestCount,
}: CourseStatusBadgeProps) {
  if (status === 'cancelled') {
    return <Badge variant="primary" className="bg-red-50 text-red-700 border-red-200">Abgesagt</Badge>
  }

  const total = bookedCount + guestCount
  const spotsLeft = maxParticipants - total

  if (spotsLeft <= 0) {
    return <Badge variant="primary" className="bg-red-50 text-red-700 border-red-200">Ausgebucht</Badge>
  }

  if (spotsLeft <= 3) {
    return <Badge variant="accent">Nur noch {spotsLeft} Plätze</Badge>
  }

  return (
    <Badge variant="success">
      {total}/{maxParticipants} belegt
    </Badge>
  )
}
