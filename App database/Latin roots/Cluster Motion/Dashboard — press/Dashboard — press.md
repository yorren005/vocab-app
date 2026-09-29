---
status: unread
type: root_dashboard
---
# Dashboard — press
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">press-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to press or squeeze”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A traveler stepping along a trail or a river flowing smoothly forward.</span>
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

The root **press** means to press or squeeze. It refers to press, squeeze, weigh down, crowd, pursue, suppress. In English, this root forms words such as *antidepressant*, *appress*, *appressed*, and *compress*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to press or squeeze
> The root **press** means to press or squeeze. It refers to press, squeeze, weigh down, crowd, pursue, suppress. In English, this root forms words such as *antidepressant*, *appress*, *appressed*, and *compress*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To press or squeeze</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A traveler stepping along a trail or a river flowing smoothly forward.</mark>
> - **Everyday Connection**: Think of familiar words like *antidepressant* and *appress*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **press** comes from a Latin word that means *"to press or squeeze"*.
  - At its core, it describes the action of press or squeeze.

- **The Big Picture Idea**:
  - Picture a traveler stepping along a trail or a river flowing smoothly forward.
  - Whenever you see **press** in an English word, think of **to press or squeeze**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to press or squeeze).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Antidepressant**: A therapeutic psychiatric medication primarily prescribed to alleviate symptoms of major depressive disorder, dysthymia, and anxiety.
  - **Appress**: To press closely against an anatomical structure or surface, especially lying flat along an axis.
  - **Appressed**: Lying flat against or closely applied to a stem, branch, or leaf surface along its entire length without organic fusion.
  - **Compress**: To force into smaller volume, narrower space, or greater density through applied physical pressure.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">press</mark>, think of <mark class="hl-def">to press or squeeze</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **press** functions in English through three principal classical and Romance transmission channels:
> - **The Classical Supine / Participial Stem `press-`:** From Latin *pressum* (past participle of *premere*, formed by archaic assimilation *\*prem-tum* $\to$ *\*pres-tum* $\to$ *pressum*). This forms the core vocabulary: *pressure*, *compress*, *depress*, *express*, *impress*, *oppress*, *repress*, *suppress*.
> - **The Latin Frequentative Verb `pressāre`:** Formed to denote repetitive or sustained pressing, passing into Old French *presser* and Anglo-Norman into Middle English as the primary verb and noun *press*.
> - **The Old French Contracted Form `print-`:** From Old French *preinte*, feminine past participle of *preindre* (< Latin *premere*), giving English *print*, *imprint*, *misprint*, *reprint*, *printer*.
> - **The Italian Extraction Form `espresso`:** Direct Italian borrowing from *espresso*, past participle of *esprimere* (< Latin *exprimere*), denoting coffee brewed rapidly under high steam pressure.
>
> ### Directional Prefix Spectrum
> The root unites with Latin directional prefixes to map every spatial vector of applied force:
> - `com-` (*together*) $\to$ *compress*, *compression*, *compressor* (pressing together into a dense unit).
> - `dē-` (*down, away*) $\to$ *depress*, *depression*, *depressant* (pressing down into a hollow or low mood).
> - `ex-` (*out, forth*) $\to$ *express*, *expression*, *expressly* (pressing out internal thoughts or liquids).
> - `in-` / `im-` (*into, upon*) $\to$ *impress*, *impression*, *imprint* (pressing into a surface or the mind).
> - `ob-` / `op-` (*against, upon*) $\to$ *oppress*, *oppression*, *oppressor* (bearing down crushingly against a people).
> - `re-` (*back, again*) $\to$ *repress*, *repression*, *reprint*, *reprimand* (forcing back down; printing again).
> - `sub-` / `sup-` (*under, beneath*) $\to$ *suppress*, *suppression*, *suppressor* (pressing down from above or underneath).
> - `ad-` / `ap-` (*to, toward*) $\to$ *appress*, *appressed* (pressing closely against a surface in botany).
> - `anti-` (*against* [Greek]) + `dē-` $\to$ *antidepressant* (counteracting depressive states).
> - `dē-` + `com-` $\to$ *decompression* (releasing compressive forces).
> - `in-` (*not*) + `com-` / `ex-` / `re-` $\to$ *incompressible*, *inexpressible*, *irrepressible* (incapable of being squeezed, spoken, or held back).

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
> Although the root fundamentally means **"to press, squeeze, weigh down"**, its operational manifestation shifts across diverse human domains:
> - **Mechanical, Thermodynamic & Fluid Systems:** [[press]], [[pressure]], [[pressurize]], [[pressurization]], [[depressurize]], [[depressurization]], [[compress]], [[compressible]], [[compressibility]], [[incompressible]], [[compression]], [[compressive]], [[compressor]], [[decompression]] — the physical physics of force per unit area, hydraulic pumps, piston displacement, gas cylinder compression, atmospheric altitude chambers, and diving decompression.
> - **Psychiatry, Clinical Medicine & Emotional States:** [[depress]], [[depressant]], [[depressed]], [[depressing]], [[depression]], [[depressive]], [[antidepressant]], [[repress]], [[repressible]], [[irrepressible]], [[repression]], [[suppress]], [[suppressible]], [[suppression]] — clinical unipolar and bipolar mood disorders, pharmacological downers, neurochemical modulation, unconscious ego defenses, and conscious emotional withholding.
> - **Communication, Language, Semiotics & Soul Expression:** [[express]], [[expressible]], [[expression]], [[expressionless]], [[expressive]], [[expressively]], [[expressiveness]], [[expressly]], [[inexpressible]] — squeezing internal feelings, conceptual logic, and genetic codes out into visible words, facial gestures, or molecular proteins.
> - **Visual Arts & Modern Aesthetic Movements:** [[impression]], [[impressionable]], [[impressionism]], [[impressionist]], [[impressive]], [[impressively]], [[expressionism]], [[expressionist]] — 19th-century French Impressionism capturing transient optical light imprints, and early 20th-century German Expressionism forcing internal spiritual agony onto distorted canvases.
> - **Typography, Publication & the Fourth Estate:** [[print]], [[printer]], [[imprint]], [[misprint]], [[reprint]] — Gutenberg movable type, offset lithography, publishing imprints, journalistic investigation, and constitutional freedom of the press.
> - **Political Power, Tyranny & Resistance:** [[oppress]], [[oppression]], [[oppressive]], [[oppressively]], [[oppressor]], [[repressive]], [[repressively]], [[suppressive]], [[suppressor]] — systemic authoritarian subjugation, state censorship, military martial law, and weapons flash suppressors.
> - **Gastronomy & High-Pressure Extraction:** [[espresso]] — Italian culinary science forcing 9 bars of near-boiling water through tamped coffee grinds.
> - **Plant Anatomy & Botanical Morphology:** [[appress]], [[appressed]] — leaves, bracts, or hairs lying flat and closely pressed against a botanical axis.
> - **Institutional Discipline & Legal Admonition:** [[reprimand]] — formal censure delivered by a governing body (Latin *reprimenda*, "that which must be held in check").

---

## 🔀 4. Prefix & Combining Dynamics on press

### Prefix Shifts (Directional & Semantic Modification)

| Prefix | Classical Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `com-` (*cum*) | together, completely | [[compress]], [[compression]], [[compressor]] | Presses inward from all sides; forces into a dense volume. |
| `dē-` | down, away from | [[depress]], [[depression]], [[depressant]] | Presses downward physically, economically, or emotionally. |
| `ex-` | out, forth, thoroughly | [[express]], [[expression]], [[expressly]] | Squeezes internal meaning or juice out into open daylight. |
| `in-` / `im-` | in, into, upon | [[impress]], [[impression]], [[imprint]] | Presses an indelible mark into a receptive physical or mental surface. |
| `ob-` / `op-` | against, over, upon | [[oppress]], [[oppression]], [[oppressor]] | Bears down with crushing, tyrannical weight upon people. |
| `re-` | back, again | [[repress]], [[repression]], [[reprint]], [[reprimand]] | Forces back down below the surface; or produces another print run. |
| `sub-` / `sup-` | under, down from below | [[suppress]], [[suppression]], [[suppressor]] | Holds down completely; stifles information, dissent, or gunfire. |
| `ad-` / `ap-` | to, toward, near | [[appress]], [[appressed]] | Presses closely against another anatomical organ or surface. |
| `dē-` + `com-` | reversal + together | [[decompression]] | Reverses compression; releases high environmental pressure. |
| `anti-` + `dē-` | against + down | [[antidepressant]] | A pharmacological agent working against psychological depression. |
| `in-` (*privative*) | not, un- | [[incompressible]], [[inexpressible]] | Incapable of being squeezed; impossible to put into words. |
| `in-` (*ir-*) | not, un- | [[irrepressible]] | Incapable of being curbed, held down, or discouraged. |
| `mis-` | wrongly, mistakenly | [[misprint]] | A typographical error mistakenly stamped into printed text. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Representative Derivatives | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ion` | Noun (Action / State / Result) | [[compression]], [[depression]], [[expression]], [[impression]], [[oppression]], [[repression]], [[suppression]] | The act, process, or finished condition of pressing in a specified vector. |
| `-or` / `-er` | Noun (Agent / Instrument) | [[compressor]], [[suppressor]], [[oppressor]], [[printer]] | The machine, person, or biological agent executing the pressing. |
| `-ive` | Adjective (Tendency / Quality) | [[compressive]], [[depressive]], [[expressive]], [[impressive]], [[oppressive]], [[repressive]], [[suppressive]] | Having the disposition, force, or characteristic to press. |
| `-ure` | Noun (Physical State / Force) | [[pressure]] | The physical force exerted per unit area ($F/A$), or psychological strain. |
| `-ible` / `-able` | Adjective (Passive Potential) | [[compressible]], [[expressible]], [[impressionable]], [[repressible]], [[suppressible]] | Capable of receiving or undergoing the specific compressive action. |
| `-ize` | Verb (Causative / Technical) | [[pressurize]], [[depressurize]] | To bring to a specified barometric pressure or release it. |
| `-ization` | Noun (Process from `-ize`) | [[pressurization]], [[depressurization]] | The technical operation of altering ambient atmospheric pressure. |
| `-ism` / `-ist` | Noun (Movement / Practitioner) | [[impressionism]], [[impressionist]], [[expressionism]], [[expressionist]] | A historical artistic aesthetic doctrine, or an artist practicing it. |
| `-ly` | Adverb (Manner / Degree) | [[expressly]], [[expressively]], [[impressively]], [[oppressively]], [[repressively]] | In an explicit, emotional, admirable, tyrannical, or coercive manner. |
| `-ness` | Noun (Abstract Quality) | [[expressiveness]] | The internal capacity or richness for conveying emotion or thought. |
| `-less` | Adjective (Privative / Without) | [[expressionless]] | Lacking visible emotion, facial inflection, or communicative tone. |
| `-and` (*gerundive*) | Noun (Obligation / Duty) | [[reprimand]] | Latin *-enda* ("that which must be repressed/checked"). |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚙️ **Fluid Dynamics, Thermodynamics & Aerospace** | [[pressure]], [[pressurize]], [[pressurization]], [[compress]], [[compressor]], [[decompression]], [[incompressible]], [[depressurize]], [[depressurization]] | Ideal gas laws ($PV=nRT$); hydraulic brake systems; jet engine multi-stage axial compressors; cabin altitude pressurization systems; hyperbaric deep-sea diving chambers. |
| 📰 **Typography, Printing & Mass Media** | [[press]], [[print]], [[printer]], [[imprint]], [[misprint]], [[reprint]] | Johannes Gutenberg's movable-type revolution; offset lithography; commercial publishing houses and imprints; the Fourth Estate; First Amendment freedom of the press. |
| 🧠 **Psychiatry, Psychoanalysis & Neurobiology** | [[depression]], [[depressed]], [[depressive]], [[antidepressant]], [[depressant]], [[repress]], [[repression]], [[suppress]], [[suppression]] | Major depressive disorder (MDD); selective serotonin reuptake inhibitors (SSRIs); central nervous system depressants; Freudian unconscious repression vs. conscious suppression. |
| ⚖️ **Political Science, Human Rights & Authoritarianism** | [[oppress]], [[oppression]], [[oppressive]], [[oppressor]], [[repressive]], [[repressively]], [[suppressive]] | Systemic institutional tyranny; martial law; totalitarian police states; state censorship of dissident movements; authoritarian suppression of democratic elections. |
| 🎨 **Art History & Aesthetics** | [[impressionism]], [[impressionist]], [[expressionism]], [[expressionist]], [[expressive]], [[impressive]] | 19th-century French plein-air painting capturing optical light imprints (Monet, Renoir); 20th-century German Expressionism externalizing inner psychological angst (Munch, Kirchner). |
| 🗣️ **Linguistics, Semiotics & Rhetoric** | [[express]], [[expression]], [[expressiveness]], [[expressively]], [[expressionless]], [[inexpressible]], [[reprimand]] | Verbal and facial communication; semiotic encoding of abstract thought; mathematical expressions; genetic gene expression; formal legislative reprimands. |
| ☕ **Gastronomy & Beverage Science** | [[espresso]] | High-pressure percolation extracting aromatic volatile coffee oils under 9 bars of hydrostatic pressure at 93°C, yielding dense crema. |
| 🌿 **Botany & Plant Morphology** | [[appress]], [[appressed]] | Taxonomic description of foliar hairs, scales, or bracts lying closely flattened against stems or axes to minimize water loss. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adpressed]] | adjective | **1.** Pressed close to or lying flat against something; ; -l.v.pirsson. | *"In academic literature, adpressed designates pressed close to or lying flat against something; ; -l.v.pirsson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antidepressant]] | noun | **1.** Any of a class of drugs used to treat depression; often have undesirable side effects. | *"In academic literature, antidepressant designates any of a class of drugs used to treat depression; often have undesirable side effects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[appressed]] | adjective | **1.** Pressed close to or lying flat against something; ; -l.v.pirsson. | *"In academic literature, appressed designates pressed close to or lying flat against something; ; -l.v.pirsson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compress]] | noun | **1.** A cloth pad or dressing (with or without medication) applied firmly to some part of the body (to relieve discomfort or reduce fever).<br>**2.** Make more compact by or as if by pressing. | *"I only know that I found myself, with a perseverance worthy of a much better cause, making the most strenuous exertions to compress it within those limits."* — Charles Dickens, *Great Expectations* |
| [[compressed]] | verb | **1.** Make more compact by or as if by pressing.<br>**2.** Squeeze or press together. | *"There is a stern expression on her face and a part of her lower lip is compressed under her teeth."* — Charles Dickens, *Bleak House* |
| [[compressibility]] | noun | **1.** The property of being able to occupy less space. | *"In academic literature, compressibility designates the property of being able to occupy less space."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[compressible]] | adjective | **1.** Capable of being compressed or made more compact.<br>**2.** Capable of being easily compressed. | *"But once started, the runners slipped along easily enough, even through the deep snow, packing the compressible stuff in one passage as hard as ice."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[compressing]] | noun | **1.** Applying pressure.<br>**2.** Make more compact by or as if by pressing. | *"Very well,” she said, and gave him her hand, compressing her lips to a demure impassivity."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[compression]] | noun | **1.** An increase in the density of something.<br>**2.** The process or result of becoming smaller or pressed together. | *"Seeing his advance take the form of an attitude threatening a possible enclosure, if not compression, of her person, she edged off round the bush."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[compressor]] | noun | **1.** A mechanical device that compresses gasses. | *"First of all a pump or compressor compresses it."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[decompress]] | verb | **1.** Restore to its uncompressed form.<br>**2.** Decrease the pressure of. | *"At this extremely close range the concentrations of laser-quads and explosive decompress energy by both of us at a single point might disable some part of the warhead or set it off." "It would take too much time to cut through."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[decompressing]] | noun | **1.** Relieving pressure (especially bringing a compressed person gradually back to atmospheric pressure).<br>**2.** Restore to its uncompressed form. | *"In academic literature, decompressing designates relieving pressure (especially bringing a compressed person gradually back to atmospheric pressure)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decompression]] | noun | **1.** Restoring compressed information to its normal form for use or display.<br>**2.** Relieving pressure (especially bringing a compressed person gradually back to atmospheric pressure). | *"In academic literature, decompression designates restoring compressed information to its normal form for use or display."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depress]] | verb | **1.** Lower someone's spirits; make downhearted.<br>**2.** Lower (prices or markets). | *"Yes—well, my father had been talking a good deal to me of his troubles and difficulties, and the subject always tends to depress me."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[depressant]] | noun | **1.** A drug that reduces excitability and calms a person.<br>**2.** Capable of depressing physiological or psychological activity or response by a chemical agent. | *"In academic literature, depressant designates a drug that reduces excitability and calms a person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depressed]] | verb | **1.** Lower someone's spirits; make downhearted.<br>**2.** Lower (prices or markets). | *"Depressed he is already, and deposed ’Tis doubt he will be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[depressing]] | verb | **1.** Lower someone's spirits; make downhearted.<br>**2.** Lower (prices or markets). | *"Not to be able to have a glimpse of their mother for two or three days was depressing news indeed."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[depressingly]] | adverb | **1.** In a depressing manner or to a depressing degree. | *"In academic literature, depressingly designates in a depressing manner or to a depressing degree."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depression]] | noun | **1.** A mental state characterized by a pessimistic sense of inadequacy and a despondent lack of activity.<br>**2.** A long-term economic state characterized by unemployment and low prices and low levels of trade and investment. | *"They straggle about in wrong places, look at wrong things, don’t care for the right things, gape when more rooms are opened, exhibit profound depression of spirits, and are clearly knocked up."* — Charles Dickens, *Bleak House* |
| [[depressive]] | noun | **1.** Someone suffering psychological depression. | *"In academic literature, depressive designates someone suffering psychological depression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depressor]] | noun | **1.** Any skeletal muscle that draws a body part down.<br>**2.** Any nerve whose activity tends to reduce the activity or tone of the body part it serves. | *"In academic literature, depressor designates any skeletal muscle that draws a body part down."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depressurise]] | verb | **1.** Decrease the pressure of. | *"In academic literature, depressurise designates decrease the pressure of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[depressurize]] | verb | **1.** Decrease the pressure of. | *"In academic literature, depressurize designates decrease the pressure of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empress]] | noun | **1.** A woman emperor or the wife of an emperor. | *"Most noble empress, you have heard of me?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[espresso]] | noun | **1.** Strong black coffee brewed by forcing hot water under pressure through finely ground coffee beans. | *"In academic literature, espresso designates strong black coffee brewed by forcing hot water under pressure through finely ground coffee beans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[express]] | noun | **1.** Mail that is distributed by a rapid and efficient system.<br>**2.** Public transport consisting of a fast train or bus that makes only a few scheduled stops. | *"You ne’er oppress’d me with a mother’s groan, Yet I express to you a mother’s care."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expressage]] | noun | **1.** Rapid transport of goods. | *"In academic literature, expressage designates rapid transport of goods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expressed]] | verb | **1.** Give expression to.<br>**2.** Articulate; either verbally or with a cry, shout, or noise. | *"Past cure I am, now reason is past care, And frantic-mad with evermore unrest, My thoughts and my discourse as mad men’s are, At random from the truth vainly expressed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expressible]] | adjective | **1.** Capable of being expressed. | *"In academic literature, expressible designates capable of being expressed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expression]] | noun | **1.** The feelings expressed on a person's face.<br>**2.** Expression without words. | *"It had not escaped him that an expression of sorrow had spread over his mother's face after his words."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[expressionism]] | noun | **1.** An art movement early in the 20th century; the artist's subjective expression of inner experiences was emphasized; an inner feeling was expressed through a distorted rendition of reality. | *"In academic literature, expressionism designates an art movement early in the 20th century; the artist's subjective expression of inner experiences was emphasized; an inner feeling was expressed through a distorted rendition of reality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expressionist]] | noun | **1.** An artist who is an adherent of expressionism.<br>**2.** Of or relating to expressionism. | *"In academic literature, expressionist designates an artist who is an adherent of expressionism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expressionistic]] | adjective | **1.** Of or relating to expressionism. | *"In academic literature, expressionistic designates of or relating to expressionism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[expressionless]] | adjective | **1.** Deliberately impassive in manner. | *"He wears his usual expressionless mask—if it be a mask—and carries family secrets in every limb of his body and every crease of his dress."* — Charles Dickens, *Bleak House* |
| [[expressive]] | adjective | **1.** Characterized by expression. | *"Be more expressive to them; for they wear themselves in the cap of the time; there do muster true gait; eat, speak, and move, under the influence of the most receiv’d star; and though the devil lead the measure, such are to be followed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[expressively]] | adverb | **1.** With expression; in an expressive manner. | *"From them, however, the eight parts of speech shone out most expressively, and James could combine them with ease."* — Jane Austen, *Northanger Abbey* |
| [[expressiveness]] | noun | **1.** The quality of being expressive. | *"It is a little impaired in its expressiveness by his having a shut-up gape still to dispose of, with watering eyes."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[expressly]] | adverb | **1.** With specific intentions; for the express purpose. | *"This is his claim, his threat’ning, and my message; Unless the Dauphin be in presence here, To whom expressly I bring greeting too."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impress]] | noun | **1.** The act of coercing someone into government service.<br>**2.** Have an emotional or cognitive impact upon. | *"Your ships are not well manned, Your mariners are muleteers, reapers, people Engrossed by swift impress."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impressed]] | verb | **1.** Have an emotional or cognitive impact upon.<br>**2.** Impress positively. | *"Your judgments, my grave lords, Must give this cur the lie; and his own notion— Who wears my stripes impressed upon him, that Must bear my beating to his grave—shall join To thrust the lie unto him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impressible]] | adjective | **1.** Easily impressed or influenced. | *"Yet he whom it describes scarcely impressed one with the idea of a gentle, a yielding, an impressible, or even of a placid nature."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[impression]] | noun | **1.** A vague idea in which some confidence is placed.<br>**2.** An outward appearance. | *"Sink, my knee, i’ th’ earth; [_Kneels._] Of thy deep duty more impression show Than that of common sons."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[impressionable]] | adjective | **1.** Easily impressed or influenced. | *"The impressionable peasant leads a larger, fuller, more dramatic life than the pachydermatous king."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[impressionism]] | noun | **1.** A school of late 19th century french painters who pictured appearances by strokes of unmixed colors to give the impression of reflected light. | *"In academic literature, impressionism designates a school of late 19th century french painters who pictured appearances by strokes of unmixed colors to give the impression of reflected light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impressionist]] | noun | **1.** A painter who follows the theories of impressionism.<br>**2.** Relating to or characteristic of impressionism. | *"My aim, my dear Phyllis, is to show you in a series of impressionist pictures the sort of thing I have to go through when I'm not here."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[impressionistic]] | adjective | **1.** Of or relating to or based on an impression rather than on facts or reasoning.<br>**2.** Relating to or characteristic of impressionism. | *"In academic literature, impressionistic designates of or relating to or based on an impression rather than on facts or reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[impressive]] | adjective | **1.** Making a strong or vivid impression.<br>**2.** Producing a strong effect. | *"His manner is the gravely impressive manner of a man who has not committed himself in life otherwise than as he has become the victim of a tender sorrow of the heart."* — Charles Dickens, *Bleak House* |
| [[impressively]] | adverb | **1.** In an impressive manner. | *"No!” he replied impressively, “there is nothing worth my staying for;” and he was gone directly."* — Jane Austen, *Persuasion* |
| [[impressiveness]] | noun | **1.** Splendid or imposing in size or appearance.<br>**2.** The quality of making a strong or vivid impression on the mind. | *"His very name carried an impressiveness hardly to be measured without a precise chronology of scholarship."* — George Eliot, *Middlemarch* |
| [[impressment]] | noun | **1.** The act of coercing someone into government service. | *"He opened it with much impressment--assumed, of course--and showed a great bundle of white flowers."* — Bram Stoker, *Dracula* |
| [[incompressibility]] | noun | **1.** The property of being incompressible. | *"In academic literature, incompressibility designates the property of being incompressible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[incompressible]] | adjective | **1.** Incapable of being compressed; resisting compression. | *"Water is practically incompressible, so that the water at the bottom of the sea is no heavier than that near the surface."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[inexpressible]] | adjective | **1.** Defying expression. | *"Mademoiselle, I have an inexpressible desire to find service with a young lady who is good, accomplished, beautiful."* — Charles Dickens, *Bleak House* |
| [[inexpressive]] | adjective | **1.** Not expressive. | *"His imperturbable face has been as inexpressive as his rusty clothes."* — Charles Dickens, *Bleak House* |
| [[inexpressively]] | adverb | **1.** Without expression; in an inexpressive manner. | *"So inexpressively that they cannot at first understand him; it is his old housekeeper who makes out what he wants and brings in a slate."* — Charles Dickens, *Bleak House* |
| [[oppress]] | verb | **1.** Come down on or keep down by unjust use of one's authority.<br>**2.** Cause to suffer. | *"You ne’er oppress’d me with a mother’s groan, Yet I express to you a mother’s care."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oppressed]] | verb | **1.** Come down on or keep down by unjust use of one's authority.<br>**2.** Cause to suffer. | *"When day’s oppression is not eased by night, But day by night and night by day oppressed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oppression]] | noun | **1.** The act of subjugating by cruelty.<br>**2.** The state of being kept down by unjust use of force or authority:. | *"When day’s oppression is not eased by night, But day by night and night by day oppressed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oppressive]] | adjective | **1.** Weighing heavily on the senses or spirit.<br>**2.** Marked by unjust severity or arbitrary behavior. | *"Snagsby should be ill at ease too, for he always is so, more or less, under the oppressive influence of the secret that is upon him."* — Charles Dickens, *Bleak House* |
| [[oppressively]] | adverb | **1.** In a heavy and oppressive way. | *"Bennet had been down stairs, but on this happy day she again took her seat at the head of her table, and in spirits oppressively high."* — Jane Austen, *Pride and Prejudice* |
| [[oppressiveness]] | noun | **1.** A feeling of being oppressed.<br>**2.** Unwelcome burdensome difficulty. | *"They writhed feverishly under the oppressiveness of an emotion thrust on them by cruel Nature’s law—an emotion which they had neither expected nor desired."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[oppressor]] | noun | **1.** A person of authority who subjects others to undue pressures. | *"This place Is our inheritance; no hard oppressor Dare take this from us; here with a little patience We shall live long and loving."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[overpressure]] | noun | **1.** A transient air pressure greater than the surrounding atmospheric pressure. | *"In academic literature, overpressure designates a transient air pressure greater than the surrounding atmospheric pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[postimpressionist]] | noun | **1.** An artist of the postimpressionist school who revolted against impressionism. | *"In academic literature, postimpressionist designates an artist of the postimpressionist school who revolted against impressionism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[press]] | noun | **1.** The state of demanding notice or attention.<br>**2.** The print media responsible for gathering and publishing news in the form of newspapers or magazines. | *"I press in here, sir, amongst the rest of the country copulatives, to swear and to forswear according as marriage binds and blood breaks."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pressed]] | verb | **1.** Exert pressure or force to or upon.<br>**2.** Force or impel in an indicated direction. | *"Yes, here it is. [_Reads_.] _They have pressed a power, but it is not known Whether for east or west."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pressing]] | noun | **1.** The act of pressing; the exertion of pressure.<br>**2.** A metal or plastic part that is made by a mechanical press. | *"If you seek For further satisfying, under her breast (Worthy the pressing) lies a mole, right proud Of that most delicate lodging."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pressingly]] | adverb | **1.** In a pressing manner. | *"Bennet was most pressingly civil in her hope of seeing the whole family soon at Longbourn; and addressed herself particularly to Mr."* — Jane Austen, *Pride and Prejudice* |
| [[pressman]] | noun | **1.** Someone whose occupation is printing.<br>**2.** A journalist employed to provide news stories for newspapers or broadcast media. | *"Gallaher, that was a pressman for you."* — James Joyce, *Ulysses* |
| [[pressmark]] | noun | **1.** A mark consisting of characters written on a book; used to indicate shelf location. | *"In academic literature, pressmark designates a mark consisting of characters written on a book; used to indicate shelf location."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pressor]] | noun | **1.** Any agent that causes a narrowing of an opening of a blood vessel: cold or stress or nicotine or epinephrine or norepinephrine or angiotensin or vasopressin or certain drugs; maintains or increases blood pressure.<br>**2.** Increasing (or tending to increase) blood pressure. | *"In academic literature, pressor designates any agent that causes a narrowing of an opening of a blood vessel: cold or stress or nicotine or epinephrine or norepinephrine or angiotensin or vasopressin or certain drugs; maintains or increases blood pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pressure]] | noun | **1.** The force applied to a unit area of surface; measured in pascals (si unit) or in dynes (cgs unit).<br>**2.** A force that compels. | *"The pressure lay on them all very heavily."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[pressure-cook]] | verb | **1.** Cook in a pressure cooker. | *"In academic literature, pressure-cook designates cook in a pressure cooker."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pressure-wash]] | verb | **1.** Wash before painting to remove old paint and mildew. | *"In academic literature, pressure-wash designates wash before painting to remove old paint and mildew."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pressurise]] | verb | **1.** Increase the pressure on a gas or liquid.<br>**2.** Maintain a certain pressure. | *"In academic literature, pressurise designates increase the pressure on a gas or liquid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pressurize]] | verb | **1.** Increase the pressure on a gas or liquid.<br>**2.** Maintain a certain pressure. | *"Near-space cargo and passenger shuttles and taxis landed at and departed from pads adjacent pressurized air docks into the city."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[repress]] | verb | **1.** Put down by force or intimidation.<br>**2.** Conceal or hide. | *"But she determined to repress all evidences of feeling."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[repressed]] | verb | **1.** Put down by force or intimidation.<br>**2.** Conceal or hide. | *"To say of a man so severely and strictly self-repressed that he is triumphant would be to do him as great an injustice as to suppose him troubled with love or sentiment or any romantic weakness."* — Charles Dickens, *Bleak House* |
| [[represser]] | noun | **1.** An agent that represses. | *"In academic literature, represser designates an agent that represses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[repressing]] | verb | **1.** Put down by force or intimidation.<br>**2.** Conceal or hide. | *"She is repressing symptoms favourable to the fit when she seems to take alarm at something and vanishes down the stairs."* — Charles Dickens, *Bleak House* |
| [[repression]] | noun | **1.** A state of forcible subjugation.<br>**2.** (psychiatry) the classical defense mechanism that protects you from impulses or ideas that would cause anxiety by preventing them from becoming conscious. | *"Instead of being a man trained to repression he was—what she had seen him."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[repressive]] | adjective | **1.** Restrictive of action. | *"He was fuming under a repressive law which he was forced to acknowledge: he was dangerously poised, and Rosamond’s voice now brought the decisive vibration."* — George Eliot, *Middlemarch* |
| [[repressor]] | noun | **1.** An agent that represses. | *"In academic literature, repressor designates an agent that represses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suppress]] | verb | **1.** To put down by force or authority.<br>**2.** Come down on or keep down by unjust use of one's authority. | *"The mercy that was quick in us but late, By your own counsel is suppress’d and kill’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suppressant]] | noun | **1.** A drug that suppresses appetite. | *"In academic literature, suppressant designates a drug that suppresses appetite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suppressed]] | verb | **1.** To put down by force or authority.<br>**2.** Come down on or keep down by unjust use of one's authority. | *"Thus vainly thinking that she thinks me young, Although she knows my days are past the best, Simply I credit her false-speaking tongue; On both sides thus is simple truth suppressed."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[suppresser]] | noun | **1.** Someone who suppresses.<br>**2.** A gene that suppresses the phenotypic expression of another gene (especially of a mutant gene). | *"In academic literature, suppresser designates someone who suppresses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suppression]] | noun | **1.** The failure to develop some part or organ.<br>**2.** The act of withholding or withdrawing some book or writing from publication or circulation. | *"Is it suppression?” A shiver in the negative from Mrs."* — Charles Dickens, *Bleak House* |
| [[suppressive]] | adjective | **1.** Tending to suppress. | *"In academic literature, suppressive designates tending to suppress."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suppressor]] | noun | **1.** Someone who suppresses.<br>**2.** A gene that suppresses the phenotypic expression of another gene (especially of a mutant gene). | *"In academic literature, suppressor designates someone who suppresses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncompress]] | verb | **1.** Restore to its uncompressed form. | *"In academic literature, uncompress designates restore to its uncompressed form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unexpressed]] | adjective | **1.** Not made explicit. | *"I had indeed made my proposal from the idea that he wished and would ask me to be his wife: an expectation, not the less certain because unexpressed, had buoyed me up, that he would claim me at once as his own."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[unexpressible]] | adjective | **1.** Defying expression. | *"In academic literature, unexpressible designates defying expression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unexpressive]] | adjective | **1.** Deliberately impassive in manner. | *"Run, run, Orlando, carve on every tree The fair, the chaste, and unexpressive she. [_Exit._] Enter Corin and Touchstone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unimpressed]] | adjective | **1.** Not moved to serious regard. | *"But as ever before, the pagan harpooneers remained almost wholly unimpressed; or if impressed, it was only with a certain magnetism shot into their congenial hearts from inflexible Ahab’s."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[unimpressionable]] | adjective | **1.** Not sensitive or susceptible to impression. | *"But unimpressionable natures are not so soon softened, nor are natural antipathies so readily eradicated."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[unimpressive]] | adjective | **1.** Not capable of impressing. | *"In academic literature, unimpressive designates not capable of impressing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unimpressively]] | adverb | **1.** In an unimpressive manner. | *"In academic literature, unimpressively designates in an unimpressive manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unpressed]] | adjective | **1.** (of clothing) not smoothed with heat. | *"Have I my pillow left unpressed in Rome, Forborne the getting of a lawful race, And by a gem of women, to be abused By one that looks on feeders?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unrepressed]] | adjective | **1.** Not repressed. | *"And now, a fresh surge from the sea of her unknown being, unrepressed by the _hitherto_ of the objects of sense, had burst the gates and bars, swept the obstructions from its channel, and poured from her in melodious song."* — George MacDonald, *The Portent and Other Stories* |
| [[unsuppressed]] | adjective | **1.** Given vent to. | *"In academic literature, unsuppressed designates given vent to."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PRESS
  </div>
</div>
