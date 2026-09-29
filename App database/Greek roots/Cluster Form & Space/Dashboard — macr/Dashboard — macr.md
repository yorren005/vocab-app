---
status: unread
type: root_dashboard
---
# Dashboard — macr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">μακρός μακρότης (makrós)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“long”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'long'.</span>
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

The Greek root **macr** (μακρός μακρότης (makrós)) signifies long. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *macr*, *macroinstruction*, *macron*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: long
> The Greek root **macr** fundamentally denotes **long**. The physical sensory observation and cognitive anchor underlying 'long'. In classical Greek antiquity, the root denoted 'long', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">long</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'long'.</mark>
> - **Everyday Connection**: Think of familiar words like *macr*, *macroinstruction*, *macron*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **macr** derives from Ancient Greek <mark class="hl-stem">μακρός μακρότης (makrós)</mark>, meaning "long".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with macr**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'long'.
  - Whenever you see **macr** in an English word, think immediately of **long**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">macr</mark>, think of <mark class="hl-def">long</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `macr-` (from *μακρός μακρότης (makrós)*).
> - **Combining Stem with -o- Connective:** `macro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Macr
> - **1. Direct & Concrete Anchor:** Literal instantiation of long in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on macr

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `macr-` | [[macr]] | Primary root semantic foundation denoting long. |
| **Connecting -o-** | `macro-` | [[macroinstruction]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `macr` | [[macron]] | Relational or directional modification of the core root sense. |

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
| [[macr]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek macr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, macr designates a term designating an entity, condition, or phenomenon derived from greek macr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrame]] | noun | **1.** A relatively coarse lace; made by weaving and knotting cords.<br>**2.** Make knotted patterns. | *"In academic literature, macrame designates a relatively coarse lace; made by weaving and knotting cords."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrencephalic]] | adjective | **1.** Having a large brain case. | *"In academic literature, macrencephalic designates having a large brain case."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrencephalous]] | adjective | **1.** Having a large brain case. | *"In academic literature, macrencephalous designates having a large brain case."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrencephaly]] | noun | **1.** An abnormally large braincase. | *"In academic literature, macrencephaly designates an abnormally large braincase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macro]] | noun | **1.** A single computer instruction that results in a series of instructions in machine language.<br>**2.** Very large in scale or scope or capability. | *"On that mystery and not on the madonna which the cunning Italian intellect flung to the mob of Europe the church is founded and founded irremovably because founded, like the world, macro and microcosm, upon the void."* — James Joyce, *Ulysses* |
| [[macrobiotic]] | noun | **1.** Of, relating to, or being a diet based on the Chinese cosmological principles of yin and yang that consists of whole cereals and grains supplemented especially with beans and vegetables and that in its especially former more restrictive forms has been linked to nutritional deficiencies. | *"In academic literature, macrobiotic designates of, relating to, or being a diet based on the chinese cosmological principles of yin and yang that consists of whole cereals and grains supplemented especially with beans and vegetables and that in its especially former more restrictive forms has been linked to nutritional deficiencies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrobiotics]] | noun | **1.** The theory of promoting health and longevity by means of diet (especially whole beans and grains). | *"In academic literature, macrobiotics designates the theory of promoting health and longevity by means of diet (especially whole beans and grains)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocephalic]] | adjective | **1.** Having an exceptionally large head and brain. | *"In academic literature, macrocephalic designates having an exceptionally large head and brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocephalon]] | noun | **1.** Maleos. | *"Classical and authoritative lexicons catalog macrocephalon as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocephalous]] | adjective | **1.** Having an exceptionally large head and brain. | *"No one could better describe the macrocephalous cachalot, which is sometimes more than seventy-five feet long."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[macrocephaly]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cephal.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, macrocephaly designates a term designating an entity, condition, or phenomenon derived from greek cephal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocheira]] | noun | **1.** Giant crabs of japan. | *"In academic literature, macrocheira designates giant crabs of japan."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroclemys]] | noun | **1.** Includes the alligator snapping turtle. | *"In academic literature, macroclemys designates includes the alligator snapping turtle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocosm]] | noun | **1.** The great world : universe.<br>**2.** A complex that is a large-scale reproduction of one of its constituents. | *"He affirmed his significance as a conscious rational animal proceeding syllogistically from the known to the unknown and a conscious rational reagent between a micro and a macrocosm ineluctably constructed upon the incertitude of the void."* — James Joyce, *Ulysses* |
| [[macrocosmic]] | adjective | **1.** Relating to or constituting a macrocosm. | *"In academic literature, macrocosmic designates relating to or constituting a macrocosm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocyte]] | noun | **1.** Abnormally large red blood cell (associated with pernicious anemia). | *"In academic literature, macrocyte designates abnormally large red blood cell (associated with pernicious anemia)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocytosis]] | noun | **1.** The presence of macrocytes in the blood. | *"In academic literature, macrocytosis designates the presence of macrocytes in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrodactylus]] | noun | **1.** A genus of melolonthidae. | *"In academic literature, macrodactylus designates a genus of melolonthidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrodantin]] | noun | **1.** Derivative of nitrofuran used as an antibacterial medicine (trade name macrodantin) effective against a broad range of gram-positive and gram-negative bacteria; used to treat infections of the urinary tract. | *"In academic literature, macrodantin designates derivative of nitrofuran used as an antibacterial medicine (trade name macrodantin) effective against a broad range of gram-positive and gram-negative bacteria; used to treat infections of the urinary tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroeconomic]] | adjective | **1.** Of or relating to macroeconomics. | *"In academic literature, macroeconomic designates of or relating to macroeconomics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroeconomics]] | noun | **1.** The branch of economics that studies the overall working of a national economy. | *"In academic literature, macroeconomics designates the branch of economics that studies the overall working of a national economy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroeconomist]] | noun | **1.** An economist who specializes in macroeconomics. | *"In academic literature, macroeconomist designates an economist who specializes in macroeconomics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroevolution]] | noun | **1.** Evolution on a large scale extending over geologic era and resulting in the formation of new taxonomic groups. | *"In academic literature, macroevolution designates evolution on a large scale extending over geologic era and resulting in the formation of new taxonomic groups."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroglia]] | noun | **1.** Tissue consisting of large stellate neuroglial cells. | *"In academic literature, macroglia designates tissue consisting of large stellate neuroglial cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroglossia]] | noun | **1.** A congenital disorder characterized by an abnormally large tongue; often seen in cases of down's syndrome. | *"In academic literature, macroglossia designates a congenital disorder characterized by an abnormally large tongue; often seen in cases of down's syndrome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroinstruction]] | noun | **1.** macro. | *"Classical and authoritative lexicons catalog macroinstruction as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macromolecular]] | adjective | **1.** Relating to or consisting of or characterized by macromolecules. | *"In academic literature, macromolecular designates relating to or consisting of or characterized by macromolecules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macromolecule]] | noun | **1.** Any very large complex molecule; found only in plants and animals. | *"In academic literature, macromolecule designates any very large complex molecule; found only in plants and animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macron]] | noun | **1.** A mark — placed over a vowel to indicate that the vowel is long or placed over a syllable or used alone to indicate a stressed or long syllable in a metrical foot.<br>**2.** Emmanuel (Jean-Michel Frédéric) 1977— president of France (2017— ). | *"In academic literature, macron designates a mark — placed over a vowel to indicate that the vowel is long or placed over a syllable or used alone to indicate a stressed or long syllable in a metrical foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macronectes]] | noun | **1.** Giant petrels. | *"In academic literature, macronectes designates giant petrels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrophage]] | noun | **1.** A phagocytic tissue cell of the immune system that may be fixed or freely motile, is derived from a monocyte, functions in the destruction of foreign antigens (such as bacteria and viruses), and serves as an antigen-presenting cell. | *"In academic literature, macrophage designates a phagocytic tissue cell of the immune system that may be fixed or freely motile, is derived from a monocyte, functions in the destruction of foreign antigens (such as bacteria and viruses), and serves as an antigen-presenting cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macropodidae]] | noun | **1.** Kangaroos; wallabies. | *"In academic literature, macropodidae designates kangaroos; wallabies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macropus]] | noun | **1.** Type genus of the family macropodidae: typical kangaroos and wallabies. | *"In academic literature, macropus designates type genus of the family macropodidae: typical kangaroos and wallabies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrorhamphosidae]] | noun | **1.** Bellows fishes. | *"In academic literature, macrorhamphosidae designates bellows fishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroscopic]] | noun | **1.** Observable by the naked eye.<br>**2.** Involving large units or elements. | *"In academic literature, macroscopic designates observable by the naked eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroscopical]] | adjective | **1.** Visible to the naked eye; using the naked eye.<br>**2.** Large enough to be visible with the naked eye. | *"In academic literature, macroscopical designates visible to the naked eye; using the naked eye."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroscopically]] | adverb | **1.** Without using a microscope. | *"In academic literature, macroscopically designates without using a microscope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrosporangium]] | noun | **1.** A plant structure that produces megaspores. | *"In academic literature, macrosporangium designates a plant structure that produces megaspores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrospore]] | noun | **1.** Larger of the two types of spore produced in heterosporous plants; develops in ovule into a female gametophyte. | *"In academic literature, macrospore designates larger of the two types of spore produced in heterosporous plants; develops in ovule into a female gametophyte."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrothelypteris]] | noun | **1.** Medium to large terrestrial ferns of tropical asia to polynesia and australia; naturalized in americas. | *"In academic literature, macrothelypteris designates medium to large terrestrial ferns of tropical asia to polynesia and australia; naturalized in americas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrotis]] | noun | **1.** A genus of peramelidae. | *"In academic literature, macrotis designates a genus of peramelidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrotus]] | noun | **1.** Large-eared greyish bat of southern california and northwestern mexico. | *"In academic literature, macrotus designates large-eared greyish bat of southern california and northwestern mexico."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrotyloma]] | noun | **1.** Annual or perennial vines of africa and india and australia; plants often placed in genus dolichos. | *"In academic literature, macrotyloma designates annual or perennial vines of africa and india and australia; plants often placed in genus dolichos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrouridae]] | noun | **1.** Grenadiers. | *"In academic literature, macrouridae designates grenadiers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrozamia]] | noun | **1.** Any treelike cycad of the genus macrozamia having erect trunks and pinnate leaves and large cones with sometimes edible nuts; australia. | *"In academic literature, macrozamia designates any treelike cycad of the genus macrozamia having erect trunks and pinnate leaves and large cones with sometimes edible nuts; australia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrozoarces]] | noun | **1.** A genus of zoarcidae. | *"In academic literature, macrozoarces designates a genus of zoarcidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macruridae]] | noun | **1.** Grenadiers. | *"In academic literature, macruridae designates grenadiers."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · MACR
  </div>
</div>
