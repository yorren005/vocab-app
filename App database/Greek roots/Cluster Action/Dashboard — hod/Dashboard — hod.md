---
status: unread
type: root_dashboard
---
# Dashboard — hod
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">hod</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“way”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'way'.</span>
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

The Greek root **hod** (*hod*) signifies way. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Methodism*, *Methodist*, *cathode*, *electrode*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: way
> The Greek root **hod** fundamentally denotes **way**. The physical sensory observation and cognitive anchor underlying 'way'. In classical Greek antiquity, the root denoted 'way', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">way</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'way'.</mark>
> - **Everyday Connection**: Think of familiar words like *Methodism*, *Methodist*, *cathode*, *electrode*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **hod** derives from Ancient Greek **hod**, meaning "way".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with hod**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'way'.
  - Whenever you see **hod** in an English word, think immediately of **way**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">hod</mark>, think of <mark class="hl-def">way</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `hod-` (from **hod**).
> - **Combining Stem with -o- Connective:** `hodo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Hod
> - **1. Direct & Concrete Anchor:** Literal instantiation of way in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on hod

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `hod-` | [[Methodism]] | Primary root semantic foundation denoting way. |
| **Connecting -o-** | `hodo-` | [[Methodist]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `hod` | [[cathode]] | Relational or directional modification of the core root sense. |

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
| [[aperiodic]] | adjective | **1.** Not recurring at regular intervals. | *"In academic literature, aperiodic designates not recurring at regular intervals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cathode]] | noun | **1.** The electrode of an electrochemical cell at which reduction occurs:.<br>**2.** The negative terminal of an electrolytic cell. | *"In addition, the purity of the materials, the cleanliness of the batteries, the perfection of the electrical connections as well as the distance between the anode and the cathode are all matters of importance."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[cathodic]] | adjective | **1.** Of or at or pertaining to a cathode. | *"In academic literature, cathodic designates of or at or pertaining to a cathode."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrode]] | noun | **1.** A conductor used to establish electrical contact with a nonmetallic part of a circuit.<br>**2.** An element in a semiconductor device (such as a transistor) that emits or collects electrons or holes or controls their movements. | *"Since, however, it may not be easy for the general reader to carry all these terms in his mind, we will, when it is necessary to differentiate between the two electrodes, call one the in-electrode and the other the out-electrode."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[episode]] | noun | **1.** A usually brief unit of action in a dramatic or literary work: such as.<br>**2.** The part of an ancient Greek tragedy between two choric songs. | *"Suppose we walk about in this wood?” Liddy, without exactly understanding everything, or anything, in this episode, assented, and they walked together further among the trees."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[episodic]] | adjective | **1.** Of writing or narration; divided into or composed of episodes.<br>**2.** Occurring or appearing at usually irregular intervals. | *"He did this in an episodic way, very much as he gave orders to his tailor for every requisite of perfect dress, without any notion of being extravagant."* — George Eliot, *Middlemarch* |
| [[ergodic]] | noun | **1.** Of or relating to a process in which every sequence or sizable sample is equally representative of the whole (as in regard to a statistical parameter).<br>**2.** Involving or relating to the probability that any state will recur; especially : having zero probability that any state will never recur. | *"In academic literature, ergodic designates of or relating to a process in which every sequence or sizable sample is equally representative of the whole (as in regard to a statistical parameter)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exodos]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hod.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, exodos designates a term designating an entity, condition, or phenomenon derived from greek hod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exodus]] | noun | **1.** The mainly narrative second book of canonical Jewish and Christian Scripture.<br>**2.** A mass departure : emigration. | *"Nearly all the labourers on Flintcomb-Ash farm intended flight, and early in the morning there was a general exodus in the direction of the town, which lay at a distance of from ten to a dozen miles over hilly country."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[heptode]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hod.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, heptode designates a term designating an entity, condition, or phenomenon derived from greek hod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herpolhode]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hod.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, herpolhode designates a term designating an entity, condition, or phenomenon derived from greek hod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hod]] | noun | **1.** A tray or trough that has a pole handle and that is borne on the shoulder for carrying loads (as of mortar or brick).<br>**2.** A coal scuttle. | *"The other contested the point, and the conversation ended in a bet that he could not carry him in his hod up a ladder to the top of the building."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[hoder]] | noun | **1.** (norse mythology) a blind god; misled by loki, he kills his brother balder by throwing a shaft of mistletoe. | *"And I remember me, when I was of the Assir, and of the Vanir, that Odin sat in judgment over men in the court of the twelve gods, and that their names were Thor, Baldur, Niord, Frey, Tyr, Bregi, Heimdal, Hoder, Vidar, Ull, Forseti, and Loki."* — Jack London, *The Jacket (The Star-Rover)* |
| [[hodograph]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hod.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, hodograph designates a term designating an entity, condition, or phenomenon derived from greek hod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hodology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hod.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, hodology designates a term designating an entity, condition, or phenomenon derived from greek hod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hodometer]] | noun | **1.** Hodometer may refer to:a dated term for odometer, a device for measuring distance travelled by a vehicle
a surveyor's wheel, a device for measuring distance. | *"The treatise offered an incisive discussion of hodometer, examining its conceptual origins in classical antiquity."* |
| [[hodonym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hod.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, hodonym designates a term designating an entity, condition, or phenomenon derived from greek hod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hodophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hod.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, hodophobia designates a term designating an entity, condition, or phenomenon derived from greek hod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hodos]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hod.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, hodos designates a term designating an entity, condition, or phenomenon derived from greek hod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hodoscope]] | noun | **1.** An instrument for tracing the paths of ionizing particles by means of ion counters in close array. | *"In academic literature, hodoscope designates an instrument for tracing the paths of ionizing particles by means of ion counters in close array."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[method]] | noun | **1.** A procedure or process for attaining an object: such as.<br>**2.** A systematic procedure, technique, or mode of inquiry employed by or proper to a particular discipline or art. | *"Madam, methinks, if you did love him dearly, You do not hold the method to enforce The like from him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[methodic]] | noun | **1.** Arranged, characterized by, or performed with method or order.<br>**2.** Habitually proceeding according to method : systematic. | *"There again!—there again!” he cried, in long-drawn, lingering, methodic tones, attuned to the gradual prolongings of the whale’s visible jets."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[methodical]] | adjective | **1.** Characterized by method and orderliness. | *"He comes towards them at his usual methodical pace, which is never quickened, never slackened."* — Charles Dickens, *Bleak House* |
| [[methodically]] | adverb | **1.** In a methodical manner. | *"Ain’t the lady the t’other lady?” Charley shook her head as she methodically drew his rags about him and made him as warm as she could."* — Charles Dickens, *Bleak House* |
| [[methodicalness]] | noun | **1.** The quality of appreciating method and system. | *"In academic literature, methodicalness designates the quality of appreciating method and system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Methodism]] | noun | **1.** The doctrines and practice of Methodists.<br>**2.** The Methodist churches. | *"In his "Memorials of Methodism in Virginia," Dr."* — Classic Author, *The wonders of prayer* |
| [[methodism]] | noun | **1.** The religious beliefs and practices of methodists characterized by concern with social welfare and public morals. | *"In academic literature, methodism designates **1.** the religious beliefs and practices of methodists characterized by concern with social welfare and public morals."* — Academic Lexicon |
| [[Methodist]] | noun | **1.** A person devoted to or laying great stress on method.<br>**2.** A member of one of the denominations deriving from the Wesleyan revival in the Church of England, having Arminian doctrine and in the U.S. modified episcopal polity, and stressing personal and social morality. | *"And what mid Methodist pa’sons have to do with she?” “Who is the fellow?” asked d’Urberville, turning to Tess."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[methodist]] | noun | **1.** A follower of wesleyanism as practiced by the methodist church.<br>**2.** Of or pertaining to or characteristic of the branch of protestantism adhering to the views of wesley. | *"In academic literature, methodist designates **1.** a follower of wesleyanism as practiced by the methodist church.<br>**2.** of or pertaining to or characteristic of the branch of protestantism adhering to the views of wesley."* — Academic Lexicon |
| [[methodological]] | adjective | **1.** Relating to the methodology of some discipline. | *"In academic literature, methodological designates relating to the methodology of some discipline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[methodologically]] | adverb | **1.** In a methodical manner. | *"In academic literature, methodologically designates in a methodical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[methodology]] | noun | **1.** A body of methods, rules, and ideas that are important in a science, art, or discipline : a particular procedure or set of procedures.<br>**2.** A science or the study of method; specifically : the analysis of the principles or procedures of inquiry in a particular field. | *"Note: The technical design and operation of military man-carrying parachutes has advanced enormously since WW2 and the Korean War, as have parachute servicing, packing and maintenance methodologies."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[period]] | noun | **1.** The completion of a cycle, a series of events, or a single action : conclusion.<br>**2.** An utterance from one full stop to another : sentence. | *"Tend me tonight; May be it is the period of your duty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[periodic]] | noun | **1.** Occurring or recurring at regular intervals.<br>**2.** Occurring repeatedly from time to time. | *"He makes periodic efforts to find me, but my lawyers are loyal, and will give no clue." "And the settlement?"* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[periodical]] | noun | **1.** A publication that appears at fixed intervals.<br>**2.** Happening or recurring at regular intervals. | *"The periodical visits of the trooper to these rooms, however, in the course of his patrolling is an assurance of protection and company both to mistress and maid, which renders them very acceptable in the small hours of the night."* — Charles Dickens, *Bleak House* |
| [[periodically]] | adverb | **1.** In a sporadic manner. | *"I have him periodically in a vice."* — Charles Dickens, *Bleak House* |
| [[periodicity]] | noun | **1.** The quality of recurring at regular intervals. | *"Consequently, to distinguish the comparatively slowly changing currents of a "frequency" or "periodicity" of a few hundreds per second from these much more rapid ones, the latter are more often spoken of as electrical oscillations."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[synod]] | noun | **1.** An ecclesiastical governing or advisory council: such as.<br>**2.** An assembly of bishops in the Roman Catholic Church. | *"Gods and goddesses, All the whole synod of them!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unmethodical]] | adjective | **1.** Not efficient or methodical. | *"In academic literature, unmethodical designates not efficient or methodical."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · HOD
  </div>
</div>
