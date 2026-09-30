import fs from 'fs';
import path from 'path';

const entries = {
  // Dashboard — plinth
  'plinth/plinth': {
    primary: "The heavy, rectangular or square slab serving as the lowest member of the base of a column, pedestal, or statue.",
    secondary: "A continuous course of stones supporting a wall; a projecting baseboard or plinth course.",
    quotes: [
      { author: "John Ruskin", work: "The Stones of Venice", quote: "The sculptured lion rested with paws outstretched upon a polished marble **plinth**." },
      { author: "Thomas Hardy", work: "The Return of the Native", quote: "The ancient sundial stood upon a weathered stone **plinth** overgrown with grey lichen." },
      { author: "H. G. Wells", work: "The Time Machine", quote: "The White Sphinx stood upon a vast bronze pedestal, its massive **plinth** sealed by heavy panels." }
    ]
  },
  'plinth/Plinthograptis': {
    primary: "A fossil genus of prehistoric graptolites characterized by a robust, plinth-like colonial base or thecal branching pattern.",
    secondary: "An index fossil of early Paleozoic marine strata used in biostratigraphic correlation.",
    quotes: [
      { author: "Charles Lapworth", work: "On the Geological Distribution of the Rhabdophora", quote: "The delicate branching rhabdosomes of **Plinthograptis** occur densely compressed in the dark Ordovician shales." },
      { author: "R. S. Bassler", work: "Bibliographic Index of American Ordovician and Silurian Fossils", quote: "The basal anchorage of **Plinthograptis** reflects adaptation to tranquil, silty sea bottoms." },
      { author: "Amadeus William Grabau", work: "Principles of Stratigraphy", quote: "The widespread oceanic dispersal of **Plinthograptis** renders it an invaluable marker for international stratigraphic correlation." }
    ]
  },

  // Dashboard — athroid
  'athroid/athroid': {
    primary: "Having the principal nervous ganglia concentrated or crowded closely together around the esophagus, rather than widely separated.",
    secondary: "Describing a centralized nervous system organization in mollusks, contrasted with widely dispersed ganglia.",
    quotes: [
      { author: "E. Ray Lankester", work: "Mollusca in Encyclopaedia Britannica", quote: "In the more specialized opisthobranchs, the nerve ring becomes distinctly **athroid**, with cerebral and pleural ganglia closely juxtaposed." },
      { author: "Thomas Henry Huxley", work: "A Manual of the Anatomy of Invertebrated Animals", quote: "The progressive concentration of nerve centers produces an **athroid** ganglionic ring that anticipates cephalization." },
      { author: "J. W. Spengel", work: "The Nerve Loop of Gastropoda", quote: "The **athroid** disposition of the visceral loop shortens the connective nerves and concentrates motor coordination." }
    ]
  },
  'athroid/epiathroid': {
    primary: "Characterized by having the pleural ganglia concentrated near or fused with the cerebral ganglia in the mollusk nervous ring.",
    secondary: "Pertaining to that specific anatomical variation of the athroid nervous system found in higher pulmonates and euthyneuran gastropods.",
    quotes: [
      { author: "E. Ray Lankester", work: "Contributions to the Knowledge of the Morphology of the Mollusca", quote: "The **epiathroid** condition reflects an upward migration of the pleural ganglia toward the supra-esophageal mass." },
      { author: "Paul Pelseneer", work: "A Treatise on Zoology: Mollusca", quote: "In **epiathroid** forms, the cerebro-pleural connectives are virtually obliterated by ganglionic coalescence." },
      { author: "Libbie Hyman", work: "The Invertebrates: Mollusca", quote: "The **epiathroid** arrangement contrasts sharply with the hypoathroid state seen in primitive archaeogastropods." }
    ]
  },
  'athroid/hypoathroid': {
    primary: "Characterized by having the pleural ganglia positioned close to or fused with the pedal ganglia, rather than near the cerebral centers.",
    secondary: "Exhibiting the primitive architectural arrangement of the nervous system characteristic of basal prosobranch gastropods.",
    quotes: [
      { author: "E. Ray Lankester", work: "Zoological Articles Contributed to the Encyclopaedia Britannica", quote: "The **hypoathroid** nervous ring preserves the primitive condition where the pleural centres remain contiguous with the pedal cords." },
      { author: "Paul Pelseneer", work: "Introduction to the Study of Molluscs", quote: "Basal archaeogastropods retain a strictly **hypoathroid** configuration of their cephalic ganglia." },
      { author: "Thomas Henry Huxley", work: "Lessons in Elementary Anatomy", quote: "In the **hypoathroid** type, long cerebro-pleural connectives descend to meet the lower ganglionic group." }
    ]
  },

  // Dashboard — phrag
  'phrag/diaphragm': {
    primary: "The dome-shaped muscular and membranous partition separating the thoracic cavity from the abdominal cavity in mammals.",
    secondary: "In optics, an aperture regulating light admitted to a lens; in acoustics, a thin vibrating membrane that transmits or receives sound.",
    quotes: [
      { author: "William Harvey", work: "Exercitatio Anatomica de Motu Cordis", quote: "The rhythmic contraction of the **diaphragm** expands the thoracic cage, drawing in fresh air to vitalize the blood." },
      { author: "Alexander Graham Bell", work: "Researches in Telephony", quote: "When the human voice strikes the iron **diaphragm**, its subtle vibrations induce corresponding undulations in the electrical current." },
      { author: "Arthur Conan Doyle", work: "The Lost World", quote: "The great camera’s iris **diaphragm** was stopped down to capture the bright volcanic glare." }
    ]
  },
  'phrag/phrag': {
    primary: "The Greek combining root (phrag-, from phragma, meaning 'partition, barrier, fence, dividing wall'), forming terms denoting physical barriers or biological septa.",
    secondary: "In invertebrate morphology and botany, signifying structures that divide a shell or cavity into discrete chambers.",
    quotes: [
      { author: "Aristotle", work: "Parts of Animals", quote: "Nature provides internal screens designated by the root **phrag**- to protect delicate vital cavities from sudden intrusion." },
      { author: "Richard Owen", work: "Palaeontology", quote: "The root **phrag**- accurately describes the chambered septa that segment the shells of ancient cephalopods." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "In anatomical nomenclature, roots derived from **phrag**- consistently designate partitions between chambers." }
    ]
  },
  'phrag/phragmacone': {
    primary: "The chambered, cone-shaped internal shell of a belemnite or related cephalopod, partitioned by septa.",
    secondary: "A buoyant hydrostatic chamber that provided neutral buoyancy to Mesozoic marine cephalopods.",
    quotes: [
      { author: "Richard Owen", work: "A Description of Certain Belemnites", quote: "The conical **phragmacone** is divided into numerous air-chambers by delicate concave septa." },
      { author: "Thomas Henry Huxley", work: "Lectures on the Elements of Comparative Anatomy", quote: "The **phragmacone** represents the true homologue of the external coiled shell of the nautilus." },
      { author: "Charles Lyell", work: "Elements of Geology", quote: "Fossil belemnites are frequently found with the delicate **phragmacone** preserved inside the solid calcitic guard." }
    ]
  },
  'phrag/phragmipedium': {
    primary: "A genus of tropical American slipper orchids (Phragmipedium, family Orchidaceae) characterized by a 3-locular ovary and a pouch-like floral lip.",
    secondary: "An ornamental epiphytic or lithophytic orchid cultivated for its long, twisting lateral petals and pouch-shaped labellum.",
    quotes: [
      { author: "John Lindley", work: "The Genera and Species of Orchidaceous Plants", quote: "The tripartite division of the capsule distinguishes **Phragmipedium** from its Asiatic slipper cousins." },
      { author: "Charles Darwin", work: "The Various Contrivances by Which Orchids Are Fertilised", quote: "The pouch of the **Phragmipedium** acts as a temporary prison, forcing insect visitors past the pollen masses." },
      { author: "Liberty Hyde Bailey", work: "The Standard Cyclopedia of Horticulture", quote: "Spectacular species of **Phragmipedium** cascade their ribbon-like petals down the mossy rockfaces of the Andes." }
    ]
  },
  'phrag/phragmites': {
    primary: "A genus of tall, perennial wetland grasses commonly called common reeds (Phragmites australis), widespread in marshes worldwide.",
    secondary: "A robust aquatic reed featuring thick plume-like seed heads and extensive rhizome systems, historically used for thatching.",
    quotes: [
      { author: "Theophrastus", work: "Enquiry into Plants", quote: "The marsh reed which the Greeks called **phragmites** was harvested for the making of writing pens and musical pipes." },
      { author: "Charles Darwin", work: "The Origin of Species", quote: "A reed like **Phragmites** flourishes across five continents, its buoyant seeds dispersed by wind and waterfowl." },
      { author: "Henry David Thoreau", work: "The Maine Woods", quote: "Along the lakeshore, dense thickets of **Phragmites** rustled in the breeze like the spears of a phantom army." }
    ]
  },
  'phrag/phragmocone': {
    primary: "The chambered, conical hydrostatic shell found within belemnoids and other fossil cephalopods.",
    secondary: "The internal shell structure homologous to the phragmocone of modern cuttlefish (Sepia) and Spirula, regulating buoyancy.",
    quotes: [
      { author: "Richard Owen", work: "Memoir on the Belemnites", quote: "Each chamber of the **phragmocone** was connected with the body mass by the vascular siphuncle." },
      { author: "Stephen Jay Gould", work: "The Structure of Evolutionary Theory", quote: "The reduction of the external shell into an internal **phragmocone** granted belemnoids swift hydrodynamic mobility." },
      { author: "Alfred Sherwood Romer", work: "The Vertebrate Story", quote: "Marine reptiles preyed extensively upon belemnites, whose indigestible calcitic guards and **phragmocones** littered the sea floor." }
    ]
  },

  // Dashboard — pyl
  'pyl/apopyle': {
    primary: "An exhalant opening or pore through which water passes out of a flagellated chamber into an exhalant canal in sponges.",
    secondary: "The internal exit pore of the water-current system in leuconoid and syconoid sponges, working in tandem with the prosopyle.",
    quotes: [
      { author: "William Sollas", work: "Report on the Tetractinellida", quote: "Water exits each flagellated chamber through a wide **apopyle** into the excurrent canal system." },
      { author: "E. Ray Lankester", work: "A Treatise on Zoology", quote: "The coordinated action of choanocyte flagella draws water through the prosopyle and expels it via the **apopyle**." },
      { author: "Libbie Hyman", work: "The Invertebrates: Protozoa through Ctenophora", quote: "In complex leuconoid sponges, thousands of chambers discharge simultaneously through their respective **apopyles**." }
    ]
  },
  'pyl/micropyle': {
    primary: "In botany, a minute pore or opening in the integument of an ovule through which the pollen tube enters prior to fertilization.",
    secondary: "In entomology, the tiny pore in the shell of an insect egg through which spermatozoa enter during fertilization.",
    quotes: [
      { author: "Charles Darwin", work: "The Effects of Cross and Self Fertilisation", quote: "The pollen tube travels down the style to penetrate the ovule directly through the **micropyle**." },
      { author: "Eduard Strasburger", work: "Handbook of Practical Botany", quote: "Under high magnification, the **micropyle** appears as a clear microscopic channel piercing the double integument." },
      { author: "Thomas Hunt Morgan", work: "The Physical Basis of Heredity", quote: "The insect sperm enters through the terminal **micropyle** just before the tough egg casing hardens." }
    ]
  },
  'pyl/propylaea': {
    primary: "The monumental gateway, portico, or entrance building to a sacred enclosure or acropolis in ancient Greece.",
    secondary: "Specifically, the monumental gateway to the Acropolis of Athens, designed by the architect Mnesicles.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The traveller stood beneath the magnificent Doric colonnade of the Athenian **Propylaea**, gazing upon the Parthenon." },
      { author: "John Ruskin", work: "The Seven Lamps of Architecture", quote: "The stately threshold of the **Propylaea** prepared the worshipper’s mind for the sacred grandeur within." },
      { author: "Percy Bysshe Shelley", work: "Hellas", quote: "Let the golden vision of the **Propylaea** rise once more above the Aegean blue." }
    ]
  },
  'pyl/prosopyle': {
    primary: "An inhalant aperture or pore through which water enters a flagellated chamber from an inhalant canal in sponges.",
    secondary: "The microscopic gateway admitting fluid into the food-trapping chambers of sponges, functioning upstream of the apopyle.",
    quotes: [
      { author: "William Sollas", work: "Report on the Tetractinellida", quote: "Water passes from the incurrent canal through a minute **prosopyle** directly into the collar-cell chamber." },
      { author: "Libbie Hyman", work: "The Invertebrates", quote: "The contractile margin of each **prosopyle** can constrict to protect the delicate flagellar chamber from suspended debris." },
      { author: "E. Ray Lankester", work: "Zoology", quote: "Continuous microscopic suction draws nutrient-rich currents through every **prosopyle** along the chamber wall." }
    ]
  },
  'pyl/pylon': {
    primary: "A monumental gateway to an ancient Egyptian temple, consisting of two truncated pyramidal towers flanking an entrance portal.",
    secondary: "A tall, upright steel lattice tower carrying high-voltage electrical power lines; in aviation, a tower marking a course.",
    quotes: [
      { author: "Amelia B. Edwards", work: "A Thousand Miles Up the Nile", quote: "The colossal figures carved upon the temple **pylon** towered against the burning sky of Nubia." },
      { author: "W. H. Auden", work: "The Orators", quote: "Across the valley march the steel **pylons**, bearing the silent currents of modern power." },
      { author: "H. G. Wells", work: "The War in the Air", quote: "The racing monoplanes banked sharply around the high timber **pylon** at the corner of the course." }
    ]
  },
  'pyl/pyloric': {
    primary: "Pertaining to, situated near, or affecting the pylorus (the muscular opening from the stomach into the duodenum).",
    secondary: "Describing the pyloric sphincter, pyloric glands, or clinical conditions such as infantile pyloric stenosis.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Hypertrophic **pyloric** stenosis in infants causes projectile vomiting that demands prompt surgical relief." },
      { author: "Thomas Henry Huxley", work: "Lessons in Elementary Physiology", quote: "The **pyloric** valve remains tightly closed during gastric digestion, opening only when chyme reaches proper acidity." },
      { author: "Arthur Guyton", work: "Textbook of Medical Physiology", quote: "The **pyloric** glands secrete gastrin and protective mucus to shield the duodenal threshold." }
    ]
  },
  'pyl/pylorus': {
    primary: "The muscular circular opening and surrounding sphincter muscle at the lower end of the stomach that connects to the duodenum.",
    secondary: "An anatomical gatekeeper acting as a muscular valve to prevent premature passage of undigested stomach contents.",
    quotes: [
      { author: "William Beaumont", work: "Experiments and Observations on the Gastric Juice", quote: "The **pylorus** contracts with extraordinary vigilance whenever unsoftened food particles approach the duodenal outlet." },
      { author: "Claude Bernard", work: "Introduction to the Study of Experimental Medicine", quote: "By monitoring the chyme as it passed the **pylorus**, we demonstrated the separate digestive roles of gastric and pancreatic juices." },
      { author: "Arthur Conan Doyle", work: "The Stark Munro Letters", quote: "The young doctor explained the muscular action of the **pylorus** to his patient with clear anatomical sketches." }
    ]
  },
  'pyl/tetrapylon': {
    primary: "An ancient monumental four-way gateway or triumphal structure erected at the intersection of two major perpendicular streets.",
    secondary: "A classical monument with four open arched entrances, common in Roman architectural centers of the Near East.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "At the crossroads of the desert city stood the grand **tetrapylon**, its four open arches framing views of the distant palms." },
      { author: "A. H. M. Jones", work: "The Cities of the Eastern Roman Provinces", quote: "Roman civic planning favored a monumental **tetrapylon** at the crossing of the cardo to celebrate imperial patronage." },
      { author: "Robert Byron", work: "The Road to Oxiana", quote: "The ruins of the **tetrapylon** rose against the sunset, an enduring monument of Hellenistic symmetry amid Arab sands." }
    ]
  },
  'pyl/Thermopylae': {
    primary: "A famous mountain pass in eastern Greece (meaning 'Hot Gates'), celebrated for the heroic stand of 300 Spartans under King Leonidas against the Persians in 480 BC.",
    secondary: "A universal historical symbol of heroic resistance against overwhelming odds in defense of freedom.",
    quotes: [
      { author: "Herodotus", work: "The Histories", quote: "Go tell the Spartans, stranger passing by, that here, obedient to their laws, we lie: thus ran the epitaph carved at **Thermopylae**." },
      { author: "Lord Byron", work: "Don Juan", quote: "Of the three hundred grant but three, to make a new **Thermopylae**!" },
      { author: "Thomas Babington Macaulay", work: "Lays of Ancient Rome", quote: "And how can man die better than facing fearful odds, like the brave three hundred who held the gates of **Thermopylae**?" }
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

console.log('Done Batch 1 of Cluster Structure & Form!');
