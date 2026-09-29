---
status: unread
type: root_dashboard
---
# Dashboard — plumb
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">plumb-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“lead”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Laying bricks to build a sturdy home or resting inside a safe shelter.</span>
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

The root **plumb** means lead. It refers to guiding someone along a path, conducting something forward, or directing movement. In English, this root forms words such as *plumber*, *plumbing*, *plumbery*, and *plummet*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: lead
> The root **plumb** means lead. It refers to guiding someone along a path, conducting something forward, or directing movement. In English, this root forms words such as *plumber*, *plumbing*, *plumbery*, and *plummet*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Lead</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Laying bricks to build a sturdy home or resting inside a safe shelter.</mark>
> - **Everyday Connection**: Think of familiar words like *plumber* and *plumbing*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **plumb** comes from a Latin word that means *"lead"*.
  - At its core, it describes lead.

- **The Big Picture Idea**:
  - Picture laying bricks to build a sturdy home or resting inside a safe shelter.
  - Whenever you see **plumb** in an English word, think of **building, crafting, and dwelling**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of lead.
  - **Mental & Social**: How people experience, organize, or communicate about lead.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Plumber**: A skilled tradesperson who installs, repairs, and maintains piping, valves, and fixtures for water supply, sanitation, and gas in buildings.
  - **Plumbing**: The interconnected system of pipes, drains, fittings, and apparatus for water distribution and waste disposal in a structure.
  - **Plumbery**: The craft, trade, or business of working in lead.
  - **Plummet**: A plumb or lead weight used for sounding water depth or verifying verticality.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">plumb</mark>, think of <mark class="hl-def">building, crafting, and dwelling</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Engine & Stem Evolution
> The root **plumb** surfaces across multiple morphological layers:
> - **Primary Noun / Verb Base:** `plumb`:
>   - Functions in Modern English as a noun ("lead bob"), adjective ("dead vertical"), adverb ("directly, completely", as in *plumb crazy*), and transitive verb ("to measure depth", "to install pipes").
> - **Occupational Trade Stems:**
>   - Latin *plumbārius* ("worker in lead") → Old French *plommier* → English [[plumber]], [[plumbing]], [[plumbery]].
> - **Gravitational / Kinetic Diminutives:**
>   - Latin *plumbum* → Old French *plomet* ("little ball of lead") → English [[plummet]] (noun & verb: "to plunge vertically").
> - **Idiomatic Romance Borrowing:**
>   - French phrase *à plomb* ("on the plumb-line") → English [[aplomb]] ("unshakable composure").
> - **Chemical & Toxicological Stems:**
>   - Latin oblique stem `plumb-` + neoclassical suffixes: *plumb- + -ic* → [[plumbic]] (Pb IV), *plumb- + -ous* → [[plumbous]] (Pb II), *plumb- + -ism* → [[plumbism]] (lead toxicity), *plumb- + -ate* → [[plumbate]], *plumb- + -ite* → [[plumbite]].
> - **Mineralogical Substantive:**
>   - Latin *plumbāgō* ("lead-ore, graphite") → English [[plumbago]].

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

> [!tip] 🌈 Spectrum of Meaning Across Four Disciplinary Realms
> 1. **Sanitary Engineering & Hydraulics:** The domestic distribution of water, sanitary drainage, waste piping, and the trade of the pipe-fitter ([[plumber]], [[plumbing]], [[plumbery]]).
> 2. **Metrological & Navigational Precision:** Establishing the true vertical, verifying structural alignment, sounding maritime ocean depths, and metaphorically examining profound philosophical truths ([[plumb]], [[plumb line]], [[plumb bob]], [[unplumbed]]).
> 3. **Kinetic Plunge & Emotional Equilibrium:** Dropping rapidly like a stone weight from high altitude, contrasted with maintaining perfect psychological balance under stress ([[plummet]], [[aplomb]]).
> 4. **Chemistry, Toxicology & Mineralogy:** The elemental chemistry of lead, toxicological poisoning, and historic mineral confusion with graphite ([[plumbism]], [[plumbic]], [[plumbous]], [[plumbate]], [[plumbite]], [[plumbago]], [[plumbiferous]]).

---

## 🔀 4. Prefix & Combining Dynamics on plumb

### Prefix Dynamics

| Prefix / Element | Semantic Meaning | Derived Form | Resulting Synthesis |
| :--- | :--- | :--- | :--- |
| `à` *(French prep.)* | on, to, according to | [[aplomb]] | *On the plumb-line* → perfect uprightness and balance. |
| `un-` | not (negation) | [[unplumbed]] | Not sounded; fathomless, unexplored. |

### Suffix Transformations (Grammatical Function)

| Suffix | Grammatical Role | Derivative | Semantic Output |
| :--- | :--- | :--- | :--- |
| `-er` *(via OF)* | Noun (Occupational Agent) | [[plumber]] | Originally a worker in lead; now a water pipe specialist. |
| `-ing` | Noun (System / Craft) | [[plumbing]] | The system of water pipes or the work of a plumber. |
| `-ery` | Noun (Workshop / Trade) | [[plumbery]] | The workshop or craft of working lead pipes. |
| `-et` *(diminutive)* | Noun → Verb | [[plummet]] | A small lead weight → to drop precipitously straight down. |
| `-ism` | Noun (Pathological State) | [[plumbism]] | The medical condition of chronic lead poisoning. |
| `-ago` | Noun (Mineral / Plant) | [[plumbago]] | Graphite ("black lead") or the leadwort plant genus. |
| `-ic` | Adjective (Higher Valence) | [[plumbic]] | Containing lead in its tetravalent oxidation state (+4). |
| `-ous` | Adjective (Lower Valence) | [[plumbous]] | Containing lead in its divalent oxidation state (+2). |
| `-ate` | Noun (Chemical Salt) | [[plumbate]] | A salt containing an anion of tetravalent lead. |
| `-ite` | Noun (Chemical Salt) | [[plumbite]] | A salt containing an anion of divalent lead. |
| `-iferous` | Adjective (Bearing / Yielding) | [[plumbiferous]] | Bearing, containing, or yielding lead ore. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Real-World Context |
| :--- | :--- | :--- |
| 🚰 **Civil Engineering & Architecture** | [[plumber]], [[plumbing]], [[plumb line]], [[plumb bob]] | Domestic potable water delivery, sewer vent stacks, building drainage codes, and masonry verticality checks with optical levels and laser plumbs. |
| 🩺 **Toxicology & Public Health** | [[plumbism]], [[plumbic]], [[plumbous]] | Lead neurotoxicity, pediatric developmental delays caused by lead paint ingestion or aging lead water pipes (e.g., the Flint water crisis), and chelation therapy for heavy metal toxicity. |
| 🧪 **Inorganic Chemistry & Metallurgy** | [[plumbic]], [[plumbous]], [[plumbate]], [[plumbiferous]] | Periodic table element 82 (**Pb**), tetraethyl lead (historic anti-knock gasoline additive), lead-acid storage batteries, and lead crystal radiation shielding. |
| 🚢 **Maritime Navigation & Literature** | [[plumb]], [[plummet]], [[unplumbed]], [[aplomb]] | Traditional sounding leads with tallow-filled hollows to sample seabed sediment; poetic exploration of the "unplumbed, salt, estranging sea" (Matthew Arnold); rhetorical descriptions of stocks plummeting or diplomats maintaining composure with aplomb. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[plumb]] | noun | **1.** The metal bob of a plumb line.<br>**2.** Measure the depth of something. | *"No, when I go to sea, I go as a simple sailor, right before the mast, plumb down into the forecastle, aloft there to the royal mast-head."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[plumb line]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin plumb within the domain of Building & Dwelling.<br>**2.** A technical or specialized form exhibiting the properties of plumb in systematic terminology. | *"In academic literature, plumb line designates pertaining to, derived from, or characteristic of latin plumb within the domain of building & dwelling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumbable]] | adjective | **1.** (of depth) capable of being sounded or measured for depth. | *"In academic literature, plumbable designates (of depth) capable of being sounded or measured for depth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumbaginaceae]] | noun | **1.** Perennial herbs and shrubs and lianas; cosmopolitan especially in saltwater areas. | *"In academic literature, plumbaginaceae designates perennial herbs and shrubs and lianas; cosmopolitan especially in saltwater areas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumbaginaceous]] | adjective | **1.** Of or pertaining to or characteristic of plants of the family plumbaginaceae. | *"In academic literature, plumbaginaceous designates of or pertaining to or characteristic of plants of the family plumbaginaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumbaginales]] | noun | **1.** Coextensive with the family plumbaginaceae; usually included in order primulales. | *"In academic literature, plumbaginales designates coextensive with the family plumbaginaceae; usually included in order primulales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumbago]] | noun | **1.** Used as a lubricant and as a moderator in nuclear reactors.<br>**2.** Any plumbaginaceous plant of the genus plumbago. | *"Crucibles, alembics, and retorts were confusedly piled in various corners, and on a small table I saw distributed in separate bottles a number of mineral and metallic substances, which I recognized as antimony, mercury, plumbago, arsenic, borax, etc."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[plumber]] | noun | **1.** A craftsman who installs and repairs pipes and fixtures and appliances. | *"I am my own engineer, and my own carpenter, and my own plumber, and my own gardener, and my own Jack of all Trades,” said Wemmick, in acknowledging my compliments."* — Charles Dickens, *Great Expectations* |
| [[plumbery]] | noun | **1.** The occupation of a plumber (installing and repairing pipes and fixtures for water or gas or sewage in a building). | *"In academic literature, plumbery designates the occupation of a plumber (installing and repairing pipes and fixtures for water or gas or sewage in a building)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumbic]] | adjective | **1.** Relating to or consisting of lead. | *"In academic literature, plumbic designates relating to or consisting of lead."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumbing]] | noun | **1.** Utility consisting of the pipes and fixtures for the distribution of water or gas in a building and for the disposal of sewage.<br>**2.** The occupation of a plumber (installing and repairing pipes and fixtures for water or gas or sewage in a building). | *"In academic literature, plumbing designates utility consisting of the pipes and fixtures for the distribution of water or gas in a building and for the disposal of sewage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumbism]] | noun | **1.** Toxic condition produced by the absorption of excessive lead into the system. | *"In academic literature, plumbism designates toxic condition produced by the absorption of excessive lead into the system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plumbous]] | adjective | **1.** Relating to or consisting of lead. | *"In academic literature, plumbous designates relating to or consisting of lead."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unplumbed]] | adjective | **1.** Situated at or extending to great depth; too deep to have been sounded or plumbed; ; -thomas gray. | *"In academic literature, unplumbed designates situated at or extending to great depth; too deep to have been sounded or plumbed; ; -thomas gray."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Building & Dwelling]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PLUMB
  </div>
</div>
