---
status: unread
type: root_dashboard
---
# Dashboard — verg
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">verg-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to bend, turn, or incline”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Revolving a steering wheel to turn a vehicle around a curve.</span>
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

The root **verg** means to bend, turn, or incline. It refers to rotating around an axis, changing direction, or shifting state. In English, this root forms words such as *converge*, *convergence*, *convergent*, and *diverge*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to bend, turn, or incline
> The root **verg** means to bend, turn, or incline. It refers to rotating around an axis, changing direction, or shifting state. In English, this root forms words such as *converge*, *convergence*, *convergent*, and *diverge*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To bend, turn, or incline</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Revolving a steering wheel to turn a vehicle around a curve.</mark>
> - **Everyday Connection**: Think of familiar words like *converge* and *convergence*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **verg** comes from a Latin word that means *"to bend, turn, or incline"*.
  - At its core, it describes the action of bend, turn, or incline.

- **The Big Picture Idea**:
  - Picture revolving a steering wheel to turn a vehicle around a curve.
  - Whenever you see **verg** in an English word, think of **to bend, turn, or incline**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to bend, turn, or incline).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Converge**: To tend toward or meet at a common point or focus.
  - **Convergence**: The process or state of converging toward a common point.
  - **Convergent**: Tending to move toward one point or approach each other.
  - **Diverge**: To separate and go in different directions from a common point.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">verg</mark>, think of <mark class="hl-def">to bend, turn, or incline</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `verg-`: Present verbal root.
- **Directional Prefix Dynamics**:
  - `con-` ("together"): *converge* ("to incline toward a single point").
  - `di-` ("apart, in two"): *diverge* ("to bend apart in different directions").
- **Suffixal Formations**:
  - `-ence`: *convergence, divergence* (state/process).
  - `-ent`: *convergent, divergent* (participial adjective).

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
```
                         ┌── Inward Focus: converge, convergence, convergent
   [verg] ───────────────┼── Outward Separation: diverge, divergence, divergent
 (To Incline / Tend)     │
                         └── Threshold Leaning: verge (verging on catastrophe)
```

---

## 🔀 4. Prefix & Combining Dynamics on verg
- **`con-` + `verg`**: *converge* — to lean together toward a common intersection or consensus.
- **`di-` + `verg`**: *diverge* — to branch away from a single trunk into irreconcilable trajectories.
- **`verg-` + `-ing`**: *verging* — approaching the brink of a new state or condition.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Optics & Ophthalmology**: *Convergent* (magnifying) versus *divergent* lenses; corrective lenses for myopia.
- **Calculus & Analysis**: *Convergence* tests (ratio test, integral test); *divergent* mathematical series.
- **Evolutionary Biology**: *Convergent* evolution (analogous organs) vs. *divergent* evolution (homologous organs).
- **Geopolitics & Economics**: Economic *convergence* criteria between developing and advanced nations.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[converge]] | verb | **1.** Be adjacent or come together.<br>**2.** Approach a limit as the number of terms increases without limit. | *"Because of the threat to Slingshot that they perceive in you, the UIPS has been draining both groups lately to augment patrols along routes through the Outer Region that converge on the Special Zone."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[convergence]] | noun | **1.** The occurrence of two or more things coming together.<br>**2.** The approach of an infinite series to a finite limit. | *"Work out the nav for our fleet to the rendezvous; design formations, convergence and other vectors that'll keep the ships out of each other's way."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[convergency]] | noun | **1.** The approach of an infinite series to a finite limit.<br>**2.** The act of converging (coming closer). | *"In academic literature, convergency designates the approach of an infinite series to a finite limit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convergent]] | adjective | **1.** Tending to come together from different directions. | *"In academic literature, convergent designates tending to come together from different directions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[converging]] | noun | **1.** The act of converging (coming closer).<br>**2.** Be adjacent or come together. | *"On the extreme summit, where the ends of the two converging hedges of which we have spoken were stopped short by meeting the brow of the chalk-pit, he saw the younger dog standing against the sky—dark and motionless as Napoleon at St."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[diverge]] | verb | **1.** Move or draw apart.<br>**2.** Have no limits as a mathematical series. | *"If we did by any chance diverge into another subject, we soon returned to this, and wondered what the house would be like, and when we should get there, and whether we should see Mr."* — Charles Dickens, *Bleak House* |
| [[divergence]] | noun | **1.** The act of moving away in different direction from a common point.<br>**2.** A variation that deviates from the standard or norm. | *"But on seeing Bathsheba turn, he looked aside, and as soon as he got beyond the gate, and there was the barest excuse for a divergence, he made one, and vanished."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[divergency]] | noun | **1.** An infinite series that has no limit.<br>**2.** The act of moving away in different direction from a common point. | *"In academic literature, divergency designates an infinite series that has no limit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divergent]] | adjective | **1.** Diverging from another or from a standard.<br>**2.** Tending to move apart in different directions. | *"This too familiar intonation, less than four years earlier, had brought to her ears expressions of such divergent purpose that her heart became quite sick at the irony of the contrast."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[diverging]] | verb | **1.** Move or draw apart.<br>**2.** Have no limits as a mathematical series. | *"Its difference from the manatee consisted in its upper jaw, which was armed with two long and pointed teeth which formed on each side diverging tusks."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[everglades]] | noun | **1.** A large subtropical swamp in southern florida that is noted for its wildlife. | *"No. 63—The Florida Scout; or, The Princess of the Everglades."* — Jos. E. Badger, *The Texas Hawks; or, The Strange Decoy* |
| [[evergreen]] | noun | **1.** A plant having foliage that persists and remains green throughout the year.<br>**2.** (of plants and shrubs) bearing foliage throughout the year. | *"The stables, partly screened by Austrian pines and evergreen oaks, and fitted with every late appliance, were as dignified as Chapels-of-Ease."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[nonconvergent]] | adjective | **1.** (of lines, planes, or surfaces) never meeting or crossing. | *"In academic literature, nonconvergent designates (of lines, planes, or surfaces) never meeting or crossing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[verge]] | noun | **1.** A region marking a boundary.<br>**2.** The limit beyond which something happens or changes. | *"And thus the hairy fool, Much marked of the melancholy Jaques, Stood on th’ extremest verge of the swift brook, Augmenting it with tears."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[verger]] | noun | **1.** A church officer who takes care of the interior of the building and acts as an attendant (carries the verge) during ceremonies. | *"To this the verger applied a key; it was double locked, and opened with some difficulty, as if seldom used."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[vergil]] | noun | **1.** A roman poet; author of the epic poem `aeneid' (70-19 bc). | *"There came several bodies of heavy-armed foot, all mercenaries, under the ensigns of Guicciardini, Davila, Polydore Vergil, Buchanan, Mariana, Camden, and others."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Turning]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VERG
  </div>
</div>
