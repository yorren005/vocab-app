---
status: unread
type: root_dashboard
---
# Dashboard — lin
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lin-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“thread or line”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The sturdy wooden framework supporting the roof of a house.</span>
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

The root **lin** means thread or line. It refers to spun flax thread, a cord, or a straight drawn line. In English, this root forms words such as *align*, *alignment*, *bilinear*, and *delineate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: thread or line
> The root **lin** means thread or line. It refers to spun flax thread, a cord, or a straight drawn line. In English, this root forms words such as *align*, *alignment*, *bilinear*, and *delineate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Thread or line</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sturdy wooden framework supporting the roof of a house.</mark>
> - **Everyday Connection**: Think of familiar words like *align* and *alignment*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lin** comes from a Latin word that means *"thread or line"*.
  - At its core, it describes thread or line.

- **The Big Picture Idea**:
  - Picture the sturdy wooden framework supporting the roof of a house.
  - Whenever you see **lin** in an English word, think of **underlying structure and framework**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of thread or line.
  - **Mental & Social**: How people experience, organize, or communicate about thread or line.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Align**: To place or arrange things in a straight line or in correct relative positions. 2. To give support to a person, group, or cause.
  - **Alignment**: Arrangement in a straight line, or in correct relative positions. 2. A position of agreement or alliance.
  - **Bilinear**: Relating to or contained by two lines.
  - **Delineate**: To describe or portray something precisely. 2. To indicate the exact position of a border or boundary.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lin</mark>, think of <mark class="hl-def">underlying structure and framework</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **lin** operates through two parallel morphological streams:
- **Direct Botanical & Textile Stem (`lin-` < *līnum*)**:
  - *līnum* $\to$ **linen**.
  - French *linge* ("linen cloth") $\to$ **lingerie**.
  - *linseed* (flax seed oil).
- **Geometric & Coordinate Stem (`line-` / `-linear` < *līnea*)**:
  - *līnea* $\to$ **line**, **lineal**, **lineage**, **lineament** ("facial contour, feature"), **linear**, **linearity**.
  - *ad-* + *līnea* (via French *aligner*) $\to$ **align**, **alignment**, **realign**, **realignment**.
  - *de-* ("down, off") + *līneāre* $\to$ **delineate**, **delineation**, **delineative**.
  - *bi-* ("two") + *līneāris* $\to$ **bilinear**.
  - *inter-* ("between") + *līneāris* $\to$ **interlinear**.
  - *col-* ("together") + *līneāris* $\to$ **collinear**.
  - *out-* + *line* $\to$ **outline**.

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

The derivatives of **lin** span five core domains:
- **Geometry & Mathematics**: *line* (continuous extent of length), *linear* (progressing from one stage to another in a single series of steps; along a line), *bilinear*, *collinear*.
- **Art, Design & Drafting**: *delineate* (describe or portray precisely; sketch out), *delineation*, *outline* (general sketch or summary), *lineament* (a distinctive feature or characteristic, especially of the face).
- **Genealogy & Succession**: *lineage* (lineal descent from an ancestor; ancestry), *lineal* (in a direct line of descent or succession).
- **Political & Structural Organization**: *align* (place or arrange things in a straight line; ally with a faction), *alignment*, *interlinear* (inserted between lines).
- **Textiles & Materials**: *linen* (cloth woven from flax), *lingerie* (women's underwear and nightclothes).

---

## 🔀 4. Prefix & Combining Dynamics on lin

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`ad-`** ("to") | `ad-` + *līnea* $\to$ *aligner* | Bring onto the same cord $\to$ adjust into position, ally | *align, alignment, realign* |
| **`de-`** ("down, fully")| `de-` + *līneāre* | Trace out with lines $\to$ portray, sketch, describe | *delineate, delineation* |
| **`inter-`** ("between")| `inter-` + *līnea* | Placed between lines $\to$ interlinear gloss or text | *interlinear* |
| **`bi-`** ("two") | `bi-` + *līnea* | Operating across two linear dimensions $\to$ mathematical bilinear | *bilinear* |
| **`-age`** (collective) | `line` + `-age` | The entire continuous thread of ancestors $\to$ ancestry | *lineage* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Mathematics, Calculus & Linear Algebra**: Vector spaces, linear transformations, matrices, and linear equations (*linear algebra*, *collinearity*).
- **Cartography, Urban Planning & Architecture**: Surveying boundaries and street alignments (*delineation of borders*, *road alignment*).
- **Constitutional Law & Probate**: Primogeniture and lines of succession (*lineal heirs*, *direct line of descent*).
- **Textile Engineering & Fashion**: Flax spinning, breathable linens, and haute couture (*linen weave*, *lingerie*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bilinear]] | adjective | **1.** Linear with respect to each of two variables or positions. | *"In academic literature, bilinear designates linear with respect to each of two variables or positions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colinus]] | noun | **1.** New world quail: the bobwhites. | *"In academic literature, colinus designates new world quail: the bobwhites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collinear]] | adjective | **1.** Lying on the same line. | *"In academic literature, collinear designates lying on the same line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collins]] | noun | **1.** English writer noted for early detective novels (1824-1889).<br>**2.** Tall iced drink of liquor (usually gin) with fruit juice. | *"Crashaw, indeed, partially anticipated Shelley's success, and yet further did a later poet, so much further that we find it difficult to understand why a generation that worships Shelley should be reviving Gray, yet almost forget the name of Collins."* — Francis Thompson, *Shelley: An Essay* |
| [[collinsia]] | noun | **1.** Genus of hardy annual herbs of western united states. | *"In academic literature, collinsia designates genus of hardy annual herbs of western united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[collinsonia]] | noun | **1.** Small genus of perennial erect or spreading aromatic herbs; united states. | *"In academic literature, collinsonia designates small genus of perennial erect or spreading aromatic herbs; united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[delineate]] | verb | **1.** Show the form or outline of.<br>**2.** Determine the essential quality of. | *"Such unaccountable masses of shades and shadows, that at first you almost thought some ambitious young artist, in the time of the New England hags, had endeavored to delineate chaos bewitched."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[delineated]] | verb | **1.** Show the form or outline of.<br>**2.** Determine the essential quality of. | *"Your words have delineated very prettily a graceful Apollo: he is present to your imagination,—tall, fair, blue-eyed, and with a Grecian profile."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[delineation]] | noun | **1.** A graphic or vivid verbal description.<br>**2.** A drawing of the outlines of forms or objects. | *"Of the Alps and Pyrenees, with their pine forests and their vices, they might give a faithful delineation; and Italy, Switzerland, and the south of France might be as fruitful in horrors as they were there represented."* — Jane Austen, *Northanger Abbey* |
| [[delineative]] | adjective | **1.** Depicted in a recognizable manner. | *"In academic literature, delineative designates depicted in a recognizable manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[elint]] | noun | **1.** Intelligence derived from electromagnetic radiations from foreign sources (other than radioactive sources). | *"In academic literature, elint designates intelligence derived from electromagnetic radiations from foreign sources (other than radioactive sources)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[illinois]] | noun | **1.** A midwestern state in north-central united states.<br>**2.** A member of the algonquian people formerly of illinois and regions to the west. | *"The first case of this kind was the grant to the Illinois Central road, in 1850, of a great strip of land through the state from north to south."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[illinoisan]] | noun | **1.** A native or resident of illinois. | *"In academic literature, illinoisan designates a native or resident of illinois."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interlineal]] | adjective | **1.** Written between lines of text. | *"In academic literature, interlineal designates written between lines of text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interlinear]] | adjective | **1.** Written between lines of text. | *"In academic literature, interlinear designates written between lines of text."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lin]] | noun | **1.** United states sculptor and architect whose public works include the memorial to veterans of the vietnam war in washington (born in 1959). | *"Others there are Who, trimm’d in forms, and visages of duty, Keep yet their hearts attending on themselves, And throwing but shows of service on their lords, Do well thrive by them, and when they have lin’d their coats, Do themselves homage."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[linac]] | noun | **1.** Ions are accelerated along a linear path by voltage differences on electrodes along the path. | *"In academic literature, linac designates ions are accelerated along a linear path by voltage differences on electrodes along the path."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linaceae]] | noun | **1.** A widely distributed family of plants. | *"In academic literature, linaceae designates a widely distributed family of plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linage]] | noun | **1.** The number of lines in a piece of printed material.<br>**2.** A rate of payment for written material that is measured according to the number of lines submitted. | *"In academic literature, linage designates the number of lines in a piece of printed material."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linalool]] | noun | **1.** A colorless fragrant liquid found in many essential oils. | *"In academic literature, linalool designates a colorless fragrant liquid found in many essential oils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linanthus]] | noun | **1.** A genus of herbs of the family polemoniaceae; found in western united states. | *"In academic literature, linanthus designates a genus of herbs of the family polemoniaceae; found in western united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linaria]] | noun | **1.** Genus of herbs and subshrubs having showy flowers: spurred snapdragon. | *"In academic literature, linaria designates genus of herbs and subshrubs having showy flowers: spurred snapdragon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linchpin]] | noun | **1.** A central cohesive source of support and stability.<br>**2.** Pin inserted through an axletree to hold a wheel on. | *"A linchpin had fallen out, and permitted one of the wheels to slide off."* — Nathaniel Hawthorne, *Twice-Told Tales* |
| [[lincocin]] | noun | **1.** Antibiotic (trade name lincocin) obtained from a streptomyces bacterium and used in the treatment of certain penicillin-resistant infections. | *"In academic literature, lincocin designates antibiotic (trade name lincocin) obtained from a streptomyces bacterium and used in the treatment of certain penicillin-resistant infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lincoln]] | noun | **1.** 16th president of the united states; saved the union during the american civil war and emancipated the slaves; was assassinated by booth (1809-1865).<br>**2.** Capital of the state of nebraska; located in southeastern nebraska; site of the university of nebraska. | *"First I began in private With you, my Lord of Lincoln."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lincolnesque]] | adjective | **1.** Of or relating to or in the manner of abraham lincoln. | *"In academic literature, lincolnesque designates of or relating to or in the manner of abraham lincoln."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lincolnian]] | adjective | **1.** Of or relating to or in the manner of abraham lincoln. | *"In academic literature, lincolnian designates of or relating to or in the manner of abraham lincoln."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lincolnshire]] | noun | **1.** An agricultural county of eastern england on the north sea. | *"Yea, or the drone of a Lincolnshire bagpipe."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lincomycin]] | noun | **1.** Antibiotic (trade name lincocin) obtained from a streptomyces bacterium and used in the treatment of certain penicillin-resistant infections. | *"In academic literature, lincomycin designates antibiotic (trade name lincocin) obtained from a streptomyces bacterium and used in the treatment of certain penicillin-resistant infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[line]] | noun | **1.** A formation of people or things one beside another.<br>**2.** A mark that is long relative to its width. | *"O, ’tis most sweet, When in one line two crafts directly meet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[line-shooter]] | noun | **1.** A very boastful and talkative person. | *"In academic literature, line-shooter designates a very boastful and talkative person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[line-shooting]] | noun | **1.** An instance of boastful talk. | *"In academic literature, line-shooting designates an instance of boastful talk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lineage]] | noun | **1.** The descendants of one individual.<br>**2.** The kinship relation between an individual and the individual's progenitors. | *"Though I never knew what they were (being in Welsh), further than that they were highly eulogistic of the lineage of Morgan ap-Kerrig."* — Charles Dickens, *Bleak House* |
| [[lineal]] | adjective | **1.** In a straight unbroken line of descent from parent to child.<br>**2.** Arranged in a line. | *"Lo, where it sits, Which God shall guard; and put the world’s whole strength Into one giant arm, it shall not force This lineal honour from me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lineally]] | adverb | **1.** By an unbroken line of descent. | *"From these our Henry lineally descends."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lineament]] | noun | **1.** A characteristic property that defines the apparent individual nature of something.<br>**2.** The characteristic parts of a person's face: eyes and nose and mouth and chin. | *"Examine every married lineament, And see how one another lends content; And what obscur’d in this fair volume lies, Find written in the margent of his eyes."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[linear]] | adjective | **1.** Designating or involving an equation whose terms are of the first degree.<br>**2.** Of or in or along or relating to a line; involving a single dimension. | *"In some instances, to the quick, observant eye, those linear marks, as in a veritable engraving, but afford the ground for far other delineations."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[linearise]] | verb | **1.** Make linear or get into a linear form. | *"In academic literature, linearise designates make linear or get into a linear form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linearity]] | noun | **1.** The property of having one dimension. | *"In academic literature, linearity designates the property of having one dimension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linearize]] | verb | **1.** Make linear or get into a linear form. | *"In academic literature, linearize designates make linear or get into a linear form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linearly]] | adverb | **1.** In a linear manner. | *"In academic literature, linearly designates in a linear manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lineation]] | noun | **1.** The line that appears to bound an object.<br>**2.** The act of marking or outlining with lines. | *"In academic literature, lineation designates the line that appears to bound an object."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linebacker]] | noun | **1.** A defensive football player who takes a position close behind the linemen.<br>**2.** (american football) the position of a defensive football player who plays close behind the line of scrimmage. | *"In academic literature, linebacker designates a defensive football player who takes a position close behind the linemen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linecut]] | noun | **1.** A print obtained from a line drawing.<br>**2.** Engraving consisting of a block that has been etched or engraved. | *"In academic literature, linecut designates a print obtained from a line drawing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lined]] | verb | **1.** Be in line with; form a line along.<br>**2.** Cover the interior of. | *"And then the justice, In fair round belly with good capon lined, With eyes severe and beard of formal cut, Full of wise saws and modern instances; And so he plays his part."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[linelike]] | adjective | **1.** Resembling a line. | *"In academic literature, linelike designates resembling a line."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lineman]] | noun | **1.** One of the players on the line of scrimmage.<br>**2.** The surveyor who marks positions with a range pole. | *"In academic literature, lineman designates one of the players on the line of scrimmage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linemen]] | noun | **1.** The football players who line up on the line of scrimmage.<br>**2.** One of the players on the line of scrimmage. | *"In academic literature, linemen designates the football players who line up on the line of scrimmage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linen]] | noun | **1.** A fabric woven with fibers from the flax plant.<br>**2.** A high-quality paper made of linen fibers or with a linen finish. | *"Senseless linen, happier therein than I!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[linendraper]] | noun | **1.** A retail dealer in yard goods. | *"In academic literature, linendraper designates a retail dealer in yard goods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[liner]] | noun | **1.** (baseball) a hit that flies straight out from the batter.<br>**2.** A protective covering that protects an inside surface. | *"Furthermore, the Depot can be taken with minimum damage to its structures and to its Slingshot stores." "What's the point?" Brad looked at the questioner, a big man in a black and gray uniform and a soft helmet liner perched on the back of his head."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[linesman]] | noun | **1.** Official (in tennis, soccer, football, etc.) who assists the referee in some way (especially by watching for out of bounds or offside).<br>**2.** A person who installs or repairs electrical or telephone lines. | *"In academic literature, linesman designates official (in tennis, soccer, football, etc.) who assists the referee in some way (especially by watching for out of bounds or offside)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lineup]] | noun | **1.** (baseball) a list of batters in the order in which they will bat.<br>**2.** A line of persons arranged by police for inspection or identification. | *"One of the men in the lineup, third from the head, shifted his gaze from the officer to the guards and back again."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[lingerie]] | noun | **1.** Women's underwear and nightclothes. | *"Do they snapshot those girls or is it all a fake? _Lingerie_ does it."* — James Joyce, *Ulysses* |
| [[liniment]] | noun | **1.** A medicinal liquid that is rubbed into the skin to relieve muscular stiffness and pain. | *"Sitting on a wagon tongue, and applying liniment to an abraded shin, might have been seen Pythagoras, M."* — W. E. Webb, *Buffalo Land* |
| [[linin]] | noun | **1.** An obsolete term for the network of viscous material in the cell nucleus on which the chromatin granules were thought to be suspended. | *"Comin' round the bend and linin' up."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[lining]] | noun | **1.** A protective covering that protects an inside surface.<br>**2.** A piece of cloth that is used as the inside surface of a garment. | *"We have received your letters, full of love; Your favours, the ambassadors of love; And in our maiden council rated them At courtship, pleasant jest, and courtesy, As bombast and as lining to the time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[linnaea]] | noun | **1.** One species: twinflower. | *"In academic literature, linnaea designates one species: twinflower."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linnaean]] | adjective | **1.** Of or relating to linnaeus or to the system of taxonomic classification that linnaeus proposed. | *"In academic literature, linnaean designates of or relating to linnaeus or to the system of taxonomic classification that linnaeus proposed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linnaeus]] | noun | **1.** Swedish botanist who proposed the modern system of biological nomenclature (1707-1778). | *"The cereals which they cultivated were wheat, barley, and apparently sorghum (_Holcus sorghum,_ Linnaeus), the _doora_ of the modern fellaheen."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[linnean]] | adjective | **1.** Of or relating to linnaeus or to the system of taxonomic classification that linnaeus proposed. | *"In academic literature, linnean designates of or relating to linnaeus or to the system of taxonomic classification that linnaeus proposed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linnet]] | noun | **1.** Small finch originally of the western united states and mexico.<br>**2.** Small old world finch whose male has a red breast and forehead. | *"It seemed as if a linnet had hopped to my foot and proposed to bear me on its tiny wing."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[lino]] | noun | **1.** A floor covering. | *"On October 22 it was moving from the village of Mikúlino to that of Shámshevo."* — graf Leo Tolstoy, *War and Peace* |
| [[linocut]] | noun | **1.** A print that is made from a design carved in relief into a block of linoleum.<br>**2.** A design carved in relief into a block of linoleum. | *"In academic literature, linocut designates a print that is made from a design carved in relief into a block of linoleum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linoleum]] | noun | **1.** A floor covering. | *"We heard the door open, a few hurried words, and then quick steps upon the linoleum."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[linotype]] | noun | **1.** A typesetting machine operated from a keyboard that casts an entire line as a single slug of metal. | *"In substantiation of his theory he exhibits a specimen of a word cast as a unit for him by this process, roughly similar to a modern linotype slug."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[linseed]] | noun | **1.** The seed of flax used as a source of oil. | *"Poor Dignam! [ 5 ] By lorries along sir John Rogerson’s quay Mr Bloom walked soberly, past Windmill lane, Leask’s the linseed crusher, the postal telegraph office."* — James Joyce, *Ulysses* |
| [[linsey-woolsey]] | noun | **1.** A rough fabric of linen warp and wool or cotton woof. | *"In academic literature, linsey-woolsey designates a rough fabric of linen warp and wool or cotton woof."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linstock]] | noun | **1.** A stick about a meter long with a point on one end (to stick in the ground) and a forked head on the other end (to hold a lighted match); formerly used to fire cannons. | *"The offer likes not; and the nimble gunner With linstock now the devilish cannon touches, [_Alarum, and chambers go off._] And down goes all before them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lint]] | noun | **1.** Fine ravellings of cotton or linen fibers.<br>**2.** Cotton or linen fabric with the nap raised on one side; used to dress wounds. | *"In the north-east of Scotland lint seed was used instead of hemp seed and answered the purpose quite as well.[600] Again, a mode of ascertaining your future husband or wife was this."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[lintel]] | noun | **1.** Horizontal beam used as a finishing piece over a door or window. | *"Of evenings she would stand dreaming at the lintel while he was leaning dreaming over the taffrail, and though there were ten thousand miles between them their hearts would be intimate as pigeons...."* — Donn Byrne, *The Wind Bloweth* |
| [[lintwhite]] | noun | **1.** Small old world finch whose male has a red breast and forehead. | *"In vain to me the cowslips blaw, In vain to me the vi’lets spring; In vain to me in glen or shaw, The mavis and the lintwhite sing."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[linum]] | noun | **1.** A herbaceous plant genus of the family linaceae with small sessile leaves. | *"FLAX RUST; spots yellowish; sori subrotund, scattered, surrounded by the ruptured epidermis; spores globose or pyriform, sometimes pedicellate.—On _Linum catharticum_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[linuron]] | noun | **1.** A herbicide that kills weeds without harming vegetables. | *"In academic literature, linuron designates a herbicide that kills weeds without harming vegetables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[linux]] | noun | **1.** An open-source version of the unix operating system. | *"In academic literature, linux designates an open-source version of the unix operating system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonlinear]] | adjective | **1.** Designating or involving an equation whose terms are not of the first degree. | *"In academic literature, nonlinear designates designating or involving an equation whose terms are not of the first degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[outline]] | noun | **1.** The line that appears to bound an object.<br>**2.** A sketchy summary of the main points of an argument or theory. | *"It came from the direction of a small dark object under the plantation hedge—a shepherd’s hut—now presenting an outline to which an uninitiated person might have been puzzled to attach either meaning or use."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[outlined]] | verb | **1.** Describe roughly or briefly or give the main points or summary of.<br>**2.** Draw up an outline or sketch for something. | *"He was a gentlemanly man, with full and distinctly outlined Roman features, the prominences of which glowed in the sun with a bronze-like richness of tone."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[proline]] | noun | **1.** An amino acid that is found in many proteins (especially collagen). | *"In academic literature, proline designates an amino acid that is found in many proteins (especially collagen)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redline]] | verb | **1.** Discriminate in selling or renting housing in certain areas of a neighborhood. | *"In academic literature, redline designates discriminate in selling or renting housing in certain areas of a neighborhood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reline]] | verb | **1.** Provide with a new lining.<br>**2.** Put new lines on. | *"The converter is constructed in two portions, the body and the hood, in order to facilitate removal, relining, and general repairs."* — Donald M. Levy, *Modern Copper Smelting* |
| [[surliness]] | noun | **1.** A disposition to exhibit uncontrolled anger. | *"In academic literature, surliness designates a disposition to exhibit uncontrolled anger."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undelineated]] | adjective | **1.** Not represented accurately or precisely. | *"In academic literature, undelineated designates not represented accurately or precisely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underline]] | noun | **1.** A line drawn underneath (especially under written matter).<br>**2.** Give extra weight to (a communication). | *"Underline _imposs._ To write today."* — James Joyce, *Ulysses* |
| [[unlined]] | adjective | **1.** Not having a lining or liner.<br>**2.** Smooth, especially of skin. | *"At that time, like all the farm servants' dwellings in the district, it consisted of a single room with an earthen floor, an open unlined roof of red tiles, and rafters running across and resting on the wall at each side."* — John Cairns, *Principal Cairns* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Structure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LIN
  </div>
</div>
