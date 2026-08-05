# Codex of Minds

An interactive 3D hall of scientists, built like an RPG character-select screen.
Five minds — two famous, three routinely left out of the story — each with a
quest tree of their real, dated, sourced contributions.

**The roster**

| № | Who | Class | Why they're here |
|---|-----|-------|------------------|
| 01 | Leonardo da Vinci (1452–1519) | Polymath | Cast the aortic root in wax, blew a glass replica, pumped grass seeds through it — and got a result medicine only confirmed by 4D-flow MRI in 2014 |
| 02 | Richard Feynman (1918–1988) | Theorist | Path integrals, the diagrams, V−A, partons, nanotech, quantum computing, and an O-ring in a glass of ice water |
| 03 | Ibn al-Haytham (c. 965–c. 1040) | Natural Philosopher | Wrote down the experimental method around 1020, six centuries before Europe named it |
| 04 | Emmy Noether (1882–1935) | Mathematician | Explained *why* conservation laws exist, then rebuilt algebra — while barred from holding a post |
| 05 | Chien-Shiung Wu (1912–1997) | Experimentalist | Proved the universe distinguishes left from right. The Nobel went to the two men who suggested the experiment |

**Wing II — The Pop Lab** (`lab.html`), five more, comic-book styled and locked
behind experiments you have to run yourself:

| № | Who | The experiment | What it left you |
|---|-----|----------------|------------------|
| 06 | Émilie du Châtelet (1706–1749) | Drop brass balls into clay — dents go 1, 4, 9 | Energy goes as v², which is why a 60 mph crash is four times a 30 mph one |
| 07 | Hedy Lamarr (1914–2000) | Outrun a jammer across 88 channels | Frequency hopping — and the myth that she invented Wi-Fi, corrected |
| 08 | Stephanie Kwolek (1923–2014) | Mix two monomers; most pairs detonate | Kevlar, from a cloudy batch everyone else would have binned |
| 09 | John Snow (1813–1858) | Survey the houses, then pull the pump handle | Epidemiology, chlorinated water, contact tracing |
| 10 | Tu Youyou (b. 1930) | Pick a solvent, set a temperature, don't cook it | Artemisinin — the front-line malaria drug |

## What's in it

- **A 3D hall** — five shrines on a ring around a turning core, on a shader
  floor, under a procedural nebula, with selective bloom. Drag, scroll, arrow
  keys, or click a shrine.
- **Quest trees** — every node is a documented contribution with a date and,
  where one exists, a paper reference. Nodes unlock along prerequisite chains;
  studying one awards XP and lights the links to what it made possible.
- **Character sheets** — attribute radar, artifacts, and a sources list per
  scientist so the claims can be checked rather than just admired.
- **Procedural audio** — every sound is synthesised with oscillators and noise
  buffers at runtime. No audio files.

## About the art

The portraits are neither photographs nor AI generations. They are drawn in
code from one shared rig — the same skull geometry, the same three-band
lighting model, the same palette structure — with each character expressed as a
parameter set plus a handful of hand-authored silhouette paths. That is what
makes five separate drawings read as one roster.

Because they are live inline SVG, they actually animate: independent blink
cycles, breathing, head sway, drifting background glyphs, and pupils that track
the cursor. `portrait-test.html` renders all five side by side as a rig sheet.

No likeness of Ibn al-Haytham survives; that portrait is an acknowledged
invention, and the site says so.

## About the stat lines

The six attribute scores are an editorial device — shorthand for what kind of
thinker someone was — not a measurement of anything. The site states this on
every character sheet. Everything else is meant to survive checking.

## Running it

It is static files with no build step, but ES modules need a real origin, so
`file://` will not work:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploying

**Vercel** (how this is hosted) — import the repo at
[vercel.com/new](https://vercel.com/new/import?s=https://github.com/KhantMyoAung/another.md).
`vercel.json` declares no build command and the repo root as the output
directory, so there is nothing to install and nothing to configure. Every push
to `main` redeploys.

**GitHub Pages** (alternative, manual) — `.github/workflows/pages.yml` is
`workflow_dispatch` only. Before the first run, Pages has to be switched on by
hand at *Settings → Pages → Source → **GitHub Actions***. The workflow cannot
do this for you: creating a Pages site requires `administration: write`, which
the workflow's `GITHUB_TOKEN` does not carry, so `configure-pages` fails with
`Resource not accessible by integration`.

## Layout

```
index.html            boot screen, hall overlay, sheet container
css/style.css         tokens, screens, quest tree, portrait rig animation
js/data.js            the researched content — quests, artifacts, sources
js/portrait.js        the shared character rig; five parameter sets
js/scene.js           Three.js hall, shaders, camera, picking
js/ui.js              character sheets, quest tree, progression
js/audio.js           synthesised sound effects
vendor/three/         Three.js r169, vendored
```

## Dependencies

Three.js r169 is vendored under `vendor/three/` (core plus the postprocessing
passes, ~1.4 MB) with its addon imports rewritten to relative paths. The page
makes **no external network requests at runtime** — no CDN, no fonts, no
analytics — so it works offline and behind a strict CSP.
