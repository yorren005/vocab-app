---
status: unread
type: root_dashboard
---
# Dashboard — arithm
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἀριθμός (*arithmós*)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“number / count / computation / cipher”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Sliding counting stones along an abacus to total sums or calculate geometric ratios.</span>
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

The Greek root **arithm** (ἀριθμός (*arithmós*), ἀριθμεῖν (*arithmeîn*)) denotes number, counting, discrete quantity, and mathematical reckoning. In English, this root forms the foundation of quantitative, computational, and algorithmic vocabulary such as *arithmetic*, *arithmetical*, *logarithm*, *logarithmic*, *antilogarithm*, and *arithmomania*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: number / count / computation / cipher
> The Greek root **arithm** fundamentally denotes **discrete numerical quantity and reckoning**. Moving pebbles (*psēphoi*) along an abacus grid to calculate mercantile transactions, geometric proportions, and celestial motions. In the Pythagorean tradition, *Arithmos* was reified into the mystical foundation of the universe: Pythagoras taught that "all things are number," discovering that harmonious musical intervals (the octave, fifth, and fourth) correspond exactly to whole-number numerical ratios (1:2, 2:3, 3:4).

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Number, counting, computation, numerical ratio</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Sliding counting stones along an abacus to total sums or calculate geometric ratios.</mark>
> - **Everyday Connection**: Think of familiar mathematical concepts like *arithmetic*, *logarithms*, and *logarithmic scales*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root derives from Ancient Greek ἀριθμός (*arithmós*), meaning "number, numerical measure, reckoning", related to ἀριθμεῖν (*arithmeîn*, "to count, compute").
  - Reconstructed Proto-Indo-European root: ***h₂rey-** ("to count, order, fit together").

- **The Big Picture Idea**:
  - The transition from qualitative guesswork to quantitative certainty through discrete numerical measurement.
  - Whenever you see **arithm** in an English word, think immediately of numbers, computation, and mathematical calculation.

- **How the Meaning Grows**:
  - **Practical Calculation**: Elementary reckoning, addition, and division of quantities (*arithmetic*).
  - **Theoretical & Higher Mathematics**: Inverting exponential functions through proportional numbers (*logarithm*, *antilogarithm*).
  - **Clinical & Psychological**: Pathological obsession with counting and measuring everyday objects (*arithmomania*).

- **Everyday English Words to Remember It By**:
  - **Arithmetic**: The foundational mathematical study of numbers and operations (addition, subtraction, multiplication, division).
  - **Logarithm**: A mathematical function indicating the exponent required to produce a specific number (literally *logos* + *arithmos* = "ratio-number").
  - **Logarithmic**: Varying according to a logarithmic scale (e.g., the Richter scale or decibel scale).

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">arithm</mark>, think of <mark class="hl-def">counting numbers and mathematical computation</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

- **Primary Morphemic Stem**:
  - `arithm-` (< Greek ἀριθμός): Base stem appearing in *arithmetic* and *arithmetical*.
- **Combining Form with -o- Connective**:
  - `arithmo-` (< ἀριθμο-): Standard Greek combining form used before consonant-initial roots (*arithmo-mancy*, *arithmo-mania*).
- **Phonological & Compounding Dynamics**:
  - **Compounding with Logos**: John Napier coined the term *logarithm* in 1614 by compounding Greek λόγος (*logos*, in its Euclidean mathematical sense of "ratio or proportion") with ἀριθμός (*arithmos*, "number"), literally creating "ratio-numbers" that simplify complex multiplication into simple addition.
  - **Prefixation**: Prefixes like *anti-* yield *antilogarithm* (the inverse operation recovering the original number).

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

```
                             ┌── Elementary Mathematics: arithmetic, arithmetical
                             │
       [arithm] ─────────────┼── Higher Computational Analysis: logarithm, logarithmic, antilogarithm
      (ἀριθμός,              │
      Number & Count)        └── Psychiatric Diagnostics: arithmomania (compulsive counting disorder)
```

---

## 🔀 4. Prefix & Combining Dynamics on arithm

- **`arithm` + `-etic` (Greek -ική, "art / technique")**: *arithmetic* — the art and science of calculating discrete numbers.
- **`logos` ("proportion, ratio") + `-o-` + `arithm`**: *logarithm* — a computational exponent that maps geometric progressions into arithmetic progressions.
- **`anti-` ("opposite, inverse") + `logarithm`**: *antilogarithm* — the inverse function that yields the original number from its logarithmic exponent.
- **`arithmo-` + `mania` ("frenzy, madness")**: *arithmomania* — an obsessive-compulsive urge to count numbers, objects, or rituals repetitively.

---

## 🌐 5. Disciplinary & Real-World Domains

- **Number Theory & Elementary Algebra**: The Peano axioms, prime factorization, and modular arithmetic.
- **Information Science & Algorithmic Complexity**: Logarithmic runtime complexity ($O(\log n)$) in binary search trees and sorting algorithms.
- **Acoustics, Seismology & Chemistry**: Non-linear logarithmic measurement scales including decibels, the Richter scale, and pH values.
- **Psychopathology**: Manifestation of obsessive-compulsive disorder characterized by ritualistic counting (*arithmomania*).

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[antilogarithm]] | noun | **1.** The number corresponding to a given logarithm. | *"In academic literature, antilogarithm designates the number corresponding to a given logarithm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arithm]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek arithm.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, arithm designates a term designating an entity, condition, or phenomenon derived from greek arithm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arithmancy]] | noun | **1.** Divination by means of numbers. | *"In academic literature, arithmancy designates divination by means of numbers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arithmetic]] | noun | **1.** A branch of mathematics that deals usually with the nonnegative real numbers including sometimes the transfinite cardinals and with the application of the operations of addition, subtraction, multiplication, and division to them.<br>**2.** A treatise on arithmetic. | *"But now ’tis odds beyond arithmetic, And manhood is called foolery when it stands Against a falling fabric."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[arithmetical]] | noun | **1.** A branch of mathematics that deals usually with the nonnegative real numbers including sometimes the transfinite cardinals and with the application of the operations of addition, subtraction, multiplication, and division to them.<br>**2.** A treatise on arithmetic. | *"She was too deeply materialized, poor woman, by her long and enforced bondage to that arithmetical demon Profit-and-Loss, to retain much curiousity for its own sake, and apart from possible lodgers’ pockets."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[arithmetically]] | adverb | **1.** With respect to arithmetic. | *"These do not constitute a sum of social wealth in any proper sense of the term.[3] Arithmetically it is a fallacious kind of a total, for the sum of the individual capitals contains some items that should be canceled to find the sum of wealth."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[arithmetician]] | noun | **1.** Someone who specializes in arithmetic. | *"A famous Teacher of _Arithmetick_, who had long been married without being able to get his Wife with Child: One said to her, Madam, your Husband is an excellent _Arithmetician_."* — Classic Author, *Joe Miller's Jests, or The Wits Vade-Mecum* |
| [[arithmomania]] | noun | **1.** an obsessive-compulsive disorder in which the subject feels the need to count things. | *"In academic literature, arithmomania designates an obsessive-compulsive disorder in which the subject feels the need to count things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[arithmos]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek arithm.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, arithmos designates a term designating an entity, condition, or phenomenon derived from greek arithm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isarithm]] | noun | **1.** A line drawn on a map connecting points having the same numerical value of some variable. | *"In academic literature, isarithm designates a line drawn on a map connecting points having the same numerical value of some variable."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[logarithm]] | noun | **1.** The exponent that indicates the power to which a base number is raised to produce a given number.<br>**2.** A logarithm whose base is 10. | *"But it is best not to be intimate with gentlemen of this profession and to take the calculations at second hand, as you do logarithms, for to work them yourself, depend upon it, will cost you something considerable."* — William Makepeace Thackeray, *Vanity Fair* |
| [[logarithmic]] | noun | **1.** The exponent that indicates the power to which a base number is raised to produce a given number.<br>**2.** A function (such as y = loga x or y = ln x) that is the inverse of an exponential function (such as y = ax or y = ex) so that the independent variable appears in a logarithm. | *"In academic literature, logarithmic designates the exponent that indicates the power to which a base number is raised to produce a given number."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · ARITHM
  </div>
</div>
