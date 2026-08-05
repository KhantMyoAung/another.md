/**
 * THE POP LAB — five experiments, five reveals.
 *
 * Each scientist's panel stays shut until you have actually operated their
 * apparatus. The experiments are simplified but not faked: the crater really
 * scales with v², the polymer pairs are the real monomers, and boiling the
 * wormwood really does destroy the yield.
 */

import { LAB } from './lab-data.js';
import { sfx } from './audio.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const KEY = 'codex.lab.v1';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

let done = new Set();
try { done = new Set(JSON.parse(localStorage.getItem(KEY)) || []); } catch { /* first visit */ }
const save = () => localStorage.setItem(KEY, JSON.stringify([...done]));

/* ── shared chrome ───────────────────────────────────────────────────── */

function boom(host, word = 'BOOM!') {
  sfx.deny();
  if (reduced) return;
  const b = document.createElement('div');
  b.className = 'boom burst';
  b.textContent = word;
  host.appendChild(b);
  host.classList.add('shake-hard');
  setTimeout(() => { b.remove(); host.classList.remove('shake-hard'); }, 800);
}

function unlock(card) {
  const id = card.dataset.id;
  if (!done.has(id)) { done.add(id); save(); }
  card.classList.add('open');
  sfx.unlock();
  $$('.beat', card).forEach((b, i) => b.style.setProperty('--bd', `${i * 160}ms`));
  const foot = $('.stage-foot .readout', card);
  if (foot) foot.innerHTML = '<b>✔ EXPERIMENT COMPLETE</b> — panel open below';
  refreshProgress();
  if (!reduced) card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function refreshProgress() {
  $('[data-progress]').textContent = `${done.size} / ${LAB.length} experiments run`;
}

/* ── markup ──────────────────────────────────────────────────────────── */

const STAGES = {
  crater: () => `
    <div class="ctrl-row" role="group" aria-label="Impact speed">
      <span class="readout">Impact speed:</span>
      <button class="chip" data-v="1" aria-pressed="true">× 1</button>
      <button class="chip" data-v="2" aria-pressed="false">× 2</button>
      <button class="chip" data-v="3" aria-pressed="false">× 3</button>
      <button class="pop-btn sm red" data-drop>Drop</button>
    </div>
    <canvas class="play" width="900" height="430" data-canvas></canvas>
    <div data-quiz hidden style="margin-top:16px">
      <div class="balloon" style="max-width:none;margin-bottom:26px">
        Double the speed. How much deeper does it bite?
      </div>
      <div class="ctrl-row">
        <button class="chip" data-a="2">Twice as deep</button>
        <button class="chip" data-a="4">Four times as deep</button>
        <button class="chip" data-a="1">Exactly the same</button>
      </div>
    </div>`,

  hop: () => `
    <div class="ctrl-row">
      <span class="readout">Clean hops: <b data-hops>0</b> / 8</span>
      <span class="readout">Status: <b data-stat>standing by</b></span>
      <button class="pop-btn sm blue" data-start>Transmit</button>
    </div>
    <div class="keys" data-keys aria-label="Frequency channels"></div>
    <p class="hintline" style="margin-top:10px">
      <b>Blue</b> = you. <b>Yellow</b> = the next channel in the shared sequence — click it.
      <b>Red</b> = the jammer sweeping the band. Let it catch you and the message dies.
    </p>`,

  mix: () => `
    <div class="ctrl-row"><span class="readout">Pick exactly two, then react.</span>
      <button class="pop-btn sm red" data-react>React</button>
      <button class="chip" data-clear>Clear</button>
    </div>
    <div class="flasks" data-flasks></div>
    <div data-result style="margin-top:18px"></div>`,

  pump: () => `
    <div class="ctrl-row">
      <span class="readout">Houses surveyed: <b data-surv>0</b> / 14</span>
      <span class="readout">Deaths recorded: <b data-deaths>0</b></span>
    </div>
    <canvas class="play" width="900" height="340" data-canvas></canvas>
    <div data-rope hidden style="margin-top:18px;text-align:center">
      <div class="balloon" style="margin:0 auto 26px">
        There it is. Every bar leans on one pump. Now take the handle off.
      </div>
      <div data-ropewrap style="display:inline-block;user-select:none;cursor:grab;touch-action:none">
        <svg width="120" height="170" viewBox="0 0 120 170" aria-label="Pump rope">
          <line x1="60" y1="0" x2="60" y2="110" stroke="#111" stroke-width="7"/>
          <g data-grip><rect x="34" y="106" width="52" height="30" rx="8" fill="#e6242a" stroke="#111" stroke-width="5"/></g>
        </svg>
        <p class="readout" style="text-align:center;margin:0">↓ PULL ↓</p>
      </div>
    </div>`,

  extract: () => `
    <div class="ctrl-row" role="group" aria-label="Solvent">
      <span class="readout">Solvent:</span>
      <button class="chip" data-s="water" aria-pressed="true">Water</button>
      <button class="chip" data-s="ethanol" aria-pressed="false">Ethanol</button>
      <button class="chip" data-s="ether" aria-pressed="false">Ethyl ether</button>
    </div>
    <div class="dial-wrap">
      <span class="readout">Temperature: <b data-temp>100 °C</b></span>
      <input class="pop-range" type="range" min="20" max="100" value="100" data-heat aria-label="Extraction temperature">
    </div>
    <canvas class="play" width="900" height="260" data-canvas></canvas>
    <div class="ctrl-row" style="margin:14px 0 0">
      <span class="readout">Yield: <b data-yield>0%</b></span>
      <button class="pop-btn sm red" data-run>Run extraction</button>
    </div>`
};

function cardHTML(s, i) {
  const open = done.has(s.id);
  return `
  <article class="card ink-${s.ink} ${open ? 'open' : ''}" data-id="${s.id}" data-game="${s.game}">
    <div class="card-head">
      <span class="card-no">${String(i + 6).padStart(2, '0')}</span>
      <div>
        <h2 class="card-name">${s.name}</h2>
        <p class="card-meta">${s.role} · ${s.life} · ${s.origin}</p>
      </div>
    </div>
    <p class="card-hook">${s.hook}</p>

    <div class="stage">
      <div class="stage-bar">
        <span class="stage-tag">${s.gameTitle}</span>
        <p class="stage-brief">${s.gameBrief}</p>
      </div>
      <div class="stage-body" data-stage>${STAGES[s.game]()}</div>
      <div class="stage-foot">
        <span class="readout">${open ? '<b>✔ EXPERIMENT COMPLETE</b> — panel open below' : 'Locked — run it to read the story'}</span>
        <span class="hintline">${s.gameHint}</span>
      </div>
    </div>

    <p class="locked-note">▓▒░ PANEL SEALED — RUN THE EXPERIMENT ░▒▓</p>

    <div class="beats">
      ${s.beats.map((b, j) => `
        <div class="beat" style="--bd:${j * 160}ms">
          <h4>${b.head}</h4><p>${b.body}</p>
        </div>`).join('')}

      <div class="today">
        <h4>So what does that have to do with you?</h4>
        <p>${s.today}</p>
      </div>

      <div class="srcs">
        <h5>Checked against</h5>
        <ol>${s.sources.map((x) => `<li><a href="${x.u}" target="_blank" rel="noopener noreferrer">${x.t}</a></li>`).join('')}</ol>
      </div>
    </div>
  </article>`;
}

/* ── 06 · du Châtelet — the crater test ──────────────────────────────── */

function initCrater(card) {
  const cv = $('[data-canvas]', card);
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const CLAY = 168;
  let speed = 1;
  const craters = new Map();          // speed → depth
  let ball = null;

  // depth ∝ v² — the whole point. 13px per unit keeps the ×3 crater (9 units)
  // inside the clay bed with room for its label.
  const depthFor = (v) => 13 * v * v;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#fff9e6'; ctx.fillRect(0, 0, W, H);

    // clay bed
    ctx.fillStyle = '#0b63d6';
    ctx.fillRect(0, CLAY, W, H - CLAY);
    ctx.fillStyle = 'rgba(255,255,255,.30)';
    for (let y = CLAY + 6; y < H; y += 9) for (let x = 5; x < W; x += 9) {
      ctx.beginPath(); ctx.arc(x, y, 1.4, 0, 7); ctx.fill();
    }
    ctx.strokeStyle = '#111'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(0, CLAY); ctx.lineTo(W, CLAY); ctx.stroke();

    // craters already made
    [1, 2, 3].forEach((v) => {
      const d = craters.get(v);
      if (!d) return;
      const x = 190 + (v - 1) * 260;
      ctx.fillStyle = '#fff9e6';
      ctx.beginPath();
      ctx.ellipse(x, CLAY + d / 2, 34, d / 2, 0, 0, 7);
      ctx.fill();
      ctx.strokeStyle = '#111'; ctx.lineWidth = 5; ctx.stroke();

      ctx.fillStyle = '#111';
      ctx.font = 'bold 17px "Space Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(`×${v} SPEED`, x, CLAY + d + 34);
      ctx.fillText(`DEPTH ${Math.round(d / 13)}`, x, CLAY + d + 56);
    });

    // guide columns
    [1, 2, 3].forEach((v) => {
      const x = 190 + (v - 1) * 260;
      ctx.setLineDash([8, 8]); ctx.strokeStyle = 'rgba(17,17,17,.28)'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, CLAY); ctx.stroke();
      ctx.setLineDash([]);
    });

    if (ball) {
      ctx.fillStyle = '#e6242a';
      ctx.beginPath(); ctx.arc(ball.x, ball.y, 24, 0, 7); ctx.fill();
      ctx.strokeStyle = '#111'; ctx.lineWidth = 6; ctx.stroke();
      ctx.fillStyle = 'rgba(255,255,255,.75)';
      ctx.beginPath(); ctx.arc(ball.x - 8, ball.y - 9, 6, 0, 7); ctx.fill();
    }
  }

  function drop() {
    if (ball) return;
    const x = 190 + (speed - 1) * 260;
    ball = { x, y: 30, v: 4 + speed * 3.2 };
    const step = () => {
      ball.y += ball.v;
      ball.v += 1.1;
      if (ball.y >= CLAY) {
        craters.set(speed, depthFor(speed));
        sfx.move();
        ball = null;
        draw();
        if (craters.size === 3) {
          $('[data-quiz]', card).hidden = false;
          sfx.select();
        }
        return;
      }
      draw();
      requestAnimationFrame(step);
    };
    step();
  }

  $$('.chip[data-v]', card).forEach((c) => c.addEventListener('click', () => {
    speed = Number(c.dataset.v);
    $$('.chip[data-v]', card).forEach((o) => o.setAttribute('aria-pressed', String(o === c)));
    sfx.hover();
  }));
  $('[data-drop]', card).addEventListener('click', drop);

  $$('[data-quiz] .chip', card).forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.a === '4') { b.classList.add('done'); unlock(card); }
    else { boom($('[data-stage]', card), 'NOPE!'); }
  }));

  draw();
}

/* ── 07 · Lamarr — the jam ───────────────────────────────────────────── */

function initHop(card) {
  const N = 14;
  const wrap = $('[data-keys]', card);
  wrap.innerHTML = Array.from({ length: N }, (_, i) =>
    `<button class="key" data-k="${i}" aria-label="Channel ${i + 1}"></button>`).join('');
  const keys = $$('.key', wrap);
  const hopsEl = $('[data-hops]', card);
  const statEl = $('[data-stat]', card);

  let me = 0, target = 5, jam = 0, dir = 1, hops = 0, timer = null, tick = 300;

  const paint = () => keys.forEach((k, i) => {
    k.classList.toggle('hit', i === me);
    k.classList.toggle('lit', i === target);
    k.classList.toggle('jam', i === jam);
  });

  function stop(msg) {
    clearInterval(timer); timer = null;
    statEl.textContent = msg;
    $('[data-start]', card).disabled = false;
  }

  function step() {
    jam += dir;
    if (jam >= N - 1 || jam <= 0) dir *= -1;
    if (jam === me) {
      hops = 0; hopsEl.textContent = '0';
      boom($('[data-stage]', card), 'JAMMED!');
      statEl.textContent = 'jammed — start again';
      tick = 300;
      stop('jammed — hit transmit');
      paint();
      return;
    }
    paint();
  }

  function start() {
    hops = 0; hopsEl.textContent = '0'; me = 0; jam = N - 1; dir = -1; tick = 300;
    target = 5;
    statEl.textContent = 'transmitting';
    $('[data-start]', card).disabled = true;
    clearInterval(timer);
    timer = setInterval(step, tick);
    paint();
  }

  keys.forEach((k, i) => k.addEventListener('click', () => {
    if (!timer) return;
    if (i !== target) { statEl.textContent = 'wrong key — the receiver is not there'; sfx.deny(); return; }
    me = i;
    hops++;
    hopsEl.textContent = String(hops);
    sfx.move();
    do { target = Math.floor(Math.random() * N); } while (target === me || target === jam);
    if (hops >= 8) {
      stop('message through ✔');
      paint();
      unlock(card);
      return;
    }
    // the band gets harder to outrun
    tick = Math.max(120, 300 - hops * 22);
    clearInterval(timer);
    timer = setInterval(step, tick);
    paint();
  }));

  $('[data-start]', card).addEventListener('click', start);
  paint();
}

/* ── 08 · Kwolek — the bench ─────────────────────────────────────────── */

const REAGENTS = [
  { id: 'ppd', nm: 'p-Phenylene<br>diamine', c: '#e6242a', rod: true },
  { id: 'tcl', nm: 'Terephthaloyl<br>chloride', c: '#0b63d6', rod: true },
  { id: 'hmd', nm: 'Hexamethylene<br>diamine', c: '#ffd400', rod: false },
  { id: 'adp', nm: 'Adipoyl<br>chloride', c: '#7ac943', rod: false },
  { id: 'h2o', nm: 'Water', c: '#8fd4ff', rod: false },
  { id: 'acid', nm: 'Sulfuric<br>acid', c: '#ff8a3d', rod: false }
];

function initMix(card) {
  const host = $('[data-flasks]', card);
  const out = $('[data-result]', card);
  host.innerHTML = REAGENTS.map((r) => `
    <button class="flask" data-r="${r.id}" aria-pressed="false">
      <div class="vial" style="background:${r.c}"></div>
      <div class="nm">${r.nm}</div>
    </button>`).join('');

  const picked = new Set();
  const sync = () => $$('.flask', host).forEach((f) =>
    f.setAttribute('aria-pressed', String(picked.has(f.dataset.r))));

  $$('.flask', host).forEach((f) => f.addEventListener('click', () => {
    const id = f.dataset.r;
    if (picked.has(id)) picked.delete(id);
    else { if (picked.size >= 2) return; picked.add(id); }
    sfx.hover();
    sync();
  }));

  $('[data-clear]', card).addEventListener('click', () => { picked.clear(); sync(); out.innerHTML = ''; });

  $('[data-react]', card).addEventListener('click', () => {
    if (picked.size !== 2) { out.innerHTML = `<p class="hintline">Pick exactly two.</p>`; return; }
    const has = (a, b) => picked.has(a) && picked.has(b);

    if (picked.has('h2o') || picked.has('acid')) {
      boom($('[data-stage]', card));
      out.innerHTML = `<p class="hintline"><b>That is not a polymerisation, that is an incident.</b>
        Acid chlorides and water do not make fibre — they make heat, HCl gas and a very bad afternoon.</p>`;
      return;
    }
    if (has('hmd', 'adp')) {
      out.innerHTML = `<div class="box" style="box-shadow:5px 5px 0 var(--ink)">
        <p style="margin:0"><b>You just made nylon.</b> Clear, syrupy, well behaved — and Wallace Carothers
        got there at this very company in 1935. Floppy chains coil up in solution. Kwolek needed
        molecules that <em>could not</em> coil: straight, rigid rods.</p></div>`;
      sfx.deny();
      return;
    }
    if (has('ppd', 'tcl')) {
      sfx.select();
      out.innerHTML = `
        <div class="box" style="box-shadow:5px 5px 0 var(--ink)">
          <p style="margin:0 0 10px"><b>The batch is cloudy.</b> Thin, opalescent, low viscosity — it looks
          like dishwater, not polymer. It looks like a failure. Every handbook says undissolved
          particles will wreck the spinneret.</p>
          <p style="margin:0 0 16px;color:var(--muted)">What do you do with it?</p>
          <div class="ctrl-row" style="margin:0">
            <button class="pop-btn sm" data-bin>Bin it</button>
            <button class="pop-btn sm red" data-spin>Spin it anyway</button>
          </div>
        </div>`;
      $('[data-bin]', out).addEventListener('click', () => {
        sfx.back();
        out.innerHTML = `<div class="box" style="box-shadow:5px 5px 0 var(--ink)">
          <p style="margin:0"><b>So did everyone else.</b> That is exactly why nobody found it before 1965.
          Cloudy batches went down the sink as a matter of routine.</p>
          <p style="margin:10px 0 0;color:var(--muted)">Mix it again — and this time argue with the machine operator.</p></div>`;
      });
      $('[data-spin]', out).addEventListener('click', () => {
        out.innerHTML = `<div class="box flash" style="box-shadow:5px 5px 0 var(--ink)">
          <p style="margin:0"><b>Nine times stiffer than anything she had made.</b> Charles Smullen said no for
          days, then ran it to end the argument. The cloudiness was never contamination — the rods had
          already lined up in the flask. That is a liquid crystal, and it is why the fibre is so strong.</p></div>`;
        setTimeout(() => unlock(card), 500);
      });
      return;
    }
    out.innerHTML = `<p class="hintline">Nothing happens. Two amines, or two acid chlorides, have nothing to say to each other —
      an amide bond needs one of each.</p>`;
    sfx.deny();
  });
}

/* ── 09 · Snow — the handle ──────────────────────────────────────────── */

function initPump(card) {
  const cv = $('[data-canvas]', card);
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const PUMP = { x: 452, y: 168 };

  // A stylised Soho block. Deaths fall off sharply with distance from the pump,
  // with two deliberate anomalies: the workhouse and the brewery, both of which
  // had their own water and were barely touched.
  const houses = [];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
    const x = 130 + c * 160, y = 60 + r * 110;
    if (Math.abs(x - PUMP.x) < 40 && Math.abs(y - PUMP.y) < 40) continue;
    const d = Math.hypot(x - PUMP.x, y - PUMP.y);
    houses.push({ x, y, d, deaths: Math.max(0, Math.round(11 - d / 26)), seen: false, tag: null });
  }
  if (houses[5]) { houses[5].deaths = 0; houses[5].tag = 'WORKHOUSE'; }
  if (houses[8]) { houses[8].deaths = 0; houses[8].tag = 'BREWERY'; }

  let surveyed = 0, total = 0, handle = true;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#fff9e6'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(17,17,17,.16)';
    for (let y = 4; y < H; y += 10) for (let x = 4; x < W; x += 10) {
      ctx.beginPath(); ctx.arc(x, y, 1.2, 0, 7); ctx.fill();
    }

    houses.forEach((h) => {
      ctx.fillStyle = h.seen ? '#fff' : '#dcd5c0';
      ctx.strokeStyle = '#111'; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.rect(h.x - 46, h.y - 30, 92, 60); ctx.fill(); ctx.stroke();
      if (!h.seen) {
        ctx.fillStyle = '#6b6459';
        ctx.font = 'bold 13px "Space Mono", monospace'; ctx.textAlign = 'center';
        ctx.fillText('KNOCK', h.x, h.y + 5);
      } else {
        // black bars, one per death, exactly as Snow drew them
        ctx.fillStyle = '#111';
        for (let i = 0; i < h.deaths; i++) ctx.fillRect(h.x - 40 + i * 8, h.y + 4, 5, 22);
        if (h.tag) {
          ctx.fillStyle = '#0b63d6';
          ctx.font = 'bold 11px "Space Mono", monospace'; ctx.textAlign = 'center';
          ctx.fillText(h.tag, h.x, h.y - 8);
          ctx.fillText('OWN WELL', h.x, h.y + 22);
        }
      }
    });

    // the pump
    ctx.fillStyle = handle ? '#e6242a' : '#9aa';
    ctx.strokeStyle = '#111'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(PUMP.x, PUMP.y, 30, 0, 7); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px "Space Mono", monospace'; ctx.textAlign = 'center';
    ctx.fillText('PUMP', PUMP.x, PUMP.y + 4);
    if (!handle) {
      ctx.strokeStyle = '#111'; ctx.lineWidth = 7;
      ctx.beginPath(); ctx.moveTo(PUMP.x - 24, PUMP.y - 24); ctx.lineTo(PUMP.x + 24, PUMP.y + 24); ctx.stroke();
    }
  }

  cv.addEventListener('click', (e) => {
    const r = cv.getBoundingClientRect();
    const x = (e.clientX - r.left) * (W / r.width);
    const y = (e.clientY - r.top) * (H / r.height);
    const h = houses.find((o) => Math.abs(x - o.x) < 46 && Math.abs(y - o.y) < 30 && !o.seen);
    if (!h) return;
    h.seen = true; surveyed++; total += h.deaths;
    $('[data-surv]', card).textContent = String(surveyed);
    $('[data-deaths]', card).textContent = String(total);
    sfx.hover();
    draw();
    if (surveyed >= houses.length) {
      $('[data-rope]', card).hidden = false;
      sfx.select();
    }
  });

  // rope pull
  const wrap = $('[data-ropewrap]', card);
  const grip = $('[data-grip]', card);
  let dragging = false, y0 = 0;
  const setY = (dy) => grip.setAttribute('transform', `translate(0 ${Math.max(0, Math.min(dy, 34))})`);

  wrap.addEventListener('pointerdown', (e) => {
    dragging = true; y0 = e.clientY; wrap.setPointerCapture(e.pointerId); wrap.style.cursor = 'grabbing';
  });
  wrap.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const dy = e.clientY - y0;
    setY(dy);
    if (dy > 32) {
      dragging = false; wrap.style.cursor = 'grab';
      handle = false; draw();
      wrap.innerHTML = '<p class="readout" style="margin:0">HANDLE REMOVED</p>';
      unlock(card);
    }
  });
  const end = () => { dragging = false; wrap.style.cursor = 'grab'; setY(0); };
  wrap.addEventListener('pointerup', end);
  wrap.addEventListener('pointercancel', end);

  draw();
}

/* ── 10 · Tu Youyou — the cold press ─────────────────────────────────── */

function initExtract(card) {
  const cv = $('[data-canvas]', card);
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  let solvent = 'water', temp = 100, yieldPct = 0, broken = 0;

  // Ether at low temperature is the real answer — it boils at 35 °C, which is
  // exactly why it can pull the compound out without cooking it.
  function computeYield() {
    if (solvent === 'ether') return temp <= 40 ? 100 : Math.max(0, Math.round(100 - (temp - 40) * 1.6));
    if (solvent === 'ethanol') return temp <= 40 ? 38 : Math.max(0, Math.round(38 - (temp - 40) * 0.6));
    return temp <= 40 ? 12 : 0;
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#fff9e6'; ctx.fillRect(0, 0, W, H);

    // flask
    ctx.strokeStyle = '#111'; ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(360, 40); ctx.lineTo(360, 110); ctx.lineTo(300, 210);
    ctx.quadraticCurveTo(290, 232, 320, 232); ctx.lineTo(580, 232);
    ctx.quadraticCurveTo(610, 232, 600, 210); ctx.lineTo(540, 110); ctx.lineTo(540, 40);
    ctx.stroke();

    const fill = { water: '#8fd4ff', ethanol: '#ffd400', ether: '#e6242a' }[solvent];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(360, 120); ctx.lineTo(305, 212);
    ctx.quadraticCurveTo(298, 226, 322, 226); ctx.lineTo(578, 226);
    ctx.quadraticCurveTo(602, 226, 595, 212); ctx.lineTo(540, 120);
    ctx.closePath(); ctx.fillStyle = fill; ctx.fill();
    ctx.clip();
    ctx.fillStyle = 'rgba(255,255,255,.4)';
    for (let y = 120; y < 232; y += 9) for (let x = 296; x < 606; x += 9) {
      ctx.beginPath(); ctx.arc(x, y, 1.4, 0, 7); ctx.fill();
    }
    ctx.restore();

    // artemisinin molecules — intact rings, or snapped apart when cooked
    const n = 9;
    for (let i = 0; i < n; i++) {
      const x = 330 + (i % 5) * 52 + (i > 4 ? 26 : 0);
      const y = 160 + Math.floor(i / 5) * 40;
      const dead = i < broken;
      ctx.strokeStyle = '#111'; ctx.lineWidth = 4;
      ctx.fillStyle = dead ? '#bbb' : '#fff';
      if (dead) {
        ctx.beginPath(); ctx.moveTo(x - 10, y - 10); ctx.lineTo(x + 10, y + 10);
        ctx.moveTo(x + 10, y - 10); ctx.lineTo(x - 10, y + 10); ctx.stroke();
      } else {
        ctx.beginPath();
        for (let k = 0; k < 6; k++) {
          const a = (k / 6) * Math.PI * 2 - Math.PI / 2;
          const px = x + Math.cos(a) * 13, py = y + Math.sin(a) * 13;
          k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
        }
        ctx.closePath(); ctx.fill(); ctx.stroke();
      }
    }

    // heat
    ctx.fillStyle = temp > 45 ? '#e6242a' : '#0b63d6';
    ctx.fillRect(300, 244, (temp / 100) * 300, 12);
    ctx.strokeStyle = '#111'; ctx.lineWidth = 4;
    ctx.strokeRect(300, 244, 300, 12);
    ctx.fillStyle = '#111';
    ctx.font = 'bold 15px "Space Mono", monospace'; ctx.textAlign = 'left';
    ctx.fillText(`${temp} °C`, 620, 256);
    ctx.textAlign = 'center';
    ctx.font = 'bold 14px "Space Mono", monospace';
    ctx.fillText(solvent.toUpperCase(), 450, 70);
  }

  $$('.chip[data-s]', card).forEach((c) => c.addEventListener('click', () => {
    solvent = c.dataset.s;
    $$('.chip[data-s]', card).forEach((o) => o.setAttribute('aria-pressed', String(o === c)));
    sfx.hover(); draw();
  }));

  const heat = $('[data-heat]', card);
  heat.addEventListener('input', () => {
    temp = Number(heat.value);
    $('[data-temp]', card).textContent = `${temp} °C`;
    draw();
  });

  $('[data-run]', card).addEventListener('click', () => {
    yieldPct = computeYield();
    broken = Math.round((1 - yieldPct / 100) * 9);
    draw();
    $('[data-yield]', card).textContent = `${yieldPct}%`;
    if (yieldPct >= 95) {
      sfx.select();
      setTimeout(() => unlock(card), 350);
    } else if (temp > 60) {
      boom($('[data-stage]', card), 'COOKED!');
    } else {
      sfx.deny();
    }
  });

  draw();
}

/* ── boot ────────────────────────────────────────────────────────────── */

const INIT = { crater: initCrater, hop: initHop, mix: initMix, pump: initPump, extract: initExtract };

$('#cards').innerHTML = LAB.map(cardHTML).join('');
$$('.card').forEach((card) => INIT[card.dataset.game](card));
refreshProgress();
