---
status: unread
type: root_dashboard
---
# Dashboard — quad
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">quad-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“four”</span>
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

The root **quad** means four. It refers to the number four or a four-sided square figure. In English, this root forms words such as *quadrant*, *quadratic*, *quadrilateral*, and *quadriceps*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: four
> The root **quad** means four. It refers to the number four or a four-sided square figure. In English, this root forms words such as *quadrant*, *quadratic*, *quadrilateral*, and *quadriceps*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Four</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *quadrant* and *quadratic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **quad** comes from a Latin word that means *"four"*.
  - At its core, it describes four.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **quad** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of four.
  - **Mental & Social**: How people experience, organize, or communicate about four.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Quadrant**: Each of four quarters of a circle by which positions are measured.
  - **Quadratic**: Involving the second and no higher power of an unknown quantity or variable.
  - **Quadrilateral**: A four-sided figure.
  - **Quadriceps**: The large, four-part extensor muscle at the front of the human thigh.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">quad</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **quad** generates vocabulary through three distinct morphological conduits:
> - **Direct Latin Stems in `quadr-` (< *quadrāre* / *quattuor*):**
>   - *quadrāns* ("fourth part") $\to$ *quadrant* ("quarter of a circle").
>   - *quadrātum* ("square") $\to$ *quadratic* ("involving the second power / squaring").
>   - *quadri-* + *latus* ("side") $\to$ *quadrilateral* ("four-sided polygon").
>   - *quadri-* + *caput* ("head") $\to$ *quadriceps* ("four-headed thigh muscle").
>   - *quattuor* + *annus* ("year") $\to$ *quadrennial* ("occurring every four years").
>   - *quadru-* + *pēs* ("foot") $\to$ *quadruped* ("four-footed mammal").
>   - *quadruplus* $\to$ *quadruple*, *quadruplet* ("fourfold").
>   - *quadri-* + *angulus* ("angle") $\to$ *quadrangle* ("four-cornered courtyard").
> - **Ordinal Stems in `quart-` (< *quārtus* "fourth"):**
>   - *quārtārius* $\to$ Anglo-Norman *quarter* $\to$ *quarter*, *quarterly*, *headquarters*.
>   - *quarto* + Italian *-etto* $\to$ *quartet* ("four-member ensemble").
> - **Romance Conduits in `squad-` and `squar-` (< Latin *exquadrāre*):**
>   - *exquadrāre* $\to$ Old French *esquarre* $\to$ *square* ("equilateral rectangle").
>   - *exquadrāre* $\to$ Italian *squadra* $\to$ French *escouade* $\to$ *squad*, *squadron*.

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
> Although fundamentally denoting **"four"**, the root adapts to diverse practical disciplines:
> - **Euclidean Geometry & Algebra:** *quadrant*, *quadratic*, *quadrilateral*, *square* (curves, squares, four-sided figures).
> - **Anatomy & Evolutionary Zoology:** *quadriceps*, *quadruped* (four-headed femoris muscle, four-legged posture).
> - **Civic & Temporal Chronology:** *quadrennial*, *quarter*, *quarterly* (four-year Olympic cycles, three-month quarters).
> - **Architectural & Campus Spaces:** *quadrangle* (central college quad, courtyard).
> - **Military Organization & Tactics:** *squad*, *squadron*, *headquarters* (small combat teams, air force wings).
> - **Music & Performing Arts:** *quartet* (string quartet, four-part harmony).

---

## 🔀 4. Prefix & Combining Dynamics on quad

### Combining Form Dynamics

| Form | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `quadr-` + `annus` | four + year | **[[quadrennial]]** | Occurring once every four years (like the Olympic Games). |
| `quadri-` + `latus` | four + side | **[[quadrilateral]]** | A four-sided plane geometric figure. |
| `quadru-` + `pēs` | four + foot | **[[quadruped]]** | An animal that has four feet, especially an ungulate mammal. |
| `quadru-` + `plicāre` | four + fold | **[[quadruple]]** | Consisting of four parts or elements; four times as great. |
| `ex-` + `quadrāre` | out of + square | **[[square]]** | A regular polygon with four equal sides and four right angles. |

### Suffix Transformations (Grammatical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ant` | Noun (Instrument / Fraction) | **[[quadrant]]** | An instrument for measuring altitudes; a quarter of a circle. |
| `-ic` | Adjective (Mathematical Type) | **quadratic** | Involving the second and no higher power of an unknown variable. |
| `-et` | Noun (Ensemble / Set) | **[[quartet]]** | A group of four singers or musicians who perform together. |
| `-ly` | Adverb / Adjective (Recurrence) | **quarterly** | Done, produced, or occurring once every quarter of a year. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📐 **Mathematics & Physics** | *quadrant*, *quadratic*, *quadrilateral*, *square* | Cartesian coordinate quadrants, quadratic formula derivation, square matrices. |
| 🏋️ **Anatomy, Sports & Medicine** | *quadriceps*, *quadruped*, *quadrennial* | Femoral rectus knee extension, mammalian posture, Olympic Games cycle. |
| 🎓 **Higher Education & Campus Life** | *quadrangle* ("the quad") | Oxford and Cambridge collegiate Gothic cloister courtyards. |
| 🎖️ **Military Science & Tactical Defense** | *squad*, *squadron*, *headquarters* | Infantry rifle squads (9–13 soldiers), fighter jet squadrons, command headquarters. |
| 🎻 **Classical Music Theory** | *quartet*, *string quartet* | Haydn and Beethoven string quartets (two violins, viola, cello). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[quad]] | noun | **1.** One of four children born at the same time from the same pregnancy.<br>**2.** A muscle of the thigh that extends the leg. | *"The sensitive fighter corkscrewed and hurtled away just as laser-quad beams from both destroyers crossed where he had been a fraction of a second before."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[quadragesima]] | noun | **1.** The first sunday in lent. | *"We shall begin with the fire-festivals of spring, which usually fall on the first Sunday of Lent (_Quadragesima_ or _Invocavit_), Easter Eve, and May Day. 2."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[quadrangle]] | noun | **1.** A four-sided polygon.<br>**2.** A rectangular area surrounded on all sides by buildings. | *"Now, lords, my choler being overblown With walking once about the quadrangle, I come to talk of commonwealth affairs."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[quadrangular]] | adjective | **1.** Of or relating to or shaped like a quadrangle. | *"They have both a quadrangular depression in the centre, leaving the rest of the terrace elevated several feet above it."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[quadrant]] | noun | **1.** A quarter of the circumference of a circle.<br>**2.** Any of the four areas into which a plane is divided by two orthogonal coordinate axes. | *"He came on deck at eleven o'clock, with the quadrant under his coat."* — Classic Author, *The wonders of prayer* |
| [[quadrantanopia]] | noun | **1.** Blindness in one fourth of the visual field. | *"In academic literature, quadrantanopia designates blindness in one fourth of the visual field."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadraphonic]] | adjective | **1.** Of or relating to quadraphony. | *"In academic literature, quadraphonic designates of or relating to quadraphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadraphony]] | noun | **1.** A stereophonic sound recording or reproducing system using four separate channels. | *"In academic literature, quadraphony designates a stereophonic sound recording or reproducing system using four separate channels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadrasonic]] | adjective | **1.** Of or relating to quadraphony. | *"In academic literature, quadrasonic designates of or relating to quadraphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadrate]] | noun | **1.** A cubelike object.<br>**2.** A square-shaped object. | *"It would be extremely difficult, if not impossible, to suggest any general regulation that would be acceptable to all the States in the Union, or that would perfectly quadrate with the several State institutions."* — Alexander Hamilton, *The Federalist Papers* |
| [[quadratic]] | noun | **1.** An equation in which the highest power of an unknown quantity is a square.<br>**2.** A polynomial of the second degree. | *"Oh, Jane, your simple experiment proposition is about to become compound quadratics."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[quadratics]] | noun | **1.** A branch of algebra dealing with quadratic equations.<br>**2.** An equation in which the highest power of an unknown quantity is a square. | *"Oh, Jane, your simple experiment proposition is about to become compound quadratics."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[quadrature]] | noun | **1.** The construction of a square having the same area as some other figure. | *"A solution of the secular problem of the quadrature of the circle, government premium £ 1,000,000 sterling."* — James Joyce, *Ulysses* |
| [[quadrennial]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin quad within the domain of Number & Measure.<br>**2.** A technical or specialized form exhibiting the properties of quad in systematic terminology. | *"In academic literature, quadrennial designates pertaining to, derived from, or characteristic of latin quad within the domain of number & measure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadrennium]] | noun | **1.** A period of four years. | *"In academic literature, quadrennium designates a period of four years."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadric]] | noun | **1.** A curve or surface whose equation (in cartesian coordinates) is of the second degree. | *"In academic literature, quadric designates a curve or surface whose equation (in cartesian coordinates) is of the second degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadriceps]] | noun | **1.** A muscle of the thigh that extends the leg. | *"In academic literature, quadriceps designates a muscle of the thigh that extends the leg."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadrilateral]] | noun | **1.** A four-sided polygon.<br>**2.** Having four sides. | *"In academic literature, quadrilateral designates a four-sided polygon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadrille]] | noun | **1.** Music for dancing the quadrille.<br>**2.** A square dance of 5 or more figures for 4 or more couples. | *"The Lobster Quadrille The Mock Turtle sighed deeply, and drew the back of one flapper across his eyes."* — Lewis Carroll, *Alice's Adventures in Wonderland* |
| [[quadrillion]] | noun | **1.** The number that is represented as a one followed by 24 zeros.<br>**2.** The number that is represented as a one followed by 15 zeros. | *"In academic literature, quadrillion designates the number that is represented as a one followed by 24 zeros."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadrillionth]] | noun | **1.** One part in a quadrillion equal parts.<br>**2.** The ordinal number of one quadrillion in counting order. | *"In academic literature, quadrillionth designates one part in a quadrillion equal parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadripara]] | noun | **1.** (obstetrics) woman who has given birth to a viable infant in each of four pregnancies. | *"In academic literature, quadripara designates (obstetrics) woman who has given birth to a viable infant in each of four pregnancies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadripartite]] | adjective | **1.** Involving four parties. | *"In academic literature, quadripartite designates involving four parties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadriphonic]] | adjective | **1.** Of or relating to quadraphony. | *"In academic literature, quadriphonic designates of or relating to quadraphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadriplegia]] | noun | **1.** Paralysis of both arms and both legs. | *"In academic literature, quadriplegia designates paralysis of both arms and both legs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadriplegic]] | noun | **1.** A person who is paralyzed in both arms and both legs. | *"In academic literature, quadriplegic designates a person who is paralyzed in both arms and both legs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadrisonic]] | adjective | **1.** Of or relating to quadraphony. | *"In academic literature, quadrisonic designates of or relating to quadraphony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadrivium]] | noun | **1.** (middle ages) a higher division of the curriculum in a medieval university involving arithmetic and music and geometry and astronomy. | *"In academic literature, quadrivium designates (middle ages) a higher division of the curriculum in a medieval university involving arithmetic and music and geometry and astronomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadroon]] | noun | **1.** An offspring of a mulatto and a white parent; a person who is one-quarter black. | *"Quadroon, with carte blanche on the Slave question); indeed the family estate was much embarrassed, and the income drawn from the borough was of great use to the house of Queen's Crawley."* — William Makepeace Thackeray, *Vanity Fair* |
| [[quadrumvirate]] | noun | **1.** A group of four men. | *"In academic literature, quadrumvirate designates a group of four men."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadruped]] | noun | **1.** An animal especially a mammal having four limbs specialized for walking.<br>**2.** Having four feet. | *"She is angry—she doesn’t know what we mean—she’ll kick over the milk!” exclaimed Tess, gently striving to free herself, her eyes concerned with the quadruped’s actions, her heart more deeply concerned with herself and Clare."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[quadrupedal]] | adjective | **1.** Having four feet. | *"An exquisite dulcet epithalame of most mollificative suadency for juveniles amatory whom the odoriferous flambeaus of the paranymphs have escorted to the quadrupedal proscenium of connubial communion."* — James Joyce, *Ulysses* |
| [[quadruple]] | noun | **1.** A set of four similar things considered as a unit.<br>**2.** A quantity that is four times as great as another. | *"Leading a quadruple existence!"* — James Joyce, *Ulysses* |
| [[quadruplet]] | noun | **1.** The cardinal number that is the sum of three and one.<br>**2.** One of four children born at the same time from the same pregnancy. | *"In academic literature, quadruplet designates the cardinal number that is the sum of three and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadruplex]] | adjective | **1.** Having four units or components. | *"In academic literature, quadruplex designates having four units or components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadruplicate]] | noun | **1.** Any four copies; any of four things that correspond to one another exactly.<br>**2.** Reproduce fourfold. | *"In academic literature, quadruplicate designates any four copies; any of four things that correspond to one another exactly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quadrupling]] | noun | **1.** Increase by a factor of four.<br>**2.** Increase fourfold. | *"Seventeenth, the quadrupling of the number of local spiritual assemblies and the trebling of the number of localities in the aforementioned countries."* — Effendi Shoghi, *Citadel of Faith* |
| [[squad]] | noun | **1.** A smallest army unit.<br>**2.** A cooperative unit (especially in sports). | *"Observ’d ye yon reverend lad Mak faces to tickle the mob; He rails at our mountebank squad,— It’s rivalship just i’ the job."* — Robert Burns, *Poems and Songs of Robert Burns* |

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
    ROOT DASHBOARD · QUAD
  </div>
</div>
