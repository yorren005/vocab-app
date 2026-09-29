---
status: unread
type: root_dashboard
---
# Dashboard — peri
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">περί (perí)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“around”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'around'.</span>
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

The Greek root **peri** (περί (perí)) signifies around. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Pericles*, *peri 2*, *peri*, *pericope*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: around
> The Greek root **peri** fundamentally denotes **around**. The physical sensory observation and cognitive anchor underlying 'around'. In classical Greek antiquity, the root denoted 'around', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">around</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'around'.</mark>
> - **Everyday Connection**: Think of familiar words like *Pericles*, *peri 2*, *peri*, *pericope*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **peri** derives from Ancient Greek <mark class="hl-stem">περί (perí)</mark>, meaning "around".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with peri**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'around'.
  - Whenever you see **peri** in an English word, think immediately of **around**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">peri</mark>, think of <mark class="hl-def">around</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `peri-` (from *περί (perí)*).
> - **Combining Stem with -o- Connective:** `perio-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Peri
> - **1. Direct & Concrete Anchor:** Literal instantiation of around in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on peri

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `peri-` | [[Pericles]] | Primary root semantic foundation denoting around. |
| **Connecting -o-** | `perio-` | [[peri 2]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `peri` | [[peri]] | Relational or directional modification of the core root sense. |

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
| [[aperient]] | noun | **1.** A purging medicine; stimulates evacuation of the bowels.<br>**2.** Mildly laxative. | *"In academic literature, aperient designates a purging medicine; stimulates evacuation of the bowels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aperiodic]] | adjective | **1.** Not recurring at regular intervals. | *"In academic literature, aperiodic designates not recurring at regular intervals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[aperitif]] | noun | **1.** Alcoholic beverage taken before a meal as an appetizer. | *"In academic literature, aperitif designates alcoholic beverage taken before a meal as an appetizer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[experience]] | noun | **1.** The accumulation of knowledge or skill that results from direct participation in events or activities.<br>**2.** The content of direct observation or participation in an event. | *"I have, then, sinned against his experience and transgressed against his valour; and my state that way is dangerous, since I cannot yet find in my heart to repent."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[experienced]] | verb | **1.** Go or live through.<br>**2.** Have firsthand knowledge of states, situations, emotions, or sensations. | *"As thou wilt live, fly after: and like an arrow shot From a well-experienced archer hits the mark His eye doth level at, so thou ne’er return Unless thou say ‘Prince Pericles is dead.’ THALIARD."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[experient]] | adjective | **1.** Having experience; having knowledge or skill from observation or participation. | *"In academic literature, experient designates having experience; having knowledge or skill from observation or participation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[experiential]] | adjective | **1.** Relating to or resulting from experience.<br>**2.** Derived from experience or the experience of existence; - benjamin farrington; - john dewey. | *"I had, both directly and by implication, combated that form of the experiential theory of human knowledge which characterizes Mr."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[experiment]] | noun | **1.** The act of conducting a controlled test or investigation.<br>**2.** The testing of an idea. | *"Dear sir, to my endeavours give consent; Of heaven, not me, make an experiment."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[experimental]] | adjective | **1.** Relating to or based on experiment.<br>**2.** Relying on observation or experiment. | *"Call me a fool; Trust not my reading nor my observations, Which with experimental seal doth warrant The tenure of my book; trust not my age, My reverence, calling, nor divinity, If this sweet lady lie not guiltless here Under some biting error."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[experimentalism]] | noun | **1.** An empirical doctrine that advocates experimental principles.<br>**2.** An orientation that favors experimentation and innovation. | *"In academic literature, experimentalism designates an empirical doctrine that advocates experimental principles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[experimentally]] | adverb | **1.** In an experimental fashion. | *"A number of different measures are being experimentally tested and applied."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[experimentation]] | noun | **1.** The testing of an idea.<br>**2.** The act of conducting a controlled test or investigation. | *"There are unused materials and opportunities, but the initial expense of experimentation, the initial difficulties of gathering and training a working force, are discouraging to individual enterprise, prices being as they are."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[experimenter]] | noun | **1.** A research worker who conducts experiments.<br>**2.** A person who enjoys testing innovative ideas. | *"She was an inveterate experimenter in these things."* — Mark Twain, *The Adventures of Tom Sawyer, Complete* |
| [[peri]] | noun | **1.** A supernatural being in Persian folklore descended from fallen angels and excluded from paradise until penance is accomplished.<br>**2.** A beautiful and graceful girl. | *"He had already withdrawn his eye from the Peri, and was looking at a humble tuft of daisies which grew by the wicket."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[peri 2]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek peri.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, peri 2 designates a term designating an entity, condition, or phenomenon derived from greek peri."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periactin]] | noun | **1.** An antihistamine (trade name periactin) used to treat some allergic reactions. | *"In academic literature, periactin designates an antihistamine (trade name periactin) used to treat some allergic reactions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perianal]] | adjective | **1.** Around the anus. | *"In academic literature, perianal designates around the anus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perianth]] | noun | **1.** The floral structure comprised of the calyx and corolla especially when the two whorls are fused. | *"In academic literature, perianth designates the floral structure comprised of the calyx and corolla especially when the two whorls are fused."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periapsis]] | noun | **1.** (astronomy) the point in an orbit closest to the body being orbited. | *"In academic literature, periapsis designates (astronomy) the point in an orbit closest to the body being orbited."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periarteritis]] | noun | **1.** Inflammation of the outer coat of an artery. | *"In academic literature, periarteritis designates inflammation of the outer coat of an artery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericallis]] | noun | **1.** Cineraria. | *"In academic literature, pericallis designates cineraria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericardiac]] | adjective | **1.** Located around the heart or relating to or affecting the pericardium. | *"In academic literature, pericardiac designates located around the heart or relating to or affecting the pericardium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericardial]] | adjective | **1.** Located around the heart or relating to or affecting the pericardium. | *"In academic literature, pericardial designates located around the heart or relating to or affecting the pericardium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericarditis]] | noun | **1.** Inflammation of the pericardium. | *"In academic literature, pericarditis designates inflammation of the pericardium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericardium]] | noun | **1.** The conical sac of serous membrane that encloses the heart and the roots of the great blood vessels of vertebrates.<br>**2.** A cavity or space that contains the heart of an invertebrate and in arthropods is a part of the hemocoel. | *"In academic literature, pericardium designates the conical sac of serous membrane that encloses the heart and the roots of the great blood vessels of vertebrates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericarp]] | noun | **1.** The ripened and variously modified walls of a plant ovary composed of an outer exocarp, middle mesocarp, and inner endocarp layer. | *"In academic literature, pericarp designates the ripened and variously modified walls of a plant ovary composed of an outer exocarp, middle mesocarp, and inner endocarp layer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericementoclasia]] | noun | **1.** Pus pocket formation around a tooth. | *"In academic literature, pericementoclasia designates pus pocket formation around a tooth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periclase]] | noun | **1.** A white solid mineral that occurs naturally as periclase; a source of magnesium. | *"In academic literature, periclase designates a white solid mineral that occurs naturally as periclase; a source of magnesium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Pericles]] | noun | **1.** Circa 495—429 b.c. Athenian statesman. | *"On board Pericles’ ship, off Mytilene Scene II."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pericles]] | noun | **1.** Athenian statesman whose leadership contributed to athens' political and cultural supremacy in greece; he ordered the construction of the parthenon (died in 429 bc). | *"In academic literature, pericles designates **1.** athenian statesman whose leadership contributed to athens' political and cultural supremacy in greece; he ordered the construction of the parthenon (died in 429 bc)."* — Academic Lexicon |
| [[pericope]] | noun | **1.** A selection from a book; specifically : lection. | *"In academic literature, pericope designates a selection from a book; specifically : lection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peridium]] | noun | **1.** The outer envelope of the sporophore of many fungi. | *"Without staying to enumerate the characteristics of these orders, we select one in which the spores are enclosed in a distinct peridium, as in our typical plant they are contained within the cups."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[perigee]] | noun | **1.** The point in the orbit of an object (such as a satellite) orbiting the earth that is nearest to the center of the earth; also : the point nearest a planet or a satellite (such as the moon) reached by an object orbiting it. | *"In academic literature, perigee designates the point in the orbit of an object (such as a satellite) orbiting the earth that is nearest to the center of the earth; also : the point nearest a planet or a satellite (such as the moon) reached by an object orbiting it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perihelion]] | noun | **1.** The point nearest to the sun in the path of an orbiting celestial body (such as a planet). | *"In academic literature, perihelion designates the point nearest to the sun in the path of an orbiting celestial body (such as a planet)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peril]] | noun | **1.** A source of danger; a possibility of incurring loss or misfortune.<br>**2.** A state of danger involving risk. | *"But what at full I know, thou know’st no part; I knowing all my peril, thou no art."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perilla]] | noun | **1.** Small genus of asiatic herbs. | *"In academic literature, perilla designates small genus of asiatic herbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perilous]] | adjective | **1.** Fraught with danger. | *"Then on good ground we fear, If we do fear this body hath a tail More perilous than the head."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perilously]] | adverb | **1.** In a dangerous manner. | *"Once, however, as he used to tell, it brought him perilously near to disaster."* — John Cairns, *Principal Cairns* |
| [[perilousness]] | noun | **1.** The state of being dangerous. | *"In academic literature, perilousness designates the state of being dangerous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perilune]] | noun | **1.** Periapsis in orbit around the moon. | *"In academic literature, perilune designates periapsis in orbit around the moon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perilymph]] | noun | **1.** The bodily fluid that fills the space between the bony labyrinth and the membranous labyrinth of the inner ear. | *"In academic literature, perilymph designates the bodily fluid that fills the space between the bony labyrinth and the membranous labyrinth of the inner ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perimeter]] | noun | **1.** The boundary of a closed plane figure.<br>**2.** The length of a perimeter. | *"Reaching the depot's perimeter was less of a problem than he had anticipated."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[perimysium]] | noun | **1.** The connective-tissue sheath that surrounds a muscle and forms sheaths for the bundles of muscle fibers. | *"In academic literature, perimysium designates the connective-tissue sheath that surrounds a muscle and forms sheaths for the bundles of muscle fibers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perinasal]] | adjective | **1.** Near the nose. | *"In academic literature, perinasal designates near the nose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perinatal]] | adjective | **1.** Occurring during the period around birth (5 months before and 1 month after). | *"In academic literature, perinatal designates occurring during the period around birth (5 months before and 1 month after)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perinatologist]] | noun | **1.** An obstetrician specializing in perinatology. | *"In academic literature, perinatologist designates an obstetrician specializing in perinatology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perinatology]] | noun | **1.** The branch of obstetrics concerned with the anatomy and physiology and diagnosis and treatment of disorders of the mother and the fetus or newborn baby during late pregnancy and childbirth and the puerperium. | *"In academic literature, perinatology designates the branch of obstetrics concerned with the anatomy and physiology and diagnosis and treatment of disorders of the mother and the fetus or newborn baby during late pregnancy and childbirth and the puerperium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perineal]] | adjective | **1.** Of or relating to the perineum. | *"On the third day of his seclusion a small feast is prepared by his friends, who also fashion some new perineal bands for him."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[perineotomy]] | noun | **1.** Surgical incision into the perineum. | *"In academic literature, perineotomy designates surgical incision into the perineum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perineum]] | noun | **1.** The general region between the anus and the genital organs. | *"In academic literature, perineum designates the general region between the anus and the genital organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perineurium]] | noun | **1.** The connective-tissue sheath that surrounds a bundle of nerve fibers. | *"In academic literature, perineurium designates the connective-tissue sheath that surrounds a bundle of nerve fibers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[period]] | noun | **1.** The completion of a cycle, a series of events, or a single action : conclusion.<br>**2.** An utterance from one full stop to another : sentence. | *"Tend me tonight; May be it is the period of your duty."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[periodic]] | noun | **1.** Occurring or recurring at regular intervals.<br>**2.** Occurring repeatedly from time to time. | *"He makes periodic efforts to find me, but my lawyers are loyal, and will give no clue." "And the settlement?"* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[periodical]] | noun | **1.** A publication that appears at fixed intervals.<br>**2.** Happening or recurring at regular intervals. | *"The periodical visits of the trooper to these rooms, however, in the course of his patrolling is an assurance of protection and company both to mistress and maid, which renders them very acceptable in the small hours of the night."* — Charles Dickens, *Bleak House* |
| [[periodically]] | adverb | **1.** In a sporadic manner. | *"I have him periodically in a vice."* — Charles Dickens, *Bleak House* |
| [[periodicity]] | noun | **1.** The quality of recurring at regular intervals. | *"Consequently, to distinguish the comparatively slowly changing currents of a "frequency" or "periodicity" of a few hundreds per second from these much more rapid ones, the latter are more often spoken of as electrical oscillations."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[periodontal]] | noun | **1.** Investing or surrounding a tooth.<br>**2.** Of or affecting periodontal tissues or regions. | *"In academic literature, periodontal designates investing or surrounding a tooth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periodontia]] | noun | **1.** The branch of dentistry dealing with diseases of the gums and other structures around the teeth. | *"In academic literature, periodontia designates the branch of dentistry dealing with diseases of the gums and other structures around the teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periodontic]] | adjective | **1.** Of or relating to or involving or practicing periodontics. | *"In academic literature, periodontic designates of or relating to or involving or practicing periodontics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periodontics]] | noun | **1.** A branch of dentistry that deals with diseases of the supporting and investing structures of the teeth including the gums, cementum, periodontal membranes, and alveolar bone. | *"In academic literature, periodontics designates a branch of dentistry that deals with diseases of the supporting and investing structures of the teeth including the gums, cementum, periodontal membranes, and alveolar bone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periodontist]] | noun | **1.** A dentist specializing in diseases of the gums and other structure surrounding the teeth. | *"In academic literature, periodontist designates a dentist specializing in diseases of the gums and other structure surrounding the teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periodontitis]] | noun | **1.** A disease that attacks the gum and bone and around the teeth. | *"In academic literature, periodontitis designates a disease that attacks the gum and bone and around the teeth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periophthalmus]] | noun | **1.** A genus of gobiidae. | *"In academic literature, periophthalmus designates a genus of gobiidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periosteum]] | noun | **1.** The membrane of connective tissue that closely invests all bones except at the articular surfaces. | *"In academic literature, periosteum designates the membrane of connective tissue that closely invests all bones except at the articular surfaces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peripheral]] | noun | **1.** (computer science) electronic equipment connected by cable to the cpu of a computer.<br>**2.** On or near an edge or constituting an outer boundary; the outer area. | *"Generally familiar with the schematics of the Slingshot stations, he was overwhelmed by the two enormous cones and their peripherals, which configured the Terminals' hoppers."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[peripherally]] | adverb | **1.** In or at or near a periphery or according to a peripheral role or function or relationship. | *"In academic literature, peripherally designates in or at or near a periphery or according to a peripheral role or function or relationship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periphery]] | noun | **1.** The perimeter of a circle or other closed curve; also : the perimeter of a polygon.<br>**2.** The external boundary or surface of a body. | *"Without having passed through the wall of skull, nevertheless it seemed to me that the periphery of my brain was already outside my skull and still expanding."* — Jack London, *The Jacket (The Star-Rover)* |
| [[perirhinal]] | adjective | **1.** Near the nose. | *"In academic literature, perirhinal designates near the nose."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[periscope]] | noun | **1.** A tubular optical instrument containing lenses and mirrors by which an observer obtains an otherwise obstructed field of view. | *"This time there was no chance of damaging the motive power, but we could make the pilot wish he had a periscope."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[periselene]] | noun | **1.** Periapsis in orbit around the moon. | *"In academic literature, periselene designates periapsis in orbit around the moon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perish]] | verb | **1.** Pass from physical life and lose all bodily attributes and functions necessary to sustain life. | *"Most meet That first we come to words, and therefore have we Our written purposes before us sent, Which if thou hast considered, let us know If ’twill tie up thy discontented sword And carry back to Sicily much tall youth That else must perish here."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[perishability]] | noun | **1.** Unsatisfactoriness by virtue of being subject to decay or spoilage or destruction. | *"In academic literature, perishability designates unsatisfactoriness by virtue of being subject to decay or spoilage or destruction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perishable]] | noun | **1.** Food that will decay rapidly if not refrigerated.<br>**2.** Liable to perish; subject to destruction or death or decay. | *"A woman’s good name is such a perishable article that—” Bathsheba laughed with a flushed cheek, and whispered in Liddy’s ear, although there was nobody present."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[perishableness]] | noun | **1.** Unsatisfactoriness by virtue of being subject to decay or spoilage or destruction. | *"In academic literature, perishableness designates unsatisfactoriness by virtue of being subject to decay or spoilage or destruction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perisher]] | noun | **1.** Bounder. | *"Classical and authoritative lexicons catalog perisher as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perisoreus]] | noun | **1.** Canada jays. | *"In academic literature, perisoreus designates canada jays."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perisperm]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek sperm.<br>**2.** Specialized application within the domain of Life & Vitality. | *"In academic literature, perisperm designates a term designating an entity, condition, or phenomenon derived from greek sperm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perissodactyl]] | noun | **1.** Any of an order (Perissodactyla) of nonruminant ungulate mammals (such as a horse, a tapir, or a rhinoceros) that usually have an odd number of toes, molar teeth with transverse ridges on the grinding surface, and the posterior premolars resembling true molars. | *"In academic literature, perissodactyl designates any of an order (perissodactyla) of nonruminant ungulate mammals (such as a horse, a tapir, or a rhinoceros) that usually have an odd number of toes, molar teeth with transverse ridges on the grinding surface, and the posterior premolars resembling true molars."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perissodactyla]] | noun | **1.** Nonruminant ungulates: horses; tapirs; rhinoceros; extinct forms. | *"In academic literature, perissodactyla designates nonruminant ungulates: horses; tapirs; rhinoceros; extinct forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peristalsis]] | noun | **1.** Successive waves of involuntary contraction passing along the walls of a hollow muscular structure (such as the esophagus or intestine) and forcing the contents onward. | *"In academic literature, peristalsis designates successive waves of involuntary contraction passing along the walls of a hollow muscular structure (such as the esophagus or intestine) and forcing the contents onward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peristediinae]] | noun | **1.** In some classifications considered a subfamily of triglidae comprising the armored searobins. | *"In academic literature, peristediinae designates in some classifications considered a subfamily of triglidae comprising the armored searobins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peristedion]] | noun | **1.** In some classifications the type genus of the subfamily peristediinae: armored sea robins. | *"In academic literature, peristedion designates in some classifications the type genus of the subfamily peristediinae: armored sea robins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peristome]] | noun | **1.** (botany) fringe of toothlike appendages surrounding the mouth of a moss capsule.<br>**2.** Region around the mouth in various invertebrates. | *"The teeth thus formed resemble those of the peristome of some mosses."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[peristylar]] | adjective | **1.** Having columniation completely circling an area of the structure. | *"In academic literature, peristylar designates having columniation completely circling an area of the structure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peristyle]] | noun | **1.** A colonnade surrounding a building or court.<br>**2.** An open space enclosed by a colonnade. | *"In academic literature, peristyle designates a colonnade surrounding a building or court."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perithecium]] | noun | **1.** Flask-shaped ascocarp. | *"Very common. (Plate XI. figs. 240-242.) CHÆTOMIUM, _Kze._ Perithecium thin, brittle, mouthless; sporangia linear, containing dark lemon-shaped spores. _Berk."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[perithelial]] | adjective | **1.** Of or relating to the tissue layer around small blood vessels. | *"In academic literature, perithelial designates of or relating to the tissue layer around small blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perithelium]] | noun | **1.** Tissue layer around small blood vessels. | *"In academic literature, perithelium designates tissue layer around small blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peritoneal]] | adjective | **1.** Of or relating to or affecting the peritoneum. | *"Although the former (we are thinking of neglect) is undoubtedly only too true the case he cites of nurses forgetting to count the sponges in the peritoneal cavity is too rare to be normative."* — James Joyce, *Ulysses* |
| [[peritoneum]] | noun | **1.** The smooth transparent serous membrane that lines the cavity of the abdomen of a mammal and is folded inward over the abdominal and pelvic viscera. | *"In academic literature, peritoneum designates the smooth transparent serous membrane that lines the cavity of the abdomen of a mammal and is folded inward over the abdominal and pelvic viscera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peritonitis]] | noun | **1.** Inflammation of the peritoneum. | *"Several years before this time I had undergone an operation which resulted in peritonitis."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[peritrate]] | noun | **1.** A coronary vasodilator (trade name peritrate) used to treat angina pectoris. | *"In academic literature, peritrate designates a coronary vasodilator (trade name peritrate) used to treat angina pectoris."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[peritrichous]] | noun | **1.** Having flagella uniformly distributed over the body.<br>**2.** Having a spiral line of modified cilia around the oral disk. | *"In academic literature, peritrichous designates having flagella uniformly distributed over the body."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PERI
  </div>
</div>
