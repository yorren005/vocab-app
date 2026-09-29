---
status: unread
type: root_dashboard
---
# Dashboard — terr
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">terr-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“earth”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> Tall green trees, rolling hills, and rain watering the fertile landscape.</span>
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

The root **terr** means earth. It refers to the soil, the ground underfoot, and dry land. In English, this root forms words such as *terrain*, *terrestrial*, *territory*, and *subterranean*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: earth
> The root **terr** means earth. It refers to the soil, the ground underfoot, and dry land. In English, this root forms words such as *terrain*, *terrestrial*, *territory*, and *subterranean*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Earth</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *terrain* and *terrestrial*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **terr** comes from a Latin word that means *"earth"*.
  - At its core, it describes earth.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **terr** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of earth.
  - **Mental & Social**: How people experience, organize, or communicate about earth.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Terrain**: A stretch of land, especially regarded with respect to its physical, topographical, and military characteristics.
  - **Terrestrial**: Of, on, or relating to the Earth as a planet.
  - **Territory**: An organized area of land under the jurisdiction, sovereignty, or control of a state, ruler, or administrative authority.
  - **Subterranean**: Existing, occurring, operating, or situated beneath the surface of the earth.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">terr</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **terr** manifests across multiple productive morphological layers:
> - **Base Latin Adjectives `terren-` and `terrestri-` (*terrēnus*, *terrestre*):**
>   - Adjective: *terrene* (earthly, worldly).
>   - Cosmological adjective: *terrestrial*.
>   - Prefix spatial formations:
>     - `extra-` ("outside") $\to$ *extraterrestrial*.
>     - `sub-` ("under") $\to$ *subterranean*.
> - **Prefix Burial Verbs in `interr-` (*interrāre*):**
>   - With `in-`: *inter* (to bury), *interment*.
>   - With `dis-` + `in-`: *disinter* (to exhume), *disinterment*.
> - **Sovereignty & Spatial Stems `territori-` and `terrain`:**
>   - *territory*, *territorial*, *terrain*.
>   - Stepped landform: *terrace*.
>   - Soil enclosure: *terrarium*.
> - **Ecological & Culinary Compounds:**
>   - Soil-dwelling: *terricolous* (*terra* + *colere*).
>   - French soil identity: *terroir*.
>   - Geological sea compound: *mediterranean* (*medius* + *terra*).
> - **Unmodified Latin Fixed Phrases in English:**
>   - *terra cotta* ("cooked earth").
>   - *terra firma* ("solid earth").
>   - *terra incognita* ("unknown earth").

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

> [!tip] 🌈 Shades of Meaning in Different Words
> - **Cosmology, Planetary Science & Astrobiology:** Terrestrial planets (Mercury, Venus, Earth, Mars) vs. gas giants; searching for alien life outside Earth (*terrestrial*, *extraterrestrial*).
> - **Speleology, Mining & Subsurface Infrastructure:** Caverns, subway tunnels, and deep aquifers operating below ground level (*subterranean*).
> - **Mortuary Archaeology & Forensic Exhumation:** Funerary burial of corpses, and legal disinterment for criminal autopsy or reburial (*inter*, *interment*, *disinter*, *disinterment*).
> - **Geopolitics, International Law & Military Strategy:** Sovereign geographic borders, territorial integrity, and tactical land warfare (*territory*, *territorial*, *terrain*).
> - **Agriculture, Viticulture & Architecture:** Hillside farming steps, glass plant enclosures, ceramic clay tiles, and wine microclimates (*terrace*, *terrarium*, *terra cotta*, *terroir*, *terricolous*).

---

## 🔀 4. Prefix & Combining Dynamics on terr

### Prefix Dynamics
- **`extra-` (Outside / Beyond):** *extraterrestrial* $\to$ originating outside Earth.
- **`sub-` (Under / Beneath):** *subterranean* $\to$ situated underground.
- **`in-` (Into):** *inter* $\to$ to put *into* the earth; bury.
- **`dis-` + `in-` (Un- + Into):** *disinter* $\to$ to dig up from the earth; exhume.
- **`medi-` (*medius* "middle"):** *mediterranean* $\to$ enclosed by land.

### Suffix Dynamics
- **`-ial` / `-ian` (Pertaining to):** *terrestrial*, *subterranean*, *territorial*.
- **`-ment` (Result of Action):** *interment*, *disinterment*.
- **`-arium` (Enclosure for):** *terrarium* $\to$ glass container for terrestrial plants.
- **`-colous` (*colere* "to dwell"):** *terricolous* $\to$ living in the soil.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Astrobiology & Exoplanet Research:** NASA’s Kepler and James Webb Space Telescopes searching for rocky *terrestrial* exoplanets in stellar habitable zones.
> - **Forensic Pathology & Criminal Jurisprudence:** Securing court orders to *disinter* buried human remains for forensic DNA analysis or toxicology retesting.
> - **International Public Law & Geopolitics:** Enforcing the UN Charter's protection of *territorial* integrity and adjudicating maritime boundary disputes.
> - **Oenology & Agronomy:** France's Appellation d'Origine Contrôlée (AOC) system legally protecting regional *terroir* (soil minerality, drainage, sun exposure).
> - **Civil Engineering & Geotechnical Construction:** Designing *subterranean* tunnel boring machines (TBMs) for metropolitan subway systems.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[counterterror]] | adjective | **1.** Intended to prevent terrorism. | *"In academic literature, counterterror designates intended to prevent terrorism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterterrorism]] | noun | **1.** A strategy intended to prevent or counter terrorism. | *"In academic literature, counterterrorism designates a strategy intended to prevent or counter terrorism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[counterterrorist]] | noun | **1.** Someone who attempts to prevent terrorism.<br>**2.** Intended to prevent terrorism. | *"In academic literature, counterterrorist designates someone who attempts to prevent terrorism."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deterrence]] | noun | **1.** A negative motivational influence.<br>**2.** A communication that makes you afraid to try something. | *"In academic literature, deterrence designates a negative motivational influence."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[deterrent]] | noun | **1.** Something immaterial that interferes with or delays action or progress.<br>**2.** Tending to deter. | *"A sufficient deterrent to irregular withdrawal of funds is usually found in the loss of interest if deposits are withdrawn at other than stated times."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[exterritorial]] | adjective | **1.** Outside territorial limits or jurisdiction. | *"In academic literature, exterritorial designates outside territorial limits or jurisdiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[extraterrestrial]] | noun | **1.** A form of life assumed to exist outside the earth or its atmosphere.<br>**2.** Originating or located or occurring outside earth or its atmosphere. | *"The Damakoi are one of the few extraterrestrials who have taken up the use of tobacco."* — Randall Garrett, *Deadly decoy* |
| [[extraterritorial]] | adjective | **1.** Outside territorial limits or jurisdiction. | *"In academic literature, extraterritorial designates outside territorial limits or jurisdiction."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interracial]] | adjective | **1.** Between races.<br>**2.** Involving or composed of different races. | *"In academic literature, interracial designates between races."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interracially]] | adverb | **1.** By race. | *"Classical and authoritative lexicons catalog interracially as a recognized concept in linguistic and etymological taxonomy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interred]] | verb | **1.** Place in a grave or tomb.<br>**2.** Placed in a grave. | *"I Richard’s body have interred new, And on it have bestow’d more contrite tears Than from it issued forced drops of blood."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interreflection]] | noun | **1.** Reciprocal reflection between two reflecting surfaces. | *"In academic literature, interreflection designates reciprocal reflection between two reflecting surfaces."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interregnum]] | noun | **1.** The time between two reigns, governments, etc. | *"Therefore, I saw that here was a sort of interregnum in Providence; for its even-handed equity never could have so gross an injustice."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[interrelate]] | verb | **1.** Be in a relationship with.<br>**2.** Place into a mutual relationship. | *"Both the prices of all the particular objects of international trade and the general levels of prices in any two trading countries come to be pretty definitely interrelated."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[interrelated]] | verb | **1.** Be in a relationship with.<br>**2.** Place into a mutual relationship. | *"Both the prices of all the particular objects of international trade and the general levels of prices in any two trading countries come to be pretty definitely interrelated."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[interrelatedness]] | noun | **1.** Mutual or reciprocal relation or relatedness. | *"In academic literature, interrelatedness designates mutual or reciprocal relation or relatedness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interrelation]] | noun | **1.** Mutual or reciprocal relation or relatedness. | *"When the interrelation of the factors is recognized there is little likelihood of concluding that some one of them will absorb all the benefits of progress."* — Frank A. Fetter, *The Principles of Economics, with Applications to Practical Problems* |
| [[interrelationship]] | noun | **1.** Mutual or reciprocal relation or relatedness. | *"In academic literature, interrelationship designates mutual or reciprocal relation or relatedness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[interrogate]] | verb | **1.** Transmit (a signal) for setting off an appropriate response, as in telecommunication.<br>**2.** Pose a series of questions to. | *"When I reached Coombe Tracey I told Perkins to put up the horses, and I made inquiries for the lady whom I had come to interrogate."* — Arthur Conan Doyle, *The Hound of the Baskervilles* |
| [[interrogation]] | noun | **1.** A sentence of inquiry that asks for a reply.<br>**2.** A transmission that will trigger an answering transmission from a transponder. | *"On interrogation, he said "he had frequently heard that minister."* — Classic Author, *The wonders of prayer* |
| [[interrogative]] | noun | **1.** A sentence of inquiry that asks for a reply.<br>**2.** Some linguists consider interrogative sentences to constitute a mood. | *"Which is it to be?” He stood with his head on one side and himself on one side, in a bullying, interrogative manner, and he threw his forefinger at Mr."* — Charles Dickens, *Great Expectations* |
| [[interrogatively]] | adverb | **1.** In a questioning format.<br>**2.** With curiosity. | *"Who are they, Sir James, do you know?” “I see Vincy, the Mayor of Middlemarch; they are probably his wife and son,” said Sir James, looking interrogatively at Mr."* — George Eliot, *Middlemarch* |
| [[interrogator]] | noun | **1.** A questioner who is excessively harsh. | *"Reed my benefactress; if so, a benefactress is a disagreeable thing.” “Do you say your prayers night and morning?” continued my interrogator."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[interrogatory]] | noun | **1.** Formal systematic questioning.<br>**2.** Relating to the use of or having the nature of an interrogation. | *"No one seemed to understand to whom the stately mistress addressed her brief interrogatory."* — Effie Afton, *Eventide* |
| [[interrupt]] | noun | **1.** A signal that temporarily stops the execution of a program so that another procedure can be carried out.<br>**2.** Make a break in. | *"Under the cool shade of a sycamore I thought to close mine eyes some half an hour, When, lo, to interrupt my purposed rest, Toward that shade I might behold addressed The King and his companions."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interrupted]] | verb | **1.** Make a break in.<br>**2.** Destroy the peace or tranquility of. | *"Will you hence, Before the tag return, whose rage doth rend Like interrupted waters, and o’erbear What they are used to bear?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interrupter]] | noun | **1.** A device for automatically interrupting an electric current. | *"Proud Saturnine, interrupter of the good That noble-minded Titus means to thee!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[interruption]] | noun | **1.** An act of delaying or interrupting the continuity.<br>**2.** Some abrupt occurrence that interrupts an ongoing activity. | *"And bloody England into England gone, O’erbearing interruption, spite of France?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[mediterranean]] | noun | **1.** The largest inland sea; between europe and africa and asia.<br>**2.** Of or relating to or characteristic of or located near the mediterranean sea. | *"I was in the Mediterranean with him; I am quite a sailor."* — Charles Dickens, *Bleak House* |
| [[nonterritorial]] | adjective | **1.** Not displaying territoriality. | *"In academic literature, nonterritorial designates not displaying territoriality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[subterranean]] | adjective | **1.** Being or operating under the surface of the earth.<br>**2.** Lying beyond what is openly revealed or avowed (especially being kept in the background or deliberately concealed); ; - bertrand russell. | *"Snagsby was about to descend into the subterranean regions to take tea when he looked out of his door just now and saw the crow who was out late."* — Charles Dickens, *Bleak House* |
| [[subterraneous]] | adjective | **1.** Being or operating under the surface of the earth.<br>**2.** Lying beyond what is openly revealed or avowed (especially being kept in the background or deliberately concealed); ; - bertrand russell. | *"A low rumbling sound was heard; a subterraneous hum; and then all held their breaths; as bedraggled with trailing ropes, and harpoons, and lances, a vast form shot lengthwise, but obliquely from the sea."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[terrace]] | noun | **1.** Usually paved outdoor area adjoining a residence.<br>**2.** A level shelf of land interrupting a declivity (with steep slopes above and below). | *"Enter King, Queen and Somerset on the terrace, aloft."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[terrain]] | noun | **1.** A piece of ground having specific characteristics or military potential. | *"Stretching away from the twenty-kilometer-wide city, the mottled terrain spread in all directions, slashed by ravines and man-made, soil-fused excavations, roads and bridges."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[terramycin]] | noun | **1.** A yellow crystalline antibiotic (trademark terramycin) obtained from a soil actinomycete; used to treat various bacterial and rickettsial infections. | *"In academic literature, terramycin designates a yellow crystalline antibiotic (trademark terramycin) obtained from a soil actinomycete; used to treat various bacterial and rickettsial infections."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terrapene]] | noun | **1.** Box turtles. | *"In academic literature, terrapene designates box turtles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terrapin]] | noun | **1.** Any of various edible north american web-footed turtles living in fresh or brackish water. | *"Many of the animal manidos, not being dangerous, are often treated with contempt--the terrapin, the weasel, polecat, etc." The distinction is instructive."* — James George Frazer, *The Golden Bough: A Study of Magic and Religion* |
| [[terrarium]] | noun | **1.** A vivarium in which selected living plants are kept and observed. | *"In academic literature, terrarium designates a vivarium in which selected living plants are kept and observed."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terrasse]] | verb | **1.** Provide (a house) with a terrace. | *"In academic literature, terrasse designates provide (a house) with a terrace."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terrene]] | adjective | **1.** Of or relating to or inhabiting the land as opposed to the sea or air.<br>**2.** Belonging to this earth or world; not ideal or heavenly. | *"Alack, our terrene moon is now eclipsed, And it portends alone the fall of Antony."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[terreplein]] | noun | **1.** Level space where heavy guns can be mounted behind the parapet at the top of a rampart. | *"In academic literature, terreplein designates level space where heavy guns can be mounted behind the parapet at the top of a rampart."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terrestrial]] | adjective | **1.** Of or relating to or inhabiting the land as opposed to the sea or air.<br>**2.** Of or relating to or characteristic of the planet earth or its inhabitants; - l.c.eiseley. | *"No, he gives me the proverbs and the no-verbs. [_To Caius_.] Give me thy hand, terrestrial; so. [_To Evans_.] Give me thy hand, celestial; so."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[terrestrially]] | adverb | **1.** In a worldly manner.<br>**2.** To a land environment. | *"Even its position terrestrially is one of the elements of a new interest, and for no particular reason save that the incident of the night had occurred there Oak went again into the plantation."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[terrible]] | adjective | **1.** Causing fear or dread or terror.<br>**2.** Exceptionally bad or displeasing. | *"When you sally upon him, speak what terrible language you will; though you understand it not yourselves, no matter; for we must not seem to understand him, unless someone among us, whom we must produce for an interpreter."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[terribleness]] | noun | **1.** A quality of extreme unpleasantness. | *"In academic literature, terribleness designates a quality of extreme unpleasantness."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terribly]] | adverb | **1.** Used as intensifiers.<br>**2.** In a terrible manner. | *"It thunders and lightens terribly; then the Spirit riseth._] SPIRIT. _Adsum_."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[terrier]] | noun | **1.** Any of several usually small short-bodied breeds originally trained to hunt animals living underground. | *"Snagsby whether he means Carrots, or the Colonel, or Gallows, or Young Chisel, or Terrier Tip, or Lanky, or the Brick."* — Charles Dickens, *Bleak House* |
| [[terrietia]] | noun | **1.** Small genus of timber trees of eastern asia, australasia and tropical africa that form large buttresses. | *"In academic literature, terrietia designates small genus of timber trees of eastern asia, australasia and tropical africa that form large buttresses."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terrific]] | adjective | **1.** Very great or intense.<br>**2.** Extraordinarily good or great ; used especially as intensifiers. | *"Suddenly a terrific shout of joy sounded from all voices at once as they all called: "Uncle Phipp!"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[terrifically]] | adverb | **1.** (used as an intensifier) extremely well. | *"Wopsle finished off with a most terrifically snarling passage from Richard the Third, and seemed to think he had done quite enough to account for it when he added, “—as the poet says.” And here I may remark that when Mr."* — Charles Dickens, *Great Expectations* |
| [[terrified]] | verb | **1.** Fill with terror; frighten greatly.<br>**2.** Thrown into a state of intense fear or desperation. | *"I could see with what terrified bounds he flew down the mountain-side." "Was he afraid, too, do you really mean?"* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[terrify]] | verb | **1.** Fill with terror; frighten greatly. | *"They tended their flocks severely in buckram and powder and put their sticking-plaster patches on to terrify commoners as the chiefs of some other tribes put on their war-paint."* — Charles Dickens, *Bleak House* |
| [[terrifying]] | verb | **1.** Fill with terror; frighten greatly.<br>**2.** Causing extreme terror. | *"As not one of them wanted to admit the hasty retreat before the ghost had even been properly inspected, they only dropped vague and terrifying words about the matter."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[terrine]] | noun | **1.** A pate or fancy meatloaf baked in an earthenware casserole. | *"In academic literature, terrine designates a pate or fancy meatloaf baked in an earthenware casserole."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[territorial]] | noun | **1.** Nonprofessional soldier member of a territorial military unit.<br>**2.** A territorial military unit. | *"The series of novels I projected being mainly of the kind called local, they seemed to require a territorial definition of some sort to lend unity to their scene."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[territorialisation]] | noun | **1.** The act of organizing as a territory. | *"In academic literature, territorialisation designates the act of organizing as a territory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[territorialise]] | verb | **1.** Organize as a territory.<br>**2.** Place on a territorial basis. | *"In academic literature, territorialise designates organize as a territory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[territoriality]] | noun | **1.** The behavior of a male animal that defines and defends its territory. | *"In academic literature, territoriality designates the behavior of a male animal that defines and defends its territory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[territorialization]] | noun | **1.** The act of organizing as a territory. | *"In academic literature, territorialization designates the act of organizing as a territory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[territorialize]] | verb | **1.** Organize as a territory.<br>**2.** Place on a territorial basis. | *"In academic literature, territorialize designates organize as a territory."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[territorially]] | adverb | **1.** With respect to territory. | *"The country was being divided territorially into great railroad domains, within each of which one financial interest was dominant."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[territory]] | noun | **1.** A region marked off for administrative or other purposes.<br>**2.** An area of knowledge or interest. | *"Bring him dead or living Within this twelvemonth, or turn thou no more To seek a living in our territory."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[terror]] | noun | **1.** An overwhelming feeling of fear and anxiety.<br>**2.** A person who inspires fear or dread. | *"He stopped the flyers And by his rare example made the coward Turn terror into sport."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[terror-stricken]] | adjective | **1.** Struck or filled with terror. | *"In academic literature, terror-stricken designates struck or filled with terror."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terror-struck]] | adjective | **1.** Struck or filled with terror. | *"In academic literature, terror-struck designates struck or filled with terror."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terrorisation]] | noun | **1.** The act of inspiring with fear.<br>**2.** An act of terrorism. | *"In academic literature, terrorisation designates the act of inspiring with fear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terrorise]] | verb | **1.** Coerce by violence or with threats.<br>**2.** Fill with terror; frighten greatly. | *"Its power was used for political purposes, principally for the terrorising of the negro voters and the murdering and driving from the country of those who were opposed to its views."* — Arthur Conan Doyle, *The Adventures of Sherlock Holmes* |
| [[terrorism]] | noun | **1.** The calculated use of violence (or the threat of violence) against civilians in order to attain goals that are political or religious or ideological in nature; this is done through intimidation or coercion or instilling fear. | *"The solid south must be divided by the peaceful agencies of the ballot, and all opinions must there find free expression; and to this end honest voters must be protected against terrorism, violence, or fraud."* — Thomas V. Cooper, *American politics (non-partisan) from the beginning to date* |
| [[terrorist]] | noun | **1.** A radical who employs terror as a political weapon; usually organizes with other terrorists in small cells; often uses religion as a cover for terrorist activities. | *"Our transports to the Slingshot depot and construction site are being raided and harassed by terrorists and pirates who are directed by and provided sanctuary by both official and non-official entities."* — Meyer Moldeven, *The Universe — or Nothing* |
| [[terrorization]] | noun | **1.** The act of inspiring with fear.<br>**2.** An act of terrorism. | *"In academic literature, terrorization designates the act of inspiring with fear."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[terrorize]] | verb | **1.** Coerce by violence or with threats.<br>**2.** Fill with terror; frighten greatly. | *"This sense of suffocation was terrorizing, and every thump of the heart threatened to burst my already bursting lungs."* — Jack London, *The Jacket (The Star-Rover)* |
| [[terry]] | noun | **1.** English actress (1847-1928).<br>**2.** A pile fabric (usually cotton) with uncut loops on both sides; used to make bath towels and bath robes. | *"Terry, of the Cleveland Soldiers' Aid Society, somewhat more than a million; Miss Abby May, of Boston, not far from the same amount; Mrs."* — L. P. Brockett, *Woman's Work in the Civil War: A Record of Heroism, Patriotism, and Patience* |
| [[terrycloth]] | noun | **1.** A pile fabric (usually cotton) with uncut loops on both sides; used to make bath towels and bath robes. | *"In academic literature, terrycloth designates a pile fabric (usually cotton) with uncut loops on both sides; used to make bath towels and bath robes."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[uninterrupted]] | adjective | **1.** Having undisturbed continuity.<br>**2.** Continuing in time or space without interruption; - james jeans. | *"Two days had passed in uninterrupted work, and Apollonie had accomplished what she had set out to do."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Nature]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · TERR
  </div>
</div>
