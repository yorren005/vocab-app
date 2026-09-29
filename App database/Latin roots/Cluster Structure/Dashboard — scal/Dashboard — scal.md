---
status: unread
type: root_dashboard
---
# Dashboard — scal
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">scal-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“ladder or stairs”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The sturdy wooden framework supporting the roof of a house.</span>
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

The root **scal** means ladder or stairs. It refers to a climbing ladder, flight of steps, or ascending stairs. In English, this root forms words such as *climb*, *descale*, *escalate*, and *escalation*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: ladder or stairs
> The root **scal** means ladder or stairs. It refers to a climbing ladder, flight of steps, or ascending stairs. In English, this root forms words such as *climb*, *descale*, *escalate*, and *escalation*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Ladder or stairs</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sturdy wooden framework supporting the roof of a house.</mark>
> - **Everyday Connection**: Think of familiar words like *climb* and *descale*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **scal** comes from a Latin word that means *"ladder or stairs"*.
  - At its core, it describes ladder or stairs.

- **The Big Picture Idea**:
  - Picture the sturdy wooden framework supporting the roof of a house.
  - Whenever you see **scal** in an English word, think of **underlying structure and framework**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of ladder or stairs.
  - **Mental & Social**: How people experience, organize, or communicate about ladder or stairs.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Climb**: An everyday English word showing the root's idea of *ladder or stairs*.
  - **Descale**: To remove scale or mineral encrustation from a kettle, boiler, or pipe.
  - **Escalate**: To increase rapidly in intensity, magnitude, or scope.
  - **Escalation**: A rapid increase.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">scal</mark>, think of <mark class="hl-def">underlying structure and framework</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **scal** operates through two main lexical tracks:
- **Direct Mathematical & Measurement Stems (`scal-` < *scāla*)**:
  - *scāla* $\to$ **scale**, **scalar**, **scaler**.
  - Prefix compounds: **upscale**, **downscale**, **descale** (cleaning off mineral scale; see Section 8).
- **The Modern Moving & Escalating Stems (`escal-`)**:
  - Latin *scāla* + *elevator* $\to$ **escalator**.
  - Back-formation from escalator $\to$ **escalate**, **escalation**, **de-escalate**, **de-escalation**.

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

The derivatives of **scal** govern four primary conceptual fields:
- **Measurement, Ratios & Cartography**: *scale* (a graduated series of marks for measuring; the ratio between distance on a map and real distance).
- **Physics, Mathematics & Computing**: *scalar* (a physical quantity completely described by its magnitude, without direction, unlike a vector), *scalar multiplication*.
- **Mechanical Transportation & Engineering**: *escalator* (a moving staircase consisting of an endlessly circulating belt of steps), *scaler* (an electronic instrument for counting pulses).
- **Crisis Dynamics, Warfare & Conflict**: *escalate* (increase rapidly in intensity, scale, or scope), *escalation* (a rapid increase), *de-escalate* (reduce the level or intensity of conflict).

---

## 🔀 4. Prefix & Combining Dynamics on scal

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`-ar`** (adjectival) | `scāla` + `-āris` | Relating to a graduated ladder $\to$ magnitude without vector direction | *scalar* |
| **`e-`** (blend) | `ex-` + *scāla* + *ator* | Moving step-by-step upwards $\to$ mechanical moving stairs | *escalator* |
| **`de-`** ("down") | `de-` + *escalate* | Climb down the ladder of conflict $\to$ reduce military tension | *de-escalate, de-escalation* |
| **`up-`** ("higher") | `up-` + *scale* | Located higher up the ladder of wealth/taste $\to$ luxurious | *upscale* |
| **`de-`** ("off, away")| `de-` + *scale* (crust) | Remove mineral encrustation $\to$ clean pipes or kettles | *descale* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Physics & Vector Calculus**: Scalars (mass, temperature, time) vs Vectors (velocity, force, momentum) (*scalar field*, *scalar product*).
- **Geopolitics & International Security**: Escalation dominance, nuclear deterrence ladders, and diplomatic de-escalation (*conflict escalation*).
- **Cartography & Geodesy**: Representative fractions, graphic scale bars, and map scales (*1:50,000 scale map*).
- **Music Theory & Harmony**: Diatonic scales, chromatic scales, and octaves (*pentatonic scale*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[descale]] | verb | **1.** Remove the scales from. | *"In academic literature, descale designates remove the scales from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discalceate]] | adjective | **1.** (used of certain religious orders) barefoot or wearing only sandals. | *"In academic literature, discalceate designates (used of certain religious orders) barefoot or wearing only sandals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discalced]] | adjective | **1.** (used of certain religious orders) barefoot or wearing only sandals. | *"In academic literature, discalced designates (used of certain religious orders) barefoot or wearing only sandals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[escalade]] | noun | **1.** An act of scaling by the use of ladders (especially the walls of a fortification).<br>**2.** Climb up and over. | *"For before I could turn away a troop of children issued out and rushed at him, taking him by escalade, routed out his pockets, even his wife and sisters taking part, and he all the time laughing."* — S. R. Crockett, *Deep Moat Grange* |
| [[escalader]] | noun | **1.** Someone who gains access by the use of ladders. | *"In academic literature, escalader designates someone who gains access by the use of ladders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[escalate]] | verb | **1.** Increase in extent or intensity. | *"If we play the game right, and show a united front, this confrontation won't escalate to major military actions."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[escalation]] | noun | **1.** An increase to counteract a perceived discrepancy. | *"In academic literature, escalation designates an increase to counteract a perceived discrepancy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[escalator]] | noun | **1.** A clause in a contract that provides for an increase or a decrease in wages or prices or benefits etc. depending on certain conditions (as a change in the cost of living index).<br>**2.** A stairway whose steps move continuously on a circulating belt. | *"In academic literature, escalator designates a clause in a contract that provides for an increase or a decrease in wages or prices or benefits etc. depending on certain conditions (as a change in the cost of living index)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[escallop]] | noun | **1.** Edible muscle of mollusks having fan-shaped shells; served broiled or poached or in salads or cream sauces.<br>**2.** Thin slice of meat (especially veal) usually fried or broiled. | *"In academic literature, escallop designates edible muscle of mollusks having fan-shaped shells; served broiled or poached or in salads or cream sauces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rescale]] | verb | **1.** Establish on a new scale. | *"In academic literature, rescale designates establish on a new scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scalability]] | noun | **1.** The quality of being scalable. | *"In academic literature, scalability designates the quality of being scalable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scalable]] | adjective | **1.** Capable of being scaled; possible to scale. | *"In academic literature, scalable designates capable of being scaled; possible to scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scalage]] | noun | **1.** Estimation of the amount of lumber in a log.<br>**2.** The act of scaling in weight or quantity or dimension. | *"In academic literature, scalage designates estimation of the amount of lumber in a log."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scalar]] | noun | **1.** A variable quantity that cannot be resolved into components.<br>**2.** Of or relating to a musical scale. | *"In academic literature, scalar designates a variable quantity that cannot be resolved into components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scalawag]] | noun | **1.** A white southerner who supported reconstruction policies after the american civil war (usually for self-interest).<br>**2.** A deceitful and unreliable scoundrel. | *"One following the other, the warships catapulted off of their launch tracks, rose swiftly into space, and formed up behind mine sweepers Scamp, Varlet and Scalawag."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[scale]] | noun | **1.** An ordered reference standard.<br>**2.** Relative magnitude. | *"By heaven, thy madness shall be paid by weight, Till our scale turn the beam."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scaled]] | verb | **1.** Measure by or as if by a scale.<br>**2.** Pattern, make, regulate, set, measure, or estimate according to some rate or standard. | *"O, I would thou didst, So half my Egypt were submerged and made A cistern for scaled snakes!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scaleless]] | adjective | **1.** Destitute of scales. | *"In academic literature, scaleless designates destitute of scales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scalelike]] | adjective | **1.** Reduced to a small appressed thing that resembles a scale. | *"In academic literature, scalelike designates reduced to a small appressed thing that resembles a scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scalene]] | adjective | **1.** Of a triangle having three sides of different lengths.<br>**2.** Of or relating to any of the scalene muscles. | *"In academic literature, scalene designates of a triangle having three sides of different lengths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scalenus]] | noun | **1.** Any of four pairs of muscles extending from the cervical vertebrae to the second rib; involved in moving the neck and in breathing. | *"In academic literature, scalenus designates any of four pairs of muscles extending from the cervical vertebrae to the second rib; involved in moving the neck and in breathing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scaler]] | noun | **1.** An electronic pulse counter used to count pulses that occur too rapidly to be recorded individually. | *"In the office where the clerk, the bosses, scalers and others of more pretentious occupation sleep, one corner is set apart for the wannigan, as the small camp store is called."* — Thomas D. Whittles, *The Lumberjack Sky Pilot* |
| [[scaley]] | adjective | **1.** Having the body covered or partially covered with thin horny plates, as some fish and reptiles. | *"In academic literature, scaley designates having the body covered or partially covered with thin horny plates, as some fish and reptiles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scalic]] | adjective | **1.** Of or related to a musical scale. | *"In academic literature, scalic designates of or related to a musical scale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scaliness]] | noun | **1.** The property of being scaly. | *"In academic literature, scaliness designates the property of being scaly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scaling]] | noun | **1.** The act of arranging in a graduated series.<br>**2.** Act of measuring or arranging or adjusting according to a scale. | *"Enter King Henry, Exeter, Bedford, Gloucester and Soldiers, with scaling-ladders."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scallion]] | noun | **1.** Plant having a large slender white bulb and flat overlapping dark green leaves; used in cooking; believed derived from the wild allium ampeloprasum.<br>**2.** A young onion before the bulb has enlarged; eaten in salads. | *"In academic literature, scallion designates plant having a large slender white bulb and flat overlapping dark green leaves; used in cooking; believed derived from the wild allium ampeloprasum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scallop]] | noun | **1.** One of a series of rounded projections (or the notches between them) formed by curves along an edge (as the edge of a leaf or piece of cloth or the margin of a shell or a shriveled red blood cell observed in a hypertonic solution etc.).<br>**2.** Edible muscle of mollusks having fan-shaped shells; served broiled or poached or in salads or cream sauces. | *"Stephen’s embarrassed hand moved over the shells heaped in the cold stone mortar: whelks and money cowries and leopard shells: and this, whorled as an emir’s turban, and this, the scallop of saint James."* — James Joyce, *Ulysses* |
| [[scalloped]] | verb | **1.** Decorate an edge with scallops.<br>**2.** Bake in a sauce, milk, etc., often with breadcrumbs on top. | *"Towards the close of the entertainment, the person who officiated as master of the feast produced a large cake baked with eggs and scalloped round the edge, called _am bonnach beal-tine--i.e._ the Beltane cake."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[scallopine]] | noun | **1.** Sauteed cutlets (usually veal or poultry) that have been pounded thin and coated with flour. | *"In academic literature, scallopine designates sauteed cutlets (usually veal or poultry) that have been pounded thin and coated with flour."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scallopini]] | noun | **1.** Sauteed cutlets (usually veal or poultry) that have been pounded thin and coated with flour. | *"In academic literature, scallopini designates sauteed cutlets (usually veal or poultry) that have been pounded thin and coated with flour."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scallywag]] | noun | **1.** A white southerner who supported reconstruction policies after the american civil war (usually for self-interest).<br>**2.** A deceitful and unreliable scoundrel. | *"In academic literature, scallywag designates a white southerner who supported reconstruction policies after the american civil war (usually for self-interest)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[scaly]] | adjective | **1.** Rough to the touch; covered with scales or scurf.<br>**2.** Having the body covered or partially covered with thin horny plates, as some fish and reptiles. | *"A scaly gauntlet now with joints of steel Must glove this hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scaly-tailed]] | adjective | **1.** Having a scaly tail. | *"In academic literature, scaly-tailed designates having a scaly tail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unscalable]] | adjective | **1.** Incapable of being ascended. | *"In academic literature, unscalable designates incapable of being ascended."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Structure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SCAL
  </div>
</div>
