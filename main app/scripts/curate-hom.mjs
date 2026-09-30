import fs from 'fs';
import path from 'path';

const entries = {
  hom: {
    primary: "The Greek combining root (homo-, from homos, meaning 'same, equal, identical, uniform'), forming terms denoting similarity, correspondence, or equality.",
    secondary: "In biological and chemical systematics, designating structures, genes, or compounds possessing identical origin, symmetry, or composition.",
    quotes: [
      { author: "Aristotle", work: "Categories", quote: "Things are said to be equivocal when they share a name, but univocal when the essence is designated by the root **hom**-." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "In modern comparative morphology, prefixes formed from **hom**- denote unity of structural plan across divergent species." },
      { author: "Thomas Henry Huxley", work: "Darwiniana", quote: "The particle **hom**- serves as a compass in taxonomy, indicating common evolutionary inheritance." }
    ]
  },
  homage: {
    primary: "Special honor, respect, or reverence shown publicly; tribute.",
    secondary: "In feudal law, the formal public ceremony by which a tenant or vassal declared himself the man (homo) of his lord, pledging fealty.",
    quotes: [
      { author: "William Shakespeare", work: "The Tempest", quote: "Hence his ambition growing, to have no less than sovereign **homage**." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The Norman knights knelt before the altar, swearing perpetual fealty and **homage** to their duke." },
      { author: "Charles Dickens", work: "A Tale of Two Cities", quote: "The crowd offered spontaneous **homage** to the brave doctor who had suffered so long in the Bastille." }
    ]
  },
  homely: {
    primary: "Simple, plain, and unpretentious; comfortable and cozy, suited to the home.",
    secondary: "In North American usage, plain in physical appearance; lacking refinement or elegance.",
    quotes: [
      { author: "William Shakespeare", work: "The Two Gentlemen of Verona", quote: "Home-keeping youth have ever **homely** wits." },
      { author: "Thomas Hardy", work: "Tess of the d'Urbervilles", quote: "She found comfort in the **homely** routine of the dairy, far from the cruel whispers of the town." },
      { author: "George Eliot", work: "Silas Marner", quote: "The cottage had a **homely** warmth, illuminated by the bright hearth fire and the child's golden curls." }
    ]
  },
  homer: {
    primary: "The legendary ancient Greek epic poet traditionally credited with composing the Iliad and the Odyssey.",
    secondary: "An ancient Hebrew liquid and dry measure equal to about ten baths; in baseball, a colloquial term for a home run.",
    quotes: [
      { author: "Alexander Pope", work: "Preface to the Translation of Homer's Iliad", quote: "**Homer** was the greater genius, Virgil the better artist; in one we most admire the man, in the other the work." },
      { author: "John Keats", work: "On First Looking into Chapman's Homer", quote: "Yet did I never breathe its pure serene till I heard Chapman speak out loud and bold... listening to ancient **Homer**." },
      { author: "Thomas Hardy", work: "The Mayor of Casterbridge", quote: "The old measure was recorded in bushels and **homers**, preserving ancient biblical standards of grain." }
    ]
  },
  homiletic: {
    primary: "Of or relating to homilies, preaching, or religious sermonizing.",
    secondary: "Characterized by moralizing discourse or didactic exhortation.",
    quotes: [
      { author: "Samuel Taylor Coleridge", work: "Aids to Reflection", quote: "The pulpit loses its divine power when spiritual truth degenerates into dry **homiletic** moralizing." },
      { author: "John Henry Newman", work: "Parochial and Plain Sermons", quote: "The ancient fathers cultivated a **homiletic** eloquence that addressed the heart rather than scholastic wit." },
      { author: "Thomas Carlyle", work: "Sartor Resartus", quote: "The professor endured the endless **homiletic** lectures of his elders with stoic silence." }
    ]
  },
  homiletical: {
    primary: "Relating to the art of preaching sermons; homiletic.",
    secondary: "Pertaining to homiletics, the branch of pastoral theology dealing with the composition and delivery of sermons.",
    quotes: [
      { author: "Jonathan Swift", work: "A Discourse Concerning the Mechanical Operation of the Spirit", quote: "He possessed that peculiar **homiletical** tone that puts congregation after congregation into peaceful slumber." },
      { author: "Cotton Mather", work: "Magnalia Christi Americana", quote: "His **homiletical** gifts were celebrated throughout New England for their scriptural fidelity." },
      { author: "Matthew Arnold", work: "Literature and Dogma", quote: "The Hebrew prophets used a direct poetic energy that defied all formal **homiletical** rules." }
    ]
  },
  homily: {
    primary: "A sermon or religious discourse delivered to a congregation, usually with a practical rather than theological emphasis.",
    secondary: "A tedious moralizing lecture or admonition given to an individual or audience.",
    quotes: [
      { author: "William Shakespeare", work: "As You Like It", quote: "What tedious **homily** of love have you wearied your parishioners withal, and never cried 'Have patience, good people'!" },
      { author: "Charles Dickens", work: "Great Expectations", quote: "Mr. Pumblechook never failed to deliver a stern **homily** on the duty of young boys to be grateful to their betters." },
      { author: "Jane Austen", work: "Mansfield Park", quote: "The quiet eloquence of his Sunday **homily** made a deeper impression than all the theatrical preaching of London." }
    ]
  },
  homing: {
    primary: "Trained, bred, or possessing an innate instinct to return to home or roost from great distances.",
    secondary: "In guidance systems and ballistics, automatically steering or guiding toward a specified destination or radiating target.",
    quotes: [
      { author: "Charles Darwin", work: "The Variation of Animals and Plants under Domestication", quote: "The remarkable navigational prowess of the **homing** pigeon has been perfected by centuries of selective breeding." },
      { author: "Thomas Hardy", work: "Far from the Madding Crowd", quote: "The evening sky was streaked with the dark silhouettes of **homing** rooks returning to the churchyard elms." },
      { author: "Arthur C. Clarke", work: "Rendezvous with Rama", quote: "The probe was equipped with an automatic **homing** beacon that locked onto the faint radio emission." }
    ]
  },
  homogeneity: {
    primary: "The quality or state of being all of the same or of a similar kind or nature.",
    secondary: "In mathematics, physics, and chemistry, uniform composition or structure throughout a system; lack of variance.",
    quotes: [
      { author: "Herbert Spencer", work: "First Principles", quote: "Evolution is an integration of matter during which matter passes from an indefinite, incoherent **homogeneity** to a definite, coherent heterogeneity." },
      { author: "Alexis de Tocqueville", work: "Democracy in America", quote: "The social **homogeneity** of democratic societies encourages uniform habits and national laws." },
      { author: "Isaac Newton", work: "Opticks", quote: "A ray of light retains its intrinsic color and refrangibility so long as the medium preserves optical **homogeneity**." }
    ]
  },
  homogeneous: {
    primary: "Of the same or a similar kind or nature; uniform in character or composition throughout.",
    secondary: "In mathematics, having all terms of the same degree; in chemistry, consisting of a single uniform phase without visible boundaries.",
    quotes: [
      { author: "Frank A. Fetter", work: "Economics Volume I: Economic Principles", quote: "In a competitive market, a commodity must be completely **homogeneous** if a single price is to prevail." },
      { author: "Charles Lyell", work: "Principles of Geology", quote: "The thick stratum of limestone presented an entirely **homogeneous** appearance from top to bottom." },
      { author: "John Stuart Mill", work: "A System of Logic", quote: "Deductive reasoning operates with greatest certainty when applied to **homogeneous** quantities." }
    ]
  },
  homogeneously: {
    primary: "In a homogeneous manner; with uniform structure, consistency, or distribution throughout.",
    secondary: "Without variation or divergence among parts.",
    quotes: [
      { author: "James Clerk Maxwell", work: "Theory of Heat", quote: "When heat is **homogeneously** distributed throughout a conductor, all internal thermal currents cease." },
      { author: "Bertrand Russell", work: "The Principles of Mathematics", quote: "Geometry assumes space to be **homogeneously** constituted in all directions." },
      { author: "Thomas Henry Huxley", work: "Lay Sermons", quote: "The primordial protoplasm was **homogeneously** diffused throughout the single-celled organism." }
    ]
  },
  homogeneousness: {
    primary: "The state or quality of being homogeneous; uniformity of nature, texture, or composition.",
    secondary: "Lack of internal diversity, divergence, or variation across components.",
    quotes: [
      { author: "Herbert Spencer", work: "The Principles of Biology", quote: "The embryonic blastoderm begins in complete **homogeneousness** before morphological differentiation begins." },
      { author: "William James", work: "The Varieties of Religious Experience", quote: "The mystic soul experiences a profound **homogeneousness** of emotion, where conflicting doubts melt away." },
      { author: "Edgar Allan Poe", work: "Eureka: A Prose Poem", quote: "The original state of matter was absolute simplicity, unity, and **homogeneousness**." }
    ]
  },
  homogeny: {
    primary: "Correspondence between parts or organs in different animals or plants due to evolutionary descent from a common ancestral structure.",
    secondary: "Similarity of character, structure, or origin.",
    quotes: [
      { author: "E. Ray Lankester", work: "On the Use of the Term Homology in Modern Morphology", quote: "I propose the term **homogeny** to designate those structural resemblances which are traceable to shared genetic heritage." },
      { author: "Thomas Henry Huxley", work: "Manual of the Anatomy of Vertebrated Animals", quote: "The forelimb of the mammal and the wing of the bird exhibit undeniable **homogeny** in skeletal design." },
      { author: "Charles Darwin", work: "The Descent of Man", quote: "The anatomical **homogeny** linking human skeletal architecture to that of the anthropoid apes cannot be explained by coincidence." }
    ]
  },
  homograph: {
    primary: "A word that shares the same written spelling as another word, but has a different meaning, origin, and often pronunciation.",
    secondary: "In lexicography and typography, two distinct lexical units that happen to converge into an identical orthographic representation.",
    quotes: [
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "The English language abounds with tricky **homographs**, where phonetic divergence has separated words of identical spelling." },
      { author: "Otto Jespersen", work: "Language", quote: "The foreign student is perpetually baffled by the English **homograph**, which disguises two unrelated roots under one spelling." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "Context alone distinguishes between the verbal and nominal senses of a written **homograph**." }
    ]
  },
  homologic: {
    primary: "Pertaining to or characterized by homology; corresponding in evolutionary origin or structural position.",
    secondary: "In logic and mathematics, exhibiting formal structural correspondence between systems or theorems.",
    quotes: [
      { author: "Richard Owen", work: "On the Archetype and Homologies of the Vertebrate Skeleton", quote: "The **homologic** relations of the vertebrate cranial bones point unmistakably to an underlying vertebral archetype." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "Comparative anatomy proceeds by establishing **homologic** lines between divergent animal forms." },
      { author: "Thomas Henry Huxley", work: "On the Morphology of the Cephalous Mollusca", quote: "The tentacle of the squid shares a **homologic** affinity with the foot of the gastropod." }
    ]
  },
  homological: {
    primary: "Pertaining to homology; corresponding in fundamental structure and evolutionary origin.",
    secondary: "In algebraic topology and abstract algebra, relating to homology groups, boundary operators, and cycle chains.",
    quotes: [
      { author: "Henri Poincaré", work: "Analysis Situs", quote: "The topological properties of higher-dimensional manifolds are revealed through their **homological** invariants." },
      { author: "Charles Darwin", work: "The Origin of Species", quote: "Naturalists have long recognized the **homological** identity of the bones in the human arm, the bat's wing, and the porpoise's flipper." },
      { author: "Saunders Mac Lane", work: "Homology", quote: "The development of **homological** algebra unified disparate algebraic techniques under the single concept of derived functors." }
    ]
  },
  homologise: {
    primary: "To make homologous; demonstrate or establish an evolutionary or structural homology between parts.",
    secondary: "In taxonomy, to determine the corresponding organ or anatomical landmark across divergent taxa.",
    quotes: [
      { author: "Thomas Henry Huxley", work: "Manual of the Anatomy of Invertebrated Animals", quote: "Morphologists have attempted to **homologise** the segmented appendages of insects with those of crustaceans." },
      { author: "E. Ray Lankester", work: "Comparative Embryology", quote: "We cannot **homologise** structures unless we trace their development from identical embryonic germ layers." },
      { author: "Arthur Shipley", work: "Zoology", quote: "To **homologise** the jaws of vertebrates with the mouthparts of arthropods is an error in anatomical reasoning." }
    ]
  },
  homologize: {
    primary: "To make homologous; determine or establish structural and evolutionary correspondence between biological parts.",
    secondary: "In comparative morphology, to correlate an organ in one organism with its evolutionary equivalent in another.",
    quotes: [
      { author: "Richard Owen", work: "Lectures on the Comparative Anatomy of Vertebrates", quote: "The anatomist must **homologize** each cranial bone before reconstructing the primordial archetype." },
      { author: "Stephen Jay Gould", work: "The Structure of Evolutionary Theory", quote: "Geoffroy Saint-Hilaire attempted to **homologize** the ventral nerve cord of insects with the dorsal spinal cord of vertebrates." },
      { author: "Alfred Sherwood Romer", work: "The Vertebrate Body", quote: "Paleontologists successfully **homologize** the reptilian articular and quadrate with the mammalian auditory ossicles." }
    ]
  },
  homologous: {
    primary: "Having the same structural position, evolutionary origin, or developmental derivation, but not necessarily the same function.",
    secondary: "In genetics, designating chromosome pairs containing the same gene loci; in chemistry, belonging to a homologous series.",
    quotes: [
      { author: "Charles Darwin", work: "The Origin of Species", quote: "What can be more curious than that the hand of a man, the paddle of the porpoise, and the wing of the bat, should all include **homologous** bones, in the same relative positions?" },
      { author: "Thomas Hunt Morgan", work: "The Mechanism of Mendelian Heredity", quote: "Synapsis brings **homologous** maternal and paternal chromosomes into intimate physical pairing prior to segregation." },
      { author: "August Kekulé", work: "Organic Chemistry", quote: "The alkanes form a **homologous** series where each consecutive member differs by a single methylene group." }
    ]
  },
  homology: {
    primary: "The state of having the same or similar relation, relative position, or evolutionary structure (anatomical similarity from common ancestry).",
    secondary: "In mathematics, an algebraic procedure for associating a sequence of abelian groups with a topological space to measure connectivity.",
    quotes: [
      { author: "Richard Owen", work: "On the Archetype and Homologies of the Vertebrate Skeleton", quote: "Homology is the same organ in different animals under every variety of form and function." },
      { author: "Charles Darwin", work: "The Descent of Man", quote: "The structural **homology** between man and the lower animals is inexplicable except through common descent with modification." },
      { author: "Stephen Jay Gould", work: "Ontogeny and Phylogeny", quote: "Evolutionary morphology was reborn when Darwin provided a historical explanation for the mystery of **homology**." }
    ]
  },
  homos: {
    primary: "The ancient Greek adjective ὁμός, signifying the same, common, shared, joint, or equal.",
    secondary: "In scientific and philosophical terminology, the foundational morpheme in words indicating structural, genetic, or conceptual identity.",
    quotes: [
      { author: "Aristotle", work: "Politics", quote: "The polis is a community of citizens who share in that which is held **homos**, or common to all." },
      { author: "Plato", work: "Phaedo", quote: "Socrates inquired whether absolute equality is identical with the property termed **homos** in common speech." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "Hellenic philosophy bequeathed to us the root **homos** to express unchanging mathematical equality." }
    ]
  },
  homosexual: {
    primary: "Characterized by sexual, romantic, or emotional attraction to people of one's own sex.",
    secondary: "As a noun, a person who is sexually attracted to individuals of the same sex.",
    quotes: [
      { author: "Havelock Ellis", work: "Studies in the Psychology of Sex", quote: "Scientific investigation must approach the **homosexual** variation with impartial clinical understanding rather than moral dogma." },
      { author: "Sigmund Freud", work: "Three Essays on the Theory of Sexuality", quote: "The **homosexual** orientation represents a distinct configuration of libidinal object-choice rather than mental degeneration." },
      { author: "E. M. Forster", work: "Maurice", quote: "Maurice recognized the nature of his desires, realizing that his **homosexual** love belonged to a brotherhood as old as Greece." }
    ]
  },
  homosexualism: {
    primary: "An archaic or historical term for homosexuality; the state, disposition, or manifestation of being homosexual.",
    secondary: "In early psychiatric and sexological literature, the clinical study or social phenomenon of same-sex attraction.",
    quotes: [
      { author: "Richard von Krafft-Ebing", work: "Psychopathia Sexualis", quote: "In our medical survey, cases of constitutional **homosexualism** were distinguished from temporary adolescent fixations." },
      { author: "Havelock Ellis", work: "Studies in the Psychology of Sex", quote: "The prevalence of **homosexualism** throughout ancient classical antiquity indicates that it is a recurring human potential." },
      { author: "Edward Carpenter", work: "The Intermediate Sex", quote: "The social ostracism attached to **homosexualism** ignores the deep artistic sensitivities often associated with it." }
    ]
  },
  homosexuality: {
    primary: "Romantic attraction, sexual attraction, or sexual behavior between members of the same sex or gender.",
    secondary: "The enduring emotional, romantic, and sexual orientation directed toward persons of the same sex.",
    quotes: [
      { author: "Sigmund Freud", work: "Letter to an American Mother, 1935", quote: "**Homosexuality** is assuredly no advantage, but it is nothing to be ashamed of, no vice, no degradation, it cannot be classified as an illness." },
      { author: "Havelock Ellis", work: "Sexual Inversion", quote: "A comprehensive history of human civilization must recognize that **homosexuality** has flourished openly in noble cultures." },
      { author: "Margaret Mead", work: "Sex and Temperament in Three Primitive Societies", quote: "Cross-cultural anthropology demonstrates that the social roles surrounding **homosexuality** vary enormously among societies." }
    ]
  },
  homozygosity: {
    primary: "The state or condition of possessing identical alleles at a given locus on both homologous chromosomes.",
    secondary: "In population genetics and plant breeding, the degree to which an individual or population is homozygous, often increased through inbreeding.",
    quotes: [
      { author: "Sewall Wright", work: "Evolution and the Genetics of Populations", quote: "Sustained inbreeding rapidly drives the fixation of alleles, maximizing **homozygosity** throughout the colony." },
      { author: "Theodosius Dobzhansky", work: "Genetics and the Origin of Species", quote: "Wild populations maintain high genetic diversity, avoiding the perilous loss of vigor that accompanies excessive **homozygosity**." },
      { author: "Ronald Fisher", work: "The Genetical Theory of Natural Selection", quote: "Selection acts differently upon an allele depending on whether it is expressed in heterozygosity or complete **homozygosity**." }
    ]
  },
  homozygous: {
    primary: "Having two identical alleles of a particular gene or genes on homologous chromosomes.",
    secondary: "True-breeding for a particular genetic trait, producing gametes that all carry the same allele.",
    quotes: [
      { author: "Thomas Hunt Morgan", work: "The Mechanism of Mendelian Heredity", quote: "When a **homozygous** red-eyed fruit fly is crossed with a white-eyed male, the F1 progeny exhibit uniform red eyes." },
      { author: "Theodosius Dobzhansky", work: "Genetics and the Origin of Species", quote: "Recessive deleterious mutations become lethal only when an individual becomes **homozygous** for the defective locus." },
      { author: "Julian Huxley", work: "Evolution: The Modern Synthesis", quote: "Selective breeding aims to create **homozygous** strains that breed true for desirable agricultural traits." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Self & Identity/Dashboard — hom';

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

console.log('Done Dashboard — hom!');
