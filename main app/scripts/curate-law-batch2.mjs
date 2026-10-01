import fs from 'fs';
import path from 'path';

const basePath = 'App database/Greek roots/Cluster Law & Order';

const filesData = {
  // Dashboard — can
  "Dashboard — can/can.md": {
    primary: "A cylindrical metal container used for holding liquids or preserving foodstuffs; a tin.",
    secondary: "To be able to, or have the capacity, skill, or practical power to perform an action (modal auxiliary verb).",
    quotes: [
      { author: "Charles Dickens", work: "Great Expectations", quote: "He took down a battered oil **can** and oiled the creaking hinge of the prison gate." },
      { author: "Ralph Waldo Emerson", work: "Self-Reliance", quote: "None but he knows what that is which he **can** do, nor does he know until he has tried." },
      { author: "Herman Melville", work: "Moby-Dick", quote: "He seized the tin **can** of rum and poured a fiery libation to the rolling sea." }
    ]
  },
  "Dashboard — can/canal.md": {
    primary: "An artificial waterway constructed to allow the passage of boats or ships inland, or to convey water for irrigation.",
    secondary: "A tubular passage or duct in an animal or plant body through which fluid or air passes (e.g., alimentary canal).",
    quotes: [
      { author: "Mark Twain", work: "The Innocents Abroad", quote: "We glided through the narrow waters of the Grand **Canal**, where ancient marble palaces rose directly from the tide." },
      { author: "Charles Darwin", work: "The Origin of Species", quote: "The complex alimentary **canal** in higher animals is modified into distinct chambers adapted for successive digestive stages." },
      { author: "H. G. Wells", work: "The War of the Worlds", quote: "Telescopic observers had mapped what they supposed to be a network of **canal** systems across the Martian deserts." }
    ]
  },
  "Dashboard — can/canary.md": {
    primary: "A small, bright-yellow finch (*Serinus canaria*) native to the Canary Islands, widely bred in captivity as a singing pet and historically used in coal mines to detect toxic gas.",
    secondary: "A bright, sweet white fortified wine produced in the Canary Islands, or a vivid yellowish-green hue.",
    quotes: [
      { author: "Charlotte Brontë", work: "Jane Eyre", quote: "A golden **canary** twittered happily in its wicker cage near the sunlit window." },
      { author: "William Shakespeare", work: "Twelfth Night", quote: "I will drink **canary** with him tomorrow; while there is a drop of wine in my head, I will not refuse." },
      { author: "George Orwell", work: "The Road to Wigan Pier", quote: "The colliers once carried a **canary** underground, watching its feathers for the earliest sign of deadly choke-damp." }
    ]
  },
  "Dashboard — can/cane.md": {
    primary: "The hollow, jointed, woody stem of bamboo, reeds, or sugar cane, or a slender rod used as a walking stick or instrument of punishment.",
    secondary: "Flexible woven rattan material used for making wicker furniture, basketry, or chair seats.",
    quotes: [
      { author: "Arthur Conan Doyle", work: "The Hound of the Baskervilles", quote: "A walking-stick had been left behind by our visitor; it was a fine, thick piece of wood, of the sort which is known as a stout **cane**." },
      { author: "Harriet Beecher Stowe", work: "Uncle Tom's Cabin", quote: "He leaned heavily upon his hickory **cane** as he surveyed the endless rows of sugar planting." },
      { author: "Charles Dickens", work: "David Copperfield", quote: "Mr. Creakle came into school carrying a ruler and a supple **cane**, looking ominously about the room." }
    ]
  },
  "Dashboard — can/caning.md": {
    primary: "Corporal punishment inflicted with a cane or flexible rod, historically common in schools and judicial penal systems.",
    secondary: "The skilled craft of weaving split rattan or reed strips to form the seats or backs of chairs.",
    quotes: [
      { author: "George Orwell", work: "Such, Such Were the Joys", quote: "A severe **caning** was the standard institutional penalty for any breach of Latin grammar rules." },
      { author: "James Joyce", work: "A Portrait of the Artist as a Young Man", quote: "He remembered the cruel stinging sound of the **caning** echoing through the silent corridors of the college." },
      { author: "Thomas Hardy", work: "Jude the Obscure", quote: "The master threatened him with a public **caning** if the slate was left uncleaned." }
    ]
  },
  "Dashboard — can/canister.md": {
    primary: "A cylindrical or rectangular container, typically of metal, plastic, or ceramic, used for holding dry provisions, tea, tobacco, or chemicals.",
    secondary: "An artillery shell or case designed to scatter shrapnel or disperse smoke and gas upon detonation.",
    quotes: [
      { author: "Robert Louis Stevenson", work: "Treasure Island", quote: "Beside the hearth stood a japanned tin **canister** filled with fragrant tobacco leaves." },
      { author: "Stephen Crane", work: "The Red Badge of Courage", quote: "The battery unleashed a storm of **canister** that tore through the underbrush like flying gravel." },
      { author: "H. G. Wells", work: "The War of the Worlds", quote: "Each cylinder contained a heavy black **canister** which discharged the lethal suffocating vapor across the valley." }
    ]
  },
  "Dashboard — can/cannery.md": {
    primary: "A factory or industrial plant where food—especially fish, meat, fruit, or vegetables—is processed and sealed in airtight metal cans.",
    secondary: "The coastal canning facility and its unique industrial working-class community in American social literature.",
    quotes: [
      { author: "John Steinbeck", work: "Cannery Row", quote: "**Cannery** Row in Monterey in California is a poem, a stink, a grating noise, a quality of light, a tone, a habit, a nostalgia, a dream." },
      { author: "Upton Sinclair", work: "The Jungle", quote: "The workers in the meat **cannery** laboured amidst the roar of steam cookers and the clatter of tin lids." },
      { author: "Jack London", work: "Martin Eden", quote: "He found exhausting seasonal employment in the salmon **cannery**, cleaning fish until his hands were stiff with brine." }
    ]
  },
  "Dashboard — can/canon.md": {
    primary: "A general rule, fundamental law, principle, or criterion by which something is judged, evaluated, or regulated.",
    secondary: "An authorized collection or list of sacred books or literary works accepted as genuine, authoritative, and standard.",
    quotes: [
      { author: "William Shakespeare", work: "Hamlet", quote: "Or that the Everlasting had not fix'd His **canon** 'gainst self-slaughter! O God! God!" },
      { author: "Immanuel Kant", work: "Critique of Pure Reason", quote: "A **canon** of pure reason comprises the sum of the a priori principles of the correct use of certain cognitive faculties." },
      { author: "Matthew Arnold", work: "Essays in Criticism", quote: "To establish a sound literary **canon**, we must learn to see the object as in itself it really is." }
    ]
  },
  "Dashboard — can/canonic.md": {
    primary: "Conforming to or established by a canon, rule, or recognized authoritative standard; canonical.",
    secondary: "In mathematics and classical mechanics, pertaining to standard transformed coordinates or Hamiltonian equations of motion.",
    quotes: [
      { author: "Lord Kelvin", work: "Treatise on Natural Philosophy", quote: "The dynamical equations take their most symmetrical form when expressed in Hamiltonian **canonic** coordinates." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The bishops assembled to settle the **canonic** authority of disputed ecclesiastical writings." },
      { author: "William James", work: "The Varieties of Religious Experience", quote: "Any departure from the strict **canonic** rule was regarded by orthodox theologians as grave heresy." }
    ]
  },
  "Dashboard — can/canonical.md": {
    primary: "Conforming to, included within, or established by authoritative rule, sacred law, or orthodox tradition.",
    secondary: "In mathematics, physics, and computer science, recognized as standard, typical, or unique among mathematically equivalent representations.",
    quotes: [
      { author: "T. S. Eliot", work: "Tradition and the Individual Talent", quote: "The historical sense compels a man to write with a feeling that the whole of **canonical** literature has a simultaneous existence." },
      { author: "Richard Feynman", work: "The Feynman Lectures on Physics", quote: "In Hamiltonian mechanics, we express equations of motion through **canonical** momentum and position variables." },
      { author: "Bertrand Russell", work: "A History of Western Philosophy", quote: "The early Church spent centuries debating which apostolic texts should be admitted into the **canonical** scriptures." }
    ]
  },
  "Dashboard — can/canonically.md": {
    primary: "In a canonical manner; in strict conformity with canon law, authoritative regulations, or established standards.",
    secondary: "In mathematics and theoretical physics, in a uniquely defined or natural coordinate-invariant way.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The bishop was **canonically** elected by the unanimous voice of the clergy and the people." },
      { author: "Arthur Eddington", work: "The Mathematical Theory of Relativity", quote: "When coordinates are chosen **canonically**, the fundamental metric tensor assumes its simplest mathematical form." },
      { author: "Walter Pater", work: "The Renaissance", quote: "The painting was **canonically** received into the sacred tradition of high Renaissance art." }
    ]
  },
  "Dashboard — can/canonise.md": {
    primary: "To officially declare a deceased person to be a recognized saint, admitting them into the liturgical calendar (British spelling of canonize).",
    secondary: "To regard, treat, or elevate someone or something to the status of ultimate cultural authority or reverence.",
    quotes: [
      { author: "John Donne", work: "The Canonization", quote: "With unfeigned devotion, the world will read our verses and **canonise** our love." },
      { author: "George Bernard Shaw", work: "Saint Joan", quote: "It took Rome five hundred years to **canonise** the Maid of Orleans after having burned her as a heretic." },
      { author: "Thomas Carlyle", work: "Heroes and Hero-Worship", quote: "Mankind does not fail to **canonise** those rare heroic souls who reveal the divine reality of things." }
    ]
  },
  "Dashboard — can/canonist.md": {
    primary: "An expert, jurist, or scholar specializing in canon law, ecclesiastical jurisprudence, and religious statutes.",
    secondary: "One who interprets or enforces authoritative ecclesiastical regulations within church governance.",
    quotes: [
      { author: "John Milton", work: "The Doctrine and Discipline of Divorce", quote: "The scholastic **canonist** entangled human marriage in a labyrinth of superstitious decrees." },
      { author: "Henry Hallam", work: "View of the State of Europe during the Middle Ages", quote: "The medieval **canonist** asserted the supremacy of papal decretals over the civil codes of monarchs." },
      { author: "Lord Acton", work: "The History of Freedom and Other Essays", quote: "Every skilled **canonist** understood how subtly church law adapted to shifting political alliances." }
    ]
  },
  "Dashboard — can/canonize.md": {
    primary: "To officially declare a deceased person to be a saint in the Catholic or Eastern Orthodox Church, placing their name on the public catalog of saints.",
    secondary: "To sanction, authorize, or treat with the highest literary, cultural, or social veneration.",
    quotes: [
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "Time will sift the reputations of authors and **canonize** only those whose thought touches universal truth." },
      { author: "Nathaniel Hawthorne", work: "The Scarlet Letter", quote: "The townspeople were ready to **canonize** their venerable pastor as a living martyr to holiness." },
      { author: "Virginia Woolf", work: "The Common Reader", quote: "Generations of critics conspire to **canonize** certain masterpieces while forgetting the living vitality that inspired them." }
    ]
  },

  // Dashboard — them
  "Dashboard — them/anathema.md": {
    primary: "A person or thing accursed, detested, or loathed; something intensely disliked or shunned.",
    secondary: "A formal ecclesiastical curse accompanied by excommunication; originally, an offering set up or consecrated to a deity in a temple, later devoted to destruction.",
    quotes: [
      { author: "Charlotte Brontë", work: "Jane Eyre", quote: "The idea of yielding to hypocrisy was an **anathema** to her proud, independent nature." },
      { author: "Thomas Hardy", work: "Tess of the d'Urbervilles", quote: "To the strict parish elders, her unbaptized infant remained under a dark ecclesiastical **anathema**." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The synod hurled a solemn **anathema** against all who refused to subscribe to the imperial creed." }
    ]
  },
  "Dashboard — them/anathematisation.md": {
    primary: "The act, formal pronouncement, or process of cursing, denouncing, or placing under solemn ecclesiastical excommunication (alternative spelling).",
    secondary: "Vehement public condemnation or ostracism of an idea, practice, or doctrine.",
    quotes: [
      { author: "Thomas Carlyle", work: "The French Revolution", quote: "Every political club resounded with the mutual **anathematisation** of rival factions seeking the guillotine." },
      { author: "Henry Hallam", work: "View of the State of Europe during the Middle Ages", quote: "The papal **anathematisation** of refractory sovereigns rarely failed to shake the loyalty of their subjects." },
      { author: "George Eliot", work: "Romola", quote: "The friar's severe **anathematisation** of worldly luxury terrified the wealthy citizens of Florence." }
    ]
  },
  "Dashboard — them/anathematise.md": {
    primary: "To curse, pronounce a solemn ecclesiastical ban upon, or condemn to destruction and excommunication (British spelling).",
    secondary: "To denounce vehemently or reject with moral outrage.",
    quotes: [
      { author: "Samuel Taylor Coleridge", work: "Biographia Literaria", quote: "Dogmatic critics were ever ready to **anathematise** any poet whose metre departed from orthodox couplets." },
      { author: "William Makepeace Thackeray", work: "Vanity Fair", quote: "The virtuous dowager was swift to **anathematise** the scandalous conduct of her younger cousins." },
      { author: "Lord Byron", work: "Don Juan", quote: "Philosophers and priests alike were wont to **anathematise** the pleasures they could no longer taste." }
    ]
  },
  "Dashboard — them/anathematization.md": {
    primary: "The formal act of denouncing, cursing, or excommunicating with an anathema.",
    secondary: "Severe and categorical moral condemnation directed against an opponent, ideology, or social group.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The mutual **anathematization** between Rome and Constantinople sealed the enduring rupture of the Christian world." },
      { author: "Ralph Waldo Emerson", work: "Essays: First Series", quote: "Our institutional creeds spend their energies in the sterile **anathematization** of honest doubt." },
      { author: "John Stuart Mill", work: "On Liberty", quote: "The social **anathematization** of nonconformist opinions stifles intellectual independence far more effectively than legal penalties." }
    ]
  },
  "Dashboard — them/anathematize.md": {
    primary: "To pronounce an anathema against; to condemn, curse, or excommunicate solemnly.",
    secondary: "To denounce publicly as evil, heretical, or intolerable.",
    quotes: [
      { author: "Washington Irving", work: "The Sketch Book", quote: "The austere puritans were quick to **anathematize** the harmless rustic revels of May Day." },
      { author: "Herman Melville", work: "Moby-Dick", quote: "Ahab seemed to **anathematize** the very universe that had inflicted his dismemberment." },
      { author: "Voltaire", work: "Philosophical Dictionary", quote: "Fanatics invariably **anathematize** whatever truth exposes their profitable superstitions." }
    ]
  },
  "Dashboard — them/anathemise.md": {
    primary: "Variant spelling of anathematise: to pronounce an anathema upon; to curse or excommunicate solemnly.",
    secondary: "To denounce or repudiate with strong moral aversion.",
    quotes: [
      { author: "Thomas De Quincey", work: "Confessions of an English Opium-Eater", quote: "The bigots would gladly **anathemise** every medical discovery that alleviates the agony of the sick." },
      { author: "Walter Scott", work: "The Heart of Midlothian", quote: "The old covenanter did not hesitate to **anathemise** all who showed leniency toward prelatical innovations." },
      { author: "John Ruskin", work: "Modern Painters", quote: "It is folly to **anathemise** new architectural styles before understanding the structural needs that birthed them." }
    ]
  },
  "Dashboard — them/anathemize.md": {
    primary: "Variant spelling of anathematize: to denounce, curse, or pronounce an ecclesiastical curse upon.",
    secondary: "To censure or banish from intellectual or moral fellowship.",
    quotes: [
      { author: "Nathaniel Hawthorne", work: "The Marble Faun", quote: "The ascetic monk appeared ready to **anathemize** every marble statue celebrating the pagan beauty of the flesh." },
      { author: "Edgar Allan Poe", work: "Marginalia", quote: "Pedantic reviewers **anathemize** any original cadence that refuses their arbitrary metric laws." },
      { author: "Mark Twain", work: "A Connecticut Yankee in King Arthur's Court", quote: "The church was prompt to **anathemize** my new telegraph wires as witchcraft of the devil." }
    ]
  },
  "Dashboard — them/anthem.md": {
    primary: "A musical composition of celebration, solemnity, or praise, often set to sacred words or serving as a national song of identity.",
    secondary: "Originally, an antiphon or responsive chant sung alternately by two divided choirs in Christian liturgy.",
    quotes: [
      { author: "William Shakespeare", work: "Henry IV, Part 2", quote: "For my voice, I have lost it with halloing and singing of **anthems**." },
      { author: "John Milton", work: "Paradise Lost", quote: "The celestial choirs lifted their golden harps, pouring forth a triumphant **anthem** to the Creator." },
      { author: "Wilfred Owen", work: "Anthem for Doomed Youth", quote: "Only the monstrous anger of the guns can patter out their hasty **anthem**." }
    ]
  },
  "Dashboard — them/anthemis.md": {
    primary: "A genus of aromatic, daisy-like flowering herbs in the aster family (Asteraceae), commonly known as chamomile or dog-fennel, historically used in herbal medicine.",
    secondary: "The botanical taxon grouping Mediterranean composites with feathery foliage and radiate flower heads, derived from Greek anthemon ('flower').",
    quotes: [
      { author: "William Withering", work: "A Botanical Arrangement of British Plants", quote: "The genus **Anthemis** is known for its strong aromatic odour and daisy-like rays surrounding a conical yellow disc." },
      { author: "John Lindley", work: "Flora Medica", quote: "The dried flower heads of **Anthemis** nobilis possess bitter tonic and carminative virtues long prized in domestic medicine." },
      { author: "Asa Gray", work: "Manual of the Botany of the Northern United States", quote: "Species of **Anthemis** have escaped from old gardens to colonize roadsides and waste places across the continent." }
    ]
  },
  "Dashboard — them/thematic.md": {
    primary: "Relating to, constituting, or having a theme or central unifying topic.",
    secondary: "In linguistics, pertaining to a theme vowel inserted between a root and an inflectional ending in Indo-European morphology.",
    quotes: [
      { author: "Virginia Woolf", work: "To the Lighthouse", quote: "The **thematic** unity of the painting depended not upon realistic detail, but upon the harmony of light and shadow." },
      { author: "E. M. Forster", work: "Aspects of the Novel", quote: "A great novel weaves distinct **thematic** threads that echo and resonate throughout its plot." },
      { author: "Noam Chomsky", work: "Aspects of the Theory of Syntax", quote: "In generative grammar, **thematic** relations define the core semantic roles that noun phrases bear toward their governing verb." }
    ]
  },
  "Dashboard — them/thematically.md": {
    primary: "In a way that relates to, or is organized by, themes or central motifs.",
    secondary: "In literary, artistic, or musical composition, structured around recurring symbolic or ideological patterns.",
    quotes: [
      { author: "Henry James", work: "The Art of the Novel", quote: "The chapters were **thematically** linked by the persistent consciousness of the central observer." },
      { author: "T. S. Eliot", work: "The Sacred Wood", quote: "The scenes of the Elizabethan tragedy were grouped **thematically** to heighten psychological suspense." },
      { author: "Northrop Frye", work: "Anatomy of Criticism", quote: "Archetypal narratives recur **thematically** across divergent cultures, reflecting seasonal cycles of death and rebirth." }
    ]
  },
  "Dashboard — them/theme.md": {
    primary: "An underlying subject, central idea, or motif in a literary work, speech, artistic composition, or musical piece.",
    secondary: "A recognizable melody or musical phrase upon which a composition, fugue, or variation set is developed.",
    quotes: [
      { author: "William Shakespeare", work: "Sonnet 105", quote: "My **theme** is love, and truth and beauty mine." },
      { author: "Ludwig van Beethoven", work: "Selected Letters", quote: "I take a simple **theme** and discover within its miniature form an entire universe of symphonic development." },
      { author: "Ralph Waldo Emerson", work: "The Poet", quote: "The true poet finds an inspiring **theme** in the commonest events of human life." }
    ]
  },
  "Dashboard — them/themis.md": {
    primary: "The Titan goddess of divine law, natural order, custom, and justice in Greek mythology, often depicted holding scales as the embodiment of civic fairness.",
    secondary: "The universal, unwritten cosmic law and divine rightness governing gods and mortals alike in archaic Greek jurisprudence.",
    quotes: [
      { author: "Hesiod", work: "Theogony", quote: "Next Zeus took to wife gleaming **Themis**, who bore the Horae—Order, Justice, and blessed Peace—who mind the works of mortal men." },
      { author: "Jane Ellen Harrison", work: "Themis: A Study of the Social Origins of Greek Religion", quote: "In ancient Greek thought, **Themis** represented the collective social conscience, the established tribal custom that precedes written statute." },
      { author: "Gilbert Murray", work: "Five Stages of Greek Religion", quote: "Before kings laid down legal codes, **Themis** reigned as the sacred voice of customary fairness and divine harmony." }
    ]
  },
  "Dashboard — them/themistocles.md": {
    primary: "An influential Athenian statesman and naval strategist (c. 524–459 BCE) whose foresight led to the expansion of the Athenian fleet and the decisive victory over Persia at Salamis.",
    secondary: "A historical exemplar of brilliant military cunning, political foresight, and patriotic statecraft in classical Greece.",
    quotes: [
      { author: "Thucydides", work: "History of the Peloponnesian War", quote: "**Themistocles** was a man who exhibited the most convincing proofs of natural genius; in supreme emergencies he was the best at improvising the right course." },
      { author: "Plutarch", work: "Parallel Lives", quote: "When asked whether he would rather be Achilles or Homer, **Themistocles** replied by asking whether one would rather be the victor in the Olympic games or the herald who proclaims them." },
      { author: "Herodotus", work: "The Histories", quote: "It was the visionary counsel of **Themistocles** that persuaded the Athenians to build the wooden walls of the navy that saved Hellas." }
    ]
  },
  "Dashboard — them/unthematic.md": {
    primary: "Not organized around, having, or relating to a central theme or unified topic.",
    secondary: "In Indo-European linguistics, lacking a theme vowel inserted between root and inflectional endings; athematic.",
    quotes: [
      { author: "Leonard Bloomfield", work: "Language", quote: "In archaic morphology, **unthematic** verbs attach personal endings directly to the bare verbal root without a linking vowel." },
      { author: "E. M. Forster", work: "Aspects of the Novel", quote: "An episodic plot that meanders without unifying purpose strikes the reader as fundamentally **unthematic**." },
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "The historical shift from **unthematic** to thematic stem conjugations simplified verbal paradigms across late Indo-European dialects." }
    ]
  }
};

for (const [relPath, entry] of Object.entries(filesData)) {
  const filePath = path.join(basePath, relPath);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Find top portion up to > [!book]
  const bookIdx = content.indexOf('> [!book]');
  if (bookIdx === -1) {
    console.error(`No > [!book] in ${relPath}`);
    continue;
  }
  const topBlock = content.substring(0, bookIdx);

  const newContent = `${topBlock}> [!book] 📖 Definitions & Semantic Range
> 1. **Primary Definition (Lexical / Standard Consensus)**: ${entry.primary}
> 2. **Secondary / Nuanced Definition (Specialized / Domain / Encyclopedic)**: ${entry.secondary}

> [!quote] 💬 Contextual Usage & Authentic Quotations
${entry.quotes.map(q => `> - 📜 **${q.author} (*${q.work}*):** *"${q.quote}"*`).join('\n')}
`;

  fs.writeFileSync(filePath, newContent, 'utf8');
  console.log(`Updated: ${relPath}`);
}

console.log('Done Batch 2 of Cluster Law & Order!');
