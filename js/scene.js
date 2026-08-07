/**
 * CODEX OF MINDS — the Hall.
 *
 * A ring of five shrines around a slowly turning core, on a shader floor,
 * under a procedural nebula. Everything is generated: no models, no textures
 * on disk except the portraits, which are themselves generated SVG.
 */

import * as THREE from '../vendor/three/three.module.js';
import { EffectComposer } from '../vendor/three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from '../vendor/three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from '../vendor/three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from '../vendor/three/addons/postprocessing/OutputPass.js';
import { ROSTER } from './roster.js';
import { portraitDataURI } from './portrait.js';

const RING_R = 15.4;
const STEP = (Math.PI * 2) / ROSTER.length;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── shaders ─────────────────────────────────────────────────────────── */

const FLOOR_VERT = `
  varying vec3 vPos;
  void main() {
    vPos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`;

const FLOOR_FRAG = `
  precision highp float;
  varying vec3 vPos;
  uniform float uTime;
  uniform float uPulse;
  uniform vec3 uAccent;
  uniform vec3 uPaper;

  void main() {
    float d = length(vPos.xy);
    float fade = smoothstep(44.0, 3.0, d);

    // Ben-Day dot field, in world space so it stays a print screen and not a texture
    vec2 g = fract(vPos.xy * 1.7) - 0.5;
    float dots = 1.0 - smoothstep(0.15, 0.23, length(g));

    // black concentric rings, drifting outward
    float rings = smoothstep(0.47, 0.5, abs(fract(d * 0.42 - uTime * 0.035) - 0.5));

    // selection shockwave
    float wave = uPulse > 0.0 ? smoothstep(1.6, 0.0, abs(d - uPulse)) * (1.0 - uPulse / 40.0) : 0.0;

    vec3 col = mix(uPaper, uAccent, dots * 0.62);
    col = mix(col, vec3(0.02), rings * 0.55);
    col = mix(col, uAccent, wave);
    gl_FragColor = vec4(col, clamp(fade, 0.0, 1.0));
  }`;

const SKY_FRAG = `
  precision highp float;
  varying vec3 vDir;
  uniform vec3 uAccent;
  uniform vec3 uPaper;

  void main() {
    vec3 d = normalize(vDir);
    // flat newsprint ground with one soft ink wash toward the horizon
    vec3 col = mix(uPaper, uAccent, smoothstep(0.45, -0.25, d.y) * 0.16);
    gl_FragColor = vec4(col, 1.0);
  }`;

const SKY_VERT = `
  varying vec3 vDir;
  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`;

const MOTE_VERT = `
  attribute float aSeed;
  attribute float aRadius;
  attribute float aSpeed;
  attribute float aY;
  attribute float aSize;
  varying float vAlpha;
  uniform float uTime;
  uniform float uFocus;
  void main() {
    float a = aSeed * 6.28318 + uTime * aSpeed;
    float r = aRadius * (1.0 + 0.10 * sin(uTime * 0.7 + aSeed * 9.0)) * (1.0 + uFocus * 0.16);
    vec3 p = vec3(cos(a) * r, aY + sin(uTime * 0.55 + aSeed * 12.0) * 0.32, sin(a) * r);
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (44.0 / -mv.z) * (0.6 + uFocus * 0.7);
    vAlpha = (0.16 + uFocus * 0.62) * (0.55 + 0.45 * sin(uTime * 1.6 + aSeed * 20.0));
  }`;

const MOTE_FRAG = `
  precision mediump float;
  varying float vAlpha;
  uniform vec3 uColor;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float g = pow(1.0 - d * 2.0, 2.4);
    gl_FragColor = vec4(uColor, g * vAlpha);
  }`;

const STAR_VERT = `
  attribute float aSeed;
  attribute float aSize;
  varying float vA;
  uniform float uTime;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aSize * (110.0 / -mv.z);
    vA = 0.22 + 0.5 * pow(abs(sin(uTime * 0.5 + aSeed * 30.0)), 2.0);
  }`;

const STAR_FRAG = `
  precision mediump float;
  varying float vA;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    gl_FragColor = vec4(vec3(0.07), pow(1.0 - d * 2.0, 3.0) * vA * 0.5);
  }`;

/* ── helpers ─────────────────────────────────────────────────────────── */

const rand = (a, b) => a + Math.random() * (b - a);

function makeMotes(color, count = 220) {
  const g = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const radius = new Float32Array(count);
  const speed = new Float32Array(count);
  const yy = new Float32Array(count);
  const size = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    seed[i] = Math.random();
    radius[i] = rand(1.5, 3.4);
    speed[i] = rand(0.09, 0.4) * (Math.random() < 0.5 ? -1 : 1);
    yy[i] = rand(-1.6, 4.6);
    size[i] = rand(1.4, 4.6);
  }
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  g.setAttribute('aRadius', new THREE.BufferAttribute(radius, 1));
  g.setAttribute('aSpeed', new THREE.BufferAttribute(speed, 1));
  g.setAttribute('aY', new THREE.BufferAttribute(yy, 1));
  g.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
  g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 8);

  const m = new THREE.ShaderMaterial({
    vertexShader: MOTE_VERT,
    fragmentShader: MOTE_FRAG,
    uniforms: { uTime: { value: 0 }, uFocus: { value: 0 }, uColor: { value: new THREE.Color(color) } },
    transparent: true,
    depthWrite: false
  });
  return new THREE.Points(g, m);
}

/* ── the hall ────────────────────────────────────────────────────────── */

export class Hall {
  constructor(canvas) {
    this.canvas = canvas;
    this.clock = new THREE.Clock();
    this.t = 0;
    this.focus = 0;
    this.angle = 0;          // current ring rotation
    this.targetAngle = 0;
    this.dolly = 1;          // 1 = hall, 0 = pushed into a shrine
    this.targetDolly = 1;
    this.pointer = new THREE.Vector2();
    this.parallax = new THREE.Vector2();
    this.pulse = -1;
    this.fit = 1;
    this.tall = false;
    this.shrines = [];
    this.onPick = () => {};
    this.onHover = () => {};
    this.onFocusChange = () => {};
    this.hovered = -1;
    this.running = false;

    this._initRenderer();
    this._initScene();
    this._initInput();
    window.addEventListener('resize', () => this.resize());
    this.resize();
  }

  _initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas, antialias: true, alpha: false, powerPreference: 'high-performance'
    });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.NoToneMapping;   // flat inks, no filmic roll-off
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0xfff9e6, 0.012);
    this.camera = new THREE.PerspectiveCamera(46, 1, 0.1, 300);

    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    // Comic art has no glow. Bloom is kept at a whisper only so the accent
    // inks do not read as dead flat against the paper.
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.10, 0.4, 0.86);
    this.composer.addPass(this.bloom);
    this.composer.addPass(new OutputPass());
  }

  _initScene() {
    const s = this.scene;
    s.add(new THREE.AmbientLight(0x9fd4e4, 0.55));
    const key = new THREE.DirectionalLight(0xfff0d4, 1.5);
    key.position.set(-6, 9, 7);
    s.add(key);
    const rim = new THREE.DirectionalLight(0x7fd8ff, 0.9);
    rim.position.set(6, 4, -8);
    s.add(rim);

    /* sky */
    this.skyU = {
      uTime: { value: 0 },
      uAccent: { value: new THREE.Color(ROSTER[0].accent) },
      uPaper: { value: new THREE.Color(0xfff9e6) }
    };
    s.add(new THREE.Mesh(
      new THREE.SphereGeometry(120, 40, 24),
      new THREE.ShaderMaterial({
        vertexShader: SKY_VERT, fragmentShader: SKY_FRAG,
        uniforms: this.skyU, side: THREE.BackSide, depthWrite: false, fog: false
      })
    ));

    /* stars */
    const N = 900;
    const sg = new THREE.BufferGeometry();
    const sp = new Float32Array(N * 3), ss = new Float32Array(N), sz = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(rand(60, 105));
      sp[i * 3] = v.x; sp[i * 3 + 1] = Math.abs(v.y) * 0.9 - 4; sp[i * 3 + 2] = v.z;
      ss[i] = Math.random(); sz[i] = rand(0.6, 2.4);
    }
    sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
    sg.setAttribute('aSeed', new THREE.BufferAttribute(ss, 1));
    sg.setAttribute('aSize', new THREE.BufferAttribute(sz, 1));
    this.starU = { uTime: { value: 0 } };
    s.add(new THREE.Points(sg, new THREE.ShaderMaterial({
      vertexShader: STAR_VERT, fragmentShader: STAR_FRAG, uniforms: this.starU,
      transparent: true, depthWrite: false, fog: false
    })));

    /* floor */
    this.floorU = {
      uTime: { value: 0 }, uPulse: { value: -1 },
      uAccent: { value: new THREE.Color(ROSTER[0].accent) },
      uPaper: { value: new THREE.Color(0xfff9e6) }
    };
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(48, 96),
      new THREE.ShaderMaterial({
        vertexShader: FLOOR_VERT, fragmentShader: FLOOR_FRAG, uniforms: this.floorU,
        transparent: true, depthWrite: false, side: THREE.DoubleSide, fog: false
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.4;
    s.add(floor);

    /* the core: a slowly tumbling icosahedron at the centre of the ring */
    this.core = new THREE.Group();
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x111111, wireframe: true, transparent: true, opacity: 0.55 });
    this.coreMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(1.5, 1), coreMat);
    this.core.add(this.coreMesh);
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.35, 0),
      new THREE.MeshBasicMaterial({ color: 0xe6242a, wireframe: true, transparent: true, opacity: 0.4 })
    );
    this.coreShell = shell;
    this.core.add(shell);
    this.core.position.y = 1.4;
    s.add(this.core);

    /* the ring */
    this.ring = new THREE.Group();
    s.add(this.ring);

    const loader = new THREE.TextureLoader();
    ROSTER.forEach((sci, i) => {
      const g = new THREE.Group();
      const a = i * STEP;
      g.position.set(Math.sin(a) * RING_R, 0, Math.cos(a) * RING_R);
      g.rotation.y = a;

      const accent = new THREE.Color(sci.accent);

      /* pedestal */
      const ped = new THREE.Mesh(
        new THREE.CylinderGeometry(1.5, 1.9, 0.5, 8),
        new THREE.MeshBasicMaterial({ color: accent })
      );
      ped.position.y = -2.15;
      g.add(ped);
      const pedRing = new THREE.Mesh(
        new THREE.TorusGeometry(1.62, 0.075, 8, 48),
        new THREE.MeshBasicMaterial({ color: 0x111111, fog: false })
      );
      pedRing.rotation.x = Math.PI / 2;
      pedRing.position.y = -1.87;
      g.add(pedRing);

      /* slab */
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(3.5, 4.7, 0.22),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
      );
      slab.position.y = 0.55;
      g.add(slab);

      const edges = new THREE.LineSegments(
        new THREE.EdgesGeometry(slab.geometry),
        new THREE.LineBasicMaterial({ color: 0x111111, fog: false })
      );
      edges.position.copy(slab.position);
      g.add(edges);

      /* portrait */
      const tex = loader.load(portraitDataURI(sci.id, sci.accent));
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = this.renderer.capabilities.getMaxAnisotropy();
      const art = new THREE.Mesh(
        new THREE.PlaneGeometry(3.15, 4.2),
        new THREE.MeshBasicMaterial({ map: tex, transparent: false })
      );
      art.position.set(0, 0.55, 0.13);
      g.add(art);

      /* halo above the slab */
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(1.05, 0.07, 8, 64),
        new THREE.MeshBasicMaterial({ color: 0x111111, fog: false })
      );
      halo.rotation.x = Math.PI / 2;
      halo.position.y = 3.35;
      g.add(halo);

      const motes = makeMotes(sci.accent, reduced ? 70 : 230);
      motes.position.y = 0.4;
      g.add(motes);

      /* invisible pick target — generous, so clicking is forgiving */
      const hit = new THREE.Mesh(
        new THREE.BoxGeometry(4.2, 6.4, 1.4),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hit.position.y = 0.4;
      hit.userData.index = i;
      g.add(hit);

      this.ring.add(g);
      this.shrines.push({ group: g, art, edges, halo, motes, pedRing, hit, accent, focusT: i === 0 ? 1 : 0 });
    });

    this.raycaster = new THREE.Raycaster();
  }

  _initInput() {
    const c = this.canvas;
    let dragging = false, dragStart = 0, angleStart = 0, moved = 0;

    const toNDC = (e) => {
      const r = c.getBoundingClientRect();
      this.pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    };

    c.addEventListener('pointerdown', (e) => {
      if (!this.running) return;
      dragging = true; moved = 0;
      dragStart = e.clientX; angleStart = this.targetAngle;
      c.setPointerCapture(e.pointerId);
    });

    c.addEventListener('pointermove', (e) => {
      toNDC(e);
      this.parallax.set(this.pointer.x, this.pointer.y);
      if (!this.running) return;
      if (dragging) {
        const dx = e.clientX - dragStart;
        moved = Math.max(moved, Math.abs(dx));
        this.targetAngle = angleStart + (dx / window.innerWidth) * Math.PI * 1.6;
      } else {
        const hit = this._pick();
        if (hit !== this.hovered) { this.hovered = hit; this.onHover(hit); }
        c.style.cursor = hit >= 0 ? 'pointer' : 'grab';
      }
    });

    const release = (e) => {
      if (!dragging) return;
      dragging = false;
      try { c.releasePointerCapture(e.pointerId); } catch { /* pointer already gone */ }
      if (moved < 6) {
        const hit = this._pick();
        if (hit >= 0) this.onPick(hit);
        else this._snap();
      } else {
        this._snap();
      }
    };
    c.addEventListener('pointerup', release);
    c.addEventListener('pointercancel', release);

    let wheelLock = 0;
    c.addEventListener('wheel', (e) => {
      if (!this.running) return;
      const now = performance.now();
      if (now - wheelLock < 320) return;
      wheelLock = now;
      this.setFocus(this.focus + (e.deltaY > 0 ? 1 : -1));
    }, { passive: true });
  }

  _pick() {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.shrines.map((s) => s.hit), false);
    return hits.length ? hits[0].object.userData.index : -1;
  }

  /** Snap a free drag to the nearest shrine. */
  _snap() {
    const idx = Math.round(-this.targetAngle / STEP);
    this.setFocus(idx);
  }

  setFocus(i) {
    const n = this.shrines.length;
    const idx = ((i % n) + n) % n;
    if (idx === this.focus && Math.abs(this.targetAngle + this.focus * STEP) < 0.001) return idx;
    // walk to the nearest equivalent angle so the ring never spins the long way
    const desired = -idx * STEP;
    const k = Math.round((this.targetAngle - desired) / (Math.PI * 2));
    this.targetAngle = desired + k * Math.PI * 2;
    this.focus = idx;
    this.setAccent(ROSTER[idx].accent);
    this.onFocusChange(idx);
    return idx;
  }

  /** Follow the page theme — the 3D ground is the same paper as the CSS. */
  setPaper(hex) {
    this.floorU.uPaper.value.set(hex);
    this.skyU.uPaper.value.set(hex);
    if (this.scene.fog) this.scene.fog.color.set(hex);
  }

  setAccent(hex) {
    this.floorU.uAccent.value.set(hex);
    this.skyU.uAccent.value.set(hex);
  }

  /** Fire the floor shockwave. */
  shockwave() { this.pulse = 0; }

  /** Push the camera into the focused shrine (or back out). */
  zoom(inward) {
    this.targetDolly = inward ? 0 : 1;
    if (inward) this.shockwave();
  }

  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    this.renderer.setSize(w, h, false);
    this.composer.setSize(w, h);
    this.bloom.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    // A phone in portrait has a narrow horizontal field of view. Derive the
    // pull-back from the geometry rather than guessing: work out the distance
    // at which the slab plus a margin still spans the frame horizontally.
    const halfV = THREE.MathUtils.degToRad(this.camera.fov) / 2;
    const tanH = Math.tan(halfV) * this.camera.aspect;
    const needed = 2.6 / Math.max(tanH, 0.001);          // half-width of a shrine + margin
    const base = RING_R + 10.6;                          // the hall-mode distance
    this.fit = Math.min(1.5, Math.max(1, needed / (base - RING_R)));
    this.tall = this.camera.aspect < 0.72;
  }

  start() { this.running = true; this.clock.start(); this._loop(); }

  _loop = () => {
    requestAnimationFrame(this._loop);
    // getElapsedTime() consumes the delta internally, so it must not be called
    // before getDelta() — accumulate the clock ourselves instead.
    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.t += dt;
    const t = this.t;

    this.angle += (this.targetAngle - this.angle) * Math.min(1, dt * 4.2);
    this.dolly += (this.targetDolly - this.dolly) * Math.min(1, dt * 3.4);
    this.ring.rotation.y = this.angle;

    /* Camera sits outside the ring looking in at the focused shrine, and
       pushes toward it as dolly → 0. The look-at point is deliberately below
       the slab so the portrait rides high in frame, clear of the nameplate. */
    const d = this.dolly;
    const camZ = THREE.MathUtils.lerp(RING_R + 4.4, RING_R + 10.6, d) * (this.fit || 1);
    const camY = THREE.MathUtils.lerp(1.4, 3.7, d);
    const lookZ = THREE.MathUtils.lerp(RING_R, RING_R - 4.6, d);
    const lookY = THREE.MathUtils.lerp(0.3, this.tall ? -1.1 : -0.9, d);
    const px = this.parallax.x * (0.5 + d * 1.2);
    const py = this.parallax.y * (0.25 + d * 0.6);
    const bobY = reduced ? 0 : Math.sin(t * 0.32) * 0.2 * d;
    this.camera.position.set(px, camY + bobY - py * 0.5, camZ);
    this.camera.lookAt(px * 0.35, lookY, lookZ);

    /* shrines respond to focus */
    this.shrines.forEach((sh, i) => {
      const want = i === this.focus ? 1 : 0;
      sh.focusT += (want - sh.focusT) * Math.min(1, dt * 4.5);
      const f = sh.focusT;

      sh.art.material.color.setScalar(THREE.MathUtils.lerp(0.78, 1, f));
      sh.edges.material.opacity = 0.24 + f * 0.7;
      sh.halo.material.opacity = 0.16 + f * 0.66;
      sh.motes.material.uniforms.uFocus.value = f;
      sh.motes.material.uniforms.uTime.value = t;
      sh.group.position.y = f * 0.35 + (reduced ? 0 : Math.sin(t * 0.6 + i * 1.3) * 0.07);
      sh.group.scale.setScalar(1 + f * 0.06);
      if (!reduced) {
        sh.halo.rotation.z = t * (0.4 + i * 0.06);
        sh.halo.rotation.x = Math.PI / 2 + Math.sin(t * 0.5 + i) * 0.16;
      }
    });

    if (!reduced) {
      this.core.rotation.y = t * 0.18;
      this.core.rotation.x = Math.sin(t * 0.24) * 0.28;
      this.coreShell.rotation.y = -t * 0.26;
      this.coreShell.rotation.z = t * 0.11;
    }
    this.core.scale.setScalar(1 + Math.sin(t * 1.1) * 0.03);

    if (this.pulse >= 0) {
      this.pulse += dt * 22;
      if (this.pulse > 42) this.pulse = -1;
    }
    this.floorU.uPulse.value = this.pulse;
    this.floorU.uTime.value = t;
    this.skyU.uTime.value = t;
    this.starU.uTime.value = t;

    this.composer.render();
  };
}
