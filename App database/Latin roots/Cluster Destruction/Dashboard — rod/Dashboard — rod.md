---
status: unread
type: root_dashboard
---
# Dashboard — rod
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rod-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to gnaw”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A fragile stone pillar snapping under pressure and crumbling into fragments.</span>
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

The root **rod** means to gnaw. It refers to the action of gnawing and carrying out this process. In English, this root forms words such as *corrode*, *corrosion*, *corrosive*, and *corrosively*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to gnaw
> The root **rod** means to gnaw. It refers to the action of gnawing and carrying out this process. In English, this root forms words such as *corrode*, *corrosion*, *corrosive*, and *corrosively*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To gnaw</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A fragile stone pillar snapping under pressure and crumbling into fragments.</mark>
> - **Everyday Connection**: Think of familiar words like *corrode* and *corrosion*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rod** comes from a Latin word that means *"to gnaw"*.
  - At its core, it describes the action of gnaw.

- **The Big Picture Idea**:
  - Picture a fragile stone pillar snapping under pressure and crumbling into fragments.
  - Whenever you see **rod** in an English word, think of **to gnaw**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to gnaw).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Corrode**: To wear away, dissolve, or eat away gradually, especially by chemical or electrochemical action.
  - **Corrosion**: The gradual destruction, oxidation, or wearing away of a substance by chemical reaction with its environment.
  - **Corrosive**: Having the property of eating away, destroying, or dissolving other materials chemically.
  - **Corrosively**: In a corrosive, chemically destructive, or biting manner.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rod</mark>, think of <mark class="hl-def">to gnaw</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **rod** operates across three morphological stems:
> - **Present Verbal Base `rod-` (Latin *rōdere*):**
>   - Chemical prefix `con-` (`cor-`): Latin *corrōdere* → English [[corrode]] → [[corrodible]] → [[incorrodible]].
>   - Geological prefix `ex-` (`e-`): Latin *ērōdere* → English [[erode]].
>   - Participial nominalization: Latin *rōdēns* → English [[rodent]] → taxonomic [[Rodentia]].
>   - Compound with *-cide* ("killing"): *rodent + -cide* → English [[rodenticide]].
> - **Participial / Past Stem `ros-` (Latin *rōsum*):**
>   - Chemical process noun: Latin *corrōsiō* → English [[corrosion]].
>   - Chemical adjective: Medieval Latin *corrōsīvus* → English [[corrosive]] → [[corrosively]] → [[corrosiveness]].
>   - Geological process noun: Latin *ērōsiō* → English [[erosion]].
>   - Geological adjective: *eros- + -ive* → English [[erosive]] → [[erosively]] → [[erosiveness]].
> - **Instrumental Stem `rostr-` (Latin *rōstrum* < *rōd-* + *-trum*):**
>   - Platform noun: Latin *rōstrum* (plural *rōstra*) → English [[rostrum]] → [[rostra]].
>   - Anatomical adjective: *rostr- + -al* → English [[rostral]] → [[rostrally]].
>   - Botanical/Zoological beaked adjective: Latin *rōstrātus* → English [[rostrate]].

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
> Although anchored in **"gnawing"**, the derivatives of `rod` operate in four sharply distinct modern environments:
> - **Materials Science, Metallurgy & Chemical Engineering:** In [[corrode]], [[corrosion]], and [[corrosive]], the root denotes the electrochemical degradation of metals, structural rebar deterioration in bridges, and battery acid burns.
> - **Geomorphology, Pedology & Earth Sciences:** In [[erode]], [[erosion]], and [[erosive]], the root tracks the kinetic removal of topsoil, coastal cliff retreats, glacial gouging, and the formation of river canyons.
> - **Mammalogy, Veterinary Science & Pest Control:** In [[rodent]], [[Rodentia]], and [[rodenticide]], the root names the most diverse mammalian order on Earth (over 40% of all mammal species), defined by continuously growing rootless incisors requiring constant gnawing.
> - **Public Oratory & Historical Architecture:** In [[rostrum]] and [[rostra]], the captured naval ram becomes the universal symbol for political speech, debate lecterns, and conductor podiums.
> - **Neuroanatomy & Embryology:** In [[rostral]] and [[rostrally]], the root provides the primary anatomical directional axis pointing toward the nose/snout, contrasted with *caudal* (toward the tail).

---

## 🔀 4. Prefix & Combining Dynamics on rod

### Prefix Dynamics (Chemical & Directional Shifts)

| Prefix / Combining Element | Classical Meaning | Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` (`cor-` by assimilation) | thoroughly, completely | [[corrode]], [[corrosion]], [[corrosive]] | To gnaw completely into dust; chemical degradation of metal. |
| `ex-` (`e-` before *r*) | out, away from, hollowing | [[erode]], [[erosion]], [[erosive]] | To gnaw out from within; wearing away surface soil or rock by water/wind. |
| `-cide` (Latin *caedere*) | killer, slayer | [[rodenticide]] | A chemical agent designed to kill gnawing rodents. |
| *(bare instrumental)* | tool suffix *-trum* | [[rostrum]], [[rostral]] | That which gnaws/pecks; a beak, warship ram, or speaker's platform. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| `-ent` (Latin *-ēns*) | Present Participle / Noun | [[rodent]] | A gnawing creature; characterized by chisel incisors. |
| `-ion` (Latin *-iō*) | Noun (Process / State) | [[corrosion]], [[erosion]] | The continuous action or effect of gnawing away. |
| `-ive` (Latin *-īvus*) | Adjective (Active Power) | [[corrosive]], [[erosive]] | Having the chemical or kinetic power to eat away surfaces. |
| `-al` (Latin *-ālis*) | Directional Adjective | [[rostral]] | Situated toward the beak, snout, or anterior pole. |
| `-ate` (Latin *-ātus*) | Adjective (Morphology) | [[rostrate]] | Bearing a beak-like snout or elongated process. |
| `-ible` (Latin *-ibilis*) | Adjective (Susceptibility) | [[corrodible]], [[incorrodible]] | Capable or incapable of undergoing chemical corrosion. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏗️ **Civil Engineering & Infrastructure** | [[corrosion]], [[corrode]], [[incorrodible]] | Galvanic corrosion of steel bridges, cathodic protection with zinc sacrificial anodes, chloride-induced rebar corrosion in marine concrete. |
| 🌍 **Geology & Soil Conservation** | [[erosion]], [[erode]], [[erosive]] | Topsoil runoff in industrial agriculture, gully erosion, wave-cut coastal platforms, wind-blown loess deposits in the Dust Bowl. |
| 🐀 **Mammalian Biology & Public Health** | [[rodent]], [[Rodentia]], [[rodenticide]] | Dental morphology of murine and sciurid rodents, public health control of anticoagulant rodenticides against *Rattus norvegicus*. |
| 🧠 **Neuroanatomy & Cognitive Science** | [[rostral]], [[rostrally]] | The rostral-caudal neuraxis, rostral ventrolateral medulla (RVLM) blood pressure control, rostral anterior cingulate cortex in pain processing. |
| 🏛️ **Classical Rhetoric & Politics** | [[rostrum]], [[rostra]] | Addressing the citizenry from the speaker's rostrum, congressional debate podiums, historical memory of the Punic naval battles. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[acrodont]] | noun | **1.** An animal having teeth consolidated with the summit of the alveolar ridge without sockets. | *"In academic literature, acrodont designates an animal having teeth consolidated with the summit of the alveolar ridge without sockets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corrode]] | verb | **1.** Cause to deteriorate due to the action of water, air, or an acid.<br>**2.** Become destroyed by water, air, or a corrosive such as an acid. | *"Some minds corrode, and grow inactive, under the loss of personal liberty; others grow morbid and irritable; but it is the nature of the poet to become tender and imaginative in the loneliness of confinement."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[corroded]] | verb | **1.** Cause to deteriorate due to the action of water, air, or an acid.<br>**2.** Become destroyed by water, air, or a corrosive such as an acid. | *"It so chanced that almost upon first cutting into him with the spade, the entire length of a corroded harpoon was found imbedded in his flesh, on the lower part of the bunch before described."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[corrodentia]] | noun | **1.** An order of insects: includes booklice and bark-lice. | *"In academic literature, corrodentia designates an order of insects: includes booklice and bark-lice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corroding]] | noun | **1.** Erosion by chemical action.<br>**2.** Cause to deteriorate due to the action of water, air, or an acid. | *"While his heart is heavy with corroding care, suspense, distrust, and doubt, it may have room for some sorrowful wonder when he recalls how different his first visit there, how different he, how different all the colours of his mind."* — Charles Dickens, *Bleak House* |
| [[erode]] | verb | **1.** Become ground down or deteriorate.<br>**2.** Remove soil or rock. | *"Every land-mark in that eight-hour drive in the mountain buckboard, every tree, every mountain, every ford and bridge, every ridge and eroded hillside was ever the same."* — Jack London, *The Jacket (The Star-Rover)* |
| [[eroded]] | verb | **1.** Become ground down or deteriorate.<br>**2.** Remove soil or rock. | *"Every land-mark in that eight-hour drive in the mountain buckboard, every tree, every mountain, every ford and bridge, every ridge and eroded hillside was ever the same."* — Jack London, *The Jacket (The Star-Rover)* |
| [[eroding]] | noun | **1.** (geology) the mechanical process of wearing or grinding something down (as by particles washing over it).<br>**2.** Become ground down or deteriorate. | *"In academic literature, eroding designates (geology) the mechanical process of wearing or grinding something down (as by particles washing over it)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erodium]] | noun | **1.** Geraniums of europe and south america and australia especially mountainous regions. | *"In academic literature, erodium designates geraniums of europe and south america and australia especially mountainous regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rod]] | noun | **1.** A long thin implement made of metal or wood.<br>**2.** Any rod-shaped bacterium. | *"You have been a scourge to her enemies; you have been a rod to her friends."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rodent]] | noun | **1.** Relatively small placental mammals having a single pair of constantly growing incisor teeth specialized for gnawing. | *"They moan, passing upon the clouds, horned and capricorned, the trumpeted with the tusked, the lionmaned, the giantantlered, snouter and crawler, rodent, ruminant and pachyderm, all their moving moaning multitude, murderers of the sun."* — James Joyce, *Ulysses* |
| [[rodentia]] | noun | **1.** Small gnawing animals: porcupines; rats; mice; squirrels; marmots; beavers; gophers; voles; hamsters; guinea pigs; agoutis. | *"In academic literature, rodentia designates small gnawing animals: porcupines; rats; mice; squirrels; marmots; beavers; gophers; voles; hamsters; guinea pigs; agoutis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rodeo]] | noun | **1.** An exhibition of cowboy skills.<br>**2.** An enclosure for cattle that have been rounded up. | *"In academic literature, rodeo designates an exhibition of cowboy skills."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rodin]] | noun | **1.** French sculptor noted for his renderings of the human form (1840-1917). | *"A BUST BY RODIN, KNOWN AS CERES With rhythmic feet and garments flowing free Draw near, draw near, bring largesse in full hand; Move as to music of the saraband Stately, before this Woman-deity."* — George W. Cronyn, *The Glebe 1914/09 (Vol. 2, No. 2): Poems* |
| [[rodlike]] | adjective | **1.** Resembling a rod. | *"In academic literature, rodlike designates resembling a rod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rodolia]] | noun | **1.** Genus of australian ladybugs. | *"In academic literature, rodolia designates genus of australian ladybugs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rodomontade]] | noun | **1.** Vain and empty boasting. | *"In academic literature, rodomontade designates vain and empty boasting."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Destruction]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ROD
  </div>
</div>
