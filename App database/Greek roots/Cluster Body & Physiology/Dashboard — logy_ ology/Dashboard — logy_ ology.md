---
status: unread
type: root_dashboard
---
# Dashboard — logy_ ology
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">logy_ ology</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“Discourse; learn”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'Discourse; learn'.</span>
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

The Greek root **logy_ ology** (*logy_ ology*) signifies Discourse; learn. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *trilogy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: Discourse; learn
> The Greek root **logy_ ology** fundamentally denotes **Discourse; learn**. The physical sensory observation and cognitive anchor underlying 'Discourse; learn'. In classical Greek antiquity, the root denoted 'Discourse; learn', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Discourse; learn</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'Discourse; learn'.</mark>
> - **Everyday Connection**: Think of familiar words like *trilogy*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **logy_ ology** derives from Ancient Greek **logy_ ology**, meaning "Discourse; learn".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with logy_ ology**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'Discourse; learn'.
  - Whenever you see **logy_ ology** in an English word, think immediately of **Discourse; learn**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see **logy_ ology**, think of Discourse; learn.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `logy_ ology-` (from **logy_ ology**).
> - **Combining Stem with -o- Connective:** `logy_ ologyo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Logy_ ology
> - **1. Direct & Concrete Anchor:** Literal instantiation of Discourse; learn in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on logy_ ology

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `logy_ ology-` | [[trilogy]] | Primary root semantic foundation denoting Discourse; learn. |
| **Connecting -o-** | `logy_ ologyo-` | [[logy_ ology]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `logy_ ology` | [[logy_ ology]] | Relational or directional modification of the core root sense. |

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
| [[aerology]] | noun | **1.** Meteorology of the total extent of the atmosphere; especially the upper layers. | *"In academic literature, aerology designates meteorology of the total extent of the atmosphere; especially the upper layers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[agrology]] | noun | **1.** Science of soils in relation to crops. | *"In academic literature, agrology designates science of soils in relation to crops."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[algology]] | noun | **1.** The branch of botany that studies algae. | *"In academic literature, algology designates the branch of botany that studies algae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analogy]] | noun | **1.** An inference that if things agree in some respects they probably agree in others.<br>**2.** Drawing a comparison in order to show a similarity in some respect. | *"The sweet scenes of autumn were for a while put by, unless some tender sonnet, fraught with the apt analogy of the declining year, with declining happiness, and the images of youth and hope, and spring, all gone together, blessed her memory."* — Jane Austen, *Persuasion* |
| [[apology]] | noun | **1.** An expression of regret at having caused trouble for someone.<br>**2.** A formal written defense of something you believe in strongly. | *"That you will take your instant leave o’ the king, And make this haste as your own good proceeding, Strengthen’d with what apology you think May make it probable need."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[axiology]] | noun | **1.** The study of values and value judgments. | *"In academic literature, axiology designates the study of values and value judgments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biology]] | noun | **1.** The science that studies living organisms.<br>**2.** Characteristic life processes and phenomena of living organisms. | *"Every day he seemed to become more interested in biology, and his name appeared once or twice in some of the scientific reviews in connection with certain curious experiments."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[bugology]] | noun | **1.** The branch of zoology that studies insects. | *"In academic literature, bugology designates the branch of zoology that studies insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cytology]] | noun | **1.** The branch of biology that studies the structure and function of cells. | *"In academic literature, cytology designates the branch of biology that studies the structure and function of cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[doxology]] | noun | **1.** A hymn or verse in christian liturgy glorifying god. | *"Of course a great many hymns are mere copies, and poor copies; but the Hymn Book at its best is a collection of first-hand records of experience.[33] In the story of the Christian Church doxology comes before dogma."* — T. R. Glover, *The Jesus of History* |
| [[ecology]] | noun | **1.** The environment as it relates to living organisms.<br>**2.** The branch of biology concerned with the relations between organisms and their environment. | *"In academic literature, ecology designates the environment as it relates to living organisms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enology]] | noun | **1.** The art of wine making. | *"In academic literature, enology designates the art of wine making."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ethology]] | noun | **1.** The branch of zoology that studies the behavior of animals in their natural habitats. | *"In academic literature, ethology designates the branch of zoology that studies the behavior of animals in their natural habitats."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[etiology]] | noun | **1.** The cause of a disease.<br>**2.** The philosophical study of causation. | *"In academic literature, etiology designates the cause of a disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eulogist]] | noun | **1.** An orator who delivers eulogies or panegyrics. | *"When the time does come, it will suffice if a kind eulogist will say for me, as one said for Grant, "Let his faults … be writ in water." Lige, my condition came about slowly."* — Jewell Ellen Smith, *Great Jehoshaphat and Gully Dirt!* |
| [[eulogy]] | noun | **1.** A formal expression of praise for someone who has died recently.<br>**2.** A formal expression of praise. | *"It is remarkable how little of the adjective there is--no compliment, no eulogy, no heroic touches, no sympathetic turn of phrase, no great passages of encomium or commendation."* — T. R. Glover, *The Jesus of History* |
| [[fetology]] | noun | **1.** The branch of medicine concerned with the fetus in the uterus. | *"In academic literature, fetology designates the branch of medicine concerned with the fetus in the uterus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geology]] | noun | **1.** A science that deals with the history of the earth as recorded in rocks. | *"The details as to our metal stores are too complex for fuller treatment here, and may be found in treatises on economic geology or on industrial geography."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[homology]] | noun | **1.** The quality of being similar or corresponding in position or value or structure or function. | *"In academic literature, homology designates the quality of being similar or corresponding in position or value or structure or function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[horology]] | noun | **1.** The art of designing and making clocks. | *"In academic literature, horology designates the art of designing and making clocks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ideology]] | noun | **1.** An orientation that characterizes the thinking of a group or nation.<br>**2.** Imaginary or visionary theorization. | *"In academic literature, ideology designates an orientation that characterizes the thinking of a group or nation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logical]] | adjective | **1.** Capable of or reflecting the capability for correct and valid reasoning.<br>**2.** Based on known statements or events or conditions. | *"Within the remote depths of his constitution, so gentle and affectionate as he was in general, there lay hidden a hard logical deposit, like a vein of metal in a soft loam, which turned the edge of everything that attempted to traverse it."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[misology]] | noun | **1.** Hatred of reasoning. | *"In academic literature, misology designates hatred of reasoning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mixology]] | noun | **1.** Skill in preparing mixed drinks. | *"In academic literature, mixology designates skill in preparing mixed drinks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[mycology]] | noun | **1.** The branch of botany that studies fungi and fungus-caused diseases. | *"In academic literature, mycology designates the branch of botany that studies fungi and fungus-caused diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[myology]] | noun | **1.** The branch of physiology that studies muscles. | *"In academic literature, myology designates the branch of physiology that studies muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neology]] | noun | **1.** A newly invented word or phrase.<br>**2.** The act of inventing a word or phrase. | *"In academic literature, neology designates a newly invented word or phrase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[nosology]] | noun | **1.** The branch of medical science dealing with the classification of disease. | *"In academic literature, nosology designates the branch of medical science dealing with the classification of disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oenology]] | noun | **1.** The art of wine making. | *"In academic literature, oenology designates the art of wine making."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oncology]] | noun | **1.** The branch of medicine concerned with the study and treatment of tumors. | *"In academic literature, oncology designates the branch of medicine concerned with the study and treatment of tumors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ontology]] | noun | **1.** (computer science) a rigorous and exhaustive organization of some knowledge domain that is usually hierarchical and contains all the relevant entities and their relations.<br>**2.** The metaphysical study of the nature of being and existence. | *"Ontology needed 129:21 We must abandon pharmaceutics, and take up ontol- ogy, - "the science of real being." We must look deep into realism instead of accepting only the out- 129:24 ward sense of things."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[oology]] | noun | **1.** The branch of zoology that studies eggs (especially birds' eggs and their size, shape, coloration, and number). | *"In academic literature, oology designates the branch of zoology that studies eggs (especially birds' eggs and their size, shape, coloration, and number)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orology]] | noun | **1.** The science of mountains. | *"In academic literature, orology designates the science of mountains."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[otology]] | noun | **1.** The branch of medicine concerned with the ear. | *"In academic literature, otology designates the branch of medicine concerned with the ear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pedology]] | noun | **1.** The branch of medicine concerned with the treatment of infants and children. | *"In academic literature, pedology designates the branch of medicine concerned with the treatment of infants and children."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[penology]] | noun | **1.** The branch of criminology concerned with prison management and prisoner rehabilitation. | *"In academic literature, penology designates the branch of criminology concerned with prison management and prisoner rehabilitation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomology]] | noun | **1.** The branch of botany that studies and cultivates fruits. | *"In academic literature, pomology designates the branch of botany that studies and cultivates fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[posology]] | noun | **1.** The pharmacological determination of appropriate doses of drugs and medicines. | *"In academic literature, posology designates the pharmacological determination of appropriate doses of drugs and medicines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[rheology]] | noun | **1.** The branch of physics that studies the deformation and flow of matter. | *"In academic literature, rheology designates the branch of physics that studies the deformation and flow of matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[serology]] | noun | **1.** The branch of medical science that deals with serums; especially with blood serums and disease. | *"In academic literature, serology designates the branch of medical science that deals with serums; especially with blood serums and disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sinology]] | noun | **1.** The study of chinese history and language and culture. | *"In academic literature, sinology designates the study of chinese history and language and culture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theology]] | noun | **1.** The rational and systematic study of religion and its influences and of the nature of religious truth.<br>**2.** A particular system or school of religious beliefs and teachings. | *"Some people might have cried “Alas, poor Theology!” at the hideous defacement—the last grotesque phase of a creed which had served mankind well in its time."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[tocology]] | noun | **1.** The branch of medicine dealing with childbirth and care of the mother. | *"In academic literature, tocology designates the branch of medicine dealing with childbirth and care of the mother."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[topology]] | noun | **1.** Topographic study of a given place (especially the history of the place as indicated by its topography).<br>**2.** The study of anatomy based on regions or divisions of the body and emphasizing the relations between various structures (muscles and nerves and arteries etc.) in that region. | *"In academic literature, topology designates topographic study of a given place (especially the history of the place as indicated by its topography)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trilogy]] | noun | **1.** A set of three literary or dramatic works related in subject or theme. | *"In academic literature, trilogy designates a set of three literary or dramatic works related in subject or theme."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[typology]] | noun | **1.** Classification according to general type. | *"In academic literature, typology designates classification according to general type."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urology]] | noun | **1.** The branch of medicine that deals with the diagnosis and treatment of disorders of the urinary tract or urogenital system. | *"In academic literature, urology designates the branch of medicine that deals with the diagnosis and treatment of disorders of the urinary tract or urogenital system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[virology]] | noun | **1.** The branch of medical science that studies viruses and viral diseases. | *"In academic literature, virology designates the branch of medical science that studies viruses and viral diseases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoology]] | noun | **1.** All the animal life in a particular region or period.<br>**2.** The branch of biology that studies animals. | *"No branch of Zoology is so much involved as that which is entitled Cetology,” says Captain Scoresby, A."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[zymology]] | noun | **1.** The branch of chemistry concerned with fermentation (as in making wine or brewing or distilling). | *"In academic literature, zymology designates the branch of chemistry concerned with fermentation (as in making wine or brewing or distilling)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Body & Physiology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · LOGY_ OLOGY
  </div>
</div>
