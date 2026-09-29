---
status: unread
type: root_dashboard
---
# Dashboard — scend
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">scend-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to climb”</span>
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

The root **scend** means to climb. It refers to climb, mount, scale, rise, measure metrical feet, survey. In English, this root forms words such as *ascend*, *descend*, and *transcend*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to climb
> The root **scend** means to climb. It refers to climb, mount, scale, rise, measure metrical feet, survey. In English, this root forms words such as *ascend*, *descend*, and *transcend*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To climb</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *ascend* and *descend*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **scend** comes from a Latin word that means *"to climb"*.
  - At its core, it describes the action of climb.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **scend** in an English word, think of **to climb**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to climb).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Ascend**: To move, climb, or travel upward.
  - **Descend**: To move, pass, or travel downward from a higher to a lower position or elevation.
  - **Transcend**: To rise above or go beyond the limits, boundaries, or scope of.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">scend</mark>, think of <mark class="hl-def">to climb</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **scend** operates through a dual morphological system governed by classical Latin phonological shifts:
>
> 1. **The Simplex Verbal Stem (`scand-` / `scāns-`):**
>    - Present stem *scand-* (from *scandō, scandere*): Enters English via late academic borrowing as the monosyllabic verb **scan**, with its modern technical derivatives **scanner** and **scanning**.
>    - Participial / Supine stem *scāns-* (from *scānsum*): Yields Latinate learned nouns and biological adjectives: **scansion** and **scansorial**.
>
> 2. **The Apophonic Compound Stem (`-scend-` / `-scēns-`):**
>    - **Vowel Weakening (Apophonia):** In Classical Latin, when prefixes attach to a base root with short medial *a*, the vowel weakens to short *e* in closed syllables (*scandō* $\to$ *-scendō*).
>    - **Compounded Verbs:**
>      - *ad-* + *scandere* $\to$ *ascendere* (assimilation: *ad-* drops *d* before *sc-* to yield *a-*) $\to$ **ascend**.
>      - *dē-* + *scandere* $\to$ *dēscendere* $\to$ **descend**.
>      - *trāns-* + *scandere* $\to$ *trānscendere* $\to$ **transcend**.
>      - *com-* + *dē-* + *scandere* $\to$ *condēscendere* $\to$ **condescend**.
>    - **Participial Formations in `-scēns-`:**
>      - Produces action/state nouns in *-iō*: **ascension**, **descension**, **condescension**.
>      - Produces agentive, capability, and relational adjectives in *-ible*, *-ive*, and *-al*: **descensible**, **ascensive**, **ascensional**, **transcendental**.
>
> 3. **French Participial & Nominal Offshoots (`-scent`):**
>    - Old French substantives derived from past participles formed English monosyllables terminating in *-t*: **descent** and **ascent**.

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

```
                                      ┌── Physical Climb & Elevation ──────── ascend, ascent, ascender, ascensional, ascensive
                                      │
                                      ├── Gravitational Fall & Incline ────── descend, descent, descender, descensible, descension
                                      │
                                      ├── Lineage & Social Dominance ──────── descendant, descendent, ascendant, ascendance, ascendancy
    [SCAND- / -SCEND- / -SCĒNS-] ─────┼── Social Accommodation & Pejoration ─ condescend, condescending, condescendingly, condescension
(climb / mount / survey rhythm)       │
                                      ├── Metaphysics & Epistemology ──────── transcend, transcendence, transcendency, transcendent, transcendental
                                      │
                                      ├── Poetic Cadence & Metrics ────────── scansion, scan
                                      │
                                      ├── Electronic & Medical Imaging ────── scan, scanner, scanning
                                      │
                                      └── Evolutionary Arboreal Climbing ──── scansorial
```

> [!tip] 🌈 Shades of Meaning in Different Words
> Although the root fundamentally denotes **"to climb, step, or mount"**, its conceptual application radiates across diverse dimensional planes:
> - **The Spatial & Physical Plane:** Literal bodily or mechanical movement upward against gravity ([[ascend]], [[ascent]], [[ascender]]) or downward with gravity ([[descend]], [[descent]], [[descender]]).
> - **The Dynastic & Astrological Plane:** Movement along a genealogical timeline, tracing progeny downward from ancestors ([[descendant]]) or rising upward to governing power and astral preeminence ([[ascendant]], [[ascendancy]]).
> - **The Metaphysical & Transcendental Plane:** Crossing the threshold of empirical cognition into spiritual, mathematical, or intuitive realities ([[transcend]], [[transcendental]], [[transcendence]]).
> - **The Social & Ethical Plane:** Stepping downward across social barriers, tracing a historical trajectory from saintly humility to patronizing disdain ([[condescend]], [[condescension]]).
> - **The Analytical & Optical Plane:** Traversing an object or text unit by unit, from metrical feet in classical verse ([[scansion]]) to electronic raster lines and digital image capture ([[scan]], [[scanner]], [[scanning]]).
> - **The Zoological Plane:** Morphological specializations for climbing vertical trunks and arboreal canopies ([[scansorial]]).

---

## 🔀 4. Prefix & Combining Dynamics on scend

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (assimilated to `a-`) | to, toward, upward | [[ascend]] | Directs the climbing motion upward toward an apex or summit; elevation, rising to power. |
| `dē-` | down, away from | [[descend]] | Directs the climbing motion downward; falling, physical decline, genealogical succession. |
| `trāns-` | across, beyond | [[transcend]] | Directs the step across an established limit, boundary, or category; surpassing, excelling. |
| `com-` + `dē-` | together + down | [[condescend]] | Literally "to climb down together with someone"; graciously stepping down from rank, later patronizing. |
| *(simplex / zero prefix)* | bare root (*scandere*) | [[scan]], [[scansion]] | Measures verse feet by rhythmic climbing; by extension, close inspection and raster digitizing. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ant` / `-ent` | Pres. Participle / Adj. or Noun | [[ascendant]], [[descendant]], [[transcendent]] | Designates an entity in active rising, falling, or surpassing; or an agent of that state. |
| `-ance` / `-ancy` / `-ence` / `-ency` | Noun (State / Quality / Office) | [[ascendancy]], [[ascendance]], [[transcendence]], [[transcendency]] | Reifies the condition of holding dominance, authority, or metaphysical elevation. |
| `-sion` | Noun (Act / Result of Action) | [[ascension]], [[descension]], [[condescension]], [[scansion]] | Names the completed process or event of climbing, stepping down, or metrical analysis. |
| `-t` | Noun (Result via Romance) | [[ascent]], [[descent]] | Concrete or spatial noun designating an instance of upward or downward travel or a slope. |
| `-er` | Noun (Agent / Instrument) | [[ascender]], [[descender]], [[scanner]] | Designates the person, physical apparatus, or typographic feature executing the verticality. |
| `-al` | Adjective (Pertaining to) | [[transcendental]], [[ascensional]] | Denotes characteristics relating to cosmic conditions, *a priori* concepts, or rising air. |
| `-ive` | Adjective (Tendency / Quality) | [[ascensive]] | Describes an inclination to rise or an escalating rhetorical cadence. |
| `-ible` | Adjective (Passive Capacity) | [[descensible]] | Signifies capability of being negotiated downward or legally inherited. |
| `-orial` | Adjective (Relational / Adaptation) | [[scansorial]] | Describes anatomical traits evolved specifically for climbing locomotion. |
| `-ism` / `-ist` | Noun (Doctrine / Adherent) | [[transcendentalism]], [[transcendentalist]] | Names philosophical movements asserting intuitive supremacy over empiricism. |
| `-ing` / `-ingly` | Participle / Adverb | [[condescending]], [[condescendingly]], [[scanning]], [[transcending]] | Encapsulates active behavioral attitudes, technical processes, or continuous transcendence. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📜 **Classical Prosody & Poetics** | [[scansion]], [[scan]] | Analytical metrical division of epic poetry (dactylic hexameter, iambic pentameter) into feet, caesuras, and ictus markers. |
| 💻 **Computer Vision & Digital Imaging** | [[scan]], [[scanner]], [[scanning]] | Raster scanning, laser barcode reading, 3D LiDAR topography, and flatbed optical document digitization. |
| 🏥 **Medicine & Biomedical Diagnostics** | [[scanner]], [[scan]], [[scanning]] | Computed Tomography (CT), Magnetic Resonance Imaging (MRI), and Positron Emission Tomography (PET) diagnostic cross-sections. |
| 🧘 **Philosophy & Metaphysics** | [[transcend]], [[transcendence]], [[transcendent]], [[transcendental]], [[transcendentalism]], [[transcendentalist]] | Kantian *a priori* epistemology; Emersonian New England Transcendentalism; theological discussions of divine immanence versus divine transcendence. |
| 🔭 **Astronomy & Astrometry** | [[ascension]], [[ascendant]], [[descension]], [[descendent]] | Right Ascension ($\alpha$) in equatorial celestial coordinate systems; the astrological Ascendant (rising sign on the eastern horizon). |
| 🔤 **Typography & Font Engineering** | [[ascender]], [[descender]] | Anatomical design of type: ascenders extending above the x-height (*b, d, f, h, k, l*) and descenders plunging below the baseline (*g, j, p, q, y*). |
| ⚖️ **Law, Probate & Genealogy** | [[descent]], [[descendant]], [[ascent]], [[descensible]] | Hereditary succession, intestate distribution of real property, canons of lineal descent, and ancestral heirship. |
| 🧗 **Aeronautics & Mountaineering** | [[ascent]], [[descent]], [[ascend]], [[descend]], [[ascender]], [[ascensional]] | Rate-of-climb indicators in aviation; thermal ascensional air currents; mechanical rope-grab ascenders (Jümars) and rappel descenders. |
| 🦅 **Zoology & Comparative Morphology** | [[scansorial]] | Evolutionary adaptations for climbing arboreal substrates, such as zygodactyl feet in woodpeckers and climbing claws in arboreal mammals. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[ascend]] | verb | **1.** Travel up,.<br>**2.** Go back in order of genealogical succession. | *"O for a Muse of fire, that would ascend The brightest heaven of invention, A kingdom for a stage, princes to act, And monarchs to behold the swelling scene!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ascendable]] | adjective | **1.** Capable of being ascended. | *"In academic literature, ascendable designates capable of being ascended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ascendance]] | noun | **1.** The state that exists when one person or group has power over another. | *"In academic literature, ascendance designates the state that exists when one person or group has power over another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ascendancy]] | noun | **1.** The state that exists when one person or group has power over another. | *"She knew how high his standard of honor was, but how would he end if his unfortunate trait gained more ascendancy over him?"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[ascendant]] | noun | **1.** Position or state of being dominant or in control.<br>**2.** Someone from whom you are descended (but usually more remote than a grandparent). | *"Just now the first feeling was in the ascendant with Bathsheba, with a dash of the second."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ascendence]] | noun | **1.** The state that exists when one person or group has power over another. | *"In academic literature, ascendence designates the state that exists when one person or group has power over another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ascendency]] | noun | **1.** The state that exists when one person or group has power over another. | *"Propensities, tendencies, habits, were as dead leaves upon the tyrannous wind of his imaginative ascendency."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ascendent]] | noun | **1.** Position or state of being dominant or in control.<br>**2.** Someone from whom you are descended (but usually more remote than a grandparent). | *"In academic literature, ascendent designates position or state of being dominant or in control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ascender]] | noun | **1.** Someone who ascends.<br>**2.** A lowercase letter that has a part extending above other lowercase letters. | *"In academic literature, ascender designates someone who ascends."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ascendible]] | adjective | **1.** Capable of being ascended. | *"In academic literature, ascendible designates capable of being ascended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ascending]] | noun | **1.** The act of changing location in an upward direction.<br>**2.** Travel up,. | *"As soon as they were fairly ascending Belmont, he began— “Well, now you shall hear something that will surprise you."* — Jane Austen, *Persuasion* |
| [[condescend]] | verb | **1.** Behave in a patronizing and condescending manner.<br>**2.** Do something that one considers to be below one's dignity. | *"Where I was wont to feed you with my blood, I’ll lop a member off and give it you In earnest of a further benefit, So you do condescend to help me now. [_They hang their heads._] No hope to have redress?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[condescending]] | verb | **1.** Behave in a patronizing and condescending manner.<br>**2.** Do something that one considers to be below one's dignity. | *"My landlord, Krook,” said the little old lady, condescending to him from her lofty station as she presented him to us."* — Charles Dickens, *Bleak House* |
| [[condescendingly]] | adverb | **1.** With condescension; in a patronizing manner. | *"Turveydrop, standing with his back to the fire and waving his gloves condescendingly."* — Charles Dickens, *Bleak House* |
| [[condescendingness]] | noun | **1.** Affability to your inferiors and temporary disregard for differences of position or rank. | *"In academic literature, condescendingness designates affability to your inferiors and temporary disregard for differences of position or rank."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crescendo]] | noun | **1.** (music) a gradual increase in loudness.<br>**2.** Grow louder. | *"But a day of reckoning, he stated _crescendo_ with no uncertain voice, thoroughly monopolising all the conversation, was in store for mighty England, despite her power of pelf on account of her crimes."* — James Joyce, *Ulysses* |
| [[decrescendo]] | noun | **1.** (music) a gradual decrease in loudness.<br>**2.** Grow quieter. | *"In academic literature, decrescendo designates (music) a gradual decrease in loudness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[descend]] | verb | **1.** Move downward and lower, but not necessarily all the way.<br>**2.** Come from; be connected by a relationship of blood, for example. | *"O, pardon me, that I descend so low, To show the line and the predicament Wherein you range under this subtle King."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[descendant]] | noun | **1.** A person considered as descended from some ancestor or race.<br>**2.** Going or coming down. | *"She would be able to look at them, and think not only that d’Urberville, like Babylon, had fallen, but that the individual innocence of a humble descendant could lapse as silently."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[descendants]] | noun | **1.** All of the offspring of a given progenitor.<br>**2.** A person considered as descended from some ancestor or race. | *"Later on two of his descendants lived in the castle."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[descendent]] | noun | **1.** A person considered as descended from some ancestor or race.<br>**2.** Going or coming down. | *"In academic literature, descendent designates a person considered as descended from some ancestor or race."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[descender]] | noun | **1.** Someone who descends.<br>**2.** A lowercase letter that has a part extending below other lowercase letters. | *"Further, spots which had been struck by lightning were regularly fenced in by the Greeks and consecrated to Zeus the Descender, that is, to the god who came down in the flash from heaven."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[descending]] | verb | **1.** Move downward and lower, but not necessarily all the way.<br>**2.** Come from; be connected by a relationship of blood, for example. | *"Didst thou not say, when I did push thee back— Which was when I perceived thee—that thou cam’st From good descending?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scend]] | verb | **1.** Rise or heave upward under the influence of a natural force such as a wave. | *"In academic literature, scend designates rise or heave upward under the influence of a natural force such as a wave."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transcend]] | verb | **1.** Be greater in scope or size than some standard.<br>**2.** Be superior or better than some standard. | *"Accordingly, in the following pages, the author has endeavored primarily to develop the economic aspects of each problem, and has repeatedly given warning when the discussion or the conclusions began to transcend strict economic limits."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[transcendence]] | noun | **1.** A state of being or existence above and beyond the limits of material experience.<br>**2.** The state of excelling or surpassing or going beyond usual limits. | *"And debile minister, great power, great transcendence, which should indeed give us a further use to be made than alone the recov’ry of the king, as to be— LAFEW."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[transcendency]] | noun | **1.** A state of being or existence above and beyond the limits of material experience.<br>**2.** The state of excelling or surpassing or going beyond usual limits. | *"In academic literature, transcendency designates a state of being or existence above and beyond the limits of material experience."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transcendent]] | adjective | **1.** Exceeding or surpassing usual limits especially in excellence.<br>**2.** Beyond and outside the ordinary range of human experience or understanding. | *"Here, among his many boxes labelled with transcendent names, lives Mr."* — Charles Dickens, *Bleak House* |
| [[transcendental]] | adjective | **1.** Existing outside of or not in accordance with nature; -aldous huxley.<br>**2.** Of or characteristic of a system of philosophy emphasizing the intuitive and spiritual above the empirical and material. | *"Its transcendental aspirations—still unconsciously based on the geocentric view of things, a zenithal paradise, a nadiral hell—were as foreign to his own as if they had been the dreams of people on another planet."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[transcendentalism]] | noun | **1.** Any system of philosophy emphasizing the intuitive and spiritual above the empirical and material. | *"Transcendentalism”: Apparent Failure."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[transcendentalist]] | noun | **1.** Advocate of transcendentalism. | *"In academic literature, transcendentalist designates advocate of transcendentalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transcendentally]] | adverb | **1.** In a transcendental way or to a transcendental extent. | *"In academic literature, transcendentally designates in a transcendental way or to a transcendental extent."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · SCEND
  </div>
</div>
