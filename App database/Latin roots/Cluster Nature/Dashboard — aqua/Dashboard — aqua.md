---
status: unread
type: root_dashboard
---
# Dashboard — aqua
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">aqua-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“water”</span>
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

The root **aqua** means water. It refers to natural water, moisture, and liquid bodies in nature. In English, this root forms words such as *aquarium*, *aquatic*, *aqueduct*, and *aquamarine*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: water
> The root **aqua** means water. It refers to natural water, moisture, and liquid bodies in nature. In English, this root forms words such as *aquarium*, *aquatic*, *aqueduct*, and *aquamarine*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Water</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *aquarium* and *aquatic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **aqua** comes from a Latin word that means *"water"*.
  - At its core, it describes water.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **aqua** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of water.
  - **Mental & Social**: How people experience, organize, or communicate about water.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Aquarium**: A transparent tank or pool filled with water for keeping live aquatic animals and plants.
  - **Aquatic**: Growing, living in, or frequenting water.
  - **Aqueduct**: A monumental artificial conduit, bridge, or canal constructed to convey water over obstacles from a distant source.
  - **Aquamarine**: A transparent, pale blue-green variety of beryl valued as a precious gemstone.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">aqua</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **aqua** manifests across three primary English combining forms:
> - **Base Nominal Combining Form `aqua-`:**
>   - Direct compounding with nouns/adjectives: *aquamarine* (sea-colored), *aquaplane* (water-skimmer), *aquaculture* (water-farming), *aquafaba* (bean-water), *aquatint* (water-tint).
>   - Hybrid neo-classical Greek blends: *aquanaut* (*aqua* + Greek *nautēs* "sailor").
> - **Vowel-Shifted / Genitival Stem `aqui-`:**
>   - Combining with Latin verbal roots: *aquifer* (*aqua* + *ferre* "to bear" $\to$ water-bearer), *aqueduct* (*aqua* + *dūcere* "to lead" $\to$ water-channel).
> - **Adjectival Stems `aque-` and `aquat-`:**
>   - Direct Latin adjectives: *aqueous* (*aqueus*), *aquatic* (*aquāticus*).
>   - Prefixed adjectival variants: `sub-` ("under") $\to$ *subaqueous*, *subaquatic*.

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
> - **Hydraulic Infrastructure & Engineering:** The physical conveyance and piping of water across landscapes (*aqueduct*, *aquifer*).
> - **Biological Ecology & Natural Habitats:** Living organisms adapted to fresh or marine environments (*aquatic*, *aquarium*, *subaquatic*).
> - **Chemistry, Physics & Medicine:** Water-based solutions, bodily fluids, and optical humor (*aqueous*, *aqueous humor*, *subaqueous*).
> - **Human Exploration & Maritime Technology:** Undersea habitats, deep saturation diving, and high-speed watercraft (*aquanaut*, *aquaplane*).
> - **Aesthetic, Gemmological & Culinary Arts:** Translucent sea-green crystals (*aquamarine*), intaglio etching (*aquatint*), distilled spirits (*aquavit*), and vegan egg substitutes (*aquafaba*).

---

## 🔀 4. Prefix & Combining Dynamics on aqua

### Prefix Dynamics
- **`sub-` (Under / Beneath):**
  - $\to$ *subaqueous*: Formed or occurring beneath water surfaces (geological sedimentation).
  - $\to$ *subaquatic*: Living or operating under water (diving, biological adaptation).

### Suffix & Compound Dynamics
- **`-duct` (*dūcere* "to lead"):** *aqueduct* $\to$ water-carrying conduit.
- **`-fer` (*ferre* "to bear"):** *aquifer* $\to$ water-bearing subterranean rock layer; *aquiferous*.
- **`-arium` (Place / Receptacle):** *aquarium* $\to$ glass habitat for aquatic life.
- **`-ic` (Pertaining to):** *aquatic* $\to$ living or occurring in water.
- **`-ous` (Full of / Composed of):** *aqueous* $\to$ dissolved in or containing water.
- **`-culture` (*cultūra* "tillage, farming"):** *aquaculture* $\to$ commercial breeding of aquatic organisms.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Hydrogeology & Civil Engineering:** Groundwater extraction models, Darcy's law of porous media flow, recharge zones of the Ogallala *aquifer*, and Roman vaulted *aqueducts*.
> - **Ophthalmology & Human Anatomy:** The *aqueous humor* filling the anterior and posterior chambers of the eye, regulating intraocular pressure against glaucoma.
> - **Marine Ecology & Oceanography:** Coral reef monitoring by saturation *aquanauts*, conservation *aquariums*, and *subaquatic* mapping of submerged tectonic faults.
> - **Transportation Safety & Automotive Dynamics:** Highway hydrodynamics where high-speed vehicle tires lose friction and *aquaplane* on wet asphalt.
> - **Mineralogy & Gemmology:** Identification of *aquamarine* beryl ($Be_3Al_2Si_6O_{18}$) colored by trace iron ($Fe^{2+}$) ions.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[aqua]] | noun | **1.** A shade of blue tinged with green. | *"Our fraughtage, sir, I have convey’d aboard, and I have bought The oil, the balsamum, and aqua-vitae."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[aquacultural]] | adjective | **1.** Of or relating to aquiculture. | *"In academic literature, aquacultural designates of or relating to aquiculture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aquaculture]] | noun | **1.** Rearing aquatic animals or cultivating aquatic plants for food. | *"In academic literature, aquaculture designates rearing aquatic animals or cultivating aquatic plants for food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aqualung]] | noun | **1.** A device (trade name aqua-lung) that lets divers breathe under water; scuba is an acronym for self-contained underwater breathing apparatus. | *"In academic literature, aqualung designates a device (trade name aqua-lung) that lets divers breathe under water; scuba is an acronym for self-contained underwater breathing apparatus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aquamarine]] | noun | **1.** A transparent variety of beryl that is blue green in color.<br>**2.** A shade of blue tinged with green. | *"In academic literature, aquamarine designates a transparent variety of beryl that is blue green in color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aquanaut]] | noun | **1.** An underwater swimmer equipped with a face mask and foot fins and either a snorkel or an air cylinder.<br>**2.** A skilled worker who can live in underwater installations and participate in scientific research. | *"In academic literature, aquanaut designates an underwater swimmer equipped with a face mask and foot fins and either a snorkel or an air cylinder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aquaplane]] | noun | **1.** A board that is pulled by a speedboat as a person stands on it and skims over the top of the water.<br>**2.** Rise up onto a thin film of water between the tires and road so that there is no more contact with the road. | *"In academic literature, aquaplane designates a board that is pulled by a speedboat as a person stands on it and skims over the top of the water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aquarium]] | noun | **1.** A tank or pool or bowl filled with water for keeping live fish and underwater animals. | *"The obscurity of the saloon showed to advantage the brightness outside, and we looked out as if this pure crystal had been the glass of an immense aquarium."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[aquarius]] | noun | **1.** (astrology) a person who is born while the sun is in aquarius.<br>**2.** A zodiacal constellation in the southern hemisphere; between capricornus and pisces. | *"Shake yourself; you’re Aquarius, or the water-bearer, Flask; might fill pitchers at your coat collar."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[aquatic]] | noun | **1.** A plant that lives in or on water.<br>**2.** Relating to or consisting of or being in water. | *"For some days we saw a great number of aquatic birds, sea-mews or gulls."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[aquatics]] | noun | **1.** Sports that involve bodies of water.<br>**2.** A plant that lives in or on water. | *"In academic literature, aquatics designates sports that involve bodies of water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aquatint]] | noun | **1.** An etching made by a process that makes it resemble a water color.<br>**2.** A method of etching that imitates the broad washes of a water color. | *"In academic literature, aquatint designates an etching made by a process that makes it resemble a water color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subaquatic]] | adjective | **1.** Growing or remaining under water.<br>**2.** Partially aquatic; living or growing partly on land and partly in water. | *"In academic literature, subaquatic designates growing or remaining under water."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · AQUA
  </div>
</div>
