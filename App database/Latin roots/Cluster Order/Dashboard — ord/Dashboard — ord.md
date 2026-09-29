---
status: unread
type: root_dashboard
---
# Dashboard — ord
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ord-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“order or rank”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Arranging books neatly in a row on a shelf according to their category.</span>
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

The root **ord** means order or rank. It refers to regular sequence, row arrangement, or social rank. In English, this root forms words such as *order*, *ordinal*, *ordinary*, and *extraordinary*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: order or rank
> The root **ord** means order or rank. It refers to regular sequence, row arrangement, or social rank. In English, this root forms words such as *order*, *ordinal*, *ordinary*, and *extraordinary*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Order or rank</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Arranging books neatly in a row on a shelf according to their category.</mark>
> - **Everyday Connection**: Think of familiar words like *order* and *ordinal*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ord** comes from a Latin word that means *"order or rank"*.
  - At its core, it describes order or rank.

- **The Big Picture Idea**:
  - Picture arranging books neatly in a row on a shelf according to their category.
  - Whenever you see **ord** in an English word, think of **order, sequence, and arrangement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of order or rank.
  - **Mental & Social**: How people experience, organize, or communicate about order or rank.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Order**: The arrangement or disposition of people or things in relation to each other according to a sequence or method.
  - **Ordinal**: Relating to an order or series.
  - **Ordinary**: With no special or distinctive features.
  - **Extraordinary**: Very unusual or remarkable.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ord</mark>, think of <mark class="hl-def">order, sequence, and arrangement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **ord** generates vocabulary through diverse prefix compounding, verbal inflection, and suffixation:
> - **Base Noun & Verbs:**
>   - *ōrdō* $	o$ Old French *ordre* $	o$ *order*, *orderly*.
>   - *ōrdināre* $	o$ *ordain*, *ordinand*, *ordination* ("to appoint into holy orders or legal status").
>   - *ōrdinārius* $	o$ *ordinary*, *ordinarily* ("customary, conforming to common order").
> - **Prefix Modifications:**
>   - *con-* ("together") + *ōrdināre* $	o$ *coordinate*, *coordination*, *coordinator* ("bringing separate elements into harmonious cooperation").
>   - *sub-* ("under") + *ōrdināre* $	o$ *subordinate*, *subordination* ("ranking beneath in authority or priority").
>   - *in-* ("not") + *sub-* + *ordinātus* $	o$ *insubordinate*, *insubordination* ("refusing to submit to authority").
>   - *in-* ("not, un-") + *ōrdinātus* $	o$ *inordinate*, *inordinately* ("exceeding reasonable limits; unrestrained").
>   - *extra-* ("outside") + *ōrdinārius* $	o$ *extraordinary*, *extraordinarily* ("beyond the usual order").
>   - *prae-* ("before") + *ōrdināre* $	o$ *preordain*, *preordained* ("determined beforehand by fate or providence").
>   - *dis-* ("apart, reversal") + *order* $	o$ *disorder* ("lack of order; systemic breakdown").

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
> - **Mathematics, Sequencing & Systems:** *order*, *ordinal*, *coordinate*, *coordination* (numbered positions, Cartesian grid systems).
> - **Military, Governance & Hierarchy:** *subordinate*, *insubordinate*, *ordinance* (chain of command, municipal decrees).
> - **Religion & Ecclesiastical Consecration:** *ordain*, *ordination*, *preordained* (entering holy orders, divine predestination).
> - **Excess & Restraint:** *inordinate*, *extraordinary* (immoderate desire, remarkable brilliance exceeding common bounds).
> - **Medicine & Psychology:** *disorder* (pathological disturbance of physical or mental function).

---

## 🔀 4. Prefix & Combining Dynamics on ord

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `co-` / `con-` (together) | `ordināre` | **[[coordinate]]** / **coordination** | Bringing disparate parts into synchronized, harmonious operation. |
| `sub-` (under) | `ordināre` | **[[subordinate]]** / **subordination** | Placing in a lower rank, status, or dependency. |
| `in-` + `sub-` (un-under) | `ordinātus` | **[[insubordinate]]** / **insubordination** | Defying the established chain of command or lawful superior. |
| `in-` (privative not) | `ordinātus` | **[[inordinate]]** / **inordinately** | Not kept within proper bounds $	o$ excessive, immoderate. |
| `extra-` (outside) | `ordinārius` | **[[extraordinary]]** | Going far beyond the ordinary, typical, or customary course. |
| `prae-` (before) | `ordināre` | **preordained** | Decreed or destined by supreme authority prior to the event. |
| `dis-` (reversal) | `order` | **[[disorder]]** | Rupturing harmony and arrangement into chaos or systemic illness. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📐 **Mathematics & Cartography** | *coordinate*, *ordinal* | Cartesian $(x, y, z)$ coordinates, ordinal numbers (1st, 2nd, 3rd) indicating ranking. |
| 🏛️ **Municipal Law & Governance** | *ordinance*, *order* | City councils enacting local noise and zoning ordinances. |
| 🪖 **Military Science & Management** | *subordinate*, *insubordinate*, *orderly* | Enforcing command hierarchy and prosecuting court-martial insubordination. |
| 🏥 **Psychiatry & Internal Medicine** | *disorder* | Diagnosing bipolar affective disorder, metabolic metabolic disorders. |
| ⛪ **Theology & Canon Law** | *ordain*, *preordained*, *ordination* | Consecrating bishops into holy orders, Calvinist doctrines of preordained election. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bipolar disorder]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ord within the domain of Order.<br>**2.** A technical or specialized form exhibiting the properties of ord in systematic terminology. | *"In academic literature, bipolar disorder designates pertaining to, derived from, or characteristic of latin ord within the domain of order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coordinate]] | noun | **1.** A number that identifies a position relative to an axis.<br>**2.** Bring order and organization to. | *"This applies to all: compute, coordinate and commit resources to implement our new orders."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[coordinated]] | verb | **1.** Bring order and organization to.<br>**2.** Bring into common action, movement, or condition. | *"I am fervently praying that further intensification of effort, sustained, coordinated, consecrated and unanimously exerted, will sweep its members on crest of the wave to total victory."* — Effendi Shoghi, *Citadel of Faith* |
| [[coordinately]] | adverb | **1.** In a coordinated manner. | *"In academic literature, coordinately designates in a coordinated manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coordinating]] | verb | **1.** Bring order and organization to.<br>**2.** Bring into common action, movement, or condition. | *"Very heavily he moved, muscle-bound a good deal, Shane thought; a man for pushing and crushing and resisting, but not for fast, nervous work, sinew and brain coordinating like the crack of a whip."* — Donn Byrne, *The Wind Bloweth* |
| [[coordination]] | noun | **1.** The skillful and effective interaction of movements.<br>**2.** The regulation of diverse elements into an integrated and harmonious operation. | *"I initiated the Purchase Requests, got coordination on technical accuracy of procurement data from the parachute engineers and Maintenance technical services."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[coordinative]] | adjective | **1.** Serving to connect two grammatical constituents of identical construction. | *"In academic literature, coordinative designates serving to connect two grammatical constituents of identical construction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coordinator]] | noun | **1.** Someone whose task is to see that work goes harmoniously. | *"In academic literature, coordinator designates someone whose task is to see that work goes harmoniously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disorder]] | noun | **1.** A physical condition in which there is a disturbance of normal functioning.<br>**2.** A condition in which things are not in their expected places. | *"Away, boy, from the troops, and save thyself; For friends kill friends, and the disorder’s such As war were hoodwink’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disordered]] | verb | **1.** Disturb in mind or make uneasy or cause to be worried or alarmed.<br>**2.** Bring disorder to. | *"His speech was like a tangled chain; nothing impaired, but all disordered."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disorderliness]] | noun | **1.** A condition in which things are not in their expected places.<br>**2.** Rowdy behavior. | *"There are some enterprises in which a careful disorderliness is the true method."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[disorderly]] | adjective | **1.** Undisciplined and unruly.<br>**2.** In utter disorder. | *"If I know how or which way to order these affairs Thus disorderly thrust into my hands, Never believe me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[exordium]] | noun | **1.** (rhetoric) the introductory section of an oration or discourse. | *"While this exordium is in hand—and it takes some time—Mr."* — Charles Dickens, *Bleak House* |
| [[extraordinaire]] | adjective | **1.** Extraordinary in a particular capacity. | *"In academic literature, extraordinaire designates extraordinary in a particular capacity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extraordinarily]] | adverb | **1.** Extremely. | *"But look you pray, all you that kiss my lady Peace at home, that our armies join not in a hot day; for, by the Lord, I take but two shirts out with me, and I mean not to sweat extraordinarily."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[extraordinariness]] | noun | **1.** The quality of being extraordinary and not commonly encountered. | *"In academic literature, extraordinariness designates the quality of being extraordinary and not commonly encountered."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extraordinary]] | adjective | **1.** Beyond what is ordinary or usual; highly unusual or exceptional or remarkable.<br>**2.** Far more than usual or expected. | *"Unless you could teach me to forget a banished father, you must not learn me how to remember any extraordinary pleasure."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[incoordination]] | noun | **1.** A lack of coordination of movements. | *"In academic literature, incoordination designates a lack of coordination of movements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inordinate]] | adjective | **1.** Beyond normal limits. | *"Every inordinate cup is unbless’d, and the ingredient is a devil."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inordinately]] | adverb | **1.** Extremely. | *"They do not manufacture sugar from it, but simply chew the cane, of which they are inordinately fond."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[inordinateness]] | noun | **1.** Immoderation as a consequence of going beyond sufficient or permitted limits. | *"In academic literature, inordinateness designates immoderation as a consequence of going beyond sufficient or permitted limits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insubordinate]] | adjective | **1.** Not submissive to authority.<br>**2.** Disposed to or engaged in defiance of established authority. | *"Instead of being a ruler in the Province of Body, in which Mortal Man was reported to reside, Nerve was an insubordinate citizen, putting in false 438:12 claims to office and bearing false witness against Man."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[insubordination]] | noun | **1.** Defiance of authority.<br>**2.** An insubordinate act. | *"She says she won’t!” Nibs exclaimed, aghast at such insubordination, whereupon Peter went sternly toward the young lady’s chamber."* — J. M. Barrie, *Peter Pan* |
| [[ordain]] | verb | **1.** Order by virtue of superior authority; decree.<br>**2.** Appoint to a clerical posts. | *"Say then to Cæsar, Our ancestor was that Mulmutius which Ordain’d our laws, whose use the sword of Cæsar Hath too much mangled; whose repair and franchise Shall, by the power we hold, be our good deed, Though Rome be therefore angry."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ordained]] | verb | **1.** Order by virtue of superior authority; decree.<br>**2.** Appoint to a clerical posts. | *"A holy maid hither with me I bring, Which, by a vision sent to her from heaven Ordained is to raise this tedious siege And drive the English forth the bounds of France."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ordainer]] | noun | **1.** A cleric who ordains; a cleric who admits someone to holy orders. | *"In academic literature, ordainer designates a cleric who ordains; a cleric who admits someone to holy orders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ordeal]] | noun | **1.** A severe or trying experience.<br>**2.** A primitive method of determining a person's guilt or innocence by subjecting the accused person to dangerous or painful tests believed to be under divine control; escape was usually taken as a sign of innocence. | *"But it is full of indignation to-night after undergoing the ordeal of consigning to the tomb the remains of a faithful, a zealous, a devoted adherent.” Sir Leicester’s voice trembles and his grey hair stirs upon his head."* — Charles Dickens, *Bleak House* |
| [[order]] | noun | **1.** (often plural) a command given by a superior (e.g., a military or law enforcement officer) that must be obeyed.<br>**2.** A degree in a continuum of size or quantity. | *"I have writ my letters, casketed my treasure, Given order for our horses; and tonight, When I should take possession of the bride, End ere I do begin."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[order-chenopodiales]] | noun | **1.** Corresponds approximately to the older group centrospermae. | *"In academic literature, order-chenopodiales designates corresponds approximately to the older group centrospermae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ordered]] | verb | **1.** Give instructions to or direct somebody to do something with authority.<br>**2.** Make a request for something. | *"All this was ordered by the good discretion Of the right reverend Cardinal of York."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[orderer]] | noun | **1.** Someone who places an order to buy.<br>**2.** An organizer who puts things in order. | *"In academic literature, orderer designates someone who places an order to buy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ordering]] | noun | **1.** Logical or comprehensible arrangement of separate elements.<br>**2.** The act of putting things in a sequential arrangement. | *"Have thou the ordering of this present time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[orderliness]] | noun | **1.** The quality of appreciating method and system.<br>**2.** A condition of regular or proper arrangement. | *"I do not know how it is,” said he; “but we seem to want some of your nice ways and orderliness at my father’s."* — Jane Austen, *Mansfield Park* |
| [[orderly]] | noun | **1.** A soldier who serves as an attendant to a superior officer.<br>**2.** A male hospital attendant who has general duties that do not involve the medical treatment of patients. | *"But orderly to end where I begun, Our wills and fates do so contrary run That our devices still are overthrown."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ordinal]] | noun | **1.** The number designating place in an ordered sequence.<br>**2.** Of or relating to a taxonomic order. | *"In academic literature, ordinal designates the number designating place in an ordered sequence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ordinance]] | noun | **1.** An authoritative rule.<br>**2.** A statute enacted by a city government. | *"Let ordinance Come as the gods foresay it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ordinand]] | noun | **1.** A person being ordained. | *"In academic literature, ordinand designates a person being ordained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ordinarily]] | adverb | **1.** Under normal conditions. | *"But Bathsheba, though she could feel, was not much given to futile dreaming, and her musings under this head were short and entirely confined to the times when Troy’s neglect was more than ordinarily evident."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ordinariness]] | noun | **1.** The quality of being commonplace and ordinary. | *"Her face had latterly changed with changing states of mind, continually fluctuating between beauty and ordinariness, according as the thoughts were gay or grave."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ordinary]] | noun | **1.** A judge of a probate court.<br>**2.** The expected or commonplace condition or situation. | *"Our courteous Antony, Whom ne’er the word of “No” woman heard speak, Being barbered ten times o’er, goes to the feast, And, for his ordinary, pays his heart For what his eyes eat only."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ordinate]] | noun | **1.** The value of a coordinate on the vertical axis.<br>**2.** Appoint to a clerical posts. | *"When expressed with some amount of reflectiveness it seems co-ordinate with a belief that this flattery must be reasonable to be effective."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[ordination]] | noun | **1.** The status of being ordained to a sacred office.<br>**2.** Logical or comprehensible arrangement of separate elements. | *"The University as a step to anything but ordination seemed, to this man of fixed ideas, a preface without a volume."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ordnance]] | noun | **1.** Military supplies.<br>**2.** Large but transportable armament. | *"It then draws near the season Wherein the spirit held his wont to walk. [_A flourish of trumpets, and ordnance shot off within._] What does this mean, my lord?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ordovician]] | noun | **1.** From 500 million to 425 million years ago; conodonts and ostracods and algae and seaweeds. | *"In academic literature, ordovician designates from 500 million to 425 million years ago; conodonts and ostracods and algae and seaweeds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ordure]] | noun | **1.** Solid excretory product evacuated from the bowels. | *"From Walls besmear'd with stinking Ordure, By Swine who nee'r provide Bumfodder _Libera Nos_---- (Pt. 4, p. 7) Other types of graffiti, however, vary from the very earnest expression of affection to the nonexcrementally satiric."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[preordain]] | verb | **1.** Foreordain or determine beforehand. | *"They may return and settle again to execute their preordained faculties, but they are now in a most extravagant vagary."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preordained]] | verb | **1.** Foreordain or determine beforehand. | *"They may return and settle again to execute their preordained faculties, but they are now in a most extravagant vagary."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[preordination]] | noun | **1.** (theology) being determined in advance; especially the doctrine (usually associated with calvin) that god has foreordained every event throughout eternity (including the final salvation of mankind). | *"In academic literature, preordination designates (theology) being determined in advance; especially the doctrine (usually associated with calvin) that god has foreordained every event throughout eternity (including the final salvation of mankind)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reorder]] | noun | **1.** A repeated order for the same merchandise.<br>**2.** Assign a new order to. | *"In academic literature, reorder designates a repeated order for the same merchandise."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reordering]] | noun | **1.** A rearrangement in a different order.<br>**2.** Assign a new order to. | *"In academic literature, reordering designates a rearrangement in a different order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suborder]] | noun | **1.** (biology) taxonomic group that is a subdivision of an order. | *"In academic literature, suborder designates (biology) taxonomic group that is a subdivision of an order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subordinate]] | noun | **1.** An assistant subject to the authority or control of another.<br>**2.** A word that is more specific than a given word. | *"Workers subordinate in early societies. § 2."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[subordinateness]] | noun | **1.** Secondary importance. | *"In academic literature, subordinateness designates secondary importance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subordinating]] | verb | **1.** Rank or order as less important or consider of less value.<br>**2.** Make subordinate, dependent, or subservient. | *"In academic literature, subordinating designates rank or order as less important or consider of less value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subordination]] | noun | **1.** The state of being subordinate to something.<br>**2.** The semantic relation of being subordinate or belonging to a lower rank or class. | *"He created the earth that it might be inhabited by man, and He governs the earth in subordination to the interests, the eternal and spiritual welfare of the race of immortal beings that are here being prepared for glory and immortality."* — Classic Author, *The wonders of prayer* |
| [[subordinative]] | adjective | **1.** Serving to connect a subordinate clause to a main clause. | *"In academic literature, subordinative designates serving to connect a subordinate clause to a main clause."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superorder]] | noun | **1.** (biology) a taxonomic group ranking above an order and below a class or subclass. | *"In academic literature, superorder designates (biology) a taxonomic group ranking above an order and below a class or subclass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superordinate]] | noun | **1.** One of greater rank or station or quality.<br>**2.** A word that is more generic than a given word. | *"In academic literature, superordinate designates one of greater rank or station or quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superordination]] | noun | **1.** The semantic relation of being superordinate or belonging to a higher rank or class. | *"In academic literature, superordination designates the semantic relation of being superordinate or belonging to a higher rank or class."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncoordinated]] | adjective | **1.** Lacking in cooperative planning and organization.<br>**2.** Lacking the skillful and effective interaction of muscle movements. | *"In academic literature, uncoordinated designates lacking in cooperative planning and organization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unordered]] | adjective | **1.** Not arranged in order.<br>**2.** Not arranged in order hierarchically. | *"In academic literature, unordered designates not arranged in order."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Order]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ORD
  </div>
</div>
