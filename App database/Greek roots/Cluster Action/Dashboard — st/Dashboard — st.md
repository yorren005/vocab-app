---
status: unread
type: root_dashboard
---
# Dashboard — st
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἵστημι</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“cause to stand”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'cause to stand'.</span>
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

The Greek root **st** (ἵστημι, στατικός, στάσις, στατήρ, στήλη ()) signifies cause to stand. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *acrostatic*, *actinostele*, *anastasis*, *antistatic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: cause to stand
> The Greek root **st** fundamentally denotes **cause to stand**. The physical sensory observation and cognitive anchor underlying 'cause to stand'. In classical Greek antiquity, the root denoted 'cause to stand', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">cause to stand</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'cause to stand'.</mark>
> - **Everyday Connection**: Think of familiar words like *acrostatic*, *actinostele*, *anastasis*, *antistatic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **st** derives from Ancient Greek <mark class="hl-stem">ἵστημι, στατικός, στάσις, στατήρ, στήλη ()</mark>, meaning "cause to stand".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with st**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'cause to stand'.
  - Whenever you see **st** in an English word, think immediately of **cause to stand**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">st</mark>, think of <mark class="hl-def">cause to stand</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `st-` (from *ἵστημι, στατικός, στάσις, στατήρ, στήλη ()*).
> - **Combining Stem with -o- Connective:** `sto-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of St
> - **1. Direct & Concrete Anchor:** Literal instantiation of cause to stand in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on st

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `st-` | [[acrostatic]] | Primary root semantic foundation denoting cause to stand. |
| **Connecting -o-** | `sto-` | [[actinostele]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `st` | [[anastasis]] | Relational or directional modification of the core root sense. |

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
| [[acrostatic]] | noun | **1.** Retaining accent on the root throughout the paradigm with zero-grade ablaut of the stem and ending. | *"In academic literature, acrostatic designates retaining accent on the root throughout the paradigm with zero-grade ablaut of the stem and ending."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinostele]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, actinostele designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anastasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, anastasis designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antistatic]] | noun | **1.** Reducing, removing, or preventing the buildup of static electricity. | *"In academic literature, antistatic designates reducing, removing, or preventing the buildup of static electricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apostate]] | noun | **1.** One who commits apostasy. | *"Ha-ha—I’m awfully glad you have made an apostate of me all the same!"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[astasia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, astasia designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, astasis designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astatic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of cause to stand. | *"In academic literature, astatic designates adjective*) pertaining to, derived from, or characteristic of cause to stand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astatine]] | noun | **1.** A radioactive halogen element discovered by bombarding bismuth with alpha particles and also formed by radioactive decay. | *"In academic literature, astatine designates a radioactive halogen element discovered by bombarding bismuth with alpha particles and also formed by radioactive decay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catastasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"It doubles itself in the middle of his life, reflects itself in another, repeats itself, protasis, epitasis, catastasis, catastrophe."* — James Joyce, *Ulysses* |
| [[chronostasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, chronostasis designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diastase]] | noun | **1.** Amylase; especially : a mixture of amylases from malt. | *"In academic literature, diastase designates amylase; especially : a mixture of amylases from malt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diastasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, diastasis designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diastatic]] | noun | **1.** Relating to or having the properties of diastase; especially : converting starch into sugar. | *"In academic literature, diastatic designates relating to or having the properties of diastase; especially : converting starch into sugar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diasystem]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, diasystem designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecstasy]] | noun | **1.** A state of overwhelming emotion; especially : rapturous delight.<br>**2.** A synthetic amphetamine analog C11H15NO2 used illicitly for its mood-enhancing and hallucinogenic properties —called also MDMA. | *"Mark how he trembles in his ecstasy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ecstatic]] | noun | **1.** Of, relating to, or marked by ecstasy.<br>**2.** One that is subject to ecstasies. | *"Having seen that it was really her lover who had advanced, and no one else, her lips parted, and she sank upon him in her momentary joy, with something very like an ecstatic cry."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[epistasis]] | noun | **1.** Suppression of the effect of a gene by a nonallelic gene. | *"In academic literature, epistasis designates suppression of the effect of a gene by a nonallelic gene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[episteme]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, episteme designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epistemic]] | noun | **1.** Of or relating to knowledge or knowing : cognitive. | *"In academic literature, epistemic designates of or relating to knowledge or knowing : cognitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epistemological]] | adjective | **1.** Of or relating to epistemology. | *"In academic literature, epistemological designates of or relating to epistemology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epistemologist]] | noun | **1.** A specialist in epistemology. | *"In academic literature, epistemologist designates a specialist in epistemology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epistemology]] | noun | **1.** The study or a theory of the nature and grounds of knowledge especially with reference to its limits and validity. | *"Like Seneca and Plutarch he was not interested in Philosophy apart from these issues--epistemology, psychology, physics and so forth were not practical matters."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[eustasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, eustasis designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eustatic]] | noun | **1.** Relating to or characterized by worldwide change of sea level. | *"In academic literature, eustatic designates relating to or characterized by worldwide change of sea level."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eustele]] | noun | **1.** A stele typical of dicotyledonous plants that consists of vascular bundles of xylem and phloem strands with parenchymal cells between the bundles. | *"In academic literature, eustele designates a stele typical of dicotyledonous plants that consists of vascular bundles of xylem and phloem strands with parenchymal cells between the bundles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haplostele]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, haplostele designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homeostasis]] | noun | **1.** A relatively stable state of equilibrium or a tendency toward such a state between the different but interdependent elements or groups of elements of an organism, population, or group. | *"In academic literature, homeostasis designates a relatively stable state of equilibrium or a tendency toward such a state between the different but interdependent elements or groups of elements of an organism, population, or group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homeostatic]] | noun | **1.** A relatively stable state of equilibrium or a tendency toward such a state between the different but interdependent elements or groups of elements of an organism, population, or group. | *"In academic literature, homeostatic designates a relatively stable state of equilibrium or a tendency toward such a state between the different but interdependent elements or groups of elements of an organism, population, or group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrostatic]] | noun | **1.** Of or relating to fluids at rest or to the pressures they exert or transmit. | *"For this purpose there is first of all a "hydrostatic valve." This little appliance, which is open to the action of the water, responds to changes in pressure."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[hydrostatics]] | noun | **1.** Study of the mechanical properties of fluids that are not in motion. | *"In academic literature, hydrostatics designates study of the mechanical properties of fluids that are not in motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypostasis]] | noun | **1.** Something that settles at the bottom of a fluid.<br>**2.** The settling of blood in the dependent parts of an organ or body. | *"A misty English morning the imp hypostasis tickled his brain."* — James Joyce, *Ulysses* |
| [[hypostasize]] | noun | **1.** Verb*) To subject to, transform by, or operate upon through cause to stand. | *"In academic literature, hypostasize designates verb*) to subject to, transform by, or operate upon through cause to stand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypostatic]] | noun | **1.** Something that settles at the bottom of a fluid.<br>**2.** The settling of blood in the dependent parts of an organ or body. | *"In academic literature, hypostatic designates something that settles at the bottom of a fluid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypostatisation]] | noun | **1.** Regarding something abstract as a material thing. | *"In academic literature, hypostatisation designates regarding something abstract as a material thing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypostatise]] | verb | **1.** Construe as a real existence, of a conceptual entity. | *"In academic literature, hypostatise designates construe as a real existence, of a conceptual entity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypostatization]] | noun | **1.** Regarding something abstract as a material thing. | *"In academic literature, hypostatization designates regarding something abstract as a material thing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypostatize]] | noun | **1.** To attribute real identity to (a concept). | *"In academic literature, hypostatize designates to attribute real identity to (a concept)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesostatic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of cause to stand. | *"In academic literature, mesostatic designates adjective*) pertaining to, derived from, or characteristic of cause to stand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metastasis]] | noun | **1.** Change of position, state, or form.<br>**2.** The spread of a disease-producing agency (such as cancer cells) from the initial or primary site of disease to another part of the body; also : the process by which such spreading occurs. | *"There is no metastasis, no stoppage of harmonious 420:3 action, no paralysis."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[metastasise]] | verb | **1.** Spread throughout the body. | *"In academic literature, metastasise designates spread throughout the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metastasize]] | noun | **1.** To spread or grow by or as if by metastasis. | *"In academic literature, metastasize designates to spread or grow by or as if by metastasis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metastatic]] | noun | **1.** Change of position, state, or form.<br>**2.** The spread of a disease-producing agency (such as cancer cells) from the initial or primary site of disease to another part of the body; also : the process by which such spreading occurs. | *"In academic literature, metastatic designates change of position, state, or form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metasystem]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, metasystem designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthostates]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, orthostates designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthostatic]] | noun | **1.** Of, relating to, or caused by an upright posture. | *"In academic literature, orthostatic designates of, relating to, or caused by an upright posture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protostele]] | noun | **1.** A stele forming a solid rod with the phloem surrounding the xylem. | *"In academic literature, protostele designates a stele forming a solid rod with the phloem surrounding the xylem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[restate]] | verb | **1.** To say, state, or perform again. | *"Butler and Curtis, and in the arguments which came up upon points of testimony, that there remained little for the other counsel except to restate what had before been said."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[restatement]] | noun | **1.** A revised statement. | *"The theory of the transference of the will of the people to historic persons is merely a paraphrase—a restatement of the question in other words."* — graf Leo Tolstoy, *War and Peace* |
| [[stasimon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, stasimon designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stasis]] | noun | **1.** A slowing or stoppage of the normal flow of a bodily fluid or semifluid: such as.<br>**2.** Slowing of the current of circulating blood. | *"In academic literature, stasis designates a slowing or stoppage of the normal flow of a bodily fluid or semifluid: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[state]] | noun | **1.** The territory occupied by one of the constituent administrative districts of a nation.<br>**2.** The way something is with respect to its main attributes. | *"When I perceive that men as plants increase, Cheered and checked even by the self-same sky: Vaunt in their youthful sap, at height decrease, And wear their brave state out of memory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stated]] | verb | **1.** Express in words.<br>**2.** Put before. | *"The old lady, becoming more and more incensed against the master of deportment as she dwelt upon the subject, gave me some particulars of his career, with strong assurances that they were mildly stated."* — Charles Dickens, *Bleak House* |
| [[stateliness]] | noun | **1.** An elaborate manner of doing something.<br>**2.** Impressiveness in scale or proportion. | *"Oh, I assure you he is very odd!” She shook her head a great many times and tapped her forehead with her finger to express to us that we must have the goodness to excuse him, “For he is a little—you know—M!” said the old lady with great stateliness."* — Charles Dickens, *Bleak House* |
| [[stately]] | adjective | **1.** Impressive in appearance.<br>**2.** Of size and dignity suggestive of a statue. | *"Upon a wooden coffin we attend, And Death’s dishonourable victory We with our stately presence glorify, Like captives bound to a triumphant car."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[statement]] | noun | **1.** A message that is stated or declared; a communication (oral or written) setting forth particulars or facts etc.<br>**2.** A fact or assertion offered as evidence that something is true. | *"So of course the first hour after school from eleven till twelve belongs to me," was Bruno's statement."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[stater]] | noun | **1.** An ancient gold or silver coin of the Greek city-states.<br>**2.** A native or resident of Massachusetts —used as a nickname. | *"In academic literature, stater designates an ancient gold or silver coin of the greek city-states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[static]] | noun | **1.** Exerting force by reason of weight alone without motion.<br>**2.** Of or relating to bodies at rest or forces in equilibrium. | *"I, therefore, is a static theory in respect to the standard of deferred payments, and requires adjustment to apply to a condition of a changing price-level.] [Footnote 12: See above, sec. 3.] [Footnote 13: Mention was made in Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[stative]] | adjective | **1.** ( used of verbs (e.g. `be' or `own') and most participial adjectives) expressing existence or a state rather than an action. | *"In academic literature, stative designates ( used of verbs (e.g. `be' or `own') and most participial adjectives) expressing existence or a state rather than an action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statoblast]] | noun | **1.** A bud in a freshwater bryozoan that overwinters in a chitinous envelope and develops into a new individual in spring. | *"In academic literature, statoblast designates a bud in a freshwater bryozoan that overwinters in a chitinous envelope and develops into a new individual in spring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statocyst]] | noun | **1.** An organ of equilibrium found in usually aquatic invertebrates that is typically a fluid-filled vesicle lined with sensory hairs which detect the position of suspended statoliths. | *"In academic literature, statocyst designates an organ of equilibrium found in usually aquatic invertebrates that is typically a fluid-filled vesicle lined with sensory hairs which detect the position of suspended statoliths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statolith]] | noun | **1.** Any of the usually calcareous bodies suspended in a statocyst.<br>**2.** Any of various starch grains or other solid bodies in the plant cytoplasm that are held to be responsible by changes in their position for changes in orientation of a part or organ. | *"In academic literature, statolith designates any of the usually calcareous bodies suspended in a statocyst."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stator]] | noun | **1.** Mechanical device consisting of the stationary part of a motor or generator in or around which the rotor revolves. | *"In academic literature, stator designates mechanical device consisting of the stationary part of a motor or generator in or around which the rotor revolves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stature]] | noun | **1.** High level of respect gained by impressive development or achievement.<br>**2.** (of a standing person) the distance from head to foot. | *"Care I for the limb, the thews, the stature, bulk, and big assemblance of a man?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stela]] | noun | **1.** A usually carved or inscribed stone slab or pillar used for commemorative purposes.<br>**2.** The usually cylindrical central vascular portion of the axis of a vascular plant. | *"In academic literature, stela designates a usually carved or inscribed stone slab or pillar used for commemorative purposes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, systasis designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[system]] | noun | **1.** A regularly interacting or interdependent group of items forming a unified whole : such as.<br>**2.** A group of interacting bodies under the influence of related forces. | *"It is habitually hard upon Sir Leicester, whose countenance it greenly mottles in the manner of sage-cheese and in whose aristocratic system it effects a dismal revolution."* — Charles Dickens, *Bleak House* |
| [[systematic]] | noun | **1.** Relating to or consisting of a system.<br>**2.** Presented or formulated as a coherent body of ideas or principles. | *"Pardiggle, but her voice had not a friendly sound, I thought; it was much too business-like and systematic."* — Charles Dickens, *Bleak House* |
| [[systematics]] | noun | **1.** The science of systematic classification. | *"In academic literature, systematics designates the science of systematic classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systematisation]] | noun | **1.** Systematic organization; the act of organizing something according to a system or a rationale. | *"In academic literature, systematisation designates systematic organization; the act of organizing something according to a system or a rationale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systematise]] | verb | **1.** Arrange according to a system or reduce to a system. | *"Dryden, to a greater extent than is (we imagine) generally perceived, was Cowley systematised; and Cowley, who sank into the arms of Dryden, rose from the lap of Donne."* — Francis Thompson, *Shelley: An Essay* |
| [[systematiser]] | noun | **1.** An organizer who puts things in order. | *"In academic literature, systematiser designates an organizer who puts things in order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systematism]] | noun | **1.** The habitual practice of systematization and classification. | *"In academic literature, systematism designates the habitual practice of systematization and classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systematist]] | noun | **1.** A biologist who specializes in the classification of organisms into groups on the basis of their structure and origin and behavior.<br>**2.** An organizer who puts things in order. | *"In academic literature, systematist designates a biologist who specializes in the classification of organisms into groups on the basis of their structure and origin and behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systematization]] | noun | **1.** Systematic organization; the act of organizing something according to a system or a rationale. | *"My object here is simply to project the draught of a systematization of cetology."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[systematize]] | noun | **1.** To arrange in accord with a definite plan or scheme : order systematically. | *"Edson attempted to systematize her plan for a home and training school for nurses."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[systematizer]] | noun | **1.** An organizer who puts things in order. | *"And if you descend into the bowels of the various leviathans, why there you will not find distinctions a fiftieth part as available to the systematizer as those external ones already enumerated."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[systematology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek st.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, systematology designates a term designating an entity, condition, or phenomenon derived from greek st."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systemic]] | noun | **1.** Of, relating to, or common to a system: such as.<br>**2.** Affecting the body generally. | *"In academic literature, systemic designates of, relating to, or common to a system: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systemise]] | verb | **1.** Arrange according to a system or reduce to a system. | *"In academic literature, systemise designates arrange according to a system or reduce to a system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systemiser]] | noun | **1.** An organizer who puts things in order. | *"In academic literature, systemiser designates an organizer who puts things in order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[systemize]] | verb | **1.** Arrange according to a system or reduce to a system. | *"Then, again, in 1825, Bernard Germain, Count de Lacépède, a great naturalist, published a scientific systemized whale book, wherein are several pictures of the different species of the Leviathan."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[systemizer]] | noun | **1.** An organizer who puts things in order. | *"In academic literature, systemizer designates an organizer who puts things in order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[teleutostatic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of cause to stand. | *"In academic literature, teleutostatic designates adjective*) pertaining to, derived from, or characteristic of cause to stand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unstated]] | adjective | **1.** Not made explicit. | *"In academic literature, unstated designates not made explicit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsystematic]] | adjective | **1.** Lacking systematic arrangement or method or organization. | *"But as to "Effie's" telling long magazine tales,--pshaw! she is the most unsystematic creature in the world."* — Effie Afton, *Eventide* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ST
  </div>
</div>
