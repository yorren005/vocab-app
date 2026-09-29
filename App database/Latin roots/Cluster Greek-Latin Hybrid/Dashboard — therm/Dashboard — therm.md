---
status: unread
type: root_dashboard
---
# Dashboard — therm
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">therm-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“heat or warmth”</span>
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

The root **therm** means heat or warmth. It refers to heat, warm temperature, or thermal energy. In English, this root forms words such as *thermal*, *thermally*, *thermae*, and *thermopylae*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: heat or warmth
> The root **therm** means heat or warmth. It refers to heat, warm temperature, or thermal energy. In English, this root forms words such as *thermal*, *thermally*, *thermae*, and *thermopylae*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Heat or warmth</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Interconnected word patterns that combine classical ideas together.</mark>
> - **Everyday Connection**: Think of familiar words like *thermal* and *thermally*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **therm** comes from a Latin word that means *"heat or warmth"*.
  - At its core, it describes heat or warmth.

- **The Big Picture Idea**:
  - Picture interconnected word patterns that combine classical ideas together.
  - Whenever you see **therm** in an English word, think of **blended classical concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of heat or warmth.
  - **Mental & Social**: How people experience, organize, or communicate about heat or warmth.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Thermal**: Adj.** 1. Relating to or caused by heat.
  - **Thermally**: With regard to heat or temperature.
  - **Thermae**: Ancient Roman public bathing establishments featuring hot, warm, and cold pools.
  - **Thermopylae**: A narrow coastal pass in east-central Greece, famous as the site of the heroic 480 BC battle between Spartans and Persians.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">therm</mark>, think of <mark class="hl-def">blended classical concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **therm** enters English as an independent physical unit (`therm`), an initial combining form (`thermo-`), and a terminal combining suffix (`-therm`, `-thermy`, `-thermal`):
> - **1. Independent Noun & Metric Unit:** `therm` (a unit of heat quantity equal to 100,000 British thermal units).
> - **2. Initial Combining Form:** `thermo-` (before consonants) / `therm-` (before vowels):
>   - `thermo-` + `-dynamics` (< *dýnamis* "power") → *thermodynamics*
>   - `thermo-` + `-meter` (< *métron* "measure") → *thermometer*
>   - `thermo-` + `-stat` (< *statós* "standing/fixed") → *thermostat*
>   - `thermo-` + `-nuclear` (< Lat. *nucleus*) → *thermonuclear*
>   - `thermo-` + `-lysis` (< *lýsis* "dissolution") → *thermolysis*
>   - `thermo-` + `-philic` (< *phílos* "loving") → *thermophilic*
> - **3. Prefixes Modifying the Thermal Base:**
>   - `hypo-` (under, deficient) + `therm-` + `-ia` → *hypothermia* (critically low body heat).
>   - `hyper-` (over, excessive) + `therm-` + `-ia` → *hyperthermia* (dangerously elevated body heat).
>   - `endo-` (inside) + `therm-` + `-ic` → *endothermic* (absorbing heat).
>   - `exo-` (outside) + `therm-` + `-ic` → *exothermic* (radiating/releasing heat).
>   - `iso-` (equal) + `therm-` + `-al` → *isothermal* (operating at constant temperature).
>   - `dia-` (through) + `therm-` + `-y` → *diathermy* (therapeutic deep heating of tissues).
> - **4. Terminal Combining Elements:**
>   - `-therm` (organism type: *homeotherm*, *poikilotherm*, *ectotherm*, *endotherm*).
>   - `-thermy` (physiological condition: *homeothermy*, *poikilothermy*).
>   - `-thermal` (geological condition: *hydrothermal*, *geothermal*).

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
> The semantic manifestations of **therm** expand into six core conceptual branches:
> - **1. Fundamental Energy & Classical Physics:** In [[thermodynamics]], [[thermal]], [[therm]], and [[isothermal]], the root designates kinetic molecular motion, heat transfer mechanisms (conduction, convection, radiation), and the entropy of closed systems.
> - **2. Precision Metrology & Industrial Control:** In [[thermometer]], [[thermostat]], [[thermocouple]], and [[thermistor]], the root tracks instruments that quantify temperature fluctuations and automate environmental climate systems.
> - **3. High-Energy Chemistry & Nuclear Physics:** In [[thermonuclear]], [[thermite]], [[thermolysis]], and [[thermoluminescence]], the root describes nuclear fusion at stellar temperatures ($10^7\text{ K}$) and intense pyrotechnic redox reactions.
> - **4. Material Science & Polymer Chemistry:** In [[thermoplastic]] and [[thermoset]], the root distinguishes polymers that melt and reshape under heat from those that permanently cross-link into rigid matrices.
> - **5. Animal Physiology & Medical Pathology:** In [[thermoregulation]], [[hypothermia]], [[hyperthermia]], [[homeotherm]], and [[poikilotherm]], the root governs core body temperature homeostasis, heatstroke, and evolutionary metabolic strategies.
> - **6. Earth Systems & Abyssal Geology:** In [[geothermal]] and [[hydrothermal]], the root captures terrestrial magma reservoirs, geysers, and black-smoker submarine hydrothermal vents.

---

## 🔀 4. Prefix & Combining Dynamics on therm

### Compounding Bases & Morphological Shifts

| Combining Form / Affix | Affix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `endo-` + `-thermic` | inside (*éndon*) + heat | [[endothermic]] | Accompanied by or requiring the absorption of heat energy ($+\Delta H$). |
| `exo-` + `-thermic` | outside (*éxō*) + heat | [[exothermic]] | Accompanied by the release or evolution of heat energy ($-\Delta H$). |
| `iso-` + `-thermal` | equal (*ísos*) + heat | [[isothermal]] | Occurring at a constant, unvarying temperature; a line of equal temperature. |
| `hypo-` + `therm-` + `-ia` | under (*hypó*) + heat + state | [[hypothermia]] | The clinical condition of having an abnormally, dangerously low body temperature. |
| `hyper-` + `therm-` + `-ia` | over (*hypér*) + heat + state | [[hyperthermia]] | The condition of having an abnormally high body temperature; acute heatstroke. |
| `homeo-` + `-therm` | similar (*hómoios*) + heat | [[homeotherm]] | An organism that maintains its body temperature at a constant level (warm-blooded). |
| `poikilo-` + `-therm` | varied (*poikílos*) + heat | [[poikilotherm]] | An organism whose body temperature varies with that of its environment (cold-blooded). |
| `geo-` + `-thermal` | earth (*gē*) + heat | [[geothermal]] | Relating to or produced by the internal heat of the Earth's crust and magma. |
| `hydro-` + `-thermal` | water (*hýdōr*) + heat | [[hydrothermal]] | Relating to the action of heated subterranean water or deep-sea vents. |
| `dia-` + `-thermy` | through (*diá*) + heat | [[diathermy]] | The medical generation of therapeutic heat in deep body tissues using electric currents. |
| `thermo-` + `-nuclear` | heat + atomic nucleus | [[thermonuclear]] | Relating to nuclear fusion reactions occurring at extraordinarily high temperatures. |
| `thermo-` + `-phile` | heat + loving (*phílos*) | [[thermophile]] | A bacterium or microorganism that thrives at abnormally elevated temperatures ($>45^\circ\text{C}$). |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective / Noun | [[thermal]] | Pertaining to heat; an ascending current of warm buoyant air. |
| `-meter` / `-metry` | Noun (Gauge / Measure) | [[thermometer]], [[thermometry]] | An instrument for measuring temperature; the science of temperature measurement. |
| `-stat` | Noun (Regulator) | [[thermostat]] | A device that automatically regulates temperature to maintain a desired set point. |
| `-lysis` | Noun (Cleavage) | [[thermolysis]] | The chemical decomposition of organic or inorganic compounds by heating. |
| `-regulation` | Noun (Homeostasis) | [[thermoregulation]] | The physiological biological process that allows an animal to maintain its core temp. |
| `-plastic` | Adjective / Noun | [[thermoplastic]] | Becoming soft and pliable when heated and rigid when cooled without chemical change. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚙️ **Mechanical Engineering & Physics** | [[thermodynamics]], [[thermal]], [[thermostat]], [[isothermal]] | Carnot heat engine efficiency, Rankine steam cycles, refrigeration compressors, and Stirling engines. |
| 🌡️ **Meteorology & Climatology** | [[isotherm]], [[thermal]], [[geothermal]], [[hydrothermal]] | Synoptic weather map temperature contours, atmospheric soaring thermals, and volcanic thermal plumes. |
| 🧬 **Biochemistry, Microbiology & Genetics** | [[thermophile]], [[thermophilic]], [[thermoregulation]] | *Thermus aquaticus* supplying heat-stable Taq polymerase for DNA PCR amplification. |
| 🏥 **Medicine, Critical Care & Surgery** | [[hypothermia]], [[hyperthermia]], [[thermometer]], [[diathermy]] | Therapeutic hypothermia following cardiac arrest resuscitation, surgical electrosurgical diathermy, and digital tympanic thermometry. |
| ⚛️ **Nuclear Physics & Energy Systems** | [[thermonuclear]], [[geothermal]], [[thermoelectric]] | Tokamak magnetic confinement fusion reactors, hydrogen bombs, and Icelandic geothermal district heating. |
| 🏭 **Materials Science & Chemical Engineering** | [[thermoplastic]], [[thermoset]], [[thermite]], [[thermocouple]] | Injection molding of polyethylene pellets, railroad rail welding via thermite powder, and kiln pyrometry. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[endothermal]] | adjective | **1.** (of a chemical reaction or compound) occurring or formed with absorption of heat. | *"In academic literature, endothermal designates (of a chemical reaction or compound) occurring or formed with absorption of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endothermic]] | adjective | **1.** (of a chemical reaction or compound) occurring or formed with absorption of heat. | *"In academic literature, endothermic designates (of a chemical reaction or compound) occurring or formed with absorption of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exotherm]] | noun | **1.** A compound that gives off heat during its formation and absorbs heat during its decomposition. | *"In academic literature, exotherm designates a compound that gives off heat during its formation and absorbs heat during its decomposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exothermal]] | adjective | **1.** (of a chemical reaction or compound) occurring or formed with the liberation of heat. | *"In academic literature, exothermal designates (of a chemical reaction or compound) occurring or formed with the liberation of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exothermic]] | adjective | **1.** (of a chemical reaction or compound) occurring or formed with the liberation of heat. | *"In academic literature, exothermic designates (of a chemical reaction or compound) occurring or formed with the liberation of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geothermal]] | adjective | **1.** Of or relating to the heat in the interior of the earth. | *"In academic literature, geothermal designates of or relating to the heat in the interior of the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geothermally]] | adverb | **1.** By means of heat from the interior of the earth. | *"In academic literature, geothermally designates by means of heat from the interior of the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geothermic]] | adjective | **1.** Of or relating to the heat in the interior of the earth. | *"In academic literature, geothermic designates of or relating to the heat in the interior of the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperthermal]] | adjective | **1.** Of or relating to or affected by hyperthermia. | *"In academic literature, hyperthermal designates of or relating to or affected by hyperthermia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypothermia]] | noun | **1.** Subnormal body temperature. | *"In academic literature, hypothermia designates subnormal body temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypothermic]] | adjective | **1.** Of or relating to or affected by hypothermia. | *"In academic literature, hypothermic designates of or relating to or affected by hypothermia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isotherm]] | noun | **1.** (meteorology) an isogram connecting points having the same temperature at a given time. | *"In academic literature, isotherm designates (meteorology) an isogram connecting points having the same temperature at a given time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isothermal]] | adjective | **1.** Of a process or change taking place at constant temperature. | *"This rate applied to utilities traces through each good a line analagous to the isothermal line on the map, marking off a zone of utilities for the present and other zones for each period of the future."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[isothermic]] | adjective | **1.** Of or relating to an isotherm. | *"In academic literature, isothermic designates of or relating to an isotherm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonthermal]] | adjective | **1.** Not involving heat. | *"In academic literature, nonthermal designates not involving heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[therm]] | noun | **1.** A unit of heat equal to 100,000 british thermal units. | *"In academic literature, therm designates a unit of heat equal to 100,000 british thermal units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermal]] | noun | **1.** Rising current of warm air.<br>**2.** Relating to or associated with heat. | *"The whole subject is thus of considerable complexity, and involves questions of thermal and chemical equilibrium."* — Donald M. Levy, *Modern Copper Smelting* |
| [[thermalgesia]] | noun | **1.** Pain caused by heat. | *"In academic literature, thermalgesia designates pain caused by heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermally]] | adverb | **1.** By means of heat or with respect to thermal properties. | *"In academic literature, thermally designates by means of heat or with respect to thermal properties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermel]] | noun | **1.** A thermometer that uses thermoelectric current to measure temperature. | *"In academic literature, thermel designates a thermometer that uses thermoelectric current to measure temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermic]] | adjective | **1.** Relating to or associated with heat. | *"In academic literature, thermic designates relating to or associated with heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermidor]] | noun | **1.** Eleventh month of the revolutionary calendar (july and august); the month of heat. | *"In academic literature, thermidor designates eleventh month of the revolutionary calendar (july and august); the month of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermion]] | noun | **1.** An electrically charged particle (electron or ion) emitted by a substance at a high temperature. | *"In academic literature, thermion designates an electrically charged particle (electron or ion) emitted by a substance at a high temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermionic]] | adjective | **1.** Of or relating to or characteristic of thermions. | *"In academic literature, thermionic designates of or relating to or characteristic of thermions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermionics]] | noun | **1.** The branch of electronics dealing with thermionic phenomena (especially thermionic vacuum tubes). | *"In academic literature, thermionics designates the branch of electronics dealing with thermionic phenomena (especially thermionic vacuum tubes)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermistor]] | noun | **1.** A semiconductor device made of materials whose resistance varies as a function of temperature; can be used to compensate for temperature variation in other components of a circuit. | *"In academic literature, thermistor designates a semiconductor device made of materials whose resistance varies as a function of temperature; can be used to compensate for temperature variation in other components of a circuit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoacidophile]] | noun | **1.** Archaebacteria that thrive in strongly acidic environments at high temperatures. | *"In academic literature, thermoacidophile designates archaebacteria that thrive in strongly acidic environments at high temperatures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermobia]] | noun | **1.** A genus of lepismatidae. | *"In academic literature, thermobia designates a genus of lepismatidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermocautery]] | noun | **1.** Cautery (destruction of tissue) by heat. | *"In academic literature, thermocautery designates cautery (destruction of tissue) by heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermochemistry]] | noun | **1.** The branch of chemistry that studies the relation between chemical action and the amount of heat absorbed or generated. | *"In academic literature, thermochemistry designates the branch of chemistry that studies the relation between chemical action and the amount of heat absorbed or generated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermocoagulation]] | noun | **1.** Congealing tissue by heat (as by electric current). | *"In academic literature, thermocoagulation designates congealing tissue by heat (as by electric current)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermocouple]] | noun | **1.** A kind of thermometer consisting of two wires of different metals that are joined at both ends; one junction is at the temperature to be measured and the other is held at a fixed lower temperature; the current generated in the circuit is proportional to the temperature difference. | *"In academic literature, thermocouple designates a kind of thermometer consisting of two wires of different metals that are joined at both ends; one junction is at the temperature to be measured and the other is held at a fixed lower temperature; the current generated in the circuit is proportional to the temperature difference."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermodynamic]] | adjective | **1.** Of or concerned with thermodynamics. | *"In academic literature, thermodynamic designates of or concerned with thermodynamics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermodynamical]] | adjective | **1.** Of or concerned with thermodynamics. | *"In academic literature, thermodynamical designates of or concerned with thermodynamics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermodynamically]] | adverb | **1.** With respect to thermodynamics. | *"In academic literature, thermodynamically designates with respect to thermodynamics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermodynamics]] | noun | **1.** The branch of physics concerned with the conversion of different forms of energy. | *"In academic literature, thermodynamics designates the branch of physics concerned with the conversion of different forms of energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoelectric]] | adjective | **1.** Involving or resulting from thermoelectricity. | *"In academic literature, thermoelectric designates involving or resulting from thermoelectricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoelectrical]] | adjective | **1.** Involving or resulting from thermoelectricity. | *"In academic literature, thermoelectrical designates involving or resulting from thermoelectricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoelectricity]] | noun | **1.** Electricity produced by heat (as in a thermocouple). | *"In academic literature, thermoelectricity designates electricity produced by heat (as in a thermocouple)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermogram]] | noun | **1.** A graphical record produced by a thermograph. | *"In academic literature, thermogram designates a graphical record produced by a thermograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermograph]] | noun | **1.** Medical instrument that uses an infrared camera to reveal temperature variations on the surface of the body.<br>**2.** A thermometer that records temperature variations on a graph as a function of time. | *"In academic literature, thermograph designates medical instrument that uses an infrared camera to reveal temperature variations on the surface of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermography]] | noun | **1.** Diagnostic technique using a thermograph to record the heat produced by different parts of the body; used to study blood flow and to detect tumors. | *"In academic literature, thermography designates diagnostic technique using a thermograph to record the heat produced by different parts of the body; used to study blood flow and to detect tumors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermogravimeter]] | noun | **1.** A hydrometer that includes a thermometer. | *"In academic literature, thermogravimeter designates a hydrometer that includes a thermometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermogravimetric]] | adjective | **1.** Of or relating to thermal hydrometry. | *"In academic literature, thermogravimetric designates of or relating to thermal hydrometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermogravimetry]] | noun | **1.** The measurement of changes in weight as a function of changes in temperature used as a technique of chemically analyzing substances. | *"In academic literature, thermogravimetry designates the measurement of changes in weight as a function of changes in temperature used as a technique of chemically analyzing substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermohydrometer]] | noun | **1.** A hydrometer that includes a thermometer. | *"In academic literature, thermohydrometer designates a hydrometer that includes a thermometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermohydrometric]] | adjective | **1.** Of or relating to thermal hydrometry. | *"In academic literature, thermohydrometric designates of or relating to thermal hydrometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermojunction]] | noun | **1.** A junction between two dissimilar metals across which a voltage appears. | *"In academic literature, thermojunction designates a junction between two dissimilar metals across which a voltage appears."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermolabile]] | adjective | **1.** (chemistry, physics, biology) readily changed or destroyed by heat. | *"In academic literature, thermolabile designates (chemistry, physics, biology) readily changed or destroyed by heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermometer]] | noun | **1.** Measuring instrument for measuring temperature. | *"Poetry is a thermometer: by taking its average height you can estimate the normal temperature of its writer's mind."* — Francis Thompson, *Shelley: An Essay* |
| [[thermometric]] | adjective | **1.** Of or relating to thermometry. | *"In academic literature, thermometric designates of or relating to thermometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermometrograph]] | noun | **1.** A thermometer that records temperature variations on a graph as a function of time. | *"In academic literature, thermometrograph designates a thermometer that records temperature variations on a graph as a function of time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermometry]] | noun | **1.** The measurement of temperature. | *"In academic literature, thermometry designates the measurement of temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermonuclear]] | adjective | **1.** Using nuclear weapons based on fusion as distinguished from fission. | *"Neutronic penetray analysis shows that in addition to thermonuclear power plants the aggregate includes machined parts configured to Catalog 11 long range lasers, explosive decompressors, particle beamers and gun mounts."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[thermophile]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin therm within the domain of Greek-Latin Hybrid.<br>**2.** A technical or specialized form exhibiting the properties of therm in systematic terminology. | *"In academic literature, thermophile designates pertaining to, derived from, or characteristic of latin therm within the domain of greek-latin hybrid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermopile]] | noun | **1.** A kind of thermometer for measuring heat radiation; consists of several thermocouple junctions in series. | *"In academic literature, thermopile designates a kind of thermometer for measuring heat radiation; consists of several thermocouple junctions in series."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoplastic]] | noun | **1.** A material that softens when heated and hardens again when cooled.<br>**2.** Having the property of softening or fusing when heated and of hardening and becoming rigid again when cooled. | *"In academic literature, thermoplastic designates a material that softens when heated and hardens again when cooled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermopsis]] | noun | **1.** Genus of american and asiatic showy rhizomatous herbs: bush peas. | *"In academic literature, thermopsis designates genus of american and asiatic showy rhizomatous herbs: bush peas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermopylae]] | noun | **1.** A famous battle in 480 bc; a greek army under leonidas was annihilated by the persians who were trying to conquer greece. | *"Zdrzhinski, the officer with the long mustache, spoke grandiloquently of the Saltánov dam being “a Russian Thermopylae,” and of how a deed worthy of antiquity had been performed by General Raévski."* — graf Leo Tolstoy, *War and Peace* |
| [[thermoreceptor]] | noun | **1.** A sensory receptor that responds to heat and cold. | *"In academic literature, thermoreceptor designates a sensory receptor that responds to heat and cold."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoregulator]] | noun | **1.** A regulator for automatically regulating temperature by starting or stopping the supply of heat. | *"In academic literature, thermoregulator designates a regulator for automatically regulating temperature by starting or stopping the supply of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermos]] | noun | **1.** Vacuum flask that preserves temperature of hot or cold drinks. | *"They call it a thermos bottle."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[thermoset]] | adjective | **1.** Having the property of becoming permanently hard and rigid when heated or cured. | *"In academic literature, thermoset designates having the property of becoming permanently hard and rigid when heated or cured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermosetting]] | adjective | **1.** Having the property of becoming permanently hard and rigid when heated or cured. | *"In academic literature, thermosetting designates having the property of becoming permanently hard and rigid when heated or cured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermosphere]] | noun | **1.** The atmospheric layer between the mesosphere and the exosphere. | *"In academic literature, thermosphere designates the atmospheric layer between the mesosphere and the exosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermostat]] | noun | **1.** A regulator for automatically regulating temperature by starting or stopping the supply of heat.<br>**2.** Control the temperature with a thermostat. | *"In academic literature, thermostat designates a regulator for automatically regulating temperature by starting or stopping the supply of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermostatic]] | adjective | **1.** Of or relating to a thermostat. | *"In academic literature, thermostatic designates of or relating to a thermostat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermostatically]] | adverb | **1.** By thermostat; in a thermostatic manner. | *"In academic literature, thermostatically designates by thermostat; in a thermostatic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermostatics]] | noun | **1.** The aspect of thermodynamics concerned with thermal equilibrium. | *"In academic literature, thermostatics designates the aspect of thermodynamics concerned with thermal equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermotherapy]] | noun | **1.** The use of heat to treat a disease or disorder; heating pads or hot compresses or hot-water bottles are used to promote circulation in peripheral vascular disease or to relax tense muscles. | *"In academic literature, thermotherapy designates the use of heat to treat a disease or disorder; heating pads or hot compresses or hot-water bottles are used to promote circulation in peripheral vascular disease or to relax tense muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermotropism]] | noun | **1.** An orienting response to warmth. | *"In academic literature, thermotropism designates an orienting response to warmth."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · THERM
  </div>
</div>
