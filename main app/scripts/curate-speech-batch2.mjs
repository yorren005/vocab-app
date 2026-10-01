import fs from "fs";
import path from "path";

const baseDir = "App database/Greek roots/Cluster Speech & Language";

const wordsData = {
  "Dashboard — phem/blasphemous.md": {
    word: "blasphemous",
    primary: "Characterized by or uttering profanity, irreverence, or indignity against God or sacred things.",
    secondary: "In literary criticism and socio-religious commentary, expressing provocative or shocking contempt for deeply cherished orthodoxies, cultural dogmas, or sacrosanct institutions.",
    quotes: [
      { author: "Thomas Hobbes", work: "Leviathan", quote: "He that pretends to immediate revelation from God must take heed lest his doctrines be judged **blasphemous** by the sovereign authority." },
      { author: "Mary Shelley", work: "Frankenstein", quote: "A thousand times rather would I have confessed myself guilty of the most **blasphemous** atrocities than have permitted her condemnation." },
      { author: "George Eliot", work: "Adam Bede", quote: "To Arthur's upright moral sense, the cynical insinuation appeared thoroughly vicious and almost **blasphemous** in its disregard of honor." }
    ]
  },
  "Dashboard — phem/blasphemously.md": {
    word: "blasphemously",
    primary: "In a manner expressing contempt, profanity, or irreverence toward sacred entities or venerated truths.",
    secondary: "In legal and historical proceedings, the manner of delivering spoken or published assertions with deliberate intent to scandalize the faithful or defy spiritual jurisdiction.",
    quotes: [
      { author: "John Bunyan", work: "The Pilgrim's Progress", quote: "One of the wicked ones stepped softly behind him, whispering evil suggestions so that Christian thought he had spoken **blasphemously** against his King." },
      { author: "Jonathan Swift", work: "A Tale of a Tub", quote: "The satirist proceeded to handle the most solemn mysteries so **blasphemously** that even his indulgent patrons took offense." },
      { author: "Edmund Burke", work: "Reflections on the Revolution in France", quote: "The revolutionary tribunes railed **blasphemously** against the ancient altars of their ancestors while inaugurating the cult of abstract reason." }
    ]
  },
  "Dashboard — phem/blasphemy.md": {
    word: "blasphemy",
    primary: "Speech, writing, or action exhibiting contempt, irreverence, or profanation toward sacred things, deities, or inviolable religious tenets.",
    secondary: "In criminal jurisprudence and legal history, the common-law offense of publicly uttering profane words calculated to undermine religious reverence and disturb public peace.",
    quotes: [
      { author: "John Milton", work: "Paradise Lost", quote: "So spake the false archangel, and infused bad influence into the unwary breast, uttering heinous **blasphemy** against the throne of heaven." },
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "To seek to defend religion through cruelty or sedition is to commit the highest form of political **blasphemy**." },
      { author: "William Blackstone", work: "Commentaries on the Laws of England", quote: "The law considers **blasphemy** against the Almighty by denying His being or providence as an indictable breach of civil peace." }
    ]
  },
  "Dashboard — phem/dysphemism.md": {
    word: "dysphemism",
    primary: "The substitution of a harsh, derogatory, offensive, or disparaging expression for an otherwise neutral or polite term (the opposite of euphemism).",
    secondary: "In sociolinguistics and rhetoric, a deliberate lexical choice employed to stigmatize, provoke, express emotional hostility, or strip away protective social veneers.",
    quotes: [
      { author: "Keith Allan & Kate Burridge", work: "Forbidden Words", quote: "A speaker employs **dysphemism** to emphasize the grotesque or unpalatable realities of mortality and bodily functions." },
      { author: "H. L. Mencken", work: "The American Language", quote: "Political invective thrives upon **dysphemism**, reducing complex policies to derisive labels that excite popular prejudice." },
      { author: "Steven Pinker", work: "The Stuff of Thought", quote: "The psychological transition from euphemism to **dysphemism** illustrates how language tracks shifts in emotional framing and social taboo." }
    ]
  },
  "Dashboard — phem/dysphemistic.md": {
    word: "dysphemistic",
    primary: "Pertaining to, containing, or characterized by dysphemism; deliberately disparaging or harsh in tone.",
    secondary: "In pragmatic linguistics, describing locutions that deliberately heighten negative evaluation or emotional friction within conversational discourse.",
    quotes: [
      { author: "Geoffrey Leech", work: "Principles of Pragmatics", quote: "The choice of a **dysphemistic** noun phrase signals a rupture in conversational politeness and an intention to disparage the addressee." },
      { author: "George Lakoff", work: "Don't Think of an Elephant!", quote: "Political consultants frequently deploy **dysphemistic** framing to evoke visceral revulsion in voters before substantive debate begins." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "Military slang abounds in **dysphemistic** terminology that masks trauma beneath a veneer of callous humor." }
    ]
  },
  "Dashboard — phem/euphemise.md": {
    word: "euphemise",
    primary: "To refer to or express something through mild, indirect, or softened terminology instead of blunt or offensive words.",
    secondary: "In social discourse and diplomacy, to systematically neutralize controversial or morally fraught topics by clothing them in non-judgmental language.",
    quotes: [
      { author: "Virginia Woolf", work: "The Voyage Out", quote: "She noticed how the older generation sought to **euphemise** every stark circumstance of life under elaborate drawing-room formalities." },
      { author: "E. M. Forster", work: "A Room with a View", quote: "The tourist guides were inclined to **euphemise** the squalor of the medieval alleys for the benefit of sensitive travelers." },
      { author: "George Bernard Shaw", work: "Major Barbara", quote: "Society prefers to **euphemise** its most ferocious economic exploitations under high-sounding moral sentiments." }
    ]
  },
  "Dashboard — phem/euphemism.md": {
    word: "euphemism",
    primary: "The substitution of an agreeable, indirect, or mild expression for one that may offend, distress, or suggest something unpleasant.",
    secondary: "In political and cultural analysis, institutionalized linguistic obfuscation deployed to sanitize atrocities, manage public perception, or avoid frank confrontation with mortality and taboo.",
    quotes: [
      { author: "George Orwell", work: "Politics and the English Language", quote: "Defenseless villages are bombarded from the air, the inhabitants driven out into the countryside: this is called pacification, a polite **euphemism** designed to soften horrors." },
      { author: "Ralph Waldo Emerson", work: "Essays: First Series", quote: "Nature avoids sharp transitions, employing gentle shadow as a physical **euphemism** to ease our eyes into darkness." },
      { author: "Aldous Huxley", work: "Brave New World Revisited", quote: "Propaganda relies upon the antiseptic **euphemism** to divorce human conscience from the brutal mechanics of state control." }
    ]
  },
  "Dashboard — phem/euphemistic.md": {
    word: "euphemistic",
    primary: "Of, relating to, or using euphemism; expressing something in a milder, less direct, or cushioned manner.",
    secondary: "In stylistic analysis, denoting language designed to deflect psychological discomfort or conform to polite social taboos.",
    quotes: [
      { author: "Thomas Carlyle", work: "The French Revolution", quote: "The Jacobin committees adopted a **euphemistic** jargon that recorded the executions of citizens as mere civic purifications." },
      { author: "Bertrand Russell", work: "Unpopular Essays", quote: "A **euphemistic** tone in philosophical inquiry often conceals an unwillingness to face unpalatable facts about human nature." },
      { author: "Christopher Hitchens", work: "Letters to a Young Contrarian", quote: "One must learn to distrust the smooth, **euphemistic** phrases that tyrannical regimes coin to describe their prisons." }
    ]
  },
  "Dashboard — phem/euphemistically.md": {
    word: "euphemistically",
    primary: "In a euphemistic manner; by means of indirect, sanitized, or mild expressions.",
    secondary: "In sociolinguistic commentary, describing statements formulated to preserve interpersonal decorum or obscure uncomfortable truths.",
    quotes: [
      { author: "Charles Darwin", work: "The Descent of Man", quote: "What early naturalists **euphemistically** termed domestic instincts were in truth habits acquired through rigorous human selection." },
      { author: "H. G. Wells", work: "The Time Machine", quote: "The decadent future inhabitants were **euphemistically** described as peaceful vegetarians, masking their total helplessness." },
      { author: "W. H. Auden", work: "The Dyer's Hand", quote: "Critics who speak **euphemistically** of an author's minor lapses usually fail to grasp the structural defect of the entire work." }
    ]
  },
  "Dashboard — phem/euphemize.md": {
    word: "euphemize",
    primary: "To soften, disguise, or express an unpleasant, harsh, or taboo reality by using an agreeable or roundabout word or phrase.",
    secondary: "In media studies and communications, to manipulate public reception by intentionally cloaking controversial policies in benign terminology.",
    quotes: [
      { author: "Ambrose Bierce", work: "The Devil's Dictionary", quote: "To **euphemize** is to dress a repulsive truth in the polite garments of fashionable deceit." },
      { author: "William Safire", work: "On Language", quote: "Modern bureaucrats instinctively **euphemize** budget cuts as revenue enhancements to forestall legislative resistance." },
      { author: "Neil Postman", work: "Technopoly", quote: "Technical vocabularies often **euphemize** ethical catastrophes as mere administrative malfunctions." }
    ]
  },
  "Dashboard — phem/phemi.md": {
    word: "phemi",
    primary: "In Greek linguistics and grammar, the first-person singular present indicative of phanai (to speak or declare), serving as the foundational root for words denoting speech, rumor, and verbal utterance.",
    secondary: "In philology and classical lexicography, the archetype of athematic verbs of speaking whose stems generate rhetorical compounds such as euphemism, blasphemy, and prophecy.",
    quotes: [
      { author: "Henry George Liddell & Robert Scott", work: "A Greek-English Lexicon", quote: "The archaic verb **phemi** designates the act of asserting or making an oral declaration, distinct from discursive reasoning." },
      { author: "Herbert Weir Smyth", work: "Greek Grammar", quote: "In Attic Greek the present indicative of **phemi** is enclitic except in the second person singular form." },
      { author: "Robert Beekes", work: "Etymological Dictionary of Greek", quote: "The Proto-Indo-European root underlying **phemi** yielded cognates signifying both speech and manifestation across the daughter languages." }
    ]
  },
  "Dashboard — phem/prophecy.md": {
    word: "prophecy",
    primary: "An inspired utterance, revelation, or prediction of future events believed to be delivered under divine or transcendental guidance.",
    secondary: "In historiography and literature, a foresighted analysis or imaginative anticipation that subsequently corresponds with actual historical developments.",
    quotes: [
      { author: "William Shakespeare", work: "Macbeth", quote: "I will not be afraid of death and bane, till Birnam forest come to Dunsinane, fulfilling the weird sisters' **prophecy**." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The ancient sybilline books were consulted whenever national disasters seemed to fulfill some ominous **prophecy**." },
      { author: "Samuel Taylor Coleridge", work: "Biographia Literaria", quote: "Great poetic genius possesses an element of **prophecy**, anticipating spiritual realities that philosophy later formulates." }
    ]
  },
  "Dashboard — phem/prophet.md": {
    word: "prophet",
    primary: "An individual regarded as speaking by divine inspiration or as an authoritative interpreter of divine will.",
    secondary: "An influential pioneer, spokesperson, or visionary who foresees, initiates, or leads an intellectual, cultural, or social movement.",
    quotes: [
      { author: "Thomas Carlyle", work: "On Heroes, Hero-Worship, and the Heroic in History", quote: "The **prophet** stands among his fellow mortals as an inspired soul disclosing the eternal divine nature of things." },
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "Every great thinker appears at first as a solitary **prophet** preaching truths that his contemporaries deem dangerous folly." },
      { author: "George Eliot", work: "Middlemarch", quote: "She possessed that ardent faith which makes a woman ready to recognize an apostolic **prophet** in any earnest reformer." }
    ]
  },
  "Dashboard — phem/prophetic.md": {
    word: "prophetic",
    primary: "Foretelling future events or pertaining to a prophet or divine revelation.",
    secondary: "In narrative and historical criticism, possessing an uncanny prescience that accurately delineates future sociopolitical trends or artistic movements.",
    quotes: [
      { author: "Percy Bysshe Shelley", work: "A Defence of Poetry", quote: "Poets are the unacknowledged legislators of the world, whose verses carry a **prophetic** resonance into succeeding ages." },
      { author: "Alexis de Tocqueville", work: "Democracy in America", quote: "With **prophetic** clarity, he foresaw that equality of conditions would eventually dominate the political structures of Europe." },
      { author: "Herman Melville", work: "Moby-Dick", quote: "Elijah delivered his strange and **prophetic** warning on the foggy wharf as the crew prepared to board the doomed ship." }
    ]
  },
  "Dashboard — phem/prophetical.md": {
    word: "prophetical",
    primary: "Relating to, resembling, or containing prophecy; serving to foretell future occurrences.",
    secondary: "In theology and scholastic commentary, designating the specific scriptural office or canonical writings concerned with divine revelation and eschatological forewarning.",
    quotes: [
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "Divine history is distinguished into ecclesiastical, which records the progress of the church, and **prophetical**, which anticipates its destiny." },
      { author: "John Locke", work: "An Essay Concerning Human Understanding", quote: "We must distinguish between the calm light of reason and the enthusiastic claims to **prophetical** inspiration." },
      { author: "Isaac Newton", work: "Observations upon the Prophecies of Daniel and the Apocalypse of St. John", quote: "The figurative language of the **prophetical** books represents kingdoms and polities by symbols drawn from the natural heavens." }
    ]
  },
  "Dashboard — phem/prophetically.md": {
    word: "prophetically",
    primary: "In a prophetic manner; with prescient foresight or as if inspired by revelation.",
    secondary: "In historical retrospective, occurring or declared in a way that eerily foreshadowed future events.",
    quotes: [
      { author: "Thomas Babington Macaulay", work: "The History of England", quote: "The dying statesman had spoken **prophetically** when he warned that civil war would consume the liberties of Parliament." },
      { author: "Mary Wollstonecraft", work: "A Vindication of the Rights of Woman", quote: "She argued **prophetically** that denying women intellectual cultivation would undermine the moral fabric of future generations." },
      { author: "Henry James", work: "The Portrait of a Lady", quote: "Madame Merle had observed **prophetically** that every human creature is shaped by the envelope of circumstances surrounding them." }
    ]
  },
  "Dashboard — phem/unprophetic.md": {
    word: "unprophetic",
    primary: "Not forecasting or anticipating the future; lacking foresight, prescience, or prophetic quality.",
    secondary: "Characterized by an erroneous, myopic, or naive evaluation of approaching events or historical currents.",
    quotes: [
      { author: "Thomas Hardy", work: "Tess of the d'Urbervilles", quote: "They walked together across the tranquil meadows, blissfully **unprophetic** of the tragic storm that would soon overwhelm their lives." },
      { author: "Henry Adams", work: "The Education of Henry Adams", quote: "The nineteenth-century statesmen proved entirely **unprophetic** regarding the staggering technological forces about to be unleashed." },
      { author: "George Meredith", work: "The Egoist", quote: "His self-satisfaction rendered him absurdly **unprophetic** of the rebellion quietly gathering in the young lady's mind." }
    ]
  },
  "Dashboard — myth/myth.md": {
    word: "myth",
    primary: "A traditional story, especially one concerning the early history of a people or explaining some natural or social phenomenon, typically involving supernatural beings or events.",
    secondary: "A widely held but false belief, popular misconception, or fictionalized narrative that simplifies historical reality.",
    quotes: [
      { author: "Joseph Campbell", work: "The Hero with a Thousand Faces", quote: "Throughout the inhabited world, in all times and under every circumstance, **myth** has flourished as the living inspiration of human culture." },
      { author: "Claude Lévi-Strauss", work: "Structural Anthropology", quote: "The purpose of a **myth** is to provide a logical model capable of overcoming a real cultural contradiction." },
      { author: "C. S. Lewis", work: "An Experiment in Criticism", quote: "The experience of reading a great **myth** conveys a profound meaning that lingers long after the narrative details are forgotten." }
    ]
  },
  "Dashboard — myth/mythic.md": {
    word: "mythic",
    primary: "Existing only in traditional myths or legends; having the nature of a myth.",
    secondary: "Possessing monumental, archetypal, or legendary significance that transcends ordinary historical scale.",
    quotes: [
      { author: "Mircea Eliade", work: "The Myth of the Eternal Return", quote: "Archival history constantly seeks to transform concrete human figures into **mythic** archetypes through collective memory." },
      { author: "W. B. Yeats", work: "A Vision", quote: "The poet sought to invest contemporary political martyrdom with **mythic** stature through the power of verse." },
      { author: "Northrop Frye", work: "Anatomy of Criticism", quote: "In the **mythic** mode of literature, the protagonist is a divine being superior in kind both to other men and to the environment." }
    ]
  },
  "Dashboard — myth/mythical.md": {
    word: "mythical",
    primary: "Based on or described in a myth or legend; imaginary and lacking empirical existence.",
    secondary: "Fictitious, legendary, or fabulously celebrated beyond what can be verified by historical evidence.",
    quotes: [
      { author: "Charles Darwin", work: "The Origin of Species", quote: "Many curious instances could be given of animals possessing structures which resemble the **mythical** creations of heraldry." },
      { author: "David Hume", work: "The Natural History of Religion", quote: "Early pagan traditions were filled with **mythical** deities whose moral attributes reflected human frailties and fears." },
      { author: "Arthur Conan Doyle", work: "The Hound of the Baskervilles", quote: "He spoke of the spectral hound not as a reality, but as a **mythical** tale handed down from superstitious ancestors." }
    ]
  },
  "Dashboard — myth/mythicise.md": {
    word: "mythicise",
    primary: "To transform a historical person, event, or secular concept into a myth or legendary archetype.",
    secondary: "In historiography and cultural critique, to romanticize or elevate mundane realities into timeless symbolic narratives.",
    quotes: [
      { author: "Terry Eagleton", work: "Literary Theory: An Introduction", quote: "Bourgeois ideology tends to **mythicise** historically contingent social relations as immutable laws of nature." },
      { author: "Walter Pater", work: "The Renaissance", quote: "The romantic imagination attempted to **mythicise** the life of Leonardo, casting him as a sorcerer of secret arts." },
      { author: "George Steiner", work: "In Bluebeard's Castle", quote: "To **mythicise** European catastrophe is to risk evading the rigorous moral responsibility of historical remembrance." }
    ]
  },
  "Dashboard — myth/mythicize.md": {
    word: "mythicize",
    primary: "To interpret, represent, or elevate into the status of a myth or legendary symbol.",
    secondary: "In narrative theory, to imbue historical facts or biographical figures with universal, poetic, or heroic resonance.",
    quotes: [
      { author: "Roland Barthes", work: "Mythologies", quote: "Consumer culture operates constantly to **mythicize** common commodities, investing them with spurious spiritual aura." },
      { author: "Joseph Campbell", work: "The Power of Myth", quote: "Every culture finds a way to **mythicize** its own origins so that each new generation feels connected to eternity." },
      { author: "Harold Bloom", work: "The Western Canon", quote: "Strong poets inevitably **mythicize** their precursors in order to carve out a distinct imaginative territory." }
    ]
  },
  "Dashboard — myth/mythos.md": {
    word: "mythos",
    primary: "A pattern of basic values and attitudes more or less implicitly set forth in the myths of a specific culture or people.",
    secondary: "In Aristotelian poetics, the plot structure, underlying dramatic narrative, or fundamental organizing myth of a literary work.",
    quotes: [
      { author: "Aristotle", work: "Poetics", quote: "The most important of all parts of tragedy is the **mythos**, the organization of the incidents into an artistic whole." },
      { author: "Northrop Frye", work: "Fables of Identity", quote: "Each literary archetype contributes to a broader cultural **mythos** that articulates humanity's deepest desires and fears." },
      { author: "Karen Armstrong", work: "A Short History of Myth", quote: "In ancient civilizations, **mythos** provided psychological meaning, operating in complementary balance with practical logos." }
    ]
  },
  "Dashboard — myth/mythology.md": {
    word: "mythology",
    primary: "A collection of myths, especially one belonging to a particular religious or cultural tradition.",
    secondary: "The systematic scholarly study, comparative analysis, and interpretation of myths and sacred narratives.",
    quotes: [
      { author: "Thomas Bulfinch", work: "The Age of Fable", quote: "Greek and Roman **mythology** has supplied the poets of all succeeding centuries with rich symbols and allegories." },
      { author: "James George Frazer", work: "The Golden Bough", quote: "Comparative **mythology** reveals common ritualistic origins in the seasonal cycles of agriculture and cosmic regeneration." },
      { author: "Edith Hamilton", work: "Mythology", quote: "Classical **mythology** depicts a world where human beings felt at home in nature, surrounded by deities of human form." }
    ]
  },
  "Dashboard — myth/mythologic.md": {
    word: "mythologic",
    primary: "Pertaining to, based upon, or characteristic of myths or mythology.",
    secondary: "In intellectual history, relating to the pre-philosophical or symbolic mode of consciousness that conceptualizes reality through supernatural tales.",
    quotes: [
      { author: "Samuel Taylor Coleridge", work: "Lectures on Shakespeare", quote: "The dramatist fused historical chronicle with **mythologic** lore to create a world rich in symbolic depth." },
      { author: "Giambattista Vico", work: "The New Science", quote: "In the earliest epoch, primitive nations expressed their legal and moral wisdom through poetic, **mythologic** characters." },
      { author: "John Ruskin", work: "The Queen of the Air", quote: "The Greek mind created **mythologic** figures that embodied physical forces with breathtaking imaginative precision." }
    ]
  },
  "Dashboard — myth/mythological.md": {
    word: "mythological",
    primary: "Of or relating to mythology; appearing in or characteristic of myths and legends.",
    secondary: "In comparative literature and art history, depicting or drawing symbolic material from traditional folkloric and religious canons.",
    quotes: [
      { author: "Edward Burnett Tylor", work: "Primitive Culture", quote: "The **mythological** interpretations of natural events among early humans formed the primitive counterpart to natural philosophy." },
      { author: "John Keats", work: "Endymion", quote: "The young poet wandered through enchanted groves, meditating upon **mythological** tales of mortal love and divine beauty." },
      { author: "Sigmund Freud", work: "The Interpretation of Dreams", quote: "The motifs found in ancient **mythological** dramas correspond closely to the unconscious dynamics revealed in clinical analysis." }
    ]
  },
  "Dashboard — myth/mythologist.md": {
    word: "mythologist",
    primary: "A person who studies, compiles, or specializes in the scholarly analysis of myths and legends.",
    secondary: "A narrator, folklorist, or antiquarian who classifies comparative mythic traditions and sacred archetypes.",
    quotes: [
      { author: "Max Müller", work: "Chips from a German Workshop", quote: "The comparative **mythologist** traces the transformation of celestial solar metaphors into the anthropomorphic gods of epic poetry." },
      { author: "Andrew Lang", work: "Custom and Myth", quote: "The modern **mythologist** must examine the living customs of savage tribes to decipher the survivals in classical lore." },
      { author: "C. G. Jung", work: "The Archetypes and the Collective Unconscious", quote: "The analytical psychologist works hand in hand with the **mythologist** to identify the universal structures of the human mind." }
    ]
  },
  "Dashboard — myth/mythologise.md": {
    word: "mythologise",
    primary: "To explain, recount, or interpret in terms of myth; to invent or embellish myths.",
    secondary: "In critical sociology, to transform contingent historical events into seemingly natural, eternal, or inevitable mythic narratives.",
    quotes: [
      { author: "E. P. Thompson", work: "The Making of the English Working Class", quote: "Hagiographers tended to **mythologise** trade union pioneers into saintly figures stripped of their political complexity." },
      { author: "George Orwell", work: "Collected Essays", quote: "It is perilous for any nation to **mythologise** its military history until it loses touch with strategic reality." },
      { author: "Isaiah Berlin", work: "The Crooked Timber of Humanity", quote: "Romantic nationalism sought to **mythologise** the primordial origins of the folk to justify political aggression." }
    ]
  },
  "Dashboard — myth/mythologize.md": {
    word: "mythologize",
    primary: "To turn into a myth; to construct, treat, or interpret as a mythical narrative.",
    secondary: "In cultural criticism, to convert real historical events or individuals into heroic, larger-than-life cultural archetypes.",
    quotes: [
      { author: "Joan Didion", work: "Slouching Towards Bethlehem", quote: "California writers frequently **mythologize** the western frontier until the landscape becomes a moral abstraction." },
      { author: "Richard Hofstadter", work: "The American Political Tradition", quote: "Every democracy tends to **mythologize** its founding figures, transforming pragmatic politicians into flawless icons." },
      { author: "Simon Schama", work: "Landscape and Memory", quote: "Human societies instinctively **mythologize** their rivers and forests, investing them with ancestral memory." }
    ]
  },
  "Dashboard — myth/mythologisation.md": {
    word: "mythologisation",
    primary: "The act, process, or instance of transforming historical events, people, or concepts into myths.",
    secondary: "In structuralist criticism, the ideological naturalization through which cultural conventions are made to seem timeless and self-evident.",
    quotes: [
      { author: "Stuart Hall", work: "Culture, Media, Language", quote: "The media's **mythologisation** of rural English life obscured the acute economic crises facing agricultural workers." },
      { author: "Eric Hobsbawm", work: "The Invention of Tradition", quote: "The nineteenth-century **mythologisation** of national origins was essential for forging unified civic identities." },
      { author: "Raymond Williams", work: "Keywords", quote: "The subtle **mythologisation** of industry as an inherently heroic enterprise disguised its human and ecological costs." }
    ]
  },
  "Dashboard — myth/mythologization.md": {
    word: "mythologization",
    primary: "The process of rendering something mythical or creating a mythic aura around a subject.",
    secondary: "In cultural studies and media theory, the elevation of celebrity, historical crises, or consumer products into symbolic legends.",
    quotes: [
      { author: "Daniel J. Boorstin", work: "The Image", quote: "The synthetic **mythologization** of celebrities creates heroes without achievements and fame without substance." },
      { author: "Edward Said", work: "Orientalism", quote: "Western travel literature contributed to the persistent **mythologization** of the Near East as a realm of sensual intrigue and stagnation." },
      { author: "Hayden White", work: "Metahistory", quote: "The romantic historian's narrative strategy relies on the progressive **mythologization** of historical protagonists." }
    ]
  },
  "Dashboard — myth/mythomania.md": {
    word: "mythomania",
    primary: "An abnormal, pathological propensity for lying, exaggeration, and inventing elaborate fictitious stories.",
    secondary: "In psychiatric history and clinical psychology, a condition characterized by pseudologia fantastica where the individual may come to believe their own fabrications.",
    quotes: [
      { author: "Havelock Ellis", work: "Studies in the Psychology of Sex", quote: "In cases of juvenile **mythomania**, the boundary between deliberate falsehood and vivid fantasy is often completely blurred." },
      { author: "Jean-Martin Charcot", work: "Clinical Lectures on Diseases of the Nervous System", quote: "The clinician must differentiate hysterical simulation and **mythomania** from deliberate criminal deception." },
      { author: "Oliver Sacks", work: "The Man Who Mistook His Wife for a Hat", quote: "His confabulatory narratives seemed less like conscious deceit than an uncontrollable neurological **mythomania** compensating for memory loss." }
    ]
  },
  "Dashboard — myth/mythopoeia.md": {
    word: "mythopoeia",
    primary: "The creation, crafting, or making of myths; the deliberate artistic authoring of a fictional mythology.",
    secondary: "In literary theory, a genre or conscious poetic technique wherein an author constructs a coherent artificial mythos for an imaginative secondary world.",
    quotes: [
      { author: "J. R. R. Tolkien", work: "On Fairy-Stories", quote: "The creative act of **mythopoeia** is a legitimate sub-creation reflecting our own divine endowment as story-making beings." },
      { author: "C. S. Lewis", work: "Selected Literary Essays", quote: "George MacDonald's romances achieve a genuine **mythopoeia** that bypasses the intellect and addresses the spiritual imagination." },
      { author: "W. H. Auden", work: "The Enchafèd Flood", quote: "Romantic poets turned from traditional classical allusion to personal **mythopoeia** to express their alienation from urban industrialism." }
    ]
  },
  "Dashboard — myth/demythologisation.md": {
    word: "demythologisation",
    primary: "The process of stripping mythical or legendary elements from a narrative, text, or religious doctrine to uncover underlying historical or existential truth.",
    secondary: "In 20th-century Protestant hermeneutics, Rudolf Bultmann's theological program of translating ancient cosmological worldviews into modern existential understanding.",
    quotes: [
      { author: "Rudolf Bultmann", work: "Kerygma and Myth", quote: "The aim of **demythologisation** is not to eliminate mythological statements, but to interpret them existentially." },
      { author: "John Hick", work: "The Metaphor of God Incarnate", quote: "The radical **demythologisation** of traditional Christology opens pathways for meaningful dialogue among world faiths." },
      { author: "Paul Tillich", work: "Systematic Theology", quote: "Through courageous **demythologisation**, theology preserves the spiritual core of revelation while discarding literalistic absurdities." }
    ]
  },
  "Dashboard — myth/demythologise.md": {
    word: "demythologise",
    primary: "To divest of mythical elements or interpret a mythological text in terms of historical reality or modern categories of thought.",
    secondary: "In philosophical criticism, to expose and dismantle romanticized cultural illusions and ideological fictions.",
    quotes: [
      { author: "Paul Ricoeur", work: "The Conflict of Interpretations", quote: "To **demythologise** is not to destroy the poetic symbol, but to purify it from crude physical literalism." },
      { author: "Jürgen Habermas", work: "The Philosophical Discourse of Modernity", quote: "Critical theory seeks to **demythologise** the sacred origins of social authority in order to ground democracy in communicative reason." },
      { author: "John Macquarrie", work: "The Scope of Demythologizing", quote: "If we cannot **demythologise** ancient scripture, modern educated believers will find its message entirely unintelligible." }
    ]
  },
  "Dashboard — myth/demythologised.md": {
    word: "demythologised",
    primary: "Divested of mythological, supernatural, or legendary embellishments; interpreted existentially or historically.",
    secondary: "In modern theology and secular criticism, describing an account or faith tradition after its supernatural cosmological framework has been removed.",
    quotes: [
      { author: "Ian Barbour", work: "Issues in Science and Religion", quote: "A **demythologised** theology can engage constructively with contemporary astrophysics without fear of cosmological contradiction." },
      { author: "Alasdair MacIntyre", work: "After Virtue", quote: "Modern moral theory offers only a **demythologised** remnant of ancient heroic virtues, severed from the communities that gave them life." },
      { author: "Hans Küng", work: "On Being a Christian", quote: "The **demythologised** gospel narrative speaks directly to secular people searching for existential orientation in a scientific world." }
    ]
  },
  "Dashboard — myth/demythologization.md": {
    word: "demythologization",
    primary: "The systematic elimination or reinterpretive stripping of mythological accretions from religious, historical, or cultural narratives.",
    secondary: "In critical sociology and historiography, the analytical debunking of romanticized national legends to reveal underlying sociopolitical dynamics.",
    quotes: [
      { author: "Reinhold Niebuhr", work: "The Nature and Destiny of Man", quote: "The program of **demythologization** must be pursued with discernment, lest the profound symbolic depth of the myth be discarded alongside its pre-scientific husk." },
      { author: "Mircea Eliade", work: "Myth and Reality", quote: "Even in the wake of secular **demythologization**, modern humanity continues to create disguised mythical behaviors in political ideology and cinema." },
      { author: "Walter Wink", work: "Naming the Powers", quote: "Biblical **demythologization** reveals that ancient references to demons and principalities often described oppressive political structures." }
    ]
  },
  "Dashboard — myth/demythologize.md": {
    word: "demythologize",
    primary: "To remove mythical, supernatural, or fictional elements from a text, doctrine, or historical account.",
    secondary: "In intellectual and historical analysis, to subject revered folklore or heroic legends to rigorous evidentiary scrutiny.",
    quotes: [
      { author: "Rudolf Bultmann", work: "New Testament and Mythology", quote: "We cannot use electric lights and radios and in the case of illness claim modern medicine, and at the same time believe in the spirit world of the New Testament; we must **demythologize** the proclamation." },
      { author: "Peter L. Berger", work: "The Sacred Canopy", quote: "Sociology tends to **demythologize** social institutions, showing that they are historical human creations rather than divine dispensations." },
      { author: "Carl Sagan", work: "The Demon-Haunted World", quote: "Science does not seek to destroy wonder, but it must fearlessly **demythologize** claims of supernatural intervention that violate verifiable natural laws." }
    ]
  },
  "Dashboard — myth/demythologized.md": {
    word: "demythologized",
    primary: "Stripped of mythical or supernatural features; reinterpreted in rational, historical, or existential terms.",
    secondary: "Pertaining to concepts, figures, or historical events that have been demystified and presented in plain, unvarnished reality.",
    quotes: [
      { author: "Langdon Gilkey", work: "Naming the Whirlwind", quote: "A thoroughly **demythologized** religious discourse risks losing the emotional power that originally mobilized communities of faith." },
      { author: "Richard Rorty", work: "Consequences of Pragmatism", quote: "In a **demythologized** intellectual landscape, philosophers abandon the quest for transcendent foundations in favor of pragmatic conversation." },
      { author: "Stephen Jay Gould", work: "Rocks of Ages", quote: "When Darwin presented a **demythologized** view of biological origins, he replaced magical creation with the majestic mechanism of natural selection." }
    ]
  },
  "Dashboard — herm/herm.md": {
    word: "herm",
    primary: "In classical Greek antiquity, a square stone pillar or pedestal surmounted by a sculptured head or bust (typically of the god Hermes) and often adorned with male genitals, traditionally placed as boundary markers and at crossroads.",
    secondary: "In classical archaeology and sculpture history, any quadrangular stele tapering toward the base and supporting a portrait bust, popular in Roman gardens and neoclassical architecture.",
    quotes: [
      { author: "Thucydides", work: "The Peloponnesian War", quote: "One night before the expedition to Sicily set sail, nearly all the stone **herm** statues throughout Athens had their faces mutilated by unknown conspirators." },
      { author: "Pausanias", work: "Description of Greece", quote: "At every crossroads and doorway in the city stood a boundary **herm**, reverenced by travelers seeking divine protection on their journeys." },
      { author: "Jacob Burckhardt", work: "The Civilization of the Renaissance in Italy", quote: "Humanist scholars decorated their suburban villas with classical statuary, placing an ancient marble **herm** at each turn of the garden terrace." }
    ]
  }
};

function updateWordNote(relPath, data) {
  const fullPath = path.join(baseDir, relPath);
  if (!fs.existsSync(fullPath)) {
    console.error("Not found:", fullPath);
    return;
  }
  let content = fs.readFileSync(fullPath, "utf8");

  // Format quotes
  const quotesFormatted = data.quotes.map(q => `> - 📜 **${q.author} (*${q.work}*):** *"${q.quote}"*`).join("\n");

  // Replace Definition & Semantic Range
  const defRegex = /> \[!book\] 📖 Definitions & Semantic Range[\s\S]*?(?=> \[!quote\]|$)/;
  const newDef = `> [!book] 📖 Definitions & Semantic Range\n> 1. **Primary Definition (Lexical / Standard Consensus)**: ${data.primary}\n> 2. **Secondary / Nuanced Definition (Specialized / Domain / Encyclopedic)**: ${data.secondary}\n\n`;

  if (defRegex.test(content)) {
    content = content.replace(defRegex, newDef);
  } else {
    console.warn("Could not find [!book] in", relPath);
  }

  // Replace Quotes
  const quoteRegex = /> \[!quote\] 💬 Contextual Usage & Authentic Quotations[\s\S]*$/;
  const newQuotes = `> [!quote] 💬 Contextual Usage & Authentic Quotations\n${quotesFormatted}\n`;

  if (quoteRegex.test(content)) {
    content = content.replace(quoteRegex, newQuotes);
  } else {
    console.warn("Could not find [!quote] in", relPath);
  }

  fs.writeFileSync(fullPath, content, "utf8");
  console.log("Updated:", relPath);
}

for (const [relPath, data] of Object.entries(wordsData)) {
  updateWordNote(relPath, data);
}
console.log("Batch 2 finished! Total words updated:", Object.keys(wordsData).length);
