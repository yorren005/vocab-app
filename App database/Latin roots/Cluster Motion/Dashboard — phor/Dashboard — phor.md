---
status: unread
type: root_dashboard
---
# Dashboard — phor
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">phor-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to carry or bear”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A traveler stepping along a trail or a river flowing smoothly forward.</span>
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

The root **phor** means to carry or bear. It refers to supporting a heavy load, carrying something, or enduring hardship. In English, this root forms words such as *metaphor*, *metaphorical*, *metaphorically*, and *metaphorist*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to carry or bear
> The root **phor** means to carry or bear. It refers to supporting a heavy load, carrying something, or enduring hardship. In English, this root forms words such as *metaphor*, *metaphorical*, *metaphorically*, and *metaphorist*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To carry or bear</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *metaphor* and *metaphorical*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **phor** comes from a Latin word that means *"to carry or bear"*.
  - At its core, it describes the action of carry or bear.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **phor** in an English word, think of **to carry or bear**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to carry or bear).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Metaphor**: A figure of speech in which a word or phrase literally denoting one kind of object or idea is applied to another to suggest an analogy or intrinsic resemblance between them.
  - **Metaphorical**: Characteristic of, relating to, or composed of a metaphor.
  - **Metaphorically**: In a metaphorical manner.
  - **Metaphorist**: A person who invents, employs, or specializes in the use of metaphors.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">phor</mark>, think of <mark class="hl-def">to carry or bear</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **phor** functions in Greek and Neo-Latin word formation through distinct morphological stems, productive agent/process suffixes, and directional prefixes:
> 
> - **Primary Nominal Stem:** `phor-` (Greek φορός, *phoros*, "bearing, bringing; that which carries").
> - **Verbal Stem:** `pherein` (φέρειν, "to carry, bear"), appearing via its frequentative `phorein` (φορεῖν, "to bear continually").
> - **The Agent/Instrumental Suffix `-phore` (`-φόρος`, *-phoros*):** Designates a physical agent, cellular organelle, chemical compound, or apparatus that bears a specific payload:
>   - *phōs* (light) + *-phore* $\to$ **phosphor** / **phosphorus** ("light-bearer")
>   - *sēma* (sign) + *-phore* $\to$ **semaphore** ("sign-bearer")
>   - *chrōma* (color) + *-phore* $\to$ **chromatophore** ("pigment-carrier cell")
>   - *ión* (ion) + *-phore* $\to$ **ionophore** ("ion-transporting molecule")
>   - *aēr* (air) + *-phore* $\to$ **aerophore** ("air-bearing device/tissue")
>   - *rhíza* (root) + *-phore* $\to$ **rhizophore** ("root-bearing organ")
>   - *gónos* (seed/offspring) + *-phore* $\to$ **gonophore** ("reproductive zooid")
> - **The State/Condition Suffix `-phoria` (`-φορία`, *-phoria*):** Denotes a psychological state, bodily condition, or disposition of bearing:
>   - *eu-* (well) + *-phoria* $\to$ **euphoria** ("state of bearing well; buoyant well-being")
>   - *dys-* (badly/ill) + *-phoria* $\to$ **dysphoria** ("state of bearing badly; profound discontent")
>   - *aná-* (up/again) + *-phora* $\to$ **anaphora** ("carrying back; repetition")
>   - *katá-* (down/forward) + *-phora* $\to$ **cataphora** ("carrying downward/forward; forward reference")
>   - *epí-* (upon) + *-phora* $\to$ **epiphora** ("carrying upon; tear overflow")
> - **The Physical Process Suffix `-phoresis` (`-φόρησις`, *-phórēsis*):** Designates continuous physiological, physical, or chemical transmission:
>   - *ēlektron* (electricity) + *-phoresis* $\to$ **electrophoresis** ("carrying charged molecules via electric field")
>   - *diá* (through) + *-phoresis* $\to$ **diaphoresis** ("carrying sweat through the skin pores")
> - **Surgical Compounding `-ectomy` with `-phor-`:**
>   - *ōión* (egg) + *phor-* + *-ectomy* $\to$ **oophorectomy** ("excision of the egg-bearing organ / ovary")

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
> Although the root fundamentally denotes **"bearing, carrying, conveying"**, its operational focus refracts into distinct conceptual planes:
> 
> - **Linguistics, Rhetoric & Discourse Architecture:** Carrying meaning across domains or discourse anchors:
>   - Carrying a concept across semantic boundaries: [[metaphor]], [[metaphorical]], [[metaphorically]], [[metaphorist]].
>   - Carrying reference backward to an antecedent: [[anaphora]], [[anaphoric]], [[anaphorically]].
>   - Carrying reference forward to an upcoming entity: [[cataphora]], [[cataphoric]].
> - **Affective, Psychological & Psychiatric Bearing:** How the conscious mind bears life, pain, or stimulation:
>   - Bearing life with lightness, exhilaration, and supreme joy: [[euphoria]], [[euphoric]], [[euphorically]], [[euphoriant]].
>   - Bearing existence with crushing malaise, anguish, or alienation: [[dysphoria]], [[dysphoric]].
> - **Luminescence, Energetic Emission & Pyrotechnics:** Bearing radiant light, fire, or visual communication:
>   - Bearing cold celestial or chemical light: [[phosphorus]], [[phosphoric]], [[phosphorous]], [[phosphoresce]], [[phosphorescence]], [[phosphorescent]].
>   - Bearing spontaneous ignition or fire upon contact with air: [[pyrophoric]].
>   - Bearing codified visual signs across geographic horizons: [[semaphore]], [[semaphoric]].
> - **Spatial Geometry & Enclosing Bounds:** Carrying a boundary completely around a center:
>   - Carrying a perimeter around a core: [[periphery]], [[peripheral]], [[peripherally]].
> - **Biophysical Transport, Molecular Migration & Secretion:** Transporting charged matter, ions, pigments, or fluids:
>   - Carrying charged macromolecules through a voltage gradient: [[electrophoresis]], [[electrophoretic]], [[electrophoretically]].
>   - Bearing pigment granules within dynamic cellular camouflage: [[chromatophore]].
>   - Bearing and shuttling inorganic ions across hydrophobic lipid membranes: [[ionophore]].
>   - Carrying bodily moisture through the pores in profuse sweat: [[diaphoretic]], [[diaphoresis]].
>   - Carrying a continuous stream of tears over the ocular margin: [[epiphora]].
> - **Organismic Morphology, Botany & Reproductive Anatomy:** Biological structures specialized to bear life-supporting organs or fruits:
>   - Bearing respiratory air to submerged or subterranean tissues: [[aerophore]].
>   - Bearing adventitious roots down into wetland substrates: [[rhizophore]].
>   - Bearing sexual reproductive organs in colonial organisms: [[gonophore]].
>   - Bearing ova/eggs within female mammalian anatomy (and its surgical excision): [[oophorectomy]].
>   - Bearing abundant, mature fruit: [[carpophorous]].

---

## 🔀 4. Prefix & Combining Dynamics on phor

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `meta-` | across, beyond, over | [[metaphor]] | To carry an idea *across* from one semantic domain into another. |
| `eu-` | well, good, pleasant | [[euphoria]] | The state of *bearing well*; an affective condition of intense buoyancy. |
| `dys-` | bad, difficult, painful | [[dysphoria]] | The state of *bearing with difficulty*; profound anguish, malaise, or discontent. |
| `peri-` | around, about, enclosing | [[periphery]] | That which is *carried around* a center; the outer boundary or circumference. |
| `ana-` | up, back, again | [[anaphora]] | A *carrying back* of attention; rhetorical repetition or linguistic back-reference. |
| `cata-` | down, forward, against | [[cataphora]] | A *carrying downward/forward*; pointing forward to an upcoming discourse entity. |
| `epi-` | upon, over, in addition | [[epiphora]] | A *bringing upon*; excessive overflow of tears onto the facial cheek. |
| `dia-` | through, across, completely | [[diaphoresis]] | A *carrying through* the pores; the excretion of profuse perspiration. |
| `pyro-` | fire, heat | [[pyrophoric]] | *Bearing fire*; igniting spontaneously upon exposure to atmospheric air. |
| `chromato-` | color, pigment | [[chromatophore]] | *Bearing color*; a specialized cell that expands or contracts pigment granules. |
| `iono-` | ion, wandering particle | [[ionophore]] | *Bearing ions*; a lipid-soluble molecule that transports ions across membranes. |
| `electro-` | electricity, amber | [[electrophoresis]] | *Carrying via electricity*; molecular migration driven by an applied electric field. |
| `aero-` | air, atmosphere | [[aerophore]] | *Bearing air*; a portable breathing apparatus or plant aeration structure. |
| `rhizo-` | root | [[rhizophore]] | *Bearing roots*; a specialized stem organ giving rise to adventitious roots. |
| `gono-` | seed, generation, offspring | [[gonophore]] | *Bearing reproductive organs*; a zooid carrying gonads in colonial hydrozoans. |
| `oo-` | egg, ovum | [[oophorectomy]] | Excision of the *egg-bearer*; surgical removal of one or both ovaries. |
| `carpo-` | fruit, carpel | [[carpophorous]] | *Bearing fruit*; fruitful, producing or supporting botanical fruit. |
| `sema-` | sign, signal mark | [[semaphore]] | *Bearing signs*; a mechanical or visual apparatus transmitting coded signals. |
| `phos-` | light | [[phosphorus]] | *Bearing light*; an element that emits a cold luminescent glow in the dark. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ore` / `-or` | Agent / Instrument Noun | [[semaphore]], [[phosphor]] | Denotes the concrete apparatus or chemical agent that carries the property. |
| `-ia` | Abstract State Noun | [[euphoria]], [[dysphoria]], [[anaphora]] | Designates an internal condition, psychological disposition, or rhetorical scheme. |
| `-y` | Concrete Perimeter Noun | [[periphery]] | Names the external boundary or circular perimeter enclosing a spatial region. |
| `-esis` | Physical Process Noun | [[electrophoresis]], [[diaphoresis]] | Designates continuous, kinetic transmission or physiological secretion. |
| `-ic` | Descriptive Adjective | [[euphoric]], [[dysphoric]], [[pyrophoric]] | Expresses the quality, character, or symptomatic manifestation of the root. |
| `-ous` | Qualitative / Chemical Adjective | [[phosphorous]], [[carpophorous]] | Denotes abundance of a feature or a lower oxidation state (+3) in chemistry. |
| `-ical` | Extended Analytical Adjective | [[metaphorical]], [[peripheral]] | Characterizes an intellectual, figurative, or structural relationship. |
| `-ically` | Modal / Manner Adverb | [[metaphorically]], [[anaphorically]] | Modifies verbal actions indicating the method or style of conveyance. |
| `-ally` | Spatial / Incidental Adverb | [[peripherally]] | Expresses position on the margin or involvement in a secondary capacity. |
| `-ist` | Agent / Specialist Noun | [[metaphorist]] | Identifies a person who specializes in inventing or analyzing metaphors. |
| `-ant` | Pharmacological Agent Noun | [[euphoriant]] | Designates a chemical substance or drug that actively induces euphoria. |
| `-esce` | Inchoative Verb | [[phosphoresce]] | Denotes the initiation or ongoing action of emitting luminescent light. |
| `-escence` | Luminescent State Noun | [[phosphorescence]] | Names the optical phenomenon of persistent emission after excitation. |
| `-escent` | Luminescent Adjective | [[phosphorescent]] | Describes matter glowing in the dark without producing sensible thermal heat. |
| `-ectomy` | Surgical Excision Noun | [[oophorectomy]] | Names the operative removal of an anatomical organ (specifically the ovary). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🗣️ **Linguistics, Rhetoric & Poetics** | [[metaphor]], [[metaphorical]], [[metaphorically]], [[metaphorist]], [[anaphora]], [[anaphoric]], [[anaphorically]], [[cataphora]], [[cataphoric]] | Figurative language, discourse cohesion, anaphoric pronoun resolution, oratorical cadence in classical speeches. |
| 🧬 **Biochemistry & Molecular Genetics** | [[electrophoresis]], [[electrophoretic]], [[electrophoretically]], [[ionophore]], [[chromatophore]] | DNA gel sizing, SDS-PAGE protein purification, ionophore antibiotics disrupting bacterial gradients, cephalopod camouflage. |
| 🧪 **Chemistry, Pyrotechnics & Materials** | [[phosphorus]], [[phosphoric]], [[phosphorous]], [[phosphoresce]], [[phosphorescence]], [[phosphorescent]], [[pyrophoric]] | White/red phosphorus allotropes, industrial fertilizer synthesis, cathode-ray tube coatings, pyrophoric organometallic handling. |
| 🧠 **Psychiatry & Psychopharmacology** | [[euphoria]], [[euphoric]], [[euphorically]], [[euphoriant]], [[dysphoria]], [[dysphoric]] | Bipolar manic episodes, opioid-induced elation, clinical dysphoria, diagnostic assessment of gender dysphoria. |
| 🚢 **Telecommunications & Maritime Signaling** | [[semaphore]], [[semaphoric]] | Chappe's optical telegraph towers, naval flag signaling between battleships, Dijkstra's concurrency locks in operating systems. |
| 👁️ **Ophthalmology & Emergency Medicine** | [[epiphora]], [[diaphoretic]], [[diaphoresis]] | Lacrimal duct obstruction causing watery eyes, profuse diaphoresis as a hallmark of myocardial infarction and septic shock. |
| 🌿 **Botany & Marine Zoology** | [[rhizophore]], [[aerophore]], [[gonophore]], [[carpophorous]] | Mangrove stilt prop roots, pneumatophore aeration tissues, hydrozoan reproductive zooids, pomological fruit yields. |
| 🏥 **Surgical Oncology & Gynecology** | [[oophorectomy]] | Prophylactic bilateral salpingo-oophorectomy in BRCA gene carriers, surgical management of ovarian neoplasms. |
| 🌐 **Geometry, Computing & Systems** | [[periphery]], [[peripheral]], [[peripherally]] | Peripheral nervous system diagnostics, computer input/output peripheral buses, geopolitical core-periphery dynamics. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anaphora]] | noun | **1.** Using a pronoun or similar word instead of repeating a word used earlier.<br>**2.** Repetition of a word or phrase at the beginning of successive clauses. | *"In academic literature, anaphora designates using a pronoun or similar word instead of repeating a word used earlier."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chromatophore]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin phor within the domain of Motion.<br>**2.** A technical or specialized form exhibiting the properties of phor in systematic terminology. | *"In academic literature, chromatophore designates pertaining to, derived from, or characteristic of latin phor within the domain of motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diaphoresis]] | noun | **1.** The process of the sweat glands of the skin secreting a salty fluid. | *"In academic literature, diaphoresis designates the process of the sweat glands of the skin secreting a salty fluid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diaphoretic]] | noun | **1.** Used to produce perspiration.<br>**2.** Inducing perspiration. | *"He mentioned many diaphoretic medicines in case the first failed, but the unmerciful questioner thus continued, Pray, sir, suppose none of those succeeded, what step would you take next?"* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[dysphoria]] | noun | **1.** Abnormal depression and discontent. | *"In academic literature, dysphoria designates abnormal depression and discontent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dysphoric]] | adjective | **1.** Generalized feeling of distress. | *"In academic literature, dysphoric designates generalized feeling of distress."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrophoresis]] | noun | **1.** The motion of charged particles in a colloid under the influence of an electric field; particles with a positive charge go to the cathode and negative to the anode. | *"In academic literature, electrophoresis designates the motion of charged particles in a colloid under the influence of an electric field; particles with a positive charge go to the cathode and negative to the anode."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrophoretic]] | adjective | **1.** Of or relating to electrophoresis. | *"In academic literature, electrophoretic designates of or relating to electrophoresis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphoria]] | noun | **1.** A feeling of great (usually exaggerated) elation. | *"In academic literature, euphoria designates a feeling of great (usually exaggerated) elation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metaphor]] | noun | **1.** A figure of speech in which an expression is used to refer to something that it does not literally denote in order to suggest a similarity. | *"Indeed, sir, if your metaphor stink, I will stop my nose, or against any man’s metaphor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metaphoric]] | adjective | **1.** Expressing one thing in terms normally denoting another. | *"The builder and maker of this New Jerusalem is God, as we read in the 575:12 book of Hebrews; and it is "a city which hath founda- tions." The description is metaphoric."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[metaphorical]] | adjective | **1.** Expressing one thing in terms normally denoting another. | *"We come still closer to the facts in the less metaphorical terms of the New Testament."* — T. R. Glover, *The Jesus of History* |
| [[metaphorically]] | adverb | **1.** In a metaphorical manner. | *"Whether Young Smallweed (metaphorically called Small and eke Chick Weed, as it were jocularly to express a fledgling) was ever a boy is much doubted in Lincoln’s Inn."* — Charles Dickens, *Bleak House* |
| [[phoradendron]] | noun | **1.** Any of various american parasitic plants similar to old world mistletoe: false mistletoe. | *"In academic literature, phoradendron designates any of various american parasitic plants similar to old world mistletoe: false mistletoe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phoronid]] | noun | **1.** Hermaphrodite wormlike animal living in mud of the sea bottom. | *"In academic literature, phoronid designates hermaphrodite wormlike animal living in mud of the sea bottom."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phoronida]] | noun | **1.** Small phylum of wormlike marine animals. | *"In academic literature, phoronida designates small phylum of wormlike marine animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phoronidea]] | noun | **1.** Small phylum of wormlike marine animals. | *"In academic literature, phoronidea designates small phylum of wormlike marine animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phosphoric]] | adjective | **1.** Containing or characteristic of phosphorus. | *"The pool glittered like a dead man’s eye, and as the world awoke a breeze blew, shaking and elongating the reflection of the moon without breaking it, and turning the image of the star to a phosphoric streak upon the water."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[phosphorous]] | adjective | **1.** Containing or characteristic of phosphorus. | *"In academic literature, phosphorous designates containing or characteristic of phosphorus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phosphorus]] | noun | **1.** A multivalent nonmetallic element of the nitrogen family that occurs commonly in inorganic phosphate rocks and as organic phosphates in all living cells; is highly reactive and occurs in several allotropic forms.<br>**2.** A planet (usually venus) seen just before sunrise in the eastern sky. | *"With such a mind, active as phosphorus, biting everything that came near into the form that suited it, how could Mrs."* — George Eliot, *Middlemarch* |
| [[semaphore]] | noun | **1.** An apparatus for visual signaling with lights or mechanically moving arms.<br>**2.** Send signals by or as if by semaphore. | *"A sailor on her deck began to swing his arms in the curious semaphore language of the sea."* — Fletcher Pratt, *The Onslaught from Rigel* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PHOR
  </div>
</div>
