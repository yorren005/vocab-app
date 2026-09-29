---
status: unread
type: root_dashboard
---
# Dashboard — nutri
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">nutri-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to nourish”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A young seed sprouting vigorously into green leaves under the warm sun.</span>
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

The root **nutri** means to nourish. It refers to the action of nourishing and carrying out this process. In English, this root forms words such as *nourish*, *nourishing*, *nourishment*, and *nurse*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to nourish
> The root **nutri** means to nourish. It refers to the action of nourishing and carrying out this process. In English, this root forms words such as *nourish*, *nourishing*, *nourishment*, and *nurse*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To nourish</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A young seed sprouting vigorously into green leaves under the warm sun.</mark>
> - **Everyday Connection**: Think of familiar words like *nourish* and *nourishing*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **nutri** comes from a Latin word that means *"to nourish"*.
  - At its core, it describes the action of nourish.

- **The Big Picture Idea**:
  - Picture a young seed sprouting vigorously into green leaves under the warm sun.
  - Whenever you see **nutri** in an English word, think of **to nourish**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to nourish).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Nourish**: To provide with food or other substances necessary for growth, health, and good condition.
  - **Nourishing**: Containing substances necessary for physical health, vigor, and bodily growth.
  - **Nourishment**: Food or other substance necessary for maintaining life, growth, and health.
  - **Nurse**: A healthcare professional trained to care for the sick.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">nutri</mark>, think of <mark class="hl-def">to nourish</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **nutri** generates English vocabulary through four distinct morphological conduits:
> - **Latin Verbal Base `nutri-` / `nutrit-` (*nūtrīre*, *nūtrītum*):**
>   - *nutrient*, *nutriment*, *nutrition*, *nutritional*, *nutritionist*, *nutritious*, *nutritive*, *nutritiousness*
>   - Prefixed with `in-` (lack of) $\to$ *innutrition*, *innutritious*
>   - Prefixed with `mal-` (bad) $\to$ *malnutrition*, *malnourished*
>   - Prefixed with `under-` / `over-` $\to$ *undernutrition*, *overnutrition*
> - **Agent / Feminine Base `nutric-` (*nūtrīx*, *nūtrīcis*):**
>   - *nutrice* (archaic wet nurse), *nutricial*
> - **Romance Contraction Base `nurs-` (via Old French *norrice* < Late Latin *nūtrīcia*):**
>   - *nurse*, *nursery*, *nursing*, *nursling*, *nursemaid*
> - **Romance Participial Base `nour-` / `nourish-` (via Old French *noriss-* < *nūtrīre*):**
>   - *nourish*, *nourishing*, *nourishment*, *undernourished*
> - **Modern Portmanteau:**
>   - *nutrient* + *pharmaceutical* $\to$ *nutraceutical*

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
> The root operates across five distinct conceptual spheres:
> - **Biochemical Sustenance & Dietary Metabolism:** Essential chemical substances required for cellular repair and energy (*nutrient*, *macronutrient*, *micronutrient*, *nutritious*).
> - **Clinical Caregiving & Hospital Practice:** Healthcare professionals dedicated to patient treatment and comfort (*nurse*, *nursing*, *nursemaid*).
> - **Horticulture & Ecological Incubation:** Controlled facilities where young plants, seedlings, or fish are nurtured (*nursery*).
> - **Nutritional Pathology & Global Health:** Severe dietary deficiencies and imbalances (*malnutrition*, *innutrition*, *undernutrition*, *malnourished*).
> - **Emotional, Intellectual & Artistic Cultivation:** Fostering dreams, sustaining intellectual curiosity, or feeding personal animosities (*nourish a hope*, *nourishing environment*).

---

## 🔀 4. Prefix & Combining Dynamics on nutri

### Prefix Dynamics
- **`in-` (Negative / Absence):** Total lack of nutritional sustenance $\to$ *innutrition*, *innutritious*.
- **`mal-` (Bad / Defective):** Faulty, deficient, or imbalanced dietary intake $\to$ *malnutrition*, *malnourished*.
- **`under-` / `over-` (Quantitative Modifiers):** Insufficient vs. excessive intake $\to$ *undernutrition*, *overnutrition*.
- **`macro-` / `micro-` (Greek Scale Modifiers):** Bulk dietary fuels vs. trace vitamins and minerals $\to$ *macronutrient*, *micronutrient*.

### Suffix Dynamics
- **`-ent` (Present Participle / Substance):** An agent that nourishes: *nutrient*.
- **`-ment` (Result / Substance):** Concrete food or fuel: *nutriment*, *nourishment*.
- **`-tion` (Process / Science):** The biological process or scientific discipline: *nutrition*.
- **`-ious` / `-ive` (Adjectival Quality):** Possessing high nutritional value: *nutritious*, *nutritive*.
- **`-ery` (Place / Establishment):** A facility where young life is cultivated: *nursery*.
- **`-ling` (Diminutive):** A small creature being nursed: *nursling*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Clinical Dietetics & Nutritional Science:** Dietary Reference Intakes (DRIs); total parenteral nutrition (TPN) administered intravenously in intensive care; enteral feeding.
> - **Global Public Health & Humanitarian Aid:** The World Health Organization (WHO) and UNICEF protocols for diagnosing acute and chronic *malnutrition* (stunting, wasting, kwashiorkor, marasmus).
> - **Nursing Science & Patient Care:** The American Nurses Association (ANA); nurse practitioners (NPs); oncology, pediatric, and surgical specialized *nursing*.
> - **Horticulture & Forestry:** Commercial plant *nurseries* propagating bare-root fruit trees, ornamental shrubs, and reforestation saplings.
> - **Functional Medicine & Food Chemistry:** The development of biofortified crops, dietary supplements, and therapeutic *nutraceuticals*.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[innutrition]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin nutri within the domain of Life.<br>**2.** A technical or specialized form exhibiting the properties of nutri in systematic terminology. | *"In academic literature, innutrition designates pertaining to, derived from, or characteristic of latin nutri within the domain of life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[malnutrition]] | noun | **1.** A state of poor nutrition; can result from insufficient or excessive or unbalanced diet or from inability to absorb foods. | *"In academic literature, malnutrition designates a state of poor nutrition; can result from insufficient or excessive or unbalanced diet or from inability to absorb foods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nutria]] | noun | **1.** Aquatic south american rodent resembling a small beaver; bred for its fur. | *"In academic literature, nutria designates aquatic south american rodent resembling a small beaver; bred for its fur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nutrient]] | noun | **1.** Any substance that can be metabolized by an animal to give energy and build tissue.<br>**2.** Any substance (such as a chemical element or inorganic compound) that can be taken in by a green plant and used in organic synthesis. | *"In academic literature, nutrient designates any substance that can be metabolized by an animal to give energy and build tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nutrify]] | verb | **1.** Give nourishment to. | *"In academic literature, nutrify designates give nourishment to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nutriment]] | noun | **1.** A source of materials to nourish the body. | *"Why should it thrive and turn to nutriment When he is turned to poison?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[nutrition]] | noun | **1.** (physiology) the organic process of nourishing or being nourished; the processes by which an organism assimilates food and uses it for growth and maintenance.<br>**2.** A source of materials to nourish the body. | *"Rich and poor cook too much for taste and too little for nutrition or digestion."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[nutritional]] | adjective | **1.** Of or relating to or providing nutrition. | *"In academic literature, nutritional designates of or relating to or providing nutrition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nutritionally]] | adverb | **1.** With regard to nutrition. | *"In academic literature, nutritionally designates with regard to nutrition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nutritionary]] | adjective | **1.** Of or relating to or providing nutrition. | *"In academic literature, nutritionary designates of or relating to or providing nutrition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nutritionist]] | noun | **1.** A specialist in the study of nutrition. | *"In academic literature, nutritionist designates a specialist in the study of nutrition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nutritious]] | adjective | **1.** Of or providing nourishment. | *"In her arduous labors in the Army of the Cumberland, she met with a large number of patients who suffered for want of suitably prepared, delicate and nutritious food."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[nutritiousness]] | noun | **1.** The quality of being nourishing and promoting healthy growth. | *"In academic literature, nutritiousness designates the quality of being nourishing and promoting healthy growth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nutritive]] | adjective | **1.** Of or providing nourishment. | *"There is, I think, no more nutritive or suggestive truth in this connexion than that of the perfect dependence of the “moral” sense of a work of art on the amount of felt life concerned in producing it."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[nutritiveness]] | noun | **1.** The quality of being nourishing and promoting healthy growth. | *"In academic literature, nutritiveness designates the quality of being nourishing and promoting healthy growth."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Life]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · NUTRI
  </div>
</div>
