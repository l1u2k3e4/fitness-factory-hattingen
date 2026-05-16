import { useState, useEffect } from 'react'
import { Loader2, TrendingUp, Calendar, Users, XCircle } from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import type { TrainerStats } from '@/types/booking'

export default function TrainerStatistikenPage() {
  const [stats, setStats] = useState<TrainerStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [range, setRange] = useState<'30' | '90' | '365'>('30')

  useEffect(() => {
    async function fetchStats() {
      setLoading(true)
      const to = new Date().toISOString().split('T')[0]
      const from = new Date(Date.now() - parseInt(range) * 86400000).toISOString().split('T')[0]

      const { data } = await supabase.rpc('get_trainer_stats', { p_from: from, p_to: to })
      setStats(data as TrainerStats | null)
      setLoading(false)
    }
    fetchStats()
  }, [range])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    )
  }

  if (!stats) {
    return <p className="font-body text-body text-brand-muted text-center py-12">Keine Statistiken verfügbar.</p>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display font-bold text-h3 text-brand-text">Statistiken</h1>
        <div className="flex gap-1 bg-brand-surface border border-brand-border rounded-button p-0.5">
          {([['30', '30 Tage'], ['90', '90 Tage'], ['365', '1 Jahr']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setRange(val)}
              className={`font-body text-caption font-medium px-3 py-1.5 rounded-button transition-colors ${
                range === val
                  ? 'bg-brand-bg text-brand-text shadow-sm'
                  : 'text-brand-muted hover:text-brand-text'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatCard
          icon={Calendar}
          label="Kurse"
          value={stats.total_courses}
        />
        <StatCard
          icon={Users}
          label="Buchungen"
          value={stats.total_bookings}
        />
        <StatCard
          icon={TrendingUp}
          label="Ø Auslastung"
          value={`${stats.popular_courses?.[0]?.avg_occupancy_pct ?? 0}%`}
        />
        <StatCard
          icon={XCircle}
          label="Stornoquote"
          value={`${stats.cancellation_rate}%`}
        />
      </div>

      {/* Beliebte Kurse */}
      {stats.popular_courses && stats.popular_courses.length > 0 && (
        <section>
          <h2 className="font-display font-bold text-h4 text-brand-text mb-3 pb-2 border-b border-brand-border">
            Beliebte Kurse
          </h2>
          <div className="flex flex-col gap-2">
            {stats.popular_courses.map((course, i) => (
              <div
                key={course.name}
                className="flex items-center justify-between py-3 px-4 rounded-card bg-brand-bg border border-brand-border"
              >
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-body-lg text-brand-muted w-6 text-right">
                    {i + 1}
                  </span>
                  <span className="font-body font-medium text-body text-brand-text">
                    {course.name}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-body text-body-sm text-brand-muted">
                    {course.total_bookings} Buchungen
                  </span>
                  <div className="w-20 bg-brand-surface rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-brand-primary rounded-full transition-all"
                      style={{ width: `${Math.min(course.avg_occupancy_pct, 100)}%` }}
                    />
                  </div>
                  <span className="font-body text-caption text-brand-muted w-10 text-right">
                    {course.avg_occupancy_pct}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <div className="bg-brand-bg border border-brand-border rounded-card p-4 shadow-card">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-brand-primary" />
        <span className="font-body text-caption text-brand-muted uppercase tracking-wider">{label}</span>
      </div>
      <span className="font-display font-black text-h3 text-brand-text">{value}</span>
    </div>
  )
}
