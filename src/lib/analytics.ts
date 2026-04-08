/**
 * Leichtgewichtiges Page-View-Tracking.
 * Sendet anonyme Events an den Dashboard-Server.
 * Kein Cookie-Consent nötig — keine personenbezogenen Daten.
 */

const TRACK_URL = '/api/track'
const DASHBOARD_PORT = 3001

function getDeviceType(): string {
  const w = window.innerWidth
  if (w < 768) return 'mobile'
  if (w < 1024) return 'tablet'
  return 'desktop'
}

function getBrowser(): string {
  const ua = navigator.userAgent
  if (ua.includes('Firefox')) return 'Firefox'
  if (ua.includes('Edg')) return 'Edge'
  if (ua.includes('Chrome')) return 'Chrome'
  if (ua.includes('Safari')) return 'Safari'
  return 'Other'
}

function getReferrerDomain(): string {
  try {
    if (!document.referrer) return 'direct'
    const url = new URL(document.referrer)
    if (url.hostname === window.location.hostname) return 'internal'
    return url.hostname.replace('www.', '')
  } catch {
    return 'unknown'
  }
}

export function trackPageView(page: string): void {
  const event = {
    page,
    referrer: getReferrerDomain(),
    device: getDeviceType(),
    browser: getBrowser(),
    timestamp: new Date().toISOString(),
  }

  // Versuche zuerst den Dashboard-Server, dann fallback auf relativen Pfad
  const urls = [
    `http://localhost:${DASHBOARD_PORT}${TRACK_URL}`,
    TRACK_URL,
  ]

  // Fire-and-forget — blockiert nicht die UI
  for (const url of urls) {
    try {
      navigator.sendBeacon(url, JSON.stringify(event))
      break
    } catch {
      // Fallback auf fetch
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
        keepalive: true,
      }).catch(() => {})
      break
    }
  }
}

/**
 * Trackt CTA-Klicks (Probetraining, Anrufen, WhatsApp).
 */
export function trackCtaClick(ctaName: string): void {
  const event = {
    page: window.location.pathname,
    referrer: 'cta-click',
    device: getDeviceType(),
    browser: ctaName,
    timestamp: new Date().toISOString(),
  }

  try {
    navigator.sendBeacon(
      `http://localhost:${DASHBOARD_PORT}${TRACK_URL}`,
      JSON.stringify(event)
    )
  } catch {
    // Silent fail
  }
}
