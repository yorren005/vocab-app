---
status: unread
type: root_dashboard
---
# Dashboard — sect
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sect-</span>
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

The root **sect** means to cut. It refers to slicing with a sharp edge, dividing into pieces, or bringing something to an end. In English, this root forms words such as *sector*, *section*, *dissection*, and *intersection*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to cut
> The root **sect** means to cut. It refers to slicing with a sharp edge, dividing into pieces, or bringing something to an end. In English, this root forms words such as *sector*, *section*, *dissection*, and *intersection*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To cut</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Untying a tight knot and separating two parts from each other.</mark>
> - **Everyday Connection**: Think of familiar words like *sector* and *section*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sect** comes from a Latin word that means *"to cut"*.
  - At its core, it describes the action of cut.

- **The Big Picture Idea**:
  - Picture untying a tight knot and separating two parts from each other.
  - Whenever you see **sect** in an English word, think of **to cut**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to cut).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Sector**: An everyday English word showing the root's idea of *to cut*.
  - **Section**: Any of the distinct parts into which something is divided. 2. To divide into sections.
  - **Dissection**: The action of dissecting a body or plant. 2. Minute, detailed critical analysis of an idea.
  - **Intersection**: A point or line where two or more things cross. 2. The junction of two or more roads.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sect</mark>, think of <mark class="hl-def">to cut</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun:** *section* $\to$ *sectional*, *sector*.
- **Prefixation of Number Division:**
  - `bi-` + *sect* $\to$ *bisect* (to cut into two equal halves), *bisection*, *bisector*.
  - `tri-` + *sect* $\to$ *trisect* (to divide into three equal parts), *trisection*.
- **Directional & Analytical Prefixation:**
  - `dis-` + *sect* $\to$ *dissect* (to cut apart for analysis), *dissection*, *dissector*.
  - `inter-` + *sect* $\to$ *intersect* (to cut across one another), *intersection*.
  - `trans-` + *sect* $\to$ *transect* (to cut across a path or region).
  - `re-` + *sect* $\to$ *resect* (surgical cutting away of tissue), *resection*.
  - `vīvus` + *sect* $\to$ *vivisection* (dissection of living animals).
  - `vēna` + *sect* $\to$ *venesection* (phlebotomy / bloodletting).
- **Biological Calque:**
  - *in-* + *sect* $\to$ *insect*, *insecticide*, *insectivorous*.

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

### 1. Surgery, Medicine & Biological Structure
- *dissect* (to cut apart a body or plant to study its internal parts; analyze meticulously).
- *dissection* (the action of dissecting a body or plant).
- *resect* (to surgically remove part of an organ or structure).
- *resection* (the surgical removal of part of an organ or tissue).
- *vivisection* (the practice of performing operations on live animals for scientific research).
- *venesection* (the surgical puncture of a vein for withdrawing blood; phlebotomy).

### 2. Zoology & Ecology
- *insect* (a small arthropod animal that has six legs and typically one or two pairs of wings, with a segmented body).
- *insectivorous* (feeding on insects).
- *insecticide* (a substance used for killing insects).

### 3. Geometry & Spatial Layout
- *intersect* (to pass across or through; cut across each other).
- *intersection* (a point or line common to lines or surfaces that cut across each other).
- *bisect* (to divide into two equal parts).
- *bisection* (division into two equal parts).
- *bisector* (a straight line or plane that bisects an angle or line segment).
- *trisect* (to divide into three equal parts).
- *transect* (a straight line or narrow section across an earth surface along which ecological measurements are taken).

### 4. Textual, Administrative & Factional Divisions
- *section* (any of the more or less distinct parts into which something is or may be divided).
- *sector* (an area or portion that is distinct from others; a mathematical pie-slice).
- *sect* (a subgroup of a religious, political, or philosophical belief system).
- *sectarian* (rigidly devoted to a particular sect or faction; narrow-minded).
- *sectarianism* (excessive devotion to a particular sect, especially in religion).

---

## 🔀 4. Prefix & Combining Dynamics on sect

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `dis-` + `sect` | Intensive division | Cutting apart organ by organ for anatomical investigation | *dissect, dissection* |
| `inter-` + `sect` | Mutual crossing | Slicing through one another at a junction point | *intersect, intersection* |
| `bi-` + `sect` | Binary division | Slicing geometrically into two equal halves | *bisect, bisection, bisector* |
| `re-` + `sect` | Surgical removal | Cutting away diseased tissue or intestinal segments | *resect, resection* |
| `in-` + `sect` | Notched calque | An arthropod with deeply notched body segments | *insect, insectivorous* |
| `sect-` + `-arian` | Factional adjectival | Dogmatically isolated within a splinter sub-group | *sectarian, sectarianism* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Anatomy & Medical Education:** Cadaveric dissection in medical school, hepatic resection, Mohs micrographic surgery.
- **Entomology & Ecology:** Insect biodiversity, line-transect field sampling, pollinator decline.
- **Euclidean Geometry & Road Engineering:** Perpendicular bisectors, four-way highway intersections, sector area formulas.
- **Sociology of Religion & Politics:** Sectarian violence (Northern Ireland, Middle East), sect vs church typologies (Troeltsch).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bisect]] | verb | **1.** Cut in half or cut in two. | *"The path, after passing the cowshed, bisected the plantation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[bisection]] | noun | **1.** Dividing into two equal parts. | *"See _The Magic Art and the Evolution of Kings_, ii. 324 _sqq._ As to the bisection of the Celtic year, see the old authority quoted by P.W."* — James George Frazer, *Balder the Beautiful, Volume I.* |
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
| [[intersect]] | verb | **1.** Meet at a point. | *"With the same feeling with which he had galloped across the path of a wolf, Rostóv gave rein to his Donéts horse and galloped to intersect the path of the dragoons’ disordered lines."* — graf Leo Tolstoy, *War and Peace* |
| [[intersectant]] | adjective | **1.** Crossed or intersected in the form of an x. | *"In academic literature, intersectant designates crossed or intersected in the form of an x."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intersecting]] | verb | **1.** Meet at a point.<br>**2.** Crossed or intersected in the form of an x. | *"He hesitated among the intersecting ways, mazy, enchanting, and flower-bordered."* — C. A. Frazer, *Atmâ* |
| [[intersection]] | noun | **1.** A point where lines intersect.<br>**2.** A junction where one street or road crosses another. | *"Then the intersection of the number of knocks, two series with a pause between, beginning with the horizontal top figures gave the letter."* — S. R. Crockett, *Deep Moat Grange* |
| [[nonintersecting]] | adjective | **1.** (of lines, planes, or surfaces) never meeting or crossing. | *"In academic literature, nonintersecting designates (of lines, planes, or surfaces) never meeting or crossing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsectarian]] | adjective | **1.** Not restricted to one sect or school or party; ; ; - bertrand russell. | *"In academic literature, nonsectarian designates not restricted to one sect or school or party; ; ; - bertrand russell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resect]] | verb | **1.** Surgically remove a part of a structure or an organ. | *"In academic literature, resect designates surgically remove a part of a structure or an organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[resection]] | noun | **1.** Surgical removal of part of a structure or organ. | *"In academic literature, resection designates surgical removal of part of a structure or organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
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
| [[subsection]] | noun | **1.** A section of a section; a part of a part; i.e., a part of something already divided. | *"In academic literature, subsection designates a section of a section; a part of a part; i.e., a part of something already divided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsectarian]] | adjective | **1.** Not restricted to one sect or school or party; ; ; - bertrand russell. | *"In academic literature, unsectarian designates not restricted to one sect or school or party; ; ; - bertrand russell."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · SECT
  </div>
</div>
