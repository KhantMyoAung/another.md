/**
 * THE EXPERIMENTS.
 *
 * Ten rigs, each mounted into a single scientist's screen. A screen stays
 * sealed until its apparatus has actually been operated.
 *
 * The experiments are simplified but not faked: the crater really scales with
 * v², the polymer pairs are the real monomers, ether really does boil at 35 °C,
 * and Snow's map really does carry the workhouse and brewery anomalies that
 * made his argument.
 */

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
  const foot = $('.stage-foot .readout', card);
  if (foot) foot.innerHTML = '<b>✔ EXPERIMENT COMPLETE</b>';
  if (typeof card.__onDone === 'function') card.__onDone();
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
    </div>`,

  cepheid: () => `
    <canvas class="play" width="900" height="300" data-canvas></canvas>
    <div class="ctrl-row" style="margin-top:14px">
      <button class="pop-btn sm red" data-tap>Tap at peak</button>
      <span class="readout">Peaks timed: <b data-taps>0</b> / 3</span>
      <span class="readout">Period: <b data-period>— s</b></span>
    </div>
    <div data-q2 hidden style="margin-top:16px">
      <div class="balloon" style="max-width:none;margin-bottom:26px">
        Two stars look equally bright from here. One blinks every 3 days, one every 30.
        Which is further away?
      </div>
      <div class="ctrl-row">
        <button class="chip" data-a2="slow">The 30-day one</button>
        <button class="chip" data-a2="fast">The 3-day one</button>
        <button class="chip" data-a2="same">Same distance</button>
      </div>
    </div>`,

  filament: () => `
    <div class="ctrl-row" role="group" aria-label="Fibre">
      <span class="readout">Fibre:</span>
      <button class="chip" data-f="cotton" aria-pressed="true">Cotton thread</button>
      <button class="chip" data-f="bamboo" aria-pressed="false">Bamboo</button>
      <button class="chip" data-f="paper" aria-pressed="false">Paper</button>
    </div>
    <div class="ctrl-row" role="group" aria-label="Carbonising method">
      <span class="readout">Bake it:</span>
      <button class="chip" data-m="bare" aria-pressed="true">Bare in the oven</button>
      <button class="chip" data-m="card" aria-pressed="false">In a cardboard envelope</button>
    </div>
    <canvas class="play" width="900" height="280" data-canvas></canvas>
    <div class="ctrl-row" style="margin-top:14px">
      <span class="readout">Lamp life: <b data-life>—</b></span>
      <button class="pop-btn sm red" data-burn>Switch on</button>
    </div>`,

  centrifuge: () => `
    <canvas class="play" width="900" height="300" data-canvas></canvas>
    <div class="ctrl-row" style="margin-top:14px">
      <button class="pop-btn sm red" data-spin>Hold to spin</button>
      <span class="readout">RPM: <b data-rpm>0</b></span>
      <span class="readout">Held in band: <b data-hold>0.0</b>s / 4.0s</span>
    </div>
    <p class="hintline" style="margin-top:8px">Press and hold. Let go and it slows. Keep the needle inside the green.</p>`,

  solar: () => `
    <canvas class="play" width="900" height="320" data-canvas></canvas>
    <div class="dial-wrap" style="margin-top:14px">
      <span class="readout">Collector angle:</span>
      <input class="pop-range" type="range" min="0" max="180" value="90" data-angle aria-label="Collector angle">
    </div>
    <div class="ctrl-row">
      <span class="readout">Salt charged: <b data-charge>0%</b></span>
      <span class="readout"><b data-phase>Daybreak</b></span>
      <button class="pop-btn sm red" data-startday>Start the day</button>
    </div>`,

  vault: () => `
    <canvas class="play" width="900" height="260" data-canvas></canvas>
    <div class="ctrl-row" style="margin-top:14px">
      <span class="readout">Siege day: <b data-day>0</b> / 872</span>
      <span class="readout">Rats at the door: <b data-rats>0</b></span>
      <button class="pop-btn sm blue" data-guard>Guard the boxes</button>
      <button class="pop-btn sm red" data-eat>Eat the seeds</button>
    </div>
    <p class="hintline" style="margin-top:8px" data-vmsg>Keep tapping GUARD to beat the rats back. The other button is always available.</p>`
};

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

/* ── 11 · Leavitt — the blinking star ────────────────────────────────── */

function initCepheid(card) {
  const cv = $('[data-canvas]', card);
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const PERIOD = 2400;                 // ms between peaks
  const t0 = performance.now();
  const taps = [];
  let raf;

  // Brightness peaks sharply and decays — the sawtooth shape of a real Cepheid,
  // which is why they are timeable by eye in the first place.
  const phaseAt = (t) => ((t - t0) % PERIOD) / PERIOD;
  const brightAt = (p) => (p < 0.18 ? p / 0.18 : 1 - (p - 0.18) / 0.82 * 0.75);

  function draw() {
    const now = performance.now();
    const p = phaseAt(now);
    const b = brightAt(p);
    ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,255,255,.22)';
    for (let i = 0; i < 90; i++) {
      const x = (i * 137) % W, y = (i * 219) % H;
      ctx.fillRect(x, y, 2, 2);
    }
    const r = 26 + b * 40;
    ctx.fillStyle = '#ffd400';
    ctx.beginPath(); ctx.arc(W / 2, 118, r, 0, 7); ctx.fill();
    ctx.strokeStyle = '#fff9e6'; ctx.lineWidth = 5; ctx.stroke();
    ctx.globalAlpha = b * .35;
    ctx.beginPath(); ctx.arc(W / 2, 118, r + 34, 0, 7); ctx.fill();
    ctx.globalAlpha = 1;

    // light curve
    ctx.strokeStyle = '#e6242a'; ctx.lineWidth = 4;
    ctx.beginPath();
    for (let x = 0; x <= W - 120; x++) {
      const pp = ((x / (W - 120)) * 2.4) % 1;
      const y = 258 - brightAt(pp) * 52;
      x ? ctx.lineTo(60 + x, y) : ctx.moveTo(60 + x, y);
    }
    ctx.stroke();
    const cx = 60 + p / 2.4 * (W - 120);
    ctx.fillStyle = '#0b63d6';
    ctx.beginPath(); ctx.arc(cx, 258 - b * 52, 9, 0, 7); ctx.fill();
    ctx.strokeStyle = '#fff9e6'; ctx.lineWidth = 4; ctx.stroke();
    raf = requestAnimationFrame(draw);
  }

  $('[data-tap]', card).addEventListener('click', () => {
    const p = phaseAt(performance.now());
    if (p > 0.12 && p < 0.34) {            // near the peak
      taps.push(performance.now());
      $('[data-taps]', card).textContent = String(taps.length);
      sfx.move();
      if (taps.length >= 3) {
        const gaps = taps.slice(1).map((t, i) => t - taps[i]);
        const avg = gaps.reduce((a, b) => a + b, 0) / gaps.length;
        $('[data-period]', card).textContent = `${(avg / 1000).toFixed(1)} s`;
        $('[data-q2]', card).hidden = false;
        sfx.select();
        cancelAnimationFrame(raf);
      }
    } else {
      sfx.deny();
      $('[data-period]', card).textContent = 'missed';
    }
  });

  $$('[data-q2] .chip', card).forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.a2 === 'slow') { b.classList.add('done'); unlock(card); }
    else boom($('[data-stage]', card), 'NOPE!');
  }));

  draw();
}

/* ── 12 · Latimer — the filament ─────────────────────────────────────── */

function initFilament(card) {
  const cv = $('[data-canvas]', card);
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  let fibre = 'cotton', method = 'bare', glow = 0, hours = 0, anim = null;

  // The fibre barely matters. The cardboard envelope is the whole patent.
  const lifeFor = () => {
    const base = { cotton: 34, bamboo: 52, paper: 28 }[fibre];
    return method === 'card' ? base * 12 : base;
  };

  function draw() {
    ctx.fillStyle = '#fff9e6'; ctx.fillRect(0, 0, W, H);
    const cx = W / 2;
    // bulb
    ctx.strokeStyle = '#111'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(cx, 118, 74, Math.PI * .78, Math.PI * .22); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx - 30, 176); ctx.lineTo(cx - 30, 214);
    ctx.lineTo(cx + 30, 214); ctx.lineTo(cx + 30, 176);
    ctx.stroke();
    ctx.fillStyle = '#111';
    for (let y = 180; y < 214; y += 9) ctx.fillRect(cx - 30, y, 60, 4);

    if (glow > 0) {
      ctx.save(); ctx.globalAlpha = glow;
      ctx.fillStyle = '#ffd400';
      ctx.beginPath(); ctx.arc(cx, 118, 70, 0, 7); ctx.fill();
      ctx.restore();
    }
    // filament
    ctx.strokeStyle = glow > 0 ? '#e6242a' : '#111';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx - 20, 176);
    ctx.lineTo(cx - 20, 140);
    for (let i = 0; i < 5; i++) ctx.lineTo(cx - 20 + (i % 2 ? 0 : 40), 130 - i * 9);
    ctx.lineTo(cx + 20, 140); ctx.lineTo(cx + 20, 176);
    ctx.stroke();

    if (method === 'card') {
      ctx.strokeStyle = '#0b63d6'; ctx.lineWidth = 4;
      ctx.setLineDash([9, 7]);
      ctx.strokeRect(cx - 50, 82, 100, 100);
      ctx.setLineDash([]);
      ctx.fillStyle = '#0b63d6';
      ctx.font = 'bold 13px "Space Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillText('CARDBOARD ENVELOPE', cx, 74);
    }
    // life bar
    const pct = Math.min(1, hours / 620);
    ctx.fillStyle = '#fff'; ctx.fillRect(150, 240, W - 300, 20);
    ctx.fillStyle = hours > 300 ? '#0b63d6' : '#e6242a';
    ctx.fillRect(150, 240, (W - 300) * pct, 20);
    ctx.strokeStyle = '#111'; ctx.lineWidth = 5; ctx.strokeRect(150, 240, W - 300, 20);
  }

  const pick = (sel, attr, set) => $$(sel, card).forEach((c) => c.addEventListener('click', () => {
    set(c.dataset[attr]);
    $$(sel, card).forEach((o) => o.setAttribute('aria-pressed', String(o === c)));
    sfx.hover(); hours = 0; glow = 0; $('[data-life]', card).textContent = '—'; draw();
  }));
  pick('.chip[data-f]', 'f', (v) => { fibre = v; });
  pick('.chip[data-m]', 'm', (v) => { method = v; });

  $('[data-burn]', card).addEventListener('click', () => {
    if (anim) return;
    const target = lifeFor();
    hours = 0; glow = 1;
    const t0 = performance.now();
    const step = () => {
      const k = Math.min(1, (performance.now() - t0) / 1400);
      hours = Math.round(target * k);
      $('[data-life]', card).textContent = `${hours} hours`;
      draw();
      if (k < 1) { anim = requestAnimationFrame(step); return; }
      anim = null;
      if (target >= 300) {
        $('[data-life]', card).textContent = `${target} hours — it holds`;
        sfx.select(); setTimeout(() => unlock(card), 400);
      } else {
        glow = 0; draw();
        $('[data-life]', card).textContent = `${target} hours — burnt out`;
        boom($('[data-stage]', card), 'POP!');
      }
    };
    step();
  });

  draw();
}

/* ── 13 · Drew — the centrifuge ──────────────────────────────────────── */

function initCentrifuge(card) {
  const cv = $('[data-canvas]', card);
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  const LO = 2600, HI = 3600;
  let rpm = 0, held = 0, spinning = false, ang = 0, sep = 0, last = performance.now();

  function draw() {
    ctx.fillStyle = '#fff9e6'; ctx.fillRect(0, 0, W, H);
    const cx = 250, cy = 150;

    // rotor
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(ang);
    ctx.strokeStyle = '#111'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(0, 0, 96, 0, 7); ctx.stroke();
    [0, Math.PI].forEach((a) => {
      ctx.save(); ctx.rotate(a);
      ctx.fillStyle = '#e6242a'; ctx.fillRect(-16, -96, 32, 62);
      ctx.strokeRect(-16, -96, 32, 62);
      ctx.restore();
    });
    ctx.restore();

    // dial
    const dx = 620, dy = 150;
    ctx.strokeStyle = '#111'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.arc(dx, dy, 92, Math.PI * .8, Math.PI * 2.2); ctx.stroke();
    // green band
    const a0 = Math.PI * .8 + (LO / 5000) * Math.PI * 1.4;
    const a1 = Math.PI * .8 + (HI / 5000) * Math.PI * 1.4;
    ctx.strokeStyle = '#0b63d6'; ctx.lineWidth = 18;
    ctx.beginPath(); ctx.arc(dx, dy, 92, a0, a1); ctx.stroke();
    const na = Math.PI * .8 + (Math.min(rpm, 5000) / 5000) * Math.PI * 1.4;
    ctx.strokeStyle = '#111'; ctx.lineWidth = 7;
    ctx.beginPath(); ctx.moveTo(dx, dy);
    ctx.lineTo(dx + Math.cos(na) * 84, dy + Math.sin(na) * 84); ctx.stroke();

    // tube
    ctx.strokeStyle = '#111'; ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(408, 60); ctx.lineTo(408, 210);
    ctx.quadraticCurveTo(408, 246, 440, 246);
    ctx.quadraticCurveTo(472, 246, 472, 210); ctx.lineTo(472, 60);
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(410, 62); ctx.lineTo(410, 210);
    ctx.quadraticCurveTo(410, 244, 440, 244);
    ctx.quadraticCurveTo(470, 244, 470, 210); ctx.lineTo(470, 62);
    ctx.closePath(); ctx.clip();
    const split = 90 + sep * 90;
    ctx.fillStyle = '#e6242a'; ctx.fillRect(405, 62, 70, 190);
    ctx.fillStyle = sep > .3 ? '#ffd400' : '#e6242a';
    ctx.fillRect(405, 62, 70, split);
    ctx.restore();
    ctx.fillStyle = '#111';
    ctx.font = 'bold 12px "Space Mono", monospace'; ctx.textAlign = 'center';
    if (sep > .5) { ctx.fillText('PLASMA', 440, 100); ctx.fillText('CELLS', 440, 226); }
  }

  function loop() {
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    rpm += (spinning ? 3400 : -2600) * dt;
    rpm = Math.max(0, Math.min(5000, rpm));
    ang += rpm / 900 * dt;
    const inBand = rpm >= LO && rpm <= HI;
    if (inBand) { held += dt; sep = Math.min(1, held / 4); }
    else held = Math.max(0, held - dt * 1.6);
    $('[data-rpm]', card).textContent = String(Math.round(rpm));
    $('[data-hold]', card).textContent = held.toFixed(1);
    draw();
    if (held >= 4) {
      sfx.select();
      setTimeout(() => unlock(card), 350);
      return;
    }
    requestAnimationFrame(loop);
  }

  // The button travels into its shadow on :active, which can slide it out from
  // under a stationary finger and silently cancel the hold. Capture the pointer
  // so the press survives that, and so a drag off the button still counts.
  const btn = $('[data-spin]', card);
  const on = (e) => {
    e.preventDefault();
    spinning = true;
    try { btn.setPointerCapture(e.pointerId); } catch { /* older engines */ }
  };
  const off = (e) => {
    spinning = false;
    if (e && e.pointerId != null) { try { btn.releasePointerCapture(e.pointerId); } catch { /* already gone */ } }
  };
  btn.addEventListener('pointerdown', on);
  btn.addEventListener('pointerup', off);
  btn.addEventListener('pointercancel', off);
  btn.addEventListener('keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); spinning = true; } });
  btn.addEventListener('keyup', () => { spinning = false; });
  loop();
}

/* ── 14 · Telkes — the sun house ─────────────────────────────────────── */

function initSolar(card) {
  const cv = $('[data-canvas]', card);
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  let angle = 90, charge = 0, day = 0, running = false, night = false;

  function draw() {
    ctx.fillStyle = night ? '#0b1b33' : '#8fd4ff'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = night ? 'rgba(255,255,255,.3)' : 'rgba(255,255,255,.45)';
    for (let y = 6; y < 200; y += 11) for (let x = 6; x < W; x += 11) {
      ctx.beginPath(); ctx.arc(x, y, 1.5, 0, 7); ctx.fill();
    }
    // sun travels 0 → 180° across the day
    const sunA = Math.PI - (day / 100) * Math.PI;
    const sx = W / 2 + Math.cos(sunA) * 330, sy = 220 - Math.sin(sunA) * 165;
    if (!night) {
      ctx.fillStyle = '#ffd400';
      ctx.beginPath(); ctx.arc(sx, sy, 34, 0, 7); ctx.fill();
      ctx.strokeStyle = '#111'; ctx.lineWidth = 6; ctx.stroke();
    }
    // ground + house
    ctx.fillStyle = night ? '#122' : '#fff9e6'; ctx.fillRect(0, 220, W, H - 220);
    ctx.strokeStyle = '#111'; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(0, 220); ctx.lineTo(W, 220); ctx.stroke();
    ctx.fillStyle = '#fff'; ctx.fillRect(W / 2 - 90, 236, 180, 60);
    ctx.strokeRect(W / 2 - 90, 236, 180, 60);

    // collector
    const a = (angle / 180) * Math.PI;
    ctx.save(); ctx.translate(W / 2, 232); ctx.rotate(-a);
    ctx.fillStyle = '#e6242a'; ctx.fillRect(-8, -78, 16, 78);
    ctx.strokeStyle = '#111'; ctx.lineWidth = 5; ctx.strokeRect(-8, -78, 16, 78);
    ctx.restore();

    // aim line
    const err = Math.abs(angle - (180 - (day / 100) * 180));
    ctx.strokeStyle = err < 16 ? '#ffd400' : 'rgba(17,17,17,.2)';
    ctx.lineWidth = err < 16 ? 6 : 3;
    ctx.beginPath(); ctx.moveTo(sx, sy); ctx.lineTo(W / 2, 190); ctx.stroke();

    // salt store
    ctx.fillStyle = '#fff'; ctx.fillRect(60, 250, 130, 46);
    ctx.fillStyle = '#ffd400'; ctx.fillRect(60, 250, 130 * (charge / 100), 46);
    ctx.strokeStyle = '#111'; ctx.lineWidth = 5; ctx.strokeRect(60, 250, 130, 46);
    ctx.fillStyle = '#111'; ctx.font = 'bold 12px "Space Mono", monospace'; ctx.textAlign = 'center';
    ctx.fillText("GLAUBER'S SALT", 125, 243);
  }

  function loop() {
    if (!running) return;
    day += 0.55;
    const want = 180 - (day / 100) * 180;
    if (Math.abs(angle - want) < 16 && !night) charge = Math.min(100, charge + 0.72);
    $('[data-charge]', card).textContent = `${Math.round(charge)}%`;
    if (day >= 100 && !night) {
      night = true;
      $('[data-phase]', card).textContent = 'Nightfall';
      setTimeout(() => {
        running = false;
        if (charge >= 70) {
          $('[data-phase]', card).textContent = 'Warm till morning ✔';
          sfx.select(); setTimeout(() => unlock(card), 400);
        } else {
          $('[data-phase]', card).textContent = 'The house went cold';
          boom($('[data-stage]', card), 'BRRR!');
          setTimeout(() => { day = 0; charge = 0; night = false; angle = 90;
            $('[data-angle]', card).value = 90;
            $('[data-phase]', card).textContent = 'Daybreak'; draw(); }, 1400);
        }
      }, 900);
    }
    draw();
    requestAnimationFrame(loop);
  }

  $('[data-angle]', card).addEventListener('input', (e) => { angle = Number(e.target.value); draw(); });
  $('[data-startday]', card).addEventListener('click', () => {
    if (running) return;
    day = 0; charge = 0; night = false; running = true;
    $('[data-phase]', card).textContent = 'Morning';
    loop();
  });
  draw();
}

/* ── 15 · Vavilov — the vault ────────────────────────────────────────── */

function initVault(card) {
  const cv = $('[data-canvas]', card);
  const ctx = cv.getContext('2d');
  const W = cv.width, H = cv.height;
  let day = 0, rats = 0, running = false, lost = false;

  function draw() {
    ctx.fillStyle = '#111'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = 'rgba(255,249,230,.12)';
    for (let y = 5; y < H; y += 12) for (let x = 5; x < W; x += 12) {
      ctx.beginPath(); ctx.arc(x, y, 1.5, 0, 7); ctx.fill();
    }
    // crates
    for (let i = 0; i < 8; i++) {
      const x = 70 + (i % 4) * 200, y = 54 + Math.floor(i / 4) * 108;
      ctx.fillStyle = lost && i === 3 ? '#3a3a3a' : '#ffd400';
      ctx.fillRect(x, y, 150, 76);
      ctx.strokeStyle = '#fff9e6'; ctx.lineWidth = 5; ctx.strokeRect(x, y, 150, 76);
      ctx.fillStyle = '#111'; ctx.font = 'bold 12px "Space Mono", monospace'; ctx.textAlign = 'center';
      ctx.fillText(['RICE', 'WHEAT', 'MAIZE', 'PEAS', 'POTATO', 'OATS', 'BARLEY', 'GROUNDNUT'][i], x + 75, y + 44);
    }
    // rats
    ctx.fillStyle = '#e6242a';
    for (let i = 0; i < rats; i++) {
      const x = 40 + (i * 97) % (W - 80);
      ctx.beginPath(); ctx.ellipse(x, H - 22, 15, 9, 0, 0, 7); ctx.fill();
    }
    ctx.fillStyle = '#fff9e6'; ctx.font = 'bold 15px "Space Mono", monospace'; ctx.textAlign = 'left';
    ctx.fillText(`SIEGE DAY ${Math.round(day)}`, 24, 28);
  }

  function loop() {
    if (!running) return;
    day += 8.4;
    if (Math.random() < 0.28) rats++;
    $('[data-day]', card).textContent = String(Math.min(872, Math.round(day)));
    $('[data-rats]', card).textContent = String(rats);
    draw();
    if (rats >= 8) {
      running = false;
      $('[data-vmsg]', card).textContent = 'The rats got in. Guard faster — tap to beat them back.';
      boom($('[data-stage]', card), 'RATS!');
      setTimeout(() => { rats = 3; running = true; loop(); }, 1200);
      return;
    }
    if (day >= 872) {
      running = false;
      $('[data-vmsg]', card).innerHTML = '<b>872 days. The collection survived. Nine of them did not.</b>';
      sfx.select();
      setTimeout(() => unlock(card), 500);
      return;
    }
    setTimeout(loop, 90);
  }

  $('[data-guard]', card).addEventListener('click', () => {
    if (!running) { running = true; $('[data-vmsg]', card).textContent = 'Holding the line…'; loop(); }
    rats = Math.max(0, rats - 2);
    $('[data-rats]', card).textContent = String(rats);
    sfx.hover();
    draw();
  });

  $('[data-eat]', card).addEventListener('click', () => {
    running = false; lost = true; draw();
    boom($('[data-stage]', card), 'GONE');
    $('[data-vmsg]', card).innerHTML =
      '<b>You ate the groundnuts.</b> That variety existed nowhere else on Earth — Alexander Stchukin ' +
      'starved to death at his desk holding a packet of them rather than open it. Tap GUARD to start again.';
    setTimeout(() => { lost = false; day = 0; rats = 0; draw();
      $('[data-day]', card).textContent = '0'; }, 2600);
  });

  draw();
}

/* ── mounting ────────────────────────────────────────────────────────── */

const INIT = {
  crater: initCrater, hop: initHop, mix: initMix, pump: initPump, extract: initExtract,
  cepheid: initCepheid, filament: initFilament, centrifuge: initCentrifuge,
  solar: initSolar, vault: initVault
};

export const hasRun = (id) => done.has(id);
export const runCount = () => done.size;

/**
 * Build one scientist's apparatus into `host` and wire its completion.
 * Returns true if it had already been run on a previous visit.
 */
export function mountExperiment(host, sci, onDone) {
  if (!INIT[sci.game]) return false;
  const already = done.has(sci.id);
  host.dataset.id = sci.id;
  host.classList.add('card');
  if (already) host.classList.add('open');
  host.innerHTML = `
    <div class="stage">
      <div class="stage-bar">
        <span class="stage-tag">${sci.gameTitle}</span>
        <p class="stage-brief">${sci.gameBrief}</p>
      </div>
      <div class="stage-body" data-stage>${STAGES[sci.game]()}</div>
      <div class="stage-foot">
        <span class="readout">${already
          ? '<b>✔ EXPERIMENT COMPLETE</b>'
          : 'Sealed — run it to read the story'}</span>
        <span class="hintline">${sci.gameHint}</span>
      </div>
    </div>`;
  host.__onDone = onDone;
  INIT[sci.game](host);
  return already;
}
