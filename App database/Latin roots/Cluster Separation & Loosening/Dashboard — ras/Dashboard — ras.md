---
status: unread
type: root_dashboard
---
# Dashboard — ras
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ras-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to scrape or shave”</span>
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

The root **ras** means to scrape or shave. It refers to the action of scraping and carrying out this process. In English, this root forms words such as *writing*, *inscribing*, *abrade*, and *abrasion*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to scrape or shave
> The root **ras** means to scrape or shave. It refers to the action of scraping and carrying out this process. In English, this root forms words such as *writing*, *inscribing*, *abrade*, and *abrasion*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To scrape or shave</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Untying a tight knot and separating two parts from each other.</mark>
> - **Everyday Connection**: Think of familiar words like *writing* and *inscribing*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ras** comes from a Latin word that means *"to scrape or shave"*.
  - At its core, it describes the action of scrape or shave.

- **The Big Picture Idea**:
  - Picture untying a tight knot and separating two parts from each other.
  - Whenever you see **ras** in an English word, think of **to scrape or shave**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to scrape or shave).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Writing**: An everyday English word showing the root's idea of *to scrape or shave*.
  - **Inscribing**: An everyday English word showing the root's idea of *to scrape or shave*.
  - **Abrade**: To scrape or wear away by friction or mechanical erosion.
  - **Abrasion**: The process of scraping or wearing something away. 2. A superficial wound caused by skin rubbing against a rough surface.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ras</mark>, think of <mark class="hl-def">to scrape or shave</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Supine / Participial Base:** *rās-* $\to$ *razor*, *raze*, *rascal*.
- **Prefixation of Intensive Removal:**
  - `ex-` + *rādere / rāsum* $\to$ *ē-rādere* $\to$ *erase*, *eraser*, *erasure*.
  - `ab-` + *rādere / rāsum* $\to$ *abrade* (to scrape away), *abrasion*, *abrasive*, *abrasiveness*.
  - `con-` + *rādere* $\to$ *corrade* (geological river scraping), *corrasion*.
- **Biological / Anatomical Base:**
  - *radula* (the chitinous ribbon of teeth mollusks use to scrape algae from rocks).

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

### 1. Mechanical Friction & Industrial Wear
- *abrade* (to scrape or wear away by friction or erosion).
- *abrasion* (the process of scraping or wearing away; an area damaged by scraping).
- *abrasive* (showing little concern for others' feelings; harsh; a substance used for grinding).
- *abrasiveness* (the quality of being abrasive, rough, or harshly irritating).

### 2. Obliteration & Complete Deletion
- *erase* (to rub out or obliterate writing; to remove completely from memory or record).
- *eraser* (an object used to remove marks made by pencil, chalk, or ink).
- *erasure* (the removal of all traces of something; obliteration).

### 3. Destruction & Shaving
- *raze* (to completely destroy a building, town, or settlement level with the ground).
- *razor* (an instrument with a sharp blade used for shaving hair from the body).

### 4. Philosophy, Zoology & Metaphor
- *tabula rasa* (an absence of preconceived ideas; a clean slate).
- *radula* (an anatomical structure of tiny teeth used by mollusks for scraping food).
- *rascal* (a mischievous or cheeky person; originally society's scrapings).

---

## 🔀 4. Prefix & Combining Dynamics on ras

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `ab-` + `ras-` + `-ion` | Frictional detachment | Mechanical erosion or surface skin grazing | *abrasion* |
| `ab-` + `ras-` + `-ive` | Quality of friction | Harsh, grinding, irritating in texture or personality | *abrasive* |
| `ex-` + `ras-` + `-ure` | Obliterative prefixation | Complete wipe-out of written text, data, or memory | *erasure* |
| `con-` + `rad-` + `-e` | Geological friction | Mutual rubbing together of rock particles in streams | *corrade, corrasion* |
| `ras-` + `-or` | Instrumental agent | Blade designed for close-contact hair scraping | *razor* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Dermatology & Trauma Medicine:** Corneal abrasions, epidermal friction burns, abrasive wound debridement.
- **Geology & Geomorphology:** Glacial abrasion, fluvial corrasion, windblown desert ventifacts.
- **Epistemology & Cognitive Psychology:** Empiricism, Locke's *tabula rasa* doctrine, nature vs nurture debates.
- **Military History & Warfare:** The razing of Carthage (146 BC), scorched-earth policy, razing fortifications.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[abrase]] | verb | **1.** Wear away. | *"In academic literature, abrase designates wear away."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abrasion]] | noun | **1.** An abraded area where the skin is torn or worn off.<br>**2.** Erosion by friction. | *"His remaining works are much injured by scaling or the abrasion of the colors. 28."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[abrasive]] | noun | **1.** A substance that abrades or wears down.<br>**2.** Causing abrasion. | *"His abrasive voice matched his heavy features and rotund body."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[abrasiveness]] | noun | **1.** The roughness of a substance that causes abrasions.<br>**2.** The quality of being sharply disagreeable. | *"In academic literature, abrasiveness designates the roughness of a substance that causes abrasions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acrasiomycetes]] | noun | **1.** Cellular slime molds; in some classifications placed in kingdom protoctista. | *"In academic literature, acrasiomycetes designates cellular slime molds; in some classifications placed in kingdom protoctista."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[afrasian]] | noun | **1.** A large family of related languages spoken both in asia and africa. | *"In academic literature, afrasian designates a large family of related languages spoken both in asia and africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arras]] | noun | **1.** A wall hanging of heavy handwoven fabric with pictorial designs. | *"Be you and I behind an arras then, Mark the encounter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[corrasion]] | noun | **1.** Erosion by friction. | *"In academic literature, corrasion designates erosion by friction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erasable]] | adjective | **1.** Capable of being effaced. | *"In academic literature, erasable designates capable of being effaced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erase]] | verb | **1.** Remove from memory or existence.<br>**2.** Remove by or as if by rubbing or erasing. | *"While earnestly wishing to erase from his mind the trace of my former offence, I had stamped on that tenacious surface another and far deeper impression: I had burnt it in."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[eraser]] | noun | **1.** An implement used to erase something. | *"In academic literature, eraser designates an implement used to erase something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erasmian]] | adjective | **1.** Of or relating to or in the manner of erasmus. | *"In academic literature, erasmian designates of or relating to or in the manner of erasmus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erasmus]] | noun | **1.** Dutch humanist and theologian who was the leading renaissance scholar of northern europe; although his criticisms of the roman catholic church led to the reformation, he opposed violence and condemned martin luther (1466-1536). | *"Hippolytus, Plotinus, Athenodorus, and of that friend of Erasmus named Grocyn."* — Jack London, *The Jacket (The Star-Rover)* |
| [[erastianism]] | noun | **1.** The doctrine that the state is supreme over the church in ecclesiastical matters. | *"In academic literature, erastianism designates the doctrine that the state is supreme over the church in ecclesiastical matters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[erasure]] | noun | **1.** A correction made by erasing.<br>**2.** A surface area where something has been erased. | *"It is to be presented fairly written, without any erasure or interlineation, or the Speaker may refuse it. _Scob._, 41; _1 Grey_, 82, 84."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[ras]] | noun | **1.** The network in the reticular formation that serves an alerting or arousal function.<br>**2.** An intensely radioactive metallic element that occurs in minute amounts in uranium ores. | *"They're shipping people, which is where the diamond ta-ra-ras come from."* — Anthony Pryde, *Nightfall* |
| [[rascal]] | noun | **1.** A deceitful and unreliable scoundrel.<br>**2.** One who is playfully mischievous. | *"Were I his lady I would poison that vile rascal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rascality]] | noun | **1.** The trait of indulging in disreputable pranks.<br>**2.** The quality of being a slippery rascal. | *"Only genius could have made Charlotte what she is, yet not disagreeable; Wickham what he is, without investing him either with a cheap Don Juanish attractiveness or a disgusting rascality."* — Jane Austen, *Pride and Prejudice* |
| [[rascally]] | adjective | **1.** Playful in an appealingly bold way.<br>**2.** Lacking principles or scruples; ;  - w.m. thackaray. | *"Pray you, sir, use the carp as you may, for he looks like a poor, decayed, ingenious, foolish, rascally knave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rase]] | verb | **1.** Tear down so as to make flat with the ground. | *"Mistake me not, my lord, ’tis not my meaning To rase one title of your honour out."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rasmussen]] | noun | **1.** Danish ethnologist and arctic explorer; led expeditions into the arctic to find support for his theory that eskimos and north american indians originally migrated from asia (1879-1933). | *"In academic literature, rasmussen designates danish ethnologist and arctic explorer; led expeditions into the arctic to find support for his theory that eskimos and north american indians originally migrated from asia (1879-1933)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rassling]] | noun | **1.** The sport of hand-to-hand struggle between unarmed contestants who try to throw each other down. | *"In academic literature, rassling designates the sport of hand-to-hand struggle between unarmed contestants who try to throw each other down."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rasta]] | noun | **1.** Follower of rastafarianism. | *"In academic literature, rasta designates follower of rastafarianism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rastafari]] | noun | **1.** (jamaica) a black youth subculture and religious movement that arose in the ghettos of kingston, jamaica, in the 1950s; males grow hair in long dreadlocks and wear woolen caps; use marijuana and listen to reggae music. | *"In academic literature, rastafari designates (jamaica) a black youth subculture and religious movement that arose in the ghettos of kingston, jamaica, in the 1950s; males grow hair in long dreadlocks and wear woolen caps; use marijuana and listen to reggae music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rastafarian]] | noun | **1.** Follower of rastafarianism.<br>**2.** (ethiopia) adherents of an african religion that regards ras tafari as divine. | *"In academic literature, rastafarian designates follower of rastafarianism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rastafarianism]] | noun | **1.** A religious cult based on a belief that ras tafari (haile selassie) is the messiah and that africa (especially ethiopia) is the promised land. | *"In academic literature, rastafarianism designates a religious cult based on a belief that ras tafari (haile selassie) is the messiah and that africa (especially ethiopia) is the promised land."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rastas]] | noun | **1.** (jamaica) a black youth subculture and religious movement that arose in the ghettos of kingston, jamaica, in the 1950s; males grow hair in long dreadlocks and wear woolen caps; use marijuana and listen to reggae music.<br>**2.** Follower of rastafarianism. | *"In academic literature, rastas designates (jamaica) a black youth subculture and religious movement that arose in the ghettos of kingston, jamaica, in the 1950s; males grow hair in long dreadlocks and wear woolen caps; use marijuana and listen to reggae music."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[raster]] | noun | **1.** The rectangular formation of parallel scanning lines that guide the electron beam on a television screen or a computer monitor. | *"In academic literature, raster designates the rectangular formation of parallel scanning lines that guide the electron beam on a television screen or a computer monitor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rasterize]] | verb | **1.** Convert (an image) into pixels. | *"In academic literature, rasterize designates convert (an image) into pixels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sucrase]] | noun | **1.** An enzyme that catalyzes the hydrolysis of sucrose into glucose and fructose. | *"In academic literature, sucrase designates an enzyme that catalyzes the hydrolysis of sucrose into glucose and fructose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suprasegmental]] | adjective | **1.** Pertaining to a feature of speech that extends over more than a single speech sound. | *"In academic literature, suprasegmental designates pertaining to a feature of speech that extends over more than a single speech sound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unerasable]] | adjective | **1.** Cannot be removed or erased. | *"In academic literature, unerasable designates cannot be removed or erased."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · RAS
  </div>
</div>
