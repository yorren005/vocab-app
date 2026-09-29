---
status: unread
type: root_dashboard
---
# Dashboard — cerat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">κέρας κέρατος (kéras)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“horn”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'horn'.</span>
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

The Greek root **cerat** (κέρας κέρατος (kéras)) signifies horn. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Triceratops*, *cerat*, *keratin*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: horn
> The Greek root **cerat** fundamentally denotes **horn**. The physical sensory observation and cognitive anchor underlying 'horn'. In classical Greek antiquity, the root denoted 'horn', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">horn</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'horn'.</mark>
> - **Everyday Connection**: Think of familiar words like *Triceratops*, *cerat*, *keratin*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cerat** derives from Ancient Greek <mark class="hl-stem">κέρας κέρατος (kéras)</mark>, meaning "horn".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with cerat**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'horn'.
  - Whenever you see **cerat** in an English word, think immediately of **horn**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cerat</mark>, think of <mark class="hl-def">horn</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `cerat-` (from *κέρας κέρατος (kéras)*).
> - **Combining Stem with -o- Connective:** `cerato-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Cerat
> - **1. Direct & Concrete Anchor:** Literal instantiation of horn in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on cerat

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `cerat-` | [[Triceratops]] | Primary root semantic foundation denoting horn. |
| **Connecting -o-** | `cerato-` | [[cerat]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `cerat` | [[keratin]] | Relational or directional modification of the core root sense. |

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
| [[acerate]] | adjective | **1.** Narrow and long and pointed; as pine leaves. | *"In academic literature, acerate designates narrow and long and pointed; as pine leaves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cerat]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cerat.<br>**2.** Specialized application within the domain of Time & Chronology. | *"In academic literature, cerat designates a term designating an entity, condition, or phenomenon derived from greek cerat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cerate]] | noun | **1.** A hard medicated paste made of lard or oil mixed with wax or resin. | *"In academic literature, cerate designates a hard medicated paste made of lard or oil mixed with wax or resin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratin]] | noun | **1.** A fibrous scleroprotein that occurs in the outer layer of the skin and in horny tissues such as hair, feathers, nails, and hooves. | *"In academic literature, ceratin designates a fibrous scleroprotein that occurs in the outer layer of the skin and in horny tissues such as hair, feathers, nails, and hooves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratitis]] | noun | **1.** Mediterranean fruit flies. | *"In academic literature, ceratitis designates mediterranean fruit flies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratodontidae]] | noun | **1.** Lungfishes having hornlike ridges on the teeth. | *"In academic literature, ceratodontidae designates lungfishes having hornlike ridges on the teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratodus]] | noun | **1.** Extinct lungfish. | *"In academic literature, ceratodus designates extinct lungfish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratonia]] | noun | **1.** Carobs. | *"Classical and authoritative lexicons catalog ceratonia as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratopetalum]] | noun | **1.** A dicotyledonous genus of the family cunoniaceae. | *"In academic literature, ceratopetalum designates a dicotyledonous genus of the family cunoniaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratophyllaceae]] | noun | **1.** Coextensive with the genus ceratophyllum: hornworts. | *"In academic literature, ceratophyllaceae designates coextensive with the genus ceratophyllum: hornworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratophyllum]] | noun | **1.** Constituting the family ceratophyllaceae: hornworts. | *"In academic literature, ceratophyllum designates constituting the family ceratophyllaceae: hornworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratopogon]] | noun | **1.** Type genus of the ceratopogonidae. | *"In academic literature, ceratopogon designates type genus of the ceratopogonidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratopogonidae]] | noun | **1.** Biting midges; sand flies. | *"In academic literature, ceratopogonidae designates biting midges; sand flies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratopsia]] | noun | **1.** Horned dinosaurs. | *"In academic literature, ceratopsia designates horned dinosaurs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratopsian]] | noun | **1.** Any of several four-footed herbivorous dinosaurs with enormous beaked skulls; of the late cretaceous in north america and mongolia. | *"In academic literature, ceratopsian designates any of several four-footed herbivorous dinosaurs with enormous beaked skulls; of the late cretaceous in north america and mongolia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratopsidae]] | noun | **1.** American ceratopsian dinosaurs. | *"In academic literature, ceratopsidae designates american ceratopsian dinosaurs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratopteris]] | noun | **1.** Water ferns. | *"In academic literature, ceratopteris designates water ferns."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratosaur]] | noun | **1.** Primitive medium-sized theropod; swift-running bipedal carnivorous dinosaur having grasping hands with sharp claws and a short horn between the nostrils; jurassic in north america. | *"In academic literature, ceratosaur designates primitive medium-sized theropod; swift-running bipedal carnivorous dinosaur having grasping hands with sharp claws and a short horn between the nostrils; jurassic in north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratosaurus]] | noun | **1.** Primitive medium-sized theropod; swift-running bipedal carnivorous dinosaur having grasping hands with sharp claws and a short horn between the nostrils; jurassic in north america. | *"In academic literature, ceratosaurus designates primitive medium-sized theropod; swift-running bipedal carnivorous dinosaur having grasping hands with sharp claws and a short horn between the nostrils; jurassic in north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratostomataceae]] | noun | **1.** Fungi having carbonous perithecia with long necks. | *"In academic literature, ceratostomataceae designates fungi having carbonous perithecia with long necks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratostomella]] | noun | **1.** Genus of fungi forming continuous hyaline spores. | *"In academic literature, ceratostomella designates genus of fungi forming continuous hyaline spores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratotherium]] | noun | **1.** African genus. | *"In academic literature, ceratotherium designates african genus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ceratozamia]] | noun | **1.** A small cycad of the genus ceratozamia having a short scaly woody trunk and fernlike foliage and woody cones; mexico. | *"In academic literature, ceratozamia designates a small cycad of the genus ceratozamia having a short scaly woody trunk and fernlike foliage and woody cones; mexico."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[keratin]] | noun | **1.** Any of various sulfur-containing, fibrous, acidic or basic proteins chiefly of epithelial cells and tissues that are relatively insoluble and resistant to degradation, form filaments which assemble into bundles to provide structural support, and are the primary component of hair, nails, horns, claws, hooves, quills, scales, feathers and the epidermal layer of skin. | *"In academic literature, keratin designates any of various sulfur-containing, fibrous, acidic or basic proteins chiefly of epithelial cells and tissues that are relatively insoluble and resistant to degradation, form filaments which assemble into bundles to provide structural support, and are the primary component of hair, nails, horns, claws, hooves, quills, scales, feathers and the epidermal layer of skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[keratinise]] | verb | **1.** Convert into keratin.<br>**2.** Become horny and impregnated with keratin. | *"In academic literature, keratinise designates convert into keratin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[keratinize]] | verb | **1.** Convert into keratin.<br>**2.** Become horny and impregnated with keratin. | *"In academic literature, keratinize designates convert into keratin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neoceratodus]] | noun | **1.** Extant australian lungfishes. | *"In academic literature, neoceratodus designates extant australian lungfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoceratops]] | noun | **1.** Small horned dinosaur. | *"In academic literature, protoceratops designates small horned dinosaur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Triceratops]] | noun | **1.** Any of a genus (Triceratops) of large herbivorous quadrupedal ceratopsian dinosaurs of the Late Cretaceous with three horns, a bony hood or crest on the neck, and hoofed toes. | *"In academic literature, Triceratops designates huge ceratopsian dinosaur having three horns and the neck heavily armored with a very solid frill."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[triceratops]] | noun | **1.** Huge ceratopsian dinosaur having three horns and the neck heavily armored with a very solid frill. | *"In academic literature, triceratops designates **1.** huge ceratopsian dinosaur having three horns and the neck heavily armored with a very solid frill."* — Academic Lexicon |

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
    ROOT DASHBOARD · CERAT
  </div>
</div>
