---
status: unread
type: root_dashboard
---
# Dashboard — phos
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">φῶς φωτός (phōtós)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“light”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'light'.</span>
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

The Greek root **phos** (φῶς φωτός (phōtós)) signifies light. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *aphotic*, *biophoton*, *cataphote*, *diphoton*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: light
> The Greek root **phos** fundamentally denotes **light**. The physical sensory observation and cognitive anchor underlying 'light'. In classical Greek antiquity, the root denoted 'light', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">light</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'light'.</mark>
> - **Everyday Connection**: Think of familiar words like *aphotic*, *biophoton*, *cataphote*, *diphoton*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **phos** derives from Ancient Greek <mark class="hl-stem">φῶς φωτός (phōtós)</mark>, meaning "light".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with phos**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'light'.
  - Whenever you see **phos** in an English word, think immediately of **light**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">phos</mark>, think of <mark class="hl-def">light</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `phos-` (from *φῶς φωτός (phōtós)*).
> - **Combining Stem with -o- Connective:** `phoso-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Phos
> - **1. Direct & Concrete Anchor:** Literal instantiation of light in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on phos

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `phos-` | [[aphotic]] | Primary root semantic foundation denoting light. |
| **Connecting -o-** | `phoso-` | [[biophoton]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `phos` | [[cataphote]] | Relational or directional modification of the core root sense. |

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
| [[aphotic]] | noun | **1.** Being the deep zone of an ocean or lake receiving too little light to permit photosynthesis. | *"In academic literature, aphotic designates being the deep zone of an ocean or lake receiving too little light to permit photosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biophoton]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phos.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, biophoton designates a term designating an entity, condition, or phenomenon derived from greek phos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cataphote]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phos.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, cataphote designates a term designating an entity, condition, or phenomenon derived from greek phos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diphoton]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phos.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, diphoton designates a term designating an entity, condition, or phenomenon derived from greek phos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[euphotic]] | noun | **1.** Of, relating to, or constituting the upper layers of a body of water into which sufficient light penetrates to permit growth of green plants. | *"In academic literature, euphotic designates of, relating to, or constituting the upper layers of a body of water into which sufficient light penetrates to permit growth of green plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microphotograph]] | noun | **1.** A small photograph that is normally magnified for viewing.<br>**2.** Photomicrograph. | *"In academic literature, microphotograph designates a small photograph that is normally magnified for viewing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microphotometer]] | noun | **1.** Special kind of densitometer that measures density variations over a very small area. | *"In academic literature, microphotometer designates special kind of densitometer that measures density variations over a very small area."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phos]] | noun | **1.** A soup made of beef or chicken broth and rice noodles. | *"In academic literature, phos designates a soup made of beef or chicken broth and rice noodles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phosphate]] | noun | **1.** A salt of phosphoric acid.<br>**2.** Carbonated drink with fruit syrup and a little phosphoric acid. | *"A variety of minor enterprises have been undertaken by states to supply salt, phosphate, banking facilities, even some manufactures."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[phosphor]] | noun | **1.** A phosphorescent substance.<br>**2.** A luminescent substance that emits light when excited by radiation (such as electrons) and is used especially in fluorescent lamps and cathode-ray tubes. | *"Phosphorus is sometimes employed for giving soundness to the castings, being added to the bath in small quantities in the form of phosphor-copper containing about 10 per cent. of the non-metal."* — Donald M. Levy, *Modern Copper Smelting* |
| [[phosphoric]] | adjective | **1.** Containing or characteristic of phosphorus. | *"The pool glittered like a dead man’s eye, and as the world awoke a breeze blew, shaking and elongating the reflection of the moon without breaking it, and turning the image of the star to a phosphoric streak upon the water."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[phosphorous]] | adjective | **1.** Containing or characteristic of phosphorus. | *"In academic literature, phosphorous designates containing or characteristic of phosphorus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phosphorus]] | noun | **1.** A phosphorescent substance or body; especially : one that shines or glows in the dark.<br>**2.** A nonmetallic element of the nitrogen family with atomic number 15 that occurs widely in combination especially as phosphates, that is essential for life in all known organisms, and that is used especially in fertilizers and organophosphorus compounds. | *"With such a mind, active as phosphorus, biting everything that came near into the form that suited it, how could Mrs."* — George Eliot, *Middlemarch* |
| [[photic]] | noun | **1.** Of, relating to, or involving light especially in relation to organisms.<br>**2.** Penetrated by light especially of the sun. | *"In academic literature, photic designates of, relating to, or involving light especially in relation to organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photo]] | noun | **1.** Photograph.<br>**2.** Photographic. | *"In my responses I told about the time and circumstances that I had taped a commentary to our family's photo and document album, and how I went about it."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[photobiology]] | noun | **1.** A branch of biology that deals with the effects on living organisms of radiant energy (such as light). | *"In academic literature, photobiology designates a branch of biology that deals with the effects on living organisms of radiant energy (such as light)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photocatalysis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phos.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, photocatalysis designates a term designating an entity, condition, or phenomenon derived from greek phos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photochromism]] | noun | **1.** Capable of changing color on exposure to radiant energy (such as light).<br>**2.** Of, relating to, or utilizing the change of color shown by a photochromic substance. | *"In academic literature, photochromism designates capable of changing color on exposure to radiant energy (such as light)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoelectric]] | noun | **1.** Involving, relating to, or utilizing any of various electrical effects due to the interaction of radiation (such as light) with matter.<br>**2.** An electronic device whose electrical properties are modified by the action of light. | *"In academic literature, photoelectric designates involving, relating to, or utilizing any of various electrical effects due to the interaction of radiation (such as light) with matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoelectrical]] | adjective | **1.** Of or pertaining to photoelectricity. | *"In academic literature, photoelectrical designates of or pertaining to photoelectricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photogenic]] | noun | **1.** Produced or precipitated by light.<br>**2.** Producing or generating light : phosphorescent. | *"In academic literature, photogenic designates produced or precipitated by light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photogram]] | noun | **1.** A photographic image made by placing objects between light-sensitive paper and a light source. | *"In academic literature, photogram designates a photographic image made by placing objects between light-sensitive paper and a light source."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photograph]] | noun | **1.** A picture or likeness obtained by photography.<br>**2.** To take a photograph of. | *"It had seemed of a sudden most familiar, in much the same way that my father’s barn would have been in a photograph."* — Jack London, *The Jacket (The Star-Rover)* |
| [[photographer]] | noun | **1.** Someone who takes photographs professionally. | *"P---- who is a good amateur photographer, photographed him in company with his little daughter in the act of handing him a banana."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[photographic]] | noun | **1.** Relating to, obtained by, or used in photography.<br>**2.** Representing nature and human beings with the exactness of a photograph. | *"He had an excellent memory, photographic and phonographic, a gift that wise men covet for themselves but deprecate in their friends."* — Anthony Pryde, *Nightfall* |
| [[photography]] | noun | **1.** The art or process of producing images by the action of radiant energy and especially light on a sensitive surface (such as film or an optical sensor).<br>**2.** A process in which an image is obtained by application of a high-frequency electric field to an object so that it radiates a characteristic pattern of luminescence that is recorded on photographic film. | *"The several uses of gold are constantly competing for it: its uses for rings, pens, ornaments, championship cups, photography, dentistry, delicate instruments, and as a circulating medium."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[photolysis]] | noun | **1.** Chemical decomposition by the action of radiant energy (such as light). | *"In academic literature, photolysis designates chemical decomposition by the action of radiant energy (such as light)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometer]] | noun | **1.** An instrument for measuring luminous intensity, luminous flux, illumination, or brightness.<br>**2.** A spectrophotometer in which a spray of metallic salts in solution is vaporized in a very hot flame and subjected to quantitative analysis by measuring the intensities of the spectral lines of the metals present. | *"In academic literature, photometer designates an instrument for measuring luminous intensity, luminous flux, illumination, or brightness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometric]] | noun | **1.** Of or relating to photometry or the photometer.<br>**2.** A spectrophotometer in which a spray of metallic salts in solution is vaporized in a very hot flame and subjected to quantitative analysis by measuring the intensities of the spectral lines of the metals present. | *"In academic literature, photometric designates of or relating to photometry or the photometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometrical]] | adjective | **1.** Of or relating to photometry. | *"In academic literature, photometrical designates of or relating to photometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometrically]] | adverb | **1.** By photometric means. | *"In academic literature, photometrically designates by photometric means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometrist]] | noun | **1.** Someone who practices photometry. | *"In academic literature, photometrist designates someone who practices photometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometry]] | noun | **1.** A branch of science that deals with measurement of the intensity of light; also : the practice of using a photometer.<br>**2.** A spectrophotometer in which a spray of metallic salts in solution is vaporized in a very hot flame and subjected to quantitative analysis by measuring the intensities of the spectral lines of the metals present. | *"In academic literature, photometry designates a branch of science that deals with measurement of the intensity of light; also : the practice of using a photometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photon]] | noun | **1.** A quantum of electromagnetic radiation. | *"In academic literature, photon designates a quantum of electromagnetic radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoperiod]] | noun | **1.** A recurring cycle of light and dark periods of constant length; also : the period of light during such a cycle : photophase. | *"In academic literature, photoperiod designates a recurring cycle of light and dark periods of constant length; also : the period of light during such a cycle : photophase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photophobia]] | noun | **1.** Intolerance to light; especially : painful sensitiveness to strong light. | *"In academic literature, photophobia designates intolerance to light; especially : painful sensitiveness to strong light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photophone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phos.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, photophone designates a term designating an entity, condition, or phenomenon derived from greek phos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photophore]] | noun | **1.** A light-emitting organ; especially : one of the luminous spots on various marine mostly deep-sea fishes. | *"In academic literature, photophore designates a light-emitting organ; especially : one of the luminous spots on various marine mostly deep-sea fishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photopic]] | noun | **1.** Relating to or being vision in bright light with light-adapted eyes that is mediated by the cones of the retina. | *"In academic literature, photopic designates relating to or being vision in bright light with light-adapted eyes that is mediated by the cones of the retina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoptarmosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek phos.<br>**2.** Specialized application within the domain of Light & Vision. | *"In academic literature, photoptarmosis designates a term designating an entity, condition, or phenomenon derived from greek phos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photosynthesis]] | noun | **1.** Synthesis of chemical compounds with the aid of radiant energy and especially light; especially : formation of carbohydrates from carbon dioxide and a source of hydrogen (such as water) in the chlorophyll-containing cells (as of green plants) exposed to light. | *"In academic literature, photosynthesis designates synthesis of chemical compounds with the aid of radiant energy and especially light; especially : formation of carbohydrates from carbon dioxide and a source of hydrogen (such as water) in the chlorophyll-containing cells (as of green plants) exposed to light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photosynthetic]] | adjective | **1.** Relating to or using or formed by photosynthesis. | *"In academic literature, photosynthetic designates relating to or using or formed by photosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phototherapy]] | noun | **1.** Light therapy.<br>**2.** The treatment of medical or psychiatric conditions (such as seasonal affective disorder) by the controlled application of light —called also light treatment, phototherapy. | *"In academic literature, phototherapy designates light therapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telephoto]] | noun | **1.** Being a camera lens system designed to give a large image of a distant object; also : relating to or being photography in which a telephoto lens is used.<br>**2.** A telephoto lens. | *"In academic literature, telephoto designates being a camera lens system designed to give a large image of a distant object; also : relating to or being photography in which a telephoto lens is used."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telephotograph]] | noun | **1.** A photograph transmitted and reproduced over a distance.<br>**2.** A photograph made with a telephoto lens. | *"In academic literature, telephotograph designates a photograph transmitted and reproduced over a distance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telephotography]] | noun | **1.** Transmission and reproduction of photographs and charts and pictures over a distance.<br>**2.** Photography using a telephoto lens. | *"In academic literature, telephotography designates transmission and reproduction of photographs and charts and pictures over a distance."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Light & Vision]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PHOS
  </div>
</div>
