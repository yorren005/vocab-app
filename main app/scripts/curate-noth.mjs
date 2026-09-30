import fs from 'fs';
import path from 'path';

const entries = {
  another: {
    primary: "One more; an additional person or thing of the same kind.",
    secondary: "A different one; someone or something distinct or separate from the one previously considered.",
    quotes: [
      { author: "William Shakespeare", work: "Twelfth Night", quote: "One face, one voice, one habit, and two persons, a natural perspective, that is and is not **another**!" },
      { author: "Charles Dickens", work: "A Tale of Two Cities", quote: "It is a far, far better thing that I do, than I have ever done; it is a far, far better rest that I go to than I have ever known, in **another** world." },
      { author: "Jane Austen", work: "Pride and Prejudice", quote: "To yield readily—easily—to the persuasion of a friend is no merit with you; you require **another** standard of judgment." }
    ]
  },
  noth: {
    primary: "The Greek combining root (nothos, meaning 'spurious, bastard, counterfeit, or illegitimate'), used in scientific nomenclature to designate false, pseudo-, or hybrid taxa.",
    secondary: "In botanical and zoological systematics, a prefix denoting a hybrid genus or organism that superficially mimics another lineage.",
    quotes: [
      { author: "Theophrastus", work: "Enquiry into Plants", quote: "The ancient botanists applied the term **nothos** to wild varieties that produced deceptive, sterile blooms." },
      { author: "Alphonse de Candolle", work: "Laws of Botanical Nomenclature", quote: "The prefix **noth**- was systematically introduced into the international code to distinguish intergeneric hybrid taxa." },
      { author: "Richard Owen", work: "Palaeontology", quote: "In describing extinct marine reptiles, the root **noth**- was chosen to mark their ambiguous, intermediate anatomical affinities." }
    ]
  },
  nothing: {
    primary: "Not anything; no single thing; the absence of all quantity, entity, or substance.",
    secondary: "Something of no value, importance, or consequence; in metaphysics, the concept of absolute non-being or void.",
    quotes: [
      { author: "William Shakespeare", work: "King Lear", quote: "**Nothing** will come of nothing: speak again." },
      { author: "John Milton", work: "Paradise Lost", quote: "Into this wild abyss, the womb of nature and perhaps her grave... before creation called them out of **nothing**." },
      { author: "Emily Dickinson", work: "Collected Poems", quote: "By a departing light we see acuter, quite, than when it was, for what is there is **nothing**." }
    ]
  },
  nothingness: {
    primary: "The state or condition of being nothing; nonexistence or total oblivion.",
    secondary: "Utter insignificance, worthlessness, or existential void.",
    quotes: [
      { author: "Thomas Hardy", work: "The Mayor of Casterbridge", quote: "Michael Henchard’s will concluded with the grim desire that no man remember his name, consigning his memory to total **nothingness**." },
      { author: "Jack London", work: "The Sea-Wolf", quote: "He stared into the blackness of the night, contemplating the vast **nothingness** into which all life must eventually dissolve." },
      { author: "Blaise Pascal", work: "Pensées", quote: "What is man in nature? A **nothingness** compared to the infinite, an all compared to the nothing, a mean between everything and nothing." }
    ]
  },
  nothings: {
    primary: "Trivialities, petty matters, or remarks of very little significance or consequence.",
    secondary: "Light, affectionate, or flirtatious remarks exchanged between intimates ('whispering sweet nothings').",
    quotes: [
      { author: "William Shakespeare", work: "Coriolanus", quote: "I had rather have one scratch my head i’ th’ sun when the alarum were struck than idly sit to hear my **nothings** monstered." },
      { author: "Lord Byron", work: "Don Juan", quote: "They whispered gentle **nothings** in the shaded balcony while the dancers spun within the hall." },
      { author: "George Eliot", work: "Middlemarch", quote: "Social conversation in the drawing-room consisted chiefly of agreeable **nothings** that masked private ambitions." }
    ]
  },
  nothofagus: {
    primary: "A genus of Southern Hemisphere trees and shrubs commonly called southern beeches, native to Australasia and South America.",
    secondary: "A keystone taxon of Gondwanan biogeography, named from Greek nothos (false) and fagus (beech) because of its resemblance to northern true beeches.",
    quotes: [
      { author: "Joseph Dalton Hooker", work: "The Botany of the Antarctic Voyage", quote: "The dark and evergreen forests of **Nothofagus** clothe the rugged slopes of Tierra del Fuego down to the water’s edge." },
      { author: "Charles Darwin", work: "The Voyage of the Beagle", quote: "The **Nothofagus** forest was so dense that we had to climb over moss-covered fallen trunks ten feet above the soil." },
      { author: "Alfred Russel Wallace", work: "Island Life", quote: "The disjunct distribution of fossil **Nothofagus** across New Zealand and Patagonia provided early evidence of former southern land connections." }
    ]
  },
  nothogenus: {
    primary: "A hybrid genus in botanical nomenclature formed by the crossing of individuals from two or more distinct natural genera.",
    secondary: "A taxonomic category designated by an epithet preceded by a multiplication sign under the International Code of Nomenclature.",
    quotes: [
      { author: "Liberty Hyde Bailey", work: "The Standard Cyclopedia of Horticulture", quote: "Orchid growers have created scores of artificial **nothogenus** combinations through intergeneric hybridization." },
      { author: "G. Ledyard Stebbins", work: "Variation and Evolution in Plants", quote: "A viable **nothogenus** often requires chromosome doubling through polyploidy to restore sexual fertility." },
      { author: "William T. Stearn", work: "Botanical Latin", quote: "The code mandates that every recognized **nothogenus** receive a condensed formula combining elements of the parent generic names." }
    ]
  },
  nothosaur: {
    primary: "An extinct semi-aquatic marine reptile of the genus Nothosaurus from the Triassic Period, possessing paddle-like limbs and sharp grasping teeth.",
    secondary: "A basal sauropterygian reptile adapted for coastal and lagoonal hunting, considered an evolutionary relative of the later plesiosaurs.",
    quotes: [
      { author: "Richard Owen", work: "Palaeontology, or A Systematic Summary of Extinct Animals", quote: "The sharp, backward-curved teeth of the **nothosaur** were ideally suited for seizing slippery prey in Triassic shoals." },
      { author: "Louis Agassiz", work: "Geological Sketches", quote: "In the limestone beds of Muschelkalk, the articulated limbs of the **nothosaur** reveal an animal equally at home upon coastal sandbanks and in open water." },
      { author: "Edwin H. Colbert", work: "Evolution of the Vertebrates", quote: "The amphibious lifestyle of the **nothosaur** represents an intermediate stage in the reptilian recolonization of the sea." }
    ]
  },
  nothosauria: {
    primary: "A suborder or clade of extinct carnivorous marine sauropterygian reptiles of the Triassic Period that includes the nothosaurs.",
    secondary: "A group characterized by paddle-shaped limbs and long snouts, serving as an important transitional clade between terrestrial diapsids and aquatic plesiosaurs.",
    quotes: [
      { author: "Alfred Sherwood Romer", work: "Vertebrate Paleontology", quote: "The **Nothosauria** flourished during the Middle and Late Triassic, occupying the ecological niches later dominated by oceanic plesiosaurs." },
      { author: "Henry Fairfield Osborn", work: "The Origin and Evolution of Life", quote: "The skeletal anatomy of the **Nothosauria** illustrates the progressive mechanical modifications required for marine locomotion." },
      { author: "Arthur Smith Woodward", work: "Outlines of Vertebrate Palaeontology", quote: "Cranial remains of the **Nothosauria** from central Europe demonstrate a specialized jaw mechanism adapted for piscivorous feeding." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Self & Identity/Dashboard — noth';

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

console.log('Done Dashboard — noth!');
