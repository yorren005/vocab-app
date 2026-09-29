---
status: unread
type: root_dashboard
---
# Dashboard — poli
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">πόλις</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“city”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'city'.</span>
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

The Greek root **poli** (πόλις, πόλιος, πολίτης, πολιτικός (pólis, pólios, polítēs, politikós)) signifies city. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Decapolis*, *Tripoli*, *acropolis*, *biopolitics*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: city
> The Greek root **poli** fundamentally denotes **city**. The physical sensory observation and cognitive anchor underlying 'city'. In classical Greek antiquity, the root denoted 'city', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">city</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'city'.</mark>
> - **Everyday Connection**: Think of familiar words like *Decapolis*, *Tripoli*, *acropolis*, *biopolitics*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **poli** derives from Ancient Greek <mark class="hl-stem">πόλις, πόλιος, πολίτης, πολιτικός (pólis, pólios, polítēs, politikós)</mark>, meaning "city".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with poli**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'city'.
  - Whenever you see **poli** in an English word, think immediately of **city**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">poli</mark>, think of <mark class="hl-def">city</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `poli-` (from *πόλις, πόλιος, πολίτης, πολιτικός (pólis, pólios, polítēs, politikós)*).
> - **Combining Stem with -o- Connective:** `polio-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Poli
> - **1. Direct & Concrete Anchor:** Literal instantiation of city in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on poli

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `poli-` | [[Decapolis]] | Primary root semantic foundation denoting city. |
| **Connecting -o-** | `polio-` | [[Tripoli]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `poli` | [[acropolis]] | Relational or directional modification of the core root sense. |

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
| [[acropolis]] | noun | **1.** The upper fortified part of an ancient Greek city (such as Athens); also : a usually fortified height of a city or district elsewhere (as in Central America). | *"At an Athenian festival called Scira the priestess of Athena, the priest of Poseidon, and the priest of the Sun walked from the Acropolis under the shade of a huge white umbrella which was borne over their heads by the Eteobutads."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[apolitical]] | adjective | **1.** Politically neutral. | *"In academic literature, apolitical designates politically neutral."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biopolitics]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, biopolitics designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmopolis]] | noun | **1.** A cosmopolitan city. | *"In academic literature, cosmopolis designates a cosmopolitan city."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmopolitan]] | noun | **1.** Having wide international sophistication : worldly.<br>**2.** Composed of persons, constituents, or elements from all or many parts of the world. | *"I believe I am truly cosmopolitan."* — Charles Dickens, *Bleak House* |
| [[Decapolis]] | noun | **1.** Confederation of 10 ancient cities in northern Palestine in the region chiefly southeast of the Sea of Galilee. | *"In academic literature, Decapolis designates confederation of 10 ancient cities in northern palestine in the region chiefly southeast of the sea of galilee."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecumenopolis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, ecumenopolis designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eperopolis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, eperopolis designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geopolitical]] | adjective | **1.** Of or relating to geopolitics. | *"In academic literature, geopolitical designates of or relating to geopolitics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geopolitics]] | noun | **1.** A study of the influence of such factors as geography, economics, and demography on the politics and especially the foreign policy of a state.<br>**2.** A governmental policy guided by geopolitics. | *"In academic literature, geopolitics designates a study of the influence of such factors as geography, economics, and demography on the politics and especially the foreign policy of a state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heptapolis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, heptapolis designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hexapolis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, hexapolis designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isopolity]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, isopolity designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megalopolis]] | noun | **1.** A very large city.<br>**2.** A thickly populated region centering in a metropolis or embracing several metropolises. | *"In academic literature, megalopolis designates a very large city."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megapolis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, megapolis designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metropolis]] | noun | **1.** The chief or capital city of a country, state, or region.<br>**2.** The city or state of origin of a colony (as of ancient Greece). | *"The next is this: King John hath reconcil’d Himself to Rome; his spirit is come in, That so stood out against the holy church, The great metropolis and see of Rome."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metropolitan]] | noun | **1.** In the eastern orthodox church this title is given to a position between bishop and patriarch; equivalent to archbishop in western christianity.<br>**2.** A person who lives in a metropolis. | *"As watching is best done invisibly, she usually carried a dark lantern in her hand, and every now and then turned on the light to examine nooks and corners with the coolness of a metropolitan policeman."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[monopolisation]] | noun | **1.** Domination (of a market or commodity) to the exclusion of others. | *"In academic literature, monopolisation designates domination (of a market or commodity) to the exclusion of others."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopolise]] | verb | **1.** Have and control fully and exclusively.<br>**2.** Have or exploit a monopoly of. | *"Indeed more than foremost, for in the minds of many he monopolises the credit for this invention."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[monopoliser]] | noun | **1.** Someone who monopolizes the means of producing or selling something. | *"In academic literature, monopoliser designates someone who monopolizes the means of producing or selling something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopolist]] | noun | **1.** A person who monopolizes.<br>**2.** Opposing, prohibiting, or restricting monopolies. | *"In this case the privilege is socially earned by the monopolist; it is not gotten for nothing."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[monopolistic]] | adjective | **1.** Having exclusive control over a commercial activity by possession or legal grant. | *"Monopolistic aspect of organization and particular wages. § 14."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[neopolitan]] | noun | **1.** A resident of naples. | *"In academic literature, neopolitan designates a resident of naples."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pentapolis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"SIMONIDES, king of Pentapolis."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[poler]] | noun | **1.** A draft horse harnessed alongside the shaft or pole of a vehicle. | *"In academic literature, poler designates a draft horse harnessed alongside the shaft or pole of a vehicle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polianthes]] | noun | **1.** Genus of perennial tuberous herbs having lily-like flowers; mexico; sometimes placed in family amaryllidaceae. | *"In academic literature, polianthes designates genus of perennial tuberous herbs having lily-like flowers; mexico; sometimes placed in family amaryllidaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[police]] | noun | **1.** The department of government concerned primarily with maintenance of public order, safety, and health and enforcement of laws and possessing executive, judicial, and legislative powers.<br>**2.** The department of government charged with prevention, detection, and prosecution of public nuisances and crimes. | *"Snagsby descends and finds the two ’prentices intently contemplating a police constable, who holds a ragged boy by the arm."* — Charles Dickens, *Bleak House* |
| [[policeman]] | noun | **1.** A member of a police force. | *"The children tumbled about, and notched memoranda of their accidents in their legs, which were perfect little calendars of distress; and Peepy was lost for an hour and a half, and brought home from Newgate market by a policeman."* — Charles Dickens, *Bleak House* |
| [[policewoman]] | noun | **1.** A woman policeman. | *"In academic literature, policewoman designates a woman policeman."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[policy]] | noun | **1.** Prudence or wisdom in the management of affairs.<br>**2.** Management or procedure based primarily on material interest. | *"Thus policy in love t’ anticipate The ills that were not, grew to faults assured, And brought to medicine a healthful state Which rank of goodness would by ill be cured."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[policy-making]] | adjective | **1.** Concerned with policy, not administration. | *"In academic literature, policy-making designates concerned with policy, not administration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[policyholder]] | noun | **1.** A person who holds an insurance policy; usually, the client in whose name an insurance policy is written. | *"The mutual company legally belongs to the policyholders."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[polio]] | noun | **1.** An acute viral disease marked by inflammation of nerve cells of the brain stem and spinal cord. | *"In academic literature, polio designates an acute viral disease marked by inflammation of nerve cells of the brain stem and spinal cord."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[poliomyelitis]] | noun | **1.** polio. | *"Classical and authoritative lexicons catalog poliomyelitis as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polioptila]] | noun | **1.** New world gnatcatchers. | *"In academic literature, polioptila designates new world gnatcatchers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[poliosis]] | noun | **1.** The decrease or absence of melanin in head hair, eyebrows, or eyelashes. | *"In academic literature, poliosis designates the decrease or absence of melanin in head hair, eyebrows, or eyelashes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[poliovirus]] | noun | **1.** The virus causing poliomyelitis. | *"In academic literature, poliovirus designates the virus causing poliomyelitis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polis]] | noun | **1.** A Greek city-state; broadly : a state or society especially when characterized by a sense of community. | *"Don’t be all night before the polis in plain clothes sees us."* — James Joyce, *Ulysses* |
| [[polish]] | noun | **1.** The property of being smooth and shiny.<br>**2.** A highly developed state of perfection; having a flawless or impeccable quality; ; ; --joseph conrad. | *"O polish’d perturbation! golden care!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[polished]] | verb | **1.** Make (a surface) shine.<br>**2.** Improve or perfect by pruning or polishing. | *"I think good thoughts, whilst other write good words, And like unlettered clerk still cry Amen, To every hymn that able spirit affords, In polished form of well refined pen."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[polisher]] | noun | **1.** A power tool used to buff surfaces. | *"Your dean of studies holds he was a holy Roman. _Sufflaminandus sum._ —He was made in Germany, Stephen replied, as the champion French polisher of Italian scandals. —A myriadminded man, Mr Best reminded."* — James Joyce, *Ulysses* |
| [[polishing]] | noun | **1.** The work of making something smooth and shiny by rubbing or waxing it.<br>**2.** Make (a surface) shine. | *"She goes to Germany to-morrow with one of your nieces for a little polishing up in her education."* — Charles Dickens, *Bleak House* |
| [[polistes]] | noun | **1.** A genus of vespidae. | *"In academic literature, polistes designates a genus of vespidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[politburo]] | noun | **1.** The chief executive and political committee of the communist party. | *"In academic literature, politburo designates the chief executive and political committee of the communist party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polite]] | adjective | **1.** Showing regard for others in manners, speech, behavior, etc.<br>**2.** Marked by refinement in taste and manners. | *"The children had never known anybody who was so polite towards everyone, including Kathy, who only spoke affectionate, tender words, and always seemed so grateful when others were kind to her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[politeia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, politeia designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[politely]] | adverb | **1.** In a polite manner. | *"Apollonie, pouring the fragrant beverage into a large cup, politely invited Mr."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[politeness]] | noun | **1.** A courteous manner that respects accepted social usage.<br>**2.** The act of showing regard for others. | *"Out of pure politeness she answered a question somebody asked her."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[politesse]] | noun | **1.** Courtesy towards women. | *"The frank address, the soft caress, Are worse than poisoned darts of steel; The frank address, and politesse, Are all finesse in Rob Mossgiel."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[politic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of city. | *"It is not politic in the commonwealth of nature to preserve virginity."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[political]] | adjective | **1.** Involving or characteristic of politics or parties or politicians; - daniel goleman.<br>**2.** Of or relating to your views about social relationships involving authority or power. | *"Tulkinghorn’s policy and mastery to have no political opinions; indeed, NO opinions."* — Charles Dickens, *Bleak House* |
| [[politically]] | adverb | **1.** With regard to social relationships involving authority.<br>**2.** With regard to government. | *"Politically I am sceptical as to the virtue of their being old."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[politician]] | noun | **1.** A leader engaged in civil administration.<br>**2.** A person active in party politics. | *"This might be the pate of a politician which this ass now o’er-offices, one that would circumvent God, might it not?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[politicise]] | verb | **1.** Give a political character to. | *"In academic literature, politicise designates give a political character to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[politicize]] | noun | **1.** To give a political tone or character to. | *"In academic literature, politicize designates to give a political tone or character to."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[politick]] | verb | **1.** Engage in political activities. | *"I'le have your life you villain, You politick old Thief. _Char_."* — John Fletcher, *Beaumont and Fletcher's Works, Vol. 01 of 10: the Custom of the Country* |
| [[politico]] | noun | **1.** A person active in party politics. | *"Politico-economic problems. § 2."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[politics]] | noun | **1.** The art or science of government: such as.<br>**2.** The art or science concerned with guiding or influencing governmental policy. | *"Allen, after drinking his glass of water, joined some gentlemen to talk over the politics of the day and compare the accounts of their newspapers; and the ladies walked about together, noticing every new face, and almost every new bonnet in the room."* — Jane Austen, *Northanger Abbey* |
| [[politologist]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, politologist designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[politology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, politology designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[politonym]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, politonym designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polity]] | noun | **1.** Political organization.<br>**2.** A specific form of political organization. | *"Wise in his daily work was he: To fruits of diligence, And not to faiths or polity, He plied his utmost sense."* — George Eliot, *Middlemarch* |
| [[propolis]] | noun | **1.** A brownish resinous material of waxy consistency collected by bees from the buds of trees and used as a cement in repairing and maintaining the hive. | *"In academic literature, propolis designates a brownish resinous material of waxy consistency collected by bees from the buds of trees and used as a cement in repairing and maintaining the hive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tetrapolis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poli.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, tetrapolis designates a term designating an entity, condition, or phenomenon derived from greek poli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Tripoli]] | noun | **1.** An earth consisting of very friable soft schistose deposits of silica and including diatomite and kieselguhr.<br>**2.** An earth consisting of friable dustlike silica not of diatomaceous origin. | *"Sir, at the farthest for a week or two; But then up farther, and as far as Rome; And so to Tripoli, if God lend me life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[tripoli]] | noun | **1.** A weathered and decomposed siliceous limestone; in powdered form it is used in polishing.<br>**2.** The capital and chief port and largest city of libya; in northwestern libya on the mediterranean sea; founded by the phoenicians in the 7th century bc. | *"In academic literature, tripoli designates **1.** a weathered and decomposed siliceous limestone; in powdered form it is used in polishing.<br>**2.** the capital and chief port and largest city of libya; in northwestern libya on the mediterranean sea; founded by the phoenicians in the 7th century bc."* — Academic Lexicon |
| [[unpolished]] | adjective | **1.** Not carefully reworked or perfected or made smooth by polishing.<br>**2.** Lacking social polish. | *"SUFFOLK. ’Tis like the commons, rude unpolished hinds, Could send such message to their sovereign."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unpolitical]] | adjective | **1.** Politically neutral. | *"As was well known to me, Rome did not interfere with the religious notions of its conquered peoples; but the Jews were for ever confusing the issues and giving a political cast to purely unpolitical events."* — Jack London, *The Jacket (The Star-Rover)* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Society & Governance]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · POLI
  </div>
</div>
