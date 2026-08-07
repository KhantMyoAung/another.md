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
  },

  /* ─────────────────────────────────────────────────────────────── 11 ── */
  {
    id: 'leavitt',
    name: 'Henrietta Swan Leavitt',
    life: '1868 — 1921',
    origin: 'Lancaster, Massachusetts',
    role: 'Astronomer · "Computer"',
    ink: 'blue',
    hook: 'She was hired to count dots on glass plates. She handed back a ruler for the universe.',
    game: 'cepheid',
    gameTitle: 'The Blinking Star',
    gameBrief: 'Tap the beat of the star. Three peaks and you have its period.',
    gameHint: 'Longer blink = genuinely brighter star. That one fact is the whole ladder.',
    beats: [
      {
        head: 'The women who were called computers',
        body: 'Harvard College Observatory, 1893. Edward Pickering employs a room of women to measure photographic plates — cheaper than men, and by his own reckoning better at it. They are called <b>computers</b>, because that is the job: compute. Leavitt, deaf since a college illness, is put on variable stars. She is not permitted to operate a telescope.'
      },
      {
        head: 'Same shelf, same distance',
        body: 'She works the plates of the <b>Small Magellanic Cloud</b> and spots the trick nobody else has: everything in that cloud is at roughly the same distance from us. So if one star there <em>looks</em> brighter than another, it genuinely <b>is</b> brighter. The distance cancels out. It is the one place in the sky where you can compare stars honestly.'
      },
      {
        head: '25 stars, one line',
        body: 'In <b>1912</b> she publishes <em>Periods of 25 Variable Stars in the Small Magellanic Cloud</em>. Plot each star\'s brightness against how long it takes to pulse, and the points fall on a straight line. <b>The slower it blinks, the brighter it truly is.</b> Which means: time the blink, and you know the star\'s real brightness. Compare that to how dim it looks from here, and you have <b>its distance</b>.'
      },
      {
        head: 'The first rung',
        body: 'Until then, astronomers could only measure distance by parallax — good for the neighbours, useless past a few hundred light years. Leavitt handed over the first <b>standard candle</b>: a light of known wattage you could spot across the void. Hubble used exactly her method on Cepheids in Andromeda to prove it was another galaxy, and then to find that the universe is expanding.'
      },
      {
        head: 'The letter that came too late',
        body: 'She was paid around <b>thirty cents an hour</b>. She never held a post that let her follow her own discovery. In 1925 a Swedish mathematician wrote to Harvard to nominate her for the Nobel Prize, and had to be told she had died of cancer <b>four years earlier</b>, aged 53. The prize is not awarded posthumously.'
      }
    ],
    today: 'Every number you have ever read about the size or age of the universe stands on her line. The expanding universe, the Big Bang, dark energy, the <b>13.8-billion-year</b> figure — all of it is calibrated on Cepheids, and Cepheids are calibrated on 25 stars a deaf woman timed by hand at thirty cents an hour. Astronomers now call it the <b>Leavitt Law</b>, which took them about a century.',
    sources: [
      { t: 'Henrietta Swan Leavitt — Britannica', u: 'https://www.britannica.com/biography/Henrietta-Swan-Leavitt' },
      { t: 'Henrietta Swan Leavitt — The Harvard Plate Stacks', u: 'https://platestacks.cfa.harvard.edu/women-at-hco/henrietta-swan-leavitt' },
      { t: 'The Legacy of Henrietta Leavitt: A Re-analysis of the First Cepheid Period–Luminosity Relation (arXiv 2025)', u: 'https://arxiv.org/abs/2502.17438' },
      { t: 'Period–luminosity relation — Britannica', u: 'https://www.britannica.com/science/period-luminosity-relation' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 12 ── */
  {
    id: 'latimer',
    name: 'Lewis Howard Latimer',
    life: '1848 — 1928',
    origin: 'Chelsea, Massachusetts',
    role: 'Draftsman · Inventor',
    ink: 'yellow',
    hook: 'He did not invent the light bulb. He invented the reason you could afford one.',
    game: 'filament',
    gameTitle: 'The Filament',
    gameBrief: 'Pick a fibre. Pick how you bake it. Then switch it on and see how long it survives.',
    gameHint: 'The trick is not the fibre. It is what you wrap it in while it bakes.',
    beats: [
      {
        head: 'Son of a fugitive',
        body: 'His father George escaped slavery in Virginia and was put on trial in Boston in 1842 to decide whether he was a man or property. Lewis was born free six years later, lied about his age to join the Navy at 15, and came back to a job as an office boy at a patent firm — where he taught himself drafting by watching, and was promoted to head draftsman.'
      },
      {
        head: 'The drawings for the telephone',
        body: 'In 1876 he was the draftsman who prepared the patent drawings for <b>Alexander Graham Bell\'s telephone</b>, reportedly working nights against a filing deadline Bell won by hours. That is a footnote in most tellings. It is not the reason he is here.'
      },
      {
        head: 'What was actually wrong with bulbs',
        body: 'Edison\'s lamps worked. They just did not <em>last</em> — the carbon filaments came out of the oven warped and brittle and burned out in a few dozen hours, so light stayed a rich person\'s toy. The failure was not in the physics. It was in the <b>baking</b>.'
      },
      {
        head: 'A cardboard envelope',
        body: 'Latimer\'s patent of <b>17 January 1882</b>, "Process of Manufacturing Carbons", does one deceptively small thing: it encloses the filament blanks in a <b>cardboard envelope</b> during carbonisation. The card holds the shape and stops the fibre distorting and snapping as it bakes. Yield goes up, breakage goes down, and filaments start lasting hundreds of hours instead of dozens.'
      },
      {
        head: 'Setting the record straight',
        body: 'You will read that Latimer "invented the carbon filament light bulb". He <b>did not</b> — Edison and Swan had filament lamps before him. What he invented was the manufacturing process that made them cheap, durable and worth wiring a city for. He then installed public lighting in New York, Philadelphia, London and Montreal, wrote the first proper textbook on electric lighting in 1890, and was the only Black member of the <b>Edison Pioneers</b>.'
      }
    ],
    today: 'Flick a switch tonight. The bulb is LED now and the filament is long gone — but the reason electric light became a thing ordinary households could have, rather than a demonstration piece, is that somebody worked out how to bake the fragile part without breaking it. Cheap, reliable light is the single biggest extension of the usable human day in history, and this is the patent that priced it in.',
    sources: [
      { t: 'Lewis Howard Latimer — Wikipedia (patent 252,386, 17 Jan 1882)', u: 'https://en.wikipedia.org/wiki/Lewis_Howard_Latimer' },
      { t: 'Lewis Latimer — Lemelson–MIT', u: 'https://lemelson.mit.edu/resources/lewis-latimer' },
      { t: 'Lewis Howard Latimer — Interesting Engineering biography', u: 'https://interestingengineering.com/engineers-directory/lewis-howard-latimer' },
      { t: 'Bridgeport\'s Lighting Visionary — New Britain Industrial Museum', u: 'https://nbindustrial.org/blog/black-history-lewis-latimer' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 13 ── */
  {
    id: 'drew',
    name: 'Charles R. Drew',
    life: '1904 — 1950',
    origin: 'Washington, D.C.',
    role: 'Surgeon · Blood Researcher',
    ink: 'red',
    hook: 'He built the blood bank. Then they told him his own blood had to be stored separately.',
    game: 'centrifuge',
    gameTitle: 'The Centrifuge',
    gameBrief: 'Spin it up. Hold it in the band. Too slow and nothing separates; too fast and the cells burst.',
    gameHint: 'Hold, do not hammer. Steady in the green for four seconds.',
    beats: [
      {
        head: 'Blood does not keep',
        body: 'Whole blood spoils in about a week, and it has to match the recipient\'s type. In a war that is close to useless — you cannot ship it, stockpile it, or hand it to a medic in a field tent. Wounded men were dying of shock within reach of help.'
      },
      {
        head: 'Spin the cells out',
        body: 'Drew\'s insight, worked into his 1940 Columbia doctorate — the first medical doctorate awarded to a Black American — was to stop shipping blood at all. Spin it, and it separates: red cells at the bottom, straw-coloured <b>plasma</b> on top. Plasma keeps far longer, can be dried to powder and rehydrated, and — critically — <b>needs no type matching</b>. You can give it to anyone.'
      },
      {
        head: 'Blood for Britain',
        body: 'In 1940 he ran <b>Blood for Britain</b>, shipping plasma across the Atlantic to the Blitz, and worked out the things nobody had had to solve yet: sterile mass collection, standard testing, refrigerated transport, the mobile donation unit. He essentially designed <b>the blood bank</b> as a system, then set up the American Red Cross\'s national programme.'
      },
      {
        head: 'The order he would not carry out',
        body: 'In 1941 the US military instructed that blood from Black donors be <b>stored separately</b> from white donors\' blood, or excluded entirely. Drew — who had just built the entire supply — said publicly that there was no scientific basis for it whatsoever, because there is none: plasma is plasma. He resigned. The policy stood, in some form, until <b>1950</b>.'
      },
      {
        head: 'And the myth about his death',
        body: 'He died in a car crash in North Carolina in <b>1950</b>, aged 45. A story has circulated ever since that he bled to death after a whites-only hospital turned him away. It is <b>not true</b> — he was treated at Alamance General and the doctors, by the account of the colleagues travelling with him, worked hard on him; his injuries were unsurvivable. The real injustice does not need embellishing.'
      }
    ],
    today: 'Every blood drive, every fridge of labelled units, every bag of plasma hanging over a trauma bay runs on the system he designed. Plasma is still the thing that goes into a patient when there is no time to find out their type — which means it is the thing that buys the minutes. It exists because a surgeon worked out that the useful part of blood is the part you can spin off the top.',
    sources: [
      { t: 'Charles R. Drew — Wikipedia', u: 'https://en.wikipedia.org/wiki/Charles_R._Drew' },
      { t: 'Charles Drew — Profiles in Science, US National Library of Medicine', u: 'https://profiles.nlm.nih.gov/spotlight/bg/feature/biographical' },
      { t: 'Charles Richard Drew — Britannica', u: 'https://www.britannica.com/biography/Charles-Richard-Drew' },
      { t: 'The Charles Drew death myth — Snopes', u: 'https://www.snopes.com/fact-check/charles-drew-blood-bank/' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 14 ── */
  {
    id: 'telkes',
    name: 'Mária Telkes',
    life: '1900 — 1995',
    origin: 'Budapest → Massachusetts',
    role: 'Physical Chemist',
    ink: 'yellow',
    hook: 'Everyone could catch sunshine. She worked out how to keep it until Tuesday.',
    game: 'solar',
    gameTitle: 'The Sun House',
    gameBrief: 'Track the sun across the day and bank the heat. Then survive the night on what you stored.',
    gameHint: 'Catching heat is easy. The salt is what gets you to morning.',
    beats: [
      {
        head: 'The problem was never collection',
        body: 'Pointing something black at the sun and getting it hot is trivial. The reason solar heating went nowhere for a century is that the sun sets, and a tank of hot water goes cold by about 3 a.m. Storage was the wall everybody hit.'
      },
      {
        head: 'Heat hidden in a phase change',
        body: 'Telkes went after <b>Glauber\'s salt</b> — sodium sulfate decahydrate. It melts at around 32 °C, and melting <b>swallows an enormous amount of energy without the temperature rising</b>. Then, when it refreezes at night, it gives all of that back. Weight for weight it banks several times what water can. She was storing heat in a change of state rather than in a change of temperature.'
      },
      {
        head: 'The Dover Sun House',
        body: 'In <b>1948</b>, with architect <b>Eleanor Raymond</b> and funded by sculptor Amelia Peabody, she built a wedge-shaped house in Dover, Massachusetts with south-facing collectors and bins of Glauber\'s salt in the walls. No furnace. It carried its occupants through <b>New England winters</b>, and at one point ran eleven days of cloud on stored heat alone. It is the first house heated by stored solar energy.'
      },
      {
        head: 'The still that saved airmen',
        body: 'During the war she had been asked for something to keep downed pilots alive at sea, and designed a <b>solar still</b>: a transparent inflatable that evaporates seawater and condenses it as drinking water. It went into life rafts. It is credited with saving the lives of torpedoed sailors and downed airmen, and the same principle is still used in survival kits and in off-grid desalination.'
      },
      {
        head: 'The Sun Queen',
        body: 'Colleagues called her the <b>Sun Queen</b>, not entirely kindly — MIT\'s own solar committee pushed her off the project after Dover. She kept going for another forty years across ovens, dryers and storage materials, holding around <b>20 patents</b>. She died in 1995, aged 95, on her first visit back to Budapest in nearly seventy years.'
      }
    ],
    today: 'Phase-change materials are now in building panels, in the packs that keep vaccines cold in transit, in laptop and EV thermal management, and in the thermal stores that let solar plants run after dark. The whole modern argument about renewables — that the hard part is not generating the energy but <b>storing</b> it — is the argument she was already having in 1948, in a house with no furnace.',
    sources: [
      { t: 'Mária Telkes — Wikipedia', u: 'https://en.wikipedia.org/wiki/M%C3%A1ria_Telkes' },
      { t: 'Maria Telkes, "The Sun Queen" — MIT Museum / American Experience (PBS)', u: 'https://www.pbs.org/wgbh/americanexperience/films/sun-queen/' },
      { t: 'The Dover Sun House — Solar Energy history, NREL', u: 'https://www.nrel.gov/docs/fy05osti/35097.pdf' },
      { t: 'Mária Telkes — National Inventors Hall of Fame', u: 'https://www.invent.org/inductees/maria-telkes' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 15 ── */
  {
    id: 'vavilov',
    name: 'Nikolai Vavilov',
    life: '1887 — 1943',
    origin: 'Moscow',
    role: 'Botanist · Geneticist',
    ink: 'red',
    hook: 'He collected seeds to end famine. He died of starvation. His staff chose to do the same.',
    game: 'vault',
    gameTitle: 'The Vault',
    gameBrief: 'Leningrad, 1941. The siege has 872 days to run. Guard the boxes. There is food in them.',
    gameHint: 'There is an EAT button. That is the entire experiment.',
    beats: [
      {
        head: 'A hundred expeditions',
        body: 'Vavilov spent the 1920s and 30s on collecting trips across <b>five continents</b> — Iran, Afghanistan, Ethiopia, the Andes, China — hunting the wild ancestors and landraces of crops. He worked out that crop species have <b>centres of origin</b>, specific regions where their genetic variety is concentrated, and that those places are where you go when a disease is wiping out a harvest. By 1940 he had assembled the largest seed collection on Earth, in Leningrad.'
      },
      {
        head: 'The wrong theory to hold',
        body: 'Then <b>Trofim Lysenko</b> rose. Lysenko rejected genetics outright, promised Stalin miracle yields, and delivered famine. Vavilov, who kept insisting on Mendel and on evidence, became the loudest obstacle in the country. He was <b>arrested in 1940</b>, interrogated for months, and sentenced to death — commuted to twenty years.'
      },
      {
        head: 'January 1943',
        body: 'He died in a prison in <b>Saratov</b>, of starvation. The man who had spent his life building the world\'s insurance policy against famine <b>starved to death in a Soviet cell</b>. Lysenko\'s theories went on to govern Soviet and Chinese agriculture for another two decades, with a body count.'
      },
      {
        head: 'And the ones in the building',
        body: 'Meanwhile Leningrad was under siege for <b>872 days</b>. Inside the institute sat tonnes of rice, wheat, maize, peas and potatoes, and outside people were eating wallpaper paste. The staff barricaded themselves in, took shifts through the nights beating off rats with metal rods, and refused to eat the collection. <b>Nine of them starved to death</b> at their desks, surrounded by food, because the seeds were not theirs to eat.'
      },
      {
        head: 'Alexander Stchukin',
        body: 'The keeper of the groundnuts was found dead at his desk with a packet of almonds in his hand. The rice specialist, Dmitri Ivanov, died surrounded by several thousand packs of rice. They were not saving the seeds for themselves, or even for Russia. They were saving them for whoever came next.'
      }
    ],
    today: 'Every seed bank on the planet — including the <b>Svalbard Global Seed Vault</b> under the Arctic permafrost — is built on his method, and on the precedent that nine people set by dying next to a meal. When a fungus or a drought takes a staple crop, the resistant gene is found by going back to the wild relatives he mapped. That collection survived the siege. Most of it is still in St Petersburg, still being used.',
    sources: [
      { t: 'The Tragedy of the World\'s First Seed Bank — Science History Institute', u: 'https://www.sciencehistory.org/stories/magazine/the-tragedy-of-the-worlds-first-seed-bank/' },
      { t: 'The men who starved to death to save the world\'s seeds — Russia Beyond', u: 'https://www.rbth.com/blogs/2014/05/12/the_men_who_starved_to_death_to_save_the_worlds_seeds_35135' },
      { t: 'Nikolai Vavilov — Wikipedia', u: 'https://en.wikipedia.org/wiki/Nikolai_Vavilov' },
      { t: 'Vavilov Research Institute of Plant Industry — Atlas Obscura', u: 'https://www.atlasobscura.com/places/vavilov-research-institute-of-plant-industry' }
    ]
  }
];
