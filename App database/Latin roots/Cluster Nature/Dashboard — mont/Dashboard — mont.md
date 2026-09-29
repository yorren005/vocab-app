---
status: unread
type: root_dashboard
---
# Dashboard — mont
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mont-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“mountain”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Tall green trees, rolling hills, and rain watering the fertile landscape.</span>
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

The root **mont** means mountain. It refers to a steep, towering natural elevation of rock and earth. In English, this root forms words such as *mountain*, *mountainous*, *mount*, and *dismount*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: mountain
> The root **mont** means mountain. It refers to a steep, towering natural elevation of rock and earth. In English, this root forms words such as *mountain*, *mountainous*, *mount*, and *dismount*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Mountain</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *mountain* and *mountainous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mont** comes from a Latin word that means *"mountain"*.
  - At its core, it describes mountain.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **mont** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of mountain.
  - **Mental & Social**: How people experience, organize, or communicate about mountain.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Mountain**: A large, prominent natural elevation of the earth's surface rising abruptly from the surrounding level.
  - **Mountainous**: Having many mountains.
  - **Mount**: To climb up onto.
  - **Dismount**: To alight or get down from a horse, bicycle, or vehicle.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mont</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **mont** manifests across two major linguistic conduits:
> - **Direct Latin Stems in `mont-` and `montan-`:**
>   - Ecological adjectives: *montane* (alpine zone), *submontane* (foothill), *intermontane* (between ranges).
>   - Geopolitical / Alpine divide prefixes:
>     - `cis-` ("on this side") $\to$ *cismontane*.
>     - `ultra-` ("beyond") $\to$ *ultramontane*.
>     - `trans-` ("across") $\to$ *tramontane* (cold northern wind, foreign).
>   - Toponymic loan: *Montana* (< Spanish *montaña*).
> - **Old French & Anglo-Norman Conduits in `mount-` (< *monter*):**
>   - Base noun / verb: *mount*, *mountain*, *mountainous*.
>   - With prefixes of motion:
>     - `dis-` ("off/down") $\to$ *dismount*.
>     - `sur-` ("over/above") $\to$ *surmount*, *surmountable*, *insurmountable*.
>     - `par amont` ("at the peak") $\to$ *paramount*.
>     - `ad montem` ("to the top") $\to$ *amount*.
> - **Topographical Compound `pied-mont`:**
>   - *pes, pedis* ("foot") + *mōns* $\to$ *piedmont* (foothill plain).

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
> - **Physical Geography & Landforms:** Major terrestrial peaks, mountain ranges, and rugged terrain (*mountain*, *mountainous*, *mount*).
> - **Biogeography & Altitudinal Zonation:** Ecological forest zones situated on mountain slopes below the subalpine timberline (*montane*, *submontane*, *intermontane*).
> - **Metaphorical Mastery & Psychology:** Overcoming arduous challenges, or facing impossible barriers (*surmount*, *insurmountable*).
> - **Supreme Hierarchical Rank:** Paramount importance, supreme sovereignty, or ultimate authority (*paramount*).
> - **Geopolitical History & Theology:** Papal authority centered in Rome beyond the Alps, or cold Alpine winds (*ultramontane*, *cismontane*, *tramontane*).
> - **Mathematical Summation & Equestrian Action:** Totals accumulating to an aggregate, and alighting from a horse (*amount*, *dismount*).

---

## 🔀 4. Prefix & Combining Dynamics on mont

### Prefix Dynamics
- **`sur-` (Over / Above):** *surmount* $\to$ to climb over; conquer an obstacle.
- **`in-` + `sur-` (Not + Over):** *insurmountable* $\to$ impossible to conquer.
- **`dis-` (Down / Away):** *dismount* $\to$ to step down from a horse or setting.
- **`ultra-` (Beyond):** *ultramontane* $\to$ beyond the Alps (Roman papal loyalty).
- **`cis-` (On this side):** *cismontane* $\to$ on the Italian side of the Alps.
- **`inter-` (Between):** *intermontane* $\to$ nestled between mountain chains.
- **`sub-` (Below / At the foot of):** *submontane* $\to$ foothill region.

### Suffix Dynamics
- **`-ane` (Pertaining to):** *montane* $\to$ of mountain regions.
- **`-ous` (Full of / Characterized by):** *mountainous* $\to$ having many mountains; huge.
- **`-able` (Capable of being):** *surmountable*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Alpine Biogeography & Forestry:** Classifying life zones on the western slope of the Sierra Nevada into *montane* mixed-conifer forests (ponderosa pine, white fir) vs. subalpine lodgepole pine.
> - **Ecclesiastical History & Papal Studies:** The First Vatican Council (1870) marking the triumph of the *ultramontane* movement with the formal definition of papal infallibility.
> - **Tectonic Geomorphology:** Investigating tectonic uplift and crustal shortening in *intermontane* basins (e.g. the Altiplano of the Andes, the Great Basin).
> - **Aviation Meteorology & Synoptic Forecasting:** The *tramontane* wind blowing as a fierce, cold, gusty northerly gale off the Massif Central toward the Gulf of Lion.
> - **Executive Governance & Corporate Strategy:** Establishing *paramount* strategic priorities during organizational restructuring.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[montage]] | noun | **1.** A paste-up made by sticking together pieces of paper or photographs to form an artistic image. | *"In academic literature, montage designates a paste-up made by sticking together pieces of paper or photographs to form an artistic image."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montagu]] | noun | **1.** United states anthropologist (born in england) who popularized anthropology (1905-). | *"Basil Montagu; and here he composed many of his smaller pieces."* — F. W. H. Myers, *Wordsworth* |
| [[montaigne]] | noun | **1.** French writer regarded as the originator of the modern essay (1533-1592). | *"It is to their custom of annually extinguishing and relighting the fire that Montaigne refers in his essay (i. 22, vol. i. p. 140 of Charpentier's edition), though he mentions no names. [338] Sir H.H."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[montana]] | noun | **1.** A state in northwestern united states on the canadian border. | *"The next I heard of Frank was that he was in Montana, and then he went prospecting in Arizona, and then I heard of him from New Mexico."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[montanan]] | noun | **1.** A native or resident of montana. | *"In academic literature, montanan designates a native or resident of montana."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montane]] | adjective | **1.** Of or inhabiting mountainous regions. | *"In academic literature, montane designates of or inhabiting mountainous regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monte]] | noun | **1.** A gambling card game of spanish origin; 3 or 4 cards are dealt face up and players bet that one of them will be matched before the others as the cards are dealt from the pack one at a time. | *"DAUPHIN. _Monte à cheval!_ My horse, _varlet! laquais_, ha!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[montenegro]] | noun | **1.** A former country bordering on the adriatic sea; now part of the union of serbia and montenegro. | *"In Montenegro they meet the log with a loaf of bread and a jug of wine, drink to it, and pour wine on it, whereupon the whole family drinks out of the same beaker."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[monterey]] | noun | **1.** A town in western california to the south of san francisco on a peninsula at the southern end of monterey bay. | *"And young Raynor—you knew Raynor at Monterey—tells me that the men all like him, and that he is treated with something like deference everywhere."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[monterrey]] | noun | **1.** An industrial city in northeastern mexico. | *"In academic literature, monterrey designates an industrial city in northeastern mexico."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montespan]] | noun | **1.** French noblewoman who was mistress to louis xiv until he became attracted to madame de maintenon (1641-1707). | *"In academic literature, montespan designates french noblewoman who was mistress to louis xiv until he became attracted to madame de maintenon (1641-1707)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montesquieu]] | noun | **1.** French political philosopher who advocated the separation of executive and legislative and judicial powers (1689-1755). | *"The opponents of the plan proposed have, with great assiduity, cited and circulated the observations of Montesquieu on the necessity of a contracted territory for a republican government."* — Alexander Hamilton, *The Federalist Papers* |
| [[montessori]] | noun | **1.** Italian educator who developed a method of teaching mentally handicapped children and advocated a child-centered approach (1870-1952). | *"In academic literature, montessori designates italian educator who developed a method of teaching mentally handicapped children and advocated a child-centered approach (1870-1952)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monteverdi]] | noun | **1.** Italian composer (1567-1643). | *"In academic literature, monteverdi designates italian composer (1567-1643)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montevideo]] | noun | **1.** The capital and largest city of uruguay; a cosmopolitan city and one of the busiest ports in south america. | *"In academic literature, montevideo designates the capital and largest city of uruguay; a cosmopolitan city and one of the busiest ports in south america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montez]] | noun | **1.** Irish dancer (1818-1861). | *"In academic literature, montez designates irish dancer (1818-1861)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montezuma]] | noun | **1.** Evergreen tree with large leathery leaves and large pink to orange flowers; considered a link plant between families bombacaceae and sterculiaceae. | *"We are told that Montezuma, the last king of Mexico, was worshipped by his people as a god."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[montia]] | noun | **1.** Small genus of densely tufted annual herbs; north temperate regions and south america and tropical africa and asia. | *"In academic literature, montia designates small genus of densely tufted annual herbs; north temperate regions and south america and tropical africa and asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montmartre]] | noun | **1.** The highest point in paris; famous for its associations with many artists. | *"Making his day’s stations, the dingy printingcase, his three taverns, the Montmartre lair he sleeps short night in, rue de la Goutte-d’Or, damascened with flyblown faces of the gone."* — James Joyce, *Ulysses* |
| [[montrachet]] | noun | **1.** A white burgundy wine. | *"In academic literature, montrachet designates a white burgundy wine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montreal]] | noun | **1.** A city in southern quebec province on the saint lawrence river; the largest city in quebec and 2nd largest in canada; the 2nd largest french-speaking city in the world. | *"But he arranged his tour so as to enable him also to be present at the General Assembly of the American Presbyterian Church at Madison, and at that of the Presbyterian Church of Canada at Montreal."* — John Cairns, *Principal Cairns* |
| [[montserrat]] | noun | **1.** A volcanic island in the caribbean; in the west indies. | *"In academic literature, montserrat designates a volcanic island in the caribbean; in the west indies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[montserratian]] | noun | **1.** A native or inhabitant of montserrat.<br>**2.** Of or relating to montserrat or the inhabitants of montserrat. | *"In academic literature, montserratian designates a native or inhabitant of montserrat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[promontory]] | noun | **1.** A natural elevation (especially a rocky one that juts out into the sea). | *"Antony’s Camp near the Promontory of Actium."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[surmontil]] | noun | **1.** Tricyclic antidepressant drug (trade name surmontil) used to treat depression and anxiety and (sometimes) insomnia. | *"In academic literature, surmontil designates tricyclic antidepressant drug (trade name surmontil) used to treat depression and anxiety and (sometimes) insomnia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tramontana]] | noun | **1.** A cold dry wind that blows south out of the mountains into italy and the western mediterranean. | *"In academic literature, tramontana designates a cold dry wind that blows south out of the mountains into italy and the western mediterranean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tramontane]] | noun | **1.** A cold dry wind that blows south out of the mountains into italy and the western mediterranean.<br>**2.** On or coming from the other side of the mountains (from the speaker). | *"In academic literature, tramontane designates a cold dry wind that blows south out of the mountains into italy and the western mediterranean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transmontane]] | adjective | **1.** On or coming from the other side of the mountains (from the speaker). | *"In academic literature, transmontane designates on or coming from the other side of the mountains (from the speaker)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramontane]] | noun | **1.** A roman catholic who advocates ultramontanism (supreme papal authority in matters of faith and discipline).<br>**2.** Of or relating to ultramontanism. | *"In academic literature, ultramontane designates a roman catholic who advocates ultramontanism (supreme papal authority in matters of faith and discipline)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ultramontanism]] | noun | **1.** (roman catholic church) the policy that the absolute authority of the church should be vested in the pope. | *"In academic literature, ultramontanism designates (roman catholic church) the policy that the absolute authority of the church should be vested in the pope."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Nature]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MONT
  </div>
</div>
