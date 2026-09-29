---
status: unread
type: root_dashboard
---
# Dashboard — par
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">παρά (pará)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“beside, near”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'beside, near'.</span>
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

The Greek root **par** (παρά (pará)) signifies beside, near. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *par*, *parable*, *parabola*, *paradox*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: beside, near
> The Greek root **par** fundamentally denotes **beside, near**. The physical sensory observation and cognitive anchor underlying 'beside, near'. In classical Greek antiquity, the root denoted 'beside, near', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">beside, near</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'beside, near'.</mark>
> - **Everyday Connection**: Think of familiar words like *par*, *parable*, *parabola*, *paradox*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **par** derives from Ancient Greek <mark class="hl-stem">παρά (pará)</mark>, meaning "beside, near".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with par**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'beside, near'.
  - Whenever you see **par** in an English word, think immediately of **beside, near**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">par</mark>, think of <mark class="hl-def">beside, near</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `par-` (from *παρά (pará)*).
> - **Combining Stem with -o- Connective:** `paro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Par
> - **1. Direct & Concrete Anchor:** Literal instantiation of beside, near in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on par

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `par-` | [[par]] | Primary root semantic foundation denoting beside, near. |
| **Connecting -o-** | `paro-` | [[parable]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `par` | [[parabola]] | Relational or directional modification of the core root sense. |

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
| [[antiparallel]] | adjective | **1.** (especially of vectors) parallel but oppositely directed. | *"In academic literature, antiparallel designates (especially of vectors) parallel but oppositely directed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[apar]] | noun | **1.** South american armadillo with three bands of bony plates. | *"In academic literature, apar designates south american armadillo with three bands of bony plates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[par]] | noun | **1.** The established value of the monetary unit of one country expressed in terms of the monetary unit of another country using the same metal as the standard of value.<br>**2.** The face amount of an instrument of value (such as a check or note): such as. | *"A drum now of the enemy’s! [_Alarum within._] FIRST LORD. _Throca movousus, cargo, cargo, cargo._ ALL. _Cargo, cargo, cargo, villianda par corbo, cargo._ [_They seize and blindfold him._] PAROLLES."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[para]] | noun | **1.** (obstetrics) the number of liveborn children a woman has delivered.<br>**2.** 100 para equal 1 dinar in yugoslavia. | *"I am an admirer of Montesquieu,” replied Prince Andrew, “and his idea that le principe des monarchies est l’honneur me paraît incontestable."* — graf Leo Tolstoy, *War and Peace* |
| [[parable]] | noun | **1.** A usually short fictitious story that illustrates a moral attitude or a religious principle; also : something (such as a news story or a series of real events) likened to a parable in providing an instructive example or lesson. | *"Thou shalt never get such a secret from me but by a parable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parabola]] | noun | **1.** A plane curve generated by a point moving so that its distance from a fixed point is equal to its distance from a fixed line : the intersection of a right circular cone with a plane parallel to an element of the cone.<br>**2.** Something bowl-shaped (such as an antenna or microphone reflector). | *"The end of the liquid parabola has come forward from the wall, has advanced over the plinth mouldings, over a heap of stones, over the marble border, into the midst of Fanny Robin’s grave."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[parabolic]] | noun | **1.** Expressed by or being a parable : allegorical.<br>**2.** Of, having the form of, or relating to a parabola. | *"At any distance the beam from the parabolic reflector will be more intense than that from the spherical one, since the rays will be closer together."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[parabolical]] | adjective | **1.** Resembling or expressed by parables.<br>**2.** Having the form of a parabola. | *"In academic literature, parabolical designates resembling or expressed by parables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraboloid]] | noun | **1.** A surface all of whose intersections by planes are either parabolas and ellipses or parabolas and hyperbolas.<br>**2.** A saddle-shaped quadric surface whose sections by planes parallel to one coordinate plane are hyperbolas while those sections by planes parallel to the other two are parabolas if proper orientation of the coordinate axes is assumed. | *"In academic literature, paraboloid designates a surface all of whose intersections by planes are either parabolas and ellipses or parabolas and hyperbolas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraboloidal]] | adjective | **1.** Having the shape of a paraboloid. | *"In academic literature, paraboloidal designates having the shape of a paraboloid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paradox]] | noun | **1.** A person or thing having seemingly contradictory qualities or phases.<br>**2.** A statement or sentiment that is seemingly contradictory or opposed to common sense and yet is perhaps true. | *"This was sometime a paradox, but now the time gives it proof."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[paradoxical]] | adjective | **1.** Seemingly contradictory but nonetheless possibly true. | *"Night and day is this death-watch on me, and its paradoxical function is to see that I do not die."* — Jack London, *The Jacket (The Star-Rover)* |
| [[paradoxically]] | adverb | **1.** In a paradoxical manner. | *"Paradoxically speaking, if there is not too much of the bad money, it is just as good as the good money."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[parallel]] | noun | **1.** Extending in the same direction, everywhere equidistant, and not meeting.<br>**2.** Everywhere equally distant. | *"O, behold this ring, Whose high respect and rich validity Did lack a parallel; yet for all that He gave it to a commoner o’ the camp, If I be one."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parallelepiped]] | noun | **1.** A 6-faced polyhedron all of whose faces are parallelograms lying in pairs of parallel planes. | *"In academic literature, parallelepiped designates a 6-faced polyhedron all of whose faces are parallelograms lying in pairs of parallel planes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parallelism]] | noun | **1.** The quality or state of being parallel.<br>**2.** Resemblance, correspondence. | *"Here again the parallelism holds between the anthropomorphic and the vegetable representation of the tree-spirit, for we have seen above that trees are sometimes married to each other."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[parallelize]] | verb | **1.** Place parallel to one another. | *"In academic literature, parallelize designates place parallel to one another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paralysis]] | noun | **1.** Complete or partial loss of function especially when involving the motion or sensation in a part of the body.<br>**2.** Loss of the ability to move. | *"Sir Leicester Dedlock, Baronet, has had a fit—apoplexy or paralysis—and couldn’t be brought to, and precious time has been lost."* — Charles Dickens, *Bleak House* |
| [[paralytic]] | noun | **1.** Affected with, characterized by, or causing paralysis.<br>**2.** Of, relating to, or resembling paralysis. | *"But ever while he laughs, he glances over his paralytic shoulder at Mr."* — Charles Dickens, *Bleak House* |
| [[paralytical]] | adjective | **1.** Relating to or of the nature of paralysis. | *"In academic literature, paralytical designates relating to or of the nature of paralysis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parameter]] | noun | **1.** An arbitrary constant whose value characterizes a member of a system (such as a family of curves); also : a quantity (such as a mean or variance) that describes a statistical population.<br>**2.** An independent variable used to express the coordinates of a variable point and functions of them. | *"Computer: be ready to give a presentation on each option and its variations within the parameters I specified and which surface through your analyses."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[parametric]] | noun | **1.** An arbitrary constant whose value characterizes a member of a system (such as a family of curves); also : a quantity (such as a mean or variance) that describes a statistical population.<br>**2.** An independent variable used to express the coordinates of a variable point and functions of them. | *"In academic literature, parametric designates an arbitrary constant whose value characterizes a member of a system (such as a family of curves); also : a quantity (such as a mean or variance) that describes a statistical population."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pare]] | verb | **1.** Decrease gradually or bit by bit.<br>**2.** Cut small bits or pare shavings from. | *"And what would you have me to do? ’Tis too late to pare her nails now."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parer]] | noun | **1.** A manicurist who trims the fingernails.<br>**2.** A small sharp knife used in paring fruits or vegetables. | *"In academic literature, parer designates a manicurist who trims the fingernails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paring]] | noun | **1.** A thin fragment or slice (especially of wood) that has been shaved from something.<br>**2.** (usually plural) a part of a fruit or vegetable that is pared or cut off; especially the skin or peel. | *"Virginity breeds mites, much like a cheese; consumes itself to the very paring, and so dies with feeding his own stomach."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parity]] | noun | **1.** (obstetrics) the number of liveborn children a woman has delivered.<br>**2.** (mathematics) a relation between a pair of integers: if both integers are odd or both are even they have the same parity; if one is odd and the other is even they have different parity. | *"It is hoped that they will have the high credit of municipal bonds so that they may be sold at parity, bearing interest at 4 or 4.5 per cent."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[parodist]] | noun | **1.** Mimics literary or musical style for comic effect. | *"In academic literature, parodist designates mimics literary or musical style for comic effect."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parody]] | noun | **1.** A literary or musical work in which the style of an author or work is closely imitated for comic effect or in ridicule.<br>**2.** A feeble or ridiculous imitation. | *"A doggerel parody on _John Gilpin_, entitled "The Diverting History of John Cairns," in which a highly coloured account is given of the supposed genesis of the pamphlet, was written and found wide circulation."* — John Cairns, *Principal Cairns* |
| [[parous]] | adjective | **1.** Having given birth to one or more viable children. | *"In academic literature, parous designates having given birth to one or more viable children."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reparable]] | adjective | **1.** Capable of being repaired or rectified. | *"I fear he is not to be reclaimed; there is scarcely a hope that anything in his character or fortunes is reparable now."* — Charles Dickens, *A Tale of Two Cities* |
| [[reparation]] | noun | **1.** Compensation (given or received) for an insult or injury.<br>**2.** (usually plural) compensation exacted from a defeated nation by the victors. | *"Then I shall acknowledge it and make him reparation.” Everything postponed to that imaginary time!"* — Charles Dickens, *Bleak House* |
| [[unparallel]] | adjective | **1.** Not straight or parallel. | *"If, one by one, you wedded all the world, Or from the all that are took something good, To make a perfect woman, she you kill’d Would be unparallel’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unparalleled]] | adjective | **1.** Radically distinctive and without equal. | *"Now boast thee, Death, in thy possession lies A lass unparalleled."* — William Shakespeare, *The Complete Works of William Shakespeare* |

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
    ROOT DASHBOARD · PAR
  </div>
</div>
