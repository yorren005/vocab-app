---
status: unread
type: root_dashboard
---
# Dashboard — scrib
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">scrib-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to write, draw, or engrave”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A pen smoothly carving dark ink letters onto a blank white page.</span>
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

The root **scrib** means to write, draw, or engrave. It refers to putting words down on a surface or recording information in writing. In English, this root forms words such as *describe*, *inscribe*, *prescribe*, and *manuscript*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to write, draw, or engrave
> The root **scrib** means to write, draw, or engrave. It refers to putting words down on a surface or recording information in writing. In English, this root forms words such as *describe*, *inscribe*, *prescribe*, and *manuscript*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To write, draw, or engrave</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A pen smoothly carving dark ink letters onto a blank white page.</mark>
> - **Everyday Connection**: Think of familiar words like *describe* and *inscribe*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **scrib** comes from a Latin word that means *"to write, draw, or engrave"*.
  - At its core, it describes the action of write, draw, or engrave.

- **The Big Picture Idea**:
  - Picture a pen smoothly carving dark ink letters onto a blank white page.
  - Whenever you see **scrib** in an English word, think of **words and records written down**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to write, draw, or engrave).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Describe**: To give a detailed account in words of something. 2. To mark out or draw a geometrical figure.
  - **Inscribe**: To write or carve words or symbols on a surface. 2. To dedicate a book or object to someone.
  - **Prescribe**: To advise and authorize the use of a medicine or treatment. 2. To state authoritatively or as a rule that an action should be carried out.
  - **Manuscript**: An everyday English word showing the root's idea of *to write, draw, or engrave*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">scrib</mark>, think of <mark class="hl-def">words and records written down</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **scrib** operates primarily through the Latin present stem:
- **Base Verb Stem (`scrīb-`)**:
  - *scrībere* $\to$ **scribe**, **scribble**, **scribbler**.
- **Prefix Compounds with Verbs in `-scribe`**:
  - *ad-* ("to") + *scrībere* $\to$ **ascribe** ("attribute to a cause").
  - *circum-* ("around") + *scrībere* $\to$ **circumscribe** ("draw a circle around, restrict").
  - *de-* ("down, concerning") + *scrībere* $\to$ **describe** ("represent in words").
  - *in-* ("in, upon") + *scrībere* $\to$ **inscribe** ("write or carve on a surface").
  - *prae-* ("before") + *scrībere* $\to$ **prescribe** ("lay down authoritatively").
  - *pro-* ("publicly, forth") + *scrībere* $\to$ **proscribe** ("denounce or outlaw publicly").
  - *re-* ("back") + *scrībere* $\to$ **rescript** ("official imperial decree or reply").
  - *sub-* ("under") + *scrībere* $\to$ **subscribe** ("sign one's name under; pledge").
  - *trans-* ("across") + *scrībere* $\to$ **transcribe** ("copy from one medium to another").
  - *super-* ("above") + *scrībere* $\to$ **superscribe** ("write on the outside or top").

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

The derivatives of **scrib** span four foundational conceptual arenas:
- **Kinetic Writing & Transcription**: *scribe* (professional copyist), *scribble* (write hurriedly or carelessly), *transcribe* (put thoughts or speech into written form), *transcriptionist*.
- **Attribution & Scientific Representation**: *ascribe* (attribute something to a cause), *describe* (give a detailed account in words).
- **Statutory Authority & Medical Orders**: *prescribe* (state authoritatively or medically as a rule or treatment), *rescript* (official decree or decision).
- **Delimitation, Legal Banning & Pledging**: *circumscribe* (restrict within limits), *proscribe* (forbid, outlaw, condemn), *subscribe* (express agreement or pledge funds).

---

## 🔀 4. Prefix & Combining Dynamics on scrib

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ad-`** ("to") | `ad-` + `scrībere` | Write toward an author/cause $\to$ attribute, credit | *ascribe, ascribable* |
| **`circum-`** ("around") | `circum-` + `scrībere` | Draw a line around $\to$ confine, limit, restrict | *circumscribe, circumscription* |
| **`de-`** ("down") | `de-` + `scrībere` | Write down in detail $\to$ delineate, depict, narrate | *describe, describable* |
| **`in-`** ("in, on") | `in-` + `scrībere` | Scratch into a stone/surface $\to$ engrave, dedicate | *inscribe, inscription, inscriptional* |
| **`prae-`** ("before") | `prae-` + `scrībere` | Write orders beforehand $\to$ direct, order medicine | *prescribe, prescriptive* |
| **`pro-`** ("publicly") | `pro-` + `scrībere` | Post a written name on an execution list $\to$ outlaw | *proscribe, proscriptive* |
| **`sub-`** ("under") | `sub-` + `scrībere` | Write one's signature underneath $\to$ pledge, agree | *subscribe, subscriber* |
| **`trans-`** ("across") | `trans-` + `scrībere` | Write across from an original $\to$ copy, decode | *transcribe, transcriptionist* |
| **`super-`** ("above") | `super-` + `scrībere` | Write above/outside an envelope $\to$ address, endorse | *superscribe, superscription* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Jurisprudence & Constitutional Law**: Statutory limits on executive power, civil liberties, and criminal bans (*circumscribe*, *proscribe*, *rescript*).
- **Medicine & Healthcare Systems**: Doctor prescriptions and clinical medical records (*prescribe*, *transcriptionist*).
- **Literary Criticism & Linguistics**: Descriptive grammar vs prescriptive grammar; text editing (*describe*, *prescribe*, *transcribe*).
- **Information Technology & Software**: Pub/Sub messaging paradigms and typography (*subscribe*, *subscriber*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[circumscribe]] | verb | **1.** Draw a line around.<br>**2.** Restrict or confine,. | *"The dreariness and desolation of the landscape, the short gloomy days and darksome nights, while they circumscribe our wanderings, shut in our feelings also from rambling abroad, and make us more keenly disposed for the pleasure of the social circle."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[circumscribed]] | verb | **1.** Draw a line around.<br>**2.** Restrict or confine,. | *"The good Andronicus, Patron of virtue, Rome’s best champion, Successful in the battles that he fights, With honour and with fortune is returned From where he circumscribed with his sword And brought to yoke the enemies of Rome."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[describable]] | adjective | **1.** Capable of being described. | *"Then the screw set to work at its maximum speed, its four blades beating the waves with in describable force."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[describe]] | verb | **1.** Give a description of.<br>**2.** To give an account or representation of in words. | *"I pray thee over-name them, and as thou namest them, I will describe them, and according to my description level at my affection."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[described]] | verb | **1.** Give a description of.<br>**2.** To give an account or representation of in words. | *"I can't stand it, and you now know yourself what they are like." Bruno had described his two comrades to his new friend, their mean attitude and their frequent and contemptible tricks."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[indescribable]] | adjective | **1.** Defying expression or description. | *"An indescribable succession of dull blows, perplexing in their regularity, sent their sound with difficulty through the fluffy atmosphere."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[inscribe]] | verb | **1.** Carve, cut, or etch into a material or surface.<br>**2.** Register formally as a participant or member. | *"On the ancient monuments of barbarism and despotism I will inscribe great words of justice and mercy...."* — graf Leo Tolstoy, *War and Peace* |
| [[inscribed]] | verb | **1.** Carve, cut, or etch into a material or surface.<br>**2.** Register formally as a participant or member. | *"Then, that in all you writ to Rome, or else To foreign princes, “_ego et rex meus_” Was still inscribed, in which you brought the King To be your servant."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oversubscribed]] | adjective | **1.** Sold in excess of available supply especially season tickets. | *"In academic literature, oversubscribed designates sold in excess of available supply especially season tickets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prescribe]] | verb | **1.** Issue commands or orders for. | *"Methinks you prescribe to yourself very preposterously."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prescribed]] | verb | **1.** Issue commands or orders for.<br>**2.** Set down as a rule or guide. | *"Mere animal satisfaction!” “This is our friend’s consulting-room (or would be, if he ever prescribed), his sanctum, his studio,” said my guardian to us."* — Charles Dickens, *Bleak House* |
| [[proscribe]] | verb | **1.** Command against. | *"The speaker knows that this beau monde does not proscribe love, provided it be in accordance with the proprieties which IT has determined upon and established. v. 5."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[proscribed]] | verb | **1.** Command against.<br>**2.** Excluded from use or mention. | *"But in a fatal moment, yielding to those propensities and passions, the indulgence of which had so long rendered him a scourge to society, he had quitted his haven of rest and repentance, and had come back to the country where he was proscribed."* — Charles Dickens, *Great Expectations* |
| [[scribe]] | noun | **1.** French playwright (1791-1861).<br>**2.** Informal terms for journalists. | *"Write down thy mind, bewray thy meaning so, An if thy stumps will let thee play the scribe."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[scriber]] | noun | **1.** A sharp-pointed awl for marking wood or metal to be cut. | *"In academic literature, scriber designates a sharp-pointed awl for marking wood or metal to be cut."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subscribe]] | verb | **1.** Offer to buy, as of stocks and shares.<br>**2.** Mark with one's signature; write one's name (on). | *"I know th’art valiant; and to the possibility of thy soldiership, will subscribe for thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subscribed]] | verb | **1.** Offer to buy, as of stocks and shares.<br>**2.** Mark with one's signature; write one's name (on). | *"He set up his bills here in Messina and challenged Cupid at the flight; and my uncle’s fool, reading the challenge, subscribed for Cupid, and challenged him at the bird-bolt."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subscriber]] | noun | **1.** Someone who expresses strong approval.<br>**2.** Someone who contracts to receive and pay for a service or a certain number of issues of a publication. | *"Price, One Dollar annually, _in advance, or on becoming a Subscriber_, or One Dollar and Fifty cents, if payment is delayed after the receipt of six Numbers."* — Elihu W. Baldwin, *The National Preacher, Vol. 2 No. 7 Dec. 1827* |
| [[superscribe]] | verb | **1.** Write on the top or outside.<br>**2.** Write on the outside or upper part of. | *"The photograph was of Irene Adler herself in evening dress, the letter was superscribed to “Sherlock Holmes, Esq."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Speech & Communication]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SCRIB
  </div>
</div>
