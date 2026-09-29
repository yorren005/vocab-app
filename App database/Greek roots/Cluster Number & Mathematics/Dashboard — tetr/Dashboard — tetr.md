---
status: unread
type: root_dashboard
---
# Dashboard — tetr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">τέτϝαρες</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“four”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'four'.</span>
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

The Greek root **tetr** (τέτϝαρες, τέσσαρες, τεσσάρων (téssares, tessárōn)) signifies four. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *diatessaron*, *tetra*, *tetragon*, *tetrahedron*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: four
> The Greek root **tetr** fundamentally denotes **four**. The physical sensory observation and cognitive anchor underlying 'four'. In classical Greek antiquity, the root denoted 'four', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">four</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'four'.</mark>
> - **Everyday Connection**: Think of familiar words like *diatessaron*, *tetra*, *tetragon*, *tetrahedron*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tetr** derives from Ancient Greek <mark class="hl-stem">τέτϝαρες, τέσσαρες, τεσσάρων (téssares, tessárōn)</mark>, meaning "four".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with tetr**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'four'.
  - Whenever you see **tetr** in an English word, think immediately of **four**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tetr</mark>, think of <mark class="hl-def">four</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `tetr-` (from *τέτϝαρες, τέσσαρες, τεσσάρων (téssares, tessárōn)*).
> - **Combining Stem with -o- Connective:** `tetro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Tetr
> - **1. Direct & Concrete Anchor:** Literal instantiation of four in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on tetr

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `tetr-` | [[diatessaron]] | Primary root semantic foundation denoting four. |
| **Connecting -o-** | `tetro-` | [[tetra]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `tetr` | [[tetragon]] | Relational or directional modification of the core root sense. |

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
| [[diatessaron]] | noun | **1.** A harmony of the four Gospels edited and arranged into a single connected narrative. | *"In academic literature, diatessaron designates a harmony of the four gospels edited and arranged into a single connected narrative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytetrafluoroethylene]] | noun | **1.** A material used to coat cooking utensils and in industrial applications where sticking is to be avoided. | *"In academic literature, polytetrafluoroethylene designates a material used to coat cooking utensils and in industrial applications where sticking is to be avoided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetra]] | noun | **1.** Any of numerous small often brightly colored South American characin fishes often bred in tropical aquariums.<br>**2.** Four : having four : having four parts. | *"Do you suppose those birds--the tetra-axes or whatever Beeville calls them--?" They turned and scanned the sky."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[tetrabromo-phenolsulfonephthalein]] | noun | **1.** A dye used as an acid-base indicator. | *"In academic literature, tetrabromo-phenolsulfonephthalein designates a dye used as an acid-base indicator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetracaine]] | noun | **1.** A crystalline compound used in the form of a hydrochloride as a local anesthetic. | *"In academic literature, tetracaine designates a crystalline compound used in the form of a hydrochloride as a local anesthetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrachlorethylene]] | noun | **1.** Anthelmintic agent used against hookworm and other nematodes. | *"In academic literature, tetrachlorethylene designates anthelmintic agent used against hookworm and other nematodes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrachloride]] | noun | **1.** Any compound that contains four chlorine atoms per molecule. | *"In academic literature, tetrachloride designates any compound that contains four chlorine atoms per molecule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrachloroethylene]] | noun | **1.** Anthelmintic agent used against hookworm and other nematodes. | *"In academic literature, tetrachloroethylene designates anthelmintic agent used against hookworm and other nematodes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrachloromethane]] | noun | **1.** A colorless nonflammable liquid used as a solvent for fats and oils; because of its toxicity its use as a cleaning fluid or fire extinguisher has declined. | *"In academic literature, tetrachloromethane designates a colorless nonflammable liquid used as a solvent for fats and oils; because of its toxicity its use as a cleaning fluid or fire extinguisher has declined."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetraclinis]] | noun | **1.** Sandarac tree. | *"In academic literature, tetraclinis designates sandarac tree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetracycline]] | noun | **1.** An antibiotic (trade name achromycin) derived from microorganisms of the genus streptomyces and used broadly to treat infections. | *"In academic literature, tetracycline designates an antibiotic (trade name achromycin) derived from microorganisms of the genus streptomyces and used broadly to treat infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrad]] | noun | **1.** The cardinal number that is the sum of three and one. | *"In academic literature, tetrad designates the cardinal number that is the sum of three and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrafluoroethylene]] | noun | **1.** A flammable gaseous fluorocarbon used in making plastics (polytetrafluoroethylene resins). | *"In academic literature, tetrafluoroethylene designates a flammable gaseous fluorocarbon used in making plastics (polytetrafluoroethylene resins)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetragon]] | noun | **1.** In geometry, a quadrilateral is a four-sided polygon, having four edges (sides) and four corners (vertices).<br>**2.** The word is derived from the Latin words quadri, a variant of four, and latus, meaning "side". | *"In academic literature, tetragon designates in geometry, a quadrilateral is a four-sided polygon, having four edges (sides) and four corners (vertices)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetragonal]] | adjective | **1.** Of or relating to or shaped like a quadrilateral. | *"In academic literature, tetragonal designates of or relating to or shaped like a quadrilateral."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetragonia]] | noun | **1.** New zealand spinach. | *"In academic literature, tetragonia designates new zealand spinach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetragoniaceae]] | noun | **1.** Succulent herbs or small shrubs mostly of south africa but also new zealand and north america: carpetweeds; fig marigolds. | *"In academic literature, tetragoniaceae designates succulent herbs or small shrubs mostly of south africa but also new zealand and north america: carpetweeds; fig marigolds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetragonurus]] | noun | **1.** A genus of stromateidae. | *"In academic literature, tetragonurus designates a genus of stromateidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetragram]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gramm.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, tetragram designates a term designating an entity, condition, or phenomenon derived from greek gramm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetragrammaton]] | noun | **1.** The four Hebrew letters usually transliterated YHWH or JHVH that form a biblical proper name of God. | *"In academic literature, tetragrammaton designates the four hebrew letters usually transliterated yhwh or jhvh that form a biblical proper name of god."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrahalide]] | noun | **1.** Any halide containing four halogen atoms in its molecules. | *"In academic literature, tetrahalide designates any halide containing four halogen atoms in its molecules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrahedron]] | noun | **1.** A polyhedron that has four faces. | *"In academic literature, tetrahedron designates a polyhedron that has four faces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrahydrocannabinol]] | noun | **1.** Psychoactive substance present in marijuana. | *"In academic literature, tetrahydrocannabinol designates psychoactive substance present in marijuana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrahymena]] | noun | **1.** Relative of the paramecium; often used in genetics research. | *"In academic literature, tetrahymena designates relative of the paramecium; often used in genetics research."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetraiodothyronine]] | noun | **1.** Hormone produced by the thyroid glands to regulate metabolism by controlling the rate of oxidation in cells. | *"In academic literature, tetraiodothyronine designates hormone produced by the thyroid glands to regulate metabolism by controlling the rate of oxidation in cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetralogy]] | noun | **1.** A series of four connected works (such as operas or novels).<br>**2.** A group of four dramatic pieces presented consecutively on the Attic stage at the Dionysiac festival. | *"In academic literature, tetralogy designates a series of four connected works (such as operas or novels)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetramerous]] | adjective | **1.** Having or consisting of four similar parts; tetramerous flowers. | *"In academic literature, tetramerous designates having or consisting of four similar parts; tetramerous flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrameter]] | noun | **1.** A line of verse consisting either of four dipodies (as in classical iambic, trochaic, and anapestic verse) or four metrical feet (as in modern English verse). | *"A catalectic tetrameter of iambs marching."* — James Joyce, *Ulysses* |
| [[tetramethyldiarsine]] | noun | **1.** A poisonous oily liquid with a garlicky odor composed of 2 cacodyl groups; undergoes spontaneous combustion in dry air. | *"In academic literature, tetramethyldiarsine designates a poisonous oily liquid with a garlicky odor composed of 2 cacodyl groups; undergoes spontaneous combustion in dry air."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrametric]] | adjective | **1.** Of or relating to verse lines written in tetrameter. | *"In academic literature, tetrametric designates of or relating to verse lines written in tetrameter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetraneuris]] | noun | **1.** Genus of hairy yellow-flowered plants of the western united states. | *"In academic literature, tetraneuris designates genus of hairy yellow-flowered plants of the western united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetranychid]] | noun | **1.** Web-spinning mite that attacks garden plants and fruit trees. | *"In academic literature, tetranychid designates web-spinning mite that attacks garden plants and fruit trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetranychidae]] | noun | **1.** Plant-feeding mites. | *"In academic literature, tetranychidae designates plant-feeding mites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrao]] | noun | **1.** Type genus of the tetraonidae: capercaillies. | *"In academic literature, tetrao designates type genus of the tetraonidae: capercaillies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetraodontidae]] | noun | **1.** Puffers. | *"Classical and authoritative lexicons catalog tetraodontidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetraonidae]] | noun | **1.** Grouse. | *"Classical and authoritative lexicons catalog tetraonidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetraphobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek tetr.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, tetraphobia designates a term designating an entity, condition, or phenomenon derived from greek tetr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrapod]] | noun | **1.** A vertebrate (such as an amphibian, a bird, or a mammal) with two pairs of limbs. | *"In academic literature, tetrapod designates a vertebrate (such as an amphibian, a bird, or a mammal) with two pairs of limbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrapturus]] | noun | **1.** A genus of istiophoridae. | *"In academic literature, tetrapturus designates a genus of istiophoridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrasaccharide]] | noun | **1.** Any of a variety of carbohydrates that yield four monosaccharide molecules on complete hydrolysis. | *"In academic literature, tetrasaccharide designates any of a variety of carbohydrates that yield four monosaccharide molecules on complete hydrolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetraskele]] | noun | **1.** A figure consisting of four stylized human arms or legs (or bent lines) radiating from a center. | *"In academic literature, tetraskele designates a figure consisting of four stylized human arms or legs (or bent lines) radiating from a center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetraskelion]] | noun | **1.** A figure consisting of four stylized human arms or legs (or bent lines) radiating from a center. | *"In academic literature, tetraskelion designates a figure consisting of four stylized human arms or legs (or bent lines) radiating from a center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrasporangium]] | noun | **1.** A sporangium containing four asexual spores. | *"In academic literature, tetrasporangium designates a sporangium containing four asexual spores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetraspore]] | noun | **1.** One of the four haploid asexual spores developed meiotically in the red algae. | *"In academic literature, tetraspore designates one of the four haploid asexual spores developed meiotically in the red algae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetravalent]] | adjective | **1.** Haveing a valence of four. | *"In academic literature, tetravalent designates haveing a valence of four."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrazzini]] | noun | **1.** A pasta dish with cream sauce and mushrooms. | *"In academic literature, tetrazzini designates a pasta dish with cream sauce and mushrooms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetri]] | noun | **1.** 100 tetri equal 1 lari in georgia. | *"In academic literature, tetri designates 100 tetri equal 1 lari in georgia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrode]] | noun | **1.** A vacuum tube with a cathode, an anode, a control grid, and an additional grid or other electrode. | *"In academic literature, tetrode designates a vacuum tube with a cathode, an anode, a control grid, and an additional grid or other electrode."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrodotoxin]] | noun | **1.** A powerful neurotoxin found in the ovaries of pufferfish. | *"In academic literature, tetrodotoxin designates a powerful neurotoxin found in the ovaries of pufferfish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrose]] | noun | **1.** Any monosaccharide sugar containing four atoms of carbon per molecule. | *"In academic literature, tetrose designates any monosaccharide sugar containing four atoms of carbon per molecule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetroxide]] | noun | **1.** A compound of an element or group with four atoms of oxygen.<br>**2.** A colorless toxic gas N2O4 that is a dimer of nitrogen dioxide and that in liquid form is used as an oxidizer in rocket engines. | *"In academic literature, tetroxide designates a compound of an element or group with four atoms of oxygen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetryl]] | noun | **1.** A yellow crystalline explosive solid that is used in detonators. | *"In academic literature, tetryl designates a yellow crystalline explosive solid that is used in detonators."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Mathematics]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TETR
  </div>
</div>
