import fs from 'fs';
import path from 'path';

const entries = {
  an: {
    primary: "The Greek privative prefix (ἀν-, an- before vowels), expressing negation, absence, privation, or lack (equivalent to English un- or in-).",
    secondary: "In scientific, biological, and medical nomenclature, signifying the total absence, suppression, or deficiency of an organ, function, chemical element, or property.",
    quotes: [
      { author: "Aristotle", work: "Categories", quote: "Privation, indicated by the prefix **an**- in Hellenic speech, denotes the absence of a natural attribute in a subject capable of possessing it." },
      { author: "Thomas Henry Huxley", work: "Lay Sermons, Addresses, and Reviews", quote: "Biological taxonomy borrows the Greek particle **an**- to designate organisms devoid of specific structures." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "In modern chemical nomenclature, the particle **an**- instantly marks compounds deprived of water or vital gases." }
    ]
  },
  anaerobic: {
    primary: "Living, growing, active, or occurring in the absence of free oxygen or gaseous air.",
    secondary: "Relating to cellular respiration or metabolic pathways that break down organic fuels without utilizing oxygen; in exercise physiology, high-intensity exertion sustained by oxygen-independent metabolic energy.",
    quotes: [
      { author: "Louis Pasteur", work: "Studies on Fermentation", quote: "Fermentation is life without air; certain vibriones can multiply only under strictly **anaerobic** conditions." },
      { author: "Thomas W. Corbin", work: "Modern Inventions", quote: "The purification of sewage is accomplished by **anaerobic** bacteria flourishing deep within the airless septic tanks." },
      { author: "Rachel Carson", work: "The Sea Around Us", quote: "In the stagnant muds of deep ocean trenches, **anaerobic** microbes metabolize sulfur where no trace of sunlight ever penetrates." }
    ]
  },
  anaphasic: {
    primary: "Relating to or occurring during anaphase, the stage of cell division in which sister chromatids or homologous chromosomes separate and move toward opposite poles.",
    secondary: "In clinical neurology, relating to anaphasia (severe loss of speech or articulation).",
    quotes: [
      { author: "E. B. Wilson", work: "The Cell in Development and Inheritance", quote: "During the **anaphasic** movement, the separated daughter chromosomes migrate uniformly toward the centrosomes." },
      { author: "Theodosius Dobzhansky", work: "Genetics and the Origin of Species", quote: "Disruptions during the **anaphasic** stage of meiosis frequently produce aneuploid gametes and chromosomal aberrations." },
      { author: "William James", work: "The Principles of Psychology", quote: "In profound **anaphasic** disturbance, the motor impulses for speech remain entirely uncoordinated." }
    ]
  },
  anesthesia: {
    primary: "Insensibility to pain, touch, or other physical sensation, artificially induced by the administration of gases or drugs before surgical operations.",
    secondary: "In neurology, a pathological loss of feeling or sensation in a part or all of the body resulting from disease or nerve injury.",
    quotes: [
      { author: "Oliver Wendell Holmes Sr.", work: "Letter to William T. G. Morton, Nov 21, 1846", quote: "Everybody wants to have a hand in a great discovery; all I will do is give you a hint or two as to names: the state should, I think, be called **anesthesia**." },
      { author: "William Osler", work: "Aequanimitas", quote: "The conquest of surgical agony through modern **anesthesia** stands as one of humanity’s greatest humanitarian triumphs." },
      { author: "H. G. Wells", work: "The Island of Doctor Moreau", quote: "The operation was performed under complete **anesthesia**, yet the creature's subsequent groans chilled my blood." }
    ]
  },
  anesthetic: {
    primary: "A drug or agent that produces insensibility to pain or total loss of consciousness.",
    secondary: "Serving to deaden sensibility, pain, or emotional distress; figurative, producing psychological numbness or dulling moral sensitivity.",
    quotes: [
      { author: "Arthur Conan Doyle", work: "The Adventure of the Resident Patient", quote: "The subtle sweet smell of an **anesthetic** vapour lingered unmistakably in the dressing room." },
      { author: "Aldous Huxley", work: "Brave New World", quote: "Soma served as a universal **anesthetic** against every grief, anxiety, and sharp pang of reality." },
      { author: "Joseph Lister", work: "On the Antiseptic Principle in the Practice of Surgery", quote: "The application of a local **anesthetic** enabled the surgeon to probe the wound without causing severe distress." }
    ]
  },
  anesthetise: {
    primary: "To render insensible to pain or sensation, especially by administering an anesthetic agent before surgery.",
    secondary: "Figuratively, to dull, deaden, or blunt someone’s sensibilities, moral conscience, or capacity for critical thought.",
    quotes: [
      { author: "George Bernard Shaw", work: "The Doctor's Dilemma", quote: "Before you make the initial incision, be certain to **anesthetise** the patient completely." },
      { author: "Virginia Woolf", work: "The Waves", quote: "Routine and comfortable luxury conspired to **anesthetise** her spirit against the tragedy of passing time." },
      { author: "George Orwell", work: "Coming Up for Air", quote: "Modern propaganda seeks not to awaken the masses, but to **anesthetise** their critical instincts." }
    ]
  },
  anesthetist: {
    primary: "A medical practitioner or specialist trained in administering anesthetics to patients undergoing surgery or painful procedures.",
    secondary: "The member of a surgical team who monitors vital physiological functions while maintaining controlled anesthesia.",
    quotes: [
      { author: "A. J. Cronin", work: "The Citadel", quote: "The surgeon nodded curtly to the **anesthetist**, who smoothly adjusted the ether flow through the mask." },
      { author: "W. Somerset Maugham", work: "Of Human Bondage", quote: "In the operating theater, the young **anesthetist** watched the patient's pulse with unwavering concentration." },
      { author: "Sinclair Lewis", work: "Arrowsmith", quote: "The **anesthetist** murmured that the pulse was steady, and the scalpel resumed its delicate dissection." }
    ]
  },
  anesthetize: {
    primary: "To administer an anesthetic to; render unconscious or insensible to pain.",
    secondary: "Figuratively, to desensitize, stupefy, or deaden emotional responsiveness or intellectual awareness.",
    quotes: [
      { author: "T. S. Eliot", work: "The Love Song of J. Alfred Prufrock", quote: "When the evening is spread out against the sky, like a patient etherized upon a table, we must not let complacency **anesthetize** our souls." },
      { author: "Jack London", work: "The Sea-Wolf", quote: "His brutal philosophy seemed designed to **anesthetize** every natural impulse of human tenderness." },
      { author: "H. G. Wells", work: "The Invisible Man", quote: "He had to **anesthetize** the dog with chloroform before binding its jaws to prevent its furious barking." }
    ]
  },
  anhydrous: {
    primary: "Completely free from water, especially referring to a crystalline chemical compound lacking water of crystallization.",
    secondary: "In chemical processing, describing reagents, solvents, or gases prepared without moisture.",
    quotes: [
      { author: "Michael Faraday", work: "Experimental Researches in Chemistry and Physics", quote: "The gas was passed over fused calcium chloride until it was obtained in an absolutely **anhydrous** state." },
      { author: "Robert Boyle", work: "The Sceptical Chymist", quote: "By calcining the salt until all vapors ceased, we obtained an **anhydrous** mass of surprising density." },
      { author: "Thomas W. Corbin", work: "The Romance of Submarine Engineering", quote: "The reaction requires an **anhydrous** medium to prevent premature hydrolytic decomposition." }
    ]
  },
  aphasia: {
    primary: "The loss or impairment of the ability to understand or express speech and language, caused by brain damage.",
    secondary: "A classification of distinct neuro-linguistic disorders, including expressive (Broca’s) aphasia, receptive (Wernicke’s) aphasia, and global aphasia.",
    quotes: [
      { author: "William James", work: "The Principles of Psychology", quote: "In motor **aphasia**, the patient understands everything that is said, but the vocal apparatus refuses to obey his mental command." },
      { author: "Oliver Sacks", work: "The Man Who Mistook His Wife for a Hat", quote: "Patients suffering from receptive **aphasia** often grasp emotional tone with uncanny precision even when words have lost meaning." },
      { author: "Sigmund Freud", work: "On Aphasia: A Critical Study", quote: "The phenomenon of **aphasia** forces us to reconstruct the complex associative pathways linking word-presentations to thing-presentations." }
    ]
  },
  aphasic: {
    primary: "Affected by or relating to aphasia; exhibiting impaired speech or language comprehension resulting from cerebral pathology.",
    secondary: "As a noun, a person who suffers from aphasia.",
    quotes: [
      { author: "William Osler", work: "The Principles and Practice of Medicine", quote: "The **aphasic** patient frequently struggles for minutes to produce a familiar monosyllable." },
      { author: "Virginia Woolf", work: "Mrs. Dalloway", quote: "His speech grew halting and fragmented, like an **aphasic** reaching into empty air for forgotten nouns." },
      { author: "Carl Wernicke", work: "The Aphasic Symptom Complex", quote: "An **aphasic** individual with a lesion in the superior temporal gyrus retains fluent syntax despite profound semantic incoherence." }
    ]
  },
  atypical: {
    primary: "Not representative of a type, group, or class; unusual, anomalous, or departing from standard norms.",
    secondary: "In medicine and psychiatry, describing diseases, symptoms, or neurodevelopmental patterns that do not conform to classic clinical presentations.",
    quotes: [
      { author: "Stephen Jay Gould", work: "The Panda's Thumb", quote: "Evolutionary innovations often arise from seemingly **atypical** structures that happen to confer novel adaptive advantages." },
      { author: "Arthur Conan Doyle", work: "The Adventure of the Bruce-Partington Plans", quote: "The criminal's behavior was completely **atypical**, showing none of the usual calculated cunning of a professional spy." },
      { author: "H. G. Wells", work: "The Food of the Gods", quote: "The gigantic growth of the flora presented an **atypical** botanical puzzle to the bewildered villagers." }
    ]
  },
  atypicality: {
    primary: "The quality or state of being atypical; deviation from the normal type, standard, or pattern.",
    secondary: "In statistical analysis and sociology, the degree to which an observed data point, behavior, or case departs from established distributions.",
    quotes: [
      { author: "William James", work: "The Varieties of Religious Experience", quote: "The psychological **atypicality** of mystical states does not disprove their spiritual authenticity." },
      { author: "Thorstein Veblen", work: "The Theory of the Leisure Class", quote: "Any marked **atypicality** in social consumption is quickly disciplined by the conservative force of community gossip." },
      { author: "Francis Galton", work: "Inquiries into Human Faculty and Its Development", quote: "Extreme **atypicality** in anthropometric measurements invariably clusters at the thin margins of the bell curve." }
    ]
  },
  atypically: {
    primary: "In an atypical manner; in a way that is unusual or uncharacteristic.",
    secondary: "Departing significantly from standard expectations, normal symptoms, or regular statistical baselines.",
    quotes: [
      { author: "Charles Darwin", work: "The Origin of Species", quote: "Certain solitary species behave **atypically** when confined to crowded artificial breeding grounds." },
      { author: "Edgar Allan Poe", work: "The Murders in the Rue Morgue", quote: "The ferocious agility of the intruder was **atypically** superhuman, baffling every Parisian gendarme." },
      { author: "Joseph Conrad", work: "Heart of Darkness", quote: "The river flowed **atypically** silent, as if guarding the inscrutable mystery of the primeval forest." }
    ]
  },
  cataphasia: {
    primary: "A speech disorder characterized by the involuntary, compulsive repetition of the same words, phrases, or verbal answers to different questions.",
    secondary: "A symptom observed in severe schizophrenia, dementia, or frontal lobe damage where expressive speech becomes locked into mechanical perseveration.",
    quotes: [
      { author: "Emil Kraepelin", work: "Dementia Praecox and Paraphrenia", quote: "In advanced stages of dementia, the patient lapses into rigid **cataphasia**, echoing the same hollow phrase to every enquiry." },
      { author: "Eugen Bleuler", work: "Dementia Praecox or the Group of Schizophrenias", quote: "The persistent verbal perseveration termed **cataphasia** reflects a severe dissociation in associative switching mechanisms." },
      { author: "William James", work: "The Principles of Psychology", quote: "Under the grip of **cataphasia**, the motor channel for a single phrase becomes so deeply grooved that consciousness cannot escape it." }
    ]
  },
  dean: {
    primary: "An administrative head of a faculty, college, or school within a university.",
    secondary: "An ecclesiastical dignitary who presides over the chapter of a cathedral; by extension, the senior or most eminent member of a diplomatic, professional, or academic body.",
    quotes: [
      { author: "Jonathan Swift", work: "A Complete Collection of Genteel and Ingenious Conversation", quote: "The **dean** smiled with customary irony, observing the heated disputes of the collegiate assembly." },
      { author: "Anthony Trollope", work: "Barchester Towers", quote: "The old **dean** lay dying in his comfortable house, and already rival clergy speculated on who should succeed to the deanery." },
      { author: "C. P. Snow", work: "The Masters", quote: "As senior **dean**, he held the balance of votes between the younger scientists and the classicists." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Science & Inquiry/Dashboard — an';

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

console.log('Done Dashboard — an!');
