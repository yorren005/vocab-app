---
status: unread
type: root_dashboard
---
# Dashboard — fac
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fac-</span>
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

The root **fac** means to make or do. It refers to the action of making and carrying out this process. In English, this root forms words such as *facile*, *facilitate*, *facility*, and *factor*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to make or do
> The root **fac** means to make or do. It refers to the action of making and carrying out this process. In English, this root forms words such as *facile*, *facilitate*, *facility*, and *factor*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To make or do</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Hands actively pushing a lever or carrying out purposeful work.</mark>
> - **Everyday Connection**: Think of familiar words like *facile* and *facilitate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fac** comes from a Latin word that means *"to make or do"*.
  - At its core, it describes the action of make or do.

- **The Big Picture Idea**:
  - Picture hands actively pushing a lever or carrying out purposeful work.
  - Whenever you see **fac** in an English word, think of **to make or do**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to make or do).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Facile**: Easily accomplished or attained without effort.
  - **Facilitate**: To make an action, process, or task easier or less difficult.
  - **Facility**: Space, equipment, or building provided for a particular purpose.
  - **Factor**: An everyday English word showing the root's idea of *to make or do*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fac</mark>, think of <mark class="hl-def">to make or do</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stem**:
  - `fac-` (< Latin *facere*): Base present stem.
- **Compounding Patterns**:
  - `fac-` + `simile` ("similar"): *facsimile*.
  - `fac-` + `totum` ("everything"): *factotum*.
  - `sub-` + `facere` ($a \to i$): *suffice, sufficient* (< *sufficere*, "to make/put under, supply enough").

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
                      ┌── Ease & Competence: facile, facilitate, facilitator, facility
                      │
    [fac] ────────────┼── Exact Duplication: facsimile
 (To make, do)        │
                      ├── General Agency: factotum
                      │
                      └── Partisanship & Adequacy: faction, factious, suffice, sufficient
```

---

## 🔀 4. Prefix & Combining Dynamics on fac
- **`fac` + `-ile`**: *facile* — easily achieved, effortless; sometimes superficial.
- **`fac` + `simile`**: *facsimile* — an exact copy or reproduction of a document.
- **`sub-` + `fac` ($b \to f, a \to i$)**: *suffice* — to be enough or adequate for a purpose.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Diplomacy & Conflict Resolution**: International *facilitators*; multi-party negotiations.
- **Political Science & Sociology**: Partisan *factions*; Federalist Paper No. 10 on *factionalism*.
- **Archival Science & Paleography**: High-resolution digital *facsimiles* of ancient manuscripts.
- **Architecture & Infrastructure**: Medical *facilities*; advanced manufacturing plants.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[artifact]] | noun | **1.** A man-made object taken as a whole. | *"OK, so this or that artifact doesn't have museum value; it could still be of enduring interest to your family and to the progeny of your progeny's progeny, even unto the xth generation."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[artifactual]] | adjective | **1.** Of or relating to artifacts. | *"In academic literature, artifactual designates of or relating to artifacts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[benefactor]] | noun | **1.** A person who helps people or institutions (especially with financial help). | *"John Jarndyce I had perhaps less reason to be surprised than either of my companions, having never yet enjoyed an opportunity of thanking one who had been my benefactor and sole earthly dependence through so many years."* — Charles Dickens, *Bleak House* |
| [[benefic]] | adjective | **1.** Exerting a favorable or beneficent influence. | *"He will even speak well of the bishop, though I tell him it is unnatural in a beneficed clergyman; what can one do with a husband who attends so little to the decencies?"* — George Eliot, *Middlemarch* |
| [[benefice]] | noun | **1.** An endowed church office giving income to its holder.<br>**2.** Endow with a benefice. | *"In some parishes, where the reputation of the curate in this respect stood higher than that of his rector, the relations between the two have been so strained in consequence that the bishop has had to translate the rector to another benefice."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[beneficed]] | verb | **1.** Endow with a benefice.<br>**2.** Having a benefice. | *"He will even speak well of the bishop, though I tell him it is unnatural in a beneficed clergyman; what can one do with a husband who attends so little to the decencies?"* — George Eliot, *Middlemarch* |
| [[beneficence]] | noun | **1.** Doing good; feeling beneficent.<br>**2.** The quality of being kind or helpful or generous. | *"Each fresh house was the one where they were to abide for ever, and each formed the base of operations for some new scheme of comprehensive beneficence."* — Sydney Waterlow, *Shelley* |
| [[beneficent]] | adjective | **1.** Doing or producing good.<br>**2.** Generous in assistance to the poor. | *"But you are a single person, sir, and may you long be spared to ask a married person such a question!” With this beneficent wish, Mr."* — Charles Dickens, *Bleak House* |
| [[beneficial]] | adjective | **1.** Promoting or enhancing well-being. | *"Therefore, merchant, I’ll limit thee this day To seek thy health by beneficial help."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[beneficially]] | adverb | **1.** In a beneficial manner. | *"Very soon their tent was completed, their "Diet Kitchen" arranged, the valuable supplies they had brought with them ready for distribution, and their work moving on smoothly and beneficially amid all the horrors of this terrible field."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[beneficiary]] | noun | **1.** The recipient of funds or other benefits.<br>**2.** The semantic role of the intended recipient who benefits from the happening denoted by the verb in the clause. | *"The beneficiary must have an _incurable interest_ in the property or person insured; that is, the beneficiary must actually suffer a loss by the occurrence insured against."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[beneficiate]] | verb | **1.** Process (ores or other raw materials), as by reduction. | *"In academic literature, beneficiate designates process (ores or other raw materials), as by reduction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[beneficiation]] | noun | **1.** Crushing and separating ore into valuable substances or waste by any of a variety of techniques. | *"In academic literature, beneficiation designates crushing and separating ore into valuable substances or waste by any of a variety of techniques."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coefficient]] | noun | **1.** A constant number that serves as a measure of some property or characteristic. | *"In academic literature, coefficient designates a constant number that serves as a measure of some property or characteristic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cofactor]] | noun | **1.** A substance (as a coenzyme) that must join with another to produce a given result. | *"In academic literature, cofactor designates a substance (as a coenzyme) that must join with another to produce a given result."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterfactual]] | adjective | **1.** Going counter to the facts (usually as a hypothesis). | *"In academic literature, counterfactual designates going counter to the facts (usually as a hypothesis)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterfactuality]] | noun | **1.** The quality of being contrary to fact. | *"In academic literature, counterfactuality designates the quality of being contrary to fact."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deface]] | verb | **1.** Mar or spoil the appearance of. | *"How shall we then dispense with that contract, And not deface your honour with reproach?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[defacement]] | noun | **1.** The act of damaging the appearance or surface of something. | *"Some people might have cried “Alas, poor Theology!” at the hideous defacement—the last grotesque phase of a creed which had served mankind well in its time."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[deficiency]] | noun | **1.** The state of needing something that is absent or unavailable.<br>**2.** Lack of an adequate quantity or number. | *"I think she would be so much pleased with his mind, that she would very soon see no deficiency in his manner.” “So do I, Anne,” said Charles."* — Jane Austen, *Persuasion* |
| [[deficient]] | adjective | **1.** Inadequate in amount or degree.<br>**2.** Of a quantity not able to fulfill a need or requirement. | *"I’ll look no more; Lest my brain turn, and the deficient sight Topple down headlong."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[deficit]] | noun | **1.** The property of being an amount by which something is less than expected or required.<br>**2.** A deficiency or failure in neurological or mental functioning. | *"But that present of bank-notes, once made, was measurable, and being applied to the amount of the debt, showed a deficit which had still to be filled up either by Fred’s “judgment” or by luck in some other shape."* — George Eliot, *Middlemarch* |
| [[difficult]] | adjective | **1.** Not easy; requiring great physical or mental effort to accomplish or comprehend or endure.<br>**2.** Hard to control; ,. | *"The next difficult and important question to be settled was, who should be allowed to sit beside Uncle Philip at dinner, because those next had the best chance to talk to him."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[difficultness]] | noun | **1.** The quality of being difficult. | *"In academic literature, difficultness designates the quality of being difficult."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[difficulty]] | noun | **1.** An effort that is inconvenient.<br>**2.** A factor causing trouble in achieving a positive result or tending to produce a negative result. | *"If the business be of any difficulty and this morning your departure hence, it requires haste of your lordship."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dissatisfaction]] | noun | **1.** The feeling of being displeased and discontent. | *"He is a kind of man—by George!—that has caused me more restlessness, and more uneasiness, and more dissatisfaction with myself than all other men put together."* — Charles Dickens, *Bleak House* |
| [[dissatisfactory]] | adjective | **1.** Not up to expectations. | *"To have reduced the different qualifications in the different States to one uniform rule, would probably have been as dissatisfactory to some of the States as it would have been difficult to the convention."* — Alexander Hamilton, *The Federalist Papers* |
| [[edification]] | noun | **1.** Uplifting enlightenment. | *"Put the boy aside.” Boy put aside, to the great edification of the audience, especially of Little Swills, the comic vocalist."* — Charles Dickens, *Bleak House* |
| [[edifice]] | noun | **1.** A structure that has a roof and walls and stands more or less permanently in one place. | *"Like a fair house built on another man’s ground, so that I have lost my edifice by mistaking the place where I erected it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[efface]] | verb | **1.** Remove completely from recognition or memory.<br>**2.** Make inconspicuous. | *"If aught that giver from my mind efface, If I that giver’s bounty e’er disgrace, Then roll to me along your wand’rig spheres, Only to number out a villain’s years!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[effaceable]] | adjective | **1.** Capable of being effaced. | *"In academic literature, effaceable designates capable of being effaced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[effacement]] | noun | **1.** Shortening of the uterine cervix and thinning of its walls as it is dilated during labor.<br>**2.** Withdrawing into the background; making yourself inconspicuous. | *"This self-effacement in both directions had been quite in consonance with her independent character of desiring nothing by way of favour or pity to which she was not entitled on a fair consideration of her deserts."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[efficacious]] | adjective | **1.** Marked by qualities giving the power to produce an intended effect; -aldous huxley.<br>**2.** Producing or capable of producing an intended result or having a striking effect; -lewismumford. | *"An _intelligent_ faith can never allow dependence upon means used to take the place of dependence upon the living God, who alone makes them efficacious."* — Classic Author, *The wonders of prayer* |
| [[efficaciously]] | adverb | **1.** In an effective manner. | *"It does more certainly, more clearly and efficaciously, behold all things, than by the vulgar inquiry of the intellect and by the discourse of reason."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[efficaciousness]] | noun | **1.** Capacity or power to produce a desired effect. | *"In academic literature, efficaciousness designates capacity or power to produce a desired effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[efficacy]] | noun | **1.** Capacity or power to produce a desired effect. | *"Elizabeth had nothing to propose of deeper efficacy."* — Jane Austen, *Persuasion* |
| [[efficiency]] | noun | **1.** The ratio of the output to the input of any system.<br>**2.** Skillfulness in avoiding wasted time and effort. | *"It fortunately happened that the work to which John had now to turn his hand allowed him an opportunity of carrying on his studies without interfering with its efficiency."* — John Cairns, *Principal Cairns* |
| [[efficient]] | adjective | **1.** Being effective without wasting time or effort or expense.<br>**2.** Able to accomplish a purpose; functioning effectively; -g.b.shaw. | *"I tried to show the guards a score or so of more efficient ways."* — Jack London, *The Jacket (The Star-Rover)* |
| [[efficiently]] | adverb | **1.** With efficiency; in an efficient manner. | *"Crises are more severe in countries with more extensive use of money and credit, but still more severe where the credit system is more loosely administered and less efficiently coördinated."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[facade]] | noun | **1.** The face or front of a building.<br>**2.** A showy misrepresentation intended to conceal something unpleasant. | *"The Dovenilid gave him a piercing look, but Marlowe presented a featureless facade of bulk."* — Algis Budrys, *Citadel* |
| [[face]] | noun | **1.** The front of the human head from the forehead to the chin and ear to ear.<br>**2.** The feelings expressed on a person's face. | *"Save that my soul’s imaginary sight Presents thy shadow to my sightless view, Which like a jewel (hung in ghastly night) Makes black night beauteous, and her old face new."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[face-harden]] | verb | **1.** Harden steel by adding carbon. | *"In academic literature, face-harden designates harden steel by adding carbon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[face-lift]] | verb | **1.** Perform cosmetic surgery on someone's face. | *"In academic literature, face-lift designates perform cosmetic surgery on someone's face."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[face-off]] | noun | **1.** A hostile disagreement face-to-face.<br>**2.** (ice hockey) the method of starting play; a referee drops the puck between two opposing players. | *"In academic literature, face-off designates a hostile disagreement face-to-face."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[face-saving]] | adjective | **1.** Maintaining dignity or prestige. | *"In academic literature, face-saving designates maintaining dignity or prestige."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[face-to-face]] | adjective | **1.** In each other's presence.<br>**2.** Within each other's presence. | *"In academic literature, face-to-face designates in each other's presence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[faced]] | verb | **1.** Deal with (something unpleasant) head on.<br>**2.** Oppose, as in hostility or a competition. | *"Along with them They brought one Pinch, a hungry lean-faced villain, A mere anatomy, a mountebank, A threadbare juggler, and a fortune-teller; A needy, hollow-ey’d, sharp-looking wretch; A living dead man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[faceless]] | adjective | **1.** Without a face or identity. | *"In academic literature, faceless designates without a face or identity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facelift]] | noun | **1.** Plastic surgery to remove wrinkles and other signs of aging from your face; an incision is made near the hair line and skin is pulled back and excess tissue is excised.<br>**2.** A renovation that improves the outward appearance (as of a building) but usually does not involve major changes. | *"In academic literature, facelift designates plastic surgery to remove wrinkles and other signs of aging from your face; an incision is made near the hair line and skin is pulled back and excess tissue is excised."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[faceplate]] | noun | **1.** A protective covering for the front of a machine or device (as a door lock or computer component). | *"If anyone comes looking for a fight, don't wait for an invitation." Kumiko nodded and closed her faceplate."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[facer]] | noun | **1.** (a dated briticism) a serious difficulty with which one is suddenly faced. | *"In academic literature, facer designates (a dated briticism) a serious difficulty with which one is suddenly faced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facet]] | noun | **1.** A distinct feature or element in a problem.<br>**2.** A smooth surface (as of a bone or cut gemstone). | *"In the larger and older jewels every facet may stand for a bloody deed."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[faceted]] | adjective | **1.** Having facets. | *"And all for me!” On the same day the Chief of Police came to Pierre, inviting him to send a representative to the Faceted Palace to recover things that were to be returned to their owners that day."* — graf Leo Tolstoy, *War and Peace* |
| [[facetious]] | adjective | **1.** Cleverly amusing in tone. | *"You must grow your hair for the marriage knot,” Yunsan warned me one day, with the ghost of a twinkle in his austere eyes, more nearly facetious and human than I had ever beheld him."* — Jack London, *The Jacket (The Star-Rover)* |
| [[facetiously]] | adverb | **1.** Not seriously. | *"He is facetiously understood to entertain a passion for a lady at a cigar-shop in the neighbourhood of Chancery Lane and for her sake to have broken off a contract with another lady, to whom he had been engaged some years."* — Charles Dickens, *Bleak House* |
| [[facetiousness]] | noun | **1.** Playful humor. | *"I'm becoming a mere bundle of quivering ganglions." I loath facetiousness in moments of stress."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[facia]] | noun | **1.** A sheet or band of fibrous connective tissue separating or binding together muscles and organs etc. | *"In academic literature, facia designates a sheet or band of fibrous connective tissue separating or binding together muscles and organs etc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facial]] | noun | **1.** Cranial nerve that supplies facial muscles.<br>**2.** Care for the face that usually involves cleansing and massage and the application of cosmetic creams. | *"The room inside was lighted only by the ruddy glow from the kiln mouth, which shone over the floor with the streaming horizontality of the setting sun, and threw upwards the shadows of all facial irregularities in those assembled around."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[facially]] | adverb | **1.** With respect to the face. | *"In academic literature, facially designates with respect to the face."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facile]] | adjective | **1.** Arrived at without due care or effort; lacking depth.<br>**2.** Performing adroitly and without effort. | *"There was plenty of eggs, butter, bread, and so on in the larder, and Clare soon had breakfast laid, his experiences at the dairy having rendered him facile in domestic preparations."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[facilitate]] | verb | **1.** Make easier.<br>**2.** Be of use. | *"This will stimulate agricultural improvement, and facilitate the purchase of land by tenants."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[facilitation]] | noun | **1.** The condition of being made easy (or easier).<br>**2.** (neurophysiology) phenomenon that occurs when two or more neural impulses that alone are not enough to trigger a response in a neuron combine to trigger an action potential. | *"Whereas from our present _via media_--facilitation of divorce--can only result the era when the young lady in reduced circumstances will no longer turn governess but will be open to engagement as wife at a reasonable stipend."* — Francis Thompson, *Shelley: An Essay* |
| [[facilitative]] | adjective | **1.** Freeing from difficulty or impediment. | *"In academic literature, facilitative designates freeing from difficulty or impediment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facilitator]] | noun | **1.** Someone who makes progress easier. | *"In academic literature, facilitator designates someone who makes progress easier."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facilitatory]] | adjective | **1.** Inducing or aiding in facilitating neural activity. | *"In academic literature, facilitatory designates inducing or aiding in facilitating neural activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facility]] | noun | **1.** A building or place that provides a particular service or is used for a particular industry.<br>**2.** Skillful performance or ability without difficulty. | *"I will something affect the letter; for it argues facility."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[facing]] | noun | **1.** A lining applied to the edge of a garment for ornamentation or strengthening.<br>**2.** An ornamental coating to a building. | *"Tulkinghorn sits, facing round, on a stool at the desk."* — Charles Dickens, *Bleak House* |
| [[facsimile]] | noun | **1.** An exact copy or reproduction.<br>**2.** Duplicator that transmits the copy by wire or radio. | *"Each utensil, spoon, fork, knife, plate, had a letter engraved on it, with a motto above it, of which this is an exact facsimile:— MOBILIS IN MOBILI N."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[fact]] | noun | **1.** A piece of information about circumstances that exist or events that have occurred.<br>**2.** A statement or assertion of verified information about something that is the case or has happened. | *"Why then tonight Let us assay our plot; which, if it speed, Is wicked meaning in a lawful deed, And lawful meaning in a lawful act, Where both not sin, and yet a sinful fact."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fact-finding]] | adjective | **1.** Designed to find information or ascertain facts. | *"In academic literature, fact-finding designates designed to find information or ascertain facts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[faction]] | noun | **1.** A clique (often secret) that seeks power usually through intrigue.<br>**2.** A dissenting clique. | *"I will bandy with thee in faction; will o’errun thee with policy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[factional]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin fac within the domain of Action.<br>**2.** A technical or specialized form exhibiting the properties of fac in systematic terminology. | *"Fenton, his factional opponent, was also there."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[factious]] | adjective | **1.** Dissenting (especially dissenting with the majority opinion). | *"Good Lord, what madness rules in brainsick men, When for so slight and frivolous a cause Such factious emulations shall arise!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[factitious]] | adjective | **1.** Not produced by natural forces. | *"I have never done you a single kindness, and why should you be so kind to me?” A factitious reply had been again upon his lips, but it was again suspended, and he looked at her with an arrested eye."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[factoid]] | noun | **1.** Something resembling a fact; unverified (often invented) information that is given credibility because it appeared in print.<br>**2.** A brief (usually one sentence and usually trivial) news item. | *"In academic literature, factoid designates something resembling a fact; unverified (often invented) information that is given credibility because it appeared in print."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[factor]] | noun | **1.** Anything that contributes causally to a result.<br>**2.** An abstract part of something. | *"Percy is but my factor, good my lord, To engross up glorious deeds on my behalf, And I will call him to so strict account That he shall render every glory up, Yea, even the slightest worship of his time, Or I will tear the reckoning from his heart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[factorial]] | noun | **1.** The product of all the integers up to and including a given integer.<br>**2.** Of or relating to factorials. | *"In academic literature, factorial designates the product of all the integers up to and including a given integer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[factoring]] | noun | **1.** (mathematics) the resolution of an entity into factors such that when multiplied together they give the original entity.<br>**2.** Resolve into factors. | *"In academic literature, factoring designates (mathematics) the resolution of an entity into factors such that when multiplied together they give the original entity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[factorisation]] | noun | **1.** (mathematics) the resolution of an entity into factors such that when multiplied together they give the original entity. | *"In academic literature, factorisation designates (mathematics) the resolution of an entity into factors such that when multiplied together they give the original entity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[factorise]] | verb | **1.** Resolve (a polynomial) into factors. | *"In academic literature, factorise designates resolve (a polynomial) into factors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[factorization]] | noun | **1.** (mathematics) the resolution of an entity into factors such that when multiplied together they give the original entity. | *"In academic literature, factorization designates (mathematics) the resolution of an entity into factors such that when multiplied together they give the original entity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[factorize]] | verb | **1.** Resolve (a polynomial) into factors. | *"In academic literature, factorize designates resolve (a polynomial) into factors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[factory]] | noun | **1.** A plant consisting of one or more buildings with facilities for manufacturing. | *"A son will sometimes make it known to his father that he has fallen in love, say, with a young woman in the factory."* — Charles Dickens, *Bleak House* |
| [[factory-made]] | adjective | **1.** Produced in quantity at a factory. | *"In academic literature, factory-made designates produced in quantity at a factory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[factotum]] | noun | **1.** A servant employed to do a variety of jobs. | *"The old man who was his indoor factotum came at the same moment to the foot of the stairs."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[factual]] | adjective | **1.** Existing in act or fact.<br>**2.** Of or relating to or characterized by facts. | *"I have traced it down to several families, but none could tell me anything about it that was factual."* — Don Peterson, *The White Feather Hex* |
| [[factuality]] | noun | **1.** The quality of being actual or based on fact. | *"In academic literature, factuality designates the quality of being actual or based on fact."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[factually]] | adverb | **1.** As a fact or based on fact. | *"In academic literature, factually designates as a fact or based on fact."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[factualness]] | noun | **1.** The quality of being actual or based on fact. | *"In academic literature, factualness designates the quality of being actual or based on fact."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[facula]] | noun | **1.** A bright spot on a planet.<br>**2.** A large bright spot on the sun's photosphere occurring most frequently in the vicinity of sunspots. | *"Consuetum item est hac vigilia ardentes deferri faculas quod Johannes fuerit ardens lucerna, et qui vias Domini praeparaverit."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[facultative]] | adjective | **1.** Of or relating to the mental faculties.<br>**2.** Able to exist under more than one set of conditions. | *"In academic literature, facultative designates of or relating to the mental faculties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[faculty]] | noun | **1.** One of the inherent cognitive or perceptual powers of the mind.<br>**2.** The body of teachers and administrators at a school. | *"Having a faculty, matured on the tops of baggage-waggons and in other such positions, of resting easily anywhere, she perches on a rough bench, unties her bonnet-strings, pushes back her bonnet, crosses her arms, and looks perfectly comfortable."* — Charles Dickens, *Bleak House* |
| [[fica]] | noun | **1.** A tax on employees and employers that is used to fund the social security system. | *"In academic literature, fica designates a tax on employees and employers that is used to fund the social security system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fice]] | noun | **1.** A nervous belligerent little mongrel dog. | *"In academic literature, fice designates a nervous belligerent little mongrel dog."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fictile]] | adjective | **1.** Of or relating to the craft of pottery.<br>**2.** Susceptible to being led or directed. | *"In academic literature, fictile designates of or relating to the craft of pottery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fiction]] | noun | **1.** A literary work based on the imagination and not necessarily on fact.<br>**2.** A deliberately false or improbable account. | *"E’en so, sir, as I say. [_To the Poet_.] And for thy fiction, Why, thy verse swells with stuff so fine and smooth That thou art even natural in thine art."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fictional]] | adjective | **1.** Related to or involving literary fiction.<br>**2.** Formed or conceived by the imagination. | *"In academic literature, fictional designates related to or involving literary fiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fictionalisation]] | noun | **1.** A literary work based partly or wholly on fact but written as if it were fiction.<br>**2.** Writing in a fictional form. | *"In academic literature, fictionalisation designates a literary work based partly or wholly on fact but written as if it were fiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fictionalise]] | verb | **1.** Make into fiction.<br>**2.** Convert into the form or the style of a novel. | *"In academic literature, fictionalise designates make into fiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fictionalization]] | noun | **1.** A literary work based partly or wholly on fact but written as if it were fiction.<br>**2.** Writing in a fictional form. | *"In academic literature, fictionalization designates a literary work based partly or wholly on fact but written as if it were fiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fictionalize]] | verb | **1.** Make into fiction.<br>**2.** Convert into the form or the style of a novel. | *"In academic literature, fictionalize designates make into fiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fictitious]] | adjective | **1.** Formed or conceived by the imagination.<br>**2.** Adopted in order to deceive. | *"The gamblers constitute themselves a little fictitious economic circle, and they transfer gains and losses on the turn of events that have no practical objective result within their circle except to determine the direction of the transfer."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[fictitiously]] | adverb | **1.** In a false manner intended to mislead.<br>**2.** In a fictional manner (created by the imagination). | *"In academic literature, fictitiously designates in a false manner intended to mislead."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fictive]] | adjective | **1.** Adopted in order to deceive.<br>**2.** Capable of imaginative creation. | *"I have always fondly remembered a remark that I heard fall years ago from the lips of Ivan Turgenieff in regard to his own experience of the usual origin of the fictive picture."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[ficus]] | noun | **1.** Large genus of tropical trees or shrubs or climbers including fig trees. | *"Buddhism, whose awakening is placed under the shelter of the bo or bodhi-tree (_ficus religiosa_), the Buddhist tree of knowledge, bases its existence on gnosis."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[inefficacious]] | adjective | **1.** Lacking the power to produce a desired effect. | *"The sword is the braver way, although all ways are equally inefficacious."* — Jack London, *The Jacket (The Star-Rover)* |
| [[inefficaciously]] | adverb | **1.** In an ineffective manner. | *"In academic literature, inefficaciously designates in an ineffective manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inefficaciousness]] | noun | **1.** A lack of efficacy. | *"In academic literature, inefficaciousness designates a lack of efficacy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inefficacy]] | noun | **1.** A lack of efficacy. | *"HAMILTON To the People of the State of New York: After an unequivocal experience of the inefficacy of the subsisting federal government, you are called upon to deliberate on a new Constitution for the United States of America."* — Alexander Hamilton, *The Federalist Papers* |
| [[inefficiency]] | noun | **1.** Unskillfulness resulting from a lack of efficiency. | *"I emerged and tried to work in the chaos of inefficiency of the loom-rooms."* — Jack London, *The Jacket (The Star-Rover)* |
| [[inefficient]] | adjective | **1.** Not producing desired results; wasteful.<br>**2.** Lacking the ability or skill to perform effectively; inadequate. | *"There was Slant-Eyed Wilson, with an unguessed weak heart of fear, who died in the jacket within the first hour while the unconvinced inefficient of a prison doctor looked on and smiled."* — Jack London, *The Jacket (The Star-Rover)* |
| [[inefficiently]] | adverb | **1.** In an inefficient manner. | *"In academic literature, inefficiently designates in an inefficient manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insufficiency]] | noun | **1.** A lack of competence.<br>**2.** (pathology) inability of a bodily part or organ to function normally. | *"Is’t not enough, is’t not enough, young man, That I did never, no, nor never can Deserve a sweet look from Demetrius’ eye, But you must flout my insufficiency?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[insufficient]] | adjective | **1.** Of a quantity not able to fulfill a need or requirement. | *"A thick and dingy Turkey-carpet muffles the floor where he sits, attended by two candles in old-fashioned silver candlesticks that give a very insufficient light to his large room."* — Charles Dickens, *Bleak House* |
| [[insufficiently]] | adverb | **1.** To an insufficient degree. | *"He thought the season insufficiently advanced."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[interface]] | noun | **1.** (chemistry) a surface forming a common boundary between two things (two objects or liquids or chemical phases).<br>**2.** (computer science) a program that controls a display for the user (usually on a computer monitor) and that allows the user to interact with the system. | *"Your sector coordinates are in the capsule; use standard locks to interface the coordinates with your ship's flight controls."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[interfacial]] | adjective | **1.** Relating to or situated at an interface. | *"In academic literature, interfacial designates relating to or situated at an interface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[magnification]] | noun | **1.** The act of expanding something in apparent size.<br>**2.** The ratio of the size of an image to the size of the object. | *"For by a Portuguese Catholic priest, this very idea of Jonah’s going to Nineveh via the Cape of Good Hope was advanced as a signal magnification of the general miracle."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[magnificence]] | noun | **1.** Splendid or imposing in size or appearance.<br>**2.** The quality of being magnificent or splendid or grand. | *"We cannot with such magnificence—in so rare—I know not what to say."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[magnificent]] | adjective | **1.** Characterized by grandeur. | *"A letter from the magnificent Armado."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[magnificently]] | adverb | **1.** Extremely well.<br>**2.** In an impressively beautiful manner. | *"Go away!” Sir Leicester has magnificently disengaged himself from the subject and retired into the sanctuary of his blue coat."* — Charles Dickens, *Bleak House* |
| [[malefaction]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin fac within the domain of Action.<br>**2.** A technical or specialized form exhibiting the properties of fac in systematic terminology. | *"I have heard That guilty creatures sitting at a play, Have by the very cunning of the scene, Been struck so to the soul that presently They have proclaim’d their malefactions."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[malefactor]] | noun | **1.** Someone who has committed a crime or has been legally convicted of a crime. | *"But yet” is as a gaoler to bring forth Some monstrous malefactor."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[manufacture]] | noun | **1.** The organized action of making of goods and services for sale.<br>**2.** The act of making something (a product) from raw materials. | *"Above all there was a case of jewellery, containing four heavy gold bracelets and several lockets and rings, all of fine quality and manufacture."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[manufactured]] | verb | **1.** Put together out of artificial or natural components or parts; ; ; he manufactured a popular cereal".<br>**2.** Make up something artificial or untrue. | *"The abstraction was a cheat and a lie manufactured in the priestly mind."* — Jack London, *The Jacket (The Star-Rover)* |
| [[manufacturer]] | noun | **1.** A business engaged in manufacturing some product.<br>**2.** Someone who manufactures something. | *"The price of manufacturer's products rose in advance of the rise of costs of many raw materials and especially of the labor costs of manufacture."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[manufacturing]] | noun | **1.** The act of making something (a product) from raw materials.<br>**2.** Put together out of artificial or natural components or parts; ; ; he manufactured a popular cereal". | *"THE LORD WOKE ME UP IN TIME TO SAVE MY CLOTHES." In the very top of a four-story building, used only for various manufacturing purposes, lived an old man and daughter."* — Classic Author, *The wonders of prayer* |
| [[nonfiction]] | noun | **1.** Prose writing that is not fictional. | *"In academic literature, nonfiction designates prose writing that is not fictional."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonfictional]] | adjective | **1.** Not fictional. | *"In academic literature, nonfictional designates not fictional."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[office]] | noun | **1.** Place of business where professional or clerical duties are performed.<br>**2.** An administrative unit of government. | *"I will no more enforce mine office on you, Humbly entreating from your royal thoughts A modest one to bear me back again."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[office-bearer]] | noun | **1.** The person who holds an office. | *"In academic literature, office-bearer designates the person who holds an office."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[officeholder]] | noun | **1.** Someone who is appointed or elected to an office and who holds a position of trust.<br>**2.** The official who holds an office. | *"In academic literature, officeholder designates someone who is appointed or elected to an office and who holds a position of trust."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[officer]] | noun | **1.** Any person in the armed services who holds a position of authority or command.<br>**2.** Someone who is appointed or elected to an office and who holds a position of trust. | *"I know that knave; hang him! one Parolles; a filthy officer he is in those suggestions for the young earl."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[official]] | noun | **1.** A worker who holds or is invested with an office.<br>**2.** Someone who administers the rules of a game or sport. | *"Remains That in th’ official marks invested, you Anon do meet the Senate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[officialdom]] | noun | **1.** People elected or appointed to administer a government. | *"Such was our introduction to the officialdom of Cho-Sen."* — Jack London, *The Jacket (The Star-Rover)* |
| [[officialese]] | noun | **1.** The style of writing characteristic of some government officials: formal and obscure. | *"In academic literature, officialese designates the style of writing characteristic of some government officials: formal and obscure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[officialise]] | verb | **1.** Make official. | *"In academic literature, officialise designates make official."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[officialize]] | verb | **1.** Make official. | *"In academic literature, officialize designates make official."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[officially]] | adverb | **1.** In an official role.<br>**2.** With official authorization. | *"And they assured me that they would do it officially without any hurt to their own official skins."* — Jack London, *The Jacket (The Star-Rover)* |
| [[officiant]] | noun | **1.** A clergyman who officiates at a religious ceremony or service. | *"In academic literature, officiant designates a clergyman who officiates at a religious ceremony or service."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[officiate]] | verb | **1.** Act in an official capacity in a ceremony or religious ritual, such as a wedding.<br>**2.** Perform duties attached to a particular office or place or function. | *"The owners, who officiate as caterers for the voyage, supply the larder with an abundance of dainties."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[officiating]] | noun | **1.** The act of umpiring.<br>**2.** Act in an official capacity in a ceremony or religious ritual, such as a wedding. | *"The officiating curate, who had not yet doffed his surplice, perceived the new-comer, and followed him to the communion-space."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[officiation]] | noun | **1.** The act of umpiring.<br>**2.** The performance of a religious or ceremonial or public duty. | *"In academic literature, officiation designates the act of umpiring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[officious]] | adjective | **1.** Intrusive in a meddling or offensive manner. | *"Till I find more than will or words to do it— I mean your malice—know, officious lords, I dare and must deny it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[officiously]] | adverb | **1.** In an officious manner. | *"The only thing is that I may well be asked, I acknowledge, why then, in the present fiction, I have suffered Henrietta (of whom we have indubitably too much) so officiously, so strangely, so almost inexplicably, to pervade."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[officiousness]] | noun | **1.** Aggressiveness as evidenced by intruding; by advancing yourself or your ideas without invitation. | *"In fact, my loneliness has liquefied my gaseous affection into what almost looks like officiousness."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[olfaction]] | noun | **1.** The faculty that enables us to distinguish scents. | *"In academic literature, olfaction designates the faculty that enables us to distinguish scents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[olfactive]] | adjective | **1.** Of or relating to olfaction. | *"In academic literature, olfactive designates of or relating to olfaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pacific]] | noun | **1.** The largest ocean in the world.<br>**2.** Relating to or bordering the pacific ocean. | *"He has no idea, poor wretch, of the spiritual destitution of a coral reef in the Pacific or what it costs to look up the precious souls among the coco-nuts and bread-fruit."* — Charles Dickens, *Bleak House* |
| [[petrifaction]] | noun | **1.** The process of turning some plant material into stone by infiltration with water carrying mineral particles without changing the original shape.<br>**2.** A rock created by petrifaction; an organic object infiltrated with mineral matter and preserved in its original form. | *"Shall Man, such step within his endeavor, Man’s face, have no more play and action Than joy which is crystallized forever, Or grief, an eternal petrifaction? -- St. 18. life’s minute: life’s short span. 19."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[postfacto]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin fac within the domain of Action.<br>**2.** A technical or specialized form exhibiting the properties of fac in systematic terminology. | *"In academic literature, postfacto designates pertaining to, derived from, or characteristic of latin fac within the domain of action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preface]] | noun | **1.** A short introductory essay preceding the text of a book.<br>**2.** Furnish with a preface or introduction. | *"EMILIA. ’Twas an excellent dance, And, for a preface, I never heard a better."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[proficiency]] | noun | **1.** The quality of having great facility and competence.<br>**2.** Skillfulness in the command of fundamentals deriving from practice and familiarity. | *"Writing and accounts she was taught by her father; French by her mother: her proficiency in either was not remarkable, and she shirked her lessons in both whenever she could."* — Jane Austen, *Northanger Abbey* |
| [[proficient]] | adjective | **1.** Having or showing knowledge and skill and aptitude.<br>**2.** Of or relating to technique or proficiency in a practical skill. | *"The two of the living dead had become three, and we had so much to say, while the manner of saying it was exasperatingly slow and I was not so proficient as they at the knuckle game."* — Jack London, *The Jacket (The Star-Rover)* |
| [[proficiently]] | adverb | **1.** In a proficient manner. | *"In academic literature, proficiently designates in a proficient manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[putrefaction]] | noun | **1.** A state of decay usually accompanied by an offensive odor.<br>**2.** (biology) the process of decay caused by bacterial or fungal action. | *"Directly Rostóv entered the door he was enveloped by a smell of putrefaction and hospital air."* — graf Leo Tolstoy, *War and Peace* |
| [[putrefactive]] | adjective | **1.** Causing or promoting bacterial putrefaction. | *"In academic literature, putrefactive designates causing or promoting bacterial putrefaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reface]] | verb | **1.** Put a new facing on (a garment).<br>**2.** Provide with a new facing. | *"In academic literature, reface designates put a new facing on (a garment)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resurface]] | verb | **1.** Reappear on the surface.<br>**2.** Cover with a new surface. | *"In academic literature, resurface designates reappear on the surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sacrifice]] | noun | **1.** The act of losing or surrendering something as a penalty for a mistake or fault or failure to perform etc.<br>**2.** Personnel that are sacrificed (e.g., surrendered or lost in order to gain an objective). | *"Why, sir, give the gods a thankful sacrifice."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sacrificeable]] | adjective | **1.** May be deliberately sacrificed to achieve an objective. | *"In academic literature, sacrificeable designates may be deliberately sacrificed to achieve an objective."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sacrificer]] | noun | **1.** A religious person who offers up a sacrifice. | *"Moore is probably right in the use of the capital _d_, as the sacrificer is, according to all accounts, a highly devout Christian."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[sacrificial]] | adjective | **1.** Used in or connected with a sacrifice. | *"All those which were his fellows but of late, Some better than his value, on the moment Follow his strides, his lobbies fill with tendance, Rain sacrificial whisperings in his ear, Make sacred even his stirrup, and through him Drink the free air."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satisfaction]] | noun | **1.** The contentment one feels when one has fulfilled a desire, need, or expectation.<br>**2.** State of being gratified or satisfied. | *"You know since Pentecost the sum is due, And since I have not much importun’d you, Nor now I had not, but that I am bound To Persia, and want guilders for my voyage; Therefore make present satisfaction, Or I’ll attach you by this officer."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[satisfactorily]] | adverb | **1.** In a satisfactory manner. | *"Bucket for a little private confabulation, tells his tale satisfactorily, though out of breath."* — Charles Dickens, *Bleak House* |
| [[satisfactoriness]] | noun | **1.** The quality of giving satisfaction sufficient to meet a demand or requirement. | *"Then I shall respect your opinion of their satisfactoriness as a staff of life."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[satisfactory]] | adjective | **1.** Giving satisfaction.<br>**2.** Meeting requirements. | *"Do what I want, and I will pay you well.” Jo attends closely while the words are being spoken; tells them off on his broom-handle, finding them rather hard; pauses to consider their meaning; considers it satisfactory; and nods his ragged head."* — Charles Dickens, *Bleak House* |
| [[scientific]] | adjective | **1.** Of or relating to the practice of science.<br>**2.** Conforming with the principles or methods used in science. | *"Not in a scientific way, as I expect he does, but by ear."* — Charles Dickens, *Bleak House* |
| [[subsurface]] | adjective | **1.** Beneath the surface. | *"The view screen readouts showed subsurface galleries, several outlined in irregular outlines but empty, others reflected high-mass warship configurations."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[suffice]] | verb | **1.** Be sufficient; be adequate, either in quality or quantity. | *"Come, let’s return again, and suffice ourselves with the report of it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sufficiency]] | noun | **1.** Sufficient resources to provide comfort and meet obligations.<br>**2.** An adequate quantity; a quantity that is large enough to achieve a purpose. | *"Then no more remains But that, to your sufficiency, as your worth is able, And let them work."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sufficient]] | adjective | **1.** Of a quantity that can fulfill a need or requirement but without being abundant. | *"If I bring you no sufficient testimony that I have enjoy’d the dearest bodily part of your mistress, my ten thousand ducats are yours; so is your diamond too."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sufficiently]] | adverb | **1.** To a sufficient degree. | *"I grieve to hear what torments you endured, But we will be revenged sufficiently."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superficial]] | adjective | **1.** Concerned with or comprehending only what is apparent or obvious; not deep or penetrating emotionally or intellectually.<br>**2.** Of, affecting, or being on or near the surface. | *"A very superficial, ignorant, unweighing fellow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superficiality]] | noun | **1.** Lack of depth of knowledge or thought or feeling.<br>**2.** Shallowness in terms of affecting only surface layers of something. | *"The education had intensified the cardinal faults of his character, impatience, superficiality, a great lack of sympathy for the more tender attachments and the more profound interests of men--essential unbelief in human grandeur."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[superficially]] | adverb | **1.** In a superficial manner. | *"Paris and Troilus, you have both said well; And on the cause and question now in hand Have gloz’d, but superficially; not much Unlike young men, whom Aristotle thought Unfit to hear moral philosophy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[superficies]] | noun | **1.** The purely external aspect of a thing; superficial appearance; -r.w.speaight.<br>**2.** Outer surface of an area or a body. | *"As if a woman were a mere colored superficies!"* — George Eliot, *Middlemarch* |
| [[surface]] | noun | **1.** The outer boundary of an artifact or a material layer constituting or resembling such a boundary.<br>**2.** The extended two-dimensional outer boundary of a three-dimensional object. | *"The adjacent low-lying ground for half a mile in breadth is a stagnant river with melancholy trees for islands in it and a surface punctured all over, all day long, with falling rain."* — Charles Dickens, *Bleak House* |
| [[surface-active]] | adjective | **1.** Capable of lowering the surface tension of a liquid; used especially of detergents. | *"In academic literature, surface-active designates capable of lowering the surface tension of a liquid; used especially of detergents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surface-assimilative]] | adjective | **1.** Having capacity or tendency to adsorb or cause to accumulate on a surface. | *"In academic literature, surface-assimilative designates having capacity or tendency to adsorb or cause to accumulate on a surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surface-mine]] | verb | **1.** Extract (ore) from a strip-mine. | *"In academic literature, surface-mine designates extract (ore) from a strip-mine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surface-to-air]] | adjective | **1.** Operating from or designed to be launched from the ground against an airborne target. | *"In academic literature, surface-to-air designates operating from or designed to be launched from the ground against an airborne target."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surfacing]] | noun | **1.** Emerging to the surface and becoming apparent.<br>**2.** Come to the surface. | *"In academic literature, surfacing designates emerging to the surface and becoming apparent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surfactant]] | noun | **1.** A chemical agent capable of reducing the surface tension of a liquid in which it is dissolved. | *"In academic literature, surfactant designates a chemical agent capable of reducing the surface tension of a liquid in which it is dissolved."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surficial]] | adjective | **1.** Pertaining to or occurring on or near the earth's surface. | *"In academic literature, surficial designates pertaining to or occurring on or near the earth's surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terrific]] | adjective | **1.** Very great or intense.<br>**2.** Extraordinarily good or great ; used especially as intensifiers. | *"Suddenly a terrific shout of joy sounded from all voices at once as they all called: "Uncle Phipp!"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[unbeneficed]] | adjective | **1.** Not having a benefice. | *"In academic literature, unbeneficed designates not having a benefice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undersurface]] | noun | **1.** The lower side of anything. | *"In academic literature, undersurface designates the lower side of anything."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unfaceted]] | adjective | **1.** Lacking facets. | *"In academic literature, unfaceted designates lacking facets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unofficial]] | adjective | **1.** Not having official authority or sanction.<br>**2.** Not officially established. | *"Of course, in your position of unofficial adviser and helper to everybody who is absolutely puzzled, throughout three continents, you are brought in contact with all that is strange and bizarre."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[unofficially]] | adverb | **1.** Without official authorization.<br>**2.** Not in an official capacity. | *"Tranquilly permitting these irregular cursings to evaporate, Stubb then in a plain, business-like, but still half humorous manner, cursed Pip officially; and that done, unofficially gave him much wholesome advice."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[unsatisfactorily]] | adverb | **1.** In an unsatisfactory manner. | *"What is a 'creature,' Miss Derrick?" "Pamela in your book is a creature," she replied unsatisfactorily, with the slightest tilt of the chin."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[unsatisfactoriness]] | noun | **1.** The quality of being inadequate or unsuitable. | *"In academic literature, unsatisfactoriness designates the quality of being inadequate or unsuitable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsatisfactory]] | adjective | **1.** Not giving satisfaction. | *"Mary never wrote to Bath herself; all the toil of keeping up a slow and unsatisfactory correspondence with Elizabeth fell on Anne."* — Jane Austen, *Persuasion* |
| [[unscientific]] | adjective | **1.** Not consistent with the methods or principles of science. | *"Capital punishment is so _silly_, so stupid, so horribly unscientific."* — Jack London, *The Jacket (The Star-Rover)* |

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
    ROOT DASHBOARD · FAC
  </div>
</div>
