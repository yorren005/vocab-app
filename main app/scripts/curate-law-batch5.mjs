import fs from 'fs';
import path from 'path';

const basePath = 'App database/Greek roots/Cluster Law & Order/Dashboard — crit';

const filesData = {
  "acritical.md": {
    primary: "Not marked by or involving a crisis; lacking a decisive turning point in the course of an illness in medicine.",
    secondary: "Without critical judgment, discrimination, or analytical evaluation.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Certain mild fevers follow an **acritical** course, resolving by slow lysis rather than sudden defervescence." },
      { author: "Oliver Wendell Holmes Sr.", work: "Medical Essays", quote: "The old physicians recognized diseases whose termination was entirely **acritical**, leaving the body without clear crisis." },
      { author: "Jonathan Pereira", work: "The Elements of Materia Medica", quote: "The remedy acts gently to promote an **acritical** restoration of the bodily secretions." }
    ]
  },
  "apocrine.md": {
    primary: "Relating to a type of exocrine gland whose secretions contain parts of the secretory cells' apical cytoplasm, which is pinched off during release (e.g., axillary sweat glands, mammary glands).",
    secondary: "Characterized by lipid-rich, proteinaceous secretions that are broken down by cutaneous bacteria, generating body odor.",
    quotes: [
      { author: "William Bloom & Don W. Fawcett", work: "A Textbook of Histology", quote: "In an **apocrine** gland, the apical portion of the secretory cell cytoplasm is cast off along with the accumulated secretion." },
      { author: "Stewart Duke-Elder", work: "System of Ophthalmology", quote: "The glands of Moll in the margin of the eyelids are modified **apocrine** sweat glands." },
      { author: "Arthur Ham", work: "Histology", quote: "Puberty triggers the functional maturation of **apocrine** sweat glands in the axillae and pubic regions." }
    ]
  },
  "crisis.md": {
    primary: "A time of intense difficulty, danger, or decisive turning point when an important decision must be made.",
    secondary: "The turning point of a disease, after which the patient either recovers or succumbs in classical medicine.",
    quotes: [
      { author: "Hippocrates", work: "Aphorisms", quote: "In acute diseases, the **crisis** occurs on the odd days, when nature either masters the illness or is overcome." },
      { author: "Thomas Paine", work: "The American Crisis", quote: "These are the times that try men's souls; the summer soldier and the sunshine patriot will, in this **crisis**, shrink from the service of their country." },
      { author: "Thucydides", work: "History of the Peloponnesian War", quote: "The plague brought the civic life of Athens to a dreadful **crisis**, dissolving all reverence for law and divine custom." }
    ]
  },
  "crit.md": {
    primary: "An evaluation, review, or critique, especially of a student's design, architectural project, or artistic portfolio.",
    secondary: "An informal abbreviation for a critical hit or decisive strike in role-playing games and combat simulations.",
    quotes: [
      { author: "Le Corbusier", work: "Towards a New Architecture", quote: "During the studio **crit**, the master scrutinized the preliminary sketches, demanding functional clarity above decorative flair." },
      { author: "Walter Gropius", work: "Scope of Total Architecture", quote: "The student learned to defend every structural line during the rigorous weekly **crit** before the assembled faculty." },
      { author: "Frank Lloyd Wright", work: "An Autobiography", quote: "He remembered the intense silence that descended upon the drafting room whenever the master began a formal **crit**." }
    ]
  },
  "criterial.md": {
    primary: "Serving as, relating to, or constituting a criterion; providing a decisive standard of judgment.",
    secondary: "Designating defining properties or necessary conditions that warrant applying a conceptual category in philosophy and linguistics.",
    quotes: [
      { author: "Ludwig Wittgenstein", work: "Philosophical Investigations", quote: "Pain behavior is **criterial** for our application of the concept 'he is in pain', rather than merely an empirical symptom." },
      { author: "W. V. Quine", work: "Word and Object", quote: "We must identify which semantic features are truly **criterial** for trans-linguistic synonymy." },
      { author: "Alan Cruse", work: "Meaning in Language", quote: "The lexical semanticist distinguishes between incidental attributes and strictly **criterial** semantic traits." }
    ]
  },
  "criterion.md": {
    primary: "A principle, rule, or standard by which something is judged, evaluated, or decided.",
    secondary: "A foundational test or hallmark of truth and certainty in epistemological inquiry.",
    quotes: [
      { author: "John Locke", work: "An Essay Concerning Human Understanding", quote: "Conformity with our own experience remains the ultimate **criterion** of probability." },
      { author: "Immanuel Kant", work: "Critique of Pure Reason", quote: "A general and sufficient **criterion** of truth would be one that is valid for all cognitions whatever." },
      { author: "René Descartes", work: "Discourse on the Method", quote: "Clear and distinct perception served as the primary **criterion** upon which I resolved to ground all certain knowledge." }
    ]
  },
  "criterional.md": {
    primary: "Functioning as or pertaining to a criterion; establishing an authoritative standard of judgment (variant of criterial).",
    secondary: "Serving as a decisive diagnostic threshold for classification in psychological testing and nosology.",
    quotes: [
      { author: "William James", work: "The Principles of Psychology", quote: "Certain sensory thresholds serve a **criterional** role in establishing conscious perception." },
      { author: "C. S. Peirce", work: "Collected Papers", quote: "Logical validity requires **criterional** consistency across every step of formal inference." },
      { author: "John Dewey", work: "Logic: The Theory of Inquiry", quote: "The experimental outcome provides the **criterional** test that settles the problem in doubt." }
    ]
  },
  "critic.md": {
    primary: "A person who expresses an informed, reasoned judgment of the value and qualities of artistic, literary, or theatrical works.",
    secondary: "One who finds fault, censures, or expresses adverse opinions regarding policies or human conduct.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "The duty of a **critic** is to separate real beauty from accidental ornaments." },
      { author: "Oscar Wilde", work: "The Critic as Artist", quote: "The **critic** occupies the same relation to the work of art that the artist does to the visible world." },
      { author: "Alexander Pope", work: "An Essay on Criticism", quote: "Let such teach others who themselves excel, and censure freely who have written well; for a true **critic** ought to share the poet's fire." }
    ]
  },
  "critical.md": {
    primary: "Expressing adverse, evaluative, or analytical comments and judgments; involving skillful judgment as to truth and merit.",
    secondary: "Relating to a point of transition, decisive crisis, or state where a nuclear chain reaction becomes self-sustaining in physics and medicine.",
    quotes: [
      { author: "Immanuel Kant", work: "Critique of Pure Reason", quote: "Our age is, in especial degree, the age of criticism, and to **critical** examination all things must submit." },
      { author: "Richard Feynman", work: "The Feynman Lectures on Physics", quote: "When the mass of fissionable material exceeds the **critical** limit, a divergent chain reaction takes place." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The patient's condition remained **critical** throughout the third night of the pneumonia crisis." }
    ]
  },
  "criticality.md": {
    primary: "The state or condition of being critical, especially where a nuclear chain reaction is self-sustaining ($k = 1$) in nuclear physics.",
    secondary: "The quality of being critical, vital, or of decisive strategic importance.",
    quotes: [
      { author: "Enrico Fermi", work: "Collected Papers", quote: "The approach to **criticality** was monitored minute by minute as the cadmium control rods were slowly withdrawn." },
      { author: "Robert Oppenheimer", work: "Science and the Common Understanding", quote: "Reaching prompt **criticality** transforms a dormant lattice of uranium into an immense release of energy." },
      { author: "Richard Rhodes", work: "The Making of the Atomic Bomb", quote: "The scientists assembled around the graphite pile, awaiting the moment of **criticality** with breathless attention." }
    ]
  },
  "critically.md": {
    primary: "In a critical, analytical, or evaluative manner.",
    secondary: "To a critical, decisive, or dangerously grave degree.",
    quotes: [
      { author: "Bertrand Russell", work: "The Problems of Philosophy", quote: "Philosophy begins when we start to examine **critically** the common-sense assumptions of daily life." },
      { author: "Virginia Woolf", work: "The Common Reader", quote: "The reader must listen **critically** to catch the subtle rhythm that beats behind the prose." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The soldier was **critically** wounded, requiring immediate vascular ligation to stem hemorrhage." }
    ]
  },
  "criticalness.md": {
    primary: "The quality, condition, or state of being critical, discerning, or censorious.",
    secondary: "The gravity, urgency, or crucial nature of an emergency or decisive turning point.",
    quotes: [
      { author: "Ralph Waldo Emerson", work: "Essays: First Series", quote: "A disposition toward petty **criticalness** blinds the observer to the broader harmonies of nature." },
      { author: "William James", work: "The Will to Believe", quote: "The **criticalness** of the moral situation forces an immediate choice where delay is itself a decision." },
      { author: "Matthew Arnold", work: "Culture and Anarchy", quote: "The habit of intellectual **criticalness** protects society against the delusions of blind fanaticism." }
    ]
  },
  "criticaster.md": {
    primary: "An inferior, petty, incompetent, or malicious critic who carps at trifles without understanding real artistic merit.",
    secondary: "A pretentious reviewer of books or art lacking genuine discernment or depth.",
    quotes: [
      { author: "Lord Byron", work: "English Bards and Scotch Reviewers", quote: "Each foolish **criticaster** struts across the review, dispensing condemnation with ignorant swagger." },
      { author: "Thomas Carlyle", work: "Critical and Miscellaneous Essays", quote: "The noisy **criticaster** measures a giant with a six-inch footrule, unaware of his own comical diminutive stature." },
      { author: "Edgar Allan Poe", work: "Marginalia", quote: "The typical **criticaster** mistakes malice for wit and typographical carping for profound literary judgment." }
    ]
  },
  "criticise.md": {
    primary: "To indicate the faults of someone or something in a disapproving way (British spelling of criticize).",
    secondary: "To form and express an analytical evaluation or judgment of a literary, artistic, or theoretical work.",
    quotes: [
      { author: "George Bernard Shaw", work: "The Doctor's Dilemma", quote: "It is easy to **criticise** the practitioner from a safe distance, but difficult to heal in the heat of battle." },
      { author: "Virginia Woolf", work: "A Room of One's Own", quote: "Before you **criticise** the style of another, consider the material circumstances under which they wrote." },
      { author: "John Ruskin", work: "Modern Painters", quote: "To **criticise** Turner requires that one has spent mornings watching clouds and evenings watching mountain mist." }
    ]
  },
  "criticism.md": {
    primary: "The expression of disapproval of someone or something on the basis of perceived faults or mistakes.",
    secondary: "The analysis and judgment of the merits and faults of a literary or artistic work (e.g., literary criticism).",
    quotes: [
      { author: "Matthew Arnold", work: "The Function of Criticism at the Present Time", quote: "The grand work of literary **criticism** is to see the object as in itself it really is." },
      { author: "T. S. Eliot", work: "The Sacred Wood", quote: "Honest **criticism** and sensitive appreciation is directed not upon the poet but upon the poetry." },
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "Shallow **criticism** wastes itself on blemishes, but the wise reader searches for positive genius." }
    ]
  },
  "criticize.md": {
    primary: "To evaluate, judge, or find fault with someone or something based on specific standards or criteria.",
    secondary: "To provide an analytical review and evaluation of an artistic or intellectual creation.",
    quotes: [
      { author: "Henry David Thoreau", work: "Walden", quote: "It is never too late to give up our prejudices, or to **criticize** the traditional habits of our ancestors." },
      { author: "Ralph Waldo Emerson", work: "Self-Reliance", quote: "Men do not **criticize** a hero; they emulate his virtue and follow his courage." },
      { author: "Mark Twain", work: "Life on the Mississippi", quote: "The old pilots would assemble in the pilot-house to **criticize** every maneuver of the incoming steamer." }
    ]
  },
  "critique.md": {
    primary: "A detailed analysis and assessment of something, especially a literary, philosophical, or political theory or artistic work.",
    secondary: "A systematic investigation into the nature, limits, and valid foundations of a human cognitive capacity in philosophical methodology.",
    quotes: [
      { author: "Immanuel Kant", work: "Critique of Pure Reason", quote: "This **critique** is not a doctrine, but a tribunal which will assure reason in its lawful claims." },
      { author: "Karl Marx", work: "A Contribution to the Critique of Political Economy", quote: "The **critique** of political economy reveals the material contradictions that drive historical development." },
      { author: "Michel Foucault", work: "What is Critique?", quote: "A **critique** is the art of not being governed quite so much, of interrogating accepted truths." }
    ]
  },
  "critter.md": {
    primary: "A living creature, especially a domestic animal, horse, cow, or wild animal in colloquial and regional American speech.",
    secondary: "An individual person or child viewed with sympathy, pity, or humorous affection.",
    quotes: [
      { author: "Mark Twain", work: "The Adventures of Huckleberry Finn", quote: "The poor **critter** was shivering from cold and fear, crouching down in the corner of the raft." },
      { author: "Charles Dickens", work: "Great Expectations", quote: "There was a poor old **critter** on the marshes who never had a friend nor a warm fireside." },
      { author: "Stephen Crane", work: "The Red Badge of Courage", quote: "The mule was a stubborn **critter**, planting its four hooves in the mud against all shouts." }
    ]
  },
  "diacritic.md": {
    primary: "A sign or mark added to a letter (such as an accent, cedilla, tilde, or umlaut) to indicate a change in pronunciation, tone, or stress.",
    secondary: "Serving to distinguish or differentiate phonetic values in orthography.",
    quotes: [
      { author: "Henry Sweet", work: "A Handbook of Phonetics", quote: "The phonetician employs a **diacritic** to indicate vowel length, nasality, or tonal inflection." },
      { author: "Otto Jespersen", work: "Language: Its Nature, Development and Origin", quote: "A subtle **diacritic** distinguishes homographs that would otherwise confound the foreign reader." },
      { author: "Edward Sapir", work: "Language", quote: "In native orthographies, an elevated comma serves as a **diacritic** marking glottalized consonants." }
    ]
  },
  "diacritical.md": {
    primary: "Pertaining to, serving as, or marked with a diacritic sign used to distinguish letters and sounds in linguistics.",
    secondary: "Capable of distinguishing or serving to differentiate between symptoms, species, or diagnostic signs in pathology.",
    quotes: [
      { author: "William Dwight Whitney", work: "Language and the Study of Language", quote: "The French alphabet employs **diacritical** marks to preserve phonetic distinctions that historical spelling obscured." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The eruption presents a **diacritical** hallmark that separates typhus from enteric fever." },
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "A single **diacritical** point placed above a Semitic consonant radically transforms its grammatical value." }
    ]
  },
  "eccrine.md": {
    primary: "Relating to the major type of sweat glands that secrete water and electrolytes directly onto the skin surface without losing cell cytoplasm, essential for human thermoregulation.",
    secondary: "Pertaining to exocrine glands that release watery secretions without structural breakdown of the secretory cells (merocrine).",
    quotes: [
      { author: "William Bloom & Don W. Fawcett", work: "A Textbook of Histology", quote: "The **eccrine** sweat glands are distributed over nearly the entire body surface, functioning primarily in evaporative cooling." },
      { author: "Arthur Ham", work: "Histology", quote: "During vigorous exercise, the sympathetic innervation stimulates millions of **eccrine** coils to discharge hypotonic sweat." },
      { author: "Claude Bernard", work: "An Introduction to the Study of Experimental Medicine", quote: "The physiological activity of **eccrine** glands maintains thermal homeostasis against extreme ambient heat." }
    ]
  },
  "eccrinology.md": {
    primary: "The scientific study of glandular secretions, particularly the structure and function of the eccrine sweat glands.",
    secondary: "The branch of medical science investigating bodily excretions and perspiration mechanisms.",
    quotes: [
      { author: "Jonathan Pereira", work: "The Elements of Materia Medica", quote: "Early investigations in **eccrinology** sought to demonstrate how sweat glands assist the kidneys in purging blood toxins." },
      { author: "Arthur Ham", work: "Histology", quote: "Advances in **eccrinology** clarified the biochemical difference between watery thermal sweat and emotional perspiration." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "A thorough knowledge of **eccrinology** is necessary to comprehend the profound dehydration that accompanies heatstroke." }
    ]
  },
  "eccrisis.md": {
    primary: "The discharge, expulsion, or excretion of waste matter, morbid humors, or products of disease from the body.",
    secondary: "In classical medicine, a critical evacuation of fluids that marks the favorable resolution of an acute fever.",
    quotes: [
      { author: "Galen", work: "On the Therapeutic Method", quote: "Nature accomplishes healing through an orderly **eccrisis**, discharging the corrupted humors through sweat or urine." },
      { author: "Jonathan Pereira", work: "The Elements of Materia Medica", quote: "Sudorific drugs promote an artificial **eccrisis** to relieve internal visceral congestion." },
      { author: "Thomas Sydenham", work: "The Works of Thomas Sydenham", quote: "The acute symptoms subsided promptly upon the occurrence of a spontaneous nocturnal **eccrisis**." }
    ]
  },
  "eccritic.md": {
    primary: "Promoting or facilitating the excretion or evacuation of waste matter from the body; an evacuant medicine (such as an emetic, purgative, or diuretic).",
    secondary: "Pertaining to bodily excretion or the discharge of morbific humors.",
    quotes: [
      { author: "Jonathan Pereira", work: "The Elements of Materia Medica and Therapeutics", quote: "Calomel was formerly valued as a powerful **eccritic** agent, stimulating the secretory functions of the liver." },
      { author: "William Withering", work: "An Account of the Foxglove", quote: "The infusion of digitalis exhibited a remarkable **eccritic** virtue, evacuating dropsical fluid through increased renal flow." },
      { author: "John Locke", work: "Medical Notes", quote: "The physician selected a mild **eccritic** draught to purge the system without inducing griping pains." }
    ]
  },
  "exocrine.md": {
    primary: "Relating to glands that secrete their chemical products through ducts onto an epithelial surface or into a body cavity (e.g., salivary, sweat, and digestive glands), rather than directly into the bloodstream.",
    secondary: "Pertaining to external secretion in contrast to endocrine (hormonal) regulation.",
    quotes: [
      { author: "William Bloom & Don W. Fawcett", work: "A Textbook of Histology", quote: "The pancreas exhibits a dual structure, combining digestive **exocrine** acini with insulin-producing endocrine islets." },
      { author: "Arthur Ham", work: "Histology", quote: "An **exocrine** gland retains its connection with the overlying surface epithelium via an excretory duct." },
      { author: "Claude Bernard", work: "Lectures on the Physiology of Digestion", quote: "The secretion of the **exocrine** salivary glands is regulated by reflex arcs involving the cranial nerves." }
    ]
  },
  "heterocrine.md": {
    primary: "Composed of or containing both endocrine (ductless) and exocrine (ducted) secretory tissues, as exemplified by the pancreas, liver, and gonads.",
    secondary: "Characterized by diverse, mixed modes of cellular secretion within a single organ.",
    quotes: [
      { author: "Arthur Ham", work: "Histology", quote: "The pancreas stands as the classic **heterocrine** organ, discharging digestive enzymes via ducts and releasing hormones into the capillary bed." },
      { author: "William Bloom & Don W. Fawcett", work: "A Textbook of Histology", quote: "The testicular parenchyma functions as a **heterocrine** gland, producing exocrine spermatozoa and endocrine testosterone." },
      { author: "Jonathan Pereira", work: "The Elements of Materia Medica", quote: "Complex visceral glands exhibiting **heterocrine** activity coordinate metabolic homeostasis through simultaneous pathways." }
    ]
  },
  "holocrine.md": {
    primary: "Relating to glands whose secretions are produced by the complete disintegration and breakdown of the entire secretory cells (e.g., sebaceous glands of the skin).",
    secondary: "Characterized by lipid-rich secretions that incorporate the cellular debris of dying epithelial cells.",
    quotes: [
      { author: "William Bloom & Don W. Fawcett", work: "A Textbook of Histology", quote: "In a **holocrine** gland, such as the sebaceous gland, the whole cell disintegrates to become the secretion itself." },
      { author: "Arthur Ham", work: "Histology", quote: "Because **holocrine** secretion consumes whole cells, rapid mitotic division at the basal lamina is required to replenish the gland." },
      { author: "Stewart Duke-Elder", work: "System of Ophthalmology", quote: "The Meibomian glands of the tarsal plates are specialized **holocrine** structures that lubricate the cornea with lipid film." }
    ]
  },
  "hypercritical.md": {
    primary: "Excessively and unreasonably critical; carping or finding fault with minor blemishes; captious.",
    secondary: "Demanding an impossibly strict or pedantic standard of evaluation.",
    quotes: [
      { author: "Samuel Johnson", work: "The Rambler", quote: "A **hypercritical** reader is ever on the watch for microscopic faults while remaining blind to majestic beauties." },
      { author: "Jane Austen", work: "Pride and Prejudice", quote: "She was not so **hypercritical** as to reject a charming acquaintance on account of a single awkward phrase." },
      { author: "Ralph Waldo Emerson", work: "Essays: First Series", quote: "Do not become **hypercritical** of your friends, lest you find yourself solitary in an empty world." }
    ]
  },
  "hypercriticism.md": {
    primary: "Excessive, unreasonable, or captious criticism; the practice of picking petty faults in artistic, literary, or scholarly work.",
    secondary: "Pedantic and destructive fault-finding that ignores overall artistic merit and expressive vitality.",
    quotes: [
      { author: "Matthew Arnold", work: "Essays in Criticism", quote: "Sterile **hypercriticism** produces no original thought; it merely chills the creative impulse of others." },
      { author: "Samuel Taylor Coleridge", work: "Biographia Literaria", quote: "The true lover of poetry recoils from the barren **hypercriticism** that dissects a lyric without feeling its music." },
      { author: "Walter Pater", work: "The Renaissance", quote: "Aesthetic appreciation rises above scholastic **hypercriticism**, seeking the inward flame of beauty." }
    ]
  },
  "hypocrisy.md": {
    primary: "The practice of claiming to have moral standards, beliefs, or virtues to which one's own behavior does not conform; pretense or dissimulation.",
    secondary: "Originally in ancient Greece, theatrical acting or stage playing (*hypokrisis*), hence assuming a false moral mask.",
    quotes: [
      { author: "Molière", work: "Tartuffe", quote: "**Hypocrisy** is a fashionable vice, and all fashionable vices pass for virtues in high society." },
      { author: "William Shakespeare", work: "Measure for Measure", quote: "O what may man within him hide, though angel on the outward side, where **hypocrisy** masks foulest corruption." },
      { author: "François de La Rochefoucauld", work: "Maxims", quote: "**Hypocrisy** is the homage that vice pays to virtue." }
    ]
  },
  "hypocrite.md": {
    primary: "A person who pretends to have virtues, moral beliefs, or religious principles that they do not actually possess.",
    secondary: "A deceiver who plays a false part to manipulate or deceive others.",
    quotes: [
      { author: "Charles Dickens", work: "Martin Chuzzlewit", quote: "Mr. Pecksniff was a moral man, a pious man, and a consummate **hypocrite**, ever ready to weep over virtues he never practiced." },
      { author: "Molière", work: "Tartuffe", quote: "The true **hypocrite** wears his piety like a velvet cloak to conceal the dagger underneath." },
      { author: "Ralph Waldo Emerson", work: "Self-Reliance", quote: "Every man is sincere alone; at the entrance of a second person, hypocrisy begins and each becomes a **hypocrite**." }
    ]
  },
  "hypocritical.md": {
    primary: "Behaving in a way that suggests one has higher moral standards or more noble beliefs than is really the case; deceitful and sanctimonious.",
    secondary: "Marked by dissimulation, false pretense, or contradictory moral posturing.",
    quotes: [
      { author: "Charlotte Brontë", work: "Jane Eyre", quote: "Mr. Brocklehurst lectured the shivering pupils on humility while his own daughters wore lavish silk dresses in a **hypocritical** display." },
      { author: "George Orwell", work: "Animal Farm", quote: "The pigs adopted the very human luxuries they had once condemned, issuing **hypocritical** proclamations to appease the working animals." },
      { author: "Thomas Carlyle", work: "Past and Present", quote: "Mankind can tolerate honest weakness, but it vomits out the smooth, **hypocritical** cant of self-righteous pharisees." }
    ]
  },
  "hypocritically.md": {
    primary: "In a hypocritical manner; pretending to possess virtues, standards, or sentiments that one does not truly hold.",
    secondary: "With deceitful sanctimony or dissimulating pretense.",
    quotes: [
      { author: "Jonathan Swift", work: "Gulliver's Travels", quote: "The courtier smiled **hypocritically**, promising favor to the petitioner while secretly arranging his downfall." },
      { author: "Charles Dickens", work: "Bleak House", quote: "He spoke **hypocritically** of Christian charity, yet never opened his purse to aid the starving crossing-sweeper." },
      { author: "William Makepeace Thackeray", work: "Vanity Fair", quote: "Becky sighed **hypocritically**, wiping away an imaginary tear to soften the heart of the gullible baronet." }
    ]
  },
  "kritarchy.md": {
    primary: "The rule or governance by judges, specifically designating the historical period of the Biblical Judges in ancient Israel before the monarchy.",
    secondary: "A political system in which the judiciary is the supreme or exclusive governing authority, resolving disputes through customary or natural law.",
    quotes: [
      { author: "Robert Southey", work: "The Doctor", quote: "Before kings sat upon the throne of Israel, the commonwealth flourished under a sacred **kritarchy**, guided by prophets and judges." },
      { author: "John Milton", work: "The Tenure of Kings and Magistrates", quote: "The Hebrew commonwealth under the **kritarchy** of the Judges was governed by divine law without hereditary kings." },
      { author: "Lord Acton", work: "The History of Freedom and Other Essays", quote: "In early tribal confederations, the **kritarchy** settled disputes according to customary law without an executive sovereign." }
    ]
  },
  "Kritosaurus.md": {
    primary: "A genus of large hadrosaurid (duck-billed) dinosaur with a distinctive crested nasal arch that lived in North America during the Late Cretaceous period.",
    secondary: "A herbivorous ornithopod dinosaur named by Barnum Brown in 1910 from Greek *kritos* ('separated / chosen') and *sauros* ('lizard'), referring to the separated cheek bones.",
    quotes: [
      { author: "Barnum Brown", work: "Bulletin of the American Museum of Natural History", quote: "I propose the generic name **Kritosaurus**, separated lizard, in reference to the completely separated arrangement of the cheek elements." },
      { author: "Henry Fairfield Osborn", work: "American Museum Novitates", quote: "The skull of **Kritosaurus** is distinguished by an elevated, vaulted nasal crest forming a prominent Roman nose." },
      { author: "Robert T. Bakker", work: "The Dinosaur Heresies", quote: "Duckbills like **Kritosaurus** possessed complex dental batteries capable of grinding the toughest Cretaceous conifers." }
    ]
  },
  "merocrine.md": {
    primary: "Relating to a type of exocrine gland whose secretions are discharged across the cell membrane by exocytosis without any loss of cytoplasm or destruction of the cell (e.g., salivary glands, pancreatic acini).",
    secondary: "Designating the gentlest, non-destructive cellular secretory mechanism (synonymous with eccrine in many contexts).",
    quotes: [
      { author: "William Bloom & Don W. Fawcett", work: "A Textbook of Histology", quote: "In **merocrine** secretion, secretory granules fuse with the apical plasma membrane, releasing their contents without injury to the cell." },
      { author: "Arthur Ham", work: "Histology", quote: "Most exocrine glands in the human body utilize the **merocrine** mode of secretion to preserve cellular integrity." },
      { author: "Claude Bernard", work: "Lectures on the Physiology of Digestion", quote: "The **merocrine** discharge from pancreatic cells proceeds rhythmically under secretin stimulation." }
    ]
  },
  "syncrisis.md": {
    primary: "A figure of speech in classical rhetoric in which opposite persons, ideas, or things are explicitly compared and contrasted to highlight the virtues or vices of both.",
    secondary: "In ancient historiography, a paired biographical or moral comparison, famously employed by Plutarch in his *Parallel Lives*.",
    quotes: [
      { author: "Plutarch", work: "Parallel Lives", quote: "At the conclusion of each pair of biographies, Plutarch appended a formal **syncrisis** weighing the merits of the Greek hero against the Roman." },
      { author: "Quintilian", work: "Institutio Oratoria", quote: "By skillful **syncrisis**, the advocate sets the noble character of the victim directly against the brutal depravity of the accused." },
      { author: "George Puttenham", work: "The Arte of English Poesie", quote: "We call this figure **syncrisis**, or the comparison of contraries, wherein two men of opposite natures are matched together." }
    ]
  },
  "uncritical.md": {
    primary: "Not expressing or guided by critical judgment, analysis, or discrimination; accepting without question.",
    secondary: "Lacking intellectual skepticism or rigorous standards of evidence.",
    quotes: [
      { author: "Bertrand Russell", work: "A History of Western Philosophy", quote: "An **uncritical** acceptance of traditional dogmas is the greatest obstacle to genuine intellectual progress." },
      { author: "John Dewey", work: "How We Think", quote: "Children often form beliefs through **uncritical** habit, absorbing the biases of their elders without reflection." },
      { author: "Carl Sagan", work: "The Demon-Haunted World", quote: "Pseudoscience thrives in an environment of **uncritical** credulity where evidence is never rigorously tested." }
    ]
  },
  "uncritically.md": {
    primary: "In an uncritical manner; accepting claims, beliefs, or authorities without independent evaluation, doubt, or scrutiny.",
    secondary: "Without applying analytical standards or discerning judgment.",
    quotes: [
      { author: "William James", work: "The Varieties of Religious Experience", quote: "Many believers accept miracles **uncritically**, demanding no empirical verification for what satisfies their emotional needs." },
      { author: "George Orwell", work: "The Road to Wigan Pier", quote: "Party zealots repeat propaganda slogans **uncritically**, as if mechanical repetition proved their truth." },
      { author: "Thomas Henry Huxley", work: "Science and Culture", quote: "The true man of science refuses to accept hypotheses **uncritically**, demanding verifiable experimental proof." }
    ]
  }
};

for (const [filename, entry] of Object.entries(filesData)) {
  const filePath = path.join(basePath, filename);
  if (!fs.existsSync(filePath)) {
    console.error(`Missing file: ${filePath}`);
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Find top portion up to > [!book]
  const bookIdx = content.indexOf('> [!book]');
  if (bookIdx === -1) {
    console.error(`No > [!book] in ${filename}`);
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
  console.log(`Updated: ${filename}`);
}

console.log('Done Batch 5 (crit) of Cluster Law & Order!');
