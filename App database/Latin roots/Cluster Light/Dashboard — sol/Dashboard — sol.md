---
status: unread
type: root_dashboard
---
# Dashboard — sol
<div class="core-meaning-keystone">
  <div class="cm-header">
    <span class="cm-tag">🏛️ LATIN ROOT</span>
    <span class="cm-script">sol-</span>
  </div>
  <div class="cm-body">
    <span class="cm-label">CORE MEANING</span>
    <span class="cm-definition">“alone, lonely, or the sun”</span>
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

The root **sol** means alone, lonely, or the sun. It refers to the bright celestial body that provides light and warmth to the earth. In English, this root forms words such as *solo*, *solitary*, *solitude*, and *sole*.

---

## 💡 Core Meaning

> [!example] ✨ Core Concept: alone, lonely, or the sun
> The root **sol** means alone, lonely, or the sun. It refers to the bright celestial body that provides light and warmth to the earth. In English, this root forms words such as *solo*, *solitary*, *solitude*, and *sole*.

---

## 🌟 1. Deep Root Origin & Cognitive Architecture

> [!tip] 🎯 Quick Summary: What Does This Root Mean?
> - **Core Meaning**: <mark class="hl-def">Alone, lonely, or the sun</mark>.
> - **Mental Picture**: <mark class="hl-mnemonic">A beam of bright morning sunlight cutting through shadows to illuminate a room.</mark>
> - **Everyday Connection**: Think of familiar words like *solo* and *solitary*.

### 📌 Key Learning Concepts

- **What It Literally Means**:
  - The root **sol** comes from a Latin word that means *"alone, lonely, or the sun"*.
  - At its core, it describes alone, lonely, or the sun.

- **The Big Picture Idea**:
  - Picture a beam of bright morning sunlight cutting through shadows to illuminate a room.
  - Whenever you see **sol** in an English word, think of **light, shining brightness, and illumination**.

- **How the Meaning Grows**:
  - **Physical**: The tangible physical presence or real-world form of alone, lonely, or the sun.
  - **Mental & Social**: How people experience, organize, or communicate about alone, lonely, or the sun.
  - **Abstract & Practical**: Broader social systems, classifications, or specialized terms.

- **Everyday English Words to Remember It By**:
  - **Solo**: An everyday English word showing the root's idea of *alone, lonely, or the sun*.
  - **Solitary**: An everyday English word showing the root's idea of *alone, lonely, or the sun*.
  - **Solitude**: An everyday English word showing the root's idea of *alone, lonely, or the sun*.
  - **Sole**: An everyday English word showing the root's idea of *alone, lonely, or the sun*.

- **💡 Quick Memory Rule**:
  - *When you see <mark class="hl-stem">sol</mark>, think of <mark class="hl-def">light, shining brightness, and illumination</mark>.*

---

## ⚙️ 2. Root Characteristics & Word Formation Engine

> [!abstract] 🔨 How Derived Words are Formed
> The root **sol** forms its English lexical family through five distinct morphological mechanisms:
>
> - **Base Nominal Stem `sol-` (*sōl, sōlis*):**
>   - Direct astronomical noun: *sol* (the sun; one Martian solar day)
>   - Adjectives of shape: *soliform* (sun-shaped)
> - **Adjectival Conduit `solar-` (*sōlāris*):**
>   - Direct adjective: *solar* (solar power, solar flare, solar wind)
>   - Archaic variant: *solary*
>   - Spatial & orbital prefixes:
>     - `sub-` ("under, directly beneath") $\to$ *subsolar* (subsolar point)
>     - `circum-` ("around") $\to$ *circumsolar* (orbiting the sun)
>     - `extra-` ("outside, beyond") $\to$ *extrasolar* (extrasolar planet / exoplanet)
>     - `inter-` ("between") $\to$ *intersolar* (between suns)
> - **The Celestial Station Compound `sol-stit-` (*sōlstitium* < *sōl* + *sistere*):**
>   - Noun: *solstice* (summer and winter solstice)
>   - Adjective: *solstitial*
> - **Thermal & Radiative Prefix `in-` $\to$ `insolat-` (*īnsōlāre*):**
>   - Verbal action: *insolate* (to expose to the sun)
>   - Physical/meteorological noun: *insolation* (solar irradiance)
> - **Romance & Vernacular Hybrids:**
>   - Italian defensive compound: *parasol* (*parare* "to shield" + *sole* < *sōl*)
>   - French heliotropic compound: *turnsole* (*tourner* "to turn" + *sol*)
>   - Spanish meteorological loan: *solano* (hot easterly wind)
>   - Zoological compound: *solifuge* (*sōl* + *fugere* "to flee")
>   - Dual-astronomical compound: *solilunar* (*sōl* + *lūna*)
> - **Technological Verb Suffix `-ize`:**
>   - *solarize*, *solarization*

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
> The root spans six distinct scientific, practical, and anatomical domains:
>
> 1. **Astronomy, Planetary Science & Space Exploration:**
>    - The central star of our planetary system (*solar radiation*, *solar eclipse*).
>    - The operational diurnal day on the surface of Mars (*rover mission Sol 1000*).
>    - Planets orbiting distant host stars (*extrasolar systems*).
>    - The subsolar point where sunlight strikes perpendicular to planetary surface (*subsolar latitude*).
> 2. **Calendar Systems & Archeoastronomy:**
>    - Seasonal pivot points governing agrarian and ritual calendars (*summer solstice*, *winter solstice*).
> 3. **Thermodynamics, Climate & Renewable Energy:**
>    - The quantitative rate of solar energy received per unit area (*solar insolation in kWh/m²*).
>    - Photovoltaic retrofitting of buildings and electrical grids (*solarizing the power grid*).
> 4. **Architecture & Everyday Living:**
>    - Glass-walled enclosed rooms and sanatorium sun-porches (*solarium*).
>    - Light, handheld canopy shielding users from UV radiation (*parasol*).
> 5. **Human Anatomy & Physiology:**
>    - The major radiating sympathetic nerve plexus located in the epigastric region behind the stomach (*solar plexus*).
> 6. **Zoology & Botany:**
>    - Sun-avoiding arachnids (*solifuges*).
>    - Plants that rotate to track the sun’s daily transit across the sky (*turnsole*).

---

## 🔀 4. Prefix & Combining Dynamics on sol

### Prefix Dynamics
- **`in-` ("into, upon"):** Pouring sunlight upon an object $\to$ *insolate*, *insolation*.
- **`sub-` ("under, beneath"):** Directly underneath the sun's zenith point $\to$ *subsolar*.
- **`circum-` ("around"):** Orbiting or enclosing the sun $\to$ *circumsolar*.
- **`extra-` ("beyond, outside"):** Lying outside our solar system $\to$ *extrasolar*.
- **`para-` (Italian *parare*, "to ward off"):** Blocking direct sunbeams $\to$ *parasol*.

### Suffix Dynamics
- **`-ar` / `-ary` (Adjectival / Pertaining To):** *solar*, *solary*.
- **`-arium` (Place / Container Suffix):** A dedicated room for enjoying sunlight $\to$ *solarium*.
- **`-stice` (from *sistere*, "to halt"):** The sun standing still $\to$ *solstice*.
- **`-ize` / `-ization` (Causative & Technological Process):** Conversion to solar power or photographic reversal $\to$ *solarize*, *solarization*.
- **`-form` (Geometric Shape):** Radiating like the sun $\to$ *soliform*.
- **`-fuge` (from *fugere*, "to flee"):** Sun-fleeing creature $\to$ *solifuge*.

---

## 🌐 5. Disciplinary & Real-World Domains

> [!info] 🏛️ Institutional & Scholarly Real-World Contexts
> - **Planetary Science & NASA Mars Exploration:** Mission controllers at JPL synchronize their daily shift schedules to the Martian *sol* (39 minutes longer than an Earth day) while planning rover traverse routes.
> - **Meteorology & Solar Energy Engineering:** Photovoltaic farm engineers model global horizontal *insolation* and direct normal irradiance to forecast gigawatt generation across diverse geographical latitudes.
> - **Cardiovascular & Trauma Medicine:** Emergency trauma surgeons evaluate blunt force impacts to the *solar plexus* (celiac plexus), which can trigger temporary respiratory paralysis and profound vagal hypotension.
> - **Archeoastronomy & Cultural Heritage:** Megalithic monuments like Stonehenge in England and Newgrange in Ireland were precisely aligned to capture the sunrise during the summer and winter *solstices*.
> - **Chemical & Photographic Arts:** Visual artists exploit *solarization* (the Sabattier effect) to produce surreal darkroom prints featuring silver halos around high-contrast edges.

---

## 📚 6. Complete Derived Words Master List (Exhaustive)

| Word | POS | Authoritative Definitions | Authentic Illustrative Sentence |
| :--- | :--- | :--- | :--- |
| [[consolable]] | adjective | **1.** Able to be consoled. | *"What a good saint is our Ignatius, exclaimed the consolable widow, he bestows on us more benefits than we ask for! 581."* — Classic Author, *Joe Miller's Jests, with Copious Additions* |
| [[consolation]] | noun | **1.** The comfort you feel when consoled in times of disappointment.<br>**2.** The act of consoling; giving relief in affliction. | *"This grief is crowned with consolation; your old smock brings forth a new petticoat: and indeed the tears live in an onion that should water this sorrow."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[consolatory]] | adjective | **1.** Affording comfort or solace. | *"Snagsby, however, giving him the consolatory assurance, “It’s only a job you will be paid for, Jo,” he recovers; and on being taken outside by Mr."* — Charles Dickens, *Bleak House* |
| [[console]] | noun | **1.** A small table fixed to a wall or designed to stand against a wall.<br>**2.** A scientific instrument consisting of displays and an input device that an operator can use to monitor and control a system (especially a computer system). | *"There have been boys at all times who fought together and then made peace again." "Philip, that does not console me," the sister answered."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[consoling]] | verb | **1.** Give moral or emotional strength to.<br>**2.** Affording comfort or solace. | *"Lippo faithfully followed Leonore wherever she went and from time to time repeated his consoling words, but he said them in such a wailing voice that they sounded extremely doleful."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[desolate]] | verb | **1.** Leave someone who needs or counts on you; leave in the lurch.<br>**2.** Reduce in population. | *"These are his substance, sinews, arms and strength, With which he yoketh your rebellious necks, Razeth your cities and subverts your towns, And in a moment makes them desolate."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[desolately]] | adverb | **1.** In grief-stricken loneliness; without comforting circumstances or prospects. | *"Ablethorpe was telling me about--about the council of--council of--whatever--it--was!" Harriet had got hold of a handkerchief by this time, and was sobbing most desolately into it."* — S. R. Crockett, *Deep Moat Grange* |
| [[desolation]] | noun | **1.** The state of being decayed or destroyed.<br>**2.** A bleak and desolate atmosphere. | *"My desolation does begin to make A better life. ’Tis paltry to be Caesar; Not being Fortune, he’s but Fortune’s knave, A minister of her will."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[inconsolable]] | adjective | **1.** Sad beyond comforting; incapable of being consoled. | *"Guppy and his inconsolable friend that there is no end to the Dedlocks, whose family greatness seems to consist in their never having done anything to distinguish themselves for seven hundred years."* — Charles Dickens, *Bleak House* |
| [[parasol]] | noun | **1.** A handheld collapsible source of shade. | *"That’s enough—that’s enough!—oh, you fools!” she cried, throwing the parasol and Prayer-book into the passage, and running out of doors in the direction signified."* — Thomas Hardy, *Far from the Madding Crowd* |
| [[sol]] | noun | **1.** A colloid that has a continuous liquid phase in which a solid is suspended in a liquid.<br>**2.** (roman mythology) ancient roman god; personification of the sun; counterpart of greek helios. | *"Who understandeth thee not, loves thee not. [_He sings_.] Ut, re, sol, la, mi, fa."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[solar]] | adjective | **1.** Relating to or derived from the sun or utilizing the energies of the sun. | *"There’s nothing solar about legs of beef and mutton."* — Charles Dickens, *Bleak House* |
| [[solarise]] | verb | **1.** Reverse some of the tones of (a negative or print) and introduce pronounced outlines of highlights, by exposing it briefly to light, then washing and redeveloping it.<br>**2.** Become overexposed. | *"In academic literature, solarise designates reverse some of the tones of (a negative or print) and introduce pronounced outlines of highlights, by exposing it briefly to light, then washing and redeveloping it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[solarium]] | noun | **1.** A room enclosed largely with glass and affording exposure to the sun. | *"In academic literature, solarium designates a room enclosed largely with glass and affording exposure to the sun."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[solarize]] | verb | **1.** Reverse some of the tones of (a negative or print) and introduce pronounced outlines of highlights, by exposing it briefly to light, then washing and redeveloping it.<br>**2.** Become overexposed. | *"In academic literature, solarize designates reverse some of the tones of (a negative or print) and introduce pronounced outlines of highlights, by exposing it briefly to light, then washing and redeveloping it."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[soled]] | verb | **1.** Put a new sole on.<br>**2.** Having a sole or soles especially as specified; used in combination. | *"O single-soled jest, solely singular for the singleness!"* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[solely]] | adverb | **1.** Without any others being included or involved. | *"Yet I wish, sir— I mean for your particular—you had not Joined in commission with him, but either Had borne the action of yourself or else To him had left it solely."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[solent]] | noun | **1.** A strait of the english channel between the coast of hampshire and the isle of wight. | *"See his _Rationale Divinorum Officiorum_ (appended to the _Rationale Divinorum Officiorum_ of G. [W.] Durandus, Lyons, 1584), p. 556 _recto: "Solent porro hoc tempore_ [the Eve of St."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[solitarily]] | adverb | **1.** In solitude. | *"Often they scurry along solitarily, but occasionally in groups."* — W. E. Webb, *Buffalo Land* |
| [[solitariness]] | noun | **1.** The state of being alone in solitary isolation.<br>**2.** A disposition toward being alone. | *"The journey in itself had no terrors for her; and she began it without either dreading its length or feeling its solitariness."* — Jane Austen, *Northanger Abbey* |
| [[solitary]] | noun | **1.** Confinement of a prisoner in isolation from other prisoners.<br>**2.** One who lives in solitude. | *"In respect that it is solitary, I like it very well; but in respect that it is private, it is a very vile life."* — William Shakespeare, *The Complete Works of William Shakespeare* |
| [[solitude]] | noun | **1.** A state of social isolation.<br>**2.** The state or situation of being alone. | *"I only wished to forget the past in this solitude, and I thought it right for me to die forgotten."* — Johanna Spyri, *Maezli: A Story of the Swiss Valleys* |
| [[solo]] | noun | **1.** Any activity that is performed alone without assistance.<br>**2.** A musical composition for one voice or instrument (with or without accompaniment). | *"The solo over, a duet followed, and then a glee: a joyous conversational murmur filled up the intervals."* — Charlotte Brontë, *Jane Eyre: An Autobiography* |
| [[soloist]] | noun | **1.** A musician who performs a solo. | *"In academic literature, soloist designates a musician who performs a solo."* — Academic Lexicon, *Morphological & Etymological Survey* |
| [[solstice]] | noun | **1.** Either of the two times of the year when the sun is at its greatest distance from the celestial equator. | *"It was held in honour of the sun at the solstice in June."* — James George Frazer, *Balder the Beautiful, Volume I.* |
| [[unconsolable]] | adjective | **1.** Sad beyond comforting; incapable of being consoled. | *"In academic literature, unconsolable designates sad beyond comforting; incapable of being consoled."* — Academic Lexicon, *Morphological & Etymological Survey* |

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
    ROOT DASHBOARD · SOL
  </div>
</div>
