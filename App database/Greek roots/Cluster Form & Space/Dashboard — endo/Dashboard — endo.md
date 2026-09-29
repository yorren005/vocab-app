---
status: unread
type: root_dashboard
---
# Dashboard — endo
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἔνδον (éndon)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“inside, within”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'inside, within'.</span>
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

The Greek root **endo** (ἔνδον (éndon)) signifies inside, within. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *endo*, *endocardial*, *endocerid*, *endocrine*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: inside, within
> The Greek root **endo** fundamentally denotes **inside, within**. The physical sensory observation and cognitive anchor underlying 'inside, within'. In classical Greek antiquity, the root denoted 'inside, within', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">inside, within</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'inside, within'.</mark>
> - **Everyday Connection**: Think of familiar words like *endo*, *endocardial*, *endocerid*, *endocrine*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **endo** derives from Ancient Greek <mark class="hl-stem">ἔνδον (éndon)</mark>, meaning "inside, within".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with endo**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'inside, within'.
  - Whenever you see **endo** in an English word, think immediately of **inside, within**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">endo</mark>, think of <mark class="hl-def">inside, within</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `endo-` (from *ἔνδον (éndon)*).
> - **Combining Stem with -o- Connective:** `endoo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Endo
> - **1. Direct & Concrete Anchor:** Literal instantiation of inside, within in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on endo

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `endo-` | [[endo]] | Primary root semantic foundation denoting inside, within. |
| **Connecting -o-** | `endoo-` | [[endocardial]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `endo` | [[endocerid]] | Relational or directional modification of the core root sense. |

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
| [[endo]] | noun | **1.** Within : inside. | *"In academic literature, endo designates within : inside."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocardial]] | noun | **1.** Situated within the heart.<br>**2.** Of or relating to the endocardium. | *"In academic literature, endocardial designates situated within the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocarditis]] | noun | **1.** Inflammation of the lining of the heart and its valves. | *"In academic literature, endocarditis designates inflammation of the lining of the heart and its valves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocardium]] | noun | **1.** A thin serous membrane lining the cavities of the heart. | *"In academic literature, endocardium designates a thin serous membrane lining the cavities of the heart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocarp]] | noun | **1.** The inner layer of the pericarp of a fruit (such as an apple or orange) when it consists of two or more layers of different texture or consistency. | *"In academic literature, endocarp designates the inner layer of the pericarp of a fruit (such as an apple or orange) when it consists of two or more layers of different texture or consistency."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocentric]] | adjective | **1.** Fulfilling the grammatical role of one of its constituents. | *"In academic literature, endocentric designates fulfilling the grammatical role of one of its constituents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocerid]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek endo.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, endocerid designates a term designating an entity, condition, or phenomenon derived from greek endo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocervicitis]] | noun | **1.** Inflammation of the mucous lining of the uterine cervix. | *"In academic literature, endocervicitis designates inflammation of the mucous lining of the uterine cervix."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocranium]] | noun | **1.** Membrane lining the inside of the skull. | *"In academic literature, endocranium designates membrane lining the inside of the skull."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocrinal]] | adjective | **1.** Of or belonging to endocrine glands or their secretions. | *"In academic literature, endocrinal designates of or belonging to endocrine glands or their secretions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocrine]] | noun | **1.** Secreting internally; specifically : producing secretions that are distributed in the body by way of the bloodstream.<br>**2.** Of, relating to, affecting, or resembling an endocrine gland or secretion. | *"In academic literature, endocrine designates secreting internally; specifically : producing secretions that are distributed in the body by way of the bloodstream."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocrinologist]] | noun | **1.** Physician who specializes in the diagnosis and treatment of conditions affecting the endocrine system. | *"In academic literature, endocrinologist designates physician who specializes in the diagnosis and treatment of conditions affecting the endocrine system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocrinology]] | noun | **1.** A branch of medicine concerned with the structure, function, and disorders of the endocrine glands. | *"In academic literature, endocrinology designates a branch of medicine concerned with the structure, function, and disorders of the endocrine glands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocytosis]] | noun | **1.** Incorporation of substances into a cell by phagocytosis or pinocytosis. | *"In academic literature, endocytosis designates incorporation of substances into a cell by phagocytosis or pinocytosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoergic]] | noun | **1.** Absorbing energy : endothermic. | *"In academic literature, endoergic designates absorbing energy : endothermic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endolymph]] | noun | **1.** The bodily fluid that fills the membranous labyrinth of the inner ear. | *"In academic literature, endolymph designates the bodily fluid that fills the membranous labyrinth of the inner ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endometrial]] | adjective | **1.** Of or relating to the endometrium. | *"In academic literature, endometrial designates of or relating to the endometrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endometriosis]] | noun | **1.** The presence of endometrium elsewhere than in the lining of the uterus; causes premenstrual pain and dysmenorrhea. | *"In academic literature, endometriosis designates the presence of endometrium elsewhere than in the lining of the uterus; causes premenstrual pain and dysmenorrhea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endometritis]] | noun | **1.** Inflammation of the lining of the uterus (of the endometrium). | *"In academic literature, endometritis designates inflammation of the lining of the uterus (of the endometrium)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endometrium]] | noun | **1.** (pregnancy) the mucous membrane that lines the uterus; thickens under hormonal control and (if pregnancy does not occur) is shed in menstruation; if pregnancy occurs it is shed along with the placenta at parturition. | *"In academic literature, endometrium designates (pregnancy) the mucous membrane that lines the uterus; thickens under hormonal control and (if pregnancy does not occur) is shed in menstruation; if pregnancy occurs it is shed along with the placenta at parturition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endomorph]] | noun | **1.** An endomorphic individual. | *"In academic literature, endomorph designates an endomorphic individual."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endomorphic]] | noun | **1.** Of or relating to the component in W. H. Sheldon's classification of body types that measures the massiveness of the digestive viscera and the body's degree of roundedness and softness.<br>**2.** Having a heavy rounded body build often with a marked tendency to become fat. | *"In academic literature, endomorphic designates of or relating to the component in w. h. sheldon's classification of body types that measures the massiveness of the digestive viscera and the body's degree of roundedness and softness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endomorphy]] | noun | **1.** Round, fat, and heavy. | *"In academic literature, endomorphy designates round, fat, and heavy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endomycetales]] | noun | **1.** Fungi having a zygote or a single cell developing directly into an ascus. | *"In academic literature, endomycetales designates fungi having a zygote or a single cell developing directly into an ascus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoneurium]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek neur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, endoneurium designates a term designating an entity, condition, or phenomenon derived from greek neur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endonuclease]] | noun | **1.** A nuclease that cleaves nucleic acids at interior bonds and so produces fragments of various sizes. | *"In academic literature, endonuclease designates a nuclease that cleaves nucleic acids at interior bonds and so produces fragments of various sizes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endorphin]] | noun | **1.** A neurochemical occurring naturally in the brain and having analgesic properties. | *"In academic literature, endorphin designates a neurochemical occurring naturally in the brain and having analgesic properties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endorse]] | verb | **1.** Be behind; approve of.<br>**2.** Give support or one's approval to. | *"By these passages it is plain that a sign or a wonder does not establish a doctrine or endorse a man as certainly being _from God_."* — Classic Author, *The wonders of prayer* |
| [[endorsement]] | noun | **1.** A promotional statement (as found on the dust jackets of books).<br>**2.** A speech seconding a motion. | *"Bank notes pass without endorsement and thus depend on the credit of the bank alone, not, like checks, on the credit of the person, from whom received."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[endorser]] | noun | **1.** Someone who expresses strong approval.<br>**2.** A person who transfers his ownership interest in something by signing a check or negotiable security. | *"I found a responsible endorser before me, and it was my purpose to hold him liable, and to bring him to his just responsibility without delay."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[endoscope]] | noun | **1.** An illuminated usually fiber-optic flexible or rigid tubular instrument for visualizing the interior of a hollow organ or part (such as the bladder or esophagus) for diagnostic or therapeutic purposes that typically has one or more channels to enable passage of instruments (such as forceps or scissors). | *"In academic literature, endoscope designates an illuminated usually fiber-optic flexible or rigid tubular instrument for visualizing the interior of a hollow organ or part (such as the bladder or esophagus) for diagnostic or therapeutic purposes that typically has one or more channels to enable passage of instruments (such as forceps or scissors)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscopic]] | noun | **1.** Of, relating to, or performed by means of an endoscope or endoscopy. | *"In academic literature, endoscopic designates of, relating to, or performed by means of an endoscope or endoscopy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoscopy]] | noun | **1.** An illuminated usually fiber-optic flexible or rigid tubular instrument for visualizing the interior of a hollow organ or part (such as the bladder or esophagus) for diagnostic or therapeutic purposes that typically has one or more channels to enable passage of instruments (such as forceps or scissors). | *"In academic literature, endoscopy designates an illuminated usually fiber-optic flexible or rigid tubular instrument for visualizing the interior of a hollow organ or part (such as the bladder or esophagus) for diagnostic or therapeutic purposes that typically has one or more channels to enable passage of instruments (such as forceps or scissors)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endoskeleton]] | noun | **1.** An internal skeleton or supporting framework in an animal. | *"In academic literature, endoskeleton designates an internal skeleton or supporting framework in an animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endosperm]] | noun | **1.** A nutritive tissue in the seed of a flowering plant that is formed within the embryo sac following double fertilization.<br>**2.** The triploid nucleus that is formed in the embryo sac of a flowering plant during double fertilization by fusion of a sperm cell with two polar nuclei and that gives rise to the nutritive endosperm. | *"In academic literature, endosperm designates a nutritive tissue in the seed of a flowering plant that is formed within the embryo sac following double fertilization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endospore]] | noun | **1.** An asexual spore developed within the cell especially in bacteria. | *"The spores of this species (_Uromyces appendiculatus_) are oboval cells, terminated by a rounded point, provided with a deep brown, smooth, _epispore_, or outer coating, and a distinct, but colourless _endospore_, or inner coating."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[endosteum]] | noun | **1.** The layer of vascular connective tissue lining the medullary cavities of bone. | *"In academic literature, endosteum designates the layer of vascular connective tissue lining the medullary cavities of bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endothelial]] | adjective | **1.** Of or relating to or located in the endothelium. | *"In academic literature, endothelial designates of or relating to or located in the endothelium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endothelium]] | noun | **1.** An epithelium of mesodermal origin composed of a single layer of thin flattened cells that lines internal body cavities and the lumens of vessels.<br>**2.** The inner layer of the seed coat of some plants. | *"In academic literature, endothelium designates an epithelium of mesodermal origin composed of a single layer of thin flattened cells that lines internal body cavities and the lumens of vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endothermal]] | adjective | **1.** (of a chemical reaction or compound) occurring or formed with absorption of heat. | *"In academic literature, endothermal designates (of a chemical reaction or compound) occurring or formed with absorption of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endothermic]] | noun | **1.** Characterized by or formed with absorption of heat.<br>**2.** Warm-blooded. | *"In academic literature, endothermic designates characterized by or formed with absorption of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endotoxin]] | noun | **1.** A toxin that is confined inside the microorganisms and is released only when the microorganisms are broken down or die. | *"In academic literature, endotoxin designates a toxin that is confined inside the microorganisms and is released only when the microorganisms are broken down or die."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · ENDO
  </div>
</div>
