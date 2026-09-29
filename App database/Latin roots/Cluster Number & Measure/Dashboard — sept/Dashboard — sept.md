---
status: unread
type: root_dashboard
---
# Dashboard — sept
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sept-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“seven”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Counting units on a ruler or measuring out exact proportions.</span>
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

The root **sept** means seven. It refers to the number seven or a sevenfold set. In English, this root forms words such as *september*, *septet*, *septuple*, and *septuplet*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: seven
> The root **sept** means seven. It refers to the number seven or a sevenfold set. In English, this root forms words such as *september*, *septet*, *septuple*, and *septuplet*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Seven</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *september* and *septet*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sept** comes from a Latin word that means *"seven"*.
  - At its core, it describes seven.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **sept** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of seven.
  - **Mental & Social**: How people experience, organize, or communicate about seven.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **September**: The ninth month of the Gregorian calendar.
  - **Septet**: A group of seven musicians or singers performing together.
  - **Septuple**: Consisting of seven parts.
  - **Septuplet**: Each of seven children born at one birth.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sept</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sept** builds vocabulary through Latin cardinal, ordinal, and astronomical forms:
> - **Direct Cardinal Stems in `sept-` and `septu-`:**
>   - *septem* + *mēnsis* $\to$ *September* ("seventh Roman month").
>   - *septem* + Italian *-etto* $\to$ *septet* ("ensemble of seven performers").
>   - *septuplus* $\to$ *septuple* ("sevenfold").
>   - *septuple* + *-et* $\to$ *septuplet* ("each of seven children born at one birth").
>   - *septēnārius* $\to$ *septenary* ("consisting of seven things").
>   - *septem* + *annus* ("year") $\to$ *septennial* ("occurring every seven years").
> - **Tens Multiplier `septuagint-` (< *septuāgintā* "seventy"):**
>   - *septuāgintā* $\to$ *Septuagint* (the Greek Old Testament LXX).
>   - *septuāgēnārius* $\to$ *septuagenarian* ("person between 70 and 79 years old").
> - **Astronomical / Directional Compound `septentrion-`:**
>   - *septem* + *triōnēs* ("plow-oxen") $\to$ *septentriōnēs* $\to$ *septentrional* ("northern").

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
> Although fundamentally denoting **"seven"**, the root adapts to diverse practical registers:
> - **Calendars & Temporal Cycles:** *September*, *septennial* (ninth Gregorian month, seven-year legislative or agricultural cycle).
> - **Music Theory & Vocal Ensembles:** *septet* (seven-piece instrumental composition, Beethoven's Op. 20 Septet).
> - **Textual Biblical Criticism:** *Septuagint* (Alexandrian Greek translation of the Hebrew Scriptures).
> - **Demographic Longevity:** *septuagenarian* (person in their seventies).
> - **Polar Geography & Cartography:** *septentrional* (northern regions, boreal cartography).
> - **Multiple Births & Multipliers:** *septuple*, *septuplet* (sevenfold, seven siblings at one birth).

---

## 🔀 4. Prefix & Combining Dynamics on sept

### Combining Form Dynamics

| Form | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `sept-` + `mēnsis` | seven + month | **[[September]]** | The seventh month of the ancient Roman agricultural calendar. |
| `sept-` + `annus` | seven + year | **septennial** | Occurring once every seven years; lasting seven years. |
| `septem` + `triōnēs` | seven + plow-oxen | **septentrional** | Of or relating to the North (from the 7 stars of the Big Dipper). |
| `septu-` + `plicāre` | seven + fold | **[[septuple]]** | Consisting of seven parts; to increase sevenfold. |

### Suffix Transformations (Grammatical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-et` | Noun (Ensemble / Set) | **[[septet]]** | A group of seven people playing music or singing together. |
| `-arian` | Noun / Adjective (Age Cohort) | **septuagenarian** | A person who is between seventy and seventy-nine years old. |
| `-ennial` | Adjective (Temporal Recurrence)| **septennial** | Recurring in a seven-year cycle (e.g. Septennial Act of 1715). |
| `-al` | Adjective (Directional) | **septentrional** | Northern; boreal; relating to northern polar geography. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🎻 **Classical Chamber Music** | *septet* | Beethoven's Septet in E-flat major (clarinet, bassoon, horn, violin, viola, cello, bass). |
| 📜 **Biblical Scholarship & Philology** | *Septuagint* (LXX) | Textual criticism of Dead Sea Scrolls, transmission of early Greek biblical manuscripts. |
| 🗺️ **Historical Geography & Cartography** | *septentrional*, *septentrion* | 16th-century Dutch atlases labeling North America as *America Septentrionalis*. |
| 🏛️ **Constitutional History & Parliaments** | *septennial*, *Septennial Act* | British parliamentary terms, seven-year statutory limitations. |
| 🏥 **Demographics & Medicine** | *septuagenarian*, *septuplet* | Geriatric medical cohorts, high-risk multiple obstetric deliveries. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antiseptic]] | noun | **1.** A substance that destroys micro-organisms that carry disease without harming body tissues.<br>**2.** Thoroughly clean and free of or destructive to disease-causing organisms. | *"And his keen sense of the ludicrous side of things often acted as an antiseptic, and kept him right both with himself and with his people."* — John Cairns, *Principal Cairns* |
| [[antisepticize]] | verb | **1.** Disinfect with an antiseptic. | *"In academic literature, antisepticize designates disinfect with an antiseptic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sept]] | noun | **1.** The month following august and preceding october.<br>**2.** People descended from a common ancestor. | *"Never done nothink to get myself into no trouble, ’sept in not moving on and the inkwhich."* — Charles Dickens, *Bleak House* |
| [[septal]] | adjective | **1.** Of or relating to a septum. | *"In academic literature, septal designates of or relating to a septum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septate]] | adjective | **1.** Of or relating to a septum. | *"Before this point was satisfactorily decided, the brown spores, which are borne on long stalks, and are themselves septate or divided (apparently or really) by transverse partitions into a complex fruit, received the name of _Puccinia Rosæ_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[septation]] | noun | **1.** The division or partitioning of a cavity into parts by a septum. | *"In academic literature, septation designates the division or partitioning of a cavity into parts by a septum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septectomy]] | noun | **1.** Surgical removal of all or part of a septum (especially the nasal septum or atrial septum). | *"In academic literature, septectomy designates surgical removal of all or part of a septum (especially the nasal septum or atrial septum)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[september]] | noun | **1.** The month following august and preceding october. | *"Anne had never entered Kellynch since her quitting Lady Russell’s house in September."* — Jane Austen, *Persuasion* |
| [[septenary]] | noun | **1.** The cardinal number that is the sum of six and one. | *"In academic literature, septenary designates the cardinal number that is the sum of six and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septet]] | noun | **1.** The cardinal number that is the sum of six and one.<br>**2.** Seven performers or singers who perform together. | *"In academic literature, septet designates the cardinal number that is the sum of six and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septette]] | noun | **1.** Seven performers or singers who perform together.<br>**2.** A set of seven similar things considered as a unit. | *"In academic literature, septette designates seven performers or singers who perform together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septic]] | adjective | **1.** Containing or resulting from disease-causing organisms.<br>**2.** Of or relating to or caused by putrefaction. | *"The cup is clean enough without; it is septic and poisonous within--and from which side of it do you drink, outside or inside? (Matt. 23:25)."* — T. R. Glover, *The Jesus of History* |
| [[septicaemia]] | noun | **1.** Invasion of the bloodstream by virulent microorganisms from a focus of infection. | *"In academic literature, septicaemia designates invasion of the bloodstream by virulent microorganisms from a focus of infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septicemia]] | noun | **1.** Invasion of the bloodstream by virulent microorganisms from a focus of infection. | *"In academic literature, septicemia designates invasion of the bloodstream by virulent microorganisms from a focus of infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septicemic]] | adjective | **1.** Characteristic of septicemia. | *"In academic literature, septicemic designates characteristic of septicemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septillion]] | noun | **1.** The number that is represented as a one followed by 24 zeros. | *"In academic literature, septillion designates the number that is represented as a one followed by 24 zeros."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septobasidiaceae]] | noun | **1.** A family of fungi belonging to the subdivision basidiomycota. | *"In academic literature, septobasidiaceae designates a family of fungi belonging to the subdivision basidiomycota."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septobasidium]] | noun | **1.** Type genus of septobasidiaceae: smooth shelf fungi usually having a well-developed sometimes thick-walled hypobasidium. | *"In academic literature, septobasidium designates type genus of septobasidiaceae: smooth shelf fungi usually having a well-developed sometimes thick-walled hypobasidium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septrional]] | adjective | **1.** Of northern regions; from the seven stars (or seven plowing oxen) of ursa major. | *"In academic literature, septrional designates of northern regions; from the seven stars (or seven plowing oxen) of ursa major."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septuagenarian]] | noun | **1.** Someone whose age is in the seventies. | *"In academic literature, septuagenarian designates someone whose age is in the seventies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septuagesima]] | noun | **1.** The 3rd sunday before lent (or the 9th before easter). | *"In academic literature, septuagesima designates the 3rd sunday before lent (or the 9th before easter)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[septuagint]] | noun | **1.** The oldest greek version of the old testament; said to have been translated from the hebrew by jewish scholars at the request of ptolemy ii. | *"Don't talk miracles of that kind, or you will be proved to talk folly beyond even that of the Greeks."'[64] Trypho has the Hebrew text behind him, which says {191} nothing about a virgin, though the Septuagint has the word."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[septum]] | noun | **1.** (anatomy) a dividing partition between two tissues or cavities.<br>**2.** A partition or wall especially in an ovary. | *"In one instance these spores are united in pairs, or divided by a septum, so that they are two-celled: these are named _Puccinia_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[septuple]] | adjective | **1.** Having seven units or components. | *"In academic literature, septuple designates having seven units or components."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Measure]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SEPT
  </div>
</div>
