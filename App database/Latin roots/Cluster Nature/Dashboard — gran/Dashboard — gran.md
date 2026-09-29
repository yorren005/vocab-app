---
status: unread
type: root_dashboard
---
# Dashboard — gran
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">gran-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“grain or seed”</span>
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

The root **gran** means grain or seed. It refers to the small embryonic grain from which a new plant grows. In English, this root forms words such as *grain*, *granary*, *granite*, and *granitic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: grain or seed
> The root **gran** means grain or seed. It refers to the small embryonic grain from which a new plant grows. In English, this root forms words such as *grain*, *granary*, *granite*, and *granitic*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Grain or seed</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *grain* and *granary*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gran** comes from a Latin word that means *"grain or seed"*.
  - At its core, it describes grain or seed.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **gran** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of grain or seed.
  - **Mental & Social**: How people experience, organize, or communicate about grain or seed.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Grain**: A small, hard seed of a cereal grass.
  - **Granary**: A storehouse or specialized repository for threshed grain.
  - **Granite**: A coarse-grained, intrusive felsic igneous rock composed predominantly of quartz, alkali feldspar, and plagioclase.
  - **Granitic**: Composed of, resembling, or characteristic of granite.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gran</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **gran** manifests across multiple morphological pathways:
> - **Base Nominal Stem `gran-` (*grānum*):**
>   - Direct noun: *grain*.
>   - Storage noun: *granary* (*grānārium*).
> - **Petrological & Architectural Derivative `granit-`:**
>   - Noun: *granite* (< Italian *granito*).
>   - Adjective: *granitic*.
> - **Diminutive Particulate Stem `granul-` (*grānulum*):**
>   - Noun: *granule* (tiny particle).
>   - Adjective: *granular* (having grainy texture).
>   - Abstract noun: *granularity* (level of detail/scale).
>   - Verb / Process: *granulate*, *granulation*.
> - **Prefix Formation `in-` + `gran` (*ingrain*):**
>   - *ingrain* / *engrain* (fix deeply), *ingrained*.
> - **Classical Botanical & Military Compounds:**
>   - *pomegranate* (*pōmum* "apple" + *grānātum* "seeded").
>   - *garnet* (< Old French *grenat* < *grānātum*).
>   - *grenade*, *grenadier* (via French *grenade*).
>   - *filigree* (*fīlum* "thread" + *grānum* "bead/grain").

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
> - **Agriculture & Global Commodity Trade:** Wheat, barley, maize, cereal kernels, and bulk grain storage silos (*grain*, *granary*).
> - **Igneous Petrology & Geology:** Coarse-grained intrusive plutonic rock formed from cooling silica-rich magma (*granite*, *granitic*).
> - **Computing, Physics & Systems Architecture:** The scale, modularity, or resolution at which a system, dataset, or authorization protocol is divided (*granular*, *granularity*).
> - **Pharmaceutical & Metallurgical Processing:** Compacting fine powders into free-flowing granules for pill manufacturing, or molten metal quenching (*granulate*, *granule*).
> - **Surgical Wound Healing & Pathology:** The formation of vascular, ruby-red healing tissue across open wounds (*granulation tissue*).
> - **Cognitive Psychology & Cultural Beliefs:** Habits, prejudices, or virtues so deeply assimilated that they cannot be eradicated (*ingrained*).
> - **Decorative Arts, Jewelry & Munitions:** Pomegranate-colored gemstones (*garnet*), delicate beaded metal wirework (*filigree*), and bursting shrapnel munitions (*grenade*).

---

## 🔀 4. Prefix & Combining Dynamics on gran

### Prefix Dynamics
- **`in-` (Into / Deeply):**
  - $\to$ *ingrain*: To fix, implant, or dye deeply into the very fiber or core nature.

### Suffix Dynamics
- **`-ary` (Place for / Repository):** *granary* $\to$ storehouse for grain.
- **`-ite` (Rock / Mineral Suffix):** *granite* $\to$ granular crystalline rock.
- **`-ule` (Diminutive):** *granule* $\to$ minute particle or seed.
- **`-ular` (Consisting of Grains):** *granular* $\to$ textured with small particles.
- **`-ity` (Degree / State):** *granularity* $\to$ resolution or level of modular detail.
- **`-ate` / `-ation` (Forming into Grains):** *granulate*, *granulation*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Database Systems & Computer Architecture:** Fine-grained vs. coarse-grained data *granularity* in distributed parallel computing (Hadoop, Spark) and database row-level locking.
> - **Structural Geology & Construction:** Quarrying *granite* dimension stone for monument facades, curb stones, and kitchen countertops due to quartz hardness (Mohs 7).
> - **Surgery & Wound Care:** Monitoring healthy capillary *granulation* in second-intention healing vs. hypergranulation ("proud flesh").
> - **Military Weapons & Explosives:** Development of fragmentation *grenades* and specialized assault *grenadiers* across modern combat doctrine.
> - **Agronomy & Food Science:** Grain moisture testing, grain elevator dust explosion prevention, and the development of crunchy *granola* cereals.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[gran]] | noun | **1.** The mother of your father or mother. | *"To cure the painful and dangerous wound inflicted by a ray-fish, the Indians of the Gran Chaco smoke the wounded limb and then cause a woman in her courses to sit astride of it."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[granada]] | noun | **1.** A city in southeastern spain that was the capital of the moorish kingdom until it was captured by ferdinand and isabella in 1492; site of the alhambra (a palace and fortress built by moors in the middle ages) which is now a major tourist attraction. | *"The Nauras Indians of New Granada ate the hearts of Spaniards when they had the opportunity, hoping thereby to make themselves as dauntless as the dreaded Castilian chivalry."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[granadilla]] | noun | **1.** Tropical american passionflower yielding the large granadilla fruit.<br>**2.** Considered best for fruit. | *"In academic literature, granadilla designates tropical american passionflower yielding the large granadilla fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granadillo]] | noun | **1.** West indian tree yielding a fine grade of green ebony. | *"In academic literature, granadillo designates west indian tree yielding a fine grade of green ebony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granary]] | noun | **1.** A storehouse for threshed grain or animal feed. | *"The news is, that after Miss Everdene got home she went out again to see all was safe, as she usually do, and coming in found Baily Pennyways creeping down the granary steps with half a bushel of barley."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[granicus]] | noun | **1.** The battle in which alexander won his first major victory against the persians (334 bc). | *"In academic literature, granicus designates the battle in which alexander won his first major victory against the persians (334 bc)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granite]] | noun | **1.** Plutonic igneous rock having visibly crystalline texture; generally composed of feldspar and mica and quartz.<br>**2.** Something having the quality of granite (unyielding firmness). | *"In the building trades about 16 per cent are organized, of granite cutters 69 per cent, masons 39 per cent, plasterers 32 per cent, carpenters 21 per cent, and painters 17 per cent."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[granitelike]] | adjective | **1.** Hard as granite. | *"In academic literature, granitelike designates hard as granite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graniteware]] | noun | **1.** A kind of stone-grey enamelware. | *"In academic literature, graniteware designates a kind of stone-grey enamelware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granitic]] | adjective | **1.** Showing unfeeling resistance to tender feelings.<br>**2.** Hard as granite. | *"In academic literature, granitic designates showing unfeeling resistance to tender feelings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grannie]] | noun | **1.** The mother of your father or mother. | *"My grannie she bought me a beuk, An’ I held awa to the school; I fear I my talent misteuk, But what will ye hae of a fool?"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[granny]] | noun | **1.** The mother of your father or mother.<br>**2.** An old woman. | *"Granny White was found dead in the Foxwell wagon."* — Jack London, *The Jacket (The Star-Rover)* |
| [[granola]] | noun | **1.** Cereal made of especially rolled oats with dried fruits and nuts and honey or brown sugar. | *"In academic literature, granola designates cereal made of especially rolled oats with dried fruits and nuts and honey or brown sugar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grant]] | noun | **1.** Any monetary aid.<br>**2.** The act of providing a subsidy. | *"I love to hear her speak, yet well I know, That music hath a far more pleasing sound: I grant I never saw a goddess go; My mistress when she walks treads on the ground."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[grant-in-aid]] | noun | **1.** A grant from a central government to a local government.<br>**2.** A grant to a person or school for some educational project. | *"In academic literature, grant-in-aid designates a grant from a central government to a local government."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granted]] | verb | **1.** Let have.<br>**2.** Give as judged due or on the basis of merit. | *"FIRST SOLDIER. _Acordo linta._ Come on; thou art granted space. [_Exit, with Parolles guarded._] A short alarum within."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[grantee]] | noun | **1.** A recipient of a grant.<br>**2.** Someone to whom the title of property is transferred. | *"In academic literature, grantee designates a recipient of a grant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granter]] | noun | **1.** A person who grants or gives something. | *"In academic literature, granter designates a person who grants or gives something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granth]] | noun | **1.** The principal sacred text of sikhism contains hymns and poetry as well as the teachings of the first five gurus. | *"In academic literature, granth designates the principal sacred text of sikhism contains hymns and poetry as well as the teachings of the first five gurus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grantor]] | noun | **1.** A person who makes a grant in legal form. | *"In academic literature, grantor designates a person who makes a grant in legal form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granular]] | adjective | **1.** Composed of or covered with particles resembling meal in texture or consistency.<br>**2.** Having a granular structure like that of chondrites. | *"This gelatinous substance is dissolved away from the granular bodies which are immersed in it, by adding a little water upon the slide on which the mass is placed for examination."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[granularity]] | noun | **1.** The quality of being composed of relatively large particles. | *"In academic literature, granularity designates the quality of being composed of relatively large particles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granulate]] | verb | **1.** Form into grains.<br>**2.** Become granular. | *"They manufacture sago, but do not granulate it."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[granulated]] | verb | **1.** Form into grains.<br>**2.** Become granular. | *"They do not, however, make it in a granulated form, but bake it into cakes, covering them with a frame of woven leaves, this being the handiest form for carrying it about with them in their canoes."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[granulation]] | noun | **1.** New connective tissue and tiny blood vessels that form on the surfaces of a wound during the healing process.<br>**2.** The act of forming something into granules or grains. | *"Berkeley noticed them in the English Flora in 1836, or at least the granulations on the upper surfaces of the leaves bearing _R. cancellata_, _R. cornuta_, and _R. lacerata_, and called them abortive pseudoperidia."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[granule]] | noun | **1.** A tiny grain. | *"This powder, minute as it is, every granule of it constitutes a spore or protospore capable of germination, and ultimately, after several intermediate stages, of reproducing a fungus like the parent of which it formed a part."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[granuliferous]] | adjective | **1.** Producing or full of granules. | *"In academic literature, granuliferous designates producing or full of granules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granulocyte]] | noun | **1.** A leukocyte that has granules in its cytoplasm. | *"In academic literature, granulocyte designates a leukocyte that has granules in its cytoplasm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granulocytic]] | adjective | **1.** Of or relating to granulocytes. | *"In academic literature, granulocytic designates of or relating to granulocytes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granulocytopenia]] | noun | **1.** An acute blood disorder (often caused by radiation or drug therapy) characterized by severe reduction in granulocytes. | *"In academic literature, granulocytopenia designates an acute blood disorder (often caused by radiation or drug therapy) characterized by severe reduction in granulocytes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granuloma]] | noun | **1.** A tumor composed of granulation tissue resulting from injury or inflammation or infection. | *"In academic literature, granuloma designates a tumor composed of granulation tissue resulting from injury or inflammation or infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granulomatous]] | adjective | **1.** Relating to or characterized by granulomas. | *"In academic literature, granulomatous designates relating to or characterized by granulomas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[granulose]] | adjective | **1.** Composed of or covered with particles resembling meal in texture or consistency. | *"In academic literature, granulose designates composed of or covered with particles resembling meal in texture or consistency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nongranular]] | adjective | **1.** Not having granules. | *"In academic literature, nongranular designates not having granules."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · GRAN
  </div>
</div>
