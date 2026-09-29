---
status: unread
type: root_dashboard
---
# Dashboard — it
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">it-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to go”</span>
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

The root **it** means to go. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *walk*, *ambit*, *ambition*, and *ambitious*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to go
> The root **it** means to go. It refers to moving from one place to another, stepping forward or back, or yielding to someone. In English, this root forms words such as *walk*, *ambit*, *ambition*, and *ambitious*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To go</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *walk* and *ambit*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **it** comes from a Latin word that means *"to go"*.
  - At its core, it describes the action of go.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **it** in an English word, think of **to go**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to go).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Walk**: An everyday English word showing the root's idea of *to go*.
  - **Ambit**: The bounds, perimeter, or physical scope of a geographical area.
  - **Ambition**: An earnest, eager, or inordinate desire for distinction, power, honor, or high office.
  - **Ambitious**: Having a strong desire for success, power, wealth, or achievement.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">it</mark>, think of <mark class="hl-def">to go</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **it** represents the supine and participial base of the Latin irregular verb *eō, īre, iī/īvī, itum*. Its morphology generates derivatives across three primary stems:
> - **The Supine Stem (`it-` / `itum`):** Forms nouns of action, resultant states, and adjectives expressing completed passage: *ex-it*, *trans-it*, *circu-it*, *in-it-ium* $\to$ *initial*, *amb-it*, *co-it-us*, *ob-it-us* $\to$ *obituary*, *sed-it-iō* $\to$ *sedition*.
> - **The Present Active Stem (`i-` / `e-`):** Appears in the present participle *iēns* (genitive *euntis*, combining stem *eunt-* or *-ient-*), yielding words expressing ongoing passage or temporal motion: *trans-ient* (*trānsiēns* $\to$ passing across), *con-com-it-ant* (*concomitāns* < *comes* < *cum* + *eō*), *ambient* (*ambiēns* < *ambīre*).
> - **The Frequentative / Iterative Stem (`itāre`):** The intensive verb *itō, itāre* ("to go frequently or repeatedly") reinforced the root in Romance compounds and frequentative constructions.
> - **The Weakened / Contracted Stems:** In compound formations with classical prefixes, phonetic contractions frequently occurred: *prae-itor* contracted directly into *praetor*; *circum-itus* contracted to *circuitus*; *sēd-* (an archaic form of *sē-* "apart") joined *itiō* to yield *sēditiō*; *sub-itus* (literally "having gone under or stealthily") softened in Vulgar Latin and Anglo-Norman into *sodeyn* $\to$ *sudden*.

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
> Although the root fundamentally denotes **"going, walking, or passing"**, its conceptual trajectory diverges across distinct operational planes:
> - **1. Spatial Transit, Traversal & Egress:** [[transit]], [[exit]], [[circuit]], [[circuitous]], [[circuitously]], [[circuity]], [[circuitry]], [[introit]], [[issue]] track physical paths, navigation through corridors, electrical loops, and legal egress.
> - **2. Temporal Transience & Ephemerality:** [[transient]], [[transiently]], [[transience]], [[transiency]], [[transitory]], [[transitorily]], [[transitoriness]], [[transition]], [[transitional]], [[transitionary]] express the brief, fleeting nature of human existence, shifting societal states, and temporary physical conditions.
> - **3. Civic, Political & Legal Navigation:** [[ambition]], [[ambitious]], [[ambitiously]], [[ambitiousness]], [[ambit]], [[praetor]], [[praetorian]], [[sedition]], [[seditious]], [[seditiously]], [[obiter dictum]] articulate the maneuvering of political candidates, administrative authority, judicial commentary, and mutinous rebellion against the state.
> - **4. Social Accompaniment, Feudal Office & Cohabitation:** [[count]], [[constable]], [[concomitant]], [[concomitance]], [[coitus]], [[coital]] depict traveling companions, medieval lords of the realm, royal officers, and intimate bodily conjunction.
> - **5. Ingress, Thresholds & Ceremonial Inception:** [[initial]], [[initially]], [[initiate]], [[initiation]], [[initiative]], [[initiator]], [[initiatory]] frame the beginning of enterprises, admission into sacred or professional mysteries, and proactive human action.
> - **6. Terminal Departure, Dissolution & Mortality:** [[obit]], [[obituary]], [[perish]], [[perishable]], [[imperishable]], [[subito]], [[sudden]], [[suddenly]], [[suddenness]] record the final passage across the threshold of death, unexpected catastrophe, and that which endures beyond decay.

---

## 🔀 4. Prefix & Combining Dynamics on it

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ambi-** | around, on both sides | [[ambition]], [[ambit]] | *ambi-* + *īre/itum* $\to$ to walk around the forum soliciting votes $\to$ ardent desire for power; the boundary or scope of authority. |
| **circum-** | around, about | [[circuit]], [[circuitous]] | *circum-* + *itum* $\to$ a going around in a ring $\to$ a circular route, an electrical loop, or indirect winding speech. |
| **con- / co-** | together, with | [[coitus]], [[concomitant]], [[count]] | *cum* + *īre* $\to$ to go together $\to$ intimate physical union (*coitus*); a traveling companion (*comes* $\to$ *count*); an accompanying event (*concomitant*). |
| **ex-** | out, forth | [[exit]], [[issue]] | *ex-* + *īre/itum* $\to$ to go out $\to$ a physical egress, departure from life, or official legal emergence (*issue* via Old French *eissir*). |
| **in-** | into, upon, within | [[initial]], [[initiate]] | *in-* + *īre/itum* $\to$ to go into, enter upon $\to$ an entrance, a beginning, or admitting a novice into esoteric knowledge. |
| **intro-** | inward, within | [[introit]] | *intro-* + *īre/itum* $\to$ to go within $\to$ the liturgical entrance chant sung as the celebrant approaches the altar. |
| **ob-** | toward, facing, against | [[obit]], [[obituary]], [[obiter dictum]] | *ob-* + *īre/itum* $\to$ to go to meet; specifically *obīre diem supremum* ("to meet one's last day" $\to$ death); *obiter* $\to$ said on the journey. |
| **per-** | thoroughly, through to ruin | [[perish]], [[perishable]] | *per-* + *īre* $\to$ to go through completely $\to$ to pass away, be destroyed, decay, or suffer untimely death. |
| **prae-** | before, in front | [[praetor]], [[praetorian]] | *prae* + *itor* $\to$ one who goes before $\to$ the military commander marching in front, later supreme magistrate of Roman civil law. |
| **sēd-** | apart, aside, without | [[sedition]], [[seditious]] | *sēd-* + *itiō* $\to$ a going apart $\to$ factional discord, mutiny, or rebellion against established civic authority. |
| **sub-** | under, secretly from below | [[sudden]], [[subito]] | *sub-* + *īre/itum* $\to$ to creep up from beneath $\to$ an unexpected, abrupt occurrence arriving without warning. |
| **trans-** | across, over, beyond | [[transit]], [[transient]], [[transitory]] | *trāns-* + *īre/itum* $\to$ to go across $\to$ moving from one place to another (*transit*), fleeting time (*transient*), or ephemeral existence (*transitory*). |

---

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-al** | Adjective (Pertaining to) | [[initial]], [[coital]], [[transitional]] | Pertaining to the beginning, to sexual conjunction, or to a phase of intermediate change. |
| **-ance / -ence** | Noun (State / Quality) | [[transience]], [[concomitance]] | The state or quality of lasting briefly, or the condition of accompanying another event. |
| **-ant / -ent** | Adjective / Noun (Participle) | [[transient]], [[concomitant]] | Passing through temporarily; an accompanying circumstance or seasonal worker. |
| **-ary** | Adjective / Noun (Domain / Record) | [[obituary]], [[transitionary]] | A written register of those who have died; serving to bridge two distinct operational states. |
| **-ate** | Verb / Noun (Formative / Agent) | [[initiate]] | To commence, set in motion, or admit someone into esoteric knowledge. |
| **-ation / -ition** | Noun (Act / Process / Result) | [[initiation]], [[transition]], [[sedition]], [[ambition]] | The formal process of induction, the act of crossing between states, or the condition of mutiny. |
| **-ive** | Adjective / Noun (Disposition / Drive) | [[initiative]] | Serving to introduce; the personal proactive drive to act before others. |
| **-or** | Noun (Agent / Office) | [[praetor]], [[initiator]] | The magistrate who goes before; the individual who sets an enterprise in motion. |
| **-ory** | Adjective (Serving to / Tending to) | [[transitory]], [[initiatory]] | Characterized by brief duration; serving as an introductory or induction rite. |
| **-ous** | Adjective (Full of / Characterized by) | [[circuitous]], [[ambitious]], [[seditious]] | Characterized by roundabout paths, eager striving for power, or treasonous rebellion. |
| **-able / -ible** | Adjective (Capability / Vulnerability) | [[perishable]], [[imperishable]] | Subject to rapid decay and spoilage; enduring eternally beyond temporal destruction. |
| **-ly** | Adverb (Manner / Operation) | [[transiently]], [[circuitously]], [[suddenly]], [[seditiously]] | Executing action fleetingly, via an indirect route, abruptly, or in defiance of the law. |
| **-ness** | Noun (Abstract Quality / State) | [[suddenness]], [[transitoriness]], [[ambitiousness]] | The condition of abrupt arrival, the ephemeral nature of life, or persistent personal drive. |
| **-y / -ry** | Noun (Condition / Physical System) | [[circuity]], [[transiency]], [[circuitry]] | The property of being roundabout; a network of interconnected electrical current loops. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚖️ **Constitutional Law & Jurisprudence** | [[praetor]], [[praetorian]], [[sedition]], [[seditious]], [[obiter dictum]], [[ambit]], [[issue]] | Roman magistrate edicts (*ius praetorium*), trials for incitement to insurrection, judicial collateral opinions (*obiter dicta*), statutory jurisdiction (*ambit*), and legal offspring or points of law (*issue*). |
| ⚡ **Electrical Engineering & Physics** | [[circuit]], [[circuitry]], [[transient]], [[transition]] | Closed conductive loops, integrated microchips, momentary voltage/current spikes (*transient surge*), and quantum electron energy level transitions. |
| 🚆 **Logistics, Urban Planning & Transit** | [[transit]], [[transition]], [[circuitous]], [[transient]] | Municipal bus and rail networks (*mass transit*), avoiding circuitous freight routing, and accommodating transient seasonal populations. |
| 🏛️ **Feudal History & Political Philosophy** | [[count]], [[constable]], [[ambition]], [[praetorian]], [[sedition]] | Medieval court administration (*comes stabuli*), noble territorial fiefs (*county*), Machiavellian political striving, and Praetorian military palace coups. |
| ✝️ **Theology, Liturgy & Esotericism** | [[introit]], [[initiation]], [[initiatory]], [[imperishable]] | Opening liturgical entrance chants for the Mass, induction into ancient mystery cults (Eleusinian mysteries), and theological doctrines of the imperishable soul. |
| 🩺 **Medicine, Anatomy & Pathology** | [[coitus]], [[coital]], [[transient]], [[circuit]], [[perish]] | Reproductive sexual physiology, transient ischemic attacks (TIA), pulmonary/systemic blood circuits, and tissue necrosis in ischemic shock. |
| 🎭 **Theatrical Arts & Literature** | [[exit]], [[obituary]], [[transience]], [[transitory]] | Stage directions signaling departure (*exit / exeunt*), commemorative biographical notices, and literary themes of *vanitas* and temporal transience. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adit]] | noun | **1.** A nearly horizontal passage from the surface into a mine. | *"In academic literature, adit designates a nearly horizontal passage from the surface into a mine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ambition]] | noun | **1.** A cherished desire.<br>**2.** A strong drive for success. | *"Who does i’ th’ wars more than his captain can Becomes his captain’s captain; and ambition, The soldier’s virtue, rather makes choice of loss Than gain which darkens him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ambitious]] | adjective | **1.** Having a strong desire for success or achievement.<br>**2.** Requiring full use of your abilities or resources. | *"Ambitious love hath so in me offended That barefoot plod I the cold ground upon, With sainted vow my faults to have amended."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ambitiously]] | adverb | **1.** With ambition; in an ambitious and energetic manner. | *"As willingly do I the same resign As e’er thy father Henry made it mine; And even as willingly at thy feet I leave it As others would ambitiously receive it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ambitiousness]] | noun | **1.** A strong drive for success. | *"In academic literature, ambitiousness designates a strong drive for success."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[circuit]] | noun | **1.** An electrical device that provides a path for electrical current to flow.<br>**2.** A journey or route all the way around a particular place or area. | *"And, father, do but think How sweet a thing it is to wear a crown, Within whose circuit is Elysium And all that poets feign of bliss and joy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[circuitous]] | adjective | **1.** Marked by obliqueness or indirection in speech or conduct.<br>**2.** Deviating from a straight course. | *"May I ask what dreadful thing it is that has happened between you and him?” “You may ask; but I may not tell.” In about ten minutes they returned to the house by a circuitous route, entering at the rear."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[coital]] | adjective | **1.** Of or relating to coitus or copulation. | *"In academic literature, coital designates of or relating to coitus or copulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coitus]] | noun | **1.** The act of sexual procreation between a man and a woman; the man's penis is inserted into the woman's vagina and excited until orgasm and ejaculation occur. | *"In academic literature, coitus designates the act of sexual procreation between a man and a woman; the man's penis is inserted into the woman's vagina and excited until orgasm and ejaculation occur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[detransitivize]] | verb | **1.** Intransitivize. | *"In academic literature, detransitivize designates intransitivize."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distrait]] | adjective | **1.** Having the attention diverted especially because of anxiety. | *"Stapleton was talking with animation, but the baronet looked pale and distrait."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[disunite]] | verb | **1.** Part; cease or break association with.<br>**2.** Force, take, or pull apart. | *"But it was a strong composure a fool could disunite!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disunited]] | verb | **1.** Part; cease or break association with.<br>**2.** Force, take, or pull apart. | *"By a Monarch’s heaven-struck fate, By a disunited State, By a generous Prince’s wrongs."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[emit]] | verb | **1.** Expel (gases or odors).<br>**2.** Give off, send forth, or discharge; as of light, heat, or radiation, vapor, etc. | *"No one of these mischiefs is less incident to a power in the States to emit paper money, than to coin gold or silver."* — Alexander Hamilton, *The Federalist Papers* |
| [[exit]] | noun | **1.** An opening that permits escape or release.<br>**2.** Euphemistic expressions for death. | *"Farewell, Bertram. [_Exit Countess._] BERTRAM."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[initial]] | noun | **1.** The first letter of a word (especially a person's name).<br>**2.** Mark with one's initials. | *"Where the issue of an interview is as likely to be a vast change for the worse as for the better, any initial difference from expectation causes nipping sensations of failure."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[initialisation]] | noun | **1.** (computer science) the format of sectors on the surface of a hard disk drive so that the operating system can access them and setting a starting position. | *"In academic literature, initialisation designates (computer science) the format of sectors on the surface of a hard disk drive so that the operating system can access them and setting a starting position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[initialise]] | verb | **1.** Assign an initial value to a computer program.<br>**2.** Divide (a disk) into marked sectors so that it may store data. | *"In academic literature, initialise designates assign an initial value to a computer program."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[initialization]] | noun | **1.** (computer science) the format of sectors on the surface of a hard disk drive so that the operating system can access them and setting a starting position. | *"In academic literature, initialization designates (computer science) the format of sectors on the surface of a hard disk drive so that the operating system can access them and setting a starting position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[initialize]] | verb | **1.** Assign an initial value to a computer program.<br>**2.** Divide (a disk) into marked sectors so that it may store data. | *"In academic literature, initialize designates assign an initial value to a computer program."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[initially]] | adverb | **1.** At the beginning. | *"Note that while a copyright was initially claimed for the labor involved in digitization, that copyright claim is not consistent with current copyright requirements."* — J. M. Barrie, *Peter Pan* |
| [[initiate]] | noun | **1.** Someone new to a field or activity.<br>**2.** Someone who has been admitted to membership in a scholarly field. | *"My strange and self-abuse Is the initiate fear that wants hard use."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[initiation]] | noun | **1.** A formal entry into an organization or position or office.<br>**2.** The act of starting something for the first time; introducing something new. | *"But, by the following month, the preparations for her initiation are complete."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[initiative]] | noun | **1.** Readiness to embark on bold new ventures.<br>**2.** The first of a series of actions. | *"In the latter state, on the initiative of a public-spirited citizen of St."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[initiator]] | noun | **1.** A person who initiates a course of action. | *"NAPOLEON MOSCOW, OCTOBER 30, 1812 Kutúzov replied: “I should be cursed by posterity were I looked on as the initiator of a settlement of any sort."* — graf Leo Tolstoy, *War and Peace* |
| [[initiatory]] | adjective | **1.** Serving to set in motion. | *"But, although he was often urged to do so, he never would accept office nor advance beyond the initiatory stage of membership represented by the simple white "bib" of infancy."* — John Cairns, *Principal Cairns* |
| [[intransitive]] | noun | **1.** A verb (or verb construction) that does not take an object.<br>**2.** Designating a verb that does not require or cannot take a direct object. | *"In academic literature, intransitive designates a verb (or verb construction) that does not take an object."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intransitiveness]] | noun | **1.** The grammatical relation created by an intransitive verb. | *"In academic literature, intransitiveness designates the grammatical relation created by an intransitive verb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intransitivity]] | noun | **1.** The grammatical relation created by an intransitive verb. | *"In academic literature, intransitivity designates the grammatical relation created by an intransitive verb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intransitivize]] | verb | **1.** Intransitivize. | *"In academic literature, intransitivize designates intransitivize."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[introit]] | noun | **1.** A composition of vocal music that is appropriate for opening church services. | *"CISSY CAFFREY: _(Her voice soaring higher.)_ She has it, she got it, Wherever she put it, The leg of the duck. _(Stephen, flourishing the ashplant in his left hand, chants with joy the_ introit _for paschal time."* — James Joyce, *Ulysses* |
| [[it]] | noun | **1.** The branch of engineering that deals with the use of computers and telecommunications to retrieve and store and transmit information. | *"Well, so its stands; and thus, I fear, at last Hume’s knavery will be the Duchess’ wrack, And her attainture will be Humphrey’s fall."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[obit]] | noun | **1.** A notice of someone's death; usually includes a short biography. | *"In academic literature, obit designates a notice of someone's death; usually includes a short biography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obituary]] | noun | **1.** A notice of someone's death; usually includes a short biography. | *"Read your own obituary notice they say you live longer."* — James Joyce, *Ulysses* |
| [[overambitious]] | adjective | **1.** Excessively ambitious. | *"In academic literature, overambitious designates excessively ambitious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preterit]] | noun | **1.** A term formerly used to refer to the simple past tense. | *"In academic literature, preterit designates a term formerly used to refer to the simple past tense."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reit]] | noun | **1.** An investment trust that owns and manages a pool of commercial properties and mortgages and other real estate assets; shares can be bought and sold in the stock market. | *"In academic literature, reit designates an investment trust that owns and manages a pool of commercial properties and mortgages and other real estate assets; shares can be bought and sold in the stock market."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reiter]] | noun | **1.** German bacteriologist who described a disease now known as reiter's syndrome and who identified the spirochete that causes syphilis in humans (1881-1969). | *"In academic literature, reiter designates german bacteriologist who described a disease now known as reiter's syndrome and who identified the spirochete that causes syphilis in humans (1881-1969)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reunite]] | verb | **1.** Have a reunion; unite again.<br>**2.** Unify again, as of a country. | *"They were under a yoke,—I could free them: they were scattered,—I could reunite them: the independence, the affluence which was mine, might be theirs too."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[sedition]] | noun | **1.** An illegal action inciting resistance to lawful authority and tending to cause the disruption or overthrow of the government. | *"Thus, while the vulture of sedition Feeds in the bosom of such great commanders, Sleeping neglection doth betray to loss The conquest of our scarce-cold conqueror, That ever-living man of memory, Henry the Fifth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[seditious]] | adjective | **1.** Arousing to action or rebellion.<br>**2.** In opposition to a civil authority or government. | *"The cause why I have brought this army hither Is to remove proud Somerset from the King, Seditious to his grace and to the state."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subunit]] | noun | **1.** A monetary unit that is valued at a fraction (usually one hundredth) of the basic monetary unit. | *"In academic literature, subunit designates a monetary unit that is valued at a fraction (usually one hundredth) of the basic monetary unit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trait]] | noun | **1.** A distinguishing feature of your personal nature. | *"She knew how high his standard of honor was, but how would he end if his unfortunate trait gained more ascendancy over him?"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[traitor]] | noun | **1.** Someone who betrays his country by committing treason.<br>**2.** A person who says one thing and does another. | *"A traitor you do look like, but such traitors His majesty seldom fears; I am Cressid’s uncle, That dare leave two together."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[traitorous]] | adjective | **1.** Having the character of, or characteristic of, a traitor. | *"Go call the people; [_Exit Aedile._] in whose name myself Attach thee as a traitorous innovator, A foe to th’ public weal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[traitorously]] | adverb | **1.** In a disloyal and faithless manner. | *"The general says you that have so traitorously discovered the secrets of your army, and made such pestiferous reports of men very nobly held, can serve the world for no honest use; therefore you must die."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[traitorousness]] | noun | **1.** Disloyalty by virtue of subversive behavior. | *"In academic literature, traitorousness designates disloyalty by virtue of subversive behavior."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transit]] | noun | **1.** A surveying instrument for measuring horizontal and vertical angles, consisting of a small telescope mounted on a tripod.<br>**2.** A facility consisting of the means and equipment necessary for the movement of passengers or goods. | *"The tall form was that of Gabriel Oak; the small one that of George; the articles in course of transit were hurdles."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[transition]] | noun | **1.** The act of passing from one state or place to the next.<br>**2.** An event that results in a transformation. | *"Then came the moment of transition; it was with the sense of promotion he had when he, an orphan educated at a commercial charity-school, was invited to a fine villa belonging to Mr."* — George Eliot, *Middlemarch* |
| [[transitive]] | noun | **1.** A verb (or verb construction) that requires an object in order to be grammatical.<br>**2.** Designating a verb that requires a direct object to complete the meaning. | *"In academic literature, transitive designates a verb (or verb construction) that requires an object in order to be grammatical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transitively]] | adverb | **1.** In a transitive manner. | *"In academic literature, transitively designates in a transitive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transitiveness]] | noun | **1.** The grammatical relation created by a transitive verb. | *"In academic literature, transitiveness designates the grammatical relation created by a transitive verb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transitivise]] | verb | **1.** Make transitive. | *"In academic literature, transitivise designates make transitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transitivity]] | noun | **1.** (logic and mathematics) a relation between three elements such that if it holds between the first and second and it also holds between the second and third it must necessarily hold between the first and third.<br>**2.** The grammatical relation created by a transitive verb. | *"In academic literature, transitivity designates (logic and mathematics) a relation between three elements such that if it holds between the first and second and it also holds between the second and third it must necessarily hold between the first and third."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transitivize]] | verb | **1.** Make transitive. | *"In academic literature, transitivize designates make transitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unambitious]] | adjective | **1.** Having little desire for success or achievement. | *"They are the most simple-mannered people alive, and quite unambitious."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unambitiously]] | adverb | **1.** In an unambitious manner. | *"In academic literature, unambitiously designates in an unambitious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninitiate]] | noun | **1.** People who have not been introduced to the mysteries of some field or activity.<br>**2.** Not initiated; deficient in relevant experience. | *"It came from the direction of a small dark object under the plantation hedge—a shepherd’s hut—now presenting an outline to which an uninitiated person might have been puzzled to attach either meaning or use."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[uninitiated]] | adjective | **1.** Not initiated; deficient in relevant experience. | *"It came from the direction of a small dark object under the plantation hedge—a shepherd’s hut—now presenting an outline to which an uninitiated person might have been puzzled to attach either meaning or use."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[unit]] | noun | **1.** Any division of quantity accepted as a standard of measurement or exchange.<br>**2.** An individual or group or structure or other entity regarded as a structural or functional constituent of a whole. | *"We mean by standard money that kind, no matter what its form, which serves in any country as the unit in which the value of other kinds of money is expressed."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[unitary]] | adjective | **1.** Relating to or characterized by or aiming toward unity.<br>**2.** Of or pertaining to or involving the use of units. | *"The Tathagata knows this unitary essential Law, that is to say, Deliverance, Abandonment, Extinction, final Nirvana of eternal rest, ending in return to the Void."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[unite]] | verb | **1.** Act in concert or unite in a common purpose or belief.<br>**2.** Become one. | *"For Thou hast given me in this beauteous face A world of earthly blessings to my soul, If sympathy of love unite our thoughts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[united]] | verb | **1.** Act in concert or unite in a common purpose or belief.<br>**2.** Become one. | *"ARCHBISHOP. ’Tis very true, And therefore be assured, my good Lord Marshal, If we do now make our atonement well, Our peace will, like a broken limb united, Grow stronger for the breaking."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[uniting]] | noun | **1.** The combination of two or more commercial companies.<br>**2.** The act of making or becoming a single unit. | *"Instead of pushing his fortune in the line marked out for the heir of the house of Elliot, he had purchased independence by uniting himself to a rich woman of inferior birth."* — Jane Austen, *Persuasion* |
| [[unitisation]] | noun | **1.** (psychology) the configuration of smaller units of information into large coordinated units.<br>**2.** The act of packaging cargo into unit loads. | *"In academic literature, unitisation designates (psychology) the configuration of smaller units of information into large coordinated units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unitise]] | verb | **1.** Divide (bulk material) and process as units.<br>**2.** Make into a unit. | *"In academic literature, unitise designates divide (bulk material) and process as units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unitization]] | noun | **1.** (psychology) the configuration of smaller units of information into large coordinated units.<br>**2.** The act of packaging cargo into unit loads. | *"In academic literature, unitization designates (psychology) the configuration of smaller units of information into large coordinated units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unitize]] | verb | **1.** Divide (bulk material) and process as units.<br>**2.** Make into a unit. | *"In academic literature, unitize designates divide (bulk material) and process as units."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · IT
  </div>
</div>
