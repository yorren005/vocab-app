---
status: unread
type: root_dashboard
---
# Dashboard — phot
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">phot-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“light”</span>
  </div>
  <div class="cm-footer">
    <span>💡 <b>Cognitive Anchor:</b> A beam of bright morning sunlight cutting through shadows to illuminate a room.</span>
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

The root **phot** means light. It refers to radiant illumination that makes things visible. In English, this root forms words such as *photon*, *photonic*, *photonics*, and *photograph*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: light
> The root **phot** means light. It refers to radiant illumination that makes things visible. In English, this root forms words such as *photon*, *photonic*, *photonics*, and *photograph*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Light</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A beam of bright morning sunlight cutting through shadows to illuminate a room.</mark>
> - **Everyday Connection**: Think of familiar words like *photon* and *photonic*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **phot** comes from a Latin word that means *"light"*.
  - At its core, it describes light.

- **The Big Picture Idea**:
  - Picture a beam of bright morning sunlight cutting through shadows to illuminate a room.
  - Whenever you see **phot** in an English word, think of **light, shining brightness, and illumination**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of light.
  - **Mental & Social**: How people experience, organize, or communicate about light.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Photon**: A quantum of electromagnetic radiation, having zero rest mass and carrying energy proportional to its frequency.
  - **Photonic**: Pertaining to photons or the technology of photonics.
  - **Photonics**: The branch of science and engineering dealing with the generation, emission, transmission, modulation, and detection of light photons.
  - **Photograph**: An image recorded by an optical camera on light-sensitive chemical film or a digital sensor array.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">phot</mark>, think of <mark class="hl-def">light, shining brightness, and illumination</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **phot** functions almost exclusively as a high-precision Neo-Hellenic combining form (`phot-` before vowels, `photo-` before consonants), pairing with other classical morphemes:
>
> - **`photo-` + Graphical / Inscription Stems:**
>   - `photo-` + `-graph` (drawing, writing) $\to$ *photograph*, *photographer*, *photography*, *photographic*
>   - `photo-` + `-copy` (reproduction) $\to$ *photocopy*
>   - `photo-` + `litho-` + `-graphy` (stone writing) $\to$ *photolithography*
> - **`photo-` + Physical / Electrical Stems:**
>   - `phot-` + `-on` (elementary particle suffix) $\to$ *photon*, *photonic*, *photonics*
>   - `photo-` + `electric` $\to$ *photoelectric*
>   - `photo-` + `voltaic` (after Alessandro Volta) $\to$ *photovoltaic*
>   - `photo-` + `diode` $\to$ *photodiode*
>   - `photo-` + `luminescence` $\to$ *photoluminescence*
> - **`photo-` + Biological & Physiological Stems:**
>   - `photo-` + `synthesis` (putting together) $\to$ *photosynthesis*, *photosynthetic*
>   - `photo-` + `tropism` (turning) $\to$ *phototropism*, *phototropic*
>   - `photo-` + `phobia` (dread, avoidance) $\to$ *photophobia*, *photophobic*
>   - `photo-` + `periodism` (cyclical intervals) $\to$ *photoperiodism*
>   - `photo-` + `-genic` (producing / produced by) $\to$ *photogenic*
> - **`photo-` + Metrology Stems:**
>   - `photo-` + `-meter` (measure) $\to$ *photometer*, *photometry*, *photometric*
> - **Specialized Compound Conduits:**
>   - `tele-` + `photography` $\to$ *telephotography*
>   - `astro-` + `photography` $\to$ *astrophotography*
>   - `bio-` + `photonics` $\to$ *biophotonics*
>   - `photo-` + `journalism` $\to$ *photojournalism*

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
> The root spans six massive technical and cultural arenas:
>
> 1. **Quantum Physics & Electrodynamics:**
>    - Massless gauge bosons mediating the electromagnetic force (*photon*, *single-photon emitter*).
>    - Fiber-optic lasers and wave manipulation (*photonics*).
> 2. **Clean Energy & Semiconductor Microfabrication:**
>    - Solar cells converting sunlight directly into DC electricity (*photovoltaic array*).
>    - Deep-ultraviolet laser etching of billions of nanometer-scale transistors onto silicon wafers (*photolithography*).
> 3. **Plant Biology & Ecology:**
>    - Chloroplasts splitting water to fix carbon dioxide into sugars (*photosynthesis*).
>    - Plant shoots bending toward sunlight (*positive phototropism*).
>    - Seasonal blooming triggered by day-length (*photoperiodism*).
> 4. **Visual Arts, Mass Media & Culture:**
>    - Fine-art, documentary, and portrait printmaking (*photography*, *photographer*).
>    - Eyewitness investigative news reporting through images (*photojournalism*).
>    - An innate physical charm or bone structure that renders a subject attractive under camera lights (*photogenic*).
> 5. **Ophthalmology & Clinical Neurology:**
>    - Acute sensory discomfort or ocular pain provoked by light, typical of corneal abrasion, uveitis, or migraines (*photophobia*).
> 6. **Astronomical & Optical Metrology:**
>    - Quantitative measurement of star flux, apparent magnitudes, and luminous intensity (*photometry*, *photometer*).

---

## 🔀 4. Prefix & Combining Dynamics on phot

### Prefix & First-Element Dynamics
- **`tele-` ("distant"):** Capturing images across vast physical distances $\to$ *telephotography*.
- **`astro-` ("celestial star"):** Imaging deep-space galaxies and nebulae $\to$ *astrophotography*.
- **`bio-` ("living"):** Integrating optical physics with cellular biology $\to$ *biophotonics*.

### Suffix Dynamics
- **`-on` (Subatomic / Physical Entity Suffix):** Elementary quantum particle $\to$ *photon*.
- **`-ics` (Systematic Science / Technology):** Branch of engineering utilizing light particles $\to$ *photonics*, *biophotonics*.
- **`-graphy` (Art of Inscription / Recording):** *photography*, *photolithography*, *telephotography*, *astrophotography*.
- **`-meter` / `-metry` (Measurement Tool & Discipline):** *photometer*, *photometry*.
- **`-trope` / `-tropism` (Directional Movement):** Involuntary plant curvature toward illumination $\to$ *phototropism*, *phototropic*.
- **`-phobia` (Sensory Intolerance):** Extreme sensitivity to ambient light $\to$ *photophobia*.
- **`-voltaic` (Electromotive Force):** Direct voltage generated by radiation $\to$ *photovoltaic*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Semiconductor Manufacturing (EUV Lithography):** Modern microchips (e.g., TSMC, Intel 3nm and 2nm nodes) rely on *extreme ultraviolet photolithography*, using 13.5 nm photons to print billions of microscopic gate circuits.
> - **Renewable Energy Infrastructure:** Global decarbonization hinges on *photovoltaic (PV)* silicon panels converting solar irradiance into gigawatts of clean electrical power.
> - **Astrophysics & Exoplanet Discovery:** The Kepler and James Webb Space Telescopes utilize high-precision transit *photometry* to measure miniscule dips in stellar flux caused by orbiting exoplanets.
> - **Clinical Neurology & Ophthalmology:** Emergency physicians evaluate *photophobia* alongside neck stiffness to rule out acute bacterial meningitis or subarachnoid hemorrhage.
> - **Global Photojournalism & History:** Iconic *photojournalism* images (e.g., Nick Ut's "Napalm Girl", the Apollo 8 "Earthrise") have reshaped global geopolitics, anti-war movements, and human consciousness.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[nonphotosynthetic]] | adjective | **1.** Not photosynthetic. | *"In academic literature, nonphotosynthetic designates not photosynthetic."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phot]] | noun | **1.** A unit of illumination equal to 1 lumen per square centimeter; 10,000 phots equal 1 lux. | *"In academic literature, phot designates a unit of illumination equal to 1 lumen per square centimeter; 10,000 phots equal 1 lux."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photalgia]] | noun | **1.** Pain in the eye resulting from exposure to bright light (often associated with albinism). | *"In academic literature, photalgia designates pain in the eye resulting from exposure to bright light (often associated with albinism)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photic]] | adjective | **1.** Of or relating to or caused by light. | *"In academic literature, photic designates of or relating to or caused by light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photinia]] | noun | **1.** Genus of deciduous and evergreen east asian trees and shrubs widely cultivated as ornamentals for their white flowers and red fruits; in some classifications includes genus heteromeles. | *"In academic literature, photinia designates genus of deciduous and evergreen east asian trees and shrubs widely cultivated as ornamentals for their white flowers and red fruits; in some classifications includes genus heteromeles."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photius]] | noun | **1.** Patriarch of constantinople and saint of the greek orthodox church; was condemned by the fourth council of constantinople in 869 but was reinstated by a later pope. | *"He behaved admirably at the beginning of his reign and during 1812, but acted badly by giving a constitution to Poland, forming the Holy Alliance, entrusting power to Arakchéev, favoring Golítsyn and mysticism, and afterwards Shishkóv and Photius."* — graf Leo Tolstoy, *War and Peace* |
| [[photo]] | noun | **1.** A representation of a person or scene in the form of a print or transparent slide; recorded by a camera on light-sensitive material. | *"In my responses I told about the time and circumstances that I had taped a commentary to our family's photo and document album, and how I went about it."* — Meyer Moldeven, *A Grandpa's Notebook* |
| [[photo-offset]] | noun | **1.** A method of offset printing using photomechanical plates. | *"In academic literature, photo-offset designates a method of offset printing using photomechanical plates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoblepharon]] | noun | **1.** A genus of fish in the family anomalopidae. | *"In academic literature, photoblepharon designates a genus of fish in the family anomalopidae."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photocathode]] | noun | **1.** A cathode that emits electrons when illuminated. | *"In academic literature, photocathode designates a cathode that emits electrons when illuminated."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photocell]] | noun | **1.** A transducer used to detect and measure light and other radiations. | *"In academic literature, photocell designates a transducer used to detect and measure light and other radiations."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photochemical]] | adjective | **1.** Of or relating to or produced by the effects of light on chemical systems. | *"In academic literature, photochemical designates of or relating to or produced by the effects of light on chemical systems."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photochemistry]] | noun | **1.** Branch of chemistry that deals with the chemical action of light. | *"In academic literature, photochemistry designates branch of chemistry that deals with the chemical action of light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photocoagulation]] | noun | **1.** Surgical procedure that uses an intense laser beam to destroy diseased retinal tissue or to make a scar that will hold the retina in cases of detached retina. | *"In academic literature, photocoagulation designates surgical procedure that uses an intense laser beam to destroy diseased retinal tissue or to make a scar that will hold the retina in cases of detached retina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photocoagulator]] | noun | **1.** Surgical instrument containing a laser for use in photocoagulation. | *"In academic literature, photocoagulator designates surgical instrument containing a laser for use in photocoagulation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoconduction]] | noun | **1.** Change in the electrical conductivity of a substance as a result of absorbing electromagnetic radiation. | *"In academic literature, photoconduction designates change in the electrical conductivity of a substance as a result of absorbing electromagnetic radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoconductive]] | adjective | **1.** Of or relating to photoconductivity. | *"In academic literature, photoconductive designates of or relating to photoconductivity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoconductivity]] | noun | **1.** Change in the electrical conductivity of a substance as a result of absorbing electromagnetic radiation. | *"In academic literature, photoconductivity designates change in the electrical conductivity of a substance as a result of absorbing electromagnetic radiation."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photocopier]] | noun | **1.** A copier that uses photographic methods of making copies. | *"In academic literature, photocopier designates a copier that uses photographic methods of making copies."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photocopy]] | noun | **1.** A photographic copy of written or printed or graphic work.<br>**2.** Reproduce by xerography. | *"In academic literature, photocopy designates a photographic copy of written or printed or graphic work."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoelectric]] | adjective | **1.** Of or pertaining to photoelectricity. | *"In academic literature, photoelectric designates of or pertaining to photoelectricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoelectrical]] | adjective | **1.** Of or pertaining to photoelectricity. | *"In academic literature, photoelectrical designates of or pertaining to photoelectricity."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoelectrically]] | adverb | **1.** By photoelectric means. | *"In academic literature, photoelectrically designates by photoelectric means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoelectricity]] | noun | **1.** Electricity generated by light or affected by light. | *"In academic literature, photoelectricity designates electricity generated by light or affected by light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoelectron]] | noun | **1.** An electron that is emitted from an atom or molecule by an incident photon. | *"In academic literature, photoelectron designates an electron that is emitted from an atom or molecule by an incident photon."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoemission]] | noun | **1.** An emission of photoelectrons (especially from a metallic surface). | *"In academic literature, photoemission designates an emission of photoelectrons (especially from a metallic surface)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoemissive]] | adjective | **1.** Of or relating to photoemission. | *"In academic literature, photoemissive designates of or relating to photoemission."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoengraving]] | noun | **1.** An engraving used to reproduce an illustration. | *"In academic literature, photoengraving designates an engraving used to reproduce an illustration."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoflash]] | noun | **1.** A lamp for providing momentary light to take a photograph. | *"In academic literature, photoflash designates a lamp for providing momentary light to take a photograph."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoflood]] | noun | **1.** Light that is a source of artificial illumination having a broad beam; used in photography. | *"In academic literature, photoflood designates light that is a source of artificial illumination having a broad beam; used in photography."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photogenic]] | adjective | **1.** Looking attractive in photographs. | *"In academic literature, photogenic designates looking attractive in photographs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photograph]] | noun | **1.** A representation of a person or scene in the form of a print or transparent slide; recorded by a camera on light-sensitive material.<br>**2.** Record on photographic film. | *"It had seemed of a sudden most familiar, in much the same way that my father’s barn would have been in a photograph."* — Jack London, *The Jacket (The Star-Rover)* |
| [[photographer]] | noun | **1.** Someone who takes photographs professionally. | *"P---- who is a good amateur photographer, photographed him in company with his little daughter in the act of handing him a banana."* — W. D. Pitcairn, *Two Years Among the Savages of New Guinea.* |
| [[photographic]] | adjective | **1.** Relating to photography or obtained by using photography.<br>**2.** Representing people or nature with the exactness and fidelity of a photograph. | *"He had an excellent memory, photographic and phonographic, a gift that wise men covet for themselves but deprecate in their friends."* — Anthony Pryde, *Nightfall* |
| [[photographically]] | adverb | **1.** By photographic means. | *"The picture is placed, either by hand or photographically, upon a sheet of copper foil, which is fixed round the rotating cylinder, the lines being formed of non-conducting material."* — Thomas W. Corbin, *Marvels of Scientific Invention* |
| [[photography]] | noun | **1.** The act of taking and printing photographs.<br>**2.** The process of producing images of objects on photosensitive surfaces. | *"The several uses of gold are constantly competing for it: its uses for rings, pens, ornaments, championship cups, photography, dentistry, delicate instruments, and as a circulating medium."* — Frank A. Fetter, *Economics Volume II: Modern Economic Problems* |
| [[photogravure]] | noun | **1.** Printing from an intaglio plate prepared by photographic methods.<br>**2.** An intaglio print produced by gravure. | *"In academic literature, photogravure designates printing from an intaglio plate prepared by photographic methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photojournalism]] | noun | **1.** Journalism that presents a story primarily through the use of pictures. | *"In academic literature, photojournalism designates journalism that presents a story primarily through the use of pictures."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photojournalist]] | noun | **1.** A journalist who presents a story primarily through the use of photographs. | *"In academic literature, photojournalist designates a journalist who presents a story primarily through the use of photographs."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photolithograph]] | noun | **1.** A lithograph produced by photographically produced plates. | *"In academic literature, photolithograph designates a lithograph produced by photographically produced plates."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photolithography]] | noun | **1.** A planographic printing process using plates made from a photographic image. | *"In academic literature, photolithography designates a planographic printing process using plates made from a photographic image."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photomechanical]] | adjective | **1.** Of or relating to or involving various methods of using photography to make plates for printing. | *"In academic literature, photomechanical designates of or relating to or involving various methods of using photography to make plates for printing."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photomechanics]] | noun | **1.** The process whereby printing surfaces (plates or cylinders) are produced by photographic methods.<br>**2.** The technique of using photomechanical methods to make photographs into plates for printing. | *"In academic literature, photomechanics designates the process whereby printing surfaces (plates or cylinders) are produced by photographic methods."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometer]] | noun | **1.** Measuring instrument for measuring the luminous intensity of a source by comparing it (visually or photoelectrically) with a standard source.<br>**2.** Photographic equipment that measures the intensity of light. | *"In academic literature, photometer designates measuring instrument for measuring the luminous intensity of a source by comparing it (visually or photoelectrically) with a standard source."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometric]] | adjective | **1.** Of or relating to photometry. | *"In academic literature, photometric designates of or relating to photometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometrical]] | adjective | **1.** Of or relating to photometry. | *"In academic literature, photometrical designates of or relating to photometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometrically]] | adverb | **1.** By photometric means. | *"In academic literature, photometrically designates by photometric means."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometrician]] | noun | **1.** Someone who practices photometry. | *"In academic literature, photometrician designates someone who practices photometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometrist]] | noun | **1.** Someone who practices photometry. | *"In academic literature, photometrist designates someone who practices photometry."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photometry]] | noun | **1.** Measurement of the properties of light (especially luminous intensity). | *"In academic literature, photometry designates measurement of the properties of light (especially luminous intensity)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photomicrograph]] | noun | **1.** A photograph taken with the help of a microscope. | *"In academic literature, photomicrograph designates a photograph taken with the help of a microscope."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photomontage]] | noun | **1.** A montage that uses photographic images. | *"In academic literature, photomontage designates a montage that uses photographic images."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photomosaic]] | noun | **1.** Arrangement of aerial photographs forming a composite picture. | *"In academic literature, photomosaic designates arrangement of aerial photographs forming a composite picture."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photon]] | noun | **1.** A quantum of electromagnetic radiation; an elementary particle that is its own antiparticle. | *"In academic literature, photon designates a quantum of electromagnetic radiation; an elementary particle that is its own antiparticle."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photophobia]] | noun | **1.** A morbid fear of light.<br>**2.** Pain in the eye resulting from exposure to bright light (often associated with albinism). | *"In academic literature, photophobia designates a morbid fear of light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photopigment]] | noun | **1.** A special pigment found in the rods and cones of the retina. | *"In academic literature, photopigment designates a special pigment found in the rods and cones of the retina."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photoretinitis]] | noun | **1.** Damage to the retina resulting from exposure of the eye to the sun without adequate protection. | *"In academic literature, photoretinitis designates damage to the retina resulting from exposure of the eye to the sun without adequate protection."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photosensitise]] | verb | **1.** Make (an organism or substance) sensitive to the influence of radiant energy and especially light. | *"In academic literature, photosensitise designates make (an organism or substance) sensitive to the influence of radiant energy and especially light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photosensitive]] | adjective | **1.** Sensitive to visible light. | *"In academic literature, photosensitive designates sensitive to visible light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photosensitivity]] | noun | **1.** Sensitivity to the action of radiant energy. | *"In academic literature, photosensitivity designates sensitivity to the action of radiant energy."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photosensitize]] | verb | **1.** Make (an organism or substance) sensitive to the influence of radiant energy and especially light. | *"In academic literature, photosensitize designates make (an organism or substance) sensitive to the influence of radiant energy and especially light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photosphere]] | noun | **1.** The intensely luminous surface of a star (especially the sun). | *"Her hopes mingled with the sunshine in an ideal photosphere which surrounded her as she bounded along against the soft south wind."* — Thomas Hardy, *Tess of the d'Urbervilles: A Pure Woman* |
| [[photostat]] | noun | **1.** A photocopy made on a photostat machine.<br>**2.** A duplicating machine that makes quick positive or negative copies directly on the surface of prepared paper. | *"In academic literature, photostat designates a photocopy made on a photostat machine."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photosynthesis]] | noun | **1.** Synthesis of compounds with the aid of radiant energy (especially in plants). | *"In academic literature, photosynthesis designates synthesis of compounds with the aid of radiant energy (especially in plants)."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photosynthetic]] | adjective | **1.** Relating to or using or formed by photosynthesis. | *"In academic literature, photosynthetic designates relating to or using or formed by photosynthesis."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phototherapy]] | noun | **1.** The use of strong light to treat acne or hyperbilirubinemia of the newborn. | *"In academic literature, phototherapy designates the use of strong light to treat acne or hyperbilirubinemia of the newborn."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[phototropism]] | noun | **1.** An orienting response to light. | *"In academic literature, phototropism designates an orienting response to light."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[photovoltaic]] | adjective | **1.** Producing a voltage when exposed to radiant energy (especially light). | *"In academic literature, photovoltaic designates producing a voltage when exposed to radiant energy (especially light)."* — Academic Lexicon, *Morphological & Etymological Survey* |

---

<div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid var(--background-modifier-border);">
  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85em; margin-bottom: 12px;">
    <span>↑ [[Cluster Light]]</span>
    <span>[[Latin Learning Progress|Latin Progress Hub]] →</span>
  </div>
  <div style="text-align: center; font-size: 0.8em; color: var(--text-muted); font-style: italic; margin-bottom: 4px;">
    To command the root is to illuminate all its branches.
  </div>
  <div style="text-align: center; font-size: 0.72em; color: var(--text-faint); letter-spacing: 0.5px;">
    ROOT DASHBOARD · PHOT
  </div>
</div>
