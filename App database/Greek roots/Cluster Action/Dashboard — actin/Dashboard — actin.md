---
status: unread
type: root_dashboard
---
# Dashboard — actin

<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἀκτίς, ἀκτῖνος (aktís, aktînos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“beam, ray”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Physical sensory observation of light rays or radiating spokes expanding outward.</span>
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

The Greek root **actin** (ἀκτίς ἀκτῖνος (aktís, aktînos)) signifies beam, ray. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Actinomyces*, *Actinopterygii*, *Actinozoa*, *actin*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: beam, ray
> The Greek root **actin** fundamentally denotes **beam, ray**. The physical sensory observation and cognitive anchor underlying 'beam, ray'. In classical Greek antiquity, the root denoted 'beam, ray', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**:<mark class="hl-def"><mark class="hl-def">beam, ray</mark></mark>.
> - **Mental Picture**:<mark class="hl-mnemonic"><mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'beam, ray'.</mark></mark>
> - **Everyday Connection**: Think of familiar words like *Actinomyces*, *Actinopterygii*, *Actinozoa*, *actin*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **actin** derives from Ancient Greek <mark class="hl-stem">ἀκτίς ἀκτῖνος (aktís, aktînos)</mark>, meaning <mark class="hl-def">“beam, ray”</mark>.
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with actin**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'beam, ray'.
  - Whenever you see **actin** in an English word, think immediately of <mark class="hl-def">beam, ray</mark>.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">actin</mark>, think of <mark class="hl-def">beam, ray</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `actin-` (from *ἀκτίς ἀκτῖνος (aktís, aktînos)*).
> - **Combining Stem with -o- Connective:** `actino-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Actin
> - **1. Direct & Concrete Anchor:** Literal instantiation of beam, ray in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on actin

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `actin-` | [[Actinomyces]] | Primary root semantic foundation denoting beam, ray. |
| **Connecting -o-** | `actino-` | [[Actinopterygii]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `actin` | [[Actinozoa]] | Relational or directional modification of the core root sense. |

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
| [[actin]] | noun | **1.** A cellular protein found especially in microfilaments (such as those comprising myofibrils) and active in muscular contraction, cellular movement, and maintenance of cell shape.<br>**2.** Having a radiate form. | *"Funny way to be actin’.” Mark didn’t say anything, but gave me a shove over the ditch into the underbrush."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[actinal]] | adjective | **1.** (of radiate organisms) located on the surface or end on which the mouth is situated. | *"In academic literature, actinal designates (of radiate organisms) located on the surface or end on which the mouth is situated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinaria]] | noun | **1.** Sea anemones. | *"In academic literature, actinaria designates sea anemones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinia]] | noun | **1.** A genus of sea anemone common in rock pools.<br>**2.** Any sea anemone or related animal. | *"In academic literature, actinia designates a genus of sea anemone common in rock pools."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinian]] | noun | **1.** Any sea anemone or related animal. | *"In academic literature, actinian designates any sea anemone or related animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actiniaria]] | noun | **1.** Sea anemones. | *"In academic literature, actiniaria designates sea anemones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actiniarian]] | noun | **1.** Any sea anemone or related animal. | *"In academic literature, actiniarian designates any sea anemone or related animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinic]] | noun | **1.** Of, relating to, resulting from, or exhibiting chemical changes produced by radiant energy especially in the visible and ultraviolet parts of the spectrum. | *"In academic literature, actinic designates of, relating to, resulting from, or exhibiting chemical changes produced by radiant energy especially in the visible and ultraviolet parts of the spectrum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinide]] | noun | **1.** Any of a series of radioactive elements with atomic numbers 89 through 103. | *"In academic literature, actinide designates any of a series of radioactive elements with atomic numbers 89 through 103."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinidia]] | noun | **1.** Small asiatic woody vine bearing many-seeded fruit. | *"In academic literature, actinidia designates small asiatic woody vine bearing many-seeded fruit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinidiaceae]] | noun | **1.** Tropical trees or shrubs or woody vines. | *"In academic literature, actinidiaceae designates tropical trees or shrubs or woody vines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actiniopteris]] | noun | **1.** Terrestrial ferns of tropical asia and africa. | *"In academic literature, actiniopteris designates terrestrial ferns of tropical asia and africa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinism]] | noun | **1.** Actinism is the property of solar radiation that leads to the production of photochemical and photobiological effects.<br>**2.** It is important in chemical photography and x-ray imaging, and causes sunburn and photodegradation of materials. | *"In academic literature, actinism designates actinism is the property of solar radiation that leads to the production of photochemical and photobiological effects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinium]] | noun | **1.** A radioactive trivalent metallic element that resembles lanthanum in chemical properties and that is found especially in pitchblende. | *"In academic literature, actinium designates a radioactive trivalent metallic element that resembles lanthanum in chemical properties and that is found especially in pitchblende."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinocerid]] | noun | **1.** Any extinct cephalopod of the order †Actinocerida. | *"In academic literature, actinocerid designates any extinct cephalopod of the order †actinocerida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinodrome]] | adjective | **1.** Alternative form of actinodromous. | *"In academic literature, actinodrome designates alternative form of actinodromous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinoid]] | noun | **1.** Adjective & Noun*) Resembling, having the physical form of, or akin to beam, ray. | *"In academic literature, actinoid designates adjective & noun*) resembling, having the physical form of, or akin to beam, ray."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinolite]] | noun | **1.** A green mineral of the amphibole group; calcium magnesium iron silicate. | *"In academic literature, actinolite designates a green mineral of the amphibole group; calcium magnesium iron silicate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomere]] | noun | **1.** One of the radial segments making up the body of one of the Coelenterata or similar organism. | *"In academic literature, actinomere designates one of the radial segments making up the body of one of the coelenterata or similar organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomeris]] | noun | **1.** Used in some classification systems for plants now included in genus verbesina. | *"In academic literature, actinomeris designates used in some classification systems for plants now included in genus verbesina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinometer]] | noun | **1.** Any of various instruments for measuring the intensity of incident radiation; especially : one in which the intensity of radiation is measured by the speed of a photochemical reaction. | *"In academic literature, actinometer designates any of various instruments for measuring the intensity of incident radiation; especially : one in which the intensity of radiation is measured by the speed of a photochemical reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinometric]] | adjective | **1.** Of or related to actinometry. | *"In academic literature, actinometric designates of or related to actinometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinometrical]] | adjective | **1.** Of or related to actinometry. | *"In academic literature, actinometrical designates of or related to actinometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinometry]] | noun | **1.** Measuring the intensity of electromagnetic radiation (especially of the sun's rays). | *"In academic literature, actinometry designates measuring the intensity of electromagnetic radiation (especially of the sun's rays)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomorphic]] | noun | **1.** Being radially symmetrical and capable of division by any longitudinal plane into essentially symmetrical halves. | *"In academic literature, actinomorphic designates being radially symmetrical and capable of division by any longitudinal plane into essentially symmetrical halves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomorphous]] | adjective | **1.** Capable of division into symmetrical halves by any longitudinal plane passing through the axis. | *"In academic literature, actinomorphous designates capable of division into symmetrical halves by any longitudinal plane passing through the axis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Actinomyces]] | noun | **1.** Any of a genus (Actinomyces) of filamentous or rod-shaped bacteria that includes usually commensal and sometimes pathogenic forms inhabiting mucosal surfaces especially of the oral cavity of warm-blooded vertebrates. | *"In academic literature, Actinomyces designates soil-inhabiting saprophytes and disease-producing plant and animal parasites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomyces]] | noun | **1.** Soil-inhabiting saprophytes and disease-producing plant and animal parasites. | *"In academic literature, actinomyces designates **1.** soil-inhabiting saprophytes and disease-producing plant and animal parasites."* — Academic Lexicon |
| [[actinomycetaceae]] | noun | **1.** Filamentous anaerobic bacteria. | *"In academic literature, actinomycetaceae designates filamentous anaerobic bacteria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomycetal]] | adjective | **1.** Of or belonging to the actinomycetes. | *"In academic literature, actinomycetal designates of or belonging to the actinomycetes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomycetales]] | noun | **1.** Filamentous or rod-shaped bacteria. | *"In academic literature, actinomycetales designates filamentous or rod-shaped bacteria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomycete]] | noun | **1.** Any bacteria (some of which are pathogenic for humans and animals) belonging to the order actinomycetales. | *"In academic literature, actinomycete designates any bacteria (some of which are pathogenic for humans and animals) belonging to the order actinomycetales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomycetous]] | adjective | **1.** Of or belonging to the actinomycetes. | *"In academic literature, actinomycetous designates of or belonging to the actinomycetes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomycin]] | noun | **1.** Any of various red antibiotics isolated from soil bacteria. | *"In academic literature, actinomycin designates any of various red antibiotics isolated from soil bacteria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomycosis]] | noun | **1.** Disease of cattle that can be transmitted to humans; results from infection with actinomycetes; characterized by hard swellings that exude pus through long sinuses. | *"In academic literature, actinomycosis designates disease of cattle that can be transmitted to humans; results from infection with actinomycetes; characterized by hard swellings that exude pus through long sinuses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomycotic]] | adjective | **1.** Of or related to actinomycosis infection. | *"In academic literature, actinomycotic designates of or related to actinomycosis infection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomyxidia]] | noun | **1.** Parasites of worms. | *"In academic literature, actinomyxidia designates parasites of worms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinomyxidian]] | noun | **1.** Parasites of worms. | *"In academic literature, actinomyxidian designates parasites of worms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinon]] | noun | **1.** Any of a series of radioactive elements with atomic numbers 89 through 103. | *"In academic literature, actinon designates any of a series of radioactive elements with atomic numbers 89 through 103."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinophryid]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek actin.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, actinophryid designates a term designating an entity, condition, or phenomenon derived from greek actin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinopod]] | noun | **1.** Any member of the variously ranked group Actinopoda of protozoa. | *"In academic literature, actinopod designates any member of the variously ranked group actinopoda of protozoa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinopoda]] | noun | **1.** Heliozoans; radiolarians. | *"In academic literature, actinopoda designates heliozoans; radiolarians."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Actinopterygii]] | proper noun | **1.** The ray-finned fishes
A taxonomic class within the superclass Osteichthyes.
A taxonomic superclass within the infraphylum Gnathostomata.<br>**2.** A taxonomic class within the superclass Osteichthyes. | *"The treatise offered an incisive discussion of Actinopterygii, examining its conceptual origins in classical antiquity."* |
| [[actinotherapy]] | noun | **1.** The treatment of disease, especially skin disease, by exposure to ultraviolet light; radiotherapy. | *"In academic literature, actinotherapy designates the treatment of disease, especially skin disease, by exposure to ultraviolet light; radiotherapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Actinozoa]] | proper noun | **1.** The class of animals whose organs are disposed radially about a centre, long considered an accidental grouping. | *"In academic literature, Actinozoa designates a large class of sedentary marine coelenterates that includes sea anemones and corals; the medusoid phase is entirely suppressed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[actinozoa]] | noun | **1.** A large class of sedentary marine coelenterates that includes sea anemones and corals; the medusoid phase is entirely suppressed.<br>**2.** Sessile marine coelenterates including solitary and colonial polyps; the medusoid phase is entirely suppressed. | *"In academic literature, actinozoa designates **1.** a large class of sedentary marine coelenterates that includes sea anemones and corals; the medusoid phase is entirely suppressed.<br>**2.** sessile marine coelenterates including solitary and colonial polyps; the medusoid phase is entirely suppressed."* — Academic Lexicon |
| [[actinozoan]] | noun | **1.** Sessile marine coelenterates including solitary and colonial polyps; the medusoid phase is entirely suppressed. | *"In academic literature, actinozoan designates sessile marine coelenterates including solitary and colonial polyps; the medusoid phase is entirely suppressed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periactin]] | noun | **1.** An antihistamine (trade name periactin) used to treat some allergic reactions. | *"In academic literature, periactin designates an antihistamine (trade name periactin) used to treat some allergic reactions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoactinium]] | noun | **1.** A short-lived radioactive metallic element formed from uranium and disintegrating into actinium and then into lead. | *"In academic literature, protoactinium designates a short-lived radioactive metallic element formed from uranium and disintegrating into actinium and then into lead."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ACTIN
  </div>
</div>
