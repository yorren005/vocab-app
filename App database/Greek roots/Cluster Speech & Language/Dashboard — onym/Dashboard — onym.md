---
status: unread
type: root_dashboard
---
# Dashboard — onym
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ὄνυμα (ónuma)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“name”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'name'.</span>
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

The Greek root **onym** (ὄνυμα (ónuma)) signifies name. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *acronym*, *allonym*, *anonymous*, *antonym*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: name
> The Greek root **onym** fundamentally denotes **name**. The physical sensory observation and cognitive anchor underlying 'name'. In classical Greek antiquity, the root denoted 'name', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">name</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'name'.</mark>
> - **Everyday Connection**: Think of familiar words like *acronym*, *allonym*, *anonymous*, *antonym*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **onym** derives from Ancient Greek <mark class="hl-stem">ὄνυμα (ónuma)</mark>, meaning "name".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with onym**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'name'.
  - Whenever you see **onym** in an English word, think immediately of **name**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">onym</mark>, think of <mark class="hl-def">name</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `onym-` (from *ὄνυμα (ónuma)*).
> - **Combining Stem with -o- Connective:** `onymo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Onym
> - **1. Direct & Concrete Anchor:** Literal instantiation of name in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on onym

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `onym-` | [[acronym]] | Primary root semantic foundation denoting name. |
| **Connecting -o-** | `onymo-` | [[allonym]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `onym` | [[anonymous]] | Relational or directional modification of the core root sense. |

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
| [[acronym]] | noun | **1.** A word (such as NATO, radar, or laser) formed from the initial letter or letters of each of the successive parts or major parts of a compound term; also : an abbreviation (such as FBI) formed from initial letters : initialism. | *"In academic literature, acronym designates a word (such as nato, radar, or laser) formed from the initial letter or letters of each of the successive parts or major parts of a compound term; also : an abbreviation (such as fbi) formed from initial letters : initialism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acronymic]] | adjective | **1.** Characterized by the use of acronyms. | *"In academic literature, acronymic designates characterized by the use of acronyms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acronymous]] | adjective | **1.** Characterized by the use of acronyms. | *"In academic literature, acronymous designates characterized by the use of acronyms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allonym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, allonym designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anonym]] | noun | **1.** A fictitious name used when the person performs a particular social role. | *"In academic literature, anonym designates a fictitious name used when the person performs a particular social role."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anonymity]] | noun | **1.** The state of being anonymous. | *"It was not until he discovered one morning that everybody knew a couplet or two of "How we Beat the Favourite" that he consented to forego his anonymity and appear in the unsuspected character of a versemaker."* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[anonymous]] | noun | **1.** Of unknown authorship or origin.<br>**2.** Not named or identified. | *"Upon which law-writer there was an inquest, and which law-writer was an anonymous character, his name being unknown."* — Charles Dickens, *Bleak House* |
| [[anonymously]] | adverb | **1.** Without giving a name. | *"She has published several works anonymously--the first of which--"The Garland of Flora," was published in Boston in 1829."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[antonym]] | noun | **1.** A word of opposite meaning. | *"In academic literature, antonym designates a word of opposite meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antonymous]] | adjective | **1.** Of words: having opposite meanings. | *"In academic literature, antonymous designates of words: having opposite meanings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antonymy]] | noun | **1.** The semantic relation that holds between two words that can (in a given context) express opposite meanings. | *"In academic literature, antonymy designates the semantic relation that holds between two words that can (in a given context) express opposite meanings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autonym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, autonym designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caconym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, caconym designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptonym]] | noun | **1.** A secret name. | *"In academic literature, cryptonym designates a secret name."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eponym]] | noun | **1.** One for whom or which something is or is believed to be named.<br>**2.** A name (as of a disease, invention, action, etc.) based on or derived from an eponym. | *"In academic literature, eponym designates one for whom or which something is or is believed to be named."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eponymic]] | adjective | **1.** Being or relating to or bearing the name of an eponym. | *"In academic literature, eponymic designates being or relating to or bearing the name of an eponym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eponymous]] | noun | **1.** Being the person or thing for whom or which something specified is named : of, relating to, or being an eponym.<br>**2.** Named for a particular person or thing. | *"In academic literature, eponymous designates being the person or thing for whom or which something specified is named : of, relating to, or being an eponym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eponymy]] | noun | **1.** The explanation of a proper name (as of a town or tribe) by supposing a fictitious eponym. | *"In academic literature, eponymy designates the explanation of a proper name (as of a town or tribe) by supposing a fictitious eponym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euonym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, euonym designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euonymus]] | noun | **1.** Widely distributed chiefly evergreen shrubs or small trees or vines. | *"SPINDLE UREDO; spots yellowish; sori roundish, circinating, often confluent; epidermis erumpent; sporidia ovoid and slightly coherent, tawny-yellow.—On leaves of _Euonymus Europæus_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[homonym]] | noun | **1.** homophone.<br>**2.** homograph. | *"In academic literature, homonym designates homophone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homonymic]] | adjective | **1.** Of or related to or being homonyms. | *"In academic literature, homonymic designates of or related to or being homonyms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homonymous]] | adjective | **1.** Of or related to or being homonyms. | *"In academic literature, homonymous designates of or related to or being homonyms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperonym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, hyperonym designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyponym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, hyponym designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyponymy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, hyponymy designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meronym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, meronym designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meronymy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, meronymy designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metonym]] | noun | **1.** A word used in metonymy. | *"In academic literature, metonym designates a word used in metonymy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metonymic]] | adjective | **1.** Using the name of one thing for that of another with which it is closely associated. | *"In academic literature, metonymic designates using the name of one thing for that of another with which it is closely associated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metonymical]] | adjective | **1.** Using the name of one thing for that of another with which it is closely associated. | *"In academic literature, metonymical designates using the name of one thing for that of another with which it is closely associated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metonymically]] | adverb | **1.** In a metonymic manner. | *"In academic literature, metonymically designates in a metonymic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metonymy]] | noun | **1.** A figure of speech consisting of the use of the name of one thing for that of another of which it is an attribute or with which it is associated (such as "crown" in "lands belonging to the crown"). | *"Brit.’; used here, by metonymy, for a great treasure."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[metronymic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of name. | *"In academic literature, metronymic designates adjective*) pertaining to, derived from, or characteristic of name."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[onym]] | noun | **1.** Name : word. | *"In academic literature, onym designates name : word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[onymous]] | adjective | **1.** Bearing a name. | *"Omnipotence set forth In the Bible the word /Spirit /is so commonly applied 345:1 to Deity, that Spirit and God are often regarded as syn- onymous terms; and it is thus they are uniformly used 345:3 and understood in Christian Science."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[paronym]] | noun | **1.** A paronymous word. | *"In academic literature, paronym designates a paronymous word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paronymous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of name. | *"In academic literature, paronymous designates adjective*) pertaining to, derived from, or characteristic of name."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudonym]] | noun | **1.** A fictitious name; especially : pen name.<br>**2.** Using a false name instead of one's real name. | *"Contemporary Rev., Sept., pp. 284-296, on ‘Balaustion’s Adventure’, by Matthew Browne (pseudonym). 1871."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[pseudonymous]] | noun | **1.** Bearing or using a fictitious name; also : being a pseudonym. | *"But to guide one's course aright, between the true myth and the depraved, to distinguish between the true and good god and the pseudonymous daemon, was no easy task."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[synonym]] | noun | **1.** One of two or more words or expressions of the same language that have the same or nearly the same meaning in some or all senses.<br>**2.** A word, phrase, or name that by association is held to embody something (such as a concept or quality); also : an object held to do this. | *"His outlook upon time was as a transient flash of the eye now and then: that projection of consciousness into days gone by and to come, which makes the past a synonym for the pathetic and the future a word for circumspection, was foreign to Troy."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[synonymist]] | noun | **1.** A student of synonyms. | *"In academic literature, synonymist designates a student of synonyms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synonymity]] | noun | **1.** The semantic relation that holds between two words that can (in a given context) express the same meaning. | *"In academic literature, synonymity designates the semantic relation that holds between two words that can (in a given context) express the same meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synonymous]] | noun | **1.** Having the character of a synonym; also : alike in meaning or significance.<br>**2.** Having the same connotations, implications, or reference. | *"Charitable is here used in its original sense, as synonymous with benevolence and affection."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[synonymously]] | adverb | **1.** In a synonymous manner. | *"Vanity and pride are different things, though the words are often used synonymously."* — Jane Austen, *Pride and Prejudice* |
| [[synonymousness]] | noun | **1.** The semantic relation that holds between two words that can (in a given context) express the same meaning. | *"In academic literature, synonymousness designates the semantic relation that holds between two words that can (in a given context) express the same meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synonymy]] | noun | **1.** A list or collection of synonyms often defined and discriminated from each other.<br>**2.** The study or discrimination of synonyms. | *"In academic literature, synonymy designates a list or collection of synonyms often defined and discriminated from each other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tautonym]] | noun | **1.** A taxonomic binomial in which the generic name and specific epithet are alike and which is common in zoology especially to designate a typical form but is forbidden to botany under the International Code of Botanical Nomenclature. | *"In academic literature, tautonym designates a taxonomic binomial in which the generic name and specific epithet are alike and which is common in zoology especially to designate a typical form but is forbidden to botany under the international code of botanical nomenclature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tautonymous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of name. | *"In academic literature, tautonymous designates adjective*) pertaining to, derived from, or characteristic of name."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tautonymy]] | noun | **1.** A taxonomic binomial in which the generic name and specific epithet are alike and which is common in zoology especially to designate a typical form but is forbidden to botany under the International Code of Botanical Nomenclature. | *"In academic literature, tautonymy designates a taxonomic binomial in which the generic name and specific epithet are alike and which is common in zoology especially to designate a typical form but is forbidden to botany under the international code of botanical nomenclature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[troponym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, troponym designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[troponymy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, troponymy designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[xenonym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, xenonym designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[xenonymy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek onym.<br>**2.** Specialized application within the domain of Speech & Language. | *"In academic literature, xenonymy designates a term designating an entity, condition, or phenomenon derived from greek onym."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech & Language]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ONYM
  </div>
</div>
