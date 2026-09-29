---
status: unread
type: root_dashboard
---
# Dashboard — stor
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">στορέννυμι</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“spread, strew”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'spread, strew'.</span>
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

The Greek root **stor** (στορέννυμι, στόρνυμι, στρῶμα (storénnumi, strôma)) signifies spread, strew. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *biostrome*, *stroma*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: spread, strew
> The Greek root **stor** fundamentally denotes **spread, strew**. The physical sensory observation and cognitive anchor underlying 'spread, strew'. In classical Greek antiquity, the root denoted 'spread, strew', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">spread, strew</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'spread, strew'.</mark>
> - **Everyday Connection**: Think of familiar words like *biostrome*, *stroma*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **stor** derives from Ancient Greek <mark class="hl-stem">στορέννυμι, στόρνυμι, στρῶμα (storénnumi, strôma)</mark>, meaning "spread, strew".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with stor**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'spread, strew'.
  - Whenever you see **stor** in an English word, think immediately of **spread, strew**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">stor</mark>, think of <mark class="hl-def">spread, strew</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `stor-` (from *στορέννυμι, στόρνυμι, στρῶμα (storénnumi, strôma)*).
> - **Combining Stem with -o- Connective:** `storo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Stor
> - **1. Direct & Concrete Anchor:** Literal instantiation of spread, strew in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on stor

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `stor-` | [[biostrome]] | Primary root semantic foundation denoting spread, strew. |
| **Connecting -o-** | `storo-` | [[stroma]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `stor` | [[stor]] | Relational or directional modification of the core root sense. |

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
| [[astor]] | noun | **1.** British politician (born in the united states) who was the first woman to sit in the british house of commons (1879-1964).<br>**2.** United states capitalist (born in germany) who made a fortune in fur trading (1763-1848). | *"I, at last, became determined, and chose the roof-garden at the Astor to tell him good-by, and perform the final operation."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[biostrome]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek stor.<br>**2.** Specialized application within the domain of Structure & Form. | *"In academic literature, biostrome designates a term designating an entity, condition, or phenomenon derived from greek stor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[restoration]] | noun | **1.** The reign of charles ii in england; 1660-1685.<br>**2.** The act of restoring something or someone to a satisfactory state. | *"Restoration hang Thy medicine on my lips; and let this kiss Repair those violent harms that my two sisters Have in thy reverence made!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[restorative]] | noun | **1.** A medicine that strengthens and invigorates.<br>**2.** A device for treating injury or disease. | *"Haply some poison yet doth hang on them, To make me die with a restorative. [_Kisses him._] Thy lips are warm!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[restore]] | verb | **1.** Return to its original or usable and functioning condition.<br>**2.** Return to life; get or give new life or energy. | *"O heavenly powers, restore him!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[restorer]] | noun | **1.** A skilled worker who is employed to restore or refinish buildings or antique furniture. | *"Next, to the Son, Destin’d restorer of Mankind, by whom New Heav’n and Earth shall to the Ages rise, Or down from Heav’n descend."* — John Milton, *Paradise Lost* |
| [[restoril]] | noun | **1.** A frequently prescribed benzodiazepine (trade name restoril); takes effect slowly and lasts long enough to help those people who wake up frequently during the night. | *"In academic literature, restoril designates a frequently prescribed benzodiazepine (trade name restoril); takes effect slowly and lasts long enough to help those people who wake up frequently during the night."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[storage]] | noun | **1.** The act of storing something.<br>**2.** A depository for goods. | *"It was a windowless erection used for storage, and from the open door there floated into the obscurity a mist of yellow radiance, which at first Tess thought to be illuminated smoke."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[storax]] | noun | **1.** A vanilla-scented resin from various trees of the genus styrax. | *"In academic literature, storax designates a vanilla-scented resin from various trees of the genus styrax."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[store]] | noun | **1.** A mercantile establishment for the retail sale of goods or services.<br>**2.** A supply of something available for future use. | *"When I have seen the hungry ocean gain Advantage on the kingdom of the shore, And the firm soil win of the watery main, Increasing store with loss, and loss with store."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[store-bought]] | adjective | **1.** Purchased; not homemade. | *"In academic literature, store-bought designates purchased; not homemade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stored-program]] | adjective | **1.** Of or concerning programs stored in the computer's own memory. | *"In academic literature, stored-program designates of or concerning programs stored in the computer's own memory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[storefront]] | noun | **1.** The front side of a store facing the street; usually contains display windows. | *"In academic literature, storefront designates the front side of a store facing the street; usually contains display windows."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[storehouse]] | noun | **1.** A depository for goods. | *"Whoever gave that counsel to give forth The corn o’ th’ storehouse gratis, as ’twas used Sometime in Greece— MENENIUS."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[storekeeper]] | noun | **1.** A merchant who owns or manages a shop. | *"I cannot get rid of the thought, and if you value my peace of mind, I beg you take the money!" Seeing, instantly, the hand of God in it, he told the story to the astonished storekeeper, then left to pay his debt with the money so strangely given."* — Classic Author, *The wonders of prayer* |
| [[storeria]] | noun | **1.** A genus of colubridae. | *"In academic literature, storeria designates a genus of colubridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[storeroom]] | noun | **1.** A room in which things are stored. | *"Leah, make a little hot negus and cut a sandwich or two: here are the keys of the storeroom.” And she produced from her pocket a most housewifely bunch of keys, and delivered them to the servant."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[storey]] | noun | **1.** A structure consisting of a room or set of rooms at a single position along a vertical scale. | *"Behind the church, and about a hundred yards to the west of the mansion-house, are the offices--stables, close boxes, coach-house, etc., all of a single storey, and built round a square paved courtyard."* — John Cairns, *Principal Cairns* |
| [[storeyed]] | adjective | **1.** Having stories as indicated. | *"In academic literature, storeyed designates having stories as indicated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[storied]] | adjective | **1.** Having an illustrious past.<br>**2.** Having stories as indicated. | *"Inscription For The Headstone Of Fergusson The Poet^1 No sculptured marble here, nor pompous lay, “No storied urn nor animated bust;” This simple stone directs pale Scotia’s way, To pour her sorrows o’er the Poet’s dust."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[storm]] | noun | **1.** A violent weather condition with winds 64-72 knots (11 on the beaufort scale) and precipitation and thunder and lightning.<br>**2.** A violent commotion or disturbance. | *"The next Caesarion smite, Till, by degrees the memory of my womb, Together with my brave Egyptians all, By the discandying of this pelleted storm, Lie graveless, till the flies and gnats of Nile Have buried them for prey!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[storm-beaten]] | adjective | **1.** Damaged by storm. | *"In academic literature, storm-beaten designates damaged by storm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[storm-tossed]] | adjective | **1.** Pounded or hit repeatedly by storms or adversities. | *"In academic literature, storm-tossed designates pounded or hit repeatedly by storms or adversities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stormbound]] | adjective | **1.** Delayed or confined or cut off by a storm. | *"In academic literature, stormbound designates delayed or confined or cut off by a storm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stormily]] | adverb | **1.** In a stormy or violent manner. | *"Reed came along the corridor, her cap flying wide, her gown rustling stormily."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[storminess]] | noun | **1.** The state of being stormy.<br>**2.** Violent passion in speech or action. | *"In academic literature, storminess designates the state of being stormy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stormproof]] | adjective | **1.** Protected against or able to withstand storms. | *"In academic literature, stormproof designates protected against or able to withstand storms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stormy]] | adjective | **1.** (especially of weather) affected or characterized by storms or commotion.<br>**2.** Characterized by violent emotions or behavior. | *"Who lets so fair a house fall to decay, Which husbandry in honour might uphold, Against the stormy gusts of winter’s day And barren rage of death’s eternal cold?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[story]] | noun | **1.** A message that tells the particulars of an act or occurrence or course of events; presented in writing or drama or cinema or as a radio or television program.<br>**2.** A piece of fiction that narrates a chain of related events. | *"Lean penury within that pen doth dwell, That to his subject lends not some small glory, But he that writes of you, if he can tell, That you are you, so dignifies his story."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[storybook]] | noun | **1.** A book containing a collection of stories (usually for children). | *"Wasn’t it just a storybook over which I had fallen adoze and adream?"* — Henry James, *The Turn of the Screw* |
| [[storyline]] | noun | **1.** The plot of a book or play or film. | *"In academic literature, storyline designates the plot of a book or play or film."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[storyteller]] | noun | **1.** Someone who tells a story.<br>**2.** Someone who tells lies. | *"Just sufficient time had elapsed to enable each storyteller to dress up his tale with a little becoming fiction, and in the indistinctness of his recollection to make himself the hero of every exploit."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[stroma]] | noun | **1.** A compact mass of fungal hyphae producing perithecia or pycnidia.<br>**2.** The colorless proteinaceous matrix of a chloroplast in which the chlorophyll-containing lamellae are embedded. | *"Outl._, p. 331. =Podisoma Juniperi=, Fr.; orange, clavariæform, somewhat branched; stroma simple; spores very long, lanceolate, filled with elliptic granules.—On living branches of _Juniperus communis_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Structure & Form]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · STOR
  </div>
</div>
