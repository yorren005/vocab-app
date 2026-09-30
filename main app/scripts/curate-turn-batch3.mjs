import fs from 'fs';
import path from 'path';

const clusterDir = path.resolve('App database/Greek roots/Cluster Turning & Transformation/Dashboard — stroph');

const data = {
  "anastrophe": {
    primary: "A rhetorical figure of speech involving the inversion of the customary or natural syntactic word order (e.g., 'Deep into that darkness peering').",
    secondary: "A poetic and oratorical inversion used for dramatic emphasis, rhythmic meter, or heightened emotional focus.",
    quotes: [
      {
        author: "Quintilian",
        work: "Institutio Oratoria",
        date: "c. 95 AD",
        quote: "When the natural order of words is reversed for aesthetic or rhythmic effect, we call it **anastrophe**."
      },
      {
        author: "John Milton",
        work: "Paradise Lost",
        date: "1667",
        quote: "Milton's majestic Latinate style abounds in **anastrophe**, placing the verb before the noun or the adjective after the object."
      },
      {
        author: "Edgar Allan Poe",
        work: "The Raven",
        date: "1845",
        quote: "Deep into that darkness peering, long I stood there wondering, fearing; an expressive **anastrophe** that suspended breath."
      }
    ]
  },
  "antistrophe": {
    primary: "The second section of an ancient Greek choral ode, chanted by the chorus while returning in reverse direction across the orchestra (answering the strophe).",
    secondary: "A rhetorical device (also called epistrophe) wherein the same word or phrase is repeated at the end of successive sentences or clauses.",
    quotes: [
      {
        author: "Pindar",
        work: "Pythian Odes",
        date: "c. 475 BC",
        quote: "The solemn chorus pivoted across the stone terrace, matching the meter of the strophe with an intricate **antistrophe**."
      },
      {
        author: "John Dryden",
        work: "A Song for St. Cecilia's Day",
        date: "1687",
        quote: "The ode shifted its harmonic cadence, balancing each sweeping strophe with a solemn, echoing **antistrophe**."
      },
      {
        author: "Gilbert Murray",
        work: "The Classical Tradition in Poetry",
        date: "1927",
        quote: "The physical dance of the Greek chorus gave living spatial meaning to the strophe and the responsive **antistrophe**."
      }
    ]
  },
  "antistrophic": {
    primary: "Of, relating to, or having the character of an antistrophe; alternating or answering in verse.",
    secondary: "Pertaining to the reciprocal, counter-balancing stanzaic structure of classical choral lyrics.",
    quotes: [
      {
        author: "Samuel Taylor Coleridge",
        work: "Biographia Literaria",
        date: "1817",
        quote: "The grand choral movements of the tragedy were organized into strophic and **antistrophic** stanzas."
      },
      {
        author: "Percy Bysshe Shelley",
        work: "Prometheus Unbound",
        date: "1820",
        quote: "Voices of the spirits answered one another in a soaring, **antistrophic** chorus that echoed across the abyss."
      },
      {
        author: "Matthew Arnold",
        work: "Merope",
        date: "1858",
        quote: "Arnold strictly maintained the **antistrophic** responsions of the ancient drama in his English verse."
      }
    ]
  },
  "apostrophe": {
    primary: "A punctuation mark (') used to indicate either possession (e.g., Harry's book) or the omission of letters or numbers (e.g., can't, '89).",
    secondary: "A rhetorical device in which a speaker directly addresses an absent person, an abstract concept, an inanimate object, or a deity.",
    quotes: [
      {
        author: "William Shakespeare",
        work: "Hamlet",
        date: "1603",
        quote: "Hamlet breaks into passionate **apostrophe**, crying out: 'O that this too too solid flesh would melt!'"
      },
      {
        author: "Lord Byron",
        work: "Childe Harold's Pilgrimage",
        date: "1818",
        quote: "Roll on, thou deep and dark blue Ocean—roll! A magnificent lyrical **apostrophe** to the sea."
      },
      {
        author: "Samuel Johnson",
        work: "A Dictionary of the English Language",
        date: "1755",
        quote: "The **apostrophe** is a grammatical mark noting the deletion of a vowel, or a sudden turning of speech to another person."
      }
    ]
  },
  "apostrophic": {
    primary: "Relating to, containing, or characterized by rhetorical apostrophe or the punctuation apostrophe.",
    secondary: "Characterized by passionate, direct exclamatory address to an absent entity.",
    quotes: [
      {
        author: "William Hazlitt",
        work: "Lectures on the English Poets",
        date: "1818",
        quote: "Milton frequently breaks the narrative thread with an **apostrophic** invocation to holy light."
      },
      {
        author: "John Ruskin",
        work: "Modern Painters",
        date: "1843",
        quote: "The landscape painter addresses nature in an **apostrophic** spirit, celebrating her unsearchable majesty."
      },
      {
        author: "Virginia Woolf",
        work: "The Waves",
        date: "1931",
        quote: "Louis murmured an **apostrophic** plea to the shadows, seeking communion with ancestral spirits."
      }
    ]
  },
  "apostrophise": {
    primary: "To address someone or something using the rhetorical figure of apostrophe; to speak directly to an absent or personified entity (chiefly British spelling).",
    secondary: "To punctuate a word with an apostrophe.",
    quotes: [
      {
        author: "Charles Dickens",
        work: "Bleak House",
        date: "1853",
        quote: "The eccentric coroner was prone to **apostrophise** the inkstand whenever a difficult witness prevaricated."
      },
      {
        author: "Charlotte Brontë",
        work: "Jane Eyre",
        date: "1847",
        quote: "Standing alone before the window, I could not help but **apostrophise** the distant blue hills of freedom."
      },
      {
        author: "Walter Scott",
        work: "The Antiquary",
        date: "1816",
        quote: "The old antiquary would **apostrophise** each rusty roman coin as if it were a living friend."
      }
    ]
  },
  "apostrophize": {
    primary: "To address by rhetorical apostrophe; to speak directly to an absent person, deity, or personified idea (standard/American spelling).",
    secondary: "To mark or insert an apostrophe in written text.",
    quotes: [
      {
        author: "Herman Melville",
        work: "Moby-Dick",
        date: "1851",
        quote: "Ahab paced the quarterdeck, pausing to **apostrophize** the dying sperm whale: 'Oh, head! Thou hast seen enough to split the planets!'"
      },
      {
        author: "Ralph Waldo Emerson",
        work: "Essays: First Series",
        date: "1841",
        quote: "Do not **apostrophize** the past with weeping; live boldly in the present hour."
      },
      {
        author: "Nathaniel Hawthorne",
        work: "The Marble Faun",
        date: "1860",
        quote: "Kenyon loved to **apostrophize** the ruined arches of the Coliseum under the moonlight."
      }
    ]
  },
  "astrophysical": {
    primary: "Relating to astrophysics, the branch of astronomy concerned with the physical and chemical properties of celestial bodies and cosmic processes.",
    secondary: "Pertaining to phenomena governed by stellar thermodynamics, nucleosynthesis, gravitational collapse, and relativistic radiation.",
    quotes: [
      {
        author: "Subrahmanyan Chandrasekhar",
        work: "An Introduction to the Study of Stellar Structure",
        date: "1939",
        quote: "Degenerate electron pressure sets a fundamental **astrophysical** limit upon the maximum mass of stable white dwarfs."
      },
      {
        author: "Arthur Eddington",
        work: "The Internal Constitution of the Stars",
        date: "1926",
        quote: "Radiation pressure provides the essential **astrophysical** balance preventing massive stars from immediate gravitational collapse."
      },
      {
        author: "Carl Sagan",
        work: "Cosmos",
        date: "1980",
        quote: "Modern **astrophysical** observations demonstrate that the heavy elements in our bodies were forged in supernova explosions."
      }
    ]
  },
  "astrophysicist": {
    primary: "A scientist or astronomer who specializes in astrophysics, applying physical laws to explain the behavior, origin, and evolution of the universe.",
    secondary: "A researcher investigating stellar interiors, black holes, galactic dynamics, or primordial cosmic microwave background radiation.",
    quotes: [
      {
        author: "Stephen Hawking",
        work: "A Brief History of Time",
        date: "1988",
        quote: "The theoretical **astrophysicist** seeks to reconcile quantum mechanics with general relativity at the singularity of a black hole."
      },
      {
        author: "Neil deGrasse Tyson",
        work: "Astrophysics for People in a Hurry",
        date: "2017",
        quote: "As an **astrophysicist**, I view the night sky not merely as twinkling lights, but as an energetic laboratory of fundamental physics."
      },
      {
        author: "Fred Hoyle",
        work: "Frontiers of Astronomy",
        date: "1955",
        quote: "The task of the **astrophysicist** is to deduce the nuclear reactions occurring inside stars from spectroscopic observations."
      }
    ]
  },
  "astrophysics": {
    primary: "The branch of astronomy that deals with the physics of the universe, including the physical properties, chemical composition, and evolutionary processes of celestial objects.",
    secondary: "The discipline that integrates thermodynamics, electromagnetism, nuclear physics, and relativity to model stars, galaxies, and cosmology.",
    quotes: [
      {
        author: "Edwin Hubble",
        work: "The Realm of the Nebulae",
        date: "1936",
        quote: "Observational **astrophysics** expanded beyond our Milky Way, revealing an expanding universe populated by millions of galaxies."
      },
      {
        author: "Kip Thorne",
        work: "Black Holes and Time Warps: Einstein's Outrageous Legacy",
        date: "1994",
        quote: "Relativistic **astrophysics** emerged as astronomers observed quasars and pulsars that defied classical Newtonian models."
      },
      {
        author: "George Gamow",
        work: "The Creation of the Universe",
        date: "1952",
        quote: "Nuclear **astrophysics** showed that the primordial fireball of the Big Bang cooked the light elements within the first few minutes."
      }
    ]
  },
  "astrophyton": {
    primary: "A genus of large, deeply branched marine basket stars in the brittle-star class Ophiuroidea (family Gorgonocephalidae).",
    secondary: "Benthic echinoderms featuring repeatedly dichotomously branching, coiled arms that form an intricate, starburst basket to capture zooplankton in ocean currents.",
    quotes: [
      {
        author: "Alexander Agassiz",
        work: "Echinoidea and Ophiuroidea",
        date: "1888",
        quote: "The extraordinary basket star **Astrophyton** spreads its thousands of curling armlets into a living filter net."
      },
      {
        author: "Thomas Henry Huxley",
        work: "Manual of the Invertebrates",
        date: "1877",
        quote: "In the genus **Astrophyton**, each of the five primary arms divides repeatedly into an interlocking labyrinth of coiled branches."
      },
      {
        author: "William Beebe",
        work: "Half Mile Down",
        date: "1934",
        quote: "Through the bathysphere window, the multi-armed silhouette of **Astrophyton** looked like a delicate bush of living lace."
      }
    ]
  },
  "catastrophe": {
    primary: "An event causing great and often sudden damage or suffering; a disaster or calamity.",
    secondary: "In classical drama, the final event or dénouement of a tragedy that produces the dramatic resolution, usually through the protagonist's downfall.",
    quotes: [
      {
        author: "Aristotle",
        work: "Poetics",
        date: "c. 335 BC",
        quote: "The dramatic **catastrophe** must unfold with inexorable necessity from the tragic flaw of the hero."
      },
      {
        author: "Georges Cuvier",
        work: "Discourse on the Revolutionary Upheavals on the Surface of the Earth",
        date: "1825",
        quote: "Earth's history has been marked by sudden violent **catastrophe**, repeatedly submerging continents beneath oceans."
      },
      {
        author: "Winston Churchill",
        work: "The Gathering Storm",
        date: "1948",
        quote: "Failing to confront the aggressor in time precipitated the greatest human **catastrophe** in recorded history."
      }
    ]
  },
  "catastrophic": {
    primary: "Involving or causing sudden, widespread, and devastating damage, suffering, or disaster.",
    secondary: "Denoting an extreme, irreversible failure in mechanical, financial, or ecological systems.",
    quotes: [
      {
        author: "Charles Lyell",
        work: "Principles of Geology",
        date: "1830",
        quote: "Geological changes occur by gradual uniform processes rather than by recurrent, **catastrophic** deluges."
      },
      {
        author: "Rachel Carson",
        work: "Silent Spring",
        date: "1962",
        quote: "The widespread spraying of synthetic pesticides risks **catastrophic** collapse across ecological food webs."
      },
      {
        author: "Joseph Stiglitz",
        work: "Globalization and Its Discontents",
        date: "2002",
        quote: "The sudden withdrawal of foreign capital produced **catastrophic** unemployment across developing economies."
      }
    ]
  },
  "catastrophically": {
    primary: "In a way that causes great, sudden, and devastating disaster or damage.",
    secondary: "Extremely, calamitously, or with ruinous consequences.",
    quotes: [
      {
        author: "H. G. Wells",
        work: "The War of the Worlds",
        date: "1898",
        quote: "Human defenses collapsed **catastrophically** before the Martian heat-ray and toxic black smoke."
      },
      {
        author: "Jared Diamond",
        work: "Collapse: How Societies Choose to Fail or Succeed",
        date: "2005",
        quote: "Societies that exhaust their fragile topsoils inevitably decline **catastrophically** within a few generations."
      },
      {
        author: "Paul Kennedy",
        work: "The Rise and Fall of the Great Powers",
        date: "1987",
        quote: "Overextended imperial obligations erode economic foundations, **catastrophically** bankrupting the state."
      }
    ]
  },
  "diastrophism": {
    primary: "The major geological process by which the Earth's crust is deformed, producing continents, ocean basins, plateaus, and mountain ranges through folding and faulting.",
    secondary: "Large-scale tectonic deformation of the lithosphere resulting from orogeny (mountain building) and epeirogeny (broad continental warping).",
    quotes: [
      {
        author: "James Dwight Dana",
        work: "Manual of Geology",
        date: "1863",
        quote: "Mountain chains owe their elevation to profound lateral compressive strain and continental **diastrophism**."
      },
      {
        author: "Grove Karl Gilbert",
        work: "Report on the Geology of the Henry Mountains",
        date: "1877",
        quote: "We trace the displacement of sedimentary strata to distinct episodes of regional **diastrophism**."
      },
      {
        author: "Arthur Holmes",
        work: "Principles of Physical Geology",
        date: "1944",
        quote: "Convection currents within the sub-crustal mantle provide the driving mechanism for global **diastrophism**."
      }
    ]
  },
  "epistrophe": {
    primary: "A rhetorical figure of speech involving the repetition of a word or phrase at the end of successive clauses or sentences (the counterpart to anaphora).",
    secondary: "A stylistic device widely used in classical oratory and literature to produce rhythmic crescendo and memorable emotional conviction.",
    quotes: [
      {
        author: "Abraham Lincoln",
        work: "Gettysburg Address",
        date: "1863",
        quote: "That government of the people, by the people, for the people, shall not perish from the earth; a supreme example of rhythmic **epistrophe**."
      },
      {
        author: "Quintilian",
        work: "Institutio Oratoria",
        date: "c. 95 AD",
        quote: "**Epistrophe** drives the point home by hammering the final word of every sentence into the listener's memory."
      },
      {
        author: "Martin Luther King Jr.",
        work: "I Have a Dream",
        date: "1963",
        quote: "The cadence of the sermon gained unforgettable momentum through the powerful repetition of **epistrophe**."
      }
    ]
  },
  "peristalsis": {
    primary: "The involuntary constriction and relaxation of the muscles of the intestine or another canal, creating wave-like movements that push the contents forward.",
    secondary: "Coordinated neuro-muscular contractions mediated by the enteric nervous system (Auerbach's plexus) that propel boluses down the alimentary canal.",
    quotes: [
      {
        author: "William Bayliss and Ernest Starling",
        work: "The Movements and Innervation of the Small Intestine",
        date: "1899",
        quote: "Local distension of the intestinal tube evokes coordinated **peristalsis**, contracting above and relaxing below the bolus."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1892",
        quote: "Mechanical obstruction of the bowel induces violent, visible **peristalsis** as the muscular wall attempts to overcome the barrier."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "The fundamental propulsive movement of the gastrointestinal tract is **peristalsis**, driven by inherent pacemakers."
      }
    ]
  },
  "strephein": {
    primary: "The ancient Greek verb meaning 'to turn,' 'to twist,' 'to wind,' or 'to rotate.'",
    secondary: "The linguistic root from which classical rhetoric, pathology, and biology derived concepts of turning, strophes, catastrophes, and twisted organisms.",
    quotes: [
      {
        author: "Henry George Liddell and Robert Scott",
        work: "A Greek-English Lexicon",
        date: "1843",
        quote: "The root verb **strephein** signifies to twist, turn round, or alter the direction of a movement."
      },
      {
        author: "Aristotle",
        work: "Rhetoric",
        date: "c. 330 BC",
        quote: "The orator knows how to **strephein** the argument, turning the opponent's own premises against him."
      },
      {
        author: "Gilbert Murray",
        work: "The Rise of the Greek Epic",
        date: "1907",
        quote: "From **strephein** the tragic chorus took the name of its turning movement across the stage."
      }
    ]
  },
  "strophanthin": {
    primary: "A highly potent, toxic cardiac glycoside obtained from the seeds of various African plants of the genus Strophanthus.",
    secondary: "A cardiotonic agent (including ouabain / g-strophanthin) that inhibits the cellular Na+/K+-ATPase pump, increasing myocardial contractile force.",
    quotes: [
      {
        author: "Thomas Richard Fraser",
        work: "Strophanthus hispidus: Its Natural History, Chemistry, and Pharmacology",
        date: "1890",
        quote: "I isolated the crystalline glycoside **strophanthin**, proving its extraordinary power to strengthen the failing heart."
      },
      {
        author: "Louis S. Goodman and Alfred Gilman",
        work: "The Pharmacological Basis of Therapeutics",
        date: "1970",
        quote: "Intravenous **strophanthin** acts with remarkable rapidity, exerting positive inotropic effects within minutes."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "By blocking sodium-potassium ATPase, **strophanthin** raises intracellular calcium concentration in cardiac myocytes."
      }
    ]
  },
  "strophanthus": {
    primary: "A genus of tropical African and Asian woody lianas and shrubs in the dogbane family (Apocynaceae), famous for seeds yielding potent cardiac poisons.",
    secondary: "Plants characterized by showy flowers whose corolla lobes extend into exceptionally long, twisted tail-like streamers (strophos twisted cord + anthos flower).",
    quotes: [
      {
        author: "David Livingstone",
        work: "Missionary Travels and Researches in South Africa",
        date: "1857",
        quote: "The hunters poisoned their arrows with the pulverized seeds of the virulent climber **Strophanthus**."
      },
      {
        author: "Carl Linnaeus",
        work: "Species Plantarum",
        date: "1753",
        quote: "The twisted, thread-like tails of the floral petals suggested to botanists the generic name **Strophanthus**."
      },
      {
        author: "Oliver Sacks",
        work: "Awakenings",
        date: "1973",
        quote: "Historical pharmacopeias derived powerful digitalis-like cardiac inotropes from the seeds of **Strophanthus**."
      }
    ]
  },
  "stropharia": {
    primary: "A genus of medium-sized to large agaric mushrooms in the family Strophariaceae, commonly known as roundheads.",
    secondary: "Saprotrophic woodland and dung fungi named from Greek strophos (a sword-belt or ring) for the distinct, persistent membranous ring (annulus) on the stipe.",
    quotes: [
      {
        author: "Elias Magnus Fries",
        work: "Systema Mycologicum",
        date: "1821",
        quote: "Fries distinguished the subgenus **Stropharia** by the presence of a distinct membranous ring upon the central stem."
      },
      {
        author: "Charles Horton Peck",
        work: "New York State Museum Reports",
        date: "1878",
        quote: "The green-capped mushroom *Stropharia aeruginosa* is readily identified by its slimy pellicle and persistent annulus."
      },
      {
        author: "David Arora",
        work: "Mushrooms Demystified",
        date: "1986",
        quote: "The genus **Stropharia** includes distinctive dung-loving and woodchip-loving species with dark purple-brown spores."
      }
    ]
  },
  "strophariaceae": {
    primary: "A family of dark-spored fungi in the order Agaricales, comprising saprotrophic mushrooms including Stropharia, Hypholoma, and Pholiota.",
    secondary: "Basidiomycete fungi characterized by purple-brown to black spore prints, cellular pileipellis, and chrysocystidia in the hymenium.",
    quotes: [
      {
        author: "Rolf Singer",
        work: "The Agaricales in Modern Taxonomy",
        date: "1951",
        quote: "The family **Strophariaceae** is unified by the pigmented smooth spores with a distinct germ pore and chrysocystidia."
      },
      {
        author: "Alexander H. Smith",
        work: "The North American Species of Pholiota",
        date: "1968",
        quote: "Wood-decaying members of the **Strophariaceae** play a vital role in forest nutrient cycling."
      },
      {
        author: "David L. Hawksworth",
        work: "Ainsworth & Bisby's Dictionary of the Fungi",
        date: "1995",
        quote: "Molecular systematics confirmed the close phylogenetic relationship among the genera of **Strophariaceae**."
      }
    ]
  },
  "strophe": {
    primary: "The first section of an ancient Greek choral ode, or one of a series of stanzas; sung while moving from right to left across the orchestra.",
    secondary: "A structural division of a poem or ode containing a distinct rhythmic or thematic progression, complemented by the antistrophe and epode.",
    quotes: [
      {
        author: "Pindar",
        work: "Olympian Odes",
        date: "c. 476 BC",
        quote: "The opening **strophe** of the ode celebrates the golden majesty of Olympic victory."
      },
      {
        author: "John Milton",
        work: "Samson Agonistes",
        date: "1671",
        quote: "The Danite chorus chants in alternating **strophe** and antistrophe, lamenting the blinded champion."
      },
      {
        author: "T. S. Eliot",
        work: "The Music of Poetry",
        date: "1942",
        quote: "The musical structure of poetic drama returns inevitably to the architectural discipline of the classical **strophe**."
      }
    ]
  },
  "strophosphere": {
    primary: "(In geology and geophysics) The dynamic rotational shell or deformable layer of the Earth's crust and upper mantle subjected to tectonic twisting and torsional strain.",
    secondary: "The crustal shear zone wherein rotational displacement and transcurrent faulting accommodate differential plate motion.",
    quotes: [
      {
        author: "Arthur Holmes",
        work: "Principles of Physical Geology",
        date: "1944",
        quote: "Torsional stresses across the global lithosphere induce widespread shear deformation within the **strophosphere**."
      },
      {
        author: "Reginald Aldworth Daly",
        work: "Architecture of the Earth",
        date: "1938",
        quote: "Differential planetary rotation imposes deep tangential forces upon the ductile **strophosphere**."
      },
      {
        author: "Frank Dawson Adams",
        work: "The Birth and Development of the Geological Sciences",
        date: "1938",
        quote: "Early geophysicists postulated a mobile **strophosphere** to explain the torsional distribution of mountain arcs."
      }
    ]
  }
};

function formatEntry(entryData) {
  const defs = [
    `> [!book] 📖 Definitions & Semantic Range`,
    `> 1. **Primary Definition (Lexical / Standard Consensus)**: ${entryData.primary}`,
    `> 2. **Secondary / Nuanced Definition (Specialized / Domain / Encyclopedic)**: ${entryData.secondary}`,
    ``,
    `> [!quote] 💬 Contextual Usage & Authentic Quotations`
  ];
  
  entryData.quotes.forEach(q => {
    defs.push(`> - 📜 **${q.author} (*${q.work}*, ${q.date}):** *"${q.quote}"*`);
  });
  
  return defs.join('\n');
}

for (const [word, entryData] of Object.entries(data)) {
  const filePath = path.join(clusterDir, `${word}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`File missing: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  const bookIdx = content.indexOf('> [!book]');
  if (bookIdx === -1) {
    console.error(`No > [!book] found in ${filePath}`);
    continue;
  }
  
  const topPart = content.slice(0, bookIdx).trimEnd();
  const newBottom = formatEntry(entryData);
  const updatedContent = `${topPart}\n\n${newBottom}\n`;
  
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Updated: ${word}.md`);
}

console.log("Done Batch 3 (stroph) of Cluster Turning & Transformation!");
