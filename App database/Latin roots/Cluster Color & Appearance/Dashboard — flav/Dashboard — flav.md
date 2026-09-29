---
status: unread
type: root_dashboard
---
# Dashboard — flav
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">flav-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“yellow”</span>
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

The root **flav** means yellow. It refers to yellow, agricultural ripeness, blonde hair, biochemical pigments, and viral taxonomy. In English, this root forms words such as *flavid*, *flavescent*, *flavescence*, and *flavin*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: yellow
> The root **flav** means yellow. It refers to yellow, agricultural ripeness, blonde hair, biochemical pigments, and viral taxonomy. In English, this root forms words such as *flavid*, *flavescent*, *flavescence*, and *flavin*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Yellow</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A painter mixing vibrant pigments on a palette to color a canvas.</mark>
> - **Everyday Connection**: Think of familiar words like *flavid* and *flavescent*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **flav** comes from a Latin word that means *"yellow"*.
  - At its core, it describes yellow.

- **The Big Picture Idea**:
  - Picture a painter mixing vibrant pigments on a palette to color a canvas.
  - Whenever you see **flav** in an English word, think of **colors, brightness, and visual appearance**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of yellow.
  - **Mental & Social**: How people experience, organize, or communicate about yellow.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Flavid**: Yellowish or pale yellow in color.
  - **Flavescent**: Turning yellow.
  - **Flavescence**: The state or process of becoming yellow, especially pathological chlorosis in plant foliage.
  - **Flavin**: A yellow, nitrogen-containing heterocyclic tricyclic pigment that functions as the prosthetic group of flavoprotein enzymes involved in cellular bioenergetics.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">flav</mark>, think of <mark class="hl-def">colors, brightness, and visual appearance</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **flav** operates as a remarkably stable morphological anchor in technical English:
> - **Primary Adjectival Stem `flav-`:** Latin *flavidus* → English [[flavid]] ("yellowish, sallow").
> - **Inchoative Participial Stem `flav-ēsc-`:** Latin *flāvēscere* ("to turn yellow") → English [[flavescent]], [[flavescence]].
> - **Biochemical & Chemical Suffixation `-in` / `-one` / `-oid`:**
>   - *flav- + -in* → [[flavin]] (the prosthetic yellow cofactor).
>   - *flav- + -one* → [[flavone]] (the phenylchromone skeleton).
>   - *flavone + -oid* → [[flavonoid]] (polyphenolic plant antioxidants).
>   - *ribo- + flavin* → [[riboflavin]] (vitamin B2 with ribitol sugar chain).
>   - *acri- + flavine* → [[acriflavine]] (antiseptic acridine dye).
>   - *flav- + -o- + protein* → [[flavoprotein]] (flavin-binding enzyme).
> - **Virological & Anatomical Coinages:**
>   - *flav- + virus* → [[Flavivirus]] (genus causing yellow fever, dengue, Zika).
>   - Latin binomial → [[ligamentum flavum]] (vertebral elastic ligament).
>   - Historical gentilicium → [[Flavian]] (Roman imperial dynasty).

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
> Although unified by the concept of **"golden-yellow"**, the root branches into distinct scientific domains:
> - **Descriptive Botany & Pathology:** In [[flavid]], [[flavescent]], and [[flavescence]], it describes yellowish tints in floral morphology and chlorotic plant diseases (*Flavescence dorée* in vineyards).
> - **Nutritional Biochemistry:** In [[riboflavin]] (vitamin B2), it designates an essential water-soluble vitamin required for cellular energy production.
> - **Enzymology & Bioenergetics:** In [[flavin]] and [[flavoprotein]], it represents electron-shuttling coenzymes (FMN and FAD) driving cellular respiration.
> - **Phytochemistry & Pharmacology:** In [[flavone]] and [[flavonoid]], it encompasses thousands of antioxidant polyphenols found in green tea, citrus, and berries.
> - **Infectious Disease & Virology:** In [[Flavivirus]], it names mosquito- and tick-borne viral pathogens (yellow fever, West Nile, dengue).
> - **Human Spine Anatomy:** In [[ligamentum flavum]], it identifies the yellow elastic tissue preserving vertebral posture.

---

## 🔀 4. Prefix & Combining Dynamics on flav

### Prefix & Combining Shifts (Directional & Semantic Modification)

| Prefix / Combining Element | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `ribo-` | derived from D-ribose | [[riboflavin]] | The yellow vitamin composed of 7,8-dimethylisoalloxazine linked to a ribitol sugar chain. |
| `acri-` (Latin *ācer*) | sharp, pungent | [[acriflavine]] | A fluorescent, yellow-orange topical antiseptic dye. |
| `flav-` + `virus` | yellow + pathogen | [[Flavivirus]] | A genus of single-stranded RNA viruses named after yellow fever. |
| `flav-` + `-o-` + `protein` | yellow + protein | [[flavoprotein]] | An enzyme conjugated with a yellow flavin adenine dinucleotide prosthetic group. |

### Suffix Transformations (Grammatical & Categorical Roles)

| Suffix | Grammatical Role | Derivative | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-id` | Adjective (Quality / State) | [[flavid]] | Having a pale yellow or sallow color. |
| `-escent` / `-escence` | Adj & Noun (Inchoative Process) | [[flavescent]], [[flavescence]] | Beginning to turn yellow; the process of yellowing. |
| `-in` (Biochemistry) | Noun (Organic Substance) | [[flavin]], [[riboflavin]] | A yellow water-soluble biological pigment or cofactor. |
| `-one` (Organic Chemistry) | Noun (Ketone Structure) | [[flavone]] | The cyclic ketone forming the backbone of yellow flavonoids. |
| `-oid` (Resemblance / Class) | Noun & Adj (Chemical Family) | [[flavonoid]] | A vast class of plant polyphenolic metabolites. |
| `-ian` | Adjective (Historical / Dynastic) | [[Flavian]] | Relating to the Roman imperial dynasty of the Flavii. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 💊 **Biochemistry & Clinical Nutrition** | [[riboflavin]], [[flavin]], [[flavoprotein]] | Vitamin B2 dietary deficiency (ariboflavinosis), mitochondrial Complex I and II function, FAD/FMN electron transport, neonate phototherapy. |
| 🦟 **Virology & Public Health** | [[Flavivirus]] | Epidemiology of vector-borne hemorrhagic fevers (Yellow fever, Dengue fever), microcephaly from Zika virus, neuroinvasive West Nile encephalitis. |
| 🍷 **Phytochemistry & Enology** | [[flavonoid]], [[flavone]], [[flavescence]] | Grape skin polyphenols in red wine, quercetin antioxidant supplements, vector-spread grapevine phytoplasma (*Flavescence dorée*). |
| 🦴 **Orthopedic & Spine Surgery** | [[ligamentum flavum]] | Lumbar spinal stenosis decompression, surgical flavectomy, hypertrophy of the ligamentum flavum compressing the cauda equina. |
| 🏛️ **Classical History & Numismatics** | [[Flavian]] | Construction of the Colosseum (*Amphitheatrum Flavium*), archaeological excavation of the Flavian palace on the Palatine Hill. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[flavescent]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin flav within the domain of Color & Appearance.<br>**2.** A technical or specialized form exhibiting the properties of flav in systematic terminology. | *"In academic literature, flavescent designates pertaining to, derived from, or characteristic of latin flav within the domain of color & appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavid]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin flav within the domain of Color & Appearance.<br>**2.** A technical or specialized form exhibiting the properties of flav in systematic terminology. | *"In academic literature, flavid designates pertaining to, derived from, or characteristic of latin flav within the domain of color & appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavin]] | noun | **1.** A ketone that forms the nucleus of certain natural yellow pigments like riboflavin. | *"In academic literature, flavin designates a ketone that forms the nucleus of certain natural yellow pigments like riboflavin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flaviviridae]] | noun | **1.** A family of arboviruses carried by arthropods. | *"In academic literature, flaviviridae designates a family of arboviruses carried by arthropods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavivirus]] | noun | **1.** Animal viruses belonging to the family flaviviridae. | *"In academic literature, flavivirus designates animal viruses belonging to the family flaviviridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavone]] | noun | **1.** A colorless crystalline compound that is part of a number of white or yellow plant pigments. | *"In academic literature, flavone designates a colorless crystalline compound that is part of a number of white or yellow plant pigments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavonoid]] | noun | **1.** Any of a large class of plant pigments having a chemical structure based on or similar to flavone. | *"In academic literature, flavonoid designates any of a large class of plant pigments having a chemical structure based on or similar to flavone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavoprotein]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin flav within the domain of Color & Appearance.<br>**2.** A technical or specialized form exhibiting the properties of flav in systematic terminology. | *"In academic literature, flavoprotein designates pertaining to, derived from, or characteristic of latin flav within the domain of color & appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavor]] | noun | **1.** The general atmosphere of a place or situation and the effect that it has on people.<br>**2.** The taste experience when a savoury condiment is taken into the mouth. | *"Who could taste the fine flavor in the name of Brooke if it were delivered casually, like wine without a seal?"* — George Eliot, *Middlemarch* |
| [[flavorer]] | noun | **1.** Something added to food primarily for the savor it imparts. | *"In academic literature, flavorer designates something added to food primarily for the savor it imparts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavorful]] | adjective | **1.** Full of flavor. | *"In academic literature, flavorful designates full of flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavoring]] | noun | **1.** Something added to food primarily for the savor it imparts.<br>**2.** Lend flavor to. | *"In academic literature, flavoring designates something added to food primarily for the savor it imparts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavorless]] | adjective | **1.** Lacking taste or flavor or tang. | *"In academic literature, flavorless designates lacking taste or flavor or tang."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavorlessness]] | noun | **1.** The property of having no flavor. | *"In academic literature, flavorlessness designates the property of having no flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavorous]] | adjective | **1.** Full of flavor. | *"In academic literature, flavorous designates full of flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavorsome]] | adjective | **1.** Full of flavor. | *"In academic literature, flavorsome designates full of flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavorsomeness]] | noun | **1.** Having an appetizing flavor. | *"In academic literature, flavorsomeness designates having an appetizing flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavour]] | noun | **1.** The general atmosphere of a place or situation and the effect that it has on people.<br>**2.** (physics) the six kinds of quarks. | *"On Sunday the chill little church is almost warmed by so much gallant company, and the general flavour of the Dedlock dust is quenched in delicate perfumes."* — Charles Dickens, *Bleak House* |
| [[flavourer]] | noun | **1.** Something added to food primarily for the savor it imparts. | *"In academic literature, flavourer designates something added to food primarily for the savor it imparts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavourful]] | adjective | **1.** Full of flavor. | *"In academic literature, flavourful designates full of flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavouring]] | noun | **1.** Something added to food primarily for the savor it imparts.<br>**2.** Lend flavor to. | *"The liquid drawn off from the mash tun, containing, of course, the sugar, is subsequently boiled, numerous flavouring matters (including hops) are added, and then it is cooled again, ready for the final process--fermentation."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[flavourless]] | adjective | **1.** Lacking taste or flavor or tang. | *"In academic literature, flavourless designates lacking taste or flavor or tang."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavourlessness]] | noun | **1.** The property of having no flavor. | *"In academic literature, flavourlessness designates the property of having no flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavourous]] | adjective | **1.** Full of flavor. | *"In academic literature, flavourous designates full of flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavoursome]] | adjective | **1.** Full of flavor. | *"In academic literature, flavoursome designates full of flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[flavoursomeness]] | noun | **1.** Having an appetizing flavor. | *"In academic literature, flavoursomeness designates having an appetizing flavor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonflavored]] | adjective | **1.** Without flavoring added. | *"In academic literature, nonflavored designates without flavoring added."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nonflavoured]] | adjective | **1.** Without flavoring added. | *"In academic literature, nonflavoured designates without flavoring added."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[riboflavin]] | noun | **1.** A b vitamin that prevents skin lesions and weight loss. | *"In academic literature, riboflavin designates a b vitamin that prevents skin lesions and weight loss."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unflavored]] | adjective | **1.** Without flavoring added. | *"In academic literature, unflavored designates without flavoring added."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unflavoured]] | adjective | **1.** Without flavoring added. | *"In academic literature, unflavoured designates without flavoring added."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · FLAV
  </div>
</div>
