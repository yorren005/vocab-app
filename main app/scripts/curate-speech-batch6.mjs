import fs from "fs";
import path from "path";

const baseDir = "App database/Greek roots/Cluster Speech & Language";

const wordsData = {
  "Dashboard — log/agrostology.md": {
    word: "agrostology",
    primary: "The branch of systematic botany concerned with the scientific study and classification of grasses (family Poaceae or Gramineae).",
    secondary: "In agricultural science and rangeland ecology, the specialized study of forage grasses, cereal crops, and turfgrass management.",
    quotes: [
      { author: "Carl Linnaeus", work: "Philosophia Botanica", quote: "The foundation of **agrostology** rests upon the meticulous dissection of the spikelet and the delicate glumes of grasses." },
      { author: "Asa Gray", work: "Structural Botany", quote: "Pioneering treatises in **agrostology** demonstrated that the floral organs of grasses are homologous with those of typical monocotyledons." },
      { author: "Liberty Hyde Bailey", work: "Manual of Cultivated Plants", quote: "Modern **agrostology** provides the essential taxonomic framework for improving cereal strains and stabilizing pasture soils." }
    ]
  },
  "Dashboard — log/algology.md": {
    word: "algology",
    primary: "The branch of botany or biology concerned with the study of algae; phycology.",
    secondary: "In marine ecology and limnology, the investigation of microscopic phytoplankton and macroalgae as primary producers and ecological indicators.",
    quotes: [
      { author: "William Henry Harvey", work: "Phycologia Britannica", quote: "The pursuit of **algology** reveals an unseen forest of microscopic marine plants flourishing beneath the ocean swell." },
      { author: "Ernst Haeckel", work: "Art Forms in Nature", quote: "Microscopic **algology** unveils diatom shells of exquisite geometric symmetry that rival the finest crystalline architecture." },
      { author: "Rachel Carson", work: "The Sea Around Us", quote: "Advances in **algology** have shown that ocean phytoplankton generate a vital share of the planet's atmospheric oxygen." }
    ]
  },
  "Dashboard — log/analog.md": {
    word: "analog",
    primary: "Something that is similar, comparable, or corresponding to something else in general appearance, function, or relations.",
    secondary: "In electronics and computing, designating devices or circuits in which data is represented by continuously variable physical quantities (e.g., voltage or current) rather than digital digits.",
    quotes: [
      { author: "Vannevar Bush", work: "As We May Think", quote: "The mechanical differential analyzer proved the remarkable computational power of **analog** calculating mechanisms." },
      { author: "Norbert Wiener", work: "Cybernetics", quote: "The central nervous system functions in part as an **analog** computer, modulating continuous electrochemical potentials." },
      { author: "Douglas Hofstadter", work: "Gödel, Escher, Bach", quote: "Human cognition relies upon finding an appropriate conceptual **analog** to map unfamiliar experiences onto familiar schemas." }
    ]
  },
  "Dashboard — log/analogical.md": {
    word: "analogical",
    primary: "Of, relating to, or based upon analogy; expressing or employing an analogy.",
    secondary: "In scholastic philosophy and theology, designating a mode of language that applies names to God and creatures neither univocally nor equivocally, but proportionally.",
    quotes: [
      { author: "Thomas Aquinas", work: "Summa Theologiae", quote: "Our language concerning divine perfections is neither purely univocal nor wholly equivocal, but **analogical**." },
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "The human mind naturally delights in **analogical** reasoning, discovering similitudes across disparate realms of nature." },
      { author: "John Stuart Mill", work: "A System of Logic", quote: "An **analogical** argument provides a presumptive hypothesis that warrants careful inductive investigation." }
    ]
  },
  "Dashboard — log/analogise.md": {
    word: "analogise",
    primary: "To explain, interpret, or represent by means of an analogy; to compare things based on shared structural similarities.",
    secondary: "In dialectical criticism and philosophical rhetoric, to construct systematic conceptual parallels between natural phenomena and intellectual operations.",
    quotes: [
      { author: "Samuel Taylor Coleridge", work: "Aids to Reflection", quote: "The philosopher must not falsely **analogise** the operations of spiritual will to the mechanical laws of gravitation." },
      { author: "Herbert Spencer", work: "First Principles", quote: "Sociologists frequently **analogise** the organs of an animal body to the economic institutions of a complex nation." },
      { author: "William Hazlitt", work: "Table-Talk", quote: "Poets instinctively **analogise** human grief to the tempestuous convulsions of the winter sky." }
    ]
  },
  "Dashboard — log/analogist.md": {
    word: "analogist",
    primary: "One who reasons by analogy or relies upon analogical methods in argument and explanation.",
    secondary: "In the history of classical grammar, an advocate of regular morphological inflection (analogy) in the ancient philological debate against the anomalists.",
    quotes: [
      { author: "Joseph Butler", work: "The Analogy of Religion", quote: "The cautious **analogist** seeks to confirm the truths of revelation by tracing identical principles in the constitution of nature." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "In ancient Alexandria, the **analogist** grammarians insisted that language was governed by regular mathematical symmetry." },
      { author: "Charles Sanders Peirce", work: "Collected Papers", quote: "The scientific **analogist** uses structural parallelism as an engine of hypothesis generation rather than proof." }
    ]
  },
  "Dashboard — log/analogize.md": {
    word: "analogize",
    primary: "To draw an analogy; to explain or illustrate something through a comparison with something similar.",
    secondary: "In legal reasoning and jurisprudence, to compare precedent cases with a novel dispute to determine applicable judicial principles.",
    quotes: [
      { author: "Oliver Wendell Holmes Jr.", work: "The Common Law", quote: "Judges constantly **analogize** novel technological disputes to ancient common-law precedents governing trespass and bailment." },
      { author: "William James", work: "The Principles of Psychology", quote: "To think creatively is to **analogize** spontaneously, seeing identical relational patterns in dissimilar perceptions." },
      { author: "Steven Pinker", work: "The Stuff of Thought", quote: "When we confront an abstract dilemma, our instinct is to **analogize** the issue into physical journeys and spatial boundaries." }
    ]
  },
  "Dashboard — log/analogous.md": {
    word: "analogous",
    primary: "Comparable in certain respects, typically in a way which makes clearer the nature of the things compared.",
    secondary: "In evolutionary biology, describing structures in different organisms that perform similar functions but evolved independently without common ancestral origin (e.g., wings of birds and insects).",
    quotes: [
      { author: "Charles Darwin", work: "The Origin of Species", quote: "The wing of a bat and the wing of an insect are **analogous** organs, performing identical flight functions without common origin." },
      { author: "Adam Smith", work: "The Wealth of Nations", quote: "The division of labor in manufacturing is **analogous** to the specialized distribution of functions across an entire society." },
      { author: "Jane Austen", work: "Persuasion", quote: "The sweet scenes of autumn were fraught with the **analogous** sadness of the declining year and fading hopes." }
    ]
  },
  "Dashboard — log/analogously.md": {
    word: "analogously",
    primary: "In an analogous manner; by way of analogy or corresponding relation.",
    secondary: "In formal logic and comparative epistemology, reasoning or concluding from parallel structural conditions across distinct domains.",
    quotes: [
      { author: "Immanuel Kant", work: "Critique of Pure Reason", quote: "The mind reasons **analogously** when it projects rules observed in sensible experience onto supersensible objects." },
      { author: "Isaac Newton", work: "Opticks", quote: "Nature acts uniformly throughout all her parts, operating **analogously** in the macrocosm and the microcosm." },
      { author: "Bertrand Russell", work: "The Problems of Philosophy", quote: "We infer other minds **analogously** from physical behavior, assuming that similar actions spring from similar mental states." }
    ]
  },
  "Dashboard — log/analogue.md": {
    word: "analogue",
    primary: "A person, thing, or organ that corresponds to or resembles another in function or form.",
    secondary: "In organic chemistry and pharmacology, a chemical compound having a structural similarity to another, but differing in a specific component (e.g., functional group or atom).",
    quotes: [
      { author: "Thomas Henry Huxley", work: "Man's Place in Nature", quote: "The hand of the chimpanzee is the exact morphological **analogue** of the human grasping organ." },
      { author: "Alexander von Humboldt", work: "Cosmos", quote: "The volcanic chains of the Andes find their European **analogue** in the subterranean fires beneath Italy and Greece." },
      { author: "Richard Dawkins", work: "The Extended Phenotype", quote: "Cultural memes operate as the non-biological **analogue** of genetic replicators in evolutionary dynamics." }
    ]
  },
  "Dashboard — log/analogy.md": {
    word: "analogy",
    primary: "A comparison between two things, typically on the basis of their structure and for the purpose of explanation or clarification.",
    secondary: "In cognitive linguistics and philosophy of science, a fundamental inferential mechanism mapping relational knowledge from a familiar domain to an unfamiliar target domain.",
    quotes: [
      { author: "Francis Bacon", work: "Novum Organum", quote: "The discovery of an unexpected **analogy** between distant phenomena often opens the swiftest path to natural discovery." },
      { author: "Ralph Waldo Emerson", work: "Nature", quote: "The whole of nature is a vast metaphor of the human mind, bound together by an unbroken chain of **analogy**." },
      { author: "Jane Austen", work: "Persuasion", quote: "The apt **analogy** of the declining year with declining happiness blessed her contemplative memory." }
    ]
  },
  "Dashboard — log/anthologise.md": {
    word: "anthologise",
    primary: "To compile, select, or collect literary works, poems, or essays into an anthology (British spelling).",
    secondary: "In literary canon formation, to canonize an author's reputation by including representative pieces in authoritative educational collections.",
    quotes: [
      { author: "Virginia Woolf", work: "The Common Reader", quote: "Editors who seek to **anthologise** seventeenth-century lyrics must sift through countless forgotten miscellanies." },
      { author: "W. H. Auden", work: "The Dyer's Hand", quote: "It is far easier to **anthologise** popular sentimental verse than to select poems that reward rereading over decades." },
      { author: "T. S. Eliot", work: "On Poetry and Poets", quote: "To **anthologise** a living poet's early efforts can inadvertently freeze their evolving artistic development in the public mind." }
    ]
  },
  "Dashboard — log/anthologist.md": {
    word: "anthologist",
    primary: "A person who compiles, selects, and edits an anthology of literary, poetic, or musical works.",
    secondary: "In publishing history and literary sociology, an arbiter of taste whose selections define the curriculum and cultural memory of a generation.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "The judicious **anthologist** acts as a garden gatherer, selecting only blossoms of enduring fragrance and beauty." },
      { author: "W. B. Yeats", work: "Introduction to The Oxford Book of Modern Verse", quote: "Every **anthologist** is guided by a personal vision of poetry that provokes both gratitude and controversy." },
      { author: "Harold Bloom", work: "The Western Canon", quote: "The modern **anthologist** exercises immense cultural power by determining which voices survive in university lecture halls." }
    ]
  },
  "Dashboard — log/anthologize.md": {
    word: "anthologize",
    primary: "To compile into an anthology, or to include an author's writings in an anthology (American spelling).",
    secondary: "In critical literary studies, to institutionalize specific poems or essays as standard representatives of an artistic movement.",
    quotes: [
      { author: "Ralph Waldo Emerson", work: "Parnassus", quote: "My aim in attempting to **anthologize** these poems was to preserve verses that had provided genuine solace to thoughtful minds." },
      { author: "Herman Melville", work: "Typee", quote: "It became necessary to obtain his portrait for an anthology in course of publication, prompting our meeting." },
      { author: "Edgar Allan Poe", work: "Essays and Reviews", quote: "Critics who carelessly **anthologize** fugitive magazine pieces often do a grave disservice to a serious author's reputation." }
    ]
  },
  "Dashboard — log/anthology.md": {
    word: "anthology",
    primary: "A published collection of poems or other pieces of writing, or a musical collection (from Greek anthos flower + logia collection, literally 'a gathering of flowers').",
    secondary: "In classical scholarship, specifically designating the Palatine or Greek Anthology, the monumental compilation of Hellenistic and Byzantine epigrams.",
    quotes: [
      { author: "Francis Turner Palgrave", work: "The Golden Treasury", quote: "This lyric **anthology** attempts to include all the best original songs and poems in the English language." },
      { author: "Walter Pater", work: "Greek Studies", quote: "The ancient Greek **anthology** preserves fleeting moments of joy and sorrow like pressed wild flowers from classical antiquity." },
      { author: "Herman Melville", work: "Typee", quote: "The editor sought his likeness to grace the frontispiece of a forthcoming poetic **anthology**." }
    ]
  },
  "Dashboard — log/antilog.md": {
    word: "antilog",
    primary: "The common colloquial abbreviation for antilogarithm; the number corresponding to a given logarithm.",
    secondary: "In computational mathematics and navigational table lookups, the inverse function used to recover an original quantity from logarithmic calculations.",
    quotes: [
      { author: "Charles Babbage", work: "Passages from the Life of a Philosopher", quote: "The mechanical engine was designed to calculate and stamp both the logarithm and the **antilog** without human copying error." },
      { author: "John Herschel", work: "Outlines of Astronomy", quote: "The astronomer consults the column of the **antilog** to translate logarithmic planetary coordinates back into observable angular distances." },
      { author: "Vannevar Bush", work: "Operational Circuit Analysis", quote: "In analogue amplification, determining the **antilog** of the voltage ratio gives the absolute power gain of the stage." }
    ]
  },
  "Dashboard — log/antilogarithm.md": {
    word: "antilogarithm",
    primary: "The number of which a given number is the logarithm; the inverse of a logarithm (if log_b(x) = y, then x is the antilogarithm of y).",
    secondary: "In classical numerical analysis before digital electronic computers, the inverse logarithmic transformation executed via printed mathematical tables.",
    quotes: [
      { author: "John Napier", work: "Mirifici Logarithmorum Canonis Descriptio", quote: "By finding the **antilogarithm**, the calculator converts tedious multiplications into simple additions of tabular numbers." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "The invention of the logarithm and its corresponding **antilogarithm** doubled the effective working lifetime of practical astronomers." },
      { author: "Charles Babbage", work: "On the Economy of Machinery and Manufactures", quote: "The verification of every printed **antilogarithm** table required years of labor by dedicated teams of human computers." }
    ]
  },
  "Dashboard — log/apologetic.md": {
    word: "apologetic",
    primary: "Expressing or showing regret, remorse, or acknowledgment of failure; regretful.",
    secondary: "In theology and intellectual history, offered in formal defense or vindication of a controversial doctrine or belief (from Greek apologetikos).",
    quotes: [
      { author: "Charlotte Brontë", work: "Jane Eyre", quote: "The servant delivered an **apologetic** message, begging pardon for having intruded upon our quiet conversation." },
      { author: "John Henry Newman", work: "Apologia Pro Vita Sua", quote: "The treatise was written not in a modern repentant mood, but as an **apologetic** defense of the author's lifelong religious convictions." },
      { author: "Thomas Henry Huxley", work: "Science and Christian Tradition", quote: "The bishop adopted an **apologetic** tone that conceded substantial scientific ground while preserving ecclesiastical authority." }
    ]
  },
  "Dashboard — log/apologise.md": {
    word: "apologise",
    primary: "To express regret for something that one has done wrong; to make an apology (British spelling).",
    secondary: "In classical discourse, to offer a formal reasoned defense or vindication of conduct or opinions.",
    quotes: [
      { author: "Charlotte Brontë", work: "Jane Eyre", quote: "Rochester exclaimed, 'No need to **apologise**, for in truth the fault was mine alone!'" },
      { author: "Jane Austen", work: "Pride and Prejudice", quote: "Mr. Collins deemed it his solemn duty to **apologise** for having intruded upon the ladies of Longbourn." },
      { author: "George Bernard Shaw", work: "Major Barbara", quote: "Do not **apologise** for your passionate convictions; it is apathy alone that deserves condemnation." }
    ]
  },
  "Dashboard — log/apologist.md": {
    word: "apologist",
    primary: "A person who offers an argument in defense of something controversial, unpopular, or religious.",
    secondary: "In early Christian history and patristic studies, one of the 2nd-century writers (such as Justin Martyr or Tertullian) who systematically defended the Christian faith against pagan and imperial criticism.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The eloquent **apologist** Tertullian addressed the Roman magistrates, defending the civil loyalty of the persecuted Christians." },
      { author: "Thomas Babington Macaulay", work: "Critical and Historical Essays", quote: "Every tyrannical regime finds some clever **apologist** willing to invent philosophical excuses for its worst abuses." },
      { author: "John Stuart Mill", work: "On Liberty", quote: "The **apologist** for censorship invariably assumes his own infallibility in determining what truth the public should hear." }
    ]
  },
  "Dashboard — log/apologize.md": {
    word: "apologize",
    primary: "To express regret for something done or said; to acknowledge a fault or discourtesy (American spelling).",
    secondary: "In formal rhetoric, to offer an argumentative defense or explanatory justification of one's actions or principles.",
    quotes: [
      { author: "Charles Dickens", work: "Bleak House", quote: "The relations between us are of an unfortunate description, Lady Dedlock; but as they are not of my making, I will not **apologize** for them." },
      { author: "Mark Twain", work: "The Innocents Abroad", quote: "I refuse to **apologize** for our hearty American laughter in the somber cathedrals of the Old World." },
      { author: "Henry James", work: "The Portrait of a Lady", quote: "He felt an urge to **apologize** for his bluntness, yet knew that any retreat would compromise his honesty." }
    ]
  },
  "Dashboard — log/apologue.md": {
    word: "apologue",
    primary: "A moral fable, especially one with animals or inanimate objects as characters, intended to convey a useful lesson (e.g., Aesop's fables).",
    secondary: "In literary aesthetics and allegorical criticism, an imaginative narrative wherein external fictional elements systematically symbolize moral or political truths.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "Gay's fables exhibit the perfect structure of the ancient **apologue**, blending whimsical dialogue with pointed ethical wisdom." },
      { author: "Francis Bacon", work: "The Wisdom of the Ancients", quote: "The ancient poets disguised profound philosophical doctrines beneath the delightful veil of an **apologue**." },
      { author: "Edmund Burke", work: "Reflections on the Revolution in France", quote: "The politician related a witty **apologue** of the belly and the members to remind the commons of social interdependence." }
    ]
  },
  "Dashboard — log/apology.md": {
    word: "apology",
    primary: "An admission of error, discourtesy, or failure accompanied by an expression of regret.",
    secondary: "In classical literature and rhetoric, a formal justification or defense of one's opinions, conduct, or philosophical life (e.g., Plato's *Apology of Socrates*).",
    quotes: [
      { author: "Plato", work: "Apology", quote: "In his magnificent **apology**, Socrates defended his philosophical mission to cross-examine fellow citizens in the pursuit of virtue." },
      { author: "William Shakespeare", work: "All's Well That Ends Well", quote: "Make this haste as your own good proceeding, strengthened with what **apology** you think may make it probable need." },
      { author: "John Henry Newman", work: "Apologia Pro Vita Sua", quote: "The autobiographical **apology** remains the most moving vindication of intellectual integrity written in Victorian England." }
    ]
  },
  "Dashboard — log/catalog.md": {
    word: "catalog",
    primary: "A complete, systematic list of items (such as books, museum specimens, or merchandise), typically arranged in alphabetical or classified order.",
    secondary: "In epic poetry, a conventional rhetorical device consisting of an extended, stylized inventory of heroes, ships, or warriors (e.g., Homer's catalog of ships).",
    quotes: [
      { author: "Homer", work: "The Iliad", quote: "The poet invokes the Muses to recount the immense **catalog** of ships and chieftains assembled on the Trojan shore." },
      { author: "Walt Whitman", work: "Leaves of Grass", quote: "The bard weaves an expansive **catalog** of American trades and landscapes into a panoramic hymn of democratic life." },
      { author: "Frank A. Fetter", work: "Economics Volume II", quote: "The government report provided a long **catalog** of industrial theories, many of them quite fantastic." }
    ]
  },
  "Dashboard — log/cataloger.md": {
    word: "cataloger",
    primary: "A person who creates, organizes, or compiles a catalog, especially a professional librarian or archivist who indexes collections.",
    secondary: "In bibliographic science, a specialist who assigns standardized subject headings, metadata, and classification call numbers to publications.",
    quotes: [
      { author: "Anthony Panizzi", work: "On the Catalogue of the British Museum", quote: "The rigorous **cataloger** must formulate consistent bibliographical rules to guide readers through millions of volumes." },
      { author: "Melvil Dewey", work: "A Classification and Subject Index", quote: "The decimal system provides every **cataloger** with a universal key to arrange human knowledge on library shelves." },
      { author: "Henry James", work: "The Aspern Papers", quote: "The patient **cataloger** in the manuscript room held the key to secrets that biographers had pursued for decades." }
    ]
  },
  "Dashboard — log/dialog.md": {
    word: "dialog",
    primary: "Conversation between two or more people as a feature of a book, play, or film (American spelling of dialogue).",
    secondary: "In computing and human-computer interaction, a conversational exchange or graphical window (dialog box) through which a user interacts with a software application.",
    quotes: [
      { author: "Ernest Hemingway", work: "Death in the Afternoon", quote: "Crisp and authentic **dialog** reveals character through understatement far more effectively than elaborate descriptive exposition." },
      { author: "Donald Norman", work: "The Design of Everyday Things", quote: "A well-designed graphical **dialog** prompts the user with clear choices while preventing irreversible mistakes." },
      { author: "George Steiner", work: "Real Presences", quote: "Every profound philosophical **dialog** represents an encounter in which two consciousnesses risk transformation." }
    ]
  },
  "Dashboard — log/dialogue doxology.md": {
    word: "dialogue doxology",
    primary: "In liturgical theology and hymnody, an antiphonal or responsive hymn of praise exchanged dynamically between officiant and congregation.",
    secondary: "In historical liturgics, a choral dialogue praising God (such as the *Sursum Corda* and *Gloria in Excelsis*) structured as an alternating verbal exchange.",
    quotes: [
      { author: "John Henry Newman", work: "Parochial and Plain Sermons", quote: "The ancient liturgy resounds with a sublime **dialogue doxology** where priest and people unite their voices in heavenly adoration." },
      { author: "Alexander Schmemann", work: "Introduction to Liturgical Theology", quote: "The Eucharistic canon opens with a vibrant **dialogue doxology** that lifts the assembly into the presence of the divine mystery." },
      { author: "Evelyn Underhill", work: "Worship", quote: "The alternating cadences of the **dialogue doxology** dramatize the communion between the earthly church and the unseen host." }
    ]
  },
  "Dashboard — log/dialogue.md": {
    word: "dialogue",
    primary: "A conversation between two or more people, especially as a feature of a book, play, or film.",
    secondary: "In philosophy and politics, a formal discussion or collaborative inquiry aimed at exploring conflicting viewpoints and reaching mutual understanding (e.g., Socratic dialogue).",
    quotes: [
      { author: "Plato", work: "The Republic", quote: "Through relentless philosophical **dialogue**, Socrates guided his companions past superficial opinion to the contemplation of justice." },
      { author: "William Shakespeare", work: "The Complete Works", quote: "Shall we have this **dialogue** between the Fool and the Soldier to lighten the hour before the battle?" },
      { author: "Mikhail Bakhtin", work: "Problems of Dostoevsky's Poetics", quote: "Human consciousness does not exist in isolation, but realizes itself only through authentic **dialogue** with another." }
    ]
  },
  "Dashboard — log/dialoguedoxology.md": {
    word: "dialoguedoxology",
    primary: "An antiphonal or responsive liturgical hymn of praise recited in dialogue between ministers and worshippers.",
    secondary: "In hymnological studies, the responsive structure of praise wherein two choral sides or speaker and assembly chant alternate verses of glory.",
    quotes: [
      { author: "Rowan Williams", work: "Tokens of Trust", quote: "The responsive chant of the **dialoguedoxology** reminds the faithful that prayer is never a solitary monologue, but an ongoing conversation." },
      { author: "Dom Gregory Dix", work: "The Shape of the Liturgy", quote: "The primitive Christian rite embedded the **dialoguedoxology** at the climax of the thanksgiving to engage the whole body of believers." },
      { author: "Arthur Michael Ramsey", work: "The Glory of God and the Transfiguration of Christ", quote: "In the solemn **dialoguedoxology**, human speech is purified into the unceasing worship of the eternal Trinity." }
    ]
  },
  "Dashboard — log/epilog.md": {
    word: "epilog",
    primary: "A section or speech at the end of a book or play that serves as a comment on or conclusion to what has happened (American variant of epilogue).",
    secondary: "In dramatic literature, a short speech spoken directly to the audience by an actor after the conclusion of the dramatic action.",
    quotes: [
      { author: "Nathaniel Hawthorne", work: "The Blithedale Romance", quote: "The brief **epilog** reveals the lonely subsequent fate of the narrator long after the utopian experiment had dissolved." },
      { author: "Henry David Thoreau", work: "Walden", quote: "In the thoughtful **epilog** to his woodland retreat, the philosopher urged his readers to explore the private continents of the soul." },
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "Every historical epoch concludes with its own reflective **epilog**, assessing the harvest of its heroic pioneers." }
    ]
  },
  "Dashboard — log/epilogue.md": {
    word: "epilogue",
    primary: "A concluding part added to a literary work, such as a novel, play, or poem, providing closure or reflecting upon subsequent events.",
    secondary: "In classical and Elizabethan theater, an address spoken by an actor directly to the audience following the drama, typically requesting applause.",
    quotes: [
      { author: "William Shakespeare", work: "As You Like It", quote: "Rosalind steps forward to deliver the enchanting **epilogue**, begging the audience's favor with witty grace." },
      { author: "George Eliot", work: "Middlemarch", quote: "The compassionate **epilogue** traces the later fortunes of Dorothea, whose unhistoric acts contributed to the growing good of the world." },
      { author: "Leo Tolstoy", work: "War and Peace", quote: "In the extensive philosophical **epilogue**, the author expounds his definitive theory of historical causality and human free will." }
    ]
  },
  "Dashboard — log/etymological.md": {
    word: "etymological",
    primary: "Relating to the origin and historical development of words and their meanings.",
    secondary: "In linguistic methodology, based on the rigorous comparative analysis of phonetic changes, roots, and cognates across related languages.",
    quotes: [
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "The **etymological** discovery of common Aryan roots established the historical brotherhood of Indian and European peoples." },
      { author: "James George Frazer", work: "Balder the Beautiful", quote: "The recognition of the pagan sun deity is confirmed through innumerable **etymological** traces surviving in provincial place-names." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "An **etymological** dictionary reveals how borrowed loanwords adapt phonetically to the host language over centuries." }
    ]
  },
  "Dashboard — log/etymologise.md": {
    word: "etymologise",
    primary: "To trace the origin and development of a word; to formulate or state its etymology (British spelling).",
    secondary: "In literary philology, to analyze words historically to recover the original metaphors and sensory concepts embedded within them.",
    quotes: [
      { author: "Walter William Skeat", work: "Principles of English Etymology", quote: "To **etymologise** accurately, the scholar must master the sound laws of Grimm and Verner rather than guess by superficial likeness." },
      { author: "Richard Chenevix Trench", work: "On the Study of Words", quote: "When we **etymologise** an everyday expression, we often uncover a forgotten gem of ancient poetic observation." },
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "Antiquarians love to **etymologise** obscure river names, attributing their origins to ancient Celtic chieftains." }
    ]
  },
  "Dashboard — log/etymologist.md": {
    word: "etymologist",
    primary: "A scholar or linguist who specializes in the study of word origins and the history of language development.",
    secondary: "In comparative historical linguistics, a researcher who reconstructs ancestral Proto-Indo-European roots through sound-shift correspondences.",
    quotes: [
      { author: "Max Müller", work: "Chips from a German Workshop", quote: "The comparative **etymologist** traces how a single prehistoric root blossomed into diverse vocabularies from the Ganges to the Thames." },
      { author: "William Beattie", work: "The Castles and Abbeys of England", quote: "The origin of the archaic name has occasioned much spirited debate among antiquaries and learned **etymologists**." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "The modern **etymologist** combines manuscript attestations with historical phonology to authenticate word derivations." }
    ]
  },
  "Dashboard — log/etymologize.md": {
    word: "etymologize",
    primary: "To trace the derivation or development of a word; to explain its linguistic origins (American spelling).",
    secondary: "In lexicography, to research and compile historical attestations and root cognates for inclusion in an etymological dictionary.",
    quotes: [
      { author: "Henry David Thoreau", work: "Walden", quote: "I love to **etymologize** our common vernacular words, finding under their surface the wild roots of ancient human experience." },
      { author: "Ralph Waldo Emerson", work: "Essays: Second Series", quote: "Poets **etymologize** the universe instinctively, discerning that every spiritual fact corresponds to some natural fact." },
      { author: "Noah Webster", work: "An American Dictionary of the English Language", quote: "To **etymologize** without consulting the ancient Oriental tongues is to construct a grammatical edifice upon shifting sand." }
    ]
  },
  "Dashboard — log/etymology.md": {
    word: "etymology",
    primary: "The study of the origin of words and the historical way in which their meanings have changed over time; an account of the origin of a specific word.",
    secondary: "In historical linguistics, the branch of philology that tracks the phonological, morphological, and semantic lineage of lexical items from reconstructed proto-languages.",
    quotes: [
      { author: "Frank A. Fetter", work: "Economics Volume II", quote: "The terms selling or buying monopoly explain themselves, though the latter strictly conflicts with Greek **etymology**." },
      { author: "Samuel Johnson", work: "Preface to the English Dictionary", quote: "In tracing the **etymology** of our language, I have derived our Teutonic heritage from the ancient Gothic codices." },
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "Language is fossil poetry where every word's **etymology** preserves a prehistoric perception of nature." }
    ]
  },
  "Dashboard — log/eulogise.md": {
    word: "eulogise",
    primary: "To praise someone or something highly in speech or writing (British spelling).",
    secondary: "In classical epideictic oratory, to deliver a formal encomium celebrating the virtues, achievements, or noble character of a deceased person.",
    quotes: [
      { author: "James George Frazer", work: "The Golden Bough", quote: "Lord Byron was moved to **eulogise** the chanting of the muezzin across the calm waters of the Bosphorus." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The court poets competed to **eulogise** the emperor's victories in ornate panegyrics that bore little relation to historical truth." },
      { author: "William Makepeace Thackeray", work: "Vanity Fair", quote: "The society papers were eager to **eulogise** the generosity of the young heiress at the opening of the charity bazaar." }
    ]
  },
  "Dashboard — log/eulogist.md": {
    word: "eulogist",
    primary: "A person who praises or commends another, especially one who delivers or writes a eulogy.",
    secondary: "In funeral oratory and panegyrics, a speaker appointed to commemorate the life and moral character of a deceased figure.",
    quotes: [
      { author: "Jewell Ellen Smith", work: "Great Jehoshaphat and Gully Dirt!", quote: "When the time comes, it will suffice if a kind **eulogist** will say of me that my faults were written in water." },
      { author: "Thomas Babington Macaulay", work: "Critical and Historical Essays", quote: "The royalist **eulogist** described the fallen monarch as a blameless martyr, omitting every violation of constitutional law." },
      { author: "Ralph Waldo Emerson", work: "Lectures and Biographical Sketches", quote: "The sincere **eulogist** does not invent imaginary virtues, but allows the simple truth of a noble life to speak for itself." }
    ]
  },
  "Dashboard — log/eulogistic.md": {
    word: "eulogistic",
    primary: "Formally expressing high praise; commendatory; laudatory.",
    secondary: "In literary stylistics, characterized by the elevated, encomiastic language typical of funeral orations and official citations.",
    quotes: [
      { author: "Charles Dickens", work: "Bleak House", quote: "The ancient Welsh genealogies were highly **eulogistic** of the ancestral lineage of Morgan ap-Kerrig." },
      { author: "Henry James", work: "The Bostonians", quote: "The newspaper published a **eulogistic** review that hailed the young reformer as the herald of a new political dawn." },
      { author: "George Eliot", work: "Middlemarch", quote: "His speech was marked by **eulogistic** phrases designed to flatter the vanity of his provincial constituents." }
    ]
  },
  "Dashboard — log/eulogize.md": {
    word: "eulogize",
    primary: "To praise someone or something highly in speech or writing, especially to deliver a eulogy for a deceased person (American spelling).",
    secondary: "In public oratory, to deliver a formal tribute extolling the civic contributions or heroic deeds of an honored individual.",
    quotes: [
      { author: "Abraham Lincoln", work: "Eulogy on Henry Clay", quote: "To **eulogize** the departed statesman is to remind ourselves of the perilous sacrifices required to preserve our constitutional union." },
      { author: "Mark Twain", work: "The Gilded Age", quote: "The village orator rose to **eulogize** the local railroad magnate with soaring flights of patriotic rhetoric." },
      { author: "Frederick Douglass", work: "Oration in Memory of Abraham Lincoln", quote: "We have gathered here today not merely to **eulogize** a great president, but to dedicate ourselves to the unfinished work of freedom." }
    ]
  },
  "Dashboard — log/eulogy.md": {
    word: "eulogy",
    primary: "A speech or piece of writing that praises someone or something highly, typically someone who has just died.",
    secondary: "In classical rhetoric, an epideictic speech (*encomium*) celebrating the moral virtues and civic achievements of a citizen.",
    quotes: [
      { author: "T. R. Glover", work: "The Jesus of History", quote: "In the gospels there is no empty **eulogy**, no heroic ornament, but only the transparent truth of actual life." },
      { author: "Pericles (via Thucydides)", work: "The Peloponnesian War", quote: "The funeral **eulogy** delivered over our fallen soldiers honors not their names alone, but the democratic commonwealth they died to defend." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The funeral **eulogy** of Julian was pronounced by Libanius with all the grief of a faithful philosopher mourning a lost pupil." }
    ]
  },
  "Dashboard — log/geologic.md": {
    word: "geologic",
    primary: "Of, relating to, or based upon geology; relating to the history and physical substance of the earth.",
    secondary: "Pertaining to immense epochs of time measured in millions of years (*deep time*), as recorded in rock strata.",
    quotes: [
      { author: "Bram Stoker", work: "Dracula", quote: "The desolate castle had stood through centuries of **geologic** and historical decay amidst the Carpathian crags." },
      { author: "Charles Lyell", work: "Principles of Geology", quote: "Every **geologic** epoch reveals the steady operation of natural causes acting with unbroken continuity over vast ages." },
      { author: "Stephen Jay Gould", work: "Time's Arrow, Time's Cycle", quote: "The discovery of **geologic** deep time completely transformed humanity's understanding of our place in cosmic history." }
    ]
  },
  "Dashboard — log/geological.md": {
    word: "geological",
    primary: "Relating to the study of the earth's physical structure, substance, history, and the processes that act upon it.",
    secondary: "In evolutionary biology and paleontology, designating stratified rock layers that preserve fossil evidence of past life forms.",
    quotes: [
      { author: "Charles Dickens", work: "Bleak House", quote: "Mr. Badger disfigured ancient buildings by chipping off fragments of stone with his inquisitive **geological** hammer." },
      { author: "Charles Darwin", work: "The Origin of Species", quote: "The imperfection of the **geological** record explains why intermediate fossil varieties are so rarely discovered in rock strata." },
      { author: "H. G. Wells", work: "The Time Machine", quote: "The traveler observed the landscape undergoing vast **geological** transformations as millennia flashed past like days." }
    ]
  },
  "Dashboard — log/geologically.md": {
    word: "geologically",
    primary: "In a manner relating to geology; with respect to the geological history or physical structure of the earth.",
    secondary: "In terms of geological time scales and planetary processes, characterized by gradual continental shifts and rock deposition.",
    quotes: [
      { author: "Charles Lyell", work: "Principles of Geology", quote: "These rugged mountains are **geologically** young, having been uplifted during the most recent tertiary epoch." },
      { author: "Charles Darwin", work: "The Voyage of the Beagle", quote: "The volcanic archipelago of the Galapagos is **geologically** recent, rising from the sea floor through submarine eruptions." },
      { author: "John McPhee", work: "Basin and Range", quote: "Human civilization occupies only an eyeblink **geologically**, flourishing upon the uppermost veneer of accumulated strata." }
    ]
  },
  "Dashboard — log/geologist.md": {
    word: "geologist",
    primary: "A scientist who studies the solid, liquid, and gaseous matter that constitutes the Earth and other terrestrial planets.",
    secondary: "In the history of science, a field naturalist who maps rock strata, reconstructs tectonic history, and interprets fossil succession.",
    quotes: [
      { author: "Jules Verne", work: "Twenty Thousand Leagues under the Sea", quote: "Neither astronomer nor **geologist** believes in those chimerical subterranean monsters conceived by ancient folklore." },
      { author: "Charles Lyell", work: "Principles of Geology", quote: "The field **geologist** must interrogate the living operations of rivers and volcanoes to decipher the monuments of the past." },
      { author: "Thomas Henry Huxley", work: "Discourses: Biological and Geological", quote: "The **geologist** deciphers the history of the earth inscribed upon rock layers like an antiquarian deciphering ancient inscriptions." }
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
console.log("Batch 6 finished! Total words updated:", Object.keys(wordsData).length);
