---
status: unread
type: root_dashboard
---
# Dashboard — pota
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pota-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“to drink”</span>
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

The root **pota** means to drink. It refers to drink, draught, drinkable fluid. In English, this root forms words such as *compotation*, *compotator*, *impotable*, and *perpotation*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: to drink
> The root **pota** means to drink. It refers to drink, draught, drinkable fluid. In English, this root forms words such as *compotation*, *compotator*, *impotable*, and *perpotation*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">To drink</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering at a dining table to share nourishment, bread, and refreshing water.</mark>
> - **Everyday Connection**: Think of familiar words like *compotation* and *compotator*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pota** comes from a Latin word that means *"to drink"*.
  - At its core, it describes the action of drink.

- **The Big Picture Idea**:
  - Picture gathering at a dining table to share nourishment, bread, and refreshing water.
  - Whenever you see **pota** in an English word, think of **to drink**.

- **How the Meaning Grows**:
  - **Physical**: Moving, interacting, or handling things physically (to drink).
  - **Mental & Social**: Applying this action to thoughts, speech, feelings, or decisions.
  - **Abstract & Practical**: Formal rules, legal terms, or scientific processes carrying out this function.

- **Everyday English Words to Remember It By**:
  - **Compotation**: The act of drinking or carousing together.
  - **Compotator**: A companion in drinking.
  - **Impotable**: Unfit or unsafe for human drinking.
  - **Perpotation**: The act of drinking heavily and continuously.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pota</mark>, think of <mark class="hl-def">to drink</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of Latin *pōtāre*
> English acquired derivatives of *pōtāre* through several distinct linguistic pipelines:
> 1. **The Verbal Stem `pota-` + Participial `potat-`:**
>    - *pōtā-* + *-bilis* $ightarrow$ *pōtābilis* $ightarrow$ **potable**, **potability**, **potableness**.
>    - *pōtāt-* + *-iō* $ightarrow$ *pōtātiō* $ightarrow$ **potation** (the act of drinking; a beverage).
>    - *com-* + *pōtāre* $ightarrow$ *compōtātiō* $ightarrow$ **compotation** (drinking together).
>    - *com-* + *pōtātor* $ightarrow$ **compotator** (drinking companion).
>    - *per-* + *pōtāt-* + *-iō* $ightarrow$ *perpōtātiō* $ightarrow$ **perpotation** (continuous drinking).
> 2. **The Classical Noun *pōtiō* ("draught, drink"):**
>    - **The Learned Latin Stream:** Latin *pōtiō* $ightarrow$ English **potion** (medicinal/magical drink).
>    - **The Gallo-Romance Stream:** Latin *pōtiō* $ightarrow$ Old French *poison* $ightarrow$ English **poison**, **poisonous**, **poisoner**.
> 3. **The Instrumental Vessel Noun *pōculum* ("drinking cup"):**
>    - *pōculum* + *-lentus* $ightarrow$ *pōculentus* $ightarrow$ **poculent** (fit for drinking).
>    - *pōculum* + *forma* $ightarrow$ **poculiform** (cup-shaped, botanical).
> 4. **Scientific Hybrid Compounds:**
>    - *pōtō-* + *-mania* $ightarrow$ **potomania** (pathological thirst or dipsomania).
>    - *pōtō-* + *-meter* $ightarrow$ **potometer** (instrument measuring plant water uptake).

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
                                  ┌── Safety & Purity ────────── potable, potability, potables, unpotable, impotable
                                  │
                                  ├── Conviviality & Carousal ── potation, compotation, compotator, perpotation, potator
                                  │
    [POTA-] ──────────────────────┼── Medicinal & Alchemical ─── potion (pōtiō)
 (to drink / draught)             │
                                  ├── Toxicology & Lethality ─── poison, poisonous, poisoner, poisonously
                                  │
                                  └── Botany & Instruments ───── poculiform (cup-shaped), poculent, potometer
```

> [!tip] 🌈 Thematic Categories of the Derived Vocabulary
> 1. **Hydrology & Public Health:** *potable*, *potables*, *potability*, *potableness*, *unpotable*, *impotable*.
> 2. **Taverns, Banquets & Excess:** *potation*, *compotation*, *compotator*, *perpotation*, *potator*, *potatory*, *potulent*.
> 3. **Pharmacy & Magic:** *potion*.
> 4. **Toxicology & Forensics:** *poison*, *poisonous*, *poisoner*, *poisonously*.
> 5. **Plant Physiology & Morphology:** *potometer*, *poculiform*, *poculent*.

---

## 🔀 4. Prefix & Combining Dynamics on pota

### Prefix Dynamics

| Prefix / Combining Form | Core Value | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `com-` | together, with | **compotation**, **compotator** | Drinking together in convivial company; fellow symposiasts. |
| `per-` | thoroughly, completely | **perpotation** | Drinking without interruption; a prolonged bout of heavy intoxication. |
| `in-` / `un-` | not, un- | **impotable**, **unpotable** | Not suitable or safe for human drinking; toxic or brackish. |
| `poto-` + `-meter` | drink + measure | **potometer** | A scientific apparatus that measures the rate at which a cut plant shoot "drinks" water. |
| `poto-` + `-mania` | drink + madness | **potomania** | Uncontrollable, pathological craving for liquids or alcoholic drink. |

### Suffix Transformations

| Suffix | Morphological Role | Formed Word | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-able` (Latin *-ābilis*) | Adjective of fitness/capacity | **potable** | Capable or fit to be safely consumed as a beverage. |
| `-tion` (Latin *-tiō*) | Noun of action / instance | **potation**, **potion** | The act of drinking, or the liquid draught so consumed. |
| `-or` | Agent noun | **compotator**, **potator** | One who drinks or participates in a drinking gathering. |
| `-ulent` (Latin *-ulentus*) | Adjective (full of / prone to) | **potulent**, **poculent** | Suitable to drink; or tipsy with liquor. |
| `-ous` | Adjective (endowed with) | **poisonous** | Capable of inflicting injury or death through chemical toxicity. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 🚰 **Civil & Environmental Engineering** | *potable*, *potability*, *unpotable* | Designing municipal water filtration plants, desalination facilities, and verifying drinking water compliance under the Safe Drinking Water Act. |
| ☠️ **Toxicology, Pharmacology & Forensics** | *poison*, *poisonous*, *poisoner*, *potion* | Isolating lethal alkaloids (arsenic, cyanide, strychnine) in autopsy specimens; studying LD50 toxicity thresholds and antidote administration. |
| 🌿 **Plant Physiology & Agronomy** | *potometer*, *poculiform* | Measuring transpirational water loss in crop foliage using potometers; classifying cup-shaped fungal apothecia and floral corollas. |
| 📜 **Classical Literature & History** | *compotation*, *compotator*, *perpotation* | Translating Cicero, Horace, and Seneca; analyzing Roman sympotic customs and rhetorical denunciations of drunken debauchery. |
| 🍷 **Gastronomy & Beverage Industry** | *potables*, *potation* | Categorizing commercial wine lists, spirits portfolios, and specialty craft cocktail menus. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[potable]] | noun | **1.** Any liquid suitable for drinking.<br>**2.** Suitable for drinking. | *"In academic literature, potable designates any liquid suitable for drinking."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[potage]] | noun | **1.** Thick (often creamy) soup. | *"Mouton aux navets," added the butler gravely (pronounce, if you please, moutongonavvy); "and the soup is potage de mouton a l'Ecossaise."* — William Makepeace Thackeray, *Vanity Fair* |
| [[potash]] | noun | **1.** A potassium compound often used in agriculture and industry. | *"Would he obtain air by chemical means, in getting by heat the oxygen contained in chlorate of potash, and in absorbing carbonic acid by caustic potash?"* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[potassium]] | noun | **1.** A light soft silver-white metallic element of the alkali metal group; oxidizes rapidly in air and reacts violently with water; is abundant in nature in combined forms occurring in sea water and in carnallite and kainite and sylvite. | *"In a thousand grammes are found 96½ per cent. of water, and about 2-2/3 per cent. of chloride of sodium; then, in a smaller quantity, chlorides of magnesium and of potassium, bromide of magnesium, sulphate of magnesia, sulphate and carbonate of lime."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[potation]] | noun | **1.** A serving of drink (usually alcoholic) drawn from a keg.<br>**2.** The act of drinking (especially an alcoholic drink). | *"Many of the company were furnished with pipes, and most of them with some kind of evening potation."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[potato]] | noun | **1.** An edible tuber native to south america; a staple food of ireland.<br>**2.** Annual native to south america having underground stolons bearing edible starchy tubers; widely cultivated as a garden vegetable; vines are poisonous. | *"How the devil Luxury, with his fat rump and potato finger, tickles these together!"* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · POTA
  </div>
</div>
