---
status: unread
type: root_dashboard
---
# Dashboard — anth
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἀνθεῖν ἄνθος ἄνθησις ἄνθημα ἀνθηρός (antheîn)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“flower”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'flower'.</span>
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

The Greek root **anth** (ἀνθεῖν ἄνθος ἄνθησις ἄνθημα ἀνθηρός (antheîn)) signifies flower. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Anthocoridae*, *Anthozoa*, *anth*, *anther*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: flower
> The Greek root **anth** fundamentally denotes **flower**. The physical sensory observation and cognitive anchor underlying 'flower'. In classical Greek antiquity, the root denoted 'flower', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">flower</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'flower'.</mark>
> - **Everyday Connection**: Think of familiar words like *Anthocoridae*, *Anthozoa*, *anth*, *anther*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **anth** derives from Ancient Greek <mark class="hl-stem">ἀνθεῖν ἄνθος ἄνθησις ἄνθημα ἀνθηρός (antheîn)</mark>, meaning "flower".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with anth**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'flower'.
  - Whenever you see **anth** in an English word, think immediately of **flower**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">anth</mark>, think of <mark class="hl-def">flower</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `anth-` (from *ἀνθεῖν ἄνθος ἄνθησις ἄνθημα ἀνθηρός (antheîn)*).
> - **Combining Stem with -o- Connective:** `antho-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Anth
> - **1. Direct & Concrete Anchor:** Literal instantiation of flower in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on anth

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `anth-` | [[Anthocoridae]] | Primary root semantic foundation denoting flower. |
| **Connecting -o-** | `antho-` | [[Anthozoa]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `anth` | [[anth]] | Relational or directional modification of the core root sense. |

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
| [[anth]] | noun | **1.** Of the same kind but situated opposite, exerting energy in the opposite direction, or pursuing an opposite policy.<br>**2.** One that is opposite in kind to. | *"In academic literature, anth designates of the same kind but situated opposite, exerting energy in the opposite direction, or pursuing an opposite policy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthelminthic]] | noun | **1.** A medication capable of causing the evacuation of parasitic intestinal worms.<br>**2.** Capable of expelling or destroying parasitic worms. | *"In academic literature, anthelminthic designates a medication capable of causing the evacuation of parasitic intestinal worms."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthelmintic]] | noun | **1.** Expelling or destroying parasitic worms especially of the intestine. | *"In academic literature, anthelmintic designates expelling or destroying parasitic worms especially of the intestine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthem]] | noun | **1.** A song of devotion or loyalty (as to a nation or school).<br>**2.** A song of praise (to god or to a saint or to a nation). | *"If so, I pray thee breathe it in mine ear, As ending anthem of my endless dolour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[anthemis]] | noun | **1.** Dog fennel. | *"In academic literature, anthemis designates dog fennel."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anther]] | noun | **1.** The part of a stamen that produces and contains pollen and is usually borne on a stalk. | *"Flowers of Bladder-campion with anther smut (_Ustilago antherarum_). 〃 103."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[antheraea]] | noun | **1.** Large moths whose larvae produce silk of high quality. | *"In academic literature, antheraea designates large moths whose larvae produce silk of high quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antheral]] | adjective | **1.** Capable of fertilizing female organs. | *"In academic literature, antheral designates capable of fertilizing female organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthericum]] | noun | **1.** Genus of old world (mainly african) perennial herbs; sometimes placed in family asphodelaceae. | *"In academic literature, anthericum designates genus of old world (mainly african) perennial herbs; sometimes placed in family asphodelaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antheridial]] | adjective | **1.** Relating to or characterized by an antheridium. | *"In academic literature, antheridial designates relating to or characterized by an antheridium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antheridiophore]] | noun | **1.** Gametophore bearing antheridia as in certain mosses and liverworts. | *"In academic literature, antheridiophore designates gametophore bearing antheridia as in certain mosses and liverworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antheridium]] | noun | **1.** The male sex organ of spore-producing plants; produces antherozoids; equivalent to the anther in flowers. | *"This gonosphere having been formed, a straight tube shoots out from the antheridium which perforates the wall of the oogonium, passes through the fluid which surrounds the gonosphere, elongating itself until it touches that body."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[antheropeas]] | noun | **1.** Small genus of north american herbs often included in genus eriophyllum. | *"In academic literature, antheropeas designates small genus of north american herbs often included in genus eriophyllum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antherozoid]] | noun | **1.** A motile male gamete of a plant such as an alga or fern or gymnosperm. | *"In academic literature, antherozoid designates a motile male gamete of a plant such as an alga or fern or gymnosperm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthesis]] | noun | **1.** The action or period of opening of a flower. | *"In academic literature, anthesis designates the action or period of opening of a flower."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthidium]] | noun | **1.** Potter bees. | *"In academic literature, anthidium designates potter bees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthill]] | noun | **1.** A mound of earth made by ants as they dig their nest. | *"In academic literature, anthill designates a mound of earth made by ants as they dig their nest."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthoceropsida]] | noun | **1.** Hornworts: in some classification systems included in the class hepaticopsida. | *"In academic literature, anthoceropsida designates hornworts: in some classification systems included in the class hepaticopsida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthoceros]] | noun | **1.** Hornworts. | *"In academic literature, anthoceros designates hornworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthocerotaceae]] | noun | **1.** Hornworts. | *"In academic literature, anthocerotaceae designates hornworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthocerotales]] | noun | **1.** Hornworts; liverworts having a thalloid gametophyte; in some classification systems included in the class hepaticopsida. | *"In academic literature, anthocerotales designates hornworts; liverworts having a thalloid gametophyte; in some classification systems included in the class hepaticopsida."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Anthocoridae]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek anth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, Anthocoridae designates a term designating an entity, condition, or phenomenon derived from greek anth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthodite]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek anth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, anthodite designates a term designating an entity, condition, or phenomenon derived from greek anth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthologise]] | verb | **1.** Compile an anthology. | *"In academic literature, anthologise designates compile an anthology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthologist]] | noun | **1.** An editor who makes selections for an anthology. | *"In academic literature, anthologist designates an editor who makes selections for an anthology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthologize]] | verb | **1.** Compile an anthology. | *"In academic literature, anthologize designates compile an anthology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthology]] | noun | **1.** A collection of selected literary pieces or passages or works of art or music.<br>**2.** Assortment. | *"The present writer lived for some time within a short distance of his house, but found no opportunity to meet him until it became necessary to obtain his portrait for an anthology in course of publication."* — Herman Melville, *Typee: A Romance of the South Seas* |
| [[anthonomus]] | noun | **1.** Weevils destructive of cultivated plants. | *"In academic literature, anthonomus designates weevils destructive of cultivated plants."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthony]] | noun | **1.** Roman general under julius caesar in the gallic wars; repudiated his wife for the egyptian queen cleopatra; they were defeated by octavian at actium (83-30 bc).<br>**2.** United states suffragist (1820-1906). | *"Enter Ambassador from Anthony."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[anthophagous]] | adjective | **1.** Feeding on flowers. | *"In academic literature, anthophagous designates feeding on flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthophilous]] | adjective | **1.** Feeding on flowers. | *"In academic literature, anthophilous designates feeding on flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek anth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, anthophobia designates a term designating an entity, condition, or phenomenon derived from greek anth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthophore]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek anth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, anthophore designates a term designating an entity, condition, or phenomenon derived from greek anth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthophyllite]] | noun | **1.** A dark brown mineral of the amphibole group; magnesium iron silicate. | *"In academic literature, anthophyllite designates a dark brown mineral of the amphibole group; magnesium iron silicate."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthophyta]] | noun | **1.** Comprising flowering plants that produce seeds enclosed in an ovary; in some systems considered a class (angiospermae) and in others a division (magnoliophyta or anthophyta). | *"In academic literature, anthophyta designates comprising flowering plants that produce seeds enclosed in an ovary; in some systems considered a class (angiospermae) and in others a division (magnoliophyta or anthophyta)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthos]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek anth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, anthos designates a term designating an entity, condition, or phenomenon derived from greek anth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Anthozoa]] | noun | **1.** Any of a class (Anthozoa) of marine cnidarians (such as the corals and sea anemones) having polyps with internal radial partitions and lacking a medusa stage. | *"In academic literature, Anthozoa designates a large class of sedentary marine coelenterates that includes sea anemones and corals; the medusoid phase is entirely suppressed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthozoa]] | noun | **1.** A large class of sedentary marine coelenterates that includes sea anemones and corals; the medusoid phase is entirely suppressed.<br>**2.** Sessile marine coelenterates including solitary and colonial polyps; the medusoid phase is entirely suppressed. | *"In academic literature, anthozoa designates **1.** a large class of sedentary marine coelenterates that includes sea anemones and corals; the medusoid phase is entirely suppressed.<br>**2.** sessile marine coelenterates including solitary and colonial polyps; the medusoid phase is entirely suppressed."* — Academic Lexicon |
| [[anthozoan]] | noun | **1.** Sessile marine coelenterates including solitary and colonial polyps; the medusoid phase is entirely suppressed. | *"In academic literature, anthozoan designates sessile marine coelenterates including solitary and colonial polyps; the medusoid phase is entirely suppressed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthracite]] | noun | **1.** A hard natural coal of high luster differing from bituminous coal in containing little volatile matter and in burning very cleanly —called also hard coal. | *"Nowhere in the United States has the principle of compulsory arbitration been adopted, but at the time of the great anthracite strike, in 1902, public sentiment grew strong in favor of it."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[anthracitic]] | adjective | **1.** Relating to or resembling anthracite coal. | *"In academic literature, anthracitic designates relating to or resembling anthracite coal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthracosis]] | noun | **1.** Lung disease caused by inhaling coal dust. | *"In academic literature, anthracosis designates lung disease caused by inhaling coal dust."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthrax]] | noun | **1.** An infectious disease of warm-blooded animals (such as cattle and sheep) caused by a spore-forming bacterium (Bacillus anthracis), transmissible to humans especially by the handling of infected products (such as wool), and characterized by cutaneous ulcerating nodules or by often fatal lesions in the lungs; also : the bacterium causing anthrax. | *"In academic literature, anthrax designates an infectious disease of warm-blooded animals (such as cattle and sheep) caused by a spore-forming bacterium (bacillus anthracis), transmissible to humans especially by the handling of infected products (such as wool), and characterized by cutaneous ulcerating nodules or by often fatal lesions in the lungs; also : the bacterium causing anthrax."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthriscus]] | noun | **1.** Chervil: of europe, north africa and asia. | *"In academic literature, anthriscus designates chervil: of europe, north africa and asia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropic]] | adjective | **1.** Relating to mankind or the period of mankind's existence. | *"In academic literature, anthropic designates relating to mankind or the period of mankind's existence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropical]] | adjective | **1.** Relating to mankind or the period of mankind's existence. | *"In academic literature, anthropical designates relating to mankind or the period of mankind's existence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropocentric]] | noun | **1.** Considering human beings as the most significant entity of the universe.<br>**2.** Interpreting or regarding the world in terms of human values and experiences. | *"In academic literature, anthropocentric designates considering human beings as the most significant entity of the universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropocentricity]] | noun | **1.** An inclination to evaluate reality exclusively in terms of human values. | *"In academic literature, anthropocentricity designates an inclination to evaluate reality exclusively in terms of human values."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropocentrism]] | noun | **1.** Considering human beings as the most significant entity of the universe.<br>**2.** Interpreting or regarding the world in terms of human values and experiences. | *"In academic literature, anthropocentrism designates considering human beings as the most significant entity of the universe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropogenesis]] | noun | **1.** The evolution or genesis of the human race. | *"In academic literature, anthropogenesis designates the evolution or genesis of the human race."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropogenetic]] | adjective | **1.** Of or relating to the study of the origins and development of human beings. | *"In academic literature, anthropogenetic designates of or relating to the study of the origins and development of human beings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropogenic]] | adjective | **1.** Of or relating to the study of the origins and development of human beings. | *"In academic literature, anthropogenic designates of or relating to the study of the origins and development of human beings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropogeny]] | noun | **1.** The evolution or genesis of the human race. | *"In academic literature, anthropogeny designates the evolution or genesis of the human race."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropoid]] | noun | **1.** Person who resembles a nonhuman primate.<br>**2.** Any member of the suborder anthropoidea including monkeys and apes and hominids. | *"She whips it off.)_ LYNCH: _(Laughs.)_ And to such delights has Metchnikoff inoculated anthropoid apes."* — James Joyce, *Ulysses* |
| [[anthropoidal]] | adjective | **1.** Resembling apes. | *"In academic literature, anthropoidal designates resembling apes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropoidea]] | noun | **1.** Monkeys; apes; hominids. | *"In academic literature, anthropoidea designates monkeys; apes; hominids."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropolatry]] | noun | **1.** The worship of human beings. | *"In academic literature, anthropolatry designates the worship of human beings."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropological]] | adjective | **1.** Of or concerned with the science of anthropology. | *"Roscoe, "Further Notes on the Manners and Customs of the Baganda," _Journal of the Anthropological Institute_, xxxii. (1902) pp. 62, 67; _id., The Baganda_ (London, 1911), pp. 154 _sq._ Compare L."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[anthropologist]] | noun | **1.** A social scientist who specializes in anthropology. | *"Grinnell, "Cheyenne Woman Customs," _American Anthropologist_, New Series, iv. (New York, 1902) pp. 13 _sq_."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[anthropology]] | noun | **1.** The science of human beings; especially : the study of human beings and their ancestors through time and space and in relation to physical character, environmental and social relations, and culture.<br>**2.** Theology dealing with the origin, nature, and destiny of human beings. | *"FELLOW OF TRINITY COLLEGE, CAMBRIDGE PROFESSOR OF SOCIAL ANTHROPOLOGY IN THE UNIVERSITY OF LIVERPOOL."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[anthropometric]] | adjective | **1.** Of or relating to anthropometry. | *"In academic literature, anthropometric designates of or relating to anthropometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropometrical]] | adjective | **1.** Of or relating to anthropometry. | *"In academic literature, anthropometrical designates of or relating to anthropometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropometry]] | noun | **1.** Measurement and study of the human body and its parts and capacities. | *"In academic literature, anthropometry designates measurement and study of the human body and its parts and capacities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropomorphic]] | noun | **1.** Described or thought of as having a human form or human attributes.<br>**2.** Ascribing human characteristics to nonhuman things. | *"God is individual and personal in a scientific 337:1 sense, but not in any anthropomorphic sense."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[anthropomorphise]] | verb | **1.** Ascribe human features to something. | *"In academic literature, anthropomorphise designates ascribe human features to something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropomorphism]] | noun | **1.** An interpretation of what is not human or personal in terms of human or personal characteristics : humanization. | *"The true 140:21 worshippers shall worship the Father in spirit and in truth." Anthropomorphism The Jewish tribal Jehovah was a man-projected God, 140:24 liable to wrath, repentance, and human changeableness."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[anthropomorphize]] | verb | **1.** Ascribe human features to something. | *"In academic literature, anthropomorphize designates ascribe human features to something."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropomorphous]] | adjective | **1.** Suggesting human characteristics for animals or inanimate things. | *"In academic literature, anthropomorphous designates suggesting human characteristics for animals or inanimate things."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropophagite]] | noun | **1.** A person who eats human flesh. | *"In academic literature, anthropophagite designates a person who eats human flesh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropophagous]] | adjective | **1.** Of or relating to eaters of human flesh. | *"Speculators do not dine entirely on "lambs"; they are anthropophagous."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[anthropophagus]] | noun | **1.** A person who eats human flesh. | *"In academic literature, anthropophagus designates a person who eats human flesh."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthropophagy]] | noun | **1.** Human cannibalism; the eating of human flesh. | *"My word!” returned the Canadian, “I begin to understand the charms of anthropophagy.” “Ned!"* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[anthroposophy]] | noun | **1.** A 20th century religious system growing out of theosophy and centering on human development. | *"In academic literature, anthroposophy designates a 20th century religious system growing out of theosophy and centering on human development."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthurium]] | noun | **1.** Any of a genus (Anthurium) of tropical American plants of the arum family with large often brightly colored leaves, a cylindrical spadix, and a colored spathe. | *"In academic literature, anthurium designates any of a genus (anthurium) of tropical american plants of the arum family with large often brightly colored leaves, a cylindrical spadix, and a colored spathe."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthus]] | noun | **1.** Pipits. | *"Classical and authoritative lexicons catalog anthus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthyllis]] | noun | **1.** Genus of mediterranean herbs and shrubs. | *"In academic literature, anthyllis designates genus of mediterranean herbs and shrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[chrysanthemum]] | noun | **1.** Any of various composite plants (genus Chrysanthemum) including weeds, ornamentals grown for their brightly colored often double flower heads, and others important as sources of medicinals and insecticides.<br>**2.** A flower head of an ornamental chrysanthemum. | *"Get some boughs of laurustinus, and variegated box, and yew, and boy’s-love; ay, and some bunches of chrysanthemum."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[dianthus]] | noun | **1.** pink. | *"Classical and authoritative lexicons catalog dianthus as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enanthem]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek anth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, enanthem designates a term designating an entity, condition, or phenomenon derived from greek anth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[enanthema]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek anth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, enanthema designates a term designating an entity, condition, or phenomenon derived from greek anth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exanthem]] | noun | **1.** An eruptive disease (such as measles) or its symptomatic eruption. | *"In academic literature, exanthem designates an eruptive disease (such as measles) or its symptomatic eruption."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exanthema]] | noun | **1.** Eruption on the skin occurring as a symptom of a disease. | *"In academic literature, exanthema designates eruption on the skin occurring as a symptom of a disease."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exanthematic]] | noun | **1.** An eruptive disease (such as measles) or its symptomatic eruption. | *"In academic literature, exanthematic designates an eruptive disease (such as measles) or its symptomatic eruption."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hydranth]] | noun | **1.** One of the feeding zooids of a hydroid colony. | *"In academic literature, hydranth designates one of the feeding zooids of a hydroid colony."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypanthium]] | noun | **1.** An enlargement of the floral receptacle bearing on its rim the stamens, petals, and sepals and often enlarging and surrounding the fruits (as in the rose hip). | *"In academic literature, hypanthium designates an enlargement of the floral receptacle bearing on its rim the stamens, petals, and sepals and often enlarging and surrounding the fruits (as in the rose hip)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleoanthropological]] | adjective | **1.** Of or concerned with the scientific study of human fossils. | *"In academic literature, paleoanthropological designates of or concerned with the scientific study of human fossils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleoanthropology]] | noun | **1.** The scientific study of human fossils. | *"In academic literature, paleoanthropology designates the scientific study of human fossils."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paranthias]] | noun | **1.** A genus of serranidae. | *"In academic literature, paranthias designates a genus of serranidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paranthropus]] | noun | **1.** Former classification for australopithecus robustus. | *"In academic literature, paranthropus designates former classification for australopithecus robustus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perianth]] | noun | **1.** The floral structure comprised of the calyx and corolla especially when the two whorls are fused. | *"In academic literature, perianth designates the floral structure comprised of the calyx and corolla especially when the two whorls are fused."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[polyanthus]] | noun | **1.** Any of various hybrid primroses.<br>**2.** A narcissus (Narcissus tazetta) having small white or yellow flowers arranged in umbels and having a spreading perianth. | *"In academic literature, polyanthus designates any of various hybrid primroses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[protoanthropology]] | noun | **1.** The study humans prior to the invention of writing. | *"In academic literature, protoanthropology designates the study humans prior to the invention of writing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[zoanthid]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek anth.<br>**2.** Specialized application within the domain of Plants & Botany. | *"In academic literature, zoanthid designates a term designating an entity, condition, or phenomenon derived from greek anth."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Plants & Botany]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · ANTH
  </div>
</div>
