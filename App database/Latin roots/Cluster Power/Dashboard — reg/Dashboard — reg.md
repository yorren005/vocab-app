---
status: unread
type: root_dashboard
---
# Dashboard — reg
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">reg-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to rule or guide”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A strong engine lifting a heavy load or a respected leader giving direction.</span>
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

The root **reg** means to rule or guide. It refers to the action of ruling and carrying out this process. In English, this root forms words such as *regal*, *region*, *regulate*, and *regime*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to rule or guide
> The root **reg** means to rule or guide. It refers to the action of ruling and carrying out this process. In English, this root forms words such as *regal*, *region*, *regulate*, and *regime*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To rule or guide</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A strong engine lifting a heavy load or a respected leader giving direction.</mark>
> - **Everyday Connection**: Think of familiar words like *regal* and *region*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **reg** comes from a Latin word that means *"to rule or guide"*.
  - At its core, it describes the action of rule or guide.

- **The Big Picture Idea**:
  - Picture a strong engine lifting a heavy load or a respected leader giving direction.
  - Whenever you see **reg** in an English word, think of **to rule or guide**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to rule or guide).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Regal**: Of, resembling, or fit for a monarch, especially in being magnificent or dignified.
  - **Region**: An area or division, especially part of a country or the world having definable characteristics.
  - **Regulate**: To control or maintain the rate or speed of a machine or process so that it operates properly.
  - **Regime**: A government, especially an authoritarian one.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">reg</mark>, think of <mark class="hl-def">to rule or guide</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **reg** generates vocabulary through nominalization, factitives with *-ulate*, and Romance evolution:
> - **Base Nouns & Royal Titles:**
>   - *rēx, rēgis* $	o$ *regal*, *regalia* ("emblems of royalty").
>   - *rēgālis* $	o$ Old French *roial* $	o$ *royal*, *royalty*.
>   - Old French *reaume* (from Latin *regālimen*) $	o$ *realm* ("a kingdom").
>   - *regēns* $	o$ *regent*, *regency* ("a person appointed to administer a state because the monarch is a minor").
> - **Standardization & Rules from *rēgula*:**
>   - *rēgula* $	o$ *regular*, *regularity*, *regularly*.
>   - *rēgulāre* $	o$ *regulate*, *regulation*, *regulatory*, *regulator*.
>   - *dē-* + *regulate* $	o$ *deregulate*, *deregulation*.
>   - *ir-* + *regular* $	o$ *irregular*, *irregularity*.
> - **Administrative & Military Subdivisions:**
>   - *regiō* $	o$ *region*, *regional*, *regionalism*.
>   - *regimen* $	o$ *regime* ("a system of government"), *regiment*, *regimentation* ("a permanent military unit").

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
> - **Monarchy, Aristocracy & Pageantry:** *regal*, *regalia*, *royal*, *royalty*, *realm* (regal bearing, coronation regalia).
> - **Public Administration & Economic Law:** *regulate*, *regulation*, *regulatory*, *deregulate* (federal regulations, market deregulation).
> - **Geography, Spatial Planning & Climate:** *region*, *regional*, *regionalism* (polar regions, regional development).
> - **Military Structure & Discipline:** *regiment*, *regimentation* (infantry regiments, strictly regimented schedules).
> - **Chronology, Habit & Physics:** *regular*, *regularity* (regular intervals, regular heart rhythm).

---

## 🔀 4. Prefix & Combining Dynamics on reg

### Prefix & Suffix Matrix

| Affix | Form | Derivative | Morphological Shift |
| :--- | :--- | :--- | :--- |
| `dē-` (reversal) | Prefix | **deregulate** / **deregulation** | Removing government rules or economic controls from an industry. |
| `ir-` (privative not) | Prefix | **irregular** / **irregularity** | Not conforming to standard rules, geometric symmetry, or schedules. |
| `-al` (pertaining to) | Suffix | **[[regal]]** | Resembling or fit for a monarch; magnificent and dignified. |
| `-ment` (concrete unit) | Suffix | **[[regiment]]** | A permanent military fighting unit organized under strict command. |
| `-ate` (factitive verb) | Suffix | **[[regulate]]** | To control or maintain the rate or speed of a machine or process by rule. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🏛️ **Administrative Law & Governance** | *regulate*, *regulation*, *regulatory* | Compliance with Securities and Exchange Commission (SEC) regulatory mandates. |
| 🪖 **Military Science & Tactical History** | *regiment*, *regimentation* | Command structures of mechanized infantry regiments deployed in armored warfare. |
| 🌍 **Economic Geography & Urbanism** | *region*, *regional* | Regional economic disparities and metropolitan spatial transportation planning. |
| 👑 **Constitutional Monarchy & Heraldry** | *regal*, *regalia*, *regent* | Storing the Crown Jewels and coronation regalia in the Tower of London. |
| 🩺 **Chronobiology & Cardiology** | *regular*, *regularity* | Assessing the regularity of sinus rhythm on surface electrocardiograms (ECGs). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[coregonidae]] | noun | **1.** Soft-finned fishes comprising the freshwater whitefishes; formerly included in the family salmonidae. | *"In academic literature, coregonidae designates soft-finned fishes comprising the freshwater whitefishes; formerly included in the family salmonidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coregonus]] | noun | **1.** Type genus of the coregonidae: whitefishes. | *"In academic literature, coregonus designates type genus of the coregonidae: whitefishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corregidor]] | noun | **1.** The peninsula and island in the philippines where japanese forces besieged american forces in world war ii; united states forces surrendered in 1942 and recaptured the area in 1945. | *"We went to school together, and we played our games together on the hills of Corregidor."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[deregulate]] | verb | **1.** Lift the regulations on. | *"In academic literature, deregulate designates lift the regulations on."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deregulating]] | noun | **1.** The act of freeing from regulation (especially from governmental regulations).<br>**2.** Lift the regulations on. | *"In academic literature, deregulating designates the act of freeing from regulation (especially from governmental regulations)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deregulation]] | noun | **1.** The act of freeing from regulation (especially from governmental regulations). | *"In academic literature, deregulation designates the act of freeing from regulation (especially from governmental regulations)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disregard]] | noun | **1.** Lack of attention and due care.<br>**2.** Willful lack of care and attention. | *"Rouncewell, not a little alarmed by his disregard of the doctor’s injunctions, replies, in London."* — Charles Dickens, *Bleak House* |
| [[disregarded]] | verb | **1.** Refuse to acknowledge.<br>**2.** Bar from attention or consideration. | *"A coolness arose between him and my guardian, based principally on the foregoing grounds and on his having heartlessly disregarded my guardian’s entreaties (as we afterwards learned from Ada) in reference to Richard."* — Charles Dickens, *Bleak House* |
| [[disregarding]] | verb | **1.** Refuse to acknowledge.<br>**2.** Bar from attention or consideration. | *"Woodcourt, disregarding my remonstrances, had hurriedly taken off his cloak and was putting it about me."* — Charles Dickens, *Bleak House* |
| [[disregardless]] | adverb | **1.** In spite of everything; without regard to drawbacks. | *"In academic literature, disregardless designates in spite of everything; without regard to drawbacks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interregnum]] | noun | **1.** The time between two reigns, governments, etc. | *"Therefore, I saw that here was a sort of interregnum in Providence; for its even-handed equity never could have so gross an injustice."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[irregardless]] | adverb | **1.** Regardless; a combination of irrespective and regardless sometimes used humorously. | *"In academic literature, irregardless designates regardless; a combination of irrespective and regardless sometimes used humorously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irregular]] | noun | **1.** A member of an irregular armed force that fights a stronger force by sabotage and harassment.<br>**2.** Merchandise that has imperfections; usually sold at a reduced price without the brand name. | *"The furniture, old-fashioned rather than old, like the house, was as pleasantly irregular."* — Charles Dickens, *Bleak House* |
| [[irregularity]] | noun | **1.** Behavior that breaches the rule or etiquette or custom or morality.<br>**2.** Not characterized by a fixed principle or rate; at irregular intervals. | *"Ever since the accident with her father’s horse Tess Durbeyfield, courageous as she naturally was, had been exceedingly timid on wheels; the least irregularity of motion startled her."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[irregularly]] | adverb | **1.** In an irregular manner.<br>**2.** Having an irregular form. | *"On account of her age she could not well be etherized, nor endure the repeated necessary resetting of the bones, and consequently they grew together irregularly."* — Classic Author, *The wonders of prayer* |
| [[regain]] | verb | **1.** Get or find back; recover the use of.<br>**2.** Come upon after searching; find the location of something that was missed or lost. | *"There he had seen everything to exalt in his estimation the woman he had lost; and there begun to deplore the pride, the folly, the madness of resentment, which had kept him from trying to regain her when thrown in his way."* — Jane Austen, *Persuasion* |
| [[regaining]] | noun | **1.** Getting something back again.<br>**2.** Get or find back; recover the use of. | *"I have discovered,” whispering mysteriously, “that her natural cruelty is sharpened by a jealous fear of their regaining their liberty."* — Charles Dickens, *Bleak House* |
| [[regal]] | adjective | **1.** Belonging to or befitting a supreme ruler. | *"And, Charles, upon condition thou wilt swear To pay him tribute and submit thyself, Thou shalt be placed as viceroy under him, And still enjoy the regal dignity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regale]] | verb | **1.** Provide with choice or abundant food or drink. | *"And so he would bring down to the class a tattered Father or two, and would regale its members with long Greek quotations and with a mass of details that were pure gold to him but were hid treasure to them."* — John Cairns, *Principal Cairns* |
| [[regalecidae]] | noun | **1.** Ribbonfishes. | *"In academic literature, regalecidae designates ribbonfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regalia]] | noun | **1.** Paraphernalia indicative of royalty (or other high office).<br>**2.** Especially fine or decorative clothing. | *"In place of the golden crown he wore a peaked white cap, and his regalia, instead of being of gold encrusted with diamonds, were of rough wood."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[regally]] | adverb | **1.** In a regal manner. | *"So world-wondered-at Niagara shall be our destination, where Florence Howard and her father are already arrived and installed occupants of a regally-furnished suite of apartments at the Clifton House on the Canada side of the river."* — Effie Afton, *Eventide* |
| [[regard]] | noun | **1.** (usually preceded by `in') a detail or point.<br>**2.** Paying particular notice (as to children or helpless people). | *"For The mutable, rank-scented many, let them Regard me, as I do not flatter, and Therein behold themselves."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regardant]] | adjective | **1.** Looking backward. | *"He turned his face over a shoulder, rere regardant."* — James Joyce, *Ulysses* |
| [[regardful]] | adjective | **1.** Showing deference. | *"Gabriel, to whom her face was as the uncertain glory of an April day, was ever regardful of its faintest changes, and instantly discerned thereon the mark of some influence from without, in the form of a keenly self-conscious reddening."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[regardless]] | adjective | **1.** (usually followed by `of') without due thought or consideration.<br>**2.** In spite of everything; without regard to drawbacks. | *"What I say is, it was all very well and we got on very well while I was a boy, utterly regardless of this same suit; but as soon as I began to take an interest in it and to look into it, then it was quite another thing."* — Charles Dickens, *Bleak House* |
| [[regatta]] | noun | **1.** A meeting for boat races. | *"Count Bennigsen, being a landowner in the Vílna province, offered his country house for the fete, and the thirteenth of June was fixed for a ball, dinner, regatta, and fireworks at Zakret, Count Bennigsen’s country seat."* — graf Leo Tolstoy, *War and Peace* |
| [[regency]] | noun | **1.** The period of time during which a regent governs.<br>**2.** The period from 1811-1820 when the prince of wales was regent during george iii's periods of insanity. | *"In the last century, however, four successive heirs were of a dissolute and wasteful disposition, and the family ruin was eventually completed by a gambler in the days of the Regency."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[regenerate]] | verb | **1.** Reestablish on a new, usually improved, basis or make new or like new.<br>**2.** Amplify (an electron current) by causing part of the power in the output circuit to act upon the input circuit. | *"Without corrupting the State legislatures, it cannot prosecute the attempt, because the periodical change of members would otherwise regenerate the whole body."* — Alexander Hamilton, *The Federalist Papers* |
| [[regenerating]] | verb | **1.** Reestablish on a new, usually improved, basis or make new or like new.<br>**2.** Amplify (an electron current) by causing part of the power in the output circuit to act upon the input circuit. | *"Would not a life devoted to the task of regenerating your race be well spent?” “Yes,” I said; “but I could not go on for ever so: I want to enjoy my own faculties as well as to cultivate those of other people."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[regeneration]] | noun | **1.** (biology) growth anew of lost tissue or destroyed parts or organs.<br>**2.** Feedback in phase with (augmenting) the input. | *"I remained an inmate of its walls, after its regeneration, for eight years: six as pupil, and two as teacher; and in both capacities I bear my testimony to its value and importance."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[regent]] | noun | **1.** Members of a governing board.<br>**2.** Someone who rules during the absence or incapacity or minority of the country's monarch. | *"Enter the funeral of King Henry the Fifth, attended on by the Duke of Bedford, Regent of France; the Duke of Gloucester, Protector; the Duke of Exeter, the Earl of Warwick, the Bishop of Winchester, the Duke of Somerset with Heralds, &c."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regicide]] | noun | **1.** Someone who commits regicide; the killer of a king.<br>**2.** The act of killing a king. | *"Revolution and regicide a grand thing?..."* — graf Leo Tolstoy, *War and Peace* |
| [[regime]] | noun | **1.** The organization that is the governing authority of a political unit.<br>**2.** (medicine) a systematic plan for therapy (often including diet). | *"Under the regime of Friedrich Eugen (1795-97) the French gained such a foothold in Wuerttemberg that the country had to pay a contribution of four million gulden to get rid of them."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[regimen]] | noun | **1.** (medicine) a systematic plan for therapy (often including diet). | *"For it is thought that she herself would suffer if she were to neglect the prescribed regimen."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[regiment]] | noun | **1.** Army unit smaller than a division.<br>**2.** Subject to rigid discipline, order, and systematization. | *"You shall find in the regiment of the Spinii one Captain Spurio, with his cicatrice, an emblem of war, here on his sinister cheek; it was this very sword entrench’d it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regimental]] | adjective | **1.** Belonging to or concerning a regiment. | *"But the peace it reduc’d me to beg in despair, Till I met old boy in a Cunningham fair, His rags regimental, they flutter’d so gaudy, My heart it rejoic’d at a sodger laddie."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[regimentally]] | adverb | **1.** In a regimental manner or by regiments. | *"In academic literature, regimentally designates in a regimental manner or by regiments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regimentals]] | noun | **1.** The military uniform and insignia of a regiment. | *"Bingley’s large fortune, the mention of which gave animation to their mother, was worthless in their eyes when opposed to the regimentals of an ensign."* — Jane Austen, *Pride and Prejudice* |
| [[regimentation]] | noun | **1.** The imposition of order or discipline. | *"The state is construed to be a mechanism of public service, operated by the Body Politic, and the actual regulation and regimentation of society is accomplished by natural socio-economic laws which, of course, are both universal and unavoidable."* — Algis Budrys, *Citadel* |
| [[regimented]] | verb | **1.** Subject to rigid discipline, order, and systematization.<br>**2.** Form (military personnel) into a regiment. | *"In academic literature, regimented designates subject to rigid discipline, order, and systematization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regina]] | noun | **1.** The provincial capital of saskatchewan. | *"WOLSEY. _Tanta est erga te mentis integritas, regina serenissima_— QUEEN KATHERINE."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regiomontanus]] | noun | **1.** German mathematician and astronomer (1436-1476). | *"The engineers were commanded by Regiomontanus and Wilkins."* — Jonathan Swift, *The Battle of the Books, and other Short Pieces* |
| [[region]] | noun | **1.** The extended spatial location of something.<br>**2.** A part of an animal that has a special function or is supplied by a given artery or nerve. | *"No more, you petty spirits of region low, Offend our hearing; hush!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regional]] | adjective | **1.** Characteristic of a region.<br>**2.** Related or limited to a particular region. | *"It created not one central banking reserve, but, in the end, twelve regional, or district, banks each to keep the reserves of its district."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[regionalism]] | noun | **1.** A feature (as a pronunciation or expression or custom) that is characteristic of a particular region.<br>**2.** A foreign policy that defines the international interests of a country in terms of particular geographic areas. | *"In academic literature, regionalism designates a feature (as a pronunciation or expression or custom) that is characteristic of a particular region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regionally]] | adverb | **1.** In a regional manner. | *"In academic literature, regionally designates in a regional manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[register]] | noun | **1.** An official written record of names or events or transactions.<br>**2.** (music) the timbre that is characteristic of a certain range and manner of production of the human voice or of different pipe organ stops or of different musical instruments. | *"O Antony, Nobler than my revolt is infamous, Forgive me in thine own particular, But let the world rank me in register A master-leaver and a fugitive."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[registered]] | verb | **1.** Record in writing; enter into a book of names or events or transactions.<br>**2.** Record in a public office or in a court of law. | *"But say, my lord, it were not registered, Methinks the truth should live from age to age, As ’twere retailed to all posterity, Even to the general all-ending day."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[registrant]] | noun | **1.** A person who is formally entered (along with others) in a register (and who obtains certain rights thereby). | *"In academic literature, registrant designates a person who is formally entered (along with others) in a register (and who obtains certain rights thereby)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[registrar]] | noun | **1.** A person employed to keep a record of the owners of stocks and bonds issued by the company.<br>**2.** The administrator responsible for student records. | *"There is the registrar below the judge, in wig and gown; and there are two or three maces, or petty-bags, or privy purses, or whatever they may be, in legal court suits."* — Charles Dickens, *Bleak House* |
| [[registration]] | noun | **1.** The act of enrolling.<br>**2.** The body of people (such as students) who register or enroll at the same time. | *"Sometimes a special mortgage registration tax, payable but once (in New York 1/2 of 1 per cent) is levied, and otherwise mortgages are free from taxation."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[registry]] | noun | **1.** An official written record of names or events or transactions. | *"I have wired to get his name and address from the Official Registry."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[reglaecus]] | noun | **1.** Type genus of the regalecidae. | *"In academic literature, reglaecus designates type genus of the regalecidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regnant]] | adjective | **1.** Exercising power or authority. | *"I dreaded the flash of lovely flame, and the outburst of regnant anger, ere I should have time to say that I was not to blame."* — George MacDonald, *The Portent and Other Stories* |
| [[regnellidium]] | noun | **1.** Small latex-containing aquatic fern of southern brazil. | *"In academic literature, regnellidium designates small latex-containing aquatic fern of southern brazil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regorge]] | verb | **1.** Eject the contents of the stomach through the mouth. | *"In academic literature, regorge designates eject the contents of the stomach through the mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regosol]] | noun | **1.** A type of soil consisting of unconsolidated material from freshly deposited alluvium or sand. | *"In academic literature, regosol designates a type of soil consisting of unconsolidated material from freshly deposited alluvium or sand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regress]] | noun | **1.** The reasoning involved when you assume the conclusion is true and reason backward to the evidence.<br>**2.** Returning to a former state. | *"Thou shalt have egress and regress—said I well?—and thy name shall be Brook."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regression]] | noun | **1.** An abnormal state in which development has stopped prematurely.<br>**2.** (psychiatry) a defense mechanism in which you flee from reality by assuming a more infantile state. | *"It is upheld in part because in this case it but offsets _regression_, that is relatively heavier taxation on the smaller incomes, in the case of the other kinds of taxes (tariff, property taxes, etc.)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[regressive]] | adjective | **1.** (of taxes) adjusted so that the rate decreases as the amount of income increases.<br>**2.** Opposing progress; returning to a former less advanced state. | *"In academic literature, regressive designates (of taxes) adjusted so that the rate decreases as the amount of income increases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regret]] | noun | **1.** Sadness associated with some wrong done or some disappointment.<br>**2.** Feel remorse for; feel sorry for; be contrite about. | *"All its eyes were closed and were to remain so." "Oh, oh, did they never come back?" cried out Kurt with regret."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[regretful]] | adjective | **1.** Feeling or expressing regret or sorrow or a sense of loss over something done or undone. | *"He followed me when I called him: but cast a regretful look at the postern by which we had gone out, through which I had dragged him back in a panic (I confess it) unworthy of me."* — Mrs. Oliphant, *A Beleaguered City* |
| [[regretfully]] | adverb | **1.** With regret (used in polite formulas). | *"It is falling down again," said Leonore regretfully."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[regrets]] | noun | **1.** A polite refusal of an invitation.<br>**2.** Sadness associated with some wrong done or some disappointment. | *"Skimpole and to have the opportunity of tendering my personal regrets."* — Charles Dickens, *Bleak House* |
| [[regrettable]] | adjective | **1.** Deserving regret. | *"It was Ukridge who was to blame for the professor's regrettable explosion and departure, and he ought by all laws of justice to have suffered for it."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[regrettably]] | adverb | **1.** By bad luck. | *"In academic literature, regrettably designates by bad luck."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regroup]] | verb | **1.** Organize anew, as after a setback.<br>**2.** Reorganize into new groups. | *"Then we'll regroup and go on from there." Boarding a robo-taxi that had just discharged suited figures at a nearby mooring tower, the Sentinels lined up along the taxi's portal."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[regrow]] | verb | **1.** Grow anew or continue growth after an injury or interruption. | *"In academic literature, regrow designates grow anew or continue growth after an injury or interruption."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regular]] | noun | **1.** A regular patron.<br>**2.** A soldier in the regular army. | *"And, to atone your fears With my more noble meaning, not a man Shall pass his quarter or offend the stream Of regular justice in your city’s bounds, But shall be remedied to your public laws At heaviest answer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[regularisation]] | noun | **1.** The condition of having been made regular (or more regular).<br>**2.** The act of bringing to uniformity; making regular. | *"In academic literature, regularisation designates the condition of having been made regular (or more regular)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regularise]] | verb | **1.** Bring into conformity with rules or principles or usage; impose regulations.<br>**2.** Make regular or more regular. | *"In academic literature, regularise designates bring into conformity with rules or principles or usage; impose regulations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regularity]] | noun | **1.** A property of polygons: the property of having equal sides and equal angles.<br>**2.** The quality of being characterized by a fixed principle or rate. | *"Vholes, and his young client, and several blue bags hastily stuffed out of all regularity of form, as the larger sort of serpents are in their first gorged state, have returned to the official den."* — Charles Dickens, *Bleak House* |
| [[regularization]] | noun | **1.** The condition of having been made regular (or more regular).<br>**2.** The act of bringing to uniformity; making regular. | *"In academic literature, regularization designates the condition of having been made regular (or more regular)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regularize]] | verb | **1.** Bring into conformity with rules or principles or usage; impose regulations.<br>**2.** Make regular or more regular. | *"It must therefore be a benefit to the community, if this element of unavoidable chance cannot be reduced as a whole, at least to regularize it and make it exactly calculable for any individual."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[regularly]] | adverb | **1.** In a regular manner.<br>**2.** Having a regular form. | *"I have the honour to attend court regularly."* — Charles Dickens, *Bleak House* |
| [[regulate]] | verb | **1.** Fix or adjust the time, amount, degree, or rate of.<br>**2.** Bring into conformity with rules or principles or usage; impose regulations. | *"Now I’ll be more interesting, and let you see some loose play—giving all the cuts and points, infantry and cavalry, quicker than lightning, and as promiscuously—with just enough rule to regulate instinct and yet not to fetter it."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[regulated]] | verb | **1.** Fix or adjust the time, amount, degree, or rate of.<br>**2.** Bring into conformity with rules or principles or usage; impose regulations. | *"I should have come down sooner,” he explains, “but that I have been much engaged with those matters in the several suits between yourself and Boythorn.” “A man of a very ill-regulated mind,” observes Sir Leicester with severity."* — Charles Dickens, *Bleak House* |
| [[regulating]] | noun | **1.** The act of controlling or directing according to rule.<br>**2.** Fix or adjust the time, amount, degree, or rate of. | *"Regulating my purchases by my guardian’s taste, which I knew very well of course, I arranged my wardrobe to please him and hoped I should be highly successful."* — Charles Dickens, *Bleak House* |
| [[regulation]] | noun | **1.** An authoritative rule.<br>**2.** A principle or condition that customarily governs behavior. | *"George salutes the gentleman but otherwise sits bolt upright and profoundly silent—very forward in his chair, as if the full complement of regulation appendages for a field-day hung about him."* — Charles Dickens, *Bleak House* |
| [[regulative]] | adjective | **1.** Restricting according to rules or principles. | *"This is represented by the Interstate Commerce Act (at first weakly, and more vigorously after its amendment), and by the great mass of state legislation putting the local and interurban public utilities under the control of regulative commissions."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[regulator]] | noun | **1.** Any of various controls or devices for regulating or controlling fluid flow, pressure, temperature, etc.<br>**2.** An official responsible for control and supervision of a particular activity or area of public interest. | *"The statement that competition is not an effective regulator of railroads often is misunderstood to mean that it in no way acts on rates."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[regulatory]] | adjective | **1.** Restricting according to rules or principles. | *"In academic literature, regulatory designates restricting according to rules or principles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regulus]] | noun | **1.** The brightest star in leo.<br>**2.** A genus of birds of the family sylviidae including kinglets. | *"The regulus of cobalt, dissolved in spirit of niter, gives a red."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[regur]] | noun | **1.** A rich black loam of india. | *"In academic literature, regur designates a rich black loam of india."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regurgitate]] | verb | **1.** Pour or rush back.<br>**2.** Feed through the beak by regurgitating previously swallowed food. | *"In academic literature, regurgitate designates pour or rush back."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regurgitation]] | noun | **1.** Backflow of blood through a defective heart valve.<br>**2.** Recall after rote memorization. | *"When I passed outside, however, and pressed down the levers which controlled it, I knew at once by the whishing sound that there was a slight leakage, which allowed a regurgitation of water through one of the side cylinders."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[subregent]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin reg within the domain of Power.<br>**2.** A technical or specialized form exhibiting the properties of reg in systematic terminology. | *"In academic literature, subregent designates pertaining to, derived from, or characteristic of latin reg within the domain of power."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unregenerate]] | adjective | **1.** Tenaciously unwilling or marked by tenacious unwillingness to yield.<br>**2.** Not reformed morally or spiritually. | *"He who had wrought her undoing was now on the side of the Spirit, while she remained unregenerate."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[unregenerated]] | adjective | **1.** Not reformed morally or spiritually. | *"In academic literature, unregenerated designates not reformed morally or spiritually."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unregistered]] | adjective | **1.** (of animals) not recorded with or certified by an official breed association.<br>**2.** Not registered. | *"I found you as a morsel cold upon Dead Caesar’s trencher; nay, you were a fragment Of Gneius Pompey’s, besides what hotter hours, Unregistered in vulgar fame, you have Luxuriously pick’d out."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unregretful]] | adjective | **1.** Feeling no regret. | *"In academic literature, unregretful designates feeling no regret."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unregretting]] | adjective | **1.** Feeling no regret. | *"In academic literature, unregretting designates feeling no regret."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unregularity]] | noun | **1.** Not characterized by a fixed principle or rate; at irregular intervals. | *"In academic literature, unregularity designates not characterized by a fixed principle or rate; at irregular intervals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unregulated]] | adjective | **1.** Not regulated; not subject to rule or discipline.<br>**2.** Without regulation or discipline. | *"It is well to begin, therefore, with a clear conception of typical bank money, unregulated by government."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Power]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · REG
  </div>
</div>
