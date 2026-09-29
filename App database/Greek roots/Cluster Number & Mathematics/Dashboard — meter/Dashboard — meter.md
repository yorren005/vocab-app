---
status: unread
type: root_dashboard
---
# Dashboard — meter
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">μέτρον (métron)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“measure”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'measure'.</span>
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

The Greek root **meter** (μέτρον (métron)) signifies measure. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *anemometer*, *anemometric*, *antisymmetric*, *antisymmetry*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: measure
> The Greek root **meter** fundamentally denotes **measure**. The physical sensory observation and cognitive anchor underlying 'measure'. In classical Greek antiquity, the root denoted 'measure', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">measure</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'measure'.</mark>
> - **Everyday Connection**: Think of familiar words like *anemometer*, *anemometric*, *antisymmetric*, *antisymmetry*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **meter** derives from Ancient Greek <mark class="hl-stem">μέτρον (métron)</mark>, meaning "measure".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with meter**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'measure'.
  - Whenever you see **meter** in an English word, think immediately of **measure**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">meter</mark>, think of <mark class="hl-def">measure</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `meter-` (from *μέτρον (métron)*).
> - **Combining Stem with -o- Connective:** `metero-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Meter
> - **1. Direct & Concrete Anchor:** Literal instantiation of measure in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on meter

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `meter-` | [[anemometer]] | Primary root semantic foundation denoting measure. |
| **Connecting -o-** | `metero-` | [[anemometric]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `meter` | [[antisymmetric]] | Relational or directional modification of the core root sense. |

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
| [[anemometer]] | noun | **1.** An instrument for measuring and indicating the force or speed and sometimes direction of the wind. | *"In academic literature, anemometer designates an instrument for measuring and indicating the force or speed and sometimes direction of the wind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anemometric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of measure. | *"In academic literature, anemometric designates adjective*) pertaining to, derived from, or characteristic of measure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anemometrical]] | adjective | **1.** Pertaining to the measurement of wind speed and direction. | *"In academic literature, anemometrical designates pertaining to the measurement of wind speed and direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anisometric]] | adjective | **1.** Having unsymmetrical parts or unequal dimensions or measurements. | *"In academic literature, anisometric designates having unsymmetrical parts or unequal dimensions or measurements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antisymmetric]] | noun | **1.** Relating to or being a relation (such as "is a subset of") that implies equality of any two quantities for which it holds in both directions. | *"In academic literature, antisymmetric designates relating to or being a relation (such as "is a subset of") that implies equality of any two quantities for which it holds in both directions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antisymmetry]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek meter.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, antisymmetry designates a term designating an entity, condition, or phenomenon derived from greek meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asymmetric]] | noun | **1.** Having two sides or halves that are not the same : not symmetrical.<br>**2.** Bonded to four different atoms or groups. | *"In academic literature, asymmetric designates having two sides or halves that are not the same : not symmetrical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asymmetrical]] | adjective | **1.** Characterized by asymmetry in the spatial arrangement or placement of parts or components.<br>**2.** Irregular in shape or outline. | *"What composite asymmetrical image in the mirror then attracted his attention?"* — James Joyce, *Ulysses* |
| [[asymmetrically]] | adverb | **1.** In an asymmetrical manner. | *"In academic literature, asymmetrically designates in an asymmetrical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asymmetry]] | noun | **1.** Lack or absence of symmetry. | *"In academic literature, asymmetry designates lack or absence of symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[axonometric]] | noun | **1.** Being or prepared by the projection of objects on the drawing surface so that they appear inclined with three sides showing and with horizontal and vertical distances drawn to scale but diagonal and curved lines distorted. | *"In academic literature, axonometric designates being or prepared by the projection of objects on the drawing surface so that they appear inclined with three sides showing and with horizontal and vertical distances drawn to scale but diagonal and curved lines distorted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barometer]] | noun | **1.** An instrument for determining the pressure of the atmosphere and hence for assisting in forecasting weather and for determining altitude.<br>**2.** Something that indicates fluctuations (as in public opinion). | *"The barometer did not go down, nor was there any rain, but an unusual greyness wrapped earth and sky."* — Mrs. Oliphant, *A Beleaguered City* |
| [[barometric]] | noun | **1.** An instrument for determining the pressure of the atmosphere and hence for assisting in forecasting weather and for determining altitude.<br>**2.** Something that indicates fluctuations (as in public opinion). | *"It is entirely a question of barometric pressure.” Lestrade looked startled."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[barometrical]] | adjective | **1.** Relating to atmospheric pressure or indicated by a barometer. | *"In academic literature, barometrical designates relating to atmospheric pressure or indicated by a barometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bathometer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek meter.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, bathometer designates a term designating an entity, condition, or phenomenon derived from greek meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronometer]] | noun | **1.** Timepiece; especially : one designed to keep time with great accuracy despite external forces. | *"Heart weak, but steady as a chronometer.” “It’s only twenty-four hours,” Captain Jamie said, “and he was never in like condition before.” “Putting it on, that’s what he’s doing, and you can stack on that,” Al Hutchins, the head trusty, interjected."* — Jack London, *The Jacket (The Star-Rover)* |
| [[demeter]] | noun | **1.** (greek mythology) goddess of fertility and protector of marriage in ancient mythology; counterpart of roman ceres. | *"He called her Artemis, Demeter, and other fanciful names half teasingly, which she did not like because she did not understand them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[diameter]] | noun | **1.** A chord passing through the center of a figure or body.<br>**2.** The length of a straight line through the center of an object or space. | *"A tributary of the main stream flowed through the basin of the pool by an inlet and outlet at opposite points of its diameter."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[diametral]] | adjective | **1.** Related to or along a diameter. | *"In academic literature, diametral designates related to or along a diameter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diametric]] | noun | **1.** Of, relating to, or constituting a straight line segment passing through the center of a figure or body : located at the diameter.<br>**2.** Completely opposed : being at opposite extremes. | *"In academic literature, diametric designates of, relating to, or constituting a straight line segment passing through the center of a figure or body : located at the diameter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diametrical]] | adjective | **1.** Related to or along a diameter.<br>**2.** Characterized by opposite extremes; completely opposed. | *"In academic literature, diametrical designates related to or along a diameter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diametrically]] | adverb | **1.** As from opposite ends of a diameter. | *"Rouncewell, our views of duty, and our views of station, and our views of education, and our views of—in short, ALL our views—are so diametrically opposed, that to prolong this discussion must be repellent to your feelings and repellent to my own."* — Charles Dickens, *Bleak House* |
| [[dysmetria]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek meter.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, dysmetria designates a term designating an entity, condition, or phenomenon derived from greek meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphometer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek meter.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, graphometer designates a term designating an entity, condition, or phenomenon derived from greek meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hexameter]] | noun | **1.** A line of verse consisting of six metrical feet. | *"In academic literature, hexameter designates a line of verse consisting of six metrical feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hygrometer]] | noun | **1.** Any of several instruments for measuring the humidity of the atmosphere. | *"In academic literature, hygrometer designates any of several instruments for measuring the humidity of the atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hygrometry]] | noun | **1.** The measurement of the moisture content of gases, but especially of the humidity of the atmosphere. | *"In academic literature, hygrometry designates the measurement of the moisture content of gases, but especially of the humidity of the atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isodiametric]] | noun | **1.** Having equal diameters. | *"In academic literature, isodiametric designates having equal diameters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isometric]] | noun | **1.** Of, relating to, or characterized by equality of measure; especially : relating to or being a crystallographic system characterized by three equal axes at right angles.<br>**2.** Of, relating to, involving, or being muscular contraction (as in isometrics) against resistance, without significant shortening of muscle fibers, and with marked increase in muscle tone. | *"In academic literature, isometric designates of, relating to, or characterized by equality of measure; especially : relating to or being a crystallographic system characterized by three equal axes at right angles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isometrical]] | adjective | **1.** Having equal dimensions or measurements. | *"In academic literature, isometrical designates having equal dimensions or measurements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isometry]] | noun | **1.** The growth rates in different parts of a growing organism are the same.<br>**2.** A one-to-one mapping of one metric space into another metric space that preserves the distances between each pair of points. | *"In academic literature, isometry designates the growth rates in different parts of a growing organism are the same."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isoperimetric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of measure. | *"In academic literature, isoperimetric designates adjective*) pertaining to, derived from, or characteristic of measure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metal]] | noun | **1.** Any of several chemical elements that are usually shiny solids that conduct heat or electricity and can be formed into sheets etc.<br>**2.** A mixture containing two or more metallic elements or metallic and nonmetallic elements usually fused together or dissolving into each other when molten. | *"That you were made of is metal to make virgins."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[meteor]] | noun | **1.** An atmospheric phenomenon (such as lightning or a snowfall).<br>**2.** Any of the small particles of matter in the solar system that are directly observable only by their incandescence from frictional heating on entry into the atmosphere. | *"I missed the meteor once and hit that woman, who cried out “Clubs!” when I might see from far some forty truncheoners draw to her succour, which were the hope o’ th’ Strand, where she was quartered."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[meter]] | noun | **1.** Systematically arranged and measured rhythm in verse:.<br>**2.** Rhythm that continuously repeats a single basic pattern. | *"Five-meter high orange letters glowed brightly along its blunt bow and stern, and on each quarter sector of its exposed surface, proclaiming the huge cylinder as the UIPS SLINGSHOT LOGISTICS DEPOT."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[meterstick]] | noun | **1.** A rule one meter long (usually marked off in centimeters and millimeters). | *"In academic literature, meterstick designates a rule one meter long (usually marked off in centimeters and millimeters)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metic]] | noun | **1.** An alien who paid a fee to reside in an ancient greek city. | *"In academic literature, metic designates an alien who paid a fee to reside in an ancient greek city."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metical]] | noun | **1.** The basic unit of money in mozambique; equal to 100 centavos. | *"In academic literature, metical designates the basic unit of money in mozambique; equal to 100 centavos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metre]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek meter.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"So should my papers (yellowed with their age) Be scorned, like old men of less truth than tongue, And your true rights be termed a poet’s rage, And stretched metre of an antique song."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metric]] | noun | **1.** A standard of measurement.<br>**2.** A part of prosody that deals with metrical structure. | *"Herrick mentions it in one of his songs: Come, bring with a noise, My metric, merrie boys, The Christmas Log to the firing; While my good dame, she Bids ye all be free, And drink to your hearts’ desiring."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[metrical]] | adjective | **1.** Based on the meter as a standard of measurement.<br>**2.** The rhythmic arrangement of syllables. | *"It should react upon his metrical vocabulary to its beneficial expansion, by taking him outside his aristocratic circle of language, and keeping him in touch with the great commonalty, the proletariat of speech."* — Francis Thompson, *Shelley: An Essay* |
| [[metrically]] | adverb | **1.** With regard to meter. | *"In academic literature, metrically designates with regard to meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metricate]] | verb | **1.** Convert from a non-metric to the metric system. | *"In academic literature, metricate designates convert from a non-metric to the metric system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrication]] | noun | **1.** The act of changing from imperial units of measurement to metric units: meters, grams, seconds. | *"In academic literature, metrication designates the act of changing from imperial units of measurement to metric units: meters, grams, seconds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metricise]] | verb | **1.** Express in the metric system.<br>**2.** Convert from a non-metric to the metric system. | *"In academic literature, metricise designates express in the metric system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metricize]] | verb | **1.** Express in the metric system.<br>**2.** Convert from a non-metric to the metric system. | *"In academic literature, metricize designates express in the metric system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrify]] | verb | **1.** Compose in poetic meter.<br>**2.** Convert from a non-metric to the metric system. | *"In academic literature, metrify designates compose in poetic meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrological]] | adjective | **1.** Of or relating to metrology. | *"In academic literature, metrological designates of or relating to metrology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrology]] | noun | **1.** The science of weights and measures or of measurement.<br>**2.** A system of weights and measures. | *"In academic literature, metrology designates the science of weights and measures or of measurement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometer]] | noun | **1.** An instrument used with a telescope or microscope for measuring minute distances.<br>**2.** A caliper for making precise measurements that has a spindle moved by a finely threaded screw. | *"In academic literature, micrometer designates an instrument used with a telescope or microscope for measuring minute distances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosymmetric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of measure. | *"In academic literature, monosymmetric designates adjective*) pertaining to, derived from, or characteristic of measure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parameter]] | noun | **1.** An arbitrary constant whose value characterizes a member of a system (such as a family of curves); also : a quantity (such as a mean or variance) that describes a statistical population.<br>**2.** An independent variable used to express the coordinates of a variable point and functions of them. | *"Computer: be ready to give a presentation on each option and its variations within the parameters I specified and which surface through your analyses."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[parameterize]] | noun | **1.** To express in terms of parameters. | *"In academic literature, parameterize designates to express in terms of parameters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parametric]] | noun | **1.** An arbitrary constant whose value characterizes a member of a system (such as a family of curves); also : a quantity (such as a mean or variance) that describes a statistical population.<br>**2.** An independent variable used to express the coordinates of a variable point and functions of them. | *"In academic literature, parametric designates an arbitrary constant whose value characterizes a member of a system (such as a family of curves); also : a quantity (such as a mean or variance) that describes a statistical population."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parametrize]] | noun | **1.** To express in terms of parameters. | *"In academic literature, parametrize designates to express in terms of parameters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentameter]] | noun | **1.** A line of verse consisting of five metrical feet. | *"In academic literature, pentameter designates a line of verse consisting of five metrical feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perimeter]] | noun | **1.** The boundary of a closed plane figure.<br>**2.** The length of a perimeter. | *"Reaching the depot's perimeter was less of a problem than he had anticipated."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[polymeter]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek meter.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, polymeter designates a term designating an entity, condition, or phenomenon derived from greek meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetric]] | noun | **1.** Having, involving, or exhibiting symmetry.<br>**2.** Having corresponding points whose connecting lines are bisected by a given point or perpendicularly bisected by a given line or plane. | *"In academic literature, symmetric designates having, involving, or exhibiting symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetrical]] | adjective | **1.** Having similarity in size, shape, and relative position of corresponding parts.<br>**2.** Exhibiting equivalence or correspondence among constituents of an entity or between different entities. | *"And we like ’em all the better for it, don’t we?” Mercury, with his hands in the pockets of his bright peach-blossom small-clothes, stretches his symmetrical silk legs with the air of a man of gallantry and can’t deny it."* — Charles Dickens, *Bleak House* |
| [[symmetrise]] | verb | **1.** Make symmetric. | *"In academic literature, symmetrise designates make symmetric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetrize]] | verb | **1.** Make symmetric. | *"In academic literature, symmetrize designates make symmetric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetry]] | noun | **1.** Balanced proportions; also : beauty of form arising from balanced proportions.<br>**2.** The property of being symmetrical; especially : correspondence in size, shape, and relative position of parts on opposite sides of a dividing line or median plane or about a center or axis. | *"Since the receipt of the missive in the morning, Boldwood had felt the symmetry of his existence to be slowly getting distorted in the direction of an ideal passion."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[telemeter]] | noun | **1.** An instrument for measuring the distance of an object from an observer.<br>**2.** An electrical apparatus for measuring a quantity (such as pressure, speed, or temperature) and transmitting the result especially by radio to a distant station. | *"In academic literature, telemeter designates an instrument for measuring the distance of an object from an observer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telemetered]] | adjective | **1.** Of or pertaining to telemetry. | *"In academic literature, telemetered designates of or pertaining to telemetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telemetric]] | noun | **1.** The science or process of telemetering data.<br>**2.** Data transmitted by telemetry. | *"In academic literature, telemetric designates the science or process of telemetering data."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trimeter]] | noun | **1.** A line of verse consisting of three dipodies or three metrical feet. | *"In academic literature, trimeter designates a line of verse consisting of three dipodies or three metrical feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trimetric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of measure. | *"In academic literature, trimetric designates adjective*) pertaining to, derived from, or characteristic of measure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsymmetric]] | adjective | **1.** Lacking symmetry. | *"In academic literature, unsymmetric designates lacking symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · METER
  </div>
</div>
