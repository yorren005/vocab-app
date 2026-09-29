---
status: unread
type: root_dashboard
---
# Dashboard — mille
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mille-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“thousand”</span>
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

The root **mille** means thousand. It refers to the count of one thousand or a thousandfold unit. In English, this root forms words such as *mile*, *mileage*, *milestone*, and *millennium*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: thousand
> The root **mille** means thousand. It refers to the count of one thousand or a thousandfold unit. In English, this root forms words such as *mile*, *mileage*, *milestone*, and *millennium*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Thousand</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *mile* and *mileage*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mille** comes from a Latin word that means *"thousand"*.
  - At its core, it describes thousand.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **mille** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of thousand.
  - **Mental & Social**: How people experience, organize, or communicate about thousand.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Mile**: A unit of linear measure equal to 5,280 feet or 1,760 yards.
  - **Mileage**: A number of miles traveled or covered.
  - **Milestone**: A stone set up beside a road to mark the distance in miles to a given place.
  - **Millennium**: A period of one thousand years, especially computed from the beginning of the Christian era.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mille</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **mille** generates vocabulary through three distinct linguistic channels:
> - **Direct Latin Stems in `mille-` and `milli-`:**
>   - *mīlle* + *annus* ("year") $\to$ *millennium* ("period of one thousand years").
>   - *millennium* + *-al* $\to$ *millennial* ("relating to a millennium; generation").
>   - *millēnārius* + *-an* $\to$ *millenarian* ("believing in the millennial kingdom").
>   - *mīlle* + *pēs, pedis* ("foot") $\to$ *millipede* ("creature with 'a thousand' feet").
>   - *millēsimus* + *-al* $\to$ *millesimal* ("thousandth part").
> - **Old English & Anglo-Norman Conduit (`mile-` < *mīlia*):**
>   - *mīlia* $\to$ Old English *mīl* $\to$ *mile* ("statute unit of 5,280 feet").
>   - *mile* + *-age* $\to$ *mileage* ("distance traveled; fuel efficiency").
>   - *mile* + *stone* $\to$ *milestone* ("road marker; major achievement").
> - **Italian Banking Augmentative (`million-` < *milione*):**
>   - *mīlle* + *-one* (augmentative) $\to$ Italian *milione* $\to$ French *million* $\to$ *million*, *millionaire*.
>   - *milliard* $\to$ French *milliard* (one thousand million, $10^9$).
> - **French Metric System Prefix `milli-` ($10^{-3}$):**
>   - *milli-* + *gramme* $\to$ *milligram* ($0.001\text{ g}$).
>   - *milli-* + *litre* $\to$ *milliliter* ($0.001\text{ L}$).
>   - *milli-* + *mètre* $\to$ *millimeter* ($0.001\text{ m}$).

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
> Although fundamentally signifying **"thousand"**, the root adapts to diverse practical disciplines:
> - **Terrestrial & Automotive Navigation:** *mile*, *mileage*, *milestone* (distance travel, speed limits, vehicle odometry).
> - **Cosmic & Generational Chronology:** *millennium*, *millennial* (thousand-year spans, turn-of-the-century cohort).
> - **Theological Eschatology:** *millenarian*, *millenary* (prophetic belief in a thousand-year reign of peace).
> - **Finance & Demographic Scale:** *million*, *millionaire*, *milliard* (capital investment, billionaire net worth).
> - **Microscopic Metric Precision:** *millimeter*, *milligram*, *milliliter* (pharmaceutical dosage, mechanical tolerances).
> - **Arthropod Zoology:** *millipede* (diplopod multi-segmented myriapods).

---

## 🔀 4. Prefix & Combining Dynamics on mille

### Prefix & Combining Morphologies

| Combining Element | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `mīlle` + `passūs` | thousand + paces | **[[mile]]** | Imperial unit of linear distance (5,280 feet). |
| `mīlle` + `annus` | thousand + years | **[[millennium]]** | A span of one thousand calendar years. |
| `milli-` + `gramma` | thousandth + weight | **[[milligram]]** | One-thousandth of a gram ($10^{-3}\text{ g}$). |
| `milli-` + `metron` | thousandth + measure| **[[millimeter]]** | One-thousandth of a meter ($10^{-3}\text{ m}$). |
| `mīlle` + `pēs` | thousand + feet | **millipede** | Arthropod with two pairs of jointed legs per body segment. |

### Suffix Transformations (Grammatical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-aire` | Noun (Person of Status) | **millionaire** | A person whose wealth equals or exceeds a million currency units. |
| `-age` | Noun (Aggregate / Rate) | **[[mileage]]** | Aggregate miles traveled or miles achieved per unit of fuel. |
| `-arian` | Noun / Adjective (Belief) | **[[millenarian]]** | One who believes in the coming thousand-year spiritual golden age. |
| `-esimal` | Adjective / Noun (Fraction)| **millesimal** | Consisting of or pertaining to a thousandth part. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🛣️ **Transportation & Highway Civil Engineering** | *mile*, *mileage*, *milestone* | Interstate highway markers, railway trackage surveys, fleet vehicle tracking. |
| 💊 **Pharmacology & Chemistry** | *milligram*, *milliliter*, *millimeter* | Precise intravenous medication dosing, micro-pipetting, laboratory assays. |
| 💰 **Macroeconomics & Capital Markets** | *million*, *millionaire*, *milliard* | Venture capital funding rounds, national GDP valuations, wealth brackets. |
| ⏳ **Historiography & Demography** | *millennium*, *millennial* | Epochal timeline mapping, demographic sociological studies of the Y-generation. |
| 🪲 **Entomology & Soil Ecology** | *millipede* (Class Diplopoda) | Forest detritivore decomposition, soil nutrient recycling. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[demille]] | noun | **1.** United states film maker remembered for his extravagant and spectacular epic productions (1881-1959). | *"In academic literature, demille designates united states film maker remembered for his extravagant and spectacular epic productions (1881-1959)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[milled]] | verb | **1.** Move about in a confused manner.<br>**2.** Grind with a mill. | *"The embossed design is merely to make the coins easily recognizable and difficult to counterfeit; and milled or lettered edges are to prevent clipping and otherwise abstracting metal from the coins. 10. #Seigniorage defined#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[millenarian]] | noun | **1.** A person who believes in the coming of the millennium (a time of great peace and prosperity).<br>**2.** Relating to or believing in the millennium of peace and happiness. | *"In academic literature, millenarian designates a person who believes in the coming of the millennium (a time of great peace and prosperity)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millenarianism]] | noun | **1.** Belief in the christian doctrine of the millennium mentioned in the book of revelations. | *"In academic literature, millenarianism designates belief in the christian doctrine of the millennium mentioned in the book of revelations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millenarism]] | noun | **1.** Belief in the christian doctrine of the millennium mentioned in the book of revelations. | *"In academic literature, millenarism designates belief in the christian doctrine of the millennium mentioned in the book of revelations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millenarist]] | noun | **1.** A person who believes in the coming of the millennium (a time of great peace and prosperity). | *"In academic literature, millenarist designates a person who believes in the coming of the millennium (a time of great peace and prosperity)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millenary]] | noun | **1.** The 1000th anniversary (or the celebration of it).<br>**2.** A span of 1000 years. | *"In academic literature, millenary designates the 1000th anniversary (or the celebration of it)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millennial]] | adjective | **1.** Relating to a millennium or span of a thousand years. | *"Millennial glory If all who ever partook of the sacrament had really commemorated the sufferings of Jesus and drunk of 34:12 his cup, they would have revolutionized the world."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[millennian]] | adjective | **1.** Relating to a millennium or span of a thousand years. | *"In academic literature, millennian designates relating to a millennium or span of a thousand years."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millennium]] | noun | **1.** A span of 1000 years.<br>**2.** (new testament) in revelations it is foretold that those faithful to jesus will reign with jesus over the earth for a thousand years; the meaning of these words have been much debated; some denominations (e.g. jehovah's witnesses) expect it to be a thousand years of justice and peace and happiness. | *"The rank and file might be willing to talk of the millennium, but preferred to take it in instalments instead of waiting for it to come some centuries after they were dead."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[millenniumism]] | noun | **1.** Belief in the christian doctrine of the millennium mentioned in the book of revelations. | *"In academic literature, millenniumism designates belief in the christian doctrine of the millennium mentioned in the book of revelations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[miller]] | noun | **1.** United states bandleader of a popular big band (1909-1944).<br>**2.** United states novelist whose novels were originally banned as pornographic (1891-1980). | *"Of seven groats in mill-sixpences, and two Edward shovel-boards that cost me two shilling and two pence a-piece of Yed Miller, by these gloves."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[miller's-thumb]] | noun | **1.** Small freshwater sculpin of europe and north america. | *"In academic literature, miller's-thumb designates small freshwater sculpin of europe and north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millerite]] | noun | **1.** A yellow mineral consisting of nickel sulfide; a minor source of nickel. | *"In academic literature, millerite designates a yellow mineral consisting of nickel sulfide; a minor source of nickel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[millet]] | noun | **1.** Any of various small-grained annual cereal and forage grasses of the genera panicum, echinochloa, setaria, sorghum, and eleusine.<br>**2.** French painter of rural scenes (1814-1875). | *"Also, they ate a sort of millet, and pickles of astounding variety and ungodly hot."* — Jack London, *The Jacket (The Star-Rover)* |
| [[millettia]] | noun | **1.** Any of several tropical trees or shrubs yielding showy streaked dark reddish or chocolate-colored wood. | *"In academic literature, millettia designates any of several tropical trees or shrubs yielding showy streaked dark reddish or chocolate-colored wood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postmillennial]] | adjective | **1.** Of or relating to the period following the millennium. | *"In academic literature, postmillennial designates of or relating to the period following the millennium."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · MILLE
  </div>
</div>
