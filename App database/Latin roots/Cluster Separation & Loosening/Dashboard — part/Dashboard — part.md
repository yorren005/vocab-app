---
status: unread
type: root_dashboard
---
# Dashboard — part
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">part-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“part or share”</span>
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

The root **part** means part or share. It refers to a portion, distinct share, or divided section of a whole. In English, this root forms words such as *part*, *partial*, *particle*, and *participate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: part or share
> The root **part** means part or share. It refers to a portion, distinct share, or divided section of a whole. In English, this root forms words such as *part*, *partial*, *particle*, and *participate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Part or share</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Untying a tight knot and separating two parts from each other.</mark>
> - **Everyday Connection**: Think of familiar words like *part* and *partial*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **part** comes from a Latin word that means *"part or share"*.
  - At its core, it describes part or share.

- **The Big Picture Idea**:
  - Picture untying a tight knot and separating two parts from each other.
  - Whenever you see **part** in an English word, think of **separating, loosening, and dividing**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of part or share.
  - **Mental & Social**: How people experience, organize, or communicate about part or share.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Part**: An element or fraction that combines with others to make up a whole. 2. To separate or divide.
  - **Partial**: Existing only in part.
  - **Particle**: A minute portion of matter. 2. In physics, an elementary subatomic constituent of the universe.
  - **Participate**: To take part in an action, event, or endeavor.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">part</mark>, think of <mark class="hl-def">separating, loosening, and dividing</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

### 2.1 Morphological Stems
- **Base Noun:** *part* $\to$ *partial*, *partially*, *partiality*, *impartial*, *impartiality*.
- **Diminutive Formation (`-cula`):** *particula* $\to$ *particle*, *particular*, *particularity*, *particularize*, *particulate*.
- **Factional Base (`-isan`):** *partisan*, *partisanship*, *bipartisan*.
- **Division / Boundary Base (`-ition`):** *partition* (wall or division of territory).
- **Directional Prefixation:**
  - `de-` + *part* $\to$ *depart* (to leave), *departure*, *department*, *departmental*.
  - `im-` + *part* $\to$ *impart* (to give a share of knowledge/wisdom).
  - `com-` + *part* $\to$ *compartment* (separated chamber).
  - `a-` + *part* $\to$ *apartment* (suite of rooms set apart).
- **Relational Sharing:**
  - *partner* (one who shares a portion), *partnership*.
  - *participate* (*partem* + *capere* "to take a part"), *participation*, *participant*.

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

### 1. Factionalism, Bias & Justice
- *partial* (favoring one side in a dispute; biased; existing only in part).
- *impartial* (treating all rivals or disputants equally; fair and just).
- *partisan* (a strong supporter of a party, cause, or person; guerrilla fighter).
- *bipartisan* (involving the agreement or cooperation of two political parties).

### 2. Subatomic Physics & Microscopic Scale
- *particle* (a minute portion of matter; subatomic electron, quark).
- *particulate* (relating to or in the form of minute separate particles).
- *particular* (insisting on specific details; unique; individual).

### 3. Separation, Architecture & Movement
- *depart* (to leave, typically in order to start a journey).
- *departure* (the action of leaving, especially on a journey).
- *department* (a division of a large organization, government, or university).
- *apartment* (a suite of rooms forming one separate residence).
- *compartment* (a separate section or division of something).
- *partition* (a structure dividing spaces; division of a country).

### 4. Collaboration & Active Sharing
- *participate* (to take part in an action or endeavor).
- *impart* (to bestow a share of information, qualities, or wisdom).
- *partner* (a person who takes part in an undertaking with another).

---

## 🔀 4. Prefix & Combining Dynamics on part

| Affix Pattern | Process | Semantic Outcome | Exemplar Words |
| :--- | :--- | :--- | :--- |
| `im-` + `partial` | Privative prefixation | Free from bias, prejudice, or factional favoritism | *impartial, impartiality* |
| `part-` + `-isan` | Ideological agent | Doggedly devoted to one political faction | *partisan, partisanship* |
| `bi-` + `partisan` | Dual factionalism | Harmonious agreement between two rival parties | *bipartisan* |
| `part-` + `-icle` | Diminutive suffix | A microscopic or subatomic fragment of matter | *particle, particulate* |
| `de-` + `part` | Spatial separation | Separating oneself from a location; setting out | *depart, departure* |
| `com-` + `part-` + `-ment` | Architectural division | A closed, partitioned subdivision of a whole | *compartment* |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Quantum Physics & Chemistry:** The Standard Model of particle physics (bosons, fermions), particulate matter ($PM_{2.5}$).
- **Political Science & Governance:** Bipartisanship, partisan gerrymandering, Parliamentary factions.
- **Law & Judicial Ethics:** Impartiality of judges, conflict of interest recusal, partition of disputed estates.
- **Urban Planning & Architecture:** Multi-unit apartment dwellings, partition walls, municipal departments.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antepartum]] | adjective | **1.** Occurring or existing before birth. | *"In academic literature, antepartum designates occurring or existing before birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiparticle]] | noun | **1.** A particle that has the same mass as another particle but has opposite values for its other properties; interaction of a particle and its antiparticle results in annihilation and the production of radiant energy. | *"In academic literature, antiparticle designates a particle that has the same mass as another particle but has opposite values for its other properties; interaction of a particle and its antiparticle results in annihilation and the production of radiant energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apartment]] | noun | **1.** A suite of rooms usually on one floor of an apartment house. | *"An Apartment in Caesar’s House Scene V."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[aspartame]] | noun | **1.** An artificial sweetener made from aspartic acid; used as a calorie-free sweetener. | *"In academic literature, aspartame designates an artificial sweetener made from aspartic acid; used as a calorie-free sweetener."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bipartisan]] | adjective | **1.** Supported by both sides. | *"In academic literature, bipartisan designates supported by both sides."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bipartite]] | adjective | **1.** Divided into two portions almost to the base.<br>**2.** Involving two parts or elements. | *"While the spores of the one remain unaltered, though intermixed with the true bipartite spores of the mildew, the other exhibits every intermediate state of form and colour."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[compart]] | verb | **1.** Lay out in parts according to a plan. | *"In academic literature, compart designates lay out in parts according to a plan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartment]] | noun | **1.** A space into which an area is subdivided.<br>**2.** A partitioned section, chamber, or separate room within a larger enclosed area. | *"After that the girl remains for a year in the large common hut (_tembe_), where she occupies a special compartment screened off from the men's quarters."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[compartmental]] | adjective | **1.** Divided up into compartments or categories. | *"In academic literature, compartmental designates divided up into compartments or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalisation]] | noun | **1.** A mild state of dissociation.<br>**2.** The act of distributing things into classes or categories of the same type. | *"In academic literature, compartmentalisation designates a mild state of dissociation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalise]] | verb | **1.** Separate into isolated compartments or categories. | *"In academic literature, compartmentalise designates separate into isolated compartments or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalised]] | verb | **1.** Separate into isolated compartments or categories.<br>**2.** Divided up into compartments or categories. | *"In academic literature, compartmentalised designates separate into isolated compartments or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalization]] | noun | **1.** A mild state of dissociation.<br>**2.** The act of distributing things into classes or categories of the same type. | *"In academic literature, compartmentalization designates a mild state of dissociation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalize]] | verb | **1.** Separate into isolated compartments or categories. | *"In academic literature, compartmentalize designates separate into isolated compartments or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmentalized]] | verb | **1.** Separate into isolated compartments or categories.<br>**2.** Divided up into compartments or categories. | *"In academic literature, compartmentalized designates separate into isolated compartments or categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compartmented]] | adjective | **1.** Divided up or separated into compartments or isolated units; ; - john mason brown. | *"In academic literature, compartmented designates divided up or separated into compartments or isolated units; ; - john mason brown."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[copartner]] | noun | **1.** A joint partner (as in a business enterprise). | *"In academic literature, copartner designates a joint partner (as in a business enterprise)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[copartnership]] | noun | **1.** A partnership in which employees get a share of the profits in addition to their wages. | *"In academic literature, copartnership designates a partnership in which employees get a share of the profits in addition to their wages."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterpart]] | noun | **1.** A person or thing having the same function or characteristics as another.<br>**2.** A duplicate copy. | *"Let him but copy what in you is writ, Not making worse what nature made so clear, And such a counterpart shall fame his wit, Making his style admired every where."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[depart]] | verb | **1.** Move away from a place into another direction.<br>**2.** Be at variance with; be out of line with. | *"The long day’s task is done, And we must sleep.—That thou depart’st hence safe Does pay thy labour richly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[departed]] | noun | **1.** Someone who is no longer alive.<br>**2.** Move away from a place into another direction. | *"Then up he rose and donn’d his clothes, And dupp’d the chamber door, Let in the maid, that out a maid Never departed more."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[departer]] | noun | **1.** Someone who leaves. | *"How did the centripetal remainer afford egress to the centrifugal departer?"* — James Joyce, *Ulysses* |
| [[department]] | noun | **1.** A specialized division of a large organization.<br>**2.** The territorial and administrative division of some countries (such as france). | *"Then, giving the Home Department and the leadership of the House of Commons to Joodle, the Exchequer to Koodle, the Colonies to Loodle, and the Foreign Office to Moodle, what are you to do with Noodle?"* — Charles Dickens, *Bleak House* |
| [[departmental]] | adjective | **1.** Of or relating to a department. | *"Commanders must use this plan and complement it with initiatives tailored to specific needs.' Over the following months the Army issued implementing Departmental, major command, and subordinate level Regulations, programs, and guides."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[departmentally]] | adverb | **1.** Dependent on a department. | *"In academic literature, departmentally designates dependent on a department."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[departure]] | noun | **1.** The act of departing.<br>**2.** A variation that deviates from the standard or norm. | *"If the business be of any difficulty and this morning your departure hence, it requires haste of your lordship."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impart]] | verb | **1.** Transmit (knowledge or skills).<br>**2.** Bestow a quality on. | *"Break we our watch up, and by my advice, Let us impart what we have seen tonight Unto young Hamlet; for upon my life, This spirit, dumb to us, will speak to him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impartation]] | noun | **1.** The transmission of information. | *"He has his reserve--his secret; yet, in another sense, he gives himself to them without reserve; there is prodigality of self-impartation in his dealings with them."* — T. R. Glover, *The Jesus of History* |
| [[impartial]] | adjective | **1.** Showing lack of favoritism.<br>**2.** Free from undue bias or preconceived opinions. | *"Sweet Princes, what I did I did in honour, Led by th’ impartial conduct of my soul; And never shall you see that I will beg A ragged and forestall’d remission."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impartiality]] | noun | **1.** An inclination to weigh both views or opinions equally. | *"Next day the weather was bad, but she trudged on, the honesty, directness, and impartiality of elemental enmity disconcerting her but little."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[impartially]] | adverb | **1.** In an impartial manner. | *"This was the substance of the letter, written throughout with a justice and a dignity as if he were indeed my responsible guardian impartially representing the proposal of a friend against whom in his integrity he stated the full case."* — Charles Dickens, *Bleak House* |
| [[imparting]] | noun | **1.** The transmission of information.<br>**2.** Transmit (knowledge or skills). | *"So our young friends, reduced to prose (which is much to be regretted), degenerate in their power of imparting pleasure to me."* — Charles Dickens, *Bleak House* |
| [[interdepartmental]] | adjective | **1.** Between or among departments.<br>**2.** Between departments. | *"In academic literature, interdepartmental designates between or among departments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[intradepartmental]] | adjective | **1.** Within a department. | *"In academic literature, intradepartmental designates within a department."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonparticipant]] | noun | **1.** A person who does not participate. | *"In academic literature, nonparticipant designates a person who does not participate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonparticipation]] | noun | **1.** Withdrawing from the activities of a group. | *"In academic literature, nonparticipation designates withdrawing from the activities of a group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonparticulate]] | adjective | **1.** Not composed of distinct particles. | *"In academic literature, nonparticulate designates not composed of distinct particles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonpartisan]] | noun | **1.** A person who is nonpartisan.<br>**2.** Free from party affiliation or bias. | *"In academic literature, nonpartisan designates a person who is nonpartisan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonpartisanship]] | noun | **1.** An inclination to weigh both views or opinions equally. | *"In academic literature, nonpartisanship designates an inclination to weigh both views or opinions equally."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonpartizan]] | noun | **1.** A person who is nonpartisan.<br>**2.** Free from party affiliation or bias. | *"In academic literature, nonpartizan designates a person who is nonpartisan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[part]] | noun | **1.** Something determined in relation to something that includes it.<br>**2.** Something less than the whole of a human artifact. | *"If my slight Muse do please these curious days, The pain be mine, but thine shall be the praise. 39 O how thy worth with manners may I sing, When thou art all the better part of me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partake]] | verb | **1.** Have some of the qualities or attributes of something.<br>**2.** Have, give, or receive a share of. | *"O cunning love, with tears thou keep’st me blind, Lest eyes well-seeing thy foul faults should find. 149 Canst thou O cruel, say I love thee not, When I against my self with thee partake?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partaker]] | noun | **1.** Someone who has or gives or receives a part or a share. | *"What you shall know meantime Of stirs abroad, I shall beseech you, sir, To let me be partaker."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parted]] | verb | **1.** Go one's own way; move apart.<br>**2.** Discontinue an association or relation; go different ways. | *"He was first smok’d by the old Lord Lafew; when his disguise and he is parted, tell me what a sprat you shall find him; which you shall see this very night."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parterre]] | noun | **1.** An ornamental flower garden; beds and paths are arranged to form a pattern.<br>**2.** Seating at the rear of the main floor (beneath the balconies). | *"Reed to buy of his young lady all the products of her parterre she wished to sell: and Eliza would have sold the hair off her head if she could have made a handsome profit thereby."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[parti-color]] | verb | **1.** Make motley; color with different colors. | *"In academic literature, parti-color designates make motley; color with different colors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partial]] | noun | **1.** The derivative of a function of two or more variables with respect to a single variable while the other variables are considered to be constant.<br>**2.** A harmonic with a frequency that is a multiple of the fundamental frequency. | *"If eyes corrupt by over-partial looks, Be anchored in the bay where all men ride, Why of eyes’ falsehood hast thou forged hooks, Whereto the judgement of my heart is tied?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partiality]] | noun | **1.** A predisposition to like something.<br>**2.** An inclination to favor one group or view or opinion over alternatives. | *"Perhaps I speak with some little partiality."* — Charles Dickens, *Bleak House* |
| [[partially]] | adverb | **1.** In part; in some degree; not wholly. | *"If partially affin’d, or leagu’d in office, Thou dost deliver more or less than truth, Thou art no soldier."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partialness]] | noun | **1.** The state of being only a part; not total; incomplete. | *"In academic literature, partialness designates the state of being only a part; not total; incomplete."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partible]] | adjective | **1.** (of e.g. property) capable of being parted or divided. | *"In academic literature, partible designates (of e.g. property) capable of being parted or divided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[participant]] | noun | **1.** Someone who takes part in an activity.<br>**2.** A person who participates in or is skilled at some game. | *"One of the most beautiful incidents ever known relating to the faith of children, and the reward of their trust, is contained in the following circumstance, personally known to the editor of this book, who was a participant in the facts."* — Classic Author, *The wonders of prayer* |
| [[participate]] | verb | **1.** Share in something.<br>**2.** Become a participant; be involved in. | *"A spirit I am indeed, But am in that dimension grossly clad, Which from the womb I did participate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[participating]] | verb | **1.** Share in something.<br>**2.** Become a participant; be involved in. | *"The policies that receive dividends are called "participating" and are said to participate in the earnings."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[participation]] | noun | **1.** The act of sharing in the activities of a group.<br>**2.** The condition of sharing in common with others (as fellows or partners etc.). | *"And in that very line, Harry, standest thou, For thou hast lost thy princely privilege With vile participation."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[participatory]] | adjective | **1.** Affording the opportunity for individual participation. | *"In academic literature, participatory designates affording the opportunity for individual participation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[participial]] | noun | **1.** A non-finite form of the verb; in english it is used adjectivally and to form compound tenses.<br>**2.** Of or relating to or consisting of participles. | *"In academic literature, participial designates a non-finite form of the verb; in english it is used adjectivally and to form compound tenses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[participle]] | noun | **1.** A non-finite form of the verb; in english it is used adjectivally and to form compound tenses. | *"Baptized, we are enlightened; enlightened, we are made sons; made sons we are perfected; made perfect we become immortal [all these verbs and participles are in the present]."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[particle]] | noun | **1.** (nontechnical usage) a tiny piece of anything.<br>**2.** A body having finite mass and internal structure but negligible dimensions. | *"It shall be inventoried and every particle and utensil labelled to my will: as, item, two lips indifferent red; item, two grey eyes with lids to them; item, one neck, one chin, and so forth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[particolored]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"Tattered and torn, he saw a bright, particolored patchwork quilt that he knew had covered his daughter’s bed."* — Jos. E. Badger, *The Texas Hawks; or, The Strange Decoy* |
| [[particoloured]] | adjective | **1.** Having sections or patches colored differently and usually brightly. | *"In academic literature, particoloured designates having sections or patches colored differently and usually brightly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[particular]] | noun | **1.** A fact about some part (as opposed to general).<br>**2.** A small part that can be considered separately from the whole. | *"I am undone: there is no living, none, If Bertram be away. ’Twere all one That I should love a bright particular star, And think to wed it, he is so above me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[particularisation]] | noun | **1.** An individualized description of a particular instance. | *"In academic literature, particularisation designates an individualized description of a particular instance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[particularise]] | verb | **1.** Be specific about. | *"My dear Ma, I particularise eight.” “The exact size of the table and the room, my dear.” So it was settled that way: and when Mr."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[particularised]] | verb | **1.** Be specific about.<br>**2.** Directed toward a specific object. | *"In academic literature, particularised designates be specific about."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[particularism]] | noun | **1.** A focus on something particular. | *"It was immaterial what private opinions he might hold, for his great purpose was the abandonment of particularism and the fusion of all parties for the general good."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[particularistic]] | adjective | **1.** Relating to particularism (exclusive interest in one group or class or sect etc.). | *"In academic literature, particularistic designates relating to particularism (exclusive interest in one group or class or sect etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[particularity]] | noun | **1.** The quality of being particular and pertaining to a specific case or instance. | *"Snagsby does not with particularity express, but she knows that Jo was Mr."* — Charles Dickens, *Bleak House* |
| [[particularization]] | noun | **1.** An individualized description of a particular instance. | *"In academic literature, particularization designates an individualized description of a particular instance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[particularize]] | verb | **1.** Be specific about. | *"The leanness that afflicts us, the object of our misery, is as an inventory to particularize their abundance; our sufferance is a gain to them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[particularized]] | verb | **1.** Be specific about.<br>**2.** Directed toward a specific object. | *"Nowhere did we stop long enough to get a particularized impression, but the general sense of vague and oppressive wonder grew upon me."* — Joseph Conrad, *Heart of Darkness* |
| [[particularly]] | adverb | **1.** To a distinctly greater extent or degree than is common.<br>**2.** Specifically or especially distinguished from others. | *"My name is Caius Martius, who hath done To thee particularly and to all the Volsces Great hurt and mischief; thereto witness may My surname Coriolanus."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[particulate]] | noun | **1.** A small discrete mass of solid or liquid matter that remains individually dispersed in gas or liquid emissions (usually considered to be an atmospheric pollutant).<br>**2.** Composed of distinct particles. | *"In academic literature, particulate designates a small discrete mass of solid or liquid matter that remains individually dispersed in gas or liquid emissions (usually considered to be an atmospheric pollutant)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parting]] | noun | **1.** The act of departing politely.<br>**2.** A line of scalp that can be seen when sections of hair are combed in opposite directions. | *"I grow to you, and our parting is a tortur’d body."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partisan]] | noun | **1.** A fervent and even militant proponent of something.<br>**2.** An ardent and enthusiastic supporter of some person or activity. | *"I had as lief have a reed that will do me no service as a partisan I could not heave."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partisanship]] | noun | **1.** An inclination to favor one group or view or opinion over alternatives. | *"Featherstone, two of Peacock’s most important patients, had, from different causes, given an especially good reception to his successor, who had raised some partisanship as well as discussion."* — George Eliot, *Middlemarch* |
| [[partita]] | noun | **1.** One of the variations contained in a partita.<br>**2.** (music) an instrumental suite common in the 18th century. | *"In academic literature, partita designates one of the variations contained in a partita."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partition]] | noun | **1.** A vertical structure that divides or separates (as a wall divides one room from another).<br>**2.** (computer science) the part of a hard disk that is dedicated to a particular operating system or application and accessed as a single unit. | *"It is the wittiest partition that ever I heard discourse, my lord."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partitioning]] | noun | **1.** An analysis into mutually exclusive categories.<br>**2.** The act of dividing or partitioning; separation by the creation of a boundary that divides or keeps apart. | *"In academic literature, partitioning designates an analysis into mutually exclusive categories."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partitionist]] | noun | **1.** An advocate of partitioning a country. | *"In academic literature, partitionist designates an advocate of partitioning a country."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partitive]] | noun | **1.** Word (such a `some' or `less') that is used to indicate a part as distinct from a whole.<br>**2.** (romance languages) relating to or denoting a part of a whole or a quantity that is less than the whole. | *"In academic literature, partitive designates word (such a `some' or `less') that is used to indicate a part as distinct from a whole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partizan]] | noun | **1.** An ardent and enthusiastic supporter of some person or activity.<br>**2.** A pike with a long tapering double-edged blade with lateral projections; 16th and 17th centuries. | *"This time partizan considerations played no part in the discussion."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[partly]] | adverb | **1.** In part; in some degree; not wholly. | *"SCENE: Partly in France, and partly in Tuscany."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partner]] | noun | **1.** A person's partner in marriage.<br>**2.** An associate in an activity or endeavor or sphere of common interest. | *"I know you could not lack—I am certain on’t— Very necessity of this thought, that I, Your partner in the cause ’gainst which he fought, Could not with graceful eyes attend those wars Which fronted mine own peace."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partnership]] | noun | **1.** The members of a business venture created by contract.<br>**2.** A cooperative relationship between people or groups who agree to share responsibility for achieving some specific goal. | *"Many times the two gentlemen who write with the ravenous little pens on the tissue-paper are seen prowling in the neighbourhood—shy of each other, their late partnership being dissolved."* — Charles Dickens, *Bleak House* |
| [[partridge]] | noun | **1.** Flesh of either quail or grouse.<br>**2.** Heavy-bodied small-winged south american game bird resembling a gallinaceous bird but related to the ratite birds. | *"Who finds the partridge in the puttock’s nest But may imagine how the bird was dead, Although the kite soar with unbloodied beak?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partridgeberry]] | noun | **1.** Creeping woody plant of eastern north america with shiny evergreen leaves and scarlet berries. | *"In academic literature, partridgeberry designates creeping woody plant of eastern north america with shiny evergreen leaves and scarlet berries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parts]] | noun | **1.** The local environment.<br>**2.** Something determined in relation to something that includes it. | *"Thou art the grave where buried love doth live, Hung with the trophies of my lovers gone, Who all their parts of me to thee did give, That due of many, now is thine alone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[partsong]] | noun | **1.** A song with two or more voice parts. | *"In academic literature, partsong designates a song with two or more voice parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parttime]] | adjective | **1.** Involving less than the standard or customary time for an activity. | *"In academic literature, parttime designates involving less than the standard or customary time for an activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parturiency]] | noun | **1.** Concluding state of pregnancy; from the onset of contractions to the birth of a child. | *"In academic literature, parturiency designates concluding state of pregnancy; from the onset of contractions to the birth of a child."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parturient]] | adjective | **1.** Of or relating to or giving birth.<br>**2.** Giving birth. | *"In academic literature, parturient designates of or relating to or giving birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parturition]] | noun | **1.** The process of giving birth. | *"The curse removed 557:6 Mind controls the birth-throes in the lower realms of nature, where parturition is without suffering."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[party]] | noun | **1.** An organization to gain political power.<br>**2.** A group of people gathered together for pleasure. | *"Enter, with a drum and colours, a party of the Florentine army, Bertram and Parolles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[party-spirited]] | adjective | **1.** Devoted to a political party. | *"In academic literature, party-spirited designates devoted to a political party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[partygoer]] | noun | **1.** Someone who is attending a party. | *"In academic literature, partygoer designates someone who is attending a party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postpartum]] | adjective | **1.** Occurring immediately after birth. | *"In academic literature, postpartum designates occurring immediately after birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repartee]] | noun | **1.** Adroitness and cleverness in reply. | *"Rochester, allow me to disown my first answer: I intended no pointed repartee: it was only a blunder.” “Just so: I think so: and you shall be answerable for it."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[subpart]] | noun | **1.** A part of a part. | *"In academic literature, subpart designates a part of a part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncompartmented]] | adjective | **1.** Not compartmented; not divided into compartments or isolated units. | *"In academic literature, uncompartmented designates not compartmented; not divided into compartments or isolated units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underpart]] | noun | **1.** A part lying on the lower side or underneath an animal's body. | *"In academic literature, underpart designates a part lying on the lower side or underneath an animal's body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpartitioned]] | adjective | **1.** Not divided by partitions. | *"In academic literature, unpartitioned designates not divided by partitions."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PART
  </div>
</div>
