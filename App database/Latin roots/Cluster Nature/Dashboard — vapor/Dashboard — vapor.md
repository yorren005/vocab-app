---
status: unread
type: root_dashboard
---
# Dashboard — vapor
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vapor-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“steam, heat, or exhalation”</span>
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

The root **vapor** means steam, heat, or exhalation. It refers to rising mist, warm steam, or gaseous exhalation. In English, this root forms words such as *boil*, *pant*, *vapour*, and *vaporous*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: steam, heat, or exhalation
> The root **vapor** means steam, heat, or exhalation. It refers to rising mist, warm steam, or gaseous exhalation. In English, this root forms words such as *boil*, *pant*, *vapour*, and *vaporous*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Steam, heat, or exhalation</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *boil* and *pant*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vapor** comes from a Latin word that means *"steam, heat, or exhalation"*.
  - At its core, it describes steam, heat, or exhalation.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **vapor** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of steam, heat, or exhalation.
  - **Mental & Social**: How people experience, organize, or communicate about steam, heat, or exhalation.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Boil**: An everyday English word showing the root's idea of *steam, heat, or exhalation*.
  - **Pant**: An everyday English word showing the root's idea of *steam, heat, or exhalation*.
  - **Vapour**: The gaseous state of any substance that is normally a liquid or solid at room temperature.
  - **Vaporous**: Consisting of, full of, or resembling vapor.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vapor</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **vapor** manifests across two primary conduits:
> - **Base Nominal Stems `vapor-` and `vapour-`:**
>   - Base noun: *vapor* (American) / *vapour* (British).
>   - Adjective: *vaporous* (misty, unsubstantial).
>   - Causative verb: *vaporize* (convert to vapor).
>   - Process / Device: *vaporization*, *vaporizer*.
>   - Specialty adjective: *vaporific* (vapor-producing).
> - **Prefix Formations on `e-` + `vapor-` (*ēvapōrāre*):**
>   - Verb: *evaporate* (turn from liquid to gas; vanish).
>   - Process: *evaporation*.
>   - Adjective: *evaporative* (evaporative cooling).
>   - Geological mineral: *evaporite* (salt rock).
> - **Modern Idiomatic & Tech Neologisms:**
>   - Idiom: *the vapors* (nervous swooning).
>   - Compound noun: *vaporware* (*vapor* + *software*).

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
> - **Thermodynamics & Physical Chemistry:** Gaseous state of substances below critical temperature, latent heat of vaporization, and phase boundaries (*vapor*, *vaporize*, *vaporization*).
> - **Meteorology & Hydrology:** Atmospheric water loss from oceans, soil moisture drying, and evaporative cooling (*evaporate*, *evaporation*, *evaporative*).
> - **Sedimentary Geology & Mining:** Minerals precipitated from concentrated brines in closed desert basins (halite, gypsum, sylvite) (*evaporite*).
> - **Medical Devices & Inhalation Delivery:** Devices heating liquids into inhalable vapor for respiratory therapy or aromatherapy (*vaporizer*).
> - **Software Industry Satire:** Products announced to freeze market competition but never delivered (*vaporware*).
> - **Historical Psychiatry & Melodrama:** 18th- and 19th-century nervous fainting fits, hysteria, or depression (*the vapors*).

---

## 🔀 4. Prefix & Combining Dynamics on vapor

### Prefix Dynamics
- **`ex-` / `e-` (Out / Away):**
  - $\to$ *evaporate*: To disperse *out* into vapor; vanish completely.

### Suffix Dynamics
- **`-ous` (Resembling / Full of):** *vaporous* $\to$ misty, unsubstantial.
- **`-ize` / `-ization` (Causative Action / Process):** *vaporize*, *vaporization*.
- **`-er` (Instrument / Apparatus):** *vaporizer*.
- **`-ite` (Sedimentary Mineral):** *evaporite* $\to$ rock formed by evaporation.
- **`-ific` (*facere* "to make"):** *vaporific* $\to$ producing vapor.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Chemical Engineering & Petroleum Refining:** Fractional distillation towers utilizing differences in *vapor pressure* to separate crude oil into gasoline, kerosene, and bitumen.
> - **Sedimentary Geology & Salt Tectonics:** Deep borehole logging of subterranean *evaporite* salt beds (e.g. the Messinian salinity crisis in the Mediterranean).
> - **HVAC & Thermal Comfort Engineering:** Designing wet-bulb *evaporative* cooling towers and industrial air humidifiers.
> - **High-Tech Intellectual Property & Tech Journalism:** Tracking venture-capital backed *vaporware* announcements designed to preempt competitor product launches.
> - **Clinical Anesthesiology:** Utilizing calibrated agent-specific *vaporizers* to deliver volatile liquid anesthetics (isoflurane, sevoflurane) in medical oxygen circuits.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[evaporable]] | adjective | **1.** (used of substances) capable of being volatilized. | *"In academic literature, evaporable designates (used of substances) capable of being volatilized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evaporate]] | verb | **1.** Lose or cause to lose liquid by vaporization leaving a more concentrated residue.<br>**2.** Cause to change into a vapor. | *"Carefully I covered my rock cisterns with flat stones so that the sun’s rays might not evaporate the precious fluid and in precaution against some upspringing of wind in the night and the sudden flying of spray."* — Jack London, *The Jacket (The Star-Rover)* |
| [[evaporated]] | verb | **1.** Lose or cause to lose liquid by vaporization leaving a more concentrated residue.<br>**2.** Cause to change into a vapor. | *"All the uses and scents of the brewery might have evaporated with its last reek of smoke."* — Charles Dickens, *Great Expectations* |
| [[evaporation]] | noun | **1.** The process of becoming a vapor.<br>**2.** The process of extracting moisture. | *"They also heated a distilling apparatus, which, by evaporation, furnished excellent drinkable water."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[evaporative]] | adjective | **1.** Relating to or causing or being caused by evaporation. | *"In academic literature, evaporative designates relating to or causing or being caused by evaporation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evaporite]] | noun | **1.** The sediment that is left after the evaporation of seawater. | *"In academic literature, evaporite designates the sediment that is left after the evaporation of seawater."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[evaporometer]] | noun | **1.** An instrument that measures rate of evaporation of water. | *"In academic literature, evaporometer designates an instrument that measures rate of evaporation of water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pervaporate]] | verb | **1.** Evaporate through a semipermeable membrane.<br>**2.** Cause (a liquid) to evaporate through a semipermeable membrane. | *"In academic literature, pervaporate designates evaporate through a semipermeable membrane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pervaporation]] | noun | **1.** The concentration of a colloidal solution whose colloid will not pass through a semipermeable membrane; solution is placed in a bag of the membrane and the solvent is evaporated off. | *"In academic literature, pervaporation designates the concentration of a colloidal solution whose colloid will not pass through a semipermeable membrane; solution is placed in a bag of the membrane and the solvent is evaporated off."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vapor]] | noun | **1.** A visible suspension in the air of particles of some substance.<br>**2.** The process of becoming a vapor. | *"The duties of her married life, contemplated as so great beforehand, seemed to be shrinking with the furniture and the white vapor-walled landscape."* — George Eliot, *Middlemarch* |
| [[vaporific]] | adjective | **1.** (used of substances) capable of being volatilized.<br>**2.** Resembling or characteristic of vapor. | *"In academic literature, vaporific designates (used of substances) capable of being volatilized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaporing]] | noun | **1.** An instance of boastful talk. | *"In academic literature, vaporing designates an instance of boastful talk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaporisation]] | noun | **1.** The process of becoming a vapor.<br>**2.** Annihilation by vaporizing something. | *"In academic literature, vaporisation designates the process of becoming a vapor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaporise]] | verb | **1.** Cause to change into a vapor.<br>**2.** Change into a vapor. | *"If the fuel be petrol it vaporises at the ordinary temperature of the engine and needs no added heat."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[vaporiser]] | noun | **1.** A device that puts out a substance in the form of a vapor (especially for medicinal inhalation). | *"In one, which is exemplified by the ordinary car or bicycle motor, the oil is gasified in a vessel called a carburetter or vaporiser and then led into the cylinder of the engine, together with the necessary air to enable it to burn."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[vaporish]] | adjective | **1.** Resembling or characteristic of vapor. | *"Though he’s deeply impressed with the subject, he approaches it with extreme diffidence, writing to the “all-sagacious” Abib. 82. exhibition: used in its medical sense of administering a remedy. 103. fume: vaporish fancy. 106."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[vaporizable]] | adjective | **1.** (used of substances) capable of being volatilized. | *"In academic literature, vaporizable designates (used of substances) capable of being volatilized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaporization]] | noun | **1.** Annihilation by vaporizing something.<br>**2.** The process of becoming a vapor. | *"In academic literature, vaporization designates annihilation by vaporizing something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaporize]] | verb | **1.** Kill with or as if with a burst of gunfire or electric current or as if by shooting.<br>**2.** Turn into gas. | *"The rain stage of condensation had been reached above, but the descending shower was re-vaporized apparently, and thus arrested."* — W. E. Webb, *Buffalo Land* |
| [[vaporized]] | verb | **1.** Kill with or as if with a burst of gunfire or electric current or as if by shooting.<br>**2.** Turn into gas. | *"The rain stage of condensation had been reached above, but the descending shower was re-vaporized apparently, and thus arrested."* — W. E. Webb, *Buffalo Land* |
| [[vaporizer]] | noun | **1.** A device that puts out a substance in the form of a vapor (especially for medicinal inhalation). | *"In academic literature, vaporizer designates a device that puts out a substance in the form of a vapor (especially for medicinal inhalation)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vaporous]] | adjective | **1.** So thin as to transmit light.<br>**2.** Resembling or characteristic of vapor. | *"The vaporous night approaches."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vaporousness]] | noun | **1.** Cloudiness resulting from haze or mist or vapor. | *"In academic literature, vaporousness designates cloudiness resulting from haze or mist or vapor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vapors]] | noun | **1.** A state of depression.<br>**2.** A visible suspension in the air of particles of some substance. | *"This thing that is meant for sereneness, to send up mild white vapors among mild white hairs, not among torn iron-grey locks like mine."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[vaporware]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vapor within the domain of Nature.<br>**2.** A technical or specialized form exhibiting the properties of vapor in systematic terminology. | *"In academic literature, vaporware designates pertaining to, derived from, or characteristic of latin vapor within the domain of nature."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · VAPOR
  </div>
</div>
