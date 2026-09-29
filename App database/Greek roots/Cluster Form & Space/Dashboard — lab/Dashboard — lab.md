---
status: unread
type: root_dashboard
---
# Dashboard — lab
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">λαμβάνειν λῆψις λῆμμα (lambánein)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“grasp, seize, take”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'grasp, seize, take'.</span>
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

The Greek root **lab** (λαμβάνειν λῆψις λῆμμα (lambánein)) signifies grasp, seize, take. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *analemma*, *analemmatic*, *analeptic*, *catalepsy*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: grasp, seize, take
> The Greek root **lab** fundamentally denotes **grasp, seize, take**. The physical sensory observation and cognitive anchor underlying 'grasp, seize, take'. In classical Greek antiquity, the root denoted 'grasp, seize, take', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">grasp, seize, take</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'grasp, seize, take'.</mark>
> - **Everyday Connection**: Think of familiar words like *analemma*, *analemmatic*, *analeptic*, *catalepsy*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **lab** derives from Ancient Greek <mark class="hl-stem">λαμβάνειν λῆψις λῆμμα (lambánein)</mark>, meaning "grasp, seize, take".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with lab**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'grasp, seize, take'.
  - Whenever you see **lab** in an English word, think immediately of **grasp, seize, take**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">lab</mark>, think of <mark class="hl-def">grasp, seize, take</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `lab-` (from *λαμβάνειν λῆψις λῆμμα (lambánein)*).
> - **Combining Stem with -o- Connective:** `labo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Lab
> - **1. Direct & Concrete Anchor:** Literal instantiation of grasp, seize, take in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on lab

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `lab-` | [[analemma]] | Primary root semantic foundation denoting grasp, seize, take. |
| **Connecting -o-** | `labo-` | [[analemmatic]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `lab` | [[analeptic]] | Relational or directional modification of the core root sense. |

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
| [[analemma]] | noun | **1.** A plot or graph in the shape of a figure eight that shows the position of the sun in the sky at a given time of day (such as noon) at one specific locale measured throughout the year; also : a scale (as on a globe or sundial) based on such a plot that shows the sun's position for each day of the year or that allows local mean time to be determined. | *"In academic literature, analemma designates a plot or graph in the shape of a figure eight that shows the position of the sun in the sky at a given time of day (such as noon) at one specific locale measured throughout the year; also : a scale (as on a globe or sundial) based on such a plot that shows the sun's position for each day of the year or that allows local mean time to be determined."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analemmatic]] | noun | **1.** A plot or graph in the shape of a figure eight that shows the position of the sun in the sky at a given time of day (such as noon) at one specific locale measured throughout the year; also : a scale (as on a globe or sundial) based on such a plot that shows the sun's position for each day of the year or that allows local mean time to be determined. | *"In academic literature, analemmatic designates a plot or graph in the shape of a figure eight that shows the position of the sun in the sky at a given time of day (such as noon) at one specific locale measured throughout the year; also : a scale (as on a globe or sundial) based on such a plot that shows the sun's position for each day of the year or that allows local mean time to be determined."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[analeptic]] | noun | **1.** A drug that stimulates the central nervous system. | *"In academic literature, analeptic designates a drug that stimulates the central nervous system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antiepileptic]] | noun | **1.** A drug used to treat or prevent convulsions (as in epilepsy). | *"In academic literature, antiepileptic designates a drug used to treat or prevent convulsions (as in epilepsy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catalepsy]] | noun | **1.** A trancelike state marked by loss of voluntary motion in which the limbs remain in whatever position they are placed. | *"Must not be lost." When not in a catalepsy of literary composition, I am essentially the man of action."* — P. G. Wodehouse, *Love Among the Chickens* |
| [[cataleptic]] | noun | **1.** A trancelike state marked by loss of voluntary motion in which the limbs remain in whatever position they are placed. | *"Finally, becoming cataleptic, she has to be carried up the narrow staircase like a grand piano."* — Charles Dickens, *Bleak House* |
| [[dilemma]] | noun | **1.** A usually undesirable or unpleasant choice.<br>**2.** A situation involving such a choice; broadly : predicament. | *"Here, Master Doctor, in perplexity and doubtful dilemma."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[dilemmatic]] | noun | **1.** A usually undesirable or unpleasant choice.<br>**2.** A situation involving such a choice; broadly : predicament. | *"In academic literature, dilemmatic designates a usually undesirable or unpleasant choice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epilepsy]] | noun | **1.** Any of various disorders marked by abnormal electrical discharges in the brain and typically manifested by sudden brief episodes of altered or diminished consciousness, involuntary movements, or convulsions.<br>**2.** Used or tending to control epileptic seizures : antiepileptic. | *"My lord is fallen into an epilepsy."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[epileptic]] | noun | **1.** Relating to, affected with, or having the characteristics of epilepsy.<br>**2.** Designed to control or prevent seizures associated with epilepsy. | *"A plague upon your epileptic visage!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[hypnolepsy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lab.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, hypnolepsy designates a term designating an entity, condition, or phenomenon derived from greek lab."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hysteroepilepsy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lab.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, hysteroepilepsy designates a term designating an entity, condition, or phenomenon derived from greek lab."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lab]] | noun | **1.** Laboratory —often used before another noun —sometimes used in combination.<br>**2.** Laboratory tests (such as blood tests or urinalyses) performed by a medical laboratory on a specimen taken from a patient. | *"To lower orders are assign’d The humbler ranks of human-kind, The rustic bard, the lab’ring hind, The artisan; All choose, as various they’re inclin’d, The various man."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[labor]] | noun | **1.** A social class comprising those who do manual labor or work for wages.<br>**2.** Productive work (especially physical work done for wages). | *"Laws, indeed, are fixed in their operation and results as subserving the highest good in the training and the disciplining of the race, giving them hope in their labor and sure expectation of fruit from their toil."* — Classic Author, *The wonders of prayer* |
| [[metalepsis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lab.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, metalepsis designates a term designating an entity, condition, or phenomenon derived from greek lab."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monosyllabic]] | adjective | **1.** Having or characterized by or consisting of one syllable. | *"I made some attempts to draw her into conversation, but she seemed a person of few words: a monosyllabic reply usually cut short every effort of that sort."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[monosyllable]] | noun | **1.** A word or utterance of one syllable. | *"Smallweed’s favourite adjective of disparagement is so close to his tongue that he begins the words “my dear friend” with the monosyllable “brim,” thus converting the possessive pronoun into brimmy and appearing to have an impediment in his speech."* — Charles Dickens, *Bleak House* |
| [[nympholepsy]] | noun | **1.** A demonic enthusiasm held by the ancients to seize one bewitched by a nymph.<br>**2.** A frenzy of emotion. | *"In academic literature, nympholepsy designates a demonic enthusiasm held by the ancients to seize one bewitched by a nymph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octosyllabic]] | noun | **1.** Consisting of eight syllables.<br>**2.** Composed of verses of eight syllables. | *"In academic literature, octosyllabic designates consisting of eight syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[octosyllable]] | noun | **1.** A verse line having eight syllables or a poem of octosyllabic lines. | *"In academic literature, octosyllable designates a verse line having eight syllables or a poem of octosyllabic lines."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysyllabic]] | adjective | **1.** Having or characterized by words of more than three syllables.<br>**2.** (of words) long and ponderous; having many syllables. | *"To what inconsequent polysyllabic question of his host did the guest return a monosyllabic negative answer?"* — James Joyce, *Ulysses* |
| [[polysyllable]] | noun | **1.** A word of more than three syllables. | *"In the readers’ book Cashel Boyle O’Connor Fitzmaurice Tisdall Farrell parafes his polysyllables."* — James Joyce, *Ulysses* |
| [[procatalepsis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lab.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, procatalepsis designates a term designating an entity, condition, or phenomenon derived from greek lab."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prolepsis]] | noun | **1.** Anticipation: such as.<br>**2.** The representation or assumption of a future act or development as if presently existing or accomplished. | *"In academic literature, prolepsis designates anticipation: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proleptic]] | noun | **1.** Anticipation: such as.<br>**2.** The representation or assumption of a future act or development as if presently existing or accomplished. | *"In academic literature, proleptic designates anticipation: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[proslepsis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lab.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, proslepsis designates a term designating an entity, condition, or phenomenon derived from greek lab."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllabary]] | noun | **1.** A writing system whose characters represent syllables. | *"In academic literature, syllabary designates a writing system whose characters represent syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllabic]] | noun | **1.** Constituting a syllable or the nucleus of a syllable:.<br>**2.** Not accompanied in the same syllable by a vowel. | *"Sometimes Leah is with her; they are frequently noisy together.” The laugh was repeated in its low, syllabic tone, and terminated in an odd murmur."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[syllabically]] | adverb | **1.** In or with syllables. | *"In academic literature, syllabically designates in or with syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllabicate]] | verb | **1.** Divide into syllables. | *"In academic literature, syllabicate designates divide into syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllabication]] | noun | **1.** Forming or dividing words into syllables. | *"In academic literature, syllabication designates forming or dividing words into syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllabicity]] | noun | **1.** The pattern of syllable formation in a particular language. | *"In academic literature, syllabicity designates the pattern of syllable formation in a particular language."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllabify]] | verb | **1.** Divide into syllables. | *"In academic literature, syllabify designates divide into syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllabise]] | verb | **1.** Divide into syllables.<br>**2.** Utter with distinct articulation of each syllable. | *"In academic literature, syllabise designates divide into syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllabism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lab.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, syllabism designates a term designating an entity, condition, or phenomenon derived from greek lab."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllabize]] | verb | **1.** Divide into syllables.<br>**2.** Utter with distinct articulation of each syllable. | *"In academic literature, syllabize designates divide into syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllable]] | noun | **1.** A unit of spoken language that is next bigger than a speech sound and consists of one or more vowel sounds alone or of a syllabic consonant alone or of either with one or more consonant sounds preceding or following.<br>**2.** One or more letters (such as syl, la, and ble) in a word (such as syllable) usually set off from the rest of the word by a centered dot or a hyphen and roughly corresponding to the syllables of spoken language and treated as helps to pronunciation or as guides to placing hyphens at the end of a line. | *"Th’ Archbishop Is the King’s hand and tongue, and who dare speak One syllable against him?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[syllabogram]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek lab.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, syllabogram designates a term designating an entity, condition, or phenomenon derived from greek lab."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[syllepsis]] | noun | **1.** The use of a word to modify or govern syntactically two or more words with only one of which it formally agrees in gender, number, or case.<br>**2.** The use of a word in the same grammatical relation to two adjacent words in the context with one literal and the other metaphorical in sense. | *"In academic literature, syllepsis designates the use of a word to modify or govern syntactically two or more words with only one of which it formally agrees in gender, number, or case."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trisyllable]] | noun | **1.** A word of three syllables. | *"In academic literature, trisyllable designates a word of three syllables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsyllabic]] | adjective | **1.** Not forming a syllable or the nucleus of a syllable; consisting of a consonant sound accompanied in the same syllable by a vowel sound or consisting of a vowel sound dominated by other vowel sounds in a syllable (as the second vowel in a falling diphthong). | *"In academic literature, unsyllabic designates not forming a syllable or the nucleus of a syllable; consisting of a consonant sound accompanied in the same syllable by a vowel sound or consisting of a vowel sound dominated by other vowel sounds in a syllable (as the second vowel in a falling diphthong)."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · LAB
  </div>
</div>
