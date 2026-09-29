---
status: unread
type: root_dashboard
---
# Dashboard — centr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">centr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“center”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'center'.</span>
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

The Greek root **centr** (κεντεῖν κέντησις κέντρον κεντρικός κεντρισμός (kéntron)) signifies center. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *acentric*, *acrocentric*, *amniocentesis*, *anthropocentric*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: center
> The Greek root **centr** fundamentally denotes **center**. The physical sensory observation and cognitive anchor underlying 'center'. In classical Greek antiquity, the root denoted 'center', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">center</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'center'.</mark>
> - **Everyday Connection**: Think of familiar words like *acentric*, *acrocentric*, *amniocentesis*, *anthropocentric*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **centr** derives from Ancient Greek <mark class="hl-stem">κεντεῖν κέντησις κέντρον κεντρικός κεντρισμός (kéntron)</mark>, meaning "center".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with centr**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'center'.
  - Whenever you see **centr** in an English word, think immediately of **center**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">centr</mark>, think of <mark class="hl-def">center</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `centr-` (from *κεντεῖν κέντησις κέντρον κεντρικός κεντρισμός (kéntron)*).
> - **Combining Stem with -o- Connective:** `centro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Centr
> - **1. Direct & Concrete Anchor:** Literal instantiation of center in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on centr

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `centr-` | [[acentric]] | Primary root semantic foundation denoting center. |
| **Connecting -o-** | `centro-` | [[acrocentric]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `centr` | [[amniocentesis]] | Relational or directional modification of the core root sense. |

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
| [[acentric]] | noun | **1.** Lacking a centromere. | *"In academic literature, acentric designates lacking a centromere."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[acrocentric]] | noun | **1.** Having the centromere situated so that one chromosomal arm is much shorter than the other. | *"In academic literature, acrocentric designates having the centromere situated so that one chromosomal arm is much shorter than the other."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amniocentesis]] | noun | **1.** The surgical insertion of a hollow needle through the abdominal wall and into the uterus to obtain amniotic fluid especially for the determination of fetal sex or chromosomal abnormality —called also amnio. | *"In academic literature, amniocentesis designates the surgical insertion of a hollow needle through the abdominal wall and into the uterus to obtain amniotic fluid especially for the determination of fetal sex or chromosomal abnormality —called also amnio."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropocentric]] | noun | **1.** Considering human beings as the most significant entity of the universe.<br>**2.** Interpreting or regarding the world in terms of human values and experiences. | *"In academic literature, anthropocentric designates considering human beings as the most significant entity of the universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropocentricity]] | noun | **1.** An inclination to evaluate reality exclusively in terms of human values. | *"In academic literature, anthropocentricity designates an inclination to evaluate reality exclusively in terms of human values."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropocentrism]] | noun | **1.** Considering human beings as the most significant entity of the universe.<br>**2.** Interpreting or regarding the world in terms of human values and experiences. | *"In academic literature, anthropocentrism designates considering human beings as the most significant entity of the universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[barycenter]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, barycenter designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biocentric]] | noun | **1.** Considering all forms of life as having intrinsic value. | *"In academic literature, biocentric designates considering all forms of life as having intrinsic value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biocentrism]] | noun | **1.** Considering all forms of life as having intrinsic value. | *"In academic literature, biocentrism designates considering all forms of life as having intrinsic value."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cental]] | noun | **1.** A united states unit of weight equivalent to 100 pounds. | *"In academic literature, cental designates a united states unit of weight equivalent to 100 pounds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centaur]] | noun | **1.** Any of a race of creatures fabled to be half human and half horse and to live in the mountains of Thessaly.<br>**2.** Any of a class of asteroids with elliptical orbits that typically lie between the orbits of Jupiter and Neptune. | *"Go bear it to the Centaur, where we host, And stay there, Dromio, till I come to thee."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[centauromachy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, centauromachy designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[center]] | noun | **1.** An area that is approximately central within some larger region.<br>**2.** The piece of ground in the outfield directly ahead of the catcher. | *"He that will all the treasure know o’ th’ earth Must know the center too; he that will fish For my least minnow, let him lead his line To catch one at my heart."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[centered]] | verb | **1.** Center upon.<br>**2.** Direct one's attention on something. | *"But this difference is readily discovered in the impressions made upon us by their writings, namely that Hoelderlin's Weltschmerz is absolutely naive and unconscious, while that of Lenau is at all times self-conscious and self-centered."* — Wilhelm Alfred Braun, *Types of Weltschmerz in German Poetry* |
| [[centering]] | noun | **1.** The concentration of attention or energy on something.<br>**2.** (american football) putting the ball in play by passing it (between the legs) to a back. | *"In academic literature, centering designates the concentration of attention or energy on something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, centesis designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centr]] | combining form | **1.** center. | *"Everybody’s glance was now centred upon him and the unconscious Bathsheba."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[central]] | noun | **1.** A workplace that serves as a telecommunications facility where lines from telephones can be connected together to permit communication.<br>**2.** Serving as an essential component. | *"They were about to disperse, when a smart footstep, entering the porch and coming up the central passage, arrested their attention."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[centralisation]] | noun | **1.** The act of consolidating power under a central control.<br>**2.** Gathering to a center. | *"In academic literature, centralisation designates the act of consolidating power under a central control."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralise]] | verb | **1.** Make central. | *"In academic literature, centralise designates make central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralised]] | verb | **1.** Make central.<br>**2.** Drawn toward a center or brought under the control of a central authority. | *"In academic literature, centralised designates make central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralising]] | verb | **1.** Make central.<br>**2.** Tending to draw to a central point. | *"In academic literature, centralising designates make central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralism]] | noun | **1.** The political policy of concentrating power in a central organization. | *"In academic literature, centralism designates the political policy of concentrating power in a central organization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralist]] | adjective | **1.** Advocating centralization. | *"In academic literature, centralist designates advocating centralization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralistic]] | adjective | **1.** Advocating centralization. | *"In academic literature, centralistic designates advocating centralization."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrality]] | noun | **1.** The property of being central. | *"In academic literature, centrality designates the property of being central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centralization]] | noun | **1.** The act of consolidating power under a central control.<br>**2.** Gathering to a center. | *"By this means the reserves of the several district banks may be "piped together" and thus be practically made into one central bank under governmental control, altho centralization was in outward form avoided by the bill."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[centralize]] | verb | **1.** Make central. | *"The ideal of socialism is the abolition of private property, the centralizing under the control of the state of all wealth, except the simple personal belongings, clothing and other consumption goods."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[centralized]] | verb | **1.** Make central.<br>**2.** Drawn toward a center or brought under the control of a central authority. | *"However, the best informed American students favor in some features the more decentralized German rather than the centralized British system."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[centralizing]] | verb | **1.** Make central.<br>**2.** Tending to draw to a central point. | *"The ideal of socialism is the abolition of private property, the centralizing under the control of the state of all wealth, except the simple personal belongings, clothing and other consumption goods."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[centrally]] | adverb | **1.** In or near or toward a center or according to a central role or function. | *"In academic literature, centrally designates in or near or toward a center or according to a central role or function."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centranthus]] | noun | **1.** Genus of southern european herbs and subshrubs. | *"In academic literature, centranthus designates genus of southern european herbs and subshrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrarchid]] | noun | **1.** Small carnivorous freshwater percoid fishes of north america usually having a laterally compressed body and metallic luster: crappies; black bass; bluegills; pumpkinseed. | *"In academic literature, centrarchid designates small carnivorous freshwater percoid fishes of north america usually having a laterally compressed body and metallic luster: crappies; black bass; bluegills; pumpkinseed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrarchidae]] | noun | **1.** Sunfish family. | *"In academic literature, centrarchidae designates sunfish family."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centre]] | noun | **1.** Village in southeastern New York in west central Long Island.<br>**2.** The main or central part of a city : the part of a city where there are tall buildings, stores, offices, etc. | *"Take this from this, if this be otherwise. [_Points to his head and shoulder._] If circumstances lead me, I will find Where truth is hid, though it were hid indeed Within the centre."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[centreboard]] | noun | **1.** A retractable fin keel used on sailboats to prevent drifting to leeward. | *"In academic literature, centreboard designates a retractable fin keel used on sailboats to prevent drifting to leeward."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrefold]] | noun | **1.** A magazine center spread; especially a foldout of a large photograph or map or other feature. | *"In academic literature, centrefold designates a magazine center spread; especially a foldout of a large photograph or map or other feature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrepiece]] | noun | **1.** The central or most important feature.<br>**2.** Something placed at the center of something else (as on a table). | *"Even the cabin table itself had been knocked into kindling-wood; and the cabin mess dined off the broad head of an oil-butt, lashed down to the floor for a centrepiece."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[centrex]] | noun | **1.** (central exchange) a kind of telephone exchange. | *"In academic literature, centrex designates (central exchange) a kind of telephone exchange."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centric]] | noun | **1.** Located in or at a center : central.<br>**2.** Concentrated about or directed to a center. | *"In academic literature, centric designates located in or at a center : central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrical]] | adjective | **1.** Having or situated at or near a center. | *"It is time, then,” said Fitzurse, “to draw our party to a head, either at York, or some other centrical place."* — Walter Scott, *Ivanhoe: A Romance* |
| [[centrifugal]] | adjective | **1.** Tending to move away from a center.<br>**2.** Tending away from centralization, as of authority. | *"How is this force, with its numberless checks and counter-checks, its centripetal and centrifugal tendencies, best determined in its necessarily oblique way?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[centrifugate]] | verb | **1.** Rotate at very high speed in order to separate the liquids from the solids. | *"In academic literature, centrifugate designates rotate at very high speed in order to separate the liquids from the solids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrifugation]] | noun | **1.** The process of separating substances of different densities by the use of a centrifuge. | *"In academic literature, centrifugation designates the process of separating substances of different densities by the use of a centrifuge."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrifuge]] | noun | **1.** An apparatus that uses centrifugal force to separate particles from a suspension.<br>**2.** Rotate at very high speed in order to separate the liquids from the solids. | *"In academic literature, centrifuge designates an apparatus that uses centrifugal force to separate particles from a suspension."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centriole]] | noun | **1.** One of a pair of small cylindrical cell organelles near the nucleus in animal cells; composed of nine triplet microtubules and form the asters during mitosis. | *"In academic literature, centriole designates one of a pair of small cylindrical cell organelles near the nucleus in animal cells; composed of nine triplet microtubules and form the asters during mitosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centripetal]] | adjective | **1.** Tending to move toward a center.<br>**2.** Tending to unify. | *"How is this force, with its numberless checks and counter-checks, its centripetal and centrifugal tendencies, best determined in its necessarily oblique way?"* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[centriscidae]] | noun | **1.** Shrimpfishes. | *"In academic literature, centriscidae designates shrimpfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrism]] | noun | **1.** A member of a center party.<br>**2.** A person who holds moderate views. | *"In academic literature, centrism designates a member of a center party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrist]] | noun | **1.** A member of a center party.<br>**2.** A person who holds moderate views. | *"In academic literature, centrist designates a member of a center party."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrocercus]] | noun | **1.** Sage grouse. | *"In academic literature, centrocercus designates sage grouse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centroid]] | noun | **1.** Center of mass.<br>**2.** A point whose coordinates are the averages of the corresponding coordinates of a given set of points and which for a given plane or three-dimensional figure (such as a triangle or sphere) corresponds to the center of mass of a thin plate of uniform thickness and consistency or a body of uniform consistency having the same boundary. | *"In academic literature, centroid designates center of mass."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centroidal]] | adjective | **1.** Of or relating to (especially passing through) a centroid. | *"In academic literature, centroidal designates of or relating to (especially passing through) a centroid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrolobium]] | noun | **1.** A genus of centrolobium. | *"In academic literature, centrolobium designates a genus of centrolobium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centromere]] | noun | **1.** The point or region on a chromosome to which the spindle attaches during mitosis and meiosis. | *"In academic literature, centromere designates the point or region on a chromosome to which the spindle attaches during mitosis and meiosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centromeric]] | noun | **1.** The point or region on a chromosome to which the spindle attaches during mitosis and meiosis. | *"In academic literature, centromeric designates the point or region on a chromosome to which the spindle attaches during mitosis and meiosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropomidae]] | noun | **1.** A family of fish or the order perciformes including robalos. | *"In academic literature, centropomidae designates a family of fish or the order perciformes including robalos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropomus]] | noun | **1.** Type genus of the centropomidae: snooks. | *"In academic literature, centropomus designates type genus of the centropomidae: snooks."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropristis]] | noun | **1.** Sea basses. | *"In academic literature, centropristis designates sea basses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centropus]] | noun | **1.** A genus of cuculidae. | *"In academic literature, centropus designates a genus of cuculidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosema]] | noun | **1.** A genus of chiefly tropical american vines of the family leguminosae having trifoliate leaves and large flowers. | *"In academic literature, centrosema designates a genus of chiefly tropical american vines of the family leguminosae having trifoliate leaves and large flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosome]] | noun | **1.** centriole.<br>**2.** the centriole-containing region of clear cytoplasm adjacent to the cell nucleus. | *"In academic literature, centrosome designates centriole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosomic]] | adjective | **1.** Of or relating to a centrosome. | *"In academic literature, centrosomic designates of or relating to a centrosome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrospermae]] | noun | **1.** Used in former classification systems; approximately synonymous with order caryophyllales. | *"In academic literature, centrospermae designates used in former classification systems; approximately synonymous with order caryophyllales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosphere]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, centrosphere designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosymmetric]] | noun | **1.** Symmetric with respect to a central point. | *"In academic literature, centrosymmetric designates symmetric with respect to a central point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrosymmetry]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, centrosymmetry designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[centrum]] | noun | **1.** center.<br>**2.** the body of a vertebra ventral to the neural arch. | *"Classical and authoritative lexicons catalog centrum as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralisation]] | noun | **1.** The spread of power away from the center to local branches or governments. | *"In academic literature, decentralisation designates the spread of power away from the center to local branches or governments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralise]] | verb | **1.** Make less central. | *"In academic literature, decentralise designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralised]] | verb | **1.** Make less central.<br>**2.** Withdrawn from a center or place of concentration; especially having power or function dispersed from a central to local authorities. | *"In academic literature, decentralised designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralising]] | verb | **1.** Make less central.<br>**2.** Tending away from a central point. | *"In academic literature, decentralising designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[decentralization]] | noun | **1.** The social process in which population and industry moves from urban centers to outlying districts.<br>**2.** The spread of power away from the center to local branches or governments. | *"In one important respect, however, it is different; it provides for more decentralization of control and of reserves than did the Aldrich plan."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[decentralize]] | verb | **1.** Make less central. | *"However, the best informed American students favor in some features the more decentralized German rather than the centralized British system."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[decentralized]] | verb | **1.** Make less central.<br>**2.** Withdrawn from a center or place of concentration; especially having power or function dispersed from a central to local authorities. | *"However, the best informed American students favor in some features the more decentralized German rather than the centralized British system."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[decentralizing]] | verb | **1.** Make less central.<br>**2.** Tending away from a central point. | *"In academic literature, decentralizing designates make less central."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eccentric]] | noun | **1.** Departing from what is usual, conventional, etc.:.<br>**2.** Having or showing an odd or whimsical way of thinking. | *"He is a very eccentric person."* — Charles Dickens, *Bleak House* |
| [[eccentrically]] | adverb | **1.** In an eccentric or bizarre manner.<br>**2.** Not symmetrically with respect to the center. | *"The air, afflicted to pallor with the hoary multitudes that infested it, twisted and spun them eccentrically, suggesting an achromatic chaos of things."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[eccentricity]] | noun | **1.** Strange and unconventional behavior.<br>**2.** (geometry) a ratio describing the shape of a conic section; the ratio of the distance between the foci to the length of the major axis. | *"He knew her so well that no eccentricity of behaviour in her would alarm him."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[eccentrism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, eccentrism designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eccentrist]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, eccentrist designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecocentric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of center. | *"In academic literature, ecocentric designates adjective*) pertaining to, derived from, or characteristic of center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecocentrism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, ecocentrism designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecocentrist]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, ecocentrist designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endocentric]] | adjective | **1.** Fulfilling the grammatical role of one of its constituents. | *"In academic literature, endocentric designates fulfilling the grammatical role of one of its constituents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enterocentesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, enterocentesis designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epicenter]] | noun | **1.** The part of the earth's surface directly above the focus of an earthquake. | *"In academic literature, epicenter designates the part of the earth's surface directly above the focus of an earthquake."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[epicentre]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"The epicentre appears to have been that part of the metropolis which constitutes the Inn’s Quay ward and parish of Saint Michan covering a surface of fortyone acres, two roods and one square pole or perch."* — James Joyce, *Ulysses* |
| [[exocentric]] | adjective | **1.** Not fulfilling the same grammatical role of any of its constituents. | *"In academic literature, exocentric designates not fulfilling the same grammatical role of any of its constituents."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holocentric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of center. | *"In academic literature, holocentric designates adjective*) pertaining to, derived from, or characteristic of center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holocentridae]] | noun | **1.** Squirrelfishes and soldierfishes. | *"In academic literature, holocentridae designates squirrelfishes and soldierfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holocentrus]] | noun | **1.** Type genus of the family holocentridae; squirrelfishes. | *"In academic literature, holocentrus designates type genus of the family holocentridae; squirrelfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homocentric]] | adjective | **1.** Having a common center. | *"In academic literature, homocentric designates having a common center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metacenter]] | noun | **1.** (shipbuilding) the point of intersection between two vertical lines, one line through the center of buoyancy of the hull of a ship in equilibrium and the other line through the center of buoyancy of the hull when the ship is inclined to one side; the distance of this intersection above the center of gravity is an indication of the stability of the ship. | *"In academic literature, metacenter designates (shipbuilding) the point of intersection between two vertical lines, one line through the center of buoyancy of the hull of a ship in equilibrium and the other line through the center of buoyancy of the hull when the ship is inclined to one side; the distance of this intersection above the center of gravity is an indication of the stability of the ship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metacentre]] | noun | **1.** (shipbuilding) the point of intersection between two vertical lines, one line through the center of buoyancy of the hull of a ship in equilibrium and the other line through the center of buoyancy of the hull when the ship is inclined to one side; the distance of this intersection above the center of gravity is an indication of the stability of the ship. | *"In academic literature, metacentre designates (shipbuilding) the point of intersection between two vertical lines, one line through the center of buoyancy of the hull of a ship in equilibrium and the other line through the center of buoyancy of the hull when the ship is inclined to one side; the distance of this intersection above the center of gravity is an indication of the stability of the ship."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metacentric]] | noun | **1.** Of or relating to a metacenter.<br>**2.** Having the centromere medially situated so that the two chromosomal arms are of roughly equal length. | *"In academic literature, metacentric designates of or relating to a metacenter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microcentrum]] | noun | **1.** Katydids. | *"Classical and authoritative lexicons catalog microcentrum as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monocentric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of center. | *"In academic literature, monocentric designates adjective*) pertaining to, derived from, or characteristic of center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[neocentromere]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, neocentromere designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paracentesis]] | noun | **1.** A medical procedure involving needle drainage of fluid from a body cavity, most commonly the abdomen. | *"In academic literature, paracentesis designates a medical procedure involving needle drainage of fluid from a body cavity, most commonly the abdomen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pericardiocentesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, pericardiocentesis designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[technocentric]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of center. | *"In academic literature, technocentric designates adjective*) pertaining to, derived from, or characteristic of center."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[technocentrism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, technocentrism designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telocentric]] | noun | **1.** Having the centromere terminally situated so that there is only one chromosomal arm. | *"In academic literature, telocentric designates having the centromere terminally situated so that there is only one chromosomal arm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thoracentesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, thoracentesis designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thoracocentesis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek centr.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, thoracocentesis designates a term designating an entity, condition, or phenomenon derived from greek centr."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · CENTR
  </div>
</div>
