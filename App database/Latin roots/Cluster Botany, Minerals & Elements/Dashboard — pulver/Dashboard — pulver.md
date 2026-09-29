---
status: unread
type: root_dashboard
---
# Dashboard — pulver
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">pulver-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“dust”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Plants blossoming in the wild and raw minerals mined from the earth.</span>
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

The root **pulver** means dust. It refers to dust, powder, fine particles, crushing, annihilation. In English, this root forms words such as *pulverize*, *pulverizer*, *pulverization*, and *pulverizable*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: dust
> The root **pulver** means dust. It refers to dust, powder, fine particles, crushing, annihilation. In English, this root forms words such as *pulverize*, *pulverizer*, *pulverization*, and *pulverizable*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Dust</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Plants blossoming in the wild and raw minerals mined from the earth.</mark>
> - **Everyday Connection**: Think of familiar words like *pulverize* and *pulverizer*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **pulver** comes from a Latin word that means *"dust"*.
  - At its core, it describes dust.

- **The Big Picture Idea**:
  - Picture plants blossoming in the wild and raw minerals mined from the earth.
  - Whenever you see **pulver** in an English word, think of **plants, minerals, and elements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of dust.
  - **Mental & Social**: How people experience, organize, or communicate about dust.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Pulverize**: To reduce into extremely small particles or fine dust.
  - **Pulverizer**: An industrial machine, mill, or mechanical grinder designed to grind bulk solids into micronized powder.
  - **Pulverization**: The mechanical action, operation, or technique of grinding or reducing solid materials to powder.
  - **Pulverizable**: Capable of being easily crushed, ground, or reduced to fine dust or powder.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">pulver</mark>, think of <mark class="hl-def">plants, minerals, and elements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture
> In Latin, *pulvis* is a third-declension masculine (occasionally feminine) noun:
> - **Nominative Singular:** *pulvis* ("dust")
> - **Genitive Singular:** *pulveris* ("of dust")
> - **Accusative Singular:** *pulverem*
> - **Verb:** *pulverāre* / *pulverizāre* ("to turn into powder, sprinkle with dust")
>
> ### Morphological Branches in English:
> 1. **The Classical Humanist Stem (`pulver-`):**
>    - Verb: *pulver-ize* (to crush to powder; demolish).
>    - Adjectives: *pulver-ent*, *pulver-ous*, *pulver-ulent* (Latin *pulverulentus*, full of dust, crumbly).
>    - Nouns: *pulver-ization*, *pulver-izer*, *pulver-ulence*.
> 2. **The Old French Doublet Stem (`powd-`, `poudr-`):**
>    - Noun / Verb: *powder* (fine dry particles; to sprinkle).
>    - Adjectives: *powder-y*.
>    - Agricultural derivative: *poudrette* (dried, pulverized organic fertilizer).
>    - Military and domestic compounds: *gun-powder*, *powder-horn*, *powder-monkey*.

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

> [!tip] 🌈 Conceptual Radiations of *pulver*
> 1. **Mechanical Comminution & Milling:** Crushing, grinding, and reducing ore, rock, grain, or coal to fine particles (*pulverize*, *pulverizer*, *pulverization*).
> 2. **Figurative Annihilation & Total Defeat:** Overwhelming, crushing, or obliterating an adversary, argument, or athletic competitor (*pulverize*, *pulverization*).
> 3. **Texture, Soil Science & Surface Morphology:** Dusty, crumbly, or mealy physical consistency in soils, minerals, and fungal spores (*pulverulent*, *pulverulence*, *pulverous*).
> 4. **Cosmetics, Pharmaceuticals & Explosives:** Culinary spices, medicinal powders, facial cosmetics, and gunpowder (*powder*, *powdery*, *gunpowder*).
> 5. **Agricultural History:** The historical manufacture of dried, odorless powdered soil nutrients (*poudrette*).

---

## 🔀 4. Prefix & Combining Dynamics on pulver

### Prefix Dynamics

| Prefix / Compound | Literal Meaning | Compound Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `gun-` | Middle English *gunne* (artillery weapon) | [[gunpowder]] | An explosive mechanical mixture of pulverized potassium nitrate, charcoal, and sulfur. |
| `talc-` | Arabic طَلْق (*ṭalq*, "pure talc mineral") | [[talcum powder]] | Finely pulverized, perfumed magnesium silicate used to absorb skin moisture. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Effect |
| :--- | :--- | :--- | :--- |
| `-ize` | Verb formative | [[pulverize]] | To reduce solid matter to tiny particles; or to smash into non-existence. |
| `-izer` | Mechanical Agent Noun | [[pulverizer]] | An industrial mill or mechanical crusher designed to grind bulk materials into fine dust. |
| `-ation` | Process / Result Noun | [[pulverization]] | The thermodynamic and mechanical operation of comminuting solids; complete destruction. |
| `-ulent` | Latin *-ulentus* (abounding in, full of) | [[pulverulent]] | Abounding in dust; easily reduced to powder; having a crumbly or dusty coating. |
| `-ence` | Abstract Quality Noun | [[pulverulence]] | The physical condition or state of being powdery, crumbly, or dusty. |
| `-ette` | French diminutive suffix | [[poudrette]] | Pulverized, dried municipal fertilizer historically packaged for agriculture. |
| `-y` | Descriptive Adjective | [[powdery]] | Having the soft, particulate texture or visual appearance of powder. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| ⚙️ **Mining & Mechanical Engineering** | [[pulverizer]], [[pulverize]], [[pulverization]] | Coal-fired boiler ball mills, cement clinker grinding, ore comminution circuits. |
| 🪨 **Geology, Pedology & Mycology** | [[pulverulent]], [[pulverulence]] | Friable soil aggregate classification, powdery mildew spores (*Erysiphales*). |
| 💥 **Military History & Ballistics** | [[gunpowder]] | The evolution of black powder, rifled ordnance, historical naval fleet artillery. |
| 💊 **Pharmaceutics & Cosmetics** | [[powder]], [[powdery]], [[pulverizable]] | Micronized drug compounding, aerosolized dry powder inhalers, facial powders. |
| 🥊 **Rhetoric, Sports & Popular Culture** | [[pulverize]] | Crushing political debate retorts, boxing knockouts, sports journalism headlines. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[pulver]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pulver within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of pulver in systematic terminology. | *"In academic literature, pulver designates pertaining to, derived from, or characteristic of latin pulver within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pulverisation]] | noun | **1.** A solid substance in the form of tiny loose particles; a solid that has been pulverized.<br>**2.** The act of grinding to a powder or dust. | *"In academic literature, pulverisation designates a solid substance in the form of tiny loose particles; a solid that has been pulverized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pulverise]] | verb | **1.** Destroy completely.<br>**2.** Become powder or dust. | *"An average stamp will weigh 600 to 700 lb., and the repeated blows of such a hammer are enough to pulverise the hardest rock."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[pulverised]] | verb | **1.** Destroy completely.<br>**2.** Become powder or dust. | *"The device of using pulverised coal as a fuel has attracted attention at several smelters where the local coal as mined was proved to be unsuitable for use."* — Donald M. Levy, *Modern Copper Smelting* |
| [[pulverization]] | noun | **1.** A solid substance in the form of tiny loose particles; a solid that has been pulverized.<br>**2.** The act of grinding to a powder or dust. | *"In academic literature, pulverization designates a solid substance in the form of tiny loose particles; a solid that has been pulverized."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[pulverize]] | verb | **1.** Make into a powder by breaking up or cause to become dust.<br>**2.** Destroy completely. | *"The wheels of the dairyman’s spring-cart, as he sped home from market, licked up the pulverized surface of the highway, and were followed by white ribands of dust, as if they had set a thin powder-train on fire."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[pulverized]] | verb | **1.** Make into a powder by breaking up or cause to become dust.<br>**2.** Destroy completely. | *"The wheels of the dairyman’s spring-cart, as he sped home from market, licked up the pulverized surface of the highway, and were followed by white ribands of dust, as if they had set a thin powder-train on fire."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[pulverulent]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin pulver within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of pulver in systematic terminology. | *"Produced in separate cells.— Deeply seated, pulverulent, } _Ustilago_ generally nearly black } Superficial, yellow or brown _Uredo_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Botany, Minerals & Elements]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PULVER
  </div>
</div>
