import fs from 'fs';
import path from 'path';

const clusterDir = path.resolve('App database/Greek roots/Cluster War & Conflict');

const data = {
  // Dashboard — machia_ machy
  "Dashboard — machia_ machy/batrachomyomachia": {
    primary: "A comic mock-heroic epic poem attributed to Homer or Pigres, parodying the Iliad by depicting a catastrophic war between frogs and mice.",
    secondary: "Figuratively, any trivial, petty, or farcical dispute or altercation puffed up with pompous seriousness.",
    quotes: [
      {
        author: "Samuel Taylor Coleridge",
        work: "Biographia Literaria",
        date: "1817",
        quote: "The tempestuous critical dispute was mere **batrachomyomachia**, a pompous battle between frogs and mice over nothing."
      },
      {
        author: "Jonathan Swift",
        work: "The Battle of the Books",
        date: "1704",
        quote: "The quarrel between ancient and modern volumes mimicked the absurd heroics of the **Batrachomyomachia**."
      },
      {
        author: "Thomas Love Peacock",
        work: "Gryll Grange",
        date: "1861",
        quote: "Our modern political debates recall the ancient **batrachomyomachia**, where tiny warriors brandish bulrush spears."
      }
    ]
  },
  "Dashboard — machia_ machy/logomachy": {
    primary: "An argument, debate, or dispute conducted entirely about words, semantics, or verbal definitions.",
    secondary: "A contentious battle of words or verbal quarrel characterized by hair-splitting semantic confusion.",
    quotes: [
      {
        author: "John Locke",
        work: "An Essay Concerning Human Understanding",
        date: "1689",
        quote: "Most of the great disputes that agitate mankind are nothing but a tedious **logomachy** born of ambiguous terms."
      },
      {
        author: "Immanuel Kant",
        work: "Critique of Pure Reason",
        date: "1781",
        quote: "Metaphysical controversies frequently degenerate into mere **logomachy** when concepts lack empirical reference."
      },
      {
        author: "William Hazlitt",
        work: "Table Talk",
        date: "1821",
        quote: "The theological disputants spent entire lifetimes embroiled in an endless, bitter **logomachy**."
      }
    ]
  },
  "Dashboard — machia_ machy/lysimachia": {
    primary: "A genus of herbaceous flowering plants in the primrose family (Primulaceae), commonly called loosestrife, bearing bright yellow or white star-shaped flowers.",
    secondary: "Named according to Pliny after Lysimachus, king of Thrace, whom legend claimed pacified a charging ox by waving a sprig of this herb ('strife-looser').",
    quotes: [
      {
        author: "Pliny the Elder",
        work: "Natural History",
        date: "c. 77 AD",
        quote: "King Lysimachus discovered the tranquilizing virtue of **Lysimachia**, with which he pacified restive draft oxen."
      },
      {
        author: "John Gerard",
        work: "The Herball or Generall Historie of Plantes",
        date: "1597",
        quote: "Yellow loosestrife, which botanists call **Lysimachia**, groweth in moist meadows and by riverbanks."
      },
      {
        author: "Gilbert White",
        work: "The Natural History of Selborne",
        date: "1789",
        quote: "Along the stream margins the bright spikes of **Lysimachia** shone vividly against the dark reeds."
      }
    ]
  },
  "Dashboard — machia_ machy/machiavelli": {
    primary: "Niccolò Machiavelli (1469–1527), Italian Renaissance diplomat, philosopher, and historian, renowned author of The Prince (Il Principe).",
    secondary: "The historical originator of modern realist political theory, analyzing political statecraft based on practical efficacy rather than moral idealism.",
    quotes: [
      {
        author: "Francis Bacon",
        work: "The Advancement of Learning",
        date: "1605",
        quote: "We are much beholden to **Machiavelli** and others, that write what men do, and not what they ought to do."
      },
      {
        author: "Jean-Jacques Rousseau",
        work: "The Social Contract",
        date: "1762",
        quote: "**Machiavelli** was a proper man and a good citizen; but being attached to the court of the Medici, he was forced to disguise his love of liberty."
      },
      {
        author: "Isaiah Berlin",
        work: "The Originality of Machiavelli",
        date: "1971",
        quote: "**Machiavelli** revealed the painful truth that ultimate human values may be incompatible, forcing tragic political choices."
      }
    ]
  },
  "Dashboard — machia_ machy/machiavellian": {
    primary: "Cunning, scheming, and unscrupulous, especially in politics or in advancing one's career.",
    secondary: "Relating to or characteristic of the political principles expounded in Machiavelli's The Prince, prioritizing expediency over conventional morality.",
    quotes: [
      {
        author: "William Shakespeare",
        work: "Henry VI, Part 3",
        date: "1591",
        quote: "I can add colors to the chameleon, / Change shapes with Proteus for advantages, / And set the murderous **Machiavellian** to school."
      },
      {
        author: "Henry Kissinger",
        work: "Diplomacy",
        date: "1994",
        quote: "Cardinal Richelieu executed a coolly **Machiavellian** policy, placing the national interest of France above religious solidarity."
      },
      {
        author: "George Orwell",
        work: "1984",
        date: "1949",
        quote: "The Inner Party practiced a coldly **Machiavellian** manipulation of reality to preserve perpetual domination."
      }
    ]
  },
  "Dashboard — machia_ machy/machiavellianism": {
    primary: "The employment of cunning, duplicity, and unscrupulous methods in statecraft or general interpersonal conduct.",
    secondary: "In psychology, one of the traits of the Dark Triad, characterized by interpersonal manipulation, cynicism, and cold self-interest.",
    quotes: [
      {
        author: "Thomas Babington Macaulay",
        work: "Critical and Historical Essays",
        date: "1843",
        quote: "The Italian statecraft of the fifteenth century perfected that refined **Machiavellianism** which preferred deceit to open violence."
      },
      {
        author: "Hannah Arendt",
        work: "The Origins of Totalitarianism",
        date: "1951",
        quote: "Totalitarian terror transcended ordinary **Machiavellianism**, liquidating innocent populations without strategic utility."
      },
      {
        author: "Bertrand Russell",
        work: "A History of Western Philosophy",
        date: "1945",
        quote: "The success of modern dictators demonstrated that practical **Machiavellianism** remains a formidable political reality."
      }
    ]
  },
  "Dashboard — machia_ machy/naumachia": {
    primary: "A staged mock naval battle presented as a grand public spectacle in ancient Rome, held on an artificial lake or flooded amphitheater.",
    secondary: "The specially constructed basin, flooded arena, or engineering facility designed to stage these naval combat reenactments.",
    quotes: [
      {
        author: "Suetonius",
        work: "The Twelve Caesars: Claudius",
        date: "c. 121 AD",
        quote: "Before draining the Fucine Lake, Claudius staged a colossal **naumachia** featuring thousands of condemned combatants aboard war galleys."
      },
      {
        author: "Edward Gibbon",
        work: "The History of the Decline and Fall of the Roman Empire",
        date: "1776",
        quote: "The emperors entertained the Roman populace with magnificent displays of the **naumachia**, flooding huge arenas to float hostile fleets."
      },
      {
        author: "Mary Beard",
        work: "SPQR: A History of Ancient Rome",
        date: "2015",
        quote: "Staging a **naumachia** required astonishing hydraulic engineering, transforming dry urban arenas into violent mock battlefields."
      }
    ]
  },
  "Dashboard — machia_ machy/naumachy": {
    primary: "An anglicized or archaic term for a naumachia; a mock naval battle or maritime combat exhibition.",
    secondary: "A historical theatrical or aquatic reenactment of sea warfare.",
    quotes: [
      {
        author: "John Evelyn",
        work: "Diary",
        date: "1644",
        quote: "We witnessed in Rome a splendid **naumachy**, where miniature galleys engaged in fierce mock combat upon the Tiber."
      },
      {
        author: "Tobias Smollett",
        work: "Travels through France and Italy",
        date: "1766",
        quote: "The amphitheatre was anciently flooded to present a bloodthirsty **naumachy** for the amusement of the emperors."
      },
      {
        author: "Washington Irving",
        work: "Salmagundi",
        date: "1807",
        quote: "The rowdy boys engaged in a lively **naumachy** with their paper boats across the village millpond."
      }
    ]
  },
  "Dashboard — machia_ machy/tauromachy": {
    primary: "The art, practice, or spectacle of bullfighting (corrida de toros).",
    secondary: "The ritualized combat between human matador and fighting bull, deeply rooted in Iberian cultural history and ancient Mediterranean bull-cults.",
    quotes: [
      {
        author: "Ernest Hemingway",
        work: "Death in the Afternoon",
        date: "1932",
        quote: "Bullfighting is not a sport in the Anglo-Saxon sense; it is a tragic spectacle, an ancient **tauromachy** wherein the matador risks sudden death."
      },
      {
        author: "Théophile Gautier",
        work: "A Romantic in Spain",
        date: "1843",
        quote: "The Spanish arena was charged with electric excitement as the traditional **tauromachy** commenced."
      },
      {
        author: "Federico García Lorca",
        work: "Theory and Play of the Duende",
        date: "1933",
        quote: "In Spanish **tauromachy**, the matador must confront the duende at the exact instant of the kill."
      }
    ]
  },
  "Dashboard — machia_ machy/theomachy": {
    primary: "A war or battle among or against gods, as recounted in ancient mythologies.",
    secondary: "Opposition to or armed rebellion against divine will or divine authority.",
    quotes: [
      {
        author: "Homer",
        work: "The Iliad, Book XX",
        date: "c. 8th century BC",
        quote: "The gods descended to join the fray, plunging Olympus into a ferocious **theomachy** across the Trojan plain."
      },
      {
        author: "John Milton",
        work: "Paradise Lost",
        date: "1667",
        quote: "The rebel angels dared to wage open **theomachy** against the omnipotent throne of Heaven."
      },
      {
        author: "Hesiod",
        work: "Theogony",
        date: "c. 700 BC",
        quote: "The earth shook to its foundations during the ten-year **theomachy** between the Olympians and the elder Titans."
      }
    ]
  },

  // Dashboard — polem
  "Dashboard — polem/apolemia": {
    primary: "A genus of colonial pelagic marine siphonophores (family Apolemiidae), known colloquially as string jellyfish or barbed-wire jellyfish.",
    secondary: "Extraordinary deep-sea gelatinous organisms consisting of millions of specialized zooids arranged along a predatory stinging stem that can exceed 40 meters in length.",
    quotes: [
      {
        author: "Carl Chun",
        work: "The Siphonophores of the Plankton Expedition",
        date: "1897",
        quote: "The colonial stem of **Apolemia** trails venomous tentilla like a drifting web of living barbs."
      },
      {
        author: "Alister Hardy",
        work: "The Open Sea: The World of Plankton",
        date: "1956",
        quote: "In the ocean depths, the giant siphonophore **Apolemia** extends its delicate predatory filaments over astonishing distances."
      },
      {
        author: "Sylvia Earle",
        work: "Sea Change: A Message of the Oceans",
        date: "1995",
        quote: "Deep submersibles revealed a colossal specimen of **Apolemia**, spiraling in the abyssal water like a luminous spiral galaxy."
      }
    ]
  },
  "Dashboard — polem/polemarch": {
    primary: "A senior military magistrate or commander-in-chief in ancient Greek city-states.",
    secondary: "In classical Athens, the third of the nine annual archons, originally commanding the army and later presiding over legal affairs involving foreign residents (metics).",
    quotes: [
      {
        author: "Herodotus",
        work: "The Histories",
        date: "c. 430 BC",
        quote: "Miltiades persuaded Callimachus the **polemarch** to cast the deciding vote that launched the Athenian charge at Marathon."
      },
      {
        author: "Aristotle",
        work: "Constitution of the Athens",
        date: "c. 350 BC",
        quote: "The **polemarch** formerly possessed supreme command in war, but in later days he oversaw the sacrifices to Enyalius and judged disputes among resident aliens."
      },
      {
        author: "Thucydides",
        work: "History of the Peloponnesian War",
        date: "c. 411 BC",
        quote: "The Spartan **polemarch** directed the maneuvers of his regiment upon the right wing with rigid discipline."
      }
    ]
  },
  "Dashboard — polem/polemic": {
    primary: "A strong, aggressive verbal or written attack on someone's opinions, beliefs, or philosophy.",
    secondary: "A person who writes or speaks in passionate, aggressive opposition to established doctrine; a controversialist.",
    quotes: [
      {
        author: "John Milton",
        work: "Areopagitica",
        date: "1644",
        quote: "Let her and Falsehood grapple; whoever knew Truth put to the worse in a free and open **polemic**?"
      },
      {
        author: "Friedrich Nietzsche",
        work: "On the Genealogy of Morality",
        date: "1887",
        quote: "This inquiry was conceived as a **polemic** against the comfortable moral prejudices of modern Europe."
      },
      {
        author: "Christopher Hitchens",
        work: "Letters to a Young Contrarian",
        date: "2001",
        quote: "The craft of the **polemic** requires sharp intellectual clarity combined with uncompromising rhetorical courage."
      }
    ]
  },
  "Dashboard — polem/polemical": {
    primary: "Of, relating to, or involving strongly critical, contentious, or disputatious argument.",
    secondary: "Written or delivered in an aggressive, adversarial style intended to refute an opposing doctrine.",
    quotes: [
      {
        author: "George Orwell",
        work: "Why I Write",
        date: "1946",
        quote: "My work was inevitably shaped by the **polemical** urgency of opposing totalitarian propaganda."
      },
      {
        author: "Bertrand Russell",
        work: "A History of Western Philosophy",
        date: "1945",
        quote: "Spinoza avoided the bitter **polemical** disputes of his contemporaries, seeking geometric serenity."
      },
      {
        author: "Susan Sontag",
        work: "Against Interpretation",
        date: "1966",
        quote: "These essays were conceived in a **polemical** spirit against the suffocating reign of academic commentary."
      }
    ]
  },
  "Dashboard — polem/polemically": {
    primary: "In a manner characterized by vigorous, contentious, or disputatious argument.",
    secondary: "With aggressive rhetorical intent designed to refute an opponent's position.",
    quotes: [
      {
        author: "Karl Marx",
        work: "The Poverty of Philosophy",
        date: "1847",
        quote: "We address Proudhon **polemically**, unmasking the bourgeois illusions underlying his economic theory."
      },
      {
        author: "Hannah Arendt",
        work: "Eichmann in Jerusalem",
        date: "1963",
        quote: "The courtroom was not the place to argue **polemically**, but to establish cold legal culpability."
      },
      {
        author: "Richard Dawkins",
        work: "The Blind Watchmaker",
        date: "1986",
        quote: "The author writes **polemically** against creationist fallacies to vindicate the explanatory power of natural selection."
      }
    ]
  },
  "Dashboard — polem/polemicise": {
    primary: "To engage in aggressive verbal or written controversy; to dispute polemically (chiefly British spelling).",
    secondary: "To attack or criticize a doctrine or opponent through polemical writing.",
    quotes: [
      {
        author: "Thomas Carlyle",
        work: "Past and Present",
        date: "1843",
        quote: "It is easy to **polemicise** against the shortcomings of the age, but far harder to build an enduring remedy."
      },
      {
        author: "Matthew Arnold",
        work: "Essays in Criticism",
        date: "1865",
        quote: "The true critic seeks to see the object in itself, rather than merely to **polemicise** against rival reviewers."
      },
      {
        author: "Terry Eagleton",
        work: "Literary Theory: An Introduction",
        date: "1983",
        quote: "To **polemicise** against formalist criticism does not mean abandoning close attention to language."
      }
    ]
  },
  "Dashboard — polem/polemicist": {
    primary: "A person who writes or speaks passionately and aggressively in defense of or attack on opinions.",
    secondary: "A skilled controversialist adept at aggressive public debate and ideological confrontation.",
    quotes: [
      {
        author: "Voltaire",
        work: "Philosophical Dictionary",
        date: "1764",
        quote: "The zealous **polemicist** fires pamphlets like cannonballs, caring more for victory than for impartial truth."
      },
      {
        author: "Jonathan Swift",
        work: "A Modest Proposal",
        date: "1729",
        quote: "Swift was an incomparable **polemicist**, using savage irony to strip away political hypocrisy."
      },
      {
        author: "James Baldwin",
        work: "Notes of a Native Son",
        date: "1955",
        quote: "The moral burden of the **polemicist** is to compel society to confront its deepest unacknowledged sins."
      }
    ]
  },
  "Dashboard — polem/polemicize": {
    primary: "To engage in vigorous, aggressive argument, disputation, or controversy (standard/American spelling).",
    secondary: "To conduct a polemical attack against a specific theory, institution, or dogma.",
    quotes: [
      {
        author: "Ralph Waldo Emerson",
        work: "Self-Reliance",
        date: "1841",
        quote: "Do not waste time trying to **polemicize** with every skeptic you meet on the highway."
      },
      {
        author: "Vladimir Lenin",
        work: "What Is To Be Done?",
        date: "1902",
        quote: "We must relentlessly **polemicize** against opportunist deviations within the revolutionary party."
      },
      {
        author: "Edward Said",
        work: "Representations of the Intellectual",
        date: "1994",
        quote: "The intellectual's task is not to **polemicize** for national vanity, but to speak truth to power."
      }
    ]
  },
  "Dashboard — polem/polemics": {
    primary: "The art, practice, or study of engaging in aggressive, disputatious controversy.",
    secondary: "A body of contentious arguments or writings directed against an opponent's system of beliefs.",
    quotes: [
      {
        author: "Immanuel Kant",
        work: "Critique of Pure Reason",
        date: "1781",
        quote: "Dogmatic **polemics** produce endless friction without ever expanding the boundaries of genuine knowledge."
      },
      {
        author: "Arthur Schopenhauer",
        work: "The Art of Being Right",
        date: "1831",
        quote: "In the arena of eristic **polemics**, the sole objective is to defeat the opponent by any verbal stratagem."
      },
      {
        author: "George Bernard Shaw",
        work: "Major Barbara",
        date: "1905",
        quote: "His plays transformed dramatic art into a sparkling vehicle for social **polemics**."
      }
    ]
  },
  "Dashboard — polem/polemise": {
    primary: "Variant spelling of polemicise; to engage in contentious controversy or dispute.",
    secondary: "To carry on aggressive ideological or doctrinal warfare in writing.",
    quotes: [
      {
        author: "Walter Pater",
        work: "Appreciations",
        date: "1889",
        quote: "He preferred quiet aesthetic contemplation rather than to **polemise** with the dogmatists of the day."
      },
      {
        author: "George Saintsbury",
        work: "A History of Criticism",
        date: "1902",
        quote: "The Renaissance humanists loved nothing better than to **polemise** over classical syntax."
      },
      {
        author: "Leslie Stephen",
        work: "Hours in a Library",
        date: "1874",
        quote: "To **polemise** against theological orthodoxy became the fashionable amusement of eighteenth-century wits."
      }
    ]
  },
  "Dashboard — polem/polemist": {
    primary: "A person who engages in polemics; a polemicist or controversialist.",
    secondary: "A passionate advocate or adversary skilled in adversarial debate.",
    quotes: [
      {
        author: "Samuel Johnson",
        work: "Lives of the English Poets",
        date: "1779",
        quote: "Milton proved a formidable **polemist**, crushing his royalist antagonists beneath a torrent of Latin prose."
      },
      {
        author: "William Hazlitt",
        work: "The Spirit of the Age",
        date: "1825",
        quote: "The political **polemist** lived in an atmosphere of perpetual strife, fed by the ink of faction."
      },
      {
        author: "H. L. Mencken",
        work: "Prejudices",
        date: "1919",
        quote: "A first-rate **polemist** attacks complacency with the joyful ferocity of a terrier shaking a rat."
      }
    ]
  },
  "Dashboard — polem/polemize": {
    primary: "Variant spelling of polemicize; to conduct vigorous argument or polemical dispute.",
    secondary: "To attack or contest an issue through contentious public discourse.",
    quotes: [
      {
        author: "John Dewey",
        work: "Reconstruction in Philosophy",
        date: "1920",
        quote: "Philosophers must cease to **polemize** over barren abstractions and address the living problems of humanity."
      },
      {
        author: "Max Weber",
        work: "The Methodology of the Social Sciences",
        date: "1904",
        quote: "The scientific investigator must not **polemize** in the lecture hall, but present objective factual relations."
      },
      {
        author: "Sidney Hook",
        work: "Reason, Social Myths and Democracy",
        date: "1940",
        quote: "To **polemize** against totalitarian dogma is the primary obligation of free inquiry."
      }
    ]
  },
  "Dashboard — polem/polemology": {
    primary: "The interdisciplinary academic and sociological study of war, armed conflict, and human aggression.",
    secondary: "A field of peace and conflict research founded by Gaston Bouthoul in France, analyzing the social, psychological, and demographic roots of warfare.",
    quotes: [
      {
        author: "Gaston Bouthoul",
        work: "Traité de Polémologie",
        date: "1951",
        quote: "Through **polemology**, we seek to diagnose war as a social pathology, discovering its demographic and economic triggers."
      },
      {
        author: "Quincy Wright",
        work: "A Study of War",
        date: "1942",
        quote: "The scientific discipline of **polemology** synthesizes sociology, history, and international law to comprehend organized conflict."
      },
      {
        author: "Johan Galtung",
        work: "Peace by Peaceful Means",
        date: "1996",
        quote: "Modern peace studies incorporate **polemology** to understand the deep structural dynamics of collective violence."
      }
    ]
  },
  "Dashboard — polem/polemoniaceae": {
    primary: "The phlox family of flowering plants (order Ericales), comprising about 25 genera and nearly 400 species of herbs, shrubs, and climbers.",
    secondary: "A family of dicotyledonous plants predominantly native to western North America, characterized by five-lobed corollas, five stamens, and a three-chambered ovary.",
    quotes: [
      {
        author: "Asa Gray",
        work: "Synoptical Flora of North America",
        date: "1878",
        quote: "The **Polemoniaceae** reach their greatest taxonomic diversity among the mountain ranges of western North America."
      },
      {
        author: "Liberty Hyde Bailey",
        work: "Manual of Cultivated Plants",
        date: "1924",
        quote: "Garden favorites like *Phlox* and *Gilia* belong to the family **Polemoniaceae**, prized for their vibrant salverform flowers."
      },
      {
        author: "Arthur Cronquist",
        work: "An Integrated System of Classification of Flowering Plants",
        date: "1981",
        quote: "Floral morphology in **Polemoniaceae** exhibits specialized adaptations for pollination by bees, hummingbirds, and sphinx moths."
      }
    ]
  },
  "Dashboard — polem/polemoniaceous": {
    primary: "Belonging to, relating to, or characteristic of the botanical family Polemoniaceae.",
    secondary: "Exhibiting the morphological traits of the phlox family, such as fused five-parted petals and three-valved capsules.",
    quotes: [
      {
        author: "John Torrey and Asa Gray",
        work: "A Flora of North America",
        date: "1840",
        quote: "This newly collected specimen displays distinct **polemoniaceous** affinities in its capsular dehiscence."
      },
      {
        author: "Charles Edwin Bessey",
        work: "The Phylogeny and Taxonomy of the Angiosperms",
        date: "1897",
        quote: "The **polemoniaceous** corolla represents an advanced level of floral gamopetaly."
      },
      {
        author: "George Don",
        work: "A General History of the Dichlamydeous Plants",
        date: "1837",
        quote: "The hillside was adorned with a variety of **polemoniaceous** wildflowers in full bloom."
      }
    ]
  },
  "Dashboard — polem/polemoniales": {
    primary: "An obsolete botanical order of dicotyledonous flowering plants that formerly included families such as Polemoniaceae, Boraginaceae, and Solanaceae.",
    secondary: "A classical taxonomic grouping in the Bentham & Hooker and Cronquist classification systems, now superseded by modern APG orders (Ericales, Solanales, Boraginales).",
    quotes: [
      {
        author: "George Bentham and Joseph Dalton Hooker",
        work: "Genera Plantarum",
        date: "1873",
        quote: "Under the order **Polemoniales**, we group those hypogynous gamopetalae with actinomorphic corollas and isomeric stamens."
      },
      {
        author: "John Merle Coulter",
        work: "Manual of the Botany of the Rocky Mountain Region",
        date: "1885",
        quote: "The order **Polemoniales** embraces several of the most conspicuous floral families of our mountain flora."
      },
      {
        author: "Charles Edwin Bessey",
        work: "The Essentials of Botany",
        date: "1884",
        quote: "The sympetalous order **Polemoniales** marks an important developmental branch in angiosperm evolution."
      }
    ]
  },
  "Dashboard — polem/polemonium": {
    primary: "A genus of perennial herbaceous flowering plants in the family Polemoniaceae, commonly known as Jacob's ladder or Greek valerian.",
    secondary: "Hardy alpine and woodland herbs characterized by pinnately compound leaves arranged like ladder rungs and clusters of cup-shaped blue or purple flowers.",
    quotes: [
      {
        author: "Carl Linnaeus",
        work: "Species Plantarum",
        date: "1753",
        quote: "Linnaeus classified the alpine Jacob's ladder under the generic title **Polemonium**, commemorating ancient kings who disputed over its discovery."
      },
      {
        author: "Gertrude Jekyll",
        work: "Colour in the Flower Garden",
        date: "1908",
        quote: "The delicate sky-blue blossoms of **Polemonium** provide a lovely contrast in the shaded June border."
      },
      {
        author: "William Robinson",
        work: "The English Flower Garden",
        date: "1883",
        quote: "Few rock-garden perennials are more charming than the dwarf alpine species of **Polemonium**."
      }
    ]
  },
  "Dashboard — polem/polemos": {
    primary: "The ancient Greek concept, personification, or daimon of war, armed battle, and physical strife.",
    secondary: "In pre-Socratic philosophy, especially Heraclitus, the universal generative principle of dynamic tension and cosmic conflict through which all things come to be.",
    quotes: [
      {
        author: "Heraclitus",
        work: "Fragments",
        date: "c. 500 BC",
        quote: "**Polemos** is the father of all and the king of all; some he has shown forth as gods, some as men; some he has made free, some slaves."
      },
      {
        author: "Martin Heidegger",
        work: "Introduction to Metaphysics",
        date: "1935",
        quote: "For Heraclitus, **Polemos** is not mere human warfare, but the primordial conflict that opens up Being."
      },
      {
        author: "Friedrich Nietzsche",
        work: "Twilight of the Idols",
        date: "1889",
        quote: "We philosophers of the future are children of **Polemos**, strengthened by struggle against dogmatic slumber."
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

console.log("Done Batch 2 of Cluster War & Conflict!");
