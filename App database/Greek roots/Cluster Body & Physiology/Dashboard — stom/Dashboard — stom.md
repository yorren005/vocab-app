---
status: unread
type: root_dashboard
---
# Dashboard — stom
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">στόμα</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“mouth”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'mouth'.</span>
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

The Greek root **stom** (στόμα, στόματος (stóma, stómatos)) signifies mouth. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *-stome*, *anastomosis*, *anastomotic*, *deuterostome*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: mouth
> The Greek root **stom** fundamentally denotes **mouth**. The physical sensory observation and cognitive anchor underlying 'mouth'. In classical Greek antiquity, the root denoted 'mouth', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">mouth</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'mouth'.</mark>
> - **Everyday Connection**: Think of familiar words like *-stome*, *anastomosis*, *anastomotic*, *deuterostome*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **stom** derives from Ancient Greek <mark class="hl-stem">στόμα, στόματος (stóma, stómatos)</mark>, meaning "mouth".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with stom**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'mouth'.
  - Whenever you see **stom** in an English word, think immediately of **mouth**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">stom</mark>, think of <mark class="hl-def">mouth</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `stom-` (from *στόμα, στόματος (stóma, stómatos)*).
> - **Combining Stem with -o- Connective:** `stomo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Stom
> - **1. Direct & Concrete Anchor:** Literal instantiation of mouth in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on stom

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `stom-` | [[-stome]] | Primary root semantic foundation denoting mouth. |
| **Connecting -o-** | `stomo-` | [[anastomosis]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `stom` | [[anastomotic]] | Relational or directional modification of the core root sense. |

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
| [[-stome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek stom.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, -stome designates a term designating an entity, condition, or phenomenon derived from greek stom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anastomose]] | verb | **1.** Come together or open into each other.<br>**2.** Cause to join or open into each other by anastomosis. | *"The vegetative system of the “rust,” and similar fungi, consists of a number of delicate, simple, or branched threads, often intertwining and anastomosing, or uniting one to the other by means of lateral branchlets."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[anastomosis]] | noun | **1.** The union of parts or branches (as of streams, blood vessels, or leaf veins) so as to intercommunicate or interconnect.<br>**2.** A product of anastomosis : network. | *"In academic literature, anastomosis designates the union of parts or branches (as of streams, blood vessels, or leaf veins) so as to intercommunicate or interconnect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anastomotic]] | noun | **1.** The union of parts or branches (as of streams, blood vessels, or leaf veins) so as to intercommunicate or interconnect.<br>**2.** A product of anastomosis : network. | *"In academic literature, anastomotic designates the union of parts or branches (as of streams, blood vessels, or leaf veins) so as to intercommunicate or interconnect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anastomus]] | noun | **1.** Openbills. | *"In academic literature, anastomus designates openbills."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astomatal]] | adjective | **1.** Lacking a stoma or stomata. | *"In academic literature, astomatal designates lacking a stoma or stomata."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astomatous]] | adjective | **1.** Having no mouth or mouthlike opening. | *"In academic literature, astomatous designates having no mouth or mouthlike opening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deuterostome]] | noun | **1.** Any of a major division (Deuterostomia) of the animal kingdom that includes the bilaterally symmetrical animals (such as the chordates) with indeterminate cleavage and a mouth that does not arise from the blastopore. | *"In academic literature, deuterostome designates any of a major division (deuterostomia) of the animal kingdom that includes the bilaterally symmetrical animals (such as the chordates) with indeterminate cleavage and a mouth that does not arise from the blastopore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eustoma]] | noun | **1.** Small genus of herbs of warm regions of southern north america to northern south america. | *"In academic literature, eustoma designates small genus of herbs of warm regions of southern north america to northern south america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microstomus]] | noun | **1.** A genus of pleuronectidae. | *"In academic literature, microstomus designates a genus of pleuronectidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monostomous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of mouth. | *"In academic literature, monostomous designates adjective*) pertaining to, derived from, or characteristic of mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ozostomia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek stom.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, ozostomia designates a term designating an entity, condition, or phenomenon derived from greek stom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentastomid]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek stom.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, pentastomid designates a term designating an entity, condition, or phenomenon derived from greek stom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peristome]] | noun | **1.** (botany) fringe of toothlike appendages surrounding the mouth of a moss capsule.<br>**2.** Region around the mouth in various invertebrates. | *"The teeth thus formed resemble those of the peristome of some mosses."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[protostome]] | noun | **1.** Any of a major group (Protostomia) of bilateral metazoan animals (such as mollusks, annelids, and arthropods) characterized in typical forms by determinate and spiral cleavage, formation of a mouth and anus directly from the blastopore, and formation of the coelom by splitting of the embryonic mesoderm. | *"In academic literature, protostome designates any of a major group (protostomia) of bilateral metazoan animals (such as mollusks, annelids, and arthropods) characterized in typical forms by determinate and spiral cleavage, formation of a mouth and anus directly from the blastopore, and formation of the coelom by splitting of the embryonic mesoderm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stoma]] | noun | **1.** One of the minute openings in the epidermis of a plant organ (such as a leaf) through which gaseous interchange takes place; also : the opening with its associated cellular structures.<br>**2.** A small simple opening in or on the body of an animal. | *"In academic literature, stoma designates one of the minute openings in the epidermis of a plant organ (such as a leaf) through which gaseous interchange takes place; also : the opening with its associated cellular structures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomach]] | noun | **1.** A saclike expansion of the digestive tract of a vertebrate that is located between the esophagus and duodenum and typically consists of a simple often curved sac with an outer serous covering, a strong muscular wall that contracts rhythmically, and an inner mucous membrane lining that contains gastric glands.<br>**2.** One of the compartments making up the stomach of a ruminant animal (such as a cow or sheep). | *"Virginity breeds mites, much like a cheese; consumes itself to the very paring, and so dies with feeding his own stomach."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stomachache]] | noun | **1.** An ache localized in the stomach or abdominal region. | *"In academic literature, stomachache designates an ache localized in the stomach or abdominal region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomachal]] | adjective | **1.** Relating to or involving the stomach. | *"In academic literature, stomachal designates relating to or involving the stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomacher]] | noun | **1.** Garment consisting of a v-shaped panel of stiff material worn over the chest and stomach in the 16th century. | *"Rouncewell’s calm hands lose their composure when she speaks of him, and unfolding themselves from her stomacher, hover about her in an agitated manner as she says what a likely lad, what a fine lad, what a gay, good-humoured, clever lad he was!"* — Charles Dickens, *Bleak House* |
| [[stomachic]] | adjective | **1.** Relating to or involving the stomach. | *"The house has not done so much in the stomachic article of cloves or in brandy-and-water warm since the inquest."* — Charles Dickens, *Bleak House* |
| [[stomatal]] | adjective | **1.** Relating to or of the nature of or having a mouth or mouthlike opening.<br>**2.** Relating to or constituting plant stomata. | *"In academic literature, stomatal designates relating to or of the nature of or having a mouth or mouthlike opening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomatalgia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek stom.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, stomatalgia designates a term designating an entity, condition, or phenomenon derived from greek stom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomate]] | noun | **1.** A minute epidermal pore in a leaf or stem through which gases and water vapor can pass. | *"In academic literature, stomate designates a minute epidermal pore in a leaf or stem through which gases and water vapor can pass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomatic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of mouth. | *"In academic literature, stomatic designates adjective*) pertaining to, derived from, or characteristic of mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomatitis]] | noun | **1.** Any of numerous inflammatory diseases of the mouth.<br>**2.** An acute viral disease especially of various domesticated animals (such as horses and cows) that resembles foot-and-mouth disease, is marked by erosive blisters in and about the mouth, and is caused by any of three rhabdoviruses (Vesiculovirus alagoas, V. indiana, and V. newjersey) which sometimes infect humans producing flu-like symptoms. | *"In academic literature, stomatitis designates any of numerous inflammatory diseases of the mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomatoplasty]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek stom.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, stomatoplasty designates a term designating an entity, condition, or phenomenon derived from greek stom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomatopod]] | noun | **1.** A kind of crustacean. | *"In academic literature, stomatopod designates a kind of crustacean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomatopoda]] | noun | **1.** Mantis shrimps. | *"In academic literature, stomatopoda designates mantis shrimps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stomatous]] | adjective | **1.** Relating to or of the nature of or having a mouth or mouthlike opening.<br>**2.** Relating to or constituting plant stomata. | *"In academic literature, stomatous designates relating to or of the nature of or having a mouth or mouthlike opening."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · STOM
  </div>
</div>
