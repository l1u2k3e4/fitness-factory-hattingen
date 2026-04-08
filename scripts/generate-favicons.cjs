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
