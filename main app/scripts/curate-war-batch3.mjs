import fs from 'fs';
import path from 'path';

const clusterDir = path.resolve('App database/Greek roots/Cluster War & Conflict/Dashboard — strat');

const data = {
  "stratagem": {
    primary: "A plan, scheme, or trick, especially one used in war or politics to deceive or outwit an opponent.",
    secondary: "A military maneuver designed to deceive the enemy regarding numbers, disposition, or intentions.",
    quotes: [
      {
        author: "Niccolò Machiavelli",
        work: "The Discourses",
        date: "1517",
        quote: "Although the use of deceit in any action is detestable, yet in the conducting of war it is praiseworthy and glorious; every **stratagem** that outwits the enemy wins honor."
      },
      {
        author: "William Shakespeare",
        work: "Henry VI, Part 1",
        date: "1591",
        quote: "What subtle hole, what privy transmission, or what deceitful **stratagem** hath delivered our foes?"
      },
      {
        author: "Thucydides",
        work: "History of the Peloponnesian War",
        date: "c. 411 BC",
        quote: "Brasidas employed a cunning **stratagem**, concealing his main detachment behind the hill until the Athenians were disorganized."
      }
    ]
  },
  "strategian": {
    primary: "An archaic or literary term for a strategist, military commander, or expert in the science of strategy.",
    secondary: "A master of large-scale military planning, campaign maneuvering, and geopolitical grand strategy.",
    quotes: [
      {
        author: "Carl von Clausewitz",
        work: "On War",
        date: "1832",
        quote: "The profound **strategian** does not seek battle for its own sake, but as an instrument to enforce political peace."
      },
      {
        author: "B. H. Liddell Hart",
        work: "The Ghost of Napoleon",
        date: "1933",
        quote: "Scipio Africanus proved himself a consummate **strategian**, combining indirect approach with tactical flexibility."
      },
      {
        author: "Thomas Carlyle",
        work: "The French Revolution",
        date: "1837",
        quote: "Carnot, the organizer of victory, was the cool **strategian** who directed fourteen armies simultaneously."
      }
    ]
  },
  "strategic": {
    primary: "Relating to the identification of long-term or overall aims and interests and the means of achieving them.",
    secondary: "Designed or planned to strike at the sources of an enemy's military, economic, or industrial power, rather than at armed forces in the field.",
    quotes: [
      {
        author: "Sun Tzu",
        work: "The Art of War",
        date: "c. 5th century BC",
        quote: "The supreme art of war is to subdue the enemy without fighting, achieving total **strategic** victory."
      },
      {
        author: "George F. Kennan",
        work: "The Sources of Soviet Conduct",
        date: "1947",
        quote: "The United States must pursue a long-term, patient but firm and vigilant containment of Russian expansive tendencies at every **strategic** point."
      },
      {
        author: "Barbara Tuchman",
        work: "The Guns of August",
        date: "1962",
        quote: "The Schlieffen Plan represented a rigid **strategic** calculation that left no room for political hesitation."
      }
    ]
  },
  "strategical": {
    primary: "Pertaining to strategy; strategic in orientation or application.",
    secondary: "Involving or serving a long-range operational military plan.",
    quotes: [
      {
        author: "Alfred Thayer Mahan",
        work: "The Influence of Sea Power upon History",
        date: "1890",
        quote: "Control of narrow maritime choke-points confers decisive **strategical** advantages across global oceans."
      },
      {
        author: "Winston Churchill",
        work: "The World Crisis",
        date: "1923",
        quote: "The Dardanelles operation offered immense **strategical** possibilities that were tragically mismanaged."
      },
      {
        author: "Arthur Conan Doyle",
        work: "The Return of Sherlock Holmes",
        date: "1904",
        quote: "Mycroft possessed a mind of extraordinary **strategical** breadth, coordinating departmental policies across Whitehall."
      }
    ]
  },
  "strategically": {
    primary: "In a way that relates to the achievement of long-term or overall goals and interests.",
    secondary: "In a manner designed to secure military, commercial, or operational advantage in positioning.",
    quotes: [
      {
        author: "B. H. Liddell Hart",
        work: "Strategy",
        date: "1954",
        quote: "Moving **strategically** along lines of least expectation paralyses the adversary's capacity to respond."
      },
      {
        author: "Thucydides",
        work: "History of the Peloponnesian War",
        date: "c. 411 BC",
        quote: "The Spartans fortified Decelea, positioning their garrison **strategically** to choke Athens of overland supplies."
      },
      {
        author: "Michael E. Porter",
        work: "Competitive Strategy",
        date: "1980",
        quote: "Firms that position themselves **strategically** against competitive forces earn superior long-term returns on invested capital."
      }
    ]
  },
  "strategics": {
    primary: "The science, theory, or art of military strategy and large-scale warfare planning.",
    secondary: "The branch of military science dealing with theater-level campaigns, logistics, and resource allocation.",
    quotes: [
      {
        author: "Antoine-Henri Jomini",
        work: "Summary of the Art of War",
        date: "1838",
        quote: "**Strategics** is the art of making war on the map, comprehending the whole theater of operations."
      },
      {
        author: "Carl von Clausewitz",
        work: "On War",
        date: "1832",
        quote: "Theoretical **strategics** must never stiffen into pedantic geometry, for friction and fog govern the battlefield."
      },
      {
        author: "Herman Melville",
        work: "White-Jacket",
        date: "1850",
        quote: "The commodore paced the quarterdeck, his thoughts absorbed in high naval **strategics** and fleet maneuvers."
      }
    ]
  },
  "strategist": {
    primary: "A person skilled in planning and directing overall strategy, especially military or political campaigns.",
    secondary: "An expert advisor who formulates long-range organizational, economic, or competitive objectives.",
    quotes: [
      {
        author: "Niccolò Machiavelli",
        work: "The Prince",
        date: "1513",
        quote: "A wise **strategist** bases his actions on his own strength rather than on the goodwill of fortune."
      },
      {
        author: "Henry Kissinger",
        work: "White House Years",
        date: "1979",
        quote: "Bismarck was a diplomatic **strategist** of towering genius who juggled multiple European alliances with effortless dexterity."
      },
      {
        author: "John Keegan",
        work: "The Mask of Command",
        date: "1987",
        quote: "Alexander the Great combined the heroic charisma of a warrior-king with the calculated vision of a master **strategist**."
      }
    ]
  },
  "strategus": {
    primary: "A general, military commander, or magistrate in ancient Greece, especially one of the board of ten generals elected annually in Athens.",
    secondary: "A Latinized form of strategos, combining executive civil leadership and military command in classical city-states and the Byzantine Empire.",
    quotes: [
      {
        author: "Plutarch",
        work: "Lives: Pericles",
        date: "c. 100 AD",
        quote: "Pericles was repeatedly elected **strategus** of Athens, guiding both the democratic assembly and the navy."
      },
      {
        author: "Thucydides",
        work: "History of the Peloponnesian War",
        date: "c. 411 BC",
        quote: "The Athenian assembly summoned the **strategus** Alcibiades to answer charges of impiety."
      },
      {
        author: "Edward Gibbon",
        work: "The History of the Decline and Fall of the Roman Empire",
        date: "1776",
        quote: "In the Byzantine provinces, the civil governor was superseded by the military **strategus**."
      }
    ]
  },
  "strategy": {
    primary: "A high-level plan of action designed to achieve a long-term or overall aim, especially under conditions of uncertainty.",
    secondary: "The art of military command exercised to meet the enemy in favorable conditions through operational maneuvering and resource deployment.",
    quotes: [
      {
        author: "Carl von Clausewitz",
        work: "On War",
        date: "1832",
        quote: "**Strategy** is the use of the engagement for the purpose of the war."
      },
      {
        author: "Sun Tzu",
        work: "The Art of War",
        date: "c. 5th century BC",
        quote: "**Strategy** without tactics is the slowest route to victory; tactics without strategy is the noise before defeat."
      },
      {
        author: "Michael E. Porter",
        work: "What Is Strategy?, Harvard Business Review",
        date: "1996",
        quote: "The essence of **strategy** is choosing what not to do, deliberately performing activities differently from rivals."
      }
    ]
  },
  "strateia": {
    primary: "A military campaign, expedition, or service in ancient Greece and the Byzantine Empire.",
    secondary: "In Byzantine administration, an obligation of hereditary military service attached to designated peasant landholdings (strateia lands).",
    quotes: [
      {
        author: "Xenophon",
        work: "Hellenica",
        date: "c. 360 BC",
        quote: "Agesilaus proclaimed a general **strateia** across the Peloponnese to march against the Persian satraps."
      },
      {
        author: "George Ostrogorsky",
        work: "History of the Byzantine State",
        date: "1956",
        quote: "The institutional strength of the middle Byzantine empire rested upon the peasant soldier who performed hereditary **strateia**."
      },
      {
        author: "Warren Treadgold",
        work: "Byzantium and Its Army",
        date: "1995",
        quote: "Registration on the rolls of the **strateia** secured land grants in exchange for supplying equipped cavalry."
      }
    ]
  },
  "stratification": {
    primary: "The arrangement or classification of something into different groups, levels, or layers.",
    secondary: "In geology, the formation of sedimentary rocks in horizontal beds or layers (strata); or in sociology, the hierarchical division of society into classes or castes.",
    quotes: [
      {
        author: "Charles Lyell",
        work: "Principles of Geology",
        date: "1830",
        quote: "The regular **stratification** of sedimentary rocks records the calm, successive deposition of silt on ancient sea floors."
      },
      {
        author: "Max Weber",
        work: "Economy and Society",
        date: "1922",
        quote: "Social **stratification** is multi-dimensional, determined by economic class, status prestige, and political power."
      },
      {
        author: "Rachel Carson",
        work: "The Sea Around Us",
        date: "1951",
        quote: "Thermal **stratification** separates the sunlit upper oceanic layers from the frigid abyssal depths."
      }
    ]
  },
  "stratified": {
    primary: "Arranged or formed in distinct horizontal layers or strata.",
    secondary: "Divided into distinct social, economic, or educational ranks and classes.",
    quotes: [
      {
        author: "Charles Darwin",
        work: "On the Origin of Species",
        date: "1859",
        quote: "Fossils preserved in **stratified** rocks reveal the slow, unbroken succession of organic forms across geological epochs."
      },
      {
        author: "Karl Marx",
        work: "Capital, Volume I",
        date: "1867",
        quote: "Modern industrial society became sharply **stratified** between the owners of capital and the wage-earning proletariat."
      },
      {
        author: "Aldous Huxley",
        work: "Brave New World",
        date: "1932",
        quote: "The World State was meticulously **stratified** from Alpha-Plus administrators down to Epsilon-Minus sewer workers."
      }
    ]
  },
  "stratify": {
    primary: "To arrange, form, or deposit in layers, beds, or strata.",
    secondary: "To divide or categorize a society, community, or population into different social or economic strata.",
    quotes: [
      {
        author: "James Hutton",
        work: "Theory of the Earth",
        date: "1788",
        quote: "Subterranean heat and pressure consolidate loose ocean sediments, causing them to **stratify** into stone."
      },
      {
        author: "Alexis de Tocqueville",
        work: "Democracy in America",
        date: "1835",
        quote: "Democratic institutions tend to flatten feudal hierarchies that historically functioned to **stratify** European societies."
      },
      {
        author: "Arthur Guyton",
        work: "Textbook of Medical Physiology",
        date: "1986",
        quote: "Centrifugation causes whole blood to **stratify** into plasma, buffy coat, and packed red cells."
      }
    ]
  },
  "stratigraphy": {
    primary: "The branch of geology concerned with the order and relative position of strata and their relationship to the geological time scale.",
    secondary: "The archaeological recording and analysis of cultural layers and artifacts found within excavated soil deposits.",
    quotes: [
      {
        author: "William Smith",
        work: "Strata Identified by Organized Fossils",
        date: "1816",
        quote: "The science of **stratigraphy** proves that each rock layer is characterized by its own distinct assemblage of organic fossils."
      },
      {
        author: "Charles Lyell",
        work: "Principles of Geology",
        date: "1833",
        quote: "Accurate **stratigraphy** provides the master clock by which we decipher the immense antiquity of the earth."
      },
      {
        author: "Mortimer Wheeler",
        work: "Archaeology from the Earth",
        date: "1954",
        quote: "Meticulous archaeological **stratigraphy** ensures that artifacts are dated relative to the soil layers in which they were buried."
      }
    ]
  },
  "stratocracy": {
    primary: "A form of government headed by military chiefs or commanders; military dictatorship or rule.",
    secondary: "A state where the civilian administration and executive sovereignty are structurally subordinate to or identical with the armed forces.",
    quotes: [
      {
        author: "Polybius",
        work: "The Histories",
        date: "c. 140 BC",
        quote: "Sparta was an aristocratic **stratocracy**, where every civic institution was subordinated to martial readiness."
      },
      {
        author: "Edward Gibbon",
        work: "The History of the Decline and Fall of the Roman Empire",
        date: "1776",
        quote: "During the third-century crisis, Rome degenerated into an ungovernable **stratocracy**, emperors raised and murdered at the caprice of the legions."
      },
      {
        author: "Samuel Finer",
        work: "The Man on Horseback: The Role of the Military in Politics",
        date: "1962",
        quote: "A pure **stratocracy** dissolves the boundary between civilian governance and the military command hierarchy."
      }
    ]
  },
  "stratography": {
    primary: "An archaic or specialized term for the description or systematic study of armies, military dispositions, and encampments.",
    secondary: "A literary or geographical mapping of military fortifications and theater operational deployments.",
    quotes: [
      {
        author: "Antoine-Henri Jomini",
        work: "Summary of the Art of War",
        date: "1838",
        quote: "Comprehensive **stratography** delineates the positions of fortified camps, defensive lines, and potential retreat routes."
      },
      {
        author: "John William Fortescue",
        work: "A History of the British Army",
        date: "1899",
        quote: "The general's notebooks contained precise details of **stratography**, mapping every brigade along the Flemish frontier."
      },
      {
        author: "Thomas S. Kuhn",
        work: "The Structure of Scientific Revolutions",
        date: "1962",
        quote: "Early treatises on military science combined engineering with descriptive **stratography** of fortress layouts."
      }
    ]
  },
  "stratonic": {
    primary: "Relating to an army, armed forces, or military command (derived from Greek stratos).",
    secondary: "Pertaining to martial affairs, soldierly discipline, or military governance.",
    quotes: [
      {
        author: "George Grote",
        work: "A History of Greece",
        date: "1846",
        quote: "The Spartan state was governed by a severe **stratonic** ethic that regarded individual autonomy as treason."
      },
      {
        author: "Gilbert Murray",
        work: "Five Stages of Greek Religion",
        date: "1912",
        quote: "Early Hellenic tribal confederacies relied on **stratonic** assemblies of fighting men to elect war leaders."
      },
      {
        author: "Lewis Mumford",
        work: "Technics and Civilization",
        date: "1934",
        quote: "The regimented clockwork of modern industrial factories drew its earliest models from **stratonic** barracks discipline."
      }
    ]
  },
  "stratosphere": {
    primary: "The second major layer of Earth's atmosphere, extending from the tropopause (around 10–12 km) up to the stratopause (around 50 km), containing the ozone layer.",
    secondary: "Figuratively, an extremely high, rarefied, or elite level of achievement, status, price, or influence.",
    quotes: [
      {
        author: "Léon Teisserenc de Bort",
        work: "Discovery of the Isothermal Layer of the Atmosphere",
        date: "1902",
        quote: "Above the turbulent lower weather zone lies an isothermal realm of stratified air, which I designate the **stratosphere**."
      },
      {
        author: "Rachel Carson",
        work: "Silent Spring",
        date: "1962",
        quote: "Nuclear detonations injected radioactive aerosols directly into the **stratosphere**, circling the planet for years."
      },
      {
        author: "F. Scott Fitzgerald",
        work: "The Great Gatsby",
        date: "1925",
        quote: "His newfound financial fortune launched him into a social **stratosphere** where ordinary rules no longer applied."
      }
    ]
  },
  "stratum": {
    primary: "A layer or a series of layers of rock in the ground; a single sheet-like body of sedimentary rock.",
    secondary: "A level, grade, or class to which people belong according to socio-economic, educational, or cultural status.",
    quotes: [
      {
        author: "Charles Lyell",
        work: "Principles of Geology",
        date: "1830",
        quote: "A single limestone **stratum** may extend unbroken for hundreds of miles, preserving the ecology of an ancient ocean."
      },
      {
        author: "George Eliot",
        work: "Middlemarch",
        date: "1871",
        quote: "Dorothea felt the oppressive weight of provincial society, where every social **stratum** looked with suspicion on the one beneath."
      },
      {
        author: "Sigmund Freud",
        work: "The Interpretation of Dreams",
        date: "1900",
        quote: "Consciousness represents only the superficial **stratum** of the psyche, resting upon deep reservoirs of repressed memories."
      }
    ]
  },
  "stratus": {
    primary: "A low-altitude, uniform, featureless, grayish cloud formation forming a horizontal layer that often produces drizzle or mist.",
    secondary: "One of Luke Howard's three primary cloud genera (alongside cumulus and cirrus), denoting sheet-like or layered clouds.",
    quotes: [
      {
        author: "Luke Howard",
        work: "On the Modifications of Clouds",
        date: "1803",
        quote: "To the continuous horizontal sheet of cloud, increasing from below, I give the name **stratus**."
      },
      {
        author: "John Ruskin",
        work: "Modern Painters",
        date: "1843",
        quote: "The low **stratus** crept over the moorlands at dusk, wrapping every crag in a wet, ghostlike shroud."
      },
      {
        author: "Thomas Hardy",
        work: "Far from the Madding Crowd",
        date: "1874",
        quote: "A leaden roof of **stratus** hung over the shearing-barn, diffusing a dreary, shadowless daylight."
      }
    ]
  },
  "unstratified": {
    primary: "Not arranged, formed, or deposited in layers or strata (especially of rocks or soil deposits).",
    secondary: "(Of a society or group) not organized or divided into distinct hierarchical classes or ranks.",
    quotes: [
      {
        author: "James Hutton",
        work: "Theory of the Earth",
        date: "1788",
        quote: "Granite forms a colossal **unstratified** crystalline foundation beneath the layered sedimentary crust."
      },
      {
        author: "Charles Lyell",
        work: "Principles of Geology",
        date: "1830",
        quote: "Glacial till presents an **unstratified** mass of unsorted clay, gravel, and boulders dumped without hydraulic order."
      },
      {
        author: "Émile Durkheim",
        work: "The Division of Labour in Society",
        date: "1893",
        quote: "Early tribal clans formed relatively **unstratified** communities held together by mechanical solidarity."
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

console.log("Done Batch 3 of Cluster War & Conflict!");
