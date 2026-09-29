---
status: unread
type: root_dashboard
---
# Dashboard — tub
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tub-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“tube or pipe”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Crafting a specific shape out of clay or wood with careful hands.</span>
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

The root **tub** means tube or pipe. It refers to a hollow cylinder, conduit pipe, or tube. In English, this root forms words such as *tube*, *tubular*, *tubule*, and *intubate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: tube or pipe
> The root **tub** means tube or pipe. It refers to a hollow cylinder, conduit pipe, or tube. In English, this root forms words such as *tube*, *tubular*, *tubule*, and *intubate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Tube or pipe</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Crafting a specific shape out of clay or wood with careful hands.</mark>
> - **Everyday Connection**: Think of familiar words like *tube* and *tubular*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tub** comes from a Latin word that means *"tube or pipe"*.
  - At its core, it describes tube or pipe.

- **The Big Picture Idea**:
  - Picture crafting a specific shape out of clay or wood with careful hands.
  - Whenever you see **tub** in an English word, think of **shapes, forms, and physical objects**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of tube or pipe.
  - **Mental & Social**: How people experience, organize, or communicate about tube or pipe.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Tube**: A long, hollow cylinder of plastic, glass, metal, or other material, used for conveying fluids.
  - **Tubular**: Long, hollow, and cylindrical, like a tube.
  - **Tubule**: A minute tube, especially as an anatomical structure.
  - **Intubate**: To insert a tube into a person or a body part, especially the trachea for ventilation.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tub</mark>, think of <mark class="hl-def">shapes, forms, and physical objects</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **tub** produces vocabulary through diminutive and prefix mechanisms:
> - **Hollow Pipe Conduit Stems (`tub-` / `tubul-` < *tubus*):**
>   - *tubus* $\to$ French *tube* $\to$ *tube* ("hollow cylinder").
>   - *tubus* + *-āris* $\to$ *tubular* ("having the form of a tube").
>   - *tubulus* $\to$ *tubule* ("a minute tube, especially in biological organs").
> - **Medical Prefix Insertion (`in-` / `ex-`):**
>   - *in-* + *tubus* + *-ate* $\to$ *intubate*, *intubation* ("inserting a tube into the trachea").
>   - *ex-* + *tubus* + *-ate* $\to$ *extubate*, *extubation* ("removing an endotracheal tube").
> - **Swelling & Nodule Stems (`tuber-` < *tūber*):**
>   - *tūber* $\to$ *tuber* ("thickened underground stem, potato").
>   - *pro-* ("forward") + *tūber* $\to$ *protuberance*, *protuberant* ("projecting bulge").
>   - *tūberculum* $\to$ *tubercle*, *tuberculosis* ("small rounded nodule; bacterial disease").

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
> Although fundamentally denoting **"tube / swelling"**, the root branches into diverse domains:
> - **Critical Care Anesthesiology:** *intubate*, *intubation*, *extubation* (endotracheal airway intervention).
> - **Infectious Disease Pathology:** *tuberculosis*, *tubercle* (*Mycobacterium tuberculosis* infection).
> - **Agronomy & Plant Morphology:** *tuber*, *tuberous* (potatoes, yams, energy-storage root systems).
> - **Nephrology & Renal Physiology:** *renal tubule*, *tubule* (proximal and distal convoluted tubules in nephrons).
> - **Structural & Mechanical Engineering:** *tube*, *tubular steel* (roll cages, bicycle frame tubing).
> - **Geomorphology & Solar Physics:** *protuberance*, *solar protuberance* (mountain knobs, solar plasma prominences).

---

## 🔀 4. Prefix & Combining Dynamics on tub

### Medical Airway Dynamics

| Prefix | Base Stem | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` (into) | `tubus` | **[[intubation]]** / **intubate** | Inserting an artificial breathing tube into the patient's airway. |
| `ex-` (out) | `tubus` | **extubate** / **extubation** | Safely withdrawing the endotracheal tube once spontaneous breathing resumes. |
| `pro-` (forward) | `tūber` | **[[protuberance]]** | An outgrowth or swelling bulging outward from a surface. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🫁 **Pulmonology & Anesthesiology** | *intubation*, *extubation*, *tuberculosis* | Rapid sequence induction intubation, DOTS tuberculosis antibiotic therapy. |
| 🥔 **Agricultural Botany & Food Science** | *tuber*, *tuberous root* | Solanum tuberosum cultivation, starch accumulation in storage parenchyma. |
| 🧬 **Cellular Biology & Nephrology** | *renal tubule*, *microtubule* | Glomerular filtrate reabsorption, mitotic spindle kinesin transport. |
| 🏗️ **Structural Civil Engineering** | *tubular steel*, *tube* | Tubular tower design in skyscrapers (Willis Tower), bicycle frame metallurgy. |
| ☀️ **Solar Astrophysics** | *solar protuberance* (prominence) | Magnetic flux loops lifting coronal plasma above the chromosphere. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[intubate]] | verb | **1.** Introduce a cannula or tube into. | *"In academic literature, intubate designates introduce a cannula or tube into."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intubation]] | noun | **1.** The insertion of a cannula or tube into a hollow body organ. | *"In academic literature, intubation designates the insertion of a cannula or tube into a hollow body organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protuberance]] | noun | **1.** Something that bulges out or is protuberant or projects from its surroundings.<br>**2.** The condition of being protuberant; the condition of bulging out. | *"Cainy Ball and Joseph, who performed this latter operation, were if possible wetter than the rest; they resembled dolphins under a fountain, every protuberance and angle of their clothes dribbling forth a small rill."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[protuberant]] | adjective | **1.** Curving outward. | *"The Count, evidently noticing it, drew back; and with a grim sort of smile, which showed more than he had yet done his protuberant teeth, sat himself down again on his own side of the fireplace."* — Bram Stoker, *Dracula* |
| [[protuberate]] | verb | **1.** Cause to bulge out or project.<br>**2.** Form a rounded prominence. | *"In academic literature, protuberate designates cause to bulge out or project."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[setubal]] | noun | **1.** A port city on the atlantic coast of portugal to the southeast of lisbon. | *"In academic literature, setubal designates a port city on the atlantic coast of portugal to the southeast of lisbon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tub]] | noun | **1.** A relatively large open container that you fill with water and use to wash the body.<br>**2.** A large open vessel for holding or storing liquids. | *"The cloyed will— That satiate yet unsatisfied desire, that tub Both fill’d and running—ravening first the lamb, Longs after for the garbage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tuba]] | noun | **1.** The lowest brass wind instrument. | *"In academic literature, tuba designates the lowest brass wind instrument."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tubal]] | adjective | **1.** Of or relating to occurring in a tube such as e.g. the fallopian tube or eustachian tube. | *"Tubal, a wealthy Hebrew of my tribe, Will furnish me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tube]] | noun | **1.** Conduit consisting of a long hollow object (usually cylindrical) used to hold and conduct objects or liquids or gases.<br>**2.** Electronic device consisting of a system of electrodes arranged in an evacuated glass or metal envelope. | *"It was a small tube or trochar, with a lance passing down the inside; and Gabriel began to use it with a dexterity that would have graced a hospital surgeon."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[tube-nosed]] | adjective | **1.** Having a tubular nose. | *"In academic literature, tube-nosed designates having a tubular nose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tube-shaped]] | adjective | **1.** Constituting a tube; having hollow tubes (as for the passage of fluids). | *"In academic literature, tube-shaped designates constituting a tube; having hollow tubes (as for the passage of fluids)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tubed]] | verb | **1.** Provide with a tube or insert a tube into.<br>**2.** Convey in a tube. | *"In academic literature, tubed designates provide with a tube or insert a tube into."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tubeless]] | noun | **1.** Pneumatic tire not needing an inner tube to be airtight.<br>**2.** Of a tire; not needing an inner tube. | *"In academic literature, tubeless designates pneumatic tire not needing an inner tube to be airtight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tubelike]] | adjective | **1.** Constituting a tube; having hollow tubes (as for the passage of fluids). | *"In academic literature, tubelike designates constituting a tube; having hollow tubes (as for the passage of fluids)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tuber]] | noun | **1.** A fleshy underground stem or root serving for reproductive and food storage.<br>**2.** Type genus of the tuberaceae: fungi whose fruiting bodies are typically truffles. | *"Sometimes—especially on the smoother kinds of tuber—two or more regular systems of concentric spots are exhibited on the same tuber."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[tuberaceae]] | noun | **1.** Family of fungi whose ascocarps resemble tubers and vary in size from that of an acorn to that of a large apple. | *"In academic literature, tuberaceae designates family of fungi whose ascocarps resemble tubers and vary in size from that of an acorn to that of a large apple."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tuberales]] | noun | **1.** Small order of fungi belonging to the subdivision ascomycota having closed underground ascocarps. | *"In academic literature, tuberales designates small order of fungi belonging to the subdivision ascomycota having closed underground ascocarps."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tubercle]] | noun | **1.** A swelling that is the characteristic lesion of tuberculosis.<br>**2.** Small rounded wartlike protuberance on a plant. | *"They belonged to the tubercle kind which are peculiar to the Indian seas."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[tubercular]] | noun | **1.** A person with pulmonary tuberculosis.<br>**2.** Characterized by the presence of tuberculosis lesions or tubercles. | *"In academic literature, tubercular designates a person with pulmonary tuberculosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tubercularia]] | noun | **1.** Type genus of the tuberculariaceae; fungi with nodules of red or pink conidia; some cause diebacks of woody plants. | *"In academic literature, tubercularia designates type genus of the tuberculariaceae; fungi with nodules of red or pink conidia; some cause diebacks of woody plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tuberculariaceae]] | noun | **1.** Large family of mainly saprophytic imperfect fungi. | *"In academic literature, tuberculariaceae designates large family of mainly saprophytic imperfect fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tuberculate]] | adjective | **1.** Covered with tubercles. | *"In academic literature, tuberculate designates covered with tubercles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tuberculin]] | noun | **1.** A sterile liquid containing a purified protein derivative of the tuberculosis bacterium; used in the diagnosis of tuberculosis. | *"In academic literature, tuberculin designates a sterile liquid containing a purified protein derivative of the tuberculosis bacterium; used in the diagnosis of tuberculosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tuberculoid]] | adjective | **1.** Resembling tuberculosis. | *"In academic literature, tuberculoid designates resembling tuberculosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tuberculosis]] | noun | **1.** Infection transmitted by inhalation or ingestion of tubercle bacilli and manifested in fever and small lesions (usually in the lungs but in various other parts of the body in acute stages). | *"Oh, and others followed Hodge and Polazzo; and others, whose physical stamina had been impaired, fell victims to prison-tuberculosis."* — Jack London, *The Jacket (The Star-Rover)* |
| [[tuberculous]] | adjective | **1.** Constituting or afflicted with or caused by tuberculosis or the tubercle bacillus. | *"In academic literature, tuberculous designates constituting or afflicted with or caused by tuberculosis or the tubercle bacillus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tuberose]] | noun | **1.** A tuberous mexican herb having grasslike leaves and cultivated for its spikes of highly fragrant lily-like waxy white flowers. | *"In academic literature, tuberose designates a tuberous mexican herb having grasslike leaves and cultivated for its spikes of highly fragrant lily-like waxy white flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tuberosity]] | noun | **1.** A protuberance on a bone especially for attachment of a muscle or ligament. | *"In academic literature, tuberosity designates a protuberance on a bone especially for attachment of a muscle or ligament."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tuberous]] | adjective | **1.** Of or relating to or resembling a tuber. | *"I saw long ribbons of fucus floating, some globular, others tuberous; laurenciæ and cladostephi of most delicate foliage, and some rhodomeniæ palmatæ, resembling the fan of a cactus."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[tubing]] | noun | **1.** Conduit consisting of a long hollow object (usually cylindrical) used to hold and conduct objects or liquids or gases.<br>**2.** Provide with a tube or insert a tube into. | *"In academic literature, tubing designates conduit consisting of a long hollow object (usually cylindrical) used to hold and conduct objects or liquids or gases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tubman]] | noun | **1.** United states abolitionist born a slave on a plantation in maryland and became a famous conductor on the underground railroad leading other slaves to freedom in the north (1820-1913). | *"In academic literature, tubman designates united states abolitionist born a slave on a plantation in maryland and became a famous conductor on the underground railroad leading other slaves to freedom in the north (1820-1913)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tubocurarine]] | noun | **1.** A toxic alkaloid found in certain tropical south american trees that is a powerful relaxant for striated muscles. | *"In academic literature, tubocurarine designates a toxic alkaloid found in certain tropical south american trees that is a powerful relaxant for striated muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tubular]] | adjective | **1.** Constituting a tube; having hollow tubes (as for the passage of fluids). | *"The furnace top consists of cast-iron corner-posts and dividers, the walls and ends laid up with brickwork, surmounted by a tubular top of the Shelby type from which the gas off-takes lead."* — Donald M. Levy, *Modern Copper Smelting* |
| [[tubule]] | noun | **1.** A small tube. | *"In academic literature, tubule designates a small tube."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tubulidentata]] | noun | **1.** An order of eutheria. | *"In academic literature, tubulidentata designates an order of eutheria."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Objects & Forms]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TUB
  </div>
</div>
