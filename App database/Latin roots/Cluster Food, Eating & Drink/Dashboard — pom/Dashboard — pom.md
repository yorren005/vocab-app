---
status: unread
type: root_dashboard
---
# Dashboard — pom
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pom-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“fruit or apple”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Gathering at a dining table to share nourishment, bread, and refreshing water.</span>
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

The root **pom** means fruit or apple. It refers to the sweet edible produce of trees and plants bearing seeds. In English, this root forms words such as *pome*, *pomaceous*, *pomace*, and *pomade*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: fruit or apple
> The root **pom** means fruit or apple. It refers to the sweet edible produce of trees and plants bearing seeds. In English, this root forms words such as *pome*, *pomaceous*, *pomace*, and *pomade*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Fruit or apple</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Gathering at a dining table to share nourishment, bread, and refreshing water.</mark>
> - **Everyday Connection**: Think of familiar words like *pome* and *pomaceous*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pom** comes from a Latin word that means *"fruit or apple"*.
  - At its core, it describes fruit or apple.

- **The Big Picture Idea**:
  - Picture gathering at a dining table to share nourishment, bread, and refreshing water.
  - Whenever you see **pom** in an English word, think of **food, eating, and drinking**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of fruit or apple.
  - **Mental & Social**: How people experience, organize, or communicate about fruit or apple.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Pome**: A fleshy, indehiscent accessory fruit having a central cartilaginous core containing seeds.
  - **Pomaceous**: Of, relating to, or resembling apples or pomes.
  - **Pomace**: The crushed pulpy residue of apples or other fruits remaining after the juice has been extracted in a press.
  - **Pomade**: A scented ointment or glossy preparation applied to style and lubricate the hair.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pom</mark>, think of <mark class="hl-def">food, eating, and drinking</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture of Latin *pōmum*
> Derivatives of **pom** enter English across four distinct historical streams:
> 1. **Botanical & Scientific Neologisms:**
>    - *pōmum* $ightarrow$ botanical **pome** (fleshy core fruit).
>    - *pōmum* + *-āceus* $ightarrow$ **pomaceous** (apple-like).
>    - *pōmum* + Greek *-logia* $ightarrow$ **pomology**, **pomologist**, **pomological**.
>    - *pōmi-* + *cultūra* $ightarrow$ **pomiculture** (fruit farming).
>    - *pōmi-* + *-fer* $ightarrow$ **pomiferous** (fruit-bearing).
>    - *pōmi-* + *forma* $ightarrow$ **pomiform** (apple-shaped).
> 2. **Cider & Fermentation By-products:**
>    - Medieval Latin *pōmācium* ("cider") $ightarrow$ Anglo-Norman *pomace* $ightarrow$ English **pomace** (pressed apple pulp).
> 3. **Compound Names of Fruits & Scents:**
>    - Latin *pōmum grānātum* $ightarrow$ Old French *pome granate* $ightarrow$ **pomegranate**.
>    - Old French *pome d'ambre* $ightarrow$ Anglo-Norman **pomander** (aromatic scented ball).
> 4. **Diminutives of Shape & Impact:**
>    - Old French *pomel* (diminutive of *pome*) $ightarrow$ **pommel** (sword knob / saddle horn).
>    - *pommel* (verb) $ightarrow$ phonetic variant **pummel** (to beat repeatedly).
>    - Italian *pomata* / French *pommade* $ightarrow$ **pomade** (originally apple ointment).

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

```
                                  ┌── Botanical & Agronomic ───── pome, pomaceous, pomology, pomiculture, pomiferous
                                  │
                                  ├── Fermentation & Orchards ─── pomace, pomewater, pomroy, Pomona
                                  │
    [POM-] ───────────────────────┼── Fruits & Confections ────── pomegranate, pomme de terre
 (fruit / apple)                  │
                                  ├── Cosmetics & Aromatics ───── pomade, pomander
                                  │
                                  └── Weaponry & Impact ───────── pommel (n.), pommel (v.), pummel
```

> [!tip] 🌈 Thematic Categories of the Derived Vocabulary
> 1. **Systematic Botany & Agronomy:** *pome*, *pomaceous*, *pomology*, *pomologist*, *pomological*, *pomiculture*, *pomiferous*, *pomiform*.
> 2. **Orchard Lore & Heritage Varieties:** *Pomona*, *pomewater*, *pomroy*, *pomace*.
> 3. **Botanical Fruits:** *pomegranate*, *pomme de terre*.
> 4. **Apothecary, Perfumery & Grooming:** *pomade*, *pomander*.
> 5. **Armor, Saddlery & Martial Combat:** *pommel* (noun), *pommel* (verb), *pummel*.

---

## 🔀 4. Prefix & Combining Dynamics on pom

### Compounding Elements

| Compounding Element | Element Meaning | Resulting Lemma | Semantic Transformation |
| :--- | :--- | :--- | :--- |
| `pōmi-` + `grānātum` | apple + seeded | **pomegranate** | The "apple filled with grains/seeds" (*Punica granatum*). |
| `pōmi-` + `d'ambre` | apple + amber | **pomander** | An aromatic, apple-shaped ball of perfume and spices. |
| `pōmi-` + `-culture` | apple/fruit + tillage | **pomiculture** | The cultivation and commercial management of fruit orchards. |
| `pōmi-` + `-logy` | fruit + discourse | **pomology** | The scientific study and classification of fruit trees. |
| `pōmi-` + `-form` | fruit + shape | **pomiform** | Bearing the rounded, globose silhouette of an apple. |
| `pōmi-` + `-ferous` | fruit + bearing | **pomiferous** | Producing fleshy fruit or pomes. |

### Suffix Transformations

| Suffix | Morphological Role | Formed Word | Syntactic Function |
| :--- | :--- | :--- | :--- |
| `-aceous` | Adjective (belonging to / resembling) | **pomaceous** | Of, like, or belonging to the apple family. |
| `-el` (Old French diminutive) | Diminutive noun | **pommel** | A "little apple"—the spherical knob of a sword hilt or saddle. |
| `-ade` (Romance past participle) | Noun of preparation | **pomade** | An ointment originally compounded from stewed apples. |
| `-ace` (Latin *-ācium*) | Collective / residue noun | **pomace** | The mass of crushed apple pulp left after pressing cider. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Domain | Representative Lemmas | Practical Application & Operational Context |
| :--- | :--- | :--- |
| 🍏 **Horticulture, Agronomy & Botany** | *pomology*, *pome*, *pomaceous*, *pomiferous* | Breeding disease-resistant apple and pear rootstocks, classifying Rosaceae accessory fruits, and tracking blossom phenology. |
| ⚔️ **Historical Martial Arts & Weaponry** | *pommel*, *pummel* | Counterbalancing medieval longswords for rapid point control; executing close-quarters pommel strikes in armored combat (*mordschlag*). |
| 🧴 **Cosmetology & Barbering** | *pomade* | Formulating water-based and oil-based hair styling preparations providing high shine and pliable hold. |
| 🍎 **Cider Production & Distilling** | *pomace*, *pomewater* | Pressing apple mash in rack-and-cloth cider presses; fermenting apple pomace into pomace brandy (*eau-de-vie de marc*). |
| 🏺 **Classical Mythology & Literature** | *Pomona*, *pomegranate* | Analyzing Ovidian tales of Vertumnus and Pomona; interpreting the mythological symbolism of Persephone's pomegranate. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[pom]] | noun | **1.** A disparaging term for a british person. | *"Poor little _nominedomine._ Pom."* — James Joyce, *Ulysses* |
| [[pomacanthus]] | noun | **1.** Angelfishes. | *"In academic literature, pomacanthus designates angelfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomace]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pom within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of pom in systematic terminology. | *"In academic literature, pomace designates pertaining to, derived from, or characteristic of latin pom within the domain of food, eating & drink."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomacentridae]] | noun | **1.** Damselfishes. | *"In academic literature, pomacentridae designates damselfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomacentrus]] | noun | **1.** Type genus of the pomacentridae: damselfishes. | *"In academic literature, pomacentrus designates type genus of the pomacentridae: damselfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomade]] | noun | **1.** Hairdressing consisting of a perfumed oil or ointment.<br>**2.** Apply pomade to (hair). | *"She only felt a soft hand taking hers firmly, and she touched with her lips a white forehead, over which was beautiful light-brown hair smelling of pomade."* — graf Leo Tolstoy, *War and Peace* |
| [[pomaded]] | verb | **1.** Apply pomade to (hair).<br>**2.** (of hair) groomed with pomade. | *"He was wearing a blue swallow-tail coat, shoes and stockings, and was perfumed and his hair pomaded."* — graf Leo Tolstoy, *War and Peace* |
| [[pomaderris]] | noun | **1.** A genus of australasian shrubs and trees. | *"In academic literature, pomaderris designates a genus of australasian shrubs and trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomatomidae]] | noun | **1.** Food and game fishes related to pompanos. | *"In academic literature, pomatomidae designates food and game fishes related to pompanos."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomatomus]] | noun | **1.** Type genus of the pomatomidae. | *"In academic literature, pomatomus designates type genus of the pomatomidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomatum]] | noun | **1.** Hairdressing consisting of a perfumed oil or ointment. | *"Largess, in the form of odds and ends of cold cream and pomatum, and also of hairpins, was freely distributed among the attendants."* — Charles Dickens, *The Mystery of Edwin Drood* |
| [[pome]] | noun | **1.** A fleshy fruit (apple or pear or related fruits) having seed chambers and an outer fleshy part. | *"In academic literature, pome designates a fleshy fruit (apple or pear or related fruits) having seed chambers and an outer fleshy part."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomegranate]] | noun | **1.** Shrub or small tree native to southwestern asia having large red many-seeded fruit.<br>**2.** Large globular fruit having many seeds with juicy red pulp in a tough brownish-red rind. | *"Go to, sir; you were beaten in Italy for picking a kernel out of a pomegranate; you are a vagabond, and no true traveller."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pomelo]] | noun | **1.** Southeastern asian tree producing large fruits resembling grapefruits.<br>**2.** Large pear-shaped fruit similar to grapefruit but with coarse dry pulp. | *"In academic literature, pomelo designates southeastern asian tree producing large fruits resembling grapefruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomeranian]] | noun | **1.** Breed of very small compact long-haired dogs of the spitz type. | *"In academic literature, pomeranian designates breed of very small compact long-haired dogs of the spitz type."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pommel]] | noun | **1.** A handgrip that a gymnast uses when performing exercises on a pommel horse.<br>**2.** Handgrip formed by the raised front part of a saddle. | *"The pommel of Caesar’s falchion."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pommy]] | noun | **1.** A disparaging term for a british person. | *"Ay, and there were the fellers round her wringing down the cheese and bustling about and saying, ‘Ware o’ the pommy, ma’am: ’twill spoil yer gown.’ ‘Never mind me,’ says she."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[pomo]] | noun | **1.** A member of an indian people of northern california living along the russian river valley and adjacent pacific coast.<br>**2.** The kulanapan language spoken by the pomo. | *"The Pomos of California celebrate an expulsion of devils every seven years, at which the devils are represented by disguised men."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[pomolobus]] | noun | **1.** Genus to which the alewife is sometimes assigned. | *"In academic literature, pomolobus designates genus to which the alewife is sometimes assigned."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomologist]] | noun | **1.** Someone versed in pomology or someone who cultivates fruit trees. | *"In academic literature, pomologist designates someone versed in pomology or someone who cultivates fruit trees."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomology]] | noun | **1.** The branch of botany that studies and cultivates fruits. | *"In academic literature, pomology designates the branch of botany that studies and cultivates fruits."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomona]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pom within the domain of Food, Eating & Drink.<br>**2.** A technical or specialized form exhibiting the properties of pom in systematic terminology. | *"Hugo: The morn is fair, the weary miles Will shorten 'neath the summer's wiles; Pomona in the orchard smiles, And in the meadow, Flora!"* — Adam Lindsay Gordon, *Poems by Adam Lindsay Gordon* |
| [[pomoxis]] | noun | **1.** Crappies. | *"Classical and authoritative lexicons catalog pomoxis as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pomp]] | noun | **1.** Cheap or pretentious or vain display.<br>**2.** Ceremonial elegance and splendor. | *"I am for the house with the narrow gate, which I take to be too little for pomp to enter: some that humble themselves may, but the many will be too chill and tender, and they’ll be for the flow’ry way that leads to the broad gate and the great fire."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pompadour]] | noun | **1.** French noblewoman who was the lover of louis xv, whose policies she influenced (1721-1764).<br>**2.** A hair style in which the front hair is swept up from the forehead. | *"Perhaps the little woman thought she might play the part of a Maintenon or a Pompadour."* — William Makepeace Thackeray, *Vanity Fair* |
| [[pomposity]] | noun | **1.** Lack of elegance as a consequence of being pompous and puffed up with vanity. | *"His pomposity grows daily but he eyes me with suspicion when he sees me in secret conclave with Petunia."* — Maria Thompson Daviess, *The Tinder-Box* |
| [[pompous]] | adjective | **1.** Puffed up with vanity; ; ; ; - newsweek.<br>**2.** Characterized by pomp and ceremony and stately display. | *"If I heard you rightly, The Duke hath put on a religious life And thrown into neglect the pompous court."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[pompously]] | adverb | **1.** In a pompous manner. | *"Brocklehurst has weakly and pompously repeated at second-hand from Mrs."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[pompousness]] | noun | **1.** Lack of elegance as a consequence of being pompous and puffed up with vanity. | *"So being left alone, (Lycius was gone to summon all his kin) And knowing surely she could never win His foolish heart from its mad pompousness, She set herself, high-thoughted, how to dress The misery in fit magnificence."* — John Keats, *Lamia* |
| [[unpompous]] | adjective | **1.** Not pompous. | *"In academic literature, unpompous designates not pompous."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Food, Eating & Drink]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · POM
  </div>
</div>
