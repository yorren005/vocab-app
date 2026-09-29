---
status: unread
type: root_dashboard
---
# Dashboard — cal
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cal-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“heat or be warm”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Bright warm flames crackling inside a hearth and radiating glowing heat.</span>
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

The root **cal** means heat or be warm. It refers to be warm, hot, radiant, heat-emitting. In English, this root forms words such as *calor*, *calorie*, *caloric*, and *calorific*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: heat or be warm
> The root **cal** means heat or be warm. It refers to be warm, hot, radiant, heat-emitting. In English, this root forms words such as *calor*, *calorie*, *caloric*, and *calorific*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Heat or be warm</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Bright warm flames crackling inside a hearth and radiating glowing heat.</mark>
> - **Everyday Connection**: Think of familiar words like *calor* and *calorie*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cal** comes from a Latin word that means *"heat or be warm"*.
  - At its core, it describes heat or be warm.

- **The Big Picture Idea**:
  - Picture bright warm flames crackling inside a hearth and radiating glowing heat.
  - Whenever you see **cal** in an English word, think of **fire, heat, and burning warmth**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of heat or be warm.
  - **Mental & Social**: How people experience, organize, or communicate about heat or be warm.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Calor**: Heat or physical warmth.
  - **Calorie**: A kilocalorie , the energy required to raise the temperature of one kilogram of water by one degree Celsius.
  - **Caloric**: Pertaining to heat or the energy value of food.
  - **Calorific**: Producing or generating heat.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cal</mark>, think of <mark class="hl-def">fire, heat, and burning warmth</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Stem Engines
> The root **cal** enters English through four primary morphological stem channels:
>
> 1. **The Abstract Thermal Stem `calor-`** (from *calor, calōris*):
>    - Direct nominal loan: *calor*.
>    - Science & measurement suffixes: *calorie*, *caloric*, *calorific*, *calorimeter*, *calorimetry*, *calorescence*.
> 2. **The Adjectival & Vessel Stem `calid-` / `cald-`** (from *calidus* & *caldāria*):
>    - Learned Latin forms: *calid*, *calidity*, *caldarium*.
>    - Romance culinary and geological vessels: *cauldron*, *caldera*, *chowder*.
>    - Intensive burn prefixation (*ex-* + *calidus*): *scald*, *scalding*, *scaldingly*.
> 3. **The Causative Stem `calefa-` / `chauf-`** (from *calefacere* → OF *chaufer*):
>    - English learned Latinate terms: *calefaction*, *calefactory*, *calefacient*.
>    - French vernacular loans: *chafe*, *chafing*, *chauffeur*.
> 4. **The Inchoative Verbal Stem `calēsc-`** (from *calēscere* "to grow warm"):
>    - Physics and metallurgical transition terms: *calescent*, *calescence*, *decalescence*, *recalescence*, *recalescent*.
> 5. **The Negative Affective Form `nonchal-`** (from *non* + *chaloir* < *calēre*):
>    - *nonchalant*, *nonchalance*, *nonchalantly*.

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

> [!tip] 🌈 The Five Conceptual Provinces of `cal`
>
> ```
>                            ┌── 1. Thermodynamics & Nutrition (calor, calorie, caloric, calorimetry)
>                            ├── 2. Phase Transitions & Metallurgy (calescent, decalescence, recalescence)
>   [cal: warm / hot] ───────┼── 3. Culinary Vessels & Volcanology (cauldron, caldera, chowder)
>                            ├── 4. Thermal Friction, Steam & Combustion (scald, chafe, chauffeur, chafing)
>                            └── 5. Emotional Temperature & Detachment (nonchalant, nonchalance)
> ```
>
> 1. **Thermodynamics, Measurement & Nutritional Energy:**
>    - The quantified measurement of thermal energy in food and chemical reactions: *calor* (inflammatory heat), *calorie* (nutritional kilocalorie / physical calorie), *caloric*, *calorific*, *calorimeter*, *calorimetry*.
> 2. **Metallurgy, Physics & Radiant Emission:**
>    - The microscopic absorption and release of heat during crystalline transformations: *calorescence* (infrared conversion to visible light), *decalescence* (heat absorption at critical point), *recalescence* (spontaneous glow of reheating in cooling metal).
> 3. **Boiling Vessels, Cuisine & Geology:**
>    - Containers designed to hold boiling liquids and their geographical analogues: *cauldron* (large boiling pot), *caldera* (collapsed volcanic magma chamber), *chowder* (thick coastal soup named after the French kettle).
> 4. **Thermal Injury, Friction & Mechanical Heat:**
>    - The direct physical impact of boiling fluids, friction, or steam generation: *scald* (burn from hot liquid/steam), *chafe* (rubbing until warm/sore), *chauffeur* (the fire-stoker who became the modern driver), *calefaction* (the act of heating).
> 5. **Psychological Indifference & Thermal Metaphors:**
>    - The metaphorical projection of temperature onto human concern: *nonchalant* (unmoved, refusing to "warm" to pressure), *nonchalance* (cool composure).

---

## 🔀 4. Prefix & Combining Dynamics on cal

### Prefix Dynamics

| Prefix | Morpheme Meaning | Latin / Romance Compound | English Derivative | Resulting Semantic Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| `ex-` (→ *es-*, *s-*) | out, completely | *excaldāre* (Late Lat.) | [[scald]], [[scalding]] | To immerse *completely* in hot water; to burn with boiling liquid. |
| `non-` | not | *nonchaloir* (OF) | [[nonchalant]], [[nonchalance]] | *Not* warming up; showing cool indifference and lack of excitement. |
| `de-` | down, away | *decalēscere* (Mod. Lat.) | [[decalescence]] | Heat dropping or absorbing *downward* during steel heating. |
| `re-` | back, again | *recalēscere* (Mod. Lat.) | [[recalescence]], [[recalescent]] | Heat surging *back* and glowing afresh during metallic cooling. |

### Suffix Transformations

| Suffix | Linguistic Function | Combined Form | English Derivative | Resulting Semantic Function |
| :--- | :--- | :--- | :--- | :--- |
| `-ie` (French) | Noun (Unit of measure) | *calor* + *-ie* | [[calorie]] | Standardized metric unit of heat energy. |
| `-ic` | Adjective (Pertaining to) | *calor* + *-ic* | [[caloric]] | Relating to heat or food energy value. |
| `-ific` | Adjective (Producing / making) | *calor* + *-ificus* | [[calorific]] | Producing or generating heat. |
| `-meter` | Noun (Instrument of measure) | *calor* + *-meter* | [[calorimeter]] | Apparatus for measuring thermal output. |
| `-metry` | Noun (Field of measurement) | *calor* + *-metria* | [[calorimetry]] | The quantitative study of heat measurement. |
| `-escent` | Adjective (Beginning, becoming) | *calēscere* + *-ent* | [[calescent]], [[recalescent]] | Growing warm; regaining heat. |
| `-escence` | Noun (Inchoative process) | *calēscere* + *-ence* | [[calorescence]], [[decalescence]], [[recalescence]] | The process of glowing or thermal phase shifting. |
| `-ārium` | Noun (Place / facility) | *caldārius* + *-um* | [[caldarium]] | The heated chamber of Roman public baths. |
| `-dron` / `-dera` | Noun (Vessel / basin) | *caldāria* | [[cauldron]], [[caldera]] | Large boiling pot; collapsed volcanic depression. |
| `-ant` | Active participle | *nonchaloir* + *-ant* | [[nonchalant]] | In a state of cool unconcern. |
| `-ance` | Abstract noun | *nonchaloir* + *-ance* | [[nonchalance]] | The state of unaffected coolness. |
| `-faction` | Noun of making/doing | *calefacere* + *-tiō* | [[calefaction]] | The act of heating or producing warmth. |
| `-facient` | Adjective / agent | *calefacere* + *-ent* | [[calefacient]] | Warming or producing physical heat. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Core Lexical Terms | Concrete Professional & Historical Application |
| :--- | :--- | :--- |
| 🥗 **Nutrition Science & Public Health** | [[calorie]], [[caloric]], [[calorific]] | **Caloric intake** forms the universal metric for metabolic basal rates, energy expenditure, and food labeling mandates worldwide (enforced by the FDA and WHO). |
| 🌋 **Volcanology & Earth Sciences** | [[caldera]] | A **caldera** (such as the Yellowstone Caldera or Santorini) represents the largest volcanic landforms on Earth, formed by catastrophic explosive emptying and roof collapse of a shallow magma reservoir. |
| 🔬 **Thermodynamics & Materials Science** | [[calorimetry]], [[calorimeter]], [[decalescence]], [[recalescence]], [[calorescence]] | **Differential scanning calorimetry (DSC)** measures phase transitions in polymers and alloys. **Decalescence** and **recalescence** mark the critical austenitic and pearlitic crystalline transformations during heat-treating of carbon steels. |
| 🩺 **Clinical Medicine & Emergency Care** | [[calor]], [[scald]], [[calefacient]] | *Calor* is assessed in physical diagnostics as a hallmark of tissue inflammation or cellulitis. **Scalds** represent the leading cause of burn injuries in pediatric and geriatric emergency medicine. |
| 🍳 **Culinary Arts & History** | [[cauldron]], [[chowder]], [[chafing dish]] | From medieval hearth **cauldrons** to New England clam **chowder** (named after the Breton fishermen's *chaudière*) and tabletop **chafing dishes**, the root anchors food preparation vessels. |
| 🚗 **Automotive History & Culture** | [[chauffeur]] | Originally the fire-stoker who maintained the steam pressure in early French steam omnibuses, the **chauffeur** evolved into the liveried personal driver of luxury automobiles. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alcalescent]] | adjective | **1.** Tending to become alkaline; slightly alkaline. | *"In academic literature, alcalescent designates tending to become alkaline; slightly alkaline."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calaba]] | noun | **1.** West indian tree having racemes of fragrant white flowers and yielding a durable timber and resinous juice. | *"In academic literature, calaba designates west indian tree having racemes of fragrant white flowers and yielding a durable timber and resinous juice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calabash]] | noun | **1.** Round gourd of the calabash tree.<br>**2.** Tropical american evergreen that produces large round gourds. | *"When they have all done so and seated themselves again gravely in the circle, the girl offers to each of them a calabash full of very strong _chicha_."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[calabazilla]] | noun | **1.** Perennial vine of dry parts of central and southwestern united states and mexico having small hard mottled green inedible fruit. | *"In academic literature, calabazilla designates perennial vine of dry parts of central and southwestern united states and mexico having small hard mottled green inedible fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calabria]] | noun | **1.** A region of southern italy (forming the toe of the italian `boot'). | *"The practice is not confined to Sicily, for it is observed also at Cosenza in Calabria, and perhaps in other places."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[calabura]] | noun | **1.** A fast-growing tropical american evergreen having white flowers and white fleshy edible fruit; bark yields a silky fiber used in cordage and wood is valuable for staves. | *"In academic literature, calabura designates a fast-growing tropical american evergreen having white flowers and white fleshy edible fruit; bark yields a silky fiber used in cordage and wood is valuable for staves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caladenia]] | noun | **1.** Any of various orchids of the genus caladenia. | *"In academic literature, caladenia designates any of various orchids of the genus caladenia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caladium]] | noun | **1.** Any plant of the genus caladium cultivated for their ornamental foliage variously patterned in white or pink or red. | *"In academic literature, caladium designates any plant of the genus caladium cultivated for their ornamental foliage variously patterned in white or pink or red."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calais]] | noun | **1.** A town in northern france on the strait of dover that serves as a ferry port to england; in 1347 it was captured by the english king edward iii after a long siege and remained in english hands until it was recaptured by the french king henry ii in 1558. | *"Nym and Bardolph are sworn brothers in filching, and in Calais they stole a fire-shovel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[calamagrostis]] | noun | **1.** Reed grass. | *"In academic literature, calamagrostis designates reed grass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calamari]] | noun | **1.** (italian cuisine) squid prepared as food. | *"In academic literature, calamari designates (italian cuisine) squid prepared as food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calamary]] | noun | **1.** (italian cuisine) squid prepared as food. | *"In academic literature, calamary designates (italian cuisine) squid prepared as food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calamine]] | noun | **1.** A white mineral; a common ore of zinc. | *"In academic literature, calamine designates a white mineral; a common ore of zinc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calamint]] | noun | **1.** Perennial aromatic herbs growing in hedgerows or scrub or open woodlands from western europe to central asia and in north america. | *"In academic literature, calamint designates perennial aromatic herbs growing in hedgerows or scrub or open woodlands from western europe to central asia and in north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calamintha]] | noun | **1.** Calamint. | *"Classical and authoritative lexicons catalog calamintha as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calamitous]] | adjective | **1.** (of events) having extremely unfortunate or dire consequences; bringing ruin; ; ; ; - charles darwin; - douglas macarthur. | *"The populations of many rural neighborhoods thus became heterogeneous, with results calamitous to the social life."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[calamity]] | noun | **1.** An event resulting in great loss and misfortune. | *"Alack, You are transported by calamity Thither where more attends you, and you slander The helms o’ th’ state, who care for you like fathers, When you curse them as enemies."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[calamus]] | noun | **1.** Any tropical asian palm of the genus calamus; light tough stems are a source of rattan canes.<br>**2.** The aromatic root of the sweet flag used medicinally. | *"See, again, in the pieces gathered together under the title "Calamus," and elsewhere, what it means for a man to love his fellow-man."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[calan]] | noun | **1.** A drug (trade names calan and isoptin) used as an oral or parenteral calcium blocker in cases of hypertension or congestive heart failure or angina or migraine. | *"In academic literature, calan designates a drug (trade names calan and isoptin) used as an oral or parenteral calcium blocker in cases of hypertension or congestive heart failure or angina or migraine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calando]] | adjective | **1.** Gradually decreasing in tempo and volume. | *"In academic literature, calando designates gradually decreasing in tempo and volume."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calandrinia]] | noun | **1.** Large genus of low-growing herbs; widespread throughout tropical and warm temperate regions having usually basal leaves and panicles of purplish ephemeral flowers. | *"In academic literature, calandrinia designates large genus of low-growing herbs; widespread throughout tropical and warm temperate regions having usually basal leaves and panicles of purplish ephemeral flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calanthe]] | noun | **1.** Any of various showy orchids of the genus calanthe having white or yellow or rose-colored flowers and broad leaves folded lengthwise. | *"In academic literature, calanthe designates any of various showy orchids of the genus calanthe having white or yellow or rose-colored flowers and broad leaves folded lengthwise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calapooya]] | noun | **1.** A member of the north american indian people of oregon. | *"In academic literature, calapooya designates a member of the north american indian people of oregon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calapuya]] | noun | **1.** A member of the north american indian people of oregon. | *"In academic literature, calapuya designates a member of the north american indian people of oregon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calash]] | noun | **1.** A woman's large folded hooped hood; worn in the 18th century.<br>**2.** The folding hood of a horse-drawn carriage. | *"Bute's eyes flashed out at her from under her black calash."* — William Makepeace Thackeray, *Vanity Fair* |
| [[calc-tufa]] | noun | **1.** A soft porous rock consisting of calcium carbonate deposited from springs rich in lime. | *"In academic literature, calc-tufa designates a soft porous rock consisting of calcium carbonate deposited from springs rich in lime."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcaneal]] | adjective | **1.** Relating to the heel bone or heel. | *"In academic literature, calcaneal designates relating to the heel bone or heel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcaneus]] | noun | **1.** The largest tarsal bone; forms the human heel. | *"In academic literature, calcaneus designates the largest tarsal bone; forms the human heel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcareous]] | adjective | **1.** Composed of or containing or resembling calcium carbonate or calcite or chalk. | *"Soon the nature of the soil changed; to the sandy plain succeeded an extent of slimy mud, which the Americans call “ooze,” composed of equal parts of silicious and calcareous shells."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[calced]] | adjective | **1.** Used of certain religious orders who wear shoes. | *"In academic literature, calced designates used of certain religious orders who wear shoes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcedony]] | noun | **1.** A milky or greyish translucent to transparent quartz. | *"In academic literature, calcedony designates a milky or greyish translucent to transparent quartz."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calceiform]] | adjective | **1.** Of slipper-shaped blossoms. | *"In academic literature, calceiform designates of slipper-shaped blossoms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calceolaria]] | noun | **1.** Any garden plant of the genus calceolaria having flowers with large inflated slipper-shaped lower lip. | *"In academic literature, calceolaria designates any garden plant of the genus calceolaria having flowers with large inflated slipper-shaped lower lip."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calceolate]] | adjective | **1.** Of slipper-shaped blossoms. | *"In academic literature, calceolate designates of slipper-shaped blossoms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calceus]] | noun | **1.** A shoe covering the ankle; worn by ancient romans. | *"In academic literature, calceus designates a shoe covering the ankle; worn by ancient romans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcic]] | adjective | **1.** Derived from or containing calcium or lime. | *"In academic literature, calcic designates derived from or containing calcium or lime."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcicolous]] | adjective | **1.** Growing or living in soil rich in lime. | *"In academic literature, calcicolous designates growing or living in soil rich in lime."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calciferol]] | noun | **1.** A fat-soluble vitamin that prevents rickets. | *"In academic literature, calciferol designates a fat-soluble vitamin that prevents rickets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calciferous]] | adjective | **1.** Bearing or producing or containing calcium or calcium carbonate or calcite. | *"In academic literature, calciferous designates bearing or producing or containing calcium or calcium carbonate or calcite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcific]] | adjective | **1.** Involving or resulting from calcification. | *"In academic literature, calcific designates involving or resulting from calcification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcification]] | noun | **1.** A process that impregnates something with calcium (or calcium salts).<br>**2.** Tissue hardened by deposition of lime salts. | *"In academic literature, calcification designates a process that impregnates something with calcium (or calcium salts)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcifugous]] | adjective | **1.** Growing or living in acid soil. | *"In academic literature, calcifugous designates growing or living in acid soil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcify]] | verb | **1.** Become impregnated with calcium salts.<br>**2.** Become inflexible and unchanging. | *"In academic literature, calcify designates become impregnated with calcium salts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcimine]] | noun | **1.** A water-base paint containing zinc oxide and glue and coloring; used as a wash for walls and ceilings.<br>**2.** Cover with calcimine. | *"In academic literature, calcimine designates a water-base paint containing zinc oxide and glue and coloring; used as a wash for walls and ceilings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcination]] | noun | **1.** The conversion of metals into their oxides as a result of heating to a high temperature. | *"In academic literature, calcination designates the conversion of metals into their oxides as a result of heating to a high temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcine]] | verb | **1.** Heat a substance so that it oxidizes or reduces. | *"I saw another at work to calcine ice into gunpowder; who likewise showed me a treatise he had written concerning the malleability of fire, which he intended to publish."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[calcite]] | noun | **1.** A common mineral consisting of crystallized calcium carbonate; a major constituent of limestone. | *"In academic literature, calcite designates a common mineral consisting of crystallized calcium carbonate; a major constituent of limestone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcitic]] | adjective | **1.** Of or relating to or containing calcite. | *"In academic literature, calcitic designates of or relating to or containing calcite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcitonin]] | noun | **1.** Thyroid hormone that tends to lower the level of calcium in the blood plasma and inhibit resorption of bone. | *"In academic literature, calcitonin designates thyroid hormone that tends to lower the level of calcium in the blood plasma and inhibit resorption of bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calcium]] | noun | **1.** A white metallic element that burns with a brilliant light; the fifth most abundant element in the earth's crust; an important component of most plants and animals. | *"The gas, which is another of the combinations of carbon and hydrogen (its molecules containing two atoms of each), is easily made by allowing water to come into contact with calcium carbide."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[calcium-cyanamide]] | noun | **1.** A compound used as a fertilizer and as a source of nitrogen compounds. | *"In academic literature, calcium-cyanamide designates a compound used as a fertilizer and as a source of nitrogen compounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calculable]] | adjective | **1.** Capable of being calculated or estimated. | *"It must therefore be a benefit to the community, if this element of unavoidable chance cannot be reduced as a whole, at least to regularize it and make it exactly calculable for any individual."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[calculate]] | verb | **1.** Make a mathematical calculation or computation.<br>**2.** Judge to be probable. | *"A cunning man did calculate my birth And told me that by water I should die."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[calculated]] | verb | **1.** Make a mathematical calculation or computation.<br>**2.** Judge to be probable. | *"She is eminently calculated for a mother-in-law."* — Charles Dickens, *Bleak House* |
| [[calculating]] | verb | **1.** Make a mathematical calculation or computation.<br>**2.** Judge to be probable. | *"George is so occupied with the almanac over the fire-place (calculating the coming months by it perhaps) that he does not look round until she has gone away and the door is closed upon her."* — Charles Dickens, *Bleak House* |
| [[calculatingly]] | adverb | **1.** In a calculating manner. | *"It carefully and calculatingly distributed his riches among the members of his family, overlooking no individual of it."* — Mark Twain, *What Is Man? and Other Essays* |
| [[calculation]] | noun | **1.** The procedure of calculating; determining something by mathematical or logical methods.<br>**2.** Problem solving that involves numbers or quantities. | *"I was just eight,” says Phil, “agreeable to the parish calculation, when I went with the tinker."* — Charles Dickens, *Bleak House* |
| [[calculative]] | adjective | **1.** Used of persons. | *"In academic literature, calculative designates used of persons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calculator]] | noun | **1.** An expert at calculation (or at operating calculating machines).<br>**2.** A small machine that is used for mathematical calculations. | *"In academic literature, calculator designates an expert at calculation (or at operating calculating machines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calculous]] | adjective | **1.** Relating to or caused by or having a calculus or calculi. | *"In academic literature, calculous designates relating to or caused by or having a calculus or calculi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calculus]] | noun | **1.** A hard lump produced by the concretion of mineral salts; found in hollow organs or ducts of the body.<br>**2.** An incrustation that forms on the teeth and gums. | *"Man has Forever.” Back to his book then: deeper drooped his head: CALCULUS racked him: Leaden before, his eyes grew dross of lead: TUSSIS attacked him."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[calcutta]] | noun | **1.** The largest city in india and one of the largest cities in the world; located in eastern india; suffers from poverty and overcrowding. | *"Bombay and Calcutta: MACMILLAN AND CO., LTD. [_All Rights reserved._] NOTE: The text of the present volume was passed for press by Arnold Glover and some progress had been made in his lifetime in the collection of the material given in the Appendix."* — John Fletcher, *The Elder Brother* |
| [[calcuttan]] | adjective | **1.** Of or relating to or characteristic of calcutta or its inhabitants. | *"In academic literature, calcuttan designates of or relating to or characteristic of calcutta or its inhabitants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calean]] | noun | **1.** An oriental tobacco pipe with a long flexible tube connected to a container where the smoke is cooled by passing through water. | *"In academic literature, calean designates an oriental tobacco pipe with a long flexible tube connected to a container where the smoke is cooled by passing through water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caleche]] | noun | **1.** A woman's large folded hooped hood; worn in the 18th century.<br>**2.** The folding hood of a horse-drawn carriage. | *"In academic literature, caleche designates a woman's large folded hooped hood; worn in the 18th century."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caledonia]] | noun | **1.** The geographical area (in roman times) to the north of the antonine wall; now a poetic name for scotland. | *"Hail, Caledonia, name for ever dear!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[calefacient]] | adjective | **1.** Producing the sensation of heat when applied to the body. | *"In academic literature, calefacient designates producing the sensation of heat when applied to the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calefaction]] | noun | **1.** The property of being warming. | *"In academic literature, calefaction designates the property of being warming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calefactive]] | adjective | **1.** Serving to heat. | *"In academic literature, calefactive designates serving to heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calefactory]] | adjective | **1.** Serving to heat. | *"In academic literature, calefactory designates serving to heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calendar]] | noun | **1.** A system of timekeeping that defines the beginning and length and divisions of the year.<br>**2.** A list or register of events (appointments or social events or court cases etc). | *"Madam, the care I have had to even your content, I wish might be found in the calendar of my past endeavours; for then we wound our modesty, and make foul the clearness of our deservings, when of ourselves we publish them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[calender]] | noun | **1.** A machine that smooths or glazes paper or cloth by pressing it between plates or passing it through rollers.<br>**2.** Press between rollers or plates so as to smooth, glaze, or thin into sheets. | *"In academic literature, calender designates a machine that smooths or glazes paper or cloth by pressing it between plates or passing it through rollers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calendered]] | verb | **1.** Press between rollers or plates so as to smooth, glaze, or thin into sheets.<br>**2.** (of paper and fabric and leather) having a surface made smooth and glossy especially by pressing between rollers. | *"In academic literature, calendered designates press between rollers or plates so as to smooth, glaze, or thin into sheets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calendric]] | adjective | **1.** Relating to or characteristic of or used in a calendar or time measurement. | *"In academic literature, calendric designates relating to or characteristic of or used in a calendar or time measurement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calendrical]] | adjective | **1.** Relating to or characteristic of or used in a calendar or time measurement. | *"In academic literature, calendrical designates relating to or characteristic of or used in a calendar or time measurement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calendula]] | noun | **1.** Any of numerous chiefly annual herbs of the genus calendula widely cultivated for their yellow or orange flowers; often used for medicinal and culinary purposes. | *"In academic literature, calendula designates any of numerous chiefly annual herbs of the genus calendula widely cultivated for their yellow or orange flowers; often used for medicinal and culinary purposes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cali]] | noun | **1.** City in southwestern colombia in a rich agricultural area. | *"All for Cali- Fornia in search of gold!"* — Effie Afton, *Eventide* |
| [[caliber]] | noun | **1.** A degree or grade of excellence or worth.<br>**2.** Diameter of a tube or gun barrel. | *"But I would rather live in a world that possessed only literature of the Poe caliber, than shiver in one echoing solely the strains of the Miltonian muse."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[calibrate]] | verb | **1.** Make fine adjustments or divide into marked intervals for optimal measuring.<br>**2.** Mark (the scale of a measuring instrument) so that it can be read in the desired units. | *"Even if they do have more spares stashed away, it'll take them at least twenty hours to install the parts and calibrate the system." Brad turned to Rimov."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[calibrated]] | verb | **1.** Make fine adjustments or divide into marked intervals for optimal measuring.<br>**2.** Mark (the scale of a measuring instrument) so that it can be read in the desired units. | *"Once the weapons are assembled, installed and calibrated we could be on the receiving end of more nastiness." Leaning forward over the table, he looked directly at the President."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[calibration]] | noun | **1.** The act of checking or adjusting (by comparison with a standard) the accuracy of a measuring instrument. | *"Access to the calibration cavity," Brad said as he stooped, shed his outer glove, and felt around the mating edge."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[calibre]] | noun | **1.** A degree or grade of excellence or worth.<br>**2.** Diameter of a tube or gun barrel. | *"I first got an idea of its calibre when I heard him preach in his own church at Morton."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[caliche]] | noun | **1.** Crust or layer of hard subsoil encrusted with calcium-carbonate occurring in arid or semiarid regions.<br>**2.** Nitrate-bearing rock or gravel of the sodium nitrate deposits of chile and peru. | *"In academic literature, caliche designates crust or layer of hard subsoil encrusted with calcium-carbonate occurring in arid or semiarid regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caliche-topped]] | adjective | **1.** Covered with caliche, a hard calcium-carbonate encrusted soil. | *"In academic literature, caliche-topped designates covered with caliche, a hard calcium-carbonate encrusted soil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calico]] | noun | **1.** Coarse cloth with a bright print.<br>**2.** Made of calico or resembling calico in being patterned. | *"So in wondering how to use it, she thought of a poor woman who needed a new calico dress, and at once bought it and gave it to her."* — Classic Author, *The wonders of prayer* |
| [[calicular]] | adjective | **1.** Relating to or resembling a calyculus. | *"In academic literature, calicular designates relating to or resembling a calyculus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caliculus]] | noun | **1.** A small cup-shaped structure (as a taste bud or optic cup or cavity of a coral containing a polyp). | *"In academic literature, caliculus designates a small cup-shaped structure (as a taste bud or optic cup or cavity of a coral containing a polyp)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calid]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin cal within the domain of Fire, Heat & Ash.<br>**2.** A technical or specialized form exhibiting the properties of cal in systematic terminology. | *"In academic literature, calid designates pertaining to, derived from, or characteristic of latin cal within the domain of fire, heat & ash."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calidris]] | noun | **1.** A genus of scolopacidae. | *"In academic literature, calidris designates a genus of scolopacidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calif]] | noun | **1.** The civil and religious leader of a muslim state considered to be a representative of allah on earth. | *"In academic literature, calif designates the civil and religious leader of a muslim state considered to be a representative of allah on earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calif.]] | noun | **1.** A state in the western united states on the pacific; the 3rd largest state; known for earthquakes. | *"In academic literature, calif. designates a state in the western united states on the pacific; the 3rd largest state; known for earthquakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[california]] | noun | **1.** A state in the western united states on the pacific; the 3rd largest state; known for earthquakes. | *"California is the spot I’ve had in my mind to try.” “But it is understood everywhere that you are going to take poor Mr."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[californian]] | noun | **1.** A native or resident of california.<br>**2.** Of or relating to or characteristic of california or its inhabitants. | *"Let us go the rush and racket, On the Californian packet."* — Effie Afton, *Eventide* |
| [[californium]] | noun | **1.** A radioactive transuranic element; discovered by bombarding curium with alpha particles. | *"In academic literature, californium designates a radioactive transuranic element; discovered by bombarding curium with alpha particles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caliginous]] | adjective | **1.** Dark and misty and gloomy. | *"In academic literature, caliginous designates dark and misty and gloomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caligula]] | noun | **1.** Roman emperor who succeeded tiberius and whose uncontrolled passions resulted in manifest insanity; noted for his cruelty and tyranny; was assassinated (12-41). | *"You are like a murderer—you are like a slave-driver—you are like the Roman emperors!” I had read Goldsmith’s History of Rome, and had formed my opinion of Nero, Caligula, &c."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[caliper]] | noun | **1.** An instrument for measuring the distance between two points (often used in the plural).<br>**2.** Measure the diameter of something with calipers. | *"Rather surprised, I said Yes, when he produced a thing like calipers and got the dimensions back and front and every way, taking notes carefully."* — Joseph Conrad, *Heart of Darkness* |
| [[caliph]] | noun | **1.** The civil and religious leader of a muslim state considered to be a representative of allah on earth. | *"Restored by order of the Caliph Omar, it was definitely destroyed in 761 or 762 by Caliph Al-Mansor, who wished to prevent the arrival of provisions to Mohammed-ben-Abdallah, who had revolted against him."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[caliphate]] | noun | **1.** The era of islam's ascendancy from the death of mohammed until the 13th century; some moslems still maintain that the moslem world must always have a calif as head of the community.<br>**2.** The territorial jurisdiction of a caliph. | *"In academic literature, caliphate designates the era of islam's ascendancy from the death of mohammed until the 13th century; some moslems still maintain that the moslem world must always have a calif as head of the community."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calisaya]] | noun | **1.** Peruvian shrub or small tree having large glossy leaves and cymes of fragrant yellow to green or red flowers; cultivated for its medicinal bark. | *"In academic literature, calisaya designates peruvian shrub or small tree having large glossy leaves and cymes of fragrant yellow to green or red flowers; cultivated for its medicinal bark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calisthenic]] | adjective | **1.** Of or relating to calisthenics. | *"Instead of going to the gym on Saturday, I'll put in calisthenics and acrobatic stunts with a broom and duster.” She was thorough, too."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[calisthenics]] | noun | **1.** The practice of calisthenic exercises.<br>**2.** Light exercises designed to promote general fitness. | *"Instead of going to the gym on Saturday, I'll put in calisthenics and acrobatic stunts with a broom and duster.” She was thorough, too."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[call]] | noun | **1.** A telephone connection.<br>**2.** A special disposition (as if from a divine source) to pursue a particular course. | *"Or call it winter, which being full of care, Makes summer’s welcome, thrice more wished, more rare. 57 Being your slave what should I do but tend, Upon the hours, and times of your desire?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[call-back]] | noun | **1.** A return call.<br>**2.** The recall of an employee after a layoff. | *"In academic literature, call-back designates a return call."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[call-board]] | noun | **1.** A bulletin board backstage in a theater. | *"In academic literature, call-board designates a bulletin board backstage in a theater."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[call-in]] | noun | **1.** A telephone call to a radio station or a television station in which the caller participates in the on-going program. | *"In academic literature, call-in designates a telephone call to a radio station or a television station in which the caller participates in the on-going program."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[call-out]] | noun | **1.** A challenge to a fight or duel. | *"In academic literature, call-out designates a challenge to a fight or duel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calla]] | noun | **1.** South african plant widely cultivated for its showy pure white spathe and yellow spadix.<br>**2.** Water arum. | *"In academic literature, calla designates south african plant widely cultivated for its showy pure white spathe and yellow spadix."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callable]] | adjective | **1.** Subject to a demand for payment before due date. | *"In academic literature, callable designates subject to a demand for payment before due date."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callas]] | noun | **1.** Greek coloratura soprano (born in the united states) known for her dramatic intensity in operatic roles (1923-1977).<br>**2.** South african plant widely cultivated for its showy pure white spathe and yellow spadix. | *"In academic literature, callas designates greek coloratura soprano (born in the united states) known for her dramatic intensity in operatic roles (1923-1977)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callathump]] | noun | **1.** A noisy boisterous parade.<br>**2.** A noisy mock serenade (made by banging pans and kettles) to a newly married couple. | *"In academic literature, callathump designates a noisy boisterous parade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callback]] | noun | **1.** A request by the manufacturer of a defective product to return the product (as for replacement or repair). | *"In academic literature, callback designates a request by the manufacturer of a defective product to return the product (as for replacement or repair)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caller]] | noun | **1.** A social or business visitor.<br>**2.** An investor who buys a call option. | *"Hypocrisy A-La-Mode Upon a simmer Sunday morn When Nature’s face is fair, I walked forth to view the corn, An’ snuff the caller air."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[caller-out]] | noun | **1.** A person who announces the changes of steps during a dance. | *"In academic literature, caller-out designates a person who announces the changes of steps during a dance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caller-up]] | noun | **1.** The person initiating a telephone call. | *"In academic literature, caller-up designates the person initiating a telephone call."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calliandra]] | noun | **1.** Any of various shrubs and small trees valued for their fine foliage and attractive spreading habit and clustered white to deep pink or red flowers. | *"In academic literature, calliandra designates any of various shrubs and small trees valued for their fine foliage and attractive spreading habit and clustered white to deep pink or red flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callicebus]] | noun | **1.** Titis. | *"Classical and authoritative lexicons catalog callicebus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calligraph]] | verb | **1.** Write beautifully and ornamentally. | *"In academic literature, calligraph designates write beautifully and ornamentally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calligrapher]] | noun | **1.** Someone skilled in penmanship. | *"The Imperial marks were the work of calligraphers who were selected for the purpose, and the writing is careful and in good style."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[calligraphic]] | adjective | **1.** Of or relating to or expressed in calligraphy. | *"In academic literature, calligraphic designates of or relating to or expressed in calligraphy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calligraphical]] | adjective | **1.** Of or relating to or expressed in calligraphy. | *"In academic literature, calligraphical designates of or relating to or expressed in calligraphy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calligraphist]] | noun | **1.** Someone skilled in penmanship. | *"In academic literature, calligraphist designates someone skilled in penmanship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calligraphy]] | noun | **1.** Beautiful handwriting. | *"After completion of laconic epistolary compositions she abandoned the implement of calligraphy in the encaustic pigment, exposed to the corrosive action of copperas, green vitriol and nutgall."* — James Joyce, *Ulysses* |
| [[callimorpha]] | noun | **1.** Cinnabar moths. | *"In academic literature, callimorpha designates cinnabar moths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callinectes]] | noun | **1.** New world blue crabs. | *"In academic literature, callinectes designates new world blue crabs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calling]] | noun | **1.** The particular occupation for which you are trained.<br>**2.** Assign a specified (usually proper) proper name to. | *"I am more proud to be Sir Rowland’s son, His youngest son, and would not change that calling To be adopted heir to Frederick."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[callionymidae]] | noun | **1.** Dragonets. | *"In academic literature, callionymidae designates dragonets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calliope]] | noun | **1.** (greek mythology) the muse of epic poetry.<br>**2.** A musical instrument consisting of a series of steam whistles played from a keyboard. | *"BARHAM" 68 LIGHT CRUISER "CALLIOPE" AT SCAPA 69 "MAKE AND MEND" ON LIGHT CRUISER "YARMOUTH" 69 THE DECK OF AN AEROPLANE CARRIER, H.M.S."* — C. W. Burrows, *Scapa and a Camera* |
| [[calliophis]] | noun | **1.** Asian coral snakes. | *"In academic literature, calliophis designates asian coral snakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calliopsis]] | noun | **1.** North american annual widely cultivated for its yellow flowers with purple-red to brownish centers; in some classifications placed in a subgenus calliopsis. | *"In academic literature, calliopsis designates north american annual widely cultivated for its yellow flowers with purple-red to brownish centers; in some classifications placed in a subgenus calliopsis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calliper]] | noun | **1.** An instrument for measuring the distance between two points (often used in the plural).<br>**2.** Measure the diameter of something with calipers. | *"In academic literature, calliper designates an instrument for measuring the distance between two points (often used in the plural)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calliphora]] | noun | **1.** Type genus of the calliphoridae: blowflies. | *"In academic literature, calliphora designates type genus of the calliphoridae: blowflies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calliphoridae]] | noun | **1.** Blowflies. | *"In academic literature, calliphoridae designates blowflies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callipygian]] | adjective | **1.** Pertaining to or having finely developed buttocks. | *"In academic literature, callipygian designates pertaining to or having finely developed buttocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callipygous]] | adjective | **1.** Pertaining to or having finely developed buttocks. | *"In academic literature, callipygous designates pertaining to or having finely developed buttocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callirhoe]] | noun | **1.** Small genus of north american herbs having usually red or purple flowers. | *"In academic literature, callirhoe designates small genus of north american herbs having usually red or purple flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callisaurus]] | noun | **1.** Zebra-tailed lizard. | *"In academic literature, callisaurus designates zebra-tailed lizard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callistephus]] | noun | **1.** One species: erect asiatic herb with large flowers. | *"In academic literature, callistephus designates one species: erect asiatic herb with large flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callisthenics]] | noun | **1.** The practice of calisthenic exercises.<br>**2.** Light exercises designed to promote general fitness. | *"In academic literature, callisthenics designates the practice of calisthenic exercises."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callisto]] | noun | **1.** The second largest of jupiter's satellites. | *"A man of many talents, Narval had migrated to Planet Pluto from an independent colony orbiting Callisto."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[callithricidae]] | noun | **1.** Marmosets. | *"In academic literature, callithricidae designates marmosets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callithrix]] | noun | **1.** Type genus of the callithricidae: true marmosets. | *"In academic literature, callithrix designates type genus of the callithricidae: true marmosets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callithump]] | noun | **1.** A noisy boisterous parade.<br>**2.** A noisy mock serenade (made by banging pans and kettles) to a newly married couple. | *"In academic literature, callithump designates a noisy boisterous parade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callithumpian]] | adjective | **1.** Of or relating to a callithump. | *"In academic literature, callithumpian designates of or relating to a callithump."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callitrichaceae]] | noun | **1.** Dicot aquatic herbs. | *"In academic literature, callitrichaceae designates dicot aquatic herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callitriche]] | noun | **1.** Water starworts. | *"In academic literature, callitriche designates water starworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callitris]] | noun | **1.** Evergreen monoecious coniferous trees or shrubs: cypress pines. | *"In academic literature, callitris designates evergreen monoecious coniferous trees or shrubs: cypress pines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callophis]] | noun | **1.** Asian coral snakes. | *"In academic literature, callophis designates asian coral snakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callorhinus]] | noun | **1.** Fur seals. | *"In academic literature, callorhinus designates fur seals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callosectomy]] | noun | **1.** Severing the corpus callosum so that communication between the cerebral hemispheres is interrupted (in cases of severe intractable epilepsy). | *"In academic literature, callosectomy designates severing the corpus callosum so that communication between the cerebral hemispheres is interrupted (in cases of severe intractable epilepsy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callosity]] | noun | **1.** An area of skin that is thick or hard from continual pressure or friction (as the sole of the foot).<br>**2.** Devoid of passion or feeling; hardheartedness. | *"In academic literature, callosity designates an area of skin that is thick or hard from continual pressure or friction (as the sole of the foot)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callosotomy]] | noun | **1.** Severing the corpus callosum so that communication between the cerebral hemispheres is interrupted (in cases of severe intractable epilepsy). | *"In academic literature, callosotomy designates severing the corpus callosum so that communication between the cerebral hemispheres is interrupted (in cases of severe intractable epilepsy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callous]] | verb | **1.** Make insensitive or callous; deaden feelings or morals.<br>**2.** Emotionally hardened. | *"A man does what is his duty, what his fellow-citizens expect of him; but that is not to say that he renders himself callous to natural emotion."* — Mrs. Oliphant, *A Beleaguered City* |
| [[calloused]] | verb | **1.** Make insensitive or callous; deaden feelings or morals.<br>**2.** Having calluses; having skin made tough and thick through wear. | *"Hard work makes calloused hands."* — Jack London, *The Jacket (The Star-Rover)* |
| [[callously]] | adverb | **1.** In a callous way. | *"Must they drive down these infinities of creatures, and slaughter them openly and callously, until the air was salt with blood, until the carrion crows hovered over the city in battalions?"* — Donn Byrne, *The Wind Bloweth* |
| [[callousness]] | noun | **1.** Devoid of passion or feeling; hardheartedness. | *"He remembered with what callousness he had watched her."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[callow]] | adjective | **1.** Young and inexperienced. | *"By the time she got tumbled out into the world, all big men were unquestionable authority and all young men were callow whipper-snappers."* — Algis Budrys, *Citadel* |
| [[callowness]] | noun | **1.** Lacking and evidencing lack of experience of life. | *"In academic literature, callowness designates lacking and evidencing lack of experience of life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calluna]] | noun | **1.** One species. | *"In academic literature, calluna designates one species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[callus]] | noun | **1.** An area of skin that is thick or hard from continual pressure or friction (as the sole of the foot).<br>**2.** Bony tissue formed during the healing of a fractured bone. | *"My knees were callused like my elbows."* — Jack London, *The Jacket (The Star-Rover)* |
| [[calm]] | noun | **1.** Steadiness of mind under stress.<br>**2.** Wind moving at less than 1 knot; 0 on the beaufort scale. | *"Go with me to my tent, where you shall see How hardly I was drawn into this war, How calm and gentle I proceeded still In all my writings."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[calming]] | noun | **1.** The act of appeasing (as by acceding to the demands of).<br>**2.** Make calm or still. | *"Calming himself by an effort, he added— “A servant has had the nightmare; that is all."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[calmly]] | adverb | **1.** With self-possession (especially in times of stress).<br>**2.** In a sedate manner. | *"Teacher told us to be sure not to forget." "Quite right, little school fox," Kurt replied, while he calmly kept on drawing."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[calmness]] | noun | **1.** Steadiness of mind under stress.<br>**2.** An absence of strong winds or rain. | *"I have been i’ th’ marketplace; and, sir, ’tis fit You make strong party or defend yourself By calmness or by absence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[calocarpum]] | noun | **1.** A genus of tropical american trees of the family sapotaceae. | *"In academic literature, calocarpum designates a genus of tropical american trees of the family sapotaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calocedrus]] | noun | **1.** Tall evergreens of western north america and eastern asia; formerly included in genus libocedrus. | *"In academic literature, calocedrus designates tall evergreens of western north america and eastern asia; formerly included in genus libocedrus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calochortus]] | noun | **1.** Large genus of western north american leafy-stemmed bulbous herbs. | *"In academic literature, calochortus designates large genus of western north american leafy-stemmed bulbous herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calomel]] | noun | **1.** A tasteless colorless powder used medicinally as a cathartic. | *"For, my young friends,” suddenly addressing the ’prentices and Guster, to their consternation, “if I am told by the doctor that calomel or castor-oil is good for me, I may naturally ask what is calomel, and what is castor-oil."* — Charles Dickens, *Bleak House* |
| [[caloocan]] | noun | **1.** A suburb of manila in southwestern luzon. | *"In academic literature, caloocan designates a suburb of manila in southwestern luzon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caloosahatchee]] | noun | **1.** A river in southern florida that flows westerly to the gulf of mexico; forms the western end of the cross-florida waterway. | *"In academic literature, caloosahatchee designates a river in southern florida that flows westerly to the gulf of mexico; forms the western end of the cross-florida waterway."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calophyllum]] | noun | **1.** Genus of tropical evergreen trees. | *"Behold, here is a great giant towering above us." And Kapeepeekauila, seeing this, hastened to prune the branches of the kamani tree (_Calophyllum inophyllum_), so that the bluff should grow upward."* — Classic Author, *Hawaiian folk tales* |
| [[calopogon]] | noun | **1.** Terrestrial orchids of north america. | *"In academic literature, calopogon designates terrestrial orchids of north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caloric]] | adjective | **1.** Relating to or associated with heat.<br>**2.** Of or relating to calories in food. | *"Yes, the ocean has indeed circulation, and to promote it, the Creator has caused things to multiply in it—caloric, salt, and animalculae.” When Captain Nemo spoke thus, he seemed altogether changed, and aroused an extraordinary emotion in me."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[calorie]] | noun | **1.** A unit of heat equal to the amount of heat required to raise the temperature of one kilogram of water by one degree at one atmosphere pressure; used by nutritionists to characterize the energy-producing potential in food.<br>**2.** Unit of heat defined as the quantity of heat required to raise the temperature of 1 gram of water by 1 degree centigrade at atmospheric pressure. | *"They even give the quantities of calories of energy required for different sized men."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[calorie-free]] | adjective | **1.** Having relatively few calories. | *"In academic literature, calorie-free designates having relatively few calories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calorifacient]] | adjective | **1.** Producing heat; usually used of foods. | *"In academic literature, calorifacient designates producing heat; usually used of foods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calorific]] | adjective | **1.** Heat-generating. | *"In academic literature, calorific designates heat-generating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calorimeter]] | noun | **1.** A measuring instrument that determines quantities of heat. | *"In academic literature, calorimeter designates a measuring instrument that determines quantities of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calorimetric]] | adjective | **1.** Of or relating to the measurement of heat. | *"In academic literature, calorimetric designates of or relating to the measurement of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calorimetry]] | noun | **1.** Measurement of quantities of heat. | *"In academic literature, calorimetry designates measurement of quantities of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calosoma]] | noun | **1.** Any beetle of the genus calosoma. | *"In academic literature, calosoma designates any beetle of the genus calosoma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calostomataceae]] | noun | **1.** A family of fungi belonging to the order tulostomatales. | *"In academic literature, calostomataceae designates a family of fungi belonging to the order tulostomatales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caltha]] | noun | **1.** A genus of caltha. | *"The other children adorned themselves as best they could with the yellow flowers of the trollius and caltha."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[caltrop]] | noun | **1.** Tropical annual procumbent poisonous subshrub having fruit that splits into five spiny nutlets; serious pasture weed.<br>**2.** A plant of the genus trapa bearing spiny four-pronged edible nutlike fruits. | *"Simon, second son of the Duke of Balmoral.’ Hum! ‘Arms: Azure, three caltrops in chief over a fess sable."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[calumet]] | noun | **1.** A highly decorated ceremonial pipe of amerindians; smoked on ceremonial occasions (especially as a token of peace). | *"THE CALUMET OF PEACE He offered a cigarette to the professor and took one himself."* — James Joyce, *Ulysses* |
| [[calumniate]] | verb | **1.** Charge falsely or with malicious intent; attack the good name and reputation of someone. | *"Sith yet there is a credence in my heart, An esperance so obstinately strong, That doth invert th’attest of eyes and ears; As if those organs had deceptious functions Created only to calumniate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[calumniation]] | noun | **1.** A false accusation of an offense or a malicious misrepresentation of someone's words or actions. | *"Faithful to the true principles of the Federal Union, unconscious of any designs to disturb the harmony of that Union, and anxious only to escape the fangs of despotism, the good people of this commonwealth are regardless of censure or calumniation."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[calumniatory]] | adjective | **1.** (used of statements) harmful and often untrue; tending to discredit or malign. | *"In academic literature, calumniatory designates (used of statements) harmful and often untrue; tending to discredit or malign."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calumnious]] | adjective | **1.** (used of statements) harmful and often untrue; tending to discredit or malign. | *"Wilt thou ever be a foul-mouth’d and calumnious knave?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[calumniously]] | adverb | **1.** In a false and slanderous and defamatory manner; with slander or calumny. | *"In academic literature, calumniously designates in a false and slanderous and defamatory manner; with slander or calumny."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calumny]] | noun | **1.** A false accusation of an offense or a malicious misrepresentation of someone's words or actions.<br>**2.** An abusive attack on a person's character or good name. | *"Be thou as chaste as ice, as pure as snow, thou shalt not escape calumny."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[calycanthaceae]] | noun | **1.** Shrubs or small trees having aromatic bark; the eastern united states and eastern asia. | *"In academic literature, calycanthaceae designates shrubs or small trees having aromatic bark; the eastern united states and eastern asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calycanthus]] | noun | **1.** A magnoliid dicot genus of the family calycanthaceae including: allspice. | *"In academic literature, calycanthus designates a magnoliid dicot genus of the family calycanthaceae including: allspice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calyceal]] | adjective | **1.** Of or relating to or resembling a calyx. | *"In academic literature, calyceal designates of or relating to or resembling a calyx."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calycinal]] | adjective | **1.** Of or relating to or resembling a calyx. | *"In academic literature, calycinal designates of or relating to or resembling a calyx."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calycine]] | adjective | **1.** Of or relating to or resembling a calyx. | *"In academic literature, calycine designates of or relating to or resembling a calyx."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calycle]] | noun | **1.** A group of bracts simulating a calyx as in a carnation or hibiscus.<br>**2.** A small cup-shaped structure (as a taste bud or optic cup or cavity of a coral containing a polyp). | *"In academic literature, calycle designates a group of bracts simulating a calyx as in a carnation or hibiscus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calycled]] | adjective | **1.** Having a calyculus. | *"In academic literature, calycled designates having a calyculus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calycophyllum]] | noun | **1.** Medium to large tropical american trees having shiny reddish-brown shredding bark. | *"In academic literature, calycophyllum designates medium to large tropical american trees having shiny reddish-brown shredding bark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calycular]] | adjective | **1.** Relating to or resembling a calyculus. | *"In academic literature, calycular designates relating to or resembling a calyculus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calyculate]] | adjective | **1.** Having a calyculus. | *"In academic literature, calyculate designates having a calyculus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calyculus]] | noun | **1.** A group of bracts simulating a calyx as in a carnation or hibiscus.<br>**2.** A small cup-shaped structure (as a taste bud or optic cup or cavity of a coral containing a polyp). | *"In academic literature, calyculus designates a group of bracts simulating a calyx as in a carnation or hibiscus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calymmatobacterium]] | noun | **1.** A genus of bacterial rods containing only the one species that causes granuloma inguinale. | *"In academic literature, calymmatobacterium designates a genus of bacterial rods containing only the one species that causes granuloma inguinale."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calypso]] | noun | **1.** Rare north temperate bog orchid bearing a solitary white to pink flower marked with purple at the tip of an erect reddish stalk above 1 basal leaf.<br>**2.** (greek mythology) the sea nymph who detained odysseus for seven years. | *"A mortal sovereign holds her dangerous throne, And thou mayst find a new Calypso there."* — Baron George Gordon Byron Byron, *Childe Harold's Pilgrimage* |
| [[calypter]] | noun | **1.** Scalelike structure between the base of the wing and the halter of a two-winged fly. | *"In academic literature, calypter designates scalelike structure between the base of the wing and the halter of a two-winged fly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calyptra]] | noun | **1.** The hood or cap covering the calyx of certain plants: e.g., the california poppy. | *"In academic literature, calyptra designates the hood or cap covering the calyx of certain plants: e.g., the california poppy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calyptrate]] | adjective | **1.** Having calypters.<br>**2.** Having a calyptra. | *"In academic literature, calyptrate designates having calypters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calystegia]] | noun | **1.** Climbing or scrambling herbs: bindweed. | *"In academic literature, calystegia designates climbing or scrambling herbs: bindweed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calyx]] | noun | **1.** (botany) the whorl of sepals of a flower collectively forming the outer floral envelope or layer of the perianth enclosing and supporting the developing bud; usually green. | *"Her little hands were clasped, and enclosed by Sir James’s as a bud is enfolded by a liberal calyx."* — George Eliot, *Middlemarch* |
| [[decal]] | noun | **1.** Either a design that is fixed to some surface or a paper bearing the design which is to be transferred to the surface. | *"In academic literature, decal designates either a design that is fixed to some surface or a paper bearing the design which is to be transferred to the surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalcification]] | noun | **1.** Loss of calcium from bones or teeth. | *"In academic literature, decalcification designates loss of calcium from bones or teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalcify]] | verb | **1.** Lose calcium or calcium compounds.<br>**2.** Remove calcium or lime from. | *"In academic literature, decalcify designates lose calcium or calcium compounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalcomania]] | noun | **1.** Either a design that is fixed to some surface or a paper bearing the design which is to be transferred to the surface.<br>**2.** The art of transfering designs from specially prepared paper to a wood or glass or metal surface. | *"In academic literature, decalcomania designates either a design that is fixed to some surface or a paper bearing the design which is to be transferred to the surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalescence]] | noun | **1.** Phenomenon that occurs when a metal is being heated and there is a sudden slowing in the rate of temperature increase; slowing is caused by a change in the internal crystal structure of the metal. | *"In academic literature, decalescence designates phenomenon that occurs when a metal is being heated and there is a sudden slowing in the rate of temperature increase; slowing is caused by a change in the internal crystal structure of the metal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalescent]] | adjective | **1.** Absorbing heat without increase in temperature when heated beyond a certain point. | *"In academic literature, decalescent designates absorbing heat without increase in temperature when heated beyond a certain point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decaliter]] | noun | **1.** A metric unit of volume or capacity equal to 10 liters. | *"In academic literature, decaliter designates a metric unit of volume or capacity equal to 10 liters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalitre]] | noun | **1.** A metric unit of volume or capacity equal to 10 liters. | *"In academic literature, decalitre designates a metric unit of volume or capacity equal to 10 liters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decalogue]] | noun | **1.** The biblical commandments of moses. | *"In her decalogue of manners to refuse an apology was an unpardonable sin."* — Anthony Pryde, *Nightfall* |
| [[discalceate]] | adjective | **1.** (used of certain religious orders) barefoot or wearing only sandals. | *"In academic literature, discalceate designates (used of certain religious orders) barefoot or wearing only sandals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[discalced]] | adjective | **1.** (used of certain religious orders) barefoot or wearing only sandals. | *"In academic literature, discalced designates (used of certain religious orders) barefoot or wearing only sandals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[excalibur]] | noun | **1.** The legendary sword of king arthur. | *"His sword-hilt may be rough with jewels, but it is the hilt of an Excalibur."* — Francis Thompson, *Shelley: An Essay* |
| [[incalculable]] | adjective | **1.** Not capable of being computed or enumerated. | *"I have been growing, developing, through incalculable myriads of millenniums."* — Jack London, *The Jacket (The Star-Rover)* |
| [[incalescence]] | noun | **1.** The property of being warming. | *"In academic literature, incalescence designates the property of being warming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intercalary]] | adjective | **1.** Having a day or month inserted to make the calendar year correspond to the solar year:. | *"In academic literature, intercalary designates having a day or month inserted to make the calendar year correspond to the solar year:."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intercalate]] | verb | **1.** Insert (days) in a calendar. | *"In academic literature, intercalate designates insert (days) in a calendar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intercalation]] | noun | **1.** An insertion into a calendar. | *"This gradual revolution of the festal Egyptian cycle resulted from the employment of a calendar year which neither corresponded exactly to the solar year nor was periodically corrected by intercalation."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[miscalculate]] | verb | **1.** Judge incorrectly.<br>**2.** Calculate incorrectly. | *"You miscalculate matters widely, when you forbid my waiting on you, lest it should hurt my worldly concerns."* — Robert Burns, *The Letters of Robert Burns* |
| [[miscalculation]] | noun | **1.** A mistake in calculating. | *"Through miscalculation there may be, at a given moment, too many consumption goods of a particular kind, but the durable applications can find no limit until the inconceivable day when the material world is no longer capable of improvement."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[miscall]] | verb | **1.** Assign in incorrect name to. | *"My heart will sigh when I miscall it so, Which finds it an enforced pilgrimage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[noncaloric]] | adjective | **1.** Of food have no (or few) calories. | *"In academic literature, noncaloric designates of food have no (or few) calories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overcall]] | noun | **1.** (bridge) a bid that is higher than your opponent's bid (especially when your partner has not bid at all and your bid exceeds the value of your hand). | *"In academic literature, overcall designates (bridge) a bid that is higher than your opponent's bid (especially when your partner has not bid at all and your bid exceeds the value of your hand)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[percale]] | noun | **1.** A fine closely woven cotton fabric. | *"In academic literature, percale designates a fine closely woven cotton fabric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recalcitrance]] | noun | **1.** The trait of being unmanageable. | *"In academic literature, recalcitrance designates the trait of being unmanageable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recalcitrancy]] | noun | **1.** The trait of being unmanageable. | *"In academic literature, recalcitrancy designates the trait of being unmanageable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recalcitrant]] | adjective | **1.** Stubbornly resistant to authority or control.<br>**2.** Marked by stubborn resistance to authority. | *"Gloria looked around at those who remained recalcitrant and concentrated her gaze on Stevens."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[recalcitrate]] | verb | **1.** Show strong objection or repugnance; manifest vigorous opposition or resistance; be obstinately disobedient. | *"In academic literature, recalcitrate designates show strong objection or repugnance; manifest vigorous opposition or resistance; be obstinately disobedient."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recalculate]] | verb | **1.** Calculate anew. | *"In academic literature, recalculate designates calculate anew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recalculation]] | noun | **1.** The act of calculating again (usually to eliminate errors or to include additional data). | *"In academic literature, recalculation designates the act of calculating again (usually to eliminate errors or to include additional data)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recall]] | noun | **1.** A request by the manufacturer of a defective product to return the product (as for replacement or repair).<br>**2.** A call to return. | *"But though thou art adjudged to the death, And passed sentence may not be recall’d But to our honour’s great disparagement, Yet will I favour thee in what I can."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scald]] | noun | **1.** A burn cause by hot liquid or steam.<br>**2.** The act of burning with steam or hot water. | *"Saucy lictors Will catch at us like strumpets, and scald rhymers Ballad us out o’ tune."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[secale]] | noun | **1.** Cereal grass widely cultivated for its grain: rye. | *"In academic literature, secale designates cereal grass widely cultivated for its grain: rye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncalled-for]] | adjective | **1.** Not required or requested.<br>**2.** Unnecessary and unwarranted. | *"In academic literature, uncalled-for designates not required or requested."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Fire, Heat & Ash]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CAL
  </div>
</div>
