---
status: unread
type: root_dashboard
---
# Dashboard — soph
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">σοφός</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“wise”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'wise'.</span>
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

The Greek root **soph** (σοφός, σοφία, σόφισμα, σοφισμός (sophós, sophía, sóphisma, sophismós)) signifies wise. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Sophocles*, *antisophism*, *pansophism*, *pansophist*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: wise
> The Greek root **soph** fundamentally denotes **wise**. The physical sensory observation and cognitive anchor underlying 'wise'. In classical Greek antiquity, the root denoted 'wise', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">wise</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'wise'.</mark>
> - **Everyday Connection**: Think of familiar words like *Sophocles*, *antisophism*, *pansophism*, *pansophist*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **soph** derives from Ancient Greek <mark class="hl-stem">σοφός, σοφία, σόφισμα, σοφισμός (sophós, sophía, sóphisma, sophismós)</mark>, meaning "wise".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with soph**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'wise'.
  - Whenever you see **soph** in an English word, think immediately of **wise**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">soph</mark>, think of <mark class="hl-def">wise</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `soph-` (from *σοφός, σοφία, σόφισμα, σοφισμός (sophós, sophía, sóphisma, sophismós)*).
> - **Combining Stem with -o- Connective:** `sopho-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Soph
> - **1. Direct & Concrete Anchor:** Literal instantiation of wise in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on soph

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `soph-` | [[Sophocles]] | Primary root semantic foundation denoting wise. |
| **Connecting -o-** | `sopho-` | [[antisophism]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `soph` | [[pansophism]] | Relational or directional modification of the core root sense. |

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
| [[antisophism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soph.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, antisophism designates a term designating an entity, condition, or phenomenon derived from greek soph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pansophism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soph.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, pansophism designates a term designating an entity, condition, or phenomenon derived from greek soph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pansophist]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soph.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, pansophist designates a term designating an entity, condition, or phenomenon derived from greek soph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pansophy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soph.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, pansophy designates a term designating an entity, condition, or phenomenon derived from greek soph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philosopher]] | noun | **1.** A specialist in philosophy.<br>**2.** A wise person who is calm and rational; someone who lives a life of reason with equanimity. | *"Such a one is a natural philosopher."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[philosophic]] | adjective | **1.** Of or relating to philosophy or philosophers.<br>**2.** Characterized by the attitude of a philosopher; meeting trouble with level-headed detachment. | *"A _snell_ remark of his brother William suggesting some new and comic association with a philosophic term dropped in the course of the discussion, would bring him back with a roar of laughter to the actual world and to more sublunary themes."* — John Cairns, *Principal Cairns* |
| [[philosophical]] | adjective | **1.** Of or relating to philosophy or philosophers.<br>**2.** Characterized by the attitude of a philosopher; meeting trouble with level-headed detachment. | *"They say miracles are past; and we have our philosophical persons to make modern and familiar things supernatural and causeless."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[philosophically]] | adverb | **1.** In a philosophic manner.<br>**2.** With respect to philosophy. | *"He hurt her, but she had been bred to accept pain philosophically."* — Anthony Pryde, *Nightfall* |
| [[philosophise]] | verb | **1.** Reason philosophically. | *"For he began to philosophise in order to judge his impressions (_phantasias_) and to discover which of them are true and which false, so as to be free from perturbation."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[philosophiser]] | noun | **1.** Someone who considers situations from a philosophical point of view. | *"In academic literature, philosophiser designates someone who considers situations from a philosophical point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philosophize]] | noun | **1.** To reason in the manner of a philosopher.<br>**2.** To expound a moralizing and often superficial philosophy. | *"If we are to use abstract terms and philosophize his thought a little, we may agree that the four facts Jesus notes in Nature are its mystery, its regularity, its impartiality, and its peacefulness[11]."* — T. R. Glover, *The Jesus of History* |
| [[philosophizer]] | noun | **1.** Someone who considers situations from a philosophical point of view. | *"In academic literature, philosophizer designates someone who considers situations from a philosophical point of view."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[philosophizing]] | noun | **1.** The exposition (often superficially) of a particular philosophy.<br>**2.** Reason philosophically. | *"Why,” thought Prince Andrew, “that’s the captain who stood up in the sutler’s hut without his boots.” He recognized the agreeable, philosophizing voice with pleasure."* — graf Leo Tolstoy, *War and Peace* |
| [[philosophy]] | noun | **1.** A discipline comprising primarily logic, aesthetics, ethics, metaphysics, and epistemology.<br>**2.** The sciences and liberal arts exclusive of medicine, law, and theology. | *"Hast any philosophy in thee, shepherd?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[soph]] | abbreviation | **1.** sophomore. | *"Poor Miss _Molly_! _Wrote on Cor---- Cr----d's (a Printer and Bookseller in Cambridge) Window in the Shop._ Ye longing Sophs, say it who can, That _Corny_'s not a learned Man."* — Hurlothrumbo, *The Merry-Thought: or the Glass-Window and Bog-House Miscellany. Parts 2, 3 and 4* |
| [[sophism]] | noun | **1.** An argument apparently correct in form but actually invalid; especially : such an argument used to deceive. | *"There is a well-known, so-called sophism of the ancients consisting in this, that Achilles could never catch up with a tortoise he was following, in spite of the fact that he traveled ten times as fast as the tortoise."* — graf Leo Tolstoy, *War and Peace* |
| [[sophist]] | noun | **1.** Philosopher.<br>**2.** Any of a class of ancient Greek teachers of rhetoric, philosophy, and the art of successful living. | *"CASSIUS, ” ” ” CASCA, ” ” ” TREBONIUS, ” ” ” LIGARIUS,” ” ” DECIUS BRUTUS, ” ” ” METELLUS CIMBER, ” ” ” CINNA, ” ” ” FLAVIUS, tribune MARULLUS, tribune ARTEMIDORUS, a Sophist of Cnidos."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sophistic]] | adjective | **1.** Of or pertaining to sophists.<br>**2.** Plausible but misleading. | *"Since I myself have been an inmate of a lunatic asylum, I cannot but notice that the sophistic tendencies of some of its inmates lean towards the errors of _non causa_ and _ignoratio elenchi_.” I positively opened my eyes at this new development."* — Bram Stoker, *Dracula* |
| [[sophistical]] | adjective | **1.** Plausible but misleading. | *"He out-sophisticates the most sophistical of them."* — Jack London, *The Jacket (The Star-Rover)* |
| [[sophisticate]] | noun | **1.** To alter deceptively; especially : adulterate.<br>**2.** To deprive of genuineness, naturalness, or simplicity; especially : to deprive of naïveté and make worldly-wise : disillusion. | *"He out-sophisticates the most sophistical of them."* — Jack London, *The Jacket (The Star-Rover)* |
| [[sophisticated]] | noun | **1.** Deprived of native or original simplicity: such as.<br>**2.** Highly complicated or developed : complex. | *"Ha! here’s three on’s are sophisticated!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[sophistication]] | noun | **1.** Uplifting enlightenment.<br>**2.** A deliberately invalid argument displaying ingenuity in reasoning in the hope of deceiving someone. | *"Although modern sophistication easily points out flaws in Charles Brockden Brown’s story-structure, and reproves him for improbability, morbidness, and a style often too elevated, yet his work lives."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[sophistry]] | noun | **1.** Subtly deceptive reasoning or argumentation. | *"No, it is not true!” “It is true.” “Every word?” “Every word.” He looked at her imploringly, as if he would willingly have taken a lie from her lips, knowing it to be one, and have made of it, by some sort of sophistry, a valid denial."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[Sophocles]] | noun | **1.** Circa 496—406 b.c. Greek dramatist. | *"Shelley's was identified by a copy of Sophocles in one coat-pocket and the Keats in another."* — Sydney Waterlow, *Shelley* |
| [[sophocles]] | noun | **1.** One of the great tragedians of ancient greece (496-406 bc). | *"In academic literature, sophocles designates **1.** one of the great tragedians of ancient greece (496-406 bc)."* — Academic Lexicon |
| [[sophomania]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soph.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, sophomania designates a term designating an entity, condition, or phenomenon derived from greek soph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sophomaniac]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek soph.<br>**2.** Specialized application within the domain of Cognition & Mind. | *"In academic literature, sophomaniac designates a term designating an entity, condition, or phenomenon derived from greek soph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sophomore]] | noun | **1.** A student in the second year at college or a 4-year secondary school.<br>**2.** Being or associated with the second in a series. | *"SOPHOMORE PLUMPS FOR OLD MAN MOSES. —Call it, wait, the professor said, opening his long lips wide to reflect."* — James Joyce, *Ulysses* |
| [[sophomoric]] | noun | **1.** Conceited and overconfident of knowledge but poorly informed and immature.<br>**2.** Lacking in maturity, taste, or judgment. | *"In academic literature, sophomoric designates conceited and overconfident of knowledge but poorly informed and immature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sophonias]] | noun | **1.** A hebrew minor prophet of the late 7th century bc.<br>**2.** An old testament book telling the prophecies of zephaniah which are concerned mainly with the approaching judgment by god upon the sinners of judah. | *"In academic literature, sophonias designates a hebrew minor prophet of the late 7th century bc."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[sophora]] | noun | **1.** Cosmopolitan genus of trees and shrubs having odd-pinnate leaves and showy flowers; some species placed in genus podalyria. | *"In academic literature, sophora designates cosmopolitan genus of trees and shrubs having odd-pinnate leaves and showy flowers; some species placed in genus podalyria."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theosophical]] | adjective | **1.** Of or relating to theosophy. | *"In academic literature, theosophical designates of or relating to theosophy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theosophist]] | noun | **1.** A believer in theosophy. | *"German Boehme: Jacob Boehme (or Behmen), a shoemaker and a famous theosophist, b. 1575, at Old Seidenberg, a village near Goerlitz; d. 1624."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[theosophy]] | noun | **1.** Teaching about God and the world based on mystical insight.<br>**2.** The teachings of a modern movement originating in the U.S. in 1875 and following chiefly Buddhist and Brahmanic theories especially of pantheistic evolution and reincarnation. | *"Groups of people endeavoured to combine Christianity with the old thought, with philosophy, theosophy, theurgy, and magic."* — T. R. Glover, *The Jesus of History* |
| [[unsophisticated]] | adjective | **1.** Not wise in the ways of the world; ; - kate o'brien.<br>**2.** Lacking complexity. | *"Her unsophisticated open-air existence required no varnish of conventionality to make it palatable to him."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Cognition & Mind]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · SOPH
  </div>
</div>
