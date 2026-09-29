---
status: unread
type: root_dashboard
---
# Dashboard — mer
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">μείρεσθαι μέρος (meíresthai)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“part”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'part'.</span>
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

The Greek root **mer** (μείρεσθαι μέρος (meíresthai)) signifies part. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Moirai*, *antimere*, *antimeria*, *biopolymer*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: part
> The Greek root **mer** fundamentally denotes **part**. The physical sensory observation and cognitive anchor underlying 'part'. In classical Greek antiquity, the root denoted 'part', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">part</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'part'.</mark>
> - **Everyday Connection**: Think of familiar words like *Moirai*, *antimere*, *antimeria*, *biopolymer*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **mer** derives from Ancient Greek <mark class="hl-stem">μείρεσθαι μέρος (meíresthai)</mark>, meaning "part".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with mer**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'part'.
  - Whenever you see **mer** in an English word, think immediately of **part**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">mer</mark>, think of <mark class="hl-def">part</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `mer-` (from *μείρεσθαι μέρος (meíresthai)*).
> - **Combining Stem with -o- Connective:** `mero-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Mer
> - **1. Direct & Concrete Anchor:** Literal instantiation of part in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on mer

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `mer-` | [[Moirai]] | Primary root semantic foundation denoting part. |
| **Connecting -o-** | `mero-` | [[antimere]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `mer` | [[antimeria]] | Relational or directional modification of the core root sense. |

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
| [[antimere]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, antimere designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimeria]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, antimeria designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biopolymer]] | noun | **1.** A polymeric substance (such as a protein or polysaccharide) formed in a biological system. | *"In academic literature, biopolymer designates a polymeric substance (such as a protein or polysaccharide) formed in a biological system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decamer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, decamer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decamerous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of part. | *"In academic literature, decamerous designates adjective*) pertaining to, derived from, or characteristic of part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dim]] | verb | **1.** Switch (a car's headlights) from a higher to a lower beam.<br>**2.** Become dim or lusterless. | *"Let not sloth dim your honours new-begot."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dimer]] | noun | **1.** A compound formed by the union of two radicals or two molecules of a simpler compound; specifically : a polymer formed from two molecules of a monomer. | *"In academic literature, dimer designates a compound formed by the union of two radicals or two molecules of a simpler compound; specifically : a polymer formed from two molecules of a monomer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dimeric]] | noun | **1.** A compound formed by the union of two radicals or two molecules of a simpler compound; specifically : a polymer formed from two molecules of a monomer. | *"In academic literature, dimeric designates a compound formed by the union of two radicals or two molecules of a simpler compound; specifically : a polymer formed from two molecules of a monomer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dimerism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, dimerism designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dimerous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of part. | *"In academic literature, dimerous designates adjective*) pertaining to, derived from, or characteristic of part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dimity]] | noun | **1.** A strong cotton fabric with a raised pattern; used for bedcovers and curtains. | *"In removing the light towards the bedstead its rays fell upon the tester of white dimity; something was hanging beneath it, and she lifted the candle to see what it was."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[dimly]] | adverb | **1.** In a dim indistinct manner.<br>**2.** In a manner lacking interest or vitality. | *"From tiers of staircase windows clogged lamps like the eyes of Equity, bleared Argus with a fathomless pocket for every eye and an eye upon it, dimly blink at the stars."* — Charles Dickens, *Bleak House* |
| [[dimness]] | noun | **1.** The state of being poorly illuminated.<br>**2.** The property of lights or sounds that lack brilliance or are reduced in intensity. | *"In the dimness it had not seemed so certain; now, gazing at each other in the clear light of the natural morning, we saw what had happened to us."* — Mrs. Oliphant, *A Beleaguered City* |
| [[emmer]] | noun | **1.** Hard red wheat grown especially in russia and germany; in united states as stock feed. | *"In academic literature, emmer designates hard red wheat grown especially in russia and germany; in united states as stock feed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enantiomer]] | noun | **1.** Either of a pair of chemical compounds whose molecular structures have a nonsuperimposable mirror-image relationship to each other. | *"In academic literature, enantiomer designates either of a pair of chemical compounds whose molecular structures have a nonsuperimposable mirror-image relationship to each other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enneamer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, enneamer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heptamer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, heptamer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterodimer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, heterodimer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterotetramer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, heterotetramer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hexamer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, hexamer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homodimer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, homodimer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homotetramer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, homotetramer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomer]] | noun | **1.** One of two or more compounds, radicals, or ions that contain the same number of atoms of the same elements but differ in structural arrangement and properties.<br>**2.** A nuclide isomeric with one or more others. | *"In academic literature, isomer designates one of two or more compounds, radicals, or ions that contain the same number of atoms of the same elements but differ in structural arrangement and properties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomeric]] | noun | **1.** Of, relating to, or exhibiting isomerism. | *"In academic literature, isomeric designates of, relating to, or exhibiting isomerism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomerisation]] | noun | **1.** The conversion of a compound into an isomer of itself. | *"In academic literature, isomerisation designates the conversion of a compound into an isomer of itself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomerise]] | verb | **1.** Cause to change into an isomer.<br>**2.** Change into an isomer. | *"In academic literature, isomerise designates cause to change into an isomer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomerism]] | noun | **1.** The relationship of two or more chemical species that are isomers.<br>**2.** The relation of two or more nuclides with the same mass numbers and atomic numbers but different energy states and rates of radioactive decay. | *"In academic literature, isomerism designates the relationship of two or more chemical species that are isomers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomerization]] | noun | **1.** The conversion of a compound into an isomer of itself. | *"In academic literature, isomerization designates the conversion of a compound into an isomer of itself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isomerize]] | verb | **1.** Cause to change into an isomer.<br>**2.** Change into an isomer. | *"In academic literature, isomerize designates cause to change into an isomer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mer]] | abbreviation | **1.** meridian.<br>**2.** member of a (specified) class. | *"Schwartz, _op. cit._ p. 71, No. 72. 3. [255] Karl Müllenhoff, _Sagen, Märchen und Lieder der Herzogthümer Holstein und Lauenburg_ (Kiel, 1845), pp. 158 _sg._, No. 217."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[mereology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, mereology designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merisis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, merisis designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[merism]] | noun | **1.** Possession of (such) an arrangement of or relation among constituent chemical units. | *"The error, mes- merism - or hypnotism, to use the recent term 402:24 - illustrates the fact just stated."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[meristem]] | noun | **1.** A formative plant tissue usually made up of small cells capable of dividing indefinitely and giving rise to similar cells or to cells that differentiate to produce the definitive tissues and organs.<br>**2.** A meristem at the apex of a root or shoot that is responsible for increase in length. | *"In academic literature, meristem designates a formative plant tissue usually made up of small cells capable of dividing indefinitely and giving rise to similar cells or to cells that differentiate to produce the definitive tissues and organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meristematic]] | noun | **1.** A formative plant tissue usually made up of small cells capable of dividing indefinitely and giving rise to similar cells or to cells that differentiate to produce the definitive tissues and organs. | *"In academic literature, meristematic designates a formative plant tissue usually made up of small cells capable of dividing indefinitely and giving rise to similar cells or to cells that differentiate to produce the definitive tissues and organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meristic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of part. | *"In academic literature, meristic designates adjective*) pertaining to, derived from, or characteristic of part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meromorphic]] | noun | **1.** Relating to or being a function of a complex variable that is analytic everywhere in a region except for singularities at each of which infinity is the limit and each of which is contained in a neighborhood where the function is analytic except for the singular point itself. | *"In academic literature, meromorphic designates relating to or being a function of a complex variable that is analytic everywhere in a region except for singularities at each of which infinity is the limit and each of which is contained in a neighborhood where the function is analytic except for the singular point itself."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meros]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, meros designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metamere]] | noun | **1.** Any of a linear series of primitively similar segments into which the body of a higher invertebrate or vertebrate is divisible. | *"In academic literature, metamere designates any of a linear series of primitively similar segments into which the body of a higher invertebrate or vertebrate is divisible."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metameric]] | adjective | **1.** Having the body divided into successive metameres or segments, as in earthworms or lobsters. | *"In academic literature, metameric designates having the body divided into successive metameres or segments, as in earthworms or lobsters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metamerism]] | noun | **1.** The condition of having or the stage of evolutionary development characterized by a body made up of metameres.<br>**2.** The identical visual appearance of two colors that have different physical or spectral compositions : the condition of being metameric in color. | *"In academic literature, metamerism designates the condition of having or the stage of evolutionary development characterized by a body made up of metameres."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Moirai]] | plural noun | **1.** fate. | *"Classical and authoritative lexicons catalog Moirai as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomer]] | noun | **1.** A chemical compound that can undergo polymerization. | *"In academic literature, monomer designates a chemical compound that can undergo polymerization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monomeric]] | noun | **1.** A chemical compound that can undergo polymerization. | *"In academic literature, monomeric designates a chemical compound that can undergo polymerization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octamer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, octamer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oligomer]] | noun | **1.** A polymer or polymer intermediate containing relatively few structural units. | *"In academic literature, oligomer designates a polymer or polymer intermediate containing relatively few structural units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oligomeric]] | noun | **1.** A polymer or polymer intermediate containing relatively few structural units. | *"In academic literature, oligomeric designates a polymer or polymer intermediate containing relatively few structural units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentamer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, pentamer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentamerous]] | noun | **1.** Divided into or consisting of five parts; specifically : having each floral whorl consisting of five or a multiple of five members. | *"In academic literature, pentamerous designates divided into or consisting of five parts; specifically : having each floral whorl consisting of five or a multiple of five members."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photopolymer]] | noun | **1.** A light-sensitive material that undergoes chemical and physical property changes when exposed to light (as UV or visible).<br>**2.** A light-sensitive polymer used especially in the manufacture of printing plates —often used before another noun. | *"In academic literature, photopolymer designates a light-sensitive material that undergoes chemical and physical property changes when exposed to light (as uv or visible)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytomer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, phytomer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymer]] | noun | **1.** A chemical compound or mixture of compounds formed by polymerization and consisting essentially of repeating structural units.<br>**2.** A substance (such as polystyrene) consisting of molecules that are large multiples of units of low molecular weight. | *"In academic literature, polymer designates a chemical compound or mixture of compounds formed by polymerization and consisting essentially of repeating structural units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymeric]] | adjective | **1.** Of or relating to or consisting of a polymer. | *"In academic literature, polymeric designates of or relating to or consisting of a polymer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymerisation]] | noun | **1.** A chemical process that combines several monomers to form a polymer or polymeric compound. | *"In academic literature, polymerisation designates a chemical process that combines several monomers to form a polymer or polymeric compound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymerise]] | verb | **1.** Cause (a compound) to polymerize.<br>**2.** Undergo polymerization. | *"In academic literature, polymerise designates cause (a compound) to polymerize."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymerization]] | noun | **1.** A chemical process that combines several monomers to form a polymer or polymeric compound. | *"In academic literature, polymerization designates a chemical process that combines several monomers to form a polymer or polymeric compound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymerize]] | verb | **1.** Cause (a compound) to polymerize.<br>**2.** Undergo polymerization. | *"In academic literature, polymerize designates cause (a compound) to polymerize."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tautomerism]] | noun | **1.** Isomerism in which the isomers change into one another with great ease so that they ordinarily exist together in equilibrium. | *"In academic literature, tautomerism designates isomerism in which the isomers change into one another with great ease so that they ordinarily exist together in equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telomer]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek mer.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"In academic literature, telomer designates a term designating an entity, condition, or phenomenon derived from greek mer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telomere]] | noun | **1.** The natural end of a eukaryotic chromosome composed of a usually repetitive DNA sequence and serving to stabilize the chromosome. | *"In academic literature, telomere designates the natural end of a eukaryotic chromosome composed of a usually repetitive dna sequence and serving to stabilize the chromosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetramer]] | noun | **1.** A molecule (such as an enzyme or a polymer) that consists of four structural subunits (such as peptide chains or condensed monomers). | *"In academic literature, tetramer designates a molecule (such as an enzyme or a polymer) that consists of four structural subunits (such as peptide chains or condensed monomers)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrameric]] | noun | **1.** A molecule (such as an enzyme or a polymer) that consists of four structural subunits (such as peptide chains or condensed monomers). | *"In academic literature, tetrameric designates a molecule (such as an enzyme or a polymer) that consists of four structural subunits (such as peptide chains or condensed monomers)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetramerous]] | adjective | **1.** Having or consisting of four similar parts; tetramerous flowers. | *"In academic literature, tetramerous designates having or consisting of four similar parts; tetramerous flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trim]] | noun | **1.** A state of arrangement or appearance.<br>**2.** A decoration or adornment on a garment. | *"A thousand, sir, Early though’t be, have on their riveted trim And at the port expect you. [_Shout."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[trimer]] | noun | **1.** A polymer formed from three molecules of a monomer. | *"In academic literature, trimer designates a polymer formed from three molecules of a monomer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trimerize]] | noun | **1.** Verb*) To subject to, transform by, or operate upon through part. | *"In academic literature, trimerize designates verb*) to subject to, transform by, or operate upon through part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trimly]] | adverb | **1.** In a trim manner. | *"It does so very busily and trimly, looks in again a little while, and so departs."* — Charles Dickens, *Bleak House* |
| [[trimness]] | noun | **1.** A state of arrangement or appearance. | *"In academic literature, trimness designates a state of arrangement or appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Art, Craft & Design]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MER
  </div>
</div>
