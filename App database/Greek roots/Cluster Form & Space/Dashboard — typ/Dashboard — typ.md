---
status: unread
type: root_dashboard
---
# Dashboard — typ
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">τύπτειν</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“stamp, model”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'stamp, model'.</span>
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

The Greek root **typ** (τύπτειν, τύπος, τυπικός, τύμπανον (túptein, túpos, tupikós, túmpanon)) signifies stamp, model. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *allotype*, *archetype*, *ecotype*, *ectype*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: stamp, model
> The Greek root **typ** fundamentally denotes **stamp, model**. The physical sensory observation and cognitive anchor underlying 'stamp, model'. In classical Greek antiquity, the root denoted 'stamp, model', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">stamp, model</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'stamp, model'.</mark>
> - **Everyday Connection**: Think of familiar words like *allotype*, *archetype*, *ecotype*, *ectype*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **typ** derives from Ancient Greek <mark class="hl-stem">τύπτειν, τύπος, τυπικός, τύμπανον (túptein, túpos, tupikós, túmpanon)</mark>, meaning "stamp, model".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with typ**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'stamp, model'.
  - Whenever you see **typ** in an English word, think immediately of **stamp, model**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">typ</mark>, think of <mark class="hl-def">stamp, model</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `typ-` (from *τύπτειν, τύπος, τυπικός, τύμπανον (túptein, túpos, tupikós, túmpanon)*).
> - **Combining Stem with -o- Connective:** `typo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Typ
> - **1. Direct & Concrete Anchor:** Literal instantiation of stamp, model in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on typ

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `typ-` | [[allotype]] | Primary root semantic foundation denoting stamp, model. |
| **Connecting -o-** | `typo-` | [[archetype]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `typ` | [[ecotype]] | Relational or directional modification of the core root sense. |

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
| [[allotype]] | noun | **1.** An alloantigen that is part of a plasma protein (such as an antibody). | *"In academic literature, allotype designates an alloantigen that is part of a plasma protein (such as an antibody)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitype]] | noun | **1.** A person or thing represented or foreshadowed by a type or symbol; especially a figure in the old testament having a counterpart in the new testament.<br>**2.** An opposite or contrasting type. | *"In academic literature, antitype designates a person or thing represented or foreshadowed by a type or symbol; especially a figure in the old testament having a counterpart in the new testament."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitypic]] | adjective | **1.** Of or relating to an antitype. | *"In academic literature, antitypic designates of or relating to an antitype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antitypical]] | adjective | **1.** Of or relating to an antitype. | *"In academic literature, antitypical designates of or relating to an antitype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[archetypal]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, archetypal designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[archetype]] | noun | **1.** The original pattern or model of which all things of the same type are representations or copies : prototype; also : a perfect example. | *"In academic literature, archetype designates the original pattern or model of which all things of the same type are representations or copies : prototype; also : a perfect example."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[archetypical]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, archetypical designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atypical]] | noun | **1.** Not typical : irregular, unusual.<br>**2.** Relating to or being an antipsychotic drug (such as risperidone) that tends to produce fewer adverse side effects on movement (such as dyskinesia) than previously used antipsychotic drugs (such as haloperidol). | *"In academic literature, atypical designates not typical : irregular, unusual."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atypicality]] | noun | **1.** Any state that is not typical. | *"In academic literature, atypicality designates any state that is not typical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecotype]] | noun | **1.** A population of a species that survives as a distinct group through environmental selection and isolation and that is comparable with a taxonomic subspecies. | *"In academic literature, ecotype designates a population of a species that survives as a distinct group through environmental selection and isolation and that is comparable with a taxonomic subspecies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectype]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek typ.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, ectype designates a term designating an entity, condition, or phenomenon derived from greek typ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epitype]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek typ.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, epitype designates a term designating an entity, condition, or phenomenon derived from greek typ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ergatotype]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek typ.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, ergatotype designates a term designating an entity, condition, or phenomenon derived from greek typ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterotype]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek typ.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, heterotype designates a term designating an entity, condition, or phenomenon derived from greek typ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterotypic]] | noun | **1.** Different in kind, arrangement, or form. | *"In academic literature, heterotypic designates different in kind, arrangement, or form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holotype]] | noun | **1.** The single specimen designated by an author as the type of a species or lesser taxon at the time of establishing the group.<br>**2.** The type of a species or lesser taxon designated at a date later than that of establishing a group or by a person other than the author of the taxon. | *"In academic literature, holotype designates the single specimen designated by an author as the type of a species or lesser taxon at the time of establishing the group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homeotypic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stamp, model. | *"In academic literature, homeotypic designates adjective*) pertaining to, derived from, or characteristic of stamp, model."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homotype]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek typ.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, homotype designates a term designating an entity, condition, or phenomenon derived from greek typ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homotypic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stamp, model. | *"In academic literature, homotypic designates adjective*) pertaining to, derived from, or characteristic of stamp, model."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isosyntype]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek typ.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, isosyntype designates a term designating an entity, condition, or phenomenon derived from greek typ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isotype]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek typ.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, isotype designates a term designating an entity, condition, or phenomenon derived from greek typ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lectotype]] | noun | **1.** A specimen chosen as the type of a species or subspecies if the author of the name fails to designate a type. | *"In academic literature, lectotype designates a specimen chosen as the type of a species or subspecies if the author of the name fails to designate a type."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logotype]] | noun | **1.** A single piece of type or a single plate faced with a term (such as the name of a newspaper or a trademark). | *"In academic literature, logotype designates a single piece of type or a single plate faced with a term (such as the name of a newspaper or a trademark)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotype]] | noun | **1.** (biology) a taxonomic group with a single member (a single species or genus).<br>**2.** A typesetting machine operated from a keyboard that sets separate characters. | *"The linotype and monotype machines, uncanny in their operations, have also come into common practice."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[monotypic]] | noun | **1.** Including a single representative —used especially of a genus with only one species. | *"In academic literature, monotypic designates including a single representative —used especially of a genus with only one species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neotype]] | noun | **1.** A type specimen that is selected subsequent to the description of a species to replace a preexisting type that has been lost or destroyed. | *"In academic literature, neotype designates a type specimen that is selected subsequent to the description of a species to replace a preexisting type that has been lost or destroyed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralectotype]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek typ.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, paralectotype designates a term designating an entity, condition, or phenomenon derived from greek typ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paratype]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek typ.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, paratype designates a term designating an entity, condition, or phenomenon derived from greek typ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phenotype]] | noun | **1.** The observable characteristics or traits of an organism that are produced by the interaction of the genotype and the environment : the physical expression of one or more genes.<br>**2.** The observable characteristics or traits of a disease. | *"In academic literature, phenotype designates the observable characteristics or traits of an organism that are produced by the interaction of the genotype and the environment : the physical expression of one or more genes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phenotypic]] | adjective | **1.** Of or relating to or constituting a phenotype. | *"In academic literature, phenotypic designates of or relating to or constituting a phenotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phenotypical]] | adjective | **1.** Of or relating to or constituting a phenotype. | *"In academic literature, phenotypical designates of or relating to or constituting a phenotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototypal]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, prototypal designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototype]] | noun | **1.** An original model on which something is patterned : archetype.<br>**2.** An individual that exhibits the essential features of a later type. | *"In Diotima, the muse of his "Hyperion," whose prototype was Susette Gontard, he has found it--and now he feels that he is in a new world."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[prototypic]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, prototypic designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototypical]] | adjective | **1.** Representing or constituting an original type after which other similar things are patterned. | *"In academic literature, prototypical designates representing or constituting an original type after which other similar things are patterned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[schizotypic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stamp, model. | *"In academic literature, schizotypic designates adjective*) pertaining to, derived from, or characteristic of stamp, model."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stereotype]] | noun | **1.** To make a stereotype from.<br>**2.** To repeat without variation : make hackneyed. | *"This tablet of lead or tin, when cooled, being easily detached from the matrix, would then reveal the letters of the alphabet reversed and in relief, similar to a present day stereotype."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[stereotyped]] | verb | **1.** Treat or classify according to a mental stereotype.<br>**2.** Lacking spontaneity or originality or individuality. | *"There, those are the stereotyped forms."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[stereotypic]] | noun | **1.** Conforming to a fixed or general pattern or type especially when of an oversimplified or prejudiced nature : of, relating to, or constituting a stereotype.<br>**2.** Of, relating to, or marked by stereotypy. | *"In academic literature, stereotypic designates conforming to a fixed or general pattern or type especially when of an oversimplified or prejudiced nature : of, relating to, or constituting a stereotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stereotypical]] | adjective | **1.** Lacking spontaneity or originality or individuality. | *"In academic literature, stereotypical designates lacking spontaneity or originality or individuality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stereotypically]] | adverb | **1.** In a stereotypical manner. | *"In academic literature, stereotypically designates in a stereotypical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syntype]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek typ.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, syntype designates a term designating an entity, condition, or phenomenon derived from greek typ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[type]] | noun | **1.** A particular kind, class, or group.<br>**2.** Something distinguishable as a variety : sort. | *"Thy father bears the type of King of Naples, Of both the Sicils, and Jerusalem, Yet not so wealthy as an English yeoman."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[typic]] | adjective | **1.** Being or serving as an illustration of a type. | *"In academic literature, typic designates being or serving as an illustration of a type."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[typical]] | noun | **1.** Combining or exhibiting the essential characteristics of a group.<br>**2.** Conforming to a type. | *"Unlike and superior to either of those two typical remnants of mediævalism, the old barn embodied practices which had suffered no mutilation at the hands of time."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[typicality]] | noun | **1.** The state of being that is typical. | *"In academic literature, typicality designates the state of being that is typical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[typically]] | adverb | **1.** In a typical manner. | *"Perhaps none of his poems is more purely and typically Shelleian than _The Cloud_, and it is interesting to note how essentially it springs from the faculty of make-believe."* — Francis Thompson, *Shelley: An Essay* |
| [[typify]] | verb | **1.** Embody the essential characteristics of or be a typical example of.<br>**2.** Express indirectly by an image, form, or model; be a symbol. | *"With Panthea, one of the ocean nymphs that watch over Prometheus, she makes her way to the cave of Demogorgon, "that terrific gloom," who seems meant to typify the Primal Power of the World."* — Sydney Waterlow, *Shelley* |
| [[typing]] | noun | **1.** Writing done with a typewriter.<br>**2.** Write by means of a keyboard with types. | *"BURNS.” “I suppose that's a fool telegram,” he admitted to himself as he hung up the receiver, “but after that typing mess I had to express myself somehow except by signs."* — Grace S. Richmond, *Red Pepper Burns* |
| [[typist]] | noun | **1.** Someone paid to operate a typewriter. | *"Wanted, smart lady typist to aid gentleman in literary work."* — James Joyce, *Ulysses* |
| [[typographer]] | noun | **1.** One who sets written material into type. | *"In academic literature, typographer designates one who sets written material into type."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[typographic]] | adjective | **1.** Relating to or occurring or used in typography. | *"Typographic printing had long before superseded Xylographic printing, that is, printing from a solid block of wood on which type of an entire page were cut individually by hand."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[typographical]] | adjective | **1.** Relating to or occurring or used in typography. | *"Minor spelling and typographical errors have been corrected without note."* — Algis Budrys, *Citadel* |
| [[typographically]] | adverb | **1.** In a typographic way. | *"The "Speculum Humanae Salvationes," attributed to Coster by Junius was partly a folio Latin block-book, and partly typographically printed."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[typography]] | noun | **1.** Letterpress printing.<br>**2.** The style, arrangement, or appearance of typeset matter. | *"Junius does not say it, but clearly implies that, in this way, Coster came to the idea of the movability of the characters, the first step in the invention of typography."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[typology]] | noun | **1.** Study of or analysis or classification based on types or categories.<br>**2.** A doctrine of theological types; especially : one holding that things in Christian belief are prefigured or symbolized by things in the Old Testament. | *"In academic literature, typology designates study of or analysis or classification based on types or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[typos]] | noun | **1.** An error (as of spelling) in typed or typeset material. | *"In academic literature, typos designates an error (as of spelling) in typed or typeset material."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untypical]] | adjective | **1.** Not representative of a group, class, or type. | *"In academic literature, untypical designates not representative of a group, class, or type."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[untypicality]] | noun | **1.** Any state that is not typical. | *"In academic literature, untypicality designates any state that is not typical."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · TYP
  </div>
</div>
