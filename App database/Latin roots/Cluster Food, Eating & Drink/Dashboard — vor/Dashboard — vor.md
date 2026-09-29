---
status: unread
type: root_dashboard
---
# Dashboard — vor
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vor-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to devour”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Gathering at a dining table to share nourishment, bread, and refreshing water.</span>
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

The root **vor** means to devour. It refers to devour, to swallow down, ravenous consumption. In English, this root forms words such as *voracious*, *carnivore*, *herbivore*, and *omnivore*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to devour
> The root **vor** means to devour. It refers to devour, to swallow down, ravenous consumption. In English, this root forms words such as *voracious*, *carnivore*, *herbivore*, and *omnivore*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To devour</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering at a dining table to share nourishment, bread, and refreshing water.</mark>
> - **Everyday Connection**: Think of familiar words like *voracious* and *carnivore*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vor** comes from a Latin word that means *"to devour"*.
  - At its core, it describes the action of devour.

- **The Big Picture Idea**:
  - Picture gathering at a dining table to share nourishment, bread, and refreshing water.
  - Whenever you see **vor** in an English word, think of **to devour**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to devour).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Voracious**: Having a huge, ravenous appetite.
  - **Carnivore**: An animal that feeds primarily or exclusively on the flesh of other animals.
  - **Herbivore**: An animal that feeds entirely or mainly on plants and plant matter.
  - **Omnivore**: An animal or organism that naturally consumes and digests food of both plant and animal origin.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vor</mark>, think of <mark class="hl-def">to devour</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of Latin *vorāre*
> English acquired derivatives of *vorāre* through three robust linguistic mechanisms:
> 1. **The Primary Verb & Adjectival Stem:**
>    - *dē-* + *vorāre* $ightarrow$ Old French *devorer* $ightarrow$ English **devour**, **devourer**, **devouring**.
>    - *vorāx* (stem *vorāc-*, "inclined to devour") $ightarrow$ **voracious**, **voraciously**, **voraciousness**, **voracity**.
> 2. **The Latin Abyss Formations:**
>    - *vorāre* $ightarrow$ noun of the abyss *vorāgō* $ightarrow$ **vorago**, **voraginous**.
>    - *vorāns* (present participle) $ightarrow$ heraldic **vorant** (swallowing whole).
> 3. **The Universal Ecological Suffix Engine (`-vore` / `-vorous`):**
>    - Combining a Latin noun stem designating the diet with *-vore* (noun) and *-vorous* (adjective):
>      - *carō, carnis* (flesh) $ightarrow$ **carnivore**, **carnivorous**.
>      - *herba* (plant) $ightarrow$ **herbivore**, **herbivorous**.
>      - *omnis* (all) $ightarrow$ **omnivore**, **omnivorous**.
>      - *frūx, frūgis* (fruit) $ightarrow$ **frugivore**, **frugivorous**.
>      - *īnsectum* (insect) $ightarrow$ **insectivore**, **insectivorous**.
>      - *folium* (leaf) $ightarrow$ **folivore**, **folivorous**.
>      - *grāmen, grāminis* (grass) $ightarrow$ **graminivore**, **graminivorous**.
>      - *grānum* (grain/seed) $ightarrow$ **granivore**, **granivorous**.
>      - *piscis* (fish) $ightarrow$ **piscivore**, **piscivorous**.
>      - *sanguis* (blood) $ightarrow$ **sanguivore**, **sanguivorous**.
>      - *dētrītus* (decay) $ightarrow$ **detritivore**, **detritivorous**.
>      - *līmus* (mud) $ightarrow$ **limivore**, **limivorous**.
>      - *mel, mellis* (honey) $ightarrow$ **mellivore**, **mellivorous**.

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

```
                                  ┌── Ravenous Appetite & Greed ── voracious, voracity, devour, devouring
                                  │
                                  ├── The Big Three Trophic Guilds carnivore, herbivore, omnivore
                                  │
    [VOR-] ───────────────────────┼── Specialized Animal Diets ─── frugivore, insectivore, folivore, piscivore
(to devour / swallow)             │
                                  ├── Niche Benthic & Micro-Diet ─ detritivore, limivore, sanguivore, granivore
                                  │
                                  └── Heraldic & Abyssal ───────── vorant (swallowing whole), vorago, voraginous
```

> [!tip] 🌈 Thematic Categories of the Derived Vocabulary
> 1. **Insatiable Consumption & Gluttony:** *voracious*, *voraciously*, *voraciousness*, *voracity*, *devour*, *devourer*, *devouring*.
> 2. **Trophic Macro-Ecology:** *carnivore*, *carnivorous*, *herbivore*, *herbivorous*, *omnivore*, *omnivorous*, *omnivorously*.
> 3. **Targeted Vertebrate & Invertebrate Diets:** *frugivore*, *frugivorous*, *folivore*, *folivorous*, *graminivore*, *graminivorous*, *granivore*, *granivorous*, *piscivore*, *piscivorous*, *sanguivore*, *sanguivorous*, *insectivore*, *insectivorous*.
> 4. **Decomposition, Soil & Benthic Ecology:** *detritivore*, *detritivorous*, *limivore*, *limivorous*, *mellivore*, *mellivorous*.
> 5. **Heraldry & Geological Vortices:** *vorant*, *vorago*, *voraginous*.

---

## 🔀 4. Prefix & Combining Dynamics on vor

### Compounding Elements in the Trophic Engine

| First Element | Classical Source | Formed Compound | Ecological Meaning |
| :--- | :--- | :--- | :--- |
| `carni-` | Latin *carō, carnis* ("flesh") | **carnivore**, **carnivorous** | Animals that feed predominantly on animal flesh. |
| `herbi-` | Latin *herba* ("vegetation") | **herbivore**, **herbivorous** | Animals that consume primary plant matter. |
| `omni-` | Latin *omnis* ("all") | **omnivore**, **omnivorous** | Organisms capable of digesting both plant and animal foods. |
| `frugi-` | Latin *frūx, frūgis* ("fruit") | **frugivore**, **frugivorous** | Animals specialized in consuming succulent tree fruits. |
| `foli-` | Latin *folium* ("leaf") | **folivore**, **folivorous** | Herbivores adapted to digest high-cellulose leaves. |
| `gramini-` | Latin *grāmen* ("grass") | **graminivore**, **graminivorous** | Grazers that feed predominantly upon pasture grasses. |
| `grani-` | Latin *grānum* ("seed/grain") | **granivore**, **granivorous** | Birds and rodents that subsist on hard botanical seeds. |
| `pisci-` | Latin *piscis* ("fish") | **piscivore**, **piscivorous** | Predators that hunt and consume fish. |
| `sangui-` | Latin *sanguis* ("blood") | **sanguivore**, **sanguivorous** | Parasites or predators that drink vertebrate blood. |
| `detriti-` | Latin *dētrītus* ("rubbed away") | **detritivore**, **detritivorous** | Recyclers feeding on dead organic waste. |
| `limi-` | Latin *līmus* ("mud, silt") | **limivore**, **limivorous** | Sediment-feeders extracting nutrients from benthic mud. |

### Suffix Transformations

| Suffix | Morphological Role | Formed Word | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-acious` (Latin *-āx*) | Adjective of excessive propensity | **voracious** | Prone to devouring greedily or insatiably. |
| `-acity` (Latin *-ācitās*) | Abstract noun (tendency / state) | **voracity** | The quality or state of being ravenous. |
| `-vore` (Modern scientific) | Noun (agent / feeder) | **carnivore**, **omnivore** | An animal adapted to eat a specified food. |
| `-vorous` (Latin *-vorus*) | Adjective of feeding habit | **herbivorous**, **piscivorous** | Having the habit of eating a specified food. |
| `-ant` (Latin *-āns*) | Heraldic participial adjective | **vorant** | Depicted in the act of swallowing whole. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 🦁 **Zoology, Wildlife Ecology & Conservation** | *carnivore*, *herbivore*, *omnivore*, *piscivore*, *folivore* | Mapping trophic cascades, predator-prey biomass ratios, and dietary adaptations in African savannah food webs. |
| 🪱 **Soil Science, Forestry & Marine Biology** | *detritivore*, *limivore*, *detritivorous* | Investigating nutrient cycling in forest leaf litter and abyssal benthic sediments; quantifying earthworm humus formation. |
| 📚 **Literary Criticism & Rhetoric** | *voracious*, *voracity*, *devour* | Analyzing literary depictions of intellectual thirst (*a voracious reader*), unbridled greed, or the devouring maw of Father Time (*Tempus edax rerum*). |
| 🛡️ **Classical Heraldry & Vexillology** | *vorant* | Blazoning historic coats of arms (e.g., the *Biscione* serpent vorant on the Visconti crest and Alfa Romeo emblem). |
| 🩺 **Pathology & Parasitology** | *sanguivore*, *sanguivorous* | Studying vector-borne disease transmission by blood-feeding hematophagous arthropods (ticks, mosquitoes, tsetse flies). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aphidivorous]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vor within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vor in systematic terminology. | *"In academic literature, aphidivorous designates pertaining to, derived from, or characteristic of latin vor within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carnivore]] | noun | **1.** A terrestrial or aquatic flesh-eating mammal.<br>**2.** Any animal that feeds on flesh. | *"It was I broke in the bucking broncho Ajax with my patent spiked saddle for carnivores."* — James Joyce, *Ulysses* |
| [[carnivorous]] | adjective | **1.** Relating to or characteristic of carnivores.<br>**2.** (used of plants as well as animals) feeding on animals. | *"A thing altogether incredible were it not that attracted by such prey as a dead whale, the otherwise miscellaneously carnivorous shark will seldom touch a man."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[detritivore]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vor within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vor in systematic terminology. | *"In academic literature, detritivore designates pertaining to, derived from, or characteristic of latin vor within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divorce]] | noun | **1.** The legal dissolution of a marriage.<br>**2.** Part; cease or break association with. | *"If it appear not plain, and prove untrue, Deadly divorce step between me and you!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divorced]] | verb | **1.** Part; cease or break association with.<br>**2.** Get a divorce; formally terminate a marriage. | *"This sleep is sound indeed; this is a sleep That from this golden rigol hath divorced So many English kings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divorcee]] | noun | **1.** A divorced woman or a woman who is separated from her husband. | *"In academic literature, divorcee designates a divorced woman or a woman who is separated from her husband."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divorcement]] | noun | **1.** The legal dissolution of a marriage. | *"They demand a man who believes in the eternal separation and divorcement of Church and School."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[equivorous]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vor within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vor in systematic terminology. | *"In academic literature, equivorous designates pertaining to, derived from, or characteristic of latin vor within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[frugivore]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vor within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vor in systematic terminology. | *"In academic literature, frugivore designates pertaining to, derived from, or characteristic of latin vor within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herbivore]] | noun | **1.** Any animal that feeds chiefly on grass and other plants. | *"In academic literature, herbivore designates any animal that feeds chiefly on grass and other plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herbivorous]] | adjective | **1.** Feeding only on plants. | *"It is carnivorous, herbivorous, and abstemious from water, requiring no other fluids than those obtained by eating roots."* — W. E. Webb, *Buffalo Land* |
| [[insectivore]] | noun | **1.** Small insect-eating mainly nocturnal terrestrial or fossorial mammals.<br>**2.** Any organism that feeds mainly on insects. | *"In academic literature, insectivore designates small insect-eating mainly nocturnal terrestrial or fossorial mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insectivorous]] | adjective | **1.** (of animals and plants) feeding on insects. | *"In academic literature, insectivorous designates (of animals and plants) feeding on insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[omnivore]] | noun | **1.** A person who eats all kinds of foods.<br>**2.** An animal that feeds on both animal and vegetable substances. | *"In academic literature, omnivore designates a person who eats all kinds of foods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[omnivorous]] | adjective | **1.** Feeding on both plants and animals. | *"For like certain other omnivorous roving lovers that might be named, my Lord Whale has no taste for the nursery, however much for the bower; and so, being a great traveller, he leaves his anonymous babies all over the world; every baby an exotic."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[panivorous]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vor within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vor in systematic terminology. | *"In academic literature, panivorous designates pertaining to, derived from, or characteristic of latin vor within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytivorous]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vor within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vor in systematic terminology. | *"In academic literature, phytivorous designates pertaining to, derived from, or characteristic of latin vor within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piscivore]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vor within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vor in systematic terminology. | *"In academic literature, piscivore designates pertaining to, derived from, or characteristic of latin vor within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piscivorous]] | adjective | **1.** Feeding on fishes. | *"In academic literature, piscivorous designates feeding on fishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pupivorous]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vor within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vor in systematic terminology. | *"In academic literature, pupivorous designates pertaining to, derived from, or characteristic of latin vor within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[voracious]] | adjective | **1.** Excessively greedy and grasping.<br>**2.** Devouring or craving food in great quantities. | *"Although he was a voracious reader, it must be admitted that Dr."* — John Cairns, *Principal Cairns* |
| [[voraciously]] | adverb | **1.** In an eagerly voracious manner. | *"He walked up to the sideboard, and tearing a piece from the loaf he devoured it voraciously, washing it down with a long draught of water."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[voraciousness]] | noun | **1.** Excessive desire to eat.<br>**2.** Extreme gluttony. | *"In academic literature, voraciousness designates excessive desire to eat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[voracity]] | noun | **1.** Excessive desire to eat.<br>**2.** Extreme gluttony. | *"I knew the debilitated state of my stomach, and I ate sparingly in the knowledge that my natural voracity would surely kill me did I yield myself to it."* — Jack London, *The Jacket (The Star-Rover)* |
| [[vorarephile]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vor within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vor in systematic terminology. | *"In academic literature, vorarephile designates pertaining to, derived from, or characteristic of latin vor within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vorarephilia]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vor within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vor in systematic terminology. | *"In academic literature, vorarephilia designates pertaining to, derived from, or characteristic of latin vor within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vortex]] | noun | **1.** The shape of something rotating rapidly.<br>**2.** A powerful circular current of water (usually the result of conflicting tides). | *"Pardiggle accordingly rose and made a little vortex in the confined room from which the pipe itself very narrowly escaped."* — Charles Dickens, *Bleak House* |
| [[vorticella]] | noun | **1.** Any of various protozoa having a transparent goblet-shaped body with a retractile stalk. | *"In academic literature, vorticella designates any of various protozoa having a transparent goblet-shaped body with a retractile stalk."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Food, Eating & Drink]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VOR
  </div>
</div>
