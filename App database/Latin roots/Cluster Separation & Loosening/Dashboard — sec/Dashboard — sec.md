---
status: unread
type: root_dashboard
---
# Dashboard — sec
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sec-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to cut”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Untying a tight knot and separating two parts from each other.</span>
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

The root **sec** means to cut. It refers to slicing with a sharp edge, dividing into pieces, or bringing something to an end. In English, this root forms words such as *section*, *insect*, *dissect*, and *bisect*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to cut
> The root **sec** means to cut. It refers to slicing with a sharp edge, dividing into pieces, or bringing something to an end. In English, this root forms words such as *section*, *insect*, *dissect*, and *bisect*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To cut</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Untying a tight knot and separating two parts from each other.</mark>
> - **Everyday Connection**: Think of familiar words like *section* and *insect*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sec** comes from a Latin word that means *"to cut"*.
  - At its core, it describes the action of cut.

- **The Big Picture Idea**:
  - Picture untying a tight knot and separating two parts from each other.
  - Whenever you see **sec** in an English word, think of **to cut**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to cut).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Section**: An everyday English word showing the root's idea of *to cut*.
  - **Insect**: An everyday English word showing the root's idea of *to cut*.
  - **Dissect**: An everyday English word showing the root's idea of *to cut*.
  - **Bisect**: An everyday English word showing the root's idea of *to cut*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sec</mark>, think of <mark class="hl-def">to cut</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Present Participle Base (`-ant`):** *sec-* + *-ant* $\to$ *secant* (a straight line that cuts a curve).
- **Nominal Piece Base (`-ment`):** *sec-* + *-mentum* $\to$ *segment* (a part cut off), *segmental*, *segmentation*, *segmentary*.
- **Instrumental Agent Base:**
  - *secateurs* (pruning shears < French < Latin *secātor*).
  - *secula* $\to$ *sickle* (curved agricultural cutting blade).
- **Privative / Capability Base:**
  - *secable* (capable of being cut), *insecable* (indivisible; synonymous with atomic).

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

### 1. Mathematics & Trigonometry
- *secant* (a straight line that cuts a curve in two or more points; the trigonometric ratio of hypotenuse to adjacent side).

### 2. Slices, Portions & Subdivision
- *segment* (each of the parts into which something is or may be divided).
- *segmentation* (the division of something into separate parts or sections).
- *segmental* (relating to or consisting of segments).
- *segmentary* (composed of separate distinct parts).

### 3. Tools & Agricultural Blades
- *secateurs* (pruning shears used with one hand for cutting shrubs and stems).
- *sickle* (a short-handled farming tool with a semicircular blade used for cutting grain).

### 4. Philosophy & Physics
- *secable* (capable of being divided or cut).
- *insecable* (incapable of being cut or divided; atom-like).

---

## 🔀 4. Prefix & Combining Dynamics on sec

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `sec-` + `-ant` | Present participle | A line that actively cuts across a circular curve | *secant* |
| `sec-` + `-mentum` | Concrete nominalization | An individual slice cut off from a greater body | *segment* |
| `segment-` + `-ation` | Process nominalization | Partitioning a market, zygote, or network into parts | *segmentation* |
| `sec-` + `-ator` | French instrumental loan | Hand-held spring shears designed for vine pruning | *secateurs* |
| `in-` + `sec-` + `-able` | Privative capability | Atomic indivisibility; impossible to cleave | *insecable* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Trigonometry & Analytic Geometry:** Secant line, secant method in numerical analysis, trigonometric secant ($\sec 	heta$).
- **Business Marketing & Demographics:** Market segmentation, customer persona clustering.
- **Embryology & Biology:** Blastocyst segmentation (cleavage of early zygote cells), segmented bodies in annelids.
- **Horticulture & Viticulture:** Winter vine pruning using bypass secateurs.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[consecrate]] | verb | **1.** Appoint to a clerical posts.<br>**2.** Give entirely to a specific person, activity, or cause. | *"And that this body, consecrate to thee, By ruffian lust should be contaminate?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consecrated]] | verb | **1.** Appoint to a clerical posts.<br>**2.** Give entirely to a specific person, activity, or cause. | *"Him I’ll desire To meet me at the consecrated fount, A league below the city; and from thence, By cold gradation and well-balanced form."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consecration]] | noun | **1.** A solemn commitment of your life or your time to some cherished purpose (to a service or a goal).<br>**2.** (religion) sanctification of something by setting it apart (usually with religious rites) as dedicated to god. | *"In the early years of his ministry he received no fewer than four offers of philosophical professorships, which his views of the ministry and of his consecration to it constrained him to set aside."* — John Cairns, *Principal Cairns* |
| [[consecutive]] | adjective | **1.** One after the other.<br>**2.** In regular succession without gaps. | *"Their general likeness to each other, and their consecutive ages, would almost have suggested that they might be, what in fact they were, brothers."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[consecutively]] | adverb | **1.** In a consecutive manner. | *"Until June 10, 1907, she had never xii:21 read this book throughout consecutively in order to elu- cidate her idealism."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[cosec]] | noun | **1.** Ratio of the hypotenuse to the opposite side of a right-angled triangle. | *"In academic literature, cosec designates ratio of the hypotenuse to the opposite side of a right-angled triangle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosecant]] | noun | **1.** Ratio of the hypotenuse to the opposite side of a right-angled triangle. | *"In academic literature, cosecant designates ratio of the hypotenuse to the opposite side of a right-angled triangle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconsecrate]] | verb | **1.** Remove the consecration from a person or an object. | *"In academic literature, deconsecrate designates remove the consecration from a person or an object."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconsecrated]] | verb | **1.** Remove the consecration from a person or an object.<br>**2.** Divested of consecration. | *"In academic literature, deconsecrated designates remove the consecration from a person or an object."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desecrate]] | verb | **1.** Violate the sacred character of a place or language.<br>**2.** Remove the consecration from a person or an object. | *"The enemy is advancing to destroy Russia, to desecrate the tombs of our fathers, to carry off our wives and children.” The nobleman smote his breast."* — graf Leo Tolstoy, *War and Peace* |
| [[desecrated]] | verb | **1.** Violate the sacred character of a place or language.<br>**2.** Remove the consecration from a person or an object. | *"Desecrated as the body is, a vengeful ghost survives and hovers over it to scare."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[desecration]] | noun | **1.** Blasphemous behavior; the act of depriving something of its sacred character. | *"All this was impudence and desecration, and he repented that he had brought her."* — George Eliot, *Middlemarch* |
| [[dissect]] | verb | **1.** Cut open or cut apart.<br>**2.** Make a mathematical, chemical, or grammatical analysis of; break down into components or essential features. | *"Vanish, 'tis the last warning, and with speed; for if I take ye in hand, I shall dissect you, and read upon your flegmatick dull Carcases."* — John Fletcher, *The Elder Brother* |
| [[dissected]] | verb | **1.** Cut open or cut apart.<br>**2.** Make a mathematical, chemical, or grammatical analysis of; break down into components or essential features. | *"Go on: it charms me to be dissected to my face, and by such an able hand." "No: it's absurd and I never meant to begin it."* — Anthony Pryde, *Nightfall* |
| [[dissection]] | noun | **1.** Cutting so as to separate into pieces.<br>**2.** A minute and critical analysis. | *"Aye free, aff-han’, your story tell, When wi’ a bosom crony; But still keep something to yoursel’, Ye scarcely tell to ony: Conceal yoursel’ as weel’s ye can Frae critical dissection; But keek thro’ ev’ry other man, Wi’ sharpen’d, sly inspection."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[insect]] | noun | **1.** Small air-breathing arthropod.<br>**2.** A person who has a nasty or unethical character undeserving of respect. | *"Oak had not once wished her free that he might marry her himself—had not once said, “I could wait for you as well as he.” That was the insect sting."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[insecta]] | noun | **1.** Insects; about five-sixths of all known animal species. | *"In academic literature, insecta designates insects; about five-sixths of all known animal species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insectan]] | adjective | **1.** Of or relating to the class insecta. | *"In academic literature, insectan designates of or relating to the class insecta."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insecticidal]] | adjective | **1.** Of or relating to insecticide. | *"In academic literature, insecticidal designates of or relating to insecticide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insecticidally]] | adverb | **1.** By means of an insecticide. | *"In academic literature, insecticidally designates by means of an insecticide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insecticide]] | noun | **1.** A chemical used to kill insects. | *"In academic literature, insecticide designates a chemical used to kill insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insectifuge]] | noun | **1.** A chemical substance that repels insects. | *"In academic literature, insectifuge designates a chemical substance that repels insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insectivora]] | noun | **1.** Shrews; moles; hedgehogs; tenrecs. | *"In academic literature, insectivora designates shrews; moles; hedgehogs; tenrecs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insectivore]] | noun | **1.** Small insect-eating mainly nocturnal terrestrial or fossorial mammals.<br>**2.** Any organism that feeds mainly on insects. | *"In academic literature, insectivore designates small insect-eating mainly nocturnal terrestrial or fossorial mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insectivorous]] | adjective | **1.** (of animals and plants) feeding on insects. | *"In academic literature, insectivorous designates (of animals and plants) feeding on insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insecure]] | adjective | **1.** Not firm or firmly fixed; likely to fail or give way.<br>**2.** Lacking in security or safety. | *"These powerful creatures often hurled themselves at the windows of the saloon with such violence as to make us feel very insecure."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[insecurely]] | adverb | **1.** In a tentative and self-conscious manner.<br>**2.** In a manner involving risk. | *"And now let's get in and have something to eat, for goodness' sake." The kitchen window proved to be insecurely latched."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[insecureness]] | noun | **1.** The state of being exposed to risk or anxiety. | *"In academic literature, insecureness designates the state of being exposed to risk or anxiety."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[insecurity]] | noun | **1.** The state of being subject to danger or injury.<br>**2.** The anxiety you experience when you feel vulnerable and insecure. | *"I have certainly never borrowed any money on such an insecurity."* — George Eliot, *Middlemarch* |
| [[intersect]] | verb | **1.** Meet at a point. | *"With the same feeling with which he had galloped across the path of a wolf, Rostóv gave rein to his Donéts horse and galloped to intersect the path of the dragoons’ disordered lines."* — graf Leo Tolstoy, *War and Peace* |
| [[intersectant]] | adjective | **1.** Crossed or intersected in the form of an x. | *"In academic literature, intersectant designates crossed or intersected in the form of an x."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intersecting]] | verb | **1.** Meet at a point.<br>**2.** Crossed or intersected in the form of an x. | *"He hesitated among the intersecting ways, mazy, enchanting, and flower-bordered."* — C. A. Frazer, *Atmâ* |
| [[intersection]] | noun | **1.** A point where lines intersect.<br>**2.** A junction where one street or road crosses another. | *"Then the intersection of the number of knocks, two series with a pause between, beginning with the horizontal top figures gave the letter."* — S. R. Crockett, *Deep Moat Grange* |
| [[nonintersecting]] | adjective | **1.** (of lines, planes, or surfaces) never meeting or crossing. | *"In academic literature, nonintersecting designates (of lines, planes, or surfaces) never meeting or crossing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsectarian]] | adjective | **1.** Not restricted to one sect or school or party; ; ; - bertrand russell. | *"In academic literature, nonsectarian designates not restricted to one sect or school or party; ; ; - bertrand russell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[persecute]] | verb | **1.** Cause to suffer. | *"But this can only be received as a proof of their determination to persecute, since it must be within everybody’s experience that the Chadband style of oratory is widely received and much admired."* — Charles Dickens, *Bleak House* |
| [[persecution]] | noun | **1.** The act of persecuting (especially on the basis of race or religion). | *"A most devout, hard-working and poorly paid man, was the object of constant persecution by a cross-grained, ugly, infidel neighbor."* — Classic Author, *The wonders of prayer* |
| [[persecutor]] | noun | **1.** Someone who torments. | *"A persecutor I am sure thou art."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prosecute]] | verb | **1.** Conduct a prosecution in a court of law.<br>**2.** Bring a criminal action against (in a trial). | *"Why should not I then prosecute my right?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prosecution]] | noun | **1.** The institution and conduct of legal proceedings against a defendant for criminal behavior.<br>**2.** The lawyers acting for the state to put the case against the defendant. | *"It opposed no positive action to the making of monopolistic contracts and to the formation of combinations, but declared them to be illegal and provided for their prosecution and punishment after the mischief had been done."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[prosecutor]] | noun | **1.** A government official who conducts criminal prosecutions on behalf of the state. | *"Either this must be the case, or the local courts must be excluded from a concurrent jurisdiction in matters of national concern, else the judiciary authority of the Union may be eluded at the pleasure of every plaintiff or prosecutor."* — Alexander Hamilton, *The Federalist Papers* |
| [[reconsecrate]] | verb | **1.** Consecrate anew, as after a desecration. | *"In academic literature, reconsecrate designates consecrate anew, as after a desecration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resect]] | verb | **1.** Surgically remove a part of a structure or an organ. | *"In academic literature, resect designates surgically remove a part of a structure or an organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resection]] | noun | **1.** Surgical removal of part of a structure or organ. | *"In academic literature, resection designates surgical removal of part of a structure or organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sec]] | noun | **1.** 1/60 of a minute; the basic unit of time adopted under the systeme international d'unites.<br>**2.** Ratio of the hypotenuse to the adjacent side of a right-angled triangle. | *"See above, sec. 3.] [Footnote 5: See Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[secale]] | noun | **1.** Cereal grass widely cultivated for its grain: rye. | *"In academic literature, secale designates cereal grass widely cultivated for its grain: rye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secant]] | noun | **1.** A straight line that intersects a curve at two or more points.<br>**2.** Ratio of the hypotenuse to the adjacent side of a right-angled triangle. | *"In academic literature, secant designates a straight line that intersects a curve at two or more points."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secateurs]] | noun | **1.** Small pruning shears with a spring that holds the handles open and a single blade that closes against a flat surface. | *"In academic literature, secateurs designates small pruning shears with a spring that holds the handles open and a single blade that closes against a flat surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secede]] | verb | **1.** Withdraw from an organization or communion. | *"What did we secede for if it wasn't to prove the doctrine of State Rights?"* — Harry Castlemon, *Rodney, the Partisan* |
| [[secern]] | verb | **1.** Mark as different. | *"In academic literature, secern designates mark as different."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secernate]] | verb | **1.** Mark as different. | *"In academic literature, secernate designates mark as different."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secernment]] | noun | **1.** The organic process of synthesizing and releasing some substance.<br>**2.** The cognitive process whereby two or more stimuli are distinguished. | *"In academic literature, secernment designates the organic process of synthesizing and releasing some substance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secession]] | noun | **1.** An austrian school of art and architecture parallel to the french art nouveau in the 1890s.<br>**2.** The withdrawal of eleven southern states from the union in 1860 which precipitated the american civil war. | *"The United Secession--formerly the Burgher--Church at Stockbridge occupied a site conveniently central for the wide district which it served, but very solitary."* — John Cairns, *Principal Cairns* |
| [[secessionism]] | noun | **1.** A doctrine that maintains the right of secession. | *"In academic literature, secessionism designates a doctrine that maintains the right of secession."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secessionist]] | noun | **1.** An advocate of secessionism. | *"Tyler sent for a carriage which she was in the habit of using whenever need required, and the driver of which was honest and personally friendly, though probably a secessionist, and proceeded to the Station House."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[seclude]] | verb | **1.** Keep away from others. | *"I told my guardian all about it, and why I felt it was necessary that I should seclude myself, and my reason for not seeing my darling above all."* — Charles Dickens, *Bleak House* |
| [[secluded]] | verb | **1.** Keep away from others.<br>**2.** Hidden from general view or use. | *"That secluded sister is my first remembrance.” “No, no!” he cried, starting."* — Charles Dickens, *Bleak House* |
| [[seclusion]] | noun | **1.** The quality of being secluded from the presence or view of others.<br>**2.** The act of secluding yourself from others. | *"Nine years, my dear,” he said after thinking for a little while, “have passed since I received a letter from a lady living in seclusion, written with a stern passion and power that rendered it unlike all other letters I have ever read."* — Charles Dickens, *Bleak House* |
| [[secobarbital]] | noun | **1.** Barbiturate that is a white odorless slightly bitter powder (trade name seconal) used as a sodium salt for sedation and to treat convulsions. | *"In academic literature, secobarbital designates barbiturate that is a white odorless slightly bitter powder (trade name seconal) used as a sodium salt for sedation and to treat convulsions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seconal]] | noun | **1.** Barbiturate that is a white odorless slightly bitter powder (trade name seconal) used as a sodium salt for sedation and to treat convulsions. | *"In academic literature, seconal designates barbiturate that is a white odorless slightly bitter powder (trade name seconal) used as a sodium salt for sedation and to treat convulsions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secotiaceae]] | noun | **1.** A family of fungi that have a stalk and cap and a wrinkled mass of tissue (the gleba) where spores are produced; are often dismissed as misshapen forms of other fungi. | *"In academic literature, secotiaceae designates a family of fungi that have a stalk and cap and a wrinkled mass of tissue (the gleba) where spores are produced; are often dismissed as misshapen forms of other fungi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secotiales]] | noun | **1.** An order of fungi belonging to the class gasteromycetes. | *"In academic literature, secotiales designates an order of fungi belonging to the class gasteromycetes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secrecy]] | noun | **1.** The trait of keeping things secret.<br>**2.** The condition of being concealed or hidden. | *"In nature’s infinite book of secrecy A little I can read."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sect]] | noun | **1.** A subdivision of a larger religious group.<br>**2.** A dissenting clique. | *"So is all her sect; an they be once in a calm, they are sick."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sectarian]] | noun | **1.** A member of a sect.<br>**2.** Of or relating to or characteristic of a sect or sects. | *"The members of the society were connected with twenty different churches of several denominations, and while all had reference to the spiritual as well as physical welfare of the soldier, yet there was nothing sectarian or denominational in its work."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[sectarianism]] | noun | **1.** A narrow-minded adherence to a particular sect or party or denomination. | *"Sectarianism and opposition In the record of nineteen centuries, there are sects 224:12 many but not enough Christianity."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[sectarist]] | noun | **1.** A member of a sect. | *"In academic literature, sectarist designates a member of a sect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sectary]] | noun | **1.** A member of a sect. | *"My lord, my lord, you are a sectary, That’s the plain truth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[section]] | noun | **1.** A self-contained part of a larger composition (written or musical).<br>**2.** A very thin slice (of tissue or mineral or other substance) for examination under a microscope. | *"When they reached the first newly-ploughed section he held out his hand to help her over it; but she stepped forward on the summits of the earth-rolls as if she did not see him."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[sectional]] | noun | **1.** A piece of furniture made up of sections that can be arranged individually or together.<br>**2.** Relating to or based upon a section (i.e. as if cut through by an intersecting plane). | *"An income tax was opposed as sectional taxation by many in the Eastern states where the owners of most of the larger fortunes reside."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[sectionalisation]] | noun | **1.** The act of dividing or partitioning; separation by the creation of a boundary that divides or keeps apart. | *"In academic literature, sectionalisation designates the act of dividing or partitioning; separation by the creation of a boundary that divides or keeps apart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sectionalise]] | verb | **1.** Divide into sections, especially into geographic sections. | *"In academic literature, sectionalise designates divide into sections, especially into geographic sections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sectionalism]] | noun | **1.** A partiality for some particular place. | *"The pro-slavery party has elected its Presidential candidate, only, however, by the votes of a minority, and that of such a character as to stamp the victory as the offspring of sectionalism and temporary causes."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[sectionalization]] | noun | **1.** The act of dividing or partitioning; separation by the creation of a boundary that divides or keeps apart. | *"In academic literature, sectionalization designates the act of dividing or partitioning; separation by the creation of a boundary that divides or keeps apart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sectionalize]] | verb | **1.** Divide into sections, especially into geographic sections. | *"In academic literature, sectionalize designates divide into sections, especially into geographic sections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sectioned]] | verb | **1.** Divide into segments.<br>**2.** Consisting of or divided into sections. | *"In academic literature, sectioned designates divide into segments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sector]] | noun | **1.** A plane figure bounded by two radii and the included arc of a circle.<br>**2.** A social group that forms part of the society or the economy. | *"Five-meter high orange letters glowed brightly along its blunt bow and stern, and on each quarter sector of its exposed surface, proclaiming the huge cylinder as the UIPS SLINGSHOT LOGISTICS DEPOT."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[sectorial]] | adjective | **1.** Relating to or resembling a sector. | *"In academic literature, sectorial designates relating to or resembling a sector."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sectral]] | noun | **1.** An oral beta blocker (trade name sectral) used in treating hypertension. | *"In academic literature, sectral designates an oral beta blocker (trade name sectral) used in treating hypertension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secular]] | noun | **1.** Someone who is not a clergyman or a professional person.<br>**2.** Of or relating to the doctrine that rejects religion and religious considerations. | *"The Puritan austerity of the centuries following the Reformation had discouraged secular music, like other forms of art, in Scotland; and as a result Scottish song had become hopelessly degraded in point both of decency and literary quality."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[secularisation]] | noun | **1.** The activity of changing something (art or education or society or morality etc.) so it is no longer under the control or influence of religion.<br>**2.** Transfer of property from ecclesiastical to civil possession. | *"In academic literature, secularisation designates the activity of changing something (art or education or society or morality etc.) so it is no longer under the control or influence of religion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secularise]] | verb | **1.** Make secular and draw away from a religious orientation. | *"In academic literature, secularise designates make secular and draw away from a religious orientation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secularism]] | noun | **1.** A doctrine that rejects religion and religious considerations. | *"In academic literature, secularism designates a doctrine that rejects religion and religious considerations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secularist]] | noun | **1.** An advocate of secularism; someone who believes that religion should be excluded from government and education. | *"In academic literature, secularist designates an advocate of secularism; someone who believes that religion should be excluded from government and education."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secularization]] | noun | **1.** The activity of changing something (art or education or society or morality etc.) so it is no longer under the control or influence of religion.<br>**2.** Transfer of property from ecclesiastical to civil possession. | *"In academic literature, secularization designates the activity of changing something (art or education or society or morality etc.) so it is no longer under the control or influence of religion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secularize]] | verb | **1.** Make secular and draw away from a religious orientation.<br>**2.** Transfer from ecclesiastical to civil possession, use, or control. | *"In academic literature, secularize designates make secular and draw away from a religious orientation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secundigravida]] | noun | **1.** A woman who is pregnant for the second time. | *"In academic literature, secundigravida designates a woman who is pregnant for the second time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[secure]] | verb | **1.** Get by special effort.<br>**2.** Cause to be firmly attached. | *"Sons, We’ll higher to the mountains; there secure us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[securely]] | adverb | **1.** In a secure manner; in a manner free from danger.<br>**2.** In a confident and unselfconscious manner. | *"By heaven, these scroyles of Angiers flout you, kings, And stand securely on their battlements As in a theatre, whence they gape and point At your industrious scenes and acts of death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[secureness]] | noun | **1.** The state of freedom from fear or danger.<br>**2.** The quality of being fixed in place as by some firm attachment. | *"In academic literature, secureness designates the state of freedom from fear or danger."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[securer]] | noun | **1.** Someone who obtains or acquires.<br>**2.** Free from fear or doubt; easy in mind. | *"It was pierced in the brim for a hat-securer, but the elastic was missing."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[security]] | noun | **1.** The state of being free from danger or injury.<br>**2.** Defense against financial failure; financial independence. | *"He would not take his band and yours, he liked not the security."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[subsection]] | noun | **1.** A section of a section; a part of a part; i.e., a part of something already divided. | *"In academic literature, subsection designates a section of a section; a part of a part; i.e., a part of something already divided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[transect]] | verb | **1.** Cut across or divide transversely. | *"In academic literature, transect designates cut across or divide transversely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconsecrated]] | adjective | **1.** Not holy because unconsecrated or impure or defiled. | *"The interest you cherish is lawless and unconsecrated."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[undersecretary]] | noun | **1.** A secretary immediately subordinate to the head of a department of government. | *"Christopher Mead, Assistant Undersecretary for External Affairs, returned the handshake, smiling."* — Algis Budrys, *Citadel* |
| [[unsectarian]] | adjective | **1.** Not restricted to one sect or school or party; ; ; - bertrand russell. | *"In academic literature, unsectarian designates not restricted to one sect or school or party; ; ; - bertrand russell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsecured]] | adjective | **1.** Not firmly fastened or secured.<br>**2.** Without financial security. | *"To do that we'd have to use unsecured channels," Brad replied."* — Meyer Moldeven, *The Universe — or Nothing* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Separation & Loosening]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SEC
  </div>
</div>
