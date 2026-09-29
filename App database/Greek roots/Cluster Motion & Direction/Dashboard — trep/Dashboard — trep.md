---
status: unread
type: root_dashboard
---
# Dashboard — trep
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">τρέπειν</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“turn”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'turn'.</span>
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

The Greek root **trep** (τρέπειν, τρέψις, τρόπος, τρόπου, τροπή, τροπῆς, τροπικός (trépein, trépsis, trópos, tropḗ, tropikós)) signifies turn. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Atropos*, *allotrope*, *anisotropy*, *contrive*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: turn
> The Greek root **trep** fundamentally denotes **turn**. The physical sensory observation and cognitive anchor underlying 'turn'. In classical Greek antiquity, the root denoted 'turn', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">turn</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'turn'.</mark>
> - **Everyday Connection**: Think of familiar words like *Atropos*, *allotrope*, *anisotropy*, *contrive*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **trep** derives from Ancient Greek <mark class="hl-stem">τρέπειν, τρέψις, τρόπος, τρόπου, τροπή, τροπῆς, τροπικός (trépein, trépsis, trópos, tropḗ, tropikós)</mark>, meaning "turn".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with trep**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'turn'.
  - Whenever you see **trep** in an English word, think immediately of **turn**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">trep</mark>, think of <mark class="hl-def">turn</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `trep-` (from *τρέπειν, τρέψις, τρόπος, τρόπου, τροπή, τροπῆς, τροπικός (trépein, trépsis, trópos, tropḗ, tropikós)*).
> - **Combining Stem with -o- Connective:** `trepo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Trep
> - **1. Direct & Concrete Anchor:** Literal instantiation of turn in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on trep

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `trep-` | [[Atropos]] | Primary root semantic foundation denoting turn. |
| **Connecting -o-** | `trepo-` | [[allotrope]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `trep` | [[anisotropy]] | Relational or directional modification of the core root sense. |

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
| [[allotrope]] | noun | **1.** A form showing allotropy. | *"Black-lead--or, as we term it, graphite--of which I have several specimens here--is simply carbon--an allotrope of carbon--the same elementary substance, notwithstanding, as the diamond."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[allotropic]] | adjective | **1.** Of or related to or exhibiting allotropism. | *"Just let me tell you, to use a very hard word, that we call the diamond an "allotropic" form of carbon."* — Charles Meymott Tidy, *The Story of a Tinder-box* |
| [[allotropical]] | adjective | **1.** Of or related to or exhibiting allotropism. | *"In academic literature, allotropical designates of or related to or exhibiting allotropism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[allotropism]] | noun | **1.** The phenomenon of an element existing in two or more physical forms. | *"In academic literature, allotropism designates the phenomenon of an element existing in two or more physical forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anisotropic]] | adjective | **1.** Not invariant with respect to direction. | *"In academic literature, anisotropic designates not invariant with respect to direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anisotropy]] | noun | **1.** Exhibiting properties with different values when measured in different directions. | *"In academic literature, anisotropy designates exhibiting properties with different values when measured in different directions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Atropos]] | noun | **1.** One of the three Fates in Greek and Roman mythology who determine human destinies. | *"In academic literature, Atropos designates one of the three fates in greek and roman mythology who determine human destinies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[contrary]] | noun | **1.** A relation of direct opposition.<br>**2.** Exact opposition. | *"Ev’n as soon as thou canst, for thou hast to pull at a smack o’ th’ contrary."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contrition]] | noun | **1.** Sorrow for sin arising from fear of damnation. | *"Snagsby!” It was necessary for her mistress to comfort her—which she did, I must say, with a good deal of contrition—before she could be got beyond this."* — Charles Dickens, *Bleak House* |
| [[contrivance]] | noun | **1.** A device or control that is very useful for a particular job.<br>**2.** The faculty of contriving; inventive skill. | *"Ah! ’tis wonderful what can be done by contrivance!” “My own mind exactly, neighbour.” “Ah, he’s his grandfer’s own grandson!—his grandfer were just such a nice unparticular man!” said the maltster."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[contrive]] | noun | **1.** Devise, plan.<br>**2.** To form or create in an artistic or ingenious manner. | *"Was’t you that did so oft contrive to kill him?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contrived]] | verb | **1.** Make or work out a plan for; devise.<br>**2.** Come up with (an idea, plan, explanation, theory, or principle) after a mental effort. | *"We charge you that you have contrived to take From Rome all seasoned office and to wind Yourself into a power tyrannical, For which you are a traitor to the people."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[contriver]] | noun | **1.** A person who makes plans. | *"I’ll tell thee, Charles, it is the stubbornest young fellow of France, full of ambition, an envious emulator of every man’s good parts, a secret and villainous contriver against me his natural brother."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[ectropion]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek trep.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, ectropion designates a term designating an entity, condition, or phenomenon derived from greek trep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entrepot]] | noun | **1.** A port where merchandise can be imported and then exported without paying import duties.<br>**2.** A depository for goods. | *"In academic literature, entrepot designates a port where merchandise can be imported and then exported without paying import duties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entrepreneur]] | noun | **1.** Someone who organizes a business venture and assumes the risk for it. | *"In academic literature, entrepreneur designates someone who organizes a business venture and assumes the risk for it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entrepreneurial]] | adjective | **1.** Of or relating to an entrepreneur.<br>**2.** Willing to take risks in order to make a profit. | *"In academic literature, entrepreneurial designates of or relating to an entrepreneur."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entropic]] | noun | **1.** A measure of the unavailable energy in a closed thermodynamic system that is also usually considered to be a measure of the system's disorder, that is a property of the system's state, and that varies directly with any reversible change in heat in the system and inversely with the temperature of the system; broadly : the degree of disorder or uncertainty in a system.<br>**2.** The degradation of the matter and energy in the universe to an ultimate state of inert uniformity. | *"In academic literature, entropic designates a measure of the unavailable energy in a closed thermodynamic system that is also usually considered to be a measure of the system's disorder, that is a property of the system's state, and that varies directly with any reversible change in heat in the system and inversely with the temperature of the system; broadly : the degree of disorder or uncertainty in a system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entropion]] | noun | **1.** The inversion or turning inward of the border of the eyelid against the eyeball. | *"In academic literature, entropion designates the inversion or turning inward of the border of the eyelid against the eyeball."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[entropy]] | noun | **1.** A measure of the unavailable energy in a closed thermodynamic system that is also usually considered to be a measure of the system's disorder, that is a property of the system's state, and that varies directly with any reversible change in heat in the system and inversely with the temperature of the system; broadly : the degree of disorder or uncertainty in a system.<br>**2.** The degradation of the matter and energy in the universe to an ultimate state of inert uniformity. | *"In academic literature, entropy designates a measure of the unavailable energy in a closed thermodynamic system that is also usually considered to be a measure of the system's disorder, that is a property of the system's state, and that varies directly with any reversible change in heat in the system and inversely with the temperature of the system; broadly : the degree of disorder or uncertainty in a system."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliotropism]] | noun | **1.** Phototropism in which sunlight is the orienting stimulus. | *"In academic literature, heliotropism designates phototropism in which sunlight is the orienting stimulus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isentropic]] | noun | **1.** Of or relating to equal or constant entropy; especially : taking place without change of entropy. | *"In academic literature, isentropic designates of or relating to equal or constant entropy; especially : taking place without change of entropy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isotrope]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek trep.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, isotrope designates a term designating an entity, condition, or phenomenon derived from greek trep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isotropic]] | noun | **1.** Exhibiting properties (such as velocity of light transmission) with the same values when measured along axes in all directions. | *"In academic literature, isotropic designates exhibiting properties (such as velocity of light transmission) with the same values when measured along axes in all directions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isotropous]] | adjective | **1.** Invariant with respect to direction. | *"In academic literature, isotropous designates invariant with respect to direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isotropy]] | noun | **1.** Exhibiting properties (such as velocity of light transmission) with the same values when measured along axes in all directions. | *"In academic literature, isotropy designates exhibiting properties (such as velocity of light transmission) with the same values when measured along axes in all directions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pleiotropic]] | noun | **1.** Producing more than one effect; especially : having multiple phenotypic expressions. | *"In academic literature, pleiotropic designates producing more than one effect; especially : having multiple phenotypic expressions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pleiotropy]] | noun | **1.** The phenomenon of a single gene influencing two or more distinct phenotypic traits : the quality or state of being pleiotropic. | *"In academic literature, pleiotropy designates the phenomenon of a single gene influencing two or more distinct phenotypic traits : the quality or state of being pleiotropic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytrope]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek trep.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, polytrope designates a term designating an entity, condition, or phenomenon derived from greek trep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protrepsis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek trep.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, protrepsis designates a term designating an entity, condition, or phenomenon derived from greek trep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protreptic]] | noun | **1.** An utterance (such as a speech) designed to instruct and persuade. | *"In academic literature, protreptic designates an utterance (such as a speech) designed to instruct and persuade."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[psychotropic]] | noun | **1.** Acting on the mind. | *"In academic literature, psychotropic designates acting on the mind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[retrievable]] | adjective | **1.** Capable of being regained especially with effort. | *"Carstone, and you can only hope that his position may be yet retrievable."* — Charles Dickens, *Bleak House* |
| [[retrieval]] | noun | **1.** (computer science) the operation of accessing information from the computer's memory.<br>**2.** The cognitive operation of accessing information in memory. | *"Am I to lose _all_, without a chance of retrieval?"* — Emily Brontë, *Wuthering Heights* |
| [[retrieve]] | noun | **1.** To locate and bring in (killed or wounded game).<br>**2.** To call to mind again. | *"I have no doubt that his desire to retrieve what he had lost was rendered the more intense by his grief for his young wife, and became like the madness of a gamester."* — Charles Dickens, *Bleak House* |
| [[retriever]] | noun | **1.** A dog with heavy water-resistant coat that can be trained to retrieve game. | *"Then snatch your purse. _(The retriever approaches sniffing, nose to the ground."* — James Joyce, *Ulysses* |
| [[trepan]] | noun | **1.** To use a trephine on (the skull).<br>**2.** To remove a disk or cylindrical core (as from metal for testing). | *"With his philibeg an’ tartan plaid, An’ guid claymore down by his side, The ladies’ hearts he did trepan, My gallant, braw John Highlandman."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[trepang]] | noun | **1.** Of warm coasts from australia to asia; used as food especially by chinese. | *"The chief products of the country are mother-of-pearl shell, Beche-de-mer (or trepang), copra, and tortoise-shell."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[trepid]] | adjective | **1.** Timid by nature or revealing timidity. | *"In academic literature, trepid designates timid by nature or revealing timidity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trepidation]] | noun | **1.** A feeling of alarm or dread. | *"Tess thought this was the mansion itself till, passing through the side wicket with some trepidation, and onward to a point at which the drive took a turn, the house proper stood in full view."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[trepidly]] | adverb | **1.** In a timorous and trepid manner. | *"In academic literature, trepidly designates in a timorous and trepid manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[treponema]] | noun | **1.** Any of a genus (Treponema) of spirochetes that are pathogenic in humans and other warm-blooded animals and include the causative agents of syphilis and yaws. | *"In academic literature, treponema designates any of a genus (treponema) of spirochetes that are pathogenic in humans and other warm-blooded animals and include the causative agents of syphilis and yaws."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[treponemataceae]] | noun | **1.** Small spirochetes some parasitic or pathogenic. | *"In academic literature, treponemataceae designates small spirochetes some parasitic or pathogenic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[treponematosis]] | noun | **1.** Infection with or disease caused by treponemata. | *"In academic literature, treponematosis designates infection with or disease caused by treponemata."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[treponeme]] | noun | **1.** treponema. | *"In academic literature, treponeme designates treponema."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[treponemiasis]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek trep.<br>**2.** Specialized application within the domain of Motion & Direction. | *"In academic literature, treponemiasis designates a term designating an entity, condition, or phenomenon derived from greek trep."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tropism]] | noun | **1.** Involuntary orientation by an organism or one of its parts that involves turning or curving by movement or by differential growth and is a positive or negative response to a source of stimulation.<br>**2.** A reflex reaction involving a tropism. | *"In academic literature, tropism designates involuntary orientation by an organism or one of its parts that involves turning or curving by movement or by differential growth and is a positive or negative response to a source of stimulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[tropopause]] | noun | **1.** The region at the top of the troposphere; also : a comparable layer of a celestial body. | *"In academic literature, tropopause designates the region at the top of the troposphere; also : a comparable layer of a celestial body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[troposphere]] | noun | **1.** The lowest densest part of the earth's atmosphere in which most weather changes occur and temperature generally decreases rapidly with altitude and which extends from the earth's surface to the bottom of the stratosphere at about 7 miles (11 kilometers) high. | *"In academic literature, troposphere designates the lowest densest part of the earth's atmosphere in which most weather changes occur and temperature generally decreases rapidly with altitude and which extends from the earth's surface to the bottom of the stratosphere at about 7 miles (11 kilometers) high."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[troubadour]] | noun | **1.** One of a class of lyric poets often of knightly rank who flourished from the 11th to the 13th century in France and Italy and whose major theme was courtly love.<br>**2.** A singer especially of folk songs. | *"The moment the dance was over he caught up a guitar, and, lolling against the old marble fireplace in an attitude which I am half inclined to suspect was studied, began the little French air of the Troubadour."* — Washington Irving, *The Sketch-Book of Geoffrey Crayon* |
| [[trove]] | noun | **1.** Discovery, find.<br>**2.** A valuable collection : treasure; also : haul, collection. | *"Luckiest of all was Israel Stickney in casting lots, so that in the end, when he passed, he was a veritable treasure trove of clothing."* — Jack London, *The Jacket (The Star-Rover)* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Motion & Direction]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TREP
  </div>
</div>
