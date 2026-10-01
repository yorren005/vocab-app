import fs from 'fs';
import path from 'path';

const basePath = 'App database/Greek roots/Cluster Law & Order';

const filesData = {
  // Dashboard — dexi
  "Dashboard — dexi/dexi.md": {
    primary: "The Greek combining root meaning 'right-hand', 'on the right', 'dexterous', or by extension 'auspicious' and 'favorable' (opposed to *aristeros*, left/sinister).",
    secondary: "In biological morphology and taxonomy, designating right-sided anatomical structures, clockwise chirality, or dexter affinities.",
    quotes: [
      { author: "Aristotle", work: "On the Generation of Animals", quote: "The ancients held that the **dexi** or right side was hotter and more active than the left." },
      { author: "Henry George Liddell & Robert Scott", work: "A Greek-English Lexicon", quote: "Under **dexi**, the lexicon records senses ranging from the right hand to auspicious omens and skillful conduct." },
      { author: "D'Arcy Wentworth Thompson", work: "On Growth and Form", quote: "Chiral structures throughout animal morphology systematically differentiate between **dexi** and laevo directional orientations." }
    ]
  },
  "Dashboard — dexi/Dexiarchia.md": {
    primary: "A major taxonomic clade of cladobranch nudibranch sea slugs characterized by right-sided anus and digestive gland morphology.",
    secondary: "In phylogenetic systematics, the evolutionary lineage comprising Arminina, Dendronotida, and Aeolidida sea slugs.",
    quotes: [
      { author: "Heike Wägele & Richard C. Willan", work: "Zoological Journal of the Linnean Society", quote: "We establish the clade **Dexiarchia** to unite those nudibranchs exhibiting secondary bilateral symmetry with a dextral anal placement." },
      { author: "Michael Schrödl", work: "Organisms Diversity & Evolution", quote: "Phylogenetic analyses of opisthobranch molluscs confirm that **Dexiarchia** forms a robust monophyletic radiation." },
      { author: "Terrence M. Gosliner", work: "Nudibranch and Sea Slug Identification", quote: "Species within **Dexiarchia** display some of the most remarkable defenses and vibrant warning colorations in the marine realm." }
    ]
  },

  // Dashboard — dike
  "Dashboard — dike/dike.md": {
    primary: "In Greek mythology and philosophical jurisprudence, the personification of moral order, natural law, and equitable justice, daughter of Zeus and Themis.",
    secondary: "An embankment, levee, or ditch constructed to control or confine water, or a tabular igneous sheet intrusion cutting across older rock strata.",
    quotes: [
      { author: "Hesiod", work: "Works and Days", quote: "And there is virgin **Dike**, the daughter of Zeus, who is honored and revered among the gods who dwell on Olympus." },
      { author: "Plato", work: "The Republic", quote: "He maintained that **dike**, or justice, consisted in each part of the soul and the state fulfilling its proper appointed function." },
      { author: "Charles Dickens", work: "Great Expectations", quote: "There was a reasonably good path now, mostly on the edge of the river, with a divergence here and there where a **dike** came." }
    ]
  },

  // Dashboard — aether
  "Dashboard — aether/aether.md": {
    primary: "The fifth element or quintessence postulated in classical and medieval philosophy to fill the celestial regions above the terrestrial sphere; in 19th-century physics, the hypothetical luminiferous medium permeating space.",
    secondary: "The clear upper sky or pure, rarefied air breathed by the immortal gods of antiquity.",
    quotes: [
      { author: "Isaac Newton", work: "Opticks", quote: "Is not this **aether** exceedingly more rare and subtile than the air, and exceedingly more elastick and active?" },
      { author: "James Clerk Maxwell", work: "Encyclopaedia Britannica", quote: "Whatever difficulties we may have in forming a consistent idea of the constitution of the **aether**, there can be no doubt that the interplanetary spaces are not empty." },
      { author: "Percy Bysshe Shelley", work: "Prometheus Unbound", quote: "The blue **aether** glowed with sudden light as celestial fire descended upon the mortal world." }
    ]
  },
  "Dashboard — aether/ether.md": {
    primary: "A volatile, highly flammable liquid ($C_4H_{10}O$) formerly widely used as an inhalation general anesthetic and solvent in chemical synthesis.",
    secondary: "The hypothetical medium once supposed to permeate all space and transmit electromagnetic waves; synonymous with aether.",
    quotes: [
      { author: "Oliver Wendell Holmes Sr.", work: "Medical Essays", quote: "The state of insensibility produced by **ether** opens a new era in the relief of human suffering during surgery." },
      { author: "Albert Einstein", work: "Sidelights on Relativity", quote: "Recapitulating, we may say that according to the general theory of relativity, space is endowed with physical qualities; in this sense, therefore, there exists an **ether**." },
      { author: "Arthur Conan Doyle", work: "The Poison Belt", quote: "A faint sweet pungent smell, like that of **ether**, hung heavily in the evening breeze." }
    ]
  },
  "Dashboard — aether/ethereal.md": {
    primary: "Extremely delicate, light, and airy in a way that seems not of this world; intangible, celestial, or heavenly.",
    secondary: "Pertaining to the theoretical luminiferous ether or chemical ether compounds.",
    quotes: [
      { author: "John Milton", work: "Paradise Lost", quote: "The sacred radiance came streaming from the **ethereal** sky to illuminate the abyss." },
      { author: "Edgar Allan Poe", work: "The Fall of the House of Usher", quote: "An eye large, liquid, and luminous beyond comparison, gave his countenance an **ethereal** expression." },
      { author: "Ralph Waldo Emerson", work: "Essays: First Series", quote: "Our moods of insight appear **ethereal** and ephemeral, yet they govern all our solid actions." }
    ]
  },
  "Dashboard — aether/etheric.md": {
    primary: "Pertaining to, resembling, or composed of the hypothetical luminiferous ether; celestial or insubstantial.",
    secondary: "In esoteric and metaphysical philosophy, designating the subtle non-physical body or vital energy matrix enveloping the physical organism.",
    quotes: [
      { author: "Oliver Lodge", work: "The Ether of Space", quote: "The transmission of light and gravitation requires an **etheric** continuum whose elasticity defies mechanical explanation." },
      { author: "Arthur Conan Doyle", work: "The Edge of the Unknown", quote: "Spiritualist investigators posited an **etheric** double that survives the dissolution of the mortal frame." },
      { author: "Nikola Tesla", work: "My Inventions", quote: "I envisioned harnessing the vast reservoir of **etheric** energy that vibrates ceaselessly throughout cosmic space." }
    ]
  },
  "Dashboard — aether/etherify.md": {
    primary: "To convert an alcohol or related chemical compound into an ether, typically through dehydration or alkylation.",
    secondary: "To render subtle, aerial, or spiritually refined; to etherealize.",
    quotes: [
      { author: "Justus von Liebig", work: "Familiar Letters on Chemistry", quote: "By heating alcohol in the presence of concentrated sulphuric acid, chemists learned to **etherify** the fluid with remarkable efficiency." },
      { author: "Thomas Carlyle", work: "Sartor Resartus", quote: "The poet strives to **etherify** our coarse earthly dust into spiritual beauty and significance." },
      { author: "William Crookes", work: "Researches in the Phenomena of Spiritualism", quote: "Certain theorists argued that high electrical tension could **etherify** gross matter into an imponderable state." }
    ]
  },
  "Dashboard — aether/etherise.md": {
    primary: "To anesthetize or render unconscious with ether prior to a surgical procedure (alternative spelling of etherize).",
    secondary: "To deaden the senses, dull awareness, or lull into passivity and inaction.",
    quotes: [
      { author: "T. S. Eliot", work: "The Love Song of J. Alfred Prufrock", quote: "When the evening is spread out against the sky like a patient **etherised** upon a table." },
      { author: "Sir James Young Simpson", work: "Account of a New Anaesthetic Agent", quote: "Before the introduction of chloroform, many surgeons would **etherise** patients during major amputations." },
      { author: "Virginia Woolf", work: "The Waves", quote: "The heavy afternoon heat seemed to **etherise** every restless impulse into calm indifference." }
    ]
  },
  "Dashboard — aether/etherize.md": {
    primary: "To administer ether to a patient to produce anesthesia and eliminate the sensation of pain during surgery.",
    secondary: "To immobilize, tranquilize, or render inert, as if placed under a profound medical narcotic.",
    quotes: [
      { author: "William James", work: "The Principles of Psychology", quote: "Chemical agents that **etherize** the cerebral cortex promptly suspend the continuity of conscious reflection." },
      { author: "H. G. Wells", work: "The Island of Doctor Moreau", quote: "It became necessary to **etherize** the subject anew whenever the anatomical modifications touched a sensitive nerve trunk." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The skilled anesthetist knows precisely when to **etherize** the surgical candidate to avoid respiratory arrest." }
    ]
  },
  "Dashboard — aether/ethic.md": {
    primary: "A set of moral principles, rules of conduct, or guiding beliefs held by an individual, group, or profession.",
    secondary: "Pertaining to moral character, duty, and virtue; ethical.",
    quotes: [
      { author: "Aristotle", work: "Nicomachean Ethics", quote: "The moral or **ethic** virtue is formed by habit, from which circumstance it even took its name." },
      { author: "Max Weber", work: "The Protestant Ethic and the Spirit of Capitalism", quote: "The worldly ascetic **ethic** instilled an intense dedication to one's vocational calling." },
      { author: "Aldo Leopold", work: "A Sand County Almanac", quote: "A land **ethic** changes the role of Homo sapiens from conqueror of the land-community to plain member and citizen of it." }
    ]
  },
  "Dashboard — aether/ethical.md": {
    primary: "Relating to moral principles of right and wrong conduct, or conforming to accepted standards of professional and human behavior.",
    secondary: "Pertaining to ethics as a rigorous branch of philosophy investigating virtue, justice, and obligation.",
    quotes: [
      { author: "Immanuel Kant", work: "Critique of Practical Reason", quote: "An action possesses genuine **ethical** worth only when performed strictly out of duty toward moral law." },
      { author: "John Stuart Mill", work: "Utilitarianism", quote: "The utilitarian standard provides an **ethical** criterion grounded in the greatest happiness for the greatest number." },
      { author: "Bertrand Russell", work: "Human Society in Ethics and Politics", quote: "Our scientific knowledge has far outstripped our **ethical** maturity, creating unprecedented perils for mankind." }
    ]
  },
  "Dashboard — aether/hypaethros.md": {
    primary: "In classical Greek architecture, designating a temple, atrium, or colonnaded interior that is unroofed and open to the sky.",
    secondary: "Characterized by overhead natural exposure to the celestial atmosphere without vaulted coverings.",
    quotes: [
      { author: "Vitruvius", work: "De Architectura", quote: "The temple built **hypaethros** possesses no roof over its cella, being open to the sky and surrounded by double colonnades." },
      { author: "James Fergusson", work: "The Parthenon", quote: "Whether the cella was truly **hypaethros** remains one of the most hotly contested debates in classical archaeology." },
      { author: "John Ruskin", work: "The Stones of Venice", quote: "The airy lightness of the colonnade recalled the **hypaethros** courtyards of antiquity where sunlight filtered directly to the pavement." }
    ]
  },

  // Dashboard — eth
  "Dashboard — eth/eth.md": {
    primary: "An archaic Old English, Icelandic, and Faroese letter (ð, uppercase Ð) representing a voiced or unvoiced dental fricative ('th').",
    secondary: "The historical grammatical suffix forming archaic third-person singular present tense verbs in Early Modern English (e.g., 'doth', 'sayeth').",
    quotes: [
      { author: "Henry Sweet", work: "A History of English Sounds", quote: "The runic letter thorn was gradually supplanted in early manuscripts by the Irish-derived **eth**." },
      { author: "Otto Jespersen", work: "A Modern English Grammar", quote: "The Middle English verbal inflection ending in **eth** was gradually replaced in colloquial speech by the northern suffix 's'." },
      { author: "J. R. R. Tolkien", work: "The Monsters and the Critics", quote: "In Anglo-Saxon poetry, the scribes employed both thorn and **eth** with little phonetic distinction between voiced and unvoiced sounds." }
    ]
  },
  "Dashboard — eth/ether.md": {
    primary: "A volatile, highly flammable liquid ($C_4H_{10}O$) formerly widely used as an inhalation general anesthetic and solvent in chemical synthesis.",
    secondary: "The hypothetical medium once supposed to permeate all space and transmit electromagnetic waves; synonymous with aether.",
    quotes: [
      { author: "Oliver Wendell Holmes Sr.", work: "Medical Essays", quote: "The state of insensibility produced by **ether** opens a new era in the relief of human suffering during surgery." },
      { author: "Albert Einstein", work: "Sidelights on Relativity", quote: "Recapitulating, we may say that according to the general theory of relativity, space is endowed with physical qualities; in this sense, therefore, there exists an **ether**." },
      { author: "Arthur Conan Doyle", work: "The Poison Belt", quote: "A faint sweet pungent smell, like that of **ether**, hung heavily in the evening breeze." }
    ]
  },
  "Dashboard — eth/ethic.md": {
    primary: "A set of moral principles, rules of conduct, or guiding beliefs held by an individual, group, or profession.",
    secondary: "Pertaining to moral character, duty, and virtue; ethical.",
    quotes: [
      { author: "Aristotle", work: "Nicomachean Ethics", quote: "The moral or **ethic** virtue is formed by habit, from which circumstance it even took its name." },
      { author: "Max Weber", work: "The Protestant Ethic and the Spirit of Capitalism", quote: "The worldly ascetic **ethic** instilled an intense dedication to one's vocational calling." },
      { author: "Aldo Leopold", work: "A Sand County Almanac", quote: "A land **ethic** changes the role of Homo sapiens from conqueror of the land-community to plain member and citizen of it." }
    ]
  },
  "Dashboard — eth/ethical.md": {
    primary: "Relating to moral principles of right and wrong conduct, or conforming to accepted standards of professional and human behavior.",
    secondary: "Pertaining to ethics as a rigorous branch of philosophy investigating virtue, justice, and obligation.",
    quotes: [
      { author: "Immanuel Kant", work: "Critique of Practical Reason", quote: "An action possesses genuine **ethical** worth only when performed strictly out of duty toward moral law." },
      { author: "John Stuart Mill", work: "Utilitarianism", quote: "The utilitarian standard provides an **ethical** criterion grounded in the greatest happiness for the greatest number." },
      { author: "Bertrand Russell", work: "Human Society in Ethics and Politics", quote: "Our scientific knowledge has far outstripped our **ethical** maturity, creating unprecedented perils for mankind." }
    ]
  },
  "Dashboard — eth/ethically.md": {
    primary: "In a manner consistent with moral principles of right and fair conduct.",
    secondary: "From the standpoint or perspective of ethics and moral philosophy.",
    quotes: [
      { author: "John Dewey", work: "Human Nature and Conduct", quote: "To act **ethically** requires an intelligent assessment of how our habits shape collective human welfare." },
      { author: "Peter Singer", work: "Practical Ethics", quote: "We are **ethically** obliged to give equal consideration to the comparable interests of all sentient beings." },
      { author: "Albert Schweitzer", work: "Out of My Life and Thought", quote: "A human being is **ethically** healthy only when he yields to the inward impulse to help all life that he can." }
    ]
  },
  "Dashboard — eth/ethician.md": {
    primary: "A philosopher, scholar, or specialist who investigates ethics, moral principles, and normative theory; an ethicist.",
    secondary: "A professional advisor or practitioner who analyzes moral dilemmas in institutional, legal, or medical contexts.",
    quotes: [
      { author: "Henry Sidgwick", work: "The Methods of Ethics", quote: "The theoretical **ethician** seeks to systematize the common-sense moral intuitions of mankind into coherent first principles." },
      { author: "G. E. Moore", work: "Principia Ethica", quote: "The foremost duty of the **ethician** is to avoid confusing the fundamental property of 'good' with naturalistic definitions." },
      { author: "William James", work: "The Will to Believe", quote: "No abstract **ethician** sitting in a study can dictate the living value of concrete human sacrifices." }
    ]
  },
  "Dashboard — eth/ethicism.md": {
    primary: "Excessive devotion to, or dogmatic evaluation of literature, art, and life solely through the lens of ethical and moral criteria.",
    secondary: "A philosophical system or outlook that regards moral principles as the foundational basis of all human knowledge and civilization.",
    quotes: [
      { author: "Oscar Wilde", work: "The Picture of Dorian Gray", quote: "The artist should avoid narrow **ethicism**, for an aesthetic creation is neither moral nor immoral, but merely well or poorly made." },
      { author: "Matthew Arnold", work: "Culture and Anarchy", quote: "The Hebraic tendency toward strict **ethicism** must be balanced by Hellenic openness to sweetness and light." },
      { author: "Benedetto Croce", work: "Aesthetic as Science of Expression", quote: "To subordinate art to didactic **ethicism** is to misunderstand the autonomous intuitive nature of artistic expression." }
    ]
  },
  "Dashboard — eth/ethicist.md": {
    primary: "An expert, theorist, or scholar specializing in ethics and moral philosophy, particularly applied ethics in medicine, science, or law.",
    secondary: "A consultant or committee member tasked with resolving complex moral quandaries in institutional practice.",
    quotes: [
      { author: "Peter Singer", work: "Animal Liberation", quote: "The applied **ethicist** must challenge traditional anthropocentric assumptions regarding the moral status of non-human animals." },
      { author: "Bernard Williams", work: "Ethics and the Limits of Philosophy", quote: "The modern **ethicist** often errs by reducing the richness of practical life to abstract decision procedures." },
      { author: "Martha Nussbaum", work: "Creating Capabilities", quote: "As a political **ethicist**, she argued that human dignity requires guaranteed institutional protection for central capabilities." }
    ]
  },
  "Dashboard — eth/ethics.md": {
    primary: "The branch of philosophy concerned with moral values, right and wrong conduct, virtue, and obligation; moral philosophy.",
    secondary: "The formal rules, codes, or principles governing the acceptable behavior of an individual, profession, or organization.",
    quotes: [
      { author: "Baruch Spinoza", work: "Ethics", quote: "In his masterpiece, **Ethics**, Spinoza demonstrated that freedom arises from the intellectual love of God and nature." },
      { author: "Aristotle", work: "Nicomachean Ethics", quote: "The study of **ethics** aims not at theoretical speculation, but at enabling human beings to become good." },
      { author: "Immanuel Kant", work: "Groundwork of the Metaphysics of Morals", quote: "The ultimate foundation of philosophical **ethics** lies in the categorical imperative of rational autonomy." }
    ]
  },
  "Dashboard — eth/ethologist.md": {
    primary: "A biologist or scientist who specializes in ethology—the comparative and evolutionary study of animal behavior in natural environments.",
    secondary: "A field naturalist who analyzes the adaptive function, causation, and ontogeny of species-specific behavioral patterns.",
    quotes: [
      { author: "Konrad Lorenz", work: "King Solomon's Ring", quote: "The observant **ethologist** discovers that the instinctive displays of waterfowl follow precise hereditary rituals." },
      { author: "Nikolaas Tinbergen", work: "The Study of Instinct", quote: "A skilled **ethologist** must formulate four questions regarding any behavior: its mechanism, development, adaptive value, and evolutionary history." },
      { author: "Richard Dawkins", work: "The Selfish Gene", quote: "The field **ethologist** learns to interpret courtship dances as strategic signals calibrated by natural selection." }
    ]
  },
  "Dashboard — eth/ethology.md": {
    primary: "The scientific and objective study of animal behavior, especially under natural conditions, viewed from an evolutionary and ecological perspective.",
    secondary: "In historical philosophy, the study of human character, temperament, and cultural formation as proposed by John Stuart Mill.",
    quotes: [
      { author: "Konrad Lorenz", work: "On Aggression", quote: "Modern **ethology** demonstrated that ritualized combat among social animals serves to preserve rather than destroy the species." },
      { author: "John Stuart Mill", work: "A System of Logic", quote: "Mill proposed a science of **ethology** dedicated to discovering the laws of the formation of character." },
      { author: "Edward O. Wilson", work: "Sociobiology: The New Synthesis", quote: "Comparative **ethology** provided the essential observational bedrock upon which sociobiological theories were constructed." }
    ]
  },
  "Dashboard — eth/ethos.md": {
    primary: "The characteristic spirit, underlying sentiment, moral values, and guiding beliefs of a community, culture, institution, or historical era.",
    secondary: "In classical rhetoric, the persuasive appeal based on the speaker's perceived character, authority, credibility, and moral virtue.",
    quotes: [
      { author: "Aristotle", work: "Rhetoric", quote: "Persuasion is achieved by the speaker's **ethos** when the speech is spoken in such a way as to make him worthy of credence." },
      { author: "Max Weber", work: "The Protestant Ethic and the Spirit of Capitalism", quote: "The economic **ethos** of modern capitalism was deeply shaped by the religious devotion of ascetic Calvinism." },
      { author: "Alexis de Tocqueville", work: "Democracy in America", quote: "The democratic **ethos** of the American township cultivated an active sense of civic duty among its citizens." }
    ]
  },
  "Dashboard — eth/unethical.md": {
    primary: "Not conforming to accepted rules or moral principles of proper, fair, and professional conduct; unscrupulous or corrupt.",
    secondary: "In violation of established institutional codes or moral responsibilities toward clients, subjects, or the public.",
    quotes: [
      { author: "Upton Sinclair", work: "The Jungle", quote: "The investigation exposed the **unethical** practices of meatpacking bosses who concealed tainted products from inspectors." },
      { author: "Hannah Arendt", work: "Eichmann in Jerusalem", quote: "Totalitarian regimes succeed by normalizing profoundly **unethical** deeds as routine bureaucratic duty." },
      { author: "Rachel Carson", work: "Silent Spring", quote: "It was fundamentally **unethical** to blanket whole ecosystems with synthetic toxins without warning the public of long-term hazards." }
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

console.log('Done Batch 1 of Cluster Law & Order!');
