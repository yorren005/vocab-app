---
status: unread
type: root_dashboard
---
# Dashboard — dorm
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">dorm-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to sleep”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body and its healthy or changing physical states.</span>
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

The root **dorm** means to sleep. It refers to resting in slumber, being inactive, or remaining dormant. In English, this root forms words such as *dormant*, *dormitory*, and *dormancy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to sleep
> The root **dorm** means to sleep. It refers to resting in slumber, being inactive, or remaining dormant. In English, this root forms words such as *dormant*, *dormitory*, and *dormancy*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To sleep</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body and its healthy or changing physical states.</mark>
> - **Everyday Connection**: Think of familiar words like *dormant* and *dormitory*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **dorm** comes from a Latin word that means *"to sleep"*.
  - At its core, it describes the action of sleep.

- **The Big Picture Idea**:
  - Picture the physical human body and its healthy or changing physical states.
  - Whenever you see **dorm** in an English word, think of **to sleep**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to sleep).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Dormant**: Lying asleep or in a state of rest.
  - **Dormitory**: A large sleeping room containing numerous beds, especially in an institution or monastery.
  - **Dormancy**: The state or quality of being dormant.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">dorm</mark>, think of <mark class="hl-def">to sleep</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **dorm** forms English derivatives through its regular principal parts:
> - **Present Active Stem:** *dormi-* (present participle *dormiēns, dormientis* → French *dormant*).
> - **Supine / Participial Stem:** *dormīt-* (source of *dormītōrium* → *dormitory*, *dormītiō* → *dormition*, *dormītīvus* → *dormitive*).
> - **Old French Vernacular Reflexes:** *dormir* → agent noun *dormeor* ("sleeping room") → English *dormer*.
> - **Prefixal Modifications:** *ob-* ("towards, upon" → *obdormition*).
>
> By attaching English adjectival endings (*-ant*, *-ient*), abstract suffixes (*-ancy*, *-tion*), and vernacular clippings (*dorm*), the root moves from colloquial collegiate slang to high theological and geological terminology.

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
> The family distributes across diverse physical, biological, and cultural spheres:
> - **Physiological & Heraldic Sleep:** [[dormant]] (sleeping; heraldic beast with head on paws), [[dormancy]] (state of suspended animation), [[dormient]] (resting, sleeping).
> - **Architecture & Student Living:** [[dormitory]] (large institutional sleeping hall), [[dorm]] (colloquial campus residence), [[dormer]] (projecting roof window illuminating a sleeping garret).
> - **Zoology & Natural History:** [[dormouse]] (small hibernating rodent), [[dormice]] (plural form).
> - **Theology & Eschatology:** [[dormition]] (the peaceful "falling asleep" or death of a holy person, especially the Virgin Mary).
> - **Philosophy, Pharmacology & Medicine:** [[dormitive]] (sleep-inducing; a soporific; a circular pseudo-explanation), [[obdormition]] (numbness of a limb due to nerve compression, colloquially "falling asleep"), [[predormital]] (hypnagogic; before falling asleep), [[postdormital]] (hypnopompic; after waking).

---

## 🔀 4. Prefix & Combining Dynamics on dorm

### Directional & Modifying Elements with `dorm`

| Combining Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ob-** | over, completely | [[obdormition]] | Literally "falling completely into sleep"; medical numbness of a compressed limb. |
| **pre-** | before | [[predormital]] | Occurring in the transitional state immediately preceding sleep. |
| **post-** | after | [[postdormital]] | Occurring in the transitional state immediately following waking from sleep. |
| **co-** | together, jointly | [[co-dormancy]] | The simultaneous dormancy of interacting plant buds or microbial species. |

### Suffix Transformations

| Suffix | Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| **-ant** | Present participial adjective | [[dormant]] | In a state of temporary physical or metabolic suspension; quiescent. |
| **-ancy** | State or condition noun | [[dormancy]] | The biological or developmental period of metabolic inactivity. |
| **-ory** | Place / Purpose noun (*-ōrium*) | [[dormitory]] | A designated communal hall or building for sleeping. |
| **-er** | Agent / Architectural noun | [[dormer]] | A vertical window set in a sloping roof, originally in a bedroom. |
| **-tion** | Action / Event noun | [[dormition]] | The act of falling asleep; theological term for holy death. |
| **-ive** | Tending to / Capable of | [[dormitive]] | Having the property of producing or inducing sleep; soporific. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Geology & Volcanology** | [[dormant]], [[dormancy]] | Classifying volcanic activity states: distinguishing active volcanoes from dormant ones (capable of erupting) and extinct ones. |
| **Plant Physiology & Botany** | [[dormancy]], [[dormant]], [[co-dormancy]] | Studying seed stratification, winter bud dormancy, and hormonal regulation of breaking dormancy by gibberellic acid. |
| **Architecture & Construction** | [[dormer]], [[dormitory]] | Designing attic dormer roof framing (gabled, hipped, shed dormers), and campus student residential zoning. |
| **Christian Theology & Art History** | [[dormition]] | Iconography of the Byzantine Koimesis and Western Dormition paintings depicting Christ receiving the soul of the Virgin Mary. |
| **Philosophy of Science & Logic** | [[dormitive]] | Critiquing tautological "dormitive virtues" in scientific models where the phenomenon is explained by renaming it. |
| **Zoology & Ecology** | [[dormouse]], [[dormice]] | Monitoring woodland ecosystems using nesting boxes for endangered hazel dormice (*Muscardinus avellanarius*). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[dorm]] | noun | **1.** A college or university building containing living quarters for students. | *"In academic literature, dorm designates a college or university building containing living quarters for students."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dormancy]] | noun | **1.** A state of quiet (but possibly temporary) inaction.<br>**2.** Quiet and inactive restfulness. | *"In academic literature, dormancy designates a state of quiet (but possibly temporary) inaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dormant]] | adjective | **1.** In a condition of biological rest or suspended animation.<br>**2.** (of e.g. volcanos) not erupting and not extinct. | *"In coöperation there is occasionally developed good business ability that might have remained dormant under the wage system; some work-men showing unusual capacity cease to be handicraftsmen."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[dormer]] | noun | **1.** A gabled extension built out from a sloping roof to accommodate a vertical window. | *"All the doors and windows in the house are closed, except a single dormer-window in the roof."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[dormie]] | adjective | **1.** In match play a side that stands as many holes ahead as there are holes remaining to be played. | *"In academic literature, dormie designates in match play a side that stands as many holes ahead as there are holes remaining to be played."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dormition]] | noun | **1.** Celebration in the eastern orthodox church of the virgin mary's being taken up into heaven when her earthly life ended; corresponds to the assumption in the roman catholic church and is also celebrated on august 15th. | *"In academic literature, dormition designates celebration in the eastern orthodox church of the virgin mary's being taken up into heaven when her earthly life ended; corresponds to the assumption in the roman catholic church and is also celebrated on august 15th."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dormitory]] | noun | **1.** A college or university building containing living quarters for students.<br>**2.** A large sleeping room containing several beds. | *"The new part, containing the schoolroom and dormitory, was lit by mullioned and latticed windows, which gave it a church-like aspect; a stone tablet over the door bore this inscription:— LOWOOD INSTITUTION."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[dormouse]] | noun | **1.** Small furry-tailed squirrel-like old world rodent that becomes torpid in cold weather. | *"She did show favour to the youth in your sight only to exasperate you, to awake your dormouse valour, to put fire in your heart and brimstone in your liver."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dormy]] | adjective | **1.** In match play a side that stands as many holes ahead as there are holes remaining to be played. | *"In academic literature, dormy designates in match play a side that stands as many holes ahead as there are holes remaining to be played."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DORM
  </div>
</div>
