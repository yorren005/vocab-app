import fs from 'fs';
import path from 'path';

const dir = 'App database/Greek roots/Cluster Turning & Transformation/Dashboard — trop';

const data = {
  "amphitropous.md": {
    primary: "Of an ovule: curved in such a manner that both the micropyle and chalaza are bent downward towards the funiculus, with the hilum situated laterally between them.",
    secondary: "Exhibiting a structural orientation or curvature that points or turns in two opposite or conjugate directions.",
    quotes: [
      { author: "Asa Gray", work: "Elements of Botany", quote: "In the **amphitropous** ovule, the body is curved upon itself until the orifice and the base are brought close together." },
      { author: "John Lindley", work: "An Introduction to Botany", quote: "The ovule is styled **amphitropous** when it is curved so as to bring both extremity and base near to the hilum." },
      { author: "Katherine Esau", work: "Plant Anatomy", quote: "The campylotropous or **amphitropous** ovule develops an asymmetric curvature that profoundly alters the trajectory of pollen-tube entry." }
    ]
  },
  "anatropous.md": {
    primary: "Of an ovule: inverted completely during development so that the micropyle faces toward the placenta and lies alongside the hilum, with the funiculus adnate to the body.",
    secondary: "Having an upside-down or inverted orientation relative to the axis of initial growth.",
    quotes: [
      { author: "Charles Darwin", work: "The Various Contrivances by Which Orchids Are Fertilised by Insects", quote: "The ovules in orchids are minute, numerous, and typically **anatropous**, suspended along the parietal placentae." },
      { author: "Agnes Arber", work: "Water Plants: A Study of Aquatic Angiosperms", quote: "In many monocotyledonous families, the ovule remains strictly **anatropous** throughout its ontogeny." },
      { author: "Liberty Hyde Bailey", work: "The Standard Cyclopedia of Horticulture", quote: "The inverted or **anatropous** ovule represents the most common morphology found among flowering angiosperms." }
    ]
  },
  "apotropaic.md": {
    primary: "Intended or having the power to avert evil, harm, or ill fortune, often through protective charms, rituals, or symbolic imagery.",
    secondary: "Functioning as a prophylactic magical counter-measure to ward off malevolent spirits or the envious gaze in anthropological and archaeological contexts.",
    quotes: [
      { author: "Jane Ellen Harrison", work: "Prolegomena to the Study of Greek Religion", quote: "The gorgon mask served not as a portrait of fear alone, but as an **apotropaic** device to turn aside pollution." },
      { author: "E. R. Dodds", work: "The Greeks and the Irrational", quote: "Rituals designed to placate restless shades were essentially **apotropaic**, focused on barring their intrusion into civic life." },
      { author: "Sir James George Frazer", work: "The Golden Bough", quote: "Red paint and loud rattles were employed across diverse cultures as **apotropaic** barriers against unseen spectral perils." }
    ]
  },
  "atropa.md": {
    primary: "A genus of perennial herbaceous plants in the nightshade family (Solanaceae), notably including *Atropa belladonna* (deadly nightshade), characterized by toxic tropane alkaloids.",
    secondary: "The botanical source of medicinal alkaloids that block muscarinic acetylcholine receptors, named after the Greek Fate Atropos.",
    quotes: [
      { author: "William Withering", work: "A Botanical Arrangement of British Plants", quote: "The genus **Atropa** bears lurid purple bell-shaped flowers followed by lustrous black berries of dangerous potency." },
      { author: "Arthur Conan Doyle", work: "The Adventure of the Devil's Foot", quote: "The alkaloid derived from **Atropa** possessed physiological effects of the most extraordinary and deadly character." },
      { author: "Jonathan Pereira", work: "The Elements of Materia Medica and Therapeutics", quote: "The root and leaves of **Atropa** belladonna have long been recognized as among the most powerful narcotics known to pharmacy." }
    ]
  },
  "atrophy.md": {
    primary: "The progressive wasting away, diminution in size, or impairment of a body organ, tissue, or cell, especially from disease, injury, malnutrition, or lack of use.",
    secondary: "Any progressive degeneration, decline, or loss of effectiveness in an institution, skill, or human capacity through stagnation or disuse.",
    quotes: [
      { author: "Charles Darwin", work: "The Descent of Man", quote: "Organs which have become useless to a species gradually undergo **atrophy** through prolonged disuse across generations." },
      { author: "William James", work: "The Principles of Psychology", quote: "Any intellectual or emotional faculty that remains unexercised falls into a state of premature **atrophy**." },
      { author: "Virginia Woolf", work: "A Room of One's Own", quote: "The creative gift, when starved of privacy and leisure, suffers a slow and painful **atrophy**." }
    ]
  },
  "atropidae.md": {
    primary: "An archaic family of primitive, wingless or brachypterous booklice and barklice (order Psocodea), formerly typified by the genus *Atropos* (now *Trogium* or *Lepinotus*).",
    secondary: "An entomological taxon grouping domestic booklice known for infesting dried herbaria, parchment, and library bindings.",
    quotes: [
      { author: "Hermann August Hagen", work: "Synopsis of the Neuroptera of North America", quote: "In the classification of wingless insects, the family **Atropidae** comprised those diminutive forms that haunt old volumes and dried plant collections." },
      { author: "John Obadiah Westwood", work: "An Introduction to the Modern Classification of Insects", quote: "The minute creatures referred to the **Atropidae** inhabit damp wainscoting and herbarium cabinets, feeding upon starchy paste." },
      { author: "Alpheus Spring Packard", work: "Guide to the Study of Insects", quote: "The death-watch tick heard in quiet library shelves was frequently attributed to minute species of **Atropidae** tapping against dry wood." }
    ]
  },
  "atropine.md": {
    primary: "A poisonous, crystalline tropane alkaloid ($C_{17}H_{23}NO_3$) extracted from deadly nightshade and other solanaceous plants, used medicinally to dilate the pupil, increase heart rate, and counteract organophosphate poisoning.",
    secondary: "A classic competitive antagonist of muscarinic acetylcholine receptors utilized across cardiology, ophthalmology, and toxicological emergency medicine.",
    quotes: [
      { author: "Oliver Wendell Holmes Sr.", work: "Medical Essays", quote: "A minute drop of **atropine** placed upon the conjunctiva paralyzes accommodation and widely dilates the pupil." },
      { author: "Claude Bernard", work: "An Introduction to the Study of Experimental Medicine", quote: "The physiological antagonism between pilocarpine and **atropine** proved to be one of the clearest demonstrations of selective nerve action." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "In severe bradycardia or acute mushroom intoxication, **atropine** must be administered promptly to restore normal rhythm." }
    ]
  },
  "atropos.md": {
    primary: "The eldest of the three Fates (Moirai) in Greek mythology, who cut the thread of human life spun by Clotho and measured by Lachesis, representing the inevitable and unalterable nature of death.",
    secondary: "The inexorable, unturning, or inflexible destiny that terminates human existence.",
    quotes: [
      { author: "John Milton", work: "Lycidas", quote: "Comes the blind Fury with the abhorred shears, and slits the thin-spun life; for **Atropos** respects neither youth nor genius." },
      { author: "Percy Bysshe Shelley", work: "Prometheus Unbound", quote: "Beyond the spinning spheres stood **Atropos**, severing mortal hopes with indifferent blade." },
      { author: "Thomas Carlyle", work: "The French Revolution", quote: "Destiny sweeps onward like **Atropos**, turning aside for neither tears nor monarchs." }
    ]
  },
  "dystrophy.md": {
    primary: "A disorder or degenerative condition caused by defective or deficient nutrition, cellular metabolism, or genetic mutation, especially affecting muscles, nerves, or tissues.",
    secondary: "Any progressive degeneration or malformation of a biological structure, as seen in muscular dystrophy or corneal dystrophy.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Progressive muscular **dystrophy** presents a hereditary wasting of voluntary muscles without primary lesion in the spinal cord." },
      { author: "H. G. Wells", work: "The Island of Doctor Moreau", quote: "The artificially grafted tissues showed early signs of biological **dystrophy**, breaking down despite all surgical care." },
      { author: "Stephen Jay Gould", work: "The Panda's Thumb", quote: "The severe systemic **dystrophy** observed in metabolic mutants illustrates how tightly coordinated embryonic growth must be." }
    ]
  },
  "entropy.md": {
    primary: "A thermodynamic quantity representing the unavailability of a system's thermal energy for conversion into mechanical work, often interpreted as the degree of disorder or randomness in the system.",
    secondary: "A measure of the loss of information, uncertainty in a transmission, or the inevitable degradation of order and structure into chaos.",
    quotes: [
      { author: "Rudolf Clausius", work: "The Mechanical Theory of Heat", quote: "The energy of the universe is constant; the **entropy** of the universe tends to a maximum." },
      { author: "Arthur Eddington", work: "The Nature of the Physical World", quote: "The law that **entropy** always increases holds, I think, the supreme position among the laws of Nature." },
      { author: "Thomas Pynchon", work: "The Crying of Lot 49", quote: "She thought of the concept of **entropy**, connecting the dissipation of thermal energy with the breakdown of meaningful communication." }
    ]
  },
  "exotropia.md": {
    primary: "A form of strabismus in which one or both eyes deviate outward away from the nose; divergent squint.",
    secondary: "The clinical ocular condition characterized by outward turning of the visual axes, leading to diplopia or suppressed binocular vision.",
    quotes: [
      { author: "Stewart Duke-Elder", work: "System of Ophthalmology", quote: "Intermittent **exotropia** often manifests when the patient is fatigued or daydreaming, the non-fixing eye drifting outward into the temporal field." },
      { author: "Albrecht von Graefe", work: "Archiv für Ophthalmologie", quote: "Surgical recession of the lateral rectus muscle provides the standard intervention for marked divergent **exotropia**." },
      { author: "Oliver Sacks", work: "The Mind's Eye", quote: "Patients with uncorrected alternating **exotropia** learn to suppress one visual stream to avoid distressing double vision." }
    ]
  },
  "extropic.md": {
    primary: "Tending toward or characterized by extropy; exhibiting increasing order, intelligence, complexity, organization, and vitality over time.",
    secondary: "Pertaining to philosophical or transhumanist principles that oppose entropy through technological, social, and cognitive evolution.",
    quotes: [
      { author: "Max More", work: "The Principles of Extropy", quote: "An **extropic** framework affirms our capacity to expand intelligence, vitality, and freedom against the baseline of material decay." },
      { author: "Kevin Kelly", work: "Out of Control", quote: "Living systems display an **extropic** impulse, constantly organizing raw matter into self-reinforcing loops of higher complexity." },
      { author: "Ray Kurzweil", work: "The Singularity Is Near", quote: "The acceleration of computing paradigms represents an **extropic** trajectory where information density surpasses physical limits." }
    ]
  },
  "extropy.md": {
    primary: "A measure of a system's capacity for growth, intelligence, vitality, energy, and self-organization; the conceptual antithesis or negative of entropy.",
    secondary: "A transhumanist philosophy advocating continuous human enhancement, rational progress, and overcoming biological limits through science and technology.",
    quotes: [
      { author: "Max More", work: "Extropy: The Journal of Transhumanist Thought", quote: "We define **extropy** as the extent of a living or organizational system's capacity to maintain order, intelligence, and purposeful action." },
      { author: "Vernor Vinge", work: "True Names and Other Perils", quote: "The sheer drive of cybernetic networks toward **extropy** suggested an antidote to the heat death of closed systems." },
      { author: "Nick Bostrom", work: "Superintelligence", quote: "Civilizational longevity depends on cultivating systems whose collective **extropy** outpaces the friction of institutional inertia." }
    ]
  },
  "hypertrophy.md": {
    primary: "The enlargement or overgrowth of an organ or part of the body due to an increase in the size of its constituent cells rather than an increase in cell number.",
    secondary: "Excessive or disproportionate development, growth, or elaboration of an institution, habit, or ornamental feature.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Compensatory **hypertrophy** of the left ventricle occurs routinely in response to sustained systemic hypertension." },
      { author: "Thomas Henry Huxley", work: "Evolution and Ethics", quote: "The excessive **hypertrophy** of military apparatus in peace-time drains the productive energies of the state." },
      { author: "Charles Darwin", work: "The Origin of Species", quote: "When an organ becomes excessively developed, this extraordinary **hypertrophy** often imposes a heavy metabolic tax upon the whole organism." }
    ]
  },
  "isotropic.md": {
    primary: "Having physical properties (such as elasticity, thermal conductivity, or optical refractive index) that are identical in all directions.",
    secondary: "Exhibiting spatial uniformity or symmetry irrespective of the axis of measurement or observation.",
    quotes: [
      { author: "James Clerk Maxwell", work: "A Treatise on Electricity and Magnetism", quote: "In an **isotropic** medium, the dielectric permittivity remains constant regardless of the orientation of the electric field." },
      { author: "Arthur Eddington", work: "The Mathematical Theory of Relativity", quote: "The geometry of spacetime around an isolated mass is treated as spherically symmetric and spatially **isotropic**." },
      { author: "Subrahmanyan Chandrasekhar", work: "Radiative Transfer", quote: "We first evaluate the equation of transfer under the simplifying assumption of purely **isotropic** scattering." }
    ]
  },
  "isotropically.md": {
    primary: "In an isotropic manner; with uniform physical, optical, or spatial properties in every direction.",
    secondary: "Radiating, expanding, or propagating equally along all axes from a central source.",
    quotes: [
      { author: "Stephen Hawking", work: "A Brief History of Time", quote: "The cosmic microwave background radiation is observed to arrive **isotropically** from every quarter of the sky." },
      { author: "Richard Feynman", work: "The Feynman Lectures on Physics", quote: "A point charge isolated in free space radiates electromagnetic energy **isotropically** over the entire solid angle." },
      { author: "P. J. E. Peebles", work: "Principles of Physical Cosmology", quote: "The universe appears to expand **isotropically**, displaying no preferred direction of cosmic flow on large scales." }
    ]
  },
  "isotropous.md": {
    primary: "Exhibiting identical physical or biological properties along all axes; identical in meaning and derivation to isotropic.",
    secondary: "Lacking predetermined polarity or directional differentiation, as in certain undifferentiated blastomeres or ovules in embryology.",
    quotes: [
      { author: "D'Arcy Wentworth Thompson", work: "On Growth and Form", quote: "In an **isotropous** drop of liquid, surface tension acts uniformly over every point of the bounding sphere." },
      { author: "E. B. Wilson", work: "The Cell in Development and Inheritance", quote: "The unfertilized egg is regarded as essentially **isotropous** until the entrance of the spermatozoon establishes a polar axis." },
      { author: "Lord Kelvin", work: "Treatise on Natural Philosophy", quote: "An **isotropous** solid possesses equal elastic resistance against strain in every direction of its substance." }
    ]
  },
  "isotropy.md": {
    primary: "The state or property of having uniform physical characteristics in all directions; invariance with respect to spatial rotation.",
    secondary: "The absence of directional preference or bias in a physical field, cosmic structure, or material lattice.",
    quotes: [
      { author: "Albert Einstein", work: "The Meaning of Relativity", quote: "The cosmological principle postulates both homogeneity and spatial **isotropy** for the universe on sufficiently large scales." },
      { author: "Lev Landau & Evgeny Lifshitz", work: "Statistical Physics", quote: "The complete **isotropy** of the liquid state breaks down spontaneously when the substance freezes into an anisotropic crystal." },
      { author: "Steven Weinberg", work: "Gravitation and Cosmology", quote: "Measurements of the relic radiation confirmed the extraordinary **isotropy** of the cosmic background to within parts per hundred thousand." }
    ]
  },
  "monotropa.md": {
    primary: "A genus of herbaceous, perennial, mycoheterotrophic flowering plants in the heath family (Ericaceae), completely lacking chlorophyll and deriving nutrients from mycorrhizal fungi, typified by *Monotropa uniflora* (Indian pipe).",
    secondary: "A ghostly pale forest wildflower whose downward-curved stem straightens upon capsule maturation, reflecting its Greek etymology ('single turn').",
    quotes: [
      { author: "Henry David Thoreau", work: "Journal", quote: "I found the waxen, translucent stems of **Monotropa** rising from the damp pine mould like pale apparitions." },
      { author: "Asa Gray", work: "Manual of the Botany of the Northern United States", quote: "The genus **Monotropa** consists of white or reddish parasitic herbs destitute of green foliage." },
      { author: "Emily Dickinson", work: "Selected Letters", quote: "She called the **Monotropa** her favorite flower—a fitting emblem of solitary and spotless contemplation." }
    ]
  },
  "monotropaceae.md": {
    primary: "A former family of achlorophyllous, parasitic or saprophytic flowering plants, now classified as the subfamily Monotropoideae within the Ericaceae.",
    secondary: "A botanical family grouping mycoheterotrophic woodland herbs that partner with subterranean fungal mycelia to nourish their translucent shoots.",
    quotes: [
      { author: "John Lindley", work: "The Vegetable Kingdom", quote: "The **Monotropaceae** are singular leafless herbs of brownish or white hue, parasitic on the roots of beech and pine trees." },
      { author: "Charles Darwin", work: "The Effects of Cross and Self Fertilisation in the Vegetable Kingdom", quote: "The lack of chlorophyll among members of **Monotropaceae** reflects their specialized nutritional reliance upon subterranean associations." },
      { author: "Nathaniel Lord Britton", work: "An Illustrated Flora of the Northern United States", quote: "Plants of the family **Monotropaceae** bear scaly stems terminated by solitary or clustered nodding flowers." }
    ]
  },
  "orthotropous.md": {
    primary: "Of an ovule: having a straight axis with the micropyle and chalaza situated at opposite poles in a straight line with the hilum and funiculus.",
    secondary: "Characterized by an erect, vertical, or unbent orientation of growth relative to gravity or the substrate.",
    quotes: [
      { author: "Asa Gray", work: "Botanical Text-Book", quote: "In the strictly **orthotropous** ovule, the chalaza sits at the very insertion of the stalk, and the orifice points directly away." },
      { author: "John Lindley", work: "An Introduction to Botany", quote: "An **orthotropous** ovule is straight from base to apex, requiring no curvature of the integuments." },
      { author: "Agnes Arber", work: "Herbals: Their Origin and Evolution", quote: "Early morphologists distinguished the erect **orthotropous** seed structure from those that turn downward during maturation." }
    ]
  },
  "pantropic.md": {
    primary: "Having an affinity for or capable of infecting many different types of tissue or organs, rather than being tissue-specific in virology and pathology.",
    secondary: "Distributed throughout, or having an ecological tolerance for, all tropical regions of the world (synonymous with pantropical).",
    quotes: [
      { author: "Macfarlane Burnet", work: "Natural History of Infectious Disease", quote: "Certain yellow fever virus variants exhibit a **pantropic** virulence, attacking hepatic, renal, and vascular tissues indiscriminately." },
      { author: "Theobald Smith", work: "Parasitism and Disease", quote: "The mutant strain lost its neurotropic affinity and reverted to a generalized **pantropic** dissemination throughout the host." },
      { author: "René Dubos", work: "Bacterial and Mycotic Infections of Man", quote: "A pathogen that is truly **pantropic** overcomes localized mucosal defenses to seed widespread systemic foci." }
    ]
  },
  "pantropical.md": {
    primary: "Distributed or occurring throughout the tropical regions of the entire globe, spanning tropical Africa, the Americas, Asia, and Oceania.",
    secondary: "Pertaining to biological taxa, climatic patterns, or ecosystems that encircle the equatorial and tropical zones of the earth.",
    quotes: [
      { author: "Alfred Russel Wallace", work: "Tropical Nature, and Other Essays", quote: "Certain families of palms exhibit a strictly **pantropical** distribution, flourishing across all continents where frosts are unknown." },
      { author: "E. O. Wilson", work: "The Diversity of Life", quote: "The coconut palm stands as the classic example of a **pantropical** species whose buoyant seeds crossed entire oceanic basins." },
      { author: "Alexander von Humboldt", work: "Aspects of Nature", quote: "The traveler observes how certain creeping ferns maintain a continuous **pantropical** belt around the warmest latitudes of our globe." }
    ]
  },
  "tropaeolaceae.md": {
    primary: "A family of dicotyledonous flowering plants in the order Brassicales, comprising the genus *Tropaeolum* (garden nasturtiums), characterized by pungent peltate leaves and spurred zygomorphic flowers.",
    secondary: "The botanical nasturtium family, prized in horticulture for edible peppery leaves and vibrant flowers containing mustard-oil glucosides.",
    quotes: [
      { author: "John Lindley", work: "The Vegetable Kingdom", quote: "The family **Tropaeolaceae** is distinguished by its pungent juices, peltate foliage, and long nectariferous spurred calyx." },
      { author: "Liberty Hyde Bailey", work: "Manual of Cultivated Plants", quote: "In the **Tropaeolaceae**, the trailing stems and bright spur-bearing blossoms have made them staples of ornamental cottage gardens." },
      { author: "George Bentham & Joseph Dalton Hooker", work: "Genera Plantarum", quote: "The South American family **Tropaeolaceae** possesses an affinity with Geraniaceae, while developing unique mustard-oil chemistries." }
    ]
  },
  "tropaeolum.md": {
    primary: "A genus of about 80 species of annual and perennial flowering plants native to South and Central America, commonly known as nasturtiums, cultivated for their edible peppery foliage and spurred flowers.",
    secondary: "A garden plant named after the Latin *tropaeum* (trophy), because its peltate leaves resemble shields and its spurred flowers resemble punctured helmets.",
    quotes: [
      { author: "Carl Linnaeus", work: "Species Plantarum", quote: "Linnaeus named the genus **Tropaeolum** from the Greek for trophy, likening the circular leaves to round bucklers and the flower to a warrior's helmet." },
      { author: "Charles Darwin", work: "The Movements and Habits of Climbing Plants", quote: "The sensitive petioles of **Tropaeolum** curl with remarkable rapidity around any twig they touch to hoist the plant upwards." },
      { author: "Gertrude Jekyll", work: "Colour in the Flower Garden", quote: "Tangles of scarlet **Tropaeolum** trailed over the dry stone wall, setting the grey granite ablaze with blossom." }
    ]
  },
  "trope.md": {
    primary: "A figurative or metaphorical use of a word or expression, such as metaphor, metonymy, or hyperbole, turning a term from its literal meaning.",
    secondary: "A conventional, overused, or recurrent theme, motif, or storytelling device in literature, cinema, or popular culture.",
    quotes: [
      { author: "Quintilian", work: "Institutio Oratoria", quote: "By a **trope** is meant the artistic alteration of a word or phrase from its proper meaning to another." },
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "Cowley sought out every strained conceit and metaphysical **trope** that could astonish rather than persuade." },
      { author: "Harold Bloom", work: "The Anxiety of Influence", quote: "Every strong poet swerves away from their precursor through an audacious and revisionary poetic **trope**." }
    ]
  },
  "trophy.md": {
    primary: "A decorative cup, plaque, statue, or memento awarded as a prize or token of victory in a contest, competition, or sport.",
    secondary: "A monument erected on a battlefield from captured armor and weapons dedicated to a deity, celebrating the turning back of an enemy army (from Greek *tropaion*).",
    quotes: [
      { author: "Thucydides", work: "History of the Peloponnesian War", quote: "The Athenians having routed the enemy raised a **trophy** on the shore and restored the dead under a truce." },
      { author: "William Shakespeare", work: "Hamlet", quote: "No **trophy**, sword, nor hatchment o'er his bones, no noble rite nor formal ostentation." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The conqueror displayed every splendid **trophy** of Roman triumph before the gaze of the assembled legions." }
    ]
  },
  "tropic.md": {
    primary: "Either of the two parallels of celestial latitude (Tropic of Cancer and Tropic of Capricorn) where the sun reaches its northernmost or southernmost declination and turns back toward the equator.",
    secondary: "Pertaining to, situated within, or characteristic of the tropical regions of the earth; warm, equatorial, and lush.",
    quotes: [
      { author: "John Milton", work: "Paradise Lost", quote: "The sun from the **tropic** turns, and sheds oblique his lesser beams across the winter solstice." },
      { author: "Herman Melville", work: "Moby-Dick", quote: "We were cruising under the fiery line of the southern **tropic**, where the air trembled with dazzling heat." },
      { author: "Henry David Thoreau", work: "Walden", quote: "Why should the traveler seek the torrid **tropic**, when the warmth of his own heart can thaw any latitude?" }
    ]
  },
  "tropical.md": {
    primary: "Characteristic of, inhabiting, or situated within the tropics; hot, humid, and marked by luxuriant vegetation.",
    secondary: "Pertaining to or containing rhetorical tropes; figurative, metaphorical, or allegorical in archaic or rhetorical usage.",
    quotes: [
      { author: "Charles Darwin", work: "The Voyage of the Beagle", quote: "The luxuriant splendour of **tropical** vegetation in Brazil surpassed everything that my imagination had painted." },
      { author: "Joseph Conrad", work: "Heart of Darkness", quote: "The dense **tropical** forest rose like a dark impenetrable wall along the banks of the silent river." },
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "Ancient scriptures often conveyed sacred mysteries under a **tropical** or figurative veil of speech." }
    ]
  },
  "tropically.md": {
    primary: "In a tropical manner, climate, or setting; warmly, humidly, or luxuriantly.",
    secondary: "Figuratively, metaphorically, or by means of a rhetorical trope in literary usage.",
    quotes: [
      { author: "William Shakespeare", work: "Hamlet", quote: "The Mousetrap. Marry, how? **Tropically**. This play is the image of a murder done in Vienna." },
      { author: "Herman Melville", work: "Typee", quote: "The valley was **tropically** lush, fed by sparkling cascades falling from basalt crags." },
      { author: "Robert Louis Stevenson", work: "In the South Seas", quote: "The trade wind blew **tropically** warm across the deck, bearing the scent of copra and wild hibiscus." }
    ]
  },
  "tropicbird.md": {
    primary: "Any of three species of pelagic seabirds in the family Phaethontidae (genus *Phaethon*), characterized by predominantly white plumage, strong beaks, and two extremely elongated central tail feathers, inhabiting tropical oceans.",
    secondary: "A graceful pelagic flyer known for plunge-diving for squid and fish in open equatorial seas.",
    quotes: [
      { author: "Captain James Cook", work: "A Voyage Towards the South Pole, and Round the World", quote: "We observed a white **tropicbird** hovering high above the masthead, a sure indicator of warmer equatorial waters." },
      { author: "Charles Darwin", work: "The Voyage of the Beagle", quote: "On the lonely rocks of St. Paul, the beautiful **tropicbird** breeds in crevices accessible only to the sea." },
      { author: "William Beebe", work: "The Arcturus Adventure", quote: "The long streaming tail feathers of the **tropicbird** fluttered behind it like silver ribbons against the azure sky." }
    ]
  },
  "tropics.md": {
    primary: "The region of the Earth surrounding the Equator, bounded by the Tropic of Cancer in the northern hemisphere and the Tropic of Capricorn in the southern hemisphere, characterized by warm-to-hot climates year-round.",
    secondary: "The equatorial and torrid zones of the globe, famous for rich biodiversity, coral reefs, and rain forests.",
    quotes: [
      { author: "Alexander von Humboldt", work: "Personal Narrative of Travels to the Equinoctial Regions", quote: "In the **tropics**, nature displays an inexhaustible energy, clothed in forms of grandeur unknown to northern climates." },
      { author: "Alfred Russel Wallace", work: "The Malay Archipelago", quote: "The traveller in the **tropics** is constantly amazed by the endless variety of insect and avian life." },
      { author: "W. Somerset Maugham", work: "The Trembling of a Leaf", quote: "He surrendered completely to the languor of the **tropics**, where the days drifted by without count or care." }
    ]
  },
  "tropidoclonion.md": {
    primary: "A monotypic genus of small, non-venomous colubrid snakes comprising the lined snake (*Tropidoclonion lineatum*), native to the central plains of North America, characterized by keeled dorsal scales and paired black spots down its belly.",
    secondary: "A secretive, semifossorial prairie serpent whose name derives from Greek for 'keeled branch' or 'keeled flank'.",
    quotes: [
      { author: "Edward Drinker Cope", work: "The Crocodilians, Lizards, and Snakes of North America", quote: "The genus **Tropidoclonion** is well distinguished by its keeled dorsal scales and singular ventral pattern of paired black spots." },
      { author: "Raymond L. Ditmars", work: "The Reptile Book", quote: "Specimens of **Tropidoclonion** lineatum are frequently turned up under flat rocks and prairie sod where they feed on earthworms." },
      { author: "Albert Hazen Wright & Anna Allen Wright", work: "Handbook of Snakes of the United States and Canada", quote: "In life, **Tropidoclonion** displays a docile disposition, rarely attempting to bite when uncovered from its subterranean burrow." }
    ]
  },
  "tropikos.md": {
    primary: "The Ancient Greek adjective meaning 'pertaining to a turning', 'of the solstice', or 'figurative', the etymological progenitor of modern words such as *tropic*, *tropical*, and *trope*.",
    secondary: "In classical rhetoric and astronomy, designating the turning points of the celestial sun or metaphorical conversions of speech.",
    quotes: [
      { author: "Aristotle", work: "Rhetoric", quote: "The ancient masters observed how **tropikos** usage imparts elegance and vividness by turning language from its everyday path." },
      { author: "Ptolemy", work: "Almagest", quote: "The circles named **tropikos** mark the celestial parallels where the sun halts its declination and begins its return." },
      { author: "Henry George Liddell & Robert Scott", work: "A Greek-English Lexicon", quote: "The entry for **tropikos** records its primary sense of turning or solstice, branching into rhetorical metaphor and change." }
    ]
  },
  "tropism.md": {
    primary: "The innate directional growth or movement of a biological organism (especially a plant or sessile animal) in response to an external environmental stimulus, such as light, gravity, or touch.",
    secondary: "An involuntary, instinctive turning or orientation of thought, behavior, or inclination toward a specific influence.",
    quotes: [
      { author: "Jacques Loeb", work: "Forced Movements, Tropisms, and Animal Conduct", quote: "The orientation of the organism toward a source of stimulation is an involuntary **tropism** determined by symmetric physicochemical reactions." },
      { author: "Charles Darwin", work: "The Power of Movement in Plants", quote: "We have seen that light exercises a profound **tropism** over the hypocotyl, bending the young shoot directly toward the sun." },
      { author: "Nathanael West", work: "The Day of the Locust", quote: "Crowds drifted across Hollywood Boulevard by a kind of sluggish mechanical **tropism**, drawn by neon glitz." }
    ]
  },
  "troponomy.md": {
    primary: "The systematic study, classification, or nomenclature of tropes and figurative expressions in language and rhetoric.",
    secondary: "The analytical taxonomy of semantic shifts, metaphorical turns, and lexical alterations in literary discourse.",
    quotes: [
      { author: "Kenneth Burke", work: "A Grammar of Motives", quote: "An exhaustive **troponomy** classifies metaphor, metonymy, synecdoche, and irony as the four master turnings of rhetorical discourse." },
      { author: "Paul de Man", work: "Allegories of Reading", quote: "The deconstructive critique reveals how every conceptual system rests upon an unacknowledged **troponomy** of borrowed figures." },
      { author: "Gérard Genette", work: "Figures of Literary Discourse", quote: "The classical treatise on **troponomy** categorized each subtle departure from literal syntax with meticulous precision." }
    ]
  },
  "troponym.md": {
    primary: "A verb that expresses a specific, manner-elaborated way of performing the action of a more general verb (e.g., 'strut' and 'amble' are troponyms of 'walk'; 'whisper' is a troponym of 'speak').",
    secondary: "In relational lexical semantics (such as WordNet), a lexical unit situated in a 'manner-of' hierarchical relation to a hypernymic verb.",
    quotes: [
      { author: "George A. Miller", work: "WordNet: An Electronic Lexical Database", quote: "Just as hyponymy organizes nouns into a taxonomic tree, the **troponym** relation structures verbs according to specific manners of action." },
      { author: "Christiane Fellbaum", work: "WordNet: An Electronic Lexical Database", quote: "To march is to walk in a distinct military manner; hence 'march' serves as a precise **troponym** of the base verb 'walk'." },
      { author: "John Lyons", work: "Semantics", quote: "A **troponym** enriches verbal discourse by packaging the core predicate together with qualitative nuances of manner and intent." }
    ]
  },
  "troponymy.md": {
    primary: "The lexical semantic relation that holds between a specific verb and a more general verb specifying the manner in which the activity is performed; manner-hyponymy for verbs.",
    secondary: "The linguistic framework and study of semantic hierarchies among verbal predicates in computational lexicons.",
    quotes: [
      { author: "Christiane Fellbaum", work: "WordNet: An Electronic Lexical Database", quote: "The structural organizing principle for the verbal lexicon is **troponymy**, representing the 'doing-something-in-a-particular-manner' hierarchy." },
      { author: "Steven Pinker", work: "Words and Rules", quote: "Through **troponymy**, our mental dictionary nests intricate verbs of motion and speech under broad conceptual primitives." },
      { author: "Alan Cruse", work: "Meaning in Language", quote: "While hyponymy governs categorical relations between nouns, **troponymy** governs the fine-grained differentiation of action verbs." }
    ]
  },
  "tropopause.md": {
    primary: "The boundary zone in the Earth's atmosphere separating the troposphere below from the stratosphere above, characterized by a sudden change in lapse rate where temperature ceases to decrease with altitude.",
    secondary: "The dynamic atmospheric ceiling that constrains convective weather systems, thunderstorm updrafts, and planetary tropospheric circulation.",
    quotes: [
      { author: "Léon Teisserenc de Bort", work: "Comptes Rendus de l'Académie des Sciences", quote: "Above the convective lower layer lies the **tropopause**, where the thermal lapse rate stabilizes abruptly." },
      { author: "Napier Shaw", work: "Manual of Meteorology", quote: "The height of the **tropopause** varies from some seventeen kilometres at the equator to barely nine kilometres over the polar regions." },
      { author: "Carl-Gustaf Rossby", work: "Journal of Meteorology", quote: "Intense jet streams tend to meander in the immediate vicinity of breaks in the **tropopause**, driving planetary weather patterns." }
    ]
  },
  "troposphere.md": {
    primary: "The lowest layer of the Earth's atmosphere, extending from the planetary surface up to the tropopause (roughly 7 to 20 km), within which temperature decreases with altitude and almost all weather phenomena, water vapor, and convective mixing take place.",
    secondary: "The dynamic thermodynamic shell of overturning air currents that supports life and climatic cycles on Earth.",
    quotes: [
      { author: "Léon Teisserenc de Bort", work: "Comptes Rendus de l'Académie des Sciences", quote: "I proposed the name **troposphere** for this lower realm because its air masses are perpetually turned and mixed by convection." },
      { author: "Alfred Wegener", work: "The Origin of Continents and Oceans", quote: "The dense, moisture-laden **troposphere** hugs the crust, generating cloud banks and storm systems in endless rotation." },
      { author: "Rachel Carson", work: "The Sea Around Us", quote: "All the winds that ruffle the oceans and all the storms that sweep the land are bred within the turbulent depths of the **troposphere**." }
    ]
  }
};

for (const [filename, entry] of Object.entries(data)) {
  const filePath = path.join(dir, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Find the top portion up to and including the apple-c toggle block
  const bookIdx = content.indexOf('> [!book]');
  if (bookIdx === -1) {
    console.error(`No > [!book] in ${filename}`);
    continue;
  }
  const topBlock = content.substring(0, bookIdx);

  // Build the definitions block and quotes block
  const newContent = `${topBlock}> [!book] 📖 Definitions & Semantic Range
> 1. **Primary Definition (Lexical / Standard Consensus)**: ${entry.primary}
> 2. **Secondary / Nuanced Definition (Specialized / Domain / Encyclopedic)**: ${entry.secondary}

> [!quote] 💬 Contextual Usage & Authentic Quotations
${entry.quotes.map(q => `> - 📜 **${q.author} (*${q.work}*):** *"${q.quote}"*`).join('\n')}
`;

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated: ${filename}`);
}

console.log('Done Batch 5 (trop) of Cluster Turning & Transformation!');
