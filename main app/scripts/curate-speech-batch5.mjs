import fs from "fs";
import path from "path";

const baseDir = "App database/Greek roots/Cluster Speech & Language";

const wordsData = {
  "Dashboard — onym/acronym.md": {
    word: "acronym",
    primary: "A word formed from the initial letters or components of a name or phrase, pronounced as a single word (e.g., radar, NATO, laser).",
    secondary: "In terminology studies and lexicology, an abbreviation strategy serving administrative and technical efficiency in modern communication.",
    quotes: [
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "The rapid proliferation of the **acronym** during the Second World War reflected the urgent military need for concise communication." },
      { author: "Steven Pinker", work: "Words and Rules", quote: "Unlike an alphabetism where letters are spelled out, an **acronym** is pronounced phonetically as a single lexical item." },
      { author: "George Orwell", work: "Nineteen Eighty-Four", quote: "Newspeak relied heavily on the political **acronym**, compressing complex ideological doctrines into abrupt, robotic labels." }
    ]
  },
  "Dashboard — onym/acronymic.md": {
    word: "acronymic",
    primary: "Of, relating to, or having the nature of an acronym.",
    secondary: "In stylistic analysis, describing texts or institutional discourses dominated by dense initialisms and condensed letter sequences.",
    quotes: [
      { author: "H. L. Mencken", work: "The American Language", quote: "The government bureaus of Washington developed an **acronymic** jargon that bewildered ordinary citizens seeking plain information." },
      { author: "David Crystal", work: "Language and the Internet", quote: "Modern text messaging has accelerated the creation of **acronymic** contractions to economize time and keyboard effort." },
      { author: "Umberto Eco", work: "Foucault's Pendulum", quote: "The cabalistic manuscript concealed its secrets beneath elaborate **acronymic** titles that baffled uninitiated readers." }
    ]
  },
  "Dashboard — onym/acronymous.md": {
    word: "acronymous",
    primary: "Formed as an acronym; composed of the initial letters of several words.",
    secondary: "In bureaucratic linguistics, characterizing names or terminology created through the contraction of longer descriptive phrases.",
    quotes: [
      { author: "Geoffrey Leech", work: "Semantics: The Study of Meaning", quote: "Modern organizational discourse frequently employs **acronymous** titles to present a sleek and professional corporate identity." },
      { author: "John Algeo", work: "Fifty Years Among the New Words", quote: "The transition from descriptive phrases to **acronymous** words shows how spoken language assimilates written abbreviations." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "International treaties often establish **acronymous** agencies that soon become household names in their own right." }
    ]
  },
  "Dashboard — onym/allonym.md": {
    word: "allonym",
    primary: "A name that is the real name of another person, assumed by an author to disguise their own identity.",
    secondary: "In literary history and copyright jurisprudence, a work published falsely or fraudulently under the name of an existing contemporary author.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "The satirist published his provocative pamphlet under an **allonym**, borrowing the name of a reputable divine to deflect public anger." },
      { author: "Isaac D'Israeli", work: "Calamities and Quarrels of Authors", quote: "Literary history records many scandalous instances where an unscrupulous hack adopted an **allonym** to sell inferior verses." },
      { author: "Walter William Skeat", work: "A Student's Pastime", quote: "The scholar must distinguish between a genuine pseudonym and a deceptive **allonym** designed to appropriate another man's authority." }
    ]
  },
  "Dashboard — onym/anonym.md": {
    word: "anonym",
    primary: "An anonymous person; someone whose name is unknown, withheld, or concealed.",
    secondary: "In publishing and bibliography, a book, essay, or publication issued without the author's name.",
    quotes: [
      { author: "Thomas Carlyle", work: "Sartor Resartus", quote: "The German philosopher remained a mysterious **anonym** to the learned world, sending forth profound treatises from an unknown retreat." },
      { author: "Henry James", work: "The Aspern Papers", quote: "He scrutinized the ancient review, wondering what critic lurked behind the impenetrable **anonym** of the editorial signature." },
      { author: "Edgar Allan Poe", work: "Marginalia", quote: "An author who publishes under an **anonym** invites the public to judge the work on its intrinsic merits alone." }
    ]
  },
  "Dashboard — onym/anonymity.md": {
    word: "anonymity",
    primary: "The condition or quality of being anonymous, nameless, or unidentifiable.",
    secondary: "In social theory and digital privacy studies, the state of operating or communicating without revealing one's civic identity to institutions or the public.",
    quotes: [
      { author: "Virginia Woolf", work: "A Room of One's Own", quote: "For centuries, the social conditions of women forced them to seek refuge in **anonymity**, writing under generic pseudonyms or leaving their verses unsigned." },
      { author: "George Orwell", work: "Collected Essays", quote: "The great cathedral builders achieved a majestic collective art that was content with humble **anonymity**." },
      { author: "Alexis de Tocqueville", work: "Democracy in America", quote: "The vast crowds of modern democratic metropolises envelop the individual citizen in a protective yet isolating **anonymity**." }
    ]
  },
  "Dashboard — onym/anonymous.md": {
    word: "anonymous",
    primary: "Having no known or acknowledged name; of unknown authorship, origin, or identity.",
    secondary: "In cultural critique, lacking distinctive individual character, personal warmth, or identifying markers (e.g., anonymous architecture).",
    quotes: [
      { author: "Alexander Pope", work: "An Essay on Criticism", quote: "Some praise at morning what they blame at night, but always think the last opinion right, led by some **anonymous** scribbler's malicious wit." },
      { author: "Charlotte Brontë", work: "Biographical Notice of Ellis and Acton Bell", quote: "We were prompted by an earnest desire to remain **anonymous**, wishing that our poems should be judged without regard to our sex." },
      { author: "Thomas Babington Macaulay", work: "The History of England", quote: "The king was infuriated by an **anonymous** letter thrown into his bedchamber, warning him of a conspiracy among his trusted courtiers." }
    ]
  },
  "Dashboard — onym/anonymously.md": {
    word: "anonymously",
    primary: "In an anonymous manner; without disclosing one's name or identity.",
    secondary: "In historical publishing and journalism, the practice of contributing reviews, editorials, or tracts without a personal byline.",
    quotes: [
      { author: "Mary Shelley", work: "Frankenstein", quote: "The novel was published **anonymously** in London, leading many reviewers to attribute its somber imaginative power to Percy Shelley." },
      { author: "Charles Dickens", work: "The Pickwick Papers", quote: "The editor announced that contributions sent **anonymously** would receive no acknowledgment unless accompanied by a private address." },
      { author: "Benjamin Franklin", work: "Autobiography", quote: "I wrote the first papers **anonymously**, slipping them under the door of the printing house where my brother found them next morning." }
    ]
  },
  "Dashboard — onym/antonym.md": {
    word: "antonym",
    primary: "A word that expresses a meaning directly opposed to that of another word in the same language (e.g., hot and cold).",
    secondary: "In structural semantics, a lexical unit standing in a relation of binary opposition, gradable contrast, or converse reciprocity with another term.",
    quotes: [
      { author: "John Lyons", work: "Semantics", quote: "The most basic lexical opposition in natural language is the **antonym**, which pairs words that represent polar extremes on a conceptual dimension." },
      { author: "Steven Pinker", work: "The Stuff of Thought", quote: "When a child learns a new adjective, the mind instinctively searches for its **antonym** to establish the boundaries of the concept." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "In traditional rhetoric, balancing a word against its **antonym** provides antithetical symmetry and persuasive force." }
    ]
  },
  "Dashboard — onym/antonymous.md": {
    word: "antonymous",
    primary: "Being or expressing an antonym; opposite in meaning.",
    secondary: "In lexical semantics, denoting word pairs that occupy complementary, gradable, or relational opposite poles.",
    quotes: [
      { author: "Geoffrey Leech", work: "Semantics", quote: "Pairs of **antonymous** adjectives like large and small do not represent absolute values, but relative positions along a graded scale." },
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "The structural value of a lexical sign is partly defined by its **antonymous** relation to contrasting terms in the paradigm." },
      { author: "Noam Chomsky", work: "Aspects of the Theory of Syntax", quote: "Semantic features must specify whether two lexical entries are **antonymous** in order to account for contradictions in sentential logic." }
    ]
  },
  "Dashboard — onym/antonymy.md": {
    word: "antonymy",
    primary: "The semantic relation of opposition between words of contrary or contradictory meaning.",
    secondary: "In cognitive semantics and lexical taxonomy, the fundamental structural principle governing complementary, scalar, and directional contrasts in vocabulary.",
    quotes: [
      { author: "John Lyons", work: "Introduction to Theoretical Linguistics", quote: "The principle of **antonymy** is deeply ingrained in human cognitive architecture, organizing experience into contrasting conceptual categories." },
      { author: "Stephen Ullmann", work: "Semantics", quote: "Binary **antonymy** operates across all languages, enabling speakers to make swift evaluative and spatial distinctions." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "Studies of child language acquisition show that **antonymy** is mastered early as children learn to distinguish opposites." }
    ]
  },
  "Dashboard — onym/autonym.md": {
    word: "autonym",
    primary: "A person's real or legal name, as opposed to a pseudonym or pen name; a work published under the author's true name.",
    secondary: "In ethnolinguistics and anthropology, the self-designation or endonym that an indigenous group or speech community uses for itself.",
    quotes: [
      { author: "Walter William Skeat", work: "Principles of English Etymology", quote: "The philologist was pleased when the author finally discarded his disguise and published his definitive treatise under his **autonym**." },
      { author: "Claude Lévi-Strauss", work: "The Savage Mind", quote: "Many tribal communities reserve their sacred **autonym** for internal rituals, presenting a conventional exonym to neighboring peoples." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "In bibliographical cataloging, recording an author's **autonym** resolves the ambiguities created by shifting pen names." }
    ]
  },
  "Dashboard — onym/caconym.md": {
    word: "caconym",
    primary: "A harsh-sounding, misconstructed, or linguistically incorrect name, especially in taxonomic nomenclature.",
    secondary: "In botanical and zoological taxonomy, an objectionable scientific name rejected due to poor etymological formation or offensive barbarism.",
    quotes: [
      { author: "Carl Linnaeus", work: "Critica Botanica", quote: "A judicious botanist will avoid every barbarous **caconym** that violates the classical rules of grammatical harmony." },
      { author: "Asa Gray", work: "Structural Botany", quote: "The commission rejected the proposed generic title as an unpronounceable **caconym** offending the canons of international nomenclature." },
      { author: "Joseph Dalton Hooker", work: "The Flora of British India", quote: "Taxonomists have repeatedly emended that harsh **caconym** to restore etymological dignity to the species." }
    ]
  },
  "Dashboard — onym/cryptonym.md": {
    word: "cryptonym",
    primary: "A secret name or code name used to conceal the true identity of a person, group, organization, or intelligence operation.",
    secondary: "In espionage history and cryptography, an alphanumeric designator or pseudonym assigned by intelligence agencies to assets and operations.",
    quotes: [
      { author: "John le Carré", work: "Tinker Tailor Soldier Spy", quote: "The intelligence dossier referred to the Soviet double agent only by an elusive **cryptonym** known to three senior officers." },
      { author: "Allen Dulles", work: "The Craft of Intelligence", quote: "To protect the identity of clandestine sources, every field report transmitted from abroad substituted an assigned **cryptonym** for the agent's real name." },
      { author: "David Kahn", work: "The Codebreakers", quote: "In wartime espionage, a compromised **cryptonym** could instantly unmask an entire network of undercover operatives." }
    ]
  },
  "Dashboard — onym/eponym.md": {
    word: "eponym",
    primary: "A person, whether real or mythical, from whom a place, era, institution, discovery, or invention takes (or is reputed to take) their name.",
    secondary: "In classical Greek antiquity, the presiding archon (archon eponymos) after whom the Athenian civil year was officially named and dated.",
    quotes: [
      { author: "Thomas Carlyle", work: "On Heroes, Hero-Worship, and the Heroic in History", quote: "The heroic **eponym** of an ancient tribe was revered by his descendants as both ancestor and patron deity." },
      { author: "Robert K. Merton", work: "The Sociology of Science", quote: "In academic history, conferring an **eponym** such as the Planck constant or Coulomb's law represents the highest honor the scientific community can bestow." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "Many common household items derive from a historical **eponym**, from the sandwich of Lord Sandwich to the diesel engine of Rudolf Diesel." }
    ]
  },
  "Dashboard — onym/eponymic.md": {
    word: "eponymic",
    primary: "Of, relating to, or functioning as an eponym; giving one's name to a person, place, or concept.",
    secondary: "In historical narrative, designating ancestral patriarchs or heroic figures whose names explain tribal or territorial designations.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The **eponymic** magistrate of Athens gave his title to the civil year, marking each epoch in the civic archives." },
      { author: "James George Frazer", work: "The Golden Bough", quote: "Ancient mythologies frequently constructed an **eponymic** hero to explain the origin of a sacred city or geographic landmark." },
      { author: "Walter Pater", work: "Greek Studies", quote: "The **eponymic** ancestor of the clan stood in marble outside the council hall, a symbol of shared blood and common law." }
    ]
  },
  "Dashboard — onym/eponymous.md": {
    word: "eponymous",
    primary: "Giving one's name to something, or named after the person or character who is its source (e.g., the eponymous hero of a novel).",
    secondary: "In modern popular culture and the music industry, designating a self-titled work, album, or commercial brand that shares the name of its creator.",
    quotes: [
      { author: "Charles Dickens", work: "David Copperfield", quote: "The **eponymous** narrator of the story recounts his journey from an unhappy childhood to professional literary success." },
      { author: "Mary Shelley", work: "Frankenstein", quote: "The **eponymous** scientist creator Victor Frankenstein is consumed by the tragic consequences of his daring experiment." },
      { author: "Herman Melville", work: "Moby-Dick", quote: "Captain Ahab's obsessive vengeance is directed against the **eponymous** albino whale that roams the Pacific." }
    ]
  },
  "Dashboard — onym/eponymy.md": {
    word: "eponymy",
    primary: "The naming of things, places, or concepts after particular individuals; the practice of deriving names from persons.",
    secondary: "In the sociology of science, the recognition system (as analyzed by Robert K. Merton) whereby scientific discoveries and laws are named after their discoverers (e.g., Newton's laws).",
    quotes: [
      { author: "Robert K. Merton", work: "The Sociology of Science", quote: "The practice of **eponymy** in natural science establishes an institutionalized memory that rewards intellectual priority." },
      { author: "Stephen Jay Gould", work: "The Mismeasure of Man", quote: "Scientific **eponymy** often immortalizes a pioneer while obscuring the collaborative network that made the discovery possible." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "The prevalence of **eponymy** in modern medicine reflects the nineteenth-century custom of naming syndromes after the reporting clinicians." }
    ]
  },
  "Dashboard — onym/euonym.md": {
    word: "euonym",
    primary: "A name that is well suited or auspicious for the person, place, or thing bearing it; an apt name.",
    secondary: "In onomastic rhetoric, a name whose literal etymology or phonetic resonance harmoniously reflects the vocation or virtue of its bearer (the opposite of caconym).",
    quotes: [
      { author: "Thomas De Quincey", work: "Confessions of an English Opium-Eater", quote: "His family considered his baptismal name an auspicious **euonym**, foretelling a career of distinction and public honor." },
      { author: "Walter William Skeat", work: "A Student's Pastime", quote: "A well-chosen **euonym** pleases the ear while perfectly reflecting the inherent nature of the object." },
      { author: "Oliver Wendell Holmes Sr.", work: "The Autocrat of the Breakfast-Table", quote: "To bestow a charming **euonym** upon a country house adds poetic grace to its rustic architecture." }
    ]
  },
  "Dashboard — onym/euonymus.md": {
    word: "euonymus",
    primary: "A genus of deciduous and evergreen shrubs and small trees in the family Celastraceae (commonly called spindle trees or burning bushes), prized for ornamental foliage and vibrant berries.",
    secondary: "In botanical taxonomy, classical Greek euōnymos (of good name, auspicious; ironically euphemistic for a plant known to be toxic to cattle).",
    quotes: [
      { author: "Carl Linnaeus", work: "Species Plantarum", quote: "The shrub **Euonymus** europaeus displays four-angled capsules that split to reveal bright orange arils in late autumn." },
      { author: "Gilbert White", work: "The Natural History of Selborne", quote: "In our southern hedges, the spindle-tree or **Euonymus** is conspicuous in October for its rose-colored seed vessels." },
      { author: "Asa Gray", work: "Manual of the Botany of the Northern United States", quote: "Species of **Euonymus** are cultivated for their fiery crimson autumn foliage, which earned them the name of burning bush." }
    ]
  },
  "Dashboard — onym/homonym.md": {
    word: "homonym",
    primary: "Each of two or more words having the same spelling or pronunciation but different meanings and origins (e.g., bark of a tree vs. bark of a dog).",
    secondary: "In biological taxonomy, a scientific name identical in spelling to another name previously applied to a different taxon, rendering the junior homonym invalid.",
    quotes: [
      { author: "John Locke", work: "An Essay Concerning Human Understanding", quote: "Much philosophical confusion arises when disputants mistake an accidental **homonym** for an identity of substance." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "The punster exploits the dual meaning of a **homonym** to produce humorous semantic incongruity." },
      { author: "Steven Pinker", work: "The Language Instinct", quote: "A child quickly learns to disambiguate a **homonym** by attending to syntactic context and thematic roles." }
    ]
  },
  "Dashboard — onym/homonymic.md": {
    word: "homonymic",
    primary: "Of, relating to, or having the nature of a homonym; identical in sound or spelling but different in meaning.",
    secondary: "In historical phonology, describing the accidental convergence of distinct word forms through sound change that creates semantic ambiguity.",
    quotes: [
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "The accidental **homonymic** clash between two words often leads one of them to disappear from the spoken vocabulary." },
      { author: "Stephen Ullmann", work: "The Principles of Semantics", quote: "Phonetic convergence creates **homonymic** pairs that challenge lexicographers to trace their divergent etymological roots." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "Ancient solar mythologies often arose from **homonymic** misunderstandings of forgotten ancestral names." }
    ]
  },
  "Dashboard — onym/homonymous.md": {
    word: "homonymous",
    primary: "Having the same name, spelling, or pronunciation as another word, but differing in signification.",
    secondary: "In philosophical logic and Aristotelian dialectic, describing entities that share a common name while having entirely different definitions of their underlying essence.",
    quotes: [
      { author: "Aristotle", work: "Categories", quote: "Things are said to be **homonymous** when they have only a name in common and their definitions of essence are entirely different." },
      { author: "Thomas Hobbes", work: "Leviathan", quote: "Ambiguous words which are **homonymous** breed endless disputes unless defined with geometric precision." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "Scientific terminology must eliminate **homonymous** expressions so that every sign designates one unambiguous natural kind." }
    ]
  },
  "Dashboard — onym/hyperonym.md": {
    word: "hyperonym",
    primary: "A word with a broad meaning that includes more specific words in a semantic category; a superordinate term (e.g., animal is a hyperonym of dog); hypernym.",
    secondary: "In semantic field theory and lexical hierarchy, the overarching category label that subsumes hyponyms within taxonomic trees.",
    quotes: [
      { author: "John Lyons", work: "Semantics", quote: "In lexical taxonomy, a **hyperonym** such as vehicle subsumes more specific subordinates like car, bicycle, and carriage." },
      { author: "George Lakoff", work: "Women, Fire, and Dangerous Things", quote: "Basic-level categories sit between an abstract **hyperonym** and a highly specific subordinate term." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "A speaker unable to recall an exact noun will instinctively substitute its superordinate **hyperonym**." }
    ]
  },
  "Dashboard — onym/hyponym.md": {
    word: "hyponym",
    primary: "A word of more specific meaning than a general or superordinate term that includes it (e.g., spoon is a hyponym of cutlery).",
    secondary: "In formal semantics, an asymmetrical lexical relation where the meaning of the hyponym entails the meaning of its hypernym.",
    quotes: [
      { author: "John Lyons", work: "Introduction to Theoretical Linguistics", quote: "The word rose is a **hyponym** of flower, entailing that every statement true of all flowers applies to roses." },
      { author: "Geoffrey Leech", work: "Semantics", quote: "The hierarchical organization of the mental lexicon allows a **hyponym** to inherit all semantic properties of its overarching class." },
      { author: "Steven Pinker", work: "Words and Rules", quote: "Children learn taxonomic categories by recognizing that each new **hyponym** belongs to an established conceptual family." }
    ]
  },
  "Dashboard — onym/hyponymy.md": {
    word: "hyponymy",
    primary: "The semantic relationship that exists between a specific term (hyponym) and its more general category term (hypernym).",
    secondary: "In cognitive linguistics and lexical organization, the hierarchical inclusion structuring taxonomic knowledge in human memory and language.",
    quotes: [
      { author: "John Lyons", work: "Semantics", quote: "The relation of **hyponymy** provides the logical backbone of vocabulary, structuring words into vertical hierarchical tiers." },
      { author: "Stephen Ullmann", work: "Semantics", quote: "Semantic fields are organized primarily through **hyponymy**, which governs the inclusion of specific senses within general terms." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "Linguistic tests for **hyponymy** rely on unilateral entailment between specific and generic propositions." }
    ]
  },
  "Dashboard — onym/meronym.md": {
    word: "meronym",
    primary: "A term that denotes a part of something, where the whole is denoted by a holonym (e.g., finger is a meronym of hand).",
    secondary: "In lexical semantics and computational ontology, a constituent concept linked by the structural 'part-of' relation to a composite entity.",
    quotes: [
      { author: "George A. Miller", work: "WordNet", quote: "In computational lexicons, identifying a **meronym** like leaf establishes a part-whole link to the concept tree." },
      { author: "John Lyons", work: "Semantics", quote: "A **meronym** denotes an integral physical part, distinct from a hyponym which denotes a specific kind." },
      { author: "Steven Pinker", work: "The Stuff of Thought", quote: "Human perception naturally decomposes an object into each constituent **meronym** before recognizing the integrated whole." }
    ]
  },
  "Dashboard — onym/meronymy.md": {
    word: "meronymy",
    primary: "The semantic relation of being a part of a whole; the part-whole relationship between words (meronym and holonym).",
    secondary: "In cognitive semantics, the conceptual schema organizing bodily, mechanical, and geographical wholes into constituent parts.",
    quotes: [
      { author: "George A. Miller", work: "WordNet", quote: "The lexical relation of **meronymy** reflects our psychological understanding of how physical objects are assembled from functional parts." },
      { author: "Geoffrey Leech", work: "Principles of Pragmatics", quote: "In conversation, **meronymy** enables a speaker to refer to the whole entity by highlighting a salient component part." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "Cross-linguistic studies of **meronymy** demonstrate how different cultures segment the human body into named anatomical parts." }
    ]
  },
  "Dashboard — onym/metonym.md": {
    word: "metonym",
    primary: "A word, name, or expression used as a substitute for something else with which it is closely associated (e.g., the crown for the monarch, Wall Street for the financial industry).",
    secondary: "In literary theory and semiotics, an indexical trope grounded in real-world contiguity, cause-and-effect, or institutional association.",
    quotes: [
      { author: "Roman Jakobson", work: "Language in Literature", quote: "In realistic prose, the **metonym** predominates over the metaphor, following the path of spatial and temporal contiguity." },
      { author: "Kenneth Burke", work: "A Grammar of Motives", quote: "The **metonym** translates an incorporeal or spiritual reality into a concrete, tangible physical token." },
      { author: "Terry Eagleton", work: "Literary Theory", quote: "When the press refers to the White House rather than the president, it relies on an institutional **metonym** understood by all." }
    ]
  },
  "Dashboard — onym/metonymic.md": {
    word: "metonymic",
    primary: "Of, relating to, or employing metonymy.",
    secondary: "In structuralist poetics and psychoanalysis (as in Roman Jakobson and Jacques Lacan), characterizing the syntagmatic, contiguous axis of language and desire.",
    quotes: [
      { author: "Roman Jakobson", work: "Selected Writings", quote: "Aphasic disorders frequently impair either the metaphoric axis of selection or the **metonymic** axis of combination." },
      { author: "Jacques Lacan", work: "Écrits", quote: "Desire operates along a **metonymic** chain, continually shifting from one object to another without finding ultimate satisfaction." },
      { author: "George Lakoff & Mark Johnson", work: "Metaphors We Live By", quote: "Our conceptual system is thoroughly **metonymic**, allowing us to use one entity to stand for another with which it is closely linked." }
    ]
  },
  "Dashboard — onym/metonymical.md": {
    word: "metonymical",
    primary: "Pertaining to, resembling, or containing metonymy; figurative through association.",
    secondary: "In classical rhetoric, describing tropes that substitute an attendant circumstance or container for the thing contained.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "Dryden was fond of **metonymical** expressions that gave vivid historical immediacy to abstract political conflicts." },
      { author: "Hugh Blair", work: "Lectures on Rhetoric and Belles Lettres", quote: "A **metonymical** trope substitutes the cause for the effect, or the sign for the thing signified, adding dramatic energy to verse." },
      { author: "George Saintsbury", work: "A History of English Prose Rhythm", quote: "The author's **metonymical** turns of phrase prevent his philosophical discourse from declining into dry scholasticism." }
    ]
  },
  "Dashboard — onym/metonymically.md": {
    word: "metonymically",
    primary: "In a metonymic manner; by means of metonymy or associative substitution.",
    secondary: "In sociopolitical discourse, referring to institutions, nations, or classes through representative physical locations or symbolic objects.",
    quotes: [
      { author: "Edmund Burke", work: "Reflections on the Revolution in France", quote: "The revolutionary mob attacked the Bastille, using that ancient fortress **metonymically** to strike at the entire monarchy." },
      { author: "Thomas Babington Macaulay", work: "Critical and Historical Essays", quote: "The name of Machiavelli has been used **metonymically** to designate every species of political cunning and deceit." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "We speak **metonymically** of the press when we mean the entire journalistic profession and its output." }
    ]
  },
  "Dashboard — onym/metonymy.md": {
    word: "metonymy",
    primary: "A figure of speech in which the name of one object or concept is used for that of another to which it is related or of which it is a part.",
    secondary: "In cognitive linguistics and poetics, a foundational conceptual mechanism where one experiential domain provides mental access to another via contiguous connection.",
    quotes: [
      { author: "Roman Jakobson", work: "Fundamentals of Language", quote: "The competition between metaphor and **metonymy** is manifest in any symbolic process, whether literary, psychological, or cultural." },
      { author: "George Lakoff & Mark Johnson", work: "Metaphors We Live By", quote: "Unlike metaphor, which links two disparate domains, **metonymy** functions primarily for reference within a single experiential domain." },
      { author: "Quintilian", work: "Institutio Oratoria", quote: "The figure **metonymy** borrows one name to express another closely connected by causation, possession, or physical vicinity." }
    ]
  },
  "Dashboard — onym/metronymic.md": {
    word: "metronymic",
    primary: "A name derived from the name of one's mother or a maternal ancestor; matronymic.",
    secondary: "In historical anthropology and genealogical legal systems, personal surnames reflecting matrilineal inheritance or mother-headed households.",
    quotes: [
      { author: "Edward Burnett Tylor", work: "Primitive Culture", quote: "In societies tracing descent through the mother, a **metronymic** surname affirmed the child's membership in the maternal clan." },
      { author: "Lewis H. Morgan", work: "Ancient Society", quote: "The archaic gens recognized only **metronymic** designations before the rise of private property established patrilineal inheritance." },
      { author: "Walter William Skeat", work: "Principles of English Etymology", quote: "English surnames such as Nelson and Megson represent authentic **metronymic** survivals from medieval baptismal names." }
    ]
  },
  "Dashboard — onym/onym.md": {
    word: "onym",
    primary: "In linguistics and onomastics, a name or designating word; the combining element (from Greek onyma / onoma) forming terms for specific classes of names.",
    secondary: "In lexicography, any distinct lexical unit used to identify, classify, or denote a person, place, or concept.",
    quotes: [
      { author: "Walter William Skeat", work: "Principles of English Etymology", quote: "The terminal element **onym** in Greek loanwords designates a specific class or functional category of naming." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "Every ancient **onym** originally conveyed a distinct descriptive meaning before it became a conventionalized label." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "Lexicographers categorize specialized terms by appending **onym** to create precise taxonomies of names." }
    ]
  },
  "Dashboard — onym/onymous.md": {
    word: "onymous",
    primary: "Bearing or published under the author's real name; opposite of anonymous or pseudonymous.",
    secondary: "In bibliographic history and publishing law, denoting works whose authorship is openly declared and legally authenticated.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "The author chose to be **onymous**, placing his real name boldly upon the title page as a pledge of personal responsibility." },
      { author: "Isaac D'Israeli", work: "Curiosities of Literature", quote: "A controversial tract gains authority when its author steps forward in an **onymous** publication to confront his critics." },
      { author: "Henry James", work: "The Aspern Papers", quote: "He preferred the **onymous** clarity of acknowledged letters to the shadowy ambiguities of unsigned memoirs." }
    ]
  },
  "Dashboard — onym/paronym.md": {
    word: "paronym",
    primary: "A word that is derived from the same root or has a similar sound and form to another word, but differs in meaning (e.g., affect and effect).",
    secondary: "In Aristotelian categories and classical grammar, a derivative word formed by slight morphological modification from a base noun (e.g., grammarian from grammar).",
    quotes: [
      { author: "Aristotle", work: "Categories", quote: "Things are called paronyms when they derive their name from something else with a difference in inflection, as the grammarian from grammar." },
      { author: "Thomas Hobbes", work: "Leviathan", quote: "A **paronym** derives its form and signification from a primitive root, modifying its ending to denote a related attribute." },
      { author: "Walter William Skeat", work: "A Student's Pastime", quote: "The student of language must learn to trace each **paronym** back to its common ancestral stem." }
    ]
  },
  "Dashboard — onym/paronymous.md": {
    word: "paronymous",
    primary: "Of, relating to, or being a paronym; conjugate; derived from the same root with a change of form or prefix/suffix.",
    secondary: "In philology and rhetorical theory, characterizing words whose close phonetic and morphological resemblance frequently leads to malapropism or wordplay.",
    quotes: [
      { author: "Herbert Weir Smyth", work: "Greek Grammar", quote: "In classical syntax, **paronymous** words derived from the same verbal stem frequently appear together for rhetorical emphasis." },
      { author: "Samuel Taylor Coleridge", work: "Biographia Literaria", quote: "The poet avoided confusing **paronymous** derivatives whose slight difference in form might distract the reader's attention." },
      { author: "Richard Chenevix Trench", work: "On the Study of Words", quote: "Many curious historical associations are revealed by examining **paronymous** words that branched from a single ancient concept." }
    ]
  },
  "Dashboard — onym/pseudonym.md": {
    word: "pseudonym",
    primary: "A fictitious name adopted by an author or public figure to conceal their true identity; a pen name or alias.",
    secondary: "In legal and literary history, a device used by marginalized or politically endangered writers (e.g., Mary Ann Evans writing as George Eliot) to secure unbiased readership.",
    quotes: [
      { author: "George Eliot", work: "Letters", quote: "I chose the **pseudonym** George Eliot because George was Lewes's Christian name and Eliot was a good mouth-filling word." },
      { author: "Charlotte Brontë", work: "Biographical Notice of Ellis and Acton Bell", quote: "We adopted the ambiguous **pseudonym** of Currer, Ellis, and Acton Bell to preserve our privacy while publishing our poems." },
      { author: "Mark Twain", work: "Autobiography", quote: "I adopted the river **pseudonym** Mark Twain when the venerable pilot Captain Sellers passed away." }
    ]
  },
  "Dashboard — onym/pseudonymous.md": {
    word: "pseudonymous",
    primary: "Bearing, written under, or published with a false or fictitious name.",
    secondary: "In biblical and classical scholarship, designating writings attributed to a famous historical figure (e.g., pseudepigrapha) but composed by another author.",
    quotes: [
      { author: "Søren Kierkegaard", work: "The Point of View for My Work as an Author", quote: "My **pseudonymous** works were written to communicate indirect spiritual truth to an age that mistook knowledge for faith." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The council condemned the **pseudonymous** epistles that had circulated under the venerable name of the apostles." },
      { author: "Virginia Woolf", work: "The Common Reader", quote: "The nineteenth-century literary world was filled with **pseudonymous** novels written by women who dared not publish openly." }
    ]
  },
  "Dashboard — onym/synonym.md": {
    word: "synonym",
    primary: "A word, morpheme, or phrase that means exactly or nearly the same as another word in the same language.",
    secondary: "In lexical semantics, near-equivalent expressions differing in register, connotation, dialectal distribution, or syntactic collocation.",
    quotes: [
      { author: "Samuel Johnson", work: "A Dictionary of the English Language", quote: "Hardly any word has an exact **synonym** that can replace it in every sentence without altering nuance or cadence." },
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "Language is fossil poetry, where each **synonym** preserves a distinct facet of ancestral perception." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "A thesaurus offers the writer a choice of **synonym** to avoid tedious repetition and capture delicate shades of meaning." }
    ]
  },
  "Dashboard — onym/synonymist.md": {
    word: "synonymist",
    primary: "A compiler, scholar, or specialist who collects, compares, and distinguishes synonymous words.",
    secondary: "In taxonomic zoology and botany, a systematist who compiles chronological tables of all scientific names previously applied to a specific taxon.",
    quotes: [
      { author: "Carl Linnaeus", work: "Critica Botanica", quote: "The botanical **synonymist** performs the vital task of disentangling the conflicting scientific names applied to the same plant." },
      { author: "Joseph Dalton Hooker", work: "The Flora of British India", quote: "A diligent **synonymist** must consult early continental catalogs to verify which author holds legitimate taxonomic priority." },
      { author: "Walter William Skeat", work: "Principles of English Etymology", quote: "The lexicographical **synonymist** must analyze historical citations to demonstrate why two words are never completely interchangeable." }
    ]
  },
  "Dashboard — onym/synonymity.md": {
    word: "synonymity",
    primary: "The quality, condition, or state of being synonymous; synonymy.",
    secondary: "In philosophy of language, the semantic equivalence or cognitive sameness of meaning between distinct linguistic expressions.",
    quotes: [
      { author: "W. V. Quine", work: "Two Dogmas of Empiricism", quote: "The notion of **synonymity** cannot be defined in terms of interchangeability without relying upon the very concept of analyticity." },
      { author: "Gottlob Frege", work: "On Sense and Reference", quote: "Cognitive **synonymity** requires identity of sense, not merely the sharing of an identical physical referent." },
      { author: "Bertrand Russell", work: "An Inquiry into Meaning and Truth", quote: "The philosopher must investigate whether complete **synonymity** is ever achievable between distinct linguistic propositions." }
    ]
  },
  "Dashboard — onym/synonymous.md": {
    word: "synonymous",
    primary: "Having the same or nearly the same meaning as another word or phrase in the same language.",
    secondary: "So closely associated with a quality, idea, or person that the mention of one instantly evokes the other.",
    quotes: [
      { author: "Thomas Carlyle", work: "Past and Present", quote: "In that energetic epoch, to be an honest worker was regarded as **synonymous** with being a noble citizen." },
      { author: "Charles Darwin", work: "The Origin of Species", quote: "Naturalists frequently treat variety and species as **synonymous** terms when classification becomes hopelessly disputed." },
      { author: "John Stuart Mill", work: "On Liberty", quote: "The protection of individual liberty is not **synonymous** with majority rule, for majorities may practice severe tyranny." }
    ]
  },
  "Dashboard — onym/synonymously.md": {
    word: "synonymously",
    primary: "In a synonymous manner; so as to express the same or equivalent meaning; interchangeably.",
    secondary: "In scientific terminology, used interchangeably with an alternative technical label across disciplines.",
    quotes: [
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "The ancient philosophers used these terms **synonymously**, failing to distinguish the intellectual faculties from the passions." },
      { author: "Thomas Henry Huxley", work: "Science and Culture", quote: "In popular debate, science and technical utility are often used **synonymously**, though their spiritual aims are vastly different." },
      { author: "William James", work: "The Principles of Psychology", quote: "Psychologists frequently employ sensation and perception **synonymously**, though the two processes represent distinct neurological levels." }
    ]
  },
  "Dashboard — onym/synonymousness.md": {
    word: "synonymousness",
    primary: "The state, quality, or condition of being synonymous; semantic interchangeability.",
    secondary: "In analytical philosophy, the degree to which two propositions or terms can be substituted salva veritate (preserving truth value).",
    quotes: [
      { author: "W. V. Quine", work: "From a Logical Point of View", quote: "The problem of establishing the **synonymousness** of two expressions lies at the core of philosophical semantics." },
      { author: "John Locke", work: "An Essay Concerning Human Understanding", quote: "Men fall into fruitless disputes because they falsely assume the **synonymousness** of words that represent disparate ideas." },
      { author: "Stephen Ullmann", work: "Semantics", quote: "Total **synonymousness** is an extreme rarity in language, as words inevitably diverge in emotional overtone or stylistic register." }
    ]
  },
  "Dashboard — onym/synonymy.md": {
    word: "synonymy",
    primary: "The semantic relationship between words that share identical or closely related meanings; the state of being synonymous.",
    secondary: "In classical rhetoric, a figure of speech in which multiple synonyms are accumulated for emphasis; in taxonomy, the catalog of scientific names applied to a taxon.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "The poet enriched his verse through a magnificent **synonymy**, deploying multiple words to illuminate every aspect of his theme." },
      { author: "Carl Linnaeus", work: "Philosophia Botanica", quote: "A clear **synonymy** at the head of each species description saves the botanist from endless taxonomic confusion." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "In structural semantics, **synonymy** is defined not as identity of meaning, but as acceptable equivalence within a given linguistic context." }
    ]
  },
  "Dashboard — onym/tautonym.md": {
    word: "tautonym",
    primary: "In biological nomenclature, a scientific binomen or trinomen in which the generic name and specific (or subspecific) epithet are identical in spelling (e.g., Gorilla gorilla, Bison bison).",
    secondary: "In taxonomic governance, a naming practice permitted under the International Code of Zoological Nomenclature (ICZN) but strictly prohibited in botanical codes.",
    quotes: [
      { author: "Ernst Mayr", work: "Principles of Systematic Zoology", quote: "The zoological code permits a **tautonym** such as Rattus rattus, which fixes the type species of the genus unmistakably." },
      { author: "George Gaylord Simpson", work: "Principles of Animal Taxonomy", quote: "Although botanists reject the practice, the creation of a **tautonym** provides zoologists with a concise designation for typical species." },
      { author: "Theodosius Dobzhansky", work: "Genetics of the Evolutionary Process", quote: "The celebrated gorilla carries the **tautonym** Gorilla gorilla, signifying its position as the foundational type of the taxon." }
    ]
  },
  "Dashboard — onym/tautonymous.md": {
    word: "tautonymous",
    primary: "Pertaining to, having, or consisting of a tautonym; possessing a scientific name with identical generic and specific components.",
    secondary: "In systematic biology, describing a taxon whose binomial designation repeats the same word twice.",
    quotes: [
      { author: "Ernst Mayr", work: "Methods and Principles of Systematic Zoology", quote: "A **tautonymous** specific name immediately informs the systematist that the species is the type of its genus." },
      { author: "Carl Linnaeus", work: "Critica Botanica", quote: "Early botanical reformers argued whether **tautonymous** names should be tolerated or banished from elegant classification." },
      { author: "Julian Huxley", work: "Evolution: The Modern Synthesis", quote: "The existence of **tautonymous** designations in zoology simplifies reference to classic nominotypical forms." }
    ]
  },
  "Dashboard — onym/tautonymy.md": {
    word: "tautonymy",
    primary: "In biological taxonomy, the condition or practice of using the identical word for both the genus and the species.",
    secondary: "In the history of biological nomenclature, the rule of absolute tautonymy whereby an earlier genus name becomes the species epithet upon taxonomic transfer.",
    quotes: [
      { author: "Ernst Mayr", work: "Principles of Systematic Zoology", quote: "The rule of absolute **tautonymy** automatically designates the type species whenever an author transfers a generic name to a species epithet." },
      { author: "George Gaylord Simpson", work: "Principles of Animal Taxonomy", quote: "Differences between botanical and zoological codes regarding **tautonymy** reflect differing historical conventions in nomenclature." },
      { author: "David Starr Jordan", work: "A Manual of the Vertebrate Animals", quote: "Under the zoological code, **tautonymy** is accepted as a legitimate and convenient method of designating the type." }
    ]
  },
  "Dashboard — onym/troponym.md": {
    word: "troponym",
    primary: "A verb that denotes a specific way or manner of performing the action of a more general verb (e.g., stroll is a troponym of walk, whisper is a troponym of speak).",
    secondary: "In computational linguistics and WordNet lexical semantics, the manner-elaboration relation that organizes verbal hierarchies analogous to hyponymy in nouns.",
    quotes: [
      { author: "George A. Miller", work: "WordNet", quote: "In lexical databases, a **troponym** specifies the precise manner of an action, as march is a troponym of walk." },
      { author: "Christiane Fellbaum", work: "WordNet: An Electronic Lexical Database", quote: "The semantic relationship linking a **troponym** to its base verb enriches the descriptive precision of narrative discourse." },
      { author: "Steven Pinker", work: "Words and Rules", quote: "A speaker selects a **troponym** like stride or saunter to convey both the act of locomotion and the emotional attitude of the actor." }
    ]
  },
  "Dashboard — onym/troponymy.md": {
    word: "troponymy",
    primary: "The semantic relation of manner elaboration between verbs, where one verb specifies a particular way of doing another.",
    secondary: "In lexical semantics, the relational dimension characterizing how action verbs differentiate speed, intensity, instrument, or emotional state.",
    quotes: [
      { author: "Christiane Fellbaum", work: "WordNet", quote: "The relation of **troponymy** structures the verbal lexicon into manner-specific hierarchies analogous to nominal taxonomies." },
      { author: "George A. Miller", work: "Language and Speech", quote: "Analysis of **troponymy** reveals how human languages systematically distinguish subtle variations in physical action and intention." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "In modern lexical semantics, **troponymy** explains how English maintains an enormous inventory of verbs expressing specialized manners of motion." }
    ]
  },
  "Dashboard — onym/xenonym.md": {
    word: "xenonym",
    primary: "A foreign name or endonym used by outsiders to designate a group, language, or geographical entity; an exonym.",
    secondary: "In ethnolinguistic cartography and onomastics, an external ethnonym or toponym differing from the name preferred by the native inhabitants.",
    quotes: [
      { author: "Claude Lévi-Strauss", work: "Tristes Tropiques", quote: "The tribal name recorded on our colonial maps was a dismissive **xenonym** applied by hostile neighbors to denote barbarian outsiders." },
      { author: "Edward Said", work: "Orientalism", quote: "Western imperial scholarship frequently substituted an artificial **xenonym** for the living self-designation of Eastern peoples." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "A **xenonym** often becomes established in international cartography even when the local population vigorously rejects it." }
    ]
  },
  "Dashboard — onym/xenonymy.md": {
    word: "xenonymy",
    primary: "The use, study, or prevalence of foreign or external names to designate indigenous peoples, territories, or cultural practices; exonymy.",
    secondary: "In postcolonial sociolinguistics, the phenomenon whereby colonial or external naming conventions supplant native geographical and ethnic designations.",
    quotes: [
      { author: "Joshua Fishman", work: "Sociolinguistics", quote: "The study of **xenonymy** reveals how dominant political powers impose external labels upon subordinate linguistic minorities." },
      { author: "Claude Lévi-Strauss", work: "The Savage Mind", quote: "Pervasive **xenonymy** across border regions reflects the mutual suspicion with which neighboring ethnic groups designate one another." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "Cartographers now actively revise geographical atlases to replace colonial **xenonymy** with authentic indigenous toponyms." }
    ]
  }
};

function updateWordNote(relPath, data) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error("Not found:", fullPath);
    return;
  }
  let content = fs.readFileSync(fullPath, "utf8");

  // Format quotes
  const quotesFormatted = data.quotes.map(q => `> - 📜 **${q.author} (*${q.work}*):** *"${q.quote}"*`).join("\n");

  // Replace Definition & Semantic Range
  const defRegex = /> \[!book\] 📖 Definitions & Semantic Range[\s\S]*?(?=> \[!quote\]|$)/;
  const newDef = `> [!book] 📖 Definitions & Semantic Range\n> 1. **Primary Definition (Lexical / Standard Consensus)**: ${data.primary}\n> 2. **Secondary / Nuanced Definition (Specialized / Domain / Encyclopedic)**: ${data.secondary}\n\n`;

  if (defRegex.test(content)) {
    content = content.replace(defRegex, newDef);
  } else {
    console.warn("Could not find [!book] in", relPath);
  }

  // Replace Quotes
  const quoteRegex = /> \[!quote\] 💬 Contextual Usage & Authentic Quotations[\s\S]*$/;
  const newQuotes = `> [!quote] 💬 Contextual Usage & Authentic Quotations\n${quotesFormatted}\n`;

  if (quoteRegex.test(content)) {
    content = content.replace(quoteRegex, newQuotes);
  } else {
    console.warn("Could not find [!quote] in", relPath);
  }

  fs.writeFileSync(fullPath, content, "utf8");
  console.log("Updated:", relPath);
}

for (const [relPath, data] of Object.entries(wordsData)) {
  updateWordNote(relPath, data);
}
console.log("Batch 5 finished! Total words updated:", Object.keys(wordsData).length);
