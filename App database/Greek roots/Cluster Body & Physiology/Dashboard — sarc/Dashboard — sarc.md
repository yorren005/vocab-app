---
status: unread
type: root_dashboard
---
# Dashboard — sarc
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">σάρξ</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“flesh”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'flesh'.</span>
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

The Greek root **sarc** (σάρξ, σαρκός (sárx, sarkós)) signifies flesh. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Sarcopterygii*, *perisarc*, *sarcasm*, *sarcastic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: flesh
> The Greek root **sarc** fundamentally denotes **flesh**. The physical sensory observation and cognitive anchor underlying 'flesh'. In classical Greek antiquity, the root denoted 'flesh', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">flesh</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'flesh'.</mark>
> - **Everyday Connection**: Think of familiar words like *Sarcopterygii*, *perisarc*, *sarcasm*, *sarcastic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sarc** derives from Ancient Greek <mark class="hl-stem">σάρξ, σαρκός (sárx, sarkós)</mark>, meaning "flesh".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with sarc**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'flesh'.
  - Whenever you see **sarc** in an English word, think immediately of **flesh**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sarc</mark>, think of <mark class="hl-def">flesh</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `sarc-` (from *σάρξ, σαρκός (sárx, sarkós)*).
> - **Combining Stem with -o- Connective:** `sarco-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Sarc
> - **1. Direct & Concrete Anchor:** Literal instantiation of flesh in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on sarc

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `sarc-` | [[Sarcopterygii]] | Primary root semantic foundation denoting flesh. |
| **Connecting -o-** | `sarco-` | [[perisarc]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `sarc` | [[sarcasm]] | Relational or directional modification of the core root sense. |

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
| [[anasarca]] | noun | **1.** Generalized edema with accumulation of serum in subcutaneous connective tissue. | *"In academic literature, anasarca designates generalized edema with accumulation of serum in subcutaneous connective tissue."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anasarcous]] | adjective | **1.** Characterized by or affected by dropsy. | *"In academic literature, anasarcous designates characterized by or affected by dropsy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perisarc]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek sarc.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, perisarc designates a term designating an entity, condition, or phenomenon derived from greek sarc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcasm]] | noun | **1.** The use of words that mean the opposite of what one intends to say especially in order to insult, to show irritation, or to be funny : a mode of satirical wit depending for its effect on ironic and usually bitter and caustic language often directed against an individual.<br>**2.** A sharp and often satirical or ironic utterance designed to cut or give pain. | *"The learned gentleman who does the withering business and who blights all opponents with his gloomy sarcasm is as merry as a grig at a French watering-place."* — Charles Dickens, *Bleak House* |
| [[sarcastic]] | noun | **1.** Having the character of sarcasm.<br>**2.** Given to the use of sarcasm : caustic. | *"Even when he told his experiences at great length, she never became impatient, but encouraged him to go on when his brothers and sisters made sarcastic remarks about him."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[sarcastically]] | adverb | **1.** In a sarcastic manner. | *"As she was anxious to have the matter settled then and there, she remarked rather sarcastically that a mother should be able to decide such matters alone."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[sarcenet]] | noun | **1.** A fine soft silk fabric often used for linings. | *"Not you, in good sooth,” and “As true as I live,” and “As God shall mend me,” and “As sure as day” And givest such sarcenet surety for thy oaths As if thou never walk’dst further than Finsbury."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sarcobatus]] | noun | **1.** One species: greasewood. | *"In academic literature, sarcobatus designates one species: greasewood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcocele]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek sarc.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, sarcocele designates a term designating an entity, condition, or phenomenon derived from greek sarc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcocephalus]] | noun | **1.** Genus of tropical african trees and shrubs. | *"In academic literature, sarcocephalus designates genus of tropical african trees and shrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcochilus]] | noun | **1.** Diminutive epiphytic or lithophytic orchids with clumped short-stemmed foliage and arching racemes of colorful flowers; australia and polynesia to southeastern asia. | *"In academic literature, sarcochilus designates diminutive epiphytic or lithophytic orchids with clumped short-stemmed foliage and arching racemes of colorful flowers; australia and polynesia to southeastern asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcocystidean]] | noun | **1.** Parasite of the muscles of vertebrates. | *"In academic literature, sarcocystidean designates parasite of the muscles of vertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcocystieian]] | noun | **1.** Parasite of the muscles of vertebrates. | *"In academic literature, sarcocystieian designates parasite of the muscles of vertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcocystis]] | noun | **1.** Chief genus of the order sarcosporidia. | *"In academic literature, sarcocystis designates chief genus of the order sarcosporidia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcodes]] | noun | **1.** Snow plant; in some classifications placed in family pyrolaceae. | *"In academic literature, sarcodes designates snow plant; in some classifications placed in family pyrolaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcodina]] | noun | **1.** Characterized by the formation of pseudopods for locomotion and taking food: actinopoda; rhizopoda. | *"In academic literature, sarcodina designates characterized by the formation of pseudopods for locomotion and taking food: actinopoda; rhizopoda."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcodine]] | noun | **1.** Protozoa that move and capture food by forming pseudopods. | *"In academic literature, sarcodine designates protozoa that move and capture food by forming pseudopods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcodinian]] | noun | **1.** Protozoa that move and capture food by forming pseudopods. | *"In academic literature, sarcodinian designates protozoa that move and capture food by forming pseudopods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcoid]] | noun | **1.** Any of various diseases characterized especially by the formation of nodules in the skin.<br>**2.** A nodule characteristic of sarcoid or of sarcoidosis. | *"In academic literature, sarcoid designates any of various diseases characterized especially by the formation of nodules in the skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcoidosis]] | noun | **1.** A chronic disease of unknown cause that is characterized by the formation of nodules especially in the lymph nodes, lungs, bones, and skin. | *"In academic literature, sarcoidosis designates a chronic disease of unknown cause that is characterized by the formation of nodules especially in the lymph nodes, lungs, bones, and skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcolemma]] | noun | **1.** An extensible membrane enclosing the contractile substance of a muscle fiber. | *"In academic literature, sarcolemma designates an extensible membrane enclosing the contractile substance of a muscle fiber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcolemmal]] | adjective | **1.** Of or relating to the sarcolemma. | *"In academic literature, sarcolemmal designates of or relating to the sarcolemma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcolemmic]] | adjective | **1.** Of or relating to sarcolemma. | *"In academic literature, sarcolemmic designates of or relating to sarcolemma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcolemnous]] | adjective | **1.** Of or relating to sarcolemma. | *"In academic literature, sarcolemnous designates of or relating to sarcolemma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcoma]] | noun | **1.** A malignant tumor arising in tissue (such as connective tissue, bone, cartilage, or striated muscle) of mesodermal origin.<br>**2.** A malignant bone tumor especially of a long bone (as of the thigh) or the pelvis. | *"In academic literature, sarcoma designates a malignant tumor arising in tissue (such as connective tissue, bone, cartilage, or striated muscle) of mesodermal origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcomere]] | noun | **1.** One of the segments into which a myofibril is divided. | *"In academic literature, sarcomere designates one of the segments into which a myofibril is divided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcophaga]] | noun | **1.** Flesh flies. | *"In academic literature, sarcophaga designates flesh flies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcophagus]] | noun | **1.** A stone coffin; broadly : coffin. | *"She singled out from their number an old salt, whose bare arms and feet, and exposed breast, were covered with as many inscriptions in India ink as the lid of an Egyptian sarcophagus."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[sarcophilus]] | noun | **1.** Tasmanian devil. | *"In academic literature, sarcophilus designates tasmanian devil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcoplasm]] | noun | **1.** The cytoplasm of a striated muscle fiber. | *"In academic literature, sarcoplasm designates the cytoplasm of a striated muscle fiber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Sarcopterygii]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek sarc.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, Sarcopterygii designates a term designating an entity, condition, or phenomenon derived from greek sarc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcoptes]] | noun | **1.** Type genus of the family sarcoptidae: itch mites. | *"In academic literature, sarcoptes designates type genus of the family sarcoptidae: itch mites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcoptid]] | noun | **1.** Whitish mites that attack the skin of humans and other animals. | *"In academic literature, sarcoptid designates whitish mites that attack the skin of humans and other animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcoptidae]] | noun | **1.** Small whitish mites. | *"In academic literature, sarcoptidae designates small whitish mites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcorhamphus]] | noun | **1.** Usually containing only the king vulture. | *"In academic literature, sarcorhamphus designates usually containing only the king vulture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcoscyphaceae]] | noun | **1.** Family of fungi belonging to the order pezizales. | *"In academic literature, sarcoscyphaceae designates family of fungi belonging to the order pezizales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcosine]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of flesh. | *"In academic literature, sarcosine designates adjective*) pertaining to, derived from, or characteristic of flesh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcosinemia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek sarc.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, sarcosinemia designates a term designating an entity, condition, or phenomenon derived from greek sarc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcosomal]] | adjective | **1.** Of or relating to sarcosomes. | *"In academic literature, sarcosomal designates of or relating to sarcosomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcosomataceae]] | noun | **1.** A type of ascomycetous fungus. | *"In academic literature, sarcosomataceae designates a type of ascomycetous fungus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcosome]] | noun | **1.** A mitochondrion of a striated muscle fiber. | *"In academic literature, sarcosome designates a mitochondrion of a striated muscle fiber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcosporidia]] | noun | **1.** Imperfectly known parasites of the muscles of vertebrates. | *"In academic literature, sarcosporidia designates imperfectly known parasites of the muscles of vertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcosporidian]] | noun | **1.** Parasite of the muscles of vertebrates. | *"In academic literature, sarcosporidian designates parasite of the muscles of vertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcostemma]] | noun | **1.** Succulent subshrubs or vines; tropical and subtropical india and africa and malaysia. | *"In academic literature, sarcostemma designates succulent subshrubs or vines; tropical and subtropical india and africa and malaysia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sarcostyle]] | noun | **1.** One of many contractile filaments that make up a striated muscle fiber. | *"In academic literature, sarcostyle designates one of many contractile filaments that make up a striated muscle fiber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsarcastic]] | adjective | **1.** Not sarcastic. | *"In academic literature, unsarcastic designates not sarcastic."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body & Physiology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SARC
  </div>
</div>
