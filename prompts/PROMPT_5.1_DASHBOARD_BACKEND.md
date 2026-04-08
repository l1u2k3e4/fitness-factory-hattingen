# PROMPT 5.1 — Dashboard Backend: API-Server + JSON Storage

## Ziel
Erstelle einen kleinen Express-Server der:
1. Die Vite-Dev-Website weiterhin auf Port 5173 laufen lässt
2. Eine REST-API auf Port 3001 bereitstellt zum Lesen/Schreiben von Content-Daten
3. Bilder-Uploads annimmt und in `public/images/` speichert
4. Die Dashboard-HTML-Datei ausliefert

## Verzeichnisstruktur

```
Website_Factory/
├── Dashboard/
│   ├── index.html          ← Das Dashboard (Prompt 5.2)
│   └── server.js           ← Express API-Server (dieser Prompt)
├── public/
│   ├── data/
│   │   └── content-overrides.json   ← Dynamische Inhalte
│   ├── images/              ← Galerie-Bilder + Uploads
│   └── Trainer/             ← Trainer-Fotos
├── src/
│   └── data/
│       └── content.ts       ← Statische Defaults (Fallback)
└── package.json
```

## Datei: `Dashboard/server.js`

```javascript
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

const PORT = 3001

const app = express()
app.use(cors())
app.use(express.json({ limit: '50mb' }))

// Serve Dashboard
app.use('/dashboard', express.static(path.join(__dirname)))

// Serve public assets (für Bildvorschau im Dashboard)
app.use('/public', express.static(path.join(PROJECT_ROOT, 'public')))

// ---------------------------------------------------------------------------
// Multer für Bild-Uploads
// ---------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (req, _file, cb) => {
    const target = req.query.type === 'trainer' ? TRAINER_DIR : IMAGES_DIR
    cb(null, target)
  },
  filename: (_req, file, cb) => {
    // Originalnamen beibehalten, aber Sonderzeichen ersetzen
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
// Sicherstellen dass Verzeichnisse existieren
// ---------------------------------------------------------------------------
async function ensureDirs() {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true })
  await fs.mkdir(HISTORY_DIR, { recursive: true })
  await fs.mkdir(IMAGES_DIR, { recursive: true })
  await fs.mkdir(TRAINER_DIR, { recursive: true })

  try {
    await fs.access(DATA_FILE)
  } catch {
    // Initial-Datei erstellen
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
    }, null, 2))
  }
}

// ---------------------------------------------------------------------------
// API: Content lesen
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
// API: Content speichern (einzelnes Modul oder komplett)
// ---------------------------------------------------------------------------
app.put('/api/content', async (req, res) => {
  try {
    const current = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'))

    // History-Snapshot erstellen
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    await fs.writeFile(
      path.join(HISTORY_DIR, `backup-${timestamp}.json`),
      JSON.stringify(current, null, 2)
    )

    // Nur maximal 20 History-Dateien behalten
    const historyFiles = (await fs.readdir(HISTORY_DIR))
      .filter(f => f.endsWith('.json'))
      .sort()
    if (historyFiles.length > 20) {
      for (const old of historyFiles.slice(0, historyFiles.length - 20)) {
        await fs.unlink(path.join(HISTORY_DIR, old))
      }
    }

    // Merge: nur die übergebenen Module überschreiben
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
// API: Einzelnes Modul speichern
// ---------------------------------------------------------------------------
app.put('/api/content/:module', async (req, res) => {
  try {
    const current = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'))
    const moduleName = req.params.module

    // History-Snapshot
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
// API: Bild hochladen
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
// API: Bilder auflisten
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
// API: History auflisten + Restore
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
// API: Website-Status prüfen
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
  console.log('  ┌──────────────────────────────────────────────────────┐')
  console.log('  │                                                      │')
  console.log('  │   🏋️  Fitness Factory — Content Dashboard             │')
  console.log('  │                                                      │')
  console.log(`  │   Dashboard:  http://localhost:${PORT}/dashboard       │`)
  console.log(`  │   API:        http://localhost:${PORT}/api/content     │`)
  console.log('  │                                                      │')
  console.log('  │   Website:    http://localhost:5173                   │')
  console.log('  │                                                      │')
  console.log('  └──────────────────────────────────────────────────────┘')
  console.log('')
})
```

## Dependencies installieren

Füge folgende Packages zum Projekt hinzu:

```bash
npm install express cors multer
```

## package.json Scripts erweitern

Füge ein neues Script hinzu:

```json
{
  "scripts": {
    "dev": "vite",
    "dashboard": "node Dashboard/server.js",
    "dev:all": "concurrently \"npm run dev\" \"npm run dashboard\"",
    "build": "tsc -b && vite build && cp public/.htaccess dist/.htaccess",
    "lint": "eslint .",
    "preview": "vite preview"
  }
}
```

Installiere auch:
```bash
npm install concurrently --save-dev
```

Dann kann der Kunde einfach `npm run dev:all` starten — oder für eine vereinfachte Lösung:

Erstelle `Dashboard/start.bat` (Windows):
```bat
@echo off
echo.
echo   Fitness Factory Dashboard wird gestartet...
echo.
cd /d "%~dp0\.."
start "" http://localhost:3001/dashboard
node Dashboard/server.js
```

Erstelle `Dashboard/start.sh` (Mac):
```bash
#!/bin/bash
cd "$(dirname "$0")/.."
open http://localhost:3001/dashboard
node Dashboard/server.js
```

## Verifikation
1. `node Dashboard/server.js` startet ohne Fehler
2. `http://localhost:3001/api/content` gibt JSON zurück
3. `http://localhost:3001/api/images` listet Bilder auf
4. `http://localhost:3001/api/status` zeigt Serverstatus
5. PUT auf `/api/content/galerie` speichert Daten und erstellt Backup
6. POST auf `/api/upload` nimmt Bilder an
7. `public/data/content-overrides.json` wird korrekt gelesen/geschrieben
