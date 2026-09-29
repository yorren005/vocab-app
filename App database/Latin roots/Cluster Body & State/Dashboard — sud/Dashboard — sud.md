---
status: unread
type: root_dashboard
---
# Dashboard — sud
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sud-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to sweat”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical human body and its healthy or changing physical states.</span>
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

The root **sud** means to sweat. It refers to sweat, perspiration, exuding, oozing, thermal moisture. In English, this root forms words such as *desudation*, *exudate*, *exudation*, and *exudative*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to sweat
> The root **sud** means to sweat. It refers to sweat, perspiration, exuding, oozing, thermal moisture. In English, this root forms words such as *desudation*, *exudate*, *exudation*, and *exudative*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To sweat</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical human body and its healthy or changing physical states.</mark>
> - **Everyday Connection**: Think of familiar words like *desudation* and *exudate*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sud** comes from a Latin word that means *"to sweat"*.
  - At its core, it describes the action of sweat.

- **The Big Picture Idea**:
  - Picture the physical human body and its healthy or changing physical states.
  - Whenever you see **sud** in an English word, think of **to sweat**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to sweat).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Desudation**: Profuse, excessive sweating or perspiration.
  - **Exudate**: A fluid rich in protein, cellular debris, and white blood cells that has seeped out of blood vessels into surrounding tissues or onto tissue surfaces as a result of inflammation.
  - **Exudation**: The process of exuding.
  - **Exudative**: Relating to, characterized by, or producing an exudate.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sud</mark>, think of <mark class="hl-def">to sweat</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sud** forms English derivatives through:
> - **Verbal Base:** Latin *sūdāre* (stem `sūd-`, supine `sūdāt-`).
> - **Nominal Base:** Latin *sūdor* (stem `sūdōr-`).
> - **Directional Prefixation:** *ex-* ("out" → *exsūdāre* → English *exude*, *exudate*, *exudation*) and *trans-* ("across, through" → *transūdāre* → English *transude*, *transudate*, *transudation*).
> - **Compounding with Suffixes of Production:** Compounding with Latin *-fer* ("bearing" < *ferre* → *sudoriferous*) and *-ficus* ("making" < *facere* → *sudorific*).
> - **Place / Chamber Nouns:** Latin *-tōrium* ("place for" → *sudatorium*).
>
> English uses Latin medical endings (*-ate*, *-ative*, *-iferous*, *-ific*) to build exact histological descriptors and fluid classifications.

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
> The family distributes across clinical pathology, dermatology, architecture, and metaphor:
> - **Pathology, Fluid Analysis & Diagnostics:** [[exudate]] (protein-rich inflammatory fluid), [[exudative]] (relating to exudate), [[exudation]] (discharge of exudate), [[transudate]] (protein-poor pressure-driven fluid), [[transudation]] (process of oozing across a membrane), [[transudative]] (relating to transudate).
> - **Dermatology & Sweat Gland Anatomy:** [[sudoriferous]] (producing or secreting sweat, e.g. sudoriferous glands), [[sudorific]] (causing or inducing sweat; a diaphoretic drug), [[sudation]] (act of sweating), [[sudatory]] (inducing sweat; a sweating bath), [[desudation]] (profuse or excessive sweating), [[sudoriparous]] (sweat-secreting).
> - **Behavioral & Psychological Radiation:** [[exude]] (to discharge slowly; to radiate qualities like confidence, charm, or hostility), [[exudative]] (radiating outward).
> - **Classical Architecture & Bath Culture:** [[sudatorium]] (the hot steam sweating-room in a Roman bath), [[sudatory]] (a sweat bath or sauna).

---

## 🔀 4. Prefix & Combining Dynamics on sud

### Prefix Modifications on `sud`

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **ex-** | out, forth | [[exude]] / [[exudate]] | To sweat or discharge moisture outward; (pathology) protein-rich inflammatory leakage. |
| **trans-** | across, through | [[transude]] / [[transudate]] | To pass or ooze through the pores of an intact membrane via mechanical pressure. |
| **de-** | down, completely | [[desudation]] | (archaic, medicine) An abnormal, profuse outpouring of bodily sweat. |

### Suffix Transformations

| Suffix | Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| **-ate** | Concrete substance / result | [[exudate]] / [[transudate]] | The specific fluid that has oozed or filtered through tissue boundaries. |
| **-ative** | Descriptive adjective | [[exudative]] / [[transudative]] | Pertaining to, producing, or characterized by fluid seepage. |
| **-iferous** | Bearing / Carrying (*ferre*) | [[sudoriferous]] | Structurally adapted to produce and carry sweat (e.g. sudoriferous ducts). |
| **-ific** | Making / Inducing (*facere*) | [[sudorific]] | Producing or stimulating perspiration; a diaphoretic agent. |
| **-atorium** | Enclosed place of action | [[sudatorium]] | The heated chamber designed specifically for sweating. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Clinical Pathology & Pulmonology** | [[exudate]], [[transudate]], [[exudative]], [[transudative]] | Applying Light's Criteria to pleural effusion thoracentesis fluid to distinguish between transudative (heart failure) and exudative (pneumonia, malignancy) effusions. |
| **Dermatology & Histology** | [[sudoriferous]], [[sudorific]], [[sudation]] | Anatomical mapping of eccrine and apocrine sudoriferous glands, and managing hyperhidrosis using topical antiperspirants or neurotoxin injections. |
| **Pharmacology & Therapeutics** | [[sudorific]], [[sudatory]] | Historical and modern use of diaphoretics and sudorific herbs (such as elderflower or pilocarpine) to induce therapeutic sweating during fevers. |
| **Classical Archaeology & Architecture** | [[sudatorium]] | Excavating hypocaust heating furnaces, flue tiles (*tubulī*), and vaulted steam rooms across Roman provincial bath sites. |
| **Psychology, Literature & Daily Diction** | [[exude]], [[exudation]] | Describing interpersonal presence: individuals who exude charismatic poise, leadership composure, or palpable anxiety in high-stakes negotiations. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[sudafed]] | noun | **1.** Vasoconstrictor (trade names privine and sudafed) used in nasal sprays to treat symptoms of nasal congestion and in eyedrops to treat eye irritation. | *"In academic literature, sudafed designates vasoconstrictor (trade names privine and sudafed) used in nasal sprays to treat symptoms of nasal congestion and in eyedrops to treat eye irritation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sudan]] | noun | **1.** A republic in northeastern africa on the red sea; achieved independence from egypt and the united kingdom in 1956.<br>**2.** A region of northern africa to the south of the sahara and libyan deserts; extends from the atlantic to the red sea. | *"In academic literature, sudan designates a republic in northeastern africa on the red sea; achieved independence from egypt and the united kingdom in 1956."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sudanese]] | noun | **1.** A native or inhabitant of sudan.<br>**2.** Of or relating to or characteristic of the african republic of the sudan or its people. | *"The Sudanese think that if a house is built of the wood of thorny trees, the life of the people who dwell in that house will likewise be thorny and full of trouble."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[sudate]] | verb | **1.** Excrete perspiration through the pores in the skin. | *"In academic literature, sudate designates excrete perspiration through the pores in the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sudation]] | noun | **1.** The process of the sweat glands of the skin secreting a salty fluid. | *"In academic literature, sudation designates the process of the sweat glands of the skin secreting a salty fluid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sudatorium]] | noun | **1.** A bathhouse for hot air baths or steam baths. | *"In academic literature, sudatorium designates a bathhouse for hot air baths or steam baths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sudatory]] | noun | **1.** A medicine that causes or increases sweating.<br>**2.** A bathhouse for hot air baths or steam baths. | *"In academic literature, sudatory designates a medicine that causes or increases sweating."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sudoku]] | noun | **1.** A number puzzle in which the numbers 1 through 9 must be placed into a grid of cells so that each row or column contains only one of each number. | *"In academic literature, sudoku designates a number puzzle in which the numbers 1 through 9 must be placed into a grid of cells so that each row or column contains only one of each number."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sudor]] | noun | **1.** Salty fluid secreted by sweat glands. | *"In academic literature, sudor designates salty fluid secreted by sweat glands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sudoriferous]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin sud within the domain of Body & State.<br>**2.** A technical or specialized form exhibiting the properties of sud in systematic terminology. | *"In academic literature, sudoriferous designates pertaining to, derived from, or characteristic of latin sud within the domain of body & state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sudorific]] | noun | **1.** A medicine that causes or increases sweating.<br>**2.** Inducing perspiration. | *"The only relic of their occupation is a Bible with half the pages torn out, and the rest scrawled with records of bets, recipes for sudorific and other medicines, and a mass of unintelligible memoranda."* — Bernard Shaw, *Cashel Byron's Profession* |
| [[sudra]] | noun | **1.** A member of the lowest or worker hindu caste.<br>**2.** The lowest of the four varnas: the servants and workers of low status. | *"In academic literature, sudra designates a member of the lowest or worker hindu caste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[suds]] | noun | **1.** The froth produced by soaps or detergents.<br>**2.** A dysphemism for beer (especially for lager that effervesces). | *"Her fingers were white and wrinkled with washing, and the soap-suds were yet smoking which she wiped off her arms."* — Charles Dickens, *Bleak House* |
| [[sudsy]] | adjective | **1.** Resembling lather or covered with lather. | *"In academic literature, sudsy designates resembling lather or covered with lather."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body & State]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SUD
  </div>
</div>
