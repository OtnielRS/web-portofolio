import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const width = 900;
const height = 506;
const frameCount = 72;
const delay = 80;
const base = await sharp(path.join(root, "public/moonlit-programmer-cartoon.png"))
  .resize(width, height).removeAlpha().raw().toBuffer();

const stars = [
  [.171, .087, 2.1], [.238, .025, 1.6], [.253, .098, 1.3],
  [.397, .029, 1.6], [.455, .143, 2.6], [.498, .101, 1.7],
  [.193, .262, 1.3], [.23, .233, 1.4], [.406, .214, 1.8],
  [.476, .208, 1.2], [.213, .148, 1.2], [.429, .069, 1.2],
];

function overlay(frame) {
  const t = frame / frameCount;
  const phase = Math.PI * 2 * t;
  const twinkles = stars.map(([x, y, radius], index) => {
    const amount = .5 + .5 * Math.sin(phase * (index % 2 + 1) + index * 1.77);
    const size = radius * (.7 + .6 * amount);
    return `<g transform="translate(${x * width} ${y * height})" opacity="${.1 + amount * .65}"><circle r="${size * 3}" fill="url(#star)"/><path d="M${-size} 0H${size}M0 ${-size}V${size}" stroke="#d7f4ff" stroke-width=".65"/><circle r=".65" fill="#fff"/></g>`;
  }).join("");
  const steam = [0, .34, .67].map(offset => {
    const p = (t + offset) % 1;
    const x = width * .446 + Math.sin(p * Math.PI * 2) * 3;
    const y = height * .692 - p * 35;
    return `<path d="M${x} ${y}c-7 -7 8 -11 1 -19" fill="none" stroke="#d5e8f3" stroke-width="1.5" stroke-linecap="round" opacity="${Math.sin(p * Math.PI) * .28}"/>`;
  }).join("");
  const moon = .025 + .02 * Math.sin(phase);
  const screen = .025 + .015 * Math.sin(phase * 2 + .7);
  const meteorProgress = (t - .2) / .22;
  const meteor = meteorProgress > 0 && meteorProgress < 1
    ? `<path d="M${width * (.385 + meteorProgress * .11)} ${height * (.035 + meteorProgress * .095)}l-23 -10" stroke="url(#meteor)" stroke-width="1.3" stroke-linecap="round" opacity="${Math.sin(meteorProgress * Math.PI) * .65}"/>`
    : "";
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><defs><radialGradient id="star"><stop stop-color="#d4f3ff" stop-opacity=".85"/><stop offset="1" stop-color="#96dcff" stop-opacity="0"/></radialGradient><radialGradient id="moon"><stop stop-color="#e7faff"/><stop offset="1" stop-color="#b5d9ff" stop-opacity="0"/></radialGradient><linearGradient id="meteor" x1="0" x2="1"><stop stop-color="#a5ddff" stop-opacity="0"/><stop offset="1" stop-color="#fff"/></linearGradient></defs><ellipse cx="${width * .302}" cy="${height * .147}" rx="91" ry="89" fill="url(#moon)" opacity="${moon}"/>${twinkles}${meteor}<path d="M386 225 518 225 530 316 394 328z" fill="#80c9ff" opacity="${screen}"/><path d="M540 235 602 235 624 289 543 312z" fill="#80c9ff" opacity="${screen}"/>${steam}</svg>`);
}

const frames = [];
for (let frame = 0; frame < frameCount; frame++) {
  frames.push(await sharp(base, { raw: { width, height, channels: 3 } })
    .composite([{ input: overlay(frame) }]).removeAlpha().raw().toBuffer());
  if (frame % 24 === 0) console.log(`Rendered ${frame + 1}/${frameCount} frames`);
}

const output = path.join(root, "public/moonlit-programmer-cartoon.gif");
await sharp(Buffer.concat(frames), { raw: { width, height: height * frameCount, channels: 3, pageHeight: height } })
  .gif({ delay, loop: 0, colours: 256, dither: .15, effort: 5 }).toFile(output);
const metadata = await sharp(output, { animated: true }).metadata();
if (metadata.pages !== frameCount || metadata.loop !== 0) throw new Error("Animation validation failed");
const first = await sharp(output, { page: 0 }).raw().toBuffer();
const middle = await sharp(output, { page: frameCount / 2 }).raw().toBuffer();
if (first.equals(middle)) throw new Error("Animation frames must differ");
console.log(JSON.stringify({ output, frames: metadata.pages, seconds: frameCount * delay / 1000, bytes: (await fs.stat(output)).size }));
