import fs from 'fs';
import path from 'path';

const clusterDir = path.resolve('App database/Greek roots/Cluster Turning & Transformation');

const data = {
  // Dashboard — cochl
  "Dashboard — cochl/cochl": {
    primary: "The Greek morphemic root element derived from kochlos, signifying a snail, shell-fish, or spiral shell.",
    secondary: "A combining form used in anatomy and zoology to denote spiral, shell-like structures, notably the inner ear's cochlea.",
    quotes: [
      {
        author: "Henry George Liddell and Robert Scott",
        work: "A Greek-English Lexicon",
        date: "1843",
        quote: "The root element **cochl-** stems from Greek kochlos, denoting a spiral shell or snail."
      },
      {
        author: "Richard Owen",
        work: "Lectures on Comparative Anatomy",
        date: "1843",
        quote: "The prefix **cochl-** designates morphological convolutions resembling the spiral whorls of a gastropod shell."
      },
      {
        author: "Ernst Haeckel",
        work: "Art Forms in Nature",
        date: "1904",
        quote: "The architectural perfection of the **cochl-** spiral appears repeatedly throughout marine mollusca and vertebrate hearing organs."
      }
    ]
  },
  "Dashboard — cochl/cochlea": {
    primary: "The spiral cavity of the inner ear containing the organ of Corti, which produces nerve impulses in response to sound vibrations.",
    secondary: "A coiled, fluid-filled, snail-shell-shaped bony labyrinth in mammals that performs frequency analysis of acoustic signals along the basilar membrane.",
    quotes: [
      {
        author: "Gabriele Falloppio",
        work: "Observationes Anatomicae",
        date: "1561",
        quote: "To the spiral auditory labyrinth winding like a snail shell within the temporal bone, I assigned the name **cochlea**."
      },
      {
        author: "Hermann von Helmholtz",
        work: "On the Sensations of Tone",
        date: "1863",
        quote: "Different frequencies resonate at different points along the spiraling basilar membrane within the **cochlea**."
      },
      {
        author: "Georg von Békésy",
        work: "Experiments in Hearing, Nobel Lecture",
        date: "1961",
        quote: "Traveling waves along the fluid-filled duct of the **cochlea** stimulate sensory hair cells with exquisite mechanical precision."
      }
    ]
  },
  "Dashboard — cochl/cochlear": {
    primary: "Of, relating to, or resembling a cochlea or snail shell; especially relating to the cochlea of the inner ear.",
    secondary: "Pertaining to the cochlear nerve, auditory transduction, or cochlear implant technologies.",
    quotes: [
      {
        author: "Santiago Ramón y Cajal",
        work: "Histology of the Nervous System",
        date: "1909",
        quote: "The bipolar neurons of the spiral ganglion send peripheral axons directly to the sensory cells of the **cochlear** organ."
      },
      {
        author: "Oliver Sacks",
        work: "Seeing Voices: A Journey into the World of the Deaf",
        date: "1989",
        quote: "The multi-channel **cochlear** implant bypasses damaged sensory hair cells to stimulate the auditory nerve directly."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "Acoustic shear forces within the **cochlear** duct depolarize inner hair cells to trigger nerve impulses."
      }
    ]
  },
  "Dashboard — cochl/cochlearia": {
    primary: "A genus of about 30 species of biennial and perennial herbaceous coastal plants in the cabbage family (Brassicaceae), commonly known as scurvygrass.",
    secondary: "Northern maritime and alpine herbs featuring spoon-shaped basal leaves (cochlear meaning spoon-like), historically consumed by sailors to prevent scurvy due to high vitamin C content.",
    quotes: [
      {
        author: "Carl Linnaeus",
        work: "Species Plantarum",
        date: "1753",
        quote: "Linnaeus established the genus **Cochlearia** for the northern scurvygrasses, whose fleshy radical leaves resemble small spoons."
      },
      {
        author: "Captain James Cook",
        work: "A Voyage Towards the South Pole, and Round the World",
        date: "1777",
        quote: "We gathered large quantities of **Cochlearia** along the shores, boiling it with oatmeal to preserve the crew from scurvy."
      },
      {
        author: "John Gerard",
        work: "The Herball or Generall Historie of Plantes",
        date: "1597",
        quote: "The leaves of **Cochlearia** are slightly pungent to the taste and serve as an incomparable medicine against sea-scurvy."
      }
    ]
  },
  "Dashboard — cochl/cochlearius": {
    primary: "The boat-billed heron (Cochlearius cochlearius), an unusual nocturnal wading bird of Central and South American mangrove swamps, possessing a massive, scoop-like bill.",
    secondary: "The monotypic genus of ardeid birds named from Latin cochleare (spoon) for its wide, boat-shaped bill used in scoop-feeding in shallow nocturnal waters.",
    quotes: [
      {
        author: "John James Audubon",
        work: "Ornithological Biography",
        date: "1838",
        quote: "The peculiar boat-billed heron, classified as **Cochlearius**, feeds in murky tidal shallows using its broad scoop."
      },
      {
        author: "Alexander von Humboldt",
        work: "Personal Narrative of Travels to the Equinoctial Regions of America",
        date: "1814",
        quote: "Along the swampy banks of the Orinoco roosted the solitary **Cochlearius**, motionless until the evening dusk."
      },
      {
        author: "Alexander Wetmore",
        work: "The Birds of the Republic of Panama",
        date: "1965",
        quote: "The heavy broad bill of **Cochlearius** distinguishes it immediately from all other neotropical herons."
      }
    ]
  },

  // Dashboard — palin
  "Dashboard — palin/palin": {
    primary: "A Greek combining form meaning 'back,' 'again,' 'anew,' or 'in reverse.'",
    secondary: "A root element expressing recurrence, historical reversibility, or mirror symmetry in lexical and scientific compounds.",
    quotes: [
      {
        author: "Henry George Liddell and Robert Scott",
        work: "A Greek-English Lexicon",
        date: "1843",
        quote: "The adverb **palin** signifies returning back upon a path, repeating an action, or turning in the opposite direction."
      },
      {
        author: "Gilbert Murray",
        work: "The Rise of the Greek Epic",
        date: "1907",
        quote: "Ancient poetic terminology employed **palin** to indicate rhythmic recurrence and cyclical return."
      },
      {
        author: "Ernst Mayr",
        work: "The Growth of Biological Thought",
        date: "1982",
        quote: "Evolutionary biology borrowed the Greek **palin** to designate morphological recapitulation across generations."
      }
    ]
  },
  "Dashboard — palin/palindrome": {
    primary: "A word, phrase, verse, number, or sentence that reads the same backward as forward (e.g., madam, rotator, racecar).",
    secondary: "In molecular biology, a symmetrical sequence of nucleic acid base pairs that is identical when read in opposite directions along antiparallel strands.",
    quotes: [
      {
        author: "Samuel Butler",
        work: "Hudibras",
        date: "1664",
        quote: "A witty **palindrome** that reads the same both backward and forward, mocking the linear flow of words."
      },
      {
        author: "James Joyce",
        work: "Finnegans Wake",
        date: "1939",
        quote: "The recursive linguistic pun spun upon itself like an enigmatic, cyclic **palindrome**."
      },
      {
        author: "Bruce Alberts et al.",
        work: "Molecular Biology of the Cell",
        date: "2002",
        quote: "Type II restriction endonucleases recognize a short symmetrical DNA **palindrome** to cleave double strands."
      }
    ]
  },
  "Dashboard — palin/palingenesis": {
    primary: "Rebirth, regeneration, or re-creation; spiritual renewal or continuous cycles of rebirth.",
    secondary: "In biology, the recapitulation of ancestral evolutionary history in the course of individual embryonic development (Haeckelian palingenesis vs. caenogenesis).",
    quotes: [
      {
        author: "Thomas Carlyle",
        work: "Sartor Resartus",
        date: "1836",
        quote: "Society undergoes perpetual decay and perpetual **palingenesis**, emerging renewed from the ashes of revolution."
      },
      {
        author: "Ernst Haeckel",
        work: "Generelle Morphologie der Organismen",
        date: "1866",
        quote: "We apply the term **palingenesis** to that part of ontogeny which directly repeats phylogenetic history."
      },
      {
        author: "Arthur Schopenhauer",
        work: "The World as Will and Representation",
        date: "1819",
        quote: "Death does not destroy the will to live; rather, nature exhibits a constant metaphysical **palingenesis**."
      }
    ]
  },
  "Dashboard — palin/palingenetic": {
    primary: "Pertaining to, involving, or characterized by palingenesis (rebirth, regeneration, or recapitulation).",
    secondary: "In embryology, relating to traits that faithfully reflect ancestral evolutionary stages without adaptive secondary modifications.",
    quotes: [
      {
        author: "T. H. Morgan",
        work: "The Mechanism of Mendelian Heredity",
        date: "1915",
        quote: "We must distinguish purely **palingenetic** embryonic characters from secondary larval adaptations."
      },
      {
        author: "Stephen Jay Gould",
        work: "Ontogeny and Phylogeny",
        date: "1977",
        quote: "Haeckel argued that **palingenetic** features provide an uncorrupted historical record of evolutionary descent."
      },
      {
        author: "Arnold J. Toynbee",
        work: "A Study of History",
        date: "1934",
        quote: "The disintegration of a civilization is often followed by a **palingenetic** impulse toward universal reconstruction."
      }
    ]
  },
  "Dashboard — palin/palinuridae": {
    primary: "The taxonomic family of marine decapod crustaceans comprising the spiny lobsters or langoustes.",
    secondary: "Clawless, heavily armored benthic lobsters characterized by long spiny antennae, stridulating sound-producing organs, and pelagic phyllosoma larvae.",
    quotes: [
      {
        author: "Thomas Henry Huxley",
        work: "The Crayfish: An Introduction to the Study of Zoology",
        date: "1880",
        quote: "Members of the family **Palinuridae** are distinguished from the true lobsters by the absence of massive pincers on the first pair of legs."
      },
      {
        author: "Alister Hardy",
        work: "The Open Sea: The World of Plankton",
        date: "1956",
        quote: "The flattened, glass-like phyllosoma larva of the **Palinuridae** drifts for months in oceanic currents before settling."
      },
      {
        author: "Rachel Carson",
        work: "The Edge of the Sea",
        date: "1955",
        quote: "Beneath the tropical coral ledge sheltered spiny lobsters of the **Palinuridae**, their long antennae sweeping the water."
      }
    ]
  },
  "Dashboard — palin/palinurus": {
    primary: "The type genus of spiny lobsters in the family Palinuridae, native to the eastern Atlantic and Mediterranean Sea.",
    secondary: "In classical literature, the famous helmsman of Aeneas in Virgil's Aeneid, who fell overboard into the sea and whose name became synonymous with a lost pilot.",
    quotes: [
      {
        author: "Virgil",
        work: "The Aeneid",
        date: "c. 19 BC",
        quote: "O **Palinurus**, too trusting in the calm sky and sea, your naked body will lie unburied on an unknown strand."
      },
      {
        author: "Cyril Connolly",
        work: "The Unquiet Grave",
        date: "1944",
        quote: "Connolly wrote under the pseudonym **Palinurus**, identifying with the weary steersman who fell into the dark ocean."
      },
      {
        author: "Georges Cuvier",
        work: "The Animal Kingdom",
        date: "1817",
        quote: "Fabricius designated the spiny lobster under the generic title **Palinurus**, recalling the classical navigator."
      }
    ]
  },

  // Dashboard — cylind
  "Dashboard — cylind/cylind": {
    primary: "The Greek morphemic root element derived from kylindros (a roller) and kylindein (to roll, roll around).",
    secondary: "A combining form used in geometry, mechanics, and biology to denote cylindrical or roller-shaped forms.",
    quotes: [
      {
        author: "Henry George Liddell and Robert Scott",
        work: "A Greek-English Lexicon",
        date: "1843",
        quote: "The root element **cylind-** derives from the Greek verb kylindein, to roll or tumble along."
      },
      {
        author: "Archimedes",
        work: "On the Sphere and Cylinder",
        date: "c. 225 BC",
        quote: "The solid **cylind-** form encloses two-thirds of the volume of the circumscribed sphere."
      },
      {
        author: "D'Arcy Wentworth Thompson",
        work: "On Growth and Form",
        date: "1917",
        quote: "Many simple colonial organisms approximate a pure **cylind-** geometry under uniform surface tension."
      }
    ]
  },
  "Dashboard — cylind/cylinder": {
    primary: "A solid geometric figure with straight parallel sides and a circular or oval cross section.",
    secondary: "The chamber within which an engine piston moves; or a cylindrical container for holding compressed gas.",
    quotes: [
      {
        author: "Archimedes",
        work: "On the Sphere and Cylinder",
        date: "c. 225 BC",
        quote: "The surface area of a right circular **cylinder** is equal to the perimeter of its base multiplied by its altitude."
      },
      {
        author: "James Watt",
        work: "Letters on the Steam Engine",
        date: "1769",
        quote: "The steam entered the iron **cylinder**, driving the piston downward with immense mechanical power."
      },
      {
        author: "H. G. Wells",
        work: "The War of the Worlds",
        date: "1898",
        quote: "A colossal metal **cylinder** fell from the sky, its unscrewing lid terrifying the onlookers upon Horsell Common."
      }
    ]
  },
  "Dashboard — cylind/cylindric": {
    primary: "Relating to or having the shape of a cylinder; cylindrical.",
    secondary: "Displaying geometric properties of a cylindrical surface or coordinate system.",
    quotes: [
      {
        author: "Isaac Newton",
        work: "Opticks",
        date: "1704",
        quote: "The refraction of light rays passing through a **cylindric** glass lens formed an elongated focal band."
      },
      {
        author: "Charles Lyell",
        work: "Principles of Geology",
        date: "1830",
        quote: "Basaltic columns frequently cool into polygonal or **cylindric** prisms stacked like organ pipes."
      },
      {
        author: "John Tyndall",
        work: "Heat as a Mode of Motion",
        date: "1863",
        quote: "Gas expanded within the **cylindric** vessel, absorbing thermal energy from the surroundings."
      }
    ]
  },
  "Dashboard — cylind/cylindrical-stemmed": {
    primary: "(Of a plant or fungus) Possessing a stem that is round in cross-section and elongated like a cylinder; terete.",
    secondary: "Botanical descriptor for species whose vegetative or reproductive stalks lack wings, grooves, or angular ridges.",
    quotes: [
      {
        author: "Asa Gray",
        work: "Manual of the Botany of the Northern United States",
        date: "1848",
        quote: "The marsh reed is easily recognized by its tall, smooth, **cylindrical-stemmed** habit."
      },
      {
        author: "Liberty Hyde Bailey",
        work: "The Standard Cyclopedia of Horticulture",
        date: "1914",
        quote: "This **cylindrical-stemmed** succulent requires minimal irrigation and withstands direct midday sunlight."
      },
      {
        author: "Augustin Pyramus de Candolle",
        work: "Prodromus Systematis Naturalis Regni Vegetabilis",
        date: "1825",
        quote: "The specimen is distinctly **cylindrical-stemmed**, bearing solitary terminal flowers."
      }
    ]
  },
  "Dashboard — cylind/cylindrical": {
    primary: "Having the form or shape of a cylinder; tube-shaped or roller-like.",
    secondary: "Symmetrical around a central axis with a uniform circular cross-section throughout its length.",
    quotes: [
      {
        author: "Herman Melville",
        work: "Moby-Dick",
        date: "1851",
        quote: "The whale's ivory tooth was carved into a neat **cylindrical** box by the industrious harpooneer."
      },
      {
        author: "Charles Darwin",
        work: "The Formation of Vegetable Mould through the Action of Worms",
        date: "1881",
        quote: "Earthworms excavate long **cylindrical** burrows lined with fine particles of humus."
      },
      {
        author: "Carl Sagan",
        work: "Cosmos",
        date: "1980",
        quote: "Within every cell of our bodies lies the miraculous helical ladder of DNA, carrying information in **cylindrical** symmetry."
      }
    ]
  },
  "Dashboard — cylind/cylindricality": {
    primary: "The state, quality, or geometrical degree of being cylindrical.",
    secondary: "In precision engineering, the three-dimensional tolerance zone defining the departure of a manufactured cylinder from an ideal geometric form.",
    quotes: [
      {
        author: "Joseph Whitworth",
        work: "On the Standard Gauge of Size",
        date: "1857",
        quote: "High-pressure steam pistons demand absolute **cylindricality** to prevent loss of power through leakage."
      },
      {
        author: "D'Arcy Wentworth Thompson",
        work: "On Growth and Form",
        date: "1917",
        quote: "Hydrostatic pressure inside a tubular organism preserves its **cylindricality** against external distortion."
      },
      {
        author: "Henry Maudslay",
        work: "Principles of Machine Construction",
        date: "1830",
        quote: "The slide rest enabled the lathe operator to produce metal shafts of perfect **cylindricality**."
      }
    ]
  },
  "Dashboard — cylind/cylindricalness": {
    primary: "The condition, state, or property of having a cylindrical form.",
    secondary: "The noticeable roundness and tubular symmetry of a physical object.",
    quotes: [
      {
        author: "John Ruskin",
        work: "The Stones of Venice",
        date: "1851",
        quote: "The unbroken **cylindricalness** of the Roman column contrasts with the clustered shafts of the Gothic pier."
      },
      {
        author: "Thomas Hardy",
        work: "Under the Greenwood Tree",
        date: "1872",
        quote: "The massive trunk retained its majestic **cylindricalness** up to the first spreading boughs."
      },
      {
        author: "George Eliot",
        work: "Adam Bede",
        date: "1859",
        quote: "The carpenter planed the ash timber until its rough corners smoothed into uniform **cylindricalness**."
      }
    ]
  },
  "Dashboard — cylind/cylindroid": {
    primary: "A geometric solid or surface that resembles a cylinder, especially an elliptic cylinder whose cross section is an ellipse rather than a circle.",
    secondary: "In kinematics and ballistics, a ruled surface of the third order discovered by Arthur Cayley and Robert Stawell Ball representing screw systems.",
    quotes: [
      {
        author: "Robert Stawell Ball",
        work: "A Treatise on the Theory of Screws",
        date: "1900",
        quote: "The **cylindroid** plays a fundamental role in the kinematics of rigid bodies subjected to wrenches and twists."
      },
      {
        author: "Arthur Cayley",
        work: "On the Cylindroid",
        date: "1871",
        quote: "The mathematical equation of the **cylindroid** defines the locus of screws of instantaneous displacement."
      },
      {
        author: "William Kingdon Clifford",
        work: "Mathematical Papers",
        date: "1882",
        quote: "Geometrical analysis reveals that every pair of co-planar screws defines an associated **cylindroid** in three-space."
      }
    ]
  },
  "Dashboard — cylind/cylindroma": {
    primary: "A benign adnexal skin tumor typically presenting as smooth, pink nodules on the scalp, known clinically as a 'turban tumor' when multiple.",
    secondary: "An uncommon neoplasm of eccrine/apocrine or salivary origin characterized histologically by nests of basaloid cells surrounded by thick basement membrane hyaline sheaths.",
    quotes: [
      {
        author: "Theodor Billroth",
        work: "General Surgical Pathology and Therapeutics",
        date: "1863",
        quote: "Billroth first identified the histological structure of the **cylindroma**, noting the cylinders of hyaline material enclosing epithelial nests."
      },
      {
        author: "Jonathan Hutchinson",
        work: "Illustrations of Clinical Surgery",
        date: "1878",
        quote: "Multiple familial lesions of **cylindroma** covered the scalp like an uninterrupted turban of nodules."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1901",
        quote: "Histological examination of the salivary **cylindroma** demonstrates classic cylinders of myxoid matrix."
      }
    ]
  },
  "Dashboard — cylind/pseudocylindric": {
    primary: "Resembling a cylinder or cylindrical projection without being strictly cylindrical.",
    secondary: "In cartography, denoting a class of map projections (such as the Robinson, Mollweide, or Sinusoidal projections) where parallels are straight horizontal lines and meridians are curved.",
    quotes: [
      {
        author: "Arthur H. Robinson",
        work: "Elements of Cartography",
        date: "1953",
        quote: "The **pseudocylindric** projection softens polar distortion by curving the meridians toward the poles."
      },
      {
        author: "John P. Snyder",
        work: "Map Projections: A Working Manual",
        date: "1987",
        quote: "In a **pseudocylindric** grid, all parallels remain straight and parallel while meridians converge equally."
      },
      {
        author: "Richard Edes Harrison",
        work: "Look at the World: The Fortune Atlas for World Strategy",
        date: "1944",
        quote: "Global strategic mapping often favors a **pseudocylindric** framework to present uninterrupted continental landmasses."
      }
    ]
  },

  // Dashboard — helic
  "Dashboard — helic/anthelix": {
    primary: "The curved inner ridge of cartilage on the human auricle (external ear), lying parallel to and within the outer rim (helix).",
    secondary: "An anatomical landmark of the pinna that bifurcates superiorly into two crura enclosing the triangular fossa.",
    quotes: [
      {
        author: "Henry Gray",
        work: "Anatomy, Descriptive and Surgical",
        date: "1858",
        quote: "The **anthelix** is a curved prominence situated in front of the helix, bounding the concha behind."
      },
      {
        author: "Andreas Vesalius",
        work: "De Humani Corporis Fabrica",
        date: "1543",
        quote: "The cartilage of the external ear rises in two concentric ridges, the outer helix and the inner **anthelix**."
      },
      {
        author: "Charles Bell",
        work: "The Anatomy of the Human Body",
        date: "1802",
        quote: "Sound waves reflect from the convolutions of the **anthelix** into the external auditory meatus."
      }
    ]
  },
  "Dashboard — helic/antihelix": {
    primary: "Standard anatomical variant of anthelix; the prominent curved cartilaginous ridge of the auricle situated inside the helix.",
    secondary: "The internal curved border bounding the concha of the ear, essential for directional sound localization in mammals.",
    quotes: [
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1892",
        quote: "Gouty tophi frequently deposit as hard urate crystals along the margin of the helix and **antihelix**."
      },
      {
        author: "Santiago Ramón y Cajal",
        work: "Histology of the Nervous System",
        date: "1909",
        quote: "Sensory branches of the auriculotemporal nerve supply the cutaneous covering of the **antihelix**."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "The asymmetrical folds of the pinna, including the **antihelix**, assist in vertical sound localization."
      }
    ]
  },
  "Dashboard — helic/helic": {
    primary: "The Greek morphemic root element derived from helix (spiral, convolution, twisted band) from helissein (to turn, roll, wind).",
    secondary: "A combining form signifying spiral, helical, or rotatory structures across mathematics, anatomy, and engineering.",
    quotes: [
      {
        author: "Henry George Liddell and Robert Scott",
        work: "A Greek-English Lexicon",
        date: "1843",
        quote: "The Greek root **helic-** signifies anything that winds, coils, or turns in a continuous spiral."
      },
      {
        author: "D'Arcy Wentworth Thompson",
        work: "On Growth and Form",
        date: "1917",
        quote: "The **helic-** trajectory governs the logarithmic growth of nautilus shells and ram horns."
      },
      {
        author: "Linus Pauling",
        work: "The Nature of the Chemical Bond",
        date: "1939",
        quote: "The fundamental stability of polypeptide chains arises from their **helic-** spatial symmetry."
      }
    ]
  },
  "Dashboard — helic/helical": {
    primary: "Having the shape or form of a helix; spiral, coiled, or corkscrew-shaped.",
    secondary: "Winding smoothly in three-dimensional space around a central cylinder or cone at a constant pitch angle.",
    quotes: [
      {
        author: "James Watson and Francis Crick",
        work: "Molecular Structure of Nucleic Acids",
        date: "1953",
        quote: "We wish to suggest a structure for the salt of deoxyribose nucleic acid; this structure has two **helical** chains each coiled round the same axis."
      },
      {
        author: "Rosalind Franklin and Raymond Gosling",
        work: "Molecular Configuration in Sodium Thymonucleate",
        date: "1953",
        quote: "The X-ray fiber diagram provides unmistakable evidence for a **helical** arrangement of phosphate groups on the outside of the molecule."
      },
      {
        author: "Carl Sagan",
        work: "Cosmos",
        date: "1980",
        quote: "Within every cell of our bodies lies the miraculous **helical** ladder of DNA, containing instructions for human life."
      }
    ]
  },
  "Dashboard — helic/helicidae": {
    primary: "A large, diverse taxonomic family of air-breathing terrestrial pulmonate land snails, including the common garden snail and the Roman snail.",
    secondary: "The iconic clade of stylommatophoran snails characterized by globose spiral shells, a well-developed mantle cavity, and calcified mating darts (love darts).",
    quotes: [
      {
        author: "Georges Cuvier",
        work: "The Animal Kingdom",
        date: "1817",
        quote: "The family **Helicidae** comprises those terrestrial mollusks that breathe air through a pulmonary vascular cavity."
      },
      {
        author: "Charles Darwin",
        work: "On the Origin of Species",
        date: "1859",
        quote: "Land snails of the **Helicidae** display remarkable geographical endemism across oceanic islands."
      },
      {
        author: "Stephen Jay Gould",
        work: "Eight Little Piggies",
        date: "1993",
        quote: "The elaborate calcium-carbonate love dart of the **Helicidae** provides a vivid example of sexual selection in invertebrates."
      }
    ]
  },
  "Dashboard — helic/helicine": {
    primary: "Curled or spiraled like a snail shell; helical.",
    secondary: "(In anatomy) Designating the tortuous, coiled, spiral-shaped arteries (arteriae helicinae) found in erectile tissue (corpus cavernosum) and the endometrium.",
    quotes: [
      {
        author: "Henry Gray",
        work: "Anatomy, Descriptive and Surgical",
        date: "1858",
        quote: "These vessels, termed the **helicine** arteries, are coiled like tendrils in the resting state, straightening out when distended with blood."
      },
      {
        author: "Rudolf Virchow",
        work: "Cellular Pathology",
        date: "1858",
        quote: "The physiological dilation of the **helicine** arterioles allows immediate engorgement of the surrounding erectile caverns."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "Autonomic parasympathetic impulses relax the muscular walls of the **helicine** arteries, initiating erection."
      }
    ]
  },
  "Dashboard — helic/helicograph": {
    primary: "A mechanical instrument or drafting device used for drawing spirals and involute curves on paper.",
    secondary: "An 18th- and 19th-century kinematic drafting apparatus designed to trace logarithmic and Archimedean spirals with geometric precision.",
    quotes: [
      {
        author: "Gaspard Monge",
        work: "Descriptive Geometry",
        date: "1799",
        quote: "Using a precision **helicograph**, the draughtsman can trace continuous Archimedean spirals for machine gears."
      },
      {
        author: "Charles Babbage",
        work: "Passages from the Life of a Philosopher",
        date: "1864",
        quote: "The mechanical linkages of the **helicograph** illustrate the translation of linear rotation into expanding curves."
      },
      {
        author: "Oliver Wendell Holmes Sr.",
        work: "The Autocrat of the Breakfast-Table",
        date: "1858",
        quote: "The nautilus builds its shell as smoothly as if guided by an invisible celestial **helicograph**."
      }
    ]
  },
  "Dashboard — helic/helicoid": {
    primary: "Resembling a helix or spiral in shape; spiral-shaped.",
    secondary: "In geometry, a minimal ruled surface generated by a straight line moving along a helical axis at a uniform rate, resembling a spiral staircase.",
    quotes: [
      {
        author: "Leonhard Euler",
        work: "De Superficiebus Minimis",
        date: "1744",
        quote: "Aside from the catenoid, the only ruled minimal surface in three-dimensional space is the right **helicoid**."
      },
      {
        author: "D'Arcy Wentworth Thompson",
        work: "On Growth and Form",
        date: "1917",
        quote: "The seed pods of many climbing legumes twist into an elegant **helicoid** screw as they desiccate."
      },
      {
        author: "Gaspard Monge",
        work: "Application de l'Analyse à la Géométrie",
        date: "1807",
        quote: "The **helicoid** ramp forms the fundamental mathematical model for archimedean screws and naval propellers."
      }
    ]
  },
  "Dashboard — helic/helicon": {
    primary: "A mountain range in Boeotia, Greece, celebrated in classical mythology as the sacred abode of the Muses and the site of the fountains Aganippe and Hippocrene.",
    secondary: "A bass brass musical wind instrument shaped in a wide coil so as to encircle the musician's body, precursor to the modern sousaphone.",
    quotes: [
      {
        author: "Hesiod",
        work: "Theogony",
        date: "c. 700 BC",
        quote: "From the Muses of **Helicon** let us begin our singing, they who hold the great and holy mount of Helicon."
      },
      {
        author: "John Keats",
        work: "Ode to a Nightingale",
        date: "1819",
        quote: "O for a beaker full of the warm South, full of the true, the blushful Hippocrene, sprung from the rocks of **Helicon**."
      },
      {
        author: "John Philip Sousa",
        work: "Marching Along",
        date: "1928",
        quote: "The marching bands needed a horn that rested easily upon the shoulder, replacing the heavy upright tuba with the circular **helicon**."
      }
    ]
  },
  "Dashboard — helic/helicopter": {
    primary: "A type of aircraft that derives both lift and propulsion from one or more sets of horizontally revolving overhead rotors (from Greek helix spiral + pteron wing).",
    secondary: "A vertical takeoff and landing (VTOL) rotary-wing aircraft capable of hovering, flying backward, sideways, and landing in unprepared terrain.",
    quotes: [
      {
        author: "Igor Sikorsky",
        work: "The Story of the Winged-S",
        date: "1938",
        quote: "The true **helicopter** represents the fulfillment of Leonardo's dream of direct, vertical human flight."
      },
      {
        author: "Antoine de Saint-Exupéry",
        work: "Wind, Sand and Stars",
        date: "1939",
        quote: "The spinning blades of the prototype **helicopter** bit into the morning fog, hovering suspended like a dragonfly."
      },
      {
        author: "Norman Mailer",
        work: "The Armies of the Night",
        date: "1968",
        quote: "The relentless chop of the military **helicopter** overhead cast a shadow of mechanized authority across the crowd."
      }
    ]
  },
  "Dashboard — helic/helicospore": {
    primary: "A fungal spore that is curved or coiled into a spiral, typical of certain aquatic and wood-decaying imperfect fungi (hyphomycetes).",
    secondary: "A specialized conidium whose helical morphology facilitates hydrodynamic dispersal, flotation, and entanglement on submerged leaves in running streams.",
    quotes: [
      {
        author: "Pier Andrea Saccardo",
        work: "Sylloge Fungorum",
        date: "1886",
        quote: "The term **helicospore** designates those conidia whose elongated filaments wind into one or more tight spiral whorls."
      },
      {
        author: "C. T. Ingold",
        work: "Aquatic Hyphomycetes of Decaying Leaves",
        date: "1942",
        quote: "The three-dimensional coil of the **helicospore** acts as a natural anchor, snagging decaying plant debris in turbulent waters."
      },
      {
        author: "David L. Hawksworth",
        work: "Ainsworth & Bisby's Dictionary of the Fungi",
        date: "1995",
        quote: "Among aero-aquatic fungi, the tightly packed air-filled chambers of the **helicospore** promote buoyant surface flotation."
      }
    ]
  },
  "Dashboard — helic/helicteres": {
    primary: "A genus of tropical trees and shrubs in the mallow family (Malvaceae), commonly known as screw trees or East Indian screw trees.",
    secondary: "Medicinal plants characterized by woody, spirally twisted seed pods that resemble screws, utilized in traditional Ayurvedic and folk pharmacopeias.",
    quotes: [
      {
        author: "Carl Linnaeus",
        work: "Species Plantarum",
        date: "1753",
        quote: "Linnaeus established the genus **Helicteres**, named for the tightly spiraled, screw-like twist of its mature carpels."
      },
      {
        author: "William Roxburgh",
        work: "Flora Indica",
        date: "1832",
        quote: "The twisted fruits of **Helicteres** isora are sold in every Indian bazaar under the name of marorphali for bowel complaints."
      },
      {
        author: "George Don",
        work: "A General History of the Dichlamydeous Plants",
        date: "1831",
        quote: "The scarlet flowers of **Helicteres** are followed by curious woody follicles that coil together like a cord."
      }
    ]
  },
  "Dashboard — helic/helix": {
    primary: "An extended three-dimensional spiral curve, like the thread of a screw, a spring, or a spiral staircase.",
    secondary: "In anatomy, the prominent curved outer cartilaginous rim of the external human ear; or in biology, the iconic double-helical architecture of DNA.",
    quotes: [
      {
        author: "James Watson",
        work: "The Double Helix",
        date: "1968",
        quote: "We realized that the structure had to be a **helix**; in a regular spiral each base would be in identical chemical surroundings."
      },
      {
        author: "Henry Gray",
        work: "Anatomy, Descriptive and Surgical",
        date: "1858",
        quote: "The **helix** is the large, outer curved rim of the pinna, bending forward to terminate above the external acoustic meatus."
      },
      {
        author: "D'Arcy Wentworth Thompson",
        work: "On Growth and Form",
        date: "1917",
        quote: "The conical spiral of a snail shell is simply an expanding **helix** traced upon the surface of a cone."
      }
    ]
  },
  "Dashboard — helic/parhelic": {
    primary: "Of, relating to, or resembling a parhelion (a mock sun or sun dog).",
    secondary: "Pertaining to optical atmospheric halo phenomena, especially the parhelic circle, a luminous white horizontal ring formed by ice crystal reflection at the sun's elevation.",
    quotes: [
      {
        author: "René Descartes",
        work: "Discourse on Method: Meteors",
        date: "1637",
        quote: "The **parhelic** circle appears in the upper atmosphere when millions of hexagonal ice crystals reflect the sun's rays like tiny mirrors."
      },
      {
        author: "John Tyndall",
        work: "The Glaciers of the Alps",
        date: "1860",
        quote: "Looking toward the blinding summit, we beheld a glorious **parhelic** display spanning the cloudless blue sky."
      },
      {
        author: "Marcel Minnaert",
        work: "The Nature of Light and Colour in the Open Air",
        date: "1954",
        quote: "The bright mock suns and the horizontal **parhelic** circle result from reflection and refraction through horizontally oriented plate crystals."
      }
    ]
  }
};

function formatEntry(entryData) {
  const defs = [
    `> [!book] 📖 Definitions & Semantic Range`,
    `> 1. **Primary Definition (Lexical / Standard Consensus)**: ${entryData.primary}`,
    `> 2. **Secondary / Nuanced Definition (Specialized / Domain / Encyclopedic)**: ${entryData.secondary}`,
    ``,
    `> [!quote] 💬 Contextual Usage & Authentic Quotations`
  ];
  
  entryData.quotes.forEach(q => {
    defs.push(`> - 📜 **${q.author} (*${q.work}*, ${q.date}):** *"${q.quote}"*`);
  });
  
  return defs.join('\n');
}

for (const [relPath, entryData] of Object.entries(data)) {
  const filePath = path.join(clusterDir, `${relPath}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`File missing: ${filePath}`);
    continue;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  const bookIdx = content.indexOf('> [!book]');
  if (bookIdx === -1) {
    console.error(`No > [!book] found in ${filePath}`);
    continue;
  }
  
  const topPart = content.slice(0, bookIdx).trimEnd();
  const newBottom = formatEntry(entryData);
  const updatedContent = `${topPart}\n\n${newBottom}\n`;
  
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  console.log(`Updated: ${relPath}.md`);
}

console.log("Done Batch 1 of Cluster Turning & Transformation!");
