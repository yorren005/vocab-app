---
status: unread
type: root_dashboard
---
# Dashboard — lact
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">lact-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“milk”</span>
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

The root **lact** means milk. It refers to milk, milky fluid, suckling. In English, this root forms words such as *alactasia*, *delactation*, *lactalbumin*, and *lactase*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: milk
> The root **lact** means milk. It refers to milk, milky fluid, suckling. In English, this root forms words such as *alactasia*, *delactation*, *lactalbumin*, and *lactase*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Milk</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering at a dining table to share nourishment, bread, and refreshing water.</mark>
> - **Everyday Connection**: Think of familiar words like *alactasia* and *delactation*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lact** comes from a Latin word that means *"milk"*.
  - At its core, it describes milk.

- **The Big Picture Idea**:
  - Picture gathering at a dining table to share nourishment, bread, and refreshing water.
  - Whenever you see **lact** in an English word, think of **food, eating, and drinking**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of milk.
  - **Mental & Social**: How people experience, organize, or communicate about milk.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Alactasia**: Congenital absence or deficiency of the enzyme lactase, causing severe lactose malabsorption.
  - **Delactation**: The cessation of lactation.
  - **Lactalbumin**: A water-soluble albumin protein found in mammalian milk, constituting a major nutrient in whey.
  - **Lactase**: An essential brush-border enzyme in the small intestine that cleaves lactose into glucose and galactose.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lact</mark>, think of <mark class="hl-def">food, eating, and drinking</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of Latin *lac, lactis*
> Derivatives of **lact** enter English through systematic morphological channels:
> 1. **The Nominal Base `lact-`:**
>    - *lac* + *-ic* $ightarrow$ **lactic** (of or from milk).
>    - *lac* + sugar suffix *-ose* $ightarrow$ **lactose** (milk sugar).
>    - *lact-* + enzyme suffix *-ase* $ightarrow$ **lactase** (lactose-cleaving enzyme).
> 2. **The Verb *lactāre* ("to suckle"):**
>    - *lactāt-* + *-ion* $ightarrow$ **lactation** (the secretion of milk).
>    - *lactāt-* (back-formed verb) $ightarrow$ **lactate** (to yield milk).
>    - *de-* + *lactātiō* $ightarrow$ **delactation** (weaning).
> 3. **The Adjectival Base *lacteus* ("milky"):**
>    - *lacteus* + *-al* $ightarrow$ **lacteal** (milky; intestinal lymphatic vessel).
>    - *lact-* + inchoative *-ēscere* $ightarrow$ *lactēscēns* $ightarrow$ **lactescent** (becoming milky; sap-oozing).
> 4. **Compounding Elements with `lacto-`:**
>    - *lacto-* + *ferrum* $ightarrow$ **lactoferrin** (iron-binding whey protein).
>    - *lacto-* + *bacillus* $ightarrow$ **lactobacillus** (lactic acid rod-bacterium).
>    - *lacto-* + *meter* $ightarrow$ **lactometer** (milk hydrometer).
>    - *lacto-* + *vegetarian* $ightarrow$ **lactovegetarian** (dairy-consuming vegetarian).
> 5. **Hormonal & Chemical Derivations:**
>    - *pro-* ("promoting") + *lact-* + *-in* $ightarrow$ **prolactin** (milk-stimulating hormone).
>    - *lactic* + *-one* $ightarrow$ **lactone** (cyclic organic ester).
> 6. **The Vernacular Plant Stream:**
>    - Latin *lactūca* $ightarrow$ Old French *laitue* $ightarrow$ Middle English *letuse* $ightarrow$ **lettuce**.

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

```
                                  ┌── Physiological & Mammary ── lactate (v.), lactation, lactational, prolactin
                                  │
                                  ├── Anatomical Absorption ───── lacteal (chyle vessel), lactiferous (ducts)
                                  │
    [LACT-] ──────────────────────┼── Chemical & Metabolic ────── lactic, lactate (n.), lactose, lactase, lactone
  (milk / milky)                  │
                                  ├── Dietary & Agricultural ──── lactalbumin, lactoglobulin, lactometer, lactovegetarian
                                  │
                                  └── Botanical & Vernacular ──── lactescent, lactescence, lettuce (lactūca)
```

> [!tip] 🌈 Thematic Categories of the Derived Vocabulary
> 1. **Mammary Biology & Obstetrics:** *lactate* (v.), *lactating*, *lactation*, *lactational*, *prolactin*, *delactation*, *lactigenous*, *lactifuge*.
> 2. **Microscopic & Macro Anatomy:** *lacteal*, *lactiferous* ducts.
> 3. **Biochemistry & Metabolism:** *lactic* acid, *lactate* (anion), *lactose*, *lactase*, *alactasia*, *lactosuria*, *lactone*.
> 4. **Proteins & Dairy Science:** *lactalbumin*, *lactoferrin*, *lactoglobulin*, *lactoprotein*, *lactobacillus*, *lactometer*.
> 5. **Plant Physiology & Food:** *lettuce*, *lactescent*, *lactescence*, *lactovegetarian*.

---

## 🔀 4. Prefix & Combining Dynamics on lact

### Prefix & Combining Forms

| Prefix / Combining Form | Core Value | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `pro-` | forward, promoting | **prolactin** | Anterior pituitary hormone that stimulates milk production. |
| `de-` | off, away from | **delactation** | Weaning; the cessation or termination of milk feeding. |
| `a-` | without, deficient | **alactasia** | Complete physiological deficiency of the enzyme lactase. |
| `lacto-` + `ferrin` | milk + iron | **lactoferrin** | Iron-chelating antimicrobial protein concentrated in colostrum. |
| `lacto-` + `bacillus` | milk + rodlet | **lactobacillus** | Probiotic bacterium that ferments sugars into lactic acid. |
| `lacti-` + `-fer` | milk + bearing | **lactiferous** | Conveying milk (breast ducts) or oozing white sap (botany). |
| `lacti-` + `fuge` | milk + dispelling | **lactifuge** | Medication or herb that suppresses milk secretion. |

### Suffix Transformations

| Suffix | Morphological Role | Formed Word | Syntactic Role |
| :--- | :--- | :--- | :--- |
| `-ation` | Noun of process | **lactation** | The physiological process or duration of milk secretion. |
| `-eal` | Adjectival / Anatomical | **lacteal** | Milky in appearance; intestinal lymphatic vessel carrying chyle. |
| `-escent` | Inchoative adjective | **lactescent** | Exuding or turning into a milky white liquid or sap. |
| `-ose` | Carbohydrate suffix | **lactose** | The primary disaccharide sugar found in mammalian milk. |
| `-ase` | Enzymatic suffix | **lactase** | The intestinal enzyme responsible for hydrolyzing lactose. |
| `-one` | Ketone / chemical suffix | **lactone** | Cyclic carboxylic ester derived from hydroxy acids. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 👶 **Obstetrics, Pediatrics & Neonatology** | *lactation*, *prolactin*, *lactational*, *delactation* | Supporting postpartum breastfeeding, treating hyperprolactinemia, and managing infant nutritional weaning. |
| 🏃 **Exercise Physiology & Sports Science** | *lactate*, *lactic*, *lactate threshold* | Measuring blood lactate concentration via fingerstick assays to identify the anaerobic threshold and optimize athletic training zones. |
| 🧀 **Dairy Technology & Food Microbiology** | *lactose*, *lactase*, *lactobacillus*, *lactometer* | Manufacturing lactose-free dairy goods, culturing probiotic cheeses, and verifying milk density against adulteration. |
| 🥗 **Gastronomy, Nutrition & Horticulture** | *lettuce*, *lactovegetarian*, *lactalbumin* | Formulating nutritionally complete plant-and-dairy diets; breeding crisphead and romaine lettuce cultivars (*Lactuca sativa*). |
| 🩺 **Gastroenterology & Pathology** | *lacteal*, *alactasia*, *lactosuria* | Diagnosing primary hypolactasia (lactose intolerance), chylothorax, and intestinal lymphangiectasia within mucosal villi. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[ablactate]] | verb | **1.** Gradually deprive (infants and young mammals) of mother's milk. | *"In academic literature, ablactate designates gradually deprive (infants and young mammals) of mother's milk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ablactation]] | noun | **1.** The cessation of lactation.<br>**2.** The act of substituting other food for the mother's milk in the diet of a child or young mammal. | *"In academic literature, ablactation designates the cessation of lactation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extragalactic]] | adjective | **1.** Outside or beyond a galaxy. | *"In academic literature, extragalactic designates outside or beyond a galaxy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[galactic]] | adjective | **1.** Of or relating to a galaxy (especially our galaxy the milky way).<br>**2.** Inconceivably large. | *"The addition of Karlshaven IV to the list of planets under colonization would be made, and Holliday's asking prices for land would be posted with Emigration, together with a prospectus abstracted from the General Galactic Survey."* — Algis Budrys, *Citadel* |
| [[intergalactic]] | adjective | **1.** Between or among galaxies. | *"In academic literature, intergalactic designates between or among galaxies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactaid]] | noun | **1.** Any of a group of enzymes (trade name lactaid) that hydrolyze lactose to glucose and galactose. | *"In academic literature, lactaid designates any of a group of enzymes (trade name lactaid) that hydrolyze lactose to glucose and galactose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactalbumin]] | noun | **1.** Albumin occurring in milk. | *"In academic literature, lactalbumin designates albumin occurring in milk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactarius]] | noun | **1.** Large genus of agarics that have white spore and contain a white or milky juice when cut or broken; includes both edible and poisonous species. | *"In academic literature, lactarius designates large genus of agarics that have white spore and contain a white or milky juice when cut or broken; includes both edible and poisonous species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactase]] | noun | **1.** Any of a group of enzymes (trade name lactaid) that hydrolyze lactose to glucose and galactose. | *"In academic literature, lactase designates any of a group of enzymes (trade name lactaid) that hydrolyze lactose to glucose and galactose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactate]] | noun | **1.** A salt or ester of lactic acid.<br>**2.** Give suck to. | *"In academic literature, lactate designates a salt or ester of lactic acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactating]] | verb | **1.** Give suck to.<br>**2.** Producing or secreting milk. | *"In academic literature, lactating designates give suck to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactation]] | noun | **1.** The period following birth during which milk is secreted.<br>**2.** The production and secretion of milk by the mammary glands. | *"Hence the custom which prohibits the commerce of the sexes while the worms are hatching may be only an extension, by analogy, of the rule which is observed by many races, that the husband may not cohabit with his wife during pregnancy and lactation."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[lacteal]] | noun | **1.** Any of the lymphatic vessels that convey chyle from the small intestine to the thoracic duct.<br>**2.** Relating to or consisting of or producing or resembling milk. | *"Condensed milk supplied well the place of the usual lacteal, and was an improvement on the city article, inasmuch as we knew exactly what quantity and quality of water went into it."* — W. E. Webb, *Buffalo Land* |
| [[lactescent]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin lact within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of lact in systematic terminology. | *"In academic literature, lactescent designates pertaining to, derived from, or characteristic of latin lact within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactic]] | adjective | **1.** Of or relating to or obtained from milk (especially sour milk or whey). | *"In academic literature, lactic designates of or relating to or obtained from milk (especially sour milk or whey)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactiferous]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin lact within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of lact in systematic terminology. | *"In academic literature, lactiferous designates pertaining to, derived from, or characteristic of latin lact within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactifuge]] | noun | **1.** Any agent that reduces milk secretion (as given to a woman who is not breast feeding). | *"In academic literature, lactifuge designates any agent that reduces milk secretion (as given to a woman who is not breast feeding)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactobacillaceae]] | noun | **1.** Lactic acid bacteria and important pathogens; bacteria that ferment carbohydrates chiefly into lactic acid. | *"In academic literature, lactobacillaceae designates lactic acid bacteria and important pathogens; bacteria that ferment carbohydrates chiefly into lactic acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactobacillus]] | noun | **1.** A gram-positive rod-shaped bacterium that produces lactic acid (especially in milk). | *"In academic literature, lactobacillus designates a gram-positive rod-shaped bacterium that produces lactic acid (especially in milk)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactobacteriaceae]] | noun | **1.** Lactic acid bacteria and important pathogens; bacteria that ferment carbohydrates chiefly into lactic acid. | *"In academic literature, lactobacteriaceae designates lactic acid bacteria and important pathogens; bacteria that ferment carbohydrates chiefly into lactic acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactoflavin]] | noun | **1.** A b vitamin that prevents skin lesions and weight loss. | *"In academic literature, lactoflavin designates a b vitamin that prevents skin lesions and weight loss."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactogen]] | noun | **1.** Any agent that enhances milk production. | *"In academic literature, lactogen designates any agent that enhances milk production."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactogenic]] | adjective | **1.** Inducing lactation. | *"In academic literature, lactogenic designates inducing lactation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactophrys]] | noun | **1.** A genus of ostraciidae. | *"In academic literature, lactophrys designates a genus of ostraciidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactoprotein]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin lact within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of lact in systematic terminology. | *"In academic literature, lactoprotein designates pertaining to, derived from, or characteristic of latin lact within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactose]] | noun | **1.** A sugar comprising one glucose molecule linked to a galactose molecule; occurs only in milk. | *"In academic literature, lactose designates a sugar comprising one glucose molecule linked to a galactose molecule; occurs only in milk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactosuria]] | noun | **1.** Presence of lactose in the urine; can occur during pregnancy or lactation. | *"In academic literature, lactosuria designates presence of lactose in the urine; can occur during pregnancy or lactation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lactuca]] | noun | **1.** An herb with milky juice: lettuce; prickly lettuce. | *"In academic literature, lactuca designates an herb with milky juice: lettuce; prickly lettuce."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prolactin]] | noun | **1.** Gonadotropic hormone secreted by the anterior pituitary; in females it stimulates growth of the mammary glands and lactation after parturition. | *"In academic literature, prolactin designates gonadotropic hormone secreted by the anterior pituitary; in females it stimulates growth of the mammary glands and lactation after parturition."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · LACT
  </div>
</div>
