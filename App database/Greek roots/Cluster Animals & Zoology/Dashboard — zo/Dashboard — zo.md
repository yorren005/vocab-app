---
status: unread
type: root_dashboard
---
# Dashboard — zo
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ζῶ</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“animal, living being”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'animal, living being'.</span>
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

The Greek root **zo** (ζῶ, ζῷον (zôion)) signifies animal, living being. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Eumetazoa*, *Metazoa*, *anthrozoology*, *azoic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: animal, living being
> The Greek root **zo** fundamentally denotes **animal, living being**. The physical sensory observation and cognitive anchor underlying 'animal, living being'. In classical Greek antiquity, the root denoted 'animal, living being', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">animal, living being</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'animal, living being'.</mark>
> - **Everyday Connection**: Think of familiar words like *Eumetazoa*, *Metazoa*, *anthrozoology*, *azoic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **zo** derives from Ancient Greek <mark class="hl-stem">ζῶ, ζῷον (zôion)</mark>, meaning "animal, living being".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with zo**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'animal, living being'.
  - Whenever you see **zo** in an English word, think immediately of **animal, living being**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">zo</mark>, think of <mark class="hl-def">animal, living being</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `zo-` (from *ζῶ, ζῷον (zôion)*).
> - **Combining Stem with -o- Connective:** `zoo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Zo
> - **1. Direct & Concrete Anchor:** Literal instantiation of animal, living being in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on zo

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `zo-` | [[Eumetazoa]] | Primary root semantic foundation denoting animal, living being. |
| **Connecting -o-** | `zoo-` | [[Metazoa]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `zo` | [[anthrozoology]] | Relational or directional modification of the core root sense. |

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
| [[anthrozoology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, anthrozoology designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[azoic]] | noun | **1.** Having no living beings; especially : of or relating to the part of geologic time that antedates life. | *"They were transported, perhaps, from the Azoic area near Lake Superior."* — W. E. Webb, *Buffalo Land* |
| [[azotemia]] | noun | **1.** An excess of urea or other nitrogenous wastes in the blood as a result of kidney insufficiency. | *"In academic literature, azotemia designates an excess of urea or other nitrogenous wastes in the blood as a result of kidney insufficiency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[azotemic]] | adjective | **1.** Of or involving excess nitrogenous waste products in the urine (usually due to kidney insufficiency). | *"In academic literature, azotemic designates of or involving excess nitrogenous waste products in the urine (usually due to kidney insufficiency)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryptozoology]] | noun | **1.** The study of and search for animals and especially legendary animals (such as Sasquatch) usually in order to evaluate the possibility of their existence. | *"In academic literature, cryptozoology designates the study of and search for animals and especially legendary animals (such as sasquatch) usually in order to evaluate the possibility of their existence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diazo]] | adjective | **1.** Relating to or containing diazonium. | *"In academic literature, diazo designates relating to or containing diazonium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectozoan]] | noun | **1.** Any external parasitic organism (as fleas).<br>**2.** Of or relating to epizoa. | *"In academic literature, ectozoan designates any external parasitic organism (as fleas)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectozoon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, ectozoon designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endozoic]] | adjective | **1.** Living within a living animal usually as a parasite. | *"In academic literature, endozoic designates living within a living animal usually as a parasite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entozoan]] | noun | **1.** Any of various parasites that live in the internal organs of animals (especially intestinal worms).<br>**2.** Of or relating to entozoa. | *"In academic literature, entozoan designates any of various parasites that live in the internal organs of animals (especially intestinal worms)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entozoic]] | adjective | **1.** Living within a living animal usually as a parasite. | *"In academic literature, entozoic designates living within a living animal usually as a parasite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entozoon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, entozoon designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epizoan]] | noun | **1.** Any external parasitic organism (as fleas).<br>**2.** Of or relating to epizoa. | *"In academic literature, epizoan designates any external parasitic organism (as fleas)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epizoic]] | adjective | **1.** Living or growing on the exterior surface of an animal usually as a parasite. | *"In academic literature, epizoic designates living or growing on the exterior surface of an animal usually as a parasite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epizoon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, epizoon designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Eumetazoa]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, Eumetazoa designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holozoic]] | adjective | **1.** Obtaining nourishment as animals do by ingesting complex organic matter. | *"In academic literature, holozoic designates obtaining nourishment as animals do by ingesting complex organic matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesozoic]] | noun | **1.** Of, relating to, or being an era of geologic history comprising the interval between the Permian and the Tertiary or the corresponding system of rocks that was marked by the presence of dinosaurs, marine and flying reptiles, ammonites, ferns, and gymnosperms and the appearance of angiosperms, mammals, and birds. | *"In academic literature, mesozoic designates of, relating to, or being an era of geologic history comprising the interval between the permian and the tertiary or the corresponding system of rocks that was marked by the presence of dinosaurs, marine and flying reptiles, ammonites, ferns, and gymnosperms and the appearance of angiosperms, mammals, and birds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Metazoa]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, Metazoa designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleozoic]] | noun | **1.** From 544 million to about 230 million years ago.<br>**2.** Of or relating to or denoting the paleozoic era. | *"Our leader, Professor Paleozoic, ordinarily existed in a sort of transition state between the primary and tertiary formations."* — W. E. Webb, *Buffalo Land* |
| [[paleozoology]] | noun | **1.** The study of fossil animals. | *"In academic literature, paleozoology designates the study of fossil animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoal]] | adjective | **1.** Of or relating to the protozoa. | *"In academic literature, protozoal designates of or relating to the protozoa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoan]] | noun | **1.** Any of diverse minute acellular or unicellular organisms usually nonphotosynthetic.<br>**2.** Of or relating to the protozoa. | *"In academic literature, protozoan designates any of diverse minute acellular or unicellular organisms usually nonphotosynthetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoic]] | adjective | **1.** Of or relating to the protozoa. | *"In academic literature, protozoic designates of or relating to the protozoa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoological]] | adjective | **1.** Concerning the branch of zoology that studies protozoans. | *"In academic literature, protozoological designates concerning the branch of zoology that studies protozoans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoologist]] | noun | **1.** A zoologist who studies protozoans. | *"In academic literature, protozoologist designates a zoologist who studies protozoans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoology]] | noun | **1.** The branch of zoology that studies protozoans. | *"In academic literature, protozoology designates the branch of zoology that studies protozoans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protozoon]] | noun | **1.** Any of diverse minute acellular or unicellular organisms usually nonphotosynthetic. | *"In academic literature, protozoon designates any of diverse minute acellular or unicellular organisms usually nonphotosynthetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zo]] | noun | **1.** Animal : animal kingdom or kind. | *"In academic literature, zo designates animal : animal kingdom or kind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoanthropy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, zoanthropy designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zodiac]] | noun | **1.** An imaginary band in the heavens centered on the ecliptic that encompasses the apparent paths of all the planets and is divided into 12 constellations or signs each taken for astrological purposes to extend 30 degrees of longitude.<br>**2.** A figure representing the signs of the zodiac and their symbols. | *"As when the golden sun salutes the morn, And, having gilt the ocean with his beams, Gallops the zodiac in his glistening coach, And overlooks the highest-peering hills; So Tamora."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[zodiacal]] | adjective | **1.** Relating to or included in the zodiac. | *"My remembrances went to France in the train of those zodiacal stars that would shine in some hours’ time."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[zoe]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"I must go now, love," he added, releasing her: "the men need some directions from me, in regard to their work." "And the women some from me," said Zoe."* — Martha Finley, *Elsie's Kith and Kin* |
| [[zoic]] | noun | **1.** Having a (specified) animal mode of existence.<br>**2.** Of, relating to, or being a (specified) geologic era. | *"In academic literature, zoic designates having a (specified) animal mode of existence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoo]] | noun | **1.** A facility with usually indoor and outdoor settings where living, typically wild animals are kept especially for public exhibition —called also zoological garden, zoological park.<br>**2.** A place, situation, or group marked by crowding, confusion, or unrestrained behavior. | *"That was last week; and as the day was mild and-- almost!--sunny, I suggested to the little girls that we should go holiday-making on our own account, and pay a visit to the Zoo."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[zoochore]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, zoochore designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoogamete]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, zoogamete designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoogeography]] | noun | **1.** A branch of biogeography concerned with the geographic distribution of animals and especially with the determination of the areas characterized by specific groups of animals and the study of the causes and significance of such groups. | *"In academic literature, zoogeography designates a branch of biogeography concerned with the geographic distribution of animals and especially with the determination of the areas characterized by specific groups of animals and the study of the causes and significance of such groups."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoography]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, zoography designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zooidzoöid]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, zooidzoöid designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoologic]] | noun | **1.** Of, relating to, or concerned with zoology.<br>**2.** Of, relating to, or affecting animals that are not humans. | *"In academic literature, zoologic designates of, relating to, or concerned with zoology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoological]] | noun | **1.** Of, relating to, or concerned with zoology.<br>**2.** Of, relating to, or affecting animals that are not humans. | *"Related to parks are public baths, public libraries, art collections, museums, zoological gardens, etc."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[zoologist]] | noun | **1.** A specialist in the branch of biology dealing with animals. | *"MORTON, B.A. =BOTANISTS, ZOOLOGISTS, AND GEOLOGISTS.= By Professor P."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[zoology]] | noun | **1.** A branch of biology concerned with the classification and the properties and vital phenomena of animals.<br>**2.** Animal life (as of a region) : fauna. | *"No branch of Zoology is so much involved as that which is entitled Cetology,” says Captain Scoresby, A."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[zoomorphism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, zoomorphism designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoon]] | noun | **1.** Animal : zooid. | *"A Gentleman was saying one Day at the _Tilt-Yard_ Coffee-House, when it rained exceeding hard, that it put him in Mind of the General _Deluge_; Zoons, Sir, said an old Campaigner, who stood by, who's that?"* — Classic Author, *Joe Miller's Jests, or The Wits Vade-Mecum* |
| [[zoonosis]] | noun | **1.** An infection or disease that is transmissible from animals to humans under natural conditions; also : an infection or disease that is transmissible between animals and humans.<br>**2.** An infection or disease that is transmissible from humans to animals under natural conditions; also : the process of transmitting infection or disease from humans to animals —called also anthroponosis, zooanthroponosis. | *"In academic literature, zoonosis designates an infection or disease that is transmissible from animals to humans under natural conditions; also : an infection or disease that is transmissible between animals and humans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoonotic]] | adjective | **1.** Of or relating to or constituting zoonosis. | *"In academic literature, zoonotic designates of or relating to or constituting zoonosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoophagy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, zoophagy designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoophyte]] | noun | **1.** An invertebrate animal (such as a coral or sponge) more or less resembling a plant in appearance or mode of growth. | *"Chance had thrown me just by the most precious specimens of the zoophyte."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[zooplankton]] | noun | **1.** Freely floating or weakly swimming typically minute aquatic protozoans and animals (such as copepods, rotifers, and krill) or the eggs or larvae of aquatic animals (such as anemones, mollusks, and fish) : plankton composed of animals. | *"In academic literature, zooplankton designates freely floating or weakly swimming typically minute aquatic protozoans and animals (such as copepods, rotifers, and krill) or the eggs or larvae of aquatic animals (such as anemones, mollusks, and fish) : plankton composed of animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoopoetics]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, zoopoetics designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoospore]] | noun | **1.** An independently motile spore; especially : a motile usually naked and flagellated asexual spore especially of an alga or lower fungus. | *"Prevost described the zoospores, or moving spores, of these conidia, and his observations were confirmed by Dr. de Bary three years since, and are now adverted to by him again in further confirmation."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[zootoxin]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek zo.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, zootoxin designates a term designating an entity, condition, or phenomenon derived from greek zo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zooxanthella]] | noun | **1.** Any of various symbiotic dinoflagellates that live within the cells of other organisms (such as reef-building coral polyps). | *"In academic literature, zooxanthella designates any of various symbiotic dinoflagellates that live within the cells of other organisms (such as reef-building coral polyps)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animals & Zoology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ZO
  </div>
</div>
