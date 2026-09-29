---
status: unread
type: root_dashboard
---
# Dashboard — graph
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">γράφειν (gráphein)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to write / carve / draw / recording instrument”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The sharp stylus incising distinct marks into wax tablets, parchment, or stone stelae.</span>
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

The Greek root **graph** (γράφειν (gráphein), γραφή (graphḗ)) signifies to write / carve / draw / recording instrument. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *allograft*, *anepigraphic*, *autograft*, *autograph*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to write / carve / draw / recording instrument
> The Greek root **graph** fundamentally denotes **to write / carve / draw / recording instrument**. The sharp stylus incising distinct marks into wax tablets, parchment, or stone stelae. From ancient laws inscribed upon stone tablets in the agora to epigraphic poetry and historical chronicles, graphein anchored the preservation of civic memory and technical records.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">to write / carve / draw / recording instrument</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sharp stylus incising distinct marks into wax tablets, parchment, or stone stelae.</mark>
> - **Everyday Connection**: Think of familiar words like *allograft*, *anepigraphic*, *autograft*, *autograph*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **graph** derives from Ancient Greek <mark class="hl-stem">γράφειν (gráphein), γραφή (graphḗ)</mark>, meaning "to write / carve / draw / recording instrument".
  - Reconstructed Indo-European origin: ***gerbʰ- ("to scratch, carve, engrave")**.

- **The Big Picture Idea**:
  - The sharp stylus incising distinct marks into wax tablets, parchment, or stone stelae.
  - Whenever you see **graph** in an English word, think immediately of **to write / carve / draw / recording instrument**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">graph</mark>, think of <mark class="hl-def">to write / carve / draw / recording instrument</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `graph-` (from *γράφειν (gráphein), γραφή (graphḗ)*).
> - **Combining Stem with -o- Connective:** `grapho-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Graph
> - **1. Direct & Concrete Anchor:** Literal instantiation of to write / carve / draw / recording instrument in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on graph

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `graph-` | [[allograft]] | Primary root semantic foundation denoting to write / carve / draw / recording instrument. |
| **Connecting -o-** | `grapho-` | [[anepigraphic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `graph` | [[autograft]] | Relational or directional modification of the core root sense. |

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
| [[agrapha]] | noun | **1.** Sayings of jesus not recorded in the canonical gospels. | *"In academic literature, agrapha designates sayings of jesus not recorded in the canonical gospels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agraphia]] | noun | **1.** A loss of the ability to write or to express thoughts in writing because of a brain lesion. | *"In academic literature, agraphia designates a loss of the ability to write or to express thoughts in writing because of a brain lesion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agraphic]] | adjective | **1.** Relating to or having agraphia. | *"In academic literature, agraphic designates relating to or having agraphia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allograft]] | noun | **1.** A homograft between allogeneic individuals. | *"In academic literature, allograft designates a homograft between allogeneic individuals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anagram]] | noun | **1.** A word or phrase made by transposing the letters of another word or phrase.<br>**2.** A game in which words are formed by rearranging the letters of other words or by arranging letters taken (as from a stock of cards or blocks) at random. | *"A great eater was once boasting that he was a great wit, saying, The world knew him to be “all wit:” one standing by, that knew him very well, said, Is it possible that you are taken for a wit! if so, your anagram is wit-all. 1122."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[anepigraphic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of to write / carve / draw / recording instrument. | *"In academic literature, anepigraphic designates adjective*) pertaining to, derived from, or characteristic of to write / carve / draw / recording instrument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anorthography]] | noun | **1.** A loss of the ability to write or to express thoughts in writing because of a brain lesion. | *"In academic literature, anorthography designates a loss of the ability to write or to express thoughts in writing because of a brain lesion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antigram]] | noun | **1.** An anagram that means the opposite of the original word or phrase. | *"In academic literature, antigram designates an anagram that means the opposite of the original word or phrase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autograft]] | noun | **1.** A tissue or organ that is transplanted from one part to another of the same body. | *"In academic literature, autograft designates a tissue or organ that is transplanted from one part to another of the same body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autograph]] | noun | **1.** Something written or made with one's own hand:.<br>**2.** An original manuscript or work of art. | *"I had wondered why Jane had been poring over that old autograph manuscript receipt book in my desk for days, and as she paid these modern resurrecting compliments to the long gone cooks, tears and laughed literally deluged the table."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[autographed]] | verb | **1.** Mark with one's signature.<br>**2.** Bearing an autograph. | *"In academic literature, autographed designates mark with one's signature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autographic]] | adjective | **1.** Written in the author's own handwriting. | *"In academic literature, autographic designates written in the author's own handwriting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiogram]] | noun | **1.** The curve or tracing made by a cardiograph. | *"Such a diagram is called a "cardiogram," and it seems that each of us has a particular form of cardiogram peculiar to himself, so that a man could almost be recognised and distinguished from his fellows by the electrical action of his heart."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[cartographer]] | noun | **1.** A person who makes maps. | *"In academic literature, cartographer designates a person who makes maps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cartographic]] | adjective | **1.** Of or relating to the making of maps or charts. | *"In academic literature, cartographic designates of or relating to the making of maps or charts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cartographical]] | adjective | **1.** Of or relating to the making of maps or charts. | *"In academic literature, cartographical designates of or relating to the making of maps or charts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cartography]] | noun | **1.** The science or art of making maps. | *"In academic literature, cartography designates the science or art of making maps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatographical]] | adjective | **1.** Of or relating to chromatography. | *"In academic literature, chromatographical designates of or relating to chromatography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatographically]] | adverb | **1.** By means of a chromatographic process. | *"In academic literature, chromatographically designates by means of a chromatographic process."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatography]] | noun | **1.** A process in which a chemical mixture carried by a liquid or gas is separated into components as a result of differential distribution of the solutes as they flow around or over a stationary liquid or solid phase.<br>**2.** Chromatography in which a macromolecule (such as a protein) is isolated and purified by passing it in solution through a column treated with a substance having a ligand for which the macromolecule has an affinity that causes it to be retained on the column. | *"In academic literature, chromatography designates a process in which a chemical mixture carried by a liquid or gas is separated into components as a result of differential distribution of the solutes as they flow around or over a stationary liquid or solid phase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diagram]] | noun | **1.** A graphic design that explains rather than represents; especially : a drawing that shows arrangement and relations (as of parts).<br>**2.** A line drawing made for mathematical or scientific purposes. | *"The reader must be on his guard against misunderstanding the diagram."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[digraph]] | noun | **1.** A group of two successive letters whose phonetic value is a single sound (such as ea in bread or ng in sing) or whose value is not the sum of a value borne by each in other occurrences (such as ch in chin where the value is \t\ + \sh\).<br>**2.** A group of two successive letters. | *"In academic literature, digraph designates **1.** a group of two successive letters whose phonetic value is a single sound (such as ea in bread or ng in sing) or whose value is not the sum of a value borne by each in other occurrences (such as ch in chin where the value is \t\ + \sh\).<br>**2.** a group of two successive letters."* — Academic Lexicon |
| [[dysgraphia]] | noun | **1.** Impaired ability to learn to write. | *"In academic literature, dysgraphia designates impaired ability to learn to write."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[echocardiography]] | noun | **1.** The use of ultrasound to examine the structure and functioning of the heart for abnormalities and disease. | *"In academic literature, echocardiography designates the use of ultrasound to examine the structure and functioning of the heart for abnormalities and disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiograph]] | noun | **1.** An instrument for recording the changes of electrical potential occurring during the heartbeat used especially in diagnosing abnormalities of heart action. | *"In academic literature, electrocardiograph designates an instrument for recording the changes of electrical potential occurring during the heartbeat used especially in diagnosing abnormalities of heart action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiographic]] | adjective | **1.** Of or relating to an electrocardiograph. | *"In academic literature, electrocardiographic designates of or relating to an electrocardiograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroencephalograph]] | noun | **1.** An apparatus for detecting and recording brain waves. | *"In academic literature, electroencephalograph designates an apparatus for detecting and recording brain waves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroencephalographic]] | adjective | **1.** Of or relating to an electroencephalograph. | *"In academic literature, electroencephalographic designates of or relating to an electroencephalograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroencephalography]] | noun | **1.** An apparatus for detecting and recording brain waves. | *"In academic literature, electroencephalography designates an apparatus for detecting and recording brain waves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[engraft]] | verb | **1.** Cause to grow together parts from different plants.<br>**2.** Fix or set securely or deeply. | *"You may have a wen or cancer upon your person and not be able to cut it out, lest you bleed to death; but surely it is no way to cure it, to engraft it and spread it over your whole body."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[engram]] | noun | **1.** A hypothetical change in neural tissue postulated in order to account for persistence of memory : memory trace. | *"In academic literature, engram designates a hypothetical change in neural tissue postulated in order to account for persistence of memory : memory trace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epigram]] | noun | **1.** A concise poem dealing pointedly and often satirically with a single thought or event and often ending with an ingenious turn of thought.<br>**2.** A terse, sage, or witty and often paradoxical saying. | *"Dost thou think I care for a satire or an epigram?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[epigraph]] | noun | **1.** A quotation at the beginning of some piece of writing.<br>**2.** An engraved inscription. | *"In academic literature, epigraph designates a quotation at the beginning of some piece of writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epigraphic]] | noun | **1.** Of or relating to epigraphs or epigraphy. | *"In academic literature, epigraphic designates of or relating to epigraphs or epigraphy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epigraphy]] | noun | **1.** Epigraphs, inscriptions.<br>**2.** The study of inscriptions; especially : the deciphering of ancient inscriptions. | *"In academic literature, epigraphy designates epigraphs, inscriptions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graft]] | noun | **1.** A grafted plant. | *"I’ll graft it with you, and then I shall graft it with a medlar."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[grafting]] | noun | **1.** The act of grafting something onto something else.<br>**2.** Cause to grow together parts from different plants. | *"A high-spirited young lady and a musical Polish patriot made a likely enough stock for him to spring from, but I should never have suspected a grafting of the Jew pawnbroker."* — George Eliot, *Middlemarch* |
| [[gram]] | noun | **1.** Any of several leguminous plants (such as a chickpea) grown especially for their seed; also : their seeds.<br>**2.** A metric unit of mass equal to 1/1000 kilogram and nearly equal to the mass of one cubic centimeter of water at its maximum density. | *"In academic literature, gram designates any of several leguminous plants (such as a chickpea) grown especially for their seed; also : their seeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graph]] | noun | **1.** A diagram (such as a series of one or more points, lines, line segments, curves, or areas) that represents the variation of a variable in comparison with that of one or more other variables.<br>**2.** The collection of all points whose coordinates satisfy a given relation (such as a function). | *"In academic literature, graph designates a diagram (such as a series of one or more points, lines, line segments, curves, or areas) that represents the variation of a variable in comparison with that of one or more other variables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphein]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek graph.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, graphein designates a term designating an entity, condition, or phenomenon derived from greek graph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grapheme]] | noun | **1.** A unit (such as a letter or digraph) of a writing system.<br>**2.** The set of units of a writing system (such as letters and letter combinations) that represent a phoneme. | *"In academic literature, grapheme designates a unit (such as a letter or digraph) of a writing system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphemics]] | noun | **1.** The study and analysis of a writing system in terms of graphemes. | *"In academic literature, graphemics designates the study and analysis of a writing system in terms of graphemes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphene]] | noun | **1.** An extremely electrically conductive form of elemental carbon that is composed of a single flat sheet of carbon atoms arranged in a repeating hexagonal lattice. | *"In academic literature, graphene designates an extremely electrically conductive form of elemental carbon that is composed of a single flat sheet of carbon atoms arranged in a repeating hexagonal lattice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphic]] | noun | **1.** Of or relating to the pictorial arts; also : pictorial.<br>**2.** Of, relating to, or involving such reproductive methods as those of engraving, etching, lithography, photography, serigraphy, and woodcut. | *"A myth is never so graphic and precise in its details as when it is, so to speak, the book of the words which are spoken and acted by the performers of the sacred rite."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[graphical]] | adjective | **1.** Relating to or presented by a graph.<br>**2.** Written or drawn or engraved. | *"In academic literature, graphical designates relating to or presented by a graph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphically]] | adverb | **1.** In a diagrammatic manner.<br>**2.** With respect to graphic aspects. | *"IMPORTS INTO THE UNITED STATES. 1821-18565 Many statistics bearing upon tariff history are graphically brought together here."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[graphics]] | noun | **1.** Photographs or other visual representations in a printed publication.<br>**2.** The drawings and photographs in the layout of a book. | *"He followed with instructions that brought a series of real-time graphics across the monitor."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[graphite]] | noun | **1.** A soft black lustrous form of carbon that conducts electricity and is used in lead pencils and electrolytic anodes, as a lubricant, and as a moderator in nuclear reactors.<br>**2.** A composite material in which carbon fibers are the reinforcing material. | *"This vacuum economised the graphite points between which the luminous arc was developed—an important point of economy for Captain Nemo, who could not easily have replaced them; and under these conditions their waste was imperceptible."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[graphologist]] | noun | **1.** A specialist in inferring character from handwriting. | *"In academic literature, graphologist designates a specialist in inferring character from handwriting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphology]] | noun | **1.** The study of handwriting especially for the purpose of character analysis. | *"In academic literature, graphology designates the study of handwriting especially for the purpose of character analysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphomania]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek graph.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, graphomania designates a term designating an entity, condition, or phenomenon derived from greek graph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphospasm]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek graph.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, graphospasm designates a term designating an entity, condition, or phenomenon derived from greek graph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterograft]] | noun | **1.** Tissue from an animal of one species used as a temporary graft (as in cases of severe burns) on an individual of another species. | *"In academic literature, heterograft designates tissue from an animal of one species used as a temporary graft (as in cases of severe burns) on an individual of another species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterograph]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek graph.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, heterograph designates a term designating an entity, condition, or phenomenon derived from greek graph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hexagraph]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek graph.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, hexagraph designates a term designating an entity, condition, or phenomenon derived from greek graph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hologram]] | noun | **1.** A three-dimensional image reproduced from a pattern of interference produced by a split coherent beam of radiation (such as a laser); also : the pattern of interference itself. | *"In academic literature, hologram designates a three-dimensional image reproduced from a pattern of interference produced by a split coherent beam of radiation (such as a laser); also : the pattern of interference itself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holograph]] | noun | **1.** Handwritten book or document.<br>**2.** The intermediate photograph (or photographic record) that contains information for reproducing a three-dimensional image by holography. | *"And so, none saying him nay, he rode back to Longtown with the holograph in his breast pocket, jesting with two farmers riding that way as he went."* — S. R. Crockett, *Deep Moat Grange* |
| [[holographic]] | adjective | **1.** Of or relating to holography or holograms.<br>**2.** Written entirely in one's own hand. | *"In academic literature, holographic designates of or relating to holography or holograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holographical]] | adjective | **1.** Written entirely in one's own hand. | *"In academic literature, holographical designates written entirely in one's own hand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holography]] | noun | **1.** The art or process of making or using a hologram. | *"In academic literature, holography designates the art or process of making or using a hologram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homograft]] | noun | **1.** Tissue or organ transplanted from a donor of the same species but different genetic makeup; recipient's immune system must be suppressed to prevent rejection of the graft. | *"In academic literature, homograft designates tissue or organ transplanted from a donor of the same species but different genetic makeup; recipient's immune system must be suppressed to prevent rejection of the graft."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homograph]] | noun | **1.** One of two or more words spelled alike but different in meaning or derivation or pronunciation (such as the bow of a ship, a bow and arrow). | *"In academic literature, homograph designates one of two or more words spelled alike but different in meaning or derivation or pronunciation (such as the bow of a ship, a bow and arrow)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isograft]] | noun | **1.** A homograft between genetically identical or nearly identical individuals. | *"In academic literature, isograft designates a homograft between genetically identical or nearly identical individuals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isogram]] | noun | **1.** A line drawn on a map connecting points having the same numerical value of some variable. | *"In academic literature, isogram designates a line drawn on a map connecting points having the same numerical value of some variable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logographic]] | noun | **1.** Of, relating to, or marked by the use of logographs : consisting of logographs. | *"In academic literature, logographic designates of, relating to, or marked by the use of logographs : consisting of logographs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mammography]] | noun | **1.** X-ray examination of the breasts (as for early detection of cancer). | *"In academic literature, mammography designates x-ray examination of the breasts (as for early detection of cancer)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microgram]] | noun | **1.** One millionth (1/1,000,000) gram. | *"In academic literature, microgram designates one millionth (1/1,000,000) gram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrograph]] | noun | **1.** A graphic reproduction of the image of an object formed by a microscope.<br>**2.** A micrograph made with an electron microscope. | *"Of GREAT VALUE to those engaged in the iron industry.”—_Mining Journal._ Frontispiece in Colours, and Beautiful Series of Photo-micrographs. 12s. 6d. net. =ALLOYS and their Industrial Applications.= BY EDWARD F."* — Donald M. Levy, *Modern Copper Smelting* |
| [[monogram]] | noun | **1.** A sign of identity usually formed of the combined initials of a name.<br>**2.** To mark with a monogram. | *"It was of gold, and bore his monogram in diamonds."* — Anthony Pryde, *Nightfall* |
| [[monograph]] | noun | **1.** A learned treatise on a small area of learning; also : a written account of a single thing.<br>**2.** To write a monograph on. | *"Knuffmann in a learned monograph, _Balder, Mythus und Sage_ (Strasburg, 1902). [257] Gudbrand Vigfusson and F."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[orthographic]] | noun | **1.** Of, relating to, being, or prepared by orthographic projection.<br>**2.** Of or relating to orthography. | *"In academic literature, orthographic designates of, relating to, being, or prepared by orthographic projection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthography]] | noun | **1.** The art of writing words with the proper letters according to standard usage.<br>**2.** The representation of the sounds of a language by written or printed symbols. | *"I abhor such fanatical phantasimes, such insociable and point-devise companions, such rackers of orthography, as to speak “dout” _sine_ “b”, when he should say “doubt”, “det” when he should pronounce “debt”—_d, e, b, t_, not _d, e, t_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paleographer]] | noun | **1.** An archeologist skilled in paleography. | *"In academic literature, paleographer designates an archeologist skilled in paleography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleographist]] | noun | **1.** An archeologist skilled in paleography. | *"In academic literature, paleographist designates an archeologist skilled in paleography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleography]] | noun | **1.** The study of ancient forms of writing (and the deciphering of them). | *"In academic literature, paleography designates the study of ancient forms of writing (and the deciphering of them)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paragraph]] | noun | **1.** A subdivision of a written composition that consists of one or more sentences, deals with one point or gives the words of one speaker, and begins on a new usually indented line.<br>**2.** A short composition or note that is complete in one paragraph. | *"Come and teach our two-legged law-paragraph here to get some sense."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[paragrapher]] | noun | **1.** A writer of paragraphs (as for publication on the editorial page of a newspaper). | *"In academic literature, paragrapher designates a writer of paragraphs (as for publication on the editorial page of a newspaper)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photograph]] | noun | **1.** A picture or likeness obtained by photography.<br>**2.** To take a photograph of. | *"It had seemed of a sudden most familiar, in much the same way that my father’s barn would have been in a photograph."* — Jack London, *The Jacket (The Star-Rover)* |
| [[photographer]] | noun | **1.** Someone who takes photographs professionally. | *"P---- who is a good amateur photographer, photographed him in company with his little daughter in the act of handing him a banana."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[photographic]] | noun | **1.** Relating to, obtained by, or used in photography.<br>**2.** Representing nature and human beings with the exactness of a photograph. | *"He had an excellent memory, photographic and phonographic, a gift that wise men covet for themselves but deprecate in their friends."* — Anthony Pryde, *Nightfall* |
| [[photography]] | noun | **1.** The art or process of producing images by the action of radiant energy and especially light on a sensitive surface (such as film or an optical sensor).<br>**2.** A process in which an image is obtained by application of a high-frequency electric field to an object so that it radiates a characteristic pattern of luminescence that is recorded on photographic film. | *"The several uses of gold are constantly competing for it: its uses for rings, pens, ornaments, championship cups, photography, dentistry, delicate instruments, and as a circulating medium."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[photomicrograph]] | noun | **1.** A photograph of a microscope image. | *"In academic literature, photomicrograph designates a photograph of a microscope image."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polygraph]] | noun | **1.** An instrument for recording variations of several different pulsations (as of physiological variables) simultaneously. | *"In academic literature, polygraph designates an instrument for recording variations of several different pulsations (as of physiological variables) simultaneously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudepigraphy]] | noun | **1.** The ascription of false names of authors to works. | *"In academic literature, pseudepigraphy designates the ascription of false names of authors to works."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiograph]] | noun | **1.** A picture produced on a sensitive surface by a form of radiation other than visible light; specifically : an X-ray or gamma ray photograph.<br>**2.** To make a radiograph of. | *"In academic literature, radiograph designates a picture produced on a sensitive surface by a form of radiation other than visible light; specifically : an x-ray or gamma ray photograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiographer]] | noun | **1.** A person who makes radiographs. | *"In academic literature, radiographer designates a person who makes radiographs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiographic]] | adjective | **1.** Relating to or produced by radiography. | *"In academic literature, radiographic designates relating to or produced by radiography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiography]] | noun | **1.** The art, act, or process of making radiographs. | *"In academic literature, radiography designates the art, act, or process of making radiographs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syngraft]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek graph.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, syngraft designates a term designating an entity, condition, or phenomenon derived from greek graph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telegram]] | noun | **1.** A telegraphic dispatch. | *"At the moment of his departure a telegram was handed to him—a few words from his mother, stating that they were glad to know his address, and informing him that his brother Cuthbert had proposed to and been accepted by Mercy Chant."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[telegraph]] | noun | **1.** An apparatus for communication at a distance by coded signals; especially : an apparatus, system, or process for communication at a distance by electric transmission over wire. | *"Green’s appears, on inquiry, to be at the present time aboard a vessel bound for China, three months out, but considered accessible by telegraph on application to the Lords of the Admiralty."* — Charles Dickens, *Bleak House* |
| [[telegrapher]] | noun | **1.** Someone who transmits messages by telegraph. | *"In academic literature, telegrapher designates someone who transmits messages by telegraph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telegraphese]] | noun | **1.** Language characterized by terseness and ellipsis as in telegrams. | *"In academic literature, telegraphese designates language characterized by terseness and ellipsis as in telegrams."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telegraphic]] | adjective | **1.** Of or relating to or transmitted by telegraph.<br>**2.** Having the style of a telegram with many short words left out. | *"Intelligence having been sent to Männedorf, united prayer was made in his behalf; and very soon afterwards a telegraphic message announced that he was recovering."* — Classic Author, *The wonders of prayer* |
| [[telegraphically]] | adverb | **1.** In a short and concise manner. | *"National Assembly should address him similar message both in writing and telegraphically."* — Effendi Shoghi, *Citadel of Faith* |
| [[telegraphist]] | noun | **1.** Someone who transmits messages by telegraph. | *"In academic literature, telegraphist designates someone who transmits messages by telegraph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telegraphy]] | noun | **1.** The use or operation of a telegraph apparatus or system for communication.<br>**2.** Telegraphy carried on by radio waves and without connecting wires —called also wireless telegraph. | *"Mental telegraphy The clay cannot reply to the potter."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[telephotograph]] | noun | **1.** A photograph transmitted and reproduced over a distance.<br>**2.** A photograph made with a telephoto lens. | *"In academic literature, telephotograph designates a photograph transmitted and reproduced over a distance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telephotography]] | noun | **1.** Transmission and reproduction of photographs and charts and pictures over a distance.<br>**2.** Photography using a telephoto lens. | *"In academic literature, telephotography designates transmission and reproduction of photographs and charts and pictures over a distance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetragraph]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek graph.<br>**2.** Specialized application within the domain of Writing & Script. | *"In academic literature, tetragraph designates a term designating an entity, condition, or phenomenon derived from greek graph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trigram]] | noun | **1.** trigraph.<br>**2.** any of the eight possible combinations of three whole or broken lines used especially in Chinese divination. | *"Classical and authoritative lexicons catalog trigram as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trigraph]] | noun | **1.** Three letters spelling a single consonant, vowel, or diphthong.<br>**2.** A cluster of three successive letters. | *"In academic literature, trigraph designates three letters spelling a single consonant, vowel, or diphthong."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · GRAPH
  </div>
</div>
