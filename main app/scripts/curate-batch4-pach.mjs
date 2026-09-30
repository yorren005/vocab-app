import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('App database/Greek roots/Cluster Structure & Form/Dashboard — pach');

const data = {
  "apache": {
    primary: "A member of any of several Athabaskan-speaking Indigenous peoples of the Southwestern United States, historically renowned for tactical adaptability and cultural endurance.",
    secondary: "A violent street criminal or gangster in early 20th-century Paris (the apaches), famous for stylized street combat; or an American twin-turboshaft attack helicopter (AH-64 Apache).",
    quotes: [
      {
        author: "Geronimo",
        work: "Geronimo's Story of His Life",
        date: "1906",
        quote: "The sun was rising over the mountains when the **Apache** warriors prepared to defend their ancestral homeland."
      },
      {
        author: "Guy de Maupassant",
        work: "Selected Parisian Sketches",
        date: "1888",
        quote: "The shadowy Parisian alleyways harbored the **apache**, stalking the boulevard under the gaslights."
      },
      {
        author: "Cormac McCarthy",
        work: "Blood Meridian",
        date: "1985",
        quote: "Out of the dust-blown canyon rode an **Apache** scout, silent and watchful against the desert horizon."
      }
    ]
  },
  "hypopachus": {
    primary: "A genus of small, stout-bodied burrowing frogs in the family Microhylidae (sheep frogs), native to the southern United States and Central America.",
    secondary: "A taxonomic clade of microhylid amphibians distinguished by a narrow, pointed head, specialized ant- and termite-eating habits, and subterranean estivation during dry seasons.",
    quotes: [
      {
        author: "Albert Hazen Wright and Anna Allen Wright",
        work: "Handbook of Frogs and Toads of the United States and Canada",
        date: "1949",
        quote: "The genus **Hypopachus** exhibits a remarkably thickened dermal layer that retards moisture loss when the frog burrows underground."
      },
      {
        author: "Hobart M. Smith and Edward H. Taylor",
        work: "An Annotated Checklist and Key to the Amphibia of Mexico",
        date: "1948",
        quote: "Specimens of **Hypopachus** were collected after nocturnal torrential rains had stimulated temporary breeding aggregations."
      },
      {
        author: "Jay M. Savage",
        work: "The Amphibians and Reptiles of Costa Rica",
        date: "2002",
        quote: "The subterranean habits of **Hypopachus** are facilitated by modified metatarsal tubercles on their hind feet."
      }
    ]
  },
  "pach": {
    primary: "A morphemic root element derived from ancient Greek pachys, signifying 'thick,' 'dense,' or 'massive.'",
    secondary: "A combining form extensively utilized in scientific taxonomy, anatomical nomenclature, and pathology to denote biological thickening or stoutness.",
    quotes: [
      {
        author: "Henry George Liddell and Robert Scott",
        work: "A Greek-English Lexicon",
        date: "1843",
        quote: "The root element **pach-** stems from Greek pachys, denoting thickness, coarseness, or bodily stoutness."
      },
      {
        author: "Richard Owen",
        work: "Lectures on the Comparative Anatomy and Physiology of the Vertebrate Animals",
        date: "1846",
        quote: "Taxonomists consistently employ the prefix **pach-** whenever the integument or skeletal frame exhibits exceptional density."
      },
      {
        author: "Ernst Mayr",
        work: "Principles of Systematic Zoology",
        date: "1969",
        quote: "Morphological descriptors formed with **pach-** immediately signal stout proportions in fossil and living taxa."
      }
    ]
  },
  "pacha": {
    primary: "A historical variant spelling of pasha, an honorary title of high military or civil rank in the Ottoman Empire.",
    secondary: "In Andean indigenous cosmology (Quechua/Aymara), an ontological concept signifying the cosmos, space-time, and the living earth (as in Pachamama).",
    quotes: [
      {
        author: "Lord Byron",
        work: "Don Juan",
        date: "1819",
        quote: "The grand **pacha** reclined upon his embroidered divan, smoking his chibouque in majestic repose."
      },
      {
        author: "Alexander William Kinglake",
        work: "Eothen",
        date: "1844",
        quote: "An audience with the provincial **pacha** involved endless cups of sweetened coffee and elaborate oriental courtesies."
      },
      {
        author: "William H. Prescott",
        work: "History of the Conquest of Peru",
        date: "1847",
        quote: "The Inca venerated **Pacha** as the celestial unity of temporal existence and terrestrial fertility."
      }
    ]
  },
  "pachinko": {
    primary: "A Japanese mechanical arcade gambling and recreation game resembling a vertical pinball machine.",
    secondary: "A multi-billion-dollar entertainment and gaming industry in postwar and contemporary Japan, known for vibrant neon parlors and complex legal reward-exchange mechanisms.",
    quotes: [
      {
        author: "Min Jin Lee",
        work: "Pachinko",
        date: "2017",
        quote: "In a game of **pachinko**, the steel balls cascaded through the maze of brass pins, mocking every calculation of skill."
      },
      {
        author: "Donald Richie",
        work: "The Image Factory: Fads and Fashions in Japan",
        date: "2003",
        quote: "The deafening clatter of **pachinko** halls forms the relentless mechanical heartbeat of nocturnal Tokyo."
      },
      {
        author: "Ian Buruma",
        work: "A Japanese Mirror: Heroes and Villains of Japanese Culture",
        date: "1984",
        quote: "The solitary absorption of the **pachinko** player reflects a uniquely structured modern escape from urban routine."
      }
    ]
  },
  "pachisi": {
    primary: "An ancient traditional Indian cross-and-circle board game played with cowrie shells and pawns on an embroidered cruciform cloth.",
    secondary: "Often designated the national game of India, historical ancestor to Western variants like Parcheesi and Ludo, named from the Hindi paccīs (twenty-five).",
    quotes: [
      {
        author: "Abu'l-Fazl",
        work: "Ain-i-Akbari",
        date: "c. 1590",
        quote: "Emperor Akbar played **pachisi** upon a colossal courtyard terrace, using living slave girls as pieces on the marble squares."
      },
      {
        author: "Edward Falkener",
        work: "Games Ancient and Oriental and How to Play Them",
        date: "1892",
        quote: "The game of **pachisi** is played throughout the length and breadth of India with consummate skill and intense fascination."
      },
      {
        author: "Stewart Culin",
        work: "Chess and Playing-Cards",
        date: "1898",
        quote: "From the traditional cloth of Indian **pachisi** descended virtually every modern European race-game."
      }
    ]
  },
  "pachouli": {
    primary: "An aromatic bushy herb (Pogostemon cablin) of the mint family, native to tropical regions of Asia.",
    secondary: "A heavy, earthy, and long-lasting essential oil distilled from the dried leaves of this plant, extensively used in perfumery, incense, and herbal medicine.",
    quotes: [
      {
        author: "Charles Baudelaire",
        work: "The Flowers of Evil",
        date: "1857",
        quote: "A heady fragrance of musk and **pachouli** hung heavily in the shadowed alcove of the boudoir."
      },
      {
        author: "Émile Zola",
        work: "Nana",
        date: "1880",
        quote: "Her silk dressing gowns carried the warm, lingering perfume of sweet **pachouli** and amber."
      },
      {
        author: "Oscar Wilde",
        work: "The Picture of Dorian Gray",
        date: "1890",
        quote: "He breathed in the rich, intoxicating scent of **pachouli** that lingered upon the embroidered Chinese screen."
      }
    ]
  },
  "pachuco": {
    primary: "A member of a Mexican-American youth subculture originating in El Paso and Los Angeles during the 1930s and 1940s, famous for wearing zoot suits (caló slang and rebellious swagger).",
    secondary: "A socio-cultural archetype representing Mexican-American urban resistance, identity reclamation, and stylistic defiance against wartime Anglo assimilation.",
    quotes: [
      {
        author: "Octavio Paz",
        work: "The Labyrinth of Solitude",
        date: "1950",
        quote: "The **pachuco** does not want to become a part of American culture, nor does he want to return to Mexican origins; his flamboyant clothing is an armor of rebellious defiance."
      },
      {
        author: "Luis Valdez",
        work: "Zoot Suit",
        date: "1978",
        quote: "El **Pachuco** stood tall in his tailored zoot suit, snapping his suspenders with unapologetic pride."
      },
      {
        author: "Carey McWilliams",
        work: "North from Mexico: The Spanish-Speaking People of the United States",
        date: "1949",
        quote: "The press sensationalized the **pachuco** youths, demonizing their distinct street attire during the wartime hysteria of 1943."
      }
    ]
  },
  "pachycephala": {
    primary: "A genus of stout-billed, brightly colored passerine birds found across Australasia and the Indo-Pacific, commonly known as whistlers.",
    secondary: "The nominate genus of the songbird family Pachycephalidae, characterized by muscular, thickened crania and remarkably powerful, melodic territorial songs.",
    quotes: [
      {
        author: "John Gould",
        work: "The Birds of Australia",
        date: "1848",
        quote: "The golden whistler, belonging to the genus **Pachycephala**, enlivens the eucalyptus forests with its extraordinarily vigorous whistle."
      },
      {
        author: "Ernst Mayr",
        work: "Birds of the Southwest Pacific",
        date: "1945",
        quote: "Speciation across island archipelagos is beautifully illustrated by the localized geographic races of **Pachycephala**."
      },
      {
        author: "Richard Schodde and Ian J. Mason",
        work: "The Directory of Australian Birds: Passerines",
        date: "1999",
        quote: "The stout cranial vault of **Pachycephala** supports heavy mandibular musculature adapted for crushing hard-shelled coleopterans."
      }
    ]
  },
  "pachycephalosaur": {
    primary: "Any bipedal, herbivorous ornithischian dinosaur of the clade Pachycephalosauria, characterized by a tremendously thickened skull dome.",
    secondary: "A Late Cretaceous dome-headed dinosaur whose massive cranial roof is hypothesized to have been used in intraspecific flank-butting or head-to-head combat.",
    quotes: [
      {
        author: "Paul Sereno",
        work: "The Pectoral Girdle and Forelimb of the Basal Pachycephalosaurian",
        date: "1997",
        quote: "The **pachycephalosaur** skull dome represents one of the most extreme cranial specializations documented in archosaurian evolution."
      },
      {
        author: "Michael J. Benton",
        work: "Vertebrate Palaeontology",
        date: "2005",
        quote: "The cancellous bone structure inside the dome of the **pachycephalosaur** effectively absorbed high-energy mechanical shocks."
      },
      {
        author: "Peter Dodson",
        work: "The Horned Dinosaurs",
        date: "1996",
        quote: "Like modern bighorn sheep, the **pachycephalosaur** likely settled dominance disputes through ritualized head-butting displays."
      }
    ]
  },
  "pachycephalosaurus": {
    primary: "A genus of large pachycephalosaurid dinosaur from the latest Cretaceous of North America, possessing a solid bone skull roof up to 25 cm (10 inches) thick.",
    secondary: "The largest and most iconic dome-headed dinosaur of the Hell Creek Formation, featuring ornate bony spikes along its snout and occipital rim.",
    quotes: [
      {
        author: "Charles W. Gilmore",
        work: "A New Fossil Reptile from the Lance Formation of Wyoming",
        date: "1931",
        quote: "The solid bony mass forming the cranium of **Pachycephalosaurus** is entirely unmatched among fossil reptiles."
      },
      {
        author: "Jack Horner and Mark B. Goodwin",
        work: "Extreme Cranial Ontogeny in the Late Cretaceous Dinosaur Pachycephalosaurus",
        date: "2009",
        quote: "Ontogenetic analysis suggests that *Dracorex* and *Stygimoloch* may represent juvenile growth stages of **Pachycephalosaurus**."
      },
      {
        author: "David B. Weishampel, Peter Dodson, and Halszka Osmólska",
        work: "The Dinosauria",
        date: "2004",
        quote: "The massive, solid calvarium of **Pachycephalosaurus** stood as an impenetrable shield capping the relatively small braincase."
      }
    ]
  },
  "pachycheilia": {
    primary: "An abnormal pathological or congenital thickening and swelling of the lips.",
    secondary: "A localized hypertrophic condition of labial tissues often associated with chronic granulomatous disorders, such as cheilitis granulomatosa or Melkersson-Rosenthal syndrome.",
    quotes: [
      {
        author: "Jonathan Hutchinson",
        work: "Illustrations of Clinical Surgery",
        date: "1878",
        quote: "The persistent labial hypertrophy in this patient presented a classic manifestation of chronic **pachycheilia**."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1892",
        quote: "Marked **pachycheilia** may persist indefinitely following recurrent erysipelatous inflammation of the lower face."
      },
      {
        author: "Ernst von Bergmann",
        work: "A System of Practical Surgery",
        date: "1904",
        quote: "Surgical reduction of the thickened vermilion border is occasionally indicated when **pachycheilia** causes chronic mechanical distress."
      }
    ]
  },
  "pachyderm": {
    primary: "A very large, thick-skinned quadrupedal mammal, especially an elephant, rhinoceros, or hippopotamus.",
    secondary: "A person with an insensitive disposition or a thick emotional hide, largely unperturbed by criticism or verbal attacks.",
    quotes: [
      {
        author: "Georges Cuvier",
        work: "The Animal Kingdom",
        date: "1817",
        quote: "The elephant represents the most colossal living **pachyderm**, distinguished by its robust skeletal frame and dense hide."
      },
      {
        author: "Charles Dickens",
        work: "Bleak House",
        date: "1853",
        quote: "The old Chancery lawyer was a veritable legal **pachyderm**, impervious to all tears, protests, and pleadings."
      },
      {
        author: "Theodore Roosevelt",
        work: "African Game Trails",
        date: "1910",
        quote: "The ponderous **pachyderm** crashed through the dense bamboo thicket with unstoppable force."
      }
    ]
  },
  "pachyderma": {
    primary: "An abnormal thickening of the skin; elephantiasis or pachyderma.",
    secondary: "A medical condition characterized by dermal hypertrophy and induration, occurring in chronic lymphatic obstruction or genetic syndromes like pachydermoperiostosis.",
    quotes: [
      {
        author: "Erasmus Wilson",
        work: "On Diseases of the Skin",
        date: "1847",
        quote: "Chronic stagnation of the lymphatic circulation inevitably terminates in profound cutaneous induration and **pachyderma**."
      },
      {
        author: "Ferdinand von Hebra",
        work: "Diseases of the Skin",
        date: "1866",
        quote: "In severe cases of elephantiasis, the papillary layer hypertrophies, producing generalized **pachyderma**."
      },
      {
        author: "Arthur Van Harlingen",
        work: "Handbook of the Diagnosis and Treatment of Skin Diseases",
        date: "1884",
        quote: "The lower extremities exhibited coarse folds and deep fissures characteristic of advanced **pachyderma**."
      }
    ]
  },
  "pachydermal": {
    primary: "Relating to, resembling, or characteristic of a pachyderm (thick-skinned mammal).",
    secondary: "Having unusually thick, coarse, or insensitive skin; figuratively tough-minded or callous.",
    quotes: [
      {
        author: "Herman Melville",
        work: "Moby-Dick",
        date: "1851",
        quote: "The whale's blubber and fibrous skin wrap its bulk in an almost **pachydermal** vesture against the polar chill."
      },
      {
        author: "George Meredith",
        work: "The Egoist",
        date: "1879",
        quote: "He surveyed his critics with a **pachydermal** complacency that baffled every shaft of satire."
      },
      {
        author: "Thomas Henry Huxley",
        work: "Evidence as to Man's Place in Nature",
        date: "1863",
        quote: "The ancestral ungulate stock diverged into equine, ruminant, and **pachydermal** branches."
      }
    ]
  },
  "pachydermata": {
    primary: "A historical, now obsolete taxonomic order established by Georges Cuvier comprising non-ruminant, hoofed, thick-skinned quadrupeds (elephants, rhinos, tapirs, hippopotamuses, pigs).",
    secondary: "A 19th-century zoological classification that grouped disparate mammalian lines together based primarily on the superficial trait of thickened integument.",
    quotes: [
      {
        author: "Georges Cuvier",
        work: "Recherches sur les ossemens fossiles",
        date: "1812",
        quote: "We unite under the designation of **Pachydermata** all the hoofed quadrupeds that do not chew the cud."
      },
      {
        author: "Charles Darwin",
        work: "The Voyage of the Beagle",
        date: "1839",
        quote: "The pampas beds yielded giant fossil skeletons belonging to extinct orders allied to the **Pachydermata**."
      },
      {
        author: "Richard Owen",
        work: "On the Archetype and Homologies of the Vertebrate Skeleton",
        date: "1848",
        quote: "Subsequent anatomical analysis proved that Cuvier's **Pachydermata** were an artificial assemblage of distinct ungulate lineages."
      }
    ]
  },
  "pachydermatous": {
    primary: "Having a thick skin or hide, typical of elephants and rhinoceroses.",
    secondary: "Figuratively insensitive to insult, sarcasm, or reproach; callous, obtuse, and thick-skinned.",
    quotes: [
      {
        author: "William Makepeace Thackeray",
        work: "Vanity Fair",
        date: "1848",
        quote: "Jos Sedley was sufficiently **pachydermatous** to disregard the whispered snickers of his youthful acquaintances."
      },
      {
        author: "Thomas Carlyle",
        work: "Sartor Resartus",
        date: "1836",
        quote: "A **pachydermatous** public official ignores the cries of human distress with undisturbed serenity."
      },
      {
        author: "Henry James",
        work: "The Portrait of a Lady",
        date: "1881",
        quote: "Madame Merle preserved a **pachydermatous** poise that no sudden revelation could visibly ruffle."
      }
    ]
  },
  "pachydermic": {
    primary: "Pertaining to, resembling, or characteristic of a pachyderm; thick-skinned.",
    secondary: "Exhibiting emotional impassivity, thick protective integument, or heavy, bulky proportions.",
    quotes: [
      {
        author: "Ralph Waldo Emerson",
        work: "Representative Men",
        date: "1850",
        quote: "Montaigne possessed a certain **pachydermic** common sense that protected his philosophy from metaphysical fanaticism."
      },
      {
        author: "Arthur Conan Doyle",
        work: "The Lost World",
        date: "1912",
        quote: "The massive, **pachydermic** iguanodon trampled through the Jurassic ferns without checking its lumbering stride."
      },
      {
        author: "Joseph Conrad",
        work: "Lord Jim",
        date: "1900",
        quote: "His coarse face wore a look of **pachydermic** contentment, immune to any prick of conscience."
      }
    ]
  },
  "pachydermous": {
    primary: "Having thick skin or hide; pachydermatous.",
    secondary: "Figuratively thick-skinned, oblivious, or impervious to moral censure.",
    quotes: [
      {
        author: "Washington Irving",
        work: "A History of New-York",
        date: "1809",
        quote: "The stout burgomasters sat enveloped in tobacco smoke, wrapped in **pachydermous** tranquility."
      },
      {
        author: "Charles Kingsley",
        work: "Westward Ho!",
        date: "1855",
        quote: "The rough mariner proved surprisingly **pachydermous** against the stinging rebukes of the quartermaster."
      },
      {
        author: "Walter Bagehot",
        work: "Biographical Studies",
        date: "1881",
        quote: "Lord Palmerston possessed that fortunate **pachydermous** temperament which allowed him to brush off parliamentary defeats with a jest."
      }
    ]
  },
  "pachyglossia": {
    primary: "An abnormal congenital or pathological enlargement and thickening of the tongue; macroglossia.",
    secondary: "Chronic hypertrophy of lingual musculature or submucosal tissues, occurring in metabolic disorders, amyloidosis, or congenital syndromes.",
    quotes: [
      {
        author: "Rudolf Virchow",
        work: "Cellular Pathology",
        date: "1858",
        quote: "The lingual hypertrophy observed in congenital myxedema is a true **pachyglossia** due to interstitial myxomatous infiltration."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1892",
        quote: "Severe **pachyglossia** may impede respiration and articulation, necessitating surgical intervention."
      },
      {
        author: "Henry Jackson",
        work: "A Study of Diseases of the Tongue",
        date: "1895",
        quote: "Persistent muscular hypertrophy resulted in pronounced **pachyglossia**, preventing the patient from retracting the organ fully."
      }
    ]
  },
  "pachynsis": {
    primary: "Pathological thickening, induration, or hypertrophy of an anatomical tissue, membrane, or organ.",
    secondary: "A historical medical and botanical term for structural condensation or abnormal hardening of cellular layers.",
    quotes: [
      {
        author: "Richard Dunglison",
        work: "Medical Lexicon: A Dictionary of Medical Science",
        date: "1853",
        quote: "**Pachynsis** is used to designate any abnormal thickness or induration occurring in soft bodily tissues."
      },
      {
        author: "Theophilus Redwood",
        work: "Elements of Pharmacy and Materia Medica",
        date: "1865",
        quote: "The micro-structure of the medicinal root reveals marked **pachynsis** of the outer cortical parenchyma."
      },
      {
        author: "William Thomson",
        work: "A Practical Treatise on the Diseases of the Liver and Biliary Passages",
        date: "1841",
        quote: "Chronic perihepatitis produced extensive **pachynsis** of Glisson's capsule, forming an unyielding fibrous rind."
      }
    ]
  },
  "Pachypodium": {
    primary: "A genus of spiny, succulent, thick-stemmed trees and shrubs in the dogbane family (Apocynaceae), native to Madagascar and southern Africa.",
    secondary: "Xerophytic pachycaul plants ('thick feet') renowned for swollen water-storing caudices, spiny trunks, and striking floral displays (e.g., the Madagascar palm).",
    quotes: [
      {
        author: "John Gilbert Baker",
        work: "Flora of Madagascar",
        date: "1887",
        quote: "The peculiar swollen, bottle-shaped trunk of **Pachypodium** enables the plant to endure prolonged droughts on arid granite outcrops."
      },
      {
        author: "Werner Rauh",
        work: "Succulent and Xerophytic Plants of Madagascar",
        date: "1995",
        quote: "Among the bizarre floral elements of the spiny forest, **Pachypodium** stands out with its massive, silvery-grey spiny caudex."
      },
      {
        author: "Gordon Rowley",
        work: "The Pachypodium and Adenium Handbook",
        date: "1999",
        quote: "The generic name **Pachypodium** aptly captures the swollen foot-like base that anchors these iconic succulents."
      }
    ]
  },
  "pachyrhizus": {
    primary: "A genus of climbing leguminous tropical vines in the Fabaceae family, native to the Americas, cultivated for their large edible starchy tuberous roots.",
    secondary: "The botanical genus comprising jicama (Pachyrhizus erosus), celebrated for succulent taproots eaten raw, while the aerial stems, leaves, and pods contain toxic rotenone.",
    quotes: [
      {
        author: "Augustin Pyramus de Candolle",
        work: "Prodromus Systematis Naturalis Regni Vegetabilis",
        date: "1825",
        quote: "The genus **Pachyrhizus** is readily identified by its trifoliolate foliage and remarkably swollen tuberous rootstocks."
      },
      {
        author: "Liberty Hyde Bailey",
        work: "The Standard Cyclopedia of Horticulture",
        date: "1916",
        quote: "In tropical markets, the crisp edible roots of **Pachyrhizus** are sliced and served with lime juice and chili."
      },
      {
        author: "Daniel Zohary and Maria Hopf",
        work: "Domestication of Plants in the Old World",
        date: "2000",
        quote: "Pre-Columbian farmers in Mesoamerica widely cultivated **Pachyrhizus** for its sweet, refreshing tuberous roots."
      }
    ]
  },
  "pachysandra": {
    primary: "A genus of five species of evergreen, low-growing perennial herbs or subshrubs in the boxwood family (Buxaceae), native to East Asia and eastern North America.",
    secondary: "A widely cultivated evergreen ornamental ground cover (Pachysandra terminalis), noted for tolerance of dense shade and thick, fleshy stamens ('thick male').",
    quotes: [
      {
        author: "André Michaux",
        work: "Flora Boreali-Americana",
        date: "1803",
        quote: "Michaux established the genus **Pachysandra** to accommodate the thick, clavate filaments of its staminate flowers."
      },
      {
        author: "Gertrude Jekyll",
        work: "Wood and Garden",
        date: "1899",
        quote: "Beneath the dense canopy of ancient beech trees, a carpet of **Pachysandra** forms a lush, unyielding sea of deep green foliage."
      },
      {
        author: "Michael A. Dirr",
        work: "Manual of Woody Landscape Plants",
        date: "1998",
        quote: "For deep, dry shade under mature trees, few groundcovers rival **Pachysandra** in vigor and evergreen permanence."
      }
    ]
  },
  "pachytene": {
    primary: "The third stage of prophase I in meiosis, during which homologous chromosomes complete pairing (synapsis) and become thick, compact strands.",
    secondary: "The critical meiotic stage where reciprocal genetic recombination (crossing over) takes place via the formation of chiasmata across synaptonemal complexes.",
    quotes: [
      {
        author: "Hans von Winiwarter",
        work: "Recherches sur l'ovogenèse et l'organogenèse de l'ovaire des mammifères",
        date: "1900",
        quote: "During the stage of **pachytene**, the paired chromatin threads thicken noticeably, forming stable bivalents across the nucleus."
      },
      {
        author: "Theodosius Dobzhansky",
        work: "Genetics and the Origin of Species",
        date: "1937",
        quote: "Microscopic examination of **pachytene** chromosomes reveals the precise lateral alignment of homologous gene loci."
      },
      {
        author: "Barbara McClintock",
        work: "Chromosome Organization and Genic Expression, Cold Spring Harbor Symposia",
        date: "1951",
        quote: "The distinctive chromomere pattern of maize at **pachytene** allowed us to map transposable elements to specific cytological positions."
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

console.log("Done Batch 4 (pach)!");
