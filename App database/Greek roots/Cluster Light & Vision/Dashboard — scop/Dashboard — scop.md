---
status: unread
type: root_dashboard
---
# Dashboard — scop
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">σκοπεῖν (skopeîn)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to look / observe / inspect / visual instrument”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The focused, watchful eye examining details from an elevated vantage point or through an aperture.</span>
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

The Greek root **scop** (σκοπεῖν (skopeîn), σκοπός (skopós)) signifies to look / observe / inspect / visual instrument. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *bronchoscopy*, *colonoscopy*, *cystoscopy*, *endoscope*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to look / observe / inspect / visual instrument
> The Greek root **scop** fundamentally denotes **to look / observe / inspect / visual instrument**. The focused, watchful eye examining details from an elevated vantage point or through an aperture. The Greek skopos was the military scout or target; modern science transformed the verbal root into the international suffix for precision observational instruments.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">to look / observe / inspect / visual instrument</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The focused, watchful eye examining details from an elevated vantage point or through an aperture.</mark>
> - **Everyday Connection**: Think of familiar words like *bronchoscopy*, *colonoscopy*, *cystoscopy*, *endoscope*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **scop** derives from Ancient Greek <mark class="hl-stem">σκοπεῖν (skopeîn), σκοπός (skopós)</mark>, meaning "to look / observe / inspect / visual instrument".
  - Reconstructed Indo-European origin: ***speḱ- ("to observe, watch")**.

- **The Big Picture Idea**:
  - The focused, watchful eye examining details from an elevated vantage point or through an aperture.
  - Whenever you see **scop** in an English word, think immediately of **to look / observe / inspect / visual instrument**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">scop</mark>, think of <mark class="hl-def">to look / observe / inspect / visual instrument</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `scop-` (from *σκοπεῖν (skopeîn), σκοπός (skopós)*).
> - **Combining Stem with -o- Connective:** `scopo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Scop
> - **1. Direct & Concrete Anchor:** Literal instantiation of to look / observe / inspect / visual instrument in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on scop

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `scop-` | [[bronchoscopy]] | Primary root semantic foundation denoting to look / observe / inspect / visual instrument. |
| **Connecting -o-** | `scopo-` | [[colonoscopy]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `scop` | [[cystoscopy]] | Relational or directional modification of the core root sense. |

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
| [[bronchoscopy]] | noun | **1.** A usually flexible endoscope for inspecting or passing instruments into the bronchi (as to obtain tissue for biopsy). | *"In academic literature, bronchoscopy designates a usually flexible endoscope for inspecting or passing instruments into the bronchi (as to obtain tissue for biopsy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colonoscopy]] | noun | **1.** Endoscopic examination of the colon.<br>**2.** Colonography —called also virtual colonography. | *"In academic literature, colonoscopy designates endoscopic examination of the colon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cystoscopy]] | noun | **1.** A rigid endoscope for inspecting and passing instruments into the urethra and bladder. | *"In academic literature, cystoscopy designates a rigid endoscope for inspecting and passing instruments into the urethra and bladder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscope]] | noun | **1.** An illuminated usually fiber-optic flexible or rigid tubular instrument for visualizing the interior of a hollow organ or part (such as the bladder or esophagus) for diagnostic or therapeutic purposes that typically has one or more channels to enable passage of instruments (such as forceps or scissors). | *"In academic literature, endoscope designates an illuminated usually fiber-optic flexible or rigid tubular instrument for visualizing the interior of a hollow organ or part (such as the bladder or esophagus) for diagnostic or therapeutic purposes that typically has one or more channels to enable passage of instruments (such as forceps or scissors)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscopic]] | noun | **1.** Of, relating to, or performed by means of an endoscope or endoscopy. | *"In academic literature, endoscopic designates of, relating to, or performed by means of an endoscope or endoscopy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscopy]] | noun | **1.** An illuminated usually fiber-optic flexible or rigid tubular instrument for visualizing the interior of a hollow organ or part (such as the bladder or esophagus) for diagnostic or therapeutic purposes that typically has one or more channels to enable passage of instruments (such as forceps or scissors). | *"In academic literature, endoscopy designates an illuminated usually fiber-optic flexible or rigid tubular instrument for visualizing the interior of a hollow organ or part (such as the bladder or esophagus) for diagnostic or therapeutic purposes that typically has one or more channels to enable passage of instruments (such as forceps or scissors)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[episcopacy]] | noun | **1.** The collective body of bishops. | *"In academic literature, episcopacy designates the collective body of bishops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[episcopal]] | adjective | **1.** Of or pertaining to or characteristic of the episcopal church.<br>**2.** Denoting or governed by or relating to a bishop or bishops. | *"Some quarrel the Presbyter gown, Some quarrel Episcopal graithing; But every good fellow will own Their quarrel is a’ about—naething."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[episcopalian]] | noun | **1.** A member of the episcopal church.<br>**2.** Of or pertaining to or characteristic of the episcopal church. | *"When Pentecost comes to us we are all lifted upon one grand common platform and shake hands and shout and weep and laugh and get so mixed up that a Presbyterian can not be distinguished from a Methodist, nor a Friend from an Episcopalian vestryman."* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[episcopalianism]] | noun | **1.** The theological doctrine of church government by bishops. | *"In academic literature, episcopalianism designates the theological doctrine of church government by bishops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[episcopate]] | noun | **1.** The term of office of a bishop.<br>**2.** The territorial jurisdiction of a bishop. | *"In academic literature, episcopate designates the term of office of a bishop."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[laparoscopy]] | noun | **1.** Visual examination of the abdomen by means of a laparoscope.<br>**2.** An operation (such as tubal ligation or gallbladder removal) involving laparoscopy. | *"In academic literature, laparoscopy designates visual examination of the abdomen by means of a laparoscope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroscopic]] | noun | **1.** Observable by the naked eye.<br>**2.** Involving large units or elements. | *"In academic literature, macroscopic designates observable by the naked eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroscopical]] | adjective | **1.** Visible to the naked eye; using the naked eye.<br>**2.** Large enough to be visible with the naked eye. | *"In academic literature, macroscopical designates visible to the naked eye; using the naked eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroscopically]] | adverb | **1.** Without using a microscope. | *"In academic literature, macroscopically designates without using a microscope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megascopic]] | adjective | **1.** Visible to the naked eye (especially of rocks and anatomical features). | *"In academic literature, megascopic designates visible to the naked eye (especially of rocks and anatomical features)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microscope]] | noun | **1.** An optical instrument consisting of a lens or combination of lenses for making enlarged images of minute objects; especially : compound microscope.<br>**2.** A non-optical instrument (such as one using radiations other than light or using vibrations) for making enlarged images of minute objects. | *"She hardly observed that a tear descended slowly upon his cheek, a tear so large that it magnified the pores of the skin over which it rolled, like the object lens of a microscope."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[microscopic]] | noun | **1.** Resembling a microscope especially in perception.<br>**2.** Invisible or indistinguishable without the use of a microscope. | *"As the inimical plant could only be present in very microscopic dimensions to have escaped ordinary observation, to find it seemed rather a hopeless attempt in the stretch of rich grass before them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[microscopical]] | adjective | **1.** Of or relating to or used in microscopy.<br>**2.** Visible under a microscope; using a microscope. | *"Some cable-lengths off the shores of the Island of Clermont I admired the gigantic work accomplished by these microscopical workers."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[microscopically]] | adverb | **1.** By using a microscope; so as to be visible only with a microscope; as seen with a microscope.<br>**2.** As if by using a microscope; with extreme precision and attention to detail; in minute detail. | *"FeS (copper 71·7 per cent.), when examined microscopically, appeared to be homogeneous, and indicated some form of combination between the sulphides in these proportions."* — Donald M. Levy, *Modern Copper Smelting* |
| [[microscopist]] | noun | **1.** A scientist who specializes in research with the use of microscopes. | *"There are not many features in the rest of the species of this genus of sufficient interest to the general reader or microscopist to render it advisable to furnish any detailed account of them."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[microscopium]] | noun | **1.** A faint constellation in the southern hemisphere near sagittarius and capricornus. | *"In academic literature, microscopium designates a faint constellation in the southern hemisphere near sagittarius and capricornus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microscopy]] | noun | **1.** Research with the use of microscopes. | *"Any person possessed of the cardinal virtues of microscopy—patience and perseverance—will be rewarded in this instance; whilst those who are deficient will lose an object worthy of the virtues they dare not boast."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[orthoscope]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek orth.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, orthoscope designates a term designating an entity, condition, or phenomenon derived from greek orth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periscope]] | noun | **1.** A tubular optical instrument containing lenses and mirrors by which an observer obtains an otherwise obstructed field of view. | *"This time there was no chance of damaging the motive power, but we could make the pilot wish he had a periscope."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[scopal]] | adjective | **1.** Of or relating to scope. | *"In academic literature, scopal designates of or relating to scope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scope]] | noun | **1.** Intention, object.<br>**2.** Space or opportunity for unhampered motion, activity, or thought. | *"Blessed are you whose worthiness gives scope, Being had to triumph, being lacked to hope. 53 What is your substance, whereof are you made, That millions of strange shadows on you tend?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scopes]] | noun | **1.** Tennessee highschool teacher who violated a state law by teaching evolution; in a highly publicized trial in 1925 he was prosecuted by william jennings bryan and defended by clarence darrow (1900-1970).<br>**2.** An area in which something acts or operates or has power or control:. | *"As Brad expected, the fire control center consisted of dozens of consoles, scopes, directional and power control devices, and clusters of computer terminals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[scopolamine]] | noun | **1.** An alkaloid with anticholinergic effects that is used as a sedative and to treat nausea and to dilate the pupils in ophthalmic procedures. | *"In academic literature, scopolamine designates an alkaloid with anticholinergic effects that is used as a sedative and to treat nausea and to dilate the pupils in ophthalmic procedures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scopolia]] | noun | **1.** Genus of european perennial herbs yielding medicinal alkaloids. | *"In academic literature, scopolia designates genus of european perennial herbs yielding medicinal alkaloids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[skopein]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek scop.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, skopein designates a term designating an entity, condition, or phenomenon derived from greek scop."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telescope]] | noun | **1.** A usually tubular optical instrument for viewing distant objects by means of the refraction of light rays through a lens or the reflection of light rays by a concave mirror.<br>**2.** Any of various tubular magnifying optical instruments. | *"Oh, how I wish I could shut up like a telescope!"* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[telescoped]] | verb | **1.** Crush together or collapse.<br>**2.** Make smaller or shorter. | *"Two or three street cars had telescoped and an auto or so had piled into the wreckage."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[telescopic]] | noun | **1.** Of, relating to, or performed with a telescope.<br>**2.** Suitable for seeing or magnifying distant objects. | *"Was there any ingenious plot, any hide-and-seek course of action, which might be detected by a careful telescopic watch?"* — George Eliot, *Middlemarch* |
| [[telescopically]] | adverb | **1.** In a telescopic manner. | *"In academic literature, telescopically designates in a telescopic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telescopium]] | noun | **1.** A small constellation in the southern hemisphere near ara. | *"In academic literature, telescopium designates a small constellation in the southern hemisphere near ara."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telescopy]] | noun | **1.** The art of making and using telescopes. | *"In academic literature, telescopy designates the art of making and using telescopes."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Light & Vision]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SCOP
  </div>
</div>
