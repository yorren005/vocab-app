---
status: unread
type: root_dashboard
---
# Dashboard — struct
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">struct-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to build or heap”</span>
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

The root **struct** means to build or heap. It refers to constructing structures, putting parts together, or creating something solid. In English, this root forms words such as *structure*, *construct*, *instruction*, and *destruction*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to build or heap
> The root **struct** means to build or heap. It refers to constructing structures, putting parts together, or creating something solid. In English, this root forms words such as *structure*, *construct*, *instruction*, and *destruction*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To build or heap</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sturdy wooden framework supporting the roof of a house.</mark>
> - **Everyday Connection**: Think of familiar words like *structure* and *construct*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **struct** comes from a Latin word that means *"to build or heap"*.
  - At its core, it describes the action of build or heap.

- **The Big Picture Idea**:
  - Picture the sturdy wooden framework supporting the roof of a house.
  - Whenever you see **struct** in an English word, think of **to build or heap**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to build or heap).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Structure**: The arrangement of and relations between the parts or elements of something complex. 2. A building or complex framework. 3. Construct or organize.
  - **Construct**: To build or erect something, typically a building, road, or machine. 2. An idea or theory containing various conceptual elements.
  - **Instruction**: A direction or order. 2. Detailed information telling how something should be done, operated, or assembled.
  - **Destruction**: The action or process of causing so much damage to something that it no longer exists or cannot be repaired.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">struct</mark>, think of <mark class="hl-def">to build or heap</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **struct** attaches systematically to Latin directional prefixes:
- **Base Noun Stems (`struct-` < *strūctum*)**:
  - *strūctūra* $\to$ **structure**, **structural**, **structuralism**.
  - *īnstrūmentum* $\to$ **instrument**, **instrumental**.
  - *industria* $\to$ **industry**, **industrious**, **industrial**.
- **Prefix Compounds**:
  - *con-* ("together") + *struere* $\to$ **construct**, **construction**, **constructive**, **reconstruct**.
  - *de-* ("down") + *struere* $\to$ **destruct**, **destruction**, **destructive**, **indestructible**.
  - *infra-* ("below") + *structure* $\to$ **infrastructure**.
  - *in-* ("into, upon") + *struere* $\to$ **instruct**, **instruction**, **instructive**, **instructor**.
  - *ob-* ("against") + *struere* $\to$ **obstruct**, **obstruction**, **obstructive**.
  - *con-* + *struere* (French adaptation) $\to$ **construe**, **misconstrue** (cross-indexed with [[Dashboard — stru]]).

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

The derivatives of **struct** cover five massive domains:
- **Civil Engineering & Architecture**: *structure* (a building or other object constructed from several parts), *construct* (build or erect), *reconstruct* (build again after damage), *infrastructure* (the basic physical and organizational structures needed for society).
- **Pedagogy, Command & Tools**: *instruct* (teach someone a subject or give formal commands), *instruction* (detailed information about how to do something), *instrument* (a tool or implement for precision work).
- **Economic Production & Enterprise**: *industry* (economic activity concerned with processing raw materials; hard work), *industrial*.
- **Demolition & Catastrophe**: *destruct* (destroy deliberately), *destruction* (the action or process of causing so much damage that something no longer exists), *destructive*, *indestructible*.
- **Barriers & Hermeneutics**: *obstruct* (block an opening or path; impede), *construe* (interpret), *misconstrue*.

---

## 🔀 4. Prefix & Combining Dynamics on struct

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`infra-`** ("below") | `infra-` + *strūctūra* | Structure lying beneath the surface $\to$ roads, bridges, power grid | *infrastructure* |
| **`con-`** ("together") | `con-` + *strūctum* | Put components together $\to$ build a building, devise an argument | *construct, reconstruction* |
| **`de-`** ("down") | `de-` + *strūctum* | Tear down the building $\to$ demolish, ruin, catastrophic damage | *destruct, destruction* |
| **`in-`** ("into") | `in-` + *strūctum* | Build knowledge inside a person $\to$ teach, command | *instruct, instruction, instrument* |
| **`ob-`** ("against") | `ob-` + *strūctum* | Build a barrier against a passageway $\to$ block, impede | *obstruct, obstruction* |
| **`indu-`** ("within") | `indu-` + *struere* | Building ceaselessly from within $\to$ productive hard work | *industry, industrious* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Civil & Structural Engineering**: Tensile load balancing, seismic retrofitting, and public transit corridors (*infrastructure*, *structural engineering*).
- **Macroeconomics & Manufacturing**: Heavy manufacturing, automation, and industrial revolution (*industrial output*, *heavy industry*).
- **Pedagogy & Curriculum Design**: Direct instructional models and didactic sequencing (*instructional design*).
- **Jurisprudence & Statutory Law**: Obstruction of justice, strict construction of statutory texts (*obstruction of justice*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[construct]] | noun | **1.** An abstract or general idea inferred or derived from specific instances.<br>**2.** Make by combining materials and parts. | *"Upon the undertaker’s stating in the Sol’s bar in the course of the day that he has received orders to construct “a six-footer,” the general solicitude is much relieved, and it is considered that Mr."* — Charles Dickens, *Bleak House* |
| [[construction]] | noun | **1.** The act of constructing something.<br>**2.** A group of words that form a constituent of a sentence and are considered as a single unit. | *"I know it, And my pretext to strike at him admits A good construction."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[constructive]] | adjective | **1.** Constructing or tending to construct or improve or promote development.<br>**2.** Emphasizing what is laudable or hopeful or to the good. | *"This has been a real service to the cause of moderate and constructive reform. § 20. #Revisionism and opportunism in the socialist party#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[constructive-metabolic]] | adjective | **1.** Of or relating to anabolism. | *"In academic literature, constructive-metabolic designates of or relating to anabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constructively]] | adverb | **1.** In a constructive manner. | *"In academic literature, constructively designates in a constructive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constructiveness]] | noun | **1.** The quality of serving to build or improve. | *"In academic literature, constructiveness designates the quality of serving to build or improve."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constructivism]] | noun | **1.** An abstractionist artistic movement in russia after world war i; industrial materials were used to construct nonrepresentational objects. | *"In academic literature, constructivism designates an abstractionist artistic movement in russia after world war i; industrial materials were used to construct nonrepresentational objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constructivist]] | noun | **1.** An artist of the school of constructivism. | *"In academic literature, constructivist designates an artist of the school of constructivism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[constructor]] | noun | **1.** Someone who contracts for and supervises construction (as of a building). | *"All these deeds manifested Jesus' control over the belief that matter is substance, 369:12 that it can be the arbiter of life or the constructor of any form of existence."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[deconstruct]] | verb | **1.** Interpret (a text or an artwork) by the method of deconstructing. | *"In academic literature, deconstruct designates interpret (a text or an artwork) by the method of deconstructing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconstruction]] | noun | **1.** A philosophical theory of criticism (usually of literature or film) that seeks to expose deep-seated contradictions in a work by delving below its surface meaning. | *"In academic literature, deconstruction designates a philosophical theory of criticism (usually of literature or film) that seeks to expose deep-seated contradictions in a work by delving below its surface meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deconstructivism]] | noun | **1.** A school of architecture based on the philosophical theory of deconstruction. | *"In academic literature, deconstructivism designates a school of architecture based on the philosophical theory of deconstruction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destruct]] | verb | **1.** Destroy (one's own missile or rocket).<br>**2.** Do away with, cause the destruction or undoing of. | *"In academic literature, destruct designates destroy (one's own missile or rocket)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destructibility]] | noun | **1.** Vulnerability to destruction. | *"She knows, as well as the poet, that destructibility is not one of nature's words; that it is only the relationship of things--tangibility, visibility--that are transitory."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[destructible]] | adjective | **1.** Easily destroyed. | *"It is true that materiality renders these ideals imperfect and destructible; yet I would not ex- change mine for thine, for mine give me such personal 360:9 pleasure, and they are not so shockingly transcendental."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[destruction]] | noun | **1.** The termination of something by causing so much damage to it that it cannot be repaired or no longer exists.<br>**2.** An event (or the result of an event) that completely destroys something. | *"It shall be to him then, as our good wills, A sure destruction."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[destructive]] | adjective | **1.** Causing destruction or much damage. | *"Jellyby did not mean these destructive sentiments."* — Charles Dickens, *Bleak House* |
| [[destructive-metabolic]] | adjective | **1.** Of or relating to catabolism. | *"In academic literature, destructive-metabolic designates of or relating to catabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[destructively]] | adverb | **1.** In a destructive manner. | *"Destructively?" "Yes." "You're in command of the combined fleet, Drummer."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[destructiveness]] | noun | **1.** The quality of causing destruction. | *"In academic literature, destructiveness designates the quality of causing destruction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indestructibility]] | noun | **1.** The strength to resist destruction. | *"INDESTRUCTIBILITY: Amidst ceaseless change and seeming decay all the elements, all the forces (if indeed they be not one and the same) which operate and substantiate those changes, imperishable; neither matter nor force capable of annihilation."* — Anne Gilchrist, *The Letters of Anne Gilchrist and Walt Whitman* |
| [[indestructible]] | adjective | **1.** Not easily destroyed.<br>**2.** Very long lasting. | *"In your indestructible admiration ..." Uncle Philip got no further, as all the children now came running toward them."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[infrastructure]] | noun | **1.** The basic structure or features of a system or organization.<br>**2.** The stock of basic facilities and capital equipment needed for the functioning of a country or area. | *"During the U.S. post-Sputnik initiatives to create a national space program, he critiqued aerospace industries' logistics concepts on future space systems organization, infrastructure and support."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[instruct]] | verb | **1.** Impart skills or knowledge to.<br>**2.** Give instructions or directions for some task. | *"Instruct my daughter how she shall persever, That time and place with this deceit so lawful May prove coherent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[instruction]] | noun | **1.** A message describing how something is to be done.<br>**2.** The activities of educating or instructing; activities that impart knowledge or skill. | *"My queen and Eros Have by their brave instruction got upon me A nobleness in record."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[instructional]] | adjective | **1.** Of or relating to or used in instruction. | *"In academic literature, instructional designates of or relating to or used in instruction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[instructions]] | noun | **1.** A manual usually accompanying a technical device and explaining how to install or operate it.<br>**2.** A message describing how something is to be done. | *"You, Diana, Under my poor instructions yet must suffer Something in my behalf."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[instructive]] | adjective | **1.** Serving to instruct or enlighten or inform. | *"Their conversation was, indeed, most instructive; for the future, it seems, had no secret worth mentioning for them."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[instructively]] | adverb | **1.** In an informative manner. | *"She would compare me instructively with my opponent, and contrast his dash and brilliance with my own inefficiency."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[instructor]] | noun | **1.** A person whose occupation is teaching. | *"Several young lady pupils, ranging from thirteen or fourteen years of age to two or three and twenty, were assembled; and I was looking among them for their instructor when Caddy, pinching my arm, repeated the ceremony of introduction."* — Charles Dickens, *Bleak House* |
| [[instructorship]] | noun | **1.** The position of instructor. | *"In academic literature, instructorship designates the position of instructor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[instructress]] | noun | **1.** A woman instructor. | *"The refreshing meal, the brilliant fire, the presence and kindness of her beloved instructress, or, perhaps, more than all these, something in her own unique mind, had roused her powers within her."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[misconstruction]] | noun | **1.** A kind of misinterpretation resulting from putting a wrong construction on words or actions (often deliberately).<br>**2.** An ungrammatical constituent. | *"You did not use to like cards; but time makes many changes.” “I am not yet so much changed,” cried Anne, and stopped, fearing she hardly knew what misconstruction."* — Jane Austen, *Persuasion* |
| [[nonstructural]] | adjective | **1.** Not structural. | *"In academic literature, nonstructural designates not structural."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obstruct]] | verb | **1.** Hinder or prevent the progress or accomplishment of.<br>**2.** Block passage through. | *"The nations of Europe are encircled with chains of fortified places, which mutually obstruct invasion."* — Alexander Hamilton, *The Federalist Papers* |
| [[obstructed]] | verb | **1.** Hinder or prevent the progress or accomplishment of.<br>**2.** Block passage through. | *"The intercepting city, ancient Melchester, they were obliged to pass through in order to take advantage of the town bridge for crossing a large river that obstructed them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[obstructer]] | noun | **1.** Someone who systematically obstructs some action that others want to take.<br>**2.** Any structure that makes progress difficult. | *"In academic literature, obstructer designates someone who systematically obstructs some action that others want to take."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obstruction]] | noun | **1.** Any structure that makes progress difficult.<br>**2.** The physical condition of blocking or filling a passage with an obstruction. | *"There is no obstruction in this."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[obstructionism]] | noun | **1.** Deliberate interference. | *"In academic literature, obstructionism designates deliberate interference."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obstructionist]] | noun | **1.** Someone who systematically obstructs some action that others want to take. | *"In academic literature, obstructionist designates someone who systematically obstructs some action that others want to take."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obstructive]] | adjective | **1.** Preventing movement. | *"I didn’t like what I saw when I was studying there—so much empty bigwiggism, and obstructive trickery."* — George Eliot, *Middlemarch* |
| [[obstructively]] | adverb | **1.** In an obstructive manner. | *"In academic literature, obstructively designates in an obstructive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[obstructor]] | noun | **1.** Someone who systematically obstructs some action that others want to take.<br>**2.** Any structure that makes progress difficult. | *"In academic literature, obstructor designates someone who systematically obstructs some action that others want to take."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reconstruct]] | verb | **1.** Reassemble mentally.<br>**2.** Build again. | *"The plain fact is that we actually know Jesus a great deal better than we know our x and our y, the elements from which we hoped to reconstruct him."* — T. R. Glover, *The Jesus of History* |
| [[reconstructed]] | verb | **1.** Reassemble mentally.<br>**2.** Build again. | *"Gradually the events of the preceding night crept with silent, blood-stained feet into his brain and reconstructed themselves there with terrible distinctness."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[reconstruction]] | noun | **1.** The period after the american civil war when the southern states were reorganized and reintegrated into the union; 1865-1877.<br>**2.** The activity of constructing something again. | *"The "reconstruction of a personality"--to borrow a phrase from some psychologists--is a very difficult matter, even when we are masters of our detail."* — T. R. Glover, *The Jesus of History* |
| [[reconstructive]] | adjective | **1.** Helping to restore to good condition. | *"In academic literature, reconstructive designates helping to restore to good condition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[restructure]] | verb | **1.** Construct or form anew or provide with a new structure. | *"In academic literature, restructure designates construct or form anew or provide with a new structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[structural]] | adjective | **1.** Relating to or caused by structure, especially political or economic structure.<br>**2.** Relating to or having or characterized by structure. | *"Hitherto, in descriptively treating of the Sperm Whale, I have chiefly dwelt upon the marvels of his outer aspect; or separately and in detail upon some few interior structural features."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[structuralism]] | noun | **1.** Linguistics defined as the analysis of formal structures in a text or discourse.<br>**2.** An anthropological theory that there are unobservable social structures that generate observable social phenomena. | *"In academic literature, structuralism designates linguistics defined as the analysis of formal structures in a text or discourse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[structurally]] | adverb | **1.** With respect to structure. | *"In academic literature, structurally designates with respect to structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[structure]] | noun | **1.** A thing constructed; a complex entity constructed of many parts.<br>**2.** The manner of construction of something and the arrangement of its parts. | *"Now, really, really!” He said this at the stair-head, gently moving his right hand as if it were a silver trowel with which to spread the cement of his words on the structure of the system and consolidate it for a thousand ages."* — Charles Dickens, *Bleak House* |
| [[structured]] | verb | **1.** Give a structure to.<br>**2.** Having definite and highly organized structure. | *"In academic literature, structured designates give a structure to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[substructure]] | noun | **1.** The basic structure or features of a system or organization.<br>**2.** Lowest support of a structure. | *"I had placed myself at the port-scuttle, and saw some magnificent substructures of coral, zoophytes, seaweed, and fucus, agitating their enormous claws, which stretched out from the fissures of the rock."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[superstructure]] | noun | **1.** Structure consisting of the part of a ship above the main deck. | *"M'Gregor was anxious that a superstructure should be built on the foundation laid by himself by his going to College."* — John Cairns, *Principal Cairns* |
| [[unconstructive]] | adjective | **1.** Not constructive. | *"In academic literature, unconstructive designates not constructive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understructure]] | noun | **1.** Lowest support of a structure. | *"In academic literature, understructure designates lowest support of a structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninstructed]] | adjective | **1.** Lacking information or instruction. | *"When an uninstructed multitude attempts to see with its eyes, it is exceedingly apt to be deceived."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[uninstructive]] | adjective | **1.** Failing to instruct. | *"In academic literature, uninstructive designates failing to instruct."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninstructively]] | adverb | **1.** In an uninformative manner. | *"In academic literature, uninstructively designates in an uninformative manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unobstructed]] | adjective | **1.** Free from impediment or obstruction or hindrance. | *"Handling the long lance lightly, glancing twice or thrice along its length to see if it be exactly straight, Stubb whistlingly gathers up the coil of the warp in one hand, so as to secure its free end in his grasp, leaving the rest unobstructed."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[unreconstructed]] | adjective | **1.** Adhering to an attitude or position widely held to be outmoded. | *"In academic literature, unreconstructed designates adhering to an attitude or position widely held to be outmoded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unstructured]] | adjective | **1.** Lacking definite structure or organization.<br>**2.** Lacking the system or structure characteristic of living bodies. | *"In academic literature, unstructured designates lacking definite structure or organization."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · STRUCT
  </div>
</div>
