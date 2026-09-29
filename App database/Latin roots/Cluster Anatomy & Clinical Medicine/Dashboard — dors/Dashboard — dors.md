---
status: unread
type: root_dashboard
---
# Dashboard — dors
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">dors-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“back”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The natural organs, tissues, and inner workings of the human body.</span>
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

The root **dors** means back. It refers to back, ridge, posterior surface, reverse side. In English, this root forms words such as *dorsal*, *dorsum*, and *dossier*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: back
> The root **dors** means back. It refers to back, ridge, posterior surface, reverse side. In English, this root forms words such as *dorsal*, *dorsum*, and *dossier*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Back</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The natural organs, tissues, and inner workings of the human body.</mark>
> - **Everyday Connection**: Think of familiar words like *dorsal* and *dorsum*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **dors** comes from a Latin word that means *"back"*.
  - At its core, it describes back.

- **The Big Picture Idea**:
  - Picture the natural organs, tissues, and inner workings of the human body.
  - Whenever you see **dors** in an English word, think of **bodily anatomy and health**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of back.
  - **Mental & Social**: How people experience, organize, or communicate about back.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Dorsal**: Of, relating to, or situated on or near the back or upper surface of an animal or organ.
  - **Dorsum**: The back of the body of an animal.
  - **Dossier**: A collection, bundle, or file of detailed documents and reports containing exhaustive biographical, investigative, or medical records regarding a specific person or subject.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">dors</mark>, think of <mark class="hl-def">bodily anatomy and health</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **dors** generates vocabulary along two primary channels:
> 
> ### 1. Classical Latin Learned Formations (`dors-`)
> - *dorsum* → [[dorsum]] (noun, back of animal or organ).
> - *dorsum* + *-ālis* → [[dorsal]] (adjective), `dorsally` (adverb).
> - Anatomical compounds with adjoining coordinates:
>   - *dorsum* + *venter* ("belly") + *-al* → [[dorsoventral]] (from back to belly), `dorsoventrally` (adverb).
>   - *dorsum* + *latus* ("side") + *-al* → `dorsolateral` (back and sides).
> 
> ### 2. Anglo-Norman & French Romance Formations (`dos-` / `dors-`)
> - *in-* + *dorsum* → Anglo-French *endosser* → [[endorse]] / [[indorse]] (verb).
> - *endosser* + *-ment* → [[endorsement]] / `indorsement` (noun).
> - *endorser* / `indorser` (agent noun), `endorsee` (recipient noun).
> - *dos* + *-ier* → [[dossier]] (bundle labeled on the back).
> - *dos-à-dos* ("back to back") → `dos-à-dos` (bookbinding/furniture).
> - *arere* ("behind") + *dos* ("back") → `reredos` (altar screen).

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

> [!tip] 🌈 Shades of Meaning in Different Words
> Although the root fundamentally denotes **"the back"**, its modern applications divide into distinct realms:
> - **Anatomical Orientation & Marine Biology:** In [[dorsal]], [[dorsum]], and [[dorsoventral]], it designates the upper surface of fish (the dorsal fin), the posterior human spine, or the dorsal surface of the tongue and hand.
> - **Commercial Paper & Banking:** In [[endorse]] and [[endorsement]], it signifies the signature on the reverse of a negotiable instrument authorizing payment transfer.
> - **Public Advocacy & Politics:** In [[endorse]] and [[endorsement]], it describes the public backing or approval of a political candidate, product, or policy.
> - **Bureaucracy & Intelligence Archiving:** In [[dossier]], it names an exhaustive investigative portfolio or classified record compiled on an individual.
> - **Liturgical Art & Bookbinding:** In `reredos` and `dos-à-dos`, it describes back-facing architectural screens and back-to-back bound twin volumes.

---

## 🔀 4. Prefix & Combining Dynamics on dors

| Component | Prefix / Partner | Meaning | Derived Word | Conceptual Role |
| :--- | :--- | :--- | :--- | :--- |
| `en-` / `in-` | *in-* (upon) | "to write on the back" | [[endorse]] / [[indorse]] | Sign reverse of document; give formal approval. |
| `dorso-` + `ventr-` | *venter* (belly) | "back-to-belly" | [[dorsoventral]] | Axis extending from dorsal to ventral surface. |
| `dorso-` + `later-` | *latus* (side) | "back-and-side" | `dorsolateral` | Region involving the back and lateral flank. |
| `dos-` + `-ier` | Fr. *dos* (back) | "spine-labeled bundle" | [[dossier]] | Collection of detailed investigative records. |
| `rere-` + `dos` | AF *arere* (behind) | "behind the back" | `reredos` | Carved screen or tapestry behind an altar. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🦈 **Marine Biology & Anatomy** | [[dorsal]], [[dorsum]], [[dorsoventral]] | Dorsal fin stability in cetaceans; dorsum of the tongue; dorsoventral embryonic patterning |
| 🏦 **Banking & Commercial Law** | [[endorse]], [[endorsement]], `endorser` | Blank vs. restrictive endorsements on checks; UCC Article 3 negotiable instruments |
| 🕵️ **Espionage & Criminology** | [[dossier]] | Counterintelligence profiling; criminal background dossiers compiled by law enforcement |
| 🗳️ **Politics & Marketing** | [[endorse]], [[endorsement]] | Celebrity athletic brand sponsorships; presidential primary candidate endorsements |
| ⛪ **Architecture & Fine Arts** | `reredos`, `dos-à-dos` | Gothic cathedral retables; 17th-century dos-à-dos embroidered devotional bindings |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[dorsal]] | adjective | **1.** Belonging to or on or near the back or upper surface of an animal or organ or part.<br>**2.** Facing away from the axis of an organ or organism. | *"That evening he was within a feather-weight’s turn of abandoning his road to the nearest station, and driving across that elevated dorsal line of South Wessex which divided him from his Tess’s home."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[dorsally]] | adverb | **1.** In a dorsal location or direction. | *"In academic literature, dorsally designates in a dorsal location or direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dorsiflexion]] | noun | **1.** The act of bending backward (of the body or a body part). | *"In academic literature, dorsiflexion designates the act of bending backward (of the body or a body part)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dorsoventral]] | adjective | **1.** Extending from the back to the belly. | *"In academic literature, dorsoventral designates extending from the back to the belly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dorsoventrally]] | adverb | **1.** In a dorsoventral direction. | *"In academic literature, dorsoventrally designates in a dorsoventral direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dorsum]] | noun | **1.** The posterior part of a human (or animal) body from the neck to the end of the spine.<br>**2.** The back of the body of a vertebrate or any analogous surface (as the upper or outer surface of an organ or appendage or part). | *"In academic literature, dorsum designates the posterior part of a human (or animal) body from the neck to the end of the spine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endorse]] | verb | **1.** Be behind; approve of.<br>**2.** Give support or one's approval to. | *"By these passages it is plain that a sign or a wonder does not establish a doctrine or endorse a man as certainly being _from God_."* — Classic Author, *The wonders of prayer* |
| [[endorsement]] | noun | **1.** A promotional statement (as found on the dust jackets of books).<br>**2.** A speech seconding a motion. | *"Bank notes pass without endorsement and thus depend on the credit of the bank alone, not, like checks, on the credit of the person, from whom received."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[endorser]] | noun | **1.** Someone who expresses strong approval.<br>**2.** A person who transfers his ownership interest in something by signing a check or negotiable security. | *"I found a responsible endorser before me, and it was my purpose to hold him liable, and to bring him to his just responsibility without delay."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[indorse]] | verb | **1.** Be behind; approve of.<br>**2.** Give support or one's approval to. | *"He appealed to me to indorse his view that there was a tin of sardines and part of a cold fowl and plenty of bread and cheese."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[indorsement]] | noun | **1.** A promotional statement (as found on the dust jackets of books).<br>**2.** A speech seconding a motion. | *"The grumblers looked blank and did not open their mouths, and the others joined in a shout of indorsement and approval."* — F. H. Costello, *Sure-dart* |
| [[indorser]] | noun | **1.** Someone who expresses strong approval.<br>**2.** A person who transfers his ownership interest in something by signing a check or negotiable security. | *"And as he's a real shaver, I'll have the minister or some other responsible man for an indorser." It was growing dusk when he reached the toll-house on Kimballton turnpike, about a quarter of a mile from the village of this name."* — Nathaniel Hawthorne, *Twice-Told Tales* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Anatomy & Clinical Medicine]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · DORS
  </div>
</div>
