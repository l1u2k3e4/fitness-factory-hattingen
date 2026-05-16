import { useState, useEffect } from 'react'

export interface OpenStatus {
  isOpen: boolean
  label: string
}

function getStatus(): OpenStatus {
  const now = new Date()
  const tag = now.getDay()
  const stunde = now.getHours()
  const minute = now.getMinutes()
  const zeit = stunde + minute / 60

  const istWochentag = tag >= 1 && tag <= 5
  const istWochenende = tag === 0 || tag === 6

  // Geöffnet
  if (istWochentag && zeit >= 8 && zeit < 23) {
    return { isOpen: true, label: 'Jetzt geöffnet — bis 23:00 Uhr' }
  }
  if (istWochenende && zeit >= 10 && zeit < 17.5) {
    return { isOpen: true, label: 'Jetzt geöffnet — bis 17:30 Uhr' }
  }

  // Geschlossen — nächste Öffnungszeit ermitteln
  // Mo–Do vor 08:00 → heute 8 Uhr
  if (istWochentag && zeit < 8) {
    return { isOpen: false, label: 'Geschlossen — öffnet heute um 8 Uhr' }
  }
  // Sa/So vor 10:00 → heute 10 Uhr
  if (istWochenende && zeit < 10) {
    return { isOpen: false, label: 'Geschlossen — öffnet heute um 10 Uhr' }
  }
  // Mo–Do nach 23:00 → morgen 8 Uhr (Di–Fr)
  if (istWochentag && tag <= 4 && zeit >= 23) {
    return { isOpen: false, label: 'Geschlossen — öffnet morgen um 8 Uhr' }
  }
  // Fr nach 23:00 → morgen 10 Uhr (Sa)
  if (tag === 5 && zeit >= 23) {
    return { isOpen: false, label: 'Geschlossen — öffnet morgen um 10 Uhr' }
  }
  // Sa nach 17:30 → morgen 10 Uhr (So)
  if (tag === 6 && zeit >= 17.5) {
    return { isOpen: false, label: 'Geschlossen — öffnet morgen um 10 Uhr' }
  }
  // So nach 17:30 → morgen 8 Uhr (Mo)
  if (tag === 0 && zeit >= 17.5) {
    return { isOpen: false, label: 'Geschlossen — öffnet morgen um 8 Uhr' }
  }

  return { isOpen: false, label: 'Geschlossen' }
}

export function useOpenStatus(): OpenStatus {
  const [status, setStatus] = useState<OpenStatus>(() => getStatus())

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(getStatus())
    }, 60_000)
    return () => clearInterval(interval)
  }, [])

  return status
}
