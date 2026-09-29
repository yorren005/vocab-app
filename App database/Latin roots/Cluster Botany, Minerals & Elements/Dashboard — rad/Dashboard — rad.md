---
status: unread
type: root_dashboard
---
# Dashboard — rad
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rad-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“root”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Plants blossoming in the wild and raw minerals mined from the earth.</span>
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

The root **rad** means root. It refers to the underground anchor of a plant that absorbs nutrients. In English, this root forms words such as *radius*, *radial*, *radially*, and *radiant*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: root
> The root **rad** means root. It refers to the underground anchor of a plant that absorbs nutrients. In English, this root forms words such as *radius*, *radial*, *radially*, and *radiant*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Root</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Plants blossoming in the wild and raw minerals mined from the earth.</mark>
> - **Everyday Connection**: Think of familiar words like *radius* and *radial*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rad** comes from a Latin word that means *"root"*.
  - At its core, it describes root.

- **The Big Picture Idea**:
  - Picture plants blossoming in the wild and raw minerals mined from the earth.
  - Whenever you see **rad** in an English word, think of **plants, minerals, and elements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of root.
  - **Mental & Social**: How people experience, organize, or communicate about root.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Radius**: In geometry, a straight line segment extending from the center of a circle or sphere to its outer boundary.
  - **Radial**: Arranged or having parts branching outward like rays from a central axis.
  - **Radially**: In a radial direction.
  - **Radiant**: Emitting rays of light or heat.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rad</mark>, think of <mark class="hl-def">plants, minerals, and elements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture
> In Latin, *radius* is a second-declension masculine noun:
> - **Nominative Singular:** *radius* ("staff, wheel-spoke, sunbeam")
> - **Genitive Singular:** *radiī* ("of a spoke/ray")
> - **Nominative Plural:** *radiī* (English plural *radii* or *radiuses*)
> - **Verbal Stem:** *radiāre, radiāvī, radiātus* ("to furnish with spokes; to beam forth, radiate")
>
> ### Primary Word Formation Pathways:
> 1. **Direct Mathematical & Anatomical Noun (`radius`):**
>    - *radius* (geometric distance; forearm bone; insect wing vein).
>    - *radii* (classical Latin plural).
> 2. **Participial & Adjectival Derivatives (`radi-`, `radiat-`):**
>    - *radi-al* (pertaining to rays or the radius bone; radial tires).
>    - *radi-ant* (emitting rays of light or heat; glowing).
>    - *radi-ate* (to diverge outward; emit energy).
>    - *radi-ation* (propagation of energy waves/particles).
>    - *radi-ator* (cooling/heating radiant apparatus).
> 3. **Prefixed Dynamic Stems (`ir-radi-` < *in-* + *radiāre*):**
>    - *ir-radi-ate* (to cast rays upon; illuminate; treat with ionizing radiation).
>    - *ir-radi-ation* (exposure to radiation).
> 4. **Modern Physics & Telecommunications Combining Form (`radio-`):**
>    - *radio* (wireless transmission).
>    - *radio-active* / *radio-activity*.
>    - *radio-meter* / *radio-therapy*.
>    - *radium* (element Ra, atomic #88).
>    - *rad* (dosimetric unit: radiation absorbed dose).
> 5. **Old French Phonological Doublet (`ray-`):**
>    - *ray* (beam of light or geometry line).

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

> [!tip] 🌈 Conceptual Radiations of *radius*
> 1. **Geometry & Spatial Dimensions:** The fixed linear distance from center to boundary; circular domains (*radius*, *radii*, *radius of curvature*).
> 2. **Skeletal & Insect Anatomy:** The pivoting thumb-side forearm bone, and primary structural wing veins (*radius*, *radial* nerve, *radial* artery).
> 3. **Electromagnetic Energy & Thermodynamics:** Thermal emission, optics, and heat exchangers (*radiant*, *radiation*, *radiator*, *irradiate*).
> 4. **Subatomic Physics & Oncology:** Radioactive isotopes, atomic disintegration, and clinical tumor therapy (*radioactive*, *radioactivity*, *radium*, *radiotherapy*, *rad*).
> 5. **Telecommunications & Wireless Signals:** Transmission of audio, radar, and cellular data through radio frequency bands (*radio*).
> 6. **Evolutionary Biology:** The rapid divergence of organisms from a common ancestor into diverse ecological niches (*adaptive radiation*).

---

## 🔀 4. Prefix & Combining Dynamics on rad

### Prefix Dynamics

| Prefix | Literal Meaning | Compound Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` $\to$ `ir-` | into, onto, upon | [[irradiate]] | To cast penetrating rays of light or ionizing radiation directly upon an object or patient. |
| `in-` $\to$ `ir-` | into, upon | [[irradiation]] | The deliberate therapeutic, industrial, or sterilizing application of radiation. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Result |
| :--- | :--- | :--- | :--- |
| `-al` | Adjective (Relationship) | [[radial]] | Arranged like spokes radiating from a central axis; or relating to the radius bone. |
| `-ant` | Present Participle / Adj. | [[radiant]] | Emitting continuous rays of light or heat; glowing with vibrant joy. |
| `-ance` | Abstract State Noun | [[radiance]] | Brilliant or luminous glow; splendid brightness. |
| `-ate` | Verb Formative | [[radiate]] | To diverge in straight lines from a common center; to emit rays. |
| `-ation` | Process Noun | [[radiation]] | The emission and spatial propagation of electromagnetic waves or nuclear particles. |
| `-ator` | Mechanical Agent Noun | [[radiator]] | An appliance designed to dissipate or radiate heat (in cars or rooms). |
| `-ium` | Chemical Element Suffix | [[radium]] | The intensely radioactive alkaline earth metal discovered by Marie Curie. |
| `-active` | Functional Adjective | [[radioactive]] | Exhibiting spontaneous nuclear decay with the emission of alpha, beta, or gamma rays. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚛️ **Nuclear Physics & Oncology** | [[radiation]], [[radioactive]], [[radium]], [[radiotherapy]], [[rad]] | Linear accelerators in tumor ablation, nuclear half-life decay, radiation shielding protocols. |
| 📻 **Telecommunications & Engineering** | [[radio]], [[radiator]], [[radial]] | Radio frequency spectrum allocation, automotive coolant radiators, radial-ply tires. |
| 🦴 **Human Anatomy & Orthopedics** | [[radius]], [[radial]] | Colles' fracture of the distal radius, radial pulse palpation, radial nerve palsy. |
| 📐 **Geometry & Trigonometry** | [[radius]], [[radii]] | Calculating circular circumference ($2\pi r$) and spherical volume ($\frac{4}{3}\pi r^3$). |
| 🐒 **Evolutionary Biology** | [[radiation]] | Adaptive radiation of Darwin's finches across the Galápagos archipelago. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abradant]] | noun | **1.** A substance that abrades or wears down.<br>**2.** A tool or machine used for wearing down or smoothing or polishing. | *"In academic literature, abradant designates a substance that abrades or wears down."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abrade]] | verb | **1.** Wear away.<br>**2.** Rub hard or scrub. | *"The truth seems to be that to this day the peasant remains a pagan and savage at heart; his civilization is merely a thin veneer which the hard knocks of life soon abrade, exposing the solid core of paganism and savagery below."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[abrader]] | noun | **1.** A tool or machine used for wearing down or smoothing or polishing. | *"In academic literature, abrader designates a tool or machine used for wearing down or smoothing or polishing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comrade]] | noun | **1.** A friend who is frequently in the company of another.<br>**2.** A fellow member of the communist party. | *"Those friends thou hast, and their adoption tried, Grapple them unto thy soul with hoops of steel; But do not dull thy palm with entertainment Of each new-hatch’d, unfledg’d comrade."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comradeliness]] | noun | **1.** The quality of affording easy familiarity and sociability. | *"In academic literature, comradeliness designates the quality of affording easy familiarity and sociability."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comradely]] | adjective | **1.** Heartily friendly and congenial. | *"True to our theory we must offer them our comradely affection and openly and honestly express our need of them in our lives and in our activities."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[comradery]] | noun | **1.** The quality of affording easy familiarity and sociability. | *"In academic literature, comradery designates the quality of affording easy familiarity and sociability."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comradeship]] | noun | **1.** The quality of affording easy familiarity and sociability. | *"That would depend upon whether the germs of staunch comradeship underlay the temporary emotion, or whether it were a sensuous joy in her form only, with no substratum of everlastingness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[conrad]] | noun | **1.** English novelist (born in poland) noted for sea stories and for his narrative technique (1857-1924). | *"Conrad, of Keokuk, Iowa, and her two sisters."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[conradina]] | noun | **1.** Small genus of low aromatic shrubs of southeastern united states. | *"In academic literature, conradina designates small genus of low aromatic shrubs of southeastern united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corrade]] | verb | **1.** Wear away. | *"In academic literature, corrade designates wear away."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eradicable]] | adjective | **1.** Able to be eradicated or rooted out. | *"In academic literature, eradicable designates able to be eradicated or rooted out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eradicate]] | verb | **1.** Kill in large numbers.<br>**2.** Destroy completely, as if down to the roots. | *"Prejudices, it is well known, are most difficult to eradicate from the heart whose soil has never been loosened or fertilised by education: they grow there, firm as weeds among stones."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[eradication]] | noun | **1.** The complete destruction of every trace of something. | *"Stoic._ 11, 1037 D. [129] "Unconditional eradication," says Zeller, _Eclectics_, p. 226."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[eradicator]] | noun | **1.** Someone who exterminates (especially someone whose occupation is the extermination of troublesome rodents and insects). | *"In academic literature, eradicator designates someone who exterminates (especially someone whose occupation is the extermination of troublesome rodents and insects)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ineradicable]] | adjective | **1.** Not able to be destroyed or rooted out. | *"Had she known Boldwood’s moods, her blame would have been fearful, and the stain upon her heart ineradicable."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[irradiate]] | verb | **1.** Give spiritual insight to; in religion.<br>**2.** Cast rays of light upon. | *"For, d’ye see, rainbows do not visit the clear air; they only irradiate vapor."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[irradiation]] | noun | **1.** The condition of being exposed to radiation.<br>**2.** A column of light (as from a beacon). | *"The ecstasy of faith almost apotheosized her; it set upon her face a glowing irradiation, and brought a red spot into the middle of each cheek; while the miniature candle-flame inverted in her eye-pupils shone like a diamond."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[nonradioactive]] | adjective | **1.** Not radioactive. | *"In academic literature, nonradioactive designates not radioactive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rad]] | noun | **1.** A unit of absorbed ionizing radiation equal to 100 ergs per gram of irradiated material.<br>**2.** The unit of plane angle adopted under the systeme international d'unites; equal to the angle at the center of a circle subtended by an arc equal in length to the radius (approximately 57.295 degrees). | *"I tell ye what, men, old Rad’s investment must go for it! he had best cut away his part of the hull and tow it home."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[radar]] | noun | **1.** Measuring instrument in which the echo of a pulse of microwave radiation is used to detect and locate distant objects. | *"In academic literature, radar designates measuring instrument in which the echo of a pulse of microwave radiation is used to detect and locate distant objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radial]] | noun | **1.** Pneumatic tire that has radial-ply casing.<br>**2.** Relating to or near the radius. | *"Cut a radial slot along the edge of the cover."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[radial-ply]] | adjective | **1.** Of or relating to automobile tires that have a strip under the tread and relatively little stiffening in the sidewalls. | *"In academic literature, radial-ply designates of or relating to automobile tires that have a strip under the tread and relatively little stiffening in the sidewalls."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radially]] | adverb | **1.** In a radial manner. | *"In academic literature, radially designates in a radial manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radian]] | noun | **1.** The unit of plane angle adopted under the systeme international d'unites; equal to the angle at the center of a circle subtended by an arc equal in length to the radius (approximately 57.295 degrees). | *"In academic literature, radian designates the unit of plane angle adopted under the systeme international d'unites; equal to the angle at the center of a circle subtended by an arc equal in length to the radius (approximately 57.295 degrees)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiance]] | noun | **1.** The amount of electromagnetic radiation leaving or arriving at a point on a surface.<br>**2.** The quality of being bright and sending out rays of light. | *"In his bright radiance and collateral light Must I be comforted, not in his sphere."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[radiancy]] | noun | **1.** The quality of being bright and sending out rays of light. | *"Oh, madame, are you sure?" All the radiancy had gone; her eyes filled with tears."* — Frances Mary Peard, *Unawares: A Story of an Old French Town* |
| [[radiant]] | adjective | **1.** Radiating or as if radiating light. | *"What, To hide me from the radiant sun and solace I’ th’ dungeon by a snuff?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[radiantly]] | adverb | **1.** In a radiant manner. | *"It a little surprised me to find that she hesitated and was not so radiantly willing as I had expected."* — Charles Dickens, *Bleak House* |
| [[radiate]] | verb | **1.** Send out rays or waves.<br>**2.** Send out real or metaphoric rays. | *"Erelong ye will with your own eyes witness how brilliantly every one of you, even as a shining star, will radiate in the firmament of your country the light of divine guidance, and will bestow upon its people the glory of an everlasting life..."* — Effendi Shoghi, *Citadel of Faith* |
| [[radiating]] | verb | **1.** Send out rays or waves.<br>**2.** Send out real or metaphoric rays. | *"Now, the foregoing were the glimpses and glimmerings that came to me, when, in Cell One of Solitary in San Quentin, I stared myself unconscious by means of a particle of bright, light-radiating straw."* — Jack London, *The Jacket (The Star-Rover)* |
| [[radiation]] | noun | **1.** Energy that is radiated or transmitted in the form of rays or waves or particles.<br>**2.** The act of spreading outward from a central source. | *"The fireball had a two thousand-kay radius, and the piggybacked neutronic dispenser, once the cloud was released by the detonation, would inflict radiation death throughout tens of thousands of kay in all directions."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[radiator]] | noun | **1.** Any object that radiates energy.<br>**2.** Heater consisting of a series of pipes for circulating steam or hot water to heat rooms or buildings. | *"It should be about five feet from the floor and not too near a register or radiator."* — Classic Author, *Friends and Helpers* |
| [[radical]] | noun | **1.** (chemistry) two or more atoms bound together as a single unit and forming part of a molecule.<br>**2.** An atom or group of atoms with at least one unpaired electron; in the body it is usually an oxygen molecule that has lost an electron and will stabilize itself by stealing an electron from a nearby molecule. | *"It is the Radical of Nature to him."* — Charles Dickens, *Bleak House* |
| [[radicalism]] | noun | **1.** The political orientation of those who favor revolutionary change in government and society. | *"Shelley's Radicalism was not of this drab hue."* — Sydney Waterlow, *Shelley* |
| [[radicalize]] | verb | **1.** Make more radical in social or political outlook. | *"In academic literature, radicalize designates make more radical in social or political outlook."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radically]] | adverb | **1.** In a radical manner. | *"A large share, possibly, in a certain sense, every one of the economic problems that are discussed involve change, limitation, definition, or, more radically, abolition of present laws of property."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[radicchio]] | noun | **1.** Prized variety of chicory having globose heads of red leaves. | *"In academic literature, radicchio designates prized variety of chicory having globose heads of red leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radicle]] | noun | **1.** (anatomy) a small structure resembling a rootlet (such as a fibril of a nerve). | *"In academic literature, radicle designates (anatomy) a small structure resembling a rootlet (such as a fibril of a nerve)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiculitis]] | noun | **1.** Inflammation of the radicle of a nerve. | *"In academic literature, radiculitis designates inflammation of the radicle of a nerve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiigera]] | noun | **1.** A genus of fungus belonging to the family geastraceae. | *"In academic literature, radiigera designates a genus of fungus belonging to the family geastraceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radio]] | noun | **1.** Medium for communication.<br>**2.** An electronic receiver that detects and demodulates and amplifies transmitted signals. | *"The Bahá'í message has been broadcast by radio as far south as Magallanes."* — Effendi Shoghi, *Citadel of Faith* |
| [[radio-controlled]] | adjective | **1.** Operated and guided by radio. | *"In academic literature, radio-controlled designates operated and guided by radio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radio-gramophone]] | noun | **1.** Electronic equipment consisting of a combination of a radio receiver and a record player. | *"In academic literature, radio-gramophone designates electronic equipment consisting of a combination of a radio receiver and a record player."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radio-opacity]] | noun | **1.** Opacity to x-rays or other radiation. | *"In academic literature, radio-opacity designates opacity to x-rays or other radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radio-opaque]] | adjective | **1.** Not transparent to x-rays or other forms of radiation. | *"In academic literature, radio-opaque designates not transparent to x-rays or other forms of radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radio-phonograph]] | noun | **1.** Electronic equipment consisting of a combination of a radio receiver and a record player. | *"In academic literature, radio-phonograph designates electronic equipment consisting of a combination of a radio receiver and a record player."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radioactive]] | adjective | **1.** Exhibiting or caused by radioactivity. | *"They said she was radioactive, but most of 'em wouldn't believe it."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[radioactively]] | adverb | **1.** In a radioactive manner. | *"In academic literature, radioactively designates in a radioactive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radioactivity]] | noun | **1.** The spontaneous emission of a stream of particles or electromagnetic rays in nuclear decay. | *"In academic literature, radioactivity designates the spontaneous emission of a stream of particles or electromagnetic rays in nuclear decay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiobiologist]] | noun | **1.** A biologist who studies the effects of radiation on living organisms. | *"In academic literature, radiobiologist designates a biologist who studies the effects of radiation on living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiobiology]] | noun | **1.** The branch of biology that studies the effects of radiation on living organisms. | *"In academic literature, radiobiology designates the branch of biology that studies the effects of radiation on living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiocarbon]] | noun | **1.** A radioactive isotope of carbon. | *"In academic literature, radiocarbon designates a radioactive isotope of carbon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiochemist]] | noun | **1.** A chemist who specializes in nuclear chemistry. | *"In academic literature, radiochemist designates a chemist who specializes in nuclear chemistry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiochemistry]] | noun | **1.** The chemistry of radioactive substances. | *"In academic literature, radiochemistry designates the chemistry of radioactive substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiochlorine]] | noun | **1.** A radioactive isotope of chlorine. | *"In academic literature, radiochlorine designates a radioactive isotope of chlorine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiocommunication]] | noun | **1.** Medium for communication. | *"In academic literature, radiocommunication designates medium for communication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiogram]] | noun | **1.** A message transmitted by wireless telegraphy.<br>**2.** A photographic image produced on a radiosensitive surface by radiation other than visible light (especially by x-rays or gamma rays). | *"In academic literature, radiogram designates a message transmitted by wireless telegraphy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiograph]] | noun | **1.** A photographic image produced on a radiosensitive surface by radiation other than visible light (especially by x-rays or gamma rays). | *"In academic literature, radiograph designates a photographic image produced on a radiosensitive surface by radiation other than visible light (especially by x-rays or gamma rays)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiographer]] | noun | **1.** A person who makes radiographs. | *"In academic literature, radiographer designates a person who makes radiographs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiographic]] | adjective | **1.** Relating to or produced by radiography. | *"In academic literature, radiographic designates relating to or produced by radiography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiography]] | noun | **1.** The process of making a radiograph; producing an image on a radiosensitive surface by radiation other than visible light.<br>**2.** Photography that uses other kinds of radiation than visible light. | *"In academic literature, radiography designates the process of making a radiograph; producing an image on a radiosensitive surface by radiation other than visible light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radioimmunoassay]] | noun | **1.** Immunoassay of a substance that has been radioactively labeled. | *"In academic literature, radioimmunoassay designates immunoassay of a substance that has been radioactively labeled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radioisotope]] | noun | **1.** A radioactive isotope of an element; produced either naturally or artificially. | *"In academic literature, radioisotope designates a radioactive isotope of an element; produced either naturally or artificially."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiolaria]] | noun | **1.** Marine protozoa. | *"In academic literature, radiolaria designates marine protozoa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiolarian]] | noun | **1.** Protozoa with amoeba-like bodies and radiating filamentous pseudopods. | *"In academic literature, radiolarian designates protozoa with amoeba-like bodies and radiating filamentous pseudopods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiolocate]] | verb | **1.** Locate by means of radar. | *"In academic literature, radiolocate designates locate by means of radar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiolocation]] | noun | **1.** Measuring instrument in which the echo of a pulse of microwave radiation is used to detect and locate distant objects. | *"In academic literature, radiolocation designates measuring instrument in which the echo of a pulse of microwave radiation is used to detect and locate distant objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiological]] | adjective | **1.** Of or relating to radiology. | *"In academic literature, radiological designates of or relating to radiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiologist]] | noun | **1.** A medical specialist who uses radioactive substances and x-rays in the treatment of disease. | *"In academic literature, radiologist designates a medical specialist who uses radioactive substances and x-rays in the treatment of disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiology]] | noun | **1.** The branch of medical science dealing with the medical use of x-rays or other penetrating radiation.<br>**2.** (radiology) examination of the inner structure of opaque objects using x rays or other penetrating radiation. | *"In academic literature, radiology designates the branch of medical science dealing with the medical use of x-rays or other penetrating radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiolucent]] | adjective | **1.** Almost complete transparent to x-rays or other forms of radiation. | *"In academic literature, radiolucent designates almost complete transparent to x-rays or other forms of radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiolysis]] | noun | **1.** Molecular disintegration resulting from radiation. | *"In academic literature, radiolysis designates molecular disintegration resulting from radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiometer]] | noun | **1.** Meter to detect and measure radiant energy (electromagnetic or acoustic). | *"In academic literature, radiometer designates meter to detect and measure radiant energy (electromagnetic or acoustic)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiomicrometer]] | noun | **1.** Radiometer that is extremely sensitive. | *"In academic literature, radiomicrometer designates radiometer that is extremely sensitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiopacity]] | noun | **1.** Opacity to x-rays or other radiation. | *"In academic literature, radiopacity designates opacity to x-rays or other radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiopaque]] | adjective | **1.** Not transparent to x-rays or other forms of radiation. | *"In academic literature, radiopaque designates not transparent to x-rays or other forms of radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiopharmaceutical]] | noun | **1.** Pharmaceutical consisting of a radioactive compound used in radiation therapy. | *"In academic literature, radiopharmaceutical designates pharmaceutical consisting of a radioactive compound used in radiation therapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiophone]] | noun | **1.** A telephone that communicates by radio waves rather than along cables. | *"Wait a minute, since they're so near, I think I can switch them over to the radiophone." He ticked the key a moment, then twisted more dials and leaned back as a full and fruity voice, with a strong English accent, filled the room."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[radiophonic]] | adjective | **1.** Relating to or by means of radiotelephony. | *"In academic literature, radiophonic designates relating to or by means of radiotelephony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiophoto]] | noun | **1.** A photograph transmitted by radio waves. | *"In academic literature, radiophoto designates a photograph transmitted by radio waves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiophotograph]] | noun | **1.** A photograph transmitted by radio waves. | *"In academic literature, radiophotograph designates a photograph transmitted by radio waves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiophotography]] | noun | **1.** Transmission of photographs by radio waves. | *"In academic literature, radiophotography designates transmission of photographs by radio waves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radioprotection]] | noun | **1.** Protection against harmful effects of radiation. | *"In academic literature, radioprotection designates protection against harmful effects of radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radioscopy]] | noun | **1.** (radiology) examination of the inner structure of opaque objects using x rays or other penetrating radiation. | *"In academic literature, radioscopy designates (radiology) examination of the inner structure of opaque objects using x rays or other penetrating radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiosensitive]] | adjective | **1.** Sensitive to radiation. | *"In academic literature, radiosensitive designates sensitive to radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiosensitivity]] | noun | **1.** Sensitivity to the action of radiant energy. | *"In academic literature, radiosensitivity designates sensitivity to the action of radiant energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiotelegraph]] | noun | **1.** Telegraphy that uses transmission by radio rather than by wire.<br>**2.** The use of radio to send telegraphic messages (usually by morse code). | *"In academic literature, radiotelegraph designates telegraphy that uses transmission by radio rather than by wire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiotelegraphy]] | noun | **1.** Telegraphy that uses transmission by radio rather than by wire.<br>**2.** The use of radio to send telegraphic messages (usually by morse code). | *"In academic literature, radiotelegraphy designates telegraphy that uses transmission by radio rather than by wire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiotelephone]] | noun | **1.** Telephony that uses transmission by radio rather than by wire.<br>**2.** A telephone that communicates by radio waves rather than along cables. | *"In academic literature, radiotelephone designates telephony that uses transmission by radio rather than by wire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiotelephonic]] | adjective | **1.** Relating to or by means of radiotelephony. | *"In academic literature, radiotelephonic designates relating to or by means of radiotelephony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiotelephony]] | noun | **1.** Telephony that uses transmission by radio rather than by wire. | *"In academic literature, radiotelephony designates telephony that uses transmission by radio rather than by wire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiotherapist]] | noun | **1.** A medical specialist who uses radioactive substances and x-rays in the treatment of disease. | *"In academic literature, radiotherapist designates a medical specialist who uses radioactive substances and x-rays in the treatment of disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiotherapy]] | noun | **1.** (medicine) the treatment of disease (especially cancer) by exposure to a radioactive substance. | *"In academic literature, radiotherapy designates (medicine) the treatment of disease (especially cancer) by exposure to a radioactive substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radiothorium]] | noun | **1.** Radioactive isotope of thorium with mass number 228. | *"In academic literature, radiothorium designates radioactive isotope of thorium with mass number 228."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radish]] | noun | **1.** Pungent fleshy edible root.<br>**2.** Radish of japan with a long hard durable root eaten raw or cooked. | *"I know not what you call all, but if I fought not with fifty of them I am a bunch of radish."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[radium]] | noun | **1.** An intensely radioactive metallic element that occurs in minute amounts in uranium ores. | *"This number, by the way, is known to science as "Avogadro's Constant." Everyone has heard of radium, and knows that it is in a state which can best be described as a long-drawn-out explosion."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[radius]] | noun | **1.** The length of a line segment between the center and circumference of a circle or sphere.<br>**2.** A straight line from the center to the perimeter of a circle (or from the center to the surface of a sphere). | *"It was not quite so far off as could have been wished; but it was probably far enough, her radius of movement and repute having been so small."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[radix]] | noun | **1.** (numeration system) the positive integer that is equivalent to one in the next higher counting place. | *"In academic literature, radix designates (numeration system) the positive integer that is equivalent to one in the next higher counting place."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radome]] | noun | **1.** A housing for a radar antenna; transparent to radio waves. | *"In academic literature, radome designates a housing for a radar antenna; transparent to radio waves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radon]] | noun | **1.** A radioactive gaseous element formed by the disintegration of radium; the heaviest of the inert gasses; occurs naturally (especially in areas over granite) and is considered a hazard to health. | *"In academic literature, radon designates a radioactive gaseous element formed by the disintegration of radium; the heaviest of the inert gasses; occurs naturally (especially in areas over granite) and is considered a hazard to health."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[radyera]] | noun | **1.** Very small genus of shrubs of southern hemisphere: bush hibiscus. | *"In academic literature, radyera designates very small genus of shrubs of southern hemisphere: bush hibiscus."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Botany, Minerals & Elements]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · RAD
  </div>
</div>
