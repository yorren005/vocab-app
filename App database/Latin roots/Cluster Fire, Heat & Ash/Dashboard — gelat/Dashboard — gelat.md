---
status: unread
type: root_dashboard
---
# Dashboard — gelat
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">gelat-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“freeze or congeal”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Bright warm flames crackling inside a hearth and radiating glowing heat.</span>
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

The root **gelat** means freeze or congeal. It refers to freeze, congeal, solidify from cold, gelatinous. In English, this root forms words such as *gel*, *gelatin*, *gelatinous*, and *gelatinize*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: freeze or congeal
> The root **gelat** means freeze or congeal. It refers to freeze, congeal, solidify from cold, gelatinous. In English, this root forms words such as *gel*, *gelatin*, *gelatinous*, and *gelatinize*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Freeze or congeal</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Bright warm flames crackling inside a hearth and radiating glowing heat.</mark>
> - **Everyday Connection**: Think of familiar words like *gel* and *gelatin*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **gelat** comes from a Latin word that means *"freeze or congeal"*.
  - At its core, it describes freeze or congeal.

- **The Big Picture Idea**:
  - Picture bright warm flames crackling inside a hearth and radiating glowing heat.
  - Whenever you see **gelat** in an English word, think of **fire, heat, and burning warmth**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of freeze or congeal.
  - **Mental & Social**: How people experience, organize, or communicate about freeze or congeal.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Gel**: A semi-solid colloidal suspension in which a liquid is trapped within a three-dimensional polymer network.
  - **Gelatin**: A translucent, colorless, flavorless protein derived from collagen extracted from animal skin, bones, and connective tissues, used in food, photography, and pharmaceutical capsules.
  - **Gelatinous**: Having the nature, consistency, or viscous elasticity of gelatin or jelly.
  - **Gelatinize**: To convert or be converted into a gelatinous substance or gel.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">gelat</mark>, think of <mark class="hl-def">fire, heat, and burning warmth</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Stem Engines
> The root operates through three interconnected morphological stems in English:
>
> 1. **The Participial & Colloidal Stem `gelat-` / `gel-`** (from *gelātum* & *gélatine*):
>    - Direct culinary and colloidal nouns: *gelatin*, *gel*, *gelato*.
>    - Adjectival and process forms: *gelatinous*, *gelatinize*, *gelatinization*.
>    - Advanced materials science compounds: *aerogel*, *hydrogel*.
> 2. **The Romance Vernacular Reflex `jell-`** (from Old French *gelee* < *gelāta*):
>    - Everyday culinary nouns and verbs: *jelly*, *jell*, *jellied*, *jellyfish*.
> 3. **The Classical Adjectival Stem `gelid-`** (from *gelidus* "icy"):
>    - Learned literary terms: *gelid*, *gelidity*, *gelidly*.
> 4. **The Prefixed Coagulation Stem `congel-` / `congeal-`** (from *congelāre*):
>    - Verb of phase change: *congeal*.
>    - Derived process nouns: *congealment*, *congelation*.
>    - Modal adjectives: *congealable*, *incongealable*.

---

## 🎨 3. Semantic Range Across Derived Words

> [!tip]- 🎯 **Live Study Filter & Queue**
```dataviewjs
const p = dv.pages('"' + dv.current().file.folder + '"').where(n => n.file.name !== dv.current().file.name && n.latin_root);
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

> [!tip] 🌈 The Four Conceptual Provinces of `gelat` / `gel`
>
> ```
>                                ┌── 1. Colloid Chemistry & Advanced Materials (gel, hydrogel, aerogel)
>                                ├── 2. Food Science, Confectionery & Gastronomy (gelatin, gelato, jelly, jell)
>   [gelat: freeze / congeal] ───┼── 3. Thermal Coldness & Frigidity (gelid, gelidity, gelidly)
>                                └── 4. Coagulation, Clotting & Solidification (congeal, congealment, congelation)
> ```
>
> 1. **Colloid Chemistry, Biochemistry & Advanced Nanomaterials:**
>    - Cross-linked polymer networks that entrap fluids, from DNA electrophoresis to space exploration: *gel*, *hydrogel*, *aerogel*, *gelatinize*.
> 2. **Food Science, Confectionery & Culinary Arts:**
>    - Soluble collagen proteins that set upon cooling, frozen dairy desserts, and fruit spreads: *gelatin*, *gelatinous*, *gelato*, *jelly*, *jellied*, *jell* (taking shape).
> 3. **Thermal Coldness, Meteorology & Physiology:**
>    - The literal presence of biting, numbing cold: *gelid* (icy, frost-covered), *gelidity*, *gelidly*.
> 4. **Coagulation, Clotting & Phase Transitions:**
>    - The gradual transformation of mobile liquids (blood, gravy, molten wax) into thick, motionless masses: *congeal*, *congealment*, *congelation*, *congealable*.

---

## 🔀 4. Prefix & Combining Dynamics on gelat

### Prefix Dynamics

| Prefix | Morpheme Meaning | Classical Latin Compound | English Derivative | Resulting Semantic Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| `con-` | together, completely | *congelāre* | [[congeal]], [[congelation]], [[congealment]] | To freeze *completely together*; liquid molecules binding into a cohesive solid or clot. |
| `in-` | not | Modern formation | [[incongealable]] | *Not* capable of being frozen or congealed; maintaining liquidity at sub-zero temperatures. |

### Suffix Transformations

| Suffix | Linguistic Function | Combined Form | English Derivative | Resulting Semantic Function |
| :--- | :--- | :--- | :--- | :--- |
| `-in` / `-ine` | Concrete chemical/organic substance | *gelātus* + *-ine* | [[gelatin]] | The purified collagen protein extracted from animal tissue. |
| `-ous` | Adjective (Resembling, having quality of) | *gelatin* + *-ous* | [[gelatinous]] | Viscous, rubbery, resembling gelatin or jelly. |
| `-ize` | Verb (To cause to become) | *gelatin* + *-ize* | [[gelatinize]] | To convert into a colloidal jelly or swollen starch gel. |
| `-ation` | Noun of process | *congelāre* + *-tiō* | [[congelation]], [[gelatinization]] | The process of freezing, setting, or coagulating. |
| `-ment` | Noun of result or process | *congeal* + *-ment* | [[congealment]] | The congealed state or the solidified substance itself. |
| `-id` | Descriptive adjective of physical state | *gelū* + *-idus* | [[gelid]] | Characterized by intense, biting cold. |
| `-ity` | Abstract noun of quality | *gelidus* + *-tās* | [[gelidity]] | Icy coldness; severe frigidity. |
| `-able` | Adjective (Capable of) | *congeal* + *-able* | [[congealable]] | Capable of congealing or solidifying. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Core Lexical Terms | Concrete Professional & Historical Application |
| :--- | :--- | :--- |
| 🧬 **Molecular Biology & Genetics** | [[gel]], [[gelatinous]] | **Agarose gel electrophoresis** is the universal laboratory technique used to separate DNA, RNA, or protein macromolecules by molecular size under an electric gradient. |
| 🚀 **Aerospace & Materials Science** | [[aerogel]], [[hydrogel]] | Silica **aerogel** (often called "frozen smoke") is the lightest solid known to science, functioning as ultralight thermal insulation on NASA Mars Exploration Rovers and in cryogenic fuel tanks. |
| 🩺 **Hematology & Wound Pathology** | [[congeal]], [[congelation]], [[hydrogel]] | Blood **congealing** (coagulation cascade) forms fibrin mesh clots to halt hemorrhage. Polymeric **hydrogel dressings** maintain a moist physiological wound environment that accelerates tissue re-epithelialization. |
| 🍨 **Culinary Science & Food Industry** | [[gelatin]], [[gelato]], [[jelly]], [[jellied]] | Food scientists utilize the reversible thermogelling properties of **gelatin** to stabilize marshmallows, gummy candies, and pharmaceutical softgel capsules. Italian **gelato** achieves its silky texture through low fat and dense overrun control. |
| 🌊 **Marine Biology** | [[jellyfish]] | Cnidarians (**jellyfish**) possess a body composed of a non-living, translucent **gelatinous** substance called mesoglea, consisting of 95% water supported by collagen fibers. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[congelation]] | noun | **1.** The process of congealing; solidification by (or as if by) freezing. | *"Do you not understand,” he replied, “that this congelation of water will help us?"* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[gelatin]] | noun | **1.** A colorless water-soluble glutinous protein obtained from animal tissues such as bone and skin.<br>**2.** An edible jelly (sweet or pungent) made with gelatin and used as a dessert or salad base or a coating for foods. | *"In academic literature, gelatin designates a colorless water-soluble glutinous protein obtained from animal tissues such as bone and skin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gelatine]] | noun | **1.** A colorless water-soluble glutinous protein obtained from animal tissues such as bone and skin. | *"Do you know the meaning of "Ben Day?" It is a mechanical tint, printed mechanically either on the plate, by the engraver, or on the original drawing, from an inked gelatine surface and rubbed on with a stilus."* — H. C. Forster, *From Xylographs to Lead Molds; A.D. 1440-A.D. 1921* |
| [[gelatinise]] | verb | **1.** Become gelatinous or change into a jelly.<br>**2.** Convert into gelatinous form or jelly. | *"In academic literature, gelatinise designates become gelatinous or change into a jelly."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gelatinize]] | verb | **1.** Coat with gelatin.<br>**2.** Become gelatinous or change into a jelly. | *"In academic literature, gelatinize designates coat with gelatin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gelatinlike]] | adjective | **1.** Thick like gelatin. | *"In academic literature, gelatinlike designates thick like gelatin."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[gelatinous]] | adjective | **1.** Thick like gelatin. | *"Others, the greater number yellow and gelatinous, waited only to be picked."* — Jules Verne, *Twenty Thousand Leagues under the Sea* |
| [[gelatinousness]] | noun | **1.** The property of having a viscosity like jelly. | *"In academic literature, gelatinousness designates the property of having a viscosity like jelly."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Fire, Heat & Ash]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · GELAT
  </div>
</div>
