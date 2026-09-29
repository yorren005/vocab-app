---
status: unread
type: root_dashboard
---
# Dashboard — cardi
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">καρδία (*kardía*)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“heart / core / cardiac center”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The steady, rhythmic contraction of the living heart pumping life-sustaining blood.</span>
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

The Greek root **cardi** (καρδία (*kardía*)) signifies the heart, the vascular organ of life, and the physical seat of courage and emotion. In English, this root forms key medical, anatomical, physiological, and geometric vocabulary such as *cardiac*, *cardiology*, *electrocardiogram*, *tachycardia*, *bradycardia*, *pericardium*, *endocarditis*, and *cardioid*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: heart / core / cardiac center
> The Greek root **cardi** fundamentally denotes the **heart as a vital organ and central motor of life**. The rhythmic pulsation and muscular contraction of the organ supplying warm blood throughout the organism. In the Hippocratic Corpus (*De Corde*), Greek physicians provided the earliest anatomical descriptions of the cardiac ventricles and pericardial sac, while Homer located martial spirit (*thumos*) and grief directly in the *kardia*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Heart, cardiac center, innermost vitality</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The steady, rhythmic contraction of the living heart pumping life-sustaining blood.</mark>
> - **Everyday Connection**: Think of clinical terms like *cardiac*, *cardiology*, *electrocardiogram*, and *bradycardia*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root derives from Ancient Greek καρδία (*kardía*), meaning "heart", also applied in antiquity to the cardiac orifice connecting the esophagus to the stomach.
  - Reconstructed Proto-Indo-European root: ***ḱerd-** ("heart").

- **The Big Picture Idea**:
  - The heart represents both the anatomical motor of circulation and the symbolic nucleus of living function.
  - Whenever you encounter **cardi** or **cardio-** in English, it designates the heart, the cardiovascular system, or heart-shaped configurations.

- **How the Meaning Grows**:
  - **Physical & Anatomical**: The literal muscular pump (*cardiac*, *myocardium*, *pericardium*).
  - **Pathological & Clinical**: Malfunctions, arrhythmias, and inflammations (*endocarditis*, *tachycardia*, *cardialgia*).
  - **Diagnostic & Interventional**: Measuring electrical and acoustic activity (*electrocardiography*, *cardiograph*, *cardioplegia*).
  - **Mathematical & Structural**: Geometrical curves shaped like a stylized heart (*cardioid*).

- **Everyday English Words to Remember It By**:
  - **Cardiac**: Directly pertaining to or affecting the heart.
  - **Cardiology**: The medical specialty diagnosing and treating cardiovascular diseases.
  - **Pericardium**: The protective membrane enclosing the heart.
  - **Bradycardia**: Abnormally sluggish heart rhythm.

- **💡 Quick Memory Rule**:
  - *When you see **cardi**, visualize the beating heart and the cardiovascular system.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

- **Primary Morphemic Stem**:
  - `cardi-` (< Greek καρδία): Applied before vocalic affixes and combining elements (*cardiac*, *cardialgia*).
- **Combining Form with -o- Connective**:
  - `cardio-` (< καρδιο-): The universal Ancient Greek thematic connector `-o-` inserted before consonants (*cardio-logy*, *cardio-graph*, *cardio-megaly*).
- **Phonological & Compounding Laws**:
  - **Vocalic Elision**: When meeting an element beginning with a vowel, the thematic `-o-` is systematically dropped: `cardi-` + `algos` (*pain*) → *cardialgia* (not *cardioalgia*).
  - **Prefix Mechanics**: Prepositions prefix directly to designate anatomical positioning around the organ: `peri-` ("around") + `kardia` → *pericardium*; `endo-` ("within") + `kardia` → *endocardium*; `epi-` ("upon") + `kardia` → *epicardium*.

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

```
                             ┌── Anatomical Layers: pericardium, endocardium, epicardium
                             │
       [cardi] ──────────────┼── Pathologies & Signs: cardialgia, cardiomegaly, cardiospasm
      (καρδία,               │
      The Heart)             ├── Rhythms & Rates: bradycardia, tachycardia
                             │
                             ├── Clinical Specialties: cardiology, cardiothoracic, neurocardiology
                             │
                             └── Technical & Mathematical: electrocardiogram, cardioid
```

---

## 🔀 4. Prefix & Combining Dynamics on cardi

- **`peri-` ("around") + `cardi` + `-ium`**: *pericardium* — the conical fibroserous sac enclosing the heart and proximal great vessels.
- **`endo-` ("within") + `cardi` + `-itis`**: *endocarditis* — exudative inflammation of the endothelial membrane lining the cardiac chambers and valves.
- **`brady-` ("slow") + `cardia`**: *bradycardia* — resting heart rate decelerating below sixty beats per minute.
- **`tachy-` ("swift") + `cardia`**: *tachycardia* — accelerated ventricular or supraventricular cardiac rhythm exceeding one hundred beats per minute.
- **`cardi` + `-oid` ("resembling")**: *cardioid* — an epicycloid curve generated by a circle rolling upon an equal fixed circle, tracing a heart shape.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Cardiology & Critical Care**: Hemodynamic monitoring, myocardial infarction management, and valvular repair.
- **Cardiothoracic Surgery**: Cardiopulmonary bypass, coronary revascularization, and induced *cardioplegia* during arrest.
- **Electrophysiology & Diagnostics**: Interpretation of twelve-lead *electrocardiograms* for conduction blocks and arrhythmias.
- **Geometry & Differential Equations**: Parametric graphing of *cardioid* curves in mathematical physics and acoustics.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[acardia]] | noun | **1.** Congenital absence of the heart (as in the development of some monsters). | *"In academic literature, acardia designates congenital absence of the heart (as in the development of some monsters)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anacardiaceae]] | noun | **1.** The cashew family; trees and shrubs and vines having resinous (sometimes poisonous) juice; includes cashew and mango and pistachio and poison ivy and sumac. | *"In academic literature, anacardiaceae designates the cashew family; trees and shrubs and vines having resinous (sometimes poisonous) juice; includes cashew and mango and pistachio and poison ivy and sumac."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anacardium]] | noun | **1.** Type genus of the anacardiaceae: cashew. | *"In academic literature, anacardium designates type genus of the anacardiaceae: cashew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bradycardia]] | noun | **1.** Relatively slow heart action. | *"In academic literature, bradycardia designates relatively slow heart action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardi]] | noun | **1.** Heart : cardiac : cardiac and. | *"In academic literature, cardi designates heart : cardiac : cardiac and."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardia]] | noun | **1.** The opening of the esophagus into the stomach; also : the part of the stomach adjoining this opening.<br>**2.** Heart action or location (of a specified type). | *"In academic literature, cardia designates the opening of the esophagus into the stomach; also : the part of the stomach adjoining this opening."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiac]] | noun | **1.** Of, relating to, situated near, or acting on the heart.<br>**2.** Of or relating to the cardia of the stomach. | *"But as the autumn advanced and his health did not greatly improve, another consultation of his doctors was held, the result of which was that he was pronounced to be suffering from cardiac weakness, and quite unfit for the work of the coming winter."* — John Cairns, *Principal Cairns* |
| [[cardialgia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cardi.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, cardialgia designates a term designating an entity, condition, or phenomenon derived from greek cardi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiidae]] | noun | **1.** Somewhat heart-shaped sand-burrowing bivalve mollusks. | *"In academic literature, cardiidae designates somewhat heart-shaped sand-burrowing bivalve mollusks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardinal]] | noun | **1.** (roman catholic church) one of a group of more than 100 prominent bishops in the sacred college who advise the pope and elect new popes.<br>**2.** The number of elements in a mathematical set; denotes a quantity but not the order. | *"Have patience, noble Duke; I may not open; The Cardinal of Winchester forbids."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cardinalate]] | noun | **1.** Cardinals collectively. | *"In academic literature, cardinalate designates cardinals collectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardinalfish]] | noun | **1.** Small red fishes of coral reefs and inshore tropical waters. | *"In academic literature, cardinalfish designates small red fishes of coral reefs and inshore tropical waters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardinality]] | noun | **1.** (mathematics) the number of elements in a set or group (considered as a property of that grouping). | *"In academic literature, cardinality designates (mathematics) the number of elements in a set or group (considered as a property of that grouping)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardinalship]] | noun | **1.** The office of cardinal. | *"In academic literature, cardinalship designates the office of cardinal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiogram]] | noun | **1.** The curve or tracing made by a cardiograph. | *"Such a diagram is called a "cardiogram," and it seems that each of us has a particular form of cardiogram peculiar to himself, so that a man could almost be recognised and distinguished from his fellows by the electrical action of his heart."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[cardiograph]] | noun | **1.** An instrument that graphically registers movements of the heart. | *"In academic literature, cardiograph designates an instrument that graphically registers movements of the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiographic]] | adjective | **1.** Of or relating to a cardiograph. | *"In academic literature, cardiographic designates of or relating to a cardiograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiography]] | noun | **1.** Diagnostic procedure consisting of recording the activity of the heart electronically with a cardiograph (and producing a cardiogram). | *"In academic literature, cardiography designates diagnostic procedure consisting of recording the activity of the heart electronically with a cardiograph (and producing a cardiogram)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardioid]] | noun | **1.** A heart-shaped curve that is traced by a point on the circumference of a circle rolling completely around an equal fixed circle and has an equation in one of the forms ρ = a(1 ± cos θ) or ρ = a(1 ± sin θ) in polar coordinates. | *"In academic literature, cardioid designates a heart-shaped curve that is traced by a point on the circumference of a circle rolling completely around an equal fixed circle and has an equation in one of the forms ρ = a(1 ± cos θ) or ρ = a(1 ± sin θ) in polar coordinates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiologic]] | adjective | **1.** Of or relating to or used in or practicing cardiology. | *"In academic literature, cardiologic designates of or relating to or used in or practicing cardiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiologist]] | noun | **1.** The study of the heart and its action and diseases. | *"In academic literature, cardiologist designates the study of the heart and its action and diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiology]] | noun | **1.** The study of the heart and its action and diseases. | *"In academic literature, cardiology designates the study of the heart and its action and diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiomegaly]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cardi.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, cardiomegaly designates a term designating an entity, condition, or phenomenon derived from greek cardi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiomyopathy]] | noun | **1.** Any of several structural or functional diseases of heart muscle marked especially by hypertrophy and obstructive damage to the heart. | *"In academic literature, cardiomyopathy designates any of several structural or functional diseases of heart muscle marked especially by hypertrophy and obstructive damage to the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiopathy]] | noun | **1.** A disease of the heart. | *"In academic literature, cardiopathy designates a disease of the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardioplegia]] | noun | **1.** The deliberate, temporary cessation of cardiac activity before heart surgery. | *"In academic literature, cardioplegia designates the deliberate, temporary cessation of cardiac activity before heart surgery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardioplegic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of heart / core / cardiac center. | *"In academic literature, cardioplegic designates adjective*) pertaining to, derived from, or characteristic of heart / core / cardiac center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiopulmonary]] | noun | **1.** Of or relating to the heart and lungs.<br>**2.** A procedure designed to restore normal breathing after cardiac arrest that includes the clearance of air passages to the lungs, mouth-to-mouth method of artificial respiration, and heart massage by the exertion of pressure on the chest. | *"In academic literature, cardiopulmonary designates of or relating to the heart and lungs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiorespiratory]] | adjective | **1.** Of or pertaining to or affecting both the heart and the lungs and their functions. | *"In academic literature, cardiorespiratory designates of or pertaining to or affecting both the heart and the lungs and their functions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiospasm]] | noun | **1.** achalasia of the cardia (part of the esophagus). | *"In academic literature, cardiospasm designates achalasia of the cardia (part of the esophagus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiospermum]] | noun | **1.** Tendril-climbing herbs or shrubs whose seeds have a white heart-shaped spot. | *"In academic literature, cardiospermum designates tendril-climbing herbs or shrubs whose seeds have a white heart-shaped spot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiothoracic]] | noun | **1.** Relating to, involving, or specializing in the heart and chest. | *"In academic literature, cardiothoracic designates relating to, involving, or specializing in the heart and chest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardiovascular]] | adjective | **1.** Of or pertaining to or involving the heart and blood vessels. | *"In academic literature, cardiovascular designates of or pertaining to or involving the heart and blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carditis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek itis.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, carditis designates a term designating an entity, condition, or phenomenon derived from greek itis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cardium]] | noun | **1.** Type genus of the family cardiidae: cockles. | *"In academic literature, cardium designates type genus of the family cardiidae: cockles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiogram_ecg]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cardi.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, electrocardiogram_ecg designates a term designating an entity, condition, or phenomenon derived from greek cardi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrocardiography]] | noun | **1.** An instrument for recording the changes of electrical potential occurring during the heartbeat used especially in diagnosing abnormalities of heart action. | *"In academic literature, electrocardiography designates an instrument for recording the changes of electrical potential occurring during the heartbeat used especially in diagnosing abnormalities of heart action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocarditis]] | noun | **1.** Inflammation of the lining of the heart and its valves. | *"In academic literature, endocarditis designates inflammation of the lining of the heart and its valves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocardium]] | noun | **1.** A thin serous membrane lining the cavities of the heart. | *"In academic literature, endocardium designates a thin serous membrane lining the cavities of the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epicardia]] | noun | **1.** The short part of the esophagus extending downward from the diaphragm to the stomach.<br>**2.** The innermost of the two layers of the pericardium. | *"In academic literature, epicardia designates the short part of the esophagus extending downward from the diaphragm to the stomach."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epicardium]] | noun | **1.** The inner layer of the pericardium that closely envelops the heart. | *"In academic literature, epicardium designates the inner layer of the pericardium that closely envelops the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemicardia]] | noun | **1.** A lateral half of a four-chamber heart. | *"In academic literature, hemicardia designates a lateral half of a four-chamber heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megacardia]] | noun | **1.** An abnormal enlargement of the heart. | *"In academic literature, megacardia designates an abnormal enlargement of the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megalocardia]] | noun | **1.** An abnormal enlargement of the heart. | *"In academic literature, megalocardia designates an abnormal enlargement of the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neurocardiology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cardi.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, neurocardiology designates a term designating an entity, condition, or phenomenon derived from greek cardi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pancarditis]] | noun | **1.** Inflammation of the entire heart (the epicardium and the myocardium and the endocardium). | *"In academic literature, pancarditis designates inflammation of the entire heart (the epicardium and the myocardium and the endocardium)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericardiac]] | adjective | **1.** Located around the heart or relating to or affecting the pericardium. | *"In academic literature, pericardiac designates located around the heart or relating to or affecting the pericardium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericardial]] | adjective | **1.** Located around the heart or relating to or affecting the pericardium. | *"In academic literature, pericardial designates located around the heart or relating to or affecting the pericardium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericarditis]] | noun | **1.** Inflammation of the pericardium. | *"In academic literature, pericarditis designates inflammation of the pericardium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericardium]] | noun | **1.** The conical sac of serous membrane that encloses the heart and the roots of the great blood vessels of vertebrates.<br>**2.** A cavity or space that contains the heart of an invertebrate and in arthropods is a part of the hemocoel. | *"In academic literature, pericardium designates the conical sac of serous membrane that encloses the heart and the roots of the great blood vessels of vertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CARDI
  </div>
</div>
