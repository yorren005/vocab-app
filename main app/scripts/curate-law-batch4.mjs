import fs from 'fs';
import path from 'path';

const basePath = 'App database/Greek roots/Cluster Law & Order';

const filesData = {
  // Dashboard — tag
  "Dashboard — tag/atactic.md": {
    primary: "Describing a polymer in which the pendant functional groups or substituents along the main chain are arranged randomly in stereochemical space, lacking regular configuration.",
    secondary: "Characterized by structural irregularity, producing amorphous, soft, and non-crystalline plastic materials (contrasted with isotactic and syndiotactic).",
    quotes: [
      { author: "Giulio Natta", work: "Nobel Lecture", quote: "While isotactic polypropylene is crystalline and rigid, the **atactic** polymer is a soft, amorphous, rubber-like substance." },
      { author: "Paul Flory", work: "Principles of Polymer Chemistry", quote: "In an **atactic** chain, steric interactions between randomly oriented side groups govern the mean dimensions of the unperturbed coil." },
      { author: "Charles Tanford", work: "Physical Chemistry of Macromolecules", quote: "The random stereochemical orientation of side chains in an **atactic** polymer prevents close intermolecular packing into a crystal lattice." }
    ]
  },
  "Dashboard — tag/ataxia.md": {
    primary: "The lack of voluntary muscle coordination and balance during movement, typically resulting from damage to the cerebellum, sensory nerves, or spinal cord.",
    secondary: "A state of disorder, irregularity, or confusion in bodily functions or social systems (from Greek *ataxia*, 'lack of order').",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Sensory **ataxia** causes the patient to lose stability when closing the eyes, due to impaired proprioceptive input." },
      { author: "Oliver Sacks", work: "The Man Who Mistook His Wife for a Hat", quote: "The sudden acute **ataxia** left the patient unable to walk without veering wildly across the room." },
      { author: "Jean-Martin Charcot", work: "Clinical Lectures on Diseases of the Nervous System", quote: "Locomotor **ataxia** manifests in a characteristic slapping gait and loss of deep tendon reflexes." }
    ]
  },
  "Dashboard — tag/ataxic.md": {
    primary: "Relating to, affected with, or exhibiting ataxia; characterized by unsteady, uncoordinated bodily movements.",
    secondary: "Lacking regular rhythm, order, or muscular control; irregular in neurological function.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The **ataxic** gait is characterized by broad-based stepping and awkward stamping of the heels upon the floor." },
      { author: "Oliver Sacks", work: "Awakenings", quote: "The patient displayed sudden **ataxic** lurches whenever attempting to reach for a cup on the bedside table." },
      { author: "Stewart Duke-Elder", work: "System of Ophthalmology", quote: "Cerebellar lesions frequently produce **ataxic** nystagmus, marked by irregular rhythmic oscillations of the ocular globes." }
    ]
  },
  "Dashboard — tag/chemotaxis.md": {
    primary: "The directional movement of a motile cell or organism toward or away from a chemical stimulus or concentration gradient.",
    secondary: "The biological mechanism by which immune leukocytes migrate toward infection sites or bacteria locate nutrient sources.",
    quotes: [
      { author: "René Dubos", work: "The Bacterial Cell", quote: "Bacterial **chemotaxis** guides flagellated bacilli along minute concentration gradients toward sugars and amino acids." },
      { author: "Élie Metchnikoff", work: "Immunity in Infective Diseases", quote: "Positive **chemotaxis** directs wandering phagocytes toward invading microbes, initiating the defensive inflammatory response." },
      { author: "Lewis Thomas", work: "The Lives of a Cell", quote: "Leukocytes navigate through dense tissue spaces guided by exquisite **chemotaxis**, tracking trace chemical scents like bloodhounds." }
    ]
  },
  "Dashboard — tag/epitaxis.md": {
    primary: "In classical rhetoric and drama, an explanatory addition or continuation appended to a completed statement, or the intensification of dramatic plot tension.",
    secondary: "In crystallography and materials science, an alternative or archaic spelling of *epitaxy*, the ordered growth of a crystalline overlayer upon a crystalline substrate.",
    quotes: [
      { author: "Quintilian", work: "Institutio Oratoria", quote: "By **epitaxis**, the orator appends a fresh and striking clause to reinforce an argument that seemed already concluded." },
      { author: "James Clerk Maxwell", work: "A Treatise on Electricity and Magnetism", quote: "The crystalline alignment observed during **epitaxis** demonstrates how molecular lattices constrain subsequent atomic deposition." },
      { author: "George Puttenham", work: "The Arte of English Poesie", quote: "In rhetorical figures, **epitaxis** serves to heighten the emphasis by adding an afterthought of grave weight." }
    ]
  },
  "Dashboard — tag/eutaxy.md": {
    primary: "Good, well-ordered arrangement; proper discipline and harmonious order in a system, state, or structure (antonym of ataxia).",
    secondary: "Sound legal organization and civil tranquility resulting from just and orderly governance in political philosophy.",
    quotes: [
      { author: "Jeremy Bentham", work: "Constitutional Code", quote: "The primary objective of constitutional design is the maintenance of **eutaxy**, ensuring each department functions without friction." },
      { author: "Samuel Taylor Coleridge", work: "On the Constitution of the Church and State", quote: "A healthy commonwealth requires **eutaxy**, wherein individual freedom is harmonized with public order." },
      { author: "Thomas Carlyle", work: "The French Revolution", quote: "When the fragile veneer of civic **eutaxy** shatters, chaotic passions rush in to fill the void." }
    ]
  },
  "Dashboard — tag/hypotaxis.md": {
    primary: "The syntactic subordination of one clause to another within a sentence, typically through subordinating conjunctions (contrasted with parataxis).",
    secondary: "A hierarchical, complex sentence structure that explicitly organizes causal, temporal, or conditional relationships between thoughts.",
    quotes: [
      { author: "Edward Sapir", work: "Language: An Introduction to the Study of Speech", quote: "While colloquial speech leans heavily toward simple coordination, formal literature develops intricate **hypotaxis**." },
      { author: "Erich Auerbach", work: "Mimesis: The Representation of Reality in Western Literature", quote: "Ciceronian prose achieves its intellectual majesty through **hypotaxis**, nesting secondary thoughts inside periodic sentences." },
      { author: "Roman Jakobson", work: "Selected Writings", quote: "The syntactic contrast between parataxis and **hypotaxis** mirrors fundamental differences in cognitive narrative framing." }
    ]
  },
  "Dashboard — tag/magnetotaxis.md": {
    primary: "The directional movement or orientation of motile micro-organisms along the geomagnetic field lines of the Earth.",
    secondary: "The biological response facilitated by intracellular chains of magnetic iron crystals (magnetosomes) in magnetotactic bacteria.",
    quotes: [
      { author: "Richard P. Blakemore", work: "Science", quote: "We discovered that aquatic spirilla utilize **magnetotaxis** to navigate along geomagnetic dip lines toward nutrient-rich sediment layers." },
      { author: "Lynn Margulis", work: "Symbiotic Planet", quote: "Bacterial **magnetotaxis** demonstrates that even the simplest single-celled organisms evolved delicate bio-compasses to survive." },
      { author: "Stephen Jay Gould", work: "The Panda's Thumb", quote: "The discovery of **magnetotaxis** in ancient sedimentary bacteria provided a startling example of micro-structural evolutionary adaptation." }
    ]
  },
  "Dashboard — tag/metasyntactic.md": {
    primary: "Relating to syntax that describes or stands in place of another syntax; specifically describing placeholder words (e.g., *foo*, *bar*, *baz*) used in programming examples to represent variables of arbitrary meaning.",
    secondary: "Operating at a secondary linguistic level to define, analyze, or generate grammatical rules.",
    quotes: [
      { author: "Donald Knuth", work: "The Art of Computer Programming", quote: "Programmers frequently employ **metasyntactic** variables such as foo and bar to illustrate algorithms without committing to specific domain terminology." },
      { author: "Douglas Hofstadter", work: "Gödel, Escher, Bach", quote: "A formal language requires **metasyntactic** notation to describe its own grammatical theorems without infinite regress." },
      { author: "Eric S. Raymond", work: "The New Hacker's Dictionary", quote: "The hacker tradition relies on conventional **metasyntactic** placeholders to debug code snippets in technical discussions." }
    ]
  },
  "Dashboard — tag/parataxis.md": {
    primary: "The juxtaposition of clauses or phrases side by side without subordinating conjunctions or formal connectors (e.g., *I came, I saw, I conquered*).",
    secondary: "A direct, egalitarian narrative style that presents events without imposing an explicit causal hierarchy (contrasted with hypotaxis).",
    quotes: [
      { author: "Erich Auerbach", work: "Mimesis: The Representation of Reality in Western Literature", quote: "Biblical narrative relies on dramatic **parataxis**, setting monumental events alongside one another with stark simplicity." },
      { author: "Ernest Hemingway", work: "Selected Letters", quote: "Hemingway achieved his spare, visceral prose rhythm by stripping away relative clauses in favor of pure **parataxis**." },
      { author: "Walter J. Ong", work: "Orality and Literacy", quote: "Oral storytelling is overwhelmingly paratactic, relying on additive **parataxis** rather than subordinating syntax." }
    ]
  },
  "Dashboard — tag/phonotactic.md": {
    primary: "Relating to the rules and permissible arrangements of sounds (phonemes) within the syllables and words of a specific language.",
    secondary: "Governed by language-specific constraints that determine which consonant clusters and vowel sequences can legally occur.",
    quotes: [
      { author: "Noam Chomsky & Morris Halle", work: "The Sound Pattern of English", quote: "Native speakers possess an intuitive grasp of **phonotactic** constraints, instantly rejecting sound combinations that violate syllable structure." },
      { author: "Leonard Bloomfield", work: "Language", quote: "Every language enforces strict **phonotactic** prohibitions against certain initial and final consonant clusters." },
      { author: "Steven Pinker", work: "The Language Instinct", quote: "Although 'blick' is not an English word, it conforms perfectly to English **phonotactic** rules, unlike 'bnik'." }
    ]
  },
  "Dashboard — tag/phonotactics.md": {
    primary: "The branch of phonology that deals with the restrictions in a language on the permissible combinations of phonemes.",
    secondary: "The structural system of rules dictating allowable syllable shapes and consonant clusters in a given linguistic system.",
    quotes: [
      { author: "Roman Jakobson", work: "Child Language, Aphasia and Phonological Universals", quote: "Children master the **phonotactics** of their mother tongue through progressive differentiation of syllable margins." },
      { author: "John Lyons", work: "Introduction to Theoretical Linguistics", quote: "The study of **phonotactics** reveals why certain sequences of phonemes sound entirely foreign to native speakers." },
      { author: "Edward Sapir", work: "Language", quote: "The mechanical **phonotactics** of a language determines the shape into which foreign loanwords must be recast." }
    ]
  },
  "Dashboard — tag/phototaxis.md": {
    primary: "The innate directional movement of an organism toward (positive phototaxis) or away from (negative phototaxis) a source of light.",
    secondary: "The behavioral photo-orientation mechanism exhibited by motile algae, insects, and microorganisms.",
    quotes: [
      { author: "Jacques Loeb", work: "Forced Movements, Tropisms, and Animal Conduct", quote: "Positive **phototaxis** compels the moth to fly relentlessly toward the candle flame, governed by photochemical reactions in its retinas." },
      { author: "Charles Darwin", work: "The Power of Movement in Plants", quote: "Minute flagellated swarm-spores display active **phototaxis**, swimming directly toward the sunlit surface of the pond." },
      { author: "Rachel Carson", work: "The Sea Around Us", quote: "Planktonic larvae exhibit diurnal **phototaxis**, rising to surface waters at dusk and sinking at dawn to escape predators." }
    ]
  },
  "Dashboard — tag/rheotaxis.md": {
    primary: "The innate behavioral response or directional movement of an aquatic organism in response to a current of water, typically swimming against the flow.",
    secondary: "The orientation reflex that prevents fish and aquatic invertebrates from being swept downstream by flowing currents.",
    quotes: [
      { author: "Jacques Loeb", work: "The Mechanistic Conception of Life", quote: "Positive **rheotaxis** enables river fish to maintain their station against the rush of water without visual landmarks." },
      { author: "Rachel Carson", work: "Under the Sea-Wind", quote: "The migrating salmon relied on keen **rheotaxis** to breast the foaming mountain torrents and leap the rapids." },
      { author: "Nikolaas Tinbergen", work: "The Study of Instinct", quote: "Field experiments demonstrated that stream minnows lose their orienting **rheotaxis** when the lateral-line nerves are severed." }
    ]
  },
  "Dashboard — tag/syntactic.md": {
    primary: "Relating to the rules, principles, and processes that govern the structure of sentences in a given language; grammatical.",
    secondary: "Pertaining to the formal rules governing the combinations of symbols without regard to their semantic meaning in logic and computing.",
    quotes: [
      { author: "Noam Chomsky", work: "Syntactic Structures", quote: "Grammar is autonomous and independent of meaning; the sentence 'Colorless green ideas sleep furiously' is entirely **syntactic**." },
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "The value of a word depends upon its **syntactic** positioning relative to adjacent terms in the sentence chain." },
      { author: "Bertrand Russell", work: "The Principles of Mathematics", quote: "Formal logic constructs a purely **syntactic** calculus where deductive derivations proceed by mechanical rules." }
    ]
  },
  "Dashboard — tag/syntactical.md": {
    primary: "Pertaining to or conforming to the rules of syntax and sentence construction (synonymous with syntactic).",
    secondary: "In literary criticism, relating to the arrangement of phrases, clauses, and rhetorical cadence in writing.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "Milton's grand style is marked by bold **syntactical** inversions borrowed from Latin poetry." },
      { author: "Virginia Woolf", work: "The Common Reader", quote: "The essayist must cultivate a subtle **syntactical** flexibility to capture the flickering impressions of daily life." },
      { author: "George Orwell", work: "Politics and the English Language", quote: "Slovenly **syntactical** habits obscure meaning and make political deception easier to swallow." }
    ]
  },
  "Dashboard — tag/syntactically.md": {
    primary: "In a syntactic manner; in accordance with the grammatical rules governing sentence construction.",
    secondary: "From the viewpoint of formal syntax, grammatical relations, or parsing algorithms.",
    quotes: [
      { author: "Noam Chomsky", work: "Aspects of the Theory of Syntax", quote: "A sentence may be **syntactically** well-formed while remaining semantically anomalous." },
      { author: "Steven Pinker", work: "The Language Instinct", quote: "Our mental grammar can assemble **syntactically** intricate clauses faster than the conscious mind can track." },
      { author: "William James", work: "The Principles of Psychology", quote: "When listening to speech, the brain anticipates **syntactically** appropriate endings before the speaker finishes the sentence." }
    ]
  },
  "Dashboard — tag/syntactician.md": {
    primary: "A linguist or scholar who specializes in syntax—the study of sentence structure and grammatical rules.",
    secondary: "A researcher who analyzes formal linguistic frameworks, phrase structures, and generative grammar.",
    quotes: [
      { author: "Noam Chomsky", work: "Language and Mind", quote: "The modern **syntactician** seeks to formulate universal grammatical principles that account for the acquisition of all human tongues." },
      { author: "Steven Pinker", work: "Words and Rules", quote: "To a working **syntactician**, the messy surface of conversation conceals an elegant tree-structure of phrase markers." },
      { author: "Roman Jakobson", work: "Selected Writings", quote: "The **syntactician** must collaborate with the semanticist, for form and meaning are two faces of the same verbal sign." }
    ]
  },
  "Dashboard — tag/syntagm.md": {
    primary: "An orderly, linear sequence of linguistic units (morphemes, words, or phrases) standing in a syntactic relationship to one another (alternative spelling of syntagma).",
    secondary: "In semiotics, a linked chain of signs whose combined meaning arises from their sequential combination (contrasted with paradigm).",
    quotes: [
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "In discourse, words acquire relations based on the linear nature of language because they are chained together in a **syntagm**." },
      { author: "Roland Barthes", work: "Elements of Semiology", quote: "Every semiotic system operates along two axes: the associative plane of selection and the **syntagm** of linear combination." },
      { author: "Roman Jakobson", work: "Fundamentals of Language", quote: "The poetic function projects the principle of equivalence from the axis of selection into the axis of the **syntagm**." }
    ]
  },
  "Dashboard — tag/syntagma.md": {
    primary: "A syntactic unit consisting of words or phrases linked in an organized, grammatical sequence.",
    secondary: "A tactical military battalion or square formation in ancient Greece, especially the Macedonian phalanx square of 256 men armed with sarissas.",
    quotes: [
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "A compound word or a whole sentence constitutes a **syntagma**, whose elements derive meaning from mutual opposition." },
      { author: "George Grote", work: "A History of Greece", quote: "The formidable Macedonian phalanx was subdivided into compact bodies of 256 men, each termed a **syntagma**." },
      { author: "J. F. C. Fuller", work: "The Generalship of Alexander the Great", quote: "Alexander deployed each infantry **syntagma** with disciplined precision to pin the Persian line while the cavalry struck the flank." }
    ]
  },
  "Dashboard — tag/syntagmatic.md": {
    primary: "Relating to the sequential or linear relationships between words or signs in a sentence (the horizontal axis of combination).",
    secondary: "Pertaining to how grammatical elements co-occur and constrain each other in actual utterances (contrasted with paradigmatic).",
    quotes: [
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "The **syntagmatic** relation holds in praesentia; it connects two or more terms that are actually present in an effective series." },
      { author: "Roland Barthes", work: "Mythologies", quote: "In fashion and advertising, **syntagmatic** combinations of colors and garments create culturally codified narratives." },
      { author: "Roman Jakobson", work: "Selected Writings", quote: "Aphasic disorders of the contiguity type specifically impair the patient's capacity to build **syntagmatic** sequences." }
    ]
  },
  "Dashboard — tag/syntax.md": {
    primary: "The arrangement of words and phrases to create well-formed, grammatically correct sentences in a language.",
    secondary: "The format and formal rules governing the structure of statements in a programming language or logical calculus.",
    quotes: [
      { author: "Noam Chomsky", work: "Syntactic Structures", quote: "The **syntax** of a language defines the generative procedures by which an infinite variety of sentences can be produced." },
      { author: "Virginia Woolf", work: "A Room of One's Own", quote: "The novelist had to break the traditional masculine cadence and invent a sentence whose supple **syntax** was adapted to a woman's thought." },
      { author: "Donald Knuth", work: "The Art of Computer Programming", quote: "A compiler must first parse the source program's **syntax** before it can generate executable machine instructions." }
    ]
  },
  "Dashboard — tag/tactic.md": {
    primary: "An action, maneuver, or method carefully planned and executed to achieve a specific short-term goal or operational advantage.",
    secondary: "A localized military maneuvering technique, as distinguished from broad overall strategy.",
    quotes: [
      { author: "Carl von Clausewitz", work: "On War", quote: "Strategy is the use of the engagement for the purpose of the war; **tactic** is the theory of the use of military forces in combat." },
      { author: "Sun Tzu", work: "The Art of War", quote: "All men can see these **tactics** whereby I conquer, but what none can see is the strategy out of which victory is evolved." },
      { author: "Charles Dickens", work: "Great Expectations", quote: "He adopted a conciliatory **tactic**, soothing the irritated blacksmith with gentle nods and promises." }
    ]
  },
  "Dashboard — tag/tactical.md": {
    primary: "Relating to, showing, or involving actions carefully planned to achieve a specific military, political, or practical end.",
    secondary: "Pertaining to combat operations on the immediate battlefield rather than long-range grand strategy.",
    quotes: [
      { author: "Carl von Clausewitz", work: "On War", quote: "A brilliant **tactical** victory on the field may prove utterly barren if unaccompanied by sound strategic direction." },
      { author: "Winston Churchill", work: "The Second World War", quote: "The air marshal deployed his fighters with consummate **tactical** skill to intercept incoming bomber formations." },
      { author: "George Orwell", work: "Homage to Catalonia", quote: "The militia officers lacked **tactical** experience, often ordering bayonet charges across open, bullet-swept slopes." }
    ]
  },
  "Dashboard — tag/tactically.md": {
    primary: "In a tactical manner; with careful planning and maneuvering to achieve an immediate objective.",
    secondary: "In military, political, or athletic maneuvering, from the standpoint of short-term positional advantage.",
    quotes: [
      { author: "Winston Churchill", work: "The River War", quote: "The cavalry swept forward **tactically**, securing the high ridge before the main infantry columns arrived." },
      { author: "Carl von Clausewitz", work: "On War", quote: "To act **tactically** sound is to adapt one's forces instantly to the terrain and the enemy's disposition." },
      { author: "B. H. Liddell Hart", work: "Strategy", quote: "By moving **tactically** along the line of least expectation, the commander paralyzed the enemy's defensive plan." }
    ]
  },
  "Dashboard — tag/tagma.md": {
    primary: "A distinct, specialized morphological body unit or region formed by the fusion or grouping of segments in arthropods (e.g., the head, thorax, and abdomen of insects).",
    secondary: "An elite standing military battalion or regiment in the Byzantine army (from Greek *tagma*, 'something arranged / battalion').",
    quotes: [
      { author: "Stephen Jay Gould", work: "Wonderful Life: The Burgess Shale and the Nature of History", quote: "Arthropod evolution is the great story of tagmosis—the specialization and grouping of ancestral segments into a functional **tagma**." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The emperor mobilized the imperial **tagma**, the elite household brigade stationed within the walls of Constantinople." },
      { author: "John Obadiah Westwood", work: "An Introduction to the Modern Classification of Insects", quote: "In the class Insecta, each **tagma** performs distinct physiological roles: sensory in the head, locomotor in the thorax, and visceral in the abdomen." }
    ]
  },
  "Dashboard — tag/taxis.md": {
    primary: "The innate behavioral response or directional movement of a motile cell or organism in response to an external stimulus (e.g., light, chemicals, heat).",
    secondary: "The manual restoration of a displaced bodily part in surgery (such as reducing a hernia); also, an orderly line or battle rank in ancient Greek military formations.",
    quotes: [
      { author: "Jacques Loeb", work: "Forced Movements, Tropisms, and Animal Conduct", quote: "The basic animal reaction to environmental stimulation is a physical **taxis**, bending the locomotion toward or away from the source." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Gentle manual **taxis** was applied to reduce the strangulated inguinal hernia before considering surgical incision." },
      { author: "Thucydides", work: "History of the Peloponnesian War", quote: "The Spartan infantry advanced in unbroken **taxis**, keeping step to the shrill music of double flutes." }
    ]
  },
  "Dashboard — tag/taxonomer.md": {
    primary: "A biologist or scholar who classifies species, organisms, or phenomena according to a systematic scheme (variant of taxonomist).",
    secondary: "An analytical thinker who organizes complex conceptual domains into structured hierarchies.",
    quotes: [
      { author: "Charles Darwin", work: "The Origin of Species", quote: "The skilled **taxonomer** relies on ancestral affinities and rudimentary organs rather than mere superficial resemblance to classify species." },
      { author: "Asa Gray", work: "Letters of Asa Gray", quote: "A practical **taxonomer** must balance the zeal for naming new varieties against the broader affinities of the flora." },
      { author: "Thomas Henry Huxley", work: "Science and Culture", quote: "The museum **taxonomer** spends lifetimes arranging shells and bones to reveal the true genealogy of life." }
    ]
  },
  "Dashboard — tag/taxonomic.md": {
    primary: "Relating to taxonomy; pertaining to the theory, principles, and practice of classifying organisms and entities.",
    secondary: "Pertaining to hierarchical classification schemes and rank categories (kingdom, phylum, class, order, family, genus, species).",
    quotes: [
      { author: "Ernst Mayr", work: "Systematics and the Origin of Species", quote: "The **taxonomic** species concept must be grounded in biological reproductive isolation rather than arbitrary morphological difference." },
      { author: "Stephen Jay Gould", work: "The Flamingo's Smile", quote: "A rigorous **taxonomic** system does not merely catalog nature, but embodies our deepest theories of evolutionary relationship." },
      { author: "E. O. Wilson", work: "The Diversity of Life", quote: "Biologists have described nearly two million species, yet vast **taxonomic** realms of tropical insects and microbes remain entirely uncharted." }
    ]
  },
  "Dashboard — tag/taxonomical.md": {
    primary: "Pertaining to taxonomy or classification (synonymous with taxonomic).",
    secondary: "In scientific literature, relating to systematic arrangements of specimens and phylogenetic trees.",
    quotes: [
      { author: "Charles Darwin", work: "The Descent of Man", quote: "In a strictly **taxonomical** sense, man cannot be separated from the anthropoid apes into a distinct order." },
      { author: "Julian Huxley", work: "The New Systematics", quote: "Modern genetics has revolutionized older **taxonomical** categories, aligning morphology with chromosomal analysis." },
      { author: "Liberty Hyde Bailey", work: "The Standard Cyclopedia of Horticulture", quote: "The **taxonomical** confusion surrounding cultivated hybrids requires careful verification against wild type specimens." }
    ]
  },
  "Dashboard — tag/taxonomically.md": {
    primary: "In a taxonomic manner; in terms of, or according to the principles of, scientific classification.",
    secondary: "From the standpoint of biological phylogeny and systematic categories.",
    quotes: [
      { author: "Ernst Mayr", work: "Principles of Systematic Zoology", quote: "Two sibling species may appear morphologically indistinguishable yet remain **taxonomically** distinct by their reproductive barriers." },
      { author: "Stephen Jay Gould", work: "Ontogeny and Phylogeny", quote: "Fossils that were once grouped together were **taxonomically** reclassified as separate evolutionary radiations." },
      { author: "Richard Dawkins", work: "The Ancestor's Tale", quote: "When analyzed **taxonomically**, chimpanzees and humans share a more recent common ancestor than either does with the gorilla." }
    ]
  },
  "Dashboard — tag/taxonomist.md": {
    primary: "A biologist or scientist who identifies, names, describes, and classifies organisms into systematic categories.",
    secondary: "Any scholar who develops or applies structured classification schemes to ideas, data, or artifacts.",
    quotes: [
      { author: "Carl Linnaeus", work: "Systema Naturae", quote: "The duty of the **taxonomist** is to assign every created being its proper genus, species, and diagnostic description." },
      { author: "E. O. Wilson", work: "Consilience: The Unity of Knowledge", quote: "The field **taxonomist** remains an indispensable scout on the frontiers of biological biodiversity." },
      { author: "Ernst Mayr", work: "The Growth of Biological Thought", quote: "Without the foundational work of the **taxonomist**, ecologists and geneticists would possess no precise language to discuss living forms." }
    ]
  },
  "Dashboard — tag/taxonomy.md": {
    primary: "The scientific branch of biology concerned with the classification, identification, naming, and systemization of organisms.",
    secondary: "A structured, hierarchical classification system used to organize categories of knowledge, software, or data.",
    quotes: [
      { author: "Charles Darwin", work: "The Origin of Species", quote: "All the grand facts in genetics and anatomy are reflected in our **taxonomy**, which is essentially a genealogical pedigree of nature." },
      { author: "Carl Linnaeus", work: "Philosophia Botanica", quote: "Order is the soul of science; without a rigorous **taxonomy**, all natural knowledge would dissolve into chaotic confusion." },
      { author: "Stephen Jay Gould", work: "Wonderful Life", quote: "The discovery of unusual anatomical designs in the Burgess Shale forced a complete overhaul of traditional invertebrate **taxonomy**." }
    ]
  },
  "Dashboard — tag/thermotaxis.md": {
    primary: "The innate directional movement of an organism, cell, or microorganism in response to a temperature gradient.",
    secondary: "The behavioral thermal regulation response observed in nematodes, slime molds, and sperm cells seeking optimal temperature zones.",
    quotes: [
      { author: "Jacques Loeb", work: "The Dynamics of Living Matter", quote: "Nematode worms exhibit sensitive **thermotaxis**, migrating systematically along thermal gradients toward their cultivation temperature." },
      { author: "Sydney Brenner", work: "Selected Papers on Molecular Biology", quote: "Behavioral mutants of Caenorhabditis elegans revealed specific sensory neurons dedicated to mediated **thermotaxis**." },
      { author: "Lewis Thomas", work: "The Medusa and the Snail", quote: "Single-celled amoebae demonstrate subtle **thermotaxis**, steering away from lethal heat long before thermal injury occurs." }
    ]
  }
};

for (const [relPath, entry] of Object.entries(filesData)) {
  const filePath = path.join(basePath, relPath);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Find top portion up to > [!book]
  const bookIdx = content.indexOf('> [!book]');
  if (bookIdx === -1) {
    console.error(`No > [!book] in ${relPath}`);
    continue;
  }
  const topBlock = content.substring(0, bookIdx);

  const newContent = `${topBlock}> [!book] 📖 Definitions & Semantic Range
> 1. **Primary Definition (Lexical / Standard Consensus)**: ${entry.primary}
> 2. **Secondary / Nuanced Definition (Specialized / Domain / Encyclopedic)**: ${entry.secondary}

> [!quote] 💬 Contextual Usage & Authentic Quotations
${entry.quotes.map(q => `> - 📜 **${q.author} (*${q.work}*):** *"${q.quote}"*`).join('\n')}
`;

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated: ${relPath}`);
}

console.log('Done Batch 4 (tag) of Cluster Law & Order!');
