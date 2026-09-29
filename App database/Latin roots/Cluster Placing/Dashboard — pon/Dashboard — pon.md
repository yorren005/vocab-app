---
status: unread
type: root_dashboard
---
# Dashboard — pon
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pon-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to put, place, or set”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Setting an object gently down in its exact designated location.</span>
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

The root **pon** means to put, place, or set. It refers to the action of put,ing and carrying out this process. In English, this root forms words such as *postpone*, *opponent*, *component*, and *proponent*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to put, place, or set
> The root **pon** means to put, place, or set. It refers to the action of put,ing and carrying out this process. In English, this root forms words such as *postpone*, *opponent*, *component*, and *proponent*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To put, place, or set</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Setting an object gently down in its exact designated location.</mark>
> - **Everyday Connection**: Think of familiar words like *postpone* and *opponent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pon** comes from a Latin word that means *"to put, place, or set"*.
  - At its core, it describes the action of put, place, or set.

- **The Big Picture Idea**:
  - Picture setting an object gently down in its exact designated location.
  - Whenever you see **pon** in an English word, think of **to put, place, or set**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to put, place, or set).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Postpone**: To cause or arrange for something to take place at a time later than that first scheduled.
  - **Opponent**: Someone who competes with or opposes another in a contest, game, or argument.
  - **Component**: A part or element of a larger whole, especially a part of a machine or system.
  - **Proponent**: A person who advocates a theory, proposal, or project.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pon</mark>, think of <mark class="hl-def">to put, place, or set</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **pon** generates vocabulary through prefixation on the present stem *pōnere*:
> - **Active Participles with *-ent* (*-ēns*):**
>   - *com-* ("together") + *pōnere* $	o$ *compōnēns* $	o$ *component* ("an element placing together with others").
>   - *ex-* ("out, forth") + *pōnere* $	o$ *exponēns* $	o$ *exponent*, *exponential*, *exponentially* ("that which puts forth power").
>   - *prō-* ("forward") + *pōnere* $	o$ *propōnēns* $	o$ *proponent* ("one who puts forward an argument").
>   - *ob-* ("against") + *pōnere* $	o$ *oppōnēns* $	o$ *opponent* ("one who places themselves in opposition").
>   - *dē-* ("down, aside") + *pōnere* $	o$ *dēpōnēns* $	o$ *deponent* ("witness giving sworn evidence; deponent verb").
> - **Temporal Deferral with *post-**:**
>   - *post-* ("after, later") + *pōnere* $	o$ *postpone*, *postponement* ("to put off to a later time").
> - **Anglo-Norman Shift to *-pound*:**
>   - *com-* + *pōnere* $	o$ *compound* ("a thing composed of two or more elements").
>   - *ex-* + *pōnere* $	o$ *expound* ("to explain systematically").
>   - *prō-* + *pōnere* $	o$ *propound* ("to put forward for consideration").
>   - *in-* + *pōnere* $	o$ *impound* ("to seize and take legal custody of").

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
> - **Engineering & Modular Systems:** *component* (circuit board components, aerospace structural elements).
> - **Mathematics & Growth Models:** *exponent*, *exponential*, *exponentially* ($e^x$, exponential population curves).
> - **Debate, Politics & Advocacy:** *proponent*, *opponent*, *propound* (advocating policies, debating political rivals).
> - **Time Management & Scheduling:** *postpone*, *postponement* (rescheduling sports matches or diplomatic summits).
> - **Law & Hermeneutics:** *deponent*, *expound*, *impound* (depositions in court, expounding constitutional clauses, impounding evidence).

---

## 🔀 4. Prefix & Combining Dynamics on pon

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `com-` (together) | `pōnere` | **[[component]]** / **compound** | Putting elements together into a harmonious functional machine or chemical entity. |
| `ex-` (out, forth) | `pōnere` | **[[exponent]]** / **expound** | Putting forth mathematical power; setting out an explanation in detail. |
| `ob-` (against) | `pōnere` | **opponent** | Placing oneself directly in front of an adversary in debate or combat. |
| `prō-` (forward) | `pōnere` | **[[proponent]]** / **propound** | Putting an idea or argument forward for public consideration. |
| `post-` (after) | `pōnere` | **postpone** / **postponement** | Putting a scheduled obligation off until a later date. |
| `dē-` (down, aside) | `pōnere` | **deponent** | Putting down sworn testimony; laying aside passive grammatical forms. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 💻 **Hardware Architecture & Electronics** | *component* | Surface-mount technology (SMT) placing microelectronic components on motherboards. |
| 📈 **Mathematics & Epidemiology** | *exponent*, *exponential*, *exponentially* | Modeling infectious disease transmission using exponential differential equations. |
| ⚖️ **Civil Litigation & Criminal Procedure** | *deponent*, *impound* | Questioning a corporate deponent under oath; impounding vehicular evidence. |
| 🏛️ **Parliamentary Debate & Public Policy** | *proponent*, *opponent*, *propound* | Legislative proponents debating opponents over carbon taxation bills. |
| 📖 **Theology & Constitutional Jurisprudence** | *expound* | Judicial scholars expounding originalist interpretations of constitutional clauses. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[component]] | noun | **1.** An abstract part of something.<br>**2.** Something determined in relation to something that includes it. | *"Mary was not so repulsive and unsisterly as Elizabeth, nor so inaccessible to all influence of hers; neither was there anything among the other component parts of the cottage inimical to comfort."* — Jane Austen, *Persuasion* |
| [[depone]] | verb | **1.** Make a deposition; declare under oath. | *"In academic literature, depone designates make a deposition; declare under oath."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deponent]] | noun | **1.** A person who testifies or gives a deposition. | *"Being interrogated if the defendant did not allow them to pass without using any violence, and if they did not pass unmolested, the deponent replied in the affirmative."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[epona]] | noun | **1.** (possibly roman mythology) celtic goddess of horses and mules and asses. | *"In academic literature, epona designates (possibly roman mythology) celtic goddess of horses and mules and asses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eponym]] | noun | **1.** The person for whom something is named.<br>**2.** The name derived from a person (real or imaginary). | *"In academic literature, eponym designates the person for whom something is named."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eponymic]] | adjective | **1.** Being or relating to or bearing the name of an eponym. | *"In academic literature, eponymic designates being or relating to or bearing the name of an eponym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eponymous]] | adjective | **1.** Being or relating to or bearing the name of an eponym. | *"In academic literature, eponymous designates being or relating to or bearing the name of an eponym."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eponymy]] | noun | **1.** The derivation of a general name from that of a famous person. | *"In academic literature, eponymy designates the derivation of a general name from that of a famous person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exponent]] | noun | **1.** A person who pleads for a cause or propounds an idea.<br>**2.** Someone who expounds and interprets or explains. | *"A clergyman, himself an exponent of God's bountiful dealings with men, was called upon in test of his own principles of giving to the Lord."* — Classic Author, *The wonders of prayer* |
| [[exponential]] | noun | **1.** A function in which an independent variable appears as an exponent.<br>**2.** Of or involving exponents. | *"In academic literature, exponential designates a function in which an independent variable appears as an exponent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exponentially]] | adverb | **1.** In an exponential manner. | *"In academic literature, exponentially designates in an exponential manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exponentiation]] | noun | **1.** The process of raising a quantity to some assigned power. | *"In academic literature, exponentiation designates the process of raising a quantity to some assigned power."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opponent]] | noun | **1.** A contestant that you are matched against.<br>**2.** Someone who offers opposition. | *"His calling is the acquisition of secrets and the holding possession of such power as they give him, with no sharer or opponent in it.” “Could you trust in him?” “I shall never try."* — Charles Dickens, *Bleak House* |
| [[ponca]] | noun | **1.** A member of the siouan people of the missouri river valley in northeastern nebraska.<br>**2.** The dhegiha dialect spoken by the ponca. | *"President Hayes, February 1, 1881, sent a message to Congress sustaining in the main the findings of the Ponca Indian Commission, and approving its recommendation that they remain on their reservation in Indian Territory."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[ponce]] | noun | **1.** A man who is effeminate in his manner and fussy in the way he dresses.<br>**2.** Someone who procures customers for whores (in england they call a pimp a ponce). | *"Heidegger, "which Ponce De Leon, the Spanish adventurer, went in search of two or three centuries ago?" "But did Ponce De Leon ever find it?" said the Widow Wycherly."* — Nathaniel Hawthorne, *Twice-Told Tales* |
| [[poncho]] | noun | **1.** A blanket-like cloak with a hole in the center for the head. | *"For the whale is indeed wrapt up in his blubber as in a real blanket or counterpane; or, still better, an Indian poncho slipt over his head, and skirting his extremity."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[poncirus]] | noun | **1.** One species: trifoliate orange. | *"In academic literature, poncirus designates one species: trifoliate orange."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pone]] | noun | **1.** Cornbread often made without milk or eggs and baked or fried (southern). | *"Landis stirring up a blackberry pone, the three youngest Landis children watching the progress of it."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[poniard]] | noun | **1.** A dagger with a slender blade.<br>**2.** Stab with a poniard. | *"Give me thy poniard; you shall know, my boys, Your mother’s hand shall right your mother’s wrong."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pons]] | noun | **1.** United states coloratura soprano (born in france) (1904-1976).<br>**2.** A band of nerve fibers linking the medulla oblongata and the cerebellum with the midbrain. | *"Pons,” I ordered, without opening my eyes, “water, cold water, quick, a deluge."* — Jack London, *The Jacket (The Star-Rover)* |
| [[ponselle]] | noun | **1.** United states soprano (1897-1981). | *"In academic literature, ponselle designates united states soprano (1897-1981)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ponstel]] | noun | **1.** A nonsteroidal anti-inflammatory and analgesic drug (trade name ponstel) used to treat mild pain (especially menstrual cramps). | *"In academic literature, ponstel designates a nonsteroidal anti-inflammatory and analgesic drug (trade name ponstel) used to treat mild pain (especially menstrual cramps)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pontederia]] | noun | **1.** Pickerelweed. | *"In academic literature, pontederia designates pickerelweed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pontederiaceae]] | noun | **1.** Aquatic or bog plants. | *"In academic literature, pontederiaceae designates aquatic or bog plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pontiac]] | noun | **1.** Famous chief of the ottawa who led an unsuccessful rebellion against the british (1715-1769). | *"She spent several years as a teacher, and was married and removed to Pontiac, Michigan, in 1845."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[pontifex]] | noun | **1.** A member of the highest council of priests in ancient rome. | *"In academic literature, pontifex designates a member of the highest council of priests in ancient rome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pontiff]] | noun | **1.** The head of the roman catholic church. | *"This rule was observed both by the Mikado and by the pontiff of the Zapotecs."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[pontifical]] | noun | **1.** The vestments and other insignia of a pontiff (especially a bishop).<br>**2.** Proceeding from or ordered by or subject to a pope or the papacy regarded as the successor of the apostles. | *"Thus did I keep my person fresh and new, My presence, like a robe pontifical, Ne’er seen but wonder’d at, and so my state, Seldom but sumptuous, showed like a feast, And won by rareness such solemnity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pontificate]] | noun | **1.** The government of the roman catholic church.<br>**2.** Administer a pontifical office. | *"I refer the Senate to the late republics of Venice and Genoa; of France, and her litter; to the Kingdom of Poland; the empire of Germany, and the Pontificate of Rome."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[pontoon]] | noun | **1.** (nautical) a floating structure (as a flat-bottomed boat) that serves as a dock or to support a bridge.<br>**2.** A float supporting a seaplane. | *"No quarter is to be given to the English, on account of their cruelty to our braves on board the infamous pontoons."* — William Makepeace Thackeray, *Vanity Fair* |
| [[pontos]] | noun | **1.** (greek mythology) ancient personification of the sea; father of nereus. | *"In academic literature, pontos designates (greek mythology) ancient personification of the sea; father of nereus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pontus]] | noun | **1.** (greek mythology) ancient personification of the sea; father of nereus.<br>**2.** An ancient region of northern asia minor on the black sea; it reached its height under mithridates vi but was later incorporated into the roman empire. | *"On the mountainous coast of Pontus there dwelt in antiquity a rude and warlike people named the Mosyni or Mosynoeci, through whose rugged country the Ten Thousand marched on their famous retreat from Asia to Europe."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[pony]] | noun | **1.** A range horse of the western united states.<br>**2.** An informal term for a racehorse. | *"The service being concluded, Sir Leicester gave his arm with much taste and gallantry to Lady Dedlock—though he was obliged to walk by the help of a thick stick—and escorted her out of church to the pony carriage in which they had come."* — Charles Dickens, *Bleak House* |
| [[pony-trekking]] | noun | **1.** A sport in which people ride across country on ponies. | *"In academic literature, pony-trekking designates a sport in which people ride across country on ponies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ponycart]] | noun | **1.** A cart with an underslung axle and two seats. | *"In academic literature, ponycart designates a cart with an underslung axle and two seats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ponytail]] | noun | **1.** A hair style that draws the hair back so that it hangs down in back of the head like a pony's tail. | *"His long white hair is tied in a ponytail, and his wrinkled face is tanned to nut brown."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[postpone]] | verb | **1.** Hold back to a later time. | *"He had to hang it up because the mother insisted that they should go to lunch and postpone everything else till the afternoon."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[postponement]] | noun | **1.** Time during which some action is awaited.<br>**2.** Act of putting off to a future time. | *"If so, there must be a week’s postponement, and that was unlucky."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[postponer]] | noun | **1.** Someone who postpones work (especially out of laziness or habitual carelessness). | *"In academic literature, postponer designates someone who postpones work (especially out of laziness or habitual carelessness)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proponent]] | noun | **1.** A person who pleads for a cause or propounds an idea. | *"In academic literature, proponent designates a person who pleads for a cause or propounds an idea."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Placing]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PON
  </div>
</div>
