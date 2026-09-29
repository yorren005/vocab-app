---
status: unread
type: root_dashboard
---
# Dashboard — oxy
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ὀξύς (oxús)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sharp, pointed”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'sharp, pointed'.</span>
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

The Greek root **oxy** (ὀξύς (oxús)) signifies sharp, pointed. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *anoxia*, *anoxic*, *dioxide*, *hypoxia*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sharp, pointed
> The Greek root **oxy** fundamentally denotes **sharp, pointed**. The physical sensory observation and cognitive anchor underlying 'sharp, pointed'. In classical Greek antiquity, the root denoted 'sharp, pointed', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">sharp, pointed</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'sharp, pointed'.</mark>
> - **Everyday Connection**: Think of familiar words like *anoxia*, *anoxic*, *dioxide*, *hypoxia*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **oxy** derives from Ancient Greek <mark class="hl-stem">ὀξύς (oxús)</mark>, meaning "sharp, pointed".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with oxy**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'sharp, pointed'.
  - Whenever you see **oxy** in an English word, think immediately of **sharp, pointed**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">oxy</mark>, think of <mark class="hl-def">sharp, pointed</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `oxy-` (from *ὀξύς (oxús)*).
> - **Combining Stem with -o- Connective:** `oxyo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Oxy
> - **1. Direct & Concrete Anchor:** Literal instantiation of sharp, pointed in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on oxy

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `oxy-` | [[anoxia]] | Primary root semantic foundation denoting sharp, pointed. |
| **Connecting -o-** | `oxyo-` | [[anoxic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `oxy` | [[dioxide]] | Relational or directional modification of the core root sense. |

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
| [[anoxia]] | noun | **1.** Hypoxia especially of such severity as to result in permanent damage.<br>**2.** The absence of dissolved oxygen in a body of water. | *"In academic literature, anoxia designates hypoxia especially of such severity as to result in permanent damage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anoxic]] | noun | **1.** Of, relating to, or affected with anoxia.<br>**2.** Greatly deficient in oxygen : oxygenless. | *"In academic literature, anoxic designates of, relating to, or affected with anoxia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deoxidise]] | verb | **1.** To remove oxygen from a compound, or cause to react with hydrogen or form a hydride, or to undergo an increase in the number of electrons. | *"In academic literature, deoxidise designates to remove oxygen from a compound, or cause to react with hydrogen or form a hydride, or to undergo an increase in the number of electrons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deoxidize]] | verb | **1.** To remove oxygen from a compound, or cause to react with hydrogen or form a hydride, or to undergo an increase in the number of electrons. | *"In academic literature, deoxidize designates to remove oxygen from a compound, or cause to react with hydrogen or form a hydride, or to undergo an increase in the number of electrons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deoxygenate]] | verb | **1.** Remove oxygen from (water). | *"In academic literature, deoxygenate designates remove oxygen from (water)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dioxide]] | noun | **1.** An oxide (such as carbon dioxide) containing two atoms of oxygen in the molecule.<br>**2.** A heavy colorless gas CO2 that does not support combustion, dissolves in water to form carbonic acid, is formed especially in animal respiration and in the decay or combustion of animal and vegetable matter, is absorbed from the air by plants in photosynthesis, and is used in the carbonation of beverages. | *"The carbon combines with oxygen into carbon dioxide, commonly called carbonic acid gas, the hydrogen and some more oxygen form steam, while the nitrogen is left out in the cold, so to speak."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[epoxy]] | noun | **1.** A thermosetting resin; used chiefly in strong adhesives and coatings and laminates.<br>**2.** Glue with epoxy. | *"In academic literature, epoxy designates a thermosetting resin; used chiefly in strong adhesives and coatings and laminates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypoxia]] | noun | **1.** A deficiency of oxygen reaching the tissues of the body. | *"In academic literature, hypoxia designates a deficiency of oxygen reaching the tissues of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoxide]] | noun | **1.** An oxide containing one atom of oxygen in a molecule.<br>**2.** A colorless odorless very toxic gas CO that is formed as a product of the incomplete combustion of carbon or a carbon compound. | *"The ordinary iron furnaces belch forth flames which are really good useful gas (carbon monoxide) burning to waste."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[oxidate]] | verb | **1.** Enter into a combination with oxygen or become converted into an oxide.<br>**2.** Add oxygen to or combine with oxygen. | *"In academic literature, oxidate designates enter into a combination with oxygen or become converted into an oxide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxidation]] | noun | **1.** The process of oxidizing; the addition of oxygen to a compound with a loss of electrons; always occurs accompanied by reduction. | *"When a metal is heated in the air there is usually trouble from oxidation."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[oxide]] | noun | **1.** A binary compound of oxygen with a more electropositive element or group.<br>**2.** The oxide of aluminum Al2O3 that occurs both in pure form as corundum and in hydrated forms (as in bauxite) and that has superior strength and hardness. | *"Do you feel the pain of tooth-pulling, when you believe that nitrous-oxide gas has made you unconscious? 346:27 Yet, in your concept, the tooth, the operation, and the forceps are unchanged."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[oxidise]] | verb | **1.** Add oxygen to or combine with oxygen.<br>**2.** Enter into a combination with oxygen or become converted into an oxide. | *"At a higher temperature the sulphate is again decomposed to CuO and SO_{3}, some of which passes off and is free to oxidise more sulphide; the rest is decomposed to SO_{2} and oxygen."* — Donald M. Levy, *Modern Copper Smelting* |
| [[oxidize]] | verb | **1.** Enter into a combination with oxygen or become converted into an oxide.<br>**2.** Add oxygen to or combine with oxygen. | *"Pumping-out or Oxidizing._ Coating the face of the molded case with chemical copper to hasten deposition of copper shell in the bath. _11."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[oxy]] | noun | **1.** Containing oxygen or additional oxygen —often used in combination. | *"Here would be another light, as of oxy-hydrogen, showing the very grain of things, and revising all former explanations."* — George Eliot, *Middlemarch* |
| [[oxyanion]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oxy.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, oxyanion designates a term designating an entity, condition, or phenomenon derived from greek oxy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxygen]] | noun | **1.** A chemical element with atomic number 8 that constitutes 21 percent of the Earth's atmosphere, that is capable of combining with all elements except some noble gases, that is active in physiological processes of almost all known organisms, and that is involved especially in combustion —often used before another noun.<br>**2.** Something that sustains or fuels. | *"The dimmest-sparked chip of a conception blazes and scintillates in the subtile oxygen of his mind."* — Francis Thompson, *Shelley: An Essay* |
| [[oxygenate]] | verb | **1.** Impregnate, combine, or supply with oxygen. | *"Between his ribs and on each side of his spine he is supplied with a remarkable involved Cretan labyrinth of vermicelli-like vessels, which vessels, when he quits the surface, are completely distended with oxygenated blood."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[oxygenation]] | noun | **1.** The process of providing or combining or treating with oxygen. | *"In academic literature, oxygenation designates the process of providing or combining or treating with oxygen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxygenise]] | verb | **1.** Change (a compound) by increasing the proportion of the electronegative part; or change (an element or ion) from a lower to a higher positive valence: remove one or more electrons from (an atom, ion, or molecule).<br>**2.** Dehydrogenate with oxygen. | *"In academic literature, oxygenise designates change (a compound) by increasing the proportion of the electronegative part; or change (an element or ion) from a lower to a higher positive valence: remove one or more electrons from (an atom, ion, or molecule)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxygenize]] | verb | **1.** Change (a compound) by increasing the proportion of the electronegative part; or change (an element or ion) from a lower to a higher positive valence: remove one or more electrons from (an atom, ion, or molecule).<br>**2.** Dehydrogenate with oxygen. | *"In academic literature, oxygenize designates change (a compound) by increasing the proportion of the electronegative part; or change (an element or ion) from a lower to a higher positive valence: remove one or more electrons from (an atom, ion, or molecule)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxyhalide]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oxy.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, oxyhalide designates a term designating an entity, condition, or phenomenon derived from greek oxy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxymoron]] | noun | **1.** A combination of contradictory or incongruous words (such as cruel kindness); broadly : something (such as a concept) that is made up of contradictory or incongruous elements. | *"In academic literature, oxymoron designates a combination of contradictory or incongruous words (such as cruel kindness); broadly : something (such as a concept) that is made up of contradictory or incongruous elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxyntic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of sharp, pointed. | *"In academic literature, oxyntic designates adjective*) pertaining to, derived from, or characteristic of sharp, pointed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paroxysm]] | noun | **1.** A fit, attack, or sudden increase or recurrence of symptoms (as of a disease) : convulsion.<br>**2.** A sudden violent emotion or action : outburst. | *"Wopsle’s great-aunt fell into a state of coma, arising either from sleep or a rheumatic paroxysm."* — Charles Dickens, *Great Expectations* |
| [[paroxysmal]] | adjective | **1.** Accompanied by or of the nature of paroxysms. | *"In academic literature, paroxysmal designates accompanied by or of the nature of paroxysms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentoxide]] | noun | **1.** An oxide containing five atoms of oxygen in the molecule.<br>**2.** A yellowish-red crystalline compound V2O5 used especially in glass manufacture and as a catalyst. | *"In academic literature, pentoxide designates an oxide containing five atoms of oxygen in the molecule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyoxide]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oxy.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, polyoxide designates a term designating an entity, condition, or phenomenon derived from greek oxy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetraoxygen]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oxy.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, tetraoxygen designates a term designating an entity, condition, or phenomenon derived from greek oxy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetroxide]] | noun | **1.** A compound of an element or group with four atoms of oxygen.<br>**2.** A colorless toxic gas N2O4 that is a dimer of nitrogen dioxide and that in liquid form is used as an oxidizer in rocket engines. | *"In academic literature, tetroxide designates a compound of an element or group with four atoms of oxygen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trioxide]] | noun | **1.** An oxide containing three atoms of oxygen.<br>**2.** A solid chemical element that is used especially in wood preservatives, alloys, and semiconductors and is extremely toxic in both pure and combined forms. | *"In academic literature, trioxide designates an oxide containing three atoms of oxygen."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · OXY
  </div>
</div>
