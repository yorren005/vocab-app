---
status: unread
type: root_dashboard
---
# Dashboard — crat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">κράτος (krátos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“power / rule / authority / dominion”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The gripping hand of sovereign force asserting command and governance over an assembly or state.</span>
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

The Greek root **crat** (κράτος (krátos)) signifies power / rule / authority / dominion. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *acrasia*, *akrasia*, *akratic*, *anocracy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: power / rule / authority / dominion
> The Greek root **crat** fundamentally denotes **power / rule / authority / dominion**. The gripping hand of sovereign force asserting command and governance over an assembly or state. In classical political theory, kratos described sovereign dominion, forming compound constitutional regimes: demokratia (rule by the people), aristokratia (rule by the best), and oligarchia.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">power / rule / authority / dominion</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The gripping hand of sovereign force asserting command and governance over an assembly or state.</mark>
> - **Everyday Connection**: Think of familiar words like *acrasia*, *akrasia*, *akratic*, *anocracy*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **crat** derives from Ancient Greek <mark class="hl-stem">κράτος (krátos)</mark>, meaning "power / rule / authority / dominion".
  - Reconstructed Indo-European origin: ***kret- ("hard, heavy, strong, power")**.

- **The Big Picture Idea**:
  - The gripping hand of sovereign force asserting command and governance over an assembly or state.
  - Whenever you see **crat** in an English word, think immediately of **power / rule / authority / dominion**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">crat</mark>, think of <mark class="hl-def">power / rule / authority / dominion</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `crat-` (from *κράτος (krátos)*).
> - **Combining Stem with -o- Connective:** `crato-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Crat
> - **1. Direct & Concrete Anchor:** Literal instantiation of power / rule / authority / dominion in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on crat

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `crat-` | [[acrasia]] | Primary root semantic foundation denoting power / rule / authority / dominion. |
| **Connecting -o-** | `crato-` | [[akrasia]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `crat` | [[akratic]] | Relational or directional modification of the core root sense. |

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
| [[acrasia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek crat.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, acrasia designates a term designating an entity, condition, or phenomenon derived from greek crat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[akrasia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek crat.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, akrasia designates a term designating an entity, condition, or phenomenon derived from greek crat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[akratic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of power / rule / authority / dominion. | *"In academic literature, akratic designates adjective*) pertaining to, derived from, or characteristic of power / rule / authority / dominion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anocracy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek crat.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, anocracy designates a term designating an entity, condition, or phenomenon derived from greek crat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aristocracy]] | noun | **1.** Government by the best individuals or by a small privileged class.<br>**2.** A government in which power is vested in a minority consisting of those believed to be best qualified. | *"He fully believes he is one of the aristocracy!"* — Charles Dickens, *Bleak House* |
| [[aristocratic]] | adjective | **1.** Belonging to or characteristic of the nobility or aristocracy. | *"The old gentleman is rusty to look at, but is reputed to have made good thrift out of aristocratic marriage settlements and aristocratic wills, and to be very rich."* — Charles Dickens, *Bleak House* |
| [[aristocratical]] | adjective | **1.** Belonging to or characteristic of the nobility or aristocracy. | *"He was aristocratical too in his notions, keeping aloof, as I found, from the ordinary run of pensioners."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[autocracy]] | noun | **1.** The authority or rule of an autocrat.<br>**2.** Government in which one person possesses unlimited power. | *"The ghost of its memory has touched me." O melody divine, of fantasy And frenzied mem'ry wrought, advance From out the shades; O spectral utterance, Untwine thy chains, thy fair autocracy Unveil, have being, declare Thy state and tuneful sovereignty."* — C. A. Frazer, *Atmâ* |
| [[autocrat]] | noun | **1.** A person (such as a monarch) ruling with unlimited authority.<br>**2.** One who has undisputed influence or power. | *"Her manners are easy, graceful and winning, and she evinces in a marked degree the possession of that not easily described talent, of which our record furnishes numerous examples, which the Autocrat of the Breakfast Table calls "faculty." MRS."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[autocratic]] | noun | **1.** Of, relating to, or being an autocracy : absolute.<br>**2.** Characteristic of or resembling an autocrat : despotic. | *"Then he became suspicious--and a trifle autocratic.” She recalled his look as he told her that he would trust her, but that he meant to keep an eye upon her."* — Grace S. Richmond, *Red Pepper Burns* |
| [[bureaucracy]] | noun | **1.** A body of nonelected government officials.<br>**2.** An administrative policymaking group. | *"A bureaucracy rose and flourished; the spoils systems and corruption matched those of ancient Earth."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[bureaucrat]] | noun | **1.** A member of a bureaucracy. | *"Bureaucrats representing the central government on Earth were isolated from the affairs of the colonies they administered."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[bureaucratic]] | adjective | **1.** Of or relating to or resembling a bureaucrat or bureaucracy. | *"In academic literature, bureaucratic designates of or relating to or resembling a bureaucrat or bureaucracy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bureaucratism]] | noun | **1.** Nonelective government officials. | *"In academic literature, bureaucratism designates nonelective government officials."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cracy]] | noun | **1.** Form of government; also : state having such a form.<br>**2.** Social or political class (as of powerful persons). | *"In academic literature, cracy designates form of government; also : state having such a form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crataegus]] | noun | **1.** Thorny shrubs and small trees: hawthorn; thorn; thorn apple. | *"In academic literature, crataegus designates thorny shrubs and small trees: hawthorn; thorn; thorn apple."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crate]] | noun | **1.** A rugged box (usually made of wood); used for shipping.<br>**2.** The quantity contained in a crate. | *"Merryweather perched himself upon a crate, with a very injured expression upon his face, while Holmes fell upon his knees upon the floor and, with the lantern and a magnifying lens, began to examine minutely the cracks between the stones."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[crateful]] | noun | **1.** The quantity contained in a crate. | *"In academic literature, crateful designates the quantity contained in a crate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[crater]] | noun | **1.** A bowl-shaped geological formation at the top of a volcano.<br>**2.** A faint constellation in the southern hemisphere near hydra and corvus. | *"Whenever she felt herself injured, words of indignation poured out from her like fiery lava from a crater."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[crateva]] | noun | **1.** Tropical genus of small trees or shrubs. | *"In academic literature, crateva designates tropical genus of small trees or shrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[craton]] | noun | **1.** The part of a continent that is stable and forms the central mass of the continent; typically precambrian. | *"In academic literature, craton designates the part of a continent that is stable and forms the central mass of the continent; typically precambrian."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[democracy]] | noun | **1.** Government by the people : rule of the majority : such as.<br>**2.** A form of government in which the people elect representatives to make decisions, policies, laws, etc. according to law —called also representative democracy. | *"This theory is, in a way, based on an appeal to experience, as to the effect of property on human character, and it has the virtue of expressing one of the ideals of modern democracy."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[democrat]] | noun | **1.** A member of the Democratic party of the U.S. : a member of one of the two major political parties in the U.S. that is usually associated with government regulation of business, finance, and industry, with federally funded educational and social services, with separation of church and state, with support for abortion rights, affirmative action, gun control, and policies and laws that protect and support the rights of workers and minorities, and with internationalism and multilateralism in foreign policy.<br>**2.** One that favors or supports a democratic form of government : an adherent or advocate of democracy. | *"Who’s over him, he cries;—aye, he would be a democrat to all above; look, how he lords it over all below!"* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[democratic]] | noun | **1.** Of, relating to, or constituting one of the two major political parties in the U.S. that is usually associated with government regulation of business, finance, and industry, with federally funded education and social services, with separation of church and state, with support for abortion rights, affirmative action, gun control, and policies and laws that protect and support the rights of workers and minorities, and with internationalism and multilateralism in foreign policy.<br>**2.** Based on a form of government in which the people choose leaders by voting : of, relating to, or favoring democracy. | *"The Christian religion has acted both directly and indirectly on the Scottish peasantry, and it has done so the more powerfully because of the democratic character of the Presbyterian form which that religion took in Scotland."* — John Cairns, *Principal Cairns* |
| [[democratise]] | verb | **1.** Become (more) democratic; of nations.<br>**2.** Introduce democratic reforms; of nations. | *"In academic literature, democratise designates become (more) democratic; of nations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[democratize]] | verb | **1.** Become (more) democratic; of nations.<br>**2.** Introduce democratic reforms; of nations. | *"In academic literature, democratize designates become (more) democratic; of nations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isocrates]] | noun | **1.** Athenian rhetorician and orator (436-338 bc). | *"In academic literature, isocrates designates athenian rhetorician and orator (436-338 bc)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[kratos]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek crat.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, kratos designates a term designating an entity, condition, or phenomenon derived from greek crat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meritocracy]] | noun | **1.** A system, organization, or society in which people are chosen and moved into positions of success, power, and influence on the basis of their demonstrated abilities and merit; also : the people who are moved into such positions. | *"In academic literature, meritocracy designates a system, organization, or society in which people are chosen and moved into positions of success, power, and influence on the basis of their demonstrated abilities and merit; also : the people who are moved into such positions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meritocratic]] | adjective | **1.** Relating to or characteristic of a meritocracy. | *"In academic literature, meritocratic designates relating to or characteristic of a meritocracy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocracy]] | noun | **1.** A form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.). | *"In academic literature, monocracy designates a form of government in which the ruler is an absolute dictator (not restricted by a constitution or laws or opposition etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pancratium]] | noun | **1.** An ancient Greek athletic contest involving both boxing and wrestling. | *"In academic literature, pancratium designates an ancient greek athletic contest involving both boxing and wrestling."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uncrate]] | verb | **1.** Remove from the crate. | *"In academic literature, uncrate designates remove from the crate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undemocratic]] | adjective | **1.** Not in agreement with or according to democratic doctrine or practice or ideals. | *"I commend the virtuous democracy of this Chamber to read that bill, and then tell this Senate whether there ever was a more undemocratic measure than the bill propounded in Virginia by the party whose cause they espouse."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |

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
    ROOT DASHBOARD · CRAT
  </div>
</div>
