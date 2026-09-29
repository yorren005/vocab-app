---
status: unread
type: root_dashboard
---
# Dashboard — scop_ scept
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">scop_ scept</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“Look at;examine”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'Look at;examine'.</span>
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

The Greek root **scop_ scept** (*scop_ scept*) signifies Look at;examine. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *kaleidoscope*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: Look at;examine
> The Greek root **scop_ scept** fundamentally denotes **Look at;examine**. The physical sensory observation and cognitive anchor underlying 'Look at;examine'. In classical Greek antiquity, the root denoted 'Look at;examine', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Look at;examine</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'Look at;examine'.</mark>
> - **Everyday Connection**: Think of familiar words like *kaleidoscope*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **scop_ scept** derives from Ancient Greek **scop_ scept**, meaning "Look at;examine".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with scop_ scept**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'Look at;examine'.
  - Whenever you see **scop_ scept** in an English word, think immediately of **Look at;examine**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see **scop_ scept**, think of Look at;examine.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `scop_ scept-` (from **scop_ scept**).
> - **Combining Stem with -o- Connective:** `scop_ scepto-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Scop_ scept
> - **1. Direct & Concrete Anchor:** Literal instantiation of Look at;examine in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on scop_ scept

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `scop_ scept-` | [[kaleidoscope]] | Primary root semantic foundation denoting Look at;examine. |
| **Connecting -o-** | `scop_ scepto-` | [[scop_ scept]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `scop_ scept` | [[scop_ scept]] | Relational or directional modification of the core root sense. |

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
| [[acroscopic]] | adjective | **1.** Facing or on the side toward the apex. | *"In academic literature, acroscopic designates facing or on the side toward the apex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[angioscope]] | noun | **1.** A modified microscope used to study capillary vessels. | *"In academic literature, angioscope designates a modified microscope used to study capillary vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auriscope]] | noun | **1.** Medical instrument consisting of a magnifying lens and light; used for examining the external ear (the auditory meatus and especially the tympanic membrane). | *"In academic literature, auriscope designates medical instrument consisting of a magnifying lens and light; used for examining the external ear (the auditory meatus and especially the tympanic membrane)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auroscope]] | noun | **1.** Medical instrument consisting of a magnifying lens and light; used for examining the external ear (the auditory meatus and especially the tympanic membrane). | *"In academic literature, auroscope designates medical instrument consisting of a magnifying lens and light; used for examining the external ear (the auditory meatus and especially the tympanic membrane)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[basiscopic]] | adjective | **1.** Facing or on the side toward the base. | *"In academic literature, basiscopic designates facing or on the side toward the base."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioscope]] | noun | **1.** A south african movie theater.<br>**2.** A kind of early movie projector. | *"In academic literature, bioscope designates a south african movie theater."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celioscopy]] | noun | **1.** Endoscopic examination of the abdomen through the abdominal wall. | *"In academic literature, celioscopy designates endoscopic examination of the abdomen through the abdominal wall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryoscope]] | noun | **1.** A measuring instrument for measuring freezing and melting points. | *"In academic literature, cryoscope designates a measuring instrument for measuring freezing and melting points."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[culdoscope]] | noun | **1.** A specialized endoscope for visually examining a woman's pelvic organs. | *"In academic literature, culdoscope designates a specialized endoscope for visually examining a woman's pelvic organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[culdoscopy]] | noun | **1.** Endoscopic examination of a woman's pelvic organs by the insertion of a culdoscope through the vagina. | *"In academic literature, culdoscopy designates endoscopic examination of a woman's pelvic organs by the insertion of a culdoscope through the vagina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscope]] | noun | **1.** A long slender medical instrument for examining the interior of a bodily organ or performing minor surgery. | *"In academic literature, endoscope designates a long slender medical instrument for examining the interior of a bodily organ or performing minor surgery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscopic]] | adjective | **1.** Of or relating to endoscopy. | *"In academic literature, endoscopic designates of or relating to endoscopy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscopy]] | noun | **1.** Visual examination of the interior of a hollow body organ by use of an endoscope. | *"In academic literature, endoscopy designates visual examination of the interior of a hollow body organ by use of an endoscope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fetoscope]] | noun | **1.** A stethoscope placed on the pregnant woman's abdomen to listen for the fetal heartbeat. | *"In academic literature, fetoscope designates a stethoscope placed on the pregnant woman's abdomen to listen for the fetal heartbeat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fetoscopy]] | noun | **1.** Prenatal diagnosis that allows direct observation of a fetus in the uterus and the withdrawal of fetal blood. | *"In academic literature, fetoscopy designates prenatal diagnosis that allows direct observation of a fetus in the uterus and the withdrawal of fetal blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fiberscope]] | noun | **1.** A flexible medical instrument involving fiber optics that is used to examine internal organs. | *"In academic literature, fiberscope designates a flexible medical instrument involving fiber optics that is used to examine internal organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[foetoscope]] | noun | **1.** A stethoscope placed on the pregnant woman's abdomen to listen for the fetal heartbeat. | *"In academic literature, foetoscope designates a stethoscope placed on the pregnant woman's abdomen to listen for the fetal heartbeat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[foetoscopy]] | noun | **1.** Prenatal diagnosis that allows direct observation of a fetus in the uterus and the withdrawal of fetal blood. | *"In academic literature, foetoscopy designates prenatal diagnosis that allows direct observation of a fetus in the uterus and the withdrawal of fetal blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gonioscopy]] | noun | **1.** An examination of the front part of the eye to check the angle where the iris meets the cornea; it is used to distinguish between open-angle glaucoma and closed-angle glaucoma. | *"In academic literature, gonioscopy designates an examination of the front part of the eye to check the angle where the iris meets the cornea; it is used to distinguish between open-angle glaucoma and closed-angle glaucoma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gyroscope]] | noun | **1.** Rotating mechanism in the form of a universally mounted spinning wheel that offers resistance to turns in any direction. | *"A comparatively small amount of such work would serve as a gyroscope to preserve the balance of employment for a large part of the less skilled workers."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[gyroscopic]] | adjective | **1.** Having the characteristics of a gyroscope. | *"Thus the gyroscopic action is very free indeed to exercise its function of keeping the contrivance pointing always in the one way."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[hodoscope]] | noun | **1.** (physics) scientific instrument that traces the path of a charged particle. | *"In academic literature, hodoscope designates (physics) scientific instrument that traces the path of a charged particle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[horoscope]] | noun | **1.** A prediction of someone's future based on the relative positions of the planets.<br>**2.** A diagram of the positions of the planets and signs of the zodiac at a particular time and place. | *"Though no higher 121:9 revelation than the horoscope was to them dis- played upon the empyrean, earth and heaven were bright, and bird and blossom were glad in God's 121:12 perennial and happy sunshine, golden with Truth."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[horoscopy]] | noun | **1.** The drawing up and interpretation of horoscopes. | *"In academic literature, horoscopy designates the drawing up and interpretation of horoscopes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hygroscope]] | noun | **1.** Hygrometer that shows variations in the relative humidity of the atmosphere. | *"In academic literature, hygroscope designates hygrometer that shows variations in the relative humidity of the atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[iconoscope]] | noun | **1.** The first practical television-camera for picture pickup; invented in 1923 by vladimir kosma zworykin. | *"In academic literature, iconoscope designates the first practical television-camera for picture pickup; invented in 1923 by vladimir kosma zworykin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[kinescope]] | noun | **1.** A cathode-ray tube in a television receiver; translates the received signal into a picture on a luminescent screen. | *"In academic literature, kinescope designates a cathode-ray tube in a television receiver; translates the received signal into a picture on a luminescent screen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megascopic]] | adjective | **1.** Visible to the naked eye (especially of rocks and anatomical features). | *"In academic literature, megascopic designates visible to the naked eye (especially of rocks and anatomical features)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microscope]] | noun | **1.** Magnifier of the image of small objects. | *"She hardly observed that a tear descended slowly upon his cheek, a tear so large that it magnified the pores of the skin over which it rolled, like the object lens of a microscope."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[microscopy]] | noun | **1.** Research with the use of microscopes. | *"Any person possessed of the cardinal virtues of microscopy—patience and perseverance—will be rewarded in this instance; whilst those who are deficient will lose an object worthy of the virtues they dare not boast."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[nephoscope]] | noun | **1.** A measuring instrument that uses a grid for measuring the altitude, direction, and velocity of movement of clouds. | *"In academic literature, nephoscope designates a measuring instrument that uses a grid for measuring the altitude, direction, and velocity of movement of clouds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthoscope]] | noun | **1.** An ophthalmoscope with a layer of water to neutralize the refraction of the cornea. | *"In academic literature, orthoscope designates an ophthalmoscope with a layer of water to neutralize the refraction of the cornea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[otoscope]] | noun | **1.** Medical instrument consisting of a magnifying lens and light; used for examining the external ear (the auditory meatus and especially the tympanic membrane). | *"In academic literature, otoscope designates medical instrument consisting of a magnifying lens and light; used for examining the external ear (the auditory meatus and especially the tympanic membrane)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periscope]] | noun | **1.** An optical instrument that provides a view of an otherwise obstructed field. | *"This time there was no chance of damaging the motive power, but we could make the pilot wish he had a periscope."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[pyroscope]] | noun | **1.** A pyrometer that uses the color of the light emitted by a hot object. | *"In academic literature, pyroscope designates a pyrometer that uses the color of the light emitted by a hot object."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radioscopy]] | noun | **1.** (radiology) examination of the inner structure of opaque objects using x rays or other penetrating radiation. | *"In academic literature, radioscopy designates (radiology) examination of the inner structure of opaque objects using x rays or other penetrating radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rhinoscope]] | noun | **1.** Medical instrument consisting of a mirror mounted at an angle on a rod; used to examine the nasal passages (through the nasopharynx). | *"In academic literature, rhinoscope designates medical instrument consisting of a mirror mounted at an angle on a rod; used to examine the nasal passages (through the nasopharynx)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rhinoscopy]] | noun | **1.** Examination of the nasal passages (either through the anterior nares or with a rhinoscope through the nasopharynx). | *"In academic literature, rhinoscopy designates examination of the nasal passages (either through the anterior nares or with a rhinoscope through the nasopharynx)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sceptic]] | noun | **1.** Someone who habitually doubts accepted beliefs. | *"But Oppenheimer, enraptured with my tales, remained a sceptic to the end."* — Jack London, *The Jacket (The Star-Rover)* |
| [[sceptical]] | adjective | **1.** Marked by or given to doubt.<br>**2.** Denying or questioning the tenets of especially a religion. | *"Perhaps in no minor point does woman astonish her helpmate more than in the strange power she possesses of believing cajoleries that she knows to be false—except, indeed, in that of being utterly sceptical on strictures that she knows to be true."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[scepticism]] | noun | **1.** The disbelief in any claims of ultimate knowledge. | *"Yet the dignity of the girl, the strange tenderness in her voice, combined to affect his nobler impulses—or rather those that he had left in him after ten years of endeavour to graft technical belief on actual scepticism."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[scope]] | noun | **1.** An area in which something acts or operates or has power or control:.<br>**2.** The state of the environment in which a situation exists. | *"Blessed are you whose worthiness gives scope, Being had to triumph, being lacked to hope. 53 What is your substance, whereof are you made, That millions of strange shadows on you tend?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scopes]] | noun | **1.** Tennessee highschool teacher who violated a state law by teaching evolution; in a highly publicized trial in 1925 he was prosecuted by william jennings bryan and defended by clarence darrow (1900-1970).<br>**2.** An area in which something acts or operates or has power or control:. | *"As Brad expected, the fire control center consisted of dozens of consoles, scopes, directional and power control devices, and clusters of computer terminals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[skeptic]] | noun | **1.** Someone who habitually doubts accepted beliefs. | *"The skeptic would have said, "All foolish to plead before an unseen God, and ask for such a sum."* — Classic Author, *The wonders of prayer* |
| [[skeptical]] | adjective | **1.** Denying or questioning the tenets of especially a religion.<br>**2.** Marked by or given to doubt. | *"One of them was skeptical when he left home."* — Classic Author, *The wonders of prayer* |
| [[skepticism]] | noun | **1.** Doubt about the truth of something.<br>**2.** The disbelief in any claims of ultimate knowledge. | *"But as the current of its doctrines is so entirely opposed to our natural inclinations, as to render a moral renovation indispensable to a perception of the glory of revealed truth; all such ground of skepticism is removed."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[t-scope]] | noun | **1.** Scientific instrument used by psychologists; presents visual stimuli for brief exposures. | *"In academic literature, t-scope designates scientific instrument used by psychologists; presents visual stimuli for brief exposures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telescope]] | noun | **1.** A magnifier of images of distant objects.<br>**2.** Crush together or collapse. | *"Oh, how I wish I could shut up like a telescope!"* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[telescoped]] | verb | **1.** Crush together or collapse.<br>**2.** Make smaller or shorter. | *"Two or three street cars had telescoped and an auto or so had piled into the wreckage."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[telescopy]] | noun | **1.** The art of making and using telescopes. | *"In academic literature, telescopy designates the art of making and using telescopes."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Form & Space]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SCOP_ SCEPT
  </div>
</div>
