/**
 * CODEX OF MINDS — character art.
 *
 * All five portraits are generated from a single rig: the same skull geometry,
 * the same three-band lighting model (key from front-left, shadow right, rim
 * from behind-right), the same palette structure and the same animation set.
 * A character is a parameter object — face proportions, palette, and a handful
 * of hand-authored silhouette paths for hair, beard, headwear and garment.
 *
 * That is what makes the set look like one roster instead of five drawings.
 *
 * Everything is inline SVG, so the art animates for real: blinking on
 * independent cycles, breathing, head sway, drifting background glyphs, and
 * pupils that track the pointer.
 */

/* ── shared rig geometry ─────────────────────────────────────────────── */
const CX = 210;
const R = {
  crown: 92,   // top of skull
  temple: 168,
  cheek: 244,
  jawY: 292,
  chin: 322,
  eyeY: 212,
  browY: 186,
  noseY: 262,
  mouthY: 288,
  neckTop: 296,
  shoulder: 372
};

const headPath = (f) => {
  const top = R.crown - f.crownLift;
  const chin = R.chin + f.chinDrop;
  return `M ${CX - f.cranium} ${R.temple}
    C ${CX - f.cranium} ${top + 18} ${CX - f.cranium * 0.62} ${top} ${CX} ${top}
    C ${CX + f.cranium * 0.62} ${top} ${CX + f.cranium} ${top + 18} ${CX + f.cranium} ${R.temple}
    C ${CX + f.cheekW} ${R.cheek} ${CX + f.jawW} ${R.jawY} ${CX} ${chin}
    C ${CX - f.jawW} ${R.jawY} ${CX - f.cheekW} ${R.cheek} ${CX - f.cranium} ${R.temple} Z`;
};

const eyePath = (sx, y, w, h) =>
  `M ${sx - w} ${y}
   C ${sx - w * 0.5} ${y - h} ${sx + w * 0.5} ${y - h} ${sx + w} ${y}
   C ${sx + w * 0.5} ${y + h * 0.82} ${sx - w * 0.5} ${y + h * 0.82} ${sx - w} ${y} Z`;

const browPath = (sx, y, w, t, dir, inner, outer) => {
  const x1 = sx - dir * w, y1 = y + inner;
  const x2 = sx + dir * w, y2 = y + outer;
  return `M ${x1} ${y1} Q ${sx} ${y - t} ${x2} ${y2} Q ${sx} ${y + t * 0.55} ${x1} ${y1} Z`;
};

const TORSO =
  `M ${CX - 34} ${R.neckTop} L ${CX - 34} ${R.shoulder}
   C ${CX - 96} ${R.shoulder + 16} ${CX - 152} ${R.shoulder + 62} ${CX - 162} 560
   L ${CX + 162} 560
   C ${CX + 152} ${R.shoulder + 62} ${CX + 96} ${R.shoulder + 16} ${CX + 34} ${R.shoulder}
   L ${CX + 34} ${R.neckTop} Z`;

const NECK = `M ${CX - 26} ${R.neckTop - 22}
  C ${CX - 30} ${R.neckTop + 20} ${CX - 34} ${R.shoulder - 18} ${CX - 38} ${R.shoulder}
  L ${CX + 38} ${R.shoulder}
  C ${CX + 34} ${R.shoulder - 18} ${CX + 30} ${R.neckTop + 20} ${CX + 26} ${R.neckTop - 22} Z`;

/* ── character parameter sets ────────────────────────────────────────── */
/* Shared palette architecture: every character has base/shade/light skin,
   base/shade/light hair, base/shade garment, plus one trim. Only the hues
   move — the value relationships stay locked, which is what carries the
   family resemblance across the set. */

export const RIGS = {
  davinci: {
    face: { cranium: 94, cheekW: 88, jawW: 50, crownLift: 2, chinDrop: 0 },
    eye: { gap: 40, w: 20, h: 11, iris: '#6b5433', droop: 3 },
    brow: { w: 26, t: 8, inner: 3, outer: -3 },
    nose: { w: 15, len: 50 },
    mouth: 'line',
    skin: { base: '#f2c79a', shade: '#e0a341', light: '#ffffff' },
    hair: { base: '#ffffff', shade: '#111111', light: '#ffffff' },
    cloth: { base: '#e6242a', shade: '#111111', trim: '#ffd400' },
    hatInk: '#0b63d6',
    rim: '#ffd400',
    hairBack: `M 210 74 C 132 74 104 132 104 194
      C 104 244 96 292 88 340 C 100 326 112 320 124 314
      C 120 322 118 332 116 344 C 130 330 142 322 152 316
      C 136 250 132 194 150 158 C 176 110 244 110 270 158
      C 288 194 284 250 268 316 C 278 322 290 330 304 344
      C 302 332 300 322 296 314 C 308 320 320 326 332 340
      C 324 292 316 244 316 194 C 316 132 288 74 210 74 Z`,
    headwear: `M 102 172 C 98 90 150 48 210 48 C 270 48 322 90 318 172
      C 292 150 254 140 210 140 C 166 140 128 150 102 172 Z`,
    beard: `M 128 214 C 122 292 138 366 172 416 C 192 444 228 444 248 416
      C 282 366 298 292 292 214 C 286 280 268 306 246 316
      C 244 306 228 300 210 300 C 192 300 176 306 170 316
      C 152 306 134 280 128 214 Z`,
    moustache: `M 166 272 C 184 260 200 266 210 273 C 220 266 236 260 254 272
      C 246 294 226 298 210 292 C 194 298 174 294 166 272 Z`,
    collar: `M 176 366 C 176 404 194 424 210 424 C 226 424 244 404 244 366
      C 236 388 224 398 210 398 C 196 398 184 388 176 366 Z`,
    glyphs: ['gear', 'vortex', 'wing'],
    blink: { dur: 7.5, delay: 0.4 }
  },

  feynman: {
    face: { cranium: 90, cheekW: 84, jawW: 54, crownLift: 0, chinDrop: -4 },
    eye: { gap: 39, w: 19, h: 10, iris: '#4a3b2e', droop: 5 },
    brow: { w: 27, t: 9, inner: 2, outer: -6 },
    nose: { w: 14, len: 46 },
    mouth: 'grin',
    skin: { base: '#f2c79a', shade: '#e0a341', light: '#ffffff' },
    hair: { base: '#241d17', shade: '#111111', light: '#ffffff' },
    cloth: { base: '#ffffff', shade: '#111111', trim: '#0b63d6' },
    rim: '#0b63d6',
    hairBack: `M 210 70 C 140 70 106 120 106 184 C 106 212 112 236 118 250
      C 112 206 118 162 138 138 C 168 106 252 106 282 138
      C 302 162 308 206 302 250 C 308 236 314 212 314 184 C 314 120 280 70 210 70 Z`,
    hairFront: `M 118 180 C 120 106 158 70 210 70 C 262 70 300 106 302 180
      C 292 146 272 128 244 124 C 250 138 244 148 232 150
      C 222 130 194 126 174 138 C 162 146 152 158 146 172 C 138 158 126 164 118 180 Z`,
    collar: `M 176 366 C 176 380 182 392 190 400 L 210 418 L 230 400
      C 238 392 244 380 244 366 L 224 372 L 210 396 L 196 372 Z`,
    extras: 'tie',
    glyphs: ['diagram', 'squiggle', 'atom'],
    blink: { dur: 5.6, delay: 1.9 }
  },

  alhaytham: {
    face: { cranium: 90, cheekW: 85, jawW: 52, crownLift: -6, chinDrop: 0 },
    eye: { gap: 40, w: 20, h: 11, iris: '#3d2b1d', droop: 2 },
    brow: { w: 28, t: 9, inner: 2, outer: -4 },
    nose: { w: 15, len: 50 },
    mouth: 'line',
    skin: { base: '#c9955f', shade: '#8d6135', light: '#ffffff' },
    hair: { base: '#181310', shade: '#111111', light: '#ffffff' },
    cloth: { base: '#0b63d6', shade: '#111111', trim: '#ffd400' },
    rim: '#ffd400',
    /* turban: a tall wrapped dome plus a band across the brow */
    headwear: `M 92 156 C 86 76 140 34 210 34 C 280 34 334 76 328 156
      C 296 128 256 116 210 116 C 164 116 124 128 92 156 Z`,
    headwear2: `M 90 158 C 116 132 158 120 210 120 C 262 120 304 132 330 158
      C 332 176 326 188 314 194 C 286 176 252 168 210 168
      C 168 168 134 176 106 194 C 94 188 88 176 90 158 Z`,
    beard: `M 134 214 C 128 288 146 350 178 386 C 195 405 225 405 242 386
      C 274 350 292 288 286 214 C 280 276 262 300 242 310
      C 238 302 226 297 210 297 C 194 297 182 302 176 310
      C 158 300 140 276 134 214 Z`,
    moustache: `M 170 270 C 186 258 202 264 210 271 C 218 264 234 258 250 270
      C 242 290 224 294 210 289 C 196 294 178 290 170 270 Z`,
    collar: `M 172 368 C 176 404 192 428 210 428 C 228 428 244 404 248 368
      C 238 394 224 404 210 404 C 196 404 182 394 172 368 Z`,
    extras: 'trim',
    glyphs: ['ray', 'pinhole', 'sphere'],
    blink: { dur: 8.4, delay: 3.1 }
  },

  noether: {
    face: { cranium: 91, cheekW: 87, jawW: 56, crownLift: 0, chinDrop: -2 },
    eye: { gap: 39, w: 18, h: 10, iris: '#4b3a2c', droop: 3 },
    brow: { w: 24, t: 7, inner: 2, outer: -3 },
    nose: { w: 13, len: 44 },
    mouth: 'smile',
    skin: { base: '#f6d2b4', shade: '#e0a341', light: '#ffffff' },
    hair: { base: '#241a17', shade: '#111111', light: '#ffffff' },
    cloth: { base: '#e6242a', shade: '#111111', trim: '#ffd400' },
    rim: '#ffd400',
    hairBack: `M 210 68 C 140 68 106 116 106 180 C 106 218 114 248 122 266
      C 114 224 116 186 128 160 C 150 112 270 112 292 160
      C 304 186 306 224 298 266 C 306 248 314 218 314 180 C 314 116 280 68 210 68 Z`,
    hairFront: `M 116 186 C 114 108 156 66 210 66 C 264 66 306 108 304 186
      C 300 166 292 158 284 160 C 288 146 278 138 268 142
      C 268 128 254 122 244 130 C 240 116 224 112 214 122
      C 204 110 186 114 180 128 C 168 120 154 128 154 142
      C 142 140 132 148 132 162 C 124 162 118 172 116 186 Z`,
    collar: `M 176 366 C 176 392 190 410 210 410 C 230 410 244 392 244 366
      C 236 386 224 394 210 394 C 196 394 184 386 176 366 Z`,
    extras: 'glasses',
    glyphs: ['lattice', 'orbitsym', 'ring'],
    blink: { dur: 6.4, delay: 2.6 }
  },

  wu: {
    face: { cranium: 88, cheekW: 84, jawW: 52, crownLift: 0, chinDrop: -4 },
    eye: { gap: 38, w: 19, h: 9, iris: '#2a211a', droop: 2 },
    brow: { w: 25, t: 6, inner: 1, outer: -4 },
    nose: { w: 12, len: 42 },
    mouth: 'line',
    skin: { base: '#f6d2b4', shade: '#e0a341', light: '#ffffff' },
    hair: { base: '#0f0c0b', shade: '#111111', light: '#ffffff' },
    cloth: { base: '#0b63d6', shade: '#111111', trim: '#ffd400' },
    rim: '#ffd400',
    bun: { cx: 300, cy: 246, rx: 30, ry: 26 },
    hairBack: `M 210 66 C 138 66 106 118 106 184 C 106 224 116 258 124 278
      C 116 236 118 190 128 162 C 150 110 270 110 292 162
      C 302 190 304 236 296 278 C 304 258 314 224 314 184 C 314 118 282 66 210 66 Z`,
    hairFront: `M 118 186 C 118 110 158 68 210 68 C 262 68 304 110 304 186
      C 296 148 276 128 240 122 C 226 134 208 140 188 138 C 162 136 138 152 118 186 Z`,
    collar: `M 176 366 C 176 392 190 408 210 408 C 230 408 244 392 244 366
      C 236 384 224 392 210 392 C 196 392 184 384 176 366 Z`,
    extras: 'labcoat',
    glyphs: ['spin', 'crystal', 'decay'],
    blink: { dur: 7.0, delay: 0.9 }
  }
};

/* ── background glyph vocabulary ─────────────────────────────────────── */
const GLYPHS = {
  gear: '<path d="M0-16 4-13 9-15 11-9 17-7 15-2 18 3 13 6 12 12 6 12 2 17-3 14-8 16-11 11-17 9-15 3-18-2-13-6-13-12-7-12-3-17Z" opacity=".5"/><circle r="6" fill="none" stroke-width="2.5"/>',
  vortex: '<path d="M-18 0a18 18 0 1 1 18 18 13 13 0 1 1-13-13 9 9 0 1 1 9 9" fill="none" stroke-width="2.5"/>',
  wing: '<path d="M-20 6C-10-10 8-14 20-6 6-6-4 0-8 8Z" opacity=".55"/><path d="M-14 6 2-2M-6 9 12-3" stroke-width="1.6" fill="none"/>',
  diagram: '<path d="M-20-14-4 0-20 14M20-14 4 0 20 14" fill="none" stroke-width="2.5"/><path d="M-4 0q4-7 8 0t8 0" fill="none" stroke-width="2.5"/>',
  squiggle: '<path d="M-22 0q5-11 10 0t10 0 10 0 10 0" fill="none" stroke-width="2.5"/>',
  atom: '<circle r="4"/><ellipse rx="20" ry="8" fill="none" stroke-width="2"/><ellipse rx="20" ry="8" fill="none" stroke-width="2" transform="rotate(60)"/><ellipse rx="20" ry="8" fill="none" stroke-width="2" transform="rotate(-60)"/>',
  ray: '<path d="M-22-12 22 0-22 12" fill="none" stroke-width="2.2"/><path d="M-22 0h30" fill="none" stroke-width="2.2"/>',
  pinhole: '<path d="M-20-16v32M-20 0 20-14M-20 0 20 14" fill="none" stroke-width="2.2"/><circle cx="-20" r="3"/>',
  sphere: '<circle r="17" fill="none" stroke-width="2.2"/><ellipse rx="17" ry="6" fill="none" stroke-width="1.6"/><path d="M-17 0a17 17 0 0 1 34 0" fill="none" stroke-width="1.6"/>',
  lattice: '<path d="M-16-16h32v32h-32zM0-16v32M-16 0h32" fill="none" stroke-width="2"/><circle cx="-16" cy="-16" r="3"/><circle cx="16" cy="16" r="3"/><circle r="3"/>',
  orbitsym: '<path d="M0-18A18 18 0 1 1 0 18" fill="none" stroke-width="2.4"/><path d="M-6-12 0-18l6 6" fill="none" stroke-width="2.4"/><path d="M6 12 0 18l-6-6" fill="none" stroke-width="2.4"/>',
  ring: '<circle r="16" fill="none" stroke-width="2.4"/><circle r="8" fill="none" stroke-width="1.6"/><circle cy="-16" r="3"/><circle cx="14" cy="8" r="3"/><circle cx="-14" cy="8" r="3"/>',
  spin: '<circle r="5"/><path d="M0-16v-8M0 16v8" stroke-width="2.4" fill="none"/><path d="M-6-18 0-26l6 8" fill="none" stroke-width="2.4"/><circle r="14" fill="none" stroke-width="1.6" stroke-dasharray="4 4"/>',
  crystal: '<path d="M0-20 16-8v16L0 20-16 8V-8Z" fill="none" stroke-width="2.2"/><path d="M0-20v40M-16-8 16 8M16-8-16 8" stroke-width="1.2" fill="none"/>',
  decay: '<circle r="6"/><path d="M8-4q12-6 18 4" fill="none" stroke-width="2.2"/><path d="M22 4l4-6-7-1" fill="none" stroke-width="2.2"/><path d="M-8 4q-12 6-18-4" fill="none" stroke-width="2.2"/>'
};

const GLYPH_SLOTS = [
  { x: 62, y: 118, s: 1.0, d: 0 },
  { x: 356, y: 168, s: 0.8, d: 2.4 },
  { x: 86, y: 428, s: 0.9, d: 4.1 },
  { x: 344, y: 386, s: 1.05, d: 1.3 },
  { x: 40, y: 268, s: 0.7, d: 3.3 },
  { x: 378, y: 286, s: 0.65, d: 5.0 }
];

/* ── builder ─────────────────────────────────────────────────────────── */

let uid = 0;

/**
 * Build one portrait as an SVG string.
 * @param {string} id      key into RIGS
 * @param {string} accent  the character's accent colour, for the aura
 * @param {object} opts    { bg:boolean, live:boolean }
 */
export function buildPortrait(id, accent, opts = {}) {
  const { bg = true, live = true } = opts;
  const r = RIGS[id];
  const n = `p${id}${uid++}`;
  const f = r.face;
  const skin = r.skin, hair = r.hair, cloth = r.cloth;
  const eyeL = CX - r.eye.gap, eyeR = CX + r.eye.gap;
  const head = headPath(f);
  const cls = live ? '' : ' static';

  const glyphs = r.glyphs
    .flatMap((g, i) => [GLYPH_SLOTS[i], GLYPH_SLOTS[i + 3]].map((slot) => ({ g, slot })))
    .map(({ g, slot }, i) => `
      <g class="p-glyph" style="--gd:${(slot.d + i * 0.37).toFixed(2)}s"
         transform="translate(${slot.x} ${slot.y}) scale(${slot.s})"
         fill="${accent}" stroke="${accent}">${GLYPHS[g]}</g>`)
    .join('');

  /* mouth variants — one shared construction, three moods */
  let mouth = '';
  if (r.mouth === 'grin') {
    mouth = `
      <path d="M ${CX - 34} ${R.mouthY - 4} Q ${CX} ${R.mouthY + 26} ${CX + 34} ${R.mouthY - 4}
               Q ${CX} ${R.mouthY + 4} ${CX - 34} ${R.mouthY - 4} Z" fill="#5d2b28"/>
      <path d="M ${CX - 30} ${R.mouthY - 2} Q ${CX} ${R.mouthY + 6} ${CX + 30} ${R.mouthY - 2}
               Q ${CX} ${R.mouthY + 2} ${CX - 30} ${R.mouthY - 2} Z" fill="#f7f2e8"/>
      <path d="M ${CX - 36} ${R.mouthY - 6} q 6 -6 12 -3M ${CX + 36} ${R.mouthY - 6} q -6 -6 -12 -3"
            fill="none" stroke="${skin.shade}" stroke-width="3" stroke-linecap="round" opacity=".7"/>`;
  } else if (r.mouth === 'smile') {
    mouth = `<path d="M ${CX - 22} ${R.mouthY} Q ${CX} ${R.mouthY + 12} ${CX + 22} ${R.mouthY}"
                   fill="none" stroke="#8d5a4e" stroke-width="4" stroke-linecap="round"/>
             <path d="M ${CX - 22} ${R.mouthY} q 4 -5 9 -4M ${CX + 22} ${R.mouthY} q -4 -5 -9 -4"
                   fill="none" stroke="${skin.shade}" stroke-width="3" stroke-linecap="round" opacity=".6"/>`;
  } else if (r.mouth === 'line') {
    mouth = `<path d="M ${CX - 20} ${R.mouthY} Q ${CX} ${R.mouthY + 6} ${CX + 20} ${R.mouthY}"
                   fill="none" stroke="#9c6357" stroke-width="4" stroke-linecap="round"/>`;
  }

  /* character-specific extras, drawn above the face */
  let extras = '';
  if (r.extras === 'glasses') {
    extras = `
      <g class="p-glasses" fill="none" stroke-linecap="round">
        <g stroke="#241c15" stroke-width="6.4" opacity=".38">
          <circle cx="${eyeL}" cy="${R.eyeY + 1}" r="27"/>
          <circle cx="${eyeR}" cy="${R.eyeY + 1}" r="27"/>
        </g>
        <g stroke="#e5d2a4" stroke-width="4.2">
          <circle cx="${eyeL}" cy="${R.eyeY + 1}" r="27"/>
          <circle cx="${eyeR}" cy="${R.eyeY + 1}" r="27"/>
          <path d="M ${eyeL + 27} ${R.eyeY - 3} q ${r.eye.gap - 27} -8 ${(r.eye.gap - 27) * 2} 0"/>
          <path d="M ${eyeL - 27} ${R.eyeY - 3} L ${CX - f.cranium + 2} ${R.eyeY - 13}"/>
          <path d="M ${eyeR + 27} ${R.eyeY - 3} L ${CX + f.cranium - 2} ${R.eyeY - 13}"/>
        </g>
      </g>
      <g fill="#ffffff" opacity=".14">
        <ellipse cx="${eyeL - 9}" cy="${R.eyeY - 9}" rx="10" ry="6" transform="rotate(-24 ${eyeL - 9} ${R.eyeY - 9})"/>
        <ellipse cx="${eyeR - 9}" cy="${R.eyeY - 9}" rx="10" ry="6" transform="rotate(-24 ${eyeR - 9} ${R.eyeY - 9})"/>
      </g>`;
  }

  /* garment overlays */
  let garment = '';
  if (r.extras === 'tie') {
    garment = `
      <path d="M 196 372 L 210 386 L 224 372 L 234 380 L 216 402 L 226 470 L 210 486 L 194 470 L 204 402 L 186 380 Z"
            fill="${cloth.trim}" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>
      <path d="M 176 366 C 168 396 150 428 132 452 L 158 470 C 176 436 184 400 186 372 Z"
            fill="none" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>
      <path d="M 244 366 C 252 396 270 428 288 452 L 262 470 C 244 436 236 400 234 372 Z"
            fill="none" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>`;
  } else if (r.extras === 'trim') {
    garment = `
      <path d="M 172 372 C 168 430 178 500 186 560 L 234 560 C 242 500 252 430 248 372
               C 240 406 226 424 210 424 C 194 424 180 406 172 372 Z"
            fill="${cloth.trim}" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>
      <path d="M 186 400 q 24 10 48 0 M 184 440 q 26 10 52 0 M 182 480 q 28 10 56 0"
            fill="none" stroke="${cloth.shade}" stroke-width="2.4" opacity=".6"/>`;
  } else if (r.extras === 'labcoat') {
    garment = `
      <path d="M 210 404 C 196 448 190 500 188 560 L 232 560 C 230 500 224 448 210 404 Z"
            fill="${cloth.trim}" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>
      <path d="M 176 366 C 172 400 176 430 186 448 L 210 404 Z"
            fill="none" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>
      <path d="M 244 366 C 248 400 244 430 234 448 L 210 404 Z"
            fill="none" stroke="#111111" stroke-width="5" stroke-linejoin="round"/>
      <path d="M 210 404 L 210 560" stroke="${cloth.shade}" stroke-width="2.5" opacity=".55" fill="none"/>`;
  }

  return `
<svg class="portrait${cls}" viewBox="0 0 420 560" xmlns="http://www.w3.org/2000/svg"
     role="img" aria-label="Stylised portrait" preserveAspectRatio="xMidYMid meet">
  <defs>
    <radialGradient id="${n}-aura" cx="50%" cy="42%" r="62%">
      <stop offset="0%" stop-color="${accent}" stop-opacity=".55"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="${n}-ben" width="9" height="9" patternUnits="userSpaceOnUse">
      <circle cx="4.5" cy="4.5" r="2.1" fill="${skin.shade}"/>
    </pattern>
    <pattern id="${n}-benc" width="9" height="9" patternUnits="userSpaceOnUse">
      <circle cx="4.5" cy="4.5" r="2.1" fill="${cloth.shade}"/>
    </pattern>
    <clipPath id="${n}-hc"><path d="${head}"/></clipPath>
    <clipPath id="${n}-tc"><path d="${TORSO}"/></clipPath>
  </defs>

  ${bg ? `<rect width="420" height="560" fill="#fff9e6"/>
  <ellipse cx="210" cy="250" rx="240" ry="250" fill="url(#${n}-aura)"/>` : ''}
  <g class="p-glyphs">${glyphs}</g>

  <g class="p-body">
    <!-- Backlight: the same silhouette, offset up-and-right and drawn behind,
         so only a rim of it survives. Cheaper and cleaner than a stroke. -->
    <path d="${TORSO}" fill="${r.rim}" transform="translate(9 -6)"/>
    <path d="${TORSO}" fill="${cloth.base}" stroke="#111111" stroke-width="7" stroke-linejoin="round"/>
    <path d="${TORSO}" fill="url(#${n}-benc)" opacity=".55" clip-path="url(#${n}-tc)"/>
    ${r.collar ? `<path d="${r.collar}" fill="${cloth.trim}" stroke="#111111" stroke-width="5"/>` : ''}
    ${garment}
  </g>

  <g class="p-head">
    <g class="p-rim" fill="${r.rim}" transform="translate(10 -8)">
      ${r.hairBack ? `<path d="${r.hairBack}"/>` : ''}
      <path d="${head}"/>
      ${r.beard ? `<path d="${r.beard}"/>` : ''}
      ${r.headwear ? `<path d="${r.headwear}"/>` : ''}
      ${r.headwear2 ? `<path d="${r.headwear2}"/>` : ''}
      ${r.bun ? `<ellipse cx="${r.bun.cx}" cy="${r.bun.cy}" rx="${r.bun.rx}" ry="${r.bun.ry}"
          transform="rotate(-18 ${r.bun.cx} ${r.bun.cy})"/>` : ''}
    </g>
    ${r.hairBack ? `<path class="p-hairback" d="${r.hairBack}" fill="${hair.base}" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>` : ''}
    ${r.bun ? `<ellipse cx="${r.bun.cx}" cy="${r.bun.cy}" rx="${r.bun.rx}" ry="${r.bun.ry}"
        fill="${hair.base}" stroke="#111111" stroke-width="6" stroke-linejoin="round" transform="rotate(-18 ${r.bun.cx} ${r.bun.cy})"/>` : ''}

    <path d="${NECK}" fill="${skin.shade}" stroke="#111111" stroke-width="6"/>
    <path d="M ${CX - 30} ${R.neckTop - 20} q 30 26 60 0 l 0 26 q -30 20 -60 0 Z" fill="#000" opacity=".22"/>

    <path d="${head}" fill="${skin.base}" stroke="#111111" stroke-width="7" stroke-linejoin="round"/>
    <g clip-path="url(#${n}-hc)">
      <!-- one flat ink is tinted by printing dots over it, never by a lighter ink -->
      <path d="M ${CX + 8} 40 C ${CX + 50} 150 ${CX + 44} 260 ${CX + 4} 360 L 430 360 L 430 40 Z"
            fill="url(#${n}-ben)" opacity=".85"/>
      <ellipse cx="${CX - 54}" cy="${R.cheek - 6}" rx="24" ry="15" fill="#e6242a" opacity=".28"/>
      <ellipse cx="${CX + 54}" cy="${R.cheek - 6}" rx="24" ry="15" fill="#e6242a" opacity=".18"/>
    </g>

    <!-- ears -->
    <path d="M ${CX - f.cranium + 2} ${R.eyeY - 6} c -14 -4 -18 12 -12 26 c 5 12 12 16 16 12"
          fill="${skin.base}" stroke="#111111" stroke-width="5"/>
    <path d="M ${CX + f.cranium - 2} ${R.eyeY - 6} c 14 -4 18 12 12 26 c -5 12 -12 16 -16 12"
          fill="${skin.shade}" stroke="#111111" stroke-width="5"/>

    <!-- brows -->
    <g fill="#111111">
      <path d="${browPath(eyeL, R.browY, r.brow.w, r.brow.t, -1, r.brow.inner, r.brow.outer)}"/>
      <path d="${browPath(eyeR, R.browY, r.brow.w, r.brow.t, 1, r.brow.inner, r.brow.outer)}"/>
    </g>

    <!-- eyes -->
    <g class="p-eyes">
      ${[eyeL, eyeR].map((ex) => `
      <g class="p-eye">
        <g class="p-eye-inner">
          <path d="${eyePath(ex, R.eyeY, r.eye.w, r.eye.h)}" fill="#f6f1e6"/>
          <g class="p-pupil">
            <circle cx="${ex}" cy="${R.eyeY + 1}" r="7.4" fill="${r.eye.iris}"/>
            <circle cx="${ex}" cy="${R.eyeY + 1}" r="3.4" fill="#120d0a"/>
            <circle cx="${ex - 2.6}" cy="${R.eyeY - 2.4}" r="2.2" fill="#fff" opacity=".9"/>
          </g>
          <path d="${eyePath(ex, R.eyeY, r.eye.w, r.eye.h)}" fill="none" stroke="#111111"
                stroke-width="3.4" stroke-linejoin="round"/>
          <path d="M ${ex - r.eye.w} ${R.eyeY} C ${ex - r.eye.w * 0.5} ${R.eyeY - r.eye.h}
                   ${ex + r.eye.w * 0.5} ${R.eyeY - r.eye.h} ${ex + r.eye.w} ${R.eyeY}"
                fill="none" stroke="#111111" stroke-width="${4 + r.eye.droop * 0.4}" stroke-linecap="round"/>
        </g>
      </g>`).join('')}
    </g>

    <!-- nose -->
    <path d="M ${CX - 3} ${R.eyeY + 8} C ${CX + r.nose.w * 0.3} ${R.noseY - 22}
             ${CX + r.nose.w} ${R.noseY - 8} ${CX + r.nose.w * 0.4} ${R.noseY}
             C ${CX + 2} ${R.noseY + 5} ${CX - 6} ${R.noseY + 3} ${CX - 10} ${R.noseY - 2}"
          fill="none" stroke="#111111" stroke-width="4" stroke-linecap="round" opacity=".9"/>
    <ellipse cx="${CX - 9}" cy="${R.noseY - 3}" rx="3.6" ry="2.6" fill="#111111"/>
    <ellipse cx="${CX + 11}" cy="${R.noseY - 3}" rx="3.6" ry="2.6" fill="#111111"/>

    ${mouth}
    ${r.beard ? `<path d="${r.beard}" fill="${hair.base}" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>` : ''}
    ${r.moustache ? `<path d="${r.moustache}" fill="${hair.base}" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>` : ''}
    ${r.hairFront ? `<path class="p-hairfront" d="${r.hairFront}" fill="${hair.base}" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>` : ''}
    ${r.curls ? r.curls.map(([x, y], i) =>
      `<circle class="p-curl" style="--cd:${(i * 0.42).toFixed(2)}s" cx="${x}" cy="${y}"
               r="${11 - (i % 2) * 1.6}" fill="${hair.base}" stroke="#111111" stroke-width="6" stroke-linejoin="round"/>`).join('') : ''}
    ${r.headwear ? `<path d="${r.headwear}" fill="${r.hatInk || cloth.base}"
        stroke="#111111" stroke-width="6" stroke-linejoin="round"/>` : ''}
    ${r.headwear2 ? `<path d="${r.headwear2}" fill="#ddd0b4"/>
      <g fill="none" stroke="#bda981" stroke-linecap="round">
        <path d="M 100 176 q 110 -30 220 0" stroke-width="2.6"/>
        <path d="M 96 158 q 114 -32 228 0" stroke-width="2.2" opacity=".85"/>
        <path d="M 96 132 q 114 -30 228 0" stroke-width="2" opacity=".6"/>
        <path d="M 104 96 q 106 -26 212 0" stroke-width="2" opacity=".45"/>
      </g>` : ''}
    ${extras}
  </g>
</svg>`;
}

/** Serialise a portrait to a data URI, for use as a WebGL texture. */
export function portraitDataURI(id, accent) {
  // An <img> needs intrinsic dimensions to rasterise an SVG reliably, and a
  // texture goes through <img>. The live DOM copy stays size-free so it can
  // scale with its container.
  const svg = buildPortrait(id, accent, { bg: true, live: false })
    .replace('<svg class="portrait static"', '<svg width="420" height="560" class="portrait static"');
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/** Point the eyes of every live portrait at the cursor. */
export function trackPointer(root = document) {
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const onMove = (e) => {
    const w = window.innerWidth, h = window.innerHeight;
    tx = ((e.clientX / w) * 2 - 1) * 4.2;
    ty = ((e.clientY / h) * 2 - 1) * 3.0;
    if (!raf) raf = requestAnimationFrame(tick);
  };
  const tick = () => {
    cx += (tx - cx) * 0.12;
    cy += (ty - cy) * 0.12;
    root.querySelectorAll('svg.portrait').forEach((s) => {
      s.style.setProperty('--px', cx.toFixed(2));
      s.style.setProperty('--py', cy.toFixed(2));
    });
    raf = Math.abs(tx - cx) > 0.02 || Math.abs(ty - cy) > 0.02 ? requestAnimationFrame(tick) : 0;
  };
  window.addEventListener('pointermove', onMove, { passive: true });
}
