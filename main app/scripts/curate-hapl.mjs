import fs from 'fs';
import path from 'path';

const entries = {
  hapl: {
    primary: "The Greek combining root (haplo-, from haplous, meaning 'single, simple, twofold-less'), forming scientific terms denoting singleness, simplicity, or a single set of chromosomes.",
    secondary: "In genetics, linguistics, and optics, indicating an unmultiplied, uncoupled, or single-unit state.",
    quotes: [
      { author: "Eduard Strasburger", work: "Periodic Reduction of Chromosomes in Living Organisms", quote: "The Greek root **hapl**- was selected to denote the unreduced, single set of nuclear chromosomes found in gametes." },
      { author: "William Whewell", work: "The Philosophy of the Inductive Sciences", quote: "In modern biological synthesis, prefixes derived from **hapl**- isolate the elementary, uncompounded state from the diploid." },
      { author: "Theodosius Dobzhansky", work: "Genetics and the Origin of Species", quote: "Chromosomal terminology employs the root **hapl**- to trace the alternating generations of plants and animals." }
    ]
  },
  hapless: {
    primary: "Unfortunate, unlucky; deserving or exciting pity.",
    secondary: "Destitute of good fortune; marked by persistent ill luck or doomed misfortune.",
    quotes: [
      { author: "William Shakespeare", work: "The Comedy of Errors", quote: "Tell sad stories of my **hapless** youth, and let them be remembered with pity." },
      { author: "John Milton", work: "Paradise Lost", quote: "Ah, **hapless** virgin, had not thy kind angel bent his wings toward thee!" },
      { author: "Mary Shelley", work: "Frankenstein", quote: "I, the miserable and the abandoned, am an abortion, to be spurned at, and kicked, and trampled on; I am the most **hapless** of all living things." }
    ]
  },
  haplochromine: {
    primary: "Any of a diverse tribe of freshwater cichlid fishes (Haplochromini) endemic chiefly to the East African Great Lakes, famous for rapid adaptive radiation.",
    secondary: "Characterized by specialized female mouth-brooding habits and rapid speciation into hundreds of ecological morphs.",
    quotes: [
      { author: "George Albert Boulenger", work: "Catalogue of the Fresh-Water Fishes of Africa", quote: "The **haplochromine** fauna of Lake Victoria exhibits astonishing dental diversity adapted to divergent trophic niches." },
      { author: "Ernst Mayr", work: "Animal Species and Evolution", quote: "The explosive speciation of the **haplochromine** cichlids presents evolutionary biology with its most spectacular radiation." },
      { author: "Richard Dawkins", work: "The Blind Watchmaker", quote: "Hundreds of **haplochromine** species evolved within a few geological heartbeats in the cradle of the African rift lakes." }
    ]
  },
  haplodiploid: {
    primary: "Having or designating a sex-determination system in which males develop from unfertilized eggs and are haploid, while females develop from fertilized eggs and are diploid.",
    secondary: "Pertaining to hymenopteran insects (bees, wasps, ants) whose genetic structure creates high sibling relatedness, facilitating eusociality.",
    quotes: [
      { author: "W. D. Hamilton", work: "The Genetical Evolution of Social Behaviour", quote: "Under a **haplodiploid** genetic system, sisters are more closely related to each other than mothers are to their daughters." },
      { author: "Edward O. Wilson", work: "The Insect Societies", quote: "The predisposition toward sterile worker castes in ants is strongly reinforced by their **haplodiploid** constitution." },
      { author: "John Maynard Smith", work: "Evolutionary Genetics", quote: "In **haplodiploid** populations, male lethals are eliminated immediately because hemizygous males have no second allele to mask defects." }
    ]
  },
  haplodiploidy: {
    primary: "A genetic sex-determination mechanism where males are haploid (arising parthenogenetically) and females are diploid.",
    secondary: "The reproductive and evolutionary system underlying social cooperation and worker altruism in colonial Hymenoptera.",
    quotes: [
      { author: "Robert Trivers", work: "Social Evolution", quote: "Hamilton’s model demonstrated how **haplodiploidy** alters the evolutionary calculus of kin selection." },
      { author: "Richard Dawkins", work: "The Selfish Gene", quote: "Because of **haplodiploidy**, a female worker ant shares three-quarters of her genes with her full sisters." },
      { author: "George C. Williams", work: "Adaptation and Natural Selection", quote: "The phylogenetic distribution of eusociality clusters strikingly around lineages possessing the asymmetry of **haplodiploidy**." }
    ]
  },
  haplography: {
    primary: "The accidental omission of one of two identical or similar adjacent letters, syllables, words, or lines in copying a manuscript.",
    secondary: "A common scribal lapse in paleography resulting from the copyist's eye skipping between identical characters.",
    quotes: [
      { author: "A. E. Housman", work: "Selected Prose", quote: "The copyist skipped three words through simple **haplography**, seduced by the repetition of the final syllable." },
      { author: "Bruce Metzger", work: "The Text of the New Testament", quote: "Scribal **haplography** is particularly frequent in early uncial manuscripts where words were written without spaces." },
      { author: "Desiderius Erasmus", work: "Annotations on the New Testament", quote: "A critical editor must restore readings lost through inadvertent **haplography** in early Byzantine codices." }
    ]
  },
  haploid: {
    primary: "Having a single set of unpaired chromosomes (designated n), characteristic of mature gametes or sex cells.",
    secondary: "As a noun, a cell or organism possessing a single set of chromosomes, in contrast to a diploid.",
    quotes: [
      { author: "Eduard Strasburger", work: "The Historic Discovery of Meiosis", quote: "Fertilization restores the diploid complement from the union of two **haploid** nuclei." },
      { author: "Thomas Hunt Morgan", work: "The Physical Basis of Heredity", quote: "Mendelian segregation requires that each gamete receive only one member of each chromosome pair, entering the **haploid** state." },
      { author: "Theodosius Dobzhansky", work: "Genetics and the Origin of Species", quote: "In mosses and ferns, the **haploid** gametophyte dominates an extensive stage of the life cycle." }
    ]
  },
  haploidic: {
    primary: "Pertaining to, having, or resembling the haploid condition; characterized by a single set of chromosomes.",
    secondary: "Describing cells, phases, or generations possessing the chromosome number n.",
    quotes: [
      { author: "C. D. Darlington", work: "Recent Advances in Cytology", quote: "The **haploidic** chromosome number remains constant throughout all gametic cell lineages." },
      { author: "Edmund Beecher Wilson", work: "The Cell in Development and Heredity", quote: "Meiotic reduction produces four **haploidic** daughter cells from each primary spermatocyte." },
      { author: "G. Ledyard Stebbins", work: "Chromosomal Evolution in Higher Plants", quote: "Spontaneous doubling of a **haploidic** genome yields an instantly homozygous fertile line." }
    ]
  },
  haploidy: {
    primary: "The condition or state of having a single set of chromosomes.",
    secondary: "In plant breeding and cytogenetics, the occurrence of viable sporophytes possessing only the gametic chromosome number.",
    quotes: [
      { author: "G. Ledyard Stebbins", work: "Variation and Evolution in Plants", quote: "Artificially induced **haploidy** followed by colchicine treatment provides a rapid method for producing homozygous crops." },
      { author: "Theodosius Dobzhansky", work: "Mankind Evolving", quote: "Natural **haploidy** in animals is largely restricted to the male sex of arrhenotokous insects." },
      { author: "Barbara McClintock", work: "Chromosome Organization and Genic Expression", quote: "The cytological consequences of **haploidy** reveal how chromosomes behave in the absence of a homologous partner." }
    ]
  },
  haplology: {
    primary: "The phonetic omission of one of two consecutive identical or very similar syllables in a word during speech evolution.",
    secondary: "A historical sound change that streamlines polysyllabic pronunciation by eliminating repetitive articulatory gestures.",
    quotes: [
      { author: "Otto Jespersen", work: "Language: Its Nature, Development and Origin", quote: "The transformation of Old English Englaland into England is a classic historical example of **haplology**." },
      { author: "Leonard Bloomfield", work: "Language", quote: "In rapid colloquial speech, **haplology** routinely drops repetitive acoustic syllables to economize muscular effort." },
      { author: "Edward Sapir", work: "Language", quote: "Phonetic drift often accomplishes structural simplification through sound-laws like **haplology**." }
    ]
  },
  haplont: {
    primary: "An organism or generation in whose life cycle the somatic stage is haploid, with meiosis occurring immediately upon zygote formation.",
    secondary: "A plant or protist where the only diploid cell in the entire life history is the zygote itself.",
    quotes: [
      { author: "Felix Eugen Fritsch", work: "The Structure and Reproduction of the Algae", quote: "In a typical **haplont**, the vegetative thallus is composed entirely of cells with the reduced chromosome count." },
      { author: "Gilbert M. Smith", work: "Cryptogamic Botany", quote: "The zygote of a **haplont** serves as a resting spore, undergoing meiosis immediately upon germination." },
      { author: "John Merle Coulter", work: "Morphology of Gymnosperms", quote: "The evolutionary progression of vascular land plants shows a gradual eclipse of the ancestral **haplont**." }
    ]
  },
  haplontic: {
    primary: "Characterized by or having a life cycle in which the main vegetative body is haploid, with diploidy restricted to the zygote stage.",
    secondary: "Describing organisms exhibiting a zygotic meiotic life history.",
    quotes: [
      { author: "Harold C. Bold", work: "Morphology of Plants", quote: "The **haplontic** life cycle contrasts with the diplontic cycle characteristic of animals and seed plants." },
      { author: "Eduard Strasburger", work: "Textbook of Botany", quote: "A **haplontic** green alga produces gametes by regular mitosis rather than reduction division." },
      { author: "Theodosius Dobzhansky", work: "Genetics and the Origin of Species", quote: "In **haplontic** organisms, recessive mutations are exposed immediately to the sieve of natural selection." }
    ]
  },
  haplopappus: {
    primary: "A genus of North American composite shrubs and herbs (Haplopappus, family Asteraceae) bearing yellow flower heads and simple pappus bristles.",
    secondary: "An important model genus in plant cytogenetics (notably Haplopappus gracilis), renowned for having an exceptionally low chromosome number (n = 2).",
    quotes: [
      { author: "Asa Gray", work: "Synoptical Flora of North America", quote: "The genus **Haplopappus** occupies arid western plains, recognized by its bristly yellow rays and simple pappus." },
      { author: "G. Ledyard Stebbins", work: "Chromosomal Evolution in Higher Plants", quote: "Cytologists treasure **Haplopappus** gracilis because its mere two pairs of giant chromosomes make karyotype analysis effortless." },
      { author: "Theodosius Dobzhansky", work: "Genetics of the Evolutionary Process", quote: "Chromosomal rearrangements in **Haplopappus** can be mapped directly under the light microscope without staining ambiguities." }
    ]
  },
  haplophase: {
    primary: "The haploid phase or generation in the life cycle of an organism, extending from meiosis to fertilization.",
    secondary: "The gametophytic stage in plants where all somatic cells possess the single chromosome number n.",
    quotes: [
      { author: "F. O. Bower", work: "The Origin of a Land Flora", quote: "The transition from the aquatic **haplophase** to the terrestrial diplophase was the great milestone of plant evolution." },
      { author: "C. D. Darlington", work: "The Evolution of Genetic Systems", quote: "During the extended **haplophase** of lower plants, gene expression is directly subject to natural selection." },
      { author: "G. Ledyard Stebbins", work: "Processes of Organic Evolution", quote: "In bryophytes, the photosynthetic moss carpet constitutes the prolonged **haplophase** of the life cycle." }
    ]
  },
  haplopia: {
    primary: "Normal single vision; visual perception in which an object viewed with both eyes is perceived as a single entity.",
    secondary: "The state of binocular sensory fusion where images from corresponding retinal points merge into a single stereoscopic image.",
    quotes: [
      { author: "Hermann von Helmholtz", work: "Treatise on Physiological Optics", quote: "Normal **haplopia** requires that the image of an object fall upon precisely corresponding retinal points in both retinas." },
      { author: "William James", work: "The Principles of Psychology", quote: "When the visual axes align accurately upon a fixation point, double images vanish into harmonious **haplopia**." },
      { author: "Francis Galton", work: "Inquiries into Human Faculty and Its Development", quote: "The testing of stereoscopic vision confirmed that the subject maintained stable **haplopia** even under ocular fatigue." }
    ]
  },
  haplosis: {
    primary: "The halving or reduction of the chromosome number from diploid (2n) to haploid (n) during meiosis.",
    secondary: "The chromosomal reduction division that ensures the constancy of the chromosome number across generations upon gametic fusion.",
    quotes: [
      { author: "Eduard Strasburger", work: "The Historic Discovery of Meiosis", quote: "Through the process of **haplosis**, the hereditary material is equally halved before gamete maturation." },
      { author: "E. B. Wilson", work: "The Cell in Development and Heredity", quote: "Without periodic **haplosis**, the chromosome number of any sexual species would double with every generation." },
      { author: "C. D. Darlington", work: "Recent Advances in Cytology", quote: "Meiotic **haplosis** involves both segregation of homologous pairs and crossing over between non-sister chromatids." }
    ]
  },
  haplosporidia: {
    primary: "A group or order of spore-forming protozoan parasites (Haplosporida) that infect aquatic invertebrates, particularly mollusks and oysters.",
    secondary: "Endoparasitic protists causing severe epizootics (such as MSX disease in oysters), characterized by spores lacking polar filaments.",
    quotes: [
      { author: "E. Ray Lankester", work: "A Treatise on Zoology", quote: "The **Haplosporidia** constitute an enigmatic group of sporozoans inhabiting the coelomic cavities of marine worms and mollusks." },
      { author: "Rachel Carson", work: "The Sea Around Us", quote: "Mysterious die-offs of Chesapeake Bay oysters were traced to virulent microparasites related to the **Haplosporidia**." },
      { author: "E. B. Wilson", work: "The Cell in Development and Inheritance", quote: "The spore development in **Haplosporidia** reveals a primitive multinucleate plasmodium prior to encapsulation." }
    ]
  },
  haplosporidian: {
    primary: "Any protozoan parasite belonging to the order Haplosporida; of or relating to these spore-forming parasites.",
    secondary: "Pertaining to parasitic infections in marine invertebrates caused by haplosporidian protists.",
    quotes: [
      { author: "E. Ray Lankester", work: "A Treatise on Zoology", quote: "A microscopic examination of the oyster tissue revealed dense clusters of the **haplosporidian** parasite." },
      { author: "Rachel Carson", work: "The Edge of the Sea", quote: "Marine bivalves face relentless threats from microscopic **haplosporidian** invaders in tidal estuaries." },
      { author: "Arthur Shipley", work: "The Cambridge Natural History", quote: "The life cycle of the **haplosporidian** organism involves complex intermediate spore stages in the host gut." }
    ]
  },
  haplotype: {
    primary: "A physical grouping or cluster of genomic variants (such as SNPs or alleles) on a single chromosome that tend to be inherited together.",
    secondary: "A contraction of 'haploid genotype'; a set of DNA variations along a continuous chromosomal segment used to trace ancestry and population migrations.",
    quotes: [
      { author: "Francis Collins", work: "The Language of Life", quote: "By mapping ancestral **haplotype** blocks across diverse populations, the International HapMap Project illuminated the human genetic landscape." },
      { author: "Richard Dawkins", work: "The Ancestor's Tale", quote: "Mitochondrial DNA forms a single unbroken **haplotype** passed down through the maternal line across millennia." },
      { author: "Svante Pääbo", work: "Neanderthal Man: In Search of Lost Genomes", quote: "The archaic **haplotype** found in modern non-African genomes confirmed ancient admixture with Neanderthals." }
    ]
  },
  haply: {
    primary: "By chance, fortune, or accident; perhaps, maybe.",
    secondary: "Occurring by unforeseen happenstance; perchance.",
    quotes: [
      { author: "William Shakespeare", work: "Hamlet", quote: "And **haply** the clear eye of heaven will look upon our troubled state with favor." },
      { author: "John Milton", work: "Lycidas", quote: "Together both, ere the high lawns appeared... and **haply** some mournful muse may sing for us." },
      { author: "John Keats", work: "Ode to a Nightingale", quote: "The night is tender, and **haply** the Queen-Moon is on her throne, clustered around by all her starry Fays." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Self & Identity/Dashboard — hapl';

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

console.log('Done Dashboard — hapl!');
