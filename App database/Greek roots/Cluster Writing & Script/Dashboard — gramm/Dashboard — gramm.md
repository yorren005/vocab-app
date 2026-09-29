---
status: unread
type: root_dashboard
---
# Dashboard — gramm
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">γράμμα (grámma) (record</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram'.</span>
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

The Greek root **gramm** (γράμμα (grámma) (record, picture)) signifies electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *anagram*, *anagrammatic*, *angiogram*, *audiogram*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram
> The Greek root **gramm** fundamentally denotes **electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram**. The physical sensory observation and cognitive anchor underlying 'electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram'. In classical Greek antiquity, the root denoted 'electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram'.</mark>
> - **Everyday Connection**: Think of familiar words like *anagram*, *anagrammatic*, *angiogram*, *audiogram*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gramm** derives from Ancient Greek <mark class="hl-stem">γράμμα (grámma) (record, picture)</mark>, meaning "electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with gramm**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram'.
  - Whenever you see **gramm** in an English word, think immediately of **electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gramm</mark>, think of <mark class="hl-def">electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `gramm-` (from *γράμμα (grámma) (record, picture)*).
> - **Combining Stem with -o- Connective:** `grammo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Gramm
> - **1. Direct & Concrete Anchor:** Literal instantiation of electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on gramm

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `gramm-` | [[anagram]] | Primary root semantic foundation denoting electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram. |
| **Connecting -o-** | `grammo-` | [[anagrammatic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `gramm` | [[angiogram]] | Relational or directional modification of the core root sense. |

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
| [[anagram]] | noun | **1.** A word or phrase made by transposing the letters of another word or phrase.<br>**2.** A game in which words are formed by rearranging the letters of other words or by arranging letters taken (as from a stock of cards or blocks) at random. | *"A great eater was once boasting that he was a great wit, saying, The world knew him to be “all wit:” one standing by, that knew him very well, said, Is it possible that you are taken for a wit! if so, your anagram is wit-all. 1122."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[anagrammatic]] | noun | **1.** A word or phrase made by transposing the letters of another word or phrase.<br>**2.** A game in which words are formed by rearranging the letters of other words or by arranging letters taken (as from a stock of cards or blocks) at random. | *"In academic literature, anagrammatic designates a word or phrase made by transposing the letters of another word or phrase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anagrammatical]] | adjective | **1.** Related to anagrams or containing or making an anagram. | *"In academic literature, anagrammatical designates related to anagrams or containing or making an anagram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anagrammatise]] | verb | **1.** Read letters out of order to discover a hidden meaning. | *"In academic literature, anagrammatise designates read letters out of order to discover a hidden meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anagrammatize]] | verb | **1.** Read letters out of order to discover a hidden meaning. | *"In academic literature, anagrammatize designates read letters out of order to discover a hidden meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[angiogram]] | noun | **1.** A radiograph made by angiography.<br>**2.** Angiography. | *"In academic literature, angiogram designates a radiograph made by angiography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiogram]] | noun | **1.** A graphic representation of the relation of vibration frequency and the minimum sound intensity for hearing. | *"In academic literature, audiogram designates a graphic representation of the relation of vibration frequency and the minimum sound intensity for hearing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diagram]] | noun | **1.** A graphic design that explains rather than represents; especially : a drawing that shows arrangement and relations (as of parts).<br>**2.** A line drawing made for mathematical or scientific purposes. | *"The reader must be on his guard against misunderstanding the diagram."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[diagrammatic]] | noun | **1.** A graphic design that explains rather than represents; especially : a drawing that shows arrangement and relations (as of parts).<br>**2.** A line drawing made for mathematical or scientific purposes. | *"In academic literature, diagrammatic designates a graphic design that explains rather than represents; especially : a drawing that shows arrangement and relations (as of parts)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diagrammatical]] | adjective | **1.** Shown or represented by diagrams. | *"In academic literature, diagrammatical designates shown or represented by diagrams."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diagrammatically]] | adverb | **1.** In a diagrammatic manner. | *"The principle is illustrated diagrammatically in Fig. 5."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[diagramming]] | noun | **1.** Providing a chart or outline of a system.<br>**2.** Make a schematic or technical drawing of that shows interactions among variables or how something is constructed. | *"In academic literature, diagramming designates providing a chart or outline of a system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiogram]] | noun | **1.** The tracing made by an electrocardiograph; also : the procedure for producing an electrocardiogram. | *"In academic literature, electrocardiogram designates the tracing made by an electrocardiograph; also : the procedure for producing an electrocardiogram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[engram]] | noun | **1.** A hypothetical change in neural tissue postulated in order to account for persistence of memory : memory trace. | *"In academic literature, engram designates a hypothetical change in neural tissue postulated in order to account for persistence of memory : memory trace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epigram]] | noun | **1.** A concise poem dealing pointedly and often satirically with a single thought or event and often ending with an ingenious turn of thought.<br>**2.** A terse, sage, or witty and often paradoxical saying. | *"Dost thou think I care for a satire or an epigram?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[epigrammatic]] | noun | **1.** Of, relating to, or resembling an epigram.<br>**2.** Marked by or given to the use of epigrams. | *"I was humorous concerning roop, epigrammatic on the subject of the hired retainer and Edwin."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[gramm]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gramm.<br>**2.** Specialized application within the domain of Writing & Script. | *"In a thousand grammes are found 96½ per cent. of water, and about 2-2/3 per cent. of chloride of sodium; then, in a smaller quantity, chlorides of magnesium and of potassium, bromide of magnesium, sulphate of magnesia, sulphate and carbonate of lime."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[gramma]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gramm.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, gramma designates a term designating an entity, condition, or phenomenon derived from greek gramm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grammar]] | noun | **1.** The study of the classes of words, their inflections, and their functions and relations in the sentence.<br>**2.** A study of what is to be preferred and what avoided in inflection and syntax. | *"I read it in the grammar long ago."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[grammarian]] | noun | **1.** A linguist who specializes in the study of grammar and syntax. | *"The devoted disciples of a dead grammarian are bearing his body up a mountain-side for burial on its lofty summit, “where meteors shoot, clouds form, lightnings are loosened, stars come and go!"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[grammatic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram. | *"In academic literature, grammatic designates adjective*) pertaining to, derived from, or characteristic of electrocardiogram (ecg), electroencephalogram (eeg), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grammatical]] | adjective | **1.** Of or pertaining to grammar.<br>**2.** Conforming to the rules of grammar or usage accepted by native speakers. | *"No, father; I cannot underwrite Article Four (leave alone the rest), taking it ‘in the literal and grammatical sense’ as required by the Declaration; and, therefore, I can’t be a parson in the present state of affairs,” said Angel."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[grammatically]] | adverb | **1.** In a grammatical manner. | *"In academic literature, grammatically designates in a grammatical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grammaticist]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gramm.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, grammaticist designates a term designating an entity, condition, or phenomenon derived from greek gramm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grammatolatry]] | noun | **1.** The worship of words. | *"In academic literature, grammatolatry designates the worship of words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grammatophyllum]] | noun | **1.** Small genus of large epiphytic or terrestrial orchids of southeastern asia to polynesia; the giants of the orchidaceae having long narrow leaves and drooping flower clusters often 6 feet long. | *"In academic literature, grammatophyllum designates small genus of large epiphytic or terrestrial orchids of southeastern asia to polynesia; the giants of the orchidaceae having long narrow leaves and drooping flower clusters often 6 feet long."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gramme]] | noun | **1.** A metric unit of weight equal to one thousandth of a kilogram. | *"In a thousand grammes are found 96½ per cent. of water, and about 2-2/3 per cent. of chloride of sodium; then, in a smaller quantity, chlorides of magnesium and of potassium, bromide of magnesium, sulphate of magnesia, sulphate and carbonate of lime."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[hemigrammus]] | noun | **1.** Tetras. | *"Classical and authoritative lexicons catalog hemigrammus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hologram]] | noun | **1.** A three-dimensional image reproduced from a pattern of interference produced by a split coherent beam of radiation (such as a laser); also : the pattern of interference itself. | *"In academic literature, hologram designates a three-dimensional image reproduced from a pattern of interference produced by a split coherent beam of radiation (such as a laser); also : the pattern of interference itself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lipogram]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gramm.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, lipogram designates a term designating an entity, condition, or phenomenon derived from greek gramm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammogram]] | noun | **1.** A photograph of the breasts made by X-rays; also : the procedure for producing a mammogram. | *"In academic literature, mammogram designates a photograph of the breasts made by x-rays; also : the procedure for producing a mammogram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microgramma]] | noun | **1.** Epiphytic ferns of tropical america and africa. | *"In academic literature, microgramma designates epiphytic ferns of tropical america and africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microgramma-piloselloides]] | noun | **1.** Epiphytic ferns with long rhizomes; tropical america. | *"In academic literature, microgramma-piloselloides designates epiphytic ferns with long rhizomes; tropical america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogram]] | noun | **1.** A sign of identity usually formed of the combined initials of a name.<br>**2.** To mark with a monogram. | *"It was of gold, and bore his monogram in diamonds."* — Anthony Pryde, *Nightfall* |
| [[pangrammatic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of electrocardiogram (ECG), electroencephalogram (EEG), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram. | *"In academic literature, pangrammatic designates adjective*) pertaining to, derived from, or characteristic of electrocardiogram (ecg), electroencephalogram (eeg), mammogram, angiogram, arthrogram, myelogram, audiogram, echocardiogram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[program]] | noun | **1.** A public notice.<br>**2.** A brief usually printed outline of the order to be followed, of the features to be presented, and the persons participating (as in a public performance). | *"President Wilson and the newly elected Congress with its Democratic majority made banking reform one of the main objects on the program for the special session beginning March 5, 1913."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[programing]] | noun | **1.** Setting an order and time for planned events.<br>**2.** Creating a sequence of instructions to enable the computer to do something. | *"In academic literature, programing designates setting an order and time for planned events."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[programmatic]] | noun | **1.** Relating to program music.<br>**2.** Of, relating to, resembling, or having a program. | *"In academic literature, programmatic designates relating to program music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[programmer]] | noun | **1.** A person who designs and writes and tests computer programs. | *"In academic literature, programmer designates a person who designs and writes and tests computer programs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[programming]] | noun | **1.** Setting an order and time for planned events.<br>**2.** Creating a sequence of instructions to enable the computer to do something. | *"Expendable is bad enough; you're programming us into suicide." "Not quite, Brad."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[telegramme]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gramm.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, telegramme designates a term designating an entity, condition, or phenomenon derived from greek gramm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetragram]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gramm.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, tetragram designates a term designating an entity, condition, or phenomenon derived from greek gramm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetragrammaton]] | noun | **1.** The four Hebrew letters usually transliterated YHWH or JHVH that form a biblical proper name of God. | *"In academic literature, tetragrammaton designates the four hebrew letters usually transliterated yhwh or jhvh that form a biblical proper name of god."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trigram]] | noun | **1.** trigraph.<br>**2.** any of the eight possible combinations of three whole or broken lines used especially in Chinese divination. | *"Classical and authoritative lexicons catalog trigram as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ungrammatical]] | adjective | **1.** Not grammatical; not conforming to the rules of grammar or accepted usage. | *"Out with it!” he shouted, and in one ungrammatical sentence, as long as the ribbons that conjurers pull from their mouths, she told of the capture of Wendy and the boys."* — J. M. Barrie, *Peter Pan* |
| [[ungrammatically]] | adverb | **1.** In an ungrammatical manner. | *"In academic literature, ungrammatically designates in an ungrammatical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Writing & Script]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GRAMM
  </div>
</div>
