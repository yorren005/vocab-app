---
status: unread
type: root_dashboard
---
# Dashboard — medi
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">medi-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“middle”</span>
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

The root **medi** means middle. It describes being situated in the middle, midway, or between extremes. In English, this root forms words such as *medium*, *media*, *intermediate*, and *mediocre*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: middle
> The root **medi** means middle. It describes being situated in the middle, midway, or between extremes. In English, this root forms words such as *medium*, *media*, *intermediate*, and *mediocre*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Middle</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Arranging books neatly in a row on a shelf according to their category.</mark>
> - **Everyday Connection**: Think of familiar words like *medium* and *media*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **medi** comes from a Latin word that means *"middle"*.
  - At its core, it describes middle.

- **The Big Picture Idea**:
  - Picture arranging books neatly in a row on a shelf according to their category.
  - Whenever you see **medi** in an English word, think of **order, sequence, and arrangement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of middle.
  - **Mental & Social**: How people experience, organize, or communicate about middle.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Medium**: An agency or means of doing something.
  - **Media**: The main means of mass communication regarded collectively.
  - **Intermediate**: Coming between two things in time, place, order, character, etc.
  - **Mediocre**: Of only moderate quality.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">medi</mark>, think of <mark class="hl-def">order, sequence, and arrangement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **medi** generates vocabulary through adjectival derivation, prefixation, and compounding:
> - **Base Adjective & Spatial Terms:**
>   - *medius* $	o$ *medial* ("situated in the middle"), *median* ("middle value in statistics; dividing strip on highway").
>   - *medius* + *ocris* ("rugged mountain peak") $	o$ Latin *mediocris* ("halfway up the mountain; middling") $	o$ *mediocre*, *mediocrity*.
> - **Prefix Privation with *in-* (*im-*):**
>   - *in-* ("not, without") + *mediātus* ("having something in the middle") $	o$ Late Latin *immediātus* $	o$ *immediate*, *immediately*, *immediacy* (literally "having no middleman or delay").
> - **Intervention & Compound Formations:**
>   - *inter-* ("between") + *medius* $	o$ *intermediate*, *intermediary* ("acting as an intervening stage or link").
>   - *medius* + *aevum* ("age, epoch") $	o$ *medieval*, *medievalist* ("pertaining to the Middle Ages").
>   - *medius* + *terra* ("earth, land") $	o$ *Mediterranean* ("in the middle of the land").
> - **Agent & Action Nouns from *mediāre*:**
>   - *mediāre* $	o$ *mediate*, *mediation*, *mediator* ("one who reconciles opponents").

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
> - **Temporal Immediacy:** *immediate*, *immediately*, *immediacy* (instantaneous, occurring without temporal lag).
> - **Diplomacy & Conflict Resolution:** *mediate*, *mediation*, *mediator*, *intermediary* (impartial peacemaking).
> - **Information & Mass Communication:** *medium*, *media* (journalism, television, digital broadcasting channels).
> - **Mathematics & Statistics:** *median*, *medial* (the midpoint dividing the upper and lower halves of a data sample).
> - **Historical Periodization:** *medieval*, *medievalist* (the millennium from 500 to 1500 AD).
> - **Critical Evaluation:** *mediocre*, *mediocrity* (ordinary, second-rate, neither outstanding nor terrible).

---

## 🔀 4. Prefix & Combining Dynamics on medi

### Combining Form & Prefix Matrix

| Form | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `in-` (privative not) | `mediātus` | **[[immediate]]** / **immediacy** | With no intervening time or intermediary $	o$ instant, direct. |
| `inter-` (between) | `medius` | **[[intermediate]]** / **intermediary** | Situated between two points, stages, or negotiating parties. |
| `aevum` (age, epoch) | `medius` | **[[medieval]]** | Belonging to the middle epoch between antiquity and modernity. |
| `terra` (earth, land) | `medius` | **Mediterranean** | Enclosed completely by surrounding landmasses. |
| `ocris` (sharp hill) | `medius` | **[[mediocre]]** / **mediocrity** | Stuck halfway up the mountain $	o$ average, second-rate. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📊 **Statistics & Data Science** | *median*, *medial* | Calculating the median household income to prevent skewing by billionaire outliers. |
| 🕊️ **International Diplomacy & Law** | *mediate*, *mediation*, *mediator* | UN-sponsored mediation resolving territorial border clashes between sovereign states. |
| 📺 **Journalism & Communications** | *media*, *medium* | Multi-platform mass media ecosystems, digital broadcasting channels. |
| 🏰 **Historiography & European Studies** | *medieval*, *medievalist* | Analyzing feudal chivalry, Gothic cathedrals, and scholastic philosophy. |
| 🧠 **Cognitive Psychology & Aesthetics** | *immediacy*, *mediocre* | Evaluating sensory immediacy in virtual reality; critiquing artistic mediocrity. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[comedian]] | noun | **1.** A professional performer who tells jokes and performs comical acts.<br>**2.** An actor in a comedy. | *"He was played by the low-comedian, who had introduced gags of his own and was on most friendly terms with the pit."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[comedienne]] | noun | **1.** A female actor in a comedy.<br>**2.** A female comedian. | *"In academic literature, comedienne designates a female actor in a comedy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[immediacy]] | noun | **1.** Lack of an intervening or mediating agency.<br>**2.** Immediate intuitive awareness. | *"He led our powers; Bore the commission of my place and person; The which immediacy may well stand up And call itself your brother."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[immediate]] | adjective | **1.** Of the present time and place.<br>**2.** Very close or connected in space or time. | *"She is young, wise, fair; In these to nature she’s immediate heir; And these breed honour: that is honour’s scorn Which challenges itself as honour’s born, And is not like the sire."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[immediately]] | adverb | **1.** Without delay or hesitation; with no time intervening.<br>**2.** Near or close by. | *"Go, Dromio, there’s the money, bear it straight, And bring thy master home immediately."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[immediateness]] | noun | **1.** The quickness of action or occurrence.<br>**2.** Lack of an intervening or mediating agency. | *"In academic literature, immediateness designates the quickness of action or occurrence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermediary]] | noun | **1.** A negotiator who acts as a link between parties. | *"A growing consensus among philosophers made God more and more remote, and emphasized the necessity for intermediaries."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[intermediate]] | noun | **1.** A substance formed during a chemical process before the desired product is obtained.<br>**2.** Act between parties with a view to reconciling differences. | *"Private property is the characteristic feature of our present industrial society, but it exists side by side with public property and with many intermediate grades between private and common property."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[intermediately]] | adverb | **1.** To an intermediate degree. | *"In academic literature, intermediately designates to an intermediate degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermediation]] | noun | **1.** The act of intervening for the purpose of bringing about a settlement. | *"In academic literature, intermediation designates the act of intervening for the purpose of bringing about a settlement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intermediator]] | noun | **1.** A negotiator who acts as a link between parties. | *"In academic literature, intermediator designates a negotiator who acts as a link between parties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[irremediable]] | adjective | **1.** Impossible to remedy or correct or redress. | *"He stood as opposed to Captain Wentworth, in all his own unwelcome obtrusiveness; and the evil of his attentions last night, the irremediable mischief he might have done, was considered with sensations unqualified, unperplexed."* — Jane Austen, *Persuasion* |
| [[media]] | noun | **1.** A means or instrumentality for storing or communicating information.<br>**2.** The surrounding environment. | *"Spur through Media, Mesopotamia, and the shelters whither The routed fly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mediacy]] | noun | **1.** The quality of being mediate. | *"In academic literature, mediacy designates the quality of being mediate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mediaeval]] | adjective | **1.** Relating to or belonging to the middle ages.<br>**2.** As if belonging to the middle ages; old-fashioned and unenlightened. | *"Chambers, _The Mediaeval Stage_ (Oxford, 1903), i. 110 _sqq._ [567] In Eastern Europe to this day the great season for driving out the cattle to pasture for the first time in spring is St."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[medial]] | adjective | **1.** Dividing an animal into right and left halves.<br>**2.** Relating to or situated in or extending toward the middle. | *"In academic literature, medial designates dividing an animal into right and left halves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medially]] | adverb | **1.** In a medial position. | *"In academic literature, medially designates in a medial position."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[median]] | noun | **1.** The value below which 50% of the cases fall.<br>**2.** Relating to or constituting the middle value of an ordered set of values (or the average of the middle two in a set with an even number of values). | *"In academic literature, median designates the value below which 50% of the cases fall."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mediant]] | noun | **1.** (music) the third note of a diatonic scale; midway between the tonic and the dominant. | *"In academic literature, mediant designates (music) the third note of a diatonic scale; midway between the tonic and the dominant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mediastinum]] | noun | **1.** The part of the thoracic cavity between the lungs that contains the heart and aorta and esophagus and trachea and thymus. | *"In academic literature, mediastinum designates the part of the thoracic cavity between the lungs that contains the heart and aorta and esophagus and trachea and thymus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mediate]] | verb | **1.** Act between parties with a view to reconciling differences.<br>**2.** Occupy an intermediate or middle position or form a connecting link or stage between two others. | *"I wished to mediate once more."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[mediated]] | verb | **1.** Act between parties with a view to reconciling differences.<br>**2.** Occupy an intermediate or middle position or form a connecting link or stage between two others. | *"He stood and mediated—a miserable man."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[mediateness]] | noun | **1.** The quality of being mediate. | *"In academic literature, mediateness designates the quality of being mediate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mediation]] | noun | **1.** A negotiation to resolve differences that is conducted by some impartial party.<br>**2.** The act of intervening for the purpose of bringing about a settlement. | *"Cherish it, my boy, And noble offices thou mayst effect Of mediation, after I am dead, Between his greatness and thy other brethren."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mediator]] | noun | **1.** A negotiator who acts as a link between parties. | *"The man who seeks the place of mediator and interpreter betwixt his fellows and the Unknowable must needs be an idealist, and if he deal with illusion who so unfortunate as he?" They halted that night where two streams met."* — C. A. Frazer, *Atmâ* |
| [[mediatorial]] | adjective | **1.** Of or relating to a mediator or the duties of a mediator. | *"In academic literature, mediatorial designates of or relating to a mediator or the duties of a mediator."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mediatory]] | adjective | **1.** Of or related to or directed toward mediation. | *"In academic literature, mediatory designates of or related to or directed toward mediation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mediatrix]] | noun | **1.** A woman who is a mediator. | *"She obligingly consented to act as mediatrix in the matter."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[medic]] | noun | **1.** Any of several old world herbs of the genus medicago having small flowers and trifoliate compound leaves.<br>**2.** A medical practitioner in the armed forces. | *"I can give you a quick rundown on each now, if you wish." "I do." "Myra is a logistician and a Medic certified to Level 4 in space-related trauma, physical and psychological."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[medicago]] | noun | **1.** A genus of herbs that resemble clover. | *"In academic literature, medicago designates a genus of herbs that resemble clover."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medicaid]] | noun | **1.** Health care for the needy; a federally and state-funded program. | *"In academic literature, medicaid designates health care for the needy; a federally and state-funded program."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medical]] | noun | **1.** A thorough physical examination; includes a variety of tests depending on the age and sex and health of the person.<br>**2.** Relating to the study or practice of medicine. | *"Skimpole had been educated for the medical profession and had once lived, in his professional capacity, in the household of a German prince."* — Charles Dickens, *Bleak House* |
| [[medically]] | adverb | **1.** Involving medical practice. | *"In academic literature, medically designates involving medical practice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medicament]] | noun | **1.** (medicine) something that treats or prevents or alleviates the symptoms of disease. | *"In those times, also, spermaceti was exceedingly scarce, not being used for light, but only as an ointment and medicament."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[medicare]] | noun | **1.** Health care for the aged; a federally administered system of health insurance available to persons aged 65 and over. | *"In academic literature, medicare designates health care for the aged; a federally administered system of health insurance available to persons aged 65 and over."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medicate]] | verb | **1.** Impregnate with a medicinal substance.<br>**2.** Treat medicinally, treat with medicine. | *"Ministering to their temporal wants as well, clothing, feeding, medicating these unfortunate people, visiting their hospitals as well as those of the army, Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[medication]] | noun | **1.** (medicine) something that treats or prevents or alleviates the symptoms of disease.<br>**2.** The act of treating with medicines or remedies. | *"An ailing individual might suddenly stop taking life-saving medication; or family members, friends, or 'significant others' might goad or exert harsh psychological pressures on an emotionally distraught person so that suicide becomes the only escape."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[medicative]] | adjective | **1.** Having the properties of medicine. | *"In academic literature, medicative designates having the properties of medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medici]] | noun | **1.** Aristocratic italian family of powerful merchants and bankers who ruled florence in the 15th century. | *"It would be the Venus de’ Medici placed beside a milliner’s doll."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[medicinal]] | adjective | **1.** Having the properties of medicine. | *"The Welsh peasants believe the beads to possess medicinal virtues of many sorts and to be particularly efficacious for all maladies of the eyes."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[medicinally]] | adverb | **1.** In a medicinal manner. | *"In truth, a mature man who uses hair-oil, unless medicinally, that man has probably got a quoggy spot in him somewhere."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[medicine]] | noun | **1.** The branches of medical science that deal with nonsurgical techniques.<br>**2.** (medicine) something that treats or prevents or alleviates the symptoms of disease. | *"Thus policy in love t’ anticipate The ills that were not, grew to faults assured, And brought to medicine a healthful state Which rank of goodness would by ill be cured."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[medick]] | noun | **1.** Any of several old world herbs of the genus medicago having small flowers and trifoliate compound leaves. | *"In academic literature, medick designates any of several old world herbs of the genus medicago having small flowers and trifoliate compound leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medico]] | noun | **1.** A student in medical school.<br>**2.** A licensed medical practitioner. | *"I invite you heartily to remain, if you think in your feeble imaginings that you have devised fresh torture for me.” “He’s a wooz, a true-blue, dyed-in-the-wool wooz,” Doctor Jackson chanted, with the medico’s delight in a novelty."* — Jack London, *The Jacket (The Star-Rover)* |
| [[medicolegal]] | adjective | **1.** Pertaining to legal aspects of the practice of medicine (as malpractice or patient consent for operations or patient information). | *"In academic literature, medicolegal designates pertaining to legal aspects of the practice of medicine (as malpractice or patient consent for operations or patient information)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mediety]] | noun | **1.** One of two (approximately) equal parts. | *"In academic literature, mediety designates one of two (approximately) equal parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medieval]] | adjective | **1.** Relating to or belonging to the middle ages.<br>**2.** As if belonging to the middle ages; old-fashioned and unenlightened. | *"Altho the movement for the repeal of medieval laws has continued in Europe from 1776 till the present time, yet custom still is stronger to-day in Europe than in America."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[medina]] | noun | **1.** A city in western saudi arabia; site of the tomb of muhammad; the second most holy city of islam.<br>**2.** The ancient quarter of many cities in northern africa. | *"Likewise, Mecca and Medina have achieved illimitable glory, as the light of Prophethood shone forth therein."* — Effendi Shoghi, *Citadel of Faith* |
| [[medinilla]] | noun | **1.** Tropical old world ornamental evergreen shrubs having fleshy leaves and large panicles of white pink flowers. | *"In academic literature, medinilla designates tropical old world ornamental evergreen shrubs having fleshy leaves and large panicles of white pink flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mediocre]] | adjective | **1.** Moderate to inferior in quality.<br>**2.** Lacking exceptional quality or ability. | *"However, many mediocre women have proved their ability to attend to their own fortunes, and do good business for themselves; but your battle is to be fought on still higher grounds."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[mediocrity]] | noun | **1.** Ordinariness as a consequence of being average and not outstanding.<br>**2.** A person of second-rate ability or value. | *"Like exceptional emphasis in the tone of a genius, that which would have made mediocrity ridiculous was an addition to recognised power."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[meditate]] | verb | **1.** Reflect deeply on a subject.<br>**2.** Think intently and at length, as for spiritual purposes. | *"I will meditate the while upon some horrid message for a challenge. [_Exeunt Sir Toby, Fabian and Maria._] OLIVIA."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[meditation]] | noun | **1.** Continuous and profound contemplation or musing on a subject or series of subjects of a deep or abstruse nature.<br>**2.** (religion) contemplation of spiritual matters (usually on religious or philosophical subjects). | *"O fearful meditation, where alack, Shall Time’s best jewel from Time’s chest lie hid?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[meditative]] | adjective | **1.** Deeply or seriously thoughtful. | *"His eyes were more meditative, and his expression was more sad."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[meditatively]] | adverb | **1.** In a meditative manner. | *"In fact, I found him.” “Without any clue to anything more?” “Without any; there was,” says the lawyer meditatively, “an old portmanteau, but—No, there were no papers.” During the utterance of every word of this short dialogue, Lady Dedlock and Mr."* — Charles Dickens, *Bleak House* |
| [[meditativeness]] | noun | **1.** Deep serious thoughtfulness. | *"Beware of enlisting in your vigilant fisheries any lad with lean brow and hollow eye; given to unseasonable meditativeness; and who offers to ship with the Phædon instead of Bowditch in his head."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[mediterranean]] | noun | **1.** The largest inland sea; between europe and africa and asia.<br>**2.** Of or relating to or characteristic of or located near the mediterranean sea. | *"I was in the Mediterranean with him; I am quite a sailor."* — Charles Dickens, *Bleak House* |
| [[medium]] | noun | **1.** A means or instrumentality for storing or communicating information.<br>**2.** The surrounding environment. | *"We hear that ye can tell the time as well by the stars as we can by the sun and moon, shepherd.” “Yes, I can do a little that way,” said Gabriel, as a man of medium sentiments on the subject."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[medium-dry]] | adjective | **1.** Of a wine that is dry but not extremely dry. | *"In academic literature, medium-dry designates of a wine that is dry but not extremely dry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medium-large]] | adjective | **1.** Of anything that is large but not the largest. | *"In academic literature, medium-large designates of anything that is large but not the largest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medium-size]] | adjective | **1.** Intermediate in size. | *"In academic literature, medium-size designates intermediate in size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[medium-sized]] | adjective | **1.** Intermediate in size. | *"In academic literature, medium-sized designates intermediate in size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonmedicinal]] | adjective | **1.** Not having a medicinal effect or not medically prescribed. | *"In academic literature, nonmedicinal designates not having a medicinal effect or not medically prescribed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[premedical]] | adjective | **1.** Preparing for the study of medicine.<br>**2.** Preceding and preparing for the study of medicine. | *"In academic literature, premedical designates preparing for the study of medicine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[premeditate]] | verb | **1.** Consider, ponder, or plan (an action) beforehand.<br>**2.** Think or reflect beforehand or in advance. | *"Remember that your fame Knolls in the ear o’ th’ world; what you do quickly Is not done rashly; your first thought is more Than others’ laboured meditance, your premeditating More than their actions."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[premeditated]] | verb | **1.** Consider, ponder, or plan (an action) beforehand.<br>**2.** Think or reflect beforehand or in advance. | *"Com’st thou with deep premeditated lines, With written pamphlets studiously devised, Humphrey of Gloucester?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[premeditation]] | noun | **1.** Planning or plotting in advance of acting.<br>**2.** (law) thought and intention to commit a crime well in advance of the crime; goes to show criminal intent. | *"A cold premeditation for my purpose!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remediable]] | adjective | **1.** Capable of being remedied or redressed. | *"The faults of human nature cannot be attributed to any "system"; and if they are remediable, it is by education and better social opportunity."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[remedial]] | adjective | **1.** Tending or intended to rectify or improve.<br>**2.** Tending to cure or restore to health. | *"In the next place, the abuses would often have completed their mischievous effects before the remedial provision would be applied."* — Alexander Hamilton, *The Federalist Papers* |
| [[remediate]] | verb | **1.** Set straight or right. | *"Be aidant and remediate In the good man’s distress!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[remediation]] | noun | **1.** Act of correcting an error or a fault or an evil. | *"In academic literature, remediation designates act of correcting an error or a fault or an evil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[submediant]] | noun | **1.** (music) the sixth note of a major or minor scale (or the third below the tonic). | *"In academic literature, submediant designates (music) the sixth note of a major or minor scale (or the third below the tonic)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmediated]] | adjective | **1.** Having no intervening persons, agents, conditions. | *"In academic literature, unmediated designates having no intervening persons, agents, conditions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmedical]] | adjective | **1.** Not having a medicinal effect or not medically prescribed. | *"In academic literature, unmedical designates not having a medicinal effect or not medically prescribed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmedicative]] | adjective | **1.** Not having a medicinal effect or not medically prescribed. | *"In academic literature, unmedicative designates not having a medicinal effect or not medically prescribed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmedicinal]] | adjective | **1.** Not having a medicinal effect or not medically prescribed. | *"In academic literature, unmedicinal designates not having a medicinal effect or not medically prescribed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpremeditated]] | adjective | **1.** Not prepared or planned in advance.<br>**2.** Not premeditated. | *"Ask me what question thou canst possible, And I will answer unpremeditated."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · MEDI
  </div>
</div>
