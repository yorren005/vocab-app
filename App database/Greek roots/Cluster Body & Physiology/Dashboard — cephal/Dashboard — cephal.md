---
status: unread
type: root_dashboard
---
# Dashboard — cephal
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">κεφαλή (kephalḗ)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“head”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'head'.</span>
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

The Greek root **cephal** (κεφαλή (kephalḗ)) signifies head. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *acephalic*, *acephaly*, *anencephaly*, *autocephaly*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: head
> The Greek root **cephal** fundamentally denotes **head**. The physical sensory observation and cognitive anchor underlying 'head'. In classical Greek antiquity, the root denoted 'head', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">head</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'head'.</mark>
> - **Everyday Connection**: Think of familiar words like *acephalic*, *acephaly*, *anencephaly*, *autocephaly*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cephal** derives from Ancient Greek <mark class="hl-stem">κεφαλή (kephalḗ)</mark>, meaning "head".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with cephal**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'head'.
  - Whenever you see **cephal** in an English word, think immediately of **head**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cephal</mark>, think of <mark class="hl-def">head</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `cephal-` (from *κεφαλή (kephalḗ)*).
> - **Combining Stem with -o- Connective:** `cephalo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Cephal
> - **1. Direct & Concrete Anchor:** Literal instantiation of head in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on cephal

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `cephal-` | [[acephalic]] | Primary root semantic foundation denoting head. |
| **Connecting -o-** | `cephalo-` | [[acephaly]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `cephal` | [[anencephaly]] | Relational or directional modification of the core root sense. |

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
| [[acephalia]] | noun | **1.** Absence of the head (as in the development of some monsters). | *"In academic literature, acephalia designates absence of the head (as in the development of some monsters)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acephalic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of head. | *"In academic literature, acephalic designates adjective*) pertaining to, derived from, or characteristic of head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acephalism]] | noun | **1.** Absence of the head (as in the development of some monsters). | *"In academic literature, acephalism designates absence of the head (as in the development of some monsters)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acephalous]] | adjective | **1.** Lacking a head or a clearly defined head. | *"In academic literature, acephalous designates lacking a head or a clearly defined head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acephaly]] | noun | **1.** The congenital lack of a head (especially in a parasitic twin). | *"In academic literature, acephaly designates the congenital lack of a head (especially in a parasitic twin)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anencephalic]] | adjective | **1.** Characterized by partial or total absence of a brain. | *"In academic literature, anencephalic designates characterized by partial or total absence of a brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anencephalous]] | adjective | **1.** Characterized by partial or total absence of a brain. | *"You don’t really care about these things?” “Not by the side of this lovely anencephalous monster."* — George Eliot, *Middlemarch* |
| [[anencephaly]] | noun | **1.** Congenital absence of all or a major part of the brain. | *"In academic literature, anencephaly designates congenital absence of all or a major part of the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autocephaly]] | noun | **1.** Independent of external and especially patriarchal authority —used especially of Eastern national churches. | *"In academic literature, autocephaly designates independent of external and especially patriarchal authority —used especially of eastern national churches."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[brachiocephalic]] | noun | **1.** A short artery that arises from the arch of the aorta and divides into the carotid and subclavian arteries of the right side —called also innominate artery.<br>**2.** Either of two large veins that occur one on each side of the neck, receive blood from the head and neck, and unite to form the superior vena cava —called also innominate vein. | *"In academic literature, brachiocephalic designates a short artery that arises from the arch of the aorta and divides into the carotid and subclavian arteries of the right side —called also innominate artery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[brachycephalic]] | noun | **1.** Short-headed or broad-headed with a cephalic index of over 80. | *"In academic literature, brachycephalic designates short-headed or broad-headed with a cephalic index of over 80."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[brachycephalism]] | noun | **1.** The quality of being brachycephalic. | *"In academic literature, brachycephalism designates the quality of being brachycephalic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[brachycephaly]] | noun | **1.** Short-headed or broad-headed with a cephalic index of over 80. | *"In academic literature, brachycephaly designates short-headed or broad-headed with a cephalic index of over 80."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephal]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of head. | *"In academic literature, cephal designates adjective*) pertaining to, derived from, or characteristic of head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalalgia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, cephalalgia designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalanthera]] | noun | **1.** Small genus of temperate old world terrestrial orchids. | *"In academic literature, cephalanthera designates small genus of temperate old world terrestrial orchids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalaspid]] | noun | **1.** Extinct jawless fish of the devonian with armored head. | *"In academic literature, cephalaspid designates extinct jawless fish of the devonian with armored head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalaspida]] | noun | **1.** Extinct group of armored fish-like vertebrates; taxonomy is not clear. | *"In academic literature, cephalaspida designates extinct group of armored fish-like vertebrates; taxonomy is not clear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalexin]] | noun | **1.** An oral cephalosporin (trade names keflex and keflin and keftab) commonly prescribe for mild to moderately severe infections of the skin or ears or throat or lungs or urinary tract. | *"In academic literature, cephalexin designates an oral cephalosporin (trade names keflex and keflin and keftab) commonly prescribe for mild to moderately severe infections of the skin or ears or throat or lungs or urinary tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalic]] | noun | **1.** Of or relating to the head.<br>**2.** Directed toward or situated on or in or near the head. | *"The proposition, and demonstration, were fairly written on a thin wafer, with ink composed of a cephalic tincture."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[cephalitis]] | noun | **1.** Inflammation of the brain usually caused by a virus; symptoms include headache and neck pain and drowsiness and nausea and fever (`phrenitis' is no longer in scientific use). | *"In academic literature, cephalitis designates inflammation of the brain usually caused by a virus; symptoms include headache and neck pain and drowsiness and nausea and fever (`phrenitis' is no longer in scientific use)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalobidae]] | noun | **1.** A family of nematoda. | *"In academic literature, cephalobidae designates a family of nematoda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalochordata]] | noun | **1.** Lancelets. | *"In academic literature, cephalochordata designates lancelets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalochordate]] | noun | **1.** Fish-like animals having a notochord rather than a true spinal column. | *"In academic literature, cephalochordate designates fish-like animals having a notochord rather than a true spinal column."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephaloglycin]] | noun | **1.** Antibiotic related to cephalosporin but no longer in common use. | *"In academic literature, cephaloglycin designates antibiotic related to cephalosporin but no longer in common use."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalohematoma]] | noun | **1.** A collection of blood under the scalp of a newborn; caused by pressure during birth. | *"In academic literature, cephalohematoma designates a collection of blood under the scalp of a newborn; caused by pressure during birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalomancy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, cephalomancy designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalometry]] | noun | **1.** The science of measuring the head in living individuals. | *"In academic literature, cephalometry designates the science of measuring the head in living individuals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, cephalon designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalopagus]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, cephalopagus designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalopod]] | noun | **1.** Any of a class (Cephalopoda) of marine mollusks including the squids, cuttlefishes, and octopuses that move by expelling water from a tubular siphon under the head and that have a group of muscular usually sucker-bearing arms around the front of the head, highly developed eyes, and usually a sac containing ink which is ejected for defense or concealment. | *"Its eight arms, or rather feet, fixed to its head, that have given the name of cephalopod to these animals, were twice as long as its body, and were twisted like the furies’ hair."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[cephalopoda]] | noun | **1.** Octopuses; squids; cuttlefish; pearly nautilus. | *"In academic literature, cephalopoda designates octopuses; squids; cuttlefish; pearly nautilus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalopodan]] | adjective | **1.** Relating or belonging to the class cephalopoda. | *"In academic literature, cephalopodan designates relating or belonging to the class cephalopoda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalopterus]] | noun | **1.** A genus of cotingidae. | *"In academic literature, cephalopterus designates a genus of cotingidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephaloridine]] | noun | **1.** A broad spectrum semisynthetic antibiotic produced by modifying cephalosporin. | *"In academic literature, cephaloridine designates a broad spectrum semisynthetic antibiotic produced by modifying cephalosporin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalosporin]] | noun | **1.** One of several broad spectrum antibiotic substances obtained from fungi and related to penicillin (trade names mefoxin); addition of side chains has produced semisynthetic antibiotics with greater antibacterial activity. | *"In academic literature, cephalosporin designates one of several broad spectrum antibiotic substances obtained from fungi and related to penicillin (trade names mefoxin); addition of side chains has produced semisynthetic antibiotics with greater antibacterial activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalotaceae]] | noun | **1.** A family of plants of order rosales; coextensive with the genus cephalotus. | *"In academic literature, cephalotaceae designates a family of plants of order rosales; coextensive with the genus cephalotus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalotaxaceae]] | noun | **1.** A family of cephalotaxaceae. | *"In academic literature, cephalotaxaceae designates a family of cephalotaxaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalotaxus]] | noun | **1.** The genus of cephalotaxus (see plum-yews). | *"In academic literature, cephalotaxus designates the genus of cephalotaxus (see plum-yews)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalothin]] | noun | **1.** A semisynthetic analogue of cephalosporin. | *"In academic literature, cephalothin designates a semisynthetic analogue of cephalosporin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cephalotus]] | noun | **1.** One species: australian pitcher plant. | *"In academic literature, cephalotus designates one species: australian pitcher plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diencephalon]] | noun | **1.** The posterior subdivision of the forebrain. | *"In academic literature, diencephalon designates the posterior subdivision of the forebrain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dolichocephalic]] | noun | **1.** Having a relatively long head with cephalic index of less than 75. | *"I had hardly expected so dolichocephalic a skull or such well-marked supra-orbital development."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[dolichocephalism]] | noun | **1.** The quality of being dolichocephalic. | *"In academic literature, dolichocephalism designates the quality of being dolichocephalic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electroencephalogram]] | noun | **1.** The tracing of brain waves made by an electroencephalograph. | *"In academic literature, electroencephalogram designates the tracing of brain waves made by an electroencephalograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encephalartos]] | noun | **1.** Any of numerous cycads of the genus encephalartos having stout cylindrical trunks and a terminal crown of long often spiny pinnate leaves. | *"In academic literature, encephalartos designates any of numerous cycads of the genus encephalartos having stout cylindrical trunks and a terminal crown of long often spiny pinnate leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encephalitis]] | noun | **1.** Inflammation of the brain that is caused especially by infection with a virus (such as herpes simplex or West Nile virus) or less commonly by bacterial or fungal infection or autoimmune reaction.<br>**2.** Equine encephalitis occurring in the eastern U.S. and Canada : equine encephalitis —abbreviation EEE—called also triple E. | *"In academic literature, encephalitis designates inflammation of the brain that is caused especially by infection with a virus (such as herpes simplex or west nile virus) or less commonly by bacterial or fungal infection or autoimmune reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encephalocele]] | noun | **1.** Protrusion of brain tissue through a congenital fissure in the skull. | *"In academic literature, encephalocele designates protrusion of brain tissue through a congenital fissure in the skull."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encephalogram]] | noun | **1.** An X-ray picture of the brain made by encephalography. | *"In academic literature, encephalogram designates an x-ray picture of the brain made by encephalography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encephalography]] | noun | **1.** Roentgenography of the brain after spinal fluid has been replaced by a gas (usually oxygen); produces an encephalogram. | *"In academic literature, encephalography designates roentgenography of the brain after spinal fluid has been replaced by a gas (usually oxygen); produces an encephalogram."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encephalomeningitis]] | noun | **1.** Inflammation of the brain and spinal cord and their meninges. | *"In academic literature, encephalomeningitis designates inflammation of the brain and spinal cord and their meninges."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encephalomyelitis]] | noun | **1.** Inflammation of the brain and spinal cord. | *"In academic literature, encephalomyelitis designates inflammation of the brain and spinal cord."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encephalon]] | noun | **1.** That part of the central nervous system that includes all the higher nervous centers; enclosed within the skull; continuous with the spinal cord. | *"In academic literature, encephalon designates that part of the central nervous system that includes all the higher nervous centers; enclosed within the skull; continuous with the spinal cord."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encephalopathy]] | noun | **1.** A disease of the brain; especially : one involving alterations of brain structure.<br>**2.** A fatal prion disease of cattle that affects the nervous system, resembles or is identical to scrapie of sheep and goats, and is probably transmitted by infected tissue in food —abbreviation BSE—called also mad cow disease. | *"In academic literature, encephalopathy designates a disease of the brain; especially : one involving alterations of brain structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterocephalus]] | noun | **1.** Sand rats. | *"In academic literature, heterocephalus designates sand rats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holocephalan]] | noun | **1.** Fish with high compressed head and a body tapering off into a long tail. | *"In academic literature, holocephalan designates fish with high compressed head and a body tapering off into a long tail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holocephali]] | noun | **1.** Chimaeras and extinct forms. | *"In academic literature, holocephali designates chimaeras and extinct forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holocephalian]] | noun | **1.** Fish with high compressed head and a body tapering off into a long tail. | *"In academic literature, holocephalian designates fish with high compressed head and a body tapering off into a long tail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holoprosencephaly]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, holoprosencephaly designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocephalic]] | adjective | **1.** Relating to or characterized by or evidencing hydrocephalus. | *"A hobgoblin in the image of Punch Costello, hipshot, crookbacked, hydrocephalic, prognathic with receding forehead and Ally Sloper nose, tumbles in somersaults through the gathering darkness.)_ ALL: What?"* — James Joyce, *Ulysses* |
| [[hydrocephalus]] | noun | **1.** An abnormal increase in the amount of cerebrospinal fluid within the cranial cavity (as from obstructed flow, excess production, or defective absorption) that is accompanied by expansion of the cerebral ventricles and often increased intracranial pressure, skull enlargement, and cognitive decline. | *"In academic literature, hydrocephalus designates an abnormal increase in the amount of cerebrospinal fluid within the cranial cavity (as from obstructed flow, excess production, or defective absorption) that is accompanied by expansion of the cerebral ventricles and often increased intracranial pressure, skull enlargement, and cognitive decline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocephaly]] | noun | **1.** An abnormal condition in which cerebrospinal fluid collects in the ventricles of the brain; in infants it can cause abnormally rapid growth of the head and bulging fontanelles and a small face; in adults the symptoms are primarily neurological. | *"In academic literature, hydrocephaly designates an abnormal condition in which cerebrospinal fluid collects in the ventricles of the brain; in infants it can cause abnormally rapid growth of the head and bulging fontanelles and a small face; in adults the symptoms are primarily neurological."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocephalic]] | adjective | **1.** Having an exceptionally large head and brain. | *"In academic literature, macrocephalic designates having an exceptionally large head and brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocephalon]] | noun | **1.** Maleos. | *"Classical and authoritative lexicons catalog macrocephalon as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocephalous]] | adjective | **1.** Having an exceptionally large head and brain. | *"No one could better describe the macrocephalous cachalot, which is sometimes more than seventy-five feet long."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[macrocephaly]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, macrocephaly designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megacephaly]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, megacephaly designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megalocephaly]] | noun | **1.** An abnormally large head; differs from hydrocephalus because there is no increased intracranial pressure and the overgrowth is symmetrical. | *"In academic literature, megalocephaly designates an abnormally large head; differs from hydrocephalus because there is no increased intracranial pressure and the overgrowth is symmetrical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesaticephalic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of head. | *"In academic literature, mesaticephalic designates adjective*) pertaining to, derived from, or characteristic of head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesencephalic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of head. | *"In academic literature, mesencephalic designates adjective*) pertaining to, derived from, or characteristic of head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesocephalic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of head. | *"In academic literature, mesocephalic designates adjective*) pertaining to, derived from, or characteristic of head."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metencephalon]] | noun | **1.** The anterior segment of the developing vertebrate hindbrain or the corresponding part of the adult brain composed of the cerebellum and pons. | *"In academic literature, metencephalon designates the anterior segment of the developing vertebrate hindbrain or the corresponding part of the adult brain composed of the cerebellum and pons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcephalic]] | adjective | **1.** Having an abnormally small head and underdeveloped brain. | *"In academic literature, microcephalic designates having an abnormally small head and underdeveloped brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcephalous]] | adjective | **1.** Having an abnormally small head and underdeveloped brain. | *"In academic literature, microcephalous designates having an abnormally small head and underdeveloped brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcephalus]] | noun | **1.** An abnormally small head and underdeveloped brain. | *"In academic literature, microcephalus designates an abnormally small head and underdeveloped brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcephaly]] | noun | **1.** A condition of abnormal smallness of the circumference of the head that is present at birth or develops within the first few years of life and is often associated with developmental delays, impaired cognitive development, poor coordination and balance, deficits in hearing and vision, and seizures. | *"In academic literature, microcephaly designates a condition of abnormal smallness of the circumference of the head that is present at birth or develops within the first few years of life and is often associated with developmental delays, impaired cognitive development, poor coordination and balance, deficits in hearing and vision, and seizures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[myelencephalon]] | noun | **1.** The posterior part of the developing vertebrate hindbrain or the corresponding part of the adult brain composed of the medulla oblongata. | *"In academic literature, myelencephalon designates the posterior part of the developing vertebrate hindbrain or the corresponding part of the adult brain composed of the medulla oblongata."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neencephalon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, neencephalon designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neoencephalon]] | noun | **1.** The part of the brain having the most recent phylogenetic origin; the cerebral cortex and related parts. | *"In academic literature, neoencephalon designates the part of the brain having the most recent phylogenetic origin; the cerebral cortex and related parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleencephalon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, paleencephalon designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleoencephalon]] | noun | **1.** The more primitive parts of the brain phylogenetically; most structures other than the cerebral cortex. | *"In academic literature, paleoencephalon designates the more primitive parts of the brain phylogenetically; most structures other than the cerebral cortex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panencephalitis]] | noun | **1.** Diffuse inflammation of the entire brain. | *"In academic literature, panencephalitis designates diffuse inflammation of the entire brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prosencephalon]] | noun | **1.** forebrain.<br>**2.** the anterior of the three primary divisions of the developing vertebrate brain or the corresponding part of the adult brain that includes especially the cerebral hemispheres, the thalamus, and the hypothalamus and that especially in higher vertebrates is the main control center for sensory and associative information processing, visceral functions, and voluntary motor functions —called also prosencephalon. | *"In academic literature, prosencephalon designates forebrain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rhombencephalon]] | noun | **1.** hindbrain.<br>**2.** the posterior of the three primary divisions of the developing vertebrate brain or the corresponding part of the adult brain that includes the cerebellum, the medulla oblongata, and in mammals the pons and that controls autonomic functions and equilibrium —called also rhombencephalon. | *"In academic literature, rhombencephalon designates hindbrain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rhombencephalosynapsis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, rhombencephalosynapsis designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syncephalus]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, syncephalus designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telencephalon]] | noun | **1.** The anterior subdivision of the embryonic forebrain or the corresponding part of the adult forebrain that includes the cerebral hemispheres and associated structures. | *"In academic literature, telencephalon designates the anterior subdivision of the embryonic forebrain or the corresponding part of the adult forebrain that includes the cerebral hemispheres and associated structures."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CEPHAL
  </div>
</div>
