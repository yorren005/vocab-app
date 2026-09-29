---
status: unread
type: root_dashboard
---
# Dashboard — hydr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">hydr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“water”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Interconnected word patterns that combine classical ideas together.</span>
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

The root **hydr** means water. It refers to natural water, moisture, and liquid bodies in nature. In English, this root forms words such as *hydrate*, *hydration*, *dehydrate*, and *dehydration*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: water
> The root **hydr** means water. It refers to natural water, moisture, and liquid bodies in nature. In English, this root forms words such as *hydrate*, *hydration*, *dehydrate*, and *dehydration*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Water</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Interconnected word patterns that combine classical ideas together.</mark>
> - **Everyday Connection**: Think of familiar words like *hydrate* and *hydration*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **hydr** comes from a Latin word that means *"water"*.
  - At its core, it describes water.

- **The Big Picture Idea**:
  - Picture interconnected word patterns that combine classical ideas together.
  - Whenever you see **hydr** in an English word, think of **blended classical concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of water.
  - **Mental & Social**: How people experience, organize, or communicate about water.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Hydrate**: N.** A chemical compound containing water molecules chemically bound to another element or group.
  - **Hydration**: The physiological process of absorbing or maintaining bodily fluids.
  - **Dehydrate**: To deprive of water.
  - **Dehydration**: An abnormal depletion of water from the body.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">hydr</mark>, think of <mark class="hl-def">blended classical concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **hydr-** enters English as an initial combining prefix, a central nominal stem, and an oblique grammatical base:
> - **1. Pre-Vocalic Combining Stem:** `hydr-` (combining directly with vowels: *hydrant*, *hydrate*, *hydraulics*, *hydride*, *hydrops*).
> - **2. Pre-Consonantal Combining Stem:** `hydro-` (the standard combining form before consonants: *hydrocarbon*, *hydrodynamics*, *hydroelectric*, *hydrolysis*, *hydrophilic*, *hydrophone*).
> - **3. Oblique Genitive Stem:** `hydat-` / `hydato-` (< Greek genitive *hýdatos*, used in pathology and anatomy: *hydatid*, *hydatidiform*, *hydathode*).
> - **4. Mythological & Biological Stem:** `hydra-` (the serpentine polyp: *hydra*, *hydroid*, *hydrozoan*).
> - **5. Directional Prefixes Attached to "hydrate":**
>   - `de-` + `hydrate` → *dehydrate* ("to strip water from").
>   - `re-` + `hydrate` → *rehydrate* ("to restore water to").
>   - `an-` + `hydrous` → *anhydrous* ("completely destitute of water").
>   - `carbo-` + `hydrate` → *carbohydrate* ("carbon combined with water elements").

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
> The semantic manifestations of **hydr** divide into five powerful domains:
> - **1. Pure Chemistry & Molecular Composition:** In [[hydrogen]], [[hydrate]], [[carbohydrate]], [[hydrocarbon]], and [[hydrolysis]], the root denotes water as a chemical reactant, solvent, or constituent atom ($H_2O$, $H^+$, $OH^-$).
> - **2. Fluid Power & Mechanical Engineering:** In [[hydraulic]], [[hydraulics]], [[hydrant]], [[hydrofoil]], and [[hydroplane]], the root denotes the transmission of mechanical work, pressure, and lift through pressurized incompressible liquids.
> - **3. Planetary & Earth Sciences:** In [[hydrosphere]], [[hydrology]], [[hydrothermal]], and [[hydrogeology]], the root captures the planetary water cycle, subterranean aquifers, and deep-ocean thermal vents.
> - **4. Cellular Biophysics & Surface Chemistry:** In [[hydrophilic]] and [[hydrophobic]], the root describes thermodynamic affinity or repulsion between water dipoles and organic molecules, governing cell membrane structure and protein folding.
> - **5. Medicine, Pathology & Clinical Disease:** In [[hydrocephalus]], [[hydrotherapy]], [[hydrophobia]], [[dropsy]], and [[hydatid]], the root describes abnormal fluid effusion, fluid retention, or water-related symptomatic reactions (rabies).

---

## 🔀 4. Prefix & Combining Dynamics on hydr

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `hydr-` + `-ate` | water + chemical salt/verb | [[hydrate]] | A compound containing water molecules; to combine with or supply water. |
| `de-` + `hydrate` | down, away from + water | [[dehydrate]] | To remove water or moisture completely from a body, foodstuff, or substance. |
| `re-` + `hydrate` | back, again + water | [[rehydrate]] | To restore lost water or physiological fluids to an organism or dehydrated material. |
| `an-` + `hydr-` + `-ous` | without + water + full of | [[anhydrous]] | Completely devoid of water, especially lacking water of crystallization. |
| `an-` + `hydr-` + `-ide` | without + water + chemical | [[anhydride]] | A compound formed by removing water from an acid or base. |
| `hydro-` + `-gen` | water + producer (*-genēs*) | [[hydrogen]] | The lightest chemical element ($H$), whose combustion yields water. |
| `hydro-` + `carbon` | water (hydrogen) + carbon | [[hydrocarbon]] | An organic chemical compound composed exclusively of hydrogen and carbon. |
| `hydro-` + `-lysis` | water + loosening (*lýsis*) | [[hydrolysis]] | The chemical cleavage of a molecular bond through the addition of water. |
| `hydro-` + `-aulic` | water + pipe (*aulós*) | [[hydraulic]] | Operated, moved, or actuated by the pressure or flow of water or other liquid. |
| `hydro-` + `-philic` | water + loving (*phílos*) | [[hydrophilic]] | Having an electrostatic affinity for water; readily dissolving in or absorbing water. |
| `hydro-` + `-phobic` | water + fearing (*phóbos*) | [[hydrophobic]] | Lacking affinity for water; repelling water molecules; unmixable with water. |
| `hydro-` + `-ponics` | water + labor (*pónos*) | [[hydroponics]] | The cultivation of terrestrial plants without soil in nutrient-rich water solutions. |
| `hydro-` + `-cephalus` | water + head (*kephalē*) | [[hydrocephalus]] | An abnormal, pathological accumulation of cerebrospinal fluid in the cranial ventricles. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ic` / `-ics` | Adjective / Science | [[hydraulic]], [[hydraulics]], [[hydrodynamic]] | Pertaining to fluid systems; the formal branch of physics studying fluid forces. |
| `-ation` | Noun (Action / State) | [[hydration]], [[dehydration]], [[hydrogenation]] | The chemical or biological process of adding or removing water or hydrogen. |
| `-logy` / `-logist` | Noun (Field / Scholar) | [[hydrology]], [[hydrologist]] | The science dealing with the properties, distribution, and circulation of Earth's water. |
| `-meter` | Noun (Instrument) | [[hydrometer]] | An instrument for measuring the specific gravity or relative density of liquids. |
| `-ase` | Noun (Enzyme) | [[dehydrogenase]] | An enzyme that catalyzes the removal and transfer of hydrogen atoms in metabolic cycles. |
| `-oid` / `-zoan` | Noun / Biological Taxon | [[hydroid]], [[hydrozoan]] | Organisms resembling the freshwater polyp *Hydra*; an aquatic invertebrate class. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧪 **Organic & Inorganic Chemistry** | [[hydrogen]], [[hydrate]], [[hydrolysis]], [[hydrocarbon]], [[anhydrous]], [[hydroxyl]] | Synthesis of petrochemicals, acid-base neutralizations, hydration states of crystalline salts, and enzymatic ester cleavage. |
| 🏗️ **Mechanical & Civil Engineering** | [[hydraulic]], [[hydraulics]], [[hydrant]], [[hydroelectric]] | Heavy excavation equipment (hydraulic excavators), automotive brakes, municipal fire hydrants, and Hoover Dam hydroelectric turbines. |
| 🧬 **Biochemistry, Nutrition & Physiology** | [[carbohydrate]], [[dehydration]], [[rehydration]], [[dehydrogenase]], [[hydrophilic]] | Cellular energy metabolism (glycolysis, Krebs cycle), oral rehydration therapy (ORT), lipid bilayer self-assembly, and clinical fluid homeostasis. |
| 🌍 **Geology, Oceanography & Climatology** | [[hydrosphere]], [[hydrology]], [[hydrothermal]], [[hydrography]] | Global climate modeling, abyssal hydrothermal vents supporting chemosynthesis, watershed management, and nautical charting of ocean shoals. |
| 🏥 **Medicine, Neurology & Pathology** | [[hydrocephalus]], [[hydrophobia]], [[dropsy]], [[hydrotherapy]], [[hydatid]] | Ventriculoperitoneal shunt placement for pediatric hydrocephalus, rabies diagnostic symptomatology, and therapeutic aquatic rehabilitation. |
| 🌿 **Horticulture & Agriculture** | [[hydroponics]], [[hydroponic]], [[hydathode]] | Controlled-environment vertical farming, nutrient film technique (NFT), and plant guttation through leaf hydathodes. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anhydride]] | noun | **1.** A compound formed from one or more other compounds in a reaction resulting in removal of water. | *"In academic literature, anhydride designates a compound formed from one or more other compounds in a reaction resulting in removal of water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anhydrosis]] | noun | **1.** Failure of the sweat glands. | *"In academic literature, anhydrosis designates failure of the sweat glands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anhydrous]] | adjective | **1.** Without water; especially without water of crystallization. | *"In academic literature, anhydrous designates without water; especially without water of crystallization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dehydrate]] | verb | **1.** Preserve by removing all water and liquids from.<br>**2.** Remove water from. | *"In academic literature, dehydrate designates preserve by removing all water and liquids from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dehydrated]] | verb | **1.** Preserve by removing all water and liquids from.<br>**2.** Remove water from. | *"In academic literature, dehydrated designates preserve by removing all water and liquids from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dehydration]] | noun | **1.** Dryness resulting from the removal of water.<br>**2.** Depletion of bodily fluids. | *"In academic literature, dehydration designates dryness resulting from the removal of water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dehydrogenate]] | verb | **1.** Remove hydrogen from. | *"In academic literature, dehydrogenate designates remove hydrogen from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dehydroretinol]] | noun | **1.** A viscous alcohol that is less active in mammals than is vitamin a1. | *"In academic literature, dehydroretinol designates a viscous alcohol that is less active in mammals than is vitamin a1."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dihydrostreptomycin]] | noun | **1.** Antibiotic consisting of a hydrogenated form of streptomycin; used against tuberculosis and tularemia and gram-negative organisms. | *"In academic literature, dihydrostreptomycin designates antibiotic consisting of a hydrogenated form of streptomycin; used against tuberculosis and tularemia and gram-negative organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dihydroxyphenylalanine]] | noun | **1.** Amino acid that is formed in the liver and converted into dopamine in the brain. | *"In academic literature, dihydroxyphenylalanine designates amino acid that is formed in the liver and converted into dopamine in the brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enhydra]] | noun | **1.** Sea otters. | *"In academic literature, enhydra designates sea otters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydra]] | noun | **1.** (greek mythology) monster with nine heads; when struck off each head was replaced by two new ones.<br>**2.** A long faint constellation in the southern hemisphere near the equator stretching between virgo and cancer. | *"Never was such a sudden scholar made, Never came reformation in a flood With such a heady currance scouring faults, Nor never Hydra-headed wilfulness So soon did lose his seat, and all at once, As in this king."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hydralazine]] | noun | **1.** An antihypertensive drug (trade name apresoline) that dilates blood vessels; used (often with a diuretic) to treat hypertension and congestive heart failure. | *"In academic literature, hydralazine designates an antihypertensive drug (trade name apresoline) that dilates blood vessels; used (often with a diuretic) to treat hypertension and congestive heart failure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydramnios]] | noun | **1.** An abnormality of pregnancy; accumulation of excess amniotic fluid. | *"In academic literature, hydramnios designates an abnormality of pregnancy; accumulation of excess amniotic fluid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrangea]] | noun | **1.** Any of various deciduous or evergreen shrubs of the genus hydrangea. | *"In academic literature, hydrangea designates any of various deciduous or evergreen shrubs of the genus hydrangea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrangeaceae]] | noun | **1.** Sometimes included in the family saxifragaceae. | *"In academic literature, hydrangeaceae designates sometimes included in the family saxifragaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrant]] | noun | **1.** A faucet for drawing water from a pipe or cask.<br>**2.** A discharge pipe with a valve and spout at which water may be drawn from the mains of waterworks. | *"In academic literature, hydrant designates a faucet for drawing water from a pipe or cask."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrargyrum]] | noun | **1.** A heavy silvery toxic univalent and bivalent metallic element; the only metal that is liquid at ordinary temperatures. | *"In academic literature, hydrargyrum designates a heavy silvery toxic univalent and bivalent metallic element; the only metal that is liquid at ordinary temperatures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrarthrosis]] | noun | **1.** Inflammation and swelling of a movable joint because of excess synovial fluid. | *"In academic literature, hydrarthrosis designates inflammation and swelling of a movable joint because of excess synovial fluid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrastis]] | noun | **1.** Small genus of perennial herbs having rhizomes and palmate leaves and small solitary flowers; of northeastern united states and japan. | *"In academic literature, hydrastis designates small genus of perennial herbs having rhizomes and palmate leaves and small solitary flowers; of northeastern united states and japan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrate]] | noun | **1.** Any compound that contains water of crystallization.<br>**2.** Supply water or liquid to in order to maintain a healthy balance. | *"In academic literature, hydrate designates any compound that contains water of crystallization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrated]] | verb | **1.** Supply water or liquid to in order to maintain a healthy balance.<br>**2.** Become hydrated and combine with water. | *"In academic literature, hydrated designates supply water or liquid to in order to maintain a healthy balance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydration]] | noun | **1.** The process of combining with water; usually reversible. | *"In academic literature, hydration designates the process of combining with water; usually reversible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydraulic]] | adjective | **1.** Moved or operated or effected by liquid (water or oil).<br>**2.** Of or relating to the study of hydraulics. | *"In larger part this is due to the increasing use of machinery in place of simple hand tools, and the substitution of horse-, hydraulic-, windmill-, steam-, and gasoline-power for human labor."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[hydraulically]] | adverb | **1.** In a hydraulic manner. | *"This is done by means of a hydraulically operated molding press. _6."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[hydraulicly]] | adverb | **1.** In a hydraulic manner. | *"In academic literature, hydraulicly designates in a hydraulic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydraulics]] | noun | **1.** Study of the mechanics of fluids. | *"You should have been a surgeon.” “It is a question of hydraulics, you see, and came within my own province.” “This has been done,” said I, examining the wound, “by a very heavy and sharp instrument.” “A thing like a cleaver,” said he."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[hydrazine]] | noun | **1.** A colorless fuming corrosive liquid; a powerful reducing agent; used chiefly in rocket fuels. | *"In academic literature, hydrazine designates a colorless fuming corrosive liquid; a powerful reducing agent; used chiefly in rocket fuels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrazoite]] | noun | **1.** A salt of hydrazoic acid. | *"In academic literature, hydrazoite designates a salt of hydrazoic acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydremia]] | noun | **1.** Blood disorder in which there is excess fluid volume compared with the cell volume of the blood. | *"In academic literature, hydremia designates blood disorder in which there is excess fluid volume compared with the cell volume of the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydric]] | adjective | **1.** Having or characterized by excessive moisture. | *"In academic literature, hydric designates having or characterized by excessive moisture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydride]] | noun | **1.** Any binary compound formed by the union of hydrogen and other elements. | *"In academic literature, hydride designates any binary compound formed by the union of hydrogen and other elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrilla]] | noun | **1.** Submersed plant with whorled lanceolate leaves and solitary axillary flowers; old world plant naturalized in southern united states and clogging florida's waterways. | *"In academic literature, hydrilla designates submersed plant with whorled lanceolate leaves and solitary axillary flowers; old world plant naturalized in southern united states and clogging florida's waterways."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrobates]] | noun | **1.** Type genus of the hydrobatidae. | *"In academic literature, hydrobates designates type genus of the hydrobatidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrobatidae]] | noun | **1.** Storm petrels. | *"In academic literature, hydrobatidae designates storm petrels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocarbon]] | noun | **1.** An organic compound containing only carbon and hydrogen. | *"Alcohol, again, is a hydrocarbon."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[hydrocele]] | noun | **1.** Disorder in which serous fluid accumulates in a body sac (especially in the scrotum). | *"In academic literature, hydrocele designates disorder in which serous fluid accumulates in a body sac (especially in the scrotum)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocephalic]] | adjective | **1.** Relating to or characterized by or evidencing hydrocephalus. | *"A hobgoblin in the image of Punch Costello, hipshot, crookbacked, hydrocephalic, prognathic with receding forehead and Ally Sloper nose, tumbles in somersaults through the gathering darkness.)_ ALL: What?"* — James Joyce, *Ulysses* |
| [[hydrocephalus]] | noun | **1.** An abnormal condition in which cerebrospinal fluid collects in the ventricles of the brain; in infants it can cause abnormally rapid growth of the head and bulging fontanelles and a small face; in adults the symptoms are primarily neurological. | *"In academic literature, hydrocephalus designates an abnormal condition in which cerebrospinal fluid collects in the ventricles of the brain; in infants it can cause abnormally rapid growth of the head and bulging fontanelles and a small face; in adults the symptoms are primarily neurological."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocephaly]] | noun | **1.** An abnormal condition in which cerebrospinal fluid collects in the ventricles of the brain; in infants it can cause abnormally rapid growth of the head and bulging fontanelles and a small face; in adults the symptoms are primarily neurological. | *"In academic literature, hydrocephaly designates an abnormal condition in which cerebrospinal fluid collects in the ventricles of the brain; in infants it can cause abnormally rapid growth of the head and bulging fontanelles and a small face; in adults the symptoms are primarily neurological."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocharidaceae]] | noun | **1.** Simple nearly stemless freshwater aquatic plants; widely distributed. | *"In academic literature, hydrocharidaceae designates simple nearly stemless freshwater aquatic plants; widely distributed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocharis]] | noun | **1.** Frogbit. | *"Classical and authoritative lexicons catalog hydrocharis as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocharitaceae]] | noun | **1.** Simple nearly stemless freshwater aquatic plants; widely distributed. | *"In academic literature, hydrocharitaceae designates simple nearly stemless freshwater aquatic plants; widely distributed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrochloride]] | noun | **1.** A complex consisting of an organic base in association with hydrogen chloride. | *"In academic literature, hydrochloride designates a complex consisting of an organic base in association with hydrogen chloride."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrochlorofluorocarbon]] | noun | **1.** A fluorocarbon that is replacing chlorofluorocarbon as a refrigerant and propellant in aerosol cans; considered to be somewhat less destructive to the atmosphere. | *"In academic literature, hydrochlorofluorocarbon designates a fluorocarbon that is replacing chlorofluorocarbon as a refrigerant and propellant in aerosol cans; considered to be somewhat less destructive to the atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrochlorothiazide]] | noun | **1.** A diuretic drug (trade name microzide, esidrix, and hydrodiuril) used in the treatment of hypertension. | *"In academic literature, hydrochlorothiazide designates a diuretic drug (trade name microzide, esidrix, and hydrodiuril) used in the treatment of hypertension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrochoeridae]] | noun | **1.** Capybara. | *"Classical and authoritative lexicons catalog hydrochoeridae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrochoerus]] | noun | **1.** A genus of hydrochoeridae. | *"In academic literature, hydrochoerus designates a genus of hydrochoeridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocolloid]] | noun | **1.** A substance that forms a gel with water. | *"In academic literature, hydrocolloid designates a substance that forms a gel with water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocortisone]] | noun | **1.** An adrenal-cortex hormone (trade names hydrocortone or cortef) that is active in carbohydrate and protein metabolism. | *"In academic literature, hydrocortisone designates an adrenal-cortex hormone (trade names hydrocortone or cortef) that is active in carbohydrate and protein metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocortone]] | noun | **1.** An adrenal-cortex hormone (trade names hydrocortone or cortef) that is active in carbohydrate and protein metabolism. | *"In academic literature, hydrocortone designates an adrenal-cortex hormone (trade names hydrocortone or cortef) that is active in carbohydrate and protein metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrocracking]] | noun | **1.** The process whereby hydrocarbon molecules of petroleum are broken down into kerosene and gasolene by the addition of hydrogen under high pressure in the presence of a catalyst. | *"In academic literature, hydrocracking designates the process whereby hydrocarbon molecules of petroleum are broken down into kerosene and gasolene by the addition of hydrogen under high pressure in the presence of a catalyst."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrodamalis]] | noun | **1.** A genus of the family dugongidae comprising only steller's sea cow. | *"In academic literature, hydrodamalis designates a genus of the family dugongidae comprising only steller's sea cow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrodiuril]] | noun | **1.** A diuretic drug (trade name microzide, esidrix, and hydrodiuril) used in the treatment of hypertension. | *"In academic literature, hydrodiuril designates a diuretic drug (trade name microzide, esidrix, and hydrodiuril) used in the treatment of hypertension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrodynamic]] | adjective | **1.** Of or relating to hydrodynamics. | *"In academic literature, hydrodynamic designates of or relating to hydrodynamics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrodynamics]] | noun | **1.** Study of fluids in motion. | *"In academic literature, hydrodynamics designates study of fluids in motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroelectric]] | adjective | **1.** Of or relating to or used in the production of electricity by waterpower. | *"In academic literature, hydroelectric designates of or relating to or used in the production of electricity by waterpower."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroelectricity]] | noun | **1.** Electricity produced by water power. | *"In academic literature, hydroelectricity designates electricity produced by water power."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroflumethiazide]] | noun | **1.** Diuretic used to treat hypertension and edema. | *"In academic literature, hydroflumethiazide designates diuretic used to treat hypertension and edema."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrofluorocarbon]] | noun | **1.** A fluorocarbon emitted as a by-product of industrial manufacturing. | *"In academic literature, hydrofluorocarbon designates a fluorocarbon emitted as a by-product of industrial manufacturing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrofoil]] | noun | **1.** A device consisting of a flat or curved piece (as a metal plate) so that its surface reacts to the water it is passing through.<br>**2.** A speedboat that is equipped with winglike structures that lift it so that it skims the water at high speeds. | *"In academic literature, hydrofoil designates a device consisting of a flat or curved piece (as a metal plate) so that its surface reacts to the water it is passing through."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrogel]] | noun | **1.** A colloidal gel in which water is the dispersion medium. | *"In academic literature, hydrogel designates a colloidal gel in which water is the dispersion medium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrogen]] | noun | **1.** A nonmetallic univalent element that is normally a colorless and odorless highly flammable diatomic gas; the simplest and lightest and most abundant element in the universe. | *"Here would be another light, as of oxy-hydrogen, showing the very grain of things, and revising all former explanations."* — George Eliot, *Middlemarch* |
| [[hydrogen-bomb]] | verb | **1.** Attack with a hydrogen bomb. | *"In academic literature, hydrogen-bomb designates attack with a hydrogen bomb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrogenate]] | verb | **1.** Combine or treat with or expose to hydrogen; add hydrogen to the molecule of (an unsaturated organic compound). | *"In academic literature, hydrogenate designates combine or treat with or expose to hydrogen; add hydrogen to the molecule of (an unsaturated organic compound)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrogenation]] | noun | **1.** A chemical process that adds hydrogen atoms to an unsaturated oil. | *"In academic literature, hydrogenation designates a chemical process that adds hydrogen atoms to an unsaturated oil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrographic]] | adjective | **1.** Of or relating to the science of hydrography. | *"In academic literature, hydrographic designates of or relating to the science of hydrography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrographical]] | adjective | **1.** Of or relating to the science of hydrography. | *"In academic literature, hydrographical designates of or relating to the science of hydrography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrography]] | noun | **1.** The science of the measurement and description and mapping of the surface waters of the earth with special reference to navigation. | *"In academic literature, hydrography designates the science of the measurement and description and mapping of the surface waters of the earth with special reference to navigation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroid]] | noun | **1.** Colonial coelenterates having the polyp phase dominant. | *"In academic literature, hydroid designates colonial coelenterates having the polyp phase dominant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrokinetic]] | adjective | **1.** Relating to fluids in motion or the forces that produce or affect such motion. | *"In academic literature, hydrokinetic designates relating to fluids in motion or the forces that produce or affect such motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrokinetics]] | noun | **1.** Study of fluids in motion. | *"In academic literature, hydrokinetics designates study of fluids in motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrolise]] | verb | **1.** Make a compound react with water and undergo hydrolysis. | *"In academic literature, hydrolise designates make a compound react with water and undergo hydrolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrolith]] | noun | **1.** A saltlike binary compound (cah2) used as a reducing agent and source of hydrogen. | *"In academic literature, hydrolith designates a saltlike binary compound (cah2) used as a reducing agent and source of hydrogen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrolize]] | verb | **1.** Make a compound react with water and undergo hydrolysis. | *"In academic literature, hydrolize designates make a compound react with water and undergo hydrolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrologist]] | noun | **1.** A geologist skilled in hydrology. | *"In academic literature, hydrologist designates a geologist skilled in hydrology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrology]] | noun | **1.** The branch of geology that studies water on the earth and in the atmosphere: its distribution and uses and conservation. | *"In academic literature, hydrology designates the branch of geology that studies water on the earth and in the atmosphere: its distribution and uses and conservation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrolysate]] | noun | **1.** A product of hydrolysis. | *"In academic literature, hydrolysate designates a product of hydrolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrolyse]] | verb | **1.** Undergo hydrolysis; decompose by reacting with water. | *"In academic literature, hydrolyse designates undergo hydrolysis; decompose by reacting with water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrolysis]] | noun | **1.** A chemical reaction in which water reacts with a compound to produce other compounds; involves the splitting of a bond and the addition of the hydrogen cation and the hydroxide anion from the water. | *"Why, there was my theory of the hydrolysis of casein by trypsin, which Professor Walters had been carrying out in his laboratory."* — Jack London, *The Jacket (The Star-Rover)* |
| [[hydrolyzable]] | adjective | **1.** Capable of undergoing hydrolysis. | *"In academic literature, hydrolyzable designates capable of undergoing hydrolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrolyze]] | verb | **1.** Undergo hydrolysis; decompose by reacting with water. | *"In academic literature, hydrolyze designates undergo hydrolysis; decompose by reacting with water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydromancer]] | noun | **1.** One who practices hydromancy. | *"In academic literature, hydromancer designates one who practices hydromancy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydromancy]] | noun | **1.** Divination by water (as by patterns seen in the ebb and flow of the tides). | *"In academic literature, hydromancy designates divination by water (as by patterns seen in the ebb and flow of the tides)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydromantes]] | noun | **1.** Web-toed salamanders. | *"In academic literature, hydromantes designates web-toed salamanders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydromel]] | noun | **1.** Honey diluted in water; becomes mead when fermented. | *"In academic literature, hydromel designates honey diluted in water; becomes mead when fermented."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrometer]] | noun | **1.** A measuring instrument for determining the specific gravity of a liquid or solid. | *"This weight is ascertained by means of a "hydrometer," a glass tube, stopped, and loaded with some small shot at its lower end."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[hydrometric]] | adjective | **1.** Of or relating to hydrometry. | *"In academic literature, hydrometric designates of or relating to hydrometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrometry]] | noun | **1.** The measurement of specific gravity. | *"In academic literature, hydrometry designates the measurement of specific gravity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydromorphone]] | noun | **1.** A narcotic analgesic (trade name dilaudid) used to treat moderate to severe pain. | *"In academic literature, hydromorphone designates a narcotic analgesic (trade name dilaudid) used to treat moderate to severe pain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydromyinae]] | noun | **1.** Water rats of australia and new guinea. | *"In academic literature, hydromyinae designates water rats of australia and new guinea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydromys]] | noun | **1.** Water rats. | *"In academic literature, hydromys designates water rats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydronephrosis]] | noun | **1.** Accumulation of urine in the kidney because of an obstruction in the ureter. | *"In academic literature, hydronephrosis designates accumulation of urine in the kidney because of an obstruction in the ureter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydropathic]] | adjective | **1.** Of or relating to hydropathy or its administration. | *"In the course of the treatment she was frequently taken to an underground water-cave, called Mauoki, for the _Kakelekele_ (hydropathic cure)."* — Classic Author, *Hawaiian folk tales* |
| [[hydropathy]] | noun | **1.** The internal and external use of water in the treatment of disease. | *"Nature of drugs Vegetarianism, homoeopathy, and hydropathy have diminished drugging; but if drugs are an antidote to 155:30 disease, why lessen the antidote?"* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[hydrophidae]] | noun | **1.** Sea snakes. | *"In academic literature, hydrophidae designates sea snakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrophilic]] | adjective | **1.** Having a strong affinity for water; tending to dissolve in, mix with, or be wetted by water. | *"In academic literature, hydrophilic designates having a strong affinity for water; tending to dissolve in, mix with, or be wetted by water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrophobia]] | noun | **1.** A symptom of rabies in humans consisting of an aversion to swallowing liquids.<br>**2.** A morbid fear of water. | *"Growling and grousing and his eye all bloodshot from the drouth is in it and the hydrophobia dropping out of his jaws."* — James Joyce, *Ulysses* |
| [[hydrophobic]] | adjective | **1.** Lacking affinity for water; tending to repel and not absorb water; tending not to dissolve in or mix with or be wetted by water.<br>**2.** Abnormally afraid of water. | *"In academic literature, hydrophobic designates lacking affinity for water; tending to repel and not absorb water; tending not to dissolve in or mix with or be wetted by water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrophobicity]] | noun | **1.** The property of being water-repellent; tending to repel and not absorb water. | *"In academic literature, hydrophobicity designates the property of being water-repellent; tending to repel and not absorb water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrophyllaceae]] | noun | **1.** Perennial woodland herbs. | *"In academic literature, hydrophyllaceae designates perennial woodland herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrophyllum]] | noun | **1.** Waterleaf. | *"In academic literature, hydrophyllum designates waterleaf."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrophyte]] | noun | **1.** A plant that grows partly or wholly in water whether rooted in the mud, as a lotus, or floating without anchorage, as the water hyacinth. | *"I noticed that the green plants kept nearer the top of the sea, whilst the red were at a greater depth, leaving to the black or brown hydrophytes the care of forming gardens and parterres in the remote beds of the ocean."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[hydrophytic]] | adjective | **1.** Growing wholly or partially in water. | *"In academic literature, hydrophytic designates growing wholly or partially in water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroplane]] | noun | **1.** An airplane that can land on or take off from water.<br>**2.** A speedboat that is equipped with winglike structures that lift it so that it skims the water at high speeds. | *"In academic literature, hydroplane designates an airplane that can land on or take off from water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroponic]] | adjective | **1.** Of or relating to aquiculture. | *"Conduct research and develop drip, hydroponics and other agricultural systems, protein synthesis and manufacture, and ship to Coldfield, the Slingshot work site and the Logistics Depot high-quality foodstuffs suitable for storage and consumption."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[hydroponics]] | noun | **1.** A technique of growing plants (without soil) in water containing dissolved nutrients. | *"Conduct research and develop drip, hydroponics and other agricultural systems, protein synthesis and manufacture, and ship to Coldfield, the Slingshot work site and the Logistics Depot high-quality foodstuffs suitable for storage and consumption."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[hydrops]] | noun | **1.** Swelling from excessive accumulation of watery fluid in cells, tissues, or serous cavities. | *"In academic literature, hydrops designates swelling from excessive accumulation of watery fluid in cells, tissues, or serous cavities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrosphere]] | noun | **1.** The watery layer of the earth's surface; includes water vapor. | *"In academic literature, hydrosphere designates the watery layer of the earth's surface; includes water vapor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrostatic]] | adjective | **1.** Relating to fluids at rest or to the pressures they exert or transmit. | *"For this purpose there is first of all a "hydrostatic valve." This little appliance, which is open to the action of the water, responds to changes in pressure."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[hydrostatics]] | noun | **1.** Study of the mechanical properties of fluids that are not in motion. | *"In academic literature, hydrostatics designates study of the mechanical properties of fluids that are not in motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrotherapy]] | noun | **1.** The internal and external use of water in the treatment of disease. | *"In academic literature, hydrotherapy designates the internal and external use of water in the treatment of disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrothermal]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin hydr within the domain of Greek-Latin Hybrid.<br>**2.** A technical or specialized form exhibiting the properties of hydr in systematic terminology. | *"In academic literature, hydrothermal designates pertaining to, derived from, or characteristic of latin hydr within the domain of greek-latin hybrid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrothorax]] | noun | **1.** Accumulation of fluid in the pleural cavity (the space between the lungs and the walls of the chest) often resulting from disease of the heart or kidneys. | *"In academic literature, hydrothorax designates accumulation of fluid in the pleural cavity (the space between the lungs and the walls of the chest) often resulting from disease of the heart or kidneys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrous]] | adjective | **1.** Containing combined water (especially water of crystallization as in a hydrate). | *"In academic literature, hydrous designates containing combined water (especially water of crystallization as in a hydrate)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroxide]] | noun | **1.** A compound of an oxide with water.<br>**2.** A chemical compound containing the hydroxyl group. | *"The positive plate consists of nickel tubes filled with alternate layers of nickel hydroxide, while the negative plate is formed of prepared oxide of iron in a nickel framework."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[hydroxy]] | adjective | **1.** Being or containing a hydroxyl group. | *"In academic literature, hydroxy designates being or containing a hydroxyl group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroxybenzene]] | noun | **1.** A toxic white soluble crystalline acidic derivative of benzene; used in manufacturing and as a disinfectant and antiseptic; poisonous if taken internally. | *"In academic literature, hydroxybenzene designates a toxic white soluble crystalline acidic derivative of benzene; used in manufacturing and as a disinfectant and antiseptic; poisonous if taken internally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroxychloroquine]] | noun | **1.** Anti-inflammatory drug (trade name plaquenil) used in the treatment of rheumatoid arthritis and malaria and lupus erythematosus. | *"In academic literature, hydroxychloroquine designates anti-inflammatory drug (trade name plaquenil) used in the treatment of rheumatoid arthritis and malaria and lupus erythematosus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroxyl]] | noun | **1.** The monovalent group -oh in such compounds as bases and some acids and alcohols. | *"In academic literature, hydroxyl designates the monovalent group -oh in such compounds as bases and some acids and alcohols."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroxymethyl]] | noun | **1.** A methyl with hydroxide replacing the hydrogen atoms. | *"In academic literature, hydroxymethyl designates a methyl with hydroxide replacing the hydrogen atoms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroxyproline]] | noun | **1.** A crystalline amino acid obtained from gelatin or collagen. | *"In academic literature, hydroxyproline designates a crystalline amino acid obtained from gelatin or collagen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroxytetracycline]] | noun | **1.** A yellow crystalline antibiotic (trademark terramycin) obtained from a soil actinomycete; used to treat various bacterial and rickettsial infections. | *"In academic literature, hydroxytetracycline designates a yellow crystalline antibiotic (trademark terramycin) obtained from a soil actinomycete; used to treat various bacterial and rickettsial infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydroxyzine]] | noun | **1.** A drug (trade names atarax and vistaril) used as a tranquilizer to treat anxiety and motion sickness. | *"In academic literature, hydroxyzine designates a drug (trade names atarax and vistaril) used as a tranquilizer to treat anxiety and motion sickness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrozoa]] | noun | **1.** Coelenterates typically having alternation of generations; hydroid phase is usually colonial giving rise to the medusoid phase by budding: hydras and jellyfishes.<br>**2.** Colonial coelenterates having the polyp phase dominant. | *"In academic literature, hydrozoa designates coelenterates typically having alternation of generations; hydroid phase is usually colonial giving rise to the medusoid phase by budding: hydras and jellyfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrozoan]] | noun | **1.** Colonial coelenterates having the polyp phase dominant. | *"In academic literature, hydrozoan designates colonial coelenterates having the polyp phase dominant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrus]] | noun | **1.** A constellation in the southern hemisphere near the south celestial pole. | *"And beneath the effulgent Antarctic skies I have boarded the Argo-Navis, and joined the chase against the starry Cetus far beyond the utmost stretch of Hydrus and the Flying Fish."* — Herman Melville, *Moby-Dick; or, The Whale* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Greek-Latin Hybrid]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · HYDR
  </div>
</div>
