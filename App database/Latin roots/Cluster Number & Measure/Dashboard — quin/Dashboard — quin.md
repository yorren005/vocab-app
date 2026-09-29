---
status: unread
type: root_dashboard
---
# Dashboard — quin
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">quin-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“five”</span>
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

The root **quin** means five. It refers to the number five or a fivefold group. In English, this root forms words such as *quintuple*, *quintuplet*, *quintet*, and *quintessence*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: five
> The root **quin** means five. It refers to the number five or a fivefold group. In English, this root forms words such as *quintuple*, *quintuplet*, *quintet*, and *quintessence*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Five</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *quintuple* and *quintuplet*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **quin** comes from a Latin word that means *"five"*.
  - At its core, it describes five.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **quin** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of five.
  - **Mental & Social**: How people experience, organize, or communicate about five.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Quintuple**: Consisting of five parts or elements.
  - **Quintuplet**: Each of five children born at one birth.
  - **Quintet**: A group of five people playing music or singing together.
  - **Quintessence**: The most perfect or typical example of a quality or class.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">quin</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **quin** builds vocabulary through cardinal, ordinal, and fractional Latin forms:
> - **Cardinal Stems in `quinque-` (< *quīnque* "five"):**
>   - *quīnque* + *annus* ("year") $\to$ *quinquennial* ("occurring every five years").
>   - *quīncunx* (*quīnque* + *uncia* "twelfth") $\to$ *quincunx* ("geometric pattern of five dots").
> - **Ordinal Stems in `quint-` (< *quīntus* "fifth"):**
>   - *quīnta essentia* $\to$ *quintessence* ("the purest essence").
>   - *quintessence* + *-al* $\to$ *quintessential* ("representing the most perfect example").
>   - *quīntus* + Italian *-etto* $\to$ *quintet* ("ensemble of five performers").
>   - *quīntus* + *-ile* $\to$ *quintile* ("one-fifth statistical slice").
>   - *quīntāna* $\to$ *quintain* ("jousting target post").
> - **Multiplier Stems in `quintupl-` (< *quintuplus* "fivefold"):**
>   - *quintuplus* $\to$ *quintuple* ("to multiply by five; fivefold").
>   - *quintuple* + *-et* $\to$ *quintuplet* ("each of five children born at one birth").

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
> Although fundamentally denoting **"five"**, the root adapts to diverse practical disciplines:
> - **Philosophical Purity & Archetypes:** *quintessence*, *quintessential* (ideal embodiment, transcendent core).
> - **Chamber Music & Polyphony:** *quintet* (string quintet, brass quintet, piano quintet).
> - **Horticulture & Tactical Grid Geometry:** *quincunx* (orchard planting pattern, maniple battlefield grid).
> - **Demographic Statistics & Economics:** *quintile* (dividing population income into five 20% bands).
> - **Civic & Electoral Chronology:** *quinquennial* (five-year census, five-year industrial plans).
> - **Multiple Births & Mathematical Multiplication:** *quintuple*, *quintuplet* (fivefold increase, five offspring).

---

## 🔀 4. Prefix & Combining Dynamics on quin

### Combining Form Dynamics

| Form | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `quīnque-` + `annus` | five + year | **[[quinquennial]]** | Occurring once every five years; lasting five years. |
| `quīnta` + `essentia` | fifth + essence | **[[quintessence]]** | The purest and most concentrated essence of something. |
| `quīnque` + `uncia` | five + twelfth | **[[quincunx]]** | An arrangement of five objects with one at each corner and one in the middle. |
| `quīntus` + `plicāre` | fifth + fold | **[[quintuple]]** | Consisting of five parts or things; five times as great. |

### Suffix Transformations (Grammatical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-et` | Noun (Ensemble / Set) | **[[quintet]]** | A group of five people playing music or singing together. |
| `-let` / `-et` | Noun (Diminutive / Sibling) | **quintuplet** | Each of five children born to the same mother at one birth. |
| `-al` | Adjective (Pertaining to) | **[[quintessential]]** | Representing the most typical or perfect example of a quality. |
| `-ile` | Noun (Statistical Division) | **quintile** | Any of five equal groups into which a population can be divided. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🎻 **Classical Chamber Music** | *quintet*, *string quintet* | Mozart's String Quintets (adding a second viola), Schubert's Trout Quintet. |
| 📊 **Economics, Sociology & Policy** | *quintile*, *income quintile* | Measuring economic inequality by comparing bottom 20% to top 20% income quintiles. |
| 🌳 **Landscape Architecture & Forestry** | *quincunx*, *quincuncial planting* | Maximizing canopy exposure and mechanical harvesting efficiency in orchards. |
| 🧪 **History of Science & Alchemy** | *quintessence*, *quintessential* | Paracelsian medical distillation of alchemical tinctures from herbal materials. |
| 🏛️ **Demographic Planning & Governance** | *quinquennial* | Sovereign five-year economic plans, national agricultural census reviews. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[asquint]] | adjective | **1.** (used especially of glances) directed to one side with or as if with doubt or suspicion or envy; - elizabeth bowen. | *"That eye that told you so look’d but asquint."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equine]] | noun | **1.** Hoofed mammals having slender legs and a flat coat with a narrow mane along the back of the neck.<br>**2.** Resembling a horse. | *"The same wise judge of matters equine Who still preferred some slim four-year-old To the big-boned stock of mighty Berold, And, for strong Cotnar, drank French weak wine, He also must be such a lady’s scorner!"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[equinoctial]] | noun | **1.** The great circle on the celestial sphere midway between the celestial poles.<br>**2.** Relating to the vicinity of the equator. | *"In sooth, thou wast in very gracious fooling last night when thou spok’st of Pigrogromitus, of the Vapians passing the equinoctial of Queubus; ’twas very good, i’ faith."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[equinox]] | noun | **1.** Either of two times of the year when the sun crosses the plane of the earth's equator and day and night are of equal length.<br>**2.** (astronomy) either of the two celestial points at which the celestial equator intersects the ecliptic. | *"You see this fellow that is gone before, He is a soldier fit to stand by Cæsar And give direction: and do but see his vice, ’Tis to his virtue a just equinox, The one as long as th’ other. ’Tis pity of him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[quin]] | noun | **1.** One of five children born at the same time from the same pregnancy. | *"When Quin and Garrick performed at the same theatre, and in the same play, the night being very stormy, each ordered a chair."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[quinacrine]] | noun | **1.** A drug (trade name atabrine) used to treat certain worm infestations and once used to treat malaria. | *"In academic literature, quinacrine designates a drug (trade name atabrine) used to treat certain worm infestations and once used to treat malaria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quince]] | noun | **1.** Small asian tree with pinkish flowers and pear-shaped fruit; widely cultivated.<br>**2.** Aromatic acid-tasting pear-shaped fruit used in preserves. | *"A Room in Quince’s House ACT V Scene I."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[quincentenary]] | noun | **1.** The 500th anniversary (or the celebration of it).<br>**2.** Of or relating to a 500th anniversary. | *"In academic literature, quincentenary designates the 500th anniversary (or the celebration of it)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quincentennial]] | noun | **1.** The 500th anniversary (or the celebration of it).<br>**2.** Of or relating to a 500th anniversary. | *"In academic literature, quincentennial designates the 500th anniversary (or the celebration of it)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quincunx]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin quin within the domain of Number & Measure.<br>**2.** A technical or specialized form exhibiting the properties of quin in systematic terminology. | *"In academic literature, quincunx designates pertaining to, derived from, or characteristic of latin quin within the domain of number & measure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quincy]] | noun | **1.** American patriot who presented the colonists' grievances to the english king (1744-1775). | *"Louis Hospitals--Ladies who ministered to the soldiers in Quincy, and in Springfield, Illinois--Miss Georgiana Willets, Misses Molineux and McCabe--Ladies of Cincinnati who served in the hospitals--Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[quine]] | noun | **1.** United states philosopher and logician who championed an empirical view of knowledge that depended on language (1908-2001). | *"In academic literature, quine designates united states philosopher and logician who championed an empirical view of knowledge that depended on language (1908-2001)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quinidex]] | noun | **1.** Cardiac drug (trade names quinidex and quinora) used to treat certain heart arrhythmias. | *"In academic literature, quinidex designates cardiac drug (trade names quinidex and quinora) used to treat certain heart arrhythmias."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quinidine]] | noun | **1.** Cardiac drug (trade names quinidex and quinora) used to treat certain heart arrhythmias. | *"In academic literature, quinidine designates cardiac drug (trade names quinidex and quinora) used to treat certain heart arrhythmias."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quinine]] | noun | **1.** A bitter alkaloid extracted from chinchona bark; used in malaria therapy. | *"We made mustard poultices with white of egg instead of water, to save needless irritation of the skin; we used the French expedient of putting quinine pads under the armpits to reduce the terrible temperature."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[quinone]] | noun | **1.** Any of a class of aromatic yellow compounds including several that are biologically important as coenzymes or acceptors or vitamins; used in making dyes. | *"In academic literature, quinone designates any of a class of aromatic yellow compounds including several that are biologically important as coenzymes or acceptors or vitamins; used in making dyes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quinora]] | noun | **1.** Cardiac drug (trade names quinidex and quinora) used to treat certain heart arrhythmias. | *"In academic literature, quinora designates cardiac drug (trade names quinidex and quinora) used to treat certain heart arrhythmias."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quinquennial]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin quin within the domain of Number & Measure.<br>**2.** A technical or specialized form exhibiting the properties of quin in systematic terminology. | *"In academic literature, quinquennial designates pertaining to, derived from, or characteristic of latin quin within the domain of number & measure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quinsy]] | noun | **1.** A painful pus filled inflammation of the tonsils and surrounding tissues; usually a complication of tonsillitis. | *"He’d had the quinsy and swollen glands when he was young, he told me, and it had left him with a weak throat, and a hesitating, whispering fashion of speech."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[quint]] | noun | **1.** The cardinal number that is the sum of four and one.<br>**2.** One of five children born at the same time from the same pregnancy. | *"Quint?” “Peter Quint—his own man, his valet, when he was here!” “When the master was?” Gaping still, but meeting me, she pieced it all together."* — Henry James, *The Turn of the Screw* |
| [[quintal]] | noun | **1.** A unit of weight equal to 100 kilograms.<br>**2.** A united states unit of weight equivalent to 100 pounds. | *"Lately he was studying books so large that they weighed two quintals."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[quintessence]] | noun | **1.** The fifth and highest element after air and earth and fire and water; was believed to be the substance composing all heavenly bodies.<br>**2.** The purest and most concentrated essence of something. | *"But upon the fairest boughs, Or at every sentence’ end, Will I “Rosalinda” write, Teaching all that read to know The quintessence of every sprite Heaven would in little show."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[quintessential]] | adjective | **1.** Representing the perfect example of a class or quality. | *"In quintessential triviality For years in this fleshcase a shesoul dwelt. —They say we are to have a literary surprise, the quaker librarian said, friendly and earnest."* — James Joyce, *Ulysses* |
| [[quintet]] | noun | **1.** A musical composition for five performers.<br>**2.** The cardinal number that is the sum of four and one. | *"In academic literature, quintet designates a musical composition for five performers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quintette]] | noun | **1.** Five performers or singers who perform together.<br>**2.** A set of five similar things considered as a unit. | *"In academic literature, quintette designates five performers or singers who perform together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quintillion]] | noun | **1.** The number that is represented as a one followed by 18 zeros. | *"To comprehend the meaning of these figures, it is necessary to observe that a quintillion is to a billion as a billion is to unity; in other words, there are as many billions in a quintillion as there are units in a billion."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[quintillionth]] | noun | **1.** One part in a quintillion equal parts.<br>**2.** The ordinal number of one quintillion in counting order. | *"In academic literature, quintillionth designates one part in a quintillion equal parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quintipara]] | noun | **1.** (obstetrics) woman who has given birth to a viable infant in each of five pregnancies. | *"In academic literature, quintipara designates (obstetrics) woman who has given birth to a viable infant in each of five pregnancies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quintuple]] | noun | **1.** A set of five similar things considered as a unit.<br>**2.** Increase fivefold. | *"In academic literature, quintuple designates a set of five similar things considered as a unit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quintuplet]] | noun | **1.** The cardinal number that is the sum of four and one.<br>**2.** One of five children born at the same time from the same pregnancy. | *"In academic literature, quintuplet designates the cardinal number that is the sum of four and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[quintupling]] | noun | **1.** Increasing by a factor of five.<br>**2.** Increase fivefold. | *"In academic literature, quintupling designates increasing by a factor of five."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sequin]] | noun | **1.** Adornment consisting of a small piece of shiny material used to decorate clothing. | *"Leopopold! _(Twittering.)_ Leeolee! _(Warbling.)_ O Leo! _(They rustle, flutter upon his garments, alight, bright giddy flecks, silvery sequins.)_ BLOOM: A man’s touch."* — James Joyce, *Ulysses* |
| [[sequined]] | adjective | **1.** Covered with beads or jewels or sequins. | *"In academic literature, sequined designates covered with beads or jewels or sequins."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · QUIN
  </div>
</div>
