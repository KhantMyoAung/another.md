/**
 * CODEX OF MINDS — character data.
 *
 * Every quest node below is a real, documented contribution. Dates, paper
 * titles and journal references are given where they exist so the codex can be
 * checked rather than merely admired. `sources` lists what was used.
 *
 * The six stat lines are an editorial flourish — a way of saying "this one was
 * a builder, that one was a prover". They are not a measurement of anything and
 * the UI says so.
 */

export const STAT_AXES = [
  { key: 'insight', label: 'Insight', blurb: 'Seeing the thing everyone else was standing next to.' },
  { key: 'rigor', label: 'Rigor', blurb: 'Discipline of proof, control and error.' },
  { key: 'imagination', label: 'Imagination', blurb: 'Willingness to picture what has no precedent.' },
  { key: 'craft', label: 'Craft', blurb: 'Hands. Apparatus. Technique at the bench.' },
  { key: 'teaching', label: 'Teaching', blurb: 'Getting it out of one head and into others.' },
  { key: 'legacy', label: 'Legacy', blurb: 'What still runs on their work today.' }
];

export const QUEST_KINDS = {
  method: { label: 'Method', glyph: '◈' },
  discovery: { label: 'Discovery', glyph: '✦' },
  artifact: { label: 'Artifact', glyph: '▣' },
  legacy: { label: 'Legacy', glyph: '❖' },
  trial: { label: 'Trial', glyph: '⚔' },
  craft: { label: 'Craft', glyph: '✥' }
};

export const SCIENTISTS = [
  /* ────────────────────────────────────────────────────────────── 01 ── */
  {
    id: 'davinci',
    name: 'Leonardo da Vinci',
    shortName: 'Leonardo',
    title: 'The Universal Observer',
    class: 'Polymath',
    life: '1452 — 1519',
    origin: 'Vinci, Republic of Florence',
    era: 'Renaissance',
    accent: '#e6242a',
    accent2: '#ffd400',
    rarity: 'legendary',
    tagline: 'Drew in order to think. Solved the heart with a glass model and grass seeds.',
    intro:
      'Leonardo did not separate art from science, because for him both were the same discipline: <em>saper vedere</em> — knowing how to see. He dissected roughly thirty human bodies, built working models of the organs he found, ran experiments on them, and wrote it all down in mirror script across some 7,200 surviving notebook pages. Then he published none of it. The science had to be rediscovered centuries later, and in one case it took until 2014 for medicine to catch up with him.',
    underrated: null,
    quote: {
      text: 'Experience never errs; it is only your judgements that err by promising themselves effects such as are not caused by your experiments.',
      source: 'Notebooks, from the material gathered as the Trattato della Pittura'
    },
    stats: { insight: 98, rigor: 72, imagination: 100, craft: 96, teaching: 24, legacy: 61 },
    statNote:
      'Teaching sits low for a reason: he published nothing. The notebooks were dispersed at his death and much of the science had no readers for 300 years.',
    quests: [
      {
        id: 'dv-see', tier: 0, kind: 'method', title: 'Saper Vedere', year: 'c. 1478 →',
        summary: 'Drawing as an instrument of thought, not a record of it.',
        detail:
          'Leonardo treated the notebook the way a modern lab treats an oscilloscope. He drew a thing from four angles, in section, in exploded view, and in motion — a visual convention he largely invented — because the act of rendering forced him to resolve what he did not actually understand. The method is why his anatomy is right where his contemporaries copied Galen and stayed wrong.',
        impact: 4, requires: []
      },
      {
        id: 'dv-anat', tier: 1, kind: 'discovery', title: 'Comparative Anatomy by Dissection', year: 'c. 1489 — 1513',
        summary: '~30 human dissections; 240 drawings and 13,000 words in Anatomical Manuscript A alone.',
        detail:
          'Working partly with the anatomist Marcantonio della Torre at Pavia, Leonardo produced the most accurate anatomical drawings made anywhere for the next 250 years. He was first to render the curvature of the human spine correctly, first to depict the maxillary sinus, and around 1493 he injected molten wax into the ventricles of an ox brain to take a cast of a cavity — the earliest known use of a casting technique to reveal internal anatomy.',
        impact: 5, requires: ['dv-see']
      },
      {
        id: 'dv-heart', tier: 2, kind: 'discovery', title: 'The Heart Is a Muscle', year: 'c. 1507 — 1513',
        summary: 'Four chambers, not two. A pump, not a furnace.',
        detail:
          'Galen had taught for 1,300 years that the heart warmed the blood and that blood seeped through invisible pores in the septum. Leonardo described the heart as a muscle with four chambers, distinguished atria from ventricles, identified systole as the active phase of the pump, mapped the coronary vessels, and found the moderator band in the right ventricle — a structure that would not be named again until Leonardo Botallo, and which still carries the alternative name "Leonardo\'s cord".',
        impact: 5, requires: ['dv-anat']
      },
      {
        id: 'dv-valve', tier: 3, kind: 'trial', title: 'The Aortic Vortex', year: 'c. 1512 — 1513',
        summary: 'Wax cast → glass model → grass seeds in water. Confirmed by 4D MRI in 2014.',
        detail:
          'To learn how the aortic valve shuts, Leonardo poured wax into an ox aortic root to cast its shape, blew a glass replica from the cast, and pumped a suspension of grass seeds through it so he could watch the flow. He saw vortices form in the three bulges above the valve — the sinuses of Valsalva — and argued the eddies themselves push the cusps closed. In May 2014 Bissell, Dall\'Armellina and Choudhury published in vivo 4D-flow MRI of the human aortic root in the European Heart Journal under the title "Flow vortices in the aortic root: in vivo 4D-MRI confirms predictions of Leonardo da Vinci". He was right, and it took 500 years to check.',
        impact: 5, requires: ['dv-heart', 'dv-flow']
      },
      {
        id: 'dv-athero', tier: 3, kind: 'discovery', title: 'Atherosclerosis', year: 'c. 1508',
        summary: 'The first description of arterial disease — and a mechanism for it.',
        detail:
          'At the hospital of Santa Maria Nuova in Florence, Leonardo dissected an old man who had died quietly and peacefully, and compared him with a child. He described the elderly vessels as thickened, tortuous and narrowed, and — uniquely — reached for a cause: the continuous mechanical stress of flow on the vessel wall, plus the failure of the wall\'s own nourishment. That is a hydrodynamic theory of arterial disease, arrived at because he had already spent years on the hydrodynamics of rivers.',
        impact: 4, requires: ['dv-anat', 'dv-flow']
      },
      {
        id: 'dv-flow', tier: 2, kind: 'artifact', title: 'Codex Leicester — Water and Deep Time', year: 'c. 1508 — 1510',
        summary: 'Vortices, erosion, sediment — and fossils on mountaintops.',
        detail:
          'The Codex Leicester is 72 pages almost entirely about water: how it turns, where it deposits, how it cuts a valley. Two conclusions stand out. First, his vortex studies are a serious attempt at what we would now call turbulence and flow visualisation. Second, he reasoned that the marine fossils found high in the Italian mountains were laid down slowly on an ancient seabed that was later raised — explicitly rejecting the standard explanation that the biblical Flood had thrown them there. That is stratigraphy, and it is roughly 250 years early.',
        impact: 4, requires: ['dv-see']
      },
      {
        id: 'dv-optics', tier: 2, kind: 'discovery', title: 'Optics and the Camera Obscura', year: 'c. 1490 — 1508',
        summary: 'The eye as an imaging device; the inverted image explained.',
        detail:
          'Leonardo studied pinhole imaging, described the inversion of the image in the dark chamber, and drew the analogy between that chamber and the eye — reading the tradition that ran to him from Ibn al-Haytham through Witelo and Pecham. His painting practice is the applied side of the same research: sfumato is atmospheric optics executed in oil, and his notes on the blueing of distant hills are a working theory of aerial perspective.',
        impact: 4, requires: ['dv-see']
      },
      {
        id: 'dv-machines', tier: 3, kind: 'artifact', title: 'The Machines', year: 'c. 1485 — 1515',
        summary: 'Parachute, self-propelled cart, ornithopter, ball bearing, revolving bridge.',
        detail:
          'Most were never built in his lifetime; several have been built since and they work. The pyramidal parachute of Codex Atlanticus f.1058v was tested by Adrian Nicholas in 2000 from 3,000 m and descended stably. The spring-driven cart on f.812r — which has programmable steering set by pegs, making it arguably a programmable robot — was reconstructed and successfully run in 2004. His flight research is the deepest of it: he understood that the medium resists the wing, and that a bird is a machine working within a mathematical law.',
        impact: 4, requires: ['dv-flow']
      },
      {
        id: 'dv-legacy', tier: 4, kind: 'legacy', title: 'The Unpublished Century', year: '1519 →',
        summary: '7,200 pages survive — perhaps a quarter of what he wrote. Almost none of it was read in time.',
        detail:
          'Leonardo left his notebooks to Francesco Melzi, after which they were scattered, cut up and traded across Europe. The Madrid Codices were only rediscovered in the National Library of Spain in 1965, having been misfiled. The result is the strangest fact about him: as a scientist he had almost no influence on the science that followed, because it could not read him. His anatomy would have saved Vesalius decades. This is the strongest argument in history for publishing.',
        impact: 3, requires: ['dv-valve', 'dv-machines', 'dv-optics', 'dv-athero']
      }
    ],
    artifacts: [
      { name: 'Codex Leicester', year: 'c. 1508–10', what: '72 pages on water, geology and astronomy. The only codex in private hands.' },
      { name: 'Codex Atlanticus', year: '1478–1519', what: '1,119 leaves, the largest single collection. Biblioteca Ambrosiana, Milan.' },
      { name: 'Anatomical Manuscripts A & B', year: 'c. 1510–13', what: 'The Windsor sheets — the finest anatomical drawing before the 19th century.' },
      { name: 'Madrid Codices I & II', year: 'c. 1490–1505', what: 'Mechanics and engineering. Lost in plain sight until 1965.' }
    ],
    sources: [
      { title: 'Leonardo da Vinci: anatomist (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3361109/' },
      { title: 'Cardiovascular Physio-Pathology by Leonardo Da Vinci — Circulation Research', url: 'https://www.ahajournals.org/doi/full/10.1161/CIRCRESAHA.118.314390' },
      { title: 'Flow vortices in the aortic root: in vivo 4D-MRI confirms predictions of Leonardo da Vinci — Eur Heart J (2014)', url: 'https://pubmed.ncbi.nlm.nih.gov/24497340/' },
      { title: 'Leonardo da Vinci and the Sinuses of Valsalva — Annals of Thoracic Surgery', url: 'https://www.annalsthoracicsurgery.org/article/0003-4975(91)91371-2/pdf' },
      { title: 'The Real Code of Leonardo da Vinci (PMC)', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC2774586/' }
    ]
  },

  /* ────────────────────────────────────────────────────────────── 02 ── */
  {
    id: 'feynman',
    name: 'Richard Feynman',
    shortName: 'Feynman',
    title: 'The Path Integrator',
    class: 'Theorist',
    life: '1918 — 1988',
    origin: 'Far Rockaway, New York',
    era: 'Twentieth Century',
    accent: '#0b63d6',
    accent2: '#ffd400',
    rarity: 'legendary',
    tagline: 'Replaced the equations with pictures, and the pictures turned out to be the physics.',
    intro:
      'Feynman rebuilt quantum electrodynamics from a strange premise — that a particle going from A to B takes <em>every</em> route at once — and then invented a way of drawing the result that was so much easier than the algebra it replaced that within a decade nobody calculated any other way. He also cracked safes at Los Alamos, taught the best undergraduate physics course ever recorded, and ended his public life by dropping a piece of rubber into a glass of ice water on live television.',
    underrated: null,
    quote: {
      text: 'For a successful technology, reality must take precedence over public relations, for nature cannot be fooled.',
      source: 'Appendix F, Report of the Presidential Commission on the Space Shuttle Challenger Accident, 1986'
    },
    stats: { insight: 96, rigor: 82, imagination: 97, craft: 74, teaching: 100, legacy: 94 },
    statNote:
      'Rigor is the honest number here. Feynman\'s methods worked spectacularly before anyone could prove why; it took Freeman Dyson in 1949 to show his diagrams were equivalent to Schwinger and Tomonaga\'s formalism.',
    quests: [
      {
        id: 'fy-action', tier: 0, kind: 'method', title: 'Least Action, Made Quantum', year: '1942',
        summary: 'PhD under John Wheeler. The seed of everything after.',
        detail:
          'A classical particle follows the path that extremises the action. Feynman\'s thesis asked what the quantum version of that statement is, working from a hint Dirac had dropped in 1933. The answer he arrived at is that you must add up a complex phase, e^(iS/ħ), over every conceivable history. Where the action is large compared to ħ, neighbouring paths cancel each other and only the classical path survives — classical mechanics falls out of quantum mechanics as a limiting case, visibly.',
        impact: 4, requires: []
      },
      {
        id: 'fy-manhattan', tier: 1, kind: 'trial', title: 'Los Alamos', year: '1943 — 1945',
        summary: 'Group leader at 24. Ran the punch-card computing group. Caught a criticality hazard at Oak Ridge.',
        detail:
          'Feynman led a group in Hans Bethe\'s Theoretical Division and organised the IBM punch-card operation into what was effectively a human-and-machine parallel pipeline. Sent to inspect the Oak Ridge enrichment plant, he realised the staff were storing enriched uranium in quantities and geometries that risked an accidental criticality — because for secrecy nobody had told them what they were handling. He argued, successfully, that safety requires telling people the truth. His wife Arline died at Albuquerque in June 1945, a month before Trinity.',
        impact: 3, requires: ['fy-action']
      },
      {
        id: 'fy-path', tier: 2, kind: 'discovery', title: 'The Path Integral', year: '1948',
        summary: '"Space-Time Approach to Non-Relativistic Quantum Mechanics", Rev. Mod. Phys. 20, 367.',
        detail:
          'The third formulation of quantum mechanics, after Schrödinger\'s waves and Heisenberg\'s matrices — and the one that generalises. The path integral is now the native language of quantum field theory, and it escaped physics entirely: it is the same mathematics as the Wiener integral in stochastic processes, and it is why the Black–Scholes equation and lattice QCD are cousins.',
        impact: 5, requires: ['fy-action']
      },
      {
        id: 'fy-diagrams', tier: 3, kind: 'artifact', title: 'Feynman Diagrams', year: '1948 — 1949',
        summary: '"Space-Time Approach to Quantum Electrodynamics", Phys. Rev. 76, 769.',
        detail:
          'A perturbation series in QED is a nightmare of indices. Feynman noticed that each term corresponds to a picture — lines for particles, vertices for interactions — and that you can write the pictures down first and read the integral off them. Freeman Dyson proved in 1949 that this was equivalent to Schwinger and Tomonaga\'s far more laborious approach, and the diagrams spread through physics within about five years. They are now used everywhere from condensed matter to gravitational-wave templates.',
        impact: 5, requires: ['fy-path']
      },
      {
        id: 'fy-qed', tier: 4, kind: 'legacy', title: 'QED and the 1965 Nobel', year: '1965',
        summary: 'Shared with Julian Schwinger and Sin-Itiro Tomonaga. The most precisely tested theory there is.',
        detail:
          'Renormalised QED now predicts the anomalous magnetic moment of the electron and agrees with measurement to about one part in 10^12 — the equivalent of measuring the distance from New York to Los Angeles to within the width of a human hair. Feynman himself never fully liked renormalisation, calling it a "dippy process" and suspecting the theory was mathematically shaky. It remains the benchmark for agreement between theory and experiment in all of science.',
        impact: 5, requires: ['fy-diagrams']
      },
      {
        id: 'fy-helium', tier: 3, kind: 'discovery', title: 'Superfluid Helium', year: '1953 — 1958',
        summary: 'Why helium-4 flows without friction, from first principles.',
        detail:
          'Feynman explained the lambda transition in liquid helium-4 as a genuinely quantum, many-body effect, worked out the spectrum of excitations — he named the high-momentum ones rotons — and predicted that rotation in a superfluid can only appear as quantised vortex lines. Those vortices were subsequently observed. It is the strongest evidence that he was not only a formalist: this is hard, concrete condensed-matter physics.',
        impact: 4, requires: ['fy-path']
      },
      {
        id: 'fy-weak', tier: 3, kind: 'discovery', title: 'V−A Theory of the Weak Force', year: '1958',
        summary: 'With Murray Gell-Mann, immediately after parity fell.',
        detail:
          'Once Chien-Shiung Wu had shown that the weak interaction distinguishes left from right, the form of the weak current was up for grabs. Feynman and Gell-Mann proposed that it is "vector minus axial-vector" — the combination that maximally violates parity — and with it the conserved vector current hypothesis. V−A is a direct ancestor of the electroweak Standard Model. Feynman said it was the only time in his life he felt he had discovered a law of nature.',
        impact: 5, requires: ['fy-qed']
      },
      {
        id: 'fy-parton', tier: 3, kind: 'discovery', title: 'The Parton Model', year: '1968',
        summary: 'Protons are bags of point-like things. Those things were quarks.',
        detail:
          'When SLAC fired high-energy electrons at protons, the electrons bounced back far more often than a soft, smeared-out proton would allow — exactly as Rutherford\'s alphas had bounced off nuclei. Feynman modelled the proton as a collection of free point-like constituents he deliberately refused to name, calling them partons. Combined with Bjorken scaling, the model gave quarks their experimental reality and led to quantum chromodynamics.',
        impact: 5, requires: ['fy-diagrams']
      },
      {
        id: 'fy-nano', tier: 2, kind: 'method', title: '"There\'s Plenty of Room at the Bottom"', year: '29 Dec 1959',
        summary: 'An APS after-dinner talk at Caltech that founded a field two decades later.',
        detail:
          'Feynman asked why we could not write the entire Encyclopaedia Britannica on the head of a pin, and then answered his own question: nothing in physics forbids it, only engineering. He described manipulating matter atom by atom, building machines that build smaller machines, and the strange regime where surface forces dominate over gravity. He offered two $1,000 prizes; the first was claimed in 1960, the second in 1985. The talk is now universally cited as the conceptual origin of nanotechnology.',
        impact: 4, requires: ['fy-action']
      },
      {
        id: 'fy-qc', tier: 3, kind: 'method', title: 'Simulating Physics with Computers', year: '1981 — 1982',
        summary: 'The argument that gave us quantum computing.',
        detail:
          'At MIT in 1981 Feynman pointed out that simulating a quantum system on a classical computer costs resources that grow exponentially with the number of particles, so a classical machine can never keep up with nature. His conclusion: "if you want to make a simulation of nature, you\'d better make it quantum mechanical." That sentence is the founding argument of quantum computation, alongside work by Yuri Manin and David Deutsch.',
        impact: 5, requires: ['fy-path']
      },
      {
        id: 'fy-lectures', tier: 4, kind: 'artifact', title: 'The Feynman Lectures', year: '1961 — 1963',
        summary: 'Two years of Caltech freshman physics, transcribed. Still in print, now free online.',
        detail:
          'Feynman rebuilt the entire introductory sequence from scratch. He considered it a failure at the time — he thought he had lost the weaker students — but the three red volumes became the most influential physics text of the century, read mostly by people who already knew some physics and wanted to understand it. The method that carries his name is in there: explain it plainly enough for a beginner, and the gaps in your own understanding become impossible to hide.',
        impact: 5, requires: ['fy-qed']
      },
      {
        id: 'fy-challenger', tier: 4, kind: 'trial', title: 'Challenger, and Appendix F', year: '1986',
        summary: 'A C-clamp, a glass of ice water, and a rubber O-ring, on live television.',
        detail:
          'On the Rogers Commission, Feynman compressed a sample of Morton Thiokol\'s O-ring rubber in a C-clamp, dropped it in his ice water, and showed it did not spring back — demonstrating in about thirty seconds the loss of resilience at low temperature that destroyed the shuttle. His deeper finding was managerial: NASA management was quoting a failure probability around 1 in 100,000 while its own engineers said 1 in 100. He threatened to remove his name from the report unless his dissent was printed; it appears as Appendix F.',
        impact: 4, requires: ['fy-lectures']
      }
    ],
    artifacts: [
      { name: 'The Feynman Lectures on Physics', year: '1964', what: 'Three volumes. Freely readable at feynmanlectures.caltech.edu.' },
      { name: 'QED: The Strange Theory of Light and Matter', year: '1985', what: 'Quantum electrodynamics explained with no mathematics beyond arrows. It works.' },
      { name: 'Quantum Mechanics and Path Integrals', year: '1965', what: 'With Albert Hibbs. The path integral, book length.' },
      { name: 'Appendix F', year: '1986', what: 'Six pages on why an organisation lies to itself about risk.' }
    ],
    sources: [
      { title: 'Nobel Prize in Physics 1965 — Richard P. Feynman', url: 'https://www.nobelprize.org/prizes/physics/1965/feynman/facts/' },
      { title: 'Feynman — Personal observations on the reliability of the Shuttle (Caltech archive PDF)', url: 'https://calteches.library.caltech.edu/3570/1/Feynman.pdf' },
      { title: "There's Plenty of Room at the Bottom — full text", url: 'https://www.zyvex.com/nanotech/feynman.html' },
      { title: 'Richard P. Feynman — Nobel Lecture', url: 'https://www.nobelprize.org/prizes/physics/1965/feynman/lecture/' },
      { title: 'The Challenger Disaster — feynman.com', url: 'https://feynman.com/science/the-challenger-disaster/' }
    ]
  },

  /* ────────────────────────────────────────────────────────────── 03 ── */
  {
    id: 'alhaytham',
    name: 'Ibn al-Haytham',
    shortName: 'Ibn al-Haytham',
    title: 'The First Experimentalist',
    class: 'Natural Philosopher',
    life: 'c. 965 — c. 1040',
    origin: 'Basra, Iraq — worked in Cairo',
    era: 'Islamic Golden Age',
    accent: '#ffd400',
    accent2: '#e6242a',
    rarity: 'underrated',
    tagline: 'Wrote down the experimental method around 1020, six centuries before it was named in Europe.',
    intro:
      'Ibn al-Haytham — Latinised as Alhazen — settled the oldest argument in optics by experiment rather than authority: light comes <em>from</em> the object <em>into</em> the eye, and it does not stream out of the eye as Euclid and Ptolemy had insisted. To prove it he built apparatus, varied one thing at a time, and demanded that the result be reproducible. The seven books of the <em>Kitāb al-Manāẓir</em> are the point at which physics stops being philosophy and starts being an experimental science.',
    underrated:
      'Ask who invented the scientific method and most Western textbooks answer Francis Bacon (1620) or Galileo (1638). Ibn al-Haytham was doing controlled, apparatus-driven, hypothesis-testing experiment in Cairo around 1020 — and, crucially, arguing in writing that this is what makes a claim true. He also named the practice: i\'tibār, meaning testing or trial.',
    quote: {
      text: 'The seeker after truth is not one who studies the writings of the ancients and puts his trust in them, but rather one who suspects his faith in them and questions what he gathers from them.',
      source: 'al-Shukūk ʿalā Baṭlamyūs — Doubts Concerning Ptolemy'
    },
    stats: { insight: 94, rigor: 97, imagination: 82, craft: 88, teaching: 79, legacy: 91 },
    statNote:
      'Rigor is the whole point of this character. He is the first person we can document insisting that a physical claim must be settled by a repeatable, manipulated experiment.',
    quests: [
      {
        id: 'ih-itibar', tier: 0, kind: 'method', title: "I'tibār — Proof by Experiment", year: 'c. 1011 — 1021',
        summary: 'Vary one condition. Repeat. Believe the apparatus, not the authority.',
        detail:
          'Throughout the Book of Optics the pattern is the same: state the claim, describe the instrument, describe the procedure so a reader can rebuild it, report what happens, and only then generalise. He built a graduated brass apparatus for measuring refraction, sighting tubes, apertured screens and a darkened chamber. He also insisted the investigator must actively distrust himself — that the seeker after truth is obliged to attack his own conclusions as hard as anyone else\'s.',
        impact: 5, requires: []
      },
      {
        id: 'ih-intro', tier: 1, kind: 'discovery', title: 'Intromission — How Vision Works', year: 'c. 1011 — 1021',
        summary: 'Light enters the eye. The eye does not emit anything.',
        detail:
          'Two traditions were in conflict: the mathematicians (Euclid, Ptolemy) had rays leaving the eye, while the physicians and Aristotelians had something arriving. Ibn al-Haytham demolished the emission theory with plain arguments — you are dazzled by the sun and the afterimage persists, which makes no sense if your eye is the source — and then did what neither camp had managed: he kept the mathematicians\' geometry of rays and attached it to the physicians\' anatomy of the eye. Every ray-optics diagram since is downstream of that merger.',
        impact: 5, requires: ['ih-itibar']
      },
      {
        id: 'ih-camera', tier: 2, kind: 'artifact', title: 'The Dark Chamber', year: 'c. 1011 — 1021',
        summary: 'al-bayt al-muẓlim — the first real analysis of the pinhole image.',
        detail:
          'He set several lamps outside a darkened room with a small aperture, and showed that each lamp casts its own separate spot inside, inverted, and that blocking one lamp extinguishes only its own spot. That single experiment proves light travels in straight, independent rays that do not mix or interact in the air. The Latin translation of his term gave Europe the phrase camera obscura, and the device runs in a straight line from him to Leonardo\'s notebooks to the photographic camera.',
        impact: 5, requires: ['ih-intro']
      },
      {
        id: 'ih-refract', tier: 2, kind: 'discovery', title: 'Reflection, Refraction, Atmosphere', year: 'c. 1011 — 1021',
        summary: 'Quantitative optics — including the height of the atmosphere from the length of twilight.',
        detail:
          'He established that the incident ray, the reflected ray and the normal all lie in one plane, and produced refraction tables across the air–water and air–glass boundaries — decomposing the ray into components in a way that anticipates Snell. Most striking is his treatment of twilight: knowing that dawn begins when the sun is a fixed angle below the horizon, and that the glow is refracted sunlight, he inverted the geometry to estimate the height of the atmosphere at roughly 52 miles. The modern figure for the relevant boundary is close enough to be startling.',
        impact: 4, requires: ['ih-itibar']
      },
      {
        id: 'ih-problem', tier: 3, kind: 'trial', title: "Alhazen's Problem", year: 'c. 1021',
        summary: 'Where on a spherical mirror does light bounce from a given source to a given eye?',
        detail:
          'Book V of the Optics poses it and solves it by intersecting conic sections — a genuinely difficult piece of geometry. In modern terms the problem is a quartic equation, and it is provably not solvable with straightedge and compass alone. It went unsolved algebraically until 1997, when Peter Neumann at Oxford gave the general algebraic treatment. Nine hundred and seventy-odd years is a good run for one exercise.',
        impact: 3, requires: ['ih-refract']
      },
      {
        id: 'ih-doubts', tier: 3, kind: 'artifact', title: 'Doubts Concerning Ptolemy', year: 'c. 1028',
        summary: 'A physical model must describe bodies that could actually exist.',
        detail:
          'Ptolemy\'s equant reproduced the observed planetary motions but required a sphere to rotate uniformly about a point that was not its centre — which no real, rigid celestial body could do. Ibn al-Haytham refused to accept a model that was predictively adequate but physically impossible. That objection is picked up two centuries later by the Maragha astronomers and by Ibn al-Shāṭir, whose planetary devices reappear, essentially unchanged, in Copernicus.',
        impact: 4, requires: ['ih-itibar']
      },
      {
        id: 'ih-percept', tier: 3, kind: 'discovery', title: 'The Psychology of Seeing', year: 'c. 1011 — 1021',
        summary: 'The moon illusion is in the mind, not the air. Perception involves inference.',
        detail:
          'The moon looks enormous on the horizon and small overhead, though it subtends the same angle. Ibn al-Haytham argued the effect is not atmospheric magnification but a judgement the observer makes about distance from the intervening terrain — a cognitive explanation. More generally he held that seeing is not passive reception but involves rapid unconscious inference, and he catalogued the illusions where that inference fails. Hermann von Helmholtz would reach the same conclusion around 1867.',
        impact: 4, requires: ['ih-intro']
      },
      {
        id: 'ih-madness', tier: 1, kind: 'trial', title: 'The Nile, and Ten Years of Feigned Madness', year: 'c. 1010s',
        summary: 'He promised to dam the Nile. Then he saw the survey.',
        detail:
          'Summoned to Cairo by the Fatimid caliph al-Ḥākim on the strength of his claim that he could regulate the Nile\'s flooding, Ibn al-Haytham travelled south to Aswan, examined the terrain, and concluded the project was impossible with the means available — an engineering judgement the modern Aswan dams, built a millennium later with concrete and dynamite, do not exactly contradict. Facing a caliph with a reputation for executing disappointments, he is reported to have feigned insanity, and remained under house arrest until al-Ḥākim\'s death in 1021. He spent the confinement writing the Book of Optics.',
        impact: 2, requires: ['ih-itibar']
      },
      {
        id: 'ih-transmit', tier: 4, kind: 'legacy', title: 'De Aspectibus', year: 'c. 1200 →',
        summary: 'Latin translation → Bacon, Witelo, Pecham → Kepler → the modern eye.',
        detail:
          'The Optics reached Europe around 1200 as De aspectibus and became the standard text for four hundred years. Roger Bacon, Witelo and John Pecham built directly on it; Kepler\'s Ad Vitellionem paralipomena of 1604 — where the retinal image is finally got right — takes its name from Witelo, and through him from Ibn al-Haytham. The lunar crater Alhazen and asteroid 59239 carry his name, and UNESCO built the 2015 International Year of Light around the millennium of the Book of Optics.',
        impact: 5, requires: ['ih-camera', 'ih-doubts', 'ih-percept', 'ih-problem']
      }
    ],
    artifacts: [
      { name: 'Kitāb al-Manāẓir (Book of Optics)', year: 'c. 1011–21', what: 'Seven books. The founding text of experimental physical science.' },
      { name: 'al-Shukūk ʿalā Baṭlamyūs', year: 'c. 1028', what: 'Doubts Concerning Ptolemy. A model must be physically possible.' },
      { name: 'Maqāla fī ḍawʾ al-qamar', year: 'c. 1020', what: 'On the Light of the Moon — the moon shines by scattering, not mirror reflection.' },
      { name: 'Risāla fī\'l-Makān', year: 'c. 1020s', what: 'On Place — a geometrical rebuttal of Aristotle\'s definition of space.' }
    ],
    sources: [
      { title: 'Book of Optics — Wikipedia', url: 'https://en.wikipedia.org/wiki/Book_of_Optics' },
      { title: 'Who was Ibn al-Haytham — ibnalhaytham.com', url: 'https://www.ibnalhaytham.com/discover/who-was-ibn-al-haytham/' },
      { title: 'Ibn al-Haytham — ISMI / Biographical Encyclopedia of Astronomers', url: 'https://ismi.mpiwg-berlin.mpg.de/biography/Ibn_al-Haytham_BEA.htm' },
      { title: "A. Mark Smith — Ibn al-Haytham's Analysis of the Moon Illusion (lecture summary PDF)", url: 'https://www.scientists4palestine.org/wp-content/uploads/2023/01/AMarkSmith-BisanLecture-1-11-2023-PostLectureSummary.pdf' },
      { title: 'Ibn al-Haytham Founds Experimental Physics and Optics — History of Information', url: 'https://www.historyofinformation.com/detail.php?id=2047' }
    ]
  },

  /* ────────────────────────────────────────────────────────────── 04 ── */
  {
    id: 'noether',
    name: 'Emmy Noether',
    shortName: 'Noether',
    title: 'The Symmetry Architect',
    class: 'Mathematician',
    life: '1882 — 1935',
    origin: 'Erlangen, Bavaria',
    era: 'Twentieth Century',
    accent: '#e6242a',
    accent2: '#0b63d6',
    rarity: 'underrated',
    tagline: 'Explained why conservation laws exist at all — then rebuilt algebra from the ground up.',
    intro:
      'Emmy Noether answered a question so basic that physics had not thought to ask it: <em>why</em> is energy conserved? Her 1918 theorem shows that every conservation law in physics is the shadow of a continuous symmetry — energy from the fact that the laws do not change with time, momentum from the fact that they do not change from place to place, electric charge from gauge symmetry. She proved it while formally barred from holding a post, lecturing for four years under David Hilbert\'s name because Göttingen would not appoint a woman.',
    underrated:
      'Physicists invoke "Noether\'s theorem" daily. Almost none of them mean her second theorem, which is arguably deeper. And her algebra — the abstract, structural way that rings, ideals and modules are taught in every university on Earth — has been absorbed so thoroughly into the water supply of mathematics that it is rarely attributed to anyone at all. Being the author of the way a subject is thought about is the least visible kind of fame there is.',
    quote: {
      text: 'I do not see that the sex of the candidate is an argument against her admission as a Privatdozent. After all, we are a university, not a bathhouse.',
      source: 'David Hilbert to the Göttingen faculty senate, c. 1915, arguing for Noether\'s habilitation'
    },
    stats: { insight: 99, rigor: 96, imagination: 93, craft: 55, teaching: 88, legacy: 97 },
    statNote:
      'Craft is low only because she was not an experimentalist — she had no bench. Her tool was abstraction, and she is one of the greatest users of it who has ever lived.',
    quests: [
      {
        id: 'nt-gordan', tier: 0, kind: 'trial', title: 'A Dissertation She Called Rubbish', year: '1907',
        summary: 'Erlangen, under Paul Gordan. 331 explicit invariants, computed by hand.',
        detail:
          'Noether\'s doctorate was a monumental exercise in classical invariant theory — grinding out ternary biquadratic invariants one at a time. She passed summa cum laude and afterwards described the work as Mist, which translates politely as rubbish and impolitely as manure. The judgement matters: the whole of her later career is a deliberate rejection of computation in favour of structure, and she knew exactly what she was rejecting because she had done it the hard way first.',
        impact: 2, requires: []
      },
      {
        id: 'nt-gottingen', tier: 1, kind: 'trial', title: 'Called to Göttingen', year: '1915',
        summary: 'Invited by Hilbert and Klein. Refused a post. Lectured under Hilbert\'s name for four years.',
        detail:
          'General relativity had produced an embarrassment: attempts to write down energy conservation in the theory collapsed into a tautology, an equation with no physical content, which had never happened in any previous theory. Hilbert and Klein wanted the best invariant-theorist alive to sort it out, and that was Noether. The faculty refused her habilitation on the grounds of sex; the workaround was to advertise the courses under Hilbert\'s name and let her teach them. She was finally habilitated in 1919, and was still unsalaried for years after that.',
        impact: 3, requires: ['nt-gordan']
      },
      {
        id: 'nt-thm1', tier: 2, kind: 'discovery', title: "Noether's First Theorem", year: '1918',
        summary: '"Invariante Variationsprobleme". Every continuous symmetry ⇒ a conserved quantity.',
        detail:
          'If the action of a system is unchanged by a continuous transformation, there is a quantity that does not change with time — and the theorem tells you how to construct it. Invariance under time translation gives conservation of energy. Under spatial translation, momentum. Under rotation, angular momentum. Under the phase symmetry of the electromagnetic field, electric charge. Before Noether these were separate empirical facts; after her they are one fact wearing five costumes. It is the organising principle of the entire Standard Model.',
        impact: 5, requires: ['nt-gottingen']
      },
      {
        id: 'nt-thm2', tier: 2, kind: 'discovery', title: "Noether's Second Theorem", year: '1918',
        summary: 'The less famous one. It dissolved the general-relativity energy paradox.',
        detail:
          'The second theorem handles symmetries that depend on arbitrary functions rather than constant parameters — what we now call local or gauge symmetries. In that case you do not get new conservation laws; you get identities among the field equations, meaning the equations are not independent. This is precisely why energy conservation in general relativity comes out as a triviality: it is an identity forced by the theory\'s own coordinate freedom, what Noether called an "improper" conservation law. The result is foundational for gauge theory and for the constrained-Hamiltonian machinery every quantum field theorist uses.',
        impact: 5, requires: ['nt-gottingen']
      },
      {
        id: 'nt-ideal', tier: 3, kind: 'artifact', title: 'Idealtheorie in Ringbereichen', year: '1921',
        summary: 'Mathematische Annalen. The paper that created modern commutative algebra.',
        detail:
          'Noether abstracted the theory of ideals away from any particular number system and found the one condition that makes everything work: the ascending chain condition, which says you cannot keep enlarging an ideal forever. Rings satisfying it are called Noetherian rings, and they are the setting for essentially all of modern algebraic geometry and commutative algebra. The Lasker–Noether theorem on primary decomposition falls out as a consequence. Every graduate algebra course on Earth teaches this paper, usually without saying so.',
        impact: 5, requires: ['nt-gordan']
      },
      {
        id: 'nt-dedekind', tier: 3, kind: 'discovery', title: 'Abstrakter Aufbau der Idealtheorie', year: '1927',
        summary: 'Three axioms that characterise the rings of algebraic number theory.',
        detail:
          'Noether showed that the rings in which unique factorisation of ideals holds — Dedekind domains — are exactly those that are Noetherian, integrally closed, and of Krull dimension one. A century of number theory built up case by case was suddenly derivable from three structural conditions. This is her signature move: find the axioms that make the theorems inevitable, then throw the scaffolding away.',
        impact: 4, requires: ['nt-ideal']
      },
      {
        id: 'nt-noncomm', tier: 3, kind: 'discovery', title: 'Noncommutative Algebra', year: '1927 — 1933',
        summary: 'With Brauer and Hasse: the classification of division algebras over number fields.',
        detail:
          'Noether reoriented representation theory around the concept of a module and, with Richard Brauer and Helmut Hasse, proved in 1932 that every central simple algebra over an algebraic number field is cyclic — the Brauer–Noether–Hasse theorem. It is one of the great results of the period and a direct ancestor of class field theory as it is now understood. Her Göttingen students, the "Noether boys", carried the method outward; van der Waerden\'s Moderne Algebra (1930–31) is essentially her lectures written down, as he acknowledged.',
        impact: 4, requires: ['nt-ideal']
      },
      {
        id: 'nt-topology', tier: 3, kind: 'method', title: 'Homology Groups', year: 'c. 1926 — 1927',
        summary: 'She told the topologists to stop counting and start using groups.',
        detail:
          'Topologists of the day computed Betti numbers and torsion coefficients — integers attached to a shape. Noether pointed out to Heinz Hopf and Pavel Alexandroff that these numbers are just the ranks of underlying abelian groups, and that the groups themselves are the real object, because maps between spaces induce homomorphisms between groups. That remark converted combinatorial topology into algebraic topology and is the seed of homological algebra and category theory.',
        impact: 5, requires: ['nt-ideal']
      },
      {
        id: 'nt-exile', tier: 4, kind: 'trial', title: 'Dismissal and Exile', year: '1933 — 1935',
        summary: 'Removed under the Nazi civil service law. Bryn Mawr. Dead at 53.',
        detail:
          'In April 1933 the Law for the Restoration of the Professional Civil Service stripped Noether of her right to teach — she was Jewish, a woman, a pacifist and a social democrat, which was four disqualifications where one sufficed. Colleagues report she kept lecturing to her students in her own apartment, including to one who arrived in Nazi uniform. She emigrated to Bryn Mawr College in Pennsylvania and died on 14 April 1935, four days after surgery for an ovarian cyst, at fifty-three. Einstein\'s letter to the New York Times called her "the most significant creative mathematical genius thus far produced since the higher education of women began."',
        impact: 4, requires: ['nt-thm1', 'nt-thm2', 'nt-noncomm', 'nt-topology', 'nt-dedekind']
      }
    ],
    artifacts: [
      { name: 'Invariante Variationsprobleme', year: '1918', what: 'Both theorems, in one paper, in the Göttingen Nachrichten.' },
      { name: 'Idealtheorie in Ringbereichen', year: '1921', what: 'Noetherian rings. Modern commutative algebra starts here.' },
      { name: 'Moderne Algebra', year: '1930–31', what: 'Published under van der Waerden\'s name, built on her lectures, by his own account.' },
      { name: 'The Noether boys', year: '1920s–30s', what: 'Her students — Deuring, Fitting, Levitzki, Witt and others — carried the method across Europe.' }
    ],
    sources: [
      { title: 'Emmy Noether and Her Theorems — Rowe, Annalen der Physik (2024)', url: 'https://onlinelibrary.wiley.com/doi/full/10.1002/andp.202300479' },
      { title: 'In her short life, mathematician Emmy Noether changed the face of physics — Science News', url: 'https://www.sciencenews.org/article/emmy-noether-theorem-legacy-physics-math' },
      { title: 'Emmy Noether on Energy Conservation in General Relativity (arXiv)', url: 'https://arxiv.org/pdf/1912.03269' },
      { title: 'The Noether theorems in context — Kosmann-Schwarzbach (arXiv)', url: 'https://arxiv.org/pdf/2004.09254' },
      { title: 'Noether Publishes the Theory of Ideals in Rings — EBSCO', url: 'https://www.ebsco.com/research-starters/history/noether-publishes-theory-ideals-rings' }
    ]
  },

  /* ────────────────────────────────────────────────────────────── 05 ── */
  {
    id: 'wu',
    name: 'Chien-Shiung Wu',
    shortName: 'Wu',
    title: 'The Verifier',
    class: 'Experimentalist',
    life: '1912 — 1997',
    origin: 'Liuhe, Jiangsu, China',
    era: 'Twentieth Century',
    accent: '#0b63d6',
    accent2: '#ffd400',
    rarity: 'underrated',
    tagline: 'Cooled cobalt to three thousandths of a degree above absolute zero and proved the universe is left-handed.',
    intro:
      'For thirty years, if a theory in nuclear or particle physics needed to be settled, the answer was to ask Wu. She rescued Fermi\'s theory of beta decay when everyone else\'s data said it was wrong, produced the first entangled photon pair ever made in a laboratory without knowing that was what she had, and in the winter of 1956 overturned a symmetry principle physicists had assumed was as safe as arithmetic. The Nobel Prize for that discovery went to the two men who suggested the experiment.',
    underrated:
      'Lee and Yang won the 1957 Nobel Prize for proposing that parity might be violated. Wu, who designed and executed the fiendishly difficult experiment that showed it actually is, was not included — a decision the physics community has argued about ever since. She is also, on the record, the first person to produce an entangled quantum state in a lab, in 1949, thirteen years before Bell wrote down his inequality.',
    quote: {
      text: 'It is the courage to doubt what has long been established, the incessant search for its verification and proof that pushes the wheel of science forward.',
      source: 'Chien-Shiung Wu'
    },
    stats: { insight: 88, rigor: 100, imagination: 79, craft: 99, teaching: 76, legacy: 90 },
    statNote:
      'Rigor at 100 is not flattery. Her whole scientific identity was built on finding the systematic error everybody else had missed — and it worked more than once.',
    quests: [
      {
        id: 'wu-berkeley', tier: 0, kind: 'method', title: 'Berkeley, and the Discipline of the Thin Source', year: '1936 — 1942',
        summary: 'PhD under Ernest Lawrence and Emilio Segrè. Fission products and beta spectra.',
        detail:
          'Wu arrived in San Francisco in 1936 intending to study at Michigan, visited Berkeley, and stayed. Her doctoral work covered the bremsstrahlung of beta particles and the xenon isotopes produced by uranium fission. The habit that would define her career formed here: obsessive attention to the sources themselves, because in beta spectroscopy the sample is usually what is lying to you.',
        impact: 3, requires: []
      },
      {
        id: 'wu-hanford', tier: 1, kind: 'trial', title: 'The Reactor That Kept Stopping', year: '1944',
        summary: 'Hanford B Reactor died hours after startup. Her thesis had the answer.',
        detail:
          'The first full-scale plutonium production reactor started up in September 1944, ran, then choked and shut down — and then restarted by itself hours later. John Wheeler suspected a fission product was absorbing the neutrons. Enrico Fermi recalled that a young woman at Columbia had measured exactly this: Wu\'s unpublished thesis work identified xenon-135, which has a neutron capture cross-section around 2 million barns, the largest of any known nuclide. The reactor was redesigned around the answer.',
        impact: 3, requires: ['wu-berkeley']
      },
      {
        id: 'wu-manhattan', tier: 1, kind: 'trial', title: 'Manhattan Project — Columbia SAM Lab', year: '1944 — 1945',
        summary: 'Gaseous diffusion enrichment of uranium-235, and better radiation detectors.',
        detail:
          'Wu worked in the Substitute Alloy Materials Laboratory at Columbia on the separation of uranium-235 from uranium-238 by gaseous diffusion — the process that was scaled up into the K-25 plant at Oak Ridge — and on improving Geiger counters for the detection levels the project needed. She stayed at Columbia for the rest of her career, becoming its first tenured woman physicist in 1958.',
        impact: 3, requires: ['wu-berkeley']
      },
      {
        id: 'wu-entangle', tier: 2, kind: 'discovery', title: 'Wu–Shaknov: The First Entangled Pair', year: '1949',
        summary: 'Polarisation correlation of annihilation photons from copper-64.',
        detail:
          'John Wheeler had predicted in 1946 that when a positron and an electron annihilate at rest, the two gamma photons must be polarised at right angles to each other. Wu and Irving Shaknov built the source and the coincidence counters and measured it, confirming quantum electrodynamics. Eight years later Bohm and Aharonov looked at their data and pointed out what it actually was: the first entangled quantum state ever produced in a laboratory, and hard evidence that the Einstein–Podolsky–Rosen argument was about real physics rather than philosophy. Every Bell test since is a descendant.',
        impact: 5, requires: ['wu-berkeley']
      },
      {
        id: 'wu-fermi', tier: 2, kind: 'discovery', title: 'Rescuing Fermi\'s Theory of Beta Decay', year: '1949 — 1952',
        summary: 'The theory was fine. The samples were too thick.',
        detail:
          'Fermi\'s 1934 theory of beta decay predicted a specific shape for the energy spectrum of the emitted electrons, and experiment after experiment disagreed with it near the low-energy end. Wu worked out why: everyone was making radioactive sources thick enough that emerging electrons scattered inside the sample before they were ever counted. With uniform sources thin enough to avoid it, the spectra snapped into agreement with Fermi. She did not overturn a theory here; she saved one, by being more suspicious of the apparatus than of the physics.',
        impact: 5, requires: ['wu-berkeley']
      },
      {
        id: 'wu-parity', tier: 3, kind: 'discovery', title: 'The Fall of Parity', year: 'Dec 1956 — Jan 1957',
        summary: 'Cobalt-60 at 0.003 K. The electrons came out one way, and the mirror broke.',
        detail:
          'Parity conservation says physics cannot tell left from right — that the mirror image of any process is an equally valid process. Lee and Yang noticed in 1956 that this had actually been tested for the electromagnetic and strong forces but merely assumed for the weak force, and suggested experiments. Wu took it on and cancelled a long-planned voyage to China to do it. She went to the National Bureau of Standards Low Temperature Group, used adiabatic demagnetisation of a cerium magnesium nitrate crystal to reach about 0.003 K, aligned the spins of cobalt-60 nuclei in a magnetic field, and counted the beta electrons emitted along the spin direction versus against it. They came out preferentially <em>against</em> the spin — a large asymmetry. The universe distinguishes left from right. Results were announced on 15 January 1957 and published in Physical Review 105, 1413 on 15 February.',
        impact: 5, requires: ['wu-fermi', 'wu-entangle']
      },
      {
        id: 'wu-nobel', tier: 4, kind: 'trial', title: 'The Prize She Did Not Get', year: '1957',
        summary: 'Lee and Yang, October 1957. Wu\'s name is absent.',
        detail:
          'The 1957 Nobel Prize in Physics was awarded eight months after the experiment — extraordinarily fast, a measure of how seismic the result was — to Tsung-Dao Lee and Chen Ning Yang for the theoretical proposal. The experimentalist who made it a fact was not named. Wu received the Wolf Prize in Physics in 1978 as its first-ever recipient, the National Medal of Science in 1975, and was elected the first woman president of the American Physical Society in 1975. In 1964, at an MIT symposium, she asked in public whether the atoms and nuclei and mathematical symbols had any preference for masculine or feminine treatment.',
        impact: 4, requires: ['wu-parity']
      },
      {
        id: 'wu-cvc', tier: 3, kind: 'discovery', title: 'Conserved Vector Current', year: '1963',
        summary: 'With Y. K. Lee and L. W. Mo — confirming Feynman and Gell-Mann.',
        detail:
          'After parity fell, Feynman and Gell-Mann proposed the V−A form of the weak interaction along with the conserved vector current hypothesis, which ties the weak vector current to the electromagnetic one. Wu\'s group did the precision beta-decay measurement in boron-12 and nitrogen-12 that confirmed CVC. It is a cornerstone of electroweak unification, and it is a neat closing of a circle: the theorist whose law she confirmed had built his theory on the symmetry her earlier experiment destroyed.',
        impact: 4, requires: ['wu-parity']
      },
      {
        id: 'wu-bio', tier: 4, kind: 'discovery', title: 'Sickle Cell Haemoglobin', year: '1970s',
        summary: 'She turned nuclear technique on biology and it worked.',
        detail:
          'In the last active phase of her research career Wu applied Mössbauer spectroscopy — a nuclear resonance method — to haemoglobin, and characterised the structural change in the sickle-cell variant. It is a small coda beside parity violation, but it demonstrates the thing that made her formidable: she was a technique, not a topic, and the technique went wherever the question was.',
        impact: 3, requires: ['wu-cvc']
      },
      {
        id: 'wu-legacy', tier: 4, kind: 'legacy', title: 'The First Lady of Physics', year: '1997 →',
        summary: 'Asteroid 2752. A US postage stamp in 2021. Ashes in a schoolyard in Liuhe.',
        detail:
          'Wu\'s father Wu Zhongyi founded the Mingde School in Liuhe specifically so that girls in the town could be educated, and sent his daughter to it. She is buried in its courtyard. Asteroid 2752 Wu Chien-Shiung carries her name, the US Postal Service issued a Forever stamp for her in 2021, and physicists still call the 1956–57 measurement simply "the Wu experiment" — one of the very few experiments in the discipline known by the name of the person who did it.',
        impact: 4, requires: ['wu-nobel', 'wu-bio']
      }
    ],
    artifacts: [
      { name: 'Experimental Test of Parity Conservation in Beta Decay', year: '1957', what: 'Phys. Rev. 105, 1413. Four pages that removed a symmetry from the universe.' },
      { name: 'The Angular Correlation of Scattered Annihilation Radiation', year: '1950', what: 'Wu & Shaknov, Phys. Rev. 77, 136. Entanglement, before anyone called it that.' },
      { name: 'Beta Decay', year: '1965', what: 'Her textbook with Steven Moszkowski. The standard reference for a generation.' },
      { name: 'The cryostat at NBS', year: '1956', what: 'Cerium magnesium nitrate, adiabatic demagnetisation, and about 0.003 kelvin.' }
    ],
    sources: [
      { title: "Chien-Shiung Wu's trailblazing experiments in particle physics — Physics Today", url: 'https://physicstoday.aip.org/features/chien-shiung-wus-trailblazing-experiments-in-particle-physics' },
      { title: 'Wu experiment — Wikipedia', url: 'https://en.wikipedia.org/wiki/Wu_experiment' },
      { title: 'Chien-Shiung Wu as the experimental pioneer in quantum entanglement (arXiv)', url: 'https://arxiv.org/html/2502.06458v1' },
      { title: 'December 27, 1956: Fall of Parity Conservation — APS News', url: 'https://www.aps.org/publications/apsnews/200112/history.cfm' },
      { title: 'Chien-Shiung Wu — Atomic Heritage Foundation', url: 'https://ahf.nuclearmuseum.org/ahf/profile/chien-shiung-wu/' }
    ]
  }
];

export const byId = (id) => SCIENTISTS.find((s) => s.id === id);
