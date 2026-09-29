---
status: unread
type: root_dashboard
---
# Dashboard — vin
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">vin-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“wine”</span>
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

The root **vin** means wine. It refers to wine, the grapevine, fermentation, harvest. In English, this root forms words such as *vinaigrette*, *vinaceous*, *vine*, and *vinegar*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: wine
> The root **vin** means wine. It refers to wine, the grapevine, fermentation, harvest. In English, this root forms words such as *vinaigrette*, *vinaceous*, *vine*, and *vinegar*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Wine</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering at a dining table to share nourishment, bread, and refreshing water.</mark>
> - **Everyday Connection**: Think of familiar words like *vinaigrette* and *vinaceous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **vin** comes from a Latin word that means *"wine"*.
  - At its core, it describes wine.

- **The Big Picture Idea**:
  - Picture gathering at a dining table to share nourishment, bread, and refreshing water.
  - Whenever you see **vin** in an English word, think of **food, eating, and drinking**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of wine.
  - **Mental & Social**: How people experience, organize, or communicate about wine.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Vinaigrette**: A cold dressing or sauce made by emulsifying vinegar or lemon juice with oil, herbs, and seasonings.
  - **Vinaceous**: Having the dark brownish-purple or deep reddish hue of red wine.
  - **Vine**: Any climbing or trailing plant with tendrils, especially the common grapevine.
  - **Vinegar**: A sour liquid consisting mainly of acetic acid and water, produced by the bacterial fermentation of ethanol in wine, cider, or beer.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">vin</mark>, think of <mark class="hl-def">food, eating, and drinking</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of Latin *vīnum* & *vīnea*
> The root **vin** expands into English through several well-defined morphological engines:
> 1. **The Latin Base *vīnum* ("wine"):**
>    - *vīnum* + *-ōsus* $ightarrow$ *vīnōsus* $ightarrow$ **vinous**, **vinosity**.
>    - *vīnum* + *-āceus* $ightarrow$ *vīnāceus* $ightarrow$ **vinaceous** (wine-colored).
>    - *vīnum* + *-lentus* ("full of") $ightarrow$ *vīnolentus* $ightarrow$ **vinolent**, **vinolence**.
>    - *vīnum* + *facere* ("to make") $ightarrow$ *vinificātiō* $ightarrow$ **vinification**, **vinify**.
>    - *vīnum* + *cultūra* $ightarrow$ **viniculture**, **viniculturist**.
>    - *vīnum* + *dēmere* ("to take away") $ightarrow$ *vindēmia* ("grape-harvest") $ightarrow$ Anglo-French *vintage* $ightarrow$ **vintage**, **vintager**.
> 2. **The Compound *vīnum acre* ("sour wine"):**
>    - *vīnum* + *ācre* ("sharp, sour") $ightarrow$ Old French *vinaigre* $ightarrow$ **vinegar**, **vinegary**.
>    - Diminutive *-ette* $ightarrow$ **vinaigrette** (salad dressing / smelling-salts flask).
> 3. **The Nominal Base *vīnea* ("grapevine / vineyard"):**
>    - *vīnea* $ightarrow$ Old French *vigne* $ightarrow$ English **vine**, **viny**, **vinery**.
>    - *vīnea* + Germanic *geard* ("enclosure") $ightarrow$ **vineyard**.
>    - Diminutive *vignette* ("little vine") $ightarrow$ **vignette**.
> 4. **The Agent Noun *vīnētārius* ("wine merchant"):**
>    - Medieval Latin *vīnētārius* $ightarrow$ Anglo-French *vintener* $ightarrow$ English **vintner**, **vintnery**.
> 5. **The Sister Stem *vītis* ("vine"):**
>    - *vītis* + *cultūra* $ightarrow$ **viticulture**, **viticultural**, **viticulturist**.

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
                                  ┌── The Grapevine & Soil ───── vine, viny, vinery, vineyard, viticulture
                                  │
                                  ├── The Fermentation Craft ─── vinification, vinify, viniculture, vinology
                                  │
    [VIN-] ───────────────────────┼── The Harvest & Merchant ─── vintage, vintager, vintner, vintnery
  (wine / vine)                   │
                                  ├── Sensory & Chemical ─────── vinous, vinosity, vinaceous, vinic
                                  │
                                  ├── Acetic Acid & Dressing ─── vinegar, vinegary, vinaigrette
                                  │
                                  └── Artistic & Literary ────── vignette (little vine border)
```

> [!tip] 🌈 Thematic Categories of the Derived Vocabulary
> 1. **Viticulture & Vineyard Management:** *vine*, *viny*, *vinery*, *vineyard*, *vitis*, *viticulture*, *viticultural*, *viticulturist*.
> 2. **Enology & Cellar Science:** *vinification*, *vinify*, *viniculture*, *vinology*, *vinometer*, *vinic*.
> 3. **The Harvest, Vintage & Trade:** *vintage*, *vintager*, *vintner*, *vintnery*, *wine*, *winery*.
> 4. **Sensory Attributes & Sommelier Lexicon:** *vinous*, *vinosity*, *vinaceous*, *vinolent*, *vinolence*.
> 5. **Culinary Acidity:** *vinegar*, *vinegary*, *vinaigrette*.
> 6. **Graphic Arts & Literature:** *vignette*.

---

## 🔀 4. Prefix & Combining Dynamics on vin

### Compounding Elements

| Compounding Element | Element Meaning | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `vin-` + `dēmere` | wine + to take off/strip | **vintage** | The seasonal stripping of ripe grapes from the vine; the year's wine. |
| `vin-` + `ācer` | wine + sharp/sour | **vinegar** | "Sour wine"—wine converted by acetic acid bacteria into culinary vinegar. |
| `vini-` + `-culture` | wine + cultivation | **viniculture** | The specialized agricultural cultivation of grapevines for winemaking. |
| `vini-` + `-fication` | wine + making | **vinification** | The biochemical process of converting grape must into finished wine. |
| `vini-` + `-logy` | wine + study | **vinology** | The scientific study of grape varieties and cellar enology. |
| `vigne` + `-ette` | vine + diminutive | **vignette** | Originally a small running vine-leaf border; now an evocative literary sketch. |

### Suffix Transformations

| Suffix | Morphological Role | Formed Word | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-ous` (Latin *-ōsus*) | Adjective of fullness / quality | **vinous** | Possessing the distinctive aroma, flavor, or character of wine. |
| `-osity` (Latin *-ōsitās*) | Abstract noun (essence / trait) | **vinosity** | The quality or aromatic bouquet characteristic of good wine. |
| `-ner` (Anglo-French agent) | Agent noun | **vintner** | A professional merchant, distributor, or maker of wines. |
| `-yard` | Locative noun | **vineyard** | A dedicated agricultural field planted with grapevines. |
| `-ette` | Diminutive noun | **vinaigrette**, **vignette** | A light vinegar dressing or small decorative illustration. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 🍇 **Enology, Viticulture & Sommelier Craft** | *vintage*, *viniculture*, *vinification*, *vinosity*, *vintner* | Classifying terroir, managing canopy exposure, regulating malolactic fermentation, and assigning vintage cellar ratings. |
| 🥗 **Gastronomy & Culinary Chemistry** | *vinegar*, *vinaigrette*, *vinous* | Formulating classical vinaigrette emulsions; deglazing roasting pans with dry vinous reductions to balance pan sauces. |
| 📚 **Literature, Publishing & Typography** | *vignette* | Composing self-contained narrative vignettes in memoir writing; designing ornamental woodcut headpieces for fine press books. |
| 📜 **Roman History & Imperial Economics** | *vineyard*, *vintage*, *posca* | Analyzing the trans-Mediterranean trade in Dressel 1 amphorae; tracking Roman land redistribution under agrarian laws. |
| 🔬 **Organic Chemistry & Fermentation** | *vinic*, *vinometer*, *acetic acid* | Distilling vinic spirits; measuring alcohol by volume (ABV) in dry table wines using calibrated vinometers. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[alvine]] | adjective | **1.** Of or relating to the intestines. | *"In academic literature, alvine designates of or relating to the intestines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asvina]] | noun | **1.** The seventh month of the hindu calendar. | *"In academic literature, asvina designates the seventh month of the hindu calendar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asvins]] | noun | **1.** (literally `possessing horses' in sanskrit) in hinduism the twin chariot warriors conveying surya. | *"In academic literature, asvins designates (literally `possessing horses' in sanskrit) in hinduism the twin chariot warriors conveying surya."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convince]] | verb | **1.** Make (someone) agree, understand, or realize the truth or validity of something. | *"Your Italy contains none so accomplish’d a courtier to convince the honour of my mistress, if in the holding or loss of that you term her frail."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[convinced]] | verb | **1.** Make (someone) agree, understand, or realize the truth or validity of something.<br>**2.** Persuaded of; very sure. | *"Or heard him say (as knaves be such abroad, Who having, by their own importunate suit, Or voluntary dotage of some mistress, Convinced or supplied them, cannot choose But they must blab.) OTHELLO."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[convincible]] | adjective | **1.** Being susceptible to persuasion. | *"In academic literature, convincible designates being susceptible to persuasion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[convincing]] | verb | **1.** Make (someone) agree, understand, or realize the truth or validity of something.<br>**2.** Causing one to believe the truth of something. | *"Guppy, “give up the whole thing, if I understand you, Tony?” “You never,” returns Tony with a most convincing steadfastness, “said a truer word in all your life."* — Charles Dickens, *Bleak House* |
| [[convincingly]] | adverb | **1.** In a convincing manner. | *"It never has been convincingly shown, however, that there is any large measure of correspondence in time (not to say causal relation) between tariff revisions and crises.[13] § 15. #Rhythmic changes in weather and in crops#."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[convincingness]] | noun | **1.** The power of argument or evidence to cause belief. | *"In academic literature, convincingness designates the power of argument or evidence to cause belief."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[corvine]] | adjective | **1.** Relating to or resembling a crow. | *"In academic literature, corvine designates relating to or resembling a crow."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divination]] | noun | **1.** Successful conjecture by unusual insight or good luck.<br>**2.** A prediction uttered under divine inspiration. | *"Yet speak, Morton; Tell thou an earl his divination lies, And I will take it as a sweet disgrace And make thee rich for doing me such wrong."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divinatory]] | adjective | **1.** Resembling or characteristic of a prophet or prophecy.<br>**2.** Based primarily on surmise rather than adequate evidence. | *"In academic literature, divinatory designates resembling or characteristic of a prophet or prophecy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[divine]] | noun | **1.** Terms referring to the judeo-christian god.<br>**2.** A clergyman or other person in religious orders. | *"Nothing sweet boy, but yet like prayers divine, I must each day say o’er the very same, Counting no old thing old, thou mine, I thine, Even as when first I hallowed thy fair name."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[divinely]] | adverb | **1.** By divine means. | *"Lo, in this right hand, whose protection Is most divinely vow’d upon the right Of him it holds, stands young Plantagenet, Son to the elder brother of this man, And king o’er him and all that he enjoys."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[diviner]] | noun | **1.** Someone who claims to discover hidden knowledge with the aid of supernatural powers.<br>**2.** Emanating from god; ; ; -saturday review. | *"The sorrow that has been in her face—for it is not there now—seems to have purified even its innocent expression and to have given it a diviner quality."* — Charles Dickens, *Bleak House* |
| [[divinity]] | noun | **1.** Any supernatural being worshipped as controlling some part of the world or some aspect of life or who is the personification of a force.<br>**2.** The quality of being divine. | *"There’s such divinity doth hedge a king, That treason can but peep to what it would, Acts little of his will.—Tell me, Laertes, Why thou art thus incens’d.—Let him go, Gertrude:— Speak, man."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[evince]] | verb | **1.** Give expression to. | *"He spent years and years in desultory studies, undertakings, and meditations; he began to evince considerable indifference to social forms and observances."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[invincibility]] | noun | **1.** The property being difficult or impossible to defeat. | *"Kutúzov alone at last gains a real victory, destroying the spell of the invincibility of the French, and the Minister of War does not even care to hear the details.” “That’s just it, my dear fellow."* — graf Leo Tolstoy, *War and Peace* |
| [[invincible]] | adjective | **1.** Incapable of being overcome or subdued. | *"You were used to load me With precepts that would make invincible The heart that conned them."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[invincibly]] | adverb | **1.** In an invincible manner. | *"Mind you don’t flinch, whatever you do.” “I’ll be sure not to!” she said invincibly."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[province]] | noun | **1.** The territory occupied by one of the constituent administrative districts of a nation.<br>**2.** The proper sphere or extent of your activities. | *"Say ’tis not so, a province I will give thee, And make thy fortunes proud."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provincial]] | noun | **1.** (roman catholic church) an official in charge of an ecclesiastical province acting under the superior general of a religious order.<br>**2.** A country person. | *"Would not this, sir, and a forest of feathers, if the rest of my fortunes turn Turk with me; with two Provincial roses on my razed shoes, get me a fellowship in a cry of players, sir?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[provincialism]] | noun | **1.** A lack of sophistication.<br>**2.** A partiality for some particular place. | *"Besides, the English whalers sometimes affect a kind of metropolitan superiority over the American whalers; regarding the long, lean Nantucketer, with his nondescript provincialisms, as a sort of sea-peasant."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[provincially]] | adverb | **1.** By the province; through the province. | *"The train presently arrived, and Miss Stackpole, promptly descending, proved, as Isabel had promised, quite delicately, even though rather provincially, fair."* — Henry James, *The Portrait of a Lady — Volume 1* |
| [[unconvinced]] | adjective | **1.** Lacking conviction. | *"There was Slant-Eyed Wilson, with an unguessed weak heart of fear, who died in the jacket within the first hour while the unconvinced inefficient of a prison doctor looked on and smiled."* — Jack London, *The Jacket (The Star-Rover)* |
| [[unconvincing]] | adjective | **1.** Not convincing.<br>**2.** Having a probability too low to inspire belief. | *"In academic literature, unconvincing designates not convincing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unconvincingly]] | adverb | **1.** In an unconvincing manner. | *"In academic literature, unconvincingly designates in an unconvincing manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinaceous]] | adjective | **1.** Of or relating to wine.<br>**2.** Of the color of wine. | *"In academic literature, vinaceous designates of or relating to wine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinaigrette]] | noun | **1.** Oil and vinegar with mustard and garlic. | *"Because,” said Lord Henry, passing beneath his nostrils the gilt trellis of an open vinaigrette box, “one can survive everything nowadays except that."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[vinca]] | noun | **1.** Periwinkles: low creeping evergreen perennials. | *"PERIWINKLE RUST; spots yellowish; sori small, subrotund, and oval, on the under surface, surrounded by the ruptured epidermis; spores oval, rather ovoid, brown.—On leaves of _Vinca major_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[vincetoxicum]] | noun | **1.** Genus of chiefly tropical american vines having cordate leaves and large purple or greenish cymose flowers; supposedly having powers as an antidote. | *"In academic literature, vincetoxicum designates genus of chiefly tropical american vines having cordate leaves and large purple or greenish cymose flowers; supposedly having powers as an antidote."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vincible]] | adjective | **1.** Susceptible to being defeated. | *"In academic literature, vincible designates susceptible to being defeated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vincristine]] | noun | **1.** Periwinkle plant derivative used as an antineoplastic drug (trade name oncovin); used to treat cancer of the lymphatic system. | *"In academic literature, vincristine designates periwinkle plant derivative used as an antineoplastic drug (trade name oncovin); used to treat cancer of the lymphatic system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vine]] | noun | **1.** A plant with a weak stem that derives support from climbing, twining, or creeping along a surface. | *"Come, thou monarch of the vine, Plumpy Bacchus with pink eyne!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vinegar]] | noun | **1.** Sour-tasting liquid produced usually by oxidation of the alcohol in wine or cider and used as a condiment or food preservative.<br>**2.** Dilute acetic acid. | *"And other of such vinegar aspect That they’ll not show their teeth in way of smile Though Nestor swear the jest be laughable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[vinegariness]] | noun | **1.** A sourness resembling that of vinegar. | *"In academic literature, vinegariness designates a sourness resembling that of vinegar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinegarish]] | adjective | **1.** Tasting or smelling like vinegar.<br>**2.** Having a sour disposition; ill-tempered. | *"In academic literature, vinegarish designates tasting or smelling like vinegar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinegarishness]] | noun | **1.** A sourness resembling that of vinegar. | *"In academic literature, vinegarishness designates a sourness resembling that of vinegar."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinegarroon]] | noun | **1.** Large whip-scorpion of mexico and southern united states that emits a vinegary odor when alarmed. | *"In academic literature, vinegarroon designates large whip-scorpion of mexico and southern united states that emits a vinegary odor when alarmed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinegarweed]] | noun | **1.** Aromatic plant of western united states. | *"In academic literature, vinegarweed designates aromatic plant of western united states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinegary]] | adjective | **1.** Tasting or smelling like vinegar.<br>**2.** Having a sour disposition; ill-tempered. | *"We two entered meeting, unexpectedly, not a perfumed and fascinating damsel, but a vinegary countenance which I recognized at once as that of Doña Guedita."* — Benito Pérez Galdós, *Saragossa: A Story of Spanish Valor* |
| [[vinery]] | noun | **1.** A farm of grapevines where wine grapes are produced. | *"In academic literature, vinery designates a farm of grapevines where wine grapes are produced."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vineyard]] | noun | **1.** A farm of grapevines where wine grapes are produced. | *"He hath a garden circummured with brick, Whose western side is with a vineyard backed; And to that vineyard is a planched gate That makes his opening with this bigger key."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[viniculture]] | noun | **1.** The cultivation of grapes and grape vines; grape growing. | *"In academic literature, viniculture designates the cultivation of grapes and grape vines; grape growing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinifera]] | noun | **1.** Common european grape cultivated in many varieties; chief source of old world wine and table grapes. | *"In academic literature, vinifera designates common european grape cultivated in many varieties; chief source of old world wine and table grapes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinification]] | noun | **1.** The process whereby fermentation changes grape juice into wine. | *"In academic literature, vinification designates the process whereby fermentation changes grape juice into wine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinify]] | verb | **1.** Convert a juice into wine by fermentation. | *"In academic literature, vinify designates convert a juice into wine by fermentation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vino]] | noun | **1.** Fermented juice (of grapes especially). | *"Nunc vino pellite curas, Cras ingens iterabimus aequor,'" and the Bacchanalian, quoting the above with a House of Commons air, tossed off nearly a thimbleful of wine with an immense flourish of his glass."* — William Makepeace Thackeray, *Vanity Fair* |
| [[vinogradoff]] | noun | **1.** British historian (born in russia) (1854-1925). | *"In academic literature, vinogradoff designates british historian (born in russia) (1854-1925)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinology]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vin within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vin in systematic terminology. | *"In academic literature, vinology designates pertaining to, derived from, or characteristic of latin vin within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinous]] | adjective | **1.** Of or relating to wine. | *"Trotter's flushed countenance and defective intonation, that he, too, had had recourse to vinous stimulus."* — William Makepeace Thackeray, *Vanity Fair* |
| [[vinson]] | noun | **1.** United states jurist who served as chief justice of the supreme court (1890-1953). | *"In academic literature, vinson designates united states jurist who served as chief justice of the supreme court (1890-1953)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vintage]] | noun | **1.** A season's yield of wine from a vineyard.<br>**2.** The oldness of wines. | *"Was not the gleaning of the grapes of Ephraim better than the vintage of Abi-ezer?"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[vintager]] | noun | **1.** A person who harvests grapes for making wine. | *"In academic literature, vintager designates a person who harvests grapes for making wine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vintner]] | noun | **1.** Someone who sells wine.<br>**2.** Someone who makes wine. | *"Lords, Officers, Sheriff, Vintner, Chamberlain, Drawers, Carriers, Ostler, Messengers, Servant, Travellers and Attendants."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[viny]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin vin within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of vin in systematic terminology. | *"Richard's letter braced my viny drooping of mind at once and from thinking into the Crag's affairs of sentiment, I turned with masculine vigor to begin to mix into his affairs of finance."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[vinyl]] | noun | **1.** A univalent chemical radical derived from ethylene.<br>**2.** Shiny and tough and flexible plastic; used especially for floor coverings. | *"In academic literature, vinyl designates a univalent chemical radical derived from ethylene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinylbenzene]] | noun | **1.** A colorless oily liquid; the monomer for polystyrene. | *"In academic literature, vinylbenzene designates a colorless oily liquid; the monomer for polystyrene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[vinylite]] | noun | **1.** Any of various vinyl resins. | *"In academic literature, vinylite designates any of various vinyl resins."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · VIN
  </div>
</div>
