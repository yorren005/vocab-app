---
status: unread
type: root_dashboard
---
# Dashboard — ambul
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ambul-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to walk”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A runner sprinting rapidly across an open field with swift agility.</span>
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

The root **ambul** means to walk. It refers to traveling on foot, strolling about, or moving step by step. In English, this root forms words such as *ambulance*, *ambulatory*, *perambulate*, and *somnambulist*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to walk
> The root **ambul** means to walk. It refers to traveling on foot, strolling about, or moving step by step. In English, this root forms words such as *ambulance*, *ambulatory*, *perambulate*, and *somnambulist*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To walk</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *ambulance* and *ambulatory*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ambul** comes from a Latin word that means *"to walk"*.
  - At its core, it describes the action of walk.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **ambul** in an English word, think of **to walk**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to walk).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Ambulance**: A specially equipped motor vehicle, aircraft, or vessel designed to provide emergency medical treatment and transport sick or injured individuals to healthcare facilities.
  - **Ambulatory**: Relating to or adapted for walking.
  - **Perambulate**: To walk through, over, or around an area, estate, or town, especially at leisure or for thorough inspection.
  - **Somnambulist**: An individual who walks or performs complex behaviors while asleep.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ambul</mark>, think of <mark class="hl-def">to walk</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ambul** expands across English vocabulary through distinct morphological stems, phonetic reductions, and compound formations:
>
> - **Primary Active Stem (`ambul-`):** Inherited directly from the present active stem of *ambulāre*, this stem generates nouns and adjectives of ongoing walking, capacity, and mobility: [[ambulant]], [[ambulance]], [[ambulanceman]].
> - **Participial & Supine Stem (`ambulat-`):** Derived from the fourth principal part *ambulātum*, this stem supplies Latinate verbs, abstract process nouns, and architectural designations: [[ambulate]], [[ambulation]], [[ambulatory]], [[perambulate]], [[circumambulate]], [[inambulate]].
> - **French Syncopated / Frequentative Stem (`amble-`):** Passing through Vulgar Latin *\*amblāre* into Old French *ambler* ("to go at an easy pace", specifically of horses moving laterally), the medial unstressed *-u-* was lost through syncope, producing the relaxed English family: [[amble]], [[ambler]], [[ambling]], [[amblingly]].
> - **Diminutive Vehicle Suffixation (`ambulette`):** American urban medical transport combined clipped *ambulance* with the French diminutive suffix *-ette* to denote non-emergency patient vans.
> - **Classical Compounding Engine:** The root unites readily with Latin nominal and adjectival stems:
>   - With **somnus** ("sleep"): $\to$ [[somnambulism]], [[somnambulist]], [[somnambulant]], [[somnambulate]].
>   - With **nox, noctis** ("night"): $\to$ [[noctambulist]], [[noctambulism]].
>   - With **fūnis** ("rope, cable"): $\to$ [[funambulist]], [[funambulism]].
> - **Directional Prefixation Paradigm:** Modifying prefixes attach directly to govern spatial trajectory:
>   - `prae-` (before) $\to$ [[preamble]], [[preambular]].
>   - `per-` (through, thoroughly) $\to$ [[perambulate]], [[perambulation]], [[perambulator]], [[perambulatory]].
>   - `circum-` (around) $\to$ [[circumambulate]], [[circumambulation]].
>   - `in-` (in, upon) $\to$ [[inambulate]].

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
> Although rooted in the elementary physical act of stepping on foot, the semantic spectrum of **ambul** branches into six distinct conceptual planes:
>
> 1. **Leisurely, Unhurried Locomotion (The Stroll):**
>    In [[amble]], [[ambler]], [[ambling]], and [[amblingly]], the root denotes carefree, relaxed movement unburdened by haste, capturing the serene pace of vacationers, philosophers, or smooth-gaited saddle horses.
>
> 2. **Clinical Mobility, Rehabilitation & Emergency Trauma Care:**
>    In [[ambulant]], [[ambulate]], and [[ambulation]], the root forms a crucial clinical index: whether a patient can walk or remains bedridden. In [[ambulance]], [[ambulanceman]], and [[ambulette]], the concept shifts from the patient's legs to specialized medical transport operating across metropolitan and battlefield spaces.
>
> 3. **Spatial Traversal, Boundary Inspection & Wheeled Conveyance:**
>    In [[perambulate]], [[perambulation]], and [[perambulatory]], walking becomes an exhaustive, orderly inspection of geographic terrain or legal parish boundaries. In [[perambulator]] (the British "pram"), the word morphs into a four-wheeled carriage pushed by a walking caregiver.
>
> 4. **Sacred, Ritual & Architectural Circulation:**
>    In [[ambulatory]], the root provides the spatial path curving behind cathedral altars. In [[circumambulate]] and [[circumambulation]], walking becomes a sacred ritual act of revolving around holy shrines, stupas, or altars. In [[inambulate]], it describes meditative pacing up and down a hall or colonnade.
>
> 5. **Discursive, Diplomatic & Constitutional Preliminaries:**
>    In [[preamble]] and [[preambular]], physical walking transforms into rhetorical path-clearing: the prefatory narrative that introduces laws, treaties, and international covenants before the operative articles begin.
>
> 6. **Altered States of Consciousness & Acrobatic Equilibrium:**
>    In [[somnambulism]], [[somnambulist]], [[somnambulant]], and [[somnambulate]], the root captures the eerie paradox of walking while asleep. In [[noctambulist]] and [[noctambulism]], it tracks night wanderers. In [[funambulist]] and [[funambulism]], walking ascends onto an elevated highwire, demanding supreme bodily equilibrium.

---

## 🔀 4. Prefix & Combining Dynamics on ambul

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `prae-` (pre-) | before, in front of | [[preamble]], [[preambular]] | Walking *before* $\to$ an introductory statement clearing the path for a constitution, statute, or treaty. |
| `per-` | through, thoroughly, across | [[perambulate]], [[perambulation]], [[perambulator]], [[perambulatory]] | Walking *through or all over* an area $\to$ to inspect boundaries thoroughly on foot; a baby carriage pushed on foot. |
| `circum-` | around, about | [[circumambulate]], [[circumambulation]] | Walking *around in a circle* $\to$ ritual or ceremonial encirclement of a sacred monument, shrine, or altar. |
| `in-` | in, within, upon | [[inambulate]] | Walking *up and down within* a space $\to$ pacing back and forth along a hallway, gallery, or colonnade. |
| `somn-` (*somnus*) | sleep | [[somnambulism]], [[somnambulist]], [[somnambulant]], [[somnambulate]] | Walking *while asleep* $\to$ a NREM parasomnia involving complex ambulation during deep sleep. |
| `noct-` (*nox*) | night | [[noctambulist]], [[noctambulism]] | Walking *at night* $\to$ nocturnal wandering, whether in sleep or during late-night exploration. |
| `fun-` (*fūnis*) | rope, cord | [[funambulist]], [[funambulism]] | Walking *on a rope* $\to$ tightrope walking; figurative acrobatic balancing in politics or diplomacy. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-e` (< OFr *-er*) | Verb (Infinitive / Base) | [[amble]] | Expresses the unhurried, relaxed action of walking. |
| `-er` | Noun (Agent) | [[ambler]] | Denotes one who ambles, or an ambling saddle horse. |
| `-ing` | Adjective / Verbal Noun | [[ambling]] | Describes the leisurely gait or the ongoing act of strolling. |
| `-ingly` | Adverb (Manner) | [[amblingly]] | Modifies an action performed at an easy, leisurely, relaxed pace. |
| `-ance` (< Latin *-antia*) | Noun (State / Machine) | [[ambulance]] | Originally the mobile field hospital; now the emergency transport vehicle. |
| `-man` | Noun (Compound Agent) | [[ambulanceman]] | Denotes an emergency medical technician or paramedic crew member. |
| `-ant` (< Latin *-āns, -antis*) | Adjective (Participial State) | [[ambulant]], [[somnambulant]] | Designates a person actively walking, mobile, or walking while asleep. |
| `-ate` (< Latin *-ātus*) | Verb (Causative / Action) | [[ambulate]], [[somnambulate]], [[circumambulate]], [[inambulate]], [[perambulate]] | Formal verbal actions of walking, sleepwalking, circling, pacing, or traversing. |
| `-ation` (< Latin *-ātiō*) | Noun (Process / State) | [[ambulation]], [[circumambulation]], [[perambulation]] | The formal act or measurable clinical process of walking or surveying. |
| `-ator` (< Latin *-ātor*) | Noun (Agent / Instrument) | [[perambulator]] | The person walking, or the wheeled apparatus (pram / surveyor's wheel). |
| `-atory` (< Latin *-ātōrius*) | Adjective / Noun (Locative) | [[ambulatory]], [[perambulatory]] | Pertaining to walking; in architecture, the processional walkway behind an apse. |
| `-ette` (< French *-ette*) | Noun (Diminutive) | [[ambulette]] | Denotes a smaller, specialized van for non-emergency patient transport. |
| `-ar` (< Latin *-āris*) | Adjective (Relating to) | [[preambular]] | Pertaining to or forming part of a preamble in legal/diplomatic texts. |
| `-ism` (< Greek *-ismos*) | Noun (Condition / Practice) | [[somnambulism]], [[noctambulism]], [[funambulism]] | Designates the clinical condition (sleepwalking) or the acrobatic art (tightrope walking). |
| `-ist` (< Greek *-istēs*) | Noun (Practitioner / Agent) | [[somnambulist]], [[noctambulist]], [[funambulist]] | The individual who sleepwalks, night-wanders, or walks the highwire. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🚑 **Emergency Medicine & Prehospital Care** | [[ambulance]], [[ambulanceman]], [[ambulette]] | Mobile triage and intensive-care transport vehicles dispatched via emergency dispatch systems; paramedic rapid-response units; non-emergency wheelchair-accessible medical van transport. |
| 🏥 **Clinical Rehabilitation & Inpatient Medicine** | [[ambulant]], [[ambulate]], [[ambulation]], [[ambulatory]] | Postoperative mobilization protocols preventing pulmonary embolism and muscle atrophy; physical therapy gait training; outpatient ambulatory surgical centers and 24-hour ambulatory Holter cardiac monitoring. |
| 🏛️ **Architecture, Art History & Ecclesiology** | [[ambulatory]] | Semicircular vaulted pilgrimage walkways encircling Gothic cathedral apses (e.g., Chartres, Saint-Denis); monastic cloisters providing sheltered processional space; design of museum circulation loops. |
| ⚖️ **Jurisprudence, Constitutional & International Law** | [[preamble]], [[preambular]], [[ambulatory]] | Foundational preambles establishing legislative intent in constitutions and treaties; United Nations Security Council preambular clauses; the "ambulatory" character of wills (revocable until the testator's death). |
| 🛌 **Sleep Medicine, Neurology & Psychiatry** | [[somnambulism]], [[somnambulist]], [[somnambulant]], [[somnambulate]], [[noctambulist]], [[noctambulism]] | Diagnostic classification of NREM parasomnias (arising during stage N3 slow-wave sleep); polysomnographic monitoring; psychiatric evaluation of dissociative states and nocturnal wanderings. |
| 🎪 **Performing Arts, Circus & Highwire Acrobatics** | [[funambulist]], [[funambulism]] | Traditional and contemporary tightrope walking; highwire artists (e.g., Philippe Petit crossing between the Twin Towers); political and diplomatic metaphors of high-stakes precarious balancing. |
| 🗺️ **Municipal Surveying, Land Tenure & Common Law** | [[perambulate]], [[perambulation]], [[perambulator]], [[perambulatory]] | Ancient English parish boundary customs ("beating the bounds" on Rogation days); surveyor's wheel instrumentation; Victorian child-care nursery prams. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[ambulacral]] | adjective | **1.** Pertaining to the ambulacra of radial echinoderms. | *"In academic literature, ambulacral designates pertaining to the ambulacra of radial echinoderms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ambulacrum]] | noun | **1.** One of the five areas on the undersurface of an echinoderm on which the tube feet are located. | *"In academic literature, ambulacrum designates one of the five areas on the undersurface of an echinoderm on which the tube feet are located."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ambulance]] | noun | **1.** A vehicle that takes people to and from hospitals. | *"There is an ambulance here: I think I will put you in it, and have you taken home at once."* — Martha Finley, *Elsie's Kith and Kin* |
| [[ambulant]] | adjective | **1.** Able to walk about. | *"Haec inquam animalia in aere volant, in aquis natant, in terra ambulant."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[ambulate]] | verb | **1.** Walk about; not be bedridden or incapable of walking. | *"In academic literature, ambulate designates walk about; not be bedridden or incapable of walking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ambulation]] | noun | **1.** Walking about. | *"In academic literature, ambulation designates walking about."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ambulatory]] | noun | **1.** A covered walkway (as in a cloister).<br>**2.** Relating to or adapted for walking. | *"Conversely, some day-care adults might have ambulatory problems that call out to children who have an intrinsic energy and desire to help."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[ambulette]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ambul within the domain of Movement & Speed.<br>**2.** A technical or specialized form exhibiting the properties of ambul in systematic terminology. | *"In academic literature, ambulette designates pertaining to, derived from, or characteristic of latin ambul within the domain of movement & speed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circumambulate]] | verb | **1.** Walk around something. | *"For example, among the Beni-Snous the women light a fire in an oven, throw perfumes into it, and circumambulate a tank, which they also incense after a fashion."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[perambulate]] | verb | **1.** Make an official inspection on foot of (the bounds of a property).<br>**2.** Walk with no particular goal. | *"The last survivor of these perambulating English giants lingered at Salisbury, where an antiquary found him mouldering to decay in the neglected hall of the Tailors' Company about the year 1844."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[perambulating]] | verb | **1.** Make an official inspection on foot of (the bounds of a property).<br>**2.** Walk with no particular goal. | *"The last survivor of these perambulating English giants lingered at Salisbury, where an antiquary found him mouldering to decay in the neglected hall of the Tailors' Company about the year 1844."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[perambulation]] | noun | **1.** A walk around a territory (a parish or manor or forest etc.) in order to officially assert and record its boundaries.<br>**2.** A leisurely walk (usually in some public place). | *"So similarly he had a very shrewd suspicion that Mr Johnny Lever got rid of some £. s. d. in the course of his perambulations round the docks in the congenial atmosphere of the _Old Ireland_ tavern, come back to Erin and so on."* — James Joyce, *Ulysses* |
| [[perambulator]] | noun | **1.** A small vehicle with four wheels in which a baby or child is pushed around. | *"I picked it up, and gave it back to a worried-looking little mother who was endeavouring to arrange the wrapping in the perambulator with one hand, while with the other she clutched firmly at the arm of an obstreperous person of three."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[somnambulant]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ambul within the domain of Movement & Speed.<br>**2.** A technical or specialized form exhibiting the properties of ambul in systematic terminology. | *"In academic literature, somnambulant designates pertaining to, derived from, or characteristic of latin ambul within the domain of movement & speed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somnambulate]] | verb | **1.** Walk in one's sleep. | *"In academic literature, somnambulate designates walk in one's sleep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somnambulation]] | noun | **1.** Walking by a person who is asleep. | *"In academic literature, somnambulation designates walking by a person who is asleep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[somnambulism]] | noun | **1.** Walking by a person who is asleep. | *"THE MINISTER’S VIGIL Walking in the shadow of a dream, as it were, and perhaps actually under the influence of a species of somnambulism, Mr."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[somnambulist]] | noun | **1.** Someone who walks about in their sleep. | *"I did not expect this; but all I have is yours.” Boldwood, more like a somnambulist than a wakeful man, pulled out the large canvas bag he carried by way of a purse, and searched it."* — Thomas Hardy, *Far from the Madding Crowd* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Movement & Speed]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · AMBUL
  </div>
</div>
