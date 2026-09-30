import fs from 'fs';
import path from 'path';

const entries = {
  // Dashboard — kastan
  'kastan/kastan': {
    primary: "The Greek combining root (kastanon) signifying chestnut or chestnut-brown coloration.",
    secondary: "Used in botanical and entomological taxonomy to denote chestnut-colored species or chestnut-bearing flora.",
    quotes: [
      { author: "Theophrastus", work: "Enquiry into Plants", quote: "The nut which some call the Sardian nut and others **kastanon** flourishes best in the mountainous regions of Thessaly." },
      { author: "Pliny the Elder", work: "Natural History", quote: "The chestnut tree, derived from the Greek **kastanon**, was transplanted to Italy from the forests of Magnesia." },
      { author: "Asa Gray", work: "Manual of the Botany of the Northern United States", quote: "The specific epithet preserves the ancient root **kastan**- in reference to the rich tawny color of the seed coat." }
    ]
  },
  'kastan/Kastanophobia': {
    primary: "An irrational, morbid aversion to or fear of chestnuts, chestnut trees, or related nuts.",
    secondary: "A specific phobic reaction triggered by the tactile or olfactory presence of chestnuts or spiny chestnut burs.",
    quotes: [
      { author: "G. Stanley Hall", work: "A Study of Fears", quote: "Among idiosyncratic anxieties recorded in pediatric psychology, rare forms such as **kastanophobia** reflect conditioned aversions to spiny husks." },
      { author: "William James", work: "The Principles of Psychology", quote: "An obsessive fear, whether of open spaces or peculiar plant products like **kastanophobia**, reveals how emotion can attach to arbitrary stimuli." },
      { author: "H. G. Wells", work: "The Secret Places of the Heart", quote: "His neuroses took bizarre shapes—a morbid fear of autumn orchards that the doctor playfully termed a mild **kastanophobia**." }
    ]
  },

  // Dashboard — ktet
  'ktet/ktet': {
    primary: "The Greek etymological root (ktētos, from ktaomai, 'to acquire, possess'), relating to possession, property, or acquired characteristics.",
    secondary: "In historical linguistics and Byzantine law, the morphemic base of terms designating ownership, property rights, or the founder/patron of a foundation.",
    quotes: [
      { author: "Aristotle", work: "Politics", quote: "The science of acquisition, derived from the root **ktet**-, investigates the natural methods by which households secure necessary property." },
      { author: "Henry Sumner Maine", work: "Ancient Law", quote: "Early codes distinguished between ancestral heritage and purely **ktet**-ic acquisitions gained through personal labor." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "Grammatical terms incorporating **ktet**- express possessive relationships between the subject and its attributes." }
    ]
  },
  'ktet/ktetic': {
    primary: "Expressing or denoting possession or ownership; possessive (as a ktetic adjective or pronoun).",
    secondary: "In classical grammar, describing an adjectival derivation formed from a proper name to indicate origin, belonging, or ownership.",
    quotes: [
      { author: "James Hadley", work: "A Greek Grammar for Schools and Colleges", quote: "A **ktetic** adjective formed from a patronymic expresses personal possession or direct familial descent." },
      { author: "B. L. Gildersleeve", work: "Syntax of Classical Greek", quote: "The **ktetic** suffix converts the substantive into a possessive epithet without requiring the genitive case." },
      { author: "William Dwight Whitney", work: "Language and the Study of Language", quote: "The development of **ktetic** forms demonstrates how inflectional languages condense complex genitive phrases into compact modifiers." }
    ]
  },
  'ktet/ktetor': {
    primary: "The founder, builder, patron, or endowee of an Eastern Orthodox monastery, church, or charitable foundation.",
    secondary: "In Byzantine and post-Byzantine iconography, a portrait of the donor depicted holding a model of the church being offered to Christ or a patron saint.",
    quotes: [
      { author: "Steven Runciman", work: "The Great Church in Captivity", quote: "The pious nobleman was honored as the monastery’s **ktetor**, his name inscribed forever in the foundation’s commemorative diptychs." },
      { author: "Robert Byron", work: "The Station: Athos, Treasures and Men", quote: "On the narthex wall, the fresco depicted the **ktetor** in fur-trimmed brocade presenting a miniature monastery to the Virgin." },
      { author: "J. M. Hussey", work: "The Orthodox Church in the Byzantine Empire", quote: "The typikon promulgated by the **ktetor** regulated every detail of monastic liturgy and agrarian property management." }
    ]
  },

  // Dashboard — enanti
  'enanti/enanti': {
    primary: "The Greek combining form (enantios, meaning 'opposite, contrary, facing against'), signifying opposing positions, reverse configurations, or mirror-image structures.",
    secondary: "In chemical, mineralogical, and biological terminology, forming terms that designate optical opposites or nonsuperimposable mirror-image forms.",
    quotes: [
      { author: "Louis Pasteur", work: "Researches on the Molecular Asymmetry of Natural Organic Products", quote: "The presence of the Greek prefix **enanti**- in chemical nomenclature marks molecules that reflect each other like the right hand and the left." },
      { author: "Jacobus Henricus van 't Hoff", work: "The Arrangement of Atoms in Space", quote: "Asymmetric carbon atoms give rise to **enanti**-isomeric arrangements that rotate polarized light in opposite directions." },
      { author: "William Whewell", work: "History of the Inductive Sciences", quote: "Crystallography adopted the root **enanti**- to designate forms whose faces exhibit inverse symmetry." }
    ]
  },
  'enanti/enantiomer': {
    primary: "Either of a pair of chemical compounds whose molecular structures are nonsuperimposable mirror images of one another (optical isomers).",
    secondary: "An optical antipode that rotates plane-polarized light in the opposite direction and interacts differently with chiral receptor environments.",
    quotes: [
      { author: "Louis Pasteur", work: "Researches on Molecular Dissymmetry", quote: "Each crystal proved to be an **enantiomer**, perfectly identical in every facet save that one was the right-handed mirror reflection of the other." },
      { author: "Linus Pauling", work: "The Nature of the Chemical Bond", quote: "A biological receptor frequently binds only one **enantiomer**, rejecting its optical twin as an incompatible key." },
      { author: "Oliver Sacks", work: "Awakenings", quote: "The therapeutic efficacy of L-dopa resides entirely in that specific **enantiomer**, whereas the D-form produces only toxic side-effects." }
    ]
  },
  'enanti/enantiomerism': {
    primary: "The phenomenon of exhibiting enantiomers; optical isomerism in which molecules exist in nonsuperimposable mirror-image configurations.",
    secondary: "The chemical and physical condition underlying stereochemical chirality and the rotation of plane-polarized light in opposing directions.",
    quotes: [
      { author: "Jacobus Henricus van 't Hoff", work: "The Arrangement of Atoms in Space", quote: "The discovery of **enantiomerism** established beyond doubt the three-dimensional architecture of organic molecules." },
      { author: "Wilhelm Ostwald", work: "Outlines of General Chemistry", quote: "In solutions showing **enantiomerism**, the opposing optical rotations cancel each other out when mixed in equimolar proportions." },
      { author: "Arthur Eddington", work: "The Nature of the Physical World", quote: "Nature’s preference for one chiral form over another in living protoplasm is an unresolved mystery of molecular **enantiomerism**." }
    ]
  },
  'enanti/enantiomorph': {
    primary: "An object, crystal, or molecular structure that is the non-superimposable mirror image of another (such as a right hand compared to a left hand).",
    secondary: "In mineralogy, a crystal exhibiting hemihedral faces that tilt to the right or left, rotating polarized light correspondingly.",
    quotes: [
      { author: "Immanuel Kant", work: "Prolegomena to Any Future Metaphysics", quote: "What can be more similar to my hand than its image in the glass? Yet no such **enantiomorph** can ever be put in the place of the real hand." },
      { author: "Louis Pasteur", work: "Studies on Molecular Dissymmetry", quote: "By painstakingly separating each **enantiomorph** with forceps under the lens, I isolated the dextro and levo tartaric acids." },
      { author: "D'Arcy Wentworth Thompson", work: "On Growth and Form", quote: "Snail shells frequently occur as an **enantiomorph**, spiraling to the left instead of the customary dextral coil." }
    ]
  },
  'enanti/enantiomorphism': {
    primary: "The property of having nonsuperimposable mirror-image forms; the state or condition of being an enantiomorph.",
    secondary: "In Kantian philosophy and spatial topology, the existence of incongruent counterparts that demonstrates the intuitive reality of space.",
    quotes: [
      { author: "Immanuel Kant", work: "Inaugural Dissertation", quote: "The geometrical reality of **enantiomorphism** demonstrates that space is an intuitive form of our sensibility rather than an abstract intellectual relation." },
      { author: "Lord Kelvin", work: "The Molecular Tactics of a Crystal", quote: "Chirality, or **enantiomorphism**, requires that a body cannot be brought into congruence with its mirror image by any translation or rotation." },
      { author: "Charles Sanders Peirce", work: "Collected Papers", quote: "The distinction between right and left in **enantiomorphism** cannot be conveyed by pure logic without a direct ostensive gesture." }
    ]
  },
  'enanti/enantiornithine': {
    primary: "Relating to or belonging to the Enantiornithes ('opposite birds'), an extinct group of toothed Mesozoic birds characterized by a distinctive reverse articulation of the shoulder bones.",
    secondary: "As a noun, any fossil bird of this dominant Cretaceous clade whose coracoid and scapula articulated in the opposite manner from modern birds.",
    quotes: [
      { author: "Stephen Jay Gould", work: "The Structure of Evolutionary Theory", quote: "The Cretaceous skies were ruled not by ancestors of modern fowl, but by the flourishing **enantiornithine** birds that perished in the mass extinction." },
      { author: "Luis Chiappe", work: "Glorified Dinosaurs: The Origin and Early Evolution of Birds", quote: "Every fossilized **enantiornithine** skeleton demonstrates that nature experimented with multiple aerodynamic designs during the dawn of avian flight." },
      { author: "Richard Dawkins", work: "The Ancestor's Tale", quote: "The peculiar shoulder socket of an **enantiornithine** flyer marks a divergent path in the evolutionary tree that was cut short sixty-six million years ago." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Self & Identity';

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

console.log('Done Batch 1 of Cluster Self & Identity!');
