---
status: unread
type: root_dashboard
---
# Dashboard — arti
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἄρτιος ἀρτιότης ἀρτιάκις (ártios)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“even”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'even'.</span>
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

The Greek root **arti** (ἄρτιος ἀρτιότης ἀρτιάκις (ártios)) signifies even. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *arti*, *artiodactylous*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: even
> The Greek root **arti** fundamentally denotes **even**. The physical sensory observation and cognitive anchor underlying 'even'. In classical Greek antiquity, the root denoted 'even', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">even</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'even'.</mark>
> - **Everyday Connection**: Think of familiar words like *arti*, *artiodactylous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **arti** derives from Ancient Greek <mark class="hl-stem">ἄρτιος ἀρτιότης ἀρτιάκις (ártios)</mark>, meaning "even".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with arti**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'even'.
  - Whenever you see **arti** in an English word, think immediately of **even**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">arti</mark>, think of <mark class="hl-def">even</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `arti-` (from *ἄρτιος ἀρτιότης ἀρτιάκις (ártios)*).
> - **Combining Stem with -o- Connective:** `artio-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Arti
> - **1. Direct & Concrete Anchor:** Literal instantiation of even in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on arti

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `arti-` | [[arti]] | Primary root semantic foundation denoting even. |
| **Connecting -o-** | `artio-` | [[artiodactylous]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `arti` | [[arti]] | Relational or directional modification of the core root sense. |

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
| [[apart]] | adjective | **1.** Remote and separate physically or socially; ; - w.h.hudson.<br>**2.** Having characteristics not shared by others; - vannever bush. | *"I dare him therefore To lay his gay comparisons apart, And answer me declined, sword against sword, Ourselves alone."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[art]] | noun | **1.** The products of human creativity; works of art collectively.<br>**2.** The creation of beautiful or significant things. | *"Thou art thy mother’s glass and she in thee Calls back the lovely April of her prime, So thou through windows of thine age shalt see, Despite of wrinkles this thy golden time."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arti]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek arti.<br>**2.** Specialized application within the domain of Art, Craft & Design. | *"The picture referred to is ‘The Coronation of the Virgin’, in the ‘Accademia delle Belle Arti’, in Florence."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[artichoke]] | noun | **1.** Mediterranean thistlelike plant widely cultivated for its large edible flower head.<br>**2.** A thistlelike flower head with edible fleshy leaves and heart. | *"The interior looked like a white pasty, a sort of soft crumb, the flavour of which was like that of an artichoke."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[article]] | noun | **1.** Nonfictional prose forming an independent part of a publication.<br>**2.** One of a class of artifacts. | *"You have broken The article of your oath, which you shall never Have tongue to charge me with."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[articled]] | verb | **1.** Bind by a contract; especially for a training period.<br>**2.** Bound by contract. | *"Articled clerks have been in the habit of fleshing their legal wit upon it."* — Charles Dickens, *Bleak House* |
| [[articular]] | adjective | **1.** Relating to or affecting the joints of the body. | *"In academic literature, articular designates relating to or affecting the joints of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulary]] | adjective | **1.** Relating to or affecting the joints of the body. | *"In academic literature, articulary designates relating to or affecting the joints of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulate]] | verb | **1.** Provide with a joint.<br>**2.** Put into words or an expression. | *"Send us to Rome The best, with whom we may articulate For their own good and ours."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[articulated]] | verb | **1.** Provide with a joint.<br>**2.** Put into words or an expression. | *"Sir Clifford’s whale has been articulated throughout; so that, like a great chest of drawers, you can open and shut him, in all his bony cavities—spread out his ribs like a gigantic fan—and swing all day upon his lower jaw."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[articulately]] | adverb | **1.** With eloquence.<br>**2.** In an articulate manner. | *"In academic literature, articulately designates with eloquence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulateness]] | noun | **1.** The quality of being facile in speech and writing. | *"In academic literature, articulateness designates the quality of being facile in speech and writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulatio]] | noun | **1.** (anatomy) the point of connection between two bones or elements of a skeleton (especially if it allows motion). | *"In academic literature, articulatio designates (anatomy) the point of connection between two bones or elements of a skeleton (especially if it allows motion)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulation]] | noun | **1.** The aspect of pronunciation that involves bringing articulatory organs together so as to shape the sounds of speech.<br>**2.** The shape or manner in which things come together and a connection is made. | *"To savages generally is imputed a guttural articulation."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[articulative]] | adjective | **1.** Of or relating to articulation. | *"In academic literature, articulative designates of or relating to articulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulator]] | noun | **1.** Someone who pronounces words.<br>**2.** A movable speech organ. | *"In academic literature, articulator designates someone who pronounces words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[articulatory]] | adjective | **1.** Of or relating to articulation. | *"In academic literature, articulatory designates of or relating to articulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artillery]] | noun | **1.** Large but transportable armament.<br>**2.** An army unit that uses big guns. | *"I’ll to the Tower with all the haste I can To view th’ artillery and munition; And then I will proclaim young Henry king. [_Exit._] EXETER."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[artilleryman]] | noun | **1.** A serviceman in the artillery. | *"Bagnet is an ex-artilleryman, tall and upright, with shaggy eyebrows and whiskers like the fibres of a coco-nut, not a hair upon his head, and a torrid complexion."* — Charles Dickens, *Bleak House* |
| [[artiodactyl]] | noun | **1.** Any of an order (Artiodactyla) of ungulates (such as the camel or pig) with an even number of functional toes on each foot. | *"In academic literature, artiodactyl designates any of an order (artiodactyla) of ungulates (such as the camel or pig) with an even number of functional toes on each foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artiodactyla]] | noun | **1.** An order of hooved mammals of the subclass eutheria (including pigs and peccaries and hippopotami and members of the suborder ruminantia) having an even number of functional toes. | *"In academic literature, artiodactyla designates an order of hooved mammals of the subclass eutheria (including pigs and peccaries and hippopotami and members of the suborder ruminantia) having an even number of functional toes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artiodactylous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of even. | *"In academic literature, artiodactylous designates adjective*) pertaining to, derived from, or characteristic of even."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artisan]] | noun | **1.** A skilled worker who practices some trade or handicraft. | *"He appeared to be an artisan of some sort, and carried a tin pot of red paint in his hand."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[artist]] | noun | **1.** A person whose creative work shows sensitivity and imagination. | *"In framing an artist, art hath thus decreed, To make some good, but others to exceed; And you are her labour’d scholar."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[artiste]] | noun | **1.** A public performer (a dancer or singer). | *"In academic literature, artiste designates a public performer (a dancer or singer)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[artistic]] | adjective | **1.** Relating to or characteristic of art or artists.<br>**2.** Satisfying aesthetic standards and sensibilities. | *"There IS a way,” says Phil with a highly artistic turn of his brush; “what I’m a-doing at present.” “Whitewashing.” Phil nods."* — Charles Dickens, *Bleak House* |
| [[artistically]] | adverb | **1.** In an artistic manner. | *"Artistically he is perfectly beautiful in an Old-Testament fashion."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[artistry]] | noun | **1.** A superior skill that you can learn by study and practice and observation. | *"On all sides this was the verdict, one long-haired critic of international fame even claiming openly that Henshaw had not only equaled his former best work, but had gone beyond it, in both artistry and technique."* — Eleanor H. Porter, *Miss Billy — Married* |
| [[unarticulate]] | adjective | **1.** Without or deprived of the use of speech or words. | *"In academic literature, unarticulate designates without or deprived of the use of speech or words."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unarticulated]] | adjective | **1.** Not consisting of segments that are held together by joints.<br>**2.** Uttered without the use of normal words or syllables. | *"In academic literature, unarticulated designates not consisting of segments that are held together by joints."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unartistic]] | adjective | **1.** Lacking aesthetic sensibility. | *"In academic literature, unartistic designates lacking aesthetic sensibility."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · ARTI
  </div>
</div>
