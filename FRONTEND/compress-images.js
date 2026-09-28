const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imagesDir = path.join(__dirname, 'public', 'images');

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const filename = path.basename(filePath);
  const tempPath = filePath + '.tmp';

  try {
    const stats = fs.statSync(filePath);
    const originalSize = stats.size;

    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();

    // Resize giant images (max width 1920 for heroes, 1200 for cards)
    let targetWidth = metadata.width;
    if (metadata.width > 1920) {
      targetWidth = 1920;
    }
    if (targetWidth < metadata.width) {
      pipeline = pipeline.resize({ width: targetWidth, withoutEnlargement: true });
    }

    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline
        .jpeg({ quality: 80, mozjpeg: true, progressive: true })
        .toFile(tempPath);
    } else if (ext === '.png') {
      await pipeline
        .png({ quality: 80, compressionLevel: 9, palette: true })
        .toFile(tempPath);
    } else {
      return;
    }

    const newStats = fs.statSync(tempPath);
    const newSize = newStats.size;

    if (newSize < originalSize) {
      fs.unlinkSync(filePath);
      fs.renameSync(tempPath, filePath);
      const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
      console.log(`✓ ${filename}: ${(originalSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB (${savings}% saved)`);
    } else {
      fs.unlinkSync(tempPath);
      console.log(`- ${filename}: original is already optimal`);
    }
  } catch (err) {
    console.error(`✗ Error processing ${filename}:`, err.message);
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch (e) {}
    }
  }
}

async function run() {
  console.log('Starting image compression in:', imagesDir);
  const files = fs.readdirSync(imagesDir);

  for (const file of files) {
    const fullPath = path.join(imagesDir, file);
    if (fs.statSync(fullPath).isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        await compressImage(fullPath);
      }
    }
  }
  console.log('\nAll images successfully compressed!');
}

run();
