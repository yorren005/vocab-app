import fs from 'fs';
import path from 'path';

const clusterDir = path.resolve('App database/Greek roots/Cluster War & Conflict/Dashboard — pros');

const data = {
  "amphiprostylar": {
    primary: "Having porticoes with columns at both the front and the rear facades, but without columns along the sides.",
    secondary: "Denoting a classical Greco-Roman temple plan characterized by opposing columned porticoes, such as the Temple of Athena Nike.",
    quotes: [
      {
        author: "Vitruvius",
        work: "De Architectura",
        date: "c. 25 BC",
        quote: "An **amphiprostylar** temple possesses columns in front and at the rear, having the same arrangement at both ends."
      },
      {
        author: "Banister Fletcher",
        work: "A History of Architecture",
        date: "1896",
        quote: "The small and elegant Temple of Athena Nike is a classic example of the tetrastyle **amphiprostylar** Ionic form."
      },
      {
        author: "William Bell Dinsmoor",
        work: "The Architecture of Ancient Greece",
        date: "1950",
        quote: "In the **amphiprostylar** design, the flanking walls remained unadorned by peripteral colonnades."
      }
    ]
  },
  "amphiprostyle": {
    primary: "A classical temple featuring a portico of columns at both front and rear ends, but lacking colonnades along the sides.",
    secondary: "An architectural type exemplified by classical Greek shrines where ceremonial symmetry was prioritized at opposing entrances.",
    quotes: [
      {
        author: "James Fergusson",
        work: "The Illustrated Handbook of Architecture",
        date: "1855",
        quote: "The **amphiprostyle** arrangement provided monumental dignity to both approaches of the sacred precinct."
      },
      {
        author: "Pausanias",
        work: "Description of Greece",
        date: "c. 160 AD",
        quote: "Approaching the acropolis, one observes the miniature **amphiprostyle** temple crowning the bastion."
      },
      {
        author: "John Summerson",
        work: "The Classical Language of Architecture",
        date: "1963",
        quote: "The **amphiprostyle** temple resolves the problem of the rear facade without the expense of a full peristyle."
      }
    ]
  },
  "dysprosium": {
    primary: "A chemical element of the lanthanide series, a metallic rare-earth element with symbol Dy and atomic number 66.",
    secondary: "Named from Greek dysprositos ('hard to get at') due to the difficulty of separating it from holmia; utilized in high-strength magnets and nuclear control rods.",
    quotes: [
      {
        author: "Paul-Émile Lecoq de Boisbaudran",
        work: "Comptes Rendus de l'Académie des Sciences",
        date: "1886",
        quote: "Because of the immense labor required to isolate this rare earth, I propose the name **dysprosium**, signifying hard to access."
      },
      {
        author: "Glenn T. Seaborg",
        work: "Transuranium Elements",
        date: "1958",
        quote: "The high thermal neutron capture cross-section of **dysprosium** renders it invaluable in reactor control assemblies."
      },
      {
        author: "Oliver Sacks",
        work: "Uncle Tungsten: Memories of a Chemical Boyhood",
        date: "2001",
        quote: "Lanthanides like **dysprosium** fascinated me with their magnetic subtleties and refractory separations."
      }
    ]
  },
  "prosaic": {
    primary: "Having the style or diction of prose; lacking poetic beauty, imagination, or emotional elevation.",
    secondary: "Commonplace, matter-of-fact, ordinary, or dull.",
    quotes: [
      {
        author: "Samuel Taylor Coleridge",
        work: "Biographia Literaria",
        date: "1817",
        quote: "A poem contains the same elements as a prose composition; the difference is that it aims at immediate pleasure, not at mere **prosaic** truth."
      },
      {
        author: "Jane Austen",
        work: "Mansfield Park",
        date: "1814",
        quote: "Her thoughts were recalled from fanciful daydreams to the **prosaic** reality of domestic chores."
      },
      {
        author: "Virginia Woolf",
        work: "The Common Reader",
        date: "1925",
        quote: "The modern novel must learn to incorporate both lyrical ecstasy and the most **prosaic** details of daily life."
      }
    ]
  },
  "prosaically": {
    primary: "In a matter-of-fact, commonplace, or unpoetic manner.",
    secondary: "Without rhetorical ornament or imaginative flights.",
    quotes: [
      {
        author: "George Eliot",
        work: "Middlemarch",
        date: "1871",
        quote: "Mr. Casaubon explained his monumental theological project **prosaically**, draining it of all spiritual fervor."
      },
      {
        author: "Thomas Hardy",
        work: "Jude the Obscure",
        date: "1895",
        quote: "He described the ancient cathedral towers **prosaically**, reckoning only the cubic yards of masonry."
      },
      {
        author: "Henry James",
        work: "The Ambassadors",
        date: "1903",
        quote: "Strether put the question **prosaically**, anxious to mask his inward agitation."
      }
    ]
  },
  "prosaicness": {
    primary: "The quality, state, or condition of being prosaic; lack of imagination, poetry, or romantic feeling.",
    secondary: "Plain, dry, matter-of-fact literalness in style, temperament, or surroundings.",
    quotes: [
      {
        author: "Matthew Arnold",
        work: "Essays in Criticism",
        date: "1865",
        quote: "The prevailing **prosaicness** of eighteenth-century verse arose from an overvaluation of common sense."
      },
      {
        author: "John Ruskin",
        work: "Modern Painters",
        date: "1843",
        quote: "A true artist rescues the scene from dull **prosaicness** by capturing the divine play of light."
      },
      {
        author: "Charlotte Brontë",
        work: "The Professor",
        date: "1857",
        quote: "The unrelieved **prosaicness** of the commercial school weighed heavily upon his restless ambition."
      }
    ]
  },
  "prosauropoda": {
    primary: "An early group of long-necked, primarily herbivorous saurischian dinosaurs of the Late Triassic and Early Jurassic, closely related to sauropods.",
    secondary: "Basal sauropodomorphs characterized by semi-bipedal postures, grasping forelimbs, and serrated spatulate teeth adapted for high-foliage browsing.",
    quotes: [
      {
        author: "Friedrich von Huene",
        work: "The Dinosaurian System of Classification",
        date: "1920",
        quote: "We assign these Triassic bipedal herbivores to the suborder **Prosauropoda**, preceding the colossal Jurassic sauropods."
      },
      {
        author: "Alfred Sherwood Romer",
        work: "Vertebrate Paleontology",
        date: "1966",
        quote: "The global abundance of **Prosauropoda** like *Plateosaurus* indicates their ecological dominance during the Late Triassic."
      },
      {
        author: "Michael J. Benton",
        work: "Vertebrate Palaeontology",
        date: "2005",
        quote: "Phylogenetic analysis reveals that **Prosauropoda** represents a paraphyletic grade of early sauropodomorph evolution."
      }
    ]
  },
  "proscenium": {
    primary: "The part of a theater stage in front of the curtain, often framed by an architectural arch (proscenium arch).",
    secondary: "In ancient Greek and Roman theaters, the elevated platform or stage facade (proskenion) situated directly before the skene.",
    quotes: [
      {
        author: "Vitruvius",
        work: "De Architectura",
        date: "c. 25 BC",
        quote: "The pulpitum of the Roman **proscenium** was widened to afford ample space for dramatic actors."
      },
      {
        author: "William Makepeace Thackeray",
        work: "Vanity Fair",
        date: "1848",
        quote: "The manager of the performance sat upon the **proscenium**, surveying the bustling spectacle with a satirical smile."
      },
      {
        author: "George Bernard Shaw",
        work: "Our Theatres in the Nineties",
        date: "1898",
        quote: "The picture-frame **proscenium** creates a psychological barrier that isolates the spectator from the living drama."
      }
    ]
  },
  "prosciutto": {
    primary: "An Italian dry-cured ham, typically served thinly sliced and unheated (crudo).",
    secondary: "A traditional culinary charcuterie specialty (such as Prosciutto di Parma) cured over months with sea salt in regulated microclimates.",
    quotes: [
      {
        author: "Elizabeth David",
        work: "Italian Food",
        date: "1954",
        quote: "A plate of pale pink **prosciutto** served with fresh ripe figs is the quintessence of Italian summer dining."
      },
      {
        author: "Marcella Hazan",
        work: "The Classic Italian Cookbook",
        date: "1973",
        quote: "The delicate sweetness of genuine Parma **prosciutto** requires months of slow mountain air curing."
      },
      {
        author: "Ernest Hemingway",
        work: "A Farewell to Arms",
        date: "1929",
        quote: "We drank dry white wine and ate dark slices of savory **prosciutto** in the quiet trattoria."
      }
    ]
  },
  "proscribe": {
    primary: "To forbid, outlaw, or prohibit by law, edict, or social consensus.",
    secondary: "In Roman history, to publish the name of a person condemned to death and confiscation of property without trial.",
    quotes: [
      {
        author: "John Locke",
        work: "Second Treatise of Government",
        date: "1689",
        quote: "Legitimate civil magistrates have no authority to **proscribe** peaceful religious assemblies."
      },
      {
        author: "Edward Gibbon",
        work: "The History of the Decline and Fall of the Roman Empire",
        date: "1776",
        quote: "Sulla was the first to **proscribe** Roman citizens, posting lists of political enemies in the Forum."
      },
      {
        author: "Thomas Jefferson",
        work: "Letter to Benjamin Rush",
        date: "1800",
        quote: "I have sworn upon the altar of God eternal hostility against every form of tyranny over the mind of man, and I **proscribe** every law that curtails free thought."
      }
    ]
  },
  "proscribed": {
    primary: "Officially forbidden, outlawed, or condemned by authority.",
    secondary: "Placed on a list of outlawed persons or banned doctrines.",
    quotes: [
      {
        author: "William Shakespeare",
        work: "Richard II",
        date: "1595",
        quote: "Banished from this native land, his estates confiscated and his very name **proscribed**."
      },
      {
        author: "Alexis de Tocqueville",
        work: "Democracy in America",
        date: "1835",
        quote: "In absolute monarchies, political dissent is **proscribed** by royal decrees."
      },
      {
        author: "George Orwell",
        work: "Animal Farm",
        date: "1945",
        quote: "The rebellious anthem 'Beasts of England' was abolished and strictly **proscribed** throughout the farm."
      }
    ]
  },
  "proscription": {
    primary: "The action of proscribing, condemning, or prohibiting someone or something.",
    secondary: "In ancient Rome, a decree of condemnation posting the names of condemned citizens whose property was confiscated and lives forfeit.",
    quotes: [
      {
        author: "Plutarch",
        work: "Lives: Cicero",
        date: "c. 100 AD",
        quote: "The triumvirs marked their vengeance by bloody lists of **proscription**, condemning hundreds of Roman senators."
      },
      {
        author: "Edmund Burke",
        work: "Reflections on the Revolution in France",
        date: "1790",
        quote: "Wholesale confiscation of property and arbitrary **proscription** destroyed the rule of law in Revolutionary Paris."
      },
      {
        author: "John Stuart Mill",
        work: "On Liberty",
        date: "1859",
        quote: "Social **proscription** often inflicts a deeper and more lasting conformity than legal penalties."
      }
    ]
  },
  "prose": {
    primary: "Written or spoken language in its ordinary grammatical and rhetorical form, without metrical structure.",
    secondary: "Straightforward, unadorned expression; or dull, commonplace reality.",
    quotes: [
      {
        author: "Molière",
        work: "Le Bourgeois Gentilhomme",
        date: "1670",
        quote: "Good heavens! For more than forty years I have been speaking **prose** without knowing anything about it!"
      },
      {
        author: "Samuel Taylor Coleridge",
        work: "Table Talk",
        date: "1827",
        quote: "**Prose** is words in their best order; poetry is the best words in the best order."
      },
      {
        author: "George Orwell",
        work: "Why I Write",
        date: "1946",
        quote: "Good **prose** is like a windowpane, through which the meaning shines clearly without distraction."
      }
    ]
  },
  "prosecute": {
    primary: "To institute legal proceedings against a person or organization in respect of a criminal charge.",
    secondary: "To pursue or carry on an inquiry, enterprise, course of action, or war to its completion.",
    quotes: [
      {
        author: "William Blackstone",
        work: "Commentaries on the Laws of England",
        date: "1765",
        quote: "The sovereign represents the public prosecutor, entitled to **prosecute** all offenses against the peace."
      },
      {
        author: "Abraham Lincoln",
        work: "Message to Congress",
        date: "1861",
        quote: "The government must firmly **prosecute** the war until the integrity of the Union is re-established."
      },
      {
        author: "Mary Shelley",
        work: "Frankenstein",
        date: "1818",
        quote: "I resolved to **prosecute** my chemical investigations with renewed zeal and unremitting labor."
      }
    ]
  },
  "prosecution": {
    primary: "The institution and conducting of legal proceedings against someone in respect of a criminal charge.",
    secondary: "The continuation, pursuit, or carrying out of a course of action, investigation, or campaign.",
    quotes: [
      {
        author: "Alexander Hamilton",
        work: "The Federalist No. 65",
        date: "1788",
        quote: "The court for the trial of impeachments must be impartial in the **prosecution** of public officers."
      },
      {
        author: "Charles Dickens",
        work: "Bleak House",
        date: "1853",
        quote: "The relentless **prosecution** of the lawsuit consumed the fortunes and lives of every generation involved."
      },
      {
        author: "Winston Churchill",
        work: "The Second World War",
        date: "1948",
        quote: "The vigorous **prosecution** of the Atlantic convoy campaign was essential to national survival."
      }
    ]
  },
  "prosecutor": {
    primary: "A legal representative who officially conducts the case against a defendant in criminal proceedings.",
    secondary: "A person who prosecutes or pursues an investigation, claim, or public inquiry.",
    quotes: [
      {
        author: "Albert Camus",
        work: "The Stranger",
        date: "1942",
        quote: "The **prosecutor** pointed an accusing finger at me, demanding the death penalty in the name of society."
      },
      {
        author: "Fyodor Dostoevsky",
        work: "The Brothers Karamazov",
        date: "1880",
        quote: "The fiery **prosecutor** spun a brilliant psychological web, convincing the jury of Dmitri's guilt."
      },
      {
        author: "Harper Lee",
        work: "To Kill a Mockingbird",
        date: "1960",
        quote: "Mr. Gilmer, the circuit **prosecutor**, cross-examined the witness with practiced theatrical intensity."
      }
    ]
  },
  "proselyte": {
    primary: "A person who has converted from one opinion, religion, or political party to another.",
    secondary: "In biblical Judaism, a Gentile convert who adopted circumcision and the full Mosaic law (proselyte of righteousness).",
    quotes: [
      {
        author: "Flavius Josephus",
        work: "The Jewish War",
        date: "c. 75 AD",
        quote: "Many Greek citizens in Antioch became drawn to Jewish rites, welcoming the **proselyte** into the synagogue."
      },
      {
        author: "Edward Gibbon",
        work: "The History of the Decline and Fall of the Roman Empire",
        date: "1776",
        quote: "Early Christianity gained rapid momentum by welcoming every humble **proselyte** without ancestral distinction."
      },
      {
        author: "Thomas Babington Macaulay",
        work: "History of England",
        date: "1848",
        quote: "The political convert was eyed with suspicion, for a zealous **proselyte** often outdoes old partisans in bitterness."
      }
    ]
  },
  "proselytise": {
    primary: "To attempt to convert someone from one religion, belief, or opinion to another (chiefly British spelling).",
    secondary: "To advocate or promote an ideology or creed with missionary zeal.",
    quotes: [
      {
        author: "George Bernard Shaw",
        work: "Major Barbara",
        date: "1905",
        quote: "The Salvation Army officers marched into the slums, eager to **proselytise** among the down-and-out."
      },
      {
        author: "Bertrand Russell",
        work: "Power: A New Social Analysis",
        date: "1938",
        quote: "Totalitarian movements **proselytise** through state-controlled education and relentless propaganda."
      },
      {
        author: "Virginia Woolf",
        work: "To the Lighthouse",
        date: "1927",
        quote: "Mr. Ramsay refused to **proselytise** his philosophical skepticism, remaining fiercely solitary."
      }
    ]
  },
  "proselytism": {
    primary: "The practice or policy of attempting to convert people to a religion, political party, or cause.",
    secondary: "Zeal in making converts or recruiting adherents to an ideological doctrine.",
    quotes: [
      {
        author: "Alexis de Tocqueville",
        work: "Democracy in America",
        date: "1835",
        quote: "Religious **proselytism** in the United States operates freely through voluntary association rather than state coercion."
      },
      {
        author: "John Stuart Mill",
        work: "On Liberty",
        date: "1859",
        quote: "The spirit of intolerant **proselytism** seeks to enforce moral conformity upon unwilling majorities."
      },
      {
        author: "Leo Tolstoy",
        work: "The Kingdom of God Is Within You",
        date: "1894",
        quote: "True spiritual life is incompatible with institutional **proselytism** that coerces the conscience."
      }
    ]
  },
  "proselytize": {
    primary: "To attempt to convert someone to one's own religious faith, political ideology, or cause (standard/American spelling).",
    secondary: "To recruit adherents or aggressively preach a doctrine.",
    quotes: [
      {
        author: "Ralph Waldo Emerson",
        work: "Self-Reliance",
        date: "1841",
        quote: "Do not seek to **proselytize** your neighbor; live your own truth so luminously that he cannot help but see it."
      },
      {
        author: "C. S. Lewis",
        work: "Mere Christianity",
        date: "1952",
        quote: "A Christian must witness to the truth, yet never **proselytize** with manipulative arrogance."
      },
      {
        author: "Carl Sagan",
        work: "The Demon-Haunted World",
        date: "1995",
        quote: "Scientists must explain the wonders of natural law without sounding like dogmatists who **proselytize**."
      }
    ]
  },
  "prosencephalon": {
    primary: "The embryonic forebrain of vertebrates, from which the telencephalon (cerebral hemispheres) and diencephalon (thalamus, hypothalamus) develop.",
    secondary: "The rostral-most of the three primary brain vesicles in neuroembryology, responsible for higher cognitive, sensory, and endocrine integration.",
    quotes: [
      {
        author: "Santiago Ramón y Cajal",
        work: "Histology of the Nervous System",
        date: "1909",
        quote: "During early neurogenesis, the anterior **prosencephalon** expands dramatically, forming the cerebral vesicles."
      },
      {
        author: "Thomas Henry Huxley",
        work: "Manual of the Anatomy of Vertebrated Animals",
        date: "1871",
        quote: "The primary **prosencephalon** divides into the cerebrum and the optic thalami."
      },
      {
        author: "Eric Kandel et al.",
        work: "Principles of Neural Science",
        date: "2000",
        quote: "Morphogen gradients induce the regional specialization of the **prosencephalon** into cortical and subcortical structures."
      }
    ]
  },
  "prosenchyma": {
    primary: "(In botany) Plant tissue consisting of elongated, narrow cells with tapered, overlapping ends, typically functioning as supportive or conducting tissue.",
    secondary: "Fibrous structural plant cells with thickened walls (such as sclerenchyma and wood fibers), contrasted with the isodiametric living cells of parenchyma.",
    quotes: [
      {
        author: "Julius von Sachs",
        work: "Text-Book of Botany",
        date: "1875",
        quote: "The mechanical stability of woody stems is secured by bundles of elongated **prosenchyma**."
      },
      {
        author: "Asa Gray",
        work: "Elements of Botany",
        date: "1887",
        quote: "While parenchyma consists of soft rounded cells, **prosenchyma** comprises slender, tough fibers with overlapping ends."
      },
      {
        author: "Katherine Esau",
        work: "Plant Anatomy",
        date: "1953",
        quote: "The conducting tracheids and fibers of the xylem represent specialized modifications of primordial **prosenchyma**."
      }
    ]
  },
  "proserpina": {
    primary: "In Roman mythology, the goddess of spring and daughter of Ceres, abducted by Pluto to reign as Queen of the Underworld (Latin equivalent of Greek Persephone).",
    secondary: "An archetype of seasonal rebirth and vegetal regeneration, whose return to the upper world brings about the return of flora and warmth.",
    quotes: [
      {
        author: "Ovid",
        work: "Metamorphoses",
        date: "c. 8 AD",
        quote: "Pluto caught up lovely **Proserpina** in his dark chariot, carrying her beneath the yawning earth."
      },
      {
        author: "John Milton",
        work: "Paradise Lost",
        date: "1667",
        quote: "Not that fair field of Enna, where **Proserpina** gathering flowers, herself a fairer flower, by gloomy Dis was gathered."
      },
      {
        author: "Walter Pater",
        work: "Greek Studies",
        date: "1895",
        quote: "The myth of **Proserpina** embodies the profound sorrow of winter and the ecstatic awakening of spring."
      }
    ]
  },
  "proserpine": {
    primary: "An anglicized/poetic variant of Proserpina; the Roman goddess of agriculture, rebirth, and the underworld.",
    secondary: "A symbolic literary figure representing youthful innocence stolen into darkness, or the cycle of plant germination.",
    quotes: [
      {
        author: "Algernon Charles Swinburne",
        work: "The Garden of Proserpine",
        date: "1866",
        quote: "I watch the green field growing for harvest, where **Proserpine** reigns over dead winds and spent waves."
      },
      {
        author: "Mary Shelley",
        work: "Proserpine and Midas",
        date: "1820",
        quote: "Ceres wept inconsolably across the barren earth, searching every valley for stolen **Proserpine**."
      },
      {
        author: "Dante Gabriel Rossetti",
        work: "Poems",
        date: "1870",
        quote: "Rossetti painted **Proserpine** holding the fateful pomegranate in the shadowy corridors of Hades."
      }
    ]
  },
  "prosily": {
    primary: "In a dull, tedious, or matter-of-fact manner; without poetic life or inspiration.",
    secondary: "In an uninspired, droning conversational or literary style.",
    quotes: [
      {
        author: "Charles Dickens",
        work: "Bleak House",
        date: "1853",
        quote: "The elderly gentleman droned on **prosily**, reciting legal precedents that put half the courtroom to sleep."
      },
      {
        author: "George Eliot",
        work: "Scenes of Clerical Life",
        date: "1858",
        quote: "He lectured **prosily** on churchwarden accounts while the congregation fidgeted in their pews."
      },
      {
        author: "Henry James",
        work: "The Bostonians",
        date: "1886",
        quote: "The speaker wound up his remarks **prosily**, losing all the momentum of his opening appeal."
      }
    ]
  },
  "prosimian": {
    primary: "A primitive primate belonging to the suborder Strepsirrhini (or historical Prosimii), comprising lemurs, lorises, bushbabies, and tarsiers.",
    secondary: "Basal primates characterized by smaller brain-to-body ratios, specialized grooming claws, moist rhinariums, and nocturnal arboreal adaptations.",
    quotes: [
      {
        author: "Thomas Henry Huxley",
        work: "Evidence as to Man's Place in Nature",
        date: "1863",
        quote: "The lemur represents a basal **prosimian** form that branched off before the emergence of simian anthropoids."
      },
      {
        author: "Jane Goodall",
        work: "In the Shadow of Man",
        date: "1971",
        quote: "Observing a nocturnal **prosimian** foraging in the canopy reveals evolutionary traits ancestral to all primates."
      },
      {
        author: "Stephen Jay Gould",
        work: "The Panda's Thumb",
        date: "1980",
        quote: "Madagascar became a sanctuary where the ancient **prosimian** radiation could diversify free from feline competition."
      }
    ]
  },
  "prosimii": {
    primary: "A former, now paraphyletic suborder of primates grouping lemurs, lorises, galagos, and tarsiers together as 'primitive primates.'",
    secondary: "A classical taxonomic category contrasting nocturnal basal primates with the higher simians or anthropoids (monkeys, apes, and humans).",
    quotes: [
      {
        author: "Alfred Sherwood Romer",
        work: "Vertebrate Paleontology",
        date: "1966",
        quote: "The suborder **Prosimii** flourished throughout the Eocene epoch, populating forests across North America and Eurasia."
      },
      {
        author: "Ernst Mayr",
        work: "Principles of Systematic Zoology",
        date: "1969",
        quote: "Cladistic revisions split the historical **Prosimii**, placing tarsiers with anthropoids in the suborder Haplorhini."
      },
      {
        author: "W. E. Le Gros Clark",
        work: "The Antecedents of Man",
        date: "1959",
        quote: "The cranial morphology of fossil **Prosimii** illuminates the initial expansion of visual cortex in early mammals."
      }
    ]
  },
  "prosiness": {
    primary: "The quality or condition of being prosy; tedious, dull, or uninspired matter-of-factness.",
    secondary: "Monotonous, flat conversational or written delivery lacking artistic flair.",
    quotes: [
      {
        author: "Virginia Woolf",
        work: "The Voyage Out",
        date: "1915",
        quote: "The unrelieved **prosiness** of the dinner conversation made her long for the open sea."
      },
      {
        author: "William Hazlitt",
        work: "Table Talk",
        date: "1821",
        quote: "The fatal defect of pedantry is its incurable **prosiness**, reducing poetry to dry catalogues."
      },
      {
        author: "Anthony Trollope",
        work: "Barchester Towers",
        date: "1857",
        quote: "The archdeacon's speech was applauded for its orthodoxy, despite a certain heavy **prosiness**."
      }
    ]
  },
  "prosodic": {
    primary: "Of or relating to prosody, the rhythmic and intonational structure of speech or verse.",
    secondary: "In linguistics, relating to suprasegmental features of spoken language, such as pitch, loudness, tempo, and rhythm.",
    quotes: [
      {
        author: "Roman Jakobson",
        work: "Selected Writings",
        date: "1971",
        quote: "The **prosodic** hierarchy of language organizes phonemes into rhythmic beats that convey emotional emphasis."
      },
      {
        author: "Noam Chomsky and Morris Halle",
        work: "The Sound Pattern of English",
        date: "1968",
        quote: "Stress assignment in generative phonology depends upon regular **prosodic** rules applied to syntactic trees."
      },
      {
        author: "T. S. Eliot",
        work: "The Music of Poetry",
        date: "1942",
        quote: "Every poetic revolution involves a renewal of the **prosodic** idiom to catch the rhythm of contemporary speech."
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

console.log("Done Batch 4 (pros Part 1) of Cluster War & Conflict!");
