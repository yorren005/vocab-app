---
status: unread
type: root_dashboard
---
# Dashboard — tab
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">tab-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“board, tablet, plank, or record”</span>
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

The root **tab** means board, tablet, plank, or record. It refers to a flat wooden board, slate tablet, or record surface. In English, this root forms words such as *tablet*, *tabloid*, *tabular*, and *tabulate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: board, tablet, plank, or record
> The root **tab** means board, tablet, plank, or record. It refers to a flat wooden board, slate tablet, or record surface. In English, this root forms words such as *tablet*, *tabloid*, *tabular*, and *tabulate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Board, tablet, plank, or record</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sturdy wooden framework supporting the roof of a house.</mark>
> - **Everyday Connection**: Think of familiar words like *tablet* and *tabloid*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **tab** comes from a Latin word that means *"board, tablet, plank, or record"*.
  - At its core, it describes board, tablet, plank, or record.

- **The Big Picture Idea**:
  - Picture the sturdy wooden framework supporting the roof of a house.
  - Whenever you see **tab** in an English word, think of **underlying structure and framework**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of board, tablet, plank, or record.
  - **Mental & Social**: How people experience, organize, or communicate about board, tablet, plank, or record.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Tablet**: A small, flat, compressed mass of medicine or confectionery. 2. A flat slab of stone, clay, or wood inscribed with text. 3. A portable touch-screen computer.
  - **Tabloid**: A newspaper having pages half the size of those of a standard broadsheet, typically sensational in style. 2. Sensational or condensed.
  - **Tabular**: Relating to or arranged in a table or systematic list of columns and rows. 2. Flat like a board.
  - **Tabulate**: To arrange data or information in a tabular form. 2. To count or tally election ballots systematically.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">tab</mark>, think of <mark class="hl-def">underlying structure and framework</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **tab** generates words through Latin diminutive, French, and technical channels:
- **Direct Latin Diminutive Stem (`tablet-` < *tabella*)**:
  - *tabula* $\to$ diminutive *tabella* $\to$ Old French *tablete* $\to$ **tablet**.
- **Data & Matrix Stems (`tabul-` < *tabula*)**:
  - *tabula* $\to$ *tabulāris* $\to$ **tabular**, **tabularize**.
  - *tabula* $\to$ *tabulāre* $\to$ **tabulate**, **tabulation**, **tabulator**.
  - Latin phrase: **tabula rasa** ("scraped tablet; blank slate").
- **French & Vernacular Stems (`table-` / `tabloid-`)**:
  - *tabula* via French $\to$ **table**, **tableau** (plural **tableaux**).
  - Pharmaceutical trademark $\to$ **tabloid**.

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

The derivatives of **tab** span four primary conceptual domains:
- **Data Analysis, Statistics & Computing**: *tabular* (arranged in a table or that of columns and rows), *tabulate* (arrange data in tabular form), *tabulation* (the act of counting and arranging data).
- **Physical Objects & Pharmaceuticals**: *tablet* (a small, flat disc of compressed solid medicine; a flat slab of stone or wood used for writing), *tablet computer*.
- **Media & Journalism**: *tabloid* (a newspaper having pages half the size of those of a standard broadsheet, typically popular in style and dominated by sensational news).
- **Epistemology & Fine Arts**: *tabula rasa* (an absence of preconceived ideas or predetermined goals; a clean slate), *tableau* (a dramatic, picturesque scene or motionless grouping of actors).

---

## 🔀 4. Prefix & Combining Dynamics on tab

| Form / Compound | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`tabula`** + **`rāsa`** | `tabula` + `rāsa` | A wax tablet scraped clean with a warm knife $\to$ blank slate mind | *tabula rasa* |
| **`-āris`** (adjectival) | `tabula` + `-āris` | Organized like a clerk's table of accounts $\to$ column/row grid | *tabular, tabularize* |
| **`-āre`** (verbal) | `tabula` + `-āre` | Arrange into rows and columns to count $\to$ calculate election votes | *tabulate, tabulation, tabulator* |
| **`-oid`** ("resembling") | `tabloid` (trademark) | Compressed like a medicine pill $\to$ sensational condensed news | *tabloid* |
| **`-eau`** (French diminutive)| `tabula` $\to$ *tableau* | A small painted board $\to$ picturesque living scene | *tableau, tableaux* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Statistics, Accounting & Database Engineering**: Relational databases, spreadsheets, and demographic census tabulation (*census tabulation*, *tabular data*).
- **Philosophy of Mind & Cognitive Psychology**: John Locke's empiricist doctrine of the human mind as a blank slate at birth (*tabula rasa*).
- **Pharmacology & Healthcare**: Solid dosage formulation, tablet compression, and enteric coatings (*pharmaceutical tablet*).
- **Media Studies & Print Journalism**: Tabloid press ethics, paparazzi culture, and sensationalism (*tabloid journalism*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[actable]] | adjective | **1.** Capable of being acted; suitable for the stage. | *"In academic literature, actable designates capable of being acted; suitable for the stage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antabuse]] | noun | **1.** A drug (trade name antabuse) used in the treatment of alcoholism; causes nausea and vomiting if alcohol is ingested. | *"In academic literature, antabuse designates a drug (trade name antabuse) used in the treatment of alcoholism; causes nausea and vomiting if alcohol is ingested."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entablature]] | noun | **1.** (architecture) the structure consisting of the part of a classical temple above the columns between a capital and the roof. | *"So with a broken throne, the great gods mock that captive king; so like a Caryatid, he patient sits, upholding on his frozen brow the piled entablatures of ages."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[tab]] | noun | **1.** The bill in a restaurant.<br>**2.** Sensationalist journalism. | *"Hodak stretched, quickly finished his drink, paid his tab, and slapped drinking partners' shoulders good-bye."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tabanidae]] | noun | **1.** Horseflies. | *"In academic literature, tabanidae designates horseflies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabard]] | noun | **1.** A short sleeveless outer tunic emblazoned with a coat of arms; worn by a knight over his armor or by a herald. | *"Mine host came forth at the summons, girding him with his tabard. —Give you good den, my masters, said he with an obsequious bow. —Bestir thyself, sirrah! cried he who had knocked."* — James Joyce, *Ulysses* |
| [[tabasco]] | noun | **1.** A mexican state on the gulf of campeche.<br>**2.** Very spicy sauce (trade name tabasco) made from fully-aged red peppers. | *"In academic literature, tabasco designates a mexican state on the gulf of campeche."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabernacle]] | noun | **1.** The mormon temple.<br>**2.** (judaism) a portable sanctuary in which the jews carried the ark of the covenant on their exodus. | *"At one of the prayer-meetings at the Brooklyn tabernacle, Mr."* — Classic Author, *The wonders of prayer* |
| [[tabernacles]] | noun | **1.** A major jewish festival beginning on the eve of the 15th of tishri and commemorating the shelter of the israelites during their 40 years in the wilderness.<br>**2.** The mormon temple. | *"Man's works are graven, cunning, and skilful On earth, where his tabernacles are; But the sea is wanton, the sea is wilful, And who shall mend her and who shall mar?"* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[tabernaemontana]] | noun | **1.** Evergreen tropical trees and shrubs with milky sap. | *"In academic literature, tabernaemontana designates evergreen tropical trees and shrubs with milky sap."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabes]] | noun | **1.** Wasting of the body during a chronic disease. | *"In academic literature, tabes designates wasting of the body during a chronic disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabi]] | noun | **1.** A sock with a separation for the big toe; worn with thong sandals by the japanese. | *"In academic literature, tabi designates a sock with a separation for the big toe; worn with thong sandals by the japanese."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabis]] | noun | **1.** A sock with a separation for the big toe; worn with thong sandals by the japanese. | *"In academic literature, tabis designates a sock with a separation for the big toe; worn with thong sandals by the japanese."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tablature]] | noun | **1.** A musical notation indicating the fingering to be used. | *"In academic literature, tablature designates a musical notation indicating the fingering to be used."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[table]] | noun | **1.** A set of data arranged in rows and columns.<br>**2.** A piece of furniture having a smooth flat top that is usually supported by one or more vertical legs. | *"Sit down and feed, and welcome to our table."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tableau]] | noun | **1.** A group of people attractively arranged (as if in a painting).<br>**2.** Any dramatic scene. | *"Colonel Dent, their spokesman, demanded “the tableau of the whole;” whereupon the curtain again descended."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[tablecloth]] | noun | **1.** A covering spread over a dining table. | *"She soon finished her eating, and having a consciousness that Clare was regarding her, began to trace imaginary patterns on the tablecloth with her forefinger with the constraint of a domestic animal that perceives itself to be watched."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tablefork]] | noun | **1.** A fork for eating at a dining table. | *"In academic literature, tablefork designates a fork for eating at a dining table."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tableland]] | noun | **1.** A relatively flat highland. | *"Flintcomb-Ash being in the middle of the cretaceous tableland over which no railway had climbed as yet, it would be necessary to walk."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tablemate]] | noun | **1.** Someone you dine with. | *"In academic literature, tablemate designates someone you dine with."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tablespoon]] | noun | **1.** As much as a tablespoon will hold.<br>**2.** A spoon larger than a dessert spoon; used for serving. | *"Would a tablespoon of vanilla be enough for a small layer cake?” “I felt sorrier than ever for the poor man."* — L. M. Montgomery, *Anne of Avonlea* |
| [[tablespoonful]] | noun | **1.** As much as a tablespoon will hold. | *"The oddest thing was its earth-pouches--two open sacks, one on either side of its head, and capable of containing each a tablespoonful or more."* — W. E. Webb, *Buffalo Land* |
| [[tablet]] | noun | **1.** A slab of stone or wood suitable for bearing an inscription.<br>**2.** A number of sheets of paper fastened together along one edge. | *"This tablet lay upon his breast, wherein Our pleasure his full fortune doth confine; And so, away; no farther with your din Express impatience, lest you stir up mine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tabletop]] | noun | **1.** The top horizontal work surface of a table. | *"Absently, his stubby fingers drummed the tabletop."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[tableware]] | noun | **1.** Articles for use at the table (dishes and silverware and glassware). | *"Seeing all was well, she smiled, and carried another armful of dishes and tableware to the kitchen counter."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[tabloid]] | noun | **1.** Sensationalist journalism.<br>**2.** Newspaper with half-size pages. | *"One tabloid of cascara sagrada."* — James Joyce, *Ulysses* |
| [[taboo]] | noun | **1.** A prejudice (especially in polynesia and other south pacific islands) that prohibits the use or mention of something because of its sacred nature.<br>**2.** An inhibition or ban resulting from social custom or emotional aversion. | *"To me it is most memorable—the time when the one with a grouch, who never played, alighted in a moment of absent-mindedness within the taboo precinct and was immediately captured in my hand."* — Jack London, *The Jacket (The Star-Rover)* |
| [[tabooli]] | noun | **1.** A finely chopped salad with tomatoes and parsley and mint and scallions and bulgur wheat. | *"In academic literature, tabooli designates a finely chopped salad with tomatoes and parsley and mint and scallions and bulgur wheat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabor]] | noun | **1.** A small drum with one head of soft calfskin. | *"The shepherd knows not thunder from a tabor More than I know the sound of Martius’ tongue From every meaner man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tabora]] | noun | **1.** A city in western tanzania. | *"In academic literature, tabora designates a city in western tanzania."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[taboret]] | noun | **1.** A low stool in the shape of a drum. | *"In academic literature, taboret designates a low stool in the shape of a drum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabour]] | noun | **1.** A small drum with one head of soft calfskin. | *"In academic literature, tabour designates a small drum with one head of soft calfskin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabouret]] | noun | **1.** A low stool in the shape of a drum. | *"In academic literature, tabouret designates a low stool in the shape of a drum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabriz]] | noun | **1.** An ancient city in northwestern iran; known for hot springs. | *"In academic literature, tabriz designates an ancient city in northwestern iran; known for hot springs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabu]] | noun | **1.** A prejudice (especially in polynesia and other south pacific islands) that prohibits the use or mention of something because of its sacred nature.<br>**2.** An inhibition or ban resulting from social custom or emotional aversion. | *"He told me that it was '_tabu_,' forbidden for any men but their own relations to look at them; but I suppose the promised beads acted as an inducement, and so he sent away for some old lady who had charge, and who alone is allowed to open the doors."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[tabuk]] | noun | **1.** A city in northwestern saudi arabia. | *"In academic literature, tabuk designates a city in northwestern saudi arabia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabular]] | adjective | **1.** Of or pertaining to or arranged in table form.<br>**2.** Flat; like a table in form. | *"The tabular standard. § 1. #Relative positions of gold and silver: historical.# It is not possible within the limits of our space to enter here into the details of the world's monetary history."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[tabularise]] | verb | **1.** Arrange or enter in tabular form. | *"In academic literature, tabularise designates arrange or enter in tabular form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabularize]] | verb | **1.** Arrange or enter in tabular form. | *"In academic literature, tabularize designates arrange or enter in tabular form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabulate]] | verb | **1.** Arrange or enter in tabular form.<br>**2.** Shape or cut with a flat surface. | *"He cannot tabulate reasons; the thing, he says, was so clear that I was a long way past reasons."* — T. R. Glover, *The Jesus of History* |
| [[tabulation]] | noun | **1.** Information set out in tabular form.<br>**2.** The act of putting into tabular form. | *"This paper, now, ‘Synoptical Tabulation’ and so on, ‘for the use of Mrs."* — George Eliot, *Middlemarch* |
| [[tabulator]] | noun | **1.** A calculator that keeps a record of the number of times something happens. | *"In academic literature, tabulator designates a calculator that keeps a record of the number of times something happens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tabun]] | noun | **1.** The first known nerve agent, synthesized by german chemists in 1936; a highly toxic combustible liquid that is soluble in organic solvents and is used as a nerve gas in chemical warfare. | *"In academic literature, tabun designates the first known nerve agent, synthesized by german chemists in 1936; a highly toxic combustible liquid that is soluble in organic solvents and is used as a nerve gas in chemical warfare."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unactable]] | adjective | **1.** Not actable. | *"In academic literature, unactable designates not actable."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · TAB
  </div>
</div>
