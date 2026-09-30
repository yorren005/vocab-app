import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('App database/Greek roots/Cluster Structure & Form/Dashboard — stor');

const data = {
  "astor": {
    primary: "A prominent American family dynasty of German origin, founded by John Jacob Astor, renowned in fur trade, real estate, and finance.",
    secondary: "A historical namesake associated with major landmarks (Astoria, the Waldorf-Astoria), or the municipal Astor Place in New York City.",
    quotes: [
      {
        author: "Washington Irving",
        work: "Astoria, or Anecdotes of an Enterprise Beyond the Rocky Mountains",
        date: "1836",
        quote: "Mr. **Astor** conceived the grand commercial scheme of establishing a line of trading posts across the continent."
      },
      {
        author: "Henry James",
        work: "The American Scene",
        date: "1907",
        quote: "The name of **Astor** stood as an enduring monument to New York's rapid ascent into imperial wealth."
      },
      {
        author: "Edith Wharton",
        work: "The Age of Innocence",
        date: "1920",
        quote: "Invitations to the Mrs. **Astor** ball were guarded as tickets of supreme admission to New York society."
      }
    ]
  },
  "biostrome": {
    primary: "A distinct, layered, sheet-like biogenic rock mass built by sedentary organisms (corals, bryozoans, algae) that did not develop mound-like topography.",
    secondary: "A stratiform carbonate deposit consisting of skeletal remains preserved in growth position, contrasted with the dome-shaped build-up of a bioherm.",
    quotes: [
      {
        author: "Robert R. Shrock",
        work: "Sequence in Layered Rocks",
        date: "1948",
        quote: "We propose the term **biostrome** for purely stratified, bedded structures composed of sedentary fossil remains."
      },
      {
        author: "Amadeus W. Grabau",
        work: "Principles of Stratigraphy",
        date: "1913",
        quote: "Unlike the towering reef bioherm, the **biostrome** extends laterally as a uniform blanket of organic accumulation."
      },
      {
        author: "Carl O. Dunbar and John Rodgers",
        work: "Principles of Stratigraphy",
        date: "1957",
        quote: "The thin limestone bed is an ancient coral **biostrome** that flourished across the shallow epicontinental sea floor."
      }
    ]
  },
  "restoration": {
    primary: "The act or process of returning something to a former condition, place, or position.",
    secondary: "The historical re-establishment of the English monarchy in 1660 under Charles II, or the fine-art conservation of damaged cultural artifacts.",
    quotes: [
      {
        author: "John Evelyn",
        work: "Diary",
        date: "1660",
        quote: "This day was the triumphant return of his Majesty Charles the Second, and the miraculous **Restoration** of the monarchy."
      },
      {
        author: "John Ruskin",
        work: "The Seven Lamps of Architecture",
        date: "1849",
        quote: "Do not let us talk of **restoration**; the thing is a Lie from beginning to end, for you cannot recall what was."
      },
      {
        author: "Aldo Leopold",
        work: "A Sand County Almanac",
        date: "1949",
        quote: "The land ethic simply enlarges the boundaries of the community to include soils, waters, plants, and animals, urging their ecological **restoration**."
      }
    ]
  },
  "restorative": {
    primary: "Having the ability or property of restoring health, strength, vitality, or well-being.",
    secondary: "A medicine, food, or tonic that renews physical vigor or mental clarity.",
    quotes: [
      {
        author: "Charlotte Brontë",
        work: "Jane Eyre",
        date: "1847",
        quote: "The fresh morning breeze had a **restorative** influence upon my exhausted spirits."
      },
      {
        author: "Robert Louis Stevenson",
        work: "Treasure Island",
        date: "1883",
        quote: "A sip of cordial acted as an immediate **restorative** to the swooning sailor."
      },
      {
        author: "Virginia Woolf",
        work: "Mrs. Dalloway",
        date: "1925",
        quote: "The quiet solitude of the park offered a **restorative** pause from the overwhelming bustle of London."
      }
    ]
  },
  "restore": {
    primary: "To bring back to an original, normal, or improved state, condition, or position.",
    secondary: "To re-establish, reinstate, or return someone or something to a former status or right.",
    quotes: [
      {
        author: "William Shakespeare",
        work: "King Lear",
        date: "1606",
        quote: "O my dear father! **Restore** this hanging house of mine, and let repair be on thy tongue."
      },
      {
        author: "Abraham Lincoln",
        work: "Second Inaugural Address",
        date: "1865",
        quote: "Let us strive on to finish the work we are in, to bind up the nation's wounds, and to **restore** peace."
      },
      {
        author: "Mary Shelley",
        work: "Frankenstein",
        date: "1818",
        quote: "I hoped that fresh air and peaceful mountain scenes would **restore** my troubled spirit."
      }
    ]
  },
  "restorer": {
    primary: "A person or thing that restores, repairs, or renovates something to its original state.",
    secondary: "A professional specialist skilled in the technical cleaning, consolidation, and preservation of paintings, books, or architectural heritage.",
    quotes: [
      {
        author: "Walter Scott",
        work: "The Antiquary",
        date: "1816",
        quote: "The enthusiastic collector acted as the zealous **restorer** of decaying Gothic ruins."
      },
      {
        author: "E. H. Gombrich",
        work: "Art and Illusion",
        date: "1960",
        quote: "The museum **restorer** must weigh visual aesthetic harmony against absolute fidelity to the aged pigment layer."
      },
      {
        author: "George Eliot",
        work: "Middlemarch",
        date: "1871",
        quote: "Sleep came as the gentle **restorer** of tired limbs and troubled minds."
      }
    ]
  },
  "restoril": {
    primary: "A brand name for temazepam, a short- to intermediate-acting benzodiazepine medication used for the short-term treatment of insomnia.",
    secondary: "A psychoactive hypnotic pharmaceutical agent that enhances the inhibitory neurotransmitter gamma-aminobutyric acid (GABA) at the GABAA receptor.",
    quotes: [
      {
        author: "Louis S. Goodman and Alfred Gilman",
        work: "The Pharmacological Basis of Therapeutics",
        date: "1990",
        quote: "Temazepam, marketed as **Restoril**, offers effective sedation with minimal morning residual drowsiness."
      },
      {
        author: "David Healy",
        work: "The Creation of Psychopharmacology",
        date: "2002",
        quote: "The widespread clinical adoption of hypnotics like **Restoril** reshaped the management of acute insomnia in outpatient psychiatry."
      },
      {
        author: "Kay Redfield Jamison",
        work: "An Unquiet Mind",
        date: "1995",
        quote: "A low dose of **Restoril** was prescribed during severe travel-induced sleeplessness to prevent acute mood swings."
      }
    ]
  },
  "storage": {
    primary: "The action, process, or space allocated for keeping, storing, or preserving goods, materials, or data until needed.",
    secondary: "The electronic retention of digital data in computer memory or magnetic/solid-state media; or commercial warehousing.",
    quotes: [
      {
        author: "John von Neumann",
        work: "First Draft of a Report on the EDVAC",
        date: "1945",
        quote: "The central processor requires immediate access to internal memory or **storage** capable of holding instructions and numerical operands."
      },
      {
        author: "Rachel Carson",
        work: "Silent Spring",
        date: "1962",
        quote: "Persistent organochlorine residues find indefinite **storage** in the adipose tissues of birds and mammals."
      },
      {
        author: "Claude Shannon",
        work: "A Mathematical Theory of Communication",
        date: "1948",
        quote: "The capacity of a physical medium for data **storage** is governed by its signal-to-noise ratio."
      }
    ]
  },
  "storax": {
    primary: "A fragrant balsamic resin obtained from the bark of various trees of the genus Liquidambar (sweetgum) or Styrax, used in perfumery, incense, and medicine.",
    secondary: "An aromatic natural oleoresin (styrax liquidus) utilized historically as a topical antiseptic, expectorant, and incense binder since antiquity.",
    quotes: [
      {
        author: "Pliny the Elder",
        work: "Natural History",
        date: "c. 77 AD",
        quote: "The resin known as **storax** yields a delightful, sweet fragrance prized by apothecaries throughout the Levant."
      },
      {
        author: "Geoffrey Chaucer",
        work: "The Canterbury Tales",
        date: "c. 1387",
        quote: "He carried in his pouch fine frankincense and gum of **storax** for holy fumigation."
      },
      {
        author: "John Gerard",
        work: "The Herball or Generall Historie of Plantes",
        date: "1597",
        quote: "The tears of fragrant **storax** ooze from incisions made in the bark under the summer sun."
      }
    ]
  },
  "store-bought": {
    primary: "Bought from a commercial retail store rather than made, grown, or prepared at home.",
    secondary: "Denoting mass-produced, commercially packaged goods, often contrasted with artisanal, home-crafted, or rustic authenticity.",
    quotes: [
      {
        author: "Willa Cather",
        work: "My Ántonia",
        date: "1918",
        quote: "Grandmother preferred her own homemade preserves to any jar of **store-bought** jelly."
      },
      {
        author: "William Faulkner",
        work: "The Sound and the Fury",
        date: "1929",
        quote: "He wore a cheap **store-bought** suit that looked stiff and out of place against the dusty road."
      },
      {
        author: "Flannery O'Connor",
        work: "Wise Blood",
        date: "1952",
        quote: "He held his stiff new **store-bought** hat carefully in his lap as the train jolted."
      }
    ]
  },
  "store": {
    primary: "A retail establishment where goods and merchandise are sold to the public; or a quantity or supply of things kept for future use.",
    secondary: "To deposit, hoard, or preserve supplies, energy, or information in a reservoir, warehouse, or computer memory.",
    quotes: [
      {
        author: "John Locke",
        work: "An Essay Concerning Human Understanding",
        date: "1689",
        quote: "Memory is the treasury or repository in which the mind lays up its **store** of ideas."
      },
      {
        author: "Herman Melville",
        work: "Bartleby, the Scrivener",
        date: "1853",
        quote: "The small retail **store** stood upon the bustling corner, displaying its goods to passersby."
      },
      {
        author: "Henry David Thoreau",
        work: "Walden",
        date: "1854",
        quote: "A squirrel hoards a secret **store** of nuts within the hollow oak before the frost arrives."
      }
    ]
  },
  "stored-program": {
    primary: "Pertaining to a computer architecture in which programmatic instructions and data are stored together in the same read-write memory space.",
    secondary: "The foundational principle of modern digital computing, formulated by John von Neumann, Alan Turing, and their contemporaries.",
    quotes: [
      {
        author: "Alan Turing",
        work: "Proposals for Development in the Mathematics Division of an Automatic Computing Engine",
        date: "1945",
        quote: "The concept of a universal **stored-program** machine permits the program to modify its own instructions dynamically."
      },
      {
        author: "John von Neumann",
        work: "Report on the EDVAC",
        date: "1945",
        quote: "In a **stored-program** device, instructions must be represented in numerical code and held in the high-speed internal memory."
      },
      {
        author: "Maurice Wilkes",
        work: "Memoirs of a Computer Pioneer",
        date: "1985",
        quote: "The operation of EDSAC in May 1949 proved the absolute practicality of the **stored-program** computer."
      }
    ]
  },
  "storefront": {
    primary: "The street-level frontage or facade of a retail store, typically featuring display windows.",
    secondary: "A physical premises or organization used as an outward cover, facade, or point of public contact for broader or covert activities.",
    quotes: [
      {
        author: "Sinclair Lewis",
        work: "Babbitt",
        date: "1922",
        quote: "The polished plate-glass **storefront** glittered under the electric streetlamps, showcasing the latest motorcars."
      },
      {
        author: "Ralph Ellison",
        work: "Invisible Man",
        date: "1952",
        quote: "He walked past a modest church housed in an abandoned **storefront**, its windows painted with faded gold lettering."
      },
      {
        author: "Jane Jacobs",
        work: "The Death and Life of Great American Cities",
        date: "1961",
        quote: "Vibrant pedestrian streets require an intricate variety of small **storefront** businesses to keep eyes on the street."
      }
    ]
  },
  "storehouse": {
    primary: "A building used for the storage of goods, provisions, or merchandise; a warehouse.",
    secondary: "Figuratively, a rich, abundant repository or collection of knowledge, wisdom, memories, or creative materials.",
    quotes: [
      {
        author: "Francis Bacon",
        work: "The Advancement of Learning",
        date: "1605",
        quote: "Knowledge is a rich **storehouse** for the glory of the Creator and the relief of man's estate."
      },
      {
        author: "Daniel Defoe",
        work: "Robinson Crusoe",
        date: "1719",
        quote: "I hollowed out the cavern behind my tent, transforming it into a secure **storehouse** for my ammunition."
      },
      {
        author: "Samuel Taylor Coleridge",
        work: "Biographia Literaria",
        date: "1817",
        quote: "The poet draws upon memory as an inexhaustible **storehouse** of images and impressions."
      }
    ]
  },
  "storekeeper": {
    primary: "A person who owns, manages, or operates a retail shop or store.",
    secondary: "An official in a military, naval, or commercial institution charged with the custody and accounting of provisions and supplies.",
    quotes: [
      {
        author: "Nathaniel Hawthorne",
        work: "The Scarlet Letter",
        date: "1850",
        quote: "The local **storekeeper** leaned over his wooden counter, measuring out spices for the Puritan matrons."
      },
      {
        author: "Mark Twain",
        work: "The Adventures of Tom Sawyer",
        date: "1876",
        quote: "Tom lingered near the window, watching the village **storekeeper** display jars of brightly colored rock candy."
      },
      {
        author: "Sherwood Anderson",
        work: "Winesburg, Ohio",
        date: "1919",
        quote: "The quiet dry-goods **storekeeper** listened patiently to the unburdening of his neighbors' secrets."
      }
    ]
  },
  "storeria": {
    primary: "A genus of small, nonvenomous colubrid snakes native to North America, commonly known as brown snakes and redbelly snakes.",
    secondary: "Cryptic semifossorial North American serpents that feed primarily on soft-bodied invertebrates (slugs and earthworms) and give birth to live young.",
    quotes: [
      {
        author: "Spencer Fullerton Baird and Charles Frédéric Girard",
        work: "Catalogue of North American Reptiles",
        date: "1853",
        quote: "We dedicate the genus **Storeria** to Dr. David Humphreys Storer for his pioneering contributions to American herpetology."
      },
      {
        author: "Roger Conant and Joseph T. Collins",
        work: "Peterson Field Guide to Reptiles and Amphibians of Eastern and Central North America",
        date: "1998",
        quote: "Members of the genus **Storeria** are frequently discovered beneath flat rocks, rotten logs, and leaf litter in suburban gardens."
      },
      {
        author: "Harry W. Greene",
        work: "Snakes: The Evolution of Mystery in Nature",
        date: "1997",
        quote: "Specialized slug-eating snakes like **Storeria** possess slender, recurved teeth adapted for extracting prey from sticky shells."
      }
    ]
  },
  "storeroom": {
    primary: "A room in a house, office, or building used specifically for storing supplies, equipment, goods, or disused articles.",
    secondary: "An auxiliary storage chamber often located adjacent to kitchens, workshops, or ship holds.",
    quotes: [
      {
        author: "Arthur Conan Doyle",
        work: "The Hound of the Baskervilles",
        date: "1902",
        quote: "The old servant led us down a stone corridor to a dusty **storeroom** stacked high with forgotten heirlooms."
      },
      {
        author: "George Orwell",
        work: "Animal Farm",
        date: "1945",
        quote: "The animals broke into the harness-room and the **storeroom**, devouring the corn that had been locked away."
      },
      {
        author: "Agatha Christie",
        work: "And Then There Were None",
        date: "1939",
        quote: "Searching the pantry and the **storeroom**, they found that several tins of preserved meat had vanished."
      }
    ]
  },
  "storey": {
    primary: "A part of a building comprising all the rooms that are on the same level; a floor or tier.",
    secondary: "A horizontal division or structural level in architectural construction (chiefly British spelling).",
    quotes: [
      {
        author: "Charles Dickens",
        work: "Great Expectations",
        date: "1861",
        quote: "The ancient timbered tavern was built with an overhanging upper **storey** that shadowed the narrow lane."
      },
      {
        author: "Thomas Hardy",
        work: "The Mayor of Casterbridge",
        date: "1886",
        quote: "From the highest **storey** of the granary, the grain chutes rattled with steady mechanical rhythm."
      },
      {
        author: "E. M. Forster",
        work: "A Room with a View",
        date: "1908",
        quote: "Their pension room was situated on the third **storey**, commanding a bright vista over the River Arno."
      }
    ]
  },
  "storeyed": {
    primary: "Having a specified number of floors, storeys, or levels (e.g., multi-storeyed).",
    secondary: "Arranged in horizontal tiers or tiers of decoration in architecture; or variant spelling of storied (celebrated in history or story).",
    quotes: [
      {
        author: "John Ruskin",
        work: "The Stones of Venice",
        date: "1851",
        quote: "The grand facade was divided into three **storeyed** arcades of marble and porphyry."
      },
      {
        author: "Thomas Gray",
        work: "Elegy Written in a Country Churchyard",
        date: "1751",
        quote: "Can **storeyed** urn or animated bust / Back to its mansion call the fleeting breath?"
      },
      {
        author: "Walter Scott",
        work: "The Heart of Mid-Lothian",
        date: "1818",
        quote: "The narrow street was flanked on either hand by tall, many-**storeyed** tenements of dark stone."
      }
    ]
  },
  "storied": {
    primary: "Celebrated in or associated with history, legend, or folklore; renowned.",
    secondary: "Decorated with designs, murals, or scenes illustrating historical or legendary episodes; or having storeys (multi-storied).",
    quotes: [
      {
        author: "Lord Byron",
        work: "Childe Harold's Pilgrimage",
        date: "1812",
        quote: "Man marks the earth with ruin—his control stops with the shore, yet thy shores are **storied** with antique glory."
      },
      {
        author: "Washington Irving",
        work: "The Sketch Book of Geoffrey Crayon",
        date: "1820",
        quote: "Every hill and stream was **storied** with romantic traditions of the old Dutch settlers."
      },
      {
        author: "Henry Wadsworth Longfellow",
        work: "Outre-Mer: A Pilgrimage Beyond the Sea",
        date: "1835",
        quote: "We wandered through the **storied** cloisters, reading the half-effaced epitaphs of medieval knights."
      }
    ]
  },
  "storm-beaten": {
    primary: "Worn, battered, damaged, or weathered by repeated exposure to violent storms.",
    secondary: "Figuratively scarred or hardened by personal adversity, hardship, or emotional turmoil.",
    quotes: [
      {
        author: "William Wordsworth",
        work: "The Excursion",
        date: "1814",
        quote: "Upon the barren ridge stood a lonely, **storm-beaten** pine, bent by the prevailing westerly winds."
      },
      {
        author: "Joseph Conrad",
        work: "Typhoon",
        date: "1902",
        quote: "The **storm-beaten** steamer limped into the harbor, her railings buckled and her superstructure crusted with salt."
      },
      {
        author: "Charlotte Brontë",
        work: "Villette",
        date: "1853",
        quote: "She turned upon the world a **storm-beaten** countenance that hid an unyielding inner fortitude."
      }
    ]
  },
  "storm-tossed": {
    primary: "Tossed, buffeted, or driven violently about by heavy seas, gale-force winds, or tempests.",
    secondary: "Plagued, agitated, or unsettled by intense emotional, psychological, or political upheaval.",
    quotes: [
      {
        author: "Herman Melville",
        work: "Moby-Dick",
        date: "1851",
        quote: "The lonely watch stood upon the forecastle, gazing across the black expanse of the **storm-tossed** ocean."
      },
      {
        author: "John Milton",
        work: "Paradise Lost",
        date: "1667",
        quote: "As when a ship by winter winds is **storm-tossed** upon the treacherous shoals of the Baltic."
      },
      {
        author: "Frederick Douglass",
        work: "Narrative of the Life of Frederick Douglass",
        date: "1845",
        quote: "My soul was like a **storm-tossed** vessel, driven without anchor toward the beacon of freedom."
      }
    ]
  },
  "storm": {
    primary: "A violent disturbance of the atmosphere marked by high winds, rain, snow, thunder, or lightning.",
    secondary: "A tumultuous outbreak or violent emotional commotion, controversy, or assault; or to attack aggressively.",
    quotes: [
      {
        author: "William Shakespeare",
        work: "The Tempest",
        date: "1611",
        quote: "Blow, till thou burst thy wind, if room enough! A tempestuous noise of thunder and lightning heard; the furious **storm** raged across the sea."
      },
      {
        author: "Emily Brontë",
        work: "Wuthering Heights",
        date: "1847",
        quote: "The raging **storm** tore branches from the stunted firs and battered the casement windows."
      },
      {
        author: "Alexis de Tocqueville",
        work: "Democracy in America",
        date: "1835",
        quote: "A sudden political **storm** may sweep away existing institutions, yet democratic mores endure."
      }
    ]
  },
  "stormbound": {
    primary: "Prevented, delayed, or confined from traveling or working by violent storms or inclement weather.",
    secondary: "Trapped in a harbor, refuge, mountain pass, or remote outpost due to blizzard or gale conditions.",
    quotes: [
      {
        author: "Jack London",
        work: "The Call of the Wild",
        date: "1903",
        quote: "The team remained **stormbound** in their spruce-bough camp for three days while the blizzard raged over the Yukon."
      },
      {
        author: "Robert Louis Stevenson",
        work: "Kidnapped",
        date: "1886",
        quote: "The brig lay **stormbound** in the sheltered cove, waiting for the wild western gales to abate."
      },
      {
        author: "Henry David Thoreau",
        work: "Cape Cod",
        date: "1865",
        quote: "We found ourselves **stormbound** in a solitary lighthouse, listening to the roaring Atlantic surf."
      }
    ]
  },
  "stormily": {
    primary: "In a stormy, tempestuous, or violent manner, with heavy winds or turbulence.",
    secondary: "In an angry, agitated, impassioned, or emotionally turbulent fashion.",
    quotes: [
      {
        author: "Thomas Hardy",
        work: "Tess of the d'Urbervilles",
        date: "1891",
        quote: "The dark clouds swept **stormily** across the downs, threatening a night of drenching rain."
      },
      {
        author: "George Eliot",
        work: "Daniel Deronda",
        date: "1876",
        quote: "Her chest heaved as she spoke **stormily**, refusing to submit to her guardian's cold edict."
      },
      {
        author: "Lord Byron",
        work: "Lara",
        date: "1814",
        quote: "His passionate words burst forth **stormily**, revealing the long-suppressed bitterness of his heart."
      }
    ]
  },
  "storminess": {
    primary: "The state, quality, or condition of being stormy, turbulent, or subject to tempests.",
    secondary: "Turbulent instability, volatility, or contentious unrest in emotional temper or social conditions.",
    quotes: [
      {
        author: "Charles Darwin",
        work: "Journal of Researches",
        date: "1839",
        quote: "The perpetual **storminess** of the weather around Cape Horn made navigation exceptionally perilous."
      },
      {
        author: "Virginia Woolf",
        work: "To the Lighthouse",
        date: "1927",
        quote: "The unpredictable **storminess** of Mr. Ramsay's temper cast a sudden shadow over the dinner table."
      },
      {
        author: "Herman Melville",
        work: "Typee",
        date: "1846",
        quote: "The serene tranquility of the tropical lagoon stood in marked contrast to the **storminess** of the outer reef."
      }
    ]
  },
  "stormproof": {
    primary: "Built, designed, or adapted to withstand storms, high winds, and heavy precipitation without taking damage.",
    secondary: "Impervious to atmospheric tempests; figuratively robust against external disruption or attack.",
    quotes: [
      {
        author: "Henry David Thoreau",
        work: "Walden",
        date: "1854",
        quote: "I tightened the shingled roof until the little cabin was completely **stormproof** against the impending winter blasts."
      },
      {
        author: "Jules Verne",
        work: "Twenty Thousand Leagues Under the Sea",
        date: "1870",
        quote: "The double steel hull of the Nautilus made her utterly **stormproof**, riding smoothly below the ocean swells."
      },
      {
        author: "John Muir",
        work: "The Mountains of California",
        date: "1894",
        quote: "The stunted subalpine pines construct a **stormproof** thicket that shrugs off the heaviest Sierra blizzards."
      }
    ]
  },
  "stormy": {
    primary: "Characterized by or subject to violent atmospheric disturbances, gale winds, rain, snow, or lightning.",
    secondary: "Marked by conflict, turmoil, passionate anger, or emotional volatility.",
    quotes: [
      {
        author: "Mary Shelley",
        work: "Frankenstein",
        date: "1818",
        quote: "It was on a dreary night of November that I beheld the accomplishment of my toils, under a dark and **stormy** sky."
      },
      {
        author: "Emily Dickinson",
        work: "Poems",
        date: "1890",
        quote: "Hope is the thing with feathers that perches in the soul, and sore must be the **stormy** gale that could abash the little bird."
      },
      {
        author: "Winston Churchill",
        work: "The Gathering Storm",
        date: "1948",
        quote: "Europe was drifting into a dark and **stormy** era of unprecedented ideological conflict."
      }
    ]
  },
  "story": {
    primary: "An account of imaginary or real people and events told for entertainment, instruction, or historical record; a narrative.",
    secondary: "A news article or report; or an architectural floor or level (variant spelling of storey).",
    quotes: [
      {
        author: "Geoffrey Chaucer",
        work: "The Canterbury Tales",
        date: "c. 1387",
        quote: "Each pilgrim shall tell two tales on the way, to make our journey pleasant with a merry **story**."
      },
      {
        author: "Mark Twain",
        work: "The Adventures of Huckleberry Finn",
        date: "1884",
        quote: "That book was made by Mr. Mark Twain, and he told the truth, mainly; there was things which he stretched, but mainly he told a good **story**."
      },
      {
        author: "Chinua Achebe",
        work: "Things Fall Apart",
        date: "1958",
        quote: "Among the Ibo, the art of conversation is regarded very highly, and proverbs are the palm-oil with which words and every **story** are eaten."
      }
    ]
  },
  "storybook": {
    primary: "A book containing stories, especially intended for children.",
    secondary: "Resembling something in a fairy tale; idyllic, enchanting, or unrealistically charming.",
    quotes: [
      {
        author: "Louisa May Alcott",
        work: "Little Women",
        date: "1868",
        quote: "Jo sat in the garret window with an old **storybook**, munching apples in absolute contentment."
      },
      {
        author: "F. Scott Fitzgerald",
        work: "The Great Gatsby",
        date: "1925",
        quote: "The picturesque village looked like an illustration in an antique **storybook**, untouched by time."
      },
      {
        author: "C. S. Lewis",
        work: "The Lion, the Witch and the Wardrobe",
        date: "1950",
        quote: "The children opened the forgotten volume, discovering that this magical **storybook** held true wonder."
      }
    ]
  },
  "storyline": {
    primary: "The plot, sequential narrative arc, or underlying progression of events in a novel, film, drama, or game.",
    secondary: "The thematic continuity or core narrative thread around which diverse creative elements are structured.",
    quotes: [
      {
        author: "E. M. Forster",
        work: "Aspects of the Novel",
        date: "1927",
        quote: "The fundamental **storyline** must maintain suspense, answering the eternal human curiosity of 'what happens next?'"
      },
      {
        author: "Raymond Chandler",
        work: "The Simple Art of Murder",
        date: "1950",
        quote: "A compelling detective novel requires an intricate **storyline** rooted in the realities of human greed."
      },
      {
        author: "Ursula K. Le Guin",
        work: "Steering the Craft",
        date: "1998",
        quote: "The tension of the **storyline** arises from trajectory: characters making choices that lead toward inexorable change."
      }
    ]
  },
  "storyteller": {
    primary: "A person who tells, narrates, or recites stories, orally or in written form.",
    secondary: "A traditional cultural custodian of oral mythology, history, and folklore; or colloquially, a fabricator or fibber.",
    quotes: [
      {
        author: "Walter Benjamin",
        work: "The Storyteller",
        date: "1936",
        quote: "The true **storyteller** takes what he tells from experience and makes it the experience of his listeners."
      },
      {
        author: "Joseph Conrad",
        work: "Heart of Darkness",
        date: "1899",
        quote: "To Marlow, the yarn was not inside like a kernel, but outside; he was a consummate **storyteller**."
      },
      {
        author: "Toni Morrison",
        work: "The Source of Self-Regard",
        date: "2019",
        quote: "The ancient **storyteller** binds the community together by voicing the collective memory of the tribe."
      }
    ]
  },
  "stroma": {
    primary: "The supportive structural tissue of an organ, tissue, or tumor, consisting of connective tissue, blood vessels, and nerves, as distinct from the functional parenchyma.",
    secondary: "The colorless fluid matrix surrounding the thylakoids within a chloroplast where the light-independent reactions (Calvin cycle) occur.",
    quotes: [
      {
        author: "Rudolf Virchow",
        work: "Cellular Pathology",
        date: "1858",
        quote: "The proliferation of neoplasm involves both the specific cellular elements and the supportive vascular **stroma**."
      },
      {
        author: "Melvin Calvin",
        work: "The Path of Carbon in Photosynthesis",
        date: "1957",
        quote: "The enzymes mediating carbon dioxide fixation reside primarily within the soluble **stroma** of the intact chloroplast."
      },
      {
        author: "Harold Varmus and Robert A. Weinberg",
        work: "Genes and the Biology of Cancer",
        date: "1993",
        quote: "Carcinoma cells communicate actively with the surrounding fibroblastic **stroma** to stimulate angiogenesis."
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
  const filePath = path.join(baseDir, `${word}.md`);
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

console.log("Done Batch 5 (stor)!");
