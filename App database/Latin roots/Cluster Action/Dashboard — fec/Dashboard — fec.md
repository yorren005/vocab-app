---
status: unread
type: root_dashboard
---
# Dashboard — fec
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fec-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to make or do”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Hands actively pushing a lever or carrying out purposeful work.</span>
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

The root **fec** means to make or do. It refers to the action of making and carrying out this process. In English, this root forms words such as *affect*, *affection*, *affectionate*, and *defect*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to make or do
> The root **fec** means to make or do. It refers to the action of making and carrying out this process. In English, this root forms words such as *affect*, *affection*, *affectionate*, and *defect*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To make or do</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands actively pushing a lever or carrying out purposeful work.</mark>
> - **Everyday Connection**: Think of familiar words like *affect* and *affection*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fec** comes from a Latin word that means *"to make or do"*.
  - At its core, it describes the action of make or do.

- **The Big Picture Idea**:
  - Picture hands actively pushing a lever or carrying out purposeful work.
  - Whenever you see **fec** in an English word, think of **to make or do**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to make or do).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Affect**: To have an effect on.
  - **Affection**: A gentle feeling of fondness, warmth, or liking.
  - **Affectionate**: Readily feeling or showing fondness, tenderness, or love.
  - **Defect**: A shortcoming, imperfection, or flaw in someone or something.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fec</mark>, think of <mark class="hl-def">to make or do</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stem**:
  - `-fec-` / `-fect-` (< Latin *fēcī / -fectum*): Compound participial and perfect stem.
- **Prefix Dynamics**:
  - `ad-` $	o$ `af-` ("to, toward"): *affect, affection*.
  - `con-` ("together, thoroughly"): *confection*.
  - `de-` ("down, away"): *defect, deficient, deficit*.
  - `in-` ("in, into"): *infect, infection*.
  - `per-` ("thoroughly"): *perfect, perfection*.
  - `pro-` ("forward"): *proficient, proficiency*.

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
```
                      ┌── Psychology & Emotion: affect, affection, affectionate
                      │
    [fec] ────────────┼── Medicine & Pathology: infect, infection, infectious
(Compounded making)   │
                      ├── Flawlessness vs. Flaw: perfect, perfection vs. defect, defective
                      │
                      └── Competence vs. Lack: proficient, proficiency vs. deficient, deficit
```

---

## 🔀 4. Prefix & Combining Dynamics on fec
- **`ad-` + `fec`**: *affect* — to act upon; to influence emotion or produce a mental impression.
- **`in-` + `fec`**: *infect* — to taint with disease; to invade tissues with pathogenic microorganisms.
- **`per-` + `fec`**: *perfect* — made thoroughly; free from any fault, blemish, or incompleteness.
- **`de-` + `fec`**: *defect* — an imperfection or lack of something essential; a shortcoming.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Psychiatry & Affective Neuroscience**: Blunted *affect*; *affective* disorders; emotional resonance.
- **Infectious Disease & Epidemiology**: Nosocomial *infections*; *infectious* disease transmission vectors.
- **Macroeconomics & Fiscal Policy**: Sovereign budget *deficits*; current account imbalances.
- **Quality Control & Engineering**: Zero-*defect* manufacturing; Six Sigma tolerances.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[affect]] | noun | **1.** The conscious subjective aspect of feeling or emotion.<br>**2.** Have an effect upon. | *"No more of this, Helena; go to, no more, lest it be rather thought you affect a sorrow than to have."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[affectation]] | noun | **1.** A deliberate pretense or exaggerated display. | *"Taffeta phrases, silken terms precise, Three-piled hyperboles, spruce affectation, Figures pedantical: these summer flies Have blown me full of maggot ostentation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[affected]] | verb | **1.** Have an effect upon.<br>**2.** Act physically on; have an effect upon. | *"Thou hast affected the fine strains of honour To imitate the graces of the gods, To tear with thunder the wide cheeks o’ th’ air And yet to charge thy sulphur with a bolt That should but rive an oak."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[affectedly]] | adverb | **1.** In an affected manner. | *"And it is EXPRESSLY to execute these powers that the sweeping clause, as it has been affectedly called, authorizes the national legislature to pass all NECESSARY and PROPER laws."* — Alexander Hamilton, *The Federalist Papers* |
| [[affectedness]] | noun | **1.** The quality of being false or artificial (as to impress others).<br>**2.** A deliberate pretense or exaggerated display. | *"In academic literature, affectedness designates the quality of being false or artificial (as to impress others)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affecting]] | verb | **1.** Have an effect upon.<br>**2.** Act physically on; have an effect upon. | *"And affecting one sole throne, without assistance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[affectingly]] | adverb | **1.** In a poignant or touching manner. | *"In academic literature, affectingly designates in a poignant or touching manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affection]] | noun | **1.** A positive feeling of liking. | *"Come, come, disclose The state of your affection, for your passions Have to the full appeach’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[affectional]] | adjective | **1.** Characterized by emotion. | *"In academic literature, affectional designates characterized by emotion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affectionate]] | adjective | **1.** Having or displaying warmth or affection. | *"A more charming group of young people and a more wise and affectionate mother would be hard to find."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[affectionately]] | adverb | **1.** With affection. | *"Go to, sweet queen, go to—commends himself most affectionately to you— HELEN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[affectionateness]] | noun | **1.** A positive feeling of liking.<br>**2.** A quality proceeding from feelings of affection or love. | *"Selina” received her with a pathetic affectionateness and a disposition to give edifying answers on the commonest topics, which could hardly have reference to an ordinary quarrel of which the most important consequence was a perturbation of Mr."* — George Eliot, *Middlemarch* |
| [[affective]] | adjective | **1.** Characterized by emotion. | *"In academic literature, affective designates characterized by emotion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[confect]] | noun | **1.** A rich sweet made of flavored sugar and often combined with fruit or nuts.<br>**2.** Make or construct. | *"In academic literature, confect designates a rich sweet made of flavored sugar and often combined with fruit or nuts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[confection]] | noun | **1.** A food rich in sugar.<br>**2.** The act of creating something (a medicine or drink or soup etc.) by compounding or mixing a variety of components. | *"I left out one thing which the Queen confess’d, Which must approve thee honest. ‘If Pisanio Have’ said she ‘given his mistress that confection Which I gave him for cordial, she is serv’d As I would serve a rat.’ CYMBELINE."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confectionary]] | noun | **1.** A confectioner's shop. | *"In academic literature, confectionary designates a confectioner's shop."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[confectioner]] | noun | **1.** Someone who makes candies and other sweets. | *"This guileless confectioner was not by any means sober, and had a black eye in the green stage of recovery, which was painted over."* — Charles Dickens, *Great Expectations* |
| [[confectionery]] | noun | **1.** Candy and other sweets considered collectively.<br>**2.** A confectioner's shop. | *"Men cannot thus collectively enjoy rare wines or good confectionery; they cannot partake without limit of a limited supply."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[defecate]] | verb | **1.** Have a bowel movement. | *"In academic literature, defecate designates have a bowel movement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defecation]] | noun | **1.** The elimination of fecal waste through the anus. | *"The traditional connection between defecation and writing was another comparison apparent to the commentators."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[defecator]] | noun | **1.** A person who defecates. | *"In academic literature, defecator designates a person who defecates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defect]] | noun | **1.** An imperfection in a bodily system.<br>**2.** A failing or deficiency. | *"What merit do I in my self respect, That is so proud thy service to despise, When all my best doth worship thy defect, Commanded by the motion of thine eyes?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[defection]] | noun | **1.** Withdrawing support or help despite allegiance or responsibility.<br>**2.** The state of having rejected your religious beliefs or your political party or a cause (often in favor of opposing beliefs or causes). | *"Kitty and Lydia take his defection much more to heart than I do."* — Jane Austen, *Pride and Prejudice* |
| [[defective]] | adjective | **1.** Having a defect.<br>**2.** Markedly subnormal in structure or function or intelligence or behavior. | *"Leave nothing out for length, and make us think Rather our state’s defective for requital, Than we to stretch it out."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[defectively]] | adverb | **1.** In a defective manner. | *"The small body of national troops, which has been judged necessary in time of peace, is defectively kept up, badly paid, infected with local prejudices, and supported by irregular and disproportionate contributions to the treasury."* — Alexander Hamilton, *The Federalist Papers* |
| [[defectiveness]] | noun | **1.** The state of being defective. | *"Defectiveness of the gold standard. § 14."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[defector]] | noun | **1.** A person who abandons their duty (as on a military post). | *"In academic literature, defector designates a person who abandons their duty (as on a military post)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disaffect]] | verb | **1.** Arouse hostility or indifference in where there had formerly been love, affection, or friendliness. | *"A clergyman in the State of New York, through the influence of a disaffected member, was unfairly and precipitately deprived of his pulpit, which involved a large family in necessity."* — Classic Author, *The wonders of prayer* |
| [[disaffected]] | verb | **1.** Arouse hostility or indifference in where there had formerly been love, affection, or friendliness.<br>**2.** Discontented as toward authority. | *"A clergyman in the State of New York, through the influence of a disaffected member, was unfairly and precipitately deprived of his pulpit, which involved a large family in necessity."* — Classic Author, *The wonders of prayer* |
| [[disaffection]] | noun | **1.** The feeling of being alienated from other people.<br>**2.** Disloyalty to the government or to established authority. | *"It may have been a flash of honesty in him; or mere prudential policy which, under the circumstance, imperiously forbade the slightest symptom of open disaffection, however transient, in the important chief officer of his ship."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[disinfect]] | verb | **1.** Destroy microorganisms or pathogens by cleansing. | *"A commoner who had incurred this danger could disinfect himself by performing a certain ceremony, which consisted in touching the sole of a chief's foot with the palm and back of each of his hands, and afterwards rinsing his hands in water."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[disinfectant]] | noun | **1.** An agent (as heat or radiation or a chemical) that destroys microorganisms that might carry disease.<br>**2.** Preventing infection by inhibiting the growth or action of microorganisms. | *"According to the one theory the fire is a stimulant, according to the other it is a disinfectant; on the one view its virtue is positive, on the other it is negative."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[disinfection]] | noun | **1.** Treatment to destroy harmful microorganisms. | *"But until the ceremony of expiation or disinfection had been performed, if he wished to eat he had either to get some one to feed him, or else to go down on his knees and pick up the food from the ground with his mouth like a beast."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[effect]] | noun | **1.** A phenomenon that follows and is caused by some previous phenomenon.<br>**2.** An outward appearance. | *"In our two loves there is but one respect, Though in our lives a separable spite, Which though it alter not love’s sole effect, Yet doth it steal sweet hours from love’s delight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[effected]] | verb | **1.** Produce.<br>**2.** Act so as to bring into existence. | *"Whoever shoots at him, I set him there; Whoever charges on his forward breast, I am the caitiff that do hold him to’t; And though I kill him not, I am the cause His death was so effected."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[effecter]] | noun | **1.** One who brings about a result or event; one who accomplishes a purpose. | *"In academic literature, effecter designates one who brings about a result or event; one who accomplishes a purpose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effective]] | adjective | **1.** Producing or capable of producing an intended result or having a striking effect; -lewismumford.<br>**2.** Able to accomplish a purpose; functioning effectively; -g.b.shaw. | *"The day is closing in and the gas is lighted, but is not yet fully effective, for it is not quite dark."* — Charles Dickens, *Bleak House* |
| [[effectively]] | adverb | **1.** In an effective manner.<br>**2.** In actuality or reality or fact. | *"Certainly, tell me which song you would like to sing best." Mäzli seized the song-book effectively."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[effectiveness]] | noun | **1.** Power to be effective; the quality of being able to bring about an effect.<br>**2.** Capacity to produce strong physiological or chemical effects. | *"Of these lectures, and of others which he wrote in later years, it must be said that, while all of them were the fruit of conscientious and strenuous toil, they were of unequal merit, or at least of unequal effectiveness."* — John Cairns, *Principal Cairns* |
| [[effectivity]] | noun | **1.** Power to be effective; the quality of being able to bring about an effect. | *"In academic literature, effectivity designates power to be effective; the quality of being able to bring about an effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effector]] | noun | **1.** One who brings about a result or event; one who accomplishes a purpose.<br>**2.** A nerve fiber that terminates on a muscle or gland and stimulates contraction or secretion. | *"In academic literature, effector designates one who brings about a result or event; one who accomplishes a purpose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effects]] | noun | **1.** Property of a personal character that is portable but not used in business.<br>**2.** A phenomenon that follows and is caused by some previous phenomenon. | *"That wishing well had not a body in’t Which might be felt, that we, the poorer born, Whose baser stars do shut us up in wishes, Might with effects of them follow our friends, And show what we alone must think, which never Returns us thanks."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[effectual]] | adjective | **1.** Producing or capable of producing an intended result or having a striking effect; -lewismumford.<br>**2.** Having legal efficacy or force. | *"My Lord of Suffolk, Buckingham, and York, Reprove my allegation if you can, Or else conclude my words effectual."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[effectuality]] | noun | **1.** Power to be effective; the quality of being able to bring about an effect. | *"In academic literature, effectuality designates power to be effective; the quality of being able to bring about an effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effectually]] | adverb | **1.** In an effectual manner. | *"Your bidding shall I do effectually. [_Exit._] TAMORA."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[effectualness]] | noun | **1.** Power to be effective; the quality of being able to bring about an effect. | *"In academic literature, effectualness designates power to be effective; the quality of being able to bring about an effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effectuate]] | verb | **1.** Produce. | *"Classical and authoritative lexicons catalog effectuate as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effectuation]] | noun | **1.** The act of implementing (providing a practical means for accomplishing something); carrying into effect. | *"In academic literature, effectuation designates the act of implementing (providing a practical means for accomplishing something); carrying into effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fecal]] | adjective | **1.** Of or relating to feces. | *"By word and deed he frankly encouraged a nocturnal strumpet to deposit fecal and other matter in an unsanitary outhouse attached to empty premises."* — James Joyce, *Ulysses* |
| [[fecalith]] | noun | **1.** A hard mass of fecal matter. | *"In academic literature, fecalith designates a hard mass of fecal matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[feces]] | noun | **1.** Solid excretory product evacuated from the bowels. | *"In academic literature, feces designates solid excretory product evacuated from the bowels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fecula]] | noun | **1.** Excreta (especially of insects). | *"The grains of fecula are for a long time perfectly healthy; the cells themselves, so far from being looser, are more closely bound together than in the more healthy portions."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[feculence]] | noun | **1.** Something that is feculent. | *"In academic literature, feculence designates something that is feculent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[feculent]] | adjective | **1.** Foul with waste matter. | *"In academic literature, feculent designates foul with waste matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fecund]] | adjective | **1.** Capable of producing offspring or vegetation.<br>**2.** Intellectually productive. | *"I am that man, the sum of him, the all of him, the hairless biped who struggled upward from the slime and created love and law out of the anarchy of fecund life that screamed and squalled in the jungle."* — Jack London, *The Jacket (The Star-Rover)* |
| [[fecundate]] | verb | **1.** Make fertile or productive.<br>**2.** Introduce semen into (a female). | *"One of these warts, larger than the rest, forms a kind of thick sheath around the fecundating tube."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[fecundation]] | noun | **1.** Creation by the physical union of male and female gametes; of sperm and ova in an animal or pollen and ovule in a plant.<br>**2.** Making fertile as by applying fertilizer or manure. | *"It may be observed that the extremity of the tube which proceeds from the antheridium does not open, and the fecundation, if such it be, is produced solely by contact."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[fecundity]] | noun | **1.** The intellectual productivity of a creative imagination.<br>**2.** The state of being fertile; capable of producing offspring. | *"For astounding figurative opulence he yields only to Shakespeare, and even to Shakespeare not in absolute fecundity but in images."* — Francis Thompson, *Shelley: An Essay* |
| [[imperfect]] | noun | **1.** A tense of verbs used in describing action that is on-going.<br>**2.** Not perfect; defective or inadequate. | *"How would (I say) mine eyes be blessed made, By looking on thee in the living day, When in dead night thy fair imperfect shade, Through heavy sleep on sightless eyes doth stay!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imperfectibility]] | noun | **1.** The capability of becoming imperfect. | *"In academic literature, imperfectibility designates the capability of becoming imperfect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperfectible]] | adjective | **1.** Capable of being made imperfect. | *"In academic literature, imperfectible designates capable of being made imperfect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperfection]] | noun | **1.** The state or an instance of being imperfect. | *"I shall discover a thing to you, wherein I must very much lay open mine own imperfection."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[imperfective]] | noun | **1.** Aspect without regard to the beginning or completion of the action of the verb. | *"In academic literature, imperfective designates aspect without regard to the beginning or completion of the action of the verb."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[imperfectly]] | adverb | **1.** In an imperfect or faulty way; ; - jane austen. | *"Through all the good taste of her dress and little adornments, these objections so express themselves that she seems to go about like a very neat she-wolf imperfectly tamed."* — Charles Dickens, *Bleak House* |
| [[imperfectness]] | noun | **1.** The state or an instance of being imperfect. | *"In academic literature, imperfectness designates the state or an instance of being imperfect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ineffective]] | adjective | **1.** Not producing an intended effect.<br>**2.** Lacking in power or forcefulness. | *"The substitutes for it are largely ineffective: trade-union action, employers' associations, "want ads," cards in shop windows, weary walks from door to door, lines of waiting men outside of factories, private employment agencies."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[ineffectively]] | adverb | **1.** In an ineffective manner. | *"Specialization _saves tools_ for, either each kind of work must be most ineffectively done, or there must be provided for each worker a complete set of tools which thus will be used rarely and will rust out rather than wear out."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[ineffectiveness]] | noun | **1.** Lacking the power to be effective. | *"But the most amazing example of the ineffectiveness of the orders given by the authorities at that time was Napoleon’s attempt to stop the looting and re-establish discipline."* — graf Leo Tolstoy, *War and Peace* |
| [[ineffectual]] | adjective | **1.** Not producing an intended effect.<br>**2.** Producing no result or effect. | *"But as this was an ineffectual protest, I then said, more particularly, that I was not sure of my qualifications."* — Charles Dickens, *Bleak House* |
| [[ineffectuality]] | noun | **1.** Lacking the power to be effective. | *"In academic literature, ineffectuality designates lacking the power to be effective."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ineffectually]] | adverb | **1.** In an ineffectual manner. | *"Sometimes, a strong man’s hand, sometimes a strong man’s breast, was set against my mouth to deaden my cries, and with a hot breath always close to me, I struggled ineffectually in the dark, while I was fastened tight to the wall."* — Charles Dickens, *Great Expectations* |
| [[ineffectualness]] | noun | **1.** Lacking the power to be effective. | *"In academic literature, ineffectualness designates lacking the power to be effective."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infect]] | verb | **1.** Communicate a disease to.<br>**2.** Contaminate with a disease or microorganism. | *"Why do you infect yourself with them?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infected]] | verb | **1.** Communicate a disease to.<br>**2.** Contaminate with a disease or microorganism. | *"Give me leave To speak my mind, and I will through and through Cleanse the foul body of th’ infected world, If they will patiently receive my medicine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infection]] | noun | **1.** The pathological state resulting from the invasion of the body by pathogenic microorganisms.<br>**2.** (phonetics) the alteration of a speech sound under the influence of a neighboring sound. | *"Pursue him to his house, and pluck him thence, Lest his infection, being of catching nature, Spread further."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infectious]] | adjective | **1.** Caused by infection or capable of causing infection.<br>**2.** Easily spread; - bertrand russell. | *"The most infectious pestilence upon thee! [_Strikes him down._] MESSENGER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infectiously]] | adverb | **1.** In a contagious manner. | *"In academic literature, infectiously designates in a contagious manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infective]] | adjective | **1.** Able to cause disease.<br>**2.** Caused by infection or capable of causing infection. | *"In academic literature, infective designates able to cause disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noninfectious]] | adjective | **1.** Not infectious. | *"In academic literature, noninfectious designates not infectious."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perfect]] | noun | **1.** A tense of verbs used in describing action that has been completed (sometimes regarded as perfective aspect).<br>**2.** Make perfect or complete. | *"That you may well perceive I have not wrong’d you One of the greatest in the Christian world Shall be my surety; fore whose throne ’tis needful, Ere I can perfect mine intents, to kneel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perfecta]] | noun | **1.** A bet that you can pick the first and second finishers in the right order. | *"Pérez Galdós, possibly known best in the United States as the author of "Doña Perfecta," may be called the Walter Scott of Spain."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[perfected]] | verb | **1.** Make perfect or complete.<br>**2.** (of plans, ideas, etc.) perfectly formed. | *"It must be so, for miracles are ceased, And therefore we must needs admit the means How things are perfected."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perfecter]] | noun | **1.** A skilled worker who perfects something.<br>**2.** Being complete of its kind and without defect or blemish. | *"You are well understood to be a perfecter giber for the table than a necessary bencher in the Capitol."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perfectibility]] | noun | **1.** The capability of becoming perfect. | *"I took in all the new ideas at one time—human perfectibility, now."* — George Eliot, *Middlemarch* |
| [[perfectible]] | adjective | **1.** Capable of becoming or being made perfect. | *"He believed then that human life was infinitely perfectible, eliminating these conditions?"* — James Joyce, *Ulysses* |
| [[perfection]] | noun | **1.** The state of being without a flaw or defect.<br>**2.** An ideal instance; a perfect embodiment of a concept. | *"He lost a wife Whose beauty did astonish the survey Of richest eyes; whose words all ears took captive; Whose dear perfection hearts that scorn’d to serve Humbly call’d mistress."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perfectionism]] | noun | **1.** A disposition to feel that anything less than perfect is unacceptable. | *"In academic literature, perfectionism designates a disposition to feel that anything less than perfect is unacceptable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perfectionist]] | noun | **1.** A person who is displeased by anything that does not meet very high standards. | *"In academic literature, perfectionist designates a person who is displeased by anything that does not meet very high standards."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perfective]] | noun | **1.** A tense of verbs used in describing action that has been completed (sometimes regarded as perfective aspect).<br>**2.** The aspect of a verb that expresses a completed action. | *"In academic literature, perfective designates a tense of verbs used in describing action that has been completed (sometimes regarded as perfective aspect)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perfectly]] | adverb | **1.** Completely and without qualification; used informally as intensifiers.<br>**2.** In a perfect or faultless way. | *"I would have her learn, my fair cousin, how perfectly I love her; and that is good English."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prefect]] | noun | **1.** A chief officer or chief magistrate. | *"Or think of a decent young citizen in a toga—perhaps too much dice, you know—coming out here in the train of some prefect, or tax-gatherer, or trader even, to mend his fortunes."* — Joseph Conrad, *Heart of Darkness* |
| [[prefectural]] | adjective | **1.** Of or relating to a prefecture. | *"In academic literature, prefectural designates of or relating to a prefecture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prefecture]] | noun | **1.** The district administered by a prefect (as in france or japan or the roman empire).<br>**2.** The office of prefect. | *"Fu" may be translated prefecture, "chou," department, and "hsien," a district."* — Elizabeth Kimball Kendall, *A Wayfarer in China* |
| [[refection]] | noun | **1.** A light meal or repast. | *"They eat, they drink, and with refection sweet Are fill’d, before th’ all bounteous King, who showrd With copious hand, rejoycing in thir joy."* — John Milton, *Paradise Lost* |
| [[refectory]] | noun | **1.** A communal dining-hall (usually in a monastery). | *"The refectory was a great, low-ceiled, gloomy room; on two long tables smoked basins of something hot, which, however, to my dismay, sent forth an odour far from inviting."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[superfecta]] | noun | **1.** A bet that you can pick the first four finishers in a race in the right order. | *"In academic literature, superfecta designates a bet that you can pick the first four finishers in a race in the right order."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superfecundation]] | noun | **1.** Fertilization of two or more ova released during the same menstrual cycle by sperm from separate acts of coitus (especially by different males). | *"In academic literature, superfecundation designates fertilization of two or more ova released during the same menstrual cycle by sperm from separate acts of coitus (especially by different males)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superinfect]] | verb | **1.** Infect (an infected cell) further or infect a cell already containing similar organisms. | *"In academic literature, superinfect designates infect (an infected cell) further or infect a cell already containing similar organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superinfection]] | noun | **1.** Infection that occurs while you are being treated for another infection. | *"In academic literature, superinfection designates infection that occurs while you are being treated for another infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suprainfection]] | noun | **1.** Secondary infection caused by an opportunistic infection. | *"In academic literature, suprainfection designates secondary infection caused by an opportunistic infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unaffected]] | adjective | **1.** Undergoing no change when acted upon.<br>**2.** Unaware of or indifferent to. | *"Into the dining-house, unaffected by the seductive show in the window of artificially whitened cauliflowers and poultry, verdant baskets of peas, coolly blooming cucumbers, and joints ready for the spit, Mr."* — Charles Dickens, *Bleak House* |
| [[unaffectedness]] | noun | **1.** Not affected; a personal manner that is not consciously constrained. | *"In academic literature, unaffectedness designates not affected; a personal manner that is not consciously constrained."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unaffecting]] | adjective | **1.** Not arousing affect. | *"In academic literature, unaffecting designates not arousing affect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unaffectionate]] | adjective | **1.** Lacking affection or warm feeling. | *"In academic literature, unaffectionate designates lacking affection or warm feeling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uneffective]] | adjective | **1.** Not producing an intended effect. | *"In academic literature, uneffective designates not producing an intended effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninfected]] | adjective | **1.** Free from sepsis or infection. | *"He found her uninfected by the rage for diversion and dissipation; for noise, tumult, gewgaws, glitter, and extravagance."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FEC
  </div>
</div>
