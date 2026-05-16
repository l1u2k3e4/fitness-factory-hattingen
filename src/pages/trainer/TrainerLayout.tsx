import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { CalendarDays, CalendarRange, BarChart3, LogOut } from 'lucide-react'
import { cn } from '@/lib/cn'
import { useAuth } from '@/contexts/AuthContext'

const navItems = [
  { to: '/trainer/heute', label: 'Heute', icon: CalendarDays },
  { to: '/trainer/woche', label: 'Woche', icon: CalendarRange },
  { to: '/trainer/statistiken', label: 'Statistiken', icon: BarChart3 },
]

export default function TrainerLayout() {
  const { trainer, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/trainer')
  }

  return (
    <div className="min-h-screen bg-brand-surface">
      {/* Top Bar */}
      <header className="bg-brand-bg border-b border-brand-border px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-black text-body-lg text-brand-primary tracking-tight">
              FF
            </span>
            <span className="font-display font-bold text-body text-brand-text">
              Trainer-Dashboard
            </span>
            {trainer && (
              <span className="font-body text-body-sm text-brand-muted hidden sm:inline">
                — {trainer.name} {trainer.role === 'admin' ? '(Admin)' : ''}
              </span>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 font-body text-body-sm text-brand-muted hover:text-brand-text transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Abmelden</span>
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-brand-bg border-b border-brand-border">
        <div className="max-w-5xl mx-auto flex">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-2 px-4 py-3 font-body font-medium text-body-sm border-b-2 transition-colors',
                  isActive
                    ? 'text-brand-primary border-brand-primary'
                    : 'text-brand-muted border-transparent hover:text-brand-text hover:border-brand-border'
                )
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}
