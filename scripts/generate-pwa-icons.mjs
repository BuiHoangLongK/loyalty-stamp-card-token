#!/usr/bin/env node
/**
 * Generate PWA icons from app/icon.svg.
 *
 * Outputs:
 *   - public/icons/icon-192.png          (PWA manifest, 192x192)
 *   - public/icons/icon-512.png          (PWA manifest, 512x512)
 *   - public/icons/icon-maskable-512.png (PWA manifest, 512x512, safe-zone padding)
 *   - app/apple-icon.png                 (Apple touch icon, 180x180)
 *
 * Run with: node scripts/generate-pwa-icons.mjs
 * Uses `sharp` (already a transitive dep of Next.js Image).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SOURCE = path.join(ROOT, 'app', 'icon.svg');
const PUBLIC_ICONS = path.join(ROOT, 'public', 'icons');
const APPLE_ICON = path.join(ROOT, 'app', 'apple-icon.png');

// Maskable icons need a ~40% safe-zone around the central mark so platform
// masks (circle, squircle, etc.) don't crop the logo. We scale the source
// down and re-center it on a 512x512 canvas.
async function renderMaskable(svg, size) {
  const innerSize = Math.round(size * 0.6);
  const innerBuf = await sharp(Buffer.from(svg)).resize(innerSize, innerSize).toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: { r: 30, g: 64, b: 175, alpha: 1 }, // #1e40af, brand color
    },
  })
    .composite([{ input: innerBuf, gravity: 'center' }])
    .png()
    .toBuffer();
}

async function main() {
  const svg = await readFile(SOURCE, 'utf8');
  await mkdir(PUBLIC_ICONS, { recursive: true });

  const targets = [
    { out: path.join(PUBLIC_ICONS, 'icon-192.png'), size: 192 },
    { out: path.join(PUBLIC_ICONS, 'icon-512.png'), size: 512 },
  ];

  for (const { out, size } of targets) {
    const buf = await sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();
    await writeFile(out, buf);
    console.log(`wrote ${path.relative(ROOT, out)} (${size}x${size})`);
  }

  const maskable = await renderMaskable(svg, 512);
  await writeFile(path.join(PUBLIC_ICONS, 'icon-maskable-512.png'), maskable);
  console.log(`wrote public/icons/icon-maskable-512.png (512x512 maskable)`);

  const apple = await sharp(Buffer.from(svg)).resize(180, 180).png().toBuffer();
  await writeFile(APPLE_ICON, apple);
  console.log(`wrote app/apple-icon.png (180x180)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
