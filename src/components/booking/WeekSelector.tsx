import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/cn'

interface WeekSelectorProps {
  weekOffset: number
  onPrev: () => void
  onNext: () => void
  onToday: () => void
  weekStart: string
  weekEnd: string
}

function formatWeekRange(start: string, end: string): string {
  const s = new Date(start + 'T00:00:00')
  const e = new Date(end + 'T00:00:00')
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }

  if (s.getMonth() === e.getMonth()) {
    return `${s.getDate()}. – ${e.toLocaleDateString('de-DE', opts)}`
  }
  return `${s.toLocaleDateString('de-DE', opts)} – ${e.toLocaleDateString('de-DE', opts)}`
}

export default function WeekSelector({
  weekOffset,
  onPrev,
  onNext,
  onToday,
  weekStart,
  weekEnd,
}: WeekSelectorProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        onClick={onPrev}
        className="p-2 rounded-button border border-brand-border hover:bg-brand-surface transition-colors"
        aria-label="Vorherige Woche"
      >
        <ChevronLeft className="w-5 h-5 text-brand-text" />
      </button>

      <div className="flex items-center gap-3">
        <span className="font-display font-bold text-body-lg text-brand-text">
          {formatWeekRange(weekStart, weekEnd)}
        </span>
        {weekOffset !== 0 && (
          <button
            onClick={onToday}
            className={cn(
              'font-body text-caption text-brand-primary font-semibold',
              'hover:underline transition-colors'
            )}
          >
            Heute
          </button>
        )}
      </div>

      <button
        onClick={onNext}
        className="p-2 rounded-button border border-brand-border hover:bg-brand-surface transition-colors"
        aria-label="Nächste Woche"
      >
        <ChevronRight className="w-5 h-5 text-brand-text" />
      </button>
    </div>
  )
}
