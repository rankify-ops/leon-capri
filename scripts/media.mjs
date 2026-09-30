/*
 * assets-raw/ → public/img + public/video
 *
 * Everything in assets-raw/ was pulled from leoncapri.com (Squarespace CDN,
 * ?format=2500w) and its two Squarespace-hosted HLS videos via yt-dlp.
 *
 * Run: node scripts/media.mjs
 */
import sharp from "sharp";
import ffmpeg from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";

const RAW = "assets-raw";
const IMG = "public/img";
const VID = "public/video";
mkdirSync(IMG, { recursive: true });
mkdirSync(VID, { recursive: true });

// [source, slug]
const PHOTOS = [
  ["luna-grid.webp", "luna"],
  ["luna-image.jpg", "luna-sand"],
  ["luna-s2.png", "luna-web"],
  ["luna-s3.png", "luna-tote"],
  ["luna-flip.jpg", "luna-flip"],
  ["belmere-s1.png", "belmere"],
  ["belmere-s2.png", "belmere-print"],
  ["belmere-s3.png", "belmere-web"],
  ["belmere-grid.webp", "belmere-flip"],
  ["coast-s1.png", "coast"],
  ["coast-ext.jpg", "coast-ext"],
  ["coast-2339.jpg", "coast-brochure"],
  ["coast-s3.png", "coast-web"],
  ["coastal-view.png", "coast-view"],
  ["air.jpg", "air"],
  ["otto.jpg", "otto"],
  ["silk.jpg", "silk"],
  ["mara.jpg", "mara"],
  ["paloma.jpg", "paloma"],
  ["raya.jpg", "raya"],
  ["knightsbridge.jpg", "knightsbridge"],
  ["noir.jpg", "noir"],
  ["oasis.jpg", "oasis"],
  ["natura.jpg", "natura"],
  ["svt.jpg", "svt"],
  ["mind.jpg", "mind"],
  ["insight.jpg", "insight"],
  ["services-bg.jpg", "terrain"],
];

for (const [src, slug] of PHOTOS) {
  const meta = await sharp(`${RAW}/${src}`).metadata();
  for (const w of [800, 1600, 2400]) {
    await sharp(`${RAW}/${src}`)
      .flatten({ background: "#efe9e1" })
      .resize({ width: Math.min(w, meta.width), withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(`${IMG}/${slug}-${w}.webp`);
  }
}

// Cut-outs: mockups with the studio backdrop removed (rembg, see README),
// kept as transparent webp so they sit on the page ground like product shots.
const CUTS = ["coast-phone", "coast-laptop", "coast-plan", "luna-phone", "luna-tote", "luna-book", "belmere-brochure", "oasis-books", "paloma-books"];
for (const c of CUTS) {
  const meta = await sharp(`${RAW}/cut/${c}.png`).metadata();
  for (const w of [600, 1200]) {
    await sharp(`${RAW}/cut/${c}.png`)
      .resize({ width: Math.min(w, meta.width), withoutEnlargement: true })
      .webp({ quality: 84, alphaQuality: 90 })
      .toFile(`${IMG}/cut-${c}-${w}.webp`);
  }
}
if (process.argv.includes("--cuts")) process.exit(0);

// Wordmark: theirs is black on transparent. Ink + stone copies, trimmed.
await sharp(`${RAW}/lc-logo.png`).trim().png().toFile(`${IMG}/wordmark.png`);
await sharp(`${RAW}/lc-logo.png`)
  .trim()
  .negate({ alpha: false })
  .png()
  .toFile(`${IMG}/wordmark-light.png`);
// Circular "Property · Design · Branding" lockup.
await sharp(`${RAW}/lockup.png`).resize(400).png().toFile(`${IMG}/lockup.png`);
await sharp(`${RAW}/lockup.png`).resize(400).negate({ alpha: false }).png().toFile(`${IMG}/lockup-light.png`);

// OG card + icons.
await sharp(`${RAW}/luna-grid.webp`).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 82 }).toFile(`${IMG}/og.jpg`);
for (const s of [32, 180, 192]) {
  await sharp({ create: { width: s, height: s, channels: 4, background: "#1c1917" } })
    .composite([
      {
        input: await sharp(`${RAW}/lockup.png`).resize(Math.round(s * 0.86)).negate({ alpha: false }).png().toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toFile(`${IMG}/icon-${s}.png`);
}

// Video. Hero = their pale aerial reel (60fps → 30, silent). Belmere = the
// day-to-night tower clip from the Belmere highlight page.
const ff = (args) => execFileSync(ffmpeg, ["-v", "error", "-y", ...args], { stdio: "inherit" });
const HERO = `${RAW}/vid-1765476774917-XVB5B8AULHPGCNFFVC25.mp4`;
const BEL = `${RAW}/vid-1765477336520-KLY0066NRWCMYMZERMUT.f2961.mp4`;
const x264 = (crf) => ["-an", "-c:v", "libx264", "-preset", "slow", "-crf", String(crf), "-pix_fmt", "yuv420p", "-movflags", "+faststart"];

ff(["-i", HERO, "-t", "32", "-vf", "fps=30,scale=1920:-2", ...x264(26), `${VID}/hero-1080.mp4`]);
ff(["-i", HERO, "-t", "32", "-vf", "fps=30,scale=1280:-2", ...x264(27), `${VID}/hero-720.mp4`]);
// Portrait crop for phones (centre of frame, where the whales swim).
ff(["-i", HERO, "-t", "32", "-vf", "fps=30,crop=608:1080,scale=608:1080", ...x264(27), `${VID}/hero-portrait.mp4`]);
ff(["-i", HERO, "-ss", "8", "-frames:v", "1", "-vf", "scale=1920:-2", "-q:v", "3", `${IMG}/hero-poster.jpg`]);

ff(["-i", BEL, "-vf", "scale=1600:-2,setsar=1", ...x264(24), `${VID}/belmere.mp4`]);
ff(["-i", BEL, "-ss", "4.2", "-frames:v", "1", "-vf", "scale=1600:-2,setsar=1", "-q:v", "3", `${IMG}/belmere-poster.jpg`]);

console.log("done");
