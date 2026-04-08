import express from 'express'
import cors from 'cors'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PROJECT_ROOT = path.resolve(__dirname, '..')
const DATA_FILE = path.join(PROJECT_ROOT, 'public', 'data', 'content-overrides.json')
const IMAGES_DIR = path.join(PROJECT_ROOT, 'public', 'images')
const TRAINER_DIR = path.join(PROJECT_ROOT, 'public', 'Trainer')
const HISTORY_DIR = path.join(PROJECT_ROOT, 'public', 'data', 'history')

const PORT = 3002

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

// Serve Dashboard
app.use('/dashboard', express.static(path.join(__dirname)))

// Serve public assets (for image preview in Dashboard)
app.use('/public', express.static(path.join(PROJECT_ROOT, 'public')))

// ---------------------------------------------------------------------------
// Multer for image uploads
// ---------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const target = req.query.type === 'trainer' ? TRAINER_DIR : IMAGES_DIR
    cb(null, target)
  },
  filename: (_req, file, cb) => {
    const safeName = file.originalname
      .toLowerCase()
      .replace(/[^a-z0-9.\-_]/g, '-')
      .replace(/-+/g, '-')
    cb(null, safeName)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
    cb(null, allowed.includes(file.mimetype))
  },
})

// ---------------------------------------------------------------------------
// Ensure directories exist
// ---------------------------------------------------------------------------
async function ensureDirs() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.mkdir(HISTORY_DIR, { recursive: true })
  await fs.mkdir(IMAGES_DIR, { recursive: true })
  await fs.mkdir(TRAINER_DIR, { recursive: true })

  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({
      _meta: {
        lastModified: new Date().toISOString(),
        version: 1,
      },
      galerie: null,
      kursplan: null,
      oeffnungszeiten: null,
      aktionen: null,
      bewertungen: null,
      team: null,
      hero: null,
      banner: null,
      trustbar: null,
    }, null, 2))
  }
}

// ---------------------------------------------------------------------------
// API: Read content
// ---------------------------------------------------------------------------
app.get('/api/content', async (_req, res) => {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    res.json(JSON.parse(raw))
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Lesen der Daten', details: err.message })
  }
})

// ---------------------------------------------------------------------------
// API: Save content (full or partial merge)
// ---------------------------------------------------------------------------
app.put('/api/content', async (req, res) => {
  try {
    const current = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'))

    // Create history snapshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    await fs.writeFile(
      path.join(HISTORY_DIR, `backup-${timestamp}.json`),
      JSON.stringify(current, null, 2)
    )

    // Keep max 20 history files
    const historyFiles = (await fs.readdir(HISTORY_DIR))
      .filter(f => f.endsWith('.json'))
      .sort()
    if (historyFiles.length > 20) {
      for (const old of historyFiles.slice(0, historyFiles.length - 20)) {
        await fs.unlink(path.join(HISTORY_DIR, old))
      }
    }

    // Merge: only overwrite provided modules
    const updated = {
      ...current,
      ...req.body,
      _meta: {
        lastModified: new Date().toISOString(),
        version: (current._meta?.version || 0) + 1,
      },
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2))
    res.json({ success: true, version: updated._meta.version })
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Speichern', details: err.message })
  }
})

// ---------------------------------------------------------------------------
// API: Save single module
// ---------------------------------------------------------------------------
app.put('/api/content/:module', async (req, res) => {
  try {
    const current = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'))
    const moduleName = req.params.module

    // History snapshot
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    await fs.writeFile(
      path.join(HISTORY_DIR, `backup-${timestamp}.json`),
      JSON.stringify(current, null, 2)
    )

    current[moduleName] = req.body
    current._meta = {
      lastModified: new Date().toISOString(),
      version: (current._meta?.version || 0) + 1,
    }

    await fs.writeFile(DATA_FILE, JSON.stringify(current, null, 2))
    res.json({ success: true, module: moduleName, version: current._meta.version })
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Speichern', details: err.message })
  }
})

// ---------------------------------------------------------------------------
// API: Upload image
// ---------------------------------------------------------------------------
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Keine Datei hochgeladen oder ungültiges Format.' })
  }
  const relativePath = req.query.type === 'trainer'
    ? `/Trainer/${req.file.filename}`
    : `/images/${req.file.filename}`

  res.json({
    success: true,
    filename: req.file.filename,
    path: relativePath,
    size: req.file.size,
  })
})

// ---------------------------------------------------------------------------
// API: List images
// ---------------------------------------------------------------------------
app.get('/api/images', async (_req, res) => {
  try {
    const files = await fs.readdir(IMAGES_DIR)
    const images = files
      .filter(f => /\.(jpg|jpeg|png|webp|svg)$/i.test(f))
      .map(f => ({ filename: f, path: `/images/${f}` }))
    res.json(images)
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Lesen der Bilder', details: err.message })
  }
})

app.get('/api/images/trainer', async (_req, res) => {
  try {
    const files = await fs.readdir(TRAINER_DIR)
    const images = files
      .filter(f => /\.(jpg|jpeg|png|webp|svg)$/i.test(f))
      .map(f => ({ filename: f, path: `/Trainer/${f}` }))
    res.json(images)
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Lesen der Trainer-Bilder', details: err.message })
  }
})

// ---------------------------------------------------------------------------
// API: History list + restore
// ---------------------------------------------------------------------------
app.get('/api/history', async (_req, res) => {
  try {
    const files = (await fs.readdir(HISTORY_DIR))
      .filter(f => f.endsWith('.json'))
      .sort()
      .reverse()
    res.json(files.map(f => ({
      filename: f,
      timestamp: f.replace('backup-', '').replace('.json', '').replace(/-/g, ':').replace(/:(\d{3})$/, '.$1'),
    })))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.post('/api/history/restore/:filename', async (req, res) => {
  try {
    const filePath = path.join(HISTORY_DIR, req.params.filename)
    const backup = await fs.readFile(filePath, 'utf-8')
    await fs.writeFile(DATA_FILE, backup)
    res.json({ success: true, restored: req.params.filename })
  } catch (err) {
    res.status(500).json({ error: 'Fehler beim Wiederherstellen', details: err.message })
  }
})

// ---------------------------------------------------------------------------
// API: Google Reviews (Places API)
// ---------------------------------------------------------------------------

// Konfiguration über Umgebungsvariablen oder .env
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || ''
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID || '' // Fitness Factory Hattingen Place ID

let reviewsCache = { data: null, fetchedAt: 0 }
const CACHE_TTL = 60 * 60 * 1000 // 1 Stunde

async function fetchGoogleReviews() {
  if (!GOOGLE_API_KEY || !GOOGLE_PLACE_ID) return null

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=rating,user_ratings_total&key=${GOOGLE_API_KEY}`
    const res = await fetch(url)
    const json = await res.json()

    if (json.status === 'OK' && json.result) {
      return {
        rating: json.result.rating,
        totalReviews: json.result.user_ratings_total,
        fetchedAt: new Date().toISOString(),
      }
    }
    console.warn('[Google Reviews] API Antwort:', json.status)
    return null
  } catch (err) {
    console.error('[Google Reviews] Fehler:', err.message)
    return null
  }
}

async function updateTrustBarWithReviews() {
  const now = Date.now()
  if (reviewsCache.data && (now - reviewsCache.fetchedAt) < CACHE_TTL) return reviewsCache.data

  const reviews = await fetchGoogleReviews()
  if (!reviews) return reviewsCache.data // Fallback auf letzte bekannte Werte

  reviewsCache = { data: reviews, fetchedAt: now }

  // Auto-Update in content-overrides.json
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    const data = JSON.parse(raw)
    data.trustbar = {
      ...(data.trustbar || {}),
      rating: reviews.rating,
      totalReviews: reviews.totalReviews,
      lastGoogleSync: reviews.fetchedAt,
    }
    data._meta = { ...data._meta, lastModified: new Date().toISOString(), version: (data._meta?.version || 0) + 1 }
    await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2))
    console.log(`[Google Reviews] Aktualisiert: ${reviews.rating}★ (${reviews.totalReviews} Bewertungen)`)
  } catch (err) {
    console.error('[Google Reviews] Konnte content-overrides nicht aktualisieren:', err.message)
  }

  return reviews
}

app.get('/api/google-reviews', async (_req, res) => {
  const reviews = await updateTrustBarWithReviews()
  if (reviews) {
    res.json({ success: true, ...reviews })
  } else {
    res.json({ success: false, message: 'Google API nicht konfiguriert oder nicht erreichbar. Setze GOOGLE_API_KEY und GOOGLE_PLACE_ID als Umgebungsvariablen.' })
  }
})

// Auto-Sync: Alle 60 Minuten Google Reviews aktualisieren
if (GOOGLE_API_KEY && GOOGLE_PLACE_ID) {
  setInterval(updateTrustBarWithReviews, CACHE_TTL)
  // Initial fetch nach 5 Sekunden (Server-Start)
  setTimeout(updateTrustBarWithReviews, 5000)
}

// ---------------------------------------------------------------------------
// API: Analytics (Page-View-Tracking)
// ---------------------------------------------------------------------------

const ANALYTICS_FILE = path.join(PROJECT_ROOT, 'public', 'data', 'analytics.json')

async function loadAnalytics() {
  try {
    const raw = await fs.readFile(ANALYTICS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return { events: [] }
  }
}

async function saveAnalytics(data) {
  await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2))
}

// Empfange Page-View-Events
app.post('/api/track', async (req, res) => {
  try {
    const { page, referrer, device, browser, timestamp } = req.body
    if (!page) return res.status(400).json({ error: 'page required' })

    const analytics = await loadAnalytics()

    // Event hinzufügen
    analytics.events.push({
      page: page || '/',
      referrer: referrer || 'direct',
      device: device || 'unknown',
      browser: browser || 'unknown',
      timestamp: timestamp || new Date().toISOString(),
    })

    // Max 90 Tage behalten
    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - 90)
    analytics.events = analytics.events.filter(e => new Date(e.timestamp) > cutoff)

    await saveAnalytics(analytics)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Aggregierte Analytics-Daten für Dashboard
app.get('/api/analytics', async (_req, res) => {
  try {
    const analytics = await loadAnalytics()
    const events = analytics.events || []
    const now = new Date()

    // Heute, diese Woche, dieser Monat
    const todayStr = now.toISOString().slice(0, 10)
    const weekAgo = new Date(now); weekAgo.setDate(weekAgo.getDate() - 7)
    const monthAgo = new Date(now); monthAgo.setDate(monthAgo.getDate() - 30)

    const today = events.filter(e => e.timestamp?.startsWith(todayStr))
    const week = events.filter(e => new Date(e.timestamp) > weekAgo)
    const month = events.filter(e => new Date(e.timestamp) > monthAgo)

    // Top-Seiten
    const pageCount = {}
    month.forEach(e => { pageCount[e.page] = (pageCount[e.page] || 0) + 1 })
    const topPages = Object.entries(pageCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([page, count]) => ({ page, count }))

    // Gerätetypen
    const devices = { mobile: 0, tablet: 0, desktop: 0 }
    month.forEach(e => { if (devices[e.device] !== undefined) devices[e.device]++ })

    // Referrer-Quellen
    const refCount = {}
    month.forEach(e => { refCount[e.referrer] = (refCount[e.referrer] || 0) + 1 })
    const topReferrers = Object.entries(refCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([source, count]) => ({ source, count }))

    // Besucher pro Tag (letzte 30 Tage)
    const dailyCounts = {}
    for (let i = 0; i < 30; i++) {
      const d = new Date(now); d.setDate(d.getDate() - i)
      const key = d.toISOString().slice(0, 10)
      dailyCounts[key] = 0
    }
    month.forEach(e => {
      const key = e.timestamp?.slice(0, 10)
      if (key && dailyCounts[key] !== undefined) dailyCounts[key]++
    })
    const dailyTimeline = Object.entries(dailyCounts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }))

    // Peak Hours
    const hourCounts = new Array(24).fill(0)
    month.forEach(e => {
      const h = new Date(e.timestamp).getHours()
      if (!isNaN(h)) hourCounts[h]++
    })

    // CTA-Klicks (referrer === 'cta-click')
    const ctaEvents = month.filter(e => e.referrer === 'cta-click')
    const ctaCount = {}
    ctaEvents.forEach(e => { ctaCount[e.browser] = (ctaCount[e.browser] || 0) + 1 })

    // Bounce Rate (Besucher die nur 1 Seite sehen — geschätzt über Sessions)
    const internalEvents = month.filter(e => e.referrer !== 'cta-click')
    const totalViews = internalEvents.length
    const bouncedViews = internalEvents.filter(e => e.referrer !== 'internal').length
    const bounceRate = totalViews > 0 ? Math.round((bouncedViews / totalViews) * 100) : 0

    res.json({
      today: today.length,
      week: week.length,
      month: month.length,
      topPages,
      devices,
      topReferrers,
      dailyTimeline,
      peakHours: hourCounts,
      ctaClicks: ctaCount,
      bounceRate,
      totalEvents: events.length,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Realtime: Aktive Sessions der letzten 5 Minuten
app.get('/api/analytics/realtime', async (_req, res) => {
  try {
    const analytics = await loadAnalytics()
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000)
    const recent = (analytics.events || []).filter(e => new Date(e.timestamp) > fiveMinAgo)
    res.json({ activeVisitors: recent.length, recentPages: recent.map(e => e.page) })
  } catch {
    res.json({ activeVisitors: 0, recentPages: [] })
  }
})

// ---------------------------------------------------------------------------
// API: Server status
// ---------------------------------------------------------------------------
app.get('/api/status', async (_req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'))
    const stat = await fs.stat(DATA_FILE)
    res.json({
      online: true,
      lastModified: data._meta?.lastModified || stat.mtime.toISOString(),
      version: data._meta?.version || 0,
      fileSize: stat.size,
    })
  } catch (err) {
    res.json({ online: false, error: err.message })
  }
})

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
await ensureDirs()
app.listen(PORT, () => {
  console.log('')
  console.log('  +------------------------------------------------------+')
  console.log('  |                                                      |')
  console.log('  |   Fitness Factory — Content Dashboard                |')
  console.log('  |                                                      |')
  console.log(`  |   Dashboard:  http://localhost:${PORT}/dashboard       |`)
  console.log(`  |   API:        http://localhost:${PORT}/api/content     |`)
  console.log('  |                                                      |')
  console.log('  |   Website:    http://localhost:5173                   |')
  console.log('  |                                                      |')
  console.log('  +------------------------------------------------------+')
  console.log('')
})
