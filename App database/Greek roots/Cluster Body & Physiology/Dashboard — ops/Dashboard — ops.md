---
status: unread
type: root_dashboard
---
# Dashboard — ops
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ὄψεσθαι ὀπτός ὀπτικός ὄψις (ópsesthai)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“eye”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'eye'.</span>
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

The Greek root **ops** (ὄψεσθαι ὀπτός ὀπτικός ὄψις (ópsesthai)) signifies eye. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *amblyopia*, *anopia*, *autopsy*, *biopsy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: eye
> The Greek root **ops** fundamentally denotes **eye**. The physical sensory observation and cognitive anchor underlying 'eye'. In classical Greek antiquity, the root denoted 'eye', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">eye</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'eye'.</mark>
> - **Everyday Connection**: Think of familiar words like *amblyopia*, *anopia*, *autopsy*, *biopsy*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ops** derives from Ancient Greek <mark class="hl-stem">ὄψεσθαι ὀπτός ὀπτικός ὄψις (ópsesthai)</mark>, meaning "eye".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with ops**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'eye'.
  - Whenever you see **ops** in an English word, think immediately of **eye**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ops</mark>, think of <mark class="hl-def">eye</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `ops-` (from *ὄψεσθαι ὀπτός ὀπτικός ὄψις (ópsesthai)*).
> - **Combining Stem with -o- Connective:** `opso-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Ops
> - **1. Direct & Concrete Anchor:** Literal instantiation of eye in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on ops

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `ops-` | [[amblyopia]] | Primary root semantic foundation denoting eye. |
| **Connecting -o-** | `opso-` | [[anopia]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `ops` | [[autopsy]] | Relational or directional modification of the core root sense. |

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
| [[amblyopia]] | noun | **1.** Reduced vision typically in one eye that results from the brain suppressing input from the affected eye due to unequal visual signals from each eye (as from strabismus or anisometropia) leading to poor development of visual acuity in the affected eye —called also lazy eye. | *"In academic literature, amblyopia designates reduced vision typically in one eye that results from the brain suppressing input from the affected eye due to unequal visual signals from each eye (as from strabismus or anisometropia) leading to poor development of visual acuity in the affected eye —called also lazy eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amblyopic]] | adjective | **1.** Pertaining to a kind of visual impairment without apparent organic pathology. | *"In academic literature, amblyopic designates pertaining to a kind of visual impairment without apparent organic pathology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anopia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, anopia designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autopsy]] | noun | **1.** An examination of a body after death to determine the cause of death or the character and extent of changes produced by disease —called also necropsy.<br>**2.** A critical examination, evaluation, or assessment of someone or something past. | *"I was undressing in my own room, when, with a premonitory tap at the door, he entered, and at once began to speak:-- “To-morrow I want you to bring me, before night, a set of post-mortem knives.” “Must we make an autopsy?” I asked."* — Bram Stoker, *Dracula* |
| [[biopsy]] | noun | **1.** The removal and examination of tissue, cells, or fluids from the living body. | *"In academic literature, biopsy designates the removal and examination of tissue, cells, or fluids from the living body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catadioptrics]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, catadioptrics designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catoptric]] | adjective | **1.** Of or relating to catoptrics; produced by or based on mirrors. | *"In academic literature, catoptric designates of or relating to catoptrics; produced by or based on mirrors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catoptrical]] | adjective | **1.** Of or relating to catoptrics; produced by or based on mirrors. | *"In academic literature, catoptrical designates of or relating to catoptrics; produced by or based on mirrors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catoptrics]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, catoptrics designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catoptromancy]] | noun | **1.** Catoptromancy, also known as captromancy or enoptromancy, is divination using a mirror.. | *"In academic literature, catoptromancy designates catoptromancy, also known as captromancy or enoptromancy, is divination using a mirror."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catoptrophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, catoptrophobia designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclopean]] | adjective | **1.** Of or relating to or resembling the cyclops. | *"In academic literature, cyclopean designates of or relating to or resembling the cyclops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cyclops]] | noun | **1.** Any of a race of giants in Greek mythology with a single eye in the middle of the forehead.<br>**2.** Any of a genus (Cyclops) of freshwater predatory copepods having a single median eye. | *"To birds on the wing its glassy surface, reflecting the light sky, must have been visible for miles around as a glistening Cyclops’ eye in a green face."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[diopter]] | noun | **1.** A unit of measurement of the refractive power of lenses equal to the reciprocal of the focal length in meters. | *"In academic literature, diopter designates a unit of measurement of the refractive power of lenses equal to the reciprocal of the focal length in meters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dioptre]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, dioptre designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dioptrics]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, dioptrics designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diplopia]] | noun | **1.** A disorder of vision in which two images of a single object are seen (as from unequal action of the eye muscles) —called also double vision. | *"In academic literature, diplopia designates a disorder of vision in which two images of a single object are seen (as from unequal action of the eye muscles) —called also double vision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eisoptrophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, eisoptrophobia designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emmetropia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, emmetropia designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emmetropic]] | adjective | **1.** Of or relating to the normal condition of the eye in which visual images are in clear focus on the retina. | *"In academic literature, emmetropic designates of or relating to the normal condition of the eye in which visual images are in clear focus on the retina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemianopia]] | noun | **1.** Blindness in one half of the visual field of one or both eyes. | *"In academic literature, hemianopia designates blindness in one half of the visual field of one or both eyes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemianopsia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hemianopsia designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[myopia]] | noun | **1.** A condition in which the visual images come to a focus in front of the retina of the eye resulting especially in defective vision of distant objects : nearsightedness.<br>**2.** A lack of foresight or discernment : a narrow view of something. | *"The man with astigmatism, or myopia, or whatever else it is, must get the glasses that will show him the real world, and he is safe, and free to go and come as he pleases."* — T. R. Glover, *The Jesus of History* |
| [[myopic]] | noun | **1.** Affected by myopia : of, relating to, or exhibiting myopia : nearsighted.<br>**2.** Lacking in foresight or discernment : narrow in perspective and without concern for broader implications. | *"The myopic digital calculation of coins, eructation consequent upon repletion."* — James Joyce, *Ulysses* |
| [[ops]] | noun | **1.** A statistic that combines a hitter's on-base percentage and slugging percentage.<br>**2.** The Roman goddess of abundance and the wife of Saturn. | *"This is a Slingshot Tac Ops from Red Fox to Keeper."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[opsoclonus]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, opsoclonus designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optic]] | noun | **1.** Of or relating to vision or the eye. | *"There lands the Fiend, a spot like which perhaps Astronomer in the Sun’s lucent Orbe Through his glaz’d Optic Tube yet never saw."* — John Milton, *Paradise Lost* |
| [[optical]] | noun | **1.** Of or relating to the science of optics.<br>**2.** Of or relating to vision : visual. | *"It is demonstrable that the scratches are going everywhere impartially and it is only your candle which produces the flattering illusion of a concentric arrangement, its light falling with an exclusive optical selection."* — George Eliot, *Middlemarch* |
| [[optically]] | adverb | **1.** In an optical manner. | *"But it seemed that, when on the wharf, Queequeg had not at all noticed what I now alluded to; hence I would have thought myself to have been optically deceived in that matter, were it not for Elijah’s otherwise inexplicable question."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[optics]] | noun | **1.** A science that deals with the genesis and propagation of light, the changes that it undergoes and produces, and other phenomena closely associated with it.<br>**2.** The aspects of an action, policy, or decision (as in politics or business) that relate to public perceptions. | *"Still I'm not sure you'd like it exactly (Such tastes as a rule are acquired), And you'll find in a nutshell this fact lie, Bruised optics are not much admired."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[optokinetic]] | noun | **1.** Of, relating to, or involving movements of the eyes. | *"In academic literature, optokinetic designates of, relating to, or involving movements of the eyes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panoptic]] | noun | **1.** Being or presenting a comprehensive or panoramic view. | *"In academic literature, panoptic designates being or presenting a comprehensive or panoramic view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panoptical]] | adjective | **1.** Including everything visible in one view. | *"In academic literature, panoptical designates including everything visible in one view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panopticon]] | noun | **1.** An optical instrument combining the telescope and microscope.<br>**2.** A circular prison built with cells arranged radially so that a guard at a central position can see all the prisoners. | *"What can be a greater anachronism than the death of Prince Arthur three months hence on the stage of the Panopticon Theatre?"* — Bernard Shaw, *Cashel Byron's Profession* |
| [[pleoptics]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, pleoptics designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synopsis]] | noun | **1.** A condensed statement or outline (as of a narrative or treatise) : abstract.<br>**2.** The abbreviated conjugation of a verb in one person only. | *"Wopsle’s great-aunt may be resolved into the following synopsis."* — Charles Dickens, *Great Expectations* |
| [[synoptic]] | noun | **1.** Affording a general view of a whole.<br>**2.** Manifesting or characterized by comprehensiveness or breadth of view. | *"In academic literature, synoptic designates affording a general view of a whole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synoptical]] | adjective | **1.** Presenting or taking the same point of view; used especially with regard to the first three gospels of the new testament. | *"This paper, now, ‘Synoptical Tabulation’ and so on, ‘for the use of Mrs."* — George Eliot, *Middlemarch* |
| [[synoptics]] | noun | **1.** The first three gospels which describe events in christ's life from a similar point of view. | *"In academic literature, synoptics designates the first three gospels which describe events in christ's life from a similar point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[triops]] | noun | **1.** Type genus of the family triopidae: small crustaceans with a small third median eye. | *"In academic literature, triops designates type genus of the family triopidae: small crustaceans with a small third median eye."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · OPS
  </div>
</div>
