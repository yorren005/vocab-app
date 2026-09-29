---
status: unread
type: root_dashboard
---
# Dashboard — herb
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">herb-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“grass or herb”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Living creatures moving through nature and plants growing from the soil.</span>
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

The root **herb** means grass or herb. It refers to grass, non-woody plant, leafy vegetation, botanical medicine. In English, this root forms words such as *herbaceous*, *herbarium*, *herbage*, and *herborize*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: grass or herb
> The root **herb** means grass or herb. It refers to grass, non-woody plant, leafy vegetation, botanical medicine. In English, this root forms words such as *herbaceous*, *herbarium*, *herbage*, and *herborize*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Grass or herb</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Living creatures moving through nature and plants growing from the soil.</mark>
> - **Everyday Connection**: Think of familiar words like *herbaceous* and *herbarium*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **herb** comes from a Latin word that means *"grass or herb"*.
  - At its core, it describes grass or herb.

- **The Big Picture Idea**:
  - Picture living creatures moving through nature and plants growing from the soil.
  - Whenever you see **herb** in an English word, think of **animals, plants, and natural life**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of grass or herb.
  - **Mental & Social**: How people experience, organize, or communicate about grass or herb.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Herbaceous**: Of, relating to, or characteristic of an herb.
  - **Herbarium**: A systematically cataloged collection of preserved, pressed, and mounted plant specimens mounted on archival paper.
  - **Herbage**: Herbaceous vegetation, especially grass and clovers considered collectively as pasture food or forage for grazing livestock.
  - **Herborize**: To search for, collect, and study wild plants and botanical specimens in their natural habitats.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">herb</mark>, think of <mark class="hl-def">animals, plants, and natural life</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **herb** combines directly with Latin and Romance affixes to form foundational botanical, pharmaceutical, and ecological terms:
> 1. **Adjectival & State Suffixation:**
>    - `herb-` + `-al` (*-ālis*) ➔ *herbal* (pertaining to herbs; a botanical book).
>    - `herb-` + `-aceous` (*-āceus*, "having the nature of") ➔ *herbaceous* (soft, non-woody).
>    - `herb-` + `-age` ➔ *herbage* (pasture vegetation).
> 2. **Locative Archive Suffixation:**
>    - `herb-` + `-arium` (*-ārium*, "place for keeping") ➔ *herbarium* (pressed plant museum).
> 3. **Classical Compounding:**
>    - `herbi-` + `vorāre` ("to devour") ➔ *herbivore* ➔ *herbivorous* (plant-eating animal).
>    - `herbi-` + `caedere` ("to kill") ➔ *herbicide* (plant/weed killer).
> 4. **Field Botanical Verbs:**
>    - French *herboriser* ➔ English *herborize* (to botanize in the field).

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
> Although anchored in green vegetation, the root's branches serve distinct disciplines:
> - **Culinary & Pharmaceutical:** [[herb]], [[herbal]], and [[herbalist]] focus on aromatic seasoning and phytochemical healing.
> - **Structural Plant Biology:** [[herbaceous]] perennial contrasts with woody trees and shrubs in architecture and cold-season die-back.
> - **Ecological Energetics:** [[herbivore]] represents the primary consumer trophic level transferring solar photosynthetic energy to carnivores.
> - **Taxonomic Archiving:** [[herbarium]] collections at Kew Gardens and the Smithsonian preserve centuries-old type specimens for genomic sequencing.
> - **Agricultural Chemistry:** [[herbicide]] sprays (such as glyphosate) protect monoculture wheat and soy from weed competition.

---

## 🔀 4. Prefix & Combining Dynamics on herb

### Structural Compounding on `herb-`

| Element / Comb. Form | Meaning | Combined Derivative | Resulting Domain & Shift |
| :--- | :--- | :--- | :--- |
| `-āceus` | nature, consistency of | [[herbaceous]] | Non-woody plant tissue dying back to root crowns annually |
| `-ārium` | repository, collection | [[herbarium]] | Archive of pressed, dried, cataloged plant specimens |
| `vorāre` | to devour, eat | [[herbivore]] | Animal physiologically adapted to consume plant foliage |
| `caedere` | to kill, slay | [[herbicide]] | Chemical formulation engineered to eliminate unwanted weeds |
| `-ist` | practitioner | [[herbalist]] | Specialist skilled in traditional botanical phytotherapy |
| `-ize` | to practice, do | [[herborize]] | Exploring natural habitats to collect and classify plants |

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🧭 Where This Root Operates
> - **Plant Systematics & Herbaria:** Linnaean holotype herbarium sheets, plant barcoding, and historical ethnobotany.
> - **Veterinary Science & Ruminant Nutrition:** Pasture herbage quality, rumen microbiome cellulose fermentation in herbivores.
> - **Pharmacology & Complementary Health:** Standardized herbal extracts (St. John's wort, ginkgo), phytochemistry, and pharmacognosy.
> - **Agronomy & Weed Science:** Herbicide-resistant weeds, selective pre-emergent herbicides, and no-till agriculture.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[herb]] | noun | **1.** A plant lacking a permanent woody stem; many are flowering garden plants or potherbs; some having medicinal properties; some are pests.<br>**2.** Aromatic potherb used in cookery for its savory qualities. | *"We may pick a thousand salads ere we light on such another herb."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[herbaceous]] | adjective | **1.** Characteristic of a nonwoody herb or plant part. | *"Snagsby appears, greasy, warm, herbaceous, and chewing."* — Charles Dickens, *Bleak House* |
| [[herbage]] | noun | **1.** Succulent herbaceous vegetation of pasture land. | *"I want you—I want you to let me say I love you again and again!” Bathsheba answered nothing, and the horse upon her arm seemed so impressed that instead of cropping the herbage she looked up."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[herbal]] | noun | **1.** Tea-like drink made of leaves of various herbs.<br>**2.** Of or relating to herbs. | *"Angel looked round for Mrs Crick’s black-puddings, which he had directed to be nicely grilled as they did them at the dairy, and of which he wished his father and mother to appreciate the marvellous herbal savours as highly as he did himself."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[herbalist]] | noun | **1.** A therapist who heals by the use of herbs. | *"In a rosery of Fetter lane of Gerard, herbalist, he walks, greyedauburn."* — James Joyce, *Ulysses* |
| [[herbarium]] | noun | **1.** A collection of dried plants that are mounted and systematically classified for study. | *"Arranged so as to be applicable either as a Check-List or for Herbarium Labels."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[herbart]] | noun | **1.** German philosopher (1776-1841). | *"In academic literature, herbart designates german philosopher (1776-1841)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herbert]] | noun | **1.** United states musician and composer and conductor noted for his comic operas (1859-1924). | *"Plain near Tamworth Enter Richmond, Oxford, Blunt, Herbert, and others, with drum and colours."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[herbicide]] | noun | **1.** A chemical agent that destroys plants or inhibits their growth. | *"In academic literature, herbicide designates a chemical agent that destroys plants or inhibits their growth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herbivore]] | noun | **1.** Any animal that feeds chiefly on grass and other plants. | *"In academic literature, herbivore designates any animal that feeds chiefly on grass and other plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[herbivorous]] | adjective | **1.** Feeding only on plants. | *"It is carnivorous, herbivorous, and abstemious from water, requiring no other fluids than those obtained by eating roots."* — W. E. Webb, *Buffalo Land* |
| [[herborize]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin herb within the domain of Animal & Plant.<br>**2.** A technical or specialized form exhibiting the properties of herb in systematic terminology. | *"In academic literature, herborize designates pertaining to, derived from, or characteristic of latin herb within the domain of animal & plant."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animal & Plant]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · HERB
  </div>
</div>
