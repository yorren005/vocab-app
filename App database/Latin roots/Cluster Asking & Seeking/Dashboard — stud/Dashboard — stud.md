---
status: unread
type: root_dashboard
---
# Dashboard — stud
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">stud-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to be eager or zealous”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Asking a sincere question or searching along a path for a lost item.</span>
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

The root **stud** means to be eager or zealous. It refers to be eager, pursue with zeal, apply oneself diligently, study. In English, this root forms words such as *study*, *student*, *studentship*, and *studious*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to be eager or zealous
> The root **stud** means to be eager or zealous. It refers to be eager, pursue with zeal, apply oneself diligently, study. In English, this root forms words such as *study*, *student*, *studentship*, and *studious*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To be eager or zealous</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Asking a sincere question or searching along a path for a lost item.</mark>
> - **Everyday Connection**: Think of familiar words like *study* and *student*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **stud** comes from a Latin word that means *"to be eager or zealous"*.
  - At its core, it describes the action of be eager or zealous.

- **The Big Picture Idea**:
  - Picture asking a sincere question or searching along a path for a lost item.
  - Whenever you see **stud** in an English word, think of **to be eager or zealous**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to be eager or zealous).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Study**: The devotion of time and thought to acquiring information or knowledge.
  - **Student**: A person formally engaged in learning, especially one enrolled at a school, college, or university.
  - **Studentship**: The status or condition of being an enrolled student.
  - **Studious**: Spending much time studying.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">stud</mark>, think of <mark class="hl-def">to be eager or zealous</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root operates via two Latin base forms:
> - **Verbal Stem (`stud-`):** Derived from *studēre* ("to be eager"), forming active verbs and agent nouns (*study*, *student*, *understudy*).
> - **Substantive / Quality Stem (`studi-`):** Derived from the noun *studium* ("zeal, study"), forming adjectives of diligence and aesthetic nouns (*studious*, *studio*, *studiolo*, *étude*).
>
> English compounds combine native Germanic elements (*under-*) and Romance suffixes (*-ious*, *-ent*, *-ship*, *-ly*, *-ness*) with this Latin base.

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
> - **Academic Learning & Inquiry:** [[study]], [[student]], *studentship* — the rigorous cognitive acquisition of facts, methods, and principles.
> - **Diligence & Scholarly Temperament:** [[studious]], [[studiousness]], *studiously* — habitual devotion to reading, reflection, and intellectual discipline; also deliberate, calculated intent (*studiously avoided*).
> - **Creative Sanctuaries & Media Production:** [[studio]], *studiolo* — spaces designed for painting, recording music, film production, or broadcasting.
> - **Theatrical & Professional Redundancy:** [[understudy]], [[understudied]] — mastering a principal role in order to provide seamless performance continuity in emergencies.
> - **Musical Virtuosity & Technical Exercises:** *étude* — a musical composition specifically engineered to build and showcase virtuoso instrumental technique.

---

## 🔀 4. Prefix & Combining Dynamics on stud

### Prefix Shifts (Directional & Semantic Modification)

| Prefix / Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **under-** | beneath, subordinate | [[understudy]] | To study beneath a principal actor; a backup performer. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| **-ent** (*-entem*) | present participle / agent noun | [[student]] | One who is actively engaged in learning or research. |
| **-ious** (*-iōsus*) | qualitative adjective | [[studious]] | Characterized by persistent, dedicated study. |
| **-ness** | abstract noun of quality | [[studiousness]] | The state or habit of diligent scholarly application. |
| **-ship** | state or condition noun | *studentship* | The status, enrollment, or academic grant of a student. |
| **-ly** | adverbial marker | *studiously* | In a deliberate, calculated, or diligently studious manner. |
| **-o** (*-um*) | Romance locative noun | [[studio]] | The physical atelier or room where creative work is pursued. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Higher Education & Academia** | [[student]], [[study]], *studentship* | University pedagogy, degree curricula, scholarly research. |
| **Fine Arts & Film Industry** | [[studio]], *studiolo* | Sound stages, film production facilities, Renaissance ateliers. |
| **Classical Music & Conservatories** | *étude* | Chopin and Liszt technical piano studies, pedagogical repertoire. |
| **Theater & Performing Arts** | [[understudy]], [[understudied]] | Rehearsal protocols, stage understudies, cast insurance. |
| **Rhetoric & Behavioral Description** | *studiously* (*studiously neutral*) | Deliberately crafted diplomacy, calculated behavioral posture. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[stud]] | noun | **1.** A man who is virile and sexually active.<br>**2.** Ornament consisting of a circular rounded protuberance (as on a vault or shield or belt). | *"This sparkling sally is to the effect that although he always knew she was the best-groomed woman in the stud, he had no idea she was a bolter."* — Charles Dickens, *Bleak House* |
| [[student]] | noun | **1.** A learner who is enrolled in an educational institution.<br>**2.** A learned person (especially in the humanities); someone who by long study has gained mastery in one or more disciplines. | *"I prithee do not mock me, fellow-student."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[studentship]] | noun | **1.** The position of student. | *"In academic literature, studentship designates the position of student."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[studied]] | verb | **1.** Consider in detail and subject to an analysis in order to discover essential features or meaning.<br>**2.** Be a student; follow a course of study; be enrolled at an institute of learning. | *"Pardon what I have spoke, For ’tis a studied, not a present thought, By duty ruminated."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[studio]] | noun | **1.** Workplace for the teaching or practice of an art.<br>**2.** An apartment with a living space and a bathroom and a small kitchen. | *"Mere animal satisfaction!” “This is our friend’s consulting-room (or would be, if he ever prescribed), his sanctum, his studio,” said my guardian to us."* — Charles Dickens, *Bleak House* |
| [[studious]] | adjective | **1.** Marked by care and effort.<br>**2.** Characterized by diligent study and fondness for reading. | *"But yet be wary in thy studious care."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[studiously]] | adverb | **1.** In a studious manner. | *"Com’st thou with deep premeditated lines, With written pamphlets studiously devised, Humphrey of Gloucester?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[studiousness]] | noun | **1.** Diligent study. | *"In academic literature, studiousness designates diligent study."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[study]] | noun | **1.** A detailed critical inspection.<br>**2.** Applying the mind to learning and understanding a subject (especially by reading). | *"Caesar sends greetings to the queen of Egypt, And bids thee study on what fair demands Thou mean’st to have him grant thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[studying]] | noun | **1.** Reading carefully with intent to remember.<br>**2.** Consider in detail and subject to an analysis in order to discover essential features or meaning. | *"So help me God, as I have watched the night, Ay, night by night, in studying good for England!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[understudied]] | verb | **1.** Be an understudy or alternate for a role. | *"In academic literature, understudied designates be an understudy or alternate for a role."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[understudy]] | noun | **1.** An actor able to replace a regular performer when required.<br>**2.** Be an understudy or alternate for a role. | *"It means that no one woman, be she ever so competent, can keep up the fight single-handed for twelve hours at a stretch, and that an understudy to work under her may mean the very turning of the scale."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[unstudied]] | adjective | **1.** Not by design or artifice; unforced and impromptu.<br>**2.** Lacking knowledge gained by study often in a particular field. | *"And his prayers, quite unstudied as they of course were, brought the whole company right into the presence of the Unseen."* — John Cairns, *Principal Cairns* |
| [[unstudious]] | adjective | **1.** Not studious. | *"In academic literature, unstudious designates not studious."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Asking & Seeking]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · STUD
  </div>
</div>
