---
status: unread
type: root_dashboard
---
# Dashboard — stat_ stas
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">stat_ stas</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“Stop”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'Stop'.</span>
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

The Greek root **stat_ stas** (*stat_ stas*) signifies Stop. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *static*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: Stop
> The Greek root **stat_ stas** fundamentally denotes **Stop**. The physical sensory observation and cognitive anchor underlying 'Stop'. In classical Greek antiquity, the root denoted 'Stop', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Stop</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'Stop'.</mark>
> - **Everyday Connection**: Think of familiar words like *static*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **stat_ stas** derives from Ancient Greek **stat_ stas**, meaning "Stop".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with stat_ stas**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'Stop'.
  - Whenever you see **stat_ stas** in an English word, think immediately of **Stop**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see **stat_ stas**, think of Stop.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `stat_ stas-` (from **stat_ stas**).
> - **Combining Stem with -o- Connective:** `stat_ staso-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Stat_ stas
> - **1. Direct & Concrete Anchor:** Literal instantiation of Stop in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on stat_ stas

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `stat_ stas-` | [[static]] | Primary root semantic foundation denoting Stop. |
| **Connecting -o-** | `stat_ staso-` | [[stat_ stas]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `stat_ stas` | [[stat_ stas]] | Relational or directional modification of the core root sense. |

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
| [[apostate]] | noun | **1.** A disloyal person who betrays or deserts his cause or religion or political party or friend etc.<br>**2.** Not faithful to religion or party or cause. | *"Ha-ha—I’m awfully glad you have made an apostate of me all the same!"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[astatic]] | adjective | **1.** Not static or stable. | *"In academic literature, astatic designates not static or stable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astatine]] | noun | **1.** A highly unstable radioactive element (the heaviest of the halogen series); a decay product of uranium and thorium. | *"In academic literature, astatine designates a highly unstable radioactive element (the heaviest of the halogen series); a decay product of uranium and thorium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[coelostat]] | noun | **1.** Optical device used to follow the path of a celestial body and reflect its light into a telescope; has a movable and a fixed mirror. | *"In academic literature, coelostat designates optical device used to follow the path of a celestial body and reflect its light into a telescope; has a movable and a fixed mirror."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[costate]] | adjective | **1.** (of the surface) having a rough, riblike texture.<br>**2.** Having ribs. | *"In academic literature, costate designates (of the surface) having a rough, riblike texture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryostat]] | noun | **1.** A thermostat that operates at very low temperatures. | *"In academic literature, cryostat designates a thermostat that operates at very low temperatures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devastate]] | verb | **1.** Cause extensive destruction or ruin utterly.<br>**2.** Overwhelm or overpower. | *"Jaggers, in the same devastating strain: “What does this fellow want?” “Ma thear Mithter Jaggerth."* — Charles Dickens, *Great Expectations* |
| [[diastasis]] | noun | **1.** Separation of an epiphysis from the long bone to which it is normally attached without fracture of the bone. | *"In academic literature, diastasis designates separation of an epiphysis from the long bone to which it is normally attached without fracture of the bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dopastat]] | noun | **1.** A monoamine neurotransmitter found in the brain and essential for the normal functioning of the central nervous system; as a drug (trade names dopastat and intropin) it is used to treat shock and hypotension. | *"In academic literature, dopastat designates a monoamine neurotransmitter found in the brain and essential for the normal functioning of the central nervous system; as a drug (trade names dopastat and intropin) it is used to treat shock and hypotension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecstatic]] | adjective | **1.** Feeling great rapture or delight. | *"Having seen that it was really her lover who had advanced, and no one else, her lips parted, and she sank upon him in her momentary joy, with something very like an ecstatic cry."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[epistasis]] | noun | **1.** The suppression of a gene by the effect of an unrelated gene. | *"In academic literature, epistasis designates the suppression of a gene by the effect of an unrelated gene."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[estate]] | noun | **1.** Everything you own; all of your assets (whether real property or personal property) and liabilities.<br>**2.** Extensive landed property (especially in the country) retained by the owner for his own use. | *"We thank you, maiden, But may not be so credulous of cure, When our most learned doctors leave us, and The congregated college have concluded That labouring art can never ransom nature From her inaidable estate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[gestate]] | verb | **1.** Have the idea for.<br>**2.** Be pregnant with. | *"In academic literature, gestate designates have the idea for."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gestation]] | noun | **1.** The period during which an embryo develops (about 266 days in humans).<br>**2.** The state of being pregnant; the period from conception to birth when a woman carries a developing fetus in her uterus. | *"It was she I worshipped when I bowed before the ten stones of jade and adored them as the moons of gestation."* — Jack London, *The Jacket (The Star-Rover)* |
| [[gustation]] | noun | **1.** The faculty of distinguishing sweet, sour, bitter, and salty properties in the mouth. | *"In academic literature, gustation designates the faculty of distinguishing sweet, sour, bitter, and salty properties in the mouth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gustative]] | adjective | **1.** Of or relating to gustation. | *"In academic literature, gustative designates of or relating to gustation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gustatory]] | adjective | **1.** Of or relating to gustation. | *"In academic literature, gustatory designates of or relating to gustation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[haemostat]] | noun | **1.** A surgical instrument that stops bleeding by clamping the blood vessel. | *"In academic literature, haemostat designates a surgical instrument that stops bleeding by clamping the blood vessel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hastate]] | adjective | **1.** (of a leaf shape) like a spear point, with flaring pointed lobes at the base. | *"In academic literature, hastate designates (of a leaf shape) like a spear point, with flaring pointed lobes at the base."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemostat]] | noun | **1.** A surgical instrument that stops bleeding by clamping the blood vessel. | *"In academic literature, hemostat designates a surgical instrument that stops bleeding by clamping the blood vessel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[misstate]] | verb | **1.** State something incorrectly. | *"Is the divine Principle of creation misstated?"* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[monistat]] | noun | **1.** An antifungal agent usually administered in the form of a nitrate (trade name monistat). | *"In academic literature, monistat designates an antifungal agent usually administered in the form of a nitrate (trade name monistat)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nystatin]] | noun | **1.** An antifungal and antibiotic (trade names mycostatin and nystan) discovered in new york state; derived from soil fungi actinomycetes. | *"In academic literature, nystatin designates an antifungal and antibiotic (trade names mycostatin and nystan) discovered in new york state; derived from soil fungi actinomycetes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prostate]] | noun | **1.** A firm partly muscular chestnut sized gland in males at the neck of the urethra; produces a viscid secretion that is the fluid part of semen.<br>**2.** Relating to the prostate gland. | *"My trouble was pronounced by some to be Bright's disease, by others gravel on the kidneys with very acute inflammation of the bladder and prostate gland."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[pyrostat]] | noun | **1.** A thermostat that operates at very high temperatures. | *"In academic literature, pyrostat designates a thermostat that operates at very high temperatures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[restate]] | verb | **1.** To say, state, or perform again. | *"Butler and Curtis, and in the arguments which came up upon points of testimony, that there remained little for the other counsel except to restate what had before been said."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[rheostat]] | noun | **1.** Resistor for regulating current. | *"This is done by making each crank operate a variable resistance or rheostat."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[stasis]] | noun | **1.** An abnormal state in which the normal flow of a liquid (such as blood) is slowed or stopped.<br>**2.** Inactivity resulting from a static balance between opposing forces. | *"In academic literature, stasis designates an abnormal state in which the normal flow of a liquid (such as blood) is slowed or stopped."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statant]] | adjective | **1.** Standing on four feet. | *"In academic literature, statant designates standing on four feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[state]] | noun | **1.** The territory occupied by one of the constituent administrative districts of a nation.<br>**2.** The way something is with respect to its main attributes. | *"When I perceive that men as plants increase, Cheered and checked even by the self-same sky: Vaunt in their youthful sap, at height decrease, And wear their brave state out of memory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stated]] | verb | **1.** Express in words.<br>**2.** Put before. | *"The old lady, becoming more and more incensed against the master of deportment as she dwelt upon the subject, gave me some particulars of his career, with strong assurances that they were mildly stated."* — Charles Dickens, *Bleak House* |
| [[stately]] | adjective | **1.** Impressive in appearance.<br>**2.** Of size and dignity suggestive of a statue. | *"Upon a wooden coffin we attend, And Death’s dishonourable victory We with our stately presence glorify, Like captives bound to a triumphant car."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stater]] | noun | **1.** Any of the various silver or gold coins of ancient greece.<br>**2.** A resident of a particular state or group of states. | *"In academic literature, stater designates any of the various silver or gold coins of ancient greece."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[static]] | noun | **1.** A crackling or hissing noise caused by electrical interference.<br>**2.** Angry criticism. | *"I, therefore, is a static theory in respect to the standard of deferred payments, and requires adjustment to apply to a condition of a changing price-level.] [Footnote 12: See above, sec. 3.] [Footnote 13: Mention was made in Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statice]] | noun | **1.** Any of various plants of the genus limonium of temperate salt marshes having spikes of white or mauve flowers. | *"A species with brown spores occurs on sea-lavender (_Statice_)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[statics]] | noun | **1.** The branch of mechanics concerned with forces in equilibrium.<br>**2.** A crackling or hissing noise caused by electrical interference. | *"In academic literature, statics designates the branch of mechanics concerned with forces in equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statin]] | noun | **1.** A medicine that lowers blood cholesterol levels by inhibiting hmg-coa reductase. | *"In academic literature, statin designates a medicine that lowers blood cholesterol levels by inhibiting hmg-coa reductase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[station]] | noun | **1.** A facility equipped with special equipment and personnel for a particular purpose.<br>**2.** Proper or designated social situation. | *"Her motion and her station are as one."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stations]] | noun | **1.** (roman catholic church) a devotion consisting of fourteen prayers said before a series of fourteen pictures or carvings representing successive incidents during jesus' passage from pilate's house to his crucifixion at calvary.<br>**2.** A facility equipped with special equipment and personnel for a particular purpose. | *"These railroads include an enormous aggregate of works and structures in the form of tunnels, cuts, banks, bridges, stations, and shops."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[stative]] | adjective | **1.** ( used of verbs (e.g. `be' or `own') and most participial adjectives) expressing existence or a state rather than an action. | *"In academic literature, stative designates ( used of verbs (e.g. `be' or `own') and most participial adjectives) expressing existence or a state rather than an action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stator]] | noun | **1.** Mechanical device consisting of the stationary part of a motor or generator in or around which the rotor revolves. | *"In academic literature, stator designates mechanical device consisting of the stationary part of a motor or generator in or around which the rotor revolves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statuary]] | noun | **1.** Statues collectively.<br>**2.** Of or relating to or suitable for statues. | *"The piece of dusky statuary nodded in approval, and then murmured ‘Motarkee!’ ‘Motarkee,’ said I, without further hesitation ‘Typee motarkee.’ What a transition!"* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[statue]] | noun | **1.** A sculpture representing a human or animal. | *"She shows a body rather than a life, A statue than a breather."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stature]] | noun | **1.** High level of respect gained by impressive development or achievement.<br>**2.** (of a standing person) the distance from head to foot. | *"Care I for the limb, the thews, the stature, bulk, and big assemblance of a man?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[status]] | noun | **1.** The relative position or standing of things or especially persons in a society.<br>**2.** A state at a particular time. | *"This status of semi-independence which it so long enjoyed has helped to give it an individuality more strongly marked than that of most English towns."* — John Cairns, *Principal Cairns* |
| [[statute]] | noun | **1.** An act passed by a legislative body.<br>**2.** Enacted by a legislative body. | *"The statute of thy beauty thou wilt take, Thou usurer that put’st forth all to use, And sue a friend, came debtor for my sake, So him I lose through my unkind abuse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[testate]] | noun | **1.** A person who makes a will.<br>**2.** Having made a legally valid will before death. | *"In academic literature, testate designates a person who makes a will."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[testator]] | noun | **1.** A person who makes a will. | *"It appears to be all in the testator’s handwriting."* — Charles Dickens, *Bleak House* |
| [[unstated]] | adjective | **1.** Not made explicit. | *"In academic literature, unstated designates not made explicit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[upstate]] | adverb | **1.** In or toward the northern parts of a state. | *"In academic literature, upstate designates in or toward the northern parts of a state."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · STAT_ STAS
  </div>
</div>
