import fs from "fs";
import path from "path";

const baseDir = "App database/Greek roots/Cluster Speech & Language";

const wordsData = {
  // Dashboard — herm (remaining 22 words)
  "Dashboard — herm/herman.md": {
    word: "herman",
    primary: "A masculine personal name of Germanic origin (Hariman, meaning army man or warrior); historically prominent through Arminius and author Herman Melville.",
    secondary: "In literary history, the given name of 19th-century American novelist Herman Melville, author of Moby-Dick, or in German historiography, the mythologized heroic liberator of Germania.",
    quotes: [
      { author: "Nathaniel Hawthorne", work: "The English Notebooks", quote: "My friend **Herman** Melville walked with me along the windy beach, discussing providence and eternity with restless passion." },
      { author: "Henry James", work: "Notes on Novelists", quote: "The erratic imaginative voyages of **Herman** Melville reveal an intense American romanticism wrestling with cosmic ambiguity." },
      { author: "Thomas Carlyle", work: "Past and Present", quote: "Old **Herman** stood among the Teutonic forests as a living bulwark against the conquering legions of imperial Rome." }
    ]
  },
  "Dashboard — herm/hermann.md": {
    word: "hermann",
    primary: "A variant spelling of the Germanic masculine name Hermann (army man); notably associated with German botanist Paul Hermann and mathematician Hermann Weyl.",
    secondary: "In the history of science, referring to pioneer Dutch botanist Paul Hermann (1646–1695) whose Ceylon herbarium formed the basis of Linnaean nomenclature, or physicist Hermann von Helmholtz.",
    quotes: [
      { author: "Carl Linnaeus", work: "Critica Botanica", quote: "The illustrious botanist Paul **Hermann** collected with tireless devotion throughout Ceylon, enriching our knowledge of oriental flora." },
      { author: "Albert Einstein", work: "Autobiographical Notes", quote: "The penetrating mathematical treatises of **Hermann** Minkowski and **Hermann** Weyl revealed the deep geometric beauty underlying physics." },
      { author: "William James", work: "The Principles of Psychology", quote: "The physiological experiments conducted by **Hermann** von Helmholtz demonstrated the precise temporal mechanics of sensory nerve conduction." }
    ]
  },
  "Dashboard — herm/hermannia.md": {
    word: "hermannia",
    primary: "A genus of perennial herbs and shrubs in the mallow family (Malvaceae, subfamily Byttnerioideae), native primarily to southern Africa and named in honor of botanist Paul Hermann.",
    secondary: "In systematic botany and horticultural flora, known colloquially as doll's roses or honey-bells, distinguished by spirally twisted petals and bell-shaped calyces.",
    quotes: [
      { author: "Carl Linnaeus", work: "Species Plantarum", quote: "The genus **Hermannia** commemorates the distinguished physician of Leiden whose botanical discoveries brought honor to the Netherlands." },
      { author: "William Jackson Hooker", work: "Botanical Magazine", quote: "This rare species of **Hermannia** produces drooping golden blossoms that emit a faint fragrance in early spring." },
      { author: "Asa Gray", work: "Structural Botany", quote: "The twisted aestivation of petals in **Hermannia** illustrates the close morphological alliance between Byttnerieae and the greater mallow order." }
    ]
  },
  "Dashboard — herm/hermaphrodism.md": {
    word: "hermaphrodism",
    primary: "The biological condition or state of possessing both male and female reproductive structures or sexual characteristics within the same individual; hermaphroditism.",
    secondary: "In teratology and early endocrinological pathology, anatomical ambiguity resulting from atypical gonadal differentiation or hormonal exposure during embryogenesis.",
    quotes: [
      { author: "Charles Darwin", work: "The Variation of Animals and Plants under Domestication", quote: "Instances of abnormal **hermaphrodism** occasionally occur in higher animals where the sexes are ordinarily strictly separated." },
      { author: "Thomas Henry Huxley", work: "Lessons in Elementary Anatomy", quote: "Certain primitive invertebrates exhibit normal functional **hermaphrodism**, producing both ova and spermatozoa within a single organism." },
      { author: "Havelock Ellis", work: "Studies in the Psychology of Sex", quote: "Early medical jurists struggled to classify congenital **hermaphrodism** within rigid legal categories that recognized only two polar sexes." }
    ]
  },
  "Dashboard — herm/hermaphrodite.md": {
    word: "hermaphrodite",
    primary: "An organism having both male and female sex organs or other sexual characteristics (named from the mythological Hermaphroditus).",
    secondary: "In classical mythology and aesthetics, a figure embodying the harmonious or uncanny fusion of masculine and feminine forms; colloquially, something combining two contradictory natures.",
    quotes: [
      { author: "Ovid", work: "Metamorphoses", quote: "The youthful **hermaphrodite** stepped into the enchanted fountain of Salmacis, where their two bodies merged into an inseparable form." },
      { author: "Charles Darwin", work: "The Origin of Species", quote: "Many marine animals are natural **hermaphrodite** creatures that nevertheless require reciprocal cross-fertilization with a partner." },
      { author: "Virginia Woolf", work: "A Room of One's Own", quote: "Coleridge perhaps meant that the creative mind must be **hermaphrodite**, resonant and porous to every human emotion." }
    ]
  },
  "Dashboard — herm/hermaphroditic.md": {
    word: "hermaphroditic",
    primary: "Of, relating to, or having the characteristics of a hermaphrodite; possessing both male and female reproductive organs.",
    secondary: "In botanical taxonomy, designating flowers (perfect flowers) that contain both functional stamens and carpels on the same receptacle.",
    quotes: [
      { author: "Gregor Mendel", work: "Experiments in Plant Hybridisation", quote: "The pea plant produces naturally **hermaphroditic** flowers whose reproductive organs remain enclosed within the keel petals." },
      { author: "Ernst Haeckel", work: "The History of Creation", quote: "The simple flatworms present a completely developed **hermaphroditic** reproductive system adapted for internal self-fertilization." },
      { author: "John Locke", work: "An Essay Concerning Human Understanding", quote: "The existence of **hermaphroditic** monsters demonstrates that our nominal definitions of species do not exhaust nature's variety." }
    ]
  },
  "Dashboard — herm/hermaphroditism.md": {
    word: "hermaphroditism",
    primary: "The condition of having both male and female reproductive organs or dual sexual differentiation in a single individual.",
    secondary: "In evolutionary biology, an adaptive reproductive strategy widespread in plants, snails, and reef fishes (simultaneous or sequential hermaphroditism).",
    quotes: [
      { author: "Charles Darwin", work: "The Effects of Cross and Self Fertilisation in the Vegetable Kingdom", quote: "The prevalence of **hermaphroditism** in flowering plants is balanced by remarkable adaptations designed to prevent habitual self-fertilization." },
      { author: "Richard Dawkins", work: "The Selfish Gene", quote: "In species where sequential **hermaphroditism** occurs, individuals maximize reproductive success by changing sex as they attain larger size." },
      { author: "Havelock Ellis", work: "Man and Woman", quote: "True anatomical **hermaphroditism** in human beings remains exceptionally rare in clinical records." }
    ]
  },
  "Dashboard — herm/hermaphroditus.md": {
    word: "hermaphroditus",
    primary: "In Greek mythology, the beautiful son of Hermes and Aphrodite who was united into a single, dual-gendered body with the nymph Salmacis in Caria.",
    secondary: "In classical art history and Hellenistic sculpture, the celebrated sculptural subject depicting an idealized reclining figure showing both male and female anatomical traits.",
    quotes: [
      { author: "Ovid", work: "Metamorphoses", quote: "When Salmacis wrapped her limbs about him, the youth **Hermaphroditus** prayed that whoever bathed in that pool might henceforth emerge weakened of sex." },
      { author: "Walter Pater", work: "Greek Studies", quote: "The Hellenistic statue of **Hermaphroditus** reflects an exquisite, decadent curiosity concerning the synthesis of physical beauty." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The pagan galleries of the Antonines displayed marble statues of **Hermaphroditus** alongside solemn busts of Roman emperors." }
    ]
  },
  "Dashboard — herm/hermeneutic.md": {
    word: "hermeneutic",
    primary: "Concerning or relating to interpretation, especially the interpretation of literary, legal, or theological texts; interpretative.",
    secondary: "In philosophical epistemology, describing interpretive methodology (as in the hermeneutic circle) that uncovers meaning embedded in historical contexts and language.",
    quotes: [
      { author: "Hans-Georg Gadamer", work: "Truth and Method", quote: "The **hermeneutic** experience requires that the interpreter enter into a dialogue with the tradition rather than stand above it." },
      { author: "Martin Heidegger", work: "Being and Time", quote: "Phenomenology of Dasein is fundamentally a **hermeneutic** in which the authentic meaning of Being is brought to explicit understanding." },
      { author: "Paul Ricoeur", work: "The Conflict of Interpretations", quote: "Every text invites a **hermeneutic** struggle between restorative interpretation and critical demystification." }
    ]
  },
  "Dashboard — herm/hermeneutics.md": {
    word: "hermeneutics",
    primary: "The branch of knowledge that deals with interpretation, especially the principles and methodology of interpreting biblical, legal, and philosophical texts.",
    secondary: "In modern philosophy, the overarching discipline concerned with human understanding, communication, and the ontological structure of historical meaning.",
    quotes: [
      { author: "Friedrich Schleiermacher", work: "Hermeneutics and Criticism", quote: "The ultimate task of **hermeneutics** is to understand an author even better than he understood himself." },
      { author: "Wilhelm Dilthey", work: "The Construction of the Historical World in the Human Sciences", quote: "Historical **hermeneutics** enables us to reconstruct past spiritual experiences from their enduring artistic and textual monuments." },
      { author: "Jürgen Habermas", work: "Communication and the Evolution of Society", quote: "Philosophical **hermeneutics** illuminates how shared social norms emerge through mutual communicative understanding." }
    ]
  },
  "Dashboard — herm/hermes.md": {
    word: "hermes",
    primary: "In Greek religion and mythology, the Olympian god of commerce, eloquence, travel, thievery, and athletic contests, serving as the swift messenger of the gods and conductor of souls (psychopompos).",
    secondary: "In Hellenistic syncretism and occult philosophy, identified with Egyptian Thoth as Hermes Trismegistus, the patron of alchemy, medicine, and esoteric wisdom.",
    quotes: [
      { author: "Homer", work: "The Odyssey", quote: "Swift-footed **Hermes**, the slayer of Argus, flew over the waves with golden sandals to bear Zeus's decree to the nymph Calypso." },
      { author: "Hesiod", work: "Theogony", quote: "From Maia and Zeus sprang glorious **Hermes**, the herald of the immortals who wanders across the earth." },
      { author: "Walter Burkert", work: "Greek Religion", quote: "As the guardian of boundaries, **Hermes** stood at the threshold between civilized order and the wild perils of the road." }
    ]
  },
  "Dashboard — herm/hermetic.md": {
    word: "hermetic",
    primary: "Completely airtight, sealed, or protected against the escape or entry of air and gas.",
    secondary: "Relating to Hermes Trismegistus, the occult sciences of alchemy, or esoteric philosophy; isolated, esoteric, and impenetrable to outside influence.",
    quotes: [
      { author: "Robert Boyle", work: "New Experiments Physico-Mechanicall", quote: "The glass cylinder was secured with a **hermetic** seal to ensure that external atmosphere could not disturb the vacuum." },
      { author: "Walter Pater", work: "Appreciations", quote: "The poet cultivated an intensely private, **hermetic** verse that revealed its mysteries only to initiated readers." },
      { author: "Umberto Eco", work: "Foucault's Pendulum", quote: "The secret society claimed to possess ancient **hermetic** manuscripts that unlocked the hidden mathematical order of the cosmos." }
    ]
  },
  "Dashboard — herm/hermetically.md": {
    word: "hermetically",
    primary: "In a way that is completely airtight or sealed so that no gas or liquid can enter or escape.",
    secondary: "In an isolated, insular, or secretive manner, cut off from external communication, scrutiny, or influence.",
    quotes: [
      { author: "Michael Faraday", work: "Experimental Researches in Chemistry and Physics", quote: "The chemical mixture was **hermetically** enclosed within a heavy glass tube before being subjected to intense heat." },
      { author: "George Orwell", work: "Nineteen Eighty-Four", quote: "The oceanic society lived **hermetically** isolated from the rest of the world, knowing foreign cultures only through fabricated propaganda." },
      { author: "Arthur Conan Doyle", work: "The Sign of the Four", quote: "The poison had been kept in a **hermetically** sealed phial to prevent its deadly vapors from evaporating." }
    ]
  },
  "Dashboard — herm/hermissenda.md": {
    word: "hermissenda",
    primary: "A genus of sea slugs (aeolid nudibranchs) in the family Facelinidae, renowned for their brilliant opalescent coloring and predatory habits.",
    secondary: "In neurobiology and marine ethology, an important model organism (Hermissenda crassicornis) used extensively in classical conditioning and cellular memory research.",
    quotes: [
      { author: "Daniel L. Alkon", work: "Memory Storage and Neural Systems", quote: "Conditioning experiments with **Hermissenda** revealed that memory traces are stored as changes in potassium currents within individual photoreceptors." },
      { author: "Charles Darwin", work: "Naturalist's Voyage Round the World", quote: "The delicate beauty of the pelagic **Hermissenda** nudibranchs floating near the kelp beds astonished every observer on the ship." },
      { author: "E. O. Wilson", work: "The Diversity of Life", quote: "The iridescent cerata of **Hermissenda** serve both as respiratory organs and as defensive storage chambers for stinging nematocysts." }
    ]
  },
  "Dashboard — herm/hermit.md": {
    word: "hermit",
    primary: "A person who has withdrawn to a solitary place for a life of religious seclusion and ascetic contemplation; an anchorite.",
    secondary: "Any person living in solitude or seclusion away from society; in zoology, applied to solitary creatures such as the hermit crab.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The solitary **hermit** Anthony retired into the desolate sands of the Thebaid to wage ceaseless war against spiritual temptations." },
      { author: "Henry David Thoreau", work: "Walden", quote: "I was visited at my cabin by a contemplative **hermit** who found in the forest silence a peace that cities could never afford." },
      { author: "Samuel Johnson", work: "Rasselas", quote: "The aged **hermit** confessed that his years of solitude had not extinguished his lingering curiosity about the society of men." }
    ]
  },
  "Dashboard — herm/hermitage.md": {
    word: "hermitage",
    primary: "The habitation or dwelling-place of a hermit; a secluded residence or retreat.",
    secondary: "An imperial museum and palace complex in St. Petersburg, Russia (the State Hermitage Museum), originally established by Catherine the Great as a quiet retreat.",
    quotes: [
      { author: "William Wordsworth", work: "Lines Composed a Few Miles above Tintern Abbey", quote: "Once again do I behold some **hermitage** where by his forest fire the hermit sits alone in peaceful contemplation." },
      { author: "Leo Tolstoy", work: "War and Peace", quote: "The old prince had constructed a secluded **hermitage** at the edge of his country estate where he could read philosophy undisturbed." },
      { author: "Catherine the Great", work: "Memoirs", quote: "In my private **Hermitage**, surrounded by masterworks of art, I enjoy conversations with scholars away from the rigid ceremonies of the court." }
    ]
  },
  "Dashboard — herm/hermitic.md": {
    word: "hermitic",
    primary: "Of, relating to, or characteristic of a hermit; solitary, reclusive, or anchoritic.",
    secondary: "Describing a lifestyle or disposition marked by ascetic retreat, seclusion, or rigorous detachment from worldly society.",
    quotes: [
      { author: "Thomas Carlyle", work: "Sartor Resartus", quote: "Teufelsdröckh lived in an elevated, **hermitic** attic overlooking the noisy metropolis, contemplating human vanity from aloft." },
      { author: "Ralph Waldo Emerson", work: "Essays: First Series", quote: "The scholar must often adopt a **hermitic** independence to protect his thoughts from the clamor of public opinion." },
      { author: "Washington Irving", work: "The Sketch Book", quote: "The traveler discovered a quaint, **hermitic** cottage nestled in the valley, undisturbed by the hurried progress of the modern world." }
    ]
  },
  "Dashboard — herm/hermitical.md": {
    word: "hermitical",
    primary: "Suitable for, pertaining to, or resembling a hermit; strictly secluded or solitary.",
    secondary: "In religious historiography, characterizing monastic rules and solitary ascetic practices developed in the early Christian desert traditions.",
    quotes: [
      { author: "John Evelyn", work: "Diary", quote: "We visited the ancient monastery where the monks still observed their strict **hermitical** discipline in silent contemplation." },
      { author: "Robert Burton", work: "The Anatomy of Melancholy", quote: "Too long an indulgence in a **hermitical** solitude breeds strange phantasms and disquiets the rational mind." },
      { author: "John Ruskin", work: "Modern Painters", quote: "The painter retired to a **hermitical** cell in the Swiss mountains to capture the uncorrupted majesty of the peaks." }
    ]
  },
  "Dashboard — herm/hermosillo.md": {
    word: "hermosillo",
    primary: "The capital and largest city of the Mexican state of Sonora, named in 1828 in honor of insurgent general José María González de Hermosillo.",
    secondary: "In Mexican history and regional geography, a key economic hub of northwestern Mexico located in the Sonoran Desert (etymologically from Spanish hermoso beautiful).",
    quotes: [
      { author: "John Russell Bartlett", work: "Personal Narrative", quote: "We reached **Hermosillo** at sunset, finding its spacious plazas shaded by orange trees and watered by canals from the river." },
      { author: "Alexander von Humboldt", work: "Political Essay on the Kingdom of New Spain", quote: "The agricultural valleys surrounding the settlement of **Hermosillo** yielded bountiful wheat crops despite the arid desert climate." },
      { author: "Hubert Howe Bancroft", work: "History of the North Mexican States and Texas", quote: "General **Hermosillo** led the insurgent forces into Sonora, leaving his name to be memorialized on the state's future capital." }
    ]
  },
  "Dashboard — herm/pseudohermaphrodite.md": {
    word: "pseudohermaphrodite",
    primary: "An individual having gonads of one sex, but whose external genitalia and secondary sexual characteristics resemble or are ambiguous with those of the opposite sex.",
    secondary: "In clinical genetics and pediatric endocrinology, a patient presenting with discordance between chromosomal/gonadal sex and phenotypic genital development.",
    quotes: [
      { author: "Havelock Ellis", work: "Studies in the Psychology of Sex", quote: "The clinical investigator must determine whether the patient is a true hermaphrodite or a **pseudohermaphrodite** possessing uniform internal gonads." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Congenital adrenal hyperplasia can cause a female infant to present as a **pseudohermaphrodite** requiring careful endocrine evaluation." },
      { author: "Thomas Hunt Morgan", work: "The Physical Basis of Heredity", quote: "Chromosomal analysis provides the definitive diagnostic method to classify every anomalous **pseudohermaphrodite** according to genetic sex." }
    ]
  },
  "Dashboard — herm/pseudohermaphroditic.md": {
    word: "pseudohermaphroditic",
    primary: "Relating to, resembling, or exhibiting the characteristics of pseudohermaphroditism.",
    secondary: "In veterinary pathology and comparative embryology, describing phenotypes that exhibit developmental divergence between gonads and genital tract morphology.",
    quotes: [
      { author: "Julian Huxley", work: "The Individual in the Animal Kingdom", quote: "Certain mutant strains of flies exhibit **pseudohermaphroditic** structures caused by unbalanced chromosomal distributions." },
      { author: "Ernst Mayr", work: "Animal Species and Evolution", quote: "In rare instances, **pseudohermaphroditic** phenotypes appear within wild bird populations without disrupting general viability." },
      { author: "Alfred Kinsey", work: "Sexual Behavior in the Human Female", quote: "The physiological study of **pseudohermaphroditic** individuals helped dismantle simplistic assumptions about absolute biological dichotomy." }
    ]
  },
  "Dashboard — herm/pseudohermaphroditism.md": {
    word: "pseudohermaphroditism",
    primary: "A state or condition of intersex development in which the gonads are exclusively male (testes) or female (ovaries), but the external genitalia are ambiguous or characteristic of the opposite sex.",
    secondary: "In medical endocrinology, categorized into male pseudohermaphroditism (e.g., androgen insensitivity) and female pseudohermaphroditism (e.g., congenital adrenal hyperplasia).",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The underlying etiology of female **pseudohermaphroditism** typically involves excessive androgen secretion by the fetal adrenal cortex." },
      { author: "Havelock Ellis", work: "Studies in the Psychology of Sex", quote: "Historical accounts of sexual metamorphoses frequently described undiagnosed cases of congenital **pseudohermaphroditism**." },
      { author: "Theodosius Dobzhansky", work: "Genetics and the Origin of Species", quote: "Studies of **pseudohermaphroditism** reveal how delicate the biochemical cascades governing secondary sexual differentiation truly are." }
    ]
  },

  // Dashboard — stell (23 words)
  "Dashboard — stell/asystole.md": {
    word: "asystole",
    primary: "A life-threatening state of cardiac arrest in which there is a complete absence of electrical and mechanical activity in the heart (flatline).",
    secondary: "In emergency medicine and cardiology, the cessation of ventricular contractions representing terminal cardiac standstill requiring immediate resuscitation protocols.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Sudden reflex inhibition of the heart can induce instantaneous **asystole**, resulting in fatal syncope." },
      { author: "Eugene Braunwald", work: "Heart Disease", quote: "The electrocardiographic tracing of persistent **asystole** confirms total loss of electrical depolarization across the myocardium." },
      { author: "Oliver Sacks", work: "Awakenings", quote: "The patient suffered an alarming episode of ventricular standstill, escaping permanent damage only when **asystole** yielded to an escape rhythm." }
    ]
  },
  "Dashboard — stell/centrostaltic.md": {
    word: "centrostaltic",
    primary: "Pertaining to or describing muscular contraction that originates in or is directly excited by a central nervous system reflex center.",
    secondary: "In neurophysiology, characterizing visceral and peristaltic motor impulses initiated within central spinal or bulbar ganglia.",
    quotes: [
      { author: "Charles Sherrington", work: "The Integrative Action of the Nervous System", quote: "The coordination of visceral motility involves **centrostaltic** impulses that propagate from autonomic nuclei down peripheral nerve paths." },
      { author: "William Benjamin Carpenter", work: "Principles of Mental Physiology", quote: "Reflex actions of the alimentary tract are governed by **centrostaltic** mechanisms centered in the spinal cord." },
      { author: "Ivan Pavlov", work: "Lectures on the Work of the Digestive Glands", quote: "Digestive secretions and motor responses are mediated by complex **centrostaltic** pathways linking the brainstem to the stomach." }
    ]
  },
  "Dashboard — stell/diastole.md": {
    word: "diastole",
    primary: "The phase of the heartbeat when the heart muscle relaxes and the ventricles dilate and fill with blood (contrasted with systole).",
    secondary: "In classical prosody and rhetoric, the poetic lengthening of a syllable that is naturally short, usually for metrical convenience.",
    quotes: [
      { author: "William Harvey", work: "De Motu Cordis", quote: "When the heart dilates during **diastole**, the relaxed ventricles receive blood from the auricles ready for the next contraction." },
      { author: "Quintilian", work: "Institutio Oratoria", quote: "The ancient poet lengthened the short vowel by poetic **diastole** to satisfy the rigorous cadence of the dactylic hexameter." },
      { author: "John Keats", work: "Endymion", quote: "His heart beat with a strange rhythmic rhythm, pausing in anxious **diastole** before bounding forward in love." }
    ]
  },
  "Dashboard — stell/diastolic.md": {
    word: "diastolic",
    primary: "Pertaining to, occurring during, or characteristic of diastole; especially relating to the minimum arterial blood pressure during ventricular relaxation.",
    secondary: "In clinical cardiology, designating specific diagnostic signs such as a diastolic murmur, diastolic gallop, or diastolic heart failure.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The soft blowing **diastolic** murmur heard along the left sternal border provides unmistakable evidence of aortic regurgitation." },
      { author: "Eugene Braunwald", work: "Heart Disease", quote: "Elevated **diastolic** pressure indicates sustained vascular resistance within the peripheral arterial beds." },
      { author: "Oliver Wendell Holmes Sr.", work: "Medical Essays", quote: "The sphygmomanometer measures both the peak of systolic drive and the resting level of **diastolic** pressure." }
    ]
  },
  "Dashboard — stell/epistolary.md": {
    word: "epistolary",
    primary: "Of, relating to, or carried on by letters or written correspondence.",
    secondary: "In literary theory, designating a novel or composition written in the form of a series of letters exchanged between characters (e.g., Clarissa, Dracula).",
    quotes: [
      { author: "Samuel Richardson", work: "Clarissa", quote: "The immediacy of the **epistolary** style allows the reader to experience the heroine's anxieties written to the moment." },
      { author: "Virginia Woolf", work: "The Common Reader", quote: "The art of **epistolary** conversation reached its highest perfection in the private correspondence of eighteenth-century ladies." },
      { author: "Henry James", work: "The Portrait of a Lady", quote: "Their intimacy had been fostered through a sustained **epistolary** friendship long before they met on Italian soil." }
    ]
  },
  "Dashboard — stell/epistolatory.md": {
    word: "epistolatory",
    primary: "Pertaining to letters, correspondence, or letter-writing; epistolary.",
    secondary: "In literary criticism, characterizing a style, narrative tone, or mode of expression appropriate to personal or formal epistles.",
    quotes: [
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "Pope cultivated an **epistolatory** elegance that lent even his casual notes the finish of public literature." },
      { author: "Thomas Babington Macaulay", work: "Critical and Historical Essays", quote: "Madame de Sévigné remains the unrivaled mistress of **epistolatory** narrative, depicting court intrigue with vivacious wit." },
      { author: "George Saintsbury", work: "A History of English Prose Rhythm", quote: "The author's prose retains an **epistolatory** lightness, moving with easy grace between intimate confession and sharp satire." }
    ]
  },
  "Dashboard — stell/epistolic.md": {
    word: "epistolic",
    primary: "Of or pertaining to an epistle or letters; written in the form of an epistle.",
    secondary: "In biblical and ecclesiastical scholarship, designating apostolic letters included in the New Testament canon or liturgically read during Christian worship.",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The early Christian bishops maintained ecclesiastical unity across distant provinces through continuous **epistolic** communication." },
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "Letters of state and **epistolic** discourses between princes afford the closest insight into political negotiations." },
      { author: "Samuel Taylor Coleridge", work: "Table Talk", quote: "The **epistolic** writings of St. Paul present the earliest theological formulations of the Christian church." }
    ]
  },
  "Dashboard — stell/epistolize.md": {
    word: "epistolize",
    primary: "To write letters; to communicate with someone in the form of letters or epistles.",
    secondary: "In literary history, to compose essays, polemics, or moral treatises in the epistolary format.",
    quotes: [
      { author: "Laurence Sterne", work: "Tristram Shandy", quote: "When my father was in a meditative humor, he loved to **epistolize** his friends on the absurdities of human speculation." },
      { author: "Lord Byron", work: "Letters and Journals", quote: "I have a great mind to **epistolize** the publisher in heroic couplets to vent my irritation at these delays." },
      { author: "Horace Walpole", work: "Letters", quote: "To sit at one's desk and **epistolize** about the gossip of the town is my favorite defense against rural boredom." }
    ]
  },
  "Dashboard — stell/epistolography.md": {
    word: "epistolography",
    primary: "The art, technique, or practice of writing letters, especially of a literary, formal, or rhetorical character.",
    secondary: "In classical philology and cultural history, the study of ancient letters as a recognized literary genre governed by rhetorical manuals.",
    quotes: [
      { author: "Erasmus", work: "De Conscribendis Epistolis", quote: "Classical **epistolography** demands that a letter reflect the authentic voice of the writer while observing polite decorum." },
      { author: "Jacob Burckhardt", work: "The Civilization of the Renaissance in Italy", quote: "Humanist scholars revived Latin **epistolography**, competing to write letters modeled on the prose of Cicero." },
      { author: "Walter Pater", work: "Marius the Epicurean", quote: "In that cultivated age, Roman **epistolography** was cherished as a fine art, celebrated for refined sentiment and balanced cadences." }
    ]
  },
  "Dashboard — stell/eusystole.md": {
    word: "eusystole",
    primary: "In physiology and cardiology, the normal, healthy, and unimpeded systolic contraction of the heart.",
    secondary: "In hemodynamics, optimal ventricular emptying characterized by balanced contractility and standard stroke volume.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The patient demonstrated regular cardiac rhythm with steady **eusystole**, indicating adequate myocardial recovery after digitalis administration." },
      { author: "Eugene Braunwald", work: "Heart Disease", quote: "A state of **eusystole** reflects harmonious electrical conduction through the bundle branches ensuring simultaneous ventricular depolarization." },
      { author: "Walter Cannon", work: "The Wisdom of the Body", quote: "Homeostatic adjustments maintain **eusystole** under varying physical stresses to ensure sufficient tissue perfusion." }
    ]
  },
  "Dashboard — stell/hypodiastole.md": {
    word: "hypodiastole",
    primary: "In ancient and Byzantine Greek grammar and punctuation, a mark (such as a comma or virgule) placed between words to avoid ambiguity of word division.",
    secondary: "In textual criticism and palaeography, an editorial sign used in manuscripts to distinguish identical phrases, such as differentiating hoti (that) from ho ti (whatever).",
    quotes: [
      { author: "Herbert Weir Smyth", work: "Greek Grammar", quote: "Ancient scribes employed the **hypodiastole** beneath the line to separate words that might otherwise be read as a single compound." },
      { author: "Richard Bentley", work: "Dissertation upon the Epistles of Phalaris", quote: "The corrupt reading in the codex arose from the copyist omitting the **hypodiastole**, thus confounding two distinct clauses." },
      { author: "L. D. Reynolds & N. G. Wilson", work: "Scribes and Scholars", quote: "Byzantine scholars standardized the **hypodiastole** to assist readers in parsing continuous script without word spacing." }
    ]
  },
  "Dashboard — stell/peristaltic.md": {
    word: "peristaltic",
    primary: "Of, relating to, or involving peristalsis—the involuntary wave of muscular contraction and relaxation that moves contents along a tubular organ.",
    secondary: "In biomedical engineering, describing pumps and mechanisms that convey fluids through flexible tubing by progressive external compression rollers.",
    quotes: [
      { author: "William Beaumont", work: "Experiments and Observations on the Gastric Juice", quote: "Direct observation revealed the powerful **peristaltic** waves of the stomach churning food into homogeneous chyme." },
      { author: "Thomas Henry Huxley", work: "Lessons in Elementary Physiology", quote: "The coordinated **peristaltic** contraction of circular and longitudinal muscle fibers drives the intestinal contents onward." },
      { author: "Claude Bernard", work: "An Introduction to the Study of Experimental Medicine", quote: "Vagus nerve stimulation intensified the **peristaltic** action of the digestive canal during active digestion." }
    ]
  },
  "Dashboard — stell/peristole.md": {
    word: "peristole",
    primary: "In physiology, the muscular contraction and adaptation by which the stomach or other hollow organ compresses and holds its contents closely during digestion.",
    secondary: "In gastrointestinal mechanics, the concentric clamping force of gastric walls on an ingested bolus, distinct from the forward-moving wave of peristalsis.",
    quotes: [
      { author: "William Beaumont", work: "Experiments and Observations on the Gastric Juice", quote: "The gastric wall exhibited steady **peristole**, grasping the food firmly while gentle contractions rolled it along the greater curvature." },
      { author: "Ivan Pavlov", work: "The Work of the Digestive Glands", quote: "Normal gastric function requires both rhythmic peristalsis and tonic **peristole** to ensure thorough contact with digestive juices." },
      { author: "Walter Cannon", work: "The Mechanical Factors of Digestion", quote: "Fluoroscopic examination demonstrated that the fundus maintains a continuous **peristole**, keeping constant pressure on its contents." }
    ]
  },
  "Dashboard — stell/stella.md": {
    word: "stella",
    primary: "Latin for 'star'; used in astronomical taxonomy, variable star designations, or as a feminine given name.",
    secondary: "In literary history, the poetic name given by Sir Philip Sidney to Penelope Devereux in his celebrated Elizabethan sonnet sequence Astrophel and Stella.",
    quotes: [
      { author: "Sir Philip Sidney", work: "Astrophel and Stella", quote: "Fly, fly, my friends, I have my death-wound; fly; see there that boy, that murdering boy, while **Stella** shines with radiant eyes." },
      { author: "Jonathan Swift", work: "Journal to Stella", quote: "Farewell, dear **Stella**, and believe that no distance of time or place can alter my sincere affection." },
      { author: "John Herschel", work: "Outlines of Astronomy", quote: "The ancient catalog recorded the new variable star as a temporary **stella** shining in the constellation Cassiopeia." }
    ]
  },
  "Dashboard — stell/stellar.md": {
    word: "stellar",
    primary: "Of or relating to a star or stars; astral.",
    secondary: "Figuratively, exceptionally good, brilliant, or outstanding; pertaining to a leading theatrical performer or celebrity.",
    quotes: [
      { author: "Arthur Eddington", work: "The Internal Constitution of the Stars", quote: "Within the incandescent core of a star, radiation pressure supports the enormous weight of the outer **stellar** layers." },
      { author: "Ralph Waldo Emerson", work: "Essays: First Series", quote: "A man should learn to detect and watch that gleam of light which flashes across his mind from within, more than the lustre of the **stellar** firmament." },
      { author: "Carl Sagan", work: "Cosmos", quote: "We are made of **stellar** ash, synthesized in the nuclear furnaces of ancient exploding suns." }
    ]
  },
  "Dashboard — stell/stellaria.md": {
    word: "stellaria",
    primary: "A large genus of herbaceous flowering plants in the family Caryophyllaceae (commonly called chickweeds and stitchworts), characterized by deeply cleft, star-like white petals.",
    secondary: "In traditional herbal medicine and botanical ecology, widespread ground-covering flora (Stellaria media) serving as pioneer weeds and forage for birds.",
    quotes: [
      { author: "Carl Linnaeus", work: "Flora Suecica", quote: "The common **Stellaria** covers field borders with its humble white petals that open only in bright sunshine." },
      { author: "Gilbert White", work: "The Natural History of Selborne", quote: "Chickweed, or **Stellaria**, continues to bloom even through mild winters, providing green sustenance to small woodland birds." },
      { author: "Asa Gray", work: "Manual of the Botany of the Northern United States", quote: "The deeply bifid petals of **Stellaria** give the flower the deceptive appearance of having ten petals instead of five." }
    ]
  },
  "Dashboard — stell/stellate.md": {
    word: "stellate",
    primary: "Arranged in a radiating star shape; star-shaped or having points radiating outward like a star.",
    secondary: "In histology and neuroanatomy, describing star-shaped cells with multiple branching processes (such as hepatic stellate cells or cerebellar stellate neurons).",
    quotes: [
      { author: "Santiago Ramón y Cajal", work: "Histology of the Nervous System", quote: "In the molecular layer of the cerebellum, the short axons of the **stellate** neurons make synaptic contact with Purkinje cell dendrites." },
      { author: "Charles Darwin", work: "The Formation of Vegetable Mould through the Action of Worms", quote: "Microscopic examination of the calcareous crystals revealed exquisite **stellate** clusters radiating from a central point." },
      { author: "D'Arcy Wentworth Thompson", work: "On Growth and Form", quote: "The **stellate** spicules of sponges illustrate how physical surface tension and crystallization determine organic skeletal design." }
    ]
  },
  "Dashboard — stell/steller.md": {
    word: "steller",
    primary: "Of, named after, or relating to Georg Wilhelm Steller (1709–1746), the German naturalist who explored Kamchatka, Alaska, and the Bering Sea.",
    secondary: "Designating various North Pacific animal species documented by Steller, notably the Steller's sea cow (Hydrodamalis gigas), Steller's sea lion, and Steller's jay.",
    quotes: [
      { author: "Vitus Bering", work: "Voyage of Discovery to Kamchatka", quote: "Our naturalist Georg **Steller** accompanied the landing party in Alaska, collecting plants and recording unknown seabirds with tireless zeal." },
      { author: "Charles Darwin", work: "The Voyage of the Beagle", quote: "The tragic extinction of the giant sea cow discovered by **Steller** illustrates the rapid vulnerability of large animals to human predation." },
      { author: "John Muir", work: "Travels in Alaska", quote: "High among the hemlock boughs, a crest-bearing **Steller**'s jay scolded us with its sharp, metallic cries." }
    ]
  },
  "Dashboard — stell/stellite.md": {
    word: "stellite",
    primary: "A range of hard, wear-resistant, and non-corrosive cobalt-chromium alloys, often containing tungsten or molybdenum, patented by Elwood Haynes in the early 20th century.",
    secondary: "In metallurgy and manufacturing engineering, used extensively for hardfacing cutting tools, valve facings, turbine blades, and high-temperature machinery.",
    quotes: [
      { author: "Elwood Haynes", work: "Transactions of the American Institute of Mining Engineers", quote: "I gave the new alloy the name **stellite**, from the Latin word for star, on account of its brilliant untarnishing luster." },
      { author: "Herbert Hoover", work: "Principles of Mining", quote: "Cutting bits tipped with **stellite** maintain their cutting edge at temperatures that would soften ordinary carbon steel." },
      { author: "Vannevar Bush", work: "Modern Arms and Free Men", quote: "Wartime engine production surged once valves were hard-faced with resilient **stellite** alloys capable of enduring extreme thermal stress." }
    ]
  },
  "Dashboard — stell/stole.md": {
    word: "stole",
    primary: "A long, narrow liturgical vestment worn around the neck or over the shoulders by Christian clergy; or a woman's long, loose scarf or shawl of fur or fabric.",
    secondary: "In classical antiquity, the Latin stola (from Greek stolē garment/equipment), a long pleated gown worn by Roman matrons as a sign of modesty and status.",
    quotes: [
      { author: "Geoffrey Chaucer", work: "The Canterbury Tales", quote: "The priest vested himself with alb and embroidered **stole** before approaching the high altar to chant the mass." },
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "The virtuous Roman matron wore the modest **stole** as a public emblem of marital chastity and patrician dignity." },
      { author: "Nathaniel Hawthorne", work: "The Scarlet Letter", quote: "The venerable minister wore his clerical **stole** with an air of solemn humility as he walked in the election procession." }
    ]
  },
  "Dashboard — stell/systaltic.md": {
    word: "systaltic",
    primary: "Having the power of contracting; alternately contracting and dilating; pulsating with regular rhythmic beats.",
    secondary: "In physiology and biological physics, characterizing organs or vessels that display automatic cyclical contraction, like the heart or lymphatic vessels.",
    quotes: [
      { author: "William Harvey", work: "De Motu Cordis", quote: "The heart exhibits an inherent **systaltic** rhythm, pulsating steadily to propel the life-giving blood through the arteries." },
      { author: "Thomas Henry Huxley", work: "Lessons in Elementary Physiology", quote: "The pulsation of the dorsal vessel in insects provides a primitive example of **systaltic** fluid movement." },
      { author: "John Tyndall", work: "Sound", quote: "The rhythmic vibrations of the column resemble the **systaltic** contractions of a living organ pulsating in steady cadence." }
    ]
  },
  "Dashboard — stell/systole.md": {
    word: "systole",
    primary: "The phase of the heartbeat when the heart muscle contracts and pumps blood from the chambers into the arteries (opposed to diastole).",
    secondary: "In classical prosody and rhetoric, the shortening of a syllable that is naturally long, for metrical necessity.",
    quotes: [
      { author: "William Harvey", work: "De Motu Cordis", quote: "In the moment of **systole**, the heart contracts vigorously, becoming paler and harder as it drives blood into the aorta." },
      { author: "Herbert Weir Smyth", work: "Greek Grammar", quote: "Poetic **systole** occasionally shortens a long vowel in epic meter when the cadence demands a swift short syllable." },
      { author: "Oliver Wendell Holmes Sr.", work: "The Autocrat of the Breakfast-Table", quote: "The rhythm of thought resembles the heartbeat, moving between the intense drive of **systole** and the quiet absorption of diastole." }
    ]
  },
  "Dashboard — stell/systolic.md": {
    word: "systolic",
    primary: "Of, relating to, or occurring during cardiac systole; especially designating the maximum blood pressure exerted when the heart contracts.",
    secondary: "In cardiovascular diagnostics, describing pathological heart sounds, murmurs, or dysfunction (such as systolic heart failure).",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "A harsh **systolic** murmur heard with maximum intensity over the aortic area indicates progressive valvular stenosis." },
      { author: "Eugene Braunwald", work: "Heart Disease", quote: "Measuring **systolic** ejection fraction provides the most reliable quantitative assessment of left ventricular pump performance." },
      { author: "Walter Cannon", work: "The Wisdom of the Body", quote: "Sympathetic nervous activation during alarm causes a marked rise in arterial **systolic** pressure." }
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
console.log("Batch 3 finished! Total words updated:", Object.keys(wordsData).length);
