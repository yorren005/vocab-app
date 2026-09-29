---
status: unread
type: root_dashboard
---
# Dashboard — al
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">al-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to nourish, feed, or grow”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Gathering at a dining table to share nourishment, bread, and refreshing water.</span>
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

The root **al** means to nourish, feed, or grow. It refers to becoming larger over time, developing naturally, or expanding in size. In English, this root forms words such as *alimentary*, *alimony*, *alma mater*, and *alumnus*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to nourish, feed, or grow
> The root **al** means to nourish, feed, or grow. It refers to becoming larger over time, developing naturally, or expanding in size. In English, this root forms words such as *alimentary*, *alimony*, *alma mater*, and *alumnus*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To nourish, feed, or grow</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering at a dining table to share nourishment, bread, and refreshing water.</mark>
> - **Everyday Connection**: Think of familiar words like *alimentary* and *alimony*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **al** comes from a Latin word that means *"to nourish, feed, or grow"*.
  - At its core, it describes the action of nourish, feed, or grow.

- **The Big Picture Idea**:
  - Picture gathering at a dining table to share nourishment, bread, and refreshing water.
  - Whenever you see **al** in an English word, think of **to nourish, feed, or grow**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to nourish, feed, or grow).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Alimentary**: Relating to food, nutrition, or the digestive process.
  - **Alimony**: A court-ordered financial allowance paid by one spouse to the other for support and maintenance during separation or following a divorce.
  - **Alma mater**: The university, college, or school that one attended and graduated from.
  - **Alumnus**: A former student or graduate of a specific school, college, or university.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">al</mark>, think of <mark class="hl-def">to nourish, feed, or grow</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Stem Engines
> The root **al** builds English vocabulary across four distinct morphological channels:
>
> 1. **The Direct Nutritional Stem `ali-` / `alim-`** (from *alere* & *alimentum* / *alimōnia*):
>    - Physical nutrition nouns and adjectives: *aliment*, *alimentary*, *alimentation*, *alimentative*.
>    - Nutrition capacity adjective: *alible* (< Latin *alibilis* "nutritious").
>    - Legal sustenance noun: *alimony*.
> 2. **The Inchoative Growth Stem `adolesc-` / `adult-`** (from *adolēscere* "grow toward"):
>    - Ongoing process: *adolesce*, *adolescence*, *adolescent*, *adolescently*.
>    - Completed state: *adult*, *adulthood*.
> 3. **The Inchoative Unification Stem `coalesc-` / `coalit-`** (from *coalēscere* "grow together"):
>    - Dynamic fusion verb: *coalesce*.
>    - State and property: *coalescence*, *coalescent*.
>    - Political alliance: *coalition*, *coalitionist*.
> 4. **The Mediopassive & Bountiful Stem `alumn-` & `alm-`** (from *alumnus* & *almus*):
>    - Academic institutional terms: *alumnus*, *alumna*, *alumni*, *alumnae*.
>    - Cherished phrase: *alma mater*.

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

> [!tip] 🌈 The Four Conceptual Provinces of `al`
>
> ```
>                           ┌── 1. Biological Digestion & Sustenance (aliment, alimentary, alible)
>                           ├── 2. Legal Spousal Maintenance (alimony)
>   [al: nourish / grow] ───┼── 3. Human Developmental Maturation (adolescent, adult, adulthood)
>                           ├── 4. Organic Fusion & Political Alliances (coalesce, coalition)
>                           └── 5. Academic Heritage & Intellectual Fosterage (alumnus, alma mater)
> ```
>
> 1. **Biological Digestion, Nutrition & Sustenance:**
>    - The physical processing of food by organisms: *aliment* (food), *alimentary* (the digestive canal), *alimentation*, *alible* (nourishing).
> 2. **Family Law & Spousal Maintenance:**
>    - The legal enforcement of food and living support after divorce: *alimony*.
> 3. **Human Developmental Biology & Maturation:**
>    - The continuum from youthful physical development to mature adulthood: *adolescent* (growing up), *adolescence*, *adult* (fully grown), *adulthood*.
> 4. **Organic Fusion, Physics & Political Coalitions:**
>    - Distinct elements or factions joining and growing into a single entity: *coalesce* (fuse together), *coalescence*, *coalition* (political alliance).
> 5. **Academic Heritage & Nurturing Institutions:**
>    - Intellectual foster-children and their educational "mother": *alumnus* / *alumna* (one who has been nourished), *alma mater* (nourishing university).

---

## 🔀 4. Prefix & Combining Dynamics on al

### Prefix Dynamics

| Prefix | Morpheme Meaning | Latin Source Compound | English Derivative | Resulting Semantic Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| `ad-` | toward, up to | *adolēscere* | [[adolescent]], [[adult]] | To grow *toward* full physical maturity; to complete the growth cycle. |
| `co-` / `con-` | together, jointly | *coalēscere* | [[coalesce]], [[coalition]] | To grow *together*; disparate entities fusing into an indivisible whole. |

### Suffix Transformations

| Suffix | Linguistic Function | Combined Form | English Derivative | Resulting Semantic Function |
| :--- | :--- | :--- | :--- | :--- |
| `-ment` | Noun of concrete sustenance | *alere* + *-mentum* | [[aliment]] | Food or substance that provides bodily sustenance. |
| `-ary` | Adjective (Pertaining to) | *alimentum* + *-ārius* | [[alimentary]] | Relating to food or the organs of digestion. |
| `-ation` | Noun of action or process | *alimentāre* + *-tiō* | [[alimentation]] | The process of nourishing or supplying food. |
| `-ible` | Adjective (Capable of) | *alere* + *-ibilis* | [[alible]] | Capable of nourishing; nutritious. |
| `-mony` | Noun of condition/allowance | *alere* + *-mōnia* | [[alimony]] | Court-ordered spousal allowance for living expenses. |
| `-escent` | Adjective (Inchoative process) | *adolēscere* + *-ent* | [[adolescent]] | In the active process of growing up. |
| `-ence` | Noun of state or stage | *adolēscere* + *-ence* | [[adolescence]], [[coalescence]] | The transitional phase of growth or fusion. |
| `-tion` | Noun of result | *coalitum* + *-iō* | [[coalition]] | A union formed by growing together. |
| `-mnus` (Latin) | Mediopassive participle | *alere* + *-mnus* | [[alumnus]], [[alumna]] | A student nurtured and educated by an institution. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Core Lexical Terms | Concrete Professional & Historical Application |
| :--- | :--- | :--- |
| 🩺 **Gastroenterology & Human Anatomy** | [[alimentary]], [[alimentation]], [[alible]] | The **alimentary canal** (spanning the oral cavity, esophagus, stomach, and intestines) coordinates the enzymatic digestion and absorption of nutrients. Clinical protocols govern enteral and parenteral **alimentation**. |
| ⚖️ **Family Law & Matrimonial Jurisprudence** | [[alimony]] | Family courts adjudicate **alimony** (also termed spousal maintenance) based on marriage duration, earning disparity, and standard of living established during cohabitation. |
| 🧠 **Developmental Psychology & Pediatrics** | [[adolescent]], [[adolescence]], [[adult]], [[adulthood]] | Developmental psychologists study **adolescent** neurobiology—specifically the asynchronous maturation of the prefrontal cortex relative to the limbic reward system. |
| 🏛️ **Political Science & Parliamentary Governance** | [[coalition]], [[coalitionist]] | In parliamentary democracies (such as Germany or the UK), when no single party secures an absolute majority, rival parties negotiate a formal **coalition government** based on a shared legislative program. |
| 🎓 **Higher Education & University Advancement** | [[alumnus]], [[alumna]], [[alumni]], [[alma mater]] | University advancement offices cultivate **alumni** networks to raise philanthropic endowments, mentor undergraduates, and celebrate institutional heritage (**alma mater**). |
| 🧪 **Colloid Physics & Astronomy** | [[coalesce]], [[coalescence]] | In meteorology and cloud physics, raindrop formation requires the **coalescence** of tiny cloud droplets; in gravitational astrophysics, two orbiting black holes **coalesce** into a single singularity, emitting gravitational waves. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[agal]] | noun | **1.** A cord (usually of goat's hair) that arabs (especially bedouins) wind around their heads to hold down the kaffiyeh. | *"In academic literature, agal designates a cord (usually of goat's hair) that arabs (especially bedouins) wind around their heads to hold down the kaffiyeh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[al]] | noun | **1.** A silvery ductile metallic element found primarily in bauxite.<br>**2.** A state in the southeastern united states on the gulf of mexico; one of the confederate states during the american civil war. | *"John is also a day of joy for the Provençals."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[alacritous]] | adjective | **1.** Quick and eager. | *"In academic literature, alacritous designates quick and eager."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alacrity]] | noun | **1.** Liveliness and eagerness. | *"The tyrant custom, most grave senators, Hath made the flinty and steel couch of war My thrice-driven bed of down: I do agnize A natural and prompt alacrity I find in hardness, and do undertake This present wars against the Ottomites."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[albedo]] | noun | **1.** The ratio of reflected to incident light. | *"In academic literature, albedo designates the ratio of reflected to incident light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albescent]] | adjective | **1.** Becoming or shading into white. | *"In academic literature, albescent designates becoming or shading into white."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albite]] | noun | **1.** A widely distributed feldspar that forms rocks. | *"In academic literature, albite designates a widely distributed feldspar that forms rocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[albitic]] | adjective | **1.** Of or related to albite feldspar. | *"In academic literature, albitic designates of or related to albite feldspar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alible]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin al within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of al in systematic terminology. | *"In academic literature, alible designates pertaining to, derived from, or characteristic of latin al within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aliment]] | noun | **1.** A source of materials to nourish the body.<br>**2.** Give nourishment to. | *"In the Propontis, as far as I can learn, none of that peculiar substance called _brit_ is to be found, the aliment of the right whale."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[alimentary]] | adjective | **1.** Of or providing nourishment. | *"One thing is certain, that in the year 615 before Jesus Christ, Necos undertook the works of an alimentary canal to the waters of the Nile across the plain of Egypt, looking towards Arabia."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[alimentation]] | noun | **1.** A source of materials to nourish the body.<br>**2.** The act of supplying food and nourishment. | *"In academic literature, alimentation designates a source of materials to nourish the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alimentative]] | adjective | **1.** Related to the supply of aliment. | *"In academic literature, alimentative designates related to the supply of aliment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[alimony]] | noun | **1.** Court-ordered support paid by one spouse to another after they are separated. | *"And would a jury give me five shillings alimony tomorrow, eh?"* — James Joyce, *Ulysses* |
| [[allocution]] | noun | **1.** (rhetoric) a formal or authoritative address that advises or exhorts. | *"The worthies began a revolution, Which if on earth you intend to acknowledge, Why, honor them now! (ends my allocution) Nor confer your degree when the folks leave college. 21."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[anal]] | adjective | **1.** Of or related to the anus.<br>**2.** A stage in psychosexual development when the child's interest is concentrated on the anal region; fixation at this stage is said to result in orderliness, meanness, stubbornness, compulsiveness, etc. | *"Cf. de Faye, p. 218. [106] Expressions taken from Aristotle, _Anal."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[animal]] | noun | **1.** A living organism characterized by voluntary movement.<br>**2.** Marked by the appetites and passions of the body. | *"Thou art the thing itself: unaccommodated man is no more but such a poor, bare, forked animal as thou art."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[animalise]] | verb | **1.** Represent in the form of an animal.<br>**2.** Make brutal, unfeeling, or inhuman. | *"In academic literature, animalise designates represent in the form of an animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animalism]] | noun | **1.** The doctrine that human beings are purely animal in nature and lacking a spiritual nature.<br>**2.** Preoccupation with satisfaction of physical drives and appetites. | *"Some might risk the odd paradox that with more animalism he would have been the nobler man."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[animalistic]] | adjective | **1.** Of or pertaining to animalism. | *"In academic literature, animalistic designates of or pertaining to animalism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[animality]] | noun | **1.** The physical (or animal) side of a person as opposed to the spirit or intellect. | *"He that touches the hem 569:12 of Christ's robe and masters his mortal beliefs, animality, and hate, rejoices in the proof of healing, - in a sweet and certain sense that God is Love."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[animalize]] | verb | **1.** Represent in the form of an animal.<br>**2.** Make brutal, unfeeling, or inhuman. | *"In academic literature, animalize designates represent in the form of an animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anticlerical]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin al within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of al in systematic terminology. | *"In academic literature, anticlerical designates pertaining to, derived from, or characteristic of latin al within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[archival]] | adjective | **1.** Of or relating to or contained in or serving as an archive. | *"In academic literature, archival designates of or relating to or contained in or serving as an archive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[auroral]] | adjective | **1.** Of or relating to the atmospheric phenomenon auroras.<br>**2.** Characteristic of the dawn. | *"In academic literature, auroral designates of or relating to the atmospheric phenomenon auroras."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bifocals]] | noun | **1.** Eyeglasses having two focal lengths, one for near vision and the other for far vision. | *"In academic literature, bifocals designates eyeglasses having two focal lengths, one for near vision and the other for far vision."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[caldera]] | noun | **1.** A large crater caused by the violent explosion of a volcano that collapses into a depression. | *"In academic literature, caldera designates a large crater caused by the violent explosion of a volcano that collapses into a depression."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calor]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin al within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of al in systematic terminology. | *"In academic literature, calor designates pertaining to, derived from, or characteristic of latin al within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cataloger]] | noun | **1.** A librarian who classifies publication according to a categorial system. | *"In academic literature, cataloger designates a librarian who classifies publication according to a categorial system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalogue]] | noun | **1.** A complete list of things; usually arranged systematically.<br>**2.** A book or pamphlet containing an enumeration of things. | *"I say I am your mother, And put you in the catalogue of those That were enwombed mine. ’Tis often seen Adoption strives with nature, and choice breeds A native slip to us from foreign seeds."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cataloguer]] | noun | **1.** A librarian who classifies publication according to a categorial system. | *"In academic literature, cataloguer designates a librarian who classifies publication according to a categorial system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coal]] | noun | **1.** Fossil fuel consisting of carbonized vegetable matter deposited in the carboniferous period.<br>**2.** A hot fragment of wood or coal that is left from a fire and is glowing or smoldering. | *"You are no surer, no, Than is the coal of fire upon the ice Or hailstone in the sun."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[coalesce]] | verb | **1.** Mix together different elements.<br>**2.** Fuse or cause to grow together. | *"Inferior and unspiritual methods of healing may try to make Mind and drugs coalesce, but the two will 144:1 not mingle scientifically."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[coalesced]] | verb | **1.** Mix together different elements.<br>**2.** Fuse or cause to grow together. | *"Now and again several nodules coalesced and formed tiny rivulets."* — Jack London, *The Jacket (The Star-Rover)* |
| [[coalescence]] | noun | **1.** The union of diverse things into one body or form or group; the growing together of parts. | *"Impossible coalescence Mind is the grand creator, and there can be no power 143:27 except that which is derived from Mind."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[coalescency]] | noun | **1.** The union of diverse things into one body or form or group; the growing together of parts. | *"In academic literature, coalescency designates the union of diverse things into one body or form or group; the growing together of parts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coalescent]] | adjective | **1.** Growing together, fusing. | *"In academic literature, coalescent designates growing together, fusing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coalescing]] | verb | **1.** Mix together different elements.<br>**2.** Fuse or cause to grow together. | *"I hold it to be the wondrously thin, ruptured membranes of the case, coalescing."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[coalition]] | noun | **1.** An organization of people (or countries) involved in a pact or treaty.<br>**2.** The state of being combined into one body. | *"Could he some commutation broach, I’ll pledge my aith in guid braid Scotch, He needna fear their foul reproach Nor erudition, Yon mixtie-maxtie, queer hotch-potch, The Coalition."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[colloquialism]] | noun | **1.** A colloquial expression; characteristic of spoken or written communication that seeks to imitate informal speech. | *"In academic literature, colloquialism designates a colloquial expression; characteristic of spoken or written communication that seeks to imitate informal speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comal]] | adjective | **1.** Of certain seeds (such as cotton) having a tuft or tufts of hair. | *"In academic literature, comal designates of certain seeds (such as cotton) having a tuft or tufts of hair."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[comical]] | adjective | **1.** Arousing or provoking laughter. | *"The best actors in the world, either for tragedy, comedy, history, pastoral, pastoral-comical, historical-pastoral, tragical-historical, tragical-comical-historical-pastoral, scene individable, or poem unlimited."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[comicality]] | noun | **1.** The quality of being comical. | *"Skimpole, his genial face irradiated by the comicality of this idea, “what am I to do?"* — Charles Dickens, *Bleak House* |
| [[comically]] | adverb | **1.** In a comical manner. | *"Nothing could have been more circumspect-- comically circumspect! between Selincourt and Isabel and the chambermaid, malice itself was put to silence."* — Anthony Pryde, *Nightfall* |
| [[contextual]] | adjective | **1.** Relating to or determined by or in context. | *"In academic literature, contextual designates relating to or determined by or in context."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contextualism]] | noun | **1.** Any doctrine emphasizing the importance of the context in solving problems or establishing the meaning of terms. | *"In academic literature, contextualism designates any doctrine emphasizing the importance of the context in solving problems or establishing the meaning of terms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contextually]] | adverb | **1.** In a manner dependent on context. | *"In academic literature, contextually designates in a manner dependent on context."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coral]] | noun | **1.** A variable color averaging a deep pink.<br>**2.** The hard stony skeleton of a mediterranean coral that has a delicate red or pink color and is used for jewelry. | *"Tranio, I saw her coral lips to move, And with her breath she did perfume the air; Sacred and sweet was all I saw in her."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cordial]] | noun | **1.** Strong highly flavored sweet liquor usually drunk after a meal.<br>**2.** Diffusing warmth and friendliness. | *"I do not know What is more cordial."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[cordiality]] | noun | **1.** A cordial disposition. | *"Bucket with extreme cordiality."* — Charles Dickens, *Bleak House* |
| [[cordially]] | adverb | **1.** In a hearty manner. | *"Maxa's first impulse was to withdraw with an excuse, but the ladies had jumped up already and most cordially greeted their kind friend, Mr Falcon, whom they called their helper and saviour in all difficulties."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[coxalgic]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin al within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of al in systematic terminology. | *"In academic literature, coxalgic designates pertaining to, derived from, or characteristic of latin al within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[craniofacial]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin al within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of al in systematic terminology. | *"In academic literature, craniofacial designates pertaining to, derived from, or characteristic of latin al within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminal]] | noun | **1.** Someone who has committed a crime or has been legally convicted of a crime.<br>**2.** Bringing or deserving severe rebuke or censure. | *"What you have seen him do and heard him speak, Beating your officers, cursing yourselves, Opposing laws with strokes, and here defying Those whose great power must try him—even this, So criminal and in such capital kind, Deserves th’ extremest death."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[criminalise]] | verb | **1.** Declare illegal; outlaw. | *"In academic literature, criminalise designates declare illegal; outlaw."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminalism]] | noun | **1.** The state of being a criminal. | *"In academic literature, criminalism designates the state of being a criminal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminality]] | noun | **1.** The state of being a criminal. | *"The criminality of wastefulness irritated me."* — Jack London, *The Jacket (The Star-Rover)* |
| [[criminalize]] | verb | **1.** Treat as a criminal.<br>**2.** Declare illegal; outlaw. | *"In academic literature, criminalize designates treat as a criminal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[criminally]] | adverb | **1.** In a shameful manner.<br>**2.** In violation of the law; in a criminal manner. | *"Exhibiting unparalleled magnanimity, it criminally punished no man for political offenses, and warmly welcomed all who proved their loyalty by obeying the laws and dealing justly with their neighbors."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[criminalness]] | noun | **1.** The state of being a criminal. | *"In academic literature, criminalness designates the state of being a criminal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deal]] | noun | **1.** A particular instance of buying or selling.<br>**2.** An agreement between parties (usually arrived at after discussion) fixing obligations of each. | *"Indeed, good lady, The fellow has a deal of that too much, Which holds him much to have."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dealer]] | noun | **1.** Someone who purchases and maintains an inventory of goods to be sold.<br>**2.** A firm engaged in trading. | *"The plainer dealer, the sooner lost."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dealership]] | noun | **1.** A business established or operated under an authorization to sell or distribute a company's goods or services in a particular area. | *"In academic literature, dealership designates a business established or operated under an authorization to sell or distribute a company's goods or services in a particular area."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dealing]] | noun | **1.** Method or manner of conduct in relation to others.<br>**2.** The act of transacting within or between groups (as carrying on commercial activities). | *"There is no honesty in such dealing, unless a woman should be made an ass and a beast, to bear every knave’s wrong."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dealings]] | noun | **1.** Social or verbal interchange (usually followed by `with').<br>**2.** Mutual dealings or connections or communications among persons or groups. | *"O father Abram, what these Christians are, Whose own hard dealings teaches them suspect The thoughts of others."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[decriminalise]] | verb | **1.** Make legal. | *"In academic literature, decriminalise designates make legal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decriminalize]] | verb | **1.** Make legal. | *"In academic literature, decriminalize designates make legal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dial]] | noun | **1.** The face of a timepiece; graduated to show the hours.<br>**2.** The control on a radio or television set that is used for tuning. | *"The wrinkles which thy glass will truly show, Of mouthed graves will give thee memory, Thou by thy dial’s shady stealth mayst know, Time’s thievish progress to eternity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[irreality]] | noun | **1.** The state of being insubstantial or imaginary; not existing objectively or in fact. | *"In academic literature, irreality designates the state of being insubstantial or imaginary; not existing objectively or in fact."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misdeal]] | noun | **1.** An incorrect deal.<br>**2.** Deal cards wrongly. | *"In academic literature, misdeal designates an incorrect deal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opal]] | noun | **1.** A translucent mineral consisting of hydrated silica of variable color; some varieties are used as gemstones. | *"Now the melancholy god protect thee, and the tailor make thy doublet of changeable taffeta, for thy mind is a very opal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[opalise]] | verb | **1.** Make opalescent.<br>**2.** Replace or convert into opal. | *"In academic literature, opalise designates make opalescent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[opalize]] | verb | **1.** Make opalescent.<br>**2.** Replace or convert into opal. | *"In academic literature, opalize designates make opalescent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orally]] | adverb | **1.** (of drugs) through the mouth rather than through injection; by_mouth.<br>**2.** By spoken rather than written means. | *"So he played a more coaxing game; and while never going beyond words, or attempting the renewal of caresses, he did his utmost orally."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[oratorical]] | adjective | **1.** Characteristic of an orator or oratory; ; - robert graves. | *"Gavin Hamilton—Holy Willie and his priest, Father Auld, after full hearing in the presbytery of Ayr, came off but second best; owing partly to the oratorical powers of Mr."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[palliate]] | verb | **1.** Lessen or to try to lessen the seriousness or extent of.<br>**2.** Provide physical relief, as from pain. | *"To her and her like, birth itself was an ordeal of degrading personal compulsion, whose gratuitousness nothing in the result seemed to justify, and at best could only palliate."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[palliating]] | verb | **1.** Lessen or to try to lessen the seriousness or extent of.<br>**2.** Provide physical relief, as from pain. | *"In academic literature, palliating designates lessen or to try to lessen the seriousness or extent of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palliation]] | noun | **1.** Easing the severity of a pain or a disease without removing the cause.<br>**2.** To act in such a way as to cause an offense to seem less serious. | *"She could neither wonder nor condemn; but the belief of his self-conquest brought nothing consolatory to her bosom, afforded no palliation of her distress."* — Jane Austen, *Pride and Prejudice* |
| [[palliative]] | noun | **1.** Remedy that alleviates pain without curing.<br>**2.** Moderating pain or sorrow by making it easier to bear. | *"But dearest,” he continued in a palliative voice, “don’t be like it!” Oak sighed a deep honest sigh—none the less so in that, being like the sigh of a pine plantation, it was rather noticeable as a disturbance of the atmosphere."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[postal]] | adjective | **1.** Of or relating to the system for delivering mail. | *"_I am afraid I did not direct that letter right_." He sent a second postal card, asking if a letter had been received at her home; if not, to go to her post office and inquire."* — Classic Author, *The wonders of prayer* |
| [[preanal]] | adjective | **1.** Situated in front of the anus. | *"In academic literature, preanal designates situated in front of the anus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[precordial]] | adjective | **1.** In front of the heart; involving the precordium. | *"In academic literature, precordial designates in front of the heart; involving the precordium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[real]] | noun | **1.** Any rational or irrational number.<br>**2.** The basic unit of money in brazil; equal to 100 centavos. | *"A real ghost could rush towards us, mad with rage, if we challenged him that way."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[realisation]] | noun | **1.** A musical composition that has been completed or enriched by someone other than the composer.<br>**2.** Coming to understand something clearly and distinctly. | *"Sometimes, for a fleeting moment, I thought I caught a glance, heard a tone, beheld a form, which announced the realisation of my dream: but I was presently undeceived."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[realise]] | verb | **1.** Earn on some commercial or business transaction; earn as salary or wages.<br>**2.** Convert into cash; of goods and property. | *"It was only as I walked away, hearing my own steps and those of Lecamus ringing upon the pavement, that I began to realise what had happened."* — Mrs. Oliphant, *A Beleaguered City* |
| [[realism]] | noun | **1.** The attribute of accepting the facts of life and favoring practicality and literal truth.<br>**2.** The state of being actual or real. | *"It is the mixture of sheer realism with absurdity that makes the irony and gives it its force."* — T. R. Glover, *The Jesus of History* |
| [[realist]] | noun | **1.** A philosopher who believes that universals are real and exist independently of anyone thinking of them.<br>**2.** A person who accepts the world as it literally is and deals with it accordingly. | *"On the other hand, we are realists."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[realistic]] | adjective | **1.** Aware or expressing awareness of things as they really are.<br>**2.** Representing what is real; not abstract or ideal. | *"We have in our police reports realism pushed to its extreme limits, and yet the result is, it must be confessed, neither fascinating nor artistic.” “A certain selection and discretion must be used in producing a realistic effect,” remarked Holmes."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[reality]] | noun | **1.** All of your experiences that determine how things appear to you.<br>**2.** The state of being actual or real. | *"He is presently reassured on these subjects by the unchallengeable reality of Mrs."* — Charles Dickens, *Bleak House* |
| [[realization]] | noun | **1.** Coming to understand something clearly and distinctly.<br>**2.** Making real or giving the appearance of reality. | *"Now came the realization that things might be different."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[realize]] | verb | **1.** Be fully aware or cognizant of.<br>**2.** Perceive (an idea or situation) mentally. | *"You realize well enough that all the talk has no foundation whatever." Mrs."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[really]] | adverb | **1.** In accordance with truth or fact or reality.<br>**2.** In actual fact. | *"I would I were really that I am delivered to be."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[realness]] | noun | **1.** The state of being actual or real. | *"In academic literature, realness designates the state of being actual or real."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reseal]] | verb | **1.** Seal again. | *"In academic literature, reseal designates seal again."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[seal]] | noun | **1.** Fastener consisting of a resinous composition that is plastic when warm; used for sealing documents and parcels and letters.<br>**2.** A device incised to make an impression; used to secure a closing or to authenticate documents. | *"But when we in our viciousness grow hard— O misery on’t!—the wise gods seal our eyes, In our own filth drop our clear judgments, make us Adore our errors, laugh at’s while we strut To our confusion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sealant]] | noun | **1.** A kind of sealing material that is used to form a hard coating on a porous surface (as a coat of paint or varnish used to size a surface). | *"In academic literature, sealant designates a kind of sealing material that is used to form a hard coating on a porous surface (as a coat of paint or varnish used to size a surface)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sealed]] | verb | **1.** Make tight; secure against leakage.<br>**2.** Close with or as if with a seal. | *"I crave our composition may be written And sealed between us."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sealer]] | noun | **1.** A kind of sealing material that is used to form a hard coating on a porous surface (as a coat of paint or varnish used to size a surface).<br>**2.** An official who affixes a seal to a document. | *"In academic literature, sealer designates a kind of sealing material that is used to form a hard coating on a porous surface (as a coat of paint or varnish used to size a surface)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sealing]] | noun | **1.** The act of treating something to make it repel water.<br>**2.** Make tight; secure against leakage. | *"With the round top of an inkstand and two broken bits of sealing-wax he is silently and slowly working out whatever train of indecision is in his mind."* — Charles Dickens, *Bleak House* |
| [[senatorial]] | adjective | **1.** Of or relating to senators. | *"As a result, union labour possessing an important political significance at the time, the time-serving politicians at Sacramento appointed a senatorial committee of investigation of the state prisons."* — Jack London, *The Jacket (The Star-Rover)* |
| [[septennial]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin al within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of al in systematic terminology. | *"Is it to be presumed, that at any future septennial epoch the same State will be free from parties?"* — Alexander Hamilton, *The Federalist Papers* |
| [[supracostal]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin al within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of al in systematic terminology. | *"In academic literature, supracostal designates pertaining to, derived from, or characteristic of latin al within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[surreal]] | adjective | **1.** Characterized by fantastic imagery and incongruous juxtapositions; --j.c.powys.<br>**2.** Resembling a dream. | *"In academic literature, surreal designates characterized by fantastic imagery and incongruous juxtapositions; --j.c.powys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tegmental]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin al within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of al in systematic terminology. | *"In academic literature, tegmental designates pertaining to, derived from, or characteristic of latin al within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[textural]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin al within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of al in systematic terminology. | *"In academic literature, textural designates pertaining to, derived from, or characteristic of latin al within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncordial]] | adjective | **1.** Lacking warmth or friendliness. | *"In academic literature, uncordial designates lacking warmth or friendliness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[underseal]] | noun | **1.** Seal consisting of a coating of a tar or rubberlike material on the underside of a motor vehicle to retard corrosion. | *"In academic literature, underseal designates seal consisting of a coating of a tar or rubberlike material on the underside of a motor vehicle to retard corrosion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undersealed]] | adjective | **1.** (of motor vehicles) having a coating of tar or other rustproof material applied to the underside. | *"In academic literature, undersealed designates (of motor vehicles) having a coating of tar or other rustproof material applied to the underside."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unreal]] | adjective | **1.** Lacking in reality or substance or genuineness; not corresponding to acknowledged facts or criteria.<br>**2.** Not actually such; being or seeming fanciful or imaginary. | *"Unreal mock’ry, hence! [_Ghost disappears._] Why, so;—being gone, I am a man again.—Pray you, sit still."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unrealism]] | noun | **1.** A representation having no reference to concrete objects or specific examples. | *"In academic literature, unrealism designates a representation having no reference to concrete objects or specific examples."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unrealistic]] | adjective | **1.** Not realistic. | *"It's downright unrealistic to keep our self-defense forces in the Special Zone so far below what's needed to protect our vital interests." "What do you suggest, Jim," the President shrugged, "break our treaties with the Outer Region?"* — Meyer Moldeven, *The Universe — or Nothing* |
| [[unreality]] | noun | **1.** The quality possessed by something that is unreal.<br>**2.** The state of being insubstantial or imaginary; not existing objectively or in fact. | *"The forms in which he gave it expression are predominantly melancholy, because this kind of idealism, with its insistence on the unreality of evil, is the recoil from life of an unsatisfied and disappointed soul."* — Sydney Waterlow, *Shelley* |
| [[unseal]] | verb | **1.** Break the seal of. | *"Therefore your oaths Are words and poor conditions; but unseal’d,— At least in my opinion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unsealed]] | verb | **1.** Break the seal of.<br>**2.** Not established or confirmed. | *"At length, when the last pint is casked, and all is cool, then the great hatchways are unsealed, the bowels of the ship are thrown open, and down go the casks to their final rest in the sea."* — Herman Melville, *Moby-Dick; or, The Whale* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Food, Eating & Drink]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · AL
  </div>
</div>
