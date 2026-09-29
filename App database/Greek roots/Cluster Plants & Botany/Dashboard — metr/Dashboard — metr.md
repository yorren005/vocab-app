---
status: unread
type: root_dashboard
---
# Dashboard — metr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">μετρία (metría) (process of measuring)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry'.</span>
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

The Greek root **metr** (μετρία (metría) (process of measuring)) signifies spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *audiometer*, *audiometry*, *calorimeter*, *densitometry*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry
> The Greek root **metr** fundamentally denotes **spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry**. The physical sensory observation and cognitive anchor underlying 'spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry'. In classical Greek antiquity, the root denoted 'spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry'.</mark>
> - **Everyday Connection**: Think of familiar words like *audiometer*, *audiometry*, *calorimeter*, *densitometry*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **metr** derives from Ancient Greek <mark class="hl-stem">μετρία (metría) (process of measuring)</mark>, meaning "spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with metr**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry'.
  - Whenever you see **metr** in an English word, think immediately of **spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">metr</mark>, think of <mark class="hl-def">spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `metr-` (from *μετρία (metría) (process of measuring)*).
> - **Combining Stem with -o- Connective:** `metro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Metr
> - **1. Direct & Concrete Anchor:** Literal instantiation of spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on metr

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `metr-` | [[audiometer]] | Primary root semantic foundation denoting spirometry, audiometry, optometry, oximetry, telemetry, geometry (math root applied in science), densitometry. |
| **Connecting -o-** | `metro-` | [[audiometry]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `metr` | [[calorimeter]] | Relational or directional modification of the core root sense. |

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
| [[ametria]] | noun | **1.** Congenital absence of the uterus. | *"In academic literature, ametria designates congenital absence of the uterus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ametropia]] | noun | **1.** (ophthalmology) faulty refraction of light rays in the eye as in astigmatism or myopia. | *"In academic literature, ametropia designates (ophthalmology) faulty refraction of light rays in the eye as in astigmatism or myopia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ametropic]] | adjective | **1.** Of or relating to an abnormal condition of the eye in which visual images are not in focus on the retina. | *"In academic literature, ametropic designates of or relating to an abnormal condition of the eye in which visual images are not in focus on the retina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiometer]] | noun | **1.** An instrument used in measuring the acuity of hearing. | *"In academic literature, audiometer designates an instrument used in measuring the acuity of hearing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiometric]] | adjective | **1.** Of or relating to audiometry. | *"In academic literature, audiometric designates of or relating to audiometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[audiometry]] | noun | **1.** An instrument used in measuring the acuity of hearing. | *"In academic literature, audiometry designates an instrument used in measuring the acuity of hearing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[calorimeter]] | noun | **1.** An apparatus for measuring quantities of absorbed or emitted heat or for determining specific heats. | *"In academic literature, calorimeter designates an apparatus for measuring quantities of absorbed or emitted heat or for determining specific heats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[demetrius]] | noun | **1.** Son of antigonus cyclops and king of macedonia; he and his father were defeated at the battle of ipsus (337-283 bc). | *"Speak not to us. [_Exeunt Antony and Cleopatra with the Train._] DEMETRIUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[densitometry]] | noun | **1.** An instrument for determining optical, photographic, or mass density. | *"In academic literature, densitometry designates an instrument for determining optical, photographic, or mass density."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diametral]] | adjective | **1.** Related to or along a diameter. | *"In academic literature, diametral designates related to or along a diameter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diametric]] | noun | **1.** Of, relating to, or constituting a straight line segment passing through the center of a figure or body : located at the diameter.<br>**2.** Completely opposed : being at opposite extremes. | *"In academic literature, diametric designates of, relating to, or constituting a straight line segment passing through the center of a figure or body : located at the diameter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diametrical]] | adjective | **1.** Related to or along a diameter.<br>**2.** Characterized by opposite extremes; completely opposed. | *"In academic literature, diametrical designates related to or along a diameter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diametrically]] | adverb | **1.** As from opposite ends of a diameter. | *"Rouncewell, our views of duty, and our views of station, and our views of education, and our views of—in short, ALL our views—are so diametrically opposed, that to prolong this discussion must be repellent to your feelings and repellent to my own."* — Charles Dickens, *Bleak House* |
| [[emmetropia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ops.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, emmetropia designates a term designating an entity, condition, or phenomenon derived from greek ops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emmetropic]] | adjective | **1.** Of or relating to the normal condition of the eye in which visual images are in clear focus on the retina. | *"In academic literature, emmetropic designates of or relating to the normal condition of the eye in which visual images are in clear focus on the retina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endometrial]] | adjective | **1.** Of or relating to the endometrium. | *"In academic literature, endometrial designates of or relating to the endometrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endometriosis]] | noun | **1.** The presence of endometrium elsewhere than in the lining of the uterus; causes premenstrual pain and dysmenorrhea. | *"In academic literature, endometriosis designates the presence of endometrium elsewhere than in the lining of the uterus; causes premenstrual pain and dysmenorrhea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endometritis]] | noun | **1.** Inflammation of the lining of the uterus (of the endometrium). | *"In academic literature, endometritis designates inflammation of the lining of the uterus (of the endometrium)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endometrium]] | noun | **1.** (pregnancy) the mucous membrane that lines the uterus; thickens under hormonal control and (if pregnancy does not occur) is shed in menstruation; if pregnancy occurs it is shed along with the placenta at parturition. | *"In academic literature, endometrium designates (pregnancy) the mucous membrane that lines the uterus; thickens under hormonal control and (if pregnancy does not occur) is shed in menstruation; if pregnancy occurs it is shed along with the placenta at parturition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geometry_science]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek metr.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, geometry_science designates a term designating an entity, condition, or phenomenon derived from greek metr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[glucometer]] | noun | **1.** An instrument for measuring the concentration of glucose in the blood. | *"In academic literature, glucometer designates an instrument for measuring the concentration of glucose in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haplometrosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek metr.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, haplometrosis designates a term designating an entity, condition, or phenomenon derived from greek metr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermetropia]] | noun | **1.** Abnormal condition in which vision for distant objects is better than for near objects. | *"In academic literature, hypermetropia designates abnormal condition in which vision for distant objects is better than for near objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermetropic]] | adjective | **1.** Abnormal ability to focus of distant objects. | *"In academic literature, hypermetropic designates abnormal ability to focus of distant objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermetropy]] | noun | **1.** Abnormal condition in which vision for distant objects is better than for near objects. | *"In academic literature, hypermetropy designates abnormal condition in which vision for distant objects is better than for near objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isometric]] | noun | **1.** Of, relating to, or characterized by equality of measure; especially : relating to or being a crystallographic system characterized by three equal axes at right angles.<br>**2.** Of, relating to, involving, or being muscular contraction (as in isometrics) against resistance, without significant shortening of muscle fibers, and with marked increase in muscle tone. | *"In academic literature, isometric designates of, relating to, or characterized by equality of measure; especially : relating to or being a crystallographic system characterized by three equal axes at right angles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isometrical]] | adjective | **1.** Having equal dimensions or measurements. | *"In academic literature, isometrical designates having equal dimensions or measurements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isometrics]] | noun | **1.** Muscle-building exercises (or a system of musclebuilding exercises) involving muscular contractions against resistance without movement (the muscles contracts but the length of the muscle does not change).<br>**2.** A line connecting isometric points. | *"In academic literature, isometrics designates muscle-building exercises (or a system of musclebuilding exercises) involving muscular contractions against resistance without movement (the muscles contracts but the length of the muscle does not change)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isometropia]] | noun | **1.** Equality of refractive power in the two eyes. | *"In academic literature, isometropia designates equality of refractive power in the two eyes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isometry]] | noun | **1.** The growth rates in different parts of a growing organism are the same.<br>**2.** A one-to-one mapping of one metric space into another metric space that preserves the distances between each pair of points. | *"In academic literature, isometry designates the growth rates in different parts of a growing organism are the same."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metr]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek metr.<br>**2.** Specialized application within the domain of Plants & Botany. | *"I made the experiment often; and it seemed to me, and to all that attempted it, that we did reach the very edge of the stream; but the next moment perceived that we were at a certain distance, say twenty metres or thereabout."* — Mrs. Oliphant, *A Beleaguered City* |
| [[metralgia]] | noun | **1.** Pain in the uterus. | *"In academic literature, metralgia designates pain in the uterus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrazol]] | noun | **1.** A drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark. | *"In academic literature, metrazol designates a drug used as a circulatory and respiratory stimulant; larger doses cause convulsions in shock therapy; metrazol is a trademark."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metre]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek meter.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"So should my papers (yellowed with their age) Be scorned, like old men of less truth than tongue, And your true rights be termed a poet’s rage, And stretched metre of an antique song."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metrestick]] | noun | **1.** A rule one meter long (usually marked off in centimeters and millimeters). | *"In academic literature, metrestick designates a rule one meter long (usually marked off in centimeters and millimeters)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metric]] | noun | **1.** A standard of measurement.<br>**2.** A part of prosody that deals with metrical structure. | *"Herrick mentions it in one of his songs: Come, bring with a noise, My metric, merrie boys, The Christmas Log to the firing; While my good dame, she Bids ye all be free, And drink to your hearts’ desiring."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[metrical]] | adjective | **1.** Based on the meter as a standard of measurement.<br>**2.** The rhythmic arrangement of syllables. | *"It should react upon his metrical vocabulary to its beneficial expansion, by taking him outside his aristocratic circle of language, and keeping him in touch with the great commonalty, the proletariat of speech."* — Francis Thompson, *Shelley: An Essay* |
| [[metrically]] | adverb | **1.** With regard to meter. | *"In academic literature, metrically designates with regard to meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metricate]] | verb | **1.** Convert from a non-metric to the metric system. | *"In academic literature, metricate designates convert from a non-metric to the metric system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrication]] | noun | **1.** The act of changing from imperial units of measurement to metric units: meters, grams, seconds. | *"In academic literature, metrication designates the act of changing from imperial units of measurement to metric units: meters, grams, seconds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metricise]] | verb | **1.** Express in the metric system.<br>**2.** Convert from a non-metric to the metric system. | *"In academic literature, metricise designates express in the metric system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metricize]] | verb | **1.** Express in the metric system.<br>**2.** Convert from a non-metric to the metric system. | *"In academic literature, metricize designates express in the metric system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrics]] | noun | **1.** The study of poetic meter and the art of versification.<br>**2.** A function of a topological space that gives, for any two points in the space, a value equal to the distance between them. | *"In academic literature, metrics designates the study of poetic meter and the art of versification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrification]] | noun | **1.** Writing a metrical composition (or the metrical structure of a composition).<br>**2.** The act of changing from imperial units of measurement to metric units: meters, grams, seconds. | *"In academic literature, metrification designates writing a metrical composition (or the metrical structure of a composition)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrify]] | verb | **1.** Compose in poetic meter.<br>**2.** Convert from a non-metric to the metric system. | *"In academic literature, metrify designates compose in poetic meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metritis]] | noun | **1.** Inflammation of the lining of the uterus (of the endometrium). | *"In academic literature, metritis designates inflammation of the lining of the uterus (of the endometrium)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metro]] | noun | **1.** An electric railway operating below the surface of the ground (usually in a city). | *"In academic literature, metro designates an electric railway operating below the surface of the ground (usually in a city)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrocyte]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek metr.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, metrocyte designates a term designating an entity, condition, or phenomenon derived from greek metr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrological]] | adjective | **1.** Of or relating to metrology. | *"In academic literature, metrological designates of or relating to metrology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrology]] | noun | **1.** The science of weights and measures or of measurement.<br>**2.** A system of weights and measures. | *"In academic literature, metrology designates the science of weights and measures or of measurement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metronidazole]] | noun | **1.** Antiprotozoal medication (trade name flagyl) used to treat trichomoniasis and giardiasis. | *"In academic literature, metronidazole designates antiprotozoal medication (trade name flagyl) used to treat trichomoniasis and giardiasis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metronome]] | noun | **1.** Something (such as a device or app) designed to mark an exact tempo or rhythm by regularly repeated sounds or flashes. | *"There's an old metronome up-stairs that Cyril left."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[metronymic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of name. | *"In academic literature, metronymic designates adjective*) pertaining to, derived from, or characteristic of name."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metropolis]] | noun | **1.** The chief or capital city of a country, state, or region.<br>**2.** The city or state of origin of a colony (as of ancient Greece). | *"The next is this: King John hath reconcil’d Himself to Rome; his spirit is come in, That so stood out against the holy church, The great metropolis and see of Rome."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metropolitan]] | noun | **1.** In the eastern orthodox church this title is given to a position between bishop and patriarch; equivalent to archbishop in western christianity.<br>**2.** A person who lives in a metropolis. | *"As watching is best done invisibly, she usually carried a dark lantern in her hand, and every now and then turned on the light to examine nooks and corners with the coolness of a metropolitan policeman."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[metroptosis]] | noun | **1.** Prolapse of the uterus. | *"In academic literature, metroptosis designates prolapse of the uterus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metrorrhagia]] | noun | **1.** Bleeding from the uterus that is not due to menstruation; usually indicative of disease (as cervical cancer). | *"In academic literature, metrorrhagia designates bleeding from the uterus that is not due to menstruation; usually indicative of disease (as cervical cancer)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metroxylon]] | noun | **1.** A genus of malayan pinnate-leaved palm trees that flower and fruit once and then die. | *"In academic literature, metroxylon designates a genus of malayan pinnate-leaved palm trees that flower and fruit once and then die."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometry]] | noun | **1.** Measuring with a micrometer. | *"In academic literature, micrometry designates measuring with a micrometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optometrist]] | noun | **1.** A specialist licensed to practice optometry. | *"In academic literature, optometrist designates a specialist licensed to practice optometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[optometry]] | noun | **1.** The health care profession concerned especially with examining the eye for defects and faults of refraction, with prescribing correctional lenses or eye exercises, with diagnosing diseases of the eye, and with treating such diseases or referring them for treatment. | *"In academic literature, optometry designates the health care profession concerned especially with examining the eye for defects and faults of refraction, with prescribing correctional lenses or eye exercises, with diagnosing diseases of the eye, and with treating such diseases or referring them for treatment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oximeter]] | noun | **1.** A noninvasive medical device for measuring continuously or intermittently the degree of oxygen saturation of circulating blood or a localized region of tissue; especially : pulse oximeter.<br>**2.** A noninvasive medical device that utilizes spectrophotometry to measure the oxygen saturation of circulating arterial blood in an individual by determining the percentage of oxygenated hemoglobin pulsating through a network of blood capillaries by way of a sensor attached typically to a finger, toe, or earlobe. | *"In academic literature, oximeter designates a noninvasive medical device for measuring continuously or intermittently the degree of oxygen saturation of circulating blood or a localized region of tissue; especially : pulse oximeter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oximetry]] | noun | **1.** A method that utilizes spectrophotometry to measure the oxygen saturation of circulating blood or a localized region of tissue by means of an oximeter; especially : pulse oximetry.<br>**2.** A test using oximetry. | *"In academic literature, oximetry designates a method that utilizes spectrophotometry to measure the oxygen saturation of circulating blood or a localized region of tissue by means of an oximeter; especially : pulse oximetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parametric]] | noun | **1.** An arbitrary constant whose value characterizes a member of a system (such as a family of curves); also : a quantity (such as a mean or variance) that describes a statistical population.<br>**2.** An independent variable used to express the coordinates of a variable point and functions of them. | *"In academic literature, parametric designates an arbitrary constant whose value characterizes a member of a system (such as a family of curves); also : a quantity (such as a mean or variance) that describes a statistical population."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parametritis]] | noun | **1.** Inflammation of connective tissue adjacent to the uterus. | *"In academic literature, parametritis designates inflammation of connective tissue adjacent to the uterus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pleometrosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek metr.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, pleometrosis designates a term designating an entity, condition, or phenomenon derived from greek metr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirometer]] | noun | **1.** An instrument for measuring the air entering and leaving the lungs (as in determining lung function in the diagnosis of pulmonary disease). | *"In academic literature, spirometer designates an instrument for measuring the air entering and leaving the lungs (as in determining lung function in the diagnosis of pulmonary disease)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[spirometry]] | noun | **1.** An instrument for measuring the air entering and leaving the lungs (as in determining lung function in the diagnosis of pulmonary disease). | *"In academic literature, spirometry designates an instrument for measuring the air entering and leaving the lungs (as in determining lung function in the diagnosis of pulmonary disease)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetric]] | noun | **1.** Having, involving, or exhibiting symmetry.<br>**2.** Having corresponding points whose connecting lines are bisected by a given point or perpendicularly bisected by a given line or plane. | *"In academic literature, symmetric designates having, involving, or exhibiting symmetry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetrical]] | adjective | **1.** Having similarity in size, shape, and relative position of corresponding parts.<br>**2.** Exhibiting equivalence or correspondence among constituents of an entity or between different entities. | *"And we like ’em all the better for it, don’t we?” Mercury, with his hands in the pockets of his bright peach-blossom small-clothes, stretches his symmetrical silk legs with the air of a man of gallantry and can’t deny it."* — Charles Dickens, *Bleak House* |
| [[symmetrically]] | adverb | **1.** In a symmetrical manner. | *"Deep,” said Wemmick, “as Australia.” Pointing with his pen at the office floor, to express that Australia was understood, for the purposes of the figure, to be symmetrically on the opposite spot of the globe."* — Charles Dickens, *Great Expectations* |
| [[symmetricalness]] | noun | **1.** (mathematics) an attribute of a shape or relation; exact reflection of form on opposite sides of a dividing line or plane. | *"In academic literature, symmetricalness designates (mathematics) an attribute of a shape or relation; exact reflection of form on opposite sides of a dividing line or plane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetrise]] | verb | **1.** Make symmetric. | *"In academic literature, symmetrise designates make symmetric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetrize]] | verb | **1.** Make symmetric. | *"In academic literature, symmetrize designates make symmetric."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symmetry]] | noun | **1.** Balanced proportions; also : beauty of form arising from balanced proportions.<br>**2.** The property of being symmetrical; especially : correspondence in size, shape, and relative position of parts on opposite sides of a dividing line or median plane or about a center or axis. | *"Since the receipt of the missive in the morning, Boldwood had felt the symmetry of his existence to be slowly getting distorted in the direction of an ideal passion."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[telemetry]] | noun | **1.** The science or process of telemetering data.<br>**2.** Data transmitted by telemetry. | *"In academic literature, telemetry designates the science or process of telemetering data."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonometer]] | noun | **1.** An instrument or device for determining the exact pitch or the vibration rate of tones.<br>**2.** An instrument for measuring tension or pressure and especially intraocular pressure. | *"In academic literature, tonometer designates an instrument or device for determining the exact pitch or the vibration rate of tones."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · METR
  </div>
</div>
