# Bugfix-Prompt: Fitness Factory Website — Kaputte Bilder, fehlende Base-URL, Performance

> **Anleitung:** Kopiere diesen gesamten Text als Prompt in Claude Code.
> Er behebt alle gefundenen Fehler Schritt für Schritt.

---

## Kontext

Die Fitness Factory Website (`Website_Factory/`) wird auf GitHub Pages unter dem Subdirectory-Pfad `/fitness-factory-hattingen/` gehostet. Die Vite-Config hat `base: '/fitness-factory-hattingen/'` gesetzt. Das Problem: An vielen Stellen fehlt dieser Base-URL-Prefix, wodurch Bilder, Favicons, Fonts und Fetch-Requests auf Production 404 liefern (weißes Fragezeichen im blauen Viereck = kaputtes Bild).

Es gibt eine `assetUrl()` Helper-Funktion in `src/lib/assetUrl.ts`, die Pfade korrekt mit `import.meta.env.BASE_URL` prefixed. Einige Stellen nutzen sie, andere nicht.

**Bitte behebe ALLE unten aufgelisteten Bugs der Reihe nach. Führe am Ende `npm run build` aus, um sicherzustellen, dass alles kompiliert.**

---

## Bug 1: `index.html` — Hardcodierte Pfade ohne Base-URL

**Datei:** `index.html`

Die folgenden Pfade beginnen mit `/` statt mit dem Vite-Base-Pfad. Vite transformiert `index.html`-Pfade NICHT automatisch (nur für `<script>` und `<link rel="stylesheet">`).

**Zu fixen (ersetze `/` durch `/fitness-factory-hattingen/`):**

| Zeile | Aktuell | Soll |
|-------|---------|------|
| 8 | `href="/favicon.png"` | `href="/fitness-factory-hattingen/favicon.png"` |
| 9 | `href="/favicon-32x32.png"` | `href="/fitness-factory-hattingen/favicon-32x32.png"` |
| 10 | `href="/favicon-16x16.png"` | `href="/fitness-factory-hattingen/favicon-16x16.png"` |
| 11 | `href="/apple-touch-icon.png"` | `href="/fitness-factory-hattingen/apple-touch-icon.png"` |
| 12 | `href="/site.webmanifest"` | `href="/fitness-factory-hattingen/site.webmanifest"` |
| 60 | `href="/images/studio-dsc-01.jpg"` | `href="/fitness-factory-hattingen/images/studio-dsc-01.jpg"` |
| 65 | `href="/fonts/bebas-neue/bebas-neue-400.woff2"` | `href="/fitness-factory-hattingen/fonts/bebas-neue/bebas-neue-400.woff2"` |
| 72 | `href="/fonts/inter/inter-400.woff2"` | `href="/fitness-factory-hattingen/fonts/inter/inter-400.woff2"` |

**WICHTIG:** Falls die Seite später auf einer Root-Domain (ohne Subdirectory) deployed wird, müssen diese Pfade wieder angepasst werden. Alternativ kann man ein Script im Build-Prozess nutzen, das die Pfade dynamisch setzt.

---

## Bug 2: `contentLoader.ts` — Fetch-Pfad ohne Base-URL

**Datei:** `src/lib/contentLoader.ts`, Zeile 78

**Aktuell:**
```typescript
const response = await fetch('/data/content-overrides.json', {
```

**Fix:**
```typescript
const response = await fetch(`${import.meta.env.BASE_URL}data/content-overrides.json`, {
```

**Warum:** Der Fetch ruft `domain.com/data/content-overrides.json` auf statt `domain.com/fitness-factory-hattingen/data/content-overrides.json`. Auf GitHub Pages gibt es die Datei nur unter dem Subdirectory-Pfad.

---

## Bug 3: `content.ts` — GALERIE-Bilder ohne `assetUrl()`

**Datei:** `src/data/content.ts`, Zeilen 588–657

Die GALERIE-Bildpfade sind hardcodiert (z.B. `src: '/images/studio-dsc-01.jpg'`). Zwar ruft `OptimizedImage` intern `assetUrl()` auf den `src`-Prop auf, aber:
1. Falls Galerie-Daten als JSON in Content-Overrides geladen werden, wird `assetUrl()` NICHT angewendet
2. Es ist inkonsistent mit dem Rest der Codebase

**Fix:** Importiere und verwende `assetUrl()` für alle GALERIE-Einträge:

```typescript
import { assetUrl } from '@/lib/assetUrl'
```

Dann jeden `src`-Wert wrappen:
```typescript
// VORHER:
src: '/images/studio-dsc-01.jpg',

// NACHHER:
src: assetUrl('/images/studio-dsc-01.jpg'),
```

Das betrifft alle 14 Einträge in `GALERIE.bilder` (Zeilen 588–657), also:
- `/images/studio-dsc-01.jpg` bis `/images/studio-dsc-08.jpg` (8 Stück)
- `/images/studio-galerie-01.jpg` (1 Stück)
- `/Galerie/Sauna/Sauna_Außenbereich_01.jpeg` (1 Stück)
- `/Galerie/Sauna/Sauna_Innenbereich_01.jpeg` (1 Stück)
- `/Galerie/Sauna/Sauna_Innenbereich_02.jpeg` (1 Stück)
- `/Galerie/Lounge/Theke-Lounge.jpeg` (1 Stück)
- `/Galerie/Kursraum/Kurs_Video.mp4` (1 Stück)

**WICHTIG:** Da `OptimizedImage` intern ebenfalls `assetUrl()` aufruft, entsteht ein doppeltes Prefixing. Du musst ENTWEDER:
- **Option A:** `assetUrl()` in `content.ts` anwenden UND in `OptimizedImage.tsx` das `assetUrl()` entfernen (Zeile 38: `const resolvedSrc = src` statt `assetUrl(src)`)
- **Option B:** Die Galerie-Pfade in `content.ts` NICHT wrappen, aber sicherstellen dass `OptimizedImage` IMMER die Bilder rendert (auch bei Content-Overrides)

**Empfehlung:** Option A — assetUrl() gehört in die Daten-Schicht, nicht in die Render-Schicht. Dann prüfe ALLE Stellen, die `OptimizedImage` nutzen, und stelle sicher, dass die `src`-Props bereits mit `assetUrl()` gewrapped sind. Suche dazu nach allen `<OptimizedImage` Aufrufen.

---

## Bug 4: TeamSection — Fehlende `width`/`height` Attribute

**Datei:** `src/components/sections/TeamSection.tsx`, Zeile 64–69

**Aktuell:**
```tsx
<img
  src={assetUrl(trainer.foto)}
  alt={`${trainer.name} — ${trainer.rolle}`}
  className="w-full h-full object-cover object-top"
  loading="lazy"
/>
```

**Fix — füge `width`, `height` und `decoding` hinzu:**
```tsx
<img
  src={assetUrl(trainer.foto)}
  alt={`${trainer.name} — ${trainer.rolle}`}
  className="w-full h-full object-cover object-top"
  loading="lazy"
  decoding="async"
  width={600}
  height={450}
/>
```

**Warum:** Ohne `width`/`height` kann der Browser das Layout nicht vorab berechnen. Das Bild springt beim Laden rein → Cumulative Layout Shift (CLS), besonders sichtbar auf Mobile.

---

## Bug 5: Riesige Bilder ohne WebP (Performance-Killer auf Mobile)

Die folgenden Bilder im `public/`-Ordner sind unverhältnismäßig groß und werden ohne WebP-Konvertierung ausgeliefert:

| Datei | Größe | Problem |
|-------|-------|---------|
| `Trainer/Alex_02.jpeg` | **8.3 MB** | Viel zu groß für Web |
| `Galerie/Sauna/Sauna_Außenbereich_01.jpeg` | **4.1 MB** | Viel zu groß |
| `Galerie/Sauna/Sauna_Innenbereich_01.jpeg` | **4.0 MB** | Viel zu groß |
| `Galerie/Lounge/Theke-Lounge.jpeg` | **4.0 MB** | Viel zu groß |
| `Galerie/Sauna/Sauna_Innenbereich_02.jpeg` | **3.9 MB** | Viel zu groß |
| `Trainer/Alex.jpeg` | **3.6 MB** | Viel zu groß |
| `Trainer/Carla.jpeg` | **2.9 MB** | Viel zu groß |
| `images/cta-bg.jpg` | **572 KB** | Könnte kleiner sein |
| `images/aktion-fremdgeh-full.jpg` | **564 KB** | Könnte kleiner sein |
| `images/hero-bg.jpg` | **520 KB** | Könnte kleiner sein |

**Fix:** Erstelle ein Build-Script, das alle Bilder zu WebP konvertiert:

```bash
# scripts/optimize-images.sh
#!/bin/bash
# Benötigt: npm install -D sharp-cli ODER brew install webp

echo "Optimiere Bilder zu WebP..."

# Trainer-Fotos (max 800px breit, Qualität 80)
for f in public/Trainer/*.jpeg; do
  [ -f "$f" ] || continue
  name="${f%.*}"
  npx sharp -i "$f" -o "${name}.webp" -- resize 800 --webp '{"quality": 80}'
  echo "  ✓ $f → ${name}.webp"
done

# Galerie-Fotos (max 1200px breit, Qualität 80)
find public/Galerie -name "*.jpeg" | while read f; do
  name="${f%.*}"
  npx sharp -i "$f" -o "${name}.webp" -- resize 1200 --webp '{"quality": 80}'
  echo "  ✓ $f → ${name}.webp"
done

# Studio-Bilder (max 1200px breit, Qualität 80)
for f in public/images/*.jpg; do
  [ -f "$f" ] || continue
  name="${f%.*}"
  npx sharp -i "$f" -o "${name}.webp" -- resize 1200 --webp '{"quality": 80}'
  echo "  ✓ $f → ${name}.webp"
done

echo "Fertig!"
```

Alternativ kannst du `sharp` direkt in Node verwenden:

```typescript
// scripts/optimize-images.ts
import sharp from 'sharp'
import { globSync } from 'fs'
import path from 'path'

const images = [
  ...globSync('public/Trainer/*.jpeg'),
  ...globSync('public/Galerie/**/*.jpeg'),
  ...globSync('public/images/*.jpg'),
]

for (const img of images) {
  const output = img.replace(/\.(jpe?g|png)$/i, '.webp')
  await sharp(img)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output)
  console.log(`✓ ${path.basename(img)} → ${path.basename(output)}`)
}
```

**Nach der Konvertierung:**
1. Aktualisiere alle Bildpfade in `content.ts` von `.jpeg`/`.jpg` auf `.webp`
2. Aktiviere die WebP-Auto-Derivation in `OptimizedImage.tsx` wieder (Zeile 36-37)
3. Aktualisiere den Hero-Preload in `index.html` auf WebP

---

## Bug 6: `<a href="/datenschutz">` statt `<Link to="/datenschutz">`

**Betroffene Dateien:**
- `src/pages/ProbetrainingPage.tsx`, Zeile 352
- `src/pages/AgbPage.tsx`, Zeile 140
- `src/pages/MitgliedschaftPage.tsx`, Zeile 443
- `src/components/layout/CookieConsent.tsx`, Zeile 256
- `src/components/sections/KontaktSection.tsx`, Zeile 425

**Problem:** `<a href="/datenschutz">` löst einen vollen Page-Reload aus statt eines flüssigen SPA-Übergangs. Auf Mobile ist das besonders spürbar (Bildschirm blitzt weiß, Ladezeit steigt).

**Fix:** Ersetze jedes `<a href="/datenschutz"...>` durch `<Link to="/datenschutz"...>` von react-router-dom:

```tsx
// VORHER:
<a href="/datenschutz" className="text-brand-primary hover:text-brand-primary-hover underline">
  Datenschutzerklärung
</a>

// NACHHER:
import { Link } from 'react-router-dom'

<Link to="/datenschutz" className="text-brand-primary hover:text-brand-primary-hover underline">
  Datenschutzerklärung
</Link>
```

**Hinweis:** In `AgbPage.tsx` steht `href="/datenschutz/"` (mit Trailing Slash). Beim Ersetzen durch `<Link>` den Trailing Slash entfernen: `to="/datenschutz"`.

---

## Reihenfolge der Ausführung

1. **Bug 1** zuerst — `index.html` Pfade fixen (Favicons, Font-Preloads, Bild-Preload)
2. **Bug 2** — `contentLoader.ts` Fetch-Pfad fixen
3. **Bug 3** — Entscheide dich für Option A oder B, dann Galerie-Pfade fixen
4. **Bug 4** — TeamSection `width`/`height` hinzufügen
5. **Bug 5** — Bilder zu WebP konvertieren (falls `sharp` als Dependency vorhanden)
6. **Bug 6** — `<a href>` durch `<Link>` ersetzen

## Verification

Nach allen Fixes:

```bash
npm run build
```

Dann prüfe:
- [ ] `dist/index.html` — alle Pfade enthalten `/fitness-factory-hattingen/`
- [ ] Öffne die Seite auf dem Handy (oder Chrome DevTools → Mobile Simulation)
- [ ] Alle Bilder laden auf allen Seiten (Home, Galerie, Team, Kontakt)
- [ ] Keine weißen Fragezeichen / kaputte Bilder
- [ ] Datenschutz-Links navigieren ohne Page-Reload
- [ ] Lighthouse Mobile Score prüfen (sollte > 80 sein)
