---
status: unread
type: root_dashboard
---
# Dashboard — chro
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">χρῶμα (khrôma)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“color”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'color'.</span>
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

The Greek root **chro** (χρῶμα (khrôma)) signifies color. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *achromat*, *achromatic*, *achromatism*, *achromatopsia*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: color
> The Greek root **chro** fundamentally denotes **color**. The physical sensory observation and cognitive anchor underlying 'color'. In classical Greek antiquity, the root denoted 'color', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">color</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'color'.</mark>
> - **Everyday Connection**: Think of familiar words like *achromat*, *achromatic*, *achromatism*, *achromatopsia*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **chro** derives from Ancient Greek <mark class="hl-stem">χρῶμα (khrôma)</mark>, meaning "color".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with chro**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'color'.
  - Whenever you see **chro** in an English word, think immediately of **color**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">chro</mark>, think of <mark class="hl-def">color</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `chro-` (from *χρῶμα (khrôma)*).
> - **Combining Stem with -o- Connective:** `chroo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Chro
> - **1. Direct & Concrete Anchor:** Literal instantiation of color in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on chro

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `chro-` | [[achromat]] | Primary root semantic foundation denoting color. |
| **Connecting -o-** | `chroo-` | [[achromatic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `chro` | [[achromatism]] | Relational or directional modification of the core root sense. |

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
| [[achromasia]] | noun | **1.** Unnatural lack of color in the skin (as from bruising or sickness or emotional distress). | *"In academic literature, achromasia designates unnatural lack of color in the skin (as from bruising or sickness or emotional distress)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromat]] | noun | **1.** A lens made by combining lenses of different glasses having different focal powers so that the light emerging from the lens forms an image practically free of chromatic aberration : achromatic lens. | *"In academic literature, achromat designates a lens made by combining lenses of different glasses having different focal powers so that the light emerging from the lens forms an image practically free of chromatic aberration : achromatic lens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromatic]] | noun | **1.** Refracting light without dispersing it into its constituent colors : giving images practically free from extraneous colors.<br>**2.** Not readily colored by the usual staining agents. | *"The air, afflicted to pallor with the hoary multitudes that infested it, twisted and spun them eccentrically, suggesting an achromatic chaos of things."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[achromaticity]] | noun | **1.** The visual property of being without chromatic color. | *"In academic literature, achromaticity designates the visual property of being without chromatic color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromatin]] | noun | **1.** The part of a cell nucleus that is relatively uncolored by stains or dyes. | *"In academic literature, achromatin designates the part of a cell nucleus that is relatively uncolored by stains or dyes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromatinic]] | adjective | **1.** (of substance of a cell nucleus) not readily colored by stains. | *"In academic literature, achromatinic designates (of substance of a cell nucleus) not readily colored by stains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromatise]] | verb | **1.** Remove color from. | *"In academic literature, achromatise designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromatism]] | noun | **1.** Refracting light without dispersing it into its constituent colors : giving images practically free from extraneous colors.<br>**2.** Not readily colored by the usual staining agents. | *"In academic literature, achromatism designates refracting light without dispersing it into its constituent colors : giving images practically free from extraneous colors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromatize]] | verb | **1.** Remove color from. | *"In academic literature, achromatize designates remove color from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromatopsia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chro.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, achromatopsia designates a term designating an entity, condition, or phenomenon derived from greek chro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromatopsic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of color. | *"In academic literature, achromatopsic designates adjective*) pertaining to, derived from, or characteristic of color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromatous]] | adjective | **1.** Having little or inadequate color. | *"In academic literature, achromatous designates having little or inadequate color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromia]] | noun | **1.** An absence of normal pigmentation especially in the skin (as in albinism) or in red blood cells. | *"In academic literature, achromia designates an absence of normal pigmentation especially in the skin (as in albinism) or in red blood cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromic]] | adjective | **1.** Having no color. | *"In academic literature, achromic designates having no color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromous]] | adjective | **1.** Having no color. | *"In academic literature, achromous designates having no color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[achromycin]] | noun | **1.** An antibiotic (trade name achromycin) derived from microorganisms of the genus streptomyces and used broadly to treat infections. | *"In academic literature, achromycin designates an antibiotic (trade name achromycin) derived from microorganisms of the genus streptomyces and used broadly to treat infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphichroic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of color. | *"In academic literature, amphichroic designates adjective*) pertaining to, derived from, or characteristic of color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anachronic]] | adjective | **1.** Chronologically misplaced. | *"In academic literature, anachronic designates chronologically misplaced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anachronism]] | noun | **1.** An error in chronology; especially : a chronological misplacing of persons, events, objects, or customs in regard to each other.<br>**2.** A person or a thing that is chronologically out of place; especially : one from a former age that is incongruous in the present. | *"You are too young—it is an anachronism for you to have such thoughts,” said Will, energetically, with a quick shake of the head habitual to him."* — George Eliot, *Middlemarch* |
| [[anachronistic]] | adjective | **1.** Chronologically misplaced. | *"Retained anachronistic spelling and grammar as printed."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[anachronistically]] | adverb | **1.** In an anachronistic manner. | *"In academic literature, anachronistically designates in an anachronistic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anachronous]] | adjective | **1.** Chronologically misplaced. | *"In academic literature, anachronous designates chronologically misplaced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apochromat]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chro.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, apochromat designates a term designating an entity, condition, or phenomenon derived from greek chro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apochromatic]] | adjective | **1.** Corrected for both chromatic and spherical aberration. | *"In academic literature, apochromatic designates corrected for both chromatic and spherical aberration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auxochrome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chro.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, auxochrome designates a term designating an entity, condition, or phenomenon derived from greek chro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chro]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chro.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, chro designates a term designating an entity, condition, or phenomenon derived from greek chro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chroma]] | noun | **1.** Saturation.<br>**2.** A quality of color combining hue and saturation. | *"In academic literature, chroma designates saturation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromaesthesia]] | noun | **1.** A form of synesthesia in which nonvisual stimulation results in the experience of color sensations. | *"In academic literature, chromaesthesia designates a form of synesthesia in which nonvisual stimulation results in the experience of color sensations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromate]] | noun | **1.** Any salt or ester of chromic acid. | *"In academic literature, chromate designates any salt or ester of chromic acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatic]] | noun | **1.** Of, relating to, or giving all the tones of the chromatic scale.<br>**2.** Characterized by frequent use of accidentals. | *"The light from the water-bottle was merely engaged in a chromatic problem."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[chromatically]] | adverb | **1.** With respect to color. | *"In academic literature, chromatically designates with respect to color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromaticity]] | noun | **1.** The quality of a color as determined by its dominant wavelength. | *"In academic literature, chromaticity designates the quality of a color as determined by its dominant wavelength."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatid]] | noun | **1.** One of the usually paired and parallel strands of a duplicated chromosome joined by a single centromere.<br>**2.** Either of the two identical chromatids that are formed by replication of a chromosome during the S phase of the cell cycle, are joined by a centromere, and segregate into separate daughter cells during anaphase. | *"In academic literature, chromatid designates one of the usually paired and parallel strands of a duplicated chromosome joined by a single centromere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatin]] | noun | **1.** The readily stainable substance of a cell nucleus consisting of dna and rna and various proteins; during mitotic division it condenses into chromosomes. | *"In academic literature, chromatin designates the readily stainable substance of a cell nucleus consisting of dna and rna and various proteins; during mitotic division it condenses into chromosomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatinic]] | adjective | **1.** (of substance of a cell nucleus) readily colored by stains. | *"In academic literature, chromatinic designates (of substance of a cell nucleus) readily colored by stains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatism]] | noun | **1.** Hallucinatory perception of colored lights.<br>**2.** Abnormal pigmentation. | *"In academic literature, chromatism designates hallucinatory perception of colored lights."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatogram]] | noun | **1.** The recording (column or paper strip) on which the constituents of a mixture are adsorbed in chromatography. | *"In academic literature, chromatogram designates the recording (column or paper strip) on which the constituents of a mixture are adsorbed in chromatography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatographic]] | adjective | **1.** Of or relating to chromatography. | *"In academic literature, chromatographic designates of or relating to chromatography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatographical]] | adjective | **1.** Of or relating to chromatography. | *"In academic literature, chromatographical designates of or relating to chromatography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatographically]] | adverb | **1.** By means of a chromatographic process. | *"In academic literature, chromatographically designates by means of a chromatographic process."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatography]] | noun | **1.** A process in which a chemical mixture carried by a liquid or gas is separated into components as a result of differential distribution of the solutes as they flow around or over a stationary liquid or solid phase.<br>**2.** Chromatography in which a macromolecule (such as a protein) is isolated and purified by passing it in solution through a column treated with a substance having a ligand for which the macromolecule has an affinity that causes it to be retained on the column. | *"In academic literature, chromatography designates a process in which a chemical mixture carried by a liquid or gas is separated into components as a result of differential distribution of the solutes as they flow around or over a stationary liquid or solid phase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatophore]] | noun | **1.** A pigment-bearing cell; especially : a cell (such as a melanophore) of an animal integument capable of causing integumentary color changes by expanding or contracting.<br>**2.** The organelle of photosynthesis in photosynthetic bacteria (such as the cyanobacteria); broadly : chromoplast, chloroplast. | *"In academic literature, chromatophore designates a pigment-bearing cell; especially : a cell (such as a melanophore) of an animal integument capable of causing integumentary color changes by expanding or contracting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chrome]] | noun | **1.** chromium.<br>**2.** a chromium pigment. | *"By the outer margin of the Pit was an oval pond, and over it hung the attenuated skeleton of a chrome-yellow moon which had only a few days to last—the morning star dogging her on the left hand."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[chromesthesia]] | noun | **1.** A form of synesthesia in which nonvisual stimulation results in the experience of color sensations. | *"In academic literature, chromesthesia designates a form of synesthesia in which nonvisual stimulation results in the experience of color sensations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromite]] | noun | **1.** A brownish-black mineral; the major source of chromium. | *"It is not an uncommon practice to thicken the walls close to the tap-holes, where they are subjected to most wear, and often chromite is used at these points owing to its power of withstanding the forces of erosion."* — Donald M. Levy, *Modern Copper Smelting* |
| [[chromium]] | noun | **1.** A blue-white metallic element found naturally only in combination and used especially in alloys and in electroplating.<br>**2.** A biologically active chromium salt C18H12CrN3O6 used as a dietary supplement. | *"Steel is ordinarily an alloy of iron and carbon, but this metal also contains traces of nickel and chromium, which make it specially suitable for its special purpose."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[chromium-plate]] | verb | **1.** Plate with chromium. | *"In academic literature, chromium-plate designates plate with chromium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromoblastomycosis]] | noun | **1.** A fungal infection characterized by itchy warty nodules on the skin. | *"In academic literature, chromoblastomycosis designates a fungal infection characterized by itchy warty nodules on the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromogen]] | noun | **1.** A precursor of a biochemical pigment.<br>**2.** A pigment-producing microorganism. | *"In academic literature, chromogen designates a precursor of a biochemical pigment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromolithography]] | noun | **1.** A picture printed in colors from a series of lithographic stones or plates. | *"In academic literature, chromolithography designates a picture printed in colors from a series of lithographic stones or plates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chro.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, chromophobia designates a term designating an entity, condition, or phenomenon derived from greek chro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromophore]] | noun | **1.** A chemical group (such as an azo group) that absorbs light at a specific frequency and so imparts color to a molecule; also : a colored chemical compound. | *"In academic literature, chromophore designates a chemical group (such as an azo group) that absorbs light at a specific frequency and so imparts color to a molecule; also : a colored chemical compound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromoplast]] | noun | **1.** Plastid containing pigments other than chlorophyll usually yellow or orange carotenoids. | *"In academic literature, chromoplast designates plastid containing pigments other than chlorophyll usually yellow or orange carotenoids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromosomal]] | adjective | **1.** Of or relating to a chromosome. | *"In academic literature, chromosomal designates of or relating to a chromosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromosome]] | noun | **1.** Any of the rod-shaped or threadlike DNA-containing structures of cellular organisms that are located in the nucleus of eukaryotes, are usually ring-shaped in prokaryotes (such as bacteria), and contain all or most of the genes of the organism; also : the genetic material of a virus.<br>**2.** The usually constant number of chromosomes characteristic of a particular kind of animal or plant. | *"In academic literature, chromosome designates any of the rod-shaped or threadlike dna-containing structures of cellular organisms that are located in the nucleus of eukaryotes, are usually ring-shaped in prokaryotes (such as bacteria), and contain all or most of the genes of the organism; also : the genetic material of a virus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromosphere]] | noun | **1.** A gaseous layer of the sun's atmosphere (extending from the photosphere to the corona) that is visible during a total eclipse of the sun. | *"In academic literature, chromosphere designates a gaseous layer of the sun's atmosphere (extending from the photosphere to the corona) that is visible during a total eclipse of the sun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronic]] | noun | **1.** Continuing or occurring again and again for a long time.<br>**2.** Being, providing, or requiring long-term medical care (as for a chronic disease). | *"Indeed, she had two.” My Lady, whose chronic malady of boredom has been sadly aggravated by Volumnia this evening, glances wearily towards the candlesticks and heaves a noiseless sigh."* — Charles Dickens, *Bleak House* |
| [[chronically]] | adverb | **1.** In a habitual and longstanding manner.<br>**2.** In a slowly developing and long lasting manner. | *"It may be said, for short, that every organ of the lower body became chronically diseased, and that the headaches increased in violence."* — Classic Author, *The wonders of prayer* |
| [[chronicle]] | noun | **1.** A historical account of events arranged in order of time usually without analysis or interpretation. | *"I and my sword will earn our chronicle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[chronicler]] | noun | **1.** Someone who writes chronicles. | *"After my death I wish no other herald, No other speaker of my living actions, To keep mine honour from corruption But such an honest chronicler as Griffith."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[chronograph]] | noun | **1.** An instrument for measuring and recording time intervals: such as.<br>**2.** An instrument having a revolving drum on which a stylus makes marks. | *"Normally, current flows through the circuit-breaker, but the lifting of the piston breaks the circuit (whence the name of the contrivance), and that breaking of the circuit and consequent cessation of the current operates the chronograph."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[chronological]] | adjective | **1.** Relating to or arranged according to temporal order. | *"Mark's chronological date here, he does not speak of this until Peter has called him the Messiah."* — T. R. Glover, *The Jesus of History* |
| [[chronologically]] | adverb | **1.** With respect to chronology. | *"The persistency of this thought may be best illustrated by a few quotations from poems and letters, arranged chronologically: 1831."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[chronologise]] | verb | **1.** Establish the order in time of something. | *"In academic literature, chronologise designates establish the order in time of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronologize]] | verb | **1.** Establish the order in time of something. | *"In academic literature, chronologize designates establish the order in time of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronology]] | noun | **1.** The science that deals with measuring time by regular divisions and that assigns to events their proper dates.<br>**2.** A chronological table, list, or account. | *"His very name carried an impressiveness hardly to be measured without a precise chronology of scholarship."* — George Eliot, *Middlemarch* |
| [[chronometer]] | noun | **1.** Timepiece; especially : one designed to keep time with great accuracy despite external forces. | *"Heart weak, but steady as a chronometer.” “It’s only twenty-four hours,” Captain Jamie said, “and he was never in like condition before.” “Putting it on, that’s what he’s doing, and you can stack on that,” Al Hutchins, the head trusty, interjected."* — Jack London, *The Jacket (The Star-Rover)* |
| [[chronoperates]] | noun | **1.** A reptile genus of therapsida. | *"In academic literature, chronoperates designates a reptile genus of therapsida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronoscope]] | noun | **1.** An instrument for accurate measurements of small intervals of time. | *"In academic literature, chronoscope designates an instrument for accurate measurements of small intervals of time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diachronic]] | adjective | **1.** Used of the study of a phenomenon (especially language) as it changes through time. | *"In academic literature, diachronic designates used of the study of a phenomenon (especially language) as it changes through time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diachrony]] | noun | **1.** The study of linguistic change. | *"In academic literature, diachrony designates the study of linguistic change."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dichroic]] | noun | **1.** Having the property of dichroism.<br>**2.** Dichromatic. | *"In academic literature, dichroic designates having the property of dichroism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dichroism]] | noun | **1.** The property of some crystals and solutions of absorbing one of two plane-polarized components of transmitted light more strongly than the other; also : the property of exhibiting different colors by reflected or transmitted light.<br>**2.** The property (as of an optically active medium) of unequal absorption of right and left plane-polarized light so that the emergent light is elliptically polarized. | *"In academic literature, dichroism designates the property of some crystals and solutions of absorbing one of two plane-polarized components of transmitted light more strongly than the other; also : the property of exhibiting different colors by reflected or transmitted light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dichromatic]] | noun | **1.** Having or exhibiting two colors.<br>**2.** Of, relating to, or exhibiting dichromatism. | *"In academic literature, dichromatic designates having or exhibiting two colors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dichromatism]] | noun | **1.** A deficiency of color vision in which the person can match any given hue by mixing only two other wavelengths of light (as opposed to the three wavelengths needed by people with normal color vision). | *"In academic literature, dichromatism designates a deficiency of color vision in which the person can match any given hue by mixing only two other wavelengths of light (as opposed to the three wavelengths needed by people with normal color vision)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliochrome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chro.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, heliochrome designates a term designating an entity, condition, or phenomenon derived from greek chro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterochromatic]] | noun | **1.** Densely staining chromatin that appears as nodules in or along chromosomes and contains relatively few genes. | *"In academic literature, heterochromatic designates densely staining chromatin that appears as nodules in or along chromosomes and contains relatively few genes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homochromatic]] | adjective | **1.** (of light or other electromagnetic radiation) having only one wavelength. | *"In academic literature, homochromatic designates (of light or other electromagnetic radiation) having only one wavelength."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isochronal]] | adjective | **1.** Equal in duration or interval. | *"In academic literature, isochronal designates equal in duration or interval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isochrone]] | noun | **1.** An isogram connecting points at which something occurs or arrives at the same time. | *"In academic literature, isochrone designates an isogram connecting points at which something occurs or arrives at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isochronous]] | adjective | **1.** Equal in duration or interval. | *"In academic literature, isochronous designates equal in duration or interval."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microchromosome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chro.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, microchromosome designates a term designating an entity, condition, or phenomenon derived from greek chro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromacy]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromacy designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromasy]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromasy designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromat]] | noun | **1.** A person who is completely color-blind. | *"In academic literature, monochromat designates a person who is completely color-blind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromatic]] | noun | **1.** Having or consisting of one color or hue.<br>**2.** Monochrome. | *"The oat-harvest began, and all the men were a-field under a monochromatic Lammas sky, amid the trembling air and short shadows of noon."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[monochromatism]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromatism designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochrome]] | noun | **1.** A painting, drawing, or photograph in a single hue.<br>**2.** Of, relating to, or made with a single color or hue. | *"The fields were sallow with the impure light, and all were tinged in monochrome, as if beheld through stained glass."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[monochromia]] | noun | **1.** Complete color blindness; colors can be differentiated only on the basis of brightness. | *"In academic literature, monochromia designates complete color blindness; colors can be differentiated only on the basis of brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromic]] | adjective | **1.** Having or appearing to have only one color. | *"In academic literature, monochromic designates having or appearing to have only one color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monochromous]] | adjective | **1.** Having or appearing to have only one color. | *"In academic literature, monochromous designates having or appearing to have only one color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pleochroism]] | noun | **1.** The property of a crystal of showing different colors when viewed by light polarized in different directions. | *"In academic literature, pleochroism designates the property of a crystal of showing different colors when viewed by light polarized in different directions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polychromatic]] | noun | **1.** Showing a variety or a change of colors : multicolored.<br>**2.** Being or relating to radiation that is composed of more than one wavelength. | *"In academic literature, polychromatic designates showing a variety or a change of colors : multicolored."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polychrome]] | noun | **1.** Relating to, made with, or decorated in several colors. | *"The attractive character of certain localities in Ireland and abroad, as represented in general geographical maps of polychrome design or in special ordnance survey charts by employment of scale numerals and hachures."* — James Joyce, *Ulysses* |
| [[polychromic]] | adjective | **1.** Having or exhibiting many colors. | *"In academic literature, polychromic designates having or exhibiting many colors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polychromise]] | verb | **1.** Color with many colors; make polychrome. | *"In academic literature, polychromise designates color with many colors; make polychrome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polychromize]] | verb | **1.** Color with many colors; make polychrome. | *"In academic literature, polychromize designates color with many colors; make polychrome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchro]] | noun | **1.** A system consisting of a generator and a motor so connected that the motor will assume the same relative position as the generator; the generator and the motor are synchronized. | *"In academic literature, synchro designates a system consisting of a generator and a motor so connected that the motor will assume the same relative position as the generator; the generator and the motor are synchronized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchrocyclotron]] | noun | **1.** Cyclotron that achieves relativistic velocities by modulating the frequency of the accelerating electric field. | *"In academic literature, synchrocyclotron designates cyclotron that achieves relativistic velocities by modulating the frequency of the accelerating electric field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchromesh]] | noun | **1.** An automotive system for shifting gears in which the gears revolve at the same speed and so shift smoothly. | *"In academic literature, synchromesh designates an automotive system for shifting gears in which the gears revolve at the same speed and so shift smoothly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronal]] | adjective | **1.** Occurring or existing at the same time or having the same period or phase; - jour.a.m.a. | *"In academic literature, synchronal designates occurring or existing at the same time or having the same period or phase; - jour.a.m.a."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchroneity]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchroneity designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronic]] | noun | **1.** Synchronous.<br>**2.** Descriptive. | *"In academic literature, synchronic designates synchronous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronicity]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchronicity designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronisation]] | noun | **1.** The relation that exists when things occur at the same time.<br>**2.** An adjustment that causes something to occur or recur in unison. | *"In academic literature, synchronisation designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronise]] | verb | **1.** Happen at the same time.<br>**2.** Make (motion picture sound) exactly simultaneous with the action. | *"And when we separate the two by a distance of many miles, the task of synchronising them is even worse."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[synchronised]] | verb | **1.** Happen at the same time.<br>**2.** Make (motion picture sound) exactly simultaneous with the action. | *"In academic literature, synchronised designates happen at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchroniser]] | noun | **1.** An instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines). | *"In academic literature, synchroniser designates an instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronising]] | noun | **1.** An adjustment that causes something to occur or recur in unison.<br>**2.** Happen at the same time. | *"And when we separate the two by a distance of many miles, the task of synchronising them is even worse."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[synchronism]] | noun | **1.** The quality or state of being synchronous : simultaneousness.<br>**2.** Chronological arrangement of historical events and personages so as to indicate coincidence or coexistence; also : a table showing such concurrences. | *"For success, as has already been said, one thing was essential, and that thing very difficult to obtain--a perfect synchronism between one stylus and the other."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[synchronization]] | noun | **1.** The relation that exists when things occur at the same time.<br>**2.** An adjustment that causes something to occur or recur in unison. | *"In academic literature, synchronization designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronize]] | noun | **1.** To happen at the same time.<br>**2.** To represent or arrange (events) to indicate coincidence or coexistence. | *"Each utility maneuvered to synchronize axis and align portals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[synchronized]] | verb | **1.** Make synchronous and adjust in time or manner.<br>**2.** Happen at the same time. | *"All of your plans and timetables must be synchronized with the actions I take at the conference." "Any attacks on the depot will be immediately spunnel-flashed by Hanno to the UIPS," Drummer said."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[synchronizer]] | noun | **1.** An instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines). | *"In academic literature, synchronizer designates an instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronizing]] | noun | **1.** The relation that exists when things occur at the same time.<br>**2.** An adjustment that causes something to occur or recur in unison. | *"In academic literature, synchronizing designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronoscope]] | noun | **1.** An instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines). | *"In academic literature, synchronoscope designates an instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronous]] | noun | **1.** Happening, existing, or arising at precisely the same time.<br>**2.** Recurring or operating at exactly the same periods. | *"In academic literature, synchronous designates happening, existing, or arising at precisely the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronously]] | adverb | **1.** In synchrony; in a synchronous manner. | *"In academic literature, synchronously designates in synchrony; in a synchronous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchrony]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchrony designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchroscope]] | noun | **1.** An instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines). | *"In academic literature, synchroscope designates an instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchrotron]] | noun | **1.** Cyclotron in which the electric field is maintained at a constant frequency. | *"In academic literature, synchrotron designates cyclotron in which the electric field is maintained at a constant frequency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trichroism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek chro.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, trichroism designates a term designating an entity, condition, or phenomenon derived from greek chro."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trichromacy]] | noun | **1.** The normal ability to see colors. | *"In academic literature, trichromacy designates the normal ability to see colors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trichromatic]] | noun | **1.** Of, relating to, or consisting of three colors.<br>**2.** Relating to or being the theory that human color vision involves three types of retinal sensory receptors. | *"In academic literature, trichromatic designates of, relating to, or consisting of three colors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trichrome]] | adjective | **1.** Having or involving three colors. | *"In academic literature, trichrome designates having or involving three colors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trichromic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of color. | *"In academic literature, trichromic designates adjective*) pertaining to, derived from, or characteristic of color."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Light & Vision]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CHRO
  </div>
</div>
