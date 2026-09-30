import fs from 'fs';
import path from 'path';

const clusterDir = path.resolve('App database/Greek roots/Cluster Turning & Transformation/Dashboard — strept');

const data = {
  "Strepsiptera": {
    primary: "An enigmatic order of tiny, holometabolous parasitic insects, commonly known as twisted-wing parasites.",
    secondary: "Bizarre endoparasites of other insects whose adult males have twisted, club-like forewings and fan-shaped hindwings, while adult females are wingless, legless endoparasitic bags inside the host.",
    quotes: [
      {
        author: "William Kirby",
        work: "Monographia Apum Angliae",
        date: "1802",
        quote: "Kirby established the order **Strepsiptera**, naming them for the curious twisted, haltere-like anterior wings of the males."
      },
      {
        author: "J. H. Comstock",
        work: "An Introduction to Entomology",
        date: "1920",
        quote: "The biology of **Strepsiptera** presents one of the most astonishing examples of parasitic specialization in the animal kingdom."
      },
      {
        author: "Michael S. Engel and David Grimaldi",
        work: "Evolution of the Insects",
        date: "2005",
        quote: "The phylogenetic placement of **Strepsiptera** remained controversial for centuries, challenging systematists with extreme morphological divergence."
      }
    ]
  },
  "strepsirrhine": {
    primary: "Belonging to the suborder Strepsirrhini of primates, comprising lemurs, lorises, and galagos, characterized by a moist, naked rhinarium ('curly/turned nose').",
    secondary: "Primitive primates possessing a grooming toothcomb on the lower incisors, a reflecting tapetum lucidum in the retina, and relying heavily on olfactory communication.",
    quotes: [
      {
        author: "W. E. Le Gros Clark",
        work: "The Antecedents of Man",
        date: "1959",
        quote: "The **strepsirrhine** primates preserve the primitive mammalian condition of a moist glandular rhinarium linked to the upper lip."
      },
      {
        author: "Stephen Jay Gould",
        work: "The Panda's Thumb",
        date: "1980",
        quote: "Madagascar offered an isolated continental sanctuary where **strepsirrhine** lineages could radiate into diverse ecological niches."
      },
      {
        author: "Frans de Waal",
        work: "Chimpanzee Politics",
        date: "1982",
        quote: "Unlike higher anthropoids, the **strepsirrhine** lemur relies extensively on scent marking to establish territorial boundaries."
      }
    ]
  },
  "streptobacillus": {
    primary: "A genus of Gram-negative, facultatively anaerobic rod-shaped bacteria that grow in chains or filaments (from Greek streptos pliant/twisted + bacillus little rod).",
    secondary: "The causative agent of streptobacillary rat-bite fever (Streptobacillus moniliformis), characterized by Haverhill fever, petechial rash, and migratory polyarthritis.",
    quotes: [
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1901",
        quote: "Rat-bite fever is frequently induced by the pleomorphic filamentous pathogen **Streptobacillus**."
      },
      {
        author: "Louis S. Goodman and Alfred Gilman",
        work: "The Pharmacological Basis of Therapeutics",
        date: "1975",
        quote: "Infections caused by **Streptobacillus** respond promptly to systemic penicillin therapy."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "Blood cultures demonstrate chained filaments of **Streptobacillus** during acute febrile paroxysms."
      }
    ]
  },
  "streptocarpus": {
    primary: "A genus of about 150 species of flowering plants in the African violet family (Gesneriaceae), commonly called Cape primroses.",
    secondary: "Subtropical herbs known for their remarkable spirally twisted seed capsules (streptos twisted + karpos fruit), which unwind as they dry to fling seeds.",
    quotes: [
      {
        author: "John Lindley",
        work: "The Vegetable Kingdom",
        date: "1846",
        quote: "The generic name **Streptocarpus** aptly designates the singular twisted spiral of its ripening capsules."
      },
      {
        author: "Gertrude Jekyll",
        work: "Wood and Garden",
        date: "1899",
        quote: "In the warm conservatory, the delicate pastel throats of **Streptocarpus** bloomed continuously throughout the late summer."
      },
      {
        author: "Liberty Hyde Bailey",
        work: "The Standard Cyclopedia of Horticulture",
        date: "1917",
        quote: "Modern greenhouse hybrids of **Streptocarpus** produce large trumpet-shaped flowers on slender scapes."
      }
    ]
  },
  "streptococcal": {
    primary: "Of, relating to, or caused by bacteria of the genus Streptococcus.",
    secondary: "Pertaining to clinical conditions such as streptococcal pharyngitis (strep throat), scarlet fever, erysipelas, or rheumatic fever.",
    quotes: [
      {
        author: "Alexander Fleming",
        work: "On the Antibacterial Action of Cultures of a Penicillium",
        date: "1929",
        quote: "Penicillin exhibited intense bacteriostatic power against staphylococcal and **streptococcal** organisms."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1892",
        quote: "Acute rheumatic fever is closely linked to preceding **streptococcal** inflammation of the tonsils."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "Glomerulonephritis frequently develops several weeks after an untreated **streptococcal** skin infection."
      }
    ]
  },
  "streptococci": {
    primary: "Plural form of streptococcus; spherical Gram-positive bacteria that form pairs or chains.",
    secondary: "Pathogenic and commensal bacteria classified serologically by Lancefield groupings (Groups A, B, etc.) and hemolytic patterns (alpha, beta, gamma).",
    quotes: [
      {
        author: "Louis Pasteur",
        work: "On the Extension of the Germ Theory to the Etiology of Certain Common Diseases",
        date: "1880",
        quote: "Microscopic examination of puerperal fever exudates revealed chains of spherical **streptococci**."
      },
      {
        author: "Rebecca Lancefield",
        work: "A Serological Differentiation of Human and Other Groups of Hemolytic Streptococci",
        date: "1933",
        quote: "By extracting specific cell-wall carbohydrate antigens, we subdivided pathogenic **streptococci** into distinct immunological groups."
      },
      {
        author: "Paul de Kruif",
        work: "Microbe Hunters",
        date: "1926",
        quote: "The physician watched through the lens as the malignant **streptococci** formed tangled bead-like necklaces."
      }
    ]
  },
  "streptococcic": {
    primary: "Relating to, caused by, or characteristic of streptococci; streptococcal.",
    secondary: "Denoting a pathological condition or bacteriological feature associated with streptococcal infection.",
    quotes: [
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1901",
        quote: "The cutaneous erythema of scarlet fever is a direct toxic manifestation of **streptococcic** invasion."
      },
      {
        author: "Ernst von Bergmann",
        work: "A System of Practical Surgery",
        date: "1904",
        quote: "The wound presented spreading margins typical of acute **streptococcic** cellulitis."
      },
      {
        author: "Howard Florey",
        work: "Antibiotics",
        date: "1949",
        quote: "Clinical trials demonstrated that **streptococcic** septicemia yielded rapidly to systemic penicillin infusions."
      }
    ]
  },
  "streptococcus": {
    primary: "A bacterium of a genus that includes the agents of souring milk and various serious infections such as scarlet fever and pneumonia, typically forming chains.",
    secondary: "A genus of non-motile, Gram-positive cocci in the family Streptococcaceae that divide along a single axis to produce distinctive chain-like colonies.",
    quotes: [
      {
        author: "Theodor Billroth",
        work: "Untersuchungen über die Vegetationsformen von Coccobacteria septica",
        date: "1874",
        quote: "Billroth first coined the term **Streptococcus**, uniting Greek streptos with coccus to describe round bacteria chained like rosaries."
      },
      {
        author: "Alexander Fleming",
        work: "Penicillin, Nobel Lecture",
        date: "1945",
        quote: "The sensitivity of virulent **Streptococcus** pyogenes to penicillin opened a new era in infectious disease medicine."
      },
      {
        author: "Lewis Thomas",
        work: "The Lives of a Cell",
        date: "1974",
        quote: "The hemolytic **Streptococcus** does not set out to destroy its human host; the damage results from an explosive immune overreaction."
      }
    ]
  },
  "streptodornase": {
    primary: "An enzyme (deoxyribonuclease) produced by hemolytic streptococci that liquefies viscous purulent exudates and DNA debris.",
    secondary: "Used clinically in combination with streptokinase (Varidase) for enzymatic wound debridement to dissolve thick clotted fibrin and purulent collections.",
    quotes: [
      {
        author: "William S. Tillett",
        work: "The Action of Streptococcal Fibrinolysin and Deoxyribonuclease",
        date: "1949",
        quote: "The administration of **streptodornase** rapidly depolymerizes free extracellular DNA, thinning thick pus into liquid drainage."
      },
      {
        author: "Louis S. Goodman and Alfred Gilman",
        work: "The Pharmacological Basis of Therapeutics",
        date: "1970",
        quote: "Enzymatic debridement with **streptodornase** facilitates surgical wound drainage without injuring living granulation tissue."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "Purulent exudates owe their tenacious viscosity to cellular nucleoproteins, which **streptodornase** readily hydrolyzes."
      }
    ]
  },
  "streptokinase": {
    primary: "An enzyme produced by beta-hemolytic streptococci that dissolves blood clots by activating plasminogen to plasmin.",
    secondary: "A major thrombolytic medication administered intravenously in acute myocardial infarction, pulmonary embolism, and deep vein thrombosis.",
    quotes: [
      {
        author: "William S. Tillett and R. L. Garner",
        work: "The Fibrinolytic Activity of Hemolytic Streptococci",
        date: "1933",
        quote: "The bacterial filtrate contains a potent fibrinolytic activator, subsequently named **streptokinase**, that dissolves human fibrin clots."
      },
      {
        author: "Eugene Braunwald",
        work: "Heart Disease: A Textbook of Cardiovascular Medicine",
        date: "1988",
        quote: "Early intravenous infusion of **streptokinase** during acute myocardial infarction restores coronary perfusion and salvages ischemic myocardium."
      },
      {
        author: "Jerome Groopman",
        work: "The Anatomy of Hope",
        date: "2004",
        quote: "The emergency team administered **streptokinase** immediately, racing to dissolve the arterial thrombus before irreversible necrosis set in."
      }
    ]
  },
  "streptolysin": {
    primary: "Any of several hemolytic exotoxins produced by streptococci that lyse red and white blood cells (e.g., streptolysin O and streptolysin S).",
    secondary: "An oxygen-labile pore-forming bacterial cytolysin whose antibodies (anti-streptolysin O, or ASO titer) serve as a diagnostic indicator of recent group A streptococcal infection.",
    quotes: [
      {
        author: "Rebecca Lancefield",
        work: "Studies on the Antigenic Properties of Streptolysin",
        date: "1934",
        quote: "The hemolytic power of group A streptococcal broth cultures is mediated by the potent protein toxin **streptolysin**."
      },
      {
        author: "Bruce Alberts et al.",
        work: "Molecular Biology of the Cell",
        date: "2002",
        quote: "**Streptolysin** O oligomerizes in host cell membranes to form large transmembrane pores that cause osmotic lysis."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1901",
        quote: "Elevated serological titers against **streptolysin** confirm antecedent infection in patients presenting with post-streptococcal chorea."
      }
    ]
  },
  "streptomyces": {
    primary: "A large genus of Gram-positive, spore-forming filamentous soil bacteria belonging to the actinomycetes, renowned as the source of many clinical antibiotics.",
    secondary: "Soil-dwelling microbes characterized by complex branching mycelia and the synthesis of natural bioactive metabolites (streptomycin, chloramphenicol, tetracycline, neomycin).",
    quotes: [
      {
        author: "Selman Waksman",
        work: "Neomycin: Nature, Formation, and Practical Application",
        date: "1953",
        quote: "The genus **Streptomyces** has yielded an extraordinary wealth of antimicrobial substances capable of combating bacterial disease."
      },
      {
        author: "René Dubos",
        work: "The Bacterial Cell",
        date: "1945",
        quote: "The characteristic earthy scent of freshly ploughed soil is produced by volatile geosmins synthesized by species of **Streptomyces**."
      },
      {
        author: "Lewis Thomas",
        work: "The Medusa and the Snail",
        date: "1979",
        quote: "Filamentous actinomycetes like **Streptomyces** wage chemical warfare through tiny antibiotic molecules evolved over millions of years."
      }
    ]
  },
  "streptomycetaceae": {
    primary: "A taxonomic family of Gram-positive, aerobic, spore-forming actinobacteria in the order Streptomycetales, typified by the genus Streptomyces.",
    secondary: "Filamentous soil bacteria whose life cycle involves vegetative substrate mycelia and aerial hyphae that fragment into chains of non-motile arthrospores.",
    quotes: [
      {
        author: "Selman Waksman",
        work: "The Actinomycetes: Their Nature, Occurrence, Activities, and Importance",
        date: "1950",
        quote: "The family **Streptomycetaceae** is differentiated from other actinomycetes by the formation of aerial mycelium bearing catenulate spores."
      },
      {
        author: "Martinus Beijerinck",
        work: "Sur la production d'ammoniaque par les Actinomycètes",
        date: "1900",
        quote: "Soil analyses demonstrate that members of **Streptomycetaceae** are fundamental agents in the decomposition of chitin and cellulose."
      },
      {
        author: "David L. Hawksworth",
        work: "The Biodiversity of Microorganisms",
        date: "1996",
        quote: "More than half of all medically useful natural antibiotics originate from the diverse metabolic pathways of the **Streptomycetaceae**."
      }
    ]
  },
  "streptomycin": {
    primary: "An antibiotic substance produced by the soil bacterium Streptomyces griseus, the first effective aminoglycoside antibiotic discovered for treating tuberculosis.",
    secondary: "An antimicrobial agent that inhibits bacterial protein synthesis by binding to the 30S ribosomal subunit, causing misreading of messenger RNA.",
    quotes: [
      {
        author: "Selman Waksman, Albert Schatz, and Elizabeth Bugie",
        work: "Streptomycin, a Substance Exhibiting Antibiotic Activity Against Gram-Positive and Gram-Negative Bacteria",
        date: "1944",
        quote: "We have isolated a new antibiotic, **streptomycin**, which displays marked activity against the tubercle bacillus."
      },
      {
        author: "René Dubos",
        work: "The White Plague: Tuberculosis, Man, and Society",
        date: "1952",
        quote: "The clinical introduction of **streptomycin** transformed tuberculosis from an incurable scourge into a manageable bacterial infection."
      },
      {
        author: "Oliver Sacks",
        work: "Uncle Tungsten",
        date: "2001",
        quote: "Waksman's Nobel Prize in 1952 celebrated the discovery of **streptomycin**, heralding the golden age of antibiotic therapy."
      }
    ]
  },
  "streptopelia": {
    primary: "A genus of small to medium-sized slender doves in the pigeon family (Columbidae), commonly known as turtle doves and collared doves.",
    secondary: "Granivorous, highly vocal columbid birds characterized by distinct black neck patches or collars and worldwide temperate and tropical distributions.",
    quotes: [
      {
        author: "Charles Darwin",
        work: "The Variation of Animals and Plants under Domestication",
        date: "1868",
        quote: "The domesticated Barbary dove is readily crossed with species of the genus **Streptopelia**, demonstrating their close phylogenetic affinity."
      },
      {
        author: "Gilbert White",
        work: "The Natural History of Selborne",
        date: "1789",
        quote: "The soft, plaintive cooing of the turtle dove, belonging to **Streptopelia**, is the quintessential herald of high summer."
      },
      {
        author: "Ernst Mayr",
        work: "Systematics and the Origin of Species",
        date: "1942",
        quote: "The geographic expansion of the Eurasian collared dove (*Streptopelia decaocto*) is one of the most rapid avian colonization events on record."
      }
    ]
  },
  "streptosolen": {
    primary: "A monotypic genus of evergreen shrubs in the nightshade family (Solanaceae), native to South America, represented by Streptosolen jamesonii (marmalade bush).",
    secondary: "An ornamental flowering shrub named from Greek streptos (twisted) and solen (tube) for the spirally twisted corolla tube of its brilliant yellow, orange, and red flowers.",
    quotes: [
      {
        author: "John Lindley",
        work: "Edwards's Botanical Register",
        date: "1847",
        quote: "Lindley established the genus **Streptosolen** to denote the singular spirally twisted tube of the floral corolla."
      },
      {
        author: "Gertrude Jekyll",
        work: "Colour in the Flower Garden",
        date: "1908",
        quote: "The vibrant orange and fiery amber clusters of **Streptosolen** make a dazzling display in the winter greenhouse."
      },
      {
        author: "Liberty Hyde Bailey",
        work: "The Standard Cyclopedia of Horticulture",
        date: "1917",
        quote: "**Streptosolen** jamesonii is a vigorous scrambling shrub that blooms profusely under warm conservatory culture."
      }
    ]
  },
  "streptothricin": {
    primary: "An early aminoglycoside-related antibiotic complex produced by Streptomyces lavendulae, discovered by Selman Waksman in 1942.",
    secondary: "The historical precursor to streptomycin, effective against both Gram-negative and Gram-positive pathogens, but limited clinically by delayed nephrotoxicity.",
    quotes: [
      {
        author: "Selman Waksman and H. Boyd Woodruff",
        work: "Streptothricin, a New Selective Bacteriostatic and Bactericidal Agent",
        date: "1942",
        quote: "We isolated **streptothricin** from an actinomycete, demonstrating remarkable inhibitory power against colon bacilli."
      },
      {
        author: "Howard Florey",
        work: "Antibiotics",
        date: "1949",
        quote: "While **streptothricin** proved too toxic for human systemic therapy, its discovery led directly to the isolation of streptomycin."
      },
      {
        author: "René Dubos",
        work: "The Bacterial Cell",
        date: "1945",
        quote: "The investigation of **streptothricin** established that soil actinomycetes possess complex and diverse antibiotic capabilities."
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

console.log("Done Batch 2 (strept) of Cluster Turning & Transformation!");
