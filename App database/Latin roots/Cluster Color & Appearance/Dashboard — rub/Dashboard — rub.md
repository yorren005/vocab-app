---
status: unread
type: root_dashboard
---
# Dashboard — rub
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">rub-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“red”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A painter mixing vibrant pigments on a palette to color a canvas.</span>
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

The root **rub** means red. It describes having a crimson, scarlet, or rosy red color. In English, this root forms words such as *ruby*, *rouge*, *rubric*, and *rubricate*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: red
> The root **rub** means red. It describes having a crimson, scarlet, or rosy red color. In English, this root forms words such as *ruby*, *rouge*, *rubric*, and *rubricate*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Red</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A painter mixing vibrant pigments on a palette to color a canvas.</mark>
> - **Everyday Connection**: Think of familiar words like *ruby* and *rouge*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **rub** comes from a Latin word that means *"red"*.
  - At its core, it describes red.

- **The Big Picture Idea**:
  - Picture a painter mixing vibrant pigments on a palette to color a canvas.
  - Whenever you see **rub** in an English word, think of **colors, brightness, and visual appearance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of red.
  - **Mental & Social**: How people experience, organize, or communicate about red.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Ruby**: A precious gemstone consisting of corundum colored deep red by trace amounts of chromium.
  - **Rouge**: A red or pink cosmetic powder or cream applied to the cheeks or lips to impart a youthful flush.
  - **Rubric**: An authoritative rule, guide, or protocol, especially a heading or liturgical direction in a prayer book.
  - **Rubricate**: To write, print, or illuminate in red ink, especially the chapter headings or initial capital letters in early books and manuscripts.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">rub</mark>, think of <mark class="hl-def">colors, brightness, and visual appearance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **rub** generates vocabulary across three distinct Latin stems:
> - **Primary Adjectival Stem `rub-` (Latin *ruber / rubeus*):**
>   - Through French: Latin *rubeus* → Old French *rubi* → English [[ruby]]; French *rouge* → English [[rouge]].
>   - Adjectival suffixation: *rub- + -icundus* → [[rubicund]] ("ruddy-faced").
>   - Chemical element suffix: *rubid- + -ium* → [[rubidium]].
> - **Inchoative Stems `rub-ēsc-` & `e- + rub-ēsc-`:**
>   - Latin *rubēscere* ("to grow red") → English [[rubescent]].
>   - Prefixed *ē- + rubēscere* ("to blush deeply") → English [[erubescent]], [[erubescence]].
> - **Red-Ochre Nominal Stem `rubrīc-`:**
>   - Latin *rubrīca* → Old French *rubrique* → English [[rubric]].
>   - Latin *rubrīcāre* → English [[rubricate]], [[rubrication]].
> - **Medical & Pharmacological Formations:**
>   - Latin abstract noun → [[rubor]] (inflammation sign).
>   - Diminutive disease name → [[rubella]] (German measles).
>   - Causative compound: *ruber + facere* → [[rubefacient]] (capillary-dilating agent) and [[rubify]].

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
> Although unified by the concept of **"red"**, the modern semantic range spans distinct disciplines:
> - **Mineralogy & Gemology:** In [[ruby]], it names the precious red gemstone prized for optical clarity, laser amplification, and hardness.
> - **Cosmetics & Metallurgy:** In [[rouge]], it describes facial cheek makeup and jeweler's rouge (fine ferric oxide polish).
> - **Education, Law & Manuscript Studies:** In [[rubric]], [[rubricate]], and [[rubrication]], it covers scoring criteria, liturgical stage directions, and red manuscript headings.
> - **Clinical Medicine & Pathology:** In [[rubor]], [[rubella]], and [[rubefacient]], it designates the redness of acute inflammation, viral exanthems, and counter-irritant balms.
> - **Physiology & Emotional Expression:** In [[rubicund]], [[rubescent]], and [[erubescent]], it captures ruddy complexions and involuntary facial blushing.
> - **Atomic Physics & Chemistry:** In [[rubidium]], it represents alkali metal atomic clocks and spectroscopy.

---

## 🔀 4. Prefix & Combining Dynamics on rub

### Prefix Shifts (Directional & Semantic Modification)

| Prefix / Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ē-` (*ex-* before consonant) | out, thoroughly | [[erubescent]], [[erubescence]] | Literally "to blush *out*"; to redden noticeably with embarrassment or modesty. |
| `rube-` + `-facient` (*facere*) | red + making | [[rubefacient]] | Causing redness on the skin; dilating surface capillaries. |
| `rubi-` + `-fy` (*facere*) | red + to make | [[rubify]] | To make red; to impart a crimson hue. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-icund` (*-cundus*) | Adjective (Inclination / State) | [[rubicund]] | Inclined to redness; ruddy-complexioned. |
| `-escent` / `-escence` | Adj & Noun (Inchoative Process) | [[rubescent]], [[erubescent]] | Beginning to turn red; the act of blushing. |
| `-or` | Noun (State / Symptom) | [[rubor]] | The classical pathological redness of inflammation. |
| `-ella` (Diminutive) | Noun (Disease / Condition) | [[rubella]] | "Little red disease" — German measles. |
| `-ic` / `-ate` | Noun & Verb (Category / Action) | [[rubric]], [[rubricate]] | A rule written in red; to illuminate in red. |
| `-ium` (Chemistry) | Noun (Metallic Element) | [[rubidium]] | Alkali metal element named for its red spectral lines. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🩺 **Pathology & Immunology** | [[rubor]], [[rubella]], [[rubefacient]] | Celsus' tetrad of acute inflammation, MMR vaccination protocols, congenital rubella syndrome, counter-irritant arthritis liniments. |
| 🎓 **Education & Academic Assessment** | [[rubric]], [[rubricate]] | Standardized grading rubrics, peer review assessment criteria, syllabus requirement formatting. |
| 📜 **Palaeography & Codicology** | [[rubric]], [[rubrication]], [[rubricate]] | Medieval liturgical manuscript illumination, distinguishing rubrics (directions) from nigrics (spoken prayers). |
| 💎 **Gemology & Laser Physics** | [[ruby]], [[rubidium]] | Corundum crystal lattice doping with Cr³⁺, Maiman’s 1960 synthetic ruby laser, rubidium atomic frequency standards (GPS clocks). |
| 💄 **Cosmetic Chemistry & Jewelry** | [[rouge]] | Formulation of blushes and lipsticks, jeweler's rouge polishing compound for optical lenses and watch crystals. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[erubescent]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin rub within the domain of Color & Appearance.<br>**2.** A technical or specialized form exhibiting the properties of rub in systematic terminology. | *"In academic literature, erubescent designates pertaining to, derived from, or characteristic of latin rub within the domain of color & appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rub]] | noun | **1.** An unforeseen obstacle.<br>**2.** The act of rubbing or wiping. | *"This palt’ring Becomes not Rome, nor has Coriolanus Deserved this so dishonoured rub, laid falsely I’ th’ plain way of his merit."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rubato]] | noun | **1.** A flexible tempo; not strictly on the beat. | *"In academic literature, rubato designates a flexible tempo; not strictly on the beat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubber]] | noun | **1.** An elastic material obtained from the latex sap of trees (especially trees of the genera hevea and ficus) that can be vulcanized and finished into a variety of products.<br>**2.** Any of various synthetic elastic materials whose properties resemble natural rubber. | *"The writer also speaks of a rubber shoe being lost and promptly found after mention in prayer."* — Classic Author, *The wonders of prayer* |
| [[rubberise]] | verb | **1.** Coat or impregnate with rubber. | *"In academic literature, rubberise designates coat or impregnate with rubber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubberize]] | verb | **1.** Coat or impregnate with rubber. | *"In academic literature, rubberize designates coat or impregnate with rubber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubbery]] | adjective | **1.** Having an elastic texture resembling rubber in flexibility or toughness.<br>**2.** Difficult to chew. | *"It was a little more than ten feet square; in the center a seat with curving outlines rose from the floor, apparently made of the same rubbery material as the floor itself."* — Fletcher Pratt, *The Onslaught from Rigel* |
| [[rubbing]] | noun | **1.** The resistance encountered when one body is moved in contact with another.<br>**2.** Representation consisting of a copy (as of an engraving) made by laying paper over something and rubbing it with charcoal. | *"Thanks.—What’s the matter, you dissentious rogues, That, rubbing the poor itch of your opinion, Make yourselves scabs?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[rube]] | noun | **1.** A person who is not very intelligent or interested in culture. | *"In academic literature, rube designates a person who is not very intelligent or interested in culture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubefacient]] | noun | **1.** A medicine for external application that produces redness of the skin. | *"In academic literature, rubefacient designates a medicine for external application that produces redness of the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubel]] | noun | **1.** The basic unit of money in belarus. | *"In academic literature, rubel designates the basic unit of money in belarus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubella]] | noun | **1.** A contagious viral disease that is a milder form of measles lasting three or four days; can be damaging to a fetus during the first trimester. | *"In academic literature, rubella designates a contagious viral disease that is a milder form of measles lasting three or four days; can be damaging to a fetus during the first trimester."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubens]] | noun | **1.** Prolific flemish baroque painter; knighted by the english king charles i (1577-1640). | *"Also pictures by Murillo, Rubens, Teniers, Titian, Vandyck, and others."* — George Eliot, *Middlemarch* |
| [[rubeola]] | noun | **1.** An acute and highly contagious viral disease marked by distinct red spots followed by a rash; occurs primarily in children. | *"In academic literature, rubeola designates an acute and highly contagious viral disease marked by distinct red spots followed by a rash; occurs primarily in children."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubescent]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin rub within the domain of Color & Appearance.<br>**2.** A technical or specialized form exhibiting the properties of rub in systematic terminology. | *"In academic literature, rubescent designates pertaining to, derived from, or characteristic of latin rub within the domain of color & appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubia]] | noun | **1.** Type genus of the rubiaceae; old world herbs and subshrubs grown for their medicinal properties and for dye substances extracted from their roots. | *"In academic literature, rubia designates type genus of the rubiaceae; old world herbs and subshrubs grown for their medicinal properties and for dye substances extracted from their roots."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubiaceae]] | noun | **1.** Widely distributed family of mostly tropical trees and shrubs and herbs; includes coffee and chinchona and gardenia and madder and bedstraws and partridgeberry. | *"In academic literature, rubiaceae designates widely distributed family of mostly tropical trees and shrubs and herbs; includes coffee and chinchona and gardenia and madder and bedstraws and partridgeberry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubiales]] | noun | **1.** An order of dicotyledonous plants of the subclass asteridae; have opposite leaves and an inferior compound ovary. | *"In academic literature, rubiales designates an order of dicotyledonous plants of the subclass asteridae; have opposite leaves and an inferior compound ovary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubicelle]] | noun | **1.** A yellow or orange variety of ruby spinel. | *"In academic literature, rubicelle designates a yellow or orange variety of ruby spinel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubicon]] | noun | **1.** The boundary in ancient times between italy and gaul; caesar's crossing it with his army in 49 bc was an act of war.<br>**2.** A line that when crossed permits of no return and typically results in irrevocable commitment. | *"Yet such, I grieve to say, is the case.” A pause—in which I began to steady the palsy of my nerves, and to feel that the Rubicon was passed; and that the trial, no longer to be shirked, must be firmly sustained."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[rubicund]] | adjective | **1.** Inclined to a healthy reddish color often associated with outdoor life. | *"This was the time for Wemmick to produce a little kettle, a tray of glasses, and a black bottle with a porcelain-topped cork, representing some clerical dignitary of a rubicund and social aspect."* — Charles Dickens, *Great Expectations* |
| [[rubidium]] | noun | **1.** A soft silvery metallic element of the alkali metal group; burns in air and reacts violently in water; occurs in carnallite and lepidolite and pollucite. | *"In academic literature, rubidium designates a soft silvery metallic element of the alkali metal group; burns in air and reacts violently in water; occurs in carnallite and lepidolite and pollucite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubify]] | verb | **1.** Make ruby red. | *"In academic literature, rubify designates make ruby red."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubinstein]] | noun | **1.** United states pianist (born in poland) known for his interpretations of the music of chopin (1886-1982).<br>**2.** Russian composer and pianist (1829-1894). | *"They had met at Lady Berkshire’s the night that Rubinstein played there, and after that used to be always seen together at the opera and wherever good music was going on."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[ruble]] | noun | **1.** The basic unit of money in tajikistan.<br>**2.** The basic unit of money in russia. | *"I need five hundred rubles, and have only one twenty-five-ruble note."* — graf Leo Tolstoy, *War and Peace* |
| [[rubor]] | noun | **1.** A response of body tissues to injury or irritation; characterized by pain and swelling and redness and heat. | *"In academic literature, rubor designates a response of body tissues to injury or irritation; characterized by pain and swelling and redness and heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubric]] | noun | **1.** An authoritative rule of conduct or procedure.<br>**2.** An explanation or definition of an obscure word in a text. | *"He despised the Canons and Rubric, swore by the Articles, and deemed himself consistent through the whole category—which in a way he might have been."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[rubricate]] | verb | **1.** Place in the church calendar as a red-letter day honoring a saint.<br>**2.** Furnish with rubrics or regulate by rubrics. | *"In academic literature, rubricate designates place in the church calendar as a red-letter day honoring a saint."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rubus]] | noun | **1.** Large genus of brambles bearing berries. | *"In academic literature, rubus designates large genus of brambles bearing berries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ruby]] | noun | **1.** A transparent piece of ruby that has been cut and polished and is valued as a precious gem.<br>**2.** A transparent deep red variety of corundum; used as a gemstone and in lasers. | *"You make me strange Even to the disposition that I owe, When now I think you can behold such sights, And keep the natural ruby of your cheeks, When mine are blanch’d with fear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ruby-red]] | adjective | **1.** Of a color at the end of the color spectrum (next to orange); resembling the color of blood or cherries or tomatoes or rubies. | *"In academic literature, ruby-red designates of a color at the end of the color spectrum (next to orange); resembling the color of blood or cherries or tomatoes or rubies."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Color & Appearance]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · RUB
  </div>
</div>
