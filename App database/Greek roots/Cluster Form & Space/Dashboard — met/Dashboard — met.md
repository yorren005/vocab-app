---
status: unread
type: root_dashboard
---
# Dashboard — met
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">μετά (metá)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“above, among, beyond”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'above, among, beyond'.</span>
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

The Greek root **met** (μετά (metá)) signifies above, among, beyond. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *met*, *metabolism*, *metalogic*, *metaphase*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: above, among, beyond
> The Greek root **met** fundamentally denotes **above, among, beyond**. The physical sensory observation and cognitive anchor underlying 'above, among, beyond'. In classical Greek antiquity, the root denoted 'above, among, beyond', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">above, among, beyond</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'above, among, beyond'.</mark>
> - **Everyday Connection**: Think of familiar words like *met*, *metabolism*, *metalogic*, *metaphase*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **met** derives from Ancient Greek <mark class="hl-stem">μετά (metá)</mark>, meaning "above, among, beyond".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with met**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'above, among, beyond'.
  - Whenever you see **met** in an English word, think immediately of **above, among, beyond**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">met</mark>, think of <mark class="hl-def">above, among, beyond</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `met-` (from *μετά (metá)*).
> - **Combining Stem with -o- Connective:** `meto-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Met
> - **1. Direct & Concrete Anchor:** Literal instantiation of above, among, beyond in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on met

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `met-` | [[met]] | Primary root semantic foundation denoting above, among, beyond. |
| **Connecting -o-** | `meto-` | [[metabolism]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `met` | [[metalogic]] | Relational or directional modification of the core root sense. |

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
| [[ametabolic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of throw. | *"In academic literature, ametabolic designates adjective*) pertaining to, derived from, or characteristic of throw."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ametabolous]] | adjective | **1.** Undergoing slight or no metamorphosis. | *"In academic literature, ametabolous designates undergoing slight or no metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emmet]] | noun | **1.** Social insect living in organized colonies; characteristically the males and fertile queen have wings during breeding season; wingless sterile females are the workers. | *"Robert Emmet was buried here by torchlight, wasn’t he?"* — James Joyce, *Ulysses* |
| [[hemimetabolic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of half. | *"In academic literature, hemimetabolic designates adjective*) pertaining to, derived from, or characteristic of half."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimetabolism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hemi.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, hemimetabolism designates a term designating an entity, condition, or phenomenon derived from greek hemi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimetabolous]] | adjective | **1.** (of an insect with aquatic young) undergoing incomplete metamorphosis in which the young does not resemble the adult. | *"In academic literature, hemimetabolous designates (of an insect with aquatic young) undergoing incomplete metamorphosis in which the young does not resemble the adult."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterometabolic]] | adjective | **1.** (of an insect) undergoing incomplete metamorphosis in which the nymph is essentially like the adult and there is no pupal stage. | *"In academic literature, heterometabolic designates (of an insect) undergoing incomplete metamorphosis in which the nymph is essentially like the adult and there is no pupal stage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterometabolism]] | noun | **1.** Development of insects with incomplete metamorphosis in which no pupal stage precedes maturity. | *"In academic literature, heterometabolism designates development of insects with incomplete metamorphosis in which no pupal stage precedes maturity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterometabolous]] | adjective | **1.** (of an insect) undergoing incomplete metamorphosis in which the nymph is essentially like the adult and there is no pupal stage. | *"In academic literature, heterometabolous designates (of an insect) undergoing incomplete metamorphosis in which the nymph is essentially like the adult and there is no pupal stage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holometabolic]] | adjective | **1.** (of an insect) undergoing complete metamorphosis. | *"In academic literature, holometabolic designates (of an insect) undergoing complete metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holometabolism]] | noun | **1.** Characterized by complete metamorphosis. | *"In academic literature, holometabolism designates characterized by complete metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holometabolous]] | adjective | **1.** (of an insect) undergoing complete metamorphosis. | *"In academic literature, holometabolous designates (of an insect) undergoing complete metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[met]] | noun | **1.** Meteorological; meteorology.<br>**2.** Metropolitan. | *"Madam, he’s gone to serve the Duke of Florence; We met him thitherward, for thence we came, And, after some despatch in hand at court, Thither we bend again."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metabolic]] | noun | **1.** Of, relating to, or based on metabolism.<br>**2.** A syndrome marked by the presence of usually three or more of a group of factors (such as high blood pressure, abdominal obesity, high triglyceride levels, low HDL levels, and high fasting levels of blood sugar) that are linked to increased risk of cardiovascular disease and type 2 diabetes —called also insulin resistance syndrome. | *"In academic literature, metabolic designates of, relating to, or based on metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metabolise]] | verb | **1.** Produce by metabolism. | *"In academic literature, metabolise designates produce by metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metabolism]] | noun | **1.** The sum of the processes in the buildup and destruction of protoplasm; specifically : the chemical changes in living cells by which energy is provided for vital processes and activities and new material is assimilated.<br>**2.** The sum of the processes by which a particular substance is handled in the living body. | *"In academic literature, metabolism designates the sum of the processes in the buildup and destruction of protoplasm; specifically : the chemical changes in living cells by which energy is provided for vital processes and activities and new material is assimilated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metabolize]] | noun | **1.** To subject to metabolism.<br>**2.** To perform metabolism. | *"In academic literature, metabolize designates to subject to metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metabolous]] | adjective | **1.** Undergoing metamorphosis. | *"In academic literature, metabolous designates undergoing metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metal]] | noun | **1.** Any of several chemical elements that are usually shiny solids that conduct heat or electricity and can be formed into sheets etc.<br>**2.** A mixture containing two or more metallic elements or metallic and nonmetallic elements usually fused together or dissolving into each other when molten. | *"That you were made of is metal to make virgins."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metalogic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of above, among, beyond. | *"In academic literature, metalogic designates adjective*) pertaining to, derived from, or characteristic of above, among, beyond."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metaphase]] | noun | **1.** The stage of mitosis and meiosis in which the chromosomes become arranged in the equatorial plane of the spindle.<br>**2.** A section in the equatorial plane of the metaphase spindle having the chromosomes oriented upon it. | *"In academic literature, metaphase designates the stage of mitosis and meiosis in which the chromosomes become arranged in the equatorial plane of the spindle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metaphysical]] | adjective | **1.** Pertaining to or of the nature of metaphysics.<br>**2.** Without material form or substance. | *"Hie thee hither, That I may pour my spirits in thine ear, And chastise with the valour of my tongue All that impedes thee from the golden round, Which fate and metaphysical aid doth seem To have thee crown’d withal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metaphysically]] | adverb | **1.** In a metaphysical manner. | *"To gain Christian Science and its 65:12 harmony, life should be more metaphysically regarded."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[metaphysics]] | noun | **1.** A division of philosophy that is concerned with the fundamental nature of reality and being and that includes ontology, cosmology, and often epistemology. | *"The class of Hamilton's that he attended in the session of 1838-39 was that of Advanced Metaphysics."* — John Cairns, *Principal Cairns* |
| [[meteor]] | noun | **1.** An atmospheric phenomenon (such as lightning or a snowfall).<br>**2.** Any of the small particles of matter in the solar system that are directly observable only by their incandescence from frictional heating on entry into the atmosphere. | *"I missed the meteor once and hit that woman, who cried out “Clubs!” when I might see from far some forty truncheoners draw to her succour, which were the hope o’ th’ Strand, where she was quartered."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[meteoric]] | adjective | **1.** Of or pertaining to atmospheric phenomena, especially weather and weather conditions.<br>**2.** Pertaining to or consisting of meteors or meteoroids. | *"Acknowledge with bowed head, joyous, thankful heart the successive, marvelous evidence of His triumphant power in the course of the hundred years elapsed since the last crowning act of His meteoric ministry."* — Effendi Shoghi, *Citadel of Faith* |
| [[meteoroid]] | noun | **1.** (astronomy) any of the small solid extraterrestrial bodies that hits the earth's atmosphere. | *"A convoy of robot deflectors and screens cleared the Extractor fleet's path of meteoroids, sand and rock swarms and space debris."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[meter]] | noun | **1.** Systematically arranged and measured rhythm in verse:.<br>**2.** Rhythm that continuously repeats a single basic pattern. | *"Five-meter high orange letters glowed brightly along its blunt bow and stern, and on each quarter sector of its exposed surface, proclaiming the huge cylinder as the UIPS SLINGSHOT LOGISTICS DEPOT."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[method]] | noun | **1.** A procedure or process for attaining an object: such as.<br>**2.** A systematic procedure, technique, or mode of inquiry employed by or proper to a particular discipline or art. | *"Madam, methinks, if you did love him dearly, You do not hold the method to enforce The like from him."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[methodical]] | adjective | **1.** Characterized by method and orderliness. | *"He comes towards them at his usual methodical pace, which is never quickened, never slackened."* — Charles Dickens, *Bleak House* |
| [[methodically]] | adverb | **1.** In a methodical manner. | *"Ain’t the lady the t’other lady?” Charley shook her head as she methodically drew his rags about him and made him as warm as she could."* — Charles Dickens, *Bleak House* |
| [[methodism]] | noun | **1.** The religious beliefs and practices of methodists characterized by concern with social welfare and public morals. | *"In his "Memorials of Methodism in Virginia," Dr."* — Classic Author, *The wonders of prayer* |
| [[methodist]] | noun | **1.** A follower of wesleyanism as practiced by the methodist church.<br>**2.** Of or pertaining to or characteristic of the branch of protestantism adhering to the views of wesley. | *"And what mid Methodist pa’sons have to do with she?” “Who is the fellow?” asked d’Urberville, turning to Tess."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[metic]] | noun | **1.** An alien who paid a fee to reside in an ancient greek city. | *"In academic literature, metic designates an alien who paid a fee to reside in an ancient greek city."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metical]] | noun | **1.** The basic unit of money in mozambique; equal to 100 centavos. | *"In academic literature, metical designates the basic unit of money in mozambique; equal to 100 centavos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometeor]] | noun | **1.** A meteorite or meteoroid so small that it drifts down to earth without becoming intensely heated in the atmosphere. | *"In academic literature, micrometeor designates a meteorite or meteoroid so small that it drifts down to earth without becoming intensely heated in the atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometeoric]] | adjective | **1.** Of or relating to micrometeorites. | *"In academic literature, micrometeoric designates of or relating to micrometeorites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unmethodical]] | adjective | **1.** Not efficient or methodical. | *"In academic literature, unmethodical designates not efficient or methodical."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · MET
  </div>
</div>
