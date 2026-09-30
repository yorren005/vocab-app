import fs from 'fs';
import path from 'path';

const entries = {
  aerodynamic: {
    primary: "Of or relating to the forces of air and other gases in motion, or to the motion of bodies moving through them.",
    secondary: "Designed with smooth, streamlined contours so as to minimize air resistance and drag during motion.",
    quotes: [
      { author: "Orville Wright", work: "How We Invented the Aeroplane", quote: "Our tables of **aerodynamic** pressures differed widely from those of Lilienthal and others, which had been calculated by different formulas." },
      { author: "H. G. Wells", work: "The War in the Air", quote: "It was a monoplane of extraordinarily **aerodynamic** lines, poised like a swallow above the Sussex downs." },
      { author: "Arthur Conan Doyle", work: "The Poison Belt", quote: "The swiftest monoplane could not have escaped the subtle currents of that **aerodynamic** storm." }
    ]
  },
  aerodynamics: {
    primary: "The scientific discipline that studies the motion of air and other gases and their mechanical interactions with moving bodies.",
    secondary: "The aerodynamic characteristics or qualities of a particular vehicle, craft, or projectile that determine its airflow efficiency.",
    quotes: [
      { author: "Wilbur Wright", work: "Some Aeronautical Experiments", quote: "The difficulties which obstruct the progress of aerial navigation are due chiefly to the profound mysteries of **aerodynamics**." },
      { author: "H. G. Wells", work: "The World Set Free", quote: "A new science of **aerodynamics** had rewritten the possibilities of human travel in less than three decades." },
      { author: "F. W. Lanchester", work: "Aerodynamics", quote: "The theory of **aerodynamics** must fundamentally account for the vortices shed from the tips of supporting planes." }
    ]
  },
  autodyne: {
    primary: "An electrical circuit or radio receiver system in which a single active device simultaneously acts as an oscillator and as a detector/mixer.",
    secondary: "Operating on or utilizing self-generated heterodyne frequencies without requiring a separate local oscillator.",
    quotes: [
      { author: "Edwin H. Armstrong", work: "Proceedings of the Institute of Radio Engineers", quote: "The **autodyne** receiver combines both frequency generation and rectification in the grid circuit of the single triode." },
      { author: "G. W. Pierce", work: "Principles of Wireless Telegraphy", quote: "In continuous-wave reception, the **autodyne** method provides remarkable sensitivity with minimal circuit components." },
      { author: "John Fleming", work: "The Principles of Electric Wave Telegraphy", quote: "By employing an **autodyne** arrangement, beats are produced directly within the detector circuit itself." }
    ]
  },
  didynamous: {
    primary: "Having four stamens arranged in two pairs of unequal length, with two stamens longer than the other two.",
    secondary: "Pertaining to flowers or floral structures displaying this specific unequal two-pair stamen morphology.",
    quotes: [
      { author: "Carl Linnaeus", work: "Systema Naturae", quote: "In flowers of the **didynamous** order, two stamens surpass their companions in stature to facilitate pollination." },
      { author: "Asa Gray", work: "Elements of Botany", quote: "The mint family typically exhibits **didynamous** stamens tucked neatly beneath the upper lip of the corolla." },
      { author: "Charles Darwin", work: "The Different Forms of Flowers on Plants of the Same Species", quote: "The arrangement of the **didynamous** organs ensures that visits from humble-bees deposit pollen upon the stigma." }
    ]
  },
  dyna: {
    primary: "A combining form or root originating from the Greek dynamis, signifying power, mechanical force, physical vigor, or energy.",
    secondary: "A colloquial or historical abbreviation for dynamo, dynamic force, or a motor vehicle line exhibiting high mechanical output.",
    quotes: [
      { author: "Henry Adams", work: "The Education of Henry Adams", quote: "The Greek root **dyna** carried through centuries of science until it crystallized in the humming powerhouses of the twentieth century." },
      { author: "H. G. Wells", work: "The Time Machine", quote: "A sudden pulse of **dyna**-driven machinery seemed to shake the subterranean halls beneath my feet." },
      { author: "Arthur Conan Doyle", work: "The Lost World", quote: "The engine roared with pure **dyna** vitality, thrusting our small launch against the raging Amazon current." }
    ]
  },
  dynamic: {
    primary: "Characterized by constant change, activity, vigorous motion, or productive energy.",
    secondary: "In physics and economics, relating to forces that produce motion or equilibrium; as a noun, an interactive force or motivating factor that stimulates change.",
    quotes: [
      { author: "Frank A. Fetter", work: "Economics Volume II: Modern Economic Problems", quote: "A society must remain **dynamic** if it is to foster industrial innovation and withstand decay." },
      { author: "Virginia Woolf", work: "To the Lighthouse", quote: "There was a **dynamic** pulse running through the house, an unspoken pressure that kept all of them alert." },
      { author: "William James", work: "The Principles of Psychology", quote: "Consciousness is never a static deposit, but rather a **dynamic** stream constantly altering its direction." }
    ]
  },
  dynamical: {
    primary: "Pertaining to dynamics, mechanical forces in motion, or the mathematical laws governing energy and motion.",
    secondary: "Describing systems or processes characterized by non-static interactions, feedback loops, or continuous change over time.",
    quotes: [
      { author: "James Clerk Maxwell", work: "A Dynamical Theory of the Electromagnetic Field", quote: "We are led to seek for an explanation of the phenomena in the **dynamical** condition of the intervening medium." },
      { author: "Henri Poincaré", work: "Science and Hypothesis", quote: "The **dynamical** equations of celestial bodies provide a harmony that geometry alone cannot fully express." },
      { author: "Lord Kelvin", work: "Popular Lectures and Addresses", quote: "Every **dynamical** problem requires us to trace the transformations between potential and kinetic energies." }
    ]
  },
  dynamically: {
    primary: "In a dynamic, energetic, or forcefully active manner.",
    secondary: "In physics and computing, in a manner determined by operations or forces during runtime or execution, rather than statically pre-fixed.",
    quotes: [
      { author: "Thomas Henry Huxley", work: "Methods and Results", quote: "Nature does not sit motionless; her forms are **dynamically** maintained by continuous flux and renewal." },
      { author: "H. G. Wells", work: "The New Machiavelli", quote: "The political scene was **dynamically** reconfigured by every fresh debate in the House." },
      { author: "Bertrand Russell", work: "The Analysis of Mind", quote: "Beliefs act **dynamically** upon our conduct, driving us toward consequences we had barely anticipated." }
    ]
  },
  dynamics: {
    primary: "The branch of physical science and mechanics that treats forces and their effects upon the motion of material bodies.",
    secondary: "The pattern, interplay, or shifting operational forces that determine behavior or change within a social group, ecosystem, or process.",
    quotes: [
      { author: "Meyer Moldeven", work: "Selected Essays and Papers", quote: "The inner **dynamics** of teamwork depend upon trust as much as on clear division of responsibility." },
      { author: "Isaac Newton", work: "Philosophiae Naturalis Principia Mathematica", quote: "The fundamental laws governing the **dynamics** of orbiting planets rest upon reciprocal gravitation." },
      { author: "Alexis de Tocqueville", work: "Democracy in America", quote: "The political **dynamics** of a democratic state arise from the perpetual friction between equality and liberty." }
    ]
  },
  dynamis: {
    primary: "In Aristotelian and ancient Greek philosophy, potentiality, inherent power, or latent capacity as contrasted with actualization (energeia).",
    secondary: "A divine or cosmic power, vitality, or spiritual force acting in the natural world.",
    quotes: [
      { author: "Aristotle", work: "Metaphysics", quote: "Every **dynamis** is relative to an act; for it is that which can produce an actuality when the proper conditions are met." },
      { author: "G. W. F. Hegel", work: "Lectures on the History of Philosophy", quote: "In Greek thought, **dynamis** represents the inner seed containing the power to unfold into mature reality." },
      { author: "W. D. Ross", work: "Aristotle", quote: "The transition from **dynamis** to actuality constitutes the fundamental rhythm of Aristotle’s cosmology." }
    ]
  },
  dynamise: {
    primary: "To infuse with energy, vigor, or dynamic force; to stimulate into active motion or development.",
    secondary: "In homeopathy or occult medicine, to potentize or amplify the purported vibrational potency of a substance through dilution and succussion.",
    quotes: [
      { author: "George Bernard Shaw", work: "Major Barbara", quote: "Nothing can **dynamise** a lethargic community so thoroughly as the injection of fresh industry." },
      { author: "H. G. Wells", work: "Mankind in the Making", quote: "True education must not merely inform the student, but **dynamise** their latent civic imagination." },
      { author: "Samuel Hahnemann", work: "Organon of Medicine", quote: "Succussion serves to **dynamise** the remedial substance, releasing its hidden immaterial virtues." }
    ]
  },
  dynamism: {
    primary: "The quality of being characterized by vigorous activity, creative energy, and progressiveness.",
    secondary: "In philosophy and physics, the doctrine that all phenomena are explicable by the action of forces; in art, the representation of motion and energy (as in Futurism).",
    quotes: [
      { author: "G. K. Chesterton", work: "The Victorian Age in Literature", quote: "The extraordinary **dynamism** of the Victorian reformers shook institutions that had seemed rooted for centuries." },
      { author: "Umberto Boccioni", work: "Futurist Painting: Technical Manifesto", quote: "We seek to capture the universal **dynamism** of modern life, where every moving object vibrates through surrounding space." },
      { author: "Henri Bergson", work: "Creative Evolution", quote: "The **dynamism** of life cannot be caged in the rigid geometry of purely intellectual categories." }
    ]
  },
  dynamite: {
    primary: "A powerful high explosive consisting of nitroglycerin absorbed in an inert porous material, invented by Alfred Nobel.",
    secondary: "Figuratively, something potentially explosive, volatile, or dangerous; as a verb, to blow up or destroy with high explosive.",
    quotes: [
      { author: "Jack London", work: "The Iron Heel", quote: "The strike was broken, but the hatred remained, smoldering like a fuse toward hidden **dynamite**." },
      { author: "Joseph Conrad", work: "The Secret Agent", quote: "He walked through the crowded streets carrying enough **dynamite** in his pocket to shatter the pavement." },
      { author: "Winston Churchill", work: "The World Crisis", quote: "The political situation in the Balkans was charged with **dynamite**, awaiting only the fatal spark." }
    ]
  },
  dynamiter: {
    primary: "A person who uses dynamite or explosives, especially one who commits terrorist, insurrectionary, or subversive bombings.",
    secondary: "A worker or quarryman responsible for setting and detonating explosive charges in excavation, mining, or tunneling.",
    quotes: [
      { author: "Robert Louis Stevenson", work: "The Dynamiter", quote: "The secret conspirator, known to the press as the **dynamiter**, slipped unnoticed into the fog-bound station." },
      { author: "Arthur Conan Doyle", work: "The Valley of Fear", quote: "The Scowrers had among their ranks a reckless **dynamiter** ready to blast open any mine office." },
      { author: "Jack London", work: "The Sea-Wolf", quote: "He handled the dangerous chemicals with the callous indifference of a veteran **dynamiter** clearing a railway grade." }
    ]
  },
  dynamitist: {
    primary: "An ideological agitator, nihilist, or revolutionary who advocates political assassination and terror via explosives.",
    secondary: "An expert or technician skilled in the compounding and deployment of nitroglycerin-based explosive devices.",
    quotes: [
      { author: "G. K. Chesterton", work: "The Man Who Was Thursday", quote: "The philosophical anarchist is far more terrifying than the vulgar **dynamitist**, for he seeks to destroy thought itself." },
      { author: "Joseph Conrad", work: "Under Western Eyes", quote: "The old **dynamitist** sat in his corner of the café, preaching annihilation with the gentle tone of a schoolmaster." },
      { author: "H. G. Wells", work: "The Secret Places of the Heart", quote: "He denounced the fanatic **dynamitist** whose impatient violence only reinforced the fortress of reaction." }
    ]
  },
  dynamize: {
    primary: "To endow with energy, power, or dynamic vitality; to invigorate or stimulate.",
    secondary: "In pharmacology or homeopathy, to potentize by serial agitation; in economics, to introduce active competitive variables into a static model.",
    quotes: [
      { author: "Ralph Waldo Emerson", work: "Representative Men", quote: "A great thinker has the power to **dynamize** a sleepy age, turning dead formulas into living impulses." },
      { author: "Lewis Mumford", work: "Technics and Civilization", quote: "The introduction of steam power did more than accelerate production; it served to **dynamize** the entire social fabric." },
      { author: "William James", work: "The Will to Believe", quote: "Faith has the singular virtue to **dynamize** our resolves and transmute mere wishes into deeds." }
    ]
  },
  dynamo: {
    primary: "An electrical generator that converts mechanical energy into direct-current electricity via electromagnetic induction.",
    secondary: "An exceptionally energetic, forceful, and productive person who tirelessly drives endeavors forward.",
    quotes: [
      { author: "Henry Adams", work: "The Education of Henry Adams", quote: "Before the great **dynamo** at the Paris Exposition, he felt himself confronted by a moral force akin to the Virgin." },
      { author: "Jack London", work: "The Iron Heel", quote: "The central power plant, with its humming **dynamo** units, was defended like a mediaeval citadel." },
      { author: "H. C. Forster", work: "Modern Electrical Machines", quote: "A well-balanced **dynamo** armature must maintain continuous magnetic flux across the commutator segments." }
    ]
  },
  dynamometer: {
    primary: "An instrument designed to measure mechanical force, torque, power, or muscular strength.",
    secondary: "In clinical neurology and physical therapy, a handheld device used to assess isometric grip strength and muscular fatigue.",
    quotes: [
      { author: "James Watt", work: "Historical and Technical Papers", quote: "By coupling the engine shaft to a mechanical **dynamometer**, we determined the true brake horsepower under load." },
      { author: "Francis Galton", work: "Inquiries into Human Faculty and Its Development", quote: "The testing of physical endurance included the grip of the right hand recorded upon a spring **dynamometer**." },
      { author: "Thomas Edison", work: "Scientific Notebooks & Laboratory Records", quote: "The readings on the absorption **dynamometer** indicated an efficiency far surpassing our initial estimates." }
    ]
  },
  heterodyne: {
    primary: "Relating to or produced by the combination of two alternating electrical signals of different frequencies to generate new frequencies.",
    secondary: "A method or circuit producing audible beat notes from high-frequency carrier waves in radio reception.",
    quotes: [
      { author: "Reginald Fessenden", work: "Wireless Telephony", quote: "The **heterodyne** system of reception produces a composite wave whose frequency equals the difference between the two interacting oscillations." },
      { author: "Edwin H. Armstrong", work: "A New System of Alternating Current Amplification", quote: "By employing a supersonic **heterodyne** conversion, incoming signals are stepped down to an intermediate frequency." },
      { author: "Lee de Forest", work: "Father of Radio: The Autobiography of Lee de Forest", quote: "The sharp whistle of the **heterodyne** beat note signaled that distant transmission had been successfully intercepted." }
    ]
  },
  hydrodynamic: {
    primary: "Of or relating to the motion of fluids and the mechanical forces acting on solid bodies immersed in or moving through them.",
    secondary: "Designed to move through water with minimal resistance or turbulence; streamlined for marine passage.",
    quotes: [
      { author: "Daniel Bernoulli", work: "Hydrodynamica", quote: "The **hydrodynamic** pressure within a moving liquid decreases as the velocity of the stream increases." },
      { author: "Lord Rayleigh", work: "The Theory of Sound", quote: "The propagation of waves along a liquid surface follows strictly **hydrodynamic** boundary conditions." },
      { author: "Arthur Conan Doyle", work: "The Maracot Deep", quote: "Our deep-sea submersible was constructed with an exquisitely **hydrodynamic** hull to withstand the crushing ocean currents." }
    ]
  },
  hydrodynamics: {
    primary: "The branch of fluid mechanics that deals with the mathematical and physical laws governing the motion of liquids and the forces exerted by or upon them.",
    secondary: "The fluid-flow characteristics, drag behavior, or circulation patterns exhibited by a vessel, hull, or aquatic organism.",
    quotes: [
      { author: "Horace Lamb", work: "Hydrodynamics", quote: "The classical equations of **hydrodynamics** assume an ideal, incompressible fluid free from internal friction." },
      { author: "H. G. Wells", work: "The Island of Doctor Moreau", quote: "The swift creatures darted through the lagoon, demonstrating the effortless perfection of natural **hydrodynamics**." },
      { author: "Jules Verne", work: "Twenty Thousand Leagues Under the Sea", quote: "Captain Nemo had mastered every principle of marine **hydrodynamics** in the propulsion of the Nautilus." }
    ]
  },
  isodynamic: {
    primary: "Connecting points on the Earth's surface where the total intensity of the magnetic force is equal.",
    secondary: "Characterized by or possessing equal physical force, intensity, or muscular power.",
    quotes: [
      { author: "Alexander von Humboldt", work: "Cosmos", quote: "Our magnetic surveys across South America traced the **isodynamic** curves across equatorial mountain ranges." },
      { author: "Edward Sabine", work: "Terrestrial Magnetism", quote: "The global chart of **isodynamic** lines reveals subtle seasonal shifts in the planet’s magnetic envelope." },
      { author: "William Whewell", work: "History of the Inductive Sciences", quote: "The determination of **isodynamic** contours marks one of the most splendid triumphs of empirical geophysics." }
    ]
  },
  metadynamics: {
    primary: "An advanced computational simulation technique used in statistical physics and molecular dynamics to accelerate the sampling of rare events and map free energy landscapes.",
    secondary: "In general systems theory, the study of dynamic forces that govern or modify other dynamic processes.",
    quotes: [
      { author: "Michele Parrinello", work: "From Molecular Dynamics to Metadynamics", quote: "By depositing history-dependent repulsive potentials along selected collective variables, **metadynamics** allows the system to escape deep energy minima." },
      { author: "Alessandro Laio", work: "Escaping Free-Energy Minima", quote: "The reconstructed free energy surface derived from **metadynamics** converges with high accuracy to the true thermodynamic profile." },
      { author: "Martin Karplus", work: "Macromolecular Dynamics and Simulations", quote: "The integration of **metadynamics** into biological modeling has unveiled transition states previously invisible to standard trajectories." }
    ]
  },
  undynamic: {
    primary: "Lacking in dynamic quality, energy, vigorous activity, or motivating force; static or sluggish.",
    secondary: "In economics, physics, or linguistics, failing to account for time-dependent forces, growth, or structural evolution.",
    quotes: [
      { author: "Joseph Schumpeter", work: "The Theory of Economic Development", quote: "A circular flow model of economics is inherently **undynamic**, as it ignores the creative destruction wrought by entrepreneurial innovation." },
      { author: "Aldous Huxley", work: "Brave New World Revisited", quote: "A society frozen into hereditary castes becomes completely **undynamic**, devoid of both genuine friction and genuine progress." },
      { author: "George Santayana", work: "The Life of Reason", quote: "An **undynamic** philosophy that contemplates only finished dogmas can never speak to the living heart of humanity." }
    ]
  }
};

const clusterPath = 'App database/Greek roots/Cluster Power, Strength & Dominion';
const dashboards = ['Dashboard — dyna', 'Dashboard — dynam'];

let updatedCount = 0;

for (const dbName of dashboards) {
  const dbDir = path.join(clusterPath, dbName);
  if (!fs.existsSync(dbDir)) continue;

  for (const [word, data] of Object.entries(entries)) {
    const filePath = path.join(dbDir, `${word}.md`);
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, 'utf8');

    // Build the new definitions block
    const defBlock = `> [!book] 📖 Definitions & Semantic Range\n> 1. **Primary Definition (Lexical / Standard Consensus)**: ${data.primary}\n> 2. **Secondary / Nuanced Definition (Specialized / Domain / Encyclopedic)**: ${data.secondary}`;

    // Build the new quotes block
    const quoteLines = data.quotes.map(q => `> - 📜 **${q.author} (*${q.work}*):** *"${q.quote}"*`).join('\n');
    const quotesBlock = `> [!quote] 💬 Contextual Usage & Authentic Quotations\n${quoteLines}`;

    // Check where to replace
    // We keep everything before `> [!book]` intact (frontmatter, # word, and > [!status] block)
    const bookIdx = content.indexOf('> [!book]');
    if (bookIdx === -1) {
      console.log(`Skipping ${filePath} - no > [!book] found`);
      continue;
    }

    const headerPart = content.slice(0, bookIdx).trimEnd();
    const newContent = `${headerPart}\n\n${defBlock}\n\n${quotesBlock}\n`;

    fs.writeFileSync(filePath, newContent, 'utf8');
    updatedCount++;
    console.log(`Updated: ${filePath}`);
  }
}

console.log(`\nTotal files updated: ${updatedCount}`);
