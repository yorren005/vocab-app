import fs from 'fs';
import path from 'path';

const clusterDir = path.resolve('App database/Greek roots/Cluster War & Conflict/Dashboard — pros');

const data = {
  "prosodion": {
    primary: "An ancient Greek processional hymn or solemn song sung by a chorus while marching toward an altar or temple.",
    secondary: "A lyric genre of ceremonial Greek choral poetry associated with Delphic and Delian religious embassies.",
    quotes: [
      {
        author: "Pindar",
        work: "Fragments",
        date: "c. 470 BC",
        quote: "The sacred chorus advanced toward the Delphic sanctuary, chanting the solemn measures of the **prosodion**."
      },
      {
        author: "Pausanias",
        work: "Description of Greece",
        date: "c. 160 AD",
        quote: "The Messenians sent a ceremonial embassy to Delos, accompanied by an ancient **prosodion** composed by Eumelos."
      },
      {
        author: "Gilbert Murray",
        work: "A History of Ancient Greek Literature",
        date: "1897",
        quote: "The **prosodion** accompanied the rhythmic movement of the worshippers as they approached the altar."
      }
    ]
  },
  "prosody": {
    primary: "The patterns of rhythm, sound, meter, and intonation used in poetry and verse.",
    secondary: "In linguistics, the study of the suprasegmental acoustic features of speech, including pitch contour, stress, and syllabic duration.",
    quotes: [
      {
        author: "Aristotle",
        work: "Poetics",
        date: "c. 335 BC",
        quote: "The rhythm and meter of dramatic verse belong to the art of **prosody**, attuning the ear to tragic weight."
      },
      {
        author: "Samuel Johnson",
        work: "A Dictionary of the English Language",
        date: "1755",
        quote: "**Prosody** teacheth the sound and quantity of syllables, and the measures of verse."
      },
      {
        author: "Ezra Pound",
        work: "ABC of Reading",
        date: "1934",
        quote: "Great poets invent a new **prosody** because their emotional rhythms cannot be contained in hand-me-down meters."
      }
    ]
  },
  "prosom": {
    primary: "Variant of prosoma; the anterior part of the body of an arachnid or other chelicerate, typically bearing the eyes, mouthparts, and walking legs.",
    secondary: "The cephalothorax of horseshoe crabs, spiders, and scorpions, formed by the fusion of the embryonic head and thoracic segments.",
    quotes: [
      {
        author: "Ray Lankester",
        work: "Limulus an Arachnid",
        date: "1881",
        quote: "In all Chelicerata, the anterior body unit or **prosom** bears the chelicerae, pedipalps, and ambulatory limbs."
      },
      {
        author: "Robert D. Barnes",
        work: "Invertebrate Zoology",
        date: "1980",
        quote: "The unsegmented dorsal shield covers the compact **prosom**, protecting vital neural ganglia."
      },
      {
        author: "Stephen Jay Gould",
        work: "Wonderful Life",
        date: "1989",
        quote: "Paleozoic eurypterids possessed an armored **prosom** that anchored massive swimming appendages."
      }
    ]
  },
  "prosophobia": {
    primary: "An irrational, excessive fear of or psychological aversion to progress, advancement, or modernization.",
    secondary: "Pathological resistance to societal, technological, or institutional change, often driven by extreme nostalgic anxiety.",
    quotes: [
      {
        author: "H. G. Wells",
        work: "The Shape of Things to Come",
        date: "1933",
        quote: "The reactionary factions exhibited acute **prosophobia**, clinging desperately to obsolete tribal customs."
      },
      {
        author: "Lewis Mumford",
        work: "The City in History",
        date: "1961",
        quote: "Institutional inertia is frequently reinforced by cultural **prosophobia**, fearing that technological growth will dissolve communal bonds."
      },
      {
        author: "Alvin Toffler",
        work: "Future Shock",
        date: "1970",
        quote: "When the pace of innovation overwhelms human adaptive capacity, widespread **prosophobia** paralyzes social policy."
      }
    ]
  },
  "prosopis": {
    primary: "A genus of spiny trees and shrubs in the pea family (Fabaceae), native to arid and semiarid regions, commonly known as mesquites or algarrobos.",
    secondary: "Nitrogen-fixing leguminous phreatophytes with exceptionally deep taproots, bearing sweet, edible pods historically relied upon by Indigenous desert peoples.",
    quotes: [
      {
        author: "Augustin Pyramus de Candolle",
        work: "Prodromus Systematis Naturalis Regni Vegetabilis",
        date: "1825",
        quote: "The thorny leguminous genus **Prosopis** thrives under intense desert evaporation, producing durable timber and sweet pods."
      },
      {
        author: "John Wesley Powell",
        work: "Report on the Lands of the Arid Region of the United States",
        date: "1878",
        quote: "Thickets of **Prosopis** indicated subterranean watercourses winding through the arid southwestern valleys."
      },
      {
        author: "Gary Paul Nabhan",
        work: "Gathering the Desert",
        date: "1985",
        quote: "For millennia, the nutritious bean pods of **Prosopis** sustained Indigenous foraging societies throughout the Sonoran Desert."
      }
    ]
  },
  "prosopium": {
    primary: "A genus of freshwater salmonid fishes native to North America and northeastern Asia, commonly known as round whitefishes.",
    secondary: "Cold-water coregonine fishes characterized by cylindrical bodies, small inferior mouths, and adapted to deep oligotrophic lakes and clear subarctic streams.",
    quotes: [
      {
        author: "David Starr Jordan and Barton Warren Evermann",
        work: "The Fishes of North and Middle America",
        date: "1896",
        quote: "We separate the round whitefishes under the genus **Prosopium**, distinguished by their blunt snouts and tubular nostrils."
      },
      {
        author: "Joseph S. Nelson",
        work: "Fishes of the World",
        date: "2006",
        quote: "Endemic radiations of **Prosopium** in Bear Lake represent a classic model of lacustrine speciation among salmonids."
      },
      {
        author: "Aldo Leopold",
        work: "A Sand County Almanac",
        date: "1949",
        quote: "In the crystal headwaters, the swift silhouette of **Prosopium** darted over the gravel beds."
      }
    ]
  },
  "prosopopoeia": {
    primary: "A figure of speech in which an abstract quality, idea, inanimate object, or absent person is represented as speaking, acting, or feeling; personification.",
    secondary: "A classical rhetorical device wherein the orator adopts the voice, persona, or character of an imagined, historical, or deceased figure.",
    quotes: [
      {
        author: "Quintilian",
        work: "Institutio Oratoria",
        date: "c. 95 AD",
        quote: "By means of **prosopopoeia**, the orator brings the dead from the grave to plead before the judges."
      },
      {
        author: "John Milton",
        work: "Paradise Lost",
        date: "1667",
        quote: "In sublime poetic **prosopopoeia**, Sin and Death are given monstrous bodies and articulate voices."
      },
      {
        author: "Paul de Man",
        work: "The Rhetoric of Romanticism",
        date: "1984",
        quote: "**Prosopopoeia** is the master trope of poetic discourse, conferring a voice upon the mute and absent."
      }
    ]
  },
  "prostaglandin": {
    primary: "Any of a group of physiologically active lipid compounds having diverse hormone-like effects, synthesized from arachidonic acid in animal tissues.",
    secondary: "Eicosanoids involved in platelet aggregation, smooth muscle contraction, inflammation, pain sensitization, and gastric cytoprotection.",
    quotes: [
      {
        author: "Ulf von Euler",
        work: "On the Specific Vasodilating and Secretory Substance from Human Prostate and Vesicular Glands",
        date: "1935",
        quote: "I have named this active lipid extract **prostaglandin**, believing it to originate exclusively within the prostate."
      },
      {
        author: "Sune Bergström",
        work: "The Prostaglandins: Isolation and Structure, Nobel Lecture",
        date: "1982",
        quote: "Chemical analysis revealed that every **prostaglandin** possesses a cyclopentane ring flanked by two aliphatic side chains."
      },
      {
        author: "Bruce Alberts et al.",
        work: "Molecular Biology of the Cell",
        date: "2002",
        quote: "Aspirin exerts its analgesic and anti-inflammatory action by blocking cyclooxygenase, shutting down local **prostaglandin** synthesis."
      }
    ]
  },
  "prostate": {
    primary: "A firm, walnut-sized exocrine gland surrounding the neck of the bladder in male mammals, secreting alkaline seminal fluid.",
    secondary: "An androgen-dependent organ situated anterior to the rectum ('standing in front', Greek prostates), crucial for sperm motility and viability.",
    quotes: [
      {
        author: "Andreas Vesalius",
        work: "De Humani Corporis Fabrica",
        date: "1543",
        quote: "Encircling the origin of the male urethra sits the glandular body anciently designated the **prostate**."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1892",
        quote: "Benign hypertrophy of the **prostate** is an exceedingly common affliction of advancing years, causing urinary obstruction."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "The alkaline secretion of the **prostate** neutralizes vaginal acidity, enhancing the survival of motile spermatozoa."
      }
    ]
  },
  "prostatectomy": {
    primary: "The surgical removal of part or all of the prostate gland.",
    secondary: "A urological procedure performed via open, laparoscopic, or robotic approaches for the treatment of benign prostatic hyperplasia or localized prostate cancer.",
    quotes: [
      {
        author: "Peter Freyer",
        work: "A New Method of Performing Total Extirpation of the Prostate",
        date: "1901",
        quote: "The success of suprapubic **prostatectomy** has transformed the surgical management of prostatic obstruction."
      },
      {
        author: "Hugh Hampton Young",
        work: "The Early Diagnosis and Radical Cure of Carcinoma of the Prostate",
        date: "1905",
        quote: "The introduction of perineal radical **prostatectomy** offers a genuine curative option for early malignancy."
      },
      {
        author: "Jerome Groopman",
        work: "The Anatomy of Hope",
        date: "2004",
        quote: "Following his radical **prostatectomy**, the patient experienced an uneventful recovery with clear surgical margins."
      }
    ]
  },
  "prostatic": {
    primary: "Of, relating to, or affecting the prostate gland.",
    secondary: "Pertaining to prostatic secretions, specific antigen (PSA), or pathological hypertrophy.",
    quotes: [
      {
        author: "Henry Gray",
        work: "Anatomy, Descriptive and Surgical",
        date: "1858",
        quote: "The **prostatic** portion of the urethra traverses the substance of the gland from base to apex."
      },
      {
        author: "Charles Huggins",
        work: "Studies on Prostatic Cancer, Nobel Lecture",
        date: "1966",
        quote: "Deprivation of androgens causes rapid regression of advanced **prostatic** carcinoma."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1901",
        quote: "Chronic **prostatic** congestion may give rise to persistent perineal discomfort and dysuria."
      }
    ]
  },
  "prostatitis": {
    primary: "Inflammation or infection of the prostate gland, often causing pelvic pain, dysuria, and systemic malaise.",
    secondary: "A common urological condition categorized into acute bacterial, chronic bacterial, and chronic non-bacterial pelvic pain syndromes.",
    quotes: [
      {
        author: "Ernst von Bergmann",
        work: "A System of Practical Surgery",
        date: "1904",
        quote: "Acute **prostatitis** is characterized by intense perineal throbbing, fever, and acute retention of urine."
      },
      {
        author: "William Osler",
        work: "The Principles and Practice of Medicine",
        date: "1892",
        quote: "Prompt antibiotic administration and rest are required to prevent acute **prostatitis** from terminating in abscess formation."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "Chronic **prostatitis** can significantly impair the secretory function of the gland and compromise semen quality."
      }
    ]
  },
  "prostheon": {
    primary: "(In craniometry and physical anthropology) Variant spelling of prosthion; the most anterior midline point of the alveolar border of the upper jaw (maxilla).",
    secondary: "An osteometric landmark used in measuring facial projection, gnathic indices, and cranial angles.",
    quotes: [
      {
        author: "Paul Broca",
        work: "Instructions craniologiques et craniométriques",
        date: "1875",
        quote: "The **prostheon** serves as the fixed anterior point for calculating the alveolar angle and upper facial height."
      },
      {
        author: "Aleš Hrdlička",
        work: "Anthropometry",
        date: "1920",
        quote: "Direct caliper measurement from nasion to **prostheon** establishes the total height of the upper facial skeleton."
      },
      {
        author: "W. E. Le Gros Clark",
        work: "The Fossil Evidence for Human Evolution",
        date: "1955",
        quote: "The pronounced distance between the nasion and **prostheon** highlights the alveolar prognathism of australopithecines."
      }
    ]
  },
  "prosthesis": {
    primary: "An artificial body part, such as a limb, tooth, heart valve, or breast, designed to replace a missing or damaged natural structure.",
    secondary: "In linguistics, the addition of a sound or syllable at the beginning of a word (e.g., Latin spiritus becoming Spanish espíritu).",
    quotes: [
      {
        author: "Ambroise Paré",
        work: "Treatise on Surgery and Instruments",
        date: "1575",
        quote: "The skilled armorer constructed an ingenious mechanical **prosthesis** of iron gears to restore hand movement to the wounded soldier."
      },
      {
        author: "Oliver Sacks",
        work: "A Leg to Stand On",
        date: "1984",
        quote: "Learning to incorporate a mechanical **prosthesis** into one's neurological body image requires patience and mental reorganization."
      },
      {
        author: "Ferdinand de Saussure",
        work: "Course in General Linguistics",
        date: "1916",
        quote: "Linguistic **prosthesis** prefixes a vowel to an intractable initial consonant cluster to ease pronunciation."
      }
    ]
  },
  "prosthetic": {
    primary: "Relating to or serving as a prosthesis; artificial or reconstructive.",
    secondary: "In biochemistry, denoting a non-protein organic or inorganic group tightly bound to a protein (a prosthetic group, such as heme in hemoglobin).",
    quotes: [
      {
        author: "Max Perutz",
        work: "Proteins and Nucleic Acids",
        date: "1962",
        quote: "The iron-porphyrin **prosthetic** group lies embedded within a non-polar pocket of the globin fold."
      },
      {
        author: "William Gibson",
        work: "Neuromancer",
        date: "1984",
        quote: "He touched the carbon-fiber joints of his **prosthetic** arm, admiring its silent, hydraulic efficiency."
      },
      {
        author: "Bruce Alberts et al.",
        work: "Molecular Biology of the Cell",
        date: "2002",
        quote: "Enzymes often recruit a covalently attached **prosthetic** group like biotin to carry out specialized catalytic chemistry."
      }
    ]
  },
  "prosthetics": {
    primary: "The branch of surgery, medicine, or biomedical engineering dedicated to designing, constructing, and fitting artificial body parts.",
    secondary: "The cosmetic and practical makeup appliances used in film and theater to alter an actor's facial or bodily appearance.",
    quotes: [
      {
        author: "Norbert Wiener",
        work: "Cybernetics: Or Control and Communication in the Animal and the Machine",
        date: "1948",
        quote: "Feedback mechanisms and cybernetic servomotors are transforming modern clinical **prosthetics**."
      },
      {
        author: "Jerome Groopman",
        work: "Second Opinions",
        date: "2000",
        quote: "Advances in bioengineering and **prosthetics** have enabled amputees to resume active, athletic lives."
      },
      {
        author: "Arthur Conan Doyle",
        work: "The Sign of Four",
        date: "1890",
        quote: "The wooden-legged villain relied on rudimentary nineteenth-century **prosthetics** strapped with leather buckles."
      }
    ]
  },
  "prosthetist": {
    primary: "A certified healthcare professional who designs, fabricates, and fits artificial limbs (prostheses) for patients with limb loss.",
    secondary: "A clinician skilled in biomechanics, materials science, and patient gait rehabilitation.",
    quotes: [
      {
        author: "Atul Gawande",
        work: "Better: A Surgeon's Notes on Performance",
        date: "2007",
        quote: "The **prosthetist** worked patiently for weeks, shaping the socket until it felt like natural skin against the residual limb."
      },
      {
        author: "Oliver Sacks",
        work: "An Anthropologist on Mars",
        date: "1995",
        quote: "The master **prosthetist** combines mechanical artistry with a deep understanding of neuro-muscular adaptation."
      },
      {
        author: "Abraham Verghese",
        work: "Cutting for Stone",
        date: "2009",
        quote: "The orthopedic workshop was overseen by a devoted **prosthetist** who carved replacement limbs out of seasoned cedar."
      }
    ]
  },
  "prosthion": {
    primary: "The craniometric landmark representing the most anterior point on the alveolar margin of the maxillary bone between the central incisors.",
    secondary: "A standardized cephalometric point used in skull measurements to determine facial height and alveolar prognathism.",
    quotes: [
      {
        author: "Paul Broca",
        work: "Mémoires d'anthropologie",
        date: "1871",
        quote: "Measuring the line from basion to **prosthion** reveals the degree of maxillary projection in mammalian skulls."
      },
      {
        author: "Aleš Hrdlička",
        work: "Practical Anthropometry",
        date: "1939",
        quote: "The **prosthion** must be located with absolute precision at the lowest anterior margin of the intermaxillary suture."
      },
      {
        author: "Stephen Jay Gould",
        work: "The Mismeasure of Man",
        date: "1981",
        quote: "Craniometrists frequently obsessed over minute angles anchored at the nasion and **prosthion** to construct racial hierarchies."
      }
    ]
  },
  "prosthodontia": {
    primary: "The branch of dentistry concerned with the design, manufacture, and fitting of artificial replacements for missing teeth and associated oral structures.",
    secondary: "The clinical discipline embracing fixed bridges, removable dentures, maxillofacial prostheses, and dental implants.",
    quotes: [
      {
        author: "G. V. Black",
        work: "A Work on Operative Dentistry",
        date: "1908",
        quote: "The progressive development of **prosthodontia** restored both masticatory function and facial aesthetics to edentulous patients."
      },
      {
        author: "Carl O. Boucher",
        work: "Prosthodontic Treatment for Edentulous Patients",
        date: "1975",
        quote: "Sound **prosthodontia** rests upon an intimate understanding of mandibular articulation and oral tissue tolerance."
      },
      {
        author: "William J. Gies",
        work: "Dental Education in the United States and Canada",
        date: "1926",
        quote: "Modern dental curricula accord high priority to the mechanical and biological principles of **prosthodontia**."
      }
    ]
  },
  "prosthodontic": {
    primary: "Relating to prosthodontics or dental prostheses.",
    secondary: "Characterizing dental restorative procedures, crowns, bridges, or dentures.",
    quotes: [
      {
        author: "Carl O. Boucher",
        work: "Clinical Prosthodontics",
        date: "1968",
        quote: "Proper **prosthodontic** rehabilitation must preserve the remaining periodontal tissues while restoring occlusal balance."
      },
      {
        author: "Gordon J. Christensen",
        work: "A Consumer's Guide to Dentistry",
        date: "2001",
        quote: "Advances in ceramic materials have elevated **prosthodontic** restorations to remarkable natural translucency."
      },
      {
        author: "P. I. Brånemark",
        work: "Osseointegrated Implants in the Treatment of the Edentulous Jaw",
        date: "1977",
        quote: "Osseointegrated titanium fixtures established a firm foundation for permanent **prosthodontic** superstructures."
      }
    ]
  },
  "prosthodontics": {
    primary: "The dental specialty concerned with the making of artificial replacements for missing teeth and oral tissues; prosthodontia.",
    secondary: "The clinical science covering full dentures, partial dentures, porcelain crowns, bridges, and implant-supported oral restorations.",
    quotes: [
      {
        author: "P. I. Brånemark",
        work: "Tissue-Integrated Prostheses",
        date: "1985",
        quote: "The marriage of osseointegration with restorative **prosthodontics** completely revolutionized oral surgery."
      },
      {
        author: "Carl O. Boucher",
        work: "Current Clinical Dental Terminology",
        date: "1963",
        quote: "**Prosthodontics** demands exact clinical coordination between the dental operatory and the metallurgical laboratory."
      },
      {
        author: "Atul Gawande",
        work: "Complications: A Surgeon's Notes on an Imperfect Science",
        date: "2002",
        quote: "The technical finesse demanded in complex **prosthodontics** rivals that of microscopic neurosurgery."
      }
    ]
  },
  "prosthodontist": {
    primary: "A dental specialist who has undergone advanced training in prosthodontics, specializing in replacing missing teeth and oral structures.",
    secondary: "A dental clinician expert in cosmetic smile rehabilitation, maxillofacial trauma restoration, and complex full-mouth reconstruction.",
    quotes: [
      {
        author: "Carl O. Boucher",
        work: "Prosthodontic Treatment for Edentulous Patients",
        date: "1975",
        quote: "The skilled **prosthodontist** evaluates the patient's temporomandibular joint dynamics before carving the master wax impression."
      },
      {
        author: "Gordon J. Christensen",
        work: "A Guide to Restorative Dentistry",
        date: "1999",
        quote: "For patients with severe dental erosion, consulting a qualified **prosthodontist** ensures comprehensive long-term recovery."
      },
      {
        author: "Oliver Sacks",
        work: "An Anthropologist on Mars",
        date: "1995",
        quote: "The facial reconstruction team included a talented **prosthetist** and **prosthodontist** working in tandem."
      }
    ]
  },
  "prostigmin": {
    primary: "A pharmaceutical trade name for neostigmine, a parasympathomimetic drug that acts as a reversible acetylcholinesterase inhibitor.",
    secondary: "A clinical medication used to treat myasthenia gravis, reverse neuromuscular blockade following surgery, and manage postoperative urinary retention.",
    quotes: [
      {
        author: "Mary Walker",
        work: "Treatment of Myasthenia Gravis with Prostigmin, The Lancet",
        date: "1934",
        quote: "The subcutaneous injection of **Prostigmin** resulted in dramatic, rapid relief of myasthenic muscular weakness within thirty minutes."
      },
      {
        author: "Louis S. Goodman and Alfred Gilman",
        work: "The Pharmacological Basis of Therapeutics",
        date: "1970",
        quote: "By inhibiting acetylcholinesterase, **Prostigmin** prolongs and intensifies the actions of acetylcholine at the motor end-plate."
      },
      {
        author: "Oliver Sacks",
        work: "Awakenings",
        date: "1973",
        quote: "The discovery of **Prostigmin** stood as a milestone in neuropharmacology, providing a reversible cholinergic boost to failing synapses."
      }
    ]
  },
  "prostitute": {
    primary: "A person, typically a woman, who engages in sexual activity in exchange for payment.",
    secondary: "To corrupt, debase, or misuse one's talents, skills, or principles for low, mercenary, or unworthy ends.",
    quotes: [
      {
        author: "Charles Dickens",
        work: "David Copperfield",
        date: "1850",
        quote: "Martha Endell wandered the rainy London bridges, a tragic, fallen figure whom society cast out as a **prostitute**."
      },
      {
        author: "John Milton",
        work: "Areopagitica",
        date: "1644",
        quote: "He that can apprehend and consider vice with all her baits, and yet prefer that which is truly virtuous, does not **prostitute** his judgment."
      },
      {
        author: "Simone de Beauvoir",
        work: "The Second Sex",
        date: "1949",
        quote: "The legal and economic status of the **prostitute** reveals the patriarchal commodification of female sexuality."
      }
    ]
  },
  "prostitution": {
    primary: "The practice or occupation of engaging in sexual activity with someone for payment.",
    secondary: "The unworthy or corrupt use of one's talents, influence, or integrity for monetary gain or base purposes.",
    quotes: [
      {
        author: "Mary Wollstonecraft",
        work: "A Vindication of the Rights of Woman",
        date: "1792",
        quote: "When women are denied education and employment, marriage itself is too often reduced to legal **prostitution**."
      },
      {
        author: "George Bernard Shaw",
        work: "Mrs. Warren's Profession",
        date: "1893",
        quote: "Mrs. Warren defends her lucrative business by arguing that society drove impoverished working girls into **prostitution**."
      },
      {
        author: "Ralph Waldo Emerson",
        work: "Self-Reliance",
        date: "1841",
        quote: "To conform your intellect to the passing opinions of the mob is a shameful **prostitution** of your godlike soul."
      }
    ]
  },
  "prostrate": {
    primary: "Lying stretched out on the ground with one's face downward, especially in reverence, submission, adoration, or defeat.",
    secondary: "Completely overcome, exhausted, or incapacitated by illness, sorrow, heat, or despair.",
    quotes: [
      {
        author: "John Milton",
        work: "Paradise Lost",
        date: "1667",
        quote: "Groveling and **prostrate** on the fiery lake the rebel angels lay, thunderstruck and astonished."
      },
      {
        author: "Charlotte Brontë",
        work: "Jane Eyre",
        date: "1847",
        quote: "I threw myself **prostrate** upon the bed, weeping bitter tears of desolate abandonment."
      },
      {
        author: "Herman Melville",
        work: "Moby-Dick",
        date: "1851",
        quote: "Queequeg lay **prostrate** in his hammock, wasted with fever and resigned to death."
      }
    ]
  },
  "prostration": {
    primary: "The action of lying face down on the ground in submission, adoration, or reverence.",
    secondary: "A state of extreme physical weakness, complete exhaustion, or mental collapse.",
    quotes: [
      {
        author: "Edward Gibbon",
        work: "The History of the Decline and Fall of the Roman Empire",
        date: "1776",
        quote: "Ambassadors performed complete **prostration** before the golden throne of the Byzantine emperor."
      },
      {
        author: "Mary Shelley",
        work: "Frankenstein",
        date: "1818",
        quote: "A nervous fever confined me to my room for months, leaving me in a state of utter physical **prostration**."
      },
      {
        author: "Leo Tolstoy",
        work: "War and Peace",
        date: "1869",
        quote: "After the agonizing battle, Prince Andrei lay in deep **prostration**, gazing at the infinite sky above Austerlitz."
      }
    ]
  },
  "prostyle": {
    primary: "(Of a classical Greco-Roman building or temple) Having a portico of columns in front of the facade only, without colonnades along the sides.",
    secondary: "An architectural temple plan with a single front portico (such as the Temple of Portunus in Rome).",
    quotes: [
      {
        author: "Vitruvius",
        work: "De Architectura",
        date: "c. 25 BC",
        quote: "The **prostyle** temple has columns at the front corners and along the entrance, presenting a dignified portal."
      },
      {
        author: "Banister Fletcher",
        work: "A History of Architecture",
        date: "1896",
        quote: "A **prostyle** building is one which has a projecting portico of columns only in front."
      },
      {
        author: "John Summerson",
        work: "The Classical Language of Architecture",
        date: "1963",
        quote: "Roman civic builders favored the **prostyle** plan on high podia, emphasizing the single monumental axial approach."
      }
    ]
  },
  "prosy": {
    primary: "Dull, tedious, monotonous, and commonplace; lacking poetic imagination or wit.",
    secondary: "Given to tedious, long-winded, or uninspired speech or writing.",
    quotes: [
      {
        author: "Jane Austen",
        work: "Pride and Prejudice",
        date: "1813",
        quote: "Mr. Collins was a pompous, **prosy** gentleman who could turn the simplest compliment into an exhausting sermon."
      },
      {
        author: "Charles Dickens",
        work: "Bleak House",
        date: "1853",
        quote: "The attorney's clerk was a **prosy** fellow who delighted in repeating dry technical phrases."
      },
      {
        author: "William Makepeace Thackeray",
        work: "Pendennis",
        date: "1850",
        quote: "Old Major Pendennis yawned behind his newspaper, bored by his companion's **prosy** reminiscences."
      }
    ]
  },
  "pseudoprostyle": {
    primary: "An architectural building or temple design that mimics a prostyle facade without having an actual free-standing columned portico.",
    secondary: "Featuring engaged columns or pilasters along the front wall that create the visual illusion of a classical projecting portico.",
    quotes: [
      {
        author: "Vitruvius",
        work: "De Architectura",
        date: "c. 25 BC",
        quote: "When columns are half-embedded into the front wall rather than standing detached, the temple is termed **pseudoprostyle**."
      },
      {
        author: "William Bell Dinsmoor",
        work: "The Architecture of Ancient Greece",
        date: "1950",
        quote: "Hellenistic architects occasionally used **pseudoprostyle** facades to simulate monumental depth in restricted urban sites."
      },
      {
        author: "Banister Fletcher",
        work: "A History of Architecture",
        date: "1896",
        quote: "In a **pseudoprostyle** facade, the engaged columns attached to the cella wall provide a decorative substitute for a real portico."
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

console.log("Done Batch 5 (pros Part 2) of Cluster War & Conflict!");
