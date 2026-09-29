---
status: unread
type: root_dashboard
---
# Dashboard — pseud
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ψεύδω</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“false”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'false'.</span>
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

The Greek root **pseud** (ψεύδω, ψεῦδος (pseûdos)) signifies false. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *pseudonym*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: false
> The Greek root **pseud** fundamentally denotes **false**. The physical sensory observation and cognitive anchor underlying 'false'. In classical Greek antiquity, the root denoted 'false', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">false</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'false'.</mark>
> - **Everyday Connection**: Think of familiar words like *pseudonym*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pseud** derives from Ancient Greek <mark class="hl-stem">ψεύδω, ψεῦδος (pseûdos)</mark>, meaning "false".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with pseud**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'false'.
  - Whenever you see **pseud** in an English word, think immediately of **false**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pseud</mark>, think of <mark class="hl-def">false</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `pseud-` (from *ψεύδω, ψεῦδος (pseûdos)*).
> - **Combining Stem with -o- Connective:** `pseudo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Pseud
> - **1. Direct & Concrete Anchor:** Literal instantiation of false in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on pseud

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `pseud-` | [[pseudonym]] | Primary root semantic foundation denoting false. |
| **Connecting -o-** | `pseudo-` | [[pseud]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `pseud` | [[pseud]] | Relational or directional modification of the core root sense. |

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
| [[pseud]] | noun | **1.** A person who makes deceitful pretenses. | *"In academic literature, pseud designates a person who makes deceitful pretenses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudacris]] | noun | **1.** Chorus frogs. | *"In academic literature, pseudacris designates chorus frogs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudaletia]] | noun | **1.** Moths whose larvae are armyworms. | *"In academic literature, pseudaletia designates moths whose larvae are armyworms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudechis]] | noun | **1.** Venomous australian blacksnakes. | *"In academic literature, pseudechis designates venomous australian blacksnakes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudemys]] | noun | **1.** Sliders; red-bellied terrapin. | *"In academic literature, pseudemys designates sliders; red-bellied terrapin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudepigrapha]] | noun | **1.** 52 texts written between 200 bc and ad 200 but ascribed to various prophets and kings in the hebrew scriptures; many are apocalyptic in nature. | *"In academic literature, pseudepigrapha designates 52 texts written between 200 bc and ad 200 but ascribed to various prophets and kings in the hebrew scriptures; many are apocalyptic in nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudo]] | noun | **1.** A person who makes deceitful pretenses.<br>**2.** (often used in combination) not genuine but having the appearance of. | *"This is easily distinguishable from various forms of pseudo-saving of which many persons that are really spending all their incomes are very proud."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[pseudobombax]] | noun | **1.** Tropical american deciduous shrubs or small trees. | *"In academic literature, pseudobombax designates tropical american deciduous shrubs or small trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudobulb]] | noun | **1.** A solid bulblike enlargement of the stem of some orchids. | *"In academic literature, pseudobulb designates a solid bulblike enlargement of the stem of some orchids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudocarp]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek carp.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, pseudocarp designates a term designating an entity, condition, or phenomenon derived from greek carp."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudococcidae]] | noun | **1.** Scalelike insects: mealybugs. | *"In academic literature, pseudococcidae designates scalelike insects: mealybugs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudococcus]] | noun | **1.** Type genus of the pseudococcidae. | *"In academic literature, pseudococcus designates type genus of the pseudococcidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudocolus]] | noun | **1.** A genus of fungi belonging to the family clathraceae. | *"In academic literature, pseudocolus designates a genus of fungi belonging to the family clathraceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudocyesis]] | noun | **1.** Physiological state in which a woman exhibits symptoms of pregnancy but is not pregnant. | *"In academic literature, pseudocyesis designates physiological state in which a woman exhibits symptoms of pregnancy but is not pregnant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudoephedrine]] | noun | **1.** Poisonous crystalline alkaloid occurring with ephedrine and isomorphic with it. | *"In academic literature, pseudoephedrine designates poisonous crystalline alkaloid occurring with ephedrine and isomorphic with it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudohallucination]] | noun | **1.** An image vivid enough to be a hallucination but recognized as unreal. | *"In academic literature, pseudohallucination designates an image vivid enough to be a hallucination but recognized as unreal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudohermaphrodite]] | noun | **1.** Someone having external genitalia of one sex and internal sex organs of the other sex; not a true hermaphrodite because there is no ambiguity in the sex of the external genitalia and hence no question about gender at birth.<br>**2.** Having internal reproductive organs of one sex and external sexual characteristics of the other sex. | *"In academic literature, pseudohermaphrodite designates someone having external genitalia of one sex and internal sex organs of the other sex; not a true hermaphrodite because there is no ambiguity in the sex of the external genitalia and hence no question about gender at birth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudohermaphroditic]] | adjective | **1.** Having internal reproductive organs of one sex and external sexual characteristics of the other sex. | *"In academic literature, pseudohermaphroditic designates having internal reproductive organs of one sex and external sexual characteristics of the other sex."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudohermaphroditism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek aphrod.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, pseudohermaphroditism designates a term designating an entity, condition, or phenomenon derived from greek aphrod."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudolarix]] | noun | **1.** One species: golden larch. | *"In academic literature, pseudolarix designates one species: golden larch."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudomonad]] | noun | **1.** Bacteria usually producing greenish fluorescent water-soluble pigment; some pathogenic for plants and animals. | *"In academic literature, pseudomonad designates bacteria usually producing greenish fluorescent water-soluble pigment; some pathogenic for plants and animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudomonadales]] | noun | **1.** One of two usually recognized orders of true bacteria; gram-negative spiral or spherical or rod-shaped bacteria usually motile by polar flagella; some contain photosynthetic pigments. | *"In academic literature, pseudomonadales designates one of two usually recognized orders of true bacteria; gram-negative spiral or spherical or rod-shaped bacteria usually motile by polar flagella; some contain photosynthetic pigments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudomonas]] | noun | **1.** Type genus of the family pseudomonodaceae. | *"In academic literature, pseudomonas designates type genus of the family pseudomonodaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudomonodaceae]] | noun | **1.** Rod-shaped gram-negative bacteria; include important plant and animal pathogens. | *"In academic literature, pseudomonodaceae designates rod-shaped gram-negative bacteria; include important plant and animal pathogens."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudonym]] | noun | **1.** A fictitious name; especially : pen name.<br>**2.** Using a false name instead of one's real name. | *"Contemporary Rev., Sept., pp. 284-296, on ‘Balaustion’s Adventure’, by Matthew Browne (pseudonym). 1871."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[pseudonymous]] | noun | **1.** Bearing or using a fictitious name; also : being a pseudonym. | *"But to guide one's course aright, between the true myth and the depraved, to distinguish between the true and good god and the pseudonymous daemon, was no easy task."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[pseudoperipteral]] | adjective | **1.** Having columniation completely circling an area of the structure. | *"In academic literature, pseudoperipteral designates having columniation completely circling an area of the structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudophloem]] | noun | **1.** False phloem. | *"In academic literature, pseudophloem designates false phloem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudopleuronectes]] | noun | **1.** A genus of pleuronectidae. | *"In academic literature, pseudopleuronectes designates a genus of pleuronectidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudopod]] | noun | **1.** Pseudopodium. | *"In academic literature, pseudopod designates pseudopodium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudopodium]] | noun | **1.** Temporary outgrowth used by some microorganisms as an organ of feeding or locomotion. | *"In academic literature, pseudopodium designates temporary outgrowth used by some microorganisms as an organ of feeding or locomotion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudoprostyle]] | adjective | **1.** Marked by columniation having free columns in a portico only across the opening to the structure. | *"In academic literature, pseudoprostyle designates marked by columniation having free columns in a portico only across the opening to the structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudorubella]] | noun | **1.** A viral disease of infants and young children; characterized by abrupt high fever and mild sore throat; a few days later there is a faint pinkish rash that lasts for a few hours to a few days. | *"In academic literature, pseudorubella designates a viral disease of infants and young children; characterized by abrupt high fever and mild sore throat; a few days later there is a faint pinkish rash that lasts for a few hours to a few days."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudoryx]] | noun | **1.** Species of large cow-like mammals of vietnam discovered by scientists in 1992. | *"In academic literature, pseudoryx designates species of large cow-like mammals of vietnam discovered by scientists in 1992."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudoscience]] | noun | **1.** An activity resembling science but based on fallacious assumptions. | *"In academic literature, pseudoscience designates an activity resembling science but based on fallacious assumptions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudoscientific]] | adjective | **1.** Based on theories and methods erroneously regarded as scientific. | *"In academic literature, pseudoscientific designates based on theories and methods erroneously regarded as scientific."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudoscorpion]] | noun | **1.** Small nonvenomous arachnid resembling a tailless scorpion. | *"In academic literature, pseudoscorpion designates small nonvenomous arachnid resembling a tailless scorpion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudoscorpiones]] | noun | **1.** False scorpions. | *"In academic literature, pseudoscorpiones designates false scorpions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudoscorpionida]] | noun | **1.** False scorpions. | *"In academic literature, pseudoscorpionida designates false scorpions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudosmallpox]] | noun | **1.** A mild form of smallpox caused by a less virulent form of the virus. | *"In academic literature, pseudosmallpox designates a mild form of smallpox caused by a less virulent form of the virus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudotaxus]] | noun | **1.** One species. | *"In academic literature, pseudotaxus designates one species."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudotsuga]] | noun | **1.** Douglas fir; closely related to genera larix and cathaya. | *"In academic literature, pseudotsuga designates douglas fir; closely related to genera larix and cathaya."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudovariola]] | noun | **1.** A mild form of smallpox caused by a less virulent form of the virus. | *"In academic literature, pseudovariola designates a mild form of smallpox caused by a less virulent form of the virus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudowintera]] | noun | **1.** Evergreen shrubs or small trees of australia and new zealand. | *"In academic literature, pseudowintera designates evergreen shrubs or small trees of australia and new zealand."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PSEUD
  </div>
</div>
