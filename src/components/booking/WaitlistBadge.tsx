import Badge from '@/components/ui/Badge'

interface WaitlistBadgeProps {
  position: number
}

export default function WaitlistBadge({ position }: WaitlistBadgeProps) {
  return (
    <Badge variant="accent">
      Warteliste — Platz {position}
    </Badge>
  )
}
