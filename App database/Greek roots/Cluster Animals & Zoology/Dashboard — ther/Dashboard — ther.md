---
status: unread
type: root_dashboard
---
# Dashboard — ther
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">θήρ</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“beast, animal”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'beast, animal'.</span>
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

The Greek root **ther** (θήρ, θηρός (thḗr, thērós)) signifies beast, animal. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *therapsid*, *therianthropy*, *theroid*, *theropod*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: beast, animal
> The Greek root **ther** fundamentally denotes **beast, animal**. The physical sensory observation and cognitive anchor underlying 'beast, animal'. In classical Greek antiquity, the root denoted 'beast, animal', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">beast, animal</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'beast, animal'.</mark>
> - **Everyday Connection**: Think of familiar words like *therapsid*, *therianthropy*, *theroid*, *theropod*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **ther** derives from Ancient Greek <mark class="hl-stem">θήρ, θηρός (thḗr, thērós)</mark>, meaning "beast, animal".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with ther**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'beast, animal'.
  - Whenever you see **ther** in an English word, think immediately of **beast, animal**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">ther</mark>, think of <mark class="hl-def">beast, animal</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `ther-` (from *θήρ, θηρός (thḗr, thērós)*).
> - **Combining Stem with -o- Connective:** `thero-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Ther
> - **1. Direct & Concrete Anchor:** Literal instantiation of beast, animal in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on ther

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `ther-` | [[therapsid]] | Primary root semantic foundation denoting beast, animal. |
| **Connecting -o-** | `thero-` | [[therianthropy]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `ther` | [[theroid]] | Relational or directional modification of the core root sense. |

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
| [[anther]] | noun | **1.** The part of a stamen that produces and contains pollen and is usually borne on a stalk. | *"Flowers of Bladder-campion with anther smut (_Ustilago antherarum_). 〃 103."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[antheraea]] | noun | **1.** Large moths whose larvae produce silk of high quality. | *"In academic literature, antheraea designates large moths whose larvae produce silk of high quality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antheral]] | adjective | **1.** Capable of fertilizing female organs. | *"In academic literature, antheral designates capable of fertilizing female organs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[anthericum]] | noun | **1.** Genus of old world (mainly african) perennial herbs; sometimes placed in family asphodelaceae. | *"In academic literature, anthericum designates genus of old world (mainly african) perennial herbs; sometimes placed in family asphodelaceae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antheridial]] | adjective | **1.** Relating to or characterized by an antheridium. | *"In academic literature, antheridial designates relating to or characterized by an antheridium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antheridiophore]] | noun | **1.** Gametophore bearing antheridia as in certain mosses and liverworts. | *"In academic literature, antheridiophore designates gametophore bearing antheridia as in certain mosses and liverworts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antheridium]] | noun | **1.** The male sex organ of spore-producing plants; produces antherozoids; equivalent to the anther in flowers. | *"This gonosphere having been formed, a straight tube shoots out from the antheridium which perforates the wall of the oogonium, passes through the fluid which surrounds the gonosphere, elongating itself until it touches that body."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[antheropeas]] | noun | **1.** Small genus of north american herbs often included in genus eriophyllum. | *"In academic literature, antheropeas designates small genus of north american herbs often included in genus eriophyllum."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[antherozoid]] | noun | **1.** A motile male gamete of a plant such as an alga or fern or gymnosperm. | *"In academic literature, antherozoid designates a motile male gamete of a plant such as an alga or fern or gymnosperm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherinidae]] | noun | **1.** Small spiny-finned fishes of both salt and fresh water. | *"In academic literature, atherinidae designates small spiny-finned fishes of both salt and fresh water."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherinopsis]] | noun | **1.** A genus of atherinidae. | *"In academic literature, atherinopsis designates a genus of atherinidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherodyde]] | noun | **1.** A simple type of jet engine; must be launched at high speed. | *"In academic literature, atherodyde designates a simple type of jet engine; must be launched at high speed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherogenesis]] | noun | **1.** The formation of atheromas on the walls of the arteries as in atherosclerosis. | *"In academic literature, atherogenesis designates the formation of atheromas on the walls of the arteries as in atherosclerosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atheroma]] | noun | **1.** An abnormal fatty deposit in an artery.<br>**2.** Fatty degeneration of the inner coat of the arteries. | *"In academic literature, atheroma designates an abnormal fatty deposit in an artery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atheromatic]] | adjective | **1.** Of or relating to or resembling atheroma. | *"In academic literature, atheromatic designates of or relating to or resembling atheroma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atheromatous]] | adjective | **1.** Of or relating to or resembling atheroma. | *"In academic literature, atheromatous designates of or relating to or resembling atheroma."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherosclerosis]] | noun | **1.** An arteriosclerosis characterized by atheromatous deposits in and fibrosis of the inner layer of the arteries. | *"In academic literature, atherosclerosis designates an arteriosclerosis characterized by atheromatous deposits in and fibrosis of the inner layer of the arteries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherosclerotic]] | adjective | **1.** Of or relating to atherosclerosis. | *"In academic literature, atherosclerotic designates of or relating to atherosclerosis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[atherurus]] | noun | **1.** A genus of hystricidae. | *"In academic literature, atherurus designates a genus of hystricidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[diathermy]] | noun | **1.** The generation of heat in tissue by electric currents for medical or surgical purposes. | *"In academic literature, diathermy designates the generation of heat in tissue by electric currents for medical or surgical purposes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectotherm]] | noun | **1.** A cold-blooded animal : poikilotherm. | *"In academic literature, ectotherm designates a cold-blooded animal : poikilotherm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ectothermic]] | adjective | **1.** Of animals except birds and mammals; having body temperature that varies with the environment. | *"In academic literature, ectothermic designates of animals except birds and mammals; having body temperature that varies with the environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endothermal]] | adjective | **1.** (of a chemical reaction or compound) occurring or formed with absorption of heat. | *"In academic literature, endothermal designates (of a chemical reaction or compound) occurring or formed with absorption of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[endothermic]] | noun | **1.** Characterized by or formed with absorption of heat.<br>**2.** Warm-blooded. | *"In academic literature, endothermic designates characterized by or formed with absorption of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eutheria]] | noun | **1.** All mammals except monotremes and marsupials. | *"In academic literature, eutheria designates all mammals except monotremes and marsupials."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[eutherian]] | noun | **1.** Mammals having a placenta; all mammals except monotremes and marsupials.<br>**2.** Of or relating to or belonging to the subclass eutheria. | *"In academic literature, eutherian designates mammals having a placenta; all mammals except monotremes and marsupials."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exotherm]] | noun | **1.** A compound that gives off heat during its formation and absorbs heat during its decomposition. | *"In academic literature, exotherm designates a compound that gives off heat during its formation and absorbs heat during its decomposition."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exothermal]] | adjective | **1.** (of a chemical reaction or compound) occurring or formed with the liberation of heat. | *"In academic literature, exothermal designates (of a chemical reaction or compound) occurring or formed with the liberation of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[exothermic]] | noun | **1.** Characterized by or formed with evolution of heat. | *"In academic literature, exothermic designates characterized by or formed with evolution of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heterothermic]] | adjective | **1.** Of animals except birds and mammals; having body temperature that varies with the environment. | *"In academic literature, heterothermic designates of animals except birds and mammals; having body temperature that varies with the environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homotherm]] | noun | **1.** An animal that has a body temperature that is relatively constant and independent of the environmental temperature. | *"In academic literature, homotherm designates an animal that has a body temperature that is relatively constant and independent of the environmental temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homothermic]] | adjective | **1.** Of birds and mammals; having constant and relatively high body temperature. | *"In academic literature, homothermic designates of birds and mammals; having constant and relatively high body temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperthermal]] | adjective | **1.** Of or relating to or affected by hyperthermia. | *"In academic literature, hyperthermal designates of or relating to or affected by hyperthermia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperthermia]] | noun | **1.** Exceptionally high fever especially when induced artificially for therapeutic purposes. | *"In academic literature, hyperthermia designates exceptionally high fever especially when induced artificially for therapeutic purposes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hyperthermy]] | noun | **1.** Abnormally high body temperature; sometimes induced (as in treating some forms of cancer). | *"In academic literature, hyperthermy designates abnormally high body temperature; sometimes induced (as in treating some forms of cancer)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypothermia]] | noun | **1.** Subnormal temperature of the body. | *"In academic literature, hypothermia designates subnormal temperature of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[hypothermic]] | adjective | **1.** Of or relating to or affected by hypothermia. | *"In academic literature, hypothermic designates of or relating to or affected by hypothermia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isotherm]] | noun | **1.** A line on a map or chart of the earth's surface connecting points having the same temperature at a given time or the same mean temperature for a given period.<br>**2.** A line on a chart representing changes of volume or pressure under conditions of constant temperature. | *"In academic literature, isotherm designates a line on a map or chart of the earth's surface connecting points having the same temperature at a given time or the same mean temperature for a given period."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[isothermal]] | adjective | **1.** Of a process or change taking place at constant temperature. | *"This rate applied to utilities traces through each good a line analagous to the isothermal line on the map, marking off a zone of utilities for the present and other zones for each period of the future."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[isothermic]] | adjective | **1.** Of or relating to an isotherm. | *"In academic literature, isothermic designates of or relating to an isotherm."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megathere]] | noun | **1.** Gigantic extinct terrestrial sloth-like mammal of the pliocene and pleistocene in america. | *"In academic literature, megathere designates gigantic extinct terrestrial sloth-like mammal of the pliocene and pleistocene in america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megatherian]] | noun | **1.** A large extinct ground sloth. | *"In academic literature, megatherian designates a large extinct ground sloth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megatheriid]] | noun | **1.** A large extinct ground sloth. | *"In academic literature, megatheriid designates a large extinct ground sloth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megatheriidae]] | noun | **1.** Extinct ground sloths. | *"In academic literature, megatheriidae designates extinct ground sloths."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[megatherium]] | noun | **1.** Type genus of the megatheriidae. | *"I recognised by the oblique feet that it was some extinct creature after the fashion of the Megatherium."* — H. G. Wells, *The Time Machine* |
| [[metatheria]] | noun | **1.** Pouched animals. | *"In academic literature, metatheria designates pouched animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metatherian]] | noun | **1.** Primitive pouched mammals found mainly in australia and the americas. | *"In academic literature, metatherian designates primitive pouched mammals found mainly in australia and the americas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pantheism]] | noun | **1.** (rare) worship that admits or tolerates all gods.<br>**2.** The doctrine or belief that god is the universe and its phenomena (taken or conceived of as a whole) or the doctrine that regards the universe as a manifestation of god. | *"Why, through the thin partition of this consolation Pantheism can hear the groans of its neighbour, Pessimism."* — Francis Thompson, *Shelley: An Essay* |
| [[pantheist]] | noun | **1.** Someone who believes that god and the universe are the same.<br>**2.** Of or relating to pantheism. | *"In academic literature, pantheist designates someone who believes that god and the universe are the same."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[panther]] | noun | **1.** A large spotted feline of tropical america similar to the leopard; in some classifications considered a member of the genus felis.<br>**2.** A leopard in the black color phase. | *"Tomorrow, an it please your majesty To hunt the panther and the hart with me, With horn and hound we’ll give your grace _bonjour_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[panthera]] | noun | **1.** Lions; leopards; snow leopards; jaguars; tigers; cheetahs; saber-toothed tigers. | *"Jesus was born, they said, in a village, the bastard child of a peasant woman, a poor person who worked with her hands, divorced by her husband (who was a carpenter) for adultery.[10] The father was a soldier called Panthera."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[prototheria]] | noun | **1.** Echidnas; platypus. | *"In academic literature, prototheria designates echidnas; platypus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[prototherian]] | noun | **1.** Primitive oviparous mammals found only in australia and tasmania and new guinea. | *"In academic literature, prototherian designates primitive oviparous mammals found only in australia and tasmania and new guinea."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[telethermometer]] | noun | **1.** A thermometer that registers the temperature at some distant point. | *"In academic literature, telethermometer designates a thermometer that registers the temperature at some distant point."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[therapeutic]] | noun | **1.** Of or relating to the treatment of disease or disorders by remedial agents or methods : curative, medicinal.<br>**2.** Having a beneficial effect on the body or mind. | *"A model clergyman, like a model doctor, ought to think his own profession the finest in the world, and take all knowledge as mere nourishment to his moral pathology and therapeutics."* — George Eliot, *Middlemarch* |
| [[therapeutical]] | adjective | **1.** Relating to or involved in therapy. | *"In academic literature, therapeutical designates relating to or involved in therapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[therapeutically]] | adverb | **1.** For therapeutic purposes. | *"In academic literature, therapeutically designates for therapeutic purposes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[therapeutics]] | noun | **1.** Branch of medicine concerned with the treatment of disease.<br>**2.** A medicine or therapy that cures disease or relieve pain. | *"A model clergyman, like a model doctor, ought to think his own profession the finest in the world, and take all knowledge as mere nourishment to his moral pathology and therapeutics."* — George Eliot, *Middlemarch* |
| [[theraphosidae]] | noun | **1.** Large tropical spiders; tarantulas. | *"In academic literature, theraphosidae designates large tropical spiders; tarantulas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[therapist]] | noun | **1.** An individual specializing in the therapeutic medical treatment of impairment, injury, disease, or disorder; especially : a health care professional trained in methods of treatment and rehabilitation other than the use of drugs or surgery.<br>**2.** A practitioner of psychotherapy : a psychotherapist. | *"In academic literature, therapist designates an individual specializing in the therapeutic medical treatment of impairment, injury, disease, or disorder; especially : a health care professional trained in methods of treatment and rehabilitation other than the use of drugs or surgery."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[therapsid]] | noun | **1.** Any of an order (Therapsida) of advanced synapsid vertebrates that flourished during the Permian and Triassic periods with the last forms becoming extinct during the Cretaceous period and that are considered ancestors of the mammals. | *"In academic literature, therapsid designates any of an order (therapsida) of advanced synapsid vertebrates that flourished during the permian and triassic periods with the last forms becoming extinct during the cretaceous period and that are considered ancestors of the mammals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[therapsida]] | noun | **1.** Extinct mammal-like reptiles found inhabiting all continents from the mid permian to late triassic. | *"In academic literature, therapsida designates extinct mammal-like reptiles found inhabiting all continents from the mid permian to late triassic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[therapy]] | noun | **1.** Therapeutic medical treatment of impairment, injury, disease, or disorder.<br>**2.** Psychotherapy. | *"In academic literature, therapy designates therapeutic medical treatment of impairment, injury, disease, or disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theravada]] | noun | **1.** One of two great schools of buddhist doctrine emphasizing personal salvation through your own efforts; a conservative form of buddhism that adheres to pali scriptures and the non-theistic ideal of self purification to nirvana; the dominant religion of sri lanka (ceylon) and myanmar (burma) and thailand and laos and cambodia. | *"In academic literature, theravada designates one of two great schools of buddhist doctrine emphasizing personal salvation through your own efforts; a conservative form of buddhism that adheres to pali scriptures and the non-theistic ideal of self purification to nirvana; the dominant religion of sri lanka (ceylon) and myanmar (burma) and thailand and laos and cambodia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[there]] | noun | **1.** A location other than here; that place.<br>**2.** In or at that place. | *"In our two loves there is but one respect, Though in our lives a separable spite, Which though it alter not love’s sole effect, Yet doth it steal sweet hours from love’s delight."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[thereabout]] | adverb | **1.** Near that time or date.<br>**2.** Near that place. | *"One speech in it, I chiefly loved. ’Twas Aeneas’ tale to Dido, and thereabout of it especially where he speaks of Priam’s slaughter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[thereabouts]] | adverb | **1.** Near that time or date.<br>**2.** Near that place. | *"PAROLLES. ‘Five or six thousand horse’ I said—I will say true—or thereabouts, set down,—for I’ll speak truth."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[thereafter]] | adverb | **1.** From that time on. | *"Thereafter as they be; a score of good ewes may be worth ten pounds."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[thereby]] | adverb | **1.** By that means or because of that. | *"If it were so, that our request did tend To save the Romans, thereby to destroy The Volsces whom you serve, you might condemn us As poisonous of your honour."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[therefor]] | adverb | **1.** (in formal usage, especially legal usage) for that or for it. | *"An’ when we chasten’d him therefor, Thou kens how he bred sic a splore, An’ set the warld in a roar O’ laughing at us;— Curse Thou his basket and his store, Kail an’ potatoes."* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[therefore]] | adverb | **1.** (used to introduce a logical conclusion) from that fact or reason or as a result.<br>**2.** As a consequence. | *"O therefore love be of thyself so wary, As I not for my self, but for thee will, Bearing thy heart which I will keep so chary As tender nurse her babe from faring ill."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[therefrom]] | adverb | **1.** From that circumstance or source; - w.v.quine.<br>**2.** From that place or from there. | *"I went therefrom to Norcombe, and malted there two-and-twenty years, and-two-and-twenty years I was there turnip-hoeing and harvesting."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[therein]] | adverb | **1.** (formal) in or into that thing or place. | *"I am a simple maid, and therein wealthiest That I protest I simply am a maid."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[thereinafter]] | adverb | **1.** In the following part of a given matter, as in a document or speech. | *"In academic literature, thereinafter designates in the following part of a given matter, as in a document or speech."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theremin]] | noun | **1.** An electronic musical instrument; melodies can be played by moving the right hand between two rods that serve as antennas to control pitch; the left hand controls phrasing. | *"In academic literature, theremin designates an electronic musical instrument; melodies can be played by moving the right hand between two rods that serve as antennas to control pitch; the left hand controls phrasing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thereness]] | noun | **1.** Real existence; --charles hopkinson.<br>**2.** The state of being there--not here--in position. | *"In academic literature, thereness designates real existence; --charles hopkinson."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thereof]] | adverb | **1.** Of or concerning this or that.<br>**2.** From that circumstance or source; - w.v.quine. | *"Good signior, take the stranger to my house, And with you take the chain, and bid my wife Disburse the sum on the receipt thereof; Perchance I will be there as soon as you."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[thereon]] | adverb | **1.** On that. | *"If he love her not, And be not from his reason fall’n thereon, Let me be no assistant for a state, But keep a farm and carters."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[theresa]] | noun | **1.** Indian nun and missionary in the roman catholic church (born of albanian parents in what is now macedonia); dedicated to helping the poor in india (1910-1997). | *"Theresa’s passionate, ideal nature demanded an epic life: what were many-volumed romances of chivalry and the social conquests of a brilliant girl to her?"* — George Eliot, *Middlemarch* |
| [[thereto]] | adverb | **1.** To that. | *"Madam, as thereto sworn by your command, Which my love makes religion to obey, I tell you this: Caesar through Syria Intends his journey, and within three days You with your children will he send before."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[theretofore]] | adverb | **1.** Up to that time. | *"The methods of extracting gold theretofore had still been in large part of a primitive sort."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[thereunder]] | adverb | **1.** Under that. | *"In academic literature, thereunder designates under that."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[therewith]] | adverb | **1.** With that or this or it; - phil.4:11. | *"He was perfumed like a milliner, And ’twixt his finger and his thumb he held A pouncet-box, which ever and anon He gave his nose, and took’t away again, Who therewith angry, when it next came there, Took it in snuff; and still he smiled and talk’d."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[therewithal]] | adverb | **1.** Together with all that; besides; - shakespeare. | *"Even now a tailor call’d me in his shop, And show’d me silks that he had bought for me, And therewithal took measure of my body."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[therianthropy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ther.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, therianthropy designates a term designating an entity, condition, or phenomenon derived from greek ther."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theridiid]] | noun | **1.** Spider having a comb-like row of bristles on each hind foot. | *"In academic literature, theridiid designates spider having a comb-like row of bristles on each hind foot."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theridiidae]] | noun | **1.** A family of comb-footed spiders. | *"In academic literature, theridiidae designates a family of comb-footed spiders."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[therm]] | noun | **1.** A unit of heat equal to 100,000 british thermal units. | *"In academic literature, therm designates a unit of heat equal to 100,000 british thermal units."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermal]] | noun | **1.** Of, relating to, or caused by heat.<br>**2.** Being or involving a state of matter dependent upon temperature. | *"The whole subject is thus of considerable complexity, and involves questions of thermal and chemical equilibrium."* — Donald M. Levy, *Modern Copper Smelting* |
| [[thermalgesia]] | noun | **1.** Pain caused by heat. | *"In academic literature, thermalgesia designates pain caused by heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermally]] | adverb | **1.** By means of heat or with respect to thermal properties. | *"In academic literature, thermally designates by means of heat or with respect to thermal properties."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermel]] | noun | **1.** A thermometer that uses thermoelectric current to measure temperature. | *"In academic literature, thermel designates a thermometer that uses thermoelectric current to measure temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermic]] | adjective | **1.** Relating to or associated with heat. | *"In academic literature, thermic designates relating to or associated with heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermidor]] | noun | **1.** Eleventh month of the revolutionary calendar (july and august); the month of heat. | *"In academic literature, thermidor designates eleventh month of the revolutionary calendar (july and august); the month of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermion]] | noun | **1.** An electrically charged particle (electron or ion) emitted by a substance at a high temperature. | *"In academic literature, thermion designates an electrically charged particle (electron or ion) emitted by a substance at a high temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermionic]] | adjective | **1.** Of or relating to or characteristic of thermions. | *"In academic literature, thermionic designates of or relating to or characteristic of thermions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermionics]] | noun | **1.** The branch of electronics dealing with thermionic phenomena (especially thermionic vacuum tubes). | *"In academic literature, thermionics designates the branch of electronics dealing with thermionic phenomena (especially thermionic vacuum tubes)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermistor]] | noun | **1.** A semiconductor device made of materials whose resistance varies as a function of temperature; can be used to compensate for temperature variation in other components of a circuit. | *"In academic literature, thermistor designates a semiconductor device made of materials whose resistance varies as a function of temperature; can be used to compensate for temperature variation in other components of a circuit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoacidophile]] | noun | **1.** Archaebacteria that thrive in strongly acidic environments at high temperatures. | *"In academic literature, thermoacidophile designates archaebacteria that thrive in strongly acidic environments at high temperatures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermobia]] | noun | **1.** A genus of lepismatidae. | *"In academic literature, thermobia designates a genus of lepismatidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermocautery]] | noun | **1.** Cautery (destruction of tissue) by heat. | *"In academic literature, thermocautery designates cautery (destruction of tissue) by heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermochemistry]] | noun | **1.** The branch of chemistry that studies the relation between chemical action and the amount of heat absorbed or generated. | *"In academic literature, thermochemistry designates the branch of chemistry that studies the relation between chemical action and the amount of heat absorbed or generated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermocoagulation]] | noun | **1.** Congealing tissue by heat (as by electric current). | *"In academic literature, thermocoagulation designates congealing tissue by heat (as by electric current)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermocouple]] | noun | **1.** A kind of thermometer consisting of two wires of different metals that are joined at both ends; one junction is at the temperature to be measured and the other is held at a fixed lower temperature; the current generated in the circuit is proportional to the temperature difference. | *"In academic literature, thermocouple designates a kind of thermometer consisting of two wires of different metals that are joined at both ends; one junction is at the temperature to be measured and the other is held at a fixed lower temperature; the current generated in the circuit is proportional to the temperature difference."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermodynamic]] | noun | **1.** Of or relating to thermodynamics.<br>**2.** Being or relating to a system of atoms, molecules, colloidal particles, or larger bodies considered as an isolated group in the study of thermodynamic processes. | *"In academic literature, thermodynamic designates of or relating to thermodynamics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermodynamical]] | adjective | **1.** Of or concerned with thermodynamics. | *"In academic literature, thermodynamical designates of or concerned with thermodynamics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermodynamically]] | adverb | **1.** With respect to thermodynamics. | *"In academic literature, thermodynamically designates with respect to thermodynamics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermodynamics]] | noun | **1.** Physics that deals with the mechanical action or relations of heat.<br>**2.** Thermodynamic processes and phenomena. | *"In academic literature, thermodynamics designates physics that deals with the mechanical action or relations of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoelectric]] | adjective | **1.** Involving or resulting from thermoelectricity. | *"In academic literature, thermoelectric designates involving or resulting from thermoelectricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoelectrical]] | adjective | **1.** Involving or resulting from thermoelectricity. | *"In academic literature, thermoelectrical designates involving or resulting from thermoelectricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoelectricity]] | noun | **1.** Electricity produced by heat (as in a thermocouple). | *"In academic literature, thermoelectricity designates electricity produced by heat (as in a thermocouple)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermogram]] | noun | **1.** A graphical record produced by a thermograph. | *"In academic literature, thermogram designates a graphical record produced by a thermograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermograph]] | noun | **1.** Medical instrument that uses an infrared camera to reveal temperature variations on the surface of the body.<br>**2.** A thermometer that records temperature variations on a graph as a function of time. | *"In academic literature, thermograph designates medical instrument that uses an infrared camera to reveal temperature variations on the surface of the body."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermography]] | noun | **1.** Diagnostic technique using a thermograph to record the heat produced by different parts of the body; used to study blood flow and to detect tumors. | *"In academic literature, thermography designates diagnostic technique using a thermograph to record the heat produced by different parts of the body; used to study blood flow and to detect tumors."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermogravimeter]] | noun | **1.** A hydrometer that includes a thermometer. | *"In academic literature, thermogravimeter designates a hydrometer that includes a thermometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermogravimetric]] | adjective | **1.** Of or relating to thermal hydrometry. | *"In academic literature, thermogravimetric designates of or relating to thermal hydrometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermogravimetry]] | noun | **1.** The measurement of changes in weight as a function of changes in temperature used as a technique of chemically analyzing substances. | *"In academic literature, thermogravimetry designates the measurement of changes in weight as a function of changes in temperature used as a technique of chemically analyzing substances."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermohydrometer]] | noun | **1.** A hydrometer that includes a thermometer. | *"In academic literature, thermohydrometer designates a hydrometer that includes a thermometer."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermohydrometric]] | adjective | **1.** Of or relating to thermal hydrometry. | *"In academic literature, thermohydrometric designates of or relating to thermal hydrometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermojunction]] | noun | **1.** A junction between two dissimilar metals across which a voltage appears. | *"In academic literature, thermojunction designates a junction between two dissimilar metals across which a voltage appears."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermolabile]] | adjective | **1.** (chemistry, physics, biology) readily changed or destroyed by heat. | *"In academic literature, thermolabile designates (chemistry, physics, biology) readily changed or destroyed by heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermometer]] | noun | **1.** An instrument for determining temperature; specifically : one consisting of a sensor housed in a metal probe that registers a change in electrical resistance as a change in temperature.<br>**2.** A thermometer for measuring body temperature that has a constriction in the tube above the bulb preventing movement of the column of liquid downward once it has reached its maximum temperature so that it continues to indicate the maximum temperature until the liquid is shaken back down into the bulb. | *"Poetry is a thermometer: by taking its average height you can estimate the normal temperature of its writer's mind."* — Francis Thompson, *Shelley: An Essay* |
| [[thermometric]] | adjective | **1.** Of or relating to thermometry. | *"In academic literature, thermometric designates of or relating to thermometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermometrograph]] | noun | **1.** A thermometer that records temperature variations on a graph as a function of time. | *"In academic literature, thermometrograph designates a thermometer that records temperature variations on a graph as a function of time."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermometry]] | noun | **1.** The measurement of temperature. | *"In academic literature, thermometry designates the measurement of temperature."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermonuclear]] | adjective | **1.** Using nuclear weapons based on fusion as distinguished from fission. | *"Neutronic penetray analysis shows that in addition to thermonuclear power plants the aggregate includes machined parts configured to Catalog 11 long range lasers, explosive decompressors, particle beamers and gun mounts."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[thermopile]] | noun | **1.** A kind of thermometer for measuring heat radiation; consists of several thermocouple junctions in series. | *"In academic literature, thermopile designates a kind of thermometer for measuring heat radiation; consists of several thermocouple junctions in series."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoplastic]] | noun | **1.** Capable of softening or fusing when heated and of hardening again when cooled. | *"In academic literature, thermoplastic designates capable of softening or fusing when heated and of hardening again when cooled."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermopsis]] | noun | **1.** Genus of american and asiatic showy rhizomatous herbs: bush peas. | *"In academic literature, thermopsis designates genus of american and asiatic showy rhizomatous herbs: bush peas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermopylae]] | noun | **1.** A famous battle in 480 bc; a greek army under leonidas was annihilated by the persians who were trying to conquer greece. | *"Zdrzhinski, the officer with the long mustache, spoke grandiloquently of the Saltánov dam being “a Russian Thermopylae,” and of how a deed worthy of antiquity had been performed by General Raévski."* — graf Leo Tolstoy, *War and Peace* |
| [[thermoreceptor]] | noun | **1.** A sensory receptor that responds to heat and cold. | *"In academic literature, thermoreceptor designates a sensory receptor that responds to heat and cold."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermoregulator]] | noun | **1.** A regulator for automatically regulating temperature by starting or stopping the supply of heat. | *"In academic literature, thermoregulator designates a regulator for automatically regulating temperature by starting or stopping the supply of heat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermos]] | noun | **1.** A container (such as a bottle or jar) with a vacuum between an inner and outer wall used to keep material and especially liquids either hot or cold for considerable periods. | *"They call it a thermos bottle."* — Annie Roe Carr, *Nan Sherwood at Pine Camp; Or, The Old Lumberman's Secret* |
| [[thermoset]] | adjective | **1.** Having the property of becoming permanently hard and rigid when heated or cured. | *"In academic literature, thermoset designates having the property of becoming permanently hard and rigid when heated or cured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermosetting]] | adjective | **1.** Having the property of becoming permanently hard and rigid when heated or cured. | *"In academic literature, thermosetting designates having the property of becoming permanently hard and rigid when heated or cured."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermosphere]] | noun | **1.** The part of the earth's atmosphere that begins at about 50 miles (80 kilometers) above the earth's surface, extends to outer space, and is characterized by steadily increasing temperature with height. | *"In academic literature, thermosphere designates the part of the earth's atmosphere that begins at about 50 miles (80 kilometers) above the earth's surface, extends to outer space, and is characterized by steadily increasing temperature with height."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermostat]] | noun | **1.** An automatic device for regulating temperature (as by controlling the supply of gas or electricity to a heating apparatus); also : a similar device for actuating fire alarms or for controlling automatic sprinklers.<br>**2.** To provide with or control the temperature of by a thermostat. | *"In academic literature, thermostat designates an automatic device for regulating temperature (as by controlling the supply of gas or electricity to a heating apparatus); also : a similar device for actuating fire alarms or for controlling automatic sprinklers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermostatic]] | noun | **1.** An automatic device for regulating temperature (as by controlling the supply of gas or electricity to a heating apparatus); also : a similar device for actuating fire alarms or for controlling automatic sprinklers. | *"In academic literature, thermostatic designates an automatic device for regulating temperature (as by controlling the supply of gas or electricity to a heating apparatus); also : a similar device for actuating fire alarms or for controlling automatic sprinklers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermostatically]] | adverb | **1.** By thermostat; in a thermostatic manner. | *"In academic literature, thermostatically designates by thermostat; in a thermostatic manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermostatics]] | noun | **1.** The aspect of thermodynamics concerned with thermal equilibrium. | *"In academic literature, thermostatics designates the aspect of thermodynamics concerned with thermal equilibrium."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermotherapy]] | noun | **1.** The use of heat to treat a disease or disorder; heating pads or hot compresses or hot-water bottles are used to promote circulation in peripheral vascular disease or to relax tense muscles. | *"In academic literature, thermotherapy designates the use of heat to treat a disease or disorder; heating pads or hot compresses or hot-water bottles are used to promote circulation in peripheral vascular disease or to relax tense muscles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[thermotropism]] | noun | **1.** An orienting response to warmth. | *"In academic literature, thermotropism designates an orienting response to warmth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theroid]] | noun | **1.** Adjective & Noun*) Resembling, having the physical form of, or akin to beast, animal. | *"In academic literature, theroid designates adjective & noun*) resembling, having the physical form of, or akin to beast, animal."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theropod]] | noun | **1.** Any of a suborder (Theropoda) of carnivorous, bipedal, saurischian dinosaurs (such as a tyrannosaur or velociraptor) having hollow, thin-walled bones and usually small forelimbs. | *"In academic literature, theropod designates any of a suborder (theropoda) of carnivorous, bipedal, saurischian dinosaurs (such as a tyrannosaur or velociraptor) having hollow, thin-walled bones and usually small forelimbs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theropoda]] | noun | **1.** Carnivorous saurischian dinosaurs with short forelimbs; jurassic and cretaceous. | *"In academic literature, theropoda designates carnivorous saurischian dinosaurs with short forelimbs; jurassic and cretaceous."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[theropsid]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek ther.<br>**2.** Specialized application within the domain of Animals & Zoology. | *"In academic literature, theropsid designates a term designating an entity, condition, or phenomenon derived from greek ther."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Animals & Zoology]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · THER
  </div>
</div>
