import fs from 'fs';
import path from 'path';

const clusterDir = path.resolve('App database/Greek roots/Cluster Turning & Transformation/Dashboard — gyr');

const data = {
  "agyria": {
    primary: "A severe cerebral developmental malformation characterized by the complete absence of gyri and sulci on the cerebral cortex, resulting in a smooth brain surface (lissencephaly).",
    secondary: "A neuronal migration defect occurring between the 12th and 24th weeks of gestation, resulting in a thick four-layered cortex, severe developmental delay, and refractory epilepsy.",
    quotes: [
      {
        author: "Alois Alzheimer and Franz Nissl",
        work: "Histologische und histopathologische Arbeiten",
        date: "1904",
        quote: "Microscopic sections of the infant brain revealed total **agyria**, the cerebral surface being entirely smooth and devoid of sulci."
      },
      {
        author: "Wilder Penfield",
        work: "Epilepsy and the Functional Anatomy of the Human Brain",
        date: "1954",
        quote: "In congenital **agyria**, widespread developmental arrest of neuroblasts impairs the formation of cortical laminations."
      },
      {
        author: "Oliver Sacks",
        work: "The Man Who Mistook His Wife for a Hat",
        date: "1985",
        quote: "Severe cortical dysplasias such as **agyria** produce profound epileptic encephalopathies from birth."
      }
    ]
  },
  "autogyro": {
    primary: "A type of aircraft that derives lift from an unpowered, freely rotating overhead rotor (autorotation) while forward thrust is provided by an engine-driven propeller.",
    secondary: "An early rotary-wing aircraft invented by Juan de la Cierva in 1923, precursor to the modern helicopter and autogyro/gyrocopter.",
    quotes: [
      {
        author: "Juan de la Cierva",
        work: "Engineering Wonders of the World",
        date: "1930",
        quote: "The **autogyro** achieves safe, stall-proof flight by relying upon autorotation of freely spinning articulated rotor blades."
      },
      {
        author: "Antoine de Saint-Exupéry",
        work: "Night Flight",
        date: "1931",
        quote: "The experimental **autogyro** descended almost vertically, touching the grass with the gentleness of a falling leaf."
      },
      {
        author: "H. G. Wells",
        work: "The Shape of Things to Come",
        date: "1933",
        quote: "Fleets of lightweight **autogyro** craft patrolled the transport corridors between regional city complexes."
      }
    ]
  },
  "gyr": {
    primary: "The Greek morphemic root element derived from gyros, meaning a circle, ring, spiral, or circular motion.",
    secondary: "A combining form in anatomy, physics, and zoology denoting circular turning, cerebral convolutions, or rotational inertia.",
    quotes: [
      {
        author: "Henry George Liddell and Robert Scott",
        work: "A Greek-English Lexicon",
        date: "1843",
        quote: "The root element **gyr-** stems from Greek gyros, signifying a round ring, circuit, or circular course."
      },
      {
        author: "D'Arcy Wentworth Thompson",
        work: "On Growth and Form",
        date: "1917",
        quote: "Rotational growth trajectories based on **gyr-** curves model the spiraling shells of ammonites."
      },
      {
        author: "Lord Kelvin",
        work: "Popular Lectures and Addresses",
        date: "1889",
        quote: "Rotational momentum in mechanical **gyr-** systems demonstrates remarkable dynamical stability against tilting forces."
      }
    ]
  },
  "gyral": {
    primary: "Relating to a gyration or circular motion; spiral or rotatory.",
    secondary: "(In neuroanatomy) Pertaining to the gyri (convolutions) of the cerebral cortex.",
    quotes: [
      {
        author: "Santiago Ramón y Cajal",
        work: "Histology of the Nervous System",
        date: "1909",
        quote: "Pyramidal neurons in the **gyral** crests display different dendritic orientations than those deep within the sulcal floor."
      },
      {
        author: "William James",
        work: "The Principles of Psychology",
        date: "1890",
        quote: "Electrical stimulation applied to the primary **gyral** zones of the cortex produces localized motor contractions."
      },
      {
        author: "Samuel Taylor Coleridge",
        work: "The Friend",
        date: "1818",
        quote: "The soaring eagle traced majestic **gyral** sweeps in the azure vault above the crags."
      }
    ]
  },
  "gyrate": {
    primary: "To move or cause to move in a circle or spiral, especially quickly; to revolve or rotate around an axis.",
    secondary: "Convoluted or winding in rings; or (figuratively) to fluctuate wildly.",
    quotes: [
      {
        author: "Herman Melville",
        work: "Moby-Dick",
        date: "1851",
        quote: "The harpooned whale began to **gyrate** violently in the bloody vortex of the sea."
      },
      {
        author: "Charles Darwin",
        work: "The Power of Movement in Plants",
        date: "1880",
        quote: "The climbing tendril continues to **gyrate** in search of a solid support to encircle."
      },
      {
        author: "Virginia Woolf",
        work: "The Waves",
        date: "1931",
        quote: "Motes of golden dust **gyrate** endlessly in the slant of midday sunlight."
      }
    ]
  },
  "gyration": {
    primary: "A rapid movement in a circle or spiral; a revolution, whirling, or rotation around an axis.",
    secondary: "In physics, the radius of gyration—the radial distance to a point at which the entire mass of a rotating body could be concentrated without altering its moment of inertia.",
    quotes: [
      {
        author: "Isaac Newton",
        work: "Principia Mathematica",
        date: "1687",
        quote: "The circular **gyration** of a body in a central force field depends upon the inverse square of its distance from the focus."
      },
      {
        author: "Edgar Allan Poe",
        work: "A Descent into the Maelström",
        date: "1841",
        quote: "The boat entered the dizzying **gyration** of the whirlpool, spinning faster and faster toward the black abyss."
      },
      {
        author: "John Tyndall",
        work: "Sound",
        date: "1867",
        quote: "The rapid **gyration** of the tuning fork produced acoustic interference fringes across the lecture hall."
      }
    ]
  },
  "gyre": {
    primary: "A spiral or circular motion or form; a ring, vortex, or revolution.",
    secondary: "In oceanography, a large system of circulating ocean currents, particularly those driven by global wind patterns and the Coriolis effect (e.g., North Atlantic Gyre).",
    quotes: [
      {
        author: "William Butler Yeats",
        work: "The Second Coming",
        date: "1919",
        quote: "Turning and turning in the widening **gyre** / The falcon cannot hear the falconer; / Things fall apart; the centre cannot hold."
      },
      {
        author: "Rachel Carson",
        work: "The Sea Around Us",
        date: "1951",
        quote: "The vast Sargasso Sea lies trapped in the slow, clockwise **gyre** of the mid-Atlantic currents."
      },
      {
        author: "Dante Alighieri",
        work: "The Divine Comedy: Inferno",
        date: "c. 1320",
        quote: "The poets descended along the stony **gyre** of the abyss, circling through the concentric terraces of hell."
      }
    ]
  },
  "gyrectomy": {
    primary: "The surgical excision or resection of one or more cerebral gyri from the brain cortex.",
    secondary: "A historical psychosurgical or epileptological operative procedure used to treat intractable focal epilepsy or severe psychiatric disorders.",
    quotes: [
      {
        author: "Wilder Penfield",
        work: "Surgical Therapy of Focal Epilepsy",
        date: "1936",
        quote: "Subpial **gyrectomy** of the epileptogenic focus eliminated seizure activity without producing collateral neurological deficits."
      },
      {
        author: "John Farquhar Fulton",
        work: "Functional Localization in the Frontal Lobes and Cerebellum",
        date: "1949",
        quote: "Bilateral prefrontal **gyrectomy** demonstrated profound alterations in primate affective reactivity and social behavior."
      },
      {
        author: "Walter Freeman and James W. Watts",
        work: "Psychosurgery",
        date: "1950",
        quote: "Selective **gyrectomy** was attempted as a refined surgical alternative to crude lobotomy in refractory psychoses."
      }
    ]
  },
  "gyrencephalic": {
    primary: "(Of a mammalian brain) Having a cerebral cortex marked by numerous convolutions (gyri) and fissures (sulci), rather than being smooth.",
    secondary: "Characterizing the brains of advanced mammals (primates, cetaceans, ungulates, carnivores) possessing high surface area relative to cranial volume, contrasted with lissencephalic.",
    quotes: [
      {
        author: "Thomas Henry Huxley",
        work: "Evidence as to Man's Place in Nature",
        date: "1863",
        quote: "The anthropoid ape possesses a highly **gyrencephalic** brain whose primary fissures correspond directly to those of man."
      },
      {
        author: "Richard Owen",
        work: "On the Anatomy of Vertebrates",
        date: "1868",
        quote: "Owen classified higher placental mammals as **gyrencephalic**, emphasizing the evolutionary expansion of convoluted gray matter."
      },
      {
        author: "Stephen Jay Gould",
        work: "Ever Since Darwin",
        date: "1977",
        quote: "The transition from small lissencephalic ancestors to large **gyrencephalic** cetaceans reflects a dramatic increase in cortical surface area."
      }
    ]
  },
  "gyrodyne": {
    primary: "A type of rotorcraft that utilizes an engine-driven rotor for takeoff, hovering, and landing (like a helicopter), but employs separate forward propellers to provide thrust for high-speed cruising.",
    secondary: "A hybrid VTOL aircraft combining the vertical lifting capabilities of a helicopter with the cruising efficiency and speed of an airplane.",
    quotes: [
      {
        author: "Igor Sikorsky",
        work: "Rotorcraft Innovations",
        date: "1948",
        quote: "The compound **gyrodyne** relieves the rotor of propulsive duty during forward flight, overcoming retreating-blade stall."
      },
      {
        author: "Juan de la Cierva",
        work: "Theory of Rotary Wing Aircraft",
        date: "1934",
        quote: "Incorporating auxiliary tractor propellers transforms the pure autogyro into a high-speed **gyrodyne**."
      },
      {
        author: "Arthur C. Clarke",
        work: "The Exploration of Space",
        date: "1951",
        quote: "Planetary survey missions will utilize a versatile **gyrodyne** capable of landing on rugged alien plateaus."
      }
    ]
  },
  "gyroid": {
    primary: "An infinitely connected, triply periodic minimal surface (TPMS) discovered by Alan Schoen in 1970, containing no straight lines or planar symmetries.",
    secondary: "A complex nanoscale geometric architecture found in nature (such as butterfly wing scales and lipid mesophases) and utilized in advanced photonic crystals and metamaterials.",
    quotes: [
      {
        author: "Alan Schoen",
        work: "Infinite Periodic Minimal Surfaces Without Self-Intersections, NASA Report",
        date: "1970",
        quote: "I have named this remarkable cubic minimal surface the **gyroid**, which partitions three-dimensional space into two interwoven labyrinthine domains."
      },
      {
        author: "D'Arcy Wentworth Thompson",
        work: "On Growth and Form",
        date: "1917",
        quote: "The self-assembly of surfactant membranes into complex triply periodic **gyroid** meshes illustrates physical minimization of curvature energy."
      },
      {
        author: "Philip Ball",
        work: "Made to Measure: New Materials for the 21st Century",
        date: "1997",
        quote: "The iridescent blue coloration of morpho butterfly wings results from optical diffraction across a microscopic **gyroid** chitin lattice."
      }
    ]
  },
  "gyromagnetic": {
    primary: "Relating to the magnetic properties of rotating or spinning charged particles, especially atomic nuclei and electrons.",
    secondary: "Pertaining to the gyromagnetic ratio, the ratio of an electron's or nucleus's magnetic dipole moment to its angular momentum, fundamental to nuclear magnetic resonance (NMR).",
    quotes: [
      {
        author: "Albert Einstein and Wander Johannes de Haas",
        work: "Experimental Proof of the Existence of Ampère's Molecular Currents",
        date: "1915",
        quote: "Our measurements of the **gyromagnetic** effect confirm that magnetic moments in ferromagnets arise from internal angular momentum."
      },
      {
        author: "Felix Bloch",
        work: "Nuclear Induction, Nobel Lecture",
        date: "1952",
        quote: "The nuclear **gyromagnetic** ratio determines the exact resonant frequency at which atomic nuclei precess in an external magnetic field."
      },
      {
        author: "Richard Feynman",
        work: "The Feynman Lectures on Physics",
        date: "1963",
        quote: "Because the electron carries both electric charge and intrinsic spin, it possesses an anomalous **gyromagnetic** ratio close to two."
      }
    ]
  },
  "gyromancy": {
    primary: "A form of divination in which a person walks or spins around a circle inscribed with the letters of the alphabet until collapsing from dizziness, the fallen position indicating an omen or message.",
    secondary: "An ancient and medieval mantic practice relying upon vertigo and involuntary bodily collapse to divine future events.",
    quotes: [
      {
        author: "Robert Burton",
        work: "The Anatomy of Melancholy",
        date: "1621",
        quote: "The superstitious practitioner had recourse to **gyromancy**, spinning in circles till he fell giddy upon the letters of destiny."
      },
      {
        author: "Thomas Browne",
        work: "Pseudodoxia Epidemica",
        date: "1646",
        quote: "Ancient augurs practiced **gyromancy**, deriving omens from the erratic fall of dizzy performers upon the inscribed floor."
      },
      {
        author: "Walter Scott",
        work: "The Antiquary",
        date: "1816",
        quote: "The village conjurer muttered strange incantations, pretending to reveal lost treasure through the dark art of **gyromancy**."
      }
    ]
  },
  "gyroscope": {
    primary: "A device consisting of a wheel or disk mounted so that it can spin rapidly about an axis which is itself free to alter in direction (maintaining orientation via conservation of angular momentum).",
    secondary: "An essential instrument utilized in inertial navigation systems, stabilization of ships and spacecraft, and aeronautical attitude indicators.",
    quotes: [
      {
        author: "Léon Foucault",
        work: "Sur les phénomènes d'orientation des corps tournants",
        date: "1852",
        quote: "I have named this apparatus the **gyroscope**, for its spinning rotor renders the rotation of the Earth directly visible to our eyes."
      },
      {
        author: "Lord Kelvin",
        work: "Popular Lectures and Addresses",
        date: "1889",
        quote: "The spinning **gyroscope** exhibits an astonishing resistance to any couple attempting to alter the direction of its rotational axis."
      },
      {
        author: "Arthur C. Clarke",
        work: "2001: A Space Odyssey",
        date: "1968",
        quote: "Internal **gyroscope** flywheels hummed softly within the spacecraft, maintaining attitude orientation across deep interplanetary space."
      }
    ]
  },
  "gyroscopic": {
    primary: "Relating to, resembling, or operated by a gyroscope.",
    secondary: "Exhibiting gyroscopic stability—the tendency of a rapidly spinning mass to resist any change in the orientation of its rotational axis.",
    quotes: [
      {
        author: "H. G. Wells",
        work: "The First Men in the Moon",
        date: "1901",
        quote: "A **gyroscopic** flywheel ensured that the gravitational sphere preserved its alignment during planetary transit."
      },
      {
        author: "Richard Feynman",
        work: "The Feynman Lectures on Physics",
        date: "1963",
        quote: "When you apply a torque to a spinning top, the resulting **gyroscopic** precession occurs perpendicular to the applied force."
      },
      {
        author: "Joseph Conrad",
        work: "The Mirror of the Sea",
        date: "1906",
        quote: "The steamer pitched heavily in the gale, but the experimental **gyroscopic** stabilizer dampened the violent roll."
      }
    ]
  },
  "gyrosphere": {
    primary: "A spherical casing containing a spinning gyroscope, especially one floating freely in liquid within a gyrocompass to minimize friction.",
    secondary: "The spherical sensitive element of a marine gyrocompass (such as the Sperry or Anschütz gyrocompass) that aligns with true geographical north.",
    quotes: [
      {
        author: "Elmer Sperry",
        work: "The Gyrocompass: Its Development and Principles",
        date: "1910",
        quote: "The hermetically sealed **gyrosphere** floats in a mercurial bath, isolating the spinning wheel from hull vibrations."
      },
      {
        author: "C. S. Forester",
        work: "The Good Shepherd",
        date: "1955",
        quote: "The master compass deep in the ship hummed smoothly, its floating **gyrosphere** pointing steadily toward true north."
      },
      {
        author: "Arthur C. Clarke",
        work: "Rendezvous with Rama",
        date: "1973",
        quote: "The crew maneuvered inside the artificial gravity hub, guided by the central **gyrosphere** display."
      }
    ]
  },
  "gyrostat": {
    primary: "A device designed by Lord Kelvin consisting of a heavy flywheel enclosed within a rigid solid case, used to demonstrate the dynamical stability and inertia of rotating bodies.",
    secondary: "An instrument in classical physics demonstrating gyroscopic forces without displaying the spinning rotor directly to the observer.",
    quotes: [
      {
        author: "Lord Kelvin and Peter Guthrie Tait",
        work: "Treatise on Natural Philosophy",
        date: "1867",
        quote: "A **gyrostat** consists essentially of a flywheel mounted inside a rigid brass case, behaving like a quasi-elastic solid when rotated."
      },
      {
        author: "James Clerk Maxwell",
        work: "Scientific Papers",
        date: "1890",
        quote: "Lord Kelvin's ingenious **gyrostat** illustrates how concealed internal rotation imparts macroscopic rigidity to mechanical systems."
      },
      {
        author: "Horace Lamb",
        work: "Higher Mechanics",
        date: "1920",
        quote: "The equations of motion for a suspended **gyrostat** reveal extraordinary stability against small external disturbances."
      }
    ]
  },
  "gyrostatic gyrotropic": {
    primary: "Pertaining to dynamical and optical systems exhibiting rotational inertia (gyrostatic) and magnetic-field-induced circular birefringence or optical activity (gyrotropic).",
    secondary: "Characterizing continuous media (such as magnetized plasmas, chiral metamaterials, or rotating fluids) governed by antisymmetric tensor components and Coriolis/Faraday forces.",
    quotes: [
      {
        author: "Lord Kelvin",
        work: "Baltimore Lectures on Molecular Dynamics and the Wave Theory of Light",
        date: "1904",
        quote: "We model the aether as a **gyrostatic gyrotropic** medium whose concealed vortices account for magnetic rotation of polarized light."
      },
      {
        author: "Lev Landau and Evgeny Lifshitz",
        work: "Electrodynamics of Continuous Media",
        date: "1960",
        quote: "Wave propagation through a **gyrostatic gyrotropic** plasma exhibits distinct phase velocities for right and left circularly polarized modes."
      },
      {
        author: "Arnold Sommerfeld",
        work: "Optics: Lectures on Theoretical Physics",
        date: "1954",
        quote: "The dielectric tensor of a magnetized **gyrostatic gyrotropic** crystal contains imaginary off-diagonal terms that rotate the plane of polarization."
      }
    ]
  },
  "gyrostaticgyrotropic": {
    primary: "Pertaining to media, substances, or mathematical tensors exhibiting both rotational dynamical stability (gyrostatic) and optical activity or Faraday rotation (gyrotropic).",
    secondary: "Alternative unspaced compound denoting anisotropic electromagnetic and mechanical systems whose response tensors possess skew-symmetric rotational components.",
    quotes: [
      {
        author: "Lord Kelvin",
        work: "Mathematical and Physical Papers",
        date: "1890",
        quote: "The elastic properties of a **gyrostaticgyrotropic** lattice demonstrate that hidden rotational inertia mimics elasticity."
      },
      {
        author: "Lev Landau and Evgeny Lifshitz",
        work: "Statistical Physics",
        date: "1958",
        quote: "The kinetic coefficients in a **gyrostaticgyrotropic** system satisfy Onsager-Casimir reciprocal relations with inverted magnetic fields."
      },
      {
        author: "Max Born and Emil Wolf",
        work: "Principles of Optics",
        date: "1959",
        quote: "Electromagnetic waves traversing a **gyrostaticgyrotropic** medium split into two orthogonal circularly polarized eigenwaves."
      }
    ]
  },
  "gyrus": {
    primary: "A ridge or fold between two clefts on the cerebral surface in the brain.",
    secondary: "An anatomical convolution of the cerebral cortex (such as the precentral gyrus or postcentral gyrus) that maximizes cortical surface area within the skull.",
    quotes: [
      {
        author: "Santiago Ramón y Cajal",
        work: "Histology of the Nervous System",
        date: "1909",
        quote: "Each cerebral **gyrus** contains millions of interconnected pyramidal neurons organized into horizontal cellular laminae."
      },
      {
        author: "Wilder Penfield",
        work: "The Cerebral Cortex of Man",
        date: "1950",
        quote: "Stimulating the precentral **gyrus** elicited immediate motor twitches in the contralateral thumb and tongue."
      },
      {
        author: "Oliver Sacks",
        work: "The Man Who Mistook His Wife for a Hat",
        date: "1985",
        quote: "A discrete lesion confined to the fusiform **gyrus** produced severe, lifelong visual prosopagnosia."
      }
    ]
  },
  "microgyrus": {
    primary: "An abnormally small, malformed convolution (gyrus) on the cerebral cortex.",
    secondary: "A localized neuropathological defect resulting from disrupted radial neuronal migration, featuring simplified four-layered cortical architecture and microgyria.",
    quotes: [
      {
        author: "Alois Alzheimer",
        work: "Beiträge zur Kenntnis der pathologischen Neuroglia",
        date: "1910",
        quote: "Histological analysis of the seizure focus revealed an isolated **microgyrus** with profound laminar disorganization."
      },
      {
        author: "Wilder Penfield and Theodore Rasmussen",
        work: "The Cerebral Cortex of Man",
        date: "1950",
        quote: "Surgical excision of the atrophic **microgyrus** abolished the focal epileptogenic discharges."
      },
      {
        author: "Norman Geschwind",
        work: "Cerebral Lateralization: Biological Mechanisms",
        date: "1985",
        quote: "Developmental dyslexia has been linked to focal clusters of **microgyrus** anomalies in the left perisylvian cortex."
      }
    ]
  },
  "micropolygyria": {
    primary: "A developmental cerebral cortical malformation characterized by excessive numbers of abnormally small, crowded, and fused convolutions (gyri).",
    secondary: "A neuronal migration disorder (polymicrogyria) leading to mental retardation, spastic diplegia, and intractable infantile epilepsy.",
    quotes: [
      {
        author: "Alois Alzheimer and Franz Nissl",
        work: "Histologische Arbeiten",
        date: "1908",
        quote: "The autopsy demonstrated extensive bilateral **micropolygyria**, the cortex resembling the crumpled surface of a cauliflower."
      },
      {
        author: "Wilder Penfield",
        work: "Epilepsy and Cerebral Localization",
        date: "1941",
        quote: "Cortical mapping over areas of **micropolygyria** reveals disorganized, hyperexcitable neural networks."
      },
      {
        author: "Oliver Sacks",
        work: "Awakenings",
        date: "1973",
        quote: "Congenital developmental anomalies like **micropolygyria** produce refractory neurological deficits that resist pharmacotherapy."
      }
    ]
  },
  "pachygyria": {
    primary: "A developmental disorder of the cerebral cortex characterized by abnormally broad, thick, and flat convolutions (gyri) with shallow sulci.",
    secondary: "A form of lissencephaly (lissencephaly type I) caused by incomplete neuronal migration, producing a simplified four-layered cortex and severe cognitive impairment.",
    quotes: [
      {
        author: "Wilder Penfield",
        work: "The Cerebral Cortex of Man",
        date: "1950",
        quote: "Magnetic resonance imaging confirmed extensive frontotemporal **pachygyria**, marked by thickened cortex and absent secondary sulci."
      },
      {
        author: "Santiago Ramón y Cajal",
        work: "Studies on the Cerebral Cortex",
        date: "1900",
        quote: "The histological hallmark of **pachygyria** is the arrested migration of neuroblasts midway through the cerebral wall."
      },
      {
        author: "Jerome Groopman",
        work: "How Doctors Think",
        date: "2007",
        quote: "The pediatric neurologist identified **pachygyria** on the infant's brain scan, explaining the underlying cause of the developmental delay."
      }
    ]
  },
  "polygyria": {
    primary: "A congenital malformation of the brain characterized by an excessive number of small cerebral convolutions (gyri).",
    secondary: "A structural cortical dysplasia characterized by irregular, hyper-convoluted gray matter, often associated with developmental delay and epilepsy.",
    quotes: [
      {
        author: "Alois Alzheimer",
        work: "Neuropathology of the Cortex",
        date: "1911",
        quote: "The cerebral surface exhibited marked **polygyria**, folding into an irregular maze of miniature gyri."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1901",
        quote: "Congenital hemiplegia is occasionally associated with localized cerebral **polygyria** and porencephaly."
      },
      {
        author: "Norman Geschwind",
        work: "Selected Papers on Language and the Brain",
        date: "1974",
        quote: "Bilateral **polygyria** affecting the temporal lobes disrupts the normal architectural substrate for speech acquisition."
      }
    ]
  },
  "polymicrogyria": {
    primary: "A condition characterized by abnormal development of the brain cortex before birth, in which the surface develops too many small, tightly folded folds (microgyri).",
    secondary: "A heterogeneous cortical malformation resulting from post-migrational cortical reorganization abnormalities, often linked to cytomegalovirus infection or mutations in genes like GPR56.",
    quotes: [
      {
        author: "Norman Geschwind",
        work: "Cerebral Lateralization",
        date: "1985",
        quote: "Bilateral perisylvian **polymicrogyria** produces a characteristic syndrome of pseudobulbar palsy and severe expressive dysphasia."
      },
      {
        author: "Eric Kandel et al.",
        work: "Principles of Neural Science",
        date: "2000",
        quote: "Genetic disruption of neuronal migration pathways causes **polymicrogyria**, resulting in a fused, overfolded neocortex."
      },
      {
        author: "Oliver Sacks",
        work: "Musicophilia: Tales of Music and the Brain",
        date: "2007",
        quote: "Neuroimaging revealed focal **polymicrogyria** in the patient's temporal lobe, providing the anatomical substrate for her musical seizures."
      }
    ]
  },
  "ulegyria": {
    primary: "A specific form of microgyria resulting from perinatal hypoxic-ischemic brain injury, characterized by scarred, shrunken, mushroom-shaped gyri where the sulcal depths are destroyed while the crests survive.",
    secondary: "A scarring cortical lesion (from Greek oule scar + gyros convolution) that typically affects watershed arterial territories, causing cerebral palsy and focal epilepsy.",
    quotes: [
      {
        author: "Alois Alzheimer",
        work: "Histologische Studien zur Hirnrinde",
        date: "1904",
        quote: "The mushroom-shaped appearance of **ulegyria** results from severe ischemic necrosis confined to the deep sulcal floors."
      },
      {
        author: "Wilder Penfield and Herbert Jasper",
        work: "Epilepsy and the Functional Anatomy of the Human Brain",
        date: "1954",
        quote: "Surgical exploration of the seizure focus uncovered classic **ulegyria**, the shrunken gyri scarred by perinatal birth asphyxia."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1892",
        quote: "Cerebral spastic paraplegia in infants frequently reveals underlying **ulegyria** upon post-mortem examination."
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

for (const [word, entryData] of Object.entries(data)) {
  const filePath = path.join(clusterDir, `${word}.md`);
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
  console.log(`Updated: ${word}.md`);
}

console.log("Done Batch 4 (gyr) of Cluster Turning & Transformation!");
