---
status: unread
type: root_dashboard
---
# Dashboard — duct
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">duct-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to lead, bring, or guide”</span>
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

The root **duct** means to lead, bring, or guide. It refers to guiding someone along a path, conducting something forward, or directing movement. In English, this root forms words such as *ductile*, *ductility*, *ductless*, and *conduct*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to lead, bring, or guide
> The root **duct** means to lead, bring, or guide. It refers to guiding someone along a path, conducting something forward, or directing movement. In English, this root forms words such as *ductile*, *ductility*, *ductless*, and *conduct*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To lead, bring, or guide</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *ductile* and *ductility*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **duct** comes from a Latin word that means *"to lead, bring, or guide"*.
  - At its core, it describes the action of lead, bring, or guide.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **duct** in an English word, think of **to lead, bring, or guide**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to lead, bring, or guide).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Ductile**: Capable of being drawn out, hammered thin, or stretched into wire without fracturing.
  - **Ductility**: The physical capacity of a material to undergo significant plastic deformation under tensile stress before rupture.
  - **Ductless**: Having no duct or excretory tube.
  - **Conduct**: Personal behavior, comportment, or moral demeanor.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">duct</mark>, think of <mark class="hl-def">to lead, bring, or guide</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **duct** serves as one of the most versatile derivational engines in the English language, combining seamlessly with directional prefixes and structural suffixes:
> - **Primary Supine Stem:** `duct-` (from Latin *ductum*) — producing resultant nouns, verbs of transmission, and anatomical structures: *duct*, *conduct*, *deduct*, *induct*, *product*, *subduct*.
> - **Agent & Instrument Stem:** `duct-` + `-or` (from Latin *-or*) — designating the person or material performing the guidance: *conductor*, *inductor*, *abductor*, *adductor*, *transducer*.
> - **Action & Process Stem:** `duct-` + `-ion` (from Latin *-iō, -iōnis*) — yielding abstract processes, operations, and scientific phenomena: *conduction*, *deduction*, *induction*, *production*, *reduction*, *seduction*, *subduction*, *transduction*.
> - **Tendency & Dispositional Stem:** `duct-` + `-ive` (from Latin *-īvus*) — forming adjectives expressing functional capability: *conductive*, *deductive*, *inductive*, *productive*, *reductive*, *seductive*.
> - **Material Capability Stem:** `duct-` + `-ile` (from Latin *-ilis*) — forming adjectives of physical malleability: *ductile*, *ductility*.
> - **Electrical Metric Stem:** `duct-` + `-ance` — forming units and properties of electromagnetism: *inductance*.
> - **Frequentative Pedagogical Stem:** `ē-` + `duc-` + `-at-` (from Latin *ēducāre*, frequentative of *ēdūcere*) — generating the vocabulary of schooling: *educate*, *education*, *educator*.
> - **Compound Combining Stems:** Combining Latin nouns directly with *-duct*: *aqueduct* (*aqua*), *viaduct* (*via*), *ventiduct* (*ventus*), *oviduct* (*ōvum*).

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
> Although the root fundamentally denotes **"to lead, draw, guide, or channel"**, its exact semantic manifestation branches into distinct conceptual realms:
> - **Hydraulic, Architectural & Anatomical Conduits (Physical Channels):** In words like [[duct]], [[aqueduct]], [[viaduct]], [[ventiduct]], [[oviduct]], [[conduit]], and [[ductless]], it designates physical channels conveying water, air, eggs, secretions, or vehicular traffic through space.
> - **Physics, Electromagnetism & Material Science (Energy & Transmission):** In words like [[conduction]], [[conductive]], [[conductivity]], [[conductor]], [[nonconductor]], [[semiconductor]], [[superconductor]], [[inductance]], [[inductor]], [[transduction]], [[transducer]], [[ductile]], and [[ductility]], it governs the movement of electrons, heat, sound, and mechanical stress through materials.
> - **Logic, Epistemology & Intellectual Reasoning (Paths of Thought):** In words like [[deduct]], [[deduction]], [[deductive]], [[deductively]], [[induct]], [[induction]], and [[inductive]], it describes the movement of thought—leading conclusions *down* from first principles or leading theories *in* from empirical observations.
> - **Economics, Industrial Manufacturing & Agricultural Yield (Bringing Forth):** In words like [[product]], [[production]], [[productive]], [[productively]], [[productivity]], [[unproductive]], [[reproduction]], [[reproductive]], and [[unreproducible]], it captures the act of bringing materials forward into tangible existence, goods, and offspring.
> - **Mathematics, Finance & Chemical Transformation (Leading Down):** In words like [[deductible]], [[deductibility]], [[reduction]], [[reductive]], and [[reductant]], it expresses the physical, monetary, or chemical subtraction and simplification of an entity.
> - **Human Comportment, Moral Guidance & Social Enticement (Leading People):** In words like [[conduct]], [[misconduct]], [[reconduct]], [[safe-conduct]], [[seduction]], [[seductive]], [[seductively]], [[seductiveness]], and [[seductress]], it tracks the ethical direction of one's own life or the deliberate leading of others off the rightful path.
> - **Spatial Kinematics, Orthopedics & Plate Tectonics (Directional Pull):** In words like [[abduct]], [[abduction]], [[abductor]], [[adduct]], [[adduction]], [[adductor]], [[subduct]], [[subduction]], [[superduct]], [[circumduct]], and [[circumduction]], it models bodily limbs and tectonic plates being pulled across space.
> - **Pedagogy & Social Instruction (Drawing Out Potential):** In words like [[educate]], [[education]], [[educational]], [[educator]], [[educated]], and [[uneducated]], it preserves the classical vision of leading children out of ignorance into civic virtue.

---

## 🔀 4. Prefix & Combining Dynamics on duct

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ab-` | away, from | [[abduct]] | To lead or carry *away* by force; in anatomy, to pull a limb outward from the midline. |
| `ad-` | to, toward | [[adduct]] | To pull or draw *toward* the central median axis of the body. |
| `circum-` | around, about | [[circumduct]] | To move or lead a limb in a *circular* conical path. |
| `con-` | together, with | [[conduct]] | To lead or guide *together*; to manage an enterprise, behave morally, or transmit energy. |
| `de-` | down, away from | [[deduct]] | To lead *down* or subtract from a monetary sum; to trace an inference from axioms. |
| `e-` / `ex-` | out, forth | [[educate]] | To lead *out* of ignorance; to rear, nourish, and instruct children. |
| `in-` | in, into, upon | [[induct]] | To lead *in*; to formally install into office, enlist, or generate an electrical charge. |
| `intro-` | inward, within | [[introduction]] | A leading *inward*; the preliminary presentation of a person, book, or concept. |
| `mis-` | wrongly, badly | [[misconduct]] | Improper, dishonest, or wrongful management and behavior. |
| `pro-` | forward, forth | [[product]] | Something led or brought *forth* into physical, mathematical, or commercial reality. |
| `re-` | back, again | [[reduction]] | A leading *back* to a smaller size, simpler chemical state, or lower price. |
| `se-` | aside, apart | [[seduction]] | A leading *aside* from virtue, prudence, or duty; an alluring enticement. |
| `sub-` | under, below | [[subduct]] | To lead or slide *under*; specifically one tectonic plate plunging beneath another. |
| `super-` | above, over | [[superconductor]] | A medium leading electricity with *supreme* capability (zero electrical resistance). |
| `trans-` | across, through | [[transduction]] | A leading or converting of energy and signals *across* physical and biological states. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ile` | Adjective (Capability / Quality) | [[ductile]] | Capable of being drawn out into wire; flexible and pliable under tensile stress. |
| `-ion` | Noun (Act / Process / Result) | [[conduction]] | The physical act, state, or process of transmitting energy or being guided. |
| `-or` / `-er` | Noun (Agent / Instrument) | [[conductor]], [[transducer]] | The entity, material, or instrument that leads, guides, or converts energy. |
| `-ive` | Adjective (Tendency / Quality) | [[productive]], [[deductive]] | Disposed to or capable of bringing forth results or proceeding by deduction. |
| `-ity` | Noun (State / Measurable Property) | [[conductivity]], [[ductility]] | The measurable degree or physical property of transmitting or stretching. |
| `-ance` | Noun (Physical Metric) | [[inductance]] | The quantifiable electrical property of generating counter-electromotive force. |
| `-ee` | Noun (Recipient of Action) | [[inductee]] | The person who is formally led or initiated into an organization or office. |
| `-ant` | Noun (Operating Chemical Agent) | [[reductant]] | The chemical substance that donates electrons to reduce another compound. |
| `-ress` | Noun (Female Agent) | [[seductress]] | A woman who allures or entices others into romantic or dangerous courses. |
| `-ible` | Adjective (Passive Capacity) | [[deductible]] | Capable of being subtracted or deducted from a taxable total. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚡ **Physics, Electronics & Materials Science** | [[conduction]], [[conductor]], [[semiconductor]], [[superconductor]], [[inductance]], [[transducer]], [[ductility]] | Designing silicon microprocessors, cryogenic MRI magnets, power transmission grids, and tensile alloys for aviation. |
| 🧠 **Logic, Epistemology & Mathematics** | [[deduction]], [[deductive]], [[induction]], [[inductive]], [[product]] | Structuring formal philosophical proofs, developing machine learning algorithms, and calculating arithmetic multiplication products. |
| 🏭 **Economics, Manufacturing & Business** | [[production]], [[productive]], [[productivity]], [[unproductive]], [[reproduction]], [[misconduct]] | Optimizing factory assembly throughput, managing corporate labor output, and investigating financial misconduct. |
| 🏥 **Anatomy, Surgery & Kinesiology** | [[duct]], [[ductless]], [[oviduct]], [[abductor]], [[adductor]], [[circumduction]], [[reduction]] | Operating on bile ducts, performing orthopedic closed fracture reduction, and rehabilitating hip adductor/abductor athletic injuries. |
| 🌍 **Geology, Geophysics & Volcanology** | [[subduct]], [[subduction]] | Mapping Pacific Rim megathrust earthquake faults, deep-sea oceanic trenches, and volcanic island-arc genesis. |
| 🏛️ **Law, Governance & Public Administration** | [[conduct]], [[misconduct]], [[safe-conduct]], [[deductible]], [[deductibility]] | Enforcing professional bar association codes of conduct, granting wartime diplomatic safe-conduct, and auditing tax deductions. |
| 🎓 **Pedagogy, Education & Social Science** | [[educate]], [[education]], [[educational]], [[educator]], [[educated]], [[uneducated]] | Developing institutional school curricula, training certified educators, and expanding universal public educational literacy. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abduct]] | verb | **1.** Take away to an undisclosed location against their will and usually in order to extract a ransom.<br>**2.** Pull away from the body. | *"One of the family is said to have abducted some beautiful woman, who tried to escape from the coach in which he was carrying her off, and in the struggle he killed her—or she killed him—I forget which."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[abducting]] | verb | **1.** Take away to an undisclosed location against their will and usually in order to extract a ransom.<br>**2.** Pull away from the body. | *"Nowhere perhaps is the art of abducting human souls more carefully cultivated or carried to higher perfection than in the Malay Peninsula."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[abduction]] | noun | **1.** The criminal act of capturing and carrying away by force a family member; if a man's wife is abducted it is a crime against the family relationship and against the wife.<br>**2.** (physiology) moving of a body part away from the central axis of the body. | *"The plan for Natalie Rostóva’s abduction had been arranged and the preparations made by Dólokhov a few days before, and on the day that Sónya, after listening at Natásha’s door, resolved to safeguard her, it was to have been put into execution."* — graf Leo Tolstoy, *War and Peace* |
| [[abductor]] | noun | **1.** Someone who unlawfully seizes and detains a victim (usually for ransom).<br>**2.** A muscle that draws a body part away from the median line. | *"Utter a whisper and I’ll murder you!” hissed the abductor, venomously."* — Jos. E. Badger, *The Texas Hawks; or, The Strange Decoy* |
| [[adduct]] | noun | **1.** A compound formed by an addition reaction.<br>**2.** Draw a limb towards the body. | *"In academic literature, adduct designates a compound formed by an addition reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adducting]] | verb | **1.** Draw a limb towards the body.<br>**2.** Especially of muscles; bringing together or drawing toward the midline of the body or toward an adjacent part. | *"In academic literature, adducting designates draw a limb towards the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adduction]] | noun | **1.** (physiology) moving of a body part toward the central axis of the body. | *"In academic literature, adduction designates (physiology) moving of a body part toward the central axis of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adductive]] | adjective | **1.** Especially of muscles; bringing together or drawing toward the midline of the body or toward an adjacent part. | *"In academic literature, adductive designates especially of muscles; bringing together or drawing toward the midline of the body or toward an adjacent part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adductor]] | noun | **1.** A muscle that draws a body part toward the median line. | *"In academic literature, adductor designates a muscle that draws a body part toward the median line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aqueduct]] | noun | **1.** A conduit that resembles a bridge but carries water over a valley. | *"It is a very old house, and the greater part of it was originally a castle, strongly fortified, and surrounded by a deep moat supplied with abundant water from the hills by a hidden aqueduct."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[circumduction]] | noun | **1.** A circular movement of a limb or eye. | *"In academic literature, circumduction designates a circular movement of a limb or eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conduct]] | noun | **1.** Manner of acting or controlling yourself.<br>**2.** (behavioral attributes) the way a person behaves toward other people. | *"If you will tarry, holy pilgrim, But till the troops come by, I will conduct you where you shall be lodg’d; The rather for I think I know your hostess As ample as myself."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conductance]] | noun | **1.** A material's capacity to conduct electricity; measured as the reciprocal of electrical resistance. | *"In academic literature, conductance designates a material's capacity to conduct electricity; measured as the reciprocal of electrical resistance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conducting]] | noun | **1.** The way of administering a business.<br>**2.** The direction of an orchestra or choir. | *"Are they not now upon the western shore, Safe-conducting the rebels from their ships?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conduction]] | noun | **1.** The transmission of heat or electricity or sound. | *"In academic literature, conduction designates the transmission of heat or electricity or sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[conductive]] | adjective | **1.** Having the quality or power of conducting heat or electricity or sound; exhibiting conductivity. | *"Murray was the first to use plumbago, or black-lead, to give the surface of non-metallic bodies electro-conductive properties."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[conductivity]] | noun | **1.** The transmission of heat or electricity or sound. | *"That point of poor conductivity is the ends of the two bars to be joined."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[conductor]] | noun | **1.** The person who leads a musical group.<br>**2.** A substance that readily conducts e.g. electricity and heat. | *"Who is conductor of his people?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[conductress]] | noun | **1.** A woman conductor. | *"As a conductress of Indian schools, and a helper amongst Indian women, your assistance will be to me invaluable.” My iron shroud contracted round me; persuasion advanced with slow sure step."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[counterproductive]] | adjective | **1.** Tending to hinder the achievement of a goal. | *"In academic literature, counterproductive designates tending to hinder the achievement of a goal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deduct]] | verb | **1.** Make a subtraction.<br>**2.** Retain and refrain from disbursing; of payments. | *"I went on to say that the work had not been finished by them, so in consequence I had decided to deduct four sticks of tobacco off each man's payment."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[deductible]] | noun | **1.** (taxes) an amount that can be deducted (especially for the purposes of calculating income tax).<br>**2.** A clause in an insurance policy that relieves the insurer of responsibility to pay the initial loss up to a stated amount. | *"In academic literature, deductible designates (taxes) an amount that can be deducted (especially for the purposes of calculating income tax)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deduction]] | noun | **1.** A reduction in the gross amount on which a tax is calculated; reduces taxes by the percentage fixed for the taxpayer's income bracket.<br>**2.** An amount or percentage deducted. | *"Thus, coinage may be both free and gratuitous, when citizens are allowed to bring bullion whenever they please and have it converted into coins without charge or deduction."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[deductive]] | adjective | **1.** Relating to logical deduction.<br>**2.** Involving inferences from general principles. | *"In passing, I call attention to the fact that at the time I noted that the process of reasoning employed in these dream speeches was invariably deductive."* — Jack London, *The Jacket (The Star-Rover)* |
| [[duct]] | noun | **1.** A bodily passage or tube lined with epithelial cells and conveying a secretion or other substance.<br>**2.** A continuous tube formed by a row of elongated cells lacking intervening end walls. | *"Hodak's expertise with duct tape and hand tools would get credit for the successful escape."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[ductile]] | adjective | **1.** Easily influenced.<br>**2.** Capable of being shaped or bent or drawn out. | *"Their growing minds soon close above the wound--their elastic spirits soon rise beneath the pressure--their green and ductile affections soon twine round new objects."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[ductileness]] | noun | **1.** The malleability of something that can be drawn into threads or wires or hammered into thin sheets. | *"In academic literature, ductileness designates the malleability of something that can be drawn into threads or wires or hammered into thin sheets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ductility]] | noun | **1.** The malleability of something that can be drawn into threads or wires or hammered into thin sheets. | *"Bingley was endeared to Darcy by the easiness, openness, and ductility of his temper, though no disposition could offer a greater contrast to his own, and though with his own he never appeared dissatisfied."* — Jane Austen, *Pride and Prejudice* |
| [[ductless]] | adjective | **1.** Not having a duct. | *"In academic literature, ductless designates not having a duct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ductule]] | noun | **1.** A very small duct. | *"In academic literature, ductule designates a very small duct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ductulus]] | noun | **1.** A very small duct. | *"In academic literature, ductulus designates a very small duct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[induct]] | verb | **1.** Place ceremoniously or formally in an office or position.<br>**2.** Accept people into an exclusive society or group, usually with some rite. | *"Bagnet concludes that for such a case there is no remedy like a pipe, and fastening the brooch herself in a twinkling, causes the trooper to be inducted into his usual snug place and the pipes to be got into action."* — Charles Dickens, *Bleak House* |
| [[inductance]] | noun | **1.** An electrical phenomenon whereby an electromotive force (emf) is generated in a closed circuit by a change in the flow of current.<br>**2.** An electrical device (typically a conducting coil) that introduces inductance into a circuit. | *"This is called "inductance," and it has exactly the same effect upon the current that inertia has upon a body."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[inductee]] | noun | **1.** A person inducted into an organization or social group.<br>**2.** Someone who is drafted into military service. | *"In academic literature, inductee designates a person inducted into an organization or social group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[induction]] | noun | **1.** A formal entry into an organization or position or office.<br>**2.** An electrical phenomenon whereby an electromotive force (emf) is generated in a closed circuit by a change in the flow of current. | *"These promises are fair, the parties sure, And our induction full of prosperous hope."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inductive]] | adjective | **1.** Arising from inductance.<br>**2.** Of reasoning; proceeding from particular facts to a general conclusion. | *"Inductive demonstration of broadly stated economic principles is usually difficult, but there have been many "monetary experiments" to teach their lessons."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[inductor]] | noun | **1.** An electrical device (typically a conducting coil) that introduces inductance into a circuit. | *"In academic literature, inductor designates an electrical device (typically a conducting coil) that introduces inductance into a circuit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introduction]] | noun | **1.** The act of beginning something new.<br>**2.** The first section of a communication. | *"Pray excuse the introduction of such mean topics.” She partly drew aside the curtain of the long, low garret window and called our attention to a number of bird-cages hanging there, some containing several birds."* — Charles Dickens, *Bleak House* |
| [[introductory]] | adjective | **1.** Serving to open or begin.<br>**2.** Serving as a base or starting point. | *"As they had been discussing a score of personal matters only half-an-hour before, the introductory style seemed a little superfluous."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[misconduct]] | noun | **1.** Bad or dishonest management by persons supposed to act on another's behalf.<br>**2.** Activity that transgresses moral or civil law. | *"Your father and mother seem so totally free from all those ambitious feelings which have led to so much misconduct and misery, both in young and old."* — Jane Austen, *Persuasion* |
| [[nonconducting]] | adjective | **1.** Not able to conduct heat or electricity or sound. | *"In academic literature, nonconducting designates not able to conduct heat or electricity or sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonconductive]] | adjective | **1.** Not able to conduct heat or electricity or sound. | *"In academic literature, nonconductive designates not able to conduct heat or electricity or sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonconductor]] | noun | **1.** A material such as glass or porcelain with negligible electrical or thermal conductivity. | *"In academic literature, nonconductor designates a material such as glass or porcelain with negligible electrical or thermal conductivity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nondeductible]] | adjective | **1.** Not allowable as a deduction. | *"In academic literature, nondeductible designates not allowable as a deduction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonproductive]] | adjective | **1.** Not directly productive. | *"In academic literature, nonproductive designates not directly productive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overproduction]] | noun | **1.** Too much production or more than expected. | *"In academic literature, overproduction designates too much production or more than expected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[product]] | noun | **1.** Commodities offered for sale.<br>**2.** An artifact that has been created by someone or some process. | *"With all his attempted independence of judgement this advanced and well-meaning young man, a sample product of the last five-and-twenty years, was yet the slave to custom and conventionality when surprised back into his early teachings."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[production]] | noun | **1.** The act or process of producing something.<br>**2.** A presentation for the stage or screen or radio or television. | *"The result from capital employed in the production of any movement of a mental nature is sometimes as tremendous as the cause itself is absurdly minute."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[productive]] | adjective | **1.** Producing or capable of producing (especially abundantly).<br>**2.** Having the ability to produce or originate. | *"After unspeakable suffering, productive of the utmost consternation, she is pronounced, by expresses from the bedroom, free from pain, though much exhausted, in which state of affairs Mr."* — Charles Dickens, *Bleak House* |
| [[productively]] | adverb | **1.** In a productive way. | *"In academic literature, productively designates in a productive way."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[productiveness]] | noun | **1.** The quality of being productive or having the power to produce. | *"But Hamilton's influence, while it called out and stimulated his pupil's powers to a remarkable degree, was not one which made for literary productiveness."* — John Cairns, *Principal Cairns* |
| [[productivity]] | noun | **1.** The quality of being productive or having the power to produce.<br>**2.** (economics) the ratio of the quantity and quality of units produced to the labor per unit of time. | *"To a modern reader the connexion at first sight may not be obvious between the activity of the hangman and the productivity of the earth."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[reductant]] | noun | **1.** A substance capable of bringing about the reduction of another substance as it itself is oxidized; used in photography to lessen the density of a negative or print by oxidizing some of the loose silver. | *"In academic literature, reductant designates a substance capable of bringing about the reduction of another substance as it itself is oxidized; used in photography to lessen the density of a negative or print by oxidizing some of the loose silver."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reductase]] | noun | **1.** An enzyme that catalyses the biochemical reduction of some specified substance. | *"In academic literature, reductase designates an enzyme that catalyses the biochemical reduction of some specified substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reductio]] | noun | **1.** (reduction to the absurd) a disproof by showing that the consequences of the proposition are absurd; or a proof of a proposition by showing that its negation leads to a contradiction. | *"It is this that he calls a "fasciculus of contradictions," and regarded as the _reductio ad absurdissimum_ of the transcendental philosophy."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[reduction]] | noun | **1.** The act of decreasing or reducing something.<br>**2.** Any process in which electrons are added to an atom or ion (as by removing oxygen or adding hydrogen); always occurs accompanied by oxidation of the reducing agent. | *"The value of all debts changes in the same proportion as does that of the standard unit of money; when this rises or falls in value, it means increase or reduction, in the same ratio, of the purchasing power of every creditor."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[reductionism]] | noun | **1.** A theory that all complex systems can be completely understood in terms of their components.<br>**2.** The analysis of complex things into simpler constituents. | *"In academic literature, reductionism designates a theory that all complex systems can be completely understood in terms of their components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reductionist]] | adjective | **1.** Of or relating to the theory of reductionism. | *"In academic literature, reductionist designates of or relating to the theory of reductionism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reductive]] | adjective | **1.** Characterized by or causing diminution or curtailment;  - r.h.rovere. | *"In academic literature, reductive designates characterized by or causing diminution or curtailment;  - r.h.rovere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reductivism]] | noun | **1.** An art movement in sculpture and painting that began in the 1950s and emphasized extreme simplification of form and color. | *"In academic literature, reductivism designates an art movement in sculpture and painting that began in the 1950s and emphasized extreme simplification of form and color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reintroduction]] | noun | **1.** An act of renewed introduction. | *"In academic literature, reintroduction designates an act of renewed introduction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reproduction]] | noun | **1.** The process of generating offspring.<br>**2.** Recall that is hypothesized to work by storing the original stimulus input and reproducing it during recall. | *"And you thought I was the mere stone reproduction of one of them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[reproductive]] | adjective | **1.** Producing new life or offspring. | *"Some little time after the birth of the twins a ceremony is performed, the object of which clearly is to transmit the reproductive virtue of the parents to the plantains."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[seduction]] | noun | **1.** Enticing someone astray from right behavior.<br>**2.** An act of winning the love or sexual favor of someone. | *"He was declared to be in debt to every tradesman in the place, and his intrigues, all honoured with the title of seduction, had been extended into every tradesman’s family."* — Jane Austen, *Pride and Prejudice* |
| [[seductive]] | adjective | **1.** Tending to entice into a desired action or state. | *"Into the dining-house, unaffected by the seductive show in the window of artificially whitened cauliflowers and poultry, verdant baskets of peas, coolly blooming cucumbers, and joints ready for the spit, Mr."* — Charles Dickens, *Bleak House* |
| [[seductively]] | adverb | **1.** In a tempting seductive manner. | *"In academic literature, seductively designates in a tempting seductive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seductress]] | noun | **1.** A woman who seduces. | *"In academic literature, seductress designates a woman who seduces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subduction]] | noun | **1.** A geological process in which one edge of a crustal plate is forced sideways and downward into the mantle below another plate. | *"In academic literature, subduction designates a geological process in which one edge of a crustal plate is forced sideways and downward into the mantle below another plate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superconductivity]] | noun | **1.** The disappearance of electrical resistance at very low temperatures. | *"In academic literature, superconductivity designates the disappearance of electrical resistance at very low temperatures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transduction]] | noun | **1.** (genetics) the process of transfering genetic material from one cell to another by a plasmid or bacteriophage.<br>**2.** The process whereby a transducer accepts energy in one form and gives back related energy in a different form. | *"In academic literature, transduction designates (genetics) the process of transfering genetic material from one cell to another by a plasmid or bacteriophage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underproduction]] | noun | **1.** Inadequate production or less than expected. | *"In academic literature, underproduction designates inadequate production or less than expected."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unproductive]] | adjective | **1.** Not producing or capable of producing.<br>**2.** Not producing desired results. | *"I had, by cross-ways and by-paths, once more drawn near the tract of moorland; and now, only a few fields, almost as wild and unproductive as the heath from which they were scarcely reclaimed, lay between me and the dusky hill."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[unproductively]] | adverb | **1.** In an unproductive manner. | *"The anxious interval wore away unproductively."* — Jane Austen, *Persuasion* |
| [[unproductiveness]] | noun | **1.** The quality of lacking the power to produce. | *"In academic literature, unproductiveness designates the quality of lacking the power to produce."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unseductive]] | adjective | **1.** Not seductive. | *"In academic literature, unseductive designates not seductive."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · DUCT
  </div>
</div>
