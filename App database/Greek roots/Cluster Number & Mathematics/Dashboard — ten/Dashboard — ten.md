---
status: unread
type: root_dashboard
---
# Dashboard — ten
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">τείνειν</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“stretch”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'stretch'.</span>
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

The Greek root **ten** (τείνειν, τεινόμενον, τανύειν, τετανός, τόνος, τονικός, τονή, τάσις, ταινία (teínein, tanúein, tetanós, tónos, tonikós, tonḗ, tásis)) signifies stretch. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *anhemitonic*, *atelectasis*, *atonic*, *barytone*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: stretch
> The Greek root **ten** fundamentally denotes **stretch**. The physical sensory observation and cognitive anchor underlying 'stretch'. In classical Greek antiquity, the root denoted 'stretch', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">stretch</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'stretch'.</mark>
> - **Everyday Connection**: Think of familiar words like *anhemitonic*, *atelectasis*, *atonic*, *barytone*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ten** derives from Ancient Greek <mark class="hl-stem">τείνειν, τεινόμενον, τανύειν, τετανός, τόνος, τονικός, τονή, τάσις, ταινία (teínein, tanúein, tetanós, tónos, tonikós, tonḗ, tásis)</mark>, meaning "stretch".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with ten**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'stretch'.
  - Whenever you see **ten** in an English word, think immediately of **stretch**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ten</mark>, think of <mark class="hl-def">stretch</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `ten-` (from *τείνειν, τεινόμενον, τανύειν, τετανός, τόνος, τονικός, τονή, τάσις, ταινία (teínein, tanúein, tetanós, tónos, tonikós, tonḗ, tásis)*).
> - **Combining Stem with -o- Connective:** `teno-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Ten
> - **1. Direct & Concrete Anchor:** Literal instantiation of stretch in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on ten

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `ten-` | [[anhemitonic]] | Primary root semantic foundation denoting stretch. |
| **Connecting -o-** | `teno-` | [[atelectasis]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `ten` | [[atonic]] | Relational or directional modification of the core root sense. |

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
| [[anhemitonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, anhemitonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atelectasis]] | noun | **1.** Collapse of the expanded lung; also : defective expansion of the pulmonary alveoli at birth. | *"In academic literature, atelectasis designates collapse of the expanded lung; also : defective expansion of the pulmonary alveoli at birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atonal]] | adjective | **1.** Characterized by avoidance of traditional western tonality. | *"In academic literature, atonal designates characterized by avoidance of traditional western tonality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atonally]] | adverb | **1.** Without tonality. | *"In academic literature, atonally designates without tonality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atone]] | verb | **1.** Make amends for.<br>**2.** Turn away from sin or do penitence. | *"If it might please you to enforce no further The griefs between ye; to forget them quite Were to remember that the present need Speaks to atone you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[atonement]] | noun | **1.** Compensation for a wrong.<br>**2.** The act of atoning for sin or wrongdoing (especially appeasing a deity). | *"ARCHBISHOP. ’Tis very true, And therefore be assured, my good Lord Marshal, If we do now make our atonement well, Our peace will, like a broken limb united, Grow stronger for the breaking."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[atonia]] | noun | **1.** Lack of normal muscular tension or tonus. | *"In academic literature, atonia designates lack of normal muscular tension or tonus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atonic]] | noun | **1.** Characterized by atony.<br>**2.** Uttered without accent or stress. | *"In academic literature, atonic designates characterized by atony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atonicity]] | noun | **1.** Lack of normal muscular tension or tonus. | *"In academic literature, atonicity designates lack of normal muscular tension or tonus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atony]] | noun | **1.** Lack of normal muscular tension or tonus. | *"In academic literature, atony designates lack of normal muscular tension or tonus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barytone]] | noun | **1.** A male singing voice of medium compass between bass and tenor; also : a person having this voice.<br>**2.** A member of a family of instruments having a range between tenor and bass; especially : the baritone saxhorn or baritone saxophone. | *"Oh, my eye!” Songs followed--college songs, popular airs, opera bits--all delivered in' a resounding barytone and accompanied by thumping chords improvised by the performer."* — Grace S. Richmond, *Red Pepper Burns* |
| [[catatonia]] | noun | **1.** A psychomotor disturbance that may involve muscle rigidity, stupor or mutism, purposeless movements, negativism, echolalia, and inappropriate or unusual posturing and is associated with various medical conditions (such as schizophrenia and mood disorders). | *"In academic literature, catatonia designates a psychomotor disturbance that may involve muscle rigidity, stupor or mutism, purposeless movements, negativism, echolalia, and inappropriate or unusual posturing and is associated with various medical conditions (such as schizophrenia and mood disorders)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catatoniac]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ten.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, catatoniac designates a term designating an entity, condition, or phenomenon derived from greek ten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catatonic]] | noun | **1.** Of, relating to, marked by, or affected with catatonia.<br>**2.** Characterized by a marked lack of movement, activity, or expression. | *"In academic literature, catatonic designates of, relating to, marked by, or affected with catatonia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decatonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, decatonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diatonic]] | noun | **1.** Of, relating to, or being a musical scale (such as a major or minor scale) comprising intervals of five whole steps and two half steps. | *"In academic literature, diatonic designates of, relating to, or being a musical scale (such as a major or minor scale) comprising intervals of five whole steps and two half steps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ditone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ten.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, ditone designates a term designating an entity, condition, or phenomenon derived from greek ten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dodecatonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, dodecatonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dystonia]] | noun | **1.** Any of various conditions (such as Parkinson's disease and torticollis) characterized by abnormalities of movement and muscle tone. | *"In academic literature, dystonia designates any of various conditions (such as parkinson's disease and torticollis) characterized by abnormalities of movement and muscle tone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectasia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ten.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, ectasia designates a term designating an entity, condition, or phenomenon derived from greek ten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enneatonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, enneatonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entasia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ten.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, entasia designates a term designating an entity, condition, or phenomenon derived from greek ten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entasis]] | noun | **1.** A slight convexity especially in the shaft of a column. | *"In academic literature, entasis designates a slight convexity especially in the shaft of a column."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epitasis]] | noun | **1.** The part of a play developing the main action and leading to the catastrophe. | *"It doubles itself in the middle of his life, reflects itself in another, repeats itself, protasis, epitasis, catastasis, catastrophe."* — James Joyce, *Ulysses* |
| [[hemitonia]] | noun | **1.** Musicology commonly classifies scales as either hemitonic or anhemitonic.<br>**2.** Hemitonic scales contain one or more semitones, while anhemitonic scales do not contain semitones. | *"In academic literature, hemitonia designates musicology commonly classifies scales as either hemitonic or anhemitonic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemitonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, hemitonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heptatonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, heptatonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hexatonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, hexatonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperisotonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, hyperisotonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertonia]] | noun | **1.** The condition of exhibiting excessive muscular tone or tension. | *"In academic literature, hypertonia designates the condition of exhibiting excessive muscular tone or tension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertonic]] | noun | **1.** Exhibiting excessive tone or tension.<br>**2.** Having a higher osmotic pressure than a surrounding medium or a fluid under comparison. | *"In academic literature, hypertonic designates exhibiting excessive tone or tension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertonicity]] | noun | **1.** (of a solution) the extent to which a solution has a higher osmotic pressure than some other.<br>**2.** (of muscular tissue) the state of being hypertonic. | *"In academic literature, hypertonicity designates (of a solution) the extent to which a solution has a higher osmotic pressure than some other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertonus]] | noun | **1.** (of muscular tissue) the state of being hypertonic. | *"In academic literature, hypertonus designates (of muscular tissue) the state of being hypertonic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypotenuse]] | noun | **1.** The side of a right-angled triangle that is opposite the right angle.<br>**2.** The length of a hypotenuse. | *"In academic literature, hypotenuse designates the side of a right-angled triangle that is opposite the right angle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypotonia]] | noun | **1.** The state of having hypotonic muscle tone. | *"In academic literature, hypotonia designates the state of having hypotonic muscle tone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypotonic]] | noun | **1.** Having deficient tone or tension.<br>**2.** Having a lower osmotic pressure than a surrounding medium or a fluid under comparison. | *"In academic literature, hypotonic designates having deficient tone or tension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypotonicity]] | noun | **1.** (of a solution) the extent to which a solution has a lower osmotic pressure than some other.<br>**2.** (of muscular tissue) the state of being hypotonic. | *"In academic literature, hypotonicity designates (of a solution) the extent to which a solution has a lower osmotic pressure than some other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intonate]] | verb | **1.** Speak carefully, as with rising and falling pitch or in a particular tone.<br>**2.** Recite with musical intonation; recite as a chant or a psalm. | *"In academic literature, intonate designates speak carefully, as with rising and falling pitch or in a particular tone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isotonic]] | noun | **1.** Of, relating to, or being muscular contraction in the absence of significant resistance, with marked shortening of muscle fibers, and without great increase in muscle tone.<br>**2.** Isosmotic —used of solutions. | *"In academic literature, isotonic designates of, relating to, or being muscular contraction in the absence of significant resistance, with marked shortening of muscle fibers, and without great increase in muscle tone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microtone]] | noun | **1.** A musical interval smaller than a halftone. | *"In academic literature, microtone designates a musical interval smaller than a halftone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotone]] | noun | **1.** A succession of syllables, words, or sentences in one unvaried key or pitch.<br>**2.** A single unvaried musical tone. | *"His reading of Scripture had no elocutionary pretensions about it; it was quiet, and to a large extent gone through in a monotone; but two things about it made it very impressive."* — John Cairns, *Principal Cairns* |
| [[monotonic]] | noun | **1.** Characterized by the use of or uttered in a monotone.<br>**2.** Having the property either of never increasing or of never decreasing as the values of the independent variable or the subscripts of the terms increase. | *"In academic literature, monotonic designates characterized by the use of or uttered in a monotone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monotonous]] | noun | **1.** Uttered or sounded in one unvarying tone : marked by a sameness of pitch and intensity.<br>**2.** Tediously uniform or unvarying. | *"Rouncewell that the rain makes such a monotonous pattering on the terrace that he can’t read the paper even by the fireside in his own snug dressing-room."* — Charles Dickens, *Bleak House* |
| [[monotonously]] | adverb | **1.** In a monotonous manner. | *"They tossed and turned on their little beds, and the cheese-wring dripped monotonously downstairs."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[monotony]] | noun | **1.** Tedious sameness.<br>**2.** Sameness of tone or sound. | *"Why do you ask?” “Anything to vary this detestable monotony."* — Charles Dickens, *Bleak House* |
| [[neotenic]] | adjective | **1.** Of or relating to or characterized by neoteny. | *"In academic literature, neotenic designates of or relating to or characterized by neoteny."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neotenous]] | adjective | **1.** Of or relating to or characterized by neoteny. | *"In academic literature, neotenous designates of or relating to or characterized by neoteny."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neoteny]] | noun | **1.** Retention of some larval or immature characters in adulthood.<br>**2.** Attainment of sexual maturity during the larval stage. | *"In academic literature, neoteny designates retention of some larval or immature characters in adulthood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octatonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, octatonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oxytone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ten.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, oxytone designates a term designating an entity, condition, or phenomenon derived from greek ten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paroxytone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ten.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, paroxytone designates a term designating an entity, condition, or phenomenon derived from greek ten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentatone]] | noun | **1.** A gapped scale with five notes; usually the fourth and seventh notes of the diatonic scale are omitted. | *"In academic literature, pentatone designates a gapped scale with five notes; usually the fourth and seventh notes of the diatonic scale are omitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentatonic]] | noun | **1.** Consisting of five tones; specifically : being or relating to a scale in which the tones are arranged like a major scale with the fourth and seventh tones omitted. | *"In academic literature, pentatonic designates consisting of five tones; specifically : being or relating to a scale in which the tones are arranged like a major scale with the fourth and seventh tones omitted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peritoneal]] | adjective | **1.** Of or relating to or affecting the peritoneum. | *"Although the former (we are thinking of neglect) is undoubtedly only too true the case he cites of nurses forgetting to count the sponges in the peritoneal cavity is too rare to be normative."* — James Joyce, *Ulysses* |
| [[peritoneum]] | noun | **1.** The smooth transparent serous membrane that lines the cavity of the abdomen of a mammal and is folded inward over the abdominal and pelvic viscera. | *"In academic literature, peritoneum designates the smooth transparent serous membrane that lines the cavity of the abdomen of a mammal and is folded inward over the abdominal and pelvic viscera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytonal]] | adjective | **1.** Using more than one key or tonality simultaneously. | *"In academic literature, polytonal designates using more than one key or tonality simultaneously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, polytonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proparoxytone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ten.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, proparoxytone designates a term designating an entity, condition, or phenomenon derived from greek ten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protasis]] | noun | **1.** The introductory part of a play or narrative poem.<br>**2.** The subordinate clause of a conditional sentence. | *"It doubles itself in the middle of his life, reflects itself in another, repeats itself, protasis, epitasis, catastasis, catastrophe."* — James Joyce, *Ulysses* |
| [[pyelectasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ten.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, pyelectasis designates a term designating an entity, condition, or phenomenon derived from greek ten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syntonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, syntonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetanolysin]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ten.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, tetanolysin designates a term designating an entity, condition, or phenomenon derived from greek ten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetanospasmin]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ten.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, tetanospasmin designates a term designating an entity, condition, or phenomenon derived from greek ten."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetanus]] | noun | **1.** An acute infectious bacterial disease characterized by tonic spasm of voluntary muscles especially of the jaw and caused by an exotoxin of a clostridium (Clostridium tetani) which is usually introduced through a wound.<br>**2.** The bacterium that causes tetanus. | *"Moreover, they are careful to keep the bow-string taut and to twang it occasionally, for this will cause the wounded man to suffer from tension of the nerves and spasms of tetanus."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[tetany]] | noun | **1.** A condition of physiological calcium imbalance marked by tonic spasm of muscles and often associated with deficient parathyroid secretion. | *"In academic literature, tetany designates a condition of physiological calcium imbalance marked by tonic spasm of muscles and often associated with deficient parathyroid secretion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetratonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stretch. | *"In academic literature, tetratonic designates adjective*) pertaining to, derived from, or characteristic of stretch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonal]] | adjective | **1.** Employing variations in pitch to distinguish meanings of otherwise similar words.<br>**2.** Having tonality; i.e. tones and chords organized in relation to one tone such as a keynote or tonic. | *"In academic literature, tonal designates employing variations in pitch to distinguish meanings of otherwise similar words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tone]] | noun | **1.** Vocal or musical sound of a specific quality; especially : musical sound with respect to timbre and manner of expression.<br>**2.** A sound of definite pitch and vibration. | *"I am doing the right thing," said Mäzli now in the most decided tone."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[toned]] | verb | **1.** Utter monotonously and repetitively and rhythmically.<br>**2.** Vary the pitch of one's speech. | *"But I rather liked him.” “Do you now?” “Of course not—what footsteps are those I hear?” Liddy looked from a back window into the courtyard behind, which was now getting low-toned and dim with the earliest films of night."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[toner]] | noun | **1.** A solution containing chemicals that can change the color of a photographic print.<br>**2.** A black or colored powder used in a printer to develop a xerographic image. | *"In academic literature, toner designates a solution containing chemicals that can change the color of a photographic print."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonic]] | noun | **1.** Tonic water.<br>**2.** An agent (such as a drug) that increases body tone. | *"And more needles were missing than it could be regarded as quite wholesome for a patient of such tender years either to apply externally or to take as a tonic."* — Charles Dickens, *Great Expectations* |
| [[tonicity]] | noun | **1.** The elastic tension of living muscles, arteries, etc. that facilitate response to stimuli. | *"In academic literature, tonicity designates the elastic tension of living muscles, arteries, etc. that facilitate response to stimuli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonoplast]] | noun | **1.** A semipermeable membrane surrounding a vacuole in a plant cell. | *"In academic literature, tonoplast designates a semipermeable membrane surrounding a vacuole in a plant cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tune]] | noun | **1.** A pleasing succession of musical tones : melody.<br>**2.** A dominant theme. | *"The poop was beaten gold; Purple the sails, and so perfumed that The winds were love-sick with them; the oars were silver, Which to the tune of flutes kept stroke, and made The water which they beat to follow faster, As amorous of their strokes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tuner]] | noun | **1.** Someone who tunes pianos.<br>**2.** An electronic receiver that detects and demodulates and amplifies transmitted signals. | *"He looked towards the saloon door. —I see you have moved the piano. —The tuner was in today, miss Douce replied, tuning it for the smoking concert and I never heard such an exquisite player. —Is that a fact? —Didn’t he, miss Kennedy?"* — James Joyce, *Ulysses* |
| [[tunic]] | noun | **1.** An enveloping or covering membrane or layer of body tissue.<br>**2.** Any of a variety of loose fitting cloaks extending to the hips or knees. | *"His military uniform was skin-tight: a black tunic belted over blood-red breeches."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tuning]] | noun | **1.** (music) calibrating something (an instrument or electronic circuit) to a standard frequency.<br>**2.** Adjust for (better) functioning. | *"Feast-finding minstrels, tuning my defame, Will tie the hearers to attend each line, How Tarquin wronged me, I Collatine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[untune]] | verb | **1.** Cause to lose one's composure.<br>**2.** Cause to be out of tune. | *"Take but degree away, untune that string, And hark what discord follows!"* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · TEN
  </div>
</div>
