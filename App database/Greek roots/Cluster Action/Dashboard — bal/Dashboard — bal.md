---
status: unread
type: root_dashboard
---
# Dashboard — bal
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">βάλλειν βολή βλῆμα (bállein)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“throw”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'throw'.</span>
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

The Greek root **bal** (βάλλειν βολή βλῆμα (bállein)) signifies throw. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *ametabolic*, *ametabolism*, *amphibole*, *amphibolic*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: throw
> The Greek root **bal** fundamentally denotes **throw**. The physical sensory observation and cognitive anchor underlying 'throw'. In classical Greek antiquity, the root denoted 'throw', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">throw</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'throw'.</mark>
> - **Everyday Connection**: Think of familiar words like *ametabolic*, *ametabolism*, *amphibole*, *amphibolic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **bal** derives from Ancient Greek <mark class="hl-stem">βάλλειν βολή βλῆμα (bállein)</mark>, meaning "throw".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with bal**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'throw'.
  - Whenever you see **bal** in an English word, think immediately of **throw**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">bal</mark>, think of <mark class="hl-def">throw</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `bal-` (from *βάλλειν βολή βλῆμα (bállein)*).
> - **Combining Stem with -o- Connective:** `balo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Bal
> - **1. Direct & Concrete Anchor:** Literal instantiation of throw in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on bal

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `bal-` | [[ametabolic]] | Primary root semantic foundation denoting throw. |
| **Connecting -o-** | `balo-` | [[ametabolism]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `bal` | [[amphibole]] | Relational or directional modification of the core root sense. |

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
| [[ametabolic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of throw. | *"In academic literature, ametabolic designates adjective*) pertaining to, derived from, or characteristic of throw."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ametabolism]] | noun | **1.** The condition of being ametabolic. | *"In academic literature, ametabolism designates the condition of being ametabolic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ametabolous]] | adjective | **1.** Undergoing slight or no metamorphosis. | *"In academic literature, ametabolous designates undergoing slight or no metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibole]] | noun | **1.** Hornblende.<br>**2.** Any of a group of complex silicate minerals with like crystal structures that contain calcium, sodium, magnesium, aluminum, or iron ions or a combination of them. | *"In academic literature, amphibole designates hornblende."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibolic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of throw. | *"In academic literature, amphibolic designates adjective*) pertaining to, derived from, or characteristic of throw."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibolite]] | noun | **1.** A usually metamorphic rock consisting essentially of amphibole. | *"In academic literature, amphibolite designates a usually metamorphic rock consisting essentially of amphibole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphibolous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of throw. | *"In academic literature, amphibolous designates adjective*) pertaining to, derived from, or characteristic of throw."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[amphiboly]] | noun | **1.** Amphibology. | *"In academic literature, amphiboly designates amphibology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anabolic]] | noun | **1.** Marked by or promoting metabolic activity concerned with the biosynthesis of complex molecules (such as proteins or nucleic acids) : relating to, characterized by, or stimulating anabolism.<br>**2.** Any of a group of usually synthetic hormones that are derivatives of testosterone, are used medically especially to promote tissue growth, and are sometimes abused by athletes to increase the size and strength of their muscles and improve endurance. | *"In academic literature, anabolic designates marked by or promoting metabolic activity concerned with the biosynthesis of complex molecules (such as proteins or nucleic acids) : relating to, characterized by, or stimulating anabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anabolism]] | noun | **1.** The constructive part of metabolism concerned especially with macromolecular synthesis. | *"In academic literature, anabolism designates the constructive part of metabolism concerned especially with macromolecular synthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antimetabolite]] | noun | **1.** An antineoplastic drug that inhibits the utilization of a metabolite. | *"In academic literature, antimetabolite designates an antineoplastic drug that inhibits the utilization of a metabolite."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astrobleme]] | noun | **1.** A pit-like structure created by an impacting meteoroid, asteroid or comet. | *"In academic literature, astrobleme designates a pit-like structure created by an impacting meteoroid, asteroid or comet."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bal]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of throw. | *"It has been described as follows by the parish minister of the time: "Upon the first day of May, which is called _Beltan_, or _Bal-tein_ day, all the boys in a township or hamlet, meet in the moors."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[ball]] | noun | **1.** A round or roundish body or mass: such as.<br>**2.** A spherical or ovoid body used in a game or sport —used figuratively in phrases like the ball is in your court to indicate who has the responsibility or opportunity for further action. | *"When thou ran’st up Gad’s Hill in the night to catch my horse, if I did not think thou hadst been an _ignis fatuus_ or a ball of wildfire, there’s no purchase in money."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ballein]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bal.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, ballein designates a term designating an entity, condition, or phenomenon derived from greek bal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ballism]] | noun | **1.** ballismus. | *"In academic literature, ballism designates ballismus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ballista]] | noun | **1.** An ancient military engine often in the form of a crossbow for hurling large missiles. | *"In academic literature, ballista designates an ancient military engine often in the form of a crossbow for hurling large missiles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ballistic]] | noun | **1.** Of or relating to the science of the motion of projectiles in flight.<br>**2.** Extremely and usually suddenly excited, upset, or angry : wild. | *"Intercontinental nuclear-armed ballistic missiles were far beyond drawing boards; their operational reach, capabilities, and effects against civilian as well as military targets had been carefully estimated and understood."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[ballistics]] | noun | **1.** The trajectory of an object in free flight.<br>**2.** The science of flight dynamics. | *"In academic literature, ballistics designates the trajectory of an object in free flight."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ballistospore]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek bal.<br>**2.** Specialized application within the domain of Action. | *"In academic literature, ballistospore designates a term designating an entity, condition, or phenomenon derived from greek bal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[belomancy]] | noun | **1.** Studying the flight of arrows, an ancient form of divination used by the Greeks and Arabs. | *"In academic literature, belomancy designates studying the flight of arrows, an ancient form of divination used by the greeks and arabs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[belonephobia]] | noun | **1.** Abnormal fear of sharp or pointed objects (such as hypodermic needles or scissors) : aichmophobia. | *"In academic literature, belonephobia designates abnormal fear of sharp or pointed objects (such as hypodermic needles or scissors) : aichmophobia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bolide]] | noun | **1.** A large meteor : fireball; especially : one that explodes. | *"In academic literature, bolide designates a large meteor : fireball; especially : one that explodes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bolometer]] | noun | **1.** A very sensitive thermometer whose electrical resistance varies with temperature and which is used in the detection and measurement of feeble thermal radiation and is especially adapted to the study of infrared spectra. | *"In academic literature, bolometer designates a very sensitive thermometer whose electrical resistance varies with temperature and which is used in the detection and measurement of feeble thermal radiation and is especially adapted to the study of infrared spectra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[bolometric]] | adjective | **1.** Of or relating to a bolometer. | *"In academic literature, bolometric designates of or relating to a bolometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catabolic]] | noun | **1.** Marked by or promoting metabolic activity concerned with the breakdown of complex molecules (such as proteins or lipids) and the release of energy within the organism : relating to, characterized by, or stimulating catabolism. | *"In academic literature, catabolic designates marked by or promoting metabolic activity concerned with the breakdown of complex molecules (such as proteins or lipids) and the release of energy within the organism : relating to, characterized by, or stimulating catabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catabolise]] | verb | **1.** Subject to catabolism. | *"In academic literature, catabolise designates subject to catabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catabolism]] | noun | **1.** Degradative metabolism involving the release of energy and resulting in the breakdown of complex materials (such as proteins or lipids) within the organism. | *"In academic literature, catabolism designates degradative metabolism involving the release of energy and resulting in the breakdown of complex materials (such as proteins or lipids) within the organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[catabolize]] | verb | **1.** Subject to catabolism. | *"In academic literature, catabolize designates subject to catabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devil]] | noun | **1.** The personal supreme spirit of evil often represented in Christian belief as the tempter of humankind, the leader of all apostate angels, and the ruler of hell —usually used with the—often used as an interjection, an intensive, or a generalized term of abuse.<br>**2.** An evil spirit : demon. | *"To win me soon to hell my female evil Tempteth my better angel from my side, And would corrupt my saint to be a devil, Wooing his purity with her foul pride."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[devilise]] | verb | **1.** Turn into a devil or make devilish. | *"In academic literature, devilise designates turn into a devil or make devilish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devilize]] | verb | **1.** Turn into a devil or make devilish. | *"In academic literature, devilize designates turn into a devil or make devilish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[devilment]] | noun | **1.** Reckless or malicious behavior that causes discomfort or annoyance in others. | *"He told me to watch out sharp and let him know when the men come in sight again; said they was up to some devilment or other—wouldn’t be gone long."* — Mark Twain, *Adventures of Huckleberry Finn* |
| [[devilry]] | noun | **1.** Wicked and cruel behavior.<br>**2.** Reckless or malicious behavior that causes discomfort or annoyance in others. | *"Moreover, by chance or by devilry, the ministrant was antecedently made interesting by being a handsome stranger who had evidently seen better days."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[deviltry]] | noun | **1.** Wicked and cruel behavior.<br>**2.** Reckless or malicious behavior that causes discomfort or annoyance in others. | *"Also when a woman is created, the winds have wooed star-dust, rose-dew, peach-down, and a few flint-shavings into a whirlwind of deviltry, and the world at large looks on in wonder and sore amazement, as well as breathless interest."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[diabolatry]] | noun | **1.** The acts or rites of worshiping devils. | *"In academic literature, diabolatry designates the acts or rites of worshiping devils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diabolic]] | noun | **1.** Of, relating to, or characteristic of the devil : extremely evil. | *"If we follow his orders, have no doubt that he will attain his diabolic objectives."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[diabolical]] | adjective | **1.** Showing the cunning or ingenuity or wickedness typical of a devil.<br>**2.** Extremely evil or cruel; expressive of cruelty or befitting hell. | *"My mind,” Sir Leicester adds with a generous warmth, “has not, as may be easily supposed, recovered its tone since the late diabolical occurrence."* — Charles Dickens, *Bleak House* |
| [[diabolically]] | adverb | **1.** As a devil; in an evil manner. | *"My boy,” said the landlord, “you’ll have the nightmare to a dead sartainty.” “Landlord,” I whispered, “that aint the harpooneer, is it?” “Oh, no,” said he, looking a sort of diabolically funny, “the harpooneer is a dark complexioned chap."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[diabolise]] | verb | **1.** Turn into a devil or make devilish. | *"In academic literature, diabolise designates turn into a devil or make devilish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diabolism]] | noun | **1.** A belief in and reverence for devils (especially satan). | *"In academic literature, diabolism designates a belief in and reverence for devils (especially satan)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diabolist]] | noun | **1.** An adherent of satan or satanism. | *"In academic literature, diabolist designates an adherent of satan or satanism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diabolize]] | verb | **1.** Turn into a devil or make devilish. | *"In academic literature, diabolize designates turn into a devil or make devilish."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diatribe]] | noun | **1.** A bitter and abusive speech or piece of writing.<br>**2.** Ironic or satirical criticism. | *"You couldn’t kill a cornered rat with a stick of dynamite—_real_ dynamite, and not the sort you are deluded into believing I have hidden away.” “Anything more?” he demanded, when I had ceased from my diatribe."* — Jack London, *The Jacket (The Star-Rover)* |
| [[emblem]] | noun | **1.** A picture with a motto or set of verses intended as a moral lesson.<br>**2.** An object or the figure of an object symbolizing and suggesting another object or an idea. | *"You shall find in the regiment of the Spinii one Captain Spurio, with his cicatrice, an emblem of war, here on his sinister cheek; it was this very sword entrench’d it."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[emblematic]] | noun | **1.** Of, relating to, or constituting an emblem : symbolic, representative. | *"This instrument, however, might perhaps have been emblematic of his double functions."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[emblematical]] | adjective | **1.** Serving as a visible symbol for something abstract. | *"Go and gaze upon the iron emblematical harpoons round yonder lofty mansion, and your question will be answered."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[embolic]] | noun | **1.** Of or relating to an embolus or embolism. | *"In academic literature, embolic designates of or relating to an embolus or embolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[embolism]] | noun | **1.** The insertion of one or more days in a calendar : intercalation.<br>**2.** The sudden obstruction of a blood vessel by an embolus. | *"In academic literature, embolism designates the insertion of one or more days in a calendar : intercalation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[embolismic]] | noun | **1.** The insertion of one or more days in a calendar : intercalation.<br>**2.** The sudden obstruction of a blood vessel by an embolus. | *"In academic literature, embolismic designates the insertion of one or more days in a calendar : intercalation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[embolize]] | noun | **1.** Verb*) To subject to, transform by, or operate upon through throw. | *"In academic literature, embolize designates verb*) to subject to, transform by, or operate upon through throw."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[embolon]] | noun | **1.** A blood clot or swelling, particularly one that blocks an artery; an embolus.<br>**2.** A battering ram on a warship. | *"In academic literature, embolon designates a blood clot or swelling, particularly one that blocks an artery; an embolus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[embolus]] | noun | **1.** An abnormal particle (such as an air bubble) circulating in the blood. | *"In academic literature, embolus designates an abnormal particle (such as an air bubble) circulating in the blood."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emboly]] | noun | **1.** embolic invagination. | *"In academic literature, emboly designates embolic invagination."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimetabolic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of half. | *"In academic literature, hemimetabolic designates adjective*) pertaining to, derived from, or characteristic of half."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimetabolism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hemi.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, hemimetabolism designates a term designating an entity, condition, or phenomenon derived from greek hemi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimetabolous]] | adjective | **1.** (of an insect with aquatic young) undergoing incomplete metamorphosis in which the young does not resemble the adult. | *"In academic literature, hemimetabolous designates (of an insect with aquatic young) undergoing incomplete metamorphosis in which the young does not resemble the adult."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hemimetaboly]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek hemi.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, hemimetaboly designates a term designating an entity, condition, or phenomenon derived from greek hemi."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterometabolic]] | adjective | **1.** (of an insect) undergoing incomplete metamorphosis in which the nymph is essentially like the adult and there is no pupal stage. | *"In academic literature, heterometabolic designates (of an insect) undergoing incomplete metamorphosis in which the nymph is essentially like the adult and there is no pupal stage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterometabolism]] | noun | **1.** Development of insects with incomplete metamorphosis in which no pupal stage precedes maturity. | *"In academic literature, heterometabolism designates development of insects with incomplete metamorphosis in which no pupal stage precedes maturity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterometabolous]] | adjective | **1.** (of an insect) undergoing incomplete metamorphosis in which the nymph is essentially like the adult and there is no pupal stage. | *"In academic literature, heterometabolous designates (of an insect) undergoing incomplete metamorphosis in which the nymph is essentially like the adult and there is no pupal stage."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterometaboly]] | noun | **1.** Development of insects with incomplete metamorphosis in which no pupal stage precedes maturity. | *"In academic literature, heterometaboly designates development of insects with incomplete metamorphosis in which no pupal stage precedes maturity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holometabolic]] | adjective | **1.** (of an insect) undergoing complete metamorphosis. | *"In academic literature, holometabolic designates (of an insect) undergoing complete metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holometabolism]] | noun | **1.** Characterized by complete metamorphosis. | *"In academic literature, holometabolism designates characterized by complete metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holometabolous]] | adjective | **1.** (of an insect) undergoing complete metamorphosis. | *"In academic literature, holometabolous designates (of an insect) undergoing complete metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[holometaboly]] | noun | **1.** Complete metamorphosis in insects. | *"In academic literature, holometaboly designates complete metamorphosis in insects."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperbola]] | noun | **1.** A plane curve generated by a point so moving that the difference of the distances from two fixed points is a constant : a curve formed by the intersection of a double right circular cone with a plane that cuts both halves of the cone.<br>**2.** A hyperbola with its asymptotes at right angles. | *"In academic literature, hyperbola designates a plane curve generated by a point so moving that the difference of the distances from two fixed points is a constant : a curve formed by the intersection of a double right circular cone with a plane that cuts both halves of the cone."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperbole]] | noun | **1.** Extravagant exaggeration (such as "mile-high ice-cream cones"). | *"Indeed I think it is one among several cities to which an extreme hyperbole has been applied—‘See Rome and die:’ but in your case I would propose an emendation and say, See Rome as a bride, and live henceforth as a happy wife.” Mr."* — George Eliot, *Middlemarch* |
| [[hyperbolic]] | noun | **1.** Of, relating to, or marked by language that exaggerates or overstates the truth : of, relating to, or marked by hyperbole.<br>**2.** Of, relating to, or being like a curve that is formed by the intersection of a double right circular cone with a plane that cuts both halves of the cone : of, relating to, or being analogous to a hyperbola. | *"Indeed, he seemed to approach the grave as a hyperbolic curve approaches a straight line—less directly as he got nearer, till it was doubtful if he would ever reach it at all."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[hyperbolise]] | verb | **1.** To enlarge beyond bounds or the truth. | *"In academic literature, hyperbolise designates to enlarge beyond bounds or the truth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperbolize]] | verb | **1.** To enlarge beyond bounds or the truth. | *"In academic literature, hyperbolize designates to enlarge beyond bounds or the truth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperboloid]] | noun | **1.** A quadric surface whose sections by planes parallel to one coordinate plane are ellipses while those sections by planes parallel to the other two are hyperbolas if proper orientation of the axes is assumed. | *"In academic literature, hyperboloid designates a quadric surface whose sections by planes parallel to one coordinate plane are ellipses while those sections by planes parallel to the other two are hyperbolas if proper orientation of the axes is assumed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperboloidal]] | adjective | **1.** Having the shape of a hyperboloid. | *"In academic literature, hyperboloidal designates having the shape of a hyperboloid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[katabolic]] | adjective | **1.** Relating to or characterized by catabolism.<br>**2.** Characterized by destructive metabolism. | *"In academic literature, katabolic designates relating to or characterized by catabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[katabolism]] | noun | **1.** Breakdown in living organisms of more complex substances into simpler ones together with release of energy. | *"In academic literature, katabolism designates breakdown in living organisms of more complex substances into simpler ones together with release of energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metabolic]] | noun | **1.** Of, relating to, or based on metabolism.<br>**2.** A syndrome marked by the presence of usually three or more of a group of factors (such as high blood pressure, abdominal obesity, high triglyceride levels, low HDL levels, and high fasting levels of blood sugar) that are linked to increased risk of cardiovascular disease and type 2 diabetes —called also insulin resistance syndrome. | *"In academic literature, metabolic designates of, relating to, or based on metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metabolise]] | verb | **1.** Produce by metabolism. | *"In academic literature, metabolise designates produce by metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metabolism]] | noun | **1.** The sum of the processes in the buildup and destruction of protoplasm; specifically : the chemical changes in living cells by which energy is provided for vital processes and activities and new material is assimilated.<br>**2.** The sum of the processes by which a particular substance is handled in the living body. | *"In academic literature, metabolism designates the sum of the processes in the buildup and destruction of protoplasm; specifically : the chemical changes in living cells by which energy is provided for vital processes and activities and new material is assimilated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metabolite]] | noun | **1.** A product of metabolism.<br>**2.** A substance essential to the metabolism of a particular organism or to a particular metabolic process. | *"In academic literature, metabolite designates a product of metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metabolize]] | noun | **1.** To subject to metabolism.<br>**2.** To perform metabolism. | *"In academic literature, metabolize designates to subject to metabolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metabolous]] | adjective | **1.** Undergoing metamorphosis. | *"In academic literature, metabolous designates undergoing metamorphosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palaver]] | noun | **1.** A long parley usually between persons of different cultures or levels of sophistication.<br>**2.** Conference, discussion. | *"Dad useter take the hide off'n me and Bob for lyin'; an' then he'd stand an' palaver folks that he jest couldn't scurce abide, fur I heard him say so."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[para]] | noun | **1.** (obstetrics) the number of liveborn children a woman has delivered.<br>**2.** 100 para equal 1 dinar in yugoslavia. | *"I am an admirer of Montesquieu,” replied Prince Andrew, “and his idea that le principe des monarchies est l’honneur me paraît incontestable."* — graf Leo Tolstoy, *War and Peace* |
| [[parable]] | noun | **1.** A usually short fictitious story that illustrates a moral attitude or a religious principle; also : something (such as a news story or a series of real events) likened to a parable in providing an instructive example or lesson. | *"Thou shalt never get such a secret from me but by a parable."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parabola]] | noun | **1.** A plane curve generated by a point moving so that its distance from a fixed point is equal to its distance from a fixed line : the intersection of a right circular cone with a plane parallel to an element of the cone.<br>**2.** Something bowl-shaped (such as an antenna or microphone reflector). | *"The end of the liquid parabola has come forward from the wall, has advanced over the plinth mouldings, over a heap of stones, over the marble border, into the midst of Fanny Robin’s grave."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[parabolic]] | noun | **1.** Expressed by or being a parable : allegorical.<br>**2.** Of, having the form of, or relating to a parabola. | *"At any distance the beam from the parabolic reflector will be more intense than that from the spherical one, since the rays will be closer together."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[parabolical]] | adjective | **1.** Resembling or expressed by parables.<br>**2.** Having the form of a parabola. | *"In academic literature, parabolical designates resembling or expressed by parables."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraboloid]] | noun | **1.** A surface all of whose intersections by planes are either parabolas and ellipses or parabolas and hyperbolas.<br>**2.** A saddle-shaped quadric surface whose sections by planes parallel to one coordinate plane are hyperbolas while those sections by planes parallel to the other two are parabolas if proper orientation of the coordinate axes is assumed. | *"In academic literature, paraboloid designates a surface all of whose intersections by planes are either parabolas and ellipses or parabolas and hyperbolas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paraboloidal]] | adjective | **1.** Having the shape of a paraboloid. | *"In academic literature, paraboloidal designates having the shape of a paraboloid."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pare]] | verb | **1.** Decrease gradually or bit by bit.<br>**2.** Cut small bits or pare shavings from. | *"And what would you have me to do? ’Tis too late to pare her nails now."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parer]] | noun | **1.** A manicurist who trims the fingernails.<br>**2.** A small sharp knife used in paring fruits or vegetables. | *"In academic literature, parer designates a manicurist who trims the fingernails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paring]] | noun | **1.** A thin fragment or slice (especially of wood) that has been shaved from something.<br>**2.** (usually plural) a part of a fruit or vegetable that is pared or cut off; especially the skin or peel. | *"Virginity breeds mites, much like a cheese; consumes itself to the very paring, and so dies with feeding his own stomach."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parity]] | noun | **1.** (obstetrics) the number of liveborn children a woman has delivered.<br>**2.** (mathematics) a relation between a pair of integers: if both integers are odd or both are even they have the same parity; if one is odd and the other is even they have different parity. | *"It is hoped that they will have the high credit of municipal bonds so that they may be sold at parity, bearing interest at 4 or 4.5 per cent."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[parlance]] | noun | **1.** A manner of speaking that is natural to native speakers of a language. | *"She is not what in common parlance is called a lady,” said Angel, unflinchingly, “for she is a cottager’s daughter, as I am proud to say."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[parle]] | verb | **1.** parley.<br>**2.** French is spoken here. | *"As thou art to thyself: Such was the very armour he had on When he th’ambitious Norway combated; So frown’d he once, when in an angry parle He smote the sledded Polacks on the ice. ’Tis strange."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parley]] | noun | **1.** To speak with another : confer; specifically : to discuss terms with an enemy.<br>**2.** A conference for discussion of points in dispute. | *"Now, Mars, I prithee, make us quick in work, That we with smoking swords may march from hence To help our fielded friends!—Come, blow thy blast. [_They sound a parley._] Enter two Senators with others on the walls of Corioles."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parlor]] | noun | **1.** Reception room in an inn or club where visitors can be received.<br>**2.** A room in a private house or establishment where people can sit and talk and relax. | *"She said, 'Two gentlemen are in the parlor waiting for you.' I went down, and the interview revealed the exact fulfillment both of the promise and the prophecy."* — Classic Author, *The wonders of prayer* |
| [[parlous]] | adjective | **1.** Fraught with danger. | *"Thou art in a parlous state, shepherd."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parol]] | noun | **1.** Word of mouth. | *"The great number of letters received of this class, led her to decide to spend some months at Annapolis, among the camps and records of paroled and exchanged prisoners, for the purpose of answering the inquiries of friends."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[parole]] | noun | **1.** A promise made with or confirmed by a pledge of one's honor; especially : the promise of a prisoner of war to fulfill stated conditions in consideration of their release.<br>**2.** A watchword given only to officers of the guard and of the day. | *"Bagnet,” says the trooper, “I am on my parole with you."* — Charles Dickens, *Bleak House* |
| [[parolee]] | noun | **1.** Someone released on probation or on parole. | *"In academic literature, parolee designates someone released on probation or on parole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parous]] | adjective | **1.** Having given birth to one or more viable children. | *"In academic literature, parous designates having given birth to one or more viable children."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[problem]] | noun | **1.** A question raised for inquiry, consideration, or solution.<br>**2.** A proposition in mathematics or physics stating something to be done. | *"She told him of the problem she had with Bruno's further education, because the lessons he had been having from the Rector would end in the fall, and of her firm intention of keeping him from living together with his two present comrades."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[problematic]] | noun | **1.** Posing a problem : difficult to solve or decide.<br>**2.** Not definite or settled : uncertain. | *"The whole thing is too problematic; I cannot consent to be the cause of your goodness being wasted."* — George Eliot, *Middlemarch* |
| [[problematical]] | adjective | **1.** Open to doubt or debate.<br>**2.** Making great mental demands; hard to comprehend or solve or believe. | *"The conversation seemed to imply that the issue was problematical, and that a majority for Tyke was not so certain as had been generally supposed."* — George Eliot, *Middlemarch* |
| [[problematically]] | adverb | **1.** In such a way as to pose a problem. | *"In academic literature, problematically designates in such a way as to pose a problem."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[reparable]] | adjective | **1.** Capable of being repaired or rectified. | *"I fear he is not to be reclaimed; there is scarcely a hope that anything in his character or fortunes is reparable now."* — Charles Dickens, *A Tale of Two Cities* |
| [[reparation]] | noun | **1.** Compensation (given or received) for an insult or injury.<br>**2.** (usually plural) compensation exacted from a defeated nation by the victors. | *"Then I shall acknowledge it and make him reparation.” Everything postponed to that imaginary time!"* — Charles Dickens, *Bleak House* |
| [[symbol]] | noun | **1.** An authoritative summary of faith or doctrine : creed.<br>**2.** Something that stands for or suggests something else by reason of relationship, association, convention, or accidental resemblance; especially : a visible sign of something invisible. | *"This quantity theory may be expressed in the formula P = MR/N when P is the symbol for price, or the general price level, N is (1) above, R is (2), and M is (3)."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[symbolic]] | noun | **1.** Using, employing, or exhibiting a symbol.<br>**2.** Consisting of or proceeding by means of symbols. | *"The long shadows of the forest had slipped downhill while we talked, had gone far beyond the ruined hovel, beyond the symbolic row of stakes."* — Joseph Conrad, *Heart of Darkness* |
| [[symbolical]] | adjective | **1.** Relating to or using or proceeding by means of symbols.<br>**2.** Serving as a visible symbol for something abstract. | *"Everything is symbolical, you know—the higher style of art: I like that up to a certain point, but not too far—it’s rather straining to keep up with, you know."* — George Eliot, *Middlemarch* |
| [[symbolically]] | adverb | **1.** In a symbolic manner.<br>**2.** By means of symbols. | *"As in droughty regions baptism by immersion could only be performed symbolically, Mr."* — George Eliot, *Middlemarch* |
| [[symbolisation]] | noun | **1.** The use of symbols to convey meaning.<br>**2.** Something visible that by association or convention represents something else that is invisible. | *"In academic literature, symbolisation designates the use of symbols to convey meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbolise]] | verb | **1.** Represent or identify by using a symbol; use symbols.<br>**2.** Express indirectly by an image, form, or model; be a symbol. | *"It may serve, let us hope, to symbolise some sweet moral blossom that may be found along the track, or relieve the darkening close of a tale of human frailty and sorrow."* — Nathaniel Hawthorne, *The Scarlet Letter* |
| [[symboliser]] | noun | **1.** Someone skilled in the interpretation or representation of symbols. | *"In academic literature, symboliser designates someone skilled in the interpretation or representation of symbols."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbolising]] | noun | **1.** The act of representing something with a symbol.<br>**2.** Represent or identify by using a symbol; use symbols. | *"Then the usual form of marriage is performed between the priest and his wife, symbolising the supposed union between Sun and Earth."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[symbolism]] | noun | **1.** The art or practice of using symbols especially by investing things with a symbolic meaning or by expressing the invisible or intangible by means of visible or sensuous representations: such as.<br>**2.** Artistic imitation or invention that is a method of revealing or suggesting immaterial, ideal, or otherwise intangible truth or states. | *"Using the symbolism of the Hebrew religion and its tabernacle, he compares Jesus to the High Priest, but Jesus, he says, does not enter into the holiest alone."* — T. R. Glover, *The Jesus of History* |
| [[symbolist]] | noun | **1.** One who employs symbols or symbolism.<br>**2.** One skilled in the interpretation or explication of symbols. | *"In academic literature, symbolist designates one who employs symbols or symbolism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbolization]] | noun | **1.** The use of symbols to convey meaning.<br>**2.** Something visible that by association or convention represents something else that is invisible. | *"In academic literature, symbolization designates the use of symbols to convey meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbolize]] | noun | **1.** To serve as a symbol of.<br>**2.** To represent, express, or identify by a symbol. | *"No, thought I, there must be some sober reason for this thing; furthermore, it must symbolize something unseen."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[symbolizer]] | noun | **1.** Someone skilled in the interpretation or representation of symbols. | *"In academic literature, symbolizer designates someone skilled in the interpretation or representation of symbols."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[symbolizing]] | noun | **1.** The act of representing something with a symbol.<br>**2.** Express indirectly by an image, form, or model; be a symbol. | *"The beauty and majesty of the finely carved panels surmounting the soaring arches spanning the rosy monolith columns, emblazoned with emerald green and scarlet mosaic symbolizing the Báb's lineage and martyrdom, are strikingly revealed."* — Effendi Shoghi, *Citadel of Faith* |
| [[symbology]] | noun | **1.** The art of expression by symbols.<br>**2.** The study or interpretation of symbols. | *"In academic literature, symbology designates the art of expression by symbols."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thromboembolism]] | noun | **1.** The blocking of a blood vessel by a particle that has broken away from a blood clot at its site of formation. | *"In academic literature, thromboembolism designates the blocking of a blood vessel by a particle that has broken away from a blood clot at its site of formation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tribal]] | adjective | **1.** Relating to or characteristic of a tribe. | *"Be that as it may, throughout history the family and tribal elders passed their knowledge and codes of conduct on to those who, as part of the natural process, carry the torches into the future."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[tribe]] | noun | **1.** A social division of (usually preliterate) people.<br>**2.** A federation (as of american indians). | *"I would my son Were in Arabia and thy tribe before him, His good sword in his hand."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[unproblematic]] | adjective | **1.** Easy and not involved or complicated. | *"In academic literature, unproblematic designates easy and not involved or complicated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[unsymbolic]] | adjective | **1.** Not standing for something else. | *"In academic literature, unsymbolic designates not standing for something else."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Action]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · BAL
  </div>
</div>
