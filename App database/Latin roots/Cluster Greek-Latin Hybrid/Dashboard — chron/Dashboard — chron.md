---
status: unread
type: root_dashboard
---
# Dashboard — chron
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">chron-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“time”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Interconnected word patterns that combine classical ideas together.</span>
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

The root **chron** means time. It refers to the continuous progression of seconds, hours, and epochs. In English, this root forms words such as *anachronism*, *anachronistic*, *anachronistically*, and *asynchronism*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: time
> The root **chron** means time. It refers to the continuous progression of seconds, hours, and epochs. In English, this root forms words such as *anachronism*, *anachronistic*, *anachronistically*, and *asynchronism*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Time</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Interconnected word patterns that combine classical ideas together.</mark>
> - **Everyday Connection**: Think of familiar words like *anachronism* and *anachronistic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **chron** comes from a Latin word that means *"time"*.
  - At its core, it describes time.

- **The Big Picture Idea**:
  - Picture interconnected word patterns that combine classical ideas together.
  - Whenever you see **chron** in an English word, think of **blended classical concepts**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of time.
  - **Mental & Social**: How people experience, organize, or communicate about time.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Anachronism**: An error in chronology in which an event, object, or person is assigned to an incorrect period.
  - **Anachronistic**: Pertaining to, containing, or characteristic of an anachronism.
  - **Anachronistically**: In an anachronistic or chronologically misplaced manner.
  - **Asynchronism**: The condition of not occurring at the same time.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">chron</mark>, think of <mark class="hl-def">blended classical concepts</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **chron-** manifests in two primary morphological positions:
> - **Initial Combining Form:** `chrono-` / `chron-` (attaching to instruments, sciences, and records: *chronology*, *chronicle*, *chronometer*, *chronograph*, *chronic*)
> - **Terminal Combining Form:** `-chron-` (governed by Greek prefixes: *anachronism*, *synchronous*, *asynchronous*, *diachronic*, *isochronous*, *heterochrony*)
>
> **Prefix Combinations:** The root combines strictly with Greek prefixes:
> - `syn-` ("together with") $ightarrow$ *synchronous*, *synchronize*, *synchrony*
> - `a-` / `an-` (privative "without") $ightarrow$ *asynchronous*, *asynchrony*
> - `ana-` ("backward, against") $ightarrow$ *anachronism*, *anachronistic*
> - `dia-` ("through, across") $ightarrow$ *diachronic*, *diachrony*
> - `iso-` ("equal, same") $ightarrow$ *isochronous*, *isochrone*
> - `hetero-` ("different, other") $ightarrow$ *heterochrony*

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
> The semantic spectrum of `chron` partitions into five primary zones:
> - **Historical Sequence & Textual Records:** *chronicle*, *chronology*, *chronological* record annals and arrange events in historical sequence.
> - **Temporal Mismatch & Errors:** *anachronism* and *anachronistic* designate objects, ideas, or customs erroneously placed in the wrong era.
> - **Clinical Duration & Pathology:** *chronic*, *chronically*, *chronicity* define long-standing, recurring, or incurable diseases (opposed to *acute*).
> - **Precision Horology & Instrument Timing:** *chronometer*, *chronograph*, *chronometry* measure elapsed time down to microseconds.
> - **Coordinated Concurrency & Computing:** *synchronous*, *asynchronous*, *synchronize*, and *sync* describe coordinated versus independent operation across computing threads, satellites, and communications networks.

---

## 🔀 4. Prefix & Combining Dynamics on chron

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Prefix Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `syn-` | together, with, simultaneous | [[synchronous]], [[synchronize]] | Operating or occurring at the exact same time; sharing a common clock. |
| `a-` (privative) + `syn-` | not + together | [[asynchronous]], [[asynchrony]] | *Not* occurring at the same time; executing independently without waiting for a clock cycle. |
| `ana-` | back, upward, against | [[anachronism]], [[anachronistic]] | Placed *against* the stream of time; an error of historical dating or outdated relic. |
| `dia-` | through, across | [[diachronic]], [[diachrony]] | Pertaining to changes occurring *through* the passage of time. |
| `iso-` | equal, uniform | [[isochronous]], [[isochrone]] | Taking equal intervals of time; lines on a map indicating equal travel time. |
| `hetero-` | different, other | [[heterochrony]] | Evolutionary change in the *timing* or rate of developmental processes. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ic` | Adjective (Pertaining to) | [[chronic]], [[synchronic]], [[diachronic]] | Characterized by duration, simultaneous state, or temporal evolution. |
| `-icle` (< *-ica*) | Noun (Historical Record) | [[chronicle]] | An official written record of events in time order. |
| `-ology` (< *-logia*) | Noun (Field of Study) | [[chronology]], [[dendrochronology]] | The science of dating events, or studying tree rings over time. |
| `-meter` (< *metron*) | Noun (Measuring Device) | [[chronometer]] | A highly accurate clock or timekeeping instrument. |
| `-graph` (< *graphein*) | Noun (Recording Device) | [[chronograph]] | An instrument that records elapsed time intervals (a stopwatch). |
| `-ize` | Verb (Causative Action) | [[synchronize]] | To bring multiple processes or clocks into identical temporal alignment. |
| `-ism` | Noun (State / Anomaly) | [[anachronism]], [[synchronism]] | The condition of being misplaced in time, or occurring simultaneously. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 💻 **Computer Science & Telecommunications** | [[synchronous]], [[asynchronous]], [[synchronize]] | Non-blocking I/O programming (async/await), database replication, clock sync protocols (NTP), synchronous motors. |
| 🩺 **Clinical Medicine & Pathology** | [[chronic]], [[chronicity]], [[chronobiology]] | Diagnostic categorization (*chronic kidney disease* vs. *acute injury*); circadian rhythms; sleep-wake pharmacology. |
| 🧭 **Maritime History & Horology** | [[chronometer]], [[chronograph]], [[chronometry]] | Navigation via celestial longitude; certified chronometers (COSC); chronograph complications in luxury watchmaking. |
| 🗣️ **Linguistics & Literary Theory** | [[synchronic]], [[diachronic]], [[anachronism]] | Saussurean structuralism; identifying historical anachronisms in period films, plays, and historical novels. |
| 🌲 **Geology & Archaeology** | [[dendrochronology]], [[geochronology]], [[chronology]] | Tree-ring dating of ancient timber; radiometric dating of geological strata; establishing dynastic king lists. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[anachronic]] | adjective | **1.** Chronologically misplaced. | *"In academic literature, anachronic designates chronologically misplaced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anachronism]] | noun | **1.** Something located at a time when it could not have existed or occurred.<br>**2.** An artifact that belongs to another time. | *"You are too young—it is an anachronism for you to have such thoughts,” said Will, energetically, with a quick shake of the head habitual to him."* — George Eliot, *Middlemarch* |
| [[anachronistic]] | adjective | **1.** Chronologically misplaced. | *"Retained anachronistic spelling and grammar as printed."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[anachronous]] | adjective | **1.** Chronologically misplaced. | *"In academic literature, anachronous designates chronologically misplaced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asynchronous]] | adjective | **1.** (digital communication) pertaining to a transmission technique that does not require a common clock between the communicating devices; timing signals are derived from special characters in the data stream itself.<br>**2.** Not synchronous; not occurring or existing at the same time or having the same period or phase. | *"In academic literature, asynchronous designates (digital communication) pertaining to a transmission technique that does not require a common clock between the communicating devices; timing signals are derived from special characters in the data stream itself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronic]] | adjective | **1.** Being long-lasting and recurrent or characterized by long suffering.<br>**2.** Of long duration. | *"Indeed, she had two.” My Lady, whose chronic malady of boredom has been sadly aggravated by Volumnia this evening, glances wearily towards the candlesticks and heaves a noiseless sigh."* — Charles Dickens, *Bleak House* |
| [[chronically]] | adverb | **1.** In a habitual and longstanding manner.<br>**2.** In a slowly developing and long lasting manner. | *"It may be said, for short, that every organ of the lower body became chronically diseased, and that the headaches increased in violence."* — Classic Author, *The wonders of prayer* |
| [[chronicle]] | noun | **1.** A record or narrative description of past events.<br>**2.** Record in chronological order; make a historical record. | *"I and my sword will earn our chronicle."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[chronicler]] | noun | **1.** Someone who writes chronicles. | *"After my death I wish no other herald, No other speaker of my living actions, To keep mine honour from corruption But such an honest chronicler as Griffith."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[chronograph]] | noun | **1.** An accurate timer for recording time. | *"Normally, current flows through the circuit-breaker, but the lifting of the piston breaks the circuit (whence the name of the contrivance), and that breaking of the circuit and consequent cessation of the current operates the chronograph."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[chronological]] | adjective | **1.** Relating to or arranged according to temporal order. | *"Mark's chronological date here, he does not speak of this until Peter has called him the Messiah."* — T. R. Glover, *The Jesus of History* |
| [[chronologically]] | adverb | **1.** With respect to chronology. | *"The persistency of this thought may be best illustrated by a few quotations from poems and letters, arranged chronologically: 1831."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[chronologise]] | verb | **1.** Establish the order in time of something. | *"In academic literature, chronologise designates establish the order in time of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronologize]] | verb | **1.** Establish the order in time of something. | *"In academic literature, chronologize designates establish the order in time of something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronology]] | noun | **1.** An arrangement of events in time.<br>**2.** A record of events in the order of their occurrence. | *"His very name carried an impressiveness hardly to be measured without a precise chronology of scholarship."* — George Eliot, *Middlemarch* |
| [[chronometer]] | noun | **1.** An accurate clock (especially used in navigation). | *"Heart weak, but steady as a chronometer.” “It’s only twenty-four hours,” Captain Jamie said, “and he was never in like condition before.” “Putting it on, that’s what he’s doing, and you can stack on that,” Al Hutchins, the head trusty, interjected."* — Jack London, *The Jacket (The Star-Rover)* |
| [[chronoperates]] | noun | **1.** A reptile genus of therapsida. | *"In academic literature, chronoperates designates a reptile genus of therapsida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chronoscope]] | noun | **1.** An instrument for accurate measurements of small intervals of time. | *"In academic literature, chronoscope designates an instrument for accurate measurements of small intervals of time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desynchronisation]] | noun | **1.** The relation that exists when things occur at unrelated times. | *"In academic literature, desynchronisation designates the relation that exists when things occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desynchronise]] | verb | **1.** Cause to become desynchronized; cause to occur at unrelated times. | *"In academic literature, desynchronise designates cause to become desynchronized; cause to occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desynchronization]] | noun | **1.** The relation that exists when things occur at unrelated times. | *"In academic literature, desynchronization designates the relation that exists when things occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desynchronize]] | verb | **1.** Cause to become desynchronized; cause to occur at unrelated times. | *"In academic literature, desynchronize designates cause to become desynchronized; cause to occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[desynchronizing]] | noun | **1.** The relation that exists when things occur at unrelated times.<br>**2.** Cause to become desynchronized; cause to occur at unrelated times. | *"In academic literature, desynchronizing designates the relation that exists when things occur at unrelated times."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonsynchronous]] | adjective | **1.** Not occurring together. | *"In academic literature, nonsynchronous designates not occurring together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronal]] | adjective | **1.** Occurring or existing at the same time or having the same period or phase; - jour.a.m.a. | *"In academic literature, synchronal designates occurring or existing at the same time or having the same period or phase; - jour.a.m.a."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchroneity]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchroneity designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronic]] | adjective | **1.** Occurring or existing at the same time or having the same period or phase; - jour.a.m.a.<br>**2.** Concerned with phenomena (especially language) at a particular period without considering historical antecedents. | *"In academic literature, synchronic designates occurring or existing at the same time or having the same period or phase; - jour.a.m.a."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronicity]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchronicity designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronisation]] | noun | **1.** The relation that exists when things occur at the same time.<br>**2.** An adjustment that causes something to occur or recur in unison. | *"In academic literature, synchronisation designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronise]] | verb | **1.** Happen at the same time.<br>**2.** Make (motion picture sound) exactly simultaneous with the action. | *"And when we separate the two by a distance of many miles, the task of synchronising them is even worse."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[synchronised]] | verb | **1.** Happen at the same time.<br>**2.** Make (motion picture sound) exactly simultaneous with the action. | *"In academic literature, synchronised designates happen at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchroniser]] | noun | **1.** An instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines). | *"In academic literature, synchroniser designates an instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronising]] | noun | **1.** An adjustment that causes something to occur or recur in unison.<br>**2.** Happen at the same time. | *"And when we separate the two by a distance of many miles, the task of synchronising them is even worse."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[synchronism]] | noun | **1.** The relation that exists when things occur at the same time. | *"For success, as has already been said, one thing was essential, and that thing very difficult to obtain--a perfect synchronism between one stylus and the other."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[synchronization]] | noun | **1.** The relation that exists when things occur at the same time.<br>**2.** An adjustment that causes something to occur or recur in unison. | *"In academic literature, synchronization designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronize]] | verb | **1.** Make synchronous and adjust in time or manner.<br>**2.** Happen at the same time. | *"Each utility maneuvered to synchronize axis and align portals."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[synchronized]] | verb | **1.** Make synchronous and adjust in time or manner.<br>**2.** Happen at the same time. | *"All of your plans and timetables must be synchronized with the actions I take at the conference." "Any attacks on the depot will be immediately spunnel-flashed by Hanno to the UIPS," Drummer said."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[synchronizer]] | noun | **1.** An instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines). | *"In academic literature, synchronizer designates an instrument that indicates whether two periodic motions are synchronous (especially an instrument that enables a pilot to synchronize the propellers of a plane that has two or more engines)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronizing]] | noun | **1.** The relation that exists when things occur at the same time.<br>**2.** An adjustment that causes something to occur or recur in unison. | *"In academic literature, synchronizing designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronous]] | adjective | **1.** Occurring or existing at the same time or having the same period or phase; - jour.a.m.a.<br>**2.** (digital communication) pertaining to a transmission technique that requires a common clock signal (a timing reference) between the communicating devices in order to coordinate their transmissions. | *"In academic literature, synchronous designates occurring or existing at the same time or having the same period or phase; - jour.a.m.a."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchronously]] | adverb | **1.** In synchrony; in a synchronous manner. | *"In academic literature, synchronously designates in synchrony; in a synchronous manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synchrony]] | noun | **1.** The relation that exists when things occur at the same time. | *"In academic literature, synchrony designates the relation that exists when things occur at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsynchronised]] | adjective | **1.** Not occurring together. | *"In academic literature, unsynchronised designates not occurring together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsynchronized]] | adjective | **1.** Not occurring together. | *"In academic literature, unsynchronized designates not occurring together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsynchronous]] | adjective | **1.** Not occurring together. | *"In academic literature, unsynchronous designates not occurring together."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Greek-Latin Hybrid]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · CHRON
  </div>
</div>
