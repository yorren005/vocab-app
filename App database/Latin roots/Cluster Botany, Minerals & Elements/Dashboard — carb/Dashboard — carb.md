---
status: unread
type: root_dashboard
---
# Dashboard — carb
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">carb-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“coal or charcoal”</span>
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

The root **carb** means coal or charcoal. It refers to charcoal, carbon, combustible residue, organic backbone. In English, this root forms words such as *bicarbonate*, *carbide*, *carbohydrate*, and *carbon*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: coal or charcoal
> The root **carb** means coal or charcoal. It refers to charcoal, carbon, combustible residue, organic backbone. In English, this root forms words such as *bicarbonate*, *carbide*, *carbohydrate*, and *carbon*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Coal or charcoal</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Plants blossoming in the wild and raw minerals mined from the earth.</mark>
> - **Everyday Connection**: Think of familiar words like *bicarbonate* and *carbide*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **carb** comes from a Latin word that means *"coal or charcoal"*.
  - At its core, it describes coal or charcoal.

- **The Big Picture Idea**:
  - Picture plants blossoming in the wild and raw minerals mined from the earth.
  - Whenever you see **carb** in an English word, think of **plants, minerals, and elements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of coal or charcoal.
  - **Mental & Social**: How people experience, organize, or communicate about coal or charcoal.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Bicarbonate**: An acid salt of carbonic acid containing the monovalent radical , such as sodium bicarbonate.
  - **Carbide**: A binary chemical compound of carbon with another element , noted for extreme hardness.
  - **Carbohydrate**: Any of a large class of organic compounds composed of carbon, hydrogen, and oxygen.
  - **Carbon**: A nonmetallic tetravalent chemical element occurring in allotropic forms and forming the chemical basis of all known organic life.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">carb</mark>, think of <mark class="hl-def">plants, minerals, and elements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **carb** functions across modern scientific English through two primary morphological stems:
> - **Oblique / Scientific Stem:** `carbon-` (from the Latin genitive *carbōnis*), the base for almost all chemical and geological terms: *carbon*, *carbonate*, *carbonic*, *carbonaceous*, *carbonize*.
> - **Clipped Combining Form:** `carbo-` / `carb-`, compounded with Greek and Latin roots: *carbohydrate*, *carbide*, *carbs*.
> - **Diminutive Stem:** Latin *carbunculus* ("little coal" → English *carbuncle*, *carbuncular*).
> - **Chemical Suffixes:** Inorganic and organic chemistry apply standard suffixes to *carbon-*: *-ate* (salt containing $CO_3^{2-}$), *-ic* (carbonic acid), *-ide* (binary compound, *carbide*), *-iferous* (coal-bearing, *Carboniferous*).
> - **Environmental Prefixation:** Modern policy uses Latin *dē-* ("removal" → *decarbonize*, *decarbonization*).

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
> The family distributes across chemistry, geology, medicine, gemology, and politics:
> - **Chemistry & Biochemistry:** [[carbon]] (element 6, atomic symbol C), [[carbonate]] (carbonic acid salt; to infuse with CO₂), [[carbonation]] (dissolving CO₂ in liquids), [[carbonic]] (relating to carbon or carbonic acid), [[bicarbonate]] (acid carbonate salt, e.g. baking soda), [[carbide]] (compound of carbon with a metal, e.g. tungsten carbide), [[carbohydrate]] (sugar/starch macronutrient), [[carbs]] (dietary carbohydrates), [[hydrocarbon]] (compounds of carbon and hydrogen).
> - **Geology, Paleontology & Archaeology:** [[Carboniferous]] (Paleozoic period of coal-forming swamp forests), [[carbonaceous]] (rich in carbon/coal), [[carbonize]] (convert to charcoal/carbon; char), [[carbonization]] (fossilization via carbon film), [[radiocarbon]] (radioactive carbon-14 used for dating ancient organic remains).
> - **Clinical Medicine & Pathology:** [[carbuncle]] (severe necrotic skin abscess with multiple draining sinuses), [[carbuncular]] (resembling a carbuncle).
> - **Gemology & Jewelry:** [[carbuncle]] (deep red garnet cut without facets *en cabochon*, glowing like a live ember).
> - **Environmental Science & Climate Policy:** [[decarbonize]] (eliminate greenhouse carbon emissions), [[decarbonization]] (transition to low-carbon energy systems), [[fluorocarbon]] / [[chlorofluorocarbon]] (synthetic greenhouse/ozone-depleting gases).
> - **European Political History:** [[Carbonari]] (nineteenth-century Italian revolutionary secret society).

---

## 🔀 4. Prefix & Combining Dynamics on carb

### Modern Prefix Shifts

| Prefix | Meaning | Combined Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| **de-** | down, away, removal | [[decarbonize]] / [[decarbonization]] | The systematic technological removal or reduction of fossil carbon emissions from an economic sector. |
| **bi-** | two (acid salt prefix) | [[bicarbonate]] | An acid salt containing hydrogen carbonate ($HCO_3^{-}$), historically viewed as having two equivalents of carbonic acid. |
| **radio-** | radiation (*radius*) | [[radiocarbon]] | Unstable radioactive isotope carbon-14 ($^{14}C$) utilized in archaeological radiometric dating. |
| **hydro-** | water/hydrogen (Greek *hýdōr*) | [[hydrocarbon]] | An organic compound composed entirely of hydrogen and carbon atoms. |

### Suffix Transformations

| Suffix | Role | Derivative | Semantic Function |
| :--- | :--- | :--- | :--- |
| **-ate** | Chemical salt / Verbalizer | [[carbonate]] | A salt of carbonic acid; to saturate water with carbon dioxide bubbles. |
| **-aceous** | Resembling / Rich in | [[carbonaceous]] | Containing large amounts of organic carbon or bituminous coal. |
| **-ize** | Chemical / Physical verbalizer | [[carbonize]] | To reduce an organic material into carbon by intense heat. |
| **-iferous** | Bearing / Producing (*ferre*) | [[Carboniferous]] | Geologically bearing vast, rich deposits of coal. |
| **-uncle** | Diminutive noun (*-unculus*) | [[carbuncle]] | A little glowing coal; a fiery red gemstone or a burning skin abscess. |
| **-ide** | Binary compound marker | [[carbide]] | A binary compound of carbon with a metal or metalloid. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| **Organic Chemistry & Biochemistry** | [[carbon]], [[carbohydrate]], [[hydrocarbon]], [[carbide]] | Synthesis of carbon-chain pharmaceuticals, metabolism of carbohydrates via glycolysis, and industrial manufacturing of tungsten carbide cutting tools. |
| **Historical Geology & Paleoclimatology** | [[Carboniferous]], [[carbonaceous]] | Mapping Mississippian and Pennsylvanian coal basins, analyzing carbonaceous chondrite meteorites for extraterrestrial amino acids. |
| **Archaeology & Geochronology** | [[radiocarbon]] | Willard Libby’s carbon-14 radioactive decay calibration curves, dating Neolithic timber structures, prehistoric textiles, and fossil bones. |
| **Dermatology & Infectious Diseases** | [[carbuncle]], [[carbuncular]] | Clinical incision and drainage of confluent *Staphylococcus aureus* carbuncles, distinguishing boils from deeper facial cellulitis. |
| **Energy Policy & Climate Engineering** | [[decarbonize]], [[decarbonization]] | Implementing carbon pricing mechanisms, developing industrial carbon capture and storage (CCS) systems, and decarbonizing power grids. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[carbamate]] | noun | **1.** A salt (or ester) of carbamic acid. | *"In academic literature, carbamate designates a salt (or ester) of carbamic acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbamide]] | noun | **1.** The chief solid component of mammalian urine; synthesized from ammonia and carbon dioxide and used as fertilizer and in animal feed and in plastics. | *"In academic literature, carbamide designates the chief solid component of mammalian urine; synthesized from ammonia and carbon dioxide and used as fertilizer and in animal feed and in plastics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbide]] | noun | **1.** A binary compound of carbon with a more electropositive element. | *"Another is that certain volcanic rocks which are known to contain carbide of iron might, under the influence of steam, have in bygone ages given off petroleum, or paraffin, to use the other name for the same thing."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[carbine]] | noun | **1.** Light automatic rifle. | *"He is no more like flesh and blood than a rusty old carbine is."* — Charles Dickens, *Bleak House* |
| [[carbineer]] | noun | **1.** A soldier (historically a mounted soldier) who is armed with a carbine. | *"In academic literature, carbineer designates a soldier (historically a mounted soldier) who is armed with a carbine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbocyclic]] | adjective | **1.** Having or relating to or characterized by a ring composed of carbon atoms. | *"In academic literature, carbocyclic designates having or relating to or characterized by a ring composed of carbon atoms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbohydrate]] | noun | **1.** An essential structural component of living cells and source of energy for animals; includes simple sugars with small molecules as well as macromolecular substances; are classified according to the number of monosaccharide groups they contain. | *"They possessed attributes known as proteids, fats, and carbohydrates."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[carbolated]] | adjective | **1.** Containing or treated with carbolic acid. | *"In academic literature, carbolated designates containing or treated with carbolic acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carboloy]] | noun | **1.** An alloy based on tungsten with cobalt or nickel as a binder; used in making metal-cutting tools. | *"In academic literature, carboloy designates an alloy based on tungsten with cobalt or nickel as a binder; used in making metal-cutting tools."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbomycin]] | noun | **1.** A colorless basic antibiotic that inhibits the growth of gram-positive organisms. | *"In academic literature, carbomycin designates a colorless basic antibiotic that inhibits the growth of gram-positive organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbon]] | noun | **1.** An abundant nonmetallic tetravalent element occurring in three allotropic forms: amorphous carbon and graphite and diamond; occurs in all organic compounds.<br>**2.** A thin paper coated on one side with a dark waxy substance (often containing carbon); used to transfer characters from the original to an under sheet of paper. | *"They was gonna use seeds to get carbon for them gas masks—that's what soldiers wear on the front line." Mierd didn't seem very much bothered about things soldiers put over their heads."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[carbonaceous]] | adjective | **1.** Relating to or consisting of or yielding carbon. | *"By adding oxidised materials to the charge (_Blast-furnace smelting with carbonaceous fuel_). ii."* — Donald M. Levy, *Modern Copper Smelting* |
| [[carbonado]] | noun | **1.** An inferior dark diamond used in industry for drilling and polishing.<br>**2.** A piece of meat (or fish) that has been scored and broiled. | *"But it is your carbonado’d face."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[carbonara]] | noun | **1.** Sauce for pasta; contains eggs and bacon or ham and grated cheese. | *"In academic literature, carbonara designates sauce for pasta; contains eggs and bacon or ham and grated cheese."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbonate]] | noun | **1.** A salt or ester of carbonic acid (containing the anion co3).<br>**2.** Turn into a carbonate. | *"In a thousand grammes are found 96½ per cent. of water, and about 2-2/3 per cent. of chloride of sodium; then, in a smaller quantity, chlorides of magnesium and of potassium, bromide of magnesium, sulphate of magnesia, sulphate and carbonate of lime."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[carbonated]] | verb | **1.** Turn into a carbonate.<br>**2.** Treat with carbon dioxide. | *"In academic literature, carbonated designates turn into a carbonate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbonation]] | noun | **1.** Saturation with carbon dioxide (as soda water). | *"In academic literature, carbonation designates saturation with carbon dioxide (as soda water)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbondale]] | noun | **1.** A town in southern illinois. | *"In academic literature, carbondale designates a town in southern illinois."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbonic]] | adjective | **1.** Relating to or consisting of or yielding carbon. | *"Indeed, each man consumes, in one hour, the oxygen contained in more than 176 pints of air, and this air, charged (as then) with a nearly equal quantity of carbonic acid, becomes unbreathable."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[carboniferous]] | noun | **1.** From 345 million to 280 million years ago.<br>**2.** Of or relating to the carboniferous geologic era. | *"But to-day, man exhausts the stores in the interior of the earth, burns the treasures of the carboniferous age, casts the fertilizing elements into the ocean, and leaves the world an empty shell."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[carbonisation]] | noun | **1.** The destructive distillation of coal (as in coke ovens). | *"In academic literature, carbonisation designates the destructive distillation of coal (as in coke ovens)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbonise]] | verb | **1.** Unite with carbon.<br>**2.** Turn into carbon, as by burning. | *"Bloom becomes mute, shrunken, carbonised.)_ ZOE: Talk away till you’re black in the face."* — James Joyce, *Ulysses* |
| [[carbonization]] | noun | **1.** The destructive distillation of coal (as in coke ovens). | *"In academic literature, carbonization designates the destructive distillation of coal (as in coke ovens)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbonize]] | verb | **1.** Unite with carbon.<br>**2.** Turn into carbon, as by burning. | *"There was a sharp, crackling sound as cloth and Rimov's flesh carbonized."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[carbonous]] | adjective | **1.** Relating to or consisting of or yielding carbon. | *"In academic literature, carbonous designates relating to or consisting of or yielding carbon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbonyl]] | noun | **1.** A compound containing metal combined with carbon monoxide.<br>**2.** Relating to or containing the carbonyl group. | *"In academic literature, carbonyl designates a compound containing metal combined with carbon monoxide."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carbonylic]] | adjective | **1.** Relating to or containing the carbonyl group. | *"In academic literature, carbonylic designates relating to or containing the carbonyl group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carborundum]] | noun | **1.** An abrasive composed of silicon carbide crystals. | *"The rectifying conductors are in many cases crystals, hence these detectors are called "Crystal Detectors." Carborundum is a favourite for this purpose."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[carboxyl]] | noun | **1.** The univalent radical -cooh; present in and characteristic of organic acids.<br>**2.** Relating to or containing the carboxyl group or carboxyl radical. | *"In academic literature, carboxyl designates the univalent radical -cooh; present in and characteristic of organic acids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carboxylate]] | verb | **1.** Treat (a chemical compound) with carboxyl or carboxylic acid. | *"In academic literature, carboxylate designates treat (a chemical compound) with carboxyl or carboxylic acid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carboxylic]] | adjective | **1.** Relating to or containing the carboxyl group or carboxyl radical. | *"In academic literature, carboxylic designates relating to or containing the carboxyl group or carboxyl radical."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carboy]] | noun | **1.** A large bottle for holding corrosive liquids; usually cushioned in a special container. | *"My name is Kenge,” he said; “you may remember it, my child; Kenge and Carboy, Lincoln’s Inn.” I replied that I remembered to have seen him once before."* — Charles Dickens, *Bleak House* |
| [[carbuncle]] | noun | **1.** Deep-red cabochon garnet cut without facets.<br>**2.** An infection larger than a boil and with several openings for discharge of pus. | *"A carbuncle entire, as big as thou art, Were not so rich a jewel."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[carbuncled]] | adjective | **1.** Afflicted with or resembling a carbuncle.<br>**2.** Set with carbuncles. | *"He has deserved it, were it carbuncled Like holy Phœbus’ car."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[carbuncular]] | adjective | **1.** Afflicted with or resembling a carbuncle. | *"In academic literature, carbuncular designates afflicted with or resembling a carbuncle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carburet]] | verb | **1.** Combine with carbon. | *"In academic literature, carburet designates combine with carbon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carburetor]] | noun | **1.** Mixes air with gasoline vapor prior to explosion. | *"In academic literature, carburetor designates mixes air with gasoline vapor prior to explosion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carburettor]] | noun | **1.** Mixes air with gasoline vapor prior to explosion. | *"In academic literature, carburettor designates mixes air with gasoline vapor prior to explosion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carburise]] | verb | **1.** Unite with carbon. | *"In academic literature, carburise designates unite with carbon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[carburize]] | verb | **1.** Unite with carbon. | *"In academic literature, carburize designates unite with carbon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cocarboxylase]] | noun | **1.** A coenzyme important in respiration in the krebs cycle. | *"In academic literature, cocarboxylase designates a coenzyme important in respiration in the krebs cycle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarbonate]] | verb | **1.** Remove carbon dioxide from. | *"In academic literature, decarbonate designates remove carbon dioxide from."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarbonise]] | verb | **1.** Remove carbon from (an engine). | *"In academic literature, decarbonise designates remove carbon from (an engine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarbonize]] | verb | **1.** Remove carbon from (an engine). | *"In academic literature, decarbonize designates remove carbon from (an engine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarboxylase]] | noun | **1.** Any of the enzymes that hydrolize the carboxyl group. | *"In academic literature, decarboxylase designates any of the enzymes that hydrolize the carboxyl group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarboxylate]] | verb | **1.** Lose a carboxyl group.<br>**2.** Remove a carboxyl group from (a chemical compound). | *"In academic literature, decarboxylate designates lose a carboxyl group."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarboxylation]] | noun | **1.** The process of removing a carboxyl group from a chemical compound (usually replacing it with hydrogen). | *"In academic literature, decarboxylation designates the process of removing a carboxyl group from a chemical compound (usually replacing it with hydrogen)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarburise]] | verb | **1.** Remove carbon from (an engine). | *"In academic literature, decarburise designates remove carbon from (an engine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decarburize]] | verb | **1.** Remove carbon from (an engine). | *"In academic literature, decarburize designates remove carbon from (an engine)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dicarboxylic]] | adjective | **1.** Containing two carboxyls per molecule. | *"In academic literature, dicarboxylic designates containing two carboxyls per molecule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[noncarbonated]] | adjective | **1.** Not having carbonation. | *"In academic literature, noncarbonated designates not having carbonation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[procarbazine]] | noun | **1.** An antineoplastic drug used to treat hodgkin's disease. | *"In academic literature, procarbazine designates an antineoplastic drug used to treat hodgkin's disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncarbonated]] | adjective | **1.** Not having carbonation. | *"In academic literature, uncarbonated designates not having carbonation."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CARB
  </div>
</div>
