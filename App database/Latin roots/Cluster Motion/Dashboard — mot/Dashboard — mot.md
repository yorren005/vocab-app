---
status: unread
type: root_dashboard
---
# Dashboard — mot
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">mot-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to move”</span>
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

The root **mot** means to move. It refers to move, stir, set in motion, shake, provoke. In English, this root forms words such as *motion*, *motor*, *motive*, and *promote*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to move
> The root **mot** means to move. It refers to move, stir, set in motion, shake, provoke. In English, this root forms words such as *motion*, *motor*, *motive*, and *promote*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To move</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *motion* and *motor*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mot** comes from a Latin word that means *"to move"*.
  - At its core, it describes the action of move.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **mot** in an English word, think of **to move**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to move).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Motion**: The action or process of moving or being moved.
  - **Motor**: A machine, especially an internal combustion or electric device, that supplies mechanical energy to impart motion.
  - **Motive**: A reason for doing something, especially one that is hidden or not immediately obvious.
  - **Promote**: To elevate an individual to a higher rank, post, or seniority in an organization.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mot</mark>, think of <mark class="hl-def">to move</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **mot** operates through the Latin fourth principal part (*mōtum*, supine/participle of *moveō*), producing resultant nouns, agentive nouns, frequentative verbs, and dynamic adjectives:
> - **Primary Participial / Supine Stem:** `mot-` (from Latin *mōtum* / *mōtus*) — forms the core nouns of displacement, state, and intention: *motion*, *motive*, *remote*, *promote*, *demote*.
> - **Frequentative / Factitive Verb Stem:** `motivate` (from Latin *mōtīvus* + *-āre*) — forms verbs of repeated or intentional prompting: *motivate*, *motivation*, *motivator*.
> - **Agentive Mechanical Stem:** `mōtor` — suffixes the agentive *-tor* to designate the prime initiator of movement: *motor*, *motorist*, *motorize*, *locomotor*, *vasomotor*.
> - **Directional Prefixation Engine:** Attaching Latin prefixes fundamentally redirects the trajectory of motion:
>   - `ē-` / `ex-` ("out, forth") $\to$ *emotion*, *emotive* (psychic stirring bursting outward).
>   - `prō-` ("forward, ahead") $\to$ *promote*, *promotion* (advancing ahead in position).
>   - `dē-` ("downward, away") $\to$ *demote*, *demotion* (relegating downward in rank).
>   - `re-` ("back, away") $\to$ *remote*, *remotely* (withdrawn far back in distance or time).
>   - `com-` ("together, intensively") $\to$ *commotion* (turbulent agitation of many parts).
>   - `loco-` (*locus*, "place") $\to$ *locomotion*, *locomotive* (displacing from one point to another).
>   - `auto-` (Greek *autos*, "self") $\to$ *automotive* (self-propelling).
>   - `electro-` (Greek *ēlektron*, "amber") $\to$ *electromotive* (driven by electric potential).

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
> Although the root fundamentally denotes **"to move, stir, or set in motion"**, its semantic branches cover distinct operational planes:
> - **Pure Physics & Mechanical Kinetics:** The measurable displacement of mass across space, velocity, and machinery ([[motion]], [[motionless]], [[motor]], [[motorist]], [[motorize]], [[motorized]], [[motorcade]], [[motorcycle]]).
> - **Psychological Affect & Visceral Agitation:** The internal stirring of sentiments, expressive behavior, and ethical value statements ([[emotion]], [[emotional]], [[emotionally]], [[emotionalism]], [[emotive]], [[emotively]], [[emotivism]]).
> - **Teleological Will & Purposeful Intent:** The conscious or subconscious reasons that propel human choice and behavior ([[motive]], [[motiveless]], [[motivate]], [[motivation]], [[motivational]], [[motivator]], [[countermotive]]).
> - **Hierarchical & Institutional Trajectory:** Vertical career movement, status elevation, or disciplinary relegation within an organization ([[promote]], [[promoter]], [[promotion]], [[promotional]], [[demote]], [[demotion]]).
> - **Spatial, Temporal & Relational Distance:** Movement backward into physical seclusion, historical distance, or faint probability ([[remote]], [[remotely]], [[remoteness]]).
> - **Physiological & Autonomic Regulation:** The muscular and neurochemical mechanisms that drive biological locomotion and vascular diameter ([[locomotion]], [[locomotive]], [[locomotor]], [[vasomotor]]).
> - **Electromagnetic & Industrial Power:** Applied physical forces driving continuous current or vehicular transport across global rail and road grids ([[electromotive]], [[automotive]]).

---

## 🔀 4. Prefix & Combining Dynamics on mot

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `e-` / `ex-` | out, forth, away | [[emotion]] | An outward moving or stirring of psychic and visceral agitation. |
| `pro-` | forward, forth, ahead | [[promote]] | To move forward in rank, status, public visibility, or chemical efficacy. |
| `de-` | down, away from | [[demote]] | To move downward from a higher grade, rank, or administrative tier. |
| `re-` | back, away, withdrawal | [[remote]] | Moved far back in spatial distance, temporal era, or probability. |
| `com-` | together, completely, intensively | [[commotion]] | Violent moving together of agitated crowds or disturbed physical equilibrium. |
| `counter-` | against, opposite | [[countermotive]] | An opposing motive that counteracts or neutralizes an initial impulse. |
| `loco-` (*locus*) | place, position | [[locomotion]] | Movement from place to place; spatial self-propulsion. |
| `auto-` (*autos*) | self, spontaneous | [[automotive]] | Self-moving; propelled by internal motive machinery. |
| `electro-` (*ēlektron*) | electric, amber | [[electromotive]] | Causing movement through electrical charge and potential difference. |
| `vaso-` (*vās*) | vessel, duct | [[vasomotor]] | Directing the movement, dilation, or constriction of vascular walls. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ion` / `-tion` (*-tiō*) | Noun (Action / State / Process) | [[motion]], [[emotion]], [[promotion]], [[demotion]], [[commotion]], [[locomotion]] | The ongoing process, resulting state, or institutional act of moving. |
| `-or` (*-or*) | Noun (Agent / Mechanical Operator) | [[motor]], [[promoter]], [[motivator]], [[locomotor]], [[vasomotor]] | The physical entity, mechanical engine, physiological nerve, or human agent that initiates movement. |
| `-ive` (*-īvus*) | Adjective (Tendency / Functional Quality) | [[motive]], [[emotive]], [[locomotive]], [[automotive]], [[electromotive]] | Pertaining to, capable of, or having the active tendency to produce movement. |
| `-ate` (*-āre*) | Verb (Factitive / Causative Action) | [[motivate]], [[promote]], [[demote]] | To cause an entity to move, act, or advance in rank or inspiration. |
| `-ist` (*-ista*) | Noun (Human Practitioner / Operator) | [[motorist]] | One who actively operates or travels by means of a motor-driven vehicle. |
| `-ize` (*-izāre*) | Verb (Conversion / Equipment) | [[motorize]] | To equip a conveyance or system with mechanical motor propulsion. |
| `-ism` (*-ismus*) | Noun (Doctrine / Theoretical School) | [[emotivism]], [[emotionalism]] | A formalized philosophical doctrine or persistent behavioral tendency based on affective movement. |
| `-less` (*-lēas*) | Adjective (Privative / Deprivation) | [[motionless]], [[motiveless]] | Entirely devoid of movement, kinetic velocity, or underlying rationale. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Classical Mechanics & Physics** | [[motion]], [[motionless]], [[motor]], [[electromotive]] | Newton's laws of motion, kinematics, prime movers, kinetic vs. potential energy, and electromotive induction in electrical circuits. |
| 🧠 **Neurophysiology & Angiology** | [[motor]], [[vasomotor]], [[locomotor]] | Efferent motor neurons conducting action potentials, vasomotor regulation of arterial vascular resistance, and cerebellar coordination of gait. |
| 🎭 **Psychology, Affect & Mind** | [[emotion]], [[emotional]], [[motivation]], [[motivator]], [[countermotive]] | Affective arousal, intrinsic vs. extrinsic motivational drives, behavioral conditioning, and competing psychological impulses. |
| 🏢 **Corporate Hierarchy & Management** | [[promote]], [[promoter]], [[promotion]], [[promotional]], [[demote]], [[demotion]] | Organizational promotion ladders, executive restructuring, performance demotion, and venture capital syndication. |
| 🚂 **Transportation & Rail Engineering** | [[locomotive]], [[locomotion]], [[automotive]], [[motorist]], [[motorcycle]], [[motorcade]] | Steam and diesel-electric rail haulage, automotive vehicle architecture, road traffic safety, and ceremonial motor transport. |
| ⚖️ **Ethics & Analytic Philosophy** | [[emotivism]], [[emotive]], [[motive]], [[motiveless]] | Metaethical non-cognitivism (A.J. Ayer, C.L. Stevenson), moral psychology, and Coleridge's literary critique of 'motiveless malignity' in Shakespeare. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[commotion]] | noun | **1.** A disorderly outburst or tumult.<br>**2.** The act of making a noisy disturbance. | *"By heaven, Poins, I feel me much to blame, So idly to profane the precious time, When tempest of commotion, like the south Borne with black vapour, doth begin to melt And drop upon our bare unarmed heads."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[demote]] | verb | **1.** Assign to a lower position; reduce in rank. | *"In academic literature, demote designates assign to a lower position; reduce in rank."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demotic]] | noun | **1.** A simplified cursive form of the ancient hieratic script.<br>**2.** The modern greek vernacular. | *"Here is another difficult text: (Figure 2) It is demotic—a style of Egyptian writing and a phase of the language which had perished from the knowledge of all men twenty-five hundred years before the Christian era."* — Mark Twain, *What Is Man? and Other Essays* |
| [[demotion]] | noun | **1.** Act of lowering in rank or position. | *"In academic literature, demotion designates act of lowering in rank or position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emote]] | verb | **1.** Give expression or emotion to, in a stage or movie role. | *"In academic literature, emote designates give expression or emotion to, in a stage or movie role."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emoticon]] | noun | **1.** A representation of a facial expression (as a smile or frown) created by typing a sequence of characters in sending email. | *"In academic literature, emoticon designates a representation of a facial expression (as a smile or frown) created by typing a sequence of characters in sending email."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emotion]] | noun | **1.** Any strong feeling. | *"Oh, oh," she said, as soon as she was able to control her emotion, "one does not need to ask where our little Leonore comes from."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[emotional]] | adjective | **1.** Determined or actuated by emotion rather than reason.<br>**2.** Of more than usual emotion. | *"This well-favoured and comely girl soon made appreciable inroads upon the emotional constitution of young Farmer Oak."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[emotionalism]] | noun | **1.** Emotional nature or quality. | *"Let there be none of this horrible emotionalism, this undignified welter of thought and feeling."* — Donn Byrne, *The Wind Bloweth* |
| [[emotionality]] | noun | **1.** Emotional nature or quality. | *"In academic literature, emotionality designates emotional nature or quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emotionally]] | adverb | **1.** In an emotional manner.<br>**2.** With regard to emotions. | *"They were both young, and they were talking of the time when they lived and loved together at Talbothays Dairy, that happy green tract of land where summer had been liberal in her gifts; in substance to all, emotionally to these."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[emotionless]] | adjective | **1.** Unmoved by feeling; ; -margaret deland. | *"In academic literature, emotionless designates unmoved by feeling; ; -margaret deland."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emotionlessness]] | noun | **1.** Apathy demonstrated by an absence of emotional reactions.<br>**2.** Absence of emotion. | *"In academic literature, emotionlessness designates apathy demonstrated by an absence of emotional reactions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emotive]] | adjective | **1.** Characterized by emotion. | *"In academic literature, emotive designates characterized by emotion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immotile]] | adjective | **1.** (of spores or microorganisms) not capable of movement. | *"In academic literature, immotile designates (of spores or microorganisms) not capable of movement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immotility]] | noun | **1.** Lacking an ability to move. | *"In academic literature, immotility designates lacking an ability to move."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locomote]] | verb | **1.** Change location; move, travel, or proceed, also metaphorically. | *"In academic literature, locomote designates change location; move, travel, or proceed, also metaphorically."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[locomotion]] | noun | **1.** The power or ability to move.<br>**2.** Self-propelled movement. | *"After an hour employed in this unpleasant kind of locomotion, we started to our feet again and pursued our way boldly along the crest of the ridge."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[locomotive]] | noun | **1.** A wheeled vehicle consisting of a self-propelled engine that is used to draw trains along railway tracks.<br>**2.** Of or relating to locomotion. | *"Troy was full of activity, but his activities were less of a locomotive than a vegetative nature; and, never being based upon any original choice of foundation or direction, they were exercised on whatever object chance might place in their way."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[locomotor]] | adjective | **1.** Of or relating to locomotion. | *"FLORRY: _(Nods.)_ Locomotor ataxy."* — James Joyce, *Ulysses* |
| [[mot]] | noun | **1.** A clever remark.<br>**2.** A compulsory annual test of older motor vehicles for safety and exhaust fumes. | *"Reproach is stamped in Collatinus’ face, And Tarquin’s eye may read the mot afar, How he in peace is wounded, not in war."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[motacilla]] | noun | **1.** Type genus of the motacillidae: wagtails. | *"In academic literature, motacilla designates type genus of the motacillidae: wagtails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motacillidae]] | noun | **1.** Pipits and wagtails. | *"In academic literature, motacillidae designates pipits and wagtails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mote]] | noun | **1.** (nontechnical usage) a tiny piece of anything. | *"A mote it is to trouble the mind’s eye."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[motel]] | noun | **1.** A motor hotel. | *"In academic literature, motel designates a motor hotel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motet]] | noun | **1.** An unaccompanied choral composition with sacred lyrics; intended to be sung as part of a church service; originated in the 13th century. | *"In academic literature, motet designates an unaccompanied choral composition with sacred lyrics; intended to be sung as part of a church service; originated in the 13th century."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motif]] | noun | **1.** A design or figure that consists of recurring shapes or colors, as in architecture or decoration.<br>**2.** A theme that is repeated or elaborated in a piece of music. | *"I want him to have about five years of such days and then he would deserve the joys of parenthood that he now does not appreciate." "Oh, Mamie wouldn't smoke a cigar!" was the exclamation that showed how much Sallie got of the motif of my eruption."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[motile]] | noun | **1.** One whose prevailing mental imagery takes the form of inner feelings of action.<br>**2.** (of spores or microorganisms) capable of movement. | *"In academic literature, motile designates one whose prevailing mental imagery takes the form of inner feelings of action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motilin]] | noun | **1.** A gastrointestinal hormone that apparently participates in controlling smooth muscle contractions in the stomach and small intestine. | *"In academic literature, motilin designates a gastrointestinal hormone that apparently participates in controlling smooth muscle contractions in the stomach and small intestine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motility]] | noun | **1.** Ability to move spontaneously and independently.<br>**2.** A change of position that does not entail a change of location. | *"In academic literature, motility designates ability to move spontaneously and independently."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motion]] | noun | **1.** The use of movements (especially of the hands) to communicate familiar or prearranged signals.<br>**2.** A natural event that involves a change in the position or location of something. | *"Ah yet doth beauty like a dial hand, Steal from his figure, and no pace perceived, So your sweet hue, which methinks still doth stand Hath motion, and mine eye may be deceived."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[motional]] | adjective | **1.** Of or relating to or characterized by motion. | *"In academic literature, motional designates of or relating to or characterized by motion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motionless]] | adjective | **1.** Not in physical motion. | *"Upon the wall, their shadows blended together, surrounded by strange forms, not without a ghostly motion caught from the unsteady fire, though reflecting from motionless objects."* — Charles Dickens, *Bleak House* |
| [[motionlessly]] | adverb | **1.** Without moving; in a motionless manner. | *"Fedallah was motionlessly leaning over the same rail."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[motionlessness]] | noun | **1.** A state of no motion or movement. | *"So they got up and went home, and Karl forgot the lay-figure, leaving it in busy motionlessness all night before the easel."* — George MacDonald, *The Portent and Other Stories* |
| [[motivate]] | verb | **1.** Give an incentive for action. | *"In academic literature, motivate designates give an incentive for action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motivated]] | verb | **1.** Give an incentive for action.<br>**2.** Provided with a motive or given incentive for action. | *"In academic literature, motivated designates give an incentive for action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motivating]] | noun | **1.** The act of motivating; providing incentive.<br>**2.** Give an incentive for action. | *"In academic literature, motivating designates the act of motivating; providing incentive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motivation]] | noun | **1.** The psychological feature that arouses an organism to action toward a desired goal; the reason for the action; that which gives purpose and direction to behavior.<br>**2.** The condition of being motivated. | *"In academic literature, motivation designates the psychological feature that arouses an organism to action toward a desired goal; the reason for the action; that which gives purpose and direction to behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motivational]] | adjective | **1.** Of or relating to motivation. | *"Each of you will be full to the brim with motivational boosters to keep you oriented to the mission."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[motivative]] | adjective | **1.** Impelling to action; - arthur pap. | *"In academic literature, motivative designates impelling to action; - arthur pap."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motivator]] | noun | **1.** A positive motivational influence. | *"In academic literature, motivator designates a positive motivational influence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motive]] | noun | **1.** The psychological feature that arouses an organism to action toward a desired goal; the reason for the action; that which gives purpose and direction to behavior.<br>**2.** A theme that is repeated or elaborated in a piece of music. | *"This was your motive For Paris, was it?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[motiveless]] | adjective | **1.** Occurring without motivation or provocation; ; - f.d.roosevelt. | *"It seems so motiveless." "Because it amused me to get a man into my power." Isabel felt him shuddering."* — Anthony Pryde, *Nightfall* |
| [[motivity]] | noun | **1.** The power or ability to move. | *"In academic literature, motivity designates the power or ability to move."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motley]] | noun | **1.** A collection containing a variety of sorts of things.<br>**2.** A garment made of motley (especially a court jester's costume). | *"I met a fool i’ th’ forest, A motley fool."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[motmot]] | noun | **1.** Tropical american bird resembling a blue jay and having greenish and bluish plumage. | *"In academic literature, motmot designates tropical american bird resembling a blue jay and having greenish and bluish plumage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motoneuron]] | noun | **1.** A neuron conducting impulses outwards from the brain or spinal cord. | *"In academic literature, motoneuron designates a neuron conducting impulses outwards from the brain or spinal cord."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motor]] | noun | **1.** Machine that converts other forms of energy into mechanical energy and so imparts motion.<br>**2.** A nonspecific agent that imparts motion. | *"Many a farmer, riding in his motor-car to-day, knows who made possible that motor-car."* — Jack London, *The Jacket (The Star-Rover)* |
| [[motor-assisted]] | adjective | **1.** Relying on an engine for propulsion in addition to muscle power. | *"In academic literature, motor-assisted designates relying on an engine for propulsion in addition to muscle power."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorbike]] | noun | **1.** Small motorcycle with a low frame and small wheels and elevated handlebars.<br>**2.** Ride a motorcycle. | *"In academic literature, motorbike designates small motorcycle with a low frame and small wheels and elevated handlebars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorboat]] | noun | **1.** A boat propelled by an internal-combustion engine.<br>**2.** Ride in a motorboat. | *"In academic literature, motorboat designates a boat propelled by an internal-combustion engine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorbus]] | noun | **1.** A vehicle carrying many passengers; used for public transport. | *"At sight of the jaunty little motorbus waiting to haul him up the winding grade to the hotel, he actually hesitated."* — Charlotte B. Herr, *Their Mariposa Legend: A Romance of Santa Catalina* |
| [[motorcade]] | noun | **1.** A procession of people traveling in motor cars. | *"In academic literature, motorcade designates a procession of people traveling in motor cars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorcar]] | noun | **1.** A motor vehicle with four wheels; usually propelled by an internal combustion engine. | *"It has vanished long ago... —She lies laid out in stark stiffness in that secondbest bed, the mobled queen, even though you prove that a bed in those days was as rare as a motorcar is now and that its carvings were the wonder of seven parishes."* — James Joyce, *Ulysses* |
| [[motorcoach]] | noun | **1.** A vehicle carrying many passengers; used for public transport. | *"In academic literature, motorcoach designates a vehicle carrying many passengers; used for public transport."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorcycle]] | noun | **1.** A motor vehicle with two wheels and a strong frame.<br>**2.** Ride a motorcycle. | *"Here comes a dispatch rider." The man on the motorcycle dashed up, saluted."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[motorcycling]] | noun | **1.** Riding a motorcycle.<br>**2.** Ride a motorcycle. | *"In academic literature, motorcycling designates riding a motorcycle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorcyclist]] | noun | **1.** A traveler who rides a motorcycle. | *"In academic literature, motorcyclist designates a traveler who rides a motorcycle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motored]] | verb | **1.** Travel or be transported in a vehicle.<br>**2.** Equipped with a motor or motors. | *"This morning I motored into Amesbury to change the library books and to enquire after Canon Bodington."* — Anthony Pryde, *Nightfall* |
| [[motorial]] | adjective | **1.** Of nerves and nerve impulses; conveying information away from the cns. | *"In academic literature, motorial designates of nerves and nerve impulses; conveying information away from the cns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motoring]] | noun | **1.** The act of driving an automobile.<br>**2.** Travel or be transported in a vehicle. | *"He made a detour of certain side streets which brought him up before a small side establishment bearing a sign which set forth an alluring invitation to motoring parties in need of food."* — Grace S. Richmond, *Red Pepper Burns* |
| [[motorisation]] | noun | **1.** The act of motorizing (equiping with motors or with motor vehicles). | *"In academic literature, motorisation designates the act of motorizing (equiping with motors or with motor vehicles)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorise]] | verb | **1.** Equip with armed and armored motor vehicles. | *"In academic literature, motorise designates equip with armed and armored motor vehicles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorised]] | verb | **1.** Equip with armed and armored motor vehicles.<br>**2.** Equipped with a motor or motors. | *"In academic literature, motorised designates equip with armed and armored motor vehicles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorist]] | noun | **1.** Someone who drives (or travels in) an automobile. | *"Suddenly the car struck aside from the straightaway and with open cut-out roared up a steep hill by means of which a narrow road led off toward a part of the country not often selected by motorists for pleasure spins."* — Grace S. Richmond, *Red Pepper Burns* |
| [[motorization]] | noun | **1.** The act of motorizing (equiping with motors or with motor vehicles). | *"In academic literature, motorization designates the act of motorizing (equiping with motors or with motor vehicles)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorize]] | verb | **1.** Equip with a motor vehicle.<br>**2.** Equip with a motor. | *"In academic literature, motorize designates equip with a motor vehicle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorized]] | verb | **1.** Equip with a motor vehicle.<br>**2.** Equip with a motor. | *"In academic literature, motorized designates equip with a motor vehicle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorless]] | adjective | **1.** Having no motor. | *"In academic literature, motorless designates having no motor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorman]] | noun | **1.** The operator of streetcar. | *"The motorman bangs his footgong.)_ THE GONG: Bang Bang Bla Bak Blud Bugg Bloo. _(The brake cracks violently."* — James Joyce, *Ulysses* |
| [[motormouth]] | noun | **1.** Someone who talks incessantly. | *"In academic literature, motormouth designates someone who talks incessantly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motortruck]] | noun | **1.** An automotive vehicle suitable for hauling. | *"In academic literature, motortruck designates an automotive vehicle suitable for hauling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motorway]] | noun | **1.** A broad highway designed for high-speed traffic. | *"In academic literature, motorway designates a broad highway designed for high-speed traffic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motown]] | noun | **1.** The largest city in michigan and a major great lakes port; center of the united states automobile industry; located in southeastern michigan on the detroit river across from windsor. | *"In academic literature, motown designates the largest city in michigan and a major great lakes port; center of the united states automobile industry; located in southeastern michigan on the detroit river across from windsor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[motrin]] | noun | **1.** A nonsteroidal anti-inflammatory and analgesic medicine (trade names advil and motrin and nuprin) used to relieve the pain of arthritis and as an antipyretic. | *"In academic literature, motrin designates a nonsteroidal anti-inflammatory and analgesic medicine (trade names advil and motrin and nuprin) used to relieve the pain of arthritis and as an antipyretic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mott]] | noun | **1.** United states feminist and suffragist (1793-1880). | *"Mott said, at the women's meeting in Cooper Institute, after Sumter had been fired: 'Go on, ladies!"* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[mottle]] | noun | **1.** An irregular arrangement of patches of color.<br>**2.** Mark with spots or blotches of different color or shades of color as if stained. | *"It is habitually hard upon Sir Leicester, whose countenance it greenly mottles in the manner of sage-cheese and in whose aristocratic system it effects a dismal revolution."* — Charles Dickens, *Bleak House* |
| [[mottled]] | verb | **1.** Mark with spots or blotches of different color or shades of color as if stained.<br>**2.** Colour with streaks or blotches of different shades. | *"Next day she flaunts before the public in her gayest attire, her head bedecked with ornaments and her face mottled with red paint."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[mottling]] | noun | **1.** The act of coloring with areas of different shades.<br>**2.** Mark with spots or blotches of different color or shades of color as if stained. | *"Height 14½ inches. _Eumorfopoulos Collection._ Fig. 2.--Vase, white pottery with traces of blue mottling: the glaze has perished."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[motto]] | noun | **1.** A favorite saying of a sect or political group. | *"The fifth, an hand environed with clouds, Holding out gold that’s by the touchstone tried; The motto thus, _Sic spectanda fides._ The sixth Knight, Pericles, passes in rusty armour with bases, and unaccompanied."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nonmotile]] | adjective | **1.** (of spores or microorganisms) not capable of movement. | *"In academic literature, nonmotile designates (of spores or microorganisms) not capable of movement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overemotional]] | adjective | **1.** Excessively or abnormally emotional. | *"In academic literature, overemotional designates excessively or abnormally emotional."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[promote]] | verb | **1.** Contribute to the progress or growth of.<br>**2.** Give a promotion to or assign to a higher position. | *"‘To promote the conversation,’ as a joker might say."* — Charles Dickens, *Bleak House* |
| [[promoter]] | noun | **1.** Someone who is an active supporter and advocate.<br>**2.** A sponsor who books and stages public entertainments. | *"Not the civil engineer, but the railroad promoter determined the devious lines of many a railroad on the level prairies of America."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[promotion]] | noun | **1.** A message issued in behalf of some product or cause or idea or person or institution.<br>**2.** Act of raising in rank or position. | *"Thou art not for the fashion of these times, Where none will sweat but for promotion, And having that do choke their service up Even with the having."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[promotional]] | adjective | **1.** Of or relating to serving as publicity.<br>**2.** Of or relating to advancement. | *"In academic literature, promotional designates of or relating to serving as publicity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[promotive]] | adjective | **1.** Tending to further or encourage. | *"Proper stimulus Mind is the natural stimulus of the body, but erro- neous belief, taken at its best, is not promotive of health 420:24 or happiness."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[remote]] | noun | **1.** A device that can be used to control a machine or apparatus from a distance.<br>**2.** Located far away spatially. | *"A more remote part of the Castle ACT II Scene I."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remote-controlled]] | adjective | **1.** Lacking a crew. | *"In academic literature, remote-controlled designates lacking a crew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[remotely]] | adverb | **1.** In a remote manner.<br>**2.** To a remote degree. | *"The dairy called Talbothays, for which she was bound, stood not remotely from some of the former estates of the d’Urbervilles, near the great family vaults of her granddames and their powerful husbands."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[remoteness]] | noun | **1.** The property of being remote.<br>**2.** A disposition to be distant and unsympathetic in manner. | *"Their remoteness and unpunctuality, or their exorbitant charges and frauds, will be drawing forth bitter lamentations.” “I mean to be too rich to lament or to feel anything of the sort."* — Jane Austen, *Mansfield Park* |
| [[remotion]] | noun | **1.** The act of removing. | *"This act persuades me That this remotion of the Duke and her Is practice only."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unemotional]] | adjective | **1.** Unsusceptible to or destitute of or showing no emotion.<br>**2.** Cool and formal in manner. | *"D’Urberville mechanically lit a cigar, and the journey was continued with broken unemotional conversation on the commonplace objects by the wayside."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unemotionality]] | noun | **1.** Apathy demonstrated by an absence of emotional reactions.<br>**2.** Absence of emotion. | *"In academic literature, unemotionality designates apathy demonstrated by an absence of emotional reactions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unemotionally]] | adverb | **1.** In an unemotional manner. | *"In academic literature, unemotionally designates in an unemotional manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmotivated]] | adjective | **1.** Without motivation. | *"In academic literature, unmotivated designates without motivation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmotorised]] | adjective | **1.** Having no motor. | *"In academic literature, unmotorised designates having no motor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmotorized]] | adjective | **1.** Having no motor. | *"In academic literature, unmotorized designates having no motor."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · MOT
  </div>
</div>
