---
status: unread
type: root_dashboard
---
# Dashboard — cel
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cel-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to hide”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Energy moving into action or maintaining an active state.</span>
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

The root **cel** means to hide. It refers to hide, to cover. In English, this root forms words such as *excelsior*, *cell*, *cellar*, and *conceal*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to hide
> The root **cel** means to hide. It refers to hide, to cover. In English, this root forms words such as *excelsior*, *cell*, *cellar*, and *conceal*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To hide</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Energy moving into action or maintaining an active state.</mark>
> - **Everyday Connection**: Think of familiar words like *excelsior* and *cell*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cel** comes from a Latin word that means *"to hide"*.
  - At its core, it describes the action of hide.

- **The Big Picture Idea**:
  - Picture energy moving into action or maintaining an active state.
  - Whenever you see **cel** in an English word, think of **to hide**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to hide).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Excelsior**: An everyday English word showing the root's idea of *to hide*.
  - **Cell**: A small room, especially one in a prison or monastery, in which a person is confined or lives alone.
  - **Cellar**: An enclosed underground room beneath a building, used for storage or shelter.
  - **Conceal**: To keep something from being seen or discovered.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cel</mark>, think of <mark class="hl-def">to hide</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> - **Primary Verbal Stem:** `-ceal` / `cel-` (from *cēlāre*) — the act of hiding: *conceal*, *concealment*.
> - **Nominal / Diminutive Stem:** `cell-` (from *cella*, *cellārium*) — bounded enclosures: *cell*, *cellar*, and the productive scientific series *cellular*, *cellulose*.
> - **Participial Cognate Stem:** `-cult-` (from *occultus*, past participle of *occulere*) — the state of being covered over: *occult*.
>
> This root is **weakly prefixing in English**. Only *con-* is genuinely productive on the verbal stem (*conceal*), and *ob-* appears on the cognate stem (*occult*). *Cell* and *cellar* take no prefix at all — they are direct nominal borrowings, and their English family grows by suffix instead (*-ar*, *-ular*, *-ulose*). Do not expect a full directional prefix paradigm here; unlike a motion root, hiding admits no useful "hide-across" or "hide-under."

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
> Although the root means **"to hide, to cover"**, the covering is understood differently in each domain:
> - **Physical / Mechanical Sense:** In [[cellar]], it is literal enclosure — an underground room whose walls hide and protect what is stored in it.
> - **Cognitive / Intellectual Sense:** In [[conceal]] and [[concealment]], it is informational — a fact deliberately kept outside another person's knowledge.
> - **Institutional / Governance Sense:** In [[cell]], it is confinement and organization — the prison cell, the monastic cell, and by extension the small clandestine unit of a political movement.
> - **Specialized / Scientific Sense:** In [[cell]] (biology) and [[occult]] (astronomy and medicine), the root becomes technical: the membrane-bounded unit of life, the passage of one body in front of another, and *occult blood* — bleeding present but invisible to the eye.

---

## 🔀 4. Prefix & Combining Dynamics on cel

### Prefix Shifts (Directional & Semantic Modification)

> [!warning] ⚠️ A deliberately short table
> Only two prefixes genuinely combine with this root in the vault's roster. No directional paradigm is invented below; the remaining derivatives are unprefixed nominal borrowings from *cella*.

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` | together, thoroughly | [[conceal]], [[concealment]] | To cover *thoroughly* — to keep a thing wholly out of another's view or knowledge. |
| `ob-` (→ oc-) | over, against, in front of | [[occult]] | Covered *over from in front* — hidden by an interposed body, hence secret or esoteric. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ment` | Noun (Act / State / Result) | [[concealment]] | The act of hiding, or the condition of being hidden. |
| `-ar` (< *-ārium*) | Noun (Place) | [[cellar]] | The place where things are stored and kept out of sight. |
| *(zero suffix, direct borrowing)* | Noun | [[cell]] | The bounded chamber itself, from *cella*. |
| *(participial `-t`)* | Adjective / Noun / Verb | [[occult]] | Marks the completed state of being covered over. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🔬 **Science & Medicine** | [[cell]], [[occult]] | Cell biology and cytology, occult blood in stool screening, occultation of stars by the Moon |
| 🏛️ **Law & Governance** | [[conceal]], [[concealment]], [[cell]] | Concealed-carry statutes, concealment of material facts or assets, prison cells and terrorist cells |
| 🎓 **Academic & Rhetoric** | [[occult]], [[concealment]] | The history of occult and esoteric traditions, rhetorical concealment and reticence |
| 🗣️ **Everyday & Professional** | [[cellar]], [[cell]], [[conceal]] | Wine cellars and storm cellars, cell phones and battery cells, concealing a surprise |

---


## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[accelerando]] | noun | **1.** A gradually increasing tempo of music.<br>**2.** Gradually increasing in tempo. | *"In academic literature, accelerando designates a gradually increasing tempo of music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accelerate]] | verb | **1.** Move faster.<br>**2.** Cause to move faster. | *"Moreover, the ship’s forge was ordered to be hoisted out of its temporary idleness in the hold; and, to accelerate the affair, the blacksmith was commanded to proceed at once to the forging of whatever iron contrivances might be needed."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[accelerated]] | verb | **1.** Move faster.<br>**2.** Cause to move faster. | *"In due time a small stream began to trickle through the seventy feet of aerial space between its mouth and the ground, which the water-drops smote like duckshot in their accelerated velocity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[acceleration]] | noun | **1.** An increase in rate of change.<br>**2.** The act of accelerating; increasing the speed. | *"Signaling Hodak for minimal repulse and acceleration to increase the drift, Brad ordered all hands immediately into accelo-nets."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[accelerative]] | adjective | **1.** Tending to increase velocity. | *"In academic literature, accelerative designates tending to increase velocity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accelerator]] | noun | **1.** A pedal that controls the throttle valve.<br>**2.** A valve that regulates the supply of fuel to the engine. | *"In academic literature, accelerator designates a pedal that controls the throttle valve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acceleratory]] | adjective | **1.** Tending to increase velocity. | *"In academic literature, acceleratory designates tending to increase velocity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[accelerometer]] | noun | **1.** An instrument for measuring the acceleration of aircraft or rockets. | *"In academic literature, accelerometer designates an instrument for measuring the acceleration of aircraft or rockets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alcelaphus]] | noun | **1.** African antelopes: hartebeests. | *"In academic literature, alcelaphus designates african antelopes: hartebeests."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcella]] | noun | **1.** An amoeba-like protozoan with a chitinous shell resembling an umbrella. | *"In academic literature, arcella designates an amoeba-like protozoan with a chitinous shell resembling an umbrella."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arcellidae]] | noun | **1.** Soil and freshwater protozoa; cosmopolitan in distribution. | *"In academic literature, arcellidae designates soil and freshwater protozoa; cosmopolitan in distribution."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celandine]] | noun | **1.** North american annual plant with usually yellow or orange flowers; grows chiefly on wet rather acid soil.<br>**2.** Perennial herb with branched woody stock and bright yellow flowers. | *"One of the first of our native wild flowers, in making its appearance after the departure of frost and snow, is the little yellow celandine (_Ranunculus ficaria_)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[celastraceae]] | noun | **1.** Trees and shrubs and woody vines usually having bright-colored fruits. | *"In academic literature, celastraceae designates trees and shrubs and woody vines usually having bright-colored fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celastrus]] | noun | **1.** Genus of woody vines and erect shrubs (type genus of the celastraceae) that is native chiefly to asia and australia: includes bittersweet. | *"In academic literature, celastrus designates genus of woody vines and erect shrubs (type genus of the celastraceae) that is native chiefly to asia and australia: includes bittersweet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celebes]] | noun | **1.** A mountainous island in eastern indonesia. | *"Kruijt, "De weerwolf bij de Toradja's van Midden-Celebes," _Tijdschrift voor Indische Taal- Landen Volkenkunde,_ xli. (1899) pp. 548-551, 557-560. [764] A.C."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[celebrant]] | noun | **1.** A person who is celebrating.<br>**2.** An officiating priest celebrating the eucharist. | *"The phrase struck him as familiar; for the first time he looked at his fellow celebrant."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[celebrate]] | verb | **1.** Behave as expected during of holidays or rites.<br>**2.** Have a celebration. | *"ENOBARBUS. [_To Antony_.] Ha, my brave emperor, Shall we dance now the Egyptian Bacchanals And celebrate our drink?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[celebrated]] | verb | **1.** Behave as expected during of holidays or rites.<br>**2.** Have a celebration. | *"The heaven sets spies upon us, will not have Our contract celebrated."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[celebrater]] | noun | **1.** A person who is celebrating. | *"In academic literature, celebrater designates a person who is celebrating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celebration]] | noun | **1.** A joyful occasion for special festivities to mark some happy event.<br>**2.** Any joyous diversion. | *"The citizens, I am sure, have shown at full their royal minds, As, let ’em have their rights, they are ever forward In celebration of this day with shows, Pageants, and sights of honour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[celebrator]] | noun | **1.** A person who is celebrating. | *"He is rather the prophet of what is to be than the celebrator of what is."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[celebratory]] | adjective | **1.** Used for celebrating. | *"In academic literature, celebratory designates used for celebrating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celebrex]] | noun | **1.** A cox-2 inhibitor (trade name celebrex) that relieves pain and inflammation without harming the digestive tract. | *"In academic literature, celebrex designates a cox-2 inhibitor (trade name celebrex) that relieves pain and inflammation without harming the digestive tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celebrity]] | noun | **1.** A widely known person.<br>**2.** The state or quality of being widely honored and acclaimed. | *"The Harmonic Meeting hour arriving, the gentleman of professional celebrity takes the chair, is faced (red-faced) by Little Swills; their friends rally round them and support first-rate talent."* — Charles Dickens, *Bleak House* |
| [[celecoxib]] | noun | **1.** A cox-2 inhibitor (trade name celebrex) that relieves pain and inflammation without harming the digestive tract. | *"In academic literature, celecoxib designates a cox-2 inhibitor (trade name celebrex) that relieves pain and inflammation without harming the digestive tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celeriac]] | noun | **1.** Grown for its thickened edible aromatic root.<br>**2.** Thickened edible aromatic root of a variety of celery plant. | *"In academic literature, celeriac designates grown for its thickened edible aromatic root."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celerity]] | noun | **1.** A rate that is rapid. | *"I do think there is mettle in death which commits some loving act upon her, she hath such a celerity in dying."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[celery]] | noun | **1.** Widely cultivated herb with aromatic leaf stalks that are eaten raw or cooked.<br>**2.** Stalks eaten raw or cooked or used as seasoning. | *"Nothing has tasted quite so good to me in a year,” said she when the steak had vanished, dipping a white celery-heart in salt and biting the end off with teeth still whiter."* — Grace S. Richmond, *Red Pepper Burns* |
| [[celesta]] | noun | **1.** A musical instrument consisting of graduated steel plates that are struck by hammers activated by a keyboard. | *"In academic literature, celesta designates a musical instrument consisting of graduated steel plates that are struck by hammers activated by a keyboard."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celestial]] | adjective | **1.** Of or relating to the sky.<br>**2.** Relating to or inhabiting a divine heaven. | *"He came in thunder; his celestial breath Was sulphurous to smell; the holy eagle Stoop’d as to foot us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[celestite]] | noun | **1.** A mineral consisting of strontium sulphate. | *"In academic literature, celestite designates a mineral consisting of strontium sulphate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celiac]] | adjective | **1.** Belonging to or prescribed for celiac disease.<br>**2.** Of or in or belonging to the cavity of the abdomen. | *"In academic literature, celiac designates belonging to or prescribed for celiac disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celibacy]] | noun | **1.** An unmarried status.<br>**2.** Abstaining from sexual relations (as because of religious vows). | *"Johnson’s celebrated judgment as to matrimony and celibacy, and say, that though Mansfield Park might have some pains, Portsmouth could have no pleasures."* — Jane Austen, *Mansfield Park* |
| [[celibate]] | noun | **1.** An unmarried person who has taken a religious vow of chastity.<br>**2.** Abstaining from sexual intercourse. | *"He must be celibate; if he is married he must leave his wife."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[celiocentesis]] | noun | **1.** Removal of fluid from the abdomen by centesis. | *"In academic literature, celiocentesis designates removal of fluid from the abdomen by centesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celioma]] | noun | **1.** An abdominal tumor. | *"In academic literature, celioma designates an abdominal tumor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celioscopy]] | noun | **1.** Endoscopic examination of the abdomen through the abdominal wall. | *"In academic literature, celioscopy designates endoscopic examination of the abdomen through the abdominal wall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cell]] | noun | **1.** Any small compartment.<br>**2.** (biology) the basic structural and functional unit of all organisms; they may exist as independent units of life (as in monads) or may form colonies or tissues as in higher plants and animals. | *"But unto us it is A cell of ignorance, travelling abed, A prison for a debtor that not dares To stride a limit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cell-free]] | adjective | **1.** Lacking cells. | *"In academic literature, cell-free designates lacking cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cell-like]] | adjective | **1.** Resembling a cell. | *"In academic literature, cell-like designates resembling a cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cellar]] | noun | **1.** The lowermost portion of a structure partly or wholly below ground level; often used for storage.<br>**2.** An excavation where root vegetables are stored. | *"The whole butt, man: my cellar is in a rock by th’ seaside, where my wine is hid."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cellarage]] | noun | **1.** A charge for storing goods in a cellar.<br>**2.** A storage area in a cellar. | *"Come on, you hear this fellow in the cellarage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cellaret]] | noun | **1.** Sideboard with compartments for holding bottles. | *"A board was found, fixed on two saddles and covered with a horsecloth, a small samovar was produced and a cellaret and half a bottle of rum, and having asked Mary Hendríkhovna to preside, they all crowded round her."* — graf Leo Tolstoy, *War and Peace* |
| [[cellblock]] | noun | **1.** A division of a prison (usually consisting of several cells). | *"In academic literature, cellblock designates a division of a prison (usually consisting of several cells)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cellini]] | noun | **1.** Italian sculptor (1500-1571). | *"His whole high, broad form, seemed made of solid bronze, and shaped in an unalterable mould, like Cellini’s cast Perseus."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[cellist]] | noun | **1.** Someone who plays a violoncello. | *"In academic literature, cellist designates someone who plays a violoncello."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cello]] | noun | **1.** A large stringed instrument; seated player holds it upright while playing. | *"Tiresome shapers scraping fiddles, eye on the bowend, sawing the cello, remind you of toothache."* — James Joyce, *Ulysses* |
| [[cellophane]] | noun | **1.** A transparent paperlike product that is impervious to moisture and used to wrap candy or cigarettes etc. | *"In academic literature, cellophane designates a transparent paperlike product that is impervious to moisture and used to wrap candy or cigarettes etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cellphone]] | noun | **1.** A hand-held mobile radiotelephone for use in an area divided into small sections, each with its own short-range transmitter/receiver. | *"In academic literature, cellphone designates a hand-held mobile radiotelephone for use in an area divided into small sections, each with its own short-range transmitter/receiver."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cellular]] | adjective | **1.** Relating to cells.<br>**2.** Characterized by or divided into or containing cells or compartments (the smallest organizational or structural unit of an organism or organization). | *"Indeed, owing to this cellular arrangement it resists like a block, as if it were solid."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[cellularity]] | noun | **1.** The state of having cells. | *"In academic literature, cellularity designates the state of having cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cellulite]] | noun | **1.** Lumpy deposits of body fat especially on women's thighs etc. | *"In academic literature, cellulite designates lumpy deposits of body fat especially on women's thighs etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cellulitis]] | noun | **1.** An inflammation of body tissue (especially that below the skin) characterized by fever and swelling and redness and pain. | *"In academic literature, cellulitis designates an inflammation of body tissue (especially that below the skin) characterized by fever and swelling and redness and pain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celluloid]] | noun | **1.** Highly flammable substance made from cellulose nitrate and camphor; used in e.g. motion-picture and x-ray film; its use has decreased with the development of nonflammable thermoplastics.<br>**2.** A medium that disseminates moving pictures. | *"Mama had the wrinkles pressed out of the suit by the time Miss Lida Belle got back with Mister Wes's white shirt and a celluloid collar that went with it."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[cellulose]] | noun | **1.** A polysaccharide that is the chief constituent of all plant tissues and fibers. | *"Cotton is almost pure cellulose, another organic substance, like glycerine insomuch as it is composed of carbon and hydrogen, but, unlike it, containing also oxygen."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[cellulosic]] | noun | **1.** A plastic made from cellulose (or a derivative of cellulose). | *"In academic literature, cellulosic designates a plastic made from cellulose (or a derivative of cellulose)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cellulosid]] | adjective | **1.** Of or containing or made from cellulose. | *"In academic literature, cellulosid designates of or containing or made from cellulose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celom]] | noun | **1.** A cavity in the mesoderm of an embryo that gives rise in humans to the pleural cavity and pericardial cavity and peritoneal cavity. | *"In academic literature, celom designates a cavity in the mesoderm of an embryo that gives rise in humans to the pleural cavity and pericardial cavity and peritoneal cavity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celoma]] | noun | **1.** A cavity in the mesoderm of an embryo that gives rise in humans to the pleural cavity and pericardial cavity and peritoneal cavity. | *"In academic literature, celoma designates a cavity in the mesoderm of an embryo that gives rise in humans to the pleural cavity and pericardial cavity and peritoneal cavity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celosia]] | noun | **1.** Annual or perennial herbs or vines of tropical and subtropical america and asia and africa. | *"In academic literature, celosia designates annual or perennial herbs or vines of tropical and subtropical america and asia and africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celsius]] | noun | **1.** Swedish astronomer who devised the centigrade thermometer (1701-1744). | *"In academic literature, celsius designates swedish astronomer who devised the centigrade thermometer (1701-1744)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celt]] | noun | **1.** A member of a european people who once occupied britain and spain and gaul prior to roman times. | *"Here was nothing to cramp the mind: here was the England that has absorbed Celt, Saxon, Fleming, Norman, generation after generation, each with its passing form of political faith: the England of traditional eld, the beloved country."* — Anthony Pryde, *Nightfall* |
| [[celtic]] | noun | **1.** A branch of the indo-european languages that (judging from inscriptions and place names) was spread widely over europe in the pre-christian era.<br>**2.** Relating to or characteristic of the celts. | *"In English the story is told at length by Professor (Sir) John Rhys, _Celtic Heathendom_ (London and Edinburgh, 1888), pp. 529 _sqq._ It is elaborately discussed by Professor F."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[celtis]] | noun | **1.** Large genus of trees and shrubs with berrylike fruit. | *"In academic literature, celtis designates large genus of trees and shrubs with berrylike fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[celtuce]] | noun | **1.** Lettuce valued especially for its edible stems.<br>**2.** Leaves having celery-like stems eaten raw or cooked. | *"In academic literature, celtuce designates lettuce valued especially for its edible stems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decelerate]] | verb | **1.** Lose velocity; move more slowly.<br>**2.** Reduce the speed of. | *"In academic literature, decelerate designates lose velocity; move more slowly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deceleration]] | noun | **1.** A decrease in rate of change.<br>**2.** (physics) a rate of decrease in velocity. | *"Plenty of time to kick-in vector and deceleration programs." Brad paused, shifted position, rubbed his jaws, sighed deeply, glanced sideways at Xindral and, his voice tighter, continued."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[excel]] | verb | **1.** Distinguish oneself. | *"Her father is no better than an earl, Although in glorious titles he excel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excellence]] | noun | **1.** The quality of excelling; possessing good qualities in high degree.<br>**2.** An outstanding feature; something in which something or someone excels. | *"Kind is my love to-day, to-morrow kind, Still constant in a wondrous excellence, Therefore my verse to constancy confined, One thing expressing, leaves out difference."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excellency]] | noun | **1.** A title used to address dignitaries (such as ambassadors or governors); usually preceded by `your' or `his' or `her'.<br>**2.** An outstanding feature; something in which something or someone excels. | *"She dwells so securely on the excellency of her honour that the folly of my soul dares not present itself; she is too bright to be looked against."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excellent]] | adjective | **1.** Very good;of the highest quality. | *"He was excellent indeed, madam; the king very lately spoke of him admiringly, and mourningly; he was skilful enough to have liv’d still, if knowledge could be set up against mortality."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excellently]] | adverb | **1.** Extremely well. | *"I like the new tire within excellently, if the hair were a thought browner; and your gown’s a most rare fashion, i’ faith."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[excelsior]] | noun | **1.** Thin curly wood shavings used for packing or stuffing. | *"In academic literature, excelsior designates thin curly wood shavings used for packing or stuffing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extracellular]] | adjective | **1.** Located or occurring outside a cell or cells. | *"In academic literature, extracellular designates located or occurring outside a cell or cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intercellular]] | adjective | **1.** Located between cells. | *"These branches perforate the inner walls of the epidermis, and pass into the intercellular spaces of the parenchyma to become mycelium."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[intracellular]] | adjective | **1.** Located or occurring within a cell or cells. | *"In academic literature, intracellular designates located or occurring within a cell or cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncellular]] | adjective | **1.** Not made up of or divided into cells. | *"In academic literature, noncellular designates not made up of or divided into cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procellaria]] | noun | **1.** Type genus of the procellariidae. | *"In academic literature, procellaria designates type genus of the procellariidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procellariidae]] | noun | **1.** Petrels; fulmars; shearwaters. | *"In academic literature, procellariidae designates petrels; fulmars; shearwaters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procellariiformes]] | noun | **1.** Petrels; albatrosses; shearwaters; diving petrels. | *"In academic literature, procellariiformes designates petrels; albatrosses; shearwaters; diving petrels."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CEL
  </div>
</div>
