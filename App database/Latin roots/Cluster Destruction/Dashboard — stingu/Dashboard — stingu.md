---
status: unread
type: root_dashboard
---
# Dashboard — stingu
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">stingu-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to quench or prick”</span>
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

The root **stingu** means to quench or prick. It refers to the action of quenching and carrying out this process. In English, this root forms words such as *extinguish*, *extinguisher*, *extinguishable*, and *inextinguishable*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to quench or prick
> The root **stingu** means to quench or prick. It refers to the action of quenching and carrying out this process. In English, this root forms words such as *extinguish*, *extinguisher*, *extinguishable*, and *inextinguishable*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To quench or prick</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A fragile stone pillar snapping under pressure and crumbling into fragments.</mark>
> - **Everyday Connection**: Think of familiar words like *extinguish* and *extinguisher*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **stingu** comes from a Latin word that means *"to quench or prick"*.
  - At its core, it describes the action of quench or prick.

- **The Big Picture Idea**:
  - Picture a fragile stone pillar snapping under pressure and crumbling into fragments.
  - Whenever you see **stingu** in an English word, think of **to quench or prick**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to quench or prick).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Extinguish**: To cause to cease burning.
  - **Extinguisher**: A portable device containing chemicals, water, or gas sprayed to put out small fires.
  - **Extinguishable**: Capable of being quenched, put out, or terminated.
  - **Inextinguishable**: Incapable of being extinguished, quenched, or suppressed.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">stingu</mark>, think of <mark class="hl-def">to quench or prick</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **stingu** alternates between its present verbal stem `stingu-` and its participial stem `stinct-`:
> - **Present Verbal Track `-stinguish` (via Old French *-stinguer*):**
>   - Prefix `ex-`: Latin *exstinguere* → English [[extinguish]] → [[extinguisher]] → [[extinguishable]] → [[inextinguishable]].
>   - Prefix `dis-`: Latin *distinguere* → English [[distinguish]] → [[distinguishable]] → [[indistinguishable]] → [[distinguished]] → [[distinguishing]].
>   - Prefix `contra-` + `dis-`: English [[contradistinguish]].
> - **Participial Track `-stinct` (Latin *-stīnctum*):**
>   - Prefix `ex-`: Latin *exstīnctus* → English [[extinct]] → [[extinction]] → [[extinctive]].
>   - Prefix `dis-`: Latin *distīnctus* → English [[distinct]] → [[distinctly]] → [[distinctness]] → [[distinction]] → [[distinctive]] → [[distinctively]] → [[distinctiveness]].
>   - Prefix `in-`: Latin *instīnctus* → English [[instinct]] → [[instinctive]] → [[instinctively]] → [[instinctual]].
>   - Prefix `contra-` + `dis-`: English [[contradistinction]].

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
> Although unified by **"quenching and marking"**, the derivatives of `stingu` diverge across four distinct scientific and philosophical landscapes:
> - **Evolutionary Paleontology & Conservation:** In [[extinct]], [[extinction]], and [[extinctive]], the root defines the termination of a biological taxon (e.g., the Cretaceous–Paleogene mass extinction event).
> - **Fire Protection & Disaster Management:** In [[extinguish]], [[extinguisher]], and [[inextinguishable]], the root tracks the physical suppression of chemical combustion and thermal energy.
> - **Epistemology, Rhetoric & Aesthetics:** In [[distinguish]], [[distinct]], [[distinction]], and [[distinguished]], the root moves from the scribe's parchment dot into the human intellect's ability to identify subtle differences, celebrate moral excellence, and honor achievement.
> - **Ethology, Psychology & Animal Behavior:** In [[instinct]], [[instinctive]], and [[instinctual]], the root expresses the innate, genetically programmed behavioral drives (migration, nest-building, fight-or-flight) that prick organisms into survival action.

---

## 🔀 4. Prefix & Combining Dynamics on stingu

### Prefix Dynamics (Directional, Terminal & Polar Shifts)

| Prefix / Combining Element | Classical Meaning | Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ex-` | completely out, utterly | [[extinguish]], [[extinct]] | Snuffing out a flame or biological lineage completely. |
| `dis-` | apart, in different directions | [[distinguish]], [[distinct]] | Separating entities by marking dividing boundaries between them. |
| `in-` (locative) | in, into, upon | [[instinct]], [[instinctive]] | Puncturing or goading from within; an innate behavioral impulse. |
| `contra-` + `dis-` | against + apart | [[contradistinction]] | Distinguishing by explicit opposition or contrasting qualities. |
| `in-` (privative negation) | un-, not | [[indistinguishable]], [[inextinguishable]] | Incapable of being told apart; incapable of being snuffed out. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| `-ish` (French *-iss-*) | Verb (Action) | [[extinguish]], [[distinguish]] | To quench; to perceive difference. |
| `-ion` (Latin *-iō*) | Noun (State / Process) | [[extinction]], [[distinction]] | The state of being wiped out; a mark of honor/difference. |
| `-ive` (Latin *-īvus*) | Adjective (Quality) | [[distinctive]], [[instinctive]] | Characteristic of a quality; arising from innate drive. |
| `-able` (Latin *-ābilis*) | Adjective (Capability) | [[distinguishable]], [[extinguishable]] | Capable of being told apart or put out. |
| `-ual` | Adjective (Pertaining to) | [[instinctual]] | Pertaining to psychological instincts. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🦕 **Paleontology & Conservation Biology** | [[extinct]], [[extinction]], [[extinctive]] | The "Big Five" mass extinctions, anthropocene biodiversity loss, IUCN Red List status of critically endangered species. |
| 🚒 **Fire Safety & Chemical Engineering** | [[extinguish]], [[extinguisher]], [[inextinguishable]] | Class A/B/C/D fire extinguishers (carbon dioxide, dry chemical, Halon alternatives), thermal quenching of runaway reactions. |
| 🧠 **Ethology, Psychology & Neuroscience** | [[instinct]], [[instinctive]], [[instinctual]] | Fixed action patterns (FAPs) in animal ethology, maternal instinct circuits in the hypothalamus, instinctive threat responses via the amygdala. |
| 🎓 **Epistemology, Logic & Critical Thinking** | [[distinguish]], [[distinct]], [[distinction]], [[contradistinction]] | Conceptual analysis in philosophy, drawing necessary and sufficient distinctions, avoiding false equivalence fallacies. |
| 🎖️ **Civic Honors & Sociolinguistics** | [[distinguished]], [[distinctive]], [[distinction]] | Military Distinguished Service Cross, distinctive phonological features in linguistics, graduating with distinction (*cum laude*). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[contradistinguish]] | verb | **1.** Distinguish by contrasting qualities. | *"In academic literature, contradistinguish designates distinguish by contrasting qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[distinguish]] | verb | **1.** Mark as different.<br>**2.** Detect with the senses. | *"There had she not been long but she became A joyful mother of two goodly sons, And, which was strange, the one so like the other As could not be distinguish’d but by names."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[distinguishable]] | adjective | **1.** Capable of being perceived as different or distinct.<br>**2.** (often followed by `from') not alike; different in nature or quality. | *"Ho—ho—Sergeant—ho—ho!” An expostulation followed, but it was indistinct; and it became lost amid a low peal of laughter, which was hardly distinguishable from the gurgle of the tiny whirlpools outside."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[distinguished]] | verb | **1.** Mark as different.<br>**2.** Detect with the senses. | *"Opening the door, she distinguished the well-known calls of "Uncle Philip, Uncle Philip!" So her longed-for brother was near at last."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[indistinguishability]] | noun | **1.** Exact sameness. | *"In academic literature, indistinguishability designates exact sameness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indistinguishable]] | adjective | **1.** Exactly alike; incapable of being perceived as different.<br>**2.** Not capable of being distinguished or differentiated. | *"Why, no, you ruinous butt; you whoreson indistinguishable cur, no."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undistinguishable]] | adjective | **1.** Not capable of being distinguished or differentiated. | *"The fold stands empty in the drownèd field, And crows are fatted with the murrion flock; The nine-men’s-morris is fill’d up with mud, And the quaint mazes in the wanton green, For lack of tread, are undistinguishable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[undistinguished]] | adjective | **1.** Not worthy of notice. | *"Fanny with doubting feelings had risen to meet him, but sank down again on finding herself undistinguished in the dusk, and unthought of."* — Jane Austen, *Mansfield Park* |

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
    ROOT DASHBOARD · STINGU
  </div>
</div>
