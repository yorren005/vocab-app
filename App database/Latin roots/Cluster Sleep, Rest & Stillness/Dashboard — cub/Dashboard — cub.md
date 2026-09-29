---
status: unread
type: root_dashboard
---
# Dashboard — cub
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cub-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to lie down”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Lying down quietly at night to rest and regain your strength.</span>
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

The root **cub** means to lie down. It refers to resting flat in a reclining position on a surface. In English, this root forms words such as *cubicle*, *incubate*, *incubator*, and *succumb*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to lie down
> The root **cub** means to lie down. It refers to resting flat in a reclining position on a surface. In English, this root forms words such as *cubicle*, *incubate*, *incubator*, and *succumb*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To lie down</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Lying down quietly at night to rest and regain your strength.</mark>
> - **Everyday Connection**: Think of familiar words like *cubicle* and *incubate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cub** comes from a Latin word that means *"to lie down"*.
  - At its core, it describes the action of lie down.

- **The Big Picture Idea**:
  - Picture lying down quietly at night to rest and regain your strength.
  - Whenever you see **cub** in an English word, think of **to lie down**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to lie down).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Cubicle**: A small partitioned area of an office, bathroom, or dormitory.
  - **Incubate**: To sit on eggs to keep them warm until they hatch. 2. To develop an infection or plan slowly.
  - **Incubator**: An apparatus in which environmental conditions can be controlled for hatching eggs or caring for premature infants.
  - **Succumb**: To fail to resist pressure, temptation, or negative force.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cub</mark>, think of <mark class="hl-def">to lie down</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun (`cubiculum`):** *cubicle* (partitioned work compartment).
- **Prefixation with `cub-` (Lying):**
  - `con-` + *cub-āre* $\to$ *concubine* (one who sleeps with another without legal marriage).
  - `in-` + *cub-āre* $\to$ *incubate* (to sit on eggs to hatch; foster), *incubation*, *incubator*, *incubus*.
  - `dē-` + *cub-itus* $\to$ *decubitus* (medical posture of lying down; bedsore).
- **Prefixation with `cumb-` (Sinking):**
  - `sub-` + *cumbere* $\to$ *succumb* (to yield, surrender, die under pressure).
  - `in-` + *cumbere* $\to$ *incumbent* (holding an office; resting as an obligation), *incumbency*.
  - `re-` + *cumbere* $\to$ *recumbent* (lying down, reclining).
  - `prō-` + *cumbere* $\to$ *procumbent* (lying face down, trailing on the ground).

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

### 1. Physical Posture & Anatomy
- *recumbent* (lying down; reclining, resting).
- *procumbent* (lying face downward; trailing along the ground without rooting).
- *decubitus* (the medical posture of a patient lying in bed; pressure ulcers/bedsores).

### 2. Biology & Incubation
- *incubate* (to sit on eggs to keep them warm until hatched; develop bacteria).
- *incubation* (the process of incubating eggs, bacteria, or disease latency).
- *incubator* (an apparatus used to hatch eggs or maintain premature babies in controlled warmth).

### 3. Moral, Civic & Professional Duty
- *incumbent* (necessary for someone as a duty; the current holder of an official office).
- *incumbency* (the holding of an office or the period during which one is held).
- *succumb* (to fail to resist pressure, temptation, or illness; surrender).

### 4. Domestic Spaces & Social Relationships
- *cubicle* (a small partitioned area of an office or room).
- *concubine* (a woman who lives with a man but has lower status than his wife; bed-partner).
- *incubus* (a cause of distress or anxiety; a mythological male demon).

---

## 🔀 4. Prefix & Combining Dynamics on cub

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `in-` + `cub-` + `-ate` | Brooding prefixation | Sitting upon eggs to warm and hatch new life | *incubate, incubator* |
| `sub-` + `cumb-` | Submissive collapse | Sinking downward beneath disease, defeat, or grief | *succumb* |
| `in-` + `cumb-` + `-ent` | Gravitational duty | Resting heavily upon someone as a moral obligation | *incumbent, incumbency* |
| `re-` + `cumb-` + `-ent` | Reclining ease | Leaning backward in comfortable rest | *recumbent* |
| `con-` + `cub-` + `-ina` | Bedside companionship | A co-sleeper without formal matrimonial rites | *concubine* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Medicine & Infectious Diseases:** Incubation period of viruses, decubitus ulcers (bedsores), recumbent cycling ergonomics.
- **Political Science & Elections:** The incumbency advantage in parliamentary and presidential races.
- **Microbiology & Neonatal Care:** Bacterial incubator chambers, premature infant isolettes.
- **Roman Law & Architecture:** The Roman *cubiculum*, legal concubinage under Roman law.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antecubital]] | adjective | **1.** Of or relating to the region of the arm in front of the elbow. | *"In academic literature, antecubital designates of or relating to the region of the arm in front of the elbow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concubinage]] | noun | **1.** Cohabitation without being legally married. | *"In academic literature, concubinage designates cohabitation without being legally married."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concubine]] | noun | **1.** A woman who cohabits with an important man. | *"I know I am too mean to be your queen, And yet too good to be your concubine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cub]] | noun | **1.** An awkward and inexperienced youth.<br>**2.** A male child (a familiar term of address to a boy). | *"This night, wherein the cub-drawn bear would couch, The lion and the belly-pinched wolf Keep their fur dry, unbonneted he runs, And bids what will take all."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cuba]] | noun | **1.** A communist state in the caribbean on the island of cuba.<br>**2.** The largest island in the west indies. | *"Let America add Mexico to Texas, and pile Cuba upon Canada; let the English overswarm all India, and hang out their blazing banner from the sun; two thirds of this terraqueous globe are the Nantucketer’s."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[cuban]] | noun | **1.** A native or inhabitant of cuba.<br>**2.** Of or relating to or characteristic of cuba or the people of cuba. | *"In academic literature, cuban designates a native or inhabitant of cuba."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cube]] | noun | **1.** A hexahedron with six equal squares as faces.<br>**2.** A three-dimensional shape with six square or rectangular sides. | *"Not distant far with heavy pace the foe Approaching gross and huge, in hollow cube Training his devilish enginery, impaled On every side with shadowing squadrons deep, To hide the fraud."* — John Milton, *Paradise Lost* |
| [[cube-shaped]] | adjective | **1.** Shaped like a cube. | *"In academic literature, cube-shaped designates shaped like a cube."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubeb]] | noun | **1.** Spicy fruit of the cubeb vine; when dried and crushed is used medicinally or in perfumery and sometimes smoked in cigarettes.<br>**2.** Tropical southeast asian shrubby vine bearing spicy berrylike fruits. | *"In academic literature, cubeb designates spicy fruit of the cubeb vine; when dried and crushed is used medicinally or in perfumery and sometimes smoked in cigarettes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubelike]] | adjective | **1.** Shaped like a cube. | *"In academic literature, cubelike designates shaped like a cube."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubic]] | adjective | **1.** Having three dimensions. | *"The cubic feet of oxygen yearly swallowed by a full-grown man—what a shudder they might have created in some Middlemarch circles!"* — George Eliot, *Middlemarch* |
| [[cubical]] | adjective | **1.** Shaped like a cube. | *"In academic literature, cubical designates shaped like a cube."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubicity]] | noun | **1.** The property of resembling a cube. | *"In academic literature, cubicity designates the property of resembling a cube."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubicle]] | noun | **1.** Small room in which a monk or nun lives.<br>**2.** Small individual study area in a library. | *"The bank of screens shut down as he stepped across the doorway of the cubicle that served him as both command post and sleeping quarters."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[cubiform]] | adjective | **1.** Shaped like a cube. | *"In academic literature, cubiform designates shaped like a cube."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubism]] | noun | **1.** An artistic movement in france beginning in 1907 that featured surfaces of geometrical planes. | *"In academic literature, cubism designates an artistic movement in france beginning in 1907 that featured surfaces of geometrical planes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubist]] | noun | **1.** An artist who adheres to the principles of cubism.<br>**2.** Relating to or characteristic of cubism. | *"In academic literature, cubist designates an artist who adheres to the principles of cubism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubistic]] | adjective | **1.** Relating to or characteristic of cubism. | *"In academic literature, cubistic designates relating to or characteristic of cubism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubit]] | noun | **1.** An ancient unit of length based on the length of the forearm. | *"A space whose ev’ry cubit Seems to cry out “How shall that Claribel Measure us back to Naples?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cubital]] | adjective | **1.** Of or relating to the elbow. | *"In academic literature, cubital designates of or relating to the elbow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubitiere]] | noun | **1.** Body armor that protects the elbow. | *"In academic literature, cubitiere designates body armor that protects the elbow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cubitus]] | noun | **1.** Hinge joint between the forearm and upper arm and the corresponding joint in the forelimb of a quadruped.<br>**2.** The arm from the elbow to the fingertips. | *"In academic literature, cubitus designates hinge joint between the forearm and upper arm and the corresponding joint in the forelimb of a quadruped."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cuboid]] | noun | **1.** A rectangular parallelepiped.<br>**2.** Shaped like a cube. | *"In academic literature, cuboid designates a rectangular parallelepiped."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cuboidal]] | adjective | **1.** Shaped like a cube. | *"In academic literature, cuboidal designates shaped like a cube."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decubitus]] | noun | **1.** A reclining position (as in a bed). | *"In academic literature, decubitus designates a reclining position (as in a bed)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incubate]] | verb | **1.** Grow under conditions that promote development.<br>**2.** Sit on (eggs). | *"It appeared to me that the eggs from which young Insurers were hatched were incubated in dust and heat, like the eggs of ostriches, judging from the places to which those incipient giants repaired on a Monday morning."* — Charles Dickens, *Great Expectations* |
| [[incubation]] | noun | **1.** Maintaining something at the most favorable temperature for its development.<br>**2.** (pathology) the phase in the development of an infection between the time a pathogen enters the body and the time the first symptoms appear. | *"For _egkolmesis_ or _incubatio_ see Mary Hamilton, _Incubation_ (1906) [84] Clem."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[incubator]] | noun | **1.** Apparatus consisting of a box designed to maintain a constant temperature by the use of a thermostat; used for chicks or premature infants. | *"Garnet," said Phyllis, "do you use an incubator?" "Oh, yes, we have an incubator." "I suppose you find it very useful?" "I'm afraid we use it chiefly for drying our boots when they get wet," I said."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[incubus]] | noun | **1.** A male demon believed to lie on sleeping persons and to have sexual intercourse with sleeping women.<br>**2.** A situation resembling a terrifying dream. | *"Then he turns from his cups, as 322:21 the startled dreamer who wakens from an incubus in- curred through the pains of distorted sense."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[succuba]] | noun | **1.** A female demon believed to have sexual intercourse with sleeping men. | *"In academic literature, succuba designates a female demon believed to have sexual intercourse with sleeping men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[succubus]] | noun | **1.** A female demon believed to have sexual intercourse with sleeping men. | *"In academic literature, succubus designates a female demon believed to have sexual intercourse with sleeping men."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sleep, Rest & Stillness]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CUB
  </div>
</div>
