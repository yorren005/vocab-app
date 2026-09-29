---
status: unread
type: root_dashboard
---
# Dashboard — orth
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ὀρθός ὀρθότης (orthós)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“straight”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'straight'.</span>
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

The Greek root **orth** (ὀρθός ὀρθότης (orthós)) signifies straight. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *orth*, *orthocenter*, *orthocentric*, *orthodontia*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: straight
> The Greek root **orth** fundamentally denotes **straight**. The physical sensory observation and cognitive anchor underlying 'straight'. In classical Greek antiquity, the root denoted 'straight', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">straight</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'straight'.</mark>
> - **Everyday Connection**: Think of familiar words like *orth*, *orthocenter*, *orthocentric*, *orthodontia*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **orth** derives from Ancient Greek <mark class="hl-stem">ὀρθός ὀρθότης (orthós)</mark>, meaning "straight".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with orth**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'straight'.
  - Whenever you see **orth** in an English word, think immediately of **straight**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">orth</mark>, think of <mark class="hl-def">straight</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `orth-` (from *ὀρθός ὀρθότης (orthós)*).
> - **Combining Stem with -o- Connective:** `ortho-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Orth
> - **1. Direct & Concrete Anchor:** Literal instantiation of straight in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on orth

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `orth-` | [[orth]] | Primary root semantic foundation denoting straight. |
| **Connecting -o-** | `ortho-` | [[orthocenter]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `orth` | [[orthocentric]] | Relational or directional modification of the core root sense. |

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
| [[anorthic]] | adjective | **1.** Having three unequal crystal axes intersecting at oblique angles. | *"In academic literature, anorthic designates having three unequal crystal axes intersecting at oblique angles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anorthite]] | noun | **1.** Rare plagioclastic feldspar occurring in many igneous rocks. | *"In academic literature, anorthite designates rare plagioclastic feldspar occurring in many igneous rocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anorthitic]] | adjective | **1.** Characteristic of anorthite. | *"In academic literature, anorthitic designates characteristic of anorthite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anorthography]] | noun | **1.** A loss of the ability to write or to express thoughts in writing because of a brain lesion. | *"In academic literature, anorthography designates a loss of the ability to write or to express thoughts in writing because of a brain lesion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anorthopia]] | noun | **1.** Distorted vision in which straight lines appear curved. | *"In academic literature, anorthopia designates distorted vision in which straight lines appear curved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orth]] | noun | **1.** Straight : upright : vertical.<br>**2.** Perpendicular. | *"I did think so too, and would account I had a great penn’orth on’t, to give half my state, that both she and I at this present stood unfeignedly on the same terms."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[orthicon]] | noun | **1.** A now obsolete picture pickup tube in a television camera; electrons emitted from a photoemissive surface in proportion to the intensity of the incident light are focused onto the target causing secondary emission of electrons. | *"In academic literature, orthicon designates a now obsolete picture pickup tube in a television camera; electrons emitted from a photoemissive surface in proportion to the intensity of the incident light are focused onto the target causing secondary emission of electrons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthilia]] | noun | **1.** A shrubby perennial rhizomatous evergreen herb; grows in damp coniferous woodlands in northern temperate regions. | *"In academic literature, orthilia designates a shrubby perennial rhizomatous evergreen herb; grows in damp coniferous woodlands in northern temperate regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthocenter]] | noun | **1.** The common intersection of the three altitudes of a triangle or their extensions or of the several altitudes of a polyhedron provided these latter exist and meet in a point. | *"In academic literature, orthocenter designates the common intersection of the three altitudes of a triangle or their extensions or of the several altitudes of a polyhedron provided these latter exist and meet in a point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthocentric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of straight. | *"In academic literature, orthocentric designates adjective*) pertaining to, derived from, or characteristic of straight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthochorea]] | noun | **1.** A form of chorea in which spasms occur mainly when the patient is erect. | *"In academic literature, orthochorea designates a form of chorea in which spasms occur mainly when the patient is erect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthoclase]] | noun | **1.** A monoclinic mineral of the feldspar group consisting of a silicate of potassium and aluminum. | *"In academic literature, orthoclase designates a monoclinic mineral of the feldspar group consisting of a silicate of potassium and aluminum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthodontia]] | noun | **1.** Orthodontics.<br>**2.** Dental appliances (such as braces) used in orthodontic treatment. | *"In academic literature, orthodontia designates orthodontics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthodontic]] | noun | **1.** A branch of dentistry dealing with irregularities of the teeth (such as malocclusion) and their correction (as by braces); also : the treatment provided by a specialist in orthodontics. | *"In academic literature, orthodontic designates a branch of dentistry dealing with irregularities of the teeth (such as malocclusion) and their correction (as by braces); also : the treatment provided by a specialist in orthodontics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthodontics]] | noun | **1.** A branch of dentistry dealing with irregularities of the teeth (such as malocclusion) and their correction (as by braces); also : the treatment provided by a specialist in orthodontics. | *"In academic literature, orthodontics designates a branch of dentistry dealing with irregularities of the teeth (such as malocclusion) and their correction (as by braces); also : the treatment provided by a specialist in orthodontics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthodontist]] | noun | **1.** A branch of dentistry dealing with irregularities of the teeth (such as malocclusion) and their correction (as by braces); also : the treatment provided by a specialist in orthodontics. | *"In academic literature, orthodontist designates a branch of dentistry dealing with irregularities of the teeth (such as malocclusion) and their correction (as by braces); also : the treatment provided by a specialist in orthodontics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthodonture]] | noun | **1.** The branch of dentistry dealing with the prevention or correction of irregularities of the teeth. | *"In academic literature, orthodonture designates the branch of dentistry dealing with the prevention or correction of irregularities of the teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthodox]] | noun | **1.** Conforming to established doctrine especially in religion.<br>**2.** Conventional. | *"That day, after evening prayers, I took L---- by the arm, for a walk to "Orthodox point," a tree about a mile distant from the Seminary."* — Classic Author, *The wonders of prayer* |
| [[orthodoxy]] | noun | **1.** The quality or state of being orthodox.<br>**2.** An orthodox belief or practice. | *"In fact, I revert to the traditional view of Jupiter, recant my heresy, and am gathered like a lost sheep into the fold of mythological orthodoxy."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[orthoepist]] | noun | **1.** A practitioner of orthoepy (especially one of the 17th or 18th century scholars who proposed to reform english spelling so it would reflect pronunciation more closely). | *"In academic literature, orthoepist designates a practitioner of orthoepy (especially one of the 17th or 18th century scholars who proposed to reform english spelling so it would reflect pronunciation more closely)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthoepy]] | noun | **1.** The way a word or a language is customarily spoken.<br>**2.** A term formerly used for the part of phonology that dealt with the `correct' pronunciation of words and its relation to `correct' orthography. | *"In academic literature, orthoepy designates the way a word or a language is customarily spoken."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthogonal]] | adjective | **1.** Not pertinent to the matter under consideration.<br>**2.** Statistically unrelated. | *"In academic literature, orthogonal designates not pertinent to the matter under consideration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthogonality]] | noun | **1.** The relation of opposition between things at right angles.<br>**2.** The quality of lying or intersecting at right angles. | *"In academic literature, orthogonality designates the relation of opposition between things at right angles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthographic]] | noun | **1.** Of, relating to, being, or prepared by orthographic projection.<br>**2.** Of or relating to orthography. | *"In academic literature, orthographic designates of, relating to, being, or prepared by orthographic projection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthography]] | noun | **1.** The art of writing words with the proper letters according to standard usage.<br>**2.** The representation of the sounds of a language by written or printed symbols. | *"I abhor such fanatical phantasimes, such insociable and point-devise companions, such rackers of orthography, as to speak “dout” _sine_ “b”, when he should say “doubt”, “det” when he should pronounce “debt”—_d, e, b, t_, not _d, e, t_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ortholog]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek orth.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, ortholog designates a term designating an entity, condition, or phenomenon derived from greek orth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthologous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of straight. | *"In academic literature, orthologous designates adjective*) pertaining to, derived from, or characteristic of straight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthomolecular]] | adjective | **1.** Designating or relating to a form of treatment of mental disorders that seeks to restore biochemical balance in the body with large doses of vitamins and minerals. | *"In academic literature, orthomolecular designates designating or relating to a form of treatment of mental disorders that seeks to restore biochemical balance in the body with large doses of vitamins and minerals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthomyxovirus]] | noun | **1.** A group of viruses including those causing influenza. | *"In academic literature, orthomyxovirus designates a group of viruses including those causing influenza."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthonym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek orth.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, orthonym designates a term designating an entity, condition, or phenomenon derived from greek orth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopaedic]] | adjective | **1.** Of or relating to orthopedics. | *"In academic literature, orthopaedic designates of or relating to orthopedics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopaedics]] | noun | **1.** The branch of medical science concerned with disorders or deformities of the spine and joints. | *"In academic literature, orthopaedics designates the branch of medical science concerned with disorders or deformities of the spine and joints."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopaedist]] | noun | **1.** A specialist in correcting deformities of the skeletal system (especially in children). | *"In academic literature, orthopaedist designates a specialist in correcting deformities of the skeletal system (especially in children)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopedic]] | noun | **1.** Of, relating to, or employed in orthopedics.<br>**2.** Marked by or affected with a skeletal deformity, disorder, or injury. | *"In academic literature, orthopedic designates of, relating to, or employed in orthopedics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopedical]] | adjective | **1.** Of or relating to orthopedics. | *"In academic literature, orthopedical designates of or relating to orthopedics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopedics]] | noun | **1.** The branch of medical science concerned with disorders or deformities of the spine and joints. | *"In academic literature, orthopedics designates the branch of medical science concerned with disorders or deformities of the spine and joints."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopedist]] | noun | **1.** A specialist in correcting deformities of the skeletal system (especially in children). | *"In academic literature, orthopedist designates a specialist in correcting deformities of the skeletal system (especially in children)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthophosphate]] | noun | **1.** A salt of phosphoric acid. | *"In academic literature, orthophosphate designates a salt of phosphoric acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopnea]] | noun | **1.** Form of dyspnea in which the person can breathe comfortably only when standing or sitting erect; associated with asthma and emphysema and angina pectoris. | *"In academic literature, orthopnea designates form of dyspnea in which the person can breathe comfortably only when standing or sitting erect; associated with asthma and emphysema and angina pectoris."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopristis]] | noun | **1.** A genus of haemulidae. | *"In academic literature, orthopristis designates a genus of haemulidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopter]] | noun | **1.** Heavier-than-air craft that is propelled by the flapping of wings. | *"In academic literature, orthopter designates heavier-than-air craft that is propelled by the flapping of wings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthoptera]] | noun | **1.** Grasshoppers and locusts; crickets.<br>**2.** Any of various insects having leathery forewings and membranous hind wings and chewing mouthparts. | *"We are singularly rich in orthoptera: I don’t know whether—Ah! you have got hold of that glass jar—you are looking into that instead of my drawers."* — George Eliot, *Middlemarch* |
| [[orthopteran]] | noun | **1.** Any of various insects having leathery forewings and membranous hind wings and chewing mouthparts. | *"In academic literature, orthopteran designates any of various insects having leathery forewings and membranous hind wings and chewing mouthparts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthopteron]] | noun | **1.** Any of various insects having leathery forewings and membranous hind wings and chewing mouthparts. | *"In academic literature, orthopteron designates any of various insects having leathery forewings and membranous hind wings and chewing mouthparts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthoptic]] | adjective | **1.** Of or relating to normal binocular vision. | *"In academic literature, orthoptic designates of or relating to normal binocular vision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthoptics]] | noun | **1.** Treatment of defects of binocular vision (such as strabismus and amblyopia) by nonsurgical measures (especially by exercises to strengthen the eye muscles). | *"In academic literature, orthoptics designates treatment of defects of binocular vision (such as strabismus and amblyopia) by nonsurgical measures (especially by exercises to strengthen the eye muscles)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthoptist]] | noun | **1.** A specialist in orthoptics. | *"In academic literature, orthoptist designates a specialist in orthoptics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthoscope]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek orth.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, orthoscope designates a term designating an entity, condition, or phenomenon derived from greek orth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthosis]] | noun | **1.** An external medical device (such as a brace or splint) for supporting, immobilizing, or treating muscles, joints, or skeletal parts which are weak, ineffective, deformed, or injured. | *"In academic literature, orthosis designates an external medical device (such as a brace or splint) for supporting, immobilizing, or treating muscles, joints, or skeletal parts which are weak, ineffective, deformed, or injured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthostat]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek orth.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, orthostat designates a term designating an entity, condition, or phenomenon derived from greek orth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthostatic]] | noun | **1.** Of, relating to, or caused by an upright posture. | *"In academic literature, orthostatic designates of, relating to, or caused by an upright posture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthotic]] | noun | **1.** Of, relating to, or being an orthosis or orthotic; also : of or relating to orthotics.<br>**2.** Orthosis; especially : a supportive device inserted into a shoe usually to stabilize the foot, correct alignment, or provide cushioning. | *"In academic literature, orthotic designates of, relating to, or being an orthosis or orthotic; also : of or relating to orthotics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthotomus]] | noun | **1.** Tailorbirds. | *"In academic literature, orthotomus designates tailorbirds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthotropous]] | adjective | **1.** (of a plant ovule) completely straight with the micropyle at the apex. | *"In academic literature, orthotropous designates (of a plant ovule) completely straight with the micropyle at the apex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unorthodox]] | adjective | **1.** Independent in behavior or thought.<br>**2.** Breaking with convention or tradition. | *"Bridget had the real characteristic Irish faculty of looking upon life as an amusing game, and the more novel and unorthodox the game was, the better she was pleased."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[unorthodoxy]] | noun | **1.** Any opinions or doctrines at variance with the official or orthodox position.<br>**2.** A belief that rejects the orthodox tenets of a religion. | *"In academic literature, unorthodoxy designates any opinions or doctrines at variance with the official or orthodox position."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · ORTH
  </div>
</div>
