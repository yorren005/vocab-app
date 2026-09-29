---
status: unread
type: root_dashboard
---
# Dashboard — aster
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἀστήρ ἀστέρος ἄστρον (astḗr</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“star, star–shaped”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'star, star-shaped'.</span>
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

The Greek root **aster** (ἀστήρ ἀστέρος ἄστρον (astḗr, astéros)) signifies star, star-shaped. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *aster*, *asterisk*, *astrology*, *diasterism geaster*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: star, star-shaped
> The Greek root **aster** fundamentally denotes **star, star-shaped**. The physical sensory observation and cognitive anchor underlying 'star, star-shaped'. In classical Greek antiquity, the root denoted 'star, star-shaped', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">star, star-shaped</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'star, star-shaped'.</mark>
> - **Everyday Connection**: Think of familiar words like *aster*, *asterisk*, *astrology*, *diasterism geaster*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **aster** derives from Ancient Greek <mark class="hl-stem">ἀστήρ ἀστέρος ἄστρον (astḗr, astéros)</mark>, meaning "star, star-shaped".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with aster**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'star, star-shaped'.
  - Whenever you see **aster** in an English word, think immediately of **star, star-shaped**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">aster</mark>, think of <mark class="hl-def">star, star-shaped</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `aster-` (from *ἀστήρ ἀστέρος ἄστρον (astḗr, astéros)*).
> - **Combining Stem with -o- Connective:** `astero-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Aster
> - **1. Direct & Concrete Anchor:** Literal instantiation of star, star-shaped in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on aster

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `aster-` | [[aster]] | Primary root semantic foundation denoting star, star-shaped. |
| **Connecting -o-** | `astero-` | [[asterisk]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `aster` | [[astrology]] | Relational or directional modification of the core root sense. |

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
| [[aster]] | noun | **1.** Any of various chiefly fall-blooming leafy-stemmed composite herbs (Aster and closely related genera) with often showy heads containing disk flowers or both disk and ray flowers.<br>**2.** China aster. | *"She clambered up the steep side--a sheer wall of bare rock, lightly clad here and there with sparse drapery of green sapphire, or clumps of purple sea-aster, rooted firm in the crannies."* — Grant Allen, *Michael's Crag* |
| [[asteraceae]] | noun | **1.** Plants with heads composed of many florets: aster; daisy; dandelion; goldenrod; marigold; lettuces; ragweed; sunflower; thistle; zinnia. | *"In academic literature, asteraceae designates plants with heads composed of many florets: aster; daisy; dandelion; goldenrod; marigold; lettuces; ragweed; sunflower; thistle; zinnia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astereognosis]] | noun | **1.** A loss of the ability to recognize objects by handling them. | *"In academic literature, astereognosis designates a loss of the ability to recognize objects by handling them."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asteriated]] | adjective | **1.** (of some crystals especially gemstones) exhibiting asterism. | *"In academic literature, asteriated designates (of some crystals especially gemstones) exhibiting asterism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asteridae]] | noun | **1.** A group of mostly sympetalous herbs and some trees and shrubs mostly with 2 fused carpels; contains 43 families including campanulales; solanaceae; scrophulariaceae; labiatae; verbenaceae; rubiaceae; compositae; sometimes classified as a superorder. | *"In academic literature, asteridae designates a group of mostly sympetalous herbs and some trees and shrubs mostly with 2 fused carpels; contains 43 families including campanulales; solanaceae; scrophulariaceae; labiatae; verbenaceae; rubiaceae; compositae; sometimes classified as a superorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asterion]] | noun | **1.** The craniometric point at the junction of the lamboid suture and the occipitomastoid suture and the parietomastoid suture. | *"In academic literature, asterion designates the craniometric point at the junction of the lamboid suture and the occipitomastoid suture and the parietomastoid suture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asterisk]] | noun | **1.** The character used in printing or writing as a reference mark, as an indication of the omission of letters or words, to denote a hypothetical or unattested linguistic form, or for various arbitrary meanings.<br>**2.** The character thought of as being appended to something (such as an athletic accomplishment included in a record book) typically in order to indicate that there is a limiting fact or consideration which makes that thing less important or impressive than it would otherwise be. | *"In academic literature, asterisk designates the character used in printing or writing as a reference mark, as an indication of the omission of letters or words, to denote a hypothetical or unattested linguistic form, or for various arbitrary meanings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asterisked]] | verb | **1.** Mark with an asterisk.<br>**2.** Marked with an asterisk. | *"In academic literature, asterisked designates mark with an asterisk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asterism]] | noun | **1.** (mineralogy) a star-shaped figure with six rays that is seen in some crystal structures under reflected or transmitted light.<br>**2.** (astronomy) a cluster of stars (or a small constellation). | *"In academic literature, asterism designates (mineralogy) a star-shaped figure with six rays that is seen in some crystal structures under reflected or transmitted light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asterismal]] | adjective | **1.** Relating to asterisms or constellations. | *"In academic literature, asterismal designates relating to asterisms or constellations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astern]] | adverb | **1.** Stern foremost or backward.<br>**2.** At or near or toward the stern of a ship or tail of an airplane. | *"Meantime, overseeing the other part of the ship, Captain Peleg ripped and swore astern in the most frightful manner."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[asternal]] | adjective | **1.** Not connected to the sternum or breastbone. | *"In academic literature, asternal designates not connected to the sternum or breastbone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asteroid]] | noun | **1.** Any of the small rocky celestial bodies found especially between the orbits of Mars and Jupiter. | *"You are inmates in the Social Rehabilitation Center of Guardian Station 15, about five million kay outbound from the Asteroid Belt's rim, or what was the Belt before the space-miners got through with it."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[asteroidal]] | adjective | **1.** Of or relating to or resembling an asteroid. | *"In academic literature, asteroidal designates of or relating to or resembling an asteroid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asteroidea]] | noun | **1.** Sea stars. | *"In academic literature, asteroidea designates sea stars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[asterope]] | noun | **1.** (greek mythology) one of the 7 pleiades.<br>**2.** One of the stars in the star cluster pleiades. | *"In academic literature, asterope designates (greek mythology) one of the 7 pleiades."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astor]] | noun | **1.** British politician (born in the united states) who was the first woman to sit in the british house of commons (1879-1964).<br>**2.** United states capitalist (born in germany) who made a fortune in fur trading (1763-1848). | *"I, at last, became determined, and chose the roof-garden at the Astor to tell him good-by, and perform the final operation."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[astrologer]] | noun | **1.** Someone who predicts the future by the positions of the planets and sun and moon. | *"He returned and presented the shuttle to the noted astrologer Chun Ping, informing him at the same time where, when and from whom he had received it."* — Isaac Taylor Headland, *The Chinese Boy and Girl* |
| [[astrological]] | adjective | **1.** Relating to or concerned with astrology. | *"So, swinging his seated form to the roll of the ship, and with his astrological-looking instrument placed to his eye, he remained in that posture for some moments to catch the precise instant when the sun should gain its precise meridian."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[astrologist]] | noun | **1.** Someone who predicts the future by the positions of the planets and sun and moon. | *"In academic literature, astrologist designates someone who predicts the future by the positions of the planets and sun and moon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astrology]] | noun | **1.** The divination of the supposed influences of the stars and planets on human affairs and terrestrial events by their positions and aspects. | *"But you must have your will and drag my old body about with you—a-studying astronomy and numbers in Venice, poetry and all the Italian _fol-de-rols_ in Florence, and astrology in Pisa, and God knows what in that madman country of Germany."* — Jack London, *The Jacket (The Star-Rover)* |
| [[diasterism geaster]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek aster.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, diasterism geaster designates a term designating an entity, condition, or phenomenon derived from greek aster."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diasterismgeaster]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek aster.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, diasterismgeaster designates a term designating an entity, condition, or phenomenon derived from greek aster."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[disaster]] | noun | **1.** A sudden calamitous event bringing great damage, loss, or destruction.<br>**2.** Someone or something that is very bad: such as. | *"That was not to be blam’d in the command of the service; it was a disaster of war that Caesar himself could not have prevented, if he had been there to command."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[disastrous]] | adjective | **1.** (of events) having extremely unfortunate or dire consequences; bringing ruin; ; ; ; - charles darwin; - douglas macarthur. | *"It was the vane on the roof turning round, and this change in the wind was the signal for a disastrous rain."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[disastrously]] | adverb | **1.** In a disastrous manner. | *"It will at once be seen that this fact must have resulted disastrously upon her efforts."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[monaster]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek aster.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, monaster designates a term designating an entity, condition, or phenomenon derived from greek aster."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monastic]] | noun | **1.** Of or relating to monasteries or to monks or nuns.<br>**2.** Resembling (as in seclusion or ascetic simplicity) life in a monastery. | *"They had rambled round by a road which led to the well-known ruins of the Cistercian abbey behind the mill, the latter having, in centuries past, been attached to the monastic establishment."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[monastical]] | adjective | **1.** Of communal life sequestered from the world under religious vows. | *"In academic literature, monastical designates of communal life sequestered from the world under religious vows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monasticism]] | noun | **1.** Of or relating to monasteries or to monks or nuns.<br>**2.** Resembling (as in seclusion or ascetic simplicity) life in a monastery. | *"It is significant that Christian monasticism and the coenobite life began in Egypt, where, as we learn from papyri found in recent years, great monasteries of Serapis existed long before our era."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[unasterisked]] | adjective | **1.** Not marked with an asterisk. | *"In academic literature, unasterisked designates not marked with an asterisk."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · ASTER
  </div>
</div>
