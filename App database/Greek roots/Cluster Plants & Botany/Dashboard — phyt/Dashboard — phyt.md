---
status: unread
type: root_dashboard
---
# Dashboard — phyt
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">φύειν</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“plant”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'plant'.</span>
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

The Greek root **phyt** (φύειν, φυτόν (phúein, phutón)) signifies plant. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *archaeophyte*, *astrophysics*, *autophyte*, *bryophyte*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: plant
> The Greek root **phyt** fundamentally denotes **plant**. The physical sensory observation and cognitive anchor underlying 'plant'. In classical Greek antiquity, the root denoted 'plant', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">plant</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'plant'.</mark>
> - **Everyday Connection**: Think of familiar words like *archaeophyte*, *astrophysics*, *autophyte*, *bryophyte*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **phyt** derives from Ancient Greek <mark class="hl-stem">φύειν, φυτόν (phúein, phutón)</mark>, meaning "plant".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with phyt**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'plant'.
  - Whenever you see **phyt** in an English word, think immediately of **plant**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">phyt</mark>, think of <mark class="hl-def">plant</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `phyt-` (from *φύειν, φυτόν (phúein, phutón)*).
> - **Combining Stem with -o- Connective:** `phyto-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Phyt
> - **1. Direct & Concrete Anchor:** Literal instantiation of plant in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on phyt

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `phyt-` | [[archaeophyte]] | Primary root semantic foundation denoting plant. |
| **Connecting -o-** | `phyto-` | [[astrophysics]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `phyt` | [[autophyte]] | Relational or directional modification of the core root sense. |

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
| [[archaeophyte]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phyt.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, archaeophyte designates a term designating an entity, condition, or phenomenon derived from greek phyt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astrophysical]] | adjective | **1.** Of or concerned with astrophysics. | *"In academic literature, astrophysical designates of or concerned with astrophysics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astrophysicist]] | noun | **1.** An astronomer who studies the physical properties of celestial bodies. | *"In academic literature, astrophysicist designates an astronomer who studies the physical properties of celestial bodies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astrophysics]] | noun | **1.** A branch of astronomy dealing especially with the behavior, physical properties, and dynamic processes of celestial objects and phenomena. | *"In academic literature, astrophysics designates a branch of astronomy dealing especially with the behavior, physical properties, and dynamic processes of celestial objects and phenomena."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autophyte]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phyt.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, autophyte designates a term designating an entity, condition, or phenomenon derived from greek phyt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autophytic]] | adjective | **1.** Of or relating to organisms (as green plants) that can make complex organic nutritive compounds from simple inorganic sources by photosynthesis. | *"In academic literature, autophytic designates of or relating to organisms (as green plants) that can make complex organic nutritive compounds from simple inorganic sources by photosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bryophyte]] | noun | **1.** Any of a division (Bryophyta) of nonflowering plants comprising the mosses, liverworts, and hornworts. | *"In academic literature, bryophyte designates any of a division (bryophyta) of nonflowering plants comprising the mosses, liverworts, and hornworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bryophytic]] | adjective | **1.** Relating to plants of the division bryophyta. | *"In academic literature, bryophytic designates relating to plants of the division bryophyta."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dermatophyte]] | noun | **1.** A fungus parasitic on the skin or skin derivatives (such as hair or nails). | *"In academic literature, dermatophyte designates a fungus parasitic on the skin or skin derivatives (such as hair or nails)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epiphyte]] | noun | **1.** Plant that derives moisture and nutrients from the air and rain; usually grows on another plant but not parasitic on it. | *"In academic literature, epiphyte designates plant that derives moisture and nutrients from the air and rain; usually grows on another plant but not parasitic on it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epiphytic]] | adjective | **1.** Of or relating to epiphytes. | *"In academic literature, epiphytic designates of or relating to epiphytes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epiphytotic]] | adjective | **1.** (of plants) epidemic among plants of a single kind especially over a wide area. | *"In academic literature, epiphytotic designates (of plants) epidemic among plants of a single kind especially over a wide area."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holophyte]] | noun | **1.** An organism that produces its own food by photosynthesis. | *"In academic literature, holophyte designates an organism that produces its own food by photosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holophytic]] | adjective | **1.** Obtaining nourishment as green plants do. | *"In academic literature, holophytic designates obtaining nourishment as green plants do."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesophyte]] | noun | **1.** Land plant growing in surroundings having an average supply of water; compare xerophyte and hydrophyte. | *"In academic literature, mesophyte designates land plant growing in surroundings having an average supply of water; compare xerophyte and hydrophyte."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesophytic]] | adjective | **1.** Being or growing in or adapted to a moderately moist environment. | *"In academic literature, mesophytic designates being or growing in or adapted to a moderately moist environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metaphysical]] | adjective | **1.** Pertaining to or of the nature of metaphysics.<br>**2.** Without material form or substance. | *"Hie thee hither, That I may pour my spirits in thine ear, And chastise with the valour of my tongue All that impedes thee from the golden round, Which fate and metaphysical aid doth seem To have thee crown’d withal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metaphysics]] | noun | **1.** A division of philosophy that is concerned with the fundamental nature of reality and being and that includes ontology, cosmology, and often epistemology. | *"The class of Hamilton's that he attended in the session of 1838-39 was that of Advanced Metaphysics."* — John Cairns, *Principal Cairns* |
| [[neophyte]] | noun | **1.** A new convert : proselyte. | *"Towards sunset one of the older women--who, as directress of the ceremonies, is called _nachimbusa_-- follows her, places a cooking-pot by the cross-roads, and boils therein a concoction of various herbs, with which she anoints the neophyte."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[physical]] | noun | **1.** Of or relating to natural science.<br>**2.** Of or relating to physics. | *"The blood I drop is rather physical Than dangerous to me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[physicalism]] | noun | **1.** (philosophy) the philosophical theory that matter is the only reality. | *"In academic literature, physicalism designates (philosophy) the philosophical theory that matter is the only reality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physicality]] | noun | **1.** Preoccupation with satisfaction of physical drives and appetites. | *"In academic literature, physicality designates preoccupation with satisfaction of physical drives and appetites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physically]] | adverb | **1.** In accord with physical laws. | *"Here he spread half of the hay as a bed, and, as well as he could in the darkness, pulled the other half over him by way of bed-clothes, covering himself entirely, and feeling, physically, as comfortable as ever he had been in his life."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[physicalness]] | noun | **1.** The quality of being physical; consisting of matter. | *"In academic literature, physicalness designates the quality of being physical; consisting of matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physician]] | noun | **1.** A person trained in the art of healing; specifically : a health care professional (such as a dermatologist, internist, pediatrician, or urologist) who has earned a medical degree, is clinically experienced, and is licensed to practice medicine as usually distinguished from surgery : a doctor of medicine or a doctor of osteopathic medicine.<br>**2.** Someone or something that has a beneficial effect or influence. | *"How long is’t, Count, Since the physician at your father’s died?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[physicist]] | noun | **1.** A scientist trained in physics. | *"Did not an immortal physicist and interpreter of hieroglyphs write detestable verses?"* — George Eliot, *Middlemarch* |
| [[physics]] | noun | **1.** A science that deals with matter and energy and their interactions.<br>**2.** The physical processes and phenomena of a particular system. | *"The labour we delight in physics pain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[physiologic]] | adjective | **1.** Of or consistent with an organism's normal functioning. | *"In academic literature, physiologic designates of or consistent with an organism's normal functioning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physiological]] | adjective | **1.** Of or relating to the biological study of physiology.<br>**2.** Of or consistent with an organism's normal functioning. | *"Thus I induced physiological and psychological states similar to those caused by the jacket."* — Jack London, *The Jacket (The Star-Rover)* |
| [[physiologically]] | adverb | **1.** Of or relating to physiological processes; with respect to physiology. | *"In academic literature, physiologically designates of or relating to physiological processes; with respect to physiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physiologist]] | noun | **1.** A biologist specializing in physiology. | *"Ere quitting, for the nonce, the Sperm Whale’s head, I would have you, as a sensible physiologist, simply—particularly remark its front aspect, in all its compacted collectedness."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[physiology]] | noun | **1.** A branch of biology that deals with the functions and activities of life or of living matter (such as organs, tissues, or cells) and of the physical and chemical phenomena involved.<br>**2.** The organic processes and phenomena of an organism or any of its parts or of a particular bodily process. | *"Some years ago I happened to be conversing at Cambridge with three men who were respectively of great eminence in mathematics, classics, and physiology."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[physique]] | noun | **1.** The form or structure of an animal's body and especially a human body : bodily makeup. | *"Another brother, James, a young man of vigorous mental powers, and originally of stalwart physique, who had been working at his trade as a tailor in Glasgow, fell into bad health, which soon showed the symptoms of rapid consumption."* — John Cairns, *Principal Cairns* |
| [[phytelephas]] | noun | **1.** Small genus of south american feather palms. | *"In academic literature, phytelephas designates small genus of south american feather palms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytochemical]] | noun | **1.** A chemical substance obtained from plants that is biologically active but not nutritive. | *"In academic literature, phytochemical designates a chemical substance obtained from plants that is biologically active but not nutritive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytochemist]] | noun | **1.** A chemist who specializes in the chemistry of plants. | *"In academic literature, phytochemist designates a chemist who specializes in the chemistry of plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytochemistry]] | noun | **1.** The branch of organic chemistry dealing with the chemistry of plants. | *"In academic literature, phytochemistry designates the branch of organic chemistry dealing with the chemistry of plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytohormone]] | noun | **1.** (botany) a plant product that acts like a hormone. | *"In academic literature, phytohormone designates (botany) a plant product that acts like a hormone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytolacca]] | noun | **1.** Type genus of phytolaccaceae: pokeweed. | *"In academic literature, phytolacca designates type genus of phytolaccaceae: pokeweed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytolaccaceae]] | noun | **1.** Chiefly tropical herbaceous plants (including shrubs and trees) with racemose flowers: genera phytolacca, agdestis, ercilla, rivina, trichostigma. | *"In academic literature, phytolaccaceae designates chiefly tropical herbaceous plants (including shrubs and trees) with racemose flowers: genera phytolacca, agdestis, ercilla, rivina, trichostigma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytologist]] | noun | **1.** A biologist specializing in the study of plants. | *"His short communications on botany were chiefly if not entirely published in a monthly magazine called "The Phytologist," edited, from its commencement in 1841, by the late George Luxford, till his death, in 1854, and afterwards conducted by Mr."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[phytology]] | noun | **1.** The branch of biology that studies plants. | *"In academic literature, phytology designates the branch of biology that studies plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytomastigina]] | noun | **1.** Plantlike flagellates containing chlorophyll; often considered unicellular algae. | *"In academic literature, phytomastigina designates plantlike flagellates containing chlorophyll; often considered unicellular algae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phyton]] | noun | **1.** A structural unit of a plant consisting of a leaf and its associated portion of stem.<br>**2.** The smallest part of a stem, root, or leaf that when severed may grow into a new plant. | *"In academic literature, phyton designates a structural unit of a plant consisting of a leaf and its associated portion of stem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytonadione]] | noun | **1.** A form of vitamin k. | *"In academic literature, phytonadione designates a form of vitamin k."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytonym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phyt.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, phytonym designates a term designating an entity, condition, or phenomenon derived from greek phyt."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytophagic]] | adjective | **1.** (of animals) feeding on plants. | *"In academic literature, phytophagic designates (of animals) feeding on plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytophagous]] | adjective | **1.** (of animals) feeding on plants. | *"In academic literature, phytophagous designates (of animals) feeding on plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytophilous]] | adjective | **1.** (of animals) feeding on plants. | *"In academic literature, phytophilous designates (of animals) feeding on plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytophthora]] | noun | **1.** Destructive parasitic fungi causing brown rot in plants. | *"In academic literature, phytophthora designates destructive parasitic fungi causing brown rot in plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytoplankton]] | noun | **1.** Minute aquatic photosynthetic organisms (such as dinoflagellates, diatoms, and cyanobacteria) : photosynthetic plankton of freshwater or marine environments. | *"In academic literature, phytoplankton designates minute aquatic photosynthetic organisms (such as dinoflagellates, diatoms, and cyanobacteria) : photosynthetic plankton of freshwater or marine environments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytotherapy]] | noun | **1.** The use of plants or plant extracts for medicinal purposes (especially plants that are not part of the normal diet). | *"In academic literature, phytotherapy designates the use of plants or plant extracts for medicinal purposes (especially plants that are not part of the normal diet)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytotoxin]] | noun | **1.** Any substance produced by plants that is similar in its properties to extracellular bacterial toxin. | *"In academic literature, phytotoxin designates any substance produced by plants that is similar in its properties to extracellular bacterial toxin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symphytum]] | noun | **1.** Comfrey. | *"Classical and authoritative lexicons catalog symphytum as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Plants & Botany]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PHYT
  </div>
</div>
