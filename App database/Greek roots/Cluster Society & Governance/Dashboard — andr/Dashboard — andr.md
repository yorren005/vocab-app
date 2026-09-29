---
status: unread
type: root_dashboard
---
# Dashboard — andr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἀνήρ ἀνδρός ἀνδρότης (anḗr</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“male, masculine”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'male, masculine'.</span>
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

The Greek root **andr** (ἀνήρ ἀνδρός ἀνδρότης (anḗr, andrós)) signifies male, masculine. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Alexander*, *Andrew*, *andr*, *androcentric*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: male, masculine
> The Greek root **andr** fundamentally denotes **male, masculine**. The physical sensory observation and cognitive anchor underlying 'male, masculine'. In classical Greek antiquity, the root denoted 'male, masculine', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">male, masculine</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'male, masculine'.</mark>
> - **Everyday Connection**: Think of familiar words like *Alexander*, *Andrew*, *andr*, *androcentric*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **andr** derives from Ancient Greek <mark class="hl-stem">ἀνήρ ἀνδρός ἀνδρότης (anḗr, andrós)</mark>, meaning "male, masculine".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with andr**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'male, masculine'.
  - Whenever you see **andr** in an English word, think immediately of **male, masculine**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">andr</mark>, think of <mark class="hl-def">male, masculine</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `andr-` (from *ἀνήρ ἀνδρός ἀνδρότης (anḗr, andrós)*).
> - **Combining Stem with -o- Connective:** `andro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Andr
> - **1. Direct & Concrete Anchor:** Literal instantiation of male, masculine in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on andr

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `andr-` | [[Alexander]] | Primary root semantic foundation denoting male, masculine. |
| **Connecting -o-** | `andro-` | [[Andrew]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `andr` | [[andr]] | Relational or directional modification of the core root sense. |

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
| [[Alexander]] | noun | **1.** An iced cocktail made from crème de cacao, sweet cream, and gin or brandy.<br>**2.** Name of 8 popes: especially VI (Rodrigo Borgia) 1431—1503 (pope 1492—1503). | *"His sons he there proclaimed the kings of kings: Great Media, Parthia, and Armenia He gave to Alexander; to Ptolemy he assigned Syria, Cilicia, and Phoenicia."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[alexandrian]] | noun | **1.** A resident or native of alexandria (especially alexandria in egypt).<br>**2.** Of or relating to alexander the great or his empire. | *"This is not yet an Alexandrian feast."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[andr]] | noun | **1.** Male human being. | *"Many dismal tales were told about funeral trains and mourning cries and wailings heard and seen about the great tree where the unfortunate Major André was taken, and which stood in the neighborhood."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[andradite]] | noun | **1.** A garnet consisting of calcium iron silicate and having any color ranging from yellow and green to brown and black; used as gemstone. | *"In academic literature, andradite designates a garnet consisting of calcium iron silicate and having any color ranging from yellow and green to brown and black; used as gemstone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[andreaea]] | noun | **1.** Brown or blackish alpine mosses having a dehiscent capsule with 4 longitudinal slits. | *"In academic literature, andreaea designates brown or blackish alpine mosses having a dehiscent capsule with 4 longitudinal slits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[andreaeales]] | noun | **1.** Comprises a single genus: andreaea. | *"In academic literature, andreaeales designates comprises a single genus: andreaea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[andrena]] | noun | **1.** A bee that is a member of the genus andrena. | *"In academic literature, andrena designates a bee that is a member of the genus andrena."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[andrenid]] | noun | **1.** A bee that is a member of the genus andrena. | *"In academic literature, andrenid designates a bee that is a member of the genus andrena."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[andrenidae]] | noun | **1.** A large family of solitary short-tongued bees most of which burrow in the ground. | *"In academic literature, andrenidae designates a large family of solitary short-tongued bees most of which burrow in the ground."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Andrew]] | noun | **1.** A person who clowns publicly.<br>**2.** A figure of a cross that has the form of two intersecting oblique bars. | *"I should not see the sandy hour-glass run But I should think of shallows and of flats, And see my wealthy Andrew dock’d in sand, Vailing her high top lower than her ribs To kiss her burial."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[andrew]] | noun | **1.** (new testament) disciple of jesus; brother of peter; patron saint of scotland. | *"In academic literature, andrew designates **1.** (new testament) disciple of jesus; brother of peter; patron saint of scotland."* — Academic Lexicon |
| [[andrews]] | noun | **1.** United states naturalist who contributed to paleontology and geology (1884-1960).<br>**2.** (new testament) disciple of jesus; brother of peter; patron saint of scotland. | *"Andrews, Holborn, with the waggons and hackney-coaches roaring past him all the day and half the night like one great dragon."* — Charles Dickens, *Bleak House* |
| [[andricus]] | noun | **1.** Cynipid gall wasps, chiefly affecting oaks. | *"In academic literature, andricus designates cynipid gall wasps, chiefly affecting oaks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androcentric]] | noun | **1.** Dominated by or emphasizing masculine interests or a masculine point of view. | *"In academic literature, androcentric designates dominated by or emphasizing masculine interests or a masculine point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androcentrism]] | noun | **1.** Dominated by or emphasizing masculine interests or a masculine point of view. | *"In academic literature, androcentrism designates dominated by or emphasizing masculine interests or a masculine point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androecium]] | noun | **1.** A male gametoecium. | *"In academic literature, androecium designates a male gametoecium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androgen]] | noun | **1.** A male sex hormone (such as testosterone).<br>**2.** Therapy for prostate cancer that severely reduces the body's production of androgens and especially testosterone through the administration of drugs or through surgical removal of the testicles. | *"In academic literature, androgen designates a male sex hormone (such as testosterone)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androgenesis]] | noun | **1.** Male parthenogenesis in which the embryo contains only paternal chromosomes due to the failure of the egg nucleus to participate in fertilization. | *"In academic literature, androgenesis designates male parthenogenesis in which the embryo contains only paternal chromosomes due to the failure of the egg nucleus to participate in fertilization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androgenetic]] | adjective | **1.** Of or related to androgenesis. | *"In academic literature, androgenetic designates of or related to androgenesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androgenic]] | adjective | **1.** Of or related to the male hormone androgen. | *"In academic literature, androgenic designates of or related to the male hormone androgen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androgenous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of male, masculine. | *"In academic literature, androgenous designates adjective*) pertaining to, derived from, or characteristic of male, masculine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androgeny]] | noun | **1.** Male parthenogenesis in which the embryo contains only paternal chromosomes due to the failure of the egg nucleus to participate in fertilization. | *"In academic literature, androgeny designates male parthenogenesis in which the embryo contains only paternal chromosomes due to the failure of the egg nucleus to participate in fertilization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androglossia]] | noun | **1.** A woman's voice with male qualities. | *"In academic literature, androglossia designates a woman's voice with male qualities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androgyne]] | noun | **1.** One that is androgynous. | *"In academic literature, androgyne designates one that is androgynous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androgynous]] | noun | **1.** Having the characteristics or nature of both male and female.<br>**2.** Neither specifically feminine nor masculine. | *"In academic literature, androgynous designates having the characteristics or nature of both male and female."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androgyny]] | noun | **1.** The quality or state of being neither specifically feminine or masculine : the combination of feminine and masculine characteristics : the quality or state of being androgynous. | *"In academic literature, androgyny designates the quality or state of being neither specifically feminine or masculine : the combination of feminine and masculine characteristics : the quality or state of being androgynous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[android]] | noun | **1.** A mobile robot usually with a human form. | *"In academic literature, android designates a mobile robot usually with a human form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[andrology]] | noun | **1.** A branch of medicine concerned with the anatomy, functions, and disorders (such as infertility or impotence) of the male reproductive system. | *"In academic literature, andrology designates a branch of medicine concerned with the anatomy, functions, and disorders (such as infertility or impotence) of the male reproductive system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[andromeda]] | noun | **1.** Broad-leaved evergreen asiatic shrub with glossy leaves and drooping clusters of white flowers.<br>**2.** Any of several shrubs of the genus andromeda having leathery leaves and clusters of small flowers. | *"It is Guido’s picture of Perseus rescuing Andromeda from the sea-monster or whale."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[androphobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek andr.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, androphobia designates a term designating an entity, condition, or phenomenon derived from greek andr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[andropogon]] | noun | **1.** Tall annual or perennial grasses with spikelike racemes; warm regions. | *"In academic literature, andropogon designates tall annual or perennial grasses with spikelike racemes; warm regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androspore]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek andr.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, androspore designates a term designating an entity, condition, or phenomenon derived from greek andr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[androsterone]] | noun | **1.** An androgenic hormone that is less active than testosterone. | *"In academic literature, androsterone designates an androgenic hormone that is less active than testosterone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[andryala]] | noun | **1.** Any plant of the genus andryala having milky sap and heads of bright yellow flowers. | *"In academic literature, andryala designates any plant of the genus andryala having milky sap and heads of bright yellow flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diandry]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek andr.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, diandry designates a term designating an entity, condition, or phenomenon derived from greek andr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monandrous]] | adjective | **1.** Having only one husband at a time. | *"In academic literature, monandrous designates having only one husband at a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monandry]] | noun | **1.** A marriage form or custom in which a woman has only one husband at a time. | *"In academic literature, monandry designates a marriage form or custom in which a woman has only one husband at a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philander]] | noun | **1.** To have casual or illicit sex with a person or with many people; especially : to be sexually unfaithful to one's spouse —usually used of a man.<br>**2.** Philander Chase 1853—1921 American statesman. | *"Mark,” said Gabriel, sternly, “now you mind this: none of that dalliance-talk—that philandering way—that dandle-smack-and-coddle style of yours—about Miss Everdene."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[philanderer]] | noun | **1.** A man who likes many women and has short sexual relationships with them. | *"In academic literature, philanderer designates a man who likes many women and has short sexual relationships with them."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyandrist]] | noun | **1.** A woman with two or more husbands. | *"In academic literature, polyandrist designates a woman with two or more husbands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyandrous]] | noun | **1.** The state or practice of having more than one husband or male mate at one time. | *"In academic literature, polyandrous designates the state or practice of having more than one husband or male mate at one time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyandry]] | noun | **1.** The state or practice of having more than one husband or male mate at one time. | *"In academic literature, polyandry designates the state or practice of having more than one husband or male mate at one time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protandry]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek andr.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, protandry designates a term designating an entity, condition, or phenomenon derived from greek andr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pseudandry]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek andr.<br>**2.** Specialized application within the domain of Society & Governance. | *"In academic literature, pseudandry designates a term designating an entity, condition, or phenomenon derived from greek andr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[synandrous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of male, masculine. | *"In academic literature, synandrous designates adjective*) pertaining to, derived from, or characteristic of male, masculine."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · ANDR
  </div>
</div>
