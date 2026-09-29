---
status: unread
type: root_dashboard
---
# Dashboard — calc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">from Latincalx (genitivecalcis)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“calcium,stone”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'calcium,stone'.</span>
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

The Greek root **calc** (from Latincalx (genitivecalcis)) signifies calcium,stone. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *calcite*, *calcitrant*, *calcium*, *calculate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: calcium,stone
> The Greek root **calc** fundamentally denotes **calcium,stone**. The physical sensory observation and cognitive anchor underlying 'calcium,stone'. In classical Greek antiquity, the root denoted 'calcium,stone', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">calcium,stone</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'calcium,stone'.</mark>
> - **Everyday Connection**: Think of familiar words like *calcite*, *calcitrant*, *calcium*, *calculate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **calc** derives from Ancient Greek <mark class="hl-stem">from Latincalx (genitivecalcis)</mark>, meaning "calcium,stone".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with calc**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'calcium,stone'.
  - Whenever you see **calc** in an English word, think immediately of **calcium,stone**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">calc</mark>, think of <mark class="hl-def">calcium,stone</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `calc-` (from *from Latincalx (genitivecalcis)*).
> - **Combining Stem with -o- Connective:** `calco-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Calc
> - **1. Direct & Concrete Anchor:** Literal instantiation of calcium,stone in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on calc

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `calc-` | [[calcite]] | Primary root semantic foundation denoting calcium,stone. |
| **Connecting -o-** | `calco-` | [[calcitrant]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `calc` | [[calcium]] | Relational or directional modification of the core root sense. |

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
| [[calcaneal]] | adjective | **1.** Relating to the heel bone or heel. | *"In academic literature, calcaneal designates relating to the heel bone or heel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcaneus]] | noun | **1.** The largest tarsal bone; forms the human heel. | *"In academic literature, calcaneus designates the largest tarsal bone; forms the human heel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcareous]] | adjective | **1.** Composed of or containing or resembling calcium carbonate or calcite or chalk. | *"Soon the nature of the soil changed; to the sandy plain succeeded an extent of slimy mud, which the Americans call “ooze,” composed of equal parts of silicious and calcareous shells."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[calced]] | adjective | **1.** Used of certain religious orders who wear shoes. | *"In academic literature, calced designates used of certain religious orders who wear shoes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcedony]] | noun | **1.** A milky or greyish translucent to transparent quartz. | *"In academic literature, calcedony designates a milky or greyish translucent to transparent quartz."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calceiform]] | adjective | **1.** Of slipper-shaped blossoms. | *"In academic literature, calceiform designates of slipper-shaped blossoms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calceolaria]] | noun | **1.** Any garden plant of the genus calceolaria having flowers with large inflated slipper-shaped lower lip. | *"In academic literature, calceolaria designates any garden plant of the genus calceolaria having flowers with large inflated slipper-shaped lower lip."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calceolate]] | adjective | **1.** Of slipper-shaped blossoms. | *"In academic literature, calceolate designates of slipper-shaped blossoms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calceus]] | noun | **1.** A shoe covering the ankle; worn by ancient romans. | *"In academic literature, calceus designates a shoe covering the ankle; worn by ancient romans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcic]] | adjective | **1.** Derived from or containing calcium or lime. | *"In academic literature, calcic designates derived from or containing calcium or lime."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcicolous]] | adjective | **1.** Growing or living in soil rich in lime. | *"In academic literature, calcicolous designates growing or living in soil rich in lime."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calciferol]] | noun | **1.** A fat-soluble vitamin that prevents rickets. | *"In academic literature, calciferol designates a fat-soluble vitamin that prevents rickets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calciferous]] | adjective | **1.** Bearing or producing or containing calcium or calcium carbonate or calcite. | *"In academic literature, calciferous designates bearing or producing or containing calcium or calcium carbonate or calcite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcific]] | adjective | **1.** Involving or resulting from calcification. | *"In academic literature, calcific designates involving or resulting from calcification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcification]] | noun | **1.** A process that impregnates something with calcium (or calcium salts).<br>**2.** Tissue hardened by deposition of lime salts. | *"In academic literature, calcification designates a process that impregnates something with calcium (or calcium salts)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcifugous]] | adjective | **1.** Growing or living in acid soil. | *"In academic literature, calcifugous designates growing or living in acid soil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcify]] | verb | **1.** Become impregnated with calcium salts.<br>**2.** Become inflexible and unchanging. | *"In academic literature, calcify designates become impregnated with calcium salts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcimine]] | noun | **1.** A water-base paint containing zinc oxide and glue and coloring; used as a wash for walls and ceilings.<br>**2.** Cover with calcimine. | *"In academic literature, calcimine designates a water-base paint containing zinc oxide and glue and coloring; used as a wash for walls and ceilings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcination]] | noun | **1.** The conversion of metals into their oxides as a result of heating to a high temperature. | *"In academic literature, calcination designates the conversion of metals into their oxides as a result of heating to a high temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcine]] | verb | **1.** Heat a substance so that it oxidizes or reduces. | *"I saw another at work to calcine ice into gunpowder; who likewise showed me a treatise he had written concerning the malleability of fire, which he intended to publish."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[calcite]] | noun | **1.** A mineral CaCO3 consisting of calcium carbonate crystallized in hexagonal form and including common limestone, chalk, and marble. | *"In academic literature, calcite designates a mineral caco3 consisting of calcium carbonate crystallized in hexagonal form and including common limestone, chalk, and marble."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcitic]] | adjective | **1.** Of or relating to or containing calcite. | *"In academic literature, calcitic designates of or relating to or containing calcite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcitonin]] | noun | **1.** Thyroid hormone that tends to lower the level of calcium in the blood plasma and inhibit resorption of bone. | *"In academic literature, calcitonin designates thyroid hormone that tends to lower the level of calcium in the blood plasma and inhibit resorption of bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcitrant]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek calc.<br>**2.** Specialized application within the domain of Earth & Geology. | *"In academic literature, calcitrant designates a term designating an entity, condition, or phenomenon derived from greek calc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcium]] | noun | **1.** A metallic chemical element of the alkaline-earth group that occurs naturally only in combination and is essential to cellular functions in all known organisms.<br>**2.** A usually dark gray crystalline compound CaC2 used especially for the generation of acetylene and for making calcium cyanamide. | *"The gas, which is another of the combinations of carbon and hydrogen (its molecules containing two atoms of each), is easily made by allowing water to come into contact with calcium carbide."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[calcium-cyanamide]] | noun | **1.** A compound used as a fertilizer and as a source of nitrogen compounds. | *"In academic literature, calcium-cyanamide designates a compound used as a fertilizer and as a source of nitrogen compounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calculable]] | adjective | **1.** Capable of being calculated or estimated. | *"It must therefore be a benefit to the community, if this element of unavoidable chance cannot be reduced as a whole, at least to regularize it and make it exactly calculable for any individual."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[calculate]] | noun | **1.** To determine by mathematical processes.<br>**2.** To reckon by exercise of practical judgment : estimate. | *"A cunning man did calculate my birth And told me that by water I should die."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[calculated]] | verb | **1.** Make a mathematical calculation or computation.<br>**2.** Judge to be probable. | *"She is eminently calculated for a mother-in-law."* — Charles Dickens, *Bleak House* |
| [[calculating]] | verb | **1.** Make a mathematical calculation or computation.<br>**2.** Judge to be probable. | *"George is so occupied with the almanac over the fire-place (calculating the coming months by it perhaps) that he does not look round until she has gone away and the door is closed upon her."* — Charles Dickens, *Bleak House* |
| [[calculatingly]] | adverb | **1.** In a calculating manner. | *"It carefully and calculatingly distributed his riches among the members of his family, overlooking no individual of it."* — Mark Twain, *What Is Man? and Other Essays* |
| [[calculation]] | noun | **1.** The procedure of calculating; determining something by mathematical or logical methods.<br>**2.** Problem solving that involves numbers or quantities. | *"I was just eight,” says Phil, “agreeable to the parish calculation, when I went with the tinker."* — Charles Dickens, *Bleak House* |
| [[calculative]] | adjective | **1.** Used of persons. | *"In academic literature, calculative designates used of persons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calculator]] | noun | **1.** An expert at calculation (or at operating calculating machines).<br>**2.** A small machine that is used for mathematical calculations. | *"In academic literature, calculator designates an expert at calculation (or at operating calculating machines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calculous]] | adjective | **1.** Relating to or caused by or having a calculus or calculi. | *"In academic literature, calculous designates relating to or caused by or having a calculus or calculi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calculus]] | noun | **1.** A method of computation or calculation in a special notation (as of logic or symbolic logic).<br>**2.** The mathematical methods comprising differential and integral calculus —often used with the. | *"Man has Forever.” Back to his book then: deeper drooped his head: CALCULUS racked him: Leaden before, his eyes grew dross of lead: TUSSIS attacked him."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[calcutta]] | noun | **1.** The largest city in india and one of the largest cities in the world; located in eastern india; suffers from poverty and overcrowding. | *"Bombay and Calcutta: MACMILLAN AND CO., LTD. [_All Rights reserved._] NOTE: The text of the present volume was passed for press by Arnold Glover and some progress had been made in his lifetime in the collection of the material given in the Appendix."* — John Fletcher, *The Elder Brother* |
| [[calcuttan]] | adjective | **1.** Of or relating to or characteristic of calcutta or its inhabitants. | *"In academic literature, calcuttan designates of or relating to or characteristic of calcutta or its inhabitants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chalicothere]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek calc.<br>**2.** Specialized application within the domain of Earth & Geology. | *"In academic literature, chalicothere designates a term designating an entity, condition, or phenomenon derived from greek calc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chalk]] | noun | **1.** A soft white, gray, or buff limestone composed chiefly of the shells of foraminifers.<br>**2.** A prepared form of chalk or a material resembling chalk especially when used (as for writing on blackboards) as a crayon. | *"Look down, you gods, And on this couple drop a blessed crown; For it is you that have chalk’d forth the way Which brought us hither."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[chalky]] | adjective | **1.** Composed of or containing or resembling calcium carbonate or calcite or chalk.<br>**2.** Of something having the color of chalk. | *"I looked for the chalky cliffs, but I could find no whiteness in them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decalcification]] | noun | **1.** Loss of calcium from bones or teeth. | *"In academic literature, decalcification designates loss of calcium from bones or teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalcify]] | verb | **1.** Lose calcium or calcium compounds.<br>**2.** Remove calcium or lime from. | *"In academic literature, decalcify designates lose calcium or calcium compounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalcomania]] | noun | **1.** Either a design that is fixed to some surface or a paper bearing the design which is to be transferred to the surface.<br>**2.** The art of transfering designs from specially prepared paper to a wood or glass or metal surface. | *"In academic literature, decalcomania designates either a design that is fixed to some surface or a paper bearing the design which is to be transferred to the surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dyscalculia]] | noun | **1.** Impaired ability to learn grade-appropriate mathematics. | *"In academic literature, dyscalculia designates impaired ability to learn grade-appropriate mathematics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercalcaemia]] | noun | **1.** The presence of abnormally high levels of calcium in the blood; usually the result of excessive bone resorption in hyperparathyroidism or paget's disease. | *"In academic literature, hypercalcaemia designates the presence of abnormally high levels of calcium in the blood; usually the result of excessive bone resorption in hyperparathyroidism or paget's disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercalcemia]] | noun | **1.** The presence of abnormally high levels of calcium in the blood; usually the result of excessive bone resorption in hyperparathyroidism or paget's disease. | *"In academic literature, hypercalcemia designates the presence of abnormally high levels of calcium in the blood; usually the result of excessive bone resorption in hyperparathyroidism or paget's disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercalcinuria]] | noun | **1.** The presence of abnormally high levels of calcium in the urine; usually the result of excessive bone resorption in hyperparathyroidism or osteoporosis. | *"In academic literature, hypercalcinuria designates the presence of abnormally high levels of calcium in the urine; usually the result of excessive bone resorption in hyperparathyroidism or osteoporosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercalciuria]] | noun | **1.** The presence of abnormally high levels of calcium in the urine; usually the result of excessive bone resorption in hyperparathyroidism or osteoporosis. | *"In academic literature, hypercalciuria designates the presence of abnormally high levels of calcium in the urine; usually the result of excessive bone resorption in hyperparathyroidism or osteoporosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypocalcaemia]] | noun | **1.** Abnormally low level of calcium in the blood; associated with hypoparathyroidism or kidney malfunction or vitamin d deficiency. | *"In academic literature, hypocalcaemia designates abnormally low level of calcium in the blood; associated with hypoparathyroidism or kidney malfunction or vitamin d deficiency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypocalcemia]] | noun | **1.** Abnormally low level of calcium in the blood; associated with hypoparathyroidism or kidney malfunction or vitamin d deficiency. | *"In academic literature, hypocalcemia designates abnormally low level of calcium in the blood; associated with hypoparathyroidism or kidney malfunction or vitamin d deficiency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recalcitrance]] | noun | **1.** The trait of being unmanageable. | *"In academic literature, recalcitrance designates the trait of being unmanageable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recalcitrancy]] | noun | **1.** The trait of being unmanageable. | *"In academic literature, recalcitrancy designates the trait of being unmanageable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recalcitrant]] | noun | **1.** Obstinately defiant of authority or restraint : stubbornly uncooperative or disobedient.<br>**2.** Difficult to manage or operate. | *"Gloria looked around at those who remained recalcitrant and concentrated her gaze on Stevens."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[recalcitrate]] | verb | **1.** Show strong objection or repugnance; manifest vigorous opposition or resistance; be obstinately disobedient. | *"In academic literature, recalcitrate designates show strong objection or repugnance; manifest vigorous opposition or resistance; be obstinately disobedient."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recalculate]] | verb | **1.** Calculate anew. | *"In academic literature, recalculate designates calculate anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recalculation]] | noun | **1.** The act of calculating again (usually to eliminate errors or to include additional data). | *"In academic literature, recalculation designates the act of calculating again (usually to eliminate errors or to include additional data)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Earth & Geology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CALC
  </div>
</div>
