---
status: unread
type: root_dashboard
---
# Dashboard — lith
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">λίθος (líthos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“stone”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'stone'.</span>
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

The Greek root **lith** (λίθος (líthos)) signifies stone. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *aerolithology*, *cholelithiasis*, *endolith*, *endolithic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: stone
> The Greek root **lith** fundamentally denotes **stone**. The physical sensory observation and cognitive anchor underlying 'stone'. In classical Greek antiquity, the root denoted 'stone', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">stone</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'stone'.</mark>
> - **Everyday Connection**: Think of familiar words like *aerolithology*, *cholelithiasis*, *endolith*, *endolithic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lith** derives from Ancient Greek <mark class="hl-stem">λίθος (líthos)</mark>, meaning "stone".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with lith**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'stone'.
  - Whenever you see **lith** in an English word, think immediately of **stone**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lith</mark>, think of <mark class="hl-def">stone</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `lith-` (from *λίθος (líthos)*).
> - **Combining Stem with -o- Connective:** `litho-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Lith
> - **1. Direct & Concrete Anchor:** Literal instantiation of stone in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on lith

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `lith-` | [[aerolithology]] | Primary root semantic foundation denoting stone. |
| **Connecting -o-** | `litho-` | [[cholelithiasis]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `lith` | [[endolith]] | Relational or directional modification of the core root sense. |

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
| [[aerolithology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lith.<br>**2.** Specialized application within the domain of Earth & Geology. | *"In academic literature, aerolithology designates a term designating an entity, condition, or phenomenon derived from greek lith."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cholelithiasis]] | noun | **1.** Production of gallstones; also : the resulting abnormal condition. | *"In academic literature, cholelithiasis designates production of gallstones; also : the resulting abnormal condition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endolith]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lith.<br>**2.** Specialized application within the domain of Earth & Geology. | *"In academic literature, endolith designates a term designating an entity, condition, or phenomenon derived from greek lith."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endolithic]] | noun | **1.** Living within or penetrating deeply into stony substances (such as rocks or coral). | *"In academic literature, endolithic designates living within or penetrating deeply into stony substances (such as rocks or coral)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epilithic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stone. | *"In academic literature, epilithic designates adjective*) pertaining to, derived from, or characteristic of stone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epipaleolithic]] | noun | **1.** Middle part of the stone age beginning about 15,000 years ago. | *"In academic literature, epipaleolithic designates middle part of the stone age beginning about 15,000 years ago."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lith]] | noun | **1.** Lithographic; lithography.<br>**2.** Structure or implement of stone. | *"In academic literature, lith designates lithographic; lithography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithagogue]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lith.<br>**2.** Specialized application within the domain of Earth & Geology. | *"In academic literature, lithagogue designates a term designating an entity, condition, or phenomenon derived from greek lith."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithane]] | noun | **1.** A white powder (lico3) used in manufacturing glass and ceramics and as a drug; the drug (trade names lithane or lithonate or eskalith) is used to treat some forms of depression and manic episodes of manic-depressive disorder. | *"In academic literature, lithane designates a white powder (lico3) used in manufacturing glass and ceramics and as a drug; the drug (trade names lithane or lithonate or eskalith) is used to treat some forms of depression and manic episodes of manic-depressive disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithe]] | adjective | **1.** Moving and bending with ease. | *"Krook therefore drives her out before him, and she goes furtively downstairs, winding her lithe tail and licking her lips."* — Charles Dickens, *Bleak House* |
| [[lithe-bodied]] | adjective | **1.** Having a lithe body. | *"In academic literature, lithe-bodied designates having a lithe body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[litheness]] | noun | **1.** The gracefulness of a person or animal that is flexible and supple. | *"In academic literature, litheness designates the gracefulness of a person or animal that is flexible and supple."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithesome]] | adjective | **1.** Moving and bending with ease. | *"In academic literature, lithesome designates moving and bending with ease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithiasis]] | noun | **1.** The formation of stones (calculi) in an internal organ. | *"In academic literature, lithiasis designates the formation of stones (calculi) in an internal organ."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stone. | *"In academic literature, lithic designates adjective*) pertaining to, derived from, or characteristic of stone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithium]] | noun | **1.** A soft silver-white univalent element of the alkali metal group; the lightest metal known; occurs in several minerals. | *"For instance, I have in one bottle an alcoholic solution of a lithium salt, in another of a barium, in a third of a strontium, and so on."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[lithocarpus]] | noun | **1.** Tanbark oaks. | *"In academic literature, lithocarpus designates tanbark oaks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithodidae]] | noun | **1.** Deep-sea crabs of cold waters. | *"In academic literature, lithodidae designates deep-sea crabs of cold waters."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithoglyptics]] | noun | **1.** The art of engraving on precious stones. | *"In academic literature, lithoglyptics designates the art of engraving on precious stones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithograph]] | noun | **1.** A print produced by lithography.<br>**2.** Duplicator that prints by lithography; a flat surface (of stone or metal) is treated to absorb or repel ink in the desired pattern. | *"The common seal of the Abbey, appendant to a deed, dated 1518, has been elegantly lithographed, as we read in the Monasticon, by the care of the Rev."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[lithographer]] | noun | **1.** A printmaker who uses lithography. | *"In academic literature, lithographer designates a printmaker who uses lithography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithographic]] | adjective | **1.** Of or produced by or involved in lithography. | *"In the same house there were also established, as I gathered from the plates on the door, a drawing-master, a coal-merchant (there was, certainly, no room for his coals), and a lithographic artist."* — Charles Dickens, *Bleak House* |
| [[lithography]] | noun | **1.** The process of printing from a plane surface (such as a smooth stone or metal plate) on which the image to be printed is ink-receptive and the blank area ink-repellent.<br>**2.** The process of producing patterns on semiconductor crystals for use as integrated circuits. | *"In academic literature, lithography designates the process of printing from a plane surface (such as a smooth stone or metal plate) on which the image to be printed is ink-receptive and the blank area ink-repellent."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithology]] | noun | **1.** The study of rocks.<br>**2.** The character of a rock formation; also : a rock formation having a particular set of characteristics. | *"In academic literature, lithology designates the study of rocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithomancer]] | noun | **1.** One who practices lithomancy. | *"In academic literature, lithomancer designates one who practices lithomancy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithomancy]] | noun | **1.** Divination by means of stones or stone talismans. | *"In academic literature, lithomancy designates divination by means of stones or stone talismans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithomantic]] | adjective | **1.** Of or relating to lithomancy. | *"In academic literature, lithomantic designates of or relating to lithomancy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithonate]] | noun | **1.** A white powder (lico3) used in manufacturing glass and ceramics and as a drug; the drug (trade names lithane or lithonate or eskalith) is used to treat some forms of depression and manic episodes of manic-depressive disorder. | *"In academic literature, lithonate designates a white powder (lico3) used in manufacturing glass and ceramics and as a drug; the drug (trade names lithane or lithonate or eskalith) is used to treat some forms of depression and manic episodes of manic-depressive disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithophile]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of stone. | *"In academic literature, lithophile designates adjective*) pertaining to, derived from, or characteristic of stone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithophone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lith.<br>**2.** Specialized application within the domain of Earth & Geology. | *"In academic literature, lithophone designates a term designating an entity, condition, or phenomenon derived from greek lith."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithophragma]] | noun | **1.** Small genus of perennial herbs of the western north america. | *"In academic literature, lithophragma designates small genus of perennial herbs of the western north america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithophyte]] | noun | **1.** A plant that grows on rock. | *"In academic literature, lithophyte designates a plant that grows on rock."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithophytic]] | adjective | **1.** Of or relating to lithophytes. | *"In academic literature, lithophytic designates of or relating to lithophytes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithops]] | noun | **1.** Any plant of the genus lithops native to africa having solitary yellow or white flowers and thick leaves that resemble stones. | *"In academic literature, lithops designates any plant of the genus lithops native to africa having solitary yellow or white flowers and thick leaves that resemble stones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithospermum]] | noun | **1.** Annual or perennial herbaceous or shrubby plants; cosmopolitan except australia. | *"In academic literature, lithospermum designates annual or perennial herbaceous or shrubby plants; cosmopolitan except australia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithosphere]] | noun | **1.** The solid part of a celestial body (such as the earth); specifically : the outer part of the solid earth composed of rock essentially like that exposed at the surface, consisting of the crust and outermost layer of the mantle, and usually considered to be about 60 miles (100 kilometers) in thickness. | *"In academic literature, lithosphere designates the solid part of a celestial body (such as the earth); specifically : the outer part of the solid earth composed of rock essentially like that exposed at the surface, consisting of the crust and outermost layer of the mantle, and usually considered to be about 60 miles (100 kilometers) in thickness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithotomy]] | noun | **1.** Surgical incision of the urinary bladder for removal of a stone. | *"In academic literature, lithotomy designates surgical incision of the urinary bladder for removal of a stone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithotripsy]] | noun | **1.** The breaking (as by shock waves or crushing with a surgical instrument) of a calculus in the urinary system into pieces small enough to be voided or washed out. | *"In academic literature, lithotripsy designates the breaking (as by shock waves or crushing with a surgical instrument) of a calculus in the urinary system into pieces small enough to be voided or washed out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithuania]] | noun | **1.** A republic in northeastern europe on the baltic sea. | *"In Russian Lithuania, on the first of May, they used to set up a green tree before the village."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[lithuanian]] | noun | **1.** A native or inhabitant of lithuania.<br>**2.** The official language of lithuania; belongs to the baltic branch of indo-european. | *"Thus the chief Lithuanian deity presents a close resemblance to Zeus and Jupiter, since he was the god of the oak, the thunder, and the rain."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[lithuresis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, lithuresis designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megalith]] | noun | **1.** A very large usually rough stone used in prehistoric cultures as a monument or building block. | *"In academic literature, megalith designates a very large usually rough stone used in prehistoric cultures as a monument or building block."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megalithic]] | adjective | **1.** Of or relating to megaliths or the people who erected megaliths. | *"In academic literature, megalithic designates of or relating to megaliths or the people who erected megaliths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mesolithic]] | noun | **1.** Middle part of the stone age beginning about 15,000 years ago.<br>**2.** Of or relating to a middle period of the stone age (following the paleolithic). | *"In academic literature, mesolithic designates middle part of the stone age beginning about 15,000 years ago."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microlite]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lith.<br>**2.** Specialized application within the domain of Earth & Geology. | *"In academic literature, microlite designates a term designating an entity, condition, or phenomenon derived from greek lith."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monolith]] | noun | **1.** A single great stone often in the form of an obelisk or column.<br>**2.** A massive structure. | *"The place took its name from a stone pillar which stood there, a strange rude monolith, from a stratum unknown in any local quarry, on which was roughly carved a human hand."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[monolithic]] | noun | **1.** Of, relating to, or resembling a monolith : huge, massive.<br>**2.** Formed from a single crystal. | *"In academic literature, monolithic designates of, relating to, or resembling a monolith : huge, massive."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neolith]] | noun | **1.** A stone tool from the neolithic age. | *"In academic literature, neolith designates a stone tool from the neolithic age."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neolithic]] | noun | **1.** Latest part of the stone age beginning about 10,000 bc in the middle east (but later elsewhere).<br>**2.** Of or relating to the most recent period of the stone age (following the mesolithic). | *"I have lived through the ages known to-day among the scientists as the Paleolithic, the Neolithic, and the Bronze."* — Jack London, *The Jacket (The Star-Rover)* |
| [[paleolith]] | noun | **1.** A stone tool from the paleolithic age. | *"In academic literature, paleolith designates a stone tool from the paleolithic age."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleolithic]] | noun | **1.** Second part of the stone age beginning about 750,00 to 500,000 years bc and lasting until the end of the last ice age about 8,500 years bc.<br>**2.** Of or relating to the second period of the stone age (following the eolithic). | *"I have lived through the ages known to-day among the scientists as the Paleolithic, the Neolithic, and the Bronze."* — Jack London, *The Jacket (The Star-Rover)* |
| [[paralithodes]] | noun | **1.** A genus of lithodidae. | *"In academic literature, paralithodes designates a genus of lithodidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phlebolith]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lith.<br>**2.** Specialized application within the domain of Earth & Geology. | *"In academic literature, phlebolith designates a term designating an entity, condition, or phenomenon derived from greek lith."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photolithography]] | noun | **1.** Lithography in which photographically prepared plates are used.<br>**2.** A process involving the photographic transfer of a pattern to a surface for etching (as in producing an integrated circuit). | *"In academic literature, photolithography designates lithography in which photographically prepared plates are used."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phytolith]] | noun | **1.** A microscopic siliceous particle that is formed by a plant and that is highly resistant to decomposition. | *"In academic literature, phytolith designates a microscopic siliceous particle that is formed by a plant and that is highly resistant to decomposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[regolith]] | noun | **1.** Unconsolidated residual or transported material that overlies the solid rock on the earth, moon, or a planet. | *"In academic literature, regolith designates unconsolidated residual or transported material that overlies the solid rock on the earth, moon, or a planet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sialolithiasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lith.<br>**2.** Specialized application within the domain of Earth & Geology. | *"In academic literature, sialolithiasis designates a term designating an entity, condition, or phenomenon derived from greek lith."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tonsillolith]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lith.<br>**2.** Specialized application within the domain of Earth & Geology. | *"In academic literature, tonsillolith designates a term designating an entity, condition, or phenomenon derived from greek lith."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urolithiasis]] | noun | **1.** A condition that is marked by the formation or presence of calculi in the urinary tract. | *"In academic literature, urolithiasis designates a condition that is marked by the formation or presence of calculi in the urinary tract."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Earth & Geology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LITH
  </div>
</div>
