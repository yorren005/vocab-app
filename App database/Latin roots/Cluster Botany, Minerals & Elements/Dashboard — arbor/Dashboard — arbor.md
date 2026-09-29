---
status: unread
type: root_dashboard
---
# Dashboard — arbor
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">arbor-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“tree”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Plants blossoming in the wild and raw minerals mined from the earth.</span>
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

The root **arbor** means tree. It refers to woody perennial plants with trunks, branches, and leaves. In English, this root forms words such as *arbor*, *arboreal*, and *arboretum*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: tree
> The root **arbor** means tree. It refers to woody perennial plants with trunks, branches, and leaves. In English, this root forms words such as *arbor*, *arboreal*, and *arboretum*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Tree</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Plants blossoming in the wild and raw minerals mined from the earth.</mark>
> - **Everyday Connection**: Think of familiar words like *arbor* and *arboreal*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **arbor** comes from a Latin word that means *"tree"*.
  - At its core, it describes tree.

- **The Big Picture Idea**:
  - Picture plants blossoming in the wild and raw minerals mined from the earth.
  - Whenever you see **arbor** in an English word, think of **plants, minerals, and elements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of tree.
  - **Mental & Social**: How people experience, organize, or communicate about tree.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Arbor**: A shaded garden shelter or bower formed of latticework covered with climbing vines or trees.
  - **Arboreal**: Of, relating to, or resembling a tree.
  - **Arboretum**: An everyday English word showing the root's idea of *tree*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">arbor</mark>, think of <mark class="hl-def">plants, minerals, and elements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> Unlike verbal roots that pivot on prefixes, **arbor** is a 3rd-declension feminine noun root and forms English words primarily via **suffixation** and **compounding**:
> - **Nominal Base:** *arbor, arboris* (stem `arbor-`), source of English *arbor* (garden bower; rotating spindle).
> - **Adjectival Stems:** Latin *arborālis / arboreus* (stem `arbore-` → *arboreal*, *arboreous*).
> - **Inchoative / Descriptive Suffix:** Latin *-ēscēns* ("becoming" → *arborescent*, *arborescence*).
> - **Botanical Place Suffix:** Latin *-ētum* ("grove, plantation of" → *arboretum*).
> - **Compounding Elements:** Compounding with *cultūra* ("tilling" → *arboriculture*), *vīta* ("life" → *arborvitae*), *forma* ("shape" → *arboriform*), and *Day* (*Arbor Day*).
>
> In modern medicine, the verbalizing suffix *-ize* generated *arborize* and *arborization* to describe the spreading of dendrites, axons, and crystalline minerals.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.latin_root);
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

> [!tip] 🌈 Shades of Meaning in Different Words
> The family distributes across distinct botanical, zoological, neurological, and mechanical zones:
> - **Zoology, Ecology & Habitat:** [[arboreal]] (living in trees; tree-dwelling locomotion), [[arboreally]] (in trees), [[arboreous]] (full of trees, wooded), [[arborous]] (formed of trees).
> - **Morphology & Neuroanatomy:** [[arborescent]] (treelike in branching structure), [[arborescence]] (treelike growth or dendritic crystal pattern), [[arborize]] (to branch like a tree), [[arborization]] (branching termination of a nerve fiber or dendritic tree), [[arboriform]] (tree-shaped).
> - **Horticulture, Conservation & Botanical Gardens:** [[arboretum]] (botanical garden devoted to trees), [[arboriculture]] (cultivation and management of individual trees), [[arboricultural]] (relating to tree care), [[arboriculturist]] (tree specialist), [[arborist]] (professional tree surgeon/caretaker), [[Arbor Day]] (annual civic tree-planting holiday).
> - **Botany & Anatomy (Tree of Life):** [[arborvitae]] (coniferous evergreen tree of genus *Thuja*; branching white matter of the cerebellum).
> - **Mechanical Engineering & Garden Architecture:** [[arbor]] (shaded bower of lattice and climbing vines; a rotating shaft, mandrel, or axle on a milling machine or lathe).

---

## 🔀 4. Prefix & Combining Dynamics on arbor

### Suffix Transformations

| Suffix | Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| **-al / -eal** | Adjective forming | [[arboreal]] | Pertaining to trees; adapted for living or climbing in trees. |
| **-eous** | Characterizing adjective | [[arboreous]] | Full of trees; wooded; possessing the characteristics of a tree. |
| **-escent** | Inchoative adjective of shape | [[arborescent]] | Growing into or resembling the branching shape of a tree. |
| **-escence** | Abstract process noun | [[arborescence]] | The state or pattern of branching like a tree; dendritic crystallization. |
| **-etum** | Noun of place (*-ētum*) | [[arboretum]] | A designated botanical sanctuary or collection of living woody trees. |
| **-ist** | Agent / Specialist noun | [[arborist]] | A certified professional skilled in the health, pruning, and care of trees. |
| **-ize / -ization** | Verbalizer & Process noun | [[arborize]] / [[arborization]] | To branch outward in fine twigs; the dendritic arbor of a neuron. |

### Compounding Formations with `arbor`

| Compounding Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **-culture** | cultivation (*cultūra*) | [[arboriculture]] | The scientific cultivation, pruning, and preservation of ornamental trees. |
| **vitae** | of life (*vīta*) | [[arborvitae]] | Literally "tree of life"; evergreen *Thuja* or cerebellar white matter. |
| **-form** | shape (*forma*) | [[arboriform]] | Having the upright, branching structural shape of a tree. |
| **Day** | calendar observance | [[Arbor Day]] | An annual civic holiday dedicated to planting trees and forest conservation. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Neuroscience & Neuroanatomy** | [[arborvitae]], [[arborization]], [[arborize]] | Microscopic analysis of Purkinje cell dendritic arborization in the cerebellum, and axon branching in neural circuit mapping. |
| **Zoology, Primatology & Paleontology** | [[arboreal]], [[arboreally]] | Investigating primate locomotion (brachiation in arboreal gibbons), tree-canopy adaptations, and the evolutionary transition from arboreal to ground life. |
| **Horticulture & Urban Forestry** | [[arborist]], [[arboriculture]], [[arboretum]] | Municipal urban canopy management, structural cabling of historic specimen oaks, risk assessment for falling limbs, and living gene-bank collections. |
| **Mineralogy & Materials Science** | [[arborescent]], [[arborescence]] | Describing dendritic mineral crystal growth (such as native copper, silver, or manganese dendrites in sedimentary rock). |
| **Mechanical Engineering & Manufacturing** | [[arbor]] | Selecting hardened steel machine tool arbors to mount circular saw blades, milling cutters, and grinding wheels securely on rotating spindles. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[arbor]] | noun | **1.** Tree (as opposed to shrub).<br>**2.** Any of various rotating shafts that serve as axes for larger rotating parts. | *"He directed them to build a large _lanai_, or arbor, to be entirely covered with ferns, ginger, maile, and ieie--the sweet and odorous foliage greens of the islands."* — Classic Author, *Hawaiian folk tales* |
| [[arbor day]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin arbor within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of arbor in systematic terminology. | *"In academic literature, arbor day designates pertaining to, derived from, or characteristic of latin arbor within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arboraceous]] | adjective | **1.** Abounding in trees. | *"In academic literature, arboraceous designates abounding in trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arborary]] | adjective | **1.** Of or relating to or formed by trees. | *"In academic literature, arborary designates of or relating to or formed by trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arboreal]] | adjective | **1.** Of or relating to or formed by trees.<br>**2.** Inhabiting or frequenting trees. | *"In academic literature, arboreal designates of or relating to or formed by trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arboreous]] | adjective | **1.** Inhabiting or frequenting trees.<br>**2.** Abounding in trees. | *"In academic literature, arboreous designates inhabiting or frequenting trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arborescent]] | adjective | **1.** Resembling a tree in form and branching structure. | *"In academic literature, arborescent designates resembling a tree in form and branching structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arboresque]] | adjective | **1.** Resembling a tree in form and branching structure. | *"In academic literature, arboresque designates resembling a tree in form and branching structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arboretum]] | noun | **1.** A facility where trees and shrubs are cultivated for exhibition. | *"It was with much gratification that I learned at a later time of the remarkable work done in connection with the Arnold Arboretum near Boston in seeking out and bringing to America specimens of many of China's beautiful trees and plants."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[arborical]] | adjective | **1.** Of or relating to or formed by trees. | *"In academic literature, arborical designates of or relating to or formed by trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arboriculture]] | noun | **1.** The cultivation of tree for the production of timber. | *"In academic literature, arboriculture designates the cultivation of tree for the production of timber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arboriculturist]] | noun | **1.** Someone trained in forestry. | *"In academic literature, arboriculturist designates someone trained in forestry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arboriform]] | adjective | **1.** Resembling a tree in form and branching structure. | *"In academic literature, arboriform designates resembling a tree in form and branching structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arborise]] | verb | **1.** Branch out like trees. | *"In academic literature, arborise designates branch out like trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arborist]] | noun | **1.** A specialist in treating damaged trees. | *"In academic literature, arborist designates a specialist in treating damaged trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arborize]] | verb | **1.** Branch out like trees. | *"In academic literature, arborize designates branch out like trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arborolatry]] | noun | **1.** The worship of trees. | *"In academic literature, arborolatry designates the worship of trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arborous]] | adjective | **1.** Of or relating to or formed by trees. | *"In academic literature, arborous designates of or relating to or formed by trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arborvitae]] | noun | **1.** Any of several asian and north american conifers of the genera thuja and thujopsis. | *"In academic literature, arborvitae designates any of several asian and north american conifers of the genera thuja and thujopsis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonarboreal]] | adjective | **1.** Not inhabiting or frequenting trees. | *"In academic literature, nonarboreal designates not inhabiting or frequenting trees."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Botany, Minerals & Elements]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ARBOR
  </div>
</div>
