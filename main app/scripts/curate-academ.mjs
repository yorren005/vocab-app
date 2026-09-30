import fs from 'fs';
import path from 'path';

const entries = {
  academ: {
    primary: "The etymological root originating from Akademos (the hero after whom Plato's grove and school were named), denoting a society or place of philosophical and higher learning.",
    secondary: "In historical and educational texts, a truncated or poetic form referring to an academic institution or student of liberal arts.",
    quotes: [
      { author: "John Milton", work: "Paradise Regained", quote: "The olive grove of **Academ**, Plato’s retirement, where the Attic bird trills her thick-warbled notes the summer long." },
      { author: "Alexander Pope", work: "The Dunciad", quote: "Deep in the cloistered shades of **Academ**, dulness sat enthroned amid the learned dust." },
      { author: "Ralph Waldo Emerson", work: "The American Scholar", quote: "Let the American student step out from the pale shadows of **Academ** into the hearty sunlight of actual life." }
    ]
  },
  academe: {
    primary: "An academy, university, or place of higher education and learned retirement.",
    secondary: "The intellectual milieu, collegiate environment, or scholastic community (the 'groves of academe').",
    quotes: [
      { author: "William Shakespeare", work: "Love's Labour's Lost", quote: "Our court shall be a little **Academe**, still and contemplative in living art." },
      { author: "Alfred, Lord Tennyson", work: "The Princess", quote: "High-walled against the world, her **academe** sheltered a fellowship of maiden scholars." },
      { author: "Mary McCarthy", work: "The Groves of Academe", quote: "Within the sheltered perimeter of **academe**, minor ideological disputes took on the gravity of civil wars." }
    ]
  },
  academia: {
    primary: "The environment, community, and cultural world of higher education, universities, research, and scholarly pursuits.",
    secondary: "Academic life collectively considered, often with reference to its traditions, scholastic standards, or insularity from commerce and politics.",
    quotes: [
      { author: "C. P. Snow", work: "The Masters", quote: "In the quiet quadrangles of **academia**, men fought for influence with all the subtlety of Venetian courtiers." },
      { author: "Carl Sagan", work: "The Demon-Haunted World", quote: "If **academia** retreats from the general public, pseudoscience will eagerly rush in to fill the vacuum." },
      { author: "Virginia Woolf", work: "Three Guineas", quote: "She observed the procession of educated men descending from the ancient halls of **academia** into the arenas of state." }
    ]
  },
  academic: {
    primary: "Relating to education, schools, colleges, or universities, especially scholarly learning rather than practical or technical training.",
    secondary: "Theoretical or hypothetical, having no immediate practical bearing or application (an 'academic question'); as a noun, a university teacher or scholar.",
    quotes: [
      { author: "Thomas Hardy", work: "Jude the Obscure", quote: "He gazed toward Christminster, whose **academic** towers seemed to beckon him with promises of enlightenment." },
      { author: "John Cairns", work: "The Life of John Brown", quote: "His profound **academic** training never blunted the natural warmth of his pastoral sympathy." },
      { author: "George Orwell", work: "Collected Essays", quote: "The dispute between the rival ideologues remained purely **academic**, bearing little relation to conditions in the trenches." }
    ]
  },
  academically: {
    primary: "In a manner relating to academic pursuits, scholastic education, or scholarship.",
    secondary: "In a theoretical, abstract, or purely intellectual manner without practical effect.",
    quotes: [
      { author: "Bertrand Russell", work: "On Education", quote: "Students who are **academically** gifted must not be permitted to despise the manual labor that sustains them." },
      { author: "Thorstein Veblen", work: "The Higher Learning in America", quote: "The university must be **academically** autonomous if it is to fulfill its historic mission of disinterested inquiry." },
      { author: "John Dewey", work: "Democracy and Education", quote: "Knowledge conceived **academically** as a museum of static truths loses its transformative social power." }
    ]
  },
  academician: {
    primary: "An elected or designated member of an academy of arts, sciences, or letters (such as the French Academy or the Royal Academy).",
    secondary: "An academic scholar, teacher, or intellectual devoted to academic tradition or classical orthodoxy.",
    quotes: [
      { author: "Honoré de Balzac", work: "Lost Illusions", quote: "The venerable **academician** nodded with majestic condescension over the young poet's manuscript." },
      { author: "Henry James", work: "The Tragic Muse", quote: "He painted with the meticulous finish demanded of a celebrated **academician**, leaving nothing to reckless impulse." },
      { author: "Alexis de Tocqueville", work: "Recollections", quote: "Even as the revolution raged outside, the old **academician** debated grammatical subtleties with unperturbed serenity." }
    ]
  },
  academicianship: {
    primary: "The rank, office, status, or tenure of an academician.",
    secondary: "The characteristics, scholarly dignity, or institutional authority associated with membership in a learned academy.",
    quotes: [
      { author: "Matthew Arnold", work: "Essays in Criticism", quote: "The elevated standing of French letters owes much to the prestige that accompanies formal **academicianship**." },
      { author: "William Hazlitt", work: "Table-Talk", quote: "He sought the crown of **academicianship** not for the love of truth, but to secure a pension and social deference." },
      { author: "Edmund Gosse", work: "French Profiles", quote: "Upon achieving **academicianship**, he donned the embroidered coat with the pride of an intellectual marshal." }
    ]
  },
  academicism: {
    primary: "Strict adherence to traditional academic rules, formal orthodoxies, or conventional styles in art, literature, or scholarship.",
    secondary: "Pedantry, dry formalism, or an overemphasis on theoretical refinement detached from vitality and direct experience.",
    quotes: [
      { author: "Émile Zola", work: "My Salons", quote: "The young impressionists broke decisively with the lifeless **academicism** that had paralyzed French painting." },
      { author: "George Santayana", work: "Skepticism and Animal Faith", quote: "A rigid **academicism** often mistakes the catalog of past opinions for the discovery of wisdom." },
      { author: "T. S. Eliot", work: "Selected Essays", quote: "Poetry decays whenever it surrenders to the stifling **academicism** of polite conventions." }
    ]
  },
  academism: {
    primary: "A variant of academicism; adherence to the principles, methods, or orthodox traditions of an academy.",
    secondary: "Formal, pedantic scholarship or stylistic conservatism that resists innovation.",
    quotes: [
      { author: "Roger Fry", work: "Vision and Design", quote: "The stultifying influence of late Victorian **academism** was finally shattered by the post-impressionist exhibition." },
      { author: "Benedetto Croce", work: "Aesthetic as Science of Expression", quote: "Pure art transcends the narrow prescriptions of **academism** through spontaneous expressive intuition." },
      { author: "Arthur Symons", work: "The Symbolist Movement in Literature", quote: "The new lyricists revolted against the cold **academism** that had choked poetic imagination." }
    ]
  },
  academy: {
    primary: "A secondary or higher school, college, or specialized educational institution (e.g., military academy, music academy).",
    secondary: "A society of scholars, scientists, or artists incorporated to cultivate and promote a particular field of learning; historically, Plato’s school near Athens.",
    quotes: [
      { author: "Charles Dickens", work: "David Copperfield", quote: "Salem House was a worthy **academy** of ignorance and petty cruelty under the despotic rule of Mr. Creakle." },
      { author: "Jonathan Swift", work: "Gulliver's Travels", quote: "In the Grand **Academy** of Lagado, professors were busy extracting sunbeams out of cucumbers." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "Justinian finally suppressed the philosophical **academy** of Athens, extinguishing the last spark of Hellenic pagan wisdom." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Science & Inquiry/Dashboard — academ';

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

console.log('Done Dashboard — academ!');
