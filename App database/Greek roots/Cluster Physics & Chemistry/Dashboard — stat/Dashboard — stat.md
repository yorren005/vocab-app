---
status: unread
type: root_dashboard
---
# Dashboard — stat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">stat</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“stat”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'stat'.</span>
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

The Greek root **stat** (*stat*) signifies stat. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *hemostasis*, *metastasis*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: stat
> The Greek root **stat** fundamentally denotes **stat**. The physical sensory observation and cognitive anchor underlying 'stat'. In classical Greek antiquity, the root denoted 'stat', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">stat</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'stat'.</mark>
> - **Everyday Connection**: Think of familiar words like *hemostasis*, *metastasis*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **stat** derives from Ancient Greek **stat**, meaning "stat".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with stat**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'stat'.
  - Whenever you see **stat** in an English word, think immediately of **stat**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">stat</mark>, think of <mark class="hl-def">stat</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `stat-` (from **stat**).
> - **Combining Stem with -o- Connective:** `stato-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Stat
> - **1. Direct & Concrete Anchor:** Literal instantiation of stat in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on stat

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `stat-` | [[hemostasis]] | Primary root semantic foundation denoting stat. |
| **Connecting -o-** | `stato-` | [[metastasis]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `stat` | [[stat]] | Relational or directional modification of the core root sense. |

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
| [[anastatica]] | noun | **1.** One species: rose of jericho; resurrection plant. | *"In academic literature, anastatica designates one species: rose of jericho; resurrection plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apostate]] | noun | **1.** One who commits apostasy. | *"Ha-ha—I’m awfully glad you have made an apostate of me all the same!"* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[apostatise]] | verb | **1.** Abandon one's beliefs or allegiances. | *"In academic literature, apostatise designates abandon one's beliefs or allegiances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apostatize]] | verb | **1.** Abandon one's beliefs or allegiances. | *"In academic literature, apostatize designates abandon one's beliefs or allegiances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astatic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of cause to stand. | *"In academic literature, astatic designates adjective*) pertaining to, derived from, or characteristic of cause to stand."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astatine]] | noun | **1.** A radioactive halogen element discovered by bombarding bismuth with alpha particles and also formed by radioactive decay. | *"In academic literature, astatine designates a radioactive halogen element discovered by bombarding bismuth with alpha particles and also formed by radioactive decay."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecstatic]] | noun | **1.** Of, relating to, or marked by ecstasy.<br>**2.** One that is subject to ecstasies. | *"Having seen that it was really her lover who had advanced, and no one else, her lips parted, and she sank upon him in her momentary joy, with something very like an ecstatic cry."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[ecstatically]] | adverb | **1.** In an ecstatic manner. | *"Next comes Nibs, the gay and debonair, followed by Slightly, who cuts whistles out of the trees and dances ecstatically to his own tunes."* — J. M. Barrie, *Peter Pan* |
| [[hemostasis]] | noun | **1.** Arrest of bleeding. | *"In academic literature, hemostasis designates arrest of bleeding."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemostatic]] | adjective | **1.** Tending to check bleeding by contracting the tissues or blood vessels. | *"In academic literature, hemostatic designates tending to check bleeding by contracting the tissues or blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperstat]] | noun | **1.** Vasodilator (trade name hyperstat) used to treat severe hypertension. | *"In academic literature, hyperstat designates vasodilator (trade name hyperstat) used to treat severe hypertension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypostatisation]] | noun | **1.** Regarding something abstract as a material thing. | *"In academic literature, hypostatisation designates regarding something abstract as a material thing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypostatise]] | verb | **1.** Construe as a real existence, of a conceptual entity. | *"In academic literature, hypostatise designates construe as a real existence, of a conceptual entity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypostatization]] | noun | **1.** Regarding something abstract as a material thing. | *"In academic literature, hypostatization designates regarding something abstract as a material thing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypostatize]] | noun | **1.** To attribute real identity to (a concept). | *"In academic literature, hypostatize designates to attribute real identity to (a concept)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metastasis]] | noun | **1.** Change of position, state, or form.<br>**2.** The spread of a disease-producing agency (such as cancer cells) from the initial or primary site of disease to another part of the body; also : the process by which such spreading occurs. | *"There is no metastasis, no stoppage of harmonious 420:3 action, no paralysis."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[metastasise]] | verb | **1.** Spread throughout the body. | *"In academic literature, metastasise designates spread throughout the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metastasize]] | noun | **1.** To spread or grow by or as if by metastasis. | *"In academic literature, metastasize designates to spread or grow by or as if by metastasis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metastatic]] | noun | **1.** Change of position, state, or form.<br>**2.** The spread of a disease-producing agency (such as cancer cells) from the initial or primary site of disease to another part of the body; also : the process by which such spreading occurs. | *"In academic literature, metastatic designates change of position, state, or form."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[orthostatic]] | noun | **1.** Of, relating to, or caused by an upright posture. | *"In academic literature, orthostatic designates of, relating to, or caused by an upright posture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[restate]] | verb | **1.** To say, state, or perform again. | *"Butler and Curtis, and in the arguments which came up upon points of testimony, that there remained little for the other counsel except to restate what had before been said."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[restatement]] | noun | **1.** A revised statement. | *"The theory of the transference of the will of the people to historic persons is merely a paraphrase—a restatement of the question in other words."* — graf Leo Tolstoy, *War and Peace* |
| [[statant]] | adjective | **1.** Standing on four feet. | *"In academic literature, statant designates standing on four feet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[state]] | noun | **1.** The territory occupied by one of the constituent administrative districts of a nation.<br>**2.** The way something is with respect to its main attributes. | *"When I perceive that men as plants increase, Cheered and checked even by the self-same sky: Vaunt in their youthful sap, at height decrease, And wear their brave state out of memory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[state-controlled]] | adjective | **1.** Subscribing to the socialistic doctrine of ownership by the people collectively. | *"In academic literature, state-controlled designates subscribing to the socialistic doctrine of ownership by the people collectively."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[state-of-the-art]] | adjective | **1.** The highest level of development at a particular time (especially the present time). | *"In academic literature, state-of-the-art designates the highest level of development at a particular time (especially the present time)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[state-supported]] | adjective | **1.** Supported and operated by the government of a state. | *"In academic literature, state-supported designates supported and operated by the government of a state."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statecraft]] | noun | **1.** Wisdom in the management of public affairs. | *"What Machiavelli beheld round him in Italy was a civic disorder in which there was oppression without statecraft, and revolt without patriotism."* — Mark Twain, *What Is Man? and Other Essays* |
| [[stated]] | verb | **1.** Express in words.<br>**2.** Put before. | *"The old lady, becoming more and more incensed against the master of deportment as she dwelt upon the subject, gave me some particulars of his career, with strong assurances that they were mildly stated."* — Charles Dickens, *Bleak House* |
| [[statehouse]] | noun | **1.** A government building in which a state legislature meets. | *"In academic literature, statehouse designates a government building in which a state legislature meets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stateless]] | adjective | **1.** Without nationality or citizenship. | *"In academic literature, stateless designates without nationality or citizenship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stateliness]] | noun | **1.** An elaborate manner of doing something.<br>**2.** Impressiveness in scale or proportion. | *"Oh, I assure you he is very odd!” She shook her head a great many times and tapped her forehead with her finger to express to us that we must have the goodness to excuse him, “For he is a little—you know—M!” said the old lady with great stateliness."* — Charles Dickens, *Bleak House* |
| [[stately]] | adjective | **1.** Impressive in appearance.<br>**2.** Of size and dignity suggestive of a statue. | *"Upon a wooden coffin we attend, And Death’s dishonourable victory We with our stately presence glorify, Like captives bound to a triumphant car."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[statement]] | noun | **1.** A message that is stated or declared; a communication (oral or written) setting forth particulars or facts etc.<br>**2.** A fact or assertion offered as evidence that something is true. | *"So of course the first hour after school from eleven till twelve belongs to me," was Bruno's statement."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[stater]] | noun | **1.** An ancient gold or silver coin of the Greek city-states.<br>**2.** A native or resident of Massachusetts —used as a nickname. | *"In academic literature, stater designates an ancient gold or silver coin of the greek city-states."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stateroom]] | noun | **1.** A guest cabin. | *"We were to sail on the fifteenth of the month (June), weather permitting; and on the fourteenth, I went on board to arrange some matters in my stateroom."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[statesman]] | noun | **1.** A man who is a respected leader in national or international affairs. | *"Let him be but testimonied in his own bringings-forth, and he shall appear to the envious a scholar, a statesman, and a soldier."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[statesmanlike]] | adjective | **1.** Marked by the qualities of or befitting a statesman; ; -v.l.parrington. | *"In academic literature, statesmanlike designates marked by the qualities of or befitting a statesman; ; -v.l.parrington."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statesmanly]] | adjective | **1.** Marked by the qualities of or befitting a statesman; ; -v.l.parrington. | *"In academic literature, statesmanly designates marked by the qualities of or befitting a statesman; ; -v.l.parrington."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statesmanship]] | noun | **1.** Wisdom in the management of public affairs. | *"Perchance, from out the ashes where it lies, True statesmanship may, phoenix-like, arise."* — Wilfred S. Skeats, *The song of the exile* |
| [[stateswoman]] | noun | **1.** A woman statesman. | *"In academic literature, stateswoman designates a woman statesman."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statewide]] | adjective | **1.** Occurring or extending throughout a state. | *"Moreover, the control and inspection of housing conditions has in a few states been made statewide to reach even "the country slums" which lately have been recognized to exist."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[static]] | noun | **1.** Exerting force by reason of weight alone without motion.<br>**2.** Of or relating to bodies at rest or forces in equilibrium. | *"I, therefore, is a static theory in respect to the standard of deferred payments, and requires adjustment to apply to a condition of a changing price-level.] [Footnote 12: See above, sec. 3.] [Footnote 13: Mention was made in Vol."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statice]] | noun | **1.** Any of various plants of the genus limonium of temperate salt marshes having spikes of white or mauve flowers. | *"A species with brown spores occurs on sea-lavender (_Statice_)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[statics]] | noun | **1.** The branch of mechanics concerned with forces in equilibrium.<br>**2.** A crackling or hissing noise caused by electrical interference. | *"In academic literature, statics designates the branch of mechanics concerned with forces in equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statin]] | noun | **1.** A medicine that lowers blood cholesterol levels by inhibiting hmg-coa reductase. | *"In academic literature, statin designates a medicine that lowers blood cholesterol levels by inhibiting hmg-coa reductase."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[station]] | noun | **1.** A facility equipped with special equipment and personnel for a particular purpose.<br>**2.** Proper or designated social situation. | *"Her motion and her station are as one."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[stationariness]] | noun | **1.** Remaining in place. | *"It would be hard to find better examples of stationariness, as we ordinarily look at things."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[stationary]] | adjective | **1.** Standing still.<br>**2.** Not capable of being moved. | *"Snagsby and his conductors are stationary, the crowd flows round, and from its squalid depths obsequious advice heaves up to Mr."* — Charles Dickens, *Bleak House* |
| [[stationer]] | noun | **1.** A merchant who sells writing materials and office supplies. | *"Snagsby, law-stationer, pursues his lawful calling."* — Charles Dickens, *Bleak House* |
| [[stationery]] | noun | **1.** Paper cut to an appropriate size for writing letters; usually with matching envelopes. | *"Tulkinghorn; and the complete equipage whirls though the law-stationery business at wild speed all round the clock."* — Charles Dickens, *Bleak House* |
| [[stationmaster]] | noun | **1.** The person in charge of a railway station. | *"In academic literature, stationmaster designates the person in charge of a railway station."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stations]] | noun | **1.** (roman catholic church) a devotion consisting of fourteen prayers said before a series of fourteen pictures or carvings representing successive incidents during jesus' passage from pilate's house to his crucifixion at calvary.<br>**2.** A facility equipped with special equipment and personnel for a particular purpose. | *"These railroads include an enormous aggregate of works and structures in the form of tunnels, cuts, banks, bridges, stations, and shops."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statistic]] | noun | **1.** A datum that can be represented numerically. | *"The rivers, lakes, and ocean waters near our coasts are other great sources of food, but no statistics are available to show adequately their yield."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statistical]] | adjective | **1.** Of or relating to statistics. | *"The prices (and estimated values) of farm lands are the expression of the individual capitals, which formed each year an increasing statistical total of so-called wealth."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statistically]] | adverb | **1.** With respect to statistics. | *"Yet such a change appears, statistically, as a decrease in the proportion of farms operated by owners."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[statistician]] | noun | **1.** A mathematician who specializes in statistics.<br>**2.** Someone versed in the collection and interpretation of numerical data (especially someone who uses statistics to calculate insurance premiums). | *"We think too much "like men"; he would have us "think like God," and think better of odd units and items of humanity than statesmen and statisticians are apt to do."* — T. R. Glover, *The Jesus of History* |
| [[statistics]] | noun | **1.** A branch of applied mathematics concerned with the collection and interpretation of quantitative data and the use of probability theory to estimate population parameters.<br>**2.** A datum that can be represented numerically. | *"The rivers, lakes, and ocean waters near our coasts are other great sources of food, but no statistics are available to show adequately their yield."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[stative]] | adjective | **1.** ( used of verbs (e.g. `be' or `own') and most participial adjectives) expressing existence or a state rather than an action. | *"In academic literature, stative designates ( used of verbs (e.g. `be' or `own') and most participial adjectives) expressing existence or a state rather than an action."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[stator]] | noun | **1.** Mechanical device consisting of the stationary part of a motor or generator in or around which the rotor revolves. | *"In academic literature, stator designates mechanical device consisting of the stationary part of a motor or generator in or around which the rotor revolves."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statuary]] | noun | **1.** Statues collectively.<br>**2.** Of or relating to or suitable for statues. | *"The piece of dusky statuary nodded in approval, and then murmured ‘Motarkee!’ ‘Motarkee,’ said I, without further hesitation ‘Typee motarkee.’ What a transition!"* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[statue]] | noun | **1.** A sculpture representing a human or animal. | *"She shows a body rather than a life, A statue than a breather."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[statuesque]] | adjective | **1.** Of size and dignity suggestive of a statue.<br>**2.** Suggestive of a statue. | *"So statuesque were we for that second that I swear those about us were not immediately aware of what had happened."* — Jack London, *The Jacket (The Star-Rover)* |
| [[statuette]] | noun | **1.** A small carved or molded figure. | *"On a tiny satinwood table stood a statuette by Clodion, and beside it lay a copy of Les Cent Nouvelles, bound for Margaret of Valois by Clovis Eve and powdered with the gilt daisies that Queen had selected for her device."* — Oscar Wilde, *The Picture of Dorian Gray* |
| [[stature]] | noun | **1.** High level of respect gained by impressive development or achievement.<br>**2.** (of a standing person) the distance from head to foot. | *"Care I for the limb, the thews, the stature, bulk, and big assemblance of a man?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[status]] | noun | **1.** The relative position or standing of things or especially persons in a society.<br>**2.** A state at a particular time. | *"This status of semi-independence which it so long enjoyed has helped to give it an individuality more strongly marked than that of most English towns."* — John Cairns, *Principal Cairns* |
| [[statute]] | noun | **1.** An act passed by a legislative body.<br>**2.** Enacted by a legislative body. | *"The statute of thy beauty thou wilt take, Thou usurer that put’st forth all to use, And sue a friend, came debtor for my sake, So him I lose through my unkind abuse."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[statutorily]] | adverb | **1.** According to statute. | *"In academic literature, statutorily designates according to statute."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[statutory]] | adjective | **1.** Relating to or created by statutes.<br>**2.** Prescribed or authorized by or punishable under a statute. | *"By old English statutory law, the whale is declared “a royal fish.” * Oh, that’s only nominal!"* — Herman Melville, *Moby Dick; Or, The Whale* |
| [[unstated]] | adjective | **1.** Not made explicit. | *"In academic literature, unstated designates not made explicit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unstatesmanlike]] | adjective | **1.** Not statesmanlike. | *"In academic literature, unstatesmanlike designates not statesmanlike."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Physics & Chemistry]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · STAT
  </div>
</div>
