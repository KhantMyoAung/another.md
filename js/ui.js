/**
 * CODEX OF MINDS — screens, character sheets and the quest tree.
 */

import { STAT_AXES, QUEST_KINDS } from './data.js';
import { ROSTER, byId, numberOf } from './roster.js';
import { buildPortrait } from './portrait.js';
import { mountExperiment, hasRun } from './games.js';
import { sfx } from './audio.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const PROGRESS_KEY = 'codex.progress.v1';

/* ── progression ─────────────────────────────────────────────────────── */

const loadProgress = () => {
  try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
  catch { return {}; }
};
let progress = loadProgress();
const saveProgress = () => localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));

const unlockedSet = (id) => new Set(progress[id]?.unlocked || []);

function isAvailable(sci, quest, unlocked) {
  return quest.requires.every((r) => unlocked.has(r));
}

function xpFor(sci) {
  const u = unlockedSet(sci.id);
  return sci.quests.filter((q) => u.has(q.id)).reduce((n, q) => n + q.impact * 120, 0);
}
const LEVEL_STEP = 600;
const levelFor = (xp) => Math.min(9, Math.floor(xp / LEVEL_STEP) + 1);

export function totalCompletion() {
  const withQuests = ROSTER.filter((s) => s.quests);
  const done = withQuests.reduce((n, s) => n + unlockedSet(s.id).size, 0)
    + ROSTER.filter((s) => s.game && hasRun(s.id)).length;
  const all = withQuests.reduce((n, s) => n + s.quests.length, 0)
    + ROSTER.filter((s) => s.game).length;
  return { done, all, pct: Math.round((done / all) * 100) };
}

/* ── small builders ──────────────────────────────────────────────────── */

function radar(sci) {
  const R = 96, CX = 120, CY = 116, n = STAT_AXES.length;
  const pt = (i, v) => {
    const a = -Math.PI / 2 + (i / n) * Math.PI * 2;
    const r = (v / 100) * R;
    return [CX + Math.cos(a) * r, CY + Math.sin(a) * r];
  };
  const web = [25, 50, 75, 100].map((lvl) =>
    `<polygon class="rd-web" points="${STAT_AXES.map((_, i) => pt(i, lvl).map((x) => x.toFixed(1)).join(',')).join(' ')}"/>`
  ).join('');
  const spokes = STAT_AXES.map((_, i) => {
    const [x, y] = pt(i, 100);
    return `<line class="rd-spoke" x1="${CX}" y1="${CY}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`;
  }).join('');
  const pts = STAT_AXES.map((ax, i) => pt(i, sci.stats[ax.key]));
  const poly = pts.map((p) => p.map((x) => x.toFixed(1)).join(',')).join(' ');
  const dots = pts.map((p, i) =>
    `<circle class="rd-dot" style="--dd:${(i * 0.07).toFixed(2)}s" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4"/>`).join('');
  const labels = STAT_AXES.map((ax, i) => {
    const [x, y] = pt(i, 128);
    return `<text class="rd-label" x="${x.toFixed(1)}" y="${(y + 4).toFixed(1)}"
            text-anchor="${x > CX + 6 ? 'start' : x < CX - 6 ? 'end' : 'middle'}">${ax.label}</text>`;
  }).join('');

  return `
  <svg class="radar" viewBox="0 0 240 236" aria-label="Stat profile">
    ${web}${spokes}
    <polygon class="rd-fill" points="${poly}"/>
    ${dots}${labels}
  </svg>
  <ul class="statlist">
    ${STAT_AXES.map((ax) => `
      <li><span class="sl-name" title="${ax.blurb}">${ax.label}</span>
        <span class="sl-bar"><i style="--v:${sci.stats[ax.key]}%"></i></span>
        <span class="sl-num">${sci.stats[ax.key]}</span></li>`).join('')}
  </ul>
  <p class="statnote"><strong>On these numbers:</strong> they are an editorial device, not a measurement — a
  shorthand for what kind of thinker this was. ${sci.statNote}</p>`;
}

function questCard(sci, q, unlocked) {
  const isUnlocked = unlocked.has(q.id);
  const avail = isAvailable(sci, q, unlocked);
  const state = isUnlocked ? 'done' : avail ? 'open' : 'locked';
  const kind = QUEST_KINDS[q.kind];
  const need = q.requires
    .filter((r) => !unlocked.has(r))
    .map((r) => sci.quests.find((x) => x.id === r)?.title)
    .filter(Boolean);

  return `
  <article class="quest ${state}" data-quest="${q.id}" data-tier="${q.tier}" tabindex="0"
           role="button" aria-expanded="${isUnlocked}">
    <header class="q-head">
      <span class="q-glyph">${kind.glyph}</span>
      <div class="q-titles">
        <h4>${q.title}</h4>
        <p class="q-meta"><span class="q-kind">${kind.label}</span><span class="q-year">${q.year}</span></p>
      </div>
      <span class="q-impact" title="Downstream impact">${'◆'.repeat(q.impact)}<i>${'◇'.repeat(5 - q.impact)}</i></span>
    </header>
    <p class="q-summary">${q.summary}</p>
    <div class="q-detail"><div class="q-detail-inner"><p>${q.detail}</p></div></div>
    <p class="q-lock">${need.length ? `Requires: ${need.join(' · ')}` : 'Click to study'}</p>
  </article>`;
}

function questTree(sci) {
  const unlocked = unlockedSet(sci.id);
  const tiers = [...new Set(sci.quests.map((q) => q.tier))].sort((a, b) => a - b);
  return `
  <div class="tree" id="tree">
    <svg class="tree-links" aria-hidden="true"></svg>
    ${tiers.map((t) => `
      <div class="tier" data-tier="${t}">
        <div class="tier-label"><span>Tier ${t + 1}</span></div>
        <div class="tier-row">
          ${sci.quests.filter((q) => q.tier === t).map((q) => questCard(sci, q, unlocked)).join('')}
        </div>
      </div>`).join('')}
  </div>`;
}

/* ── the sheet ───────────────────────────────────────────────────────── */

export class Sheet {
  constructor(el) {
    this.el = el;
    this.sci = null;
    this.onBack = () => {};
    window.addEventListener('resize', () => this.drawLinks());
  }

  open(sci) {
    this.sci = sci;
    this.el.style.setProperty('--accent', sci.accent);
    this.el.style.setProperty('--accent2', sci.accent2);
    this.el.innerHTML = this.render(sci);
    this.el.scrollTop = 0;
    this.el.hidden = false;
    requestAnimationFrame(() => {
      this.el.classList.add('in');
      this.drawLinks();
      this.animateIn();
    });
    this.bind();
    this.mountExp(sci);
  }

  /** Wing II screens carry an apparatus; the story stays sealed until it runs. */
  mountExp(sci) {
    const host = $('[data-exp]', this.el);
    if (!host || !sci.game) return;
    const reveal = () => {
      const beats = $('[data-beats]', this.el);
      const lock = $('[data-locked]', this.el);
      if (beats) beats.classList.add('shown');
      if (lock) lock.remove();
    };
    const already = mountExperiment(host, sci, reveal);
    if (already) reveal();
  }

  close() {
    this.el.classList.remove('in');
    setTimeout(() => { this.el.hidden = true; this.el.innerHTML = ''; }, 420);
  }

  render(sci) {
    const hasQuests = !!(sci.quests && sci.quests.length);
    const xp = hasQuests ? xpFor(sci) : 0;
    const lvl = levelFor(xp);
    const u = unlockedSet(sci.id);
    const pct = hasQuests ? Math.round((u.size / sci.quests.length) * 100) : 0;
    const no = numberOf(sci);

    return `
    <div class="sheet-inner">
      <button class="back" data-act="back" aria-label="Back to the hall">
        <span aria-hidden="true">←</span> The Hall <kbd>Esc</kbd>
      </button>

      <header class="hero">
        <div class="hero-art">
          <div class="art-frame">${buildPortrait(sci.id, sci.accent)}</div>
          <div class="art-plaque">
            <span class="rarity ${sci.rarity}">${sci.rarity === 'underrated' ? 'Underrated' : 'Legendary'}</span>
            <span class="no">№ ${no}</span>
          </div>
        </div>

        <div class="hero-text">
          <p class="eyebrow">${sci.class} · ${sci.era}</p>
          <h1 class="hero-name">${sci.name}</h1>
          <p class="hero-title">“${sci.title}”</p>
          <dl class="vitals">
            <div><dt>Lifespan</dt><dd>${sci.life}</dd></div>
            <div><dt>Origin</dt><dd>${sci.origin}</dd></div>
            ${hasQuests ? `<div><dt>Quests</dt><dd>${sci.quests.length} logged</dd></div>` : ''}
          </dl>
          <p class="tagline">${sci.tagline}</p>

          ${hasQuests ? `
          <div class="xp">
            <div class="xp-top">
              <span class="lvl">Lv ${lvl}</span>
              <span class="xp-num" data-xp>${xp} XP</span>
              <span class="pct" data-pct>${pct}% studied</span>
            </div>
            <div class="xp-bar"><i data-bar style="--v:${pct}%"></i></div>
          </div>
          <div class="hero-actions">
            <button class="btn ghost" data-act="revealall">Reveal every entry</button>
            <button class="btn ghost" data-act="reset">Reset progress</button>
          </div>` : ''}
        </div>
      </header>

      ${sci.game ? `
      <section class="panel">
        <h2 class="sec-title"><span>The Experiment</span></h2>
        <p class="sec-sub">${sci.beats
          ? 'The story below is sealed until you have run this yourself.'
          : 'Their own apparatus, rebuilt. The quest log below has its own unlock chain, so this one is a bench rather than a lock — but it counts toward the codex.'}</p>
        <div data-exp></div>
      </section>` : ''}

      ${sci.beats ? `
      <section class="panel">
        <div class="beats" data-beats>
          ${sci.beats.map((b, j) => `
            <div class="beat" style="--bd:${j * 160}ms"><h4>${b.head}</h4><p>${b.body}</p></div>`).join('')}
          <div class="today">
            <h4>So what does that have to do with you?</h4>
            <p>${sci.today}</p>
          </div>
        </div>
        <p class="locked-note" data-locked>▓▒░ SEALED — RUN THE EXPERIMENT ░▒▓</p>
      </section>` : `
      <section class="panel intro-panel">
        <p class="intro">${sci.intro}</p>
        ${sci.underrated ? `<aside class="underrated"><h3>Why this one is underrated</h3><p>${sci.underrated}</p></aside>` : ''}
        ${sci.quote ? `<blockquote class="quote"><p>“${sci.quote.text}”</p><cite>${sci.quote.source}</cite></blockquote>` : ''}
      </section>`}

      ${sci.stats ? `
      <section class="panel">
        <h2 class="sec-title"><span>Attribute Profile</span></h2>
        <div class="stats-wrap">${radar(sci)}</div>
      </section>` : ''}

      ${hasQuests ? `
      <section class="panel">
        <h2 class="sec-title"><span>Quest Log</span></h2>
        <p class="sec-sub">Every node is a documented contribution. Study one to unlock what it led to.</p>
        ${questTree(sci)}
      </section>` : ''}

      ${sci.artifacts ? `
      <section class="panel">
        <h2 class="sec-title"><span>Artifacts</span></h2>
        <div class="artifacts">
          ${sci.artifacts.map((a) => `
            <div class="artifact"><h4>${a.name}</h4><p class="a-year">${a.year}</p><p>${a.what}</p></div>`).join('')}
        </div>
      </section>` : ''}

      <section class="panel sources">
        <h2 class="sec-title"><span>Sources</span></h2>
        <p class="sec-sub">What the entries above were built from. Go and check them.</p>
        <ul>
          ${sci.sources.map((x) => {
            const t = x.t || x.title, u2 = x.u || x.url;
            return `<li><a href="${u2}" target="_blank" rel="noopener noreferrer">${t}</a></li>`;
          }).join('')}
        </ul>
      </section>

      <footer class="sheet-foot">
        <button class="btn" data-act="back">← Return to the Hall</button>
      </footer>
    </div>`;
  }

  bind() {
    this.el.addEventListener('click', (e) => {
      const act = e.target.closest('[data-act]');
      if (act) {
        const a = act.dataset.act;
        if (a === 'back') { sfx.back(); this.onBack(); }
        if (a === 'revealall') this.revealAll();
        if (a === 'reset') this.reset();
        return;
      }
      const card = e.target.closest('.quest');
      if (card) this.tryUnlock(card);
    });

    this.el.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.quest');
      if (card) { e.preventDefault(); this.tryUnlock(card); }
    });

    $$('.quest', this.el).forEach((c) =>
      c.addEventListener('pointerenter', () => { if (!c.classList.contains('locked')) sfx.hover(); }));
  }

  tryUnlock(card) {
    const sci = this.sci;
    const id = card.dataset.quest;
    const q = sci.quests.find((x) => x.id === id);
    const u = unlockedSet(sci.id);

    if (u.has(id)) {                       // already studied — just fold it away
      card.classList.toggle('collapsed');
      card.setAttribute('aria-expanded', String(!card.classList.contains('collapsed')));
      return;
    }
    if (!isAvailable(sci, q, u)) {
      sfx.deny();
      card.classList.remove('shake');
      void card.offsetWidth;
      card.classList.add('shake');
      return;
    }

    u.add(id);
    progress[sci.id] = { unlocked: [...u] };
    saveProgress();
    sfx.unlock();

    card.classList.remove('open');
    card.classList.add('done', 'just');
    card.setAttribute('aria-expanded', 'true');
    this.burst(card);
    setTimeout(() => card.classList.remove('just'), 1400);

    this.refreshStates();
    this.bumpXp();
  }

  revealAll() {
    const sci = this.sci;
    const u = unlockedSet(sci.id);
    const pending = sci.quests.filter((q) => !u.has(q.id));
    if (!pending.length) return;
    sfx.select();
    pending.forEach((q, i) => setTimeout(() => {
      u.add(q.id);
      progress[sci.id] = { unlocked: [...u] };
      saveProgress();
      const card = $(`.quest[data-quest="${q.id}"]`, this.el);
      if (card) { card.classList.remove('open', 'locked'); card.classList.add('done', 'just'); setTimeout(() => card.classList.remove('just'), 1200); }
      this.refreshStates();
      this.bumpXp();
    }, i * 90));
  }

  reset() {
    delete progress[this.sci.id];
    saveProgress();
    sfx.back();
    this.open(this.sci);
  }

  refreshStates() {
    const sci = this.sci;
    const u = unlockedSet(sci.id);
    sci.quests.forEach((q) => {
      const card = $(`.quest[data-quest="${q.id}"]`, this.el);
      if (!card) return;
      card.classList.remove('done', 'open', 'locked');
      card.classList.add(u.has(q.id) ? 'done' : isAvailable(sci, q, u) ? 'open' : 'locked');
      const need = q.requires.filter((r) => !u.has(r))
        .map((r) => sci.quests.find((x) => x.id === r)?.title).filter(Boolean);
      const lock = $('.q-lock', card);
      if (lock) lock.textContent = need.length ? `Requires: ${need.join(' · ')}` : 'Click to study';
    });
    this.drawLinks();
  }

  bumpXp() {
    const sci = this.sci;
    const xp = xpFor(sci);
    const u = unlockedSet(sci.id);
    const pct = Math.round((u.size / sci.quests.length) * 100);
    const bar = $('[data-bar]', this.el);
    const num = $('[data-xp]', this.el);
    const pc = $('[data-pct]', this.el);
    const lv = $('.lvl', this.el);
    if (bar) bar.style.setProperty('--v', pct + '%');
    if (num) { num.textContent = `${xp} XP`; num.classList.remove('tick'); void num.offsetWidth; num.classList.add('tick'); }
    if (pc) pc.textContent = `${pct}% studied`;
    if (lv) lv.textContent = `Lv ${levelFor(xp)}`;
    if (pct === 100) this.el.classList.add('mastered');
  }

  /** Particle burst on unlock, in the character's accent colour. */
  burst(card) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = card.getBoundingClientRect();
    const host = document.createElement('div');
    host.className = 'burst';
    host.style.left = `${r.left + r.width / 2}px`;
    host.style.top = `${r.top + 28}px`;
    for (let i = 0; i < 18; i++) {
      const s = document.createElement('i');
      const a = (i / 18) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 40 + Math.random() * 90;
      s.style.setProperty('--dx', `${Math.cos(a) * dist}px`);
      s.style.setProperty('--dy', `${Math.sin(a) * dist}px`);
      s.style.setProperty('--d', `${Math.random() * 0.12}s`);
      host.appendChild(s);
    }
    document.body.appendChild(host);
    setTimeout(() => host.remove(), 1200);
  }

  /** Draw prerequisite links between tiers once the cards have been laid out. */
  drawLinks() {
    const tree = $('#tree', this.el);
    if (!tree) return;
    const svg = $('.tree-links', tree);
    if (!svg) return;
    const box = tree.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    svg.setAttribute('width', box.width);
    svg.setAttribute('height', box.height);

    if (window.innerWidth < 620) { svg.innerHTML = ''; return; }

    const u = unlockedSet(this.sci.id);
    const paths = [];
    this.sci.quests.forEach((q) => {
      const to = $(`.quest[data-quest="${q.id}"]`, tree);
      if (!to) return;
      const tb = to.getBoundingClientRect();
      q.requires.forEach((rid) => {
        const from = $(`.quest[data-quest="${rid}"]`, tree);
        if (!from) return;
        const fb = from.getBoundingClientRect();
        // tiers stack vertically, so links run bottom-of-prerequisite to
        // top-of-dependant with a vertical-tangent bezier
        const x1 = fb.left + fb.width / 2 - box.left, y1 = fb.bottom - box.top;
        const x2 = tb.left + tb.width / 2 - box.left, y2 = tb.top - box.top;
        const my = (y1 + y2) / 2;
        const live = u.has(rid) && u.has(q.id);
        const half = u.has(rid);
        paths.push(`<path class="link ${live ? 'live' : half ? 'half' : ''}"
          d="M ${x1} ${y1} C ${x1} ${my} ${x2} ${my} ${x2} ${y2}"/>`);
      });
    });
    svg.innerHTML = paths.join('');
  }

  animateIn() {
    $$('.panel, .hero', this.el).forEach((p, i) => {
      p.style.setProperty('--rd', `${i * 90}ms`);
      p.classList.add('rise');
    });
  }
}

/* ── the hall overlay ────────────────────────────────────────────────── */

export class HallUI {
  constructor(el) {
    this.el = el;
    this.no = $('[data-no]', el);
    this.name = $('[data-name]', el);
    this.title = $('[data-title]', el);
    this.life = $('[data-life]', el);
    this.rar = $('[data-rar]', el);
    this.dots = $('[data-dots]', el);
    this.dots.innerHTML = ROSTER.map((s2, i) =>
      `<button class="dot" data-i="${i}" title="${s2.name}" aria-label="${s2.name}"><span></span></button>`).join('');
    this.bar = $('.railbar', el);
    this.last = -1;
  }

  set(i) {
    if (i === this.last) return;
    this.last = i;
    const s2 = ROSTER[i];
    this.el.style.setProperty('--accent', s2.accent);
    this.el.style.setProperty('--accent2', s2.accent2);
    this.no.textContent = numberOf(s2);
    this.name.textContent = s2.name;
    this.title.textContent = `“${s2.title}”`;
    this.life.textContent = s2.life;
    this.rar.textContent = s2.rarity === 'underrated' ? 'Underrated' : 'Legendary';
    this.rar.className = `rarity ${s2.rarity}`;
    $$('.dot', this.dots).forEach((d, j) => d.classList.toggle('on', j === i));
    const on = $('.dot.on', this.dots);
    if (on) on.scrollIntoView({ block: 'nearest', inline: 'center' });
    this.bar.classList.remove('flip');
    void this.bar.offsetWidth;
    this.bar.classList.add('flip');
  }
}

export { $, $$, byId, ROSTER };
