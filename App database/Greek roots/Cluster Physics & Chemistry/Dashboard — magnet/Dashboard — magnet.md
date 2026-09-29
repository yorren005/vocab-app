---
status: unread
type: root_dashboard
---
# Dashboard — magnet
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">μάγνης μάγνητος (mágnēs</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“lodestone”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'lodestone'.</span>
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

The Greek root **magnet** (μάγνης μάγνητος (mágnēs, mágnētos)) signifies lodestone. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *bioelectromagnetism*, *biomagnetism*, *diamagnetic*, *diamagnetism*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: lodestone
> The Greek root **magnet** fundamentally denotes **lodestone**. The physical sensory observation and cognitive anchor underlying 'lodestone'. In classical Greek antiquity, the root denoted 'lodestone', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">lodestone</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'lodestone'.</mark>
> - **Everyday Connection**: Think of familiar words like *bioelectromagnetism*, *biomagnetism*, *diamagnetic*, *diamagnetism*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **magnet** derives from Ancient Greek <mark class="hl-stem">μάγνης μάγνητος (mágnēs, mágnētos)</mark>, meaning "lodestone".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with magnet**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'lodestone'.
  - Whenever you see **magnet** in an English word, think immediately of **lodestone**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">magnet</mark>, think of <mark class="hl-def">lodestone</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `magnet-` (from *μάγνης μάγνητος (mágnēs, mágnētos)*).
> - **Combining Stem with -o- Connective:** `magneto-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Magnet
> - **1. Direct & Concrete Anchor:** Literal instantiation of lodestone in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on magnet

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `magnet-` | [[bioelectromagnetism]] | Primary root semantic foundation denoting lodestone. |
| **Connecting -o-** | `magneto-` | [[biomagnetism]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `magnet` | [[diamagnetic]] | Relational or directional modification of the core root sense. |

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
| [[antimagnetic]] | adjective | **1.** Impervious to the effects of a magnetic field; resistant to magnetization. | *"In academic literature, antimagnetic designates impervious to the effects of a magnetic field; resistant to magnetization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bioelectromagnetism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek magnet.<br>**2.** Specialized application within the domain of Physics & Chemistry. | *"In academic literature, bioelectromagnetism designates a term designating an entity, condition, or phenomenon derived from greek magnet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biomagnetism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek magnet.<br>**2.** Specialized application within the domain of Physics & Chemistry. | *"In academic literature, biomagnetism designates a term designating an entity, condition, or phenomenon derived from greek magnet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetisation]] | noun | **1.** The process of removing magnetization. | *"In academic literature, demagnetisation designates the process of removing magnetization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetise]] | verb | **1.** Erase (a magnetic storage device).<br>**2.** Make nonmagnetic; take away the magnetic properties (of). | *"In academic literature, demagnetise designates erase (a magnetic storage device)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetization]] | noun | **1.** The process of removing magnetization. | *"In academic literature, demagnetization designates the process of removing magnetization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demagnetize]] | verb | **1.** Erase (a magnetic storage device).<br>**2.** Make nonmagnetic; take away the magnetic properties (of). | *"In academic literature, demagnetize designates erase (a magnetic storage device)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diamagnet]] | noun | **1.** A substance that exhibits diamagnetism. | *"In academic literature, diamagnet designates a substance that exhibits diamagnetism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diamagnetic]] | noun | **1.** Having a magnetic permeability less than that of a vacuum : slightly repelled by a magnet. | *"In academic literature, diamagnetic designates having a magnetic permeability less than that of a vacuum : slightly repelled by a magnet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diamagnetism]] | noun | **1.** Having a magnetic permeability less than that of a vacuum : slightly repelled by a magnet. | *"In academic literature, diamagnetism designates having a magnetic permeability less than that of a vacuum : slightly repelled by a magnet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromagnet]] | noun | **1.** A core of magnetic material (such as iron) surrounded by a coil of wire through which an electric current is passed to magnetize the core. | *"In academic literature, electromagnet designates a core of magnetic material (such as iron) surrounded by a coil of wire through which an electric current is passed to magnetize the core."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromagnetic]] | noun | **1.** Of, relating to, or produced by electromagnetism.<br>**2.** A pulse of high-intensity electromagnetic radiation generated especially by a nuclear blast high above the earth's surface and held to disrupt electronic and electrical systems —abbreviation EMP. | *"In academic literature, electromagnetic designates of, relating to, or produced by electromagnetism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electromagnetism]] | noun | **1.** Magnetism produced by an electric current.<br>**2.** The branch of physics concerned with electromagnetic phenomena. | *"In academic literature, electromagnetism designates magnetism produced by an electric current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geomagnetic]] | noun | **1.** Of or relating to terrestrial magnetism.<br>**2.** Magnetic storm. | *"In academic literature, geomagnetic designates of or relating to terrestrial magnetism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnesium]] | noun | **1.** A silver-white malleable ductile light metallic element that occurs abundantly in nature and is used in metallurgical and chemical processes, in photography, signaling, and pyrotechnics because of the intense white light it produces on burning, and in construction especially in the form of light alloys.<br>**2.** A carbonate of magnesium; especially : a white crystalline salt MgCO3 that occurs naturally as dolomite and magnesite. | *"In a thousand grammes are found 96½ per cent. of water, and about 2-2/3 per cent. of chloride of sodium; then, in a smaller quantity, chlorides of magnesium and of potassium, bromide of magnesium, sulphate of magnesia, sulphate and carbonate of lime."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[magnet]] | noun | **1.** lodestone.<br>**2.** a body having the property of attracting iron and producing a magnetic field external to itself; specifically : a mass of iron, steel, or alloy that has this property artificially imparted. | *"Neither of these returnings was very pleasant or desirable: no magnet drew me to a given point, increasing in its strength of attraction the nearer I came."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[magnetic]] | noun | **1.** Possessing an extraordinary power or ability to attract.<br>**2.** Of or relating to a magnet or to magnetism. | *"M. de Clairon, who was by my side, murmured something about a magnetic current; but when I asked him sternly by what set in motion, his voice died away in his moustache."* — Mrs. Oliphant, *A Beleaguered City* |
| [[magnetically]] | adverb | **1.** By the use of magnetism.<br>**2.** As if by magnetism. | *"Good!” cried Ahab, with a wild approval in his tones; observing the hearty animation into which his unexpected question had so magnetically thrown them."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[magnetics]] | noun | **1.** The branch of science that studies magnetism. | *"In academic literature, magnetics designates the branch of science that studies magnetism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetisation]] | noun | **1.** The extent or degree to which something is magnetized.<br>**2.** The process that makes a substance magnetic (temporarily or permanently). | *"In academic literature, magnetisation designates the extent or degree to which something is magnetized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetise]] | verb | **1.** Attract strongly, as if with a magnet.<br>**2.** Make magnetic. | *"The effect of the discharge half-a-mile away was to _de_magnetise the core slightly."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[magnetised]] | verb | **1.** Attract strongly, as if with a magnet.<br>**2.** Make magnetic. | *"Indeed, it is not too much to say that the maritime commerce of the world was based upon the behaviour of that little piece of magnetised steel."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[magnetism]] | noun | **1.** A class of physical phenomena that include the attraction for iron observed in lodestone and a magnet, are inseparably associated with moving electricity, are exhibited by both magnets and electric currents, and are characterized by fields of force.<br>**2.** A science that deals with magnetic phenomena. | *"But as ever before, the pagan harpooneers remained almost wholly unimpressed; or if impressed, it was only with a certain magnetism shot into their congenial hearts from inflexible Ahab’s."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[magnetite]] | noun | **1.** A black isometric mineral of the spinel group that is an oxide of iron and an important iron ore. | *"In academic literature, magnetite designates a black isometric mineral of the spinel group that is an oxide of iron and an important iron ore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetization]] | noun | **1.** The extent or degree to which something is magnetized.<br>**2.** The process that makes a substance magnetic (temporarily or permanently). | *"In academic literature, magnetization designates the extent or degree to which something is magnetized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetize]] | noun | **1.** To induce magnetic properties in.<br>**2.** To attract like a magnet : charm. | *"Might and wrong combined, like iron magnetized, are endowed with irresistible attraction."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[magnetized]] | verb | **1.** Make magnetic.<br>**2.** Attract strongly, as if with a magnet. | *"Might and wrong combined, like iron magnetized, are endowed with irresistible attraction."* — Nathaniel Hawthorne, *The House of the Seven Gables* |
| [[magneto]] | noun | **1.** A small dynamo with a secondary winding that produces a high voltage enabling a spark to jump between the poles of a spark plug in a gasoline engine. | *"In academic literature, magneto designates a small dynamo with a secondary winding that produces a high voltage enabling a spark to jump between the poles of a spark plug in a gasoline engine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetobiology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek magnet.<br>**2.** Specialized application within the domain of Physics & Chemistry. | *"In academic literature, magnetobiology designates a term designating an entity, condition, or phenomenon derived from greek magnet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetograph]] | noun | **1.** A scientific instrument that registers magnetic variations (especially variations of the earth's magnetic field). | *"In academic literature, magnetograph designates a scientific instrument that registers magnetic variations (especially variations of the earth's magnetic field)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetohydrodynamics]] | noun | **1.** The study of the interaction of magnetic fields and electrically conducting fluids (as plasma or molten metal). | *"In academic literature, magnetohydrodynamics designates the study of the interaction of magnetic fields and electrically conducting fluids (as plasma or molten metal)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetologist]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek magnet.<br>**2.** Specialized application within the domain of Physics & Chemistry. | *"In academic literature, magnetologist designates a term designating an entity, condition, or phenomenon derived from greek magnet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetometer]] | noun | **1.** An instrument used to detect the presence of a metallic object or to measure the intensity of a magnetic field. | *"In academic literature, magnetometer designates an instrument used to detect the presence of a metallic object or to measure the intensity of a magnetic field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magneton]] | noun | **1.** A unit of magnetic moment of a molecular or atomic or subatomic particle. | *"In academic literature, magneton designates a unit of magnetic moment of a molecular or atomic or subatomic particle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetosome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek magnet.<br>**2.** Specialized application within the domain of Physics & Chemistry. | *"In academic literature, magnetosome designates a term designating an entity, condition, or phenomenon derived from greek magnet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetosphere]] | noun | **1.** The magnetic field of a planet; the volume around the planet in which charged particles are subject more to the planet's magnetic field than to the solar magnetic field. | *"In academic literature, magnetosphere designates the magnetic field of a planet; the volume around the planet in which charged particles are subject more to the planet's magnetic field than to the solar magnetic field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnetron]] | noun | **1.** A diode vacuum tube in which the flow of electrons from a central cathode to a cylindrical anode is controlled by crossed magnetic and electric fields; used mainly in microwave oscillators. | *"In academic literature, magnetron designates a diode vacuum tube in which the flow of electrons from a central cathode to a cylindrical anode is controlled by crossed magnetic and electric fields; used mainly in microwave oscillators."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[manganese]] | noun | **1.** A grayish-white usually hard and brittle metallic element that resembles iron but is not magnetic and is used especially in alloys, batteries, and plant fertilizers.<br>**2.** A dark insoluble compound MnO2 used especially as an oxidizing agent, as a depolarizer of dry cells, and in making glass and ceramics. | *"Brother Peter,” he said, in a wheedling yet gravely official tone, “It’s nothing but right I should speak to you about the Three Crofts and the Manganese."* — George Eliot, *Middlemarch* |
| [[paramagnet]] | noun | **1.** Magnet made of a substance whose magnetization is proportional to the strength of the magnetic field applied to it. | *"In academic literature, paramagnet designates magnet made of a substance whose magnetization is proportional to the strength of the magnetic field applied to it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramagnetic]] | noun | **1.** Being or relating to a magnetizable substance (such as aluminum) that has small but positive susceptibility which varies little with magnetizing force. | *"In academic literature, paramagnetic designates being or relating to a magnetizable substance (such as aluminum) that has small but positive susceptibility which varies little with magnetizing force."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paramagnetism]] | noun | **1.** Being or relating to a magnetizable substance (such as aluminum) that has small but positive susceptibility which varies little with magnetizing force. | *"In academic literature, paramagnetism designates being or relating to a magnetizable substance (such as aluminum) that has small but positive susceptibility which varies little with magnetizing force."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Physics & Chemistry]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MAGNET
  </div>
</div>
