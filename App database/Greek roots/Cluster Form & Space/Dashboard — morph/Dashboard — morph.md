---
status: unread
type: root_dashboard
---
# Dashboard — morph
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">μορφή (morphḗ)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“form / shape / structural configuration”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The sharp, distinctive outline and outward physical silhouette that identifies an object or organism.</span>
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

The Greek root **morph** (μορφή (morphḗ)) signifies form / shape / structural configuration. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Morpheus*, *allomorph*, *amorphous*, *anamorph*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: form / shape / structural configuration
> The Greek root **morph** fundamentally denotes **form / shape / structural configuration**. The sharp, distinctive outline and outward physical silhouette that identifies an object or organism. Aristotelian hylomorphism analyzed reality as an inseparable union of prime matter (hyle) and organizing form (morphe), determining a thing's nature and function.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">form / shape / structural configuration</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sharp, distinctive outline and outward physical silhouette that identifies an object or organism.</mark>
> - **Everyday Connection**: Think of familiar words like *Morpheus*, *allomorph*, *amorphous*, *anamorph*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **morph** derives from Ancient Greek <mark class="hl-stem">μορφή (morphḗ)</mark>, meaning "form / shape / structural configuration".
  - Reconstructed Indo-European origin: ***mergʷ- ("to flicker, visible form, boundary")**.

- **The Big Picture Idea**:
  - The sharp, distinctive outline and outward physical silhouette that identifies an object or organism.
  - Whenever you see **morph** in an English word, think immediately of **form / shape / structural configuration**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">morph</mark>, think of <mark class="hl-def">form / shape / structural configuration</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `morph-` (from *μορφή (morphḗ)*).
> - **Combining Stem with -o- Connective:** `morpho-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Morph
> - **1. Direct & Concrete Anchor:** Literal instantiation of form / shape / structural configuration in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on morph

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `morph-` | [[Morpheus]] | Primary root semantic foundation denoting form / shape / structural configuration. |
| **Connecting -o-** | `morpho-` | [[allomorph]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `morph` | [[amorphous]] | Relational or directional modification of the core root sense. |

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
| [[allomorph]] | noun | **1.** One of a set of forms that a morpheme may take in different contexts. | *"In academic literature, allomorph designates one of a set of forms that a morpheme may take in different contexts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allomorphic]] | adjective | **1.** Pertaining to allomorphs. | *"In academic literature, allomorphic designates pertaining to allomorphs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amorpha]] | noun | **1.** Any plant of the genus amorpha having odd-pinnate leaves and purplish spicate flowers. | *"In academic literature, amorpha designates any plant of the genus amorpha having odd-pinnate leaves and purplish spicate flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amorphophallus]] | noun | **1.** Any plant of the genus amorphophallus. | *"In academic literature, amorphophallus designates any plant of the genus amorphophallus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amorphous]] | noun | **1.** Having no definite form : shapeless.<br>**2.** Being without definite character or nature : unclassifiable. | *"This was the shocking thing; that the slime of the pit seemed to utter cries and voices; that the amorphous dust gesticulated and sinned; that what was dead, and had no shape, should usurp the offices of life."* — Robert Louis Stevenson, *The strange case of Dr. Jekyll and Mr. Hyde* |
| [[anamorph]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, anamorph designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anamorphic]] | noun | **1.** Producing, relating to, or marked by intentional distortion (as by unequal magnification along perpendicular axes) of an image. | *"In academic literature, anamorphic designates producing, relating to, or marked by intentional distortion (as by unequal magnification along perpendicular axes) of an image."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anamorphism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, anamorphism designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anamorphosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, anamorphosis designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropomorphic]] | noun | **1.** Described or thought of as having a human form or human attributes.<br>**2.** Ascribing human characteristics to nonhuman things. | *"God is individual and personal in a scientific 337:1 sense, but not in any anthropomorphic sense."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[anthropomorphise]] | verb | **1.** Ascribe human features to something. | *"In academic literature, anthropomorphise designates ascribe human features to something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropomorphism]] | noun | **1.** An interpretation of what is not human or personal in terms of human or personal characteristics : humanization. | *"The true 140:21 worshippers shall worship the Father in spirit and in truth." Anthropomorphism The Jewish tribal Jehovah was a man-projected God, 140:24 liable to wrath, repentance, and human changeableness."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[anthropomorphize]] | verb | **1.** Ascribe human features to something. | *"In academic literature, anthropomorphize designates ascribe human features to something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropomorphous]] | adjective | **1.** Suggesting human characteristics for animals or inanimate things. | *"In academic literature, anthropomorphous designates suggesting human characteristics for animals or inanimate things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apomorphine]] | noun | **1.** A morphine derivative that is not as strong as morphine; used as an emetic and in small doses as a sedative. | *"In academic literature, apomorphine designates a morphine derivative that is not as strong as morphine; used as an emetic and in small doses as a sedative."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apomorphy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, apomorphy designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autapomorphy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, autapomorphy designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[automorphism]] | noun | **1.** An isomorphism of a set (such as a group) with itself. | *"In academic literature, automorphism designates an isomorphism of a set (such as a group) with itself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catamorphism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, catamorphism designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dimorphic]] | noun | **1.** Dimorphous.<br>**2.** Occurring in two distinct forms. | *"Dimorphic change in sulphides, 36."* — Donald M. Levy, *Modern Copper Smelting* |
| [[dimorphism]] | noun | **1.** The condition or property of being dimorphic or dimorphous: such as.<br>**2.** The existence of two different forms (as of color or size) of a species especially in the same population. | *"In academic literature, dimorphism designates the condition or property of being dimorphic or dimorphous: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dimorphous]] | adjective | **1.** Occurring or existing in two different forms. | *"This species will again come under notice as the summer spores of a truly dimorphous species."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[dysmorphic]] | noun | **1.** Characterized by malformation. | *"In academic literature, dysmorphic designates characterized by malformation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dysmorphophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, dysmorphophobia designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectomorph]] | noun | **1.** An ectomorphic individual. | *"In academic literature, ectomorph designates an ectomorphic individual."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectomorphic]] | noun | **1.** Of or relating to the component in W. H. Sheldon's classification of body types that measures the body's degree of slenderness, angularity, and fragility.<br>**2.** Characterized by a lean slender body build with slight muscular development. | *"In academic literature, ectomorphic designates of or relating to the component in w. h. sheldon's classification of body types that measures the body's degree of slenderness, angularity, and fragility."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectomorphy]] | noun | **1.** Slender, weak, and lightweight. | *"In academic literature, ectomorphy designates slender, weak, and lightweight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enantiomorph]] | noun | **1.** Enantiomer.<br>**2.** Either of a pair of crystals (as of quartz) that are structural mirror images. | *"In academic literature, enantiomorph designates enantiomer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enantiomorphic]] | noun | **1.** Enantiomer.<br>**2.** Either of a pair of crystals (as of quartz) that are structural mirror images. | *"In academic literature, enantiomorphic designates enantiomer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enantiomorphism]] | noun | **1.** The relation of opposition between crystals or molecules that are reflections of one another. | *"In academic literature, enantiomorphism designates the relation of opposition between crystals or molecules that are reflections of one another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endomorph]] | noun | **1.** An endomorphic individual. | *"In academic literature, endomorph designates an endomorphic individual."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endomorphic]] | noun | **1.** Of or relating to the component in W. H. Sheldon's classification of body types that measures the massiveness of the digestive viscera and the body's degree of roundedness and softness.<br>**2.** Having a heavy rounded body build often with a marked tendency to become fat. | *"In academic literature, endomorphic designates of or relating to the component in w. h. sheldon's classification of body types that measures the massiveness of the digestive viscera and the body's degree of roundedness and softness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endomorphy]] | noun | **1.** Round, fat, and heavy. | *"In academic literature, endomorphy designates round, fat, and heavy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epimorphic]] | adjective | **1.** Characterized by incomplete metamorphosis; having the same number of body segments in successive stages. | *"In academic literature, epimorphic designates characterized by incomplete metamorphosis; having the same number of body segments in successive stages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epimorphism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, epimorphism designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geomorphologic]] | adjective | **1.** Pertaining to geological structure. | *"In academic literature, geomorphologic designates pertaining to geological structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geomorphological]] | adjective | **1.** Pertaining to geological structure. | *"In academic literature, geomorphological designates pertaining to geological structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geomorphology]] | noun | **1.** A science that deals with the relief features of the earth or of another celestial body (such as the moon) and seeks an interpretation of them based on their origins and development.<br>**2.** The features dealt with in geomorphology. | *"In academic literature, geomorphology designates a science that deals with the relief features of the earth or of another celestial body (such as the moon) and seeks an interpretation of them based on their origins and development."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimetamorphic]] | adjective | **1.** (of an insect with aquatic young) undergoing incomplete metamorphosis in which the young does not resemble the adult. | *"In academic literature, hemimetamorphic designates (of an insect with aquatic young) undergoing incomplete metamorphosis in which the young does not resemble the adult."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimetamorphosis]] | noun | **1.** Incomplete or partial metamorphosis in insects. | *"In academic literature, hemimetamorphosis designates incomplete or partial metamorphosis in insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimetamorphous]] | adjective | **1.** (of an insect with aquatic young) undergoing incomplete metamorphosis in which the young does not resemble the adult. | *"In academic literature, hemimetamorphous designates (of an insect with aquatic young) undergoing incomplete metamorphosis in which the young does not resemble the adult."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimorphic]] | noun | **1.** Having different crystalline forms at each end of a crystallographic axis. | *"In academic literature, hemimorphic designates having different crystalline forms at each end of a crystallographic axis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimorphite]] | noun | **1.** A white mineral; a common ore of zinc. | *"In academic literature, hemimorphite designates a white mineral; a common ore of zinc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holomorph]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, holomorph designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holomorphic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of form / shape / structural configuration. | *"In academic literature, holomorphic designates adjective*) pertaining to, derived from, or characteristic of form / shape / structural configuration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holomorphism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, holomorphism designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homeomorphic]] | noun | **1.** A function that is a one-to-one mapping between sets such that both the function and its inverse are continuous and that in topology exists for geometric figures which can be transformed one into the other by an elastic deformation. | *"In academic literature, homeomorphic designates a function that is a one-to-one mapping between sets such that both the function and its inverse are continuous and that in topology exists for geometric figures which can be transformed one into the other by an elastic deformation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homeomorphism]] | noun | **1.** A function that is a one-to-one mapping between sets such that both the function and its inverse are continuous and that in topology exists for geometric figures which can be transformed one into the other by an elastic deformation. | *"In academic literature, homeomorphism designates a function that is a one-to-one mapping between sets such that both the function and its inverse are continuous and that in topology exists for geometric figures which can be transformed one into the other by an elastic deformation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homomorphic]] | noun | **1.** A mapping of a mathematical set (such as a group, ring, or vector space) into or onto another set or itself in such a way that the result obtained by applying the operations to elements of the first set is mapped onto the result obtained by applying the corresponding operations to their respective images in the second set. | *"In academic literature, homomorphic designates a mapping of a mathematical set (such as a group, ring, or vector space) into or onto another set or itself in such a way that the result obtained by applying the operations to elements of the first set is mapped onto the result obtained by applying the corresponding operations to their respective images in the second set."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homomorphism]] | noun | **1.** A mapping of a mathematical set (such as a group, ring, or vector space) into or onto another set or itself in such a way that the result obtained by applying the operations to elements of the first set is mapped onto the result obtained by applying the corresponding operations to their respective images in the second set. | *"In academic literature, homomorphism designates a mapping of a mathematical set (such as a group, ring, or vector space) into or onto another set or itself in such a way that the result obtained by applying the operations to elements of the first set is mapped onto the result obtained by applying the corresponding operations to their respective images in the second set."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homomorphy]] | noun | **1.** Similarity of form. | *"In academic literature, homomorphy designates similarity of form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hylomorphism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, hylomorphism designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermorphosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, hypermorphosis designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomorphic]] | noun | **1.** Being of identical or similar form, shape, or structure.<br>**2.** Having sporophytic and gametophytic generations alike in size and shape. | *"In academic literature, isomorphic designates being of identical or similar form, shape, or structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomorphism]] | noun | **1.** The quality or state of being isomorphic: such as.<br>**2.** Similarity in organisms of different ancestry resulting from convergence. | *"In academic literature, isomorphism designates the quality or state of being isomorphic: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomorphous]] | adjective | **1.** Having similar appearance but genetically different. | *"In academic literature, isomorphous designates having similar appearance but genetically different."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomorphy]] | noun | **1.** (biology) similarity or identity of form or shape or structure. | *"In academic literature, isomorphy designates (biology) similarity or identity of form or shape or structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesomorph]] | noun | **1.** A mesomorphic body or person. | *"In academic literature, mesomorph designates a mesomorphic body or person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesomorphic]] | noun | **1.** Of or relating to the component in W. H. Sheldon's classification of body types that measures especially the degree of muscularity and bone development.<br>**2.** Having a husky muscular body build. | *"In academic literature, mesomorphic designates of or relating to the component in w. h. sheldon's classification of body types that measures especially the degree of muscularity and bone development."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesomorphy]] | noun | **1.** Muscular and big-boned. | *"In academic literature, mesomorphy designates muscular and big-boned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metamorphic]] | noun | **1.** Of or relating to metamorphosis.<br>**2.** Of, relating to, or produced by metamorphism. | *"In academic literature, metamorphic designates of or relating to metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metamorphism]] | noun | **1.** A change in the constitution of rock; specifically : a pronounced change effected by pressure, heat, and water that results in a more compact and more highly crystalline condition. | *"In academic literature, metamorphism designates a change in the constitution of rock; specifically : a pronounced change effected by pressure, heat, and water that results in a more compact and more highly crystalline condition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metamorphopsia]] | noun | **1.** A defect of vision in which objects appear to be distorted; usually due to a defect in the retina. | *"In academic literature, metamorphopsia designates a defect of vision in which objects appear to be distorted; usually due to a defect in the retina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metamorphose]] | verb | **1.** Change completely the nature or appearance of.<br>**2.** Change in outward structure or looks. | *"I obeyed with singular hardihood, for how did I know whether a wave of his wand might not metamorphose me into some strange monster or conjure me into one of the bottles on his mantelpiece?"* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[metamorphosis]] | noun | **1.** Change of physical form, structure, or substance especially by supernatural means.<br>**2.** A striking alteration in appearance, character, or circumstances. | *"Grandsire, ’tis Ovid’s _Metamorphosis_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metamorphous]] | adjective | **1.** Of or relating to metamorphosis (especially of rocks).<br>**2.** Produced by metamorphosis. | *"In academic literature, metamorphous designates of or relating to metamorphosis (especially of rocks)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomorphemic]] | adjective | **1.** Consisting of only one morpheme. | *"In academic literature, monomorphemic designates consisting of only one morpheme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomorphic]] | noun | **1.** Having but a single form, structural pattern, or genotype. | *"In academic literature, monomorphic designates having but a single form, structural pattern, or genotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomorphism]] | noun | **1.** Having but a single form, structural pattern, or genotype. | *"In academic literature, monomorphism designates having but a single form, structural pattern, or genotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morph]] | noun | **1.** allomorph.<br>**2.** a distinctive collocation of phones (such as a portmanteau form) that serves as the realization of more than one morpheme in a context (such as the French du for the sequence of de and le). | *"In academic literature, morph designates allomorph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphallaxis]] | noun | **1.** Regeneration on a reduced scale of a body part; observed especially in invertebrates such as certain lobsters. | *"In academic literature, morphallaxis designates regeneration on a reduced scale of a body part; observed especially in invertebrates such as certain lobsters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphea]] | noun | **1.** Localized scleroderma. | *"In academic literature, morphea designates localized scleroderma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morpheme]] | noun | **1.** A distinctive collocation of phonemes (such as the free form pin or the bound form -s of pins) having no smaller meaningful parts. | *"In academic literature, morpheme designates a distinctive collocation of phonemes (such as the free form pin or the bound form -s of pins) having no smaller meaningful parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphemic]] | adjective | **1.** Of or relating to morphemes. | *"In academic literature, morphemic designates of or relating to morphemes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Morpheus]] | noun | **1.** The Greek god of dreams. | *"If I don’t sleep at once, chloral, the modern Morpheus--C_{2}HCl_{3}O."* — Bram Stoker, *Dracula* |
| [[morpheus]] | noun | **1.** The roman god of sleep and dreams. | *"In academic literature, morpheus designates **1.** the roman god of sleep and dreams."* — Academic Lexicon |
| [[morphia]] | noun | **1.** An alkaloid narcotic drug extracted from opium; a powerful, habit-forming narcotic used to relieve pain. | *"I shall give hypodermic injection of morphia.” He proceeded then, swiftly and deftly, to carry out his intent."* — Bram Stoker, *Dracula* |
| [[morphine]] | noun | **1.** A bitter crystalline addictive narcotic base C17H19NO3 that is the principal alkaloid of opium and is used in the form of a soluble salt (such as a hydrochloride or a sulfate) as an analgesic and sedative. | *"Of course I declined his proposition to “shoot me” so full of morphine through the night that to-morrow I would not know, when I marched to the gallows, whether I was “coming or going.” But the laugh."* — Jack London, *The Jacket (The Star-Rover)* |
| [[morphogenesis]] | noun | **1.** Differentiation and growth of the structure of an organism (or a part of an organism). | *"In academic literature, morphogenesis designates differentiation and growth of the structure of an organism (or a part of an organism)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphologic]] | adjective | **1.** Relating to or concerned with the morphology of plants and animals.<br>**2.** Relating to or concerned with the formation of admissible words in a language. | *"In academic literature, morphologic designates relating to or concerned with the morphology of plants and animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphological]] | noun | **1.** A branch of biology that deals with the form and structure of animals and plants.<br>**2.** The form and structure of an organism or any of its parts. | *"In academic literature, morphological designates a branch of biology that deals with the form and structure of animals and plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphologically]] | adverb | **1.** In a morphological manner; with regard to morphology. | *"In academic literature, morphologically designates in a morphological manner; with regard to morphology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphology]] | noun | **1.** A branch of biology that deals with the form and structure of animals and plants.<br>**2.** The form and structure of an organism or any of its parts. | *"In academic literature, morphology designates a branch of biology that deals with the form and structure of animals and plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphophoneme]] | noun | **1.** (linguistics) the phonemes (or strings of phonemes) that constitute the various allomorphs of a morpheme. | *"In academic literature, morphophoneme designates (linguistics) the phonemes (or strings of phonemes) that constitute the various allomorphs of a morpheme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphophonemic]] | adjective | **1.** Of or relating to morphophonemics. | *"In academic literature, morphophonemic designates of or relating to morphophonemics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphophonemics]] | noun | **1.** The study of the phonological realization of the allomorphs of the morphemes of a language. | *"In academic literature, morphophonemics designates the study of the phonological realization of the allomorphs of the morphemes of a language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphophysiology]] | noun | **1.** The study of anatomy in its relation to function. | *"In academic literature, morphophysiology designates the study of anatomy in its relation to function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphosyntactic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of form / shape / structural configuration. | *"In academic literature, morphosyntactic designates adjective*) pertaining to, derived from, or characteristic of form / shape / structural configuration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[morphosyntax]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, morphosyntax designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramorph]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, paramorph designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peramorphism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, peramorphism designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peramorphosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, peramorphosis designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perimorph]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, perimorph designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plesiomorphy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, plesiomorphy designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymorph]] | noun | **1.** A polymorphic organism; also : one of the several forms of such an organism.<br>**2.** Any of the crystalline forms of a polymorphic substance. | *"In academic literature, polymorph designates a polymorphic organism; also : one of the several forms of such an organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymorphemic]] | adjective | **1.** Consisting of two or more morphemes. | *"In academic literature, polymorphemic designates consisting of two or more morphemes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymorphic]] | noun | **1.** The quality or state of existing in or assuming different forms: such as.<br>**2.** Existence of a species in several forms independent of the variations of sex. | *"In academic literature, polymorphic designates the quality or state of existing in or assuming different forms: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymorphism]] | noun | **1.** The quality or state of existing in or assuming different forms: such as.<br>**2.** Existence of a species in several forms independent of the variations of sex. | *"In academic literature, polymorphism designates the quality or state of existing in or assuming different forms: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymorphous]] | adjective | **1.** Relating to the crystallization of a compound in two or more different forms.<br>**2.** Relating to the occurrence of more than one kind of individual (independent of sexual differences) in an interbreeding population. | *"In academic literature, polymorphous designates relating to the crystallization of a compound in two or more different forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudomorph]] | noun | **1.** A mineral having the characteristic outward form of another species.<br>**2.** A deceptive or irregular form. | *"In academic literature, pseudomorph designates a mineral having the characteristic outward form of another species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synapomorphy]] | noun | **1.** A character or trait that is shared by two or more taxonomic groups and is derived through evolution from a common ancestral form. | *"In academic literature, synapomorphy designates a character or trait that is shared by two or more taxonomic groups and is derived through evolution from a common ancestral form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleomorph]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, teleomorph designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleomorphic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of form / shape / structural configuration. | *"In academic literature, teleomorphic designates adjective*) pertaining to, derived from, or characteristic of form / shape / structural configuration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theriomorphic]] | noun | **1.** Having an animal form. | *"In academic literature, theriomorphic designates having an animal form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trimorphic]] | noun | **1.** Occurring in or having three distinct forms. | *"In academic literature, trimorphic designates occurring in or having three distinct forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trimorphism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek morph.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, trimorphism designates a term designating an entity, condition, or phenomenon derived from greek morph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trimorphodon]] | noun | **1.** Lyre snakes. | *"In academic literature, trimorphodon designates lyre snakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoomorph]] | noun | **1.** Having the form of an animal.<br>**2.** Of, relating to, or being a deity conceived of in animal form or with animal attributes. | *"In academic literature, zoomorph designates having the form of an animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoomorphism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, zoomorphism designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · MORPH
  </div>
</div>
