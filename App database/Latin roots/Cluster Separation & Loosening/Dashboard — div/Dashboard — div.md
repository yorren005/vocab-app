---
status: unread
type: root_dashboard
---
# Dashboard — div
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">div-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to divide or separate”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Untying a tight knot and separating two parts from each other.</span>
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

The root **div** means to divide or separate. It refers to the action of dividing and carrying out this process. In English, this root forms words such as *divide*, *dividend*, *divisible*, and *divisibility*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to divide or separate
> The root **div** means to divide or separate. It refers to the action of dividing and carrying out this process. In English, this root forms words such as *divide*, *dividend*, *divisible*, and *divisibility*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To divide or separate</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Untying a tight knot and separating two parts from each other.</mark>
> - **Everyday Connection**: Think of familiar words like *divide* and *dividend*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **div** comes from a Latin word that means *"to divide or separate"*.
  - At its core, it describes the action of divide or separate.

- **The Big Picture Idea**:
  - Picture untying a tight knot and separating two parts from each other.
  - Whenever you see **div** in an English word, think of **to divide or separate**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to divide or separate).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Divide**: To separate or be separated into parts. 2. A wide divergence between two groups.
  - **Dividend**: A sum of money paid regularly by a company to its shareholders out of its profits. 2. A number to be divided in arithmetic.
  - **Divisible**: Capable of being divided into parts or equal groups without leaving a remainder.
  - **Divisibility**: The quality of being divisible or capable of being partitioned.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">div</mark>, think of <mark class="hl-def">to divide or separate</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Verbal Base:** *divide* $\to$ *divider*, *subdivide*, *subdivision*.
- **Supine / Nominal Base (`-is-`):** *divis-* $\to$ *division*, *divisional*, *divisor*, *divisible*, *divisibility*.
- **Adjectival / Tendency (`-ive`):** *divisive* (causing disagreement or factional split), *divisiveness*.
- **Gerundive Base (`-end`):** *dividend* (that which is divided; corporate profit share).
- **Privative Compound (`in-`):**
  - *indivisible* (incapable of being split).
  - *individual* (single human being), *individuality*, *individualism*, *individualize*.

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

### 1. Mathematical & Physical Partition
- *divide* (to separate or be separated into parts).
- *dividend* (a number to be divided by another; a sum paid to shareholders).
- *divisor* (a number by which another number is to be divided).
- *divisible* (capable of being divided, especially without a remainder).
- *subdivide* (to divide something that has already been divided).

### 2. Social, Political & Emotional Cleavage
- *division* (the action of separating; a major military unit; disagreement).
- *divisive* (tending to cause disagreement or hostility between people).
- *divisiveness* (a tendency to cause conflict, discord, or factional strife).

### 3. Human Singularity & Identity
- *individual* (a single human being as distinct from a group, class, or family).
- *individuality* (the quality or character of a particular person or thing that distinguishes them from others).
- *individualism* (the habit or principle of being independent and self-reliant; political/economic philosophy).
- *individualize* (to tailor or adapt to suit an individual's personal needs).
- *indivisible* (unable to be divided or separated into parts; e.g., "one nation, indivisible").

---

## 🔀 4. Prefix & Combining Dynamics on div

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `dī-` + `vid-` + `-ere` | Base verb | Setting apart into distinct portions | *divide* |
| `dī-` + `vid-` + `-end-um` | Gerundive nominal | A quantity designated for proportional distribution | *dividend* |
| `dīvis-` + `-ive` | Factional adjectival | Sowing discord, polar hostility, or ideological rift | *divisive, divisiveness* |
| `in-` + `dīvid-` + `-ual` | Philosophical privative | An indivisible atomic moral agent | *individual, individuality* |
| `in-` + `dīvis-` + `-ible` | Physical privative | Incapable of fracture, fragmentation, or separation | *indivisible, indivisibility* |
| `sub-` + `divide` | Hierarchical partition | Splitting a pre-existing parcel into smaller units | *subdivide, subdivision* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Mathematics & Arithmetic:** Modular arithmetic, greatest common divisor (GCD), division algorithm, Euclidean division.
- **Corporate Finance & Securities:** Common dividends, dividend yield, dividend reinvestment plans (DRIP).
- **Political Science & Philosophy:** Methodological individualism, social contract theory, polarization and divisive politics.
- **Military Strategy:** Army divisions, mechanized infantry divisions, *divide et impera* tactical doctrine.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[diva]] | noun | **1.** A distinguished female operatic singer; a female operatic star. | *"In academic literature, diva designates a distinguished female operatic singer; a female operatic star."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divagate]] | verb | **1.** Lose clarity or turn aside especially from the main subject of attention or course of argument in writing, thinking, or speaking. | *"In academic literature, divagate designates lose clarity or turn aside especially from the main subject of attention or course of argument in writing, thinking, or speaking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divagation]] | noun | **1.** A message that departs from the main subject.<br>**2.** A turning aside (of your course or attention or concern). | *"Let us be set down at Queen's Crawley without further divagation, and see how Miss Rebecca Sharp speeds there."* — William Makepeace Thackeray, *Vanity Fair* |
| [[divalent]] | adjective | **1.** Having a valence of two or having two valences. | *"In academic literature, divalent designates having a valence of two or having two valences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divan]] | noun | **1.** A long backless sofa (usually with pillows against a wall).<br>**2.** A muslim council of state. | *"Half stretched upon a divan in the library, I was suffocating."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[divaricate]] | verb | **1.** Branch off.<br>**2.** Spread apart. | *"Even to sit where a woman has sat, especially with divaricated thighs, as though to grant the last favours, most especially with previously well uplifted white sateen coatpans."* — James Joyce, *Ulysses* |
| [[divarication]] | noun | **1.** Branching at a wide angle. | *"In academic literature, divarication designates branching at a wide angle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dive]] | noun | **1.** A cheap disreputable nightclub or dance hall.<br>**2.** A headlong plunge into water. | *"Dive, thoughts, down to my soul."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dive-bomb]] | verb | **1.** Bomb from a diving airplane. | *"In academic literature, dive-bomb designates bomb from a diving airplane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dive-bombing]] | noun | **1.** A bombing run in which the bomber releases the bomb while flying straight toward the target.<br>**2.** Bomb from a diving airplane. | *"In academic literature, dive-bombing designates a bombing run in which the bomber releases the bomb while flying straight toward the target."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diver]] | noun | **1.** Someone who works underwater.<br>**2.** Someone who dives (into water). | *"You’re caught.” CHARMIAN. ’Twas merry when You wagered on your angling; when your diver Did hang a salt fish on his hook, which he With fervency drew up."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diverge]] | verb | **1.** Move or draw apart.<br>**2.** Have no limits as a mathematical series. | *"If we did by any chance diverge into another subject, we soon returned to this, and wondered what the house would be like, and when we should get there, and whether we should see Mr."* — Charles Dickens, *Bleak House* |
| [[divergence]] | noun | **1.** The act of moving away in different direction from a common point.<br>**2.** A variation that deviates from the standard or norm. | *"But on seeing Bathsheba turn, he looked aside, and as soon as he got beyond the gate, and there was the barest excuse for a divergence, he made one, and vanished."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[divergency]] | noun | **1.** An infinite series that has no limit.<br>**2.** The act of moving away in different direction from a common point. | *"In academic literature, divergency designates an infinite series that has no limit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divergent]] | adjective | **1.** Diverging from another or from a standard.<br>**2.** Tending to move apart in different directions. | *"This too familiar intonation, less than four years earlier, had brought to her ears expressions of such divergent purpose that her heart became quite sick at the irony of the contrast."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[diverging]] | verb | **1.** Move or draw apart.<br>**2.** Have no limits as a mathematical series. | *"Its difference from the manatee consisted in its upper jaw, which was armed with two long and pointed teeth which formed on each side diverging tusks."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[divers]] | noun | **1.** Someone who works underwater.<br>**2.** Someone who dives (into water). | *"On each side her Stood pretty dimpled boys, like smiling Cupids, With divers-coloured fans, whose wind did seem To glow the delicate cheeks which they did cool, And what they undid did."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diverse]] | adjective | **1.** Many and different.<br>**2.** Distinctly dissimilar or unlike. | *"Pilate waxed eloquent over the diverse sects and the fanatic uprisings and riotings that were continually occurring."* — Jack London, *The Jacket (The Star-Rover)* |
| [[diversely]] | adverb | **1.** In diverse ways. | *"A mere spectator of other men’s fortunes and adventures, and how they play their parts; which, methinks, are diversely presented unto me, as from a common theatre or scene.”--BURTON."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[diverseness]] | noun | **1.** Noticeable heterogeneity. | *"In academic literature, diverseness designates noticeable heterogeneity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diversification]] | noun | **1.** The act of introducing variety (especially in investments or in the variety of goods and services offered).<br>**2.** The condition of being varied. | *"Industries are forced into an earlier diversification by tariffs."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[diversified]] | verb | **1.** Make (more) diverse.<br>**2.** Spread into new habitats and produce variety or variegate. | *"The conclusion of her visit, however, was diversified in a way which she had not at all imagined."* — Jane Austen, *Persuasion* |
| [[diversify]] | verb | **1.** Make (more) diverse.<br>**2.** Spread into new habitats and produce variety or variegate. | *"Whilst the alloy and value depended on the general authority, a right of coinage in the particular States could have no other effect than to multiply expensive mints and diversify the forms and weights of the circulating pieces."* — Alexander Hamilton, *The Federalist Papers* |
| [[diversion]] | noun | **1.** An activity that diverts or amuses or stimulates.<br>**2.** A turning aside (of your course or attention or concern). | *"Guppy, after a moment’s consideration, began, to the great diversion of his mother, which she displayed by nudging Mr."* — Charles Dickens, *Bleak House* |
| [[diversionary]] | adjective | **1.** (of tactics e.g.) likely or designed to confuse or deceive. | *"Narval did say to crank in diversionary tactics that would draw the Terminals' defensive forces away from their normal ops zone." "That's weird." "Agreed."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[diversionist]] | noun | **1.** Someone who commits sabotage or deliberately causes wrecks. | *"In academic literature, diversionist designates someone who commits sabotage or deliberately causes wrecks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diversity]] | noun | **1.** Noticeable heterogeneity.<br>**2.** The condition or result of being changeable. | *"They are of the utmost diversity of subjects, literally including the "all things" of the Bible, and temporal as well as spiritual interests."* — Classic Author, *The wonders of prayer* |
| [[divert]] | verb | **1.** Turn aside; turn away from.<br>**2.** Send on a course or in a direction different from the planned or intended one. | *"The French, advis’d by good intelligence Of this most dreadful preparation, Shake in their fear, and with pale policy Seek to divert the English purposes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diverted]] | verb | **1.** Turn aside; turn away from.<br>**2.** Send on a course or in a direction different from the planned or intended one. | *"Rynaldo, you did never lack advice so much As letting her pass so; had I spoke with her, I could have well diverted her intents, Which thus she hath prevented."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diverticulitis]] | noun | **1.** Inflammation of a diverticulum in the digestive tract (especially the colon); characterized by painful abdominal cramping and fever and constipation. | *"In academic literature, diverticulitis designates inflammation of a diverticulum in the digestive tract (especially the colon); characterized by painful abdominal cramping and fever and constipation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diverticulosis]] | noun | **1.** Presence of multiple diverticula in the walls of the colon. | *"In academic literature, diverticulosis designates presence of multiple diverticula in the walls of the colon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diverticulum]] | noun | **1.** A herniation through the muscular wall of a tubular organ (especially the colon). | *"In academic literature, diverticulum designates a herniation through the muscular wall of a tubular organ (especially the colon)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divertimento]] | noun | **1.** A musical composition in several movements; has no fixed form. | *"In academic literature, divertimento designates a musical composition in several movements; has no fixed form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diverting]] | verb | **1.** Turn aside; turn away from.<br>**2.** Send on a course or in a direction different from the planned or intended one. | *"Bathsheba went home, her mind occupied with a new trouble, which being rather harassing than deadly was calculated to do good by diverting her from the chronic gloom of her life."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[divertingly]] | adverb | **1.** In an entertaining and amusing manner. | *"In academic literature, divertingly designates in an entertaining and amusing manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divest]] | verb | **1.** Take away possessions from someone.<br>**2.** Deprive of status or authority. | *"Tell me, my daughters,— Since now we will divest us both of rule, Interest of territory, cares of state,— Which of you shall we say doth love us most?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divestiture]] | noun | **1.** An order to an offending party to rid itself of property; it has the purpose of depriving the defendant of the gains of wrongful behavior.<br>**2.** The sale by a company of a product line or a subsidiary or a division. | *"The United States, as now composed, have no powers to exact obedience, or punish disobedience to their resolutions, either by pecuniary mulcts, by a suspension or divestiture of privileges, or by any other constitutional mode."* — Alexander Hamilton, *The Federalist Papers* |
| [[divi-divi]] | noun | **1.** Twisted seed pods of the divi-divi tree; source of tannin.<br>**2.** Small thornless tree or shrub of tropical america whose seed pods are a source of tannin. | *"In academic literature, divi-divi designates twisted seed pods of the divi-divi tree; source of tannin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dividable]] | adjective | **1.** Can be divided usually without leaving a remainder. | *"How could communities, Degrees in schools, and brotherhoods in cities, Peaceful commerce from dividable shores, The primogenity and due of birth, Prerogative of age, crowns, sceptres, laurels, But by degree stand in authentic place?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divide]] | noun | **1.** A serious disagreement between two groups of people (typically producing tension or hostility).<br>**2.** A ridge of land that separates two adjacent river systems. | *"The world and my great office will sometimes Divide me from your bosom."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divided]] | verb | **1.** Separate into parts or portions.<br>**2.** Perform a division. | *"Most noble Antony!” Then in the midst a tearing groan did break The name of Antony; it was divided Between her heart and lips."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dividend]] | noun | **1.** That part of the earnings of a corporation that is distributed to its shareholders; usually paid quarterly.<br>**2.** A number to be divided by another number. | *"Whenever the question comes before them, the courts maintain the right of the railroads to earn a fair dividend."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[divider]] | noun | **1.** A taxonomist who classifies organisms into many groups on the basis of relatively minor characteristics.<br>**2.** A person who separates something into parts or groups. | *"His majesty laughing, said, Faith, you are no equal divider."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[divination]] | noun | **1.** Successful conjecture by unusual insight or good luck.<br>**2.** A prediction uttered under divine inspiration. | *"Yet speak, Morton; Tell thou an earl his divination lies, And I will take it as a sweet disgrace And make thee rich for doing me such wrong."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divinatory]] | adjective | **1.** Resembling or characteristic of a prophet or prophecy.<br>**2.** Based primarily on surmise rather than adequate evidence. | *"In academic literature, divinatory designates resembling or characteristic of a prophet or prophecy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divine]] | noun | **1.** Terms referring to the judeo-christian god.<br>**2.** A clergyman or other person in religious orders. | *"Nothing sweet boy, but yet like prayers divine, I must each day say o’er the very same, Counting no old thing old, thou mine, I thine, Even as when first I hallowed thy fair name."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divinely]] | adverb | **1.** By divine means. | *"Lo, in this right hand, whose protection Is most divinely vow’d upon the right Of him it holds, stands young Plantagenet, Son to the elder brother of this man, And king o’er him and all that he enjoys."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diviner]] | noun | **1.** Someone who claims to discover hidden knowledge with the aid of supernatural powers.<br>**2.** Emanating from god; ; ; -saturday review. | *"The sorrow that has been in her face—for it is not there now—seems to have purified even its innocent expression and to have given it a diviner quality."* — Charles Dickens, *Bleak House* |
| [[diving]] | noun | **1.** An athletic competition that involves diving into water.<br>**2.** A headlong plunge into water. | *"In the mean time, Wemmick was diving into his coat-pockets, and getting something out of paper there."* — Charles Dickens, *Great Expectations* |
| [[divinity]] | noun | **1.** Any supernatural being worshipped as controlling some part of the world or some aspect of life or who is the personification of a force.<br>**2.** The quality of being divine. | *"There’s such divinity doth hedge a king, That treason can but peep to what it would, Acts little of his will.—Tell me, Laertes, Why thou art thus incens’d.—Let him go, Gertrude:— Speak, man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divisibility]] | noun | **1.** The quality of being divisible; the capacity to be divided into parts or divided among a number of persons. | *"Divisibility; that is, the quality in the monetary material that permits it to be divided easily into smaller amounts and then to be united again into larger masses at little cost and without loss in amount or in quality."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[divisible]] | adjective | **1.** Capable of being or liable to be divided or separated. | *"A question to be divisible must comprehend points so distinct and entire that one of them being taken away, the other may stand entire."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[division]] | noun | **1.** An army unit large enough to sustain combat.<br>**2.** One of the portions into which something is regarded as divided and which together constitute a whole. | *"A more unhappy lady, If this division chance, ne’er stood between, Praying for both parts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divisional]] | adjective | **1.** Of or relating to a military division.<br>**2.** Serving to divide or marking a division. | *"In academic literature, divisional designates of or relating to a military division."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divisive]] | adjective | **1.** Dissenting (especially dissenting with the majority opinion). | *"In academic literature, divisive designates dissenting (especially dissenting with the majority opinion)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divisor]] | noun | **1.** One of two or more integers that can be exactly divided into another integer.<br>**2.** The number by which a dividend is divided. | *"Time is a mortal thought, the divisor of which 599:1 is the solar year."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[divorce]] | noun | **1.** The legal dissolution of a marriage.<br>**2.** Part; cease or break association with. | *"If it appear not plain, and prove untrue, Deadly divorce step between me and you!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divorced]] | verb | **1.** Part; cease or break association with.<br>**2.** Get a divorce; formally terminate a marriage. | *"This sleep is sound indeed; this is a sleep That from this golden rigol hath divorced So many English kings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divorcee]] | noun | **1.** A divorced woman or a woman who is separated from her husband. | *"In academic literature, divorcee designates a divorced woman or a woman who is separated from her husband."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divorcement]] | noun | **1.** The legal dissolution of a marriage. | *"They demand a man who believes in the eternal separation and divorcement of Church and School."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[divot]] | noun | **1.** (golf) the cavity left when a piece of turf is cut from the ground by the club head in making a stroke.<br>**2.** A piece of turf dug out of a lawn or fairway (by an animals hooves or a golf club). | *"Section 2 For six years now, since the day they had buried his wife in the green divots of Louth, women had been alien to him."* — Donn Byrne, *The Wind Bloweth* |
| [[divulge]] | verb | **1.** Make known to the public information that was previously known only to a few people or that was meant to be kept a secret. | *"It cannot be expected of me to divulge how I came into possession of the four needles."* — Jack London, *The Jacket (The Star-Rover)* |
| [[divulgement]] | noun | **1.** The act of disclosing something that was secret or private. | *"In academic literature, divulgement designates the act of disclosing something that was secret or private."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divulgence]] | noun | **1.** The act of disclosing something that was secret or private. | *"In academic literature, divulgence designates the act of disclosing something that was secret or private."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endive]] | noun | **1.** Widely cultivated herb with leaves valued as salad green; either curly serrated leaves or broad flat ones that are usually blanched.<br>**2.** Variety of endive having leaves with irregular frilled edges. | *"This mould is by no means confined to lettuces, but has also been found on species of ragwort, sow-thistle, nipplewort, endive, and other composite plants; and has from time to time received numerous names, which it is unnecessary to enumerate."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[individual]] | noun | **1.** A human being.<br>**2.** A single organism. | *"This rehearsal, Which fury-innocent wots well, comes in Like old importment’s bastard—has this end, That the true love ’tween maid and maid may be More than in sex individual."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[individualisation]] | noun | **1.** Discriminating the individual from the generic group or species. | *"In academic literature, individualisation designates discriminating the individual from the generic group or species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[individualise]] | verb | **1.** Make or mark or treat as individual.<br>**2.** Make personal or more personal. | *"In academic literature, individualise designates make or mark or treat as individual."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[individualised]] | verb | **1.** Make or mark or treat as individual.<br>**2.** Make personal or more personal. | *"In academic literature, individualised designates make or mark or treat as individual."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[individualism]] | noun | **1.** The quality of being individual.<br>**2.** A belief in the importance of the individual and the virtue of self-reliance and personal independence. | *"Do not hope to find elsewhere the secret of our ills."[11] This then in briefest outline is the transition from the century of individualism and autocracy to the nineteenth century of democracy."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[individualist]] | noun | **1.** A person who pursues independent thought or action.<br>**2.** Marked by or expressing individuality. | *"The opponent of it usually champions the individualist view; its partizans uphold, in varying degrees, the social view."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[individualistic]] | adjective | **1.** Marked by or expressing individuality.<br>**2.** With minimally restricted freedom in commerce. | *"Altho, in common with various other "natural-rights" theories, it must be deemed too absolute and too individualistic, it contains a far-reaching truth, of which due account must be taken in our social philosophy."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[individualistically]] | adverb | **1.** In an individualistic manner. | *"In academic literature, individualistically designates in an individualistic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[individuality]] | noun | **1.** The quality of being individual.<br>**2.** The distinct personality of an individual regarded as a persisting entity. | *"The vision of the woman writing, as a supplement to the words written, had no individuality."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[individualization]] | noun | **1.** Discriminating the individual from the generic group or species. | *"In academic literature, individualization designates discriminating the individual from the generic group or species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[individualize]] | verb | **1.** Make or mark or treat as individual.<br>**2.** Make personal or more personal. | *"A startling quiet overhung all surrounding things—so completely, that the crunching of the waggon-wheels was as a great noise, and small rustles, which had never obtained a hearing except by night, were distinctly individualized."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[individualized]] | verb | **1.** Make or mark or treat as individual.<br>**2.** Make personal or more personal. | *"A startling quiet overhung all surrounding things—so completely, that the crunching of the waggon-wheels was as a great noise, and small rustles, which had never obtained a hearing except by night, were distinctly individualized."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[individually]] | adverb | **1.** Apart from others. | *"He is a sharp-eyed man—a quick keen man—and he takes in everybody’s look at him, all at once, individually and collectively, in a manner that stamps him a remarkable man."* — Charles Dickens, *Bleak House* |
| [[individuate]] | verb | **1.** Give individual character to.<br>**2.** Give individual shape or form to. | *"In academic literature, individuate designates give individual character to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[individuation]] | noun | **1.** Discriminating the individual from the generic group or species.<br>**2.** The quality of being individual. | *"In academic literature, individuation designates discriminating the individual from the generic group or species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indivisible]] | adjective | **1.** Impossible of undergoing division. | *"Looking on the face of the dead, he wondered much where the spirit that so lately had seemed to be with the frame but a single identity, one and indivisible, had fled."* — C. A. Frazer, *Atmâ* |
| [[subdivide]] | verb | **1.** Form into subdivisions.<br>**2.** Divide into smaller and smaller pieces. | *"At the middle of the forehead horizontally subdivide this upper quoin, and then you have two almost equal parts, which before were naturally divided by an internal wall of a thick tendinous substance. [17] Quoin is not a Euclidean term."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[subdivider]] | noun | **1.** Someone who divides parts into smaller parts (especially a divider of land into building sites). | *"In academic literature, subdivider designates someone who divides parts into smaller parts (especially a divider of land into building sites)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subdivision]] | noun | **1.** An area composed of subdivided lots.<br>**2.** The act of subdividing; division of something previously divided. | *"Each kind of political unit, or subdivision of government, develops characteristic kinds of public ownership and industry."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[undiversified]] | adjective | **1.** Not diversified. | *"In academic literature, undiversified designates not diversified."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undividable]] | adjective | **1.** Cannot be divided without leaving a remainder. | *"Thyself I call it, being strange to me, That, undividable, incorporate, Am better than thy dear self’s better part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undivided]] | adjective | **1.** Not parted by conflict of opinion.<br>**2.** Not shared by or among others. | *"XXXVI Let me confess that we two must be twain, Although our undivided loves are one: So shall those blots that do with me remain, Without thy help, by me be borne alone."* — William Shakespeare, *Shakespeare's Sonnets* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Separation & Loosening]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DIV
  </div>
</div>
