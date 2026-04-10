/**
 * Bildoptimierung: Konvertiert große JPEG/JPG-Bilder zu WebP.
 * Trainer-Fotos: max 800px breit, Qualität 80
 * Galerie/Studio-Bilder: max 1200px breit, Qualität 80
 *
 * Aufruf: node scripts/optimize-images.mjs
 */
import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename, dirname } from 'path'

const PUBLIC = 'public'

function findImages(dir, extensions = ['.jpeg', '.jpg']) {
  const results = []
  try {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const fullPath = join(dir, entry.name)
      if (entry.isDirectory()) {
        results.push(...findImages(fullPath, extensions))
      } else if (extensions.includes(extname(entry.name).toLowerCase())) {
        results.push(fullPath)
      }
    }
  } catch {
    // skip inaccessible dirs
  }
  return results
}

// Trainer: max 800px, Galerie/images: max 1200px
function maxWidth(filePath) {
  if (filePath.includes('/Trainer/')) return 800
  return 1200
}

const images = [
  ...findImages(join(PUBLIC, 'Trainer')),
  ...findImages(join(PUBLIC, 'Galerie')),
  ...findImages(join(PUBLIC, 'images')),
]

console.log(`Optimiere ${images.length} Bilder zu WebP...\n`)

for (const img of images) {
  const output = img.replace(/\.(jpe?g|png)$/i, '.webp')
  const width = maxWidth(img)
  const sizeBefore = statSync(img).size

  await sharp(img)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(output)

  const sizeAfter = statSync(output).size
  const saved = ((1 - sizeAfter / sizeBefore) * 100).toFixed(0)
  console.log(`  ✓ ${basename(img)} → ${basename(output)}  (${(sizeBefore / 1024 / 1024).toFixed(1)}MB → ${(sizeAfter / 1024).toFixed(0)}KB, -${saved}%)`)
}

console.log('\nFertig!')
