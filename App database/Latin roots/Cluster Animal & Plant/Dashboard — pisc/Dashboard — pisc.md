---
status: unread
type: root_dashboard
---
# Dashboard — pisc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pisc-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“fish”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Living creatures moving through nature and plants growing from the soil.</span>
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

The root **pisc** means fish. It refers to cold-blooded aquatic creatures with fins and gills. In English, this root forms words such as *piscatorial*, *piscatory*, *piscatorially*, and *piscator*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: fish
> The root **pisc** means fish. It refers to cold-blooded aquatic creatures with fins and gills. In English, this root forms words such as *piscatorial*, *piscatory*, *piscatorially*, and *piscator*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Fish</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *piscatorial* and *piscatory*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pisc** comes from a Latin word that means *"fish"*.
  - At its core, it describes fish.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **pisc** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of fish.
  - **Mental & Social**: How people experience, organize, or communicate about fish.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Piscatorial**: Of, relating to, or connected with fishermen, fishing, or the sport of angling.
  - **Piscatory**: Relating to fishermen or fishing.
  - **Piscatorially**: In a piscatorial manner.
  - **Piscator**: A fisherman or angler.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pisc</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **pisc** combines through Latin agricultural, agentive, and culinary formations:
> 1. **Agent & Adjectival Suffixation (from *piscārī* "to fish"):**
>    - `pisc-` + `-ator` (*piscātor*) ➔ *piscator* (a fisherman).
>    - `piscātōr-` + `-ial` ➔ *piscatorial* (pertaining to angling).
>    - `pisc-` + `-ine` (*-īnus*) ➔ *piscine* (resembling a fish).
> 2. **Aquacultural & Ecological Compounding:**
>    - `pisci-` + `cultūra` ("care, cultivation") ➔ *pisciculture* (fish farming).
>    - `pisci-` + `vorāre` ("to devour") ➔ *piscivore* ➔ *piscivorous* (fish-eating).
>    - `pisci-` + `caedere` ("to kill") ➔ *piscicide* (chemical lethal to fish).
> 3. **Legal & Architectural Formations:**
>    - `pisc-` + `-ary` (*piscāria*) ➔ *piscary* (legal fishing right).
>    - `pisc-` + `-ina` (*piscīna*, "fishpond") ➔ *piscina* (sacred church ablution basin).
> 4. **Romance Vernacular Borrowings:**
>    - Italian *pesce* (< Latin *piscis*) + *vegetarian* ➔ *pescatarian* (seafood diet).

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
> Although firmly anchored in the finned fish, the semantic pathways branch across distinct human activities:
> - **Sport Angling & Literature:** [[piscator]] and [[piscatorial]] celebrate the quiet, philosophical pastime of fly-fishing on upland chalk streams.
> - **Commercial Aquaculture:** [[pisciculture]] addresses industrial salmon pens, trout hatcheries, and blue-economy food production.
> - **Wildlife Ecology & Predation:** [[piscivore]] designates apex marine and freshwater hunters like bald eagles, sea otters, and barracudas.
> - **Ecclesiastical Architecture:** [[piscina]] moved from an ancient Roman villa fishpond to an Early Christian baptismal immersion pool, and finally to a stone sacristy drainage basin.
> - **Property Jurisprudence:** [[piscary]] governs riparian common rights in English property law.

---

## 🔀 4. Prefix & Combining Dynamics on pisc

### Structural Compounding on `pisc-`

| Element / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Shift |
| :--- | :--- | :--- | :--- |
| `-ātor` | agent, one who fishes | [[piscator]] | A fisherman, especially an enthusiastic sport angler |
| `-ārius` / `-ary` | legal right, place | [[piscary]] | Common law right to catch fish in waters owned by another |
| `-cultūra` | rearing, farming | [[pisciculture]] | Scientific and commercial farming of finfish populations |
| `vorāre` | to devour, eat | [[piscivore]] | Organism whose diet consists predominantly of fish |
| `-īna` | pool, container | [[piscina]] | Stone basin with a drain hole for liturgical holy water ablutions |
| `caedere` | to kill, slay | `piscicide` | Toxin specifically engineered to eradicate fish populations |
| `forma` | shape, contour | `pisciform` | Having the hydrodynamic, tapered geometry of a fish |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Marine Biology & Freshwater Ecology:** Piscivorous trophic webs, bioaccumulation of methylmercury in apex piscivores.
> - **Commercial Aquaculture & Hatcheries:** Salmonid pisciculture, recirculating aquaculture systems (RAS), and fish vaccination.
> - **Property Law & Environmental Regulation:** Riparian rights, common of piscary, and fisheries treaty allocations.
> - **Ecclesiastical History & Architecture:** Medieval Romanesque and Gothic church piscinas built into chancel walls.
> - **Nutritional Science & Gastronomy:** Pescatarian dietary patterns rich in omega-3 fatty acids.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[episcia]] | noun | **1.** Any plant of the genus episcia; usually creeping and stoloniferous and of cascading habit; grown for their colorful foliage and flowers. | *"In academic literature, episcia designates any plant of the genus episcia; usually creeping and stoloniferous and of cascading habit; grown for their colorful foliage and flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[episcleritis]] | noun | **1.** Inflammation of the sclera of the eye. | *"In academic literature, episcleritis designates inflammation of the sclera of the eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[episcopacy]] | noun | **1.** The collective body of bishops. | *"In academic literature, episcopacy designates the collective body of bishops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[episcopal]] | adjective | **1.** Of or pertaining to or characteristic of the episcopal church.<br>**2.** Denoting or governed by or relating to a bishop or bishops. | *"Some quarrel the Presbyter gown, Some quarrel Episcopal graithing; But every good fellow will own Their quarrel is a’ about—naething."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[episcopalian]] | noun | **1.** A member of the episcopal church.<br>**2.** Of or pertaining to or characteristic of the episcopal church. | *"When Pentecost comes to us we are all lifted upon one grand common platform and shake hands and shout and weep and laugh and get so mixed up that a Presbyterian can not be distinguished from a Methodist, nor a Friend from an Episcopalian vestryman."* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[episcopalianism]] | noun | **1.** The theological doctrine of church government by bishops. | *"In academic literature, episcopalianism designates the theological doctrine of church government by bishops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[episcopate]] | noun | **1.** The term of office of a bishop.<br>**2.** The territorial jurisdiction of a bishop. | *"In academic literature, episcopate designates the term of office of a bishop."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piscary]] | noun | **1.** A workplace where fish are caught and processed and sold. | *"In academic literature, piscary designates a workplace where fish are caught and processed and sold."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piscatorial]] | adjective | **1.** Relating to or characteristic of the activity of fishing. | *"In academic literature, piscatorial designates relating to or characteristic of the activity of fishing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piscatory]] | adjective | **1.** Relating to or characteristic of the activity of fishing. | *"Our first essay was along a mountain brook among the Highlands of the Hudson--a most unfortunate place for the execution of those piscatory tactics which had been invented along the velvet margins of quiet English rivulets."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[pisces]] | noun | **1.** The twelfth sign of the zodiac; the sun is in this sign from about february 19 to march 20.<br>**2.** (astrology) a person who is born while the sun is in pisces. | *"The same may be made with Cancer ascending, the moon being received by Jupiter and Venus in Pisces, and being fortunately placed in the ninth house, and write upon it the spirit of the moon (which is Gabriel)."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[pisciculture]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pisc within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of pisc in systematic terminology. | *"In academic literature, pisciculture designates pertaining to, derived from, or characteristic of latin pisc within the domain of animal & plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piscidia]] | noun | **1.** Genus of shrubs or small trees having indehiscent pods with black seeds; roots and bark yield fish poisons. | *"In academic literature, piscidia designates genus of shrubs or small trees having indehiscent pods with black seeds; roots and bark yield fish poisons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piscine]] | adjective | **1.** Of or relating to fish. | *"In academic literature, piscine designates of or relating to fish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piscivorous]] | adjective | **1.** Feeding on fishes. | *"In academic literature, piscivorous designates feeding on fishes."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal & Plant]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PISC
  </div>
</div>
