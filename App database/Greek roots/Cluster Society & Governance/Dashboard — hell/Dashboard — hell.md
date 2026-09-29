---
status: unread
type: root_dashboard
---
# Dashboard — hell
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">Ἑλλάς ἑλλάδος (Hellás</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“Greece , Hellas”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'Greece , Hellas'.</span>
  </div>
</div>

```dataviewjs
// Ensure Apple Toggle CSS is injected and synchronized
let s = document.getElementById('apple-toggle-css');
if (!s) {
    s = document.createElement('style');
    s.id = 'apple-toggle-css';
    document.head.appendChild(s);
}
s.textContent = '.apple-c{position:relative;display:inline-flex;align-items:center;gap:8px;padding:2px 10px 2px 4px;border-radius:999px;background:var(--zen-toggle-bg,#27272e);border:1px solid var(--zen-border,#2d2d34);cursor:pointer;user-select:none;transition:border-color .2s ease,transform .2s ease,box-shadow .2s ease;line-height:1;vertical-align:middle;box-sizing:border-box}.apple-c:hover{border-color:var(--zen-muted,#86848c);transform:translateY(-1px);box-shadow:0 2px 6px rgba(0,0,0,.15)}.apple-c:active{transform:scale(.96)}.apple-c .track-c{position:relative;width:44px;height:16px;background:var(--zen-toggle-track,#1e1e24);border-radius:999px;border:1px solid var(--zen-border-subtle,#24242a);display:flex;align-items:center;justify-content:space-between;padding:0 5px;box-sizing:border-box}.apple-c .c-dot{width:3px;height:3px;border-radius:999px;background:var(--zen-muted,#86848c);opacity:.5}.apple-c .halo-c{position:absolute;top:1px;left:1px;width:12px;height:12px;border-radius:999px;transition:transform .35s cubic-bezier(.34,1.6,.64,1),background-color .25s ease,box-shadow .25s ease;display:flex;align-items:center;justify-content:center;box-sizing:border-box}.apple-c .halo-c .core-dot{width:4px;height:4px;border-radius:999px;background:#fff;box-shadow:0 0 3px #fff}.apple-c .halo-c.p0{transform:translateX(0);background:var(--zen-vermillion,#e05244);box-shadow:0 0 8px var(--zen-vermillion-glow,rgba(224,82,68,0.35))}.apple-c .halo-c.p1{transform:translateX(14px);background:var(--zen-ochre,#d49c24);box-shadow:0 0 8px rgba(212,156,36,0.35)}.apple-c .halo-c.p2{transform:translateX(28px);background:var(--zen-moss,#429e57);box-shadow:0 0 8px var(--zen-moss-glow,rgba(66,158,87,0.35))}.apple-c .label{font-size:11px;font-weight:700;letter-spacing:.2px;transition:color .2s ease;min-width:44px}.apple-c .label.unread{color:var(--zen-vermillion,#e05244)}.apple-c .label.learning{color:var(--zen-ochre,#d49c24)}.apple-c .label.learned{color:var(--zen-moss,#429e57)}';

// Robust path and file resolution
const currentPath = dv.currentFilePath || (dv.current() && dv.current().file ? dv.current().file.path : "");
const folder = currentPath.includes('/') ? currentPath.substring(0, currentPath.lastIndexOf('/')) : (dv.current() && dv.current().file ? dv.current().file.folder : "");
const rawFileName = currentPath ? currentPath.substring(currentPath.lastIndexOf('/') + 1).replace(/\.md$/, '') : (dv.current() && dv.current().file ? dv.current().file.name : "");
const rootName = rawFileName;
const cur = dv.current();
const rawStatus = (cur && cur.status) ? cur.status : "unread";
const isLatin = folder.includes("Latin roots");

let wordPages = [];
if (folder) {
    try {
        wordPages = dv.pages('"' + folder + '"').where(n => n.file.name !== rootName && !n.file.name.startsWith("Word Triage") && (n.latin_root || n.greek_root || (!n.file.name.startsWith("Dashboard") && !n.file.name.startsWith("Cluster"))));
    } catch (e) { wordPages = []; }
}

const t = wordPages ? wordPages.length : 0;
const l = (wordPages && t > 0) ? wordPages.where(n => n.status === "learned").length : 0;
const g = (wordPages && t > 0) ? wordPages.where(n => n.status === "learning").length : 0;
const u = t - l - g;
const lPct = t > 0 ? ((l / t) * 100).toFixed(1) : "0.0";
const gPct = t > 0 ? ((g / t) * 100).toFixed(1) : "0.0";

const states = [
    { key: 'unread', label: 'unread', cls: 'unread', p: 'p0' },
    { key: 'learning', label: 'learning', cls: 'learning', p: 'p1' },
    { key: 'learned', label: 'learned', cls: 'learned', p: 'p2' }
];

let curIdx = states.findIndex(s => s.key === rawStatus);
if (curIdx === -1) curIdx = 0;

const toggle = document.createElement('div');
toggle.className = 'apple-c';
toggle.title = 'Click to glide: unread ➔ learning ➔ learned';

const track = document.createElement('div');
track.className = 'track-c';
track.innerHTML = '<span class="c-dot"></span><span class="c-dot"></span><span class="c-dot"></span><div class="halo-c ' + states[curIdx].p + '"><div class="core-dot"></div></div>';

const label = document.createElement('span');
label.className = 'label ' + states[curIdx].cls;
label.textContent = states[curIdx].label;

toggle.appendChild(track);
toggle.appendChild(label);

const cleanName = rootName.replace('Dashboard — ', '').replace('Dashboard – ', '').replace('Dashboard - ', '');
const isMastered = (curIdx === 2 || (t > 0 && l === t));

toggle.addEventListener('click', async (e) => {
    e.stopPropagation();
    curIdx = (curIdx + 1) % 3;
    const nxt = states[curIdx];
    track.querySelector('.halo-c').className = 'halo-c ' + nxt.p;
    label.className = 'label ' + nxt.cls;
    label.textContent = nxt.label;

    const seal = container.querySelector('.hanko-seal');
    if (seal) {
        if (nxt.key === 'learned') {
            seal.style.opacity = "0.95";
            seal.style.transform = "rotate(-3deg) scale(1)";
        } else {
            seal.style.opacity = "0.25";
            seal.style.transform = "rotate(-6deg) scale(0.92)";
        }
    }

    const file = app.vault.getAbstractFileByPath(currentPath);
    if (file) {
        await app.fileManager.processFrontMatter(file, fm => { fm.status = nxt.key; });
        new Notice(rootName + ': marked ' + nxt.key);
    }
});

// Container element with Zen HUD Card class
const container = document.createElement('div');
container.className = 'zen-hud-card';
container.style = "background:var(--zen-bg-card,#1a1a1e); color:var(--zen-ink,#ececec); border:1px solid var(--zen-border,#2d2d34); border-radius:10px; padding:24px 28px; margin:16px 0 20px; box-shadow:var(--zen-shadow,0 6px 24px rgba(0,0,0,0.4)); position:relative; box-sizing:border-box;";

const stampText = isLatin ? 'Latin Root' : 'Greek Root';

container.innerHTML = '' +
  '<div style="position:absolute; top:14px; right:28px; font-family:Georgia,serif; font-size:48px; font-weight:300; color:var(--zen-muted,#86848c); line-height:1; pointer-events:none; user-select:none; opacity:0.25;">' + cleanName + '</div>' +
  '<div style="display:inline-flex; align-items:center; border:1px solid var(--zen-vermillion,#e05244); color:var(--zen-vermillion,#e05244); font-size:10px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; padding:2px 7px; border-radius:2px; margin-bottom:6px; background:var(--zen-vermillion-glow,rgba(224,82,68,0.1));">' + stampText + '</div>' +
  '<div style="font-family:Georgia,serif; font-size:28px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.5px; line-height:1.2;">' + cleanName + '</div>' +
  '<div style="font-family:Georgia,serif; font-size:14px; font-style:italic; color:var(--zen-muted,#86848c); margin-top:3px;">' + stampText + ' · Derived Vocabulary (' + t + ' words)</div>' +
  '<div style="width:100%; height:1px; background:linear-gradient(to right, var(--zen-ink,#ececec) 25%, transparent 95%); opacity:0.15; margin:16px 0;"></div>' +
  '<div style="display:grid; grid-template-columns:auto 1fr auto; gap:28px; align-items:center; margin:12px 0 16px;">' +
    '<div style="position:relative; width:68px; height:68px; display:flex; align-items:center; justify-content:center;">' +
      '<svg style="width:68px; height:68px; transform:rotate(-90deg);" viewBox="0 0 36 36">' +
        '<path stroke="var(--zen-border-subtle,#24242a)" stroke-width="3.6" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>' +
        '<path stroke="var(--zen-moss,#429e57)" stroke-width="3.8" stroke-linecap="round" fill="none" stroke-dasharray="' + lPct + ', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>' +
      '</svg>' +
      '<div style="position:absolute; font-family:Georgia,serif; font-size:14px; font-weight:700; color:var(--zen-ink,#ececec);">' + lPct + '%</div>' +
    '</div>' +
    '<div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-ink,#ececec); line-height:1;">' + t + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Derived Words</div></div>' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-moss,#429e57); line-height:1;">' + l + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Mastered</div></div>' +
      '<div><div style="font-family:Georgia,serif; font-size:26px; font-weight:600; color:var(--zen-ochre,#d49c24); line-height:1;">' + g + '</div><div style="font-size:9.5px; text-transform:uppercase; letter-spacing:1.4px; color:var(--zen-muted,#86848c); margin-top:4px; font-weight:600;">Studying</div></div>' +
    '</div>' +
    '<div class="hanko-seal" style="width:42px; height:42px; border:2px solid var(--zen-vermillion,#e05244); border-radius:4px; display:flex; align-items:center; justify-content:center; color:var(--zen-vermillion,#e05244); font-family:Georgia,serif; font-size:20px; font-weight:700; user-select:none; transition:all .35s; opacity:' + (isMastered ? '0.95' : '0.25') + '; transform:' + (isMastered ? 'rotate(-3deg) scale(1)' : 'rotate(-6deg) scale(0.92)') + ';" title="Mastery Seal (熟)">熟</div>' +
  '</div>' +
  '<div style="width:100%; height:3px; background:var(--zen-border-subtle,#24242a); border-radius:2px; overflow:hidden; margin:14px 0; display:flex; gap:1px;">' +
    '<div style="height:100%; background:var(--zen-moss,#429e57); border-radius:2px 0 0 2px; width:' + lPct + '%;"></div>' +
    '<div style="height:100%; background:var(--zen-ochre,#d49c24); width:' + gPct + '%;"></div>' +
  '</div>' +
'';

const toggleRow = document.createElement('div');
toggleRow.style = "display:flex; justify-content:space-between; align-items:center; padding-top:6px; margin-top:4px;";

const toggleLabel = document.createElement('span');
toggleLabel.style = "font-size:10px; text-transform:uppercase; letter-spacing:1.2px; color:var(--zen-muted,#86848c); font-weight:600;";
toggleLabel.textContent = "Root Study Status";

toggleRow.appendChild(toggleLabel);
toggleRow.appendChild(toggle);
container.appendChild(toggleRow);
dv.container.appendChild(container);

// ================= WORD TRIAGE LAUNCH CARD =================
const triageCard = document.createElement('div');
triageCard.className = 'zen-triage-card';
triageCard.style = "background:var(--zen-bg-card,#1a1a1e); border:1px solid var(--zen-border,#2d2d34); border-radius:8px; padding:14px 20px; margin:0 0 24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; cursor:pointer; transition:all .25s ease;";
triageCard.title = "Click to open dedicated Word Triage page";

triageCard.innerHTML = '' +
  '<div style="display:flex; align-items:center; gap:16px;">' +
    '<div style="width:38px; height:38px; border-radius:8px; background:rgba(224,82,68,0.12); border:1px solid var(--zen-vermillion,#e05244); display:flex; align-items:center; justify-content:center; font-size:18px;">🎯</div>' +
    '<div>' +
      '<div style="font-family:Georgia,serif; font-size:15px; font-weight:700; color:var(--zen-ink,#ececec); letter-spacing:-0.2px;">Word Triage & Status Filters</div>' +
      '<div style="display:flex; gap:12px; margin-top:3px; font-size:11.5px; font-weight:600;">' +
        '<span style="color:var(--zen-vermillion,#e05244);">🔴 ' + u + ' unread</span> · ' +
        '<span style="color:var(--zen-ochre,#d49c24);">🟡 ' + g + ' studying</span> · ' +
        '<span style="color:var(--zen-moss,#429e57);">🟢 ' + l + ' mastered</span>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div style="display:flex; align-items:center; gap:8px; background:var(--zen-bg-subtle,#222227); border:1px solid var(--zen-border,#2d2d34); padding:6px 14px; border-radius:999px; font-size:12px; font-weight:700; color:var(--zen-ink,#ececec);">' +
    '<span>Open Triage Page</span>' +
    '<span style="color:var(--zen-vermillion,#e05244);">➔</span>' +
  '</div>';

triageCard.addEventListener('mouseenter', () => {
    triageCard.style.borderColor = "var(--zen-vermillion,#e05244)";
    triageCard.style.transform = "translateY(-1px)";
    triageCard.style.boxShadow = "0 4px 14px rgba(0,0,0,0.25)";
});
triageCard.addEventListener('mouseleave', () => {
    triageCard.style.borderColor = "var(--zen-border,#2d2d34)";
    triageCard.style.transform = "none";
    triageCard.style.boxShadow = "none";
});

triageCard.addEventListener('click', () => {
    const triagePageName = 'Word Triage — ' + cleanName;
    app.workspace.openLinkText(triagePageName, currentPath, false);
});

dv.container.appendChild(triageCard);

```

The Greek root **hell** (Ἑλλάς ἑλλάδος (Hellás, helládos)) signifies Greece , Hellas. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Hell*, *Helladic*, *Hellenic*, *Hellenism*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: Greece , Hellas
> The Greek root **hell** fundamentally denotes **Greece , Hellas**. The physical sensory observation and cognitive anchor underlying 'Greece , Hellas'. In classical Greek antiquity, the root denoted 'Greece , Hellas', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Greece , Hellas</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'Greece , Hellas'.</mark>
> - **Everyday Connection**: Think of familiar words like *Hell*, *Helladic*, *Hellenic*, *Hellenism*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **hell** derives from Ancient Greek <mark class="hl-stem">Ἑλλάς ἑλλάδος (Hellás, helládos)</mark>, meaning "Greece , Hellas".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with hell**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'Greece , Hellas'.
  - Whenever you see **hell** in an English word, think immediately of **Greece , Hellas**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">hell</mark>, think of <mark class="hl-def">Greece , Hellas</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `hell-` (from *Ἑλλάς ἑλλάδος (Hellás, helládos)*).
> - **Combining Stem with -o- Connective:** `hello-` (standard Greek combining vowel utilized before consonants).
> - **Ablaut & Dialectal Variations:** Demonstrates standard apophonic grade shifts and dialectal adaptations in classical compounding.
> - **Prefix Dynamics:** Readily compounds with Greek prepositions (*anti-*, *syn-*, *dia-*, *peri-*, *hyper-*, *hypo-*, *ana-*, *cata-*) to alter direction, degree, or relation.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.greek_root);
const inProg = p.where(n => n.status === "learning");
const done = p.where(n => n.status === "learned");
if (inProg.length === 0 && done.length === 0) {
    dv.paragraph("*No words marked yet. Open any word card below and select 🟡 Learning or 🟢 Learned.*");
} else {
    let out = [];
    if (inProg.length > 0) out.push("🟡 **Currently Studying (" + inProg.length + "):** " + inProg.map(n => n.file.link).join(" · "));
    if (done.length > 0) out.push("🟢 **Mastered (" + done.length + "):** " + done.map(n => n.file.link).join(" · "));
    dv.paragraph(out.join("\n\n"));
}
```

> [!tip] 🌈 The Conceptual Facets of Hell
> - **1. Direct & Concrete Anchor:** Literal instantiation of Greece , Hellas in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on hell

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `hell-` | [[Hell]] | Primary root semantic foundation denoting Greece , Hellas. |
| **Connecting -o-** | `hello-` | [[Helladic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `hell` | [[Hellenic]] | Relational or directional modification of the core root sense. |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Natural Sciences & Biology:** Morphological categorization and taxonomic naming conventions.
- **Medicine & Healthcare:** Clinical diagnostic terminology, anatomical structures, and pathology.
- **Philosophy, Logic & Rhetoric:** Theoretical frameworks, dialectical categories, and cognitive models.
- **Modern Academic English:** High-register lexicon across humanities, social sciences, and technical literature.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[Hell]] | noun | **1.** A nether world in which the dead continue to exist : hades.<br>**2.** The nether realm of the devil and demons in which condemned people suffer everlasting punishment in some religions —often used in curses or as a generalized term of abuse. | *"For if you were by my unkindness shaken As I by yours, y’have passed a hell of time, And I a tyrant have no leisure taken To weigh how once I suffered in your crime."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hell]] | noun | **1.** Any place of pain and turmoil.<br>**2.** A cause of difficulty and suffering. | *"In academic literature, hell designates **1.** any place of pain and turmoil.<br>**2.** a cause of difficulty and suffering."* — Academic Lexicon |
| [[Helladic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of Greece , Hellas. | *"In academic literature, Helladic designates adjective*) pertaining to, derived from, or characteristic of greece , hellas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hellcat]] | noun | **1.** A malicious woman with a fierce temper. | *"In academic literature, hellcat designates a malicious woman with a fierce temper."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hellebore]] | noun | **1.** Perennial herbs of the lily family having thick toxic rhizomes.<br>**2.** Any plant of the eurasian genus helleborus. | *"Orion: There is nothing but what will do you good; And the drugs are simples; 'tis hellebore, Nepenthe, upas, and dragon's blood, Absinthe, and mandrake, and mandragore."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[helleborine]] | noun | **1.** Any of several small temperate and tropical orchids having mottled or striped leaves and spikes of small yellowish-white flowers in a twisted raceme.<br>**2.** Any of various orchids of the genus epipactis. | *"In academic literature, helleborine designates any of several small temperate and tropical orchids having mottled or striped leaves and spikes of small yellowish-white flowers in a twisted raceme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[helleborus]] | noun | **1.** A genus of helleborus. | *"In academic literature, helleborus designates a genus of helleborus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hellene]] | noun | **1.** A native or inhabitant of greece. | *"In Hoelderlin's "Hyperion," we have the first poetic work in German which takes modern Greece as its locality and a modern Hellene as its hero."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[Hellenic]] | noun | **1.** Of or relating to Greece, its people, or its language; specifically : of or relating to ancient Greek history, culture, or art before the Hellenistic period. | *"He had persistently elevated Hellenic Paganism at the expense of Christianity; yet in that civilization an illegal surrender was not certain disesteem."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[hellenic]] | noun | **1.** The hellenic branch of the indo-european family of languages.<br>**2.** Of or pertaining to or characteristic of the ancient greek and roman cultures; ; "classical. | *"In academic literature, hellenic designates **1.** the hellenic branch of the indo-european family of languages.<br>**2.** of or pertaining to or characteristic of the ancient greek and roman cultures; ; "classical."* — Academic Lexicon |
| [[Hellenism]] | noun | **1.** grecism.<br>**2.** devotion to or imitation of ancient Greek thought, customs, or styles. | *"The fact itself is important because it establishes the connection between his Weltschmerz and his most noteworthy characteristic as a poet, namely, his Hellenism."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[hellenism]] | noun | **1.** The principles and ideals associated with classical greek civilization. | *"In academic literature, hellenism designates **1.** the principles and ideals associated with classical greek civilization."* — Academic Lexicon |
| [[Hellenistic]] | noun | **1.** Of or relating to Greek history, culture, or art after Alexander the Great.<br>**2.** Of or relating to the Hellenists. | *"There is the region of Asia Minor and Greece,--where the church is Hellenistic in every sense of the word, very Greek upon the surface and less Greek underneath, again with marked contrasts due to geography and race-distribution."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[hellenistic]] | adjective | **1.** Relating to or characteristic of the classical greek civilization. | *"Scholarly treatises document the hellenistic attributes observed across systematically cataloged specimens."* — Academic Lexicon |
| [[hellenistical]] | adjective | **1.** Relating to or characteristic of the classical greek civilization. | *"In academic literature, hellenistical designates relating to or characteristic of the classical greek civilization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heller]] | noun | **1.** 100 halers equal 1 koruna slovakia.<br>**2.** 100 halers equal 1 koruna in czech republic. | *"Say, that's some ray they have." "It sure is one first-class heller," agreed Ben."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[helleri]] | noun | **1.** Freshwater fish of central america having a long swordlike tail; popular aquarium fish. | *"In academic literature, helleri designates freshwater fish of central america having a long swordlike tail; popular aquarium fish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hellespont]] | noun | **1.** The strait between the aegean and the sea of marmara that separates european turkey from asian turkey. | *"That’s on some shallow story of deep love, How young Leander crossed the Hellespont."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hellion]] | noun | **1.** A rowdy or mischievous person (usually a young man). | *"In academic literature, hellion designates a rowdy or mischievous person (usually a young man)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hellish]] | adjective | **1.** Very unpleasant.<br>**2.** Extremely evil or cruel; expressive of cruelty or befitting hell. | *"Roasted in wrath and fire, And thus o’ersized with coagulate gore, With eyes like carbuncles, the hellish Pyrrhus Old grandsire Priam seeks._ So, proceed you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hellishly]] | adverb | **1.** Extremely. | *"In academic literature, hellishly designates extremely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hellman]] | noun | **1.** United states playwright; her plays were often indictments of injustice (1905-1984). | *"In academic literature, hellman designates united states playwright; her plays were often indictments of injustice (1905-1984)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hello]] | noun | **1.** An expression of greeting. | *"Hello,” I tapped “Hello, stranger,” Morrell tapped back; and, from Oppenheimer, “Welcome to our city.” They were curious to know who I was, how long I was condemned to solitary, and why I had been so condemned."* — Jack London, *The Jacket (The Star-Rover)* |
| [[panhellenic]] | adjective | **1.** Of or relating to all the greeks. | *"In academic literature, panhellenic designates of or relating to all the greeks."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society & Governance]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · HELL
  </div>
</div>
