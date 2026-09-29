---
status: unread
type: root_dashboard
---
# Dashboard — volcan
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">volcan-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“fire god or volcano”</span>
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

The root **volcan** means fire god or volcano. It refers to heat, flames, burning combustion, and glowing warmth. In English, this root forms words such as *volcano*, *volcanic*, *volcanically*, and *volcanism*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: fire god or volcano
> The root **volcan** means fire god or volcano. It refers to heat, flames, burning combustion, and glowing warmth. In English, this root forms words such as *volcano*, *volcanic*, *volcanically*, and *volcanism*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Fire god or volcano</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Bright warm flames crackling inside a hearth and radiating glowing heat.</mark>
> - **Everyday Connection**: Think of familiar words like *volcano* and *volcanic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **volcan** comes from a Latin word that means *"fire god or volcano"*.
  - At its core, it describes fire god or volcano.

- **The Big Picture Idea**:
  - Picture bright warm flames crackling inside a hearth and radiating glowing heat.
  - Whenever you see **volcan** in an English word, think of **fire, heat, and burning warmth**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of fire god or volcano.
  - **Mental & Social**: How people experience, organize, or communicate about fire god or volcano.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Volcano**: A rupture or opening in the crust of a planetary-mass object that allows hot lava, volcanic ash, and gases to escape from a magma chamber below the surface.
  - **Volcanic**: Of, relating to, produced by, or resembling a volcano or volcanism.
  - **Volcanically**: In a volcanic manner.
  - **Volcanism**: The geological process and phenomena associated with the surficial discharge of molten rock, pyroclastic materials, and volcanic gases.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">volcan</mark>, think of <mark class="hl-def">fire, heat, and burning warmth</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 Morphological Architecture & Dual-Stem Engine
> The root operates through two parallel orthographic stems in English:
>
> 1. **The Geological Stem `volcan-`** (chiefly via Italian *volcano* / Spanish *volcán*):
>    - Core geographic landform: *volcano*, *volcanic*, *volcanically*.
>    - Geological sciences and processes: *volcanism*, *volcanology*, *volcanologist*, *volcanological*, *volcanist*.
>    - Volcanological dynamics and deposit adjectives: *volcanian*, *volcanogenic*.
>    - Structural and prefixed compounds: *supervolcano*, *subvolcanic*, *cryptovolcanic*.
> 2. **The Chemical & Industrial Stem `vulcan-`** (preserving classical Latin *Vulcānus*):
>    - Classical proper noun: *Vulcan*.
>    - Polymer chemistry verbs and processes: *vulcanize*, *vulcanization*, *vulcanized*, *vulcanizer*, *vulcanizate*.
>    - Hard rubber material: *vulcanite*.
>    - Polymer recycling compounds: *devulcanize*, *devulcanization*.

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

> [!tip] 🌈 The Four Conceptual Provinces of `volcan` / `vulcan`
>
> ```
>                                     ┌── 1. Igneous Geology & Tectonics (volcano, volcanism, volcanology)
>                                     ├── 2. Eruptive Violence & Mineralogy (volcanian, volcanogenic, supervolcano)
>   [volcan / vulcan: subterranean] ──┼── 3. Industrial Polymer Chemistry (vulcanize, vulcanization, vulcanite)
>                                     └── 4. Myth, Astronomy & Temperament (Vulcan, volcanic, devulcanize)
> ```
>
> 1. **Igneous Geology, Plate Tectonics & Volcanology:**
>    - The movement of subterranean magma to the planet's surface: *volcano*, *volcanic*, *volcanism*, *volcanology*, *volcanologist*, *volcanist*.
> 2. **Eruptive Violence, Mineral Deposits & Megastructures:**
>    - Explosive dynamics and colossal geological formations: *volcanian* (ash-dense explosive eruption), *volcanogenic* (ore deposits formed on sea floors), *supervolcano*, *subvolcanic*.
> 3. **Industrial Polymer Chemistry & Materials Science:**
>    - Thermal cross-linking of elastomer chains with sulfur: *vulcanize*, *vulcanization*, *vulcanizer*, *vulcanizate*, *vulcanite* (hard ebonite rubber), *devulcanize* (rubber recycling).
> 4. **Mythology, Astronomy & Emotional Explosion:**
>    - Classical religion, speculative planetary astronomy, and fiery psychology: *Vulcan* (the Roman fire-god / hypothetical planet inside Mercury's orbit), *volcanic* (explosive, uncontrollable human rage).

---

## 🔀 4. Prefix & Combining Dynamics on volcan

### Prefix Dynamics

| Prefix | Morpheme Meaning | Formed Derivative | English Derivative | Resulting Semantic Mechanics |
| :--- | :--- | :--- | :--- | :--- |
| `super-` | above, beyond, colossal | *super-* + *volcano* | [[supervolcano]] | A volcano capable of an eruption of the highest magnitude (VEI 8). |
| `sub-` | under, below | *sub-* + *volcanic* | [[subvolcanic]] | Occurring or crystallizing just beneath a volcanic vent at shallow depth. |
| `crypto-` | hidden, secret (< Gk. *kryptos*) | *crypto-* + *volcanic* | [[cryptovolcanic]] | Supposedly produced by hidden, subterranean volcanic explosions. |
| `de-` | undo, reverse | *de-* + *vulcanize* | [[devulcanize]], [[devulcanization]] | Reversing the sulfur cross-links of vulcanized rubber to enable recycling. |

### Suffix Transformations

| Suffix | Linguistic Function | Combined Form | English Derivative | Resulting Semantic Function |
| :--- | :--- | :--- | :--- | :--- |
| `-ic` | Adjective (Pertaining to, like) | *volcan-* + *-ic* | [[volcanic]] | Of or produced by a volcano; fiery, explosive. |
| `-ism` | Noun (Process, doctrine) | *volcan-* + *-ism* | [[volcanism]] | The geological phenomenon of volcanic eruptions. |
| `-ology` | Noun (Scientific discipline) | *volcan-* + *-ology* | [[volcanology]] | The specialized branch of geology studying volcanoes. |
| `-ist` | Noun (Scientist / adherent) | *volcan-* + *-ist* | [[volcanologist]], [[volcanist]] | An expert in volcanoes; or an 18th-century Plutonist. |
| `-ian` | Adjective (Style / origin) | *volcan-* + *-ian* | [[volcanian]] | Characterized by moderate explosive ash eruptions. |
| `-ogenic` | Adjective (Generated by) | *volcano* + *-genic* | [[volcanogenic]] | Generated or deposited by volcanic activity. |
| `-ize` | Verb (To subject to chemical process) | *Vulcan* + *-ize* | [[vulcanize]] | To chemically cross-link rubber with sulfur and heat. |
| `-ation` | Noun (Chemical/industrial process) | *vulcanize* + *-ation* | [[vulcanization]] | The process of treating rubber to impart elasticity. |
| `-ite` | Noun (Material, mineral) | *Vulcan* + *-ite* | [[vulcanite]] | Hard ebonite rubber; or a copper telluride mineral. |
| `-ate` | Noun (Product of chemical action) | *vulcanize* + *-ate* | [[vulcanizate]] | The cured, cross-linked rubber compound. |

---

## 🌐 5. Disciplinary & Real-World Domains

| Field | Core Lexical Terms | Concrete Professional & Historical Application |
| :--- | :--- | :--- |
| 🌋 **Geophysics, Volcanology & Hazard Mitigation** | [[volcano]], [[volcanism]], [[volcanology]], [[supervolcano]], [[volcanian]] | Volcanologists monitor seismic tremors, tiltmeters, and sulfur dioxide emissions to predict **volcanic eruptions**; **supervolcanoes** like Yellowstone represent planetary extinction risks capable of triggering volcanic winters. |
| 🚙 **Automotive Engineering & Polymer Science** | [[vulcanize]], [[vulcanization]], [[vulcanite]], [[devulcanize]] | Without **vulcanization**, modern automotive transportation would be impossible; vulcanized rubber enables pneumatic tires to withstand high mechanical shear, road friction, and extreme temperatures without melting or disintegrating. |
| ⛏️ **Economic Geology & Mining Engineering** | [[volcanogenic]] | **Volcanogenic massive sulfide (VMS) deposits** (formed on ancient sea floors by underwater volcanic hydrothermal vents known as "black smokers") supply major global reserves of copper, zinc, lead, gold, and silver. |
| 🔭 **History of Astronomy & Classical Myth** | [[Vulcan]] | In 1859, mathematician Urbain Le Verrier proposed a hypothetical planet named **Vulcan** inside Mercury's orbit to explain anomalies in Mercury’s perihelion precession; Einstein’s General Theory of Relativity (1915) proved Vulcan did not exist by explaining the curvature of spacetime. |
| 🎭 **Literature, Drama & Psychology** | [[volcanic]] | Authors describe human characters with **volcanic tempers**—denoting suppressed rage that smolders beneath a deceptively calm exterior before exploding with catastrophic violence. |

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[volcanic]] | adjective | **1.** Relating to or produced by or consisting of volcanoes.<br>**2.** Explosively unstable. | *"The moon has eyed Tom with a dull cold stare, as admitting some puny emulation of herself in his desert region unfit for life and blasted by volcanic fires; but she has passed on and is gone."* — Charles Dickens, *Bleak House* |
| [[volcanically]] | adverb | **1.** By or like volcanoes. | *"What had been the engrossing world had dissolved into an uninteresting outer dumb-show; while here, in this apparently dim and unimpassioned place, novelty had volcanically started up, as it had never, for him, started up elsewhere."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[volcanism]] | noun | **1.** The phenomena associated with volcanic activity. | *"In academic literature, volcanism designates the phenomena associated with volcanic activity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[volcano]] | noun | **1.** A fissure in the earth's crust (or in the surface of some other planet) through which molten lava and gases erupt.<br>**2.** A mountain formed by volcanic material. | *"Smallweed, and bolts along the passage as if he had an acceptable commission to carry the old gentleman to the nearest volcano."* — Charles Dickens, *Bleak House* |
| [[volcanology]] | noun | **1.** The branch of geology that studies volcanoes. | *"In academic literature, volcanology designates the branch of geology that studies volcanoes."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · VOLCAN
  </div>
</div>
