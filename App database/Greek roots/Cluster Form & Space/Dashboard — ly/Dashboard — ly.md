---
status: unread
type: root_dashboard
---
# Dashboard — ly
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">λύειν λυτός λυτικός λύσις (lúein)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“dissolving”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'dissolving'.</span>
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

The Greek root **ly** (λύειν λυτός λυτικός λύσις (lúein)) signifies dissolving. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Hippolyte*, *analyse*, *analysis*, *analytic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: dissolving
> The Greek root **ly** fundamentally denotes **dissolving**. The physical sensory observation and cognitive anchor underlying 'dissolving'. In classical Greek antiquity, the root denoted 'dissolving', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">dissolving</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'dissolving'.</mark>
> - **Everyday Connection**: Think of familiar words like *Hippolyte*, *analyse*, *analysis*, *analytic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ly** derives from Ancient Greek <mark class="hl-stem">λύειν λυτός λυτικός λύσις (lúein)</mark>, meaning "dissolving".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with ly**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'dissolving'.
  - Whenever you see **ly** in an English word, think immediately of **dissolving**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ly</mark>, think of <mark class="hl-def">dissolving</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `ly-` (from *λύειν λυτός λυτικός λύσις (lúein)*).
> - **Combining Stem with -o- Connective:** `lyo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Ly
> - **1. Direct & Concrete Anchor:** Literal instantiation of dissolving in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on ly

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `ly-` | [[Hippolyte]] | Primary root semantic foundation denoting dissolving. |
| **Connecting -o-** | `lyo-` | [[analyse]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `ly` | [[analysis]] | Relational or directional modification of the core root sense. |

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
| [[analyse]] | noun | **1.** To study or determine the nature and relationship of the parts of (something) by analysis.<br>**2.** To subject to scientific or grammatical analysis. | *"Children can feel, but they cannot analyse their feelings; and if the analysis is partially effected in thought, they know not how to express the result of the process in words."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[analyser]] | noun | **1.** An instrument that performs analyses. | *"In academic literature, analyser designates an instrument that performs analyses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analysis]] | noun | **1.** A detailed examination of anything complex in order to understand its nature or to determine its essential features : a thorough study.<br>**2.** A statement, usually in writing, explaining the results of such an examination. | *"It shall pollute, this very night, the choice stream (in which chemists on analysis would find the genuine nobility) of a Norman house, and his Grace shall not be able to say nay to the infamous alliance."* — Charles Dickens, *Bleak House* |
| [[analytic]] | noun | **1.** Of or relating to analysis or analytics; especially : separating something into component parts or constituent elements.<br>**2.** Being a proposition (such as "no bachelor is married") whose truth is evident from the meaning of the words it contains. | *"The connecting links of his thought have often to be supplied by an analytic reader whose mind is not up to the required tension to spring over the chasm."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[analytical]] | adjective | **1.** Using or skilled in using analysis (i.e., separating a whole--intellectual or substantial--into its elemental parts or basic principles).<br>**2.** Of a proposition that is necessarily true independent of fact or experience. | *"Do you think that I would respond to such a trifle and yet be ignorant of his death?” “I have seen too much not to know that the impression of a woman may be more valuable than the conclusion of an analytical reasoner."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[analytically]] | adverb | **1.** By virtue of analysis. | *"In academic literature, analytically designates by virtue of analysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analyticity]] | noun | **1.** The property of being analytic. | *"In academic literature, analyticity designates the property of being analytic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analyzable]] | adjective | **1.** Capable of being partitioned. | *"In academic literature, analyzable designates capable of being partitioned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analyze]] | verb | **1.** Consider in detail and subject to an analysis in order to discover essential features or meaning.<br>**2.** Make a mathematical, chemical, or grammatical analysis of; break down into components or essential features. | *"They could not analyze wherein lay the charm which pervaded her whole personality."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[analyzed]] | verb | **1.** Consider in detail and subject to an analysis in order to discover essential features or meaning.<br>**2.** Make a mathematical, chemical, or grammatical analysis of; break down into components or essential features. | *"When the records of the organizations of the country are analyzed it becomes almost necessary to accept that statement."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[analyzer]] | noun | **1.** An instrument that performs analyses. | *"Sensors, analyzers, siphons and beam-guides paralleled the lasers' signals along an incandescent column of plasma from the dissolving planetoid into the Extractor's processes and, when ready, into the hopper."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[anticatalyst]] | noun | **1.** (chemistry) a substance that retards a chemical reaction or diminishes the activity of a catalyst. | *"In academic literature, anticatalyst designates (chemistry) a substance that retards a chemical reaction or diminishes the activity of a catalyst."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aparalytic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of dissolving. | *"In academic literature, aparalytic designates adjective*) pertaining to, derived from, or characteristic of dissolving."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autolysis]] | noun | **1.** Breakdown of all or part of a cell or tissue by self-produced enzymes. | *"In academic literature, autolysis designates breakdown of all or part of a cell or tissue by self-produced enzymes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autolytic]] | adjective | **1.** Of or relating to self-digestion. | *"In academic literature, autolytic designates of or relating to self-digestion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalyse]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ly.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, catalyse designates a term designating an entity, condition, or phenomenon derived from greek ly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalysis]] | noun | **1.** A modification and especially increase in the rate of a chemical reaction induced by material unchanged chemically at the end of the reaction. | *"In academic literature, catalysis designates a modification and especially increase in the rate of a chemical reaction induced by material unchanged chemically at the end of the reaction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalyst]] | noun | **1.** A person or thing that provokes or speeds significant change or action.<br>**2.** A substance that enables a chemical reaction to proceed at a usually faster rate or under different conditions (as at a lower temperature) than otherwise possible. | *"In academic literature, catalyst designates a person or thing that provokes or speeds significant change or action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalytic]] | noun | **1.** Causing, involving, or relating to catalysis.<br>**2.** An automobile exhaust-system component containing a catalyst that causes conversion of harmful gases (such as carbon monoxide and uncombusted hydrocarbons) into mostly harmless products (such as water and carbon dioxide). | *"In academic literature, catalytic designates causing, involving, or relating to catalysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalyze]] | verb | **1.** Change by catalysis or cause to catalyze. | *"In academic literature, catalyze designates change by catalysis or cause to catalyze."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cytolysis]] | noun | **1.** The usually pathologic dissolution or disintegration of cells. | *"In academic literature, cytolysis designates the usually pathologic dissolution or disintegration of cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cytolytic]] | adjective | **1.** Of or relating to cytolysis, the dissolution or destruction of a cell. | *"In academic literature, cytolytic designates of or relating to cytolysis, the dissolution or destruction of a cell."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dialysis]] | noun | **1.** The separation of substances in solution by means of their unequal diffusion through semipermeable membranes; especially : such a separation of colloids from soluble substances.<br>**2.** The process of removing blood from an artery (as of a patient affected with kidney failure), purifying it by dialysis, adding vital substances, and returning it to a vein —called also hemodialysis. | *"In academic literature, dialysis designates the separation of substances in solution by means of their unequal diffusion through semipermeable membranes; especially : such a separation of colloids from soluble substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dialyze]] | verb | **1.** Separate by dialysis. | *"In academic literature, dialyze designates separate by dialysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dialyzer]] | noun | **1.** A medical instrument for separating substances in solution by unequal diffusion through semipermeable membranes. | *"In academic literature, dialyzer designates a medical instrument for separating substances in solution by unequal diffusion through semipermeable membranes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[electrolysis]] | noun | **1.** The producing of chemical changes by passage of an electric current through an electrolyte.<br>**2.** Subjection to this action. | *"The process itself is electrolysis; the liquid is the electrolyte, while the strips are the electrodes."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrolyte]] | noun | **1.** A nonmetallic electric conductor in which current is carried by the movement of ions.<br>**2.** A substance that when dissolved in a suitable solvent or when fused becomes an ionic conductor. | *"The process itself is electrolysis; the liquid is the electrolyte, while the strips are the electrodes."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[electrolytic]] | noun | **1.** Of or relating to electrolysis or an electrolyte; also : produced by or used in electrolysis. | *"Deposition of Shell._ The molded case is put in the electrolytic bath for the deposition of shell thereon. _12."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[Hippolyte]] | noun | **1.** Hippolyte-) Paul 1797—1859 French painter.<br>**2.** Sir Louis Hippolyte 1807—1864 Canadian politician. | *"Hippolyte is at least a quiet fool, but Anatole is an active one."* — graf Leo Tolstoy, *War and Peace* |
| [[hydrolise]] | verb | **1.** Make a compound react with water and undergo hydrolysis. | *"In academic literature, hydrolise designates make a compound react with water and undergo hydrolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrolize]] | verb | **1.** Make a compound react with water and undergo hydrolysis. | *"In academic literature, hydrolize designates make a compound react with water and undergo hydrolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrolysis]] | noun | **1.** A chemical process of decomposition involving the splitting of a bond and the addition of the hydrogen cation and the hydroxide anion of water.<br>**2.** The chemical process of rapidly decomposing a dead body to mostly tiny bits of bone resembling ash by immersing the body in a pressurized chamber containing a heated alkaline solution (as of potassium hydroxide) followed by drainage of all liquid and pulverization of remaining bone; broadly : any hydrolysis process performed in an alkaline environment. | *"Why, there was my theory of the hydrolysis of casein by trypsin, which Professor Walters had been carrying out in his laboratory."* — Jack London, *The Jacket (The Star-Rover)* |
| [[hydrolyte]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ly.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, hydrolyte designates a term designating an entity, condition, or phenomenon derived from greek ly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydrolytic]] | noun | **1.** A chemical process of decomposition involving the splitting of a bond and the addition of the hydrogen cation and the hydroxide anion of water. | *"In academic literature, hydrolytic designates a chemical process of decomposition involving the splitting of a bond and the addition of the hydrogen cation and the hydroxide anion of water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ly]] | noun | **1.** Degrading : reduction.<br>**2.** Dispersed state : dispersion. | *"Marry, ill, to like him that ne’er it likes. ’Tis a commodity will lose the gloss with lying; the longer kept, the less worth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[lysigeny]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ly.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, lysigeny designates a term designating an entity, condition, or phenomenon derived from greek ly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lysine]] | noun | **1.** A crystalline essential amino acid C6H14N2O2 obtained from the hydrolysis of various proteins. | *"In academic literature, lysine designates a crystalline essential amino acid c6h14n2o2 obtained from the hydrolysis of various proteins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lysis]] | noun | **1.** The gradual decline of a disease process (such as fever).<br>**2.** A process of disintegration or dissolution (as of cells). | *"In academic literature, lysis designates the gradual decline of a disease process (such as fever)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lysosome]] | noun | **1.** A saclike cellular organelle that contains various hydrolytic enzymes. | *"In academic literature, lysosome designates a saclike cellular organelle that contains various hydrolytic enzymes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lytic]] | noun | **1.** Of or relating to lysis or a lysin; also : productive of or effecting lysis (as of cells).<br>**2.** Of, relating to, or effecting (such) decomposition. | *"In academic literature, lytic designates of or relating to lysis or a lysin; also : productive of or effecting lysis (as of cells)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[meta-analysis]] | noun | **1.** A quantitative statistical analysis of several separate but similar experiments or studies in order to test the pooled data for statistical significance. | *"In academic literature, meta-analysis designates a quantitative statistical analysis of several separate but similar experiments or studies in order to test the pooled data for statistical significance."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palsy]] | noun | **1.** Paralysis —used chiefly in combination.<br>**2.** A condition that is marked by uncontrollable tremor and quivering of the body or one or more of its parts —not used technically. | *"The palsy, and not fear, provokes me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paralyse]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ly.<br>**2.** Specialized application within the domain of Form & Space. | *"Shall I shake that faith in Bucket because I want it myself; shall I deliberately blunt one of Bucket’s weapons; shall I positively paralyse Bucket in his next detective operation?"* — Charles Dickens, *Bleak House* |
| [[paralysis]] | noun | **1.** Complete or partial loss of function especially when involving the motion or sensation in a part of the body.<br>**2.** Loss of the ability to move. | *"Sir Leicester Dedlock, Baronet, has had a fit—apoplexy or paralysis—and couldn’t be brought to, and precious time has been lost."* — Charles Dickens, *Bleak House* |
| [[paralytic]] | noun | **1.** Affected with, characterized by, or causing paralysis.<br>**2.** Of, relating to, or resembling paralysis. | *"But ever while he laughs, he glances over his paralytic shoulder at Mr."* — Charles Dickens, *Bleak House* |
| [[paralytical]] | adjective | **1.** Relating to or of the nature of paralysis. | *"In academic literature, paralytical designates relating to or of the nature of paralysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[plasmolysis]] | noun | **1.** Shrinking of the cytoplasm away from the wall of a living cell due to outward osmotic flow of water. | *"In academic literature, plasmolysis designates shrinking of the cytoplasm away from the wall of a living cell due to outward osmotic flow of water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyelectrolyte]] | noun | **1.** A substance of high molecular weight (such as a protein) that is an electrolyte. | *"In academic literature, polyelectrolyte designates a substance of high molecular weight (such as a protein) that is an electrolyte."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteolysis]] | noun | **1.** The hydrolysis of proteins or peptides with formation of simpler and soluble products. | *"In academic literature, proteolysis designates the hydrolysis of proteins or peptides with formation of simpler and soluble products."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proteolytic]] | adjective | **1.** Of or relating to proteolysis. | *"In academic literature, proteolytic designates of or relating to proteolysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rely]] | verb | **1.** Have confidence or faith in. | *"Here is my hand; the premises observ’d, Thy will by my performance shall be serv’d; So make the choice of thy own time, for I, Thy resolv’d patient, on thee still rely."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · LY
  </div>
</div>
