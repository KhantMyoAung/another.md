/**
 * CODEX OF MINDS — wiring.
 */

import { SCIENTISTS } from './data.js';
import { Hall } from './scene.js';
import { Sheet, HallUI, totalCompletion, $, $$ } from './ui.js';
import { trackPointer } from './portrait.js';
import { sfx } from './audio.js';

const bootEl = $('#boot');
const hallEl = $('#hall');
const sheetEl = $('#sheet');
const hudEl = $('.hud');

let mode = 'boot';   // boot | hall | sheet
let hall, hallUI, sheet;

/* ── boot ────────────────────────────────────────────────────────────── */

function init() {
  hall = new Hall($('#stage'));
  hallUI = new HallUI(hallEl);
  sheet = new Sheet(sheetEl);
  sheet.onBack = toHall;

  hall.onPick = (i) => {
    if (mode !== 'hall') return;
    if (i === hall.focus) openSheet(i);
    else { hall.setFocus(i); hallUI.set(hall.focus); sfx.move(); }
  };
  hall.onHover = (i) => { if (i >= 0 && mode === 'hall') sfx.hover(); };

  hall.setFocus(0);
  hallUI.set(0);
  hall.start();
  trackPointer(document);
  refreshCompletion();

  $('#start').addEventListener('click', () => {
    sfx.boot();
    sfx.boom();
    bootEl.classList.add('out');
    setTimeout(() => { bootEl.hidden = true; toHall(true); }, 900);
  });

  /* hall controls */
  $$('[data-nav]', hallEl).forEach((b) => b.addEventListener('click', () => {
    hall.setFocus(hall.focus + Number(b.dataset.nav));
    hallUI.set(hall.focus);
    sfx.move();
  }));
  $('[data-open]', hallEl).addEventListener('click', () => openSheet(hall.focus));
  $('[data-dots]', hallEl).addEventListener('click', (e) => {
    const d = e.target.closest('.dot');
    if (!d) return;
    hall.setFocus(Number(d.dataset.i));
    hallUI.set(hall.focus);
    sfx.move();
  });

  /* hud */
  const mute = $('#mute');
  const applyMute = () => {
    mute.setAttribute('aria-pressed', String(!sfx.muted));
    mute.classList.toggle('muted', sfx.muted);
  };
  applyMute();
  mute.addEventListener('click', () => { sfx.setMuted(!sfx.muted); applyMute(); if (!sfx.muted) sfx.hover(); });

  const about = $('#about');
  $('#about-btn').addEventListener('click', () => about.showModal());
  about.addEventListener('click', (e) => { if (e.target.dataset.close !== undefined || e.target === about) about.close(); });

  /* keyboard */
  window.addEventListener('keydown', (e) => {
    if (e.target.closest('input, textarea') || $('#about').open) return;
    if (mode === 'boot' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); $('#start').click(); return; }
    if (mode === 'hall') {
      if (e.key === 'ArrowLeft') { hall.setFocus(hall.focus - 1); hallUI.set(hall.focus); sfx.move(); }
      if (e.key === 'ArrowRight') { hall.setFocus(hall.focus + 1); hallUI.set(hall.focus); sfx.move(); }
      if (e.key === 'Enter') openSheet(hall.focus);
      if (/^[1-5]$/.test(e.key)) { hall.setFocus(Number(e.key) - 1); hallUI.set(hall.focus); sfx.move(); }
    } else if (mode === 'sheet' && e.key === 'Escape') {
      sfx.back();
      toHall();
    }
  });
}

/* ── transitions ─────────────────────────────────────────────────────── */

function toHall(first = false) {
  mode = 'hall';
  hallEl.hidden = false;
  hudEl.hidden = false;
  requestAnimationFrame(() => hallEl.classList.add('in'));
  hall.zoom(false);
  if (sheetEl.hidden === false) sheet.close();
  refreshCompletion();
  if (first) hallUI.set(hall.focus);
}

function openSheet(i) {
  if (mode === 'sheet') return;
  mode = 'sheet';
  sfx.select();
  hall.zoom(true);
  hallEl.classList.remove('in');
  setTimeout(() => { hallEl.hidden = true; }, 420);
  setTimeout(() => sheet.open(SCIENTISTS[i]), 260);
}

function refreshCompletion() {
  const { done, all, pct } = totalCompletion();
  const el = $('[data-completion]');
  if (el) el.innerHTML = `Codex <strong>${pct}%</strong> <span>${done}/${all} entries studied</span>`;
}

/* WebGL can be unavailable (old device, blocked context) — say so plainly
   rather than showing a black screen. */
try {
  const probe = document.createElement('canvas');
  if (!(probe.getContext('webgl2') || probe.getContext('webgl'))) throw new Error('no webgl');
  init();
} catch (err) {
  console.error(err);
  document.body.classList.add('nowebgl');
  bootEl.querySelector('.boot-inner').insertAdjacentHTML('beforeend',
    '<p class="fallback">This browser cannot open a WebGL context, so the 3D hall will not render. ' +
    'The codex entries themselves still work — the hall is the way in, not the content.</p>');
}
