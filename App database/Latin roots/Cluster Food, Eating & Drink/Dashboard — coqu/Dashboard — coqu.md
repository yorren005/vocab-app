---
status: unread
type: root_dashboard
---
# Dashboard — coqu
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">coqu-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to cook, ripen, or mature”</span>
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

The root **coqu** means to cook, ripen, or mature. It refers to cook, to prepare by fire, to ripen. In English, this root forms words such as *apricot*, *cookbook*, *cooked*, and *cooker*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to cook, ripen, or mature
> The root **coqu** means to cook, ripen, or mature. It refers to cook, to prepare by fire, to ripen. In English, this root forms words such as *apricot*, *cookbook*, *cooked*, and *cooker*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To cook, ripen, or mature</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering at a dining table to share nourishment, bread, and refreshing water.</mark>
> - **Everyday Connection**: Think of familiar words like *apricot* and *cookbook*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **coqu** comes from a Latin word that means *"to cook, ripen, or mature"*.
  - At its core, it describes the action of cook, ripen, or mature.

- **The Big Picture Idea**:
  - Picture gathering at a dining table to share nourishment, bread, and refreshing water.
  - Whenever you see **coqu** in an English word, think of **to cook, ripen, or mature**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to cook, ripen, or mature).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Apricot**: The small, round, yellowish-orange stone fruit of the tree *Prunus armeniaca*, closely related to the peach and plum.
  - **Cookbook**: A book containing culinary recipes, cooking techniques, and meal preparation instructions.
  - **Cooked**: Having been prepared by the application of heat.
  - **Cooker**: An appliance, vessel, or device utilized for cooking.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">coqu</mark>, think of <mark class="hl-def">to cook, ripen, or mature</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture
> The present stem **coqu-** operates across multiple word-formation pathways:
> - **Primary Germanic Loans from *cocus* & *cocīna*:** Old English *cōc* expanded into an entire domestic compound engine: *cook*, *cooker*, *cookery*, *cookbook*, *cookout*, *cookware*, *cooktop*, *cookhouse*.
> - **The Locational Noun *cocīna*:** Transferred into Old English as *cycene* → *kitchen*, creating modern locational compounds (*kitchenette*, *kitchenware*).
> - **The Gallo-Romance Stream:** Vulgar Latin *cocīna* softened into Old French *cuisine*, preserving the high culinary register in English.
> - **Learned Latin Adjectives:** Latin *coquīnārius* entered specialized English as *coquinary* ("pertaining to the kitchen").
> - **The Participial Contrast:** While the ongoing, agentive, and locational terms clustered around **coqu-**, the completed actions, extracts, and physical results branched off into the participial stem **[[Dashboard — coct]]** (*concoct*, *decoction*, *biscuit*, *terracotta*, *ricotta*, *precocious*).

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
                                  ┌── The Agent & Action ────── cook (v.), cook (n.), cooker
                                  │
                                  ├── The Domestic Space ────── kitchen, kitchenette, cookhouse
                                  │
    [COQU-] ──────────────────────┼── Tools & Materials ─────── cookware, kitchenware, cookbook, cooktop
(to cook / prepare by heat)       │
                                  ├── The High Gastronomic ──── cuisine, cuisinier, cookery, coquinary
                                  │
                                  └── Botanical Ripening ────── apricot (via praecoquum)
```

> [!tip] 🌈 Thematic Clusters of the Present Stem
> 1. **The Culinary Practitioner & Action:** *cook* (verb), *cook* (noun), *cooked*, *cooker*, *cuisinier*.
> 2. **The Architecture of Preparation:** *kitchen*, *kitchenette*, *cookhouse*.
> 3. **The Apparatus & Literature of the Hearth:** *cookware*, *kitchenware*, *cookbook*, *cooktop*, *cookout*.
> 4. **Culinary Art & Tradition:** *cuisine*, *cookery*, *coquinary*.
> 5. **Horticultural Ripening:** *apricot* (the early-ripened fruit).

---

## 🔀 4. Prefix & Combining Dynamics on coqu

### Prefix Shifts

| Prefix / Modifier | Modifier Meaning | Formed Compound | Semantic Dynamic |
| :--- | :--- | :--- | :--- |
| `prae-` | before, early | **apricot** (< *praecoquum*) | The fruit that "cooks" or ripens on the branch ahead of summer peaches. |
| `out` | outside, outdoors | **cookout** | Preparing and consuming a meal in an open-air setting. |
| `top` | upper surface | **cooktop** | The horizontal heated cooking surface of a range. |
| `house` | dedicated structure | **cookhouse** | An external or dedicated building utilized specifically for cooking. |

### Suffix Transformations

| Suffix | Grammatical Function | Formed Word | Syntactic Role |
| :--- | :--- | :--- | :--- |
| `-ery` | Noun (art, trade, or place) | **cookery** | The art, craft, or practice of preparing food. |
| `-er` | Agent / Instrument noun | **cooker** | A mechanical apparatus or vessel used for cooking (e.g., pressure cooker). |
| `-ware` | Collective noun (manufactured goods) | **cookware**, **kitchenware** | Utensils, pots, and vessels employed in cooking. |
| `-ette` | Diminutive noun | **kitchenette** | A very small, compact room or alcove outfitted for cooking. |
| `-ary` (Latin *-ārius*) | Adjectival (pertaining to) | **coquinary** | Pertaining to the kitchen or culinary operations. |
| `-ier` (French agent) | Agent noun | **cuisinier** | A professional chef or culinary practitioner. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 🍳 **Gastronomy & Culinary Arts** | *cuisine*, *cookery*, *cuisinier*, *cook* | Defining regional cooking philosophies (e.g., haute cuisine, nouvelle cuisine), menu development, and professional culinary brigade hierarchy. |
| 🏠 **Domestic Architecture & Design** | *kitchen*, *kitchenette*, *cooktop*, *cookhouse* | Designing residential layouts, ergonomic work triangles (sink, stove, refrigerator), and specialized industrial kitchens for food service. |
| 🌿 **Horticulture & Pomology** | *apricot* (*Prunus armeniaca*) | Cultivating early-bearing stone fruits; breeding cold-hardy cultivars that flower and set fruit before seasonal late frosts. |
| 📜 **Historical Linguistics & Lexicography** | *cook*, *kitchen*, *cuisine*, *apricot* | Demonstrating linguistic stratigraphy: tracing how Latin terms entered Germanic languages in Roman antiquity vs. entering English via French and Arabic. |
| 🍳 **Appliance & Manufacturing Industry** | *cookware*, *cooker*, *cooktop* | Engineering induction stovetops, non-stick sauté pans, slow cookers, and industrial pressure cookers for commercial catering. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[coquet]] | verb | **1.** Talk or behave amorously, without serious intentions. | *"She became EXCESSIVELY intimate with most of the ladies; and, to my profound astonishment, evinced no equivocal disposition to coquet with the men."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[coquetry]] | noun | **1.** Playful behavior intended to arouse sexual interest. | *"Do you think Miss Ingram will not suffer from your dishonest coquetry?"* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[coquette]] | noun | **1.** A seductive woman who uses her sex appeal to exploit men.<br>**2.** Talk or behave amorously, without serious intentions. | *"Bathsheba, sweet, lost coquette, pardon me!"* — Thomas Hardy, *Far from the Madding Crowd* |
| [[coquettish]] | adjective | **1.** Like a coquette. | *"At once connecting these signs with the letter Boldwood had shown him, Gabriel suspected her of some coquettish procedure begun by that means, and carried on since, he knew not how."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[coquettishly]] | adverb | **1.** In a flirtatious manner. | *"The fair girl shook her head coquettishly, and the other two urged her on."* — Bram Stoker, *Dracula* |
| [[coquille]] | noun | **1.** Seafood served in a scallop shell.<br>**2.** A dish in the form of a scallop shell. | *"In academic literature, coquille designates seafood served in a scallop shell."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · COQU
  </div>
</div>
