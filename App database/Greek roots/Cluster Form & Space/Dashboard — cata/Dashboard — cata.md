---
status: unread
type: root_dashboard
---
# Dashboard — cata
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">κατά (katá)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“down, against, back”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'down, against, back'.</span>
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

The Greek root **cata** (κατά (katá)) signifies down, against, back. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *cata*, *catabolic*, *catacomb*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: down, against, back
> The Greek root **cata** fundamentally denotes **down, against, back**. The physical sensory observation and cognitive anchor underlying 'down, against, back'. In classical Greek antiquity, the root denoted 'down, against, back', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">down, against, back</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'down, against, back'.</mark>
> - **Everyday Connection**: Think of familiar words like *cata*, *catabolic*, *catacomb*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cata** derives from Ancient Greek <mark class="hl-stem">κατά (katá)</mark>, meaning "down, against, back".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with cata**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'down, against, back'.
  - Whenever you see **cata** in an English word, think immediately of **down, against, back**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cata</mark>, think of <mark class="hl-def">down, against, back</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `cata-` (from *κατά (katá)*).
> - **Combining Stem with -o- Connective:** `catao-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Cata
> - **1. Direct & Concrete Anchor:** Literal instantiation of down, against, back in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on cata

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `cata-` | [[cata]] | Primary root semantic foundation denoting down, against, back. |
| **Connecting -o-** | `catao-` | [[catabolic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `cata` | [[catacomb]] | Relational or directional modification of the core root sense. |

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
| [[acatalectic]] | noun | **1.** (prosody) a line of verse that has the full number of syllables.<br>**2.** (verse) metrically complete; especially having the full number of syllables in the final metrical foot. | *"In academic literature, acatalectic designates (prosody) a line of verse that has the full number of syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticatalyst]] | noun | **1.** (chemistry) a substance that retards a chemical reaction or diminishes the activity of a catalyst. | *"In academic literature, anticatalyst designates (chemistry) a substance that retards a chemical reaction or diminishes the activity of a catalyst."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cata]] | prefix | **1.** down.<br>**2.** any of various wild cats. | *"Classical and authoritative lexicons catalog cata as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catabolic]] | noun | **1.** Marked by or promoting metabolic activity concerned with the breakdown of complex molecules (such as proteins or lipids) and the release of energy within the organism : relating to, characterized by, or stimulating catabolism. | *"In academic literature, catabolic designates marked by or promoting metabolic activity concerned with the breakdown of complex molecules (such as proteins or lipids) and the release of energy within the organism : relating to, characterized by, or stimulating catabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catabolise]] | verb | **1.** Subject to catabolism. | *"In academic literature, catabolise designates subject to catabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catabolism]] | noun | **1.** Degradative metabolism involving the release of energy and resulting in the breakdown of complex materials (such as proteins or lipids) within the organism. | *"In academic literature, catabolism designates degradative metabolism involving the release of energy and resulting in the breakdown of complex materials (such as proteins or lipids) within the organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catabolize]] | verb | **1.** Subject to catabolism. | *"In academic literature, catabolize designates subject to catabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catacala]] | noun | **1.** Moths whose larvae are cutworms: underwings. | *"In academic literature, catacala designates moths whose larvae are cutworms: underwings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catachresis]] | noun | **1.** Strained or paradoxical use of words either in error (as `blatant' to mean `flagrant') or deliberately (as in a mixed metaphor: `blind mouths'). | *"In academic literature, catachresis designates strained or paradoxical use of words either in error (as `blatant' to mean `flagrant') or deliberately (as in a mixed metaphor: `blind mouths')."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catachrestic]] | adjective | **1.** Constituting or characterized by or given to catachresis. | *"In academic literature, catachrestic designates constituting or characterized by or given to catachresis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catachrestical]] | adjective | **1.** Constituting or characterized by or given to catachresis. | *"In academic literature, catachrestical designates constituting or characterized by or given to catachresis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cataclinal]] | adjective | **1.** Of valleys and rivers; running in the direction of the dip in surrounding rock strata. | *"In academic literature, cataclinal designates of valleys and rivers; running in the direction of the dip in surrounding rock strata."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cataclysm]] | noun | **1.** A sudden violent change in the earth's surface.<br>**2.** An event resulting in great loss and misfortune. | *"But what was this portion of the globe which had been swallowed by cataclysms?"* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[cataclysmal]] | adjective | **1.** Severely destructive. | *"In academic literature, cataclysmal designates severely destructive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cataclysmic]] | adjective | **1.** Severely destructive. | *"As not so calamitous as a cataclysmic annihilation of the planet in consequence of a collision with a dark sun."* — James Joyce, *Ulysses* |
| [[catacomb]] | noun | **1.** A subterranean cemetery of galleries with recesses for tombs —usually plural.<br>**2.** Something resembling a catacomb: such as. | *"For the library being dusty as a catacomb, the private room of Old Time himself, I had often to betake myself to her for assistance."* — George MacDonald, *The Portent and Other Stories* |
| [[catacorner]] | adjective | **1.** Slanted across a polygon on a diagonal line. | *"In academic literature, catacorner designates slanted across a polygon on a diagonal line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalan]] | noun | **1.** A native or inhabitant of catalonia.<br>**2.** The romance language spoken in catalonia in eastern spain (related to spanish and occitan). | *"Over in _Anse des Catalans_ weren't there the remains of the village of the sea-Gipsies, who had come none knew whence?..."* — Donn Byrne, *The Wind Bloweth* |
| [[catalase]] | noun | **1.** Enzyme found in most plant and animal cells that functions as an oxidative catalyst; decomposes hydrogen peroxide into oxygen and water. | *"In academic literature, catalase designates enzyme found in most plant and animal cells that functions as an oxidative catalyst; decomposes hydrogen peroxide into oxygen and water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalatic]] | adjective | **1.** Of or relating to the enzyme catalase. | *"In academic literature, catalatic designates of or relating to the enzyme catalase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalectic]] | noun | **1.** (prosody) a line of verse that lacks a syllable in the last metrical foot.<br>**2.** (verse) metrically incomplete; especially lacking one or more syllables in the final metrical foot. | *"A catalectic tetrameter of iambs marching."* — James Joyce, *Ulysses* |
| [[catalepsy]] | noun | **1.** A trancelike state marked by loss of voluntary motion in which the limbs remain in whatever position they are placed. | *"Must not be lost." When not in a catalepsy of literary composition, I am essentially the man of action."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[cataleptic]] | noun | **1.** A trancelike state marked by loss of voluntary motion in which the limbs remain in whatever position they are placed. | *"Finally, becoming cataleptic, she has to be carried up the narrow staircase like a grand piano."* — Charles Dickens, *Bleak House* |
| [[catalexis]] | noun | **1.** The absence of a syllable in the last foot of a line or verse. | *"In academic literature, catalexis designates the absence of a syllable in the last foot of a line or verse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalog]] | noun | **1.** List, register.<br>**2.** A complete enumeration of items arranged systematically with descriptive details. | *"I p. 364.] [Footnote 7: In the first annual report of the United States Commissioner of Labor is given a long catalog of theories that have been suggested, many of them quite fantastic.] [Footnote 8: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[cataloger]] | noun | **1.** A librarian who classifies publication according to a categorial system. | *"In academic literature, cataloger designates a librarian who classifies publication according to a categorial system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalogue]] | noun | **1.** A complete list of things; usually arranged systematically.<br>**2.** A book or pamphlet containing an enumeration of things. | *"I say I am your mother, And put you in the catalogue of those That were enwombed mine. ’Tis often seen Adoption strives with nature, and choice breeds A native slip to us from foreign seeds."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cataloguer]] | noun | **1.** A librarian who classifies publication according to a categorial system. | *"In academic literature, cataloguer designates a librarian who classifies publication according to a categorial system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalonia]] | noun | **1.** A region of northeastern spain. | *"At Lerida, in Catalonia, the funeral of the Carnival was witnessed by an English traveller in 1877."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[catalpa]] | noun | **1.** Tree of the genus catalpa with large leaves and white flowers followed by long slender pods. | *"In academic literature, catalpa designates tree of the genus catalpa with large leaves and white flowers followed by long slender pods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalufa]] | noun | **1.** Brightly colored carnivorous fish of western atlantic and west indies waters. | *"In academic literature, catalufa designates brightly colored carnivorous fish of western atlantic and west indies waters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalyse]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ly.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, catalyse designates a term designating an entity, condition, or phenomenon derived from greek ly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalysis]] | noun | **1.** A modification and especially increase in the rate of a chemical reaction induced by material unchanged chemically at the end of the reaction. | *"In academic literature, catalysis designates a modification and especially increase in the rate of a chemical reaction induced by material unchanged chemically at the end of the reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalyst]] | noun | **1.** A person or thing that provokes or speeds significant change or action.<br>**2.** A substance that enables a chemical reaction to proceed at a usually faster rate or under different conditions (as at a lower temperature) than otherwise possible. | *"In academic literature, catalyst designates a person or thing that provokes or speeds significant change or action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalytic]] | noun | **1.** Causing, involving, or relating to catalysis.<br>**2.** An automobile exhaust-system component containing a catalyst that causes conversion of harmful gases (such as carbon monoxide and uncombusted hydrocarbons) into mostly harmless products (such as water and carbon dioxide). | *"In academic literature, catalytic designates causing, involving, or relating to catalysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalytically]] | adverb | **1.** By catalytic action; in a catalytic manner. | *"In academic literature, catalytically designates by catalytic action; in a catalytic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalyze]] | verb | **1.** Change by catalysis or cause to catalyze. | *"In academic literature, catalyze designates change by catalysis or cause to catalyze."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catamaran]] | noun | **1.** A sailboat with two parallel hulls held together by single deck. | *"In academic literature, catamaran designates a sailboat with two parallel hulls held together by single deck."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catamenia]] | noun | **1.** The monthly discharge of blood from the uterus of nonpregnant women from puberty to menopause; ; --hippocrates; --aristotle. | *"In academic literature, catamenia designates the monthly discharge of blood from the uterus of nonpregnant women from puberty to menopause; ; --hippocrates; --aristotle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catamenial]] | adjective | **1.** Of or relating to menstruation or the menses. | *"In academic literature, catamenial designates of or relating to menstruation or the menses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catamite]] | noun | **1.** A boy who submits to a sexual relationship with a man. | *"Catamite. —The sense of beauty leads us astray, said beautifulinsadness Best to ugling Eglinton."* — James Joyce, *Ulysses* |
| [[catamount]] | noun | **1.** Short-tailed wildcats with usually tufted ears; valued for their fur.<br>**2.** Large american feline resembling a lion. | *"He scrambled over rock and stone, through brush and brier, rolled down banks like a hedgehog, scrambled up others like a catamount."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[catamountain]] | noun | **1.** Bushy-tailed wildcat of europe that resembles the domestic cat and is regarded as the ancestor of the domestic cat. | *"In academic literature, catamountain designates bushy-tailed wildcat of europe that resembles the domestic cat and is regarded as the ancestor of the domestic cat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catananche]] | noun | **1.** Any of several plants of the genus catananche having long-stalked heads of blue or yellow flowers. | *"In academic literature, catananche designates any of several plants of the genus catananche having long-stalked heads of blue or yellow flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cataract]] | noun | **1.** An eye disease that involves the clouding or opacification of the natural lens of the eye.<br>**2.** A large waterfall; violent rush of water over a precipice. | *"Other dispersed fragments of the same great palladium are to be found on the canals of Venice, at the second cataract of the Nile, in the baths of Germany, and sprinkled on the sea-sand all over the English coast."* — Charles Dickens, *Bleak House* |
| [[catarrh]] | noun | **1.** Inflammation of a mucous membrane; especially : one chronically affecting the human nose and air passages. | *"Then he began to praise the Lord, and to feel, 'tis done,' and it was done, and tells of the wonderful change, his ability to talk and sing, with no difficulty whatever." CURED OF CATARRH."* — Classic Author, *The wonders of prayer* |
| [[catarrhal]] | adjective | **1.** Of or relating to a catarrh. | *"In academic literature, catarrhal designates of or relating to a catarrh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catarrhine]] | noun | **1.** Of, relating to, or being any of a division (Catarrhina) of primates comprising the Old World monkeys, higher apes, and hominids that have the nostrils close together and directed downward, 32 teeth, and the tail when present never prehensile. | *"In academic literature, catarrhine designates of, relating to, or being any of a division (catarrhina) of primates comprising the old world monkeys, higher apes, and hominids that have the nostrils close together and directed downward, 32 teeth, and the tail when present never prehensile."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catarrhinian]] | adjective | **1.** Of or related to old world monkeys that have nostrils together and opening downward. | *"In academic literature, catarrhinian designates of or related to old world monkeys that have nostrils together and opening downward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catasetum]] | noun | **1.** Genus of tropical american orchids having showy male and female flowers usually on separate inflorescences. | *"In academic literature, catasetum designates genus of tropical american orchids having showy male and female flowers usually on separate inflorescences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catastrophe]] | noun | **1.** A momentous tragic event ranging from extreme misfortune to utter overthrow or ruin.<br>**2.** Utter failure : fiasco. | *"Pat! he comes, like the catastrophe of the old comedy: my cue is villainous melancholy, with a sigh like Tom o’Bedlam.—O, these eclipses do portend these divisions!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[catastrophic]] | noun | **1.** A momentous tragic event ranging from extreme misfortune to utter overthrow or ruin.<br>**2.** Utter failure : fiasco. | *"The red wrath always has undone me in all my lives; for the red wrath is my disastrous catastrophic heritage from the time of the slimy things ere the world was prime."* — Jack London, *The Jacket (The Star-Rover)* |
| [[catastrophically]] | adverb | **1.** With unfortunate consequences. | *"In academic literature, catastrophically designates with unfortunate consequences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catatonia]] | noun | **1.** A psychomotor disturbance that may involve muscle rigidity, stupor or mutism, purposeless movements, negativism, echolalia, and inappropriate or unusual posturing and is associated with various medical conditions (such as schizophrenia and mood disorders). | *"In academic literature, catatonia designates a psychomotor disturbance that may involve muscle rigidity, stupor or mutism, purposeless movements, negativism, echolalia, and inappropriate or unusual posturing and is associated with various medical conditions (such as schizophrenia and mood disorders)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catatonic]] | noun | **1.** Of, relating to, marked by, or affected with catatonia.<br>**2.** Characterized by a marked lack of movement, activity, or expression. | *"In academic literature, catatonic designates of, relating to, marked by, or affected with catatonia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercatalectic]] | noun | **1.** (prosody) a line of poetry having an extra syllable or syllables at the end of the last metrical foot.<br>**2.** (verse) having an extra syllable or syllables at the end of a metrically complete verse or in a metrical foot. | *"In academic literature, hypercatalectic designates (prosody) a line of poetry having an extra syllable or syllables at the end of the last metrical foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[katabolic]] | adjective | **1.** Relating to or characterized by catabolism.<br>**2.** Characterized by destructive metabolism. | *"In academic literature, katabolic designates relating to or characterized by catabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[katabolism]] | noun | **1.** Breakdown in living organisms of more complex substances into simpler ones together with release of energy. | *"In academic literature, katabolism designates breakdown in living organisms of more complex substances into simpler ones together with release of energy."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Form & Space]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CATA
  </div>
</div>
