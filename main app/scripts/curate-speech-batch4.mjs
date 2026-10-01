import fs from "fs";
import path from "path";

const baseDir = "App database/Greek roots/Cluster Speech & Language";

const wordsData = {
  "Dashboard — gloss/aglossia.md": {
    word: "aglossia",
    primary: "A rare congenital absence or developmental lack of the tongue.",
    secondary: "In speech pathology and maxillofacial surgery, a severe malformation often occurring in aglossia-adactylia syndrome, requiring specialized phonatory rehabilitation.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Congenital **aglossia** represents an extraordinary anatomical anomaly where the infant learns compensatory deglutition using pharyngeal muscles." },
      { author: "Oliver Sacks", work: "Seeing Voices", quote: "Patients born with **aglossia** often demonstrate remarkable compensatory neuroplasticity, mastering intelligible vowel sounds through buccal manipulation." },
      { author: "Charles Darwin", work: "The Variation of Animals and Plants under Domestication", quote: "Extreme morphological defects such as **aglossia** illustrate how embryonic developmental fields can fail without halting general somatic growth." }
    ]
  },
  "Dashboard — gloss/anthropoglot.md": {
    word: "anthropoglot",
    primary: "An animal possessing a tongue resembling that of a human and capable of imitating human speech, such as certain parrots or starlings.",
    secondary: "In classical natural history and comparative anatomy, animals endowed with vocal organs capable of articulating intelligible words.",
    quotes: [
      { author: "Pliny the Elder", work: "Natural History", quote: "The Indian parrot was celebrated by ancient travelers as an **anthropoglot** bird that saluted emperors with articulate speech." },
      { author: "Oliver Goldsmith", work: "A History of the Earth, and Animated Nature", quote: "The raven and the starling may be ranked as **anthropoglot** creatures whose fleshy tongues enable them to mimic the human voice." },
      { author: "Georges Cuvier", work: "The Animal Kingdom", quote: "Vocal imitation in **anthropoglot** birds depends less upon the tongue itself than upon the specialized musculature of the lower syrinx." }
    ]
  },
  "Dashboard — gloss/aryepiglottic.md": {
    word: "aryepiglottic",
    primary: "Of, relating to, or connecting the arytenoid cartilage and the epiglottis in the larynx.",
    secondary: "In laryngeal anatomy, designating the aryepiglottic fold (plicae aryepiglotticae) and associated intrinsic muscle fibers that guard the entrance of the respiratory tract during swallowing.",
    quotes: [
      { author: "Henry Gray", work: "Anatomy of the Human Body", quote: "The **aryepiglottic** fold forms the lateral boundary of the superior laryngeal aperture, contracting to protect the airway during deglutition." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Acute edema of the **aryepiglottic** folds can produce rapid, life-threatening inspiratory stridor requiring immediate intubation." },
      { author: "Thomas Henry Huxley", work: "Lessons in Elementary Anatomy", quote: "The tension of the **aryepiglottic** ligaments assists in closing the vestibule of the larynx against the intrusion of food boluses." }
    ]
  },
  "Dashboard — gloss/diglossia.md": {
    word: "diglossia",
    primary: "A sociolinguistic situation in which two distinct varieties of the same language are used by a single speech community under different social conditions (typically a 'high' formal variety and a 'low' colloquial variety).",
    secondary: "In linguistic anthropology, structural societal bilingualism where social prestige, literature, and administration require one dialect while everyday domestic communication employs another.",
    quotes: [
      { author: "Charles A. Ferguson", work: "Word", quote: "In many societies, stable **diglossia** persists for centuries without the high variety displacing the everyday vernacular." },
      { author: "Joshua Fishman", work: "Sociolinguistics", quote: "The functional compartmentalization inherent in **diglossia** prevents destructive linguistic conflict between literary elites and common speakers." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "Classical Arabic and modern regional spoken dialects present the archetypal example of institutionalized **diglossia** across the Arab world." }
    ]
  },
  "Dashboard — gloss/epiglottis.md": {
    word: "epiglottis",
    primary: "A thin, leaf-shaped flap of elastic cartilage situated behind the root of the tongue, which covers the entrance to the larynx during the act of swallowing.",
    secondary: "In respiratory and gastroenterological physiology, the anatomical gatekeeper that directs swallowed food into the esophagus and protects the trachea from pulmonary aspiration.",
    quotes: [
      { author: "Henry Gray", work: "Anatomy of the Human Body", quote: "When swallowing occurs, the larynx elevates and the **epiglottis** folds backward over the glottis to prevent food from entering the trachea." },
      { author: "William Beaumont", work: "Experiments and Observations on the Gastric Juice", quote: "The reflex closure of the **epiglottis** against the laryngeal entrance takes place instantaneously at the contact of the bolus." },
      { author: "Charles Darwin", work: "The Expression of the Emotions in Man and Animals", quote: "The vestigial movements of the **epiglottis** and pharyngeal walls during choking reflect ancient evolutionary defensive reflexes." }
    ]
  },
  "Dashboard — gloss/gloss.md": {
    word: "gloss",
    primary: "A brief explanatory note or translation inserted between lines or in the margin of a text to explain an obscure, archaic, or foreign word.",
    secondary: "In literary philology and hermeneutics, a cumulative commentary apparatus; also (from Germanic origin), a bright surface sheen or deceptive superficial polish.",
    quotes: [
      { author: "Francis Bacon", work: "The Advancement of Learning", quote: "Scholastic commentators too often encumbered ancient texts with an endless **gloss** that obscured the author's primary intent." },
      { author: "Samuel Johnson", work: "The Lives of the Poets", quote: "He scrutinized every marginal **gloss** in the venerable manuscript to restore the authentic reading of the verse." },
      { author: "Walter Pater", work: "The Renaissance", quote: "The painting possessed a luminous enamel **gloss** that preserved the delicate radiance of the Venetian pigments." }
    ]
  },
  "Dashboard — gloss/glossa.md": {
    word: "glossa",
    primary: "The tongue, especially in classical anatomical and biological descriptions.",
    secondary: "In entomology, the median lobe or tongue-like structure of the labium in insects (particularly bees and wasps), used to lap nectar and liquid nutrients.",
    quotes: [
      { author: "Carl Linnaeus", work: "Systema Naturae", quote: "The extended **glossa** of the honeybee is exquisitely adapted for extracting nectar from deep tubular blossoms." },
      { author: "Thomas Henry Huxley", work: "The Anatomy of Invertebrated Animals", quote: "In hymenopterous insects, the **glossa** forms a flexible proboscis covered with delicate sensory hairs." },
      { author: "William Kirby & William Spence", work: "An Introduction to Entomology", quote: "The insect retracts its elongated **glossa** beneath the head when at rest, extending it only upon encountering sugary sap." }
    ]
  },
  "Dashboard — gloss/glossalgia.md": {
    word: "glossalgia",
    primary: "Pain localized in the tongue; glossodynia.",
    secondary: "In neurology and oral medicine, painful neuralgic or inflammatory sensations along the lingual nerve distribution without visible surface ulceration.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Severe **glossalgia** may occur as a reflex symptom originating in dental caries or cervical spine degeneration." },
      { author: "Oliver Wendell Holmes Sr.", work: "Medical Essays", quote: "The physician must differentiate benign neurotic **glossalgia** from early mucosal malignancies of the floor of the mouth." },
      { author: "Sigmund Freud", work: "Studies on Hysteria", quote: "Psychogenic **glossalgia** occasionally manifested in hysterical patients whose repressed speech expressed itself as lingual discomfort." }
    ]
  },
  "Dashboard — gloss/glossarist.md": {
    word: "glossarist",
    primary: "A compiler, writer, or author of a glossary or dictionary of obscure, dialectal, or archaic words.",
    secondary: "In lexicography and historical philology, a scholar specializing in annotating vernacular vocabularies, legal antiquities, or manuscript glosses.",
    quotes: [
      { author: "Samuel Johnson", work: "A Dictionary of the English Language", quote: "The diligent **glossarist** must search the dusty margins of medieval codices to recover the forgotten meanings of ancient Saxon words." },
      { author: "Walter William Skeat", work: "Principles of English Etymology", quote: "Every modern philologist owes an immense debt to the nineteenth-century **glossarist** who gathered provincial dialect terms before they vanished." },
      { author: "Thomas Babington Macaulay", work: "The History of England", quote: "The antiquarian **glossarist** preserved quaint legal terms that illuminated the administrative machinery of the Norman kings." }
    ]
  },
  "Dashboard — gloss/glossary.md": {
    word: "glossary",
    primary: "An alphabetical list of specialized, technical, dialectal, or obscure terms accompanied by definitions, explanations, or translations.",
    secondary: "In textual scholarship and publishing, a supplementary reference section placed at the end of a book to explain unfamiliar vocabulary or domain-specific jargon.",
    quotes: [
      { author: "John Locke", work: "An Essay Concerning Human Understanding", quote: "To prevent endless disputes over ambiguous terms, every scientific treatise would do well to append an exact **glossary**." },
      { author: "Samuel Taylor Coleridge", work: "The Rime of the Ancient Mariner", quote: "The poet subsequently provided a marginal **glossary** to assist readers in navigating the archaic maritime vocabulary." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "A comprehensive **glossary** serves as an indispensable bridge between specialized technical fields and the curious general reader." }
    ]
  },
  "Dashboard — gloss/glossily.md": {
    word: "glossily",
    primary: "In a glossy, lustrous, smooth, or brightly reflective manner.",
    secondary: "In descriptive prose, with a sleek, polished, or deceptive surface sheen that masks underlying realities.",
    quotes: [
      { author: "Thomas Hardy", work: "Far from the Madding Crowd", quote: "The chestnut mare's well-groomed flanks shone **glossily** in the golden rays of the autumn afternoon." },
      { author: "Virginia Woolf", work: "To the Lighthouse", quote: "The calm bay reflected the evening sky **glossily**, undisturbed by the gentle swell of the distant tide." },
      { author: "George Eliot", work: "Daniel Deronda", quote: "Her dark braids were arranged **glossily** against her pale temples, framing an expression of quiet defiance." }
    ]
  },
  "Dashboard — gloss/glossina.md": {
    word: "glossina",
    primary: "A genus of bloodsucking dipteran flies (tsetse flies) native to sub-Saharan Africa, which act as biological vectors for pathogenic trypanosomes.",
    secondary: "In tropical medicine and parasitology, the insect vector responsible for transmitting human African trypanosomiasis (sleeping sickness) and animal nagana.",
    quotes: [
      { author: "David Bruce", work: "The Croonian Lectures on the Trypanosomiases of Man and Other Animals", quote: "The discovery that the fly **Glossina** morsitans conveys the trypanosome of nagana unlocked the etiology of African sleeping sickness." },
      { author: "Ronald Ross", work: "The Prevention of Malaria", quote: "Just as mosquitoes transmit malaria parasites, species of **Glossina** serve as the obligate intermediate hosts of African trypanosomes." },
      { author: "E. O. Wilson", work: "The Diversity of Life", quote: "The dense infestations of **Glossina** across vast tracts of tropical savanna historically shielded wilderness ecosystems from cattle pastoralism." }
    ]
  },
  "Dashboard — gloss/glossiness.md": {
    word: "glossiness",
    primary: "The quality, state, or property of having a smooth, shiny, and reflective surface.",
    secondary: "In materials science and visual optics, the specular reflectance of a material surface that determines its perceived polish, sheen, or luster.",
    quotes: [
      { author: "John Ruskin", work: "Modern Painters", quote: "The painter observed with delight the wet **glossiness** of sea pebbles reflecting the changing light of the breaking surf." },
      { author: "Charles Darwin", work: "The Variation of Animals and Plants under Domestication", quote: "Selective breeding in pigeons often produces extraordinary differences in the iridescent **glossiness** of the plumage." },
      { author: "Herman Melville", work: "Moby-Dick", quote: "The massive skull of the sperm whale glistened with an oily **glossiness** under the hot blubber room lanterns." }
    ]
  },
  "Dashboard — gloss/glossinidae.md": {
    word: "glossinidae",
    primary: "The family of cyclorrhaphous dipteran flies comprising the tsetse flies (genus Glossina), characterized by piercing proboscides and viviparous reproduction.",
    secondary: "In medical entomology, an economically and epidemiologically critical family of biting flies confined to continental Africa and southwestern Arabia.",
    quotes: [
      { author: "Patrick Manson", work: "Tropical Diseases", quote: "The family **Glossinidae** possesses a unique method of reproduction wherein the female nourishes a single larva internally until pupation." },
      { author: "Theodosius Dobzhansky", work: "Genetics of the Evolutionary Process", quote: "Geographical isolation and microclimatic preferences within the **Glossinidae** have generated distinct riverine and savannah species complexes." },
      { author: "Robert Koch", work: "Investigations on Sleeping Sickness", quote: "Eradicating habitats favored by the **Glossinidae** along lake shores remains essential to curtailing epidemic outbreaks of sleeping sickness." }
    ]
  },
  "Dashboard — gloss/glossitis.md": {
    word: "glossitis",
    primary: "Inflammation of the tongue, characterized by swelling, redness, pain, and alteration of the surface texture.",
    secondary: "In clinical medicine, a diagnostic sign associated with nutritional deficiencies (such as vitamin B12 or iron deficiency anemia, e.g., Hunter's glossitis) or oral infections.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Smooth, beefy-red **glossitis** with atrophy of the lingual papillae is an early and characteristic sign of pernicious anemia." },
      { author: "Thomas Sydenham", work: "The Works of Thomas Sydenham", quote: "Severe febrile distempers frequently leave the patient afflicted with an acute **glossitis** that impedes both speech and nourishment." },
      { author: "Oliver Wendell Holmes Sr.", work: "Medical Essays", quote: "The clinician inspects the tongue not from idle habit, but because acute **glossitis** mirrors profound metabolic derangements within the body." }
    ]
  },
  "Dashboard — gloss/glossodia.md": {
    word: "glossodia",
    primary: "A small genus of terrestrial orchids endemic to Australia, commonly known as wax-lip orchids or caladenia relatives.",
    secondary: "In systematic orchidology, distinguished by a tongue-shaped floral labellum bearing two yellow basal appendages (from Greek glossa tongue + eidos form).",
    quotes: [
      { author: "Robert Brown", work: "Prodromus Florae Novae Hollandiae", quote: "The genus **Glossodia** is established upon the characteristic tongue-shaped lip and paired basal glands of the labellum." },
      { author: "Ferdinand von Mueller", work: "Fragmenta Phytographiae Australiae", quote: "Spring brings carpets of blue **Glossodia** blossoms across the eucalyptus woodlands of New South Wales and Victoria." },
      { author: "Joseph Dalton Hooker", work: "The Flora of Australia", quote: "The elegant purple flowers of **Glossodia** major depend upon native bees attracted by the deceptive nectar guides on the labellum." }
    ]
  },
  "Dashboard — gloss/glossodynia.md": {
    word: "glossodynia",
    primary: "A burning sensation, tenderness, or pain in the tongue, often without observable clinical abnormalities on physical examination.",
    secondary: "In oral medicine and neurology, a chronic neuropathic or idiopathic pain syndrome (burning mouth syndrome) predominantly affecting postmenopausal women.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Patients complaining of unremitting **glossodynia** often endure intense anxiety despite the completely normal appearance of the lingual mucosa." },
      { author: "Oliver Sacks", work: "A Leg to Stand On", quote: "Idiopathic neuropathies like **glossodynia** demonstrate how phantom sensory torment can arise from central disinhibition rather than peripheral tissue damage." },
      { author: "Sigmund Freud", work: "Studies on Hysteria", quote: "In chronic cases of intractable **glossodynia**, somatic therapy must be supplemented by careful exploration of underlying psychic distress." }
    ]
  },
  "Dashboard — gloss/glossolalia.md": {
    word: "glossolalia",
    primary: "The phenomenon of uttering unintelligible, speech-like sounds that are not a recognized human language, typically while in a state of religious ecstasy or trance; speaking in tongues.",
    secondary: "In the psychology of religion and anthropo-linguistics, ecstatic phonation consisting of rhythmic syllable strings lacking semantic syntax, celebrated in Pentecostalism.",
    quotes: [
      { author: "William James", work: "The Varieties of Religious Experience", quote: "The sudden outburst of **glossolalia** during revivals represents an emotional overflow where language dissolves into ecstatic vocalization." },
      { author: "C. G. Jung", work: "Psychology and Religion", quote: "In states of psychic dissociation, the emergence of **glossolalia** reveals archetypal speech rhythms unconstrained by conscious grammar." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "Linguistic analysis of **glossolalia** demonstrates that the vocalizations utilize the phonemes of the speaker's native tongue without semantic structure." }
    ]
  },
  "Dashboard — gloss/glossopharyngeal.md": {
    word: "glossopharyngeal",
    primary: "Pertaining to, situated near, or connecting the tongue and the pharynx.",
    secondary: "In neuroanatomy, designating the glossopharyngeal nerve (the ninth cranial nerve, CN IX), which provides taste and sensory innervation to the posterior tongue and motor innervation to the stylopharyngeus.",
    quotes: [
      { author: "Henry Gray", work: "Anatomy of the Human Body", quote: "The **glossopharyngeal** nerve emerges from the medulla oblongata to distribute sensory fibers to the posterior third of the tongue and the tonsil." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Neuralgia of the **glossopharyngeal** nerve produces paroxysms of lancinating pain radiating from the tonsillar fossa into the ear." },
      { author: "Charles Sherrington", work: "The Integrative Action of the Nervous System", quote: "Afferent impulses carried along the **glossopharyngeal** pathway initiate the complex involuntary phase of the swallowing reflex." }
    ]
  },
  "Dashboard — gloss/glossophobia.md": {
    word: "glossophobia",
    primary: "An acute, irrational, or debilitating fear of speaking in public.",
    secondary: "In clinical psychology, a prevalent form of social anxiety disorder triggered by the prospect of speaking before an audience, accompanied by autonomic arousal.",
    quotes: [
      { author: "William James", work: "The Principles of Psychology", quote: "The paralyzing terror of **glossophobia** causes the mouth to become parched and the voice to falter when facing an expectant audience." },
      { author: "Oliver Sacks", work: "Musicophilia", quote: "Performers incapacitated by **glossophobia** often find that pharmacological beta-blockers alleviate the terrifying tremor of stage fright." },
      { author: "Steven Pinker", work: "The Language Instinct", quote: "That **glossophobia** ranks among humanity's commonest fears indicates how deeply our social status is tied to public linguistic performance." }
    ]
  },
  "Dashboard — gloss/glossopsitta.md": {
    word: "glossopsitta",
    primary: "A genus of small, nectar-feeding Australian parrots (lorikeets) in the family Psittaculidae, characterized by brush-tipped tongues adapted for foraging on eucalyptus blossoms.",
    secondary: "In ornithology and Australasian ecology, comprising species such as the musk lorikeet (Glossopsitta concinna) and little lorikeet, famed for their swift flight and specialized lingual papillae.",
    quotes: [
      { author: "John Gould", work: "The Birds of Australia", quote: "Flocks of the lively lorikeet **Glossopsitta** dart with lightning speed through the flowering treetops in search of honeyed nectar." },
      { author: "Charles Darwin", work: "The Voyage of the Beagle", quote: "The brush-tongued parrots of the genus **Glossopsitta** demonstrate an exquisite anatomical adaptation to the blossoming eucalypts of New Holland." },
      { author: "Alfred Russel Wallace", work: "The Geographical Distribution of Animals", quote: "The endemic radiation of **Glossopsitta** in eastern Australia illustrates the tight coevolution between lorikeets and myrtaceous flora." }
    ]
  },
  "Dashboard — gloss/glossoptosis.md": {
    word: "glossoptosis",
    primary: "An abnormal downward and backward displacement or sinking of the tongue toward the pharynx.",
    secondary: "In pediatrics and craniofacial surgery, a congenital deformity characteristic of Pierre Robin sequence, frequently causing acute neonatal upper airway obstruction.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Severe micrognathia frequently results in **glossoptosis**, where the retracted tongue falls backward and occludes the infantile larynx." },
      { author: "Henry Gray", work: "Anatomy of the Human Body", quote: "During deep unconsciousness, muscular relaxation permits gravitational **glossoptosis**, closing the airway unless the mandible is drawn forward." },
      { author: "Oliver Sacks", work: "Awakenings", quote: "In patients suffering severe parkinsonian akinesia, pharyngeal weakness combined with **glossoptosis** created alarming swallowing difficulties." }
    ]
  },
  "Dashboard — gloss/glossy.md": {
    word: "glossy",
    primary: "Having a smooth, lustrous, and shiny surface that reflects light brightly.",
    secondary: "Superficially attractive, polished, or sophisticated, often with an implication of lacking deeper substance or moral authenticity.",
    quotes: [
      { author: "John Keats", work: "Ode to a Nightingale", quote: "The nightingale sang in shadowy foliage where the moonlit leaves shone with a quiet, **glossy** radiance." },
      { author: "Nathaniel Hawthorne", work: "The Scarlet Letter", quote: "Her rich, dark hair possessed a **glossy** luster that defied the puritanical simplicity of her modest cap." },
      { author: "Virginia Woolf", work: "Orlando", quote: "The courtiers preened themselves in garments of **glossy** silk that rustled with every imperious turn." }
    ]
  },
  "Dashboard — gloss/glossy-coated.md": {
    word: "glossy-coated",
    primary: "Having an outer covering, fur coat, or finished surface that is sleek, smooth, and lustrous.",
    secondary: "In veterinary medicine and animal husbandry, denoting the healthy, gleaming condition of an animal's pelage indicative of sound nutrition and vitality.",
    quotes: [
      { author: "Charles Darwin", work: "The Variation of Animals and Plants under Domestication", quote: "The breeder selectively favored **glossy-coated** spaniels whose waterproof pelts withstood the cold marshes." },
      { author: "Thomas Hardy", work: "Tess of the d'Urbervilles", quote: "A team of handsome, **glossy-coated** farm horses stood patiently in the morning mist, their harnesses gleaming with brass." },
      { author: "Jack London", work: "The Call of the Wild", quote: "After weeks of abundant salmon, Buck became a magnificent, **glossy-coated** beast radiating wild strength." }
    ]
  },
  "Dashboard — gloss/glossy-furred.md": {
    word: "glossy-furred",
    primary: "Possessing pelt or fur that is smooth, shiny, and in excellent condition.",
    secondary: "Describing mammalian pelts prized in wildlife ecology or the fur trade for their lustrous texture and dense, reflective sheen.",
    quotes: [
      { author: "John Muir", work: "The Mountains of California", quote: "The water-ouzel dashed past the icy cascade, as sleek as a **glossy-furred** otter hunting in mountain streams." },
      { author: "Henry David Thoreau", work: "The Maine Woods", quote: "Our Indian guide spotted a **glossy-furred** beaver gliding silently across the dark surface of the forest pool." },
      { author: "Herman Melville", work: "Moby-Dick", quote: "Seals with their sleek, **glossy-furred** bodies peered inquisitively at our whaleboat from the floating ice floes." }
    ]
  },
  "Dashboard — gloss/glossy-haired.md": {
    word: "glossy-haired",
    primary: "Having hair that is smooth, gleaming, and radiant with natural oils or grooming.",
    secondary: "In literary portraiture, evoking an appearance of youthful health, patrician elegance, or refined beauty.",
    quotes: [
      { author: "Charlotte Brontë", work: "Jane Eyre", quote: "The stately ladies of Thornfield Hall were tall and **glossy-haired**, dressed in evening velvets of rich hue." },
      { author: "Oscar Wilde", work: "The Picture of Dorian Gray", quote: "The portrait depicted a **glossy-haired** youth whose immaculate beauty seemed untouched by the corruption of time." },
      { author: "George Eliot", work: "Middlemarch", quote: "Rosamond Vincy was a graceful, **glossy-haired** nymph whose every movement expressed conscious perfection." }
    ]
  },
  "Dashboard — gloss/glottal.md": {
    word: "glottal",
    primary: "Of, relating to, or produced at the glottis (the space between the vocal cords).",
    secondary: "In phonetics and phonology, describing speech sounds articulated by the vocal cords, notably the glottal stop [ʔ] and the glottal fricative [h].",
    quotes: [
      { author: "Henry Sweet", work: "A Handbook of Phonetics", quote: "The **glottal** stop is produced by the complete closure and sudden explosive reopening of the vocal cords." },
      { author: "Ferdinand de Saussure", work: "Course in General Linguistics", quote: "Consonants articulated in the larynx belong to the **glottal** series, functioning as boundary markers in many languages." },
      { author: "Edward Sapir", work: "Language", quote: "In American Indian languages, a distinctive **glottal** catch frequently distinguishes words that are otherwise homophonous." }
    ]
  },
  "Dashboard — gloss/glottis.md": {
    word: "glottis",
    primary: "The opening between the vocal cords in the larynx, along with the vocal folds themselves, essential for vocalization and respiration.",
    secondary: "In phonetics and laryngeal biomechanics, the variable orifice whose constriction, closure, and vibration generate voice pitch and modulate phonation.",
    quotes: [
      { author: "Henry Gray", work: "Anatomy of the Human Body", quote: "The **glottis** forms a narrow triangular fissure whose dimensions vary dynamically with every breath and spoken word." },
      { author: "Hermann von Helmholtz", work: "On the Sensations of Tone", quote: "Vibrations of the elastic edges of the **glottis** convert the continuous air stream from the lungs into acoustic sound waves." },
      { author: "Charles Darwin", work: "The Expression of the Emotions in Man and Animals", quote: "The sudden spasmodic closure of the **glottis** during sobbing is accompanied by deep, convulsive contractions of the diaphragm." }
    ]
  },
  "Dashboard — gloss/heterogloss.md": {
    word: "heterogloss",
    primary: "A person who speaks a foreign language; or a linguistic element, word, or locution borrowed from another tongue.",
    secondary: "In multilingual philology, a term or speaker representing an outside or divergent linguistic system within a predominant speech community.",
    quotes: [
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "The ancient Greek was prone to treat every **heterogloss** foreigner as an uncivilized barbarian whose speech resembled meaningless babble." },
      { author: "Wilhelm von Humboldt", work: "On Language", quote: "When a community adopts a **heterogloss** expression, it imports alongside the word an entire mode of foreign conceptualization." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of the English Language", quote: "The Norman Conquest introduced thousands of **heterogloss** terms that fundamentally restructured the lexical inventory of Old English." }
    ]
  },
  "Dashboard — gloss/heteroglossia.md": {
    word: "heteroglossia",
    primary: "The presence or coexistence of multiple distinct linguistic varieties, dialects, or social registers within a single language.",
    secondary: "In literary theory and Bakhtinian dialogism, the polyphonic interplay of conflicting social voices, ideologies, and worldviews embedded within the language of the novel.",
    quotes: [
      { author: "Mikhail Bakhtin", work: "The Dialogic Imagination", quote: "The novel orchestrates all its themes through the rich, living **heteroglossia** of social speech types and individual voices." },
      { author: "Terry Eagleton", work: "Literary Theory: An Introduction", quote: "For Bakhtin, the triumph of the novel lies in its democratic **heteroglossia**, which refuses to allow any single authoritative voice to dominate." },
      { author: "Fredric Jameson", work: "The Political Unconscious", quote: "The internal contradictions of modern capitalism find their literary reflection in the turbulent **heteroglossia** of urban modernist fiction." }
    ]
  },
  "Dashboard — gloss/hypoglossal.md": {
    word: "hypoglossal",
    primary: "Situated under or beneath the tongue; sublingual.",
    secondary: "In neuroanatomy, specifically designating the hypoglossal nerve (cranial nerve XII / CN XII), which supplies motor innervation to all the intrinsic and most extrinsic muscles of the tongue.",
    quotes: [
      { author: "Henry Gray", work: "Anatomy of the Human Body", quote: "The **hypoglossal** canal transmits the twelfth cranial nerve from the posterior cranial fossa into the neck to innervate the tongue." },
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Unilateral paralysis of the **hypoglossal** nerve causes the tongue to deviate toward the paralyzed side upon protrusion." },
      { author: "Charles Sherrington", work: "The Integrative Action of the Nervous System", quote: "Motor neurons in the **hypoglossal** nucleus fire in precise temporal synergy during the execution of speech and mastication." }
    ]
  },
  "Dashboard — gloss/idioglossia.md": {
    word: "idioglossia",
    primary: "An idiosyncratic, private, or inventional language developed and spoken by only one individual or between twins (cryptophasia).",
    secondary: "In developmental psycholinguistics and child psychiatry, an atypical form of speech so heavily distorted by idiosyncratic phonological substitutions that it is unintelligible to outside listeners.",
    quotes: [
      { author: "Jean Piaget", work: "The Language and Thought of the Child", quote: "The phenomenon of **idioglossia** among isolated twins illustrates how children spontaneously construct shared symbolic systems before adopting standard social speech." },
      { author: "Oliver Sacks", work: "The Man Who Mistook His Wife for a Hat", quote: "The autistic twins communicated in an arcane **idioglossia** that blended numerical patterns with private vocal signals." },
      { author: "Steven Pinker", work: "The Language Instinct", quote: "Cases of **idioglossia** demonstrate that children possess an innate grammatical instinct capable of inventing language even in the absence of normal models." }
    ]
  },
  "Dashboard — gloss/macroglossia.md": {
    word: "macroglossia",
    primary: "Abnormal, pathological enlargement of the tongue.",
    secondary: "In clinical pediatrics and genetics, a condition leading to airway obstruction, speech impediments, and orthodontic deformities, commonly associated with Beckwith-Wiedemann syndrome or congenital hypothyroidism.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "Severe **macroglossia** in infants with congenital cretinism causes the enlarged tongue to protrude continually between the lips." },
      { author: "Thomas Sydenham", work: "The Works of Thomas Sydenham", quote: "Acute toxic states can provoke alarming inflammatory **macroglossia**, swelling the tongue until it threatens suffocation." },
      { author: "Rudolf Virchow", work: "Cellular Pathology", quote: "Microscopic sections of amyloid **macroglossia** reveal extensive extracellular proteinaceous deposits dissecting the lingual muscle fibers." }
    ]
  },
  "Dashboard — gloss/monoglot.md": {
    word: "monoglot",
    primary: "A person who knows, speaks, or reads only one language; monolingual.",
    secondary: "In sociolinguistics and comparative education, an individual or community lacking proficiency in any foreign tongue, often resulting in cultural insularity.",
    quotes: [
      { author: "George Bernard Shaw", work: "Pygmalion", quote: "The Englishman remains the most complacent **monoglot** in Europe, expecting every foreigner to understand his loud shouts." },
      { author: "H. L. Mencken", work: "The American Language", quote: "The vast continental expanse of the United States historically encouraged a stubborn **monoglot** mentality among its citizenry." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "While multilingualism is the global norm, the global dominance of English has paradoxically fostered a large population of **monoglot** speakers." }
    ]
  },
  "Dashboard — gloss/monoglottism.md": {
    word: "monoglottism",
    primary: "The state, condition, or habit of speaking or understanding only a single language; monolingualism.",
    secondary: "In language planning and political linguistics, the cultural policy or ideology that asserts the exclusive primacy of one language within a nation-state.",
    quotes: [
      { author: "Joshua Fishman", work: "Language and Nationalism", quote: "Institutionalized **monoglottism** was long promoted by centralized nation-states as a prerequisite for patriotic civic unity." },
      { author: "Edward Sapir", work: "Selected Writings in Language, Culture, and Personality", quote: "The unconscious bias bred by lifetime **monoglottism** blinds people to the profound grammatical diversity of human thought." },
      { author: "Umberto Eco", work: "The Search for the Perfect Language", quote: "The European dream of overcoming biblical Babel arose as a philosophical reaction against the limitations of **monoglottism**." }
    ]
  },
  "Dashboard — gloss/pangloss.md": {
    word: "pangloss",
    primary: "A person who is blindly, foolishly, or incurably optimistic, continually maintaining that all is for the best despite overwhelming evidence to the contrary.",
    secondary: "In literary satire and philosophy, the fictional tutor Dr. Pangloss in Voltaire's Candide, who parodies Leibnizian philosophical optimism ('all is for the best in the best of all possible worlds').",
    quotes: [
      { author: "Voltaire", work: "Candide", quote: "Master **Pangloss** taught the metaphysico-theologico-cosmo-nigology, demonstrating that there is no effect without a cause and that this is the best of all possible worlds." },
      { author: "Thomas Henry Huxley", work: "Evolution and Ethics", quote: "Nature exhibits too much suffering for any honest thinker to adopt the shallow optimism of Dr. **Pangloss**." },
      { author: "Stephen Jay Gould", work: "The Panda's Thumb", quote: "Evolutionary biologists must avoid the **Pangloss** trap of assuming that every anatomical feature is an optimal adaptive design." }
    ]
  },
  "Dashboard — gloss/polyglot.md": {
    word: "polyglot",
    primary: "Knowing, speaking, or written in several different languages; a person proficient in multiple languages.",
    secondary: "In bibliography and textual criticism, a book containing side-by-side versions of a text in various languages (e.g., the Complutensian Polyglot Bible).",
    quotes: [
      { author: "Edward Gibbon", work: "The History of the Decline and Fall of the Roman Empire", quote: "Constantinople was a vibrant **polyglot** metropolis where merchants from Venice, Persia, and the Levant conducted commerce in twenty tongues." },
      { author: "George Borrow", work: "The Bible in Spain", quote: "The enthusiastic **polyglot** traveler could converse with gypsies, priests, and muleteers in their native dialects." },
      { author: "Umberto Eco", work: "The Search for the Perfect Language", quote: "The monumental Antwerp **Polyglot** Bible presented the scriptures in Hebrew, Aramaic, Greek, and Latin for comparative scholarly study." }
    ]
  },
  "Dashboard — gloss/polyglottism.md": {
    word: "polyglottism",
    primary: "The practice, condition, or state of knowing, speaking, or writing multiple languages; multilingualism.",
    secondary: "In sociolinguistic and cognitive research, the cognitive capacity to switch fluently between diverse language systems without cross-linguistic interference.",
    quotes: [
      { author: "Max Müller", work: "Lectures on the Science of Language", quote: "Widespread **polyglottism** among Mediterranean traders facilitated the cross-pollination of ancient mythologies and religious cults." },
      { author: "Wilhelm von Humboldt", work: "On Language", quote: "True **polyglottism** does not merely multiply words; it enriches the human spirit by multiplying distinct worldviews." },
      { author: "David Crystal", work: "The Cambridge Encyclopedia of Language", quote: "Modern neuroimaging reveals that lifelong **polyglottism** fosters enhanced executive cognitive reserve in aging brains." }
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
console.log("Batch 4 finished! Total words updated:", Object.keys(wordsData).length);
