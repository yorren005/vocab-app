---
status: unread
type: root_dashboard
---
# Dashboard — ur
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">οὐρά</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“tail”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'tail'.</span>
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

The Greek root **ur** (οὐρά, οὐρᾶς (ourá, ourâs)) signifies tail. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Anura*, *Diplura*, *Protura*, *anthurium*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: tail
> The Greek root **ur** fundamentally denotes **tail**. The physical sensory observation and cognitive anchor underlying 'tail'. In classical Greek antiquity, the root denoted 'tail', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">tail</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'tail'.</mark>
> - **Everyday Connection**: Think of familiar words like *Anura*, *Diplura*, *Protura*, *anthurium*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ur** derives from Ancient Greek <mark class="hl-stem">οὐρά, οὐρᾶς (ourá, ourâs)</mark>, meaning "tail".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with ur**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'tail'.
  - Whenever you see **ur** in an English word, think immediately of **tail**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ur</mark>, think of <mark class="hl-def">tail</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `ur-` (from *οὐρά, οὐρᾶς (ourá, ourâs)*).
> - **Combining Stem with -o- Connective:** `uro-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Ur
> - **1. Direct & Concrete Anchor:** Literal instantiation of tail in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on ur

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `ur-` | [[Anura]] | Primary root semantic foundation denoting tail. |
| **Connecting -o-** | `uro-` | [[Diplura]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `ur` | [[Protura]] | Relational or directional modification of the core root sense. |

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
| [[anthurium]] | noun | **1.** Any of a genus (Anthurium) of tropical American plants of the arum family with large often brightly colored leaves, a cylindrical spadix, and a colored spathe. | *"In academic literature, anthurium designates any of a genus (anthurium) of tropical american plants of the arum family with large often brightly colored leaves, a cylindrical spadix, and a colored spathe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antidiuretic]] | noun | **1.** Vasopressin.<br>**2.** A polypeptide hormone secreted by the posterior lobe of the pituitary gland or obtained synthetically that increases blood pressure and decreases urine flow —called also antidiuretic hormone. | *"In academic literature, antidiuretic designates vasopressin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Anura]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, Anura designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anuresis]] | noun | **1.** Inability to urinate. | *"In academic literature, anuresis designates inability to urinate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anuretic]] | adjective | **1.** Of or relating to an inability to urinate. | *"In academic literature, anuretic designates of or relating to an inability to urinate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[brachyura]] | noun | **1.** An order of crustaceans (including true crabs) having a reduced abdomen folded against the ventral surface. | *"In academic literature, brachyura designates an order of crustaceans (including true crabs) having a reduced abdomen folded against the ventral surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[brachyurous]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of tail. | *"In academic literature, brachyurous designates adjective*) pertaining to, derived from, or characteristic of tail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[colure]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, colure designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[cynosure]] | noun | **1.** The northern constellation Ursa Minor; also : north star.<br>**2.** One that serves to direct or guide. | *"Then I thought of Eliza and Georgiana; I beheld one the cynosure of a ball-room, the other the inmate of a convent cell; and I dwelt on and analysed their separate peculiarities of person and character."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[cystinuria]] | noun | **1.** A metabolic defect characterized by excretion of excessive amounts of cystine in the urine and inherited as an autosomal recessive trait. | *"In academic literature, cystinuria designates a metabolic defect characterized by excretion of excessive amounts of cystine in the urine and inherited as an autosomal recessive trait."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Diplura]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, Diplura designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diuresis]] | noun | **1.** An increased excretion of urine. | *"In academic literature, diuresis designates an increased excretion of urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diuretic]] | noun | **1.** Tending to increase the excretion of urine. | *"I had, the evening before, drunk plentifully of a most delicious wine called _glimigrim_, (the Blefuscudians call it _flunec_, but ours is esteemed the better sort,) which is very diuretic."* — Jonathan Swift, *Gulliver's Travels into Several Remote Nations of the World* |
| [[dysuria]] | noun | **1.** Difficult or painful discharge of urine. | *"In academic literature, dysuria designates difficult or painful discharge of urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[encolure]] | noun | **1.** The mane of a horse. | *"In academic literature, encolure designates the mane of a horse."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enuresis]] | noun | **1.** The involuntary discharge of urine : incontinence of urine. | *"In academic literature, enuresis designates the involuntary discharge of urine : incontinence of urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homocystinuria]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, homocystinuria designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[lithuresis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, lithuresis designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyurea]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, polyurea designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyuria]] | noun | **1.** Excessive secretion of urine. | *"In academic literature, polyuria designates excessive secretion of urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Protura]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, Protura designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[strangury]] | noun | **1.** A slow and painful spasmodic discharge of urine drop by drop. | *"In academic literature, strangury designates a slow and painful spasmodic discharge of urine drop by drop."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uraemiauremia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, uraemiauremia designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urea]] | noun | **1.** A soluble weakly basic nitrogenous compound CO(NH2)2 that is the chief solid component of mammalian urine and an end product of protein decomposition, is synthesized from carbon dioxide and ammonia, and is used especially in synthesis (as of resins and plastics) and in fertilizers and animal rations.<br>**2.** A thermosetting synthetic resin made by condensing urea with formaldehyde. | *"In academic literature, urea designates a soluble weakly basic nitrogenous compound co(nh2)2 that is the chief solid component of mammalian urine and an end product of protein decomposition, is synthesized from carbon dioxide and ammonia, and is used especially in synthesis (as of resins and plastics) and in fertilizers and animal rations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uremia]] | noun | **1.** Accumulation in the blood of nitrogenous waste products (urea) that are usually excreted in the urine. | *"In academic literature, uremia designates accumulation in the blood of nitrogenous waste products (urea) that are usually excreted in the urine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uremic]] | noun | **1.** Accumulation in the blood of constituents normally eliminated in the urine that produces a severe toxic condition and usually occurs in severe kidney disease.<br>**2.** The toxic bodily condition associated with uremia. | *"In academic literature, uremic designates accumulation in the blood of constituents normally eliminated in the urine that produces a severe toxic condition and usually occurs in severe kidney disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uresiesthesia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, uresiesthesia designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uresis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, uresis designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ureter]] | noun | **1.** Either of the paired ducts that carry away the urine from a kidney to the bladder or cloaca. | *"In academic literature, ureter designates either of the paired ducts that carry away the urine from a kidney to the bladder or cloaca."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ureteroscopy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, ureteroscopy designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urethra]] | noun | **1.** The canal that in most mammals carries off the urine from the bladder and in the male serves also as a passageway for semen. | *"In academic literature, urethra designates the canal that in most mammals carries off the urine from the bladder and in the male serves also as a passageway for semen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urethral]] | adjective | **1.** Of or relating to the urethra. | *"In academic literature, urethral designates of or relating to the urethra."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uroborus]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, uroborus designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urochord]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ur.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, urochord designates a term designating an entity, condition, or phenomenon derived from greek ur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urochordate]] | noun | **1.** Primitive marine animal having a saclike unsegmented body and a urochord that is conspicuous in the larva. | *"In academic literature, urochordate designates primitive marine animal having a saclike unsegmented body and a urochord that is conspicuous in the larva."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uroid]] | noun | **1.** Adjective & Noun*) Resembling, having the physical form of, or akin to tail. | *"In academic literature, uroid designates adjective & noun*) resembling, having the physical form of, or akin to tail."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urologist]] | noun | **1.** A specialist in urology. | *"In academic literature, urologist designates a specialist in urology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[urology]] | noun | **1.** A physician who specializes in the urinary or urogenital tract. | *"In academic literature, urology designates a physician who specializes in the urinary or urogenital tract."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uropod]] | noun | **1.** Either of the flattened lateral appendages of the last abdominal segment of a crustacean; broadly : an abdominal appendage of a crustacean. | *"In academic literature, uropod designates either of the flattened lateral appendages of the last abdominal segment of a crustacean; broadly : an abdominal appendage of a crustacean."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · UR
  </div>
</div>
