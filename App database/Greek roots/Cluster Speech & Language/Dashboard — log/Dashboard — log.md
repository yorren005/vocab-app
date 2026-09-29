---
status: unread
type: root_dashboard
---
# Dashboard — log
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">λόγος (lógos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“word / speech / reason / systematic study”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Gathering disparate fragments of observation into an orderly, reasoned verbal exposition.</span>
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

The Greek root **log** (λόγος (lógos), λέγειν (légein)) signifies word / speech / reason / systematic study. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *agrostology*, *algology*, *analog*, *analogical*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: word / speech / reason / systematic study
> The Greek root **log** fundamentally denotes **word / speech / reason / systematic study**. Gathering disparate fragments of observation into an orderly, reasoned verbal exposition. Heraclitus declared the Logos to be the rational ordering principle of the cosmos; in classical Athens, it embodied civic rhetoric, philosophical dialectic, and scientific analysis.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">word / speech / reason / systematic study</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering disparate fragments of observation into an orderly, reasoned verbal exposition.</mark>
> - **Everyday Connection**: Think of familiar words like *agrostology*, *algology*, *analog*, *analogical*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **log** derives from Ancient Greek <mark class="hl-stem">λόγος (lógos), λέγειν (légein)</mark>, meaning "word / speech / reason / systematic study".
  - Reconstructed Indo-European origin: ***leǵ- ("to gather, collect, speak")**.

- **The Big Picture Idea**:
  - Gathering disparate fragments of observation into an orderly, reasoned verbal exposition.
  - Whenever you see **log** in an English word, think immediately of **word / speech / reason / systematic study**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">log</mark>, think of <mark class="hl-def">word / speech / reason / systematic study</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `log-` (from *λόγος (lógos), λέγειν (légein)*).
> - **Combining Stem with -o- Connective:** `logo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Log
> - **1. Direct & Concrete Anchor:** Literal instantiation of word / speech / reason / systematic study in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on log

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `log-` | [[agrostology]] | Primary root semantic foundation denoting word / speech / reason / systematic study. |
| **Connecting -o-** | `logo-` | [[algology]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `log` | [[analog]] | Relational or directional modification of the core root sense. |

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
| [[agrostology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek log.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, agrostology designates a term designating an entity, condition, or phenomenon derived from greek log."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[algology]] | noun | **1.** The study or science of algae : phycology.<br>**2.** The study or science of algae —called also algology. | *"In academic literature, algology designates the study or science of algae : phycology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analog]] | noun | **1.** Of, relating to, or being a mechanism or device in which information is represented by continuously variable physical quantities.<br>**2.** Of or relating to an analog computer. | *"In academic literature, analog designates of, relating to, or being a mechanism or device in which information is represented by continuously variable physical quantities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogical]] | noun | **1.** Of, relating to, or based on analogy.<br>**2.** Expressing or implying analogy. | *"Though the certainty of this criterion is far from demonstrable, yet it has the savor of analogical probability."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[analogise]] | verb | **1.** Make an analogy. | *"In academic literature, analogise designates make an analogy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogist]] | noun | **1.** One who searches for or reasons from analogies. | *"In academic literature, analogist designates one who searches for or reasons from analogies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogize]] | noun | **1.** To use or exhibit analogy.<br>**2.** To compare by analogy. | *"In academic literature, analogize designates to use or exhibit analogy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogous]] | noun | **1.** Similar or comparable to something else either in general or in some specific detail : similar in a way that invites comparison : showing an analogy or a likeness that permits one to draw an analogy. | *"A process somewhat analogous to that of alleged formations of the universe, time and times ago, was observable."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[analogously]] | adverb | **1.** In an analogous manner. | *"In academic literature, analogously designates in an analogous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogue]] | noun | **1.** Something that is similar or comparable to something else either in general or in some specific detail : something that is analogous to something else.<br>**2.** An organ or part similar in function to an organ or part of another animal or plant but different in structure and origin. | *"As for the black Ting, the nearest analogue to that which I can quote is the vases with black or brown black glaze belonging to the Tz´ŭ Chou class."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[analogy]] | noun | **1.** A comparison of two otherwise unlike things based on resemblance of a particular aspect; also : one of the two things being compared.<br>**2.** Resemblance in some particulars between things otherwise unlike : similarity. | *"The sweet scenes of autumn were for a while put by, unless some tender sonnet, fraught with the apt analogy of the declining year, with declining happiness, and the images of youth and hope, and spring, all gone together, blessed her memory."* — Jane Austen, *Persuasion* |
| [[anthologise]] | verb | **1.** Compile an anthology. | *"In academic literature, anthologise designates compile an anthology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthologist]] | noun | **1.** An editor who makes selections for an anthology. | *"In academic literature, anthologist designates an editor who makes selections for an anthology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthologize]] | verb | **1.** Compile an anthology. | *"In academic literature, anthologize designates compile an anthology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthology]] | noun | **1.** A collection of selected literary pieces or passages or works of art or music.<br>**2.** Assortment. | *"The present writer lived for some time within a short distance of his house, but found no opportunity to meet him until it became necessary to obtain his portrait for an anthology in course of publication."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[antilog]] | noun | **1.** Antilogarithm. | *"In academic literature, antilog designates antilogarithm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antilogarithm]] | noun | **1.** The number corresponding to a given logarithm. | *"In academic literature, antilogarithm designates the number corresponding to a given logarithm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apologetic]] | noun | **1.** Feeling or showing regret : regretfully acknowledging fault or failure : expressing an apology.<br>**2.** Offered in defense or vindication. | *"The old woman was terribly apologetic about having gone into the room."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[apologise]] | verb | **1.** Defend, explain, clear away, or make excuses for by reasoning.<br>**2.** Acknowledge faults or shortcomings or failing. | *"Rochester; “and in the interim, I shall myself look out for employment and an asylum for you.” “Thank you, sir; I am sorry to give—” “Oh, no need to apologise!"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[apologist]] | noun | **1.** Someone who speaks or writes in defense of someone or something that is typically controversial, unpopular, or subject to criticism. | *"He speaks of "the friendly Apollo." But the weakness of Plutarch as an apologist is his weakness as biographer--he never really gets at the bottom of anything."* — T. R. Glover, *The Jesus of History* |
| [[apologize]] | noun | **1.** To express regret for something done or said : to make an apology.<br>**2.** To offer a defense or excuse or admission of fault for (something)—used in negative statements. | *"The relations between us are of an unfortunate description, Lady Dedlock; but as they are not of my making, I will not apologize for them."* — Charles Dickens, *Bleak House* |
| [[apologue]] | noun | **1.** An allegorical narrative usually intended to convey a moral. | *"In academic literature, apologue designates an allegorical narrative usually intended to convey a moral."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apology]] | noun | **1.** An admission of error or discourtesy accompanied by an expression of regret.<br>**2.** An expression of regret for not being able to do something. | *"That you will take your instant leave o’ the king, And make this haste as your own good proceeding, Strengthen’d with what apology you think May make it probable need."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[catalog]] | noun | **1.** List, register.<br>**2.** A complete enumeration of items arranged systematically with descriptive details. | *"I p. 364.] [Footnote 7: In the first annual report of the United States Commissioner of Labor is given a long catalog of theories that have been suggested, many of them quite fantastic.] [Footnote 8: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[cataloger]] | noun | **1.** A librarian who classifies publication according to a categorial system. | *"In academic literature, cataloger designates a librarian who classifies publication according to a categorial system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dialog]] | noun | **1.** The conversational element of literary or dramatic composition (such as a movie, play, or novel).<br>**2.** A conversation between two or more persons; also : a similar exchange between a person and something else (such as a computer) —usually used before another noun. | *"In academic literature, dialog designates the conversational element of literary or dramatic composition (such as a movie, play, or novel)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dialogue]] | noun | **1.** The conversational element of literary or dramatic composition (such as a movie, play, or novel).<br>**2.** A conversation between two or more persons; also : a similar exchange between a person and something else (such as a computer) —usually used before another noun. | *"But shall we have this dialogue between the Fool and the Soldier?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dialogue doxology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek log.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, dialogue doxology designates a term designating an entity, condition, or phenomenon derived from greek log."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dialoguedoxology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek log.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, dialoguedoxology designates a term designating an entity, condition, or phenomenon derived from greek log."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epilog]] | noun | **1.** A concluding section that rounds out the design of a literary work : afterword.<br>**2.** A speech often in verse addressed to the audience by an actor at the end of a play; also : the actor speaking such an epilogue. | *"In academic literature, epilog designates a concluding section that rounds out the design of a literary work : afterword."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epilogue]] | noun | **1.** A concluding section that rounds out the design of a literary work : afterword.<br>**2.** A speech often in verse addressed to the audience by an actor at the end of a play; also : the actor speaking such an epilogue. | *"Exeunt all but Rosalind._] EPILOGUE ROSALIND."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[etymological]] | adjective | **1.** Based on or belonging to etymology. | *"See, for example, John Graham Dalyell, _The Darker Superstitions of Scotland_ (Edinburgh, 1834), pp. 176 _sq._: "The recognition of the pagan divinity Baal, or Bel, the Sun, is discovered through innumerable etymological sources."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[etymologise]] | verb | **1.** Give the etymology or derivation or suggest an etymology (for a word).<br>**2.** Construct the history of words. | *"In academic literature, etymologise designates give the etymology or derivation or suggest an etymology (for a word)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[etymologist]] | noun | **1.** A specialist in etymology. | *"The name _Hogan_--which has occasioned some discussion among antiquaries and etymologists--is probably derived from _ogof_ or _ogov_, the British name for a cavern."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[etymologize]] | noun | **1.** To discover, formulate, or state an etymology for.<br>**2.** To study or formulate etymologies. | *"In academic literature, etymologize designates to discover, formulate, or state an etymology for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[etymology]] | noun | **1.** The history of a linguistic form (such as a word) shown by tracing its development since its earliest recorded occurrence in the language where it is found, by tracing its transmission from one language to another, by analyzing it into its component parts, by identifying its cognates in other languages, or by tracing it and its cognates to a common ancestral form in an ancestral language.<br>**2.** A branch of linguistics concerned with etymologies. | *"The terms selling or buying monopoly explain themselves, tho the latter conflicts with the etymology.[1] Under conditions of barter the selling and the buying monopoly would be the same thing in two aspects."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[eulogise]] | verb | **1.** Praise formally and eloquently. | *"On a fine still autumn evening the 'crying of the neck' has a wonderful effect at a distance, far finer than that of the Turkish muezzin, which Lord Byron eulogises so much, and which he says is preferable to all the bells of Christendom."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[eulogist]] | noun | **1.** An orator who delivers eulogies or panegyrics. | *"When the time does come, it will suffice if a kind eulogist will say for me, as one said for Grant, "Let his faults … be writ in water." Lige, my condition came about slowly."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[eulogistic]] | adjective | **1.** Formally expressing praise. | *"Though I never knew what they were (being in Welsh), further than that they were highly eulogistic of the lineage of Morgan ap-Kerrig."* — Charles Dickens, *Bleak House* |
| [[eulogize]] | verb | **1.** Praise formally and eloquently. | *"You will live, but perhaps I shall die, since he is weary of carrying me." The lame marshal went on praising and eulogizing Kalelealuaka as he drew near."* — Classic Author, *Hawaiian folk tales* |
| [[eulogy]] | noun | **1.** A commendatory oration or writing especially in honor of one deceased.<br>**2.** High praise. | *"It is remarkable how little of the adjective there is--no compliment, no eulogy, no heroic touches, no sympathetic turn of phrase, no great passages of encomium or commendation."* — T. R. Glover, *The Jesus of History* |
| [[geologic]] | adjective | **1.** Of or relating to or based on geology. | *"The very place, where he have been alive, Un-Dead for all these centuries, is full of strangeness of the geologic and chemical world."* — Bram Stoker, *Dracula* |
| [[geological]] | adjective | **1.** Of or relating to or based on geology. | *"Badger, “that he disfigured some of the houses and other buildings by chipping off fragments of those edifices with his little geological hammer."* — Charles Dickens, *Bleak House* |
| [[geologically]] | adverb | **1.** With respect to geology. | *"In academic literature, geologically designates with respect to geology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geologist]] | noun | **1.** A specialist in geology. | *"That the vulgar should believe in extraordinary comets traversing space, and in the existence of antediluvian monsters in the heart of the globe, may well be; but neither astronomer nor geologist believes in such chimeras."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[geology]] | noun | **1.** A science that deals with the history of the earth and its life especially as recorded in rocks.<br>**2.** A study of the solid matter of a celestial body (such as the moon). | *"The details as to our metal stores are too complex for fuller treatment here, and may be found in treatises on economic geology or on industrial geography."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[heterologic]] | adjective | **1.** Not corresponding in structure or evolutionary origin. | *"In academic literature, heterologic designates not corresponding in structure or evolutionary origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homologic]] | adjective | **1.** Similar in evolutionary origin but not in function. | *"In academic literature, homologic designates similar in evolutionary origin but not in function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ideologue]] | noun | **1.** An often blindly partisan advocate or adherent of a particular ideology.<br>**2.** An impractical idealist : theorist. | *"In academic literature, ideologue designates an often blindly partisan advocate or adherent of a particular ideology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[log]] | noun | **1.** A usually bulky piece or length of a cut or fallen tree; especially : a length of a tree trunk ready for sawing and over six feet (1.8 meters) long.<br>**2.** An apparatus for measuring the rate of a ship's motion through the water that consists of a block fastened to a line and run out from a reel. | *"Enter Ferdinand bearing a log."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[logarithm]] | noun | **1.** The exponent that indicates the power to which a base number is raised to produce a given number.<br>**2.** A logarithm whose base is 10. | *"But it is best not to be intimate with gentlemen of this profession and to take the calculations at second hand, as you do logarithms, for to work them yourself, depend upon it, will cost you something considerable."* — William Makepeace Thackeray, *Vanity Fair* |
| [[logarithmic]] | noun | **1.** The exponent that indicates the power to which a base number is raised to produce a given number.<br>**2.** A function (such as y = loga x or y = ln x) that is the inverse of an exponential function (such as y = ax or y = ex) so that the independent variable appears in a logarithm. | *"In academic literature, logarithmic designates the exponent that indicates the power to which a base number is raised to produce a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logger]] | noun | **1.** A person who fells trees. | *"You logger-headed and unpolish’d grooms!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[logging]] | noun | **1.** The work of cutting down trees for timber.<br>**2.** Enter into a log, as on ships and planes. | *"In the Heart of the Logging District. 51 IV."* — Thomas D. Whittles, *The Lumberjack Sky Pilot* |
| [[logic]] | noun | **1.** A science that deals with the principles and criteria of validity of inference and demonstration : the science of the formal principles of reasoning.<br>**2.** A branch or variety of logic. | *"How now, how now, chopp’d logic?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[logical]] | adjective | **1.** Capable of or reflecting the capability for correct and valid reasoning.<br>**2.** Based on known statements or events or conditions. | *"Within the remote depths of his constitution, so gentle and affectionate as he was in general, there lay hidden a hard logical deposit, like a vein of metal in a soft loam, which turned the edge of everything that attempted to traverse it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[logician]] | noun | **1.** A person skilled at symbolic logic. | *"Mill's achievements as an economist, logician, psychologist, and politician are known more or less vaguely to all educated men; but his capacity and his actual work as a critic are comparatively little regarded."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[logistician]] | noun | **1.** A person skilled at symbolic logic. | *"I can give you a quick rundown on each now, if you wish." "I do." "Myra is a logistician and a Medic certified to Level 4 in space-related trauma, physical and psychological."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[logogram]] | noun | **1.** A letter, symbol, or sign used to represent an entire word. | *"In academic literature, logogram designates a letter, symbol, or sign used to represent an entire word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logogrammatic]] | adjective | **1.** Of or relating to logograms or logographs. | *"In academic literature, logogrammatic designates of or relating to logograms or logographs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logopaedics]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek log.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, logopaedics designates a term designating an entity, condition, or phenomenon derived from greek log."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logophile]] | noun | **1.** A lover of words. | *"In academic literature, logophile designates a lover of words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek log.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, logophobia designates a term designating an entity, condition, or phenomenon derived from greek log."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logotherapy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek log.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, logotherapy designates a term designating an entity, condition, or phenomenon derived from greek log."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meteorologic]] | adjective | **1.** Of or pertaining to atmospheric phenomena, especially weather and weather conditions. | *"In academic literature, meteorologic designates of or pertaining to atmospheric phenomena, especially weather and weather conditions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meteorological]] | adjective | **1.** Of or pertaining to atmospheric phenomena, especially weather and weather conditions. | *"Nor do there even occur any of those eccentric meteorological changes which elsewhere surprise us."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[meteorologically]] | adverb | **1.** With respect to the weather. | *"In academic literature, meteorologically designates with respect to the weather."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meteorologist]] | noun | **1.** A specialist who studies processes in the earth's atmosphere that cause weather conditions. | *"In academic literature, meteorologist designates a specialist who studies processes in the earth's atmosphere that cause weather conditions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meteorology]] | noun | **1.** A science that deals with the atmosphere and its phenomena and especially with weather and weather forecasting.<br>**2.** The atmospheric phenomena and weather of a region. | *"The reader may smile at the meteorology of the Far East; but precisely similar modes of procuring rain have been resorted to in Christian Europe within our own lifetime."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[monologist]] | noun | **1.** An entertainer who performs alone. | *"In academic literature, monologist designates an entertainer who performs alone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monologue]] | noun | **1.** soliloquy.<br>**2.** a dramatic sketch performed by one actor. | *"I didn't expect this to be a monologue, by far."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[monologuise]] | verb | **1.** Talk to oneself. | *"In academic literature, monologuise designates talk to oneself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monologuize]] | verb | **1.** Talk to oneself. | *"In academic literature, monologuize designates talk to oneself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphological]] | noun | **1.** A branch of biology that deals with the form and structure of animals and plants.<br>**2.** The form and structure of an organism or any of its parts. | *"In academic literature, morphological designates a branch of biology that deals with the form and structure of animals and plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphologically]] | adverb | **1.** In a morphological manner; with regard to morphology. | *"In academic literature, morphologically designates in a morphological manner; with regard to morphology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphology]] | noun | **1.** A branch of biology that deals with the form and structure of animals and plants.<br>**2.** The form and structure of an organism or any of its parts. | *"In academic literature, morphology designates a branch of biology that deals with the form and structure of animals and plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleogeology]] | noun | **1.** The study of geologic features once at the surface of the earth but now buried beneath rocks. | *"In academic literature, paleogeology designates the study of geologic features once at the surface of the earth but now buried beneath rocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philological]] | adjective | **1.** Of or relating to or dealing with philology. | *"In academic literature, philological designates of or relating to or dealing with philology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philologist]] | noun | **1.** A humanist specializing in classical scholarship. | *"Something of that sort.” “Colonial, is it not?” pursued Lydia, with the air of a philologist."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[philology]] | noun | **1.** The study of literature and of disciplines relevant to literature or to language as used in literature.<br>**2.** Linguistics; especially : historical and comparative linguistics. | *"At least it seems more likely that the rule sprang from a superstition of this sort than from a simple calculation of expediency, as I formerly suggested (_Journal of Philology_, xiv. (1885) p. 158)."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[phraseology]] | noun | **1.** A manner of organizing words and phrases into longer elements : style.<br>**2.** Choice of words. | *"He himself knew that, in reality, the confused beliefs which she held, apparently imbibed in childhood, were, if anything, Tractarian as to phraseology, and Pantheistic as to essence."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tautologic]] | adjective | **1.** Repetition of same sense in different words; ; ; - j.b.conant. | *"In academic literature, tautologic designates repetition of same sense in different words; ; ; - j.b.conant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tautological]] | adjective | **1.** Repetition of same sense in different words; ; ; - j.b.conant. | *"I never copy what I write to you, so I may be often tautological, or perhaps contradictory."* — Robert Burns, *The Letters of Robert Burns* |
| [[tautology]] | noun | **1.** Needless repetition of an idea, statement, or word.<br>**2.** An instance of such repetition. | *"The declaration itself, though it may be chargeable with tautology or redundancy, is at least perfectly harmless."* — Alexander Hamilton, *The Federalist Papers* |
| [[terminological]] | adjective | **1.** Of or concerning terminology. | *"Yes, I heard every word you said to Laura: you made a gallant effort, but the facts speak for themselves, and your terminological inexactitudes wouldn't deceive a babe at the breast."* — Anthony Pryde, *Nightfall* |
| [[terminology]] | noun | **1.** The technical or special terms used in a business, art, science, or special subject.<br>**2.** Nomenclature as a field of study. | *"We shall make the best use of them, when we are no longer intimidated by the terminology, but go at once to what is meant--to the facts."* — T. R. Glover, *The Jesus of History* |
| [[toxicologic]] | adjective | **1.** Of or relating to toxicology. | *"In academic literature, toxicologic designates of or relating to toxicology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[toxicological]] | adjective | **1.** Of or relating to toxicology. | *"In academic literature, toxicological designates of or relating to toxicology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[toxicologist]] | noun | **1.** One who studies the nature and effects of poisons and their treatment. | *"In academic literature, toxicologist designates one who studies the nature and effects of poisons and their treatment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[toxicology]] | noun | **1.** A science that deals with poisons and their effect and with the problems involved (such as clinical, industrial, or legal problems). | *"In academic literature, toxicology designates a science that deals with poisons and their effect and with the problems involved (such as clinical, industrial, or legal problems)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unapologetic]] | adjective | **1.** Unwilling to make or express an apology. | *"In academic literature, unapologetic designates unwilling to make or express an apology."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech & Language]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LOG
  </div>
</div>
