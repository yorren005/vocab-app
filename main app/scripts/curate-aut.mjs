import fs from 'fs';
import path from 'path';

const entries = {
  aut: {
    primary: "The Greek combining root (auto-, from autos, meaning 'self, one's own, by oneself, spontaneous'), forming terms relating to the self, self-action, or independence.",
    secondary: "In modern technology and science, denoting processes, devices, or mechanisms that operate independently of external control.",
    quotes: [
      { author: "Aristotle", work: "Nicomachean Ethics", quote: "The Greek root **aut**- signifies that which acts from its own internal principle rather than external compulsion." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "The scientific prefix **aut**- designates machines that move by their own stored energy." },
      { author: "Ralph Waldo Emerson", work: "Self-Reliance", quote: "Every genuine thought springs from that deep **aut**-identity where the soul meets universal truth." }
    ]
  },
  autarchical: {
    primary: "Relating to autarchy; pertaining to absolute sovereignty, autocracy, or despotic personal rule.",
    secondary: "Characterized by uncontrolled, unlimited political dominion.",
    quotes: [
      { author: "John Stuart Mill", work: "Considerations on Representative Government", quote: "An **autarchical** regime concentrates all legislative and executive prerogatives in the hands of a single master." },
      { author: "Edmund Burke", work: "Reflections on the Revolution in France", quote: "Despotism does not cease to be oppressive when exercised through an **autarchical** assembly." },
      { author: "Alexis de Tocqueville", work: "Democracy in America", quote: "Democratic nations must guard against an **autarchical** bureaucracy that suffocates civic liberty." }
    ]
  },
  autarchism: {
    primary: "A political philosophy that upholds individual self-ownership and rejects all external rule, government, or coercive authority.",
    secondary: "The advocacy of absolute political autocracy or unbounded personal rule.",
    quotes: [
      { author: "Robert LeFevre", work: "The Fundamentals of Liberty", quote: "Philosophical **autarchism** insists that each individual possesses an absolute moral right to govern his own person." },
      { author: "Herbert Spencer", work: "The Man Versus the State", quote: "The radical extension of individual liberty culminates in a principled **autarchism** opposed to bureaucratic meddling." },
      { author: "Lord Acton", work: "Essays on Freedom and Power", quote: "Whether manifested as imperial tyranny or extreme libertarian **autarchism**, the rejection of moral restraint leads to social breakdown." }
    ]
  },
  autarchy: {
    primary: "Absolute sovereignty; autocratic rule or government by an uncontrolled ruler (from Greek autos + archein, to rule).",
    secondary: "Absolute power or despotic supremacy exercised over a state or organization.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "Diocletian transformed the nominal republic into an undisguised **autarchy**, demanding divine honors from his courtiers." },
      { author: "Thomas Babington Macaulay", work: "History of England", quote: "The Stuart monarchs foolishly dreamed of establishing an **autarchy** upon English soil." },
      { author: "Woodrow Wilson", work: "The State", quote: "A pure **autarchy** rests upon force alone, lacking the enduring stability conferred by citizen consent." }
    ]
  },
  autarkical: {
    primary: "Pertaining to autarky; economically self-sufficient and independent of foreign trade (from Greek autos + arkein, to suffice).",
    secondary: "Characterized by economic isolationism or self-contained national production.",
    quotes: [
      { author: "John Maynard Keynes", work: "National Self-Sufficiency", quote: "An **autarkical** economic policy inevitably sacrifices the immense efficiencies of international trade." },
      { author: "Adam Smith", work: "The Wealth of Nations", quote: "Nations attempting an **autarkical** isolation impoverish their citizens by refusing foreign commodities." },
      { author: "Frank A. Fetter", work: "Economics Volume II: Modern Economic Problems", quote: "The wartime blockade forced the besieged nation into an extreme **autarkical** regime." }
    ]
  },
  autarky: {
    primary: "Economic independence or self-sufficiency; the policy of establishing a national economy independent of foreign trade.",
    secondary: "A country or state that maintains complete economic self-containment.",
    quotes: [
      { author: "John Maynard Keynes", work: "The General Theory of Employment, Interest and Money", quote: "The reckless pursuit of national **autarky** during depressions destroys international prosperity." },
      { author: "Frank A. Fetter", work: "Modern Economic Problems", quote: "No modern industrial nation can achieve genuine **autarky** without drastic declines in standard of living." },
      { author: "Winston Churchill", work: "The Gathering Storm", quote: "Germany’s relentless drive toward military **autarky** foreshadowed aggressive territorial expansion." }
    ]
  },
  authentic: {
    primary: "Of undisputed origin; genuine, true, and not a copy, forgery, or counterfeit.",
    secondary: "True to one’s own personality, spirit, or character; sincere; in existentialism, living in accordance with genuine freedom.",
    quotes: [
      { author: "William Shakespeare", work: "All's Well That Ends Well", quote: "To be said, an **authentic** fellow, and one that hath spoken with the king." },
      { author: "Samuel Johnson", work: "Preface to Shakespeare", quote: "His characters are the genuine progeny of common humanity, an **authentic** mirror of living manners." },
      { author: "Thomas Carlyle", work: "On Heroes, Hero-Worship, and the Heroic in History", quote: "The first mark of a true hero is that he be sincere and **authentic** in his convictions." }
    ]
  },
  authentically: {
    primary: "In an authentic manner; genuinely, truly, or reliably.",
    secondary: "In a manner true to one's genuine character, origin, or historical truth.",
    quotes: [
      { author: "Henry James", work: "The Portrait of a Lady", quote: "She wished to live **authentically**, refusing to adopt opinions merely because society approved them." },
      { author: "John Stuart Mill", work: "On Liberty", quote: "Human nature is not a machine to be built after a model, but a tree that must grow and develop **authentically** from inward forces." },
      { author: "George Eliot", work: "Daniel Deronda", quote: "The old parchment was **authentically** signed by the elders of the congregation." }
    ]
  },
  authenticate: {
    primary: "To establish the truth, genuineness, or validity of something (such as a document, signature, or work of art).",
    secondary: "In computing and telecommunications, to verify the identity of a user, process, or device prior to granting access.",
    quotes: [
      { author: "T. R. Glover", work: "The Jesus of History", quote: "Careful historians must cross-examine ancient testimony to **authenticate** the recorded facts." },
      { author: "Arthur Conan Doyle", work: "The Adventure of the Norwood Builder", quote: "Holmes inspected the wax seal with his pocket lens to **authenticate** the will." },
      { author: "Edgar Allan Poe", work: "The Gold-Bug", quote: "I used gentle heat upon the vellum to **authenticate** the secret cipher written in invisible ink." }
    ]
  },
  authentication: {
    primary: "The act, process, or evidence of establishing that something is genuine, valid, or authentic.",
    secondary: "In computer security, the verification of credentials to confirm a claimant’s identity.",
    quotes: [
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "The **authentication** of historical records requires the sober collation of dates, names, and seals." },
      { author: "Lord Acton", work: "The Study of History", quote: "Modern criticism begins with the rigorous **authentication** of archival documents." },
      { author: "Charles Dickens", work: "A Tale of Two Cities", quote: "The prison registry served as the grim **authentication** that the prisoner was condemned to the guillotine." }
    ]
  },
  authenticity: {
    primary: "The quality of being authentic, genuine, or of undisputed origin.",
    secondary: "In existential philosophy, the degree to which an individual's actions are congruent with their freedom and core values.",
    quotes: [
      { author: "Ralph Waldo Emerson", work: "Essays: First Series", quote: "Insist on yourself; never imitate; your own gift you can present every moment with the cumulative force of a whole life’s **authenticity**." },
      { author: "Virginia Woolf", work: "Orlando", quote: "The **authenticity** of human feeling cannot be measured by conventional certificates." },
      { author: "David Hume", work: "An Enquiry Concerning the Principles of Morals", quote: "The **authenticity** of our moral sentiments derives from our instinctive sympathy with our fellows." }
    ]
  },
  autism: {
    primary: "A complex neurodevelopmental condition characterized by challenges in social communication, repetitive behaviors, and restricted interests.",
    secondary: "Historically (coined by Eugen Bleuler), a state of profound self-absorption where fantasy and private reality predominate over external relations.",
    quotes: [
      { author: "Eugen Bleuler", work: "Dementia Praecox or the Group of Schizophrenias", quote: "I designate as **autism** this detachment from external reality together with the relative or absolute predominance of the inner life." },
      { author: "Oliver Sacks", work: "An Anthropologist on Mars", quote: "Temple Grandin’s extraordinary visual memory provides a unique window into the inner architecture of **autism**." },
      { author: "Hans Asperger", work: "Autistic Psychopathy in Childhood", quote: "Children presenting with this form of **autism** exhibit remarkable originality of thought alongside social estrangement." }
    ]
  },
  autistic: {
    primary: "Pertaining to, characteristic of, or affected with autism.",
    secondary: "Tending toward solitary self-absorption or intensive, specialized focus.",
    quotes: [
      { author: "Eugen Bleuler", work: "Dementia Praecox", quote: "The **autistic** withdrawal of the patient creates an impassable barrier between him and the hospital staff." },
      { author: "Oliver Sacks", work: "The Man Who Mistook His Wife for a Hat", quote: "The **autistic** artist drew the cathedral with photographic precision, capturing every stone from memory." },
      { author: "William James", work: "The Principles of Psychology", quote: "In extreme reverie, our thoughts take on an almost **autistic** independence from sensory stimuli." }
    ]
  },
  autoimmune: {
    primary: "Relating to or caused by antibodies or sensitized T lymphocytes that attack the body's own tissues and organs.",
    secondary: "Describing diseases (such as lupus, rheumatoid arthritis, or type 1 diabetes) characterized by an abnormal self-reactive immune response.",
    quotes: [
      { author: "Frank Macfarlane Burnet", work: "Auto-Immunity and Auto-Immune Disease", quote: "When the body’s forbidden clones escape clonal deletion, an **autoimmune** attack against self-antigens inevitably follows." },
      { author: "Peter Medawar", work: "The Uniqueness of the Individual", quote: "The immune system normally respects self; any **autoimmune** rebellion marks a profound regulatory breakdown." },
      { author: "Lewis Thomas", work: "The Lives of a Cell", quote: "In an **autoimmune** condition, the defensive machinery turns upon its own host with catastrophic efficiency." }
    ]
  },
  autoimmunity: {
    primary: "The state or condition in which the immune system mounts a response against an organism’s own healthy tissues.",
    secondary: "The failure of immunological self-tolerance, leading to chronic inflammation and tissue destruction.",
    quotes: [
      { author: "Frank Macfarlane Burnet", work: "Clonal Selection Theory of Acquired Immunity", quote: "The mystery of **autoimmunity** lies in the failure of the thymus to purge self-reactive lymphocyte lineages." },
      { author: "Paul Ehrlich", work: "On Immunity", quote: "Nature provides mechanisms against what I have termed horror autotoxicus, the mortal peril of **autoimmunity**." },
      { author: "Peter Medawar", work: "The Hope of Progress", quote: "Understanding the genetics of **autoimmunity** is crucial for unlocking the pathology of chronic degenerative diseases." }
    ]
  },
  automated: {
    primary: "Operated by automatic, self-regulating equipment or computerized machinery rather than manual human intervention.",
    secondary: "Converted to or controlled by automation; mechanized.",
    quotes: [
      { author: "Norbert Wiener", work: "The Human Use of Human Beings", quote: "The fully **automated** factory will demand a fundamental re-evaluation of the dignity and purpose of human labor." },
      { author: "Lewis Mumford", work: "The Myth of the Machine", quote: "An **automated** megamachine operates with inhuman regularity, heedless of organic human rhythms." },
      { author: "Arthur C. Clarke", work: "Profiles of the Future", quote: "In an **automated** world, mankind must discover creative pursuits to replace routine drudgery." }
    ]
  },
  automatic: {
    primary: "Working or operating by itself with little or no direct human control; self-acting.",
    secondary: "Done unconsciously, instinctively, or spontaneously without premeditated conscious thought; as a noun, an automatic firearm.",
    quotes: [
      { author: "Thomas Hardy", work: "The Mayor of Casterbridge", quote: "His movements became **automatic**, governed by habit rather than conscious resolve." },
      { author: "William James", work: "The Principles of Psychology", quote: "Habit diminishes the conscious attention with which our acts are performed, rendering them smooth and **automatic**." },
      { author: "Jack London", work: "The Call of the Wild", quote: "Buck’s muscular reactions were swift and **automatic**, responding before thought could intervene." }
    ]
  },
  automatise: {
    primary: "To make automatic; convert a process, habit, or mechanical system to self-acting operation.",
    secondary: "In psychology and education, to practice an action until it can be performed without conscious cognitive effort.",
    quotes: [
      { author: "H. G. Wells", work: "The Work, Wealth and Happiness of Mankind", quote: "The industrial engineer seeks to **automatise** every repetitive operation in the workshop." },
      { author: "Bertrand Russell", work: "The Analysis of Mind", quote: "We must **automatise** basic intellectual skills to liberate conscious attention for creative reasoning." },
      { author: "George Bernard Shaw", work: "Back to Methuselah", quote: "Once you **automatise** the breathing and heartbeat, the higher intellect can contemplate eternity." }
    ]
  },
  automatism: {
    primary: "The performance of actions without conscious thought, volition, or intention (such as sleepwalking or involuntary reflexes).",
    secondary: "In Surrealist art and literature, a method of spontaneous creation (psychic automatism) expressing unconscious thought directly.",
    quotes: [
      { author: "André Breton", work: "Manifesto of Surrealism", quote: "Surrealism is psychic **automatism** in its pure state, by which one proposes to express the actual functioning of thought." },
      { author: "Thomas Henry Huxley", work: "On the Hypothesis that Animals are Automata", quote: "The theory of physiological **automatism** suggests that conscious states are mere epiphenomena accompanying nerve activity." },
      { author: "William James", work: "The Principles of Psychology", quote: "Motor **automatism** reveals how deeply ingrained habit paths in the cerebral cortex can discharge without conscious assent." }
    ]
  },
  automatize: {
    primary: "To make automatic; render self-acting or unconscious through repetition.",
    secondary: "In ergonomics and software engineering, to replace human labor with algorithmic or robotic control.",
    quotes: [
      { author: "John Dewey", work: "Human Nature and Conduct", quote: "Education must **automatize** basic habits so that the conscious mind remains free to explore novel situations." },
      { author: "Thorstein Veblen", work: "The Theory of Business Enterprise", quote: "The imperative of the machine process is to **automatize** every phase of manufacturing." },
      { author: "Herbert A. Simon", work: "The Shape of Automation", quote: "As we **automatize** administrative routines, computers assume the burden of repetitive clerical decisions." }
    ]
  },
  automaton: {
    primary: "A self-moving or self-operating machine, especially a mechanical figure constructed to mimic human or animal actions.",
    secondary: "A person who acts mechanically, mindlessly, or routinely without original thought or emotion.",
    quotes: [
      { author: "René Descartes", work: "Discourse on the Method", quote: "If there were machines bearing the organs and shape of a monkey, we should have no means of distinguishing them from that animal, seeing they are mere **automata**." },
      { author: "Charlotte Brontë", work: "Jane Eyre", quote: "Do you think I am an **automaton**?—a machine without feelings? and can bear to have my morsel of bread snatched from my lips?" },
      { author: "Thomas Hardy", work: "Tess of the d'Urbervilles", quote: "She walked through the dawn like an **automaton**, her grief too deep for outward tears." }
    ]
  },
  automobile: {
    primary: "A self-propelled road vehicle, typically with four wheels and powered by an internal combustion engine or electric motor.",
    secondary: "Self-moving or spontaneous in motion.",
    quotes: [
      { author: "Frank A. Fetter", work: "Economics Volume II: Modern Economic Problems", quote: "The rapid rise of the **automobile** transformed rural life, paving highways across the continent." },
      { author: "Jack London", work: "Martin Eden", quote: "He watched the wealthy glide down the avenue in high-powered **automobile** carriages." },
      { author: "H. G. Wells", work: "The World Set Free", quote: "The primitive roaring **automobile** of the early twentieth century gave way to silent atomic transports." }
    ]
  },
  automobilist: {
    primary: "A driver, owner, or enthusiast of an automobile (a motorist).",
    secondary: "In early twentieth-century culture, an explorer or sporting driver who undertook long-distance journeys by motorcar.",
    quotes: [
      { author: "Arthur Conan Doyle", work: "His Last Bow", quote: "The veteran **automobilist** adjusted his goggles and accelerated into the gathering fog." },
      { author: "Edith Wharton", work: "A Motor-Flight Through France", quote: "To the discerning **automobilist**, France reveals picturesque villages nestled far from the railway lines." },
      { author: "H. G. Wells", work: "The War in the Air", quote: "Every enthusiastic **automobilist** greeted the dawn of aviation with eager mechanical curiosity." }
    ]
  },
  autopilot: {
    primary: "An electronic or mechanical control system on an aircraft or vessel that guides it automatically without continuous human steering.",
    secondary: "Figuratively, a state of doing something routinely or unconsciously without active mental effort.",
    quotes: [
      { author: "Antoine de Saint-Exupéry", work: "Night Flight", quote: "He engaged the **autopilot**, trusting the gyroscopic needles to keep the mail plane level through the Andean night." },
      { author: "Arthur C. Clarke", work: "2001: A Space Odyssey", quote: "The computerized **autopilot** monitored every orbital telemetry feed while the astronauts slept in hibernation." },
      { author: "Virginia Woolf", work: "The Waves", quote: "I move as if on an internal **autopilot**, performing the mechanical rites of morning tea while my thoughts remain leagues away." }
    ]
  },
  autos: {
    primary: "The ancient Greek pronoun αὐτός, meaning 'self, same, spontaneous, very.'",
    secondary: "In classical grammar and philosophy, the root denoting individual selfhood and autonomous agency.",
    quotes: [
      { author: "Plato", work: "Alcibiades I", quote: "To know oneself is to understand the nature of the true **autos**, the immortal soul, rather than its bodily instrument." },
      { author: "Aristotle", work: "Metaphysics", quote: "The concept of **autos** serves as the linguistic pivot for asserting that a thing is identical with its own essence." },
      { author: "William Whewell", work: "History of the Inductive Sciences", quote: "Modern science borrowed the Greek **autos** whenever it required a name for self-governing physical systems." }
    ]
  },
  unauthentic: {
    primary: "Not authentic; not genuine, reliable, or verified; counterfeit or spurious.",
    secondary: "In existential philosophy and psychology, lacking personal integrity; living in conformity with external expectations rather than self-determined truth.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Most Eminent English Poets", quote: "The critics rejected the disputed ballad as an **unauthentic** fabrication of a later century." },
      { author: "Thomas Carlyle", work: "The French Revolution", quote: "A court whose ceremonies were hollow and **unauthentic** could not withstand the fiery verdict of the people." },
      { author: "John Stuart Mill", work: "Considerations on Representative Government", quote: "Petitions that do not reflect the genuine will of the electors are dismissed as **unauthentic** clamor." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Self & Identity/Dashboard — aut';

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

console.log('Done Dashboard — aut!');
