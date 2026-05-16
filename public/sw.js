const CACHE_NAME = 'ff-kurse-v1'
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
]

// Install: Cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  )
  self.skipWaiting()
})

// Activate: Clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  )
  self.clients.claim()
})

// Fetch: Network-first for API, Cache-first for static
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // API/Supabase calls: network only
  if (url.hostname.includes('supabase') || url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request))
    return
  }

  // Static assets: cache-first
  if (request.destination === 'style' || request.destination === 'script' || request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    )
    return
  }

  // Navigation: network-first with fallback
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/') || new Response('Offline', { status: 503 }))
    )
    return
  }

  event.respondWith(fetch(request))
})

// Push Notifications
self.addEventListener('push', (event) => {
  const data = event.data?.json() ?? {}
  const title = data.title || 'Fitness Factory'
  const options = {
    body: data.body || '',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-192x192.png',
    data: data.url ? { url: data.url } : undefined,
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

// Notification click: open URL
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const url = event.notification.data?.url || '/'
  event.waitUntil(clients.openWindow(url))
})
