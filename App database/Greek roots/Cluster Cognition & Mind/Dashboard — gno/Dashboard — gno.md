---
status: unread
type: root_dashboard
---
# Dashboard — gno
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">gno-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“know”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'know'.</span>
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

The Greek root **gno** (γιγνώσκειν γνῶναι γνωτός γνωστός γνωστικός γνῶσις γνῶσμα γνώμη γνώμων (gignṓskein)) signifies know. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Gnostic*, *agnosia*, *agnostic*, *agnosticism*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: know
> The Greek root **gno** fundamentally denotes **know**. The physical sensory observation and cognitive anchor underlying 'know'. In classical Greek antiquity, the root denoted 'know', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">know</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'know'.</mark>
> - **Everyday Connection**: Think of familiar words like *Gnostic*, *agnosia*, *agnostic*, *agnosticism*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gno** derives from Ancient Greek <mark class="hl-stem">γιγνώσκειν γνῶναι γνωτός γνωστός γνωστικός γνῶσις γνῶσμα γνώμη γνώμων (gignṓskein)</mark>, meaning "know".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with gno**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'know'.
  - Whenever you see **gno** in an English word, think immediately of **know**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gno</mark>, think of <mark class="hl-def">know</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `gno-` (from *γιγνώσκειν γνῶναι γνωτός γνωστός γνωστικός γνῶσις γνῶσμα γνώμη γνώμων (gignṓskein)*).
> - **Combining Stem with -o- Connective:** `gnoo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Gno
> - **1. Direct & Concrete Anchor:** Literal instantiation of know in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on gno

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `gno-` | [[Gnostic]] | Primary root semantic foundation denoting know. |
| **Connecting -o-** | `gnoo-` | [[agnosia]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `gno` | [[agnostic]] | Relational or directional modification of the core root sense. |

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
| [[agnosia]] | noun | **1.** Loss or diminution of the ability to recognize familiar objects or stimuli usually as a result of brain damage. | *"In academic literature, agnosia designates loss or diminution of the ability to recognize familiar objects or stimuli usually as a result of brain damage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agnostic]] | noun | **1.** A person who holds the view that any ultimate reality (such as a supreme being) is unknown and probably unknowable; broadly : one who is not committed to believing in either the existence or the nonexistence of God or any gods.<br>**2.** A person who is unwilling to commit to an opinion about something. | *"In academic literature, agnostic designates a person who holds the view that any ultimate reality (such as a supreme being) is unknown and probably unknowable; broadly : one who is not committed to believing in either the existence or the nonexistence of god or any gods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agnostical]] | adjective | **1.** Uncertain of all claims to knowledge. | *"In academic literature, agnostical designates uncertain of all claims to knowledge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agnosticism]] | noun | **1.** An agnostic quality, state, or attitude:.<br>**2.** The view that any ultimate reality (such as a deity) is unknown and probably unknowable : a philosophical or religious position characterized by uncertainty about the existence of a god or any gods. | *"In this age of professed and often, no doubt, affected, agnosticism and pessimism, Browning is the foremost apostle of Hope."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[anagnorisis]] | noun | **1.** The point in the plot especially of a tragedy when the protagonist recognizes a character's true identity or when the protagonist discovers the true nature of their own situation. | *"In academic literature, anagnorisis designates the point in the plot especially of a tragedy when the protagonist recognizes a character's true identity or when the protagonist discovers the true nature of their own situation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diagnosable]] | adjective | **1.** Capable of being diagnosed. | *"In academic literature, diagnosable designates capable of being diagnosed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diagnose]] | verb | **1.** Determine or distinguish the nature of a problem or an illness through a diagnostic analysis.<br>**2.** Subject to a medical analysis. | *"When occasion offered, he would not only diagnose and prescribe but pray at the bedsides of his patients, and his influence was exerted in behalf of everything that was pure and lovely and of good report in the town of Berwick."* — John Cairns, *Principal Cairns* |
| [[diagnosing]] | noun | **1.** Identifying the nature or cause of some phenomenon.<br>**2.** Determine or distinguish the nature of a problem or an illness through a diagnostic analysis. | *"The one unquestioned service of the minimum wage law is that of diagnosing the evil of low wages rather than in remedying it."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[diagnosis]] | noun | **1.** The art or act of identifying a disease from its signs and symptoms.<br>**2.** The decision reached by diagnosis. | *"Mention has already been made, in speaking of Lenau's pathological traits,[104] of his confirmed habit of self-diagnosis."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[diagnostic]] | adjective | **1.** Concerned with diagnosis; used for furthering diagnosis.<br>**2.** Characteristic or indicative of a disease. | *"Besides continuing his membership in the Metaphysical Society, he had also been, since the spring of 1839, a member of the Diagnostic, one of the most flourishing of the older students' debating societies."* — John Cairns, *Principal Cairns* |
| [[dysanagnosia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gno.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, dysanagnosia designates a term designating an entity, condition, or phenomenon derived from greek gno."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gno]] | noun | **1.** Girls' night out. | *"In academic literature, gno designates girls' night out."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gnome]] | noun | **1.** A legendary creature resembling a tiny old man; lives in the depths of the earth and guards buried treasure.<br>**2.** A short pithy saying expressing a general truth. | *"And, Miss Eyre, so much was I flattered by this preference of the Gallic sylph for her British gnome, that I installed her in an hotel; gave her a complete establishment of servants, a carriage, cashmeres, diamonds, dentelles, &c."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[gnomic]] | noun | **1.** Characterized by aphorism.<br>**2.** Given to the composition of gnomic writing. | *"If before going to the d’Urbervilles’ she had vigorously moved under the guidance of sundry gnomic texts and phrases known to her and to the world in general, no doubt she would never have been imposed on."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[gnomon]] | noun | **1.** An object that by the position or length of its shadow serves as an indicator especially of the hour of the day: such as.<br>**2.** The pin of a sundial. | *"In academic literature, gnomon designates an object that by the position or length of its shadow serves as an indicator especially of the hour of the day: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gnomonic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of know. | *"In academic literature, gnomonic designates adjective*) pertaining to, derived from, or characteristic of know."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gnosia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gno.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, gnosia designates a term designating an entity, condition, or phenomenon derived from greek gno."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gnosis]] | noun | **1.** Esoteric knowledge of spiritual truth held by the ancient Gnostics to be essential to salvation. | *"Buddhism, whose awakening is placed under the shelter of the bo or bodhi-tree (_ficus religiosa_), the Buddhist tree of knowledge, bases its existence on gnosis."* — William Edward Soothill, *The lotus of the wonderful law* |
| [[Gnostic]] | noun | **1.** An adherent of gnosticism. | *"Basilides the Gnostic (the father of Isidore) is credited with describing Man as a sort of Wooden Horse with a whole army of different spirits in him (Clem."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[gnostic]] | noun | **1.** An advocate of gnosticism.<br>**2.** Of or relating to gnosticism. | *"In academic literature, gnostic designates **1.** an advocate of gnosticism.<br>**2.** of or relating to gnosticism."* — Academic Lexicon |
| [[gnosticism]] | noun | **1.** The thought and practice especially of various cults of late pre-Christian and early Christian centuries distinguished by the conviction that matter is evil and that emancipation comes through gnosis. | *"Docetism, with its phantom Christ, and Gnosticism with its antithesis of the just God and the good God, were not likely to satisfy mankind."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[pathognomonic]] | noun | **1.** Distinctively characteristic of a particular disease. | *"In your case,” he continued, “the _pathognomonic,_ if you will excuse medical slang, was every now and then broken by the intrusion of altogether foreign symptoms.” I listened with breathless attention."* — George MacDonald, *The Portent and Other Stories* |
| [[physiognomy]] | noun | **1.** The art of discovering temperament and character from outward appearance.<br>**2.** The facial features held to show qualities of mind or character by their configuration or expression. | *"In Ajax and Ulysses, O, what art Of physiognomy might one behold!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prognosis]] | noun | **1.** The prospect of recovery as anticipated from the usual course of disease or peculiarities of the case.<br>**2.** Forecast, prognostication. | *"In a case like that, I'm bound to admit, my prognosis--for the final result--would be most unfavorable."* — Grant Allen, *Michael's Crag* |
| [[prognostic]] | noun | **1.** A sign of something about to happen.<br>**2.** Of or relating to prediction; having value for making predictions. | *"If a man dreams he has lost all the buttons of his clothes, it is a sign he will not live long. =Cards.=--To dream that you are playing at cards is a sure prognostic that you will be in love, and speedily married."* — A. H. Noe, *The Witches' Dream Book; and Fortune Teller* |
| [[prognosticate]] | verb | **1.** Make a prediction about; tell in advance.<br>**2.** Indicate by signs. | *"Various magic ceremonies were then celebrated to counteract the influence of witches and demons, and to prognosticate to the young their success or disappointment in the matrimonial lottery."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[prognostication]] | noun | **1.** A sign of something about to happen.<br>**2.** A statement made about the future. | *"Nay, if an oily palm be not a fruitful prognostication, I cannot scratch mine ear."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[prognosticative]] | adjective | **1.** Of or relating to prediction; having value for making predictions. | *"In academic literature, prognosticative designates of or relating to prediction; having value for making predictions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prognosticator]] | noun | **1.** Someone who makes predictions of the future (usually on the basis of special knowledge). | *"In academic literature, prognosticator designates someone who makes predictions of the future (usually on the basis of special knowledge)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telegnosis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek gno.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, telegnosis designates a term designating an entity, condition, or phenomenon derived from greek gno."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telegnostic]] | adjective | **1.** Obtaining knowledge of distant events allegedly without use of normal sensory mechanisms. | *"In academic literature, telegnostic designates obtaining knowledge of distant events allegedly without use of normal sensory mechanisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[undiagnosable]] | adjective | **1.** Not possible to diagnose. | *"In academic literature, undiagnosable designates not possible to diagnose."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Cognition & Mind]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GNO
  </div>
</div>
