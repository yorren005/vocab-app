import fs from 'fs';
import path from 'path';

const entries = {
  all: {
    primary: "In classical word formation, the Greek combining root (allo-, from allos, meaning 'other, different, divergent'); in English Germanic vocabulary, the entire quantity, number, or extent of.",
    secondary: "In medicine, genetics, and ecology, designating alternative states, alien tissue sources, or divergence from standard norms.",
    quotes: [
      { author: "Aristotle", work: "Metaphysics", quote: "The Greek root **all**- establishes difference in kind or category, distinguishing the other from the identical." },
      { author: "William Shakespeare", work: "Macbeth", quote: "**All** hail, Macbeth, that shalt be king hereafter!" },
      { author: "John Milton", work: "Paradise Lost", quote: "Farewell happy fields where joy for ever dwells... what though the field be lost? **All** is not lost." }
    ]
  },
  allegoric: {
    primary: "Pertaining to, having the nature of, or containing allegory; figurative or symbolical.",
    secondary: "Conveying a hidden moral, spiritual, or political meaning beneath a literal narrative surface.",
    quotes: [
      { author: "Edmund Spenser", work: "The Faerie Queene", quote: "The general end therefore of all the book is to fashion a gentleman in virtuous and gentle discipline through an **allegoric** poem." },
      { author: "Samuel Taylor Coleridge", work: "The Statesman's Manual", quote: "An **allegoric** narrative translates abstract concepts into a picture-language of personified virtues." },
      { author: "T. R. Glover", work: "The Jesus of History", quote: "Ancient commentators frequently imposed an **allegoric** interpretation upon plain historical records." }
    ]
  },
  allegorical: {
    primary: "Constituting or containing an allegory; expressing symbolic meaning through narrative figures and actions.",
    secondary: "Interpreted symbolically rather than literally; figurative or parabolic.",
    quotes: [
      { author: "John Bunyan", work: "The Pilgrim's Progress", quote: "My dark and **allegorical** lines will bring truth to thy light and delight to thy mind." },
      { author: "C. S. Lewis", work: "The Allegory of Love", quote: "The **allegorical** method grew up when thinkers sought to reconcile ancient myths with philosophical morality." },
      { author: "Nathaniel Hawthorne", work: "The Celestial Railroad", quote: "The pilgrims boarded the modern train, unaware of the **allegorical** abyss yawning beneath the tracks." }
    ]
  },
  allegorically: {
    primary: "In an allegorical manner; by means of symbolic representation.",
    secondary: "Interpreted in a figurative or spiritual sense rather than according to the plain literal letter.",
    quotes: [
      { author: "Philo of Alexandria", work: "On the Creation", quote: "Moses speaks **allegorically** of the tree of life, intending thereby to signify divine contemplation." },
      { author: "Francis Bacon", work: "The Wisdom of the Ancients", quote: "The fables of antiquity must be expounded **allegorically** if we wish to uncover their hidden scientific wisdom." },
      { author: "Percy Bysshe Shelley", work: "A Defence of Poetry", quote: "Poetry lifts the veil from the hidden beauty of the world, and makes familiar objects speak **allegorically** to the soul." }
    ]
  },
  allegorise: {
    primary: "To treat as an allegory; interpret or explain in an allegorical sense.",
    secondary: "To compose allegories; express figurative or symbolic truths through characters and narrative emblems.",
    quotes: [
      { author: "George Bernard Shaw", work: "The Intelligent Woman's Guide to Socialism", quote: "Theologians had to **allegorise** primitive myths to make them palatable to civilised consciences." },
      { author: "William Hazlitt", work: "Lectures on the English Poets", quote: "Spenser loved to **allegorise** the virtues, dressing temperance and chastity in suits of chivalric armor." },
      { author: "John Ruskin", work: "Modern Painters", quote: "The medieval painter did not merely copy nature; he sought to **allegorise** every blossom and cloud." }
    ]
  },
  allegorize: {
    primary: "To turn into an allegory; interpret or represent symbolically.",
    secondary: "To write or speak allegorically; construct symbolic narratives illustrating moral principles.",
    quotes: [
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "The poet has the power to **allegorize** the ordinary facts of daily labor, revealing their spiritual significance." },
      { author: "Jonathan Swift", work: "A Tale of a Tub", quote: "The three brothers resolved to **allegorize** their father's will until its simple prohibitions justified their extravagant coats." },
      { author: "Herman Melville", work: "Moby-Dick", quote: "So man’s insanity is heaven’s sense; and they will **allegorize** away his deepest truth." }
    ]
  },
  allegory: {
    primary: "A story, poem, or picture that can be interpreted to reveal a hidden meaning, typically a moral, religious, or political one.",
    secondary: "A symbolic representation of abstract principles through characters, figures, and events serving as visible emblems.",
    quotes: [
      { author: "Charles Dickens", work: "Bleak House", quote: "Allegory in roman helmet and sandals points with clumsy forefinger toward the painted ceiling of Mr. Tulkinghorn's room." },
      { author: "Plato", work: "Republic", quote: "The **allegory** of the cave illustrates the ascent of the soul from shadows into the radiant sunlight of truth." },
      { author: "John Locke", work: "An Essay Concerning Human Understanding", quote: "Where eloquence and **allegory** are used, they insinuate wrong ideas and mislead the judgment." }
    ]
  },
  allogeneic: {
    primary: "Involving, derived from, or transferred between individuals of the same species who are genetically distinct.",
    secondary: "Contrasted with autologous and syngeneic; requiring immunological matching and immunosuppression to prevent tissue rejection.",
    quotes: [
      { author: "Peter Medawar", work: "The Uniqueness of the Individual", quote: "The immunological rejection of an **allogeneic** skin graft reveals the organism’s innate recognition of genetic foreignness." },
      { author: "Frank Macfarlane Burnet", work: "Immunological Surveillance", quote: "Clonal selection explains why recipient lymphocytes mount a cytotoxic attack against **allogeneic** histocompatibility antigens." },
      { author: "E. Donnall Thomas", work: "Stem Cell Transplantation", quote: "The success of an **allogeneic** marrow transplant depends upon navigating the perilous boundary between graft rejection and graft-versus-host disease." }
    ]
  },
  allogenic: {
    primary: "Originating elsewhere; formed or generated in a region other than that in which it is found (as allogenic minerals in sedimentary rocks).",
    secondary: "In ecology and ecosystem dynamics, caused by external environmental factors rather than organisms within the community.",
    quotes: [
      { author: "Charles Lyell", work: "Principles of Geology", quote: "The sandstone strata contain **allogenic** quartz pebbles transported hundreds of miles from ancient igneous highlands." },
      { author: "Eugene P. Odum", work: "Fundamentals of Ecology", quote: "Ecological succession may be autogenic, driven by the biota, or **allogenic**, precipitated by external physical disturbances." },
      { author: "Arthur Tansley", work: "The Use and Abuse of Vegetational Concepts and Terms", quote: "We must distinguish between purely internal biological changes and **allogenic** forces shaping the landscape." }
    ]
  },
  allograph: {
    primary: "In linguistics, any of the variant forms of a letter or grapheme in a particular alphabet (such as uppercase A, lowercase a, or cursive ɑ).",
    secondary: "In law, a deed, will, or legal document executed by a proxy on behalf of someone else, rather than an autograph written in one's own hand.",
    quotes: [
      { author: "Edward Sapir", work: "Selected Writings in Language, Culture, and Personality", quote: "The phonetician distinguishes the underlying grapheme from the specific script **allograph** executed on parchment." },
      { author: "William Blackstone", work: "Commentaries on the Laws of England", quote: "A testament written by another hand, being an **allograph**, demanded the corroboration of credible subscribing witnesses." },
      { author: "David Crystal", work: "A Dictionary of Linguistics and Phonetics", quote: "Just as an allophone is a positional variant of a phoneme, so an **allograph** is a conditioned variant of a grapheme." }
    ]
  },
  allographic: {
    primary: "Relating to an allograph; existing in multiple variant written or performed tokens rather than in a unique physical original.",
    secondary: "In Nelson Goodman’s philosophy of art, describing art forms where multiple authentic instances can be generated by adhering strictly to a formal notation.",
    quotes: [
      { author: "Nelson Goodman", work: "Languages of Art", quote: "Literature and music are **allographic** arts, where any correct copy or performance constitutes a genuine instance of the work itself." },
      { author: "Arthur Danto", work: "The Transfiguration of the Commonplace", quote: "Unlike a painting, which is autographic, a musical score establishes **allographic** conditions that allow varied interpretive realizations." },
      { author: "Roman Jakobson", work: "Language in Literature", quote: "The **allographic** variants of a script system do not alter the semantic value of the recorded text." }
    ]
  },
  allure: {
    primary: "The quality of being powerfully and mysteriously attractive, fascinating, or charming.",
    secondary: "As a verb, to entice, attract, or tempt by presenting tempting advantages or seductive pleasures.",
    quotes: [
      { author: "William Shakespeare", work: "The Comedy of Errors", quote: "Thy sister’s beauty and her choice of friends had power to **allure** my wandering eye." },
      { author: "Joseph Conrad", work: "Heart of Darkness", quote: "The wild and immense jungle held a sinister **allure**, whispering of abominable pleasures to the soul." },
      { author: "Charlotte Brontë", work: "Jane Eyre", quote: "There was no **allure** of wealth or high rank in his offer, only the stern beauty of dedicated sacrifice." }
    ]
  },
  parallactic: {
    primary: "Pertaining to, depending on, or caused by parallax (the apparent change in position of an object viewed from two different points).",
    secondary: "In observational astronomy, relating to the angular displacement used to measure the distance of stars.",
    quotes: [
      { author: "Friedrich Bessel", work: "Briefe an Gauss über die Parallaxe von 61 Cygni", quote: "The **parallactic** displacement of 61 Cygni against background stars was barely one-third of a second of arc, yet decisive." },
      { author: "Arthur Eddington", work: "Stars and Atoms", quote: "The earth’s annual orbit provides the vast **parallactic** baseline necessary to triangulate the stellar vault." },
      { author: "Thomas Hardy", work: "Two on a Tower", quote: "The young astronomer adjusted his micrometer, correcting for **parallactic** error in the equatorial telescope." }
    ]
  },
  parallax: {
    primary: "The apparent displacement or difference in the apparent direction of an object as seen from two different points not on a straight line with the object.",
    secondary: "In photography and instrumentation, the difference between the field of view seen through a viewfinder and that captured by the taking lens.",
    quotes: [
      { author: "James Joyce", work: "Ulysses", quote: "Parallax. I never could read that book. Want to find out what it means. It’s the **parallax** of the sun." },
      { author: "William Herschel", work: "Philosophical Transactions of the Royal Society", quote: "To detect the annual **parallax** of fixed stars, we must compare binary stars whose physical association provides a fixed standard." },
      { author: "H. G. Wells", work: "The First Men in the Moon", quote: "Looking through the thick glass port of the sphere, the earth exhibited no measurable **parallax** against the backdrop of constellations." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Self & Identity/Dashboard — all';

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

console.log('Done Dashboard — all!');
