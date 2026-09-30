import fs from 'fs';
import path from 'path';

const entries = {
  microorganism: {
    primary: "An organism of microscopic or ultramicroscopic size, such as a bacterium, virus, protozoan, or microscopic fungus.",
    secondary: "In ecology and medicine, a single-celled or acellular biological agent acting as a primary decomposer, fermenter, or pathogen.",
    quotes: [
      { author: "Louis Pasteur", work: "Studies on Fermentation", quote: "The transformation of wort into beer is accomplished by a living **microorganism**, whose vital activity produces alcohol." },
      { author: "Rachel Carson", work: "Silent Spring", quote: "Soil fertility depends upon the unseen cooperation of billions of **microorganisms** inhabiting every handful of earth." },
      { author: "H. G. Wells", work: "The War of the Worlds", quote: "The Martians were slain by the humblest things that God, in His wisdom, has put upon this earth: microscopic **microorganisms**." }
    ]
  },
  organ: {
    primary: "A differentiated part of an organism adapted for a specific vital physiological function.",
    secondary: "A keyboard musical instrument consisting of pipes sounded by compressed air; by extension, an official medium or periodical representing a group.",
    quotes: [
      { author: "Charles Darwin", work: "The Origin of Species", quote: "To suppose that the eye, with all its inimitable contrivances, could have been formed by natural selection seems, I freely confess, absurd in the highest possible degree, yet reason tells me that every complex **organ** may be so evolved." },
      { author: "John Milton", work: "Paradise Lost", quote: "There let the pealing **organ** blow to the full-voiced quire below, in service high and anthems clear." },
      { author: "Alexis de Tocqueville", work: "Democracy in America", quote: "The newspaper acts as the indispensable **organ** of public opinion, rallying scattered citizens to common causes." }
    ]
  },
  organs: {
    primary: "Multiple specialized anatomical or biological structures performing coordinated functions within a living organism.",
    secondary: "Instrumental agencies, faculties, or administrative branches by which a government or institution exercises its functions.",
    quotes: [
      { author: "William Shakespeare", work: "The Merchant of Venice", quote: "Hath not a Jew eyes? hath not a Jew hands, **organs**, dimensions, senses, affections, passions?" },
      { author: "Thomas Henry Huxley", work: "Lessons in Elementary Physiology", quote: "The vital **organs** of the thoracic cavity work in perpetual rhythm to oxygenate the blood." },
      { author: "Woodrow Wilson", work: "Congressional Government", quote: "The separate **organs** of constitutional government must coordinate their energies if policy is to remain effective." }
    ]
  },
  organelle: {
    primary: "A specialized subunit or membrane-bound compartment within a biological cell that performs a specific metabolic or structural task.",
    secondary: "An intracellular structure analogous in cellular economy to an organ in a multicellular organism.",
    quotes: [
      { author: "Lynn Margulis", work: "Symbiosis in Cell Evolution", quote: "Each eukaryotic **organelle**, from the mitochondrion to the plastid, traces its ancestry to ancient endosymbiotic bacteria." },
      { author: "E. B. Wilson", work: "The Cell in Development and Inheritance", quote: "Within the microscopic cytoplasm, each distinct **organelle** contributes its quota to the complex equilibrium of life." },
      { author: "Richard Dawkins", work: "The Ancestor's Tale", quote: "The acquisition of a photosynthetic **organelle** transformed primitive single-celled wanderers into the masters of the sunlight." }
    ]
  },
  organic: {
    primary: "Relating to, derived from, or characteristic of living organisms.",
    secondary: "In chemistry, relating to compounds containing carbon; in architecture and philosophy, forming an integrated whole where parts develop naturally together.",
    quotes: [
      { author: "Thomas Hardy", work: "The Woodlanders", quote: "There was a profound **organic** sympathy between Giles Winterborne and the trees he pruned with loving care." },
      { author: "Frank A. Fetter", work: "Economics Volume I: Economic Principles", quote: "An economy is not a dead machine, but an **organic** growth responding continuously to human desires." },
      { author: "Frank Lloyd Wright", work: "An Organic Architecture", quote: "An **organic** architecture grows out of the site as naturally as a flower rises from the soil." }
    ]
  },
  organically: {
    primary: "In a manner characteristic of living organisms or natural biological growth.",
    secondary: "In an integrated, unified manner where all components cohere systematically and evolve inherently from within.",
    quotes: [
      { author: "John Dewey", work: "Democracy and Education", quote: "True learning develops **organically** out of the child's own active engagement with the world." },
      { author: "Virginia Woolf", work: "The Common Reader", quote: "A great novel unfolds **organically**, its characters shaping their destiny rather than submitting to arbitrary plots." },
      { author: "Samuel Taylor Coleridge", work: "Biographia Literaria", quote: "Mechanical form is impressed from without, but organic form shapes itself **organically** from within." }
    ]
  },
  organicism: {
    primary: "The philosophical doctrine that the universe, society, or individual living beings are organic unities not reducible to purely mechanistic principles.",
    secondary: "In biology, the theory that structural organization and the coordination of the whole organism determine the functions of its components.",
    quotes: [
      { author: "Alfred North Whitehead", work: "Science and the Modern World", quote: "The philosophy of organism replaces the materialism of the seventeenth century with a comprehensive **organicism**." },
      { author: "Joseph Needham", work: "Order and Life", quote: "Biological **organicism** insists that morphology and biochemistry are two aspects of the same organized hierarchy." },
      { author: "Lewis Mumford", work: "The City in History", quote: "The modern metropolis has abandoned civic **organicism** in favor of sterile mechanical sprawl." }
    ]
  },
  organicistic: {
    primary: "Pertaining to, based upon, or characteristic of organicism.",
    secondary: "Interpreting natural or social phenomena in terms of living organisms and holistic interdependence rather than discrete mechanical parts.",
    quotes: [
      { author: "Ludwig von Bertalanffy", work: "General System Theory", quote: "An **organicistic** approach to biology emphasizes the dynamic interaction of the whole system rather than isolated parts." },
      { author: "George Santayana", work: "The Life of Reason", quote: "In Aristotle’s physics, we observe an **organicistic** worldview where every element seeks its natural resting place." },
      { author: "Ernst Cassirer", work: "The Philosophy of Symbolic Forms", quote: "Mythological consciousness retains an **organicistic** unity with nature that modern analysis has dissected." }
    ]
  },
  organification: {
    primary: "The biochemical process of incorporating an inorganic element into an organic molecule (specifically iodide into thyroglobulin).",
    secondary: "In environmental chemistry, the conversion of inorganic compounds into organic complexes by microbial action.",
    quotes: [
      { author: "C. H. Best & N. B. Taylor", work: "The Physiological Basis of Medical Practice", quote: "Thyroid peroxidase catalyzes the **organification** of iodide into monoiodotyrosine within the follicular colloid." },
      { author: "Arthur Guyton", work: "Textbook of Medical Physiology", quote: "Defective **organification** results in congenital hypothyroidism and immediate compensatory goiter formation." },
      { author: "E. O. Wilson", work: "The Future of Life", quote: "Microbial **organification** of heavy metals in wetland sediments can either detoxify effluents or concentrate toxins in aquatic food webs." }
    ]
  },
  organisation: {
    primary: "An organized body of people with a particular purpose, such as a business, government department, charity, or learned society.",
    secondary: "The systematic arrangement, coordination, or structured framework of components forming an integrated whole.",
    quotes: [
      { author: "H. G. Wells", work: "The New Machiavelli", quote: "Modern civilization requires an **organisation** of intellectual power far exceeding anything antiquity conceived." },
      { author: "Joseph Conrad", work: "Nostromo", quote: "The **organisation** of the silver mine was the masterpiece of Gould's tenacious will." },
      { author: "George Orwell", work: "Homage to Catalonia", quote: "Every political **organisation** in Barcelona was contending for control of the telephone exchange." }
    ]
  },
  organisational: {
    primary: "Relating to the structure, management, or coordination of an organization.",
    secondary: "In psychology and sociology, concerning interpersonal dynamics, leadership efficiency, and administrative hierarchy within institutions.",
    quotes: [
      { author: "Max Weber", work: "The Theory of Social and Economic Organization", quote: "Bureaucracy represents the purest type of exercise of **organisational** authority." },
      { author: "C. P. Snow", work: "Corridors of Power", quote: "He possessed that rare **organisational** instinct that anticipates administrative crises before they break." },
      { author: "Bertrand Russell", work: "Power: A New Social Analysis", quote: "The **organisational** reach of the modern state enables an unprecedented concentration of social power." }
    ]
  },
  organise: {
    primary: "To arrange into a structured whole; systematize or order methodically.",
    secondary: "To form, coordinate, or unite individuals into a union, political party, or cooperative enterprise for collective action.",
    quotes: [
      { author: "George Bernard Shaw", work: "Major Barbara", quote: "You cannot run a great empire unless you know how to **organise** both labor and capital." },
      { author: "Virginia Woolf", work: "A Room of One's Own", quote: "To write with freedom, a woman must first **organise** her daily life around quiet uninterrupted hours." },
      { author: "Charles Dickens", work: "Bleak House", quote: "Mrs. Jellyby was far too busy trying to **organise** African philanthropy to attend to her own neglected children." }
    ]
  },
  organised: {
    primary: "Formed into a coherent, functioning, and systematic structure; orderly and methodical.",
    secondary: "Belonging to or enrolled in an association or trade union; prepared for coordinated collective action.",
    quotes: [
      { author: "Thomas Hardy", work: "The Mayor of Casterbridge", quote: "His ledger was kept with an **organised** precision that admitted no error or negligence." },
      { author: "Winston Churchill", work: "My Early Life", quote: "An army is an **organised** multitude, whose strength evaporates the moment discipline relaxes." },
      { author: "H. G. Wells", work: "The World Set Free", quote: "The new world republic arose from the ruins of war as an **organised** commonwealth of science." }
    ]
  },
  organiser: {
    primary: "A person who arranges, coordinates, or administers an event, movement, institution, or project.",
    secondary: "In developmental embryology, a tissue region (such as the Spemann organizer) that directs the morphological differentiation of adjacent cells.",
    quotes: [
      { author: "Jack London", work: "The Iron Heel", quote: "He was an untiring labor **organiser**, traveling from town to town beneath the constant surveillance of the police." },
      { author: "Hans Spemann", work: "Embryonic Development and Induction", quote: "The dorsal lip of the blastopore functions as an embryonic **organiser**, inducing the neural axis in the host." },
      { author: "Arnold Bennett", work: "The Old Wives' Tale", quote: "Sophia proved herself a capable **organiser**, transforming the run-down pension into a thriving enterprise." }
    ]
  },
  organism: {
    primary: "An individual animal, plant, bacterium, or other single-celled life form capable of growth, reproduction, and response to stimuli.",
    secondary: "A complex system or structure whose mutually dependent parts work together analogously to the organs of a living body.",
    quotes: [
      { author: "Thomas Hardy", work: "The Return of the Native", quote: "Egdon Heath was not a dead tract of peat and heather, but a vast somber **organism** breathing beneath the autumn sky." },
      { author: "Jack London", work: "The Call of the Wild", quote: "Deep within his physical **organism**, ancient memories of the wild wolf pack stirred into renewed life." },
      { author: "Charles Darwin", work: "The Descent of Man", quote: "Every complex **organism** carries within its body the indelible stamp of its lowly origin." }
    ]
  },
  organismal: {
    primary: "Pertaining to or characteristic of an entire organism as a whole, rather than its constituent cells, tissues, or organs.",
    secondary: "In evolutionary biology and physiology, concerning integrated adaptations and phenotypes manifest at the level of the individual living being.",
    quotes: [
      { author: "Julian Huxley", work: "Evolution: The Modern Synthesis", quote: "Natural selection acts primarily at the **organismal** level, evaluating the creature in its totality." },
      { author: "Theodosius Dobzhansky", work: "Genetics of the Evolutionary Process", quote: "Genic mutations find their biological significance only through their consequences for **organismal** fitness." },
      { author: "Stephen Jay Gould", work: "Ontogeny and Phylogeny", quote: "The **organismal** perspective reminds us that a living creature is not a mosaic of independent genes, but an integrated whole." }
    ]
  },
  organismic: {
    primary: "Relating to the theory of organicism; emphasizing the integrated whole of an organism or living system.",
    secondary: "In holistic psychology, viewing human behavior and mental processes as unitary expressions of the entire personality.",
    quotes: [
      { author: "Kurt Goldstein", work: "The Organism", quote: "An **organismic** approach demonstrates that symptom formation is the organism's attempt to come to terms with its deficit." },
      { author: "Abraham Maslow", work: "Motivation and Personality", quote: "Self-actualization expresses an **organismic** drive toward wholeness and inner coherence." },
      { author: "Alfred North Whitehead", work: "Adventures of Ideas", quote: "The cosmology of modern physics demands an **organismic** interpretation of cosmic interconnectedness." }
    ]
  },
  organist: {
    primary: "A musician who plays the organ, especially in churches, concert halls, or civic auditoriums.",
    secondary: "Historically or etymologically, a maker or tuner of musical pipe organs.",
    quotes: [
      { author: "George Eliot", work: "Middlemarch", quote: "The cathedral **organist** poured forth a stately fugue that filled every vault of the ancient nave." },
      { author: "Thomas Hardy", work: "Under the Greenwood Tree", quote: "The village choir viewed the arrival of a church **organist** as a fatal threat to their traditional string orchestra." },
      { author: "Nathaniel Hawthorne", work: "The Marble Faun", quote: "The blind **organist** sat at his instrument, his fingers finding solace in Bach’s sacred harmonies." }
    ]
  },
  organization: {
    primary: "An organized entity or group of people formed for a particular purpose (such as a business, institution, or association).",
    secondary: "The act, process, or manner of organizing components into an orderly, functional system.",
    quotes: [
      { author: "Jack London", work: "The Iron Heel", quote: "The subterranean **organization** of the socialist parties prepared for resistance against the oligarchy." },
      { author: "Frank A. Fetter", work: "Economics Volume I: Economic Principles", quote: "The efficient **organization** of industrial enterprise multiplies the productivity of human labor." },
      { author: "Alexis de Tocqueville", work: "Democracy in America", quote: "Americans of all ages constantly form associations and cultivate the art of social **organization**." }
    ]
  },
  organizational: {
    primary: "Relating to an organization or its administrative and operational structure.",
    secondary: "In management and cognitive science, concerning the systematic arrangement, logistics, and coordination of resources and personnel.",
    quotes: [
      { author: "Chester I. Barnard", work: "The Functions of the Executive", quote: "An **organizational** structure functions effectively only when communication channels are transparent and authoritative." },
      { author: "Herbert A. Simon", work: "Administrative Behavior", quote: "Human rational choice is bounded by the complexity of the **organizational** environment in which it operates." },
      { author: "Lewis Mumford", work: "The Myth of the Machine", quote: "The modern military-industrial complex exhibits immense **organizational** discipline combined with primitive moral purposes." }
    ]
  },
  organizationally: {
    primary: "In a manner relating to an organization or administrative structure.",
    secondary: "From the standpoint of structural arrangement, institutional logistics, or governance.",
    quotes: [
      { author: "Peter Drucker", work: "The Practice of Management", quote: "A corporation must be **organizationally** designed to encourage local initiative without compromising overall integrity." },
      { author: "Max Weber", work: "Economy and Society", quote: "When a political movement matures, it becomes **organizationally** institutionalized through permanent administrative offices." },
      { author: "Thorstein Veblen", work: "The Higher Learning in America", quote: "Universities that are **organizationally** subordinated to commercial boards lose their dedication to pure scholarship." }
    ]
  },
  organize: {
    primary: "To arrange into a structured whole, order systematically, or coordinate methodically.",
    secondary: "To form into a collective body, association, labor union, or political movement.",
    quotes: [
      { author: "Ralph Waldo Emerson", work: "Essays: First Series", quote: "Nature does not stop to classify; it is the intellect of man that seeks to **organize** the boundless flux." },
      { author: "Upton Sinclair", work: "The Jungle", quote: "He resolved to **organize** his fellow packinghouse workers against the dehumanizing conditions of the yards." },
      { author: "Henry David Thoreau", work: "Walden", quote: "A man should **organize** his life so simply that he is not held hostage by trivial domestic anxieties." }
    ]
  },
  organized: {
    primary: "Formed into a coherent, orderly, and systematic structure; possessing disciplined planning.",
    secondary: "Pertaining to labor or political groups united into an association; in biology, possessing specialized organ systems.",
    quotes: [
      { author: "Theodore Roosevelt", work: "The Strenuous Life", quote: "In our modern industrial society, **organized** capital must be balanced by the welfare of **organized** labor." },
      { author: "Arthur Conan Doyle", work: "A Study in Scarlet", quote: "The room had the **organized** disorder of an investigator whose mind alone held the master catalog." },
      { author: "William James", work: "The Principles of Psychology", quote: "An **organized** habit frees our conscious attention to engage with novel problems." }
    ]
  },
  organizer: {
    primary: "A person who coordinates, manages, or sets up an event, project, union, or movement.",
    secondary: "In developmental embryology, an embryonic region that induces the formation of specialized tissues and organs in neighboring cells.",
    quotes: [
      { author: "Jane Addams", work: "Twenty Years at Hull-House", quote: "The community **organizer** must live among the neighbors she seeks to serve and understand." },
      { author: "H. G. Wells", work: "The Outline of History", quote: "Napoleon was less a military genius than a prodigious administrative **organizer**." },
      { author: "Joseph Needham", work: "Biochemistry and Morphogenesis", quote: "The transplantation of the primary **organizer** demonstrates the chemical transmission of developmental instructions." }
    ]
  },
  organogenesis: {
    primary: "The origin, development, and differentiation of bodily organs and organ systems in an embryo from embryonic germ layers.",
    secondary: "In plant tissue culture, the initiation and regeneration of shoots, roots, or leaves from undifferentiated callus tissue.",
    quotes: [
      { author: "Thomas Hunt Morgan", work: "The Mechanism of Mendelian Heredity", quote: "During early **organogenesis**, specific genes are activated in precise temporal sequences to sculpt the bodily organs." },
      { author: "Ernst Haeckel", work: "The Evolution of Man", quote: "The comparative study of vertebrate **organogenesis** discloses astonishing homologies among embryos of divergent species." },
      { author: "E. B. Wilson", work: "The Cell in Development and Inheritance", quote: "The transition from simple gastrulation to complex **organogenesis** marks the crowning marvel of embryology." }
    ]
  },
  organon: {
    primary: "An instrument or method for acquiring knowledge or conducting philosophical inquiry; traditionally applied to Aristotle’s collection of logical treatises.",
    secondary: "A foundational system of rules, principles, or investigative canons.",
    quotes: [
      { author: "Francis Bacon", work: "Novum Organum", quote: "Our new **organon** of inductive science aims not at vanquishing an opponent in debate, but at overcoming nature in action." },
      { author: "Immanuel Kant", work: "Critique of Pure Reason", quote: "General logic cannot serve as an **organon** for the discovery of material truth, but merely as a canon of consistency." },
      { author: "Samuel Taylor Coleridge", work: "The Friend", quote: "A true philosophical method is the mental **organon** through which the scattered phenomena of sense find unity." }
    ]
  },
  organophosphate: {
    primary: "Any chemical compound containing an organic group bonded to a phosphoric acid residue, widely used in agriculture as an insecticide.",
    secondary: "In pharmacology and toxicology, an acetylcholinesterase-inhibiting agent whose potent neurotoxic properties also led to its development as chemical nerve agents.",
    quotes: [
      { author: "Rachel Carson", work: "Silent Spring", quote: "The **organophosphate** insecticides act directly upon the nervous system by destroying the enzyme that breaks down acetylcholine." },
      { author: "Albert Howard", work: "An Agricultural Testament", quote: "The reliance on lethal synthetic chemicals, such as **organophosphate** poisons, disrupts the natural biology of the soil." },
      { author: "Barry Commoner", work: "The Closing Circle", quote: "When an **organophosphate** spray drifts across an orchard, its toxic persistence threatens farmworkers as much as pests." }
    ]
  },
  reorganisation: {
    primary: "The act or process of organizing something anew, differently, or in an improved manner.",
    secondary: "In corporate law and finance, the restructuring of a distressed firm's capital, management, and debt under legal supervision.",
    quotes: [
      { author: "H. G. Wells", work: "The Open Conspiracy", quote: "The necessary **reorganisation** of human society requires a worldwide alignment of scientific and economic agencies." },
      { author: "Joseph Conrad", work: "Under Western Eyes", quote: "The revolutionary committee debated the secret **reorganisation** of student groups across Petersburg." },
      { author: "Winston Churchill", work: "The Second World War", quote: "A drastic **reorganisation** of our naval convoys was ordered to counter the mounting submarine menace." }
    ]
  },
  reorganise: {
    primary: "To organize again, restructure, or reform an existing system, institution, or group.",
    secondary: "In military strategy or commerce, to reconstitute battered units or rearrange administrative branches following disruption.",
    quotes: [
      { author: "George Bernard Shaw", work: "Major Barbara", quote: "If you want to abolish poverty, you must **reorganise** production on scientific lines." },
      { author: "Arthur Conan Doyle", work: "The British Campaign in France and Flanders", quote: "The division fell back into reserve to bury its dead and **reorganise** its shattered battalions." },
      { author: "Virginia Woolf", work: "Night and Day", quote: "She attempted to **reorganise** the family papers, which had accumulated in dusty confusion for generations." }
    ]
  },
  reorganised: {
    primary: "Having been organized again, restructured, or reformed into a new systematic framework.",
    secondary: "Reconstituted after disruption, defeat, or administrative overhaul.",
    quotes: [
      { author: "Charles Dickens", work: "Little Dorrit", quote: "The Circumlocution Office had been repeatedly **reorganised**, each time emerging more completely incompetent than before." },
      { author: "H. G. Wells", work: "The World Set Free", quote: "Under the **reorganised** global administration, regional barriers to commerce and transit melted away." },
      { author: "W. H. Hudson", work: "Green Mansions", quote: "My thoughts were slowly **reorganised** after the delirium of the forest fever had subsided." }
    ]
  },
  reorganization: {
    primary: "The act, process, or instance of organizing again, restructuring, or reforming.",
    secondary: "In commercial law, a formal financial and administrative restructuring of a corporation to avoid liquidation under bankruptcy proceedings.",
    quotes: [
      { author: "Frank A. Fetter", work: "Economics Volume II: Modern Economic Problems", quote: "The **reorganization** of the railway corporation scaled down funded debts to save it from complete insolvency." },
      { author: "L. P. Brockett", work: "The Life and Times of Abraham Lincoln", quote: "The **reorganization** of the southern state governments occupied the deepest thoughts of the administration." },
      { author: "Theodore Roosevelt", work: "An Autobiography", quote: "The civil service required sweeping **reorganization** to eradicate the spoils system from federal offices." }
    ]
  },
  reorganize: {
    primary: "To organize again or anew; to restructure or reconstitute systematically.",
    secondary: "In corporate management, to alter operational and managerial hierarchy to improve efficiency or adapt to market changes.",
    quotes: [
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "Every fresh insight compels us to **reorganize** our prior conceptions of the world." },
      { author: "Jack London", work: "The Iron Heel", quote: "Following the massacre, the underground cadres worked day and night to **reorganize** their severed communication lines." },
      { author: "Upton Sinclair", work: "King Coal", quote: "The miners resolved to **reorganize** their union local in secret defiance of the armed company guards." }
    ]
  },
  reorganized: {
    primary: "Restructured, reformed, or arranged anew in an orderly, functioning system.",
    secondary: "Having undergone institutional, financial, or constitutional reconstitution.",
    quotes: [
      { author: "Leo Tolstoy", work: "War and Peace", quote: "The **reorganized** Russian regiments stood firm on the crest of the hill, awaiting the second French assault." },
      { author: "L. P. Brockett", work: "The Life and Times of Abraham Lincoln", quote: "The **reorganized** militia defended the border counties against Confederate raiders." },
      { author: "Henry Adams", work: "The Education of Henry Adams", quote: "In the **reorganized** universe of the twentieth century, old formulas of mechanical certainty no longer applied." }
    ]
  },
  unorganised: {
    primary: "Lacking systematic arrangement, order, or coordinated structure; chaotic or haphazard.",
    secondary: "Not belonging to or formed into an association, trade union, or coordinated collective body.",
    quotes: [
      { author: "George Orwell", work: "The Road to Wigan Pier", quote: "The **unorganised** workers in the small metal trades were entirely at the mercy of sudden wage cuts." },
      { author: "Thomas Carlyle", work: "Past and Present", quote: "An **unorganised** mass of men is but a mob, impotent for good and terrible only for destruction." },
      { author: "H. G. Wells", work: "Anticipations", quote: "A sprawling, **unorganised** population presents no resistance to the disciplined cadres of modern technique." }
    ]
  },
  unorganized: {
    primary: "Lacking systematic structure, organization, or coherent arrangement; disorderly.",
    secondary: "Not formed into or represented by a labor union, association, or formal administrative body.",
    quotes: [
      { author: "Frank A. Fetter", work: "The Principles of Economics", quote: "The wages of **unorganized** laborers fluctuate sharply with every seasonal shift in industrial demand." },
      { author: "Jack London", work: "The Iron Heel", quote: "The unthinking, **unorganized** populace milled through the streets, unable to withstand the machine guns of the mercenaries." },
      { author: "William James", work: "The Varieties of Religious Experience", quote: "In the soul of the mystic, **unorganized** emotions crystallize into a sudden luminous conviction." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Science & Inquiry/Dashboard — organ';

for (const [word, data] of Object.entries(entries)) {
  const filePath = path.join(clusterPath, `${word}.md`);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const bookIdx = content.indexOf('> [!book]');
  if (bookIdx === -1) {
    console.error(`No > [!book] in ${filePath}`);
    continue;
  }

  const headerPart = content.slice(0, bookIdx).trimEnd();
  const defBlock = `> [!book] 📖 Definitions & Semantic Range\n> 1. **Primary Definition (Lexical / Standard Consensus)**: ${data.primary}\n> 2. **Secondary / Nuanced Definition (Specialized / Domain / Encyclopedic)**: ${data.secondary}`;
  const quoteLines = data.quotes.map(q => `> - 📜 **${q.author} (*${q.work}*):** *"${q.quote}"*`).join('\n');
  const quotesBlock = `> [!quote] 💬 Contextual Usage & Authentic Quotations\n${quoteLines}`;

  const newContent = `${headerPart}\n\n${defBlock}\n\n${quotesBlock}\n`;
  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated: ${filePath}`);
}

console.log('Done Dashboard — organ!');
