---
status: unread
type: root_dashboard
---
# Dashboard — gen
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">gen-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“birth, beget, race, kind”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'birth, beget, race, kind'.</span>
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

The Greek root **gen** (γίγνεσθαι γένος γενετικός γένεσις γενεά (gígnesthai)) signifies birth, beget, race, kind. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Eugene*, *allergen*, *anagenesis*, *antigen*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: birth, beget, race, kind
> The Greek root **gen** fundamentally denotes **birth, beget, race, kind**. The physical sensory observation and cognitive anchor underlying 'birth, beget, race, kind'. In classical Greek antiquity, the root denoted 'birth, beget, race, kind', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">birth, beget, race, kind</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'birth, beget, race, kind'.</mark>
> - **Everyday Connection**: Think of familiar words like *Eugene*, *allergen*, *anagenesis*, *antigen*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gen** derives from Ancient Greek <mark class="hl-stem">γίγνεσθαι γένος γενετικός γένεσις γενεά (gígnesthai)</mark>, meaning "birth, beget, race, kind".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with gen**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'birth, beget, race, kind'.
  - Whenever you see **gen** in an English word, think immediately of **birth, beget, race, kind**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gen</mark>, think of <mark class="hl-def">birth, beget, race, kind</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `gen-` (from *γίγνεσθαι γένος γενετικός γένεσις γενεά (gígnesthai)*).
> - **Combining Stem with -o- Connective:** `geno-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Gen
> - **1. Direct & Concrete Anchor:** Literal instantiation of birth, beget, race, kind in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on gen

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `gen-` | [[Eugene]] | Primary root semantic foundation denoting birth, beget, race, kind. |
| **Connecting -o-** | `geno-` | [[allergen]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `gen` | [[anagenesis]] | Relational or directional modification of the core root sense. |

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
| [[abiogenesis]] | noun | **1.** The origin of life from nonliving matter; specifically : a theory in the evolution of early life on earth: organic molecules and subsequent simple life forms first originated from inorganic substances.<br>**2.** A now-discredited notion that living organisms spontaneously originate directly from nonliving matter. | *"In academic literature, abiogenesis designates the origin of life from nonliving matter; specifically : a theory in the evolution of early life on earth: organic molecules and subsequent simple life forms first originated from inorganic substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abiogenetic]] | adjective | **1.** Originating by abiogenesis. | *"In academic literature, abiogenetic designates originating by abiogenesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agene]] | noun | **1.** A yellow pungent volatile oil (trade name agene) formerly used for bleaching and aging flour. | *"In academic literature, agene designates a yellow pungent volatile oil (trade name agene) formerly used for bleaching and aging flour."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agenesis]] | noun | **1.** Imperfect development; nondevelopment of a part. | *"In academic literature, agenesis designates imperfect development; nondevelopment of a part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agonadal]] | adjective | **1.** Lacking gonads. | *"In academic literature, agonadal designates lacking gonads."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allergen]] | noun | **1.** A substance (such as pollen) that induces allergy. | *"In academic literature, allergen designates a substance (such as pollen) that induces allergy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allergenic]] | adjective | **1.** Relating to or having the effect of an allergen. | *"In academic literature, allergenic designates relating to or having the effect of an allergen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anagenesis]] | noun | **1.** Evolutionary change producing a single lineage in which one taxon replaces another without branching. | *"In academic literature, anagenesis designates evolutionary change producing a single lineage in which one taxon replaces another without branching."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antigen]] | noun | **1.** Any substance (such as an immunogen or a hapten) foreign to the body that evokes an immune response either alone or after forming a complex with a larger molecule (such as a protein) and that is capable of binding with a product (such as an antibody or T cell) of the immune response.<br>**2.** Any of various cells (such as a dendritic cell, macrophage, or B cell) that take up and process an antigen into a peptide fragment which when displayed at the cell surface in combination with a molecule of the major histocompatibility complex is recognized by and serves to activate cells of the immune system (such as helper T cells or cytotoxic T cells) —abbreviation APC. | *"In academic literature, antigen designates any substance (such as an immunogen or a hapten) foreign to the body that evokes an immune response either alone or after forming a complex with a larger molecule (such as a protein) and that is capable of binding with a product (such as an antibody or t cell) of the immune response."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antigenic]] | adjective | **1.** Of or relating to antigens. | *"In academic literature, antigenic designates of or relating to antigens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autogenesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gen.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, autogenesis designates a term designating an entity, condition, or phenomenon derived from greek gen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autogenetic]] | adjective | **1.** Of or relating to autogenesis. | *"In academic literature, autogenetic designates of or relating to autogenesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autogenous]] | noun | **1.** Produced independently of external influence or aid : endogenous.<br>**2.** Originating or derived from sources within the same individual. | *"In academic literature, autogenous designates produced independently of external influence or aid : endogenous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biogenesis]] | noun | **1.** The development of life from preexisting life.<br>**2.** The synthesis of chemical compounds or structures in the living organism. | *"In academic literature, biogenesis designates the development of life from preexisting life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biogenetic]] | adjective | **1.** Of or relating to the production of living organisms from other living organisms. | *"In academic literature, biogenetic designates of or relating to the production of living organisms from other living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biogenous]] | adjective | **1.** Producing or produced by living things. | *"In academic literature, biogenous designates producing or produced by living things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dysgenesis]] | noun | **1.** Infertility between hybrids. | *"In academic literature, dysgenesis designates infertility between hybrids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dysgenic]] | noun | **1.** Tending to promote survival of or reproduction by less well-adapted individuals (such as the weak or diseased) especially at the expense of well-adapted individuals (such as the strong or healthy).<br>**2.** Biologically defective or deficient. | *"In academic literature, dysgenic designates tending to promote survival of or reproduction by less well-adapted individuals (such as the weak or diseased) especially at the expense of well-adapted individuals (such as the strong or healthy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dysgenics]] | noun | **1.** The study of the operation of factors causing degeneration in the type of offspring produced. | *"In academic literature, dysgenics designates the study of the operation of factors causing degeneration in the type of offspring produced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endogen]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gen.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, endogen designates a term designating an entity, condition, or phenomenon derived from greek gen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endogenetic]] | adjective | **1.** Of rocks formed or occurring beneath the surface of the earth. | *"In academic literature, endogenetic designates of rocks formed or occurring beneath the surface of the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endogenic]] | adjective | **1.** Derived or originating internally.<br>**2.** Of rocks formed or occurring beneath the surface of the earth. | *"In academic literature, endogenic designates derived or originating internally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endogenous]] | noun | **1.** Growing or produced by growth from deep tissue.<br>**2.** Caused by factors inside the organism or system. | *"In academic literature, endogenous designates growing or produced by growth from deep tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endogenously]] | adverb | **1.** In an endogenous manner. | *"In academic literature, endogenously designates in an endogenous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epigene]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gen.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, epigene designates a term designating an entity, condition, or phenomenon derived from greek gen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epigenesis]] | noun | **1.** Development of a plant or animal from an egg or spore through a series of processes in which unorganized cell masses differentiate into organs and organ systems; also : the theory that plant and animal development proceeds in this way.<br>**2.** Change in the mineral character of a rock owing to outside influences. | *"In academic literature, epigenesis designates development of a plant or animal from an egg or spore through a series of processes in which unorganized cell masses differentiate into organs and organ systems; also : the theory that plant and animal development proceeds in this way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epigenetics]] | noun | **1.** The study of heritable changes in gene function that do not involve changes in DNA sequence. | *"In academic literature, epigenetics designates the study of heritable changes in gene function that do not involve changes in dna sequence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epigone]] | noun | **1.** Follower, disciple; also : an inferior imitator. | *"In academic literature, epigone designates follower, disciple; also : an inferior imitator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erogenous]] | noun | **1.** Producing sexual excitement or libidinal gratification when stimulated : sexually sensitive.<br>**2.** Of, relating to, or arousing sexual feelings. | *"In academic literature, erogenous designates producing sexual excitement or libidinal gratification when stimulated : sexually sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Eugene]] | noun | **1.** —1736 François-Eugène de Savoie-Carignan prince of Savoy and Austrian general.<br>**2.** City on the Willamette River in western Oregon. | *"Edwin was already half way up the tree and Eugene was just beginning to climb it."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[eugene]] | noun | **1.** Austrian general in the service of the holy roman empire during the war of the spanish succession (1663-1736).<br>**2.** A city in western oregon on the willamette river; site of a university. | *"In academic literature, eugene designates **1.** austrian general in the service of the holy roman empire during the war of the spanish succession (1663-1736).<br>**2.** a city in western oregon on the willamette river; site of a university."* — Academic Lexicon |
| [[eugenic]] | noun | **1.** Relating to or fitted for the production of good offspring.<br>**2.** Of or relating to eugenics. | *"In such a view, a eugenic opportunity is presented in the selection and admission of immigrants that are distinctly above (not merely equal to) the average of our general population. § 15. #Population and militarism#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[eugenics]] | noun | **1.** The practice or advocacy of controlled selective breeding of human populations (as by sterilization) to improve the populations' genetic composition. | *"This is the problem of eugenics, the choice and biologic breeding of capable men to be the citizens of the nation, and broadly understood, it includes both the negro and the immigrant problems.] [Footnote 2: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[exogen]] | noun | **1.** Flowering plant with two cotyledons; the stem grows by deposit on its outside. | *"In academic literature, exogen designates flowering plant with two cotyledons; the stem grows by deposit on its outside."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exogenic]] | adjective | **1.** Derived or originating externally. | *"In academic literature, exogenic designates derived or originating externally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exogenous]] | noun | **1.** Produced by growth from superficial tissue.<br>**2.** Caused by factors (such as food or a traumatic factor) or an agent (such as a disease-producing organism) from outside the organism or system. | *"In academic literature, exogenous designates produced by growth from superficial tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gametogenesis]] | noun | **1.** The production of gametes. | *"In academic literature, gametogenesis designates the production of gametes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gen]] | noun | **1.** Generation —often used in combination.<br>**2.** Information. | *"I shouldn’t be expected there, if I did; the beadle’s too gen-teel for me."* — Charles Dickens, *Bleak House* |
| [[gene]] | noun | **1.** A specific sequence of nucleotides in DNA or RNA that is located usually on a chromosome and that is the functional unit of inheritance controlling the transmission and expression of one or more traits by specifying the structure of a particular polypeptide and especially a protein or controlling the function of other genetic material. | *"In academic literature, gene designates a specific sequence of nucleotides in dna or rna that is located usually on a chromosome and that is the functional unit of inheritance controlling the transmission and expression of one or more traits by specifying the structure of a particular polypeptide and especially a protein or controlling the function of other genetic material."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genealogic]] | adjective | **1.** Of or relating to genealogy. | *"In academic literature, genealogic designates of or relating to genealogy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genealogical]] | adjective | **1.** Of or relating to genealogy. | *"Prince Andrew, looking again at that genealogical tree, shook his head, laughing as a man laughs who looks at a portrait so characteristic of the original as to be amusing."* — graf Leo Tolstoy, *War and Peace* |
| [[genealogically]] | adverb | **1.** In a genealogical manner. | *"In academic literature, genealogically designates in a genealogical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genealogist]] | noun | **1.** An expert in genealogy. | *"Oh—nothing, nothing; except chasten yourself with the thought of ‘how are the mighty fallen.’ It is a fact of some interest to the local historian and genealogist, nothing more."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[genealogy]] | noun | **1.** An account of the descent of a person, family, or group from an ancestor or from older forms.<br>**2.** Regular descent of a person, family, or group of organisms from a progenitor or older form : pedigree. | *"They appear now as brothers, now as parents, now as sisters of one another; the task of unravelling their genealogy would be as difficult as it is pointless."* — Sydney Waterlow, *Shelley* |
| [[genesis]] | noun | **1.** The origin or coming into being of something.<br>**2.** The mainly narrative first book of canonical Jewish and Christian Scriptures. | *"A doggerel parody on _John Gilpin_, entitled "The Diverting History of John Cairns," in which a highly coloured account is given of the supposed genesis of the pamphlet, was written and found wide circulation."* — John Cairns, *Principal Cairns* |
| [[genetic]] | noun | **1.** Relating to or determined by the origin, development, or causal antecedents of something.<br>**2.** Of, relating to, or involving genetics. | *"Mark him as a newly arrived renegade, a killer and genetic flake dangerous to Coldfield's safety."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[genetical]] | adjective | **1.** Of or relating to or produced by or being a gene.<br>**2.** Of or relating to the science of genetics. | *"In academic literature, genetical designates of or relating to or produced by or being a gene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genetically]] | adverb | **1.** By genetic mechanisms. | *"In academic literature, genetically designates by genetic mechanisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geneticism]] | noun | **1.** The belief that all human characteristics are determined genetically. | *"In academic literature, geneticism designates the belief that all human characteristics are determined genetically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geneticist]] | noun | **1.** A biologist who specializes in genetics. | *"In academic literature, geneticist designates a biologist who specializes in genetics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genetics]] | noun | **1.** The branch of biology that studies heredity and variation in organisms. | *"In academic literature, genetics designates the branch of biology that studies heredity and variation in organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genic]] | adjective | **1.** Of or relating to or produced by or being a gene. | *"In academic literature, genic designates of or relating to or produced by or being a gene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genocide]] | noun | **1.** The deliberate and systematic destruction of a racial, political, or cultural group. | *"That would be genocide, the one thing that every race fears more than anything else."* — Randall Garrett, *Deadly decoy* |
| [[genophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gen.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, genophobia designates a term designating an entity, condition, or phenomenon derived from greek gen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genotype]] | noun | **1.** Type species.<br>**2.** All or part of the genetic constitution of an individual or group. | *"In academic literature, genotype designates type species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genotypic]] | adjective | **1.** Of or relating to or constituting a genotype. | *"In academic literature, genotypic designates of or relating to or constituting a genotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[genotypical]] | adjective | **1.** Of or relating to or constituting a genotype. | *"In academic literature, genotypical designates of or relating to or constituting a genotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gonad]] | noun | **1.** A reproductive gland (such as an ovary or testis) that produces gametes. | *"In academic literature, gonad designates a reproductive gland (such as an ovary or testis) that produces gametes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gonadal]] | adjective | **1.** Of or relating to the gonads. | *"In academic literature, gonadal designates of or relating to the gonads."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterogenesis]] | noun | **1.** The alternation of two or more different forms in the life cycle of a plant or animal. | *"In academic literature, heterogenesis designates the alternation of two or more different forms in the life cycle of a plant or animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homogenesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gen.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, homogenesis designates a term designating an entity, condition, or phenomenon derived from greek gen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homogenetic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of birth, beget, race, kind. | *"In academic literature, homogenetic designates adjective*) pertaining to, derived from, or characteristic of birth, beget, race, kind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypogenesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gen.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, hypogenesis designates a term designating an entity, condition, or phenomenon derived from greek gen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypogenic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of birth, beget, race, kind. | *"In academic literature, hypogenic designates adjective*) pertaining to, derived from, or characteristic of birth, beget, race, kind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypogenous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of birth, beget, race, kind. | *"PRIMROSE CLUSTER-CUPS; spots obliterated; peridia solitary, scattered, and crowded, hypogenous; spores whitish-yellow.—On the under surface of leaves of Primroses."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[metagenesis]] | noun | **1.** Alternation of sexual and asexual generations. | *"In academic literature, metagenesis designates alternation of sexual and asexual generations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogenesis]] | noun | **1.** Asexual reproduction by the production and release of spores. | *"In academic literature, monogenesis designates asexual reproduction by the production and release of spores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogenic]] | noun | **1.** Of, relating to, or controlled by a single gene and especially by either of an allelic pair. | *"In academic literature, monogenic designates of, relating to, or controlled by a single gene and especially by either of an allelic pair."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paragenesis]] | noun | **1.** The formation of minerals in contact in such a manner as to affect one another's development. | *"In academic literature, paragenesis designates the formation of minerals in contact in such a manner as to affect one another's development."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polygene]] | noun | **1.** A gene that by itself has little effect on the phenotype but which can act together with others to produce observable variations. | *"In academic literature, polygene designates a gene that by itself has little effect on the phenotype but which can act together with others to produce observable variations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polygenic]] | adjective | **1.** Of or relating to an inheritable character that is controlled by several genes at once; of or related to or determined by polygenes. | *"In academic literature, polygenic designates of or relating to an inheritable character that is controlled by several genes at once; of or related to or determined by polygenes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polygenous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of birth, beget, race, kind. | *"In academic literature, polygenous designates adjective*) pertaining to, derived from, or characteristic of birth, beget, race, kind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[progenesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gen.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, progenesis designates a term designating an entity, condition, or phenomenon derived from greek gen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudogene]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gen.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, pseudogene designates a term designating an entity, condition, or phenomenon derived from greek gen."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Life & Vitality]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GEN
  </div>
</div>
