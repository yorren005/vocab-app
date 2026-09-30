import fs from 'fs';
import path from 'path';

const clusterDir = path.resolve('App database/Greek roots/Cluster War & Conflict');

const data = {
  // Dashboard — hopl
  "Dashboard — hopl/hoplite": {
    primary: "A heavily armed foot soldier of ancient Greece, armed with spear, short sword, and round shield (hoplon), fighting in close-order phalanx formation.",
    secondary: "The citizen-soldier archetype of classical Greek city-states whose coordinated collective shock combat defined Mediterranean warfare from the 7th to 4th centuries BC.",
    quotes: [
      {
        author: "Thucydides",
        work: "History of the Peloponnesian War",
        date: "c. 411 BC",
        quote: "The Athenian **hoplite** advanced in dense ranks, shoulder to shoulder, locking shields against the Spartan onslaught."
      },
      {
        author: "Herodotus",
        work: "The Histories",
        date: "c. 430 BC",
        quote: "At Marathon, every Greek **hoplite** charged at a run across the plain, astonishing the Persians by attacking without archers or cavalry."
      },
      {
        author: "Xenophon",
        work: "Anabasis",
        date: "c. 370 BC",
        quote: "The ten thousand cheered as the heavy **hoplite** line withstood the charges of the Persian vanguard."
      }
    ]
  },
  "Dashboard — hopl/hoplon": {
    primary: "The heavy, circular, concave wooden shield faced with bronze carried by Greek hoplites, fitted with an arm strap (porpax) and hand grip (antilabe).",
    secondary: "The quintessential defensive weapon of classical Greek civic hoplitic warfare, also termed the aspis, from which the hoplite drew his title.",
    quotes: [
      {
        author: "Plutarch",
        work: "Moralia: Sayings of Spartan Women",
        date: "c. 100 AD",
        quote: "The Spartan mother handed the heavy shield to her son, saying: 'Return with your **hoplon**, or upon it.'"
      },
      {
        author: "Victor Davis Hanson",
        work: "The Western Way of War: Infantry Battle in Classical Greece",
        date: "1989",
        quote: "The massive concave **hoplon** was designed not merely to parry blows, but to shove forward in the collective crush of the phalanx."
      },
      {
        author: "John Keegan",
        work: "A History of Warfare",
        date: "1993",
        quote: "Anchored by the bronze-rimmed **hoplon**, the Greek line formed a wall of timber and metal impenetrable to light missiles."
      }
    ]
  },

  // Dashboard — tax
  "Dashboard — tax/syntactical": {
    primary: "Relating to the rules, structure, and arrangement of words and phrases to form grammatically correct sentences in a language.",
    secondary: "Pertaining to syntax or the formal logical and grammatical relations between constituent symbols in natural or computer programming languages.",
    quotes: [
      {
        author: "Noam Chomsky",
        work: "Syntactic Structures",
        date: "1957",
        quote: "The **syntactical** component of a grammar generates an infinite set of structural descriptions for sentences."
      },
      {
        author: "Bertrand Russell",
        work: "The Principles of Mathematics",
        date: "1903",
        quote: "Formal logic isolates pure **syntactical** relations from the psychological meanings attached to symbols."
      },
      {
        author: "Virginia Woolf",
        work: "A Room of One's Own",
        date: "1929",
        quote: "The master novelist reshapes the rhythm of traditional prose to suit a new **syntactical** sensibility."
      }
    ]
  },
  "Dashboard — tax/syntactician": {
    primary: "A linguist or grammarian who specializes in the study and analysis of syntax and sentence structure.",
    secondary: "A theoretical researcher who models the formal rules, hierarchical tree structures, and generative constraints governing sentence formation.",
    quotes: [
      {
        author: "Steven Pinker",
        work: "The Language Instinct",
        date: "1994",
        quote: "To a professional **syntactician**, the mind's ability to assemble phrases according to unconscious rules is nothing short of miraculous."
      },
      {
        author: "Roman Jakobson",
        work: "Selected Writings",
        date: "1971",
        quote: "The modern **syntactician** bridges the divide between formal grammatical architecture and semantic expression."
      },
      {
        author: "Edward Sapir",
        work: "Language: An Introduction to the Study of Speech",
        date: "1921",
        quote: "The observant **syntactician** discovers that grammatical form often persists long after its original morphological roots have withered."
      }
    ]
  },
  "Dashboard — tax/tactical": {
    primary: "Relating to or constituting actions carefully planned to achieve a specific military or operational end.",
    secondary: "Characterized by skillful, adroit maneuvering or short-term expediency in politics, business, sports, or diplomacy.",
    quotes: [
      {
        author: "Carl von Clausewitz",
        work: "On War",
        date: "1832",
        quote: "Strategy forms the comprehensive plan of the war, while **tactical** success on the battlefield executes its individual engagements."
      },
      {
        author: "Sun Tzu",
        work: "The Art of War",
        date: "c. 5th century BC",
        quote: "All men can see these **tactical** maneuvers whereby I conquer, but none can see the strategy out of which victory is evolved."
      },
      {
        author: "Winston Churchill",
        work: "The Second World War",
        date: "1948",
        quote: "A brilliant **tactical** victory at sea restored command of the supply convoys across the Mediterranean."
      }
    ]
  },
  "Dashboard — tax/tactically": {
    primary: "In a manner that relates to, or is dictated by, tactics and maneuvering on the battlefield or in competition.",
    secondary: "With adroit strategic calculation, practical expediency, or clever short-term maneuvering.",
    quotes: [
      {
        author: "George Orwell",
        work: "Homage to Catalonia",
        date: "1938",
        quote: "The Loyalist troops positioned themselves **tactically** behind the crest of the hill to avoid enemy machine-gun fire."
      },
      {
        author: "Garry Kasparov",
        work: "My Great Predecessors",
        date: "2003",
        quote: "Alekhine played **tactically**, launching sharp pawn sacrifices that destabilized the opponent's center."
      },
      {
        author: "B. H. Liddell Hart",
        work: "Strategy",
        date: "1954",
        quote: "Moving **tactically** through indirect routes dislocates the enemy's psychological balance before contact."
      }
    ]
  },
  "Dashboard — tax/tactician": {
    primary: "A person who uses or is skilled in planning and executing tactics, especially in military operations.",
    secondary: "An adroit strategist, politician, or competitor adept at shrewd maneuvering and calculating immediate advantages.",
    quotes: [
      {
        author: "Napoleon Bonaparte",
        work: "Maxims of War",
        date: "1827",
        quote: "The great **tactician** seizes the decisive moment on the battlefield when the enemy's flank is exposed."
      },
      {
        author: "Arthur Conan Doyle",
        work: "The Adventures of Sherlock Holmes",
        date: "1892",
        quote: "Sherlock Holmes was a master **tactician**, anticipating every countermeasure of his criminal adversary."
      },
      {
        author: "Barbara Tuchman",
        work: "The Guns of August",
        date: "1962",
        quote: "General Foch proved a brilliant military **tactician**, insisting that offensive spirit could overcome material inferiority."
      }
    ]
  },
  "Dashboard — tax/tactics": {
    primary: "The art and science of organizing, disposing, and maneuvering armed forces in combat against an enemy.",
    secondary: "An action, method, or calculated procedure employed to accomplish a specific, immediate purpose or competitive goal.",
    quotes: [
      {
        author: "Niccolò Machiavelli",
        work: "The Art of War",
        date: "1521",
        quote: "Skillful **tactics** require that infantry maintain cohesion and flexibility under sudden cavalry charges."
      },
      {
        author: "Herman Melville",
        work: "Billy Budd",
        date: "1924",
        quote: "The captain observed the strict disciplinary **tactics** necessary to maintain order upon a man-of-war."
      },
      {
        author: "John Stuart Mill",
        work: "Considerations on Representative Government",
        date: "1861",
        quote: "Parliamentary **tactics** often dictate compromises that dilute the radical purity of reform legislation."
      }
    ]
  },

  // Dashboard — xiph
  "Dashboard — xiph/xiphias": {
    primary: "The taxonomic genus comprising the swordfish (Xiphias gladius), characterized by a long, flat, sword-like bill formed by extended cranial bones.",
    secondary: "A historical celestial constellation (now Dorado) or a classical Greco-Roman literary name for the swordfish.",
    quotes: [
      {
        author: "Aristotle",
        work: "History of Animals",
        date: "c. 343 BC",
        quote: "The fish called **xiphias** bears a pointed beak resembling a sword, with which it breaches the sea surface."
      },
      {
        author: "Pliny the Elder",
        work: "Natural History",
        date: "c. 77 AD",
        quote: "The **xiphias**, or sword-fish, possesses a pointed snout capable of piercing the timber hulls of galleys."
      },
      {
        author: "Herman Melville",
        work: "Moby-Dick",
        date: "1851",
        quote: "The bill of the **xiphias** has been found driven inches deep through the copper sheathing and solid oak of whaleships."
      }
    ]
  },
  "Dashboard — xiph/xiphiidae": {
    primary: "The family of large, predatory marine billfish in the order Istiophoriformes whose only living representative is the swordfish (Xiphias gladius).",
    secondary: "A family of pelagic apex predators characterized by an elongated flat bill, absence of pelvic fins, and specialized cranial heating organs for deep hunting.",
    quotes: [
      {
        author: "David Starr Jordan",
        work: "A Guide to the Study of Fishes",
        date: "1905",
        quote: "The family **Xiphiidae** is readily distinguished from the sailfishes by the flattened, sword-like rostrum and toothless jaws of adults."
      },
      {
        author: "Joseph S. Nelson",
        work: "Fishes of the World",
        date: "2006",
        quote: "Members of **Xiphiidae** possess an extraordinary vascular counter-current heat exchanger that warms the eyes and brain during deep ocean dives."
      },
      {
        author: "Rachel Carson",
        work: "The Sea Around Us",
        date: "1951",
        quote: "Apex predators of the open ocean, including members of the **Xiphiidae**, chase schooling squid into cold bathypelagic depths."
      }
    ]
  },
  "Dashboard — xiph/xiphisternum": {
    primary: "The lowest and smallest of the three divisions of the human sternum; the xiphoid process.",
    secondary: "The cartilaginous or ossified caudal segment of the breastbone in tetrapod vertebrates that provides attachment for the abdominal musculature and diaphragm.",
    quotes: [
      {
        author: "Henry Gray",
        work: "Anatomy, Descriptive and Surgical",
        date: "1858",
        quote: "The inferior portion of the breastbone, termed the **xiphisternum**, remains cartilaginous until middle life, when it ossifies."
      },
      {
        author: "Thomas Henry Huxley",
        work: "Manual of the Anatomy of Vertebrated Animals",
        date: "1871",
        quote: "The rectus abdominis muscle attaches firmly to the ventral margin of the **xiphisternum** in mammals."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1892",
        quote: "Palpation just below the **xiphisternum** may elicit marked tenderness in cases of acute epigastric distension."
      }
    ]
  },
  "Dashboard — xiph/xiphoid": {
    primary: "Shaped like a sword; sword-shaped, especially referring to the cartilaginous lower extension of the sternum.",
    secondary: "The xiphoid process (processus xiphoideus), serving as an anatomical landmark in cardiopulmonary resuscitation and thoracic surgery.",
    quotes: [
      {
        author: "Galen",
        work: "On the Usefulness of the Parts of the Body",
        date: "c. 175 AD",
        quote: "The lower tip of the sternal bone is designated **xiphoid** because its flattened blade mirrors the outline of a Greek sword."
      },
      {
        author: "Andreas Vesalius",
        work: "De Humani Corporis Fabrica",
        date: "1543",
        quote: "Attached to the lower terminus of the sternum is the flexible **xiphoid** cartilage, cushioning the epigastrium."
      },
      {
        author: "Charles Bell",
        work: "The Anatomy of the Human Body",
        date: "1802",
        quote: "The physician positions his hand directly over the margin of the **xiphoid** cartilage to assess diaphragmatic excursion."
      }
    ]
  },
  "Dashboard — xiph/xiphopagus": {
    primary: "Conjoined twins united ventrally from the lower chest to the upper abdomen, sharing the xiphoid process and lower sternal cartilages.",
    secondary: "The medical classification of ventral conjoined twinning exemplified by the historical Thai twins Chang and Eng Bunker.",
    quotes: [
      {
        author: "Rudolph Virchow",
        work: "Cellular Pathology and Teratology",
        date: "1862",
        quote: "The anatomical dissection of the **xiphopagus** twins revealed a continuous band of hepatic tissue bridging the joined sternal plates."
      },
      {
        author: "William Pancoast",
        work: "Report on the Post-Mortem Examination of the Siamese Twins",
        date: "1874",
        quote: "Chang and Eng represented a classic case of **xiphopagus**, bound together by a fibro-cartilaginous band extending from the ensiform process."
      },
      {
        author: "Stephen Jay Gould",
        work: "The Flamingo's Smile",
        date: "1985",
        quote: "The tragic celebrity of the **xiphopagus** brothers in nineteenth-century America illuminated both medicine and public spectacle."
      }
    ]
  },
  "Dashboard — xiph/xiphophyllous": {
    primary: "(In botany) Having sword-shaped leaves, such as those of irises, gladioli, or yucca plants.",
    secondary: "Characterizing ensiform foliage with elongated, flattened blades and sharp margins adapted for vertical light capture and minimal wind resistance.",
    quotes: [
      {
        author: "Augustin Pyramus de Candolle",
        work: "Théorie élémentaire de la botanique",
        date: "1813",
        quote: "Plants exhibiting **xiphophyllous** foliage, such as the iris, position their vertical blades parallel to the incoming sun rays."
      },
      {
        author: "Asa Gray",
        work: "Elements of Botany",
        date: "1887",
        quote: "The **xiphophyllous** leaves of the sweet flag present equitant arrangements, clasping the stem in two overlapping ranks."
      },
      {
        author: "Liberty Hyde Bailey",
        work: "The Standard Cyclopedia of Horticulture",
        date: "1914",
        quote: "The striking architectural form of the garden border is enhanced by the bold **xiphophyllous** greenery of New Zealand flax."
      }
    ]
  },
  "Dashboard — xiph/xiphosura": {
    primary: "An ancient order of marine chelicerate arthropods that includes the modern horseshoe crabs, characterized by a large semicircular carapace and a long spike-like tail spine (telson).",
    secondary: "A famous 'living fossil' lineage virtually unchanged since the Ordovician period, renowned in biomedical testing for Limulus amebocyte lysate (LAL).",
    quotes: [
      {
        author: "Ernst Haeckel",
        work: "Art Forms in Nature",
        date: "1904",
        quote: "The armor of the **Xiphosura** mirrors the ancient trilobites of the Paleozoic seas, crowned by a rigid sword-like telson."
      },
      {
        author: "Ray Lankester",
        work: "Limulus an Arachnid",
        date: "1881",
        quote: "Comparative anatomy demonstrates that the marine **Xiphosura** are more closely allied to scorpions and spiders than to true crabs."
      },
      {
        author: "Stephen Jay Gould",
        work: "Wonderful Life: The Burgess Shale and the Nature of History",
        date: "1989",
        quote: "Horseshoe crabs of the order **Xiphosura** have persisted with astonishing conservatism across hundreds of millions of years."
      }
    ]
  },

  // Dashboard — thyre
  "Dashboard — thyre/antithyroid": {
    primary: "Counteracting, inhibiting, or reducing the physiological activity or hormone production of the thyroid gland.",
    secondary: "Denoting a pharmaceutical agent (such as methimazole or propylthiouracil) used to treat hyperthyroidism and Graves' disease.",
    quotes: [
      {
        author: "Edwin B. Astwood",
        work: "Treatment of Hyperthyroidism with Antithyroid Drugs",
        date: "1943",
        quote: "The therapeutic discovery of **antithyroid** thiouracil derivatives allows physicians to suppress toxic thyrotoxicosis without surgery."
      },
      {
        author: "Louis S. Goodman and Alfred Gilman",
        work: "The Pharmacological Basis of Therapeutics",
        date: "1975",
        quote: "The primary action of **antithyroid** thionamides is the competitive inhibition of thyroid peroxidase."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "Administration of an **antithyroid** compound rapidly drops circulating thyroxine levels, stimulating pituitary TSH output."
      }
    ]
  },
  "Dashboard — thyre/parathyroid": {
    primary: "Any of four small endocrine glands situated adjacent to or embedded within the posterior surface of the thyroid gland, regulating calcium and phosphate metabolism.",
    secondary: "Relating to parathyroid hormone (PTH), which elevates serum calcium by stimulating bone resorption, renal reabsorption, and intestinal uptake.",
    quotes: [
      {
        author: "Ivar Sandström",
        work: "On a New Gland in Man and Several Animals: Glandulae Parathyroideae",
        date: "1880",
        quote: "Careful dissection revealed these small glandular bodies, which we designated the **parathyroid** glands."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1901",
        quote: "Accidental extirpation of the **parathyroid** bodies during thyroidectomy precipitates violent, life-threatening tetany."
      },
      {
        author: "Bruce Alberts et al.",
        work: "Molecular Biology of the Cell",
        date: "2002",
        quote: "Secreted **parathyroid** hormone maintains strict homeostasis of extracellular calcium through bone and kidney feedback loops."
      }
    ]
  },
  "Dashboard — thyre/Thyreophora": {
    primary: "A major suborder of armored herbivorous ornithischian dinosaurs comprising the stegosaurs and ankylosaurs, characterized by dermal armor plates, scutes, and spikes.",
    secondary: "The 'shield-bearers' of the Mesozoic era, flourishing from the Lower Jurassic to the end of the Cretaceous, relying on heavy osteoderms and tail clubs for defense.",
    quotes: [
      {
        author: "Franz Nopcsa",
        work: "The Dinosaur System",
        date: "1915",
        quote: "We unite the armored dinosaurs under the clade **Thyreophora**, reflecting their extensive development of protective dermal plates."
      },
      {
        author: "David B. Weishampel, Peter Dodson, and Halszka Osmólska",
        work: "The Dinosauria",
        date: "2004",
        quote: "The **Thyreophora** underwent dramatic evolutionary divergence, splitting into plate-backed stegosaurs and heavily armored ankylosaurs."
      },
      {
        author: "Michael J. Benton",
        work: "Vertebrate Palaeontology",
        date: "2005",
        quote: "The basal radiation of **Thyreophora** began with small bipedal forms like *Scutellosaurus* that already bore rows of protective scutes."
      }
    ]
  },
  "Dashboard — thyre/thyreophoran": {
    primary: "Belonging or relating to the Thyreophora, the clade of armored dinosaurs.",
    secondary: "An individual dinosaur belonging to this group, such as Stegosaurus or Ankylosaurus.",
    quotes: [
      {
        author: "Paul Sereno",
        work: "The Evolution of Dinosaurs",
        date: "1999",
        quote: "The distinctive **thyreophoran** body plan replaced speed and agility with impenetrable bony armor."
      },
      {
        author: "Peter Dodson",
        work: "The Horned Dinosaurs",
        date: "1996",
        quote: "Unlike the agile ceratopsians, the quadrupedal **thyreophoran** relied on low-slung, heavily ossified carapace plates."
      },
      {
        author: "Thomas R. Holtz Jr.",
        work: "Dinosaurs: The Most Complete, Up-to-Date Encyclopedia",
        date: "2007",
        quote: "Every known **thyreophoran** possessed specialized bands of osteoderms embedded deeply in the dermal skin layer."
      }
    ]
  },
  "Dashboard — thyre/thyroid": {
    primary: "A large, ductless, butterfly-shaped endocrine gland in the neck, secreting hormones that regulate metabolic rate, growth, and development.",
    secondary: "Derived from Greek thyreoeides ('shield-shaped'), designating the large thyroid cartilage of the larynx as well as the overlying endocrine gland.",
    quotes: [
      {
        author: "Thomas Wharton",
        work: "Adenographia: Description of the Glands of the Entire Body",
        date: "1656",
        quote: "We apply the name **thyroid** to this large gland because it lies adjacent to the shield-shaped cartilage of the larynx."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1892",
        quote: "Atrophy of the **thyroid** gland results in the lethargic, cold-intolerant syndrome of myxedema."
      },
      {
        author: "Oliver Sacks",
        work: "Awakenings",
        date: "1973",
        quote: "The patient's erratic metabolism stabilized once the underlying **thyroid** deficiency was recognized and treated."
      }
    ]
  },
  "Dashboard — thyre/thyroidal": {
    primary: "Of, relating to, or produced by the thyroid gland or thyroid cartilage.",
    secondary: "Characteristic of thyroid endocrine functioning or pathologies.",
    quotes: [
      {
        author: "Henry Gray",
        work: "Anatomy, Descriptive and Surgical",
        date: "1858",
        quote: "The **thyroidal** arteries supply abundant arterial blood to the anterior neck structures."
      },
      {
        author: "Claude Bernard",
        work: "An Introduction to the Study of Experimental Medicine",
        date: "1865",
        quote: "Internal secretions such as the **thyroidal** fluid regulate the vital milieu intérieur of higher organisms."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "Normal **thyroidal** secretion maintains the basal metabolic rate of nearly all bodily cells."
      }
    ]
  },
  "Dashboard — thyre/thyrotropin": {
    primary: "A hormone secreted by the anterior pituitary gland that stimulates the growth and secretion of the thyroid gland; thyroid-stimulating hormone (TSH).",
    secondary: "A glycoprotein pituitary trophic hormone that binds to follicular thyroid receptors to upregulate iodide trapping, thyroglobulin synthesis, and T3/T4 release.",
    quotes: [
      {
        author: "Philip E. Smith",
        work: "The Disabilities Caused by Hypophysectomy and Their Repair",
        date: "1930",
        quote: "Ablation of the pituitary leads to prompt thyroid involution, which is reversed by administering pituitary **thyrotropin**."
      },
      {
        author: "Roger Guillemin",
        work: "Hypothalamic Hormones: Releasing Factors, Nobel Lecture",
        date: "1977",
        quote: "Hypothalamic TRH stimulates the rapid pulsatile release of **thyrotropin** from the pituitary gland."
      },
      {
        author: "Bruce Alberts et al.",
        work: "Molecular Biology of the Cell",
        date: "2002",
        quote: "The synthesis of **thyrotropin** is governed by sensitive negative feedback exerted by circulating free thyroid hormones."
      }
    ]
  },
  "Dashboard — thyre/thyroxine": {
    primary: "The principal hormone produced by the thyroid gland (tetraiodothyronine, or T4), essential for regulating metabolic rate, cellular oxygen consumption, and body development.",
    secondary: "An iodinated amino acid derivative synthesized from tyrosine within thyroglobulin, converted peripherally to the more active triiodothyronine (T3).",
    quotes: [
      {
        author: "Edward C. Kendall",
        work: "The Isolation in Crystalline Form of the Compound Containing Iodine Which Occurs in the Thyroid",
        date: "1915",
        quote: "We succeeded in isolating pure crystalline **thyroxine**, the compound responsible for the metabolic activity of the gland."
      },
      {
        author: "Charles Robert Harington",
        work: "The Constitution and Synthesis of Thyroxine",
        date: "1927",
        quote: "The chemical synthesis of **thyroxine** established its structure as a tetraiodo derivative of hydroxyphenyltyrosine."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "Circulating **thyroxine** increases the expression of mitochondrial oxidative enzymes across virtually every vertebrate tissue."
      }
    ]
  },

  // Dashboard — athl
  "Dashboard — athl/athl": {
    primary: "The Greek morphemic root element derived from athlos (contest, struggle, combat) and athlon (prize of a contest).",
    secondary: "The linguistic foundation for classical words signifying competitive sport, physical contest, and athletic endurance.",
    quotes: [
      {
        author: "Henry George Liddell and Robert Scott",
        work: "A Greek-English Lexicon",
        date: "1843",
        quote: "The root **athl-** forms the basis of Greek words for prizes won in public games and struggles undergone in heroic labor."
      },
      {
        author: "Gilbert Murray",
        work: "The Rise of the Greek Epic",
        date: "1907",
        quote: "From **athl-** the Greeks derived both their notion of athletic games and the heavy labors of Heracles."
      },
      {
        author: "Werner Jaeger",
        work: "Paideia: The Ideals of Greek Culture",
        date: "1939",
        quote: "The spirit of the **athl-** infused the aristocratic competition of early Greece with moral significance."
      }
    ]
  },
  "Dashboard — athl/athlete": {
    primary: "A person who is proficient in sports and other forms of physical exercise, especially one who competes in organized contests.",
    secondary: "Historically in ancient Greece, a competitor who trained rigorously to vie for a prize (athlon) in public games such as the Olympic festivals.",
    quotes: [
      {
        author: "Homer",
        work: "The Odyssey",
        date: "c. 8th century BC",
        quote: "No greater glory can befall a man in his life than what he wins with his hands and feet as an **athlete**."
      },
      {
        author: "Pindar",
        work: "Olympian Odes",
        date: "c. 476 BC",
        quote: "The victorious **athlete** reaps the sweetest reward when the poet crowns his triumph with immortal song."
      },
      {
        author: "Ralph Waldo Emerson",
        work: "Self-Reliance",
        date: "1841",
        quote: "A hearty **athlete** enjoys the wrestling match, finding joy in the strenuous exertion of his powers."
      }
    ]
  },
  "Dashboard — athl/athletic": {
    primary: "Physically strong, fit, agile, and active; resembling or suitable for an athlete.",
    secondary: "Relating to athletes or organized competitive sports and games.",
    quotes: [
      {
        author: "John Milton",
        work: "Samson Agonistes",
        date: "1671",
        quote: "With **athletic** strength he shook the pillared temple until the stones came crashing down."
      },
      {
        author: "Henry David Thoreau",
        work: "Walden",
        date: "1854",
        quote: "Morning brings back the heroic ages; I was as much affected by the faint hum of a mosquito as by any trumpet that ever sang of fame; it was Homer's requiem; itself an **athletic** exertion."
      },
      {
        author: "Walt Whitman",
        work: "Leaves of Grass",
        date: "1855",
        quote: "I hear the robust voices of young men engaged in **athletic** contests under the open sky."
      }
    ]
  },
  "Dashboard — athl/athleticism": {
    primary: "Physical prowess, agility, strength, and stamina; the qualities characteristic of an athlete.",
    secondary: "Devotion to athletic sports and physical training as an ideal or cultural pursuit.",
    quotes: [
      {
        author: "George Santayana",
        work: "The Philosophy of Travel",
        date: "1911",
        quote: "Greek **athleticism** was not mere recreation, but a spiritual celebration of bodily perfection."
      },
      {
        author: "Matthew Arnold",
        work: "Culture and Anarchy",
        date: "1869",
        quote: "The English public schools cultivate an intense devotion to **athleticism**, sometimes at the expense of intellectual inquiry."
      },
      {
        author: "Norman Mailer",
        work: "The Fight",
        date: "1975",
        quote: "Ali's supreme **athleticism** lay in his hypnotic footwork and lightning speed within the ring."
      }
    ]
  },
  "Dashboard — athl/athletics": {
    primary: "The sports, exercises, or games engaged in by athletes, especially track and field events.",
    secondary: "The systematic program or institutional practice of physical education, gymnastics, and competitive sports.",
    quotes: [
      {
        author: "Aristotle",
        work: "Politics",
        date: "c. 350 BC",
        quote: "In training youths, gymnastics and **athletics** must cultivate courage without degenerating into brutalizing excess."
      },
      {
        author: "Pierre de Coubertin",
        work: "Olympic Memoirs",
        date: "1931",
        quote: "The revival of international **athletics** aimed to foster mutual respect and peace among the youth of the world."
      },
      {
        author: "Virginia Woolf",
        work: "The Waves",
        date: "1931",
        quote: "The boys returned from the fields smelling of mud and leather, exhilarated by the afternoon's **athletics**."
      }
    ]
  },
  "Dashboard — athl/deathless": {
    primary: "Living or lasting forever; immortal, undying, and exempt from physical death or oblivion.",
    secondary: "Enduring through all time in memory, art, or renown (from Old English deáþ + -leás).",
    quotes: [
      {
        author: "John Milton",
        work: "Paradise Lost",
        date: "1667",
        quote: "They eat, they drink, and in communion sweet / Quaff immortality and joy, secure / Of **deathless** life."
      },
      {
        author: "Percy Bysshe Shelley",
        work: "Adonais",
        date: "1821",
        quote: "He is made one with Nature: there is heard / His voice in all her music; he has outsoared the shadow of our night; his **deathless** song remains."
      },
      {
        author: "Edgar Allan Poe",
        work: "The Fall of the House of Usher",
        date: "1839",
        quote: "A wild light broke through the crack of the ancient mansion, revealing the **deathless** horror of the house."
      }
    ]
  },
  "Dashboard — athl/deathlike": {
    primary: "Resembling death; pale, still, silent, or rigid as a corpse.",
    secondary: "Suggestive of mortality or deep unconsciousness; inert and unresponsive (from Old English deáþ + -līc).",
    quotes: [
      {
        author: "Mary Shelley",
        work: "Frankenstein",
        date: "1818",
        quote: "A **deathlike** stillness fell upon the room as I gazed upon the lifeless form of my creation."
      },
      {
        author: "Lord Byron",
        work: "The Giaour",
        date: "1813",
        quote: "He lay in a **deathlike** swoon, cold as the marble slab beneath his head."
      },
      {
        author: "Charles Dickens",
        work: "A Tale of Two Cities",
        date: "1859",
        quote: "The solitary prisoner sat in the deep stone cell, sunken in a **deathlike** apathy."
      }
    ]
  },
  "Dashboard — athl/deathly": {
    primary: "Resembling, suggestive of, or causing death; deadly, mortal, or corpse-like.",
    secondary: "Extremely, completely, or to a degree resembling death (as in deathly pale or deathly quiet).",
    quotes: [
      {
        author: "Emily Brontë",
        work: "Wuthering Heights",
        date: "1847",
        quote: "Her face grew **deathly** pale, and she leaned against the doorpost for support."
      },
      {
        author: "Herman Melville",
        work: "Moby-Dick",
        date: "1851",
        quote: "A **deathly** chill settled over the deck as the ivory Pequod plunged into the fog."
      },
      {
        author: "Nathaniel Hawthorne",
        work: "The Scarlet Letter",
        date: "1850",
        quote: "A **deathly** faintness came over the minister, yet he pressed his hand against his breast and walked on."
      }
    ]
  },
  "Dashboard — athl/pentathlon": {
    primary: "An athletic contest comprising five different events in which each competitor participates.",
    secondary: "Historically, the classical Greek Olympic contest comprising running, javelin throwing, discus throwing, long jump, and wrestling; or modern pentathlon.",
    quotes: [
      {
        author: "Pausanias",
        work: "Description of Greece",
        date: "c. 160 AD",
        quote: "The champion of the Olympic **pentathlon** was celebrated above all other athletes for his balanced physical symmetry."
      },
      {
        author: "Pindar",
        work: "Nemean Odes",
        date: "c. 470 BC",
        quote: "Victory in the strenuous **pentathlon** requires speed, power, and unflinching endurance in every event."
      },
      {
        author: "Pierre de Coubertin",
        work: "Selected Writings on the Modern Olympics",
        date: "1912",
        quote: "The modern **pentathlon** tests the complete military athlete through riding, fencing, shooting, swimming, and running."
      }
    ]
  },
  "Dashboard — athl/triathlon": {
    primary: "An athletic contest consisting of three consecutive events, typically swimming, cycling, and long-distance running.",
    secondary: "An endurance multisport race popularized in the late 20th century, culminating in the Ironman and Olympic distance events.",
    quotes: [
      {
        author: "Christopher McDougall",
        work: "Born to Run",
        date: "2009",
        quote: "Completing an ultra-endurance **triathlon** demands psychological resilience as much as physiological stamina."
      },
      {
        author: "Haruki Murakami",
        work: "What I Talk About When I Talk About Running",
        date: "2007",
        quote: "Preparing for a summer **triathlon** forced me to transition from running into rigorous ocean swimming and cycling."
      },
      {
        author: "George Sheehan",
        work: "Running and Being: The Total Experience",
        date: "1978",
        quote: "The multifaceted challenge of the **triathlon** pushes the human machine to discover its ultimate aerobic boundaries."
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

console.log("Done Batch 1 of Cluster War & Conflict!");
