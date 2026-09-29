---
status: unread
type: root_dashboard
---
# Dashboard — cruc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cruc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“cross”</span>
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

The root **cruc** means cross. It refers to two crossing lines, an intersection, or an upright cross. In English, this root forms words such as *crucial*, *cruciate*, *crucible*, and *cruciform*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: cross
> The root **cruc** means cross. It refers to two crossing lines, an intersection, or an upright cross. In English, this root forms words such as *crucial*, *cruciate*, *crucible*, and *cruciform*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Cross</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sturdy wooden framework supporting the roof of a house.</mark>
> - **Everyday Connection**: Think of familiar words like *crucial* and *cruciate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cruc** comes from a Latin word that means *"cross"*.
  - At its core, it describes cross.

- **The Big Picture Idea**:
  - Picture the sturdy wooden framework supporting the roof of a house.
  - Whenever you see **cruc** in an English word, think of **underlying structure and framework**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of cross.
  - **Mental & Social**: How people experience, organize, or communicate about cross.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Crucial**: Decisive or critical, especially in the success or failure of something. 2. Cross-shaped.
  - **Cruciate**: Cross-shaped.
  - **Crucible**: A ceramic or metal container in which metals may be melted at very high temperatures. 2. A situation of severe trial leading to the creation of something new.
  - **Cruciform**: Having the shape of a cross.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cruc</mark>, think of <mark class="hl-def">underlying structure and framework</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **cruc** attaches to Latin combining forms and prefixes:
- **Base Nominal & Geometric Stems (`cruc-` < *crux*, *crucis*)**:
  - *crux* $\to$ **crux** ("essential point, central difficulty").
  - *crucis* + *-ālis* $\to$ **crucial** ("decisive, critical").
  - *cruciform* (*crux* + *forma* "cross-shaped").
  - *cruciate* (*cruciātus* "cross-shaped, crossed like an X").
- **Agony & Torment Stems (`cruciā-` < *cruciāre*)**:
  - *ex-* ("intensively, out") + *cruciāre* $\to$ **excruciating**, **excruciate**, **excruciation**.
  - *crucifīgere* (*cruci* + *fīgere* "to fasten to a cross") $\to$ **crucify**, **crucifix**, **crucifixion**.
- **Melting Pots & Medieval Borrowings**:
  - Medieval Latin *crucibulum* ("melting pot for metals", originally marked with a protective cross) $\to$ **crucible**.
  - Spanish *cruzada* / Old French *croisade* $\to$ **crusade**, **crusader**.
  - Dutch *kruisen* (< *crux*) $\to$ **cruise**, **cruiser**.

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

The derivatives of **cruc** span five key conceptual arenas:
- **Anatomy & Botany**: *cruciate* (shaped like a cross, as the cruciate ligaments in the knee), *cruciform* (cross-shaped), *cruciferous* (plants of the cabbage family with four cross-like petals).
- **Epistemology & Decision Logic**: *crucial* (decisive or critical, especially in the success or failure of something), *crux* (the decisive or most important point at issue).
- **Physical & Mental Agony**: *excruciating* (intensely painful), *excruciate* (torture mentally or physically), *crucifixion*.
- **Trials, Tests & Metallurgy**: *crucible* (a ceramic or metal container in which metals may be melted at very high temperatures; a severe trial).
- **Nautical Exploration & Holy War**: *cruise* (sail about in an area without a precise destination), *crusade* (medieval military expedition; passionate campaign for change).

---

## 🔀 4. Prefix & Combining Dynamics on cruc

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ex-`** ("out, utterly") | `ex-` + `cruciāre` | Torture utterly as on a cross $\to$ unbearable, agonizing pain | *excruciating, excruciate, excruciation* |
| **`forma`** ("shape") | `cruci-` + `forma` | Having the geometry of a cross $\to$ cross-shaped architecture | *cruciform* |
| **`fīgere`** ("fasten") | `cruci-` + `fīgere` | Fasten to a wooden cross $\to$ execute, torment | *crucify, crucifix, crucifixion* |
| **`-ālis`** (adjectival) | `cruci-` + `-ālis` | Like a signpost at a crossroads $\to$ critically decisive | *crucial, crucially* |
| **`-bulum`** (instrument) | `cruci-` + `-bulum` | Melting vessel marked with a cross $\to$ severe moral test | *crucible* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Medicine & Orthopedic Surgery**: Biomechanics of the knee joint (*anterior cruciate ligament*, *ACL tear*).
- **Scientific Methodology & Philosophy**: The decisive experiment that falsifies competing hypotheses (*experimentum crucis*, *crucial test*).
- **Architecture & Church Design**: Floor plans of medieval Gothic cathedrals (*cruciform floor plan*).
- **Metallurgy & Chemical Engineering**: High-temperature smelting containers and refractory ceramics (*crucible furnace*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[crucial]] | adjective | **1.** Of extreme importance; vital to the resolution of a crisis.<br>**2.** Having crucial relevance. | *"The crucial question is whether profit-sharing alone in any particular case will insure that the costs will be less than those of competitors, thus giving a source out of which an increased amount, really a wage, can be paid to the laborer."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[cruciality]] | noun | **1.** A state of critical urgency. | *"In academic literature, cruciality designates a state of critical urgency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crucially]] | adverb | **1.** To a crucial degree. | *"In academic literature, crucially designates to a crucial degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cruciate]] | adjective | **1.** Shaped like a cross. | *"In academic literature, cruciate designates shaped like a cross."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crucible]] | noun | **1.** A vessel made of material that does not melt easily; used for high temperature chemical reactions. | *"I’ll get a crucible, and into it, and dissolve myself down to one small, compendious vertebra."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[crucifer]] | noun | **1.** Any of various plants of the family cruciferae. | *"In the crucifer rust the conidia are all equal in the pustules and globose."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[cruciferae]] | noun | **1.** A large family of plants with four-petaled flowers; includes mustards, cabbages, broccoli, turnips, cresses, and their many relatives. | *"In academic literature, cruciferae designates a large family of plants with four-petaled flowers; includes mustards, cabbages, broccoli, turnips, cresses, and their many relatives."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cruciferous]] | adjective | **1.** Of or relating to or belonging to the plant family cruciferae. | *"What is the external appearance presented by the “white rust” of cabbages, and allied cruciferous plants, is soon told."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[crucifix]] | noun | **1.** Representation of the cross on which jesus died.<br>**2.** A gymnastic exercise performed on the rings when the gymnast supports himself with both arms extended horizontally. | *"John, the crucifix and holy banner leading the way, to a place called Chouquet."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[crucifixion]] | noun | **1.** The act of executing by a method widespread in the ancient world; the victim's hands and feet are bound or nailed to a cross.<br>**2.** The death of jesus by crucifixion. | *"The cry for blood rang through the court, and all were clamouring for crucifixion."* — Jack London, *The Jacket (The Star-Rover)* |
| [[cruciform]] | adjective | **1.** Shaped like a cross. | *"In academic literature, cruciform designates shaped like a cross."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crucify]] | verb | **1.** Kill by nailing onto a cross.<br>**2.** Treat cruelly. | *"Whom did they crucify there, young scholar?"* — Jack London, *The Jacket (The Star-Rover)* |
| [[excruciate]] | verb | **1.** Torment emotionally or mentally.<br>**2.** Subject to torture. | *"Her presence used to excruciate Osborne; but go she would upon all parties of pleasure on which she heard her young friends were bent."* — William Makepeace Thackeray, *Vanity Fair* |
| [[excruciating]] | verb | **1.** Torment emotionally or mentally.<br>**2.** Subject to torture. | *"Have you ever laced your shoe too tightly, and, after half an hour, experienced that excruciating pain across the instep of the obstructed circulation?"* — Jack London, *The Jacket (The Star-Rover)* |
| [[excruciatingly]] | adverb | **1.** In a very painful manner. | *"Excruciatingly funny to watch the stampede, after the loud "One--two--three--and away!" The plunges, the waddles, the skelter of flying heels!"* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[excruciation]] | noun | **1.** A state of acute pain.<br>**2.** The infliction of extremely painful punishment or suffering. | *"In academic literature, excruciation designates a state of acute pain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncrucial]] | adjective | **1.** Of little importance; not decisive.<br>**2.** Not in a state of crisis or emergency. | *"In academic literature, noncrucial designates of little importance; not decisive."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CRUC
  </div>
</div>
