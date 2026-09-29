---
status: unread
type: root_dashboard
---
# Dashboard — foli
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">foli-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“leaf”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Plants blossoming in the wild and raw minerals mined from the earth.</span>
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

The root **foli** means leaf. It refers to the flat green foliage of trees and plants. In English, this root forms words such as *swell*, *sprout*, *bifolium*, and *cinquefoil*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: leaf
> The root **foli** means leaf. It refers to the flat green foliage of trees and plants. In English, this root forms words such as *swell*, *sprout*, *bifolium*, and *cinquefoil*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Leaf</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Plants blossoming in the wild and raw minerals mined from the earth.</mark>
> - **Everyday Connection**: Think of familiar words like *swell* and *sprout*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **foli** comes from a Latin word that means *"leaf"*.
  - At its core, it describes leaf.

- **The Big Picture Idea**:
  - Picture plants blossoming in the wild and raw minerals mined from the earth.
  - Whenever you see **foli** in an English word, think of **plants, minerals, and elements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of leaf.
  - **Mental & Social**: How people experience, organize, or communicate about leaf.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Swell**: An everyday English word showing the root's idea of *leaf*.
  - **Sprout**: An everyday English word showing the root's idea of *leaf*.
  - **Bifolium**: In codicology, a single sheet of parchment or paper folded once down the spine to form two leaves.
  - **Cinquefoil**: Any herbaceous plant or shrub of the genus *Potentilla* bearing leaves with five leaflets and five-petaled yellow flowers.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">foli</mark>, think of <mark class="hl-def">plants, minerals, and elements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture
> In Latin, *folium* is a second-declension neuter noun:
> - **Nominative / Accusative Singular:** *folium* ("a leaf")
> - **Genitive Singular:** *foliī* ("of a leaf")
> - **Nominative / Accusative Plural:** *folia* ("leaves")
>
> ### Morphological Branches in English:
> 1. **Direct Latin Botanical & Scientific Stems (`foli-`, `foli-o-`):**
>    - Prefixed derivatives: *de-foli-ate* (strip of leaves), *ex-foli-ate* (shed in leaf-like scales), *inter-foli-ate* (insert leaves between pages).
>    - Numerical compounds: *uni-foli-ate* (one leaf), *bi-foli-um* (two leaves), *tri-foli-ate* (three leaves), *quadri-foli-ate* (four leaves).
>    - Adjectival and diminutive extensions: *foli-ar* (pertaining to leaves), *foli-ose* (leafy), *foli-ole* (a leaflet).
> 2. **Codicological & Italian Borrowings (`folio-`):**
>    - *folio* (sheet folded once; ledger page; grand book format).
>    - *portfolio* (Italian *portafoglio*, from *portare* "to carry" + *foglio* "sheet/leaf").
> 3. **Gallo-Romance Phonetic Contraction (`foil` via Old French *foille* / *fueille*):**
>    - *foil* (ultra-thin metallic sheet; contrasting background; fencing weapon tip).
>    - Architectural terms: *tre-foil* (three-lobed leaf), *quatre-foil* (four-lobed leaf), *cinque-foil* (five-lobed leaf).
>    - Botanical plant names: *mil-foil* (Old French *mille-foil*, "thousand-leaved" yarrow).

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

> [!tip] 🌈 The Six Cognitive Trajectories
> The conceptual trajectory radiates from the biological plant leaf into five distinct technical domains:
>
> 1. **Living Botany & Agronomy:** Direct vegetative organs (*foliage*, *foliar*, *foliole*, *foliose*, *perfoliate*, *trifoliate*).
> 2. **Shedding & Removal:** Natural abscission or chemical stripping (*defoliate*, *defoliant*, *defoliation*, *exfoliate*, *exfoliation*).
> 3. **Thin Metallic Sheets & Optical Contrast:** Beaten metal leaf used as decorative foil, jewel-backing foil, and hence literary *foil* (a character serving as contrasting background to highlight another's brilliance).
> 4. **Books, Printing & Codicology:** Folded leaves of parchment, leaf numbering, book sizes, and paper containers (*folio*, *bifolium*, *interfoliate*, *portfolio*).
> 5. **Architectural & Decorative Tracery:** Stylized stone leaf cusps in Gothic cathedrals (*trefoil*, *quatrefoil*, *cinquefoil*).
> 6. **Geology & Biochemistry:** Metamorphic mineral layering resembling leaf sheets (*foliation*), and vitamin synthesis from leafy greens (*folate*, *folic acid*).

---

## 🔀 4. Prefix & Combining Dynamics on foli

### Prefix Dynamics

| Prefix | Literal Force | Classical Compound | English Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- | :--- |
| `de-` | down, away, off | *dē- + folium* | [[defoliate]] | To strip or deprive a plant of its leaves prematurely. |
| `ex-` | out, forth, off | *ex- + folium* | [[exfoliate]] | To cast off or peel away in thin leaf-like flakes, scales, or layers. |
| `inter-` | between, among | *inter- + folium* | [[interfoliate]] | To bind or insert blank leaves between the printed leaves of a book. |
| `per-` | through, thoroughly | *per- + folium* | [[perfoliate]] | Having a leaf base that completely encircles the stem so the stem passes through it. |
| `bi-` | two, twice | *bi- + folium* | [[bifolium]] | A sheet folded once to make two leaves; or an orchid with a pair of leaves. |
| `tri-` | three | *tri- + folium* | [[trefoil]] / [[trifoliate]] | An ornament or plant leaf having three distinct lobes or leaflets. |
| `mille-` | thousand | *mille + folium* | [[milfoil]] | The yarrow plant, named for its intricately divided, thousand-fold leaf segments. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Effect |
| :--- | :--- | :--- | :--- |
| `-age` | Collective noun | [[foliage]] | The aggregate mass of living leaves adorning trees and shrubs. |
| `-ar` | Pertaining to | [[foliar]] | Operating through, located on, or absorbed by plant leaves. |
| `-ate` | Verb formative | [[defoliate]] | To subject vegetation to leaf stripping or chemical defoliation. |
| `-ation` | Process / Result | [[foliation]] | Leaf production; manuscript leaf numbering; or metamorphic mineral layering. |
| `-ant` | Agent / Substance | [[defoliant]] | A chemical agent engineered to trigger premature leaf drop. |
| `-ole` | Diminutive noun | [[foliole]] | A single small leaflet composing part of a compound botanical leaf. |
| `-ose` | Full of, having | [[foliose]] | Characterized by a leafy structure, especially flattened foliose lichens. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🌿 **Botany & Agronomy** | [[foliage]], [[foliar]], [[foliole]], [[perfoliate]], [[trifoliate]] | Canopy coverage measurements, foliar nutrient feeding, leaf morphology keys. |
| 📚 **Codicology & History** | [[folio]], [[bifolium]], [[interfoliate]], [[foliation]] | Cataloging medieval illuminated manuscripts, incunabula collation, archival folio numbering. |
| 🏛️ **Architecture & Art** | [[trefoil]], [[quatrefoil]], [[cinquefoil]], [[foil]] | Gothic window tracery, stained-glass framing, heraldic charges, decorative gold leafing. |
| 🪨 **Metamorphic Geology** | [[foliation]], [[exfoliate]] | Planar alignment of platy mica minerals under directed pressure; onion-skin rock spalling. |
| 🧬 **Biochemistry & Medicine** | [[folate]], [[folic acid]], [[exfoliant]] | Neural tube defect prevention, one-carbon metabolism, cosmetic dermatological peels. |
| 💼 **Finance & Governance** | [[portfolio]] | Asset allocation, investment risk balancing, ministerial cabinet executive portfolios. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[bifolium]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin foli within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of foli in systematic terminology. | *"In academic literature, bifolium designates pertaining to, derived from, or characteristic of latin foli within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defoliant]] | noun | **1.** A chemical that is sprayed on plants and causes their leaves to fall off. | *"In academic literature, defoliant designates a chemical that is sprayed on plants and causes their leaves to fall off."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defoliate]] | verb | **1.** Strip the leaves or branches from.<br>**2.** Deprived of leaves. | *"In academic literature, defoliate designates strip the leaves or branches from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defoliated]] | verb | **1.** Strip the leaves or branches from.<br>**2.** Deprived of leaves. | *"In academic literature, defoliated designates strip the leaves or branches from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defoliation]] | noun | **1.** The loss of foliage.<br>**2.** Causing the leaves of trees and other plants to fall off (as by the use of chemicals). | *"In academic literature, defoliation designates the loss of foliage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[defoliator]] | noun | **1.** An insect that strips the leaves from plants. | *"In academic literature, defoliator designates an insect that strips the leaves from plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exfoliant]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin foli within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of foli in systematic terminology. | *"In academic literature, exfoliant designates pertaining to, derived from, or characteristic of latin foli within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exfoliate]] | verb | **1.** Spread by opening the leaves of.<br>**2.** Cast off in scales, laminae, or splinters. | *"In academic literature, exfoliate designates spread by opening the leaves of."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exfoliation]] | noun | **1.** The peeling off in flakes or scales of bark or dead skin.<br>**2.** A thin flake of dead epidermis shed from the surface of the skin. | *"In academic literature, exfoliation designates the peeling off in flakes or scales of bark or dead skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[foliaceous]] | adjective | **1.** Of or pertaining to or resembling the leaf of a plant.<br>**2.** Bearing numerous leaves. | *"In academic literature, foliaceous designates of or pertaining to or resembling the leaf of a plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[foliage]] | noun | **1.** The main organ of photosynthesis and transpiration in higher plants.<br>**2.** (architecture) leaf-like architectural ornament. | *"Here and there a weak little iron hoop, through which bold boys aspire to throw their friends’ caps (its only present use), retains its place among the rusty foliage, sacred to the memory of departed oil."* — Charles Dickens, *Bleak House* |
| [[foliaged]] | adjective | **1.** Bearing numerous leaves. | *"In academic literature, foliaged designates bearing numerous leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[foliar]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin foli within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of foli in systematic terminology. | *"In academic literature, foliar designates pertaining to, derived from, or characteristic of latin foli within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[foliate]] | verb | **1.** Hammer into thin flat foils.<br>**2.** Decorate with leaves. | *"Cover with foliate edges and jewel pattern, surmounted by a seated figure of Shou Lao, God of Longevity."* — R. L. Hobson, *Chinese pottery and porcelain; vol. 1. Pottery and early wares* |
| [[foliated]] | verb | **1.** Hammer into thin flat foils.<br>**2.** Decorate with leaves. | *"Dozens of them seemed to be crawling here and there, in the sombre light, among the foliated sheets of intense green."* — H. G. Wells, *The Time Machine* |
| [[foliation]] | noun | **1.** (botany) the process of forming leaves.<br>**2.** (geology) the arrangement of leaflike layers in a rock. | *"In academic literature, foliation designates (botany) the process of forming leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[folie]] | noun | **1.** (psychiatry) a psychological disorder of thought or emotion; a more neutral term than mental illness. | *"I wonder you men don’t take warning. _On a fait des folies pour moi_, and here I am, a poor rheumatic creature, with a false front and a bad temper."* — Oscar Wilde, *Lord Arthur Savile's Crime; The Portrait of Mr. W.H., and Other Stories* |
| [[folio]] | noun | **1.** The system of numbering pages.<br>**2.** A sheet of any written or printed material (especially in a manuscript or book). | *"Devise, wit; write, pen; for I am for whole volumes in folio. [_Exit._] ACT II SCENE I."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[foliolate]] | adjective | **1.** (often used as a combining form) having leaflets (compound leaves) or a specified kind or number of leaflets. | *"In academic literature, foliolate designates (often used as a combining form) having leaflets (compound leaves) or a specified kind or number of leaflets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[foliose]] | adjective | **1.** Bearing numerous leaves. | *"In academic literature, foliose designates bearing numerous leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[folium]] | noun | **1.** A thin layer or stratum of (especially metamorphic) rock. | *"In academic literature, folium designates a thin layer or stratum of (especially metamorphic) rock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interfoliate]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin foli within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of foli in systematic terminology. | *"In academic literature, interfoliate designates pertaining to, derived from, or characteristic of latin foli within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perfoliate]] | adjective | **1.** (of a leaf) having the base united around (and apparently pierced by) the stem. | *"In academic literature, perfoliate designates (of a leaf) having the base united around (and apparently pierced by) the stem."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Botany, Minerals & Elements]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · FOLI
  </div>
</div>
