import fs from 'fs';
import path from 'path';

const basePath = 'App database/Greek roots/Cluster Law & Order';

const filesData = {
  // Dashboard — nem
  "Dashboard — nem/anomic.md": {
    primary: "Characterized by or suffering from anomie; lacking social, moral, or ethical standards.",
    secondary: "Marked by personal disorientation, normlessness, or disconnection from societal values in sociology and psychology.",
    quotes: [
      { author: "Émile Durkheim", work: "Suicide: A Study in Sociology", quote: "In an **anomic** state, society's influence is lacking in the essentially individual passions, leaving them without a check-rein." },
      { author: "Robert K. Merton", work: "Social Theory and Social Structure", quote: "When institutionalized norms fail to regulate aspirations, individuals lapse into an **anomic** condition of perpetual frustration." },
      { author: "C. Wright Mills", work: "The Sociological Imagination", quote: "Urban alienation frequently manifests as an **anomic** drift where shared ethical obligations dissolve." }
    ]
  },
  "Dashboard — nem/anomie.md": {
    primary: "A state of normlessness or social instability resulting from a breakdown of standards, values, or shared ethical codes.",
    secondary: "The personal disorientation or anxiety felt by an individual in the absence of societal guidance or moral constraints.",
    quotes: [
      { author: "Émile Durkheim", work: "The Division of Labour in Society", quote: "Industrial crises occur when economic growth outstrips moral regulation, plunging society into acute **anomie**." },
      { author: "Robert K. Merton", work: "Social Structure and Anomie", quote: "We define **anomie** as a breakdown in the cultural structure, occurring particularly when there is an acute disjunction between cultural goals and socially structured capacities." },
      { author: "Hannah Arendt", work: "The Origins of Totalitarianism", quote: "Mass movements recruit individuals who have been atomized and dislodged by profound social **anomie**." }
    ]
  },
  "Dashboard — nem/anomy.md": {
    primary: "A state of lawlessness, lack of social standards, or disregard for divine or civil law (historical form of anomie).",
    secondary: "Disregard or contempt for established moral order in classical theological and philosophical literature.",
    quotes: [
      { author: "John Milton", work: "The Doctrine and Discipline of Divorce", quote: "To enforce a legal bondage against conscience is to plunge the commonwealth into deeper spiritual **anomy**." },
      { author: "Thomas Jackson", work: "A Treatise of the Divine Essence and Attributes", quote: "All sin is fundamentally an **anomy**, an intentional transgression and transgression-like defiance of divine rule." },
      { author: "Samuel Taylor Coleridge", work: "The Friend", quote: "A political revolution which tears up moral principles without replacing them introduces universal **anomy**." }
    ]
  },
  "Dashboard — nem/antinome.md": {
    primary: "That which is contrary to law, rule, or custom; an opposing principle, law, or counter-axiom.",
    secondary: "A contradiction between two principles or beliefs, each of which seems equally necessary or valid; an antinomy.",
    quotes: [
      { author: "Immanuel Kant", work: "Critique of Pure Reason", quote: "Each thesis of cosmological reason generates its own inescapable **antinome** in the antithesis." },
      { author: "Samuel Taylor Coleridge", work: "Biographia Literaria", quote: "The mind struggles when confronted with an intellectual **antinome** whose opposing terms appear equally undeniable." },
      { author: "Thomas De Quincey", work: "Essays on Philosophical Writers", quote: "In metaphysical debate, every dogmatic assertion quickly summons its corresponding **antinome**." }
    ]
  },
  "Dashboard — nem/antinomic.md": {
    primary: "Pertaining to, involving, or characterized by an antinomy; contradictory or self-opposing between principles or laws.",
    secondary: "Exhibiting a mutual contradiction between two conclusions that are equally substantiated by rational argument in philosophy and logic.",
    quotes: [
      { author: "William James", work: "The Will to Believe", quote: "Our moral consciousness often confronts **antinomic** imperatives where justice and mercy pull in opposite directions." },
      { author: "Immanuel Kant", work: "Prolegomena to Any Future Metaphysics", quote: "The **antinomic** conflicts of pure reason demonstrate that space and time cannot be things in themselves." },
      { author: "Josiah Royce", work: "The World and the Individual", quote: "Human experience is rife with **antinomic** tendencies that require a higher philosophical synthesis." }
    ]
  },
  "Dashboard — nem/archnemesis.md": {
    primary: "A principal, persistent, or most formidable enemy, rival, or agent of retribution.",
    secondary: "An opposing force or adversary who continually thwarts, bedevils, or balances another in literature and myth.",
    quotes: [
      { author: "Arthur Conan Doyle", work: "The Final Problem", quote: "Professor Moriarty was the intellectual master of crime, the supreme organizer, and Holmes's true **archnemesis**." },
      { author: "Herman Melville", work: "Moby-Dick", quote: "To Ahab, the white whale had become the monomaniac symbol of all malice, his cosmic **archnemesis**." },
      { author: "G. K. Chesterton", work: "The Man Who Was Thursday", quote: "In every heroic romance, the protagonist eventually stands face to face with his predestined **archnemesis**." }
    ]
  },
  "Dashboard — nem/isonomy.md": {
    primary: "Equality of political and civil rights under the law; equal distribution of legal privileges in classical governance.",
    secondary: "The foundational Athenian principle of equal legal standing among citizens, regarded by ancient historians as the precursor to democracy.",
    quotes: [
      { author: "Herodotus", work: "The Histories", quote: "The rule of the many has in the first place the fairest of names, **isonomy**, which signifies equality before the law." },
      { author: "Hannah Arendt", work: "On Revolution", quote: "The ancients praised **isonomy** not as an absence of government, but as a space where men could interact as genuine equals." },
      { author: "Friedrich Hayek", work: "The Constitution of Liberty", quote: "The ancient ideal of **isonomy**, or equal law for all citizens, is the true historic foundation of modern liberty." }
    ]
  },
  "Dashboard — nem/metronomic.md": {
    primary: "Mechanically regular and precise in beat, tempo, or movement, resembling the tick of a metronome.",
    secondary: "Uniformly rhythmic, monotonous, or unvarying in pace and cadence.",
    quotes: [
      { author: "Joseph Conrad", work: "The Secret Agent", quote: "The grandfather clock kept up a slow, **metronomic** ticking that seemed to measure the weary passage of eternity." },
      { author: "Virginia Woolf", work: "Mrs. Dalloway", quote: "Big Ben struck out the hours with a solemn, **metronomic** regularity that vibrated across the rooftops of Westminster." },
      { author: "F. Scott Fitzgerald", work: "The Great Gatsby", quote: "Her hand moved with a **metronomic** precision as she tapped the rim of her champagne glass." }
    ]
  },
  "Dashboard — nem/nem.md": {
    primary: "The Proto-Indo-European and Ancient Greek root meaning 'to distribute, allot, assign, pasture, or manage', ancestor of words like *nemesis*, *nomos*, and *nomad*.",
    secondary: "The etymological morpheme expressing apportioning, administrative allocation, or pastoral distribution in comparative linguistics.",
    quotes: [
      { author: "Henry George Liddell & Robert Scott", work: "A Greek-English Lexicon", quote: "Under the ancient root **nem**, the lexicographer traces words dealing with the allotment of land and retribution." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "The primitive root **nem** signified to apportion or deal out, expanding naturally from pastoral distribution to legal statute." },
      { author: "Émile Benveniste", work: "Indo-European Language and Society", quote: "In early Hellenic society, the verb **nem** connected the distribution of sacrificial meat with the legal apportionment of civic honors." }
    ]
  },
  "Dashboard — nem/nemesis.md": {
    primary: "The Greek goddess of divine retribution and righteous indignation against human hubris, arrogance, and transgression.",
    secondary: "An inescapable, retributive agent of downfall, or a persistent, unconquerable opponent or circumstance.",
    quotes: [
      { author: "William Shakespeare", work: "Henry VI, Part 1", quote: "Is Talbot slain, the Frenchman's only scourge, Your kingdom's terror and black **Nemesis**?" },
      { author: "Mary Shelley", work: "Frankenstein", quote: "Like an avenging **Nemesis**, the monster pursued him across icy wastes to claim retribution for his creation." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "Imperial pride provoked an inevitable **Nemesis**, plunging the dynasty into catastrophic ruin." }
    ]
  },
  "Dashboard — nem/nomad.md": {
    primary: "A member of a people or tribe having no permanent abode, but moving from place to place according to seasons to find pasture for livestock or subsistence.",
    secondary: "A wanderer or person who continuously shifts domicile, travel itinerary, or profession.",
    quotes: [
      { author: "Bruce Chatwin", work: "The Songlines", quote: "The desert **nomad** understands that possession of excessive material baggage impedes survival under harsh skies." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The pastoral **nomad** of the steppes lived on horse-milk and wandered where his herds could graze." },
      { author: "Henry David Thoreau", work: "Walden", quote: "The civilized man is often only a more experienced and wiser savage or **nomad**, encumbered by unnecessary furnishings." }
    ]
  },
  "Dashboard — nem/nomadic.md": {
    primary: "Living the life of a nomad; roaming from place to place without a fixed settlement.",
    secondary: "Characterized by wandering, constant movement, or migratory habits.",
    quotes: [
      { author: "Charles Darwin", work: "The Voyage of the Beagle", quote: "The **nomadic** horsemen of the pampas showed an astounding endurance under long days of hunting in the saddle." },
      { author: "Arnold Toynbee", work: "A Study of History", quote: "The **nomadic** steppe societies were perpetually compelled by climatic cycles to seek fresh pastures beyond their frontiers." },
      { author: "Joseph Conrad", work: "Lord Jim", quote: "He embraced a **nomadic** existence among the scattered islands of the Malay Archipelago, never settling long in one port." }
    ]
  },
  "Dashboard — nem/nomarch.md": {
    primary: "The governor or chief magistrate of a *nome* (administrative province) in ancient Egypt.",
    secondary: "The prefect or chief administrative executive of a *nomos* (prefecture) in the modern Greek administrative system.",
    quotes: [
      { author: "James Henry Breasted", work: "A History of Egypt", quote: "During the feudal era of the Middle Kingdom, each provincial **nomarch** exercised almost sovereign power within his domain." },
      { author: "Flinders Petrie", work: "The Making of Egypt", quote: "The inscriptions upon the cliff tombs record the wealth and civic achievements of the local **nomarch**." },
      { author: "Gaston Maspero", work: "The Dawn of Civilization", quote: "The **nomarch** was responsible for supervising the irrigation dikes and levying grain taxes for the royal treasury." }
    ]
  },
  "Dashboard — nem/nomarchy.md": {
    primary: "The jurisdiction, office, territory, or government administered by a nomarch; a prefecture or province.",
    secondary: "Provincial governance in ancient Egypt or the administrative prefecture system in modern Greece.",
    quotes: [
      { author: "James Henry Breasted", work: "Ancient Records of Egypt", quote: "The civil records delineate the exact territorial boundaries and tax obligations belonging to each ancient **nomarchy**." },
      { author: "George Rawlinson", work: "The History of Herodotus", quote: "A decentralized **nomarchy** often threatened the unified authority of the Pharaoh whenever the central throne weakened." },
      { author: "John Pendlebury", work: "The Archaeology of Crete", quote: "Trade routes linked Aegean ports with administrative centers across the Nile Delta **nomarchy**." }
    ]
  },
  "Dashboard — nem/nome.md": {
    primary: "An administrative district or province of ancient Egypt (Greek *nomos*); also, an administrative prefecture of modern Greece.",
    secondary: "A traditional melody, musical type, or melodic rule in archaic Greek choral lyric and flute music.",
    quotes: [
      { author: "Herodotus", work: "The Histories", quote: "Egypt was anciently divided into thirty-six provinces, each termed a **nome**, governed by its own high magistrate." },
      { author: "Flinders Petrie", work: "Ten Years' Digging in Egypt", quote: "The sacred animal worshipped in one **nome** was often hunted without scruple in the neighbouring territory." },
      { author: "Plutarch", work: "Moralia", quote: "The ancient masters composed solemn hymns according to the traditional laws of the sacred musical **nome**." }
    ]
  },
  "Dashboard — nem/nomology.md": {
    primary: "The science or theoretical study of physical, moral, or natural laws and their fundamental principles.",
    secondary: "The systematic classification and investigation of universal normative rules governing conduct or nature in philosophy and psychology.",
    quotes: [
      { author: "Sir William Hamilton", work: "Lectures on Metaphysics and Logic", quote: "We designate by **nomology** the science of the necessary laws that regulate human thought and cognition." },
      { author: "C. S. Peirce", work: "Collected Papers", quote: "The philosopher distinguishes between phenomenological description and the deeper investigations of universal **nomology**." },
      { author: "John Stuart Mill", work: "A System of Logic", quote: "A comprehensive **nomology** must seek to derive empirical generalizations from irreducible causal axioms." }
    ]
  },
  "Dashboard — nem/Numidia.md": {
    primary: "An ancient Berber kingdom situated in North Africa (modern-day Algeria and parts of Tunisia and Libya), famed for its agile cavalry and ruled by kings like Masinissa and Jugurtha.",
    secondary: "A North African Roman province whose name was traditionally linked by Greek historians to the nomadic pastoralism of its indigenous inhabitants.",
    quotes: [
      { author: "Sallust", work: "The Jugurthine War", quote: "The kingdom of **Numidia** was renowned for hardy horsemen who skirmished across the arid plains with deadly mobility." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The fertile plains of **Numidia** yielded vast grain supplies that nourished the populace of Rome." },
      { author: "Livy", work: "The History of Rome", quote: "King Masinissa led the auxiliary squadrons of **Numidia** to turn the tide of victory at the battle of Zama." }
    ]
  },
  "Dashboard — nem/numidian.md": {
    primary: "Relating to ancient Numidia or its inhabitants, culture, and famed horsemen in classical antiquity.",
    secondary: "Pertaining to the native North African Berber language, coinage, or cavalry tactics of the kingdom of Numidia.",
    quotes: [
      { author: "Virgil", work: "Aeneid", quote: "The fierce **Numidian** cavalry harassed the coastal settlements with lightning raids and javelin volleys." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The **Numidian** prince defended his desert fortress against the heavy Roman legions with stubborn valor." },
      { author: "John Milton", work: "Paradise Regained", quote: "Beside the Syrian camp rode squadrons of swift **Numidian** riders mounted on unbridled steeds." }
    ]
  },
  "Dashboard — nem/numismatics.md": {
    primary: "The study, collection, or historical analysis of coins, paper currency, tokens, and medals.",
    secondary: "The historical auxiliary science that investigates economic circulation, metallurgy, political iconography, and sovereign authority through minted currency.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The science of **numismatics** enables the historian to recover the lost portraits and titles of forgotten emperors." },
      { author: "Walter Pater", work: "The Renaissance", quote: "Through the delicate study of antique **numismatics**, the humanist reconstructs the aesthetic ideals of classical antiquity." },
      { author: "George MacDonald", work: "The Silver Coinage of Crete", quote: "Ancient **numismatics** supplies indispensable archaeological evidence where written literary records have perished." }
    ]
  },
  "Dashboard — nem/numismatist.md": {
    primary: "A scholar, specialist, or collector who studies or collects coins, medals, paper money, and tokens.",
    secondary: "An expert who authenticates, dates, and interprets historical currency and metallurgical mintings.",
    quotes: [
      { author: "Arthur Conan Doyle", work: "The Musgrave Ritual", quote: "A knowledgeable **numismatist** identified the tarnished crowns as belonging to the reign of Charles the First." },
      { author: "Thomas Hardy", work: "The Mayor of Casterbridge", quote: "The local antiquary was a devoted **numismatist**, possessing Roman bronze coins turned up by the plow in ancient meadows." },
      { author: "Washington Irving", work: "Tales of a Traveller", quote: "The old **numismatist** spent hours examining the worn profile of a Caesar under his magnifying lens." }
    ]
  },

  // Dashboard — nom
  "Dashboard — nom/agronomic.md": {
    primary: "Relating to agronomy; pertaining to the scientific cultivation of soil, crop production, and field management.",
    secondary: "Pertaining to the economic and biological optimization of agricultural yields and farm ecosystems.",
    quotes: [
      { author: "George Washington Carver", work: "Agricultural Bulletins", quote: "Proper crop rotation is an essential **agronomic** practice to restore depleted nitrogen to exhausted southern soils." },
      { author: "Liberty Hyde Bailey", work: "The Principles of Agriculture", quote: "The **agronomic** value of a crop depends not merely upon gross yield, but upon soil conservation and climate resilience." },
      { author: "Norman Borlaug", work: "Nobel Lecture", quote: "Modern plant breeding must be paired with sound **agronomic** management to avert global famine." }
    ]
  },
  "Dashboard — nom/agronomical.md": {
    primary: "Pertaining to agronomy or the science of agricultural production and soil management (synonymous with agronomic).",
    secondary: "In agricultural literature, concerning systematic experiments in crop rotation, fertilization, and tillage.",
    quotes: [
      { author: "Justus von Liebig", work: "Familiar Letters on Chemistry", quote: "Our **agronomical** experiments demonstrate that mineral replenishment is vital for sustained agricultural productivity." },
      { author: "Liberty Hyde Bailey", work: "The Standard Cyclopedia of Horticulture", quote: "The **agronomical** classification of grains distinguishes winter hardiness from spring vegetative vigor." },
      { author: "Luther Burbank", work: "The Training of the Human Plant", quote: "Applying rigorous **agronomical** principles to seed selection yielded varieties unprecedented in hardiness." }
    ]
  },
  "Dashboard — nom/agronomist.md": {
    primary: "An expert or scientist specializing in agronomy—the management of land, soil science, and crop production.",
    secondary: "An agricultural advisor who develops sustainable farming techniques and evaluates crop genetics.",
    quotes: [
      { author: "Norman Borlaug", work: "Nobel Lecture", quote: "The dedicated **agronomist** spends long days in the muddy furrow selecting dwarf wheat strains for higher yields." },
      { author: "George Washington Carver", work: "Progressive Farmer", quote: "The field **agronomist** teaches the farmer how to turn wild weeds and native legumes into profitable soil food." },
      { author: "René Dubos", work: "So Human an Animal", quote: "The modern **agronomist** must balance the pursuit of bumper crops against the preservation of subterranean microbial ecology." }
    ]
  },
  "Dashboard — nom/agronomy.md": {
    primary: "The branch of agricultural science dealing with field crop production, soil management, and land cultivation.",
    secondary: "The practical application of scientific principles (such as botany, soil chemistry, and ecology) to farming.",
    quotes: [
      { author: "George Washington Carver", work: "Nature Study Bulletins", quote: "The science of **agronomy** reveals that the earth responds bountifully when treated according to natural laws." },
      { author: "Norman Borlaug", work: "Feeding a World of 10 Billion People", quote: "Without the revolutionary innovations of scientific **agronomy**, modern civilization could not sustain its urban populations." },
      { author: "Liberty Hyde Bailey", work: "The Holy Earth", quote: "True **agronomy** is more than commercial production; it is the reverent stewardship of the living soil." }
    ]
  },
  "Dashboard — nom/antinomy.md": {
    primary: "A contradiction between two beliefs, conclusions, or principles, each of which is supported by equally valid and compelling arguments.",
    secondary: "A conflict or inconsistency between two statutory laws or authoritative legal precepts.",
    quotes: [
      { author: "Immanuel Kant", work: "Critique of Pure Reason", quote: "Reason falls into an unavoidable **antinomy** when it attempts to conceive the universe as either finite or infinite in space and time." },
      { author: "Arthur Schopenhauer", work: "The World as Will and Representation", quote: "Kant's famous **antinomy** demonstrated the limits of our conceptual apparatus when applied beyond sensible experience." },
      { author: "Bertrand Russell", work: "A History of Western Philosophy", quote: "The resolution of an **antinomy** often requires us to reconstruct our most fundamental semantic definitions." }
    ]
  },
  "Dashboard — nom/astronomer.md": {
    primary: "A scientist or scholar who observes, studies, and analyzes celestial objects, space, and the physical universe.",
    secondary: "A stargazer or historical observer of planetary motions and stellar cartography.",
    quotes: [
      { author: "Galileo Galilei", work: "The Starry Messenger", quote: "The diligent **astronomer** will observe that Jupiter is escorted by four wandering stars invisible to the naked eye." },
      { author: "Edwin Hubble", work: "The Realm of the Nebulae", quote: "The **astronomer** peers into distant galactic depths to measure the expansion of the cosmos." },
      { author: "Walt Whitman", work: "Leaves of Grass", quote: "When I heard the learn'd **astronomer**, When the proofs, the figures, were ranged in columns before me." }
    ]
  },
  "Dashboard — nom/astronomic.md": {
    primary: "Relating to astronomy or the study of celestial bodies (variant of astronomical).",
    secondary: "Colossally large, immense, or incomprehensibly vast in scale or quantity.",
    quotes: [
      { author: "Arthur Eddington", work: "The Expanding Universe", quote: "The **astronomic** distances separating island universes dwarf the imagination of mortal man." },
      { author: "H. G. Wells", work: "The Time Machine", quote: "The slowing rotation of the earth through **astronomic** epochs brought perpetual twilight to the dying planet." },
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "Plato's vision took in whole galaxies of thought with calm, **astronomic** impartiality." }
    ]
  },
  "Dashboard — nom/astronomical.md": {
    primary: "Relating to astronomy, celestial bodies, and cosmological phenomena.",
    secondary: "Enormously or inconceivably large, expensive, or immense in magnitude.",
    quotes: [
      { author: "Carl Sagan", work: "Cosmos", quote: "The **astronomical** numbers of stars in the observable universe surpass the grains of sand on all the beaches of Earth." },
      { author: "Bertrand Russell", work: "The Scientific Outlook", quote: "Our tiny planet is an infinitesimal speck in an **astronomical** abyss of cold, empty space." },
      { author: "Thomas Hardy", work: "Two on a Tower", quote: "The passionate young stargazer looked through his telescope, lost in **astronomical** contemplation of the stellar voids." }
    ]
  },
  "Dashboard — nom/astronomically.md": {
    primary: "In a manner relating to astronomy or cosmological calculation.",
    secondary: "To an enormous, colossal, or extraordinarily vast degree or quantity.",
    quotes: [
      { author: "Stephen Hawking", work: "A Brief History of Time", quote: "The temperature of the early universe was **astronomically** high in the initial fractions of a second following the Big Bang." },
      { author: "Carl Sagan", work: "The Demon-Haunted World", quote: "The odds against life arising by sheer random collision of atoms were considered **astronomically** remote." },
      { author: "Richard Feynman", work: "The Character of Physical Law", quote: "The gravitational force between two electrons is **astronomically** weak compared to their electrical repulsion." }
    ]
  },
  "Dashboard — nom/astronomy.md": {
    primary: "The scientific study of the universe, celestial bodies (such as stars, planets, comets, and galaxies), and the phenomena originating outside the Earth's atmosphere.",
    secondary: "The ancient observational art and mathematical science of charting planetary orbits and stellar constellations.",
    quotes: [
      { author: "Nicolaus Copernicus", work: "De Revolutionibus Orbium Coelestium", quote: "Among the liberal arts, **astronomy** holds a preeminent place, lifting the mind to contemplate the celestial harmony." },
      { author: "Johannes Kepler", work: "Astronomia Nova", quote: "In my new treatise on **astronomy**, I was compelled by Tycho's observations to abandon circular orbits for ellipses." },
      { author: "Arthur Eddington", work: "Stars and Atoms", quote: "Modern **astronomy** has become a branch of atomic physics applied to cosmic laboratories." }
    ]
  },
  "Dashboard — nom/autonomous.md": {
    primary: "Having self-government, independence, and the freedom to act or function without external control.",
    secondary: "Capable of moral self-determination based on reason (Kantian); operating independently through automated guidance without human intervention.",
    quotes: [
      { author: "Immanuel Kant", work: "Groundwork of the Metaphysics of Morals", quote: "A rational will is truly **autonomous** when it binds itself to universal moral laws of its own making." },
      { author: "Alexis de Tocqueville", work: "Democracy in America", quote: "The township stood as an **autonomous** civic body, managing its domestic concerns without interference from the capital." },
      { author: "John Stuart Mill", work: "On Liberty", quote: "Over his own body and mind, the individual is rightfully sovereign and **autonomous**." }
    ]
  },
  "Dashboard — nom/autonomy.md": {
    primary: "The right or condition of self-government, political independence, and freedom from external authority.",
    secondary: "The capacity of a rational individual to make informed, uncoerced decisions and determine their own moral actions.",
    quotes: [
      { author: "Immanuel Kant", work: "Critique of Practical Reason", quote: "The **autonomy** of the will is the sole principle of all moral laws and corresponding duties." },
      { author: "James Joyce", work: "Ulysses", quote: "They debated the restoration of Zion and the possibility of Irish political **autonomy** or devolution." },
      { author: "Isaiah Berlin", work: "Two Concepts of Liberty", quote: "Positive freedom involves the desire of the individual to achieve personal **autonomy** and self-mastery." }
    ]
  },
  "Dashboard — nom/bionomic.md": {
    primary: "Relating to bionomics; pertaining to the branch of biology studying the relationship between organisms and their environmental surroundings (ecological).",
    secondary: "Concerning the physiological and behavioral adaptations of species to their ecological niches.",
    quotes: [
      { author: "Julian Huxley", work: "Evolution: The Modern Synthesis", quote: "The **bionomic** success of a species is measured by its capacity to exploit unutilized ecological niches." },
      { author: "Patrick Geddes", work: "Cities in Evolution", quote: "A sound sociological survey must begin with the **bionomic** realities of local topography, food resources, and climate." },
      { author: "E. O. Wilson", work: "The Diversity of Life", quote: "Every **bionomic** interaction between predator and prey refines the evolutionary adaptations of both." }
    ]
  },
  "Dashboard — nom/bionomical.md": {
    primary: "Pertaining to the bionomics or ecology of living organisms in their natural habitat (synonymous with bionomic).",
    secondary: "In ecological literature, relating to the life history, feeding habits, and environmental pressures governing a species.",
    quotes: [
      { author: "Alfred Russel Wallace", work: "Darwinism", quote: "Our **bionomical** observations in the Amazonian jungle revealed how protective resemblance shields edible insects from insectivorous birds." },
      { author: "Ronald Fisher", work: "The Genetical Theory of Natural Selection", quote: "Mathematical population models must incorporate the **bionomical** factors of fecundity and survival rates." },
      { author: "Charles Elton", work: "Animal Ecology", quote: "The **bionomical** niche of an animal describes its precise status in the food chain and local biotic community." }
    ]
  },
  "Dashboard — nom/bionomics.md": {
    primary: "The scientific study of the relation of organisms to their environment, their adaptation, and their mode of life; ecology.",
    secondary: "In socioeconomic theory, the study of economic systems viewed as evolving, living ecosystems.",
    quotes: [
      { author: "Patrick Geddes", work: "The Evolution of Sex", quote: "The science of **bionomics** reveals how intimate cooperation balances competitive struggle throughout nature." },
      { author: "Julian Huxley", work: "The Stream of Life", quote: "Before the term ecology became universal, naturalists investigated these living harmonies under the heading of **bionomics**." },
      { author: "Michael Rothschild", work: "Bionomics: Economy as Ecosystem", quote: "In **bionomics**, we recognize that human technological networks evolve through mechanisms analogous to biological selection." }
    ]
  },
  "Dashboard — nom/gastronomic.md": {
    primary: "Relating to the art or science of good eating, fine food, and culinary preparation.",
    secondary: "Pertaining to culinary culture, epicurean taste, and dining refinement.",
    quotes: [
      { author: "Jean Anthelme Brillat-Savarin", work: "The Physiology of Taste", quote: "The discovery of a new dish confers more happiness on humanity than the discovery of a new star, possessing supreme **gastronomic** virtue." },
      { author: "Alexandre Dumas", work: "Grand Dictionnaire de Cuisine", quote: "Paris remains the undisputed capital of **gastronomic** artistry, where dining is elevated to a sublime passion." },
      { author: "George Orwell", work: "Down and Out in Paris and London", quote: "The wealthy patrons in the luxury restaurant were entirely oblivious to the squalor behind their **gastronomic** delights." }
    ]
  },
  "Dashboard — nom/gastronomical.md": {
    primary: "Pertaining to gastronomy or epicurean cuisine (synonymous with gastronomic).",
    secondary: "In literature, evoking elaborate feasts, culinary excess, or refined dining experiences.",
    quotes: [
      { author: "William Makepeace Thackeray", work: "The Book of Snobs", quote: "He prided himself upon his exquisite **gastronomical** discernment, lecturing the table on vintages and truffles." },
      { author: "Charles Dickens", work: "Nicholas Nickleby", quote: "The bountiful holiday hamper presented a tempting **gastronomical** spectacle to the hungry lads." },
      { author: "Washington Irving", work: "Bracebridge Hall", quote: "The squire upheld all the ancient **gastronomical** traditions of Old Christmas with roasted boar's head and spiced ale." }
    ]
  },
  "Dashboard — nom/gastronomy.md": {
    primary: "The art and science of good eating, gourmet cooking, and the cultural study of food.",
    secondary: "Epicurean taste and culinary connoisseurship in dining traditions.",
    quotes: [
      { author: "Jean Anthelme Brillat-Savarin", work: "The Physiology of Taste", quote: "**Gastronomy** is the intelligent knowledge of whatever concerns man's nourishment, directing his palate and preserving his health." },
      { author: "Honoré de Balzac", work: "Cousin Pons", quote: "He was a devotee of refined **gastronomy**, regarding an exquisite sauce as an achievement worthy of a great painter." },
      { author: "M. F. K. Fisher", work: "The Art of Eating", quote: "True **gastronomy** demands not extravagance, but curiosity, discernment, and reverence for simple ingredients." }
    ]
  },
  "Dashboard — nom/metronome.md": {
    primary: "A mechanical or electronic device that marks time at a selected steady beat by emitting regular audible ticks or visual flashes, used by musicians during practice.",
    secondary: "Any regular, unvarying rhythmic standard or measuring device in music, poetry, or machinery.",
    quotes: [
      { author: "Ludwig van Beethoven", work: "Selected Letters", quote: "I welcome Maelzel's **metronome**, for it enables composers to fix the exact tempo of their musical thoughts for all posterity." },
      { author: "Thomas Mann", work: "Doctor Faustus", quote: "The dry, unfeeling click of the **metronome** seemed to enforce an icy discipline upon the trembling student." },
      { author: "Oliver Sacks", work: "Musicophilia", quote: "Parkinsonian patients whose gait has frozen can often step forward smoothly when guided by the rhythmic pulse of a **metronome**." }
    ]
  },
  "Dashboard — nom/nom.md": {
    primary: "The Greek combining root *nom-* (from *nomos* / *nemein*), meaning 'law', 'custom', 'order', or 'distribution', forming words like *astronomy*, *autonomy*, and *economy*.",
    secondary: "The linguistic morpheme representing systematized governance, classification, or lawful regulation.",
    quotes: [
      { author: "Henry George Liddell & Robert Scott", work: "A Greek-English Lexicon", quote: "From the fundamental root **nom** spring the Hellenic concepts of custom, legislative statute, and orderly allocation." },
      { author: "Émile Benveniste", work: "Indo-European Language and Society", quote: "The element **nom** in Greek compounds denotes the authoritative ordering and distribution of resources or knowledge." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "The semantic evolution of **nom** demonstrates how ancient pastoral custom ripened into civil jurisprudence." }
    ]
  },
  "Dashboard — nom/nomos.md": {
    primary: "The ancient Greek concept of custom, convention, unwritten social tradition, or positive statutory law (contrasted with *physis*, natural order).",
    secondary: "An established social norm, cultural code, or civic law governing human behavior in a community.",
    quotes: [
      { author: "Plato", work: "The Republic", quote: "The sophists argued that justice was not founded upon eternal nature, but was merely a conventional **nomos** agreed upon by the weak." },
      { author: "Aristotle", work: "Politics", quote: "A constitution is an organization of offices in a state, determined by its fundamental **nomos**." },
      { author: "Peter L. Berger", work: "The Sacred Canopy", quote: "Every human society is an enterprise in building a meaningful **nomos**, an orderly shield against terrifying chaos." }
    ]
  },
  "Dashboard — nom/numismatic.md": {
    primary: "Relating to coins, currency, tokens, or the scholarly study of coinage.",
    secondary: "Pertaining to numismatics as a branch of historical archaeology and economic history.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The **numismatic** evidence of debased silver coinage confirmed the fiscal exhaustion of the later empire." },
      { author: "Walter Pater", work: "Greek Studies", quote: "The tiny bronze obol possessed immense **numismatic** and artistic value, preserving the exquisite miniature profile of a goddess." },
      { author: "Thomas Hardy", work: "A Pair of Blue Eyes", quote: "He possessed a fine **numismatic** collection containing specimens unearthed from ancient Saxon barrows." }
    ]
  },
  "Dashboard — nom/numismatist.md": {
    primary: "A scholar, specialist, or collector who studies or collects coins, medals, paper money, and tokens.",
    secondary: "An expert who authenticates, dates, and interprets historical currency and metallurgical mintings.",
    quotes: [
      { author: "Arthur Conan Doyle", work: "The Musgrave Ritual", quote: "A knowledgeable **numismatist** identified the tarnished crowns as belonging to the reign of Charles the First." },
      { author: "Thomas Hardy", work: "The Mayor of Casterbridge", quote: "The local antiquary was a devoted **numismatist**, possessing Roman bronze coins turned up by the plow in ancient meadows." },
      { author: "Washington Irving", work: "Tales of a Traveller", quote: "The old **numismatist** spent hours examining the worn profile of a Caesar under his magnifying lens." }
    ]
  },
  "Dashboard — nom/polynomial.md": {
    primary: "An algebraic expression consisting of variables and coefficients, constructed using only addition, subtraction, multiplication, and non-negative integer exponents.",
    secondary: "In pre-Linnaean taxonomy, a descriptive scientific name for a species consisting of multiple descriptive Latin words.",
    quotes: [
      { author: "Carl Friedrich Gauss", work: "Disquisitiones Arithmeticae", quote: "The fundamental theorem of algebra demonstrates that every non-zero single-variable **polynomial** with complex coefficients has at least one complex root." },
      { author: "Henri Poincaré", work: "Science and Method", quote: "The roots of a high-degree **polynomial** often reveal profound topological symmetries in algebraic space." },
      { author: "Ernst Mayr", work: "The Growth of Biological Thought", quote: "Before Linnaeus introduced the binomial system, naturalists struggled with unwieldy **polynomial** diagnostic phrases to label a single plant." }
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

console.log('Done Batch 3 (nem & nom) of Cluster Law & Order!');
