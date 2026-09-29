---
status: unread
type: root_dashboard
---
# Dashboard — graph
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">graph-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“write or draw”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Carving clear dark letters onto paper to preserve thoughts in writing.</span>
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

The root **graph** means write or draw. It refers to putting words down on a surface or recording information in writing. In English, this root forms words such as *autograph*, *biography*, *bibliography*, and *calligraphy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: write or draw
> The root **graph** means write or draw. It refers to putting words down on a surface or recording information in writing. In English, this root forms words such as *autograph*, *biography*, *bibliography*, and *calligraphy*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Write or draw</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Carving clear dark letters onto paper to preserve thoughts in writing.</mark>
> - **Everyday Connection**: Think of familiar words like *autograph* and *biography*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **graph** comes from a Latin word that means *"write or draw"*.
  - At its core, it describes write or draw.

- **The Big Picture Idea**:
  - Picture carving clear dark letters onto paper to preserve thoughts in writing.
  - Whenever you see **graph** in an English word, think of **writing, records, and written words**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of write or draw.
  - **Mental & Social**: How people experience, organize, or communicate about write or draw.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Autograph**: A signature, especially that of a celebrity written on request.
  - **Biography**: An account of someone's life written by someone else.
  - **Bibliography**: A list of the books, articles, and sources referred to in a scholarly work.
  - **Calligraphy**: Decorative handwriting or handwritten lettering.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">graph</mark>, think of <mark class="hl-def">writing, records, and written words</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine
- **Primary Morphemic Stems**:
  - `graph-` (< Greek *graphō*): The base verbal, nominal, and suffixal combining form (`-graph`, `-graphy`, `-graphic`).
  - `gram-` (< Greek *gramma* "letter, line"): Closely related sister stem (*diagram, telegram, grammar*).
- **Prolific Combining Elements**:
  - `auto-` ("self"): *autograph*.
  - `ortho-` ("correct, straight"): *orthography*.
  - `kallos` ("beauty"): *calligraphy*.
  - `chorea` ("dance"): *choreography*.
  - `lithos` ("stone"): *lithography*.
  - `typos` ("impression"): *typography*.
  - `seismos` ("earthquake"): *seismograph*.

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
                      ┌── Systematic Scholarly Description: geography, biography, bibliography, monograph
                      │
   [graph] ───────────┼── Art, Visuals & Pencils: graphic, graphite, calligraphy, typography, lithography
 (Scratch / Write)    │
                      ├── Text Structure & Letters: autograph, epigraph, paragraph, orthography, holograph
                      │
                      └── Mechanical Recorders & Movement: seismograph, polygraph, choreography
```

---

## 🔀 4. Prefix & Combining Dynamics on graph
- **`auto-` + `graph`**: *autograph* — a signature written with a person's own hand.
- **`ortho-` + `graphy`**: *orthography* — the conventional spelling system of a language.
- **`seismo-` + `graph`**: *seismograph* — an instrument that measures and records seismic earthquake waves.
- **`mono-` + `graph`**: *monograph* — a detailed scholarly study on a single specialized topic.

---

## 🌐 5. Disciplinary & Real-World Domains
- **Earth & Environmental Sciences**: *Geography*; cartography; *seismographs*; geotechnical fault tracing.
- **Graphic Design & Publishing**: *Typography*; font design; *lithography*; visual *graphics*.
- **Linguistics & Orthography**: Phonemic vs. *orthographic* spelling; dialect transcription.
- **Biographical & Historical Scholarship**: *Biographies*; primary *bibliographies*; archival *holographs*.
- **Criminology & Forensics**: *Polygraph* examinations (lie detector instrumentation).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anorthography]] | noun | **1.** A loss of the ability to write or to express thoughts in writing because of a brain lesion. | *"In academic literature, anorthography designates a loss of the ability to write or to express thoughts in writing because of a brain lesion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autograph]] | noun | **1.** Something written by one's own hand.<br>**2.** A person's own signature. | *"I had wondered why Jane had been poring over that old autograph manuscript receipt book in my desk for days, and as she paid these modern resurrecting compliments to the long gone cooks, tears and laughed literally deluged the table."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[autographed]] | verb | **1.** Mark with one's signature.<br>**2.** Bearing an autograph. | *"In academic literature, autographed designates mark with one's signature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autographic]] | adjective | **1.** Written in the author's own handwriting. | *"In academic literature, autographic designates written in the author's own handwriting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bibliographer]] | noun | **1.** Someone trained in compiling bibliographies. | *"Enschede warns us, however, that his theories are simply those of a practical founder and not a bibliographer's."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[bibliographic]] | adjective | **1.** Relating to or dealing with bibliography. | *"Potts for some bibliographic details respecting the various editions of the _Tales from Shakespeare_."* — Anne Gilchrist, *Mary Lamb* |
| [[bibliographical]] | adjective | **1.** Relating to or dealing with bibliography. | *"BIBLIOGRAPHICAL NOTE The literature dealing with Shelley's work and life is immense, and no attempt will be made even to summarise it here."* — Sydney Waterlow, *Shelley* |
| [[bibliography]] | noun | **1.** A list of writings with time and place of publication (such as the writings of a single author or the works referred to in preparing a document etc.). | *"I, p. 102.] [Footnote 248: One of the most exhaustive monographs on the subject is that of Felix Melchior (Cf. bibliography, _infra_ p. 90), to whom I am indebted for several of the parallels suggested.] [Footnote 249: Weimar Ausg."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[biographer]] | noun | **1.** Someone who writes an account of a person's life. | *"Besides, as his biographer has truly said, "he was habitually thankful to have someone near him whom he could fairly ask to take the foremost place."[18] Now that Dr."* — John Cairns, *Principal Cairns* |
| [[biographic]] | adjective | **1.** Of or relating to or being biography. | *"In academic literature, biographic designates of or relating to or being biography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biographical]] | adjective | **1.** Of or relating to or being biography. | *"Brown because of that." No sooner was this book off his hands than Cairns was urged to undertake another biographical work--the Life of George Wilson."* — John Cairns, *Principal Cairns* |
| [[biography]] | noun | **1.** An account of the series of events making up a person's life. | *"Jellyby’s biography, “is a lady of very remarkable strength of character who devotes herself entirely to the public."* — Charles Dickens, *Bleak House* |
| [[calligraph]] | verb | **1.** Write beautifully and ornamentally. | *"In academic literature, calligraph designates write beautifully and ornamentally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calligrapher]] | noun | **1.** Someone skilled in penmanship. | *"The Imperial marks were the work of calligraphers who were selected for the purpose, and the writing is careful and in good style."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[calligraphic]] | adjective | **1.** Of or relating to or expressed in calligraphy. | *"In academic literature, calligraphic designates of or relating to or expressed in calligraphy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calligraphical]] | adjective | **1.** Of or relating to or expressed in calligraphy. | *"In academic literature, calligraphical designates of or relating to or expressed in calligraphy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calligraphist]] | noun | **1.** Someone skilled in penmanship. | *"In academic literature, calligraphist designates someone skilled in penmanship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calligraphy]] | noun | **1.** Beautiful handwriting. | *"After completion of laconic epistolary compositions she abandoned the implement of calligraphy in the encaustic pigment, exposed to the corrosive action of copperas, green vitriol and nutgall."* — James Joyce, *Ulysses* |
| [[choreography]] | noun | **1.** A show involving artistic dancing.<br>**2.** The representation of dancing by symbols as music is represented by notes. | *"In academic literature, choreography designates a show involving artistic dancing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digraph]] | noun | **1.** Two successive letters (especially two letters used to represent a single sound: `sh' in `shoe'). | *"In academic literature, digraph designates two successive letters (especially two letters used to represent a single sound: `sh' in `shoe')."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epigraph]] | noun | **1.** A quotation at the beginning of some piece of writing.<br>**2.** An engraved inscription. | *"In academic literature, epigraph designates a quotation at the beginning of some piece of writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geographer]] | noun | **1.** An expert on geography. | *"At Comana in Syria (we read in Strabo the geographer, about the time of Christ) there was a temple where there were six thousand of these temple slaves."* — T. R. Glover, *The Jesus of History* |
| [[geographic]] | adjective | **1.** Of or relating to the science of geography.<br>**2.** Determined by geography. | *"On the other hand, families are more widely dispersed, successful interaction by grandparents with their distant grandchildren, whether for geographic reasons or barriers of circumstance, increasingly calls for innovation and improvisation."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[geographical]] | adjective | **1.** Of or relating to the science of geography.<br>**2.** Determined by geography. | *"To persons of limited spheres, miles are as geographical degrees, parishes as counties, counties as provinces and kingdoms."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[geographically]] | adverb | **1.** With respect to geography. | *"These figures are very unequally distributed geographically, the divisions ranking as to total deposits in the following order: the Eastern Middle, New England, Middle Western, Pacific, Southern, and Western divisions."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[geography]] | noun | **1.** Study of the earth's surface; includes people's responses to topography and climate and soil and vegetation. | *"She can talk French, I suppose, and do geography, and globes, and needlework, and everything?” “No doubt,” said I."* — Charles Dickens, *Bleak House* |
| [[graph]] | noun | **1.** A visual representation of the relations between certain quantities plotted with reference to a set of axes.<br>**2.** Represent by means of a graph. | *"In academic literature, graph designates a visual representation of the relations between certain quantities plotted with reference to a set of axes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[grapheme]] | noun | **1.** A written symbol that is used to represent speech. | *"In academic literature, grapheme designates a written symbol that is used to represent speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphic]] | noun | **1.** An image that is generated by a computer.<br>**2.** Written or drawn or engraved. | *"A myth is never so graphic and precise in its details as when it is, so to speak, the book of the words which are spoken and acted by the performers of the sacred rite."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[graphical]] | adjective | **1.** Relating to or presented by a graph.<br>**2.** Written or drawn or engraved. | *"In academic literature, graphical designates relating to or presented by a graph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphically]] | adverb | **1.** In a diagrammatic manner.<br>**2.** With respect to graphic aspects. | *"IMPORTS INTO THE UNITED STATES. 1821-18565 Many statistics bearing upon tariff history are graphically brought together here."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[graphics]] | noun | **1.** Photographs or other visual representations in a printed publication.<br>**2.** The drawings and photographs in the layout of a book. | *"He followed with instructions that brought a series of real-time graphics across the monitor."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[graphite]] | noun | **1.** Used as a lubricant and as a moderator in nuclear reactors. | *"This vacuum economised the graphite points between which the luminous arc was developed—an important point of economy for Captain Nemo, who could not easily have replaced them; and under these conditions their waste was imperceptible."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[graphologist]] | noun | **1.** A specialist in inferring character from handwriting. | *"In academic literature, graphologist designates a specialist in inferring character from handwriting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphology]] | noun | **1.** The study of handwriting (especially as an indicator of the writer's character or disposition). | *"In academic literature, graphology designates the study of handwriting (especially as an indicator of the writer's character or disposition)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[graphospasm]] | noun | **1.** Muscular spasms of thumb and forefinger while writing with a pen or pencil. | *"In academic literature, graphospasm designates muscular spasms of thumb and forefinger while writing with a pen or pencil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holograph]] | noun | **1.** Handwritten book or document.<br>**2.** The intermediate photograph (or photographic record) that contains information for reproducing a three-dimensional image by holography. | *"And so, none saying him nay, he rode back to Longtown with the holograph in his breast pocket, jesting with two farmers riding that way as he went."* — S. R. Crockett, *Deep Moat Grange* |
| [[holographic]] | adjective | **1.** Of or relating to holography or holograms.<br>**2.** Written entirely in one's own hand. | *"In academic literature, holographic designates of or relating to holography or holograms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holographical]] | adjective | **1.** Written entirely in one's own hand. | *"In academic literature, holographical designates written entirely in one's own hand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithograph]] | noun | **1.** A print produced by lithography.<br>**2.** Duplicator that prints by lithography; a flat surface (of stone or metal) is treated to absorb or repel ink in the desired pattern. | *"The common seal of the Abbey, appendant to a deed, dated 1518, has been elegantly lithographed, as we read in the Monasticon, by the care of the Rev."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[lithographer]] | noun | **1.** A printmaker who uses lithography. | *"In academic literature, lithographer designates a printmaker who uses lithography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithographic]] | adjective | **1.** Of or produced by or involved in lithography. | *"In the same house there were also established, as I gathered from the plates on the door, a drawing-master, a coal-merchant (there was, certainly, no room for his coals), and a lithographic artist."* — Charles Dickens, *Bleak House* |
| [[lithography]] | noun | **1.** A method of planographic printing from a metal or stone surface.<br>**2.** The act of making a lithographic print. | *"In academic literature, lithography designates a method of planographic printing from a metal or stone surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monograph]] | noun | **1.** A detailed and documented treatise on a particular subject. | *"Knuffmann in a learned monograph, _Balder, Mythus und Sage_ (Strasburg, 1902). [257] Gudbrand Vigfusson and F."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[orthographic]] | adjective | **1.** Of or relating to or expressed in orthography. | *"In academic literature, orthographic designates of or relating to or expressed in orthography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthography]] | noun | **1.** A method of representing the sounds of a language by written or printed symbols. | *"I abhor such fanatical phantasimes, such insociable and point-devise companions, such rackers of orthography, as to speak “dout” _sine_ “b”, when he should say “doubt”, “det” when he should pronounce “debt”—_d, e, b, t_, not _d, e, t_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paragraph]] | noun | **1.** One of several distinct subdivisions of a text intended to separate ideas; the beginning is usually marked by a new indented line.<br>**2.** Divide into paragraphs, as of text. | *"Come and teach our two-legged law-paragraph here to get some sense."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[paragrapher]] | noun | **1.** A writer of paragraphs (as for publication on the editorial page of a newspaper). | *"In academic literature, paragrapher designates a writer of paragraphs (as for publication on the editorial page of a newspaper)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polygraph]] | noun | **1.** A medical instrument that records several physiological processes simultaneously (e.g., pulse rate and blood pressure and respiration and perspiration). | *"In academic literature, polygraph designates a medical instrument that records several physiological processes simultaneously (e.g., pulse rate and blood pressure and respiration and perspiration)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pornographer]] | noun | **1.** Someone who presents shows or sells writing or pictures that are sexually explicit in violation of the community mores. | *"In academic literature, pornographer designates someone who presents shows or sells writing or pictures that are sexually explicit in violation of the community mores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pornographic]] | adjective | **1.** Designed to arouse lust. | *"In academic literature, pornographic designates designed to arouse lust."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pornography]] | noun | **1.** Creative activity (writing or pictures or films etc.) of no literary or artistic value other than to stimulate sexual desire. | *"In academic literature, pornography designates creative activity (writing or pictures or films etc.) of no literary or artistic value other than to stimulate sexual desire."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seismograph]] | noun | **1.** A measuring instrument for detecting and measuring the intensity and direction and duration of movements of the ground (as an earthquake). | *"In academic literature, seismograph designates a measuring instrument for detecting and measuring the intensity and direction and duration of movements of the ground (as an earthquake)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[typographer]] | noun | **1.** One who sets written material into type. | *"In academic literature, typographer designates one who sets written material into type."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[typographic]] | adjective | **1.** Relating to or occurring or used in typography. | *"Typographic printing had long before superseded Xylographic printing, that is, printing from a solid block of wood on which type of an entire page were cut individually by hand."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[typographical]] | adjective | **1.** Relating to or occurring or used in typography. | *"Minor spelling and typographical errors have been corrected without note."* — Algis Budrys, *Citadel* |
| [[typographically]] | adverb | **1.** In a typographic way. | *"The "Speculum Humanae Salvationes," attributed to Coster by Junius was partly a folio Latin block-book, and partly typographically printed."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[typography]] | noun | **1.** The craft of composing type and printing from it.<br>**2.** Art and technique of printing with movable type. | *"Junius does not say it, but clearly implies that, in this way, Coster came to the idea of the movability of the characters, the first step in the invention of typography."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Writing]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GRAPH
  </div>
</div>
