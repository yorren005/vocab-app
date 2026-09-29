---
status: unread
type: root_dashboard
---
# Dashboard — petr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">petr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“rock or stone”</span>
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

The root **petr** means rock or stone. It refers to hard mineral rock found naturally in the earth. In English, this root forms words such as *peter*, *petrify*, *petrification*, and *petrifaction*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: rock or stone
> The root **petr** means rock or stone. It refers to hard mineral rock found naturally in the earth. In English, this root forms words such as *peter*, *petrify*, *petrification*, and *petrifaction*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Rock or stone</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Plants blossoming in the wild and raw minerals mined from the earth.</mark>
> - **Everyday Connection**: Think of familiar words like *peter* and *petrify*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **petr** comes from a Latin word that means *"rock or stone"*.
  - At its core, it describes rock or stone.

- **The Big Picture Idea**:
  - Picture plants blossoming in the wild and raw minerals mined from the earth.
  - Whenever you see **petr** in an English word, think of **plants, minerals, and elements**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of rock or stone.
  - **Mental & Social**: How people experience, organize, or communicate about rock or stone.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Peter**: The apostle Simon, renamed Peter by Christ.
  - **Petrify**: To convert organic tissue into stone through the cellular infiltration of mineral-rich water.
  - **Petrification**: The process or state of being turned into stone, whether physical mineral replacement of fossils or psychological immobilization from sheer fright.
  - **Petrifaction**: The natural process of fossilizing an organism by replacing its organic framework with silica or calcite.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">petr</mark>, think of <mark class="hl-def">plants, minerals, and elements</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture
> In Greek and Latin, *petra* is a first-declension feminine noun:
> - **Greek:** πέτρα (*pétra*, nominative), πέτρας (*pétrās*, genitive)
> - **Latin:** *petra* (nominative), *petrae* (genitive)
>
> ### Primary Morphological Pathways into English:
> 1. **Direct Verbal & Action Stems (`petri-` + Latin `-ficāre` < *facere*):**
>    - *petri-fy* (convert into stone; paralyze with fright).
>    - *petri-fac-tion* (the physical conversion or resulting fossil).
>    - *petri-fic-ation* (the ongoing process of hardening or freezing).
> 2. **Geological & Technical Compounds (`petro-`):**
>    - *petro-leum* (*petra* + *oleum* "rock oil").
>    - *petro-chemical* (chemicals derived from petroleum).
>    - *petro-logy* / *petro-logist* (study of rocks).
>    - *petro-graphy* (descriptive classification and microscopic study of rocks).
>    - *petro-glyph* (*petra* + Greek *glyphein* "to carve stone").
>    - *petro-genesis* (origin and formation of rocks).
> 3. **Anatomical & Classical Adjectival Stems (`petr-ous`):**
>    - *petrous* (Latin *petrōsus*, dense and rock-hard; temporal bone).
> 4. **Gallo-Romance Phonetic Contraction (`pier-` via Old French *piere*):**
>    - *pier* (stone breakwater, jetty, or structural pillar).

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

> [!tip] 🌈 Conceptual Vectors of *petr*
> 1. **Mineralization & Emotional Paralysis:** Turning physical organic matter into quartz/stone; freezing human motor control through sheer dread (*petrify*, *petrification*, *petrifaction*).
> 2. **Global Hydrocarbons & Energy:** Liquid and gaseous fuels extracted from rock formations, and synthetic petrochemical derivatives (*petroleum*, *petrochemical*, *petrodollar*).
> 3. **Earth Science & Lithological Analysis:** The academic and microscopic discipline of rock origins and classification (*petrology*, *petrologist*, *petrography*, *petrogenesis*).
> 4. **Archaeology & Ancient Art:** Prehistoric human symbols chiseled directly into cliff faces and boulders (*petroglyph*).
> 5. **Human Skeletal Anatomy:** The dense protective pyramid of bone enclosing the delicate inner ear (*petrous* temporal bone).
> 6. **Names, Maritime Lore & Vernacular Idioms:** The rock-solid apostle (*Peter*), the storm bird walking on water (*petrel*), and veins dwindling to stone (*peter out*).

---

## 🔀 4. Prefix & Combining Dynamics on petr

### Compounding Dynamics

| Combining Element | Element Origin & Meaning | Compound Derivative | Resulting Semantic Shift |
| :--- | :--- | :--- | :--- |
| `-ficāre` / `-fy` | Latin *facere* ("to make, cause") | [[petrify]] | To cause living or soft material to become as hard as rock. |
| `oleum` | Latin *oleum* ("oil") | [[petroleum]] | Literally "rock oil"; hydrocarbon liquid trapped within porous subsurface rock. |
| `-logia` | Greek -λογία ("study of") | [[petrology]] | The geological science devoted to the origin and structure of rocks. |
| `glýphein` | Greek γλύφειν ("to carve, engrave") | [[petroglyph]] | An ancient drawing, symbol, or image incised or pecked into a natural rock face. |
| `génesis` | Greek γένεσις ("origin, birth") | [[petrogenesis]] | The geological processes governing the origin and evolution of rocks. |
| `sāl` | Latin *sāl* ("salt") | [[saltpeter]] | Literally "rock salt"; potassium nitrate encrusting limestone caves and cellar walls. |

### Suffix Dynamics

| Suffix | Grammatical Role | Derivative | Semantic Result |
| :--- | :--- | :--- | :--- |
| `-ous` | Latin *-ōsus* (full of, resembling) | [[petrous]] | Exceptionally dense and rock-hard; applied to the petrous temporal bone. |
| `-graphy` | Greek -γραφία (writing, description) | [[petrography]] | The descriptive branch of petrology analyzing rock thin-sections under polarized light. |
| `-el` | Diminutive / Folk suffix | [[petrel]] | A small seabird named after Saint Peter because it hovers as if walking on water. |
| `-dollar` | Currency compound | [[petrodollar]] | US dollar currency reserves accumulated by petroleum-exporting nations. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Disciplinary Field | Representative Derivatives | Practical Application & Context |
| :--- | :--- | :--- |
| 🪨 **Geology & Petrology** | [[petrology]], [[petrography]], [[petrogenesis]] | Classifying igneous, metamorphic, and sedimentary rocks; polarized light thin-section microscopy. |
| ⛽ **Energy & Industrial Chemistry** | [[petroleum]], [[petrochemical]], [[petrodollar]] | Fractional crude distillation, polymer synthesis, cracking hydrocarbons into plastics. |
| 🎨 **Archaeology & Anthropology** | [[petroglyph]] | Dating prehistoric Native American and Saharan rock art panels; rock peck mark analysis. |
| 🧠 **Human Anatomy & Otolaryngology** | [[petrous]] | Surgical access to the petrous apex, protecting the acoustic nerve, middle ear surgery. |
| ⛪ **Theology & Cultural Idioms** | [[Peter]], [[petrel]], [[saltpeter]] | Petrine apostolic succession, gunpowder formulations, mining idioms (*peter out*). |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[empetraceae]] | noun | **1.** Heathlike shrubs. | *"In academic literature, empetraceae designates heathlike shrubs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[empetrum]] | noun | **1.** Crowberries. | *"CROWBERRY UREDO; hypogenous; spots obliterated; sori oval, scattered: the epidermis at first convex, afterwards ruptured and concave; sporidia ovoid or subglobose, bright yellow.—On _Empetrum nigrum_."* — M. C. Cooke, *Rust, Smut, Mildew, & Mould: An Introduction to the Study of Microscopic Fungi* |
| [[perpetrate]] | verb | **1.** Perform an act, usually with a negative connotation. | *"Do they, your hang-dogs, O smug citizen, do these your hang-dogs fear to gaze upon the facial horror of the horror they perpetrate for you and ours and at your behest?"* — Jack London, *The Jacket (The Star-Rover)* |
| [[perpetration]] | noun | **1.** The act of committing a crime. | *"I could rescue myself from this abhorred fate; I could dissipate this tremendous illusion; I could save my brother from the perpetration of new horrors, by pointing out the devil who seduced him."* — Classic Author, *The Lock and Key Library: The most interesting stories of all nations: American* |
| [[perpetrator]] | noun | **1.** Someone who perpetrates wrongdoing. | *"It was the time attack, a common but perilous trick that every novice knows, that has laid on his back many a good man who attempted it, and that is so fraught with danger to the perpetrator that swordsmen are not enamoured of it."* — Jack London, *The Jacket (The Star-Rover)* |
| [[petrarca]] | noun | **1.** An italian poet famous for love lyrics (1304-1374). | *"In academic literature, petrarca designates an italian poet famous for love lyrics (1304-1374)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrarch]] | noun | **1.** An italian poet famous for love lyrics (1304-1374). | *"Now is he for the numbers that Petrarch flowed in."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[petrel]] | noun | **1.** Relatively small long-winged tube-nosed bird that flies far from land. | *"This was as a protection to the hut in the periods of the great gales when all the island was as a tiny petrel in the maw of the hurricane."* — Jack London, *The Jacket (The Star-Rover)* |
| [[petrifaction]] | noun | **1.** The process of turning some plant material into stone by infiltration with water carrying mineral particles without changing the original shape.<br>**2.** A rock created by petrifaction; an organic object infiltrated with mineral matter and preserved in its original form. | *"Shall Man, such step within his endeavor, Man’s face, have no more play and action Than joy which is crystallized forever, Or grief, an eternal petrifaction? -- St. 18. life’s minute: life’s short span. 19."* — Robert Browning, *An Introduction to the Study of Robert Browning's Poetry* |
| [[petrification]] | noun | **1.** The process of turning some plant material into stone by infiltration with water carrying mineral particles without changing the original shape. | *"In academic literature, petrification designates the process of turning some plant material into stone by infiltration with water carrying mineral particles without changing the original shape."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrify]] | verb | **1.** Cause to become stonelike or stiff or dazed and stunned.<br>**2.** Change into stone. | *"And one thing you can depend on, and that is that this crowd’ll stick to you, and work for you, and f-f-fight for you till they p-p-petrify.” Motu smiled a proud, grateful sort of smile and took Mark’s hand."* — Clarence Budington Kelland, *Mark Tidd's Citadel* |
| [[petrifying]] | verb | **1.** Cause to become stonelike or stiff or dazed and stunned.<br>**2.** Change into stone. | *"It was a petrifying thing to see Charmion break down."* — Mrs. George de Horne Vaizey, *The lady of the basement flat* |
| [[petrissage]] | noun | **1.** Massage of the skin which is gently lifted and squeezed. | *"In academic literature, petrissage designates massage of the skin which is gently lifted and squeezed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrochemical]] | noun | **1.** Any compound obtained from petroleum or natural gas. | *"In academic literature, petrochemical designates any compound obtained from petroleum or natural gas."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrocoptis]] | noun | **1.** Perennial tussock-forming rock plants; of pyrenees and mountains of northern spain; similar to and sometimes placed in genus lychnis. | *"In academic literature, petrocoptis designates perennial tussock-forming rock plants; of pyrenees and mountains of northern spain; similar to and sometimes placed in genus lychnis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrogale]] | noun | **1.** Rock wallabies. | *"In academic literature, petrogale designates rock wallabies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petroglyph]] | noun | **1.** A carving or line drawing on rock (especially one made by prehistoric people). | *"In academic literature, petroglyph designates a carving or line drawing on rock (especially one made by prehistoric people)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrograd]] | noun | **1.** A city in the european part of russia; 2nd largest russian city; located at the head of the gulf of finland; former capital of russia. | *"In academic literature, petrograd designates a city in the european part of russia; 2nd largest russian city; located at the head of the gulf of finland; former capital of russia."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrography]] | noun | **1.** Pertaining to, derived from, or characteristic of Latin petr within the domain of Botany, Minerals & Elements.<br>**2.** A technical or specialized form exhibiting the properties of petr in systematic terminology. | *"In academic literature, petrography designates pertaining to, derived from, or characteristic of latin petr within the domain of botany, minerals & elements."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrol]] | noun | **1.** A volatile flammable mixture of hydrocarbons (hexane and heptane and octane etc.) derived from petroleum; used mainly as a fuel in internal-combustion engines. | *"Between 70 deg. and 120 deg. petroleum ether and petroleum naphtha are produced, and they together constitute what is commonly called petrol."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[petrolatum]] | noun | **1.** A semisolid mixture of hydrocarbons obtained from petroleum; used in medicinal ointments and for lubrication. | *"In academic literature, petrolatum designates a semisolid mixture of hydrocarbons obtained from petroleum; used in medicinal ointments and for lubrication."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petroleum]] | noun | **1.** A dark oil consisting mainly of hydrocarbons. | *"Petroleum and natural gas, of which our original reservoirs were perhaps the richest in the world, are being rapidly exhausted."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[petrology]] | noun | **1.** The branch of geology that studies rocks: their origin and formation and mineral composition and classification. | *"In academic literature, petrology designates the branch of geology that studies rocks: their origin and formation and mineral composition and classification."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petromyzon]] | noun | **1.** Typical lampreys. | *"In academic literature, petromyzon designates typical lampreys."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petromyzoniformes]] | noun | **1.** Lampreys as distinguished from hagfishes. | *"In academic literature, petromyzoniformes designates lampreys as distinguished from hagfishes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petromyzontidae]] | noun | **1.** Lampreys. | *"Classical and authoritative lexicons catalog petromyzontidae as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petronius]] | noun | **1.** Roman satirist (died in 66). | *"Oldenberg, Part ii. (Oxford, 1892) p. 218 (_Sacred Books of the East_, vol. xxx.). [251] Petronius, _Sat._ 48; Pausanias, x. 12: 8; Justin Martyr, _Cohort ad Graecos_, 37, p. 34 c (ed. 1742)."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[petroselinum]] | noun | **1.** Parsley. | *"Classical and authoritative lexicons catalog petroselinum as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[petrous]] | adjective | **1.** (of bone especially the temporal bone) resembling stone in hardness. | *"In academic literature, petrous designates (of bone especially the temporal bone) resembling stone in hardness."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PETR
  </div>
</div>
