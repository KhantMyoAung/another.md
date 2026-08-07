/**
 * CODEX OF MINDS — the single roster.
 *
 * Wing I (01-05) was authored as quest trees; Wing II (06-15) as experiments
 * with story beats. Rather than rewrite either, this normalises both into one
 * shape where every section is optional, so one detail screen can render
 * whatever a scientist actually has:
 *
 *   quests[]  → the quest tree          (01-05 today)
 *   game      → the gated experiment    (06-15 today)
 *   beats[]   → the story panels        (06-15 today)
 *
 * As the two halves reach parity, entries simply gain the missing key.
 */

import { SCIENTISTS } from './data.js';
import { LAB } from './lab-data.js';

const INK = { red: '#e6242a', blue: '#0b63d6', yellow: '#ffd400' };
const INK2 = { red: '#ffd400', blue: '#ffd400', yellow: '#e6242a' };

/* Epithets for Wing II, in the register Wing I already uses. */
const TITLES = {
  chatelet: 'The Living Force',
  lamarr: 'The Frequency Hopper',
  kwolek: 'The Cloudy Batch',
  snow: 'The Map Maker',
  tu: 'The Cold Press',
  leavitt: 'The Standard Candle',
  latimer: 'The Light Maker',
  drew: 'The Blood Banker',
  telkes: 'The Sun Queen',
  vavilov: 'The Seed Keeper'
};

const ERAS = {
  chatelet: 'Enlightenment', lamarr: 'Twentieth Century', kwolek: 'Twentieth Century',
  snow: 'Victorian', tu: 'Twentieth Century', leavitt: 'Turn of the Century',
  latimer: 'Age of Electricity', drew: 'Twentieth Century', telkes: 'Twentieth Century',
  vavilov: 'Twentieth Century'
};

const fromWingI = (s) => ({
  ...s,
  wing: 1,
  quests: s.quests,
  artifacts: s.artifacts,
  game: null, beats: null, today: null
});

const fromWingII = (s) => ({
  id: s.id,
  name: s.name,
  shortName: s.name.split(' ').slice(-1)[0],
  title: TITLES[s.id] || s.role,
  class: s.role,
  life: s.life,
  origin: s.origin,
  era: ERAS[s.id] || 'Twentieth Century',
  accent: INK[s.ink],
  accent2: INK2[s.ink],
  rarity: 'underrated',
  tagline: s.hook,
  intro: s.beats[0]?.body || '',
  underrated: null,
  quote: null,
  stats: null,
  statNote: null,
  quests: null,
  artifacts: null,
  sources: s.sources,
  wing: 2,
  /* the experiment */
  game: s.game,
  gameTitle: s.gameTitle,
  gameBrief: s.gameBrief,
  gameHint: s.gameHint,
  beats: s.beats,
  today: s.today
});

export const ROSTER = [
  ...SCIENTISTS.map(fromWingI),
  ...LAB.map(fromWingII)
];

export const byId = (id) => ROSTER.find((s) => s.id === id);
export const indexOf = (id) => ROSTER.findIndex((s) => s.id === id);

/** № as shown in the UI, 1-based. */
export const numberOf = (s) => String(ROSTER.indexOf(s) + 1).padStart(2, '0');
