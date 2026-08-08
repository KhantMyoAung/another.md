/**
 * Quest trees, stats and artifacts for Wing II (06-15).
 *
 * Kept separate from lab-data.js so the experiment/story material and the
 * quest-tree material stay reviewable independently. roster.js merges them.
 *
 * Same rule as Wing I: every node is a documented contribution with a date,
 * and the sources on each scientist's screen are what it was written from.
 */

export const LAB_QUESTS = {

  /* ─────────────────────────────────────────────────────────────── 06 ── */
  chatelet: {
    stats: { insight: 94, rigor: 88, imagination: 86, craft: 62, teaching: 84, legacy: 82 },
    statNote:
      'Craft is low because her instrument was other people\'s apparatus — she read \'s Gravesande\'s experiment better than he did. Teaching is high: the Institutions was written to explain physics to her thirteen-year-old son, and became how France learned Newton.',
    quote: {
      text: 'Judge me for my own merits, or lack of them, but do not look upon me as a mere appendage to this great general or that great scholar.',
      source: 'Letter to Frederick the Great of Prussia'
    },
    quests: [
      {
        id: 'ec-learn', tier: 0, kind: 'method', title: 'Buying the Mathematics', year: '1733 →',
        summary: 'Taught by Maupertuis and Clairaut, at her own expense, at 27.',
        detail:
          'Women were barred from the Académie and from the Collège. Du Châtelet simply hired the best mathematicians in France as private tutors — Pierre-Louis Maupertuis, then Alexis Clairaut — and worked through the calculus with them. She was 27, married, and a mother. It is worth stating plainly that every result below came from a self-assembled education.',
        impact: 3, requires: []
      },
      {
        id: 'ec-fire', tier: 1, kind: 'artifact', title: 'Dissertation on the Nature of Fire', year: '1737',
        summary: 'Entered the Académie prize anonymously, against Voltaire, and got into print.',
        detail:
          'Working secretly at night — Voltaire was entering the same competition and she disagreed with his approach — she submitted an essay arguing that fire has no measurable mass, and that different colours of light carry different heating power. Neither won; the Académie was impressed enough to publish both. The second idea points directly at what Herschel would find in 1800 and name infrared.',
        impact: 3, requires: ['ec-learn']
      },
      {
        id: 'ec-inst', tier: 2, kind: 'artifact', title: 'Institutions de Physique', year: '1740',
        summary: 'Written for her son. It became how France read Newton.',
        detail:
          'Presented as a physics textbook for a thirteen-year-old, the Institutions is really an attempt to reconcile three warring systems — Newton\'s mechanics, Leibniz\'s metaphysics and Descartes\' inheritance — into one coherent account. It made her a serious figure across Europe and dragged her straight into the argument that follows.',
        impact: 4, requires: ['ec-learn']
      },
      {
        id: 'ec-visviva', tier: 3, kind: 'trial', title: 'The Vis Viva Dispute', year: '1740 — 1743',
        summary: 'Half of Europe said a moving body\'s force was mv. She backed mv².',
        detail:
          'The quarrel had run for fifty years and had hardened into national camps, with the French Cartesians and Newtonians on one side and the Leibnizians on the other. Du Châtelet took the unfashionable side in print and was attacked for it by Dortous de Mairan, the Académie\'s permanent secretary. Her reply is generally reckoned to have won the exchange on the argument.',
        impact: 4, requires: ['ec-inst']
      },
      {
        id: 'ec-clay', tier: 3, kind: 'discovery', title: 'The Clay Settles It', year: 'c. 1741',
        summary: '\'s Gravesande\'s brass balls: double the speed, four times the dent.',
        detail:
          'The decisive evidence was already sitting in a Dutch lecture hall. Willem \'s Gravesande had dropped brass balls into soft clay and found the depth scaled with the square of the speed, not the speed. Du Châtelet brought that experiment together with the Leibnizian formalism and argued the case: the conserved quantity goes as mv². It is not yet "energy" in the modern sense, but the v² is the part that survived.',
        impact: 5, requires: ['ec-visviva']
      },
      {
        id: 'ec-principia', tier: 4, kind: 'legacy', title: 'Principes Mathématiques', year: '1749 / 1756 / 1759',
        summary: 'Newton in French, with commentary. Still the standard translation.',
        detail:
          'Her last work was a complete French translation of Newton\'s <em>Principia</em> with an analytical commentary that recast Newton\'s geometry in the calculus that had grown up since. She finished it in 1749 while pregnant at 42 and convinced she would not survive; she died six days after the birth. It appeared in full in 1759 and has never been replaced — a French reader today still reaches for du Châtelet.',
        impact: 5, requires: ['ec-clay', 'ec-fire']
      }
    ],
    artifacts: [
      { name: 'Institutions de Physique', year: '1740', what: 'A physics textbook for her son that became a European event.' },
      { name: 'Dissertation sur la nature et la propagation du feu', year: '1739', what: 'Published by the Académie after losing its own prize.' },
      { name: 'Principes mathématiques de la philosophie naturelle', year: '1759', what: 'Newton in French. Still standard, 270 years on.' },
      { name: 'Cirey', year: '1734–49', what: 'The house she turned into a laboratory and salon, with Voltaire in residence.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 07 ── */
  lamarr: {
    stats: { insight: 88, rigor: 58, imagination: 96, craft: 64, teaching: 30, legacy: 74 },
    statNote:
      'Rigor and craft are the honest numbers: the patent was a concept, and the player-piano mechanism that synchronised it was never going to survive a torpedo. Imagination is the point. She saw the answer twenty years early and from completely outside the field.',
    quote: {
      text: 'Any girl can be glamorous. All you have to do is stand still and look stupid.',
      source: 'Hedy Lamarr'
    },
    quests: [
      {
        id: 'hl-table', tier: 0, kind: 'method', title: 'Listening at the Table', year: '1933 — 1937',
        summary: 'Married to an arms manufacturer. Sat through the weapons talk. Remembered it.',
        detail:
          'Friedrich Mandl sold munitions to Mussolini and kept his wife at the dinners where guidance and control were discussed, on the assumption she was decorative. She was not trained in engineering, but she was in the room for years while people argued about why radio-controlled weapons kept failing. That is where the problem statement came from.',
        impact: 2, requires: []
      },
      {
        id: 'hl-escape', tier: 1, kind: 'trial', title: 'Out of Austria', year: '1937',
        summary: 'Left the marriage, reached London, signed with MGM.',
        detail:
          'She got out of a controlling marriage and out of a Europe that was about to be very dangerous for a woman of Jewish descent, reached London, met Louis B. Mayer, and arrived in Hollywood as Hedy Lamarr. Within a year <em>Algiers</em> made her a star. The invention work happened at night, on a drafting table she kept in her house, for the whole of that career.',
        impact: 2, requires: ['hl-table']
      },
      {
        id: 'hl-hop', tier: 2, kind: 'discovery', title: 'Frequency Hopping', year: '1940 — 1941',
        summary: 'With George Antheil: stop sitting on one frequency.',
        detail:
          'The insight is that a jammer has to find you before it can drown you, so the fix is to keep moving in a pattern only the receiver knows. Antheil — who had written a piece for sixteen synchronised player pianos — supplied the synchronisation: a punched paper roll at each end, 88 positions, one per piano key. They developed it with the National Inventors Council in mind, as a contribution to the war.',
        impact: 5, requires: ['hl-escape']
      },
      {
        id: 'hl-patent', tier: 3, kind: 'artifact', title: 'US Patent 2,292,387', year: '11 Aug 1942',
        summary: '"Secret Communication System", granted and then ignored.',
        detail:
          'The Navy took the patent and did nothing with it; the mechanism was bulky and the institution was not inclined to take an actress\'s engineering seriously. It was never deployed in the war. <b>Claim 7 — the claim that would have covered frequency hopping in general — was rejected for prior art</b>, which is the detail most retellings leave out and the reason the "she invented Wi-Fi" line does not hold.',
        impact: 4, requires: ['hl-hop']
      },
      {
        id: 'hl-bonds', tier: 3, kind: 'trial', title: 'Selling War Bonds Instead', year: '1942',
        summary: 'Told to be more use as a face than as an engineer.',
        detail:
          'Having been waved away from the technical contribution she wanted to make, she was pointed at war-bond drives instead, where by contemporary accounts she raised enormous sums in a single evening of appearances. It is the cleanest illustration of the whole problem: the establishment had decided in advance which of her faculties was worth using.',
        impact: 2, requires: ['hl-patent']
      },
      {
        id: 'hl-legacy', tier: 4, kind: 'legacy', title: 'Fifty-Five Years Later', year: '1997 — 2014',
        summary: 'EFF Pioneer Award at 82. Inventors Hall of Fame, posthumously.',
        detail:
          'Hop-based spread spectrum did reach the fleet after the war — sonobuoys, and frequency-hopping torpedo control on US ships by the Cuban Missile Crisis — but the patent had expired and she never earned a cent from it. The Electronic Frontier Foundation gave her a Pioneer Award in 1997, three years before her death. The National Inventors Hall of Fame inducted her in 2014.',
        impact: 3, requires: ['hl-bonds']
      }
    ],
    artifacts: [
      { name: 'US Patent 2,292,387', year: '1942', what: 'Secret Communication System. Filed with George Antheil.' },
      { name: 'The player-piano roll', year: '1941', what: 'The synchroniser: 88 frequencies, one per key.' },
      { name: 'Algiers', year: '1938', what: 'The film that made her the most famous face at MGM — and the reason nobody listened.' },
      { name: 'The drafting table', year: '1930s–40s', what: 'Kept at home through her entire film career.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 08 ── */
  kwolek: {
    stats: { insight: 92, rigor: 90, imagination: 78, craft: 95, teaching: 60, legacy: 90 },
    statNote:
      'Craft is the headline. She could make polymers nobody else could get into solution, and — crucially — she could tell the difference between a spoiled batch and an interesting one, which is a skill and not luck.',
    quote: {
      text: 'All sorts of things can happen when you\'re open to new ideas and playing around with things.',
      source: 'Stephanie Kwolek'
    },
    quests: [
      {
        id: 'sk-job', tier: 0, kind: 'method', title: 'A Job to Pay for Medical School', year: '1946',
        summary: 'Took a temporary chemistry post at DuPont. Stayed forty years.',
        detail:
          'She graduated into a job market that had briefly opened to women because the men were at war, took a research post at DuPont\'s Buffalo laboratory intending to save up for medical school, and found the work more interesting than the plan. She never left, and never went to medical school.',
        impact: 2, requires: []
      },
      {
        id: 'sk-lowtemp', tier: 1, kind: 'method', title: 'Low-Temperature Polycondensation', year: '1950s',
        summary: 'Making polymers without melting them first.',
        detail:
          'Conventional polymer synthesis melts the ingredients, which rules out anything that decomposes before it melts — precisely the rigid, high-melting molecules that would make the strongest fibres. Kwolek became expert in solution-based routes that work at low temperature. Everything after this depends on it; without the technique, the aramid never gets made at all.',
        impact: 4, requires: ['sk-job']
      },
      {
        id: 'sk-cloudy', tier: 2, kind: 'discovery', title: 'The Cloudy Batch', year: '1965',
        summary: 'Thin, opalescent, low viscosity. It looked like a failure.',
        detail:
          'A good polymer solution is clear and syrupy. Hers came out cloudy and watery, which every handbook and every instinct reads as undissolved junk. Standard practice was to pour it away. She kept it, because she wanted to know <em>why</em> it looked wrong rather than assuming she had fumbled it.',
        impact: 5, requires: ['sk-lowtemp']
      },
      {
        id: 'sk-spin', tier: 3, kind: 'trial', title: 'Arguing with the Spinneret', year: '1965',
        summary: 'Charles Smullen refused for days. She kept asking.',
        detail:
          'The man who ran the spinning equipment would not put a cloudy solution through it, on the entirely reasonable grounds that particles clog and destroy the spinneret head. He held out; she kept asking; he eventually ran it to end the argument. The fibre came out at least nine times stiffer than anything she had made — and she made them repeat the whole thing, assuming she had made an error.',
        impact: 5, requires: ['sk-cloudy']
      },
      {
        id: 'sk-lc', tier: 3, kind: 'discovery', title: 'Liquid Crystalline Solution', year: '1965 — 1971',
        summary: 'The cloudiness was the fibre, pre-assembled.',
        detail:
          'The molecules were rigid rods that had spontaneously queued into parallel domains while still in the flask — a liquid crystal. That is why the solution scattered light and looked cloudy, and why the spun fibre was so strong: the chains were already aligned before they were drawn. This is now a whole class of materials, and Kwolek\'s batch is where the class starts.',
        impact: 5, requires: ['sk-spin']
      },
      {
        id: 'sk-kevlar', tier: 4, kind: 'legacy', title: 'Kevlar', year: '1971 →',
        summary: 'Body armour, helmets, brake pads, fibre-optic jackets, hulls, gloves.',
        detail:
          'DuPont brought it to market in 1971. Weight for weight it is several times stronger than steel. The armour application alone is credited with saving thousands of police and military lives, and it turns up anywhere something must be light and refuse to tear. Kwolek took the National Medal of Technology in 1996 and the Perkin Medal in 1997 — the first woman to receive it.',
        impact: 5, requires: ['sk-lc']
      }
    ],
    artifacts: [
      { name: 'The cloudy batch', year: '1965', what: 'Thin, opalescent, low viscosity — and correct.' },
      { name: 'US Patent 3,819,587', year: '1974', what: 'Wholly aromatic carbocyclic polycarbonamide fibre. One of her seventeen.' },
      { name: 'Kevlar', year: '1971', what: 'The commercial fibre. Still made by essentially her route.' },
      { name: 'Perkin Medal', year: '1997', what: 'The first woman to receive American industrial chemistry\'s highest honour.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 09 ── */
  snow: {
    stats: { insight: 96, rigor: 94, imagination: 80, craft: 78, teaching: 52, legacy: 96 },
    statNote:
      'Teaching is low because he lost the argument in his lifetime — the profession rejected the waterborne theory and the pump handle went back on. Legacy is near the ceiling because the method he invented now governs every outbreak response on Earth.',
    quote: {
      text: 'I found that nearly all the deaths had taken place within a short distance of the pump.',
      source: 'On the Mode of Communication of Cholera, second edition, 1855'
    },
    quests: [
      {
        id: 'js-anaes', tier: 0, kind: 'method', title: 'Making Anaesthesia a Science', year: '1847 — 1858',
        summary: 'Measured the dose instead of guessing it. Then gave chloroform to the Queen.',
        detail:
          'Before Snow, anaesthesia was administered by eye and killed people regularly. He studied the vapour pressures, built a calibrated inhaler, and worked out dosage as a quantitative problem. Attending Queen Victoria at the birth of Prince Leopold in 1853 made the practice respectable overnight. The habit of mind — measure it, do not estimate it — is what he then turned on cholera.',
        impact: 4, requires: []
      },
      {
        id: 'js-1849', tier: 1, kind: 'artifact', title: 'On the Mode of Communication of Cholera', year: '1849',
        summary: 'First edition. The disease is swallowed, not inhaled.',
        detail:
          'Five years before Broad Street, Snow published the argument in outline: cholera attacks the gut rather than the lungs, so whatever causes it is most likely swallowed; it travels with something in the water. It was reasoning from the symptoms against the entire weight of miasma theory, and it was largely ignored.',
        impact: 4, requires: ['js-anaes']
      },
      {
        id: 'js-grand', tier: 2, kind: 'trial', title: 'The Grand Experiment', year: '1854',
        summary: 'Two water companies, 300,000 people, one accidental controlled trial.',
        detail:
          'This is the work epidemiologists rate above the pump. In South London two companies supplied intermingled houses on the same streets: Lambeth had moved its intake upstream of the sewage, Southwark & Vauxhall had not. Snow realised the population had been divided as if by lot, went door to door establishing which company served each house, and found cholera deaths several times higher among Southwark & Vauxhall customers. It is a natural experiment, and it is the stronger proof.',
        impact: 5, requires: ['js-1849']
      },
      {
        id: 'js-broad', tier: 3, kind: 'discovery', title: 'Broad Street', year: 'Aug — Sep 1854',
        summary: '616 dead. The bars stack around one pump.',
        detail:
          'When cholera erupted in Soho, Snow walked the district and plotted every death on a map. The clusters pointed at the Broad Street pump; the gaps proved it — the workhouse with its own well was barely touched, the brewery whose men drank beer lost nobody, and a widow in Hampstead who had the water carted to her died anyway. He got the parish to remove the handle on 7–8 September.',
        impact: 5, requires: ['js-grand']
      },
      {
        id: 'js-white', tier: 3, kind: 'trial', title: 'The Curate Who Tried to Disprove Him', year: '1854 — 1855',
        summary: 'Henry Whitehead set out to refute Snow and found the index case.',
        detail:
          'The Reverend Henry Whitehead knew the neighbourhood far better than Snow did and expected to demolish the theory. Working through the records he instead identified the first case: an infant at 40 Broad Street whose nappy water had been emptied into a cesspit leaking a few feet from the well. Whitehead became Snow\'s most effective advocate, and the collaboration is the part of the story that most deserves retelling.',
        impact: 4, requires: ['js-broad']
      },
      {
        id: 'js-legacy', tier: 4, kind: 'legacy', title: 'Rejected, Then Universal', year: '1858 →',
        summary: 'He died a minority of one. The method now runs global public health.',
        detail:
          'The Board of Health formally dismissed his theory, the handle went back on, and Snow died of a stroke in 1858 at 45, before germ theory vindicated him. What survived is not a fact but a procedure: map the cases, find the common exposure, look hardest at the people who did <em>not</em> get sick. Chlorinated supply, sewer separation, case clusters and contact tracing all descend from it.',
        impact: 5, requires: ['js-white']
      }
    ],
    artifacts: [
      { name: 'On the Mode of Communication of Cholera', year: '1849 / 1855', what: 'The second edition carries the map and the South London study.' },
      { name: 'The Broad Street map', year: '1854', what: 'Deaths as black bars outside the houses. The founding document of disease mapping.' },
      { name: 'Snow\'s chloroform inhaler', year: '1847', what: 'Anaesthesia by measurement rather than by eye.' },
      { name: 'The pump handle', year: '1854', what: 'Removed 7–8 September. Replaced once the panic passed.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 10 ── */
  tu: {
    stats: { insight: 90, rigor: 93, imagination: 80, craft: 96, teaching: 58, legacy: 97 },
    statNote:
      'Legacy is at the ceiling for a straightforward reason: the number of people alive because of artemisinin runs into the millions. Teaching is low because the work was classified and published anonymously for years.',
    quote: {
      text: 'Every scientist dreams of doing something that can help the world.',
      source: 'Tu Youyou'
    },
    quests: [
      {
        id: 'ty-train', tier: 0, kind: 'method', title: 'Both Pharmacopoeias', year: '1951 — 1962',
        summary: 'Modern pharmacology at Peking, then two and a half years of classical Chinese medicine.',
        detail:
          'She trained first as a pharmacologist in the Western tradition, then was sent for a full course in traditional Chinese medicine. That double training is the whole reason she found artemisinin: she could read a fourth-century prescription as a chemist, and treat a classical text as a source of testable hypotheses rather than as folklore.',
        impact: 4, requires: []
      },
      {
        id: 'ty-523', tier: 1, kind: 'trial', title: 'Project 523', year: '1969',
        summary: 'A secret military programme. Chloroquine had stopped working.',
        detail:
          'Malaria was killing more soldiers in Vietnam than combat was, and the parasite had learned to shrug off chloroquine. Tu, 39, was made head of the traditional-medicine arm of a classified programme named for its start date. The Cultural Revolution had closed the universities; she sent her four-year-old daughter to relatives and did not live with her for years.',
        impact: 3, requires: ['ty-train']
      },
      {
        id: 'ty-screen', tier: 2, kind: 'method', title: '2,000 Recipes, 380 Extracts', year: '1969 — 1971',
        summary: 'Systematic screening of the classical pharmacopoeia.',
        detail:
          'Her team combed the historical literature and assembled some 2,000 candidate preparations, narrowing to around 380 extracts tested against malaria in mice. Sweet wormwood — <em>qinghao</em>, <em>Artemisia annua</em> — showed activity and then lost it. The inconsistency was maddening, and it was the actual clue.',
        impact: 4, requires: ['ty-523']
      },
      {
        id: 'ty-gehong', tier: 3, kind: 'discovery', title: 'One Sentence from c. 340 AD', year: '1971',
        summary: 'Ge Hong wrote "soak" and "wring". Not "boil".',
        detail:
          'Going back to the oldest source, Ge Hong\'s <em>Handbook of Prescriptions for Emergencies</em>, she found the instruction was to steep a handful in cold water and wring out the juice. Every other preparation in the tradition — and every one her team had run — was decocted, that is, boiled. The heat was destroying the active compound. Reading the method rather than the ingredient is the discovery.',
        impact: 5, requires: ['ty-screen']
      },
      {
        id: 'ty-191', tier: 3, kind: 'discovery', title: 'Sample 191', year: 'October 1971',
        summary: 'Ethyl ether, low temperature. 100% inhibition in mice.',
        detail:
          'Switching to ethyl ether, which boils at 35 °C and so extracts without cooking, the 191st preparation gave complete inhibition of the parasite in infected mice and then in monkeys. With no framework for approving a human trial in the middle of the Cultural Revolution, Tu and two colleagues took the extract themselves to establish it was safe before it went near a patient.',
        impact: 5, requires: ['ty-gehong']
      },
      {
        id: 'ty-dha', tier: 4, kind: 'discovery', title: 'Dihydroartemisinin', year: '1973',
        summary: 'She then made a derivative that worked better than the natural product.',
        detail:
          'Having isolated artemisinin, Tu reduced it to dihydroartemisinin — a modification that is more potent and more stable, and which underpins several of the combination therapies in use today. It is the step that turns a promising plant extract into a drug family.',
        impact: 4, requires: ['ty-191']
      },
      {
        id: 'ty-nobel', tier: 4, kind: 'legacy', title: 'Published by Nobody, Then a Nobel', year: '2011 — 2015',
        summary: 'Lasker at 81, Nobel at 84. No doctorate, no foreign training, no academy seat.',
        detail:
          'Project 523 was classified and the early papers carried no author names, so for decades almost nobody outside China knew who had done the work. The Lasker Award came in 2011 and the Nobel Prize in Physiology or Medicine in 2015 — the first Chinese Nobel in medicine, awarded to someone with none of the credentials the prize usually tracks. Artemisinin combination therapy is now the front-line malaria treatment worldwide.',
        impact: 5, requires: ['ty-dha']
      }
    ],
    artifacts: [
      { name: 'Handbook of Prescriptions for Emergencies', year: 'c. 340 AD', what: 'Ge Hong\'s text. The line that said soak, not boil.' },
      { name: 'Sample 191', year: 'Oct 1971', what: 'The cold ether extract. 100% inhibition in mice.' },
      { name: 'Dihydroartemisinin', year: '1973', what: 'The derivative that made it a drug family.' },
      { name: 'Artemisinin combination therapy', year: '2000s →', what: 'The world\'s front-line malaria treatment.' }
    ]
  }
,

  /* ─────────────────────────────────────────────────────────────── 11 ── */
  leavitt: {
    stats: { insight: 95, rigor: 92, imagination: 74, craft: 88, teaching: 44, legacy: 96 },
    statNote:
      'Teaching is low because she was never allowed to direct her own research, let alone students — Pickering assigned her to stellar photometry and kept her there. Legacy is at the ceiling: every distance in cosmology is calibrated on her line.',
    quote: {
      text: 'A straight line can readily be drawn among each of the two series of points corresponding to maxima and minima, thus showing that there is a simple relation between the brightness of the variables and their periods.',
      source: 'Periods of 25 Variable Stars in the Small Magellanic Cloud, 1912'
    },
    quests: [
      {
        id: 'hl2-comp', tier: 0, kind: 'trial', title: 'The Harvard Computers', year: '1893 →',
        summary: 'A room of women measuring glass plates at around thirty cents an hour.',
        detail:
          'Edward Pickering employed women to reduce photographic plates because they were cheaper than men and, by his own assessment, better at it. They were called computers because computing was the job. Leavitt — deaf since a college illness — joined as a volunteer, was later paid roughly thirty cents an hour, and was not permitted to operate a telescope.',
        impact: 2, requires: []
      },
      {
        id: 'hl2-vars', tier: 1, kind: 'craft', title: 'Twenty-Four Hundred Variables', year: '1904 — 1908',
        summary: 'She found about half of all the variable stars then known.',
        detail:
          'Working by blink comparison on plates of the Magellanic Clouds, Leavitt identified roughly 2,400 variable stars — approximately half of every variable known to astronomy at the time. Princeton\'s Charles Young called her the best variable-star hunter alive. It is grinding, exacting work, and it is the raw material for everything that follows.',
        impact: 4, requires: ['hl2-comp']
      },
      {
        id: 'hl2-shelf', tier: 2, kind: 'discovery', title: 'Same Shelf, Same Distance', year: 'c. 1908',
        summary: 'Everything in the cloud is equally far away, so brightness can be compared honestly.',
        detail:
          'The insight that makes the law possible: the stars of the Small Magellanic Cloud are all at essentially the same distance from us, so if one <em>looks</em> brighter than another it genuinely <b>is</b> brighter. Distance, the thing that ruins every other comparison in astronomy, cancels out. It is the one honest laboratory in the sky, and she recognised it.',
        impact: 5, requires: ['hl2-vars']
      },
      {
        id: 'hl2-law', tier: 3, kind: 'discovery', title: 'The Period–Luminosity Relation', year: '1912',
        summary: 'Periods of 25 Variable Stars in the Small Magellanic Cloud. The points fall on a line.',
        detail:
          'Plot each Cepheid\'s brightness against how long it takes to pulse and the points lie on a straight line: <b>the slower it blinks, the brighter it truly is.</b> Which means you can time a blink, read off the star\'s real output, compare that with how faint it looks from here, and get <b>its distance</b>. Astronomy had been stuck with parallax, good only for the neighbours. This is the first standard candle.',
        impact: 5, requires: ['hl2-shelf']
      },
      {
        id: 'hl2-nps', tier: 3, kind: 'artifact', title: 'The North Polar Sequence', year: '1913',
        summary: 'A photographic brightness standard spanning 17 magnitudes, adopted internationally.',
        detail:
          'Her other major work, and the one nobody mentions. Photographic plates record brightness inconsistently, so comparing observatories was close to impossible. Leavitt established a reference set of stars near the celestial pole with painstakingly calibrated magnitudes across a 17-magnitude range — about a factor of six million in brightness. It was adopted as the international standard and underpinned photometry for decades.',
        impact: 4, requires: ['hl2-vars']
      },
      {
        id: 'hl2-ladder', tier: 4, kind: 'legacy', title: 'The Ladder She Was Not There For', year: '1923 →',
        summary: 'Hubble used her method on Andromeda. She had died two years earlier.',
        detail:
          'Hertzsprung and Shapley calibrated the zero point; Hubble then found Cepheids in Andromeda in 1923 and proved it was a separate galaxy, and by 1929 that the universe is expanding. Leavitt died of cancer in 1921, aged 53. In 1925 Gösta Mittag-Leffler wrote to Harvard intending to nominate her for the Nobel Prize and had to be told she was four years dead; the prize is not awarded posthumously. Astronomers now call it the <b>Leavitt Law</b>.',
        impact: 5, requires: ['hl2-law', 'hl2-nps']
      }
    ],
    artifacts: [
      { name: 'Periods of 25 Variable Stars in the Small Magellanic Cloud', year: '1912', what: 'Three pages. The ruler for the universe.' },
      { name: 'The North Polar Sequence', year: '1913', what: 'The photographic magnitude standard, adopted internationally.' },
      { name: 'The Harvard plate stacks', year: '1885–1993', what: 'Half a million glass plates. Hers are still there, annotated in her hand.' },
      { name: 'Crater Leavitt', year: '1970', what: 'On the far side of the Moon. Named for a woman who was never allowed a telescope.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 12 ── */
  latimer: {
    stats: { insight: 84, rigor: 88, imagination: 80, craft: 94, teaching: 82, legacy: 88 },
    statNote:
      'Craft and teaching carry this one. He was the best draftsman in American electrical engineering, and he wrote the book that taught the industry how its own product worked.',
    quote: {
      text: 'We create our future by well improving present opportunities, however few and small they are.',
      source: 'Attributed to Lewis Howard Latimer'
    },
    quests: [
      {
        id: 'll-draft', tier: 0, kind: 'method', title: 'Learning to Draw by Watching', year: '1865 — 1872',
        summary: 'Office boy at a patent firm. Taught himself drafting. Became head draftsman.',
        detail:
          'Son of a man who had escaped slavery and been tried in Boston in 1842 to decide whether he was a person or property, Latimer lied about his age to join the Navy at fifteen and came back to an office-boy job at the patent solicitors Crosby & Gould. He bought second-hand drawing instruments, studied the draftsmen over their shoulders, asked for a chance, and was promoted to head draftsman.',
        impact: 3, requires: []
      },
      {
        id: 'll-bell', tier: 1, kind: 'artifact', title: 'The Drawings for the Telephone', year: '1876',
        summary: 'He drafted the patent application for Alexander Graham Bell.',
        detail:
          'Latimer prepared the drawings and helped draft the specification for Bell\'s telephone patent, reportedly working nights against a filing deadline Bell won by a matter of hours. It is the fact most often quoted about him and it is the least important thing here — being the draftsman on someone else\'s patent is not the same as inventing.',
        impact: 3, requires: ['ll-draft']
      },
      {
        id: 'll-carbon', tier: 2, kind: 'discovery', title: 'Process of Manufacturing Carbons', year: '17 Jan 1882',
        summary: 'US Patent 252,386. Bake the filament inside a cardboard envelope.',
        detail:
          'Edison\'s lamps worked but did not last: carbon filaments warped and cracked during carbonisation, so they burned out in dozens of hours and light stayed a rich man\'s novelty. Latimer\'s patent encloses the filament blanks in a <b>cardboard envelope</b> while they bake, holding their shape and stopping the distortion. Yield rises, breakage falls, and lamp life goes from dozens of hours to hundreds.',
        impact: 5, requires: ['ll-draft']
      },
      {
        id: 'll-myth', tier: 2, kind: 'trial', title: 'What He Did Not Invent', year: '—',
        summary: 'Not the light bulb. Not the carbon filament. Setting the record straight.',
        detail:
          'You will read that Latimer invented the carbon filament lamp. He did not — Edison and Swan had filament lamps before him, and the claim does him no favours, because it is easily refuted and it obscures the real achievement. What he invented was the <b>manufacturing process</b> that made those lamps durable and cheap enough to wire a city for. That is the contribution that changed how people live.',
        impact: 3, requires: ['ll-carbon']
      },
      {
        id: 'll-cities', tier: 3, kind: 'craft', title: 'Wiring the Cities', year: '1880s',
        summary: 'New York, Philadelphia, Montreal, London — installed and supervised.',
        detail:
          'Latimer did not stay at the bench. He supervised the installation of public electric lighting in New York and Philadelphia, in Montreal — where he learned enough French to direct the crews — and in London, where he set up an incandescent lamp department. He was building the demand his own patent had made affordable.',
        impact: 4, requires: ['ll-carbon']
      },
      {
        id: 'll-book', tier: 3, kind: 'artifact', title: 'Incandescent Electric Lighting', year: '1890',
        summary: 'The first proper textbook on the Edison system.',
        detail:
          'He wrote <em>Incandescent Electric Lighting: A Practical Description of the Edison System</em> — the first accessible engineering account of how the whole thing worked, from dynamo to lamp. An industry cannot scale without people who understand it, and this is the book that made those people.',
        impact: 4, requires: ['ll-cities']
      },
      {
        id: 'll-pioneers', tier: 4, kind: 'legacy', title: 'The Edison Pioneers', year: '1918 →',
        summary: 'Chief patent expert. The only Black member.',
        detail:
          'Latimer became Edison\'s patent expert and expert witness, defending the company\'s patents in court — work requiring him to understand every competitor\'s lamp as well as his own — and in 1918 was the only Black member admitted to the Edison Pioneers. He also patented an early evaporative air cooler and an improved railway-carriage water closet, and published a book of poems in 1925.',
        impact: 4, requires: ['ll-book', 'll-myth']
      }
    ],
    artifacts: [
      { name: 'US Patent 252,386', year: '1882', what: 'Process of Manufacturing Carbons. The cardboard envelope.' },
      { name: 'Incandescent Electric Lighting', year: '1890', what: 'The first practical textbook on the Edison system.' },
      { name: 'Bell telephone patent drawings', year: '1876', what: 'Drafted by Latimer, against the clock.' },
      { name: 'Poems of Love and Life', year: '1925', what: 'Printed by his friends for his seventy-fifth birthday.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 13 ── */
  drew: {
    stats: { insight: 90, rigor: 92, imagination: 82, craft: 93, teaching: 94, legacy: 95 },
    statNote:
      'Teaching is unusually high and it is deliberate: he chose to spend his last decade at Howard training Black surgeons who were being locked out of the profession, rather than continuing his own research.',
    quote: {
      text: 'There is no scientific basis for the separation of the bloods of different races except on the basis of the individual blood types or groups.',
      source: 'Charles R. Drew, on the US military\'s segregated-blood policy'
    },
    quests: [
      {
        id: 'cd-banked', tier: 0, kind: 'method', title: 'Banked Blood', year: '1940',
        summary: 'His Columbia doctorate — the first awarded to a Black American.',
        detail:
          'Whole blood spoils in about a week and must be matched to the recipient, which makes it close to useless in a war. Drew\'s doctoral thesis, <em>Banked Blood</em>, worked through the storage problem systematically and earned him the first Doctor of Medical Science awarded to a Black American. The thesis is the blueprint for everything that follows.',
        impact: 4, requires: []
      },
      {
        id: 'cd-plasma', tier: 1, kind: 'discovery', title: 'Ship the Plasma, Not the Blood', year: '1940',
        summary: 'Spin it, and the useful part keeps for far longer — and matches anyone.',
        detail:
          'Centrifuge blood and it separates: red cells below, straw-coloured <b>plasma</b> above. Plasma survives far longer than whole blood, can be dried to powder and reconstituted with water at the point of use, and — critically — <b>requires no type matching</b>. It is what you give someone in shock when there is no time to find out anything about them.',
        impact: 5, requires: ['cd-banked']
      },
      {
        id: 'cd-britain', tier: 2, kind: 'trial', title: 'Blood for Britain', year: '1940 — 1941',
        summary: 'Plasma across the Atlantic into the Blitz, at industrial scale.',
        detail:
          'Appointed medical supervisor, Drew had to solve problems nobody had faced: sterile collection from thousands of donors, uniform testing, contamination control, refrigerated transport across a submarine-infested ocean. He shipped plasma to Britain throughout the Blitz. In doing so he effectively invented the <b>blood bank as a system</b> rather than as an idea.',
        impact: 5, requires: ['cd-plasma']
      },
      {
        id: 'cd-redcross', tier: 3, kind: 'artifact', title: 'The Bloodmobile', year: '1941',
        summary: 'First director of the American Red Cross blood programme.',
        detail:
          'Running the pilot national programme, Drew introduced mass mobile collection — refrigerated trucks that went to the donors instead of waiting for donors to come to a hospital. The bloodmobile is his. Every blood drive that has ever parked outside an office or a church is running his design.',
        impact: 5, requires: ['cd-britain']
      },
      {
        id: 'cd-resign', tier: 3, kind: 'trial', title: 'The Order He Would Not Carry Out', year: '1941 — 1942',
        summary: 'Told to segregate the blood he had just spent two years collecting.',
        detail:
          'The US military directed that blood from Black donors be excluded, and later stored separately. Drew — the man who had built the entire supply — said publicly that there was no scientific basis for it whatsoever, because there is none: plasma is plasma. He resigned. The policy persisted in some form until <b>1950</b>.',
        impact: 4, requires: ['cd-redcross']
      },
      {
        id: 'cd-howard', tier: 4, kind: 'legacy', title: 'Howard, and the Myth', year: '1942 — 1950',
        summary: 'He spent his last years training surgeons. Then a story attached itself to his death.',
        detail:
          'Drew went to Howard University as head of surgery and put his effort into certifying Black surgeons who were being excluded from the profession — a deliberate trade of his own research career for other people\'s. He died in a car crash in North Carolina in 1950, aged 45. The persistent story that he bled to death after a whites-only hospital refused him is <b>not true</b>: he was treated at Alamance General and his injuries were unsurvivable. The real injustice needs no embellishment.',
        impact: 5, requires: ['cd-resign']
      }
    ],
    artifacts: [
      { name: 'Banked Blood', year: '1940', what: 'The Columbia thesis. The first medical doctorate awarded to a Black American.' },
      { name: 'Blood for Britain', year: '1940–41', what: 'Plasma across the Atlantic, and the blood bank invented as a system.' },
      { name: 'The bloodmobile', year: '1941', what: 'Refrigerated mobile collection. Still parked outside your office.' },
      { name: 'Howard University Department of Surgery', year: '1942–50', what: 'The surgeons he certified when nobody else would.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 14 ── */
  telkes: {
    stats: { insight: 91, rigor: 84, imagination: 93, craft: 90, teaching: 62, legacy: 86 },
    statNote:
      'Imagination is the number that matters: everyone was trying to collect sunlight better, and she went after the part nobody wanted — what happens after dark.',
    quote: {
      text: 'Sunlight will be used as a source of energy sooner or later anyway. Why wait?',
      source: 'Mária Telkes'
    },
    quests: [
      {
        id: 'mt-phys', tier: 0, kind: 'method', title: 'Budapest to Cleveland', year: '1920 — 1937',
        summary: 'PhD in physical chemistry at 24, then a laboratory in America.',
        detail:
          'Telkes took her doctorate in physical chemistry from the University of Budapest in 1924 and emigrated to the United States, working first on the energy of living cells at the Cleveland Clinic and then on thermoelectric devices at Westinghouse. The through-line is energy conversion: turning one form of energy into another, and then holding on to it.',
        impact: 3, requires: []
      },
      {
        id: 'mt-still', tier: 1, kind: 'artifact', title: 'The Solar Still', year: '1942 — 1945',
        summary: 'A transparent inflatable that turns seawater into drinking water.',
        detail:
          'Asked by the wartime Office of Scientific Research and Development for something to keep torpedoed sailors and downed airmen alive, Telkes designed a solar still: sunlight evaporates seawater inside a transparent envelope and the fresh condensate is collected. It went into life rafts and survival kits, it is credited with saving lives, and the same principle is still used in emergency kits and small-scale desalination.',
        impact: 4, requires: ['mt-phys']
      },
      {
        id: 'mt-salt', tier: 2, kind: 'discovery', title: 'Heat Hidden in a Change of State', year: 'late 1940s',
        summary: 'Glauber\'s salt melts at about 32 °C and swallows energy doing it.',
        detail:
          'Storage, not collection, is what had killed solar heating for a century — a tank of hot water is stone cold by 3 a.m. Telkes went after <b>sodium sulfate decahydrate</b>, which absorbs a very large amount of energy melting without its temperature rising, then releases all of it again when it refreezes. Weight for weight it banks several times what water can. She was storing heat in a <em>phase change</em> rather than a temperature change.',
        impact: 5, requires: ['mt-phys']
      },
      {
        id: 'mt-dover', tier: 3, kind: 'artifact', title: 'The Dover Sun House', year: '1948',
        summary: 'A house in Massachusetts with no furnace, through New England winters.',
        detail:
          'With architect <b>Eleanor Raymond</b> and funded by the sculptor Amelia Peabody, Telkes built a wedge-shaped house in Dover, Massachusetts: south-facing collectors, and bins of Glauber\'s salt in the walls. No furnace of any kind. It carried its occupants through New England winters and at one point ran <b>eleven consecutive days of cloud</b> on stored heat alone. It is the first house heated by stored solar energy.',
        impact: 5, requires: ['mt-salt']
      },
      {
        id: 'mt-pushed', tier: 3, kind: 'trial', title: 'Pushed Off the Project', year: '1953',
        summary: 'MIT\'s own solar committee removed her from the work after Dover.',
        detail:
          'The salt separated and lost capacity over repeated cycles, a real engineering problem that later materials solved. MIT\'s solar energy committee used it to move her off solar research entirely. Colleagues had taken to calling her the <b>Sun Queen</b>, and not always kindly. She went to New York University and kept going for another forty years.',
        impact: 2, requires: ['mt-dover']
      },
      {
        id: 'mt-legacy', tier: 4, kind: 'legacy', title: 'The Storage Argument, Won Late', year: '1980 →',
        summary: 'Phase-change materials in buildings, vaccine boxes, laptops, EVs and solar plants.',
        detail:
          'Telkes held around twenty patents and worked into her eighties on solar ovens, dryers and storage materials. Phase-change materials are now in building panels, in the cold chain that keeps vaccines viable in transit, in electronics and EV thermal management, and in the thermal stores that let solar plants generate after sunset. The modern argument that the hard part of renewables is <b>storage</b> is the argument she was already having in 1948.',
        impact: 5, requires: ['mt-pushed', 'mt-still']
      }
    ],
    artifacts: [
      { name: 'The Dover Sun House', year: '1948', what: 'With Eleanor Raymond. No furnace, and it worked.' },
      { name: 'The solar still', year: '1945', what: 'Life-raft desalination. Sunlight into drinking water.' },
      { name: 'Glauber\'s salt storage bins', year: '1948', what: 'Heat banked in a phase change, not a temperature.' },
      { name: 'The Telkes solar oven', year: '1950s', what: 'Designed for households without fuel. Still the basic pattern.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────────── 15 ── */
  vavilov: {
    stats: { insight: 96, rigor: 90, imagination: 88, craft: 86, teaching: 88, legacy: 94 },
    statNote:
      'These are the numbers of a man who built an institution, a theory and a global collection — and then watched an ideologue with none of it dismantle the lot. Legacy is high because the collection survived him.',
    quote: {
      text: 'We shall go to the pyre, we shall burn, but we shall not retreat from our convictions.',
      source: 'Nikolai Vavilov, to colleagues under Lysenko, 1939'
    },
    quests: [
      {
        id: 'nv-bateson', tier: 0, kind: 'method', title: 'Studying under Bateson', year: '1913 — 1914',
        summary: 'Learned Mendelian genetics in England, from the man who named it.',
        detail:
          'Vavilov spent a period in England working with William Bateson, who had coined the word genetics and was Mendel\'s foremost champion. He came home with the conviction that heredity is particulate and lawful — the belief that made his life\'s work possible and, thirty years later, got him killed.',
        impact: 3, requires: []
      },
      {
        id: 'nv-homolog', tier: 1, kind: 'discovery', title: 'The Law of Homologous Series', year: '1920',
        summary: 'Related species vary in parallel — so you can predict a variety before you find it.',
        detail:
          'Vavilov noticed that closely related species throw up the same kinds of variation: if wheat has an awnless form, barley probably does too. That turns crop hunting from beachcombing into a search with a hypothesis — you can predict which variant ought to exist and go looking for it in the right place. Announced at the 1920 All-Russian Congress, it made his reputation immediately.',
        impact: 4, requires: ['nv-bateson']
      },
      {
        id: 'nv-expeditions', tier: 2, kind: 'trial', title: 'A Hundred Expeditions', year: '1916 — 1940',
        summary: 'Iran, Afghanistan, Ethiopia, the Andes, China — collecting the wild ancestors.',
        detail:
          'Over two decades Vavilov mounted collecting expeditions across five continents, often into places with no roads and active hostility, gathering the landraces and wild relatives of the crops the world eats. He was a formidable field botanist and an extremely good traveller, and he understood that the material he was collecting was finite and disappearing as modern agriculture spread.',
        impact: 5, requires: ['nv-homolog']
      },
      {
        id: 'nv-centres', tier: 3, kind: 'discovery', title: 'Centres of Origin', year: '1926',
        summary: 'Crop diversity concentrates where the crop was first domesticated.',
        detail:
          'From the collections Vavilov drew the theory that each crop has a geographical <b>centre of origin</b> where its genetic variety is densest — and that those regions are therefore where you must go when a disease or a drought is destroying a harvest elsewhere. It is the intellectual basis of modern crop breeding and of every argument for conserving agricultural biodiversity.',
        impact: 5, requires: ['nv-expeditions']
      },
      {
        id: 'nv-bank', tier: 3, kind: 'artifact', title: 'The World\'s First Seed Bank', year: 'by 1940',
        summary: 'The largest collection of plant genetic material on Earth, in Leningrad.',
        detail:
          'The Institute of Plant Industry held on the order of a quarter of a million samples by 1940 — the biggest seed collection anywhere, assembled deliberately as an insurance policy against famine. Vavilov\'s explicit purpose was to end hunger by giving breeders the raw genetic material to work with. Every gene bank in the world is a copy of this idea.',
        impact: 5, requires: ['nv-centres']
      },
      {
        id: 'nv-lysenko', tier: 4, kind: 'trial', title: 'Lysenko', year: '1940 — 1943',
        summary: 'Arrested in 1940. Starved to death in a Saratov prison in January 1943.',
        detail:
          'Trofim Lysenko rejected genetics outright, promised Stalin miracle yields, and delivered famine. Vavilov, who kept insisting on evidence, became the regime\'s most prominent obstacle. He was arrested in 1940, interrogated for months, sentenced to death and commuted to twenty years. He died of starvation in a prison in <b>Saratov</b> in January 1943 — the man who had spent his life building the world\'s insurance against famine.',
        impact: 4, requires: ['nv-bank']
      },
      {
        id: 'nv-nine', tier: 4, kind: 'legacy', title: 'The Nine Who Would Not Eat', year: '1941 — 1944',
        summary: 'Under siege, surrounded by food, his staff starved rather than touch the collection.',
        detail:
          'Leningrad was besieged for <b>872 days</b>. Inside the institute sat tonnes of rice, wheat, maize, peas and potatoes; outside, people were eating wallpaper paste. The staff barricaded themselves in, took night shifts beating off rats with metal rods, and refused to eat the seeds. <b>Nine of them starved to death at their desks.</b> Alexander Stchukin, keeper of the groundnuts, was found dead holding a packet of them. The collection survived. Most of it is still in St Petersburg, still being used, and every seed vault since — Svalbard included — is built on the precedent.',
        impact: 5, requires: ['nv-lysenko']
      }
    ],
    artifacts: [
      { name: 'The Vavilov collection', year: 'by 1940', what: 'A quarter of a million samples. The first and largest seed bank.' },
      { name: 'Centres of Origin of Cultivated Plants', year: '1926', what: 'Where crop diversity lives, and why it matters.' },
      { name: 'The Law of Homologous Series', year: '1920', what: 'Predict the variety, then go and find it.' },
      { name: 'Svalbard Global Seed Vault', year: '2008', what: 'His idea, under Arctic permafrost, with the door locked.' }
    ]
  }
};
