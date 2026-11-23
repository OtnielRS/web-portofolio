import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const width = 900;
const height = 560;
const frameCount = 120;
const frameDelay = 80;
const center = { x: 450, y: 280 };
const tilt = -.29;

// Distances, sizes, and periods are stylized for a readable, seamlessly looping animation.
const planets = [
  { name: "Mercury", orbit: 61, radius: 4, color: "#a49d91", dark: "#585c60", cycles: 6, phase: .4 },
  { name: "Venus", orbit: 91, radius: 7, color: "#dfbb71", dark: "#977344", cycles: 5, phase: 2.1 },
  { name: "Earth", orbit: 127, radius: 8, color: "#3c9aa5", dark: "#24577d", cycles: 4, phase: 3.8 },
  { name: "Mars", orbit: 166, radius: 6, color: "#cf7950", dark: "#8a3829", cycles: 3, phase: 5.2 },
  { name: "Jupiter", orbit: 222, radius: 18, color: "#d6b18b", dark: "#956844", cycles: 2, phase: 1.5 },
  { name: "Saturn", orbit: 275, radius: 14, color: "#d9c18c", dark: "#9b7945", cycles: 1, phase: 4.5 },
  { name: "Uranus", orbit: 326, radius: 10, color: "#93c9c9", dark: "#4c8e9c", cycles: 1, phase: 2.7 },
  { name: "Neptune", orbit: 383, radius: 10, color: "#5a8dc4", dark: "#2d4c82", cycles: 1, phase: .1 },
];

function position(orbit, angle) {
  const x = orbit * Math.cos(angle);
  const y = orbit * .52 * Math.sin(angle);
  return {
    x: center.x + x * Math.cos(tilt) - y * Math.sin(tilt),
    y: center.y + x * Math.sin(tilt) + y * Math.cos(tilt),
  };
}

function planetMarkup(planet, index, progress) {
  const { x, y } = position(planet.orbit, planet.phase + Math.PI * 2 * planet.cycles * progress);
  const radius = planet.radius;
  const ring = planet.name === "Saturn"
    ? `<ellipse rx="27" ry="8" transform="rotate(-24)" fill="none" stroke="#b2996b" stroke-width="4"/>`
    : "";
  const bands = planet.name === "Jupiter" || planet.name === "Saturn"
    ? `<g clip-path="url(#clip-${index})" opacity=".4"><path d="M${-radius} -6 Q0 -1 ${radius} -6 M${-radius} 3 Q0 7 ${radius} 3 M${-radius} 10 Q0 14 ${radius} 10" fill="none" stroke="${planet.dark}" stroke-width="3"/></g>`
    : "";
  const earth = planet.name === "Earth"
    ? `<g clip-path="url(#clip-${index})" fill="#88ac80"><ellipse cx="-3" cy="-3" rx="3" ry="4" transform="rotate(-25)"/><ellipse cx="2" cy="4" rx="2.5" ry="3.5" transform="rotate(-25)"/></g>`
    : "";
  return `<g transform="translate(${x.toFixed(2)} ${y.toFixed(2)})">${ring}<circle r="${radius}" fill="url(#planet-${index})"/>${bands}${earth}</g>`;
}

function renderFrame(frame) {
  const progress = frame / frameCount;
  const gradients = planets.map((planet, index) => `<radialGradient id="planet-${index}" cx="30%" cy="25%" r="85%"><stop stop-color="#f0e5cf"/><stop offset=".32" stop-color="${planet.color}"/><stop offset="1" stop-color="${planet.dark}"/></radialGradient><clipPath id="clip-${index}"><circle r="${planet.radius}"/></clipPath>`).join("");
  const orbits = planets.map(planet => `<ellipse cx="${center.x}" cy="${center.y}" rx="${planet.orbit}" ry="${planet.orbit * .52}" transform="rotate(${tilt * 180 / Math.PI} ${center.x} ${center.y})" fill="none" stroke="#a9b4b9" stroke-width=".8" opacity=".68"/>`).join("");
  const asteroids = Array.from({ length: 100 }, (_, index) => {
    const angle = index * 2.399963;
    const point = position(192 + index % 7, angle);
    return `<circle cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="${index % 3 === 0 ? .9 : .55}" fill="#8c999a" opacity=".55"/>`;
  }).join("");
  const bodies = planets.map((planet, index) => ({
    markup: planetMarkup(planet, index, progress),
    y: position(planet.orbit, planet.phase + Math.PI * 2 * planet.cycles * progress).y,
  }));
  const sun = `<g transform="translate(${center.x} ${center.y})"><circle r="29" fill="#e4a16a" opacity=".14"/><circle r="25" fill="url(#sun)"/><circle cx="-7" cy="-7" r="14" fill="#ffd485" opacity=".13"/></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><defs>${gradients}<radialGradient id="sun" cx="35%" cy="30%" r="80%"><stop stop-color="#ffde89"/><stop offset=".35" stop-color="#f6aa40"/><stop offset=".76" stop-color="#de722b"/><stop offset="1" stop-color="#b94825"/></radialGradient></defs><rect width="100%" height="100%" fill="#f5f3eb"/>${orbits}${asteroids}${bodies.filter(body => body.y < center.y).map(body => body.markup).join("")}${sun}${bodies.filter(body => body.y >= center.y).map(body => body.markup).join("")}</svg>`;
}

const outputDirectory = path.join(projectRoot, "public");
await fs.mkdir(outputDirectory, { recursive: true });
const frames = [];
for (let frame = 0; frame < frameCount; frame++) {
  const source = Buffer.from(renderFrame(frame));
  frames.push(await sharp(source).removeAlpha().raw().toBuffer());
  if (frame === 0) await sharp(source).png().toFile(path.join(outputDirectory, "solar-system-orbits-poster.png"));
  if (frame % 30 === 0) console.log(`Rendered ${frame + 1}/${frameCount} frames`);
}

const output = path.join(outputDirectory, "solar-system-orbits.gif");
await sharp(Buffer.concat(frames), {
  raw: { width, height: height * frameCount, channels: 3, pageHeight: height },
}).gif({ delay: frameDelay, loop: 0, colours: 128, dither: .2, effort: 5 }).toFile(output);

const metadata = await sharp(output, { animated: true }).metadata();
if (metadata.pages !== frameCount || metadata.loop !== 0) throw new Error("GIF frame count or loop validation failed.");
console.log(JSON.stringify({ output, frames: metadata.pages, width, height, durationSeconds: frameCount * frameDelay / 1000, bytes: (await fs.stat(output)).size }));
