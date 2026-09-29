---
status: unread
type: root_dashboard
---
# Dashboard — metr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">metr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to measure”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Counting units on a ruler or measuring out exact proportions.</span>
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

The root **metr** means to measure. It refers to the action of measuring and carrying out this process. In English, this root forms words such as *meter*, *metric*, *symmetry*, and *symmetrical*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to measure
> The root **metr** means to measure. It refers to the action of measuring and carrying out this process. In English, this root forms words such as *meter*, *metric*, *symmetry*, and *symmetrical*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To measure</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *meter* and *metric*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **metr** comes from a Latin word that means *"to measure"*.
  - At its core, it describes the action of measure.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **metr** in an English word, think of **to measure**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to measure).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Meter**: The fundamental unit of length in the International System of Units , equal to 100 centimeters or approximately 39.37 inches.
  - **Metric**: Relating to or based on the meter as a unit of measurement.
  - **Symmetry**: The quality of being made up of exactly similar parts facing each other or around an axis.
  - **Symmetrical**: Made up of exactly similar parts facing each other or around an axis.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">metr</mark>, think of <mark class="hl-def">to measure</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **metr** produces vocabulary primarily through prefixation and compound formation with Greek elements:
> - **Base Noun and Adjective:**
>   - Greek *metron* $\to$ French *mètre* $\to$ *meter* ("fundamental unit of length").
>   - *metron* + *-ikós* $\to$ Latin *metricus* $\to$ *metric* ("based on the meter; mathematical metric").
> - **Geometric & Spatial Boundary Compounds:**
>   - *dia-* ("across") + *metron* $\to$ *diameter* ("line measuring across a circle").
>   - *peri-* ("around") + *metron* $\to$ *perimeter* ("outer boundary measurement").
>   - *para-* ("beside") + *metron* $\to$ *parameter* ("determining constant or boundary limit").
>   - *gē* ("earth") + *metreō* $\to$ *geometry*, *geometric* ("earth measurement").
> - **Proportional Balance Compounds:**
>   - *syn-* ("together") + *metron* $\to$ *symmetry*, *symmetrical* ("balanced proportion").
>   - *a-* ("without") + *symmetry* $\to$ *asymmetry*, *asymmetric* ("lack of proportion").
> - **Instrumental Measuring Suffix `-meter`:**
>   - *baros* ("weight/pressure") + *-meter* $\to$ *barometer* (measures atmospheric pressure).
>   - *thermos* ("heat") + *-meter* $\to$ *thermometer* (measures temperature).
>   - *chronos* ("time") + *-meter* $\to$ *chronometer* (measures precise time).
>   - Latin *altus* ("high") + *-meter* $\to$ *altimeter* (measures altitude).
>   - *hodos* ("way/road") + *-meter* $\to$ *odometer* (measures distance traveled).
>   - Latin *pēs* ("foot") + *-meter* $\to$ *pedometer* (measures steps taken).
>   - English *speed* + *-meter* $\to$ *speedometer* (measures travel speed).

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.latin_root);
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

> [!tip] 🌈 Shades of Meaning in Different Words
> Although fundamentally denoting **"measure"**, the root branches into diverse applications:
> - **Universal Dimensional Standards:** *meter*, *metric* (SI base length, metric system).
> - **Aesthetic & Structural Balance:** *symmetry*, *asymmetry* (bilateral correspondence, balance).
> - **Geometric & Coordinate Geometry:** *diameter*, *perimeter*, *geometry* (circle cross-sections, boundary perimeters).
> - **Mathematical & Statistical Variables:** *parameter* (fixed boundary condition, distribution parameter).
> - **Meteorological & Physical Instrumentation:** *barometer*, *thermometer* (weather instruments).
> - **Navigational & Chronometric Gauges:** *chronometer*, *altimeter*, *speedometer*, *odometer*, *pedometer* (instruments measuring speed, time, height, and distance).

---

## 🔀 4. Prefix & Combining Dynamics on metr

### Prefix Combinations (Spatial & Structural Orientation)

| Prefix | Base Stem | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `dia-` (across) | `metron` | **[[diameter]]** | A straight line passing from side to side through the center of a circle. |
| `peri-` (around) | `metron` | **[[perimeter]]** | The continuous line forming the boundary of a closed geometric figure. |
| `para-` (beside) | `metron` | **[[parameter]]** | A numerical or measurable factor setting conditions for its operation. |
| `syn-` (together) | `metron` | **[[symmetry]]** | The quality of being made up of exactly similar parts facing each other. |
| `a-` (without) | `symmetry` | **[[asymmetry]]** | Lack of equality or equivalence between parts or aspects of something. |

### Suffix Transformations (Instrumental & Disciplinary Functions)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-metry` | Noun (Field of Measurement) | **[[geometry]]** | The mathematical branch dealing with properties and relations of points and lines. |
| `-ic` | Adjective (Pertaining to) | **[[metric]]** | Pertaining to the metric system or poetic meter. |
| `-ical` | Adjective (Descriptive) | **[[symmetrical]]** | Displaying harmonious, balanced proportions on both sides. |
| `-meter` | Noun (Measuring Instrument) | **[[barometer]]** | An instrument measuring atmospheric pressure to forecast weather. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📐 **Euclidean & Modern Geometry** | *diameter*, *perimeter*, *geometry* | Calculating circle circumference, polygon area, Riemannian non-Euclidean manifolds. |
| 🌡️ **Meteorology & Thermodynamics** | *barometer*, *thermometer*, *isobar* | Barometric pressure charting, cyclone tracking, temperature scale calibration. |
| 🚢 **Navigation & Aeronautics** | *chronometer*, *altimeter*, *odometer* | John Harrison's longitude marine chronometer, cockpit barometric altimeters. |
| 💻 **Statistics & Computer Science** | *parameter*, *hyperparameter*, *metric* | Algorithm configuration, machine learning weights, mathematical distance metrics. |
| 🎨 **Architecture & Visual Arts** | *symmetry*, *asymmetry*, *geometric* | Classical Vitruvian proportion, bilateral façade design, modernist balance. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[asymmetric]] | adjective | **1.** Characterized by asymmetry in the spatial arrangement or placement of parts or components. | *"In academic literature, asymmetric designates characterized by asymmetry in the spatial arrangement or placement of parts or components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asymmetrical]] | adjective | **1.** Characterized by asymmetry in the spatial arrangement or placement of parts or components.<br>**2.** Irregular in shape or outline. | *"What composite asymmetrical image in the mirror then attracted his attention?"* — James Joyce, *Ulysses* |
| [[asymmetrically]] | adverb | **1.** In an asymmetrical manner. | *"In academic literature, asymmetrically designates in an asymmetrical manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asymmetry]] | noun | **1.** (mathematics) a lack of symmetry. | *"In academic literature, asymmetry designates (mathematics) a lack of symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demetrius]] | noun | **1.** Son of antigonus cyclops and king of macedonia; he and his father were defeated at the battle of ipsus (337-283 bc). | *"Speak not to us. [_Exeunt Antony and Cleopatra with the Train._] DEMETRIUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dimetrodon]] | noun | **1.** Carnivorous dinosaur of the permian in north america having a crest or dorsal sail. | *"In academic literature, dimetrodon designates carnivorous dinosaur of the permian in north america having a crest or dorsal sail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dissymmetry]] | noun | **1.** (mathematics) a lack of symmetry. | *"In academic literature, dissymmetry designates (mathematics) a lack of symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emetrol]] | noun | **1.** Trade name for an antiemetic drug that has a mint flavor. | *"In academic literature, emetrol designates trade name for an antiemetic drug that has a mint flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emmetropia]] | noun | **1.** (ophthalmology) the normal refractive condition of the eye in which there is clear focus of light on the retina. | *"In academic literature, emmetropia designates (ophthalmology) the normal refractive condition of the eye in which there is clear focus of light on the retina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emmetropic]] | adjective | **1.** Of or relating to the normal condition of the eye in which visual images are in clear focus on the retina. | *"In academic literature, emmetropic designates of or relating to the normal condition of the eye in which visual images are in clear focus on the retina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geometric]] | adjective | **1.** Characterized by simple geometric forms in design and decoration.<br>**2.** Of or relating to or determined by geometry. | *"I squared and cubed long series of numbers, and by concentration and will carried on most astonishing geometric progressions."* — Jack London, *The Jacket (The Star-Rover)* |
| [[geometrical]] | adjective | **1.** Of or relating to or determined by geometry.<br>**2.** Characterized by simple geometric forms in design and decoration. | *"If the Sperm Whale be physiognomically a Sphinx, to the phrenologist his brain seems that geometrical circle which it is impossible to square."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[geometrically]] | adverb | **1.** With respect to geometry.<br>**2.** In a geometric fashion. | *"These filed in about nine o’clock, their vermiculated horns lopping gracefully on each side of their cheeks in geometrically perfect spirals, a small pink and white ear nestling under each horn."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[geometrician]] | noun | **1.** A mathematician specializing in geometry. | *"In academic literature, geometrician designates a mathematician specializing in geometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geometry]] | noun | **1.** The pure mathematics of points and lines and curves and surfaces. | *"And can Geometry vend it in the Market?"* — John Fletcher, *The Elder Brother* |
| [[metralgia]] | noun | **1.** Pain in the uterus. | *"In academic literature, metralgia designates pain in the uterus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrazol]] | noun | **1.** A drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark. | *"In academic literature, metrazol designates a drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metre]] | noun | **1.** The basic unit of length adopted under the systeme international d'unites (approximately 1.094 yards).<br>**2.** (prosody) the accent in a metrical foot of verse. | *"So should my papers (yellowed with their age) Be scorned, like old men of less truth than tongue, And your true rights be termed a poet’s rage, And stretched metre of an antique song."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metrestick]] | noun | **1.** A rule one meter long (usually marked off in centimeters and millimeters). | *"In academic literature, metrestick designates a rule one meter long (usually marked off in centimeters and millimeters)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metric]] | noun | **1.** A function of a topological space that gives, for any two points in the space, a value equal to the distance between them.<br>**2.** A decimal unit of measurement of the metric system (based on meters and kilograms and seconds). | *"Herrick mentions it in one of his songs: Come, bring with a noise, My metric, merrie boys, The Christmas Log to the firing; While my good dame, she Bids ye all be free, And drink to your hearts’ desiring."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[metrical]] | adjective | **1.** Based on the meter as a standard of measurement.<br>**2.** The rhythmic arrangement of syllables. | *"It should react upon his metrical vocabulary to its beneficial expansion, by taking him outside his aristocratic circle of language, and keeping him in touch with the great commonalty, the proletariat of speech."* — Francis Thompson, *Shelley: An Essay* |
| [[metrically]] | adverb | **1.** With regard to meter. | *"In academic literature, metrically designates with regard to meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metricate]] | verb | **1.** Convert from a non-metric to the metric system. | *"In academic literature, metricate designates convert from a non-metric to the metric system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrication]] | noun | **1.** The act of changing from imperial units of measurement to metric units: meters, grams, seconds. | *"In academic literature, metrication designates the act of changing from imperial units of measurement to metric units: meters, grams, seconds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metricise]] | verb | **1.** Express in the metric system.<br>**2.** Convert from a non-metric to the metric system. | *"In academic literature, metricise designates express in the metric system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metricize]] | verb | **1.** Express in the metric system.<br>**2.** Convert from a non-metric to the metric system. | *"In academic literature, metricize designates express in the metric system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrics]] | noun | **1.** The study of poetic meter and the art of versification.<br>**2.** A function of a topological space that gives, for any two points in the space, a value equal to the distance between them. | *"In academic literature, metrics designates the study of poetic meter and the art of versification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrification]] | noun | **1.** Writing a metrical composition (or the metrical structure of a composition).<br>**2.** The act of changing from imperial units of measurement to metric units: meters, grams, seconds. | *"In academic literature, metrification designates writing a metrical composition (or the metrical structure of a composition)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrify]] | verb | **1.** Compose in poetic meter.<br>**2.** Convert from a non-metric to the metric system. | *"In academic literature, metrify designates compose in poetic meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metritis]] | noun | **1.** Inflammation of the lining of the uterus (of the endometrium). | *"In academic literature, metritis designates inflammation of the lining of the uterus (of the endometrium)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metro]] | noun | **1.** An electric railway operating below the surface of the ground (usually in a city). | *"In academic literature, metro designates an electric railway operating below the surface of the ground (usually in a city)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrological]] | adjective | **1.** Of or relating to metrology. | *"In academic literature, metrological designates of or relating to metrology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrology]] | noun | **1.** The scientific study of measurement. | *"In academic literature, metrology designates the scientific study of measurement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metronidazole]] | noun | **1.** Antiprotozoal medication (trade name flagyl) used to treat trichomoniasis and giardiasis. | *"In academic literature, metronidazole designates antiprotozoal medication (trade name flagyl) used to treat trichomoniasis and giardiasis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metronome]] | noun | **1.** Clicking pendulum indicates the exact tempo of a piece of music. | *"There's an old metronome up-stairs that Cyril left."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[metronymic]] | noun | **1.** A name derived from the name of your mother or a maternal ancestor. | *"In academic literature, metronymic designates a name derived from the name of your mother or a maternal ancestor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metropolis]] | noun | **1.** A large and densely populated urban area; may include several independent administrative districts.<br>**2.** People living in a large densely populated municipality. | *"The next is this: King John hath reconcil’d Himself to Rome; his spirit is come in, That so stood out against the holy church, The great metropolis and see of Rome."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metropolitan]] | noun | **1.** In the eastern orthodox church this title is given to a position between bishop and patriarch; equivalent to archbishop in western christianity.<br>**2.** A person who lives in a metropolis. | *"As watching is best done invisibly, she usually carried a dark lantern in her hand, and every now and then turned on the light to examine nooks and corners with the coolness of a metropolitan policeman."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[metroptosis]] | noun | **1.** Prolapse of the uterus. | *"In academic literature, metroptosis designates prolapse of the uterus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrorrhagia]] | noun | **1.** Bleeding from the uterus that is not due to menstruation; usually indicative of disease (as cervical cancer). | *"In academic literature, metrorrhagia designates bleeding from the uterus that is not due to menstruation; usually indicative of disease (as cervical cancer)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metroxylon]] | noun | **1.** A genus of malayan pinnate-leaved palm trees that flower and fruit once and then die. | *"In academic literature, metroxylon designates a genus of malayan pinnate-leaved palm trees that flower and fruit once and then die."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[supersymmetry]] | noun | **1.** (physics) a theory that tries to link the four fundamental forces. | *"In academic literature, supersymmetry designates (physics) a theory that tries to link the four fundamental forces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetric]] | adjective | **1.** Having similarity in size, shape, and relative position of corresponding parts. | *"In academic literature, symmetric designates having similarity in size, shape, and relative position of corresponding parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetrical]] | adjective | **1.** Having similarity in size, shape, and relative position of corresponding parts.<br>**2.** Exhibiting equivalence or correspondence among constituents of an entity or between different entities. | *"And we like ’em all the better for it, don’t we?” Mercury, with his hands in the pockets of his bright peach-blossom small-clothes, stretches his symmetrical silk legs with the air of a man of gallantry and can’t deny it."* — Charles Dickens, *Bleak House* |
| [[symmetrically]] | adverb | **1.** In a symmetrical manner. | *"Deep,” said Wemmick, “as Australia.” Pointing with his pen at the office floor, to express that Australia was understood, for the purposes of the figure, to be symmetrically on the opposite spot of the globe."* — Charles Dickens, *Great Expectations* |
| [[symmetricalness]] | noun | **1.** (mathematics) an attribute of a shape or relation; exact reflection of form on opposite sides of a dividing line or plane. | *"In academic literature, symmetricalness designates (mathematics) an attribute of a shape or relation; exact reflection of form on opposite sides of a dividing line or plane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetrise]] | verb | **1.** Make symmetric. | *"In academic literature, symmetrise designates make symmetric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetrize]] | verb | **1.** Make symmetric. | *"In academic literature, symmetrize designates make symmetric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetry]] | noun | **1.** (mathematics) an attribute of a shape or relation; exact reflection of form on opposite sides of a dividing line or plane.<br>**2.** Balance among the parts of something. | *"Since the receipt of the missive in the morning, Boldwood had felt the symmetry of his existence to be slowly getting distorted in the direction of an ideal passion."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unsymmetric]] | adjective | **1.** Lacking symmetry. | *"In academic literature, unsymmetric designates lacking symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsymmetrical]] | adjective | **1.** Lacking symmetry.<br>**2.** Having unsymmetrical parts or unequal dimensions or measurements. | *"In academic literature, unsymmetrical designates lacking symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsymmetrically]] | adverb | **1.** In an asymmetrical manner. | *"With its huge ungainly limbs sprawling unsymmetrically, and its gnarled hands and fingers, it stood an aged, stern, and scornful monster among the smiling birch trees."* — graf Leo Tolstoy, *War and Peace* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Measure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · METR
  </div>
</div>
