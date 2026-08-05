/**
 * THE POP LAB — five more underrated scientists, told as comic panels you
 * have to operate before they open up.
 *
 * Voice note: this is deliberately not textbook. But every claim here is
 * checked, and where the popular story is wrong (Lamarr) the entry says so
 * rather than repeating the nicer version. Sources are listed per scientist
 * and rendered at the bottom of each panel.
 */

export const LAB = [
  /* ─────────────────────────────────────────────────────────────── 06 ── */
  {
    id: 'chatelet',
    name: 'Émilie du Châtelet',
    life: '1706 — 1749',
    origin: 'Paris',
    role: 'Physicist · Translator',
    ink: 'red',
    hook: 'All of Europe was shouting about energy. She settled it with a lump of wet clay.',
    game: 'crater',
    gameTitle: 'The Crater Test',
    gameBrief: 'Drop the brass ball. Watch how deep it bites. Then work out the rule.',
    gameHint: 'Run all three speeds. Compare the dents — not the numbers you expected.',
    beats: [
      {
        head: 'The shouting match',
        body: 'Paris, the 1730s. European physics is deadlocked in an argument so long-running it has a name — the <b>vis viva</b> dispute. One camp says a moving object\'s punch is its mass times its speed. The other says mass times speed <em>squared</em>. Both sides have algebra. Neither has mud.'
      },
      {
        head: 'The Dutchman\'s mud',
        body: 'Du Châtelet reaches for an experiment nobody had taken seriously enough. In 1722 Willem \'s Gravesande had been dropping brass balls into soft clay. A ball arriving at twice the speed did not make a dent twice as deep. It made one <b>four times</b> as deep. Three times the speed: <b>nine times</b> the dent.'
      },
      {
        head: 'Reading the dent',
        body: 'One, four, nine. Those are squares, and the clay is doing the algebra in public. In her <em>Institutions de Physique</em> (1740) she welds the Dutch experiment to the Leibnizian theory and shows the punch of a moving body goes as <b>v²</b> — the thing we now call kinetic energy. She was arguing for the losing side of a fight she turned out to have won.'
      },
      {
        head: 'And then the Principia',
        body: 'She spent her last years translating Newton\'s <em>Principia</em> into French and annotating it. It is <b>still the standard French translation</b>, nearly three centuries on. She finished it while pregnant at 42, convinced she would not survive the birth. She was right — she died six days after, in 1749.'
      }
    ],
    today: 'This is why a crash at 60 is not twice as bad as a crash at 30 — it is <b>four times</b> as bad. That square sits inside every crash-test rating, every speed limit, every airbag deployment curve, and every braking-distance table you were made to memorise. She found it in a lump of clay.',
    sources: [
      { t: 'Émilie du Châtelet — Stanford Encyclopedia of Philosophy', u: 'https://plato.stanford.edu/entries/emilie-du-chatelet/' },
      { t: 'Du Châtelet (1706–1749) — Project Vox, Duke University', u: 'https://projectvox.org/du-chatelet-1706-1749/' },
      { t: 'The Marquise du Châtelet: A Controversial Woman of Science (arXiv)', u: 'https://arxiv.org/pdf/1406.7401' },
      { t: 'APS News — This Month in Physics History: Émilie du Châtelet', u: 'https://www.aps.org/publications/apsnews/200812/physicshistory.cfm' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 07 ── */
  {
    id: 'lamarr',
    name: 'Hedy Lamarr',
    life: '1914 — 2000',
    origin: 'Vienna → Hollywood',
    role: 'Actor · Inventor',
    ink: 'blue',
    hook: 'The internet says she invented Wi-Fi. She did not. What actually happened is stranger.',
    game: 'hop',
    gameTitle: 'The Jam',
    gameBrief: 'A jammer is sweeping the band. Stay ahead of it. Hop to the lit key before it lands on you.',
    gameHint: 'Eight clean hops and the message gets through.',
    beats: [
      {
        head: 'The dinner parties',
        body: 'Before Hollywood she was Hedwig Kiesler, married off at 19 to an Austrian arms manufacturer who sold to Mussolini. She sat silently through dinners where officers talked through the guidance problems of torpedoes, and she remembered <b>all of it</b>. Then she escaped to London and became the highest-paid face at MGM.'
      },
      {
        head: 'The problem with sitting still',
        body: 'A radio-guided torpedo listens on one frequency. Park a screech on that frequency and the torpedo goes deaf. Everyone knew this. Nobody had a fix that survived contact with the sea.'
      },
      {
        head: '88 keys, 88 channels',
        body: 'Her answer, worked out with avant-garde composer <b>George Antheil</b>: stop sitting still. Have the transmitter and receiver leap between 88 frequencies in a secret shared order. To a jammer it is noise. Antheil, who had once written a piece for sixteen synchronised player pianos, kept the two ends in step with a <b>piano roll</b>. 88 keys. 88 channels. <b>US Patent 2,292,387</b>, granted 11 August 1942.'
      },
      {
        head: 'The part the posters leave out',
        body: 'The Navy filed it and did nothing. It was never used in the war. Claim 7 of the patent — the one that would have owned frequency hopping outright — was <b>rejected for prior art</b>. Wi-Fi tried frequency hopping and abandoned it early for lack of bandwidth. Bluetooth\'s inventor, Jaap Haartsen, has said plainly he had never heard of her patent. <b>She did not invent Wi-Fi.</b>'
      },
      {
        head: 'What is actually true',
        body: 'The idea was right and roughly twenty years early. Hop-based spread spectrum did reach the fleet — sonobuoys after the war, and frequency-hopping torpedo control on US ships by the Cuban Missile Crisis. She earned nothing from it; the patent expired before anyone paid. Her first real recognition came in <b>1997</b>, an EFF Pioneer Award, three years before she died.'
      }
    ],
    today: 'Every Bluetooth device in your house hops channels about <b>1,600 times a second</b> to dodge the interference from your microwave and your neighbour\'s router. She did not build that. She patented the instinct behind it in 1942, from a dinner table she was not supposed to be listening at, and was ignored for fifty-five years.',
    sources: [
      { t: 'US Patent 2,292,387 — "Secret Communication System" (1942)', u: 'https://www.datamp.org/patents/displayPatent.php?pn=2292387&id=81142' },
      { t: 'Hedy Lamarr and George Antheil Invention Papers — Smithsonian NMAH', u: 'https://americanhistory.si.edu/collections/archival-collection/sova-nmah-ac-1590' },
      { t: 'Random Paths to Frequency Hopping — American Scientist', u: 'https://www.americanscientist.org/article/random-paths-to-frequency-hopping' },
      { t: 'Analysis of Hedy Lamarr\'s Contribution to Spread-Spectrum Communication (on Claim 7)', u: 'https://researchers.one/articles/24.01.00001.pdf' },
      { t: 'Hedy Lamarr — National Inventors Hall of Fame', u: 'https://www.invent.org/inductees/hedy-lamarr' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 08 ── */
  {
    id: 'kwolek',
    name: 'Stephanie Kwolek',
    life: '1923 — 2014',
    origin: 'New Kensington, Pennsylvania',
    role: 'Polymer Chemist',
    ink: 'yellow',
    hook: 'The batch came out wrong. Everybody threw wrong batches away. She did not.',
    game: 'mix',
    gameTitle: 'The Bench',
    gameBrief: 'Two reagents into the beaker. Most pairs will take your eyebrows off. One goes cloudy.',
    gameHint: 'She was chasing a rod-shaped molecule — something stiff and straight, in a solvent that would hold it.',
    beats: [
      {
        head: 'The brief',
        body: 'DuPont, 1964. A petrol shortage is coming and the company wants a fibre stiff enough to replace the steel belting in tyres. Kwolek — who had only taken the lab job to save up for medical school, and stayed eighteen years — gets the assignment nobody wants: the polymers that refuse to dissolve.'
      },
      {
        head: 'The batch that looked wrong',
        body: '1965. A solution comes out of her flask <b>thin, cloudy and opalescent</b>. It is supposed to be clear and syrupy, like molten honey. Cloudy means undissolved junk. Standard practice across the industry, on that day and every day: pour it away and start again.'
      },
      {
        head: '"It will wreck the machine"',
        body: 'She takes it to the spinneret instead. <b>Charles Smullen</b>, who runs the spinning equipment, refuses — cloudy means particles, particles clog the tiny holes and destroy the head. She asks again. And again. He held out for days. Eventually he gave in, mostly to end the argument.'
      },
      {
        head: 'Nine times',
        body: 'The fibre that came out was <b>at least nine times stiffer</b> than anything she had made. She did not celebrate — she assumed she had made an error somewhere and made them run the whole thing again. The molecules were <b>liquid crystals</b>: rigid rods that had already queued up in neat parallel lines while still in the flask. The cloudiness was not contamination. It was the fibre, pre-assembled.'
      }
    ],
    today: 'It is called <b>Kevlar</b>. It is in body armour, helmets, brake pads, fire kit, the jacket around fibre-optic cable, tyres and racing hulls. DuPont and the police-survivor programmes built around it count the officers who walked away in the <b>thousands</b>. All of it downstream of one chemist refusing to pour away a beaker that looked like dishwater.',
    sources: [
      { t: 'Stephanie L. Kwolek — Science History Institute', u: 'https://www.sciencehistory.org/education/scientific-biographies/stephanie-l-kwolek/' },
      { t: 'Stephanie Kwolek (1923–2014) — American Chemical Society', u: 'https://www.acs.org/education/whatischemistry/women-scientists/stephanie-kwolek.html' },
      { t: 'Stephanie Kwolek: Kevlar Inventor — Lemelson Center, Smithsonian', u: 'https://invention.si.edu/invention-stories/stephanie-kwolek-kevlarr-inventor' },
      { t: 'Kevlar — Molecule of the Month, University of Bristol', u: 'https://www.chm.bris.ac.uk/motm/kevlar/kevlarh.htm' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 09 ── */
  {
    id: 'snow',
    name: 'John Snow',
    life: '1813 — 1858',
    origin: 'York → Soho, London',
    role: 'Physician · Epidemiologist',
    ink: 'blue',
    hook: 'London was certain cholera was a smell. He proved it was a drink — with a map and a pencil.',
    game: 'pump',
    gameTitle: 'The Handle',
    gameBrief: 'Survey the houses. Mark the dead. When you can see it, pull the rope.',
    gameHint: 'Click houses to survey them. The shape will announce itself.',
    beats: [
      {
        head: 'Ten days, five hundred people',
        body: 'Soho, 31 August 1854. Cholera arrives in a few streets around Broad Street and in <b>ten days kills 500 people</b>. The final toll is <b>616</b>. The official explanation is <em>miasma</em> — that disease rides on foul air. It is not a fringe view; it is the settled consensus of British medicine.'
      },
      {
        head: 'A map, drawn by walking',
        body: 'Snow does not believe air can be that precise. He walks the district door to door and draws every death on a map as a small black bar stacked outside the house it happened in. The bars pile up around exactly one object: <b>the public water pump on Broad Street.</b>'
      },
      {
        head: 'The proof is in who lived',
        body: 'The clusters are suggestive. The <b>gaps</b> are the argument. The workhouse — hundreds of people packed in the middle of the outbreak — is barely touched; it has its own private well. The brewery on the street loses <b>nobody</b>; the men drank the beer ration. And a widow in Hampstead, miles clear of Soho, dies anyway — because she liked the taste of Broad Street water and had it carted to her.'
      },
      {
        head: 'The handle comes off',
        body: 'On <b>7–8 September 1854</b> he takes the map to the parish board and talks them into removing the pump handle. The Reverend <b>Henry Whitehead</b>, a local curate who set out to <em>disprove</em> him, ended up finding the source instead: a baby with cholera in the house at number 40, whose nappy water had been emptied into a cesspit leaking a few feet from the well.'
      },
      {
        head: 'Nobody believed him',
        body: 'The board put the handle back on once the panic passed and formally rejected his theory. Snow died in <b>1858</b>, aged 45, still a minority of one. The germ theory that vindicated him arrived decades later.'
      }
    ],
    today: 'Chlorinated tap water. Sewers routed away from drinking supplies. Outbreak maps, case clusters, contact tracing — the entire reflex of <em>where is this coming from</em> that ran the world through COVID. All of it traces to one doctor with a street map, counting the houses where nobody died. You drank the result this morning without thinking about it once.',
    sources: [
      { t: '1854 Broad Street cholera outbreak — overview and death toll', u: 'https://en.wikipedia.org/wiki/1854_Broad_Street_cholera_outbreak' },
      { t: 'John Snow: Cholera and the Broad Street pump — London Museum', u: 'https://www.londonmuseum.org.uk/collections/london-stories/john-snow-cholera-broad-street-pump/' },
      { t: 'How John Snow stopped cholera — yourgenome (Wellcome)', u: 'https://www.yourgenome.org/theme/how-john-snow-stopped-cholera-the-broad-street-water-pump-1854/' },
      { t: 'The John Snow Archive and Research Companion — Michigan State University', u: 'https://johnsnow.matrix.msu.edu/broadstpump/snow-the-pump-handle/' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 10 ── */
  {
    id: 'tu',
    name: 'Tu Youyou',
    life: 'b. 1930',
    origin: 'Ningbo, China',
    role: 'Pharmaceutical Chemist',
    ink: 'red',
    hook: 'Two thousand recipes failed. A book from around 340 AD told her she was cooking the cure to death.',
    game: 'extract',
    gameTitle: 'The Cold Press',
    gameBrief: 'Pick a solvent. Set a temperature. Get the compound out of the leaf without destroying it.',
    gameHint: 'Ge Hong wrote "soak" and "wring". He did not write "boil".',
    beats: [
      {
        head: 'Project 523',
        body: '1969. A secret Chinese military programme with a date for a name: <b>Project 523</b>, opened 23 May 1967. In the jungles of Vietnam, malaria is killing more soldiers than combat is, and the parasite has learned to shrug off chloroquine. Tu Youyou, 39, is put in charge of the traditional-medicine search. She sends her four-year-old daughter away to be raised by relatives and does not see her for years.'
      },
      {
        head: 'Two thousand dead ends',
        body: 'Her team combs the classical pharmacopoeia and assembles <b>2,000 candidate recipes</b>, narrowing to around <b>380 extracts</b> to test. <em>Qinghao</em> — sweet wormwood, <em>Artemisia annua</em> — shows promise, then loses it. The results will not reproduce. Sometimes it works. Usually it does not. That inconsistency is the whole puzzle.'
      },
      {
        head: 'One sentence, 1,600 years old',
        body: 'She goes back to the oldest source she can find: Ge Hong\'s <em>Handbook of Prescriptions for Emergencies</em>, roughly <b>340 AD</b>. The instruction is: take a handful of qinghao, <b>soak it in water, wring out the juice</b>, and drink it. Soak. Wring. Not decoct. Not boil. Every other recipe in the tradition is boiled — and she had been boiling it. <b>The heat was destroying the drug.</b>'
      },
      {
        head: 'Sample 191',
        body: 'She switches to <b>ethyl ether</b>, which boils at 35 °C, and extracts cold. <b>October 1971, sample number 191</b>: <b>100% inhibition</b> of the parasite in infected mice, then in monkeys. There is no framework for approving a human trial in the middle of the Cultural Revolution — so Tu and two colleagues <b>take it themselves first</b> to check it is safe.'
      },
      {
        head: 'Published by nobody',
        body: 'Project 523 was classified. The first papers went out with <b>no author names</b>. For decades outside China almost nobody knew who had done it. The <b>Nobel Prize came in 2015</b>, when she was 84 — the first Chinese Nobel in medicine, awarded to a scientist with no doctorate, no foreign training, and no membership of the Chinese Academy of Sciences.'
      }
    ],
    today: 'Artemisinin combination therapy is the front-line malaria treatment on the planet. The global malaria <b>death rate fell by around 57% between 2000 and 2015</b>, and the control effort over that period — ACTs alongside bed nets — is credited with saving roughly <b>6.8 million lives</b>, most of them children under five. It came out of a wartime lab, a 1,600-year-old book, and a decision to stop applying heat.',
    sources: [
      { t: 'Tu Youyou — NobelPrize.org', u: 'https://www.nobelprize.org/stories/women-who-changed-science/tu-youyou/' },
      { t: 'Artemisinin: Discovery from the Chinese Herbal Garden — Tu Youyou, Cell (2011)', u: 'https://www.cell.com/fulltext/S0092-8674(11)00950-0' },
      { t: 'From branch to bedside: Youyou Tu and the 2011 Lasker Award — J Clin Invest', u: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3195493/' },
      { t: 'WHO — Malaria fact sheet', u: 'https://www.who.int/news-room/fact-sheets/detail/malaria' },
      { t: 'Malaria — Our World in Data (death rate decline)', u: 'https://ourworldindata.org/malaria' }
    ]
  }
];
