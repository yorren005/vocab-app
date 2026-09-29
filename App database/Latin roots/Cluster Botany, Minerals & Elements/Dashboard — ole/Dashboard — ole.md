---
status: unread
type: root_dashboard
---
# Dashboard — ole
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">ole-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“oil”</span>
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

The root **ole** means oil. It refers to oil, olive oil, viscous liquid, unction, lubricating fat. In English, this root forms words such as *oil*, *oily*, *petroleum*, and *linoleum*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: oil
> The root **ole** means oil. It refers to oil, olive oil, viscous liquid, unction, lubricating fat. In English, this root forms words such as *oil*, *oily*, *petroleum*, and *linoleum*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Oil</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Plants blossoming in the wild and raw minerals mined from the earth.</mark>
> - **Everyday Connection**: Think of familiar words like *oil* and *oily*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ole** comes from a Latin word that means *"oil"*.
  - At its core, it describes oil.

- **The Big Picture Idea**:
  - Picture plants blossoming in the wild and raw minerals mined from the earth.
  - Whenever you see **ole** in an English word, think of **plants, minerals, and elements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of oil.
  - **Mental & Social**: How people experience, organize, or communicate about oil.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Oil**: Any of numerous viscous, combustible, liquid substances that are unctuous to the touch, insoluble in water, and soluble in organic solvents.
  - **Oily**: Containing, covered with, or resembling oil.
  - **Petroleum**: A naturally occurring, flammable liquid consisting of a complex mixture of hydrocarbons found in geological rock formations beneath the Earth's surface.
  - **Linoleum**: A durable, water-resistant floor covering made by pressing a mixture of oxidized, solidified linseed oil, rosin, cork dust, and wood flour onto a burlap canvas backing.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ole</mark>, think of <mark class="hl-def">plants, minerals, and elements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture
> In Latin, *oleum* is a second-declension neuter noun:
> - **Nominative / Accusative Singular:** *oleum* ("olive oil")
> - **Genitive Singular:** *oleī* ("of oil")
> - **Ablative Singular:** *oleō* ("by/with oil")
> - **Adjective:** *oleārius* ("pertaining to oil"), *oleāginus* ("olive-like, oily")
>
> ### Three Primary Morphological Pathways into English:
> 1. **The Vernacular Romance Contraction (`oil-`):**
>    - *oil*, *oily*, *oiliness*, *boil* (partially blended in early folk etymology).
> 2. **Direct Scientific & Chemical Compounds (`ole-`, `olei-`):**
>    - *oleic acid* (the primary fatty acid of olive oil).
>    - *olein* / *triolein* (liquid triglyceride constituent of olive oil).
>    - *oleate* (salt or ester of oleic acid).
>    - *oleiferous* (oil-yielding).
> 3. **Modern Technical Hybrid Compounding:**
>    - *petr-oleum* (Latin *petra* "rock" + *oleum*).
>    - *lin-oleum* (Latin *līnum* "flax/linen" + *oleum*).
>    - *lan-olin* (Latin *lāna* "wool" + *oleum* + *-in*).
>    - *oleo-phobic* / *oleo-philic* (Greek *phobos* / *philia*).
>    - *oleo-resin* (Latin *oleum* + *resina*).

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

> [!tip] 🌈 Conceptual Vectors of *oleum*
> 1. **Viscous Hydrocarbons & Energy:** Native combustible mineral oils and petroleum refining (*oil*, *oily*, *petroleum*).
> 2. **Lipid Biochemistry & Nutrition:** Fatty acids, triglycerides, and dairy substitutes (*oleic acid*, *olein*, *oleate*, *oleomargarine*, *oleo*).
> 3. **Industrial Materials & Applied Chemistry:** Linseed flooring, botanical resins, and sheep wool wax (*linoleum*, *oleoresin*, *lanolin*).
> 4. **Surface Science & Nanotechnology:** Wettability, repellent coatings, and oil affinity (*oleophobic*, *oleophilic*, *oleometer*).
> 5. **Human Behavior & Rhetorical Metaphor:** Smooth, slippery, excessively ingratiating, or hypocritically flattering manners (*oleaginous*, *oleaginousness*).
> 6. **Botany & Agronomy:** Olive-resembling decorative shrubs and Mediterranean oil cultivation (*oleander*, *oleiferous*, *oleiculture*).

---

## 🔀 4. Prefix & Combining Dynamics on ole

### Compounding Dynamics

| Compounding Root | Origin & Meaning | Compound Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `petra` | Latin *petra* < Greek πέτρα ("rock, stone") | [[petroleum]] | Literally "rock oil"; unrefined crude mineral oil extracted from geological rock strata. |
| `līnum` | Latin *līnum* ("flax, linen") | [[linoleum]] | Floor covering manufactured from oxidized, solidified linseed (flaxseed) oil and cork dust. |
| `lāna` | Latin *lāna* ("wool") | [[lanolin]] | Natural waxy lipid/oil extracted from sheep's wool, used in soothing ointments. |
| `margarī́tēs` | Greek μαργαρίτης ("pearl") | [[oleomargarine]] / [[oleo]] | Artificial butter substitute formulated from vegetable/animal oils, exhibiting a pearly sheen. |
| `-philic` / `-phobic` | Greek φιλία ("love") / φόβος ("fear") | [[oleophilic]] / [[oleophobic]] | Having a chemical attraction to oil / possessing surface properties that repel oils and fingerprints. |
| `-fer` | Latin *ferre* ("to bear, produce") | [[oleiferous]] | Botanically producing, containing, or yielding oil (e.g., oil-seed plants). |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Result |
| :--- | :--- | :--- | :--- |
| `-ic` | Chemical Acid Suffix | [[oleic]] | Designating the monounsaturated omega-9 fatty acid characteristic of olive oil. |
| `-ate` | Chemical Ester/Salt Suffix | [[oleate]] | A salt or ester formed by the chemical reaction of oleic acid. |
| `-in` | Biochemical Neutral Substance | [[olein]] | The liquid triglyceride of oleic acid making up the bulk of non-drying vegetable oils. |
| `-aginous` | Latin adjective suffix *-āginōsus* | [[oleaginous]] | Resembling oil; slippery; or marked by oily, sickeningly flattering hypocrisy. |
| `-culture` | Latin *cultūra* ("tillage") | [[oleiculture]] | The comprehensive cultivation of olive groves and production of olive oil. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🛢️ **Petroleum Geology & Energy** | [[petroleum]], [[oil]] | Hydrocarbon exploration, fractional distillation, geopolitical energy security. |
| 🧪 **Biochemistry & Lipid Science** | [[oleic]], [[olein]], [[oleate]] | Monounsaturated fatty acid metabolism, cellular lipid bilayer fluidity, olive oil purity assays. |
| 📱 **Materials Science & Nanotechnology** | [[oleophobic]], [[oleophilic]], [[linoleum]] | Hydrophobic/oleophobic fluoropolymer display coatings on smartphones; resilient flooring. |
| 💄 **Dermatology & Cosmetics** | [[lanolin]], [[oleoresin]] | Emollient skin creams, barrier repair ointments, natural botanical perfume fixatives. |
| 🌿 **Horticulture & Mediterranean Botany** | [[oleander]], [[oleiferous]], [[oleiculture]] | Drought-tolerant landscape gardening; cardiac glycoside toxicology; olive harvesting. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[adolesce]] | verb | **1.** Become adolescent; pass through adolescence. | *"In academic literature, adolesce designates become adolescent; pass through adolescence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[adolescence]] | noun | **1.** The time period between the beginning of puberty and adulthood.<br>**2.** In the state that someone is in between puberty and adulthood. | *"He was silent when he went home for a week, silent with uncles Robin and Alan, who sensed he was going through one of the crises of adolescence, and knew the best thing to do was to leave him alone."* — Donn Byrne, *The Wind Bloweth* |
| [[adolescent]] | noun | **1.** A juvenile between the onset of puberty and maturity.<br>**2.** Relating to or peculiar to or suggestive of an adolescent. | *"The Thompson Indians of British Columbia thought that the Dawn of Day could and would cure hernia if only an adolescent girl prayed to it to do so."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[anole]] | noun | **1.** Small arboreal tropical american insectivorous lizards with the ability to change skin color. | *"In academic literature, anole designates small arboreal tropical american insectivorous lizards with the ability to change skin color."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apolemia]] | noun | **1.** Large siphonophore of up to 50 ft long. | *"In academic literature, apolemia designates large siphonophore of up to 50 ft long."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atole]] | noun | **1.** Eaten as mush or as a thin gruel. | *"In academic literature, atole designates eaten as mush or as a thin gruel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cooler]] | noun | **1.** A refrigerator for cooling liquids.<br>**2.** An iced drink especially white wine and fruit juice. | *"But it was with a freshened existence and a cooler brain that, a long time afterwards, she became conscious of some interesting proceedings which were going on in the trees above her head and around."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[linoleum]] | noun | **1.** A floor covering. | *"We heard the door open, a few hurried words, and then quick steps upon the linoleum."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[olea]] | noun | **1.** Evergreen trees and shrubs having oily one-seeded fruits. | *"In academic literature, olea designates evergreen trees and shrubs having oily one-seeded fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleaceae]] | noun | **1.** Trees and shrubs having berries or drupes or capsules as fruits; sometimes placed in the order oleales: olive; ash; jasmine; privet; lilac. | *"In academic literature, oleaceae designates trees and shrubs having berries or drupes or capsules as fruits; sometimes placed in the order oleales: olive; ash; jasmine; privet; lilac."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleaceous]] | adjective | **1.** Of or pertaining to or characteristic of trees or shrubs of the olive family. | *"In academic literature, oleaceous designates of or pertaining to or characteristic of trees or shrubs of the olive family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleaginous]] | adjective | **1.** Unpleasantly and excessively suave or ingratiating in manner or speech.<br>**2.** Containing an unusual amount of grease or oil. | *"As the oleaginous matter exudes, it falls in drops through the apertures into a wide-mouthed calabash placed underneath."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[oleaginousness]] | noun | **1.** Consisting of or covered with oil.<br>**2.** Smug self-serving earnestness. | *"In academic literature, oleaginousness designates consisting of or covered with oil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleales]] | noun | **1.** Coextensive with the family oleaceae; in some classifications included in the order gentianales. | *"In academic literature, oleales designates coextensive with the family oleaceae; in some classifications included in the order gentianales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleander]] | noun | **1.** An ornamental but poisonous flowering shrub having narrow evergreen leaves and clusters of fragrant white to pink or red flowers: native to east indies but widely cultivated in warm regions. | *"But presently, through the faint fragrance of oleanders, other sounds began to penetrate,--the strains of the waltz to which they had danced only the night before."* — Charlotte B. Herr, *Their Mariposa Legend: A Romance of Santa Catalina* |
| [[oleandra]] | noun | **1.** Or family polypodiaceae: tropical epiphytic or terrestrial ferns. | *"In academic literature, oleandra designates or family polypodiaceae: tropical epiphytic or terrestrial ferns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleandraceae]] | noun | **1.** One of a number of families into which polypodiaceae has been subdivided in some classification systems. | *"In academic literature, oleandraceae designates one of a number of families into which polypodiaceae has been subdivided in some classification systems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[olearia]] | noun | **1.** Large genus of australian evergreen shrubs or small trees with large daisylike flowers. | *"In academic literature, olearia designates large genus of australian evergreen shrubs or small trees with large daisylike flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleaster]] | noun | **1.** Any of several shrubs of the genus elaeagnus having silver-white twigs and yellow flowers followed by olivelike fruits. | *"In academic literature, oleaster designates any of several shrubs of the genus elaeagnus having silver-white twigs and yellow flowers followed by olivelike fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[olecranon]] | noun | **1.** Process of the ulna that forms the outer bump of the elbow and fits into the fossa of the humerus when the arm is extended. | *"In academic literature, olecranon designates process of the ulna that forms the outer bump of the elbow and fits into the fossa of the humerus when the arm is extended."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleic]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin ole within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of ole in systematic terminology. | *"In academic literature, oleic designates pertaining to, derived from, or characteristic of latin ole within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[olein]] | noun | **1.** A naturally occurring glyceride of oleic acid that is found in fats and oils. | *"In academic literature, olein designates a naturally occurring glyceride of oleic acid that is found in fats and oils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleo]] | noun | **1.** A spread made chiefly from vegetable oils and used as a substitute for butter. | *"In academic literature, oleo designates a spread made chiefly from vegetable oils and used as a substitute for butter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleomargarine]] | noun | **1.** A spread made chiefly from vegetable oils and used as a substitute for butter. | *"The federal law levying a tax on oleomargarine, however, was designed as protective legislation in the interest of the farmer."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[oleophilic]] | adjective | **1.** Having a strong affinity for oils rather than water. | *"In academic literature, oleophilic designates having a strong affinity for oils rather than water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleophobic]] | adjective | **1.** Lacking affinity for oils. | *"In academic literature, oleophobic designates lacking affinity for oils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oleoresin]] | noun | **1.** A naturally occurring mixture of a resin and an essential oil; obtained from certain plants. | *"In academic literature, oleoresin designates a naturally occurring mixture of a resin and an essential oil; obtained from certain plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[preadolescent]] | adjective | **1.** Of or relating to or designed for children between the ages of 9 and 12. | *"In academic literature, preadolescent designates of or relating to or designed for children between the ages of 9 and 12."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redolence]] | noun | **1.** A pleasingly sweet olfactory property. | *"In academic literature, redolence designates a pleasingly sweet olfactory property."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[redolent]] | adjective | **1.** Serving to bring to mind; - wilder hobson.<br>**2.** (used with `of' or `with') noticeably odorous. | *"The odour which now filled the refectory was scarcely more appetising than that which had regaled our nostrils at breakfast: the dinner was served in two huge tin-plated vessels, whence rose a strong steam redolent of rancid fat."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |

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
    ROOT DASHBOARD · OLE
  </div>
</div>
