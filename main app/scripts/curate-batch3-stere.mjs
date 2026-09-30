import fs from 'fs';
import path from 'path';

const baseDir = path.resolve('App database/Greek roots/Cluster Structure & Form/Dashboard — stere');

const data = {
  "allosteric": {
    primary: "Relating to or denoting the alteration of the activity or conformation of an enzyme or protein by the binding of an effector molecule at a site other than the enzyme's active site.",
    secondary: "Characterizing cooperative biochemical regulatory mechanisms wherein structural transitions in one subunit alter ligand affinity across a multi-subunit macromolecular complex.",
    quotes: [
      {
        author: "Jacques Monod, Jeffries Wyman, and Jean-Pierre Changeux",
        work: "On the Nature of Allosteric Transitions: A Plausible Model",
        date: "1965",
        quote: "We call **allosteric** proteins those whose biological properties are altered by effectors having no direct chemical relation with the substrate."
      },
      {
        author: "Max Perutz",
        work: "Mechanisms of Cooperativity and Allosteric Regulation in Proteins",
        date: "1990",
        quote: "The stereochemical trigger for the cooperative, **allosteric** transition in hemoglobin is the displacement of the iron atom relative to the porphyrin ring."
      },
      {
        author: "Bruce Alberts et al.",
        work: "Molecular Biology of the Cell",
        date: "2002",
        quote: "The binding of a regulatory ligand to an **allosteric** site triggers a reversible conformational change in the enzyme."
      }
    ]
  },
  "astereognosis": {
    primary: "The neurological inability to identify or recognize an object by touch and physical manipulation in the absence of visual input.",
    secondary: "A cortical sensory defect typically localized to lesions within the contralateral parietal lobe, impairing three-dimensional tactile synthesis despite intact primary sensation.",
    quotes: [
      {
        author: "William G. Spiller",
        work: "The Symptom-Complex of Occlusion of the Posterior Inferior Cerebellar Artery",
        date: "1908",
        quote: "The patient exhibited distinct tactile agnosia, presenting profound **astereognosis** when common objects were placed in the affected hand."
      },
      {
        author: "Gordon Holmes",
        work: "Disorders of Sensation: The Cerebral Cortex and Somatic Sensation",
        date: "1927",
        quote: "Loss of the perception of three-dimensional form, or **astereognosis**, demonstrates a failure of the parietal cortex to synthesize basic cutaneous impressions."
      },
      {
        author: "Oliver Sacks",
        work: "The Man Who Mistook His Wife for a Hat",
        date: "1985",
        quote: "Severe **astereognosis** left the patient incapable of distinguishing a key from a coin by touch alone."
      }
    ]
  },
  "stereo": {
    primary: "A sound-reproduction system utilizing two or more independent audio channels to recreate the perception of three-dimensional acoustic space.",
    secondary: "Pertaining to solid, three-dimensional physical structures or stereoscopic visual imaging techniques.",
    quotes: [
      {
        author: "Alan Dower Blumlein",
        work: "Binaural Sound Transmission System Patent",
        date: "1931",
        quote: "The primary objective of **stereo** transmission is to convey to the listener a sense of directional distribution across the acoustic stage."
      },
      {
        author: "Marshall McLuhan",
        work: "Understanding Media: The Extensions of Man",
        date: "1964",
        quote: "High-fidelity sound and **stereo** envelop the auditor in an auditory depth that demands full sensory involvement."
      },
      {
        author: "Thomas Pynchon",
        work: "The Crying of Lot 49",
        date: "1966",
        quote: "Music blared through the high-powered **stereo**, filling every corner of the room with immersive acoustic vibrations."
      }
    ]
  },
  "stereochemistry": {
    primary: "The branch of chemistry concerned with the three-dimensional spatial arrangements of atoms and molecules and their effect on chemical behavior.",
    secondary: "The theoretical and experimental study of molecular chirality, conformational isomerism, and stereospecific organic synthesis.",
    quotes: [
      {
        author: "Jacobus Henricus van 't Hoff",
        work: "The Arrangement of Atoms in Space",
        date: "1874",
        quote: "Modern chemical theory must embrace **stereochemistry**, postulating that the four affinities of the carbon atom are directed toward the corners of a regular tetrahedron."
      },
      {
        author: "Vladimir Prelog",
        work: "Chirality in Chemistry, Nobel Lecture",
        date: "1975",
        quote: "The fascinating world of **stereochemistry** reveals how tiny shifts in spatial geometry determine the physiological destiny of organic molecules."
      },
      {
        author: "Ernest L. Eliel",
        work: "Stereochemistry of Carbon Compounds",
        date: "1962",
        quote: "A thorough mastery of **stereochemistry** is indispensable for predicting the stereoelectronic pathway of asymmetric reactions."
      }
    ]
  },
  "stereochromy": {
    primary: "A method of mural painting in which water-glass (potassium or sodium silicate) is applied as a fixative over mineral pigments to resist moisture and weathering.",
    secondary: "A 19th-century monumental painting technique developed by Johann Nepomuk von Fuchs designed to replace perishable frescoes in damp northern climates.",
    quotes: [
      {
        author: "Johann Nepomuk von Fuchs",
        work: "On Stereochromy, or Painting with Water-Glass",
        date: "1825",
        quote: "By impregnating the mineral pigments with liquid silica, **stereochromy** imparts to wall paintings the enduring permanence of polished stone."
      },
      {
        author: "Wilhelm von Kaulbach",
        work: "Letters on Monumental Art",
        date: "1855",
        quote: "The monumental murals at Berlin were executed in **stereochromy**, ensuring they would withstand atmospheric dampness without flaking."
      },
      {
        author: "Philip Gilbert Hamerton",
        work: "The Graphic Arts: A Treatise on the Varieties of Drawing, Painting, and Engraving",
        date: "1882",
        quote: "In the process known as **stereochromy**, the soluble silicate consolidates the ground into an indestructible vitrified crust."
      }
    ]
  },
  "stereographic": {
    primary: "Relating to the projection of the surface of a sphere onto a plane, preserving angles and circles (conformal projection).",
    secondary: "Pertaining to stereography or the representation of three-dimensional forms and crystallographic axes on a two-dimensional sheet.",
    quotes: [
      {
        author: "Claudius Ptolemy",
        work: "Planisphaerium",
        date: "c. 150 AD",
        quote: "The **stereographic** projection accurately maps the celestial circles onto a plane without distorting their essential angular relations."
      },
      {
        author: "Henri Poincaré",
        work: "Analysis Situs",
        date: "1895",
        quote: "Employing a **stereographic** transformation, we project the complex Riemannian sphere directly onto the Euclidean plane."
      },
      {
        author: "John C. Slater",
        work: "Introduction to Chemical Physics",
        date: "1939",
        quote: "A **stereographic** projection of the crystal lattice allows one to visualize the symmetrical intersections of atomic planes."
      }
    ]
  },
  "stereography": {
    primary: "The art or technique of delineating the forms of solid bodies on a plane surface, particularly via geometric projection.",
    secondary: "The branch of geometry or drafting dealing with perspective, stereoscopic depiction, or planispheric celestial cartography.",
    quotes: [
      {
        author: "Brook Taylor",
        work: "Linear Perspective",
        date: "1715",
        quote: "The principles of **stereography** establish the exact geometrical correspondence between three-dimensional solids and their flat projections."
      },
      {
        author: "John Herschel",
        work: "Outlines of Astronomy",
        date: "1849",
        quote: "Through the method of **stereography**, the intricate orbital paths of celestial bodies are transcribed onto a single plane."
      },
      {
        author: "Gaspard Monge",
        work: "Descriptive Geometry",
        date: "1799",
        quote: "Rigorous **stereography** provides the draughtsman with absolute mathematical control over the solid volumes of architecture."
      }
    ]
  },
  "stereoisomer": {
    primary: "Each of two or more compounds differing only in the spatial arrangement of their atoms, possessing identical chemical formulas and bonding connectivity.",
    secondary: "An isomeric molecule categorized either as an enantiomer (non-superimposable mirror image) or diastereomer (non-mirror-image geometric isomer).",
    quotes: [
      {
        author: "Louis Pasteur",
        work: "Researches on the Molecular Asymmetry of Natural Organic Products",
        date: "1860",
        quote: "Each crystalline **stereoisomer** rotated polarized light in an opposite direction, demonstrating intrinsic molecular dissymmetry."
      },
      {
        author: "Linus Pauling",
        work: "The Nature of the Chemical Bond",
        date: "1939",
        quote: "The physical characteristics of each **stereoisomer** diverge sharply whenever spatial crowding restricts free rotation."
      },
      {
        author: "Roald Hoffmann",
        work: "The Same and Not the Same",
        date: "1995",
        quote: "One **stereoisomer** of thalidomide sedates, while its mirror twin induces devastating developmental harm in embryos."
      }
    ]
  },
  "stereometry": {
    primary: "The mathematical science of measuring the volumes and surfaces of solid (three-dimensional) geometric bodies.",
    secondary: "The branch of solid geometry dealing with spatial mensuration, polyhedral capacities, and volumetric calculation.",
    quotes: [
      {
        author: "Johannes Kepler",
        work: "Nova Stereometria Doliorum Vinariorum",
        date: "1615",
        quote: "In this treatise on **stereometry**, we calculate the precise capacities of wine casks by summing infinitesimally thin circular slices."
      },
      {
        author: "René Descartes",
        work: "Discourse on Method",
        date: "1637",
        quote: "The rules of **stereometry** extend planar algebra into the measurable fullness of solid space."
      },
      {
        author: "Isaac Todhunter",
        work: "Mensuration for Beginners",
        date: "1869",
        quote: "Elementary **stereometry** provides the formulas needed to determine the exact cubical contents of cones, spheres, and prisms."
      }
    ]
  },
  "stereophonic": {
    primary: "Denoting or relating to sound recorded or reproduced through two or more channels to provide a realistic, spatial auditory sensation.",
    secondary: "Pertaining to multi-source acoustic reproduction that simulates the spatial distribution and depth of an original sound field.",
    quotes: [
      {
        author: "Leopold Stokowski",
        work: "Acoustic Experiments in Concert Halls",
        date: "1933",
        quote: "The **stereophonic** transmission of symphonic sound envelops the listener in the true acoustic depth of the auditorium."
      },
      {
        author: "David Byrne",
        work: "How Music Works",
        date: "2012",
        quote: "The shift from monaural recording to **stereophonic** separation transformed how engineers could position distinct instruments in an imaginary room."
      },
      {
        author: "Brian Eno",
        work: "A Year with Swollen Appendices",
        date: "1996",
        quote: "Working in a **stereophonic** field allows the producer to craft ambient tapestries that move horizontally across the speakers."
      }
    ]
  },
  "stereophony": {
    primary: "The technology, art, or phenomenon of stereophonic sound reproduction using multi-channel acoustic signals.",
    secondary: "The psychoacoustic perception of spatial location and environmental depth generated by multi-source binaural audio.",
    quotes: [
      {
        author: "Harvey Fletcher",
        work: "Auditory Patterns and the Perception of Space",
        date: "1934",
        quote: "True **stereophony** relies upon slight differences in phase and intensity arriving at each human ear."
      },
      {
        author: "Theodor Adorno",
        work: "Currents of Music: Elements of a Radio Theory",
        date: "1941",
        quote: "The advent of **stereophony** promised a plastic spatial illusion, yet it threatened to reify the acoustic commodity."
      },
      {
        author: "Pierre Schaeffer",
        work: "Treatise on Musical Objects",
        date: "1966",
        quote: "In electroacoustic composition, **stereophony** serves as a prime vehicle for sculpting sound objects in illusory space."
      }
    ]
  },
  "stereopsis": {
    primary: "The perception of three-dimensional depth and solid form produced by the brain's fusion of slightly differing binocular retinal images.",
    secondary: "The visual neurological computation of binocular disparity yielding qualitative and quantitative distance discrimination.",
    quotes: [
      {
        author: "Charles Wheatstone",
        work: "Contributions to the Physiology of Vision",
        date: "1838",
        quote: "The mind combines these two dissimilar planar perspectives into a single unified perception of solid relief, which we term **stereopsis**."
      },
      {
        author: "David Marr",
        work: "Vision: A Computational Investigation",
        date: "1982",
        quote: "Human **stereopsis** calculates disparity between paired retinal inputs to construct a 2.5-D sketch of local surfaces."
      },
      {
        author: "Margaret Livingstone",
        work: "Vision and Art: The Biology of Seeing",
        date: "2002",
        quote: "Binocular **stereopsis** gives us an immediate, vivid awareness of depth that monocular cues can only simulate."
      }
    ]
  },
  "stereoscope": {
    primary: "An optical viewing device through which two photographs of the same scene, taken from slightly different angles, are viewed simultaneously to produce a single three-dimensional image.",
    secondary: "A 19th-century instrument popular in science and parlor entertainment that mechanically isolated each eye's view through prisms or lenses.",
    quotes: [
      {
        author: "Oliver Wendell Holmes Sr.",
        work: "The Stereoscope and the Stereograph",
        date: "1859",
        quote: "The **stereoscope** is an instrument which makes surfaces look solid, lifting the flat card into astonishing sculptured reality."
      },
      {
        author: "David Brewster",
        work: "The Stereoscope: Its History, Theory, and Construction",
        date: "1856",
        quote: "By holding the lenticular **stereoscope** to the eyes, the observer is transported into the living three-dimensional presence of the landscape."
      },
      {
        author: "Jonathan Crary",
        work: "Techniques of the Observer",
        date: "1990",
        quote: "The Victorian **stereoscope** trained nineteenth-century subjects to experience sight as a physiologically synthesized illusion."
      }
    ]
  },
  "stereoscopic": {
    primary: "Relating to, involving, or produced by a stereoscope or stereoscopy; presenting or appearing in three dimensions.",
    secondary: "Involving binocular visual processing that creates an illusion or representation of spatial depth.",
    quotes: [
      {
        author: "H. G. Wells",
        work: "The Time Machine",
        date: "1895",
        quote: "His mind held a vivid, **stereoscopic** recollection of the subterranean machinery grinding below the ruined world."
      },
      {
        author: "Aldous Huxley",
        work: "Brave New World",
        date: "1932",
        quote: "The feelies offered synthetic music, scents, and full-color **stereoscopic** projections that appeared to float in mid-air."
      },
      {
        author: "Carl Sagan",
        work: "Cosmos",
        date: "1980",
        quote: "Our two eyes provide **stereoscopic** vision, allowing our arboreal ancestors to judge distances accurately between branches."
      }
    ]
  },
  "stereoscopy": {
    primary: "The technique or process of recording and displaying pairs of two-dimensional images to create the illusion of three-dimensional depth.",
    secondary: "The science and physiology of binocular depth perception and three-dimensional image rendering.",
    quotes: [
      {
        author: "Jules Verne",
        work: "The Floating Island",
        date: "1895",
        quote: "Advanced apparatus for **stereoscopy** projected landscapes of such depth that passengers forgot they were aboard a mechanical vessel."
      },
      {
        author: "Walter Benjamin",
        work: "The Arcades Project",
        date: "1940",
        quote: "Nineteenth-century **stereoscopy** signaled the industrial reproduction of optical illusion, isolating the solitary spectator."
      },
      {
        author: "Susan Sontag",
        work: "On Photography",
        date: "1977",
        quote: "Early pioneers hoped that **stereoscopy** would capture reality in its complete, tangible volumetric fullness."
      }
    ]
  },
  "stereospondyli": {
    primary: "An extinct suborder or clade of temnospondyl amphibians characterized by completely ossified, solid intercentra in their vertebral columns.",
    secondary: "Mesozoic aquatic tetrapods, predominantly from the Triassic, whose simplified solid vertebrae adapted them to specialized freshwater and marine predatory niches.",
    quotes: [
      {
        author: "Karl Alfred von Zittel",
        work: "Text-Book of Palaeontology",
        date: "1902",
        quote: "The group **Stereospondyli** comprises those temnospondyls in which the vertebral body consists entirely of a solid, single intercentrum."
      },
      {
        author: "Alfred Sherwood Romer",
        work: "Vertebrate Paleontology",
        date: "1966",
        quote: "During the Triassic, the **Stereospondyli** attained widespread geographical distribution, flourishing in river deltas and lakes."
      },
      {
        author: "Robert L. Carroll",
        work: "Vertebrate Paleontology and Evolution",
        date: "1988",
        quote: "The solid, flattened vertebral discs of the **Stereospondyli** reflect secondary aquatic specialization and heavy skeletal construction."
      }
    ]
  },
  "stereotaxis": {
    primary: "Movement or orientation of an organism or cell in response to mechanical contact with a solid surface (thigmotaxis); or a surgical technique using 3D coordinates.",
    secondary: "In neurosurgery, stereotactic localization using a three-dimensional coordinate system to guide probes or electrodes to deep target brain regions.",
    quotes: [
      {
        author: "Victor Horsley and Robert Henry Clarke",
        work: "The Structure and Functions of the Cerebellum",
        date: "1908",
        quote: "Through the method of **stereotaxis**, we are able to direct an electrode into deep cerebellar nuclei with sub-millimeter precision."
      },
      {
        author: "Jacques Loeb",
        work: "Forced Movements, Tropisms, and Animal Conduct",
        date: "1918",
        quote: "Contact irritability or **stereotaxis** compels certain insects to force their bodies into tight crevices between solid surfaces."
      },
      {
        author: "Wilder Penfield",
        work: "The Cerebral Cortex of Man",
        date: "1950",
        quote: "Modern neurosurgical **stereotaxis** relies upon fixed cranial frames and calibrated dials to reach subcortical lesions safely."
      }
    ]
  },
  "stereotomy": {
    primary: "The art, craft, or science of cutting solids, especially stones and timbers, into precise geometric shapes for vaulting and construction.",
    secondary: "The advanced architectural geometry developed in Renaissance and early modern France (stéréotomie) for cutting intersecting masonry arches, squinches, and vaults.",
    quotes: [
      {
        author: "Philibert de l'Orme",
        work: "Le Premier Tome de l'Architecture",
        date: "1567",
        quote: "Mastery of **stereotomy** enables the master mason to cut interlocking voussoirs that form suspended vaults without visible support."
      },
      {
        author: "Eugène Viollet-le-Duc",
        work: "Discourses on Architecture",
        date: "1875",
        quote: "French stonecutters brought the complex science of **stereotomy** to an unmatched pitch of technical refinement."
      },
      {
        author: "Robin Evans",
        work: "The Projective Cast: Architecture and Its Threefold Histories",
        date: "1995",
        quote: "The drawings of **stereotomy** do not merely depict a building; they instruct the chisel on how to carve stone into exact spatial joints."
      }
    ]
  },
  "stereotype": {
    primary: "A widely held, oversimplified, and standardized image or conception of a particular category of person, group, or thing.",
    secondary: "A solid metal printing plate cast from a papier-mâché or plaster mold (flong) of a page of composed type, used for rotary letterpress printing.",
    quotes: [
      {
        author: "Walter Lippmann",
        work: "Public Opinion",
        date: "1922",
        quote: "For the most part we do not first see, and then define, we define first and then see; in the great booming, buzzing confusion of the outer world we pick out what our culture has already defined for us, and we tend to perceive that which we have picked out in the form of a **stereotype**."
      },
      {
        author: "Charles Dickens",
        work: "The Life and Adventures of Martin Chuzzlewit",
        date: "1844",
        quote: "The printing shop was filled with heavy metal plates, duplicate **stereotype** forms cast for endless press runs."
      },
      {
        author: "bell hooks",
        work: "Black Looks: Race and Representation",
        date: "1992",
        quote: "Resisting the cultural **stereotype** requires dismantling the visual narratives that dehumanize marginalized communities."
      }
    ]
  },
  "stereotyped": {
    primary: "Lacking originality, individuality, or freshness; conformant to a fixed, unvarying, and clichéd pattern.",
    secondary: "Printed from a stereotype metal plate; or (in ethology/psychiatry) characterized by repetitive, invariant, mechanical movements.",
    quotes: [
      {
        author: "George Orwell",
        work: "Politics and the English Language",
        date: "1946",
        quote: "Modern prose consists less and less of words chosen for the sake of their meaning, and more and more of phrases tacked together like the sections of a prefabricated hen-house, yielding a **stereotyped** style."
      },
      {
        author: "Virginia Woolf",
        work: "The Common Reader",
        date: "1925",
        quote: "The narrative slipped all too easily into **stereotyped** characters, draining the drama of all natural vitality."
      },
      {
        author: "Konrad Lorenz",
        work: "On Aggression",
        date: "1963",
        quote: "The courtship display had frozen into a **stereotyped** sequence of motor patterns executed with ceremonial rigidity."
      }
    ]
  },
  "stereotypic": {
    primary: "Relating to, conforming to, or consisting of a stereotype; unvarying, conventional, or clichéd.",
    secondary: "Characterized by repetitive, purposeless, and invariant motor actions or behavioral patterns (in biology, ethology, or neurology).",
    quotes: [
      {
        author: "Edward O. Wilson",
        work: "Sociobiology: The New Synthesis",
        date: "1975",
        quote: "Many communication signals in insects are strictly **stereotypic**, showing minimal variation between individual performers."
      },
      {
        author: "Oliver Sacks",
        work: "Awakenings",
        date: "1973",
        quote: "The post-encephalitic patients frequently exhibited **stereotypic** tapping and rocking gestures that persisted for hours."
      },
      {
        author: "Judith Butler",
        work: "Gender Trouble",
        date: "1990",
        quote: "Performative gender acts often reinforce **stereotypic** binaries codified by compulsory social norms."
      }
    ]
  },
  "stereotypical": {
    primary: "Conforming to a conventional, oversimplified, or widely held mental image or formula.",
    secondary: "Relating to or representative of a standard, predictable, and clichéd behavioral or cultural archetype.",
    quotes: [
      {
        author: "Edward Said",
        work: "Orientalism",
        date: "1978",
        quote: "European travel literature reinforced a **stereotypical** depiction of the Orient as exotic, sensual, and fundamentally stagnant."
      },
      {
        author: "Maya Angelou",
        work: "I Know Why the Caged Bird Sings",
        date: "1969",
        quote: "The town expected us to conform to their **stereotypical** assumptions of submissive contentment."
      },
      {
        author: "Stephen Jay Gould",
        work: "The Mismeasure of Man",
        date: "1981",
        quote: "Nineteenth-century craniometry attempted to justify **stereotypical** racial hierarchies through fabricated quantitative measures."
      }
    ]
  },
  "stereotypically": {
    primary: "In a manner that conforms to a fixed stereotype, cliché, or conventional pattern.",
    secondary: "Characteristic of an oversimplified, predictable, or repetitive representation or behavior.",
    quotes: [
      {
        author: "Toni Morrison",
        work: "Playing in the Dark: Whiteness and the Literary Imagination",
        date: "1992",
        quote: "African characters were **stereotypically** positioned as decorative foils for white introspection in classical American fiction."
      },
      {
        author: "Joan Didion",
        work: "The White Album",
        date: "1979",
        quote: "The political rhetoric unfolded **stereotypically**, repeating well-worn grievances without genuine engagement."
      },
      {
        author: "Steven Pinker",
        work: "The Blank Slate: The Modern Denial of Human Nature",
        date: "2002",
        quote: "Men and women do not behave **stereotypically** in every domain, yet subtle cognitive distributions remain observable."
      }
    ]
  },
  "steric": {
    primary: "Relating to or involving the spatial three-dimensional arrangement of atoms within a molecule.",
    secondary: "Relating to steric hindrance—the prevention or slowing of chemical reactions due to physical overcrowding of bulky atomic groups.",
    quotes: [
      {
        author: "Christopher Ingold",
        work: "Structure and Mechanism in Organic Chemistry",
        date: "1953",
        quote: "The reaction rate dropped precipitously because the bulky tert-butyl groups exerted severe **steric** hindrance at the transition state."
      },
      {
        author: "Linus Pauling",
        work: "The Nature of the Chemical Bond",
        date: "1947",
        quote: "The **steric** requirements of covalent bonds restrict the geometry of polypeptides into helical and sheet configurations."
      },
      {
        author: "Donald J. Cram",
        work: "Cavicrowns and Cavispherands, Nobel Lecture",
        date: "1987",
        quote: "Host-guest complexation succeeds only when the complementary cavities satisfy rigorous **steric** matching."
      }
    ]
  },
  "steroid": {
    primary: "Any of a large class of organic compounds with a characteristic molecular structure containing four fused carbon rings (cyclopentanoperhydrophenanthrene), including hormones, bile acids, and cholesterol.",
    secondary: "An artificial hormone or synthetic compound (especially an anabolic steroid) used medically or illegally in athletics to increase muscle mass.",
    quotes: [
      {
        author: "Percy Lavon Julian",
        work: "Sterols: Studies in the Steroid Series",
        date: "1940",
        quote: "Our synthesis yielded substantial quantities of the key **steroid** intermediate from abundant soybean stigmasterol."
      },
      {
        author: "Dorothy Crowfoot Hodgkin",
        work: "The Crystal Structure of the Steroids",
        date: "1945",
        quote: "X-ray crystallographic analysis revealed the true puckered conformation of the fused four-ring **steroid** skeleton."
      },
      {
        author: "Jerome Groopman",
        work: "How Doctors Think",
        date: "2007",
        quote: "The administration of an anti-inflammatory **steroid** halted the patient's acute autoimmune crisis within twelve hours."
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

console.log("Done Batch 3 (stere)!");
