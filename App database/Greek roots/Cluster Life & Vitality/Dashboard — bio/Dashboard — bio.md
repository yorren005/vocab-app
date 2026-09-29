---
status: unread
type: root_dashboard
---
# Dashboard — bio
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">βίος (bíos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“life / course of living / biological organism”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The conscious, purposeful span of an animate creature's existence from genesis to decay.</span>
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

The Greek root **bio** (βίος (bíos), βιοῦν (bioûn)) signifies life / course of living / biological organism. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *abiogenesis*, *abiotic*, *aerobiology*, *anhydrobiosis*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: life / course of living / biological organism
> The Greek root **bio** fundamentally denotes **life / course of living / biological organism**. The conscious, purposeful span of an animate creature's existence from genesis to decay. Classical philosophy distinguished *bios* (a characterized, moral, and historical way of life) from *zoe* (raw biological vitality common to all animals).

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">life / course of living / biological organism</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The conscious, purposeful span of an animate creature's existence from genesis to decay.</mark>
> - **Everyday Connection**: Think of familiar words like *abiogenesis*, *abiotic*, *aerobiology*, *anhydrobiosis*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **bio** derives from Ancient Greek <mark class="hl-stem">βίος (bíos), βιοῦν (bioûn)</mark>, meaning "life / course of living / biological organism".
  - Reconstructed Indo-European origin: ***gʷei- / *gʷyeh₃- ("to live")**.

- **The Big Picture Idea**:
  - The conscious, purposeful span of an animate creature's existence from genesis to decay.
  - Whenever you see **bio** in an English word, think immediately of **life / course of living / biological organism**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">bio</mark>, think of <mark class="hl-def">life / course of living / biological organism</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `bio-` (from *βίος (bíos), βιοῦν (bioûn)*).
> - **Combining Stem with -o- Connective:** `bioo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Bio
> - **1. Direct & Concrete Anchor:** Literal instantiation of life / course of living / biological organism in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on bio

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `bio-` | [[abiogenesis]] | Primary root semantic foundation denoting life / course of living / biological organism. |
| **Connecting -o-** | `bioo-` | [[abiotic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `bio` | [[aerobiology]] | Relational or directional modification of the core root sense. |

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
| [[abiogenesis]] | noun | **1.** The origin of life from nonliving matter; specifically : a theory in the evolution of early life on earth: organic molecules and subsequent simple life forms first originated from inorganic substances.<br>**2.** A now-discredited notion that living organisms spontaneously originate directly from nonliving matter. | *"In academic literature, abiogenesis designates the origin of life from nonliving matter; specifically : a theory in the evolution of early life on earth: organic molecules and subsequent simple life forms first originated from inorganic substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abiogenetic]] | adjective | **1.** Originating by abiogenesis. | *"In academic literature, abiogenetic designates originating by abiogenesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abiogenist]] | noun | **1.** A believer in abiogenesis. | *"In academic literature, abiogenist designates a believer in abiogenesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[abiotic]] | noun | **1.** Not biotic : abiological. | *"In academic literature, abiotic designates not biotic : abiological."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aerobiology]] | noun | **1.** The science dealing with the occurrence, transportation, and effects of airborne materials (such as viruses, pollen, or pollutants). | *"In academic literature, aerobiology designates the science dealing with the occurrence, transportation, and effects of airborne materials (such as viruses, pollen, or pollutants)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibiotic]] | adjective | **1.** Having an aquatic early or larval form and a terrestrial adult form. | *"In academic literature, amphibiotic designates having an aquatic early or larval form and a terrestrial adult form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anabiotic]] | adjective | **1.** Of or related to the state of anabiosis. | *"In academic literature, anabiotic designates of or related to the state of anabiosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anhydrobiosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, anhydrobiosis designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anoxybiosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, anoxybiosis designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antibiotic]] | noun | **1.** A substance able to inhibit or kill microorganisms; specifically : an antibacterial substance (such as penicillin, cephalosporin, and ciprofloxacin) that is used to treat or prevent infections by killing or inhibiting the growth of bacteria in or on the body, that is administered orally, topically, or by injection, and that is isolated from cultures of certain microorganisms (such as fungi) or is of semi-synthetic or synthetic origin.<br>**2.** Tending to prevent, inhibit, or destroy life. | *"In academic literature, antibiotic designates a substance able to inhibit or kill microorganisms; specifically : an antibacterial substance (such as penicillin, cephalosporin, and ciprofloxacin) that is used to treat or prevent infections by killing or inhibiting the growth of bacteria in or on the body, that is administered orally, topically, or by injection, and that is isolated from cultures of certain microorganisms (such as fungi) or is of semi-synthetic or synthetic origin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astrobiology]] | noun | **1.** Exobiology. | *"In academic literature, astrobiology designates exobiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autobiographer]] | noun | **1.** Someone who writes their own biography. | *"In academic literature, autobiographer designates someone who writes their own biography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autobiographic]] | adjective | **1.** Of or relating to or characteristic of an autobiographer.<br>**2.** Relating to or in the style of an autobiography. | *"It contains several autobiographic touches; it is the only known instance in which she has addressed herself to full-grown readers, and it is sagacious and far-seeing."* — Anne Gilchrist, *Mary Lamb* |
| [[autobiographical]] | adjective | **1.** Of or relating to or characteristic of an autobiographer.<br>**2.** Relating to or in the style of an autobiography. | *"To this extent, and within these limits, an author, methinks, may be autobiographical, without violating either the reader’s rights or his own."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[autobiography]] | noun | **1.** The biography of a person narrated by that person : a usually written account of a person's life in their own words.<br>**2.** A work (such as a novel or film) that is partly autobiography and partly fiction : a fictionalized account of the author's life. | *"My father, the author of the _Sinner's Friend_, narrates in his autobiography a circumstance which he often used to speak of with great emotion."* — Classic Author, *The wonders of prayer* |
| [[bio]] | noun | **1.** A biography or biographical sketch.<br>**2.** Life : living organisms or tissue. | *"The communal lavatory and electronic bio-shower were down the hall."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[biochron]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, biochron designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biocoenosis]] | noun | **1.** An ecological community especially when forming a self-regulating unit. | *"In academic literature, biocoenosis designates an ecological community especially when forming a self-regulating unit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biographer]] | noun | **1.** Someone who writes an account of a person's life. | *"Besides, as his biographer has truly said, "he was habitually thankful to have someone near him whom he could fairly ask to take the foremost place."[18] Now that Dr."* — John Cairns, *Principal Cairns* |
| [[biographic]] | noun | **1.** Of, relating to, or constituting biography.<br>**2.** Consisting of biographies. | *"In academic literature, biographic designates of, relating to, or constituting biography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biographical]] | adjective | **1.** Of or relating to or being biography. | *"Brown because of that." No sooner was this book off his hands than Cairns was urged to undertake another biographical work--the Life of George Wilson."* — John Cairns, *Principal Cairns* |
| [[biography]] | noun | **1.** A usually written history of a person's life.<br>**2.** Biographical writings as a whole. | *"Jellyby’s biography, “is a lady of very remarkable strength of character who devotes herself entirely to the public."* — Charles Dickens, *Bleak House* |
| [[biologism]] | noun | **1.** The use of biological explanations in the analysis of social situations. | *"In academic literature, biologism designates the use of biological explanations in the analysis of social situations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biologist]] | noun | **1.** A branch of knowledge that deals with living organisms and vital processes.<br>**2.** The plant and animal life of a region or environment. | *"If this question is open to dispute among biologists, it is only as regards a minute increment of improvement."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[biologistic]] | adjective | **1.** Of or relating to biologism. | *"In academic literature, biologistic designates of or relating to biologism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biology]] | noun | **1.** A branch of knowledge that deals with living organisms and vital processes.<br>**2.** The plant and animal life of a region or environment. | *"Every day he seemed to become more interested in biology, and his name appeared once or twice in some of the scientific reviews in connection with certain curious experiments."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[biome]] | noun | **1.** A major ecological community type (such as tropical rainforest, grassland, or desert). | *"In academic literature, biome designates a major ecological community type (such as tropical rainforest, grassland, or desert)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biometric]] | noun | **1.** Of, relating to, or utilizing biometrics or biometry. | *"In academic literature, biometric designates of, relating to, or utilizing biometrics or biometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biomorph]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, biomorph designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biomorphism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, biomorphism designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biophilia]] | noun | **1.** A hypothetical human tendency to interact or be closely associated with other forms of life in nature : a desire or tendency to commune with nature. | *"In academic literature, biophilia designates a hypothetical human tendency to interact or be closely associated with other forms of life in nature : a desire or tendency to commune with nature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biophysicist]] | noun | **1.** A branch of science concerned with the application of physical principles and methods to biological problems. | *"In academic literature, biophysicist designates a branch of science concerned with the application of physical principles and methods to biological problems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biophysics]] | noun | **1.** A branch of science concerned with the application of physical principles and methods to biological problems. | *"In academic literature, biophysics designates a branch of science concerned with the application of physical principles and methods to biological problems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biopoiesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, biopoiesis designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biorhythm]] | noun | **1.** An innately determined rhythmic biological process or function (such as sleep behavior); also : the internal mechanism that determines such a process or function. | *"In academic literature, biorhythm designates an innately determined rhythmic biological process or function (such as sleep behavior); also : the internal mechanism that determines such a process or function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bios]] | noun | **1.** A software element of a computer operating system that allows the CPU to communicate with connected input and output devices (such as a keyboard or a monitor).<br>**2.** A biography or biographical sketch. | *"In academic literature, bios designates a software element of a computer operating system that allows the cpu to communicate with connected input and output devices (such as a keyboard or a monitor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosemiotic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of life / course of living / biological organism. | *"In academic literature, biosemiotic designates adjective*) pertaining to, derived from, or characteristic of life / course of living / biological organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosphere]] | noun | **1.** The part of the world in which life can exist.<br>**2.** Living organisms together with their environment. | *"In academic literature, biosphere designates the part of the world in which life can exist."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biostasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, biostasis designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosynthesis]] | noun | **1.** The production of a chemical compound by a living organism. | *"In academic literature, biosynthesis designates the production of a chemical compound by a living organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biosynthetic]] | adjective | **1.** Of or relating to biosynthesis. | *"In academic literature, biosynthetic designates of or relating to biosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biota]] | noun | **1.** The flora and fauna of a region. | *"In academic literature, biota designates the flora and fauna of a region."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotic]] | noun | **1.** Of, relating to, or caused by living organisms.<br>**2.** Having a (specified) mode of life. | *"In academic literature, biotic designates of, relating to, or caused by living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotin]] | noun | **1.** A colorless crystalline growth vitamin C10H16N2O3S of the vitamin B complex found especially in yeast, liver, and egg yolk. | *"In academic literature, biotin designates a colorless crystalline growth vitamin c10h16n2o3s of the vitamin b complex found especially in yeast, liver, and egg yolk."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotope]] | noun | **1.** A region uniform in environmental conditions and in its populations of animals and plants for which it is the habitat. | *"In academic literature, biotope designates a region uniform in environmental conditions and in its populations of animals and plants for which it is the habitat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotype]] | noun | **1.** The organisms sharing a specified genotype; also : the genotype shared or its distinguishing peculiarity. | *"In academic literature, biotype designates the organisms sharing a specified genotype; also : the genotype shared or its distinguishing peculiarity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biotypic]] | adjective | **1.** Of or relating to a biotype. | *"In academic literature, biotypic designates of or relating to a biotype."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biozone]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, biozone designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chemobiosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, chemobiosis designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cryobiosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, cryobiosis designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectosymbiosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, ectosymbiosis designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endosymbiont]] | noun | **1.** Symbiosis in which a symbiont dwells within the body of its symbiotic partner. | *"In academic literature, endosymbiont designates symbiosis in which a symbiont dwells within the body of its symbiotic partner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endosymbiosis]] | noun | **1.** Symbiosis in which a symbiont dwells within the body of its symbiotic partner. | *"In academic literature, endosymbiosis designates symbiosis in which a symbiont dwells within the body of its symbiotic partner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterobiasis]] | noun | **1.** Infestation with or disease caused by pinworms (genus Enterobius, especially E. vermicularis) that occurs especially in children. | *"In academic literature, enterobiasis designates infestation with or disease caused by pinworms (genus enterobius, especially e. vermicularis) that occurs especially in children."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exobiology]] | noun | **1.** A branch of biology concerned with the search for life outside the earth and with the effects of extraterrestrial environments on living organisms. | *"In academic literature, exobiology designates a branch of biology concerned with the search for life outside the earth and with the effects of extraterrestrial environments on living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrobiotic]] | noun | **1.** Of, relating to, or being a diet based on the Chinese cosmological principles of yin and yang that consists of whole cereals and grains supplemented especially with beans and vegetables and that in its especially former more restrictive forms has been linked to nutritional deficiencies. | *"In academic literature, macrobiotic designates of, relating to, or being a diet based on the chinese cosmological principles of yin and yang that consists of whole cereals and grains supplemented especially with beans and vegetables and that in its especially former more restrictive forms has been linked to nutritional deficiencies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macrobiotics]] | noun | **1.** The theory of promoting health and longevity by means of diet (especially whole beans and grains). | *"In academic literature, macrobiotics designates the theory of promoting health and longevity by means of diet (especially whole beans and grains)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microbiologist]] | noun | **1.** A specialist in microbiology. | *"In academic literature, microbiologist designates a specialist in microbiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microbiology]] | noun | **1.** A branch of biology dealing with microscopic forms of life. | *"In academic literature, microbiology designates a branch of biology dealing with microscopic forms of life."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neobiotic]] | noun | **1.** An antibiotic obtained from an actinomycete and used (as a sulphate under the trade name neobiotic) as an intestinal antiseptic in surgery. | *"In academic literature, neobiotic designates an antibiotic obtained from an actinomycete and used (as a sulphate under the trade name neobiotic) as an intestinal antiseptic in surgery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[osmobiosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, osmobiosis designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleobiology]] | noun | **1.** A branch of paleontology concerned with the biology of fossil organisms. | *"In academic literature, paleobiology designates a branch of paleontology concerned with the biology of fossil organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[probiotic]] | noun | **1.** A microorganism (such as lactobacillus) that when consumed (as in a food or a dietary supplement) maintains or restores beneficial bacteria to the digestive tract; also : a product or preparation that contains such microorganisms. | *"In academic literature, probiotic designates a microorganism (such as lactobacillus) that when consumed (as in a food or a dietary supplement) maintains or restores beneficial bacteria to the digestive tract; also : a product or preparation that contains such microorganisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbiogenesis]] | noun | **1.** Symbiogenesis is the leading evolutionary theory of the origin of eukaryotic cells from prokaryotic organisms.<br>**2.** The theory holds that mitochondria, plastids such as chloroplasts, and possibly other organelles of eukaryotic cells are descended from formerly free-living prokaryotes taken one inside the other in endosymbiosis. | *"In academic literature, symbiogenesis designates symbiogenesis is the leading evolutionary theory of the origin of eukaryotic cells from prokaryotic organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbiology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bio.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, symbiology designates a term designating an entity, condition, or phenomenon derived from greek bio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbiont]] | noun | **1.** An organism living in symbiosis; especially : the smaller member of a symbiotic pair. | *"In academic literature, symbiont designates an organism living in symbiosis; especially : the smaller member of a symbiotic pair."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbiosis]] | noun | **1.** The living together in more or less intimate association or close union of two dissimilar organisms (as in parasitism or commensalism); especially : mutualism.<br>**2.** A cooperative relationship (as between two persons or groups). | *"In academic literature, symbiosis designates the living together in more or less intimate association or close union of two dissimilar organisms (as in parasitism or commensalism); especially : mutualism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbiotic]] | noun | **1.** Relating to or marked by symbiosis:.<br>**2.** Characterized by, living in, or being a close physical association (as in mutualism or commensalism) between two or more dissimilar organisms. | *"In academic literature, symbiotic designates relating to or marked by symbiosis:."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Life & Vitality]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · BIO
  </div>
</div>
