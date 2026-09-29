---
status: unread
type: root_dashboard
---
# Dashboard — soma
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">σῶμα</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“body”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'body'.</span>
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

The Greek root **soma** (σῶμα, σώματος (sôma, sṓmatos)) signifies body. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *allosome*, *asomatous*, *autosome*, *centrosome*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: body
> The Greek root **soma** fundamentally denotes **body**. The physical sensory observation and cognitive anchor underlying 'body'. In classical Greek antiquity, the root denoted 'body', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">body</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'body'.</mark>
> - **Everyday Connection**: Think of familiar words like *allosome*, *asomatous*, *autosome*, *centrosome*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **soma** derives from Ancient Greek <mark class="hl-stem">σῶμα, σώματος (sôma, sṓmatos)</mark>, meaning "body".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with soma**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'body'.
  - Whenever you see **soma** in an English word, think immediately of **body**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">soma</mark>, think of <mark class="hl-def">body</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `soma-` (from *σῶμα, σώματος (sôma, sṓmatos)*).
> - **Combining Stem with -o- Connective:** `somao-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Soma
> - **1. Direct & Concrete Anchor:** Literal instantiation of body in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on soma

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `soma-` | [[allosome]] | Primary root semantic foundation denoting body. |
| **Connecting -o-** | `somao-` | [[asomatous]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `soma` | [[autosome]] | Relational or directional modification of the core root sense. |

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
| [[allosome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, allosome designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asomatous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of body. | *"In academic literature, asomatous designates adjective*) pertaining to, derived from, or characteristic of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autosomal]] | adjective | **1.** Of or relating to an autosome. | *"In academic literature, autosomal designates of or relating to an autosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autosome]] | noun | **1.** A chromosome other than a sex chromosome. | *"In academic literature, autosome designates a chromosome other than a sex chromosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosome]] | noun | **1.** centriole.<br>**2.** the centriole-containing region of clear cytoplasm adjacent to the cell nucleus. | *"In academic literature, centrosome designates centriole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosomic]] | adjective | **1.** Of or relating to a centrosome. | *"In academic literature, centrosomic designates of or relating to a centrosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromosomal]] | adjective | **1.** Of or relating to a chromosome. | *"In academic literature, chromosomal designates of or relating to a chromosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromosome]] | noun | **1.** Any of the rod-shaped or threadlike DNA-containing structures of cellular organisms that are located in the nucleus of eukaryotes, are usually ring-shaped in prokaryotes (such as bacteria), and contain all or most of the genes of the organism; also : the genetic material of a virus.<br>**2.** The usually constant number of chromosomes characteristic of a particular kind of animal or plant. | *"In academic literature, chromosome designates any of the rod-shaped or threadlike dna-containing structures of cellular organisms that are located in the nucleus of eukaryotes, are usually ring-shaped in prokaryotes (such as bacteria), and contain all or most of the genes of the organism; also : the genetic material of a virus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decasomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, decasomy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disomic]] | noun | **1.** Having one or more chromosomes present in two copies. | *"In academic literature, disomic designates having one or more chromosomes present in two copies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, disomy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[episome]] | noun | **1.** A genetic determinant (such as the DNA of some bacteriophages) that can replicate autonomously in bacterial cytoplasm or as an integral part of the chromosomes. | *"In academic literature, episome designates a genetic determinant (such as the dna of some bacteriophages) that can replicate autonomously in bacterial cytoplasm or as an integral part of the chromosomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gonosome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, gonosome designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heptasomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, heptasomy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterochromosome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, heterochromosome designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterodisomic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of body. | *"In academic literature, heterodisomic designates adjective*) pertaining to, derived from, or characteristic of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterodisomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, heterodisomy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterosomata]] | noun | **1.** Flatfishes: halibut; sole; flounder; plaice; turbot; tonguefishes. | *"In academic literature, heterosomata designates flatfishes: halibut; sole; flounder; plaice; turbot; tonguefishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hexasomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hexasomy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isodisomic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of body. | *"In academic literature, isodisomic designates adjective*) pertaining to, derived from, or characteristic of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isodisomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, isodisomy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrosomia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, macrosomia designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metasomatic]] | noun | **1.** Metamorphism that involves changes in the chemical composition as well as in the texture of rock. | *"In academic literature, metasomatic designates metamorphism that involves changes in the chemical composition as well as in the texture of rock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metasomatism]] | noun | **1.** Metamorphism that involves changes in the chemical composition as well as in the texture of rock. | *"In academic literature, metasomatism designates metamorphism that involves changes in the chemical composition as well as in the texture of rock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsomal]] | adjective | **1.** Of or relating to microsomes. | *"In academic literature, microsomal designates of or relating to microsomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsome]] | noun | **1.** Any of various minute cellular structures.<br>**2.** A particle in a particulate fraction that is obtained by heavy centrifugation of broken cells and consists of various amounts of ribosomes, fragmented endoplasmic reticulum, and mitochondrial cristae. | *"In academic literature, microsome designates any of various minute cellular structures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsomia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, microsomia designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosome]] | noun | **1.** A chromosome lacking a synaptic mate; especially : an unpaired X chromosome.<br>**2.** A single ribosome. | *"In academic literature, monosome designates a chromosome lacking a synaptic mate; especially : an unpaired x chromosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosomic]] | noun | **1.** Having one less than the diploid number of chromosomes. | *"In academic literature, monosomic designates having one less than the diploid number of chromosomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosomy]] | noun | **1.** Having one less than the diploid number of chromosomes. | *"In academic literature, monosomy designates having one less than the diploid number of chromosomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentasomic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of body. | *"In academic literature, pentasomic designates adjective*) pertaining to, derived from, or characteristic of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentasomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, pentasomy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plasmosome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, plasmosome designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysomic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of body. | *"In academic literature, polysomic designates adjective*) pertaining to, derived from, or characteristic of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, polysomy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosomatic]] | noun | **1.** Of, relating to, concerned with, or involving both mind and body.<br>**2.** Of, relating to, involving, or concerned with bodily symptoms caused by mental or emotional disturbance. | *"In academic literature, psychosomatic designates of, relating to, concerned with, or involving both mind and body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pyrosome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, pyrosome designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[soma]] | noun | **1.** An intoxicating juice from a plant of disputed identity that was used in ancient India as an offering to the gods and as a drink of immortality by worshippers in Vedic ritual and worshipped in personified form as a Vedic god.<br>**2.** The body of an organism. | *"For this is the very soma-plant of India, the holy grail of King Arthur, the—but enough! enough!"* — Jack London, *The Jacket (The Star-Rover)* |
| [[somaesthesia]] | noun | **1.** The perception of tactual or proprioceptive or gut sensations.<br>**2.** The faculty of bodily perception; sensory systems associated with the body; includes skin senses and proprioception and the internal organs. | *"In academic literature, somaesthesia designates the perception of tactual or proprioceptive or gut sensations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somaesthesis]] | noun | **1.** The faculty of bodily perception; sensory systems associated with the body; includes skin senses and proprioception and the internal organs. | *"In academic literature, somaesthesis designates the faculty of bodily perception; sensory systems associated with the body; includes skin senses and proprioception and the internal organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somali]] | noun | **1.** A member of a tall dark (mostly muslim) people inhabiting somalia.<br>**2.** The cushitic language spoken by the somali. | *"In academic literature, somali designates a member of a tall dark (mostly muslim) people inhabiting somalia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somalia]] | noun | **1.** A republic in extreme eastern africa on the somali peninsula; subject to tribal warfare. | *"In academic literature, somalia designates a republic in extreme eastern africa on the somali peninsula; subject to tribal warfare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somalian]] | noun | **1.** A member of a tall dark (mostly muslim) people inhabiting somalia.<br>**2.** Of or relating to the african republic of somalia or its people or their language and culture. | *"In academic literature, somalian designates a member of a tall dark (mostly muslim) people inhabiting somalia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[soman]] | noun | **1.** A nerve agent easily absorbed into the body; a lethal cholinesterase inhibitor that is highly toxic when inhaled. | *"In academic literature, soman designates a nerve agent easily absorbed into the body; a lethal cholinesterase inhibitor that is highly toxic when inhaled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somataesthesis]] | noun | **1.** The faculty of bodily perception; sensory systems associated with the body; includes skin senses and proprioception and the internal organs. | *"In academic literature, somataesthesis designates the faculty of bodily perception; sensory systems associated with the body; includes skin senses and proprioception and the internal organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somateria]] | noun | **1.** Eider ducks. | *"In academic literature, somateria designates eider ducks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatesthesia]] | noun | **1.** The perception of tactual or proprioceptive or gut sensations.<br>**2.** The faculty of bodily perception; sensory systems associated with the body; includes skin senses and proprioception and the internal organs. | *"In academic literature, somatesthesia designates the perception of tactual or proprioceptive or gut sensations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatic]] | noun | **1.** Of, relating to, or affecting the body especially as distinguished from the germplasm.<br>**2.** Of or relating to the wall of the body : parietal. | *"In academic literature, somatic designates of, relating to, or affecting the body especially as distinguished from the germplasm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatogenetic]] | adjective | **1.** Of or arising from physiological causes rather than being psychogenic in origin. | *"In academic literature, somatogenetic designates of or arising from physiological causes rather than being psychogenic in origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatogenic]] | adjective | **1.** Of or arising from physiological causes rather than being psychogenic in origin. | *"In academic literature, somatogenic designates of or arising from physiological causes rather than being psychogenic in origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatomancy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, somatomancy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatoparaphrenia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, somatoparaphrenia designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatopleure]] | noun | **1.** A complex fold of tissue in the embryo of a craniate vertebrate consisting of an outer layer of mesoderm together with the ectoderm that sheathes it and giving rise to the amnion and chorion. | *"In academic literature, somatopleure designates a complex fold of tissue in the embryo of a craniate vertebrate consisting of an outer layer of mesoderm together with the ectoderm that sheathes it and giving rise to the amnion and chorion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatosense]] | noun | **1.** Any of the sensory systems that mediate sensations of pressure and tickle and warmth and cold and vibration and limb position and limb movement and pain. | *"In academic literature, somatosense designates any of the sensory systems that mediate sensations of pressure and tickle and warmth and cold and vibration and limb position and limb movement and pain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatosensory]] | adjective | **1.** Of or relating to the somatosenses. | *"In academic literature, somatosensory designates of or relating to the somatosenses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatotrophin]] | noun | **1.** A hormone produced by the anterior pituitary gland; promotes growth in humans. | *"In academic literature, somatotrophin designates a hormone produced by the anterior pituitary gland; promotes growth in humans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatotropin]] | noun | **1.** A hormone produced by the anterior pituitary gland; promotes growth in humans. | *"In academic literature, somatotropin designates a hormone produced by the anterior pituitary gland; promotes growth in humans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somatotype]] | noun | **1.** Body type : physique. | *"In academic literature, somatotype designates body type : physique."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somite]] | noun | **1.** One of the longitudinal series of segments into which the body of many animals is divided : metamere. | *"In academic literature, somite designates one of the longitudinal series of segments into which the body of many animals is divided : metamere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrasomic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of body. | *"In academic literature, tetrasomic designates adjective*) pertaining to, derived from, or characteristic of body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrasomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, tetrasomy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trisomic]] | noun | **1.** The condition (as in Down syndrome) of having one or a few chromosomes triploid in an otherwise diploid set. | *"In academic literature, trisomic designates the condition (as in down syndrome) of having one or a few chromosomes triploid in an otherwise diploid set."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trisomy]] | noun | **1.** The condition (as in Down syndrome) of having one or a few chromosomes triploid in an otherwise diploid set.<br>**2.** Down syndrome. | *"In academic literature, trisomy designates the condition (as in down syndrome) of having one or a few chromosomes triploid in an otherwise diploid set."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · SOMA
  </div>
</div>
