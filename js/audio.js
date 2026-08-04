/**
 * CODEX OF MINDS — procedural sound.
 *
 * Every effect is synthesised at runtime with oscillators and noise buffers,
 * so the site ships no audio files and works offline. Nothing plays until the
 * user has clicked something, and the mute state persists.
 */

const KEY = 'codex.muted';

class Sfx {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem(KEY) === '1';
    this.master = null;
  }

  /** Lazily create the context — browsers require a gesture first. */
  boot() {
    if (this.ctx) return this.ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    this.ctx = new AC();
    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.34;
    // A gentle low-pass keeps the square/saw tones from getting shrill.
    const lp = this.ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 5200;
    this.master.connect(lp).connect(this.ctx.destination);
    return this.ctx;
  }

  setMuted(m) {
    this.muted = m;
    localStorage.setItem(KEY, m ? '1' : '0');
    if (this.master) {
      const t = this.ctx.currentTime;
      this.master.gain.cancelScheduledValues(t);
      this.master.gain.linearRampToValueAtTime(m ? 0 : 0.34, t + 0.12);
    }
  }

  /** One shaped oscillator note. */
  tone(freq, { type = 'sine', dur = 0.18, gain = 0.3, at = 0.004, dt = 0, slide = 0, detune = 0 } = {}) {
    const ctx = this.boot();
    if (!ctx || this.muted) return;
    const t0 = ctx.currentTime + dt;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    osc.detune.value = detune;
    osc.frequency.setValueAtTime(freq, t0);
    if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(20, freq * slide), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + at);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(this.master);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  }

  /** Filtered noise burst — used for whooshes and the unlock shimmer. */
  noise({ dur = 0.4, gain = 0.16, from = 380, to = 2600, q = 1.2, dt = 0 } = {}) {
    const ctx = this.boot();
    if (!ctx || this.muted) return;
    const t0 = ctx.currentTime + dt;
    const len = Math.ceil(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.value = q;
    bp.frequency.setValueAtTime(from, t0);
    bp.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    src.connect(bp).connect(g).connect(this.master);
    src.start(t0);
  }

  hover() { this.tone(880, { type: 'triangle', dur: 0.07, gain: 0.09 }); }

  move() {
    this.tone(520, { type: 'triangle', dur: 0.1, gain: 0.16 });
    this.tone(780, { type: 'sine', dur: 0.14, gain: 0.1, dt: 0.03 });
  }

  select() {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      this.tone(f, { type: 'triangle', dur: 0.38, gain: 0.2, dt: i * 0.055 }));
    this.noise({ dur: 0.5, gain: 0.1, from: 500, to: 4200 });
  }

  back() {
    this.tone(420, { type: 'sine', dur: 0.3, gain: 0.18, slide: 0.55 });
    this.noise({ dur: 0.32, gain: 0.09, from: 2200, to: 320 });
  }

  unlock() {
    [659.25, 830.61, 987.77, 1318.5, 1567.98].forEach((f, i) =>
      this.tone(f, { type: 'sine', dur: 0.5, gain: 0.16, dt: i * 0.06 }));
    this.noise({ dur: 0.7, gain: 0.08, from: 900, to: 6000, q: 0.8 });
  }

  deny() {
    this.tone(150, { type: 'square', dur: 0.16, gain: 0.14 });
    this.tone(120, { type: 'square', dur: 0.2, gain: 0.12, dt: 0.09 });
  }

  boom() {
    this.tone(70, { type: 'sine', dur: 1.4, gain: 0.4, slide: 0.42 });
    this.noise({ dur: 1.1, gain: 0.14, from: 220, to: 1800, q: 0.7 });
    [261.63, 392, 523.25].forEach((f, i) =>
      this.tone(f, { type: 'triangle', dur: 1.6, gain: 0.1, dt: 0.1 + i * 0.09 }));
  }
}

export const sfx = new Sfx();
