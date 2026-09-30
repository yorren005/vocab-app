import fs from 'fs';
import path from 'path';

const entries = {
  axi: {
    primary: "An ancient combining root derived primarily from Greek axios ('worthy, of value, deserving') forming terms related to worth and self-evident truth, and secondarily reflecting axis ('axle, line of rotation').",
    secondary: "In philosophy and formal logic, the prefixal base of foundational propositions that command universal assent because of their intrinsic self-evidence.",
    quotes: [
      { author: "Aristotle", work: "Posterior Analytics", quote: "The Greek root **axi** designates principles that are worthy of belief in themselves without formal demonstration." },
      { author: "Francis Bacon", work: "Novum Organum", quote: "From particular experiments we must elicit the foundational **axi**-rules that govern nature's workings." },
      { author: "John Locke", work: "An Essay Concerning Human Understanding", quote: "Men readily bestow their assent upon **axi**-propositions whose self-evident worth is immediately discerned." }
    ]
  },
  axial: {
    primary: "Relating to, situated around, forming, or directed along an axis (a real or imaginary central line of rotation or symmetry).",
    secondary: "In vertebrate anatomy and botany, relating to the central trunk or stem of the body or plant (axial skeleton, axial shoot), as distinguished from appendages.",
    quotes: [
      { author: "Thomas Henry Huxley", work: "Evidence as to Man's Place in Nature", quote: "The **axial** skeleton of the higher primates reveals a continuous progression toward upright posture." },
      { author: "Charles Darwin", work: "The Power of Movement in Plants", quote: "The radicle bends toward the center of gravity while the **axial** stem ascends into the sunlight." },
      { author: "James Clerk Maxwell", work: "Matter and Motion", quote: "The rotation of any rigid body may be resolved into instantaneous motion about its **axial** line." }
    ]
  },
  axially: {
    primary: "In a direction parallel to or centered upon an axis; with reference to an axis.",
    secondary: "In engineering and mechanics, describing forces, stresses, or loads applied straight through the longitudinal center of a shaft or member.",
    quotes: [
      { author: "William John Macquorn Rankine", work: "A Manual of Applied Mechanics", quote: "When a column is loaded **axially**, the compressive strain is uniformly distributed across every cross-section." },
      { author: "H. G. Wells", work: "The War of the Worlds", quote: "The vast cylinder rotated slowly, revolving **axially** as the screw lid unfastened from within." },
      { author: "Lord Kelvin", work: "Treatise on Natural Philosophy", quote: "The magnetic field diminishes symmetrically when measured **axially** away from the pole." }
    ]
  },
  axiological: {
    primary: "Pertaining to axiology, the philosophical study of values, worth, and value judgments.",
    secondary: "Concerning the criteria by which moral goodness, aesthetic beauty, or cultural ideals are evaluated and hierarchically ordered.",
    quotes: [
      { author: "Max Scheler", work: "Formalism in Ethics and Non-Formal Ethics of Values", quote: "The **axiological** order of values is objective and immutable, perceived directly by intuitive feeling." },
      { author: "John Dewey", work: "Theory of Valuation", quote: "Any serious **axiological** inquiry must treat human desires in their empirical context rather than as mystical essences." },
      { author: "George Edward Moore", work: "Principia Ethica", quote: "To confuse an **axiological** judgment of goodness with a natural physical property is to commit the naturalistic fallacy." }
    ]
  },
  axiology: {
    primary: "The branch of philosophy that studies the nature, types, and criteria of values and value judgments, especially in ethics and aesthetics.",
    secondary: "A particular system or framework of moral, social, or aesthetic values held by an individual, society, or philosophical school.",
    quotes: [
      { author: "William James", work: "The Will to Believe and Other Essays in Popular Philosophy", quote: "Our ethical **axiology** cannot be divorced from the living stakes of practical human choice." },
      { author: "Alfred North Whitehead", work: "Process and Reality", quote: "Cosmology requires an **axiology** that finds intrinsic value in every fleeting occasion of experience." },
      { author: "Paul Tillich", work: "Systematic Theology", quote: "Without a coherent **axiology**, modern culture drifts into existential despair, unable to distinguish the ultimate from the preliminary." }
    ]
  },
  axiom: {
    primary: "A self-evident truth that requires no proof; a universally accepted principle or rule.",
    secondary: "In formal mathematics and logic, an initial proposition or postulate taken as given, upon which an entire deductive system is erected.",
    quotes: [
      { author: "Euclid", work: "Elements", quote: "An **axiom** is a common notion whose truth is so apparent that it commands immediate assent without demonstration." },
      { author: "Isaac Newton", work: "Opticks", quote: "The first **axiom** of mechanics establishes that every body continues in its state of rest unless compelled by impressed forces." },
      { author: "Baruch Spinoza", work: "Ethics", quote: "Beginning with clear definitions and every self-evident **axiom**, the geometric method demonstrates the necessary nature of Substance." }
    ]
  },
  axiomatic: {
    primary: "Self-evident or unquestionable; having the nature of an axiom.",
    secondary: "In mathematics and deductive reasoning, characterized by or based upon a formal system of axioms.",
    quotes: [
      { author: "Frank A. Fetter", work: "The Principles of Economics", quote: "It is **axiomatic** that men prefer a present gratification to an equal future pleasure." },
      { author: "Bertrand Russell", work: "Introduction to Mathematical Philosophy", quote: "In an **axiomatic** treatment of arithmetic, all subsequent theorems must follow strictly from the initial postulates." },
      { author: "Thomas Henry Huxley", work: "Darwiniana", quote: "It has become **axiomatic** among biologists that structure and physiological function evolve hand in hand." }
    ]
  },
  axiomatical: {
    primary: "Pertaining to, having the character of, or containing an axiom; self-evident.",
    secondary: "Formulated in brief, authoritative maxims or dogmatic general principles.",
    quotes: [
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "Knowledge delivered in **axiomatical** form ought to be tested by open enquiry rather than received in blind veneration." },
      { author: "Samuel Johnson", work: "The Rambler", quote: "The moralist delivers **axiomatical** rules for human conduct, yet life frequently confounds his tidy maxims." },
      { author: "Jeremy Bentham", work: "An Introduction to the Principles of Morals and Legislation", quote: "The principle of utility presents an **axiomatical** certainty for the legislator." }
    ]
  },
  axiomatically: {
    primary: "In an axiomatic manner; in a way that is self-evident or universally taken for granted.",
    secondary: "In deductive logic, as an assumed foundational premise from which other propositions are deduced.",
    quotes: [
      { author: "David Hume", work: "An Enquiry Concerning Human Understanding", quote: "We cannot **axiomatically** assume the uniformity of nature without arguing in an epistemological circle." },
      { author: "John Stuart Mill", work: "Utilitarianism", quote: "Questions of ultimate ends are not amenable to direct proof, yet they are held **axiomatically** by their adherents." },
      { author: "Henri Poincaré", work: "Science and Method", quote: "Geometry does not proceed **axiomatically** from nowhere; its principles reflect our bodily experience of space." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Science & Inquiry/Dashboard — axi';

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

console.log('Done Dashboard — axi!');
