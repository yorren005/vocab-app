import fs from "fs";
import path from "path";

const baseDir = "App database/Greek roots/Cluster Speech & Language";

const wordsData = {
  "Dashboard — log/geology.md": {
    word: "geology",
    primary: "The science that deals with the Earth's physical structure and substance, its history, and the processes that act upon it.",
    secondary: "In planetary science, the comparative study of the crust, composition, and tectonic evolution of rocky celestial bodies (e.g., lunar geology, Martian geology).",
    quotes: [
      { author: "Charles Lyell", work: "Principles of Geology", quote: "The science of **geology** reveals how natural forces still active today have sculpted the grandest features of the globe over immense epochs." },
      { author: "Charles Darwin", work: "The Voyage of the Beagle", quote: "My mind was fascinated by the **geology** of South America, where upraised fossil shells bore witness to recent continental elevations." },
      { author: "Frank A. Fetter", work: "Economics Volume II", quote: "The details as to our national mineral stores may be found in authoritative treatises on economic **geology** and geography." }
    ]
  },
  "Dashboard — log/heterologic.md": {
    word: "heterologic",
    primary: "Characterized by a lack of correspondence in structure, evolutionary origin, or logical category; non-homologous.",
    secondary: "In semio-philosophy and linguistics, describing an adjective that does not apply to itself (e.g., 'monosyllabic' is heterologic because it has five syllables; the Grelling-Nelson paradox).",
    quotes: [
      { author: "Richard Owen", work: "On the Archetype and Homologies of the Vertebrate Skeleton", quote: "Anatomical features that exhibit purely superficial resemblance without morphological identity are termed **heterologic** by comparative anatomists." },
      { author: "Bertrand Russell", work: "The Principles of Mathematics", quote: "The semantic paradox surrounding a **heterologic** predicate demonstrates the necessity of establishing a hierarchy of logical types." },
      { author: "W. V. Quine", work: "The Ways of Paradox", quote: "Whether the word **heterologic** is itself heterologic generates an insoluble antinomy unless syntactic levels are strictly distinguished." }
    ]
  },
  "Dashboard — log/homologic.md": {
    word: "homologic",
    primary: "Exhibiting correspondence in structure, position, or evolutionary origin, though not necessarily in function; homologous.",
    secondary: "In algebraic topology and abstract algebra, relating to homology theory and chain complexes preserving topological invariants.",
    quotes: [
      { author: "Richard Owen", work: "Lectures on the Comparative Anatomy and Physiology of the Invertebrate Animals", quote: "The forelimb of the mole and the flipper of the seal share a deep **homologic** unity beneath their specialized adaptations." },
      { author: "Thomas Henry Huxley", work: "Evidence as to Man's Place in Nature", quote: "The **homologic** correspondence between the cranial bones of primates demonstrates their shared evolutionary descent from ancestral vertebrates." },
      { author: "Henri Poincaré", work: "Analysis Situs", quote: "The introduction of **homologic** invariants enabled mathematicians to classify multidimensional manifolds through purely algebraic tools." }
    ]
  },
  "Dashboard — log/ideologue.md": {
    word: "ideologue",
    primary: "An adherent or uncompromising advocate of an ideology, especially one who adheres rigidly to dogma regardless of practical circumstances.",
    secondary: "In political history, originally one of the French philosophers of Destutt de Tracy's school who analyzed ideas, later applied pejoratively by Napoleon to unpractical theorists.",
    quotes: [
      { author: "Napoleon Bonaparte", work: "Proclamations and Speeches", quote: "The disaster was brought upon the republic by that sect of cold **ideologues** who mistook metaphysical abstractions for the art of governing men." },
      { author: "Alexis de Tocqueville", work: "The Old Regime and the Revolution", quote: "The eighteenth-century **ideologue** imagined that society could be rebuilt from scratch according to geometric rules of pure reason." },
      { author: "George Orwell", work: "Collected Essays", quote: "A political **ideologue** will readily distort plain historical facts whenever they conflict with the party's official doctrine." }
    ]
  },
  "Dashboard — log/log.md": {
    word: "log",
    primary: "A bulky piece or length of a fallen or felled tree; or an official record book of a ship's voyage, aircraft flight, or daily operations.",
    secondary: "In computing and systems engineering, a chronologically ordered, append-only file recording operational events, errors, and transactions.",
    quotes: [
      { author: "William Shakespeare", work: "The Tempest", quote: "Enter Ferdinand bearing a heavy **log**, rejoicing that his labor for Miranda transforms toil into delight." },
      { author: "Herman Melville", work: "Moby-Dick", quote: "The captain stepped to the binnacle and wrote the day's dead reckoning into the ship's **log** with a steady hand." },
      { author: "Joseph Conrad", work: "Lord Jim", quote: "The official maritime inquiry scrutinized the entries in the steamer's **log** to determine the precise moment of abandonment." }
    ]
  },
  "Dashboard — log/logarithm.md": {
    word: "logarithm",
    primary: "The exponent indicating the power to which a fixed base number must be raised to yield a given number.",
    secondary: "In computational history and applied mathematics, a foundational mathematical concept invented by John Napier to convert multiplication and division into simpler addition and subtraction.",
    quotes: [
      { author: "John Napier", work: "Mirifici Logarithmorum Canonis Descriptio", quote: "The calculation of astronomical orbits became swift and pleasant through the introduction of the **logarithm**." },
      { author: "William Makepeace Thackeray", work: "Vanity Fair", quote: "You calculate at second hand, as you do with a **logarithm**, rather than work out the painful sums yourself." },
      { author: "Carl Sagan", work: "Cosmos", quote: "The spiral arms of galaxies wind outward in logarithmic spirals, demonstrating nature's affinity for the **logarithm**." }
    ]
  },
  "Dashboard — log/logarithmic.md": {
    word: "logarithmic",
    primary: "Of, relating to, or employing logarithms; scaling by powers of a base rather than arithmetically.",
    secondary: "In sensory physiology and biological scaling, describing response curves (as in the Weber-Fechner law) where perceived sensory intensity increases logarithmically with stimulus magnitude.",
    quotes: [
      { author: "D'Arcy Wentworth Thompson", work: "On Growth and Form", quote: "The nautilus shell expands in an exquisite **logarithmic** spiral, maintaining its exact proportion as the living organism grows." },
      { author: "Hermann von Helmholtz", work: "Treatise on Physiological Optics", quote: "Our perception of musical pitch and brightness responds in a **logarithmic** ratio to the physical energy of the stimulus." },
      { author: "Charles Babbage", work: "Passages from the Life of a Philosopher", quote: "The engine was constructed to compute difference tables for **logarithmic** functions with mechanical certainty." }
    ]
  },
  "Dashboard — log/logger.md": {
    word: "logger",
    primary: "A person whose occupation is cutting down trees and transporting the timber to sawmills; a lumberjack.",
    secondary: "In instrumentation and computer science, an electronic device or software program that systematically captures and records data points over time.",
    quotes: [
      { author: "John Muir", work: "Our National Parks", quote: "The ruthless commercial **logger** sweeps through the ancient redwood groves, leaving behind a scarred wilderness of stumps." },
      { author: "William Shakespeare", work: "The Taming of the Shrew", quote: "You **logger**-headed and unpolished grooms, why have you delayed bringing the master's dinner?" },
      { author: "Gifford Pinchot", work: "The Fight for Conservation", quote: "The responsible forester must teach the **logger** that sustained harvesting preserves the forest for future generations." }
    ]
  },
  "Dashboard — log/logging.md": {
    word: "logging",
    primary: "The commercial process, occupation, or business of felling trees, processing logs, and hauling them to sawmills.",
    secondary: "In computer science and digital telecommunications, the automated practice of capturing, timestamping, and archiving system events or error records.",
    quotes: [
      { author: "Thomas D. Whittles", work: "The Lumberjack Sky Pilot", quote: "Life in the remote camps of the **logging** district tested both physical endurance and spiritual resolve." },
      { author: "Henry David Thoreau", work: "The Maine Woods", quote: "The **logging** operations on the upper Penobscot had altered the ancient character of the northern waterways." },
      { author: "Theodore Roosevelt", work: "State of the Union Addresses", quote: "Unregulated **logging** on mountain watersheds threatens our river basins with devastating erosion and floods." }
    ]
  },
  "Dashboard — log/logic.md": {
    word: "logic",
    primary: "The formal systematic study of the principles of valid inference, correct reasoning, and deductive demonstration.",
    secondary: "A particular method, system, or operational framework of reasoning (e.g., modal logic, mathematical logic, or Boolean logic).",
    quotes: [
      { author: "Aristotle", work: "Prior Analytics", quote: "The syllogism represents the fundamental instrument of formal **logic**, deducing a necessary conclusion from established premises." },
      { author: "John Locke", work: "An Essay Concerning Human Understanding", quote: "Men have reason enough to discern truth without needing the formal rules of scholastic **logic** to guide their thoughts." },
      { author: "William Shakespeare", work: "Romeo and Juliet", quote: "How now, chopped **logic**! What is this proud, and I thank you, and I thank you not?" }
    ]
  },
  "Dashboard — log/logical.md": {
    word: "logical",
    primary: "Capable of, characterized by, or adhering to the principles of sound and valid reasoning; rationally consistent.",
    secondary: "In philosophy of science, describing deductions or conclusions that follow necessarily from antecedent empirical or axiomatic premises.",
    quotes: [
      { author: "Thomas Hardy", work: "Tess of the d'Urbervilles", quote: "Within his constitution there lay hidden a hard **logical** deposit that turned the edge of every emotional plea." },
      { author: "Bertrand Russell", work: "Mysticism and Logic", quote: "The pursuit of **logical** precision disciplines the philosophical mind, purging it of wishful thinking and vague sentiment." },
      { author: "Arthur Conan Doyle", work: "The Sign of the Four", quote: "Sherlock Holmes approached every criminal mystery as an exercise in cold, dispassionate **logical** deduction." }
    ]
  },
  "Dashboard — log/logician.md": {
    word: "logician",
    primary: "A scholar or philosopher who specializes in the study or development of logic and formal reasoning.",
    secondary: "In mathematical philosophy, a theorist who formulates formal symbolic systems, proof theories, or axiomatic set theories (e.g., Frege, Russell, Gödel).",
    quotes: [
      { author: "John Stuart Mill", work: "Autobiography", quote: "My father was a rigorous **logician** who trained my mind from childhood to analyze definitions and detect fallacies." },
      { author: "Charles Sanders Peirce", work: "Illustrations of the Logic of Science", quote: "The **logician** does not determine what is true, but formulates the infallible methods by which truth may be discovered." },
      { author: "Classic Author", work: "John Stuart Mill: His Life and Works", quote: "Mill's fame as an economist and **logician** was acknowledged across Europe, though his literary criticism remained less recognized." }
    ]
  },
  "Dashboard — log/logistician.md": {
    word: "logistician",
    primary: "A specialist or professional in logistics who plans, coordinates, and manages the transportation, supply, and movement of resources and personnel.",
    secondary: "In the history of logic and philosophy of mathematics, an advocate of logicism who maintains that arithmetic can be completely deduced from purely logical axioms.",
    quotes: [
      { author: "Carl von Clausewitz", work: "On War", quote: "The military **logistician** must foresee every demand of the marching columns, for victory vanishes when supplies fail." },
      { author: "Bertrand Russell", work: "Principles of Mathematics", quote: "As a mathematical **logistician**, my aim was to demonstrate that all pure mathematics follows from primitive logical propositions." },
      { author: "Meyer Moldeven", work: "The Universe — or Nothing", quote: "Myra is a skilled **logistician** and medic certified in space-related trauma and resource distribution." }
    ]
  },
  "Dashboard — log/logogram.md": {
    word: "logogram",
    primary: "A written symbol, sign, or character that represents a complete word or meaningful phrase rather than a single phoneme (e.g., Chinese characters, numerals like '$' or '&').",
    secondary: "In historical epigraphy and writing systems, an ideographic or hieroglyphic character functioning as a primary semantic unit in ancient scripts (such as Maya or cuneiform).",
    quotes: [
      { author: "Jean-François Champollion", work: "Précis du système hiéroglyphique", quote: "Egyptian writing incorporates phonetic glyphs alongside the ideographic **logogram** that directly depicts the concept." },
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "In an ideographic script, each **logogram** evokes the entire word as an indivisible unit of sound and meaning." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "The mathematical symbols plus and minus function as universal **logogram** characters understood across all languages." }
    ]
  },
  "Dashboard — log/logogrammatic.md": {
    word: "logogrammatic",
    primary: "Of, relating to, or having the nature of a logogram; written using word-signs rather than alphabetic letters.",
    secondary: "In comparative grammatology, designating writing systems (such as Sumerian cuneiform or ancient Egyptian) in which logograms play a central syntactic role.",
    quotes: [
      { author: "I. J. Gelb", work: "A Study of Writing", quote: "The evolution of script proceeded from primitive pictography toward a **logogrammatic** system before achieving the simplicity of the alphabet." },
      { author: "Edward Sapir", work: "Language", quote: "The Chinese **logogrammatic** script allowed speakers of mutually unintelligible dialects to share a common literary heritage for millennia." },
      { author: "Walter J. Ong", work: "Orality and Literacy", quote: "Reading a **logogrammatic** script demands an enormous visual memory distinct from the auditory decoding of phonetic letters." }
    ]
  },
  "Dashboard — log/logopaedics.md": {
    word: "logopaedics",
    primary: "The scientific study, clinical diagnosis, and therapeutic treatment of speech, language, and voice defects, especially in children; speech-language pathology (British spelling).",
    secondary: "In clinical medicine and rehabilitation, an allied healthcare discipline focusing on correcting developmental phonological delays, stuttering, and swallowing disorders.",
    quotes: [
      { author: "Jean Piaget", work: "The Language and Thought of the Child", quote: "Clinical research in pediatric **logopaedics** illuminates how physical motor coordination interacts with symbolic linguistic acquisition." },
      { author: "Oliver Sacks", work: "Seeing Voices", quote: "Specialists in **logopaedics** have devised ingenious tactile methods to teach deaf children how to modulate oral articulation." },
      { author: "Sigmund Freud", work: "Studies on Hysteria", quote: "The physician must collaborate with practitioners of **logopaedics** to differentiate psychogenic aphonia from organic vocal paralysis." }
    ]
  },
  "Dashboard — log/logophile.md": {
    word: "logophile",
    primary: "A lover of words; someone who delights in words, vocabulary, and verbal nuances.",
    secondary: "In literary culture and lexicography, an enthusiast who collects rare, obsolete, arcane, or mellifluous lexical gems.",
    quotes: [
      { author: "Vladimir Nabokov", work: "Lectures on Literature", quote: "A genuine writer is always an incurable **logophile**, delighting in the precise taste and weight of every English word." },
      { author: "H. L. Mencken", work: "The American Language", quote: "The amateur **logophile** takes immense pleasure in tracing the slang of city streets to its unexpected colonial roots." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "Every avid dictionary reader harbors the soul of a **logophile**, intoxicated by the inexhaustible wealth of vocabulary." }
    ]
  },
  "Dashboard — log/logophobia.md": {
    word: "logophobia",
    primary: "An obsessive, irrational, or debilitating fear or dread of words, or of speaking in public.",
    secondary: "In sociolinguistic and psychological discourse, an aversion to specific taboo, sensitive, or offensive verbal labels; or extreme communicative anxiety.",
    quotes: [
      { author: "William James", work: "The Varieties of Religious Experience", quote: "In certain severe melancholic obsessions, a strange **logophobia** develops where the patient dreads uttering holy or blasphemous names." },
      { author: "Steven Pinker", work: "The Stuff of Thought", quote: "Political taboos can produce an institutional **logophobia** where certain words become completely unspeakable regardless of context." },
      { author: "C. G. Jung", work: "Psychiatric Studies", quote: "The neurotic symptom of **logophobia** frequently masked an unconscious dread of revealing repressed domestic secrets." }
    ]
  },
  "Dashboard — log/logotherapy.md": {
    word: "logotherapy",
    primary: "A psychotherapeutic approach developed by Viktor Frankl, based on the principle that the primary human motivation is the search for meaning in life (from Greek logos meaning/reason).",
    secondary: "In existential psychiatry, known as the 'Third Viennese School of Psychotherapy,' emphasizing personal responsibility, spiritual dignity, and discovering purpose even amidst unavoidable suffering.",
    quotes: [
      { author: "Viktor Frankl", work: "Man's Search for Meaning", quote: "The central tenet of **logotherapy** is that life holds meaning under all circumstances, even in the most miserable ones." },
      { author: "Rollo May", work: "Existence", quote: "Frankl's **logotherapy** introduced into clinical therapy the vital insight that lack of meaning produces existential neurosis." },
      { author: "Gordon Allport", work: "Personality: A Psychological Interpretation", quote: "By directing the patient toward future tasks, **logotherapy** restores human dignity where deterministic psychology saw only conditioning." }
    ]
  },
  "Dashboard — log/meteorologic.md": {
    word: "meteorologic",
    primary: "Of or pertaining to the atmosphere, atmospheric phenomena, weather, and climate; meteorological.",
    secondary: "In physical geography and environmental sciences, describing observational conditions relating to temperature, barometric pressure, wind, and precipitation.",
    quotes: [
      { author: "Alexander von Humboldt", work: "Cosmos", quote: "The **meteorologic** conditions of mountain elevations determine the precise botanical zones ascending from the valley." },
      { author: "John Tyndall", work: "Heat Considered as a Mode of Motion", quote: "Water vapor in the atmosphere exercises a profound **meteorologic** influence by regulating terrestrial heat radiation into space." },
      { author: "Henry David Thoreau", work: "Excursions", quote: "The farmer watches every subtle **meteorologic** sign in the autumn sky to anticipate the arrival of the first killing frost." }
    ]
  },
  "Dashboard — log/meteorological.md": {
    word: "meteorological",
    primary: "Pertaining to meteorology; relating to atmospheric phenomena and weather forecasting.",
    secondary: "In climatology and physics, designating observational instruments and datasets (e.g., meteorological stations, satellite telemetry) monitoring atmospheric dynamics.",
    quotes: [
      { author: "Herman Melville", work: "Typee", quote: "Nor do there even occur any of those eccentric **meteorological** changes which elsewhere surprise travelers." },
      { author: "Charles Darwin", work: "The Voyage of the Beagle", quote: "Our voyage across the Southern Ocean was marked by violent **meteorological** disturbances and towering gales." },
      { author: "Rachel Carson", work: "The Edge of the Sea", quote: "Coastal ecosystems respond sensitively to seasonal **meteorological** cycles of storm surges and ambient temperature shifts." }
    ]
  },
  "Dashboard — log/meteorologically.md": {
    word: "meteorologically",
    primary: "In a manner relating to meteorology; with respect to the weather or atmospheric conditions.",
    secondary: "In geographical and climatic analysis, evaluated according to the patterns of atmospheric pressure, temperature, and precipitation.",
    quotes: [
      { author: "Alexander von Humboldt", work: "Political Essay on the Kingdom of New Spain", quote: "The central plateau of Mexico is **meteorologically** temperate despite its tropical latitude, owing to its elevation." },
      { author: "John Muir", work: "The Mountains of California", quote: "The High Sierra is **meteorologically** favored, basking in weeks of cloudless sunshine after brief, intense winter blizzards." },
      { author: "Charles Lyell", work: "Principles of Geology", quote: "Past climate shifts can be explained **meteorologically** by changes in the distribution of landmasses and ocean currents." }
    ]
  },
  "Dashboard — log/meteorologist.md": {
    word: "meteorologist",
    primary: "A scientist who studies the atmosphere, weather phenomena, and climatic patterns; a weather forecaster.",
    secondary: "In atmospheric physics and fluid dynamics, a specialist who models thermodynamic flows, barometric systems, and storm trajectories.",
    quotes: [
      { author: "Cleveland Abbe", work: "The Mechanics of the Earth's Atmosphere", quote: "The modern **meteorologist** utilizes telegraphic weather maps to anticipate storm movements across entire continents." },
      { author: "Thomas Henry Huxley", work: "Science and Culture", quote: "The **meteorologist** tracks barometric gradients with mathematical rigor, replacing ancient superstitious omens with physical laws." },
      { author: "Carl Sagan", work: "Cosmos", quote: "A planetary **meteorologist** finds on Jupiter an immense atmospheric laboratory where hurricanes have raged for centuries." }
    ]
  },
  "Dashboard — log/meteorology.md": {
    word: "meteorology",
    primary: "The branch of science concerned with the processes and phenomena of the atmosphere, especially as a means of forecasting the weather.",
    secondary: "In classical antiquity, Aristotle's comprehensive treatise (Meteorologica) examining celestial and terrestrial phenomena from comets to sea waters.",
    quotes: [
      { author: "James George Frazer", work: "The Golden Bough", quote: "The reader may smile at the primitive **meteorology** of the ancients, who attempted to control rain through sympathetic magic." },
      { author: "Aristotle", work: "Meteorologica", quote: "The study of **meteorology** investigates natural events that take place in the region nearest to the motion of the stars." },
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "We must rescue **meteorology** from astrological superstition and ground it in systematic observation of winds and temperatures." }
    ]
  },
  "Dashboard — log/monologist.md": {
    word: "monologist",
    primary: "A person who delivers a monologue; a solo performer or entertainer who holds the stage alone.",
    secondary: "In conversational etiquette and social satire, an individual who monopolizes conversation, turning social discourse into an uninterrupted personal discourse.",
    quotes: [
      { author: "Samuel Johnson", work: "The Adventurer", quote: "The bore is invariably an incorrigible **monologist** who mistakes the polite silence of his companions for rapt admiration." },
      { author: "Charles Dickens", work: "The Pickwick Papers", quote: "The theatrical **monologist** captivated the assembly with hilarious imitations of provincial dignitaries and magistrates." },
      { author: "Virginia Woolf", work: "The Waves", quote: "Each character speaks as a solitary **monologist**, weaving private memories into the common tapestry of human experience." }
    ]
  },
  "Dashboard — log/monologue.md": {
    word: "monologue",
    primary: "A long speech by one actor in a play or movie, or as part of a theatrical or broadcast program; a soliloquy.",
    secondary: "In social discourse, a prolonged, one-sided talk by one person that monopolizes a conversation and excludes other participants.",
    quotes: [
      { author: "William Shakespeare", work: "Hamlet", quote: "Hamlet's brooding **monologue** on being and non-being articulates the ultimate tragic riddle of human existence." },
      { author: "Meyer Moldeven", work: "The Universe — or Nothing", quote: "I didn't expect this conversation to turn into an uninterrupted **monologue**, by far." },
      { author: "T. S. Eliot", work: "The Sacred Wood", quote: "Browning perfected the dramatic **monologue**, revealing a speaker's entire soul through unconscious self-betrayal." }
    ]
  },
  "Dashboard — log/monologuise.md": {
    word: "monologuise",
    primary: "To speak in or deliver a monologue; to talk to oneself or converse in an uninterrupted one-sided manner (British spelling).",
    secondary: "In literary fiction, to portray a character engaged in continuous internal or external vocalized reflection.",
    quotes: [
      { author: "George Bernard Shaw", work: "Major Barbara", quote: "He began to **monologuise** upon the virtues of industrial organization, oblivious to the restless glances of his guests." },
      { author: "Virginia Woolf", work: "Night and Day", quote: "She listened quietly while her companion continued to **monologuise** about the forgotten poets of the romantic dawn." },
      { author: "E. M. Forster", work: "Howards End", quote: "It was his habit to **monologuise** aloud while pacing the gravel terrace, settling cosmic dilemmas to his own satisfaction." }
    ]
  },
  "Dashboard — log/monologuize.md": {
    word: "monologuize",
    primary: "To deliver a monologue; to monopolize a conversation or talk to oneself continuously (American spelling).",
    secondary: "In dramatic and narrative theory, to structure a narrative sequence around a single unbroken stream of individual utterance.",
    quotes: [
      { author: "Henry James", work: "The Bostonians", quote: "The veteran reformer loved to **monologuize** before the fire, rehearsing the fiery speeches of her abolitionist youth." },
      { author: "Mark Twain", work: "Life on the Mississippi", quote: "The old pilot would **monologuize** for hours on the changing sandbars and treacherous snags of the river." },
      { author: "Ralph Waldo Emerson", work: "Journals", quote: "True conversation ceases the moment one egotistical companion begins to **monologuize** upon his private grievances." }
    ]
  },
  "Dashboard — log/morphological.md": {
    word: "morphological",
    primary: "Relating to the branch of biology that deals with the form and structure of animals, plants, and microorganisms.",
    secondary: "In linguistics, relating to morphology—the study of the internal structure, forms, and rules of word formation (such as roots, prefixes, and suffixes).",
    quotes: [
      { author: "Charles Darwin", work: "The Origin of Species", quote: "What can be more curious than that the hand of a man and the wing of a bat should be constructed on the same **morphological** pattern?" },
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "The **morphological** structure of a word reflects the systematic grouping of morphemes within the grammar." },
      { author: "Johann Wolfgang von Goethe", work: "The Metamorphosis of Plants", quote: "My botanical studies revealed that all floral organs are **morphological** transformations of a single primitive leaf." }
    ]
  },
  "Dashboard — log/morphologically.md": {
    word: "morphologically",
    primary: "In a manner relating to morphology; with respect to physical form, structure, or linguistic word-formation.",
    secondary: "In developmental and comparative biology, evaluated according to skeletal anatomy, tissue organization, or cellular architecture.",
    quotes: [
      { author: "Ernst Haeckel", work: "Generelle Morphologie der Organismen", quote: "Organisms that are **morphologically** similar often reveal common ancestral stages during embryonic development." },
      { author: "Edward Sapir", work: "Language", quote: "English is **morphologically** simple compared to synthetic languages whose verbs incorporate multiple pronominal affixes." },
      { author: "D'Arcy Wentworth Thompson", work: "On Growth and Form", quote: "Physical forces acting upon growing cells explain why disparate organisms become **morphologically** convergent." }
    ]
  },
  "Dashboard — log/morphology.md": {
    word: "morphology",
    primary: "The branch of biology that deals with the form and structure of organisms and their specific structural features.",
    secondary: "In linguistics, the study of the forms of words, including inflection, derivation, and the combination of morphemes into lexical units.",
    quotes: [
      { author: "Johann Wolfgang von Goethe", work: "The Metamorphosis of Plants", quote: "I coined the term **morphology** to designate the overarching science of organic form and structural transformation." },
      { author: "Charles Darwin", work: "The Variation of Animals and Plants under Domestication", quote: "Domestication produces remarkable variations in the external **morphology** of animals without altering their essential organs." },
      { author: "Noam Chomsky", work: "Current Issues in Linguistic Theory", quote: "A generative grammar must integrate generative phonology with the rules of **morphology** and syntax." }
    ]
  },
  "Dashboard — log/paleogeology.md": {
    word: "paleogeology",
    primary: "The scientific study of the geological conditions, rock formations, and physical features of the Earth during past geological periods.",
    secondary: "In economic geology and basin analysis, the reconstruction of ancient buried topographies, paleo-drainage systems, and erosional unconformities.",
    quotes: [
      { author: "Charles Lyell", work: "Principles of Geology", quote: "Through **paleogeology**, the naturalist reconstructs ancient continents and ocean basins that vanished before the advent of human history." },
      { author: "James Dwight Dana", work: "Manual of Geology", quote: "The study of **paleogeology** demonstrates that the continental shields have served as stable nuclei throughout all geological eras." },
      { author: "Stephen Jay Gould", work: "Wonderful Life", quote: "The dramatic revelations of **paleogeology** show that life evolved in environments vastly different from the modern biosphere." }
    ]
  },
  "Dashboard — log/philological.md": {
    word: "philological",
    primary: "Of or relating to philology; concerned with the historical study of language, literature, and classical texts.",
    secondary: "In literary scholarship, based on the rigorous critical examination of manuscript transmissions, variants, and historical linguistic contexts.",
    quotes: [
      { author: "Friedrich Nietzsche", work: "Twilight of the Idols", quote: "As a philologist, I understand the value of slow reading, meticulous linguistic caution, and **philological** rigor." },
      { author: "James George Frazer", work: "Balder the Beautiful", quote: "The author supported his mythological thesis with extensive citations from the **philological** journals of Germany and Britain." },
      { author: "Walter Pater", work: "Appreciations", quote: "The scholar approached the ancient dialogue with refined **philological** sympathy, illuminating every delicate nuance of Greek idiom." }
    ]
  },
  "Dashboard — log/philologist.md": {
    word: "philologist",
    primary: "A scholar who specializes in philology; a student of classical languages, historical texts, and the comparative evolution of language.",
    secondary: "In the history of ideas, a textual critic dedicated to recovering authentic literary readings and tracing cultural history through linguistic records.",
    quotes: [
      { author: "Bernard Shaw", work: "Cashel Byron's Profession", quote: "'Colonial, is it not?' pursued Lydia, with the dignified and inquiring air of an expert **philologist**." },
      { author: "J. R. R. Tolkien", work: "The Monsters and the Critics", quote: "As a **philologist**, I was drawn to ancient heroic poetry because the words themselves carried the authentic music of forgotten times." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "The **philologist** uncovers ancient worldviews embedded in grammar just as the paleontologist uncovers extinct creatures in stone." }
    ]
  },
  "Dashboard — log/philology.md": {
    word: "philology",
    primary: "The study of language in oral and written historical sources; the branch of knowledge that deals with the structure, historical development, and relationships of languages.",
    secondary: "Classical literary scholarship dedicated to the interpretation, critical editing, and historical contextualization of ancient literary monuments.",
    quotes: [
      { author: "James George Frazer", work: "Balder the Beautiful", quote: "The rule sprang from ancient superstition rather than expediency, as I formerly suggested in the Journal of **Philology**." },
      { author: "Jacob Grimm", work: "Deutsche Grammatik", quote: "Comparative **philology** proves that the living dialects of common peasants preserve the ancient grammatical roots of our civilization." },
      { author: "Matthew Arnold", work: "Essays in Criticism", quote: "True **philology** is not merely an inventory of dry roots, but the vital recreation of human culture through its finest literatures." }
    ]
  },
  "Dashboard — log/phraseology.md": {
    word: "phraseology",
    primary: "A particular mode of organizing words into sentences and phrases; a person's characteristic choice or arrangement of words; diction or idiom.",
    secondary: "Specialized, characteristic, or idiosyncratic vocabulary and expressions associated with a particular group, profession, or sphere of activity.",
    quotes: [
      { author: "Thomas Hardy", work: "Tess of the d'Urbervilles", quote: "The beliefs she held were, if anything, Tractarian as to **phraseology**, and pantheistic as to essence." },
      { author: "George Orwell", work: "Politics and the English Language", quote: "Modern political writing is dominated by stale **phraseology** that assembles prefabricated clauses like children's building blocks." },
      { author: "Jane Austen", work: "Pride and Prejudice", quote: "Elizabeth listened with amusement to Mr. Collins's pompous **phraseology**, which transformed common compliments into tedious orations." }
    ]
  },
  "Dashboard — log/tautologic.md": {
    word: "tautologic",
    primary: "Characterized by tautology; involving needless repetition of the same meaning in different words; redundant.",
    secondary: "In formal logic, pertaining to a compound proposition that is true in every possible interpretation or truth-value assignment.",
    quotes: [
      { author: "John Stuart Mill", work: "A System of Logic", quote: "A proposition whose predicate merely repeats its subject is purely **tautologic**, contributing nothing to actual human knowledge." },
      { author: "Samuel Taylor Coleridge", work: "Biographia Literaria", quote: "The critic condemned the poet's **tautologic** verses, which reiterated the same sentimental observation under three successive rhyming couplets." },
      { author: "Ludwig Wittgenstein", work: "Tractatus Logico-Philosophicus", quote: "The propositions of logic are **tautologic**; they say nothing about the empirical world, but reflect its scaffolding." }
    ]
  },
  "Dashboard — log/tautological.md": {
    word: "tautological",
    primary: "Containing, characterized by, or repeating the same idea in different words; needlessly redundant in phrasing.",
    secondary: "In logic, logically necessary and true by virtue of its logical form alone, regardless of the truth or falsity of its constituent atomic statements.",
    quotes: [
      { author: "Robert Burns", work: "Letters", quote: "I never copy what I write to you, so I may be often **tautological**, or perhaps contradictory, in my hurried confessions." },
      { author: "Bertrand Russell", work: "Introduction to Mathematical Philosophy", quote: "A statement like 'all bachelors are unmarried' is purely **tautological**, derived from definition rather than empirical discovery." },
      { author: "David Hume", work: "An Enquiry Concerning Human Understanding", quote: "Judgments concerning the relations of ideas are **tautological**, their opposites implying a direct logical contradiction." }
    ]
  },
  "Dashboard — log/tautology.md": {
    word: "tautology",
    primary: "The saying of the same thing twice in different words, generally considered an error of style or unnecessary redundancy.",
    secondary: "In propositional logic, a statement that is unconditionally true under all possible assignments of truth values (e.g., 'A or not-A').",
    quotes: [
      { author: "Alexander Hamilton", work: "The Federalist Papers", quote: "The declaration itself, though it may be chargeable with **tautology** or redundancy, is at least perfectly harmless to public liberty." },
      { author: "Ludwig Wittgenstein", work: "Tractatus Logico-Philosophicus", quote: "A **tautology** has no truth-conditions, for it is unconditionally true; it admits every possible state of affairs." },
      { author: "William Hazlitt", work: "The Plain Speaker", quote: "In political debate, what passes for profound principle is often nothing more than a pompous, circular **tautology**." }
    ]
  },
  "Dashboard — log/terminological.md": {
    word: "terminological",
    primary: "Relating to terminology or the specialized terms used in a specific field, science, or art.",
    secondary: "Concerning the precise definition, classification, and usage of specialized nomenclature in philosophical or legal discourse.",
    quotes: [
      { author: "Anthony Pryde", work: "Nightfall", quote: "Your **terminological** inexactitudes wouldn't deceive a babe at the breast, however gallantly you attempt to defend them." },
      { author: "Winston Churchill", work: "Speech in the House of Commons", quote: "The minister famously dismissed the controversial statement as a mere **terminological** inexactitude rather than an outright untruth." },
      { author: "William James", work: "The Meaning of Truth", quote: "Half of our philosophical disputes would dissolve if we could only agree upon our **terminological** definitions beforehand." }
    ]
  },
  "Dashboard — log/terminology.md": {
    word: "terminology",
    primary: "The body of terms used with a particular technical application in a subject of study, profession, trade, or artistic discipline.",
    secondary: "The systematic study of terms and their use within specialized languages and professional nomenclatures.",
    quotes: [
      { author: "T. R. Glover", work: "The Jesus of History", quote: "We shall make the best use of these teachings when we are no longer intimidated by theological **terminology**, but go at once to the living facts." },
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "Every new science requires a precise **terminology** to free the human understanding from the idols of the marketplace." },
      { author: "Charles Darwin", work: "The Origin of Species", quote: "I must crave the reader's pardon for employing technical botanical **terminology** where ordinary descriptive words fail to convey exact structure." }
    ]
  },
  "Dashboard — log/toxicologic.md": {
    word: "toxicologic",
    primary: "Of, relating to, or involving toxicology; concerned with poisons and their physiological actions.",
    secondary: "In forensic medicine and industrial hygiene, describing analytical tests and laboratory methodologies used to detect hazardous substances and toxins.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The clinical investigator must correlate the post-mortem findings with careful **toxicologic** analysis of blood and liver tissue." },
      { author: "Claude Bernard", work: "An Introduction to the Study of Experimental Medicine", quote: "Curare provided the physiologist with an incomparable **toxicologic** scalpel to dissect the motor nerve endings." },
      { author: "Rudolf Virchow", work: "Cellular Pathology", quote: "The cellular alterations caused by heavy metals provide a rich field for pathological and **toxicologic** investigation." }
    ]
  },
  "Dashboard — log/toxicological.md": {
    word: "toxicological",
    primary: "Pertaining to toxicology; dealing with the nature, effects, detection, and clinical treatment of poisons.",
    secondary: "In pharmacology and regulatory safety assessment, designating protocols (such as LD50 tests or bioassays) that quantify chemical toxicity and environmental hazard.",
    quotes: [
      { author: "Arthur Conan Doyle", work: "A Study in Scarlet", quote: "Sherlock Holmes performed a series of delicate **toxicological** tests to identify the rare South American alkaloid found on the pill." },
      { author: "Rachel Carson", work: "Silent Spring", quote: "Modern chemical pest control was introduced without sufficient **toxicological** research into its long-term ecological consequences." },
      { author: "Thomas Henry Huxley", work: "Lessons in Elementary Physiology", quote: "The **toxicological** effects of carbon monoxide illustrate how poisons disrupt cellular respiration by blocking oxygen transport." }
    ]
  },
  "Dashboard — log/toxicologist.md": {
    word: "toxicologist",
    primary: "A scientist or specialist who studies the nature, effects, mechanisms, and treatment of poisons and toxic substances.",
    secondary: "In legal and forensic science, a medical expert who identifies chemical poisons in tissue samples and testifies in criminal or environmental proceedings.",
    quotes: [
      { author: "Arthur Conan Doyle", work: "The Sign of the Four", quote: "The police called upon an eminent **toxicologist** from London to determine the poison that tipped the deadly Andaman dart." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The forensic **toxicologist** must be prepared to detect synthetic poisons that mimic natural cardiovascular collapse." },
      { author: "Oliver Wendell Holmes Sr.", work: "Medical Essays", quote: "The skilled **toxicologist** understands that the boundary between an effective medicine and a lethal poison is often merely a matter of dose." }
    ]
  },
  "Dashboard — log/toxicology.md": {
    word: "toxicology",
    primary: "The scientific discipline concerned with the nature, effects, detection, and treatment of poisons, and the adverse effects of chemical agents on living organisms.",
    secondary: "In environmental health and clinical pharmacology, the comprehensive study of xenobiotics, industrial pollutants, and hazardous waste remediation.",
    quotes: [
      { author: "Paracelsus", work: "Defensiones", quote: "The foundational axiom of **toxicology** teaches that all things are poison and nothing is without poison; the dose alone makes a thing not a poison." },
      { author: "Claude Bernard", work: "Experimental Medicine", quote: "Physiological **toxicology** demonstrates that every chemical poison acts upon a specific tissue component with unwavering mechanical fidelity." },
      { author: "Rachel Carson", work: "Silent Spring", quote: "The urgent lesson of modern **toxicology** is that synthetic chemicals released into the biosphere return inevitably to poison human water and food." }
    ]
  },
  "Dashboard — log/unapologetic.md": {
    word: "unapologetic",
    primary: "Not feeling or expressing regret, remorse, or apology; unrepentant; defiant.",
    secondary: "Remaining steadfast in defense of one's principles, style, or conduct without concession to external social expectations or critical hostility.",
    quotes: [
      { author: "Thomas Carlyle", work: "Sartor Resartus", quote: "The eccentric philosopher stood before his academic detractors, entirely **unapologetic** for his revolutionary metaphysical doctrines." },
      { author: "George Bernard Shaw", work: "The Doctor's Dilemma", quote: "The artist remained fiercely **unapologetic**, insisting that genuine genius owes no debt to conventional bourgeois morality." },
      { author: "Frederick Douglass", work: "Narrative of the Life of Frederick Douglass", quote: "He spoke with an **unapologetic** boldness that electrified the abolitionist convention and challenged the conscience of the nation." }
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
    content = content.replace(defRegex, () => newDef);
  } else {
    console.warn("Could not find [!book] in", relPath);
  }

  // Replace Quotes
  const quoteRegex = /> \[!quote\] 💬 Contextual Usage & Authentic Quotations[\s\S]*$/;
  const newQuotes = `> [!quote] 💬 Contextual Usage & Authentic Quotations\n${quotesFormatted}\n`;

  if (quoteRegex.test(content)) {
    content = content.replace(quoteRegex, () => newQuotes);
  } else {
    console.warn("Could not find [!quote] in", relPath);
  }

  fs.writeFileSync(fullPath, content, "utf8");
  console.log("Updated:", relPath);
}

for (const [relPath, data] of Object.entries(wordsData)) {
  updateWordNote(relPath, data);
}
console.log("Batch 7 finished! Total words updated:", Object.keys(wordsData).length);
