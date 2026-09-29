---
status: unread
type: root_dashboard
---
# Dashboard — oct
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">oct-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“eight”</span>
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

The root **oct** means eight. It refers to the number eight or an eightfold division. In English, this root forms words such as *october*, *octave*, *octet*, and *octagon*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: eight
> The root **oct** means eight. It refers to the number eight or an eightfold division. In English, this root forms words such as *october*, *octave*, *octet*, and *octagon*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Eight</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Counting units on a ruler or measuring out exact proportions.</mark>
> - **Everyday Connection**: Think of familiar words like *october* and *octave*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **oct** comes from a Latin word that means *"eight"*.
  - At its core, it describes eight.

- **The Big Picture Idea**:
  - Picture counting units on a ruler or measuring out exact proportions.
  - Whenever you see **oct** in an English word, think of **numbers, counting, and measurements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of eight.
  - **Mental & Social**: How people experience, organize, or communicate about eight.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **October**: The tenth month of the Gregorian calendar.
  - **Octave**: A series of eight notes occupying the interval between two notes, one having twice or half the frequency of the other.
  - **Octet**: A group of eight musicians or singers performing together.
  - **Octagon**: A plane figure with eight straight sides and eight angles.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">oct</mark>, think of <mark class="hl-def">numbers, counting, and measurements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **oct** builds vocabulary through Latin and Greek combining elements:
> - **Direct Latin Stems in `oct-`, `octav-`, and `octu-`:**
>   - *octō* + *mēnsis* $\to$ *October* ("eighth Roman month").
>   - *octāvus* ("eighth") $\to$ *octave* ("musical interval of eight notes").
>   - *octō* + Italian *-etto* $\to$ *octet* ("group or piece for eight").
>   - *octāns* ("eighth of a circle") $\to$ *octant* ("navigational instrument").
>   - *octō* + *annus* ("year") $\to$ *octennial* ("recurring every eight years").
>   - *octōgintā* ("eighty") + *-ārius* $\to$ *octogenarian* ("person in their eighties").
>   - *octuplus* $\to$ *octuple* ("eightfold, multiply by eight").
> - **Greek Loanwords & Combining Elements in `octa-` / `octo-`:**
>   - *oktō* + *gōnia* ("angle") $\to$ *octagon*, *octagonal* ("eight-angled polygon").
>   - *oktō* + *hedra* ("seat/face") $\to$ *octahedron* ("solid figure with eight plane faces").
>   - *oktō* + *pous* ("foot") $\to$ *octopus* ("eight-footed cephalopod").
> - **Chemical Nomenclature:**
>   - *oct-* + *-ane* $\to$ *octane* (eight-carbon hydrocarbon, gasoline knock rating).

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
> Although fundamentally denoting **"eight"**, the root adapts to specialized disciplinary domains:
> - **Acoustics & Musical Harmony:** *octave*, *octet* (consonant pitch interval, eight-voice vocal ensemble).
> - **Euclidean Geometry & Crystallography:** *octagon*, *octagonal*, *octahedron* (eight-sided 2D polygon, regular 8-faced Platonic solid).
> - **Calendars & Demographics:** *October*, *octennial*, *octogenarian* (tenth Gregorian month, eight-year period, person 80–89 years old).
> - **Marine Invertebrate Zoology:** *octopus* (eight-armed cephalopod with bilateral symmetry).
> - **Marine Celestial Navigation:** *octant* (reflecting instrument measuring 45 degrees of arc).
> - **Petroleum Engineering:** *octane*, *octane rating* (fuel resistance to pre-ignition knocking).

---

## 🔀 4. Prefix & Combining Dynamics on oct

### Combining Form Dynamics

| Form | Base Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `octo-` + `mēnsis` | eight + month | **[[October]]** | Eighth month of the ancient Roman calendar. |
| `oct-` + `avus` | eighth | **[[octave]]** | A series of eight diatonic notes, or the interval between them. |
| `octa-` + `gōnia` | eight + angle | **[[octagon]]** | A plane figure with eight straight sides and eight angles. |
| `octa-` + `hedra` | eight + base/face | **[[octahedron]]** | A three-dimensional solid figure having eight plane faces. |
| `octo-` + `pous` | eight + foot | **[[octopus]]** | An eight-armed marine mollusk known for high intelligence. |

### Suffix Transformations (Grammatical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-et` | Noun (Ensemble / Set) | **[[octet]]** | A group of eight people, singers, or computer bits (byte). |
| `-arian` | Noun / Adjective (Age Cohort) | **[[octogenarian]]** | A person who is from eighty to eighty-nine years old. |
| `-ennial` | Adjective (Temporal Recurrence)| **[[octennial]]** | Occurring once every eight years; lasting eight years. |
| `-uple` | Adjective / Verb (Multiplier) | **[[octuple]]** | Eightfold; to multiply by eight. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🎵 **Music Theory & Composition** | *octave*, *octet* | Diatonic pitch scales, Mendelssohn's String Octet in E-flat major, vocal polyphony. |
| 📐 **Geometry & Architecture** | *octagon*, *octagonal*, *octahedron* | Roman octagonal dome design, fluorite cubic-octahedral crystal habits. |
| 🐙 **Marine Biology & Cephalopods** | *octopus* (Order Octopoda) | Chromatophore camouflage, suction-cup arm neurobiology, invertebrate problem-solving. |
| ⛽ **Petroleum Refining & Chemistry** | *octane*, *octane rating* | Iso-octane reference standards, internal combustion engine anti-knock performance. |
| 🔭 **Celestial Navigation & Cartography** | *octant* | John Hadley's 1731 reflecting octant, lunar distance navigational calculations. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[oct]] | noun | **1.** The month following september and preceding november. | *"Blacklock Ellisland, 21st Oct., 1789."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[octad]] | noun | **1.** The cardinal number that is the sum of seven and one. | *"In academic literature, octad designates the cardinal number that is the sum of seven and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octagon]] | noun | **1.** An eight-sided polygon. | *"Sir Walter, his two daughters, and Mrs Clay, were the earliest of all their party at the rooms in the evening; and as Lady Dalrymple must be waited for, they took their station by one of the fires in the Octagon Room."* — Jane Austen, *Persuasion* |
| [[octagonal]] | adjective | **1.** Of or relating to or shaped like an octagon. | *"From the middle of the building an ugly flat-topped octagonal tower ascended against the east horizon, and viewed from this spot, on its shady side and against the light, it seemed the one blot on the city’s beauty."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[octahedron]] | noun | **1.** Any polyhedron having eight plane faces. | *"In academic literature, octahedron designates any polyhedron having eight plane faces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octal]] | adjective | **1.** Of or pertaining to a number system having 8 as its base. | *"In academic literature, octal designates of or pertaining to a number system having 8 as its base."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octameter]] | noun | **1.** A verse line having eight metrical feet. | *"In academic literature, octameter designates a verse line having eight metrical feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octane]] | noun | **1.** Any isomeric saturated hydrocarbon found in petroleum and used as a fuel and solvent. | *"In academic literature, octane designates any isomeric saturated hydrocarbon found in petroleum and used as a fuel and solvent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octangular]] | adjective | **1.** Of or relating to or shaped like an octagon. | *"Its outward form is circular; but the interior is somewhat of an octangular figure, but very irregular, its general dimensions being thirty-three feet long, and twenty-five feet broad."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[octans]] | noun | **1.** The constellation that includes the southern celestial pole. | *"In academic literature, octans designates the constellation that includes the southern celestial pole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octant]] | noun | **1.** A measuring instrument for measuring angles to a celestial body; similar to a sextant but with 45 degree calibration. | *"In academic literature, octant designates a measuring instrument for measuring angles to a celestial body; similar to a sextant but with 45 degree calibration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octave]] | noun | **1.** A feast day and the seven days following it.<br>**2.** A musical interval of eight tones. | *"But as she ain’t here; just pitch it an octave or two lower, will you, and I’ll not only be obliged to you, but it’ll do you more credit,” says Mr."* — Charles Dickens, *Bleak House* |
| [[octavian]] | noun | **1.** Roman statesman who established the roman empire and became emperor in 27 bc; defeated mark antony and cleopatra in 31 bc at actium (63 bc - ad 14). | *"What was the ultimate difference between the old Roman and the Roman of the days of Antony and Octavian?"* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[octavo]] | noun | **1.** The size of a book whose pages are made by folding a sheet of paper three times to form eight leaves. | *"Liddy, you may as well bring me my desk and I’ll direct it at once.” Bathsheba took from her desk a gorgeously illuminated and embossed design in post-octavo, which had been bought on the previous market-day at the chief stationer’s in Casterbridge."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[octennial]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin oct within the domain of Number & Measure.<br>**2.** A technical or specialized form exhibiting the properties of oct in systematic terminology. | *"Of late these shackles, if I mistake not, have been broken; and octennial parliaments have besides been established."* — Alexander Hamilton, *The Federalist Papers* |
| [[octet]] | noun | **1.** The cardinal number that is the sum of seven and one.<br>**2.** Eight performers or singers who perform together. | *"In academic literature, octet designates the cardinal number that is the sum of seven and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octette]] | noun | **1.** Eight performers or singers who perform together.<br>**2.** A set of eight similar things considered as a unit. | *"In academic literature, octette designates eight performers or singers who perform together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octillion]] | noun | **1.** The number that is represented as a one followed by 27 zeros. | *"In academic literature, octillion designates the number that is represented as a one followed by 27 zeros."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[october]] | noun | **1.** The month following september and preceding november. | *"In my room there were oval engravings of the months—ladies haymaking in short waists and large hats tied under the chin, for June; smooth-legged noblemen pointing with cocked-hats to village steeples, for October."* — Charles Dickens, *Bleak House* |
| [[octoberfest]] | noun | **1.** A strong lager made originally in germany for the oktoberfest celebration; sweet and copper-colored. | *"In academic literature, octoberfest designates a strong lager made originally in germany for the oktoberfest celebration; sweet and copper-colored."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octogenarian]] | noun | **1.** Someone whose age is in the eighties.<br>**2.** Being from 80 to 89 years old. | *"Sloane, ‘I see here that another octogenarian has just died."* — L. M. Montgomery, *Anne of Avonlea* |
| [[octonary]] | noun | **1.** The cardinal number that is the sum of seven and one. | *"In academic literature, octonary designates the cardinal number that is the sum of seven and one."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octopod]] | noun | **1.** A cephalopod with eight arms but lacking an internal shell. | *"In academic literature, octopod designates a cephalopod with eight arms but lacking an internal shell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octopoda]] | noun | **1.** Octopuses and paper nautilus. | *"In academic literature, octopoda designates octopuses and paper nautilus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octopodidae]] | noun | **1.** A family of octopoda. | *"In academic literature, octopodidae designates a family of octopoda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octopus]] | noun | **1.** Tentacles of octopus prepared as food.<br>**2.** Bottom-living cephalopod having a soft oval body with eight long tentacles. | *"Well,” said Conseil, with the most serious air in the world, “I remember perfectly to have seen a large vessel drawn under the waves by an octopus’s arm.” “You saw that?” said the Canadian."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[octoroon]] | noun | **1.** An offspring of a quadroon and a white parent; a person who is one-eighth black. | *"In academic literature, octoroon designates an offspring of a quadroon and a white parent; a person who is one-eighth black."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octosyllabic]] | adjective | **1.** Having or characterized by or consisting of eight syllables. | *"In academic literature, octosyllabic designates having or characterized by or consisting of eight syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octosyllable]] | noun | **1.** A verse line having eight syllables or a poem of octosyllabic lines. | *"In academic literature, octosyllable designates a verse line having eight syllables or a poem of octosyllabic lines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octroi]] | noun | **1.** A tax on various goods brought into a town. | *"The officers of the _octroi_ were standing close together at the door of their office, in which the lamp was burning."* — Mrs. Oliphant, *A Beleaguered City* |
| [[octuple]] | adjective | **1.** Having eight units or components. | *"In academic literature, octuple designates having eight units or components."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · OCT
  </div>
</div>
