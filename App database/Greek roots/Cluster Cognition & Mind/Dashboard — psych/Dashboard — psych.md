---
status: unread
type: root_dashboard
---
# Dashboard — psych
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ψυχή (psukhḗ)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“mind / soul / vital breath / spirit”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The cool exhalation of living breath animating thought, sensation, and conscious selfhood.</span>
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

The Greek root **psych** (ψυχή (psukhḗ), ψύχειν (psúkhein)) signifies mind / soul / vital breath / spirit. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *antipsychotic*, *biopsychic*, *biopsychology*, *hylopsychism*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: mind / soul / vital breath / spirit
> The Greek root **psych** fundamentally denotes **mind / soul / vital breath / spirit**. The cool exhalation of living breath animating thought, sensation, and conscious selfhood. In Homer, the psyche was the departing life-shadow at death; Plato elevated it to the tripartite rational soul (logistikon, thymoeides, epithymetikon) in the Republic.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">mind / soul / vital breath / spirit</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The cool exhalation of living breath animating thought, sensation, and conscious selfhood.</mark>
> - **Everyday Connection**: Think of familiar words like *antipsychotic*, *biopsychic*, *biopsychology*, *hylopsychism*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **psych** derives from Ancient Greek <mark class="hl-stem">ψυχή (psukhḗ), ψύχειν (psúkhein)</mark>, meaning "mind / soul / vital breath / spirit".
  - Reconstructed Indo-European origin: ***bʰes- ("to breathe, blow")**.

- **The Big Picture Idea**:
  - The cool exhalation of living breath animating thought, sensation, and conscious selfhood.
  - Whenever you see **psych** in an English word, think immediately of **mind / soul / vital breath / spirit**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">psych</mark>, think of <mark class="hl-def">mind / soul / vital breath / spirit</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `psych-` (from *ψυχή (psukhḗ), ψύχειν (psúkhein)*).
> - **Combining Stem with -o- Connective:** `psycho-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Psych
> - **1. Direct & Concrete Anchor:** Literal instantiation of mind / soul / vital breath / spirit in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on psych

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `psych-` | [[antipsychotic]] | Primary root semantic foundation denoting mind / soul / vital breath / spirit. |
| **Connecting -o-** | `psycho-` | [[biopsychic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `psych` | [[biopsychology]] | Relational or directional modification of the core root sense. |

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
| [[antipathetic]] | adjective | **1.** (usually followed by `to') strongly opposed.<br>**2.** Characterized by antagonism or antipathy. | *"Judaism antipathetic Judaism was the antithesis of Christianity, because Judaism engendered the limited form of a national or 133:21 tribal religion."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[antipathetical]] | adjective | **1.** (usually followed by `to') strongly opposed.<br>**2.** Characterized by antagonism or antipathy. | *"In academic literature, antipathetical designates (usually followed by `to') strongly opposed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antipathy]] | noun | **1.** A strong feeling of dislike.<br>**2.** Something disliked : an object of aversion. | *"No contraries hold more antipathy Than I and such a knave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[antipsychotic]] | noun | **1.** Any of the powerful tranquilizers (such as the phenothiazines and butyrophenones) used especially to treat psychosis and believed to act by blocking dopamine nervous receptors —called also neuroleptic. | *"In academic literature, antipsychotic designates any of the powerful tranquilizers (such as the phenothiazines and butyrophenones) used especially to treat psychosis and believed to act by blocking dopamine nervous receptors —called also neuroleptic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apathetic]] | noun | **1.** Affected by, characterized by, or displaying apathy : having or showing little or no interest, concern, or emotion. | *"While they uncovered the sheaves he stood apathetic beside his portable repository of force, round whose hot blackness the morning air quivered."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[apathy]] | noun | **1.** Lack of feeling or emotion : impassiveness.<br>**2.** Lack of interest or concern : indifference. | *"A phrase like that of Clement of Alexandria, "deifying into apathy we become monadic," is seas away from anything we find in the speech of Jesus."* — T. R. Glover, *The Jesus of History* |
| [[biopsychic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of mind / soul / vital breath / spirit. | *"In academic literature, biopsychic designates adjective*) pertaining to, derived from, or characteristic of mind / soul / vital breath / spirit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biopsychology]] | noun | **1.** Psychobiology. | *"In academic literature, biopsychology designates psychobiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathetic]] | adjective | **1.** Showing empathy or ready comprehension of others' states. | *"In academic literature, empathetic designates showing empathy or ready comprehension of others' states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathic]] | adjective | **1.** Showing empathy or ready comprehension of others' states. | *"Whatever the past might have been, his advanced years called for him to be nonjudgmental, empathic, and healing."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[empathise]] | verb | **1.** Be understanding of. | *"In academic literature, empathise designates be understanding of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathize]] | verb | **1.** Be understanding of. | *"In academic literature, empathize designates be understanding of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empathy]] | noun | **1.** The action of understanding, being aware of, being sensitive to, and vicariously experiencing the feelings, thoughts, and experience of another; also : the capacity for this.<br>**2.** The act of imagining one's ideas, feelings, or attitudes as fully inhabiting something observed (such as a work of art or natural occurrence) : the imaginative projection of a subjective state into an object so that the object appears to be infused with it. | *"In academic literature, empathy designates the action of understanding, being aware of, being sensitive to, and vicariously experiencing the feelings, thoughts, and experience of another; also : the capacity for this."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hylopsychism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek psych.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, hylopsychism designates a term designating an entity, condition, or phenomenon derived from greek psych."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panpsychism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek psych.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, panpsychism designates a term designating an entity, condition, or phenomenon derived from greek psych."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parapsychological]] | adjective | **1.** Beyond normal physical explanation. | *"In academic literature, parapsychological designates beyond normal physical explanation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parapsychologist]] | noun | **1.** Someone who studies the evidence for such psychological phenomena as psychokinesis and telepathy and clairvoyance. | *"In academic literature, parapsychologist designates someone who studies the evidence for such psychological phenomena as psychokinesis and telepathy and clairvoyance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parapsychology]] | noun | **1.** Phenomena that appear to contradict physical laws and suggest the possibility of causation by mental processes. | *"In academic literature, parapsychology designates phenomena that appear to contradict physical laws and suggest the possibility of causation by mental processes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parasympathetic]] | noun | **1.** Originates in the brain stem and lower part of the spinal cord; opposes physiological effects of the sympathetic nervous system: stimulates digestive secretions; slows the heart; constricts the pupils; dilates blood vessels.<br>**2.** Of or relating to the parasympathetic nervous system. | *"In academic literature, parasympathetic designates originates in the brain stem and lower part of the spinal cord; opposes physiological effects of the sympathetic nervous system: stimulates digestive secretions; slows the heart; constricts the pupils; dilates blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pathy]] | noun | **1.** Feeling : suffering : perception.<br>**2.** Disorder of (such) a part or kind. | *"In academic literature, pathy designates feeling : suffering : perception."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psyche]] | noun | **1.** A princess loved by Cupid.<br>**2.** Soul, personality. | *"Some of them represent the fable of Cupid and Psyche, which is probably the romantic invention of a literary period, and cannot, I think, be reckoned as a genuine mythical product."* — George Eliot, *Middlemarch* |
| [[psychedelia]] | noun | **1.** The world of people, phenomena, or items associated with psychedelic drugs.<br>**2.** Psychedelic music. | *"In academic literature, psychedelia designates the world of people, phenomena, or items associated with psychedelic drugs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychedelic]] | noun | **1.** A psychedelic drug (such as LSD).<br>**2.** Of, relating to, or being drugs (such as LSD) capable of producing abnormal psychic effects (such as hallucinations) and sometimes psychotic states. | *"In academic literature, psychedelic designates a psychedelic drug (such as lsd)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychiatric]] | adjective | **1.** Relating to or used in or engaged in the practice of psychiatry. | *"In academic literature, psychiatric designates relating to or used in or engaged in the practice of psychiatry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychiatrical]] | adjective | **1.** Relating to or used in or engaged in the practice of psychiatry. | *"In academic literature, psychiatrical designates relating to or used in or engaged in the practice of psychiatry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychiatrist]] | noun | **1.** A medical doctor who diagnoses and treats mental, emotional, and behavioral disorders : a specialist in psychiatry. | *"I wonder what a psychiatrist would have said about him."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[psychiatry]] | noun | **1.** A branch of medicine that deals with mental, emotional, or behavioral disorders. | *"In academic literature, psychiatry designates a branch of medicine that deals with mental, emotional, or behavioral disorders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychic]] | noun | **1.** Of or relating to the psyche : psychogenic.<br>**2.** Lying outside the sphere of physical science or knowledge : immaterial, moral, or spiritual in origin or force. | *"This history is written in our tissues and our bones, in our functions and our organs, in our brain cells and in our spirits, and in all sorts of physical and psychic atavistic urgencies and compulsions."* — Jack London, *The Jacket (The Star-Rover)* |
| [[psychical]] | adjective | **1.** Affecting or influenced by the human mind.<br>**2.** Outside the sphere of physical science. | *"Nevertheless the word corresponds to a fairly definite range of psychical reactions which are of great interest in modern poetry, especially German poetry."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[psychically]] | adverb | **1.** From a psychic point of view. | *"In academic literature, psychically designates from a psychic point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psycho]] | noun | **1.** Psychopath.<br>**2.** Of, relating to, or being a person who is mentally or emotionally unsound or unstable especially in a way that results in dangerous or violent behavior. | *"In academic literature, psycho designates psychopath."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoactive]] | noun | **1.** Affecting the mind or behavior.<br>**2.** Not psychoactive : not producing an effect (such as changes in perception or behavior) on the mind or mental processes. | *"In academic literature, psychoactive designates affecting the mind or behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalyse]] | verb | **1.** Subject to psychoanalytic treatment. | *"In academic literature, psychoanalyse designates subject to psychoanalytic treatment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalysis]] | noun | **1.** A method of analyzing psychic phenomena and treating emotional disorders that involves treatment sessions during which the patient is encouraged to talk freely about personal experiences and especially about early childhood and dreams. | *"In academic literature, psychoanalysis designates a method of analyzing psychic phenomena and treating emotional disorders that involves treatment sessions during which the patient is encouraged to talk freely about personal experiences and especially about early childhood and dreams."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalyst]] | noun | **1.** A licensed practitioner of psychoanalysis. | *"In academic literature, psychoanalyst designates a licensed practitioner of psychoanalysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalytic]] | adjective | **1.** Of or relating to or incorporating the methods and theory of psychiatric treatment originated by sigmund freud. | *"In academic literature, psychoanalytic designates of or relating to or incorporating the methods and theory of psychiatric treatment originated by sigmund freud."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalytical]] | adjective | **1.** Of or relating to or incorporating the methods and theory of psychiatric treatment originated by sigmund freud. | *"In academic literature, psychoanalytical designates of or relating to or incorporating the methods and theory of psychiatric treatment originated by sigmund freud."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoanalyze]] | verb | **1.** Subject to psychoanalytic treatment. | *"In academic literature, psychoanalyze designates subject to psychoanalytic treatment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychobabble]] | noun | **1.** Using language loaded with psychological terminology. | *"In academic literature, psychobabble designates using language loaded with psychological terminology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychodid]] | noun | **1.** A fly of the family psychodidae. | *"In academic literature, psychodid designates a fly of the family psychodidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychodidae]] | noun | **1.** Very small two-winged flies with hairy wings that develop in moss and damp vegetable matter: sand flies. | *"In academic literature, psychodidae designates very small two-winged flies with hairy wings that develop in moss and damp vegetable matter: sand flies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychodynamics]] | noun | **1.** The interrelation of conscious and unconscious processes and emotions that determine personality and motivation.<br>**2.** The branch of social psychology that deals with the processes and emotions that determine psychology and motivation. | *"In academic literature, psychodynamics designates the interrelation of conscious and unconscious processes and emotions that determine personality and motivation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychogenesis]] | noun | **1.** The development in the life of an individual of some disorder that is caused by psychological rather than physiological factors.<br>**2.** A general term for the origin and development of almost any aspect of the mind. | *"In academic literature, psychogenesis designates the development in the life of an individual of some disorder that is caused by psychological rather than physiological factors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychogenetic]] | adjective | **1.** Of or relating to the psychological cause of a disorder.<br>**2.** Of or relating to the origin and development of the mind. | *"In academic literature, psychogenetic designates of or relating to the psychological cause of a disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychogenic]] | adjective | **1.** Of or relating to the psychological cause of a disorder.<br>**2.** Mental or emotional rather than physiological in origin. | *"In academic literature, psychogenic designates of or relating to the psychological cause of a disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychokinesis]] | noun | **1.** The power to move something by thinking about it without the application of physical force. | *"In academic literature, psychokinesis designates the power to move something by thinking about it without the application of physical force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychokinetic]] | adjective | **1.** Moving an object without apparent use of physical means. | *"In academic literature, psychokinetic designates moving an object without apparent use of physical means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psycholinguist]] | noun | **1.** A person (usually a psychologist but sometimes a linguist) who studies the psychological basis of human language. | *"In academic literature, psycholinguist designates a person (usually a psychologist but sometimes a linguist) who studies the psychological basis of human language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psycholinguistic]] | adjective | **1.** Of or relating to the psychology of language. | *"In academic literature, psycholinguistic designates of or relating to the psychology of language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psycholinguistics]] | noun | **1.** The branch of cognitive psychology that studies the psychological basis of linguistic competence and performance. | *"In academic literature, psycholinguistics designates the branch of cognitive psychology that studies the psychological basis of linguistic competence and performance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychological]] | adjective | **1.** Mental or emotional as opposed to physical in nature.<br>**2.** Of or relating to or determined by psychology. | *"Rather they became a part of it; for the world is only a psychological phenomenon, and what they seemed they were."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[psychologically]] | adverb | **1.** With regard to psychology.<br>**2.** In terms of psychology. | *"But, as has been indicated in another connection above, it is far from being a matter of indifference, psychologically, where the first, immediate burden of premium payment falls."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[psychologist]] | noun | **1.** A person who specializes in the study of mind and behavior or in the treatment of mental, emotional, and behavioral disorders : a specialist in psychology.<br>**2.** A licensed psychologist with an advanced degree who assesses, diagnoses, and treats mental, emotional, and behavioral issues : a specialist in clinical psychology. | *"Mill's achievements as an economist, logician, psychologist, and politician are known more or less vaguely to all educated men; but his capacity and his actual work as a critic are comparatively little regarded."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[psychology]] | noun | **1.** The science of mind and behavior.<br>**2.** The mental or behavioral characteristics of an individual or group. | *"An incorrigible is a terrible human being—at least such is the connotation of “incorrigible” in prison psychology."* — Jack London, *The Jacket (The Star-Rover)* |
| [[psychometric]] | adjective | **1.** Of or relating to psychometrics. | *"In academic literature, psychometric designates of or relating to psychometrics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychometrics]] | noun | **1.** Any branch of psychology concerned with psychological measurements. | *"In academic literature, psychometrics designates any branch of psychology concerned with psychological measurements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychometrika]] | noun | **1.** Any branch of psychology concerned with psychological measurements. | *"In academic literature, psychometrika designates any branch of psychology concerned with psychological measurements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychometry]] | noun | **1.** Any branch of psychology concerned with psychological measurements. | *"In academic literature, psychometry designates any branch of psychology concerned with psychological measurements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychomotor]] | adjective | **1.** Of or relating to or characterizing mental events that have motor consequences or vice versa. | *"In academic literature, psychomotor designates of or relating to or characterizing mental events that have motor consequences or vice versa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoneurosis]] | noun | **1.** A mental or personality disturbance not attributable to any known neurological or organic dysfunction. | *"In academic literature, psychoneurosis designates a mental or personality disturbance not attributable to any known neurological or organic dysfunction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoneurotic]] | noun | **1.** A person suffering from neurosis.<br>**2.** Affected with emotional disorder. | *"In academic literature, psychoneurotic designates a person suffering from neurosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychonomics]] | noun | **1.** The branch of psychology that uses experimental methods to study psychological issues. | *"In academic literature, psychonomics designates the branch of psychology that uses experimental methods to study psychological issues."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopath]] | noun | **1.** A mentally unstable person; especially : a person having an egocentric and antisocial personality marked by a lack of remorse for one's actions, an absence of empathy for others, and often criminal tendencies. | *"In academic literature, psychopath designates a mentally unstable person; especially : a person having an egocentric and antisocial personality marked by a lack of remorse for one's actions, an absence of empathy for others, and often criminal tendencies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopathic]] | noun | **1.** Of, relating to, or characterized by psychopathy.<br>**2.** Psychopath. | *"There is nothing in the least "psychopathic" about him, nothing abnormal--no mystical vision of God, no mystical absorption in God, no mystical union with God, no abstraction, nothing that is the mark of the professed mystic."* — T. R. Glover, *The Jesus of History* |
| [[psychopathologic]] | adjective | **1.** Suffering from an undiagnosed mental disorder. | *"In academic literature, psychopathologic designates suffering from an undiagnosed mental disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopathological]] | adjective | **1.** Suffering from an undiagnosed mental disorder. | *"In academic literature, psychopathological designates suffering from an undiagnosed mental disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopathology]] | noun | **1.** The branch of psychology concerned with abnormal behavior.<br>**2.** The branch of medicine dealing with the diagnosis and treatment of mental disorders. | *"In academic literature, psychopathology designates the branch of psychology concerned with abnormal behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopathy]] | noun | **1.** Mental disorder especially when marked by egocentric and antisocial activity, a lack of remorse for one's actions, an absence of empathy for others, and often criminal tendencies. | *"In academic literature, psychopathy designates mental disorder especially when marked by egocentric and antisocial activity, a lack of remorse for one's actions, an absence of empathy for others, and often criminal tendencies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopharmacological]] | adjective | **1.** Of or relating to psychopharmacology. | *"In academic literature, psychopharmacological designates of or relating to psychopharmacology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopharmacology]] | noun | **1.** The study of drugs that affect the mind. | *"In academic literature, psychopharmacology designates the study of drugs that affect the mind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychophysicist]] | noun | **1.** A psychologist trained in psychophysics. | *"In academic literature, psychophysicist designates a psychologist trained in psychophysics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychophysics]] | noun | **1.** The branch of psychology concerned with quantitative relations between physical stimuli and their psychological effects. | *"In academic literature, psychophysics designates the branch of psychology concerned with quantitative relations between physical stimuli and their psychological effects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychophysiology]] | noun | **1.** The branch of psychology that is concerned with the physiological bases of psychological processes. | *"In academic literature, psychophysiology designates the branch of psychology that is concerned with the physiological bases of psychological processes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopomp]] | noun | **1.** A spirit, deity, person, etc., who guides the souls of the dead to the afterlife. | *"In academic literature, psychopomp designates a spirit, deity, person, etc., who guides the souls of the dead to the afterlife."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychopsis]] | noun | **1.** Epiphytic orchids of central and south america formerly included in genus oncidium. | *"In academic literature, psychopsis designates epiphytic orchids of central and south america formerly included in genus oncidium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosexual]] | adjective | **1.** Of or relating to the mental or emotional attitudes about sexuality. | *"In academic literature, psychosexual designates of or relating to the mental or emotional attitudes about sexuality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosexuality]] | noun | **1.** The mental representation of sexual activities. | *"In academic literature, psychosexuality designates the mental representation of sexual activities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosis]] | noun | **1.** A serious mental illness (such as schizophrenia) characterized by defective or lost contact with reality often with hallucinations or delusions. | *"In academic literature, psychosis designates a serious mental illness (such as schizophrenia) characterized by defective or lost contact with reality often with hallucinations or delusions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosocial]] | noun | **1.** Involving both psychological and social aspects.<br>**2.** Relating social conditions to mental health. | *"You mentioned 'three men and three women'; your mission can not exclude gender compatibility consistent with the prevailing psychosocial construct -- this is what we are."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[psychosomatic]] | noun | **1.** Of, relating to, concerned with, or involving both mind and body.<br>**2.** Of, relating to, involving, or concerned with bodily symptoms caused by mental or emotional disturbance. | *"In academic literature, psychosomatic designates of, relating to, concerned with, or involving both mind and body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychosurgery]] | noun | **1.** Brain surgery on human patients intended to relieve severe and otherwise intractable mental or behavioral problems. | *"In academic literature, psychosurgery designates brain surgery on human patients intended to relieve severe and otherwise intractable mental or behavioral problems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotherapeutic]] | adjective | **1.** Of or relating to or practicing psychotherapy.<br>**2.** Emotionally purging. | *"In academic literature, psychotherapeutic designates of or relating to or practicing psychotherapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotherapeutics]] | noun | **1.** The branch of psychiatry concerned with psychological methods. | *"In academic literature, psychotherapeutics designates the branch of psychiatry concerned with psychological methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotherapist]] | noun | **1.** A therapist who deals with mental and emotional disorders. | *"In academic literature, psychotherapist designates a therapist who deals with mental and emotional disorders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotherapy]] | noun | **1.** Treatment of mental or emotional disorder or of related bodily ills by psychological means.<br>**2.** Therapy in the presence of a therapist in which several patients discuss and share their personal problems —called also group psychotherapy. | *"In academic literature, psychotherapy designates treatment of mental or emotional disorder or of related bodily ills by psychological means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotic]] | noun | **1.** Of, relating to, marked by, or affected with psychosis.<br>**2.** Exhibiting or suggestive of mental or emotional unsoundness or instability —not used technically. | *"In academic literature, psychotic designates of, relating to, marked by, or affected with psychosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychoticism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek psych.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, psychoticism designates a term designating an entity, condition, or phenomenon derived from greek psych."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotria]] | noun | **1.** Tropical chiefly south american shrubs and trees. | *"In academic literature, psychotria designates tropical chiefly south american shrubs and trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotropic]] | noun | **1.** Acting on the mind. | *"In academic literature, psychotropic designates acting on the mind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychrometer]] | noun | **1.** A hygrometer consisting essentially of two similar thermometers with the bulb of one being kept wet so that the cooling that results from evaporation makes it register a lower temperature than the dry one and with the difference between the readings constituting a measure of the dryness of the atmosphere. | *"In academic literature, psychrometer designates a hygrometer consisting essentially of two similar thermometers with the bulb of one being kept wet so that the cooling that results from evaporation makes it register a lower temperature than the dry one and with the difference between the readings constituting a measure of the dryness of the atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sympathetic]] | noun | **1.** Existing or operating through an affinity, interdependence, or mutual association.<br>**2.** Appropriate to one's mood, inclinations, or disposition. | *"I am so curious," said Loneli, taking leave, and Mea promised to give the sympathetic Loneli a full report of everything."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[sympathise]] | verb | **1.** Share the feelings of; understand the sentiments of.<br>**2.** To feel or express sympathy or compassion. | *"While something in me,” he went on, “is acutely sensible to her charms, something else is as deeply impressed with her defects: they are such that she could sympathise in nothing I aspired to—co-operate in nothing I undertook."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sympathize]] | verb | **1.** Share the feelings of; understand the sentiments of.<br>**2.** Be understanding of. | *"Then with the losers let it sympathize, For nothing can seem foul to those that win. [_The trumpet sounds_.] Enter Worcester and Vernon."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sympathy]] | noun | **1.** A feeling or expression of sincere concern for someone who is experiencing something difficult or painful; also : the capacity for this.<br>**2.** The action of entering into or sharing the feelings or interests of another : empathy; also : the capacity for this. | *"Be what it is, The action of my life is like it, which I’ll keep, if but for sympathy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[telepathic]] | adjective | **1.** Communicating without apparent physical signals. | *"The processes of intense physical training and weapons drills, the concentrated telepathic loading of Plutonian political history and its government's despotic apparatus had been cleared from their consciousness; the substance remained."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[telepathise]] | verb | **1.** Communicate nonverbally by telepathy. | *"In academic literature, telepathise designates communicate nonverbally by telepathy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telepathist]] | noun | **1.** Someone with the power of communicating thoughts directly.<br>**2.** A magician who seems to discern the thoughts of another person (usually by clever signals from an accomplice). | *"In academic literature, telepathist designates someone with the power of communicating thoughts directly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telepathize]] | verb | **1.** Communicate nonverbally by telepathy. | *"In academic literature, telepathize designates communicate nonverbally by telepathy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telepathy]] | noun | **1.** Communication from one mind to another by extrasensory means. | *"Conceal it as he might try, a mysterious telepathy was between them...."* — Donn Byrne, *The Wind Bloweth* |
| [[unsympathetic]] | adjective | **1.** Not sympathetic or disposed toward.<br>**2.** (of characters in literature or drama) tending to evoke antipathetic feelings. | *"This consciousness upon which he had intruded was the single opportunity of existence ever vouchsafed to Tess by an unsympathetic First Cause—her all; her every and only chance."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Cognition & Mind]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PSYCH
  </div>
</div>
