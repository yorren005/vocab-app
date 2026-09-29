---
status: unread
type: root_dashboard
---
# Dashboard — heli
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ GREEK ROOT</span>
    <span class="cm-script">ἥλιος (hḗlios)</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“sun”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> The physical sensory observation and cognitive anchor underlying 'sun'.</span>
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

The Greek root **heli** (ἥλιος (hḗlios)) signifies sun. In English, this root forms key scientific, philosophical, and high-register vocabulary such as *Heliophila*, *Helios*, *aphelion*, *heli*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: sun
> The Greek root **heli** fundamentally denotes **sun**. The physical sensory observation and cognitive anchor underlying 'sun'. In classical Greek antiquity, the root denoted 'sun', transmitting into Hellenistic science and modern intellectual vocabulary.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">sun</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">The physical sensory observation and cognitive anchor underlying 'sun'.</mark>
> - **Everyday Connection**: Think of familiar words like *Heliophila*, *Helios*, *aphelion*, *heli*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **heli** derives from Ancient Greek <mark class="hl-stem">ἥλιος (hḗlios)</mark>, meaning "sun".
  - Reconstructed Indo-European origin: **Proto-Indo-European root associated with heli**.

- **The Big Picture Idea**:
  - The physical sensory observation and cognitive anchor underlying 'sun'.
  - Whenever you see **heli** in an English word, think immediately of **sun**.

- **How the Meaning Grows**:
  - **Physical & Concrete**: The direct sensory application in ancient nature, anatomy, or daily craft.
  - **Abstract & Intellectual**: Extended into classical philosophy, rhetoric, and civic discourse.
  - **Technical & Systematic**: Modern scientific, mathematical, and medical terminology.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">heli</mark>, think of <mark class="hl-def">sun</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Pathways & Stem Variants
> The root manifests across English through regular Greek compounding and prefixation rules:
> - **Base Stem:** `heli-` (from *ἥλιος (hḗlios)*).
> - **Combining Stem with -o- Connective:** `helio-` (standard Greek combining vowel utilized before consonants).
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

> [!tip] 🌈 The Conceptual Facets of Heli
> - **1. Direct & Concrete Anchor:** Literal instantiation of sun in physical systems.
> - **2. Systematic Observation & Science:** Methodical categorization within natural history, anatomy, or physics.
> - **3. Abstract & Disciplinary Extension:** Formalization into academic terminology, philosophy, and analytical methodology.
> - **4. High-Register Figurative Usages:** Metaphorical transfer into humanistic, social, and literary discourse.

---

## 🔀 4. Prefix & Combining Dynamics on heli

| Compound / Element | Combining Form | Resulting Word | Semantic Transformation |
|---|---|---|---|
| **Base** | `heli-` | [[Heliophila]] | Primary root semantic foundation denoting sun. |
| **Connecting -o-** | `helio-` | [[Helios]] | Intervocalic *-o-* connective vowel joining following morphemes. |
| **Prefixed / Modified** | `syn-` / `peri-` + `heli` | [[aphelion]] | Relational or directional modification of the core root sense. |

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
| [[aphelion]] | noun | **1.** The point farthest from the sun in the path of an orbiting celestial body (such as a planet). | *"They ventured into the void beyond Pluto's aphelion for hundreds of millions of kilometers -- although not yet the stars."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[heli]] | combining form | **1.** sun.<br>**2.** helicopter. | *"Clement seemed to like this place of study and prayer; yet, after the example of Heli [Eli], the priest, as he neither reproved nor restrained his brethren from plunder, and other offences, he died by a paralytic stroke."* — William Beattie, *The castles and abbeys of England; Vol. 2 of 2* |
| [[heliac]] | adjective | **1.** Pertaining to or near the sun; especially the first rising of a star after and last setting before its invisibility owing to its conjunction with the sun. | *"In academic literature, heliac designates pertaining to or near the sun; especially the first rising of a star after and last setting before its invisibility owing to its conjunction with the sun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliacal]] | adjective | **1.** Pertaining to or near the sun; especially the first rising of a star after and last setting before its invisibility owing to its conjunction with the sun. | *"In academic literature, heliacal designates pertaining to or near the sun; especially the first rising of a star after and last setting before its invisibility owing to its conjunction with the sun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliamphora]] | noun | **1.** Genus of pitcher plants of the guiana highlands in south america. | *"In academic literature, heliamphora designates genus of pitcher plants of the guiana highlands in south america."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[helianthemum]] | noun | **1.** Any plant of the genus helianthemum; vigorous plants of stony alpine meadows and dry scrub regions. | *"In academic literature, helianthemum designates any plant of the genus helianthemum; vigorous plants of stony alpine meadows and dry scrub regions."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[helianthus]] | noun | **1.** Any plant of the genus helianthus having large flower heads with dark disk florets and showy yellow rays. | *"In academic literature, helianthus designates any plant of the genus helianthus having large flower heads with dark disk florets and showy yellow rays."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[helical]] | adjective | **1.** In the shape of a coil. | *"In academic literature, helical designates in the shape of a coil."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[helichrysum]] | noun | **1.** Large genus of mostly african and australian herbs and shrubs: everlasting flowers; in some classifications includes genus ozothamnus. | *"In academic literature, helichrysum designates large genus of mostly african and australian herbs and shrubs: everlasting flowers; in some classifications includes genus ozothamnus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[helicidae]] | noun | **1.** Land snails including the common edible snail and some pests. | *"In academic literature, helicidae designates land snails including the common edible snail and some pests."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[helicon]] | noun | **1.** A tuba that coils over the shoulder of the musician. | *"Song.—O, Were I On Parnassus Hill Tune—“My love is lost to me.” O, were I on Parnassus hill, Or had o’ Helicon my fill, That I might catch poetic skill, To sing how dear I love thee!"* — Robert Burns, *Poems and Songs of Robert Burns* |
| [[helicopter]] | noun | **1.** An aircraft whose lift is derived from the aerodynamic forces acting on one or more powered rotors turning about substantially vertical axes.<br>**2.** To travel by helicopter. | *"In academic literature, helicopter designates an aircraft whose lift is derived from the aerodynamic forces acting on one or more powered rotors turning about substantially vertical axes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[helicteres]] | noun | **1.** Genus of shrubs and small trees of tropical america and asia having cylindrical fruits spirally twisted around one another. | *"In academic literature, helicteres designates genus of shrubs and small trees of tropical america and asia having cylindrical fruits spirally twisted around one another."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliobacter]] | noun | **1.** A genus of helical or curved or straight aerobic bacteria with rounded ends and multiple flagella; found in the gastric mucosa of primates (including humans). | *"In academic literature, heliobacter designates a genus of helical or curved or straight aerobic bacteria with rounded ends and multiple flagella; found in the gastric mucosa of primates (including humans)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliocentric]] | noun | **1.** Referred to or measured from the sun's center or appearing as if seen from it.<br>**2.** Having or relating to the sun as center. | *"In academic literature, heliocentric designates referred to or measured from the sun's center or appearing as if seen from it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliocentrism]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek heli.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, heliocentrism designates a term designating an entity, condition, or phenomenon derived from greek heli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliodor]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek heli.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, heliodor designates a term designating an entity, condition, or phenomenon derived from greek heli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliogram]] | noun | **1.** A message transmitted by means of the sun's rays. | *"In academic literature, heliogram designates a message transmitted by means of the sun's rays."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliograph]] | noun | **1.** An apparatus for telegraphing by means of the sun's rays flashed from a mirror. | *"In academic literature, heliograph designates an apparatus for telegraphing by means of the sun's rays flashed from a mirror."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliogravure]] | noun | **1.** An intaglio print produced by gravure. | *"In academic literature, heliogravure designates an intaglio print produced by gravure."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliolatry]] | noun | **1.** Sun worship. | *"His present aspect, coupled with the lack of all human forms in the scene, explained the old-time heliolatries in a moment."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[heliomania]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek heli.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, heliomania designates a term designating an entity, condition, or phenomenon derived from greek heli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliometer]] | noun | **1.** A visual telescope that has a divided objective designed for measuring the apparent diameter of the sun but also used for measuring angles between celestial bodies or between points on the moon. | *"In academic literature, heliometer designates a visual telescope that has a divided objective designed for measuring the apparent diameter of the sun but also used for measuring angles between celestial bodies or between points on the moon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliopause]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek heli.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, heliopause designates a term designating an entity, condition, or phenomenon derived from greek heli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Heliophila]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek heli.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, Heliophila designates any of various south african herbs and subshrubs cultivated for long showy racemes of bright blue flowers with white eyes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliophila]] | noun | **1.** Any of various south african herbs and subshrubs cultivated for long showy racemes of bright blue flowers with white eyes. | *"In academic literature, heliophila designates **1.** any of various south african herbs and subshrubs cultivated for long showy racemes of bright blue flowers with white eyes."* — Academic Lexicon |
| [[heliophobia]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek heli.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, heliophobia designates a term designating an entity, condition, or phenomenon derived from greek heli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliophyte]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek heli.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, heliophyte designates a term designating an entity, condition, or phenomenon derived from greek heli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliopsis]] | noun | **1.** Any north american shrubby perennial herb of the genus heliopsis having large yellow daisylike flowers. | *"In academic literature, heliopsis designates any north american shrubby perennial herb of the genus heliopsis having large yellow daisylike flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[Helios]] | noun | **1.** The god of the sun in Greek mythology. | *"This well-known, beautiful, and deeply affecting head, which bears a strong resemblance to the Alexander Helios of the Capitol --especially in the treatment of the hair--has been called by Ottfried Mueller a riddle of archaeology."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[helios]] | noun | **1.** (greek mythology) ancient god of the sun; drove his chariot across the sky each day; identified with roman sol. | *"In academic literature, helios designates **1.** (greek mythology) ancient god of the sun; drove his chariot across the sky each day; identified with roman sol."* — Academic Lexicon |
| [[helioscope]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek heli.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"In academic literature, helioscope designates a term designating an entity, condition, or phenomenon derived from greek heli."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliosphere]] | noun | **1.** The region in space influenced by the sun or solar wind. | *"In academic literature, heliosphere designates the region in space influenced by the sun or solar wind."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliostat]] | noun | **1.** An instrument consisting of a mirror mounted on an axis moved by clockwork by which a sunbeam is steadily reflected in one direction. | *"In academic literature, heliostat designates an instrument consisting of a mirror mounted on an axis moved by clockwork by which a sunbeam is steadily reflected in one direction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliotherapy]] | noun | **1.** A term designating an entity, condition, or phenomenon derived from Greek heli.<br>**2.** Specialized application within the domain of Nature & Cosmos. | *"The operative surgical quality but that he was reluctant to shed human blood even when the end justified the means, preferring, in their natural order, heliotherapy, psychophysicotherapeutics, osteopathic surgery."* — James Joyce, *Ulysses* |
| [[heliothis]] | noun | **1.** A genus of noctuidae. | *"In academic literature, heliothis designates a genus of noctuidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliotrope]] | noun | **1.** Any of a genus (Heliotropium) of herbs or shrubs of the borage family.<br>**2.** Bloodstone. | *"I recognised some euphorbias, with the caustic sugar coming from them; heliotropes, quite incapable of justifying their name, sadly drooped their clusters of flowers, both their colour and perfume half gone."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[heliotropic]] | noun | **1.** Phototropism in which sunlight is the orienting stimulus. | *"In academic literature, heliotropic designates phototropism in which sunlight is the orienting stimulus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliotropism]] | noun | **1.** Phototropism in which sunlight is the orienting stimulus. | *"In academic literature, heliotropism designates phototropism in which sunlight is the orienting stimulus."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliotype]] | noun | **1.** Duplicator consisting of a gelatin plate from which ink can be taken to make a copy. | *"THE HELIOTYPE PRINTING CO. 220 DEVONSHIRE ST."* — John Leonard Hardenbergh, *The Journal of Lieut. John L. Hardenbergh of the Second New York Continental Regiment from May 1 to October 3, 1779, in General Sullivan's Campaign Against the Western Indians* |
| [[heliozoa]] | noun | **1.** Mostly freshwater protozoa.<br>**2.** Protozoa with spherical bodies and stiff radiating pseudopods. | *"In academic literature, heliozoa designates mostly freshwater protozoa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[heliozoan]] | noun | **1.** Protozoa with spherical bodies and stiff radiating pseudopods. | *"In academic literature, heliozoan designates protozoa with spherical bodies and stiff radiating pseudopods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[helium]] | noun | **1.** A chemical element of the noble gas group with atomic number 2 that is found especially in natural gases and used chiefly for inflating airships and balloons, as a coolant for superconductors, and as a component of inert atmospheres (as in welding) —often used before another noun. | *"Night and day, year in and year out, it is firing off these exceedingly minute projectiles, of which there are two kinds, one of which appears to be atoms of helium."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[parheliacal]] | adjective | **1.** Relating to or resembling a parhelion. | *"In academic literature, parheliacal designates relating to or resembling a parhelion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parhelic]] | adjective | **1.** Relating to or resembling a parhelion. | *"In academic literature, parhelic designates relating to or resembling a parhelion."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[parhelion]] | noun | **1.** Any of several bright spots often tinged with color that often appear on the parhelic circle on either side of the sun—called also sun dog. | *"In academic literature, parhelion designates any of several bright spots often tinged with color that often appear on the parhelic circle on either side of the sun—called also sun dog."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[perihelion]] | noun | **1.** The point nearest to the sun in the path of an orbiting celestial body (such as a planet). | *"In academic literature, perihelion designates the point nearest to the sun in the path of an orbiting celestial body (such as a planet)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Nature & Cosmos]]</span>
    <span>[[Greek Learning Progress|Greek Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · HELI
  </div>
</div>
