---
status: unread
type: root_dashboard
---
# Dashboard — hyper
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ὑπέρ (hupér)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“above, over”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'above, over'.</span>
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

The Greek root **hyper** (ὑπέρ (hupér)) signifies above, over. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Hyperion*, *hyper*, *hyperbaric*, *hyperbola*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: above, over
> The Greek root **hyper** fundamentally denotes **above, over**. The physical sensory observation and cognitive anchor underlying 'above, over'. In classical Greek antiquity, the root denoted 'above, over', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">above, over</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'above, over'.</mark>
> - **Everyday Connection**: Think of familiar words like *Hyperion*, *hyper*, *hyperbaric*, *hyperbola*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **hyper** derives from Ancient Greek <mark class="hl-stem">ὑπέρ (hupér)</mark>, meaning "above, over".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with hyper**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'above, over'.
  - Whenever you see **hyper** in an English word, think immediately of **above, over**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">hyper</mark>, think of <mark class="hl-def">above, over</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `hyper-` (from *ὑπέρ (hupér)*).
> - **Combining Stem with -o- Connective:** `hypero-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Hyper
> - **1. Direct & Concrete Anchor:** Literal instantiation of above, over in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on hyper

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `hyper-` | [[Hyperion]] | Primary root semantic foundation denoting above, over. |
| **Connecting -o-** | `hypero-` | [[hyper]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `hyper` | [[hyperbaric]] | Relational or directional modification of the core root sense. |

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
| [[antihypertensive]] | noun | **1.** A drug that reduces high blood pressure. | *"In academic literature, antihypertensive designates a drug that reduces high blood pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyper]] | noun | **1.** High-strung, excitable; also : highly excited.<br>**2.** Extremely active. | *"A recent example of a hyper-radial light is at the well-known Cape Race in Newfoundland."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[hyperacidity]] | noun | **1.** Excessive acidity. | *"In academic literature, hyperacidity designates excessive acidity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperactive]] | adjective | **1.** More active than normal. | *"In academic literature, hyperactive designates more active than normal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperactivity]] | noun | **1.** A condition characterized by excessive restlessness and movement. | *"In academic literature, hyperactivity designates a condition characterized by excessive restlessness and movement."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperacusia]] | noun | **1.** Abnormal acuteness of hearing due to increased irritability of the sensory neural mechanism; characterized by intolerance for ordinary sound levels. | *"In academic literature, hyperacusia designates abnormal acuteness of hearing due to increased irritability of the sensory neural mechanism; characterized by intolerance for ordinary sound levels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperacusis]] | noun | **1.** Abnormal acuteness of hearing due to increased irritability of the sensory neural mechanism; characterized by intolerance for ordinary sound levels. | *"In academic literature, hyperacusis designates abnormal acuteness of hearing due to increased irritability of the sensory neural mechanism; characterized by intolerance for ordinary sound levels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperadrenalism]] | noun | **1.** A glandular disorder caused by excessive acth resulting in greater than normal functioning of the adrenal gland; characterized by obesity. | *"In academic literature, hyperadrenalism designates a glandular disorder caused by excessive acth resulting in greater than normal functioning of the adrenal gland; characterized by obesity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperadrenocorticism]] | noun | **1.** A glandular disorder caused by excessive cortisol. | *"In academic literature, hyperadrenocorticism designates a glandular disorder caused by excessive cortisol."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperaemia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek haem.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hyperaemia designates a term designating an entity, condition, or phenomenon derived from greek haem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperaldosteronism]] | noun | **1.** A condition caused by overproduction of aldosterone. | *"In academic literature, hyperaldosteronism designates a condition caused by overproduction of aldosterone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperalimentation]] | noun | **1.** Administration of a nutritionally adequate solution through a catheter into the vena cava; used in cases of long-term coma or severe burns or severe gastrointestinal syndromes. | *"In academic literature, hyperalimentation designates administration of a nutritionally adequate solution through a catheter into the vena cava; used in cases of long-term coma or severe burns or severe gastrointestinal syndromes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperbaric]] | noun | **1.** Of, relating to, or utilizing greater than normal pressure especially of oxygen. | *"In academic literature, hyperbaric designates of, relating to, or utilizing greater than normal pressure especially of oxygen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperbola]] | noun | **1.** A plane curve generated by a point so moving that the difference of the distances from two fixed points is a constant : a curve formed by the intersection of a double right circular cone with a plane that cuts both halves of the cone.<br>**2.** A hyperbola with its asymptotes at right angles. | *"In academic literature, hyperbola designates a plane curve generated by a point so moving that the difference of the distances from two fixed points is a constant : a curve formed by the intersection of a double right circular cone with a plane that cuts both halves of the cone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperbole]] | noun | **1.** Extravagant exaggeration (such as "mile-high ice-cream cones"). | *"Indeed I think it is one among several cities to which an extreme hyperbole has been applied—‘See Rome and die:’ but in your case I would propose an emendation and say, See Rome as a bride, and live henceforth as a happy wife.” Mr."* — George Eliot, *Middlemarch* |
| [[hyperbolic]] | noun | **1.** Of, relating to, or marked by language that exaggerates or overstates the truth : of, relating to, or marked by hyperbole.<br>**2.** Of, relating to, or being like a curve that is formed by the intersection of a double right circular cone with a plane that cuts both halves of the cone : of, relating to, or being analogous to a hyperbola. | *"Indeed, he seemed to approach the grave as a hyperbolic curve approaches a straight line—less directly as he got nearer, till it was doubtful if he would ever reach it at all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[hyperbolise]] | verb | **1.** To enlarge beyond bounds or the truth. | *"In academic literature, hyperbolise designates to enlarge beyond bounds or the truth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperbolize]] | verb | **1.** To enlarge beyond bounds or the truth. | *"In academic literature, hyperbolize designates to enlarge beyond bounds or the truth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperboloid]] | noun | **1.** A quadric surface whose sections by planes parallel to one coordinate plane are ellipses while those sections by planes parallel to the other two are hyperbolas if proper orientation of the axes is assumed. | *"In academic literature, hyperboloid designates a quadric surface whose sections by planes parallel to one coordinate plane are ellipses while those sections by planes parallel to the other two are hyperbolas if proper orientation of the axes is assumed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercalcaemia]] | noun | **1.** The presence of abnormally high levels of calcium in the blood; usually the result of excessive bone resorption in hyperparathyroidism or paget's disease. | *"In academic literature, hypercalcaemia designates the presence of abnormally high levels of calcium in the blood; usually the result of excessive bone resorption in hyperparathyroidism or paget's disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercalcemia]] | noun | **1.** The presence of abnormally high levels of calcium in the blood; usually the result of excessive bone resorption in hyperparathyroidism or paget's disease. | *"In academic literature, hypercalcemia designates the presence of abnormally high levels of calcium in the blood; usually the result of excessive bone resorption in hyperparathyroidism or paget's disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercalcinuria]] | noun | **1.** The presence of abnormally high levels of calcium in the urine; usually the result of excessive bone resorption in hyperparathyroidism or osteoporosis. | *"In academic literature, hypercalcinuria designates the presence of abnormally high levels of calcium in the urine; usually the result of excessive bone resorption in hyperparathyroidism or osteoporosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercalciuria]] | noun | **1.** The presence of abnormally high levels of calcium in the urine; usually the result of excessive bone resorption in hyperparathyroidism or osteoporosis. | *"In academic literature, hypercalciuria designates the presence of abnormally high levels of calcium in the urine; usually the result of excessive bone resorption in hyperparathyroidism or osteoporosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercapnia]] | noun | **1.** The presence of excessive amounts of carbon dioxide in the blood. | *"In academic literature, hypercapnia designates the presence of excessive amounts of carbon dioxide in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercarbia]] | noun | **1.** The physical condition of having the presence of an abnormally high level of carbon dioxide in the circulating blood. | *"In academic literature, hypercarbia designates the physical condition of having the presence of an abnormally high level of carbon dioxide in the circulating blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercatalectic]] | noun | **1.** (prosody) a line of poetry having an extra syllable or syllables at the end of the last metrical foot.<br>**2.** (verse) having an extra syllable or syllables at the end of a metrically complete verse or in a metrical foot. | *"In academic literature, hypercatalectic designates (prosody) a line of poetry having an extra syllable or syllables at the end of the last metrical foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercellularity]] | noun | **1.** The state of having abnormally many cells. | *"In academic literature, hypercellularity designates the state of having abnormally many cells."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercholesteremia]] | noun | **1.** The presence of an abnormal amount of cholesterol in the cells and plasma of the blood; associated with the risk of atherosclerosis. | *"In academic literature, hypercholesteremia designates the presence of an abnormal amount of cholesterol in the cells and plasma of the blood; associated with the risk of atherosclerosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercholesterolemia]] | noun | **1.** The presence of an abnormal amount of cholesterol in the cells and plasma of the blood; associated with the risk of atherosclerosis. | *"In academic literature, hypercholesterolemia designates the presence of an abnormal amount of cholesterol in the cells and plasma of the blood; associated with the risk of atherosclerosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercoaster]] | noun | **1.** A roller coaster that goes up 200 feet or higher and can catapult riders from 0 to 70 mph in 4 seconds by motors originally designed to launch rockets. | *"In academic literature, hypercoaster designates a roller coaster that goes up 200 feet or higher and can catapult riders from 0 to 70 mph in 4 seconds by motors originally designed to launch rockets."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypercritical]] | adjective | **1.** Inclined to judge too severely. | *"I suppose," writes one of them, "no men are so hypercritical as students after they have been four or five years at the University."* — John Cairns, *Principal Cairns* |
| [[hyperemesis]] | noun | **1.** Severe and excessive vomiting. | *"In academic literature, hyperemesis designates severe and excessive vomiting."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperemia]] | noun | **1.** Excess of blood in a body part : congestion. | *"In academic literature, hyperemia designates excess of blood in a body part : congestion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperemic]] | adjective | **1.** Relating to or caused by hyperemia. | *"In academic literature, hyperemic designates relating to or caused by hyperemia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperextend]] | verb | **1.** Extend a joint beyond its normal range. | *"In academic literature, hyperextend designates extend a joint beyond its normal range."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperextension]] | noun | **1.** Greater than normal extension. | *"In academic literature, hyperextension designates greater than normal extension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypericaceae]] | noun | **1.** Used in some classification systems for plants usually included among the guttiferae. | *"In academic literature, hypericaceae designates used in some classification systems for plants usually included among the guttiferae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypericales]] | noun | **1.** A large order of dicotyledonous plants of subclass dilleniidae. | *"In academic literature, hypericales designates a large order of dicotyledonous plants of subclass dilleniidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypericism]] | noun | **1.** A severe dermatitis of herbivorous domestic animals attributable to photosensitivity from eating saint john's wort. | *"In academic literature, hypericism designates a severe dermatitis of herbivorous domestic animals attributable to photosensitivity from eating saint john's wort."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypericum]] | noun | **1.** Large almost cosmopolitan genus of evergreen or deciduous shrubs and herbs with often showy yellow flowers; cosmopolitan except tropical lowlands and arctic or high altitudes and desert regions. | *"John’s-wort (_Hypericum_), but especially on the under surface of the leaves of the Tutsan, covering them with its golden-coloured spores (Plate VIII. fig. 174)."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[hyperidrosis]] | noun | **1.** Excessive and profuse perspiration. | *"In academic literature, hyperidrosis designates excessive and profuse perspiration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Hyperion]] | noun | **1.** A Titan and the father of Eos, Selene, and Helios. | *"But two months dead—nay, not so much, not two: So excellent a king; that was to this Hyperion to a satyr; so loving to my mother, That he might not beteem the winds of heaven Visit her face too roughly."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hyperion]] | noun | **1.** (greek mythology) a titan who was the son of gaea and uranus and the father of helios and selene and eos in ancient mythology. | *"In academic literature, hyperion designates **1.** (greek mythology) a titan who was the son of gaea and uranus and the father of helios and selene and eos in ancient mythology."* — Academic Lexicon |
| [[hyperlink]] | noun | **1.** An electronic link providing direct access from one distinctively marked place in a hypertext or hypermedia document to another in the same or a different document. | *"In academic literature, hyperlink designates an electronic link providing direct access from one distinctively marked place in a hypertext or hypermedia document to another in the same or a different document."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperlipaemia]] | noun | **1.** Presence of excess lipids in the blood. | *"In academic literature, hyperlipaemia designates presence of excess lipids in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperlipemia]] | noun | **1.** Presence of excess lipids in the blood. | *"In academic literature, hyperlipemia designates presence of excess lipids in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperlipidaemia]] | noun | **1.** Presence of excess lipids in the blood. | *"In academic literature, hyperlipidaemia designates presence of excess lipids in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperlipidemia]] | noun | **1.** Presence of excess lipids in the blood. | *"In academic literature, hyperlipidemia designates presence of excess lipids in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperlipoidaemia]] | noun | **1.** Presence of excess lipids in the blood. | *"In academic literature, hyperlipoidaemia designates presence of excess lipids in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperlipoidemia]] | noun | **1.** Presence of excess lipids in the blood. | *"In academic literature, hyperlipoidemia designates presence of excess lipids in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperlipoproteinemia]] | noun | **1.** Any of various disorders of lipoprotein and cholesterol metabolism that result in high levels of lipoprotein and cholesterol in the circulating blood. | *"In academic literature, hyperlipoproteinemia designates any of various disorders of lipoprotein and cholesterol metabolism that result in high levels of lipoprotein and cholesterol in the circulating blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermarket]] | noun | **1.** A huge supermarket (usually built on the outskirts of a town). | *"In academic literature, hypermarket designates a huge supermarket (usually built on the outskirts of a town)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermastigina]] | noun | **1.** Cellulose-producing flagellates. | *"In academic literature, hypermastigina designates cellulose-producing flagellates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermastigote]] | noun | **1.** Flagellate symbiotic in the intestines of e.g. termites. | *"In academic literature, hypermastigote designates flagellate symbiotic in the intestines of e.g. termites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermedia]] | noun | **1.** A multimedia system in which related items of information are connected and can be presented together. | *"In academic literature, hypermedia designates a multimedia system in which related items of information are connected and can be presented together."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermenorrhea]] | noun | **1.** Abnormally heavy or prolonged menstruation; can be a symptom of uterine tumors and can lead to anemia if prolonged. | *"In academic literature, hypermenorrhea designates abnormally heavy or prolonged menstruation; can be a symptom of uterine tumors and can lead to anemia if prolonged."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermetropia]] | noun | **1.** Abnormal condition in which vision for distant objects is better than for near objects. | *"In academic literature, hypermetropia designates abnormal condition in which vision for distant objects is better than for near objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermetropic]] | adjective | **1.** Abnormal ability to focus of distant objects. | *"In academic literature, hypermetropic designates abnormal ability to focus of distant objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermetropy]] | noun | **1.** Abnormal condition in which vision for distant objects is better than for near objects. | *"In academic literature, hypermetropy designates abnormal condition in which vision for distant objects is better than for near objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypermotility]] | noun | **1.** Excessive movement; especially excessive motility of the gastrointestinal tract. | *"In academic literature, hypermotility designates excessive movement; especially excessive motility of the gastrointestinal tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypernatremia]] | noun | **1.** Excessive amounts of sodium in the blood; possibly indicating diabetes insipidus. | *"In academic literature, hypernatremia designates excessive amounts of sodium in the blood; possibly indicating diabetes insipidus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypernym]] | noun | **1.** A word that is more generic than a given word. | *"In academic literature, hypernym designates a word that is more generic than a given word."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypernymy]] | noun | **1.** The semantic relation of being superordinate or belonging to a higher rank or class. | *"In academic literature, hypernymy designates the semantic relation of being superordinate or belonging to a higher rank or class."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperoartia]] | noun | **1.** Lampreys as distinguished from hagfishes. | *"In academic literature, hyperoartia designates lampreys as distinguished from hagfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperodontidae]] | noun | **1.** Beaked whales; in some especially former classifications included in the family physeteridae. | *"In academic literature, hyperodontidae designates beaked whales; in some especially former classifications included in the family physeteridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperoglyphe]] | noun | **1.** A genus of stromateidae. | *"In academic literature, hyperoglyphe designates a genus of stromateidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperon]] | noun | **1.** Any baryon that is not a nucleon; unstable particle with mass greater than a neutron. | *"In academic literature, hyperon designates any baryon that is not a nucleon; unstable particle with mass greater than a neutron."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperoodon]] | noun | **1.** Bottle-nosed whales. | *"In academic literature, hyperoodon designates bottle-nosed whales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperope]] | noun | **1.** A person with hyperopia; a farsighted person. | *"In academic literature, hyperope designates a person with hyperopia; a farsighted person."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperopia]] | noun | **1.** Abnormal condition in which vision for distant objects is better than for near objects. | *"In academic literature, hyperopia designates abnormal condition in which vision for distant objects is better than for near objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperopic]] | adjective | **1.** Abnormal ability to focus of distant objects. | *"In academic literature, hyperopic designates abnormal ability to focus of distant objects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperotreta]] | noun | **1.** Hagfishes as distinguished from lampreys. | *"In academic literature, hyperotreta designates hagfishes as distinguished from lampreys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperoxia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hyper.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, hyperoxia designates a term designating an entity, condition, or phenomenon derived from greek hyper."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperpyrexia]] | noun | **1.** Exceptionally high fever (as in a particular disease). | *"In academic literature, hyperpyrexia designates exceptionally high fever (as in a particular disease)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypersecretion]] | noun | **1.** Excessive secretion. | *"In academic literature, hypersecretion designates excessive secretion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypersensitised]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"In academic literature, hypersensitised designates having an allergy or peculiar or excessive susceptibility (especially to a specific factor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypersensitive]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"I was proud and selfish, and hypersensitive and ambitious."* — Byron J. Rees, *The Heart-Cry of Jesus* |
| [[hypersensitivity]] | noun | **1.** Pathological sensitivity.<br>**2.** Extreme sensitivity. | *"In academic literature, hypersensitivity designates pathological sensitivity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypersensitized]] | adjective | **1.** Having an allergy or peculiar or excessive susceptibility (especially to a specific factor). | *"In academic literature, hypersensitized designates having an allergy or peculiar or excessive susceptibility (especially to a specific factor)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypersomnia]] | noun | **1.** An inability to stay awake. | *"In academic literature, hypersomnia designates an inability to stay awake."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypersplenism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek splen.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, hypersplenism designates a term designating an entity, condition, or phenomenon derived from greek splen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperstat]] | noun | **1.** Vasodilator (trade name hyperstat) used to treat severe hypertension. | *"In academic literature, hyperstat designates vasodilator (trade name hyperstat) used to treat severe hypertension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertensin]] | noun | **1.** Any of several vasoconstrictor substances (trade name hypertensin) that cause narrowing of blood vessels. | *"In academic literature, hypertensin designates any of several vasoconstrictor substances (trade name hypertensin) that cause narrowing of blood vessels."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertension]] | noun | **1.** A common disorder in which blood pressure remains abnormally high (a reading of 140/90 mm hg or greater). | *"In academic literature, hypertension designates a common disorder in which blood pressure remains abnormally high (a reading of 140/90 mm hg or greater)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertensive]] | noun | **1.** A person who has abnormally high blood pressure.<br>**2.** Having abnormally high blood pressure. | *"In academic literature, hypertensive designates a person who has abnormally high blood pressure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertext]] | noun | **1.** Machine-readable text that is not sequential but is organized so that related items of information are connected; --ted nelson. | *"In academic literature, hypertext designates machine-readable text that is not sequential but is organized so that related items of information are connected; --ted nelson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperthermal]] | adjective | **1.** Of or relating to or affected by hyperthermia. | *"In academic literature, hyperthermal designates of or relating to or affected by hyperthermia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperthermia]] | noun | **1.** Exceptionally high fever especially when induced artificially for therapeutic purposes. | *"In academic literature, hyperthermia designates exceptionally high fever especially when induced artificially for therapeutic purposes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperthermy]] | noun | **1.** Abnormally high body temperature; sometimes induced (as in treating some forms of cancer). | *"In academic literature, hyperthermy designates abnormally high body temperature; sometimes induced (as in treating some forms of cancer)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperthyroidism]] | noun | **1.** An overactive thyroid gland; pathologically excessive production of thyroid hormones or the condition resulting from excessive production of thyroid hormones. | *"In academic literature, hyperthyroidism designates an overactive thyroid gland; pathologically excessive production of thyroid hormones or the condition resulting from excessive production of thyroid hormones."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertonia]] | noun | **1.** The condition of exhibiting excessive muscular tone or tension. | *"In academic literature, hypertonia designates the condition of exhibiting excessive muscular tone or tension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertonic]] | noun | **1.** Exhibiting excessive tone or tension.<br>**2.** Having a higher osmotic pressure than a surrounding medium or a fluid under comparison. | *"In academic literature, hypertonic designates exhibiting excessive tone or tension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertonicity]] | noun | **1.** (of a solution) the extent to which a solution has a higher osmotic pressure than some other.<br>**2.** (of muscular tissue) the state of being hypertonic. | *"In academic literature, hypertonicity designates (of a solution) the extent to which a solution has a higher osmotic pressure than some other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertonus]] | noun | **1.** (of muscular tissue) the state of being hypertonic. | *"In academic literature, hypertonus designates (of muscular tissue) the state of being hypertonic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypertrophied]] | verb | **1.** Undergo hypertrophy.<br>**2.** (of an organ or body part) excessively enlarged as a result of increased size in the constituent cells. | *"Some I recognised as a kind of hypertrophied raspberry and orange, but for the most part they were strange."* — H. G. Wells, *The Time Machine* |
| [[hypertrophy]] | noun | **1.** Excessive development of an organ or part; specifically : increase in bulk (as by thickening of muscle fibers) without multiplication of parts.<br>**2.** Exaggerated growth or complexity. | *"Some I recognised as a kind of hypertrophied raspberry and orange, but for the most part they were strange."* — H. G. Wells, *The Time Machine* |

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
    ROOT DASHBOARD · HYPER
  </div>
</div>
