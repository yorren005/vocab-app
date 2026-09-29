---
status: unread
type: root_dashboard
---
# Dashboard — path
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">πάθος (páthos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“feeling / emotion / suffering / disease”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The inward surge of acute psychological suffering or the bodily alteration wrought by disease.</span>
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

The Greek root **path** (πάθος (páthos), πάσχειν (páskhein)) signifies feeling / emotion / suffering / disease. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *allelopathy*, *allopath*, *allopathy*, *antipathy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: feeling / emotion / suffering / disease
> The Greek root **path** fundamentally denotes **feeling / emotion / suffering / disease**. The inward surge of acute psychological suffering or the bodily alteration wrought by disease. Aristotle's Poetics posited that tragedy induces catharsis through pity and fear, purging the soul of excess pathos, while medical writers used it to denote morbid illness.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">feeling / emotion / suffering / disease</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The inward surge of acute psychological suffering or the bodily alteration wrought by disease.</mark>
> - **Everyday Connection**: Think of familiar words like *allelopathy*, *allopath*, *allopathy*, *antipathy*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **path** derives from Ancient Greek <mark class="hl-stem">πάθος (páthos), πάσχειν (páskhein)</mark>, meaning "feeling / emotion / suffering / disease".
  - Reconstructed Indo-European origin: ***kʷentʰ- ("to suffer, endure, experience")**.

- **The Big Picture Idea**:
  - The inward surge of acute psychological suffering or the bodily alteration wrought by disease.
  - Whenever you see **path** in an English word, think immediately of **feeling / emotion / suffering / disease**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">path</mark>, think of <mark class="hl-def">feeling / emotion / suffering / disease</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `path-` (from *πάθος (páthos), πάσχειν (páskhein)*).
> - **Combining Stem with -o- Connective:** `patho-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Path
> - **1. Direct & Concrete Anchor:** Literal instantiation of feeling / emotion / suffering / disease in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on path

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `path-` | [[allelopathy]] | Primary root semantic foundation denoting feeling / emotion / suffering / disease. |
| **Connecting -o-** | `patho-` | [[allopath]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `path` | [[allopathy]] | Relational or directional modification of the core root sense. |

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
| [[allelopathy]] | noun | **1.** The suppression of growth of one plant species by another due to the release of toxic substances. | *"In academic literature, allelopathy designates the suppression of growth of one plant species by another due to the release of toxic substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allopath]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek path.<br>**2.** Specialized application within the domain of Feeling & Sensation. | *"In academic literature, allopath designates a term designating an entity, condition, or phenomenon derived from greek path."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allopathic]] | adjective | **1.** Of or relating to the practice of allopathy. | *"In academic literature, allopathic designates of or relating to the practice of allopathy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allopathy]] | noun | **1.** A system of medical practice that emphasizes diagnosing and treating disease and the use of conventional, evidence-based therapeutic measures (such as drugs or surgery) : allopathic medicine. | *"Homoeopathy, a step in advance of allopathy, is doing this."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[antipathetic]] | adjective | **1.** (usually followed by `to') strongly opposed.<br>**2.** Characterized by antagonism or antipathy. | *"Judaism antipathetic Judaism was the antithesis of Christianity, because Judaism engendered the limited form of a national or 133:21 tribal religion."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[antipathetical]] | adjective | **1.** (usually followed by `to') strongly opposed.<br>**2.** Characterized by antagonism or antipathy. | *"In academic literature, antipathetical designates (usually followed by `to') strongly opposed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antipathy]] | noun | **1.** A strong feeling of dislike.<br>**2.** Something disliked : an object of aversion. | *"No contraries hold more antipathy Than I and such a knave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[apathetic]] | noun | **1.** Affected by, characterized by, or displaying apathy : having or showing little or no interest, concern, or emotion. | *"While they uncovered the sheaves he stood apathetic beside his portable repository of force, round whose hot blackness the morning air quivered."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[apathetically]] | adverb | **1.** In an apathetic manner. | *"He waited patiently, apathetically, till the violence of her grief had worn itself out, and her rush of weeping had lessened to a catching gasp at intervals."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[apathy]] | noun | **1.** Lack of feeling or emotion : impassiveness.<br>**2.** Lack of interest or concern : indifference. | *"A phrase like that of Clement of Alexandria, "deifying into apathy we become monadic," is seas away from anything we find in the speech of Jesus."* — T. R. Glover, *The Jesus of History* |
| [[cardiomyopathy]] | noun | **1.** Any of several structural or functional diseases of heart muscle marked especially by hypertrophy and obstructive damage to the heart. | *"In academic literature, cardiomyopathy designates any of several structural or functional diseases of heart muscle marked especially by hypertrophy and obstructive damage to the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathetic]] | adjective | **1.** Showing empathy or ready comprehension of others' states. | *"In academic literature, empathetic designates showing empathy or ready comprehension of others' states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathetically]] | adverb | **1.** In a sympathetic manner. | *"In academic literature, empathetically designates in a sympathetic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathic]] | adjective | **1.** Showing empathy or ready comprehension of others' states. | *"Whatever the past might have been, his advanced years called for him to be nonjudgmental, empathic, and healing."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[empathise]] | verb | **1.** Be understanding of. | *"In academic literature, empathise designates be understanding of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathize]] | verb | **1.** Be understanding of. | *"In academic literature, empathize designates be understanding of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathy]] | noun | **1.** The action of understanding, being aware of, being sensitive to, and vicariously experiencing the feelings, thoughts, and experience of another; also : the capacity for this.<br>**2.** The act of imagining one's ideas, feelings, or attitudes as fully inhabiting something observed (such as a work of art or natural occurrence) : the imaginative projection of a subjective state into an object so that the object appears to be infused with it. | *"In academic literature, empathy designates the action of understanding, being aware of, being sensitive to, and vicariously experiencing the feelings, thoughts, and experience of another; also : the capacity for this."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[etiopathogenesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek path.<br>**2.** Specialized application within the domain of Feeling & Sensation. | *"In academic literature, etiopathogenesis designates a term designating an entity, condition, or phenomenon derived from greek path."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homeopathic]] | noun | **1.** Of or relating to homeopathy or homeopathic medicine.<br>**2.** Of a diluted or insipid nature. | *"Homeopathic Magic of a Flesh Diet THE PRACTICE of killing a god has now been traced amongst peoples who have reached the agricultural stage of society."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[homeopathy]] | noun | **1.** A system of alternative medicine that treats a disease especially by the administration of minute doses of a remedy that would in larger amounts produce symptoms in healthy persons similar to those of the disease : homeopathic medicine. | *"In academic literature, homeopathy designates a system of alternative medicine that treats a disease especially by the administration of minute doses of a remedy that would in larger amounts produce symptoms in healthy persons similar to those of the disease : homeopathic medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydropathy]] | noun | **1.** A method of treating disease by copious and frequent use of water both externally and internally. | *"Nature of drugs Vegetarianism, homoeopathy, and hydropathy have diminished drugging; but if drugs are an antidote to 155:30 disease, why lessen the antidote?"* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[idiopathic]] | noun | **1.** Arising spontaneously or from an obscure or unknown cause : primary.<br>**2.** Peculiar to the individual. | *"In academic literature, idiopathic designates arising spontaneously or from an obscure or unknown cause : primary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mononeuropathy]] | noun | **1.** Any neuropathy of a single nerve trunk. | *"In academic literature, mononeuropathy designates any neuropathy of a single nerve trunk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[myopathic]] | adjective | **1.** Of or relating to any disease of the muscles that is not caused by nerve dysfunction. | *"In academic literature, myopathic designates of or relating to any disease of the muscles that is not caused by nerve dysfunction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[myopathy]] | noun | **1.** A disorder of muscle tissue or muscles. | *"In academic literature, myopathy designates a disorder of muscle tissue or muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuropathy]] | noun | **1.** Damage, disease, or dysfunction of one or more nerves especially of the peripheral nervous system that is typically marked by burning or shooting pain, numbness, tingling, or muscle weakness or atrophy, is often degenerative, and is usually caused by injury, infection, disease, drugs, toxins, or vitamin deficiency.<br>**2.** A condition (such as Guillain-Barré syndrome) marked by neuropathy. | *"In academic literature, neuropathy designates damage, disease, or dysfunction of one or more nerves especially of the peripheral nervous system that is typically marked by burning or shooting pain, numbness, tingling, or muscle weakness or atrophy, is often degenerative, and is usually caused by injury, infection, disease, drugs, toxins, or vitamin deficiency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleopathology]] | noun | **1.** The study of disease of former times (as inferred from fossil evidence). | *"In academic literature, paleopathology designates the study of disease of former times (as inferred from fossil evidence)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasympathetic]] | noun | **1.** Originates in the brain stem and lower part of the spinal cord; opposes physiological effects of the sympathetic nervous system: stimulates digestive secretions; slows the heart; constricts the pupils; dilates blood vessels.<br>**2.** Of or relating to the parasympathetic nervous system. | *"In academic literature, parasympathetic designates originates in the brain stem and lower part of the spinal cord; opposes physiological effects of the sympathetic nervous system: stimulates digestive secretions; slows the heart; constricts the pupils; dilates blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasympathomimetic]] | adjective | **1.** Having an effect similar to that resulting from stimulation of the parasympathetic nervous system. | *"In academic literature, parasympathomimetic designates having an effect similar to that resulting from stimulation of the parasympathetic nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[path]] | noun | **1.** A trodden way.<br>**2.** A track specially constructed for a particular use. | *"Here is a path to’t; ’tis some savage hold."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pathan]] | noun | **1.** A member of the mountain people living in the eastern regions of afghanistan.<br>**2.** An ethnic minority speaking pashto and living in northwestern pakistan and southeastern afghanistan. | *"In academic literature, pathan designates a member of the mountain people living in the eastern regions of afghanistan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathetic]] | noun | **1.** Having a capacity to move one to either compassionate or contemptuous pity.<br>**2.** Marked by sorrow or melancholy : sad. | *"Skimpole was left alone all this time and entertained himself by playing snatches of pathetic airs and sometimes singing to them (as we heard at a distance) with great expression and feeling."* — Charles Dickens, *Bleak House* |
| [[pathetically]] | adverb | **1.** In a manner arousing sympathy and compassion.<br>**2.** Arousing scornful pity. | *"Biddy,” said I, when I gave her my hand at parting, “I am not angry, but I am hurt.” “No, don’t be hurt,” she pleaded quite pathetically; “let only me be hurt, if I have been ungenerous.” Once more, the mists were rising as I walked away."* — Charles Dickens, *Great Expectations* |
| [[pathless]] | adjective | **1.** Lacking pathways. | *"But wide as pathless was the space That lay our lives between, And dangerous as the foamy race Of ocean-surges green."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[pathoclisis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek path.<br>**2.** Specialized application within the domain of Feeling & Sensation. | *"In academic literature, pathoclisis designates a term designating an entity, condition, or phenomenon derived from greek path."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathogen]] | noun | **1.** A specific causative agent (such as a bacterium or virus) of disease. | *"In academic literature, pathogen designates a specific causative agent (such as a bacterium or virus) of disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathogenesis]] | noun | **1.** The origination and development of a disease. | *"In academic literature, pathogenesis designates the origination and development of a disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathogenic]] | noun | **1.** Pathogenetic.<br>**2.** Causing or capable of causing disease. | *"In academic literature, pathogenic designates pathogenetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathogenically]] | adverb | **1.** In a pathogenic manner. | *"In academic literature, pathogenically designates in a pathogenic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathologic]] | adjective | **1.** Caused by or altered by or manifesting disease or pathology.<br>**2.** Of or relating to the practice of pathology. | *"In academic literature, pathologic designates caused by or altered by or manifesting disease or pathology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathological]] | noun | **1.** Of or relating to pathology.<br>**2.** Altered or caused by disease; also : indicative of disease. | *"Many industries and branches of industry in America are thus parasitical A condition essentially pathological has come to be looked upon as normal."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[pathologically]] | adverb | **1.** With respect to pathology. | *"In academic literature, pathologically designates with respect to pathology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathologist]] | noun | **1.** A specialist in pathology; specifically : a physician who interprets and diagnoses the changes caused by disease in tissues and body fluids. | *"In academic literature, pathologist designates a specialist in pathology; specifically : a physician who interprets and diagnoses the changes caused by disease in tissues and body fluids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathology]] | noun | **1.** The study of the essential nature of diseases and especially of the structural and functional changes produced by them.<br>**2.** Something abnormal:. | *"A model clergyman, like a model doctor, ought to think his own profession the finest in the world, and take all knowledge as mere nourishment to his moral pathology and therapeutics."* — George Eliot, *Middlemarch* |
| [[pathos]] | noun | **1.** An element in experience or in artistic representation evoking pity or compassion.<br>**2.** An emotion of sympathetic pity. | *"I shall do one thing in this life—one thing certain—that is, love you, and long for you, and _keep wanting you_ till I die.” His voice had a genuine pathos now, and his large brown hands perceptibly trembled."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[psychopath]] | noun | **1.** A mentally unstable person; especially : a person having an egocentric and antisocial personality marked by a lack of remorse for one's actions, an absence of empathy for others, and often criminal tendencies. | *"In academic literature, psychopath designates a mentally unstable person; especially : a person having an egocentric and antisocial personality marked by a lack of remorse for one's actions, an absence of empathy for others, and often criminal tendencies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopathic]] | noun | **1.** Of, relating to, or characterized by psychopathy.<br>**2.** Psychopath. | *"There is nothing in the least "psychopathic" about him, nothing abnormal--no mystical vision of God, no mystical absorption in God, no mystical union with God, no abstraction, nothing that is the mark of the professed mystic."* — T. R. Glover, *The Jesus of History* |
| [[psychopathy]] | noun | **1.** Mental disorder especially when marked by egocentric and antisocial activity, a lack of remorse for one's actions, an absence of empathy for others, and often criminal tendencies. | *"In academic literature, psychopathy designates mental disorder especially when marked by egocentric and antisocial activity, a lack of remorse for one's actions, an absence of empathy for others, and often criminal tendencies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retinopathy]] | noun | **1.** Any of various noninflammatory disorders of the retina including some that cause blindness. | *"In academic literature, retinopathy designates any of various noninflammatory disorders of the retina including some that cause blindness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociopath]] | noun | **1.** A sociopathic individual : psychopath. | *"In academic literature, sociopath designates a sociopathic individual : psychopath."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sociopathic]] | adjective | **1.** Of or relating to a sociopathic personality disorder. | *"In academic literature, sociopathic designates of or relating to a sociopathic personality disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sympathectomy]] | noun | **1.** Surgical interruption of sympathetic nerve pathways. | *"In academic literature, sympathectomy designates surgical interruption of sympathetic nerve pathways."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sympathetic]] | noun | **1.** Existing or operating through an affinity, interdependence, or mutual association.<br>**2.** Appropriate to one's mood, inclinations, or disposition. | *"I am so curious," said Loneli, taking leave, and Mea promised to give the sympathetic Loneli a full report of everything."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[sympathetically]] | adverb | **1.** With respect to the sympathetic nervous system.<br>**2.** In a sympathetic manner. | *"Do you find it very tiresome here?" Mäzli asked sympathetically."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[sympathise]] | verb | **1.** Share the feelings of; understand the sentiments of.<br>**2.** To feel or express sympathy or compassion. | *"While something in me,” he went on, “is acutely sensible to her charms, something else is as deeply impressed with her defects: they are such that she could sympathise in nothing I aspired to—co-operate in nothing I undertook."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sympathiser]] | noun | **1.** Commiserates with someone who has had misfortune.<br>**2.** Someone who shares your feelings or opinions and hopes that you will be successful. | *"I have satisfaction," Charles tells his unfailing sympathiser Coleridge, "in being able to bid you rejoice with me in my sister's continued reason and composedness of mind."* — Anne Gilchrist, *Mary Lamb* |
| [[sympathize]] | verb | **1.** Share the feelings of; understand the sentiments of.<br>**2.** Be understanding of. | *"Then with the losers let it sympathize, For nothing can seem foul to those that win. [_The trumpet sounds_.] Enter Worcester and Vernon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sympathizer]] | noun | **1.** Commiserates with someone who has had misfortune.<br>**2.** Someone who shares your feelings or opinions and hopes that you will be successful. | *"So I supposed; but you can't depend upon your horse to tell you whether you are talking to a Yankee sympathizer or an honest Confederate, can you?"* — Harry Castlemon, *Rodney, the Partisan* |
| [[sympathomimetic]] | adjective | **1.** Relating to epinephrine (its release or action). | *"In academic literature, sympathomimetic designates relating to epinephrine (its release or action)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sympathy]] | noun | **1.** A feeling or expression of sincere concern for someone who is experiencing something difficult or painful; also : the capacity for this.<br>**2.** The action of entering into or sharing the feelings or interests of another : empathy; also : the capacity for this. | *"Be what it is, The action of my life is like it, which I’ll keep, if but for sympathy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[telepathic]] | adjective | **1.** Communicating without apparent physical signals. | *"The processes of intense physical training and weapons drills, the concentrated telepathic loading of Plutonian political history and its government's despotic apparatus had been cleared from their consciousness; the substance remained."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[telepathise]] | verb | **1.** Communicate nonverbally by telepathy. | *"In academic literature, telepathise designates communicate nonverbally by telepathy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telepathist]] | noun | **1.** Someone with the power of communicating thoughts directly.<br>**2.** A magician who seems to discern the thoughts of another person (usually by clever signals from an accomplice). | *"In academic literature, telepathist designates someone with the power of communicating thoughts directly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telepathize]] | verb | **1.** Communicate nonverbally by telepathy. | *"In academic literature, telepathize designates communicate nonverbally by telepathy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telepathy]] | noun | **1.** Communication from one mind to another by extrasensory means. | *"Conceal it as he might try, a mysterious telepathy was between them...."* — Donn Byrne, *The Wind Bloweth* |
| [[unsympathetic]] | adjective | **1.** Not sympathetic or disposed toward.<br>**2.** (of characters in literature or drama) tending to evoke antipathetic feelings. | *"This consciousness upon which he had intruded was the single opportunity of existence ever vouchsafed to Tess by an unsympathetic First Cause—her all; her every and only chance."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unsympathetically]] | adverb | **1.** Without sympathy; in an unsympathetic manner. | *"Dentist down the street,” said a blurred voice unsympathetically."* — Grace S. Richmond, *Red Pepper Burns* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Feeling & Sensation]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PATH
  </div>
</div>
