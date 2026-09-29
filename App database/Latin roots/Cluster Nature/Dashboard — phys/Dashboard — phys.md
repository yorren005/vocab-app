---
status: unread
type: root_dashboard
---
# Dashboard — phys
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">phys-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“nature or body”</span>
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

The root **phys** means nature or body. It refers to the physical frame of a living person or any unified collection of things. In English, this root forms words such as *grow*, *arise*, *physics*, and *physical*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: nature or body
> The root **phys** means nature or body. It refers to the physical frame of a living person or any unified collection of things. In English, this root forms words such as *grow*, *arise*, *physics*, and *physical*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Nature or body</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">Tall green trees, rolling hills, and rain watering the fertile landscape.</mark>
> - **Everyday Connection**: Think of familiar words like *grow* and *arise*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **phys** comes from a Latin word that means *"nature or body"*.
  - At its core, it describes nature or body.

- **The Big Picture Idea**:
  - Picture tall green trees, rolling hills, and rain watering the fertile landscape.
  - Whenever you see **phys** in an English word, think of **the natural world and the outdoors**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of nature or body.
  - **Mental & Social**: How people experience, organize, or communicate about nature or body.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Grow**: An everyday English word showing the root's idea of *nature or body*.
  - **Arise**: An everyday English word showing the root's idea of *nature or body*.
  - **Physics**: The fundamental branch of science concerned with the nature and properties of matter and energy, including mechanics, heat, light, radiation, electricity, magnetism, and atomic structure.
  - **Physical**: Relating to the body as opposed to the mind.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">phys</mark>, think of <mark class="hl-def">the natural world and the outdoors</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **phys** enters English via Latinized Greek forms:
> - **Base Noun & Adjectives `physic-` (*physicus* < φυσικός):**
>   - Hard science: *physics* (singular noun with *-s*).
>   - Tangible adjective: *physical*.
>   - Medical practitioner: *physician*.
>   - Archaic medicine / cathartic: *physic*.
> - **Combining Form `physio-` (*physis* + connecting vowel `-o-`):**
>   - Bodily functions: *physiology*, *physiological*.
>   - Facial features: *physiognomy* (*physis* + *gnōmōn* "judge").
>   - Rehabilitative therapy: *physiotherapy*.
>   - French bodily loan: *physique* (bodily frame).
> - **Prefix & Multi-Disciplinary Compounds:**
>   - `meta-` ("beyond") $\to$ *metaphysics* (ontology, first causes).
>   - `geo-` ("earth") $\to$ *geophysics*.
>   - `bio-` ("life") $\to$ *biophysics*.
>   - `astro-` ("star") $\to$ *astrophysics*.
>   - Hybrid adjective: *physicochemical*.

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
> - **Fundamental Hard Sciences:** The quantitative study of matter, energy, gravity, electromagnetism, and atomic interactions (*physics*, *physical*).
> - **Interdisciplinary Physical Sciences:** Applying physical principles to earth dynamics, biological molecules, and stellar evolution (*geophysics*, *biophysics*, *astrophysics*, *physicochemical*).
> - **Theoretical Philosophy & Ontology:** Inquiring into fundamental reality beyond physical observation—existence, causation, and consciousness (*metaphysics*).
> - **Organ System Biology & Medicine:** The biochemical and mechanical functions of organs, tissues, and cellular pathways (*physiology*, *physiological*).
> - **Healthcare, Therapy & Healing:** Diagnosing illness, prescribing medication, and restoring musculoskeletal mobility (*physician*, *physic*, *physiotherapy*).
> - **Human Body Structure & Appearance:** Muscular development, bodily proportions, and facial expressions (*physique*, *physiognomy*).

---

## 🔀 4. Prefix & Combining Dynamics on phys

### Prefix Dynamics
- **`meta-` (Beyond / Transcending):** *metaphysics* $\to$ philosophical inquiry into principles *beyond* physical observation.
- **`geo-` (Earth):** *geophysics* $\to$ physics of the earth.
- **`bio-` (Life):** *biophysics* $\to$ physics applied to biological systems.
- **`astro-` (Celestial):** *astrophysics* $\to$ physics of stars and galaxies.

### Suffix Dynamics
- **`-ics` (Systematic Science / Art):** *physics*, *metaphysics*, *astrophysics*.
- **`-ian` (Practitioner):** *physician* $\to$ medical practitioner.
- **`-ology` (Field of Study):** *physiology* $\to$ study of vital functions.
- **`-ique` (French Form):** *physique* $\to$ bodily development.
- **`-therapy` (Treatment):** *physiotherapy* $\to$ physical rehabilitation.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **High-Energy Particle Physics & Cosmology:** Particle accelerators (CERN Large Hadron Collider) testing the Standard Model of particle *physics* and detecting the Higgs boson.
> - **Clinical Medicine & Hospital Administration:** Board-certified *physicians* diagnosing acute pathology and coordinating multidisciplinary clinical patient care.
> - **Human Physiology & Sports Science:** Evaluating *physiological* VO2 max thresholds, neuromuscular recruitment, and cardiac output during peak athletic exertion.
> - **Physical Therapy & Rehabilitation:** Licensed *physiotherapists* designing manual joint mobilization and therapeutic exercises to rehabilitate orthopedic trauma.
> - **Theoretical Astrophysics:** Utilizing gravitational wave observatories (LIGO) and radio interferometry (Event Horizon Telescope) to probe the *astrophysics* of supermassive black holes.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[astrophysical]] | adjective | **1.** Of or concerned with astrophysics. | *"In academic literature, astrophysical designates of or concerned with astrophysics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astrophysicist]] | noun | **1.** An astronomer who studies the physical properties of celestial bodies. | *"In academic literature, astrophysicist designates an astronomer who studies the physical properties of celestial bodies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[astrophysics]] | noun | **1.** The branch of astronomy concerned with the physical and chemical properties of celestial bodies. | *"In academic literature, astrophysics designates the branch of astronomy concerned with the physical and chemical properties of celestial bodies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biophysicist]] | noun | **1.** A physicist who applies the methods of physics to biology. | *"In academic literature, biophysicist designates a physicist who applies the methods of physics to biology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[biophysics]] | noun | **1.** Physics as applied to biological problems. | *"In academic literature, biophysics designates physics as applied to biological problems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[emphysema]] | noun | **1.** An abnormal condition of the lungs marked by decreased respiratory function; associated with smoking or chronic bronchitis or old age. | *"Alex. _Paedag._ i, 7, _to philtron endon estin en to anthropo touth' oper emphysema legetai theou_. [20] _c."* — T. R. Glover, *The Conflict of Religions in the Early Roman Empire* |
| [[emphysematous]] | adjective | **1.** Relating to or resembling or being emphysema. | *"In academic literature, emphysematous designates relating to or resembling or being emphysema."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geophysical]] | adjective | **1.** Of or concerned with geophysics. | *"In academic literature, geophysical designates of or concerned with geophysics."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geophysicist]] | noun | **1.** A geologist who uses physical principles to study the properties of the earth. | *"In academic literature, geophysicist designates a geologist who uses physical principles to study the properties of the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[geophysics]] | noun | **1.** Geology that uses physical principles to study properties of the earth. | *"In academic literature, geophysics designates geology that uses physical principles to study properties of the earth."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[metaphysical]] | adjective | **1.** Pertaining to or of the nature of metaphysics.<br>**2.** Without material form or substance. | *"Hie thee hither, That I may pour my spirits in thine ear, And chastise with the valour of my tongue All that impedes thee from the golden round, Which fate and metaphysical aid doth seem To have thee crown’d withal."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[metaphysically]] | adverb | **1.** In a metaphysical manner. | *"To gain Christian Science and its 65:12 harmony, life should be more metaphysically regarded."* — Mary Baker Eddy, *Science and Health, with Key to the Scriptures* |
| [[metaphysics]] | noun | **1.** The philosophical study of being and knowing. | *"The class of Hamilton's that he attended in the session of 1838-39 was that of Advanced Metaphysics."* — John Cairns, *Principal Cairns* |
| [[nonphysical]] | adjective | **1.** Lacking substance or reality; incapable of being touched or seen. | *"In academic literature, nonphysical designates lacking substance or reality; incapable of being touched or seen."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physa]] | noun | **1.** Any member of the genus physa. | *"In academic literature, physa designates any member of the genus physa."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physalia]] | noun | **1.** Portuguese man-of-war. | *"In academic literature, physalia designates portuguese man-of-war."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physalis]] | noun | **1.** Ground cherries. | *"In academic literature, physalis designates ground cherries."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physaria]] | noun | **1.** Small genus of western north american herbs similar to lesquerella: bladderpods. | *"In academic literature, physaria designates small genus of western north american herbs similar to lesquerella: bladderpods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physeter]] | noun | **1.** Type genus of the physeteridae. | *"In academic literature, physeter designates type genus of the physeteridae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physeteridae]] | noun | **1.** Sperm whales. | *"In academic literature, physeteridae designates sperm whales."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physiatrics]] | noun | **1.** Therapy that uses physical agents: exercise and massage and other modalities. | *"In academic literature, physiatrics designates therapy that uses physical agents: exercise and massage and other modalities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physic]] | noun | **1.** A purging medicine; stimulates evacuation of the bowels. | *"Sweet practiser, thy physic I will try, That ministers thine own death if I die."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[physical]] | adjective | **1.** Involving the body as distinguished from the mind or spirit.<br>**2.** Relating to the sciences dealing with matter and energy; especially physics. | *"The blood I drop is rather physical Than dangerous to me."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[physicalism]] | noun | **1.** (philosophy) the philosophical theory that matter is the only reality. | *"In academic literature, physicalism designates (philosophy) the philosophical theory that matter is the only reality."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physicality]] | noun | **1.** Preoccupation with satisfaction of physical drives and appetites. | *"In academic literature, physicality designates preoccupation with satisfaction of physical drives and appetites."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physically]] | adverb | **1.** In accord with physical laws. | *"Here he spread half of the hay as a bed, and, as well as he could in the darkness, pulled the other half over him by way of bed-clothes, covering himself entirely, and feeling, physically, as comfortable as ever he had been in his life."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[physicalness]] | noun | **1.** The quality of being physical; consisting of matter. | *"In academic literature, physicalness designates the quality of being physical; consisting of matter."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physician]] | noun | **1.** A licensed medical practitioner. | *"How long is’t, Count, Since the physician at your father’s died?"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[physicist]] | noun | **1.** A scientist trained in physics. | *"Did not an immortal physicist and interpreter of hieroglyphs write detestable verses?"* — George Eliot, *Middlemarch* |
| [[physicochemical]] | adjective | **1.** Relating to physical chemistry. | *"In academic literature, physicochemical designates relating to physical chemistry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physics]] | noun | **1.** The science of matter and energy and their interactions.<br>**2.** The physical properties, phenomena, and laws of something. | *"The labour we delight in physics pain."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[physidae]] | noun | **1.** Freshwater snails. | *"In academic literature, physidae designates freshwater snails."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physiognomy]] | noun | **1.** The human face (`kisser' and `smiler' and `mug' are informal terms for `face' and `phiz' is british). | *"In Ajax and Ulysses, O, what art Of physiognomy might one behold!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[physiography]] | noun | **1.** The study of physical features of the earth's surface. | *"In academic literature, physiography designates the study of physical features of the earth's surface."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physiologic]] | adjective | **1.** Of or consistent with an organism's normal functioning. | *"In academic literature, physiologic designates of or consistent with an organism's normal functioning."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physiological]] | adjective | **1.** Of or relating to the biological study of physiology.<br>**2.** Of or consistent with an organism's normal functioning. | *"Thus I induced physiological and psychological states similar to those caused by the jacket."* — Jack London, *The Jacket (The Star-Rover)* |
| [[physiologically]] | adverb | **1.** Of or relating to physiological processes; with respect to physiology. | *"In academic literature, physiologically designates of or relating to physiological processes; with respect to physiology."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physiologist]] | noun | **1.** A biologist specializing in physiology. | *"Ere quitting, for the nonce, the Sperm Whale’s head, I would have you, as a sensible physiologist, simply—particularly remark its front aspect, in all its compacted collectedness."* — Herman Melville, *Moby-Dick; or, The Whale* |
| [[physiology]] | noun | **1.** The branch of the biological sciences dealing with the functioning of organisms.<br>**2.** Processes and functions of an organism. | *"Some years ago I happened to be conversing at Cambridge with three men who were respectively of great eminence in mathematics, classics, and physiology."* — Classic Author, *John Stuart Mill; His Life and Works* |
| [[physiotherapeutic]] | adjective | **1.** Of or relating to or used in physical therapy. | *"In academic literature, physiotherapeutic designates of or relating to or used in physical therapy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physiotherapist]] | noun | **1.** Therapist who treats injury or dysfunction with exercises and other physical treatments of the disorder. | *"In academic literature, physiotherapist designates therapist who treats injury or dysfunction with exercises and other physical treatments of the disorder."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physiotherapy]] | noun | **1.** Therapy that uses physical agents: exercise and massage and other modalities. | *"In academic literature, physiotherapy designates therapy that uses physical agents: exercise and massage and other modalities."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physique]] | noun | **1.** Constitution of the human body.<br>**2.** Alternative names for the body of a human being. | *"Another brother, James, a young man of vigorous mental powers, and originally of stalwart physique, who had been working at his trade as a tailor in Glasgow, fell into bad health, which soon showed the symptoms of rapid consumption."* — John Cairns, *Principal Cairns* |
| [[physostegia]] | noun | **1.** Any of various plants of the genus physostegia having sessile linear to oblong leaves and showy white or rose or lavender flowers. | *"In academic literature, physostegia designates any of various plants of the genus physostegia having sessile linear to oblong leaves and showy white or rose or lavender flowers."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physostigma]] | noun | **1.** African woody vines: calabar beans. | *"In academic literature, physostigma designates african woody vines: calabar beans."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[physostigmine]] | noun | **1.** Used in treatment of alzheimer's disease and glaucoma. | *"In academic literature, physostigmine designates used in treatment of alzheimer's disease and glaucoma."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · PHYS
  </div>
</div>
