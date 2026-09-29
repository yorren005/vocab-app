---
status: unread
type: root_dashboard
---
# Dashboard — acanth
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἀκή ἄκανθα (ákantha)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“thorn”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'thorn'.</span>
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

The Greek root **acanth** (ἀκή ἄκανθα (ákantha)) signifies thorn. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Acanthaster*, *Acanthion*, *Acanthocephala*, *Acanthomintha*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: thorn
> The Greek root **acanth** fundamentally denotes **thorn**. The physical sensory observation and cognitive anchor underlying 'thorn'. In classical Greek antiquity, the root denoted 'thorn', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">thorn</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'thorn'.</mark>
> - **Everyday Connection**: Think of familiar words like *Acanthaster*, *Acanthion*, *Acanthocephala*, *Acanthomintha*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **acanth** derives from Ancient Greek <mark class="hl-stem">ἀκή ἄκανθα (ákantha)</mark>, meaning "thorn".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with acanth**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'thorn'.
  - Whenever you see **acanth** in an English word, think immediately of **thorn**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">acanth</mark>, think of <mark class="hl-def">thorn</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `acanth-` (from *ἀκή ἄκανθα (ákantha)*).
> - **Combining Stem with -o- Connective:** `acantho-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Acanth
> - **1. Direct & Concrete Anchor:** Literal instantiation of thorn in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on acanth

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `acanth-` | [[Acanthaster]] | Primary root semantic foundation denoting thorn. |
| **Connecting -o-** | `acantho-` | [[Acanthion]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `acanth` | [[Acanthocephala]] | Relational or directional modification of the core root sense. |

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
| [[acanth]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, acanth designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acantha]] | noun | **1.** Any sharply pointed projection. | *"In academic literature, acantha designates any sharply pointed projection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthaceae]] | noun | **1.** Widely distributed herbs and shrubs and trees; sometimes placed in the order scrophulariales. | *"In academic literature, acanthaceae designates widely distributed herbs and shrubs and trees; sometimes placed in the order scrophulariales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Acanthaster]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, Acanthaster designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Acanthion]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, Acanthion designates the craniometric point at the anterior extremity of the intermaxillary suture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthion]] | noun | **1.** The craniometric point at the anterior extremity of the intermaxillary suture. | *"In academic literature, acanthion designates **1.** the craniometric point at the anterior extremity of the intermaxillary suture."* — Academic Lexicon |
| [[acanthisitta]] | noun | **1.** A genus of xenicidae. | *"In academic literature, acanthisitta designates a genus of xenicidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthisittidae]] | noun | **1.** Alternative names for the family comprising the new zealand wrens. | *"In academic literature, acanthisittidae designates alternative names for the family comprising the new zealand wrens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthite]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, acanthite designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Acanthocephala]] | noun | **1.** Any of a small phylum (Acanthocephala) of unsegmented parasitic worms that have a proboscis bearing hooks by which attachment is made to the intestinal wall of the host : spiny-headed worm. | *"In academic literature, Acanthocephala designates phylum or class of elongated wormlike parasites that live in the intestines of vertebrates: spiny-headed worms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthocephala]] | noun | **1.** Phylum or class of elongated wormlike parasites that live in the intestines of vertebrates: spiny-headed worms. | *"In academic literature, acanthocephala designates **1.** phylum or class of elongated wormlike parasites that live in the intestines of vertebrates: spiny-headed worms."* — Academic Lexicon |
| [[acanthocephalan]] | noun | **1.** Any of various worms living parasitically in intestines of vertebrates having a retractile proboscis covered with many hooked spines. | *"In academic literature, acanthocephalan designates any of various worms living parasitically in intestines of vertebrates having a retractile proboscis covered with many hooked spines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthocephaliasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, acanthocephaliasis designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthocereus]] | noun | **1.** Mostly trailing cacti having nocturnal white flowers; tropical america and caribbean region. | *"In academic literature, acanthocereus designates mostly trailing cacti having nocturnal white flowers; tropical america and caribbean region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthocybium]] | noun | **1.** Wahoos. | *"Classical and authoritative lexicons catalog acanthocybium as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthocyte]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, acanthocyte designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthocytosis]] | noun | **1.** The presence of acanthocytes in the blood stream (as in abetalipoproteinemia). | *"In academic literature, acanthocytosis designates the presence of acanthocytes in the blood stream (as in abetalipoproteinemia)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthoid]] | adjective | **1.** Shaped like a spine or thorn. | *"In academic literature, acanthoid designates shaped like a spine or thorn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acantholysis]] | noun | **1.** A breakdown of a cell layer in the epidermis (as in pemphigus). | *"In academic literature, acantholysis designates a breakdown of a cell layer in the epidermis (as in pemphigus)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthoma]] | noun | **1.** A neoplasm originating in the epidermis. | *"In academic literature, acanthoma designates a neoplasm originating in the epidermis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Acanthomintha]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, Acanthomintha designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthophis]] | noun | **1.** Australian elapid snakes. | *"In academic literature, acanthophis designates australian elapid snakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthopterygian]] | noun | **1.** A teleost fish with fins that are supported by sharp inflexible rays. | *"In academic literature, acanthopterygian designates a teleost fish with fins that are supported by sharp inflexible rays."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthopterygii]] | noun | **1.** Teleost fishes having fins with sharp bony rays. | *"In academic literature, acanthopterygii designates teleost fishes having fins with sharp bony rays."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Acanthosaura]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, Acanthosaura designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthoscelides]] | noun | **1.** A genus of bruchidae. | *"In academic literature, acanthoscelides designates a genus of bruchidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthosis]] | noun | **1.** An abnormal but benign thickening of the prickle-cell layer of the skin (as in psoriasis). | *"In academic literature, acanthosis designates an abnormal but benign thickening of the prickle-cell layer of the skin (as in psoriasis)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthotic]] | adjective | **1.** Of or relating to or having acanthosis. | *"In academic literature, acanthotic designates of or relating to or having acanthosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthous]] | adjective | **1.** Shaped like a spine or thorn. | *"In academic literature, acanthous designates shaped like a spine or thorn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthuridae]] | noun | **1.** Surgeonfishes. | *"In academic literature, acanthuridae designates surgeonfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acanthurus]] | noun | **1.** Type genus of the acanthuridae: doctorfishes. | *"In academic literature, acanthurus designates type genus of the acanthuridae: doctorfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Acanthus]] | noun | **1.** Any of a genus (Acanthus of the family Acanthaceae, the acanthus family) of prickly perennial herbs chiefly of the Mediterranean region.<br>**2.** An ornamentation (as in a Corinthian capital) representing or suggesting the leaves of the acanthus. | *"Another cope was of green velvet, embroidered with heart-shaped groups of acanthus-leaves, from which spread long-stemmed white blossoms, the details of which were picked out with silver thread and coloured crystals."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[acanthus]] | noun | **1.** Any plant of the genus acanthus having large spiny leaves and spikes or white or purplish flowers; native to mediterranean region but widely cultivated. | *"In academic literature, acanthus designates **1.** any plant of the genus acanthus having large spiny leaves and spikes or white or purplish flowers; native to mediterranean region but widely cultivated."* — Academic Lexicon |
| [[anacanthini]] | noun | **1.** At least partially equivalent to the order gadiformes in some classifications. | *"In academic literature, anacanthini designates at least partially equivalent to the order gadiformes in some classifications."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Metri acanth osaurus]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, Metri acanth osaurus designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metriacanthosaurus]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, metriacanthosaurus designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuro acanth ocytosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, neuro acanth ocytosis designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neuroacanthocytosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek acanth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, neuroacanthocytosis designates a term designating an entity, condition, or phenomenon derived from greek acanth."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · ACANTH
  </div>
</div>
