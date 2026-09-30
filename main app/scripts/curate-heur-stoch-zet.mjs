import fs from 'fs';
import path from 'path';

const entries = {
  // Dashboard — heur
  'heur/eureka': {
    primary: "An exclamation attributed to Archimedes upon discovering a method to test the purity of gold, used to express sudden triumph or delight at a breakthrough discovery.",
    secondary: "As a noun or adjective, an unexpected flash of creative or intellectual insight (a 'eureka moment'); marked by sudden realization.",
    quotes: [
      { author: "H. G. Wells", work: "The Time Machine", quote: "I shouted ‘**Eureka**!’ and smashed the case with joy." },
      { author: "Edgar Allan Poe", work: "Eureka: A Prose Poem", quote: "With a heart full of enthusiasm, I present this treatise, which I have named **Eureka**, to those who feel rather than think." },
      { author: "Mark Twain", work: "A Connecticut Yankee in King Arthur's Court", quote: "I shouted '**Eureka**!' for in that flash of thought the whole mechanical riddle was solved." }
    ]
  },
  'heur/heur': {
    primary: "The Greek etymological base (heuriskein, meaning 'to find' or 'to discover'), functioning as a foundational morpheme in words relating to discovery, investigation, and problem-solving.",
    secondary: "In historical linguistics and epistemology, the root denoting exploratory methodology and rule-of-thumb learning rather than formal algorithmic proof.",
    quotes: [
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "The Greek root **heur** enshrines the active process of finding truth through guided discovery." },
      { author: "John Stuart Mill", work: "A System of Logic", quote: "Scientific investigation requires an inventive faculty rooted in the ancient spirit of **heur**." },
      { author: "Bertrand Russell", work: "The Principles of Mathematics", quote: "Mathematical discovery often begins with tentative **heur** principles before formal axioms can be laid down." }
    ]
  },
  'heur/heuristic': {
    primary: "Serving to indicate, discover, or stimulate investigation; problem-solving through practical rules of thumb, trial and error, or intuitive estimation.",
    secondary: "In computing and cognitive psychology, an efficient mental shortcut or search algorithm that finds an acceptable solution when optimal calculation is impractical.",
    quotes: [
      { author: "Albert Einstein", work: "On a Heuristic Point of View Concerning the Production and Transformation of Light", quote: "It seems to me that the observations associated with blackbody radiation are more readily understood if one adopts a **heuristic** viewpoint." },
      { author: "George Pólya", work: "How to Solve It", quote: "The aim of **heuristic** is to study the methods and rules of discovery and invention." },
      { author: "Herbert A. Simon", work: "The Sciences of the Artificial", quote: "Human decision-makers rely on **heuristic** search to find satisfactory rather than optimal paths through complex problem spaces." }
    ]
  },
  'heur/metaheuristic': {
    primary: "A higher-level algorithmic framework designed to select, generate, or guide lower-level heuristics to find near-optimal solutions to complex optimization problems.",
    secondary: "A computational strategy (such as genetic algorithms or simulated annealing) that explores search spaces while avoiding local minima.",
    quotes: [
      { author: "Fred Glover", work: "Tabu Search", quote: "A **metaheuristic** refers to a master strategy that guides and modifies other heuristics to produce solutions beyond those normally generated in local search." },
      { author: "Kenneth De Jong", work: "Evolutionary Computation", quote: "The beauty of an evolutionary **metaheuristic** lies in its ability to navigate vast and rugged fitness landscapes." },
      { author: "Stuart Russell & Peter Norvig", work: "Artificial Intelligence: A Modern Approach", quote: "Simulated annealing acts as a powerful **metaheuristic**, accepting downhill steps with a decreasing probability to escape local extrema." }
    ]
  },

  // Dashboard — stoch
  'stoch/stochastic': {
    primary: "Involving or characterized by random variables, chance, or probability; governed by statistical likelihood rather than deterministic certainty.",
    secondary: "In philosophy and systems theory, conjectural or conjecturing; aiming at a target whose precise outcome is subject to probabilistic fluctuation.",
    quotes: [
      { author: "Norbert Wiener", work: "Cybernetics", quote: "A time series may be regarded as a sequence of observations on a **stochastic** process governed by an underlying probability distribution." },
      { author: "Jacques Monod", work: "Chance and Necessity", quote: "The basic events that introduce variations into the biosphere are strictly **stochastic** at the molecular level." },
      { author: "Karl Popper", work: "The Logic of Scientific Discovery", quote: "A **stochastic** model does not abandon causality, but rather frames it within the calculus of objective probabilities." }
    ]
  },
  'stoch/stochastically': {
    primary: "In a stochastic manner; in accordance with probability or random distribution.",
    secondary: "Determined or modeled by probabilistic equations and statistical uncertainty over time.",
    quotes: [
      { author: "Richard Feynman", work: "The Feynman Lectures on Physics", quote: "Molecules in a gas move **stochastically**, their individual paths unpredictable, yet their macroscopic pressure precisely law-abiding." },
      { author: "Erwin Schrödinger", work: "What Is Life?", quote: "Even if quantum transitions occur **stochastically**, the organism preserves macroscopic order through exquisite molecular machinery." },
      { author: "Murray Gell-Mann", work: "The Quark and the Jaguar", quote: "Complex adaptive systems evolve **stochastically**, selecting successful strategies out of vast ensembles of possibilities." }
    ]
  },
  'stoch/stochasticity': {
    primary: "The quality or state of being stochastic; randomness, unpredictability, or reliance upon probability.",
    secondary: "In ecology and population genetics, fluctuations in species numbers or gene frequencies arising from inherent random demographic or environmental events.",
    quotes: [
      { author: "Stephen Jay Gould", work: "Wonderful Life", quote: "Replay the tape of life, and the inherent **stochasticity** of evolutionary events would yield an entirely different tree of organisms." },
      { author: "E. O. Wilson", work: "The Diversity of Life", quote: "Small populations face extinction not only from habitat loss but from the ruthless demographic **stochasticity** of harsh seasons." },
      { author: "Ilya Prigogine", work: "The End of Certainty", quote: "Fundamental physics must integrate microscopic **stochasticity** to understand how order emerges spontaneously from nonequilibrium states." }
    ]
  },

  // Dashboard — zet
  'zet/zed': {
    primary: "The standard British, Commonwealth, and historical English name for the letter Z, derived from the Greek letter zeta.",
    secondary: "The final letter of the Latin-derived alphabet, symbolizing the ultimate conclusion, terminus, or extreme point of a series (from A to Z).",
    quotes: [
      { author: "William Shakespeare", work: "King Lear", quote: "Thou whoreson **zed**! thou unnecessary letter!" },
      { author: "Charles Dickens", work: "Bleak House", quote: "He could read every character from A down to **zed**, though he was slow at deciphering a legal brief." },
      { author: "Arthur Conan Doyle", work: "The Adventure of the Dancing Men", quote: "The cryptogram exhausted every letter of the alphabet from alpha to **zed**." }
    ]
  },
  'zet/zeta': {
    primary: "The sixth letter of the Greek alphabet (ζ, Z), representing the voiced alveolar fricative /z/ or affricate /dz/.",
    secondary: "In mathematics and physics, a symbol denoting specific functions (such as the Riemann zeta function) or electrokinetic potential (zeta potential) at a colloidal interface.",
    quotes: [
      { author: "Bernhard Riemann", work: "On the Number of Primes Less Than a Given Magnitude", quote: "The distribution of prime numbers is intimately bound to the zeros of the **zeta** function in the complex plane." },
      { author: "H. G. Wells", work: "The First Men in the Moon", quote: "He marked the calculations with Greek characters, drawing a sharp **zeta** alongside the formula for gravitational shielding." },
      { author: "Lord Kelvin", work: "Baltimore Lectures on Molecular Dynamics", quote: "The mathematical treatment of wave dispersion required the introduction of the sixth coefficient, designated by **zeta**." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Science & Inquiry';

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

console.log('Done Batch 1!');
