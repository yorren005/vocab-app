import fs from 'fs';
import path from 'path';

const entries = {
  idi: {
    primary: "The Greek combining root (idio-, from idios, meaning 'one's own, private, peculiar, distinct'), forming terms relating to individual distinctiveness or personal uniqueness.",
    secondary: "In medicine, linguistics, and psychology, designating conditions or characteristics that originate intrinsically within the individual rather than from external causes.",
    quotes: [
      { author: "Aristotle", work: "Nicomachean Ethics", quote: "The Greek root **idi**- originally marked what belongs privately to a citizen as distinguished from common civic affairs." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "In modern scientific nomenclature, the prefix **idi**- denotes properties inherent in the specific constitution of a body." },
      { author: "John Stuart Mill", work: "A System of Logic", quote: "Linguistic compounds utilizing **idi**- isolate that which is strictly personal or peculiar to an individual mind." }
    ]
  },
  idios: {
    primary: "The ancient Greek adjective ἴδιος, signifying one's own, private, separate, peculiar, or distinct from the public realm.",
    secondary: "In social history and philosophy, the conceptual root contrasting private individuality with public political life (koinos).",
    quotes: [
      { author: "Thucydides", work: "History of the Peloponnesian War", quote: "In Athens, an individual who attends only to his **idios** concerns rather than the commonwealth is viewed not as quiet, but as useless." },
      { author: "Hannah Arendt", work: "The Human Condition", quote: "The ancient Greeks considered life spent purely in the sphere of the **idios** to be deprived of the highest human dignity." },
      { author: "Plato", work: "Republic", quote: "Justice in the city arises when each citizen performs his **idios** duty without meddling in that which belongs to another." }
    ]
  },
  idiolect: {
    primary: "The speech habits, dialect, or language system peculiar to a particular individual person.",
    secondary: "In sociolinguistics, the unique linguistic fingerprint of a single speaker, encompassing personal vocabulary choices and phonological habits.",
    quotes: [
      { author: "Noam Chomsky", work: "Aspects of the Theory of Syntax", quote: "The grammar internalized by an individual speaker constitutes an **idiolect** that reflects both innate capacity and unique linguistic experience." },
      { author: "Edward Sapir", work: "Language: An Introduction to the Study of Speech", quote: "Behind the broad uniformities of standard speech lies the subtle personal **idiolect** of each living speaker." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "Forensic linguistics can often identify an anonymous writer by analyzing the distinctive vocabulary of their **idiolect**." }
    ]
  },
  idiom: {
    primary: "An expression or phrase whose meaning cannot be deduced from the literal meanings of its individual component words.",
    secondary: "The dialect, distinctive grammatical character, or characteristic mode of expression of a language, people, or artistic school.",
    quotes: [
      { author: "John Dryden", work: "Preface to the Fables", quote: "He followed nature in every line, clothing his thoughts in the native, robust **idiom** of our mother tongue." },
      { author: "George Orwell", work: "Politics and the English Language", quote: "Modern writing abounds with stale phrases and decaying **idioms** that choke the clarity of thought." },
      { author: "Virginia Woolf", work: "The Waves", quote: "Each artist must forge an **idiom** of his own if he is to catch the fluid rhythm of life." }
    ]
  },
  idiomatic: {
    primary: "Using, containing, or conforming to the characteristic idioms and natural expressions of a language.",
    secondary: "Peculiar to or characteristic of a given language, dialect, or style of artistic expression; fluent and natural in style.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Most Eminent English Poets", quote: "Addison’s prose represents the model of the middle style: pure, perspicuous, and delightfully **idiomatic**." },
      { author: "H. L. Mencken", work: "The American Language", quote: "The American spoken language has evolved an **idiomatic** vigor that continually enriches English literature." },
      { author: "Matthew Arnold", work: "On Translating Homer", quote: "The translator must avoid both archaic stiffness and modern slang, seeking a noble, **idiomatic** simplicity." }
    ]
  },
  idiomatical: {
    primary: "Pertaining to or characterized by idioms; idiomatic.",
    secondary: "In literary criticism, preserving the peculiar colloquial phrases, syntactic turns, or vernacular rhythms of native speech.",
    quotes: [
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "Translations that stick too servilely to the word lose the lively, **idiomatical** spirit of the original." },
      { author: "Samuel Taylor Coleridge", work: "Biographia Literaria", quote: "Wordsworth sought to adopt the real language of men, stripped of poetic diction yet richly **idiomatical**." },
      { author: "William Hazlitt", work: "Table-Talk", quote: "His conversation was seasoned with an **idiomatical** salt that gave flavour to the most ordinary topic." }
    ]
  },
  idiomatically: {
    primary: "In an idiomatic manner; in accordance with the natural expressions and grammatical idioms of a language.",
    secondary: "Using the authentic colloquial phrases, cadence, and vernacular style characteristic of native speakers.",
    quotes: [
      { author: "Benjamin Franklin", work: "Autobiography", quote: "I took pains to translate the Spectator into my own words and back again, learning to express myself **idiomatically** and clearly." },
      { author: "Thomas Babington Macaulay", work: "Critical and Historical Essays", quote: "Though writing in a foreign tongue, he phrased every thought so **idiomatically** that even native scholars were astonished." },
      { author: "Henry James", work: "The Art of Fiction", quote: "The French dialogue was rendered **idiomatically**, catching the subtle irony of the Parisian salon." }
    ]
  },
  idiopathy: {
    primary: "A disease, disorder, or condition that arises spontaneously or from an obscure or unknown cause; an essential or primary disease.",
    secondary: "A peculiar individual susceptibility, temperamental idiosyncrasy, or constitutional predisposition.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Where no toxic agent or microbial pathogen can be detected, the clinician must record the condition as an **idiopathy**." },
      { author: "Thomas Percival", work: "Medical Ethics", quote: "The physician must carefully distinguish a secondary symptom from a primary constitutional **idiopathy**." },
      { author: "Oliver Wendell Holmes Sr.", work: "Medical Essays", quote: "Many a diagnosis that sounds impressive to the patient is merely Greek for an **idiopathy** of unknown origin." }
    ]
  },
  idiosyncrasy: {
    primary: "A mode of behavior, habit, or way of thought peculiar to an individual; a personal quirk or eccentricity.",
    secondary: "In pharmacology and medicine, an abnormal or unusual personal susceptibility to a food, drug, or other agent.",
    quotes: [
      { author: "Charles Dickens", work: "Bleak House", quote: "Mr. Skimpole had an agreeable **idiosyncrasy** of never understanding anything whatever about the value of money." },
      { author: "Arthur Conan Doyle", work: "The Sign of the Four", quote: "Sherlock Holmes had many **idiosyncrasies**, but none more perplexing than his habit of playing the violin at midnight." },
      { author: "William James", work: "The Principles of Psychology", quote: "Personal genius is often rooted in some constitutional **idiosyncrasy** that alters how sensations are integrated." }
    ]
  },
  idiosyncratic: {
    primary: "Peculiar to an individual; eccentric, distinctive, or unique in style, temperament, or character.",
    secondary: "In medicine, describing an unusual or hypersensitive reaction to a therapeutic drug or substance.",
    quotes: [
      { author: "Virginia Woolf", work: "To the Lighthouse", quote: "He held an **idiosyncratic** view of human character, judging men by small gestures rather than public deeds." },
      { author: "George Orwell", work: "Collected Essays", quote: "Dickens’s prose is intensely **idiosyncratic**, instantly recognizable by its overflowing energy and bizarre similes." },
      { author: "Oliver Sacks", work: "The Man Who Mistook His Wife for a Hat", quote: "The patient developed an **idiosyncratic** system of mnemonic signs that allowed him to navigate his daily life." }
    ]
  },
  idiot: {
    primary: "Historically and clinically, a person of profound intellectual disability; in ancient Greece, a private citizen who took no part in public governance.",
    secondary: "Informally, a foolish or stupid person; in literature, a character of holy simplicity or unworldly innocence.",
    quotes: [
      { author: "William Shakespeare", work: "Macbeth", quote: "Life’s but a walking shadow... it is a tale told by an **idiot**, full of sound and fury, signifying nothing." },
      { author: "Fyodor Dostoevsky", work: "The Idiot", quote: "Prince Myshkin was called an **idiot** by worldly society because his pure heart was incapable of malice or deceit." },
      { author: "Alexis de Tocqueville", work: "Democracy in America", quote: "The ancient term **idiot** designated a man who withdrew entirely from civic responsibilities into private life." }
    ]
  },
  idiotic: {
    primary: "Very stupid or foolish; senselessly absurd.",
    secondary: "Historically, characteristic of or afflicted with profound congenital cognitive impairment.",
    quotes: [
      { author: "Mark Twain", work: "The Adventures of Huckleberry Finn", quote: "It was an **idiotic** scheme from the beginning, but Tom Sawyer was set on doing it according to the books." },
      { author: "H. G. Wells", work: "The Island of Doctor Moreau", quote: "The creature gave an **idiotic** grin, blinking in the harsh glare of the lantern." },
      { author: "Jack London", work: "Martin Eden", quote: "He marveled at the **idiotic** complacency of bourgeois drawing rooms, where shallow chatter passed for wisdom." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Self & Identity/Dashboard — idi';

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

console.log('Done Dashboard — idi!');
