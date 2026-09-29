---
status: unread
type: root_dashboard
---
# Dashboard — natat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">natat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to swim”</span>
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

The root **natat** means to swim. It refers to swim, float, fluctuate, buoyantly suspend. In English, this root forms words such as *natant*, *natation*, *natational*, and *natator*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to swim
> The root **natat** means to swim. It refers to swim, float, fluctuate, buoyantly suspend. In English, this root forms words such as *natant*, *natation*, *natational*, and *natator*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To swim</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *natant* and *natation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **natat** comes from a Latin word that means *"to swim"*.
  - At its core, it describes the action of swim.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **natat** in an English word, think of **to swim**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to swim).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Natant**: Floating or swimming upon the surface of water.
  - **Natation**: The act, art, or practice of swimming.
  - **Natational**: Pertaining to, associated with, or characteristic of natation, swimming, or aquatic athletics.
  - **Natator**: A person or animal that swims.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">natat</mark>, think of <mark class="hl-def">to swim</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **natat** functions through precise morphological stems derived from the frequentative verb *natō, natāre, natāvī, natātum*:
> 
> ### 1. Primary Morphological Stems
> - **Frequentative Base Stem (`natat-`):** Derived from the supine *natātum*, this stem forms nouns of action (*natāt-* + *-iō* $\to$ [[natation]]), nouns of place (*natāt-* + *-ōrium* $\to$ [[natatorium]]), agent nouns (*natāt-* + *-or* $\to$ [[natator]]), and functional adjectives (*natāt-* + *-ōrius* $\to$ [[natatory]], [[natatorial]]).
> - **Present Participle Stem (`natant-`):** Derived from *natāns* (genitive *natantis*), denoting active, ongoing flotation or fluid suspension. It yields English adjectives and substantive nouns: [[natant]], [[supernatant]], [[internatant]], and [[subnatant]].
> 
> ### 2. Directional & Relational Prefixation
> - **`super-` ("above, over"):** Prefixed to the participle to produce *super-natant-* ("floating above"), defining fluid layers floating atop settled precipitate, as well as the action noun *super-natation* and back-formed verb *super-natate*.
> - **`inter-` ("between, among"):** Prefixed to *natant-* to yield *inter-natant* ("floating between different liquid strata or phases").
> - **`sub-` ("under, beneath"):** Prefixed to produce *sub-natant* ("situated, residing, or floating beneath a supernatant stratum").
> - **`trans-` ("across, over"):** Prefixed to the supine stem to yield *trans-natation* ("the physical act of swimming across a river or body of water").
> 
> ### 3. Categorical Suffixation Dynamics
> - **Action & Process Nouns (`-ion`, `-ation`):** *natat-* + *-ion* $\to$ [[natation]] (the act or art of swimming).
> - **Place & Facility Nouns (`-orium`):** *natat-* + *-orium* $\to$ [[natatorium]] (a facility, building, or pool dedicated to swimming).
> - **Agent Nouns (`-or`):** *natat-* + *-or* $\to$ [[natator]] (a swimmer or swimming animal).
> - **Functional & Anatomical Adjectives (`-ory`, `-orial`):** *natat-* + *-ory* $\to$ [[natatory]]; + *-ial* $\to$ [[natatorial]] (possessing morphological adaptations for swimming).
> - **Relational Adjectives (`-al`):** *natation* + *-al* $\to$ [[natational]] (pertaining to swimming as a sport or exercise).
> - **Verbal & Phase Formatives (`-ate`):** *supernatant* $\to$ [[supernatate]] (to form a floating liquid layer).

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
> Although the root fundamentally denotes **"swimming and floating in fluid"**, its semantic register spans diverse scientific, architectural, and biological operational planes:
> - **Human Athleticism, Sport & Hydro-Conditioning:** In [[natation]], [[natational]], and [[natator]], it describes the disciplined human art of swimming strokes, cardiopulmonary water exercise, and competitive aquatic athletics.
> - **Architectural Engineering & Public Works:** In [[natatorium]], it materializes as a monumental aquatic venue, Olympic-standard indoor pool, or ancient Roman imperial bath basin.
> - **Botanical Morphology & Wetland Ecology:** In [[natant]] and [[natant foliage]], it characterizes aquatic flora (such as *Nymphaea*, *Nelumbo*, and *Potamogeton*) whose broad, buoyant leaves rest upon the water surface supported by internal gas cavities.
> - **Comparative Zoology & Functional Anatomy:** In [[natatorial]], [[natatory]], and historical *Natatores*, it defines evolutionary specializations for propulsion through liquid—such as the palmate webbed feet of ducks, the paddle-shaped swimming legs of dytiscid beetles, or fish swim bladders.
> - **Biochemical Fractionation & Laboratory Protocols:** In [[supernatant]], [[supernatate]], and [[subnatant]], it captures the fluid phase separation that occurs during centrifugation, where cleared liquid rests above a dense pellet of cellular debris or precipitated macromolecules.
> - **Stratified Suspension & Water Crossings:** In [[internatant]] and [[transnatation]], it describes intermediate flotation between liquid densities or the military feat of swimming across river barriers.

---

## 🔀 4. Prefix & Combining Dynamics on natat

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `super-` | above, over, on top | [[supernatant]] / [[supernatation]] | "Floating or resting buoyantly above a sediment, precipitate, or denser fluid layer." |
| `inter-` | between, among, amid | [[internatant]] | "Floating in an intermediate zone between two immiscible liquids or suspended among bodies." |
| `sub-` | under, below, beneath | [[subnatant]] | "Lying, residing, or floating beneath a supernatant liquid layer or surface membrane." |
| `trans-` | across, beyond, over | [[transnatation]] | "Swimming across a river, channel, or body of water from one bank to the opposite shore." |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ant` | Present Participle / Adjective / Noun | [[natant]], [[supernatant]] | Marks an active, continuous state of floating; substantivized to designate the floating fluid itself. |
| `-ion` / `-tion` | Abstract Noun (Action / Process) | [[natation]], [[supernatation]], [[transnatation]] | Designates the comprehensive act, process, or practice of swimming or surface flotation. |
| `-orium` | Noun of Place / Spatial Enclosure | [[natatorium]] | Names a dedicated architectural structure, building, or pool engineered specifically for swimming. |
| `-or` | Agent Noun (Actor / Organism) | [[natator]] | Designates a human swimmer or an animal characterized by natural swimming habits. |
| `-ory` | Adjective (Functional / Purpose) | [[natatory]] | Denotes fitness, physiological purpose, or adaptation for swimming (e.g., natatory organ). |
| `-ial` | Relational Adjective | [[natatorial]] | Specifies anatomical or morphological adaptations for aquatic locomotion in zoology. |
| `-al` | Relational Adjective | [[natational]] | Connects concepts to the practice, pedagogy, or competition of human natation. |
| `-ate` | Verb / Noun Formative | [[supernatate]] | Expresses the physical action of forming a supernatant or the resulting liquid phase itself. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Biochemistry & Centrifugation** | [[supernatant]], [[supernatate]], [[subnatant]] | Differential centrifugation protocols; harvesting cleared cell lysates, viral vectors, or soluble proteins from the upper liquid phase after pelleting membrane debris. |
| 🏊 **Aquatics, Athletics & Architecture** | [[natation]], [[natatorium]], [[natator]], [[natational]] | Olympic swimming competitions, indoor aquatic facility climate and filtration design, competitive stroke biomechanics, cardiopulmonary conditioning. |
| 🌿 **Botany & Wetland Limnology** | [[natant]], [[natant foliage]] | Hydrophyte ecological zonation; analyzing floating-leaved macrophyte canopies (water lilies, pondweeds) and their gas-exchange aerenchyma. |
| 🦅 **Comparative Zoology & Morphology** | [[natatorial]], [[natatory]], [[natator]] | Functional anatomy of swimming organisms: webbed feet in Anseriformes, lobed toes in grebes, paddle-like natatorial legs in *Dytiscus marginalis*, teleost swim bladders. |
| ⚔️ **Military Tactics & Classical History** | [[transnatation]], [[natation]] | Roman river-crossing maneuvers recorded by Vegetius; combat assault swimming; Horatius Cocles' legendary defensive swim across the Tiber. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[natation]] | noun | **1.** The act of someone who floats on the water. | *"In academic literature, natation designates the act of someone who floats on the water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natator]] | noun | **1.** A person who travels through the water by swimming. | *"In academic literature, natator designates a person who travels through the water by swimming."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[natatorium]] | noun | **1.** Pool that provides a facility for swimming. | *"In academic literature, natatorium designates pool that provides a facility for swimming."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · NATAT
  </div>
</div>
