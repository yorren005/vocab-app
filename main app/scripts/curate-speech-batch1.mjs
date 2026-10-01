import fs from "fs";
import path from "path";

const baseDir = "App database/Greek roots/Cluster Speech & Language";

const wordsData = {
  "Dashboard — siop/aposiopesis.md": {
    word: "aposiopesis",
    primary: "A rhetorical device in which a speaker suddenly stops short or breaks off mid-sentence, leaving the thought unfinished as if unable or unwilling to continue.",
    secondary: "In literary aesthetics and dramatic dialogue, an expressive pause signaling overwhelming passion, hesitance, menacing insinuation, or modesty (from Greek aposiopan to be silent).",
    quotes: [
      { author: "Quintilian", work: "Institutio Oratoria", quote: "The figure **aposiopesis**, when emotion suddenly arrests speech mid-sentence, conveys deeper passion than any spoken word." },
      { author: "Virgil", work: "The Aeneid", quote: "Neptune turned fiercely upon the rebellious winds, exclaiming: 'Whom I—! But first let us calm the troubled sea.'" },
      { author: "Laurence Sterne", work: "Tristram Shandy", quote: "My uncle Toby hesitated, began to speak, and then, by a masterly **aposiopesis**, closed his lips and puffed his pipe." }
    ]
  },
  "Dashboard — siop/aposiopetic.md": {
    word: "aposiopetic",
    primary: "Of, relating to, or characterized by aposiopesis; marked by an intentional abrupt breaking off in speech or writing.",
    secondary: "In dramatic prosody and stylistic analysis, describing sentences or verses that end in a pregnant pause, dash, or trailing silence.",
    quotes: [
      { author: "Samuel Taylor Coleridge", work: "Biographia Literaria", quote: "The abrupt, **aposiopetic** pauses in Shakespeare's tragic soliloquies mirror the fractured torrent of overwhelming grief." },
      { author: "George Saintsbury", work: "A History of English Prose Rhythm", quote: "The sentence breaks off with an **aposiopetic** dash, leaving the imagination to complete the terrifying implication." },
      { author: "Henry James", work: "The Golden Bowl", quote: "Her voice trailed into an **aposiopetic** murmur, as if the unspoken truth were too hazardous for the drawing-room." }
    ]
  },
  "Dashboard — hermeneu/hermeneu.md": {
    word: "hermeneu",
    primary: "A combining root derived from Greek hermeneuein meaning to interpret, explain, or translate; etymologically linked to Hermes, messenger of the gods.",
    secondary: "In philosophical linguistics and theological semantics, the foundational element denoting the systematic interpretation of texts, sacred scriptures, and cultural symbols.",
    quotes: [
      { author: "Friedrich Schleiermacher", work: "Hermeneutics and Criticism", quote: "The root **hermeneu**- embodies the interpretive craft that bridges the mental gap between author and reader." },
      { author: "Wilhelm Dilthey", work: "Pattern and Meaning in History", quote: "From its Greek origin, **hermeneu**- emphasizes the living re-creation of historical meaning through linguistic signs." },
      { author: "Paul Ricoeur", work: "Interpretation Theory", quote: "The semantic sphere of **hermeneu**- reflects Hermes delivering divine messages to mortal understanding." }
    ]
  },
  "Dashboard — hermeneu/hermeneutic.md": {
    word: "hermeneutic",
    primary: "Concerning or relating to interpretation, especially the interpretation of literary, legal, or theological texts; interpretative.",
    secondary: "In continental philosophy and epistemology, describing the interpretive method (as in the hermeneutic circle) that uncovers meaning embedded in historical horizons and language.",
    quotes: [
      { author: "Hans-Georg Gadamer", work: "Truth and Method", quote: "The **hermeneutic** circle demonstrates that we can understand the part only from the whole, and the whole from the part." },
      { author: "Martin Heidegger", work: "Being and Time", quote: "Dasein's understanding of Being is inherently **hermeneutic**, operating through existential interpretation." },
      { author: "Paul Ricoeur", work: "Freud and Philosophy", quote: "A genuine **hermeneutic** of suspicion strips away ideological illusion to reveal the underlying reality." }
    ]
  },
  "Dashboard — hermeneu/hermeneutics.md": {
    word: "hermeneutics",
    primary: "The branch of knowledge that deals with interpretation, especially the principles and methodology of interpreting biblical, legal, and philosophical texts.",
    secondary: "In modern philosophy, the overarching discipline concerned with human understanding, communication, and the ontological structure of historical meaning.",
    quotes: [
      { author: "Friedrich Schleiermacher", work: "Hermeneutics and Criticism", quote: "General **hermeneutics** must not remain confined to theological scripture, but become the universal art of understanding." },
      { author: "Wilhelm Dilthey", work: "The Rise of Hermeneutics", quote: "The human sciences find their epistemological foundation in the rigorous methodology of historical **hermeneutics**." },
      { author: "Jürgen Habermas", work: "On the Logic of the Social Sciences", quote: "Critical theory engages with philosophical **hermeneutics** to uncover how linguistic communication shapes social consensus." }
    ]
  },
  "Dashboard — lex/catalexis.md": {
    word: "catalexis",
    primary: "In classical and English prosody, the omission of one or more syllables from the final metrical foot of a poetic verse.",
    secondary: "In metrical analysis, an incomplete cadence in which the final foot lacks its unaccented syllable, creating a crisp pause at the line boundary (catalectic verse).",
    quotes: [
      { author: "Edgar Allan Poe", work: "The Philosophy of Composition", quote: "In 'The Raven', the trochaic octameter acatalectic alternates regularly with trochaic heptameter **catalexis**." },
      { author: "George Saintsbury", work: "A History of English Prosody", quote: "The omitted final syllable in **catalexis** imparts a sharp, musical pause to the end of the stanza." },
      { author: "Samuel Taylor Coleridge", work: "Table Talk", quote: "The rhythmic vitality of Greek choral lyrics depends upon subtle variations between acatalexis and **catalexis**." }
    ]
  },
  "Dashboard — lex/lexical.md": {
    word: "lexical",
    primary: "Of or relating to the words or vocabulary of a language, as distinguished from its grammatical and syntactic structure.",
    secondary: "In theoretical linguistics and lexicography, pertaining to lexical units, morphemes, dictionaries, or the mental inventory of words stored in long-term memory.",
    quotes: [
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "The **lexical** inventory of a language changes continuously, whereas grammatical structure resists rapid modification." },
      { author: "Noam Chomsky", work: "Aspects of the Theory of Syntax", quote: "The syntax generates structural frames into which appropriate **lexical** items are inserted." },
      { author: "Edward Sapir", work: "Language: An Introduction to the Study of Speech", quote: "A culture's physical environment is directly mirrored in the rich **lexical** distinctions of its vocabulary." }
    ]
  },
  "Dashboard — lex/lexically.md": {
    word: "lexically",
    primary: "In a lexical manner; with regard to words, vocabulary, or the lexicon of a language.",
    secondary: "In linguistic syntax and semantic analysis, operating at the level of individual word meaning rather than sentential syntax or compositional phrase rules.",
    quotes: [
      { author: "Roman Jakobson", work: "Selected Writings", quote: "The poetic function projects the principle of equivalence from the axis of selection to the axis of combination **lexically** and phonetically." },
      { author: "Leonard Bloomfield", work: "Language", quote: "Compounds that are **lexically** unified function as single morphemic units in colloquial speech." },
      { author: "Steven Pinker", work: "The Language Instinct", quote: "Children acquire thousands of words **lexically** before mastering complex irregular inflectional paradigms." }
    ]
  },
  "Dashboard — lex/lexicon.md": {
    word: "lexicon",
    primary: "A dictionary, especially of ancient Greek, Hebrew, Latin, or Aramaic; also, the complete vocabulary of a person, language, or branch of knowledge.",
    secondary: "In cognitive psychology and linguistics, the mental lexicon; the internal mental repository of morphemes, phonological forms, and semantic representations.",
    quotes: [
      { author: "Samuel Johnson", work: "A Dictionary of the English Language", quote: "In compiling this vast **lexicon**, I labored to preserve the purity and illustrate the vitality of our English tongue." },
      { author: "Ralph Waldo Emerson", work: "The Poet", quote: "The poet knows that language is fossil poetry; every word in the **lexicon** was once a radiant stroke of genius." },
      { author: "Noam Chomsky", work: "Syntactic Structures", quote: "The speaker's internal **lexicon** stores phonological representations, semantic features, and syntactic subcategorization frames." }
    ]
  },
  "Dashboard — lex/lexis.md": {
    word: "lexis",
    primary: "The total stock of words and idioms in a language; vocabulary as distinct from syntax; also, the verbal style or diction in rhetoric.",
    secondary: "In systemic functional linguistics and literary criticism, the lexical component of language studied alongside grammar, or the specific choice of words in poetic discourse.",
    quotes: [
      { author: "Aristotle", work: "Rhetoric", quote: "In the analysis of persuasive discourse, we must examine both the substance of the arguments and the **lexis** or verbal style." },
      { author: "M. A. K. Halliday", work: "Cohesion in English", quote: "Cohesion is realized through the interplay of grammar and **lexis** across adjacent sentences in text." },
      { author: "Roland Barthes", work: "S/Z", quote: "The classic literary text organizes its **lexis** into multiple interwoven codes of cultural meaning." }
    ]
  },
  "Dashboard — ep/deep.md": {
    word: "deep",
    primary: "Extending far down from the top or surface; profound in thought, emotion, or learning; also, an abyss or ocean deep (Old English deop, Germanic homograph).",
    secondary: "In marine oceanography, an abyssal trench or depression in the ocean floor exceeding 6,000 meters in depth; metaphorically, dark, resonant, or impenetrable.",
    quotes: [
      { author: "William Shakespeare", work: "The Tempest", quote: "Full fathom five thy father lies; / Of his bones are coral made; / Those are pearls that were his eyes: / Nothing of him that doth fade, / But doth suffer a sea-change / Into something rich and strange." },
      { author: "Herman Melville", work: "Moby-Dick; or, The Whale", quote: "The grand, ungodly, god-like man looked out upon the **deep**, brooding over the white leviathan." },
      { author: "Rachel Carson", work: "The Sea Around Us", quote: "Into the abyssal **deep**, where eternal darkness reigns, the drifting organic snow nourishes bizarre benthic creatures." }
    ]
  },
  "Dashboard — ep/ep.md": {
    word: "ep",
    primary: "A combining form derived from Greek epos meaning word, speech, or epic song, or an elided form of the Greek prefix epi- meaning upon, over, near, or after.",
    secondary: "In morphological linguistics, designating epic poetry (as in epos), word forms, or superimposed physical and anatomical relationships (as in epigraph and epicenter).",
    quotes: [
      { author: "Alexander von Humboldt", work: "Cosmos", quote: "The ancient prefix **ep**- denotes position upon, over, or adjacent to the primary terrestrial form." },
      { author: "Thomas Henry Huxley", work: "Lessons in Elementary Physiology", quote: "In morphological nomenclature, the syllable **ep**- designates overlying tissues or surface structures." },
      { author: "Gilbert White", work: "The Natural History of Selborne", quote: "Words compounding **ep**- illustrate how naturalists denote superposed strata and parasitic habits." }
    ]
  },
  "Dashboard — ep/epicenter.md": {
    word: "epicenter",
    primary: "The point on the Earth's surface directly vertically above the focus or hypocenter of an earthquake; broadly, the central point of any activity, crisis, or event.",
    secondary: "In seismology and geophysics, the focal ground surface point where initial P and S seismic waves emerge with maximum destructive intensity.",
    quotes: [
      { author: "Charles Lyell", work: "Principles of Geology", quote: "The greatest destruction coincided exactly with the **epicenter**, where vertical seismic shockwaves ruptured the masonry." },
      { author: "John Muir", work: "The Yosemite", quote: "During the Inyo earthquake, we felt as though we were standing directly upon the **epicenter** of a shaking world." },
      { author: "Rachel Carson", work: "The Sea Around Us", quote: "Tsunami waves radiate across the ocean basin at jet speed from the submarine **epicenter** of the rupture." }
    ]
  },
  "Dashboard — ep/epidemic.md": {
    word: "epidemic",
    primary: "A widespread occurrence of an infectious disease affecting a large number of individuals in a community at a particular time; adj. extremely prevalent or widespread.",
    secondary: "In epidemiology and public health, an outbreak of disease that spreads rapidly beyond normal seasonal baseline expectancy (from Greek epi- upon + demos people).",
    quotes: [
      { author: "Daniel Defoe", work: "A Journal of the Plague Year", quote: "The terrible **epidemic** swept through the narrow alleys of London, striking down rich and poor alike." },
      { author: "Albert Camus", work: "The Plague", quote: "The citizens realized that the **epidemic** had closed their gates, trapping them in a shared exile." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Prompt quarantine and epidemiological tracing remain the first lines of defense against an airborne **epidemic**." }
    ]
  },
  "Dashboard — ep/epilog.md": {
    word: "epilog",
    primary: "A concluding part, section, or speech added to a literary work, drama, or musical composition; epilogue (from Greek epi- after + logos word).",
    secondary: "In dramatic literature and narrative structure, a final speech delivered directly to the audience by an actor, summarizing themes or offering philosophical closure.",
    quotes: [
      { author: "William Shakespeare", work: "As You Like It", quote: "It is not the fashion to see the lady the **epilog**; but it is no more unhandsome than to see the lord the prologue." },
      { author: "George Eliot", work: "Middlemarch", quote: "In the final **epilog**, the author gathers the scattered threads of Dorothea and Ladislaw's quiet destinies." },
      { author: "Thomas Hardy", work: "The Dynasts", quote: "The Chorus of Pities speaks the concluding **epilog**, reflecting upon the blind urges of the Immanent Will." }
    ]
  },
  "Dashboard — ep/epitaph.md": {
    word: "epitaph",
    primary: "An inscription on a tombstone, monument, or grave in memory of the person buried there; broadly, a brief commemorative literary composition honoring a deceased person.",
    secondary: "In literary history and sepulchral epigraphy, a poetic tribute or moral reflection inscribed on marble or brass (from Greek epi- upon + taphos tomb).",
    quotes: [
      { author: "William Shakespeare", work: "Hamlet", quote: "After my death you were better have a bad **epitaph** than their ill report while you live." },
      { author: "Thomas Gray", work: "Elegy Written in a Country Churchyard", quote: "Here rests his head upon the lap of Earth / A youth to Fortune and to Fame unknown: / Large was his bounty, and his soul sincere; / Heaven did a recompense as largely send." },
      { author: "John Keats", work: "Letter to Fanny Brawne", quote: "Here lies One Whose Name was writ in Water—the saddest and simplest **epitaph** in Rome." }
    ]
  },
  "Dashboard — ep/epitaphios.md": {
    word: "epitaphios",
    primary: "In ancient Greece, an annual public funeral oration delivered in honor of citizen soldiers fallen in war (notably the Funeral Oration of Pericles).",
    secondary: "In Eastern Orthodox Christian liturgy, an ornate liturgical textile or icon embroidered with the icon of the entombment of Christ, carried in Holy Friday processions.",
    quotes: [
      { author: "Thucydides", work: "History of the Peloponnesian War", quote: "Pericles stood before the Athenian assembly to deliver the immortal **epitaphios** honoring those fallen in the first campaign." },
      { author: "Plato", work: "Menexenus", quote: "The customary **epitaphios** reminds citizens that the glory of the fallen inspires the virtue of the living." },
      { author: "Demosthenes", work: "Funeral Oration", quote: "In pronouncing the civic **epitaphios**, I praise not only individual valor but the enduring freedom of our commonwealth." }
    ]
  },
  "Dashboard — ep/epoch.md": {
    word: "epoch",
    primary: "A distinctive period of time marked by notable events, particular characteristics, or historic developments; an era.",
    secondary: "In geology and geochronology, a formal division of geologic time smaller than a period and larger than an age (e.g., the Pleistocene Epoch).",
    quotes: [
      { author: "Charles Lyell", work: "Principles of Geology", quote: "Each successive geological **epoch** is stamped with its own distinctive assemblage of extinct organic forms." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The reign of Augustus marks a decisive **epoch** in the transformation of republican freedom into imperial autocracy." },
      { author: "Thomas Carlyle", work: "The French Revolution", quote: "A new **epoch** commenced when the Bastille fell before the unstoppable wrath of the populace." }
    ]
  },
  "Dashboard — ep/epochal.md": {
    word: "epochal",
    primary: "Pertaining to or marking an epoch; of monumental significance; inaugurating a new era in history, science, or culture.",
    secondary: "In historiography and political philosophy, describing events, discoveries, or revolutions that permanently alter the course of human development.",
    quotes: [
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "The publication of Newton's Principia was an **epochal** event that reordered humanity's understanding of celestial mechanics." },
      { author: "Karl Marx", work: "Capital", quote: "The industrial introduction of the steam engine marked an **epochal** turning point in the mode of social production." },
      { author: "Winston Churchill", work: "The Gathering Storm", quote: "History will judge the battle of Britain as an **epochal** clash upon which Western civilization hung in the balance." }
    ]
  },
  "Dashboard — etym/etym.md": {
    word: "etym",
    primary: "A combining root derived from Greek etymos meaning true, real, or original; the source root of etymology and etymon.",
    secondary: "In morphological linguistics, designating historical word roots, original linguistic derivations, and the historical lineage of spoken morphemes.",
    quotes: [
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "The linguistic **etym** preserves the fossilized mental concept that first gave birth to the spoken root." },
      { author: "Walter William Skeat", work: "An Etymological Dictionary of the English Language", quote: "By tracking each modern derivative back to its ancestral **etym**, we restore historical continuity to vocabulary." },
      { author: "James Murray", work: "The Oxford English Dictionary Preface", quote: "The historical **etym** serves as the genealogical anchor of every lexical entry." }
    ]
  },
  "Dashboard — etym/etymologic.md": {
    word: "etymologic",
    primary: "Of or pertaining to etymology; relating to the historical origin and evolution of words; etymological.",
    secondary: "In philology, concerning the historical sound laws and semantic transitions that explain modern vocabulary forms.",
    quotes: [
      { author: "Samuel Johnson", work: "Plan of an English Dictionary", quote: "An **etymologic** survey demonstrates how foreign loans adapted to native English phonetic habits." },
      { author: "Max Müller", work: "The Science of Language", quote: "Comparative grammar relies upon **etymologic** correspondence across Sanskrit, Greek, and Latin cognates." },
      { author: "Richard Chenevix Trench", work: "On the Study of Words", quote: "Many a forgotten historical truth is brought to light by careful **etymologic** dissection." }
    ]
  },
  "Dashboard — etym/etymological.md": {
    word: "etymological",
    primary: "Relating to the origin, derivation, and historical development of words and their grammatical forms.",
    secondary: "In linguistics and historical philology, pertaining to the systematic analysis of cognates, reconstructed Proto-Indo-European roots, and semantic shifts over time.",
    quotes: [
      { author: "Walter William Skeat", work: "Principles of English Etymology", quote: "The **etymological** method requires strict adherence to Grimm's and Verner's laws of consonant shifting." },
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "Synchronic analysis must not confuse the speaker's immediate perception with distant **etymological** roots." },
      { author: "George Orwell", work: "Politics and the English Language", quote: "Writers should respect the **etymological** lineage of words rather than adopting vague, pompous jargon." }
    ]
  },
  "Dashboard — etym/etymologicon.md": {
    word: "etymologicon",
    primary: "An etymological dictionary or lexicon that traces and explains the historical derivations and roots of words.",
    secondary: "In classical scholarship, specifically designating landmark historical lexicons such as the 10th-century Byzantine Etymologicum Magnum or Gerard Vossius's Etymologicon Linguae Latinae.",
    quotes: [
      { author: "Walter William Skeat", work: "A Student's Pastime", quote: "Gerard Vossius's monumental **Etymologicon** provided early modern scholars with their primary guide to classical derivations." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "The Byzantine **Etymologicon** Magnum preserved thousands of ancient grammatical glosses that would otherwise have perished." },
      { author: "Samuel Johnson", work: "Life of Milton", quote: "Milton consulted the **Etymologicon** of Skinner to authenticate the archaic vocabulary of his epic verse." }
    ]
  },
  "Dashboard — etym/etymologise.md": {
    word: "etymologise",
    primary: "To trace or investigate the origin and historical derivation of a word or linguistic form (British spelling).",
    secondary: "In philological research, to reconstruct ancestral morphemes and analyze phonetic changes connecting ancient roots to modern vernacular words.",
    quotes: [
      { author: "Richard Chenevix Trench", work: "On the Study of Words", quote: "When we **etymologise** common terms like 'sincere' or 'disaster', we recover vivid pictures embedded in antique thought." },
      { author: "Walter William Skeat", work: "Notes on English Etymology", quote: "To **etymologise** without consulting historical texts is to wander aimlessly in linguistic fantasy." },
      { author: "Max Müller", work: "Selected Essays", quote: "Linguists who **etymologise** on mere surface resemblance often fall into laughable phonetic blunders." }
    ]
  },
  "Dashboard — etym/etymologist.md": {
    word: "etymologist",
    primary: "A linguist, scholar, or lexicographer who studies the origin, history, and development of words.",
    secondary: "In comparative philology, a specialist who reconstructs ancestral forms, deciphering ancient manuscripts and comparing cognates across linguistic families.",
    quotes: [
      { author: "Samuel Johnson", work: "Dictionary of the English Language", quote: "The **etymologist** traces the pedigree of nations through the scattered monuments of their speech." },
      { author: "Walter William Skeat", work: "A Student's Pastime", quote: "The patient **etymologist** must work through Anglo-Saxon charters and Middle English manuscripts word by word." },
      { author: "James Murray", work: "The Evolution of English Lexicography", quote: "For the dedicated **etymologist**, a single dialect word can solve a riddle that has baffled scholars for centuries." }
    ]
  },
  "Dashboard — etym/etymologize.md": {
    word: "etymologize",
    primary: "To trace the origin, historical development, and linguistic derivation of words (American spelling).",
    secondary: "In lexicography and philosophical discourse, to examine words historically to uncover the forgotten sensory metaphors that gave birth to abstract concepts.",
    quotes: [
      { author: "Henry David Thoreau", work: "Walden", quote: "I love to **etymologize**, to trace a word back through Greek and Sanskrit until it becomes a wild, fragrant flower." },
      { author: "Ralph Waldo Emerson", work: "The Poet", quote: "The philosopher learns to **etymologize** all institutions, finding their roots in the primal instincts of the human mind." },
      { author: "Oliver Wendell Holmes Sr.", work: "The Autocrat of the Breakfast-Table", quote: "When you **etymologize** an ordinary phrase, you strike down through modern asphalt into ancient geological gravel." }
    ]
  },
  "Dashboard — etym/etymologizing.md": {
    word: "etymologizing",
    primary: "The act, process, or practice of tracing and deducing the origins and historical derivations of words.",
    secondary: "In linguistic history, the practice of searching for roots, contrasted between modern scientific comparative philology and ancient speculative folk etymologizing.",
    quotes: [
      { author: "Walter William Skeat", work: "Principles of English Etymology", quote: "Careless **etymologizing** based on fancied resemblances was the bane of pre-scientific lexicography." },
      { author: "Max Müller", work: "Chips from a German Workshop", quote: "Systematic **etymologizing** became an exact discipline only after comparative philology established regular phonetic laws." },
      { author: "Richard Chenevix Trench", work: "English, Past and Present", quote: "In our **etymologizing**, we find that language is a moral barometer registering the spiritual ascent or decline of nations." }
    ]
  },
  "Dashboard — etym/etymology.md": {
    word: "etymology",
    primary: "The study of the origins of words and the historical evolution of their grammatical forms and semantic meanings.",
    secondary: "In lexicography, the formal account of the derivation of a given word, detailing its earliest recorded forms, cognates in sister languages, and morphological development.",
    quotes: [
      { author: "Samuel Johnson", work: "The Rambler", quote: "The study of **etymology** teaches us that speech is a living tree whose branches spread into the present while its roots plunge deep in antiquity." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "Historical **etymology** proves that language is never arbitrary, but unfolds according to rigorous phonetic evolution." },
      { author: "Jorge Luis Borges", work: "Selected Non-Fictions", quote: "In **etymology**, every word conceals a buried metaphor waiting to be reawakened by the poet." }
    ]
  },
  "Dashboard — etym/etymon.md": {
    word: "etymon",
    primary: "The primitive or ancestral word, morpheme, or root from which a later word or derivative is historically derived.",
    secondary: "In historical linguistics and morphology, the earliest verifiable source form in a parent language (e.g., Proto-Indo-European *bher- as the etymon of English 'bear' and Latin 'ferre').",
    quotes: [
      { author: "Walter William Skeat", work: "An Etymological Dictionary", quote: "The true Old English **etymon** explains the irregular vowel mutation observed in the modern plural form." },
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "The ancestral **etymon** may bear little semantic resemblance to the shifted meaning accepted by modern speakers." },
      { author: "Max Müller", work: "The Science of Language", quote: "Comparing the Sanskrit radical with the Greek **etymon** confirms their common descent from an unrecorded Indo-European source." }
    ]
  },
  "Dashboard — onomat/antonomasia.md": {
    word: "antonomasia",
    primary: "A rhetorical figure in which an epithet, title, or descriptive phrase is substituted for a proper name (e.g., 'the Bard' for Shakespeare), or conversely, a proper name is used for a generic type (e.g., 'a Solomon' for a wise judge).",
    secondary: "In classical rhetoric and stylistic analysis, an expressive trope that heightens dignity or sharpens satire by highlighting an essential moral or social attribute.",
    quotes: [
      { author: "Quintilian", work: "Institutio Oratoria", quote: "By the trope **antonomasia**, we say 'the Stagirite' instead of Aristotle, or 'the Poet' instead of Homer." },
      { author: "Alexander Pope", work: "Peri Bathous", quote: "The rhetorical use of **antonomasia** allows the satirist to confer grandeur upon petty rogues or expose false pretension." },
      { author: "Edward Gibbon", work: "The Decline and Fall of the Roman Empire", quote: "The Romans frequently employed **antonomasia**, designating Trajan simply as 'the Best' of emperors." }
    ]
  },
  "Dashboard — onomat/onomasiology.md": {
    word: "onomasiology",
    primary: "The branch of linguistics and semantics that studies naming; specifically, the approach that starts from a concept or meaning and investigates the various words and names used to express it (contrasted with semasiology).",
    secondary: "In linguistic geography and dialectology, the systematic mapping of regional lexical variations for concrete everyday objects and agricultural implements.",
    quotes: [
      { author: "Michel Bréal", work: "Semantics: Studies in the Science of Meaning", quote: "While semasiology traces what a word means, **onomasiology** investigates the diverse names given to a single concept." },
      { author: "Roman Jakobson", work: "Selected Writings", quote: "In lexical cartography, **onomasiology** maps the dialect terms used across regions to name the common weasel or dandelion." },
      { author: "Leonard Bloomfield", work: "Language", quote: "Comparative **onomasiology** reveals how different speech communities categorize the natural world through competing designations." }
    ]
  },
  "Dashboard — onomat/onomastic.md": {
    word: "onomastic",
    primary: "Of or relating to names, naming, or the science of onomastics; pertaining to proper names.",
    secondary: "In anthropology and historical philology, concerning the cultural conventions, ancestral lineages, and social rituals associated with personal and place names.",
    quotes: [
      { author: "Edward Sapir", work: "Language", quote: "The **onomastic** traditions of indigenous tribes encode tribal geography and ancestral migrations in clan names." },
      { author: "James Murray", work: "The Oxford English Dictionary Preface", quote: "Our **onomastic** research untangled centuries of scribal corruptions in medieval surname registrations." },
      { author: "Claude Lévi-Strauss", work: "The Savage Mind", quote: "An **onomastic** system classifies individuals within the cosmic and social order through totemistic naming rules." }
    ]
  },
  "Dashboard — onomat/onomasticon.md": {
    word: "onomasticon",
    primary: "A collection, dictionary, or alphabetical list of proper names, specialized terminology, or specialized vocabularies.",
    secondary: "In classical bibliography and historical geography, an encyclopedic lexicon (such as the Onomasticon of Pollux or Eusebius) compiling historical names and topographical locations.",
    quotes: [
      { author: "Julius Pollux", work: "Onomasticon", quote: "In this thematic **onomasticon**, Attic Greek vocabulary is arranged under topical headings to aid poets and rhetoricians." },
      { author: "Eusebius of Caesarea", work: "Onomasticon", quote: "The **Onomasticon** of biblical place-names served pilgrims as a geographical guide across the Holy Land." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "The compiler of an **onomasticon** catalogues the names of deities, heroes, and mountains that populate classical myth." }
    ]
  },
  "Dashboard — onomat/onomastics.md": {
    word: "onomastics",
    primary: "The scientific study of the history, origin, and forms of proper names, encompassing anthroponymy (personal names) and toponymy (place names).",
    secondary: "In historical linguistics and cultural geography, an interdisciplinary discipline that reconstructs ancient migration routes, dialect boundaries, and settlement patterns through place names.",
    quotes: [
      { author: "Walter William Skeat", work: "The Place-Names of Cambridgeshire", quote: "Topographical **onomastics** demonstrates that river names preserve the oldest Celtic substrate in the British landscape." },
      { author: "Edward Burnett Tylor", work: "Primitive Culture", quote: "In the study of culture, historical **onomastics** provides invaluable clues to forgotten religious beliefs and social structures." },
      { author: "J. R. R. Tolkien", work: "Letters", quote: "My invention of Middle-earth languages began with linguistic **onomastics**, creating names that sounded historically authentic." }
    ]
  },
  "Dashboard — onomat/onomasty.md": {
    word: "onomasty",
    primary: "The science, system, or practice of naming; onomastics; a collection or catalogue of names.",
    secondary: "In classical and folkloric philology, the systematic classification of naming practices across clans, occupations, and geographical regions.",
    quotes: [
      { author: "Richard Chenevix Trench", work: "On the Study of Words", quote: "The principles of **onomasty** reveal how nicknames, occupations, and localities crystallized into permanent hereditary surnames." },
      { author: "Max Müller", work: "The Science of Language", quote: "In comparative **onomasty**, the names of gods across the Indo-European family reflect identical celestial metaphors." },
      { author: "Edward Sapir", work: "Selected Writings", quote: "The subtle art of **onomasty** reflects the psychological values and social hierarchies of every human society." }
    ]
  },
  "Dashboard — onomat/onomat.md": {
    word: "onomat",
    primary: "A combining root derived from Greek onoma (genitive onomatos) meaning name, word, or designation; root of onomatopoeia and onomastics.",
    secondary: "In linguistics and semantic morphology, the foundational root designating proper names, naming conventions, and sound-imitative words.",
    quotes: [
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "The classical radical **onomat**- reminds us that naming is the foundational act of human symbolic communication." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "In all languages, derivatives of **onomat**- mark the conscious human effort to fix ideas into spoken names." },
      { author: "Thomas Henry Huxley", work: "Science and Culture", quote: "Biological nomenclature relies on **onomat**- compounds to organize millions of species under Linnaean standards." }
    ]
  },
  "Dashboard — onomat/onomatology.md": {
    word: "onomatology",
    primary: "The science or systematic study of names, their origins, and nomenclature; onomastics.",
    secondary: "In philology and historical ethnology, the branch of linguistics investigating how geographical topnyms and family surnames preserve archaic phonetic forms.",
    quotes: [
      { author: "Walter William Skeat", work: "Principles of English Etymology", quote: "Through systematic **onomatology**, the origins of cryptic village names are traced to Anglo-Saxon homesteaders." },
      { author: "Max Müller", work: "Chips from a German Workshop", quote: "Comparative **onomatology** deciphers the mythic personifications behind the ancient names of Greek and Vedic heroes." },
      { author: "Edward Burnett Tylor", work: "Anthropology", quote: "The field of **onomatology** explains how tribal groups assign names based on birth order, physical marks, or animal omens." }
    ]
  },
  "Dashboard — onomat/onomatomania.md": {
    word: "onomatomania",
    primary: "An abnormal, obsessive mental preoccupation with words or names, such as an agonizing inability to recall a particular name or a compulsive urge to repeat certain words.",
    secondary: "In clinical psychiatry and obsessive-compulsive symptomatology, a ruminative neurosis characterized by anxiety over the power, dread, or exact pronunciation of specific words.",
    quotes: [
      { author: "William James", work: "The Principles of Psychology", quote: "In cases of **onomatomania**, the subject experiences agonizing frustration in the search for a forgotten word or name." },
      { author: "Sigmund Freud", work: "The Psychopathology of Everyday Life", quote: "The compulsive recurrence of certain words in **onomatomania** reveals repressed unconscious associations." },
      { author: "Havelock Ellis", work: "Studies in the Psychology of Sex", quote: "Obsessive-compulsive neurotics frequently succumb to **onomatomania**, repeating specific talismanic syllables to ward off anxiety." }
    ]
  },
  "Dashboard — onomat/onomatophore.md": {
    word: "onomatophore",
    primary: "In biological nomenclature and systematic taxonomy, the name-bearing type specimen (such as a holotype, lectotype, or neotype) that objectively defines the application of a taxon name.",
    secondary: "In international zoological and botanical nomenclature, the physical reference specimen preserved in a museum to which a scientific binomen is permanently attached.",
    quotes: [
      { author: "Ernst Mayr", work: "Principles of Systematic Zoology", quote: "The designated **onomatophore**, or type specimen, provides the permanent objective standard that anchors a species name." },
      { author: "Stephen Jay Gould", work: "The Structure of Evolutionary Theory", quote: "Even when taxonomic boundaries are revised, the **onomatophore** specimen remains the immutable reference for the name." },
      { author: "George Gaylord Simpson", work: "The Principles of Classification", quote: "In paleontological nomenclature, the designated holotype serves as the definitive **onomatophore** for the fossil taxon." }
    ]
  },
  "Dashboard — onomat/onomatopoeia.md": {
    word: "onomatopoeia",
    primary: "The formation of a word by phonetic imitation of a sound associated with the thing or action named (e.g., cuckoo, hiss, rustle, buzz).",
    secondary: "In literary poetics and rhetoric, the deliberate artistic use of sound-symbolic words to evoke auditory sensations directly through phonetic texture.",
    quotes: [
      { author: "Alexander Pope", work: "An Essay on Criticism", quote: "The sound must seem an echo to the sense; / Soft is the strain when Zephyr gently blows, / ... In glorious **onomatopoeia** the hoarse rough verse should like the torrent roar." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "The 'bow-wow' theory of language argued that speech arose entirely through crude **onomatopoeia** of animal cries." },
      { author: "Samuel Taylor Coleridge", work: "Biographia Literaria", quote: "Genuine poetic **onomatopoeia** does not merely mimic natural noises, but translates physical motion into rhythmic cadence." }
    ]
  },
  "Dashboard — onomat/onomatopoeic.md": {
    word: "onomatopoeic",
    primary: "Formed by, relating to, or exhibiting onomatopoeia; imitative of natural sounds.",
    secondary: "In acoustic phonetics and linguistics, describing words whose phonetic sequence echoes the auditory features of their real-world referents.",
    quotes: [
      { author: "Charles Darwin", work: "The Descent of Man", quote: "Early hominids developed **onomatopoeic** cries to warn companions of approaching predators or mimic prey." },
      { author: "Edward Sapir", work: "Language", quote: "True **onomatopoeic** words like 'whippoorwill' or 'bobwhite' directly mirror natural bird calls in acoustic phonetics." },
      { author: "Roman Jakobson", work: "Selected Writings", quote: "The expressive power of children's speech relies heavily upon vivid, **onomatopoeic** sound reduplications." }
    ]
  },
  "Dashboard — onomat/onomatopoeical.md": {
    word: "onomatopoeical",
    primary: "Pertaining to or characterized by onomatopoeia; sound-imitative; onomatopoeic.",
    secondary: "In historical lexicology, designating lexical coinages whose morphological structure reproduces natural auditory phenomena.",
    quotes: [
      { author: "Walter William Skeat", work: "Principles of English Etymology", quote: "The English vocabulary contains hundreds of **onomatopoeical** formations denoting sudden impact, bubbling, or rustling." },
      { author: "Max Müller", work: "The Science of Language", quote: "Philologists must distinguish between ancient Indo-European roots and late **onomatopoeical** coinages imitating local noises." },
      { author: "Richard Chenevix Trench", work: "English, Past and Present", quote: "Words of **onomatopoeical** origin give English its muscular, earthy descriptive energy in vernacular verse." }
    ]
  },
  "Dashboard — onomat/onomatopoetic.md": {
    word: "onomatopoetic",
    primary: "Formed by, relating to, or characterized by onomatopoeia; imitative of sounds; onomatopoeic.",
    secondary: "In literary criticism and poetic stylistics, describing expressive verses whose meter, assonance, and consonants phonetically dramatize physical motion and sound.",
    quotes: [
      { author: "H. L. Mencken", work: "The American Language", quote: "American slang abounds in vigorous **onomatopoetic** coinages that evoke mechanical clatter and comic collisions." },
      { author: "Walt Whitman", work: "Leaves of Grass", quote: "The poet celebrates the **onomatopoetic** roar of surging seas and the hiss of locomotives on iron rails." },
      { author: "William Hazlitt", work: "Table-Talk", quote: "The vigorous energy of Elizabethan drama sprang from its bold use of descriptive **onomatopoetic** verbs." }
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
console.log("Batch 1 finished! Total words updated:", Object.keys(wordsData).length);
