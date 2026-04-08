# PROMPT 3.2 — Favicon Fix (Fitness Factory statt AkquiseFlow)

## Ziel
Ersetze das aktuelle AkquiseFlow-Favicon durch das Fitness Factory Logo. Generiere alle nötigen Favicon-Formate aus dem vorhandenen Logo.

## Ausgangslage
- Das Fitness Factory Logo liegt unter: `public/images/logo-fitness-factory.png` (17KB)
- Alternativ als JPG: `public/images/logo-ff-jpg.jpg` (58KB)
- In `index.html` werden folgende Dateien referenziert, die aktuell NICHT existieren:
  - `/favicon.svg`
  - `/favicon-32x32.png`
  - `/favicon-16x16.png`
  - `/apple-touch-icon.png`

## Aufgabe

### Schritt 1: Favicon-Dateien generieren
Verwende das Logo `public/images/logo-fitness-factory.png` als Quelle und erstelle:

1. **`public/favicon.svg`** — SVG-Version des Logos (wenn möglich aus PNG konvertieren, sonst ein einfaches SVG mit dem "FF" oder dem Logo-Motiv erstellen)
2. **`public/favicon-32x32.png`** — 32×32px PNG
3. **`public/favicon-16x16.png`** — 16×16px PNG
4. **`public/apple-touch-icon.png`** — 180×180px PNG

Nutze dafür `sharp` (npm-Paket) oder ein Canvas-basiertes Script:

```bash
npm install sharp --save-dev
```

```javascript
// scripts/generate-favicons.js
const sharp = require('sharp');
const path = require('path');

const input = path.join(__dirname, '..', 'public', 'images', 'logo-fitness-factory.png');
const outputDir = path.join(__dirname, '..', 'public');

async function generate() {
  // 32x32
  await sharp(input)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(outputDir, 'favicon-32x32.png'));

  // 16x16
  await sharp(input)
    .resize(16, 16, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toFile(path.join(outputDir, 'favicon-16x16.png'));

  // Apple Touch Icon 180x180
  await sharp(input)
    .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .png()
    .toFile(path.join(outputDir, 'apple-touch-icon.png'));

  console.log('Favicons generated!');
}

generate();
```

### Schritt 2: SVG-Favicon erstellen
Falls die Konvertierung von PNG zu SVG nicht sauber möglich ist, erstelle ein einfaches SVG-Favicon:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="4" fill="#C8102E"/>
  <text x="16" y="22" text-anchor="middle" font-family="Arial Black, sans-serif" font-weight="900" font-size="16" fill="white">FF</text>
</svg>
```

Speichere als `public/favicon.svg`.

### Schritt 3: index.html prüfen
Stelle sicher, dass die `<head>`-Section von `index.html` diese Einträge enthält:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
```

Entferne ALLE Referenzen zu AkquiseFlow aus `index.html` (Title-Tag, Meta-Description, etc.). Ersetze mit:

```html
<title>Fitness Factory Hattingen — Dein Fitnessstudio</title>
<meta name="description" content="Fitness Factory Hattingen: Dein persönliches Fitnessstudio mit individueller Betreuung, modernem Equipment und familiärer Atmosphäre." />
```

## Verifikation
1. `npm run build` fehlerfrei
2. Im Browser: Favicon-Tab zeigt das Fitness Factory Logo (nicht AkquiseFlow)
3. Keine 404-Fehler für Favicon-Dateien in der Konsole
4. Title-Tag sagt "Fitness Factory Hattingen"
