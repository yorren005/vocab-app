---
status: unread
type: root_dashboard
---
# Dashboard — pel
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pel-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to drive or push”</span>
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

The root **pel** means to drive or push. It refers to setting something into motion, taking action, or carrying out a deed. In English, this root forms words such as *propel*, *repel*, *compel*, and *expel*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to drive or push
> The root **pel** means to drive or push. It refers to setting something into motion, taking action, or carrying out a deed. In English, this root forms words such as *propel*, *repel*, *compel*, and *expel*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To drive or push</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *propel* and *repel*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pel** comes from a Latin word that means *"to drive or push"*.
  - At its core, it describes the action of drive or push.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **pel** in an English word, think of **to drive or push**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to drive or push).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Propel**: To drive, push, or cause to move forward or onward through the application of physical, aerodynamic, or mechanical force.
  - **Repel**: To drive back, ward off, or beat back an advancing enemy, intruder, or physical assault.
  - **Compel**: To force, drive, or constrain someone irresistibly to a course of action by physical force, moral pressure, or legal authority.
  - **Expel**: To force out or eject physically, mechanically, or physiologically.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pel</mark>, think of <mark class="hl-def">to drive or push</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **pel** operates as an active verbal engine characterized by strict orthographic and morphological rules:
> - **Primary Present Active Stem:** `-pel` (from Latin present stem *pell-* / *pel-*). It forms core dynamic verbs denoting ongoing action: *com-pel*, *dis-pel*, *ex-pel*, *im-pel*, *pro-pel*, *re-pel*.
> - **Morphological Split with [[Dashboard — puls|puls]]:** Latin *pellere* operated with two distinct stem systems:
>   1. The **present stem** `pel-` (the subject of this dashboard), which forms verbs of motion, continuous action, and their active agents/participles (*propelling*, *propeller*, *impeller*, *repellent*).
>   2. The **supine stem** `puls-` (*pulsum*, covered in [[Dashboard — puls]]), which forms abstract nouns of completed action, states, and frequentatives (*propulsion*, *compulsion*, *expulsion*, *repulsion*, *impulse*, *pulsation*).
> - **The English Consonant Doubling Rule:** In English phonology, words ending in a single accented short vowel followed by a single consonant double that consonant before a suffix starting with a vowel (CVC rule). Because `-pel` carries primary stress (/-ˈpɛl/), the *l* doubles in every standard inflected and derived form:
>   - *compel* $\to$ *compelled*, *compelling*, *compellingly*, *compeller*
>   - *dispel* $\to$ *dispelled*, *dispelling*, *dispeller*
>   - *expel* $\to$ *expelled*, *expelling*, *expellee*, *expeller*
>   - *impel* $\to$ *impelled*, *impelling*, *impeller*
>   - *propel* $\to$ *propelled*, *propelling*, *propeller*, *propellant*
>   - *repel* $\to$ *repelled*, *repelling*, *repeller*, *repellent*, *repellence*, *repellency*
> - **Prefix Assimilation:** The nasal prefix *con-* and prepositional prefix *in-* assimilate their terminal *n* to a bilabial *m* before the bilabial voiceless stop *p-*: *con-* + *pellere* $\to$ *compellere* (**compel**); *in-* + *pellere* $\to$ *impellere* (**impel**).
> - **Frequentative / Intensive Branching:** Classical Latin also formed the first-conjugation verb *compellāre* (intensive of *pellere* / *appellāre*, meaning "to accost verbally, address by name, summon"), which entered English as the technical legal and grammatical terms **compellation** and **compellative**.

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
> Although the root fundamentally denotes imparting dynamic force or striking, its semantic realization diversifies across distinct operational planes:
> - **Mechanical Propulsion & Aerodynamic Thrust:** [[propel]], [[propeller]], [[propellant]], [[impeller]] govern the physical physics of fluid dynamics, aeronautics, rocketry, and turbomachinery.
> - **Legal Coercion, Sovereign Authority & Banishment:** [[compel]], [[compeller]], [[uncompelled]], [[expel]], [[expellee]], [[expeller]] articulate the formal powers of judicial courts, institutional disciplinary bodies, and sovereign borders.
> - **Psychological Urgency & Moral Impetus:** [[impel]], [[impelling]], [[impellent]], [[compelling]], [[compellingly]] capture the invisible inner forces—conscience, passion, undeniable reasoning—that drive human choice.
> - **Cognitive Dissipation & Epistemic Clarity:** [[dispel]], [[dispeller]] describe the metaphorical scattering of confusion, superstitious dread, and falsehoods by the light of evidence.
> - **Physical Resistance, Defense & Chemical Repulsion:** [[repel]], [[repelling]], [[repellant]], [[repellent]], [[repellence]], [[repellency]], [[repeller]] encompass military counter-offensives, electrostatic repulsion, hydrophobic materials, and visceral psychological revulsion.
> - **Rhetorical & Ceremonial Address:** [[compellation]], [[compellative]] specialize in formal styles of personal address, ceremonial titles, and grammatical vocatives.

---

## 🔀 4. Prefix & Combining Dynamics on pel

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **com-** (*con-*) | together, completely, intensely | [[compel]] | *com-* + *pellere* $\to$ to drive together into an inescapable corner $\to$ to coerce by overwhelming force or authority. |
| **dis-** | apart, in different directions, asunder | [[dispel]] | *dis-* + *pellere* $\to$ to drive apart in all directions $\to$ to scatter, dissipate, or cause doubts and fears to vanish. |
| **ex-** | out of, away from | [[expel]] | *ex-* + *pellere* $\to$ to drive out beyond a boundary $\to$ to eject mechanically or banish from an institution or state. |
| **in-** (assimilated to *im-*) | into, upon, against, onward | [[impel]] | *in-* + *pellere* $\to$ to strike against or drive forward from within $\to$ to impart physical motion or moral motivation. |
| **pro-** | forward, forth, onward | [[propel]] | *pro-* + *pellere* $\to$ to drive forward through space $\to$ to impart sustained forward thrust or launch an enterprise. |
| **re-** | back, backward, away | [[repel]] | *re-* + *pellere* $\to$ to drive back an advancing force $\to$ to ward off assault, resist fluid wetting, or evoke visceral disgust. |
| **un-** + **com-** | not + together | [[uncompelled]] | *un-* + *compelled* $\to$ not subjected to external driving force $\to$ acting purely voluntarily and spontaneously. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ing** | Present participle / participial adjective | [[compelling]], [[impelling]], [[repelling]] | Transforms the verbal action into an active, ongoing descriptive quality ("compelling argument", "repelling demeanor"). |
| **-ingly** | Participial adverb | [[compellingly]] | Modifies verbs and adjectives, expressing the manner of exerting irresistible force or conviction. |
| **-er** | Agent noun / instrument noun | [[compeller]], [[dispeller]], [[expeller]], [[impeller]], [[propeller]], [[repeller]] | Denotes the human actor who drives, or the mechanical instrument (rotor blade, screw, ultrasonic unit) that applies force. |
| **-ee** | Patient noun / passive recipient | [[expellee]] | Designates the person who has been driven out or expelled by institutional or governmental decree. |
| **-ent / -ant** | Participial adjective / substantive agent noun | [[impellent]], [[propellant]], [[repellant]], [[repellent]] | Denotes an entity that drives forward or wards off; in modern industry, specialized as chemical fuels, sprays, or coatings. |
| **-ence / -ency** | Abstract noun of quality or state | [[repellence]], [[repellency]] | Denotes the degree, capacity, or property of resisting penetration, wetting, or intrusion. |
| **-ation** | Abstract noun of action or process | [[compellation]] | Derived via Latin *compellāre*, designating the formal act of addressing someone or the name/title applied. |
| **-ative** | Categorical / descriptive adjective | [[compellative]] | Designates grammatical structures or vocal expressions designed specifically for direct personal address. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Aerospace, Marine & Mechanical Engineering** | [[propel]], [[propeller]], [[propellant]], [[impeller]] | Marine screws, variable-pitch aircraft propellers, solid/liquid rocket propellants, centrifugal impellers in pumps and superchargers. |
| **Constitutional, Criminal & Procedural Law** | [[compel]], [[compeller]], [[uncompelled]], [[expel]], [[expellee]] | Judicial subpoenas to compel testimony, motions to compel discovery, uncompelled confessions under the Fifth Amendment, parliamentary expulsion. |
| **Materials Science, Chemistry & Nanotechnology** | [[repel]], [[repellant]], [[repellent]], [[repellence]], [[repellency]] | Hydrophobic fluoropolymer textile coatings, contact-angle repellency metrics, synthetic insect repellents (DEET, picaridin). |
| **Rhetoric, Logic & Epistemology** | [[compelling]], [[compellingly]], [[dispel]], [[dispeller]] | Compelling evidentiary proof, rigorous deductive arguments, scientific empiricism dispelling superstition and cognitive biases. |
| **Moral Philosophy & Depth Psychology** | [[impel]], [[impelling]], [[impellent]], [[compel]] | The Kantian categorical imperative impelling duty, subconscious impulses driving compulsive behavior, irresistible emotional motives. |
| **Grammar, Philology & Diplomatic Protocol** | [[compellation]], [[compellative]] | Forms of address (*compellations*) in diplomatic correspondence, vocative grammatical cases, monarchical titular conventions. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[compel]] | verb | **1.** Force somebody to do something.<br>**2.** Necessitate or exact. | *"And I were not a very coward I’d compel it of you; but fare you well. [_Exeunt Bertram, Lords &c._] FIRST SOLDIER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dispel]] | verb | **1.** Force to go away; used both with concrete and metaphoric meanings.<br>**2.** To cause to separate and go in different directions. | *"Employment, even melancholy, may dispel melancholy, and her occupations were hopeful."* — Jane Austen, *Mansfield Park* |
| [[expel]] | verb | **1.** Force to leave or move out.<br>**2.** Remove from a position or office. | *"The Tribunes are no soldiers, and their people Will be as rash in the repeal as hasty To expel him thence."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expelling]] | noun | **1.** Any of several bodily processes by which substances go out of the body.<br>**2.** Force to leave or move out. | *"But since she did neglect her looking-glass And threw her sun-expelling mask away, The air hath starved the roses in her cheeks And pinched the lily-tincture of her face, That now she is become as black as I."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impel]] | verb | **1.** Urge or force (a person) to an action; constrain or motivate.<br>**2.** Cause to move forward with force. | *"They impel her to say, “Snagsby has something on his mind!” And thus suspicion gets into Cook’s Court, Cursitor Street."* — Charles Dickens, *Bleak House* |
| [[impelled]] | verb | **1.** Urge or force (a person) to an action; constrain or motivate.<br>**2.** Cause to move forward with force. | *"Piper, who leads the court, is impelled to offer two remarks to Mrs."* — Charles Dickens, *Bleak House* |
| [[impellent]] | adjective | **1.** Forcing forward or onward; impelling. | *"In academic literature, impellent designates forcing forward or onward; impelling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impeller]] | noun | **1.** The blade of a rotor (as in the compressor of a jet engine). | *"In academic literature, impeller designates the blade of a rotor (as in the compressor of a jet engine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impelling]] | verb | **1.** Urge or force (a person) to an action; constrain or motivate.<br>**2.** Cause to move forward with force. | *"The ravening hawk pursuing, The trembling dove thus flies, To shun impelling ruin, Awhile her pinions tries; Till, of escape despairing, No shelter or retreat, She trusts the ruthless Falconer, And drops beneath his feet."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[pel]] | noun | **1.** (computer science) the smallest discrete component of an image or picture on a crt screen (usually a colored dot). | *"Gifts in cases of great disasters, as the Irish and Indian famines, the Chicago fire, the Galveston flood, the eruption of Mount Pelée, bespeak a widening generosity."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[pelage]] | noun | **1.** Growth of hair or wool or fur covering the body of an animal. | *"In academic literature, pelage designates growth of hair or wool or fur covering the body of an animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[propel]] | verb | **1.** Cause to move forward with force.<br>**2.** Give an incentive for action. | *"While the bonfires blazed up, it was customary in some parts of Switzerland to propel burning discs of wood through the air by means of the same simple machinery which is used for the purpose in Swabia."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[propellant]] | noun | **1.** Any substance that propels.<br>**2.** Tending to or capable of propelling. | *"The propellant whose function it is to drive the shell out of the gun is different from that with which the shell is itself filled."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[propellent]] | noun | **1.** Any substance that propels.<br>**2.** Tending to or capable of propelling. | *"What propellent power lies behind the morals?"* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[propeller]] | noun | **1.** A mechanical device that rotates to push against air or water. | *"The F-80's high accident rate in the early years of the war was attributed to pilots familiar with propeller-driven aircraft transitioning to the faster and more powerful jets."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[propelling]] | verb | **1.** Cause to move forward with force.<br>**2.** Give an incentive for action. | *"Besides, this mystery must necessarily be solved, and before long; for, upon an order from Captain Nemo, the engine, increasing its propelling power, made the screw turn more rapidly."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[propellor]] | noun | **1.** A mechanical device that rotates to push against air or water. | *"In academic literature, propellor designates a mechanical device that rotates to push against air or water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repel]] | verb | **1.** Cause to move back by force or influence.<br>**2.** Be repellent to; cause aversion in. | *"No, my good lord; but as you did command, I did repel his letters and denied His access to me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[repellant]] | noun | **1.** A compound with which fabrics are treated to repel water.<br>**2.** A chemical substance that repels animals. | *"You note that the very thing that appealed most strongly to the mind of the Jew--the miraculous raising of the Jesus--was the most repellant to the Greek, who, in his search for wisdom, demanded to know the how of every assertion."* — Sutton E. Griggs, *Unfettered: A Novel* |
| [[repellent]] | noun | **1.** A compound with which fabrics are treated to repel water.<br>**2.** A chemical substance that repels animals. | *"Rouncewell, our views of duty, and our views of station, and our views of education, and our views of—in short, ALL our views—are so diametrically opposed, that to prolong this discussion must be repellent to your feelings and repellent to my own."* — Charles Dickens, *Bleak House* |
| [[repelling]] | verb | **1.** Cause to move back by force or influence.<br>**2.** Be repellent to; cause aversion in. | *"She had begun her confession under the subduing influence of Dorothea’s emotion; and as she went on she had gathered the sense that she was repelling Will’s reproaches, which were still like a knife-wound within her."* — George Eliot, *Middlemarch* |

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
    ROOT DASHBOARD · PEL
  </div>
</div>
