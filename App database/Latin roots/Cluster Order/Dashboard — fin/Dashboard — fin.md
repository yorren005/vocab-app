---
status: unread
type: root_dashboard
---
# Dashboard — fin
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">fin-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“end or boundary”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Arranging books neatly in a row on a shelf according to their category.</span>
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

The root **fin** means end or boundary. It refers to a boundary line, limit, end point, or conclusion. In English, this root forms words such as *finish*, *final*, *finite*, and *infinite*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: end or boundary
> The root **fin** means end or boundary. It refers to a boundary line, limit, end point, or conclusion. In English, this root forms words such as *finish*, *final*, *finite*, and *infinite*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">End or boundary</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Arranging books neatly in a row on a shelf according to their category.</mark>
> - **Everyday Connection**: Think of familiar words like *finish* and *final*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **fin** comes from a Latin word that means *"end or boundary"*.
  - At its core, it describes end or boundary.

- **The Big Picture Idea**:
  - Picture arranging books neatly in a row on a shelf according to their category.
  - Whenever you see **fin** in an English word, think of **order, sequence, and arrangement**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of end or boundary.
  - **Mental & Social**: How people experience, organize, or communicate about end or boundary.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Finish**: To bring an activity or task to an end.
  - **Final**: Coming at the end of a series.
  - **Finite**: Having limits or bounds.
  - **Infinite**: Limitless or endless in space, extent, or size.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">fin</mark>, think of <mark class="hl-def">order, sequence, and arrangement</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **fin** generates vocabulary through diverse prefixation and suffixation:
> - **Nominal Base & Adjectives:**
>   - *fīnis* $	o$ *final* ("ultimate, conclusive"), *finite* ("having limits"), *fine* ("delicate, pure; monetary penalty").
> - **Prefix Derivations:**
>   - *ad-* ("to, near") + *fīnis* $	o$ *affīnis* ("bordering on; related by marriage") $	o$ *affinity* ("natural liking, kinship").
>   - *con-* ("together") + *fīnis* $	o$ *confīnis* ("having a common boundary") $	o$ *confine*, *confinement* ("to enclose within borders").
>   - *dē-* ("completely, from") + *fīnīre* $	o$ *dēfīnīre* ("to mark off, state boundaries") $	o$ *define*, *definite*, *definition*, *definitive*.
>   - *in-* ("not, un-") + *fīnītus* $	o$ *infīnītus* ("boundless") $	o$ *infinite*, *infinity*, *infinitesimal*.
>   - *re-* ("again, thoroughly") + *fine* $	o$ *refine*, *refined*, *refinement*, *refinery*.
> - **Verbal Frequentatives & Nominal Terminations:**
>   - *fīnīre* $	o$ Old French *fenir / finir* $	o$ *finish*, *finisher*.
>   - Italian *finale* $	o$ *finale* ("concluding musical movement").

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
> - **Logic, Lexicography & Semantics:** *define*, *definition*, *definite*, *definitive* (setting exact conceptual parameters).
> - **Mathematics & Physics:** *finite*, *infinite*, *infinity*, *infinitesimal* (cardinal limits, boundless sets, calculus differentials).
> - **Temporal & Sequential Cessation:** *final*, *finale*, *finalist*, *finality*, *finish* (the last step, climax of a drama, conclusion).
> - **Spatial Incarceration & Geography:** *confine*, *confinement*, *affinity* (enclosing within boundaries, bordering territories).
> - **Metallurgy, Aesthetics & Nuance:** *fine*, *refine*, *refinement*, *finesse* (smelting precious metals, culinary elegance, delicate diplomacy).
> - **Commerce, Law & Public Revenue:** *finance*, *financial*, *fine* (monetary penalties, capital allocation, banking structures).

---

## 🔀 4. Prefix & Combining Dynamics on fin

### Prefix Dynamics Table

| Prefix | Base Meaning | Combined Derivative | Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ad-` (to, toward) | `fīnis` | **[[affinity]]** | Bordering on another territory $	o$ natural sympathy, kinship, or chemical binding. |
| `con-` (together, with) | `fīnis` | **[[confine]]** / **confinement** | Restricting within shared borders $	o$ imprisonment, limitation. |
| `dē-` (completely down) | `fīnīre` | **[[define]]** / **definition** | Marking out borders completely $	o$ explaining exact conceptual meaning. |
| `in-` (privative not) | `fīnītus` | **[[infinite]]** / **infinity** | Having no boundary or end $	o$ boundless, limitless in extent or quantity. |
| `re-` (again, intensely) | `fine` | **[[refine]]** / **refinement** | Purifying repeatedly until free of all dross and crude imperfections. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 📐 **Mathematics & Theoretical Physics** | *finite*, *infinite*, *infinitesimal*, *infinity* | Real analysis, limits approaching infinity ($\lim_{x 	o \infty}$), calculus infinitesimals. |
| 📖 **Lexicography, Logic & Linguistics** | *define*, *definition*, *definitive* | Establishing lexical boundaries in dictionaries, framing valid syllogisms. |
| 💰 **Banking, Macroeconomics & Law** | *finance*, *financial*, *fine* | Capital structures, sovereign debt issuance, punitive judicial fines for violations. |
| 🎭 **Music, Theater & Narrative Literature** | *finale*, *finality*, *finish* | Operatic finales, symphonic concluding allegros, resolving tragic narrative arcs. |
| 🧪 **Chemical Engineering & Metallurgy** | *refine*, *refinery*, *finesse* | Petroleum cracking in refineries, electrolytic gold refinement, delicate diplomatic maneuvers. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[affinal]] | adjective | **1.** (anthropology) related by marriage. | *"In academic literature, affinal designates (anthropology) related by marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affine]] | noun | **1.** (anthropology) kin by marriage.<br>**2.** (mathematics) of or pertaining to the geometry of affine transformations. | *"In academic literature, affine designates (anthropology) kin by marriage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affined]] | adjective | **1.** Closely related; - wallace stevens. | *"In academic literature, affined designates closely related; - wallace stevens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[affinity]] | noun | **1.** (immunology) the attraction between an antigen and an antibody.<br>**2.** (anthropology) kinship by marriage or adoption; not a blood relationship. | *"In religious matters Berwick has more affinity to Scotland than to England."* — John Cairns, *Principal Cairns* |
| [[confine]] | verb | **1.** Place limits on (extent or access).<br>**2.** Restrict or confine,. | *"So the poor third is up, till death enlarge his confine."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confined]] | verb | **1.** Place limits on (extent or access).<br>**2.** Restrict or confine,. | *"Kind is my love to-day, to-morrow kind, Still constant in a wondrous excellence, Therefore my verse to constancy confined, One thing expressing, leaves out difference."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confinement]] | noun | **1.** Concluding state of pregnancy; from the onset of contractions to the birth of a child.<br>**2.** The act of restraining of a person's liberty by confining them. | *"It was in vain that we all three talked to him and endeavoured to persuade him; he listened with that gentleness which went so well with his bluff bearing, but was evidently no more shaken by our representations that his place of confinement was."* — Charles Dickens, *Bleak House* |
| [[confines]] | noun | **1.** A bounded scope.<br>**2.** Place limits on (extent or access). | *"And yet it irks me the poor dappled fools, Being native burghers of this desert city, Should in their own confines with forked heads Have their round haunches gored."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[confining]] | verb | **1.** Place limits on (extent or access).<br>**2.** Restrict or confine,. | *"Thus far, with rough and all-unable pen, Our bending author hath pursu’d the story, In little room confining mighty men, Mangling by starts the full course of their glory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[definable]] | adjective | **1.** Capable of being defined, limited, or explained. | *"With a feeling of terror not very definable, she fixed her eyes on the staircase, and in a few moments it gave Henry to her view."* — Jane Austen, *Northanger Abbey* |
| [[define]] | verb | **1.** Determine the essential quality of.<br>**2.** Give a definition for the meaning of a word. | *"Methinks no face so gracious is as mine, No shape so true, no truth of such account, And for my self mine own worth do define, As I all other in all worths surmount."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[defined]] | verb | **1.** Determine the essential quality of.<br>**2.** Give a definition for the meaning of a word. | *"It must contain, as far as the mind is concerned, no substantives which could be put into an adjectival form; in other words, the object defined must not be explained through abstractions."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |
| [[defining]] | noun | **1.** Any process serving to define the shape of something.<br>**2.** Determine the essential quality of. | *"For the sake of certainty and uniformity, therefore, the power of defining felonies in this case was in every respect necessary and proper."* — Alexander Hamilton, *The Federalist Papers* |
| [[definite]] | adjective | **1.** Precise; explicit and clearly defined.<br>**2.** Known for certain. | *"It was not like what I had expected, but I had expected nothing definite, and I dare say anything definite would have surprised me."* — Charles Dickens, *Bleak House* |
| [[definitely]] | adverb | **1.** Without question and beyond doubt. | *"Trius had been definitely ordered to change his usual mode of behaviour."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[definiteness]] | noun | **1.** The quality of being predictable with great confidence. | *"Such impressions as these moved her vaguely, and without strict definiteness."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[definition]] | noun | **1.** A concise explanation of the meaning of a word or phrase or symbol.<br>**2.** Clarity of outline. | *"When the definition of the thing has been given, there must be no room for doubt as to whether the thing exists or not."* — Benedictus de Spinoza, *On the Improvement of the Understanding* |
| [[definitive]] | adjective | **1.** Clearly defined or formulated; - r.b.taney.<br>**2.** Of recognized authority or excellence. | *"Never crave him; we are definitive."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fin]] | noun | **1.** The cardinal number that is the sum of four and one.<br>**2.** One of a pair of decorations projecting above the rear fenders of an automobile. | *"Ay, when fowls have no feathers and fish have no fin."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[finable]] | adjective | **1.** Liable to a fine. | *"In academic literature, finable designates liable to a fine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finagle]] | verb | **1.** Achieve something by means of trickery or devious methods. | *"In academic literature, finagle designates achieve something by means of trickery or devious methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finagler]] | noun | **1.** A deceiver who uses crafty misleading methods. | *"In academic literature, finagler designates a deceiver who uses crafty misleading methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[final]] | noun | **1.** The final match between the winners of all previous matches in an elimination tournament.<br>**2.** An examination administered at the end of an academic term. | *"Jarndyce and had expired, and he still continued to assure Ada and me in the same final manner that it was “all right,” it became advisable to take Mr."* — Charles Dickens, *Bleak House* |
| [[finale]] | noun | **1.** The closing section of a musical composition.<br>**2.** The temporal end; the concluding time. | *"Finale: already Bathsheba’s husband."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[finalisation]] | noun | **1.** The act of finalizing. | *"In academic literature, finalisation designates the act of finalizing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finalise]] | verb | **1.** Make final; put the last touches on; put into final form. | *"In academic literature, finalise designates make final; put the last touches on; put into final form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finalist]] | noun | **1.** A contestant who reaches the final stages of a competition. | *"In academic literature, finalist designates a contestant who reaches the final stages of a competition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finality]] | noun | **1.** The quality of being final or definitely settled. | *"I am the new shepherd—just arrived.” “Only a shepherd—and you seem almost a farmer by your ways.” “Only a shepherd,” Gabriel repeated, in a dull cadence of finality."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[finalization]] | noun | **1.** The act of finalizing. | *"In academic literature, finalization designates the act of finalizing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finalize]] | verb | **1.** Make final; put the last touches on; put into final form. | *"In academic literature, finalize designates make final; put the last touches on; put into final form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finally]] | adverb | **1.** After an unspecified period of time or an especially long delay.<br>**2.** As the end result of a succession or process. | *"Now let us understand; there is three umpires in this matter, as I understand: that is, Master Page, _fidelicet_ Master Page; and there is myself, _fidelicet_ myself; and the three party is, lastly and finally, mine host of the Garter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[finance]] | noun | **1.** The commercial activity of providing funds and capital.<br>**2.** The branch of economics that studies the management of money and other assets. | *"Banks are the labor-saving machinery of finance."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[finances]] | noun | **1.** Assets in the form of money.<br>**2.** The commercial activity of providing funds and capital. | *"The primary fact determining the public finances is the extent of the sphere of "the state," meaning by the state the totality of political powers and functions in a community."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[financial]] | adjective | **1.** Involving financial matters. | *"She received, in reply, the following little financial statement: "My Dear Friend:--Remember the five loaves and two fishes, and listen to the message of your two dollars."* — Classic Author, *The wonders of prayer* |
| [[financially]] | adverb | **1.** From a financial point of view. | *"One answer, that of those financially interested in the railroads, was No."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[financier]] | noun | **1.** A person skilled in large scale financial transactions.<br>**2.** Conduct financial operations, often in an unethical manner. | *"It amused him still more to stand up and shake hands when the immense body and Hebraic nose of an international financier went by with two great ladies and a cabinet minister in tow."* — Anthony Pryde, *Nightfall* |
| [[financing]] | noun | **1.** The act of financing.<br>**2.** Obtain or provide money for. | *"In academic literature, financing designates the act of financing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fincen]] | noun | **1.** A law enforcement agency of the treasury department responsible for establishing and implementing policies to detect money laundering. | *"In academic literature, fincen designates a law enforcement agency of the treasury department responsible for establishing and implementing policies to detect money laundering."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finch]] | noun | **1.** Any of numerous small songbirds with short stout bills adapted for crushing seeds. | *"BOTTOM. [_Sings._] The finch, the sparrow, and the lark, The plain-song cuckoo gray, Whose note full many a man doth mark, And dares not answer nay. for, indeed, who would set his wit to so foolish a bird?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fine]] | noun | **1.** Money extracted as a penalty.<br>**2.** Issue a ticket or a fine to as a penalty. | *"The count he woos your daughter Lays down his wanton siege before her beauty, Resolv’d to carry her; let her in fine consent, As we’ll direct her how ’tis best to bear it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fine-grained]] | adjective | **1.** Consisting of fine particles.<br>**2.** Dense or compact in structure or texture, as a wood composed of small-diameter cells. | *"In academic literature, fine-grained designates consisting of fine particles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fine-leafed]] | adjective | **1.** Having fine leaves. | *"In academic literature, fine-leafed designates having fine leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fine-leaved]] | adjective | **1.** Having fine leaves. | *"In academic literature, fine-leaved designates having fine leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fine-looking]] | adjective | **1.** Pleasing in appearance especially by reason of conformity to ideals of form and proportion; ; ; ; - thackeray; - lillian hellman. | *"In academic literature, fine-looking designates pleasing in appearance especially by reason of conformity to ideals of form and proportion; ; ; ; - thackeray; - lillian hellman."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fine-textured]] | adjective | **1.** Having a smooth, fine-grained structure. | *"In academic literature, fine-textured designates having a smooth, fine-grained structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fine-tooth]] | adjective | **1.** Having fine teeth set close together. | *"In academic literature, fine-tooth designates having fine teeth set close together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fine-toothed]] | adjective | **1.** Having fine teeth set close together. | *"In academic literature, fine-toothed designates having fine teeth set close together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fine-tune]] | verb | **1.** Improve or perfect by pruning or polishing.<br>**2.** Adjust finely. | *"In academic literature, fine-tune designates improve or perfect by pruning or polishing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[fineable]] | adjective | **1.** Liable to a fine. | *"In academic literature, fineable designates liable to a fine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finedraw]] | verb | **1.** Sew together very finely. | *"In academic literature, finedraw designates sew together very finely."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finely]] | adverb | **1.** In tiny pieces.<br>**2.** In an elegant manner. | *"Such and so finely bolted didst thou seem."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[fineness]] | noun | **1.** The quality of being very good indeed.<br>**2.** The property of being very narrow or thin. | *"Saving your merry humour, here’s the note How much your chain weighs to the utmost carat, The fineness of the gold, and chargeful fashion, Which doth amount to three odd ducats more Than I stand debted to this gentleman."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[finer]] | adjective | **1.** (comparative of `fine') greater in quality or excellence.<br>**2.** Being satisfactory or in satisfactory condition. | *"Your accent is something finer than you could purchase in so removed a dwelling."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[finery]] | noun | **1.** Elaborate or showy attire and accessories. | *"She is only nursing Mrs Wallis of Marlborough Buildings; a mere pretty, silly, expensive, fashionable woman, I believe; and of course will have nothing to report but of lace and finery."* — Jane Austen, *Persuasion* |
| [[finespun]] | adjective | **1.** Developed with extreme delicacy and subtlety.<br>**2.** Developed in excessively fine detail. | *"Her wellturned ankle displayed its perfect proportions beneath her skirt and just the proper amount and no more of her shapely limbs encased in finespun hose with highspliced heels and wide garter tops."* — James Joyce, *Ulysses* |
| [[finesse]] | noun | **1.** Subtly skillful handling of a situation. | *"Poor Boldwood had no more skill in finesse than a battering-ram, and he was uneasy with a sense of having made himself to appear stupid and, what was worse, mean."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[finial]] | noun | **1.** An ornament at the top of a spire or gable; usually a foliated fleur-de-lis. | *"Fluted pilasters, worked from the solid stone, decorated its front, and above the roof the chimneys were panelled or columnar, some coped gables with finials and like features still retaining traces of their Gothic extraction."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[finical]] | adjective | **1.** Exacting especially about details. | *"No Virgin by him the somewhat petty, Of finical touch and tempera crumbly-- Could not Alesso Baldovinetti Contribute so much, I ask him humbly? -- St. 27."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[finicky]] | adjective | **1.** Exacting especially about details. | *"In academic literature, finicky designates exacting especially about details."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finis]] | noun | **1.** The temporal end; the concluding time.<br>**2.** The concluding part of any performance. | *"A-D _add_] Finis Actus primi. l. 33. 2nd Folio _misprints_] Seundus. p. 12, l. 1."* — John Fletcher, *The Elder Brother* |
| [[finish]] | noun | **1.** A decorative texture or appearance of a surface (or the substance that gives it that appearance).<br>**2.** The temporal end; the concluding time. | *"Throw my heart Against the flint and hardness of my fault, Which, being dried with grief, will break to powder And finish all foul thoughts."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[finished]] | verb | **1.** Come or bring to a finish or an end.<br>**2.** Finally be or do something. | *"What he bids be done is finished with his bidding."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[finisher]] | noun | **1.** (baseball) a relief pitcher who can protect a lead in the last inning or two of the game.<br>**2.** A racing driver who finishes a race. | *"He that of greatest works is finisher Oft does them by the weakest minister."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[finishing]] | noun | **1.** A decorative texture or appearance of a surface (or the substance that gives it that appearance).<br>**2.** The act of finishing. | *"The whole road has been reminding me of my namesake Whittington,” said Richard, “and that waggon is the finishing touch."* — Charles Dickens, *Bleak House* |
| [[finite]] | adjective | **1.** Bounded or limited in magnitude or spatial or temporal extent.<br>**2.** Of verbs; relating to forms of the verb that are limited in time by a tense and (usually) show agreement with number and person. | *"Infinity Pressed down upon the finite Me!"* — Edna St. Vincent Millay, *Renascence, and Other Poems* |
| [[finitely]] | adverb | **1.** With a finite limit. | *"In academic literature, finitely designates with a finite limit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finiteness]] | noun | **1.** The quality of being finite. | *"The human form, or physical finiteness, cannot be made the basis of any true idea of the infinite Godhead. 255:18 Eye hath not seen Spirit, nor hath ear heard His voice."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[finitude]] | noun | **1.** The quality of being finite. | *"In academic literature, finitude designates the quality of being finite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finland]] | noun | **1.** Republic in northern europe; achieved independence from russia in 1917. | *"Fourth, the establishment of ten national spiritual assemblies in the following European countries: Sweden, Norway, Denmark, Belgium, Holland, Luxembourg, Spain, Portugal, France and Finland."* — Effendi Shoghi, *Citadel of Faith* |
| [[finn]] | noun | **1.** A native or inhabitant of finland. | *"They were made so that the Finn MacCool, the champion of the giants, could take a running jump over to Scotland and he going deer-hunting in the forests of Argyll."* — Donn Byrne, *The Wind Bloweth* |
| [[finnan]] | noun | **1.** Haddock usually baked but sometimes broiled with lots of butter. | *"In academic literature, finnan designates haddock usually baked but sometimes broiled with lots of butter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finnbogadottir]] | noun | **1.** Former president of iceland; first woman to be democratically elected head of state (born in 1930). | *"In academic literature, finnbogadottir designates former president of iceland; first woman to be democratically elected head of state (born in 1930)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finnic]] | noun | **1.** One of two branches of the finno-ugric languages; a family of languages including finnish and estonian (but not hungarian). | *"In academic literature, finnic designates one of two branches of the finno-ugric languages; a family of languages including finnish and estonian (but not hungarian)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finnish]] | noun | **1.** The official language of finland; belongs to the baltic finnic family of languages.<br>**2.** Of or relating to or characteristic of finland or the people of finland. | *"In the Finnish war he also managed to distinguish himself."* — graf Leo Tolstoy, *War and Peace* |
| [[finno-ugrian]] | noun | **1.** A family of uralic languages indigenous to scandinavia and hungary and russia and western siberia (prior to the slavic expansion into those regions). | *"In academic literature, finno-ugrian designates a family of uralic languages indigenous to scandinavia and hungary and russia and western siberia (prior to the slavic expansion into those regions)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finno-ugric]] | noun | **1.** A family of uralic languages indigenous to scandinavia and hungary and russia and western siberia (prior to the slavic expansion into those regions). | *"In academic literature, finno-ugric designates a family of uralic languages indigenous to scandinavia and hungary and russia and western siberia (prior to the slavic expansion into those regions)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finno-ugric-speaking]] | adjective | **1.** Able to communicate in a finno-ugric language. | *"In academic literature, finno-ugric-speaking designates able to communicate in a finno-ugric language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[finocchio]] | noun | **1.** Aromatic bulbous stem base eaten cooked or raw in salads. | *"In academic literature, finocchio designates aromatic bulbous stem base eaten cooked or raw in salads."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[indefinable]] | adjective | **1.** Not capable of being precisely or readily described; not easily put into words.<br>**2.** Defying expression or description. | *"The indefinable feeling with which Lady Dedlock had impressed me may have had some influence in keeping me from the house even when she was absent."* — Charles Dickens, *Bleak House* |
| [[indefinite]] | adjective | **1.** Vague or not clearly defined or stated.<br>**2.** Not decided or not known. | *"However, as he is now gone so far away and for an indefinite time, and as he will have good opportunities and introductions, we may consider this past and gone."* — Charles Dickens, *Bleak House* |
| [[indefinitely]] | adverb | **1.** To an indefinite extent; for an indefinite time. | *"And Tess won’t look pretty in her best cloze no mo-o-ore!” Her mother chimed in to the same tune: a certain way she had of making her labours in the house seem heavier than they were by prolonging them indefinitely, also weighed in the argument."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[indefiniteness]] | noun | **1.** The quality of being vague and poorly defined. | *"Meanwhile the indefiniteness remains, and the limits of variation are really much wider than any one would imagine from the sameness of women’s coiffure and the favorite love-stories in prose and verse."* — George Eliot, *Middlemarch* |
| [[indefinity]] | noun | **1.** The quality of being vague and poorly defined. | *"In academic literature, indefinity designates the quality of being vague and poorly defined."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infinite]] | noun | **1.** The unlimited expanse in which everything is located.<br>**2.** Having no limits or boundaries in time or space or extent or magnitude. | *"Thou this to hazard needs must intimate Skill infinite, or monstrous desperate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infinitely]] | adverb | **1.** Without bounds.<br>**2.** Continuing forever without end. | *"IMOGEN. [_Reads._] _He is one of the noblest note, to whose kindnesses I am most infinitely tied."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infiniteness]] | noun | **1.** The quality of being infinite; without bound or limit. | *"In academic literature, infiniteness designates the quality of being infinite; without bound or limit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infinitesimal]] | noun | **1.** (mathematics) a variable that has zero as its limit.<br>**2.** Infinitely or immeasurably small. | *"Don't you know"--an infinitesimal hesitation marked the conscious forcing of a barrier: cynically frank as she was on most points, Mrs."* — Anthony Pryde, *Nightfall* |
| [[infinitival]] | adjective | **1.** Relating to or formed with the infinitive. | *"In academic literature, infinitival designates relating to or formed with the infinitive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[infinitive]] | noun | **1.** The uninflected form of the verb. | *"I am undone by his going, I warrant you, he’s an infinitive thing upon my score."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[infinitude]] | noun | **1.** An infinite quantity.<br>**2.** The quality of being infinite; without bound or limit. | *"My overshadowing Spirit and Might with thee I send along; ride forth, and bid the Deep Within appointed bounds be Heaven and Earth; Boundless the Deep, because I Am who fill Infinitude, nor vacuous the space."* — John Milton, *Paradise Lost* |
| [[infinity]] | noun | **1.** Time without end. | *"Bucket pervades a vast number of houses and strolls about an infinity of streets, to outward appearance rather languishing for want of an object."* — Charles Dickens, *Bleak House* |
| [[nonfinancial]] | adjective | **1.** Not involving financial matters. | *"In academic literature, nonfinancial designates not involving financial matters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overrefine]] | verb | **1.** Refine too much or with excess of subtlety. | *"In academic literature, overrefine designates refine too much or with excess of subtlety."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overrefined]] | verb | **1.** Refine too much or with excess of subtlety.<br>**2.** Excessively delicate or refined. | *"In academic literature, overrefined designates refine too much or with excess of subtlety."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[overrefinement]] | noun | **1.** The act of distorting something so it seems to mean something it was not intended to mean. | *"In academic literature, overrefinement designates the act of distorting something so it seems to mean something it was not intended to mean."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redefine]] | verb | **1.** Give a new or different definition to.<br>**2.** Give a new or different definition of (a word). | *"In academic literature, redefine designates give a new or different definition to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redefinition]] | noun | **1.** The act of giving a new definition. | *"In academic literature, redefinition designates the act of giving a new definition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refinance]] | verb | **1.** Renew the financing of. | *"In academic literature, refinance designates renew the financing of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refine]] | verb | **1.** Improve or perfect by pruning or polishing.<br>**2.** Make more complex, intricate, or richer. | *"I, p. 43, on the decline of barter.] [Footnote 4: "I will ... refine them as silver is refined, and will try them as gold is tried." Zech. xiii, 9."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[refined]] | verb | **1.** Improve or perfect by pruning or polishing.<br>**2.** Make more complex, intricate, or richer. | *"I think good thoughts, whilst other write good words, And like unlettered clerk still cry Amen, To every hymn that able spirit affords, In polished form of well refined pen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[refinement]] | noun | **1.** A highly developed state of perfection; having a flawless or impeccable quality; ; ; --joseph conrad.<br>**2.** The result of improving something. | *"Where the throng is thickest, where the lights are brightest, where all the senses are ministered to with the greatest delicacy and refinement, Lady Dedlock is."* — Charles Dickens, *Bleak House* |
| [[refiner]] | noun | **1.** One whose work is to refine a specific thing. | *"Lee, a gold refiner, and a man of great moral worth."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[refinery]] | noun | **1.** An industrial plant for purifying a crude substance. | *"I knowed the boy’s grandfather—a truly nervous and modest man, even to genteel refinery. ’Twas blush, blush with him, almost as much as ’tis with me—not but that ’tis a fault in me!” “Not at all, Master Poorgrass,” said Coggan."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[refining]] | noun | **1.** The process of removing impurities (as from oil or metals or sugar etc.).<br>**2.** Improve or perfect by pruning or polishing. | *"A shining example of the refining influences that are creeping into our prisons."* — Jack London, *The Jacket (The Star-Rover)* |
| [[refinish]] | verb | **1.** Give a new surface. | *"In academic literature, refinish designates give a new surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[refinisher]] | noun | **1.** A skilled worker who is employed to restore or refinish buildings or antique furniture. | *"In academic literature, refinisher designates a skilled worker who is employed to restore or refinish buildings or antique furniture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[superfine]] | adjective | **1.** Of extremely fine size or texture.<br>**2.** Excessively delicate or refined. | *"Where was this superfine, extraordinary sort of gallantry of yours then?” “All merged in my friendship, Sophia."* — Jane Austen, *Persuasion* |
| [[unconfined]] | adjective | **1.** Not confined.<br>**2.** Free from confinement or physical restraint. | *"The leash by which it was held slipped gradually from the arm of an attendant and it was unconfined."* — C. A. Frazer, *Atmâ* |
| [[undefinable]] | adjective | **1.** Not capable of being precisely or readily described; not easily put into words. | *"But in a few minutes he would recklessly conjure up some undefinable means by which they were both to be made rich and happy for ever, and would become as gay as possible."* — Charles Dickens, *Bleak House* |
| [[undefined]] | adjective | **1.** Not precisely limited, determined, or distinguished. | *"I had an undefined impression that it might have been better if we had had some other inmate, but I could hardly have explained why even to myself."* — Charles Dickens, *Bleak House* |
| [[unfinished]] | adjective | **1.** Not brought to the desired final state.<br>**2.** Not brought to an end or conclusion. | *"We shall say now our song has twelve stanzas and we'll sing two of them every morning; in that way we can finish it on the sixth day and we have not left it unfinished at all."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[unrefined]] | adjective | **1.** Not refined or processed.<br>**2.** (used of persons and their behavior) not refined; uncouth. | *"Before I was through I had rhymes which ranged from the two extremes of the keenest parental affection to those of unrefined filthiness."* — Isaac Taylor Headland, *The Chinese Boy and Girl* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Order]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FIN
  </div>
</div>
