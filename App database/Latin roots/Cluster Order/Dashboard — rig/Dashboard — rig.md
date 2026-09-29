---
status: unread
type: root_dashboard
---
# Dashboard — rig
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rig-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to be stiff”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Arranging books neatly in a row on a shelf according to their category.</span>
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

The root **rig** means to be stiff. It refers to the action of bing and carrying out this process. In English, this root forms words such as *cold*, *rigid*, *rigidification*, and *rigidify*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to be stiff
> The root **rig** means to be stiff. It refers to the action of bing and carrying out this process. In English, this root forms words such as *cold*, *rigid*, *rigidification*, and *rigidify*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To be stiff</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Arranging books neatly in a row on a shelf according to their category.</mark>
> - **Everyday Connection**: Think of familiar words like *cold* and *rigid*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rig** comes from a Latin word that means *"to be stiff"*.
  - At its core, it describes the action of be stiff.

- **The Big Picture Idea**:
  - Picture arranging books neatly in a row on a shelf according to their category.
  - Whenever you see **rig** in an English word, think of **to be stiff**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to be stiff).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Cold**: An everyday English word showing the root's idea of *to be stiff*.
  - **Rigid**: Unable to bend or be forced out of shape.
  - **Rigidification**: The process of making or becoming rigid, stiff, or inflexible.
  - **Rigidify**: To make or become rigid, stiff, or inflexible.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rig</mark>, think of <mark class="hl-def">to be stiff</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **rig** generates vocabulary through adjectival derivation, nominalization, and verbal factitives:
> - **Base Adjective & Noun:**
>   - *rigidus* $	o$ *rigid* ("stiff, inflexible, unbending").
>   - *rigidus* + *-itās* $	o$ Latin *rigiditās* $	o$ *rigidity* ("the quality or state of being rigid").
>   - *rigor* $	o$ *rigor* ("strictness, austerity, harshness").
>   - *rigor* + *-ōsus* $	o$ Medieval Latin *rigorōsus* $	o$ *rigorous*, *rigorously*, *rigorousness*.
> - **Verbal Factitives with *-fy* (*-ficāre*):**
>   - *rigid* + *-ify* $	o$ *rigidify*, *rigidification* ("to make or become rigid or inflexible").
> - **Specialized Technical & Prefixed Compounds:**
>   - *rigor* + Latin *mortis* (genitive of *mors* "death") $	o$ *rigor mortis* ("postmortem muscular stiffening").
>   - *semi-* ("half") + *rigid* $	o$ *semirigid* ("partially rigid, as an airship").

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
> - **Epistemology & Scientific Method:** *rigor*, *rigorous*, *rigorously* (mathematical proof, double-blind trials).
> - **Materials Science & Engineering:** *rigid*, *rigidity*, *rigidify*, *semirigid* (structural framing, modulus of elasticity).
> - **Forensic Medicine & Pathology:** *rigor mortis*, *rigor* (postmortem muscle contractions, chills of high fever).
> - **Governance, Law & Ethics:** *rigor*, *rigid* (inflexible legal doctrines, dogmatic orthodoxy).
> - **Environmental Hardship:** *rigors* (surviving severe arctic conditions or military survival trials).

---

## 🔀 4. Prefix & Combining Dynamics on rig

### Suffix & Compound Matrix

| Affix / Compound | Form | Derivative | Morphological Shift |
| :--- | :--- | :--- | :--- |
| `-id` (state, quality) | Suffix | **[[rigid]]** | Stiff, hard, unbending under physical force or moral pressure. |
| `-ity` (state, condition) | Suffix | **[[rigidity]]** | The physical property of resisting shear or bending; mental dogmatism. |
| `-ous` (abounding in) | Suffix | **[[rigorous]]** | Characterized by uncompromising thoroughness and analytical severity. |
| `-ify` (factitive verb) | Suffix | **rigidify** | To harden into a stiff, unchanging, or inflexible state. |
| `semi-` (half, partial) | Prefix | **semirigid** | Possessing a partially flexible structure supported by a rigid keel or frame. |
| `mortis` (of death) | Compound | **rigor mortis** | The postmortem chemical stiffening of skeletal muscles caused by ATP depletion. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Scientific Research & Mathematics** | *rigor*, *rigorous*, *rigorously* | Ensuring mathematical proofs satisfy rigorous axioms without unstated assumptions. |
| 🏗️ **Structural & Aerospace Engineering** | *rigid*, *rigidity*, *semirigid* | Calculating the torsional rigidity of bridge trusses and semirigid dirigibles. |
| ⚖️ **Forensic Pathology & Law** | *rigor mortis*, *rigor* | Estimating the postmortem interval (PMI) by assessing the progression of rigor mortis. |
| 🏛️ **Political Science & Sociology** | *rigidity*, *rigid* | Analyzing bureaucratic institutional rigidity preventing adaptive policy reforms. |
| 🏔️ **Exploration & Survival Physiology** | *rigors* | Enduring the sub-zero rigors of an Antarctic polar expedition. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[agrigento]] | noun | **1.** A town in italy in southwestern sicily near the coast; the site of six greek temples. | *"In academic literature, agrigento designates a town in italy in southwestern sicily near the coast; the site of six greek temples."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corrigenda]] | noun | **1.** A list of printing errors in a book along with their corrections.<br>**2.** A printer's error; to be corrected. | *"In academic literature, corrigenda designates a list of printing errors in a book along with their corrections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corrigendum]] | noun | **1.** A printer's error; to be corrected. | *"In academic literature, corrigendum designates a printer's error; to be corrected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corrigible]] | adjective | **1.** Capable of being corrected or set right. | *"In academic literature, corrigible designates capable of being corrected or set right."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dirigible]] | noun | **1.** A steerable self-propelled aircraft.<br>**2.** Capable of being steered or directed. | *"Disembarked, we lined up for bedrolls, and were pointed toward rows of tents in a muddy field adjacent a dirigible hangar."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[erigeron]] | noun | **1.** Cosmopolitan genus of usually perennial herbs with flowers that resemble asters; leaves occasionally (especially formerly) used medicinally. | *"In academic literature, erigeron designates cosmopolitan genus of usually perennial herbs with flowers that resemble asters; leaves occasionally (especially formerly) used medicinally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erignathus]] | noun | **1.** Bearded seals. | *"In academic literature, erignathus designates bearded seals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incorrigible]] | adjective | **1.** Impervious to correction by punishment. | *"Those black angularities which his face had used to put on when his wishes were thwarted now did duty in picturing the incorrigible backslider who would insist upon turning again to his wallowing in the mire."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[irrigate]] | verb | **1.** Supply with water, as with channels or ditches or streams.<br>**2.** Supply with a constant flow or sprinkling of some liquid, for the purpose of cooling, cleansing, or disinfecting. | *"Thus it will be seen that abundant fall is obtainable to irrigate all the lands adjacent."* — W. E. Webb, *Buffalo Land* |
| [[irrigation]] | noun | **1.** Supplying dry land with water by means of ditches etc.<br>**2.** (medicine) cleaning a wound or body organ by flushing or washing out with water or a medicated solution. | *"Men were at work here and there—for it was the season for “taking up” the meadows, or digging the little waterways clear for the winter irrigation, and mending their banks where trodden down by the cows."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[nonrigid]] | adjective | **1.** Designating an airship having a shape maintained only by internal gas pressure and without a supporting structure. | *"In academic literature, nonrigid designates designating an airship having a shape maintained only by internal gas pressure and without a supporting structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rig]] | noun | **1.** Gear (including necessary machinery) for a particular enterprise.<br>**2.** A truck consisting of a tractor and trailer together. | *"And that is it Hath made me rig my navy, at whose burden The angered ocean foams, with which I meant To scourge th’ ingratitude that despiteful Rome Cast on my noble father."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[riga]] | noun | **1.** A port city on the gulf of riga that is the capital and largest city of latvia; formerly a member of the hanseatic league. | *"In Riga the day is a festival of flowers."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[rigamarole]] | noun | **1.** A set of confused and meaningless statements.<br>**2.** A long and complicated and confusing procedure. | *"I left the paper out yonder in my buggy, but I'll go get it." "That rigamarole is all beyond me, Nannie."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[rigatoni]] | noun | **1.** Tubular pasta in short ribbed pieces. | *"In academic literature, rigatoni designates tubular pasta in short ribbed pieces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rigel]] | noun | **1.** The brightest star in orion. | *"Rigel!" his mind called, and the thought went on."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[rigged]] | verb | **1.** Arrange the outcome of by means of deceit.<br>**2.** Manipulate in a fraudulent manner. | *"God prospered the efforts--the ship righted; they got the pumps at work, rigged a sail, and were finally all saved."* — Classic Author, *The wonders of prayer* |
| [[rigger]] | noun | **1.** Someone who rigs ships.<br>**2.** A long slender pointed sable brush used by artists. | *"Seeing a light, we went down, and found only an old rigger there, wrapped in a tattered pea-jacket."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[rigging]] | noun | **1.** Gear consisting of ropes etc. supporting a ship's masts and sails.<br>**2.** Formation of masts, spars, sails, etc., on a vessel. | *"Fog creeping into the cabooses of collier-brigs; fog lying out on the yards and hovering in the rigging of great ships; fog drooping on the gunwales of barges and small boats."* — Charles Dickens, *Bleak House* |
| [[rigid]] | adjective | **1.** Incapable of or resistant to bending.<br>**2.** Incapable of compromise or flexibility. | *"Rigid with consternation, she stopped under the doorway."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[rigidification]] | noun | **1.** The process of becoming stiff or rigid. | *"In academic literature, rigidification designates the process of becoming stiff or rigid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rigidify]] | verb | **1.** Become rigid.<br>**2.** Make rigid and set into a conventional pattern. | *"In academic literature, rigidify designates become rigid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rigidifying]] | noun | **1.** The process of becoming stiff or rigid.<br>**2.** Become rigid. | *"In academic literature, rigidifying designates the process of becoming stiff or rigid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rigidity]] | noun | **1.** The physical property of being stiff and resisting bending.<br>**2.** The quality of being rigid and rigorously severe. | *"Bagnet with the warmest enthusiasm, though without relaxing the rigidity of a single muscle."* — Charles Dickens, *Bleak House* |
| [[rigidly]] | adverb | **1.** In a rigid manner. | *"The trooper raising his head, she makes another poke at her esteemed grandfather, and having thus brought them together, stares rigidly at the fire."* — Charles Dickens, *Bleak House* |
| [[rigidness]] | noun | **1.** The physical property of being stiff and resisting bending.<br>**2.** The quality of being rigid and rigorously severe. | *"In academic literature, rigidness designates the physical property of being stiff and resisting bending."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rigil]] | noun | **1.** Brightest star in centaurus; second nearest star to the sun. | *"In academic literature, rigil designates brightest star in centaurus; second nearest star to the sun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rigmarole]] | noun | **1.** A set of confused and meaningless statements.<br>**2.** A long and complicated and confusing procedure. | *"Susy ran through a long rigmarole, with a volubility worthy the daughter of a fluent public speaker."* — Effie Afton, *Eventide* |
| [[rigor]] | noun | **1.** Something hard to endure.<br>**2.** The quality of being valid and rigorous. | *"Be sure, with all the cruelty, with all the rigor, For thou hast rob'd me villain of a treasure. _Enter Guard_."* — John Fletcher, *Beaumont and Fletcher's Works, Vol. 01 of 10: the Custom of the Country* |
| [[rigorous]] | adjective | **1.** Rigidly accurate; allowing no deviation from a standard.<br>**2.** Demanding strict attention to rules and procedures. | *"He shall be thrown down the Tarpeian rock With rigorous hands."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rigorously]] | adverb | **1.** In a rigorous manner. | *"Joan of Arc hath been A virgin from her tender infancy, Chaste and immaculate in very thought; Whose maiden blood, thus rigorously effused, Will cry for vengeance at the gates of heaven."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rigorousness]] | noun | **1.** Something hard to endure.<br>**2.** Excessive sternness. | *"In academic literature, rigorousness designates something hard to endure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rigour]] | noun | **1.** The quality of being valid and rigorous.<br>**2.** Something hard to endure. | *"Base dunghill villain and mechanical, I’ll have thy head for this thy traitor’s speech!— I do beseech your royal majesty, Let him have all the rigour of the law."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rigourousness]] | noun | **1.** Something hard to endure.<br>**2.** Excessive sternness. | *"In academic literature, rigourousness designates something hard to endure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rigout]] | noun | **1.** A person's costume (especially if bizarre). | *"In academic literature, rigout designates a person's costume (especially if bizarre)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serigraph]] | noun | **1.** A print made using a stencil process in which an image or design is superimposed on a very fine mesh screen and printing ink is squeegeed onto the printing surface through the area of the screen that is not covered by the stencil. | *"In academic literature, serigraph designates a print made using a stencil process in which an image or design is superimposed on a very fine mesh screen and printing ink is squeegeed onto the printing surface through the area of the screen that is not covered by the stencil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serigraphy]] | noun | **1.** The act of making a print by the silkscreen method. | *"In academic literature, serigraphy designates the act of making a print by the silkscreen method."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrigged]] | adjective | **1.** Stripped of rigging. | *"As she drew nigh, all eyes were fixed upon her broad beams, called shears, which, in some whaling-ships, cross the quarter-deck at the height of eight or nine feet; serving to carry the spare, unrigged, or disabled boats."* — Herman Melville, *Moby-Dick; or, The Whale* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Order]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · RIG
  </div>
</div>
