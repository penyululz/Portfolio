// One-off import of images, brand files, the resume and hero videos from the owner's folders.
// Re-runnable: every destination is overwritten. Usage: npm run assets:import
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import ffmpegPath from "ffmpeg-static";

const OLD = path.resolve("../Portfolio-master/public");
const CERTS = path.resolve("E:/cert and resume");

// The certificate folder holds PDFs that print the owner's national IC number.
// Only these files may ever leave it.
const CERTS_ALLOWED = new Set([
  "Mohamad Faris Danial Resume 2026.pdf",
  "GC-BADGE-updated (1).png",
  "Innovator Badge-PD-v2 (1).png",
]);

const MAX_VIDEO_BYTES = 6 * 1024 * 1024;

/** @type {[dest: string, src: string][]} */
const copies = [
  ["src/assets/portrait.jpg", path.join(OLD, "hero-image.jpg")],
  ["src/assets/bg-light.jpg", path.join(OLD, "background-light.jpg")],
  ["src/assets/bg-dark.jpg", path.join(OLD, "background-dark.jpg")],
  ["src/assets/projects/fmp.png", path.join(OLD, "FMP.png")],
  ["src/assets/projects/webforge.png", path.join(OLD, "webforge.png")],
  ["src/assets/projects/tiktok.webp", path.join(OLD, "tiktok.webp")],
  ["src/assets/projects/immich.png", path.join(OLD, "immich.png")],
  ["src/assets/projects/stirling-pdf.jpg", path.join(OLD, "stirlingpdf.jpg")],
  ["src/assets/projects/gomail.png", path.join(OLD, "Gomail.png")],
  ["src/assets/badges/wayground-pd-innovator.png", path.join(CERTS, "Innovator Badge-PD-v2 (1).png")],
  ["src/assets/badges/wayground-game-changer.png", path.join(CERTS, "GC-BADGE-updated (1).png")],
  ["public/resume.pdf", path.join(CERTS, "Mohamad Faris Danial Resume 2026.pdf")],
  ["public/brand/logo-light-compact.svg", path.join(OLD, "brand/logo-light-compact.svg")],
  ["public/brand/logo-dark-compact.svg", path.join(OLD, "brand/logo-dark-compact.svg")],
  ["public/favicon.svg", path.join(OLD, "favicon.svg")],
  ["public/favicon-16x16.png", path.join(OLD, "favicon-16x16.png")],
  ["public/favicon-32x32.png", path.join(OLD, "favicon-32x32.png")],
  ["public/apple-touch-icon.png", path.join(OLD, "apple-touch-icon.png")],
  ["public/android-chrome-192x192.png", path.join(OLD, "android-chrome-192x192.png")],
  ["public/android-chrome-512x512.png", path.join(OLD, "android-chrome-512x512.png")],
  ["scripts/og-image.svg", path.join(OLD, "og-image.svg")],
];

/** @type {[dest: string, src: string][]} */
const videos = [
  ["public/video/hero-light.mp4", path.join(OLD, "background-light.mp4")],
  ["public/video/hero-dark.mp4", path.join(OLD, "background-dark.mp4")],
];

function assertAllowed(src) {
  const rel = path.relative(CERTS, src);
  const insideCerts = !rel.startsWith("..") && !path.isAbsolute(rel);
  if (insideCerts && !CERTS_ALLOWED.has(rel)) {
    throw new Error(`Refusing to import from the certificate folder: ${rel}`);
  }
  if (!fs.existsSync(src)) throw new Error(`Missing source: ${src}`);
}

function prepare(dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
}

const kib = (bytes) => `${(bytes / 1024).toFixed(0)} KiB`;

for (const [dest, src] of copies) {
  assertAllowed(src);
  prepare(dest);
  fs.copyFileSync(src, dest);
  console.log(`${dest}  ${kib(fs.statSync(dest).size)}`);
}

for (const [dest, src] of videos) {
  assertAllowed(src);
  prepare(dest);
  let size = Infinity;
  for (const crf of [28, 32, 36]) {
    execFileSync(
      ffmpegPath,
      ["-y", "-loglevel", "error", "-i", src, "-vf", "scale=1280:-2", "-an", "-c:v", "libx264",
        "-preset", "slow", "-movflags", "+faststart", "-crf", String(crf), dest],
      { stdio: "inherit" },
    );
    size = fs.statSync(dest).size;
    if (size <= MAX_VIDEO_BYTES) {
      console.log(`${dest}  ${kib(size)}  (crf ${crf})`);
      break;
    }
  }
  if (size > MAX_VIDEO_BYTES) {
    console.error(`${dest} is still ${kib(size)} at crf 36`);
    process.exit(1);
  }
}
