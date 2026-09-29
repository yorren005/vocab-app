---
status: unread
type: root_dashboard
---
# Dashboard — plex
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">plex-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to fold”</span>
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

The root **plex** means to fold. It refers to the action of folding and carrying out this process. In English, this root forms words such as *weave*, *multiplex*, *complex*, and *complexity*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to fold
> The root **plex** means to fold. It refers to the action of folding and carrying out this process. In English, this root forms words such as *weave*, *multiplex*, *complex*, and *complexity*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To fold</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The sturdy wooden framework supporting the roof of a house.</mark>
> - **Everyday Connection**: Think of familiar words like *weave* and *multiplex*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **plex** comes from a Latin word that means *"to fold"*.
  - At its core, it describes the action of fold.

- **The Big Picture Idea**:
  - Picture the sturdy wooden framework supporting the roof of a house.
  - Whenever you see **plex** in an English word, think of **to fold**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to fold).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Weave**: An everyday English word showing the root's idea of *to fold*.
  - **Multiplex**: Consisting of many elements in a complex relationship. 2. A system or signal carrying multiple messages simultaneously. 3. A cinema with multiple auditoriums. 4. Transmit multiple signals simultaneously.
  - **Complex**: Consisting of many different and connected parts. 2. Not easy to analyze or understand.
  - **Complexity**: The state or quality of being intricate or complicated. 2. A complex feature or detail.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">plex</mark>, think of <mark class="hl-def">to fold</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

The root **plex** operates primarily through the Latin supine and multiplier stems:
- **Base Network & Multiplier Stems (`plex-`)**:
  - *plexus* $\to$ **plexus** ("an intricate network or web").
  - *multus* + *-plex* $\to$ **multiplex**, **multiplexer**, **multiplexing**.
  - *duo* + *-plex* $\to$ **duplex**.
  - *trēs* + *-plex* $\to$ **triplex**.
- **Prefix Compounds with Participial `-plex`**:
  - *com-* ("together") + *plectere* $\to$ **complex**, **complexity**, **complexify**.
  - *per-* ("thoroughly") + *plectere* $\to$ **perplex**, **perplexity**, **perplexing**.
- **The Greek Stroke Cousin (Cognate Warning)**:
  - Greek **ἀποπληξία** (*apoplēxía* < **πλήσσω** *plḗssō* "to strike down") $\to$ **apoplexy** (see Section 8 for warning).

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

The derivatives of **plex** govern four primary conceptual fields:
- **Anatomy & Neurology**: *plexus* (a network of nerves or vessels in the body, such as the solar plexus or cardiac plexus).
- **Telecommunications & Data Engineering**: *multiplex* (involving or consisting of many elements; transmit two or more signals over a single channel), *multiplexer* (device that combines multiple signals).
- **Architecture & Real Estate**: *duplex* (a residential building divided into two apartments), *triplex* (a building divided into three apartments), *multiplex* (a cinema with several separate screens).
- **Cognitive Science & Philosophy**: *complex* (consisting of many different and connected parts; complicated), *complexity*, *perplex* (cause someone to feel completely baffled or tangled in thought).

---

## 🔀 4. Prefix & Combining Dynamics on plex

| Prefix / Comb. | Resulting Word | Semantic Modification | Core English Derivatives |
| :--- | :--- | :--- | :--- |
| **`multi-`** ("many") | `multi-` + `-plex` | Having many folds/channels $\to$ cinema complex, multi-channel signal | *multiplex, multiplexer, multiplexing* |
| **`com-`** ("together") | `com-` + *plectere* | Woven together into a whole $\to$ intricate, elaborate system | *complex, complexity, complexify* |
| **`per-`** ("thoroughly") | `per-` + *plectere* | Thoroughly tangled and knotted $\to$ baffled, puzzled | *perplex, perplexity, perplexing* |
| **`du-`** ("two") | `duo` + `-plex` | Twofold $\to$ two-story or two-family dwelling | *duplex* |
| **`tri-`** ("three") | `trēs` + `-plex` | Threefold $\to$ three-unit apartment or three-screen theater | *triplex* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Human Anatomy & Physiology**: Autonomic nervous system clusters (*celiac plexus*, *brachial plexus injury*).
- **Telecommunications & Signal Processing**: Time-division multiplexing (TDM) and wavelength-division multiplexing (WDM) (*multiplexing*).
- **Urban Architecture & Commercial Real Estate**: High-density multi-family housing and mega-entertainment centers (*duplex*, *multiplex cinema*).
- **Systems Theory & Computational Complexity**: NP-completeness, emergent systems behavior, and chaos theory (*complexity theory*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[complex]] | noun | **1.** A conceptual whole made up of complicated and related parts.<br>**2.** A compound described in terms of the central atom to which other atoms are bound or coordinated. | *"Kenge, using his silver trowel persuasively and smoothingly, “that this has been a great cause, that this has been a protracted cause, that this has been a complex cause."* — Charles Dickens, *Bleak House* |
| [[complexifier]] | noun | **1.** Someone makes things complex. | *"In academic literature, complexifier designates someone makes things complex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[complexify]] | verb | **1.** Have or develop complicating consequences.<br>**2.** Make complex. | *"In academic literature, complexify designates have or develop complicating consequences."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[complexion]] | noun | **1.** The coloring of a person's face.<br>**2.** A combination that results from coupling or interlinking. | *"The purple pride Which on thy soft cheek for complexion dwells, In my love’s veins thou hast too grossly dyed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[complexity]] | noun | **1.** The quality of being intricate and compounded. | *"This is the central problem which a study of his life presents, and it is one of no ordinary complexity; but there are some considerations relating to it which go far to solve it, and these it may be worth while for us at this point to examine."* — John Cairns, *Principal Cairns* |
| [[complexly]] | adverb | **1.** In a complex manner. | *"The purpose of the present volume is to afford some aid and guidance in the study of Robert Browning’s Poetry, which, being the most complexly subjective of all English poetry, is, for that reason alone, the most difficult."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[complexness]] | noun | **1.** The quality of being intricate and compounded. | *"In academic literature, complexness designates the quality of being intricate and compounded."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiplex]] | noun | **1.** Communicates two or more signals over a common channel.<br>**2.** A movie theater than has several different auditoriums in the same building. | *"In academic literature, multiplex designates communicates two or more signals over a common channel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[multiplexer]] | noun | **1.** A device that can interleave two or more activities. | *"In academic literature, multiplexer designates a device that can interleave two or more activities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perplex]] | verb | **1.** Be a mystery or bewildering to.<br>**2.** Make more complicated. | *"One but painted thus Would be interpreted a thing perplex’d Beyond self-explication."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perplexed]] | verb | **1.** Be a mystery or bewildering to.<br>**2.** Make more complicated. | *"Be gone, I say; for till you do return, I rest perplexed with a thousand cares."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perplexedly]] | adverb | **1.** In a perplexed manner. | *"What is it?” “This: that if you send me away you are likely to lose more than you bargain for.” Now Jan stared at him perplexedly, but I smiled, for I guessed what was to come."* — H. Rider Haggard, *Swallow: A Tale of the Great Trek* |
| [[perplexing]] | verb | **1.** Be a mystery or bewildering to.<br>**2.** Make more complicated. | *"Not on his own account (I was again aware of that perplexing and extraordinary contradiction), but on ours, as if personal considerations were impossible with him and the contemplation of our happiness alone affected him."* — Charles Dickens, *Bleak House* |
| [[perplexity]] | noun | **1.** Trouble or confusion resulting from complexity. | *"Here, Master Doctor, in perplexity and doubtful dilemma."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plexiglas]] | noun | **1.** A light transparent weather resistant thermoplastic. | *"In academic literature, plexiglas designates a light transparent weather resistant thermoplastic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plexiglass]] | noun | **1.** A light transparent weather resistant thermoplastic. | *"In academic literature, plexiglass designates a light transparent weather resistant thermoplastic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pleximeter]] | noun | **1.** A small thin metal plate held against the body and struck with a plexor in percussive examinations. | *"In academic literature, pleximeter designates a small thin metal plate held against the body and struck with a plexor in percussive examinations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pleximetry]] | noun | **1.** Tapping a part of the body for diagnostic purposes. | *"In academic literature, pleximetry designates tapping a part of the body for diagnostic purposes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plexor]] | noun | **1.** (medicine) a small hammer with a rubber head used in percussive examinations of the chest and in testing reflexes. | *"In academic literature, plexor designates (medicine) a small hammer with a rubber head used in percussive examinations of the chest and in testing reflexes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plexus]] | noun | **1.** A network of intersecting blood vessels or intersecting nerves or intersecting lymph vessels. | *"Communication was effected through the pituitary body and also by means of the orangefiery and scarlet rays emanating from the sacral region and solar plexus."* — James Joyce, *Ulysses* |
| [[unperplexed]] | adjective | **1.** Experiencing no difficulty or confusion or bewilderment. | *"He stood as opposed to Captain Wentworth, in all his own unwelcome obtrusiveness; and the evil of his attentions last night, the irremediable mischief he might have done, was considered with sensations unqualified, unperplexed."* — Jane Austen, *Persuasion* |

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
    ROOT DASHBOARD · PLEX
  </div>
</div>
