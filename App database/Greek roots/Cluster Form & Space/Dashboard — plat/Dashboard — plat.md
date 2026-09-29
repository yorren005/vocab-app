---
status: unread
type: root_dashboard
---
# Dashboard — plat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">πλατύς</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“flat, broad”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'flat, broad'.</span>
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

The Greek root **plat** (πλατύς, πλατεῖα (platús, plateîa)) signifies flat, broad. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Platyrrhini*, *Platyzoa*, *piazza*, *place*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: flat, broad
> The Greek root **plat** fundamentally denotes **flat, broad**. The physical sensory observation and cognitive anchor underlying 'flat, broad'. In classical Greek antiquity, the root denoted 'flat, broad', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">flat, broad</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'flat, broad'.</mark>
> - **Everyday Connection**: Think of familiar words like *Platyrrhini*, *Platyzoa*, *piazza*, *place*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **plat** derives from Ancient Greek <mark class="hl-stem">πλατύς, πλατεῖα (platús, plateîa)</mark>, meaning "flat, broad".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with plat**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'flat, broad'.
  - Whenever you see **plat** in an English word, think immediately of **flat, broad**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">plat</mark>, think of <mark class="hl-def">flat, broad</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `plat-` (from *πλατύς, πλατεῖα (platús, plateîa)*).
> - **Combining Stem with -o- Connective:** `plato-` (standard Greek combining vowel utilized before consonants).
> - **Ablaut & Dialectal Variations:** Demonstrates standard apophonic grade shifts and dialectal adaptations in classical compounding.
> - **Prefix Dynamics:** Readily compounds with Greek prepositions (*anti-*, *syn-*, *dia-*, *peri-*, *hyper-*, *hypo-*, *ana-*, *cata-*) to alter direction, degree, or relation.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.greek_root);
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

> [!tip] 🌈 The Conceptual Facets of Plat
> - **1. Direct & Concrete Anchor:** Literal instantiation of flat, broad in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on plat

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `plat-` | [[Platyrrhini]] | Primary root semantic foundation denoting flat, broad. |
| **Connecting -o-** | `plato-` | [[Platyzoa]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `plat` | [[piazza]] | Relational or directional modification of the core root sense. |

---

## 🌐 5. Disciplinary & Real-World Domains

- **Natural Sciences & Biology:** Morphological categorization and taxonomic naming conventions.
- **Medicine & Healthcare:** Clinical diagnostic terminology, anatomical structures, and pathology.
- **Philosophy, Logic & Rhetoric:** Theoretical frameworks, dialectical categories, and cognitive models.
- **Modern Academic English:** High-register lexicon across humanities, social sciences, and technical literature.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[emplace]] | verb | **1.** Provide a new emplacement for guns.<br>**2.** Put into place or position. | *"In academic literature, emplace designates provide a new emplacement for guns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emplacement]] | noun | **1.** Military installation consisting of a prepared position for siting a weapon.<br>**2.** The act of putting something in a certain place. | *"I want to check your weapons control center, and every gun emplacement."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[neoplatonism]] | noun | **1.** A system of philosophical and theological doctrines composed of elements of platonism and aristotelianism and oriental mysticism; its most distinctive doctrine holds that the first principle and source of reality transcends being and thought and is naturally unknowable. | *"In academic literature, neoplatonism designates a system of philosophical and theological doctrines composed of elements of platonism and aristotelianism and oriental mysticism; its most distinctive doctrine holds that the first principle and source of reality transcends being and thought and is naturally unknowable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neoplatonist]] | noun | **1.** An adherent of neoplatonism. | *"In academic literature, neoplatonist designates an adherent of neoplatonism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[piazza]] | noun | **1.** An open square especially in an Italian town.<br>**2.** An arcaded and roofed gallery. | *"They are kept in the church of the Holy Apostles on the Piazza del Limbo, and on the morning of Easter Saturday the prior strikes fire from them and lights a candle from the new flame."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[placable]] | adjective | **1.** Easily calmed or pacified. | *"Miss Rebecca was not, then, in the least kind or placable."* — William Makepeace Thackeray, *Vanity Fair* |
| [[placate]] | verb | **1.** Cause to be more favorably inclined; gain the good will of. | *"Although it failed, it was a play to placate."* — Jack London, *The Jacket (The Star-Rover)* |
| [[placation]] | noun | **1.** The act of placating and overcoming distrust and animosity. | *"As a physiologist he believed in the artificial placation of malignant agencies chiefly operative during somnolence."* — James Joyce, *Ulysses* |
| [[placatory]] | adjective | **1.** Intended to pacify by acceding to demands or granting concessions. | *"In academic literature, placatory designates intended to pacify by acceding to demands or granting concessions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[place]] | noun | **1.** Physical environment : space.<br>**2.** A way for admission or transit. | *"But thou art all my art, and dost advance As high as learning, my rude ignorance. 79 Whilst I alone did call upon thy aid, My verse alone had all thy gentle grace, But now my gracious numbers are decayed, And my sick muse doth give an other place."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[placeable]] | adjective | **1.** Capable of being recognized. | *"In academic literature, placeable designates capable of being recognized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[placed]] | verb | **1.** Put into a certain place or abstract location.<br>**2.** Place somebody in a particular situation or location. | *"Therefore are feasts so solemn and so rare, Since seldom coming in that long year set, Like stones of worth they thinly placed are, Or captain jewels in the carcanet."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[placement]] | noun | **1.** The spatial property of the way in which something is placed.<br>**2.** Contact established between applicants and prospective employees. | *"In academic literature, placement designates the spatial property of the way in which something is placed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[placer]] | noun | **1.** An alluvial deposit that contains particles of some valuable mineral. | *"The gold-miner, working with simple tools in the days of placer-mining, earned wages exactly expressed by the gold he washed out."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[placoid]] | adjective | **1.** As the hard flattened scales of e.g. sharks. | *"In academic literature, placoid designates as the hard flattened scales of e.g. sharks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plaice]] | noun | **1.** Any of various flatfishes; especially : a large European flounder (Pleuronectes platessa) having red spots and used for food. | *"In academic literature, plaice designates any of various flatfishes; especially : a large european flounder (pleuronectes platessa) having red spots and used for food."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plat]] | noun | **1.** A map showing planned or actual features of an area (streets and building lots etc.).<br>**2.** Make a plat of. | *"There were no flowers, no garden-beds; only a broad gravel-walk girdling a grass-plat, and this set in the heavy frame of the forest."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[plataea]] | noun | **1.** A former town in boeotia; site of a battle between the greeks and persians in 479 bc.<br>**2.** A defeat of the persian army by the greeks at plataea in 479 bc. | *"Every few years the people of Plataea, in Boeotia, held a festival called the Little Daedala, at which they felled an oak-tree in an ancient oak forest."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[platalea]] | noun | **1.** Type genus of the plataleidae. | *"In academic literature, platalea designates type genus of the plataleidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plataleidae]] | noun | **1.** Spoonbills. | *"In academic literature, plataleidae designates spoonbills."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platan]] | noun | **1.** Any of several trees of the genus platanus having thin pale bark that scales off in small plates and lobed leaves and ball-shaped heads of fruits. | *"In academic literature, platan designates any of several trees of the genus platanus having thin pale bark that scales off in small plates and lobed leaves and ball-shaped heads of fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platanaceae]] | noun | **1.** Coextensive with the genus platanus: plane trees. | *"In academic literature, platanaceae designates coextensive with the genus platanus: plane trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platanistidae]] | noun | **1.** River dolphins. | *"In academic literature, platanistidae designates river dolphins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platanthera]] | noun | **1.** Herbaceous terrestrial orchids of temperate northern and southern hemispheres. | *"In academic literature, platanthera designates herbaceous terrestrial orchids of temperate northern and southern hemispheres."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platanus]] | noun | **1.** Genus of large monoecious mostly deciduous trees: london plane; sycamore. | *"In academic literature, platanus designates genus of large monoecious mostly deciduous trees: london plane; sycamore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plate]] | noun | **1.** (baseball) base consisting of a rubber slab where the batter stands; it must be touched by a base runner in order to score.<br>**2.** A sheet of metal or wood or glass or plastic. | *"This is the brief of money, plate, and jewels I am possessed of. ’Tis exactly valued, Not petty things admitted."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[plateau]] | noun | **1.** A usually extensive land area having a relatively level surface raised sharply above adjacent land on at least one side : tableland.<br>**2.** A similar undersea feature. | *"Sheane, _The Great Plateau of Northern Nigeria_ (London, 1911), pp. 158-160. [73] R."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[plateful]] | noun | **1.** The quantity contained in a plate. | *"Of this preparation a tolerably abundant plateful was apportioned to each pupil."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[platelayer]] | noun | **1.** A workman who lays and repairs railroad tracks. | *"In academic literature, platelayer designates a workman who lays and repairs railroad tracks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platelet]] | noun | **1.** Tiny bits of protoplasm found in vertebrate blood; essential for blood clotting. | *"In academic literature, platelet designates tiny bits of protoplasm found in vertebrate blood; essential for blood clotting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plateletpheresis]] | noun | **1.** Platelets are separated from whole blood and the rest is returned to the donor. | *"In academic literature, plateletpheresis designates platelets are separated from whole blood and the rest is returned to the donor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platelike]] | adjective | **1.** As the hard flattened scales of e.g. sharks. | *"In academic literature, platelike designates as the hard flattened scales of e.g. sharks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platen]] | noun | **1.** Work table of a machine tool.<br>**2.** The flat plate of a printing press that presses the paper against the type. | *"In academic literature, platen designates work table of a machine tool."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plater]] | noun | **1.** A skilled worker who coats articles with a film of metal (usually silver or gold). | *"In academic literature, plater designates a skilled worker who coats articles with a film of metal (usually silver or gold)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platichthys]] | noun | **1.** A genus of pleuronectidae. | *"In academic literature, platichthys designates a genus of pleuronectidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plating]] | noun | **1.** A thin coating of metal deposited on a surface.<br>**2.** The application of a thin coat of metal (as by electrolysis). | *"Was it unintentionally that your cannon balls rebounded off the plating of my vessel?"* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[platinize]] | verb | **1.** Coat with metallic platinum. | *"In academic literature, platinize designates coat with metallic platinum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platinum]] | noun | **1.** A heavy precious metallic element; grey-white and resistant to corroding; occurs in some nickel and copper ores and is also found native in some deposits. | *"After about ten minutes a knock came to the door, and the servant entered, carrying a large mahogany chest of chemicals, with a long coil of steel and platinum wire and two rather curiously shaped iron clamps."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[platinum-blonde]] | adjective | **1.** Of hair color; whitish. | *"In academic literature, platinum-blonde designates of hair color; whitish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platitude]] | noun | **1.** The quality or state of being dull or insipid.<br>**2.** A banal, trite, or stale remark. | *"My Koh-i-noor--or (if that’s a platitude) Jewel of Giamschid, the Persian Sofi’s eye; So, in anticipative gratitude, What if I take up my hope and prophesy? -- St. 31."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[platitudinal]] | adjective | **1.** Dull and tiresome but with pretensions of significance or originality. | *"In academic literature, platitudinal designates dull and tiresome but with pretensions of significance or originality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platitudinarian]] | noun | **1.** A bore who makes excessive use of platitudes. | *"In academic literature, platitudinarian designates a bore who makes excessive use of platitudes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platitudinize]] | verb | **1.** Utter platitudes. | *"In academic literature, platitudinize designates utter platitudes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platitudinous]] | adjective | **1.** Dull and tiresome but with pretensions of significance or originality. | *"And I do not say this simply as an echo of what others before me have said, or to use a platitudinous phrase."* — Edward William Bok, *Successward: A Young Man's Book for Young Men* |
| [[plato]] | noun | **1.** Ancient athenian philosopher; pupil of socrates; teacher of aristotle (428-347 bc). | *"He did not depend on his communings with Origen and Eusebius for keeping up his Greek, but went back as often as he could find time to Plato and to the Tragedians."* — John Cairns, *Principal Cairns* |
| [[platonic]] | adjective | **1.** Of or relating to or characteristic of plato or his philosophy.<br>**2.** Free from physical desire. | *"Those who de- 112:6 part from this method forfeit their claims to belong to its school, and they become adher- ents of the Socratic, the Platonic, the Spencerian, or some 112:9 other school."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[platonism]] | noun | **1.** (philosophy) the philosophical doctrine that abstract concepts exist independent of their names. | *"The last great system of defence was the New Platonism."* — T. R. Glover, *The Jesus of History* |
| [[platonist]] | noun | **1.** An advocate of platonism. | *"A poet who is also a Platonist is likely to exalt his office; it is his not merely to amuse or to please, but to lead mankind nearer to the eternal ideal--Shelley called it Intellectual Beauty--which is the only abiding reality."* — Sydney Waterlow, *Shelley* |
| [[platonistic]] | adjective | **1.** Pertaining to or characteristic of or in accordance with platonism. | *"In academic literature, platonistic designates pertaining to or characteristic of or in accordance with platonism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platoon]] | noun | **1.** A military unit that is a subdivision of a company; usually has a headquarters and two or more squads; usually commanded by a lieutenant.<br>**2.** A team of policemen working under the military platoon system. | *"Second platoon!” “Where are they off to now?” thought Rostóv."* — graf Leo Tolstoy, *War and Peace* |
| [[plattdeutsch]] | noun | **1.** A german dialect spoken in northern germany. | *"In academic literature, plattdeutsch designates a german dialect spoken in northern germany."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platte]] | noun | **1.** A river in nebraska that flows eastward to become a tributary of the missouri river. | *"For years this had been their favorite path between Arkansas and the Platte."* — W. E. Webb, *Buffalo Land* |
| [[plattensee]] | noun | **1.** A large shallow lake in western hungary. | *"In academic literature, plattensee designates a large shallow lake in western hungary."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platter]] | noun | **1.** A large shallow dish used for serving food.<br>**2.** Sound recording consisting of a disk with a continuous groove; used to reproduce music by rotating while a phonograph needle tracks in the groove. | *"Which was the heart of one, a black buzzard, you said, by name Martinelli—whoever he may be—for the heart of Martinelli smoking on a gold platter."* — Jack London, *The Jacket (The Star-Rover)* |
| [[platy]] | noun | **1.** Small stocky mexican fish; popular aquarium fish. | *"In academic literature, platy designates small stocky mexican fish; popular aquarium fish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platycephalidae]] | noun | **1.** Scorpaenoid flatheads. | *"In academic literature, platycephalidae designates scorpaenoid flatheads."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platycerium]] | noun | **1.** Often epiphytic tropical old world ferns. | *"In academic literature, platycerium designates often epiphytic tropical old world ferns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platyctenea]] | noun | **1.** An order of tentaculata. | *"In academic literature, platyctenea designates an order of tentaculata."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platyctenean]] | noun | **1.** Ctenophore have long tentacles and flattened body. | *"In academic literature, platyctenean designates ctenophore have long tentacles and flattened body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platyhelminth]] | noun | **1.** flatworm.<br>**2.** any of a phylum (Platyhelminthes) of soft-bodied usually much flattened acoelomate worms (such as the planarians, flukes, and tapeworms) —called also platyhelminth. | *"Classical and authoritative lexicons catalog platyhelminth as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platyhelminthes]] | noun | **1.** Flatworms. | *"In academic literature, platyhelminthes designates flatworms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platylobium]] | noun | **1.** Small genus of australian evergreen leguminous shrubs or subshrubs. | *"In academic literature, platylobium designates small genus of australian evergreen leguminous shrubs or subshrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platymiscium]] | noun | **1.** Genus of tropical american trees: quira. | *"In academic literature, platymiscium designates genus of tropical american trees: quira."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platypoecilus]] | noun | **1.** Platys. | *"Classical and authoritative lexicons catalog platypoecilus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platypus]] | noun | **1.** A small carnivorous aquatic monotreme mammal (Ornithorhynchus anatinus) of eastern Australia and Tasmania that has a fleshy bill resembling that of a duck, dense fur, webbed feet, and a broad flattened tail —called also duck-billed platypus. | *"In academic literature, platypus designates a small carnivorous aquatic monotreme mammal (ornithorhynchus anatinus) of eastern australia and tasmania that has a fleshy bill resembling that of a duck, dense fur, webbed feet, and a broad flattened tail —called also duck-billed platypus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platyrhine]] | adjective | **1.** Of or related to new world monkeys having nostrils far apart or to people with broad noses. | *"In academic literature, platyrhine designates of or related to new world monkeys having nostrils far apart or to people with broad noses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platyrhinian]] | adjective | **1.** Of or related to new world monkeys having nostrils far apart or to people with broad noses. | *"In academic literature, platyrhinian designates of or related to new world monkeys having nostrils far apart or to people with broad noses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platyrrhine]] | noun | **1.** Of, relating to, or being any of a division (Platyrrhina) of arboreal New World monkeys characterized by a broad nasal septum, usually 36 teeth, and often a prehensile tail.<br>**2.** Having a short broad nose. | *"In academic literature, platyrrhine designates of, relating to, or being any of a division (platyrrhina) of arboreal new world monkeys characterized by a broad nasal septum, usually 36 teeth, and often a prehensile tail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Platyrrhini]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek plat.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, Platyrrhini designates new world monkeys: capuchin; douroucouli; howler monkey; saki; spider monkey; squirrel monkey; titi; uakari; woolly monkey; marmoset; tamarin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platyrrhini]] | noun | **1.** New world monkeys: capuchin; douroucouli; howler monkey; saki; spider monkey; squirrel monkey; titi; uakari; woolly monkey; marmoset; tamarin. | *"In academic literature, platyrrhini designates **1.** new world monkeys: capuchin; douroucouli; howler monkey; saki; spider monkey; squirrel monkey; titi; uakari; woolly monkey; marmoset; tamarin."* — Academic Lexicon |
| [[platyrrhinian]] | noun | **1.** Hairy-faced arboreal monkeys having widely separated nostrils and long usually prehensile tails.<br>**2.** Of or related to new world monkeys having nostrils far apart or to people with broad noses. | *"In academic literature, platyrrhinian designates hairy-faced arboreal monkeys having widely separated nostrils and long usually prehensile tails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platyrrhinic]] | adjective | **1.** Of or related to new world monkeys having nostrils far apart or to people with broad noses. | *"In academic literature, platyrrhinic designates of or related to new world monkeys having nostrils far apart or to people with broad noses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platysma]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek plat.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, platysma designates a term designating an entity, condition, or phenomenon derived from greek plat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[platystemon]] | noun | **1.** One species: creamcups. | *"In academic literature, platystemon designates one species: creamcups."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Platyzoa]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek plat.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, Platyzoa designates a term designating an entity, condition, or phenomenon derived from greek plat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plaza]] | noun | **1.** A public square in a city or town.<br>**2.** An open area usually located near urban buildings and often featuring walkways, trees and shrubs, places to sit, and sometimes shops. | *"Down to the Plaza Victoria, with its dim arcades, or to the 25 de Mayo, with its cathedral, its stunted paradise trees."* — Donn Byrne, *The Wind Bloweth* |
| [[replace]] | verb | **1.** Substitute a person or thing for (another that is broken or inefficient or lost or no longer working or yielding what is expected).<br>**2.** Take the place or move into the position of. | *"He did not attempt to fill up the hole, replace the flowers, or do anything at all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[replacement]] | noun | **1.** The act of furnishing an equivalent person or thing in the place of another.<br>**2.** Someone who takes the place of another person. | *"We explored packaging, marketing and replacement factors."* — Meyer Moldeven, *A Grandpa's Notebook* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Form & Space]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PLAT
  </div>
</div>
