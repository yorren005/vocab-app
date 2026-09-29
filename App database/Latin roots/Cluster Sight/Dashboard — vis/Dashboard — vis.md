---
status: unread
type: root_dashboard
---
# Dashboard — vis
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vis-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“seen, sight, or appearance”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Looking through clear glass and observing every fine detail in view.</span>
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

The root **vis** means seen, sight, or appearance. It refers to perceiving with the eyes, visual appearance, or the sense of sight. In English, this root forms words such as *vision*, *visible*, *visit*, and *supervisor*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: seen, sight, or appearance
> The root **vis** means seen, sight, or appearance. It refers to perceiving with the eyes, visual appearance, or the sense of sight. In English, this root forms words such as *vision*, *visible*, *visit*, and *supervisor*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Seen, sight, or appearance</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Looking through clear glass and observing every fine detail in view.</mark>
> - **Everyday Connection**: Think of familiar words like *vision* and *visible*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vis** comes from a Latin word that means *"seen, sight, or appearance"*.
  - At its core, it describes seen, sight, or appearance.

- **The Big Picture Idea**:
  - Picture looking through clear glass and observing every fine detail in view.
  - Whenever you see **vis** in an English word, think of **seeing clearly and observing details**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of seen, sight, or appearance.
  - **Mental & Social**: How people experience, organize, or communicate about seen, sight, or appearance.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Vision**: The faculty or state of being able to see. 2. The ability to plan the future with wisdom or imagination.
  - **Visible**: Able to be seen.
  - **Visit**: To go to see and spend time with socially. 2. An act of going to see someone.
  - **Supervisor**: A person who supervises a person or an activity.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vis</mark>, think of <mark class="hl-def">seeing clearly and observing details</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun:** *vision* $\to$ *visionary*, *television*.
- **Capacity Suffix (`-ible`):** *visible*, *visibility*, *invisible*, *invisibility*, *visibly*.
- **Visual Action (`-it`):** *visit* (to go see), *visitor*, *visitation*.
- **Facial / Protective Base:** *visage* (face), *visor* (helmet eye-shield).
- **Prefixation of Oversight & Correction:**
  - `super-` + *visere* $\to$ *supervise* (oversee), *supervision*, *supervisor*, *supervisory*.
  - `re-` + *visere* $\to$ *revise* (look over again to improve), *revision*, *revisionist*.
  - `in-` + `pro-` + *visere* $\to$ *improvise* (literally "not seen in advance" $\to$ unscripted), *improvisation*, *improvisational*.
  - `en-` + *visage* $\to$ *envisage*, *envision*.

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

### 1. Sensory Sight & Optical Capacity
- *vision* (the faculty or state of being able to see; an experience of seeing someone in a dream).
- *visible* (able to be seen).
- *visibility* (the state of being able to see or be seen; distance one can see).
- *invisible* (unable to be seen).
- *visual* (relating to seeing or sight).
- *visualize* (to form a mental image of).

### 2. Oversight, Governance & Editing
- *supervise* (to observe and direct the execution of a task, project, or activity).
- *supervision* (the action of supervising someone or something).
- *supervisor* (a person who supervises a person or an activity).
- *revise* (to re-examine and make alterations to written or printed work).
- *revision* (the action of revising; a revised edition or form of something).

### 3. Spontaneity & Creative Performance
- *improvise* (to create and perform music, drama, or verse spontaneously or without preparation; literally "unforeseen").
- *improvisation* (the action of improvising).

### 4. Travel, Diplomacy & Countenance
- *visit* (to go to see and spend time with socially or professionally).
- *visa* (an endorsement on a passport indicating that the holder is allowed to enter a country).
- *visage* (a person's face, with reference to the form or proportions of the features).
- *visor* (a movable part of a helmet that can be pulled down to cover the face).
- *vis-à-vis* (in relation to; with regard to; face-to-face).

---

## 🔀 4. Prefix & Combining Dynamics on vis

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `super-` + `vis-` + `-e` | Overhead gaze | Watching over subordinates from an authoritative height | *supervise, supervision* |
| `re-` + `vis-` + `-e` | Second glance | Looking over a text again to correct and refine | *revise, revision* |
| `im-` + `pro-` + `vis-` + `-e` | Unforeseen spontaneity | Doing something without having seen it beforehand | *improvise, improvisation* |
| `en-` + `vis-` + `-ion` | Internal projecting | Painting a mental picture of future possibilities | *envision, envisage* |
| `tele-` + `vision` | Distant viewing | Transmitting live visual scenes across vast distances | *television* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Ophthalmology & Optometry:** Visual acuity (20/20 vision), visual field deficits, optical visibility.
- **Organizational Management & Labor Law:** Supervisor-to-worker ratios, direct supervision liability.
- **Jazz & Theatrical Performance:** Musical improvisation, improvisational comedy (Whose Line Is It Anyway?).
- **Immigration Law & International Relations:** Schengen visa, visa waiver programs, consular affairs.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[advisable]] | adjective | **1.** Worthy of being recommended or suggested; prudent or wise. | *"Jarndyce and had expired, and he still continued to assure Ada and me in the same final manner that it was “all right,” it became advisable to take Mr."* — Charles Dickens, *Bleak House* |
| [[advise]] | verb | **1.** Give advice to.<br>**2.** Inform (somebody) of something. | *"My lord, ’Tis an unseason’d courtier; good my lord, Advise him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advised]] | verb | **1.** Give advice to.<br>**2.** Inform (somebody) of something. | *"My liege, I am advised what I say, Neither disturb’d with the effect of wine, Nor heady-rash, provok’d with raging ire, Albeit my wrongs might make one wiser mad."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[advisee]] | noun | **1.** Someone who receives advice. | *"In academic literature, advisee designates someone who receives advice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[advisement]] | noun | **1.** Careful consideration. | *"Blythe Bessie in the milking shiel, Says—“I’ll be wed, come o’t what will”: Out spake a dame in wrinkled eild; “O’ gude advisement comes nae ill."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[adviser]] | noun | **1.** An expert who gives advice. | *"My father instructed the two sons and acted as helper and adviser to the Baroness in many things."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[advisor]] | noun | **1.** An expert who gives advice. | *"His eyes moved from one advisor to the other."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[advisory]] | noun | **1.** An announcement that usually advises or warns the public of some threat.<br>**2.** Giving advice; ,. | *"Alongside of the Reserve Board, is placed a Federal Advisory Council, consisting of one member from the board of directors of each of the twelve district banks."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[envision]] | verb | **1.** Imagine; conceive of; see in one's mind.<br>**2.** Picture to oneself; imagine possible. | *"In academic literature, envision designates imagine; conceive of; see in one's mind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[inadvisable]] | adjective | **1.** Not prudent or wise; not recommended.<br>**2.** Not advisable. | *"Evidently it was inadvisable to continue the subject."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[invisibility]] | noun | **1.** The quality of not being perceivable by the eye. | *"She heard old Royce sing in the pantomime of Turko the Terrible and laughed with others when he sang: I am the boy That can enjoy Invisibility."* — James Joyce, *Ulysses* |
| [[invisible]] | adjective | **1.** Impossible or nearly impossible to see; imperceptible by the eye.<br>**2.** Not prominent or readily noticeable. | *"From the barge A strange invisible perfume hits the sense Of the adjacent wharfs."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invisibleness]] | noun | **1.** The quality of not being perceivable by the eye. | *"In academic literature, invisibleness designates the quality of not being perceivable by the eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misadvise]] | verb | **1.** Give bad advice to. | *"In academic literature, misadvise designates give bad advice to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonvisual]] | adjective | **1.** Not resulting in vision. | *"In academic literature, nonvisual designates not resulting in vision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prevision]] | noun | **1.** A prophetic vision (as in a dream).<br>**2.** The power to foresee the future. | *"That would be in a couple of hours, at the end of which—I had the acute prevision—my little pupils would play at innocent wonder about my nonappearance in their train."* — Henry James, *The Turn of the Screw* |
| [[provision]] | noun | **1.** A stipulated condition.<br>**2.** The activity of supplying or providing something. | *"Five days we do allot thee for provision, To shield thee from disasters of the world; And on the sixth to turn thy hated back Upon our kingdom: if, on the next day following, Thy banish’d trunk be found in our dominions, The moment is thy death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provisional]] | adjective | **1.** Under terms not final or fully worked out or agreed upon. | *"My contribution to the history of the human mind consists of little more than a rough and purely provisional classification of facts gathered almost entirely from printed sources."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[provisionally]] | adverb | **1.** Temporarily and conditionally. | *"Only once had he to consult a Greek lexicon for the meaning of a word; and then it turned out that the meaning he had assigned to it provisionally was the right one."* — John Cairns, *Principal Cairns* |
| [[provisionary]] | adjective | **1.** Under terms not final or fully worked out or agreed upon. | *"In academic literature, provisionary designates under terms not final or fully worked out or agreed upon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[provisioner]] | noun | **1.** A supplier of victuals or supplies to an army. | *"In academic literature, provisioner designates a supplier of victuals or supplies to an army."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proviso]] | noun | **1.** A stipulated condition. | *"I shall like it,” she cried, “beyond anything in the world; and do not let us put it off—let us go to-morrow.” This was readily agreed to, with only a proviso of Miss Tilney’s, that it did not rain, which Catherine was sure it would not."* — Jane Austen, *Northanger Abbey* |
| [[retrovision]] | noun | **1.** A vision of events in the distant past. | *"In academic literature, retrovision designates a vision of events in the distant past."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revisal]] | noun | **1.** The act of rewriting something. | *"The theory, neither of the British, nor the State constitutions, authorizes the revisal of a judicial sentence by a legislative act."* — Alexander Hamilton, *The Federalist Papers* |
| [[revise]] | noun | **1.** The act of rewriting something.<br>**2.** Make revisions in. | *"Casaubon was not used to expect that he should have to repeat or revise his communications of a practical or personal kind."* — George Eliot, *Middlemarch* |
| [[revised]] | verb | **1.** Make revisions in.<br>**2.** Revise or reorganize, especially for the purpose of updating and improving. | *"The manuscript was revised around 1803 and sold to a London publisher, Crosbie & Co., who sold it back in 1816."* — Jane Austen, *Northanger Abbey* |
| [[reviser]] | noun | **1.** Someone who puts text into appropriate form for publication. | *"In academic literature, reviser designates someone who puts text into appropriate form for publication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[revising]] | noun | **1.** Editing that involves writing something again.<br>**2.** Make revisions in. | *"For help in revising the proofs I have to thank the Rev."* — John Cairns, *Principal Cairns* |
| [[revision]] | noun | **1.** The act of revising or altering (involving reconsideration and modification).<br>**2.** The act of rewriting something. | *"The present volume was planned some years ago as a revision of a part of the author's earlier text, "The Principles of Economics" (1904)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[revisit]] | verb | **1.** Visit again. | *"What may this mean, That thou, dead corse, again in complete steel, Revisit’st thus the glimpses of the moon, Making night hideous, and we fools of nature So horridly to shake our disposition With thoughts beyond the reaches of our souls?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supervise]] | verb | **1.** Watch and direct.<br>**2.** Keep tabs on; keep an eye on; keep under surveillance. | *"Let me supervise the canzonet. [_He takes the letter_.] Here are only numbers ratified, but, for the elegancy, facility, and golden cadence of poesy, _caret_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[supervised]] | verb | **1.** Watch and direct.<br>**2.** Keep tabs on; keep an eye on; keep under surveillance. | *"While she supervised the cooking of the meats and soups and coffee, all nice things were made and distributed by herself."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[supervising]] | noun | **1.** Management by overseeing the performance or operation of a person or group.<br>**2.** Watch and direct. | *"Especially is the difficulty of supervising workers and of ensuring the performance of a certain standard, or minimum, amount and quality of work great in larger enterprises."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[supervision]] | noun | **1.** Management by overseeing the performance or operation of a person or group. | *"At length he recovered sufficiently to be removed under his elder brother's careful and loving supervision to the Edinburgh Infirmary, where he remained for four months."* — John Cairns, *Principal Cairns* |
| [[supervisor]] | noun | **1.** One who supervises or has charge and direction of.<br>**2.** A program that controls the execution of other programs. | *"Would you, the supervisor, grossly gape on, Behold her topp’d?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[televise]] | verb | **1.** Broadcast via television. | *"In academic literature, televise designates broadcast via television."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[television]] | noun | **1.** Broadcasting visual images of stationary or moving objects; ;  - ernie kovacs.<br>**2.** A telecommunication system that transmits images of objects (stationary or moving) between distant points. | *"The young are already exposed to far more negative forces in the general run of storybooks, television shows, Internet games and the real world."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[unadvisable]] | adjective | **1.** Not prudent or wise; not recommended. | *"If I do go it will be unadvisable for me to take her on this my first journey."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[visage]] | noun | **1.** The human face (`kisser' and `smiler' and `mug' are informal terms for `face' and `phiz' is british).<br>**2.** The appearance conveyed by a person's face. | *"The blood upon your visage dries; ’tis time It should be looked to."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[visibility]] | noun | **1.** Quality or fact or degree of being visible; perceptible by the eye or obvious to the eye.<br>**2.** Degree of exposure to public notice. | *"Cobwebs revealed their presence on sheds and walls where none had ever been observed till brought out into visibility by the crystallizing atmosphere, hanging like loops of white worsted from salient points of the out-houses, posts, and gates."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[visible]] | adjective | **1.** Capable of being seen; or open to easy view.<br>**2.** Obvious to the eye. | *"Here I am Antony, Yet cannot hold this visible shape, my knave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[visibleness]] | noun | **1.** Quality or fact or degree of being visible; perceptible by the eye or obvious to the eye. | *"In academic literature, visibleness designates quality or fact or degree of being visible; perceptible by the eye or obvious to the eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vision]] | noun | **1.** A vivid mental image.<br>**2.** The ability to see; the visual faculty. | *"Touching this vision here, It is an honest ghost, that let me tell you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[visionary]] | noun | **1.** A person given to fanciful speculations and enthusiasms with little regard for what is actually possible.<br>**2.** A person with unusual powers of foresight. | *"She was no longer the milkmaid, but a visionary essence of woman—a whole sex condensed into one typical form."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[visit]] | noun | **1.** The act of going to see some person or place or thing for a short time.<br>**2.** A meeting arranged by the visitor to see someone (such as a doctor or lawyer) for treatment or advice. | *"O Caesar, what a wounding shame is this, That thou vouchsafing here to visit me, Doing the honour of thy lordliness To one so meek, that mine own servant should Parcel the sum of my disgraces by Addition of his envy!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[visitant]] | noun | **1.** Someone who visits. | *"I rang the bell, for I wanted a candle; and I wanted, too, to get an account of this visitant."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[visitation]] | noun | **1.** An annoying or frustrating or catastrophic event.<br>**2.** Any disaster or catastrophe. | *"If it will please you To show us so much gentry and good will As to expend your time with us awhile, For the supply and profit of our hope, Your visitation shall receive such thanks As fits a king’s remembrance."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[visiting]] | noun | **1.** The activity of making visits.<br>**2.** Go to see a place, as for entertainment. | *"The odds is gone, And there is nothing left remarkable Beneath the visiting moon. [_Faints._] CHARMIAN."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[visitor]] | noun | **1.** Someone who visits. | *"The visitor will not give him o’er so."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[visor]] | noun | **1.** A piece of armor plate (with eye slits) fixed or hinged to a medieval helmet to protect the face.<br>**2.** A brim that projects to the front to shade the eyes. | *"I beseech you, sir, to countenance William Visor of Woncot against Clement Perkes o’ th’ hill."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vista]] | noun | **1.** The visual percept of a region. | *"Bucket looks at him as if his face were a vista of some miles in length and he were leisurely contemplating the same."* — Charles Dickens, *Bleak House* |
| [[visual]] | adjective | **1.** Relating to or using sight.<br>**2.** Visible; - shakespeare. | *"The great aids to idealization in love were present here: occasional observation of her from a distance, and the absence of social intercourse with her—visual familiarity, oral strangeness."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[visualise]] | verb | **1.** View the outline of by means of an x-ray.<br>**2.** Form a mental picture of something that is invisible or abstract. | *"As usual, the Chinese descriptions are exceedingly difficult to visualise, and in many cases are open to several interpretations, and are not easy to reconcile with established facts."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[visualization]] | noun | **1.** A mental image that is similar to a visual perception. | *"By sheer visualization under my eyelids I constructed chess-boards and played both sides of long games through to checkmate."* — Jack London, *The Jacket (The Star-Rover)* |
| [[visualize]] | verb | **1.** Imagine; conceive of; see in one's mind.<br>**2.** View the outline of by means of an x-ray. | *"Can you visualize me milking cows, for instance?" "No," answered Amanda, "I'd say that you were cut out for a different role." There was a deeper meaning in the country girl's words than the flighty city girl could read."* — Anna Balmer Myers, *Amanda: A Daughter of the Mennonites* |
| [[visualized]] | verb | **1.** Imagine; conceive of; see in one's mind.<br>**2.** View the outline of by means of an x-ray. | *"But when I had become expert at this visualized game of memory the exercise palled on me."* — Jack London, *The Jacket (The Star-Rover)* |
| [[visualizer]] | noun | **1.** One whose prevailing mental imagery is visual. | *"KEEP IT SIMPLE The visualizer should keep one cardinal point in mind."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[visually]] | adverb | **1.** With respect to vision. | *"Oh...nothin'.' Think a Story If you can think a story, and if you can write a letter or express your thoughts orally or visually, then you can combine them into a message to a grandchild."* — Meyer Moldeven, *A Grandpa's Notebook* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Sight]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · VIS
  </div>
</div>
