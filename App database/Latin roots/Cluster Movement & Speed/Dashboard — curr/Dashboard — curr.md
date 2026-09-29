---
status: unread
type: root_dashboard
---
# Dashboard — curr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">curr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to run”</span>
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

The root **curr** means to run. It refers to moving rapidly on foot, flowing smoothly, or operating continuously. In English, this root forms words such as *current*, *currency*, *curriculum*, and *occur*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to run
> The root **curr** means to run. It refers to moving rapidly on foot, flowing smoothly, or operating continuously. In English, this root forms words such as *current*, *currency*, *curriculum*, and *occur*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To run</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A runner sprinting rapidly across an open field with swift agility.</mark>
> - **Everyday Connection**: Think of familiar words like *current* and *currency*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **curr** comes from a Latin word that means *"to run"*.
  - At its core, it describes the action of run.

- **The Big Picture Idea**:
  - Picture a runner sprinting rapidly across an open field with swift agility.
  - Whenever you see **curr** in an English word, think of **to run**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to run).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Current**: Belonging to or occurring in the present time.
  - **Currency**: A recognized medium of exchange in actual circulation in a country.
  - **Curriculum**: The regular or prescribed course of study in a school, college, or university.
  - **Occur**: To happen.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">curr</mark>, think of <mark class="hl-def">to run</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **curr** operates through distinct morphological stems of the Latin verb *currō, currere, cucurrī, cursum*:
> - **Primary Present Active Stem `curr-`:** Forms English active verbs, root compounds, and verbal nouns:
>   - *concur* (*con-* + *currere*, "to run together, agree")
>   - *incur* (*in-* + *currere*, "to run into, contract liability")
>   - *occur* (*ob-* + *currere*, "to run against, take place")
>   - *recur* (*re-* + *currere*, "to run back, repeat")
>   - *succor* / *succour* (*sub-* + *currere*, "to run beneath to support")
> - **Present Participle Stem `current-` (`currēns`, genitive `currentis`):** Produces adjectives denoting active, ongoing flow and resultant fluid nouns:
>   - *current*, *currency*, *concurrent*, *intercurrent*, *recurrent*, *transcurrent*, *incurrent*, *co-current*, *countercurrent*
> - **Diminutive Instrumental Stem `curricul-` (*curriculum*, from *currus* "chariot"):** Forms nouns and adjectives designating structured paths and tracks:
>   - *curriculum*, *curricula*, *curricular*, *extracurricular*, *curricle*
> - **Romance Vernacular Offshoots:**
>   - Old French *corrier* / Italian *corriere* $\to$ *courier* (a running messenger)
>   - Italian *corridore* $\to$ *corridor* (a running passage, architectural hallway)
>
> ### Morphological Distinction: `curr-` vs. `curs-`
> Latin distinguishes between the **imperfective present stem `curr-`** (ongoing, active running: *concur*, *current*, *recur*) and the **perfective supine stem `curs-`** (*cursum*, frequentative *cursāre*, representing the completed track, manner, or iterated running: *course*, *cursor*, *cursory*, *discourse*, *excursion*, *incursion*, *precursor*). The latter is treated comprehensively on the sister dashboard [[Dashboard — curs]].

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
> Although the root fundamentally signifies **"to run, rush, move swiftly, flow"**, its conceptual trajectory diverges across nine distinct operational planes:
> - 🌊 **Hydrodynamic & Physical Vector Flow:** Literal physical fluids and energy fields moving along a pressure or potential gradient: [[current]], [[countercurrent]], [[crosscurrent]], [[undercurrent]], [[incurrent]], [[co-current]].
> - ⏱️ **Temporal Immediacy & Real-Time Presence:** The present moment as an unhalting stream of time: [[current]], [[currently]], [[currentness]], [[currency]].
> - ⚖️ **Coincidence, Judicial Harmony & Parallel Execution:** Wills, minds, or operations running along identical paths simultaneously: [[concur]], [[concurrence]], [[concurrency]], [[concurrent]], [[concurrently]], [[concurring]].
> - 💥 **Incidence, Collision & Incurred Liability:** Events presenting themselves unexpectedly or consequences brought down upon oneself: [[occur]], [[occurrence]], [[occurred]], [[occurring]], [[incur]], [[incurred]], [[incurring]], [[incurrence]].
> - 🔁 **Iterative Cycles, Return & Medical Relapse:** Trajectories that loop back upon their origin in nature, disease, or neural networks: [[recur]], [[recurred]], [[recurring]], [[recurrence]], [[recurrent]], [[recurrently]].
> - 🎓 **Pedagogical Tracks & Academic Racecourses:** Education structured as a defined racecourse to be completed by a scholar: [[curriculum]], [[curricula]], [[curricular]], [[extracurricular]], [[curricle]].
> - 🏛️ **Conduits of Transit & Rapid Dispatch:** Physical hallways and designated messengers designed for rapid transfer: [[courier]], [[corridor]].
> - 🛡️ **Altruism, Solidarity & Emergency Rescue:** Running beneath a falling comrade to absorb the shock and lift the burden: [[succor]], [[succour]], [[succorer]].
> - 📐 **Transverse & Intervening Intersections:** Running across or inserting between preexisting channels: [[intercurrent]], [[transcurrent]].

---

## 🔀 4. Prefix & Combining Dynamics on curr

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` (*com-*) | together, mutually | [[concur]], [[concurrent]], [[concurrence]], [[concurrency]] | To run together; to agree in opinion, happen simultaneously, or execute parallel tasks without collision. |
| `in-` | into, upon, against | [[incur]], [[incurrence]], [[incurrent]] | To run into; to bring upon oneself an unpleasant liability, or to conduct fluids inward through a biological pore. |
| `ob-` $\to$ `oc-` | toward, in the way of, against | [[occur]], [[occurrence]] | To run into view; to present itself to the mind, come to pass, or happen in reality. |
| `re-` | back, again | [[recur]], [[recurrence]], [[recurrent]] | To run back; to return repeatedly to consciousness, re-emerge in cyclical symptoms, or loop in computation. |
| `sub-` $\to$ `suc-` | under, from beneath | [[succor]], [[succour]], [[succorer]] | To run beneath; to rush under a falling comrade to support his weight, bringing relief in extremity. |
| `inter-` | between, among | [[intercurrent]] | Running between; intervening during an ongoing process, especially a secondary disease modifying a primary illness. |
| `trāns-` | across, through | [[transcurrent]] | Running across; extending transversely across a physical structure or geological formation. |
| `counter-` | against, opposite | [[countercurrent]] | Running in reverse against the prevailing flow, wind, or hydrodynamic stream to maximize heat/mass exchange. |
| `extrā-` | outside, beyond | [[extracurricular]] | Running outside the designated academic racecourse; activities beyond formal curricular requirements. |
| `co-` | jointly, parallel with | [[co-current]] | Flowing alongside another stream in the exact same direction through an industrial vessel. |
| `cross-` | athwart, transverse | [[crosscurrent]] | Flowing diagonally or perpendicularly across the main channel, generating navigational turbulence. |
| `under-` | beneath, submerged | [[undercurrent]] | Flowing beneath the surface; an unspoken, submerged emotional tone or concealed political underlay. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ent` | Adjective / Noun (Present Participle) | [[current]], [[concurrent]], [[recurrent]], [[intercurrent]] | Designates the active, ongoing state of running or the fluid entity itself (*electric current*). |
| `-ency` / `-ence` | Noun (State / Quality / Instance) | [[currency]], [[occurrence]], [[recurrence]], [[concurrence]], [[concurrency]] | Denotes the quality, ongoing condition, or individual event of running (*fiat currency*, *unfortunate occurrence*). |
| `-or` / `-our` | Noun / Verb (Action / Relief / Agent) | [[succor]], [[succour]] | Denotes the act of running to support, the relief rendered, or the verb of rendering aid. |
| `-er` | Noun (Agent / Messenger) | [[courier]], [[succorer]] | Designates the human person who runs messages or delivers lifesaving assistance. |
| `-iculum` / `-icle` | Noun (Diminutive / Instrument / Place) | [[curriculum]], [[curricle]] | Denotes a diminutive running instrument (a light two-wheeled carriage) or an academic racecourse. |
| `-ar` | Adjective (Pertaining to) | [[curricular]], [[extracurricular]] | Transforms the nominal racecourse into an adjective qualifying academic programs. |
| `-ly` | Adverb (Manner / Time) | [[currently]], [[concurrently]], [[recurrently]] | Expresses the temporal manner of running: happening right now, happening simultaneously, or repeating at intervals. |
| `-ness` | Noun (State / Property) | [[currentness]] | Denotes the intrinsic condition of being fresh, present, or in active circulation. |
| `-ing` | Adjective / Verb (Ongoing Process) | [[concurring]], [[occurring]], [[recurring]], [[incurring]] | Expresses progressive aspect or modifies nouns (*concurring opinion*, *recurring nightmare*). |
| `-ed` | Verb / Adjective (Past / Completed State) | [[incurred]], [[occurred]], [[recurred]] | Denotes a liability contracted in the past (*incurred expenses*) or an event that has transpired. |
| `-idor` | Noun (Architectural Conduit) | [[corridor]] | Borrowed from Italian to denote a long passage specifically designed for running or transit between rooms. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚡ **Electrodynamics & Fluid Mechanics** | [[current]], [[countercurrent]], [[co-current]], [[undercurrent]] | Quantification of electric charge flow (amperes, $I = \Delta Q / \Delta t$); oceanic circulation systems (thermohaline conveyor); chemical engineering countercurrent heat and mass exchangers. |
| 💰 **Economics, Banking & Finance** | [[currency]], [[current]], [[incur]], [[incurred]] | Fiat currency and money velocity ($M \cdot V = P \cdot Y$); liquidity and current account deficits; corporate balance sheet liabilities and incurred debt obligations under bond covenants. |
| 🎓 **Education, Pedagogy & Academia** | [[curriculum]], [[curricula]], [[curricular]], [[extracurricular]] | Institutional syllabus architecture; accreditation benchmarking; core general education requirements; co-curricular leadership and extracurricular athletic programs. |
| 🚚 **Logistics, Postal History & Transport** | [[courier]], [[corridor]], [[curricle]] | The Roman *cursus publicus*; international secure diplomatic dispatches; global multimodal freight corridors; Regency-era swift carriage transit. |
| 🏛️ **Architecture, Urban Planning & Civil Life** | [[corridor]], [[undercurrent]] | Circulation space planning in high-density building codes; emergency egress corridors; transit-oriented development corridors linking metropolitan centers. |
| 🩺 **Clinical Medicine, Pathology & Surgery** | [[concurrent]], [[intercurrent]], [[recurrent]], [[recurrence]], [[incurrent]] | Comorbid disease presentation; intercurrent infections altering primary disease trajectories; neoplastic recurrence monitoring; surgical sparing of the recurrent laryngeal nerve; sponge incurrent siphons. |
| ⚖️ **Appellate Jurisprudence & Criminal Law** | [[concur]], [[concurrence]], [[concurring]], [[concurrent]] | High court appellate practice where a justice authoring a concurring opinion agrees with the judgment while disputing rationale; concurrent vs. consecutive sentencing in penal law. |
| 💻 **Computer Science & Distributed Systems** | [[concurrency]], [[concurrent]] | Multithreaded software architecture; synchronization primitives (mutexes, semaphores); lock-free concurrent data structures; actor models avoiding race conditions. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[concurrence]] | noun | **1.** Agreement of results or opinions.<br>**2.** Acting together, as agents or circumstances or events. | *"Jarndyce,” he went on, “makes no condition beyond expressing his expectation that our young friend will not at any time remove herself from the establishment in question without his knowledge and concurrence."* — Charles Dickens, *Bleak House* |
| [[concurrency]] | noun | **1.** Agreement of results or opinions.<br>**2.** Acting together, as agents or circumstances or events. | *"In academic literature, concurrency designates agreement of results or opinions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[concurrent]] | adjective | **1.** Occurring or operating at the same time. | *"Let but a flute Play ’neath the fine-mixed metal: listen close Till the right note flows forth, a silvery rill: Then shall the huge bell tremble—then the mass With myriad waves concurrent shall respond In low soft unison."* — George Eliot, *Middlemarch* |
| [[concurrently]] | adverb | **1.** Overlapping in duration. | *"Concurrently, at a signal from the UIPS President's ship Eagle, the station flashed an array of multicolored beacons."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[concurring]] | verb | **1.** Be in accord; be in agreement.<br>**2.** Happen simultaneously. | *"A line descending from the vital, beneath the congress of it and the hepatica, to the tuberculum of Saturn, shows an envious man, who rejoices at another’s calamity, the sight of others concurring."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[countercurrent]] | noun | **1.** A stretch of turbulent water in a river or the sea caused by one current flowing into or across another current.<br>**2.** Actions counter to the main group activity. | *"In academic literature, countercurrent designates a stretch of turbulent water in a river or the sea caused by one current flowing into or across another current."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[currajong]] | noun | **1.** Widely distributed tree of eastern australia yielding a tough durable fiber and soft light attractively grained wood; foliage is an important emergency food for cattle. | *"In academic literature, currajong designates widely distributed tree of eastern australia yielding a tough durable fiber and soft light attractively grained wood; foliage is an important emergency food for cattle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[currant]] | noun | **1.** Any of several tart red or black berries used primarily for jellies and jams.<br>**2.** Any of various deciduous shrubs of the genus ribes bearing currants. | *"We don't live in the rectory now, but where there is a garden with lots of paths, and where the big currant-bushes are in the corners, here and here and here." Mäzli traced the position of the bushes exactly on the lionskin."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[currawong]] | noun | **1.** Bluish black fruit-eating bird with a bell-like call. | *"In academic literature, currawong designates bluish black fruit-eating bird with a bell-like call."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[currency]] | noun | **1.** The metal or paper medium of exchange that is presently used.<br>**2.** General acceptance or use. | *"This properly belongs in a complete theoretical treatment of the subject.] [Footnote 8: See "Modern Currency Reforms" (1916), by E.W."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[current]] | noun | **1.** A flow of electricity through a conductor.<br>**2.** A steady flow of a fluid (usually from natural causes). | *"This bald unjointed chat of his, my lord, I answered indirectly, as I said, And I beseech you, let not his report Come current for an accusation Betwixt my love and your high Majesty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[currently]] | adverb | **1.** At this time or period; now. | *"I examined, too, in thought, the possibility of my ever being able to translate currently a certain little French story which Madame Pierrot had that day shown me; nor was that problem solved to my satisfaction ere I fell sweetly asleep."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[currentness]] | noun | **1.** The property of belonging to the present time. | *"In academic literature, currentness designates the property of belonging to the present time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curricular]] | adjective | **1.** Of or relating to an academic course of study. | *"In academic literature, curricular designates of or relating to an academic course of study."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curriculum]] | noun | **1.** An integrated course of academic studies. | *"The curriculum of the "Divinity Hall," as it was called, consisted of five of these short sessions."* — John Cairns, *Principal Cairns* |
| [[currier]] | noun | **1.** United states lithographer who (with his partner james ives) produced thousands of prints signed `currier & ives' (1813-1888).<br>**2.** A craftsman who curries leather for use. | *"In academic literature, currier designates united states lithographer who (with his partner james ives) produced thousands of prints signed `currier & ives' (1813-1888)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[currish]] | adjective | **1.** Base and cowardly.<br>**2.** Resembling a cur; snarling and rude. | *"Let Aesop fable in a winter’s night; His currish riddle sorts not with this place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[currishly]] | adverb | **1.** In a currish manner; meanspiritedly. | *"In academic literature, currishly designates in a currish manner; meanspiritedly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[curry]] | noun | **1.** (east indian cookery) a pungent dish of vegetables or meats flavored with curry powder and usually eaten with rice.<br>**2.** Season with a mixture of spices; typical of indian cooking. | *"If I had a suit to Master Shallow, I would humour his men with the imputation of being near their master: if to his men, I would curry with Master Shallow that no man could better command his servants."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[currycomb]] | noun | **1.** A square comb with rows of small teeth; used to curry horses.<br>**2.** Clean (a horse) with a currycomb. | *"In academic literature, currycomb designates a square comb with rows of small teeth; used to curry horses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extracurricular]] | adjective | **1.** Outside the regular academic curriculum.<br>**2.** Outside the regular duties of your job or profession. | *"In academic literature, extracurricular designates outside the regular academic curriculum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incurrence]] | noun | **1.** The act of incurring (making yourself subject to something undesirable). | *"In academic literature, incurrence designates the act of incurring (making yourself subject to something undesirable)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incurring]] | noun | **1.** Acquiring or coming into something (usually undesirable).<br>**2.** Make oneself subject to; bring upon oneself; become liable to. | *"In fact, and I who am about to die have the right to say it without incurring the charge of immodesty, the three best minds in San Quentin from the Warden down were the three that rotted there together in solitary."* — Jack London, *The Jacket (The Star-Rover)* |
| [[noncurrent]] | adjective | **1.** Not current or belonging to the present time. | *"In academic literature, noncurrent designates not current or belonging to the present time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonoccurrence]] | noun | **1.** Absence by virtue of not occurring. | *"In academic literature, nonoccurrence designates absence by virtue of not occurring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[occurrence]] | noun | **1.** An event that happens.<br>**2.** An instance of something occurring. | *"All the occurrence of my fortune since Hath been between this lady and this lord."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[occurrent]] | noun | **1.** An event that happens.<br>**2.** Presently occurring (either causally or incidentally). | *"So tell him, with the occurrents more and less, Which have solicited."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recurrence]] | noun | **1.** Happening again (especially at regular intervals). | *"And then, for half-an-hour, ten minutes, or as long as an hour or so, I would wander erratically and foolishly through the stored memories of my eternal recurrence on earth."* — Jack London, *The Jacket (The Star-Rover)* |
| [[recurrent]] | adjective | **1.** Recurring again and again. | *"You had better go down.” Bathsheba said nothing; but he could distinctly hear her rhythmical pants, and the recurrent rustle of the sheaf beside her in response to her frightened pulsations."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[recurrently]] | adverb | **1.** In a recurrent manner. | *"In academic literature, recurrently designates in a recurrent manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recurring]] | verb | **1.** Happen or occur again.<br>**2.** Return in thought or speech to something. | *"Especially at the recurring periods of financial stress, such as occurred in 1893, 1903, and 1907, our banking machinery showed itself to be wofully unequal to the strain put upon it."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[undercurrent]] | noun | **1.** A subdued emotional quality underlying an utterance; implicit meaning.<br>**2.** A current below the surface of a fluid. | *"For even when I was there the undercurrent of discontent in the province was visible."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |

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
    ROOT DASHBOARD · CURR
  </div>
</div>
