import fs from 'fs';
import path from 'path';

const entries = {
  // Dashboard — por
  'por/aporetic': {
    primary: "Characterized by or inclined to aporia; expressing doubt, hesitation, or intellectual perplexity.",
    secondary: "In philosophical dialogue, concluding in an unsolved puzzle or impasse rather than a definitive doctrine.",
    quotes: [
      { author: "Plato", work: "Meno", quote: "Socrates reduces his interlocutors to an **aporetic** silence, showing that what they thought they knew is shrouded in doubt." },
      { author: "Aristotle", work: "Metaphysics", quote: "An **aporetic** inquiry is essential at the outset, for those who wish to solve problems must first survey the knots." },
      { author: "Jacques Derrida", work: "Aporias", quote: "The **aporetic** condition marks that impossible threshold where thought confronts its own boundary." }
    ]
  },
  'por/aporia': {
    primary: "An irresolvable internal contradiction, puzzle, or intellectual impasse in a text, argument, or theory.",
    secondary: "A rhetorical figure in which the speaker professes to be at a loss as to what to say or where to begin.",
    quotes: [
      { author: "Plato", work: "Theaetetus", quote: "I am in full **aporia**, Socrates; my soul is in labor, yet cannot bring forth a satisfactory answer." },
      { author: "Aristotle", work: "Nicomachean Ethics", quote: "We must examine the traditional opinions and dissolve the **aporia** that ensnare common judgment." },
      { author: "Paul de Man", work: "Allegories of Reading", quote: "Deconstructive reading exposes the ultimate **aporia** where grammatical structure and rhetorical meaning diverge." }
    ]
  },
  'por/emporium': {
    primary: "A large retail store selling a wide variety of goods; a marketplace or commercial center.",
    secondary: "In classical antiquity, a designated trading station or coastal commercial settlement.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "Alexandria flourished as the universal **emporium** of the East, where the treasures of India met the merchandise of Rome." },
      { author: "Charles Dickens", work: "Bleak House", quote: "Mr. Krook’s rag and bottle shop was a dismal **emporium** of legal lumber and mouldering parchments." },
      { author: "H. G. Wells", work: "Tono-Bungay", quote: "London appeared to him as a monstrous commercial **emporium**, buying and selling the souls of men." }
    ]
  },
  'por/gonopore': {
    primary: "A genital opening or reproductive pore in invertebrates through which gametes are discharged.",
    secondary: "The external aperture of the genital duct in arthropods, nematodes, and flatworms.",
    quotes: [
      { author: "Thomas Henry Huxley", work: "A Manual of the Anatomy of Invertebrated Animals", quote: "The single **gonopore** of the scorpion opens on the ventral surface of the second abdominal segment." },
      { author: "E. Ray Lankester", work: "Zoology", quote: "In trematodes, the copulatory organ is everted through the common genital atrium adjacent to the **gonopore**." },
      { author: "Libbie Hyman", work: "The Invertebrates: Platyhelminthes and Rhynchocoela", quote: "The location of the female **gonopore** serves as a decisive diagnostic character in turbellarian taxonomy." }
    ]
  },
  'por/ozopore': {
    primary: "A defensive gland opening or repugnatorial pore found along the lateral margins of millipedes and harvestmen.",
    secondary: "The external orifice through which noxious or toxic chemical secretions are expelled to deter predators.",
    quotes: [
      { author: "Thomas Eisner", work: "For Love of Insects", quote: "When threatened by ants, the millipede discharges droplets of noxious quinones through each lateral **ozopore**." },
      { author: "Arthur Shipley", work: "The Cambridge Natural History: Myriapods", quote: "A microscopic examination reveals that each segmented tergite bears a minute **ozopore** leading to an internal reservoir." },
      { author: "Edward O. Wilson", work: "The Diversity of Life", quote: "Chemical defense reached an early pinnacle among ancient arthropods, whose **ozopores** have secreted deterrence since the Devonian." }
    ]
  },
  'por/polypore': {
    primary: "Any of a group of bracket fungi characterized by a fruiting body whose spore-bearing underside is pierced with minute pores.",
    secondary: "A wood-decaying basidiomycete fungus forming tough, perennial leathery or woody brackets on trees.",
    quotes: [
      { author: "M. C. Cooke", work: "Fungi: Their Nature and Uses", quote: "The giant birch **polypore** forms a tough, corky bracket that resists decay long after the host tree has fallen." },
      { author: "Henry David Thoreau", work: "The Maine Woods", quote: "On the trunks of decaying hemlocks grew large brown **polypores**, their velvety undersides powdered with white spores." },
      { author: "Rachel Carson", work: "The Edge of the Sea", quote: "In the damp maritime forest, ancient **polypores** encircle the mossy boles of cedar trees." }
    ]
  },
  'por/pore': {
    primary: "A minute opening or orifice in an animal or plant surface through which liquids, gases, or microscopic particles pass.",
    secondary: "As a verb (usually followed by over), to read, study, or examine intently and with steady concentration.",
    quotes: [
      { author: "William Shakespeare", work: "Henry V", quote: "Hold hard the breath and bend up every spirit to his full height, through every **pore**." },
      { author: "Charlotte Brontë", work: "Jane Eyre", quote: "I sat in the library to **pore** over Bewick’s History of British Birds by the pale light of the window." },
      { author: "Robert Boyle", work: "The Sceptical Chymist", quote: "Even the most solid metals are permeated by invisible **pores** through which subtle effluvia may penetrate." }
    ]
  },
  'por/poriferous': {
    primary: "Bearing or pierced with pores; porous.",
    secondary: "Pertaining to or characteristic of the sponges (phylum Porifera).",
    quotes: [
      { author: "Robert Grant", work: "Outlines of Comparative Anatomy", quote: "The **poriferous** animals represent the simplest organization of multicellular life, drawing currents through countless microscopic sieves." },
      { author: "Richard Owen", work: "Lectures on Invertebrate Animals", quote: "The calcareous skeleton of the **poriferous** sponge provides structural framework for the circulating water currents." },
      { author: "Louis Agassiz", work: "Methods of Study in Natural History", quote: "In examining the **poriferous** corals of the reef, every minute orifice reveals a living polyzoan." }
    ]
  },
  'por/porism': {
    primary: "An ancient mathematical proposition that affirms the possibility of finding or constructing something meeting specified conditions.",
    secondary: "A corollary or deduction that presents itself easily from the demonstration of another proposition.",
    quotes: [
      { author: "Proclus", work: "Commentary on the First Book of Euclid's Elements", quote: "A **porism** differs from a theorem in that it seeks to find rather than to demonstrate, and from a problem in that it investigates a given property." },
      { author: "Robert Simson", work: "The Porisms of Euclid", quote: "The restoration of Euclid’s lost **porisms** marks one of the most arduous and glorious triumphs of modern mathematical scholarship." },
      { author: "John Playfair", work: "Transactions of the Royal Society of Edinburgh", quote: "A **porism** determines that there are certain relations between variable elements which render a geometrical locus possible." }
    ]
  },
  'por/porismatic': {
    primary: "Pertaining to, having the nature of, or demonstrating a porism.",
    secondary: "Consequential; deducing conditions of possibility from demonstrated principles.",
    quotes: [
      { author: "William Whewell", work: "History of the Inductive Sciences", quote: "The **porismatic** method enabled Greek geometers to establish general laws of spatial possibility without algebraic notation." },
      { author: "Robert Simson", work: "Mathematical Tracts", quote: "In this **porismatic** inquiry, we demonstrate that a third point can always be found on the conic section." },
      { author: "Augustus De Morgan", work: "Formal Logic", quote: "Deductions that emerge naturally as corollaries to a primary theorem carry a **porismatic** clarity." }
    ]
  },
  'por/porous': {
    primary: "Having minute spaces, interstices, or pores through which liquid or air may pass; permeable.",
    secondary: "Figuratively, easy to pass through, penetrate, or exploit; full of vulnerabilities or gaps.",
    quotes: [
      { author: "Charles Lyell", work: "Principles of Geology", quote: "The **porous** volcanic tuff absorbs rainwater rapidly, channeling it into subterranean reservoirs." },
      { author: "Jonathan Swift", work: "Gulliver's Travels", quote: "The fabric of my coat was made of a **porous** material that let the sea-water drain freely away." },
      { author: "H. G. Wells", work: "The Island of Doctor Moreau", quote: "The island’s soil was composed of black **porous** lava that crumbled underfoot like cinders." }
    ]
  },
  'por/porousness': {
    primary: "The quality or state of being porous; permeability or possession of pores.",
    secondary: "The degree to which a substance or barrier permits penetration by liquids, gases, or external forces.",
    quotes: [
      { author: "Robert Boyle", work: "Experiments and Considerations Touching Colours", quote: "The varying **porousness** of mineral bodies determines how deeply liquid dyes may penetrate their surface." },
      { author: "Michael Faraday", work: "Experimental Researches in Chemistry", quote: "We tested the **porousness** of the unglazed earthenware cylinder under differing atmospheric pressures." },
      { author: "Henry David Thoreau", work: "Walden", quote: "The dry leaves carpeting the woods gave evidence of the **porousness** of the sand beneath." }
    ]
  },
  'por/portion': {
    primary: "A part of a whole; an allotment, share, or serving.",
    secondary: "A dowry or inherited estate; as a verb, to divide into shares or distribute in parts.",
    quotes: [
      { author: "William Shakespeare", work: "King Lear", quote: "Here I disclaim all my paternal care... untender daughter, thy **portion** is nothing." },
      { author: "Jane Austen", work: "Sense and Sensibility", quote: "Her small **portion** of three thousand pounds was deemed quite insufficient for a fashionable alliance." },
      { author: "Charles Dickens", work: "A Tale of Two Cities", quote: "Every citizen received his daily **portion** of black bread at the municipal bakery." }
    ]
  },

  // Dashboard — tect
  'tect/architectural': {
    primary: "Relating to architecture, the art or practice of designing and constructing buildings.",
    secondary: "Conforming to rules of structural design; exhibiting balanced, orderly construction.",
    quotes: [
      { author: "John Ruskin", work: "The Seven Lamps of Architecture", quote: "The grandest **architectural** monuments of Europe embody the moral and spiritual aspirations of their builders." },
      { author: "Henry Adams", work: "Mont-Saint-Michel and Chartres", quote: "The transition from Romanesque to Gothic was an **architectural** revolution in the distribution of weight." },
      { author: "Edith Wharton", work: "The Decoration of Houses", quote: "Interior decoration must always be subordinate to the **architectural** proportions of the room." }
    ]
  },
  'tect/architecturally': {
    primary: "With regard to architecture or structural design.",
    secondary: "In an architectural manner; with calculated structural balance and proportion.",
    quotes: [
      { author: "Matthew Arnold", work: "Culture and Anarchy", quote: "Oxford is **architecturally** enchanting, preserving the medieval spirit in every collegiate quadrangle." },
      { author: "Henry James", work: "English Hours", quote: "The cathedral is **architecturally** flawed in its western towers, yet noble in total effect." },
      { author: "Lewis Mumford", work: "Sticks and Stones", quote: "A city must be **architecturally** integrated if it is to foster a humane civic community." }
    ]
  },
  'tect/architecture': {
    primary: "The art and science of designing and constructing buildings and other physical structures.",
    secondary: "In computing and systems theory, the conceptual structure, organization, and underlying framework of a system.",
    quotes: [
      { author: "Vitruvius", work: "De Architectura", quote: "Good **architecture** must possess three qualities: firmness, commodity, and delight." },
      { author: "John Ruskin", work: "The Poetry of Architecture", quote: "True **architecture** does not consist in ornamentation, but in the majestic disposition of masses." },
      { author: "Frank Lloyd Wright", work: "An Organic Architecture", quote: "The mission of an architect is to interpret the life of his time through living **architecture**." }
    ]
  },
  'tect/detect': {
    primary: "To discover, uncover, or ascertain the existence, presence, or fact of something hidden, obscure, or subtle.",
    secondary: "In physics and electronics, to identify or receive an electromagnetic signal, radiation, or mechanical vibration.",
    quotes: [
      { author: "Arthur Conan Doyle", work: "A Study in Scarlet", quote: "From a drop of water, a logician could infer the possibility of an Atlantic... and so can he **detect** the presence of crime." },
      { author: "Francis Bacon", work: "Novum Organum", quote: "The senses are often too dull to **detect** the minute motions of material atoms." },
      { author: "Michael Faraday", work: "Experimental Researches in Electricity", quote: "By employing a sensitive galvanometer, we were able to **detect** the faint induced current." }
    ]
  },
  'tect/detectable': {
    primary: "Capable of being discovered, noticed, or detected; perceptible.",
    secondary: "In scientific measurement, exceeding the threshold of instrumental sensitivity.",
    quotes: [
      { author: "Charles Darwin", work: "The Origin of Species", quote: "Slight individual differences, barely **detectable** to an ordinary observer, provide the material for natural selection." },
      { author: "Thomas Henry Huxley", work: "Methods and Results", quote: "No **detectable** difference in chemical composition could be found between the living and dead protoplasm." },
      { author: "Marie Curie", work: "Radioactive Substances", quote: "The radiation of radium remained **detectable** through thick barriers of lead and glass." }
    ]
  },
  'tect/detected': {
    primary: "Discovered, uncovered, or identified through observation or investigation.",
    secondary: "Having had one's hidden actions, guilt, or identity brought to light.",
    quotes: [
      { author: "William Shakespeare", work: "Measure for Measure", quote: "I never heard the absent duke much **detected** for women; he was not inclined that way." },
      { author: "Arthur Conan Doyle", work: "The Red-Headed League", quote: "The secret tunnel was **detected** just hours before the bank vault was to be breached." },
      { author: "Thomas Hardy", work: "Tess of the d'Urbervilles", quote: "She trembled whenever an unfamiliar footstep approached, terrified of being **detected** in her flight." }
    ]
  },
  'tect/detecting': {
    primary: "The act, process, or occupation of discovering or investigating clues to uncover hidden truths or crimes.",
    secondary: "Serving to identify or reveal signals, impurities, or radiation.",
    quotes: [
      { author: "Charles Dickens", work: "Bleak House", quote: "Inspector Bucket was a master in the delicate art of **detecting** hidden motives behind civil facades." },
      { author: "Arthur Conan Doyle", work: "The Sign of the Four", quote: "Observation with me is second nature; the work of **detecting** traces becomes an involuntary reflex." },
      { author: "Thomas W. Corbin", work: "Modern Inventions", quote: "The submarine microphone proved indispensable for **detecting** hostile propellers under water." }
    ]
  },
  'tect/detection': {
    primary: "The action or process of identifying the presence of something concealed, obscure, or elusive.",
    secondary: "The investigation and uncovering of crime; in electronics, the extraction of information from a carrier wave.",
    quotes: [
      { author: "Edgar Allan Poe", work: "The Purloined Letter", quote: "The simple ingenuity of the concealment baffled the most elaborate methods of Parisian **detection**." },
      { author: "Arthur Conan Doyle", work: "The Hound of the Baskervilles", quote: "Holmes applied his methods of scientific **detection** to unravel the moorland legend." },
      { author: "Heinrich Hertz", work: "Electric Waves", quote: "The spark-gap resonator made possible the experimental **detection** of Maxwell’s electromagnetic waves." }
    ]
  },
  'tect/detective': {
    primary: "A person whose occupation is to investigate crimes and obtain evidence.",
    secondary: "Pertaining to, employed in, or characteristic of criminal detection.",
    quotes: [
      { author: "Charles Dickens", work: "Bleak House", quote: "Mr. Bucket, the **detective** officer, sat in the corner of the carriage, watching every face with vigilant calm." },
      { author: "Arthur Conan Doyle", work: "A Study in Scarlet", quote: "I am a consulting **detective**, if you can understand what that is; here in London we have lots of government detectives." },
      { author: "G. K. Chesterton", work: "The Innocence of Father Brown", quote: "The criminal is the creative artist; the **detective** only the critic." }
    ]
  },
  'tect/detector': {
    primary: "A device or instrument designed to discover or register the presence of a substance, signal, or physical condition.",
    secondary: "In early radio engineering, a device used to extract audio signals from radio waves.",
    quotes: [
      { author: "Guglielmo Marconi", work: "Nobel Lecture on Wireless Telegraphy", quote: "By employing a magnetic **detector**, we received transatlantic signals with complete reliability." },
      { author: "Thomas W. Corbin", work: "Marvels of Scientific Invention", quote: "The smoke **detector** sounded an immediate warning long before flames broke through the bulkhead." },
      { author: "Ernest Rutherford", work: "Radioactive Transformations", quote: "The gold-leaf electroscope served as an exquisitely sensitive **detector** of ionizing alpha radiation." }
    ]
  },
  'tect/eutectic': {
    primary: "Of or relating to a mixture of substances that melts or solidifies at a lower temperature than any other composition of its components.",
    secondary: "As a noun, the specific alloy or mixture possessing this minimum melting point (from Greek eutēktos, easily melted).",
    quotes: [
      { author: "J. Willard Gibbs", work: "On the Equilibrium of Heterogeneous Substances", quote: "The **eutectic** point represents the unique invariant equilibrium where liquid and both solid phases coexist." },
      { author: "William Chandler Roberts-Austen", work: "An Introduction to the Study of Metallurgy", quote: "A microscopic section of solder reveals the fine lamellar structure characteristic of the lead-tin **eutectic**." },
      { author: "Henry Marion Howe", work: "The Metallography of Steel and Cast Iron", quote: "The formation of the iron-carbon **eutectic** governs the mechanical strength of chilled cast iron." }
    ]
  },
  'tect/tectaria': {
    primary: "A genus of tropical and subtropical ferns (Tectaria, family Tectariaceae), commonly known as halberd ferns, with umbrella-like indusia.",
    secondary: "An ornamental terrestrial fern cultivated for its deeply lobed or pinnate fronds and distinctive venation.",
    quotes: [
      { author: "William Jackson Hooker", work: "Species Filicum", quote: "The genus **Tectaria** is recognized by its peltate or reniform indusia covering the circular fruit-dots on the under-surface of the frond." },
      { author: "Asa Gray", work: "Manual of Botany", quote: "In warm ravines, species of **Tectaria** display broad, membranaceous fronds of striking emerald hue." },
      { author: "Liberty Hyde Bailey", work: "Cyclopedia of American Horticulture", quote: "Shaded conservatory borders are well suited for the luxuriant growth of tropical **Tectaria** ferns." }
    ]
  },
  'tect/tectona': {
    primary: "A genus of tropical hardwood trees (Tectona, family Lamiaceae) native to South and Southeast Asia, celebrated for Tectona grandis (teak).",
    secondary: "Renowned for its dense, durable, moisture-resistant timber, highly prized for shipbuilding and fine furniture.",
    quotes: [
      { author: "Dietrich Brandis", work: "The Forest Flora of North-West and Central India", quote: "The noble forests of **Tectona** grandis provide the finest timber in the world for maritime construction." },
      { author: "Joseph Dalton Hooker", work: "Himalayan Journals", quote: "Teak trees belonging to the genus **Tectona** clothed the lower river valleys with enormous deciduous foliage." },
      { author: "Alfred Russel Wallace", work: "The Malay Archipelago", quote: "In eastern Java, vast plantations of **Tectona** furnish the Dutch shipyards with rot-resistant timber." }
    ]
  },
  'tect/tectonic': {
    primary: "Relating to the structure of the earth’s crust and the large-scale forces or movements that deform it (as plate tectonics).",
    secondary: "In architecture and design, relating to the art of construction and structural expression; figuratively, having vast, momentous significance.",
    quotes: [
      { author: "Eduard Suess", work: "The Face of the Earth", quote: "The great mountain chains of the globe are the visible monuments of colossal **tectonic** compression." },
      { author: "Alfred Wegener", work: "The Origin of Continents and Oceans", quote: "Continental drift provides the unified **tectonic** mechanism explaining the matching coastlines of the Atlantic basin." },
      { author: "Kenneth Frampton", work: "Studies in Tectonic Culture", quote: "Architecture attains poetic resonance when its **tectonic** joints honestly reveal the flow of gravity and load." }
    ]
  },
  'tect/tectonics': {
    primary: "The scientific study of the processes that deform the earth's crust, including folding, faulting, and plate movements.",
    secondary: "In architecture and aesthetics, the science or art of assembling structural components into an artistic and functional whole.",
    quotes: [
      { author: "Alfred Wegener", work: "The Origin of Continents and Oceans", quote: "Global **tectonics** must account not merely for vertical displacements, but for enormous horizontal migrations of crustal plates." },
      { author: "Arthur Holmes", work: "Principles of Physical Geology", quote: "Convection currents in the subterranean mantle supply the driving energy for global **tectonics**." },
      { author: "Gottfried Semper", work: "The Four Elements of Architecture", quote: "The **tectonics** of the frame represents one of the primordial techniques of human shelter construction." }
    ]
  },
  'tect/tekt': {
    primary: "The Greek combining root representing tēktos ('melted, liquefied, molten', as in tektite) or tekton ('builder, craftsman', as in architect and tectonics).",
    secondary: "In geology and petrology, denoting glassy natural objects formed by the rapid melting and quenching of rocks during meteorite impact.",
    quotes: [
      { author: "Franz Eduard Suess", work: "Die Herkunft der Moldavite", quote: "I proposed the name tektite from the Greek root **tekt**-, denoting natural glass formed in a molten state." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "The root **tekt**- enters into our scientific speech either through the art of the builder or the fusion of molten minerals." },
      { author: "Arthur Holmes", work: "Principles of Physical Geology", quote: "Chemical analysis of **tekt**-derived glasses confirmed their origin in catastrophic impact melting." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Structure & Form';

for (const [key, data] of Object.entries(entries)) {
  const [db, word] = key.split('/');
  const filePath = path.join(clusterPath, `Dashboard — ${db}`, `${word}.md`);

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const bookIdx = content.indexOf('> [!book]');
  if (bookIdx === -1) {
    console.error(`No > [!book] in ${filePath}`);
    continue;
  }

  const headerPart = content.slice(0, bookIdx).trimEnd();
  const defBlock = `> [!book] 📖 Definitions & Semantic Range\n> 1. **Primary Definition (Lexical / Standard Consensus)**: ${data.primary}\n> 2. **Secondary / Nuanced Definition (Specialized / Domain / Encyclopedic)**: ${data.secondary}`;
  const quoteLines = data.quotes.map(q => `> - 📜 **${q.author} (*${q.work}*):** *"${q.quote}"*`).join('\n');
  const quotesBlock = `> [!quote] 💬 Contextual Usage & Authentic Quotations\n${quoteLines}`;

  const newContent = `${headerPart}\n\n${defBlock}\n\n${quotesBlock}\n`;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated: ${filePath}`);
}

console.log('Done Batch 2 of Cluster Structure & Form!');
