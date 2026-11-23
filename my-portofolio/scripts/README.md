# Solar-system animation

Run `node scripts/generate-solar-gif.mjs` from the app directory to generate:

- `public/solar-system-orbits.gif`: 900 × 560, 120 frames, 80 ms per frame, seamless 9.6-second infinite loop.
- `public/solar-system-orbits-poster.png`: the first frame, suitable as a static or reduced-motion alternative.

The generator uses SVG geometry rendered and GIF-encoded with the installed Sharp package. All artwork is generated locally by the script; no external image assets or AI-generated frames are used. The background matches the portfolio's ivory surface. Planet sizes, orbital distances, and periods are stylized for readability and seamless looping, not scientifically to scale.

These assets are provided separately for review. The homepage still uses its existing illustration.
