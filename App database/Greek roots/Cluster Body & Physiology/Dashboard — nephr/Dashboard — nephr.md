---
status: unread
type: root_dashboard
---
# Dashboard — nephr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">νεφρός (nephrós)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“kidney”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'kidney'.</span>
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

The Greek root **nephr** (νεφρός (nephrós)) signifies kidney. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *hydronephrosis*, *mesonephric*, *mesonephros*, *metanephridium*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: kidney
> The Greek root **nephr** fundamentally denotes **kidney**. The physical sensory observation and cognitive anchor underlying 'kidney'. In classical Greek antiquity, the root denoted 'kidney', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">kidney</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'kidney'.</mark>
> - **Everyday Connection**: Think of familiar words like *hydronephrosis*, *mesonephric*, *mesonephros*, *metanephridium*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **nephr** derives from Ancient Greek <mark class="hl-stem">νεφρός (nephrós)</mark>, meaning "kidney".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with nephr**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'kidney'.
  - Whenever you see **nephr** in an English word, think immediately of **kidney**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">nephr</mark>, think of <mark class="hl-def">kidney</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `nephr-` (from *νεφρός (nephrós)*).
> - **Combining Stem with -o- Connective:** `nephro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Nephr
> - **1. Direct & Concrete Anchor:** Literal instantiation of kidney in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on nephr

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `nephr-` | [[hydronephrosis]] | Primary root semantic foundation denoting kidney. |
| **Connecting -o-** | `nephro-` | [[mesonephric]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `nephr` | [[mesonephros]] | Relational or directional modification of the core root sense. |

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
| [[epinephrin]] | noun | **1.** A catecholamine secreted by the adrenal medulla in response to stress (trade name adrenalin); stimulates autonomic nerve action. | *"In academic literature, epinephrin designates a catecholamine secreted by the adrenal medulla in response to stress (trade name adrenalin); stimulates autonomic nerve action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epinephrine]] | noun | **1.** A catecholamine secreted by the adrenal medulla in response to stress (trade name adrenalin); stimulates autonomic nerve action. | *"In academic literature, epinephrine designates a catecholamine secreted by the adrenal medulla in response to stress (trade name adrenalin); stimulates autonomic nerve action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydronephrosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek nephr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hydronephrosis designates a term designating an entity, condition, or phenomenon derived from greek nephr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesonephric]] | noun | **1.** Either member of the second and midmost of the three paired vertebrate renal organs that functions in adult fishes and amphibians but functions only in the embryo of reptiles, birds, and mammals in which it is replaced by a metanephros in the adult. | *"In academic literature, mesonephric designates either member of the second and midmost of the three paired vertebrate renal organs that functions in adult fishes and amphibians but functions only in the embryo of reptiles, birds, and mammals in which it is replaced by a metanephros in the adult."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesonephros]] | noun | **1.** Either member of the second and midmost of the three paired vertebrate renal organs that functions in adult fishes and amphibians but functions only in the embryo of reptiles, birds, and mammals in which it is replaced by a metanephros in the adult. | *"In academic literature, mesonephros designates either member of the second and midmost of the three paired vertebrate renal organs that functions in adult fishes and amphibians but functions only in the embryo of reptiles, birds, and mammals in which it is replaced by a metanephros in the adult."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metanephridium]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek nephr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, metanephridium designates a term designating an entity, condition, or phenomenon derived from greek nephr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metanephros]] | noun | **1.** Either member of the final and most caudal pair of the three successive pairs of vertebrate renal organs that functions as a permanent adult kidney in reptiles, birds, and mammals but is not present at all in lower forms. | *"In academic literature, metanephros designates either member of the final and most caudal pair of the three successive pairs of vertebrate renal organs that functions as a permanent adult kidney in reptiles, birds, and mammals but is not present at all in lower forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephr]] | combining form | **1.** kidney. | *"Classical and authoritative lexicons catalog nephr as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephralgia]] | noun | **1.** Pain in the kidney (usually felt in the loins). | *"In academic literature, nephralgia designates pain in the kidney (usually felt in the loins)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrectomy]] | noun | **1.** The surgical removal of a kidney. | *"In academic literature, nephrectomy designates the surgical removal of a kidney."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephridiopore]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek nephr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, nephridiopore designates a term designating an entity, condition, or phenomenon derived from greek nephr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephridium]] | noun | **1.** A tubular glandular excretory organ characteristic of various invertebrates. | *"In academic literature, nephridium designates a tubular glandular excretory organ characteristic of various invertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrite]] | noun | **1.** A compact tremolite or actinolite that is the commoner and less valuable kind of jade and that varies in color from white to dark green or black. | *"In academic literature, nephrite designates a compact tremolite or actinolite that is the commoner and less valuable kind of jade and that varies in color from white to dark green or black."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephritic]] | adjective | **1.** Affected by nephritis.<br>**2.** Of or relating to the kidneys. | *"In academic literature, nephritic designates affected by nephritis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephritis]] | noun | **1.** Acute or chronic inflammation of the kidney caused by infection, degenerative process, or vascular disease. | *"In academic literature, nephritis designates acute or chronic inflammation of the kidney caused by infection, degenerative process, or vascular disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephroangiosclerosis]] | noun | **1.** Kidney disease that is usually associated with hypertension; sclerosis of the renal arterioles reduces blood flow that can lead to kidney failure and heart failure. | *"In academic literature, nephroangiosclerosis designates kidney disease that is usually associated with hypertension; sclerosis of the renal arterioles reduces blood flow that can lead to kidney failure and heart failure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephroblastoma]] | noun | **1.** Malignant renal tumor of young children characterized by hypertension and blood in the urine and the presence of a palpable mass. | *"In academic literature, nephroblastoma designates malignant renal tumor of young children characterized by hypertension and blood in the urine and the presence of a palpable mass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrocalcinosis]] | noun | **1.** Renal lithiasis in which calcium deposits form in the renal parenchyma and result in reduced kidney function and blood in the urine. | *"In academic literature, nephrocalcinosis designates renal lithiasis in which calcium deposits form in the renal parenchyma and result in reduced kidney function and blood in the urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrogenesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek nephr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, nephrogenesis designates a term designating an entity, condition, or phenomenon derived from greek nephr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrolepis]] | noun | **1.** Small genus of tropical ferns; sometimes placed in polypodiaceae. | *"In academic literature, nephrolepis designates small genus of tropical ferns; sometimes placed in polypodiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrolith]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek nephr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, nephrolith designates a term designating an entity, condition, or phenomenon derived from greek nephr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrolithiasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek nephr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, nephrolithiasis designates a term designating an entity, condition, or phenomenon derived from greek nephr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrologist]] | noun | **1.** A branch of medicine concerned with the kidneys. | *"In academic literature, nephrologist designates a branch of medicine concerned with the kidneys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrology]] | noun | **1.** A branch of medicine concerned with the kidneys. | *"In academic literature, nephrology designates a branch of medicine concerned with the kidneys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephron]] | noun | **1.** One of the functional units of the kidney that filters the blood, selectively reabsorbs substances (such as glucose, ions, and amino acids), and excretes nitrogenous waste (such as urea) and excess water and salts in the form of urine. | *"In academic literature, nephron designates one of the functional units of the kidney that filters the blood, selectively reabsorbs substances (such as glucose, ions, and amino acids), and excretes nitrogenous waste (such as urea) and excess water and salts in the form of urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephropathy]] | noun | **1.** An abnormal state of the kidney; especially : one associated with or secondary to some other pathological process. | *"In academic literature, nephropathy designates an abnormal state of the kidney; especially : one associated with or secondary to some other pathological process."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrops]] | noun | **1.** A genus of nephropsidae. | *"In academic literature, nephrops designates a genus of nephropsidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephropsidae]] | noun | **1.** In some classifications coextensive with the homaridae. | *"In academic literature, nephropsidae designates in some classifications coextensive with the homaridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephroptosia]] | noun | **1.** Prolapse of the kidney. | *"In academic literature, nephroptosia designates prolapse of the kidney."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephroptosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek nephr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, nephroptosis designates a term designating an entity, condition, or phenomenon derived from greek nephr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrosclerosis]] | noun | **1.** Kidney disease that is usually associated with hypertension; sclerosis of the renal arterioles reduces blood flow that can lead to kidney failure and heart failure. | *"In academic literature, nephrosclerosis designates kidney disease that is usually associated with hypertension; sclerosis of the renal arterioles reduces blood flow that can lead to kidney failure and heart failure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrosis]] | noun | **1.** A syndrome characterized by edema and large amounts of protein in the urine and usually increased blood cholesterol; usually associated with glomerulonephritis or with a complication of various systemic diseases.<br>**2.** A disease affecting the kidneys. | *"In academic literature, nephrosis designates a syndrome characterized by edema and large amounts of protein in the urine and usually increased blood cholesterol; usually associated with glomerulonephritis or with a complication of various systemic diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrostome]] | noun | **1.** The ciliated funnel-shaped coelomic opening of a typical nephridium. | *"In academic literature, nephrostome designates the ciliated funnel-shaped coelomic opening of a typical nephridium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrotomy]] | noun | **1.** Incision into a kidney (usually to remove a kidney stone). | *"In academic literature, nephrotomy designates incision into a kidney (usually to remove a kidney stone)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrotoxic]] | adjective | **1.** Toxic to the kidney. | *"In academic literature, nephrotoxic designates toxic to the kidney."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrotoxicity]] | noun | **1.** Poisonous to the kidney; also : resulting from or marked by poisoning of the kidney. | *"In academic literature, nephrotoxicity designates poisonous to the kidney; also : resulting from or marked by poisoning of the kidney."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nephrotoxin]] | noun | **1.** Any toxin that affects the kidneys. | *"In academic literature, nephrotoxin designates any toxin that affects the kidneys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pronephros]] | noun | **1.** Either member of the first and most cranial pair of the three successive paired vertebrate renal organs that functions in the adults of amphioxus and some lampreys, functions temporarily in larval fishes and amphibians, and is present but nonfunctional in embryos of reptiles, birds, and mammals. | *"In academic literature, pronephros designates either member of the first and most cranial pair of the three successive paired vertebrate renal organs that functions in the adults of amphioxus and some lampreys, functions temporarily in larval fishes and amphibians, and is present but nonfunctional in embryos of reptiles, birds, and mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protonephridium]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek nephr.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, protonephridium designates a term designating an entity, condition, or phenomenon derived from greek nephr."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body & Physiology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NEPHR
  </div>
</div>
