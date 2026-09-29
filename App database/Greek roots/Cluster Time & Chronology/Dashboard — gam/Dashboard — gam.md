---
status: unread
type: root_dashboard
---
# Dashboard — gam
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">γάμος γαμεῖν γαμέτης γαμετή (gámos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“marriage, wedding”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'marriage, wedding'.</span>
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

The Greek root **gam** (γάμος γαμεῖν γαμέτης γαμετή (gámos)) signifies marriage, wedding. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *agamic*, *agamogenesis*, *agamospermy*, *agamy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: marriage, wedding
> The Greek root **gam** fundamentally denotes **marriage, wedding**. The physical sensory observation and cognitive anchor underlying 'marriage, wedding'. In classical Greek antiquity, the root denoted 'marriage, wedding', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">marriage, wedding</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'marriage, wedding'.</mark>
> - **Everyday Connection**: Think of familiar words like *agamic*, *agamogenesis*, *agamospermy*, *agamy*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gam** derives from Ancient Greek <mark class="hl-stem">γάμος γαμεῖν γαμέτης γαμετή (gámos)</mark>, meaning "marriage, wedding".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with gam**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'marriage, wedding'.
  - Whenever you see **gam** in an English word, think immediately of **marriage, wedding**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gam</mark>, think of <mark class="hl-def">marriage, wedding</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `gam-` (from *γάμος γαμεῖν γαμέτης γαμετή (gámos)*).
> - **Combining Stem with -o- Connective:** `gamo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Gam
> - **1. Direct & Concrete Anchor:** Literal instantiation of marriage, wedding in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on gam

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `gam-` | [[agamic]] | Primary root semantic foundation denoting marriage, wedding. |
| **Connecting -o-** | `gamo-` | [[agamogenesis]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `gam` | [[agamospermy]] | Relational or directional modification of the core root sense. |

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
| [[agamete]] | noun | **1.** An asexual reproductive cell. | *"In academic literature, agamete designates an asexual reproductive cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agamic]] | noun | **1.** Asexual, parthenogenetic. | *"In academic literature, agamic designates asexual, parthenogenetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agamogenesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gam.<br>**2.** Specialized application within the domain of Time & Chronology. | *"Insanity and agamogenesis I never knew more than one individual who believed in agamogenesis; she was unmarried, a lovely charac- 68:18 ter, was suffering from incipient insanity, and a Christian Scientist cured her."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[agamogenetic]] | adjective | **1.** (of reproduction) not involving the fusion of male and female gametes in reproduction. | *"In academic literature, agamogenetic designates (of reproduction) not involving the fusion of male and female gametes in reproduction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agamospermy]] | noun | **1.** Development of a sporophyte from a gametophyte without fertilization : apogamy; specifically : apogamy in which sexual union is not completed and the embryo is produced from the innermost layer of the integument of the female gametophyte. | *"In academic literature, agamospermy designates development of a sporophyte from a gametophyte without fertilization : apogamy; specifically : apogamy in which sexual union is not completed and the embryo is produced from the innermost layer of the integument of the female gametophyte."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agamous]] | adjective | **1.** (of reproduction) not involving the fusion of male and female gametes in reproduction. | *"In academic literature, agamous designates (of reproduction) not involving the fusion of male and female gametes in reproduction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agamy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gam.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, agamy designates a term designating an entity, condition, or phenomenon derived from greek gam."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allogamous]] | adjective | **1.** Relating to cross-fertilization in plants. | *"In academic literature, allogamous designates relating to cross-fertilization in plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allogamy]] | noun | **1.** Reproducing by cross-fertilization. | *"In academic literature, allogamy designates reproducing by cross-fertilization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anisogamete]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gam.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, anisogamete designates a term designating an entity, condition, or phenomenon derived from greek gam."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anisogametic]] | adjective | **1.** Relating to either of a pair of dissimilar (anisogamic) gametes combining in sexual reproduction. | *"In academic literature, anisogametic designates relating to either of a pair of dissimilar (anisogamic) gametes combining in sexual reproduction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anisogamous]] | adjective | **1.** Relating to a type of sexual reproduction in which the gametes are dissimilar in some respect (as size or shape). | *"In academic literature, anisogamous designates relating to a type of sexual reproduction in which the gametes are dissimilar in some respect (as size or shape)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anisogamy]] | noun | **1.** Characterized by fusion of heterogamous gametes or of individuals that usually differ chiefly in size. | *"In academic literature, anisogamy designates characterized by fusion of heterogamous gametes or of individuals that usually differ chiefly in size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apogametic]] | adjective | **1.** Of or relating to the development of an embryo in the absence of fertilization. | *"In academic literature, apogametic designates of or relating to the development of an embryo in the absence of fertilization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apogamic]] | adjective | **1.** Of or relating to the development of an embryo in the absence of fertilization. | *"In academic literature, apogamic designates of or relating to the development of an embryo in the absence of fertilization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apogamous]] | adjective | **1.** Of or relating to the development of an embryo in the absence of fertilization. | *"In academic literature, apogamous designates of or relating to the development of an embryo in the absence of fertilization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apogamy]] | noun | **1.** Development of a sporophyte from a gametophyte without fertilization —called also agamospermy. | *"In academic literature, apogamy designates development of a sporophyte from a gametophyte without fertilization —called also agamospermy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autogamic]] | adjective | **1.** Characterized by or fit for autogamy. | *"In academic literature, autogamic designates characterized by or fit for autogamy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autogamous]] | adjective | **1.** Characterized by or fit for autogamy. | *"In academic literature, autogamous designates characterized by or fit for autogamy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autogamy]] | noun | **1.** Self-fertilization: such as.<br>**2.** Pollination of a flower by its own pollen. | *"In academic literature, autogamy designates self-fertilization: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cleistogamous]] | noun | **1.** Characterized by or being small inconspicuous closed self-pollinating flowers additional to and often more fruitful than showier ones on the same plant. | *"In academic literature, cleistogamous designates characterized by or being small inconspicuous closed self-pollinating flowers additional to and often more fruitful than showier ones on the same plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cleistogamy]] | noun | **1.** Characterized by or being small inconspicuous closed self-pollinating flowers additional to and often more fruitful than showier ones on the same plant. | *"In academic literature, cleistogamy designates characterized by or being small inconspicuous closed self-pollinating flowers additional to and often more fruitful than showier ones on the same plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptogam]] | noun | **1.** A plant or plantlike organism (such as a fern, moss, alga, or fungus) reproducing by spores and not producing flowers or seed. | *"For many years he has toiled earnestly and vigorously at the lower cryptogams, as evidenced by his “Scottish Cryptogamic Flora,” published in 1823; and yet his continual additions to the records of science show him to be earnest and vigorous still."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[cryptogamic]] | adjective | **1.** Of or relating to a cryptogam. | *"When the cryptogamic plants of the world shall have been as widely examined and as well understood as the phanerogamic plants have been, we shall be in a better position to determine the geographical distribution of the different orders of fungi."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[cryptogamous]] | adjective | **1.** Of or relating to a cryptogam. | *"In academic literature, cryptogamous designates of or relating to a cryptogam."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deuterogamist]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gam.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, deuterogamist designates a term designating an entity, condition, or phenomenon derived from greek gam."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deuterogamy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gam.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, deuterogamy designates a term designating an entity, condition, or phenomenon derived from greek gam."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digamous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of marriage, wedding. | *"In academic literature, digamous designates adjective*) pertaining to, derived from, or characteristic of marriage, wedding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[digamy]] | noun | **1.** A second marriage after the termination of the first. | *"In academic literature, digamy designates a second marriage after the termination of the first."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endogamous]] | noun | **1.** Marriage within a specific group as required by custom or law. | *"In academic literature, endogamous designates marriage within a specific group as required by custom or law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endogamy]] | noun | **1.** Marriage within a specific group as required by custom or law. | *"In academic literature, endogamy designates marriage within a specific group as required by custom or law."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exogamic]] | adjective | **1.** Characterized by or fit for fertilization by a flower that is not closely related.<br>**2.** Pertaining to or characterized by the custom of marrying only outside the limits of a clan or tribe. | *"In academic literature, exogamic designates characterized by or fit for fertilization by a flower that is not closely related."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exogamous]] | noun | **1.** Marriage outside of a specific group especially as required by custom or law. | *"The Bataks are divided into exogamous clans (_margas_) with descent in the male line; and each clan is forbidden to eat the flesh of a particular animal."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[exogamy]] | noun | **1.** Marriage outside of a specific group especially as required by custom or law. | *"Roscoe, _The Baganda_ (London, 1911), pp. 393 _sq._, compare pp. 396, 398. [78] See _Totemism and Exogamy_, iv. 224 _sqq._ [79] Sir Harry H."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[gam]] | noun | **1.** leg.<br>**2.** a visit or friendly conversation at sea or ashore especially between whalers. | *"Howsomever, these gam’sters do certainly keep back their milk to-day."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[gamely]] | adverb | **1.** In a plucky manner. | *"She had waited by the side of the line, while the elderly gentleman struggled gamely for the tickets, and he had plenty of opportunity of observing her appearance."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[gameness]] | noun | **1.** Disability of walking due to crippling of the legs or feet. | *"In academic literature, gameness designates disability of walking due to crippling of the legs or feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gamete]] | noun | **1.** A mature male or female germ cell usually possessing a haploid chromosome set and capable of initiating formation of a new diploid individual by fusion with a gamete of the opposite sex.<br>**2.** A method of assisting reproduction in cases of infertility that involves obtaining eggs from an ovary, mixing them with sperm, and inserting them into a fallopian tube by a laparoscope —abbreviation GIFT—called also gamete intrafallopian tube transfer. | *"In academic literature, gamete designates a mature male or female germ cell usually possessing a haploid chromosome set and capable of initiating formation of a new diploid individual by fusion with a gamete of the opposite sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gametic]] | noun | **1.** A mature male or female germ cell usually possessing a haploid chromosome set and capable of initiating formation of a new diploid individual by fusion with a gamete of the opposite sex. | *"In academic literature, gametic designates a mature male or female germ cell usually possessing a haploid chromosome set and capable of initiating formation of a new diploid individual by fusion with a gamete of the opposite sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gametocyte]] | noun | **1.** A cell (as of a protozoan causing malaria) that divides to produce gametes. | *"In academic literature, gametocyte designates a cell (as of a protozoan causing malaria) that divides to produce gametes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gametophyte]] | noun | **1.** The haploid, multicellular sexual reproductive stage in plants and algae that develops from spores and that gives rise to the male and female gametes which unite during fertilization to form the zygote. | *"In academic literature, gametophyte designates the haploid, multicellular sexual reproductive stage in plants and algae that develops from spores and that gives rise to the male and female gametes which unite during fertilization to form the zygote."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gaming]] | noun | **1.** The act of playing for stakes in the hope of winning (including the payment of a price for a chance to win a prize).<br>**2.** Place a bet on. | *"And in the wretched state of his own finances, there was a very powerful motive for secrecy, in addition to his fear of discovery by Lydia’s relations; for it had just transpired that he had left gaming debts behind him to a very considerable amount."* — Jane Austen, *Pride and Prejudice* |
| [[heterogametic]] | noun | **1.** Forming two kinds of gametes of which one produces male offspring and the other female offspring. | *"In academic literature, heterogametic designates forming two kinds of gametes of which one produces male offspring and the other female offspring."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterogamous]] | noun | **1.** Having or marked by fusion of unlike gametes. | *"In academic literature, heterogamous designates having or marked by fusion of unlike gametes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterogamy]] | noun | **1.** Sexual reproduction involving fusion of unlike gametes often differing in size, structure, and physiology.<br>**2.** The condition of reproducing by heterogamy. | *"In academic literature, heterogamy designates sexual reproduction involving fusion of unlike gametes often differing in size, structure, and physiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homogametic]] | noun | **1.** Forming gametes which all have the same type of sex chromosome. | *"In academic literature, homogametic designates forming gametes which all have the same type of sex chromosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isogamete]] | noun | **1.** Either of a pair of conjugating gametes of the same size and structure. | *"In academic literature, isogamete designates either of a pair of conjugating gametes of the same size and structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[karyogamy]] | noun | **1.** The fusion of cell nuclei (as in fertilization). | *"In academic literature, karyogamy designates the fusion of cell nuclei (as in fertilization)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megagametophyte]] | noun | **1.** The female gametophyte produced by the megaspore of a plant that produces both microspore and megaspores. | *"In academic literature, megagametophyte designates the female gametophyte produced by the megaspore of a plant that produces both microspore and megaspores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microgametophyte]] | noun | **1.** The male gametophyte produced by a microspore. | *"In academic literature, microgametophyte designates the male gametophyte produced by a microspore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogamist]] | noun | **1.** Someone who practices monogamy (one spouse at a time). | *"In academic literature, monogamist designates someone who practices monogamy (one spouse at a time)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogamous]] | noun | **1.** Relating to, characterized by, or practicing monogamy : having only one mate, spouse, or sexual partner at one time. | *"In academic literature, monogamous designates relating to, characterized by, or practicing monogamy : having only one mate, spouse, or sexual partner at one time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogamousness]] | noun | **1.** Having only one spouse at a time. | *"In academic literature, monogamousness designates having only one spouse at a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monogamy]] | noun | **1.** The state or practice of having only one sexual partner at a time.<br>**2.** The state or custom of being married to only one person at a time. | *"Some of his works, such as that _On Monogamy_, bear the stamp of Montanism, for re-marriage was condemned by the Montanists."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[plasmogamy]] | noun | **1.** Fusion of the cytoplasm of two or more cells as distinguished from fusion of nuclei. | *"In academic literature, plasmogamy designates fusion of the cytoplasm of two or more cells as distinguished from fusion of nuclei."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polygamist]] | noun | **1.** Marriage in which a spouse of either sex may have more than one mate at the same time.<br>**2.** The state of being polygamous. | *"I shuddered at the gray polygamist, who had so utterly lost the holy sense of individuality in wedlock, that methought he was fain to reckon upon his fingers how many women, who had once slept by his side, were now sleeping in their graves."* — Nathaniel Hawthorne, *Chippings with a Chisel (From "Twice Told Tales")* |
| [[polygamy]] | noun | **1.** Marriage in which a spouse of either sex may have more than one mate at the same time.<br>**2.** The state of being polygamous. | *"A regular system of polygamy exists among the islanders; but of a most extraordinary nature,--a plurality of husbands, instead of wives! and this solitary fact speaks volumes for the gentle disposition of the male population."* — Herman Melville, *Typee: A Romance of the South Seas* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Time & Chronology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GAM
  </div>
</div>
