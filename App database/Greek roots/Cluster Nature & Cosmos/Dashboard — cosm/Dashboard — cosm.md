---
status: unread
type: root_dashboard
---
# Dashboard — cosm
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">κόσμος (kósmos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“universe”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'universe'.</span>
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

The Greek root **cosm** (κόσμος (kósmos)) signifies universe. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *cosm*, *cosmetic*, *cosmic*, *cosmicon*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: universe
> The Greek root **cosm** fundamentally denotes **universe**. The physical sensory observation and cognitive anchor underlying 'universe'. In classical Greek antiquity, the root denoted 'universe', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">universe</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'universe'.</mark>
> - **Everyday Connection**: Think of familiar words like *cosm*, *cosmetic*, *cosmic*, *cosmicon*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **cosm** derives from Ancient Greek <mark class="hl-stem">κόσμος (kósmos)</mark>, meaning "universe".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with cosm**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'universe'.
  - Whenever you see **cosm** in an English word, think immediately of **universe**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">cosm</mark>, think of <mark class="hl-def">universe</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `cosm-` (from *κόσμος (kósmos)*).
> - **Combining Stem with -o- Connective:** `cosmo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Cosm
> - **1. Direct & Concrete Anchor:** Literal instantiation of universe in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on cosm

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `cosm-` | [[cosm]] | Primary root semantic foundation denoting universe. |
| **Connecting -o-** | `cosmo-` | [[cosmetic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `cosm` | [[cosmic]] | Relational or directional modification of the core root sense. |

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
| [[cosm]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cosm.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, cosm designates a term designating an entity, condition, or phenomenon derived from greek cosm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmea]] | noun | **1.** Any of various mostly mexican herbs of the genus cosmos having radiate heads of variously colored flowers and pinnate leaves; popular fall-blooming annuals. | *"In academic literature, cosmea designates any of various mostly mexican herbs of the genus cosmos having radiate heads of variously colored flowers and pinnate leaves; popular fall-blooming annuals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmetic]] | noun | **1.** Of, relating to, or making for beauty especially of the complexion : beautifying.<br>**2.** Done or made for the sake of appearance: such as. | *"No wonder that in old times this sperm was such a favorite cosmetic."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[cosmetically]] | adverb | **1.** For cosmetic purposes to improve appearance. | *"In academic literature, cosmetically designates for cosmetic purposes to improve appearance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmetician]] | noun | **1.** Someone who sells or applies cosmetics.<br>**2.** Someone who works in a beauty parlor. | *"In academic literature, cosmetician designates someone who sells or applies cosmetics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmetologist]] | noun | **1.** A person licensed to provide cosmetic treatments to the hair, skin, and nails : one trained in cosmetology : beautician. | *"In academic literature, cosmetologist designates a person licensed to provide cosmetic treatments to the hair, skin, and nails : one trained in cosmetology : beautician."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmetology]] | noun | **1.** The cosmetic treatment of the skin, hair, and nails. | *"In academic literature, cosmetology designates the cosmetic treatment of the skin, hair, and nails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmic]] | noun | **1.** Of or relating to the cosmos, the extraterrestrial vastness, or the universe in contrast to the earth alone.<br>**2.** Of, relating to, or concerned with abstract spiritual or metaphysical ideas. | *"Nevertheless, thus clad, I trod interstellar space, exalted by the knowledge that I was bound on vast adventure, where, at the end, I would find all the cosmic formulæ and have made clear to me the ultimate secret of the universe."* — Jack London, *The Jacket (The Star-Rover)* |
| [[cosmicon]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cosm.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, cosmicon designates a term designating an entity, condition, or phenomenon derived from greek cosm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmid]] | noun | **1.** (genetics) a large vector that is made from a bacteriophage and used to clone genes or gene fragments. | *"In academic literature, cosmid designates (genetics) a large vector that is made from a bacteriophage and used to clone genes or gene fragments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmocampus]] | noun | **1.** A genus of fish in the family syngnathidae. | *"In academic literature, cosmocampus designates a genus of fish in the family syngnathidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmogenic]] | adjective | **1.** Pertaining to the branch of astronomy dealing with the origin and history and structure and dynamics of the universe. | *"In academic literature, cosmogenic designates pertaining to the branch of astronomy dealing with the origin and history and structure and dynamics of the universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmogeny]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek cosm.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, cosmogeny designates a term designating an entity, condition, or phenomenon derived from greek cosm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmogonic]] | adjective | **1.** Pertaining to the branch of astronomy dealing with the origin and history and structure and dynamics of the universe. | *"In academic literature, cosmogonic designates pertaining to the branch of astronomy dealing with the origin and history and structure and dynamics of the universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmogonical]] | adjective | **1.** Pertaining to the branch of astronomy dealing with the origin and history and structure and dynamics of the universe. | *"In academic literature, cosmogonical designates pertaining to the branch of astronomy dealing with the origin and history and structure and dynamics of the universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmogony]] | noun | **1.** A theory of the origin of the universe.<br>**2.** The creation or origin of the world or universe. | *"Indeed in the Phrygian cosmogony an almond figured as the father of all things, perhaps because its delicate lilac blossom is one of the first heralds of the spring, appearing on the bare boughs before the leaves have opened."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[cosmographer]] | noun | **1.** A scientist knowledgeable about cosmography. | *"In academic literature, cosmographer designates a scientist knowledgeable about cosmography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmographist]] | noun | **1.** A scientist knowledgeable about cosmography. | *"In academic literature, cosmographist designates a scientist knowledgeable about cosmography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmography]] | noun | **1.** The science that maps the general features of the universe; describes both heaven and earth (but without encroaching on geography or astronomy).<br>**2.** A representation of the earth or the heavens. | *"In academic literature, cosmography designates the science that maps the general features of the universe; describes both heaven and earth (but without encroaching on geography or astronomy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmolatry]] | noun | **1.** The worship of the cosmos. | *"In academic literature, cosmolatry designates the worship of the cosmos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmologic]] | adjective | **1.** Pertaining to the branch of astronomy dealing with the origin and history and structure and dynamics of the universe.<br>**2.** Pertaining to the branch of philosophy dealing with the elements and laws and especially the characteristics of the universe such as space and time and causality. | *"In academic literature, cosmologic designates pertaining to the branch of astronomy dealing with the origin and history and structure and dynamics of the universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmological]] | adjective | **1.** Pertaining to the branch of astronomy dealing with the origin and history and structure and dynamics of the universe.<br>**2.** Pertaining to the branch of philosophy dealing with the elements and laws and especially the characteristics of the universe such as space and time and causality. | *"He does not, like Clement and other Greeks, revel in cosmological speculations as to the Logos, nor does he loosely adopt the abstract methods of later Greek philosophy."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[cosmologist]] | noun | **1.** An astronomer who studies the evolution and space-time relations of the universe. | *"In academic literature, cosmologist designates an astronomer who studies the evolution and space-time relations of the universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmology]] | noun | **1.** A branch of metaphysics that deals with the nature of the universe.<br>**2.** A theory or doctrine describing the natural order of the universe. | *"In academic literature, cosmology designates a branch of metaphysics that deals with the nature of the universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmonaut]] | noun | **1.** An astronaut of the Soviet or Russian space program. | *"In academic literature, cosmonaut designates an astronaut of the soviet or russian space program."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cosmopolitan]] | noun | **1.** Having wide international sophistication : worldly.<br>**2.** Composed of persons, constituents, or elements from all or many parts of the world. | *"I believe I am truly cosmopolitan."* — Charles Dickens, *Bleak House* |
| [[cosmopolite]] | noun | **1.** A sophisticated, widely traveled person : a cosmopolitan person.<br>**2.** An organism found in most parts of the world and under varied ecological conditions : a cosmopolitan organism. | *"Francis, the Great Cosmopolite Equestrian and Roughrider, would enact the part of Turpin, and she was not yet too old and careworn to be without a little curiosity to see him."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[cosmos]] | noun | **1.** universe.<br>**2.** an orderly harmonious systematic universe. | *"With all the humour and charm there is in Plato, we cannot escape his tremendous teaching on the age-long consequences of good and evil in a cosmos ordered by God."* — T. R. Glover, *The Jesus of History* |
| [[cosmotron]] | noun | **1.** A large proton synchrotron; uses frequency modulation of an electric field to accelerate protons. | *"In academic literature, cosmotron designates a large proton synchrotron; uses frequency modulation of an electric field to accelerate protons."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrocosm]] | noun | **1.** The great world : universe.<br>**2.** A complex that is a large-scale reproduction of one of its constituents. | *"He affirmed his significance as a conscious rational animal proceeding syllogistically from the known to the unknown and a conscious rational reagent between a micro and a macrocosm ineluctably constructed upon the incertitude of the void."* — James Joyce, *Ulysses* |
| [[macrocosmic]] | adjective | **1.** Relating to or constituting a macrocosm. | *"In academic literature, macrocosmic designates relating to or constituting a macrocosm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcosm]] | noun | **1.** A little world; especially : the human race or human nature seen as an epitome of the world or the universe.<br>**2.** A community or other unity that is an epitome of a larger unity. | *"If you see this in the map of my microcosm, follows it that I am known well enough too?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[microcosmic]] | adjective | **1.** Relating to or characteristic of a microcosm. | *"In academic literature, microcosmic designates relating to or characteristic of a microcosm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paracosm]] | noun | **1.** A prolonged fantasy world invented by children; can have a definite geography and language and history. | *"In academic literature, paracosm designates a prolonged fantasy world invented by children; can have a definite geography and language and history."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Nature & Cosmos]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · COSM
  </div>
</div>
