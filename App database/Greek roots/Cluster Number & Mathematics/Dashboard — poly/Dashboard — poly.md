---
status: unread
type: root_dashboard
---
# Dashboard — poly
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">πολλός (pollós)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“many”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'many'.</span>
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

The Greek root **poly** (πολλός (pollós)) signifies many. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *hoi polloi*, *pollakanth*, *polyadic*, *polyandry*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: many
> The Greek root **poly** fundamentally denotes **many**. The physical sensory observation and cognitive anchor underlying 'many'. In classical Greek antiquity, the root denoted 'many', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">many</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'many'.</mark>
> - **Everyday Connection**: Think of familiar words like *hoi polloi*, *pollakanth*, *polyadic*, *polyandry*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **poly** derives from Ancient Greek <mark class="hl-stem">πολλός (pollós)</mark>, meaning "many".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with poly**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'many'.
  - Whenever you see **poly** in an English word, think immediately of **many**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">poly</mark>, think of <mark class="hl-def">many</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `poly-` (from *πολλός (pollós)*).
> - **Combining Stem with -o- Connective:** `polyo-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Poly
> - **1. Direct & Concrete Anchor:** Literal instantiation of many in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on poly

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `poly-` | [[hoi polloi]] | Primary root semantic foundation denoting many. |
| **Connecting -o-** | `polyo-` | [[pollakanth]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `poly` | [[polyadic]] | Relational or directional modification of the core root sense. |

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
| [[hoi polloi]] | noun | **1.** The general populace : masses. | *"In academic literature, hoi polloi designates the general populace : masses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monopoly]] | noun | **1.** Exclusive ownership through legal privilege, command of supply, or concerted action; specifically : exclusive control of a particular market that is marked by the power to control prices and exclude competition.<br>**2.** Exclusive possession or control. | *"No, faith; lords and great men will not let me; if I had a monopoly out, they would have part on’t and ladies too, they will not let me have all the fool to myself; they’ll be snatching."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[oligopoly]] | noun | **1.** A market situation in which each of a few producers affects but does not control the market. | *"In academic literature, oligopoly designates a market situation in which each of a few producers affects but does not control the market."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pollakanth]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek poly.<br>**2.** Specialized application within the domain of Number & Mathematics. | *"In academic literature, pollakanth designates a term designating an entity, condition, or phenomenon derived from greek poly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyadic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of many. | *"In academic literature, polyadic designates adjective*) pertaining to, derived from, or characteristic of many."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyamide]] | noun | **1.** A polymer containing repeated amide groups. | *"In academic literature, polyamide designates a polymer containing repeated amide groups."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyandrist]] | noun | **1.** A woman with two or more husbands. | *"In academic literature, polyandrist designates a woman with two or more husbands."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyandrous]] | noun | **1.** The state or practice of having more than one husband or male mate at one time. | *"In academic literature, polyandrous designates the state or practice of having more than one husband or male mate at one time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyandry]] | noun | **1.** The state or practice of having more than one husband or male mate at one time. | *"In academic literature, polyandry designates the state or practice of having more than one husband or male mate at one time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyangiaceae]] | noun | **1.** Bacteria living mostly in soils and on dung. | *"In academic literature, polyangiaceae designates bacteria living mostly in soils and on dung."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyangium]] | noun | **1.** Type genus of the family polyangiaceae: myxobacteria with rounded fruiting bodies enclosed in a membrane. | *"In academic literature, polyangium designates type genus of the family polyangiaceae: myxobacteria with rounded fruiting bodies enclosed in a membrane."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyanthus]] | noun | **1.** Any of various hybrid primroses.<br>**2.** A narcissus (Narcissus tazetta) having small white or yellow flowers arranged in umbels and having a spreading perianth. | *"In academic literature, polyanthus designates any of various hybrid primroses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyarteritis]] | noun | **1.** Inflammation of several arteries. | *"In academic literature, polyarteritis designates inflammation of several arteries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyatomic]] | noun | **1.** Containing more than one and especially more than two atoms. | *"In academic literature, polyatomic designates containing more than one and especially more than two atoms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polycarp]] | noun | **1.** Greek bishop of smyrna who refused to recant his christian faith and was burned to death by pagans (circa 69-155). | *"The pious Polycarp said: "I cannot turn at once from good to evil." Neither do 77:3 other mortals accomplish the change from error to truth at a single bound."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[polychaeta]] | noun | **1.** Marine annelid worms. | *"In academic literature, polychaeta designates marine annelid worms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polychaete]] | noun | **1.** Any of a class (Polychaeta) of aquatic and chiefly marine annelid worms (such as clam worms or lugworms) that usually possess paired segmental appendages bearing many bristles, produce free-swimming larvae, and are often brightly colored or bioluminescent : bristle worm. | *"In academic literature, polychaete designates any of a class (polychaeta) of aquatic and chiefly marine annelid worms (such as clam worms or lugworms) that usually possess paired segmental appendages bearing many bristles, produce free-swimming larvae, and are often brightly colored or bioluminescent : bristle worm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polychete]] | noun | **1.** Chiefly marine annelids possessing both sexes and having paired appendages (parapodia) bearing bristles. | *"In academic literature, polychete designates chiefly marine annelids possessing both sexes and having paired appendages (parapodia) bearing bristles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polychromatic]] | noun | **1.** Showing a variety or a change of colors : multicolored.<br>**2.** Being or relating to radiation that is composed of more than one wavelength. | *"In academic literature, polychromatic designates showing a variety or a change of colors : multicolored."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polychrome]] | noun | **1.** Relating to, made with, or decorated in several colors. | *"The attractive character of certain localities in Ireland and abroad, as represented in general geographical maps of polychrome design or in special ordnance survey charts by employment of scale numerals and hachures."* — James Joyce, *Ulysses* |
| [[polychromic]] | adjective | **1.** Having or exhibiting many colors. | *"In academic literature, polychromic designates having or exhibiting many colors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polychromise]] | verb | **1.** Color with many colors; make polychrome. | *"In academic literature, polychromise designates color with many colors; make polychrome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polychromize]] | verb | **1.** Color with many colors; make polychrome. | *"In academic literature, polychromize designates color with many colors; make polychrome."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polycillin]] | noun | **1.** Semisynthetic penicillin (trade names principen and polycillin and sk-ampicillin). | *"In academic literature, polycillin designates semisynthetic penicillin (trade names principen and polycillin and sk-ampicillin)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polycirrus]] | noun | **1.** Genus of soft-bodied polychete marine worms. | *"In academic literature, polycirrus designates genus of soft-bodied polychete marine worms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polycrystalline]] | adjective | **1.** Composed of aggregates of crystals. | *"In academic literature, polycrystalline designates composed of aggregates of crystals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polycythemia]] | noun | **1.** A condition marked by an abnormal increase in the number of circulating red blood cells; specifically : polycythemia vera.<br>**2.** Polycythemia of unknown cause that is marked by increase in total blood volume and accompanied by nosebleed, distension of the circulatory vessels, and enlargement of the spleen —called also erythremia. | *"In academic literature, polycythemia designates a condition marked by an abnormal increase in the number of circulating red blood cells; specifically : polycythemia vera."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyelectrolyte]] | noun | **1.** A substance of high molecular weight (such as a protein) that is an electrolyte. | *"In academic literature, polyelectrolyte designates a substance of high molecular weight (such as a protein) that is an electrolyte."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyergus]] | noun | **1.** Amazon ants. | *"In academic literature, polyergus designates amazon ants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyester]] | noun | **1.** Any of numerous synthetic resins; they are light and strong and weather resistant.<br>**2.** A complex ester used for making fibers or resins or plastics or as a plasticizer. | *"In academic literature, polyester designates any of numerous synthetic resins; they are light and strong and weather resistant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyestrous]] | adjective | **1.** Having more than one period of estrus per year. | *"In academic literature, polyestrous designates having more than one period of estrus per year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyethylene]] | noun | **1.** A lightweight thermoplastic; used especially in packaging and insulation. | *"In academic literature, polyethylene designates a lightweight thermoplastic; used especially in packaging and insulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polygamist]] | noun | **1.** Marriage in which a spouse of either sex may have more than one mate at the same time.<br>**2.** The state of being polygamous. | *"I shuddered at the gray polygamist, who had so utterly lost the holy sense of individuality in wedlock, that methought he was fain to reckon upon his fingers how many women, who had once slept by his side, were now sleeping in their graves."* — Nathaniel Hawthorne, *Chippings with a Chisel (From "Twice Told Tales")* |
| [[polygamous]] | adjective | **1.** Having more than one mate at a time; used of relationships and individuals.<br>**2.** Having several forms of gametoecia on the same plant. | *"In academic literature, polygamous designates having more than one mate at a time; used of relationships and individuals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polygamy]] | noun | **1.** Marriage in which a spouse of either sex may have more than one mate at the same time.<br>**2.** The state of being polygamous. | *"A regular system of polygamy exists among the islanders; but of a most extraordinary nature,--a plurality of husbands, instead of wives! and this solitary fact speaks volumes for the gentle disposition of the male population."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[polygon]] | noun | **1.** A closed plane figure bounded by straight lines.<br>**2.** A closed figure on a sphere bounded by arcs of great circles. | *"He lived in a place called the Polygon, in Somers Town, where there were at that time a number of poor Spanish refugees walking about in cloaks, smoking little paper cigars."* — Charles Dickens, *Bleak House* |
| [[polygonal]] | adjective | **1.** Having many sides or relating to a surface marked by polygons. | *"Four polygonal fragments of two lacerated scarlet betting tickets, numbered 8 87, 88 6."* — James Joyce, *Ulysses* |
| [[polygonally]] | adverb | **1.** In a polygonal manner. | *"In academic literature, polygonally designates in a polygonal manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymastigina]] | noun | **1.** Small usually parasitic flagellates. | *"In academic literature, polymastigina designates small usually parasitic flagellates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymastigote]] | noun | **1.** Flagellates with several flagella. | *"In academic literature, polymastigote designates flagellates with several flagella."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymath]] | noun | **1.** A person of encyclopedic learning. | *"In academic literature, polymath designates a person of encyclopedic learning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymer]] | noun | **1.** A chemical compound or mixture of compounds formed by polymerization and consisting essentially of repeating structural units.<br>**2.** A substance (such as polystyrene) consisting of molecules that are large multiples of units of low molecular weight. | *"In academic literature, polymer designates a chemical compound or mixture of compounds formed by polymerization and consisting essentially of repeating structural units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymerase]] | noun | **1.** An enzyme that catalyzes the formation of new dna and rna from an existing strand of dna or rna. | *"In academic literature, polymerase designates an enzyme that catalyzes the formation of new dna and rna from an existing strand of dna or rna."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymeric]] | adjective | **1.** Of or relating to or consisting of a polymer. | *"In academic literature, polymeric designates of or relating to or consisting of a polymer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymerisation]] | noun | **1.** A chemical process that combines several monomers to form a polymer or polymeric compound. | *"In academic literature, polymerisation designates a chemical process that combines several monomers to form a polymer or polymeric compound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymerise]] | verb | **1.** Cause (a compound) to polymerize.<br>**2.** Undergo polymerization. | *"In academic literature, polymerise designates cause (a compound) to polymerize."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymerization]] | noun | **1.** A chemical process that combines several monomers to form a polymer or polymeric compound. | *"In academic literature, polymerization designates a chemical process that combines several monomers to form a polymer or polymeric compound."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymerize]] | verb | **1.** Cause (a compound) to polymerize.<br>**2.** Undergo polymerization. | *"In academic literature, polymerize designates cause (a compound) to polymerize."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymorph]] | noun | **1.** A polymorphic organism; also : one of the several forms of such an organism.<br>**2.** Any of the crystalline forms of a polymorphic substance. | *"In academic literature, polymorph designates a polymorphic organism; also : one of the several forms of such an organism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymorphemic]] | adjective | **1.** Consisting of two or more morphemes. | *"In academic literature, polymorphemic designates consisting of two or more morphemes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymorphic]] | noun | **1.** The quality or state of existing in or assuming different forms: such as.<br>**2.** Existence of a species in several forms independent of the variations of sex. | *"In academic literature, polymorphic designates the quality or state of existing in or assuming different forms: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymorphism]] | noun | **1.** The quality or state of existing in or assuming different forms: such as.<br>**2.** Existence of a species in several forms independent of the variations of sex. | *"In academic literature, polymorphism designates the quality or state of existing in or assuming different forms: such as."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymorphous]] | adjective | **1.** Relating to the crystallization of a compound in two or more different forms.<br>**2.** Relating to the occurrence of more than one kind of individual (independent of sexual differences) in an interbreeding population. | *"In academic literature, polymorphous designates relating to the crystallization of a compound in two or more different forms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymox]] | noun | **1.** An antibiotic; a semisynthetic oral penicillin (trade names amoxil and larotid and polymox and trimox and augmentin) used to treat bacterial infections. | *"In academic literature, polymox designates an antibiotic; a semisynthetic oral penicillin (trade names amoxil and larotid and polymox and trimox and augmentin) used to treat bacterial infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymyositis]] | noun | **1.** Myositis characterized by weakness of limb and neck muscles and much muscle pain and swelling; progression and severity vary among individuals. | *"In academic literature, polymyositis designates myositis characterized by weakness of limb and neck muscles and much muscle pain and swelling; progression and severity vary among individuals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polymyxin]] | noun | **1.** Any of several toxic antibiotics obtained from a particular soil bacterium. | *"In academic literature, polymyxin designates any of several toxic antibiotics obtained from a particular soil bacterium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polynemidae]] | noun | **1.** Threadfins. | *"In academic literature, polynemidae designates threadfins."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polynesia]] | noun | **1.** The islands in the eastern part of oceania. | *"On this board thirsty strangers deposited their cups as they stood in the road and drank, and threw the dregs on the dusty ground to the pattern of Polynesia, and wished they could have a restful seat inside."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[polynesian]] | noun | **1.** A native or inhabitant of polynesia.<br>**2.** The branch of the austronesian languages spoken from madagascar to the central pacific. | *"These natives with whom I live are Polynesian, I know, because their hair is straight and black."* — Jack London, *The Jacket (The Star-Rover)* |
| [[polyneuritis]] | noun | **1.** Inflammation of many or all of the peripheral nerves (as in leprosy). | *"In academic literature, polyneuritis designates inflammation of many or all of the peripheral nerves (as in leprosy)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polynomial]] | noun | **1.** A mathematical expression of one or more algebraic terms each of which consists of a constant multiplied by one or more variables raised to a nonnegative integral power (such as a + bx + cx2).<br>**2.** Relating to, composed of, or expressed as one or more polynomials. | *"In academic literature, polynomial designates a mathematical expression of one or more algebraic terms each of which consists of a constant multiplied by one or more variables raised to a nonnegative integral power (such as a + bx + cx2)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polynya]] | noun | **1.** A stretch of open water surrounded by ice (especially in arctic seas). | *"In academic literature, polynya designates a stretch of open water surrounded by ice (especially in arctic seas)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyodon]] | noun | **1.** Type genus of the polyodontidae. | *"In academic literature, polyodon designates type genus of the polyodontidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyodontidae]] | noun | **1.** Paddlefishes. | *"In academic literature, polyodontidae designates paddlefishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyoestrous]] | adjective | **1.** Having more than one period of estrus per year. | *"In academic literature, polyoestrous designates having more than one period of estrus per year."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyoicous]] | adjective | **1.** Having several forms of gametoecia on the same plant. | *"In academic literature, polyoicous designates having several forms of gametoecia on the same plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyoma]] | noun | **1.** A virus the can initiate various kinds of tumors in mice. | *"In academic literature, polyoma designates a virus the can initiate various kinds of tumors in mice."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyose]] | noun | **1.** Any of a class of carbohydrates whose molecules contain chains of monosaccharide molecules. | *"In academic literature, polyose designates any of a class of carbohydrates whose molecules contain chains of monosaccharide molecules."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyphase]] | noun | **1.** Having or producing two or more phases. | *"In academic literature, polyphase designates having or producing two or more phases."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polys]] | noun | **1.** A polymerized plastic or something made of this; especially : a polyester fiber, fabric, or garment.<br>**2.** A roly-poly person or thing. | *"In academic literature, polys designates a polymerized plastic or something made of this; especially : a polyester fiber, fabric, or garment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysaccharide]] | noun | **1.** A carbohydrate that can be decomposed by hydrolysis into two or more molecules of monosaccharides; especially : one (such as cellulose, starch, or glycogen) containing many monosaccharide units and marked by complexity. | *"In academic literature, polysaccharide designates a carbohydrate that can be decomposed by hydrolysis into two or more molecules of monosaccharides; especially : one (such as cellulose, starch, or glycogen) containing many monosaccharide units and marked by complexity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysemant]] | noun | **1.** A word having more than one meaning. | *"In academic literature, polysemant designates a word having more than one meaning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysemantic]] | adjective | **1.** Of words; having many meanings. | *"In academic literature, polysemantic designates of words; having many meanings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysemous]] | noun | **1.** Having multiple meanings. | *"In academic literature, polysemous designates having multiple meanings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysemy]] | noun | **1.** Having multiple meanings. | *"In academic literature, polysemy designates having multiple meanings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysomy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soma.<br>**2.** Specialized application within the domain of Body & Physiology. | *"In academic literature, polysomy designates a term designating an entity, condition, or phenomenon derived from greek soma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polystichum]] | noun | **1.** Small to medium-sized terrestrial ferns especially holly ferns; in some classification systems placed in polypodiaceae. | *"In academic literature, polystichum designates small to medium-sized terrestrial ferns especially holly ferns; in some classification systems placed in polypodiaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polystyrene]] | noun | **1.** A polymer of styrene; a rigid transparent thermoplastic. | *"In academic literature, polystyrene designates a polymer of styrene; a rigid transparent thermoplastic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysyllabic]] | adjective | **1.** Having or characterized by words of more than three syllables.<br>**2.** (of words) long and ponderous; having many syllables. | *"To what inconsequent polysyllabic question of his host did the guest return a monosyllabic negative answer?"* — James Joyce, *Ulysses* |
| [[polysyllabically]] | adverb | **1.** In a polysyllabic manner. | *"In academic literature, polysyllabically designates in a polysyllabic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysyllable]] | noun | **1.** A word of more than three syllables. | *"In the readers’ book Cashel Boyle O’Connor Fitzmaurice Tisdall Farrell parafes his polysyllables."* — James Joyce, *Ulysses* |
| [[polysyndeton]] | noun | **1.** Repetition of conjunctions in close succession (as in we have ships and men and money). | *"In academic literature, polysyndeton designates repetition of conjunctions in close succession (as in we have ships and men and money)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polysynthetic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of the. | *"In academic literature, polysynthetic designates adjective*) pertaining to, derived from, or characteristic of the."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytechnic]] | noun | **1.** Relating to or devoted to instruction in many technical arts or applied sciences.<br>**2.** A polytechnic school. | *"On September 13, 1839, Spencer read a paper before the Polytechnic Institution of Liverpool, which he accompanied with specimens of both electrotypes made by this process and of printing from these electrotypes."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[polytetrafluoroethylene]] | noun | **1.** A material used to coat cooking utensils and in industrial applications where sticking is to be avoided. | *"In academic literature, polytetrafluoroethylene designates a material used to coat cooking utensils and in industrial applications where sticking is to be avoided."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytheism]] | noun | **1.** Belief in or worship of more than one god. | *"As a French scholar has said, where there is polytheism there are no false gods."* — T. R. Glover, *The Jesus of History* |
| [[polytheist]] | noun | **1.** One who believes in a plurality of gods. | *"In academic literature, polytheist designates one who believes in a plurality of gods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytheistic]] | noun | **1.** Of, relating to, or characterized by polytheism : believing in or worshiping multiple gods. | *"No polytheistic religion can exclude gods from its pantheon; all divinities that man can devise have a right there."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[polythene]] | noun | **1.** A lightweight thermoplastic; used especially in packaging and insulation. | *"In academic literature, polythene designates a lightweight thermoplastic; used especially in packaging and insulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytonal]] | adjective | **1.** Using more than one key or tonality simultaneously. | *"In academic literature, polytonal designates using more than one key or tonality simultaneously."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytonalism]] | noun | **1.** Music that uses two or more different keys at the same time. | *"In academic literature, polytonalism designates music that uses two or more different keys at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polytonality]] | noun | **1.** Music that uses two or more different keys at the same time. | *"In academic literature, polytonality designates music that uses two or more different keys at the same time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyunsaturated]] | adjective | **1.** (of long-chain carbon compounds especially fats) having many unsaturated bonds. | *"In academic literature, polyunsaturated designates (of long-chain carbon compounds especially fats) having many unsaturated bonds."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyurethan]] | noun | **1.** Any of various polymers containing the urethane radical; a wide variety of synthetic forms are made and used as adhesives or plastics or paints or rubber. | *"In academic literature, polyurethan designates any of various polymers containing the urethane radical; a wide variety of synthetic forms are made and used as adhesives or plastics or paints or rubber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyurethane]] | noun | **1.** Any of various polymers containing the urethane radical; a wide variety of synthetic forms are made and used as adhesives or plastics or paints or rubber. | *"In academic literature, polyurethane designates any of various polymers containing the urethane radical; a wide variety of synthetic forms are made and used as adhesives or plastics or paints or rubber."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyuria]] | noun | **1.** Excessive secretion of urine. | *"In academic literature, polyuria designates excessive secretion of urine."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · POLY
  </div>
</div>
