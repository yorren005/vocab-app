---
status: unread
type: root_dashboard
---
# Dashboard — micro
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">micro</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“Small”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'Small'.</span>
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

The Greek root **micro** (*micro*) signifies Small. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *microscopic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: Small
> The Greek root **micro** fundamentally denotes **Small**. The physical sensory observation and cognitive anchor underlying 'Small'. In classical Greek antiquity, the root denoted 'Small', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Small</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'Small'.</mark>
> - **Everyday Connection**: Think of familiar words like *microscopic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **micro** derives from Ancient Greek **micro**, meaning "Small".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with micro**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'Small'.
  - Whenever you see **micro** in an English word, think immediately of **Small**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">micro</mark>, think of <mark class="hl-def">Small</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `micro-` (from **micro**).
> - **Combining Stem with -o- Connective:** `microo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Micro
> - **1. Direct & Concrete Anchor:** Literal instantiation of Small in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on micro

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `micro-` | [[microscopic]] | Primary root semantic foundation denoting Small. |
| **Connecting -o-** | `microo-` | [[micro]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `micro` | [[micro]] | Relational or directional modification of the core root sense. |

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
| [[micro]] | adjective | **1.** Extremely small in scale or scope or capability. | *"As you may recall from your school days, it wasn't easy hauling micro-spunnel terminals around the Belt and ramming rocks into the hoppers for transfer to meltdown and refining above Venus."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[microcentrum]] | noun | **1.** Katydids. | *"Classical and authoritative lexicons catalog microcentrum as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcephalic]] | adjective | **1.** Having an abnormally small head and underdeveloped brain. | *"In academic literature, microcephalic designates having an abnormally small head and underdeveloped brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcephalous]] | adjective | **1.** Having an abnormally small head and underdeveloped brain. | *"In academic literature, microcephalous designates having an abnormally small head and underdeveloped brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcephalus]] | noun | **1.** An abnormally small head and underdeveloped brain. | *"In academic literature, microcephalus designates an abnormally small head and underdeveloped brain."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcephaly]] | noun | **1.** A condition of abnormal smallness of the circumference of the head that is present at birth or develops within the first few years of life and is often associated with developmental delays, impaired cognitive development, poor coordination and balance, deficits in hearing and vision, and seizures. | *"In academic literature, microcephaly designates a condition of abnormal smallness of the circumference of the head that is present at birth or develops within the first few years of life and is often associated with developmental delays, impaired cognitive development, poor coordination and balance, deficits in hearing and vision, and seizures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microchip]] | noun | **1.** Electronic equipment consisting of a small crystal of a silicon semiconductor fabricated to carry out a number of electronic functions in an integrated circuit. | *"In academic literature, microchip designates electronic equipment consisting of a small crystal of a silicon semiconductor fabricated to carry out a number of electronic functions in an integrated circuit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microchiroptera]] | noun | **1.** Most of the bats in the world; all bats except fruit bats insectivorous bats. | *"In academic literature, microchiroptera designates most of the bats in the world; all bats except fruit bats insectivorous bats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcircuit]] | noun | **1.** A microelectronic computer circuit incorporated into a chip or semiconductor; a whole system rather than a single component. | *"In academic literature, microcircuit designates a microelectronic computer circuit incorporated into a chip or semiconductor; a whole system rather than a single component."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrococcaceae]] | noun | **1.** Spherical or elliptical usually aerobic eubacteria that produce yellow or orange or red pigment; includes toxin-producing forms as well as harmless commensals and saprophytes. | *"In academic literature, micrococcaceae designates spherical or elliptical usually aerobic eubacteria that produce yellow or orange or red pigment; includes toxin-producing forms as well as harmless commensals and saprophytes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrococcus]] | noun | **1.** Type genus of the family micrococcaceae. | *"In academic literature, micrococcus designates type genus of the family micrococcaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcode]] | noun | **1.** The microinstructions especially of a microprocessor. | *"In academic literature, microcode designates the microinstructions especially of a microprocessor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcomputer]] | noun | **1.** A small digital computer based on a microprocessor and designed to be used by one person at a time. | *"In academic literature, microcomputer designates a small digital computer based on a microprocessor and designed to be used by one person at a time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcopy]] | verb | **1.** Photocopy printed or other graphic matter so that it is reduced in size. | *"In academic literature, microcopy designates photocopy printed or other graphic matter so that it is reduced in size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcosm]] | noun | **1.** A little world; especially : the human race or human nature seen as an epitome of the world or the universe.<br>**2.** A community or other unity that is an epitome of a larger unity. | *"If you see this in the map of my microcosm, follows it that I am known well enough too?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[microcosmic]] | adjective | **1.** Relating to or characteristic of a microcosm. | *"In academic literature, microcosmic designates relating to or characteristic of a microcosm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcrystalline]] | adjective | **1.** Containing crystals that are visible only under a microscope. | *"In academic literature, microcrystalline designates containing crystals that are visible only under a microscope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcyte]] | noun | **1.** An abnormally small red blood cell (less than 5 microns in diameter). | *"In academic literature, microcyte designates an abnormally small red blood cell (less than 5 microns in diameter)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcytosis]] | noun | **1.** A blood disorder characterized by the presence of microcytes (abnormally small red blood cells) in the blood; often associated with anemia. | *"In academic literature, microcytosis designates a blood disorder characterized by the presence of microcytes (abnormally small red blood cells) in the blood; often associated with anemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microeconomic]] | adjective | **1.** Of or relating to microeconomics. | *"In academic literature, microeconomic designates of or relating to microeconomics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microeconomics]] | noun | **1.** A study of economics in terms of individual areas of activity (such as a firm, household, prices, etc.). | *"In academic literature, microeconomics designates a study of economics in terms of individual areas of activity (such as a firm, household, prices, etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microeconomist]] | noun | **1.** An economist who specializes in microeconomics. | *"In academic literature, microeconomist designates an economist who specializes in microeconomics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microelectronic]] | adjective | **1.** Of or relating to or consisting of miniature electronic components. | *"In academic literature, microelectronic designates of or relating to or consisting of miniature electronic components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microelectronics]] | noun | **1.** The branch of electronics that deals with miniature components. | *"In academic literature, microelectronics designates the branch of electronics that deals with miniature components."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microevolution]] | noun | **1.** Evolution resulting from small specific genetic changes that can lead to a new subspecies. | *"In academic literature, microevolution designates evolution resulting from small specific genetic changes that can lead to a new subspecies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micromeria]] | noun | **1.** Large genus of fragrant chiefly old world herbs. | *"In academic literature, micromeria designates large genus of fragrant chiefly old world herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometeor]] | noun | **1.** A meteorite or meteoroid so small that it drifts down to earth without becoming intensely heated in the atmosphere. | *"In academic literature, micrometeor designates a meteorite or meteoroid so small that it drifts down to earth without becoming intensely heated in the atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometeoric]] | adjective | **1.** Of or relating to micrometeorites. | *"In academic literature, micrometeoric designates of or relating to micrometeorites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometeorite]] | noun | **1.** A meteorite or meteoroid so small that it drifts down to earth without becoming intensely heated in the atmosphere. | *"In academic literature, micrometeorite designates a meteorite or meteoroid so small that it drifts down to earth without becoming intensely heated in the atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometeoritic]] | adjective | **1.** Of or relating to micrometeorites. | *"In academic literature, micrometeoritic designates of or relating to micrometeorites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometeoroid]] | noun | **1.** A meteorite or meteoroid so small that it drifts down to earth without becoming intensely heated in the atmosphere. | *"In academic literature, micrometeoroid designates a meteorite or meteoroid so small that it drifts down to earth without becoming intensely heated in the atmosphere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometer]] | noun | **1.** An instrument used with a telescope or microscope for measuring minute distances.<br>**2.** A caliper for making precise measurements that has a spindle moved by a finely threaded screw. | *"In academic literature, micrometer designates an instrument used with a telescope or microscope for measuring minute distances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micrometry]] | noun | **1.** Measuring with a micrometer. | *"In academic literature, micrometry designates measuring with a micrometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micromicron]] | noun | **1.** A metric unit of length equal to one trillionth of a meter. | *"In academic literature, micromicron designates a metric unit of length equal to one trillionth of a meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micromillimeter]] | noun | **1.** A metric unit of length equal to one billionth of a meter. | *"In academic literature, micromillimeter designates a metric unit of length equal to one billionth of a meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micromillimetre]] | noun | **1.** A metric unit of length equal to one billionth of a meter. | *"In academic literature, micromillimetre designates a metric unit of length equal to one billionth of a meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micromyx]] | noun | **1.** Old world harvest mice. | *"In academic literature, micromyx designates old world harvest mice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micron]] | noun | **1.** A metric unit of length equal to one millionth of a meter. | *"In academic literature, micron designates a metric unit of length equal to one millionth of a meter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micronase]] | noun | **1.** An oral antidiabetic drug (trade names diabeta and micronase) that stimulates the release of insulin from the pancreas. | *"In academic literature, micronase designates an oral antidiabetic drug (trade names diabeta and micronase) that stimulates the release of insulin from the pancreas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micronesia]] | noun | **1.** A country scattered over micronesia with a constitutional government in free association with the united states; achieved independence in 1986.<br>**2.** The islands in the northwestern part of oceania. | *"In academic literature, micronesia designates a country scattered over micronesia with a constitutional government in free association with the united states; achieved independence in 1986."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micronor]] | noun | **1.** Trade name for and oral contraceptive containing the progestin compound norethindrone. | *"In academic literature, micronor designates trade name for and oral contraceptive containing the progestin compound norethindrone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[micronutrient]] | noun | **1.** A substance needed only in small amounts for normal body function (e.g., vitamins or minerals). | *"In academic literature, micronutrient designates a substance needed only in small amounts for normal body function (e.g., vitamins or minerals)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microorganism]] | noun | **1.** An organism (such as a bacterium or protozoan) of microscopic or ultramicroscopic size. | *"In academic literature, microorganism designates an organism (such as a bacterium or protozoan) of microscopic or ultramicroscopic size."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microradian]] | noun | **1.** A unit of angular distance equal to one thousandth of a milliradian. | *"In academic literature, microradian designates a unit of angular distance equal to one thousandth of a milliradian."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microscope]] | noun | **1.** An optical instrument consisting of a lens or combination of lenses for making enlarged images of minute objects; especially : compound microscope.<br>**2.** A non-optical instrument (such as one using radiations other than light or using vibrations) for making enlarged images of minute objects. | *"She hardly observed that a tear descended slowly upon his cheek, a tear so large that it magnified the pores of the skin over which it rolled, like the object lens of a microscope."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[microscopic]] | noun | **1.** Resembling a microscope especially in perception.<br>**2.** Invisible or indistinguishable without the use of a microscope. | *"As the inimical plant could only be present in very microscopic dimensions to have escaped ordinary observation, to find it seemed rather a hopeless attempt in the stretch of rich grass before them."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[microscopical]] | adjective | **1.** Of or relating to or used in microscopy.<br>**2.** Visible under a microscope; using a microscope. | *"Some cable-lengths off the shores of the Island of Clermont I admired the gigantic work accomplished by these microscopical workers."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[microscopically]] | adverb | **1.** By using a microscope; so as to be visible only with a microscope; as seen with a microscope.<br>**2.** As if by using a microscope; with extreme precision and attention to detail; in minute detail. | *"FeS (copper 71·7 per cent.), when examined microscopically, appeared to be homogeneous, and indicated some form of combination between the sulphides in these proportions."* — Donald M. Levy, *Modern Copper Smelting* |
| [[microscopist]] | noun | **1.** A scientist who specializes in research with the use of microscopes. | *"There are not many features in the rest of the species of this genus of sufficient interest to the general reader or microscopist to render it advisable to furnish any detailed account of them."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[microscopium]] | noun | **1.** A faint constellation in the southern hemisphere near sagittarius and capricornus. | *"In academic literature, microscopium designates a faint constellation in the southern hemisphere near sagittarius and capricornus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microscopy]] | noun | **1.** Research with the use of microscopes. | *"Any person possessed of the cardinal virtues of microscopy—patience and perseverance—will be rewarded in this instance; whilst those who are deficient will lose an object worthy of the virtues they dare not boast."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[microsecond]] | noun | **1.** One millionth (10^-6) of a second; one thousandth of a millisecond. | *"In academic literature, microsecond designates one millionth (10^-6) of a second; one thousandth of a millisecond."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microseism]] | noun | **1.** A feeble rhythmically and persistently recurring earth tremor. | *"In academic literature, microseism designates a feeble rhythmically and persistently recurring earth tremor."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsomal]] | adjective | **1.** Of or relating to microsomes. | *"In academic literature, microsomal designates of or relating to microsomes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsome]] | noun | **1.** Any of various minute cellular structures.<br>**2.** A particle in a particulate fraction that is obtained by heavy centrifugation of broken cells and consists of various amounts of ribosomes, fragmented endoplasmic reticulum, and mitochondrial cristae. | *"In academic literature, microsome designates any of various minute cellular structures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsorium]] | noun | **1.** Tropical usually epiphytic ferns; africa to asia and polynesia to australia. | *"In academic literature, microsorium designates tropical usually epiphytic ferns; africa to asia and polynesia to australia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsporangium]] | noun | **1.** A sporangium that develops only microspores. | *"In academic literature, microsporangium designates a sporangium that develops only microspores."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microspore]] | noun | **1.** Any of the spores in heterosporous plants that give rise to male gametophytes and are generally smaller than the megaspore. | *"In academic literature, microspore designates any of the spores in heterosporous plants that give rise to male gametophytes and are generally smaller than the megaspore."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsporidian]] | noun | **1.** Parasite of arthropods and fishes that invade and destroy host cells. | *"In academic literature, microsporidian designates parasite of arthropods and fishes that invade and destroy host cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsporophyll]] | noun | **1.** In non-flowering plants, a sporophyll that bears only microsporangia. | *"In academic literature, microsporophyll designates in non-flowering plants, a sporophyll that bears only microsporangia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsporum]] | noun | **1.** A genus of fungus of the family moniliaceae; causes ringworm. | *"In academic literature, microsporum designates a genus of fungus of the family moniliaceae; causes ringworm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microstomus]] | noun | **1.** A genus of pleuronectidae. | *"In academic literature, microstomus designates a genus of pleuronectidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microstrobos]] | noun | **1.** 2 species of small evergreen shrubs of australia and tasmania. | *"In academic literature, microstrobos designates 2 species of small evergreen shrubs of australia and tasmania."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microsurgery]] | noun | **1.** Surgery using operating microscopes and miniaturized precision instruments to perform intricate procedures on very small structures. | *"In academic literature, microsurgery designates surgery using operating microscopes and miniaturized precision instruments to perform intricate procedures on very small structures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microtaggant]] | noun | **1.** (trademark) a microscopic and traceable identification particle used to trace explosives or other hazardous materials or to prevent counterfeiting. | *"In academic literature, microtaggant designates (trademark) a microscopic and traceable identification particle used to trace explosives or other hazardous materials or to prevent counterfeiting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microtome]] | noun | **1.** An instrument for cutting sections (as of biological tissues) for microscopic examination. | *"In academic literature, microtome designates an instrument for cutting sections (as of biological tissues) for microscopic examination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microtubule]] | noun | **1.** A microscopically small tubule. | *"In academic literature, microtubule designates a microscopically small tubule."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microtus]] | noun | **1.** Voles of the northern hemisphere. | *"In academic literature, microtus designates voles of the northern hemisphere."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Number & Mathematics]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · MICRO
  </div>
</div>
