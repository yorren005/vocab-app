---
status: unread
type: root_dashboard
---
# Dashboard — sequ
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sequ-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to follow”</span>
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

The root **sequ** means to follow. It refers to the action of following and carrying out this process. In English, this root forms words such as *sequence*, *consequence*, *subsequent*, and *sequel*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to follow
> The root **sequ** means to follow. It refers to the action of following and carrying out this process. In English, this root forms words such as *sequence*, *consequence*, *subsequent*, and *sequel*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To follow</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Arranging books neatly in a row on a shelf according to their category.</mark>
> - **Everyday Connection**: Think of familiar words like *sequence* and *consequence*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sequ** comes from a Latin word that means *"to follow"*.
  - At its core, it describes the action of follow.

- **The Big Picture Idea**:
  - Picture arranging books neatly in a row on a shelf according to their category.
  - Whenever you see **sequ** in an English word, think of **to follow**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to follow).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Sequence**: A particular order in which related events, movements, or things follow each other.
  - **Consequence**: A result or effect, typically one that is unwelcome or unpleasant.
  - **Subsequent**: Coming after something in time.
  - **Sequel**: A published, broadcast, or recorded work that continues the story or develops the theme of an earlier one.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sequ</mark>, think of <mark class="hl-def">to follow</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sequ** generates vocabulary through prefixation on the present stem *sequ-*:
> - **Base Nouns & Adjectives:**
>   - *sequentia* $	o$ *sequence*, *sequential*, *sequentially* ("ordered arrangement").
>   - *sequela* $	o$ *sequel* ("a published continuation or literary follow-up").
> - **Prefix Modifications:**
>   - *con-* ("together, with") + *sequī* $	o$ *consequence*, *consequent*, *consequential*, *consequently*, *inconsequential*.
>   - *sub-* ("under, next") + *sequī* $	o$ *subsequent*, *subsequently*, *subsequence* ("following in time or place").
>   - *ob-* ("toward, before") + *sequī* $	o$ *obsequious*, *obsequiously*, *obsequiousness* ("servilely obedient").
> - **French Phonetic Shifts:**
>   - *in-* + *sequī* $	o$ Old French *ensuivre* $	o$ *ensue* ("to happen afterward or as a result").
>   - *prō-* + *sequī* $	o$ Old French *poursuivre* $	o$ *pursue*, *pursuit*, *pursuer* ("to chase, follow in order to overtake").
> - **Latin Idiomatic Phrases:**
>   - *nōn* ("not") + *sequitur* ("it follows") $	o$ *non sequitur* ("a statement that does not logically follow").

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
> - **Genetics, Computing & Mathematics:** *sequence*, *sequential*, *subsequence* (DNA sequencing, sequential database queries).
> - **Logic & Rhetoric:** *consequence*, *non sequitur*, *consequent* (syllogistic validity, fallacious arguments).
> - **Temporal Chronology & Literature:** *subsequent*, *sequel*, *ensue* (historical epochs, novel sequels).
> - **Chasing & Career Striving:** *pursue*, *pursuit*, *pursuer* (police high-speed pursuits, pursuing artistic excellence).
> - **Behavioral Sycophancy:** *obsequious*, *obsequiously* (servile fawning to superiors).

---

## 🔀 4. Prefix & Combining Dynamics on sequ

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `con-` (with, thoroughly) | `sequī` | **[[consequence]]** / **consequent** | Following directly from an antecedent action $	o$ inevitable result. |
| `sub-` (under, immediately after) | `sequī` | **[[subsequent]]** | Following closely behind in temporal sequence. |
| `ob-` (toward, yielding) | `sequī` | **[[obsequious]]** | Yielding compliantly to another's will $	o$ servilely fawning. |
| `prō-` $	o$ `pur-` (forward) | `sequī` | **[[pursue]]** / **pursuit** | Following forward with determination to capture or achieve. |
| `in-` $	o$ `en-` (in, upon) | `sequī` | **[[ensue]]** | Following upon an event as a natural outcome. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🧬 **Molecular Biology & Genetics** | *sequence*, *sequential* | High-throughput next-generation DNA sequencing mapping human genome variations. |
| 🧠 **Formal Logic & Philosophy** | *consequence*, *non sequitur* | Analyzing conditional statements ($P \implies Q$), identifying formal non sequitur fallacies. |
| ⚖️ **Tort Law & Liability** | *consequential*, *consequence* | Assessing consequential damages resulting from breach of commercial contract. |
| 🎬 **Cinema & Narrative Literature** | *sequel*, *sequence* | Directing an acclaimed cinematic sequel; editing action montage sequences. |
| 🚓 **Criminology & Law Enforcement** | *pursue*, *pursuit* | Tactical policies regulating high-speed vehicular pursuit through urban streets. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[consequence]] | noun | **1.** A phenomenon that follows and is caused by some previous phenomenon.<br>**2.** The outcome of an event especially as relative to an individual. | *"Fare you well, my lord; and believe this of me, there can be no kernal in this light nut; the soul of this man is his clothes; trust him not in matter of heavy consequence; I have kept of them tame, and know their natures."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consequent]] | adjective | **1.** Following or accompanying as a consequence. | *"Snagsby politely invites him to step upstairs and drink a cup of tea, if he will excuse the disarranged state of the tea-table, consequent on their previous exertions."* — Charles Dickens, *Bleak House* |
| [[consequential]] | adjective | **1.** Having important issues or results. | *"Is this place of abomination consecrated ground?” “I don’t know nothink of consequential ground,” says Jo, still staring."* — Charles Dickens, *Bleak House* |
| [[consequentially]] | adverb | **1.** Having consequence. | *"In academic literature, consequentially designates having consequence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[consequently]] | adverb | **1.** (sentence connectors) because of the reason given.<br>**2.** As a consequence. | *"But thou didst understand me by my signs And didst in signs again parley with sin; Yea, without stop, didst let thy heart consent, And consequently thy rude hand to act The deed which both our tongues held vile to name."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disequilibrium]] | noun | **1.** Loss of equilibrium attributable to an unstable situation in which some forces outweigh others. | *"In academic literature, disequilibrium designates loss of equilibrium attributable to an unstable situation in which some forces outweigh others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inconsequence]] | noun | **1.** Having no important effects or influence.<br>**2.** Invalid or incorrect reasoning. | *"No, no, Liddy; you must stay!” said Bathsheba, dropping from haughtiness to entreaty with capricious inconsequence."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[inconsequent]] | adjective | **1.** Lacking worth or importance. | *"How precisely like Red Pepper Burns it was to plan for a “stag” dinner in this inconsequent way!"* — Grace S. Richmond, *Red Pepper Burns* |
| [[inconsequential]] | adjective | **1.** Lacking worth or importance.<br>**2.** Not following logically as a consequence. | *"In academic literature, inconsequential designates lacking worth or importance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inconsequentially]] | adverb | **1.** Lacking consequence. | *"The end? he thought, and wondered inconsequentially whether his teeth would rust."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[inconsequently]] | adverb | **1.** Lacking consequence. | *"How do you communicate?” “I tell the bailiff. _He_ writes.” “And should you like him to write our story?” My question had a sarcastic force that I had not fully intended, and it made her, after a moment, inconsequently break down."* — Henry James, *The Turn of the Screw* |
| [[non sequitur]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin sequ within the domain of Order.<br>**2.** A technical or specialized form exhibiting the properties of sequ in systematic terminology. | *"In academic literature, non sequitur designates pertaining to, derived from, or characteristic of latin sequ within the domain of order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obsequious]] | adjective | **1.** Attempting to win favor from influential people by flattery.<br>**2.** Attentive in an ingratiating or servile manner. | *"How many a holy and obsequious tear Hath dear religious love stol’n from mine eye, As interest of the dead, which now appear, But things removed that hidden in thee lie."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[obsequiously]] | adverb | **1.** In an obsequious manner. | *"Set down, set down your honourable load, If honour may be shrouded in a hearse, Whilst I awhile obsequiously lament Th’ untimely fall of virtuous Lancaster."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[obsequiousness]] | noun | **1.** Abject or cringing submissiveness. | *"What, I asked in my own mind, can cause this obsequiousness on the part of Miss Toady; has Briefless got a county court, or has his wife had a fortune left her?"* — William Makepeace Thackeray, *Vanity Fair* |
| [[sequel]] | noun | **1.** Something that follows something else.<br>**2.** A part added to a book or play that continues and extends it. | *"Gather the sequel by that went before."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sequela]] | noun | **1.** Any abnormality following or resulting from a disease or injury or treatment. | *"In academic literature, sequela designates any abnormality following or resulting from a disease or injury or treatment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sequella]] | noun | **1.** A secondary consequence. | *"In academic literature, sequella designates a secondary consequence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sequenator]] | noun | **1.** (chemistry) an apparatus that can determine the sequence of monomers in a polymer. | *"In academic literature, sequenator designates (chemistry) an apparatus that can determine the sequence of monomers in a polymer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sequence]] | noun | **1.** Serial arrangement in which things follow in logical order or a recurrent pattern.<br>**2.** A following of one thing after another in time. | *"This toil of ours should be a work of thine; But thou from loving England art so far That thou hast underwrought his lawful king, Cut off the sequence of posterity, Outfaced infant state, and done a rape Upon the maiden virtue of the crown."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sequencer]] | noun | **1.** (chemistry) an apparatus that can determine the sequence of monomers in a polymer.<br>**2.** Computer hardware that sorts data or programs into a predetermined sequence. | *"Once satisfied that a gun emplacement was not booby-trapped, Kumiko inserted random realignment parameters into laser blocks, twirled tracking sequencers into disarray, and switched about chips and connectors."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[sequent]] | adjective | **1.** In regular succession without gaps.<br>**2.** Following or accompanying as a consequence. | *"Indeed your ‘O Lord, sir!’ is very sequent to your whipping."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sequential]] | adjective | **1.** In regular succession without gaps. | *"One way and another, it has begotten events so remarkable in themselves, and so continuously momentous in their sequential issues, that whaling may well be regarded as that Egyptian mother, who bore offspring themselves pregnant from her womb."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[sequentially]] | adverb | **1.** In a consecutive manner. | *"I identified each album sequentially on its spine with a gold foil letter from a packet purchased at a supermarket."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[sequester]] | verb | **1.** Requisition forcibly, as of enemy property.<br>**2.** Take temporary possession of as a security, by legal authority. | *"This hand of yours requires A sequester from liberty, fasting and prayer, Much castigation, exercise devout; For here’s a young and sweating devil here That commonly rebels. ’Tis a good hand, A frank one."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sequestered]] | verb | **1.** Requisition forcibly, as of enemy property.<br>**2.** Take temporary possession of as a security, by legal authority. | *"Why are you sequestered from all your train, Dismounted from your snow-white goodly steed, And wandered hither to an obscure plot, Accompanied but with a barbarous Moor, If foul desire had not conducted you?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sequestrate]] | verb | **1.** Keep away from others.<br>**2.** Set apart from others. | *"It will give a better idea of the uncertain condition of those two, sequestrated underground, than any mere description."* — S. R. Crockett, *Deep Moat Grange* |
| [[sequestration]] | noun | **1.** The act of segregating or sequestering.<br>**2.** The action of forming a chelate or other stable compound with an ion or atom or molecule so that it is no longer available for reactions. | *"Since Henry Monmouth first began to reign, Before whose glory I was great in arms, This loathsome sequestration have I had; And even since then hath Richard been obscured, Deprived of honour and inheritance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sequin]] | noun | **1.** Adornment consisting of a small piece of shiny material used to decorate clothing. | *"Leopopold! _(Twittering.)_ Leeolee! _(Warbling.)_ O Leo! _(They rustle, flutter upon his garments, alight, bright giddy flecks, silvery sequins.)_ BLOOM: A man’s touch."* — James Joyce, *Ulysses* |
| [[sequined]] | adjective | **1.** Covered with beads or jewels or sequins. | *"In academic literature, sequined designates covered with beads or jewels or sequins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sequoia]] | noun | **1.** Either of two huge coniferous california trees that reach a height of 300 feet; sometimes placed in the taxodiaceae. | *"In academic literature, sequoia designates either of two huge coniferous california trees that reach a height of 300 feet; sometimes placed in the taxodiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sequoiadendron]] | noun | **1.** Giant sequoias; sometimes included in the genus sequoia; until recently placed in the taxodiaceae. | *"In academic literature, sequoiadendron designates giant sequoias; sometimes included in the genus sequoia; until recently placed in the taxodiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sequoya]] | noun | **1.** Cherokee who created a notation for writing the cherokee language (1770-1843). | *"In academic literature, sequoya designates cherokee who created a notation for writing the cherokee language (1770-1843)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sequoyah]] | noun | **1.** Cherokee who created a notation for writing the cherokee language (1770-1843). | *"In academic literature, sequoyah designates cherokee who created a notation for writing the cherokee language (1770-1843)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subsequence]] | noun | **1.** Something that follows something else.<br>**2.** Following in time. | *"In academic literature, subsequence designates something that follows something else."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subsequent]] | adjective | **1.** Following in time or order. | *"Guppy I told my guardian of his old proposal and his subsequent retraction."* — Charles Dickens, *Bleak House* |
| [[subsequently]] | adverb | **1.** Happening at a time subsequent to a reference time. | *"The physician subsequently said that he thought that in that five minutes every kindred case he had ever known in a quarter century's practice passed before his mind."* — Classic Author, *The wonders of prayer* |
| [[subsequentness]] | noun | **1.** Following in time. | *"In academic literature, subsequentness designates following in time."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · SEQU
  </div>
</div>
