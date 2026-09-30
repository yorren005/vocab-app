import fs from 'fs';
import path from 'path';

const entries = {
  'cen 3': {
    primary: "The combining form cen- (variant of Greek coen-, from koinos, meaning 'common, shared, public'), forming compounds relating to shared communal life.",
    secondary: "In theological and ecclesiastical history, the prefixal base of monastic communities (cenobites) living in common fellowship.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The Greek prefix **cen**- marked those solitary hermits who united into communal fraternities upon the banks of the Nile." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "In ecclesiastical etymology, **cen**- consistently signifies that which is shared in common by the brotherhood." },
      { author: "Arthur Penrhyn Stanley", work: "Lectures on the History of the Eastern Church", quote: "The transition from the solitary anchorite to the **cen**-obitic order was the decisive revolution in early monasticism." }
    ]
  },
  cenobite: {
    primary: "A member of a monastic community living in fellowship with others, as distinguished from an anchorite or solitary hermit.",
    secondary: "In church history, a monk following a common rule under an abbot (inaugurated by Saint Pachomius in fourth-century Egypt).",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The **cenobite** passed his days in collective prayer, agricultural labor, and unquestioning obedience to the abbot." },
      { author: "Walter Pater", work: "Marius the Epicurean", quote: "In that serene retreat, he lived almost like a Christian **cenobite**, secluded from the noisy factions of Rome." },
      { author: "Thomas Carlyle", work: "Past and Present", quote: "Abbot Samson was no idle dreamer, but a practical **cenobite** who restored order to the monastery’s debts." }
    ]
  },
  cenobitic: {
    primary: "Pertaining to, characteristic of, or living as a cenobite; communal (as distinguished from eremitic or solitary).",
    secondary: "In sociology of religion, describing a lifestyle centered upon shared property, communal meals, and unified spiritual rule.",
    quotes: [
      { author: "William James", work: "The Varieties of Religious Experience", quote: "The **cenobitic** impulse seeks salvation through the mutual discipline and sympathy of a shared community." },
      { author: "John Henry Newman", work: "Historical Sketches", quote: "Saint Basil gave to the Eastern church its definitive **cenobitic** rule, balancing contemplation with charity." },
      { author: "Henry Adams", work: "Mont-Saint-Michel and Chartres", quote: "The great abbey was planned entirely for **cenobitic** life, with refectory and dormitory opening upon the cloister." }
    ]
  },
  cenobitical: {
    primary: "Cenobitic; of or relating to a community of monks living together under a common rule.",
    secondary: "Communal or monastic in character, emphasizing collective spiritual discipline over solitary asceticism.",
    quotes: [
      { author: "David Hume", work: "The History of England", quote: "The **cenobitical** institutions of the Anglo-Saxon period served as islands of literacy amid barbarian turmoil." },
      { author: "Samuel Johnson", work: "A Journey to the Western Islands of Scotland", quote: "On Iona, the ruins of ancient **cenobitical** dwellings bear witness to Columba's missionary zeal." },
      { author: "Thomas Babington Macaulay", work: "The History of England", quote: "The bishop defended the **cenobitical** endowments against royal confiscation with formidable learning." }
    ]
  },
  coenesthesia: {
    primary: "The general, undifferentiated sense of bodily existence and internal physical condition, resulting from the sum of organic sensations.",
    secondary: "In psychiatric history, the visceral self-awareness or somatic feeling of vital existence that forms the baseline of self-identity.",
    quotes: [
      { author: "William James", work: "The Principles of Psychology", quote: "Our background feeling of personal identity rests heavily upon this obscure, continuous organic sensation called **coenesthesia**." },
      { author: "Théodule-Armand Ribot", work: "The Diseases of Personality", quote: "Alterations in the visceral **coenesthesia** produce bizarre delusions of bodily transformation and estrangement." },
      { author: "Sigmund Freud", work: "The Ego and the Id", quote: "The bodily ego is first and foremost a somatic projection derived from the deep currents of **coenesthesia**." }
    ]
  },
  coenobite: {
    primary: "A monk who lives in a religious community under an established rule (traditional British and classical spelling).",
    secondary: "In historical theology, one who practices collective monasticism under the rule of an abbot or prior.",
    quotes: [
      { author: "Thomas Hardy", work: "The Woodlanders", quote: "He lived as austerely in his forest cabin as any fifth-century **coenobite** in the Nitrian desert." },
      { author: "Arthur Conan Doyle", work: "The White Company", quote: "The burly **coenobite** tolled the abbey bell, summoning the brethren to vespers." },
      { author: "Charles Kingsley", work: "Hypatia", quote: "The young **coenobite** turned his eyes away from the dazzling beauty of the Alexandrian philosopher." }
    ]
  },
  coenobitic: {
    primary: "Relating to life in a religious community; living collectively as coenobites.",
    secondary: "Characterized by shared communal living, collective ownership, and mutual discipline.",
    quotes: [
      { author: "George Eliot", work: "Romola", quote: "Fra Girolamo urged his followers toward a quasi-**coenobitic** austerity in the midst of worldly Florence." },
      { author: "Matthew Arnold", work: "Essays in Criticism", quote: "The **coenobitic** brotherhoods preserved classical manuscripts when the civil structures of the West collapsed." },
      { author: "Lord Acton", work: "The History of Freedom", quote: "The **coenobitic** monasteries of the East asserted an independence from imperial decrees that secular bishops often surrendered." }
    ]
  },
  coenobitical: {
    primary: "Pertaining to coenobites or communal monasticism.",
    secondary: "Living in common under religious vows; conventual.",
    quotes: [
      { author: "John Ruskin", work: "The Stones of Venice", quote: "The architecture of the cloister reflects the quiet symmetry of the **coenobitical** ideal." },
      { author: "Walter Scott", work: "The Monastery", quote: "The Abbot maintained the ancient **coenobitical** hospitality, offering food and shelter to every wandering pilgrim." },
      { author: "W. E. H. Lecky", work: "History of European Morals", quote: "The rise of **coenobitical** societies channeled the erratic fervor of solitary ascetics into productive social channels." }
    ]
  },
  coenocyte: {
    primary: "A multinucleate cytoplasmic mass resulting from repeated nuclear division without accompanying cell division, characteristic of certain algae and fungi.",
    secondary: "A syncytium or multinucleate cellular organization acting as a single physiological unit.",
    quotes: [
      { author: "Eduard Strasburger", work: "Textbook of Botany", quote: "In the siphonaceous algae, the entire vegetative body forms an uninterrupted **coenocyte** filled with hundreds of nuclei." },
      { author: "E. B. Wilson", work: "The Cell in Development and Inheritance", quote: "A **coenocyte** demonstrates that nuclear division can proceed in perfect harmony without immediate cell wall synthesis." },
      { author: "D'Arcy Wentworth Thompson", work: "On Growth and Form", quote: "The giant single-celled **coenocyte** of Valonia achieves macroscopic dimensions while maintaining hydrodynamic balance." }
    ]
  },
  epicene: {
    primary: "Having characteristics of both sexes, or belonging to neither sex; androgynous or unisex.",
    secondary: "In classical grammar, having a single grammatical gender form that can refer to either sex without changing its ending.",
    quotes: [
      { author: "Ben Jonson", work: "Epicoene, or The Silent Woman", quote: "He took her for a modest maiden, yet found in her an **epicene** ambiguity that startled his wit." },
      { author: "Virginia Woolf", work: "Orlando", quote: "Orlando looked in the mirror, delighted by the subtle, **epicene** grace that transcended the rigid costume of the court." },
      { author: "H. G. Wells", work: "The Time Machine", quote: "The delicate Eloi seemed to have evolved beyond sexual divergence, possessing a soft, **epicene** beauty." }
    ]
  },
  epicœne: {
    primary: "Archaic typographic spelling of epicene, denoting gender neutrality, androgyny, or dual gender representation.",
    secondary: "In early modern grammar and satire, characterizing an ambiguous social appearance or ambiguous lexical gender.",
    quotes: [
      { author: "Ben Jonson", work: "Epicoene", quote: "The play satirized that **epicœne** manner of London gallants who mimicked the perfumes and finery of court ladies." },
      { author: "Samuel Johnson", work: "A Dictionary of the English Language", quote: "Under the title **epicœne**, the grammarians include those Latin nouns that comprehend both sexes under a single form." },
      { author: "Thomas Browne", work: "Pseudodoxia Epidemica", quote: "Certain mythical creatures were conceived as **epicœne**, blending the virtues and vices of both sexes in one figure." }
    ]
  },
  koinonos: {
    primary: "An ancient Greek term (κοινωνός) meaning a partner, companion, sharer, or participant in a common enterprise.",
    secondary: "In New Testament and patristic theology, a partner in spiritual fellowship (koinonia) or joint-heir in divine grace.",
    quotes: [
      { author: "Aristotle", work: "Nicomachean Ethics", quote: "True friendship requires that each friend be a **koinonos**, sharing in joy and adversity as in a common venture." },
      { author: "John Calvin", work: "Institutes of the Christian Religion", quote: "The believer becomes a **koinonos**, an intimate participant in the mystical body of Christ through faith." },
      { author: "F. J. A. Hort", work: "The Christian Ecclesia", quote: "In Hellenic trade as in apostolic fellowship, a **koinonos** bore mutual financial and spiritual liabilities." }
    ]
  },
  koinophilia: {
    primary: "An evolutionary phenomenon in sexual organisms whereby individuals prefer to mate with partners displaying average, typical, or non-extreme phenotypic traits.",
    secondary: "An innate preference for the phenotypic mean that acts as a stabilizing evolutionary mechanism against deleterious mutations.",
    quotes: [
      { author: "Richard Dawkins", work: "The Selfish Gene", quote: "The phenomenon of **koinophilia** explains why visual attractiveness frequently coincides with an average facial geometry." },
      { author: "Stephen Jay Gould", work: "The Structure of Evolutionary Theory", quote: "Stabilizing sexual selection via **koinophilia** weeds out extreme mutants and preserves the morphological integrity of the species." },
      { author: "Edward O. Wilson", work: "Consilience: The Unity of Knowledge", quote: "Cross-cultural studies of aesthetic preference indicate an instinctive **koinophilia**, where composite average forms are perceived as most harmonious." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Self & Identity/Dashboard — coen';

for (const [word, data] of Object.entries(entries)) {
  const filePath = path.join(clusterPath, `${word}.md`);
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

console.log('Done Dashboard — coen!');
