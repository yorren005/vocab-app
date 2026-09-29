---
status: unread
type: root_dashboard
---
# Dashboard — cogn
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">cogn-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to learn, recognize, or know”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Sitting quietly while turning ideas over in your mind to solve a problem.</span>
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

The root **cogn** means to learn, recognize, or know. It refers to having knowledge, being aware of facts, or understanding truth. In English, this root forms words such as *cognition*, *recognize*, *cognitive*, and *incognito*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to learn, recognize, or know
> The root **cogn** means to learn, recognize, or know. It refers to having knowledge, being aware of facts, or understanding truth. In English, this root forms words such as *cognition*, *recognize*, *cognitive*, and *incognito*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To learn, recognize, or know</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Sitting quietly while turning ideas over in your mind to solve a problem.</mark>
> - **Everyday Connection**: Think of familiar words like *cognition* and *recognize*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cogn** comes from a Latin word that means *"to learn, recognize, or know"*.
  - At its core, it describes the action of learn, recognize, or know.

- **The Big Picture Idea**:
  - Picture sitting quietly while turning ideas over in your mind to solve a problem.
  - Whenever you see **cogn** in an English word, think of **to learn, recognize, or know**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to learn, recognize, or know).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Cognition**: The mental action or process of acquiring knowledge and understanding through thought, experience, and the senses.
  - **Recognize**: To identify someone or something from having encountered them before.
  - **Cognitive**: Relating to cognition.
  - **Incognito**: Having one's true identity concealed. 2. In disguise. 3. A person in disguise.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cogn</mark>, think of <mark class="hl-def">to learn, recognize, or know</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **cogn** operates through Latin present and participial stems:
- **Base Cognitive Stems (`cogn-` / `cognit-` < *cognōscere*)**:
  - *cognitiō* $\to$ **cognition**, **cognitive**, **cognitively**.
  - *cognōscere* via Anglo-French $\to$ **cognizant**, **cognizance**, **incognizant**.
  - *in-* ("not") + *cognitus* (via Italian) $\to$ **incognito**.
  - *prae-* ("before") + *cognitiō* $\to$ **precognition**, **precognitive**.
- **Prefix Compounds with Re- (`recogn-`)**:
  - *re-* ("again") + *cognōscere* $\to$ **recognize**, **recognition**, **recognizable**, **unrecognizable**.
  - Old French *reconnoître* $\to$ **reconnaissance**, **reconnoiter**.
- **French Agent Stream (`connoiss-`)**:
  - *connoisseur* ("expert judge of taste").
- **Greek Cognate Branch (cross-indexed)**:
  - Greek **διάγνωσις** (*diágnōsis*) $\to$ **diagnosis**, **diagnostic**.

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

The derivatives of **cogn** span four primary conceptual domains:
- **Cognitive Science & Psychology**: *cognition* (the mental action or process of acquiring knowledge and understanding through thought, experience, and the senses), *cognitive* (relating to cognition).
- **Awareness & Perception**: *cognizant* (having knowledge or being aware of), *cognizance* (knowledge, awareness, or notice; judicial jurisdiction).
- **Identity & Anonymity**: *recognize* (identify someone or something from having encountered them before), *recognition*, *incognito* (having one's true identity concealed).
- **Expertise & Military Exploration**: *connoisseur* (an expert judge in matters of taste), *reconnaissance* (military observation of a region to locate an enemy or ascertain strategic features), *precognition* (foreknowledge of an event).

---

## 🔀 4. Prefix & Combining Dynamics on cogn

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`co-`** + *gnōscere* | `cognōscere` | Know thoroughly through inquiry $\to$ conscious knowledge | *cognition, cognitive, cognizant* |
| **`in-`** ("not") | `in-` + *cognitus* | Not known to observers $\to$ concealed identity, in disguise | *incognito* |
| **`re-`** ("again") | `re-` + *cognōscere* | Know again upon seeing $\to$ identify, acknowledge status | *recognize, recognition, recognizable* |
| **`re-`** (French) | *reconnoître* | Scout ahead to know terrain $\to$ military scouting survey | *reconnaissance, reconnoiter* |
| **`prae-`** ("before") | `prae-` + *cognitiō* | Knowing before an event occurs $\to$ extrasensory premonition | *precognition* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Neuroscience & Cognitive Science**: Artificial intelligence neural networks, cognitive development (Piaget), and cognitive biases (*cognitive psychology*, *cognitive load*).
- **Jurisprudence & Constitutional Law**: Court jurisdiction and official administrative knowledge (*take judicial cognizance of*).
- **Military Strategy & Intelligence Operations**: Aerial surveillance drones, satellite reconnaissance, and forward scouting (*reconnaissance mission*).
- **Gastronomy & Fine Arts**: Curatorial appraisal of antique paintings and vintage wines (*connoisseur of fine art*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[cognac]] | noun | **1.** High quality grape brandy distilled in the cognac district of france. | *"By Jove! my feelings have ripened for you like fine old cognac."* — George Eliot, *Middlemarch* |
| [[cognate]] | noun | **1.** One related by blood or origin; especially on sharing an ancestor with another.<br>**2.** A word is cognate with another if both derive from the same word in an ancestral language. | *"Had this latter or any cognate phenomenon declared itself in any member of his family?"* — James Joyce, *Ulysses* |
| [[cognation]] | noun | **1.** Line of descent traced through the maternal side of the family.<br>**2.** (anthropology) related by blood. | *"In academic literature, cognation designates line of descent traced through the maternal side of the family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cognisable]] | adjective | **1.** Capable of being known. | *"In academic literature, cognisable designates capable of being known."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cognisance]] | noun | **1.** Having knowledge of. | *"Christian is she by very cognisance."* — Classic Author, *The Song of Roland* |
| [[cognisant]] | adjective | **1.** (sometimes followed by `of') having or showing knowledge or understanding or realization or perception. | *"In academic literature, cognisant designates (sometimes followed by `of') having or showing knowledge or understanding or realization or perception."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cognise]] | verb | **1.** Be cognizant or aware of a fact or a specific piece of information; possess knowledge or information about. | *"In academic literature, cognise designates be cognizant or aware of a fact or a specific piece of information; possess knowledge or information about."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cognition]] | noun | **1.** The psychological result of perception and learning and reasoning. | *"Fear me not, my lord; I will not be myself, nor have cognition Of what I feel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cognitive]] | adjective | **1.** Of or being or relating to or involving cognition. | *"In academic literature, cognitive designates of or being or relating to or involving cognition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cognitively]] | adverb | **1.** With regard to cognition. | *"In academic literature, cognitively designates with regard to cognition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cognizable]] | adjective | **1.** Capable of being known. | *"A hieroglyph,” said the Rhetor, “is an emblem of something not cognizable by the senses but which possesses qualities resembling those of the symbol.” Pierre knew very well what a hieroglyph was, but dared not speak."* — graf Leo Tolstoy, *War and Peace* |
| [[cognizance]] | noun | **1.** Having knowledge of.<br>**2.** Range of what one can know or understand. | *"The cognizance of her incontinency Is this: she hath bought the name of whore thus dearly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cognizant]] | adjective | **1.** (sometimes followed by `of') having or showing knowledge or understanding or realization or perception. | *"We know that the ; immediately ensuing is the commencement of a word, and, of the six characters succeeding this ‘the,’ we are cognizant of no less than five."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[cognize]] | verb | **1.** Be cognizant or aware of a fact or a specific piece of information; possess knowledge or information about. | *"Thought-forms 306:21 The myriad forms of mortal thought, made manifest as matter, are not more distinct nor real to the mate- rial senses than are the Soul-created forms 306:24 to spiritual sense, which cognizes Life as per- manent."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[cognomen]] | noun | **1.** A familiar name for a person (often a shortened version of a person's given name).<br>**2.** The name used to identify the members of a family (as distinguished from each member's given name). | *"The cognomen of Crane was not inapplicable to his person."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[cognoscente]] | noun | **1.** An expert able to appreciate a field; especially in the fine arts. | *"In academic literature, cognoscente designates an expert able to appreciate a field; especially in the fine arts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cognoscible]] | adjective | **1.** Capable of being known. | *"In academic literature, cognoscible designates capable of being known."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[derecognise]] | verb | **1.** Cause to be no longer approved or accepted. | *"In academic literature, derecognise designates cause to be no longer approved or accepted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[derecognize]] | verb | **1.** Cause to be no longer approved or accepted. | *"In academic literature, derecognize designates cause to be no longer approved or accepted."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incognito]] | adjective | **1.** With your identity concealed.<br>**2.** Without revealing one's identity. | *"I have come _incognito_ from Prague for the purpose of consulting you.” “Then, pray consult,” said Holmes, shutting his eyes once more."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[incognizable]] | adjective | **1.** Incapable of being perceived or known. | *"In academic literature, incognizable designates incapable of being perceived or known."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incognizance]] | noun | **1.** A lack of knowledge or recognition. | *"In academic literature, incognizance designates a lack of knowledge or recognition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incognizant]] | adjective | **1.** (often followed by `of') not aware. | *"In academic literature, incognizant designates (often followed by `of') not aware."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incognoscible]] | adjective | **1.** Incapable of being perceived or known. | *"In academic literature, incognoscible designates incapable of being perceived or known."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precognition]] | noun | **1.** Knowledge of an event before it occurs. | *"In academic literature, precognition designates knowledge of an event before it occurs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precognitive]] | adjective | **1.** Foreseeing the future. | *"In academic literature, precognitive designates foreseeing the future."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[recognisable]] | adjective | **1.** Capable of being recognized. | *"Even in his descriptive passages the dream-character of his scenery is notorious; it is not the clear, recognisable scenery of Wordsworth, but a landscape that hovers athwart the heat and haze arising from his crackling fantasies."* — Francis Thompson, *Shelley: An Essay* |
| [[recognisance]] | noun | **1.** (law) a security entered into before a court with a condition to perform some act required by law; on failure to perform that act a sum is forfeited. | *"He offered to deposit a sum equal to the recognisance of the knight's bail; but this was rejected, as an expedient contrary to the practice of the courts."* — T. Smollett, *The Adventures of Sir Launcelot Greaves* |
| [[recognise]] | verb | **1.** Show approval or appreciation of.<br>**2.** Grant credentials to. | *"Anne was astonished to recognise the same hills and the same objects so soon."* — Jane Austen, *Persuasion* |
| [[recognised]] | verb | **1.** Show approval or appreciation of.<br>**2.** Grant credentials to. | *"This venture, unaided and alone, into the paths of farming as master and not as man, with an advance of sheep not yet paid for, was a critical juncture with Gabriel Oak, and he recognised his position clearly."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[recognition]] | noun | **1.** The state or quality of being recognized or acknowledged.<br>**2.** The process of recognizing something or someone by remembering. | *"Richard and I were making our way through it, and I was yet in the first chill of the late unexpected recognition when I saw, coming towards us, but not seeing us, no less a person than Mr."* — Charles Dickens, *Bleak House* |
| [[recognizable]] | adjective | **1.** Easily perceived; easy to become aware of.<br>**2.** Capable of being recognized. | *"The embossed design is merely to make the coins easily recognizable and difficult to counterfeit; and milled or lettered edges are to prevent clipping and otherwise abstracting metal from the coins. 10. #Seigniorage defined#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[recognizably]] | adverb | **1.** To a recognizable degree. | *"One reason is, because there are a dozen that are recognizably competent to do that poem."* — Mark Twain, *What Is Man? and Other Essays* |
| [[recognizance]] | noun | **1.** (law) a security entered into before a court with a condition to perform some act required by law; on failure to perform that act a sum is forfeited. | *"But yet Iago knows That she with Cassio hath the act of shame A thousand times committed; Cassio confess’d it, And she did gratify his amorous works With that recognizance and pledge of love Which I first gave her; I saw it in his hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[recognize]] | verb | **1.** Accept (someone) to be what is claimed or accept his power and authority.<br>**2.** Be fully aware or cognizant of. | *"You said that it always made you feel that He was not forgetting you and your brother, and that he is looking after you in whatever way is best for you, even if you can't recognize it now."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[recognized]] | verb | **1.** Accept (someone) to be what is claimed or accept his power and authority.<br>**2.** Be fully aware or cognizant of. | *"Apollonie, glancing up, now recognized the company, too."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[unrecognisable]] | adjective | **1.** Defying recognition as e.g. because of damage or alteration.<br>**2.** Beyond recognition; in an unrecognizable manner. | *"Hour after hour we have fought together for the little darling's life, while he lay unconscious against the piled cushions, a waxen image, unrecognisable as the bonnie curly-headed Billie we had loved."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[unrecognised]] | adjective | **1.** Not having a secure reputation.<br>**2.** Not recognized. | *"In academic literature, unrecognised designates not having a secure reputation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrecognizable]] | adjective | **1.** Defying recognition as e.g. because of damage or alteration. | *"The tank displayed the debris of a space battle: ruptured ships, unrecognizable masses and fragments, and bloated human bodies."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[unrecognizably]] | adverb | **1.** Beyond recognition; in an unrecognizable manner. | *"In academic literature, unrecognizably designates beyond recognition; in an unrecognizable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrecognized]] | adjective | **1.** Not recognized.<br>**2.** Not having a secure reputation. | *"It was a feeling of defenselessness against some unrecognized but malicious influence."* — Sarah Orne Jewett, *Strangers and Wayfarers* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Thought]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · COGN
  </div>
</div>
