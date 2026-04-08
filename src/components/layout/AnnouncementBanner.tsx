import { useState } from 'react'
import { X, Info, AlertTriangle, CheckCircle, Megaphone } from 'lucide-react'
import { useDynamicBanner } from '@/contexts/ContentContext'

const typeConfig = {
  info: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', icon: Info },
  aktion: { bg: 'bg-red-50 border-brand-primary/20', text: 'text-brand-primary', icon: Megaphone },
  hinweis: { bg: 'bg-yellow-50 border-yellow-200', text: 'text-yellow-800', icon: AlertTriangle },
  erfolg: { bg: 'bg-green-50 border-green-200', text: 'text-green-800', icon: CheckCircle },
}

export default function AnnouncementBanner() {
  const banner = useDynamicBanner()
  const [dismissed, setDismissed] = useState(false)

  if (!banner || dismissed) return null

  const config = typeConfig[banner.typ as keyof typeof typeConfig] || typeConfig.info
  const Icon = config.icon

  return (
    <div className={`${config.bg} border-b px-4 py-2.5`}>
      <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-3 text-center">
        <Icon className={`w-4 h-4 ${config.text} flex-shrink-0`} />
        <p className={`font-body text-body-sm ${config.text}`}>
          {banner.text}
          {banner.link && (
            <a
              href={banner.link.href}
              className={`${config.text} font-bold underline underline-offset-2 ml-2`}
            >
              {banner.link.text} →
            </a>
          )}
        </p>
        {banner.dismissable && (
          <button
            onClick={() => setDismissed(true)}
            className={`${config.text} hover:opacity-70 flex-shrink-0 ml-2`}
            aria-label="Banner schließen"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  )
}
