---
status: unread
type: root_dashboard
---
# Dashboard — oec
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ϝοῖκος οἶκος (woîkos)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“house”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'house'.</span>
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

The Greek root **oec** (ϝοῖκος οἶκος (woîkos)) signifies house. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *andromonecy*, *archdiocese*, *autoecious*, *autoecism*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: house
> The Greek root **oec** fundamentally denotes **house**. The physical sensory observation and cognitive anchor underlying 'house'. In classical Greek antiquity, the root denoted 'house', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">house</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'house'.</mark>
> - **Everyday Connection**: Think of familiar words like *andromonecy*, *archdiocese*, *autoecious*, *autoecism*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **oec** derives from Ancient Greek <mark class="hl-stem">ϝοῖκος οἶκος (woîkos)</mark>, meaning "house".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with oec**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'house'.
  - Whenever you see **oec** in an English word, think immediately of **house**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">oec</mark>, think of <mark class="hl-def">house</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `oec-` (from *ϝοῖκος οἶκος (woîkos)*).
> - **Combining Stem with -o- Connective:** `oeco-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Oec
> - **1. Direct & Concrete Anchor:** Literal instantiation of house in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on oec

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `oec-` | [[andromonecy]] | Primary root semantic foundation denoting house. |
| **Connecting -o-** | `oeco-` | [[archdiocese]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `oec` | [[autoecious]] | Relational or directional modification of the core root sense. |

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
| [[andromonecy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, andromonecy designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[archdiocesan]] | adjective | **1.** Of or relating to an archdiocese. | *"In academic literature, archdiocesan designates of or relating to an archdiocese."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[archdiocese]] | noun | **1.** The diocese of an archbishop. | *"We’re in the archdiocese here. —And settle down on their striped petticoats, peering up at the statue of the onehandled adulterer. —Onehandled adulterer! the professor cried."* — James Joyce, *Ulysses* |
| [[autoecious]] | noun | **1.** Passing through all life stages on the same host. | *"In academic literature, autoecious designates passing through all life stages on the same host."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[autoecism]] | noun | **1.** Passing through all life stages on the same host. | *"In academic literature, autoecism designates passing through all life stages on the same host."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dioecious]] | noun | **1.** Having male reproductive organs in one individual and female in another.<br>**2.** Having staminate and pistillate flowers borne on different individuals. | *"In academic literature, dioecious designates having male reproductive organs in one individual and female in another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[dioecy]] | noun | **1.** Having male reproductive organs in one individual and female in another.<br>**2.** Having staminate and pistillate flowers borne on different individuals. | *"In academic literature, dioecy designates having male reproductive organs in one individual and female in another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecesis]] | noun | **1.** The establishment of a plant or animal in a new habitat. | *"In academic literature, ecesis designates the establishment of a plant or animal in a new habitat."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecologic]] | adjective | **1.** Characterized by the interdependence of living organisms in an environment.<br>**2.** Of or relating to the science of ecology. | *"In academic literature, ecologic designates characterized by the interdependence of living organisms in an environment."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecological]] | adjective | **1.** Characterized by the interdependence of living organisms in an environment.<br>**2.** Of or relating to the science of ecology. | *"In support of the Charon agricultural mission, Planet Pluto, the Slingshot Logistics Depot, the Terminals' construction site, and ships moored or in transit within the Special Zone constitute an integrated ecological entity."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[ecologically]] | adverb | **1.** With respect to ecology. | *"In academic literature, ecologically designates with respect to ecology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecologist]] | noun | **1.** A branch of science concerned with the interrelationship of organisms and their environments.<br>**2.** The totality or pattern of relations between organisms and their environment. | *"In academic literature, ecologist designates a branch of science concerned with the interrelationship of organisms and their environments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecology]] | noun | **1.** A branch of science concerned with the interrelationship of organisms and their environments.<br>**2.** The totality or pattern of relations between organisms and their environment. | *"In academic literature, ecology designates a branch of science concerned with the interrelationship of organisms and their environments."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[economic]] | adjective | **1.** Of or relating to an economy, the system of production and management of material wealth.<br>**2.** Of or relating to the science of economics. | *"Economics--Volume II MODERN ECONOMIC PROBLEMS BY FRANK A."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[economical]] | adjective | **1.** Using the minimum of time or resources necessary for effectiveness.<br>**2.** Of or relating to an economy, the system of production and management of material wealth. | *"For four years, the clergyman says, 'My expenses were small, my habits economical, and the only _luxury_ in which I indulged was the luxury of giving."* — Classic Author, *The wonders of prayer* |
| [[economically]] | adverb | **1.** With respect to economic science.<br>**2.** In an economical manner. | *"A few years ago it was generally believed that the organization of the old German tribes was politically an almost perfect democracy, and economically a communism in which all had equal claims upon the land."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[economics]] | noun | **1.** A social science concerned chiefly with description and analysis of the production, distribution, and consumption of goods and services.<br>**2.** Economic theory, principles, or practices. | *"In the latter aspect her d’Urberville descent was a fact of great dimensions; worthless to economics, it was a most useful ingredient to the dreamer, to the moralizer on declines and falls."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[economise]] | verb | **1.** Spend sparingly, avoid the waste of.<br>**2.** Use cautiously and frugally. | *"It had never occurred to me until that moment that there was any need to economise them, and I had wasted almost half the box in astonishing the Overworlders, to whom fire was a novelty."* — H. G. Wells, *The Time Machine* |
| [[economist]] | noun | **1.** One who practices economy.<br>**2.** A specialist in economics. | *"The task of the economist "as such" is the analysis of the economic valuation-aspects of these problems."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[economize]] | noun | **1.** To practice economy : be frugal.<br>**2.** To use frugally : save. | *"He could not bring himself to consider, calculate, or economize."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[economizer]] | noun | **1.** A frugal person who limits spending and avoids waste. | *"In academic literature, economizer designates a frugal person who limits spending and avoids waste."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[economy]] | noun | **1.** The structure or conditions of economic life in a country, area, or period; also : an economic system.<br>**2.** Thrifty and efficient use of material resources : frugality in expenditures; also : an instance or a means of economizing : saving. | *"In like manner she gets together, in the iron bread-basket, as many outside fragments and worn-down heels of loaves as the rigid economy of the house has left in existence."* — Charles Dickens, *Bleak House* |
| [[ecoregion]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, ecoregion designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecosystem]] | noun | **1.** The complex of a community of organisms and its environment functioning as an ecological unit.<br>**2.** Something (such as a network of businesses) considered to resemble an ecological ecosystem especially because of its complex interdependent parts. | *"In academic literature, ecosystem designates the complex of a community of organisms and its environment functioning as an ecological unit."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecumenic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of house. | *"In academic literature, ecumenic designates adjective*) pertaining to, derived from, or characteristic of house."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecumenical]] | adjective | **1.** Concerned with promoting unity among churches or religions.<br>**2.** Of worldwide scope or applicability; ; - christopher morley. | *"In academic literature, ecumenical designates concerned with promoting unity among churches or religions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecumenicism]] | noun | **1.** (christianity) the doctrine of the ecumenical movement that promotes cooperation and better understanding among different religious denominations: aimed at universal christian unity. | *"In academic literature, ecumenicism designates (christianity) the doctrine of the ecumenical movement that promotes cooperation and better understanding among different religious denominations: aimed at universal christian unity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[ecumenism]] | noun | **1.** Ecumenical principles and practices especially as shown among religious groups (such as Christian denominations). | *"In academic literature, ecumenism designates ecumenical principles and practices especially as shown among religious groups (such as christian denominations)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gynomonoecy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, gynomonoecy designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heteroecious]] | noun | **1.** Passing through the different stages in the life cycle on alternate and often unrelated hosts. | *"In academic literature, heteroecious designates passing through the different stages in the life cycle on alternate and often unrelated hosts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heteroecism]] | noun | **1.** Passing through the different stages in the life cycle on alternate and often unrelated hosts. | *"In academic literature, heteroecism designates passing through the different stages in the life cycle on alternate and often unrelated hosts."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heteroecy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, heteroecy designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[homoecious]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of house. | *"In academic literature, homoecious designates adjective*) pertaining to, derived from, or characteristic of house."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroeconomic]] | adjective | **1.** Of or relating to macroeconomics. | *"In academic literature, macroeconomic designates of or relating to macroeconomics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroeconomics]] | noun | **1.** The branch of economics that studies the overall working of a national economy. | *"In academic literature, macroeconomics designates the branch of economics that studies the overall working of a national economy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[macroeconomist]] | noun | **1.** An economist who specializes in macroeconomics. | *"In academic literature, macroeconomist designates an economist who specializes in macroeconomics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microeconomic]] | adjective | **1.** Of or relating to microeconomics. | *"In academic literature, microeconomic designates of or relating to microeconomics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microeconomics]] | noun | **1.** A study of economics in terms of individual areas of activity (such as a firm, household, prices, etc.). | *"In academic literature, microeconomics designates a study of economics in terms of individual areas of activity (such as a firm, household, prices, etc.)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[microeconomist]] | noun | **1.** An economist who specializes in microeconomics. | *"In academic literature, microeconomist designates an economist who specializes in microeconomics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoecious]] | noun | **1.** Having pistillate and staminate flowers on the same plant.<br>**2.** Having male and female sex organs in the same individual : hermaphroditic. | *"In academic literature, monoecious designates having pistillate and staminate flowers on the same plant."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[monoecy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, monoecy designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oec]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, oec designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oecology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, oecology designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oeconomus]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, oeconomus designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oecumenic]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of house. | *"In academic literature, oecumenic designates adjective*) pertaining to, derived from, or characteristic of house."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oecumenical]] | adjective | **1.** Concerned with promoting unity among churches or religions.<br>**2.** Of worldwide scope or applicability; ; - christopher morley. | *"In academic literature, oecumenical designates concerned with promoting unity among churches or religions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oecumenism]] | noun | **1.** A movement promoting union between religions (especially between christian churches). | *"In academic literature, oecumenism designates a movement promoting union between religions (especially between christian churches)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oikology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, oikology designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[oikophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, oikophobia designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[palaeoecology]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, palaeoecology designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paleoecology]] | noun | **1.** A branch of ecology that is concerned with the characteristics of ancient environments and with their relationships to ancient plants and animals. | *"In academic literature, paleoecology designates a branch of ecology that is concerned with the characteristics of ancient environments and with their relationships to ancient plants and animals."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parish]] | noun | **1.** The ecclesiastical unit of area committed to one pastor.<br>**2.** The residents of such an area. | *"The “why” is plain as way to parish church."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[parochial]] | adjective | **1.** Relating to or supported by or located in a parish.<br>**2.** Narrowly restricted in outlook or scope. | *"Formerly Caroline Jellyby, spinster, then of Thavies Inn, within the city of London, but extra-parochial; now of Newman Street, Oxford Street."* — Charles Dickens, *Bleak House* |
| [[parochially]] | adverb | **1.** In a parochial manner. | *"In academic literature, parochially designates in a parochial manner."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[paroecious]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of house. | *"In academic literature, paroecious designates adjective*) pertaining to, derived from, or characteristic of house."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perioeci]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek oec.<br>**2.** Specialized application within the domain of Form & Space. | *"In academic literature, perioeci designates a term designating an entity, condition, or phenomenon derived from greek oec."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[trioecious]] | noun | **1.** Adjective*) Pertaining to, derived from, or characteristic of house. | *"In academic literature, trioecious designates adjective*) pertaining to, derived from, or characteristic of house."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uneconomic]] | adjective | **1.** Wasteful of resources. | *"Uneconomic character of gambling. § 3."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[uneconomical]] | adjective | **1.** Inefficient in use of time and effort and materials.<br>**2.** Wasteful of resources. | *"In academic literature, uneconomical designates inefficient in use of time and effort and materials."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · OEC
  </div>
</div>
